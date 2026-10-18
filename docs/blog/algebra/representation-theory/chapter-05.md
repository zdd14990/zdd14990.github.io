---
title: 第五章：对称群 S_n 的表示
date: 2025-11-19
updated: 2026-10-15
description: 表示论笔记第五章：对称函数、Sₙ 表示的分类定理、对称群 Sₙ 的表示的分类定理的证明、诱导表示、表示环和对称函数、Aₙ 的表示、Schur-Weyl 对偶。
hide:
  - navigation
categories:
  - 代数
tags:
  - representation-theory
---

# 第五章：对称群 S_n 的表示 { #top }

## 1. 对称函数 { #s1 }

!!! definition "定义"
    一个**划分(partition)**为任意(有限或无限)非负整数序列 $\lambda=(\lambda_1,\lambda_2,\cdots)$ 满足 $\lambda_1\ge \lambda_2\ge \cdots$ 且仅含有限多个非零元。有时我们将 $\lambda$ 记作 $(1^{m_1}2^{m_2}\cdots)$，其中 $m_i=\#\left\{j\Big| \lambda_{j}=i\right\}$。仅当两个划分仅相差末尾的 $0$ 时，称这两个划分相等，例如 $(3,1)=(3,1,0)=(3,1,0,0,\cdots)$

    定义 $\lambda$ 的**长度(length)** $l(\lambda):=\#\left\{i\Big| \lambda_i\neq 0\right\}$，$\lambda$ 的**权(weight)** $\left|\lambda\right|:=\sum \lambda_i$。

    若 $\left|\lambda\right|=n$，我们称 $\lambda$ 为一个 $n$ 的划分，这样的划分构成集合 $P_n$，记 $P:=\bigcup_n P_n$。

!!! definition "定义"
    $P$ 上的**优于**关系：$\lambda\trianglerighteq \mu$ 当且仅当 $\left|\lambda\right|=\left|\mu \right|$ 且 $\lambda_1+\cdots+\lambda_i\ge \mu_1+\cdots+\mu_i,\forall i\ge 1$。

    $\lambda\triangleright \mu$ 当且仅当 $\lambda\trianglerighteq \mu$ 且 $\lambda \neq \mu$。

!!! definition "定义"
    $\lambda$ 的**Young 图**定义为

    $$
    Y_\lambda=\left\{(i,j)\in \mathbb{Z}^2\Big| 1\le j \le \lambda_i\right\}
    $$

!!! definition "定义"
    $\lambda$ 的**共轭划分** $\lambda'$ 定义为

    $$
    \lambda_j':=\#\left\{(i,j)\in Y_\lambda\Big| i\ge 1\right\}
    $$

    等价的，$Y_{\lambda'}$ 与 $Y_\lambda$ 关于对角线对称。

!!! theorem "命题"
    $$
    \lambda \trianglerighteq \mu\Longleftrightarrow \mu'\trianglerighteq \lambda'
    $$

!!! definition "定义"
    $$
    \wedge _n:=\mathbb{Z}[x_1,\cdots,x_n]^{S_n}=\bigoplus_{r\ge 0} \wedge _n^r
    $$

    为 $n$ 元对称多项式，其中 $\wedge _n^r$ 为 $r$ 次齐次 $n$ 元多项式。

!!! definition "定义"
    对每个 $\alpha =(\alpha_1,\cdots,\alpha_n)\in \mathbb{N}^n$，令 $x^\alpha:=x_1^{\alpha_1}\cdots x_n^{\alpha_n}$。令 $\lambda$ 为划分满足 $l(\lambda)\le n$，定义

    $$
    m_\lambda(x_1,\cdots,x_n)=\sum_\alpha x^\alpha
    $$

    其中求和号对所有 $\lambda=(\lambda_1,\lambda_2,\cdots,\lambda_n)$ 的不同排列求和。

!!! theorem "命题"
    - $\left\{m_\lambda\Big| l(\lambda)\le n\right\}$ 为 $\wedge _n$ 的 $\mathbb{Z}-$基。
    - $\left\{m_\lambda\Big| l(\lambda)\le n,\left|\lambda\right|=r\right\}$ 为 $\wedge _n^r$ 的 $\mathbb{Z}-$基。
    - 当 $n\ge r$ 时 $\left\{m_\lambda\Big| \left|\lambda\right|=r\right\}$ 为 $\wedge _n^r$ 的 $\mathbb{Z}-$基。

通常，使用无限多个变量的对称函数更为方便。对分次环存在满射

$$
\wedge ^{n+1}\rightarrow \wedge ^n,x_{n+1}\mapsto 0
$$

由定义

$$
m_\lambda(x_1,\cdots,x_{n+1})\mapsto\begin{cases}
m_\lambda(x_1,\cdots,x_n)&,l(\lambda)\le n\\
0&,l(\lambda)>n
\end{cases}
$$

将其限制在 $r$ 次多项式上就有 $\wedge _{n+1}\twoheadrightarrow \wedge _{n}^r$ 且当 $r\le n$ 时为双射。

!!! definition "定义"
    定义 $\wedge ^r:=\mathop {\underleftarrow{\lim}}\limits_ {n} \wedge _n^r,\forall r\ge 0$，$\wedge :=\bigoplus_{r\ge 0} \wedge ^r$。由定义，$\wedge ^r$ 中的元素形如 $f=(f_n)_{n\ge 0}$，其中 $f_n\in \wedge _n^r$ 满足 $f_{n+1}\big|_{x_{n+1}=0}=f_n$。$\wedge$ 为对称函数环。

由于当 $r\le n$ 时 $\wedge _{n+1}^r\mapsto \wedge _n^r$ 为同构，故此时投影 $\rho_n^r:\wedge ^r\mapsto \wedge _n^r,f\mapsto f_n$ 为同构。

!!! definition "定义"
    令 $m_\lambda:=(\rho_n^r)^{-1}(m_\lambda(x_1,\cdots,x_n))\in \wedge  ^r$，其中 $\left|\lambda\right|=r$，$m_\lambda$ 称作**对称单项式(monomial symmetric functions)**。

!!! theorem "命题"
    - $\left\{m_\lambda\Big| \left|\lambda\right|=r\right\}$ 为 $\wedge ^r$ 的 $\mathbb{Z}-$基。
    - $\left\{m_\lambda\right\}$ 是 $\wedge$ 的 $\mathbb{Z}-$基。

!!! definition "定义（初等对称多项式）"
    - $\forall r\in \mathbb{Z}_{\ge 0}$，令

        $$
        e_r:=m_{(1^r)}=\sum_{i_1<\cdots<i_r} x_{i_1}\cdots x_{i_r},r_0:=1
        $$

    - $\forall \lambda\in P$，定义

        $$
        e_\lambda:=e_{\lambda_1}\cdot e_{\lambda_2} \cdots
        $$

!!! theorem "命题"
    -

        $$
        E(t):=\sum_{r\ge 0}e_r t^r =\prod_{i\ge 1}(1+x_i t)
        $$

    - $\left\{e_\lambda\Big| \lambda \in P\right\}$ 是 $\wedge$ 的 $\mathbb{Z}-$基。

??? proof "证明"
    $(1)$ 是显然的。

    $(2)$ **提示：**证明

    $$
    e_{\lambda'}=m_\lambda+\sum_{\mu\triangleleft \lambda} a_{\lambda,\mu }m_\mu，a_{\lambda,\mu}\in \mathbb{Z}_{\ge 0}
    $$

于是 $\wedge =\mathbb{Z}[e_1,e_2,\cdots]$ 且 $\left\{e_1,e_2,\cdots\right\}$ 在 $\mathbb{Z}$ 上线性独立。

!!! definition "定义（完全对称多项式）"
    - $\forall r\in \mathbb{Z}_{\ge 0}$，令

        $$
        h_r:=m_{(1^r)}=\sum_{i_1\le\cdots\le i_r} x_{i_1}\cdots x_{i_r},h_0:=1
        $$

    - $\forall \lambda\in P$，定义

        $$
        h_\lambda:=h_{\lambda_1}\cdot h_{\lambda_2} \cdots
        $$

!!! definition "定义"
    对 $\wedge =\mathbb{Z}[e_1,e_2,\cdots]$，令 $\omega:\wedge \rightarrow\wedge ,e_r\mapsto h_r$ 为环同态。

!!! theorem "命题"
    -

        $$
        H(t):=\sum_{r\ge 0} h_r t ^r =\prod_{i\ge 1} (1-x_it)^{-1}
        $$

    -

        $$
        \sum_{r=0}^n (-1)^r e_r h_{n-r}=0,\forall n\ge 1
        $$

    - $\left\{h_\lambda\Big| \lambda \in P\right\}$ 是 $\wedge$ 的 $\mathbb{Z}-$基。

??? proof "证明"
    $(1)$：由 $\frac{1}{1-x_it}=\sum_{n\ge 0} x_i^n t^n$ 即得。

    $(2)$：由 $E(-t)H(t)=1$ 即得。

    $(3)$：由 $(2)$ 知 $\omega(h_r)=e_r$，于是 $\omega^2=1$，即 $\omega$ 是 $\wedge$ 上的对合元，结合 $\omega(e_r)=h_r$ 即证。

!!! definition "定义（等幂和）"
    - $\forall r\ge 1$，令

        $$
        P_r:=m_(r)=\sum_i x_i^r
        $$

    - $\forall \lambda\in P$，定义

        $$
        P_\lambda:=P_{\lambda_1}\cdot P_{\lambda_2}\cdots
        $$

!!! theorem "命题"
    -

        $$
        P(t):=\sum_{r\ge 1} P_r \cdot t^{r-1}=\sum_i \frac{x_i}{1-x_i t}
        $$

    - $\left\{P_\lambda\Big| \lambda\in P\right\}$ 是 $\wedge _\mathbb{Q}:=\mathbb{Q}\otimes_\mathbb{Z} \wedge$ 的 $\mathbb{Q}-$基。

    -

        $$
        \omega(P_r)=(-1)^{r-1}P_r,\omega(P_\lambda)=(-1)^{\left|\lambda\right|-l(\lambda)}P_\lambda
        $$

    - 对 $\lambda=(1^{m_1}2^{m_2}\cdots)$，定义 $z_\lambda=\prod_{r\ge 1} (r^{m_r}\cdot m_r!)$，则

        $$
        h_n=\sum_{\left|\lambda\right|=n} z_\lambda^{-1}\cdot P_\lambda
        $$

??? proof "证明"
    $(1)$：显然。

    $(2)$：回忆 $H(t)=\prod_{i\ge 1} \frac{1}{1-x_it}$，故 $P(t)=\frac{H'(t)}{H(t)}$，于是 $H'(t)=P(t)H(t)$，此即 $nh_n=\sum_{r=1}^nP_rh_{n-r}$，故 $h_n\in \mathbb{Q}[P_1,\cdots,P_n],P_n\in \mathbb{Z}[h_1,\cdots,h_n]$，故 $\mathbb{Q}[P_1,\cdots,P_n]=\mathbb{Q}[h_1,\cdots,h_n]$，于是 $\wedge_\mathbb{Q}=\mathbb{Q}[P_1,P_2,\cdots]$ 且 $\wedge^r_\mathbb{Q}=\mathrm{Span}_{\mathbb{Q}} \left\{P_\lambda\Big| \left|\lambda\right|=r\right\}=\mathrm{Span}_{\mathbb{Q}} \left\{h_\lambda\Big| \left|\lambda\right|=r\right\}$，由于 $\dim \wedge^r_\mathbb{Q} =\left\{\lambda \Big| \left|\lambda\right|=r\right\}$，故 $\left\{P_\lambda\Big| \lambda\in P\right\}$ 是 $\wedge_\mathbb{Q}$ 的 $\mathbb{Q}-$基。

    $(3)$：回忆 $E(t)=\prod_{i\ge 1} (1+x_it)$，故 $P(-t)=\sum_i \frac{x_i}{1+x_it}=\frac{E'(t)}{E(t)}$，结合 $P(t)=\frac{H'(t)}{H(t)}$ 与 $\omega(e_r)=h_r$ 知 $\omega(P(-t))=P(t)$，即 $\omega(P_r)=(-1)^{r-1}P_r$。

    $(4)$：$P(t)=\frac{\mathrm{d}}{\mathrm{d} t}(\log H(t))$，故

    $$
    H(t)=\exp (\sum_{r\ge 1} \frac{P_r t^r}{r})=\prod_{r\ge 1} \exp (\frac{P_rt^r}{r})=\prod_{r\ge 1} (\sum_{m_r\ge 0} \frac{1}{m_r !}(\frac{P_rt}{r})^{m_r})
    $$

    对应系数即证。

!!! definition "定义（标量乘法）"
    设 $x=(x_1,x_2,\cdots),y=(y_1,y_2,\cdots)$ 为两个独立变量列。$\forall f\in \wedge$，记 $f(x),f(y),f(xy)$ 为对应的对称函数。

!!! theorem "命题"
    $$
    P_n(xy)=\sum_{i,j} (x_iy_j)^n =P_n(x)P_n(y)
    $$

    进一步有 $P_\lambda(xy)=P_\lambda(x)P_\lambda(y)$

!!! definition "定义"
    $$
    \prod(x,y):=\prod_{i,j} (1-x_iy_j)^{-1}
    $$

!!! theorem "引理"
    $$
    \prod (x,y)=\sum_\lambda z_\lambda^{-1} P_\lambda(x)P_\lambda(y)=\sum_\lambda h_\lambda(x)m_\lambda(y)=\sum_\lambda m_\lambda(x)h_\lambda(y)
    $$

??? proof "证明"
    由于 $\sum_{r\ge 0} h_rt^r=\prod_{i\ge 1} (1-x_it)^{-1}$，故

    $$
    \prod (x,y)=\sum_{n\ge 0}h_n(xy)=\sum_\lambda z_\lambda^{-1} P_\lambda(xy)=\sum_\lambda z_\lambda^{-1}P_\lambda (x)P_\lambda(y)5
    $$

    另一方面我们有

    $$
    \prod (x,y)=\prod_j H(y_j)=\prod _j (\sum_{\alpha_j\ge 0} h_{\alpha_j}(x)y_j^{\alpha_j})=\sum_\lambda h_\lambda(x)m_\lambda(y)=\sum_\lambda m_\lambda(x)h_\lambda(y)
    $$

!!! definition "定义"
    定义$\left<-,-\right>:\wedge  \times \wedge  \rightarrow \mathbb{Z}$ 满足		$\left<h_\lambda,m_\mu\right>=\delta_{\lambda\mu}$。

!!! theorem "引理"
    $\forall n\ge 0$，$\left\{u_\lambda\right\},\left\{v_\lambda\right\}$ 是 $\wedge ^n_\mathbb{Q}$ 的 $\mathbb{Q}-$基，则

    $$
    \left<u_\lambda,v_\mu\right> =\delta_{\lambda\mu} \Longleftrightarrow \sum_\lambda u_\lambda(x)v_\lambda(y)=\prod(x,y)
    $$

??? proof "证明"
    设 $u_\lambda=\sum_\rho a_{\lambda,\rho}h_\rho,v_\mu =\sum_\sigma b_{\mu ,\sigma} m_\sigma$，则

    $$
    \left<u_\lambda,v_\mu\right>=\delta_{\lambda,\mu}\Longleftrightarrow \sum_\rho a_{\lambda,\rho}b_{\mu,\rho}=\delta_{\lambda,\mu}
    $$

    $$
    \sum u_\lambda(x)v_\lambda (y)=\prod (x,y)=\sum h_\rho(x)m_\rho(y)\Longleftrightarrow \sum_\lambda a_{\lambda,\rho}b_{\lambda,\sigma}=\delta_{\rho,\sigma}
    $$

!!! theorem "推论"
    -

        $$
        \left<P_\lambda,P_\mu\right>=\delta_{\lambda\mu}z_\lambda
        $$

        于是 $\left<-,-\right>$ 是对称的且正定。

    - $\omega$ 是等距同构，即 $\forall f,g\in \wedge$，有

        $$
        \left<\omega f,\omega g\right>=\left<f,g\right>
        $$

??? proof "证明"
    $(1)$：由 $\prod (x,y)=\sum z_\lambda^{-1}P_\lambda(x)P_\lambda(y)$ 与**引理 4.7**即证。

    $(2)$：由 $(1)$ 与 $\omega(P_r)=(-1)^{r-1}P_r$ 即证。

!!! definition "定义（Schur 多项式）"
    - $\forall \alpha=(\alpha_1,\alpha_2,\cdots)\in \mathbb{Z}_{\ge 0}^n$，令

        $$
        a_\alpha:=\det(x_i^{\alpha_j})_{1\le i,j\le n}=\sum_{\sigma\in S_n} \varepsilon(\sigma)\cdot \sigma(x^\alpha)
        $$

        其中 $\varepsilon(\sigma)=\mathrm{sgn} (\sigma),x^\alpha=x_1^{\alpha_1}\cdots x_n^{\alpha_n}$

    - 对 $\lambda=(\lambda_1,\cdots,\lambda_n)\in P$，定义 Schur 多项式

        $$
        S_\lambda(x_1,\cdots,x_n)=a_{\lambda+\delta}/a_\delta
        $$

        其中 $\delta=(n-1,n-2,\cdots,2,1,0)$。

由 Vandermonde 行列式知 $a_\delta=\prod_{i<j} (x_i-x_j)$。

$a_{\lambda+\delta}$ 被 $a_\delta$ 整除，于是 $S_\lambda\in \wedge _n^{\left|\lambda\right|}$，进一步有存在 Schur 多项式 $S_\lambda\in \wedge$ 使得 $S_\lambda\big|_{x_{n+1}=x_{n+2}=\cdots=0}=S_\lambda(x_1,\cdots,x_n)$ 对任意 $n\ge l(\lambda)$ 成立。

$S_\lambda(x_1,\cdots,x_n)=a_{\lambda+\delta}/a_\delta$ 对 $\lambda=(\lambda_1,\cdots,\lambda_n)\in \mathbb{Z}_{\ge 0}^n$ 也适用，这是因为 $a_{\lambda+\delta}=\varepsilon(\sigma)a_{\sigma(\lambda+\delta)}$，且 $S_\lambda=0$ 当且仅当 $\lambda+\delta$ 有两个相等的项。

!!! theorem "命题"
    对任意 $\lambda\in P$，存在 $K_{\lambda,\mu}\in \mathbb{Z}$ 满足

    $$
    S_\lambda=m_\lambda +\sum_{\mu\triangleleft \lambda} K_{\lambda,\mu} m_\mu
    $$

    于是 $\left\{ S_\lambda \Big| \lambda \in P\right\}$ 是 $\wedge$ 的 $\mathbb{Z}-$基。这里的 $K_{\lambda,\mu}\in \mathbb{Z}_{\ge 0}$ 称作 Kostka 数。

??? proof "证明"
    考虑 $n$ 个变量的情形，$n\ge \left|\lambda\right|$。

    $$
    m_\lambda\cdot a_\delta=\sum_{\substack{\mu \text{ 为 }\lambda \text{ 的任一排列}\\ \sigma \in S_n}} \varepsilon(\sigma) x^{\mu +\sigma(\delta)}=\sum_{\mu,\sigma} \varepsilon(\sigma) x^{\sigma(\mu+\delta)}=\sum_\mu a_{\mu+\delta}
    $$

    这意味着

    $$
    m_\lambda=\sum_{\substack{\mu \text{ 为 }\lambda \text{ 的任一排列}}} x^{\mu}=\sum_{\mu} x^{\sigma(\mu)},\forall \sigma \in S_n
    $$

    故

    $$
    m_\lambda=\sum_{\mu \text{ 为 }\lambda \text{ 的任一排列}} S_\mu\in \wedge _n
    $$

    对 $n\ge \left|\lambda\right|$ 成立，故在 $\wedge$ 中同样成立。由上文知要么 $S_\mu=0$，要么 $s_\mu=\varepsilon(\sigma)\cdot s_v$，其中 $v\in P$ 且 $v+\delta=\sigma(\mu+\delta)$ 对任意 $\sigma\in S_n$。由于 $\mu$ 是 $\lambda$ 的任一排列，故 $v\trianglelefteq \lambda$，因此

    $$
    m_\lambda=S_\lambda+\sum_{v\triangleleft \lambda} a_{\lambda,v} S_v
    $$

!!! theorem "定理"
    对任意 $\lambda,\mu\in P$，有

    $$
    \left<S_\lambda,S_\mu\right>=\delta_{\lambda,\mu}
    $$

??? proof "证明"
    只需证

    $$
    \sum_\lambda S_\lambda(x)S_\lambda(y)=\prod (x,y)
    $$

    考虑 Cauchy 行列式我们有

    $$
    \det \left(\frac{1}{x_i+y_j}\right)_{1\le i,j\le n}=\frac{a_\delta(x)a_\delta(y)}{\prod_{1\le i,j\le n} (x_i+y_j)}
    $$

    在上式中用 $-x_i^{-1}$ 替换掉 $x_i$ 得

    $$
    \det \left(\frac{1}{1-x_iy_j}\right)_{1\le i,j\le n}={a_\delta(x)a_\delta(y)}{\prod (x,y)}
    $$

    另一方面我们有

    $$
    \begin{aligned}
    \det \left(\frac{1}{1-x_iy_j}\right)_{1\le i,j\le n}&=\det \left(\sum_{\alpha\ge 0}x_i^{\alpha_j}y_j^{\alpha_j}\right)\\
    &=\sum_{\alpha=(\alpha_1,\cdots,\alpha_n)\in \mathbb{Z}^n_{\ge 0}} a_\alpha(x)\cdot y^\alpha\\
    &=\sum_{\substack{\lambda\in P\\l(\lambda)\le n}} \sum_{\substack{\alpha\in \sigma(\lambda+\delta)\\\sigma\in S_n}} \varepsilon (\sigma)\cdot a_{\lambda+\delta}(x)\cdot \sigma(y^{\lambda+\delta})\\
    &=\sum_{\substack{\lambda\in P\\l(\lambda)\le n}} a_{\lambda+\delta}(x)\sum_{\sigma\in S_n} \varepsilon (\sigma)\cdot \sigma(y^{\lambda+\delta})\\
    &=\sum_{\substack{\lambda\in P\\l(\lambda)\le n}} a_{\lambda+\delta}(x)a_{\lambda+\delta}(y)\\
    \end{aligned}
    $$

    故

    $$
    \prod(x,y)=\sum_{\lambda\in P,l(\lambda)\le n} S_\lambda(x)S_\lambda(y)
    $$

    令 $n\rightarrow \infty$ 即证。

!!! theorem "命题（Jacobi-Trudy 等式/Giambelli 公式）"
    - 对 $\forall \lambda\in P,l(\lambda)\le n$，有

        $$
        S_\lambda=\det (h_{\lambda_i-i+j})_{1\le i,j\le n}
        $$

        这里约定对 $r<0$，$h_r=0$。

    - 对 $\forall \lambda\in P,l(\lambda')\le m$，有

        $$
        S_\lambda=\det (e_{\lambda'_i-i+j})_{1\le i,j\le m}
        $$

??? proof "证明"
    $(1)$：对 $x=(x_1,\cdots,x_n),y=(y_1,\cdots,y_n)$，回忆我们有

    $$
    H(t)=\sum_{r\ge 0} h_r(x)t^r=\prod_i \frac{1}{1-x_it}
    $$

    带入

    $$
    \prod{\left( x,y \right) =\prod_{i,j}{\frac{1}{1-x_iy_j}=\prod_{i=1}^n{H\left( y_j \right)}}}
    $$

    我们有：

    $$
    \begin{aligned}
    \prod\left( x,y \right) \cdot a_{\delta}\left( y \right) &=\det \left( y_{i}^{n-j}\cdot H\left( y_i \right) \right) \\
    &=\det \left( \sum_{\alpha _j\ge 0}{h_{\alpha _j}\left( x \right) y_{i}^{n-j+\alpha _j}} \right) \\
    &=\sum_{\alpha =\left( \alpha _1,\cdots ,\alpha _n \right) \in \mathbb{Z} _{\ge 0}^{n}}{h_{\alpha}\left( x \right) \cdot a_{\alpha +\delta}\left( y \right)}
    \end{aligned}
    $$

    对于 $\lambda\in P$，$l(\lambda)\le n$，$\prod (x,y)\cdot a_\delta (y)$ 中 $a_{\lambda+\delta }(y)$ 的系数为

    $$
    \sum_{\sigma \in S_n}\mathrm{sgn}(\sigma)\cdot h_{\sigma(\lambda+\delta)-\delta}=\det(h_{\lambda_i-i+j})_{1\le i,j\le n}
    $$

    而

    $$
    \prod (x,y)a_\delta(y)=\sum_{\mu \in P,l(\mu)\le n} S_\mu(x)S_\mu(y)a_\delta(y)=\sum_{\mu \in P,l(\mu)\le n} S_\mu(x)a_{\mu+\delta}(y)
    $$

    其中 $a_{\lambda+\delta }(y)$ 的系数为  $S_\lambda(x)$，由此即证。

    $(2)$：先证明如下引理

    !!! theorem "引理"
        设 $\lambda = (\lambda_1, \ldots, \lambda_n)$ 和 $\mu = (\mu_1, \ldots, \mu_m) = \lambda$（蕴含 $\lambda_1 = m, \mu_1 = n$），则集合：

        $$
        \{\lambda_i + n + 1 - i \mid 1 \leq i \leq n\} \quad \text{和} \quad \{n + j - \mu_j \mid 1 \leq j \leq m\}
        $$

        构成集合 $\{1, 2, \cdots, n+m\}$ 的一个不交并。

    ??? proof "证明"
        画出 Young 表的对角线即证。

    设 $A, B \in \operatorname{Mat}_r(\mathbb{C})$，且 $A\cdot B = c\cdot I_r$=。令 $(s, s')$ 和 $(t, t')$ 为 $(1, 2, \cdots, n)$ 的置换，满足 $\left|s\right|=\left|t\right|= k$。定义$A_{S,T} = \det\left(a_{s_i,t_j}\right)_{i,j}$。类似地定义 $B_{T',S'}$，则有：

    $$
    c^{r-k} A_{S,T} = \sigma \cdot \det(A) \cdot B_{T',S'}
    $$

    其中 $\sigma$ 是两个置换的 $\mathrm{sgn}$ 乘积。这是因为考虑三个置换矩阵 $P, Q,$ 满足

    $$
    PAQ = \begin{pmatrix}
    A_1 & A_2 \\
    A_3 & A_4
    \end{pmatrix}, \quad \det A_1 = A_{S,T}
    $$

    $$
    Q^{-1} B P^{-1} = \begin{pmatrix}
    B_1 & B_2 \\
    B_3 & B_4
    \end{pmatrix}, \quad B_{T',S'} = \det B_{4}
    $$

    $$
    \begin{pmatrix}
    A_1 & A_2 \\
    A_3 & A_4
    \end{pmatrix}
    \begin{pmatrix}
    I_{k} & B_2 \\
    0 & B_4
    \end{pmatrix} =
    \begin{pmatrix}
    A_1 & 0 \\
    A_3 & cI_{r-k}
    \end{pmatrix}
    $$

    对上述等式两边取行列式即得。

    需证明：

    $$
    S_n = \det \left( e_{\lambda_i'-i+j} \right)_{1\le i,j\le m}
    $$

    定义下三角矩阵 $H=(h_{i-j})_{1\le i,j\le N}$ 和 $E=((-1)^{i-j}e_{i-j})_{1\le i,j\le N}$，其中 $N=n+m$，$H,E$ 是上对角矩阵且对角线为 1。回忆我们有

    $$
    \sum_{r=0}^{n} (-1)^re_r h_{h-r} = 0, \quad \forall n \geq 1
    $$

    从而有：

    $$
    H \cdot E = I_{N}
    $$

    对以下序列应用引理：

    $$
    \begin{aligned}
    S &= (\lambda_1 + n, \cdots, \lambda_i + n+1-i, \cdots, \lambda_n+1)\\
    T &= (n, n-1, \cdots, n-j+1, \cdots, 1)\\
    S'& = (n+1-\mu_1, \cdots, n+i-\mu_i, \cdots,n+m-\mu_m)\\
    T' &= (n+1, \cdots, n+j, \cdots, n+m)\\
    \end{aligned}
    $$

    则有：

    $$
    H_{S,T} = \det \left(h_{\lambda_i-i+j}\right) = S_\lambda
    $$

    $$
    \begin{aligned}
    E_{T',S'} &= \det\left( (-1)^{i-j+\mu_j}e_{\mu_j+i-j}\right)_{1\le i, j\le m}\\
    &=(-1)^{\sum (\mu_j-j)+\sum i}\det \left(e_{\mu_j+i-j}\right)_{1\le i,j\le m}\\
    &=(-1)^{\left|\lambda\right|}\det (e_{\mu_i+j-i})_{1\le i,j\le m}\\
    \end{aligned}
    $$

!!! theorem "推论"
    $$
    \omega(S_\lambda)=S_{\lambda'}
    $$

考虑 $S_\lambda\cdot S_\mu =\sum_\nu c_{\lambda\mu}^\nu S_\nu$，$c_{\lambda\mu}^\nu \in \mathbb{Z}$ 称为 Littlewood-Richardson 常数。我们之后会证明 $c_{\lambda\mu}^\nu\in \mathbb{Z}_{\ge 0}$。

令 $\mu=(r)$，则 $S_{\mu}=h_r$，我们有如下公式：

!!! theorem "命题（Pieri 公式）"
    $$
    S_\lambda \cdot h_r=\sum_\lambda S_\lambda
    $$

    这里求和遍历满足 $\lambda\setminus \mu$ 是水平 $r-$条(horizontal r-strip)的分拆 $\lambda$。即 $\lambda$ 的 Young 图包含了 $\mu$ 的 Young 表且仅相差 $r$ 个方格，且这 $r$ 个方格两两均不同列，即 $\lambda_1\ge \mu_1\ge \lambda_2\ge \mu_2\ge\cdots \ge \lambda_l\ge \mu_l\ge 0,\left|\lambda\right|=\left|\mu\right|+r$。

!!! theorem "推论"
    设 $K_{\lambda,\mu}$ 为满足以下条件的填法数目：用 $\mu_1$ 个 $1$，$\mu_2$ 个 $2$，$\cdots$，$\mu_l$ 个 $l$ 填充 Young 表 $Y(\lambda)$ 的方框，使得每行的数字非递减且每列的数字严格递增。

**注：**此类填法被称为分拆 $\lambda$ 上类型为 $\mu$ 的半标准 Young 表。

!!! theorem "命题"
    - $K_{\lambda,\mu}\in\mathbb{Z}_{\ge 0}$
    - $K_{\lambda,\lambda}=1$
    - $K_{\lambda,\mu}\neq 0\Longrightarrow \mu \trianglelefteq \lambda$
    - $K_{\lambda,(1^n)}=\#\left\{Y(\lambda) \text{的标准 Young 表}\right\}$。即将 $\left\{1,2,\cdots,n\right\}$ 填入 $Y(\lambda)$ 满足每行每列的数字严格递增的填法数。

??? proof "证明"
    $$
    h_\mu=\sum_\lambda K_{\lambda,\mu}S_\lambda=h_{\mu_1}\cdots h_{\mu_l}=S_{(\mu_1)}h_{\mu_2}\cdots h_{\mu_l}
    $$

    再用

    $$
    S_\mu\cdot h_r=\sum_{\substack{\lambda\\ \lambda-\mu \text{ 为水平 }r-\text{条}}}S_\lambda
    $$

## 2. $S_n$ 表示的分类定理 { #s2 }

!!! definition "定义"
    设 $\lambda \in P(n)$ 是一个 $n$ 的分划。$Y_\lambda$ 是其 Young 表，标准填充 Young 表 $T_\lambda$ 为将 $\left\{1,2,\cdots,n\right\}$ 填入 $Y(\lambda)$ 满足每行每列的数字严格递增的填法。对这个标准填充 $T_\lambda$ 定义**列子群(row subgroup)**

    $$
    P_\lambda:=\left\{g\in S_n\Big| i \text{ 与 } g(i) \text{ 在同一行 },\forall 1\le i\le n\right\}
    $$

    **行子群(column subgroup)**

    $$
    Q_\lambda:=\left\{g\in S_n\Big| i \text{ 与 } g(i) \text{ 在同一列 },\forall 1\le i\le n\right\}
    $$

**注：** $P_\lambda\cap Q_\lambda=\left\{1\right\}$。

!!! definition "定义"
    定义 **Young 投影子(projectors)**，

    $$
    a_\lambda:=\sum_{g\in P_\lambda} g,b_\lambda:=\sum_{g\in Q_\lambda} \varepsilon(g)\cdot g,c_\lambda:=a_\lambda b_\lambda
    $$

!!! theorem "定理"
    $V_\lambda:=\mathbb{C}[S_n]\cdot c_\lambda$ 在左乘运算下为 $S_n$ 的不可约表示。任意 $S_n$ 的不可约表示同构于某个 $V_\lambda$。

**注：**$V_\lambda$ 称为 **Specht 模**。

!!! theorem "推论"
    任意 $S_n$ 的不可约表示可以由有理数构成的矩阵集合给出。

## 3. 对称群 $S_n$的表示的分类定理的证明 { #s3 }

!!! theorem "引理"
    存在线性函数 $l_\lambda:\mathbb{C}[S_n]\rightarrow \mathbb{C}$ 满足对任意 $x\in \mathbb{C}[S_n]$，有

    $$
    a_\lambda\cdot x \cdot b_\lambda=l_\lambda(x)\cdot c_\lambda
    $$

??? proof "证明"
    若 $g \in P_\lambda Q_\lambda$，则 $g$ 可唯一表示为 $pq$（其中 $p \in P_\lambda$，$q \in Q_\lambda$），故 $a_\lambda g b_\lambda = (-1)^q c_\lambda$。因此，只需证明：若置换 $g \notin P_\lambda Q_\lambda$，则 $a_\lambda g b_\lambda = 0$。

    要证明这一点，只需找到一个对换 $t$ 满足 $t \in P_\lambda$ 且 $g^{-1} t g \in Q_\lambda$；此时

    $$
    a_\lambda g b_\lambda = a_\lambda t g b_\lambda = a_\lambda g \cdot (g^{-1} t g) \cdot b_\lambda = -a_\lambda g b_\lambda,
    $$

    故 $a_\lambda g b_\lambda = 0$。换言之，我们需要找到两个元素 $i,j$，它们在 $T = T_\lambda$ 的同一行中，且在 $T' = gT$ 的同一列中（其中 $gT$ 是与 $T$ 形状相同的 Young 表，由置换 $g$ 置换 $T$ 的元素得到）。因此，只需证明：若不存在这样的元素对，则 $g \in P_\lambda Q_\lambda$，即存在 $p \in P_\lambda$，$q' \in Q'_\lambda := g Q_\lambda g^{-1}$ 使得 $pT = q' T'$（此时 $g = p q^{-1}$，且 $q = g^{-1} q' g \in Q_\lambda$）。

    $T$ 第一行中的任意两个元素在 $T'$ 中必处于不同列，因此存在 $q'_1 \in Q'_\lambda$ 将这些元素全部移到第一行。于是存在 $p_1 \in P_\lambda$ 使得 $p_1 T$ 与 $q'_1 T'$ 的第一行相同。

    对第二行执行相同步骤，找到元素 $p_2, q'_2$ 使得 $p_2 p_1 T$ 与 $q'_2 q'_1 T'$ 的前两行相同。依此类推，可构造出所需的元素 $p, q'$。得证。

!!! definition "定义（Lexicographic 序）"
    对 $\lambda,\mu\in P(n)$，定义 $\lambda>\mu$ 当且仅当 $\lambda_i-\mu_i$ 的第一个非零元是正的。

!!! theorem "引理"
    若 $\lambda>\mu$，则

    $$
    a_\lambda \mathbb{C}[S_n]b_\mu=0
    $$

??? proof "证明"
    与前一个引理类似，只需证明：对任意 $g \in S_n$，存在对换 $t \in P_\lambda$ 使得 $g^{-1} t g \in Q_\mu$。

    设 $T = T_\lambda$ 且 $T' = gT_\mu$。我们断言存在两个整数，它们既在 $T$ 的同一行中，又在 $T'$ 的同一列中。事实上，若 $\lambda_1 > \mu_1$，由抽屉原理（仅看第一行即得）可知这一点显然成立。反之，若 $\lambda_1 = \mu_1$，则如前一个引理的证明，可找到元素 $p_1 \in P_\lambda$、$q'_1 \in g Q_\mu g^{-1}$，使得 $p_1 T$ 与 $q'_1 T'$ 的第一行相同；对第二行重复该论证，依此类推。最终，在完成 $i-1$ 步后，必有 $\lambda_i > \mu_i$，这意味着第一个表格第 $i$ 行中存在两个元素在第二个表格的同一列中，得证。

!!! theorem "引理"
    - 对任意 $\lambda\in P(n)$，$V_\lambda$ 是 $S_n$ 的不可约表示。
    - 对任意 $\lambda\neq \mu\in P(n)$，则 $V_\lambda\ncong V_\mu$。

!!! theorem "推论"
    $$
    c_\lambda ^2=\frac{n!}{\dim V_\lambda} \cdot c_\lambda
    $$

??? proof "证明"
    **引理 5.4** 表明 $c_\lambda^2$ 与 $c_\lambda$ 成比例。此外，易见 $c_\lambda$ 在正则表示中的迹为 $n!$（因 $c_\lambda$ 中单位元的系数为 1）。由此可得所述结论。

## 4. 诱导表示 { #s4 }

回忆 $\forall \lambda\in P(n),P_\lambda=S_{\lambda_1}\times S_{\lambda_2}\times \cdots \times S_{\lambda_2}\subseteq S_n$

!!! definition "定义"
    $$
    M_\lambda:=\mathrm{Ind}_{P_\lambda}^{S_n} (\text{trival})=\mathrm{Ind}_{P_\lambda}^{S_n}\mathbb{C}
    $$

**注：**回忆 $a_n=\sum_{g\in P_\lambda} g$ ，故 $M_\lambda=\mathbb{C}[S_n]\otimes _{\mathbb{C}[P_\lambda]}\mathbb{C}\cong \mathbb{C}[S_n]a_\lambda$

!!! theorem "引理"
    设 $A$ 为含幺代数，$e\in A$ 为一幂等元，即 $e^2=e$。则对任意 $A-$模 $M$，有

    $$
    \mathrm{Hom}_A(Ae,M)\cong eM
    $$

??? proof "证明"
    任意 $f\in \mathrm{Hom}_A(Ae,M)$ 由 $f(e)=f(e^2)=ef(e)\in eM$ 唯一确定。

又注意到 $\frac{1}{\left|P_\lambda\right|}\sum_{g\in P_\lambda} g=\frac{1}{\left|P_\lambda\right|}a_\lambda\in \mathbb{C}[S_n]$ 是幂等元，故：

!!! theorem "命题"
    若 $\mu<\lambda$，则 $\mathrm{Hom}_{\mathbb{C}[S_n]}(M_\lambda,V_\mu)=0$，$\dim\mathrm{Hom}_{\mathbb{C}[S_n]}(M_\lambda,V_\lambda)=1$。于是 $M_\lambda=\bigoplus_{\mu\ge \lambda} k_{\mu,\lambda}V_\mu$，其中 $k_{\mu,\lambda}\in \mathbb{Z}_{\ge 0},k_{\lambda,\lambda}=1$。

**注：**回忆 $s_\lambda=m_\lambda+\sum_{\mu \triangleleft \lambda}K_{\lambda,\mu} m_\mu\in \wedge$，我们将会证明 $k_{\mu,\lambda}=K_{\mu,\lambda}$。

??? proof "证明"
    由引理，

    $$
    \mathrm{Hom}_{\mathbb{C}[S_n]} (M_\lambda,V_\mu)=a_\lambda \mathbb{C}[S_n]a_\mu b_\mu=\begin{cases}
    0 &,\lambda>\mu\\
    \mathbb{C}\cdot c_\lambda &,\lambda=\mu\\
    \end{cases}
    $$

    最后一个等号由**引理 5.4**与**引理 5.5**给出。

!!! definition "定义"
    对 $\mu=(1^{m_1}2^{m_2}\cdots)\in P(n)$，设 $C_\mu\subset S_n$ 为有 $m_i$ 个长度为 $i$ 的循环的的共轭类。对任意 $S_n$ 的表示 $V$，$\chi_V(C_\mu):=\chi_V(g)$，其中 $g\in C_\mu$。

回忆 $P_\mu(x)=P_{\mu_1}\cdot P_{\mu_2}\cdots$ 为对称等幂和函数。对任意多项式 $f$ 与 $\alpha=(\alpha_1,\cdots,\alpha_l)\in \mathbb{Z}_{\ge 0}^l$，记 $[x^\alpha](f)$ 为 $f$ 中 $x^\alpha$ 的系数。

!!! theorem "定理"
    表示 $M_\lambda$ 的特征在共轭类 $C_\mu$ 上取值为

    $$
    \chi_{M_\lambda} (C_\mu)=[x^\lambda](P_\mu)
    $$

!!! theorem "推论"
    我们有

    $$
    P_\mu=\sum_\lambda \chi_{M_\lambda}(C_\mu)\cdot m_\lambda,h_\lambda=\sum_\mu \frac{1}{z_\mu} \chi_{M_\lambda}(C_\mu)\cdot P_\mu
    $$

    其中 $\mu=(1^{m_1}2^{m_2}\cdots),z_\mu=\prod_{r\ge 1} (r^{m_r}\cdot m_r!)=\# Z_{S_n}(g),g\in C_\mu$

## 5. 表示环和对称函数 { #s5 }

!!! definition "定义"
    $R_n:=$ $S_n$ 的不可约表示的同构类上的自由阿贝尔群。

**注：**$S_n$ 的表示 $V$ 给出了 $R_n$ 上一个元素 $[V]$，等价地，$R_n=$ $S_n$ 的表示的 Grothendieck 群 $:= \left\{\text{同构类} [V]\right\}/\left\{[V\oplus W]=[V]\oplus [W]\right\}$

!!! definition "定义"
    $$
    R:=\bigoplus_{n\ge 0} R_n
    $$

    其中 $R_0=\mathbb{Z}$，伴有 $R_n\times R_m\rightarrow R_{n+m},[V]\cdot [W]=[\mathrm{Ind}_{S_n\times S_m}^{S_{n+m}} V\otimes W]$。这里 $S_n=\left\{1,2,\cdots,n\right\}$ 的置换 $\subseteq S_{n+m}$，$S_m=\left\{n+1,\cdots,n+m\right\}$ 的置换 $\subseteq S_{n+m}$，$S_n\times S_m \curvearrowright  V\otimes W$ 由 $(\sigma \times \tau )(v\otimes w)=\sigma v\otimes \tau w$ 给出。

容易验证 $(R,\circ )$ 为有结合律交换律的含幺分次环。

!!! definition "定义"
    $$
    \begin{aligned}
    \left<-,-\right>:R\times R&\rightarrow \mathbb{Z}\\
    ([V],[W])&\mapsto \begin{cases}
    \frac{1}{n!}\sum_{g\in S_n} \chi_V(g)\cdot \overline{\chi_W(g)}&,[V],[W]\in R_n\\
    0&,otherwise
    \end{cases}
    \end{aligned}
    $$

**注：**由于 $S_n$ 的任意不可约表示 $V_\lambda$ 都有 $\chi_{V_\lambda}(g)\in \mathbb{R}$，故

$$
\begin{aligned}
([V],[W])=&\frac{1}{n!}\sum_{g\in S_n} \chi_V(g)\cdot \chi_W(g)\\
(\left|z_\mu\right|\cdot \left|C_\mu\right|=\left|S_n\right|)=&\sum_{\mu\in P(n)} \frac{1}{z_\mu} \chi_V(C_\mu)\chi_W(C_\mu)
\end{aligned}
$$

!!! definition "定义"
    定义可加同态

    $$
    \begin{aligned}
    \varphi:\wedge &\rightarrow R\\
    h_\lambda &\mapsto [M_\lambda]\\
    \end{aligned}
    $$

!!! theorem "定理"
    - $\varphi$ 是环同态，且 $\varphi$ 是两者的等距变换。
    - $\varphi(s_\lambda)=V_\lambda$，其中 $s_\lambda$ 是 Schur 多项式。

??? proof "证明"
    $(1)$：回忆 $\Lambda = \mathbb{Z}[h_1, h_2, \dots]$，$\{ h_\lambda \mid \lambda \in P \}$ 为 $\Lambda$ 的 $\mathbb{Z}$-基。$\varphi(h_n) = M_{(n)} = \mathbb{C}_n$ 为 $S_n$ 的平凡表示。于是，要证 $\varphi$ 是环同态，只需证 $\varphi(h_\lambda) = \varphi(h_{\lambda_1} \cdots h_{\lambda_l}) = \varphi(h_{\lambda_1}) \cdots \varphi(h_{\lambda_l})$。即 $M_\lambda \cong \mathbb{C}_{\lambda_1} \circ \mathbb{C}_{\lambda_2} \circ \cdots \circ \mathbb{C}_{\lambda_l}$，其中 $\lambda = (\lambda_1 \ge \cdots \ge \lambda_l > 0)$  。

    由定义

    $$
    \begin{aligned}
    \mathbb{C}_{\lambda_1} \circ \mathbb{C}_{\lambda_2}& = \mathrm{Ind}_{\mathbb{C}[S_{\lambda_1} \times S_{\lambda_2}]}^{\mathbb{C}[S_{\lambda_1 + \lambda_2}]} \mathbb{C} \\
    \mathbb{C}_{\lambda_1} \circ \mathbb{C}_{\lambda_2} \circ \mathbb{C}_{\lambda_3} &= \mathrm{Ind}_{\mathbb{C}[S_{\lambda_1 + \lambda_2} \times S_{\lambda_3}]}^{\mathbb{C}[S_{\lambda_1 + \lambda_2 + \lambda_3}]} \left( \mathrm{Ind}_{\mathbb{C}[S_{\lambda_1} \times S_{\lambda_2}]}^{\mathbb{C}[S_{\lambda_1 + \lambda_2}]} \mathbb{C} \right) \\
    &= \mathrm{Ind}_{\mathbb{C}[S_{\lambda_1 + \lambda_2} \times S_{\lambda_3}]}^{\mathbb{C}[S_{\lambda_1 + \lambda_2 + \lambda_3}]} \left( \mathrm{Ind}_{\mathbb{C}[S_{\lambda_1} \times S_{\lambda_2} \times S_{\lambda_3}]}^{\mathbb{C}[S_{\lambda_1 + \lambda_2} \times S_{\lambda_3}]} \mathbb{C} \right) \\
    &= \mathrm{Ind}_{\mathbb{C}[S_{\lambda_1} \times S_{\lambda_2} \times S_{\lambda_3}]}^{\mathbb{C}[S_{\lambda_1 + \lambda_2 + \lambda_3}]} \mathbb{C}\\
    &\cdots\\
    \mathbb{C}_{\lambda_1} \circ \mathbb{C}_{\lambda_2} \circ \cdots \circ \mathbb{C}_{\lambda_l} &\cong M_\lambda
    \end{aligned}
    $$

    故 $\varphi$ 是环同态。由于 $[M_\lambda]=\sum_{\mu\ge \lambda} k_{\mu,\lambda}[V_\mu],k_{\lambda,\lambda}=1$，故 $\left\{[M_\lambda]\Big| \lambda\in P\right\}$ 为 $R$ 的基。故 $\varphi$ 是 $\mathbb{Z}-$代数的同构。

    对另一论断，我们构造逆映射

    $$
    \psi:R\rightarrow \land \otimes \mathbb{Q}
    $$

    回忆我们有

    $$
    h_\lambda=\sum_\mu \frac{1}{z_\mu }\chi_{M_\lambda}(C_\mu)P_\mu
    $$

    于是，定义

    $$
    \psi([V])=\sum_\mu \frac{1}{z_\mu}\chi_V(C_\mu)P_\mu
    $$

    则 $\psi\circ \varphi$ 为 $\land$ 到 $\land\otimes \mathbb{Q}$ 的嵌入。但 $\varphi$ 是同构，故 $\psi$ 是逆同构。要证明 $\varphi$ 是等距变换，只需证 $\psi$ 是等距变换。

    $$
    \begin{aligned}
    \left<\psi([V]),\psi([W])\right>&=\sum_{\lambda,\mu} \frac{1}{z_\lambda\cdot z_\mu}\chi_V(C_\lambda)\chi_W(C_\mu)\left<P_\lambda,P_\mu\right>\\
    &=\sum_\lambda \frac{1}{z_\lambda}\chi_V(C_\lambda)\chi_W(C_\mu)\\
    &=([V],[W])\\
    \end{aligned}
    $$

    $(2)$：回忆我们有

    $$
    h_\lambda=S_\lambda+\sum_{v\triangleright\lambda} K_{v\lambda}s_v
    $$

    $$
    [M_\lambda]=[V_\lambda]+\sum_{v>\lambda}k_{v,\lambda}[V_v]
    $$

    回忆 $v\triangleright \lambda$ 当且仅当 $\left|v\right|=\left|\lambda\right|,v_1+\cdots+v_i\ge \lambda_1+\cdots+\lambda_i,\forall i$。于是，$v\triangleright \lambda\Longrightarrow v> \lambda$。故

    $$
    \varphi(S_\lambda)=[V_\lambda]+\sum_v m_{v\lambda}[V_v]
    $$

    其中 $m_{v,\lambda}$ 为整数，由 $\varphi$ 是等距变换知

    $$
    1+\sum_v m_{v,\lambda}^2=(\varphi(S_\lambda),\varphi(S_\lambda))=(S_\lambda,S_\lambda)=1
    $$

    故 $\varphi(S_\lambda)=[V_\lambda]$。

!!! theorem "推论"
    $K_{\lambda,\mu}=k_{\lambda,\mu}\in \mathbb{Z}_{\ge 0}$

!!! theorem "推论"
    $$
    P_\mu =\sum_\lambda \chi_{V_\lambda} (C_\mu)\cdot s_\lambda
    $$

    或等价的，

    $$
    s_\lambda=\sum_\mu \frac{1}{z_\mu} \chi_{V_\lambda}(C_\mu)P_\mu
    $$

??? proof "证明"
    由 $\psi([V_\lambda])=S_\lambda$ 即得。

!!! theorem "推论"
    回忆 Littlewood-Richardson 常数定义为

    $$
    S_\lambda S_\mu =\sum_v\nu c^\nu_{\lambda\mu }S_\nu
    $$

    我们有 $c^\nu_{\lambda\mu }\in \mathbb{Z}_{\ge 0}$

??? proof "证明"
    由前述命题知

    $$
    \mathrm{Ind}_{S_{\left|\lambda\right|}\times S_{\left|\mu\right|}}^{S_{\left|\lambda\right|+\left|\mu\right|}}(V_\lambda\times V_\mu)=\bigoplus_v c_{\lambda\mu}^v V_v\Longrightarrow c_{\lambda,\mu}^v\in \mathbb{Z}_{\ge 0}
    $$

!!! definition "定义"
    对 $S_n$ 的表示 $V$ 定义其 Frobenius 特征为

    $$
    F_V(x):=\sum_\mu \frac{1}{z_\mu}\chi_V(c_\mu )\cdot P_\mu\in \wedge _\mathbb{Q}
    $$

    则我们已有

    $$
    F_{M_\lambda}(x)=h_\lambda(x)\qquad F_{V_\lambda}(x)=s_\lambda(x)
    $$

!!! theorem "命题"
    对 $\lambda\in P(n),N\ge l(\lambda),\delta=(N-1,N-2,\cdots,1,0)$，则

    $$
    \chi_{V_\lambda}(c_\mu )=[\prod_{i=1}^N x_i^{\lambda_i+N-i}](\prod_{1\le i<j\le N} (x_i-x_j)\cdots P_\mu (x_1,\cdots,x_N))
    $$

!!! definition "定义"
    对 Young 图 $Y_\lambda$ 中的格 $(i,j)$，定义

    $$
    h(i,j):=\# \left\{(i',j')\in Y_\lambda\Big| i'\ge i,j'=j \text{ 或 } i'=i,j'\ge j \right\}
    $$

!!! theorem "推论（hook length fomula）"
    $$
    \dim V_\lambda=\frac{n!}{\prod_{(i,j)\in Y_\lambda}h(i,j)}
    $$

回忆 $\wedge$ 上的对合 $\omega$，$\omega(e_\lambda)=f_\lambda,\omega(P_\lambda)=(-1)^{\left|\lambda\right|-l(\lambda)}P_\lambda$。

!!! definition "定义"
    定义加法对合

    $$
    \begin{aligned}
    \omega:R_n&\rightarrow R_n\\
    [v]&\mapsto [v\otimes \text{sign}]\\
    \end{aligned}
    $$

!!! theorem "命题"
    $\psi :R\rightarrow \wedge$ 与 $\omega$ 可交换。

!!! theorem "推论"
    $$
    V_\lambda \otimes \text{sign} \cong V_{\lambda'}
    $$

## 6. $A_n$ 的表示 { #s6 }

交错群 $A_n=\left\{\text{偶置换}\right\}\triangleleft S_n$，指数为 2。

!!! theorem "引理"
    $$
    \mathrm{Ind}_{A_n}^{S_n} \mathbb{C}\cong \mathbb{C}\oplus \text{sign}
    $$

!!! theorem "定理"
    $\lambda\in P(n)$,$V_\lambda$ 为 $S_n$ 的 Specht 模。则

    - 若 $\lambda\neq \lambda'$ 则 $\mathrm{Res}_{A_n}^{S_n} V_\lambda$ 是不可约的。
    - 若 $\lambda=\lambda'$ 则 $\mathrm{Res}_{A_n}^{S_n} V_\lambda \cong W_\lambda \oplus W_{\lambda}'$，其中 $W_\lambda,W_{\lambda}'$ 是不同构的 $A_n$ 的不可约表示，满足对任意 $S_n$ 中的奇置换 $w\in S_n$，有 $w(W_\lambda)=W'_\lambda$。
    - $A_n$ 的任意不可约复表示均出现在某个 $V_\lambda$ 中，且 $\lambda$ 在取转置的意义下唯一确定。

## 7. Schur-Weyl 对偶 { #s7 }

先来考虑 $\mathfrak{gl}(V)$ 的情形。

!!! theorem "定理（双中心化子定理(double centralizer theorem)）"
    设 $E$ 是 $k$ 上的有限维向量空间。$A,B\subseteq \mathrm{End}(E)$ 为子代数，且 $A$ 是半单的，$B=\mathrm{End}_A(E)$，则

    - $A=\mathrm{End}_B(E)$。

    - $B$ 是半单的。

    - 作为 $A\otimes B$ 的表示

        $$
        E=\bigoplus_i V_i\oplus W_i
        $$

        其中 $\left\{V_i\right\}$ 为所有 $A$ 的不可约表示$:=\mathrm{Irr}(A)$，$\left\{W_i\right\}$ 为所有 $B$ 的不可约表示$:=\mathrm{Irr}(B)$ 	。特别的，存在 $\mathrm{Irr}(A)$ 与 $\mathrm{Irr}(B)$ 间的自然双射。

将该定理应用在 $E=V^{\otimes n}$ 上，其中 $V$ 是 $\mathbb{C}$ 上的有限维向量空间。$S_n$ 在 $E$ 上作用为自然的交换。定义 $A:=\mathrm{Im}(\mathbb{C}[S_n]\rightarrow \mathrm{End}(E))$。回忆 $\mathfrak{gl}(V):=\text{李代数}(\mathrm{End}(V),[-,-])$，其中 $[a,b]=ab-ba$。

!!! theorem "定理"
    代数 $B=\mathrm{End}_A(E)$ 是泛包络代数 $\mathcal{U}(\mathfrak{gl}(V))$ 在其对 $E=V^{\otimes n}$ 的自然作用下的像。即 $B$ 由

    $$
    \Delta_n(n):=b\otimes 1\otimes \cdots \otimes 1+1\otimes b\otimes1 \otimes \cdots \otimes 1+\cdots+1\otimes 1\otimes \cdots \otimes 1\otimes b
    $$

    生成，其中 $b\in \mathfrak{gl}(V)$。

!!! theorem "引理"
    $\mathrm{char}k=0$。

    - 任意 $k$ 上有限维向量空间 $U$，$S^nU$ 由 $u\otimes \cdots \otimes u,u\in U$ 生成。
    - 任意 $k$ 上代数 $A$，$S^nA$ 由 $\Delta_n(a),a\in A$ 生成。

回忆我们有若 $A=\mathrm{Im}(\mathbb{C}[S_n]\rightarrow \mathrm{End}(V^{\otimes n}))$ 且 $\mathbb{C}[S_n]$ 半单，则有 $A$ 是半单的。结合双中心化子定理我们有：

!!! theorem "定理（Schur-Weyl 对偶）"
    - $\mathbb{C}[S_n]$ 的像 $A$ 和 $\mathcal{U}(\mathfrak{gl}(V))$ 的像 $B$ 在 $\mathrm{End}(V^{\otimes n})$ 中互为中心化子。

    - $A$,$B$ 均为半单的。特别的，$V^{\otimes n}$ 是半单的 $\mathfrak{gl}(V)-$模。

    - 作为 $A\otimes B-$模，

        $$
        V^{\otimes n}=\bigoplus_{\lambda\in P(n)} V_\lambda\otimes L_\lambda
        $$

        其中 $V_\lambda$ 是 $S_n$ 的 Specht 模，$L_\lambda$ 是 $\mathfrak{gl}(V)$ 的不相交的不可约表示或 0。

!!! problem "习题"
    - 当 $\lambda=(n)$ 时，$V_{(n)}=S_n$ 的平凡表示。$L_\lambda=\mathrm{Hom}_{S_n}(\mathbb{C},V^{\otimes n})=(V^{\otimes n})^{S_n}=S^nV$
    - 当 $\lambda=(1^n)$ 时，$V_{(1^n)}=S_n$ 的符号表示。$L_\lambda=\mathrm{Hom}_{S_n}(\text{sign},V^{\otimes n})=\wedge^nV$

下面我们来考虑 $L_\lambda$ 的特征。令 $N=\dim V_\lambda$，令 $x_1,\cdots,x_N$ 为 $g\in \mathrm{GL}(V)$ 的特征根，我们希望计算特征 $\chi_{L_\lambda}(g)$。由 Schur-Weyl 知 $V^{\otimes n}=\bigoplus_{\lambda\in P(n)} V_\lambda\otimes L_\lambda$，取 $s\in S_n$，设 $s\in c_\mu=\mu=(1^{m_1}2^{m_2}\cdots )$ 的共轭类。

!!! theorem "引理"
    $$
    \mathrm{Tr}_{V\otimes n}(g^{\otimes n} s)=\prod_m P_m(x_1,\cdots,x_m)^{i_m}
    $$

??? proof "证明"
    设 $\left\{e_1,\cdots,e_N\right\}$ 是 $V$ 的标准基，$ge_i=\sum_j g_{ji}e_j$。设 $(12\cdots m)\in S_n$ 是长为 $m$ 的循环，

    $$
    g^{\otimes m}(12\cdots m)(e_{i_1}\otimes \cdots \otimes e_{i_m})=ge_{i_m}\otimes ge_{i_1} \otimes \cdots \otimes ge_{i_{m-1}}
    $$

    故

    $$
    \begin{aligned}
    \mathrm{Tr}_{V\otimes m}(g^{\otimes m}(j_1\cdots j_m))&=\sum_{1\le i_1,\cdots,i_m\le N} g_{i_mi_1}g_{i_1i_2}\cdots g_{i_{m-1}i_m}\\
    &=\mathrm{Tr}(g^m)=(x_1^m+\cdots+x_N^m)=P_m(x_1,\cdots,x_N)\\
    \end{aligned}
    $$

!!! theorem "定理（Weyl 特征公式）"
    $L_\lambda=0$ 当且仅当 $N<l(\lambda)$。若 $N\ge l(\lambda)$，则

    $$
    \chi_{L_\lambda}(g)=s_\lambda(x_1,\cdots,x_N)
    $$

!!! theorem "推论"
    $$
    \dim h_\lambda=\prod_{1\le i<j\le N} \frac{\lambda_i-\lambda_j+j-i}{j-i}
    $$

!!! theorem "推论"
    $$
    L_{\lambda+(1^N)}\cong L_\lambda \otimes \wedge^N V
    $$

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/representation-theory.pdf){ .md-button download="representation-theory.pdf" }
