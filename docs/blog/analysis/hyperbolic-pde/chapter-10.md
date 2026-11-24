---
title: "Chapter 10: Multilinear Kakeya, Multilinear Restriction, and Characteristic Null Structure"
date: 2026-10-30
description: Loomis–Whitney projections, Guth's multiscale multilinear Kakeya proof, Bennett–Carbery–Tao multilinear restriction, and characteristic null structure in three-dimensional transport.
hide:
  - navigation
categories:
  - 分析
  - Hyperbolic PDEs
tags:
  - hyperbolic-pde
  - harmonic-analysis
  - wave-packets
  - course
---

# Chapter 10: Multilinear Kakeya, Multilinear Restriction, and Characteristic Null Structure { #chapter-10 }

Transversality improves overlap bounds in both physical space and frequency space. This chapter develops three manifestations of that principle: Guth's multiscale induction from the Loomis–Whitney inequality to the non-endpoint multilinear Kakeya bound in $\mathbb R^n$, the Bennett–Carbery–Tao wave-packet iteration deriving multilinear Fourier restriction from multilinear Kakeya, and a three-dimensional constant-coefficient transport model comparing a mixed quadratic source against a collinear self-interaction.

Throughout this chapter, the Fourier transform on $\mathbb R^n$ uses the $2\pi$ normalization of [Chapter 9](chapter-09.md#vorticity):

$$
\widehat f(\xi)=\int_{\mathbb R^n}e^{-2\pi ix\cdot\xi}f(x)\,dx,
\qquad
f(x)=\int_{\mathbb R^n}e^{2\pi ix\cdot\xi}\widehat f(\xi)\,d\xi,
$$

so that $\|\widehat f\|_{L^2}=\|f\|_{L^2}$ and $\widehat{fg}=\widehat f*\widehat g$. For a set $A\subset\mathbb R^n$ and $W>0$, write $\mathcal N_W(A)=\{x\in\mathbb R^n:\operatorname{dist}(x,A)<W\}$ for its Euclidean $W$-neighborhood.

## 1. Projections, Loomis–Whitney, and polynomial zero sets { #loomis-whitney }

Let $e_1,\dots,e_n$ be the standard basis of $\mathbb R^n$, $n\ge2$, and let $\pi_k:\mathbb R^n\to\mathbb R^{n-1}$ be the coordinate projection omitting the $k$th entry:

$$
\pi_k(x_1,\dots,x_n)=(x_1,\dots,\widehat{x_k},\dots,x_n).
$$

[Chapter 9](chapter-09.md#multilinear-kakeya) verified the three-dimensional coordinate-axis inequality by two Cauchy–Schwarz steps. The general $n$-dimensional form follows by induction on dimension.

!!! lemma "Lemma 10.1. Loomis–Whitney inequality"

    For $n\ge2$ and nonnegative measurable functions $f_1,\dots,f_n\in L^1(\mathbb R^{n-1})$,

    $$
    \int_{\mathbb R^n}\prod_{k=1}^n\big(f_k(\pi_k(x))\big)^{\frac1{n-1}}\,dx
    \le\prod_{k=1}^n\|f_k\|_{L^1(\mathbb R^{n-1})}^{\frac1{n-1}}.
    \tag{1.1}
    $$

??? proof "Proof"

    For $n=2$, $\pi_1(x_1,x_2)=x_2$ and $\pi_2(x_1,x_2)=x_1$, so Fubini–Tonelli gives equality:

    $$
    \int_{\mathbb R^2}f_1(x_2)f_2(x_1)\,dx_1\,dx_2=\|f_1\|_{L^1(\mathbb R)}\|f_2\|_{L^1(\mathbb R)}.
    $$

    Assume $n\ge3$ and suppose the statement holds in dimension $n-1$. Write $x=(x',x_n)$ with $x'\in\mathbb R^{n-1}$. For $1\le k\le n-1$, let $\widetilde\pi_k:\mathbb R^{n-1}\to\mathbb R^{n-2}$ omit $x_k$, and for fixed $x_n$ set $g_{k,x_n}(y)=f_k(y,x_n)$. At almost every $x_n$, Hölder's inequality on $\mathbb R^{n-1}$ with conjugate exponents $n-1$ and $\frac{n-1}{n-2}$ gives

    $$
    \int_{\mathbb R^{n-1}}f_n(x')^{\frac1{n-1}}\prod_{k=1}^{n-1}g_{k,x_n}(\widetilde\pi_k(x'))^{\frac1{n-1}}\,dx'
    \le\|f_n\|_{L^1(\mathbb R^{n-1})}^{\frac1{n-1}}
    \left(\int_{\mathbb R^{n-1}}\prod_{k=1}^{n-1}g_{k,x_n}(\widetilde\pi_k(x'))^{\frac1{n-2}}\,dx'\right)^{\frac{n-2}{n-1}}.
    $$

    Applying the $(n-1)$-dimensional hypothesis to the inner integral bounds the second factor by

    $$
    \left(\prod_{k=1}^{n-1}\|g_{k,x_n}\|_{L^1(\mathbb R^{n-2})}^{\frac1{n-2}}\right)^{\frac{n-2}{n-1}}
    =\prod_{k=1}^{n-1}\|g_{k,x_n}\|_{L^1(\mathbb R^{n-2})}^{\frac1{n-1}}.
    $$

    Integrate over $x_n\in\mathbb R$ and apply the $(n-1)$-factor Hölder inequality with exponents all equal to $n-1$:

    $$
    \int_{\mathbb R}\prod_{k=1}^{n-1}\|g_{k,x_n}\|_{L^1(\mathbb R^{n-2})}^{\frac1{n-1}}\,dx_n
    \le\prod_{k=1}^{n-1}\left(\int_{\mathbb R}\|g_{k,x_n}\|_{L^1(\mathbb R^{n-2})}\,dx_n\right)^{\frac1{n-1}}
    =\prod_{k=1}^{n-1}\|f_k\|_{L^1(\mathbb R^{n-1})}^{\frac1{n-1}}.
    $$

    Multiplying by $\|f_n\|_{L^1(\mathbb R^{n-1})}^{\frac1{n-1}}$ completes the induction.

!!! corollary "Corollary 10.2. Volume from coordinate shadows"

    Let $E\subset\mathbb R^n$ be measurable with measurable projections $\pi_kE\subset\mathbb R^{n-1}$. Then

    $$
    |E|^{n-1}\le\prod_{k=1}^n|\pi_kE|.
    \tag{1.2}
    $$

    In particular, in $\mathbb R^3$, $|E|^2\le|\pi_1E|\,|\pi_2E|\,|\pi_3E|$; if each shadow has two-dimensional measure $|\pi_iE|\lesssim r^2$, then $|E|\lesssim r^3$.

??? proof "Proof"

    Take $f_k=\mathbf 1_{\pi_kE}$ in Lemma 10.1. If $x\in E$, then $\pi_k(x)\in\pi_kE$ for every $k$, so $\mathbf 1_E(x)\le\prod_{k=1}^n f_k(\pi_k(x))^{\frac1{n-1}}$ pointwise. Integrating and raising to the $(n-1)$st power gives (1.2). If any $|\pi_kE|=\infty$ and the others are positive, the inequality is trivial; if some $|\pi_kE|=0$, Fubini shows $|E|=0$.

**Axis-parallel tubes.** Suppose $T_{k,a}=\mathcal N_W(\ell_{k,a})$ has axis $\ell_{k,a}$ parallel to $e_k$, so $\mathbf 1_{T_{k,a}}(x)=\mathbf 1_{B(y_{k,a},W)}(\pi_k(x))$ for a ball $B(y_{k,a},W)\subset\mathbb R^{n-1}$ of measure $\omega_{n-1}W^{n-1}$. Setting $f_k=\sum_{a=1}^{A_k}\mathbf 1_{B(y_{k,a},W)}$ in (1.1) yields

$$
\int_{\mathbb R^n}\prod_{k=1}^n\left(\sum_{a=1}^{A_k}\mathbf 1_{T_{k,a}}(x)\right)^{\frac1{n-1}}dx
\le\omega_{n-1}^{\frac n{n-1}}W^n\prod_{k=1}^nA_k^{\frac1{n-1}},
\tag{1.3}
$$

with no dependence on tube length or ambient cube size.

**Polynomial zero sets versus multiscale induction.** For the endpoint three-dimensional theorem cited as [Theorem 9.1](chapter-09.md#multilinear-kakeya), allowing directions to vary within transverse caps breaks the product structure of (1.3). Guth's 2010 endpoint proof [[3]](#references) replaces coordinate projections by algebraic hypersurfaces (see also Carbery–Valdimarsson [[2]](#references) via the Borsuk–Ulam theorem). In the simplest equal-cardinality overlap model—$M$ unit tubes in each of three near-axis families meeting $K$ unit cubes—the polynomial ham-sandwich theorem finds a nonzero polynomial of degree $D\lesssim K^{1/3}$ whose zero locus bisects all $K$ cubes. Each bisected cube contributes $\gtrsim1$ of surface area; transversality ensures that at least one of the three families projects with bounded Jacobian onto a large part of that area, while a line not contained in the surface meets it at most $D$ times. Counting tube-surface intersections gives $K\lesssim MD\lesssim MK^{1/3}$, hence $K\lesssim M^{3/2}$. Controlling full multiplicities without losing powers of the scale requires directional visibility rather than area alone. When a small scale loss $S^\varepsilon$ is acceptable—as in the multilinear restriction iteration below—a much shorter multiscale covering argument suffices [[4]](#references).

## 2. Guth's multiscale proof of non-endpoint multilinear Kakeya { #multiscale-kakeya }

For $k=1,\dots,n$, let $\{\ell_{k,a}\}_{a=1}^{A_k}$ be lines in $\mathbb R^n$ with unit direction vectors $\omega_{k,a}\in\mathbb S^{n-1}$ satisfying

$$
|\omega_{k,a}-e_k|<\frac1{100n},
\qquad
T_{k,a}:=\mathcal N_1(\ell_{k,a}).
\tag{2.1}
$$

Each tube is infinitely long; restricting the integral to a cube $Q_S\subset\mathbb R^n$ of side length $S\ge1$ makes longitudinal extent irrelevant.

!!! theorem "Theorem 10.3. Non-endpoint multilinear Kakeya inequality (Guth)"

    Assume (2.1). For every $\varepsilon>0$ and every cube $Q_S\subset\mathbb R^n$ of side length $S\ge1$,

    $$
    \int_{Q_S}\prod_{k=1}^n\left(\sum_{a=1}^{A_k}\mathbf 1_{T_{k,a}}(x)\right)^{\frac1{n-1}}dx
    \le C_{\varepsilon,n}\,S^\varepsilon\prod_{k=1}^nA_k^{\frac1{n-1}}.
    \tag{2.2}
    $$

The proof reduces angular variation to a small parameter $\delta>0$ and trades angular spread for tube width across scales.

**Reduction to $\delta$-caps.** Fix $0<\delta\le\frac14$. Cover each spherical cap $C_k=\mathbb S^{n-1}\cap B(e_k,(100n)^{-1})$ by $O_{n,\delta}(1)$ caps $C_{k,\lambda}$ of radius $\delta/2$. Since $0<\frac1{n-1}\le1$, $(u+v)^{\frac1{n-1}}\le u^{\frac1{n-1}}+v^{\frac1{n-1}}$ for $u,v\ge0$, so the integral in (2.2) splits into $O_{n,\delta}(1)$ summands indexed by $n$-tuples $(\lambda_1,\dots,\lambda_n)$. For one tuple with cap centers $v_k\in C_k$, $|v_k-e_k|<(100n)^{-1}$ implies that the matrix $V=(v_1,\dots,v_n)$ satisfies $\|V-I\|_{\mathrm{op}}<1/10$, so $|\det V|\simeq_n1$ and $\|V^{-1}\|_{\mathrm{op}}\le2$. Changing variables $x=Vy$ maps $v_k$ to $e_k$, distorts tube radii and cube sides by bounded dimensional factors, and places each transformed direction within $\delta$ of $e_k$.

For $W>0$ and directions obeying $|\omega_{k,a}-e_k|\le\delta\le\frac14$, write

$$
T_{k,a,W}=\mathcal N_W(\ell_{k,a}),
\qquad
f_{k,W}(x)=\sum_{a=1}^{A_k}\mathbf 1_{T_{k,a,W}}(x).
$$

!!! lemma "Lemma 10.4. Change of scale"

    Assume $|\omega_{k,a}-e_k|\le\delta\le\frac14$. There exists a constant $C_n$ depending only on $n$ such that whenever $S\ge\delta^{-1}W$,

    $$
    \int_{Q_S}\prod_{k=1}^nf_{k,W}(x)^{\frac1{n-1}}\,dx
    \le C_n\delta^n\int_{Q_S}\prod_{k=1}^nf_{k,\delta^{-1}W}(x)^{\frac1{n-1}}\,dx.
    \tag{2.3}
    $$

??? proof "Proof"

    Set $s_0=(2n\delta)^{-1}W$. Since $S\ge\delta^{-1}W\ge2ns_0$, the integer $L=\lceil S/s_0\rceil\ge2$ gives an exact partition of $Q_S$ into $L^n$ subcubes $Q_s$ of common side length $s=S/L$ satisfying

    $$
    \frac1{4n}\delta^{-1}W\le\frac12s_0\le s\le s_0=\frac1{2n}\delta^{-1}W.
    $$

    In particular, $\operatorname{diam}(Q_s)=\sqrt ns\le\frac1{2\sqrt n}\delta^{-1}W$. Fix one subcube $Q_s$ and let $N_{s,k}$ be the number of indices $a\in\{1,\dots,A_k\}$ for which $T_{k,a,W}\cap Q_s\ne\emptyset$.

    *Step 1: Axis-parallel covering at scale $W$.* For each tube meeting $Q_s$, pick $x_0\in T_{k,a,W}\cap Q_s$ and $p_0\in\ell_{k,a}$ with $|x_0-p_0|<W$. If $x\in T_{k,a,W}\cap Q_s$ and $p\in\ell_{k,a}$ is closest to $x$, then $|x-p|<W$ and $p-p_0=\tau\omega_{k,a}$ with $|\tau|\le|p-x|+|x-x_0|+|x_0-p_0|<2W+\sqrt ns$. Because $|\pi_k(\omega_{k,a})|\le|\omega_{k,a}-e_k|\le\delta$,

    $$
    |\pi_k(x-x_0)|\le|\pi_k(x-p)|+|\tau|\delta+|\pi_k(p_0-x_0)|
    <2W+\delta(2W+\sqrt ns)<4W.
    $$

    Thus $T_{k,a,W}\cap Q_s$ is contained in the $e_k$-parallel cylinder $\{y:|\pi_k(y-x_0)|<4W\}$. Applying (1.3) at radius $4W$ to the $N_{s,k}$ covering cylinders gives

    $$
    \int_{Q_s}\prod_{k=1}^nf_{k,W}(x)^{\frac1{n-1}}\,dx
    \lesssim_n W^n\prod_{k=1}^nN_{s,k}^{\frac1{n-1}}.
    $$

    *Step 2: Enlarging to $\delta^{-1}W$ covers $Q_s$.* For the same $p_0\in\ell_{k,a}$ and any $x\in Q_s$,

    $$
    \operatorname{dist}(x,\ell_{k,a})\le|x-p_0|\le|x-x_0|+|x_0-p_0|
    <\sqrt ns+W\le\left(\frac1{2\sqrt n}+\frac14\right)\delta^{-1}W<\delta^{-1}W.
    $$

    Hence $Q_s\subset T_{k,a,\delta^{-1}W}$ for every $W$-tube meeting $Q_s$, which means $N_{s,k}\le f_{k,\delta^{-1}W}(x)$ pointwise on $Q_s$. Since $|Q_s|=s^n\simeq_n(\delta^{-1}W)^n$, we have $W^n\simeq_n\delta^n|Q_s|$, so

    $$
    \int_{Q_s}\prod_{k=1}^nf_{k,W}(x)^{\frac1{n-1}}\,dx
    \le C_n\delta^n|Q_s|\prod_{k=1}^nN_{s,k}^{\frac1{n-1}}
    \le C_n\delta^n\int_{Q_s}\prod_{k=1}^nf_{k,\delta^{-1}W}(x)^{\frac1{n-1}}\,dx.
    $$

    Summing over the partition $Q_s$ of $Q_S$ yields (2.3).

??? proof "Proof of Theorem 10.3"

    By the cap reduction and affine rescaling (covering the image of $Q_S$ by $O_n(1)$ axis-parallel cubes), assume $|\omega_{k,a}-e_k|\le\delta$ for a fixed $\delta\in(0,1/4]$ to be chosen in terms of $n$ and $\varepsilon$.

    Suppose first that $S=\delta^{-M}$ for an integer $M\ge1$. Iterating Lemma 10.4 $M$ times from $W=1$ up to $W=\delta^{-M}=S$ gives

    $$
    \int_{Q_S}\prod_{k=1}^nf_{k,1}(x)^{\frac1{n-1}}\,dx
    \le C_n^M\delta^{Mn}\int_{Q_S}\prod_{k=1}^nf_{k,S}(x)^{\frac1{n-1}}\,dx.
    $$

    Pointwise, $f_{k,S}(x)=\sum_{a=1}^{A_k}\mathbf 1_{T_{k,a,S}}(x)\le A_k$, and $|Q_S|=S^n=\delta^{-Mn}$. Therefore the right side is at most

    $$
    C_n^M\prod_{k=1}^nA_k^{\frac1{n-1}}=S^{\frac{\log C_n}{\log(1/\delta)}}\prod_{k=1}^nA_k^{\frac1{n-1}}.
    $$

    Choose $\delta=\delta(n,\varepsilon)\in(0,1/4]$ small enough that $\log C_n/\log(1/\delta)<\varepsilon$. For general $S\ge1$, choose the smallest integer $M\ge1$ with $\delta^{-M}\ge S$; then $\delta^{-M}\le\delta^{-1}S$, enlarge $Q_S$ to a concentric cube of side $\delta^{-M}$, and absorb $\delta^{-\varepsilon}$ together with the $O_{n,\delta}(1)$ cap-counting factor into $C_{\varepsilon,n}$.

**Rescaled weighted formulation for wave packets.** In Fourier restriction at physical scale $R\ge1$, wave packets live on tubes of radius $R^{1/2}$ and length $R$. Raise the integrand of (2.2) to the $\frac{n-1}n$ power via the $L^{\frac n{n-1}}$ norm.

!!! definition "Definition 10.5. Scale-R multilinear Kakeya constant"

    Fix $\omega\in(0,1]$ and $R\ge1$. Let $\mathcal T_k=\{T_{k,a}\}_a$, $k=1,\dots,n$, be finite families of tubes in $\mathbb R^n$ of radius $R^{1/2}$ and length $R$ whose unit axis directions satisfy the uniform transversality condition

    $$
    |\det(\omega_{1,a_1},\dots,\omega_{n,a_n})|\ge\omega>0
    \qquad(\forall\,T_{k,a_k}\in\mathcal T_k).
    \tag{2.4}
    $$

    Define $\operatorname{MK}_\omega(\frac n{n-1},R)$ to be the least constant such that for every cube $Q_R\subset\mathbb R^n$ of side length $R$ and all nonnegative weights $w_{T_{k,a}}\ge0$,

    $$
    \left\|\prod_{k=1}^n\left(\sum_aw_{T_{k,a}}\mathbf 1_{T_{k,a}}\right)^{\frac1n}\right\|_{L^{\frac n{n-1}}(Q_R)}
    \le\operatorname{MK}_\omega\!\left(\frac n{n-1},R\right)R^{\frac{n-1}2}\prod_{k=1}^n\left(\sum_aw_{T_{k,a}}\right)^{\frac1n}.
    \tag{2.5}
    $$

When $\omega$ is fixed across an iteration, we write $\operatorname{MK}(\frac n{n-1},R)$ for brevity.

!!! corollary "Corollary 10.6. Weighted bound under general transversality"

    For every $\varepsilon>0$ and $R\ge1$, there are constants $C_{\varepsilon,n}$ and $\beta_n>0$ such that

    $$
    \operatorname{MK}_\omega\!\left(\frac n{n-1},R\right)\le C_{\varepsilon,n}\omega^{-\beta_n}R^\varepsilon.
    \tag{2.6}
    $$

??? proof "Proof"

    Extend each finite tube to an infinite cylinder $\mathcal N_{R^{1/2}}(\ell_{k,a})$ and rescale $x=R^{1/2}y$. Then $dx=R^{n/2}\,dy$, the tubes have unit radius, and $Q_R$ becomes a cube $Q_{R^{1/2}}$ of side $R^{1/2}$. Cover $\mathbb S^{n-1}$ by $O_n(\omega^{-(n-1)})$ caps of radius $\eta=c_n\omega$. Subadditivity of $t\mapsto t^{\frac1{n-1}}$ splits the integral over cap $n$-tuples. If a tuple contains tubes from each family, pick representative directions $v_1,\dots,v_n$; then $|\det V|\ge\omega$, $\|V\|_{\mathrm{op}}\le\sqrt n$, and $\|V^{-1}\|_{\mathrm{op}}=\|(\det V)^{-1}\operatorname{adj}V\|_{\mathrm{op}}\lesssim_n\omega^{-1}$. For small $c_n$, $|V^{-1}\omega_{k,a}-e_k|\le\|V^{-1}\|_{\mathrm{op}}|\omega_{k,a}-v_k|<(100n)^{-1}$. Setting $y=Vz$ enlarges tube radii by at most $\|V^{-1}\|_{\mathrm{op}}\lesssim_n\omega^{-1}$ (covered by $O_n(\omega^{-(n-1)})$ unit-radius parallel tubes) and maps $Q_{R^{1/2}}$ into a cube of side $\lesssim_n\omega^{-1}R^{1/2}$. Theorem 10.3 handles unweighted families; integer repetition, rational scaling, and monotone convergence (as in [Chapter 9](chapter-09.md#multilinear-kakeya)) extend the bound to arbitrary nonnegative weights, and taking the $\frac{n-1}n$ power produces $(R^{n/2})^{\frac{n-1}n}=R^{\frac{n-1}2}$ and $(R^{1/2})^{\frac{n-1}n\varepsilon}$.

## 3. Multilinear restriction and the four-constant iteration { #multilinear-restriction }

Let $\Sigma=\{(\xi,|\xi|^2):\xi\in[-1,1]^{n-1}\}\subset\mathbb R^n$ be the truncated paraboloid. Parameterizing $\Sigma$ by $\xi\in[-1,1]^{n-1}$, the extension operator for a patch $Q\subset[-1,1]^{n-1}$ is

$$
E_Qf(x)=\int_Qe^{2\pi i(x'\cdot\xi+x_n|\xi|^2)}f(\xi)\,d\xi,
\qquad x=(x',x_n)\in\mathbb R^{n-1}\times\mathbb R.
$$

(Surface area on $\Sigma$ is $\sqrt{1+4|\xi|^2}\,d\xi\simeq_n d\xi$ on $[-1,1]^{n-1}$, so using $d\xi$ changes norm bounds only by dimensional constants.) At $\xi\in Q$, a unit normal to $\Sigma$ is

$$
\nu(\xi)=\frac{(-2\xi,1)}{\sqrt{1+4|\xi|^2}}.
$$

!!! definition "Definition 10.7. Extension, thickened, and discrete restriction constants"

    Let $Q_1,\dots,Q_n\subset[-1,1]^{n-1}$ be open patches satisfying uniform normal transversality

    $$
    |\det(\nu(\xi_1),\dots,\nu(\xi_n))|\ge\omega>0
    \qquad(\forall\,\xi_k\in Q_k),
    \tag{3.1}
    $$

    and put $p=\frac{2n}{n-1}$. For $R\ge1$:

    1. $\operatorname{EMR}(q,R)$ is the least constant such that for all $f_k\in L^2(Q_k)$,

        $$
        \left\|\prod_{k=1}^n|E_{Q_k}f_k|^{\frac1n}\right\|_{L^q(B(0,R))}
        \le\operatorname{EMR}(q,R)\prod_{k=1}^n\|f_k\|_{L^2(Q_k)}^{\frac1n}.
        \tag{EMR}
        $$

    2. Let $\mathcal S_{R^{-1}}(Q_k)=\{(\xi,|\xi|^2+\eta_k):\xi\in Q_k,\ |\eta_k|\le R^{-1}\}$ be the vertical $R^{-1}$-thickening of the patch $\Sigma_{Q_k}$. Define $\operatorname{MR}(p,R)$ as the least constant such that for all $g_k\in\mathcal S(\mathbb R^n)$ with $\operatorname{supp}\widehat g_k\subset\mathcal S_{R^{-1}}(Q_k)$,

        $$
        \left\|\prod_{k=1}^n|g_k|^{\frac1n}\right\|_{L^p(B(0,R))}
        \le\operatorname{MR}(p,R)\,R^{-1/2}\prod_{k=1}^n\|\widehat g_k\|_{L^2(\mathbb R^n)}^{\frac1n}.
        \tag{MR}
        $$

    3. Define $\operatorname{DMR}(p,R)$ as the least constant such that for all $R^{-1}$-separated finite sets $\Lambda_k\subset\Sigma_{Q_k}$ and coefficients $a_\lambda\in\mathbb C$,

        $$
        \left\|\prod_{k=1}^n\left|\sum_{\lambda\in\Lambda_k}a_\lambda e^{2\pi i\lambda\cdot x}\right|^{\frac1n}\right\|_{L^p(B(0,R))}
        \le\operatorname{DMR}(p,R)\,R^{\frac{n-1}2}\prod_{k=1}^n\|a_\lambda\|_{\ell^2(\Lambda_k)}^{\frac1n}.
        \tag{DMR}
        $$

Note that on bounded slopes $|\xi|\le\sqrt{n-1}$, a Euclidean $c_nR^{-1}$-neighborhood of $\Sigma_{Q_k}$ is contained in $\mathcal S_{R^{-1}}(\widetilde Q_k)$ for a slightly enlarged patch $\widetilde Q_k$; keeping a fixed margin inside $Q_k$ makes vertical and Euclidean thickenings interchangeable up to dimensional constants.

!!! theorem "Theorem 10.8. Multilinear restriction theorem (Bennett–Carbery–Tao)"

    Assume (3.1). For every $q\ge\frac{2n}{n-1}$, every $\varepsilon>0$, and every $R\ge1$,

    $$
    \operatorname{EMR}(q,R)\le C_{n,q,\varepsilon}\,\omega^{-\gamma_n}R^\varepsilon.
    \tag{3.2}
    $$

Since $|E_{Q_k}f_k(x)|\le\|f_k\|_{L^1(Q_k)}\le|Q_k|^{1/2}\|f_k\|_{L^2(Q_k)}\lesssim_n\|f_k\|_{L^2(Q_k)}$, we trivially have $\operatorname{EMR}(\infty,R)\lesssim_n1$. Hölder interpolation between $q=\frac{2n}{n-1}$ and $q=\infty$ reduces Theorem 10.8 to the critical exponent $p=\frac{2n}{n-1}$.

**Keeping track of $\omega$ versus elliptic rescaling.** One sometimes reduces $\omega$ to a constant of order one by subdividing into caps of diameter $c_n\omega$ and applying a linear transformation aligning the normals. A general linear transformation in $\xi$, however, sends $|\xi|^2$ to a positive-definite quadratic form $\langle A\xi,\xi\rangle$, so that reduction properly takes place on the wider class of uniformly elliptic $C^2$ graphs (as in [[1]](#references), [[2]](#references)). Retaining $\omega$ directly in Corollary 10.6 avoids leaving the paraboloid: the normal direction on a cap of diameter $R^{-1/2}$ varies by $O(R^{-1/2})$, so once $R\ge C_n\omega^{-2}$ every cap tuple inherits transversality at least $\omega/2$, while smaller $R\le C_n\omega^{-2}$ are covered trivially by $|B(0,R)|^{1/p}\lesssim_n\omega^{-n/p}$.

We now link the four constants at $p=\frac{2n}{n-1}$.

!!! proposition "Proposition 10.9. Thickened support from extension"

    For $p=\frac{2n}{n-1}$ and $R\ge1$, $\operatorname{MR}(p,R)\lesssim_n\operatorname{EMR}(p,R)$.

??? proof "Proof"

    For $\operatorname{supp}\widehat g_k\subset\mathcal S_{R^{-1}}(Q_k)$, change variables $(\xi,\tau)=(\xi,|\xi|^2+\eta_k)$ (unit Jacobian) and set $f_{k,\eta_k}(\xi)=\widehat g_k(\xi,|\xi|^2+\eta_k)$. Plancherel gives

    $$
    \int_{-R^{-1}}^{R^{-1}}\|f_{k,\eta_k}\|_{L^2(Q_k)}^2\,d\eta_k=\|\widehat g_k\|_{L^2(\mathbb R^n)}^2,
    \qquad
    g_k(x)=\int_{-R^{-1}}^{R^{-1}}e^{2\pi i\eta_kx_n}E_{Q_k}f_{k,\eta_k}(x)\,d\eta_k.
    $$

    For $x\in B(0,R)$ we have $|x_n|\le R$, so expanding $e^{2\pi i(x_n/R)(R\eta_k)}$ in its power series and interchanging sum and integral (justified by integrable bounds) places the $\eta_k$-integral *inside* the linear operator $E_{Q_k}$:

    $$
    g_k(x)=\sum_{m=0}^\infty\frac{(2\pi ix_n/R)^m}{m!}\,E_{Q_k}F_{k,m}(x),
    \qquad
    F_{k,m}(\xi)=\int_{-R^{-1}}^{R^{-1}}(R\eta_k)^mf_{k,\eta_k}(\xi)\,d\eta_k.
    $$

    Since $|R\eta_k|\le1$, Cauchy–Schwarz in $\eta_k$ gives $|F_{k,m}(\xi)|^2\le2R^{-1}\int_{-R^{-1}}^{R^{-1}}|f_{k,\eta_k}(\xi)|^2\,d\eta_k$, hence

    $$
    \|F_{k,m}\|_{L^2(Q_k)}\le\sqrt2\,R^{-1/2}\|\widehat g_k\|_{L^2(\mathbb R^n)}
    \qquad(\forall\,m\ge0).
    $$

    Pointwise on $B(0,R)$, subadditivity of $t\mapsto t^{1/n}$ gives $|g_k(x)|^{1/n}\le\sum_{m=0}^\infty\big(\frac{(2\pi)^m}{m!}\big)^{1/n}|E_{Q_k}F_{k,m}(x)|^{1/n}$. Multiply over $k=1,\dots,n$ and apply Minkowski's triangle inequality in $L^p(B(0,R))$ (valid because $p=\frac{2n}{n-1}\ge2$):

    $$
    \begin{aligned}
    \left\|\prod_{k=1}^n|g_k|^{\frac1n}\right\|_{L^p(B(0,R))}
    &\le\sum_{m_1,\dots,m_n\ge0}\prod_{k=1}^n\left(\frac{(2\pi)^{m_k}}{m_k!}\right)^{\frac1n}
    \left\|\prod_{k=1}^n|E_{Q_k}F_{k,m_k}|^{\frac1n}\right\|_{L^p(B(0,R))}\\
    &\le\operatorname{EMR}(p,R)\,(\sqrt2)^nR^{-1/2}\left(\sum_{m=0}^\infty\left(\frac{(2\pi)^m}{m!}\right)^{\frac1n}\right)^n
    \prod_{k=1}^n\|\widehat g_k\|_{L^2(\mathbb R^n)}^{\frac1n}.
    \end{aligned}
    $$

    The numerical series converges by the ratio test, proving the bound.

Notice why vertical slicing requires expanding the vertical phase: one cannot pull the $\eta_k$-integrals directly through the $1/n$-powers by writing $\big\|\prod_{k=1}^n|\int_{-R^{-1}}^{R^{-1}}H_k(\eta_k)\,d\eta_k|^{1/n}\big\|_{L^p}\lesssim\int_{[-R^{-1},R^{-1}]^n}\big\|\prod_{k=1}^n|H_k(\eta_k)|^{1/n}\big\|_{L^p}d\eta$, since testing constant functions $H_k\equiv1$ gives $R^{-1}$ on the left and $R^{-n}$ on the right whenever $n\ge2$. Expanding $e^{2\pi i\eta_kx_n}$ on $|x_n|\le R$ keeps the $\eta_k$-integration linear inside $E_{Q_k}$ before fractional powers are taken.

!!! proposition "Proposition 10.10. Discrete restriction from thickened support"

    For $p=\frac{2n}{n-1}$ and $R\ge1$, $\operatorname{DMR}(p,R)\lesssim_n\operatorname{MR}(p,R)$.

??? proof "Proof"

    Fix a radial $\widehat\varphi_0\in C_c^\infty(B(0,1/4))$ with $\varphi_0(0)=1$; by continuity there is $c_0>0$ with $|\varphi_0(y)|\ge\frac12$ on $|y|\le c_0$. Covering $B(0,R)$ by $O_n(1)$ balls of radius $c_0R$ and translating, it suffices to bound the $L^p$ norm over $B(0,c_0R)$. Put $\varphi(x)=\varphi_0(x/R)$, so $|\varphi|\ge\frac12$ on $B(0,c_0R)$ and $\widehat\varphi(\zeta)=R^n\widehat\varphi_0(R\zeta)$ is supported in $B(0,\frac14R^{-1})$.

    Set $g_k(x)=\sum_{\lambda\in\Lambda_k}a_\lambda\varphi(x)e^{2\pi i\lambda\cdot x}$. On $B(0,c_0R)$, $|g_k(x)|\ge\frac12|\sum_{\lambda\in\Lambda_k}a_\lambda e^{2\pi i\lambda\cdot x}|$. Because $\Lambda_k\subset\Sigma_{Q_k}$ is $R^{-1}$-separated, the supports $\operatorname{supp}\widehat\varphi(\cdot-\lambda)\subset B(\lambda,\frac14R^{-1})$ are pairwise disjoint and lie inside $\mathcal S_{R^{-1}}(\widetilde Q_k)$ (shrinking the support radius by a fixed dimensional factor keeps $\operatorname{supp}\widehat g_k\subset\mathcal S_{R^{-1}}(Q_k)$ once $\Lambda_k$ stays at distance $\gtrsim R^{-1}$ from $\partial Q_k$, or after finite decomposition). Plancherel gives

    $$
    \|\widehat g_k\|_{L^2(\mathbb R^n)}=\|\widehat\varphi\|_{L^2(\mathbb R^n)}\|a_\lambda\|_{\ell^2(\Lambda_k)}
    \simeq_n R^{n/2}\|a_\lambda\|_{\ell^2(\Lambda_k)}.
    $$

    Applying (MR) produces $R^{-1/2}(R^{n/2})^{n\cdot\frac1n}=R^{\frac{n-1}2}$, matching (DMR).

**Wave-packet scale reduction.** The heart of the BCT iteration connects scale $R$ to scale $R^{1/2}$ via multilinear Kakeya. Partition $[-1,1]^{n-1}$ into cubes $\tau$ of side length $R^{-1/2}$; for $R\ge C_n\omega^{-2}$, the tubes associated to caps meeting $Q_k$ have normals within $O_n(R^{-1/2})\le\frac{\omega}{4n^2}$ of $\nu(Q_k)$, hence satisfy (2.4) with parameter $\omega/2$. Using the wave-packet expansion of [Chapter 9](chapter-09.md#packets) on each cap $\tau$ (with box width $R^{-1/2}$ in $\mathbb R^{n-1}$), write

$$
E_{Q_k}f_k(x)=\sum_{\tau}\sum_{T\in\mathcal T_{k,\tau}}c_T\Phi_T(x),
$$

where $T$ has transverse radius $R^{1/2}$, length $R$, and axis along $\nu(c_\tau)$ ($c_\tau$ the center of $\tau$). With $L^\infty$-normalized packets $|\Phi_T(x)|\lesssim_M(1+R^{-1/2}|(x-x_T)_\perp|)^{-M}$ ($M>2n$) carrying carrier frequency $\lambda_T=(c_\tau,|c_\tau|^2)\in\Sigma_{Q_k}$, Parseval on each cap of volume $R^{-\frac{n-1}2}$ gives

$$
R^{\frac{n-1}2}\sum_{T\in\mathcal T_k}|c_T|^2\simeq_n\|f_k\|_{L^2(Q_k)}^2.
\tag{3.3}
$$

!!! proposition "Proposition 10.11. Scale reduction via wave packets and Kakeya"

    Assume (3.1) and $R\ge C_n\omega^{-2}$. For $p=\frac{2n}{n-1}$,

    $$
    \operatorname{EMR}(p,R)\le C_n\,\operatorname{DMR}(p,R^{1/2})\,\operatorname{MK}_{\omega/2}\!\left(\frac n{n-1},R\right)^{1/2}.
    \tag{3.4}
    $$

??? proof "Proof sketch with exact dimensional scaling and tail bookkeeping"

    Cover $B(0,R)$ with bounded overlap by balls $B$ of radius $R^{1/2}$. On one ball $B$ centered at $x_B$, a packet $\Phi_T$ comes from a cap $\tau$ and translation index $m\in\mathbb Z^{n-1}$ (spacing $\simeq R^{1/2}$ transverse to $\nu(c_\tau)$). For fixed $\tau$, translations $T\in\mathcal T_{k,\tau}$ at transverse distance $\simeq 2^\ell R^{1/2}$ from $B$ contribute rapidly decaying tails $O_M(2^{-M\ell})$; as in [Chapter 9](chapter-09.md#multilinear-kakeya) and [Proposition 10.9](#multilinear-restriction), expanding the smooth envelope on $B$ by Fourier/Taylor series around $x_B$ reduces each fixed-$(m\text{-offset})$ layer to a discrete exponential sum $\sum_{\tau}a_{\tau,B}e^{2\pi i\lambda_\tau\cdot x}$ with $R^{-1/2}$-separated frequencies $\lambda_\tau=(c_\tau,|c_\tau|^2)$ and weights $|a_{\tau,B}|^2$ dominated by $|c_T|^2W_T(x)$, where $W_T(x)=(1+R^{-1/2}\operatorname{dist}(x,L_T))^{-M}$.

    In the core schematic layer $T\in\mathcal T_k(B)=\{T\in\mathcal T_k:T\cap B\ne\emptyset\}$ (with at most $O_n(1)$ tubes per cap $\tau$ meeting $B$, split into $O_n(1)$ separated subfamilies), applying (DMR) at scale $R^{1/2}$ on $B$ and raising to the $p$th power ($p=\frac{2n}{n-1}$) gives

    $$
    \left\|\prod_{k=1}^n\left|\sum_{T\in\mathcal T_k(B)}c_Te^{2\pi i\lambda_T\cdot x}\right|^{\frac1n}\right\|_{L^p(B)}^p
    \lesssim_n\operatorname{DMR}(p,R^{1/2})^p\,(R^{1/2})^{\frac{n-1}2p}\prod_{k=1}^n\left(\sum_{T\in\mathcal T_k(B)}|c_T|^2\right)^{\frac p{2n}}.
    $$

    Notice the two exponents:

    $$
    (R^{1/2})^{\frac{n-1}2p}=R^{\frac n2}\simeq_n|B|,
    \qquad
    \frac p{2n}=\frac1{n-1}.
    $$

    Every $T\in\mathcal T_k(B)$ satisfies $B\subset\widetilde T$, where $\widetilde T$ is the coaxial tube of radius $3R^{1/2}$ and length $3R$. Hence $\sum_{T\in\mathcal T_k(B)}|c_T|^2\le\sum_{T\in\mathcal T_k}|c_T|^2\mathbf 1_{\widetilde T}(x)$ for every $x\in B$, and the factor $R^{n/2}$ is absorbed by averaging $\frac1{|B|}\int_B(\cdots)\,dx$! Summing over the bounded-overlap cover of $B(0,R)$ yields

    $$
    \begin{aligned}
    \sum_B\left\|\prod_{k=1}^n\left|\sum_{T\in\mathcal T_k(B)}c_Te^{2\pi i\lambda_T\cdot x}\right|^{\frac1n}\right\|_{L^p(B)}^p
    &\lesssim_n\operatorname{DMR}(p,R^{1/2})^p\int_{B(0,2R)}\prod_{k=1}^n\left(\sum_{T\in\mathcal T_k}|c_T|^2\mathbf 1_{\widetilde T}(x)\right)^{\frac1{n-1}}dx\\
    &\lesssim_n\operatorname{DMR}(p,R^{1/2})^p\,\operatorname{MK}_{\omega/2}\!\left(\frac n{n-1},R\right)^{\frac n{n-1}}
    \prod_{k=1}^n\left(R^{\frac{n-1}2}\sum_{T\in\mathcal T_k}|c_T|^2\right)^{\frac1{n-1}},
    \end{aligned}
    $$

    where we applied (2.5) raised to the $\frac n{n-1}$ power: $(R^{\frac{n-1}2})^{\frac n{n-1}}=R^{n/2}=\prod_{k=1}^n(R^{\frac{n-1}2})^{\frac1{n-1}}$. By Parseval (3.3), the final product is comparable to $\prod_{k=1}^n\|f_k\|_{L^2(Q_k)}^{\frac2{n-1}}=\prod_{k=1}^n\|f_k\|_{L^2(Q_k)}^{p/n}$. Decaying tail layers at dyadic distance $2^\ell R^{1/2}$ contribute an additional rapidly convergent factor $2^{-(M/2-n)\ell}$ as in [Chapter 9](chapter-09.md#multilinear-kakeya). Taking $p$th roots and using $\frac n{n-1}\cdot\frac1p=\frac12$ proves (3.4).

??? proof "Completion of the proof of Theorem 10.8"

    Combining Propositions 10.9, 10.10, and 10.11 gives, for $R\ge R_0:=C_n\omega^{-2}$,

    $$
    \operatorname{EMR}(p,R)\le\widetilde C_n\,\operatorname{EMR}(p,R^{1/2})\,\operatorname{MK}_{\omega/2}\!\left(\frac n{n-1},R\right)^{1/2}.
    $$

    Choose the smallest integer $N\ge0$ such that $R^{2^{-N}}\le\max(10,R_0)$; then $N\lesssim\log\log(R+10)$. On the terminal range $1\le r\le\max(10,R_0)$, $\|E_{Q_k}f_k\|_\infty\lesssim_n\|f_k\|_{L^2}$ gives $\operatorname{EMR}(p,r)\lesssim_n|B(0,r)|^{1/p}\lesssim_n\omega^{-n/p}$. Fix $0<\varepsilon'<\varepsilon$. At fixed $\omega>0$, iterating $N$ times and inserting Corollary 10.6 with exponent $\varepsilon'$ at each scale $R^{2^{-j}}$ yields

    $$
    \begin{aligned}
    \operatorname{EMR}(p,R)
    &\le\widetilde C_n^N\operatorname{EMR}(p,R^{2^{-N}})\prod_{j=0}^{N-1}\left(C_{\varepsilon',n}(\omega/2)^{-\beta_n}R^{\varepsilon'2^{-j}}\right)^{1/2}\\
    &\lesssim_{n,\varepsilon'}\omega^{-n/p}\big(\widetilde C_nC_{\varepsilon',n}^{1/2}(\omega/2)^{-\beta_n/2}\big)^NR^{\varepsilon'\sum_{j=0}^{N-1}2^{-j-1}}.
    \end{aligned}
    $$

    Since $\sum_{j=0}^{N-1}2^{-j-1}<1$ and $N\lesssim\log\log(R+10)$, any factor $B^N$ grows only polylogarithmically in $R$ and is absorbed into $C_{n,\varepsilon,\omega}R^{\varepsilon-\varepsilon'}$. To obtain the polynomial dependence $\omega^{-\gamma_n}$ stated in (3.2) uniformly as $\omega\downarrow0$, one works on the affine-invariant class of smooth elliptic graphs with second fundamental form comparable to $I$: subdividing $Q_k$ into $O_n(\omega^{-(n-1)})$ caps of diameter $c_n\omega$ and applying a single linear coordinate change before the iteration normalizes the transversality parameter to a dimensional constant $\omega_0(n)>0$, so the iterated base $\widetilde C_nC_{\varepsilon',n}^{1/2}(\omega_0/2)^{-\beta_n/2}$ is independent of $\omega$ [[1]](#references), [[2]](#references).

## 4. Eight frequency classes and a spectral-gap aside { #frequency-classes }

Returning to three-dimensional nonlinear PDE, consider a trilinear spatial integral $\int_{\mathbb R^3}F_1F_2F_3\,dx$ localized near a dyadic scale $2^j$, as in the Navier–Stokes stretching form $T(\omega,\omega,\mathcal R\omega)$ of [Chapter 9](chapter-09.md#vorticity). Relative to the target high scale $H\simeq2^j$, group separated lower scales into $L\lesssim2^{j-10}$. Expanding each of the three inputs into $H+L$ produces eight frequency classes:

$$
\begin{gathered}
H\text{–}H\text{–}H,\qquad H\text{–}L\text{–}H,\qquad H\text{–}H\text{–}L,\qquad L\text{–}H\text{–}H,\\
H\text{–}L\text{–}L,\qquad L\text{–}H\text{–}L,\qquad L\text{–}L\text{–}H,\qquad L\text{–}L\text{–}L.
\end{gathered}
$$

Before any geometric tube estimate is invoked, translation invariance eliminates three of the eight classes:

- **Single-high classes ($H\text{–}L\text{–}L$, $L\text{–}H\text{–}L$, $L\text{–}L\text{–}H$).** By Plancherel and convolution, $\int_{\mathbb R^3}F_1F_2F_3\,dx=(\widehat F_1*\widehat F_2*\widehat F_3)(0)$ requires $\xi_1+\xi_2+\xi_3=0$ on the Fourier supports. If $|\xi_1|\ge2^{j-1}$ while $|\xi_2|,|\xi_3|\le2^{j-9}$, then $|\xi_1+\xi_2+\xi_3|\ge(2^{-1}-2^{-8})2^j>0$. Thus all three single-high signed integrals *vanish identically*. This cancellation is lost if one prematurely replaces the integrand by $|F_1|\,|F_2|\,|F_3|$.
- **Two-high classes ($H\text{–}H\text{–}L$, $H\text{–}L\text{–}H$, $L\text{–}H\text{–}H$).** Two frequencies near $2^j$ can sum to a small frequency near $2^{j-10}$ when they are nearly antiparallel; these are paraproduct/commutator interactions ([Chapter 7](chapter-07.md#paraproducts)).
- **All-low class ($L\text{–}L\text{–}L$).** Every factor lies strictly below $2^{j-9}$, so this piece belongs to lower shells and is handled by summing or inducting across scales.
- **All-high class ($H\text{–}H\text{–}H$).** Three comparable high frequencies can close into a resonant triangle $\xi_1+\xi_2+\xi_3=0$; this is the regime addressed by packet geometry in [Chapter 11](chapter-11.md).

**Spectral behavior near zero: massless operators versus a mass gap.** Low-frequency issues in massless evolution equations reflect the absence of a spectral gap at zero. On $\mathbb R^3$, the nonnegative self-adjoint Laplacian $-\Delta:H^2(\mathbb R^3)\to L^2(\mathbb R^3)$ has symbol $4\pi^2|\xi|^2$ and continuous spectrum $\operatorname{Spec}(-\Delta)=[0,\infty)$ reaching zero, just as free $U(1)$ Maxwell waves allow arbitrarily small excitation energy at long wavelengths. By contrast, for four-dimensional pure $SU(3)$ quantum Yang–Mills theory on a physical Hilbert space $\mathcal H$ with unbounded Hamiltonian $\mathcal P:D(\mathcal P)\subset\mathcal H\to\mathcal H$, the Clay mass-gap problem asks to construct the theory and prove $\operatorname{Spec}(\mathcal P)\subset\{0\}\cup[\Delta,\infty)$ for some $\Delta>0$ above the vacuum state $0$. In our classical PDE lectures this appears purely as a contrasting spectral picture at low energy, not as an assertion accessible to Euclidean tube estimates.

## 5. Directional transport and space-time Loomis–Whitney { #transport-null-structure }

How do relative propagation velocities govern nonlinear accumulation over long times? A transparent model in $\mathbb R^{1+3}$ replaces curved dispersion by constant-coefficient directional transport.

For a constant vector $v=(v^1,v^2,v^3)\in\mathbb R^3$, the homogeneous transport equation

$$
\left(\partial_t-\sum_{i=1}^3v^i\partial_{x_i}\right)q=0,
\qquad q(0,x)=f(x),
\tag{5.1}
$$

has the exact solution $q(t,x)=f(x+tv)$, since $\partial_t[f(x+tv)]=v\cdot\nabla f(x+tv)=\sum_iv^i\partial_{x_i}[f(x+tv)]$. (Pairing $\partial_t-v\cdot\nabla_x$ with $f(x-tv)$ would flip the sign; the latter solves $\partial_tq+v\cdot\nabla_xq=0$.) Consider three three-dimensional profiles $q^1,q^2,q^3$ transported along the coordinate axes:

$$
(\partial_t-v^i\partial_{x_i})q^i=0,
\qquad q^i(0,x)=f_i(x)\in L^2(\mathbb R^3),
\qquad q^i(t,x)=f_i(x+tv^ie_i).
\tag{5.2}
$$

Notice that $f_i$ must depend on all three coordinates $(x_1,x_2,x_3)$ to belong to $L^2(\mathbb R^3)$; a nonzero profile of $x_i$ alone has infinite $L^2(\mathbb R^3)$ norm. Translation preserves every $L^p(\mathbb R^3)$ norm and shifts spatial supports according to $\operatorname{supp}q^i(t)=\operatorname{supp}f_i-tv^ie_i$.

**Fixed-time trilinear control requires frequency localization, not spatial support.** At a single time $t$, bounding $\int_{\mathbb R^3}|q^1q^2q^3|\,dx$ by $\prod_{i=1}^3\|f_i\|_{L^2(\mathbb R^3)}$ is *impossible* under a spatial support assumption $\operatorname{supp}f_i\subset B(0,R)$ alone: rescaling a bump inside $B(0,R)$ keeps its $L^2$ norm equal to $1$ while sending the triple integral to infinity. If instead $\operatorname{supp}\widehat f_1\subset B(0,\rho)$, Fourier inversion and Cauchy–Schwarz give $\|q^1(t)\|_\infty=\|f_1\|_\infty\le|B(0,\rho)|^{1/2}\|f_1\|_2=(\frac{4\pi}3)^{1/2}\rho^{3/2}\|f_1\|_2$, hence

$$
\int_{\mathbb R^3}|q^1(t,x)q^2(t,x)q^3(t,x)|\,dx
\le\|q^1(t)\|_\infty\|q^2(t)\|_2\|q^3(t)\|_2
\lesssim\rho^{3/2}\prod_{i=1}^3\|f_i\|_{L^2(\mathbb R^3)}
$$

(bounded above by $C\rho^3\prod_i\|f_i\|_2$ when $\rho\ge1$). Integrating this fixed-time bound over $[0,t]$, however, loses a factor of $t$. Uniform-in-time control of an inhomogeneous transport equation requires genuine *relative motion* of the characteristics.

**Mixed quadratic forcing.** Consider the inhomogeneous equation forced by $q^1q^2$:

$$
(\partial_t-v^3\partial_{x_3})w=q^1q^2,
\qquad w(0,x)=0.
\tag{5.3}
$$

Let $S_3(t)h(x)=h(x+tv^3e_3)$ be the unitary propagator of $\partial_t-v^3\partial_{x_3}$. Duhamel's formula gives

$$
w(t)=\int_0^tS_3(t-s)\big(q^1(s)q^2(s)\big)\,ds.
$$

Pairing with an arbitrary test function $h\in L^2(\mathbb R^3)$ and using $S_3(t-s)^*=S_3(s-t)$,

$$
|\langle w(t),h\rangle|
=\left|\int_0^t\langle q^1(s)q^2(s),S_3(s-t)h\rangle\,ds\right|
\le\int_{\mathbb R}\int_{\mathbb R^3}|f_1(x+sc_1)|\,|f_2(x+sc_2)|\,|\widetilde h(x+sc_3)|\,dx\,ds,
\tag{5.4}
$$

where $c_i=v^ie_i$ and $\widetilde h=S_3(-t)h$ satisfies $\|\widetilde h\|_{L^2}=\|h\|_{L^2}$ with *no* Fourier support restriction.

!!! proposition "Proposition 10.12. Space-time Loomis–Whitney under a transverse slab cutoff"

    Let $c_1,c_2,c_3\in\mathbb R^3$ be constant velocity vectors such that the relative velocities $b_1=c_1-c_3$ and $b_2=c_2-c_3$ are linearly independent. Put

    $$
    \gamma=|b_1\times b_2|>0,
    \qquad
    n=\frac{b_1\times b_2}{\gamma}\in\mathbb S^2.
    $$

    (For $c_i=v^ie_i$, $\gamma=\sqrt{(v^1v^2)^2+(v^1v^3)^2+(v^2v^3)^2}$.) If $f_1,f_2,f_3\in L^2(\mathbb R^3)$ and $\operatorname{supp}\widehat f_1\subset\{\xi\in\mathbb R^3:|\xi\cdot n|\le\rho\}$ for some $\rho>0$, then

    $$
    \int_{\mathbb R}\int_{\mathbb R^3}\prod_{i=1}^3|f_i(x+tc_i)|\,dx\,dt
    \le\sqrt2\,\gamma^{-1/2}\rho^{1/2}\prod_{i=1}^3\|f_i\|_{L^2(\mathbb R^3)}.
    \tag{5.5}
    $$

??? proof "Proof"

    By density of bandlimited Schwartz functions in the subspace of $L^2$ with Fourier support in $\{|\xi\cdot n|\le\rho\}$, assume $f_1,f_2,f_3\in\mathcal S(\mathbb R^3)$. Shift to the frame of the third wave by setting $X=x+tc_3$, and expand $X$ in the basis $(b_1,b_2,n)$:

    $$
    X=ab_1+bb_2+zn,
    \qquad
    dX=|\det(b_1,b_2,n)|\,da\,db\,dz=\gamma\,da\,db\,dz.
    $$

    Define $g_i(a,b,z)=f_i(ab_1+bb_2+zn)$, so $\|g_i\|_{L^2_{a,b,z}}=\gamma^{-1/2}\|f_i\|_{L^2(\mathbb R^3)}$. Because $x+tc_1=X+tb_1$, $x+tc_2=X+tb_2$, and $x+tc_3=X$, the integral in (5.5) equals

    $$
    \gamma\int_{\mathbb R}\left(\int_{\mathbb R^3}|g_1(a+t,b,z)|\,|g_2(a,b+t,z)|\,|g_3(a,b,z)|\,da\,db\,dt\right)dz.
    $$

    For each fixed $z\in\mathbb R$, substitute $a=-y_1$, $b=-y_2$, $t=y_1+y_2+y_3$, which has Jacobian determinant $1$. The three factors become

    $$
    |g_1(y_2+y_3,-y_2,z)|,\qquad |g_2(-y_1,y_1+y_3,z)|,\qquad |g_3(-y_1,-y_2,z)|.
    $$

    The $i$th factor depends only on $\pi_i(y_1,y_2,y_3)$, and each two-variable map $(y_2,y_3)\mapsto(y_2+y_3,-y_2)$, $(y_1,y_3)\mapsto(-y_1,y_1+y_3)$, $(y_1,y_2)\mapsto(-y_1,-y_2)$ has unit Jacobian determinant. Applying the three-dimensional Loomis–Whitney inequality (Lemma 10.1) to the squared functions $|g_i|^2$ therefore gives

    $$
    \int_{\mathbb R^3}|g_1(a+t,b,z)|\,|g_2(a,b+t,z)|\,|g_3(a,b,z)|\,da\,db\,dt
    \le\prod_{i=1}^3\|g_i(\cdot,\cdot,z)\|_{L^2_{a,b}}.
    $$

    It remains to integrate over $z$. Since $b_1\perp n$ and $b_2\perp n$ with $|n|=1$, the partial Fourier transform of $g_1(a,b,z)$ in $z$ is supported in $[-\rho,\rho]$ for every $(a,b)$. One-dimensional Fourier inversion and Cauchy–Schwarz in the $z$-frequency variable $\zeta$, followed by Fubini, give

    $$
    \sup_{z\in\mathbb R}\|g_1(\cdot,\cdot,z)\|_{L^2_{a,b}}^2
    \le\int_{\mathbb R^2}\left(\int_{-\rho}^\rho|\widetilde g_1(a,b,\zeta)|\,d\zeta\right)^2da\,db
    \le2\rho\,\|g_1\|_{L^2_{a,b,z}}^2.
    $$

    Pulling out $\sup_z\|g_1(\cdot,\cdot,z)\|_{L^2_{a,b}}\le\sqrt2\rho^{1/2}\|g_1\|_{L^2_{a,b,z}}$ and applying Cauchy–Schwarz in $z$ to $\|g_2(\cdot,\cdot,z)\|_{L^2_{a,b}}\|g_3(\cdot,\cdot,z)\|_{L^2_{a,b}}$ bounds the full integral by

    $$
    \gamma\cdot\sqrt2\rho^{1/2}\prod_{i=1}^3\|g_i\|_{L^2_{a,b,z}}
    =\sqrt2\,\gamma^{-1/2}\rho^{1/2}\prod_{i=1}^3\|f_i\|_{L^2(\mathbb R^3)}.
    $$

!!! corollary "Corollary 10.13. Global-in-time L² bound for the mixed transport source"

    Assume $\gamma=\sqrt{(v^1v^2)^2+(v^1v^3)^2+(v^2v^3)^2}>0$, $f_1,f_2\in L^2(\mathbb R^3)$, and $\operatorname{supp}\widehat f_1\subset\{|\xi\cdot n|\le\rho\}$. Then the solution $w$ of (5.3) satisfies

    $$
    \sup_{t\in\mathbb R}\|w(t)\|_{L^2(\mathbb R^3)}\le\sqrt2\,\gamma^{-1/2}\rho^{1/2}\|f_1\|_{L^2(\mathbb R^3)}\|f_2\|_{L^2(\mathbb R^3)}.
    \tag{5.6}
    $$

??? proof "Proof"

    Combine (5.4) (extended to all $t\in\mathbb R$ by orienting the Duhamel integral) with Proposition 10.12 applied to $f_3=\widetilde h$, noting that Proposition 10.12 places no frequency condition on $f_3$. Taking the supremum over $\|h\|_{L^2}=1$ gives (5.6).

Three distinct velocity vectors in $\mathbb R^3$ span only a two-dimensional plane of relative motion $\operatorname{span}(b_1,b_2)$; the coordinate $z=x\cdot n$ perpendicular to that plane experiences *no* relative drift. That is why a one-dimensional frequency bound $|\xi\cdot n|\le\rho$ in direction $n$ is both needed and sufficient (see Exercise 2).

## 6. Repeated factors and geometric versus algebraic null structure { #repeated-source }

Replace the mixed product $q^1q^2$ by the repeated factor $(q^1)^2$:

$$
(\partial_t-v^3\partial_{x_3})w=(q^1)^2,
\qquad w(0,x)=0.
\tag{6.1}
$$

Here $c_1=c_2=v^1e_1$, so $b_1=b_2=v^1e_1-v^3e_3$ and $\gamma=|b_1\times b_2|=0$: Proposition 10.12 breaks down completely because a profile has no relative velocity with itself. Under the isotropic Fourier cutoff $\operatorname{supp}\widehat f_1\subset B(0,\rho)$, Duhamel and Bernstein give the finite-time upper bound

$$
\|w(t)\|_{L^2}\le\int_0^t\|(q^1(s))^2\|_{L^2}\,ds
=\int_0^t\|q^1(s)\|_{L^4}^2\,ds
\le\int_0^t\|q^1(s)\|_{L^\infty}\|q^1(s)\|_{L^2}\,ds
\lesssim|t|\,\rho^{3/2}\|f_1\|_{L^2}^2
\tag{6.2}
$$

(hence $\lesssim|t|\rho^2\|f_1\|_2^2$ when $\rho\ge1$).

Whether $\|w(t)\|_{L^2}$ grows like $t$ or $t^{1/2}$ depends on whether $c_1$ equals $c_3$, but in *neither* case can a uniform-in-time bound of the form (5.6) hold for general data:

- If $c_1=c_3$ (for instance $v^1=v^3=0$, or $(\partial_t-v^1\partial_{x_1})w=(q^1)^2$), then $S_3(t-s)\big((q^1(s))^2\big)=f_1(x+tv^1e_1)^2$ is independent of $s$, so $w(t,x)=t\,f_1(x+tv^1e_1)^2$ and $\|w(t)\|_{L^2}=|t|\,\|f_1\|_{L^4}^2$ grows *exact* linearly.
- If $b_1=v^1e_1-v^3e_3\ne0$, the source drifts across the $e_3$-characteristics along the single line $\mathbb Rb_1$, which gives $\|w(t)\|_{L^2}\simeq c_{f_1}|t|^{1/2}$ as $|t|\to\infty$ whenever $\int_{\mathbb R}f_1(y+\tau b_1)^2\,d\tau$ is not identically zero (Exercise 1).

**Two distinct meanings of null structure.** In (5.3), the scalar product $q^1q^2$ stays bounded in $L^2$ only because $q^1$ and $q^2$ are assumed to obey *different* transport equations with linearly independent relative velocities $b_1,b_2$. That is a kinematic separation hypothesis on the inputs, not an algebraic property of scalar multiplication. By contrast, for vector-valued fields $q_1,q_2:\mathbb R^{1+3}\to\mathbb R^m$, the antisymmetric tensor

$$
q_1\otimes q_2-q_2\otimes q_1
$$

vanishes pointwise whenever $q_1=q_2$ or $q_1\parallel q_2$. In wave equations ([Chapter 12](chapter-12.md#energy-and-null-forms)), classical null forms combine both ideas: parallel waves can travel together for long times without geometric separation, and an antisymmetric derivative symbol cancels precisely those parallel self-interactions before absolute values are taken.

## 7. Exercises { #exercises }

!!! example "Exercise 1. Asymptotic L² growth for a repeated transport source"

    Let $f_1\in\mathcal S(\mathbb R^3)$ be real-valued and nonzero, and let $w$ solve (6.1) with $b_1=v^1e_1-v^3e_3\ne0$.

    (a) Complete $u_1=b_1/|b_1|$ to an orthonormal basis $(u_1,u_2,u_3)$ of $\mathbb R^3$, express $w(t,x)$ as a line integral of $f_1^2$ along $u_1$, and compute $\lim_{t\to\infty}t^{-1}\|w(t)\|_{L^2(\mathbb R^3)}^2$ explicitly in terms of $I(y_2,y_3)=\int_{\mathbb R}f_1(y_1u_1+y_2u_2+y_3u_3)^2\,dy_1$.

    (b) Deduce that $\sup_{t\ge0}\|w(t)\|_{L^2(\mathbb R^3)}=\infty$ for every nonzero real $f_1\in\mathcal S(\mathbb R^3)$, even when $\widehat f_1\in C_c^\infty(\mathbb R^3)$.

??? solution "Solution"

    (a) Since $q^1(s,x)=f_1(x+sc_1)$ and $S_3(t-s)h(x)=h(x+(t-s)c_3)$, changing to $X=x+tc_3$ (unit Jacobian) gives

    $$
    w(t,X-tc_3)=\int_0^tf_1\big(X+sb_1\big)^2\,ds.
    $$

    Write $X=y_1u_1+y_2u_2+y_3u_3$ with $u_1=b_1/|b_1|$, and set $F(y_1,y')=f_1(y_1u_1+y_2u_2+y_3u_3)^2\ge0$, $y'=(y_2,y_3)$. Substituting $\tau=s|b_1|$ (for $t>0$),

    $$
    \|w(t)\|_{L^2(\mathbb R^3)}^2
    =|b_1|^{-2}\int_{\mathbb R^2}\int_{\mathbb R}\left(\int_0^{t|b_1|}F(y_1+\tau,y')\,d\tau\right)^2dy_1\,dy'.
    $$

    Put $L=t|b_1|>0$. Changing variables $z_1=y_1+\tau_1$ and $\zeta=\tau_2-\tau_1$ in the expanded square gives

    $$
    \begin{aligned}
    \int_{\mathbb R}\left(\int_0^LF(y_1+\tau,y')\,d\tau\right)^2dy_1
    &=\int_0^L\!\!\int_0^L\left(\int_{\mathbb R}F(z_1,y')F(z_1+\tau_2-\tau_1,y')\,dz_1\right)d\tau_1\,d\tau_2\\
    &=\int_{-L}^L(L-|\zeta|)\,G(\zeta,y')\,d\zeta,
    \end{aligned}
    $$

    where $G(\zeta,y')=\int_{\mathbb R}F(z_1,y')F(z_1+\zeta,y')\,dz_1\ge0$ satisfies $\int_{\mathbb R}G(\zeta,y')\,d\zeta=I(y')^2$. Dividing by $t=L/|b_1|$, monotone or dominated convergence as $L\to\infty$ gives

    $$
    \lim_{t\to\infty}\frac1t\|w(t)\|_{L^2(\mathbb R^3)}^2
    =|b_1|^{-1}\int_{\mathbb R^2}\int_{\mathbb R}G(\zeta,y')\,d\zeta\,dy'
    =|b_1|^{-1}\int_{\mathbb R^2}I(y_2,y_3)^2\,dy_2\,dy_3.
    $$

    (b) Because $f_1$ is real and not identically zero, $f_1^2>0$ on a nonempty open set, so $I(y_2,y_3)>0$ on a nonempty open set in $\mathbb R^2$. Hence the limit in (a) is strictly positive, forcing $\|w(t)\|_{L^2}\simeq c\,t^{1/2}\to\infty$ as $t\to\infty$. Notice that a real Schwartz function with $\widehat f_1\in C_c^\infty(\mathbb R^3)$ exists (take the inverse Fourier transform of an even nonnegative bump) and still obeys this $t^{1/2}$ growth.

!!! example "Exercise 2. Necessity of the transverse slab frequency bound"

    In the setting of Proposition 10.12 with $c_i=e_i$ ($i=1,2$) and $c_3=0$, so $b_1=e_1$, $b_2=e_2$, $\gamma=1$, and $n=e_3$, construct $f_{i,\varepsilon}\in\mathcal S(\mathbb R^3)$ ($i=1,2,3$) with $\|f_{i,\varepsilon}\|_{L^2(\mathbb R^3)}=1$ such that

    $$
    \int_{\mathbb R}\int_{\mathbb R^3}\prod_{i=1}^3|f_{i,\varepsilon}(x+tc_i)|\,dx\,dt\longrightarrow\infty
    \qquad(\varepsilon\downarrow0).
    $$

??? solution "Solution"

    Choose nonzero nonnegative $\phi\in\mathcal S(\mathbb R^2)$ and $\psi\in\mathcal S(\mathbb R)$ with $\|\phi\|_{L^2(\mathbb R^2)}=\|\psi\|_{L^2(\mathbb R)}=1$, and set

    $$
    f_{i,\varepsilon}(x_1,x_2,x_3)=\varepsilon^{-1/2}\phi(x_1,x_2)\psi(x_3/\varepsilon)
    \qquad(i=1,2,3).
    $$

    Then $\|f_{i,\varepsilon}\|_{L^2(\mathbb R^3)}=1$. Since $c_1=e_1,c_2=e_2,c_3=0$ have zero third component, the $x_3$-integral factors out completely:

    $$
    \int_{\mathbb R}\int_{\mathbb R^3}\prod_{i=1}^3|f_{i,\varepsilon}(x+tc_i)|\,dx\,dt
    =\left(\int_{\mathbb R}\varepsilon^{-3/2}\psi(x_3/\varepsilon)^3\,dx_3\right)
    \int_{\mathbb R}\int_{\mathbb R^2}\phi(x_1+t,x_2)\phi(x_1,x_2+t)\phi(x_1,x_2)\,dx_1\,dx_2\,dt.
    $$

    The second factor is a positive finite constant, while substituting $x_3=\varepsilon u$ makes the first factor equal to $\varepsilon^{-1/2}\int_{\mathbb R}\psi(u)^3\,du\to\infty$ as $\varepsilon\downarrow0$. Here $\widehat f_{1,\varepsilon}(\xi)=\varepsilon^{1/2}\widehat\phi(\xi_1,\xi_2)\widehat\psi(\varepsilon\xi_3)$ spreads to frequencies $|\xi_3|\simeq\varepsilon^{-1}$, matching the $\rho^{1/2}$ dependence in (5.5).

## References { #references }

1. J. Bennett, A. Carbery, and T. Tao, *On the multilinear restriction and Kakeya conjectures*, Acta Mathematica **196** (2006), 261–302. [arXiv:math/0509262](https://arxiv.org/abs/math/0509262).
2. C. Demeter, *Fourier Restriction, Decoupling, and Applications*, Cambridge Studies in Advanced Mathematics **184**, Cambridge University Press, 2020; and A. Carbery and S. I. Valdimarsson, *The endpoint multilinear Kakeya theorem via the Borsuk–Ulam theorem*, Journal of Functional Analysis **264** (2013), 1643–1663. [arXiv:1205.6371](https://arxiv.org/abs/1205.6371).
3. L. Guth, *The endpoint case of the Bennett–Carbery–Tao multilinear Kakeya conjecture*, Acta Mathematica **205** (2010), 263–286. [arXiv:0811.2251](https://arxiv.org/abs/0811.2251).
4. L. Guth, *A short proof of the multilinear Kakeya inequality*, Mathematical Proceedings of the Cambridge Philosophical Society **158** (2015), 147–153. [arXiv:1407.4917](https://arxiv.org/abs/1407.4917).

[Previous: analytic tubes and overlap estimates](chapter-09.md) · [Next: criticality, planar interactions, and incompressibility](chapter-11.md)
