---
title: Autograd 源码学习（二）：JVP、VJP 与两种自动微分模式
description: "Autograd 源码学习（二）：从 Jacobian 出发理解 JVP 与 VJP，以及前向与反向两种自动微分模式。"
date: 2026-09-05
hide:
  - navigation
categories:
  - 应用数学
  - Autograd 源码学习
tags:
  - python
---

# Autograd 源码学习（二）：JVP、VJP 与两种自动微分模式

上一篇把导数沿计算图传播的过程拆开了。面对向量输入和向量输出，接下来的问题是：我们究竟要得到整个 Jacobian，还是只需要知道它对某个方向的作用？

这里用一个二维输入、二维输出的例子显式算出 J，再分别计算 Jv 和 VJP。随后对照 `make_jvp` 与 `make_vjp`，看看“立刻执行”和“返回一个等待查询的函数”如何决定节点需要保存什么。

[:octicons-arrow-left-24: 上一篇](01-ad-and-computational-graph.md) | [系列总览](00-overview.md) | [下一篇 :octicons-arrow-right-24:](03-grad-call-chain.md)

源码基线：HIPS/autograd 1.9.1，commit `f53a21734fdfae636f448744d9097d8d35a643a0`。

## 本文目标

1. `Jv` 与 `w^T J` 分别表示什么？
2. 为什么 forward mode 自然产生 JVP，reverse mode 自然产生 VJP？
3. 为什么 Autograd 返回可调用 closure，而不是完整 Jacobian？

## Mental Model

把 Jacobian 看成一个线性映射，不必把矩阵写出来。forward mode 把一个输入方向 `v` 推到输出方向 `Jv`；reverse mode 把输出 cotangent `w` 拉回输入，得到 `w^T J`。两者都只查询 Jacobian 的作用，不要求显式构造它。

## 必要的数学

下面的公式概括本篇使用的数学关系，具体数值与传播步骤接着展开。

$$
\begin{aligned} f&:\mathbb{R}^2\to\mathbb{R}^2,\quad J=\begin{bmatrix}3&2\\\cos(2)&6\end{bmatrix}\\ J\begin{bmatrix}1\\-1\end{bmatrix}&=\begin{bmatrix}1\\\cos(2)-6\end{bmatrix}\\ \begin{bmatrix}2&-0.5\end{bmatrix}J&=\begin{bmatrix}6-0.5\cos(2)&1\end{bmatrix}.\end{aligned}
$$

对 $f: \mathbb{R}^n \to \mathbb{R}^m$，Jacobian $J$ 的 shape 是 `(m,n)`：

```text
JVP: Jv       v in R^n, result in R^m
VJP: w^T J    w in R^m, result in R^n
```

forward mode 沿计算方向传播 tangent；reverse mode 从输出沿相反方向传播 cotangent。若 `n` 很小，basis JVP 能高效产生列；若 `m` 很小，basis VJP 能高效产生行。

## 一个最小例子

```text
f(x0,x1) = [x0*x1, sin(x0)+x1^2]
x = [2,3]
J = [[3, 2], [cos(2), 6]]
```

取 `v=[1,-1]`：

```text
Jv = [1, cos(2)-6] = [1, -6.41614684]
```

取 `w=[2,-0.5]`：

```text
w^T J = [6-0.5*cos(2), 4-3] = [6.20807342, 1]
```

### 从偏导写出 J，而不是先接受答案

第一行对应输出 `f0=x0*x1`：保持 `x1` 不变，`df0/dx0=x1=3`；保持 `x0` 不变，`df0/dx1=x0=2`。第二行对应 `f1=sin(x0)+x1^2`，两个偏导分别为 `cos(2)` 和 `2*3=6`。

| Jacobian 项 | 局部计算 | 在 x=[2,3] 的值 |
| --- | --- | ---: |
| J[0,0] | x1 | 3 |
| J[0,1] | x0 | 2 |
| J[1,0] | cos(x0) | -0.4161468365 |
| J[1,1] | 2*x1 | 6 |

`Jv` 每一行与输入方向做内积：第一项 `3*1+2*(-1)=1`；第二项 `cos(2)*1+6*(-1)=-6.4161468365`。它描述 `f(x+t*v)` 在 `t=0` 的变化速度。方向是固定的 `[1,-1]`，所以结果不是完整 Jacobian。

`w^T J` 则把输出行按 `w` 加权：第一输入收到 `2*3+(-0.5)*cos(2)=6.2080734183`；第二输入收到 `2*2+(-0.5)*6=1`。固定 `w` 时，它等于 scalar 函数 `L(x)=2*f0(x)-0.5*f1(x)` 的梯度。数组里用一维向量存 cotangent，数学上的行/列约定由公式说明，并不要求 NumPy 创建 `(1,2)` 的行数组。

### 不构造 J，如何得到同样的结果

把本来就要执行的程序分成 `a=x0*x1`、`b=sin(x0)`、`c=x1^2`、`d=b+c`，输出 `[a,d]`。以下是数学数据流图，省略真实数组索引/组装 primitives；它不是声称运行图只有四个节点。

```text
forward primal/tangent:
x0=2, dot(x0)=1 -----+--> multiply --> a=6, dot(a)=1 ------> output[0]
x1=3, dot(x1)=-1 ----+
x0 --------------------> sin -------> b=sin(2), dot(b)=cos(2) --+
x1 --------------------> power -----> c=9, dot(c)=-6 ----------+--> d

reverse cotangent:
x0 <-- 3*2 -------- multiply <-- bar(a)=2 <---------------- output[0]
x1 <-- 2*2 --------/
x0 <-- cos(2)*(-0.5) -- sin <-- bar(b)=-0.5 --+
x1 <-- 6*(-0.5) ------ power <- bar(c)=-0.5 --+-- add <-- output[1]=-0.5
```

| 操作 | forward value | JVP：立刻传播输入 tangent | VJP：稍后传播输出 cotangent |
| --- | --- | --- | --- |
| a=x0*x1 | 6 | 3*1+2*(-1)=1 | 给 x0 的贡献 3*2=6；给 x1 的贡献 2*2=4 |
| b=sin(x0) | 0.9092974268 | cos(2)*1=-0.4161468365 | 给 x0 的贡献 cos(2)*(-0.5)=0.2080734183 |
| c=x1^2 | 9 | 6*(-1)=-6 | 给 x1 的贡献 6*(-0.5)=-3 |
| d=b+c | 9.9092974268 | dot(b)+dot(c)=-6.4161468365 | 将 bar(d)=-0.5 分别传给 b,c |
| 最终结果 | [6,9.9092974268] | [1,-6.4161468365] | [6+0.2080734183,4-3] |

forward 是在一个 operation 汇总来自输入边的 tangent；reverse 是在一个输入汇总来自多条下游边的 cotangent。都只调用局部乘积规则，不需要把四个偏导组织为全局矩阵。

## 对应的 Autograd 源码

| File / symbol | 谁调用 | 它调用谁 | 输入 -> 输出 | AD 角色 |
| --- | --- | --- | --- | --- |
| `differential_operators.py :: make_vjp`（19 行） | 用户 API | `unary_to_nary(_make_vjp)` | 多参数函数/argnum -> 构造器 | 参数适配 |
| `core.py :: make_vjp`（11 行） | `grad`, `jacobian` 等 | `VJPNode.new_root`, `trace`, `backward_pass` | unary `fun,x` -> `(vjp,end_value)` | reverse trace + pullback closure |
| `core.py :: VJPNode`（36 行） | primitive wrapper | `primitive_vjps[fun]` | operation 信息 -> node | 保存局部 pullback |
| `differential_operators.py :: make_jvp`（20 行） | 用户 API | `unary_to_nary(_make_jvp)` | 多参数函数/argnum -> 构造器 | 参数适配 |
| `core.py :: make_jvp`（114 行） | `deriv`、用户 | `JVPNode.new_root`, `trace` | unary `fun,x` -> `jvp` | forward tangent closure |
| `core.py :: JVPNode`（126 行） | primitive wrapper | `primitive_jvps[fun]` | parent tangents + operation -> tangent | 局部 tangent propagation |

## 调用时序

```text
make_jvp(f)(x) -> jvp(v) -> JVPNode root carries v -> trace -> end_node.g = Jv
make_vjp(f)(x) -> trace -> end_node -> vjp(w) -> backward_pass -> w^T J
```

## 源码 walkthrough

### 先读 forward closure 的完整实现

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

进入外层时只有 `fun` 和固定求导点 `x`，没有 tangent。外层产生 `jvp` 函数并捕获它们，尚未执行 `fun`。调用 `jvp(g)` 时 `g` 才是输入方向，本例 `[1,-1]`；root 的 `g` 保存该方向，`trace` 在原函数的每次 primitive 调用时生成新 tangent。返回的 `(end_value,end_node.g)` 是 `(f(x),Jg)`。独立输出分支使用输出空间的零，因为这里要返回输出方向。

下一次给同一个 closure 传不同 tangent，会再次进入 `JVPNode.new_root(g)` 和 `trace`。原因在于保存的 `end_node.g` 仅是某一个方向的乘积，不能从它反推出任意新方向的结果。当前实现选择重新执行原函数，而不是缓存整个线性化程序。

### 再读 reverse closure 的完整实现

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

进入时同样是 `fun,x`，但 `trace` 位于外层，因此立刻执行。`start_node` 是输入 root；`end_value` 是 `[6,9.9092974268]`；`end_node` 是这次执行得到的输出节点。外层产生 `(vjp,end_value)`，正常分支中的 closure 捕获 `end_node`，以后把输入的 `g` 当作输出 cotangent 交给 `backward_pass`。独立输出分支返回输入空间的零，因为这里的结果属于输入。

每次 `vjp(w)` 都从同一个 end node 开始，但 `backward_pass` 会新建本次查询的 `outgrads` 字典；节点保存的规则是函数，没有被第一次查询消费掉。因此固定本次 forward state，可以先传 `[1,0]` 取 J 的第一行，再传 `[0,1]` 取第二行。这个结论直接来自实现，第十一篇 的真实 `jacobian` 正是反复调用同一 VJP。closure 固定的是本次输入对应的图，不会因为外部重新赋值 `x` 就自动更新图；捕获的可变输入也不应在查询间被原地修改。

### Node 结构说明两种时间安排

[REAL SOURCE]  
File: [`autograd/core.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)  
Symbol: [`JVPNode.__slots__`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py#L126-L127)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
class JVPNode(Node):
    __slots__ = ["g"]
```

这段是类定义开头的连续原文。primitive 构造 `JVPNode` 时传入 parents，构造器读取 `parent.g` 并立刻算出 `self.g`；本节点长期保留的字段只有已算好的 tangent，下一次 primitive 读取它。它不保存未来反向遍历所需的父引用。

[REAL SOURCE]  
File: [`autograd/core.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)  
Symbol: [`VJPNode.__slots__`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py#L36-L37)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
class VJPNode(Node):
    __slots__ = ["parents", "vjp"]
```

reverse 节点进入构造阶段时还不知道来自最终输出的 `g`，所以保存 `parents` 与一个等待 `g` 的局部 `vjp`。等 `backward_pass` 来访，它才产出每个 parent 的 cotangent。两种节点都不是存放全局 J 的容器。完整构造器在 第五篇 和 第八篇 展开。

```text
user                         forward core               reverse core
make_jvp(f)(x) -------------> return closure
jvp(v1) -------------------> new root(v1) -> trace -> (value,Jv1)
jvp(v2) -------------------> new root(v2) -> trace -> (value,Jv2)

make_vjp(f)(x) -----------------------------------------> trace -> (closure,value)
vjp(w1) ------------------------------------------------> new outgrads -> w1^T J
vjp(w2) ------------------------------------------------> new outgrads -> w2^T J
                                                        same recorded nodes
```

注意上图使用 public API 的 `make_jvp(f)(x)`；上面原文来自 core，直接调用形式是 `make_jvp(fun,x)`。中间只差 `unary_to_nary` 参数适配，下一篇会把这一层也拆开。

## 实验验证

[完整实验：jvp_vjp.py](../../../assets/autograd/experiments/jvp_vjp.py)。运行环境、资源目录及路径配置见[系列总览](00-overview.md#experiments)。下方命令以解压后的资源目录为工作目录。

[EXPERIMENT]  
File: [`experiments/jvp_vjp.py`](../../../assets/autograd/experiments/jvp_vjp.py)  
Purpose: 对照手算 Jacobian，验证同一函数的 primal、JVP 和 VJP。

```python
    jvp = make_jvp(f)(x)
    jvp_value, actual_jvp = jvp(tangent)

    vjp, vjp_value = make_vjp(f)(x)
    actual_vjp = vjp(cotangent)

    expected_jvp = np.dot(explicit_jacobian, tangent)
    expected_vjp = np.dot(cotangent, explicit_jacobian)
    actual_jacobian = jacobian(f)(x)
```

进入这段时 `x=[2,3]`，两个 seed 正是前面手算的方向；`actual_*` 来自 AD，`expected_*` 来自显式矩阵乘法。随后实验用 `allclose` 同时检查函数值和三种导数结果。显式矩阵只用于独立核对，并没有传进 AD 引擎。

运行 `python -B experiments/jvp_vjp.py`。现有实验的观察结果：

```text
Jv=[1, -6.41614684]
w^T J=[6.20807342, 1]
make_jvp returned callable: True
make_vjp returned callable: True
all checks passed
```

## 理论与源码的对应关系

| 理论 | 当前源码 |
| --- | --- |
| 输入方向 `v` | `make_jvp` 返回函数接收的 `g` |
| `Jv` | `JVPNode.g` 在 forward trace 中逐步更新 |
| 输出 cotangent `w` | `make_vjp` 返回函数接收的 `g` |
| `w^T J` | `backward_pass(g,end_node)` 的结果 |
| Jacobian 的局部因子 | `primitive_jvps` / `primitive_vjps` registry 中的规则 |

| 比较项 | forward mode | reverse mode |
| --- | --- | --- |
| direction | 输入 -> 输出 | 输出 -> 输入 |
| seed | 输入 tangent v，shape=(n,) | 输出 cotangent w，shape=(m,) |
| node state | `JVPNode.g`，已经算出的局部 tangent | `VJPNode.parents` + 等待 g 的 `vjp` |
| traversal | 每次方向查询重新 trace，沿原计算方向传播 | 构造时 forward trace；每次查询沿反向拓扑顺序传播 |
| result | `(f(x),Jv)` | closure 查询得到 `w^T J`；f(x) 在构造时另行返回 |

## 几个自测问题

1. 对 `f: R^100 -> R^2`，取完整 Jacobian 时哪种 mode 通常需要更少次 basis pass？
2. `make_vjp` 为什么必须同时返回 `end_value`？
3. closure 捕获 `end_node` 带来什么复用能力和内存代价？

## 小结

JVP 从输入方向得到输出方向，VJP 从输出 cotangent 得到输入 cotangent。当前实现的 JVP closure 每换一个方向重新 trace；VJP closure 则复用固定 forward state，以新的 outgrads 完成每次查询。

## 下一篇

接下来读[第三篇：从 grad 开始追踪完整调用链](03-grad-call-chain.md)。

## 参考资料

- [autograd/core.py](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)，固定 commit 原文件。
- [Automatic Differentiation lecture](https://mlsyscourse.org/slides/04-automatic-differentiation.pdf)。

---

[:octicons-arrow-left-24: 上一篇](01-ad-and-computational-graph.md) | [系列总览](00-overview.md) | [下一篇 :octicons-arrow-right-24:](03-grad-call-chain.md)
