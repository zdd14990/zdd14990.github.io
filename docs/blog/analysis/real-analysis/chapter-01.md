---
title: 第一章：前言：Jordan 测度与 Riemann 积分
date: 2025-11-19
updated: 2026-10-15
description: 实分析笔记第一章：简单测度、Jordan 测度。
hide:
  - navigation
categories:
  - 分析
tags:
  - measure-theory
---

# 第一章：前言：Jordan 测度与 Riemann 积分 { #top }

## 1. 简单测度 { #s1 }

在 Jordan 测度前，我们先考虑更简单的情形，即简单集合。

!!! definition "定义"
    一个**区间(interval)**为 $\mathbb{R}$ 的子集，形如 $[a,b],[a,b),(a,b],(a,b)$，定义区间 $I$ 的长度 $\left|I\right|:=b-a$。$\mathbb{R}^d$ 上的**长方体(box)**为 $B:=I_1\times \cdots I_d$，其中 $I_i$ 均为区间，定义长方体 $B$ 的体积 $\left|B\right|:=\left|I\right|\times \cdots \times \left|I_d\right|$。一个**简单集合(elementary set)** 为 $\mathbb{R}^d$ 中有限长方体的并。

!!! theorem "命题（Boolean closure）"
    简单集合的并、交、差、对称差、平移均为简单集合。

!!! theorem "引理"
    设 $E\subset \mathbb{R}^d$ 是简单集合。

    - $E$ 可以写成有限个不交的长方体的并。
    - 设 $E=B_1\cup\cdots \cup B_k$ 为不交并，定义 $m(E):=\left| B_1\right|+\cdots+\left|B_k\right|$ 与 $B_i$ 的选取无关。

!!! theorem "命题"
    对简单集合 $E\subset \mathbb{R}^d$，有

    $$
    m(E)=\lim_{N\rightarrow \infty}\frac{1}{N^d}\#\left\{E\cap \frac{1}{N}\mathbb{Z}^d\right\}
    $$

!!! theorem "命题"
    - (非负性)

        $$
        m(E)\ge 0
        $$

    - (有限可加性)对不交的简单集合 $E_1,\cdots,E_k$，

        $$
        m(E_1\cup\cdots\cup E_k)=m(E_1)+\cdots+m(E_k)
        $$

    - (单调性) $E\subset F$，则

        $$
        m(E)\le m(F)
        $$

    - (有限次可加性)对任意简单集合 $E_1,\cdots,E_k$，

        $$
        m(E_1\cup\cdots\cup E_k)\le m(E_1)+\cdots+m(E_k)
        $$

    - (平移不变性)

        $$
        m(E+x)=m(E)
        $$

!!! problem "习题（简单测度的唯一性）"
    设 $d \geq 1$。令 $m': \mathcal{E}(\mathbf{R}^d) \to \mathbf{R}^+$ 为一个从 $\mathbf{R}^d$ 的简单集合族 $\mathcal{E}(\mathbf{R}^d)$ 到非负实数的映射，且满足非负性、有限可加性及平移不变性。证明存在常数 $c \in \mathbf{R}^+$ 使得对所有简单集合 $E$，有 $m'(E) = c \cdot m(E)$。特别地，若附加归一化条件 $m'([0,1)^d) = 1$，则 $m' \equiv m$。

    **提示**：设 $c := m'([0,1)^d)$，并对任意正整数 $n$ 计算 $m'([0, \frac{1}{n})^d)$。

## 2. Jordan 测度 { #s2 }

!!! definition "定义（Jordan测度）"
    设 $E \subset \mathbb{R}^d$ 为有界集。

    - $E$ 的**Jordan 内测度** $m_{*,(J)}(E)$ 定义为

        $$
        m_{*,(J)}(E) := \sup_{\substack{A \subset E \\ A \text{ 为简单集}}} m(A).
        $$

    - $E$ 的**Jordan 外测度** $m^{*,(J)}(E)$ 定义为

        $$
        m^{*,(J)}(E) := \inf_{\substack{B \supset E \\ B \text{ 为简单集}}} m(B).
        $$

    - 若 $m_{*,(J)}(E) = m^{*,(J)}(E)$，则称 $E$ 是**Jordan 可测的**，并称 $m(E) := m_{*,(J)}(E) = m^{*,(J)}(E)$ 为 $E$ 的**Jordan 测度** 。类似地，当需强调维数 $d$ 时，记 $m(E)$ 为 $m^d(E)$。

!!! theorem "命题（Jordan可测性的等价刻画）"
    设 $E \subset \mathbb{R}^d$ 为有界集。证明以下命题等价：

    - $E$ 是 Jordan 可测的。

    - 对任意 $\varepsilon > 0$，存在简单集合 $A \subset E \subset B$ 使得

        $$
        m(B \setminus A) \leq \varepsilon.
        $$

    - 对任意 $\varepsilon > 0$，存在简单集合 $A$ 使得

        $$
        m^{*,(J)}(A \Delta E) \leq \varepsilon,
        $$

!!! theorem "命题"
    设 $E,F\subset \mathbb{R}^d$ 为 Jordan 可测集。

    - 两者的并、交、差、对称差均 Jordan 可测。
    - Jordan 测度 $m$ 满足非负性、有限可加性、单调性、有限次可加性、平移不变性。

!!! problem "习题"
    - $\mathbb{R}$ 上的三角形是 Jordan 可测的。
    - $\mathbb{R}^d$ 上的紧凸多面体是 Jordan 可测的。
    - $\mathbb{R}^d$ 上的开球和闭球都是 Jordan 可测的。

!!! theorem "命题"
    对线性变换 $L:\mathbb{R}^d\rightarrow \mathbb{R}^d$，

    $$
    m(L(E))=\left|\det L\right|m(E)
    $$

!!! definition "定义"
    Jordan 测度为零的集合称为**Jordan 零测集**。

!!! theorem "命题"
    Jordan 零测集的子集也是 Jordan 零测集。

!!! problem "习题"
    定义**二分立方体**为如下形式的半开长方体：

    $$
    \left[ \frac{i_1}{2^n}, \frac{i_1 + 1}{2^n} \right) \times \ldots \times \left[ \frac{i_d}{2^n}, \frac{i_d + 1}{2^n} \right)
    $$

    其中 $n, i_1, \ldots, i_d$ 为整数。设 $E \subset \mathbb{R}^d$ 为有界集。对每个整数 $n$，令 $\mathcal{E}_*(E, 2^{-n})$ 表示包含于 $E$ 内且边长为 $2^{-n}$ 的二分立方体的个数，并令 $\mathcal{E}^*(E, 2^{-n})$ 表示与 $E$ 相交且边长为 $2^{-n}$ 的二分立方体的个数。证明 $E$ 是 Jordan 可测的当且仅当

    $$
    \lim_{n \to \infty} 2^{-dn} \left( \mathcal{E}^*(E, 2^{-n}) - \mathcal{E}_*(E, 2^{-n}) \right) = 0,
    $$

    此时成立

    $$
    m(E) = \lim_{n \to \infty} 2^{-dn} \mathcal{E}_*(E, 2^{-n}) = \lim_{n \to \infty} 2^{-dn} \mathcal{E}^*(E, 2^{-n}).
    $$

!!! problem "习题（Jordan测度的唯一性）"
    设 $d \geq 1$。令 $m': \mathcal{J}(\mathbf{R}^d) \to \mathbf{R}^+$ 为一个从 $\mathbf{R}^d$ 的 Jordan 可测子集族 $\mathcal{J}(\mathbf{R}^d)$ 到非负实数的映射，且满足非负性、有限可加性及平移不变性。证明存在常数 $c \in \mathbf{R}^+$ 使得对所有 Jordan 可测集 $E$，有 $m'(E) = c \cdot m(E)$。特别地，若附加归一化条件 $m'([0, 1)^d) = 1$，则 $m' \equiv m$。

!!! theorem "命题"
    设 $E\subset \mathbb{R}^d$ 为有界集。

    - $E$ 的闭包 $\overline{E}$ 与 $E$ Jordan 外测度相同。
    - $E$ 的内部 $E^\circ$ 与 $E$ Jordan 内测度相同。
    - $E$ 是 Jordan 可测的当且仅当边界 $\partial E$ 的 Jordan 外测度为 $0$。

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/real-analysis.pdf){ .md-button download="real-analysis.pdf" }
