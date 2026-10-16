---
title: Autograd 源码学习（六）：NumPy Primitive 与 VJP
description: "Autograd 源码学习（六）：NumPy primitive 的一元、二元与 sum 的 VJP 规则如何登记和应用。"
date: 2026-09-05
hide:
  - navigation
categories:
  - 应用数学
  - Autograd 源码学习
tags:
  - python
---

# Autograd 源码学习（六）：NumPy Primitive 与 VJP

通用 reverse engine 已经知道怎样调用 `node.vjp(g)`，但它并不知道 sin、exp 或乘法的导数。数学语义来自 NumPy 集成中为每个 primitive 登记的局部规则。

这一篇沿既有实验中的八种运算展开，重点分清三个时刻：导入时登记 maker，forward 时捕获需要的状态，backward 时接收 upstream cotangent。


源码基线：HIPS/autograd 1.9.1，commit `f53a21734fdfae636f448744d9097d8d35a643a0`。

## 本文目标

1. `autograd.numpy` 如何接管 NumPy callables 与运算符？
2. `sin`, `exp`, `log`, `multiply`, `sum` 的局部规则在哪里？
3. `defvjp` 为什么使用返回 closure 的 staged 形式？

## Mental Model

Autograd 不知道任意 Python 函数如何求导。可导 NumPy 支持来自三层配合：wrapper 把原始 callable 变为 primitive；ArrayBox 把语法运算符导向这些 primitives；`numpy_vjps.py` 在 import 时把局部 pullback 注册到 registry。

## 必要的数学

若 `z=sin(x)` 且收到 upstream `g=dL/dz`：

```text
dL/dx = g*cos(x)
```

若 `z=x*y`：

```text
dL/dx = g*y
dL/dy = g*x
```

VJP 是 upstream 与局部 Jacobian 的乘积；不是只返回裸导数 `cos(x)`。

## 一个最小例子

[EXPERIMENT]  
File: [`experiments/numpy_primitives.py`](../../../assets/autograd/experiments/numpy_primitives.py)  
Purpose: 一条已有表达式覆盖八种基础 primitives，并核对完整解析梯度。

```python
def f(x):
    terms = np.sin(x) + np.exp(x) * np.log(x) - x / 2.0
    return np.sum(terms)
```

该函数实际穿过 `sin, exp, log, multiply, add, divide, subtract, sum` primitives。

实验输入是正数向量 `[0.5,1.5,2.0]`。先逐元素得到 terms，再 sum 成 scalar loss。反向从 sum 的 seed 1 开始，terms 的每个位置收到 1，最终输入梯度为 `cos(x)+exp(x)*log(x)+exp(x)/x-0.5`。源码层面 `/` 经 `ArrayBox.__truediv__` 到 `anp.true_divide`；实验的 divide 名称是数学运算类别，当前文件也为 true_divide 注册了相同形式的规则。

## 对应的 Autograd 源码

| File / symbol | 谁调用 | 它调用谁 | 输入 -> 输出 | AD 角色 |
| --- | --- | --- | --- | --- |
| `numpy/__init__.py` | `import autograd.numpy` | imports wrapper/boxes/vjps/jvps/vspaces | import -> initialized namespace | 触发包装与规则注册 |
| `numpy_wrapper.py :: wrap_namespace` | module import | `primitive(obj)` / `notrace_primitive` | NumPy namespace -> wrapped globals | 批量接管 callables |
| `numpy_boxes.py :: ArrayBox` | `new_box` | `anp.add`, `anp.multiply` 等 | Python operator -> primitive call | 运算符桥接 |
| `tracer.py :: primitive` | wrapper construction/call | raw NumPy, node constructor | boxed call -> boxed answer | operation tracing |
| `numpy_vjps.py` top-level `defvjp` calls | module import | `core.defvjp` | primitive/rule makers -> registry | reverse rules |
| `core.py :: primitive_vjps` | `VJPNode.__init__` | registry lookup | primitive -> VJP maker | rule table |

## 调用时序

```text
import autograd.numpy
  -> wrap_namespace(np.__dict__, globals())
  -> np.sin becomes primitive wrapper
  -> import numpy_vjps executes defvjp(anp.sin,...)

runtime: np.sin(ArrayBox)
  -> primitive wrapper executes raw sin(value)
  -> VJPNode looks up primitive_vjps[anp.sin]
  -> stores lambda g: g*cos(x)
```

## 源码 walkthrough

### callable、运算符、局部规则各在哪个时刻准备好

[REAL SOURCE]  
File: [`autograd/numpy/numpy_wrapper.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_wrapper.py)  
Symbol: [`wrap_namespace, callable wrapping excerpt`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_wrapper.py#L37-L49)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
            if obj in notrace_functions:
                wrapped = notrace_primitive(obj)
            elif callable(obj) and type(obj) is not type:
                wrapped = primitive(obj)
            elif type(obj) is type and obj in int_types:
                wrapped = wrap_intdtype(obj)
            elif type(obj) in unchanged_types:
                new[name] = obj
                continue
            else:
                continue
            new[name] = wrapped
            obj_to_wrapped.append((obj, wrapped))
```

导入时 `old` 是 NumPy namespace，`new` 是 wrapper 模块的 globals。循环遇到 `sin` 等 callable 时，`obj` 是原 NumPy 对象，`wrapped` 是 Autograd primitive，最后绑定到同名 `new[name]`；`obj_to_wrapped` 保持同一 raw 对象的多个名字共享包装器。此时只准备好“如何拦截调用”，还没有本次 x，也没有 graph node。

`ArrayBox.__mul__` 等运算符把用户语法转交给这些 callable；`numpy_vjps.py` 的模块级 `defvjp` 随后为 callable 登记局部规则。tracing 与导数规则缺一不可：primitive 提供记录边界，registry 提供数学语义。

### binary VJP：每个输入位置各有一条规则

[REAL SOURCE]  
File: [`autograd/numpy/numpy_vjps.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_vjps.py)  
Symbol: [`defvjp(anp.add, ...)`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_vjps.py#L76-L78)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
defvjp(
    anp.add, lambda ans, x, y: unbroadcast_f(x, lambda g: g), lambda ans, x, y: unbroadcast_f(y, lambda g: g)
)
```

注册时传入两个 maker。forward 的 `ans=x+y` 已知时，每个 maker 捕获对应输入的 shape；backward 的 `g=dL/dans` 到达后，两个输入都收到同一个数值 cotangent g，再各自还原输入形状。这不是把 g 平分成两半，因为两个局部偏导都是 1。返回的贡献随后由 `backward_pass` 分配给各 parent。

[REAL SOURCE]  
File: [`autograd/numpy/numpy_vjps.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_vjps.py)  
Symbol: [`defvjp(anp.multiply, ...)`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_vjps.py#L79-L83)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
defvjp(
    anp.multiply,
    lambda ans, x, y: unbroadcast_f(x, lambda g: y * g),
    lambda ans, x, y: unbroadcast_f(y, lambda g: x * g),
)
```

forward maker 收到 `ans,x,y`，输入0的 closure 使用 y，输入1的 closure 使用 x。backward 收到 g 后，分别计算 `y*g` 和 `x*g`，对应局部 Jacobian 两个块的作用。本文表达式的乘法是 `exp(x)*log(x)`，因此给 exp 路径的 upstream 是 `log(x)`，给 log 路径的是 `exp(x)`；两条路径最终都要返回同一个原输入。

[REAL SOURCE]  
File: [`autograd/numpy/numpy_vjps.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_vjps.py)  
Symbol: [`defvjp(anp.subtract, ...) and defvjp(anp.divide, ...)`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_vjps.py#L84-L93)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
defvjp(
    anp.subtract,
    lambda ans, x, y: unbroadcast_f(x, lambda g: g),
    lambda ans, x, y: unbroadcast_f(y, lambda g: -g),
)
defvjp(
    anp.divide,
    lambda ans, x, y: unbroadcast_f(x, lambda g: g / y),
    lambda ans, x, y: unbroadcast_f(y, lambda g: -g * x / y**2),
)
```

减法的第二个输入需要负号；除法 numerator 的局部规则为 `g/y`，denominator 为 `-g*x/y^2`。本实验中的常数 `2.0` 不是当前 trace 的 Box，因而除法只建立输入0的 parent，VJPNode 只选择对应 maker。即使 registry 支持两个参数，也不是每次 operation 都有两个 traced parents。本路径先经 subtract 收到 -1，再经除法得到 `-1/2`。

### unary VJP：forward 保存状态，backward 才知道权重

[REAL SOURCE]  
File: [`autograd/numpy/numpy_vjps.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_vjps.py)  
Symbol: [`defvjp(anp.exp, ...)`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_vjps.py#L163-L163)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
defvjp(anp.exp, lambda ans, x: lambda g: ans * g)
```

外层 maker 在 `exp(x)` 已计算完成、VJPNode 正在创建时运行。它返回的函数捕获 `ans=exp(x)`，不引用 x。backward 将本路径的 upstream `g=log(x)` 交进来，得到 `exp(x)*log(x)`。下一步通用引擎把它累加给 x。复用 forward answer 既符合导数公式，也避免重新计算 exp；是否能够释放 x，还取决于别处有没有引用。

[REAL SOURCE]  
File: [`autograd/numpy/numpy_vjps.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_vjps.py)  
Symbol: [`defvjp(anp.log, ...)`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_vjps.py#L166-L166)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
defvjp(anp.log, lambda ans, x: lambda g: g / x)
```

这里 inner closure 需要 x，却不需要 ans。forward maker 留住本次输入；backward 收到来自 multiply 的 `g=exp(x)` 后，得到 `exp(x)/x`。它与 exp 路径来自不同下游节点，二者不会在规则内部相加，而是在通用 `outgrads[x_node]` 累加。

[REAL SOURCE]  
File: [`autograd/numpy/numpy_vjps.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_vjps.py)  
Symbol: [`defvjp(anp.sin, ...)`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_vjps.py#L170-L170)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
defvjp(anp.sin, lambda ans, x: lambda g: g * anp.cos(x))
```

本路径经 add 收到 g=1，所以返回 `cos(x)`；但真实规则必须保留乘 g，才能在不同上游权重下继续成立。`anp.cos(x)` 位于 inner closure 内，实际到 backward 才运行；若 x 仍是较低 trace 的 Box，这个 cos 又会被外层求导记录。

staged 接口 `lambda ans,*args: lambda g: ...` 把 forward 可用状态与 backward seed 分开；当前 update guide 明确说明这让不需要的 forward references 更早被垃圾回收，也允许多个 argument rule 共享或选择状态。

| 时刻 | 已知对象 | 正在调用什么 | 产生什么 |
| --- | --- | --- | --- |
| module import | primitive、maker 函数对象 | defvjp | registry entry |
| forward node construction | ans、原参数、被 trace 的参数位置 | maker(ans,*args) | 捕获必要 forward state 的 closure |
| backward node visit | 上游总 cotangent g | closure(g) | 某个输入位置的 contribution |

`lambda ans,x: lambda g: ...` 的外层不是每次 backward 都运行。它在本次 forward 创建节点时运行一次；同一节点的 inner closure 可以被多个 VJP 查询用不同 g 调用。closure 捕获对象引用，而非自动制作输入的深拷贝。

### sum 的 VJP：把输出 cotangent 放回每个输入位置

[REAL SOURCE]  
File: [`autograd/numpy/numpy_vjps.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_vjps.py)  
Symbol: [`grad_np_sum and defvjp(anp.sum, ...)`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_vjps.py#L444-L449)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
def grad_np_sum(ans, x, axis=None, keepdims=False, dtype=None, **kwargs):
    shape, dtype = anp.shape(x), anp.result_type(x)
    return lambda g: repeat_to_match_shape(g, shape, dtype, axis, keepdims)[0]


defvjp(anp.sum, grad_np_sum)
```

注册行指定 maker；运行 maker 时 x 是本次被求和的 terms，shape=(3,)，axis=None。它捕获 shape/dtype/axis/keepdims，返回 inner closure。backward 从 scalar loss 传入 g=1，helper 产生 `[1,1,1]`，取返回 tuple 的第0项作为 terms cotangent。sum 的每个输入元素对输出的局部导数都是 1，所以这里是扩展，不是再求和。

[REAL SOURCE]  
File: [`autograd/numpy/numpy_vjps.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_vjps.py)  
Symbol: [`repeat_to_match_shape`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_vjps.py#L417-L428)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
def repeat_to_match_shape(g, shape, dtype, axis, keepdims):
    """Returns the array g repeated along axis to fit vector space vs.
    Also returns the number of repetitions of the array."""
    if shape == ():
        return g, 1
    axis = list(axis) if isinstance(axis, tuple) else axis
    new_shape = onp.array(shape)
    new_shape[axis] = 1
    num_reps = onp.prod(onp.array(shape)[axis])
    # Can't use broadcast_to because of numpy bug: https://github.com/numpy/numpy/issues/9165
    # return anp.broadcast_to(anp.reshape(g, new_shape), shape), num_reps
    return anp.reshape(g, new_shape) + onp.zeros(shape, dtype=dtype), num_reps
```

本例输入 g 是 scalar、shape=(3,)，`new_shape` 从 `[3]` 变成 `[1]`，`num_reps=3`；reshape 后的 g 与长度3的零数组相加，利用 broadcasting 得到 `[1,1,1]`。返回第二项给 mean 等其他规则使用，sum 只用第一项。原文保留了历史注释，但实际执行的是最后一行，不能把注释中的 broadcast_to 当成当前实现。

### STATE SNAPSHOT：一条输入到 loss 的多路径贡献

| 路径 | forward 中需保留的状态 | 本节点收到的 upstream | 返回给输入 x 的 contribution |
| --- | --- | --- | --- |
| sum -> terms | terms shape=(3,) | scalar 1 | terms 先收到 [1,1,1] |
| sin(x) | x | [1,1,1] | cos(x) |
| exp(x) -> multiply | exp answer | log(x) | exp(x)*log(x) |
| log(x) -> multiply | x | exp(x) | exp(x)/x |
| x/2 -> subtract | denominator=2 | [-1,-1,-1] | [-0.5,-0.5,-0.5] |

最终梯度把后三类表达式及 sin 路径相加。这里表格按数学路径组织，没有要求 `toposort` 用这张表的行序访问独立分支。

```text
import: wrap callable -> defvjp registration
forward: primal args -> primitive answer -> maker(ans,args) -> local closure
backward: output 1 -> sum VJP [1,1,1]
                     -> local closures on each executed path
                     -> add_outgrads at shared input x -> input vector gradient
```

## 实验验证

[完整实验：numpy_primitives.py](../../../assets/autograd/experiments/numpy_primitives.py)。运行环境、资源目录及路径配置见[系列总览](00-overview.md#experiments)。下方命令以解压后的资源目录为工作目录。

运行 `python -B experiments/numpy_primitives.py`。它对三个正数输入比较 Autograd 与解析梯度；解析公式独立写在实验的 `analytical_gradient` 中，并没有喂给 AD registry。结果：

```text
autograd gradient=[2.5322186, 4.37569846, 7.90008461]
analytical gradient=[2.5322186, 4.37569846, 7.90008461]
all checks passed
```

## 理论与源码的对应关系

| 概念 | 当前实现 |
| --- | --- |
| primitive 数值语义 | wrapped callable 的 `.fun` / raw NumPy callable |
| primitive reverse rule | `primitive_vjps` entry |
| forward saved state | VJP maker 参数 `ans,*args,**kwargs` |
| upstream cotangent | inner closure 参数 `g` |
| unsupported operation | `VJPNode.__init__` registry miss 抛 `NotImplementedError` |
| 使用 `autograd.numpy` | 获得 wrapped namespace 与已注册规则 |

## 几个自测问题

1. 为什么 `lambda g: cos(x)` 对 general VJP 不正确？
2. `exp` 的 VJP closure 使用 `ans` 而非重新算 `exp(x)` 有什么意义？
3. 原生 `numpy` callable 未包装或未注册 rule 时，tracer 缺少哪一部分？

## 小结

NumPy wrapper 提供可追踪的调用边界，VJP registry 提供局部数学。staged maker 把 forward state 和稍后到达的 g 分开；局部规则返回贡献，共享输入处的合并仍由通用引擎完成。

linalg、FFT 和 SciPy 的复杂规则仍可沿相同入口查阅，这里先把基础 NumPy happy path 走通。

## 下一篇

接下来读[第七篇：Broadcasting 的反向传播](07-broadcasting.md)。

## 参考资料

- [autograd/numpy/numpy_vjps.py](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_vjps.py)，固定 commit 原文件。
- [autograd/numpy/numpy_wrapper.py](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_wrapper.py)，固定 commit 原文件。
- [Automatic Differentiation lecture](https://mlsyscourse.org/slides/04-automatic-differentiation.pdf)。

