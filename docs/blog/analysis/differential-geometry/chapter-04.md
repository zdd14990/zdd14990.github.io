---
title: 第四章：微分形式的应用
date: 2025-11-19
updated: 2026-10-15
description: 微分几何笔记第四章：微分形式的应用、微分形式在物理中的应用、de Rham 上同调群。
hide:
  - navigation
categories:
  - 分析
tags:
  - analysis
---

# 第四章：微分形式的应用 { #top }

## 1. 微分形式的应用 { #s1 }

!!! definition "定义（分布的 Phaff 形式）"
    设 $D$ 为一个 $r$ 维分布，设局部存在 $\theta_a,a=1,2,\cdots,n-r\in A^1(\text{局部})$，使得在局部上

    $$
    D=\bigcap_{a=1}^{n-r}\ker\theta_a
    $$

    则称 $\theta_k=0,k=1,\cdots,n-r$ 为 $D$ 的 **Phaff 形式**，并称 $\theta_k$ 为 **Phaffian**。

!!! theorem "定理（Frobenius 定理）"
    如下命题等价：

    - $D$ 局部存在 $r$ 维正则积分流形。

    - $D$ 对合，即 $\forall X_a,X_b,a,b=1,2,\cdots,r,[X_a,X_b]\in \Gamma(\text{局部},D)$。

    - $\mathrm{d} \theta_a\Big|_D=0$，即 $\forall X,Y\in \Gamma(\text{局部},D)$，$\mathrm{d} \theta_a(X,Y)=0$。

    - $\exists \lambda_{ab}\in A^1(\text{局部})$，

        $$
        \mathrm{d} \theta_a=\sum_{b=1}^{n-r}\lambda_{ab}\theta_b
        $$

    - $\mathrm{d} \theta_a\land (\theta_1\land \cdots \land \theta_{n-r})=0\in A^{n-r+2}(\text{局部}),\forall a=1,2,\cdots,n-r$

??? proof "证明"
    $(1)\Longleftrightarrow (2)$：这是经典的 Frobenius 定理。

    $(2)\Longrightarrow (3)$：$\mathrm{d} \theta_a(X,Y)=X(\theta_a(Y))-Y(\theta_a(X))-\theta_a([X,Y])=0$。

    $(3)\Longrightarrow (2)$：$\forall X,Y\in D$，$\mathrm{d} \theta_a(X,Y)=0$，那么

    $$
    0=\mathrm{d} \theta_a(X,Y)=0-0-\theta_a([X,Y])
    $$

    这表明 $[X,Y]\in \ker \theta_a,\forall a=1,2,\cdots,n-r$，故 $[X,Y]\in D=\bigcap_{a=1}^{n-r}\ker\theta_a$。

    $(4)\Longrightarrow (3)$：$(\mathrm{d} \theta_a)(X,Y)=(\lambda_{ab}\land \theta_b)(X,Y)=\lambda_{ab}(X)\theta_b(Y)-\theta_b(X)\lambda_{ab}(Y)=0$

    $(3)\Longrightarrow (4)$：考虑局部地将 $\theta_a,a=1,2,\cdots,n-r$ 扩充为 $T^*M$ 的基。

    $$
    \begin{aligned}
    & \theta_1 & \cdots\quad & \theta_{n-r} & \theta_{n-r+1} &\quad \cdots & \theta_n\qquad & T^*M\text{的局部基} \\
    \text{对偶基}\quad & e_1      & \cdots \quad& e_{n-r}      & e_{n-r+1}      & \quad\cdots & e_n \qquad     & TM\text{的局部基}
    \end{aligned}
    $$

    任一个 $2-$形式 $\omega$ 局部可表示为

    $$
    \omega =\sum_{1\le b\le n-r} \lambda_{ab}\land \theta_b+\sum_{n-r+1\le a<b\le n} \mu_{ab}\theta_a\land \theta_b
    $$

    特别的，

    $$
    \mathrm{d} \theta_a=\sum_{1\le b\le n-r} \lambda_{ab}\land \theta_b+\sum_{n-r+1\le b<c\le n} \mu_{bc}\theta_b\land \theta_c,\forall a=1,2,\cdots,n-r
    $$

    具体的看 $\forall X,Y\in D$，

    $$
    \mathrm{d} \theta_a(X,Y)=\sum_{1\le b\le n-1}\lambda_{ab}\land \theta_b(X,Y)+\sum_{n-r+1\le b<c\le n}\mu_{bc}\theta_b\land \theta_c(X,Y)
    $$

    。取 $X,Y$ 为 $e_b,e_c\in D$，得 $\mathrm{d} \theta_a(e_b,e_c)=\mu_{bc}\cdot 1$，故 $\mu_{bc}=0$。

    $(4)\Longrightarrow (5)$：$\mathrm{d} \theta_a=\sum_{1\le b\le n-r}\lambda_{ab}\land \theta_b$，显然 $\mathrm{d} \theta_a\land(\theta_1\land \cdots \land \theta_{n-r})=0$。

    $(5)\Longrightarrow (4)$：$\mathrm{d} \theta_a\land(\theta_1\land \cdots\land\theta_{n-r})=(\sum \lambda_{ab}\land \theta_b+\sum \mu_{ab}\theta_b\land \theta_c)\land(\theta_1\land\cdots\land \theta_{n-r})$。由 $\theta_{n-r+1}\cdots\theta_n$ 的构造 $\theta_b\land \theta_c\land \theta_1\land\cdots\land \theta_{n-r}$ 局部为 $A^{n-r+2}$ 的一部分，从而线性独立，故 $\mu_{bc}=0,\forall b,c$。

## 2. 微分形式在物理中的应用 { #s2 }

本节中，我们将**通过习题的形式**，利用微分形式的语言，理解热力学定律。

考虑一个带有 $n$ 个封闭密室的热力学系统,密室中有理想气体，密室间由透热隔膜隔开。隔膜能传递热量但不能传递物质。对于第 $i$ 个封闭密室，平衡态下有如下的理想气体状态方程

$$
{p}_{i}{v}_{i} = {n}_{i}{R}_{i}{T}_{i},\;i = 1,2,\cdots ,n,
$$

这里 ${p}_{i},{v}_{i},{n}_{i},{R}_{i},{T}_{i}$ 分别代表压强，体积，物质的量，气体常数，温度。热平衡态下所有密室的温度均相同, 故整个系统的独立参数取值为一个 $\left( {n + 1}\right)$ 维流形 $M$ ，局部坐标函数可取为 $T,{v}_{1},\cdots ,{v}_{n}$。流形 $M$ 局部为欧氏空间的开集，但是整体的拓扑可能很复杂。

系统的内能 $U$ 定义为一个关于仅与 $T$ 有关的整体定义的函数 $U \in  {A}^{0}\left( M\right)$ ，且函数 $T \mapsto  U\left( T\right)$ 局部为微分同胚。因此流形 $M$ 的局部坐标可取为 ${v}_{0} \mathrel{\text{ := }} U,{v}_{1},\cdots ,{v}_{n}$。

一个准静态过程(每个瞬间都是热平衡态)为 $M$ 上一条光滑道路 $\gamma$ ，连接起点和终点的两个状态。非准静态过程可能包含不光滑甚至不连续的道路。

热力学的几大定律表示如下：

- 热力学第0定律：热平衡(作为密室间的关系)具有传递性。
- 热力学第1定律：能量守恒。
- 热力学第2定律：熵增原理：熵总是不减的。或等价地,一个准静态过程的热/功效率不能达到100%。
- 热力学第3定律：绝对零度不可达到。

!!! problem "习题"
    功形式(work form)和热形式(heat form)为 $M$ 上的微分形式 $\mathcal{W} \in  {A}^{1}\left( M\right) ,\mathcal{Q} \in  {A}^{1}\left( M\right)$ ，且物理学假设 $\mathcal{Q}$ 处处非零。局部坐标系下有

    $$
    \mathcal{W} = \mathop{\sum }\limits_{ {i = 1}}^{n}{p}_{i}\left( {U,{v}_{1},\cdots ,{v}_{n}}\right) d{v}_{i},\;\mathcal{Q} = \mathop{\sum }\limits_{ {i = 0}}^{n}{Q}_{i}\left( {U,{v}_{1},\cdots ,{v}_{n}}\right) d{v}_{i}.
    $$

    热力学第1定律为

    $$
    \mathcal{Q} - \mathcal{W} = {dU}
    $$

    设 $M$ 的某区域 $D$ 同胚于 ${\mathbb{R}}^{n + 1}$ 中的开球，考虑位于 $D$ 中的光滑道路。对于怎样的 $\mathcal{W},\mathcal{Q}$ ，线积分 ${\int }_{\gamma }\mathcal{W},{\int }_{\gamma }\mathcal{Q}$ 仅依赖于光滑道路的起点和终点,而不依赖于位于 $D$ 之中的光滑道路 $\gamma$ 的选取。

!!! problem "习题"
    考虑局部投影映射 $p : \left( { {v}_{0},{v}_{1},\cdots ,{v}_{n}}\right)  \mapsto  \left( { {v}_{1},\cdots ,{v}_{n}}\right)$ 。物理学假设存在一个 $n$ 维流形 $V$ 和映射 $\pi$ : $M \rightarrow  V$ 使得 $\pi$ 为淹没,且对任意 $v \in  V,{\pi }^{-1}\left( v\right)$ 连通，且局部 $p$ 在复合值域上的一个局部微分同胚之

    后 $p$ 和 $\pi$ 相同。我们将流形 $V$ 上的局部坐标记为 $v = \left( { {v}^{1},\cdots ,{v}^{n}}\right)$。

    证明对任意 $v \in  V,{\pi }^{-1}\left( v\right)$ 为一个 1 维流形。包含于 ${\pi }^{-1}\left( V\right)$ 中的光滑道路 $\gamma$ 被称为是等容过程。这里我们为了叙述上简单起见，假设 $\gamma$ 为嵌入映射，并在记号上将 $\operatorname{im}\gamma$ 与 $\gamma$ 写成一样。

    证明对于等容过程，${\left. {\mathcal{W}}^{1}\right| }_{\gamma } = 0 \in  {A}^{1}\left( \gamma \right) ,{\left. dU\right| }_{\gamma } \neq  0 \in  {A}^{1}\left( \gamma \right)$ ，进而说明 $U$ 为 ${\pi }^{-1}\left( v\right)$ 上的整体定义的坐标函数。

!!! problem "习题"
    称一个准静态过程为准静态绝热过程，若相应的光滑道路 $\gamma$ 满足 ${\left. \mathcal{Q}\right| }_{\gamma } = 0 \in  {A}^{1}\left( \gamma \right)$ 。

    热力学第2定律的Kevin表述为：不存在一个准静态循环过程使得热量完全被转化成了机械能. 利用道路的语言,即不存在具有同样起点终点的光滑道路 ${\gamma }_{1},{\gamma }_{2}$ 使得

    $$
    {\int }_{ {\gamma }_{2}}\mathcal{W} = {\int }_{ {\gamma }_{1}}\mathcal{Q}
    $$

    热力学第2定律的Caratheodory表述为：对于任一点 $p \in  M$ 均存在一个点 $q \in  M$ 使得 $q$ 不能通过 $p$ 由准静态绝热过程实现。利用道路的语言，即对于任一点 $p \in  M$ 均存在一个点 $q \in  M$，使得不存在连接 $p$ 至 $q$ 的光滑道路 $\gamma$ 使得

    $$
    {\left. Q\right| }_{\gamma } = 0 \in  {A}^{1}\left( \gamma \right) .
    $$

    证明 Kevin 表述可以推出 Caratheodory 表述。

!!! problem "习题"
    数学上有如下的 Caratheodory 定理：设 $m$ 维流形 $M$ 上的 $\theta  \in  {A}^{1}\left( M\right)$ 定义的 $m - 1$ 维分布 $\ker \theta  = D$ 不是完全可积的，即存在 $p \in  M$ 使得 ${\left. \left( d\theta  \land  \theta \right) \right| }_{p} \neq  0$ 。那么存在 $p$ 的邻域 $B$ 使得 $B$ 中的任意一点 $q$ 均可以通过分段光滑的积分曲线与 $p$ 连接 (从而分段光滑的积分流形维数大于分布 $D$ 的维数)。

    那么热力学第2定律的 Caratheodory 表述可以大致叙述为 $\mathcal{Q}$ 定义的分布 $\ker \mathcal{Q}$ 是完全可积的。

    不利用 Caratheodory 定理，直接说明当系统中仅有一个密室时，$\ker \mathcal{Q}$ 确实是完全可积的。

!!! problem "习题"
    利用 Frobenius 定理知对于完全可积的分布 $\ker {\mathcal{Q}}_{r}$ 局部存在正则的积分流形 $W$ 使得在 $M$ 的某个局部坐标系 ${x}^{1},\cdots {x}^{n},{x}^{0}$ 下，$W$ 局部由正则子流形 ${x}^{0} = {c}^{0}$ 给出。此时在 $M$ 上局部存在函数 $f$ ，使得局部有 $Q = {fd}{x}^{0}$ 。

    物理学假设存在整体函数 $\mathrm{T},\mathrm{S} \in  {A}^{0}\left( M\right)$ 使得 $\mathcal{Q} = \mathrm{T}d\mathrm{\;S}$ ；函数 $\mathrm{S}$ 还满足对于等容过程有 ${\left. \mathrm{S}\right| }_{ {\pi }^{-1}\left( v\right) } = U$ 。 称T为绝对温度，S为熵。

    基于前面的热力学第0，1，2定律的微分形式表述和物理学假设，说明函数T满足 $\mathrm{T} > 0$ 。

    说明对于准静态绝热过程 $\gamma ,\mathrm{S}$ 是不变的。

## 3. de Rham 上同调群 { #s3 }

!!! definition "定义"
    设 $M$ 是流形，由于 $\mathrm{d} :A^r(M)\rightarrow A^{r+1}(M)$ 是线性的，其 $\ker$ 与 $\mathrm{Im}$ 也自然线性，定义：

    $$
    \begin{aligned}
    \mathcal{Z}^{r}(M)&=\operatorname{Ker}\left(\mathrm{d} : A^{r}(M) \rightarrow A^{r+1}(M)\right)=\{\text { closed } r \text {-forms on } M\},\\
    \mathcal{B}^{r}(M)&=\operatorname{Im}\left(\mathrm{d} : A^{r-1}(M) \rightarrow A^{r}(M)\right)=\{\text { exact } r \text {-forms on } M\} .
    \end{aligned}
    $$

    这里我们约定，当 $r<0$ 或 $r>n=\dim M$ 时，$A^r(M)$ 是零空间，故 $\mathcal{B}^0(M)=0$，$\mathcal{Z}^n(M)=A^r(M)$。

    注意到任意恰当形式均为闭形式，$\mathcal{B}^{r}(M)\subseteq \mathcal{Z}^{r}(M)$，这表明可以定义如下商空间：

    $$
    H_{\mathrm{dR}}^r(M)=\frac{\mathcal{Z}^{r}(M)}{\mathcal{B}^{r}(M)}
    $$

    称为 $M$ 的 **de Rham 上同调群**。

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/differential-geometry-notes.pdf){ .md-button download="differential-geometry-notes.pdf" }
