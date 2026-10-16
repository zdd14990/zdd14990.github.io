---
title: 第三章：Lebesgue 积分
date: 2025-11-19
updated: 2026-10-15
description: 实分析笔记第三章：简单函数的积分、可测函数、无符号 Lebesgue 积分、绝对可积性、小木头三主角。
hide:
  - navigation
categories:
  - 分析
tags:
  - analysis
---

# 第三章：Lebesgue 积分 { #top }

本章中，我们将通过 Lebesgue 测度定义函数 $f:{\mathbb{R}^d}\rightarrow \mathbb{C}\cup \left\{\infty\right\}$ 的 Lebesgue 积分

$$
\int_{\mathbb{R}^d} f(x)\mathrm{d} x
$$

## 1. 简单函数的积分 { #s1 }

!!! definition "定义"
    **简单函数(simple function)** $f:{\mathbb{R}^d}\rightarrow \mathbb{C}$ 形如

    $$
    f=c_11_{E_1}+\cdots+c_k1_{E_k}
    $$

    其中 $E_i\subset {\mathbb{R}^d}$ 是 Lebesgue 可测集，$c_i\in \mathbb{C}$。

    **无符号简单函数(unsigned simple function)** 为 $c_i\in [0,+\infty]$ 其余同上定义。

容易得到复值简单函数构成了向量空间 $\mathrm{Simp}({\mathbb{R}^d})$，且在乘法与共轭下封闭。无符号简单函数也同样构成了向量空间 $\mathrm{Simp}^+({\mathbb{R}^d})$，且为 $[0,+\infty]-$模。

在该定义中，我们并不要求 $E_i$ 两两不交。事实上我们可以证明任意 $k$ 个集合将 ${\mathbb{R}^d}$ 分成 $2^k$ 个不交的部分，于是 $f$ 可以写成不交的 $E'_i$ 的形式。

自然地希望对可测集 $E$ 有

$$
\int_{\mathbb{R}^d} 1_E(x)\mathrm{d} x=m(E)
$$

为了保证积分的性质，我们如下定义无符号简单函数的积分：

!!! definition "定义"
    对 $f=c_11_{E_1}+\cdots+c_k1_{E_k}$，定义 $f$ 的积分

    $$
    \mathrm{Simp}\int_{\mathbb{R}^d} f(x)\mathrm{d} x:=c_1m(E_1)+\cdots+c_km(E_k)
    $$

!!! theorem "引理（良定义）"
    若 $c_11_{E_1}+\cdots+c_k1_{E_k}=c'_11_{E'_1}+\cdots+c'_k1_{E'_k}$，则

    $$
    c_1m(E_1)+\cdots+c_km(E_k)=c'_1m(E'_1)+\cdots+c'_km(E'_k)
    $$

!!! definition "定义"
    一个对 $x\in {\mathbb{R}^d}$ 的性质 $P(x)$ 称为**几乎处处的(almost everywhere)**，若不满足 $P(x)$ 的 $x$ 构成的集合是零测集，简记为 a.e.。

!!! definition "定义"
    $f$ 的**支集(support)**定义为

    $$
    \mathrm{supp} f:=\left\{x\in {\mathbb{R}^d}\Big| f(x)\neq 0\right\}
    $$

!!! theorem "命题（简单函数积分的性质）"
    -

        $$
        \mathrm{Simp} \int_{\mathbb{R}^d} f(x)+g(x)\mathrm{d} x=\mathrm{Simp} \int_{\mathbb{R}^d} f(x)\mathrm{d} x+\mathrm{Simp} \int_{\mathbb{R}^d} g(x)\mathrm{d} x
        $$

    - 对 $c\in [0,+\infty]$，有

        $$
        \mathrm{Simp} \int_{\mathbb{R}^d} cf(x)\mathrm{d} x=c\times \mathrm{Simp} \int_{\mathbb{R}^d} f(x)\mathrm{d} x
        $$

    - $\mathrm{Simp} \int_{\mathbb{R}^d} f(x)\mathrm{d} x$ 有限当且仅当 $f$ 几乎处处有限且支集测度有限。

    - $\mathrm{Simp} \int_{\mathbb{R}^d} f(x)\mathrm{d} x=0$ 当且仅当 $f$ 几乎处处为 $0$。

    - 若 $f$ 和 $g$ 几乎处处相等，则

        $$
        \mathrm{Simp} \int_{\mathbb{R}^d} f(x)\mathrm{d} x=\mathrm{Simp} \int _{\mathbb{R}^d} g(x)\mathrm{d} x
        $$

    - 若 $f\le g$ 几乎处处成立，则

        $$
        \mathrm{Simp} \int_{\mathbb{R}^d} f(x)\mathrm{d} x\le \mathrm{Simp} \int _{\mathbb{R}^d} g(x)\mathrm{d} x
        $$

    - 对任意 Lebesgue 可测集 $E$，

        $$
        \mathrm{Simp} \int _{\mathbb{R}^d} 1_E(x)\mathrm{d} x=m(E)
        $$

!!! definition "定义"
    称复值简单函数 $f : \mathbb{R}^d \to \mathbb{C}$ 为**绝对可积的(absolutely integrable)**，若

    $$
    \text{Simp} \int_{\mathbb{R}^d} |f(x)| \, \mathrm{d} x < \infty,
    $$

    当 $f$ 绝对可积时，对于实值有符号函数，其积分 $\text{Simp} \int_{\mathbb{R}^d} f(x) \,\mathrm{d} x$ 定义为：

    $$
    \text{Simp} \int_{\mathbb{R}^d} f(x) \, \mathrm{d} x := \text{Simp} \int_{\mathbb{R}^d} f_+(x) \, \mathrm{d} x - \text{Simp} \int_{\mathbb{R}^d} f_-(x) \, \mathrm{d} x,
    $$

    其中 $f_+(x) := \max(f(x), 0)$ ， $f_-(x) := \max(-f(x), 0)$。

    对于复值函数，其积分定义为：

    $$
    \text{Simp} \int_{\mathbb{R}^d} f(x) \, \mathrm{d} x := \text{Simp} \int_{\mathbb{R}^d} \operatorname{Re} f(x) \, \mathrm{d} x + i \text{Simp} \int_{\mathbb{R}^d} \operatorname{Im} f(x) \, \mathrm{d} x.
    $$

!!! theorem "命题"
    设 $f,g:{\mathbb{R}^d}\rightarrow \mathbb{C}$ 为绝对可积简单函数。

    -

        $$
        \mathrm{Simp} \int_{\mathbb{R}^d} f(x)+g(x)\mathrm{d} x=\mathrm{Simp} \int_{\mathbb{R}^d} f(x)\mathrm{d} x+\mathrm{Simp} \int_{\mathbb{R}^d} g(x)\mathrm{d} x
        $$

    - 对 $c\in \mathbb{C}$，有

        $$
        \mathrm{Simp} \int_{\mathbb{R}^d} cf(x)\mathrm{d} x=c\times \mathrm{Simp} \int_{\mathbb{R}^d} f(x)\mathrm{d} x
        $$

    -

        $$
        \mathrm{Simp} \int_{\mathbb{R}^d} \overline{f}(x)\mathrm{d} x=\overline{\mathrm{Simp} \int_{\mathbb{R}^d} f(x)\mathrm{d} x}
        $$

    - 若 $f$ 和 $g$ 几乎处处相等，则

        $$
        \mathrm{Simp} \int_{\mathbb{R}^d} f(x)\mathrm{d} x=\mathrm{Simp} \int _{\mathbb{R}^d} g(x)\mathrm{d} x
        $$

## 2. 可测函数 { #s2 }

!!! definition "定义"
    一个无符号函数 $f:{\mathbb{R}^d}\rightarrow [0,+\infty]$ 称为**无符号 Lebesgue 可测的(unsigned Lebesgue measurable)**，或者 **Lebesgue 可测的**，若有一列无符号函数逐点收敛于 $f$，即存在无符号简单函数 $f_1,f_2\cdots:{\mathbb{R}^d}\rightarrow [0,+\infty]$ 满足对任意 $x\in {\mathbb{R}^d}$，$f_n(x)\rightarrow f(x)$。

虽然这个定义往往无法直接被验证，但是所幸我们有如下等价形式：

!!! theorem "引理"
    令 $f:{\mathbb{R}^d}\rightarrow [0,+\infty]$ 为无符号函数，则如下命题等价：

    - $f$ 是无符号 Lebesgue 可测函数。
    - 存在一列无符号简单函数 $f_n$ 逐点收敛于 $f$。
    - 存在一列无符号简单函数 $f_n$ 几乎处处逐点收敛于 $f$。
    - $f(x)=\sup_n f_n(x)$ 为一列不减有界且支集测度有限的无符号简单函数 $f_n$ 的上确界。
    - 对任意 $\lambda\in [0,+\infty]$，$\left\{x\in {\mathbb{R}^d}\Big| f(x)> \lambda\right\}$ Lebesgue 可测。
    - 对任意 $\lambda\in [0,+\infty]$，$\left\{x\in {\mathbb{R}^d}\Big| f(x)\ge \lambda\right\}$ Lebesgue 可测。
    - 对任意 $\lambda\in [0,+\infty]$，$\left\{x\in {\mathbb{R}^d}\Big| f(x)< \lambda\right\}$ Lebesgue 可测。
    - 对任意 $\lambda\in [0,+\infty]$，$\left\{x\in {\mathbb{R}^d}\Big| f(x)\le \lambda\right\}$ Lebesgue 可测。
    - 对任意区间 $I\subset [0,+\infty]$，$f^{-1}(I):=\left\{x\in {\mathbb{R}^d}\Big| f(x)\in I\right\}$ Lebesgue 可测。
    - 对任意开集 $U\subset [0,+\infty)$，$f^{-1}(U):=\left\{x\in {\mathbb{R}^d}\Big| f(x)\in U\right\}$ Lebesgue 可测。
    - 对任意闭集 $K\subset [0,+\infty)$，$f^{-1}(K):=\left\{x\in {\mathbb{R}^d}\Big| f(x)\in K\right\}$ Lebesgue 可测。

!!! theorem "命题"
    - 任意连续函数 $f:{\mathbb{R}^d}\rightarrow [0,+\infty]$ 是可测的。
    - 任意无符号简单函数是可测的。
    - 无符号函数的 $\sup$、$\inf$、$\limsup$、$\liminf$ 是可测的。
    - 若一个无符号函数与一个无符号可测函数几乎处处相等，则是可测的。
    - 一列无符号可测函数几乎处处逐点收敛于无符号函数 $f$，则 $f$ 是可测的。
    - 若 $f:{\mathbb{R}^d}\rightarrow [0,+\infty]$ 可测，$\phi:[0,+\infty]\rightarrow [0,+\infty]$ 连续，则 $\phi\circ f:{\mathbb{R}^d}\rightarrow [0,+\infty]$ 可测。
    - 若 $f,g$ 是无符号可测函数，则 $f+g$ 和 $fg$ 是可测的。

!!! problem "习题"
    设 $f:{\mathbb{R}^d}\rightarrow [0,+\infty]$，证明 $f$ 是有界无符号可测函数当且仅当存在一列有界简单函数一致收敛于 $f$。

!!! definition "定义"
    一个几乎处处有定义的复值函数 $f:{\mathbb{R}^d}\rightarrow \mathbb{C}$ 称为 **Lebesgue 可测的**，若存在一列复值简单函数几乎处处逐点收敛于 $f$。

类似的，我们有如下等价形式：

!!! theorem "引理"
    令 $f:{\mathbb{R}^d}\rightarrow [0,+\infty]$ 为几乎处处有定义的复值函数，则如下命题等价：

    - $f$ 是无符号 Lebesgue 可测函数。
    - 存在一列复值简单函数 $f_n$ 几乎处处逐点收敛于 $f$。
    - $\Re f$ 与 $\mathrm{Im}f$ 是无符号可测函数。
    - 对任意开集 $U\subset \mathbb{C}$，$f^{-1}(U):=\left\{x\in {\mathbb{R}^d}\Big| f(x)\in U\right\}$ Lebesgue 可测。
    - 对任意闭集 $K\subset\mathbb{C}$，$f^{-1}(K):=\left\{x\in {\mathbb{R}^d}\Big| f(x)\in K\right\}$ Lebesgue 可测。

!!! theorem "命题"
    - 所有连续函数 $f:{\mathbb{R}^d}\rightarrow \mathbb{C}$ 是可测的。
    - $f:{\mathbb{R}^d}\rightarrow \mathbb{C}$ 是简单的当且仅当 $f$ 可测且取值有限。
    - 若一个复值函数与一个可测函数几乎处处相等，则是可测的。
    - 一列复值可测函数几乎处处逐点收敛于复值函数 $f$，则 $f$ 是可测的。
    - 若 $f:{\mathbb{R}^d}\rightarrow \mathbb{C}$ 可测，$\phi:\mathbb{C}\rightarrow\mathbb{C}$ 连续，则 $\phi\circ f:{\mathbb{R}^d}\rightarrow \mathbb{C}$ 可测。
    - 若 $f,g$ 是可测函数，则 $f+g$ 和 $fg$ 是可测的。

## 3. 无符号 Lebesgue 积分 { #s3 }

!!! definition "定义"
    令 $f:{\mathbb{R}^d}\rightarrow [0,+\infty]$ 为无符号函数，定义**无符号 Lebesgue 下积分(lower unsigned Lebesgue integral)** 为

    $$
    \underline{\int _{\mathbb{R}^d}} f(x)\mathrm{d} x:=\sup_{\substack{0\le g\le f\\ g\text{ simple }}}\mathrm{Simp} \int_{\mathbb{R}^d} g(x)\mathrm{d} x
    $$

    同理定义**无符号 Lebesgue 上积分(upper unsigned Lebesgue integral)** 为

    $$
    \overline{\int _{\mathbb{R}^d}} f(x)\mathrm{d} x:=\inf_{\substack{h\ge f\\ h\text{ simple }}}\mathrm{Simp} \int_{\mathbb{R}^d} h(x)\mathrm{d} x
    $$

!!! theorem "命题"
    令 $f,g:{\mathbb{R}^d}\rightarrow [0,+\infty]$ 为无符号函数。

    - 若 $f$ 是简单函数，则

        $$
        \overline{\int _{\mathbb{R}^d}}f(x)\mathrm{d} x=\underline{\int _{\mathbb{R}^d}}f(x)\mathrm{d} x=\mathrm{Simp} \int_{\mathbb{R}^d} f(x)\mathrm{d} x
        $$

    - 若 $f\le g$ 几乎处处成立，则

        $$
        \underline{\int _{\mathbb{R}^d}}f(x)\mathrm{d} x\le \underline{\int _{\mathbb{R}^d}}g(x)\mathrm{d} x\qquad\overline{\int _{\mathbb{R}^d}}f(x)\mathrm{d} x\le \overline{\int _{\mathbb{R}^d}}g(x)\mathrm{d} x
        $$

    - 若 $c\in [0,+\infty )$，则

        $$
        \underline{\int _{\mathbb{R}^d}}cf(x)\mathrm{d} x=c\underline{\int _{\mathbb{R}^d}}f(x)\mathrm{d} x
        $$

    - 若 $f,g$ 几乎处处相等，则

        $$
        \underline{\int _{\mathbb{R}^d}}f(x)\mathrm{d} x= \underline{\int _{\mathbb{R}^d}}g(x)\mathrm{d} x\qquad\overline{\int _{\mathbb{R}^d}}f(x)\mathrm{d} x= \overline{\int _{\mathbb{R}^d}}g(x)\mathrm{d} x
        $$

    -

        $$
        \underline{\int _{\mathbb{R}^d}}f(x)+g(x)\mathrm{d} x\ge \underline{\int _{\mathbb{R}^d}}f(x)\mathrm{d} x+\underline{\int _{\mathbb{R}^d}}g(x)\mathrm{d} x
        $$

    -

        $$
        \overline{\int _{\mathbb{R}^d}}f(x)+g(x)\mathrm{d} x\le \overline{\int _{\mathbb{R}^d}}f(x)\mathrm{d} x+\overline{\int _{\mathbb{R}^d}}g(x)\mathrm{d} x
        $$

    - 对可测集 $E$，有

        $$
        \underline{\int _{\mathbb{R}^d}}f(x)\mathrm{d} x=\underline{\int _{\mathbb{R}^d}}f(x)1_E(x)\mathrm{d} x+\underline{\int _{\mathbb{R}^d}}f(x)1_{ {\mathbb{R}^d}\setminus E}(x)\mathrm{d} x
        $$

    -

        $$
        \lim_{n\rightarrow \infty} \underline{\int_{\mathbb{R}^d}} \min(f(x),n)\mathrm{d} x=\underline{\int _{\mathbb{R}^d}}f(x)\mathrm{d} x
        $$

    -

        $$
        \lim_{n\rightarrow \infty} \underline{\int_{\mathbb{R}^d}} f(x)1_{\left|x\right|\le n}\mathrm{d} x=\underline{\int _{\mathbb{R}^d}}f(x)\mathrm{d} x
        $$

    - 若 $f+g$ 是有界简单函数且支集测度有限，则

        $$
        \mathrm{Simp} \int_{\mathbb{R}^d} f(x)+g(x)\mathrm{d} x= \underline{\int _{\mathbb{R}^d}}f(x)\mathrm{d} x+\overline{\int _{\mathbb{R}^d}}g(x)\mathrm{d} x
        $$

!!! definition "定义"
    若 $f:{\mathbb{R}^d}\rightarrow [0,+\infty]$ 是可测函数，定义其无符号积分为无符号 Lebesgue 下积分 $\underline{\int_{\mathbb{R}^d}} f(x)\mathrm{d} x$

!!! theorem "命题"
    设 $f:{\mathbb{R}^d}\rightarrow [0,+\infty]$ 为有界可测集且支集测度有限，则其上积分与下积分相同。

!!! theorem "推论"
    令 $f,g:{\mathbb{R}^d}\rightarrow [0,+\infty]$ 是可测的，则

    $$
    \int_{\mathbb{R}^d} f(x)+g(x)\mathrm{d} x=\int _{\mathbb{R}^d} f(x)\mathrm{d} x+\int _{\mathbb{R}^d} g(x)\mathrm{d} x
    $$

!!! problem "习题（勒贝格积分的唯一性）"
    证明勒贝格积分 $f \mapsto \int_{\mathbb{R}^d} f(x) \, dx$ 是唯一一个从可测无符号函数 $f : \mathbb{R}^d \to [0, +\infty]$ 到 $[0, +\infty]$ 的映射，满足以下性质：

    - (与简单积分的相容性)若 $f$ 是简单函数，则

        $$
        \int_{\mathbb{R}^d} f(x) \, \mathrm{d} x = \text{Simp } \int_{\mathbb{R}^d} f(x) \, \mathrm{d} x.
        $$

    - (有限可加性)

        $$
        \int_{\mathbb{R}^d} (f(x) + g(x)) \, \mathrm{d} x = \int_{\mathbb{R}^d} f(x) \, \mathrm{d} x + \int_{\mathbb{R}^d} g(x) \, \mathrm{d} x.
        $$

    - (水平截断)

        $$
        \lim_{n\rightarrow\infty}\int_{\mathbb{R}^d} \min(f(x), n) \, \mathrm{d} x = \int_{\mathbb{R}^d} f(x) \, \mathrm{d} x.
        $$

    - (垂直截断)

        $$
        \lim_{n\rightarrow\infty}\int_{\mathbb{R}^d} f(x) \cdot \mathbf{1}_{|x| \leq n} \, \mathrm{d} x = \int_{\mathbb{R}^d} f(x) \, \mathrm{d} x.
        $$

!!! problem "习题（线性变量替换）"
    设 $f : \mathbb{R}^d \to [0, +\infty]$ 为可测函数，$T : \mathbb{R}^d \to \mathbb{R}^d$ 为可逆线性变换。证明：

    $$
    \int_{\mathbb{R}^d} f(T^{-1}(x)) \, \mathrm{d} x = |\det T| \int_{\mathbb{R}^d} f(x) \, \mathrm{d} x,
    $$

    或等价地，

    $$
    \int_{\mathbb{R}^d} f(Tx) \, \mathrm{d} x = \frac{1}{|\det T|} \int_{\mathbb{R}^d} f(x) \, \mathrm{d} x.
    $$

!!! theorem "引理（Markov 不等式）"
    令 $f:{\mathbb{R}^d}\rightarrow [0,+\infty]$ 是可测的，则对任意 $0<\lambda<\infty$，有

    $$
    m\left(\left\{ x\in {\mathbb{R}^d}\Big| f(x)\ge \lambda\right\}\right)\le \frac{1}{\lambda }\int_{\mathbb{R}^d} f(x)\mathrm{d} x
    $$

!!! theorem "命题"
    令 $f:{\mathbb{R}^d}\rightarrow [0,+\infty]$ 是可测函数.

    - $\int_{\mathbb{R}^d} f(x)\mathrm{d} x<\infty$ 当且仅当 $f$ 几乎处处有限。
    - $\int_{\mathbb{R}^d} f(x)\mathrm{d} x=0$ 当且仅当 $f$ 几乎处处为 $0$。

## 4. 绝对可积性 { #s4 }

!!! definition "定义"
    几乎处处有定义的可测函数 $f:{\mathbb{R}^d}\rightarrow \mathbb{C}$ 称为**绝对可积的(absolutely integrable)**，若

    $$
    \left\| f\right\|_{L^1({\mathbb{R}^d})}:=\int_{\mathbb{R}^d} \left|f(x)\right|\mathrm{d} x
    $$

    是有限的。$\|f\|_{L^1(\mathbb{R}^d)}$ 称为 $f$ 的 **$L^1(\mathbb{R}^d)$ 范数**，并用 $L^1(\mathbb{R}^d)$ 或 $L^1(\mathbb{R}^d \to \mathbb{C})$ 表示绝对可积函数空间。

    若 $f$ 是实值且绝对可积的，则其勒贝格积分 $\int_{\mathbb{R}^d} f(x) \, \mathrm{d} x$ 定义为

    $$
    \quad \int_{\mathbb{R}^d} f(x) \, \mathrm{d} x := \int_{\mathbb{R}^d} f_+(x) \, \mathrm{d} x - 	\int_{\mathbb{R}^d} f_-(x) \, \mathrm{d} x,
    $$

    若 $f$ 是复值且绝对可积的，则其勒贝格积分 $\int_{\mathbb{R}^d} f(x) \, \mathrm{d} x$ 定义为

    $$
    \int_{\mathbb{R}^d} f(x) \, \mathrm{d} x := \int_{\mathbb{R}^d} \operatorname{Re} f(x) \, \mathrm{d} x + i \int_{\mathbb{R}^d} \operatorname{Im} f(x) \, \mathrm{d} x,
    $$

!!! theorem "命题"
    设 $f,g\in L^1({\mathbb{R}^d}\rightarrow \mathbb{C})$，则

    -

        $$
        \left\|f+g\right\|_{L^1({\mathbb{R}^d})}\le \left\|f\right\|_{L^1({\mathbb{R}^d})}+\left\|g\right\|_{L^1({\mathbb{R}^d})}
        $$

    -

        $$
        \left\|cf\right\|_{L^1({\mathbb{R}^d})}=\left|c\right| \left\|f\right\|_{L^1({\mathbb{R}^d})}
        $$

    -

        $$
        \int_{\mathbb{R}^d} f(x)+g(x)\mathrm{d} x=\int_{\mathbb{R}^d} f(x)\mathrm{d} x+\int_{\mathbb{R}^d} g(x)\mathrm{d} x
        $$

    -

        $$
        \int_{\mathbb{R}^d} cf(x)\mathrm{d} x =c\int_{\mathbb{R}^d} f(x)\mathrm{d} x
        $$

    -

        $$
        \int_{\mathbb{R}^d} \overline{f(x)}\mathrm{d} x=\overline{\int_{\mathbb{R}^d} f(x)\mathrm{d} x}
        $$

**注：**若我们在 $L^1({\mathbb{R}^d})$ 上定义距离 $d_{L^1}(f,g):=\left\|f-g\right\|_{L^1({\mathbb{R}^d})}$，则 $(L^1({\mathbb{R}^d}),d)$ 为度量空间。

!!! problem "习题"
    设 $\left\{c_n\right\}_{n\in \mathbb{Z}}$ 是复数列，$f:\mathbb{R}\rightarrow \mathbb{C}$ 由下式给出：

    $$
    f(x):=\sum_{n\in \mathbb{Z}} c_n 1_{[n,n+1)}(x)=c_{\lfloor x\rfloor}
    $$

    证明 $f$ 绝对可积当且仅当 $\sum_{n\in \mathbb{Z}}c_n$ 绝对收敛，在该条件下

    $$
    \int_\mathbb{R} f(x)\mathrm{d} x=\sum_{n\in \mathbb{Z}} c_n
    $$

!!! problem "习题"
    若 $E,F$ 为 ${\mathbb{R}^d}$ 的不交可测集，且 $f:E\cup F\rightarrow \mathbb{C}$ 是可测的，证明

    -

        $$
        \int_Ef(x)\mathrm{d} x=\int_{E\cup F}f(x)1_E(x)\mathrm{d} x
        $$

    -

        $$
        \int_E f(x)\mathrm{d} x+\int _F f(x)\mathrm{d} x=\int_{E\cup F} f(x)\mathrm{d} x
        $$

!!! theorem "引理（三角不等式）"
    令 $f\in L^1({\mathbb{R}^d}\rightarrow \mathbb{C})$，则

    $$
    \left|\int_{\mathbb{R}^d} f(x)\mathrm{d} x\right|\le \int_{\mathbb{R}^d} \left|f(x)\right| \mathrm{d} x
    $$

## 5. 小木头三主角 { #s5 }

Littlewood 三原则是一组非正式的启发式准则，概括了勒贝格测度论背后的基本直觉。简而言之，这三个原则如下：

- 每个可测集几乎是一个区间的有限和；
- 每个绝对可积函数几乎连续；
- 每个逐点收敛的函数序列几乎一致收敛。

前文给出了第一原则的多种表现形式。现在我们转向第二原则。

!!! definition "定义"
    **阶梯函数(step function)**为长方体 $B$ 的示性函数 $\mathbf{1}_B$ 的有限线性组合。

!!! theorem "定理（$L^1$ 函数的逼近）"
    设 $f \in L^1(\mathbb{R}^d)$ 且 $\varepsilon > 0$。

    - 存在绝对可积的简单函数 $g$，使得

        $$
        \|f - g\|_{L^1(\mathbb{R}^d)} \leq \varepsilon.
        $$

    - 存在阶梯函数 $g$，使得

        $$
        \|f - g\|_{L^1(\mathbb{R}^d)} \leq \varepsilon.
        $$

    - 存在连续且紧支集的函数 $g$，使得

        $$
        \|f - g\|_{L^1(\mathbb{R}^d)} \leq \varepsilon.
        $$

!!! definition "定义"
    称一列函数 $f_n:{\mathbb{R}^d}\rightarrow \mathbb{C}$ **局部一致(locally uniformly)**收敛于 $f:{\mathbb{R}^d}\rightarrow \mathbb{C}$，若对任意有界集 $E\subset {\mathbb{R}^d}$，$f_n$ 在 $E$ 上一致收敛于 $f$。

!!! theorem "定理（Egorov 定理）"
    令一列可测函数 $f_n:{\mathbb{R}^d}\rightarrow \mathbb{C}$ 几乎处处逐点收敛于 $f:{\mathbb{R}^d}\rightarrow \mathbb{C}$，对任意 $\varepsilon>0$，存在 Lebesgue 可测集 $A$，$m(A)\le \varepsilon$ 满足 $f_n$ 在 ${\mathbb{R}^d}\setminus A$ 上局部一致收敛于 $f$。

!!! theorem "定理（Lusin 定理）"
    令 $f:{\mathbb{R}^d}\rightarrow \mathbb{C}$ 为绝对可积函数，对任意 $\varepsilon>0$，存在 Lebesgue 可测集 $E\subset {\mathbb{R}^d}$，$m(E)\le \varepsilon$，满足 $f$ 在 ${\mathbb{R}^d}\setminus E$ 上连续。

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/real-analysis.pdf){ .md-button download="real-analysis.pdf" }
