---
title: Autograd 源码学习（十一）：Jacobian、Hessian 与算子组合
description: "Autograd 源码学习（十一）：jacobian、hessian、make_hvp、elementwise_grad 与 value_and_grad 的算子组合。"
date: 2026-09-05
hide:
  - navigation
categories:
  - 应用数学
  - Autograd 源码学习
tags:
  - python
---

# Autograd 源码学习（十一）：Jacobian、Hessian 与算子组合

有了 JVP、VJP 和 nested tracing，再看 jacobian、hessian、make_hvp，就不需要假设它们各自隐藏着一套求导引擎。它们主要改变查询方向、组织结果，或对导数程序再次求导。

这一篇按“需要完整矩阵还是只需要矩阵的作用”读源码，同时区分 loss、gradient 和 HVP closure 的返回值。

[:octicons-arrow-left-24: 上一篇](10-higher-order-ad.md) | [系列总览](00-overview.md) | [下一篇 :octicons-arrow-right-24:](12-numerical-gradient-checking.md)

源码基线：HIPS/autograd 1.9.1，commit `f53a21734fdfae636f448744d9097d8d35a643a0`。

## 本文目标

1. 高级 API 如何复用少数底层 VJP/JVP primitives？
2. `hessian` 为什么是 `jacobian(jacobian(fun))`？
3. `make_hvp` 与显式 Hessian 的取舍是什么？

## Mental Model

这些 API 不是多套互不相干的求导引擎。它们主要组合 `make_vjp`、basis vectors、reshape/stack 和再次求导。理解底层 product 后，高级 operator 是查询策略。

## 必要的数学

```text
gradient: scalar f 的一阶 Jacobian
Jacobian: 对 output basis cotangents 逐行查询 VJP
Hessian: gradient 的 Jacobian
HVP: H v，不必保存完整 H
```

`elementwise_grad` 实际返回 Jacobian 每列之和；只有 Jacobian 为 diagonal 等适用情形时，它等于逐元素导数。

## 一个最小例子

`loss(x)=sum(x^3)`, `x=[1,2]`：

```text
grad=[3,12]
H=[[6,0],[0,12]]
H@[2,-1]=[12,-12]
```

另用 `vector_function=[x0*x1,sin(x0)]` 验证 `(2,2)` Jacobian。

## 对应的 Autograd 源码

| File / symbol | 谁调用 | 它调用谁 | 输入 -> 输出 | AD 角色 |
| --- | --- | --- | --- | --- |
| `differential_operators.py :: jacobian`（58 行） | user/hessian | `_make_vjp`, output `standard_basis`, stack/reshape | fun,x -> full Jacobian | 多次 basis VJP |
| `hessian`（89 行） | user | `jacobian(jacobian(fun))` | scalar fun,x -> Hessian | operator composition |
| `elementwise_grad`（40 行） | user | `_make_vjp`, output ones | fun,x -> column-sum vector | one VJP query |
| `value_and_grad`（164 行） | optimizers/user | one `_make_vjp` | fun,x -> `(value,gradient)` | 复用 forward answer |
| `make_hvp`（95 行） | user | `_make_vjp(grad(fun),x)` | fun,x -> `(hvp,gradient)` | gradient pullback |
| `tensor_jacobian_product` | user | `jacobian` of vector-dot-fun | fun,args,tensor -> product | composition helper |

## 调用时序

```text
hessian(fun)
  -> jacobian(jacobian(fun))
  -> inner jacobian builds first derivative values
  -> outer jacobian differentiates that program

make_hvp(fun)(x)
  -> _make_vjp(grad(fun),x)
  -> returned closure maps v to H^T v (=Hv for smooth scalar Hessian)
```

## 源码 walkthrough

### jacobian：一次 forward，按输出基向量取行

[REAL SOURCE]  
File: [`autograd/differential_operators.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/differential_operators.py)  
Symbol: [`jacobian`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/differential_operators.py#L57-L71)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
@unary_to_nary
def jacobian(fun, x):
    """
    Returns a function which computes the Jacobian of `fun` with respect to
    positional argument number `argnum`, which must be a scalar or array. Unlike
    `grad` it is not restricted to scalar-output functions, but also it cannot
    take derivatives with respect to some argument types (like lists or dicts).
    If the input to `fun` has shape (in1, in2, ...) and the output has shape
    (out1, out2, ...) then the Jacobian has shape (out1, out2, ..., in1, in2, ...).
    """
    vjp, ans = _make_vjp(fun, x)
    ans_vspace = vspace(ans)
    jacobian_shape = ans_vspace.shape + vspace(x).shape
    grads = map(vjp, ans_vspace.standard_basis())
    return np.reshape(np.stack(grads), jacobian_shape)
```

进入时只有 fun 与 x。`_make_vjp` 先固定本次 forward 图；`ans_vspace` 描述输出空间，`standard_basis()` 给出每个输出坐标方向。`grads` 是延迟迭代的 map 对象，stack 消费它时，对同一个 VJP closure 反复传不同 seed，得到 Jacobian 的行，再 reshape 为 output shape + input shape。此处才显式创建完整 Jacobian，局部 primitives 从未被要求保存它。

在已有实验 `vector_function([1,2])=[2,sin(1)]` 上：

| 对象 / 查询 | 值或 shape | 含义 |
| --- | --- | --- |
| x | [1,2]，shape=(2,) | 输入空间 |
| ans | [2,0.8414709848]，shape=(2,) | 输出空间 |
| vjp([1,0]) | [2,1] | 第一个输出对两个输入的导数 |
| vjp([0,1]) | [cos(1),0] | 第二个输出对两个输入的导数 |
| stack 后 | [[2,1],[cos(1),0]] | 两行完整 Jacobian |
| jacobian_shape | (2,)+(2,)=(2,2) | 输出轴在前，输入轴在后 |

### hessian：对得到 Jacobian 的程序再求导

[REAL SOURCE]  
File: [`autograd/differential_operators.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/differential_operators.py)  
Symbol: [`hessian`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/differential_operators.py#L88-L91)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
@unary_to_nary
def hessian(fun, x):
    "Returns a function that computes the exact Hessian."
    return jacobian(jacobian(fun))(x)
```

外层获得的是一个“计算内层 Jacobian”的普通 Python callable。对 scalar `loss=sum(x^3)`，内层输出是 `[3*x0^2,3*x1^2]`；外层再对这个向量程序求 Jacobian，给出 `diag(6*x0,6*x1)`。下一步仍是上面同一个 jacobian 实现，区别是它观察的函数包含另一次 AD。第十篇 的 lower-trace Box 保留机制让这次组合可行。

### make_hvp：只查询 Hessian 的作用

[REAL SOURCE]  
File: [`autograd/differential_operators.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/differential_operators.py)  
Symbol: [`make_hvp`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/differential_operators.py#L94-L99)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
@unary_to_nary
def make_hvp(fun, x):
    """Builds a function for evaluating the Hessian-vector product at a point,
    which may be useful when evaluating many Hessian-vector products at the same
    point while caching the results of the forward pass."""
    return _make_vjp(grad(fun), x)
```

进入时 fun 是 scalar loss。`grad(fun)` 返回一阶梯度程序，`_make_vjp` 将这个程序在 x 处 trace，得到 `(hvp,gradient_at_x)`。这里第二项是 gradient，不是原 loss；closure 输入的 seed 与 gradient 同空间。它计算的是 gradient Jacobian 的 pullback `v^T H`，以一维数组表示时是 `H^T v`。对光滑实 scalar 函数的对称 Hessian，这等于常说的 Hv。

本实验 x=[1,2]，gradient=[3,12]；传入 direction=[2,-1] 后得到 `[12,-12]`。显式 H 为 diag(6,12)，可以单独用点积核对；make_hvp 的实现自身没有创建该矩阵。保留 closure 可以反复查询，但也会保留本次 gradient program 的图。

### elementwise_grad 的全 1 seed 究竟选了什么

[REAL SOURCE]  
File: [`autograd/differential_operators.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/differential_operators.py)  
Symbol: [`elementwise_grad, VJP query excerpt`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/differential_operators.py#L46-L49)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
    vjp, ans = _make_vjp(fun, x)
    if vspace(ans).iscomplex:
        raise TypeError("Elementwise_grad only applies to real-output functions.")
    return vjp(vspace(ans).ones())
```

这里进入 `_make_vjp` 后拿到的是向量输出的 pullback，仍只查询一次，但 seed 是输出全 1。数学结果为 `1^T J`，即每列之和。实验使用逐元素 sin，其 Jacobian 是 diagonal，因此列和刚好就是 `[cos(x0),cos(x1)]`；有跨元素依赖时不应将它误解释为只取对角线。下一步执行的还是通用 backward_pass。

### value_and_grad：复用同一次 trace 的 primal answer

[REAL SOURCE]  
File: [`autograd/differential_operators.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/differential_operators.py)  
Symbol: [`value_and_grad`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/differential_operators.py#L163-L174)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
@unary_to_nary
def value_and_grad(fun, x):
    """Returns a function that returns both value and gradient. Suitable for use
    in scipy.optimize"""
    vjp, ans = _make_vjp(fun, x)
    if not vspace(ans).size == 1:
        raise TypeError(
            "value_and_grad only applies to real scalar-output "
            "functions. Try jacobian, elementwise_grad or "
            "holomorphic_grad."
        )
    return ans, vjp(vspace(ans).ones())
```

函数体只调用一次 `_make_vjp`，已有 ans 直接作为 tuple 第一项返回，第二项由同一图的 pullback 算出。本实验得到 `(9,[3,12])`；原始 loss、gradient_at_x 与 HVP 的数值和对象类型由此可以分清。

```text
needed information         query strategy                    shared machinery
gradient                   output ones -------------------> make_vjp -> backward_pass
Jacobian                   output basis, stack rows ------> same VJP closure
Hessian                    jacobian(jacobian(fun)) --------> nested tracing
Hessian action             make_vjp(grad(fun),x) ----------> pullback of gradient program
value + gradient           keep ans + output ones --------> same forward trace
```

## 实验验证

[完整实验：operator_composition.py](../../../assets/autograd/experiments/operator_composition.py)。运行环境、资源目录及路径配置见[系列总览](00-overview.md#experiments)。下方命令以解压后的资源目录为工作目录。

[EXPERIMENT]  
File: [`experiments/operator_composition.py`](../../../assets/autograd/experiments/operator_composition.py)  
Purpose: 用既有向量函数和 scalar loss 交叉检查高级 operators 的组合结果。

```python
    jac = jacobian(vector_function)(x)
    gradient = grad(loss)(x)
    hess = hessian(loss)(x)
    value, combined_gradient = value_and_grad(loss)(x)
    diagonal = elementwise_grad(np.sin)(x)
    hvp, gradient_at_x = make_hvp(loss)(x)
    hessian_vector = hvp(direction)
```

进入时 x=[1,2]、direction=[2,-1]，每个变量保存上文解释的一种数学对象。随后实验把它们与手写 expected_jac、expected_gradient、expected_hessian 比较，并验证 HVP 与显式矩阵乘积一致。这是对不同查询策略的交叉验证，不只是打印 API 返回值。

运行 `python -B experiments/operator_composition.py`，结果摘要：

```text
gradient=[3,12]
hessian=[[6,0],[0,12]]
value_and_grad=(9,[3,12])
H@[2,-1]=[12,-12]
all checks passed
```

## 理论与源码的对应关系

| 数学 operator | 构造方式 |
| --- | --- |
| gradient | VJP with output ones |
| Jacobian | VJP over output standard basis |
| Hessian | Jacobian of Jacobian in current implementation |
| HVP closure | VJP of `grad(fun)` |
| value + gradient | single forward `ans` plus same trace pullback |

注意：数学上常说 Hessian 是 gradient 的 Jacobian；当前源码字面写的是 `jacobian(jacobian(fun))`。scalar-output 时内层 `jacobian(fun)` 就是 gradient-shaped 结果，因此两种表述相容。

## 几个自测问题

1. `jacobian` 为什么遍历 output basis 而不是 input basis？
2. `elementwise_grad` 在非 diagonal Jacobian 时返回什么？
3. HVP 相对完整 Hessian 节省的主要资源是什么？

## 小结

jacobian 复用 VJP 并按输出 basis 取行，hessian 再组合一次 jacobian，make_hvp 查询梯度程序的 pullback。value_and_grad 则保留同次 forward answer；选择 API 前应先确定需要的数学对象。

## 下一篇

接下来读[第十二篇：Numerical Gradient Checking](12-numerical-gradient-checking.md)。

## 参考资料

- [autograd/differential_operators.py](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/differential_operators.py)，固定 commit 原文件。
- [Automatic Differentiation lecture](https://mlsyscourse.org/slides/04-automatic-differentiation.pdf)。

---

[:octicons-arrow-left-24: 上一篇](10-higher-order-ad.md) | [系列总览](00-overview.md) | [下一篇 :octicons-arrow-right-24:](12-numerical-gradient-checking.md)
