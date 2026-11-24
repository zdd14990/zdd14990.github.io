---
title: "Chapter 11: Criticality, Planar Vorticity Interactions, and Incompressibility"
date: 2026-11-10
description: Critical Sobolev scaling for Navier–Stokes, bounded-congestion packet gains, resonant coplanarity, divergence-free cancellation in aligned regimes, and projected commutator equations.
hide:
  - navigation
categories:
  - 分析
  - Hyperbolic PDEs
tags:
  - hyperbolic-pde
  - harmonic-analysis
  - navier-stokes
  - course
---

# Chapter 11: Criticality, Planar Vorticity Interactions, and Incompressibility { #chapter-11 }

This chapter completes the geometric analysis of the three-dimensional Navier–Stokes vortex-stretching integral initiated in [Chapter 8](chapter-08.md) and [Chapter 9](chapter-09.md). After recording why $\dot H^{1/2}(\mathbb R^3)$ is the scale-critical space, we close the packet-to-tube step under a bounded-congestion hypothesis, show that Fourier resonance forces high–high–high interacting directions to be nearly coplanar, and resolve all coplanar configurations by balancing translated frequency-plate overlap against divergence-free cancellation at the dividing angle $\theta\simeq\delta^{1/3}$.

We use the standard Fourier normalization of [Chapter 8](chapter-08.md#directions) on $\mathbb R^3$:

$$
\widehat f(\xi)=\int_{\mathbb R^3}e^{-ix\cdot\xi}f(x)\,dx,
\qquad
f(x)=(2\pi)^{-3}\int_{\mathbb R^3}e^{ix\cdot\xi}\widehat f(\xi)\,d\xi,
$$

so $\|f\|_{L^2}^2=(2\pi)^{-3}\|\widehat f\|_{L^2}^2$ and $\widehat{fg}=(2\pi)^{-3}\widehat f*\widehat g$. Unless stated otherwise, viscosity is normalized to $\nu=1$, $u_0\in C_c^\infty(\mathbb R^3)$ is smooth and divergence-free, $\omega=\nabla\times u$, and Biot–Savart recovery reads

$$
u_g=(-\Delta)^{-1}\nabla\times g,\qquad
\nabla u=\nabla(-\Delta)^{-1}\nabla\times\omega=:\mathcal R\omega,\qquad
\mathcal T(f,g,h)=\int_{\mathbb R^3}(f\cdot\nabla u_g)\cdot h\,dx.
\tag{1.1}
$$

Thus the global enstrophy identity is $\frac12\frac d{dt}\|\omega\|_{L^2}^2+\|\nabla\omega\|_{L^2}^2=\mathcal T(\omega,\omega,\omega)$.

## 1. Critical scaling and the isotropic high–high–high baseline { #critical-scaling }

On $\mathbb R^d$, the incompressible Navier–Stokes system $\partial_tu+u\cdot\nabla u=-\nabla p+\Delta u$, $\nabla\cdot u=0$, is invariant under the parabolic rescaling

$$
u_\lambda(t,x)=\lambda u(\lambda^2t,\lambda x),
\qquad
p_\lambda(t,x)=\lambda^2p(\lambda^2t,\lambda x)
\qquad(\lambda>0).
\tag{1.2}
$$

Since $\widehat{u_\lambda}(t,\xi)=\lambda^{1-d}\widehat u(\lambda^2t,\lambda^{-1}\xi)$, changing variables $\eta=\lambda^{-1}\xi$ gives

$$
\|u_\lambda(t)\|_{\dot H^s(\mathbb R^d)}^2
=(2\pi)^{-d}\int_{\mathbb R^d}|\xi|^{2s}|\widehat{u_\lambda}(t,\xi)|^2\,d\xi
=\lambda^{2s+2-d}\|u(\lambda^2t)\|_{\dot H^s(\mathbb R^d)}^2.
$$

The scale-invariant Sobolev exponent is therefore

$$
s_c=\frac d2-1.
\tag{1.3}
$$

**Two versus three dimensions.** In dimension $d=2$, $s_c=0$: the critical space $\dot H^0=L^2(\mathbb R^2)$ coincides with the conserved kinetic-energy norm. Correspondingly, the scalar vorticity $\omega=\partial_1u_2-\partial_2u_1$ satisfies $\partial_t\omega+u\cdot\nabla\omega=\Delta\omega$ with *no* stretching term, so both $\frac12\frac d{dt}\|u\|_2^2+\|\nabla u\|_2^2=0$ and $\frac12\frac d{dt}\|\omega\|_2^2+\|\nabla\omega\|_2^2=0$ hold unconditionally, yielding global regularity for arbitrary divergence-free $L^2$ data. In dimension $d=3$, $s_c=\frac12$, whereas the kinetic energy controls $L_t^\infty L_x^2\cap L_t^2\dot H_x^1$: at $L^\infty$ in time it lies half a derivative below criticality.

**The isotropic H–H–H estimate.** Let $P_k$ localize to $|\xi|\simeq N:=2^k$, and set $u_k=P_ku$, $\omega_k=P_k\omega$. For three fields $a,b,c$ localized to $|\xi|\simeq N$, Calderón–Zygmund boundedness $\|\nabla u_b\|_{L^2}\lesssim\|b\|_{L^2}$ and the three-dimensional Bernstein bound $\|a\|_{L^\infty}\lesssim N^{3/2}\|a\|_{L^2}$ ([Chapter 5](chapter-05.md#bernstein)) give

$$
|\mathcal T(a,b,c)|\le\|a\|_{L^\infty}\|\nabla u_b\|_{L^2}\|c\|_{L^2}
\lesssim N^{3/2}\|a\|_{L^2}\|b\|_{L^2}\|c\|_{L^2}.
\tag{1.4}
$$

In particular, a representative high–high–high piece obeys $|\mathcal T(\omega_k,\omega_k,\omega_k)|\lesssim N^{3/2}\|\omega_k\|_{L^2}^3$, while viscous dissipation on the shell satisfies $\|\nabla\omega_k\|_{L^2}^2\simeq N^2\|\omega_k\|_{L^2}^2$. In the model inequality

$$
\frac12\frac d{dt}\|\omega_k\|_{L^2}^2+cN^2\|\omega_k\|_{L^2}^2\le CN^{3/2}\|\omega_k\|_{L^2}^3,
$$

dissipation absorbs stretching precisely when $\|\omega_k\|_{L^2}\le\frac c{2C}N^{1/2}$. Because $\nabla\cdot u_k=0$ implies $\|\omega_k\|_{L^2}=\|\nabla u_k\|_{L^2}\simeq N\|u_k\|_{L^2}$, this condition is equivalent to

$$
\|u_k\|_{\dot H^{1/2}}\simeq N^{1/2}\|u_k\|_{L^2}\le c_*,
\tag{1.5}
$$

recovering the critical $\dot H^{1/2}$ smallness scale shell by shell. Any improvement over (1.5) at high frequency must exploit directional structure or equation-specific cancellation rather than isotropic Sobolev inequalities.

## 2. Bounded packet congestion and the transverse tube gain { #packet-gain }

Fix $N=2^k\gg1$ and a small angular parameter $0<\delta\ll1$. To avoid conflating reciprocal scales across lecture sources, we fix one notation throughout this chapter:

- **Frequency plates (boxes) $B$**: radial thickness $h=N\delta^2$ along a unit frequency axis $\nu\in\mathbb S^2$, and two transverse widths $a=N\delta$, with volume $|B|\simeq ha^2=N^3\delta^4$.
- **Dual physical tubes $T$**: longitudinal length $\ell=h^{-1}=(N\delta^2)^{-1}$ along $\nu$, and transverse radius $\rho=a^{-1}=(N\delta)^{-1}$, with aspect ratio $\rho/\ell=\delta$ and volume $V=\ell\rho^2=N^{-3}\delta^{-4}$.

[Chapter 9](chapter-09.md#multilinear-kakeya) showed that Guth's endpoint multilinear Kakeya inequality controls products of *square-sum* envelopes, but warned that coherent packet overlap prevents replacing $|\sum_Tc_T\phi_T|$ by $(\sum_T|c_T|^2W_T)^{1/2}$ without an extra hypothesis. Suppose three scalar or component fields $F_1,F_2,F_3$ at scale $(N,\delta)$ satisfy the following five packet assumptions:

1. **Expansion and rapid decay:** $F_i=\sum_{T\in\mathcal T_i}c_T\phi_T$ (finite or $L^2$-convergent countable sum), where each $T\in\mathcal T_i$ has center $x_T$, unit axis $v(T)$, length $\ell$, and radius $\rho$, and for a fixed $A>10$,

    $$
    |\phi_T(x)|\le C_AV^{-1/2}\big(1+d_T(x)\big)^{-A},
    \qquad
    d_T(x)=\frac{|(x-x_T)_\parallel|}{\ell}+\frac{|(x-x_T)_\perp|}{\rho}.
    \tag{2.1}
    $$

2. **Bessel bound:** $\sum_{T\in\mathcal T_i}|c_T|^2\le C_0\|F_i\|_{L^2}^2$ for $i=1,2,3$.
3. **Single-cap angular confinement:** Within each family $\mathcal T_i$, there is a fixed unit vector $\nu_i\in\mathbb S^2$ such that $|v(T)-\nu_i|\le C_1\delta$ for all $T\in\mathcal T_i$.
4. **Bounded spatial congestion:** $\sum_{T\in\mathcal T_i}\mathbf 1_T(x)\le M$ for all $x\in\mathbb R^3$ and $i=1,2,3$.
5. **Uniform three-family transversality:** $|\det(v(T_1),v(T_2),v(T_3))|\ge\kappa>0$ for all $T_i\in\mathcal T_i$.

!!! proposition "Proposition 11.1. Trilinear packet gain under bounded congestion"

    Under hypotheses 1–5 above with $V=\ell\rho^2=(N\delta^2)^{-1}(N\delta)^{-2}$,

    $$
    \left|\int_{\mathbb R^3}F_1(x)F_2(x)F_3(x)\,dx\right|
    \le C\,M^{3/2}\kappa^{-1/2}V^{-3/2}\rho^3\prod_{i=1}^3\|F_i\|_{L^2}
    =C\,M^{3/2}\kappa^{-1/2}N^{3/2}\delta^3\prod_{i=1}^3\|F_i\|_{L^2},
    \tag{2.2}
    $$

    where $C$ depends only on $A,C_A,C_0,C_1$.

??? proof "Proof"

    For each integer $m\ge0$ and $T\in\mathcal T_i$, let $T^{(m)}=\{x:|(x-x_T)_\parallel|\le2^m\ell,\ |(x-x_T)_\perp|\le2^m\rho\}$ be the tube dilated by $2^m$ in all directions. Dividing $d_T(x)$ into dyadic shells gives

    $$
    |F_i(x)|\le2^AC_AV^{-1/2}\sum_{m=0}^\infty2^{-Am}\sum_{T\in\mathcal T_i}|c_T|\mathbf 1_{T^{(m)}}(x).
    \tag{2.3}
    $$

    *Multiplicity of dilated tubes.* Fix $x\in\mathbb R^3$ and suppose $x\in T^{(m)}$ for some $T\in\mathcal T_i$. Let $y\in T$ be any point of the original undilated tube. Since $|v(T)-\nu_i|\le C_1\delta$ and $\delta\ell=\rho$, projecting $y-x=(y-x_T)-(x-x_T)$ onto $\nu_i$ and $\nu_i^\perp$ gives

    $$
    |(y-x)\cdot\nu_i|\le|(y-x_T)_\parallel|+|(x-x_T)_\parallel|+C_1\delta\big(|(y-x_T)_\perp|+|(x-x_T)_\perp|\big)\lesssim2^m\ell,
    $$

    $$
    |(y-x)_\perp|\le|(y-x_T)_\perp|+|(x-x_T)_\perp|+C_1\delta\big(|(y-x_T)_\parallel|+|(x-x_T)_\parallel|\big)
    \lesssim2^m\rho+C_1\delta\cdot2^m\ell\simeq2^m\rho.
    $$

    Hence *every* original tube $T\in\mathcal T_i$ with $x\in T^{(m)}$ is contained inside one fixed cylinder $Q_i^{(m)}(x)$ around $x$ aligned with $\nu_i$ of volume $|Q_i^{(m)}(x)|\lesssim(2^m\ell)(2^m\rho)^2=2^{3m}V$. Integrating hypothesis 4 over $Q_i^{(m)}(x)$ yields

    $$
    V\sum_{T\in\mathcal T_i}\mathbf 1_{T^{(m)}}(x)
    =\sum_{T\in\mathcal T_i:\,x\in T^{(m)}}|T|
    \le\int_{Q_i^{(m)}(x)}\sum_{T\in\mathcal T_i}\mathbf 1_T(y)\,dy
    \le M\,|Q_i^{(m)}(x)|
    \lesssim2^{3m}MV,
    $$

    so $\sum_{T\in\mathcal T_i}\mathbf 1_{T^{(m)}}(x)\lesssim2^{3m}M$. Pointwise Cauchy–Schwarz in $T$ now converts the linear sum into a weighted square root:

    $$
    \sum_{T\in\mathcal T_i}|c_T|\mathbf 1_{T^{(m)}}(x)
    \le\left(\sum_{T\in\mathcal T_i}\mathbf 1_{T^{(m)}}(x)\right)^{1/2}
    \left(\sum_{T\in\mathcal T_i}|c_T|^2\mathbf 1_{T^{(m)}}(x)\right)^{1/2}
    \lesssim2^{3m/2}M^{1/2}\left(\sum_{T\in\mathcal T_i}|c_T|^2\mathbf 1_{T^{(m)}}(x)\right)^{1/2}.
    $$

    Substitute this into (2.3) and expand the product over $m_1,m_2,m_3\ge0$. For a fixed triple $(m_1,m_2,m_3)$, put $m_*=\max(m_1,m_2,m_3)$ and enlarge every $T^{(m_i)}$ to the infinite cylinder of radius $2^{m_*}\rho$ along $v(T)$. Because directions are unchanged, the weighted endpoint Kakeya inequality ([Theorem 9.1](chapter-09.md#multilinear-kakeya), equation (4.4)) bounds that triple's integral by

    $$
    C\,V^{-3/2}M^{3/2}2^{\frac32(m_1+m_2+m_3)}\kappa^{-1/2}(2^{m_*}\rho)^3\prod_{i=1}^3\left(\sum_{T\in\mathcal T_i}|c_T|^2\right)^{1/2}.
    $$

    Since $3m_*\le3(m_1+m_2+m_3)$ and $A>10>\frac92$, the numerical factor $\sum_{m_1,m_2,m_3\ge0}2^{-(A-9/2)(m_1+m_2+m_3)}$ converges. Applying the Bessel bound 2 and computing $V^{-3/2}\rho^3=(N^{-3}\delta^{-4})^{-3/2}(N\delta)^{-3}=N^{3/2}\delta^3$ gives (2.2).

!!! note "Clarification: role of single-cap confinement"

    Hypothesis 3 ($|v(T)-\nu_i|\lesssim\delta$) is essential in bounding $\sum_T\mathbf 1_{T^{(m)}}(x)\lesssim2^{3m}M$. Without angular alignment inside each family, tubes of length $\ell$ meeting $B(x,2^m\ell)$ could sweep out a ball of volume $\simeq(2^m\ell)^3\simeq\delta^{-2}2^{3m}V$, costing an extra factor $\delta^{-1}$ per family.

Compared with the isotropic estimate (1.4), Proposition 11.1 multiplies $N^{3/2}$ by the dimensionless factor

$$
G:=M^{3/2}\kappa^{-1/2}\delta^3.
\tag{2.4}
$$

Whenever a designated transverse packet contribution $\mathcal T_{\mathrm{HHH},k}^{\mathrm{tr}}$ obeys (2.2) without additional sector-summation loss, viscous dissipation $cN^2\|\omega_k\|_{L^2}^2$ absorbs it under the relaxed per-shell threshold

$$
\|u_k\|_{\dot H^{1/2}}\simeq N^{1/2}\|u_k\|_{L^2}\le c_*'M^{-3/2}\kappa^{1/2}\delta^{-3}.
\tag{2.5}
$$

When $G\ll1$, this threshold is much larger than the universal constant $c_*$ of (1.5). Still, (2.5) concerns only transverse triples and leaves open what happens when $\kappa$ degenerates.

## 3. Why resonant triples are nearly coplanar { #coplanar-obstruction }

A nonzero spatial integral of three frequency-localized functions cannot have arbitrarily transverse central frequencies as $\delta\to0$. Expanding in Fourier space,

$$
\int_{\mathbb R^3}F_1(x)F_2(x)F_3(x)\,dx
=(2\pi)^{-6}\iint_{\mathbb R^3\times\mathbb R^3}\widehat F_1(\xi_1)\widehat F_2(\xi_2)\widehat F_3(-\xi_1-\xi_2)\,d\xi_1\,d\xi_2.
\tag{3.1}
$$

Only resonant triples $\xi_1+\xi_2+\xi_3=0$ contribute, and any three vectors summing to zero lie in a two-dimensional plane: $\det(\xi_1,\xi_2,\xi_3)=0$.

!!! lemma "Lemma 11.2. Angular coplanarity of resonant H–H–H triples"

    Suppose $F_1,F_2,F_3\in L^2(\mathbb R^3)$ have Fourier supports in $\{c_0N\le|\xi|\le C_0N\}$ and within cones (or double cones, for real-valued fields) of angular width $C_1\delta$ around unit vectors $\nu_1,\nu_2,\nu_3\in\mathbb S^2$, meaning $|\frac\xi{|\xi|}\times\nu_i|\le C_1\delta$ on $\operatorname{supp}\widehat F_i$. If $\int_{\mathbb R^3}F_1F_2F_3\,dx\ne0$, then

    $$
    |\det(\nu_1,\nu_2,\nu_3)|\lesssim\delta.
    \tag{3.2}
    $$

??? proof "Proof"

    By (3.1), there exist $\xi_i\in\operatorname{supp}\widehat F_i$ with $\xi_1+\xi_2+\xi_3=0$. For each $i$, choose $\sigma_i\in\{\pm1\}$ so that $\sigma_i\nu_i$ lies in the same hemisphere as $\xi_i$; then $|\frac{\xi_i}{|\xi_i|}-\sigma_i\nu_i|\le\sqrt2|\frac{\xi_i}{|\xi_i|}\times\nu_i|\le\sqrt2C_1\delta$. Set $\widetilde\eta_i=|\xi_i|\sigma_i\nu_i$. Note that no radial thinness is needed: $|\xi_i-\widetilde\eta_i|=|\xi_i|\,|\frac{\xi_i}{|\xi_i|}-\sigma_i\nu_i|\le\sqrt2C_0C_1N\delta$. Summing over $i$ and using $\xi_1+\xi_2+\xi_3=0$ gives

    $$
    |\widetilde\eta_1+\widetilde\eta_2+\widetilde\eta_3|\le\sum_{i=1}^3|\widetilde\eta_i-\xi_i|\lesssim N\delta.
    $$

    By multilinearity and alternating symmetry of the determinant,

    $$
    |\det(\widetilde\eta_1,\widetilde\eta_2,\widetilde\eta_3)|
    =|\det(\widetilde\eta_1,\widetilde\eta_2,\widetilde\eta_1+\widetilde\eta_2+\widetilde\eta_3)|
    \le|\widetilde\eta_1|\,|\widetilde\eta_2|\,|\widetilde\eta_1+\widetilde\eta_2+\widetilde\eta_3|
    \lesssim N^3\delta.
    $$

    Dividing by $|\widetilde\eta_1|\,|\widetilde\eta_2|\,|\widetilde\eta_3|=|\xi_1|\,|\xi_2|\,|\xi_3|\ge c_0^3N^3$ gives $|\det(\nu_1,\nu_2,\nu_3)|\lesssim\delta$.

Thus one *cannot* assume a $\delta$-independent lower bound $\kappa\ge\kappa_0>0$ across every interacting triple; on exact planar frequency triangles $\kappa$ vanishes altogether. When $|\det(\nu_1,\nu_2,\nu_3)|$ is small or zero, the three axes fall into two geometric regimes relative to an angular threshold $\theta\in[\delta,1]$:

1. **Separated-pair regime:** $\max_{i\ne j}|\nu_i\times\nu_j|\ge\theta$ (covering both triangles with three separated coplanar sides and configurations where two axes align while the third is transverse to them).
2. **Nearly aligned regime:** $|\nu_i\times\nu_j|<\theta$ for all $i\ne j$, so all three axes lie within angle $O(\theta)$ of a single line.

## 4. Planar configurations with a separated pair { #separated-planar }

In the separated-pair regime, two of the three Fourier supports have unit normals separated by $|\nu_i\times\nu_j|\ge\theta$, even if all three axes lie in a common plane. Keeping track of reciprocal dimensions is essential here:

- Two **physical tubes** $T,S$ of length $\ell$ and radius $\rho$ meeting at angle $\alpha$ satisfy $|T\cap S|\lesssim\min(\ell\rho^2,\rho^3/|\sin\alpha|)$.
- Two **frequency plates** $B_1,B_2$ of short radial thickness $h=N\delta^2$ and broad transverse widths $a=N\delta$ with normals meeting at angle $\alpha$ satisfy the translated intersection bound ([Chapter 9](chapter-09.md#fourier-overlap), equations (5.2)–(5.3))

    $$
    \Omega(B_1,B_2):=\sup_{\zeta\in\mathbb R^3}|B_1\cap(\zeta-B_2)|
    \lesssim\min\left(ha^2,\frac{h^2a}{|\sin\alpha|}\right)
    =N^3\min\left(\delta^4,\frac{\delta^5}{|\sin\alpha|}\right).
    \tag{4.1}
    $$

!!! proposition "Proposition 11.3. Separated-pair trilinear estimate"

    Let $f,g,h\in L^2(\mathbb R^3)$ be vector fields localized to $|\xi|\simeq N$ whose Fourier supports each lie in a finite union of $O(1)$ plates of dimensions $N\delta^2\times N\delta\times N\delta$ with unit normals $\nu_f,\nu_g,\nu_h$. If $\max(|\nu_f\times\nu_g|,|\nu_f\times\nu_h|,|\nu_g\times\nu_h|)\ge\theta>0$, then

    $$
    |\mathcal T(f,g,h)|\lesssim N^{3/2}\min\big(\delta^2,\delta^{5/2}\theta^{-1/2}\big)\|f\|_{L^2}\|g\|_{L^2}\|h\|_{L^2}.
    \tag{4.2}
    $$

??? proof "Proof"

    The multiplier $g\mapsto\nabla u_g=\mathcal Rg$ preserves $\operatorname{supp}\widehat g$ and satisfies $\|\nabla u_g\|_{L^2}\le\|g\|_{L^2}$. Writing $\mathcal T(f,g,h)=\sum_{i,j=1}^3\int_{\mathbb R^3}f_i(\partial_iu_{g,j})h_j\,dx$, pick whichever pair of $\{f,\nabla u_g,h\}$ achieves normal separation at least $\theta$, apply Cauchy–Schwarz against the $L^2$ norm of the remaining factor, and bound the $L^2$ norm of the product of the separated pair by $\Omega(B_1,B_2)^{1/2}$ via [Lemma 9.2](chapter-09.md#fourier-overlap) and (4.1).

Proposition 11.3 requires only *two* separated axes and needs no determinant lower bound, so coplanarity causes no loss as long as $\theta\gg\delta$.

## 5. Incompressibility cancellation for nearly aligned triples { #incompressibility-cancellation }

When all three axes nearly align ($|\nu_i\times\nu_j|\lesssim\theta$ with $\theta$ small), frequency-plate overlap deteriorates toward the single-plate bound $N^{3/2}\delta^2$. Geometry alone offers no further improvement; instead, the **incompressibility** of the vorticity and velocity fields weakens the stretching operator itself.

**Plane-wave mechanism.** Consider two monochromatic divergence-free plane waves $f(x)=ae^{i\xi\cdot x}$ and $g(x)=be^{i\eta\cdot x}$ ($\xi,\eta\ne0$). Incompressibility $\nabla\cdot f=0$ means $\xi\cdot a=0$, while Biot–Savart gives $u_g(x)=\frac{i(\eta\times b)}{|\eta|^2}e^{i\eta\cdot x}$ and

$$
(f\cdot\nabla)u_g(x)=-\frac{(a\cdot\eta)(\eta\times b)}{|\eta|^2}e^{i(\xi+\eta)\cdot x}.
$$

Because $a\perp\xi$, only the component of $\eta$ perpendicular to $\xi$ pairs with $a$: if $\beta$ is the angle between the lines $\mathbb R\xi$ and $\mathbb R\eta$, then $|a\cdot\eta|\le|a|\,|\eta|\,|\sin\beta|$, so

$$
|(f\cdot\nabla)u_g(x)|\le|a|\,|b|\,|\sin\beta|.
\tag{5.1}
$$

Physically, $f$ oscillates along $\xi$ so its vector amplitude points *across* $\xi$; when $\eta$ is nearly parallel to $\xi$, $f$ points nearly parallel to the constant-phase wavefronts of $u_g$, where directional derivatives of $u_g$ are small. At exact alignment ($\eta\parallel\xi$), the plane-wave stretching vanishes identically.

For genuine $L^2$ packets localized to cones of aperture $O(\delta)$, two small angles appear: the angle $\theta$ between central axes and the angular spread $\delta$ inside each cone.

!!! proposition "Proposition 11.4. Divergence-free cancellation estimate"

    Let $f,g\in L^2(\mathbb R^3)$ be divergence-free vector fields ($\xi\cdot\widehat f(\xi)=\xi\cdot\widehat g(\xi)=0$) with $\operatorname{supp}\widehat g\subset\{c_0N\le|\xi|\le C_0N\}$. Suppose $\widehat f$ and $\widehat g$ are supported in double cones of aperture $C_1\delta$ around unit axes $\nu_f,\nu_g\in\mathbb S^2$:

    $$
    \left|\frac\xi{|\xi|}\times\nu_f\right|\le C_1\delta\quad(\xi\in\operatorname{supp}\widehat f),
    \qquad
    \left|\frac\xi{|\xi|}\times\nu_g\right|\le C_1\delta\quad(\xi\in\operatorname{supp}\widehat g),
    $$

    and assume $|\nu_f\times\nu_g|\le\theta$. Then

    $$
    \|(f\cdot\nabla)u_g\|_{L^1(\mathbb R^3)}\lesssim(\theta+\delta)\|f\|_{L^2(\mathbb R^3)}\|g\|_{L^2(\mathbb R^3)}.
    \tag{5.2}
    $$

    (Allowing double cones about $\pm\nu_f$ and $\pm\nu_g$ covers real-valued fields directly.)

??? proof "Proof"

    Set $\Pi_\perp=I-\nu_g\otimes\nu_g$, $f_\perp=\Pi_\perp f$, and $\nabla_\perp=\Pi_\perp\nabla$, so the directional derivative decomposes into axial and transverse parts relative to $\nu_g$:

    $$
    (f\cdot\nabla)u_g=(f\cdot\nu_g)\partial_{\nu_g}u_g+(f_\perp\cdot\nabla_\perp)u_g.
    \tag{5.3}
    $$

    *Step 1: Smallness of the axial component $f\cdot\nu_g$.* Because $\xi\cdot\widehat f(\xi)=0$, for every nonzero $\xi\in\operatorname{supp}\widehat f$ the vector $\widehat f(\xi)$ lies in $\xi^\perp$, so orthogonal projection onto $\xi^\perp$ gives

    $$
    |\widehat f(\xi)\cdot\nu_g|=\big|\widehat f(\xi)\cdot\big(\nu_g-(\tfrac\xi{|\xi|}\cdot\nu_g)\tfrac\xi{|\xi|}\big)\big|
    \le|\widehat f(\xi)|\,\left|\frac\xi{|\xi|}\times\nu_g\right|.
    $$

    For any unit vectors $u,v,w\in\mathbb S^2$, choosing the sign $\sigma\in\{\pm1\}$ with $v\cdot(\sigma w)\ge0$ gives $|u\times w|=|u\times(\sigma w)|\le|u\times v|+|v\times w|$ (indeed, $|u\times v|=|\sin\angle(\mathbb Ru,\mathbb Rv)|$ is the sine metric on $\mathbb RP^2$, which satisfies the triangle inequality!). Applying this with $u=\xi/|\xi|$, $v=\nu_f$, $w=\nu_g$ yields $|\frac\xi{|\xi|}\times\nu_g|\le C_1\delta+\theta$ on $\operatorname{supp}\widehat f$. Plancherel gives

    $$
    \|f\cdot\nu_g\|_{L^2(\mathbb R^3)}\le(\theta+C_1\delta)\|f\|_{L^2(\mathbb R^3)}.
    \tag{5.4}
    $$

    *Step 2: Directional derivatives of $u_g$.* On $\operatorname{supp}\widehat g\subset\{c_0N\le|\xi|\le C_0N\}$, Biot–Savart $|\widehat u_g(\xi)|\le|\xi|^{-1}|\widehat g(\xi)|$ gives $\|u_g\|_{L^2}\le c_0^{-1}N^{-1}\|g\|_{L^2}$. Along $\nu_g$, $|\nu_g\cdot\xi|\le C_0N$, so

    $$
    \|\partial_{\nu_g}u_g\|_{L^2(\mathbb R^3)}\le\frac{C_0}{c_0}\|g\|_{L^2(\mathbb R^3)}.
    $$

    Across $\nu_g$, the cone assumption on $\widehat g$ gives $|\Pi_\perp\xi|=|\xi|\,|\frac\xi{|\xi|}\times\nu_g|\le C_0C_1\delta N$, so

    $$
    \|\nabla_\perp u_g\|_{L^2(\mathbb R^3)}\le\frac{C_0C_1}{c_0}\delta\|g\|_{L^2(\mathbb R^3)}.
    $$

    *Step 3: Combine in $L^1$.* Applying Cauchy–Schwarz to each piece of (5.3) and using $\|f_\perp\|_{L^2}\le\|f\|_{L^2}$,

    $$
    \|(f\cdot\nabla)u_g\|_{L^1}
    \le\|f\cdot\nu_g\|_{L^2}\|\partial_{\nu_g}u_g\|_{L^2}+\|f_\perp\|_{L^2}\|\nabla_\perp u_g\|_{L^2}
    \lesssim(\theta+\delta)\|f\|_{L^2}\|g\|_{L^2}.
    $$

Along $\nu_g$ the velocity gradient has full strength $O(1)$ relative to $g$ while the component of $f$ is $O(\theta+\delta)$; across $\nu_g$ the component of $f$ is $O(1)$ while the velocity gradient is $O(\delta)$. Both pieces gain a small angle.

!!! proposition "Proposition 11.5. Nearly aligned trilinear estimate"

    Let $f,g$ satisfy the hypotheses of Proposition 11.4, and let $h\in L^2(\mathbb R^3)$ have Fourier support of Lebesgue measure $|\operatorname{supp}\widehat h|\le C_2N^3\delta^4$ (for instance a finite union of plates of dimensions $N\delta^2\times N\delta\times N\delta$). Then

    $$
    |\mathcal T(f,g,h)|\lesssim N^{3/2}\delta^2(\theta+\delta)\|f\|_{L^2}\|g\|_{L^2}\|h\|_{L^2}.
    \tag{5.5}
    $$

??? proof "Proof"

    Fourier inversion and Cauchy–Schwarz on $\operatorname{supp}\widehat h$ give

    $$
    \|h\|_{L^\infty(\mathbb R^3)}\le(2\pi)^{-3}\int_{\operatorname{supp}\widehat h}|\widehat h(\xi)|\,d\xi
    \le(2\pi)^{-3/2}|\operatorname{supp}\widehat h|^{1/2}\|h\|_{L^2(\mathbb R^3)}
    \lesssim N^{3/2}\delta^2\|h\|_{L^2(\mathbb R^3)}.
    $$

    Pair $(f\cdot\nabla)u_g\in L^1$ against $h\in L^\infty$ using Proposition 11.4: $|\mathcal T(f,g,h)|\le\|(f\cdot\nabla)u_g\|_{L^1}\|h\|_{L^\infty}\lesssim(\theta+\delta)N^{3/2}\delta^2\|f\|_{L^2}\|g\|_{L^2}\|h\|_{L^2}$.

## 6. Balancing geometry against incompressibility { #regime-balance }

For a single localized triple $(f,g,h)$ supported in plates of volume $\simeq N^3\delta^4$ (with $f,g$ divergence-free), Propositions 11.3 and 11.5 provide complementary bounds at any dividing angle $\theta\in[\delta,1]$:

| Angular configuration | Mechanism | Coefficient multiplying $\lVert f\rVert_2\lVert g\rVert_2\lVert h\rVert_2$ |
| --- | --- | --- |
| At least one pair with $\lvert\nu_i\times\nu_j\rvert\ge\theta$ | Translated frequency-plate overlap | $N^{3/2}\delta^{5/2}\theta^{-1/2}$ |
| All pairs nearly aligned, $\lvert\nu_i\times\nu_j\rvert<\theta$ | Divergence-free cancellation ($\nabla\cdot f=0$) | $N^{3/2}\delta^2(\theta+\delta)\simeq N^{3/2}\delta^2\theta$ |

Equating the two powers of $\delta$ and $\theta$ for $\delta\le\theta\le1$,

$$
\delta^{5/2}\theta^{-1/2}\simeq\delta^2\theta
\quad\Longleftrightarrow\quad
\theta^{3/2}\simeq\delta^{1/2}
\quad\Longleftrightarrow\quad
\theta\simeq\delta^{1/3}.
\tag{6.1}
$$

At the optimal dividing angle $\theta=\delta^{1/3}$ (which satisfies $\delta\le\delta^{1/3}\le1$ whenever $0<\delta\le1$), *every* localized plate triple—transverse, coplanar with separated pairs, or nearly collinear—satisfies

$$
|\mathcal T(f,g,h)|\lesssim N^{3/2}\delta^{7/3}\|f\|_{L^2}\|g\|_{L^2}\|h\|_{L^2},
\tag{6.2}
$$

improving the single-plate Bernstein bound $N^{3/2}\delta^2$ by an unconditional factor $\delta^{1/3}$ across all orientations.

!!! warning "Single-triple bounds versus summed dyadic shells"

    In lecture shorthand one often records the conditional packet-summed counterparts

    $$
    |S_k^{\mathrm{sep}}|\lesssim M^{3/2}N^{3/2}\delta^{5/2}\theta^{-1/2}\|\omega_k\|_{L^2}^3,
    \qquad
    |S_k^{\mathrm{near}}|\lesssim M^{3/2}N^{3/2}\delta^2(\theta+\delta)\|\omega_k\|_{L^2}^3,
    $$

    balanced at $\theta=\delta^{1/3}$ to $M^{3/2}N^{3/2}\delta^{7/3}\|\omega_k\|_{L^2}^3$. Unlike Proposition 11.1—where Guth's theorem integrated the product of three square-sum envelopes directly—Propositions 11.3 and 11.5 are proved here for *individual* plate triples, not for arbitrary sums over all $O(\delta^{-4})$ boxes on the annulus. Moreover, Proposition 11.4 uses the signed cancellation $\xi\cdot\widehat f(\xi)=0$, which must be preserved before absolute values of packet envelopes are taken. Applying the $\delta^{7/3}$ bound to a full shell therefore requires either Initial Data / Evolution hypotheses restricting the active frequency boxes to boundedly many channels, or an explicit almost-orthogonality summation proof compatible with divergence-free cancellation.

## 7. Projected vorticity commutators and directionally organized data { #commutators-and-data }

To place localized high-frequency bounds inside the Navier–Stokes evolution, apply $P_k$ ($[A,B]=AB-BA$) to $\partial_t\omega+u\cdot\nabla\omega=\omega\cdot\nabla u+\Delta\omega$. Since $P_k$ commutes with $\partial_t$ and $\Delta$, pulling transport outside $P_k$ via $P_k(u\cdot\nabla\omega)=u\cdot\nabla\omega_k+[P_k,u\cdot\nabla]\omega$ yields the exact projected identity

$$
\partial_t\omega_k+u\cdot\nabla\omega_k
=P_k(\omega\cdot\nabla u)+\Delta\omega_k-[P_k,u\cdot\nabla]\omega.
\tag{7.1}
$$

Testing (7.1) against $\omega_k$ in $L^2(\mathbb R^3)$, the transport term $\langle u\cdot\nabla\omega_k,\omega_k\rangle=0$ cancels by $\nabla\cdot u=0$, while the commutator $-\langle[P_k,u\cdot\nabla]\omega,\omega_k\rangle$ records scale transfer driven by velocity shear across band $k$. Depending on which factor is localized in the stretching term, (7.1) can be rewritten in two exact forms:

$$
\partial_t\omega_k+u\cdot\nabla\omega_k
=\omega\cdot\nabla u_k+\Delta\omega_k+[P_k,\omega\cdot\nabla]u-[P_k,u\cdot\nabla]\omega,
\tag{7.2}
$$

or, isolating $\omega_k\cdot\nabla u$,

$$
\partial_t\omega_k+u\cdot\nabla\omega_k
=\omega_k\cdot\nabla u+\Delta\omega_k+\big(P_k(\omega\cdot\nabla u)-\omega_k\cdot\nabla u\big)-[P_k,u\cdot\nabla]\omega,
\tag{7.3}
$$

where componentwise $\big(P_k(\omega\cdot\nabla u)-\omega_k\cdot\nabla u\big)_j=\sum_{i=1}^3[P_k,\partial_iu_j]\omega_i$ (viewing $\partial_iu_j$ as a multiplication operator). Neither commutator can be discarded when closing an a priori estimate across scales.

**The geometric initial-data problem.** Together, Proposition 11.1, Lemma 11.2, and the balanced planar estimate (6.2) motivate a constructive PDE question: can one build families of open sets $\mathcal U_a$ of smooth divergence-free initial data (open in a chosen Banach topology) with representatives $u_0^{(a)}\in\mathcal U_a$ satisfying

$$
T_*(u_0)=\infty\quad(\forall\,u_0\in\mathcal U_a),
\qquad
\lim_{a\to\infty}\|u_0^{(a)}\|_{\dot H^{1/2}(\mathbb R^3)}=\infty\,?
\tag{7.4}
$$

The estimates of this chapter explain why directional concentration of high-frequency vorticity suppresses instant self-stretching—either by small plate volume $N^3\delta^4$ and divergence-free alignment cancellation (Proposition 11.5), or by transverse packet crossing (Proposition 11.1). Turning that instant suppression into a global theorem on an open neighborhood requires choosing a norm topology strong enough to propagate directional localization over the dissipative lifetime $t\lesssim N^{-2}\log(\cdots)$ of the high-frequency shell while controlling the low-frequency remainders and commutators in (7.1).

## 8. Exercises { #exercises }

!!! example "Exercise 1. A kernel bound for the Littlewood–Paley transport commutator"

    Let $P_kf=K_k*f$ with $K_k(z)=2^{3k}K(2^kz)$, $K\in\mathcal S(\mathbb R^3)$, and let $v,f\in\mathcal S(\mathbb R^3)$ be smooth vector fields with $\nabla\cdot v=0$.

    (a) Show that $([P_k,v\cdot\nabla]f)(x)=\sum_{j=1}^3\int_{\mathbb R^3}\partial_jK_k(x-y)\big(v_j(y)-v_j(x)\big)f(y)\,dy$.

    (b) Prove the scale-independent Calderón–Zygmund commutator bound

    $$
    \|[P_k,v\cdot\nabla]f\|_{L^p(\mathbb R^3)}\le C\|\nabla v\|_{L^\infty(\mathbb R^3)}\|f\|_{L^p(\mathbb R^3)}
    \qquad(1\le p\le\infty),
    $$

    with $C=\int_{\mathbb R^3}|z|\,|\nabla K(z)|\,dz$ independent of $k$ and $p$.

??? solution "Solution"

    (a) Because $\nabla\cdot v=0$, $(v\cdot\nabla f)(y)=\sum_{j=1}^3\partial_{y_j}(v_j(y)f(y))$. Since $\partial_{y_j}[K_k(x-y)]=-(\partial_jK_k)(x-y)$, integrating by parts in $y$ inside $P_k(v\cdot\nabla f)(x)=\int_{\mathbb R^3}K_k(x-y)(v\cdot\nabla f)(y)\,dy$ gives

    $$
    P_k(v\cdot\nabla f)(x)=\sum_{j=1}^3\int_{\mathbb R^3}(\partial_jK_k)(x-y)v_j(y)f(y)\,dy.
    $$

    Meanwhile, $(v\cdot\nabla P_kf)(x)=\sum_{j=1}^3v_j(x)\int_{\mathbb R^3}(\partial_jK_k)(x-y)f(y)\,dy$. Subtracting the second expression from the first yields the identity.

    (b) By the mean value theorem, $|v(x)-v(y)|\le\|\nabla v\|_{L^\infty}|x-y|$. Hence

    $$
    \big|([P_k,v\cdot\nabla]f)(x)\big|
    \le\|\nabla v\|_{L^\infty}\int_{\mathbb R^3}|x-y|\,|\nabla K_k(x-y)|\,|f(y)|\,dy.
    $$

    Since $\nabla K_k(w)=2^{4k}(\nabla K)(2^kw)$, changing variables $z=2^kw$ ($dw=2^{-3k}dz$) makes the $L^1$ norm of $w\mapsto|w|\,|\nabla K_k(w)|$ equal to $\int_{\mathbb R^3}|z|\,|\nabla K(z)|\,dz=C<\infty$, independent of $k$. Young's convolution inequality yields the bound for all $1\le p\le\infty$. (In a paraproduct refinement, replacing $v$ by $P_{\le k-10}v$ turns $\|\nabla P_{\le k-10}v\|_{L^\infty}$ into the low-frequency shear rate; high-frequency pieces of $v$ are estimated without moving derivatives onto $K_k$.)

!!! example "Exercise 2. Large critical norm with depleted self-stretching in one plate"

    Fix $N\gg1$, $0<\delta\ll1$, and a smooth real-valued divergence-free packet $u_0$ whose Fourier transform is supported in the symmetric pair of plates $\pm B$, where $B=[N,N+N\delta^2]\times[-N\delta,N\delta]^2$ has axis $e_1$. Normalize $\|u_0\|_{\dot H^{1/2}(\mathbb R^3)}=A\gg1$.

    (a) Compute the orders of $\|u_0\|_{L^2}$, $\|\omega_0\|_{L^2}$, and the global small-data invariant $\|u_0\|_{L^2}\|\omega_0\|_{L^2}$ of [Chapter 9](chapter-09.md#energy-comparison) in terms of $A$ and $N$.

    (b) Bound the initial stretching integral $|\mathcal T(\omega_0,\omega_0,\omega_0)|$ relative to the initial viscous dissipation $\|\nabla\omega_0\|_{L^2}^2$, and find how small $\delta$ must be in terms of $A$ so that $|\mathcal T(\omega_0,\omega_0,\omega_0)|\ll\|\nabla\omega_0\|_{L^2}^2$ at $t=0$.

??? solution "Solution"

    (a) Since $|\xi|\simeq N$ on $\pm B$ and $\nabla\cdot u_0=0$, we have $\|u_0\|_{L^2}\simeq N^{-1/2}A$, $\|\omega_0\|_{L^2}=\|\nabla u_0\|_{L^2}\simeq N^{1/2}A$, and

    $$
    \|u_0\|_{L^2}\|\omega_0\|_{L^2}\simeq A^2\gg1,
    $$

    independent of $N$ and $\delta$. Thus $u_0$ lies far outside the isotropic small-data region $\|u_0\|_{L^2}\|\omega_0\|_{L^2}\le c$ of Chapter 9.

    (b) Here $\omega_0=\nabla\times u_0$ is also divergence-free and has Fourier support in the same double plate $\pm B$ of volume $\simeq N^3\delta^4$ and angular width $O(\delta)$ around $e_1$ ($\theta=0$). Proposition 11.5 with $f=g=h=\omega_0$ and $\theta=0$ gives

    $$
    |\mathcal T(\omega_0,\omega_0,\omega_0)|\lesssim N^{3/2}\delta^3\|\omega_0\|_{L^2}^3\simeq N^3\delta^3A^3,
    $$

    whereas initial viscous dissipation satisfies $\|\nabla\omega_0\|_{L^2}^2\simeq N^2\|\omega_0\|_{L^2}^2\simeq N^3A^2$. Their ratio is

    $$
    \frac{|\mathcal T(\omega_0,\omega_0,\omega_0)|}{\|\nabla\omega_0\|_{L^2}^2}\lesssim\delta^3A.
    $$

    Choosing $\delta\ll A^{-1/3}$ makes initial vortex stretching negligible compared with initial viscous dissipation despite $\|u_0\|_{\dot H^{1/2}}=A\gg1$. (Actually, by [Chapter 8, Exercise](chapter-08.md#exercise), if $\operatorname{supp}\widehat\omega_0\subset+B\cup(-B)$ with $B\subset\{N\le\xi_1\le N(1+\delta^2)\}$, any three frequencies in $\pm B$ have $\xi_1$-sum near $\pm N$ or $\pm3N$, never zero! Thus $\mathcal T(\omega_0,\omega_0,\omega_0)=0$ *identically* at $t=0$; quadratic transport $u_0\cdot\nabla\omega_0$ first generates harmonics near $0$ and $\pm2N$, and Proposition 11.5 governs aligned interactions once neighboring shells are populated.)

[Previous: multilinear restriction and transport null structure](chapter-10.md) · [Next: stationary phase and wave dispersion](chapter-12.md)
