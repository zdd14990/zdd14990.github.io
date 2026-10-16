---
title: Autograd 源码学习（三）：从 grad 开始追踪完整调用链
date: 2026-09-05
hide:
  - navigation
categories:
  - 应用数学
  - Autograd 源码学习
tags:
  - autograd
  - automatic-differentiation
  - python
---

# Autograd 源码学习（三）：从 grad 开始追踪完整调用链

现在已经知道 `grad` 最终要做一次 VJP 查询，但 `grad(f)(3.0)` 中还夹着参数适配、装箱、primitive 调用和图节点创建。只看最后两行反向代码，很容易漏掉这些对象是从哪里来的。

我们沿 `f(x)=x*x` 走完整条链：先区分 `grad(f)` 与真正求值，再追踪 3、9、1 和 6 分别出现在哪个对象里。primitive 的分支和 backward 字典的细节，分别留到接下来两篇展开。

[:octicons-arrow-left-24: 上一篇](02-jvp-vjp.md) | [系列总览](00-overview.md) | [下一篇 :octicons-arrow-right-24:](04-tracer.md)

源码基线：HIPS/autograd 1.9.1，commit `f53a21734fdfae636f448744d9097d8d35a643a0`。

## 本文目标

1. `df = grad(f)` 与 `df(3.0)` 分别发生什么？
2. `x*x` 如何变成一个有两条 parent edge 的 operation node？
3. `1 -> (3,3) -> 6` 在真实实现中如何流动？

## Mental Model

`grad(f)` 只创建包装函数；真正 tracing 发生在调用 `df(x)` 时。输入被 Box 包装，`x*x` 被 `ArrayBox.__mul__` 转发到 `anp.multiply` primitive。forward 得到 9 并形成一个 multiply node；reverse seed 1 经两个输入位置各产生 3，最终汇合成 6。

## 必要的数学

```text
f(x)=x*x
df/dx = (dx/dx)*x + x*(dx/dx) = x+x
x=3 -> 3+3=6
```

两个 contribution 来自乘法 primitive 的两个输入位置，不是因为代码里出现了两个不同的 `x` 对象。

## 一个最小例子

[EXPERIMENT]  
File: [`experiments/simple_grad.py`](../../../assets/autograd/experiments/simple_grad.py)  
Purpose: 同一个 x 出现在 multiply 的两个参数位置，验证 forward=9 与 grad=6。

```python
def f(x):
    return x * x
```

这是实验的原函数。调用 `grad(f)(3.0)` 时，函数体内的 `x` 会被替换成一个 ArrayBox；两次读取局部变量 `x` 得到同一 Python 对象。函数返回的是 multiply 的新 Box，并不是直接返回普通 `9.0` 给 tracer 以外的用户。

实际 operation graph：

```text
root x(value=3) --arg 0--\
                         multiply(value=9) -> output
root x(value=3) --arg 1--/
```

## 对应的 Autograd 源码

| File / symbol | 谁调用 | 它调用谁 | 输入 -> 输出 | AD 角色 |
| --- | --- | --- | --- | --- |
| `wrap_util.py :: unary_to_nary` | `@unary_to_nary` 与 API aliases | 包装的 unary operator | `fun,argnum,*args` -> 选定参数的 unary call | 多参数适配 |
| `differential_operators.py :: grad` | 生成的 grad wrapper | `_make_vjp`, `vspace` | `fun,x` -> gradient | scalar reverse seed |
| `core.py :: make_vjp` | `grad` | `trace`, `backward_pass` closure | `fun,x` -> `(vjp,value)` | 构图与 pullback |
| `tracer.py :: trace` | `make_vjp` | `new_box`, 用户 `fun` | root,fun,x -> end value/node | 真实执行 |
| `numpy_boxes.py :: ArrayBox.__mul__` | 用户表达式 `x*x` | `anp.multiply` | 两个 operand -> Box | 运算符接管 |
| `tracer.py :: primitive.f_wrapped` | `anp.multiply` | raw ufunc, `VJPNode`, `new_box` | boxed args -> boxed result | 记录 operation |
| `core.py :: VJPNode.__init__` | primitive wrapper | `primitive_vjps[fun]` | ans,args,parents -> node | 保存 parents/VJP |
| `core.py :: backward_pass` | VJP closure | `toposort`, `node.vjp`, `add_outgrads` | seed,end node -> root grad | reverse traversal |

## 调用时序

本文内部已有完整链路；需要更大版时可打开 [对象与调用时序图](../../../assets/autograd/diagrams/grad-runtime-sequence.txt)。

<ol class="zdd-flow" aria-label="调用时序">
<li><code>user: grad(f)</code></li>
<li><code>unary_to_nary returns grad_of_f</code></li>
<li><code>user: grad_of_f(3.0)</code></li>
<li><code>differential_operators.grad</code></li>
<li><code>_make_vjp alias = core.make_vjp</code></li>
<li><code>VJPNode.new_root</code></li>
<li><code>tracer.trace</code></li>
<li><code>new_box(3.0, trace=0, root)</code></li>
<li><code>f(ArrayBox)</code></li>
<li><code>ArrayBox.__mul__</code></li>
<li><code>anp.multiply primitive wrapper</code></li>
<li><code>raw multiply(3.0,3.0)=9.0</code></li>
<li><code>VJPNode constructed with value=9, parents=(root,root)</code></li>
<li><code>new_box(9.0,...)</code></li>
<li><code>trace returns (9.0,end_node)</code></li>
<li><code>grad seeds vjp with ones() = 1</code></li>
<li><code>backward_pass: multiply VJP gives (3,3)</code></li>
<li><code>add_outgrads accumulates root to 6</code></li>
<li><code>user receives 6</code></li>
</ol>

## 源码 walkthrough

### `grad(f)` 只制造一个待执行的 Python 函数

先辨认两个同名层次：源码里的 unary `grad(fun,x)` 是求导算法入口；经装饰器处理后，用户导入的 `grad` 是 `nary_operator`。装饰器在模块导入时已经运行，用户 `grad(f)` 不会重新执行装饰过程。

[REAL SOURCE]  
File: [`autograd/wrap_util.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/wrap_util.py)  
Symbol: [`unary_to_nary`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/wrap_util.py#L6-L29)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
def unary_to_nary(unary_operator):
    @wraps(unary_operator)
    def nary_operator(fun, argnum=0, *nary_op_args, **nary_op_kwargs):
        assert type(argnum) in (int, tuple, list), argnum

        @wrap_nary_f(fun, unary_operator, argnum)
        def nary_f(*args, **kwargs):
            @wraps(fun)
            def unary_f(x):
                if isinstance(argnum, int):
                    subargs = subvals(args, [(argnum, x)])
                else:
                    subargs = subvals(args, zip(argnum, x))
                return fun(*subargs, **kwargs)

            if isinstance(argnum, int):
                x = args[argnum]
            else:
                x = tuple(args[i] for i in argnum)
            return unary_operator(unary_f, x, *nary_op_args, **nary_op_kwargs)

        return nary_f

    return nary_operator
```

`grad(f)` 调用 `nary_operator`，此时 `fun=f`、`argnum=0`，返回 `nary_f`，没有输入数值、Box 或图。随后 `nary_f(3.0)` 收到 `args=(3.0,)`、`kwargs={}`，取出 `x=3.0`，创建一个捕获这些参数的 `unary_f`，再调用原 unary `grad(unary_f,3.0)`。

以后 tracer 把 Box 交给 `unary_f(x)` 时，`subvals` 产生新的参数 tuple，只有被选中的参数位置换成 Box；最后 `fun(*subargs,**kwargs)` 才执行实验的 `f`。这层负责选择求导自变量，不负责创建图节点或计算梯度。多参数支持与一元 AD 核心由此分开。

### unary grad 安排 forward 与 reverse seed

[REAL SOURCE]  
File: [`autograd/differential_operators.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/differential_operators.py)  
Symbol: [`grad`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/differential_operators.py#L23-L36)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
@unary_to_nary
def grad(fun, x):
    """
    Returns a function which computes the gradient of `fun` with respect to
    positional argument number `argnum`. The returned function takes the same
    arguments as `fun`, but returns the gradient instead. The function `fun`
    should be scalar-valued. The gradient has the same type as the argument."""
    vjp, ans = _make_vjp(fun, x)
    if not vspace(ans).size == 1:
        raise TypeError(
            "Grad only applies to real scalar-output functions. "
            "Try jacobian, elementwise_grad or holomorphic_grad."
        )
    return vjp(vspace(ans).ones())
```

本例进入函数体时 `fun=unary_f`，`x=3.0` 仍未装箱。它先等待 `_make_vjp` 返回 `vjp` 与 `ans=9.0`；等所有 forward 节点已经建立后，才构造 output ones 并调用 pullback。最后的 `6.0` 是这个 `return` 返回的输入 cotangent，而 `9.0` 没有作为 `grad` 的结果返回。

[REAL SOURCE]  
File: [`autograd/differential_operators.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/differential_operators.py)  
Symbol: [`_make_vjp import alias and public make_vjp/make_jvp aliases`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/differential_operators.py#L14-L20)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
from .core import make_jvp as _make_jvp
from .core import make_vjp as _make_vjp
from .extend import defvjp_argnum, primitive, vspace
from .wrap_util import unary_to_nary

make_vjp = unary_to_nary(_make_vjp)
make_jvp = unary_to_nary(_make_jvp)
```

这段在导入时绑定 Python callable；`_make_vjp` 就是 core 的 `make_vjp`，并没有一个额外的隐藏求导引擎。用户 API `make_vjp(f)(x)` 经过适配器，`grad` 内部则直接调用 `_make_vjp(fun,x)`。两条路下一步都到同一个 core 函数。

### make_vjp 创建 root，再真实运行用户函数

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

`start_node` 是一个真实 `VJPNode`，本文给它取教学名字 R。它表示被求导输入的根，没有 parents，也没有 `value` 字段。`trace` 回来后，正常分支创建一个捕获 `end_node` 的函数；它并未运行 backward。`end_node` 是 multiply 节点 M，M 的父引用最终能到达 R。

[REAL SOURCE]  
File: [`autograd/tracer.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/tracer.py)  
Symbol: [`trace`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/tracer.py#L14-L22)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
def trace(start_node, fun, x):
    with trace_stack.new_trace() as t:
        start_box = new_box(x, t, start_node)
        end_box = fun(start_box)
        if isbox(end_box) and end_box._trace == start_box._trace:
            return end_box._value, end_box._node
        else:
            warnings.warn("Output seems independent of input.")
            return end_box, None
```

进入时 R 与普通 `3.0` 是两个对象。最外层正常 trace 的 `t=0`；`new_box` 把它们与 trace 身份关联成 `start_box`。`fun(start_box)` 经前面的 `unary_f` 回到实验 `f`。`end_box` 是 `x*x` 的结果 Box，trace 最后只拆掉属于本层的外壳，得到普通 `9.0` 与 M。这一步从“运行用户代码”切换回“准备反向查询”。

[REAL SOURCE]  
File: [`autograd/tracer.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/tracer.py)  
Symbol: [`new_box`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/tracer.py#L186-L190)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
def new_box(value, trace, node):
    try:
        return box_type_mappings[type(value)](value, trace, node)
    except KeyError:
        raise TypeError(f"Can't differentiate w.r.t. type {type(value)}")
```

这里 `value=3.0`、`trace=0`、`node=R`；float 已在 NumPy 集成中注册到 `ArrayBox`。返回对象把值、身份、节点连接起来，下一步传给 `f`，不是在此处算 `df/dx`。输出 `9.0` 同样经这个工厂重新装箱；Box 支持哪些类型由注册表决定。

### Python 乘法如何落到一个 primitive

[REAL SOURCE]  
File: [`autograd/numpy/numpy_boxes.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_boxes.py)  
Symbol: [`ArrayBox.__mul__`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_boxes.py#L69-L70)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
    def __mul__(self, other):
        return anp.multiply(self, other)
```

`self` 与 `other` 都是同一个 start Box，底层值都是 3，节点都是 R。该方法没有自行计算梯度，直接把两个 Box 交给 `anp.multiply`。这个名字已由 NumPy wrapper 包装为 primitive，下一步进入 `tracer.primitive` 内的 `f_wrapped`。

本次没有其他数组库参与 ufunc dispatch。wrapper 找到两个最高 trace 的 boxed argument 条目，解开本层值之后走下面这个连续区段。

[REAL SOURCE]  
File: [`autograd/tracer.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/tracer.py)  
Symbol: [`primitive.f_wrapped, parents through new_box excerpt`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/tracer.py#L82-L88)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
            parents = tuple(box._node for _, box in boxed_args)
            argnums = tuple(argnum for argnum, _ in boxed_args)
            ans = f_wrapped(*argvals, called_by_autograd_dispatcher=called_by_autograd_dispatcher, **kwargs)
            node = node_constructor(ans, f_wrapped, argvals, kwargs, argnums, parents)
            try:
                box = new_box(ans, trace, node)
                return box
```

`boxed_args=[(0,start_box),(1,start_box)]`，所以 `parents=(R,R)`、`argnums=(0,1)`；`argvals=(3.0,3.0)`。递归调用 `f_wrapped` 后，内层已经没有 Box，于是调用 raw NumPy multiply 得到 `ans=9.0`。`node_constructor` 是 `VJPNode`，创建 M；M 通过 registry 得到本次 multiply 的局部 `vjp`，再由 `new_box` 产生结果 Box。

先记住三个产物：数值答案 9、依赖 `(R,R)`、等待未来 g 的局部规则。`argnums` 是 wrapper 局部变量/构造参数，不是 M 上的字段；M 的字段只有 `parents,vjp`。完整 primitive 位置是 `autograd/tracer.py :: primitive`，选择、解箱和分支在下一篇展开。

### 输出 ones 才把 forward 图变成一次梯度查询

[REAL SOURCE]  
File: [`autograd/numpy/numpy_vspaces.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_vspaces.py)  
Symbol: [`ArrayVSpace.ones`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_vspaces.py#L24-L25)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
    def ones(self):
        return np.ones(self.shape, dtype=self.dtype)
```

`vspace(ans)` 的 shape 是 `()`，dtype 来自 forward answer。这里产生的是 0 维 NumPy 全 1 数组，数学值为 1。这个 `g` 表示 `df/df`，不是输入值 3，也不是输出值 9；`grad` 把它交给刚得到的 VJP closure，closure 接着调用 `backward_pass(g,M)`。

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

本文只做一次整体阅读：`outgrads` 是本次查询的 cotangent 字典；`toposort(M)` 依次给 M、R；M 的 VJP 用 seed 1 得到两个输入贡献 `(3,3)`，两次写同一个 key R 时被 `add_outgrads` 合并成 6。R 的局部 VJP 为空，没有更早的输入，循环最后返回它收到的 6。第五篇 会逐次展开 `pop`、tuple、flag 和每次累加。

### STATE SNAPSHOT：forward 结束前的对象

以下 R/M/Bx/Bz 都是教学标签，不是对象自带的 `name`。表格依据上述源码推演；实验里的 RecordingNode 另有观察字段，不能混用。

| Object | Type | `_value` / forward value | `_trace` | `_node` | parents | argnums |
| --- | --- | --- | --- | --- | --- | --- |
| 调用参数 x | Python float | 3.0 | 无 | 无 | 无 | API 选择 0 |
| R=start_node | VJPNode | 无 value 字段 | 无 | 无 | `[]` | 无字段 |
| Bx=start_box | ArrayBox | 3.0 | 0 | R | 由 R 给出 | 无字段 |
| wrapper args | tuple | `(Bx,Bx)` | 两项均为 0 | 两项均指向 R | 将生成 `(R,R)` | `(0,1)` |
| wrapper argvals | tuple | `(3.0,3.0)` | 无 | 无 | 无 | 与原位置一致 |
| M=乘法节点 | VJPNode | 构造时收到 9.0，但不存 value 字段 | 无 | 无 | `(R,R)` | 构造时收到 `(0,1)`，不存字段 |
| Bz=end_box | ArrayBox | NumPy scalar 9.0 | 0 | M | 由 M 给出 | 无字段 |
| make_vjp 返回 | tuple | `(vjp,9.0)` | 无新 trace | closure 捕获 M | 可通过 M 访问图 | 无 |

### STATE SNAPSHOT：反向查询与返回

| 时刻 | Python object | Box? / node? | value / parents | g 的意义与数值 |
| --- | --- | --- | --- | --- |
| output ones | 0 维 ndarray | 非 Box，无 node | 1.0，shape=() | `df/df=1` |
| 处理 M | VJPNode + outgrad tuple | node=M，非 Box | parents=(R,R) | upstream=1 |
| 调用 M.vjp | 返回 cotangent tuple | 普通数值，无本层 Box | ingrads=(3,3) | 两个参数位置各贡献 3 |
| 合并到 R | outgrads[R] tuple | key 是 R | `(6,True)` | 输入总 cotangent=6 |
| 处理 R | VJPNode | parents=[] | R.vjp(6)=() | 6 保留为最终返回值 |
| 用户收到 | NumPy scalar | 非 Box，无 node | 6.0 | `df/dx` |

从这两张表可以分清：forward 的值由 Box 携带，反向所需的边/规则由 Node 保留，某次 backward 的梯度则存在独立字典中。没有“每个 VJPNode 自带一个 grad 数字”的设计。

### STATE SNAPSHOT：按调用边界复盘整条链

| 边界 | 当前 Python object / value | Box? | node / parents | g? |
| --- | --- | --- | --- | --- |
| 用户 grad(f) | f 与返回的 nary_f 函数对象 | 否 | 尚未建图 | 无 |
| unary_to_nary 产生的 nary_f(3.0) | args=(3.0,)，unary_f closure | 否 | 无 | 无 |
| unary grad(unary_f,3.0) | 被适配函数与 float3 | 否 | 即将交给 core | 尚未 seed |
| _make_vjp alias -> make_vjp | 同一 core callable | 否 | 创建 R，parents=[] | 无 |
| trace(R,fun,3.0) | t=0，运行上下文 | 初始输入未装箱 | R 已存在 | 无 |
| new_box | Bx，value=3 | 是 | Bx._node=R | 无 |
| ArrayBox.__mul__ | self=other=Bx | 是 | 两个 operand 同指 R | 无 |
| anp.multiply / wrapper | boxed args=(Bx,Bx)，argvals=(3,3) | 解本层后为否 | parents=(R,R)，argnums=(0,1) | 无 |
| raw computation | NumPy float64，value=9 | 否 | 尚未创建 M | 无 |
| VJPNode construction | M，局部 vjp closure | node 本身不是 Box | M.parents=(R,R) | 等待未来 upstream |
| rebox / end_node | Bz(value=9,node=M)，随后拆成 (9,M) | 返回 Box 再解箱 | M | 无 |
| output ones | ndarray(value=1,shape=()) | 否 | seed 不创建本层 node | 1 |
| backward_pass | outgrads、outgrad、ingrads | 本例为普通数值 | 按 M -> R 遍历 | 1 -> (3,3) -> 6 |
| 最终 return | NumPy float64，value=6 | 否 | 不向用户返回图节点 | df/dx=6 |

## 实验验证

[完整实验：simple_grad.py](../../../assets/autograd/experiments/simple_grad.py)。运行环境、资源目录及路径配置见[系列总览](00-overview.md#experiments)。下方命令以解压后的资源目录为工作目录。

[EXPERIMENT]  
File: [`experiments/simple_grad.py`](../../../assets/autograd/experiments/simple_grad.py)  
Purpose: 用 RecordingNode 查看真实 trace 的依赖，同时单独运行真实 VJPNode 求导。

```python
    root = RecordingNode.new_root(x)
    end_value, end_node = trace(root, f, x)
    reverse_nodes = list(toposort(end_node))

    vjp, forward_value = make_vjp(f)(x)
    result = vjp(1.0)
    grad_result = grad(f)(x)
```

第一段使用自定义观察节点保存 operation name/value/argnums，验证 tracing 机制；后两次调用分别走 public `make_vjp` 和 `grad`，实际使用 VJPNode 计算 6。它们是独立 trace，不能把 RecordingNode 的额外字段当作 VJPNode 属性。下一步实验的断言检查节点的重复父引用、forward value 和两种求导结果。

运行 `python -B experiments/simple_grad.py`，现有输出摘要：

```text
operation: primitive=multiply, value=9.0,
parent_argnums=(0, 1), parents=['x', 'x']
reverse topo order: ['v1', 'x']
vjp(1.0): 6.0
all checks passed
```

## 理论与源码的对应关系

| 抽象 | 对象状态 |
| --- | --- |
| 输入值 3 | root `ArrayBox._value` |
| 输入节点 | `VJPNode.new_root()` |
| `x*x` operation | multiply `VJPNode` |
| 两条输入 edge | `parents=(root,root)` 与 `parent_argnums=(0,1)` |
| forward value 9 | end Box 的 `_value`，随后由 trace 解箱返回 |
| output seed 1 | `vspace(ans).ones()` |
| 两个 partial adjoints | multiply VJP 返回的两个 `3` |
| final gradient | root outgrad `6` |

## 几个自测问题

1. 为什么 `grad(f)` 时还没有本次输入对应的计算图？
2. `parents=(root,root)` 与“保存两份 root node”有什么区别？
3. 若 `f(x)=x*x+x`，root 会收到几个 contribution？

## 小结

包装器选择求导参数，trace 让输入 Box 穿过 primitive，VJPNode 保存父引用与局部规则。forward 返回 9 后，grad 才注入 output ones；乘法的两个参数位置各贡献 3，最终返回 6。

## 下一篇

接下来读[第四篇：tracer.py 与动态计算图](04-tracer.md)。

## 参考资料

- [autograd/core.py](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)，固定 commit 原文件。
- [autograd/differential_operators.py](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/differential_operators.py)，固定 commit 原文件。
- [autograd/numpy/numpy_boxes.py](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_boxes.py)，固定 commit 原文件。
- [autograd/numpy/numpy_vspaces.py](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_vspaces.py)，固定 commit 原文件。
- [autograd/tracer.py](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/tracer.py)，固定 commit 原文件。
- [autograd/wrap_util.py](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/wrap_util.py)，固定 commit 原文件。
- [Automatic Differentiation lecture](https://mlsyscourse.org/slides/04-automatic-differentiation.pdf)。

---

[:octicons-arrow-left-24: 上一篇](02-jvp-vjp.md) | [系列总览](00-overview.md) | [下一篇 :octicons-arrow-right-24:](04-tracer.md)
