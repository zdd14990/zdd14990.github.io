---
title: 第六章：凸优化
date: 2026-07-07
updated: 2026-10-15
description: 计算与应用数学笔记第六章：一些符号约定、凸集与凸函数、可微凸函数、凸包、仿射包和相对内点、凸函数的性质、局部与全局最小值、渐进序列、超平面。
hide:
  - navigation
categories:
  - 应用数学
tags:
  - applied-math
---

# 第六章：凸优化 { #top }

## 1. 一些符号约定 { #s1 }

- 我们只考虑 $\mathbb{R}^n$ 空间上的优化问题。
- 所有的向量约定为列向量。
- $'$表示转置。
- $x'y$ 为 $\sum_{i=1}^{n}$ 表示 $x$ 和 $y$ 的内积。
- $||x||_2 = (x'x)^{1/2}$ 为 $x$ 的欧几里得范数。

## 2. 凸集与凸函数 { #s2 }

!!! definition "定义（凸集）"
    设 $C \subseteq \mathbb{R}^n$，如果对于任意 $x,y \in C$ 和 $\alpha \in [0,1]$，都有

    $$
    \alpha x + (1-\alpha)y \in C,
    $$

    则称 $C$ 是**凸集(convex set)**。

!!! example "例"
    - **Polyhedron sets**：非空的满足

        $$
        C = \left\{x \Big| a'_jx \le b_j,j=1,\cdots,r\right\}
        $$

    - **Cones**：满足对任意的 $x\in C,\lambda>0$ 均有 $\lambda x \in C$ 的集合。

!!! definition "定义（凸函数）"
    设 $C \subseteq \mathbb{R}^n$ 是凸集，$f: C \to \mathbb{R}$，如果对于任意 $x,y \in C$ 和 $\alpha \in [0,1]$，都有

    $$
    f(\alpha x + (1-\alpha)y) \le \alpha f(x) + (1-\alpha)f(y),
    $$

    则称 $f$ 是定义在 $C$ 上的**凸函数(convex function)**。若等号当且仅当 $x=y$ 时成立，则称 $f$ 是**严格凸函数(strictly convex function)**。

!!! theorem "命题"
    若 $f$ 是凸函数，则 $\left\{ x\in C\Big| f(x)\le \gamma\right\}$ 与 $\left\{ x\in C\Big| f(x)< \gamma\right\}$ 均为凸集。

!!! definition "定义"
    $f:X\rightarrow [-\infty,+\infty]$ 的 **epigraph** 定义为

    $$
    \text{epi} (f) = \left\{(x,w) \Big| x\in X,w\in \mathbb{R},w\ge f(x)\right\}.
    $$

!!! definition "定义"
    $f$ 的 **effective domain** 定义为

    $$
    \text{dom} (f) = \left\{x\in X \Big| f(x)<+\infty\right\}.
    $$

!!! definition "定义"
    我们称 $f$ 是 **凸的**，若 $\text{epi}(f)$ 是凸集。

注意到，若 $f(x)\in \mathbb{R}$，则该定义与之前的定义等价。

!!! definition "定义"
    我们称 $f$ 是**闭的**，若 $\text{epi}(f)$ 是闭集。

!!! definition "定义"
    我们称 $f$ 在 $x\in X$ 处是**下半连续的(lower semicontinuous)**，若对于任意 $\{x_k\}\subseteq X$ 满足 $x_k\to x$ 时，有

    $$
    \liminf_{k\to\infty} f(x^k) \ge f(x).
    $$

!!! theorem "命题"
    对函数 $f:\mathbb{R}^n \to [-\infty,+\infty]$，下列命题等价：

    - 对任意 $\gamma \in \mathbb{R}$，集合 $V_\gamma=\left\{x\in \mathbb{R}^n\Big| f(x)\le \gamma\right\}$ 是闭集；
    - $f$ 在任意 $x\in \mathbb{R}^n$ 处是下半连续的；
    - $f$ 是闭的。

??? proof "证明"
    $(1)\Longrightarrow(2)$：设 $\{x_k\}\subseteq \mathbb{R}^n$ 且 $x_k\to x$，则对任意 $\varepsilon>0$，存在 $N>0$ 使得当 $k>N$ 时，有 $f(x_k)>f(x)-\varepsilon$。因此，

    $$
    \liminf_{k\to\infty} f(x_k) \ge f(x)-\varepsilon.
    $$

    由于 $\varepsilon>0$ 是任意的，故 $\liminf_{k\to\infty} f(x_k) \ge f(x)$。

    $(2)\Longrightarrow(3)$：设 $\{(x_k,w_k)\}\subseteq \text{epi}(f)$ 且 $(x_k,w_k)\to (x,w)$，则 $w_k \ge f(x_k)$。由下半连续性可知

    $$
    w = \lim_{k\to\infty} w_k \ge \liminf_{k\to\infty} f(x_k) \ge f(x),
    $$

    因此，$(x,w)\in \text{epi}(f)$。

    $(3)\Longrightarrow(1)$：设 $\{x_k\}\subseteq V_\gamma$ 且 $x_k\to x$，则 $(x_k,\gamma)\in \text{epi}(f)$。由闭性可知 $(x,\gamma)\in \text{epi}(f)$，即 $f(x)\le \gamma$，所以 $x\in V_\gamma$。

!!! theorem "命题"
    设 $f:X\rightarrow [-\infty,+\infty]$，则若 $\text{dom}(f)$ 是闭集且 $f$ 在 $\text{dom}(f)$ 上下半连续，则 $f$ 是闭的。

??? proof "证明"
    设 $\{(x_k,w_k)\}\subseteq \text{epi}(f)$ 且 $(x_k,w_k)\to (x,w)$，则 $w_k \ge f(x_k)$。若 $x\in \text{dom}(f)$，则由下半连续性可知

    $$
    w = \lim_{k\to\infty} w_k \ge \liminf_{k\to\infty} f(x_k) \ge f(x),
    $$

    因此，$(x,w)\in \text{epi}(f)$。若 $x\notin \text{dom}(f)$，则 $f(x)=+\infty$，显然 $(x,w)\in \text{epi}(f)$。

!!! definition "定义"
    我们称 $f$ 是 **proper** 若 $\text{dom}(f)\neq \emptyset$ 且 $f(x)>-\infty$ 对任意 $x\in X$ 成立。我们称 $f$ 是 **improper** 若 $f$ 不是 proper。

!!! theorem "命题"
    - $g:\mathbb{R}^n\rightarrow (-\infty,+\infty]$ 由下式给出

        $$
        g(x)=\lambda_1f_1(x)+\cdots+\lambda_mf_m(x),
        $$

        其中 $\lambda_i> 0$，若 $f_i:\mathbb{R}^n\rightarrow [-\infty,+\infty]$ 是凸(闭)函数，则 $g$ 是凸(闭)函数。

    - $g:\mathbb{R}^n\rightarrow (-\infty,+\infty]$ 由下式给出

        $$
        g(x)=f(Ax)
        $$

        其中 $A\in \mathbb{R}^{m\times n}$，若 $f:\mathbb{R}^m\rightarrow [-\infty,+\infty]$ 是凸(闭)函数，则 $g$ 是凸(闭)函数。

    - 考虑 $f_i:\mathbb{R}^n\rightarrow (-\infty,\infty]$，$i\in I$，$g:\mathbb{R}^n\rightarrow (-\infty,+\infty]$ 由下式给出

        $$
        g(x)=\max_{i\in I} f_i(x)
        $$

        若$f_i$ 是凸(闭)函数，则 $g$ 是凸(闭)函数。

??? proof "证明"
    证明留给读者。

## 3. 可微凸函数 { #s3 }

!!! theorem "命题"
    设 $C\subset \mathbb{R}^n$ 是凸集，$f:\mathbb{R}^n\rightarrow \mathbb{R}$ 是可微函数，则 $f$ 是 $C$ 上的凸函数当且仅当

    $$
    f(z) \ge f(x) + (z-x)'\nabla f(x), \forall x,z\in C
    $$

    若等号当且仅当 $x=z$ 时成立，则 $f$ 是严格凸函数。

??? proof "证明"
    “$\Longleftarrow$”：设 $x,y\in C$，$\alpha\in [0,1]$，$z=\alpha x+(1-\alpha)y$，则

    $$
    \begin{aligned}
    f(z) &\ge f(x) + (z-x)'\nabla f(x) \\
    &= f(x) + (1-\alpha)(y-x)'\nabla f(x) \\
    &\ge f(x) + (1-\alpha)(f(y)-f(x)) \\
    &= \alpha f(x) + (1-\alpha)f(y)
    \end{aligned}
    $$

    “$\Longrightarrow$”：设 $x,z\in C$，$\alpha\in (0,1)$，$y=\frac{z-\alpha x}{1-\alpha}$，则

    $$
    \begin{aligned}
    f(z) &= f(\alpha x + (1-\alpha)y) \\
    &\le \alpha f(x) + (1-\alpha)f(y)
    \end{aligned}
    $$

    即

    $$
    f(y) \ge \frac{f(z)-\alpha f(x)}{1-\alpha}.
    $$

    由 $y=\frac{z-\alpha x}{1-\alpha}$ 可知

    $$
    z = \alpha x + (1-\alpha)y.
    $$

    对上式两边关于 $\alpha$ 求导，得

    $$
    0 = x - y + (1-\alpha)\frac{\partial y}{\partial \alpha},
    $$

    即

    $$
    \frac{\partial y}{\partial \alpha} = \frac{y-x}{1-\alpha}.
    $$

    因此，

    $$
    \frac{\partial}{\partial \alpha} f(y) = \nabla f(y)' \frac{\partial y}{\partial \alpha} = \nabla f(y)' \frac{y-x}{1-\alpha}.
    $$

    对不等式两边关于 $\alpha$ 求导，得

    $$
    0 \le -\frac{f(z)-f(x)}{(1-\alpha)^2} + \frac{1}{1-\alpha} \nabla f(y)'(y-x).
    $$

    令 $\alpha\to 0$，则 $y\to z$，从而

    $$
    f(z) \ge f(x) + (z-x)'\nabla f(z).
    $$

!!! theorem "定理（optimality condition）"
    设 $C$ 是 $\mathbb{R}^n$ 中的非空凸集，$f:\mathbb{R}^n\rightarrow \mathbb{R}$ 是凸函数且在 $C$ 上可微，则 $x^*\in C$ 是 $\min_{x\in C} f(x)$ 的解当且仅当

    $$
    (x-x^*)'\nabla f(x^*) \ge 0, \forall x\in C.
    $$

??? proof "证明"
    “$\Longrightarrow$”：设 $x\in C$，$\alpha\in (0,1)$，则 $\alpha x + (1-\alpha)x^* \in C$，因此

    $$
    f(\alpha x + (1-\alpha)x^*) \ge f(x^*).
    $$

    由凸性可知

    $$
    f(\alpha x + (1-\alpha)x^*) \le \alpha f(x) + (1-\alpha)f(x^*),
    $$

    故

    $$
    \alpha f(x) + (1-\alpha)f(x^*) \ge f(x^*).
    $$

    即

    $$
    f(x) - f(x^*) \ge 0.
    $$

    对上式两边关于 $\alpha$ 求导，得

    $$
    0 \le f(x) - f(x^*) = (x-x^*)'\nabla f(x^*).
    $$

    “$\Longleftarrow$”：设 $x\in C$，$\alpha\in [0,1]$，则 $\alpha x + (1-\alpha)x^* \in C$，由凸性可知

    $$
    f(\alpha x + (1-\alpha)x^*) \le \alpha f(x) + (1-\alpha)f(x^*).
    $$

    由假设可知

    $$
    f(x) - f(x^*) \ge 0.
    $$

    因此，

    $$
    f(\alpha x + (1-\alpha)x^*) \le \alpha f(x) + (1-\alpha)f(x^*) \le \alpha f(x^*) + (1-\alpha)f(x^*) = f(x^*).
    $$

!!! theorem "定理（projection theorem）"
    设 $C$ 是 $\mathbb{R}^n$ 中的非空闭凸集。

    - 对于任意 $z\in \mathbb{R}^n$，存在唯一的 $x^*\in C$ 使得 $f(x)=||x-z||^2$ 在 $C$ 上取得最小值，$x^*$称为 $z$ 在 $C$ 上的**投影(projection)**。

    - $x^*$ 是 $z$ 在 $C$ 上的投影当且仅当

        $$
        (x-x^*)'(z-x^*) \le 0, \forall x\in C.
        $$

??? proof "证明"
    $(a)$: 设 $\{x_k\}\subseteq C$ 且 $f(x_k)\to \inf_{x\in C} f(x)$，则 $\{x_k\}$ 有界，因此存在 $\{x_{k_i}\}\subseteq \{x_k\}$ 和 $x^*\in \mathbb{R}^n$ 使得 $x_{k_i}\to x^*$。由于 $C$ 是闭集，故 $x^*\in C$。由$f$的连续性可知

    $$
    f(x^*) = \lim_{i\to\infty} f(x_{k_i}) = \inf_{x\in C} f(x).
    $$

    若 $y^*\in C$ 且 $y^*\neq x^*$，则

    $$
    ||y^*-z||^2 = ||y^*-x^* + x^*-z||^2 = ||y^*-x^*||^2 + ||x^*-z||^2 + 2(y^*-x^*)'(x^*-z) > ||x^*-z||^2,
    $$

    因此，$x^*$ 是唯一的。

    $(b)$: 由上一定理可知，$x^*$ 是 $z$ 在 $C$ 上的投影当且仅当

    $$
    (x-x^*)'\nabla f(x^*) \ge 0, \forall x\in C.
    $$

    由于 $\nabla f(x) = 2(x-z)$，因此结论成立。

!!! theorem "命题"
    设 $C$ 是 $\mathbb{R}^n$ 中的非空闭凸集，$f:\mathbb{R}^n\rightarrow \mathbb{R}$ 是 $\mathbb{R}^n$ 上的二阶连续可微函数。

    - 若 $\nabla^2 f(x)$ 在 $C$ 上半正定，则 $f$ 是 $C$ 上的凸函数。
    - 若 $\nabla^2 f(x)$ 在 $C$ 上正定，则 $f$ 是 $C$ 上的严格凸函数。
    - 若 $C$ 是开的且 $f$ 是 $C$ 上的凸函数，则 $\nabla^2 f(x)$ 在 $C$ 上半正定。

??? proof "证明"
    $(a)$：由中值定理可知对 $x,y\in C$，存在 $\alpha\in (0,1)$ 使得

    $$
    f(y) = f(x) + (y-x)'\nabla f(x)+\frac{1}{2}(y-x)'\nabla^2 f(x+\alpha(y-x))(y-x).
    $$

    由于 $\nabla^2 f(x+\alpha(y-x))$ 半正定，故

    $$
    f(y) \ge f(x) + (y-x)'\nabla f(x).
    $$

    由前命题可知，$f$ 是 $C$ 上的凸函数。

    $(b)$：同$(a)$，由于 $\nabla^2 f(x+\alpha(y-x))$ 正定，故

    $$
    f(y) > f(x) + (y-x)'\nabla f(x).
    $$

    由前命题可知，$f$ 是 $C$ 上的严格凸函数。

    $(c)$：由反证法，设存在 $x\in C$ 和 $d\in \mathbb{R}^n$ 使得 $d'\nabla^2 f(x)d < 0$，则存在 $\alpha>0$ 使得

    $$
    f(x+\alpha d) < f(x) + \alpha d'\nabla f(x).
    $$

    由于 $C$ 是开的，故 $x+\alpha d\in C$。由前命题可知，$f$ 不是 $C$ 上的凸函数，这与假设矛盾。

## 4. 凸包、仿射包和相对内点 { #s4 }

给定集合 $X\subset \mathbb{R}^n$。

!!! definition "定义"
    $X$ 中元素的一个**凸组合(convex combination)**是形如

    $$
    \sum_{i=1}^k \alpha_i x_i,
    $$

    其中 $x_i\in X$，$\alpha_i\ge 0$ 且 $\sum_{i=1}^k \alpha_i = 1$ 的向量。

!!! definition "定义"
    $X$ 的**凸包(convex hull)**是包含 $X$ 的所有凸集的交集，记为 $\text{conv}(X)$。

!!! definition "定义"
    一个**仿射集(affine set)**形如 $\bar{x}+S$，其中 $\bar{x}\in \mathbb{R}^n$，$S$ 是 $\mathbb{R}^n$ 的子空间。

!!! definition "定义"
    $X$ 的**仿射包(affine hull)**是包含 $X$ 的所有仿射集的交集，记为 $\text{aff}(X)$。

!!! definition "定义"
    $X$ 中元素的一个**非负线性组合(nonnegative linear combination)**是形如$\sum_{i=1}^k \alpha_i x_i,$其中 $x_i\in X$，$\alpha_i\ge 0$ 的向量。

!!! definition "定义"
    $X$ 生成的**锥(cone)**是所有 $X$ 中元素的非负线性组合的集合，记为 $\text{cone}(X)$。

!!! theorem "定理（Caratheodory's theorem）"
    设 $X$ 是 $\mathbb{R}^n$ 的子集。

    - 任意非零元 $x\in \text{cone}(X)$ 可表示为 $X$ 中至多 $n$ 个元素的非负线性组合。
    - 任意非零元 $x\in \text{conv}(X)$ 可表示为 $X$ 中至多 $n+1$ 个元素的凸组合。

??? proof "证明"
    $(a)$：设 $x\in \text{cone}(X)$，则存在 $x_i\in X$ 和 $\alpha_i\ge 0$ 使得

    $$
    x = \sum_{i=1}^m \alpha_i x_i.
    $$

    若 $m\le n$，则结论成立。若 $m>n$，则 $\{x_1,\cdots,x_m\}$ 线性相关，故存在不全为零的 $\beta_i$ 使得

    $$
    \sum_{i=1}^m \beta_i x_i = 0.
    $$

    设 $I=\{i|\beta_i>0\}$，$J=\{i|\beta_i<0\}$，则 $I\cup J=\{1,\cdots,m\}$。由于 $x\neq 0$，故 $I\neq \emptyset$。令

    $$
    \theta = \min_{i\in I} \frac{\alpha_i}{\beta_i} > 0,
    $$

    则对任意 $i\in I$，都有 $\alpha_i - \theta \beta_i \ge 0$，且存在 $i_0\in I$ 使得 $\alpha_{i_0} - \theta \beta_{i_0} = 0$。因此，

    $$
    x = \sum_{i=1}^m \alpha_i x_i = \sum_{i=1}^m (\alpha_i - \theta \beta_i) x_i,
    $$

    其中 $\alpha_i - \theta \beta_i \ge 0$ 且 $\alpha_{i_0} - \theta \beta_{i_0} = 0$。由此可去掉 $x_{i_0}$，得到 $x$ 的一个新的表示。反复进行该过程，直到表示中不超过 $n$ 个元素为止。

    $(b)$：将 $(a)$ 应用于 $X' = \{(x,1)|x\in X\}\subseteq \mathbb{R}^{n+1}$ 即可。

!!! theorem "命题"
    紧集的凸包是紧集。

??? proof "证明"
    设 $X$ 是 $\mathbb{R}^n$ 中的紧集，$\{y_k\}\subseteq \text{conv}(X)$ 且 $y_k\to y$，则存在 $x_{k,i}\in X$ 和 $\alpha_{k,i}\ge 0$ 使得

    $$
    y_k = \sum_{i=1}^{m_k} \alpha_{k,i} x_{k,i}, \quad \sum_{i=1}^{m_k} \alpha_{k,i} = 1.
    $$

    由Caratheodory定理可知，$m_k\le n+1$。因此，存在 $m\le n+1$ 和 $\{y_{k_j}\}\subseteq \{y_k\}$ 使得

    $$
    y_{k_j} = \sum_{i=1}^m \alpha_{k_j,i} x_{k_j,i}, \quad \sum_{i=1}^m \alpha_{k_j,i} = 1.
    $$

    由于 $X$ 是紧集，故存在 $\{x_i\}\subseteq X$ 和 $\{\alpha_i\}$ 使得 $x_{k_j,i}\to x_i$ 和 $\alpha_{k_j,i}\to \alpha_i$。由 $\sum_{i=1}^m \alpha_{k_j,i} = 1$ 可知 $\sum_{i=1}^m \alpha_i = 1$。因此，

    $$
    y = \lim_{j\to\infty} y_{k_j} = \sum_{i=1}^m \alpha_i x_i,
    $$

    即 $y\in \text{conv}(X)$。

!!! definition "定义"
    称 $x$ 是 $C$ 的**相对内点(relative interior)**，记为 $\text{ri}(C)$，若 $x$ 是一个 $C$ 在 $\text{aff}(C)$ 中的内点。

!!! definition "定义"
    记 $\text{ri}(C)$ 为 $C$ 所有相对内点的集合。

!!! theorem "定理（Line Segment Principle）"
    设 $C$ 是 $\mathbb{R}^n$ 中的非空凸集，则对任意 $x\in \text{ri}(C)$ 和 $\bar{x}\in \text{cl}(C)$，都有

    $$
    \alpha x + (1-\alpha)\bar{x} \in \text{ri}(C), \forall \alpha\in [0,1).
    $$

??? proof "证明"
    固定 $\alpha \in (0, 1]$。考虑 $x_\alpha = \alpha x + (1 - \alpha)\bar{x}$。

    令 $L$ 为平行于 $\text{aff}(C)$ 的子空间。定义 $B_L(0, \epsilon) := \{z \in L \mid \|z\| < \epsilon\}$。

    由于 $\bar{x} \in \text{cl}(C)$，对于所有 $\epsilon > 0$，有 $\bar{x} \in C + B_L(0, \epsilon)$。那么

    $$
    \begin{aligned}
    B(x_\alpha; \epsilon) \cap \text{aff}(C)
    &= \{\alpha x + (1 - \alpha)\bar{x}\} + B_L(0; \epsilon) \\
    &\subset \{\alpha x\} + (1 - \alpha)C + (2 - \alpha)B_L(0; \epsilon) \\
    &= (1 - \alpha)C + \alpha \left[x + B_L\left(0; \frac{2 - \alpha}{\alpha}\epsilon\right)\right]
    \end{aligned}
    $$

    由于 $x \in \text{ri}(C)$，对于足够小的 $\epsilon$，有 $x + B_L\left(0; \frac{2 - \alpha}{\alpha}\epsilon\right) \subset C$。

    因此 $B(x_\alpha; \epsilon) \cap \text{aff}(C) \subset \alpha C + (1 - \alpha)C = C$（因为 $C$ 是凸集）。所以，$x_\alpha \in \text{ri}(C)$。

!!! theorem "命题"
    设 $C$ 是非空凸集。

    - $\text{ri}(C)$ 是非空凸集，且其仿射包与 $C$ 相同。
    - **Prolongation Lemma**：$x\in \text{ri}(C)$ 当且仅当对任意以 $x$ 为端点的所有线段可以延伸超过 $x$ 的另一端点而仍在 $C$ 内。

??? proof "证明"
    $(a)$：设 $0\in C$。取 $m$ 个线性独立向量 $z_1,\cdots,z_m\in C$，其中 $m$ 是 $\text{aff}(C)$ 的维数，设

    $$
    X=\left\{ \sum_{i=1}^m \alpha_i z_i\Big| \sum_{i=1}^m \alpha_i<1,\alpha_i>0,i=1,\cdots, m \right\}
    $$

    则 $X\subseteq \text{ri}(C)$ 且 $\text{aff}(X)=\text{aff}(C)$。因此，$\text{ri}(C)$ 是非空的。由凸性可知，$\text{ri}(C)$ 是凸集。

    $(b)$：必要性显然。充分性：任取 $\bar{x}\in C$ ，由 Line Segment Principle 可知

    $$
    \alpha x + (1-\alpha)\bar{x} \in \text{ri}(C), \forall \alpha\in [0,1).
    $$

    因此，$x\in \text{ri}(C)$。

!!! theorem "命题"
    一个凹函数 $f:\mathbb{R}^n\rightarrow \mathbb{R}$ 在 $X$ 上的最小值在 $x^*\in \text{ri}(X)$ 处取得，则 $f$ 在 $X$ 上为常值。

??? proof "证明"
    反证法，设存在 $x\in X$ 使得 $f(x)>f(x^*)$。 由 Line Segment Principle 可知

    $$
    \alpha x + (1-\alpha)x^* \in \text{ri}(X), \forall \alpha\in [0,1).
    $$

    由凸性可知

    $$
    f(\alpha x + (1-\alpha)x^*) \le \alpha f(x) + (1-\alpha)f(x^*) < f(x^*),
    $$

    矛盾。

!!! theorem "推论"
    一个非常值线性函数在其定义域的相对内点上没有极值。

!!! theorem "命题"
    - $\text{cl}(C)=\text{cl}(\text{ri}(C))$ 且 $\text{ri}(\text{cl}(C))=\text{ri}(C)$。

    - 设 $\bar{C}$ 是 $\mathbb{R}^n$ 中的非空闭凸集，则

        - $C$ 和 $\bar{C}$ 有相同的相对内点；
        - $C$ 和 $\bar{C}$ 有相同的闭包；
        - $\text{ri}(C)\subset \bar{C}\subset \text{cl}(C)$。

??? proof "证明"
    $(a)$：由定义可知 $\text{cl}(\text{ri}(C))\subseteq \text{cl}(C)$。反过来，设 $\bar{x}\in \text{cl}(C)$，$x\in \text{ri}(C)$，则由 Line Segment Principle 可知

    $$
    \alpha x + (1-\alpha)\bar{x} \in \text{ri}(C), \forall \alpha\in (0,1].
    $$

    因此，$\bar{x}\in \text{cl}(\text{ri}(C))$，从而 $\text{cl}(C)\subseteq \text{cl}(\text{ri}(C))$。

    其余同理。

!!! theorem "命题"
    设 $C$ 是 $\mathbb{R}^n$ 中的非空凸集且 $A$ 是 $m\times n$ 矩阵，则

    - $A\cdot (\text{ri}(C))=\text{ri}(A\cdot C)$；
    - $A\cdot (\text{cl}(C))\subset \text{cl}(A\cdot C)$。若 $C$ 是有界的，则等号成立。

??? proof "证明"
    $(a)$：由 $C$ 中(关于仿射包)的邻域映射为 $A\cdot C$ 中的邻域即得。

    $(b)$：我们有 $A\cdot \text{cl}(C)\subseteq \text{cl}(A\cdot C)$，这是因为对序列 $\left\{x_k\right\}\subset C$，若 $x_k\to x\in \text{cl}(C)$，则 $Ax_k\to Ax\in \text{cl}(A\cdot C)$。

    反过来，设 $C$ 是有界的，取任意 $z\in \text{cl}(A\cdot C)$，则存在 $\{x_k\}\subseteq A\cdot C$ 使得 $x_k\to z$。由 $C$ 有界可知存在 $\{x_{k_j}\}\subseteq \{x_k\}$ 和 $x\in \mathbb{R}^n$ 使得 $x_{k_j}\to x$。由于 $C$ 是闭集，故 $x\in C$，于是有 $z=Ax$。因此，$z\in A\cdot \text{cl}(C)$。

!!! theorem "命题"
    设 $C_1$ 和 $C_2$ 是 $\mathbb{R}^n$ 中的非空凸集，则

    -

        $$
        \text{ri}(C_1)+\text{ri}(C_2)=\text{ri}(C_1+C_2);
        $$

        $$
        \text{cl}(C_1)+\text{cl}(C_2)\subset \text{cl}(C_1+C_2).
        $$

        若 $C_1$ 和 $C_2$ 都是有界的，则等号成立。

    -

        $$
        \text{ri}(C_1)\cap \text{ri}(C_2)\subset \text{ri}(C_1\cap C_2)\quad \text{cl}(C_1\cap C_2)\subset \text{cl}(C_1)\cap\text{cl}( C_2).
        $$

        若 $\text{ri}(C_1)\cap \text{ri}(C_2)\neq \emptyset$，则等号成立。

??? proof "证明"
    证明留给读者。

!!! theorem "命题（Cartesian product）"
    设 $C$ 是 $\mathbb{R}^{n+m}$ 中的非空凸集，对 $x\in \mathbb{R}^n$，定义

    $$
    C_x = \{y\in \mathbb{R}^m | (x,y)\in C\}.
    $$

    与

    $$
    D=\left\{ x\Big| C_x\neq \emptyset\right\}
    $$

    则

    $$
    \text{ri}(C)=\left\{(x,y)|x\in \text{ri}(D), y\in \text{ri}(C_x)\right\}
    $$

??? proof "证明"
    由于 $D$ 是 $C$ 的投影，故

    $$
    \text{ri}(D)=\left\{x\Big| \exists y\in \mathbb{R}^m ,(x,y)\in \text{ri}(C)\right\}
    $$

    于是

    $$
    \text{ri}(C)=\bigcup_{x\in \text{ri}(D)}(M_x\cap \text{ri}(C))
    $$

    其中 $M_x=\{(x,y)|y\in \mathbb{R}^m\}$。对任意 $x\in \text{ri}(D)$，$M_x\cap \text{ri}(C)=\text{ri}(M_x\cap C)=\left\{ (x,y)\Big| y\in \text{ri}(C_x)\right\}$

## 5. 凸函数的性质 { #s5 }

!!! theorem "命题"
    若 $f:\mathbb{R}^n\rightarrow \mathbb{R}$ 是凸的，则 $f$ 连续。

??? proof "证明"
    我们来证明 $f$ 在 $0$ 处连续。由凸性，$f$ 在单位正方体上有界且最大值在顶点处取得。

    考虑 $x_k\rightarrow 0$，令 $y_k=x_k/\|x_k\|_\infty$，$z_k=-x_k/\|x_k\|_\infty$，则

    $$
    f(x_k)\le (1-\|x_k\|_\infty ) f(0)+\|x_k\|_\infty f(y_k)
    $$

    $$
    f(0)\le \frac{\|x_k\|_\infty }{\|x_k\|_\infty +1}f(z_k)+\frac{1}{\|x_k\|_\infty +1}f(x_k)
    $$

    令 $k\rightarrow \infty$ 即得。

不仅如此，我们还可以将连续性延拓到 $\text{ri} (\text{dom}(f))$ 上。

!!! definition "定义"
    函数 $f:X\rightarrow [-\infty,+\infty]$ 的**闭包**为函数 $\text{cl} f:\mathbb{R}^n\rightarrow [-\infty,+\infty]$ 定义为

    $$
    \text{epi}(\text{cl} f)=\text{cl}(\text{epi}(f)).
    $$

!!! definition "定义"
    $f$ 的 **凸包** 为函数 $\check{\text{cl}}f$ 定义为

    $$
    \text{epi}(\check{\text{cl}} f)=\text{cl}(\text{conv}(\text{epi}(f))).
    $$

!!! theorem "命题"
    对任意 $f:X\rightarrow [-\infty,+\infty]$，

    $$
    \inf_{x\in X} f(x)=\inf _{x\in \mathbb{R}^n}(\text{cl} f)(x)=\inf_{x\in \mathbb{R}^n}(\check{\text{cl}} f)(x).
    $$

!!! theorem "命题"
    对任意 $f:X\rightarrow [-\infty,+\infty]$，则

    - $\text{cl} f$(或 $\check{\text{cl}} f$) 是最大的闭(或闭凸)函数满足被 $f$ 优化。

    - 若 $f$ 是凸的，则 $\text{cl} f$ 是凸的。其 proper 当且仅当 $f$ proper。且

        $$
        (\text{cl}f)(x)=f(x), \forall x\in \text{ri}(\text{dom}(f)).
        $$

        且若 $x\in \text{ri}(\text{dom}(f))$，$y\in \text{dom}(\text{cl}f)$，则

        $$
        (\text{cl}f)(y)=\lim_{\alpha\rightarrow 0^+} f(y+\alpha(x-y)).
        $$

!!! definition "定义"
    给定非空凸集 $C$，向量 $d$ 称为 **回收方向(a direction of recession)**，若从任意点 $x\in C$ 沿 $d$ 方向出发的射线都包含在 $C$ 中，即

    $$
    x+\alpha d\in C, \forall x\in C, \forall \alpha\ge 0.
    $$

!!! definition "定义"
    $C$ 的**回收锥(recession cone)** 定义为所有回收方向构成的集合，记为 $R_C$。

容易看到 $R_C$ 是包含原点的锥。

!!! theorem "命题"
    设 $C$ 是非空闭凸集。

    - $R_C$ 是闭凸锥。

    - 向量 $d\in R_C$ 当且仅当存在向量 $x\in C$ 使得 $x+\alpha d\in C, \forall \alpha\ge 0$。

    - $R_C$ 含非零向量当且仅当 $C$ 是无界的。

    - $C$ 和 $\text{ri}(C)$ 有相同的回收锥。

    - 若 $D$ 为另一个闭凸集满足 $C\cap D\neq \emptyset$，则

        $$
        R_{C\cap D}=R_C\cap R_D
        $$

        更一般的对一族闭凸集 $\{C_i\}_{i\in I}$，若 $\cap_{i\in I} C_i\neq \emptyset$，则

        $$
        R_{\cap_{i\in I} C_i}=\cap_{i\in I} R_{C_i}.
        $$

??? proof "$(b)$的证明"
    设 $d\neq 0$，存在 $x\in C$ 使得 $x+\alpha d\in C, \forall \alpha\ge 0$。固定 $\bar{x}\in C,\alpha>0$，我们来证明 $\bar{x}+\alpha d\in C$。通过单位化 $d$ 只需证明 $\bar{x}+d\in C$。

    对 $k=1,2\cdots$，令

    $$
    z_k=x_k+kd,d_k=\frac{(z_k-\bar{x})}{\|z_k-\bar{x}\|}\|d\|
    $$

    我们有

    $$
    \frac{d_k}{\|d_k\|}=\frac{z_k-\bar{x}}{\|z_k-\bar{x}\|}\frac{d}{\|d\|}+\frac{x-\bar{x}}{\|z_k-\bar{x}\|},\frac{z_k-\bar{x}}{\|z_k-\bar{x}\|}\rightarrow 1,\frac{x-\bar{x}}{\|z_k-\bar{x}\|}\rightarrow 0
    $$

    故 $d_k\rightarrow d$ 且 $\bar{x}+d_k\rightarrow \bar{x}+d$。由于 $C$ 是闭凸集，故 $\bar{x}+d\in C$。

!!! definition "定义"
    凸集 $C$ 的**线性空间(lineality space)** 定义为 $C$ 的回收锥与其负回收锥的交集，记为

    $$
    L_C=R_C\cap (-R_C).
    $$

若 $d\in L_C$，这表明 $C$ 包含经过任意点 $x\in C$ 的方向为 $d$ 的直线。由此我们可以将凸集 $C$ 分解为

$$
C=L_C +(C\cap L_C^\perp).
$$

这使得我们可以将证明关于 $C$ 的结论归结为关于 $C\cap L_C^\perp$ 的结论。该分解将 $L_C$ 换成其子空间 $S$ 同样成立。

接下来我们的目标是刻画凸函数的单调递减方向。

!!! theorem "命题"
    设 $f:\mathbb{R}^n\rightarrow (-\infty,+\infty]$ 是闭且 proper 的凸函数，考虑水平集 $V_\gamma=\left\{ x\Big| f(x)\le \gamma\right\}$，其中 $\gamma$ 是标量，则：

    - 所有非空水平集 $V_\gamma$ 有相同的回收锥：

        $$
        R_{V_\gamma}=\left\{ d\Big| (d,0)\in R_{\text{epi}(f)}\right\}.
        $$

    - 若某个非空水平集 $V_\gamma$ 是紧的，则所有水平集都是紧的。

??? proof "证明"
    $(a)$：显然。

    $(b)$：由$(a)$即得。

!!! definition "定义"
    对闭且 proper 的凸函数 $f:\mathbb{R}^n\rightarrow (-\infty,+\infty]$，$V_\gamma$ 的回收锥称为称为 $f$ 的**回收锥(recession cone)**，记为 $R_f$。同上定义 $d\in R_f$ 为 $f$ 的**回收方向**，$L_f=R_f\cap (-R_f)$ 为 $f$ 的**线性空间**，$d\in L_f$ 称为 $f$ 的**不变空间**。

!!! example "例"
    对半正定矩阵 $Q$，函数 $f(x)=x'Qx+a'x+b$，我们有

    $$
    R_f=\left\{ d\Big|Qd=0,a'd\le 0\right\},L_f=\left\{d\Big| Qd=0,a'd=0\right\}.
    $$

!!! definition "定义"
    定义 $f$ 的**回收函数(recession function)** 为 $r_f:\mathbb{R}^n\rightarrow (-\infty,+\infty]$，其满足

    $$
    \text{epi}(r_f)=R_{\text{epi}(f)}.
    $$

!!! theorem "命题"
    $$
    R_f=\left\{ d\Big| r_f(d)\le 0\right\},L_f=\left\{ d\Big| r_f(d)=r_f(-d)=0\right\}.
    $$

!!! theorem "命题"
    $$
    r_f(d)=\sup_\alpha \frac{f(x+\alpha d)-f(x)}{\alpha}=\lim_{\alpha\rightarrow +\infty}\frac{f(x+\alpha d)-f(x)}{\alpha}, \forall x\in \text{dom}(f).
    $$

因此 $r_f(d)$ 描述了 $f$ 的渐进线。事实上若 $f$ 可微，

$$
r_f(d)=\lim_{\alpha\rightarrow +\infty} \nabla f(x+\alpha d)'d, \forall x,d \in \mathbb{R}^n.
$$

## 6. 局部与全局最小值 { #s6 }

考虑在集合 $X\subset \mathbb{R}^n$ 上极小化 $f:\mathbb{R}^n \rightarrow \mathbb{R}$ 的问题。

!!! definition "定义"
    - 称 $x$ 是**可行的(feasible)** 若 $x\in X\cap \text{dom}(f)$ 。
    - 称 $x^*$ 是 $f$ 在 $X$ 上的(全局) **最小值点(minimum)**，若 $x^*$ 可行且 $f(x^*)=\inf_{x\in X} f(x)$。
    - 称 $x^*$ 是 $f$ 在 $X$ 上的**局部最小值点(local minimum)**，若存在某个 $\epsilon>0$ 使得 $x^*$ 是 $X\cap B(x^*;\epsilon)$ 上的最小值点。

!!! theorem "命题"
    若 $X$ 是凸集且 $f$ 是凸的，则

    - 任意局部最小值点都是全局最小值点；
    - 若 $f$ 是严格凸的，则最小值点唯一。

下面我们考虑优化问题的解的存在性问题。

注意到 $f$ 最小值点的集合是 $f$ 的水平集的交集。若某个水平集是紧的，则所有水平集都是紧的，且最小值点存在。

!!! theorem "定理（(An Extension of the) Weierstrass's theorem）"
    $f$ 最小值点的集合是非空且紧的，若 $X$ 是闭的，$f$ 在 $X$ 上下半连续，且下述条件有一者成立：

    - $X$ 有界；
    - 某个水平集 $V_\gamma=\{x\in X|f(x)\le \gamma\}$ 是非空的且有界。
    - 对任意子序列 $\{x_k\}\subset X$，若 $\|x_k\|\rightarrow +\infty$，则 $f(x_k)\rightarrow +\infty$。

??? proof "证明"
    在每种情形下，$f$ 的水平集 $\cap X$ 均为紧集。

!!! theorem "命题（Weierstrass' Theorem specialized to convex function）"
    设 $X$ 是 $\mathbb{R}^n$ 中的非空闭凸集，$f:\mathbb{R}^n\rightarrow (-\infty,+\infty]$ 是闭且凸的函数满足 $X\cap \text{dom}(f)\neq \emptyset$，则 $f$ 在 $X$ 上的最小值点存在当且仅当 $R_X\cap R_f=\{0\}$。

??? proof "证明"
    设 $f^*=\inf_{x\in X} f(x)$。注意到由于 $X\cap \text{dom}(f)\neq \emptyset$，故 $f^*<\infty$。设 $\left\{\gamma_k\right\}$ 是一个递减到 $f^*$ 的数列，考虑

    $$
    V_k=\{x\in X|f(x)\le \gamma_k\}
    $$

    则 $f$ 在 $X$ 上的最小值点为

    $$
    X^*=\cap_{k=1}^\infty (X\cap V_k).
    $$

    其中 $X\cap V_k$ 是非空的且 $R_f\cap R_X$ 是其回收锥，当 $X\neq 0$ 时这也是 $X^*$ 的回收锥。这表明 $X^*$ 是非空且紧的当且仅当 $R_f\cap R_X=\{0\}$。

!!! theorem "命题"
    设 $f_i:\mathbb{R}^n\rightarrow (-\infty,+\infty]$，$i=1,2$ 是闭且 proper 的凸函数，且满足

    $$
    f=f_1+\cdots +f_m
    $$

    是 proper 的。若存在一个 $f_i$ 满足 $r_{f_i}(d)=\infty$ 对任意非零 $d\in R_{f}$，则 $f$ 在 $\mathbb{R}^n$ 上的最小值点集非空且紧。

??? proof "证明"
    由假设可知 $r_f(d)=\infty$ 对任意非零 $d\in R_f$。因此，$R_f=\{0\}$，由 Weierstrass 定理即得。

将 $f$ 改为 $\max\{f_1,\cdots,f_m\}$ 结论同样成立。

考虑一个基础的问题：给定 $\mathbb{R}^n$ 上的非空闭集序列 $\left\{C_k\right\}$  满足 $C_{k+1}\subseteq C_k$，则 $\cap_{k=1}^\infty C_k$ 是否非空？由此可以借由 $X\cap V_k$ 的交集非空判断 $f$ 在 $X$ 上的最小值点集是否非空。

还有一个相关的问题：若 $C$ 是闭的，$A$ 是矩阵，则 $AC$ 是否是闭的？更特别的若 $C_1,C_2$ 是闭的，$C_1+C_2$ 是否是闭的？注意到 $C_1+C_2= A(C_1\times C_2)$，其中 $A(x_1,x_2)=x_1+x_2$。

!!! theorem "命题"
    设 $C$ 是非空闭凸集，$A$ 是矩阵，$N(A)$ 是其零空间。则 $AC$ 是闭的当且仅当 $N(A)\cap R_C=\{0\}$。

??? proof "证明"
    设 $\left\{y_k\right\}\subset AC$ 满足 $y_k\rightarrow \bar{y}$。定义 $C_k=C\cap N_k$ ，其中

    $$
    N_k=\left\{x\Big| Ax\in W_k\right\},\quad W_k=\left\{z\Big| \|z-\bar{y}\|\le \|y_k-\bar{y}\| \right\}
    $$

    我们有 $R_{N_k}=N(A)$，故 $C_k$ 是紧的，且 $C_k$ 的交不空。取 $x\in \cap_{k=1}^\infty C_k$，则 $Ax=\bar{y}$，从而 $\bar{y}\in AC$。

于是我们有：$C_1+C_2$ 是闭的当且仅当 $C_1,C_2$ 是闭的且有一者是紧的。

!!! theorem "定理"
    若 $X$ 是多面体，则 $AX$ 是闭的。

设 $F:\mathbb{R}^{n+m}\rightarrow (-\infty,+\infty]$ 是闭且 proper 的凸函数，定义 $f:\mathbb{R}^n\rightarrow (-\infty,+\infty]$ 为

$$
f(x)=\inf_{z\in \mathbb{R}^m} F(x,z).
$$

!!! theorem "命题"
    若 $F$ 是凸的，则 $f$ 是凸的。

若 $F(x,z)$ 是闭的，$f(x)$ 不一定是闭的。考虑闭的凸函数

$$
F(x,z)=\begin{cases}
e^{-\sqrt{xz}}\quad&\text{if } x\ge 0,z\ge 0\\
\infty &\text{otherwise}
\end{cases}
$$

但是

$$
f(x)=\inf_{z\in \mathbb{R}^m} F(x,z)=\begin{cases}
0 \quad &x>0\\
1 &x=0\\
\infty &x<0
\end{cases}
$$

不是闭的

!!! theorem "命题"
    $$
    P(\text{epi}(F))\subset \text{epi}(f)\subset \text{cl}(P(\text{epi}(F))),
    $$

    其中 $P(x,z,w)=(x,w)$。

!!! theorem "定理（Preservation of Closedness Under Compactness）"
    设 $F:\mathbb{R}^{n+m}\rightarrow (-\infty,+\infty]$ 是闭且 proper 的凸函数，定义 $f:\mathbb{R}^n\rightarrow (-\infty,+\infty]$ 为 $f(x)=\inf_{z\in \mathbb{R}^m} F(x,z).$若存在某个 $\bar{x}\in \mathbb{R}^n,\bar{\gamma}\in \mathbb{R}$ 满足

    $$
    \left\{z\Big| F(\bar{x},z)\le \bar{\gamma}\right\}
    $$

    是非空且紧的，则 $f$ 是闭且 proper 的凸函数。同样的，对任意 $x\in \text{dom}(f)$，都有 $F(x,\cdot)$ 的极小值点是非空且紧的。

## 7. 渐进序列 { #s7 }

!!! definition "定义（asymptotic sequence）"
    给定闭凸集序列 $\left\{C_k\right\}$，$\left\{x_k\right\}$ 称为 **渐近序列(asymptotic sequence)**，若

    $$
    0\neq x_k\in C_k,\|x_k\|\rightarrow +\infty,\lim_{k\rightarrow \infty}\frac{x_k}{\|x_k\|}=\frac{d}{\|d\|}
    $$

    其中 $d$ 是 $C_k$ 共有的非零回收方向。

!!! theorem "命题"
    任意无界序列 $\left\{x_k\right\}$ 中存在一个渐近子序列。

!!! definition "定义（retractive）"
    $\left\{x_k\right\}$ 称为 **可收缩的(retractive)**，若存在某个非零回收方向 $d$ ，存在某个 $\bar{k}>0$ 使得

    $$
    x_k-d\in C_k,\forall k\ge \bar{k}.
    $$

!!! definition "定义"
    一个闭凸集序列 $\left\{C_k\right\}$ 称为 **可收缩的(retractive)**，若其任意渐近序列都是可收缩的。

!!! theorem "命题"
    设 $\left\{C_k\right\}$ 是闭凸集序列，$X$ 是可收缩集，即 $\bar{C_k}=X\cap C_k$ 是非空集。设

    $$
    R_X\cap R\subset L
    $$

    ，其中

    $$
    R=\cap_{k=0}^\infty R_{C_k},\quad L=\cap_{k=0}^\infty L_{C_k}
    $$

    则 $\left\{\bar{C_k}\right\}$ 是可收缩的且 $\cap_{k=0}^\infty \bar{C_k}$ 非空。

??? proof "证明"
    $\left\{\bar{C_k}\right\}$ 共有的回收方向为 $R_X\cap R$。对任意 $\left\{x_k\right\}$，其渐近方向 $d\in R_X\cap R$，由 $d\in L$ 有 $x_k-d\in C_k$，由 $X$ 可收缩有 $x_k-d\in X$，从而 $x_k-d\in \bar{C_k}$。因此，$\left\{\bar{C_k}\right\}$ 是可收缩的。由 Weierstrass 定理即得。

!!! theorem "定理"
    设

    $$
    f(x)=x'Qx+c'x,X=\left\{x\Big| a_j'x+b_j\le 0,j=1,\cdots,r\right\}
    $$

    其中 $Q$ 是半正定对称矩阵。若 $f$ 在 $X$ 上的最小值有限，则 $f$ 在 $X$ 上存在最小值点。

??? proof "证明"
    我们有

    $$
    \text{最小值点集}=\cap _{k=0}^\infty \left(X\cap \left\{x\Big| x'Qx+c'x\le \gamma_k\right\} \right)
    $$

    其中 $\gamma_k \downarrow f^*=\inf_{x\in X} f(x)$。设 $R_X$ 和 $R_f$ 分别为 $X$ 和 $f$ 的回收锥，则共有的回收锥为 $R_X\cap R_f$。注意到

    $$
    R_f=\left\{d\Big| Qd=0,c'd\le 0\right\},L_f=\left\{d\Big| Qd=0,c'd=0\right\}.
    $$

    由 $f^*>-\infty$ 可知 $R_X\cap R_f\subseteq L_f$，由此可知该闭凸集序列是可收缩的。由此由前一命题即得。

!!! theorem "命题"
    设 $C$ 是非空闭凸集，设 $A$ 是矩阵其零空间为 $N(A)$。

    - 若 $R_C\cap N(A)\subset L_C$，则 $AC$ 是闭的。
    - 若 $X$ 是可收缩的且 $R_X\cap R_C\cap N(A)\subset L_C$，则 $A(X\cap C)$ 是可收缩的。

??? proof "证明"
    设 $\left\{y_k\right\}\subset AC$ 满足 $y_k\rightarrow \bar{y}$。我们来证明 $\cap_{k=0}^\infty C_k\neq \emptyset$，其中

    $$
    C_k=C\cap N_k,\quad N_k=\left\{x\Big| Ax\in W_k\right\},\quad W_k=\left\{z\Big| \|z-\bar{y}\|\le \|y_k-\bar{y}\| \right\}.
    $$

    由于 $R_{N_k}=N(A)$，故共有的回收锥为 $R_C\cap N(A)$。由假设可知该闭凸集序列是可收缩的。由 Weierstrass 定理即得。

!!! theorem "命题"
    设 $C_1,\cdots,C_m$ 是 $\mathbb{R}^n$ 的非空闭凸子集满足若 $d_1+\cdots +d_m=0$ 且 $d_i\in R_{C_i}$，则有 $d_i=0$。则 $C_1+\cdots +C_m$ 是闭的。

??? proof "证明"
    $C=C_1\times \cdots \times C_m$ 是 $\mathbb{R}^{nm}$ 的非空闭凸子集，且其回收锥 $R_C=R_{C_1}\times \cdots \times R_{C_m}$。定义 $A$ 满足：

    $$
    A(x_1,\cdots,x_m)=x_1+\cdots +x_m
    $$

    则 $N(A)=\left\{(x_1,\cdots,x_m)\Big| x_1+\cdots +x_m=0\right\}$。由假设可知 $R_C\cap N(A)=\{0\}$，由前一命题即得。

## 8. 超平面 { #s8 }

!!! definition "定义"
    一个**超平面(hyperplane)** 是形如

    $$
    H=\left\{ x\Big| a'x=b\right\}
    $$

    的集合，其中 $a\in \mathbb{R}^n,b\in \mathbb{R}$ 且 $a\neq 0$。

!!! definition "定义"
    我们称两个集合 $C_1$ 和 $C_2$ 被超平面 $H$ **分离(separated)**，若

    $$
    a'x\le b,\forall x\in C_1,\quad a'x\ge b,\forall x\in C_2.
    $$

    或 者

    $$
    a'x\ge b,\forall x\in C_1,\quad a'x\le b,\forall x\in C_2.
    $$

    若 上述不等式均严格成立，则称 $C_1$ 和 $C_2$ 被 $H$ **严格分离(strictly separated)**。

!!! definition "定义"
    若 $\bar{x}$ 属于 $C$ 的闭包和一个分离 $C$ 超平面 $H$，则称单点集 $\left\{\bar{x}\right\}$ 是 $C$ 在 $\bar{x}$ 处的**支撑(supporting)**。

!!! theorem "定理（supporting hyperplane theorem）"
    设 $C$ 是凸集，$\bar{x}$ 不是 $C$ 的内点，则存在一个超平面经过 $\bar{x}$ 且支撑 $C$。

??? proof "证明"
    取 $\left\{x_k\right\}$ 不属于 $\text{cl}(C)$ 且 $x_k\rightarrow \bar{x}$。设 $\hat{x_k}$ 为 $x_k$ 在 $\text{cl}(C)$ 上的投影，我们有对任意 $x\in \text{cl}(C)$，

    $$
    a'_kx\ge a_k'x_k,\forall k=0,1,\cdots
    $$

    其中 $a_k=(x_k-\hat{x_k})/\left\|x_k-\hat{x_k}\right\|$。令 $k\rightarrow \infty$ 即得。

!!! theorem "定理（separating hyperplane theorem）"
    设 $C_1$ 和 $C_2$ 是 $\mathbb{R}^n$ 中的非空凸集且 $\text{ri}(C_1)\cap \text{ri}(C_2)=\emptyset$，则存在一个超平面分离 $C_1$ 和 $C_2$。

??? proof "证明"
    考虑凸集

    $$
    C_1-C_2=\left\{x_1 -x_2|x_1\in C_1,x_2\in C_2\right\}.
    $$

    由于 $C_1,C_2$ 是不交的，故 $0\notin \text{ri}(C_1-C_2)$。由支持超平面定理可知，存在 $0\neq a\in \mathbb{R}^n$ 使得

    $$
    a'x\ge 0,\forall x\in C_1-C_2.
    $$

!!! theorem "推论（strict separation theorem）"
    设 $C_1$ 和 $C_2$ 是 $\mathbb{R}^n$ 中的非空闭凸集且 $C_1\cap C_2=\emptyset$。若 $C_1$ 是闭的，$C_2$ 是紧的，则存在一个超平面严格分离 $C_1$ 和 $C_2$。

??? proof "证明"
    考虑 $C_1-C_2$，由于 $C_1$ 闭 $C_2$ 紧，$C_1-C_2$ 是闭的。设 $\bar{x_1}-\bar{x_2}$ 是 $0$ 在 $C_1-C_2$ 上的投影，则 $\|\bar{x_1}-\bar{x_2}\|>0$。令 $a=\bar{x_1}-\bar{x_2}$，则

    $$
    a'x\ge \|a\|^2,\forall x\in C_1-C_2.
    $$

!!! theorem "推论（fundamental characterization）"
    集合 $C$ 的凸包的闭包为所有包含 $C$ 的闭半平面的交。

!!! definition "定义"
    我们称超平面 properly 分离 两个集合 $C_1$ 和 $C_2$，若其分离 $C_1$ 和 $C_2$ 且不完全包含 $C_1$ 或 $C_2$。

!!! theorem "定理（proper separation theorem）"
    设 $C_1$ 和 $C_2$ 是 $\mathbb{R}^n$ 中的非空闭凸集且 $C_1\cap C_2=\emptyset$。则存在一个超平面 properly 分离 $C_1$ 和 $C_2$ 当且仅当 $\text{ri}(C_1)\cap \text{ri}(C_2)=\emptyset$。

!!! definition "定义（nonvertical）"
    一个 $\mathbb{R}^{n+1}$ 中的超平面伴有法向量 $(\mu,\beta)$ 称为**非垂直的(nonvertical)**，若 $\beta\neq 0$。

其与第 $n+1$ 维轴交于 $\xi=(\mu/\beta)'\bar{u}+\bar{w}$，其中 $(\bar{u},\bar{w})$ 是超平面上的任意点。

!!! theorem "定理（novertical hyperplane theoram）"
    设 $C$ 是 $\mathbb{R}^{n+1}$ 中的非空闭凸集且 $C$ 不包含某个垂直方向的直线，则：

    - $C$ 包含于某个非垂直超平面的一侧，即存在 $\mu \in \mathbb{R}^n,\beta\in \mathbb{R}\backslash \{0\}$ 使得

        $$
        \mu'u+\beta w\ge \gamma,\forall (u,w)\in C.
        $$

    - 若 $(\bar{u},\bar{w})\notin \text{cl}(C)$，则存在一个非垂直超平面严格分离 $C$ 和 $(\bar{u},\bar{w})$。

??? proof "证明"
    由于 $C$ 不包含任意方向的垂线，故 $\text{ri}(C)$ 不包含任意方向的垂线，而 $\text{ri}(C)$ 和 $\text{cl}(C)$ 有相同的回收锥，故 $\text{cl}(C)$ 也不包含任意方向的垂线。故我们只考虑 $C$ 是闭的。

    $(a)$：$C$ 为所有包含 $C$ 的闭半平面的交，若这些半平面均垂直，则 $C$ 包含某个垂直方向的直线，矛盾。

    $(b)$：由支持超平面定理可知，存在一个超平面分离 $C$ 和 $(\bar{u},\bar{w})$。若该超平面垂直，则 $C$ 包含某个垂直方向的直线，矛盾。

!!! definition "定义（conjugate convex function）"
    对任意 $f:\mathbb{R}^n\rightarrow [-\infty,+\infty]$，其**共轭凸函数(conjugate convex function)** 定义为

    $$
    f^*(y)=\sup_{x\in \mathbb{R}^n} (x'y -f(x)), \forall y\in \mathbb{R}^n.
    $$

!!! theorem "命题"
    $f^*$ 是闭且凸的函数。

!!! theorem "定理（conjugacy theorem）"
    若 $f$ 是闭且proper的凸函数，则 $f^{**}=f$。

!!! theorem "定理（conjugacy theorem）"
    设 $f:\mathbb{R}^n\rightarrow (-\infty,+\infty]$ ，设 $\check{\text{cl}}f$ 为其凸闭包，设 $f^*$ 是其共轭凸函数，考虑 $f^*$ 的共轭

    $$
    f^{**}(x)=\sup_{y\in \mathbb{R}^n} (x'y -f^*(y)), \forall x\in \mathbb{R}^n.
    $$

    - $f(x)\ge f^{**}(x),\forall x\in \mathbb{R}^n.$
    - 若 $f$ 是凸的，则 $f,f^*,f^{**}$ 中任意一者是 proper 给出 另两者是 proper。
    - 若 $f$ 是闭且 proper 的凸函数，则 $f=f^{**}$。
    - 若 $\check{\text{cl}}f(x)>-\infty$ ，则 $\check{\text{cl}}f=f^{**}$。

??? proof "证明"
    $(a)$：显然。

    $(b)$：由定义即得。

    $(c)$：设 $g=f^{**}$，则 $g$ 是闭且 proper 的凸函数且 $f(x)\ge g(x),\forall x\in \mathbb{R}^n$。由支持超平面定理可知，$f$ 的任意支撑超平面也是 $g$ 的支撑超平面，故 $f=g$。

    $(d)$：由$(a)$和$(c)$即得。

!!! example "例"
    - 对 $\frac{1}{p}+\frac{1}{q}=1$，$p>1$ 的 $f(x)=\frac{1}{p}\|x\|^p$，其共轭函数为 $f^*(y)=\frac{1}{q}\|y\|^q$。
    - $f(x)=\frac{1}{2}x'Qx+a'x+b$，$Q$ 为半正定矩阵，则 $f^*(y)=\frac{1}{2}(y-a)'Q^{-1}(y-a)-b$。
    - $f(x)=p(A(x-c))+a'x+b$，则 $f^*(y)=q((A')^{-1}(y-a))+c'y+d$，其中 $q$ 是 $p$ 的共轭函数，$d=-(c'a+b)$。

!!! definition "定义（support function）"
    $X$ 的示性函数 $\delta_X$

    $$
    \sigma_X(y)=\sup_{x\in X} y'x
    $$

    称为 $X$ 的**支撑函数(support function)**。

!!! theorem "命题"
    $\text{epi}(\sigma_X)$ 是闭凸锥。

!!! theorem "命题"
    $X,\text{cl}(X),\text{conv}(X),\text{cl}(\text{conv}(X))$ 有相同的支撑函数。

!!! theorem "命题"
    若 $C$ 是锥，

    $$
    \sigma_C(y)=\begin{cases}
    0 \quad &if \,y'x\le 0,\forall x\in C\\
    +\infty &otherwise
    \end{cases}
    $$

    即 $\sigma_C$ 是 $C^*$ 的示性函数，其中

    $$
    C^*=\left\{ y\Big| y'x\le 0,\forall x\in C\right\}
    $$

    称为 $C$ 的**极锥(polar cone)**。

由共轭定理可知 $C^*$ 的极锥为 $\text{cl}(\text{conv}(C))$，这称为**极锥定理(polar cone theorem)**。

!!! example "例"
    若 $C=\text{cone}\left(\left\{a_1,\cdots,a_r\right\}\right)$，则

    $$
    C^*=\left\{x\Big| a_j'x\le 0,j=1,\cdots,r\right\}.
    $$

!!! theorem "引理（Farkas' lemma）"
    $$
    (C^*)^*=C
    $$

我们已经将对偶的概念从集合的对偶延伸至函数的对偶，现在我们考虑问题的对偶。

## 9. 最小公共点和最大相交点问题 { #s9 }

我们介绍一对基本问题。

!!! definition "定义"
    设 $M$ 是 $\mathbb{R}^{n+1}$ 的非空子集。

    - **最小公共点问题(minimum common point problem)**：寻找点 $(x,w)\in M$ 使得 $w$ 最小化。
    - **最大相交点问题(maximum intersecting point problem)**：考虑所有包含了 $M$ 的非垂直超平面，寻找其中与第 $n+1$ 维轴交点最大的超平面。

对最小公共问题 $w^*=\inf\{w|(x,w)\in M\}$，对最大相交点问题，我们考虑法向量为 $(\mu,1)$ 的超平面其相交点 $\xi$ 满足

$$
\xi\le w+\mu'u,\forall (u,w)\in M
$$

从而最大相交点问题可表述为最大化 $\xi\le \inf_{(u,w)\in M} (w+\mu'u),\mu\in \mathbb{R}^n$，即

$$
\text{maximize } q(\mu)=\inf_{(u,w)\in M} (w+\mu'u),\quad \text{subject }\mu\in \mathbb{R}^n.
$$

容易得到如下的**弱对偶(weak duality)**结果：

$$
q(\mu)=\inf_{(u,w)\in M} (w+\mu'u)\le \inf_{(0,w)\in M} w=w^*,\forall \mu\in \mathbb{R}^n.
$$

我们称**强对偶(strong duality)**成立，若 $q^*=w^*$。

!!! example "例"
    $$
    M=\text{epi}(p)
    $$

    其中 $p:\mathbb{R}^n\rightarrow [-\infty,\infty]$，则 $w^*=p(0)$，且

    $$
    q(\mu)=\inf_{(u,w)\in \text{epi}(p)} (w+\mu'u)=\inf_{u\in \mathbb{R}^n} (p(u)+\mu'u)=-p^*(-\mu).
    $$

    进而有

    $$
    q^*=\sup_{\mu\in \mathbb{R}^n} q(\mu)=\sup_{\mu\in \mathbb{R}^n}\left\{0\cdot (-\mu)-p^*(-\mu)\right\}=p^{**}(0)
    $$

!!! example "例"
    考虑更一般的最小化 $f:\mathbb{R}^n \rightarrow [-\infty ,\infty]$ 的问题 。设 $F:\mathbb{R}^{n+r}\rightarrow [-\infty ,\infty]$ 为

    $$
    f(x)=F(x,0),\forall x\in \mathbb{R}^n.
    $$

    考虑**扰动函数(perturbation function)**

    $$
    p(u)=\inf_{x\in \mathbb{R}^n} F(x,u),\forall u\in \mathbb{R}^r.
    $$

    且 MC/MC 框架为 $M=\mathrm{epi}(p)$。

    其最小公共值

    $$
    w^*=p(0)=\inf_{x\in \mathbb{R}^n} F(x,0)=\inf_{x\in \mathbb{R}^n} f(x).
    $$

    其对偶函数为

    $$
    q(\mu)=\inf_{u\in \mathbb{R}^r} (p(u)+\mu'u)=\inf_{(x,u)\in \mathbb{R}^{n+r}} (F(x,u)+\mu'u).
    $$

    故 $q(\mu)=-F^*(0,-\mu)$，其中 $F^*$ 是 $F$ 的共轭函数，视作 $(x,u)$ 的函数。

    我们有

    $$
    q^*=\sup_{\mu\in \mathbb{R}^r} q(\mu)=-\inf_{\mu \in \mathbb{R}^r} F^*(0,-\mu)=-\inf_{\mu \in \mathbb{R}^r} F^*(0,\mu)
    $$

    且弱对偶性形如：

    $$
    w^*=\inf_{x\in \mathbb{R}^n} F(x,0)\ge =-\inf_{\mu \in \mathbb{R}^r} F^*(0,\mu)=q^*.
    $$

!!! example "例"
    考虑约束优化：最小化 $f:\mathbb{R}^n\rightarrow \mathbb{R}$ 在

    $$
    C=\left\{x\in X\Big| g(x)\le 0\right\}
    $$

    其中 $X\subset \mathbb{R}^n$，$g:\mathbb{R}^n\rightarrow \mathbb{R}^r$。

    考虑**扰动约束集(perturbed constraint set)**

    $$
    C_u=\left\{x\in X\Big| g(x)\le u\right\},\forall u\in \mathbb{R}^r.
    $$

    与函数

    $$
    F(x,u)=\begin{cases}
    f(x)\quad &if \,x\in C_u\\
    +\infty &otherwise\end{cases}
    $$

    这满足 $F(x,0)=f(x),\forall x\in C$。

!!! example "例"
    考虑扰动函数

    $$
    p(u)=\inf_{x\in \mathbb{R}^n} F(x,u)=\inf_{x\in C_u} f(x),\forall u\in \mathbb{R}^r.
    $$

    且 MC/MC 框架为 $M=\mathrm{epi}(p)$。

    设 $L(x,\mu)=f(x)+\mu'g(x)$ 为 Lagrange 函数，则

    $$
    q(\mu)=\inf_{u\in \mathbb{R}^r}\left\{p(u)+\mu'u\right\}=\inf_{u\in \mathbb{R}^r,x\in X,g(x)\le u}\left\{f(x)+\mu'u\right\}=\begin{cases}
    \inf_{x\in X} L(x,\mu)\quad &if \,\mu\ge 0\\
    -\infty &otherwise
    \end{cases}
    $$

!!! example "例"
    考虑线性规划问题：最小化 $c'x$ 在

    $$
    C=\left\{x\in \mathbb{R}^n\Big| a'_jx\ge b_j,j=1,\cdots,r\right\}
    $$

    其中 $c\in \mathbb{R}^n$，$a_j\in \mathbb{R}^n$，$b_j\in \mathbb{R}$。

    对 $\mu\ge 0$，对偶函数

    $$
    q(\mu)=\inf_{x\in \mathbb{R}^n} \left\{c'x+\sum_{j=1}^r \mu_j(b_j -a'_jx)\right\}=\begin{cases}
    b'\mu \quad &if \,c=\sum_{j=1}^r \mu_ja_j\\
    -\infty &otherwise\end{cases}
    $$

    因此其对偶问题为

    $$
    \text{maximize } b'\mu,\quad \text{subject to } A\mu=c,\mu\ge 0.
    $$

!!! definition "定义（minimax problem）"
    给定函数 $\phi:X\times Z\rightarrow \mathbb{R}$，其中 $X\subset \mathbb{R}^n$，$Z\subset \mathbb{R}^m$，考虑

    $$
    \text{minimize } \sup_{z\in Z} \phi(x,z),\quad \text{subject to } x\in X.
    $$

    或

    $$
    \text{maximize } \inf_{x\in X} \phi(x,z),\quad \text{subject to } z\in Z.
    $$

我们总是有

$$
\sup_{z\in Z} \inf_{x\in X} \phi(x,z)\le \inf_{x\in X} \sup_{z\in Z} \phi(x,z).
$$

一个关键问题是：何时等号成立？

!!! example "例"
    对于约束问题

    $$
    \text{minimize } f(x),\quad \text{subject to } g(x)\le 0,x\in X
    $$

    其 Lagrange 函数为 $L(x,\mu)=f(x)+\mu'g(x)$，其原始问题为

    $$
    \min_{x\in X} \sup_{\mu\ge 0} L(x,\mu)
    $$

    其对偶问题为

    $$
    \max_{\mu\ge 0} \inf_{x\in X} L(x,\mu).
    $$

    其等号成立需考虑何时

    $$
    \sup_{\mu\ge 0} \inf_{x\in X} L(x,\mu)=w^*\overset{?}{=}q^*=\inf_{x\in X} \sup_{\mu\ge 0} L(x,\mu).
    $$

## 10. 零和游戏 { #s10 }

!!! definition "定义（zero sum games）"
    两个玩家：第一个选择 $i\in \left\{1,\cdots, n\right\}$，第二个选择 $j\in \left\{1,\cdots, m\right\}$。支付矩阵为 $A\in \mathbb{R}^{n\times m}$，则第一个玩家从第二个玩家处获得 $a_{ij}$。两个玩家选择

    $$
    x=(x_1,\cdots,x_n)\quad z=(z_1,\cdots,z_m)
    $$

    其中 $x_i$ 和 $z_j$ 分别为两个玩家选择 $i$ 和 $j$ 的概率。则第一个玩家的期望收益为

    $$
    \phi(x,z)=x'Az=\sum_{i=1}^n \sum_{j=1}^m a_{ij}x_iz_j.
    $$

    第一个玩家的目标是最大化其最小收益：$\text{minmize } \max_{z} \phi(x,z)$

    第二个玩家的目标是最小化其最大损失： $\text{maximize } \min_{x} \phi(x,z)$

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/computational-applied-math.pdf){ .md-button download="computational-applied-math.pdf" }
