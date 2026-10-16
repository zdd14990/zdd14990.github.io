---
title: 第四章：抽象测度空间
date: 2025-11-19
updated: 2026-10-15
description: 实分析笔记第四章：Boolean 代数、sigma-代数和可测空间、可数可加测度和测度空间、测度空间上的可测函数与积分、收敛定理。
hide:
  - navigation
categories:
  - 分析
tags:
  - measure-theory
---

# 第四章：抽象测度空间 { #top }

至此，我们对测度的讨论都在 ${\mathbb{R}^d}$ 上，下面我们考虑更一般的空间 $X$ 上的测度。

## 1. Boolean 代数 { #s1 }

!!! definition "定义"
    设 $X$ 为任意集合。$X$ 上的**Boolean 代数** 为 $X$ 的子集族 $\mathcal{B}$ 满足：

    - $\emptyset\in \mathcal{B}$。
    - 若 $E\in \mathcal{B}$，则 $E^c:=X\setminus E\in\mathcal{B}$。
    - 若 $E,F\in \mathcal{B}$，则 $E\cup F\in \mathcal{B}$。

!!! example "例（Atomic algebra）"
    将空间 $X$ 分成不交的集合 $\bigcup_{\alpha\in I} A_\alpha$，这里 $A_\alpha$ 称作 **原子(atom)**。这些集合生成 Boolean 代数 $\mathcal{A}:=\left\{\bigcup_{\alpha\in J} A_\alpha\Big| J\subset I\right\}$，称作**原子代数**。

!!! theorem "命题"
    设 $(\mathcal{B}_\alpha)_{\alpha\in I}$ 为 $X$ 的一族 Boolean 代数，则 $\land_{\alpha\in I} \mathcal{B}_\alpha:=\bigcap_{\alpha\in I} \mathcal{B}_\alpha$ 也为 Boolean 代数。

!!! definition "定义"
    令 $\mathcal{F}$  为 $X$ 的子集族，定义 $\left<\mathcal{F}\right>_{\text{bool}}$ 为所有包含 $\mathcal{F}$ 的 Boolean 代数的交。称之为 $\mathcal{F}$ 生成的 Boolean 代数。

## 2. $\sigma-$代数和可测空间 { #s2 }

!!! definition "定义（$\sigma-$代数）"
    设 $X$ 为任意集合。$X$ 上的 **$\sigma-$代数** 为 $X$ 的子集族 $\mathcal{B}$ 满足：

    - $\emptyset\in \mathcal{B}$。
    - 若 $E\in \mathcal{B}$，则 $E^c:=X\setminus E\in\mathcal{B}$。
    - 若 $E_1,E_2,\cdots\in \mathcal{B}$，则 $\bigcup_{n=1}^\infty E_n\in \mathcal{B}$。

!!! theorem "命题"
    设 $(\mathcal{B}_\alpha)_{\alpha\in I}$ 为 $X$ 的一族 $\sigma-$代数，则 $\land_{\alpha\in I} \mathcal{B}_\alpha:=\bigcap_{\alpha\in I} \mathcal{B}_\alpha$ 也为 $\sigma-$代数。

!!! definition "定义"
    令 $\mathcal{F}$  为 $X$ 的子集族，定义 $\left<\mathcal{F}\right>$ 为所有包含 $\mathcal{F}$ 的 $\sigma-$代数的交。称之为 $\mathcal{F}$ 生成的 $\sigma-$代数。

!!! definition "定义"
    令 $X$ 为度量空间，由 $X$ 中所有开集生成的 $\sigma-$代数称为 $X$ 的 **Borel $\sigma$-代数**，记作 $\mathcal{B}[X]$，其中的元素称为 **Borel 可测的**。

!!! theorem "命题"
    $\mathcal{B}[{\mathbb{R}^d}]$ 是由下任意一者生成的 $\sigma-$代数：

    - ${\mathbb{R}^d}$ 中的开集；
    - ${\mathbb{R}^d}$ 中的闭集；
    - ${\mathbb{R}^d}$ 中的紧集；
    - ${\mathbb{R}^d}$ 中的开球；
    - ${\mathbb{R}^d}$ 中的长方体；
    - ${\mathbb{R}^d}$ 中的简单集合。

    $(X,\mathcal{B})$ 称为**可测空间(measurable space)**。

## 3. 可数可加测度和测度空间 { #s3 }

!!! definition "定义"
    设 $\mathcal{B}$ 是空间 $X$ 上的 Boolean 代数，一个 $\mathcal{B}$ 上的**(无符号)有限可加测度(finitely additive measure)** $\mu$ 为映射 $\mu:\mathcal{B}\rightarrow [0,+\infty]$ 满足：

    - $\mu(\emptyset)=0$。
    - 对不交的 $E,F\in \mathcal{B}$，$\mu(E\cup F)=\mu(E)+\mu(F)$。

!!! definition "定义"
    设 $\mathcal{B}$ 是空间 $X$ 上的 Boolean 代数，一个 $\mathcal{B}$ 上的**(无符号)可数可加测度(countably additive measure)** $\mu$ 为映射 $\mu:\mathcal{B}\rightarrow [0,+\infty]$ 满足：

    - $\mu(\emptyset)=0$。
    - 对不交的 $E_1,E_2,\cdots\in \mathcal{B}$，$\mu(\bigcup_{n=1}^\infty E_n)=\sum_{n=1}^\infty \mu(E_n)$。

    $(X,\mathcal{B},\mu)$ 称为**测度空间(measure space)**。

!!! theorem "命题"
    设 $(X,\mathcal{B})$ 是可测空间。

    - 若 $\mu$ 是 $\mathcal{B}$ 的可数可加测度，$c\in [0,+\infty]$，则 $c\mu$ 也是可数可加测度。
    - 若 $\mu_1,\mu_2,\cdots$ 是 $\mathcal{B}$ 的可数可加测度，则 $\sum_{n=1}^\infty \mu_n:E\rightarrow \sum_{n=1}^\infty \mu_n(E)$ 也是可数可加测度。

!!! theorem "命题"
    设 $(X,\mathcal{B},\mu)$ 是测度空间。

    - (可数次可加性)对 $E_1,E_2,\cdots\in \mathcal{B}$，$\mu(\bigcup_{n=1}^\infty E_n)\le\sum_{n=1}^\infty \mu(E_n)$。

    - (向上单调收敛)若 $E_1\subset E_2\subset \cdots$ 是 $\mathcal{B}-$可测的，则

        $$
        \mu(\bigcup_{n=1}^\infty E_n)=\lim_{n\rightarrow \infty} \mu(E_n)=\sup_n \mu(E_n)
        $$

    - (向下单调收敛)若 $E_1\supset E_2\supset \cdots$ 是 $\mathcal{B}-$可测的，且至少一个 $\mu(E_n)<\infty$，则

        $$
        \mu(\bigcap_{n=1}^\infty E_n)=\lim_{n\rightarrow \infty} \mu(E_n)=\inf_n \mu(E_n)
        $$

!!! definition "定义"
    测度空间 $(X,\mathcal{B},\mu)$ 中测度为零的 $\mathcal{B}-$可测集称为**零测集(null set)**。零测集的子集称为**子零测集(sub-null set)**。一个测度空间称为**完备的(complete)**，若任意子零测集都是零测集。

!!! theorem "命题"
    测度空间 $(X,\mathcal{B},\mu)$ 存在唯一的完备测度空间 $(X,\overline{\mathcal{B}},\overline{\mu})$。事实上，

    $$
    \overline{\mathcal{B}}=\left\{B\setminus N\Big| B\in \mathcal{B},N \text{ 为 }\mathcal{B}-\text{子零测}\right\}
    $$

!!! theorem "命题"
    Lebesgue 测度空间 $({\mathbb{R}^d},\mathcal{L}[{\mathbb{R}^d}],m)$ 是 Borel 测度空间 $({\mathbb{R}^d},\mathcal{B}[{\mathbb{R}^d}],m)$ 的完备。

## 4. 测度空间上的可测函数与积分 { #s4 }

!!! definition "定义"
    设 $(X,\mathcal{B})$ 为可测空间，$f:X\rightarrow [0,+\infty]$ 或 $f:X\rightarrow \mathbb{C}$ 为无符号或复值函数。称 $f$ 是可测的若任意开集 $U\subset [0,+\infty]$ 或 $\mathbb{C}$，$f^{-1}(U)$ 是 $\mathcal{B}-$可测的。

!!! theorem "命题"
    设 $(X,\mathcal{B})$ 是可测空间。

    - $f:X\rightarrow [0,+\infty]$ 可测当且仅当对任意 $\left\{x\in X\Big| f(x)>\lambda\right\}$ 是 $\mathcal{B}-$可测的。
    - 示性函数 $1_E$ 可测当且仅当 $E$ 是 $\mathcal{B}-$可测。
    - $f:X\rightarrow [0,+\infty]$ 或 $f:X\rightarrow \mathbb{C}$ 为无符号或复值函数，$f$ 是可测的当且仅当任意 Borel-可测集 $E\subset [0,+\infty]$ 或 $\mathbb{C}$，$f^{-1}(E)$ 是 $\mathcal{B}-$可测的。
    - $f:X\rightarrow \mathbb{C}$ 是可测的当且仅当实部和虚部都是可测的。
    - $f:X\rightarrow \mathbb{R}$ 是可测的当且仅当 $f_+$ 和 $f_-$ 都是可测的。
    - 若 $f_n:X\rightarrow [0,\infty]$ 是一列可测函数逐点收敛于 $f:X\rightarrow [0,+\infty]$，则 $f$ 可测。将 $[0,+\infty]$ 改成 $\mathbb{C}$ 命题也成立。
    - $f:X\rightarrow [0,+\infty]$ 是可测函数，$\phi:[0,+\infty]\rightarrow [0,+\infty]$ 连续，则 $\phi\circ f$ 是可测函数。将 $[0,+\infty]$ 改成 $\mathbb{C}$ 命题也成立。
    - 证明两个 $[0,+\infty]$ 或 $\mathbb{C}$ 上的可测函数的和或积还是可测函数。

!!! theorem "定理（Egorov 定理）"
    令 $(X,\mathcal{B},\mu)$ 为有限测度空间，$f_n:X\rightarrow \mathbb{C}$ 为一列可测函数几乎处处逐点收敛于 $f:X\rightarrow \mathbb{C}$，对任意 $\epsilon>0$，存在可测集 $E$，$\mu(E)\le \epsilon$ 满足 $f_n$ 在 $E$ 外一致收敛于 $f$。

!!! definition "定义"
    可测空间 $(X,\mathcal{B})$ 上的 **简单函数** $f:X\rightarrow [0,+\infty]$ 为可测函数且取值 $a_1,\cdots,a_k$ 有限。定义积分

    $$
    \mathrm{Simp} \int_X f\mathrm{d} \mu:=\sum_{j=1}^k a_j \mu(f^{-1}(\left\{a_j\right\}))
    $$

!!! theorem "命题"
    设 $(X,\mathcal{B},\mu)$ 为测度空间，$f,g:X\rightarrow [0,+\infty]$ 是简单函数。

    - 若 $f\le g$，则

        $$
        \mathrm{Simp}\int_X f\mathrm{d} \mu\le \mathrm{Simp} \int_X g\mathrm{d} \mu
        $$

    - 对任意 $\mathcal{B}-$可测集 $E$，有

        $$
        \mathrm{Simp} \int_X 1_E\mathrm{d} \mu =\mu(E)
        $$

    - 对任意 $c\in [0,+\infty]$，有

        $$
        \mathrm{Simp} \int_X cf\mathrm{d} \mu=c\times \mathrm{Simp} \int _X f\mathrm{d} \mu
        $$

    -

        $$
        \mathrm{Simp} \int_X (f+g)\mathrm{d} \mu =\mathrm{Simp} \int_X f\mathrm{d} \mu +\mathrm{Simp} \int_X g\mathrm{d} \mu
        $$

    - 若 $(X,\mathcal{B}',\mu')$ 是 $(X,\mathcal{B},\mu)$ 的加细，即 $\mathcal{B}'\supset \mathcal{B}$ 且 $\mu'\big|_\mathcal{B}=\mu$，则

        $$
        \mathrm{Simp} \int_X f\mathrm{d} \mu=\mathrm{Simp} \int _X f\mathrm{d} \mu'
        $$

    - 若 $f,g$ 在测度 $\mu$ 意义下几乎处处相等，则

        $$
        \mathrm{Simp} \int_X f\mathrm{d}\mu =\mathrm{Simp} \int _X g\mathrm{d} \mu
        $$

    - $\mathrm{Simp} \int_X f\mathrm{d} \mu<\infty$ 当且仅当 $f$ 几乎处处有限且支集测度有限。

    - $\mathrm{Simp} \int_X f\mathrm{d} \mu=0$ 当且仅当 $f$ 几乎处处为 $0$。

!!! definition "定义"
    令 $(X,\mathcal{B},\mu)$ 是测度空间，$f:X\rightarrow [0,+\infty]$ 可测，则我们定义

    $$
    \int_Xf\mathrm{d} \mu=\sup_{\substack{0\le g\le f\\ g \text{ 简单函数}}} \mathrm{Simp} \int_X g\mathrm{d} \mu
    $$

!!! theorem "命题"
    令 $(X,\mathcal{B},\mu)$ 是测度空间，$f,g:X\rightarrow [0,+\infty]$ 是可测函数。

    - 若 $f=g$ 几乎处处成立，则

        $$
        \int_X f\mathrm{d} \mu =\int_X g\mathrm{d} \mu
        $$

    - 若 $f\le g$ 几乎处处成立，则

        $$
        \int_X f\mathrm{d} \mu \le\int_X g\mathrm{d} \mu
        $$

    - 对任意 $c\in [0,+\infty]$，有

        $$
        \int_X cf\mathrm{d} \mu=c\times \int _X f\mathrm{d} \mu
        $$

    -

        $$
        \int_X (f+g)\mathrm{d} \mu\ge \int_X f\mathrm{d}\mu +\int_X g\mathrm{d}\mu
        $$

    - 若 $f$ 是简单函数，则

        $$
        \mathrm{Simp} \int_X f\mathrm{d} \mu =\int _X f\mathrm{d} \mu
        $$

    - (Markov 不等式)对任意 $0<\lambda <\infty$，有

        $$
        \mu\left(\left\{x\in X\Big| f(x)\ge \lambda \right\}\right)\le \frac{1}{\lambda}\int_X f\mathrm{d} \mu
        $$

    - $\int_X f\mathrm{d} \mu<\infty$ 当且仅当 $f$ 几乎处处有限且支集测度有限。

    - $\int_X f\mathrm{d} \mu=0$ 当且仅当 $f$ 几乎处处为 $0$。

    -

        $$
        \lim_{n\rightarrow \infty}\int_X \min(f,n)\mathrm{d} \mu=\int_X f\mathrm{d} \mu
        $$

    - 设 $E_1\subset E_2\subset\cdots$ 是 $\mathcal{B}-$可测集，则

        $$
        \lim_{n\rightarrow \infty} \int_X f1_{E_n}\mathrm{d} \mu=\int_X f1_{\bigcup_{n=1}^\infty E_n}\mathrm{d} \mu
        $$

    - 设 $Y$ 是 $X$ 的可测子集，则

        $$
        \int_X f1_X\mathrm{d}\mu=\int_Y f\big|_Y \mathrm{d} \mu\big|_Y
        $$

!!! theorem "定理"
    令 $(X,\mathcal{B},\mu)$ 是测度空间，$f,g:X\rightarrow [0,+\infty]$ 是可测函数。则

    $$
    \int_X(f+g)\mathrm{d} \mu=\int_X f\mathrm{d} \mu+\int_X g\mathrm{d} \mu
    $$

!!! definition "定义"
    从一个可测空间 $(X, \mathcal{B})$ 到另一个可测空间 $(Y, \mathcal{C})$ 的**可测态射(measurable morphism)** $f$ 为一个函数 $f: X \to Y$，满足对每个 $\mathcal{C}$-可测集 $E$，原像 $f^{-1}(E)$ 是 $\mathcal{B}$-可测的。

!!! theorem "命题"
    令 $(X,\mathcal{B},\mu)$ 是测度空间，$\phi:X\rightarrow Y$ 是可测态射，定义 $\phi$ 对 $\mu$ 的拉回 $\phi_*\mu :\mathcal{C}\rightarrow [0,+\infty]$ 为 $\phi_*\mu(E):=\mu(\phi^{-1}(E))$。

    - $\phi_*\mu$ 是 $\mathcal{C}$ 上的测度，即 $(Y,\mathcal{C},\phi_*\mu)$ 是测度空间。

    - 若 $f:Y\rightarrow [0,+\infty]$ 可测，则

        $$
        \int_Y f\mathrm{d} \phi_*\mu=\int_X(f\circ \phi)\mathrm{d} \mu
        $$

!!! definition "定义"
    令 $(X,\mathcal{B},\mu)$ 是测度空间，可测函数 $f:X\rightarrow \mathbb{C}$ 称为**绝对可积的**，若

    $$
    \left\|f\right\|_{L^1(X,\mathcal{B},\mu)}:=\int_X\left|f\right|\mathrm{d} \mu
    $$

    有限，并用 $L^1(X,\mathcal{B},\mu),L^1(X),L^1(\mu)$ 表示绝对可积函数空间。

    若 $f$ 是实值且绝对可积的，则其积分 $\int_X f(x) \, \mathrm{d} \mu$ 定义为

    $$
    \quad \int_X f(x) \, \mathrm{d} \mu := \int_{X} f_+(x) \, \mathrm{d} \mu - 	\int_{X} f_-(x) \, \mathrm{d} \mu,
    $$

    若 $f$ 是复值且绝对可积的，则其积分 $\int_{X} f(x) \, \mathrm{d} \mu$ 定义为

    $$
    \int_{X} f(x) \, \mathrm{d} \mu := \int_{X} \operatorname{Re} f(x) \, \mathrm{d} \mu + i \int_{X} \operatorname{Im} f(x) \, \mathrm{d} \mu,
    $$

## 5. 收敛定理 { #s5 }

!!! theorem "定理（单调收敛定理）"
    令 $(X,\mathcal{B},\mu)$ 是测度空间，$0\le f_1\le f_2\le \cdots$ 为 $X$ 上的单调不减的无符号可测函数列，则我们有

    $$
    \lim_{n\rightarrow \infty} \int_X f_n \mathrm{d} \mu =\int_X \lim_{n\rightarrow \infty} f_n\mathrm{d} \mu
    $$

!!! theorem "推论"
    令 $(X,\mathcal{B},\mu)$ 是测度空间，$f_1,f_2,\cdots:X\rightarrow [0,+\infty]$ 为一列无符号可测函数，则

    $$
    \int_X \sum_{n=1}^\infty f_n \mathrm{d} \mu=\sum_{n=1}^\infty \int _X f_n \mathrm{d} \mu
    $$

!!! theorem "推论（Borel-Cantelli lemma）"
    令 $(X,\mathcal{B},\mu)$ 是测度空间，$E_1,E_2,\cdots$ 为一列 $\mathcal{B}-$可测集满足

    $$
    \sum_{n=1}^\infty \mu(E_n)<\infty
    $$

    则几乎所有的 $x\in X$ 仅被包含于有限个 $E_n$ 中。

!!! theorem "推论（Fatou's lemma）"
    令 $(X,\mathcal{B},\mu)$ 是测度空间，$f_1,f_2,\cdots:X\rightarrow [0,+\infty]$ 为一列无符号可测函数，则

    $$
    \int_X \liminf_{n\rightarrow \infty} f_n\mathrm{d} \mu \le \liminf_{n\rightarrow \infty } f_n \mathrm{d} \mu
    $$

!!! theorem "定理（控制收敛定理）"
    令 $(X,\mathcal{B},\mu)$ 是测度空间，$f_1,f_2,\cdots:X\rightarrow \mathbb{C}$ 为一列可测函数且几乎处处逐点收敛于可测函数 $f:X\rightarrow \mathbb{C}$。设存在无符号绝对收敛函数 $G:X\rightarrow [0,+\infty]$ 满足对任意 $n$，$\left|f_n\right|\le G$ 几乎处处成立，则我们有

    $$
    \lim_{n\rightarrow \infty} \int_X f_n\mathrm{d} \mu=\int_X f\mathrm{d} \mu
    $$

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/real-analysis.pdf){ .md-button download="real-analysis.pdf" }
