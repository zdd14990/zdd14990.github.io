---
title: 第一章：域
date: 2025-11-19
updated: 2026-10-15
description: 代数2-H 笔记第一章：域扩张、代数扩张。
hide:
  - navigation
categories:
  - 代数
tags:
  - galois-theory
  - field-theory
---

# 第一章：域 { #top }

## 1. 域扩张 { #s1 }

!!! definition "定义"
    $(F,+,\cdot)$ 称为**域(field)**，若满足：

    - $a+b=b+a, a \cdot b=b \cdot a;$
    - $(a+b)+c=a+(b+c),(a \cdot b) \cdot c=a \cdot(b \cdot c) ;$
    - $(a+b) \cdot c=a \cdot c+b \cdot c ;$
    - $\exists 0 \in F, \forall a \in F, 0+a=a ;$
    - $\exists 0 \neq 1 \in F, \forall a \in F, 1 \cdot a=a ;$
    - $\forall a \in F, \exists-a \in F, a+(-a)=0;$
    - $\forall a \neq 0, \exists a^{-1} \in F, a \cdot a^{-1}=1 .$

!!! definition "定义"
    $E$ 是一个域，$F$ 称为 $E$ 的**子域(subfield)**，若 $F\subset E$，且对 $E$ 中的运算构成域。称 $E$ 是 $F$ 的一个**扩张(extension)**。

设 $F$ 是域，考虑自然同态 $f:\mathbb{Z}\rightarrow F$，则 $\mathrm{ker}f$ 为 $(0)$ 或一个素理想 $(p)$。

若 $\mathrm{ker}f=(0)$，称 $F$ 的**特征**是 0 且有嵌入映射 $\mathbb{Q}\rightarrow F$，称 $\mathbb{Q}$ 是 $F$ 的素子域。

若 $\mathrm{ker}f=(p)$，称 $F$ 的**特征**是 $p$ 且有嵌入映射 $\mathbb{Z}/p\mathbb{Z} \rightarrow F$，称 $\mathbb{Z}/p\mathbb{Z}$ 是 $F$ 的素子域。

!!! definition "定义"
    设有域扩张 $E/F$，$S\subset E$，记 $F(S)$ 为由 $F$ 与 $S$ 生成的子域，那么 $F(S)/F$ 是一个域扩张。

    若 $S$ 只含一个元素 $u$，我们称 $F(u)$ 是 $F$ 的一个**单扩张(simple extension)**，称 $u$ 为 $F(u)$ 的**本原元(primitive element)**。

$u\in E$，考虑 $F(u)=\left\{ \dfrac{f(u)}{g(u)}\Big| f,g\in F[x],g(u)\neq 0\right\}$。

我们有同态 $f:F[x]\rightarrow E,f(x)\mapsto f(u),f|_F=id_F$。由于 $F(u)$ 是一个域，故 $\mathrm{ker}f=(0)$ 或 $(g(x))$，其中 $g(x)$ 是不可约多项式。

若 $\mathrm{ker}f=(0)$，则 $F[x]\cong F[u]$；若 $\mathrm{ker}f=(g(x))$，则 $F(u)\cong F[u]\cong F(x)/(g(x))$。

!!! definition "定义"
    $u \in E$，若不存在 $h(x)\in F[x],h(u)=0$，则称 $u$ 是 $F$ 上的**超越元(transendental element)**，否则称为**代数元(algebraic element)**。若首一的不可约多项式 $g(x)$ 使 $g(u)=0$，则称之为 $u$ 的极小多项式。

!!! theorem "命题（Kronecker's theorem）"
    $F$ 是一个域，$h(x)\in F[x]$，则存在域扩张 $E/F$ 使得 $h(x)$ 在 $E$ 上有根。

??? proof "证明"
    不妨设$h(x)$ 是不可约多项式，则 $F[x]/(h(x))$ 是满足条件的域扩张。

!!! definition "定义"
    设 $E/F$ 是域扩张，若对 $\forall u\in E$ 均为代数元，则称 $E/F$ 是**代数扩张(algebraic extension)**。否则称为**超越扩张(transendental extension)**。

!!! definition "定义"
    设 $E/F$ 是域扩张，我们可以将 $E$ 视作 $F$ 上的线性空间，我们将这个线性空间的维数称作 $E/F$ 的**度数(degree)**，记作 $[E:F]$。

若 $[E:F]=2,E=F(\alpha)$，则存在 $a,b,c\in F,a\alpha^2+b\alpha+c=0$。由于 $\alpha \notin F$，故 $a\neq 0$。不妨 $a=1.x^2+bx+c$ 是 $\alpha$ 的极小多项式。假设 $\mathrm{char}F\neq 2$，则 $(\alpha+b/2)^2=b^2/4-c\in F$。设 $\alpha^\prime=\alpha+b/2$，则

$$
E=F(\alpha)=F(\alpha^\prime),{\alpha^\prime}^2\in F
$$

!!! theorem "命题"
    $E/F$ 是域扩张，代数元 $u\in E$ 极小多项式为 $g(x)$，则 $[F(u):F]=\mathrm{deg} g$。进一步若 $[F(u):F]<\infty$，则 $u$ 是 $F$ 上代数元。

??? proof "证明"
    设 $n=\mathrm{deg} g$，则 $F(u)\cong F[x]/(g(x))=F(1,x,\cdots,x^{n-1})$，故 $[F(u):F]=n=\mathrm{deg} g$。

    进一步设 $[F(u):F]=n$，则存在 $a_0,\cdots,a_n\in F$，$a_0+a_1u+\cdots+a_nu^n=0$，故 $u$ 是 $F$ 上代数元。

!!! theorem "推论"
    有限扩张都是代数扩张。

设域扩张 $E/F$，域 $K$ 满足 $E/K$ 和 $K/F$ 都是域扩张，则称 $K$ 为 $E/F$ 的**中间域(intermediate field)**。

!!! theorem "定理"
    设域扩张 $E/K/F$，则 $E/F$ 是有限扩张当且仅当 $E/K$ 和 $K/F$ 均为有限扩张。事实上，$[E:F]=[E:K][K:F]$。

??? proof "证明"
    “$\Longrightarrow$” 是显然的。

    “$\Longleftarrow$”：设 $E/K$ 和 $K/F$ 都是有限扩张。取 $K/F$ 的一组基 $u_1,\cdots,u_n$ 与 $E/K$ 的一组基 $v_1,\cdots,v_n$，则 $\forall a\in E$，

    $$
    \begin{aligned}
    a &=\displaystyle\sum_{i=1}^m a_iv_i,a_i\in K\\
    &=\displaystyle\sum_{i=1}^m v_i\cdot \displaystyle\sum_{j=1}^n b_{i,j}u_j,b_{i,j}\in F\\
    &=\displaystyle\sum_{i,j} b_{i,j}v_iu_j,b_{i,j}\in F
    \end{aligned}
    $$

    即 $E$ 是由 $\left\{v_iu_j\right\}$ 生成的，且线性不相关。因此

    $$
    [E:F]=mn=[E:K][K:F]
    $$

!!! theorem "推论"
    设域扩张 $E/K/F$，$[E:F]<\infty$，则 $[E:F]$ 被 $[E:K]$ 与 $[K:F]$ 整除。特别的，若 $[E:F]$ 是素数，则 $K=E$ 或 $K=F$。

!!! theorem "定理（Steinitz's theorem）"
    $E/F$ 是一个有限域扩张，则 $E/F$ 是单扩张当且仅当它只有有限个中间域。

??? proof "证明"
    “$\Longrightarrow$”：设 $E=F(u)$，$K$ 是中间域，则 $E=K(u)$。设 $u$ 在 $K$ 上的极小多项式是 $g(x)=x^n+a_{n-1}x^{n-1}+\cdots+a_0,a_i\in K$。

    令 $K^\prime=F(a_0,a_1,\cdots,a_{n-1})\subset K$，$g^\prime(x)$ 是 $u$ 在 $K^\prime$ 上的极小多项式。

    则 $g^\prime(x)\mid g(x)$ 且

    $$
    [E:K']=\mathrm{deg} g'(x)\le \mathrm{deg} g(x)=[E:K]\le [E:K']
    $$

    于是我们有 $g'(x)=g(x),K=K'$。

    设 $h(x)$ 是 $u$ 在 $F$ 上的极小多项式，则 $g(x)\mid h(x)$。注意到 $K$ 由 $g$ 唯一确定且 $g$ 仅有有限个选择，因此 $K$ 也只有有限个。

    “$\Longleftarrow$”：我们先证明如下引理：

    !!! theorem "引理"
        $[E:F]<\infty$ 当且仅当 $E=F(u_1,\cdots,u_n)$，其中 $u_i$ 是 $F$ 上的代数元。

    ??? proof "引理的证明"
        “$\Longleftarrow$”：

        $$
        [E:F]=[F(u_1):F][F(u_1,u_2):F(u_1)]\cdots[E:F(u_1,\cdots,u_{n-1})]<\infty
        $$

        “$\Longrightarrow$”：取 $u\notin F$，$[F(u):F]\le [E:F]<\infty$，故 $u$ 是 $F$ 上代数元。考虑 $E/F(u)$，有 $[E/F(u):F]<[E:F]$，归纳得 $E/F(u)=F(v_1,\cdots,v_m)$ 对某个 $m$，故 $E=F(u,v_1,\cdot,v_m)$。

## 2. 代数扩张 { #s2 }

!!! theorem "定理"
    设域扩张 $K/E/F$，则 $K/F$ 是代数扩张当且仅当 $K/E$ 和 $K/F$ 是代数扩张。

??? proof "证明"
    “$\Longrightarrow$” 是显然的。

    “$\Longleftarrow$”：对 $u\in K$，设 $g(x)=x^n+a_1x^{n-1}+\cdots+a_0\in E[x]$ 是 $a$ 的极小多项式，则 $u$ 是 $F(a_0,\cdots,a_{n-1})$ 上的代数元，故

    $$
    \begin{aligned}
    [F(u):F] &\le [F(u,a_0,\cdots,a_{n-1}):F]\\
    &=[F(u,a_0,\cdots,a_{n-1}):F(a_0,\cdots,a_{n-1})][F(a_0,\cdots,a_{n-1}):F]<\infty
    \end{aligned}
    $$

    故 $u$ 是 $F$ 上的代数元。

!!! theorem "定理"
    设域扩张 $E/F$，$K\subset E$ 是 $E$ 中所有代数元构成的集合，则 $K$ 是域。

??? proof "证明"
    对代数元 $\alpha,\beta\in K$，$F(\alpha,\beta)/F(\alpha)/F$ 是代数的，故 $F(\alpha,\beta)/F$ 是代数的。

    即 $\alpha\pm \beta,\alpha\cdot \beta,\alpha^{-1},\beta^{-1}$ 在 $F$ 中都是代数元，进而 $K$ 是域。

取 $E=\mathbb{R}$，$F=\mathbb{Q}$。注意到 $x^n-2$ 在 $\mathbb{Q}$ 上不可约，取 $z=2^{1/n}$，则

$$
[K:\mathbb{Q}]\ge [\mathbb{Q}(z):\mathbb{Q}]=n
$$

由 $n$ 的任意性，$[K:\mathbb{Q}]=\infty$。

!!! theorem "推论"
    若 $u$ 是 $K$ 上的代数元，则 $u\in K$。

??? proof "证明"
    $K(u)/K/F$ 是代数扩张，所以 $K(u)/F$ 是代数扩张，这表示 $u$ 是 $F$ 上的代数元。

!!! definition "定义"
    设域扩张 $E/K$，若不存在域扩张 $E/K'/K$ 使得 $K'/K$ 是代数扩张且 $K'\neq K$，则称 $K$ 在 $E$ 中是**代数封闭的(algebraically closed)**。

    若 $E/K/F$ 满足 $K$ 在 $E$ 中是代数封闭的且 $K/F$ 是代数扩张，则称 $K$ 是 $F$ 在 $E$ 中的**代数闭包(algebraic closure)**。

事实上，$K=\left\{x\in E\Big| x\text{是} F \text{上代数元}\right\}$。

!!! definition "定义"
    $K$ 是域，若 $K$ 没有非平凡代数扩张，则称 $K$ 是**代数封闭的**。

!!! example "例"
    $\mathbb{R}$ 在 $\mathbb{C}$ 中的代数闭包是 $\mathbb{C}$。

    设 $K$ 是 $\mathbb{Q}$ 在 $\mathbb{R}$ 上的代数闭包，则 $K$ 在 $\mathbb{R}$ 中是代数封闭的，在 $\mathbb{C}$ 中不是。

    $F$ 在 $F(t)/F$ 中是代数封闭的。

!!! definition "定义"
    $F$ 是域，若 $K/F$ 是代数扩张且 $K$ 是代数封闭的，则称 $K$ 是 $F$ 的代数闭包。

!!! theorem "定理"
    $K$ 是域，则以下命题等价：

    - $K$ 是代数封闭的；
    - $K[x]$ 中任一不可约多项式的次数等于 1 ；
    - $K[x]$ 中任一次数大于零的多项式可分解为一次因子的乘积；
    - $K[x]$ 中任一次数大于零的多项式都在 $K$ 中至少有一个根。

!!! theorem "定理"
    $K$ 是代数封闭的，$F\subset K$ 是子域，则 $F$ 在 $K$ 中的代数闭包 $\bar{F}$ 是代数封闭的，即 $\bar{F}$ 是 $F$ 的代数闭包。

??? proof "证明"
    设 $K'/\bar{F}$ 是代数扩张，$u\in K'$ 的极小多项式是 $g(x)\in \bar{F}[x]$。因为 $g(x)\in K[x]$，故 $g(x)=(x-x_1)\cdots(x-x_n),x_i\in K$。$x_i$ 是 $\bar{F}$ 上的代数元，故 $x_i\in \bar{F}$。而 $u$ 又是其中一个 $x_i$，故 $u\in \bar{F}$，即 $K'=\bar{F}$。

!!! theorem "定理"
    任一域 $F$ 在同构意义下有唯一的代数闭包。

!!! definition "定义"
    域扩张 $E/F$，设 $\mathrm{End}(E/F)$ 为所有同态 $\varphi:E\rightarrow E$ 且 $\varphi|_F=id_F$ 组成的集合，$\mathrm{Aut}(E/F)$ 为所有同构 $\varphi:E\rightarrow E$ 且 $\varphi|_F=id_F$ 组成的集合。

!!! theorem "命题"
    若 $E/F$ 是代数扩张，则 $\mathrm{End}(E/F)=\mathrm{Aut}(E/F)$。

??? proof "证明"
    设 $\varphi\in \mathrm{End}(E/F)$。设 $u\in E$ 的极小多项式 $g(x)$，则 $\varphi(g(x))=g(x)$。设 $S$ 是 $g(x)$ 根的集合，则 $\varphi(S)\subset S$。由于两个域之间的任一非零同态都是单的，故 $\varphi(S)=S$，即 $\varphi$ 是满射，故是同构。

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/algebra-2h-notes.pdf){ .md-button download="algebra-2h-notes.pdf" }
