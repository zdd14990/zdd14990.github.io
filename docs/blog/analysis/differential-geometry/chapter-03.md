---
title: 第三章：微分形式及流形上的积分
date: 2025-11-19
updated: 2026-10-15
description: 微分几何笔记第三章：微分形式及流形上的积分。
hide:
  - navigation
categories:
  - 分析
tags:
  - analysis
---

# 第三章：微分形式及流形上的积分 { #top }

## 1. 微分形式及流形上的积分 { #s1 }

约定 $V$ 为 $n$ 维实线性空间，如果映射 $f:V\rightarrow \mathbb{R}$ 满足

$$
f(\lambda u+\mu v)=\lambda f(u)+\mu f(v),\forall u,v \in V,\lambda,\mu \in \mathbb{R}
$$

则称 $f$ 是 $V$ 上的一个**线性泛函**。用 $V^*$ 表示 $V$ 上所有线性泛函的集合，则不难验证 $V^*$ 为线性空间，称为 $V$ 的**对偶空间**。

!!! theorem "定理"
    $\dim V^*=\dim V=n$。

??? proof "证明"
    设 $\left\{e^1,\cdots,e^n\right\}$ 是 $V$ 的一组基，则对任意 $v\in V$ 可以写成 $v=\sum_{i=1}^nv^ie^i$，取 $f^i(v)=v^i$，易验证 $\left\{f^1,\cdots,f^n\right\}$ 线性无关且为 $V^*$ 的一组基。

证明中的 $\left\{f^1,\cdots,f^n\right\}$ 称为 $\left\{e^1,\cdots,e^n\right\}$ 的**对偶基**。

考虑 $V$ 中基的线性变换，线性代数中的知识告诉我们对应的坐标变换是相反的，我们称 $V$ 中的向量为**反协变向量**。同理我们有 $V^*$ 中向量的变换方法与对偶基的变换相反，因此与原来的基变换相同，我们称 $V^*$ 中的向量为**协变向量**。

!!! definition "定义"
    对线性空间 $V,W$，定义**张量积** $V\otimes W=\left<V\times W\right>/\sim$，其中 $\sim$ 定义如下：

    $$
    (\lambda_1 v_1+\lambda_2 v_2,w)\sim\lambda_1(v_1,w)+\lambda_2(v_2,w),(v,\mu_1w_1+\mu_2w_2)\sim\mu_1(v,w_1)+\mu_2(v,w_2)
    $$

    $[(v,w)]$ 记作 $v\otimes w$。

!!! theorem "命题"
    $\mathrm{Hom}_\mathbb{R}(V^{\otimes r},\mathbb{R})\cong (V^*)^{\otimes r}$

!!! definition "定义"
    一个 **$(r,s)$ 型张量**为一个线性函数 $V\otimes \cdots\otimes V\times V^*\otimes \cdots \otimes V^*\rightarrow \mathbb{R}$，其中有 $r$ 个 $V$，$s$ 个 $V^*$。称 $(r,0)$ 型张量为 $r-$协变张量，$(0,s)$ 型张量为 $s-$反协变张量。

!!! definition "定义"
    定义**对称向量**与**反对称张量**为：

    $$
    \mathrm{Sym}^{\otimes m}V^*=\left\{\varphi\in(V^*)^{\otimes m}\Big| \forall v_1,\cdots,v_m\in V,\sigma \in S_m,\varphi(v_{\sigma(1)},\cdots,v_{\sigma(n)})=\varphi(v_1,\cdots,v_m)\right\}
    $$

    $$
    \varLambda ^mV^*=\left\{\varphi\in(V^*)^{\otimes m}\Big| \forall v_1,\cdots,v_m\in V,\sigma \in S_m,\varphi(v_{\sigma(1)},\cdots,v_{\sigma(n)})=(-1)^{\mathrm{sgn(\sigma)}}\varphi(v_1,\cdots,v_m)\right\}
    $$

!!! theorem "命题"
    $\dim V^*=n$，则 $\dim \varLambda ^mV^*=\left(\begin{array}{c} n\\ m\\ \end{array} \right)$

??? proof "证明"
    取 $V^*$ 的一组基 $w_1,\cdots,w_n$，验证

    $$
    \varLambda^m V^*=\mathrm{span}_\mathbb{R}\left\{ \sum_{\sigma\in S(i_1,\cdots,i_m)} (-1)^{\mathrm{sgn}(\sigma)}w^{\sigma(i_1)}\otimes \cdots \otimes w^{\sigma(i_m)}\right\}
    $$

    这样的张量刚好 $\left(\begin{array}{c} n\\ m\\ \end{array} \right)$ 个

我们记

$$
w^{i_1}\land \cdots \land w^{i_m}=\sum_{\sigma\in S(i_1,\cdots,i_m)} (-1)^{\mathrm{sgn}(\sigma)}w^{\sigma(i_1)}\otimes \cdots \otimes w^{\sigma(i_m)}
$$

，为 $w^{\sigma(i_1)}\otimes \cdots \otimes w^{\sigma(i_m)}$ 的反对称化。

!!! definition "定义"
    $\land:\land ^p V^*\otimes \land^q V^*\rightarrow \land ^{p+q}V^*,\alpha\otimes \beta\mapsto \alpha\otimes \beta \text{的反对称化}$

!!! theorem "命题"
    $\alpha\land \beta=(-1)^{pq}\beta\land \alpha$

    $(\alpha \land \beta)\land \gamma =\alpha \land (\beta\land \gamma )$

!!! definition "定义"
    设 $M$ 是微分流形，称 $M$ 上一个微分 $r$ 形式为向量丛 $\land ^r T^*M$ 的光滑截面，此时称 $\land ^r T^*M$ 为 **$r$ 次微分形式丛**。类似定义 $\Gamma(M,(T^*M)^{\otimes r}\otimes (TM)^{\otimes s})$ 中的元素为流形 $M$ 上 $(r,s)$ 型张量场。

下面我们来定义外微分 $\mathrm{d}$：

!!! definition "定义"
    称 $\mathrm{d} :\Gamma(M,\land ^r T^*M)\rightarrow \Gamma(M,\land ^{r+1}T^*M)$ 为**外微分**，若 $\mathrm{d}$ 满足：

    - $\mathrm{d}$ 线性。
    - $\forall f\in C^{\infty}(M,\mathbb{R}),\mathrm{d} f\in \Gamma(M,\land ^1T^*M)$ 由 $\mathrm{d} f(X)=X(f)\in C^{\infty}(M,\mathbb{R})$ 指定且 $\mathrm{d} (\mathrm{d} f)=0$。
    - $\mathrm{d}$ 满足 Leibniz 法则，$\mathrm{d} (\alpha\land \beta )=\mathrm{d} \alpha\land \beta+(-1)^{\left|\alpha\right|}\alpha \land \mathrm{d} \beta$

记 $\Gamma(M,\land^rT^*M)=A^r(M)$，$(A(M)=\oplus_{t=0}^n A^r(M),\land,\mathrm{d} )$ 称为**微分分次代数(differential graded algebra)**。

!!! theorem "引理"
    外微分算子 $\mathrm{d}$ 若存在，则为局部算子。

    即若 $\alpha,\beta \in A(M)$，则存在 $U$ 使得：若有 $\alpha\Big|_U=\beta\Big|_U$ 则有 $(\mathrm{d} \alpha)\Big|_U=(\mathrm{d} \beta)\Big|_U$

??? proof "证明"
    略。

!!! theorem "定理"
    $\mathrm{d}$ 存在且唯一。

??? proof "证明"
    略。

!!! theorem "定理"
    $\mathrm{d} ^2=0$。

这表明 $\mathrm{d}$ 有某种正合性质。

首先我们有 $\mathrm{Im} (\mathrm{d} :A^r(M)\rightarrow A^{r+1}(M))\subseteq \mathrm{Ker} (\mathrm{d} :A^{r+1}(M)\rightarrow A^{r+2}(M))$，但我们不一定有反过来的包含关系，具有一定的拓扑障碍。

!!! theorem "定理（Cartan）"
    $w\in A^r(M)$，那么 $\forall X_0,X_1,\cdots,X_r$，

    $$
    \begin{aligned}
    \mathrm{d} w(X_0,\cdots,X_r)=&\sum_{i=0}^r(-1)^iX_i(w(X_1,\cdot,\check{X_i},\cdots,X_r))
    \\
    &+\sum_{i<j} (-1)^{i+j}w([X_i,X_j],X_1,\cdots,\check{X_i},\cdots,\check{X_j}\cdots,X_r)
    \end{aligned}
    $$

!!! definition "定义"
    设 $M$ 是微分流形，$w\in A^r(M)$，若 $\mathrm{d} w=0$，称 $w$ 为**闭形式(closed)**，若存在 $\sigma\in A^{r+1}(M)$，$w=\mathrm{d} \sigma$，称 $w$ 为**恰当形式(exact)**。若 $\forall p\in M$，存在 $p\in U$，$w\Big|_U=\mathrm{d} \sigma$，则称为**局部恰当**。

闭形式推不出恰当。考虑 $M=S^1$，$\omega=\mathrm{d} \theta$。

!!! theorem "定理（Poincare引理）"
    设 $\Omega\subset \mathbb{R}^n$ 中包含 0 点的星形开集，则在 $\Omega$ 上任一闭形式都是恰当的。

??? proof "证明"
    之后补。

!!! definition "定义"
    $F:M\rightarrow N$ 光滑映射。定义：

    $$
    \begin{aligned}
    F^*:A^r(M)&\rightarrow A^r(N)
    \\
    f&\mapsto F^*\cdot f=f\circ F
    \\
    \omega&\mapsto F^*\omega((X_1,\cdots,X_r)\mapsto \omega(F_*X_1,\cdots,F_*X_r))
    \end{aligned}
    $$

!!! theorem "定理"
    $F^*:A^r(N)\rightarrow A^r(M)$ 满足：

    - 线性。
    - $F^*(\alpha\land \beta)=F^*\alpha\land F^*\beta$。
    - $dF^*=F^*\circ d$。

??? proof "证明"
    $(1)$：线性性显然。

    $(2)$：由 $F^*$ 线性以及 $F^*(\alpha \otimes \beta )=F^*\alpha\otimes F^*\beta$ 知 $F^*$ 保持反对称化。

    $(3)$：对 $\omega\in A^0(M)$，即 $\omega=f\in C^{\infty }(M,\mathbb{R})$。

    $$
    \begin{aligned}
    (F^*\circ \mathrm{d} f)(X)=\mathrm{d} f(F_*X)=(F_*X)(f)=X(f\circ F)=X(F^*f)=(\mathrm{d} F^*f)(X)
    \end{aligned}
    $$

    设 $\omega=f\mathrm{d} g$，$f,g\in C^{\infty}(M,\mathbb{R})$。

    $$
    \begin{aligned}
    F^*\mathrm{d} \omega&=F^*\mathrm{d} (f\mathrm{d} g)=F^*(\mathrm{d} f\land \mathrm{d} g)=F^*(\mathrm{d} f)\land F^*(\mathrm{d} g)
    \\
    &=\mathrm{d} F^*f\land F^*\mathrm{d} g=\mathrm{d} (F^*f\land F^*\mathrm{d} g)=\mathrm{d} F^*(f\land \mathrm{d} g)=\mathrm{d} F^*\omega
    \end{aligned}
    $$

    对一般的 $\omega$，由 $\mathrm{d} ,F^*$ 的线性性，只需考虑 $\omega=\omega_1\land \omega_2$，其中 $\omega_1$ 为 $1-$形式，利用归纳法即证。

!!! definition "定义"
    设 $X\in \Gamma(M,TM)$，定义**内积(interior product)** $i_X$：

    $$
    \begin{aligned}
    i_X:A^r(M)&\rightarrow A^{r-1}(M)
    \\
    \omega&\mapsto i_X\omega:(X_2,\cdots,X_r)\mapsto \begin{cases}
    0 &,r=0\\
    \omega(X,X_2,\cdots,X_r)&,r\ge 1\\
    \end{cases}
    \end{aligned}
    $$

回忆 $L_X\omega=\left.\frac{\mathrm{d} }{\mathrm{d} t}\right|_{t=0}\phi_t^*\omega$，其中 $\left\{\phi_t\right\}_t$ 为由 $X$ 诱导的局部单参数变换群。对 $A(M)$ 上的线性映射 $A:A^{r_1}(M)\rightarrow A^{r_2}(M)$，定义 $A$ 的次数为 $r_2-r_1$。

!!! theorem "命题"
    - $i_X$ 满足分次 Leibniz 法则：

        $$
        i_X(\alpha\land \beta )=i_X\alpha\land \beta+(-1)^{\left|\alpha\right|}\alpha\land i_X\beta
        $$

    - 设 $A,B$ 为 $A(M)$ 上的线性映射，若 $A,B$ 满足分次 Leibniz，且 $A,B$ 的次数为奇，则 $AB+BA$ 也满足 Leibniz；若 $A$ 满足分次 Leibniz，$B$ 满足 Leibniz 且 $B$ 次数为偶，则 $AB-BA$ 满足分次 Leibniz.

    - 若 $A:A(M)\rightarrow A(M)$ 线性且满足分次 Leibniz 法则，那么 $A$ 在 $A(M)$ 的作用完全由 $A^0(M)$ 上的作用确定。

??? proof "证明"
    下次补。

我们现在有：

- $\mathrm{d} :A^r(M)\rightarrow A^{r+1}(M)$
- $i_X:A^r(M)\rightarrow A^{r-1}(M)$
- $L_X:A^r(M)\rightarrow A^r(M)$

!!! theorem "命题"
    - $L_x\circ \mathrm{d} =\mathrm{d} \circ L_x$
    - $L_x=\mathrm{d} \circ i_X+i_X\circ \mathrm{d}$
    - $L_x\circ i_Y-i_Y\circ L_X=i_{[X,Y]}$
    - $X(\omega(y_1,\cdots,y_r))=(L_x\omega)(y_1,\cdots,y_r)+\displaystyle\sum_{k=1}^r \omega(y_1,\cdots,L_Xy_k,\cdots,y_r)$

??? proof "证明"
    下次补。

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/differential-geometry-notes.pdf){ .md-button download="differential-geometry-notes.pdf" }
