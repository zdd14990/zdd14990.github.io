---
title: 第二章：Lebesgue 测度
date: 2025-11-19
updated: 2026-10-15
description: 实分析笔记第二章：Lebesgue 外测度的性质、Lebesgue 可测性。
hide:
  - navigation
categories:
  - 分析
tags:
  - measure-theory
---

# 第二章：Lebesgue 测度 { #top }

Jordan 测度的问题在于，当一个集合内部的空隙太多时，如 $[0,1]^2\setminus \mathbb{Q}^2$，内测度与外测度就不相等，这是我们希望改进的。同时无限交和无限并不能保持 Jordan 可测性。我们通过 Jordan 外测度的定义来引出 Lebesgue 外测度的定义：

!!! definition "定义"
    定义 **Lebesgue 外测度**

    $$
    m^{*}(E) := \inf_{\substack{\bigcup_{n=1}^\infty B_n \supset E \\ B_1,B_2,\cdots \text{ 为长方体}}} \sum_{n=1}^{\infty}\left|B_n\right|.
    $$

!!! definition "定义"
    集合 $E\subset \mathbb{R}^d$ 称为**Lebesgue 可测的**，若对任意 $\varepsilon >0$ 存在开集 $U\subset \mathbb{R}^d$ 且 $E\subset U$，满足 $m^*(U\setminus E)<\varepsilon$。此时记 $m(E):=m^*(E)$ 作为 $E$ 的 Lebesgue 测度。类似地，当需强调维数 $d$ 时，记 $m(E)$ 为 $m^d(E)$。

## 1. Lebesgue 外测度的性质 { #s1 }

!!! theorem "命题"
    -

        $$
        m^*(\emptyset)=0
        $$

    - (单调性)若 $E\subset F$，有

        $$
        m^*(E)\le m^*(F)
        $$

    - (可数次可加性) 设 $E_1,E_2,\cdots\subset \mathbb{R}^d$ 是可数个集合，则

        $$
        m^*(\bigcup_{n=1}^\infty E_n)\le \sum_{n=1}^\infty m^*(E_n)
        $$

!!! theorem "引理"
    设 $E,F\subset \mathbb{R}^d$ 满足 $\mathrm{dist}(E,F):=\inf \left\{\left|x-y\right|\Big| x\in E,y\in F\right\}>0$，则

    $$
    m^*(E\cup F)=m^*(E)+m^*(F)
    $$

!!! theorem "命题"
    令 $E,F\subset \mathbb{R}^d$ 为不交的闭集，且有一者是紧的。则 $\mathrm{dist}(E,F)>0$。

!!! theorem "引理"
    令 $E$ 是简单集合，则 $m^*(E)=m(E)$。

!!! definition "定义"
    称两个长方体是**几乎不交的(almost disjoint)**，若其内部不交。

容易看到 $m(B_1\cup \cdots \cup B_k)=\left|B_1\right|+\cdots+\left|B_k\right|$ 不仅对不交的 $B_i$ 成立，对几乎不交也成立。

!!! theorem "引理"
    令 $E=\bigcup_{n=1}^\infty B_n$ 为可数个几乎不交的长方体 $B_1,B_2,\cdots$ 的并，则

    $$
    m^*(E)=\sum_{n=1}^\infty \left|B_n\right|
    $$

!!! theorem "命题"
    若 $E\subset \mathbb{R}^d$ 可以写成可数个几乎不交的长方体的并，则

    $$
    m^*(E)=m_{*,(J)}(E)
    $$

!!! theorem "引理"
    设 $E\subset \mathbb{R}^d$ 为开集，则 $E$ 可以写成可数个几乎不交的长方体的并。

至此，我们对所有开集都给出了 Lebesgue 外测度公式，更进一步地，我们终于能给出任意集合的 Lebesgue 外测度公式：

!!! theorem "引理（外部正则）"
    令 $E\subset \mathbb{R}^d$ 为任意集合，则

    $$
    m^*(E)=\inf_{\substack{E\subset U\\ U \text{开集}}}m^*(U)
    $$

## 2. Lebesgue 可测性 { #s2 }

!!! theorem "引理"
    - 任意开集是 Lebesgue 可测的。
    - 任意闭集是 Lebesgue 可测的。
    - 任意 Lebesgue 外测度为 $0$ 的集合是 Lebesgue 可测的，称为**零测集(null sets)**。
    - 空集 $\emptyset$ 是 Lebesgue 可测的。
    - 若 $E$ 是 Lebesgue 可测的，则 $\mathbb{R}^d\setminus E$ 是 Lebesgue 可测的。
    - 若 $E_1,E_2,\cdots\subset \mathbb{R}^d$ 是 Lebesgue 可测的，则 $\bigcup_{n=1}^\infty E_n$ 是 Lebesgue 可测的。
    - 若 $E_1,E_2,\cdots\subset \mathbb{R}^d$ 是 Lebesgue 可测的，则 $\bigcap_{n=1}^\infty E_n$ 是 Lebesgue 可测的。

!!! theorem "命题"
    设 $E\subset \mathbb{E}^d$，则如下命题等价：

    - $E$ Lebesgue 可测。
    - 对任意 $\varepsilon>0$，存在开集 $U\supset E$ 满足 $m^*(U\setminus E)\le \varepsilon$。
    - 对任意 $\varepsilon>0$，存在开集 $U$ 满足 $m^*(U\bigtriangleup E)\le \varepsilon$。
    - 对任意 $\varepsilon>0$，存在闭集 $F\subset E$ 满足 $m^*(E\setminus F)\le \varepsilon$。
    - 对任意 $\varepsilon>0$，存在闭集 $F$ 满足 $m^*(F\bigtriangleup E)\le \varepsilon$。
    - 对任意 $\varepsilon>0$，存在 Lebesgue 可测集 $E_\varepsilon$ 满足 $m^*(E_\varepsilon\bigtriangleup E)\le \varepsilon$。

!!! theorem "命题"
    任意 Jordan 可测集都是 Lebesgue 可测的。

!!! theorem "命题（Cantor set）"
    令 $I_0 := [0, 1]$ 为单位区间，$I_1 := [0, 1/3] \cup [2/3, 1]$ 为从 $I_0$ 中移除中间三分之一开区间后的集合，$I_2 := [0, 1/9] \cup [2/9, 1/3] \cup [2/3, 7/9] \cup [8/9, 1]$ 为从 $I_1$ 的每个区间中再移除中间三分之一开区间后的集合，依此类推。更形式化地，定义

    $$
    I_n := \bigcup_{a_1, \ldots, a_n \in \{0, 2\}} \left[ \sum_{i=1}^n \frac{a_i}{3^i}, \sum_{i=1}^n \frac{a_i}{3^i} + \frac{1}{3^n} \right].
    $$

    令 $C := \bigcap_{n=1}^{\infty} I_n$ 为所有初等集 $I_n$ 的交集。证明 $C$ 是紧的、不可数的且为零测集。

!!! problem "习题"
    证明 $[0,1)$ 不能写成可数个不交闭区间的并。更强地，不能写成闭集的并。

!!! theorem "引理"
    -

        $$
        m(\emptyset)=0
        $$

    - (可数可加性)若 $E_1,E_2,\cdots\subset \mathbb{R}^d$ 为可数个不交 Lebesgue 可测集，则

        $$
        m(\bigcup_{n=1}^\infty E_n)=\sum_{n=1}^\infty m(E_n)
        $$

!!! theorem "定理（单调收敛定理）"
    - 令 $E_1\subset E_2\subset \cdots \subset \mathbb{R}^d$ 为可数 Lebesgue 可测集，则

        $$
        m(\bigcup_{n=1}^\infty E_n)=\lim_{n\rightarrow \infty } m(E_n)
        $$

    - 令 $\mathbb{R}^d\supset E_1\supset E_2\supset \cdots$ 为可数 Lebesgue 可测集，且至少一个 $m(E_n)$ 是有限的，则

        $$
        m(\bigcap_{n=1}^\infty E_n)=\lim_{n\rightarrow \infty } m(E_n)
        $$

!!! theorem "命题（内部正则）"
    令 $E\subset \mathbb{R}^d$ 是 Lebesgue 可测集，则

    $$
    m(E)=\sup_{\substack{K\subset E\\ K \text{紧}}} m(K)
    $$

!!! theorem "命题（有限测度的性质）"
    令 $E\subset \mathbb{R}^d$，则如下命题等价：

    - $E$ 是 Lebesgue 可测集且测度有限。
    - 对任意 $\varepsilon>0$，存在有限测度的开集 $U\supset E$ 满足 $m^*(U\setminus E)\le \varepsilon$。
    - 对任意 $\varepsilon>0$，存在有界开集 $U$ 满足 $m^*(U\bigtriangleup E)\le \varepsilon$。
    - 对任意 $\varepsilon>0$，存在有限测度的紧集 $F\subset E$ 满足 $m^*(E\setminus F)\le \varepsilon$。
    - 对任意 $\varepsilon>0$，存在紧集 $F$ 满足 $m^*(F\bigtriangleup E)\le \varepsilon$。
    - 对任意 $\varepsilon>0$，存在有界 Lebesgue 可测集 $E_\varepsilon$ 满足 $m^*(E_\varepsilon\bigtriangleup E)\le \varepsilon$。
    - 对任意 $\varepsilon>0$，存在有限测度的 Lebesgue 可测集 $E_\varepsilon$ 满足 $m^*(E_\varepsilon\bigtriangleup E)\le \varepsilon$。
    - 对任意 $\varepsilon>0$，存在简单集合 $E'$ 满足 $m^*(E'\bigtriangleup E)\le \varepsilon$。
    - 对任意 $\varepsilon>0$，存在 $n$ 与有限个边长为 $2^{-n}$ 的闭长方体的并 $F$ 满足 $m^*(E\bigtriangleup F)\le \varepsilon$。

!!! theorem "命题"
    令 $E\subset \mathbb{R}^d$，则如下命题等价：

    - $E$ Lebesgue 可测。

    - 对任意简单集合 $A$，有

        $$
        m(A)=m^*(A\cap E)+m^*(A\setminus E)
        $$

    - 对任意长方体 $B$，有

        $$
        m(B)=m^*(B\cap E)+m^*(B\setminus E)
        $$

!!! theorem "定理"
    对有界集 $E\subset \mathbb{R}^d$，对任意简单集合 $A\supset E$，定义**Lebesgeu 内测度**

    $$
    m_*(E):=m(A)-m^*(A\setminus E)
    $$

!!! theorem "命题"
    - $m_*(E)$ 与 $A$ 的选取无关。
    - $m_*(E)\le m^*(E)$，取等当且仅当 $E$ Lebesgue 可测。

!!! definition "定义"
    记 $G_\delta$ 为所有可数个开集的交构成的集合，$F_\sigma$ 为所有可数个闭集的并构成的集合。

!!! theorem "命题"
    令 $E\subset \mathbb{R}^d$，则如下命题等价：

    - $E$ Lebesgue 可测。
    - $E$ 是 $G_\delta$ 集差掉一个零测集。
    - $E$ 是 $F_\sigma$ 集并上一个零测集。

!!! theorem "命题"
    设 $E\subset \mathbb{R}^d$ 为 Lebesgue 可测集，$T:\mathbb{R}^d\rightarrow {\mathbb{R}^d}$ 为线性变换，则

    - $T(E)$ Lebesgue 可测。
    - $m(T(E))=\left|\det T\right|m(E)$

!!! problem "习题（勒贝格测度的唯一性）"
    证明勒贝格测度 $E \mapsto m(E)$ 是唯一一个从 Lebesgue 可测集到 $[0, +\infty]$ 的映射，满足以下公理：

    - (空集)$m(\emptyset) = 0$。

    - (可数可加性)若 $E_1, E_2, \ldots \subset \mathbb{R}^d$ 是一列互不相交的 Lebesgue 可测集，则

        $$
        m\left( \bigcup_{n=1}^{\infty} E_n \right) = \sum_{n=1}^{\infty} m(E_n).
        $$

    - (平移不变性)若 $E$ 是 Lebesgue 可测集且 $x \in \mathbb{R}^d$，则 $m(E + x) = m(E)$。

    - (归一化)$m([0, 1]^d) = 1$。

!!! problem "习题（勒贝格测度作为简单测度的完备化）"
    本习题旨在说明勒贝格测度在某种意义下可视为简单测度的度量完备化。为避免技术细节，我们不在整个 $\mathbb{R}^d$ 中讨论，而是固定某个简单集 $A$（例如 $A = [0, 1]^d$）：

    - 令 $2^A := \{E : E \subset A\}$ 为 $A$ 的幂集。若两集合 $E, F \in 2^A$ 满足 $E \Delta F$ 是零测集，则称其等价。证明这是一个等价关系。

    - 令 $2^A / \sim$ 为 $2^A$ 关于上述等价关系的等价类集合，其中 $[E] := \{F \in 2^A : E \sim F\}$。定义两个等价类 $[E], [E']$ 之间的距离 $d : 2^A / \sim \times 2^A / \sim \rightarrow \mathbb{R}^+$ 为

        $$
        d([E], [E']) := m^*(E \Delta E').
        $$

        证明此距离是良定义的（即当 $[E] = [F]$ 且 $[E'] = [F']$ 时，$m(E \Delta E') = m(F \Delta F')$），并使得 $2^A / \sim$ 成为完备度量空间。

    - 令 $\mathcal{E} \subset 2^A$ 为 $A$ 的简单子集，$\mathcal{L} \subset 2^A$ 为 $A$ 的 Lebesgue 可测子集。证明 $\mathcal{L} / \sim$ 是 $\mathcal{E} / \sim$ 关于上述度量的闭包。特别地，$\mathcal{L} / \sim$ 是一个完备度量空间，且包含 $\mathcal{E} / \sim$ 作为其稠密子集；即 $\mathcal{L} / \sim$ 是 $\mathcal{E} / \sim$ 的度量完备化。

    - 证明 Lebesgue 测度 $m : \mathcal{L} \rightarrow \mathbb{R}^+$ 可降为连续函数 $m : \mathcal{L} / \sim \rightarrow \mathbb{R}^+$（仍记为 $m$）。进一步证明，$m : \mathcal{L} / \sim \rightarrow \mathbb{R}^+$ 是简单测度函数 $m : \mathcal{E} / \sim \rightarrow \mathbb{R}^+$ 到 $\mathcal{L} / \sim$ 的唯一连续延拓。

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/real-analysis.pdf){ .md-button download="real-analysis.pdf" }
