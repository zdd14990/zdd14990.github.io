---
title: 第五章：流形上的微积分
date: 2025-11-19
updated: 2026-10-15
description: 微分几何笔记第五章：流形上的微积分。
hide:
  - navigation
categories:
  - 分析
tags:
  - analysis
---

# 第五章：流形上的微积分 { #top }

## 1. 流形上的微积分 { #s1 }

接下来我们来考虑流形上的定向、流形上的积分、带边流形上的积分，介绍 Stokes 定理与高斯绝妙定理。

先来看看在线性空间中我们是如何定向的：

!!! definition "定义（线性空间的定向）"
    设 $V$ 是一个 $n$ 维线性空间，$f=(f_1,\cdots,f_n)$ 为 $V$ 的一个**标架(frame)**/基(这里称之为标架而不是基意在强调这是一个给定序的基)，称 $\left\{V\text{上的标架}\right\}/\sim$ 中一个元素为 $V$ 上一个定向，其中 $f\sim \tilde{f} \Longleftrightarrow \exists P \in \mathrm{GL}_n(\mathbb{R})$，$\tilde{f}=f\cdot P$，$\det P>0$

$V$ 上有且仅有两个定向：$[f=(f_1,\cdots,f_n)],[(f_2,f_1,\cdots,f_n)]$。

等价的，我们借助微分形式描述定向：$(\land^nV^*-\left\{0\right\})/\sim$ 为 $V$ 上一个定向，其中 $\Omega\sim \tilde{\Omega}\Longleftrightarrow \exists \lambda>0$，$\tilde{\Omega}=\lambda \Omega$。

接下来我们来看流形上的定向：

!!! definition "定义（流形上的定向）"
    称 $M$ **可定向(orientable)**，若存在 $\left\{(V_\alpha,\psi_\alpha,y_\alpha)\right\}_\alpha$，其中在 $V_\alpha$ 上有 $\Gamma(V_\alpha,TM)$ 之标架 $f_\alpha=(f_{\alpha,1},\cdots,f_{\alpha,n})$，在 $V_\alpha\cap V_\beta$ 上，存在可逆 $P_{\beta\alpha}$ 使得 $f_\alpha=f_\beta P_{\beta\alpha}^{-1}$，$\det P_{\beta\alpha}^{-1}>0$，同样定义 $\sim$，称 $\left\{(f_\alpha)_\alpha\right\}/\sim$ 中一个元素为流形 $M$ 上一个定向。

!!! theorem "命题"
    $$
    \begin{aligned}
    &\text{存在}\left\{(V_\alpha,\psi_\alpha,y_\alpha)\right\}_\alpha\text{满足}\det P_{\beta\alpha}^{-1}>0
    \\
    \Longleftrightarrow &\text{存在} \left\{(V_\alpha,\psi_\alpha,z_\alpha)\right\}_\alpha \text{满足} \frac{\partial}{\partial z^\alpha}=\frac{\partial}{\partial z^\beta}J_{\beta\alpha}^{-1},\det J_{\beta\alpha}^{-1}
    \\
    \Longleftrightarrow &\text {存在} \left\{(V_\alpha,\psi_\alpha,z_\alpha)\right\}_\alpha,\Omega_\alpha\in \Gamma (V_\alpha,\land^nT^*M) \text{使得} \Omega_\alpha=\lambda_{\beta\alpha}\Omega_\beta,\lambda_{\beta\alpha}>0
    \\
    \Longleftrightarrow &\text{存在} \Omega\in \Gamma(M,\land^nT^*M)\text{处处非零，称为\textbf{体积形式(Volume form)}}
    \end{aligned}
    $$

下面我们介绍流形上可定向图册的构造方式，这同时可判断可定向图册的存在性：取流形上的 $C^{\infty}$ 局部坐标图册，$\left\{(U_\alpha,\varphi_\alpha,x_\alpha)\right\}_\alpha$，考虑函数族 $\left\{\det J_{\beta\alpha }^{-1}\right\}_{\alpha,\beta}$

- 若 $\forall \alpha,\beta$，$\det J_{\beta\alpha}^{-1}>0$，那么 $\left\{(U_\alpha,\varphi_\alpha,x_\alpha)\right\}_\alpha$ 自动为可定向图册。

- 若上述条件不满足，考虑在 $x_\alpha=(x_\alpha^1,\cdots,x^n_\alpha)$ 上调整顺序，得 $z_\alpha=(z_\alpha^1,\cdots,z_\alpha^n)$ 使得 $\left\{(U_\alpha,\tilde{\varphi}_\alpha,z_\alpha)\right\}_\alpha$ 为可定向图册，则

    $$
    \det\left(\frac{\partial z_\beta}{\partial z_\alpha}\right)>0\Longleftrightarrow \det\left(\frac{\partial x_\beta}{\partial x_\alpha}\right)O_\beta O_\alpha^{-1}>0,\forall \alpha,\beta
    $$

    其中  $O_\alpha=\det \left(\dfrac{\partial z_\alpha}{\partial x_\alpha}\right)\in \left\{\pm 1\right\}$。

    则可定向图册 $\left\{(U_\alpha,\tilde{\varphi}_\alpha,z_\alpha)\right\}_\alpha$ 存在 $\Longleftrightarrow$ 关于 $\left\{O_\alpha:U_\alpha\rightarrow \left\{\pm 1\right\}\right\}_\alpha$ 的方程

    $$
    \det\left(\frac{\partial x_\beta}{\partial x_\alpha}\right)O_\beta O_\alpha^{-1}>0,\forall \alpha,\beta
    $$

    有解。

下面我们看一些自然的可定向流形的构造：

- 辛流形：$\omega\in A^2(M)$，$\mathrm{d} \omega=0$ 非退化 $\Longrightarrow$ $\omega^n$ 为体积形式。

- 复流形：局部同胚 $\mathbb{C}^n$ $\left(\left(\dfrac{\partial}{\partial z^\beta},\dfrac{\partial}{\partial \bar{z}^\beta}\right)=\left(\dfrac{\partial}{\partial z^\alpha},\dfrac{\partial}{\partial \bar{z}^\alpha}\right)\cdot P_{\beta\alpha}^{-1}\text{自动满足}\det P_{\beta\alpha}^{-1}\right)$

    注：$n$ 维复流形 $X$ 上是否存在一个处处非零的全纯微分 $n-$形式 $\Longleftrightarrow$ $C_1(X)=0$，读者可自行尝试证明。

- Riemann manifold：我们将在下面详细说明。

我们首先来定义一个度量：

!!! definition "定义"
    流形 $M$ 上一个度量为一个 $(0,2)$型张量

    $$
    g=\mathrm{d} s^2\in \Gamma(M,\mathrm{Sym}^{\otimes 2}T^*M):\Gamma(M,TM)\otimes \Gamma(M,TM)\rightarrow C^{\infty}(M,\mathbb{R})
    $$

    且满足

    - 对称。

    - 正定：$\left.g\right|_p(X_p,X_p)\ge 0$ 且取等仅当 $X_p=0\in T_pM$

    - 双线性：

        $$
        \begin{aligned}
        \left.g\right|_p(\lambda_1X_p+\lambda_2Y_p,\mu_1Z_p+\mu_2W_p)=&\lambda_1\mu_1\left.g\right|_p(X_p,Z_p)+\lambda_1\mu_2\left.g\right|_p(X_p,W_p)
        \\
        +&\lambda_2\mu_1\left.g\right|_p(Y_p\text{ },Z_p)+\lambda_2\mu_2\left.g\right|_p(Y_p\text{ },W_p)
        \end{aligned}
        $$

    此时称 $(M,g=\mathrm{d} s^2)$ 为一个 Riemann 流形。

注意，局部在 $(U,\varphi,x)$ 下，

$$
\left.g\right|_U=\sum_{i,j}g_{ij}(x)\mathrm{d} x^i\otimes \mathrm{d} x^j
$$

通过度量可以定义 $n-$形式：

!!! definition "定义"
    设 $g=\mathrm{d} s^2$ 为 $M$ 上一个度量，

    $$
    \mathrm{Vol}_g:=\left\{\sqrt{\det g_{\alpha,ij}(x)}\mathrm{d} x_\alpha^1\land \cdots \land \mathrm{d} x_\alpha^n\right\}_\alpha
    $$

!!! theorem "命题"
    当 $\left\{(U_\alpha,\varphi_\alpha,x_\alpha)\right\}_\alpha$ 为可定向图册时，$\mathrm{Vol}_g$ 良定且给出处处非 $0$ 的 $n-$形式。

??? proof "证明"
    在 $U_\alpha\cap U_\beta$ 中，

    $$
    \begin{aligned}
    \mathrm{d} x_\beta^1\land \cdots \land \mathrm{d} x_\beta^n&=\det\left(\frac{\partial x_\beta}{\partial x_\alpha}\right)\mathrm{d} x_\alpha^1\land \cdots \land \mathrm{d} x_\alpha^n
    \\
    g_{\beta,\tilde{i}\tilde{j}}(x)&=g_{\alpha,ij}(x)\cdot \frac{\partial x_\alpha^i}{\partial x_\beta^{\tilde{i}}}\cdot \frac{\partial x_\alpha^j}{\partial x_\beta^{\tilde{j}}}
    \\
    \det\left(g_{\beta,\tilde{i}\tilde{j}}(x)\right)&=\det\left(g_{\alpha,ij}(x)\right)\cdot \det\left(\frac{\partial x_\alpha^i}{\partial x_\beta^{\tilde{i}}}\right)\cdot \det\left(\frac{\partial x_\alpha^j}{\partial x_\beta^{\tilde{j}}}\right)
    \\
    \Longrightarrow  \sqrt{\det\left(g_{\beta,\tilde{i}\tilde{j}}(x)\right)}\mathrm{d} x_\beta^1\land \cdots \land \mathrm{d} x_\beta^n&=\left|\det\left(\frac{\partial x_\alpha}{\partial x_\beta}\right)\right|\cdot \det\left(\frac{\partial x_\beta}{\partial x_\alpha}\right) \sqrt{\det\left(g_{\alpha,ij}(x)\right)}\mathrm{d} x_\alpha^1\land \cdots \land \mathrm{d} x_\alpha^n
    \end{aligned}
    $$

    当 $\left\{(U_\alpha,\varphi_\alpha,x_\alpha)\right\}_\alpha$ 为可定向图册时，

    $$
    \det\left(\frac{\partial x_\beta}{\partial x_\alpha}\right)>0
    $$

    故 $\mathrm{Vol}_g$ 良定，$\sqrt{\det\left(g_{\alpha,ij}(x)\right)}>0\Longrightarrow$ 其处处非零。

当 $\left\{(U_\alpha,\varphi_\alpha,x_\alpha)\right\}_\alpha$ 是否为定向图册未知时，通过构造

$$
O_\alpha:U_\alpha\rightarrow \left\{\pm 1\right\}
$$

以及

$$
\left\{O_\alpha\sqrt{\det\left(g_{\alpha,ij}\right)}\mathrm{d} x^1_\alpha\land \cdots\land \mathrm{d} x_\alpha^n\right\}
$$

来构造良定且处处非零的 $n-$形式。

注意！度量的定义不需要定向/可定向图册，但由度量诱导良定的体积形式通常将一个可定向流形上的某局部图册 $\left\{(U_\alpha,\varphi_\alpha,x_\alpha)\right\}_\alpha$ 的体积形式写为 $\left\{O_\alpha\sqrt{\det g_{\alpha,ij}(x)}\mathrm{d} x^1_\alpha\land \cdots\land \mathrm{d} x_\alpha^n\right\}$

接下来我们考虑流形上的积分。回忆我们在分析中所学的，在欧氏空间中，我们将积分定义成 Riemann 可积。而利用局部平凡化映射，我们可以将流形局部的积分定义为相应的欧氏空间上的积分，这可以由“变量替换”表述，再利用单位分解将局部拼成整体。

!!! theorem "引理（开区域 $\Omega\subseteq \mathbb{R}^n$ 上积分变量替换）"
    设 $\Omega_1,\Omega_2$ 为 $\mathbb{R}^n$ 上开区域(开集，无边)，$\phi:\Omega_1\rightarrow \Omega_2$ 是微分同胚，$f\in C^{\infty}(\Omega_2,\mathbb{R})$ 且 $\mathrm{supp}f=\left\{x_2\in \Omega_2\Big| f(x_2)\neq 0 \right\}$ 紧，那么

    $$
    \int_{\Omega_2}f(y)\mathrm{d} y^1\cdots\mathrm{d} y^n=\int_{\Omega_1}f\circ \phi(x)\cdot \left|\det \frac{\partial y}{\partial x}\right|\cdot \mathrm{d} x^1\cdots \mathrm{d}  x^n
    $$

!!! definition "定义（局部的积分）"
    设 $f\in C^{\infty}(M,\mathbb{R})$，$\mathrm{supp}f$ 紧，且

    $$
    \mathrm{supp}f\subseteq (U,\varphi,x)
    $$

    定义

    $$
    \begin{aligned}
    \int_{(M,[\Omega_M])}f(x)\mathrm{d} x^1\land \cdots \land \mathrm{d} x^n&:=\int_{(U,[\Omega_M])}f(x)\mathrm{d} x^1\land \cdots \land \mathrm{d} x^n
    \\
    &:=\int_{(\varphi(U),[\Omega_M])}(f\mathrm{d} x^1\land \cdots \land \mathrm{d} x^n)\circ \varphi^{-1}
    \\
    (x^k=\pi^k\circ \varphi )&:=\begin{cases}
    \quad\int_{\varphi(U)}f\circ \varphi^{-1}\mathrm{d} \pi^1\cdots \mathrm{d} \pi^n\text{，}\mathrm{d} x^1\land \cdots \land \mathrm{d} x^n \text{ 与 }\Omega_U \text{ 符号一致}\\
    -\int_{\varphi(U)}f\circ \varphi^{-1}\mathrm{d} \pi^1\cdots \mathrm{d} \pi^n\text{，}\mathrm{d} x^1\land \cdots \land \mathrm{d} x^n \text{ 与 }\Omega_U \text{ 符号相反}\\
    \end{cases}
    \end{aligned}
    $$

约定 $M$ 上的定向为 $[\Omega_M]$，所有局部图均与 $[\Omega_M]$ 相容。

!!! theorem "命题（局部积分的良定性）"
    设 $\left.f_\alpha\right|_{U_\alpha\cap U_\beta }$ 在 $U_\alpha\cap U_\beta$ 上具有紧支集，则

    $$
    \int_{(\varphi_\alpha(U_\alpha\cap U_\beta),[\Omega_M])} (f_\alpha\mathrm{d} x^1_\alpha\land \cdots \land \mathrm{d} x^n_\alpha)\circ \varphi_\alpha^{-1}=\int_{(\varphi_\beta(U_\alpha\cap U_\beta),[\Omega_M])} (f_\beta\mathrm{d} x^1_\beta\land \cdots \land \mathrm{d} x^n_\beta)\circ \varphi_\beta^{-1}
    $$

??? proof "证明"
    $\left.f_\alpha\right|_{U_\alpha\cap U_\beta }$ 具有紧支集，由 $f_\beta =\det \dfrac{\partial x_\alpha}{\partial x_\beta}f_\alpha$，故 $\left.f_\beta\right|_{U_\alpha\cap U_\beta }$，从而右边有定义。

    设微分同胚 $\phi:\varphi_\alpha(U_\alpha\cap U_\beta)\rightarrow \varphi_\beta(U_\alpha\cap U_\beta)$，由欧式空间开区域上变量替换：

    $$
    \begin{aligned}
    &\int_{(\varphi_\beta(U_\alpha\cap U_\beta),[\Omega_M])} f_\beta\circ \varphi_\beta ^{-1}\cdot(\mathrm{d} x^1_\beta\land \cdots \land \mathrm{d} x^n_\beta)\circ \varphi_\beta^{-1}
    \\
    =&\int_{\varphi_\beta(U_\alpha\cap U_\beta)} f_\beta \circ \varphi_\beta^{-1}\mathrm{d} \pi^1_\beta \cdots \mathrm{d} \pi^n_\beta
    \\
    (\text{引理})=&\int_{\varphi_\alpha(U_\alpha\cap U_\beta)} f_\beta \circ \varphi_\beta^{-1}\circ \phi \cdot\left|\det \frac{\partial x_\beta}{\partial x_\alpha}\right|\cdot\mathrm{d} \pi^1_\alpha \cdots  \mathrm{d} \pi^n_\alpha
    \\
    =&\int_{\varphi_\alpha(U_\alpha\cap U_\beta)} f_\beta \circ \varphi_\alpha^{-1} \cdot\det \frac{\partial x_\beta}{\partial x_\alpha}\cdot\mathrm{d} \pi^1_\alpha \cdots  \mathrm{d} \pi^n_\alpha
    \\
    =&\int_{(\varphi_\alpha(U_\alpha\cap U_\beta),[\Omega_M])} (f_\alpha\mathrm{d} x^1_\alpha\land \cdots \land \mathrm{d} x^n_\alpha)\circ \varphi_\alpha^{-1}
    \end{aligned}
    $$

!!! definition "定义（流形上 $n-$形式的积分）"
    设 $\omega\in A^n_C(M)\triangleq\left\{\text{具有紧支集的} n-\text{形式}\right\}$，取流形 $M$ 的正则覆盖 $\left\{(U_i,\varphi_i,x_i,U_i^{\frac{1}{2}})\right\}_i$，其与 $M$ 上的定向 $[\Omega_M]$ 相容。作从属于该覆盖的单位分解 $\left\{\eta_i\right\}_i$ 使得

    $$
    \begin{cases}
    \mathrm{supp}\eta_i\subseteq U_i,i=1,2,\cdots,r\\
    \eta_i\Big|_{\mathrm{supp}\omega}=0,i\ge r+1\\
    \end{cases}
    $$

    定义

    $$
    \int_{(M,[\Omega_M])} \omega:=\sum_i\int_{(U_i,[\Omega_M])} \eta_i\omega
    $$

我们有

$$
\mathrm{supp}(\eta_i\omega )\subseteq \mathrm{supp} \eta_i\cap \mathrm{supp}\omega\begin{cases}
\subseteq U_i\cap \mathrm{supp}\omega&,i=1,2,\cdots,r\\
=0&,i\ge r+1
\end{cases}
$$

!!! theorem "命题"
    - 正则覆盖单位分解存在。
    - 积分不依赖于正则覆盖及从属于其的单位分解的选取。

??? proof "证明"
    之后再补。

实际计算中，取可定向图册 $\left\{(U_\alpha,\varphi_\alpha,x_\alpha)\right\}_\alpha$，在 $U_\alpha$ 上作局部计算，并利用容斥原理得 $\cup_\alpha U_\alpha=M$ 上的积分结果。

!!! theorem "命题"
    设 $(M,[\Omega_M]),(N,[\Omega_N])$ 为定向流形，则

    - 若微分同胚 $\phi:M\rightarrow N$ 保持定向结构($[\phi^*\Omega_N]=[\Omega_M]$)，那么 $\forall \omega\in A^n_C(N)$，

        $$
        \int _{(M,[\Omega_N])}\phi^*\omega=\int _{(N,[\Omega_N])} \omega
        $$

    - $\forall \omega\in A^n_C(M)$，

        $$
        \int _{(N,[\Omega_N])} \omega=(-1)\int _{(M,[\Omega_M])} \omega
        $$

??? proof "证明"
    显然。

下面我们来看带边流形上的积分与 Stokes 定理。在 Riemann 积分中我们定义 $\int_{[a,b]}f(x)dx:=\int_{(a,b)}f(x)dx$ 若 $f$ 光滑，以及 $\int_{[a,b]} F'(x)dx=F(x)\Big|_a^b=F(b)-F(a)$ 若 $F'$ 光滑，这可以看成某种定向。

!!! definition "定义（平凡空间）"
    $$
    \begin{aligned}
    \mathbb{R}_+^n&=\left\{(x^1,\cdots,x^n)\in \mathbb{R}^n\Big| x^n\ge 0\right\}\\
    \partial \mathbb{R}_+^n&=\left\{(x^1,\cdots,x^{n-1},0)\in \mathbb{R}^n\right\}\overset{\text{同胚}}{\simeq} \mathbb{R}^{n-1}
    \end{aligned}
    $$

!!! definition "定义（平凡空间的映射）"
    设 $U,V$ 为 $\mathbb{R}_+^n$ 的开集(即 $U,V$ 为 $\mathbb{R}^n$ 中开集 $\tilde{U},\tilde{V}$ 与 $\mathbb{R}^n_+$ 之交)，$f:U\rightarrow V$ 连续，对 $\forall p\in U$，存在开集 $p\in \tilde{U}\subseteq\mathbb{R}^n$，$q=f(p)\in \tilde{V}\subseteq \mathbb{R}^n$，光滑 $F:\tilde{U}\rightarrow \tilde{V}$ 满足

    $$
    F\Big|_{U\cap \tilde{U}}=f\Big|_{U\cap \tilde{U}}
    $$

    那么称 $f:U\rightarrow V$ **在 $p$ 处光滑**，此时定义 $f'(p)=F'(p)$。

    若 $\forall p\in U$，$f$ 在 $p$ 处连续，则称 $f$ **光滑**。

读者可自行验证上述定义与 $F:\tilde{U}\rightarrow \tilde{V}$ 的选取无关。

!!! theorem "引理（平凡空间光滑映射的性质）"
    - 若开集 $\tilde{W}\rightarrow \mathbb{R}^n$，$G:\tilde{W}\rightarrow \mathbb{R}^n$ 光滑且 $\left.G\right|_{\tilde{W}\cap \mathbb{R}_+^n}=0$，那么 $\forall p\in \tilde{W}\cap \mathbb{R}_+^n$，$G'(p)=0$。
    - 设开集 $U\subseteq \mathbb{R}_+^n$，$f:U\rightarrow\mathbb{R}_+^n$ 光滑，若 $p\in U^\circ$，$f(p)\in \partial \mathbb{R}_+^n$，那么 $\forall v\in T_p\mathbb{R}_+^n$，$f'(p)(v)\subseteq \partial \mathbb{R}_+^n\subseteq \mathbb{R}^n=T_{f(p)}\mathbb{R}_+^n$

??? proof "证明"
    $(1)$：当 $p\in (\tilde{W}\cap \mathbb{R}_+^n)^\circ$ 时结论显然。

    当 $p\in \partial(\tilde{W}\cap \mathbb{R}_+^n)=\tilde{W}\cap \partial \mathbb{R}_+^n$ 时，选取序列 $\left\{p_n\right\}\subseteq (\tilde{W}\cap \mathbb{R}_+^n)^\circ$，$p_n\rightarrow p$，那么 $0=G'(p_n)\rightarrow G'(p)$。

    综上 $G'(p)=0$。

    $(2)$：设 $\pi:\mathbb{R}^n\rightarrow \mathbb{R}$ 为投影映射，那么由于 $\forall x\in U\subseteq \mathbb{R}^n_+$，$\pi\circ f(x)\ge 0$。从而 $0\le \pi[f(p+tv)]=\pi[f(p)+f'(p)(tv)+o(tv)]$

    令 $t\rightarrow 0^+$，$0\le( \pi(f'(p)(tv))+\pi(o(tv)))/t=\pi(f'(p)(v))$，令 $t\rightarrow 0^-$ 类似的有 $0\ge=\pi(f'(p)(v))$，故 $\pi(f'(p)(v))=0$，即 $f'(p)(v)\subseteq \partial \mathbb{R}^n_+$。

!!! theorem "引理"
    设开集 $U,V\subseteq \mathbb{R}^n_+$，$f:U\rightarrow V$ 是光滑的微分同胚($F:\tilde{U}\rightarrow \tilde{V}$ 的限制)，那么

    $$
    \begin{aligned}
    f^\circ :=&\left.f\right|_{U^\circ}:U^\circ \rightarrow V^\circ \\
    \partial f:=&\left.f\right|_{\partial U}:\partial U \rightarrow \partial V
    \end{aligned}
    $$

    均为微分同胚。

??? proof "证明"
    分情况讨论。

!!! definition "定义（带边流形）"
    在流形的定义中，以 $\mathbb{R}^n_+$ 或 $\mathbb{R}^n$ 代替 $\mathbb{R}^n$。

    若对于 $p\in M$，存在 $p\in (U,\varphi)$ 使 $\varphi(U)\cap \partial \mathbb{R}^n_+=\emptyset$，那么称 $p$ 为 $M$ 的内点，记 $p\in M^\circ$。否则称 $p$ 为边界点，称 $p\in \partial M$。

注意到 $\partial(\partial M)=\emptyset$ 故 $\partial M$ 为普通意义下的光滑流形。

关于流形的性质可直接推广，仅在正则覆盖 $\left\{(U_i,\varphi_i,V_i)\right\}$ 做如下修改：

$$
\begin{aligned}
U_i\cap \partial M&\neq \emptyset\\
\varphi_i(U_i)&=B_1(0)\cap \mathbb{R}^n_+\\
\varphi_i(V_i)&=B_{1/2}(0)\cap \mathbb{R}^n_+
\end{aligned}
$$

注意这里 $\varphi(\partial U)= \varphi(U)\cap \partial \mathbb{R}^n_+\subseteq \partial \mathbb{R}^n_+$ 是开集。

!!! theorem "定理"
    设 $M$ 是 $n$ 维带边流形，那么 $M$ 上的微分结构确定了 $\partial M$ 上的一个微分结构，使 $\partial M$ 为 $M$ 的正则子流形，记为 $i:\partial M\rightarrow M$。若 $M$ 可定向，则 $\partial M$ 也可定向，且 $M$ 的定向确定的 $\partial M$ 的定向。

??? proof "证明"
    注意到，$\partial \mathbb{R}^n_+$ 是 $\mathbb{R}^n$ 的正则子流形，且与 $\mathbb{R}^{n-1}$ 微分同胚，对 $M$ 的坐标图 $(U,\varphi)$，$\left.\varphi\right|_{\partial U}(\partial U)=\varphi(U)\cap \partial \mathbb{R}^n_+$ 为 $\partial \mathbb{R}^n_+$ 中开集。从而 $\partial M$ 的微分结构可由

    $$
    \left\{(U_\alpha\cap \partial M,\left.\varphi_\alpha\right|_{U_\alpha\cap \partial M})\right\}_\alpha
    $$

    给出，由**引理 11.3** 即得转移函数光滑，从而 $\partial M$ 为 $n-1$ 维微分流形。由

    $$
    \varphi(U\cap \partial M)=\left\{x\in \varphi(U)\Big|x^n=0\right\}
    $$

    得 $\partial M$ 为 $M$ 的正则子流形，下证 $M$ 的定向给出 $\partial M$ 的定向。

    设 $(U,\varphi,x),(V,\psi,y)$ 为 $M$ 的含 $p\in \partial M$ 的局部坐标图，且 $\mathrm{det}(\psi\circ \varphi^{-1})'>0$。

    由于 $x^n\ge 0,y^n\ge 0$，且由**引理 11.3** 知取等仅当该点$\in \partial M$。故 $\psi\circ \varphi^{-1}$ 局部可表为：

    $$
    \begin{aligned}
    &y^l=y^k(x^1,\cdots,x^n),1\le k<n
    \\
    &y^n(x^1,\cdots,x^{n-1},0)=0
    \end{aligned}
    $$

    取 $q\in U\cap V\cap \partial M$，设 $\varphi(q)=(a^1,\cdots,a^{n-1},0)$，

    $$
    \det \left((\psi\circ \varphi^{-1})\Big|_{\varphi(q)}\right)=\left. \left| \begin{matrix}
    \left( \frac{\partial y^k}{\partial x^l} \right) _{1\le k,l\le n-1}&		\ast\\
    0&		\frac{\partial y^n}{\partial x^n}\\
    \end{matrix} \right| \right|_{\varphi \left( q \right)}
    $$

    考虑函数 $f(t)=y^n(a^1,\cdots,a^{n-1},t),t\ge 0$，那么 $f(t)\ge 0,t\ge 0$，从而

    $$
    \frac{\partial y^n}{\partial x^n}\Big|_\varphi(q)=f'(0)=\lim_{t\rightarrow 0^+}\frac{f(t)}{t}\ge 0
    $$

    但 $\det\left((\psi\circ \varphi^{-1})\Big|_{\varphi(q)}\right)>0$ 必须有 $\frac{\partial y^n}{\partial x^n}\Big|_{\varphi(q)}>0$，继而 $\det\left( \frac{\partial y^k}{\partial x^l} \right) _{1\le k,l\le n-1}>0$，即

    $$
    \begin{aligned}
    (U\cap \partial M,\left.\varphi\right|_{U\cap \partial M},\left.x\right|_{U\cap \partial M}=(x^1,\cdots,x^{n-1},0))
    \\
    (V\cap \partial M,\left.\psi\right|_{V\cap \partial M},\left.y\right|_{V\cap \partial M}=(y^1,\cdots,y^{n-1},0))\end{aligned}
    $$

    定向相容

!!! theorem "定理（Stokes）"
    设 $M$ 可定向，由 $[\Omega_M]$ 给出，$\partial M$ 赋予诱导定向 $\Omega_{\partial M}=i_{N_\text{外}}\Omega_M$。设 $\omega\in A_c^{n-1}(M)$，则

    $$
    \int_{(M,[\Omega_M])}\mathrm{d} \omega =\int _{(\partial M,[\Omega_{\partial M}])}\omega
    $$

??? proof "证明"
    由 $\int$ 的线性性，只需证 $\mathrm{supp}$ 包含于 $M$ 上一个可定向图册中某一个局部图 $(U,\varphi,x)$ 证明。此时设

    $$
    \omega=\sum_{k=1}^n (-1)^k \lambda^k \mathrm{d} x^1\land \cdots\land \check{\mathrm{d} x^k}\land \cdots\land \mathrm{d} x^n,\lambda^k\in C^\infty(U)
    $$

    则

    $$
    \mathrm{d} \omega=\left(\sum_{k=1}^n \frac{\partial \lambda^k}{\partial x^k}\right) \mathrm{d} x^1\land \cdots\land \mathrm{d} x^n
    $$

    从而

    $$
    \int _M \mathrm{d} \omega =\int _U \mathrm{d} \omega =\int _{\varphi(U)}\left(\sum_{k=1}^n \frac{\partial \lambda^k}{\partial x^k} \mathrm{d} x^1\land \cdots\land \mathrm{d} x^n\right)\circ \varphi^{-1}
    $$

    - $U\cap \partial M=\emptyset$，此时 $\varphi(U)$ 为 $\mathbb{R}^n$，不妨设 $\varphi(U)$ 包含于正方体 $C=\left\{\pi\in \mathbb{R}^n\Big|0\le \pi^k\le 1\right\}$

        由于 $\mathrm{supp}\omega\subseteq U$ 为紧集，可将 $\lambda^k\circ \varphi^{-1}$ 连续延拓至 $C$ 上，且在 $\varphi(U)$ 之外为 $0$。

        $$
        \begin{aligned}
        &\int _{\varphi(U)}\left(\sum_{k=1}^n \frac{\partial \lambda^k}{\partial x^k} \mathrm{d} x^1\cdots\mathrm{d} x^n\right)\circ \varphi^{-1}
        \\
        =&\int _{C}\left(\sum_{k=1}^n \frac{\partial \lambda^k}{\partial x^k} \mathrm{d} x^1 \cdots\mathrm{d} x^n\right)\circ \varphi^{-1}
        \\
        =&\sum_{k=1}^n\int _{C}\left( \frac{\partial \lambda^k\circ \varphi^{-1}}{\partial x^k} \mathrm{d} \pi^1 \cdots\mathrm{d} \pi^n\right)
        \\
        =&\sum_{k=1}^n\int_0^1\cdots\int_0^1\left(\lambda^k\circ \varphi^{-1}(\pi^1,\cdots,\pi^n)\right)\Big|_{\pi^k=0}^{1}\mathrm{d} \pi^1 \cdots\check{\mathrm{d} \pi^{k}}\cdots\mathrm{d} \pi^n
        \\
        (\lambda^k \text{在} \partial C \text{上为} 0)=&0
        \end{aligned}
        $$

    - $U\cap \partial M\neq\emptyset$，同上作 $\varphi(U)\subseteq C^\circ \cup \left\{\pi\in \mathbb{R}\Big| \pi^n=0\right\}$

        $$
        \begin{aligned}
        \int_M\mathrm{d} \omega=&\int_0^1\cdots\int _0^1 \mathrm{d} \pi^1\cdots\mathrm{d} \pi^{n-1}(0-\lambda^n\circ \varphi^{-1}(\pi^1,\cdots,\pi^n=0))(\text{只有} k=n \text{有贡献})
        \\
        =&\int_{\varphi(\partial M\cap U)}(-1)(\lambda^n\circ \varphi^{-1})\mathrm{d} \pi^1\cdots\mathrm{d} \pi^{n-1}
        \\
        =&\int_{[\partial M\cap U,\Omega_\partial M]}(-1)\lambda^n(-1)^n\mathrm{d} x^1\land\cdots\land\mathrm{d} x^{n-1}
        \\
        =&\int_{[\partial M\cap U,\Omega_\partial M]}(-1)^{n-1}\lambda^n\mathrm{d} x^1\land\cdots\land\mathrm{d} x^{n-1}
        \\
        =&\int_{[\partial M\cap U,\Omega_\partial M]}\omega
        \end{aligned}
        $$

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/differential-geometry-notes.pdf){ .md-button download="differential-geometry-notes.pdf" }
