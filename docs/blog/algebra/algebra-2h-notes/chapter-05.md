---
title: 第五章：有限域、分圆域与 Kummer 理论
date: 2025-11-19
updated: 2026-10-15
description: 代数2-H 笔记第五章：有限域、分圆域、Kummer 理论。
hide:
  - navigation
categories:
  - 代数
tags:
  - galois-theory
  - field-theory
---

# 第五章：有限域、分圆域与 Kummer 理论 { #top }

## 1. 有限域 { #s1 }

!!! theorem "定理"
    $\forall n>0$，存在同构意义下唯一的域 $F$ 满足 $\left|F\right|=p^n$

??? proof "证明"
    若 $\left|F\right|=p^n$，则 $\forall a\in F$，$a^{p^n}=a$，故 $x^{p^n}-x$ 在 $F$ 上可分，即 $F$ 是 $x^{p^n}-x/\mathbb{Z}_p$ 的分裂域，自然在同构意义下唯一。

    下面我们来证明 $\left|F\right|={p^n}$。由于 $\dfrac{\partial(x^{p^n}-x)}{\partial x}=-1$，故 $x^{p^n}-x$ 在 $F$ 上无重根。记 $K$ 是 $f$ 在 $F$ 中的所有根，则 $\left|K\right|=p^n$。考虑 Frobenius 自同构 $\varphi$，则 $K=F^{\varphi^n}$ 是 $F$ 的子域，即 $K$ 是指数为 $p^n$ 的域。

!!! problem "习题"
    可以通过计算得到 $\mathbb{Z}_p[x]$ 上的 $n$ 次多项式中有不可约多项式

!!! theorem "推论"
    $E/F$ 是有限域的扩张，则 $E/F$ 是 Galois 扩张。

??? proof "证明"
    $E/F$ 是分裂域，由于 $F$ 有限，故 $F^p=F$，即 $F$ 是完全域，进而 $E/F$ 是 Galois 扩张。

!!! theorem "定理"
    $E/F$ 是有限域，$\left|F\right|=q,[E:F]=m$，则 $\mathrm{Gal}(E/F)\cong \mathbb{Z}_m$，即 $\mathrm{Gal}(E/F)$ 由 Frobenius 映射 $\eta$ 生成。

??? proof "证明"
    $E^*\cong \mathbb{Z}_{q^m-1}$，设 $a$ 是 $E^*$ 的生成元，$a^{q^m-1}=1$。设 $n=\left| \eta\right|$，则 $\eta^n(a)=a$，即 $a^{q^n-1}=1$，故 $q^n-1\ge q^m-1$，即 $n\ge m$。但 $n\le m$，只能 $n=m$。即 $\mathrm{Gal}(E/F)=<\eta>$。

!!! theorem "推论"
    $\left|E\right|=p^n$，$E/F$，$\left|F\right|=p^m$，则 $m\mid n$。

!!! theorem "推论"
    $\left|E\right|=p^n$，$m\mid n$，则存在指数 $p^m$ 的子域 $F\hookrightarrow E$，进而存在 $F[x]$ 中的 $\dfrac{n}{m}$ 次不可约多项式

## 2. 分圆域 { #s2 }

!!! definition "定义"
    $n\in \mathbb{Z}_{>0}$，$x^n-1$ 在 $F$ 上的分裂域称为 $n$ 次**分圆域(cyclotomic field)**。

记 $\mu_n$ 是 $x^n-1$ 所有根的集合。若 $\mathrm{char}F \nmid n$，则 $\left|\mu_n\right|=n$ 且 $\mu_n$ 是 $F$ 的一个子群，进而 $\mu_n\cong \mathbb{Z}_n$。

!!! definition "定义"
    $\mu_n$ 的生成元称为**本原单位根(primitive roots of unity)**。

设 $\xi$ 是本原单位根，$E=F(\xi)$。取 $\eta\in \mathrm{Gal}(E/F)$，$\eta$ 由 $\eta(\xi)$ 决定。于是我们有单同态：$\phi:\mathrm{Gal}(E/F)\rightarrow \mathrm{Aut}(\mu _n)\cong \mathrm{Aut}(\mathbb{Z}_n)$，由于 $\mathrm{Aut}(\mathbb{Z}_n)$ 是 Abel 群，故 $\mathrm{Gal}(E/F)$ 也是 Abel 群。于是我们有如下命题：

!!! theorem "命题"
    $E/F$ 是 $n$ 次分圆域，则 $\mathrm{Gal}(E/F)$ 是 Abel 群。

!!! definition "定义"
    $E/F$ 是 Galois 扩张，若 $\mathrm{Gal}(E/F)$ 是 Abel/循环群，则称 $E/F$ 为 Abel/循环扩张。

设 $F=\mathbb{Q}$，$E$ 是 $F$ 上的 $n$ 次分圆域，我们想要计算 $[E:F]$。

首先 $E=F(\xi_n)$，其中 $\xi_n=e^{2\pi i/n}$，令

$$
\varphi_n(x)=\displaystyle\prod_{\substack{(k,n)=1\\ 1\le k\le n-1}}(x-\xi_n^k)
$$

我们来证明 $\varphi_n(x)$ 是不可约整系数多项式。

注意到

$$
x^n-1=\displaystyle\prod_{d\mid n}\displaystyle\prod_{\substack{(k,\frac{n}{d})\\1\le k\le \frac{n}{d}-1}} (x-\xi_n^{dk})=\displaystyle\prod_{d\mid n}\varphi_{\frac{n}{d}}(x)=\displaystyle\prod_{d\mid n}\varphi_d(x)
$$

对任意 $\eta\in \mathrm{Gal}(E/F)$，$\eta(\varphi_n(x))=\varphi(x)$，故 $\varphi_n(x)\in \mathbb{Q}[x]$。

由于

$$
x^n-1=\varphi_n(x)\displaystyle\prod_{d\mid n,d<n}\varphi_d(x)
$$

故我们可以通过归纳证明 $\varphi_n(x)\in \mathbb{Z}[x]$。

!!! theorem "定理"
    $\varphi_n(x)$ 在 $\mathbb{Q}[x]$ 中不可约。

??? proof "证明"
    由于 $\varphi_n(x)$ 是首一的，因此等价于证明在 $\mathbb{Z}[x]$ 中不可约。

    设 $\varphi_n(x)=f(x)g(x)$，其中 $f,g\in \mathbb{Z}[x]$，且 $f(\xi_n)=0$，$f$ 不可约。

    我们来证明对于任意素数 $p\neq n$，$f(\xi_n^p)=0$。若不然，$g(\xi_n^p)=0$，令 $h(x)=g(x^p)$，则 $h(x)\in \mathbb{Z}[x]$ 有一根 $\xi_n$，因此 $f(x)\mid h(x)$。

    考虑自然映射 $\mathbb{Z}[x]\rightarrow \mathbb{Z}_p[x]$，则 $\bar{h}(x)=\bar{g}(x)=(\bar{g}(x))^p$，且 $\bar{f}(x)\mid (\bar{g}(x))^p$。于是 $\bar{\varphi}_n(x)$ 在 $\bar{f}(x)$ 的分裂域中有重根。但是 $\bar{\varphi}_n(x)'=nx^{n-1}$ 与 $\bar{\varphi}_n(x)$ 互素，矛盾！

    将证明中的 $\xi_n$ 换成 $\xi_n^p$ 同样成立，于是我们可以得到对任意 $(k,n)=1$，$f(\xi_n^k)=0$，这表明 $\mathrm{deg}f\ge \varphi(n)=\mathrm{deg}\varphi_n$，故 $f=\varphi_n$ 即 $\varphi_n$ 是不可约的。

由该定理我们可以得到 $[E:F]=[\mathbb{Q}(\xi_n):\mathbb{Q}]=\varphi(n)$。

!!! example "例"
    考虑 $G=\mathrm{Gal}(\mathbb{Q}(\sqrt[5]2,\xi_5)/\mathbb{Q})$，首先

    $$
    [E:\mathbb{Q}]=[\mathbb{Q}(\sqrt[5]2,\xi_5):\mathbb{Q}(\xi_5)][\mathbb{Q}(\xi_5):\mathbb{Q}]=5[\mathbb{Q}(\sqrt[5]2,\xi_5):\mathbb{Q}(\xi_5)]
    $$

    同样也有

    $$
    [E:\mathbb{Q}]=4[\mathbb{Q}(\sqrt[5]2,\xi_5):\mathbb{Q}(\sqrt[5]2)]
    $$

    因此 $\left|G\right|\ge 20$。注意到 $[\mathbb{Q}(\sqrt[5]2,\xi_5):\mathbb{Q}(\xi_5)]\le 4$，故 $\left|G\right|=20$。

    由于 $\left|\mathrm{Gal}(E/\mathbb{Q}(\xi_5))\right|=5$，故 $\mathrm{Gal}(E/\mathbb{Q}(\xi_5)\cong \mathbb{Z}_5\le G$.

    由于 $\left|\mathrm{Gal}(E/\mathbb{Q}(\sqrt[5]2))\right|=4$，故 $\mathrm{Gal}(E/\mathbb{Q}(\sqrt[5]2)\cong \mathbb{Z}_4\le G$。

    利用 Sylow 定理 $\mathbb{Z}_5\lhd G$ 且我们有 $\mathbb{Z}_4\cap\mathbb{Z}_5={e}$，因此 $G\cong \mathbb{Z}_5\rtimes \mathbb{Z}_4$。

## 3. Kummer 理论 { #s3 }

在本节中，我们设 $F$ 是一个包含 $x^n-1$ 的 $n$ 个不同根的域。

!!! theorem "命题"
    $E=F(\alpha)$，其中 $\alpha^n\in F^*$，则 $E/F$ 是 $m$ 次分圆域，其中 $m$ 是 $\alpha^n$ 在 $F^*/(F^*)^n$ 中的阶。

??? proof "证明"
    设 $(\alpha^n)^m=\bar{1}\in F^*/(F^*)^n$，则 $\alpha^{mn}=a^n$，其中 $a\in F$，故 $\alpha^m=a\xi_n^i\in F$。

    若 $0<m'<m,\alpha^{m'}\in F^*$，则 $(\alpha^{m'})^n\in (F^*)^n$，即 $\alpha^{m'}=\bar{1}\in F^*/(F^*)^n$，这与 $\alpha^n$ 的阶是 $m$ 矛盾。于是 $m$ 是最小的正整数使得 $\alpha^m\in F^*$。

    设 $\alpha$ 在 $F$ 中的极小多项式为 $g(x)$，则 $g(x)\mid x^m-\alpha^m$，因此 $g(x)=\prod_{i\in I}(x-\xi_n^i\alpha)$，其中 $I\subset \left\{0,1,\cdots,m-1\right\}$。进而 $\prod_{i\in I}(\xi_n^i\alpha)\in F^*$，即 $\alpha^{\mathrm{deg}g}=\alpha^{\left|I\right|}\in F^*$。这推出 $\mathrm{deg}g=m$，即 $\left|\mathrm{Gal}(E/F)\right|=[E:F]=m$。

    设 $\varphi:\mathrm{Gal}(E/F)\rightarrow \mu_m,\eta\mapsto \eta(\alpha)/\alpha$，已验证良定义且 $\varphi$ 是单同态。由于 $\left|\mathrm{Gal}(E/F)\right|=\left|\mu_m\right|$，我们有 $\mathrm{Gal}(E/F)\cong \mu_m$ 是一个指数为 $m$ 的循环群。

!!! definition "定义"
    若 $E=F(\alpha),\alpha^n\in F$，则称 $E/F$ 是**单根式扩张(simple radical extension)**。

!!! theorem "定理（Kummer's theorem）"
    $E/F$ 是有限 Galois 扩张且 $\mathrm{Gal}(E/F)$ 是 $n$ 阶循环群，则 $E=F(\alpha),\alpha^n\in F$。

??? proof "证明"
    设 $\eta$ 是 $\mathrm{Gal}(E/F)$ 的生成元，设

    $$
    \alpha=\displaystyle\sum_{i=1}^{n-1}\xi_n^i \eta^i(\beta),\beta\in E
    $$

    我们先来证明可以取 $\beta\in E$ 使得 $\alpha\neq0$，为此需要如下引理：

    !!! theorem "引理（Dedekind）"
        域 $F$，$\sigma_1,\cdots,\sigma_n\in \mathrm{Aut}(F)$，若 $c_i\in F$ 使得 $\displaystyle\sum_{i=1}^n c_i\sigma_i=0$，则 $c_i=0,\forall i$。

    ??? proof "引理的证明"
        取最小的 $n$ 使得结论不成立。则对任意 $a,x\in F$，

        $$
        a\displaystyle\sum_{i=1}^n c_i\sigma_i(x)=\displaystyle\sum_{i=1}^n c_i\sigma_i(ax)=0
        $$

        进而

        $$
        \displaystyle\sum_{i=2}^n c_i(\sigma_i(a)-\sigma_1(a))\sigma_i(x)=0
        $$

        由于 $n$ 是最小的，因此对任一 $c_i\neq 0$ 都有对应的 $\sigma_i=\sigma_1$，矛盾！

    由引理我们取 $\beta\in E$ 使得 $\alpha\neq0$，则 $\eta(\alpha)=\xi_n^{-1}\alpha\neq\alpha$。由于 $\alpha\notin F$ 且 $\eta(\alpha^n)=\alpha^n$，由 Galois 对应 $\alpha^n\in F$。考虑 $E/F(\alpha)$，由于 $\eta^i(\alpha)=\xi_n^{-i}\alpha$，我们有 $\mathrm{Gal}(E/F(\alpha))=id$。由 Galois 对应，$E=F(\alpha)$。

!!! theorem "推论"
    有如下一一对应：

    $$
    \left\{n \text{ 次分圆扩张} (\bar{F}/)E/F\right\}\leftrightarrow \left\{F^*/(F^*)^n \text{阶为 }n\text{ 的子群} \right\}
    $$

??? proof "证明"
    设 $C=\left< \alpha\right>$，其中 $\alpha\in F^*/(F^*)^n$ 阶为 $n$，由**命题 1.13**可知 $E(\sqrt[n]\alpha)/F$ 是 $n$ 次分圆域。由Kummer's theorem 知这是一个满射。

    若 $F(\alpha)=F(\beta)$，我们来证明 $\left< \bar{\alpha}^n\right>=\left<\bar{\beta}^n\right>$。设 $a=\alpha^n,b=\beta^n$，则 $a,b$ 在 $F^*/(F^*)^n$ 中阶均为 $n$。考虑 $\mathrm{Gal}(F(\alpha)/F)$，设 $\eta$ 是生成元，则 $\eta(\alpha)/\alpha,\eta(\beta)/\beta$ 都是本原单位根。令 $\eta(\alpha)=\xi_n^i\alpha$，则 $\eta^j(\alpha)=\xi_n^{ij}\alpha$，这表示 $\xi_n^i$ 也是本原的。故 $\frac{\eta(\alpha)}{\alpha}=(\frac{\eta(\beta)}{\beta})^k$，其中 $(k,n)=1$，进而 $\bar(a)=\bar(b)^k$，这表示 $\left< \bar{\alpha}^n\right>=\left<\bar{\beta}^n\right>$。

!!! definition "定义"
    一个有限 Abel 扩张 $E/F$ 称作 **Kummer 扩张**，若 $\mathrm{Gal}(E/F)$ 的指数整除 $n$，其中指数是其所有元素阶的最小公倍数。

!!! theorem "定理"
    $E/F$ 是 Kummer 扩张当且仅当 $E=F(\sqrt[n]{a_1},\cdots,\sqrt[n]{a_r})$。

??? proof "证明"
    “$\Longleftarrow$”：若 $E=F(\sqrt[n]{a_1},\cdots,\sqrt[n]{a_r})$ 则我们有自然单射：

    $$
    \mathrm{Gal}(E/F)\hookrightarrow \mathrm{Gal}(F(\sqrt[n]{a_1})/F)\times\cdots\times\mathrm{Gal}(F(\sqrt[n]{a_r})/F)
    $$

    且对每个 $k$，$\mathrm{Gal}(F(\sqrt[n]{a_k})/F)$ 均为指数整除 $n$ 的循环群，这表示 $E/F$ 是 Kummer 扩张。

    “$\Longrightarrow$”：设 $E/F$ 是 Kummer 扩张，且 $\mathrm{Gal}(E/F)\cong C_1\times\cdots\times C_r$。

    令 $H_i=\prod_{j\neq i} C_j$，则 $H_i\lhd \mathrm{Gal}(E/F)$，由 Galois 对应 $E^{H_i}/F$ 是 Galois 扩张且

    $$
    \mathrm{Gal}(E^{H_i}/F)\cong \mathrm{Gal}(E/F)/H_i\cong C_i
    $$

    由上定理 $E^{H_i}=F(\sqrt[n]{a_i})$，其中 $a_i\in F^*$。

    最后我们需要证明 $E=E^{H_1}\cdots E^{H_r}$，我们考虑 $r=2$ 的情形，$E^{H_1}\cap E^{H_2}=F$，故

    $$
    [E^{H_1}E^{H_2}:F]=[E^{H_1}:F][E^{H_2}:F]=\left|H_1\right|\left|H_2\right|=\left|\mathrm{Gal}(E/F)\right|=[E:F]
    $$

    这表示 $E=E^{H_1}E^{H_2}$。一般情形可由归纳证明。

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/algebra-2h-notes.pdf){ .md-button download="algebra-2h-notes.pdf" }
