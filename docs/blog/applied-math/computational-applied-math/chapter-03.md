---
title: 第三章：线性微分方程的局部分析：常点与正则奇点
date: 2026-07-07
updated: 2026-10-15
description: 计算与应用数学笔记第三章：线性微分方程的近似解法。
hide:
  - navigation
categories:
  - 应用数学
tags:
  - ode
  - asymptotic-analysis
---

# 第三章：线性微分方程的局部分析：常点与正则奇点 { #top }

当精确解无法获得或过于复杂时，需采用近似方法。局部分析是基础步骤，旨在用初等函数在单点邻域内近似表示解。这些局部结果可通过全局分析拼接，形成解在整个区间上的均匀近似，为困难方程提供了实用且高效的初步处理工具。

## 1. 线性微分方程的近似解法 { #s1 }

### 1.1 齐次线性方程的奇点分类 { #s1-1 }

本章沿用第一章的齐次线性微分方程形式：

$$
y^{(n)}(x) + p_{n-1}(x)y^{(n-1)}(x) + \cdots + p_1(x)y'(x) + p_0(x)y(x) = 0, \tag{3.1.1}
$$

其中 $y^{(k)}(x) = d^k y/dx^k$。下述分类方案要求系数函数 $p_0, \cdots, p_{n-1}$ 在复平面上有定义。

!!! definition "定义"
    若系数函数 $p_0(x), \cdots, p_{n-1}(x)$ 均在复平面点 $x_0 \neq \infty$的邻域解析，则称 $x_0$ 为 (3.1.1) 的**常点(ordinary point)**。

Fuchs (1866) 证明了在常点邻域内(3.1.1) 的所有 $n$ 个线性无关解均解析。进一步，若在常点 $x_0$ 将解展为Taylor级数 $y(x) = \sum_{i=0}^{\infty} a_i (x - x_0)^i$，则收敛半径至少等于复平面上距最近系数函数奇点的距离。解的奇点位置必与某系数函数奇点重合。

!!! example "例"
    方程 $(x^2 + 1)y' + 2xy = 0$ 以 $0$ 为常点。解 $y = (x^2 + 1)^{-1}$ 的Taylor级数收敛半径为 $1$，恰为 (3.1.1) 形式下系数奇点 $x = \pm i$ 到常点的最小距离。

!!! definition "定义"
    若系数 $p_0(x), \cdots, p_{n-1}(x)$ 不全解析，但函数 $(x - x_0)^n p_0(x)$, $(x - x_0)^{n-1} p_1(x), \cdots$, $(x - x_0) p_{n-1}(x)$ 均在 $x_0\neq \infty$邻域解析，则称 $x_0$ 为 (3.1.1) 的**正则奇点(regular singular point)**。

(3.1.1) 的解在正则奇点可能解析；若非解析，其奇性必为极点、代数或对数支点。Fuchs 证明：至少存在一个形式如下的解：

$$
y = (x - x_0)^\alpha A(x), \tag{3.1.2}
$$

其中 $\alpha$ 为**指标指数(indicial exponent)**，$A(x)$ 在 $x_0$ 解析，且其Taylor级数收敛半径至少等于复平面上距最近系数奇点的距离。

!!! example "例"
    方程 $y' = y / \sinh x$ 在 $0$ 处有正则奇点。解 $y(x) = c \tanh (x/2)$在 $x=0$ 解析，但在 $x = \pm i\pi$ 有极点。故 $y(x)$ Taylor展开的收敛半径为 $\pi$，即系数函数 $1/\sinh x$ 奇点到常点的最小距离。

若 (3.1.1) 阶数 $n \geq 2$，则存在第二个线性无关解，形式为以下两种之一：

$$
y = (x - x_0)^\beta B(x) \tag{3.1.3}
$$

或

$$
y = (x - x_0)^\alpha A(x) \ln (x - x_0) + C(x)(x - x_0)^\gamma. \tag{3.1.4}
$$

(3.1.3) 和 (3.1.4) 是 Euler 方程解在指标指数无重根和有重根情形的推广。$A(x)$ 与 (3.1.2) 中函数相同，$B(x)$ 和 $C(x)$ 为新解析函数，收敛半径同样受限于最近系数奇点距离。

一般地，每个新线性无关解对应一个新解析函数，并伴有一个新指标指数或额外的 $\ln (x - x_0)$ 幂次。因此，第 $n$ 个解的最复杂形式为：

$$
y(x) = (x - x_0)^\delta \prod_{i=0}^{n-1} [\ln (x - x_0)]^i A_i(x), \tag{3.1.5}
$$

所有函数 $A_i(x)$ 均在 $x_0$ 解析。反之，Fuchs 证明，若所有 $n$ 个解均具有 (3.1.2) 至 (3.1.5) 的形式，则 $x_0$ 至多为方程的正则奇点。

!!! definition "定义"
    若点 $x_0 \neq \infty$既非常点也非正则奇点，则称为 (3.1.1) 的**非正则奇点(irregular singular point)**。

虽无完备理论，但可断言在非正则奇点处，至少存在一个解不满足(3.1.2) 至 (3.1.5) 的形式。

至此有限复平面内的点分类已完成，对于无穷远点 $x_0 = \infty$，通过反演变换

$$
x = \frac{1}{t}, \quad \frac{d}{dx} = -t^2 \frac{d}{dt}, \quad \frac{d^2}{dx^2} = t^4 \frac{d^2}{dt^2} + 2t^3 \frac{d}{dt},
\tag{3.1.6}
$$

将无穷远点解析映射至原点，再对 $t=0$ 分类。

!!! definition "定义"
    若 $t=0$ 分别为常点、正则奇点或非正则奇点，则对应称 $x_0 = \infty$ 为**常点**、**正则奇点**或**非正则奇点**。

以下示例展示解在常点、正则奇点及非正则奇点附近的行为。

!!! example "例（常点、正则奇点与非正则奇点对比）"
    考虑方程：

    $$
    \frac{dy}{dx} - \frac{1}{2}y = 0, \tag{3.1.7}
    $$

    $$
    \frac{dy}{dx} - \frac{1}{2x}y = 0, \tag{3.1.8}
    $$

    $$
    \frac{dy}{dx} - \frac{1}{2x^2}y = 0. \tag{3.1.9}
    $$

    变换 $x = 1/t$ 得新方程：$dy/dt + y/2t^2 = 0$, $dy/dt + y/2t = 0$, $dy/dt + y/2 = 0$。

    (3.1.7) 除 $\infty$（非正则奇点）外均为常点。解 $y(x) = e^{-x/2}$ 解析，但在 $x=\infty$ 有本性奇点。

    (3.1.8) 除 $0$ 和 $\infty$（正则奇点）外均为常点。解 $y(x) = x^{-1/2}$ 解析，但在 $x=0$ 和 $x=\infty$ 有支点。

    (3.1.9) 除 $0$（非正则奇点）外均为常点。解 $y(x) = e^{1/(2x)}$ 在扩充复平面解析，但在 $x=0$ 有本性奇点。

!!! example "例（常点处的Taylor级数）"
    方程 $y' + y/(x-1) = 0$ 在 $1$ 和 $\infty$ 有正则奇点。解 $y(x) = (x-1)^{-1}$ 在 $x=1$ 有极点，在 $\infty$ 解析。解在 $x=0$ 的Taylor级数 $y(x) = \sum_{k=0}^{\infty} x^k$ 收敛半径为 $1$（距正则奇点 $x=1$ 的距离）。

!!! example "例（收敛范围超越最近奇点的Taylor解）"
    方程 $(x-1)(2x-1)y'' + 2xy' - 2y = 0$ 在 $1/2, 1, \infty$ 有正则奇点。一解 $y(x) = 1/(x-1)$ 在常点 $x=0$ 的Taylor展开可超越最近奇点 $x=1/2$，但在 $|x|=1$ 处发散。线性无关解 $y(x) = x$ 在 $x=0$ 的Taylor级数对所有 $x$ 收敛。

!!! example "例（非正则奇点附近的本性奇性）"
    方程 $y' + 3y/2x + y/4x^3 = 0$ 在 $0$ 有非正则奇点，在 $\infty$ 有正则奇点。两线性无关解为 $y(x) = \sin x^{-1/2}$ 和 $y(x) = \cos x^{-1/2}$。前者在原点有本性奇点（含 $x=0$ 和 $x=\infty$ 的支点），后者无支割线且在 $x=\infty$ 解析。

!!! example "例（奇点附近的解析解）"
    在正则或非正则奇点处，一个甚至多个线性无关解可能解析。

    方程 $y'' + (1-x)y'/x - y/x^2 = 0$ 在 $0$ 有正则奇点，在 $\infty$ 有非正则奇点。解 $y(x) = (e^x-1-x)/x$ 在 $x=0$ 解析，但在 $\infty$ 有本性奇点；线性无关解 $y(x) = (1+x)/x$ 在 $x=0$ 有极点，在 $\infty$ 解析。1.3 节例 1.10 的方程

    $$
    y'' - \frac{1+x}{x}y' + \frac{1}{x}y = 0, \tag{3.1.10}
    $$

    在 $0$ 有正则奇点，在 $\infty$ 有非正则奇点。但两线性无关解

    $$
    y(x) = e^x, \quad y(x) = 1+x \tag{3.1.11}
    $$

    均在 $x=0$ 解析（前者在 $\infty$ 有本性奇点，后者在 $\infty$ 有极点）。一般地，所有线性无关解在正则奇点可能解析，但在非正则奇点至少有一解奇异。

!!! example "例（自变量变换消除奇点）"
    方程 $y' - 2x^{-1/2}y = 0$ 在 $0$ 的非正则奇点可通过新自变量 $t = x^{1/2}$ 消除。新方程 $dy/dt - y = 0$ 在 $t=0$ 为常点。

!!! example "例（因变量变换消除奇点）"
    方程

    $$
    y'' + \frac{2}{x}y' - y = 0 \tag{3.1.12}
    $$

    在 $0$ 有正则奇点，在 $\infty$ 有非正则奇点。变换 $y(x) = w(x)/x$ 可消除 $x=0$ 奇点，但新方程 $w'' - w = 0$ 仍在 $\infty$ 有非正则奇点。

!!! example "例（转换为线性系统消除奇点）"
    (3.1.12) 的奇点可消除，因两解在 $x=0$ 的奇性阶数相同：$y \sim c_1/x, \, y \sim c_2 e^x / x$。但对 (3.1.10)（解 $y = e^x$ 和 $y = 1+x$ 均在 $x=0$ 解析），难以直接消除其正则奇点。唯一方法是转换为线性系统：

    $$
    y'(x) = a(x)y(x) + b(x)z(x), \quad z'(x) = c(x)y(x) + d(x)z(x). \tag{3.1.13}
    $$

    若二阶微分方程通解在 $x=0$ 解析，则存在形如 (3.1.13) 的等价齐次线性系统，其系数在 $x=0$ 解析。(3.1.10) 的适当系统为 $y' = y + z, \, z' = 0$。**能否找到另一系数解析的等价系统？**

### 1.2 齐次线性方程常点附近的局部级数展开 { #s1-2 }

当精确显式解未知时，为获得常点处的级数解，我们将Taylor级数 $y(x) = \sum_{n=0}^{\infty} a_n (x - x_0)^n$ 代入微分方程，并通过递推关系确定系数 $a_n$.

!!! example "例（一阶微分方程的Taylor级数解）"
    考虑初值问题 $y' = 2xy$ [$y(0) = 1$]。因 $x=0$ 是常点，设解 $y(x) = \sum_{n=0}^{\infty} a_n x^n$，则：

    $$
    \sum_{n=0}^{\infty} n a_n x^{n-1} = 2x \sum_{n=0}^{\infty} a_n x^n= 2 \sum_{n=0}^{\infty} a_{n-2} x^{n-1}.
    $$

    由Taylor系数唯一性，得：

    $$
    n a_n = 0, \quad n=0,1;
    $$

    $$
    n a_n = 2a_{n-2}, \quad n=2,3,\cdots
    $$

    由 $n=0$ 知 $a_0$ 为任意常数；由 $n=1$ 知 $a_1=0$；解得 $a_{2n} = a_0 / n!$ ($n \geq 1$)，$a_{2n+1} = 0$ ($n \geq 1$)。故 $y'=2xy$ 的通解为：

    $$
    y(x) = a_0 \sum_{n=0}^{\infty} \frac{x^{2n}}{n!} = a_0 e^{x^2}.
    $$

    可代回方程验证。

!!! example "例（Airy 方程在 $x=0$ 的局部分析）"
    为求 Airy 方程 ([1.4.8](chapter-01.md))$y'' = xy$在 $x=0$ 附近的局部行为，代入级数 $y(x) = \sum_{n=0}^{\infty} a_n x^n$ 得：

    $$
    \sum_{n=0}^{\infty} a_n n(n-1) x^{n-2} = \sum_{n=0}^{\infty} a_n x^{n+1}.
    $$

    联立系数：

    $$
    a_n n(n-1) = 0, \quad n=0,1,2;
    $$

    $$
    a_n n(n-1) = a_{n-3}, \quad n=3,4,\cdots
    $$

    $n=0,1$ 时得 $a_0, a_1$ 任意，$a_2=0$，解得：

    $$
    \begin{aligned}
    a_{3n} &= \frac{a_0}{3^n n!  3^n (n - \frac{1}{3})(n - 1 - \frac{1}{3}) \cdots (\frac{2}{3})} = \frac{a_0 \Gamma(\frac{2}{3})}{9^n n!   \Gamma(n + \frac{2}{3})},\\
    a_{3n+1} &= \frac{a_0}{3^n n!  3^n (n - \frac{1}{3})(n - 1 + \frac{1}{3}) \cdots (\frac{4}{3})} = \frac{a_1 \Gamma(\frac{4}{3})}{9^n n!   \Gamma(n + \frac{4}{3})}.\\
    a_{3n+2}&=0
    \end{aligned}
    $$

    定义 $c_1 = a_0 \Gamma(\frac{2}{3})$, $c_2 = a_1 \Gamma(\frac{4}{3})$，则 Airy 方程通解为：

    $$
    y(x) = c_1 \sum_{n=0}^{\infty} \frac{x^{3n}}{9^n n!  \Gamma(n + \frac{2}{3})} + c_2 \sum_{n=0}^{\infty} \frac{x^{3n+1}}{9^n n!  \Gamma(n + \frac{4}{3})}.
    $$

    此通解可通过快速收敛的Taylor展开近似表示于所有有限 $x$。定义两个特解（Airy 函数）：

    $$
    \text{Ai}(x) \equiv 3^{-2/3} \sum_{n=0}^{\infty} \frac{x^{3n}}{9^n n!  \Gamma(n + \frac{2}{3})} - 3^{-4/3} \sum
    _{n=0}^{\infty} \frac{x^{3n+1}}{9^n n!  \Gamma(n + \frac{4}{3})}, \tag{3.2.1}
    $$

    $$
    \text{Bi}(x) \equiv 3^{-1/6} \sum_{n=0}^{\infty} \frac{x^{3n}}{9^n n!  \Gamma(n + \frac{2}{3})} + 3^{-5/6} \sum_{n=0}^{\infty} \frac{x^{3n+1}}{9^n n!  \Gamma(n + \frac{4}{3})}. \tag{3.2.2}
    $$

    当 $|x|$ 不大时，(3.2.1) 和 (3.2.2) 的Taylor级数仅需几项即可高精度逼近 Airy 函数（误差估计见问题 3.7）。

### 1.3 齐次线性方程正则奇点附近的局部级数展开 { #s1-3 }

若尝试用 Taylor 级数表示解在正则奇点附近的局部行为，会发生什么？

!!! example "例（正则奇点处Taylor级数表示的失效）"
    对方程 $y'' + y/4x^2 = 0$ 在 $x=0$ 处寻求Taylor级数解 $y = \sum_{n=0}^\infty a_n x^n$。代入方程并逐项微分后，得到关于 $a_n$ 的方程组：$(n - \frac{1}{2})^2 a_n = 0$ ($n = 0, 1, 2, \cdots$)。其解为 $a_n = 0$，仅得到平凡解 $y(x) = 0$。此方法无效。

上例中 Taylor 级数失效的原因是：Taylor级数不足以描述解在正则奇点附近的局部行为。但是 3.1 节 Fuchs 定理告诉我们解具有比Taylor级数更一般的结构：若 $x_0$ 是齐次线性微分方程的正则奇点，则至少存在一个形如 (3.1.2) 的解：$y(x) = (x - x_0)^\alpha A(x)$，其中 $A(x)$ 在 $x_0$ 解析。若 $\alpha$ 非整数，解在 $x_0$ 有代数支点；若 $\alpha$ 为负整数，则有极点；若 $\alpha = 0, 1, 2, \cdots$，则解在 $x_0$ 解析。$n$ 阶方程的其余 $n-1$ 个线性无关解可能具有 (3.1.3)、(3.1.4) 或 (3.1.5) 的形式，故可能含对数支点。

因 $A(x)$ 解析，故可展为Taylor级数：

$$
y(x) = (x - x_0)^\alpha A(x) = (x - x_0)^\alpha \sum_{n=0}^{\infty} a_n (x - x_0)^n. \tag{3.3.1}
$$

称 (3.3.1) 右侧为 **Frobenius 级数**，$\alpha$ 为 **指标指数**。通常假设 Frobenius 级数中 $a_0 \neq 0$（通过适当选择 $\alpha$ 实现）。Taylor级数是 Frobenius 级数的特例。

!!! example "例（正则奇点处的局部分析）"
    对上例的方程，在 $x_0 = 0$ 处尝试 (3.3.1) 的 Frobenius 级数，得：

    $$
    \left[ (n+\alpha)(n+\alpha-1) + \frac{1}{4} \right] a_n = 0 \quad (n = 0, 1, 2, \cdots).
    $$

    由 $a_0 \neq 0$ 得：

    $$
    \alpha(\alpha-1) + \frac{1}{4} = 0 \implies \alpha = \frac{1}{2}.
    $$

    代入 $\alpha = \frac{1}{2}$ 后，其余方程给出 $a_1 = a_2 = \cdots = 0$。故 Frobenius 级数 $y(x) = a_0 \sqrt{x}$（$a_0$ 任意），此为精确解。

    由 1.4 节 Euler 方程的研究，知该方程的第二个解为 $y(x) = b \sqrt{x} \ln x$（不具有 (3.3.1) 形式）。一般理论仅保证存在一个 Frobenius 级数形式的解，其余解可能更复杂。

下面我们将详述 Fuchs 和 Frobenius 提出的系统方法，用于计算指标指数 $\alpha$ 和展开系数 $a_n$。此方法亦可求解形如 (3.1.4) 和 (3.1.5) 的含对数解，方法的核心是判断其余解应取 (3.1.2)-(3.1.5) 中何种形式的准则。

### 1.4 二阶方程的 Frobenius 方法 { #s1-4 }

若微分方程

$$
y'' + \frac{p(x)}{x-x_0}y' + \frac{q(x)}{(x-x_0)^2}y = 0 \tag{3.3.2}
$$

在 $x_0$ 有正则奇点，则 $p(x)$ 和 $q(x)$ 在 $x_0$ 解析。故可将 $p(x)$ 和 $q(x)$ 展为 $x_0$ 处的Taylor级数：

$$
p(x) = \sum_{n=0}^{\infty} p_n (x - x_0)^n, \quad q(x) = \sum_{n=0}^{\infty} q_n (x - x_0)^n.
$$

代入 (3.3.2) 并将 Frobenius 级数解 (3.3.1) 代入，对比系数得：

$$
\begin{align*}
&(x-x_0)^{\alpha-2}: \quad [\alpha^2 + (p_0 - 1)\alpha + q_0]a_0 = 0,\tag{18} \\
&(x-x_0)^{\alpha+n-2}: \quad [(\alpha+n)^2 + (p_0-1)(\alpha+n) + q_0]a_n \\
&\qquad\qquad\qquad\qquad = -\sum_{k=0}^{n-1} [(\alpha+k)p_{n-k} + q_{n-k}]a_k, \quad n=1,2,\cdots.\tag{19}
\end{align*}
$$

因 $a_0 \neq 0$，(18) 要求 $\alpha$ 为指标多项式 $P(\alpha)$ 的根：

$$
P(\alpha) = \alpha^2 + (p_0 - 1)\alpha + q_0. \tag{3.3.4}
$$

对每个 $\alpha$ 值，需由递推关系 (19) 解出 $a_n$（以 $a_0$ 表示）。仅当 $P(\alpha+n) \neq 0$ 时，(19) 可递推求解 $a_n$。若此条件对所有正整数 $n$ 成立，则级数 (3.3.1) 的收敛半径至少等于 $p(x)$ 或 $q(x)$ 的最小复奇点距离。设 $\alpha_1$ 和 $\alpha_2$ 为指标多项式 $P(\alpha)$ 的两根满足 $\operatorname{Re} \alpha_1 \geq \operatorname{Re} \alpha_2$。取 $\alpha = \alpha_1$ 时，因 $\alpha_2$ 是 $P(\alpha)$ 的唯一另一根，故 $P(\alpha_1 + n) \neq 0$（$n=1,2,\cdots$），此即 Frobenius 级数解恒存在的原因。

!!! example "例（$\nu$ 阶修正 Bessel 方程）"
    修正Bessel方程

    $$
    y'' + \frac{1}{x}y' - \left(1 + \frac{\nu^2}{x^2}\right)y = 0 \tag{3.3.5}
    $$

    在 $x=0$ 有正则奇点。代入 Frobenius 级数 $y = \sum_{n=0}^{\infty} a_n x^{\alpha+n}$ 得：

    $$
    \sum_{n=0}^{\infty} (\alpha+n)(\alpha+n-1)a_n x^{\alpha+n-2} + \sum_{n=0}^{\infty} (\alpha+n)a_n x^{\alpha+n-2} - \sum_{n=0}^{\infty} a_n x^{\alpha+n} - \nu^2 \sum_{n=0}^{\infty} a_n x^{\alpha+n-2} = 0.
    $$

    将 $\sum_{n=0}^{\infty} a_n x^{\alpha+n}$ 改写为 $\sum_{n=1}^{\infty} a_{n-1} x^{\alpha+n-2}$，联立 $x$ 的幂次系数：

    $$
    \begin{aligned}
    &x^{\alpha-2}: \quad (\alpha^2 - \nu^2)a_0 = 0, \\
    &x^{\alpha-1}: \quad [(\alpha+1)^2 - \nu^2]a_1 = 0, \\
    &x^{\alpha+n-2}: \quad [(\alpha+n)^2 - \nu^2]a_n = a_{n-1}, \quad n=2,3,\cdots.
    \end{aligned}\tag{3.3.6}
    $$

    由 $a_0 \neq 0$，$\alpha$ 须满足指标方程 $P(\alpha) = \alpha^2 - \nu^2 = 0$，故 $\alpha = \pm \nu$。不妨设 $\operatorname{Re} \nu \geq 0$，则 $\alpha_1 = \nu$，$\alpha_2 = -\nu$。因 $P(\alpha_1 + n) \neq 0$（$n=1,2,\cdots$），可由 (3.3.6) 解得 $a_1 = a_3 = \cdots = 0$，

    $$
    a_{2n} = \frac{a_{2n-2}}{2^2 n(\nu + n)} = \frac{a_{2n-4}}{2^4 n(n-1)(\nu + n)(\nu + n - 1)} = \cdots = \frac{a_0 \Gamma(\nu + 1)}{2^{2n} n!  \Gamma(\nu + n + 1)}. \tag{3.3.7}
    $$

    故

    $$
    y(x) = a_0 \Gamma(\nu + 1) x^\nu \sum_{n=0}^{\infty} \frac{(x/2)^{2n}}{n!  \Gamma(\nu + n + 1)}.
    $$

    取 $a_0 = 2^{-\nu} / \Gamma(\nu + 1)$，即得修正Bessel函数 $I_\nu(x)$ 的 Frobenius 级数：

    $$
    I_\nu(x) = \sum_{n=0}^{\infty} \frac{(x/2)^{2n + \nu}}{n!  \Gamma(\nu + n + 1)}. \tag{3.3.8}
    $$

    比值判别法表明级数收敛半径无穷，对应 (3.3.5) 在有限复平面仅 $x=0$ 一个奇点。

    当 $\nu$ 非整数时，取 $\alpha = -\nu$ 可得第二解。若 $2\nu$ 亦非整数，则 $P(-\nu + n) \neq 0$（对所有正整数 $n$），故存在第二个 Frobenius 级数。只要 $2\nu$ 非偶数，由 (3.3.7) 可确定 $a_n$，且 $I_{-\nu}(x)$ 的级数 (3.3.8) 收敛。当 $\nu$ 非整数时，因 $I_\nu(x)$ 与 $I_{-\nu}(x)$ 的首项幂次不同，二者线性无关。

    故当 $\nu \neq 0,1,2,3,\cdots$ 时，Frobenius 方法给出完备的线性无关解集。当 $\nu$ 为整数时，求第二解较复杂，本节后续将阐明相应方法。

总的来说，对二阶方程 (3.3.2)，若指标指数差 $\alpha_1 - \alpha_2$ 非整数，则取 $\alpha = \alpha_1$ 和 $\alpha = \alpha_2$ 可构造两个线性无关的 Frobenius 级数解。若 $\alpha_1 = \alpha_2$，则取 $\alpha = \alpha_2$ 仅得与第一解成比例的解，需进一步分析求第二解。若 $\alpha_1 - \alpha_2 = N$为正整数，则当 $n=N$ 时递推关系 (19) 化为：

$$
0 \cdot a_N = -\sum_{k=0}^{N-1} [(\alpha + k)p_{N-k} + q_{N-k}]a_k. \tag{3.3.9}
$$

此时有两种可能：

1. 若 (3.3.9) 右端非零，则 $a_N$ 不存在，需额外方法求第二线性无关解；

2. 若 (3.3.9) 右端恰为零，则方程退化为恒等式 $0=0$，$a_N$ 为任意常数。递推关系可越过 $n=N$ 继续求解 $a_{N+1}, a_{N+2}, \cdots$，得到含两个任意常数 $a_0$ 和 $a_N$ 的第二线性无关解。

综上我们有分类：

- I $\alpha_1 \neq \alpha_2$ 且 $\alpha_1 - \alpha_2$ 非整数：存在两个 Frobenius 级数解。

- II $\alpha_1 - \alpha_2 = N = 0,1,2,\cdots$，分两子类：

    - (a) $\alpha_1 = \alpha_2$：仅一个 Frobenius 级数解。

    - (b) $\alpha_1 - \alpha_2 = 1,2,3,\cdots$，再分两情形：

        - (i) (3.3.9) 右端非零：仅一个 Frobenius 级数解。
        - (ii) (3.3.9) 右端为零：存在两个 Frobenius 级数解。

### 1.5 情形 II(b)(ii) { #s1-5 }

此情形由 (3.3.9) 右端为零刻画，确保存在指标指数 $\alpha_2$ 的 Frobenius 级数解。

!!! example "例（常点处的 Frobenius 级数）"
    在微分方程的常点 $x_0$ 应用 Frobenius 理论。此时 $p_0 = q_0 = 0$，指标方程为 $P(\alpha) = \alpha(\alpha-1) = 0$，指标指数 $\alpha_1=1$, $\alpha_2=0$。对应解：

    $\alpha_1=1$：解为Taylor级数 $y(x) = \sum_{n=0}^{\infty} a_n (x-x_0)^{n+1}$，满足初值 $y(x_0)=0$, $y'(x_0)=a_0 \neq 0$。

    $\alpha_2=0$：存在形式 (3.3.1) 的第二解，亦为Taylor级数。

!!! example "例（半整数阶修正Bessel方程）"
    修正Bessel方程 (3.3.5) 中取 $\nu = \frac{1}{2}, \frac{3}{2}, \frac{5}{2}, \cdots$（半整数），则指标指数差 $\alpha_1 - \alpha_2 = 2\nu = 1,3,5,\cdots$。此处 $p_0=1$, $q_0=-\nu^2$，其余 $p_n=q_n=0$（$n \geq 1$）。可证(3.3.9) 右端为零，故两解均有 Frobenius 级数展开，即 (3.3.8) 给出的 $I_\nu(x)$ 和 $I_{-\nu}(x)$。

### 1.6 情形 II(a) { #s1-6 }

将 $a_n$ 视为 $a_0$ 和 $\alpha$ 的函数，记所得 Frobenius 级数为：

$$
y(x,\alpha) = (x - x_0)^\alpha \sum_{n=0}^{\infty} a_n(\alpha) (x - x_0)^n. \tag{3.3.10}
$$

注意：仅当 $\alpha = \alpha_1$ 时 $y(x,\alpha)$ 才是 (3.3.2) 的解。

定义微分算子：

$$
L \equiv \frac{d^2}{dx^2} + \frac{p(x)}{x-x_0} \frac{d}{dx} + \frac{q(x)}{(x-x_0)^2}.
$$

(3.3.2) 的解满足 $Ly(x) = 0$。由构造，$a_n(\alpha)$ 满足递推关系 (19)，故 $y(x,\alpha)$ 在 $\alpha \neq \alpha_1$ 时满足：

$$
Ly(x,\alpha) = a_0 (x - x_0)^{\alpha-2} P(\alpha). \tag{3.3.11}
$$

取 $\alpha = \alpha_1$ 时，(3.3.11) 右端为零，$y(x,\alpha_1)$ 即为 Frobenius 级数解。但若对 (3.3.11) 关于 $\alpha$ 求导后取 $\alpha = \alpha_1$，因 $\alpha_1 = \alpha_2$ 时 $P(\alpha) = (\alpha - \alpha_1)^2$，右端仍为零。因此，$\left. \frac{\partial}{\partial \alpha} y(x,\alpha) \right|_{\alpha=\alpha_1}$ 是 (3.3.2) 的新解：

$$
L \left[ \left. \frac{\partial}{\partial \alpha} y(x,\alpha) \right|_{\alpha=\alpha_1} \right] = 0.
$$

对 (19) 关于 $\alpha$ 求导，得新解形式：

$$
\left. \frac{\partial}{\partial \alpha} y(x,\alpha) \right|_{\alpha=\alpha_1} = y(x,\alpha_1) \ln (x - x_0) + \sum_{n=0}^{\infty} b_n (x - x_0)^{\alpha_1 + n}, \tag{3.3.12}
$$

其中

$$
b_n = \left. \frac{\partial}{\partial \alpha} a_n(\alpha) \right|_{\alpha=\alpha_1}. \tag{3.3.13}
$$

由此得到正则奇点附近两个线性无关解的级数展开，(3.3.12) 的收敛半径至少等于方程 (3.3.2) 的最近奇点距离。

!!! example "例（零阶修正Bessel方程）"
    (3.3.5) 中取 $\nu=0$，指标多项式 $P(\alpha)=\alpha^2$ 在 $\alpha=0$ 有二重根。第一解 (3.3.8) 为：

    $$
    I_0(x) = \sum_{n=0}^{\infty} \frac{(x/2)^{2n}}{(n!)^2}. \tag{3.3.14}
    $$

    线性无关解形如 (3.3.12)。由 (3.3.6)得：$a_0(\alpha)=a_0$, $a_{2k+1}(\alpha)=0$ ($k=0,1,2,\cdots$)，且

    $$
    a_{2n}(\alpha) = \frac{a_0}{2^{2n} (\alpha + 2n)^2 (\alpha + 2n - 2)^2 \cdots (\alpha + 2)^2}, \quad n \geq 1.
    $$

    故 $b_0 = \left. \frac{\partial }{\partial \alpha}a_0(\alpha) \right|_{\alpha=0} = 0$，$b_{2k+1}=0$，且

    $$
    b_{2n} = \left. \frac{\partial }{\partial \alpha} a_{2n}(\alpha)\right|_{\alpha=0} = -\frac{a_0}{2^{2n} (n!)^2} \left( 1 + \frac{1}{2} + \cdots + \frac{1}{n} \right), \quad n \geq 1.
    $$

    代入 (3.3.12) 得 $I_0(x)$ 的线性无关解：

    $$
    \left. \frac{\partial }{\partial \alpha}y(x,\alpha) \right|_{\alpha=0} = a_0 \ln x \sum_{n=0}^{\infty} \frac{(x/2)^{2n}}{(n!)^2} - a_0 \sum_{n=1}^{\infty} \frac{(x/2)^{2n}}{(n!)^2} \left( 1 + \frac{1}{2} + \cdots + \frac{1}{n} \right).
    $$

    取 $a_0=-1$ 并加上$\ln 2 - \gamma$ 倍的$I_0(x)$得特解 $K_0(x)$：

    $$
    K_0(x) = -(\ln \frac{x}{2} + \gamma) I_0(x) + \sum_{n=1}^{\infty} \frac{(x/2)^{2n}}{(n!)^2} \left( 1 + \frac{1}{2} + \cdots + \frac{1}{n} \right). \tag{3.3.15}
    $$

    如此定义 $K_0(x)$ 的原因是其在 $x \to \infty$ 有优美的渐近行为，后文我们将提到。

### 1.7 情形 II(b)(i) { #s1-7 }

当 $\alpha_1 - \alpha_2 = N$且 (3.3.9) 右端非零时，尝试类似情形 II(a) 的方法。对 (3.3.11) 关于 $\alpha$ 求导后取 $\alpha = \alpha_1$，得 $\left. \frac{\partial}{\partial \alpha} y(x,\alpha) \right|_{\alpha=\alpha_1}$ 满足非齐次方程：

$$
L \left[ \left. \frac{\partial}{\partial \alpha} y(x,\alpha) \right|_{\alpha=\alpha_1} \right] = a_0 P'(\alpha_1)(x - x_0)^{\alpha_2 + N - 2}. \tag{3.3.16}
$$

为构造齐次方程 (3.3.2) 的解，需先求 (3.3.16) 的第二个特解。可证存在标准 Frobenius 展开的特解：

$$
\sum_{n=0}^{\infty} c_n (x - x_0)^{\alpha_2 + n}. \tag{3.3.17}
$$

代入 (3.3.16) 并联立 $(x - x_0)^{\alpha_2 + n - 2}$ 系数：

$$
\begin{align*}
&(x - x_0)^{\alpha_2 - 2}: \quad P(\alpha_2)c_0 = 0, \tag{34}\\
&(x - x_0)^{\alpha_2 + n - 2}: \quad P(\alpha_2 + n)c_n + \sum_{k=0}^{n-1} [(\alpha_2 + k)p_{n-k} + q_{n-k}]c_k = 0, \quad n \neq 0,N,\tag{35} \\
&(x - x_0)^{\alpha_2 + N - 2}: \quad P(\alpha_2 + N)c_N + \sum_{k=0}^{N-1} [(\alpha_2 + k)p_{N-k} + q_{N-k}]c_k = a_0 P'(\alpha_1). \tag{36}
\end{align*}
$$

因 $P(\alpha_2 + N) = 0$，(36) 不决定 $c_N$，而给出约束：

$$
a_0 = \frac{1}{P'(\alpha_1)} \sum_{k=0}^{N-1} [(\alpha_2 + k)p_{N-k} + q_{N-k}]c_k. \tag{3.3.19}
$$

构造 (3.3.2) 的第二解 $y(x)$ 为两非齐次解之差：

$$
y(x) = \sum_{n=0}^{\infty} c_n (x - x_0)^{\alpha_2 + n} - \left. \frac{\partial}{\partial \alpha} y(x,\alpha) \right|_{\alpha=\alpha_1}. \tag{3.3.20}
$$

其中系数 $c_n$ 满足 (35)；$c_0$ 和 $c_N$ 任意，(3.3.19) 决定 $a_0$。展开式 (3.3.20) 的收敛半径至少为 $p(x)$ 和 $q(x)$ 的最近奇点距离。

!!! example "例（整数阶修正Bessel方程（$\nu=1$））"
    当 $\nu=1$ 时，(3.3.5) 的一解为 Frobenius 级数 $I_1(x)$。取 $c_0=1$, $c_2 = \frac{1}{2} - \frac{1}{2}\ln 2 - \frac{\gamma}{4}$，定义修正Bessel函数 $K_1(x)$：

    $$
    K_1(x) = \left( \gamma + \ln \frac{x}{2} \right) I_1(x) + \frac{1}{x} - \frac{x}{4} - \sum_{n=1}^{\infty} \frac{(x/2)^{2n}}{n! (n+1)!} \left( \sum_{k=1}^{n} \frac{1}{k} + \frac{1}{2n+2} \right). \tag{3.3.21}
    $$

至此，我们完整叙述了二阶方程的 Frobenius 方法。

### 1.8 高阶方程的 Frobenius 级数 { #s1-8 }

Frobenius 方法可推广至 $n$ 阶齐次线性微分方程在正则奇点 $x_0$ 的情形：

$$
\frac{d^n y}{dx^n} + \frac{q_{n-1}(x)}{x - x_0} \frac{d^{n-1} y}{dx^{n-1}} + \cdots + \frac{q_0(x)}{(x - x_0)^n} y = 0,
$$

其中 $q_0(x), \cdots, q_{n-1}(x)$ 在 $x_0$ 解析。指标方程为：

$$
\alpha(\alpha-1)\cdots(\alpha-n+1) + q_{n-1}(x_0)\alpha(\alpha-1)\cdots(\alpha-n+2) + \cdots + q_0(x_0) = 0.
$$

若 $n$ 个根 $\alpha$ 的差非整数，则存在 $n$ 个形如 (3.3.1) 的线性无关解，否则需推广至 (3.1.4) 或 (3.1.5) 的形式。

### 1.9 齐次线性方程非正则奇点处的局部级数展开 { #s1-9 }

前两节方法的固化风格反映了理论的完备性，几乎没有想象性数学的空间。但从此处开始，风格转变。分析非正则奇点附近解的局部行为需发展全新数学工具，整体构成近似演算体系。

本节将看到，描述非正则奇点附近解局部行为的公式是 Frobenius 级数的推广，如同 Frobenius 级数是Taylor级数的推广。

首先我们来看 Frobenius 级数为何不足以描述非正则奇点附近行为。

!!! example "例"
    微分方程 $y' = x^{1/2} y$ 在 $x=0$ 有非正则奇点。解 $y(x)$ 可表为 $x=0$ 处的收敛级数：

    $$
    y(x) = a_0 e^{2x^{3/2}/3} = a_0 \sum_{n=0}^{\infty} \frac{(2x^{3/2}/3)^n}{n!},
    $$

    此级数并非 Frobenius 级数。

!!! example "例"
    微分方程

    $$
    x^3 y'' = y \tag{3.4.1}
    $$

    若存在形式解 $y = \sum_{n=0}^{\infty} a_n x^{\alpha+n}$（$a_0 \neq 0$），则

    $$
    \sum_{n=0}^{\infty} (\alpha+n)(\alpha+n-1) a_n x^{\alpha+n+1} = \sum_{n=0}^{\infty} a_n x^{\alpha+n}.
    $$

    联立 $x^\alpha$ 项系数得 $a_0 = 0$，矛盾！

!!! example "例"
    方程

    $$
    x^2 y'' + (1 + 3x)y' + y = 0 \tag{3.4.2}
    $$

    在 $0$ 有非正则奇点。代入 $y = \sum_{n=0}^{\infty} a_n x^{\alpha+n}$：

    $$
    x^2 \sum_{n=0}^{\infty} (\alpha+n)(\alpha+n-1)a_n x^{\alpha+n-2} + (1+3x) \sum_{n=0}^{\infty} (\alpha+n)a_n x^{\alpha+n-1} + \sum_{n=0}^{\infty} a_n x^{\alpha+n} = 0.
    $$

    联立 $x$ 幂次系数：

    $$
    \begin{aligned}
    &x^{\alpha-1}: \quad \alpha a_0 = 0, \\
    &x^{\alpha+n}: \quad (\alpha+n+1)a_{n+1} + (\alpha+n+1)^2 a_n = 0, \quad n=0,1,\cdots
    \end{aligned}
    $$

    因 Frobenius 级数要求 $a_0 \neq 0$，指标方程为 $\alpha=0$。解得 $a_{n+1} = -(n+1)a_n$，故 $a_n = (-1)^n n!  a_0$，解为：

    $$
    y(x) = a_0 \sum_{n=0}^{\infty} (-1)^n n!  x^n. \tag{3.4.3}
    $$

    该级数收敛半径为零，对所有 $x \neq 0$ 发散，矛盾！

发散级数 (3.4.3) 是应用数学中常见的级数展开——**渐近级数**。其虽发散，但可得到微分方程解的精确近似。

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/computational-applied-math.pdf){ .md-button download="computational-applied-math.pdf" }
