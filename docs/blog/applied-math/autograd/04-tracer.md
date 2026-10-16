---
title: Autograd 源码学习（四）：tracer.py 与动态计算图
description: "Autograd 源码学习（四）：tracer.py 中的 Box、trace 边界与 primitive 包装，以及动态计算图如何建立。"
date: 2026-09-05
hide:
  - navigation
categories:
  - 应用数学
  - Autograd 源码学习
tags:
  - python
---

# Autograd 源码学习（四）：tracer.py 与动态计算图

上一篇已经走完 `grad` 的调用链，这里把镜头停在 primitive 收到 Box 的时刻。一个普通数值调用，要增加哪些状态，才能让后面的求导继续知道依赖来自哪里？

沿用 R、M、Bx 这些教学标签，我们按选择最高 trace、单层解箱、原始计算、节点构造和重新装箱的顺序读源码，再用真实的 if 与循环实验观察动态执行。

[:octicons-arrow-left-24: 上一篇](03-grad-call-chain.md) | [系列总览](00-overview.md) | [下一篇 :octicons-arrow-right-24:](05-core-reverse-mode.md)

源码基线：HIPS/autograd 1.9.1，commit `f53a21734fdfae636f448744d9097d8d35a643a0`。

## 本文目标

1. `trace`, `TraceStack`, `new_box` 与 `primitive` 各负责什么？
2. primitive 收到普通值或 Box 时为何走不同路径？
3. `if`、`for`、`while` 为什么无需变成静态图节点？

## Mental Model

tracer 是一个运行时观察层。它不给 Python 语法建图，只给实际执行到的 differentiable primitive calls 建 node。Box 像带着“本次 trace 身份与上游 node 指针”的运行值；primitive 在计算前解箱，在计算后把答案和新 node 重新装箱。

## 必要的数学

tracing 本身不是求导公式。它收集 reverse algorithm 之后所需的数据：

```text
operation output value
parents / differentiable argument positions
local VJP closure
```

链式法则和 adjoint propagation 属于 AD 算法；Box、trace id、node constructor 属于 Python 实现。

## 一个最小例子

`controlled_function(x)` 在 `x=2` 时真实执行：

```text
y = sin(x)
if x > 0:
    repeat twice: y = y*x
```

所以本次图只包含 positive branch 的 `sin` 与两个 `multiply`。negative branch 根本没有运行，也不会留下候选 graph。

## 对应的 Autograd 源码

| File / symbol | 谁调用 | 它调用谁 | 输入 -> 输出 | AD 角色 |
| --- | --- | --- | --- | --- |
| `tracer.py :: trace`（14 行） | `make_vjp`, JVP closure,其他 tracers | `trace_stack.new_trace`, `new_box`, `fun` | start node,fun,x -> value/end node | 一次 define-by-run trace |
| `TraceStack.new_trace`（148 行） | `trace` | 自增/自减 `top` | context -> integer trace id | nested trace 优先级 |
| `new_box`（186 行） | `trace`, primitive wrapper | `box_type_mappings[type(value)]` | value,trace,node -> registered Box subclass | 装箱 |
| `Box`（157 行） | `new_box` | 无求导调用 | value,trace,node -> wrapper | 关联三类状态 |
| `primitive`（44 行） | NumPy namespace wrapping / decorators | `find_top_boxed_args`, raw function, node constructor, `new_box` | raw callable -> wrapped callable | primitive 调用拦截 |
| `find_top_boxed_args`（119 行） | primitive wrapper | 扫描 positional args | args -> boxes/top trace/node type/dispatch flag | nested trace 仲裁 |

## 调用时序

<ol class="zdd-flow" aria-label="调用时序">
<li><code>trace(start_node, fun, x)</code></li>
<li><code>new_trace() gives t</code></li>
<li><code>new_box(x,t,start_node)</code></li>
<li><code>fun(start_box)</code></li>
<li><code>wrapped primitive</code></li>
<li><code>find highest-trace boxed args</code></li>
<li><code>replace Box args with _value</code></li>
<li><code>execute raw computation</code></li>
<li><code>node_constructor(ans,...,parents)</code></li>
<li><code>new_box(ans,trace,node)</code></li>
<li><code>return end_box._value, end_box._node</code></li>
</ol>

若输出不是本 trace 的 Box，当前代码发出 `Output seems independent of input` warning，并返回 `end_node=None`。

## 源码 walkthrough

### trace 的边界：输入装箱，输出拆出值与节点

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

调用者已决定模式并给出 `start_node`，tracer 本身没有写死 reverse mode。`x` 是输入值，`t` 是本次 trace id，`start_box` 将两者与节点关联。`fun(start_box)` 是普通 Python 函数调用，这一行允许任意实际执行的 if/loop 参与决定调用哪些 primitives。`end_box` 必须属于本 trace，才能返回它的 `_node`；否则给出 `None`，由 core 返回零导数。

`trace` 不会把程序解析为 AST，也不会在结束后扫描局部变量去补图。所有连接都是执行 primitive 时已经建立的。下一步看三个建立 trace 所需的基础对象。

[REAL SOURCE]  
File: [`autograd/tracer.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/tracer.py)  
Symbol: [`Node.new_root`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/tracer.py#L34-L38)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
    @classmethod
    def new_root(cls, *args, **kwargs):
        root = cls.__new__(cls)
        root.initialize_root(*args, **kwargs)
        return root
```

进入时 `cls` 由调用者指定，例如 `VJPNode`。root 不是由某个 primitive 计算出来的，因而没有 `fun,args,parents` 可传给普通 operation 构造器。这里用 `__new__` 分配对象，再调用子类的 `initialize_root` 初始化模式状态，最后交给 `trace`。reverse root 没有 parents；forward root 则由初始化参数接收 tangent。这是“指定 AD 输入边界”，不是创建一个虚构的输入 operation。

[REAL SOURCE]  
File: [`autograd/tracer.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/tracer.py)  
Symbol: [`TraceStack`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/tracer.py#L143-L151)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
class TraceStack:
    def __init__(self):
        self.top = -1

    @contextmanager
    def new_trace(self):
        self.top += 1
        yield self.top
        self.top -= 1
```

普通最外层求导进入时 `top=-1`，进入 context 后 `t=0`，正常离开时恢复为 -1。如果 context 内又求导，新层得到 1。id 表示当前嵌套优先级，并不是全局不断增加的 graph 编号；两次不嵌套的正常求导都会使用 0。这里只描述代码展示的正常进入/退出路径。分配完 id，下一步 `new_box` 才真正建立带身份的运行值。

[REAL SOURCE]  
File: [`autograd/tracer.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/tracer.py)  
Symbol: [`Box, state and boolean excerpt`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/tracer.py#L157-L169)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
class Box:
    type_mappings: ClassVar[dict] = {}
    types: ClassVar[set] = set()

    __slots__ = ["_node", "_trace", "_value"]

    def __init__(self, value, trace, node):
        self._value = value
        self._node = node
        self._trace = trace

    def __bool__(self):
        return bool(self._value)
```

构造器收到已经算好的值和已经创建的节点，只负责保存关联。它产生的 Box 继续流入用户函数/primitive；`__bool__` 把真值判断交给底层值。Box 自身没有求导规则，也没有反向累计梯度槽位。三个 slot 的含义是：

- `_value`：本层 Box 包裹的 forward value；高阶求导时它也可能是较低 trace 的 Box。
- `_trace`：整数优先级。`find_top_boxed_args` 只让最高 trace 构造本次 node。
- `_node`：当前值在对应 trace 中的 node。

[REAL SOURCE]  
File: [`autograd/tracer.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/tracer.py)  
Symbol: [`Box.register`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/tracer.py#L176-L180)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
    @classmethod
    def register(cls, value_type):
        Box.types.add(cls)
        Box.type_mappings[value_type] = cls
        Box.type_mappings[cls] = cls
```

NumPy 集成调用 `ArrayBox.register(float)` 等注册函数时，`cls=ArrayBox`，这会让普通 float 选择 ArrayBox，也让已经是 ArrayBox 的值还能再被 ArrayBox 包一层。后一个映射是 第十篇 的 nested Box 能通过同一工厂创建的关键，当前课只需知道工厂由类型表驱动。

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

本例调用 `new_box(3.0,0,R)`，表中取到 ArrayBox 构造器，返回 Bx。输出重装箱时调用 `new_box(9.0,0,M)`，返回 Bz。两次的职责相同：把一个已知值与其 AD 状态连接起来，交给下一段用户运算。没有注册类型时不能凭空发明一种 Box。

### primitive 的三级阅读：先模型，再原文，再完整位置

primitive 的两个 happy paths：

```text
没有 boxed args -> 直接 f_raw(*args, **kwargs)
存在 boxed args -> 解箱 -> raw compute -> 建 node -> re-box
```

解箱让底层数值库看到它认识的值；re-box 让后续 operation 继续携带 trace。NumPy ufunc 还有 `__array_ufunc__` dispatcher 分支，这是 xarray 等互操作的当前实现细节。

[TEACHING SIMPLIFICATION]  
以下不是 HIPS/autograd verbatim source。省略 ufunc dispatch、notrace 分支、异常处理和 wrapper 元数据；保留逐层递归解箱，建立普通数值 happy-path mental model。

```python
def teaching_primitive(raw):
    def wrapped(*args, **kwargs):
        boxes, t, node_type, _dispatch = find_top_boxed_args(args)
        if not boxes:
            return raw(*args, **kwargs)
        values = list(args)
        for position, box in boxes:
            values[position] = box._value
        parents = tuple(box._node for _, box in boxes)
        positions = tuple(position for position, _ in boxes)
        answer = wrapped(*values, **kwargs)
        node = node_type(answer, wrapped, tuple(values), kwargs, positions, parents)
        return new_box(answer, t, node)
    return wrapped
```

进入 `wrapped` 时只有实参 tuple，可能含 Box。`boxes` 选出本层活跃输入；`values` 是只解掉这一层后的参数；`parents` 和 `positions` 保存依赖位置；`answer` 是原运算结果；`node` 把该 operation 的局部 AD 状态接到父节点上。最后重新装箱，保证下个 operation 仍知道 trace 身份。它对应 AD 中“执行局部原操作并记录依赖”，尚未传播 reverse cotangent。

这里递归调用 `wrapped` 而不是强行直接调用 `raw`，是为保留较低 trace 的处理机会。对当前普通一阶例子只多进入一层 wrapper：第二次已经没有 Box，于是才执行 raw multiply。下面看真实实现的两个连续区段。

[REAL SOURCE]  
File: [`autograd/tracer.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/tracer.py)  
Symbol: [`primitive.f_wrapped, argument selection entry`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/tracer.py#L51-L53)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
    @wraps(f_raw)
    def f_wrapped(*args, called_by_autograd_dispatcher=False, **kwargs):
        boxed_args, trace, node_constructor, ufunc_dispatch_needed = find_top_boxed_args(args)
```

进入的是 primitive 的实际调用，不是装饰器首次包装函数的时刻。`f_raw` 在外层 closure 中指向 NumPy multiply；本次返回的 `node_constructor` 是 VJPNode，由最高 trace 的父节点类型决定。本例 dispatch 标记为 False，不经过第三方 ufunc 分派；下一步进入真实的解箱区段。

[REAL SOURCE]  
File: [`autograd/tracer.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/tracer.py)  
Symbol: [`primitive.f_wrapped, unbox through rebox excerpt`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/tracer.py#L77-L88)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
            argvals = subvals(args, [(argnum, box._value) for argnum, box in boxed_args])
            if f_wrapped in notrace_primitives[node_constructor]:
                return f_wrapped(
                    *argvals, called_by_autograd_dispatcher=called_by_autograd_dispatcher, **kwargs
                )
            parents = tuple(box._node for _, box in boxed_args)
            argnums = tuple(argnum for argnum, _ in boxed_args)
            ans = f_wrapped(*argvals, called_by_autograd_dispatcher=called_by_autograd_dispatcher, **kwargs)
            node = node_constructor(ans, f_wrapped, argvals, kwargs, argnums, parents)
            try:
                box = new_box(ans, trace, node)
                return box
```

进入时 `boxed_args` 已经选好。本例 `argvals=(3.0,3.0)`，multiply 没有被登记为 notrace，因而产生 `parents=(R,R)`、`argnums=(0,1)`。`ans` 的递归调用最终落到 raw multiply 并得到 9；之后构造 M，并将 M 与 9 装进 Bz。VJPNode 的构造会查局部规则，下一篇展开；tracer 只提供一致的构造参数。

注意真实语句先提取 `parents/argnums`，再计算 `ans`。下面的生命周期图按运行顺序画，避免把概念上“得到结果后关联依赖”误读成另一种语句顺序。

```text
Box input (Bx,Bx)
  -> find top trace: boxed_args=[(0,Bx),(1,Bx)], t=0
  -> unbox this layer: argvals=(3,3)
  -> collect parents/argnums: (R,R), (0,1)
  -> recursive wrapper -> no boxes -> raw multiply(3,3)=9
  -> node construction: M=VJPNode(...)
  -> rebox: Bz(value=9,trace=0,node=M)
  -> next user operation, or trace returns (9,M)
```

完整位置：`autograd/tracer.py :: primitive`。上面原文没有改动签名，也没有用省略号替换内部语句；未展示的部分主要是 dispatch 决策、异常转换与包装器属性设置。研究互操作时才需要打开完整 symbol。

### find_top_boxed_args 选择哪个 trace 负责这次 operation

[REAL SOURCE]  
File: [`autograd/tracer.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/tracer.py)  
Symbol: [`find_top_boxed_args`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/tracer.py#L119-L140)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
def find_top_boxed_args(args):
    top_trace = -1
    top_boxes = []
    top_node_type = None
    any_arraybox = False
    any_unboxed_ufunc_overrider = False
    for argnum, arg in enumerate(args):
        t = type(arg)
        if t in box_types:
            if t == autograd.numpy.numpy_boxes.ArrayBox:
                any_arraybox = True
            trace = arg._trace
            if trace > top_trace:
                top_boxes = [(argnum, arg)]
                top_trace = trace
                top_node_type = type(arg._node)
            elif trace == top_trace:
                top_boxes.append((argnum, arg))
        elif getattr(t, "__array_ufunc__", None) not in (None, np.ndarray.__array_ufunc__):
            any_unboxed_ufunc_overrider = True
    ufunc_dispatch_needed = any_arraybox and any_unboxed_ufunc_overrider
    return top_boxes, top_trace, top_node_type, ufunc_dispatch_needed
```

输入是 positional args，而不是 Python 局部变量表。第一次遇到 Bx 时，把最高 trace 从 -1 改成 0，记录 `(0,Bx)`；第二个位置还是 Bx，trace 相等，于是追加 `(1,Bx)`。代码没有按 Box 身份去重，所以重复使用一个输入的两条边都能保留。`top_node_type` 来自 Box 的 node，是 tracer 在不同模式间复用的接口。

遇到更高 trace 时旧列表被替换，较低 trace 不参与当前层的 parents；但较低 Box 仍留在解箱后的实参中，下一层递归再处理。当前函数不会递归进入 `_value`；它只在本次参数边界决定最高层归属。两个布尔变量只服务 NumPy dispatch，不决定数学导数。

### STATE SNAPSHOT：multiply wrapper 内部

| 时刻 / 局部变量 | Python 对象或值 | Box / node 状态 | 产物与下一步 |
| --- | --- | --- | --- |
| args | `(Bx,Bx)` | 同一 ArrayBox 出现两次，value=3，trace=0，node=R | 扫描两个位置 |
| boxed_args | `[(0,Bx),(1,Bx)]` | 保留两条边 | 只解最高 trace |
| trace / node_constructor | `0` / `VJPNode` 类 | 身份 / 构造器分离 | 选择本层 AD 模式 |
| argvals | `(3.0,3.0)` | 普通 float，无 Box | 递归 wrapper 调 raw computation |
| parents / argnums | `(R,R)` / `(0,1)` | 两个引用指向同一 R | 交给构造器，不存入 Box |
| ans | 数值 9.0 | 本例无 Box | 创建 M |
| node | M，VJPNode | parents=(R,R)，vjp 已准备，尚无 upstream g | 重装箱 |
| box | Bz，ArrayBox | `_value=9`，`_trace=0`，`_node=M` | 返回用户函数，继续执行 |

### Python if/loop 为什么不需要额外 graph node

本文实验的 `x>0` 经 `ArrayBox.__gt__` 转发到 `anp.greater`；`numpy_vjps.py :: nograd_functions` 包含 greater，并调用 `register_notrace(VJPNode,fun)`。因此比较运算提供给 Python 的是用于分支选择的普通布尔结果，tracer 不为比较构造 VJPNode。Python 根据它执行 positive branch，循环每迭代一次，就再调用一次实际 multiply。

本次 `x=2` 时程序等价于 `sin(x)*x*x`，其导数 `x^2*cos(x)+2*x*sin(x)` 是当前执行路径上的导数。这里没有对“选择分支”这个离散决定求导；分支边界处是否可微是函数本身的数学问题。`for` 决定 operation 调用次数，不需要额外的 loop VJP。

## 实验验证

[完整实验：trace_box.py](../../../assets/autograd/experiments/trace_box.py)。运行环境、资源目录及路径配置见[系列总览](00-overview.md#experiments)。下方命令以解压后的资源目录为工作目录。

[EXPERIMENT]  
File: [`experiments/trace_box.py`](../../../assets/autograd/experiments/trace_box.py)  
Purpose: 观察实际执行分支与每个中间值的 Box 私有字段。

```python
def controlled_function(x):
    observe("input", x)
    y = np.sin(x)
    observe("sin", y)

    if x > 0:
        for index in range(2):
            y = y * x
            observe(f"positive-loop-{index}", y)
    else:
        y = -y
        observe("negative-branch", y)
    return y
```

进入时 `x` 是 trace 0 的 ArrayBox；`observe` 仅读取字段，把信息放在实验列表中。每次乘法返回新 Box 并更新 Python 名字 `y`，旧的依赖仍通过 node parents 保留。函数返回 positive branch 的最终 Box，随后真实 grad 执行 reverse pass。实验断言观察标签恰好是下表四项，没有 negative branch。

### STATE SNAPSHOT：控制流实验 forward

| 观察标签 | Type | `_value`（约） | `_trace` | `_node` 的教学标签 | parents（按源码推演） |
| --- | --- | ---: | ---: | --- | --- |
| input | ArrayBox | 2 | 0 | R | [] |
| sin | ArrayBox | 0.9092974268 | 0 | S | (R,) |
| positive-loop-0 | ArrayBox | 1.8185948537 | 0 | M0 | (S,R) |
| positive-loop-1 | ArrayBox | 3.6371897073 | 0 | M1 | (M0,R) |

实验直接记录 Type/value/trace/node 类型；教学节点标签和 parents 列由真实 wrapper 的参数顺序推演，没有声称实验输出了对象 id 或父列表。运行 `python -B experiments/trace_box.py`，观察结果：

```text
input/sin/positive-loop-0/positive-loop-1 均为 ArrayBox
trace 均为 0，node 均为 VJPNode
executed branch=positive, loop iterations=2
gradient=1.972602361114
all checks passed
```

## 理论与源码的对应关系

| 概念 | 当前实现 |
| --- | --- |
| define-by-run | `trace` 直接执行 `fun(start_box)` |
| 动态控制流 | Python 自己执行条件和循环，只有实际 primitive calls 被记录 |
| graph node | 由 `node_constructor` 创建的 `VJPNode`/`JVPNode` |
| graph edge | node constructor 收到的 `parents` |
| nested differentiation | `TraceStack` 与 highest `_trace` selection |
| operator overloading | `ArrayBox.__mul__` 等转发到 wrapped NumPy functions |

## 几个自测问题

1. primitive 为什么不能把 Box 原样传给原生 NumPy ufunc 后就结束？
2. 控制流本身不建 node，为什么仍能得到当前输入的正确导数？
3. nested Box 中为何必须优先处理 trace id 更大的那一层？

## 小结

tracer 观察实际 primitive 调用，Box 把值、trace id 与 node 关联起来。Python 自己决定分支和循环，当前执行路径上的可微运算才建立节点；最高 trace 的选择也为后面的嵌套求导保留了边界。

## 下一篇

接下来读[第五篇：Reverse Mode 的核心实现](05-core-reverse-mode.md)。

## 参考资料

- [autograd/tracer.py](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/tracer.py)，固定 commit 原文件。
- [Automatic Differentiation lecture](https://mlsyscourse.org/slides/04-automatic-differentiation.pdf)。

---

[:octicons-arrow-left-24: 上一篇](03-grad-call-chain.md) | [系列总览](00-overview.md) | [下一篇 :octicons-arrow-right-24:](05-core-reverse-mode.md)
