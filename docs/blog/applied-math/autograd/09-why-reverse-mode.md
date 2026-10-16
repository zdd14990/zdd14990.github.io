---
title: Autograd 源码学习（九）：为什么机器学习偏爱 Reverse Mode
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

# Autograd 源码学习（九）：为什么机器学习偏爱 Reverse Mode

两种模式都能正确使用链式法则，差别在一次查询能得到多少导数信息。机器学习常见的输入是大量参数，输出却只有一个 loss，这个维度关系决定了 reverse mode 的优势。

这里对同一函数数一数 forward 实际执行了几次，再回到 grad 的 scalar-output 检查。计数只回答查询策略的问题，图与 closure 的保存成本还需要单独考虑。

[:octicons-arrow-left-24: 上一篇](08-forward-mode.md) | [系列总览](00-overview.md) | [下一篇 :octicons-arrow-right-24:](10-higher-order-ad.md)

源码基线：HIPS/autograd 1.9.1，commit `f53a21734fdfae636f448744d9097d8d35a643a0`。

## 本文目标

1. `R^n -> R` 的完整 gradient 为什么适合 reverse mode？
2. “一次 reverse traversal”具体节省了什么？
3. `grad` 为什么拒绝非 scalar output？

## Mental Model

神经网络通常把大量参数压成一个 scalar loss。forward mode 一次回答“沿一个参数方向，loss 怎么变”；要拿全 gradient，需查询许多输入方向。reverse mode 从唯一 output direction `1` 出发，一次 pullback 同时触达所有参数。

## 必要的数学

下面的公式概括本篇使用的数学关系，具体数值与传播步骤接着展开。

$$
\begin{aligned}
f&:\mathbb{R}^n\to\mathbb{R},\\
J&\in\mathbb{R}^{1\times n},\\
1^T J&=\nabla f(x)^T.
\end{aligned}
$$

对 `f: R^n -> R`，Jacobian 就是一行 `(1,n)`：

```text
forward: J e1, J e2, ..., J en -> n directional queries
reverse: 1^T J -> 整行 gradient
```

这不是说 reverse mode 永远更快；如果输入维度很小而输出很大，forward mode 可能更合适。reverse 还要保留 forward graph/state。

## 一个最小例子

```text
loss(x)=x0*x1+x0^2+sin(x2), x=[1,2,0.5]
gradient=[x1+2*x0, x0, cos(x2)]
        =[4,1,0.87758256]
```

三次 basis JVP 给三个 scalar component；一次 VJP seed `1` 给整个三维 gradient。

| 查询 | seed 属于哪个空间 | 实际计算 | 结果 |
| --- | --- | --- | --- |
| JVP e0 | 输入 R3 | x1*1 + 2*x0*1 | 4 |
| JVP e1 | 输入 R3 | x0*1 | 1 |
| JVP e2 | 输入 R3 | cos(x2)*1 | 0.87758256 |
| VJP 1 | 输出 R | 同时拉回三个输入分量 | [4,1,0.87758256] |

一次输入方向 `[1,1,1]` 的 JVP 只给三个分量之和，不能从一个数恢复三个未知梯度分量；因此取完整 gradient 需要基向量查询。reverse 的单个 seed 已覆盖唯一输出方向，其返回值本来就在三维输入空间，所以一次 pullback 足够。

这并不意味着一个 array input 必须生成三个 root nodes。当前 core 把整个输入数组作为一个向量空间的值，用一个 root 的 cotangent 数组容纳三个分量。按元素索引的 primitives 再处理各分量依赖。

## 对应的 Autograd 源码

| File / symbol | 谁调用 | 它调用谁 | 输入 -> 输出 | AD 角色 |
| --- | --- | --- | --- | --- |
| `differential_operators.py :: grad` | 用户 | `_make_vjp`, `vspace(ans).ones()` | scalar-output fun -> gradient fun | scalar loss API |
| `core.py :: make_vjp` | grad | `trace`, `backward_pass` | fun,x -> reusable pullback/value | one forward graph |
| `core.py :: make_jvp` | user/deriv | `trace` per tangent | fun,x -> directional function | one input direction/query |
| `differential_operators.py :: jacobian` | vector-output users | VJP over output standard basis | fun,x -> full Jacobian | 通用替代 API |

## 调用时序

```text
full gradient by forward mode:
  for ei in input basis -> make_jvp trace -> scalar component

full gradient by reverse mode:
  make_vjp trace once -> vjp(1) -> all input components
```

## 源码 walkthrough

`grad` 当前明确检查：

[REAL SOURCE]  
File: [`autograd/differential_operators.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/differential_operators.py)  
Symbol: [`grad, scalar-output check and seed excerpt`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/differential_operators.py#L31-L36)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
    if not vspace(ans).size == 1:
        raise TypeError(
            "Grad only applies to real scalar-output functions. "
            "Try jacobian, elementwise_grad or holomorphic_grad."
        )
    return vjp(vspace(ans).ones())
```

进入这段时 forward 已执行，`ans` 和该次图的 `vjp` 都已存在。检查按 `vspace(ans).size` 判断独立实数分量数，而不是按 Python `type(ans) is float` 判断；对实数数组，size=1 的形状也能满足这个条件。本实验输出有三个元素时 size=3，会在注入 seed 之前失败。错误不是发生在 NumPy forward 计算，而是在 grad 选择求导语义的边界。

`grad` 的语义不是任意 Jacobian。对向量输出，可以明确查询 `make_vjp`/`make_jvp`，或用 `jacobian` 获取矩阵；`elementwise_grad` 是列和语义，不能当作所有情形下的 Jacobian 替代品。选择先明确需要哪一种数学对象，再决定 API。

### 执行次数与保存信息是两个代价

当前 `make_jvp` 把 trace 写在 `jvp(g)` 内，三次方向查询执行三次用户函数。当前 `make_vjp` 在构造时执行一次用户函数，之后每次 cotangent 查询执行 backward；并非 forward 一次后完全没有工作。

reverse 的保存成本来自 node parents 与 VJP closures 捕获的 forward state；图和捕获对象何时释放取决于引用生命周期，保留 VJP closure 以便重复查询就会继续保留图。forward 模式当前节点仅存 g，不为未来 reverse walk 保存父链。实际内存还受原程序数组、临时值及外层 trace 影响，不能只凭一个 slot 数量给出绝对性能结论。

```text
full gradient, forward:
e0 -> trace loss -> J e0=4
e1 -> trace loss -> J e1=1                  -> assemble [4,1,cos(0.5)]
e2 -> trace loss -> J e2=cos(0.5)

full gradient, reverse:
x -> trace loss -> saved nodes + loss value
1 -------------------------> backward ----> [4,1,cos(0.5)]
```

## 实验验证

[完整实验：reverse_mode_scaling.py](../../../assets/autograd/experiments/reverse_mode_scaling.py)。运行环境、资源目录及路径配置见[系列总览](00-overview.md#experiments)。下方命令以解压后的资源目录为工作目录。

[EXPERIMENT]  
File: [`experiments/reverse_mode_scaling.py`](../../../assets/autograd/experiments/reverse_mode_scaling.py)  
Purpose: 计数原函数 forward 执行次数，对照三次 basis JVP 与一次 VJP。

```python
    jvp = make_jvp(loss)(x)
    forward_components = []
    for basis_direction in np.eye(3):
        _, component = jvp(basis_direction)
        forward_components.append(component)
    forward_evaluations = calls["count"]

    calls["count"] = 0
    vjp, value = make_vjp(loss)(x)
    reverse_gradient = vjp(1.0)
    reverse_evaluations = calls["count"]
```

进入时 `loss` 在函数体内自增 counter，x=[1,2,0.5]。两种方法之间只清零 counter，没有替换 loss 的数学计算。随后实验既断言梯度一致，也断言次数为3和1；此外单独验证 grad 的 vector-output 异常。

运行 `python -B experiments/reverse_mode_scaling.py`，观察结果：

```text
forward-mode full gradient=[4,1,0.87758256]; f evaluations=3
reverse-mode full gradient=[4,1,0.87758256]; f evaluations=1
grad(vector output) -> TypeError with current scalar-output message
all checks passed
```

这里只计用户函数 forward executions，未把每个 primitive 的常数因子成本当作完全相同。

## 理论与源码的对应关系

| ML 情景 | Autograd |
| --- | --- |
| millions of parameters | array/container input vector spaces |
| one loss | `grad` 要求 `vspace(ans).size==1` |
| output seed 1 | `vspace(ans).ones()` |
| all parameter gradients | VJP closure 的返回值与 input 同结构 |
| reverse memory cost | `VJPNode.parents/vjp` 随图及 pullback 引用继续保留，释放由引用生命周期决定 |

## 几个自测问题

1. 为什么 `R^3 -> R` 的三个 basis JVP 不是“三种不同的导数算法”？
2. `R^2 -> R^100` 若只要一个给定 JVP，哪种 mode 更自然？
3. `grad` 的 scalar restriction 如何防止 API 语义含糊？

## 小结

对于完整的 scalar-loss gradient，一次 VJP seed=1 能同时返回所有输入分量。forward basis 查询通常随输入维度增加；reverse 的代价则包括保留图与 forward state，不能把更少的函数调用等同于任何情形都更快。

## 下一篇

接下来读[第十篇：高阶自动微分与 Nested Tracing](10-higher-order-ad.md)。

## 参考资料

- [autograd/differential_operators.py](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/differential_operators.py)，固定 commit 原文件。
- [Automatic Differentiation lecture](https://mlsyscourse.org/slides/04-automatic-differentiation.pdf)。

---

[:octicons-arrow-left-24: 上一篇](08-forward-mode.md) | [系列总览](00-overview.md) | [下一篇 :octicons-arrow-right-24:](10-higher-order-ad.md)
