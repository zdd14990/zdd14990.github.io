---
title: "Chapter 9: Vortex Stretching, Analytic Tubes, and Overlap Estimates"
date: 2026-10-27
description: Refined frequency boxes, spatial packets, multilinear Kakeya, a Fourier overlap estimate for vortex stretching, and its comparison with viscous dissipation.
hide:
  - navigation
categories:
  - 分析
  - Hyperbolic PDEs
tags:
  - hyperbolic-pde
  - harmonic-analysis
  - course
  - navier-stokes
---

# Chapter 9: Vortex Stretching, Analytic Tubes, and Overlap Estimates { #chapter-09 }

This chapter studies the vortex-stretching term in the enstrophy identity for three-dimensional Navier–Stokes: resolve a frequency shell into angular sectors and thinner boxes, identify the dual spatial tubes, estimate how differently oriented pieces interact, and compare with viscous dissipation. Elementary estimates are proved; the endpoint multilinear Kakeya theorem is cited, and its weighted and decaying versions are derived. A single-interaction estimate is never treated as a bound for the whole evolution without stating the extra assumptions.

## 1. The vorticity equation and the enstrophy identity { #vorticity }

The setting is that of [Chapter 8](chapter-08.md), to which we refer for the derivations; we record only what is used. We work on $\mathbb R^3$ with smooth fields having enough decay to justify integration by parts, $\Delta=\sum_i\partial_i^2$, and viscosity $\nu>0$. The system

$$
\partial_tu+u\cdot\nabla u=-\nabla p+\nu\Delta u,\qquad\nabla\cdot u=0,\qquad u(0)=u_0,
$$

implies, for $\omega=\nabla\times u$, that $\nabla\cdot\omega=0$ and

$$
\partial_t\omega+u\cdot\nabla\omega=\omega\cdot\nabla u+\nu\Delta\omega.
$$

In this chapter we use the Fourier convention

$$
\widehat f(\xi)=\int_{\mathbb R^3}e^{-2\pi ix\cdot\xi}f(x)\,dx,
$$

which differs from that of [Chapter 5](chapter-05.md) by the $2\pi$ in the exponent. Then $\|\widehat f\|_{L^2}=\|f\|_{L^2}$, $\widehat{fg}=\widehat f*\widehat g$, and $\widehat{\partial_jf}=2\pi i\xi_j\widehat f$, with no further normalization constants.

Since $\nabla\times\omega=\nabla(\nabla\cdot u)-\Delta u=-\Delta u$,

$$
u=(-\Delta)^{-1}(\nabla\times\omega),\qquad
\nabla u=\nabla(-\Delta)^{-1}(\nabla\times\omega)=:\mathcal R\omega,
$$

with $(\nabla u)_{ij}=\partial_ju_i$. The entries of $\mathcal R$ are sums of second-order Riesz transforms; the matrix symbol is smooth away from the origin and homogeneous of degree zero. Calderón–Zygmund theory gives

$$
\|\mathcal R\omega\|_{L^p}\le C_p\|\omega\|_{L^p},\qquad1<p<\infty,
$$

with a constant depending on $p$. In $L^2$ there is an exact identity: $\xi\cdot\widehat u=0$ and the Lagrange identity (applied to the real and imaginary parts of $\widehat u$) give $|\xi\times\widehat u|^2=|\xi|^2|\widehat u|^2$, hence

$$
\|\nabla u\|_{L^2}=\|\omega\|_{L^2},\qquad\|D^2u\|_{L^2}=\|\nabla\omega\|_{L^2}.
\tag{1.1}
$$

!!! remark "Remark. Sign convention"

    With the dissipative Laplacian $\Delta=\sum_i\partial_i^2$, velocity recovery reads $u=(-\Delta)^{-1}\operatorname{curl}\omega$; writing $\Delta^{-1}\operatorname{curl}\omega$ drops a sign. Absolute-value bounds are unaffected.

Taking the $L^2$ pairing with $\omega$, the transport term vanishes because $\int(u\cdot\nabla\omega)\cdot\omega=\frac12\int u\cdot\nabla|\omega|^2=0$, and diffusion contributes $-\nu\|\nabla\omega\|_{L^2}^2$. This yields the exact enstrophy identity

$$
\frac12\frac{d}{dt}\|\omega\|_{L^2}^2+\nu\|\nabla\omega\|_{L^2}^2
=\int_{\mathbb R^3}\sum_{i,j=1}^3\omega_i\omega_j\partial_ju_i\,dx
=T(\omega,\omega,\mathcal R\omega),
\tag{1.2}
$$

where for vector fields $f,g$ and a matrix field $A$,

$$
T(f,g,A)=\int_{\mathbb R^3}\sum_{i,j=1}^3f_ig_jA_{ij}\,dx,\qquad
|T(f,g,A)|\le\int|f|\,|g|\,|A|\,dx\le\big\||f|\,|g|\big\|_{L^2}\|A\|_{L^2},
$$

with $|A|$ the Frobenius norm. The factor $\frac12$ in (1.2) matters in an identity, though fixed constants are harmless in estimates. Transport redistributes enstrophy without producing it; stretching can create it; viscosity removes it at rate $\nu\|\nabla\omega\|_{L^2}^2$. The purpose of the geometric estimates below is to control the production term by this removal term.

## 2. Angular localization and refined frequency boxes { #frequency-boxes }

**Angular sectors.** Fix a dyadic shell $|\xi|\simeq2^j$ and $0<\delta\le\delta_0$, with $\delta_0$ a small absolute constant. Let $e\in\mathbb S^2$ label the centers of a smooth angular partition of unity $\sum_e\varphi_e(n)=1$ on $\mathbb S^2$, with bounded overlap and

$$
\operatorname{supp}\varphi_e\Big(\frac{\xi}{|\xi|}\Big)\subset\Big\{\Big|\frac{\xi}{|\xi|}-e\Big|\lesssim\delta\Big\}.
$$

There are $O(\delta^{-2})$ caps, since the sphere has area of order one and each cap has area of order $\delta^2$. Let $\psi$ be a smooth radial dyadic cutoff with $\sum_{j\in\mathbb Z}\psi(2^{-j}|\xi|)=1$ for $\xi\ne0$, supported where $1/2\le2^{-j}|\xi|\le2$. On the support of the coarse sector multiplier $\psi(2^{-j}|\xi|)\varphi_e(\xi/|\xi|)$, write $\xi_\parallel=\xi\cdot e$ and $\xi_\perp=\xi-(\xi\cdot e)e$. Then $|\xi_\parallel|\lesssim2^j$ and $|\xi_\perp|\lesssim2^j\delta$, so the coarse sector fits in a box of dimensions $2^j\times2^j\delta\times2^j\delta$: a plate, longer radially than in the two transverse directions.

**Radial refinement.** Subdivide the radial direction into intervals of width $2^j\delta^2$. Set

$$
h=2^j\delta^2,\qquad a=2^j\delta,\qquad0<h\le a,
$$

so $h$ is the short frequency dimension. Let $\phi\in C_c^\infty(\mathbb R)$ be nonnegative with $\sum_{m\in\mathbb Z}\phi(s-m)=1$, and define

$$
\chi_{j,e,m}(\xi)=\psi(2^{-j}|\xi|)\,\varphi_e\Big(\frac{\xi}{|\xi|}\Big)\,\phi\Big(\frac{\xi\cdot e}{2^j\delta^2}-m\Big),
\qquad\widehat{P_qf}=\chi_q\widehat f,\quad q=(j,e,m).
$$

Each piece lives in a box of dimensions

$$
2^j\delta^2\times2^j\delta\times2^j\delta=h\times a\times a,
\qquad\text{volume } ha^2=2^{3j}\delta^4.
\tag{2.1}
$$

There are $O(\delta^{-2})$ radial indices per sector, hence $O(\delta^{-4})$ boxes per shell, with bounded overlap. This growth matters when sums are taken: $\delta$ is a decomposition parameter, not a free improvement for the whole field. Resolving the radial uncertainty down to $2^j\delta^2$ makes the dual spatial piece long in direction $e$: a tube rather than a flat plate.

**Two transverse polarizations.** Complete $e$ to an orthonormal frame $(e,a_e,b_e)$ and write $n=\xi/|\xi|$. Since $a_e\cdot e=0$, on the cap $|a_e\cdot n|=|a_e\cdot(n-e)|\lesssim\delta$, so the denominator below stays away from zero:

$$
p_{e_1}(n)=\frac{a_e-(a_e\cdot n)n}{\sqrt{1-(a_e\cdot n)^2}},\qquad p_{e_2}(n)=n\times p_{e_1}(n).
$$

Direct calculation gives $|p_{e_1}|^2=\big(1-2(a_e\cdot n)^2+(a_e\cdot n)^2\big)/(1-(a_e\cdot n)^2)=1$ and $n\cdot p_{e_1}=0$; then $p_{e_2}$ is a unit vector orthogonal to both. So $(n,p_{e_1},p_{e_2})$ is an orthonormal frame. The Fourier form of $\nabla\cdot\omega=0$ is $\xi\cdot\widehat\omega(\xi)=0$, so on the cap

$$
\widehat\omega=(\widehat\omega\cdot p_{e_1})p_{e_1}+(\widehat\omega\cdot p_{e_2})p_{e_2},
\qquad|\widehat\omega|^2=|\widehat\omega\cdot p_{e_1}|^2+|\widehat\omega\cdot p_{e_2}|^2.
$$

The coefficients may be complex; the frame is real. The construction is performed cap by cap, with no global smooth frame on the sphere. The index $I\in\{1,2\}$ labels the polarizations $p_{e_I}$, which span the plane $\xi^\perp$ forced by incompressibility; $e$ instead gives the direction of the spatial tube.

## 3. From a multiplier kernel to spatial packets { #packets }

The statement "the pieces decay rapidly away from tubes" has two steps behind it: a kernel estimate, and a decomposition into translated packets. They should not be conflated.

**The anisotropic kernel.** For one box $q$ with center $\xi_q$, define the linear map

$$
B_q(\eta_1,\eta_2,\eta_3)=h\eta_1e+a\eta_2a_e+a\eta_3b_e,\qquad|\det B_q|=ha^2.
$$

The rescaled multiplier $b_q(\eta)=\chi_q(\xi_q+B_q\eta)$ is supported in a fixed box and has derivatives of every fixed order bounded uniformly in $j,e,m,\delta$ (fixed changes in box dimensions are absorbed in constants). Indeed, differentiating the radial slicing factor in direction $e$ costs $h^{-1}$, and differentiating the angular cap in a transverse direction costs $a^{-1}$; the shell cutoff costs $2^{-j}\le a^{-1}$, and an $e$-derivative of the cap costs $a^{-1}\le h^{-1}$. After multiplying by the factors $h$ or $a$ from the chain rule, all bounds are uniform. The polarization factors $p_{e_I}$ behave the same way, since their denominator stays away from zero.

Let $K_q=\mathcal F^{-1}\chi_q$. The substitution $\xi=\xi_q+B_q\eta$ gives

$$
K_q(x)=ha^2e^{2\pi ix\cdot\xi_q}\int e^{2\pi i(B_q^Tx)\cdot\eta}b_q(\eta)\,d\eta.
$$

Since $(1-\Delta_\eta)^Le^{2\pi iy\cdot\eta}=(1+4\pi^2|y|^2)^Le^{2\pi iy\cdot\eta}$, integration by parts gives

$$
(1+4\pi^2|B_q^Tx|^2)^L\left|\int e^{2\pi i(B_q^Tx)\cdot\eta}b_q(\eta)\,d\eta\right|\le\|(1-\Delta_\eta)^Lb_q\|_{L^1},
$$

and the right side is uniformly bounded. Writing $x_\parallel=x\cdot e$ and $x_\perp=x-(x\cdot e)e$, we have $|B_q^Tx|\simeq h|x_\parallel|+a|x_\perp|$. Taking $2L\ge M$ proves, for every $M\ge0$,

$$
|K_q(x)|\le C_M2^{3j}\delta^4\big(1+2^j\delta^2|x_\parallel|+2^j\delta|x_\perp|\big)^{-M}.
\tag{3.1}
$$

Changing variables $y=B_q^Tx$ also gives $\|K_q\|_{L^1}\le C$. The significant spatial region has dimensions

$$
h^{-1}\times a^{-1}\times a^{-1}=2^{-j}\delta^{-2}\times2^{-j}\delta^{-1}\times2^{-j}\delta^{-1},
\tag{3.2}
$$

with length-to-width ratio $\delta^{-1}$: the thin radial direction in frequency becomes the long direction in physical space.

!!! remark "Remark. Cutoff versus packet"

    Multiplication by a frequency cutoff produces $K_q*f$, which is not supported near one fixed spatial tube; translating $f$ translates $K_q*f$. The kernel estimate is correct, but translated packets must be introduced before one spatial tube can be attached to each piece. The Fourier cutoff $P_q$ and an individual packet operator are different operators.

**A complete packet construction in one box.** Let $f_q\in L^2$ have Fourier support in $\xi_q+B_q[-1,1]^3$, and put

$$
F_q(\eta)=|\det B_q|^{1/2}\widehat f_q(\xi_q+B_q\eta),\qquad Q=[-\pi,\pi]^3,
$$

extended by zero inside $Q$. Changing variables, $\|F_q\|_{L^2(Q)}^2=\|f_q\|_{L^2(\mathbb R^3)}^2$. The functions $(2\pi)^{-3/2}e^{-ik\cdot\eta}$, $k\in\mathbb Z^3$, form an orthonormal basis of $L^2(Q)$, so

$$
F_q(\eta)=\sum_{k\in\mathbb Z^3}c_{q,k}(2\pi)^{-3/2}e^{-ik\cdot\eta},\qquad
\sum_k|c_{q,k}|^2=\|f_q\|_{L^2}^2.
\tag{3.3}
$$

No periodicity of the original function is required: this expands its rescaled Fourier transform on a bounded cube, and boundary values do not matter in $L^2$. Choose $\rho\in C_c^\infty((-\pi,\pi)^3)$ equal to one on $[-1,1]^3$. Since $\rho F_q=F_q$, multiplying (3.3) by $\rho$ (a bounded operation on $L^2(Q)$) and transforming back gives

$$
f_q=\sum_{k\in\mathbb Z^3}c_{q,k}\phi_{q,k}\quad\text{in }L^2,\qquad
\widehat{\phi_{q,k}}(\xi)=\frac{\rho(B_q^{-1}(\xi-\xi_q))}{(2\pi)^{3/2}|\det B_q|^{1/2}}e^{-ik\cdot B_q^{-1}(\xi-\xi_q)}.
\tag{3.4}
$$

All packets have Fourier support in a fixed enlargement of the box; choosing the initial box with a fixed margin keeps this enlargement in the same shell and cap up to constants. With $x_{q,k}=\frac1{2\pi}B_q^{-T}k$, substituting $\xi=\xi_q+B_q\eta$ in the inversion integral and using $B_q\eta\cdot x=\eta\cdot B_q^Tx$ gives

$$
\phi_{q,k}(x)=(2\pi)^{-3/2}|\det B_q|^{1/2}e^{2\pi i\xi_q\cdot x}\,\check\rho\big(B_q^T(x-x_{q,k})\big),
$$

and the rapid decay of $\check\rho$ yields

$$
|\phi_{q,k}(x)|\le C_M(ha^2)^{1/2}\big(1+h|(x-x_{q,k})_\parallel|+a|(x-x_{q,k})_\perp|\big)^{-M}.
\tag{3.5}
$$

Each $\phi_{q,k}$ has $\|\phi_{q,k}\|_{L^2}=(2\pi)^{-3/2}\|\rho\|_{L^2}$, a fixed constant. Its significant region is a translated tube $T_{q,k}$ centered at $x_{q,k}$ with dimensions (3.2); the amplitude $(ha^2)^{1/2}$ is the inverse square root of the tube volume, as $L^2$ normalization requires.

**Reconstruction and divergence-free packets.** Apply the construction to $\widehat f_q=\chi_q\widehat f$. By bounded overlap and Plancherel,

$$
\sum_{q,k}|c_{q,k}|^2=\sum_q\|f_q\|_{L^2}^2\le C\|f\|_{L^2}^2,
\tag{3.6}
$$

and $f=\sum_qf_q$ in $L^2$ by the partition of unity, interpreted through finite partial sums and limits. For $\omega$, first split the two polarizations: expand the scalar coefficient $\chi_q(\widehat\omega\cdot p_{e_I})$ and multiply the packet transform in (3.4) by $p_{e_I}(\xi/|\xi|)$. Then $\xi\cdot\widehat{\phi_{q,k,I}}=0$ exactly, and smoothness of the polarization multiplier preserves (3.5) and (3.6). This gives a literal meaning to the shorthand

$$
\omega_I=\sum_{T\in\Pi}P_T\omega_I,\qquad P_T\omega_I=c_T\phi_T,
$$

where $T$ includes the box, polarization and translation indices. $P_T$ is a coefficient-and-synthesis operator; it need not be an orthogonal projection or a Fourier multiplier. In particular one should not assume $P_T\mathcal R=\mathcal RP_T$. One may decompose $\mathcal R\omega$ directly or apply $\mathcal R$ to each vorticity packet; both are legitimate and different constructions. A localized degree-zero multiplier has the same rescaled symbol bounds and preserves the packet envelope up to constants.

!!! remark "Remark. Schwartz, not compactly supported"

    It is tempting to say $P_T\omega\in C_c^\infty(\mathbb R^3)$. A nonzero function cannot have compact support in both space and frequency: the inverse Fourier transform of a compactly supported function extends to an entire function on $\mathbb C^3$, so vanishing on an open set forces it to vanish identically. The correct class is $\mathcal S(\mathbb R^3)\subset C^\infty$, and the localization is the rapid decay (3.5).

A packet is an oscillatory function with a smooth envelope, not the indicator of a tube; its tail is small rather than zero. Hence amplitudes and weights must appear when a geometric tube theorem is used in a PDE estimate.

## 4. The interaction sum and multilinear Kakeya { #multilinear-kakeya }

**The interaction sum.** At the coarse level, a partition $\omega=\sum_{P\in\mathcal P}P_P\omega$ gives $T(\omega,\omega,\mathcal R\omega)=\sum_{P_i,P_j,P_k}T(P_{P_i}\omega,P_{P_j}\omega,P_{P_k}(\mathcal R\omega))$. After the tube decomposition,

$$
T(\omega,\omega,\mathcal R\omega)=\sum_{T_i\in\Pi_1,\ T_j\in\Pi_2,\ T_k\in\Pi_3}\int_{\mathbb R^3}\sum_{a,b=1}^3(P_{T_i}\omega)_a(P_{T_j}\omega)_b(P_{T_k}(\mathcal R\omega))_{ab}\,dx.
\tag{4.1}
$$

Initially one uses finite decompositions. For a smooth field, frequency truncations converge in the Sobolev norms needed to pass to the trilinear form; inside finitely many frequency boxes, $L^2$ convergence of packet sums gives convergence in higher norms by Bernstein, so the integrals converge. An absolutely convergent estimate for the unrestricted sum must be established separately; it is not supplied by the identity.

How transverse are the different tubes? For three unit directions the relevant quantity is

$$
|\det(e_1,e_2,e_3)|=|e_1\cdot(e_2\times e_3)|,
$$

the volume of the parallelepiped they span. It vanishes when they lie in one plane; pairwise nonparallel directions are not enough.

!!! theorem "Theorem 9.1. Guth's endpoint multilinear Kakeya inequality (cited)"

    Let $\Pi_1,\Pi_2,\Pi_3$ be finite families of straight, doubly infinite tubes of radius $r>0$ in $\mathbb R^3$. Suppose every choice $T_i\in\Pi_i$ has unit directions satisfying

    $$
    |\det(e(T_1),e(T_2),e(T_3))|\ge\kappa>0.
    $$

    Then

    $$
    \int_{\mathbb R^3}\prod_{i=1}^3\Big(\sum_{T\in\Pi_i}\mathbf 1_T(x)\Big)^{1/2}dx\le C\kappa^{-1/2}r^3\prod_{i=1}^3(\#\Pi_i)^{1/2}.
    \tag{4.2}
    $$

This is Theorem 1.3 of Guth [[1]](#references), specialized to dimension three and rescaled from radius one; the factor $r^3$ follows from the substitution $x=ry$. Bennett, Carbery and Tao established the preceding non-endpoint multilinear theory [[2]](#references). We use the endpoint theorem as an external result and do not prove it. Finite tubes satisfy the same inequality, because extending each to an infinite tube only increases the integrand. The hypothesis concerns *every* triple of tube directions, not merely three nominal center directions; if all directions in family $i$ are close to a fixed $e_i$, the condition follows from a positive lower bound for $|\det(e_1,e_2,e_3)|$ and sufficiently small angular deviations, by multilinearity of the determinant.

**Why square roots: the coordinate-axis case.** If the families are exactly parallel to the coordinate axes, their multiplicity functions have the form $F_1(x_2,x_3)$, $F_2(x_1,x_3)$, $F_3(x_1,x_2)$. For nonnegative integrable functions of these variables,

$$
\int_{\mathbb R^3}(F_1F_2F_3)^{1/2}dx\le\Big(\int F_1\Big)^{1/2}\Big(\int F_2\Big)^{1/2}\Big(\int F_3\Big)^{1/2},
\tag{4.3}
$$

with two-dimensional integrals on the right. Indeed, Cauchy–Schwarz in $x_1$ gives

$$
\int\sqrt{F_2(x_1,x_3)F_3(x_1,x_2)}\,dx_1\le A(x_3)^{1/2}B(x_2)^{1/2},\qquad A=\int F_2\,dx_1,\ B=\int F_3\,dx_1.
$$

Cauchy–Schwarz in $(x_2,x_3)$ applied to $F_1^{1/2}(AB)^{1/2}$ then gives $\big(\int F_1\big)^{1/2}\big(\int AB\big)^{1/2}$, and $\int A(x_3)B(x_2)\,dx_2\,dx_3=\int A\int B$. For tubes, $\int F_i=\pi r^2\#\Pi_i$, which produces $r^3$ and $(\#\Pi_i)^{1/2}$. Guth's theorem controls the geometric difficulty when directions vary.

**Weights.** For nonnegative weights $w_T$, the theorem gives

$$
\int\prod_{i=1}^3\Big(\sum_{T\in\Pi_i}w_T\mathbf 1_T\Big)^{1/2}\le C\kappa^{-1/2}r^3\prod_{i=1}^3\Big(\sum_{T\in\Pi_i}w_T\Big)^{1/2}.
\tag{4.4}
$$

For integer weights, repeat each tube $w_T$ times. For rational weights, multiply all weights in all three families by a common denominator $N$, apply the integer case, and cancel the factor $N^{3/2}$ appearing on both sides. Approximate real weights from below by rationals and pass to the limit by monotone convergence; monotone convergence also extends (4.4) to countable families with summable weights.

**Decaying tails.** Let $L_T$ be the axis line of $T$ and

$$
W_T(x)=\Big(1+\frac{\operatorname{dist}(x,L_T)}r\Big)^{-M},\qquad M>2.
$$

If $2^{\ell-1}r<\operatorname{dist}(x,L_T)\le2^\ell r$ with $\ell\ge1$, then $W_T(x)\le(1+2^{\ell-1})^{-M}\le2^M2^{-M\ell}$, so

$$
W_T(x)\le C_M\sum_{\ell\ge0}2^{-M\ell}\mathbf 1_{\{\operatorname{dist}(x,L_T)\le2^\ell r\}}.
$$

Cover the tube of radius $2^\ell r$ about $L_T$ by at most $C2^{2\ell}$ parallel tubes of radius $r$ (cover a disk of radius $2^\ell r$ by disks of radius $r$). These have the same directions, so the determinant hypothesis persists. Insert the bound into each factor and use $\sqrt{\sum_\ell a_\ell}\le\sum_\ell\sqrt{a_\ell}$; expanding the three sums, the term with indices $\ell_1,\ell_2,\ell_3$ is controlled by (4.4) applied to the enlarged families, whose total weights are at most $C2^{2\ell_i}\sum_Tw_T$. After square roots this contributes $C2^{\ell_1+\ell_2+\ell_3}$, against the decay $2^{-M(\ell_1+\ell_2+\ell_3)/2}$. The resulting factor

$$
\prod_{i=1}^3\sum_{\ell_i\ge0}2^{-(M/2-1)\ell_i}
$$

converges since $M>2$. Thus (4.4) holds with $W_T$ in place of $\mathbf 1_T$, with no change in the powers of $r$ or $\kappa$.

**Application to packets.** For packets at a common scale $j,\delta$ obeying (3.5), take $r=a^{-1}$ and $w_T=|c_T|^2$; dropping the longitudinal decay only enlarges the envelope, and gives $|c_T\phi_T|\le C(ha^2)^{1/2}|c_T|W_T$ with $\operatorname{dist}(x,L_T)=|(x-x_T)_\perp|$. The theorem therefore controls the nonnegative quantities

$$
G_i(x)=\Big(\sum_{T\in\Pi_i}|c_T|^2W_T(x)\Big)^{1/2},\qquad
\int G_1G_2G_3\lesssim\kappa^{-1/2}a^{-3}\prod_{i=1}^3\Big(\sum_{T\in\Pi_i}|c_T|^2\Big)^{1/2}.
$$

Multiplying by the three normalization factors $(ha^2)^{1/2}$ gives the scale

$$
\kappa^{-1/2}(ha^2)^{3/2}a^{-3}=\kappa^{-1/2}h^{3/2}.
\tag{4.5}
$$

!!! warning "What this does and does not bound"

    This is a bound for products of square-sum envelopes. A deterministic packet sum $|\sum_Tc_T\phi_T|$ is not in general bounded by its square-sum envelope with a universal constant: overlapping packets can add coherently. To use the estimate for (4.1), an orthogonality, multiplicity, or other summation argument must also be proved. The distinction between $P_T\omega$ and $\mathbf 1_T$ is essential here.

## 5. A direct Fourier overlap estimate { #fourier-overlap }

The next estimate is elementary and bilinear: it uses two Fourier supports and Cauchy–Schwarz. It is distinct from the three-family spatial Kakeya theorem.

!!! lemma "Lemma 9.2. Overlap controls a product"

    Let $f_1,f_2\in L^2(\mathbb R^3)$ have Fourier supports in bounded measurable sets $\Omega_1,\Omega_2$. If

    $$
    \sup_{\eta\in\mathbb R^3}|\Omega_1\cap(\eta-\Omega_2)|\le V,
    $$

    then

    $$
    \|f_1f_2\|_{L^2}\le V^{1/2}\|f_1\|_{L^2}\|f_2\|_{L^2}.
    \tag{5.1}
    $$

??? proof "Proof"

    For a fixed output frequency $\eta$, both factors of $\widehat f_1(\xi)\widehat f_2(\eta-\xi)$ can be nonzero only when $\xi\in\Omega_1$ and $\eta-\xi\in\Omega_2$, that is, $\xi\in\Omega_1\cap(\eta-\Omega_2)$. Cauchy–Schwarz on this set gives

    $$
    |(\widehat f_1*\widehat f_2)(\eta)|^2=\left|\int_{\Omega_1\cap(\eta-\Omega_2)}\widehat f_1(\xi)\widehat f_2(\eta-\xi)\,d\xi\right|^2
    \le|\Omega_1\cap(\eta-\Omega_2)|\int_{\mathbb R^3}|\widehat f_1(\xi)|^2|\widehat f_2(\eta-\xi)|^2\,d\xi.
    $$

    Integrate in $\eta$ and use Tonelli's theorem for the nonnegative integrand:

    $$
    \|\widehat f_1*\widehat f_2\|_{L^2}^2\le V\int_{\mathbb R^3}|\widehat f_1(\xi)|^2\Big(\int_{\mathbb R^3}|\widehat f_2(\eta-\xi)|^2\,d\eta\Big)d\xi=V\|\widehat f_1\|_{L^2}^2\|\widehat f_2\|_{L^2}^2.
    $$

    The substitution $\zeta=\eta-\xi$ makes the inner integral independent of $\xi$. Plancherel and $\widehat{f_1f_2}=\widehat f_1*\widehat f_2$ finish the proof. Since $\widehat f_i\in L^2$ has bounded support, it lies in $L^1$, so $f_i$ is bounded and continuous and all products and convolutions are legitimate.

For a fixed output frequency, the intersection measures how many input frequencies can pair to produce it; transverse supports allow fewer pairs, and the square root is the Cauchy–Schwarz factor from the volume of admissible pairs.

**The intersection volume and the angle factor.** Assume $0<h\le a$, let $\Omega_1,\Omega_2$ be translates of rectangular boxes of dimensions $h\times a\times a$, and let $v_i$ be the unit direction of the side of length $h$ of $\Omega_i$, equivalently the normal to its broad face. Assume

$$
|v_1\times v_2|\ge\theta>0.
$$

Since $\eta-\Omega_2$ is again a box congruent to $\Omega_2$, regardless of translation

$$
|\Omega_1\cap(\eta-\Omega_2)|\le|\Omega_1|\lesssim ha^2.
\tag{5.2}
$$

For the transverse bound, set $w=(v_1\times v_2)/|v_1\times v_2|$ and use the coordinates $\xi\mapsto(s_1,s_2,s_3)=(\xi\cdot v_1,\xi\cdot v_2,\xi\cdot w)$, whose Jacobian determinant has absolute value $|\det(v_1,v_2,w)|=|v_1\times v_2|$. On the intersection, $s_1$ ranges over an interval of length $h$ (thickness of $\Omega_1$) and $s_2$ over one of length $h$ (thickness of $\eta-\Omega_2$). Since $w\perp v_1$, the projection of $\Omega_1$ onto $w$ has length at most $\sqrt2a$, so $s_3$ ranges over an interval of length $O(a)$. The change-of-variables formula gives

$$
|\Omega_1\cap(\eta-\Omega_2)|\lesssim\frac{h\cdot h\cdot a}{|v_1\times v_2|}\le\frac{h^2a}\theta.
\tag{5.3}
$$

The inverse cross-product factor is the inverse Jacobian, not an additional Fourier estimate. In a two-dimensional section the same calculation says that strips of width $h$ meeting at angle $\alpha$ intersect in a parallelogram of area $h^2/\sin\alpha$. As the normals become parallel the overlap grows, and the independent bound (5.2) prevents the angular estimate from exceeding the volume of one box.

!!! proposition "Proposition 9.3. Box estimate"

    Under the preceding hypotheses, if $\operatorname{supp}\widehat f_i\subset\Omega_i$, then

    $$
    \|f_1f_2\|_{L^2}\lesssim\min\Big(ha^2,\frac{h^2a}\theta\Big)^{1/2}\|f_1\|_{L^2}\|f_2\|_{L^2}.
    \tag{5.4}
    $$

??? proof "Proof"

    Combine (5.2) and (5.3), uniformly in $\eta$, and apply Lemma 9.2.

!!! remark "Remark. Which axis is $h$"

    In the application $h=2^j\delta^2<a=2^j\delta$, so $h$ is the *short* frequency axis, which becomes the *long* axis of the dual spatial tube; $v_i$ is the frequency normal, equal to the tube direction. Estimate (5.4) is stated with this meaning. If instead $h\ge a$ were the long frequency axis, the sharper transverse overlap would be $a^3/\theta$: fixing the two transverse coordinates inside the first box, the second box restricts the coordinate along $v_1$ to an interval of length $Ca/|v_1\times v_2|$, and multiplying by the cross-sectional area $Ca^2$ gives $Ca^3/\theta$. In that regime (5.4) remains a valid but weaker bound whose minimum reduces to $ha^2$, with no angular improvement.

## 6. The fixed-frequency stretching example { #stretching-example }

Fix $|\xi|\simeq2^j$ and consider one term

$$
T_{123}:=T\big(P_{T_1}\omega,P_{T_2}\omega,P_{T_3}(\mathcal R\omega)\big),
\tag{6.1}
$$

where the subscript only distinguishes this term from the full sum. Assume the Fourier supports of the first two factors lie in boxes of dimensions (2.1) with short-axis directions $e_1,e_2$ satisfying $|e_1\times e_2|\ge\theta$, and the third factor is in $L^2$. Applying the bound for $T$ from Section 1, then Proposition 9.3 to each product of components $(P_{T_1}\omega)_a(P_{T_2}\omega)_b$ (each component has the same Fourier support as the vector), gives

$$
|T_{123}|\le\big\||P_{T_1}\omega|\,|P_{T_2}\omega|\big\|_{L^2}\|P_{T_3}(\mathcal R\omega)\|_{L^2}
\lesssim\min\Big(ha^2,\frac{h^2a}\theta\Big)^{1/2}\|P_{T_1}\omega\|_{L^2}\|P_{T_2}\omega\|_{L^2}\|P_{T_3}(\mathcal R\omega)\|_{L^2}.
$$

For smooth bounded Fourier cutoffs the operators are uniformly bounded on $L^2$; for the individual packet operators of Section 3 the same follows from Cauchy–Schwarz on coefficients and the bounded $L^2$ norm of each atom. Hence, by Calderón–Zygmund (or (1.1)), $\|P_{T_3}(\mathcal R\omega)\|_{L^2}\lesssim\|\mathcal R\omega\|_{L^2}\lesssim\|\omega\|_{L^2}$, and similarly for the first two factors. Substituting $h=2^j\delta^2$, $a=2^j\delta$,

$$
ha^2=2^{3j}\delta^4,\qquad\frac{h^2a}\theta=\frac{(2^j\delta^2)^2(2^j\delta)}\theta=\frac{2^{3j}\delta^5}\theta,
$$

so

$$
|T_{123}|\lesssim\min\Big(2^{3j}\delta^4,\frac{2^{3j}\delta^5}\theta\Big)^{1/2}\|\omega\|_{L^2}^3.
\tag{6.2}
$$

Equivalently, the coefficient is

$$
2^{3j/2}\min\big(\delta^2,\delta^{5/2}\theta^{-1/2}\big)=2^{3j/2}\delta^2\min\Big(1,\sqrt{\delta/\theta}\Big).
\tag{6.3}
$$

There is a genuine angular gain when $\theta>\delta$; when $\theta\le\delta$ the volume bound is better, and the minimum handles the nearly parallel case automatically. At fixed $L^2$ size, a smaller Fourier box limits the amplitude of one localized piece, and a transverse second box further limits the frequency pairs contributing to the product. The improvement concerns this interaction; estimating the whole field also requires counting the pieces and controlling how they combine.

!!! remark "Remark. Three distinctions"

    1. The $T_i$ in (6.1) label spatial packets, but the proof of (6.2) concerns their *Fourier support boxes*. Spatial dimensions are reciprocal to frequency dimensions, and a "cross product of tubes" means the cross product of their unit axis directions.
    2. Estimate (6.2) uses only two transverse directions and an $L^2$ bound for the third factor. It does not need the determinant condition of Theorem 9.1 and does not invoke it. The two arguments complement each other but are not interchangeable.
    3. The integral of three packets vanishes unless $0\in\operatorname{supp}\widehat{P_{T_1}\omega}+\operatorname{supp}\widehat{P_{T_2}\omega}+\operatorname{supp}\widehat{P_{T_3}(\mathcal R\omega)}$, since $\int fgA\,dx$ is the value at zero frequency of $\widehat f*\widehat g*\widehat A$. Contributing frequencies satisfy $\xi_1+\xi_2+\xi_3=0$ and so lie in a plane, giving $\det(\xi_1/|\xi_1|,\xi_2/|\xi_2|,\xi_3/|\xi_3|)=0$. If each cap direction $e_i$ differs from $\xi_i/|\xi_i|$ by $O(\delta)$, multilinearity of the determinant gives $|\det(e_1,e_2,e_3)|\lesssim\delta$. So a uniform three-family transversality assumption cannot simply be imposed on every resonant triple at an arbitrarily small angular scale. This does not affect the pairwise estimate; it identifies a necessary check before applying the spatial Kakeya theorem to this trilinear form.

## 7. Comparing stretching with viscous dissipation { #dissipation }

**The algebra.** For a field whose Fourier support stays in a fixed annulus $c_02^j\le|\xi|\le C_02^j$, Plancherel gives

$$
\|\nabla\omega\|_{L^2}^2=4\pi^2\int|\xi|^2|\widehat\omega(\xi)|^2\,d\xi\ge c\,2^{2j}\|\omega\|_{L^2}^2,
\qquad c=4\pi^2c_0^2.
\tag{7.1}
$$

The frequency width $2^j\delta^2$ is not the frequency magnitude: the box sits at distance of order $2^j$ from the origin, which is why diffusion supplies $2^{2j}$ with no small factor of $\delta$.

Suppose in addition that the *full* stretching term on a time interval obeys the same bound as the single term (6.2), with a fixed constant $C$. Then (1.2) yields

$$
\frac12\frac{d}{dt}\|\omega\|_{L^2}^2+c\nu2^{2j}\|\omega\|_{L^2}^2\le C2^{3j/2}\min\big(\delta^2,\delta^{5/2}\theta^{-1/2}\big)\|\omega\|_{L^2}^3.
\tag{7.2}
$$

Moving the right side to the left,

$$
\frac12\frac{d}{dt}\|\omega\|_{L^2}^2+\Big[c\nu2^{2j}-C2^{3j/2}\min\big(\delta^2,\delta^{5/2}\theta^{-1/2}\big)\|\omega\|_{L^2}\Big]\|\omega\|_{L^2}^2\le0.
\tag{7.3}
$$

The bracket is at least $\frac12c\nu2^{2j}$, so that half the dissipation is left over, provided

$$
\|\omega\|_{L^2}\le\frac{c\nu}{2C}\,\frac{2^{j/2}}{\min\big(\delta^2,\delta^{5/2}\theta^{-1/2}\big)}.
\tag{7.4}
$$

This is the absorption threshold with its exact powers of $2^j$, $\delta$ and $\theta$; the fixed small constant $c/2C$ is necessary and should not be suppressed.

!!! proposition "Proposition 9.4. Absorption under persistent hypotheses"

    Suppose a smooth finite-energy Navier–Stokes solution on $[0,T)$ satisfies both the annular support assumption of (7.1) and the full stretching bound used in (7.2), with $j,\delta,\theta,c,C$ fixed throughout that interval. If (7.4) holds at $t=0$, then

    $$
    \|\omega(t)\|_{L^2}^2\le e^{-c\nu2^{2j}t}\|\omega(0)\|_{L^2}^2\le\|\omega(0)\|_{L^2}^2,\qquad0\le t<T.
    \tag{7.5}
    $$

    If the same hypotheses hold throughout the maximal interval of a smooth solution, its maximal time is infinite.

??? proof "Proof"

    As long as (7.4) holds, (7.3) implies

    $$
    \frac{d}{dt}\|\omega\|_{L^2}^2+c\nu2^{2j}\|\omega\|_{L^2}^2\le0,
    $$

    and integration (Grönwall) gives (7.5) on that interval. Continuity prevents the norm from crossing the threshold: on any interval before a proposed first upward crossing, the norm is already nonincreasing and hence stays at or below its initial value, which is below the threshold. So the bound holds on all of $[0,T)$.

    The kinetic energy identity gives $\|u(t)\|_{L^2}\le\|u_0\|_{L^2}$, while (1.1) gives $\|\nabla u(t)\|_{L^2}=\|\omega(t)\|_{L^2}\le\|\omega(0)\|_{L^2}$. Thus $\|u(t)\|_{H^1}$ stays bounded. The standard local strong-solution theorem in $H^1(\mathbb R^3)$ has a lifespan bounded below in terms of this norm and $\nu$, so a finite maximal time could be extended, a contradiction. This local existence and continuation theorem is standard Navier–Stokes input to the final step, not a consequence of tube geometry.

!!! warning "The hypotheses are not automatic"

    A bound for one summand of (4.1) does not by itself imply (7.2) for the full solution. Nor does a fixed Fourier box or shell remain invariant under the evolution. The Fourier transform of a quadratic product is a convolution, so input supports $\Omega_1,\Omega_2$ produce output in $\Omega_1+\Omega_2$. For a real field, opposite-frequency boxes are both present and their sums can approach frequency zero; other pairs move outward to larger frequencies. Viscous evolution alone preserves each Fourier support; the quadratic term does not.

    A projected block equation also has commutator terms. For a fixed Fourier projection $P$,

    $$
    P(u\cdot\nabla\omega)=u\cdot\nabla(P\omega)+[P,u\cdot\nabla]\omega.
    $$

    Only the first term cancels against $P\omega$ in its $L^2$ energy; the commutator remains. One therefore cannot silently replace $\omega$ by a single block in the full enstrophy identity and keep only one stretching integral.

The calculation correctly compares the diffusion rate $\nu2^{2j}$ with the amplitude and angular size of one interaction; a global argument must keep that comparison valid while the equation creates frequencies, moves packets, and turns them.

## 8. Comparison with the ordinary energy estimate { #energy-comparison }

Without any geometric decomposition, Hölder and Calderón–Zygmund (or (1.1)) give

$$
|T(\omega,\omega,\mathcal R\omega)|\le\|\omega\|_{L^4}^2\|\nabla u\|_{L^2}\le C\|\omega\|_{L^4}^2\|\omega\|_{L^2}.
\tag{8.1}
$$

**Interpolation exponents in three dimensions.** Since $\frac14=\frac14\cdot\frac12+\frac34\cdot\frac16$, Hölder gives $\|\omega\|_{L^4}\le\|\omega\|_{L^2}^{1/4}\|\omega\|_{L^6}^{3/4}$, and the Sobolev inequality $\|\omega\|_{L^6}\le C\|\nabla\omega\|_{L^2}$ gives

$$
\|\omega\|_{L^4}^2\le C\|\omega\|_{L^2}^{1/2}\|\nabla\omega\|_{L^2}^{3/2}.
$$

Substitution into (8.1) yields

$$
|T(\omega,\omega,\mathcal R\omega)|\le C\|\omega\|_{L^2}^{3/2}\|\nabla\omega\|_{L^2}^{3/2}.
\tag{8.2}
$$

Young's inequality with conjugate exponents $4/3$ and $4$ gives

$$
C\|\omega\|_{L^2}^{3/2}\|\nabla\omega\|_{L^2}^{3/2}\le\frac\nu2\|\nabla\omega\|_{L^2}^2+C\nu^{-3}\|\omega\|_{L^2}^6.
$$

Hence, writing $Y(t)=\|\omega(t)\|_{L^2}^2$ for this scalar calculation only,

$$
\frac12Y'(t)+\frac\nu2\|\nabla\omega\|_{L^2}^2\le C\nu^{-3}Y(t)^3.
\tag{8.3}
$$

This is a local a priori bound, not a dissipation-absorption estimate based solely on a fixed small $\|\omega\|_{L^2}$.

!!! remark "Remark. Smallness of vorticity alone"

    One might hope to replace the stretching term by $\|\nabla\omega\|_{L^2}^2$ times a power of $\|\omega\|_{L^2}$ and conclude that $\|\omega_0\|_{L^2}\lesssim1$ suffices for global existence. In $\mathbb R^3$ the Gagliardo–Nirenberg exponents are those of (8.2), and there is no scale-independent inequality $\|\omega\|_{L^4}^2\lesssim\|\nabla\omega\|_{L^2}^2$ on all of $\mathbb R^3$ (see the [exercise](#exercise)). Such a universal small-$\|\omega\|_{L^2}$ conclusion needs additional large-scale or low-frequency control, and is recorded here as a claim being qualified, not as a theorem.

The scaling check is immediate. Under Navier–Stokes scaling $u_\lambda(t,x)=\lambda u(\lambda^2t,\lambda x)$, $\omega_\lambda(t,x)=\lambda^2\omega(\lambda^2t,\lambda x)$,

$$
\|u_{0,\lambda}\|_{L^2}=\lambda^{-1/2}\|u_0\|_{L^2},\qquad\|\omega_{0,\lambda}\|_{L^2}=\lambda^{1/2}\|\omega_0\|_{L^2}.
\tag{8.4}
$$

Every smooth finite-energy datum can thus be made arbitrarily small in vorticity $L^2$ by dilation ($\lambda\to0$), while its velocity $L^2$ norm grows. A universal smallness theorem using only the vorticity norm would not be an ordinary small-data result.

**A precise small-data statement.** The absorption idea can be completed using the kinetic energy. Put $U_0=\|u_0\|_{L^2}$. Integration by parts and (1.1) give

$$
\|\omega\|_{L^2}^2=\|\nabla u\|_{L^2}^2=-\int u\cdot\Delta u\,dx\le\|u\|_{L^2}\|\Delta u\|_{L^2}=\|u\|_{L^2}\|\nabla\omega\|_{L^2},
$$

where $\|\Delta u\|_{L^2}=\|\nabla\omega\|_{L^2}$ because $\Delta u=-\nabla\times\omega$ and $\nabla\cdot\omega=0$. The energy identity yields $\|u\|_{L^2}\le U_0$, so $\|\omega\|_{L^2}\le(U_0\|\nabla\omega\|_{L^2})^{1/2}$. Inserting this into one factor $\|\omega\|_{L^2}$ in (8.2),

$$
|T(\omega,\omega,\mathcal R\omega)|\le C\|\omega\|_{L^2}^{1/2}\cdot(U_0\|\nabla\omega\|_{L^2})^{1/2}\cdot\|\nabla\omega\|_{L^2}^{3/2}
=C\big(U_0\|\omega\|_{L^2}\big)^{1/2}\|\nabla\omega\|_{L^2}^2.
\tag{8.5}
$$

(If $\nabla\omega=0$, the finite-energy field vanishes and the inequality is trivial.) Consequently

$$
\|u_0\|_{L^2}\|\omega_0\|_{L^2}\le c\nu^2,\qquad C\sqrt c\le\frac12,
\tag{8.6}
$$

is a genuine sufficient smallness condition. Indeed, whenever $\|\omega\|_{L^2}\le\|\omega_0\|_{L^2}$, (8.5) gives $|T|\le C\sqrt c\,\nu\|\nabla\omega\|_{L^2}^2\le\frac\nu2\|\nabla\omega\|_{L^2}^2$, and (1.2) yields

$$
\frac12\frac{d}{dt}\|\omega\|_{L^2}^2+\frac\nu2\|\nabla\omega\|_{L^2}^2\le0.
$$

The continuity argument of Proposition 9.4 maintains $\|\omega(t)\|_{L^2}\le\|\omega_0\|_{L^2}$, the velocity $H^1$ norm stays bounded, and the standard continuation theorem gives a global strong solution, smooth for smooth data. Condition (8.6) is invariant under (8.4); with $U_0$ fixed and $\nu=1$ it reduces to a suitably normalized small-vorticity statement.

Vorticity measures one derivative of velocity; its size alone does not tell whether a flow has very large spatial extent, and the kinetic energy supplies the missing large-scale information. In the space of admissible divergence-free data, (8.6) describes a proven small-data region around zero. The tube calculations aim to enlarge it by exploiting further structure of the interactions, but this proposed extension is a research direction: nothing here establishes that the larger region consists of global solutions.

## 9. What has been proved, and what the evolution still requires { #status }

The kernel estimate (3.1), the packet construction (3.4)–(3.6), the Fourier overlap inequality (5.4), and the single-interaction estimate (6.2) are rigorous statements under the displayed hypotheses. The cited endpoint Kakeya theorem controls transverse families of spatial tubes, including weights and rapidly decaying envelopes as derived in Section 4. The small-data criterion (8.6) is a complete statement given the standard local theory.

The threshold (7.4) is the correct algebraic comparison at one fixed frequency scale. To obtain it for an actual Navier–Stokes solution one still needs a bound for the entire trilinear sum, including interactions outside any chosen transverse class, and a proof that the required bounds persist in time. Contributions from different dyadic scales, coherent packet sums, and low-frequency outputs cannot be discarded. The proof of the overlap estimate does not establish these further assertions.

A geometric gain in a nonlinear estimate is useful precisely when it survives reconstruction and time evolution. The calculations above identify the gain and the dissipation scale against which it must be compared.

## 10. Exercise: scaling and the smallness condition { #exercise }

!!! example "Exercise. Why vorticity smallness alone is not enough"

    (a) Show that there is no constant $C$ with $\|f\|_{L^4(\mathbb R^3)}^2\le C\|\nabla f\|_{L^2(\mathbb R^3)}^2$ for all nonzero $f\in C_c^\infty(\mathbb R^3)$.

    (b) Verify that $\|u_0\|_{L^2}\|\omega_0\|_{L^2}$ is invariant under the scaling (8.4), and explain why a smallness condition on $\|\omega_0\|_{L^2}$ alone is satisfied by a rescaling of every nonzero finite-energy datum.

??? solution "Solution"

    (a) Both sides are homogeneous of degree two under $f\mapsto Af$, so only dilations matter. For $f_\lambda(x)=f(\lambda x)$,

    $$
    \|f_\lambda\|_{L^4}^2=\Big(\lambda^{-3}\int|f|^4\Big)^{1/2}=\lambda^{-3/2}\|f\|_{L^4}^2,\qquad
    \|\nabla f_\lambda\|_{L^2}^2=\lambda^2\cdot\lambda^{-3}\|\nabla f\|_{L^2}^2=\lambda^{-1}\|\nabla f\|_{L^2}^2.
    $$

    The ratio of the left side to the right side is $\lambda^{-1/2}\|f\|_{L^4}^2/\|\nabla f\|_{L^2}^2$, which tends to infinity as $\lambda\to0$. Hence no such $C$ exists. By contrast, the interpolation inequality $\|f\|_{L^4}^2\le C\|f\|_{L^2}^{1/2}\|\nabla f\|_{L^2}^{3/2}$ behind (8.2) is consistent with scaling: since $\|f_\lambda\|_{L^2}=\lambda^{-3/2}\|f\|_{L^2}$, its right side scales like $\lambda^{-3/4}\cdot\lambda^{-3/4}=\lambda^{-3/2}$, exactly as the left side.

    (b) By (8.4), $\|u_{0,\lambda}\|_{L^2}\|\omega_{0,\lambda}\|_{L^2}=\lambda^{-1/2}\lambda^{1/2}\|u_0\|_{L^2}\|\omega_0\|_{L^2}$, so the product is invariant and (8.6) holds for all $u_{0,\lambda}$ or for none. By contrast, $\|\omega_{0,\lambda}\|_{L^2}=\lambda^{1/2}\|\omega_0\|_{L^2}$ can be made smaller than any fixed threshold by taking $\lambda$ small, while $\|u_{0,\lambda}\|_{L^2}=\lambda^{-1/2}\|u_0\|_{L^2}\to\infty$. Since $u_\lambda$ solves the Navier–Stokes system with the same $\nu$, every datum has a rescaling with $\|\omega_{0,\lambda}\|_{L^2}\le\varepsilon$; a global theorem under that condition alone would therefore cover all smooth finite-energy data. It becomes a meaningful small-data condition only once $\|u_0\|_{L^2}$ is fixed: with $U_0$ given, (8.6) reads $\|\omega_0\|_{L^2}\le c\nu^2/U_0$.

## References { #references }

1. L. Guth, *The endpoint case of the Bennett–Carbery–Tao multilinear Kakeya conjecture*, Acta Mathematica **205** (2010), 263–286, Theorem 1.3. [arXiv:0811.2251](https://arxiv.org/abs/0811.2251).
2. J. Bennett, A. Carbery, and T. Tao, *On the multilinear restriction and Kakeya conjectures*, Acta Mathematica **196** (2006), 261–302. [arXiv:math/0509262](https://arxiv.org/abs/math/0509262).

[Previous: anisotropic Littlewood–Paley theory](chapter-08.md)
