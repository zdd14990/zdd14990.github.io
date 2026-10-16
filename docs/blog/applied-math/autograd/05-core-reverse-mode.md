---
title: Autograd 源码学习（五）：Reverse Mode 的核心实现
description: "Autograd 源码学习（五）：make_vjp、VJPNode、defvjp 与 backward_pass，梳理 reverse mode 的核心实现。"
date: 2026-09-05
hide:
  - navigation
categories:
  - 应用数学
  - Autograd 源码学习
tags:
  - python
---

# Autograd 源码学习（五）：Reverse Mode 的核心实现

上一篇已经看到 primitive 如何产生 VJPNode。这里从 forward 留下的 end node 开始，检查局部规则怎样接到输出 seed，又怎样把贡献交给同一个输入。

仍然只用 `z=x*x, x=3`。例子虽然小，却包含 reverse engine 最关键的三个职责：合法的访问顺序、局部 pullback，以及多条路径的梯度累加。下面把每次字典变化都列出来。


源码基线：HIPS/autograd 1.9.1，commit `f53a21734fdfae636f448744d9097d8d35a643a0`。

## 本文目标

1. `make_vjp` closure 捕获什么？
2. 课程讲义的 Reverse AD 伪代码如何逐行对应 `backward_pass`？
3. `x*x` 的两个 `3` 在哪里变成 `6`？

## Mental Model

forward trace 为每个 operation node 准备一个“收到 output cotangent 后，如何给 parents 产生 input cotangents”的函数。backward pass 从 end node 开始，按反向拓扑顺序调用这些局部函数，并用 `add_outgrads` 合并指向同一 parent 的贡献。

## 必要的数学

下面的公式概括本篇使用的数学关系，具体数值与传播步骤接着展开。

$$
\bar v_k=\sum_{i:\,k\in\operatorname{inputs}(i)}\bar v_i\frac{\partial v_i}{\partial v_k}.
$$

在 $z=x\cdot x$ 的例子上，两条输入边各产生一项：

$$
\bar x=1\cdot3+1\cdot3=6.
$$

对 node `vi = op(vk,...)`：

```text
partial_adjoint(k -> i) = bar(vi) * dvi/dvk
bar(vk) = sum_i partial_adjoint(k -> i)
```

反向拓扑顺序保证消费 node 时，它从所有 downstream paths 得到的 contribution 已经汇合。

## 一个最小例子

`z=x*x`, `x=3`：multiply 的两个输入位置都指向 root。

```text
bar(z)=1
arg0 contribution = 1*x = 3
arg1 contribution = 1*x = 3
bar(x)=3+3=6
```

## 对应的 Autograd 源码

| File / symbol | 谁调用 | 它调用谁 | 输入 -> 输出 | AD 角色 |
| --- | --- | --- | --- | --- |
| `core.py :: make_vjp`（11 行） | `grad`, `jacobian`,用户 | `VJPNode.new_root`, `trace`; closure 调 `backward_pass` | fun,x -> `(vjp,end_value)` | 建 reverse graph |
| `core.py :: VJPNode.__init__`（39 行） | primitive wrapper | `primitive_vjps[fun]` | operation state -> parents/vjp | 保存局部 rule |
| `core.py :: defvjp`（68 行） | NumPy/SciPy rule modules、用户扩展 | `translate_vjp`, `defvjp_argnums` | primitive + rule makers -> registry side effect | 注册局部 rule |
| `core.py :: backward_pass`（26 行） | `make_vjp` closure | `toposort`, `node.vjp`, `add_outgrads` | seed,end node -> input cotangent | reverse algorithm |
| `core.py :: add_outgrads`（185 行） | backward/JVP sum helpers | `vspace(...).add/mut_add` | previous + contribution -> accumulated pair | 多路径累加 |
| `util.py :: toposort`（21 行） | `backward_pass` | parent traversal | end node -> nodes iterator | reverse topological order |
| `core.py :: vspace`（289 行） | seeds/zeros/adds/checks | registered VSpace maker | value -> VSpace | type-aware tangent/cotangent operations |

## 调用时序

<ol class="zdd-flow" aria-label="调用时序">
<li><code>make_vjp(fun,x)</code></li>
<li><code>root=VJPNode.new_root()</code></li>
<li><code>end_value,end_node=trace(root,fun,x)</code></li>
<li><code>return vjp closure capturing x or end_node, plus end_value</code></li>
<li><code>vjp(g)</code></li>
<li><code>backward_pass(g,end_node)</code></li>
<li><code>for node in toposort(end_node)</code></li>
<li><code>outgrad = accumulated cotangent for node</code></li>
<li><code>ingrads = node.vjp(outgrad)</code></li>
<li><code>add each ingrad to matching parent</code></li>
<li><code>return root outgrad</code></li>
</ol>

若 `end_node is None`，closure 返回 `vspace(x).zeros()`。

## 源码 walkthrough

### make_vjp：图已经建好，upstream 还没到

[REAL SOURCE]  
File: [`autograd/core.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)  
Symbol: [`make_vjp`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py#L11-L23)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
def make_vjp(fun, x):
    start_node = VJPNode.new_root()
    end_value, end_node = trace(start_node, fun, x)
    if end_node is None:

        def vjp(g):
            return vspace(x).zeros()
    else:

        def vjp(g):
            return backward_pass(g, end_node)

    return vjp, end_value
```

进入时 `fun` 是一元函数，`x=3.0`。第一行创建 R；第二行把 R、fun、x 交给 tracer，得到 `(9.0,M)`。R 没有 parents，M 的两个输入位置都指向 R。正常分支产生的 closure 捕获 M，而不是复制整个图；通过 M 的父引用就能找到所有相关节点。此刻没有 output seed，也没有 `outgrads` 字典。

调用者得到两个不同用途的对象：`end_value` 用于显示 loss、确定输出空间或构造 seed；`vjp` 用于稍后查询输入 cotangent。`grad` 选择 `vspace(9.0).ones()`，数学上为 1；直接使用 `make_vjp` 的用户也可以传其他 seed。若输出独立于输入，`end_node=None` 的分支返回输入空间的零；这个分支不进入下面的 reverse traversal。

### VJPNode 保存什么，为什么足够

[REAL SOURCE]  
File: [`autograd/core.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)  
Symbol: [`VJPNode`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py#L36-L50)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
class VJPNode(Node):
    __slots__ = ["parents", "vjp"]

    def __init__(self, value, fun, args, kwargs, parent_argnums, parents):
        self.parents = parents
        try:
            vjpmaker = primitive_vjps[fun]
        except KeyError:
            fun_name = getattr(fun, "__name__", fun)
            raise NotImplementedError(f"VJP of {fun_name} wrt argnums {parent_argnums} not defined")
        self.vjp = vjpmaker(parent_argnums, value, args, kwargs)

    def initialize_root(self):
        self.parents = []
        self.vjp = lambda g: ()
```

primitive wrapper 调用构造器时已经有 `value=9.0`、`fun=anp.multiply` 的包装函数、`args=(3.0,3.0)`、`kwargs={}`、`parent_argnums=(0,1)`、`parents=(R,R)`。registry 的 key 是 primitive callable，不是名字字符串；`vjpmaker` 为本次参数位置创建局部 pullback，保存到 `self.vjp`。下一次要运行它的人是 `backward_pass`。

M 没有 `value`、`argnums` 或 `grad` 字段。构造参数的必要部分被闭包捕获，例如乘法规则需要另一个输入值；节点本身只长期持有两个 slot。完整 Jacobian 对本例是 `[x,x]`，但用 `g -> (g*x,g*x)` 就能完成任何输出 seed 查询，因此无需构造矩阵。

root 使用继承的 `Node.new_root` 走 `initialize_root`，不会运行 operation 的 `__init__`。它的局部 `vjp` 总返回空 tuple：输入边界已经到了，不能再往前传。这个 root 仍然会被 `backward_pass` 消费一次，正是最后返回输入 cotangent 的关键。

### defvjp 的三个时刻：登记、捕获、应用

先看本例已注册的两条局部规则。

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

导入 NumPy VJP 模块时，`defvjp` 得到 primitive 和两个 maker，还没有某次调用的 x/y。forward 创建 M 时两个 maker 才分别收到 `ans=9,x=3,y=3`，产生等待 g 的 closure；反向收到 1 时，它们各算出 3。`unbroadcast_f` 在 scalar happy path 保持 scalar shape，第七篇 研究数组归约。这解释了 `ingrads` 为何按参数位置返回两个值，即使父节点对象相同也不能丢掉其中一个。

[TEACHING SIMPLIFICATION]  
以下不是 HIPS/autograd verbatim source。省略参数编号配置、None 规则、异常、生成器和 1/2 参数优化；只展示 registry 如何保存 staged maker。

```python
def teaching_defvjp(fun, *makers):
    def make_local_vjp(argnums, ans, args, kwargs):
        rules = [makers[i](ans, *args, **kwargs) for i in argnums]
        def local_vjp(g):
            return tuple(rule(g) for rule in rules)
        return local_vjp
    primitive_vjps[fun] = make_local_vjp
```

进入时 `makers` 是每个参数位置的规则制造函数。`make_local_vjp` 不是马上运行，而是作为 registry value 保存；VJPNode 创建时调用它，拿到局部函数；backward 最后调用局部函数。这段区分了三个时间点，而不是把 `defvjp` 当作反向传播函数。

[REAL SOURCE]  
File: [`autograd/core.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)  
Symbol: [`defvjp, registration setup excerpt`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py#L68-L72)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
def defvjp(fun, *vjpmakers, **kwargs):
    argnums = kwargs.get("argnums", count())
    vjps_dict = {
        argnum: translate_vjp(vjpmaker, fun, argnum) for argnum, vjpmaker in zip(argnums, vjpmakers)
    }
```

本例没有显式 `argnums`，`count()` 从 0 编号，所以 `vjps_dict` 把 0、1 分别映射到两条 maker。`translate_vjp` 为 callable 保留原对象。这个局部字典将被内层 registry maker 捕获；它不是以 graph node 为 key 的 `outgrads`。

[REAL SOURCE]  
File: [`autograd/core.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)  
Symbol: [`defvjp.vjp_argnums, L == 2 excerpt`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py#L85-L94)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
        elif L == 2:
            argnum_0, argnum_1 = argnums
            try:
                vjp_0_fun = vjps_dict[argnum_0]
                vjp_1_fun = vjps_dict[argnum_1]
            except KeyError:
                raise NotImplementedError(f"VJP of {fun.__name__} wrt argnums 0, 1 not defined")
            vjp_0 = vjp_0_fun(ans, *args, **kwargs)
            vjp_1 = vjp_1_fun(ans, *args, **kwargs)
            return lambda g: (vjp_0(g), vjp_1(g))
```

这是 forward 创建 M 时实际命中的分支，`L=len(argnums)=2`。两个 `_fun` 是 maker，两个不带 `_fun` 的 `vjp_0/vjp_1` 才是捕获本次 forward state 后的 closure。该区段返回聚合 closure 给 `VJPNode.vjp`；以后传入 1，它确实返回 tuple `(3,3)`，不是生成器。其他参数数量有各自分支，本文不依赖它们。

[REAL SOURCE]  
File: [`autograd/core.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)  
Symbol: [`defvjp, final registration excerpt`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py#L95-L99)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
        else:
            vjps = [vjps_dict[argnum](ans, *args, **kwargs) for argnum in argnums]
            return lambda g: (vjp(g) for vjp in vjps)

    defvjp_argnums(fun, vjp_argnums)
```

最后一行在外层 `defvjp` 调用时执行，将内层 `vjp_argnums` 登记到 registry；上方 else 是另一个参数数量分支，未在本例运行。这里完整保留相邻原文，尤其不要把最末行误认为运行在 backward 内。

[REAL SOURCE]  
File: [`autograd/core.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)  
Symbol: [`defvjp_argnums`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py#L56-L57)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
def defvjp_argnums(fun, vjpmaker):
    primitive_vjps[fun] = vjpmaker
```

它收到 primitive callable 与整体 maker，执行一次字典赋值，之后由 VJPNode 查找。完整 symbol 位置：`autograd/core.py :: defvjp`，包含未展开的单参数优化、其他参数数目和缺失规则处理。

```text
import numpy_vjps      forward primitive call             backward query
defvjp(multiply,...)   multiply(3,3)=9                     vjp(seed=1)
  |                     |                                  |
  v                     v                                  v
registry[fun]=maker --> VJPNode calls maker(0,1;9;3,3) --> M.vjp(1)
                        |                                  |
                        v                                  v
                    captures vjp_0,vjp_1                  (3,3)
                                                           |
                                                           v
                                                     same parent R
                                                     3 + 3 = 6
```

### backward_pass 完整原文

[REAL SOURCE]  
File: [`autograd/core.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)  
Symbol: [`backward_pass`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py#L26-L33)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
def backward_pass(g, end_node):
    outgrads = {end_node: (g, False)}
    for node in toposort(end_node):
        outgrad = outgrads.pop(node)
        ingrads = node.vjp(outgrad[0])
        for parent, ingrad in zip(node.parents, ingrads):
            outgrads[parent] = add_outgrads(outgrads.get(parent), ingrad)
    return outgrad[0]
```

进入时只有 output cotangent `g=1` 和 M。`outgrads` 是 node -> `(cotangent,mutable_flag)` 的字典；`outgrad` 是当前节点已经汇总好的 tuple；`ingrads` 是当前局部 VJP 对输入位置产生的 cotangents。`zip` 将每个 contribution 与其对应 parent 配对，`add_outgrads` 负责汇合。整个函数没有按变量名查找，也没有重新执行原函数的 forward。

### STATE SNAPSHOT：先核对图与函数状态

| 对象 | 类型 | 保存的内容 | 不保存的内容 |
| --- | --- | --- | --- |
| R | VJPNode | parents=[]，vjp(g)=() | 不保存输入 3、trace id 或累计 grad |
| M | VJPNode | parents=(R,R)，vjp(g) 为两个输入位置返回贡献 | 不保存名为 argnums/value 的字段 |
| Bx（forward 中） | ArrayBox | `_value=3`，`_trace=0`，`_node=R` | 不保存 backward 总梯度 |
| Bz（forward 中） | ArrayBox | `_value=9`，`_trace=0`，`_node=M` | 不保存自己的 parents 字段 |
| 外层 vjp closure | Python function | 正常分支捕获 M | 不缓存某次 seed 的 outgrads |

Box 在 forward 中让值继续流动；完成 trace 后，不要求 reverse traversal 再持有这些 Box 外壳。Node 的 parent 链与必要闭包引用足以做反向计算。

### STATE SNAPSHOT：按真实语句逐状态执行

下表以数值 1/3/6 缩写 NumPy scalar 或 0 维数组，保留真实 dict/tuple 结构和布尔 flag。`grad` 的初始 1 是输出空间创建的 0 维 ones。

| 步骤 / 正在执行的语句 | node | outgrad / upstream g | ingrads 或当前 ingrad | previous outgrad | 执行后的 outgrads |
| --- | --- | --- | --- | --- | --- |
| 初始化字典 | 尚未遍历 | g=1 | 尚未计算 | 无 | `{M:(1,False)}` |
| 第一次 `toposort` yield | M | 尚未 pop | 尚未计算 | 无 | `{M:(1,False)}` |
| `outgrad=outgrads.pop(M)` | M | `(1,False)`，g=1 | 尚未计算 | M 项被取出 | `{}` |
| `M.vjp(outgrad[0])` | M | 1 | `(3,3)` | 无 | `{}` |
| zip 第1项，parent=R | M | 1 | arg0 ingrad=3 | `outgrads.get(R)=None` | `{R:(3,False)}` |
| zip 第2项，parent=R | M | 1 | arg1 ingrad=3 | `(3,False)` | `{R:(6,True)}` |
| 第二次 `toposort` yield / pop | R | `(6,True)`，g=6 | 尚未调用 R.vjp | R 项被取出 | `{}` |
| `R.vjp(6)` | R | 6 | `()` | 无 | `{}` |
| `zip(R.parents,())` | R | 6 | 空迭代，不再写入 | 无 | `{}` |
| `return outgrad[0]` | 最后节点 R | 6 | 已结束 | 无 | 用户收到 6 |

第一次是 `None + 3 -> 3`，这里的 None 表示尚未收到任何 contribution，而不是参与数学加法的数。第二次是 `3 + 3 -> 6`。两条边来自 multiply 的两个参数位置，并不要求两个不同的父对象。`pop` 只移除本次查询的梯度项，不会删除节点或修改 `parents/vjp`；所以闭包可以在新的查询中复用同一个图。

### add_outgrads：数学求和与表示管理

[TEACHING SIMPLIFICATION]  
以下不是 HIPS/autograd verbatim source。省略 sparse、VSpace、可变优化，仅用稠密标量说明缺失值与贡献求和。

```python
def teaching_add_outgrads(previous, contribution):
    if previous is None:
        return contribution
    return previous + contribution
```

该模型输入是“之前收到的总量”和“这条边的新贡献”，输出新的总量；调用者将结果写回同一个 parent。它对应 partial-adjoint sum，下一次同 parent 的贡献又会进入此函数。真实实现还需避免不恰当地原地修改调用者或共享路径持有的数组，因此多了 flag。

[REAL SOURCE]  
File: [`autograd/core.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)  
Symbol: [`add_outgrads, first contribution branch`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py#L201-L205)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
    else:
        if sparse:
            return sparse_add(vspace(g), None, g), True
        else:
            return g, False
```

这是函数最外层 `if prev_g_flagged` 的 else 原文。第一次 R 没有条目，`prev_g_flagged=None`；本例 `g=3` 是 dense，因此返回 `(3,False)`。它直接保存收到的值，没有制造一个零再相加，也没有声称该值已可供原地改写。随后 caller 将这个 tuple 写入 `outgrads[R]`。

[REAL SOURCE]  
File: [`autograd/core.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)  
Symbol: [`add_outgrads, existing contribution branch`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py#L185-L200)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
def add_outgrads(prev_g_flagged, g):
    sparse = type(g) in sparse_object_types
    if prev_g_flagged:
        vs = vspace(g)
        prev_g, mutable = prev_g_flagged
        if mutable:
            if sparse:
                return sparse_add(vs, prev_g, g), True
            else:
                return vs.mut_add(prev_g, g), True
        else:
            if sparse:
                prev_g_mutable = vs.mut_add(None, prev_g)
                return sparse_add(vs, prev_g_mutable, g), True
            else:
                return vs.add(prev_g, g), True
```

第二次输入为 `prev_g_flagged=(3,False)`、`g=3`。非空 tuple 为真，即使它的数值部分为零也仍会走 existing 分支。`vs` 是新 contribution 的 vector space；`mutable=False`、`sparse=False`，所以命中最末行 `vs.add(3,3)`，返回 `(6,True)`。**第二次用的是 add，不是 mut_add。** 第三次 dense contribution 若到来，才命中 `mutable=True` 的 `vs.mut_add` 分支。

flag 不表示“可微/不可微”，也不表示“这个节点访问过没有”；它描述累计值的可变累加许可。对 float，True 也不是宣称 Python float 变成可变对象；这是通用 vector-space 协议。完整位置：`autograd/core.py :: add_outgrads`。上面两个原文区段合起来覆盖真实分支，阅读当前例子只沿 dense 路径即可。

[REAL SOURCE]  
File: [`autograd/core.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)  
Symbol: [`VSpace.add`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py#L243-L245)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
    @primitive
    def add(self, x_prev, x_new):
        return self._add(x_prev, x_new)
```

此处接到 `vs.add(3,3)`，将相加交给该 VSpace 的 `_add`；当前基类 `_add` 返回 `x+y`。`add` 本身是 primitive，使累加操作也可参与外层求导。这是数据类型操作层；它产生的 6 最后仍由 `backward_pass` 写回字典，而非写入 R.grad。

### toposort 为什么让 R 最后才能消费

[REAL SOURCE]  
File: [`autograd/util.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/util.py)  
Symbol: [`toposort`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/util.py#L21-L40)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
def toposort(end_node, parents=operator.attrgetter("parents")):
    child_counts = {}
    stack = [end_node]
    while stack:
        node = stack.pop()
        if node in child_counts:
            child_counts[node] += 1
        else:
            child_counts[node] = 1
            stack.extend(parents(node))

    childless_nodes = [end_node]
    while childless_nodes:
        node = childless_nodes.pop()
        yield node
        for parent in parents(node):
            if child_counts[parent] == 1:
                childless_nodes.append(parent)
            else:
                child_counts[parent] -= 1
```

进入时从 M 向 parents 收集依赖，第一阶段得到 `child_counts[M]=1`、`child_counts[R]=2`，重复父引用被计数两次。第二阶段先 yield M；生成器暂停期间 `backward_pass` 完整处理 M 的两条贡献。恢复后，两次 parent 处理将 R 的未完成依赖计数从 2 处理到可入队状态，之后才 yield R。

所以 `toposort` 在本文件中的输出顺序本来就是 output-before-input；caller 没有再调用 reversed。对更复杂的汇合，所有下游子节点贡献都完成后才会处理当前节点，这是局部 VJP 只需调用一次仍能正确传播总 cotangent 的原因。函数最后遍历到输入 root，解释了 `return outgrad[0]` 为何得到输入而非输出梯度。

### 与课程 PDF 第 14 页逐行映射

下面对照 [Automatic Differentiation 讲义](https://mlsyscourse.org/slides/04-automatic-differentiation.pdf#page=14) 第 14 页的 Reverse AD Algorithm。下面按原页的每个算法步骤映射；数学符号用文字/ASCII 转写，不作为 HIPS 原文代码块。

| 讲义伪代码 | HIPS/autograd 1.9.1 |
| --- | --- |
| `node_to_grad={out:[1]}` | `outgrads={end_node:(g,False)}`，其中 `grad` 传入的 `g` 是 output ones |
| `reverse_topo_order(out)` | `for node in toposort(end_node)` |
| `sum(node_to_grad[i])` | 当前实现不保留 list；每次写 parent 时由 `add_outgrads` 增量合并 |
| `upstream * local derivative` | `ingrads=node.vjp(outgrad[0])` |
| append partial adjoint | `outgrads[parent]=add_outgrads(...)` |
| return input adjoint | 循环最后的 root `outgrad[0]` |

PDF 的 `for k in inputs(i)` 对应 `zip(node.parents,ingrads)`：这里的输入必须按 operation 输入位置理解，本例 R 出现两次。PDF 在访问节点时 `sum(list)`；本实现把求和提前到每次写 parent 时，因此 `outgrads.pop(node)` 拿到的已经是总量。数据结构、求和时机不同，链式法则相同。

| PDF 步骤在 x*x 上的状态 | 本实现对应状态 |
| --- | --- |
| `{z:[1]}` | `{M:(1,False)}` |
| `sum([1])=1` | `outgrad[0]=1` |
| 输入位置0 append 3 | R 从 None 变成 `(3,False)` |
| 输入位置1 append 3，列表为 `[3,3]` | R 提前合并为 `(6,True)` |
| 访问 x 后 `sum([3,3])=6` | pop R 直接得到 6 |
| return input adjoint | 返回最后一次 outgrad 的数值 6 |

## 实验验证

[完整实验：multiple_paths.py](../../../assets/autograd/experiments/multiple_paths.py)。运行环境、资源目录及路径配置见[系列总览](00-overview.md#experiments)。下方命令以解压后的资源目录为工作目录。

[EXPERIMENT]  
File: [`experiments/multiple_paths.py`](../../../assets/autograd/experiments/multiple_paths.py)  
Purpose: 记录真实 add_outgrads 的 previous、contribution、result，验证重复父边的两次合并。

```python
    def logging_add_outgrads(previous, contribution):
        result = original_add_outgrads(previous, contribution)
        events.append((previous, contribution, result))
        return result

    core.add_outgrads = logging_add_outgrads
    try:
        result = grad(f)(3.0)
    finally:
        core.add_outgrads = original_add_outgrads
```

进入此区段前 `original_add_outgrads` 已保存原函数，`events=[]`。wrapper 先执行真实累加，再记录参数与结果；因此没有在实验中替换数学逻辑。临时替换仅发生在该 Python 进程内，finally 恢复；磁盘上的 HIPS 源码未改。下一步断言检查结果为 6、贡献列表恰为 `[3.0,3.0]`。

运行 `python -B experiments/multiple_paths.py`，现有结果的数值摘要：

```text
call 1: previous=None, contribution=3, accumulated=(3,False)
call 2: previous=(3,False), contribution=3, accumulated=(6,True)
gradient contributions: 3 + 3 = 6
all checks passed
```

## 理论与源码的对应关系

| Level 2 AD | Level 3 implementation |
| --- | --- |
| output adjoint | `g` passed to VJP closure |
| local pullback | `VJPNode.vjp` |
| reverse graph walk | `toposort(end_node)` |
| partial adjoint | each `ingrad` |
| accumulation | `add_outgrads` |
| zero derivative for independent output | independent-output closure returns `vspace(x).zeros()` |

## 几个自测问题

1. 为什么 `VJPNode` 不必保存完整 Jacobian？
2. 若不使用反向拓扑顺序，何时可能过早消费一个 node？
3. `outgrads` 为什么以 node 为 key，而不是变量名？

## 小结

VJPNode 保存 parents 和等待 g 的局部函数，backward_pass 为每次查询建立独立累计表。重复输入边保留两条贡献；add_outgrads 先接收 3，再用 vs.add 合并为 6，反向拓扑顺序保证 root 最后才被消费。

## 下一篇

接下来读[第六篇：NumPy Primitive 与 VJP](06-numpy-vjps.md)。

## 参考资料

- [autograd/core.py](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)，固定 commit 原文件。
- [autograd/numpy/numpy_vjps.py](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_vjps.py)，固定 commit 原文件。
- [autograd/util.py](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/util.py)，固定 commit 原文件。
- [Automatic Differentiation lecture](https://mlsyscourse.org/slides/04-automatic-differentiation.pdf)。

