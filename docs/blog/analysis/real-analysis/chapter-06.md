---
title: 第六章：外测度、预测度和积测度
date: 2025-11-19
updated: 2026-10-15
description: 实分析笔记第六章：外测度与 Caratheodory 扩张定理、预测度、积测度。
hide:
  - navigation
categories:
  - 分析
tags:
  - analysis
---

# 第六章：外测度、预测度和积测度 { #top }

## 1. 外测度与 Caratheodory 扩张定理 { #s1 }

!!! definition "定义（抽象外测度）"
    令 $X$ 为集合，**抽象外测度(abstract outer measure)**为映射 $\mu^*:2^X\rightarrow [0,+\infty]$  满足：

    - $\mu^*(\emptyset)=0$

    - 若 $E\subset F$，则 $\mu^*(E)\le \mu^*(F)$

    - 若 $E_1,E_2,\cdots\subset X$，则

        $$
        \mu^*(\bigcup_{n=1}^\infty E_n )\le \sum_{n=1}^\infty \mu^*(E_n)
        $$

!!! definition "定义（Caratheodory 可测）"
    设 $\mu^*$ 为 $X$ 的外测度，$E\subset X$ 称作 **Caratheodory 可测的**，若对任意 $A\subset X$ 有

    $$
    \mu^*(A)=\mu^*(A\cap E)+\mu^*(A\setminus E)
    $$

!!! theorem "定理（Caratheodory 扩张定理）"
    令 $\mu^*:2^X\rightarrow [0,+\infty]$ 为 $X$ 的外测度，$\mathcal{B}$ 为 $X$ 的所有 Caratheodory 可测集，令 $\mu:\mathcal{B}\rightarrow [0,+\infty]$ 为 $\mu$ 在 $\mathcal{B}$ 上的限制。则 $\mathbb{B}$ 是 $\sigma-$代数，$\mu$ 是测度。

## 2. 预测度 { #s2 }

!!! definition "定义"
    Boolean 代数 $\mathcal{B}_0$ 的**预测度(pre-measure)** 为有限可加测度 $\mu_0:\mathcal{B}_0\rightarrow [0,+\infty]$ 满足 $\mu_0(\bigcup_{n=1}^\infty E_n)=\sum_{n=1}^\infty \mu_0(E_n)$ 对任意不交的集合 $E_1,E_2,\cdots \mathcal{B}_0$ 且 $\bigcup_{n=1}^\infty \in \mathcal{B}_0$ 成立。

!!! theorem "命题"
    - 上述定义中的有限可加可改成 $\mu(\emptyset)=0$。
    - 上述定义中的 $\mu_0(\bigcup_{n=1}^\infty E_n)=\sum_{n=1}^\infty \mu_0(E_n)$ 可改成 $\mu_0(\bigcup_{n=1}^\infty E_n)\le\sum_{n=1}^\infty \mu_0(E_n)$
    - 这两者不能同时更改。

!!! theorem "定理（Hahn-Kolmogorov 扩张）"
    任意 Boolean 代数 $\mathcal{B}_0$ 上的预测度 $\mu_0:\mathcal{B}_0\rightarrow [0,+\infty]$ 可扩张为可数可加测度 $\mu:\mathcal{B}\rightarrow [0,+\infty]$

**注：**若加上 $\mu_0$ 是 $\sigma-$有限的条件，则该扩张唯一。

!!! theorem "命题"
    设预测度 $\mu_0:\mathcal{B}_0\rightarrow [0,+\infty]$ $\sigma-$有限(即 $X$ 是 $\mathcal{B}_0$ 中可数个测度有限集合的并)，令 $\mu:\mathcal{B}\rightarrow [0,+\infty]$ 为其 Hahn-Kolmogorov 扩张。

    - 若 $E\in \mathcal{B}$，则存在 $E\subset F\in \left<\mathcal{B}_0\right>$ 满足 $\mu(F\setminus E)=0$。
    - 若 $E\in \mathcal{B}$ 测度有限，对任意 $\varepsilon>0$ 存在 $F\in \mathcal{B}_0$ 满足 $\mu(E\bigtriangleup F)\le \varepsilon$。
    - 反过来，若 $E$ 满足对任意 $\varepsilon>0$ 存在 $F\in \mathcal{B}_0$ 满足 $\mu(E\bigtriangleup F)\le \varepsilon$，则 $E\in \mathcal{B}$。

## 3. 积测度 { #s3 }

!!! definition "定义"
    设 $(X,\mathcal{B}_X),(Y,\mathcal{B}_Y)$ 是可测空间，考虑投影 $\pi_X:X\times Y\rightarrow X$ 与 $\pi_Y:X\times Y\rightarrow Y$，定义拉回

    $$
    \pi_X^*(\mathcal{B}_X):=\left\{\pi_X^{-1}(E)\Big| E\in \mathcal{B}_X\right\}=\left\{E\times Y\Big| E\in \mathcal{B}_X\right\}
    $$

    $$
    \pi_Y^*(\mathcal{B}_Y):=\left\{\pi_Y^{-1}(F)\Big| F\in \mathcal{B}_Y\right\}=\left\{X\times F\Big| F\in \mathcal{B}_Y\right\}
    $$

    于是我们可以定义 $X\times Y$ 上的**$\sigma-$积代数（product $\sigma-$algebra** $\mathcal{B}_X\times \mathcal{B}_Y$ ：

    $$
    \mathcal{B}_X\times \mathcal{B}_Y:=\left<\pi^*_X(\mathcal{B}_X)\cup \pi^*_Y(\mathcal{B}_Y)\right>
    $$

!!! theorem "命题"
    设 $(X, \mathcal{B}_X)$ 和 $(Y, \mathcal{B}_Y)$ 为可测空间。

    - $\mathcal{B}_X \times \mathcal{B}_Y$ 是由集合 $E \times F$（其中 $E \in \mathcal{B}_X$, $F \in \mathcal{B}_Y$）生成的 $\sigma$-代数。换言之，$\mathcal{B}_X \times \mathcal{B}_Y$ 是 $X \times Y$ 上最粗糙的 $\sigma$-代数，使得 $\mathcal{B}_X$-可测集与 $\mathcal{B}_Y$-可测集的笛卡尔积始终是 $\mathcal{B}_X \times \mathcal{B}_Y$-可测的。
    - $\mathcal{B}_X \times \mathcal{B}_Y$ 是 $X \times Y$ 上最粗糙的 $\sigma$-代数，使得投影映射 $\pi_X, \pi_Y$ 均为可测态射。
    - 若 $E \in \mathcal{B}_X \times \mathcal{B}_Y$，则对每个 $x \in X$，集合 $E_x := \{y \in Y : (x, y) \in E\}$ 属于 $\mathcal{B}_Y$；类似地，对每个 $y \in Y$，集合 $E^y := \{x \in X : (x, y) \in E\}$ 属于 $\mathcal{B}_X$。
    - 若 $f : X \times Y \rightarrow [0, +\infty]$ 是可测的，则对每个 $x \in X$，函数 $f_x : y \mapsto f(x, y)$ 是 $\mathcal{B}_Y$-可测的；类似地，对每个 $y \in Y$，函数 $f^y : x \mapsto f(x, y)$ 是 $\mathcal{B}_X$-可测的。
    - 若 $E \in \mathcal{B}_X \times \mathcal{B}_Y$，则切片 $E_x := \{y \in Y : (x, y) \in E\}$ 属于一个可数生成的 $\sigma$-代数。即存在至多可数的集合族 $\mathcal{A} = \mathcal{A}_E$（可依赖于 $E$），使得 $\{E_x : x \in X\} \subset \langle \mathcal{A} \rangle$。特别地，不同切片 $E_x$ 的数量至多为连续统的基数 $c$。

!!! theorem "命题"
    - 两个平凡 $\sigma$-代数（分别定义在空间 $X, Y$ 上）的乘积仍是平凡的。
    - 两个原子 $\sigma$-代数的乘积仍是原子的。
    - 两个有限 $\sigma$-代数的乘积仍是有限的。
    - 两个 Borel $\sigma$-代数(分别定义在欧氏空间 $\mathbb{R}^d, \mathbb{R}^{d'}$ 上，$d, d' \geq 1$)的乘积仍是 Borel $\sigma$-代数（定义在 $\mathbb{R}^d \times \mathbb{R}^{d'} \equiv \mathbb{R}^{d+d'}$ 上）。
    - 两个 Lebesgue $\sigma$-代数(分别定义在欧氏空间 $\mathbb{R}^d, \mathbb{R}^{d'}$ 上，$d, d' \geq 1$)的乘积不是 Lebesgue $\sigma$-代数。
    - $\mathbb{R}^{d+d'}$ 上的 Lebesgue $\sigma$-代数是 $\mathbb{R}^d$ 与 $\mathbb{R}^{d'}$ 的 Lebesgue $\sigma$-代数乘积关于 $d+d'$ 维 Lebesgue 测度的完备化。
    - 举例说明两个离散 $\sigma$-代数的乘积不一定是离散的。
    - 若至少有一个域 $X$ 或 $Y$ 是至多可数无限的，则两个离散 $\sigma$-代数 $2^X, 2^Y$ 的乘积仍是离散 $\sigma$-代数。

!!! definition "定义"
    称测度空间 $(X,\mathcal{B},\mu)$ 是 $\sigma-$有限的，若 $X$ 可以写成 $\mathcal{B}$ 中可数个有限测度集合的并。

!!! theorem "命题"
    令 $(X,\mathcal{B}_X,\mu_X),(Y,\mathcal{B}_Y,\mu_Y)$ 为 $\sigma-$有限测度空间，则 $\mathcal{B}_X\times \mathcal{B}_Y$ 上存在唯一的测度 $\mu_X\times \mu_Y$ 满足对任意 $E\in \mathcal{B}_X,F\in \mathcal{B}_Y$，有

    $$
    \mu_X\times \mu_Y(E\times F)=\mu_X(E)\mu_Y(F)
    $$

!!! theorem "命题"
    设 $(X,\mathcal{B}_X),(Y,\mathcal{B}_Y)$ 是可测空间。

    - $(X,\mathcal{B}_X),(Y,\mathcal{B}_Y)$ 上的 Dirac 测度的积是 $(X\times Y,\mathcal{B}_X\times \mathcal{B}_Y)$ 上的 Dirac 测度。
    - 若 $X,Y$ 是至多可数的，$(X,\mathcal{B}_X),(Y,\mathcal{B}_Y)$ 上的计数测度的积是 $(X\times Y,\mathcal{B}_X\times \mathcal{B}_Y)$ 上的计数测度。

!!! theorem "命题"
    设 $(X,\mathcal{B}_X,\mu_X),(Y,\mathcal{B}_Y,\mu_Y),(Z,\mathcal{B}_Z,\mu_Z)$ 是 $\sigma-$有限可测空间，则

    $$
    (\mathcal{B}_X\times \mathcal{B}_Y)\times \mathcal{B}_Z=\mathcal{B}_X\times (\mathcal{B}_Y\times \mathcal{B}_Z),(\mu_X\times \mu_Y)\times \mu_Z=\mu_X\times (\mu_Y\times \mu_Z)
    $$

!!! definition "定义"
    定义 $X$ 的**单调类(monotone class)** 为子集族 $\mathcal{B}$ 满足：

    - 若 $E_1\subset E_2\subset \cdots$ 为 $\mathcal{B}$ 的可数单增集合列，则 $\bigcup_{n=1}^\infty E_n\in \mathcal{B}$。
    - 若 $E_1\supset E_2\supset \cdots$ 为 $\mathcal{B}$ 的可数单减集合列，则 $\bigcap_{n=1}^\infty E_n\in \mathcal{B}$。

!!! theorem "引理"
    令 $\mathcal{A}$ 为 $X$ 上的 Boolean 代数，则 $\left<\mathcal{A}\right>$ 是包含 $A$ 的最小单调类。

!!! theorem "定理（Tonelli 定理(不完备版本)）"
    设 $(X,\mathcal{B}_X,\mu_X),(Y,\mathcal{B}_Y,\mu_Y)$ 为 $\sigma-$有限测度空间，$f:X\times Y\rightarrow [0,+\infty]$ 可测，则：

    - $x\mapsto \int_Y f(x,y)\mathrm{d} \mu_Y(y),y\mapsto \int_X f(x,y)\mathrm{d} \mu_X(x)$ 是可测的。

    - 我们有

        $$
        \begin{aligned}
        \int_{X\times Y} f(x,y)\mathrm{d} \mu_X\times \mu_Y (x,y)
        &=\int_X(\int_Y f(x,y)\mathrm{d} \mu_Y(y))\mathrm{d} \mu_X(x)\\
        &=\int_Y(\int_X f(x,y)\mathrm{d} \mu_X(x))\mathrm{d} \mu_Y(y)\\
        \end{aligned}
        $$

!!! theorem "推论"
    设 $(X,\mathcal{B}_X,\mu_X),(Y,\mathcal{B}_Y,\mu_Y)$ 为 $\sigma-$有限测度空间，$E\in \mathcal{B}_X\times \mathcal{B}_Y$ 为 $\mu_X\times \mu_Y-$零测集，则几乎所有 $x\in X$，$E_x:=\left\{y\in Y\Big| (x,y)\in E\right\}$ 是 $\mu_Y-$零测集，几乎所有 $y\in Y$，$E_y:=\left\{x\in X\Big| (x,y)\in E\right\}$ 是 $\mu_X-$零测集。

由该推论，我们可以将 Tonelli 定理推广为其完备 $(X\times Y,\overline{\mathcal{B}_X\times \mathcal{B}_Y},\overline{\mu_X\times \mu_Y})$。

!!! theorem "定理（Tonelli 定理(完备版本)）"
    设 $(X,\mathcal{B}_X,\mu_X),(Y,\mathcal{B}_Y,\mu_Y)$ 为 完备 $\sigma-$有限测度空间，$f:X\times Y\rightarrow [0,+\infty]$ 可测，则

    - 几乎所有 $x\in X$，$y\mapsto f(x,y)$ $\mathcal{B}_Y-$可测，特别的 $\int_Yf(x,y)\mathrm{d} \mu_Y(y)$ 存在。进一步，我们有几乎所有 $x\in X$，$x\mapsto \int_Yf(x,y)\mathrm{d} \mu_Y(y)$ $\mathcal{B}_X-$可测。

    - 几乎所有 $y\in Y$，$x\mapsto f(x,y)$ $\mathcal{B}_X-$可测，特别的 $\int_Xf(x,y)\mathrm{d} \mu_X(x)$ 存在。进一步，我们有几乎所有 $y\in Y$，$y\mapsto \int_Xf(x,y)\mathrm{d} \mu_X(x)$ $\mathcal{B}_Y-$可测。

    - 我们有

        $$
        \begin{aligned}
        \int_{X\times Y} f(x,y)\mathrm{d} \overline{\mu_X\times \mu_Y} (x,y)
        &=\int_X(\int_Y f(x,y)\mathrm{d} \mu_Y(y))\mathrm{d} \mu_X(x)\\
        &=\int_Y(\int_X f(x,y)\mathrm{d} \mu_X(x))\mathrm{d} \mu_Y(y)\\
        \end{aligned}
        $$

!!! theorem "推论（Fubini-Tonelli 定理）"
    设 $(X,\mathcal{B}_X,\mu_X),(Y,\mathcal{B}_Y,\mu_Y)$ 为 完备 $\sigma-$有限测度空间，$f:X\times Y\rightarrow [0,+\infty]$ 可测，若

    $$
    \int_X(\int_Y\left|f(x,y)\right|\mathrm{d}\mu_Y(y))\mathrm{d} \mu_X(x)<\infty
    $$

    则 $f$ 在 $\overline{\mathcal{B}_X\times \mathcal{B}_Y}$ 上绝对可积，特别的，Fubini 定理成立。

    题设条件中换成 $\int_Y(\int_X\left|f(x,y)\right|\mathrm{d}\mu_X(X))\mathrm{d} \mu_Y(y)$ 结论同样成立。

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/real-analysis.pdf){ .md-button download="real-analysis.pdf" }
