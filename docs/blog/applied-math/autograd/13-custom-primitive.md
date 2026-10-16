---
title: Autograd 源码学习（十三）：自定义 Primitive
description: "Autograd 源码学习（十三）：自定义 primitive 与 VJP 的注册、closure 捕获以及与高阶导数的边界。"
date: 2026-09-05
hide:
  - navigation
categories:
  - 应用数学
  - Autograd 源码学习
tags:
  - python
---

# Autograd 源码学习（十三）：自定义 Primitive

如果一个计算已经被声明为 primitive，Autograd 就把它当作原子调用。原函数能算出值，并不意味着框架已经知道如何把 cotangent 拉回输入。

这里继续使用教材中的 square 实验，先观察 missing VJP 在哪里失败，再登记 staged rule，并用上一篇的 checker 验证到二阶。


源码基线：HIPS/autograd 1.9.1，commit `f53a21734fdfae636f448744d9097d8d35a643a0`。

## 本文目标

1. `@primitive` 承诺了什么，又没有承诺什么？
2. 未注册 VJP 时为何 forward 成功而 `grad` 失败？
3. 怎样写支持高阶导数的 staged VJP？

## Mental Model

`@primitive` 把函数声明为 tracing 的原子黑盒：Autograd 执行它得到 forward value，但不会进入函数体逐个记录内部 operations。要做 reverse mode，使用者必须为 differentiable arguments 注册局部 pullback。

## 必要的数学

```text
square(x)=x^2
local VJP(g)=g*2x
```

局部规则必须乘 upstream `g`；只返回 `2x` 只在 `g=1` 的特殊顶层 scalar 情形碰巧正确。

## 一个最小例子

[EXPERIMENT]  
File: [`experiments/custom_primitive.py`](../../../assets/autograd/experiments/custom_primitive.py)  
Purpose: 将平方声明为 primitive，以便单独观察缺失 VJP 与注册后的行为。

```python
@primitive
def square(x):
    return x * x
```

注册前调用 `square(3.0)` 可 forward 得 9；`grad(square)(3.0)` 在 `VJPNode` 构造时找不到 registry entry。这里必须使用浮点输入：整数3在当前类型注册下会更早因不能装箱而失败，不能拿它验证 missing VJP。

`@primitive` 执行时把 raw square 包装成 callable；raw body 接收到已解箱的数值，内部 `x*x` 是普通数值计算，不会自动变成内部 multiply node。primitive 边界整体需要一条自己的规则。这正是包装外部库调用时所需要的扩展接口。

## 对应的 Autograd 源码

| File / symbol | 谁调用 | 它调用谁 | 输入 -> 输出 | AD 角色 |
| --- | --- | --- | --- | --- |
| `autograd.extend :: primitive` | extension author | `tracer.primitive` | raw function -> wrapped black box | 声明原子 operation |
| `autograd.extend :: defvjp` | extension author | `core.defvjp` | primitive/rule makers -> registry | reverse extension API |
| `core.py :: VJPNode.__init__` | primitive wrapper | `primitive_vjps[fun]` | operation info -> local VJP | missing rule failure point |
| `core.py :: translate_vjp` | `defvjp` | zero/callable validation | maker spec -> normalized maker | `None` 表示零 VJP |
| `examples/define_gradient.py :: logsumexp_vjp` | official demo | wrapped NumPy ops | ans,x -> closure(g) | staged stable custom rule |
| `test_util.py :: check_grads` | extension author/tests | numerical JVP/VJP | custom function -> assertions | rule validation |

## 调用时序

```text
@primitive -> wrapped square
square(ArrayBox)
  -> raw square(3)=9, no tracing inside body
  -> VJPNode tries primitive_vjps[square]
  -> before defvjp: NotImplementedError

defvjp(square, maker)
  -> primitive_vjps[square]=normalized maker
  -> next trace stores closure g -> g*2*x
  -> backward returns 6
```

## 源码 walkthrough

官方 `examples/define_gradient.py` 使用数值稳定的 `logsumexp`，其注释给出三个关键设计理由：primitive 可包外部库或有原地操作的代码；VJP closure 可依赖 `x` 与 `ans`；若要高阶导数，closure 内部必须由 Autograd 可微操作构成。

当前推荐扩展入口是：

[EXPERIMENT]  
File: [`experiments/custom_primitive.py`](../../../assets/autograd/experiments/custom_primitive.py)  
Purpose: 使用当前扩展入口与仓库自带 checker，不修改核心文件。

```python
from autograd.extend import defvjp, primitive
from autograd.test_util import check_grads
```

这些 import 分别得到 tracer 包装器、core 登记函数和数值检查工具。随后由实验进程调用扩展 API，无需在核心源码文件里硬编码 square 的规则。

### 缺失 VJP 在哪个时刻暴露

[REAL SOURCE]  
File: [`autograd/core.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)  
Symbol: [`VJPNode.__init__`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py#L39-L46)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
    def __init__(self, value, fun, args, kwargs, parent_argnums, parents):
        self.parents = parents
        try:
            vjpmaker = primitive_vjps[fun]
        except KeyError:
            fun_name = getattr(fun, "__name__", fun)
            raise NotImplementedError(f"VJP of {fun_name} wrt argnums {parent_argnums} not defined")
        self.vjp = vjpmaker(parent_argnums, value, args, kwargs)
```

进入此构造器时 raw square 已经算出 `value=9`，`fun` 是 square 的包装函数，`args=(3.0,)`、`parent_argnums=(0,)`，parents 包含输入 root。查表失败后抛错；没有生成一个可用的输出节点，也还没有运行 backward。错误的含义是“原数值计算可执行，但这个 primitive 的反向语义尚未登记”。

### 登记函数写的是 maker，节点保存的是本次 closure

[REAL SOURCE]  
File: [`autograd/core.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)  
Symbol: [`defvjp_argnums`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py#L56-L57)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
def defvjp_argnums(fun, vjpmaker):
    primitive_vjps[fun] = vjpmaker
```

`defvjp(square,...)` 最后调用此 helper，把整体 maker 登记到全局进程内字典。key 是 square callable 的对象身份，不是字符串 "square"。之后新的一次 trace 才能在构造节点时取到它；调用登记函数不会为某次输入偷偷计算出一个梯度。

[REAL SOURCE]  
File: [`autograd/core.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)  
Symbol: [`translate_vjp`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py#L102-L108)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
def translate_vjp(vjpfun, fun, argnum):
    if vjpfun is None:
        return lambda ans, *args, **kwargs: lambda g: vspace(args[argnum]).zeros()
    elif callable(vjpfun):
        return vjpfun
    else:
        raise TypeError(f"Bad VJP '{vjpfun}' for '{fun.__name__}'")
```

进入时 `defvjp` 正在规范化某个参数位置的 maker。callable 原样保留；None 则变成“为此输入空间返回零”的规则。None 表示显式声明零导数，不能用它掩盖真正未知的规则，否则数值可能错误却不再报 missing VJP。产物交给 defvjp 的位置字典，之后由节点 construction 使用。

[EXPERIMENT]  
File: [`experiments/custom_primitive.py`](../../../assets/autograd/experiments/custom_primitive.py)  
Purpose: 登记正确的 staged square VJP，并立即验证数值和二阶 reverse rule。

```python
    defvjp(square, lambda ans, x: lambda g: g * 2.0 * x)
    derivative = grad(square)(3.0)
    assert derivative == 6.0
    check_grads(square, modes=["rev"], order=2)(3.0)
```

第一行发生在捕获并确认预期异常之后。maker 在新 trace 的 forward 节点构造时收到 ans=9,x=3，返回使用 x 的 closure；backward 的 g=1 到达后得到6。最后 checker 对 VJP 程序继续求导到二阶，确认规则用到的乘法也能被外层 trace 观察。实验没有登记 JVP，因此 modes 只选择 rev，不能把 reverse 检查通过表述为所有模式都已支持。

### STATE SNAPSHOT：同一 primitive 的注册前后

| 时刻 | registry[square] | 本次 value / Box / node | g 与结果 |
| --- | --- | --- | --- |
| 普通 square(3.0) | 不存在也可执行 | 无 Box，raw value=9 | 不求导 |
| 首次 grad 的 forward | 缺失 | 输入有 Box/root，raw answer=9，输出节点构造失败 | 尚无 backward g |
| defvjp 执行后 | 存在整体 maker | 尚未创建新的输入图 | 尚无 g |
| 再次 grad 的 forward | 查得 maker | 节点 parents=(root,)，vjp 捕获 x=3 | 等待 g |
| backward | registry 无需重新登记 | 调用节点 vjp(1) | contribution=6 |
| 二阶检查 | 同一规则 | closure 运算可被外层 trace | 检查导数程序 |

```text
raw function -> @primitive -> ordinary forward works
                             |
                             +-> traced forward -> VJPNode registry miss
defvjp registers maker ------+
                             +-> next traced forward -> closure captures x
                                                        |
output seed g ------------------------------------------+-> g*2*x -> parent
```

### 捕获 forward state 与高阶导数的边界

本例 inner closure 引用 x，不引用 ans；因此它需要保留的是 x 的对象引用。exp 则使用 ans，第六篇 已展示过。不能只看 maker 的参数列表就断言所有 forward 参数都会长期被保存，也不能仅依据注释断言某个参数没有被捕获。

当前官方 `examples/define_gradient.py :: logsumexp_vjp` 的返回表达式确实引用了 x 与 ans；其中“doesn't close over x”的注释与该 commit 的表达式不一致，应以实际表达式为准。这里保留官方例子关于可微 closure 的有效说明，但不沿用这句不准确的内存描述。

primitive 的 raw 数值函数可以封装非 Autograd 实现，局部导数由你提供；要支持高阶微分，VJP 的计算过程仍必须使用可微操作。这里是扩展契约，不是自动解析任意黑盒函数的导数。

## 实验验证

[完整实验：custom_primitive.py](../../../assets/autograd/experiments/custom_primitive.py)。运行环境、资源目录及路径配置见[系列总览](00-overview.md#experiments)。下方命令以解压后的资源目录为工作目录。

运行 `python -B experiments/custom_primitive.py`，同一进程先失败、再注册、再验证：

```text
before defvjp: VJP of square wrt argnums (0,) not defined
after defvjp: grad(square)(3.0)=6.0
reverse-mode gradient check through order 2 passed
all checks passed
```

## 理论与源码的对应关系

```text
AD system
  = tracing machinery
  + primitive numerical semantics
  + registered JVP/VJP rules
  + chain rule traversal
  + contribution accumulation
```

`primitive` 本身不是“自动发现数学导数”。unsupported operation 报 `VJP not defined` 通常正是缺少 registry rule，而不是 Python 无法执行 forward。

## 几个自测问题

1. 为什么 primitive 内部即使写了 `x*x`，Autograd 也不会自动使用 multiply VJP？
2. staged maker 的外层与内层 closure 分别在什么时候运行？
3. custom VJP 如何同时利用 forward answer 并避免不必要的引用保留？

## 小结

primitive 定义追踪边界，defvjp 提供该边界的反向语义。maker 在 forward 捕获状态，closure 在 backward 接收 g；要支持高阶导数，这段 closure 自身也必须由可微操作组成。

## 下一篇

接下来读[第十四篇：Mini Autograd：实现与源码对读](14-mini-autograd-design.md)。

## 参考资料

- [autograd/core.py](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)，固定 commit 原文件。
- [Automatic Differentiation lecture](https://mlsyscourse.org/slides/04-automatic-differentiation.pdf)。

