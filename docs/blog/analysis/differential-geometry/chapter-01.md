---
title: 第一章：微分流形与切向量
date: 2025-11-19
updated: 2026-10-15
description: 微分几何笔记第一章：微分流形、切向量。
hide:
  - navigation
categories:
  - 分析
tags:
  - differential-geometry
---

# 第一章：微分流形与切向量 { #top }

## 1. 微分流形 { #s1 }

!!! definition "定义"
    设 $M$ 是一个第二可数的 Hausdorff 空间，满足对任意 $p\in M$，都存在包含 $p$ 的开集 $U$，使得 $U$	与 $\mathbb{R}^n$ 中的开集同胚，则称 $M$ 是一个 **$n$ 维拓扑流形**。

于是我们可以这样描述流形：局部欧氏的 Hausdroff 空间，其上任意一点 $p$，都存在 $(U,\varphi_U)$，这称为 $p$ 附近的**局部图(chart)**，$\left\{x^i=\pi^i\circ \varphi:U\rightarrow \mathbb{R}\right\}$ 称为**局部坐标**，对所有覆盖了 $M$ 的局部图($\bigcup U=M$)构成的集合 $\mathscr{D}=\left\{(U,\varphi_U)\right\}$ 称为 $M$ 的一个**局部图册(atlas)**。对于两个局部图 $(U,\varphi_U),(V,\phi_V)$，我们能得到 $\mathbb{R}^n$ 中两个开集的同胚：

$$
\phi_V\circ \varphi_U^{-1}:\varphi_U(U\cap V)\rightarrow \phi_V(U\cap V)
$$

这称为**转移函数**。

对于 $M$ 的开集 $N$，我们可以自然地构造 $N$ 的局部图册：$\left\{(U\cap N,\varphi_U|_{U\cap N}\right\}$，从而得到 $N$ 也是拓扑流形，称为 $M$ 的**开子流形**。

对于两个流形 $M_1,M_2$，我们可以用笛卡尔积构造局部图册：$\left\{(U\times V,\varphi_U\times \phi_V)\right\}$，从而得到 $M_1\times M_2$ 也是拓扑流形，称为**乘积流形**。

对于 $M$ 上的等价关系 $\sim$，我们可以得到**商流形**。

拓扑的性质不足以在流形上定义微分与积分，我们对局部图册提高一点要求：

!!! definition "定义"
    如果一个流形 $M$ 的两个局部图之间的转移函数是微分同胚，则称这两个局部图是**相容的**。

!!! definition "定义"
    如果 $M$ 的局部图册 $\mathscr{D}$ 任两局部图相容，且 $\mathscr{D}$ 是最大的，则称 $\mathscr{D}$ 是 $M$ 的一个**微分结构**。称装备了微分结构的拓扑流形为**微分流形**。

考虑微分流形之间的映射。

!!! definition "定义"
    $f:M\rightarrow N$ 是同胚，称 $f$ 为 **$C^k$ 映射**，若对 $M,N$ 任意局部图 $(U,\varphi_U),(V,\phi_V)$，都有 $\phi_V \circ f\circ \varphi_U ^{-1}:\varphi_U(U)\rightarrow \phi_V(V)$ 是 $C^k$ 的。类似的有**光滑映射**。

当 $M=\mathbb{R}$ 时，我们称 $f$ 为**光滑曲线**，当 $N=\mathbb{R}$ 时，我们称 $f$ 为**光滑函数**。

## 2. 切向量 { #s2 }

回忆我们在分析课中所学的，$\mathbb{R}^n$ 上我们定义函数 $f$ 对 $v$ 的方向导数为

$$
D_{v} f(x)=\lim _{h \rightarrow 0} \frac{f(x+h v)-f(x)}{h}=\left.\frac{\mathrm{d}}{\mathrm{d} t}\right|_{t=0} f(x+t v)
$$

这给出了一个算子 $D^x_v:C^\infty(\mathbb{R}^n)\rightarrow \mathbb{R},f\mapsto D_vf(x)$。若设 $v=(v^1,\cdots,v^n)$，则有

$$
D^a_v=\sum^n_{i=1}v^i\left.\frac{\partial}{\partial x^i}\right|_{x=a}
$$

容易证明 $D^x_v$ 是线性的且满足 Leibniz 法则：

$$
D^x_v(fg)=f(x)D^x_vg+g(x)D^x_vf
$$

而反过来的命题依然成立，即：若线性算子 $D:C^\infty(\mathbb{R}^n)\rightarrow\mathbb{R}$ 满足在 $x$ 处的 Leibniz 法则，则存在 $v\in \mathbb{R}^n$，$D=D^x_v$。

对于 $\mathbb{R}^n$ 中任一点，任何 $v\in \mathbb{R}^n$ 都可视为这个点的切向量，并且对应一个唯一的算子。而在流形 $M$ 上，直观的向量已经并不存在，但 $\mathbb{R}^n$ 中的情形启发了我们去代数地定义流形 $M$ 上的切向量，即上文中算子的定义：

!!! definition "定义"
    记 $C^{\infty}_p(M)$ 是 $p\in M$ 处局部光滑的函数全体。若线性映射 $v:C^{\infty}_p(M)\rightarrow \mathbb{R}$ 满足 Leibniz 法则 $v(fg)=f(p)v(g)+g(p)v(f)$，则称 $v$ 是 $M$ 在点 $p$ 的一个**切向量**。

容易验证在一点处切向量的全体构成线性空间，记为 $T_pM$，称为 $M$ 在 $p$ 点的**切空间**。

另一个较为直观的定义是由光滑曲线给出的。

!!! definition "定义"
    设 $\gamma:(-\epsilon,\epsilon)\rightarrow M$ 是光滑流形 $M$ 上一条光滑曲线，$\gamma(0)=p$。定义映射 $v:C^{\infty}_p(M)\rightarrow \mathbb{R}$ 为

    $$
    v(f)=\left.\frac{\mathrm{d}(f\circ \gamma)(t)}{\mathrm{d} t}\right|_{t=0}
    $$

    容易验证这是一个切向量，称为**光滑曲线 $\gamma$ 在 $0$ 处的切向量**，记为 $\gamma'(0)$。

我们可以证明这两种定义在某种意义上是等价的，具体而言，定义光滑曲线上的等价关系 $\gamma ~ \tilde{\gamma}$ 当且仅当 $\gamma'(0) \sim\tilde{\gamma}'(0)$，得到的等价类与切向量是一一对应的。此时称 $\gamma$ 与 $\tilde{\gamma}$ **相切**。

!!! theorem "定理"
    设 $M$ 为 $n$ 维光滑流形，$p\in M$，对应的局部图为 $(U,\varphi)$。定义**偏微分算子**：

    $$
    \frac{\partial}{\partial x^i}(f)=\frac{\partial(f\circ \varphi ^{-1})}{\partial x^i}\Big|_{\varphi(p)}
    $$

    则 $\dim T_pM=n$，以 $\left\{\dfrac{\partial}{\partial x^i}\right\}$ 为一组基，也被称为切空间的**自然基底**。

对任意的 $v=\displaystyle\sum_{i=1}^n v^i \frac{\partial}{\partial x^i}\in T_pM$，取 $\gamma(t)=\varphi^{-1}(p^1+tv^1,\cdots,p^n+tv^n)$，易证 $\gamma'(0)=v$。从而任意切向量都可以被表示为曲线的切向量。

!!! definition "定义"
    称线性空间 $T_pM$ 的线性对偶为**余切空间**，记作 $T_p^*M$。

!!! definition "定义"
    设 $M,N$ 是光滑流形，$F:M\rightarrow N$ 是光滑映射，$p\in M$，$q=F(p)\in N$，映射 $F_*:T_pM\rightarrow T_qN$ 定义为：($F_*$ 是 $F$ 的拉回)

    $$
    (F_*v)(f)=v(F^*f)=v(f\circ F),\forall f\in C^\infty_q(N)
    $$

    称为 $F$ 在点 $p$ 的切映射。

容易验证 $F_*$ 是线性的且满足 $(G\circ F)_*=G_*\circ F_*$。考虑 $F:\mathbb{R}^m\rightarrow \mathbb{R}^n$ 即为映射的微分 $\mathrm{d} f$。从中我们可以看到切映射将流形之间的映射变成线性空间之间的映射，进一步我们有：

!!! theorem "定理"
    若 $F:M\rightarrow N$ 是微分同胚，则 $F_*:T_pM\rightarrow T_{F(p)}N$ 是线性同构。

在微积分中我们知道 $\mathbb{R}^n$ 中切空间的线性同构可以导出微分同胚，在流形上我们只有较弱的结论成立，即只有局部微分同胚：

!!! theorem "定理（反函数定理）"
    设 $F:M\rightarrow N$ 是光滑映射，$F_*:T_pM\rightarrow T_{F(p)}N$ 是线性同构，则存在 $p$ 的邻域 $U_1$ 和 $q=F(p)$ 的邻域 $V_1$ 使得 $\left.F\right|_{U_1}:U_1\rightarrow V_1$ 是微分同胚。

!!! definition "定义"
    设 $M,N$ 是 $C^K$ 流形，$f:M\rightarrow N$ 是 $C^l$ 的$(l\le k)$，$p\in M$，分别取 $p$，$f(p)$ 的局部图 $(U,\varphi)$，$(V,\phi)$，称 $\phi \circ f\circ \varphi ^{-1}$ 在 $\varphi(p)$ 处的秩为**映射 $f$ 在 $p$ 点的秩**。

由于 $\tilde{\phi}\circ f\circ \tilde{\varphi}=(\tilde{\phi}\circ\phi^{-1})(\phi\circ f\circ \varphi^{-1})(\varphi \circ\tilde{\varphi})$，故秩与局部图的选取无关，记为 $\left.\mathrm{rank} f\right|_p$。注意到，当 $\left.\mathrm{rank} f\right|_p=\dim M$ 时，$f_*$ 是单射，这时称 $f$ 在 $p$ 点是**浸入(immersion)**。当 $\left.\mathrm{rank} f\right|_p=\dim N$ 时，$f_*$ 是满射，这时称 $f$ 在 $p$ 点是**淹没(submersion)**。根据定义，一个微分同胚既是浸入又是淹没。

**典范淹没**：$\pi: \mathbb{R}^{m} \rightarrow \mathbb{R}^{n},\left(x_{1}, \cdots, x_{m}\right) \mapsto\left(x_{1}, \cdots, x_{n}\right)$。

**典范浸入**：$\iota: \mathbb{R}^{m} \rightarrow \mathbb{R}^{n},\left(x_{1}, \cdots, x_{m}\right) \mapsto\left(x_{1}, \cdots, x_{m},0,\cdots,0\right)$。

下面给出一个非常重要的定理，它告诉我们流形之间的常秩映射都与典范情形没有区别。

!!! theorem "定理（秩定理）"
    设 $f:M\rightarrow N$ 是点 $p$ 附近一个秩为 $r$ 的常秩映射，则存在 $p,f(p)$ 的局部图 $(U,\varphi),(V,\phi)$ 使得

    $$
    \phi \circ f\circ\varphi^{-1}(x^1,\cdots,x^m)=(x^1,\cdots,x^r,0,\cdots,0)
    $$

!!! definition "定义"
    设 $N$ 是流形且是闭集，$N'\hookrightarrow N$ 为包含映射，在 $N'$ 上赋予子空间拓扑。若 $\exists m\le n$ 使得 $\forall q\in N'$，$\exists N$ 上含 $q$ 的局部图 $(V,\phi ,y)$ 满足 $\phi(q)=0$ 且

    $$
    \phi(V\cap N')=\left\{(y^1,\cdots,y^n)\in \phi(V)|y^{m+1}=\cdots=y^n=0\right\}
    $$

    则称 $N'$ 为 $N$ 的**正则子流形**。

!!! definition "定义"
    设 $f:M\rightarrow N$ 为单浸入，则称 $f(M)$ 为**单浸入子流形**。

    设 $f:M\rightarrow N$ 为单浸入，且 $f(M)$ 由 $f$ 诱导的拓扑结构与由 $N$ 诱导的子拓扑结构同胚，则称 $f(M)$ 为 $N$ 的**嵌入子流形**。

!!! theorem "定理"
    $f(M)$ 为 $N$ 的嵌入子流形当且仅当 $f(M)\hookrightarrow N$ 为正则子流形。

!!! theorem "定理（Whitney嵌入定理）"
    任何 $m$ 维光滑流形可以被嵌入 $\mathbb{R}^{2m+1}$，和被浸入 $\mathbb{R}^{2m}$。

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/differential-geometry-notes.pdf){ .md-button download="differential-geometry-notes.pdf" }
