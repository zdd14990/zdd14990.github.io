---
title: 第二章：特殊函数构造、向量场与李群
date: 2025-11-19
updated: 2026-10-15
description: 微分几何笔记第二章：流形的特殊函数构造、向量场、李群和李代数、单参数变换群。
hide:
  - navigation
categories:
  - 分析
tags:
  - differential-geometry
  - lie-groups
---

# 第二章：特殊函数构造、向量场与李群 { #top }

## 1. 流形的特殊函数构造 { #s1 }

!!! theorem "定理（Bump function）"
    $C\subset \mathbb{R}^n$ 闭，$K\subset \mathbb{R}^n$ 紧，$K\cap C=\emptyset$，那么存在 $C^\infty$ 函数 $\rho:\mathbb{R}^n\rightarrow [0,1],\left.\rho\right|_K\equiv 1,\left.\rho\right|_C\equiv 0$

??? proof "证明"
    略。

!!! theorem "推论"
    若 $f:U\rightarrow \mathbb{R}\in C^k$，$p\in U$，则存在 $p\in U_0\subseteq U$，$f^*:\mathbb{R}^n\rightarrow \mathbb{R}$，$\left.f^*\right|_{U_0}=\left.f\right|_{U_0}$，$\left.f^*\right|_{U^C}=0$。

!!! definition "定义"
    设 $M$ 是拓扑空间。

    - 设 $\left\{A_\alpha\right\},\left\{B_\beta\right\}$ 为 $M$ 的开覆盖，若 $\forall \beta,\exists \alpha$ 使得 $B_\beta\subseteq A_\alpha$，称 $\left\{B_\beta\right\}$ 是 $\left\{A_\alpha\right\}$ 的**加细**。
    - 设 $U=\left\{U_\alpha\right\}$ 为 $M$ 的开覆盖，若 $\forall p\in M$，存在 $p\in W$，使得 $W$ 仅与 $U$ 中有限个元素相交，称 $U$ 为**局部有限的**。

!!! theorem "引理"
    设 $M$ 为 $C^k-$流形，$\left\{A_\alpha\right\}$ 为开覆盖，那么存在可数坐标图 $\left\{\varphi_i:U_i\rightarrow \mathbb{R}^n\right\}$ 满足：

    - $\left\{U_i\right\}$ 是 $\left\{A_\alpha\right\}$ 局部有限的加细。
    - $\varphi_i(U_i)=B_1(0)$。
    - $\left\{V_i:=\varphi^{-1}(B_{\frac{1}{2}}(0))\right\}$ 也为开覆盖。

!!! definition "定义"
    称上述引理得到的 $\left\{A_\alpha\right\}$ 之局部有限加细 $(U_i,\varphi_i,V_i)$ 为从属于 $\left\{A_\alpha\right\}$ 的**正则覆盖**。

!!! definition "定义（单位分解）"
    若 $\eta_i\in C^k(M,\mathbb{R}),i\in \mathbb{N}$ 满足：

    - $0\le \eta_i\le 1$
    - $\sum \eta_i=1$
    - $\left\{\mathrm{supp}\eta_i=\left\{\eta_i\neq 0\right\}\right\}$ 为局部有限开覆盖。

    则称 $\left\{\eta_i\right\}$ 为 $M$ 上一个 $C^k$ **单位分解**。

    若 $\left\{A_\alpha\right\}$ 为开覆盖，$\forall i$，$\exists A_\alpha$ 使得 $\mathrm{supp}\eta_i\subseteq A_\alpha$ 则称 $\left\{\eta_i\right\}$ 为**从属于 $\left\{A_\alpha\right\}$ 的单位分解**。

!!! theorem "定理（单位分解）"
    设 $M$ 是 $C^k$ 流形，有可数基，$(U_i,\varphi_i,V_i)$ 为局部有限正则覆盖，那么

    - 存在单位分解 $\left\{\eta_i\right\}$ 使得 $\left.\eta_i\right|_{V_i}>0$ 且 $\mathrm{supp}\eta_i\subseteq \varphi_i^{-1}(B_{\frac{3}{4}}(0))$。
    - 特别的，对任意开覆盖 $\left\{A_\alpha\right\}$ 均有从属于其的单位分解 $\left\{\eta_i\right\}$。

??? proof "证明"
    构造 Bump function $h_i$ 使得

    $$
    \left.h_i\right|_{\bar{V_i}}\equiv 1,\left.h_i\right|_{\varphi_i^{-1}(B_{\frac{3}{4}}(0))^C}\equiv 0
    $$

    取

    $$
    \eta=\frac{h_i}{\sum h_i}
    $$

    由于 $\left\{U_i\right\}$ 为局部有限覆盖，$\mathrm{supp}h_i\subseteq U_i$，从而 $\sum h_i$ 有意义。

!!! theorem "命题"
    设 $M$ 是 $C^k$ 流形，$M$ 紧，则存在 $N\in \mathbb{N}$ 和映射 $f:M\rightarrow \mathbb{R}^N$ 使得 $f$ 为嵌入，从而 $f(M)$ 是 $\mathbb{R}^N$ 的正则子流形。

??? proof "证明"
    先证明如下引理:

    !!! theorem "引理"
        设 $f:M\rightarrow N$ 是单浸入，若 $M$ 紧，则 $f$ 为嵌入。

    ??? proof "Lemma's proof"
        对于任意闭集 $V\subset M$，由于紧集的闭子集是紧集，$V$ 是紧集，由 $f$ 连续知 $f(V)\subset N$ 是紧集，而 $N$ 是 Hausdorff 空间，因此 $f(V)\subset N$ 是闭集，所以 $f$ 是闭映射，因此 $f$ 是同胚，进而 $f$ 是嵌入。

    对 $M$ 取局部有限正则覆盖 $\left\{U_i,\varphi_i,V_i\right\}$，由 $M$ 紧可知 $\left\{U_i,\varphi_i,V_i\right\}_{i=1}^K$ 是有限正则覆盖。构造单位分解

    $$
    \eta_i=\frac{h_i}{\sum h_i}:M\rightarrow [0,1],V_i\subseteq \mathrm{supp}h_i\subseteq U_i,\left.h_i\right|_{V_i}\equiv 1
    $$

    现取

    $$
    f:M\rightarrow \mathbb{R}^{kn+k},p\mapsto (h_1(p)\varphi_1(p),\cdots,h_k(p)\varphi_k(p),h_1(p),\cdots,h_k(p))
    $$

    只需证 $f\in C^k$ 且 $f$ 是单浸入，利用引理即证。读者自行验证不难。

## 2. 向量场 { #s2 }

接下来我们讨论更高一级的事物：向量场。令

$$
TM=\bigcup_{p\in M}T_pM
$$

为光滑流形 $M$ 所有切向量的集合。如果我们将 $TM$ 看作所有 $p\in M,v\in T_pM$ 的 $(p,v)$ 构成的集合，则 $TM$ 是光滑流形且 $\dim TM=2\dim M$，这称为 $M$ 上的**切丛**，$T_pM$ 称为 $TM$ 在 $p$ 处的**纤维**，同理可以定义**余切丛** $T_p^*M$。**切向量场** $X$ 指的是一个映射 $X:M\rightarrow TM$，对每个 $p\in M$，$X(p)\in T_pM$，即对每个 $M$ 上的点选取了一个切向量。

记 $\Gamma(M,TM)$ 为 $M$ 上所有切向量场的全体，$\Gamma(U,TM)$ 为 $U$ 上所有切向量场的全体。

由于 $TM$ 是光滑流形，故切向量场其实是两个光滑流形间的映射，对 $M$ 中开集 $U$，若切向量场 $X:U\rightarrow TM$ 满足 $X$ 是流形间的光滑映射且 $\pi\circ X=\mathrm{id}_U$，其中 $\pi:TM\rightarrow M,(p,v)\mapsto p$ 是投影映射，则称 $X$ 是**光滑切向量场**，也称这样的映射 $X$ 为切丛 $TM$ 的一个**截面**。

对切向量场 $X:U\rightarrow TM$ 可以考虑它对光滑函数的作用。对 $f\in C^{\infty}(U)$，定义

$$
X(f)(p)=X(p)(f),\forall p\in U
$$

则 $X(f):U\rightarrow \mathbb{R}$。容易看到 $X$ 是光滑切向量场当且仅当 $X(f)\in C^{\infty}(U),\forall f\in C^{\infty}(U)$，即 $X$ 为 $C^{\infty}(U)$ 之间的映射。

!!! theorem "定理"
    $X:U\rightarrow TM$ 是光滑切向量场当且仅当 $\forall p\in U$，$X(p)$ 在局部坐标下的分量是光滑函数。

反过来，我们对 $C^{\infty}(M)\rightarrow C^{\infty}(M)$ 的映射 $X$ 可以用 $X(p)(f)=X(f)(p)$ 诱导光滑切向量场，具体而言：

!!! theorem "定理"
    设 $\alpha :C^{\infty}(M)\rightarrow C^{\infty}(M)$ 为线性映射且满足 Leibniz 法则 $\alpha(fg)=f\alpha(g)+g\alpha(f)$，则存在唯一的光滑切向量场 $X:M\rightarrow TM$ 使得

    $$
    X(f)=\alpha(f),\forall f\in C^{\infty}(M)
    $$

## 3. 李群和李代数 { #s3 }

!!! definition "定义"
    若在一个 $\mathbb{R}-$向量空间 $V$ 上装备了 $[\cdot,\cdot]:V\times V\rightarrow V$ 满足反对称、双线性、Jacobi恒等式，则称 $(V,[\cdot,\cdot])$ 为**Lie 代数**，$[\cdot,\cdot]$ 为 **Lie 括号**。

我们将切向量场看成 $C^{\infty}(M)\rightarrow C^{\infty}(M)$ 的映射，定义

$$
[X,Y]=X\circ Y-Y\circ X
$$

也是 $C^{\infty}(M)\rightarrow C^{\infty}(M)$ 的映射，称为 $X,Y$ 的**Lie 括号**。容易验证这是线性映射且满足 Leibniz 法则，且具有反交换性 $[X,Y]=-[Y,X]$。我们还有：

!!! theorem "定理"
    - 对 $f\in C^{\infty}(M)$ 有 $[fX,Y]=f[X,Y]-Y(f)\cdot X$
    - (Jacobi恒等式) $[X,[Y,Z]]+[Y,[Z,X]]+[Z,[X,Y]]=0$

!!! definition "定义"
    称 $G$ 是一个**李群**，若 $G$ 为微分流形，且存在乘法 $\cdot:G\times G\rightarrow G$ 与逆 $\iota:G\rightarrow G$ 满足 $\cdot$ 与 $\iota$ 都是光滑的。称 $g=T_eG$ 为群的**李代数**。

!!! theorem "命题"
    存在双射 $g=T_eG\rightarrow \Gamma(G,TG)^\text{左不变}$，且在 $\Gamma(G,TG)^\text{左不变}$ 上有以 $\Gamma(G,TG)$ 诱导的李括号。

## 4. 单参数变换群 { #s4 }

!!! definition "定义"
    设 $M$ 为 $C^{\infty}$ 流形，若 $C^{\infty}$ 映射 $\phi:\mathbb{R}\times M\rightarrow M,(t,p)\mapsto p$(记 $\phi(t,p)=\phi_t(p)=\phi_p(t)$)满足：

    - $\forall p$，$\phi_0(p)=p$
    - $\forall s,t\in \mathbb{R}$，$\phi_s\circ \phi_t=\phi_{s+t}$

    则称 $\phi$ 为 $\mathbb{R}$ 在 $M$ 上的**作用**，或称 $\left\{\phi_t\right\}_{t\in \mathbb{R}}\subseteq C^{\infty }(M,M)$ 为 $M$ 上 $C^\infty$ **单参数变换群**。

由于 $\phi_{-t}\circ\phi_t=\phi_{t}\circ \phi_{-t}=\phi_0=\mathrm{id}$，故 $\phi_t$ 为微分同胚。

!!! definition "定义"
    设 $U\subseteq M$ 含 $p$ 的开集，在前述定义中用 $(-\varepsilon,\varepsilon)\times U$ 代替 $\mathbb{R}\times M$，要求 $s,t,s+t\in (-\varepsilon,\varepsilon)$，则称 $\left\{\phi_t\right\}_{t\in (-\varepsilon,\varepsilon)}$ 为 $U$ 到 $M$ 的**局部单参数变换群**，$\phi_p$ 为过 $p$ 的**轨道**。

注意到我们有

$$
\left.(\phi_p)'\right|_{t=0}=\left.\frac{\mathrm{d}\phi_p(t)}{\mathrm{d} t}\right|_{t=0}(\in T_pM)=(\phi_p)_*(\left.\frac{\partial}{\partial t}\right|_{t=0})
$$

从而 $\left\{(\phi_p)_*(\left.\frac{\partial}{\partial t}\right|_{t=0})\right\}_{p\in U}$ 给出了 $\Gamma(U,TM)$ 中一个元素。

!!! theorem "定理"
    设 $X$ 为局部单参数变换群 $\left\{\phi_t\right\}_t$ 诱导的切向量场，那么

    - $\forall \phi_t$，$(\phi_t)_*X=X$
    - 局部单参数变换群的轨道均为向量场 $X$ 的积分曲线。

!!! theorem "定理"
    设 $X\in \Gamma(M,TM)$，那么 $\forall p\in M$，$\exists p\in V\subseteq M$ 以及 $V\rightarrow M$ 的局部单参数变换群 $\left\{\phi_t\right\}_t$，使得在 $V$ 上，$X$ 为由 $\left\{\phi_t\right\}_t$ 诱导的切向量场(同时 $\left\{\phi_t\right\}_t$ 的轨道为 $X$ 的积分曲线，此时称 $X$ 为局部单参数变换群 $\left\{\phi_t\right\}_t$ 的**无穷小生成元**)。

!!! theorem "推论"
    设 $M$ 紧流形，$X\in \Gamma{M,TM}$，那么 $X$ 在 $M$ 上生成单参数变换群，即由前述定理保证的在 $(-\varepsilon,\varepsilon)\times M$ 上定义的 $\left\{\phi_t\right\}_t$ 在 $\mathbb{R}\times M$ 上也存在。

!!! theorem "定理"
    $\left\{\phi_t\right\}_t\subseteq C^{\infty}(M,M)$ 为 $M$ 上单参数变换群，$X$ 为 $\left\{\phi_t\right\}_t$ 诱导的切向量场，若 $f:M\rightarrow M$ 为微分同胚，那么 $f_*X$ 为单参数变换群 $\left\{f\circ \phi_t\circ f^{-1}\right\}_t$ 诱导的切向量场。

!!! theorem "推论"
    向量场 $X$ 在微分同胚 $f:M\rightarrow M$ 下不变当且仅当 $X$ 生成的局部单参数变换群 $\left\{\phi_t\right\}_t$ 与 $f$ 可交换(即 $\forall t,\phi_t\circ f=f\circ \phi_t$)

!!! theorem "推论"
    设 $X,Y\in \Gamma(M,TM)$ 对应的局部单参数变换群 $\left\{\phi_t\right\}_t$，$\left\{\psi_s\right\}_s$。那么 $\forall s,t,s+t\in (-\varepsilon,\varepsilon)$，$\phi_t\psi_s=\psi_s\phi_t$ 当且仅当 $[X,Y]=0$。

!!! theorem "定理"
    设 $X,Y\in \Gamma(M,TM)$，$\left\{\phi_t\right\}_t$ 为由 $X$ 生成的局部单参数变换群，定义

    $$
    L_XY=\lim_{t\rightarrow 0}\frac{(\phi_t)_*Y-Y}{t}
    $$

    为**李导数**，那么 $L_XY=[X,Y]\in \Gamma(M,TM)$。

!!! definition "定义"
    一个**r 维分布** $D$ 为 $\bigsqcup_{p\in M} D_p$，其中 $D_p\subseteq T_pM$ 为 $r$ 维子空间，使 $D$ 构成 $TM$ 的一个子向量丛。

若 $\forall p\in M$，$\exists p\in U\subseteq M$ 以及 $X_1,\cdots,X_r\in \Gamma(M,TM)$ 使得 $\forall q\in U$，$X_1(q),\cdots,X_r(q)$ 为 $D_q$ 的一组基，则称 $X_1,\cdots,X_r$ 在 $U$ 上**生成**分布 $D$。

!!! theorem "定理（Frobenius第一可积性定理）"
    设 $U$ 是	$m$ 维光滑流形上的开集，$X_1,\cdots,X_l$ 是 $U$ 上的处处线性无关的光滑切向量场，$l\le m$，则存在局部坐标$(t^1,\cdots,t^m)$ 使得

    $$
    X_i=\frac{\partial}{\partial t^i}(1\le i\le l)
    $$

    当且仅当 $[X_i,X_j]=0,1\le i,j\le l$。

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/differential-geometry-notes.pdf){ .md-button download="differential-geometry-notes.pdf" }
