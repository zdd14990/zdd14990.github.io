---
title: 大作业
date: 2025-12-30
updated: 2026-10-15
description: 数据科学专题大作业：在 SOS 证明系统中证明正向与反向超压缩不等式，并据此给出 Frankl-Rödl 图独立集上界的低阶 SOS 证明。
hide:
  - navigation
categories:
  - 应用数学
  - 数据科学专题
---

# 大作业 { #top }

!!! abstract "摘要"
    本文的主要结果是在 Sum-of-Squares (SOS) 证明系统中，给出了**反向超压缩不等式（Reverse Hypercontractive Inequality）**的形式化表述及其证明。

    作为该结果的一个推论，我们证明了对于任意常数 $0 < \gamma \le 1/4$，SOS/Lasserre 半定规划（SDP）层级在度数为 $4\lceil\frac{1}{4\gamma}\rceil$ 时，能够证明如下命题：

    Frankl-Rödl 图 $FR_{\gamma}^{n}$ 的最大独立集的相对大小为 $o(1)$。

    这里 $FR_{\gamma}^{n}=(V,E)$ 是一个顶点集为 $V=\{0,1\}^{n}$ 的图，当且仅当 $\Delta(x,y)=(1-\gamma)n$ 且为偶数时，$(x,y) \in E$。

    特别地，我们将展示 4 阶的 SOS 算法能够证明色数下界 $\chi(FR_{1/4}^{n})=\omega(1)$。这表明 SOS 层级在处理特定的积分与组合问题时，比标准的 SDP 松弛具有更强的证明能力。

## 1. 引言 { #s1 }

超压缩不等式（Hypercontractivity）是布尔函数分析中的核心工具，广泛应用于理论计算机科学、社会选择理论及概率论中。近年来，随着证明复杂性（Proof Complexity）和平方和（Sum-of-Squares, SOS）算法的发展，研究这些分析不等式是否能在受限的证明系统（如 SOS）中被证明变得尤为重要。

### 1.1 基本定义 { #s1-1 }

首先，我们引入布尔函数分析中的一些基本算子和范数定义。

!!! note "注（噪声算子 $T_{\rho}$）"
    设 $f:\{-1,1\}^{n} \rightarrow \mathbb{R}$ 为布尔立方体上的实值函数，相关系数 $-1 \le \rho \le 1$。定义噪声算子 $T_{\rho}$ 为：

    $$
    T_{\rho}f(x) = \mathbb{E}[f(y) \mid x]
    $$

    其中 $y$ 是 $x$ 的一个 $\rho$-相关副本。具体来说，对于 $y$ 的每一个分量 $y_i$，以概率 $\frac{1+\rho}{2}$ 取 $y_i = x_i$，以概率 $\frac{1-\rho}{2}$ 取 $y_i = -x_i$。

    等价地，在傅里叶展开下，设 $f(x) = \sum_{S\subseteq[n]} \hat{f}(S)\chi_{S}(x)$，则：

    $$
    T_{\rho}f = \sum_{S\subseteq[n]}\rho^{|S|}\hat{f}(S)\chi_{S}
    $$

    这表明 $T_{\rho}$ 算子对高频傅里叶系数有指数级的衰减作用。

!!! note "注（$p$-范数）"
    对于 $p \in \mathbb{R}$（注意这里 $p$ 不一定大于等于 1），定义：

    $$
    ||f||_{p} = \mathbb{E}_{x\sim\{-1,1\}^{n}}[|f(x)|^{p}]^{1/p}
    $$

    其中期望是针对均匀分布取的。

### 1.2 超压缩不等式与反向超压缩不等式 { #s1-2 }

经典的超压缩不等式描述了噪声算子如何将函数的范数“压缩”到更高阶的范数，而反向超压缩不等式则处理 $p < 1$ 的情况，通常涉及非负函数。

!!! note "注（超压缩不等式）"
    设 $f:\{-1,1\}^{n}\rightarrow\mathbb{R}$，且 $1\le p\le q\le\infty$。若 $0\le\rho\le\sqrt{\frac{p-1}{q-1}}$，那么：

    $$
    ||T_{\rho}f||_{q} \le ||f||_{p}
    $$

!!! note "注（反向超压缩不等式）"
    设 $f:\{-1,1\}^{n}\rightarrow\mathbb{R}^{\ge0}$ 为非负函数，且 $-\infty\le q\le p\le1$。若 $0\le\rho\le\sqrt{\frac{1-p}{1-q}}$，那么：

    $$
    ||T_{\rho}f||_{q} \ge ||f||_{p}
    $$

在 SOS 系统的背景下，Barak 等人之前的工作已经建立了 (2, 4)-超压缩不等式的 SOS 证明。

!!! theorem "定理"
    设 $k\in\mathbb{N}$，令 $\mathcal{P}^{\le k}$ 为投影算子，将 $f$ 映射到其度数不超过 $k$ 的部分。那么：

    $$
    ||\mathcal{P}^{\le k}f||_{4} \le 3^{k/2}||f||_{2}
    $$

    Barak 等人证明了，如果将 $f(x)$ 视为形式变量，那么多项式 $9^{k}||f||_{2}^{4}-||\mathcal{P}^{\le k}f||_{4}^{4}$ 可以写成多项式的平方和（SOS）。

!!! theorem "定理"
    对于任意 $q \ge 2$ 和 $f:\{-1,1\}^{n}\rightarrow\mathbb{R}$，我们有

    $$
    ||\mathcal{P}^{\le k}f||_{q}\le(q-1)^{k/2}||f||_{2}
    $$

Ryan ODonnell 和 Yuan Zhou 未能通过 SOS 证明实际获得定理 1.2，而是获得了一个较弱的版本。

!!! theorem "定理"
    设 $f, g:\{-1,1\}^{n}\rightarrow\mathbb{R}^{\ge0}$，设 $0\le q\le1$，且 $0\le\rho\le1-q$。那么当 $(x,y)$ 是一对 $\rho$-相关随机字符串时，

    $$
    \mathbb{E}[f(x)g(y)]\ge ||f||_q ||g||_q
    $$

我们在这里将介绍的就是定理 1.3 的 SOS 证明，其中 $q$ 等于偶整数的倒数。作为该结果的一个应用，我们证明了仅仅使用 SOS 层级中的 4 阶算法，就能证明用于 3-染色问题的“Frankl-Rödl”SDP 整数间隙实例具有色数 $\omega(1)$。

!!! theorem "定理"
    设 $s\in N^{+}$ 并记 $q=2s$。设 $0\le\rho\le\frac{1}{\sqrt{q-1}}$。设 $x=(x_{1},...,x_{n})$ 是一系列独立的实随机变量，每个 $x_{i}$ 满足：

    $$
    \mathbb{E}[x_{i}^{2j-1}]=0 , \mathbb{E}[x_{i}^{2j}]\le(2s-1)^{j}\frac{\binom{s}{j}}{\binom{2s}{2j}},1\le j\le s
    $$

    进一步假设每个 $i$ 都有 $\mathbb{E}[x_{i}^{2}]=1$。那么对于函数 $f_{1},...,f_{s}:\{-1,1\}^{n}\rightarrow\mathbb{R}$，存在如下不等式的 SOS 证明：

    $$
    \mathbb{E}[\prod_{i=1}^{s}(T_{\rho}f_{i}(x))^{2}]\le\prod_{i=1}^{s}\mathbb{E}[f_{i}(x)^{2}]
    $$

然而，对于更一般的 $q$（定理 1.2），之前的研究未能给出完整的 SOS 证明。本文将重点关注反向超压缩不等式的 SOS 版本（定理 1.3 的变体），特别是当 $q$ 为偶整数的倒数时。

!!! theorem "定理"
    设 $k\in N^{+}$ 且 $0\le\rho\le1-\frac{1}{2k}$。对于函数 $f,g:\{-1,1\}^{n}\rightarrow\mathbb{R}$，存在如下不等式的 SOS 证明：

    $$
    \mathbb{E}_{(x,y)}[f(x)^{2k}g(y)^{2k}] \ge \mathbb{E}[f]^{2k}\mathbb{E}[g]^{2k}
    $$

    注意，这里我们将反向超压缩不等式转化为了关于 $2k$ 次幂的多项式形式，避免了在 SOS 系统中处理非整数次幂（如 $p$-范数当 $p<1$ 时）的困难。

### 1.3 应用：Frankl-Rödl 图 { #s1-3 }

我们的主要应用是针对 Frankl-Rödl 图的独立集问题。

!!! definition "定义"
    设 $n \in \mathbb{N}$ 且 $0 \le \gamma \le 1$ 使得 $(1-\gamma)n$ 为偶整数。Frankl-Rödl 图 $FR_{\gamma}^{n}$ 是 $N=2^n$ 个顶点 $\{-1,1\}^n$ 上的无向图，边集为

    $$
    \{(x,y) : \Delta(x,y) = (1-\gamma)n\}
    $$

    其中 $\Delta(\cdot,\cdot)$ 表示汉明距离。

!!! definition "定义（Frankl-Rödl 图 $FR_{\gamma}^{n}$）"
    设 $(1-\gamma)n$ 为偶整数。图 $FR_{\gamma}^{n}$ 的顶点集为 $\{-1,1\}^n$，边集为 $\{(x,y) : \Delta(x,y) = (1-\gamma)n\}$，其中 $\Delta$ 为 Hamming 距离。

已知该图是 SDP 松弛的经典反例（Integrality Gap）。然而，我们将证明 SOS 层级可以有效地约束其最大独立集的大小。

!!! theorem "定理"
    存在常数 $K$ 使得对于所有 $\gamma \le 1/4$，成立

    $$
    \text{Max-IS}(FR_{\gamma}^{n}) < n(1-\gamma^2/K)^n
    $$

    特别地，当 $\gamma \ge \Omega(\sqrt{\frac{\log n}{n}})$ 且 $n$ 足够大时：

    $$
    \text{Max-IS}(FR_{\gamma}^{n}) \le o_n(1)
    $$

    $$
    \chi(FR_{\gamma}^{n}) = \omega_n(1)
    $$

    $$
    \text{Min-VC}(FR_{\gamma}^{n}) \ge 1 - o_n(1)
    $$

## 2. 预备知识：SOS 证明系统 { #s2 }

在深入证明之前，我们需要形式化定义 SOS 证明系统及其相关符号。

!!! definition "定义（SOS 证明）"
    设 $X=(X_{1},...,X_{n})$ 为一组不定元。给定多项式集合 $A=\{q_{1}\ge0,...,q_{m}\ge0\}\cup\{r_{1}=0,...,r_{m^{\prime}}=0\}$ 和多项式 $p$。我们称 $A$ 以度数 $k$ SOS-证明 $p\ge0$，记作 $A \vdash_k p \ge 0$，当且仅当存在多项式 $v_{j}$ 和 SOS 多项式（即多项式的平方和） $u_{i}, u_0$ 使得：

    $$
    p = u_{0} + \sum_{i=1}^{m}u_{i}q_{i} + \sum_{j=1}^{m^{\prime}}v_{j}r_{j}
    $$

    且上述表达式中每一项的度数都不超过 $k$（即 $\deg(u_0), \deg(u_i q_i), \deg(v_j r_j) \le k$）。

特别地：

- $A \vdash_k -1 \ge 0$ 称为 $k$ 阶 SOS 反驳（Refutation），意味着集合 $A$ 定义的约束系统无解。
- 若 $A = \emptyset$，记作 $\vdash_k p \ge 0$，意味着 $p$ 本身就是一个度数不超过 $k$ 的平方和多项式。

以下引理和事实在后续证明中将频繁使用：

!!! theorem "引理"
    如果 $A \vdash_k p\ge0$ 且 $A \vdash_{k^{\prime}} p^{\prime}\ge0$，那么 $A \vdash_{\max(k,k^{\prime})} p+p^{\prime}\ge0$。

!!! theorem "事实"
    单变量多项式 $p(x)$ 如果是非负的（即 $\forall x \in \mathbb{R}, p(x) \ge 0$），则它一定是 SOS。即 $\vdash_{\deg(p)} p(x) \ge 0$。

!!! theorem "事实"
    齐次双变量多项式 $p(x,y)$ 如果是非负的，则它一定是 SOS。这是因为可以通过去齐次化转化为单变量情形。

这两个事实是我们将复杂不等式转化为 SOS 证明的关键工具：只要能将问题规约为单变量或齐次双变量的非负性判断，就自动获得了 SOS 证明。

!!! theorem "引理"
    设 $c\ge0$ 为常数，$X$ 为不定元。那么对于任何 $k\in N^{+}$，$X \ge c \vdash_{k} X^k \ge c^k$。

??? proof "证明"
    利用二项式展开：

    $$
    X^{k}-c^{k}=(X-c+c)^{k}-c^{k}=\sum_{i=1}^{k}\binom{k}{i}c^{k-i}(X-c)^{i}
    $$

    当 $i$ 为偶数时，$(X-c)^i$ 是完全平方（SOS）；当 $i$ 为奇数时，$(X-c)^i = (X-c)(X-c)^{i-1}$，其中 $(X-c)^{i-1}$ 是 SOS，且 $(X-c)$ 是给定的非负约束。因此整体可以写成 SOS 形式。

!!! theorem "引理"
    对于任何 $k\in N^{+}$，我们有 $\vdash_{2k} (\frac{X+Y}{2})^{2k}\le\frac{X^{2k}+Y^{2k}}{2}$。

??? proof "证明"
    多项式 $P(X,Y) = \frac{X^{2k}+Y^{2k}}{2} - (\frac{X+Y}{2})^{2k}$ 是一个齐次双变量多项式。根据凸函数 $x \mapsto x^{2k}$ 的性质，该多项式在实数域上非负。根据事实 上文的事实，它是 SOS。

## 3. SOS 中的正向超压缩不等式 { #s3 }

在处理反向超压缩之前，作为热身，我们先给出针对所有偶整数 $q$ 的 (2, $q$)-超压缩不等式 $||T_{\rho}f||_{q}\le||f||_{2}$ 的 SOS 证明。

### 3.1 放宽的矩条件 { #s3-1 }

我们的证明实际上适用于满足特定矩条件（Moment Conditions）的一类广泛的随机变量，而不仅仅是伯努利分布。设 $s \in \mathbb{N}^+$，我们要求随机变量 $x_i$ 满足：

- $\mathbb{E}[x_{i}^{2}]=1$
- $\mathbb{E}[x_{i}^{2j-1}]=0$ （奇数阶矩为 0，即分布对称）
- $\mathbb{E}[x_{i}^{2j}]\le(2s-1)^{j}\frac{\binom{s}{j}}{\binom{2s}{2j}}$ 对于 $1\le j\le s$。

!!! note "注"
    通过转换为阶乘并展开，可以验证：

    $$
    (2s-1)^{j}\frac{\binom{s}{j}}{\binom{2s}{2j}}=(2j-1)!!\cdot\prod_{i=1}^{j-1}\frac{2s-1}{2s-(2i+1)}
    $$

    由此可见，对于每个固定的 $j\in N^{+}$，该量作为 $s$ 的函数（对于 $s\ge j$）递减趋向于极限 $(2j-1)!!$，即标准高斯分布的第 $(2j)$ 阶矩。这表明标准高斯分布和均匀随机 $\pm1$ 比特都满足上述所有矩条件。

!!! theorem "定理"
    设 $x=(x_{1},...,x_{n})$ 是一系列满足 s-矩条件的独立实随机变量。设 $f:\{-1,1\}^{n}\rightarrow\mathbb{R}$，$s\in\mathbb{N}^{+}$，且 $0\le\rho\le\sqrt{1/(2s-1)}$。那么

    $$
    ||T_{\rho}f(x)||_{2s}\le ||f(x)||_{2}
    $$

### 3.2 基础情况：$n=1$ 的证明 { #s3-2 }

??? proof "证明"
    由于算子 $T_\rho$ 和范数具有张量化性质，只需证明 $n=1$ 的情况。由齐次性，假设 $\mathbb{E}[f]=1$。设 $f(x_{1})=1+\epsilon x_{1}$，其中 $\epsilon\in\mathbb{R}$。

    我们需要比较 $||T_{\rho}f||_{2s}^{2s}$ 和 $||f||_{2}^{2s}$。

    首先计算左边：

    $$
    T_{\rho}f(x_1) = 1 + \rho \epsilon x_1
    $$

    利用二项式定理及奇数阶矩为 0 的性质：

    $$
    \begin{aligned}
    ||T_{\rho}f||_{2s}^{2s} &= \mathbb{E}[(1 + \rho \epsilon x_1)^{2s}] \\
    &= \sum_{k=0}^{2s} \binom{2s}{k} (\rho \epsilon)^k \mathbb{E}[x_1^k] \\
    &= \sum_{j=0}^{s} \binom{2s}{2j} \rho^{2j} \epsilon^{2j} \mathbb{E}[x_1^{2j}] \quad (\text{仅保留偶数项})
    \end{aligned}
    $$

    接着计算右边：

    $$
    \begin{aligned}
    ||f||_{2}^{2s} &= (\mathbb{E}[(1+\epsilon x_1)^2])^s = (1 + 2\epsilon \mathbb{E}[x_1] + \epsilon^2 \mathbb{E}[x_1^2])^s \\
    &= (1 + \epsilon^2)^s \quad (\text{因 } \mathbb{E}[x_1]=0, \mathbb{E}[x_1^2]=1) \\
    &= \sum_{j=0}^{s} \binom{s}{j} \epsilon^{2j}
    \end{aligned}
    $$

    现在我们逐项比较 $\epsilon^{2j}$ 的系数。我们需要证明对于每个 $j$：

    $$
    \binom{2s}{2j} \rho^{2j} \mathbb{E}[x_1^{2j}] \le \binom{s}{j}
    $$

    即：

    $$
    \mathbb{E}[x_1^{2j}] \le \frac{\binom{s}{j}}{\binom{2s}{2j}} \rho^{-2j}
    $$

    由于 $\rho \le \frac{1}{\sqrt{2s-1}}$，即 $\rho^{-2} \ge 2s-1$，上述条件等价于：

    $$
    \mathbb{E}[x_1^{2j}] \le (2s-1)^j \frac{\binom{s}{j}}{\binom{2s}{2j}}
    $$

    这正是我们假设的 $s$-矩条件。因此不等式成立。

### 3.3 SOS 证明的构造 { #s3-3 }

为了将上述证明转化为 SOS 证明，我们需要处理 $n>1$ 时的归纳步骤。在标准分析中，这通常依赖于 Minkowski 不等式，但在 SOS 中我们需要一个多项式版本的替代引理。

!!! theorem "引理"
    设 $v$ 为偶正整数，$G_{i}, H_{i}$ 为不定元。那么：

    $$
    \vdash_{2v} \prod_{i=1}^{v}G_{i}H_{i} \le \frac{1}{\binom{v}{v/2}}\sum_{|T|=v/2}\left(\prod_{i\in T}G_{i}^{2}\prod_{i\in[v]\backslash T}H_{i}^{2}\right)
    $$

??? proof "证明"
    首先写出恒等式：

    $$
    \prod_{i\in[v]}G_{i}H_{i}=\frac{1}{\binom{v}{v/2}}\sum_{|T|=v/2}\underbrace{(\prod_{i\in T}G_{i}\prod_{i\in[v]\backslash T}H_{i})}_{A_T} \underbrace{(\prod_{i\in[v]\backslash T}G_{i}\prod_{i\in T}H_{i})}_{B_T}
    $$

    对于每一项，应用基本的 SOS 不等式 $\vdash_2 XY \le \frac{1}{2}(X^2+Y^2)$：

    $$
    A_T B_T \le \frac{1}{2} A_T^2 + \frac{1}{2} B_T^2
    $$

    注意到 $A_T^2$ 和 $B_T^2$ 对应的正是引理右边的项（只是集合 $T$ 和 $[v]\backslash T$ 互换）。由于求和是对所有大小为 $v/2$ 的子集 $T$ 进行的，这种互换是对称的。将所有项加起来即可得证。

!!! theorem "定理"
    在满足 $s$-矩条件的前提下，对于 $n$ 变量函数 $f_i(x)$：

    $$
    \vdash_{2s} \mathbb{E}\left[\prod_{i=1}^{s}(T_{\rho}f_{i}(x))^{2}\right] \le \prod_{i=1}^{s}\mathbb{E}[f_{i}(x)^{2}]
    $$

    这里 $q=2s$，且 $0 \le \rho \le \sqrt{1/(2s-1)}$。对每个 $x=(x_1,\dots,x_n)$，我们记

    $$
    f_i(x)=\sum_{S \subseteq [n]} \hat{f_i}(S) \prod_{j\in S}x_j,T_\rho f_i(x)=\sum_{S \subseteq [n]} \rho^{|S|} \hat{f_i}(S) \prod_{j\in S}x_j
    $$

??? proof "证明思路"
    对变量数 $n$ 进行归纳。

    对于 $n \ge 1$，将函数分解为 $f_i(x) = x_n g_i(x') + h_i(x')$，其中 $x'=(x_1,\dots,x_{n-1})$。于是 $T_\rho f_i(x) = \rho x_n T_\rho g_i + T_\rho h_i$。

    展开左边的期望 $\mathbb{E}[\prod (\rho x_n \tilde{G}_i + \tilde{H}_i)^2]$（其中 $\tilde{G}=T_\rho g$）。利用 $x_n$ 的独立性和矩条件，将 $x_n$ 的高阶矩替换为常数界。

    这会产生混合项 $\tilde{G}$ 和 $\tilde{H}$ 的乘积。利用引理 3.3 将这些混合项解耦为 $\tilde{G}^2$ 和 $\tilde{H}^2$ 的形式。

    最后，利用归纳假设处理 $n-1$ 变量的期望。整个证明的关键在于系数的匹配，这可以通过组合恒等式来保证最终系数恰好为 1，从而使得右边整理为 $\prod (\mathbb{E}[g_i^2] + \mathbb{E}[h_i^2]) = \prod \mathbb{E}[f_i^2]$。

## 4. SOS 中的反向超压缩不等式 { #s4 }

本节我们将攻克本文最核心的技术难点：在 SOS 系统中证明反向超压缩不等式。这是解决 Frankl-Rödl 图问题的关键工具。

### 4.1 主要定理与归纳框架 { #s4-1 }

我们的目标是证明以下关于 $2k$ 次多项式的反向不等式。

!!! theorem "定理"
    设 $k, n \in \mathbb{N}^{+}$，设 $0 \le \rho \le 1 - \frac{1}{2k}$。对于 $\left\{-1,1\right\}^n$ 上的不定元函数 $f(x), g(x)$：

    $$
    \vdash_{4k} \mathbb{E}_{(x,y) \sim \rho\text{-corr}} [f(x)^{2k} g(y)^{2k}] \ge \mathbb{E}[f]^{2k} \mathbb{E}[g]^{2k}
    $$

对于固定的 $k$，我们对维数 $n$ 进行归纳。

1. **归纳步骤 ($n > 1$)**：利用期望的线性性质，将 $n$ 维期望拆解为 $n-1$ 维期望的组合：

    $$
    \mathbb{E}[f(x)^{2k}g(y)^{2k}] = \sum_{x_n, y_n \in \{-1,1\}} Pr(x_n, y_n) \mathbb{E}_{x',y'}[f_{x_n}(x')^{2k} g_{y_n}(y')^{2k}]
    $$

    其中 $f_{x_n}$ 是固定第 $n$ 个比特后的限制函数。利用归纳假设，每一项 $\mathbb{E}_{x',y'}[\dots]$ 都可以被下界 $\mathbb{E}[f_{x_n}]^{2k} \mathbb{E}[g_{y_n}]^{2k}$ 控制。

2. **基础情况 ($n=1$)**：此时问题转化为证明一个关于 4 个实变量的代数不等式。这是证明中最困难的部分。

!!! theorem "定理"
    设 $k \in \mathbb{N}^{+}$ 且 $0 \le \rho \le 1 - \frac{1}{2k}$。设 $F_0, F_1, G_0, G_1$ 为实不定元。那么：

    $$
    \begin{aligned}
    \vdash_{4k} &(\frac{1}{4} + \frac{1}{4}\rho)(F_0^{2k} G_0^{2k} + F_1^{2k} G_1^{2k})\\
    + &(\frac{1}{4} - \frac{1}{4}\rho)(F_0^{2k} G_1^{2k} + F_1^{2k} G_0^{2k}) \\
    \end{aligned}\ge (\frac{F_0 + F_1}{2})^{2k} (\frac{G_0 + G_1}{2})^{2k}
    $$

目标不等式关于 $\rho$ 是线性的。因此，只需证明端点情况 $\rho=0$ 和 $\rho^* = 1 - \frac{1}{2k}$ 成立即可。$\rho=0$ 的情况是平凡的。因此我们只需关注 $\rho = \rho^*$。通过代换 $\mu = (F_0+F_1)/2, \alpha = (F_0-F_1)/2$ ，$\nu = (G_0+G_1)/2, \beta = (G_0-G_1)/2$，我们将定理 4.2 转化为证明以下多项式非负性：

$$
\begin{aligned}
\vdash_{4k} &(\frac{1}{4} + \frac{1}{4}\rho^*)((\mu+\alpha)^{2k}(\nu+\beta)^{2k} + (\mu-\alpha)^{2k}(\nu-\beta)^{2k}) \\
+ &(\frac{1}{4} - \frac{1}{4}\rho^*)((\mu+\alpha)^{2k}(\nu-\beta)^{2k} + (\mu-\alpha)^{2k}(\nu+\beta)^{2k})
\end{aligned}\ge \mu^{2k} \nu^{2k}
$$

再通过齐次性，我们可以令 $\mu=\nu=1$。我们只需要证明以下“两点不等式”在 SOS 系统中成立：

!!! note "注（两点不等式 $P_k(a,b)$）"
    设 $\rho^* = 1 - \frac{1}{2k}$，那么：

    $$
    \begin{aligned}
    \vdash_{4k}P_k(a,b) := & \left(\frac{1}{4}+\frac{1}{4}\rho^*\right) \left[ (1+a)^{2k}(1+b)^{2k} + (1-a)^{2k}(1-b)^{2k} \right] \\
    + & \left(\frac{1}{4}-\frac{1}{4}\rho^*\right) \left[ (1+a)^{2k}(1-b)^{2k} + (1-a)^{2k}(1+b)^{2k} \right] - 1 \ge 0
    \end{aligned}
    $$

### 4.2 关键技术：计算机代数辅助证明 { #s4-2 }

如何证明 $P_k(a,b)$ 是 SOS？直接构造平方和极其困难。我们采用了一种基于变量代换和计算机代数的策略。令：

$$
r = a - b, \quad s = a + b, \quad t = ab
$$

利用恒等式 $\frac{1}{2}((c+d)^{2k} + (c-d)^{2k}) = \sum \binom{2k}{2i} c^{2k-2i} d^{2i}$，并将 $r^2$ 替换为 $s^2 - 4t$，我们可以将 $P_k(a,b)$ 重写为关于 $s^2$ 的多项式：

$$
P_{k}(a,b) = -1 + \sum_{i=0}^{k}\left(
\begin{aligned}
&(\frac{1}{2}+\frac{1}{2}\rho^{*})\binom{2k}{2i}(1+t)^{2k-2i}+\\
&(\frac{1}{2}-\frac{1}{2}\rho^{*})\sum_{j=i}^k\binom{2k}{2j}(1-t)^{2k-2j}\binom{j}{i}(-4t)^{j-i}
\end{aligned}\right)s^{2i}
$$

$$
= Q_{k,0}(t) + Q_{k,1}(t)s^2 + Q_{k,2}(t)s^4 + \dots + Q_{k,k}(t)s^{2k}
$$

其中 $Q_{k,i}(t)$ 是仅依赖于 $t$ 的单变量多项式。

如果我们能证明对于所有的 $i$，系数多项式 $Q_{k,i}(t)$ 在实数域上非负，那么根据事实 上文的事实，每个 $Q_{k,i}(t)$ 都是 SOS。由于 $s^{2i}$ 显然也是 SOS，那么 $P_k(a,b)$ 作为 SOS 的线性组合，必然也是 SOS。

!!! theorem "命题"
    对于每个 $k \in \mathbb{N}^+$（且 $\rho^* = 1 - \frac{1}{2k}$），多项式 $Q_{k,0}(t)$ 是非负的。

这是最复杂的一项。我们利用 **Zeilberger 算法** 来寻找 $Q_{k,0}(t)$ 的结构。 重写 $Q_{k,0}(t)$ 得到：

$$
Q_{k,0}(t) = -1 + (1+t)^{2k} \left( 1 - \frac{1}{4k} + \frac{1}{4k} \sum_{j=0}^{k} \binom{2k}{2j} \frac{(1-t)^{2k-2j}}{(1+t)^{2k}} (-4t)^j \right)
$$

我们将括号中的求和部分记为 $S_k(t)$，计算机算法发现 $Q_{k,0}(t)$ 包含的部分和满足一个二阶线性递推关系：

$$
(t+1)^{2}S_{k+2}(t)-2(t^{2}-6t+1)S_{k+1}(t)+(t+1)^{2}S_{k}(t)=0
$$

解该递推关系得到闭式解：

$$
Q_{k,0}(t) = -1 + (1+t)^{2k} \left( 1 - \frac{1}{4k} + \frac{1}{4k} \cos\left(4k \arctan(\sqrt{t})\right) \right)
$$

利用 $(1+t)^{2k} \ge 1+2kt$，我们只需证明：

$$
-1 + (1+2kt) \left( 1 - \frac{1}{4k} + \frac{1}{4k} \cos(4k \arctan(\sqrt{t})) \right)\ge 0
$$

我们分情况讨论：

- $t\ge \frac{1}{2k(2k-1)}$：利用 $\cos(\cdot) \ge -1$ 即可证明。

- $t< \frac{1}{2k(2k-1)}$：我们使用 Taylor 展开估计余弦函数：

    $$
    \cos(x) \ge 1 - \frac{x^2}{2} + \frac{x^4}{24} - \frac{x^6}{720}
    $$

    将 $x =4k\sqrt{t}\in \left( 4k \arctan(\sqrt{t}),\pi\right)$ 代入并展开，我们得到一个关于 $t$ 的二次多项式 $q(t)$。通过验证该二次多项式的判别式及端点值，我们严格证明了在该微小区间内 $Q_{k,0}(t) \ge 0$。

!!! theorem "命题"
    对于所有 $1 \le i \le k \in \mathbb{N}^+$，多项式 $Q_{k,i}(t)$ 是非负的（其中 $\rho^* = 1 - \frac{1}{2k}$）。

??? proof "证明"
    事实上，我们将证明一个更强的结论：即使当 $\rho^*$ 设为 0 时，每个 $Q_{k,i}(t)$ 也是非负的。即，我们将证明：

    $$
    \tilde{Q}_{k,i}(t) := \frac{1}{2}\binom{2k}{2i}(1+t)^{2k-2i} + \frac{1}{2}\sum_{j=i}^{k} \binom{2k}{2j}(1-t)^{2k-2j} \binom{j}{i}(-4t)^{j-i}
    $$

    是非负的。之所以说这是更强的结论，是因为 $Q_{k,i}(t)$ 和 $\tilde{Q}_{k,i}(t)$ 是相同两个主要量的凸组合 ，但 $\tilde{Q}_{k,i}(t)$ 在显然非负的第一项 $\binom{2k}{2i}(1+t)^{2k-2i}$ 上的“权重”更小（系数为 $1/2$，而 $Q_{k,i}(t)$ 中该项系数为 $\frac{1}{2}+\frac{1}{2}\rho^* > 1/2$） 。

    手工证明这一点并不容易，但利用计算机辅助可以得到一个紧凑的证明 。可以验证以下递推关系对所有整数 $0 \le i \le k$ 成立：

    $$
    (1+i)(1+k)\tilde{Q}_{k+2,i+1}(t) = (1+i)(2+k)(1+t)^2 \tilde{Q}_{k+1,i+1}(t) + (2+k)(2+2k-i)\tilde{Q}_{k+1,i}(t)
    $$

    这是通过猜测多项式递推的形式并通过计算机求解得到的。鉴于此，我们只需证明 $k=i$ 和 $i=0$ 两种情况下的 $\tilde{Q}_{k,i}(t) \ge 0$；一般 $k$ 和 $i$ 的非负性则由归纳法得出。

    对于 $k=i$，我们有 $\tilde{Q}_{k,k}(t) = 1 \ge 0$。

    对于 $i=0$，非负性的证明与命题 4.3 类似，但更简单 。

    对于 $t < 0$，由定义显然可知 $\tilde{Q}_{k,0}(t)$ 是非负的（因为各项均为正或平方项）。

    对于 $t \ge 0$，命题 4.3 的证明过程给出了：

    $$
    \tilde{Q}_{k,0}(t) = \frac{1}{2}(1+t)^{2k} \left( 1 + \cos(4k \arctan(\sqrt{t})) \right) \ge 0
    $$

    上式显然成立。

## 5. SOS 中的 Frankl-Rödl 定理 { #s5 }

本节展示我们工作在 3-染色和顶点覆盖问题上的应用。具体而言，我们给出了 Frankl-Rödl 定理的一个低阶 SOS 证明，即证明 $Max-IS(FR_{\gamma}^{n}) < o(1)$。

### 5.1 Frankl-Rödl 定理 { #s5-1 }

我们首先陈述关于 Frankl-Rödl 图独立集大小的主要 SOS 结论。

!!! theorem "定理"
    设 $n \in \mathbb{N}^{+}$ 且 $\frac{1}{\log n} \le \gamma \le \frac{1}{4}$，使得 $(1-\gamma)n$ 为偶整数。给定 Frankl-Rödl 图 $FR_{\gamma}^{n}=(V,E)$，对于每个 $x \in V=\{-1,1\}^{n}$，设 $f(x)$ 为一个不定元。那么，存在一个度数为 $4\lceil\frac{1}{4\gamma}\rceil$ 的 SOS 反驳，针对表达“$Max-IS(G) \ge O(n^{-\gamma/10})$”的系统；即系统：

    $$
    \left\{
    \begin{aligned}
    &f(x)^2 = f(x) \quad \forall x \in V, \\
    &f(x)f(y) = 0 \quad \forall (x,y) \in E, \\
    &\frac{1}{|V|}\sum_{x \in V}f(x) \ge C n^{-\gamma/10}
    \end{aligned}
    \right\} \vdash_{4\lceil\frac{1}{4\gamma}\rceil} -1 \ge 0
    $$

    其中 $C$ 是常数。

该定理表明，$N^{O(1/\gamma)}$ 时间复杂度的 SOS/Lasserre 层级算法能够证明 $Max-IS(FR_{\gamma}^{n}) \le O(n^{-\gamma/10})$。特别地，对于 $\gamma=1/4$，4 阶 SOS 算法即可证明 $\chi(FR_{1/4}^{n}) = \omega(1)$。这比 Charikar 之前针对 SDP 的结果要强。

!!! theorem "定理"
    固定 $0 < \gamma < 1/2$ 和 $0 < \alpha \le 1$。在图 $FR_{\gamma}^{n}$ 中，如果 $S \subseteq V$ 满足 $|S|/2^n \ge \alpha$，那么：

    $$
    Pr_{(x,y) \sim E} [x \in S, y \in S] \ge 2(\alpha/2)^{1/\gamma} - o_n(1)
    $$

这表明任何大小为 $\alpha 2^n$ 的顶点集 $S$ 都包含至少 $2(\alpha/2)^{1/\gamma} - o_n(1)$ 的边比例。因此，独立集的大小至多为 $O(n^{-\gamma/10})$。

### 5.2 定义 { #s5-2 }

为了将图的组合性质转化为分析性质，我们需要引入平滑算子。

!!! definition "定义"
    对于整数 $0 \le d \le n$，算子 $S_d$ 作用于函数 $f:\{-1,1\}^{n}\rightarrow\mathbb{R}$ 上，定义为 $S_d f(x) = \mathbb{E}_y [f(y)]$，其中 $y$ 是在满足 $\Delta(x,y)=d$ 的条件下均匀随机选取的。

直观上，$S_d$ 算子应该表现得像噪声算子 $T_{\rho}$（其中 $\rho = 1 - 2d/n$）。然而，这里存在一个“奇偶性”问题：如果 $d$ 是奇数，则 $S_d$ 映射到的 $y$ 与 $x$ 奇偶性相反；如果 $d$ 是偶数，则相同。而噪声算子 $T_{\rho}$ 是混合的，不区分奇偶。为了解决这个问题，我们需要定义一个混合算子：

!!! definition "定义"
    对于整数 $0 \le d < n$，定义算子 $S'_d = \frac{1}{2}S_d + \frac{1}{2}S_{d+1}$。

下面的定理展示了 $S'_d$ 与 $T_{\rho}$ 的近似关系，这是连接图论属性与超压缩不等式的桥梁：

!!! theorem "定理"
    设 $f:\{-1,1\}^{n}\rightarrow\mathbb{R}$。设 $d = n - c$ 对于某个整数 $c^2\sqrt{n} \le c \le n/2$。令 $\rho = 1 - 2d/n$。那么：

    $$
    \langle f, S'_d f \rangle - \langle f, T_\rho f \rangle = \sum_{U \subseteq [n]} \hat{f}(U)^2 \cdot \delta(U)
    $$

    其中误差项 $\delta(U)$ 满足 $\|\delta(U)\|_\infty \le O(\max\{n^{-1/5}, \frac{n}{c^2} \log^2(\frac{c^2}{n})\})$。

### 5.3 定理 5.1 的证明 { #s5-3 }

??? proof "证明"
    记 $d = (1-\gamma)n$，并记 $\rho' = 1 - 2d/n = -(1-2\gamma)$。我们将函数 $f$ 根据汉明权重的奇偶性分解为 $f_0$ 和 $f_1$：

    $$
    f_i(x) = \begin{cases} f(x) & \text{若 } x \text{ 的汉明权重模 2 等于 } i \\ 0 & \text{否则} \end{cases}
    $$

    由于我们假设 $d=(1-\gamma)n$ 为偶数，如果 $x$ 和 $y$ 的汉明权重奇偶性相同，则它们的距离只能是 $d$（偶数）而不能是 $d+1$（奇数）。

    由图的独立集约束 $\{f(x)f(y)=0, \forall \Delta(x,y)=d\}$，我们有：

    $$
    \vdash_2 \langle f_0, S'_d f_0 \rangle + \langle f_1, S'_d f_1 \rangle = 0
    $$

    这是因为 $S'_d$ 包含 $S_d$ 和 $S_{d+1}$ 两部分。对于 $\langle f_i, S_d f_i \rangle$，由于 $f(x)f(y)=0$ (当距离为 $d$)，该项为 0。对于 $\langle f_i, S_{d+1} f_i \rangle$，由于 $S_{d+1}$ 连接不同奇偶性的点，而 $f_i$ 仅在特定奇偶性上非零，该内积本身恒为 0。

    接下来利用定理 5.5，我们可以将 $S'_d$ 替换为噪声算子 $T_{\rho'}$：

    $$
    \vdash_2 \langle f_0, T_{\rho'} f_0 \rangle + \langle f_1, T_{\rho'} f_1 \rangle \le \delta \sum_U \hat{f}_0(U)^2 + \delta \sum_U \hat{f}_1(U)^2 = \delta \mathbb{E}[f^2]
    $$

    其中误差项 $\delta$ 是 $n$ 的负次幂，趋近于 0。

    为了使用反向超压缩不等式，我们需要正相关的噪声算子。定义 $g_i(x) = f_i(-x)$，并令 $\rho = -\rho' = 1 - 2\gamma$。此时有 $\langle f_i, T_{\rho'} f_i \rangle = \langle f_i, T_\rho g_i \rangle = \mathbb{E}_{(x,y) \sim \rho\text{-corr}}[f_i(x)g_i(y)]$。于是我们得到：

    $$
    \mathbb{E}[f_0(x)g_0(y)] + \mathbb{E}[f_1(x)g_1(y)] \le \delta \mathbb{E}[f^2] \quad
    $$

    现在我们将度数提升到 $2k$，其中 $k = \lceil \frac{1}{4\gamma} \rceil \ge 1$。利用布尔约束 $f(x)^2=f(x)$，我们有 $\vdash_{2k} f(x)^{2k} = f(x)$。因此上述不等式可以写为：

    $$
    \mathbb{E}[f_0(x)^{2k}g_0(y)^{2k}] + \mathbb{E}[f_1(x)^{2k}g_1(y)^{2k}] \le \delta \mathbb{E}[f] \quad
    $$

    注意到 $\rho = 1 - 2\gamma \le 1 - \frac{1}{2k}$，这满足了反向超压缩定理 4.1 的条件。应用定理 4.1，我们得到：

    $$
    \mathbb{E}[f_0]^{2k}\mathbb{E}[g_0]^{2k} + \mathbb{E}[f_1]^{2k}\mathbb{E}[g_1]^{2k} \le \mathbb{E}[f_0(x)^{2k}g_0(y)^{2k}] + \mathbb{E}[f_1(x)^{2k}g_1(y)^{2k}] \le \delta \mathbb{E}[f] \quad
    $$

    对于 $i=0,1$，形式上有 $\mathbb{E}[f_i] = \mathbb{E}[g_i]$。利用引理 2.6 的凸性：

    $$
    \mathbb{E}[f_0]^{4k} + \mathbb{E}[f_1]^{4k} \ge 2 \left( \frac{\mathbb{E}[f_0] + \mathbb{E}[f_1]}{2} \right)^{4k} = 2 (\mathbb{E}[f]/2)^{4k} \quad
    $$

    因此推导出：

    $$
    2^{4k-1}\delta \ge \mathbb{E}[f]^{4k} \quad
    $$

    最后，结合假设 $\frac{1}{|V|}\sum f(x) \ge C n^{-\gamma/10}$。利用引理 2.5：

    $$
    \mathbb{E}[f] \ge C n^{-\gamma/10} \vdash_{4k} \mathbb{E}[f]^{4k} \ge C^{4k} n^{-4k\gamma/10} \ge C^{4k} n^{-1/5} \quad
    $$

    只要常数 $C$ 足够大，使得 $C^{4k} n^{-1/5} > 2^{4k-1} \delta$，我们就得到了矛盾。

## 6. 结论 { #s6 }

- 关于反向超压缩性：我们可能还没有给出 SOS 两点不等式的Book proof。是否有一种计算机代数技术，能够符号化地、自动地证明所有 $k$ 的 SOS 性质。
- 关于 Frankl-Rödl 定理：Benabbas-Hatami-Magen 的证明是否可以改进以适用于更小的 $\gamma$，例如 $\sqrt{\frac{\log n}{n}}$？
- 一个有趣的问题：超立方体的顶点等周不等式意味着：如果 $A, B \subseteq \{-1,1\}^n$ 且 $dist(A,B) \ge \sqrt{n \log n}$，那么 $|A||B|/4^n$ 必须非常小。这个事实是否有 $O(1)$ 度数的 SOS 证明？

---

## PDF 原文 { #pdf }

### 报告 PDF { #pdf-report }

[打开原文件](../../../assets/sos-hypercon-tex.pdf){ .md-button target="_blank" rel="noopener" }
[下载 PDF](../../../assets/sos-hypercon-tex.pdf){ .md-button download="sos-hypercon-tex.pdf" }

若下方预览无法显示，可直接打开原文件或下载后阅读。

<div style="height: 800px; width: 100%;">
    <embed src="../../../assets/sos-hypercon-tex.pdf" type="application/pdf" width="100%" height="100%">
</div>

### 幻灯片 PDF { #pdf-slides }

[打开原文件](../../../assets/sos-hypercon.pdf){ .md-button target="_blank" rel="noopener" }
[下载 PDF](../../../assets/sos-hypercon.pdf){ .md-button download="sos-hypercon.pdf" }

若下方预览无法显示，可直接打开原文件或下载后阅读。

<div style="height: 800px; width: 100%;">
    <embed src="../../../assets/sos-hypercon.pdf" type="application/pdf" width="100%" height="100%">
</div>
