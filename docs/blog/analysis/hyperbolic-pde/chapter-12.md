---
title: "Chapter 12: Stationary Phase, Light-Cone Geometry, and Wave Dispersion"
date: 2026-11-13
description: Half-wave propagators, spherical spreading and null forms, non-stationary and stationary phase, and the frequency-localized dispersive bound on the light cone.
hide:
  - navigation
categories:
  - 分析
  - Hyperbolic PDEs
tags:
  - hyperbolic-pde
  - harmonic-analysis
  - scattering
  - course
---

# Chapter 12: Stationary Phase, Light-Cone Geometry, and Wave Dispersion { #chapter-12 }

Unlike the heat multiplier $e^{-t|\xi|^2}$, the wave multiplier $e^{\pm it|\xi|}$ has modulus one at every frequency: a free wave never loses $L^2$ energy, so any amplitude decay in physical space must come from cancellation among oscillating modes. This chapter connects the half-wave representation to Fourier extension from the characteristic cone, motivates spacetime norms and null forms in nonlinear wave equations, proves non-stationary and stationary phase estimates from scratch, and derives the sharp frequency-localized $L^1\to L^\infty$ dispersive decay of the wave equation.

We work on $\mathbb R^{1+n}$ with $n\ge2$, $\Box=\partial_t^2-\Delta_x$, and the spatial Fourier convention of [Chapter 5](chapter-05.md#motivation):

$$
\widehat f(\xi)=\int_{\mathbb R^n}e^{-ix\cdot\xi}f(x)\,dx,
\qquad
f(x)=\frac1{(2\pi)^n}\int_{\mathbb R^n}e^{ix\cdot\xi}\widehat f(\xi)\,d\xi.
$$

## 1. Half-waves and the characteristic light cone { #half-waves }

Consider the linear Cauchy problem

$$
\Box u=0,\qquad u(0,x)=f(x),\qquad\partial_tu(0,x)=g(x).
\tag{1.1}
$$

Taking the spatial Fourier transform converts (1.1) into a family of harmonic oscillators $\partial_t^2\widehat u(t,\xi)+|\xi|^2\widehat u(t,\xi)=0$, solved for each $\xi\in\mathbb R^n$ by

$$
\widehat u(t,\xi)=\cos(t|\xi|)\widehat f(\xi)+\frac{\sin(t|\xi|)}{|\xi|}\widehat g(\xi),
\tag{1.2}
$$

with $\sin(t|\xi|)/|\xi|$ equal to $t$ at $\xi=0$. Let $D=\sqrt{-\Delta_x}$ denote the Fourier multiplier with symbol $|\xi|$. When $\widehat f$ and $|\xi|^{-1}\widehat g$ are locally integrable (for instance when $f,g$ have Fourier support away from the origin, or when $f\in\dot H^s$, $g\in\dot H^{s-1}$ with $s>1-\frac n2$), Euler's formulas split $u$ into two **half-waves**:

$$
u(t)=e^{itD}f_++e^{-itD}f_-,
\qquad
\widehat f_\pm(\xi)=\frac12\left(\widehat f(\xi)\pm\frac{\widehat g(\xi)}{i|\xi|}\right)\quad(\xi\ne0).
\tag{1.3}
$$

Time reversal $t\mapsto-t$ exchanges the two branches, so dispersive and mixed-norm estimates for $u$ reduce to estimates for the single propagator

$$
e^{itD}h(x)=\frac1{(2\pi)^n}\int_{\mathbb R^n}e^{i(x\cdot\xi+t|\xi|)}\widehat h(\xi)\,d\xi.
\tag{1.4}
$$

**Connection with cone extension.** In spacetime Fourier variables $(\tau,\xi)\in\mathbb R\times\mathbb R^n$, the distribution $e^{itD}h$ is supported on the forward light cone $\mathcal C_+=\{(\tau,\xi):\tau=|\xi|\}$. Specifically, defining the cone measure $d\mu_{\mathcal C_+}(\tau,\xi)=\delta(\tau-|\xi|)\,d\tau\,d\xi$ and the extension operator

$$
E_{\mathcal C_+}F(t,x)=\frac1{(2\pi)^n}\int_{\mathbb R^{1+n}}e^{i(t\tau+x\cdot\xi)}F(\xi)\,\delta(\tau-|\xi|)\,d\tau\,d\xi,
\tag{1.5}
$$

integrating out $\tau$ recovers $e^{itD}h=E_{\mathcal C_+}\widehat h$, while $e^{-itD}$ lives on the backward sheet $\mathcal C_-=\{\tau=-|\xi|\}$. Up to $(2\pi)$ factors, $E_{\mathcal C_+}$ is the formal adjoint of restricting a spacetime Fourier transform $\widetilde G(\tau,\xi)$ to $\mathcal C_+$. As in [Chapter 6](chapter-06.md#restriction), the analytical strength of $E_{\mathcal C_+}$ is governed by how curved $\mathcal C_+$ is.

## 2. Energy conservation, spherical spreading, and null forms { #energy-and-null-forms }

Multiplying $\Box u=0$ by $\partial_tu$ and integrating by parts on $\mathbb R^n$ shows that smooth, rapidly decaying real solutions conserve the homogeneous energy:

$$
\frac d{dt}\,\frac12\int_{\mathbb R^n}\big(|\partial_tu(t,x)|^2+|\nabla_xu(t,x)|^2\big)\,dx=0,
$$

so $\|u(t)\|_{\dot H^1}+\|\partial_tu(t)\|_{L^2}\simeq\|f\|_{\dot H^1}+\|g\|_{L^2}$ for all $t\in\mathbb R$. Conservation fixes the total energy at every instant, but does not by itself prevent energy from concentrating, nor does it capture spatial spreading.

**Outgoing spherical shells in three dimensions.** Suppose a smooth pulse in $\mathbb R^3$ propagates outward at unit speed, occupying at large time $t>0$ a spherical shell of radius $r\simeq t$, fixed thickness $O(1)$, and surface area $4\pi r^2$. If its spatial gradient inside the shell has amplitude $A(r)$, energy conservation suggests

$$
4\pi r^2A(r)^2\simeq\text{const}
\quad\Longrightarrow\quad
A(r)\simeq r^{-1}\simeq t^{-1}.
$$

This heuristic is realized explicitly away from the origin by the outgoing radial wave $u(t,r)=r^{-1}F(r-t)$ ($r=|x|>0$), whose profile $F$ translates undistorted along $r=t+\text{const}$ while the geometric factor $r^{-1}$ attenuates its amplitude. Turning this picture into a theorem for arbitrary nonradial data requires Fourier analysis on dyadic shells ([Section 5](#dispersive-estimate)).

**Why spacetime decay matters for nonlinear waves.** For semilinear power equations $\Box u=\pm|u|^{p-1}u$ on $\mathbb R^{1+3}$ (such as the energy-subcritical and energy-critical powers $2\le p\le5$), Duhamel's formula measures the nonlinear forcing in $L_t^1L_x^2$ when evolving in the energy space $\dot H^1\times L^2$. For $p=3$, as in [Chapter 4](chapter-04.md#massless) and [Chapter 7](chapter-07.md#nonlinear-motivation),

$$
\|u^3\|_{L_t^1L_x^2(I\times\mathbb R^3)}=\|u\|_{L_t^3L_x^6(I\times\mathbb R^3)}^3,
$$

so finiteness of $\|u\|_{L_t^3L_x^6([0,\infty)\times\mathbb R^3)}$ implies energy-space scattering of a global solution to a free wave. Although $\|u\|_{L_t^3L_x^6}<\infty$ is a valid scattering criterion for an energy solution of $\Box u=\pm u^3$, the homogeneous free-wave Strichartz bound in $L_t^3L_x^6(\mathbb R^{1+3})$ does *not* sit at energy regularity $\dot H^1\times L^2$: by [Chapter 6](chapter-06.md#strichartz) (proved in [Chapter 13](chapter-13.md)), $(q,r)=(3,6)$ in $n=3$ requires data in $\dot H^{2/3}\times\dot H^{-1/3}$ ($s=\frac32-\frac36-\frac13=\frac23$), and $\dot H^1\times L^2$ does not embed into $\dot H^{2/3}\times\dot H^{-1/3}$ at low frequencies. Instead, $\dot H^1\times L^2$ ($s=1$) is scaling-critical for the *quintic* wave $\Box u=\pm u^5$ (where $\|u^5\|_{L_t^1L_x^2}=\|u\|_{L_t^5L_x^{10}}^5$ and $(5,10)$ has $s=1$), while the *cubic* wave $\Box u=\pm u^3$ is scaling-critical in $\dot H^{1/2}\times\dot H^{-1/2}$ via $L_{t,x}^4(\mathbb R^{1+3})$ ([Chapter 14](chapter-14.md#critical-cubic-wave)); for inhomogeneous $H^1\times L^2$ data, local $L_t^3L_x^6$ control interpolates between $\dot H^1$ and $L^2$ on finite time intervals.

**Derivative nonlinearities and null forms.** When the nonlinearity depends on $\partial u=(\partial_tu,\nabla_xu)$, amplitude decay alone may not suffice in three dimensions, because $\int_1^\infty t^{-1}\,dt=\infty$ fails to be integrable. Direction of propagation then becomes decisive. Contrast $(\partial_tu)^2$ with Klainerman's **null form**

$$
Q_{ij}(v,w)=\partial_iv\,\partial_jw-\partial_jv\,\partial_iw
\qquad(0\le i<j\le n,\ \partial_0=\partial_t).
\tag{2.1}
$$

For plane waves $v=e^{i\xi_\alpha x^\alpha}$ and $w=e^{i\eta_\alpha x^\alpha}$ ($x^0=t$), the bilinear symbol of $Q_{ij}$ is $-(\xi_i\eta_j-\xi_j\eta_i)$, which vanishes whenever the spacetime covectors $\xi$ and $\eta$ are parallel. More generally, a quadratic derivative form $N(\partial v,\partial w)$ satisfies the **classical null condition** if its symbol vanishes on $(\ell,\ell)$ for every null covector $\ell$ ($\ell_0^2=|\ell'|^2$). Two wave packets traveling in transverse directions cross rapidly, whereas two packets sharing a null ray remain overlapped for long times; a null form cancels precisely that collinear self-interaction, mirroring the algebraic tensor $q_1\otimes q_2-q_2\otimes q_1$ of [Chapter 10](chapter-10.md#repeated-source).

In semilinear models $\Box u=N(\partial u,\partial u)$, the wave cone is fixed. In *quasilinear* equations, the principal metric itself depends on $u$: compressible Euler waves deform their sound cones and can form shocks in finite time, whereas Einstein's vacuum equations in wave coordinates combine classical null forms with a subtler *weak null structure* [[1]](#references) that still permits global small-data dispersion.

## 3. Non-stationary phase { #nonstationary-phase }

How do rapid oscillations create decay? A one-dimensional improper integral shows the mechanism in miniature: for $0\le A<B$, writing $e^{ie^\xi}=(ie^\xi)^{-1}\frac d{d\xi}(e^{ie^\xi})$ and integrating by parts gives

$$
\int_A^Be^{ie^\xi}\,d\xi=\left[\frac{e^{ie^\xi}}{ie^\xi}\right]_A^B+\frac1i\int_A^Be^{-\xi}e^{ie^\xi}\,d\xi,
\qquad
\left|\int_A^Be^{ie^\xi}\,d\xi\right|\le e^{-B}+e^{-A}+\int_A^Be^{-\xi}\,d\xi=2e^{-A}.
$$

Thus $\int_0^\infty e^{ie^\xi}\,d\xi$ converges conditionally by Cauchy's criterion even though $|e^{ie^\xi}|\equiv1$: dividing by the growing phase derivative $e^\xi$ produces an integrable weight. On $\mathbb R^d$ ($d\ge1$), the same integration-by-parts operator yields rapid decay in a large parameter $\lambda$ wherever the phase gradient is nonzero.

!!! lemma "Lemma 12.1. Non-stationary phase"

    Let $a\in C_c^\infty(\mathbb R^d)$ and let $\phi$ be real-valued and smooth on an open neighborhood $U$ of $\operatorname{supp}a$. Put

    $$
    I(\lambda)=\int_{\mathbb R^d}e^{i\lambda\phi(\xi)}a(\xi)\,d\xi.
    \tag{3.1}
    $$

    If $\nabla\phi(\xi)\ne0$ for all $\xi\in\operatorname{supp}a$, then for every integer $m\ge0$ there is $C_{m,a,\phi}<\infty$ such that

    $$
    |I(\lambda)|\le C_{m,a,\phi}|\lambda|^{-m}
    \qquad(|\lambda|\ge1).
    \tag{3.2}
    $$

??? proof "Proof"

    By compactness of $\operatorname{supp}a$ and continuity of $\nabla\phi$, there is an open neighborhood $U_0\Subset U$ of $\operatorname{supp}a$ on which $|\nabla\phi(\xi)|\ge c_0>0$. On $U_0$, the vector field $V(\xi)=\nabla\phi(\xi)/|\nabla\phi(\xi)|^2$ is smooth and satisfies $V\cdot\nabla\phi=1$. Define the first-order differential operator

    $$
    L=\frac1{i\lambda}V(\xi)\cdot\nabla_\xi,
    \qquad
    Le^{i\lambda\phi(\xi)}=e^{i\lambda\phi(\xi)}.
    $$

    Its formal transpose under integration on $U_0$ is

    $$
    (L^{\mathrm t}b)(\xi)=-\frac1{i\lambda}\nabla_\xi\cdot\big(V(\xi)b(\xi)\big).
    $$

    Because $a$ is compactly supported inside $U_0$, integrating by parts $m$ times produces no boundary terms:

    $$
    I(\lambda)=\int_{U_0}\big(L^me^{i\lambda\phi(\xi)}\big)a(\xi)\,d\xi
    =\int_{U_0}e^{i\lambda\phi(\xi)}\big((L^{\mathrm t})^ma\big)(\xi)\,d\xi.
    $$

    Each application of $L^{\mathrm t}$ brings a factor $|\lambda|^{-1}$ and differentiates $V$ and $a$ on the compact set $\operatorname{supp}a$, where all derivatives of $V$ and $a$ are bounded. Taking absolute values gives $|I(\lambda)|\le\|(L^{\mathrm t})^ma\|_{L^1(\operatorname{supp}a)}\le C_{m,a,\phi}|\lambda|^{-m}$.

Notice that $C_{m,a,\phi}$ depends only on $\operatorname{diam}(\operatorname{supp}a)$, a lower bound $c_0$ for $|\nabla\phi|$ on $\operatorname{supp}a$, $\|\phi\|_{C^{m+1}(\operatorname{supp}a)}$, and $\|a\|_{C^m(\operatorname{supp}a)}$—so Lemma 12.1 holds uniformly across compact parameter families of phases and amplitudes satisfying those bounds.

## 4. Stationary phase at a nondegenerate critical point { #stationary-phase }

At a critical point $\nabla\phi(\xi_0)=0$, the vector field $V=\nabla\phi/|\nabla\phi|^2$ becomes singular and Lemma 12.1 breaks down. When the Hessian $H=\nabla^2\phi(\xi_0)$ is invertible, $\lambda\phi(\xi)-\lambda\phi(\xi_0)$ varies by $O(1)$ on a ball of radius $|\lambda|^{-1/2}$ around $\xi_0$, where oscillation cannot cancel the integral; outside that ball, quantitative integration by parts matches the volume of the $|\lambda|^{-1/2}$-core.

!!! theorem "Theorem 12.2. Stationary phase bound"

    Let $a\in C_c^\infty(\mathbb R^d)$ and let $\phi$ be real and smooth near $\operatorname{supp}a$. Suppose $\xi_0\in\operatorname{supp}a$ is the unique critical point of $\phi$ on $\operatorname{supp}a$, and its Hessian $H=\nabla^2\phi(\xi_0)$ is invertible. Then there is $C_{a,\phi}<\infty$ such that

    $$
    \left|\int_{\mathbb R^d}e^{i\lambda\phi(\xi)}a(\xi)\,d\xi\right|\le C_{a,\phi}|\lambda|^{-d/2}
    \qquad(|\lambda|\ge1).
    \tag{4.1}
    $$

    By a smooth partition of unity and Lemma 12.1, the same $|\lambda|^{-d/2}$ bound holds whenever $\phi$ has finitely many critical points on $\operatorname{supp}a$, all nondegenerate.

??? proof "Proof"

    Translate $\xi_0$ to $0$ and factor out the unimodular constant $e^{i\lambda\phi(0)}$, so $\phi(0)=0$, $\nabla\phi(0)=0$, and $\Lambda:=|\lambda|\ge1$. By Taylor's theorem, $\nabla\phi(\xi)=H\xi+O(|\xi|^2)$. Because $H$ is invertible, $|H\xi|\ge2c_0|\xi|$ for $c_0=\frac12\|H^{-1}\|_{\mathrm{op}}^{-1}>0$, so choosing $r_0>0$ small ensures $|\nabla\phi(\xi)|\ge c_0|\xi|$ and $|\nabla_\zeta\widetilde\phi_r(\zeta)|\ge\frac12c_0$ on $\{\frac12\le|\zeta|\le2\}$ for the rescaled phases $\widetilde\phi_r(\zeta)=r^{-2}\phi(r\zeta)$ ($0<r\le r_0$). Multiplying $a$ by a smooth cutoff $\eta_0\in C_c^\infty(B(0,r_0))$ equal to $1$ near $0$ changes $I(\lambda)$ by $O_m(\Lambda^{-m})$ via Lemma 12.1; rename $\eta_0a$ to $a$.

    *Splitting at scale $\Lambda^{-1/2}$.* Fix $\psi\in C_c^\infty(B(0,2))$ with $0\le\psi\le1$ and $\psi=1$ on $B(0,1)$. Write $I(\lambda)=I_{\mathrm{near}}+I_{\mathrm{far}}$ with

    $$
    I_{\mathrm{near}}=\int_{\mathbb R^d}e^{i\lambda\phi(\xi)}\psi(\sqrt\Lambda\xi)a(\xi)\,d\xi,
    \qquad
    I_{\mathrm{far}}=\int_{\mathbb R^d}e^{i\lambda\phi(\xi)}b(\xi)\,d\xi,
    \qquad b(\xi)=\big(1-\psi(\sqrt\Lambda\xi)\big)a(\xi).
    $$

    On the near piece, the support has volume $|B(0,2\Lambda^{-1/2})|\simeq_d\Lambda^{-d/2}$, so immediately

    $$
    |I_{\mathrm{near}}|\le\|a\|_{L^\infty}|B(0,2\Lambda^{-1/2})|\lesssim_d\|a\|_{L^\infty}\Lambda^{-d/2}.
    \tag{4.2}
    $$

    *Derivative bounds on the far piece.* If $\Lambda^{-1/2}\ge r_0$, then $b\equiv0$ and $I_{\mathrm{far}}=0$. Otherwise $\operatorname{supp}b\subset\{\Lambda^{-1/2}\le|\xi|\le r_0\}$. For any fixed $r\in(0,r_0]$ and $\frac12\le|\zeta|\le2$, Taylor's remainder gives $\|\widetilde\phi_r\|_{C^k(\{1/2\le|\zeta|\le2\})}\lesssim_k1$ uniformly in $r$, and $|\nabla_\zeta\widetilde\phi_r(\zeta)|\ge\frac12c_0$. Hence $\widetilde V_r(\zeta):=\nabla_\zeta\widetilde\phi_r(\zeta)/|\nabla_\zeta\widetilde\phi_r(\zeta)|^2$ has all $\zeta$-derivatives bounded uniformly in $r\in(0,r_0]$. Since $V(\xi):=\nabla\phi(\xi)/|\nabla\phi(\xi)|^2=r^{-1}\widetilde V_r(\xi/r)$, differentiating with respect to $\xi$ and setting $r=|\xi|$ yields

    $$
    |\partial_\xi^\alpha V(\xi)|\lesssim_\alpha|\xi|^{-1-|\alpha|}
    \qquad(0<|\xi|\le r_0).
    $$

    Meanwhile, $\partial_\xi^\alpha[1-\psi(\sqrt\Lambda\xi)]$ vanishes outside $\Lambda^{-1/2}\le|\xi|\le2\Lambda^{-1/2}$, where $\Lambda^{1/2}\le2|\xi|^{-1}$; together with the smoothness of $a$, the product rule gives $|\partial_\xi^\alpha b(\xi)|\lesssim_{\alpha,a}|\xi|^{-|\alpha|}$ on $\operatorname{supp}b$.

    *Inductive integration by parts.* With $L^{\mathrm t}c=-\frac1{i\lambda}\nabla_\xi\cdot(Vc)$, if a smooth function $c$ satisfies $|\partial^\alpha c(\xi)|\lesssim_\alpha|\xi|^{-k-|\alpha|}$, then the product rule on $\nabla_\xi\cdot(Vc)$ gives $|\partial^\alpha(L^{\mathrm t}c)(\xi)|\lesssim_\alpha\Lambda^{-1}|\xi|^{-k-2-|\alpha|}$. Starting from $c=b$ ($k=0$) and iterating $m$ times yields

    $$
    \big|\big((L^{\mathrm t})^mb\big)(\xi)\big|\lesssim_{m,a,\phi}\Lambda^{-m}|\xi|^{-2m}.
    $$

    Choose an integer $m>d/2$. Because $b$ vanishes identically in $B(0,\Lambda^{-1/2})$ and outside $B(0,r_0)$, $m$-fold integration by parts has no boundary terms, and polar coordinates give

    $$
    |I_{\mathrm{far}}|\le\int_{\Lambda^{-1/2}\le|\xi|\le r_0}\big|\big((L^{\mathrm t})^mb\big)(\xi)\big|\,d\xi
    \lesssim_{m,a,\phi}\Lambda^{-m}\int_{\Lambda^{-1/2}}^{r_0}r^{d-1-2m}\,dr
    \le\frac1{2m-d}\Lambda^{-m}(\Lambda^{-1/2})^{d-2m}
    =\frac1{2m-d}\Lambda^{-d/2}.
    \tag{4.3}
    $$

    Adding (4.2) and (4.3) proves (4.1).

## 5. Curvature of the cone and the dispersive wave estimate { #dispersive-estimate }

Return to the frequency-localized half-wave $e^{itD}P_Nh$ on $\mathbb R^n$ ($n\ge2$), where $P_N=\chi(D/N)$ for a smooth radial cutoff $\chi\in C_c^\infty((0,\infty))$ supported in $[1/2,2]$. Its phase is

$$
\Phi(\xi)=x\cdot\xi+t|\xi|,
\qquad
\nabla_\xi\Phi(\xi)=x+t\,\frac\xi{|\xi|},
\qquad
\nabla_\xi^2|\xi|=\frac1{|\xi|}(I-\omega\otimes\omega)\quad(\omega=\xi/|\xi|).
\tag{5.1}
$$

Two geometric features of (5.1) control the entire dispersive theory of the wave equation:

1. For $t\ne0$, $\nabla_\xi\Phi(\xi)=0$ holds if and only if $|x|=|t|$ and $\omega=-\operatorname{sgn}(t)\,x/|x|$: stationarity occurs *only* on the light cone $|x|=|t|$.
2. The Hessian $\nabla_\xi^2|\xi|$ vanishes along the radial direction $\omega$ and equals $|\xi|^{-1}I_{\omega^\perp}$ on the $(n-1)$-dimensional tangent plane $\omega^\perp$: the cone is radially flat and curved in the $n-1$ angular directions.

Consequently, stationary phase must be applied on the unit sphere $\mathbb S^{n-1}$, not directly on $\mathbb R^n$.

!!! lemma "Lemma 12.3. Decay of the spherical Fourier transform"

    For $n\ge2$, there is a dimensional constant $C_n$ such that for all $\rho>0$ and $x\in\mathbb R^n$,

    $$
    |I(\rho,x)|:=\left|\int_{\mathbb S^{n-1}}e^{i\rho x\cdot\omega}\,d\sigma(\omega)\right|
    \le C_n(1+\rho|x|)^{-\frac{n-1}2}.
    \tag{5.2}
    $$

??? proof "Proof"

    If $\rho|x|\le1$, the trivial area bound $|I(\rho,x)|\le|\mathbb S^{n-1}|$ suffices. Assume $\lambda:=\rho|x|\ge1$. By rotational invariance of $d\sigma$, rotate coordinates so that $x=|x|e_n$; then $\rho x\cdot\omega=\lambda\omega_n$.

    Cover $\mathbb S^{n-1}$ by a smooth partition of unity $\eta_++\eta_-+\eta_{\mathrm{eq}}=1$, where $\eta_\pm$ are supported in the polar caps $\{|\omega'|\le\frac12,\ \pm\omega_n>0\}$ ($\omega'=(\omega_1,\dots,\omega_{n-1})$) and $\eta_{\mathrm{eq}}$ is supported where $|\omega_n|\le\frac{15}{16}$.

    *Polar caps.* Parameterize the upper cap by $z=\omega'\in B(0,1/2)\subset\mathbb R^{n-1}$, with $\omega_n(z)=\sqrt{1-|z|^2}$ and surface measure $(1-|z|^2)^{-1/2}\,dz$. On $B(0,1/2)$, $\nabla_z\omega_n(z)=-z/\sqrt{1-|z|^2}$ vanishes only at $z=0$, where $\nabla_z^2\omega_n(0)=-I_{n-1}$ is invertible. Theorem 12.2 in $d=n-1$ variables bounds the upper-cap integral by $C_n\lambda^{-(n-1)/2}$, and the lower cap $\omega_n(z)=-\sqrt{1-|z|^2}$ ($\nabla_z^2\omega_n(0)=+I_{n-1}$) gives the same bound.

    *Equatorial belt.* Cover $\operatorname{supp}\eta_{\mathrm{eq}}$ by $2(n-1)$ coordinate charts projecting onto the remaining coordinate hyperplanes. On a chart where $|\omega_j|\ge\frac1{4\sqrt n}$ ($1\le j\le n-1$), write $\omega_j=\pm\sqrt{1-\omega_n^2-\sum_{k\notin\{j,n\}}\omega_k^2}$ with $\omega_n$ itself as one of the $n-1$ local coordinates; the phase $\omega_n$ then has unit gradient $|\nabla\omega_n|\equiv1\ne0$, so Lemma 12.1 gives $O_m(\lambda^{-m})$ for every $m\ge0$. Summing all pieces yields (5.2).

!!! theorem "Theorem 12.4. Frequency-localized dispersive estimate for the wave equation"

    Let $n\ge2$, let $\chi\in C_c^\infty([1/2,2])$, and set $P_N=\chi(D/N)$ for $N>0$. The convolution kernel $K_N(t,x)=(2\pi)^{-n}\int_{\mathbb R^n}e^{i(x\cdot\xi+t|\xi|)}\chi(|\xi|/N)\,d\xi$ of $e^{itD}P_N$ satisfies

    $$
    |K_N(t,x)|\le C_{n,\chi}\,N^n(1+N|t|)^{-\frac{n-1}2}
    \qquad\big(\forall\,(t,x)\in\mathbb R^{1+n}\big).
    \tag{5.3}
    $$

    Consequently, for every $h\in L^1(\mathbb R^n)$ and $t\in\mathbb R$,

    $$
    \|e^{itD}P_Nh\|_{L^\infty(\mathbb R^n)}\le C_{n,\chi}\,N^n(1+N|t|)^{-\frac{n-1}2}\|h\|_{L^1(\mathbb R^n)},
    \tag{5.4}
    $$

    and for $t\ne0$ in pure-power form, $\|e^{itD}P_Nh\|_{L^\infty(\mathbb R^n)}\le C_{n,\chi}N^{\frac{n+1}2}|t|^{-\frac{n-1}2}\|h\|_{L^1(\mathbb R^n)}$.

??? proof "Proof"

    Substituting $\xi=N\rho\omega$ with $\rho\in[1/2,2]$ and $\omega\in\mathbb S^{n-1}$ gives

    $$
    K_N(t,x)=\frac{N^n}{(2\pi)^n}\int_{\mathbb S^{n-1}}\int_{1/2}^2e^{iN\rho(t+x\cdot\omega)}\chi(\rho)\rho^{n-1}\,d\rho\,d\omega
    =\frac{N^n}{(2\pi)^n}\int_{1/2}^2e^{iN\rho t}\chi(\rho)\rho^{n-1}I(N\rho,x)\,d\rho.
    \tag{5.5}
    $$

    *Case 1: Short oscillation times $N|t|\le1$.* Taking absolute values inside the first integral in (5.5) gives $|K_N(t,x)|\lesssim_{n,\chi}N^n\simeq N^n(1+N|t|)^{-(n-1)/2}$.

    *Case 2: Deep inside the light cone, $N|t|>1$ and $|x|<\frac12|t|$.* For every $\omega\in\mathbb S^{n-1}$, $|t+x\cdot\omega|\ge|t|-|x|>\frac12|t|$. In the inner radial integral $\int_{1/2}^2e^{iN(t+x\cdot\omega)\rho}\chi(\rho)\rho^{n-1}\,d\rho$, the smooth compactly supported amplitude $\chi(\rho)\rho^{n-1}$ vanishes near the endpoints $1/2$ and $2$, while the linear phase in $\rho$ has derivative $N(t+x\cdot\omega)$ of modulus at least $\frac12N|t|$. Integrating by parts $m$ times in $\rho$ gives

    $$
    |K_N(t,x)|\lesssim_{m,n,\chi}N^n(N|t|)^{-m}.
    $$

    Choosing any integer $m\ge\frac{n-1}2$ yields $|K_N(t,x)|\lesssim_{n,\chi}N^n(1+N|t|)^{-(n-1)/2}$.

    *Case 3: Near or outside the light cone, $N|t|>1$ and $|x|\ge\frac12|t|$.* For $\rho\in[1/2,2]$, $N\rho|x|\ge\frac14N|t|$, so Lemma 12.3 gives $|I(N\rho,x)|\lesssim_n(1+N\rho|x|)^{-(n-1)/2}\lesssim_n(1+N|t|)^{-(n-1)/2}$. Inserting this into the second expression in (5.5) bounds $|K_N(t,x)|\lesssim_{n,\chi}N^n(1+N|t|)^{-(n-1)/2}$.

    Combining all three cases proves (5.3). Since $e^{itD}P_Nh=K_N(t,\cdot)*h$, Young's inequality $\|K_N(t,\cdot)*h\|_{L^\infty}\le\|K_N(t,\cdot)\|_{L^\infty}\|h\|_{L^1}$ gives (5.4), and $(1+N|t|)^{-(n-1)/2}\le(N|t|)^{-(n-1)/2}$ yields the pure-power bound.

In three dimensions ($n=3$), $(1+N|t|)^{-(n-1)/2}=(1+N|t|)^{-1}$, matching the $t^{-1}$ spherical-shell decay of [Section 2](#energy-and-null-forms): each of the two curved angular directions contributes $t^{-1/2}$. Deep inside the cone ($|x|<\frac12|t|$), even radial frequencies cancel one another, producing rapid decay $(N|t|)^{-m}$; on the front $|x|=|t|$, radial frequencies stay completely in phase along $\omega=-\operatorname{sgn}(t)x/|x|$, and only angular directions within $(N|t|)^{-1/2}$ of that ray add coherently. In [Chapter 13](chapter-13.md), we combine Theorem 12.4 with $L^2$ conservation via the spacetime $TT^*$ method to prove the full range of wave Strichartz estimates.

## 6. Exercises { #exercises }

!!! example "Exercise 1. Degenerate stationary phase in one dimension"

    Let $k\ge2$ be an integer and $a\in C_c^\infty(\mathbb R)$. Prove that there is $C_{k,a}<\infty$ such that

    $$
    \left|\int_{\mathbb R}e^{i\lambda\xi^k}a(\xi)\,d\xi\right|\le C_{k,a}|\lambda|^{-1/k}
    \qquad(|\lambda|\ge1).
    $$

??? solution "Solution"

    Put $\Lambda=|\lambda|\ge1$ and choose $\psi\in C_c^\infty((-2,2))$ with $0\le\psi\le1$ and $\psi=1$ on $[-1,1]$. Split $a(\xi)=\psi(\Lambda^{1/k}\xi)a(\xi)+b(\xi)$, where $b(\xi)=(1-\psi(\Lambda^{1/k}\xi))a(\xi)$ is supported in $|\xi|\ge\Lambda^{-1/k}$. The near integral has length $4\Lambda^{-1/k}$, giving $|\int e^{i\lambda\xi^k}\psi(\Lambda^{1/k}\xi)a(\xi)\,d\xi|\le4\|a\|_{L^\infty}\Lambda^{-1/k}$.

    On $\operatorname{supp}b$, $(\xi^k)'=k\xi^{k-1}\ne0$. One integration by parts with $e^{i\lambda\xi^k}=\frac1{ik\lambda\xi^{k-1}}\frac d{d\xi}(e^{i\lambda\xi^k})$ gives

    $$
    \int_{\mathbb R}e^{i\lambda\xi^k}b(\xi)\,d\xi
    =-\frac1{ik\lambda}\int_{|\xi|\ge\Lambda^{-1/k}}e^{i\lambda\xi^k}\frac d{d\xi}\big(\xi^{1-k}b(\xi)\big)\,d\xi.
    $$

    Expand $\frac d{d\xi}(\xi^{1-k}b)=(1-k)\xi^{-k}b+\xi^{1-k}b'$. Since $|b|\le\|a\|_\infty$ and $|b'(\xi)|\le\Lambda^{1/k}\|\psi'\|_\infty\|a\|_\infty\mathbf 1_{\{\Lambda^{-1/k}\le|\xi|\le2\Lambda^{-1/k}\}}+\|a'\|_\infty\mathbf 1_{\operatorname{supp}a}$, integrating over $|\xi|\ge\Lambda^{-1/k}$ (remembering $k\ge2$, so $\int_{\Lambda^{-1/k}}^\infty r^{-k}\,dr=\frac1{k-1}\Lambda^{(k-1)/k}$ and $\int_{\Lambda^{-1/k}}^{R_a}r^{1-k}\,dr\lesssim_a1+\log\Lambda$ for $k=2$ or $\Lambda^{(k-2)/k}$ for $k\ge3$) gives

    $$
    \left|\int_{\mathbb R}e^{i\lambda\xi^k}b(\xi)\,d\xi\right|
    \lesssim_{k,a}\Lambda^{-1}\Big(\Lambda^{\frac{k-1}k}+\Lambda^{\frac1k}\cdot\Lambda^{\frac{k-2}k}+\Lambda^{\frac{k-2}k}(1+\mathbf 1_{\{k=2\}}\log\Lambda)\Big)
    \lesssim_{k,a}\Lambda^{-1/k},
    $$

    because $\Lambda^{-1}\log\Lambda\le\Lambda^{-1/2}$ for $\Lambda\ge1$. Thus higher-order vanishing of curvature slows oscillatory decay from $\Lambda^{-1/2}$ to $\Lambda^{-1/k}$.

!!! example "Exercise 2. Massive Klein–Gordon dispersion versus the massless wave"

    For the Klein–Gordon dispersion relation $\langle\xi\rangle=\sqrt{1+|\xi|^2}$ on $\mathbb R^n$ ($n\ge1$) and a fixed unit-annulus cutoff $\chi\in C_c^\infty([1/2,2])$, prove that

    $$
    \|e^{it\sqrt{1-\Delta}}\chi(D)h\|_{L^\infty(\mathbb R^n)}\le C_{n,\chi}(1+|t|)^{-n/2}\|h\|_{L^1(\mathbb R^n)}
    \qquad(\forall\,t\in\mathbb R),
    $$

    and explain geometrically why the decay rate is $|t|^{-n/2}$ rather than $|t|^{-(n-1)/2}$.

??? solution "Solution"

    The kernel is $K_{\mathrm{KG}}(t,x)=(2\pi)^{-n}\int_{\mathbb R^n}e^{i(x\cdot\xi+t\langle\xi\rangle)}\chi(|\xi|)\,d\xi$, bounded trivially by $O(1)$ when $|t|\le1$. For $|t|>1$, write the phase as $|t|\phi_v(\xi)$ with $\phi_v(\xi)=\operatorname{sgn}(t)\langle\xi\rangle+v\cdot\xi$ and $v=x/|t|$. Compute the gradient and Hessian of $\langle\xi\rangle$:

    $$
    \nabla_\xi\langle\xi\rangle=\frac\xi{\langle\xi\rangle},
    \qquad
    \nabla_\xi^2\langle\xi\rangle=\frac1{\langle\xi\rangle}\left(I-\frac{\xi\otimes\xi}{1+|\xi|^2}\right).
    $$

    On $\operatorname{supp}\chi(|\cdot|)\subset\{\frac12\le|\xi|\le2\}$, $\langle\xi\rangle\in[\frac{\sqrt5}2,\sqrt5]$ and $|\nabla_\xi\langle\xi\rangle|\le\frac2{\sqrt5}<1$.

    *If $|v|\ge\frac{1+\frac2{\sqrt5}}2$:* then $|\nabla_\xi\phi_v(\xi)|\ge|v|-\frac2{\sqrt5}\ge c_0>0$ uniformly on $\operatorname{supp}\chi(|\cdot|)$, so Lemma 12.1 gives $|K_{\mathrm{KG}}(t,x)|\lesssim_m|t|^{-m}$ for every $m$ (faster-than-group-velocity exterior).

    *If $|v|<\frac{1+\frac2{\sqrt5}}2$:* for any unit vector $w\in\mathbb S^{n-1}$,

    $$
    w^T\big(\nabla_\xi^2\langle\xi\rangle\big)w=\frac{1+|\xi|^2-(w\cdot\xi)^2}{\langle\xi\rangle^3}\ge\frac1{\langle\xi\rangle^3}\ge5^{-3/2}>0
    \qquad(|\xi|\le2).
    $$

    Thus $\nabla_\xi^2\phi_v=\pm\nabla_\xi^2\langle\xi\rangle$ is strictly definite across *all $n$ directions*, including the radial direction! Strict convexity/concavity on $\mathbb R^n$ ensures $\nabla_\xi\phi_v(\xi)=0$ has at most one solution $\xi_*(v)$ (explicitly $\xi_*=-\operatorname{sgn}(t)v/\sqrt{1-|v|^2}$); whether $\xi_*(v)$ lies inside, near, or away from $\{\frac12\le|\xi|\le2\}$, applying Theorem 12.2 in $d=n$ variables on a neighborhood of $\xi_*(v)$ and Lemma 12.1 outside gives $|K_{\mathrm{KG}}(t,x)|\lesssim_{n,\chi}|t|^{-n/2}$ uniformly in $v$. Unlike the cone $\tau=|\xi|$, the hyperboloid $\tau=\sqrt{1+|\xi|^2}$ has positive Gaussian curvature in the radial direction as well, dispersing different wavelengths at different group velocities $\xi/\langle\xi\rangle$. (At high frequencies $|\xi|\simeq N\gg1$, radial curvature $\langle\xi\rangle^{-3}\simeq N^{-3}$ degenerates, introducing extra powers of $N$.)

## References { #references }

1. H. Lindblad and I. Rodnianski, *The weak null condition for Einstein's equations*, Comptes Rendus Mathematique **336** (2003), 901–906.
2. E. M. Stein, *Harmonic Analysis: Real-Variable Methods, Orthogonality, and Oscillatory Integrals*, Princeton University Press, 1993, Chapter VIII.

[Previous: criticality, planar interactions, and incompressibility](chapter-11.md) · [Next: wave Strichartz estimates and the TT* argument](chapter-13.md)
