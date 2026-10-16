---
title: Autograd 源码学习（八）：Forward Mode 与 JVPNode
description: "Autograd 源码学习（八）：make_jvp、JVPNode 与 defjvp，看 forward mode 如何在建图时执行链式法则。"
date: 2026-09-05
hide:
  - navigation
categories:
  - 应用数学
  - Autograd 源码学习
tags:
  - python
---

# Autograd 源码学习（八）：Forward Mode 与 JVPNode

到这里，reverse mode 的保存、等待和反向遍历已经完整了。换成 forward mode 后，tracer 仍然可用，但一个 operation 在创建节点时就已经拿到了所有 parent tangents。

这一篇直接读 JVPNode、defjvp 和 def_linear，再用两次输入 basis 查询拼出 Jacobian。关键是分清“当前就能计算的 tangent”和“以后才到达的 cotangent”。


源码基线：HIPS/autograd 1.9.1，commit `f53a21734fdfae636f448744d9097d8d35a643a0`。

## 本文目标

1. tangent 如何在 forward computation 中传播？
2. `JVPNode` 与 `VJPNode` 的状态为何不同？
3. 如何通过 input basis JVP 组装完整 Jacobian？

## Mental Model

forward mode 给输入附带一个 tangent。每个 primitive 在计算普通 answer 的同时，把 parent tangents 通过局部 JVP 推到 output tangent。计算结束时 tangent 已在 end node 上，不需要再反向走图。

## 必要的数学

对 `z=op(x,y)`：

```text
z_dot = (dz/dx) x_dot + (dz/dy) y_dot
```

例如 `z=x*y`：`z_dot=y*x_dot+x*y_dot`。给 `x_dot=e_i` 会得到 Jacobian 第 `i` 列；因此 `R^n -> R^m` 的完整 Jacobian通常需要 `n` 个 input basis directions。

## 一个最小例子

```text
f([x0,x1])=[x0+x1, x0*x1, sin(x0)]
x=[2,3]
```

方向 `[1,0]` 得 `[1,3,cos(2)]`；方向 `[0,1]` 得 `[1,2,0]`。把两次结果作为列拼接即完整 `(3,2)` Jacobian。

## 对应的 Autograd 源码

| File / symbol | 谁调用 | 它调用谁 | 输入 -> 输出 | AD 角色 |
| --- | --- | --- | --- | --- |
| `core.py :: make_jvp`（114 行） | public wrapper, `deriv`, tests | `JVPNode.new_root`, `trace` | fun,x -> `jvp(g)` | tangent trace builder |
| `core.py :: JVPNode`（126 行） | primitive wrapper | `primitive_jvps[fun]` | parent tangents/operation -> output tangent `g` | forward local propagation |
| `core.py :: defjvp`（156 行） | rule modules/users | `translate_jvp`, `defjvp_argnums` | primitive + rules -> registry | 注册 JVP |
| `numpy_jvps.py` | import side effect | `defjvp`, `def_linear` | NumPy primitive -> rule | array forward rules |
| `numpy_jvps.py :: broadcast`（292 行） | shape-changing JVP rules | expand/repeat | tangent,target -> output shape | tangent broadcasting |

## 调用时序

```text
jvp = make_jvp(fun,x)
jvp(input_tangent)
  -> start_node=JVPNode.new_root(input_tangent)
  -> trace(start_node,fun,x)
  -> each primitive builds JVPNode
  -> JVPNode reads parent.g and computes self.g
  -> return end_value,end_node.g
```

## 源码 walkthrough

### make_jvp 的 trace 位于方向查询内部

[REAL SOURCE]  
File: [`autograd/core.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)  
Symbol: [`make_jvp`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py#L114-L123)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
def make_jvp(fun, x):
    def jvp(g):
        start_node = JVPNode.new_root(g)
        end_value, end_node = trace(start_node, fun, x)
        if end_node is None:
            return end_value, vspace(end_value).zeros()
        else:
            return end_value, end_node.g

    return jvp
```

外层收到 `fun,x` 后返回 closure；内层收到输入 tangent g 时，才建立 root 并执行 trace。对本文 `x=[2,3]`，第一次 g=[1,0]，第二次 g=[0,1]。`end_value` 两次相同，但 end node 的 g 不同。返回语句直接读取 tangent，没有 `backward_pass`，因为每个局部 JVP 已在 forward 中执行完毕。

`end_node=None` 表示当前输入方向所属 trace 没有连接到输出，返回输出空间的零。它和 reverse 独立输出分支的区别是返回空间：JVP 的结果在输出空间，VJP 的结果在输入空间。

### JVPNode 创建时就执行局部链式法则

[REAL SOURCE]  
File: [`autograd/core.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)  
Symbol: [`JVPNode`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py#L126-L139)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
class JVPNode(Node):
    __slots__ = ["g"]

    def __init__(self, value, fun, args, kwargs, parent_argnums, parents):
        parent_gs = [parent.g for parent in parents]
        try:
            jvpmaker = primitive_jvps[fun]
        except KeyError:
            name = getattr(fun, "__name__", fun)
            raise NotImplementedError(f"JVP of {name} wrt argnums {parent_argnums} not defined")
        self.g = jvpmaker(parent_argnums, parent_gs, value, args, kwargs)

    def initialize_root(self, g):
        self.g = g
```

与 VJPNode 相同，构造器由 primitive wrapper 调用，此时 primal answer 已知。不同的是，每个 parent 的 tangent 也已知，所以 `parent_gs` 可以立刻读取。`jvpmaker` 从独立的 `primitive_jvps` registry 中取规则，结合原参数和 parent tangents 计算 output tangent，存为 `self.g`。下一次 primitive 会读取这个 g。

`parents` 只是构造参数，没有被赋给 `self.parents`。JVPNode 的 slot 只有 g，不能沿它重新做 reverse graph walk。它也没有 `vjp` closure，未来不需要再等从 loss 传来的 cotangent。primal 仍在 Box._value，tangent 在 JVPNode.g；两种数值不是混为一个字段。

对乘法 z=x*y，若 parent tangents 为 gx,gy，这一刻就计算 `gz=y*gx+x*gy`。reverse 的同一个 operation 则要等 g_z 到达后才分别计算 `(y*g_z,x*g_z)`。前者把多个输入方向贡献合为一个输出方向，后者从一个输出权重产生多个输入贡献。

### defjvp：规则直接接收 tangent

[REAL SOURCE]  
File: [`autograd/core.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)  
Symbol: [`defjvp`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py#L156-L163)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
def defjvp(fun, *jvpfuns, **kwargs):
    argnums = kwargs.get("argnums", count())
    jvps_dict = {argnum: translate_jvp(jvpfun, fun, argnum) for argnum, jvpfun in zip(argnums, jvpfuns)}

    def jvp_argnums(argnums, gs, ans, args, kwargs):
        return sum_outgrads(jvps_dict[argnum](g, ans, *args, **kwargs) for argnum, g in zip(argnums, gs))

    defjvp_argnums(fun, jvp_argnums)
```

模块导入时，`jvpfuns` 被按参数位置整理进 `jvps_dict`，内层 `jvp_argnums` 登记到 registry。forward 节点创建时，`argnums` 是本次 boxed positions，`gs` 是这些 positions 的 parent tangents，`ans,args` 是 primal state。每个规则直接收到 `(g,ans,*args)` 并返回 contribution；`sum_outgrads` 把它们合为一个 output tangent。

这里同样有注册时创建的 closure，但它不是“forward 捕获 ans，再等 backward g”的 staged VJP。JVPNode 调用 registry maker 时，g 和 ans 已同时存在，结果就是数值 tangent。

[REAL SOURCE]  
File: [`autograd/numpy/numpy_jvps.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_jvps.py)  
Symbol: [`defjvp(anp.sin, ...)`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_jvps.py#L122-L122)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
defjvp(anp.sin, lambda g, ans, x: g * anp.cos(x))
```

对 x0=2，方向1带来的 g=1，规则立即产生 cos(2)；方向2对 x0 的 g=0，规则产生0。它与 sin VJP 的局部公式相同，是标量一元函数的特殊情形；传播方向、g 的来源和执行时机仍然不同。

### def_linear 为什么能处理 multiply

[REAL SOURCE]  
File: [`autograd/core.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)  
Symbol: [`def_linear`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py#L177-L179)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
def def_linear(fun):
    """Flags that a function is linear wrt all args"""
    defjvp_argnum(fun, lambda argnum, g, ans, args, kwargs: fun(*subval(args, argnum, g), **kwargs))
```

这里给 registry 准备一个按参数位置使用的规则：固定其他原参数，只把当前位置替换为 tangent g，然后重新调用 fun。对 multiply，位置0给 `multiply(gx,y)`，位置1给 `multiply(x,gy)`。它们相加才是 `y*gx+x*gy`，不是 `multiply(gx,gy)`。

[REAL SOURCE]  
File: [`autograd/core.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)  
Symbol: [`defjvp_argnum`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py#L149-L153)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
def defjvp_argnum(fun, jvpmaker):
    def jvp_argnums(argnums, gs, ans, args, kwargs):
        return sum_outgrads(jvpmaker(argnum, g, ans, args, kwargs) for argnum, g in zip(argnums, gs))

    defjvp_argnums(fun, jvp_argnums)
```

这个 helper 把刚才按一个参数计算的 `jvpmaker` 适配为所有活跃参数的贡献和。进入运行时内层时，`zip(argnums,gs)` 一一配对输入位置和 tangent；返回值直接交给 JVPNode.g。虽然 helper 名叫 `sum_outgrads`，它在这里相加的是 forward tangent contributions，不代表悄悄运行了 reverse mode。

[REAL SOURCE]  
File: [`autograd/numpy/numpy_jvps.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_jvps.py)  
Symbol: [`def_linear(anp.multiply) registration`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_jvps.py#L37-L38)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
# ----- Binary ufuncs (linear) -----
def_linear(anp.multiply)
```

这段模块级登记让 multiply 的 JVP 使用上面的 helper。`def_linear` 的原文 docstring 要结合实现理解为对各参数分别线性；二元乘法是双线性，不是对 `(x,y)` 联合线性。把 sin 也这样登记会得到 sin(g)，与正确的 g*cos(x) 不同。

### STATE SNAPSHOT：两个 basis 方向如何穿过同一表达式

以下表格聚焦数学中间量；实际 NumPy trace 还包括数组索引与组装节点。索引从输入 root 的向量 tangent 中取分量，输出组装把三个 tangent 合回数组，数学数值如下。

| 运行量 | primal value | 方向 e0=[1,0] 的 node.g | 方向 e1=[0,1] 的 node.g |
| --- | --- | --- | --- |
| 输入 root | Box._value=[2,3] | [1,0] | [0,1] |
| x0 | 2 | 1 | 0 |
| x1 | 3 | 0 | 1 |
| x0+x1 | 5 | 1+0=1 | 0+1=1 |
| x0*x1 | 6 | 3*1+2*0=3 | 3*0+2*1=2 |
| sin(x0) | 0.9092974268 | cos(2) | 0 |
| 组装输出 | [5,6,0.9092974268] | [1,3,cos(2)] | [1,2,0] |

两列分别来自两次完整 trace。第一列的节点不保存下一列需要的完整线性映射，因此第二次换方向必须重算。最后 `stack(columns,axis=1)` 给 shape=(3,2) 的 Jacobian：每次查询回答一列，而不是一行。

```text
user jvp(direction)
  -> JVPNode.new_root(direction)
  -> trace -> Box(value=x,node=root)
  -> primitive computes primal answer
  -> JVPNode reads parent.g -> local JVPs -> sum -> self.g NOW
  -> Box(value=answer,node=new_node) -> next primitive
  -> end_value,end_node.g -> user

reverse comparison:
forward node creation -> save parents + local vjp
later output seed    -> backward traversal -> call local vjp(g) THEN
```

所以 forward tangent 是“现在就算”，reverse cotangent 是“以后再算”。两者通过 Box/node_constructor 共用 tracing 边界，内存中的节点职责却不同。

## 实验验证

[完整实验：forward_mode.py](../../../assets/autograd/experiments/forward_mode.py)。运行环境、资源目录及路径配置见[系列总览](00-overview.md#experiments)。下方命令以解压后的资源目录为工作目录。

[EXPERIMENT]  
File: [`experiments/forward_mode.py`](../../../assets/autograd/experiments/forward_mode.py)  
Purpose: 重复给同一 make_jvp closure 不同输入 basis，并把结果列组装为 Jacobian。

```python
    columns = []
    for direction in basis:
        value, tangent = jvp(direction)
        columns.append(tangent)
        print(f"direction={direction} -> tangent={tangent}")

    from_jvps = np.stack(columns, axis=1)
    explicit = jacobian(f)(x)
```

进入时 basis=np.eye(2)，jvp 已由 public API 创建。循环内每次调用实际重 trace，得到输出值和 tangent；循环后将两列与 reverse-based `jacobian(f)(x)` 比较。两套组装方向不同的算法最后应得到同一矩阵。

运行 `python -B experiments/forward_mode.py`，结果：

```text
[[1, 1],
 [3, 2],
 [cos(2), 0]]
```

与 `jacobian(f)(x)` 完全一致。

## 理论与源码的对应关系

| 比较项 | Forward mode | Reverse mode |
| --- | --- | --- |
| direction | input -> output | output -> input |
| carried value | tangent `Jv` 部分结果 | cotangent `w^T J` 部分结果 |
| graph traversal | 与 primal 同时 forward | forward 记录后 reverse traverse |
| ideal dimensions | inputs 少 / 需要少数 input directions | outputs 少 / scalar loss |
| class | `JVPNode` | `VJPNode` |
| function | `make_jvp` | `make_vjp` |
| retained state | `g` | `parents`, `vjp` |

## 几个自测问题

1. 为什么一个 `JVPNode` 不需要保存 parents 用于未来 reverse walk？
2. 两次 basis JVP 如何对应一个 `(3,2)` Jacobian 的两列？
3. `make_jvp` closure 为什么每传一个新 tangent 都重新 trace？

## 小结

JVPNode 读取 parent.g 后立即计算 self.g，因此无需保存未来 reverse walk 的父链。defjvp 汇总各参数方向贡献，def_linear 按单个参数替换 tangent；每个新方向仍需一次新的 trace。

## 下一篇

接下来读[第九篇：为什么机器学习偏爱 Reverse Mode](09-why-reverse-mode.md)。

## 参考资料

- [autograd/core.py](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)，固定 commit 原文件。
- [autograd/numpy/numpy_jvps.py](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_jvps.py)，固定 commit 原文件。
- [Automatic Differentiation lecture](https://mlsyscourse.org/slides/04-automatic-differentiation.pdf)。

