---
title: Autograd 源码学习（十二）：Numerical Gradient Checking
description: "Autograd 源码学习（十二）：make_numerical_jvp、check_jvp 与 check_vjp，用有限差分独立验证梯度。"
date: 2026-09-05
hide:
  - navigation
categories:
  - 应用数学
  - Autograd 源码学习
tags:
  - python
---

# Autograd 源码学习（十二）：Numerical Gradient Checking

源码中的局部规则写得简洁，并不能替代独立验证。有限差分只使用函数值，为 AD 的方向、符号和 shape 提供了另一条检查路线。

我们先看已有实验中的步长误差，再读仓库自己的 JVP、VJP 和二阶 checker。这里尤其要分清单侧步长 eps 与源码两次采样总尺度 EPS。


源码基线：HIPS/autograd 1.9.1，commit `f53a21734fdfae636f448744d9097d8d35a643a0`。

## 本文目标

1. finite difference 为什么适合验证、不适合日常训练？
2. `eps` 太大或太小分别发生什么？
3. Autograd 自己如何检查 JVP/VJP 与高阶规则？

## Mental Model

数值微分是与 AD 实现独立的近似 oracle：它只调用 `f`，不相信 VJP/JVP registry。小规模单元测试可用它发现局部规则错误；大规模训练若对每个参数扰动，会重复执行大量 forward 且受数值误差影响。

## 必要的数学

下面的公式概括本篇使用的数学关系，具体数值与传播步骤接着展开。

$$
f'(x)\approx\frac{f(x+\varepsilon)-f(x-\varepsilon)}{2\varepsilon}.
$$

对于向量函数，VJP 检查借助伴随恒等式：

$$
\langle v,J^T w\rangle=\langle w,Jv\rangle.
$$

central difference：

```text
f'(x) ≈ [f(x+eps)-f(x-eps)]/(2eps), truncation O(eps^2)
```

大 `eps`：局部线性近似不够；极小 `eps`：两个接近浮点数相减造成 cancellation/roundoff。误差通常先下降再上升。

## 一个最小例子

```text
f(x)=sin(x)*x^2
f'(x)=cos(x)*x^2+2x*sin(x)
x=1.7 -> 2.9992997670243273
```

## 对应的 Autograd 源码

| File / symbol | 谁调用 | 它调用谁 | 输入 -> 输出 | AD 角色 |
| --- | --- | --- | --- | --- |
| `test_util.py :: make_numerical_jvp`（17 行） | `check_vjp`, `check_jvp` | two `f` evaluations, VSpace ops | f,x -> numerical directional function | 独立 finite difference oracle |
| `check_vjp`（31 行） | `check_grads` | make_vjp/numerical JVP/inner products | f,x -> assertion | transpose identity check |
| `check_jvp`（46 行） | `check_grads` | make_jvp/numerical JVP | f,x -> assertion | forward rule check |
| `check_grads`（61 行） | tests/users | check_jvp/check_vjp recursively | f,args,modes,order -> wrapped checker | 多模式高阶检查 |
| `core.py :: VSpace` | test helpers | add/scalar_mul/inner_prod/randn | typed values -> vector operations | 支持 arrays/containers |

## 调用时序

```text
check_grads(f,modes=['fwd','rev'],order=2)(x)
  -> check_jvp: AD JVP vs numerical JVP
  -> check_vjp: <x_v, VJP(y_v)> vs <y_v, numerical_JVP(x_v)>
  -> construct derivative function
  -> recursively check order 1
```

## 源码 walkthrough

当前 `make_numerical_jvp` 使用等价写法：

```text
[f(x+v*EPS/2)-f(x-v*EPS/2)] / EPS
```

固定 `EPS=1e-6`。`check_vjp` 不要求显式 Jacobian，而验证伴随恒等式：

```text
<x_v, J^T y_v> = <y_v, J x_v>
```

右侧的 `Jx_v` 来自 numerical JVP，这让 VJP 可在任意输入/输出结构的 VSpace 上被抽查。

### make_numerical_jvp 的两次扰动在哪里

[REAL SOURCE]  
File: [`autograd/test_util.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/test_util.py)  
Symbol: [`make_numerical_jvp`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/test_util.py#L17-L28)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
def make_numerical_jvp(f, x):
    y = f(x)
    x_vs, y_vs = vspace(x), vspace(y)

    def jvp(v):
        # (f(x + v*eps/2) - f(x - v*eps/2)) / eps
        f_x_plus = f(x_vs.add(x, x_vs.scalar_mul(v, EPS / 2)))
        f_x_minus = f(x_vs.add(x, x_vs.scalar_mul(v, -EPS / 2)))
        neg_f_x_minus = y_vs.scalar_mul(f_x_minus, -1.0)
        return y_vs.scalar_mul(y_vs.add(f_x_plus, neg_f_x_minus), 1.0 / EPS)

    return jvp
```

进入外层时只有 f,x，它先计算 y 来获得输出空间，并捕获 `x_vs,y_vs`。随后 inner `jvp(v)` 用输入空间的加法/数乘形成两个扰动参数，再用输出空间操作形成差分。返回的是对方向 v 的数值近似，不是 AD node，也没有查询 primitive_vjps。

注意总的函数调用数：构造 closure 时已经调用一次 f(x)，每个方向查询再调用两次 f。源码里的 EPS 是两次采样之间的总尺度，采样点在 `x +/- v*EPS/2`；本实验 helper 的 eps 是单侧步长，采样点在 `x +/- eps`，分母为 `2*eps`。两种写法等价，但不能拿相同数字名字断言它们选了相同采样点。

### check_jvp：从输入方向直接比较输出方向

[REAL SOURCE]  
File: [`autograd/test_util.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/test_util.py)  
Symbol: [`check_jvp`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/test_util.py#L46-L50)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
def check_jvp(f, x):
    jvp = make_jvp(f, x)
    jvp_numeric = make_numerical_jvp(f, x)
    x_v = vspace(x).randn()
    check_equivalent(jvp(x_v)[1], jvp_numeric(x_v))
```

输入是待检查函数与点 x。`x_v` 是输入空间随机方向；AD JVP 返回 `(value,tangent)`，因此取 `[1]`，数值 closure 则直接返回 tangent。两者交给 `check_equivalent`，该 helper 先检查 VSpace 相同，再用随机投影与 scalar_close 比较。它不是枚举全 Jacobian 的每个元素，所以通过表示本次方向/容差检查通过。

### check_vjp：让 reverse 结果与数值 JVP 相遇

[REAL SOURCE]  
File: [`autograd/test_util.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/test_util.py)  
Symbol: [`check_vjp`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/test_util.py#L31-L43)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
def check_vjp(f, x):
    vjp, y = make_vjp(f, x)
    jvp = make_numerical_jvp(f, x)
    x_vs, y_vs = vspace(x), vspace(y)
    x_v, y_v = x_vs.randn(), y_vs.randn()

    vjp_y = x_vs.covector(vjp(y_vs.covector(y_v)))
    assert vspace(vjp_y) == x_vs
    vjv_exact = x_vs.inner_prod(x_v, vjp_y)
    vjv_numeric = y_vs.inner_prod(y_v, jvp(x_v))
    assert scalar_close(vjv_numeric, vjv_exact), (
        f"Derivative (VJP) check of {get_name(f)} failed with arg {x}:\nanalytic: {vjv_exact}\nnumeric:  {vjv_numeric}"
    )
```

这里 `vjp` 来自真实 reverse trace，`jvp` 来自有限差分。`x_v` 和 `y_v` 分别在输入/输出空间抽样；实数 happy path 上 covector 转换是恒等作用，`vjp_y` 可理解为 `J^T*y_v`。`vjv_exact` 在输入空间做内积，`vjv_numeric` 在输出空间做内积，两者都是 scalar。

为什么要比较 scalar？VJP 结果属于输入空间，数值 JVP 结果属于输出空间，不能直接相减。伴随恒等式把两个不同空间的量转换成同一个数 `y_v^T*J*x_v`，同时覆盖 reverse rule 的方向和权重。代码还独立检查返回 VSpace，避免 shape 错误被某次数值投影掩盖。

| 运行时对象 | 所在空间 | 数学意义 |
| --- | --- | --- |
| x_v | 输入 | 随机 tangent v |
| y_v | 输出 | 随机输出方向，转换后作为 cotangent w |
| vjp_y | 输入 | J^T w（本文实数情形） |
| jvp(x_v) | 输出 | finite-difference 近似 Jv |
| vjv_exact | scalar | v 与 AD pullback 的内积 |
| vjv_numeric | scalar | w 与数值 pushforward 的内积 |

```text
                    AD reverse rule
output direction w ----------------------> J^T w -- dot input v --+
                                                                  +--> scalar_close
input direction v -- finite differences -> J v --- dot output w --+
                    only evaluates f
```

### 二阶检查检查的是哪一段程序

[REAL SOURCE]  
File: [`autograd/test_util.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/test_util.py)  
Symbol: [`check_grads, reverse recursive branch`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/test_util.py#L72-L78)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
    if "rev" in modes:
        check_vjp(f, x)
        if order > 1:
            grad_f = lambda x, v: make_vjp(f, x)[0](v)
            grad_f.__name__ = f"vjp_{get_name(f)}"
            v = vspace(f(x)).randn()
            check_grads(grad_f, (0, 1), modes, order=order - 1)(x, v)
```

进入该分支时 modes 包含 rev。先验证 f 的一阶 VJP，再把“构造 VJP 并应用 seed”的整个程序写成 `grad_f(x,v)`；递归检查参数 `(0,1)`，既对求导点 x，也对 seed v 的依赖检查。order 逐次减1，决定递归深度。forward 分支同理构造 JVP 程序，因此实验的双模式 order=2 检查不只是重复检查一次一阶结果。

这个 checker 是数值抽查，不是对所有输入/不可微点的证明。下一篇自定义 primitive 只注册 VJP，所以选择 modes=["rev"]；本文组合全部来自已有 JVP/VJP 的 NumPy primitives，可以检查两个模式。

## 实验验证

[完整实验：gradient_check.py](../../../assets/autograd/experiments/gradient_check.py)。运行环境、资源目录及路径配置见[系列总览](00-overview.md#experiments)。下方命令以解压后的资源目录为工作目录。

[EXPERIMENT]  
File: [`experiments/gradient_check.py`](../../../assets/autograd/experiments/gradient_check.py)  
Purpose: 用独立中心差分观察步长误差，并调用仓库自身的高阶 checker。

```python
def analytical_derivative(x):
    return np.cos(x) * x**2 + 2.0 * x * np.sin(x)


def central_difference(fun, x, eps):
    return (fun(x + eps) - fun(x - eps)) / (2.0 * eps)
```

解析函数来自手算乘积法则，差分函数只调用原 fun；二者都是既有实验原文。main 在 x=1.7 将它们与 grad(f) 对照，再扫描五个 eps，最后运行 check_grads。AD 没有读取这两个 helper 来生成导数。

运行 `python -B experiments/gradient_check.py`，原实验误差记录如下；末位浮点结果可能随数值库变化：

```text
eps=1e-1 -> 1.751e-2
eps=1e-3 -> 1.753e-6
eps=1e-5 -> 1.650e-10
eps=1e-7 -> 1.523e-9
eps=1e-9 -> 1.525e-7
```

Autograd 解析结果与手算结果误差为 0；`check_grads` 的 forward/reverse 二阶检查通过。

## 理论与源码的对应关系

| 理论 | 当前实现 |
| --- | --- |
| central directional difference | `make_numerical_jvp` |
| VJP correctness | adjoint inner-product identity in `check_vjp` |
| JVP correctness | direct comparison in `check_jvp` |
| high-order checking | recursive `check_grads(...,order-1)` |
| numerical error | `scalar_close` tolerance + finite EPS |

课程 PDF 第 5-6 页把 numerical differentiation 定位为有误差、低效但强大的 unit-test gradient checker；该定位与仓库 `test_util.py` 一致。

## 几个自测问题

1. 为什么 `eps=1e-9` 反而比 `1e-5` 更差？
2. `check_vjp` 为什么比较两个 inner products？
3. numerical gradient check 通过是否能证明所有输入上的实现都正确？

## 小结

有限差分的截断误差和舍入误差需要平衡。check_jvp 比较输出方向，check_vjp 借伴随恒等式比较 scalar inner products；高阶检查继续验证导数程序，但数值抽查通过不等于所有输入都得到证明。

## 下一篇

接下来读[第十三篇：自定义 Primitive](13-custom-primitive.md)。

## 参考资料

- [autograd/test_util.py](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/test_util.py)，固定 commit 原文件。
- [Automatic Differentiation lecture](https://mlsyscourse.org/slides/04-automatic-differentiation.pdf)。

