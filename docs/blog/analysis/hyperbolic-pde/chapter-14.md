---
title: "Chapter 14: Critical Cubic Waves, Stein–Tomas Restriction, and Kakeya Dimension"
date: 2026-11-24
description: Critical small-data cubic waves, weak-limit defects, the Stein–Tomas sphere restriction theorem, far-field radiation and Knapp beams, and the derivation of Kakeya Minkowski dimension from restriction.
hide:
  - navigation
categories:
  - 分析
  - Hyperbolic PDEs
tags:
  - hyperbolic-pde
  - harmonic-analysis
  - wave-packets
  - scattering
  - course
---

# Chapter 14: Critical Cubic Waves, Stein–Tomas Restriction, and Kakeya Dimension { #chapter-14 }

This closing chapter brings the analytic chain of [Chapter 1](chapter-01.md) and [Chapter 6](chapter-06.md) full circle. Using the inhomogeneous wave Strichartz estimate, we solve the scale-critical three-dimensional cubic wave equation globally for small $\dot H^{1/2}\times\dot H^{-1/2}$ data and contrast strong contraction limits against weak-convergence defects. Turning to a single wavelength, we prove the Stein–Tomas restriction theorem on $\mathbb S^{d-1}$ by parallel spatial slicing, examine three geometric and physical manifestations of sphere extension, identify the necessary exponent region of the Restriction Conjecture, and prove via Rademacher randomization that local endpoint restriction implies full Minkowski dimension $d$ for Kakeya sets.

We work in spatial dimension $d\ge2$ with $\Box=\partial_t^2-\Delta$, $D=\sqrt{-\Delta}$, and the Fourier normalization

$$
\widehat f(\xi)=\int_{\mathbb R^d}e^{-ix\cdot\xi}f(x)\,dx,
\qquad
f(x)=\frac1{(2\pi)^d}\int_{\mathbb R^d}e^{ix\cdot\xi}\widehat f(\xi)\,d\xi.
$$

To match standard restriction conventions in Sections 3–6, mixed wave norms in Sections 1–2 are written $L_t^aL_x^b$, reserving $(p,q)$ for the sphere extension map $E:L^q(\mathbb S^{d-1})\to L^p(\mathbb R^d)$.

## 1. Inhomogeneous Strichartz estimates and variable-coefficient waves { #inhomogeneous-strichartz }

Consider the forced Euclidean wave equation on a forward interval $I=[0,T)$ or $[0,\infty)$:

$$
\Box u=F,\qquad u(0)=f,\qquad\partial_tu(0)=g.
\tag{1.1}
$$

Let $(a,b)$ and $(\widetilde a,\widetilde b)$ both satisfy the wave-admissibility conditions of [Theorem 13.1](chapter-13.md#dyadic-reduction) on $\mathbb R^{1+d}$:

$$
2\le a,\widetilde a\le\infty,\qquad 2\le b,\widetilde b<\infty,\qquad
\frac2a\le\frac{d-1}2\left(1-\frac2b\right),\qquad
\frac2{\widetilde a}\le\frac{d-1}2\left(1-\frac2{\widetilde b}\right),
$$

with complementary scaling regularities

$$
s=\frac d2-\frac1a-\frac db,
\qquad
1-s=\frac d2-\frac1{\widetilde a}-\frac d{\widetilde b}.
\tag{1.2}
$$

Combining Theorem 13.1 with the Keel–Tao retarded Duhamel estimate [[2]](#references) (proved directly for the diagonal exponent $a=b=\widetilde a=\widetilde b=\frac{2(d+1)}{d-1}$, $s=\frac12$, in [Chapter 13, Exercise 1](chapter-13.md#exercises)) gives

$$
\|u\|_{L_t^aL_x^b(I\times\mathbb R^d)}
\lesssim\|f\|_{\dot H^s(\mathbb R^d)}+\|g\|_{\dot H^{s-1}(\mathbb R^d)}+\|F\|_{L_t^{\widetilde a'}L_x^{\widetilde b'}(I\times\mathbb R^d)}.
\tag{1.3}
$$

Notice that taking $(\widetilde a,\widetilde b)=(a,b)$ satisfies (1.2) precisely when $s=\frac12$; in $d=3$, $(a,b)=(4,4)$ gives $s=\frac32-\frac14-\frac34=\frac12$ and dual forcing norm $L_{t,x}^{4/3}$.

**Variable-coefficient wave operators and manifold trapping.** On a time-independent Riemannian manifold $(M,g)$, the geometric wave operator is $\Box_g=\partial_t^2-\Delta_g$, where in local coordinates $\Delta_gu=g^{ij}\nabla_i\nabla_ju=g^{ij}\partial_i\partial_ju+b^j\partial_ju$. A Euclidean chart cutoff $P_N$ with convolution kernel $k_N(x-y)$ commutes with $\partial_i$ but *not* with variable metric coefficients:

$$
[P_N,\Box_g]u=-[P_N,g^{ij}]\partial_i\partial_ju-[P_N,b^j]\partial_ju,
\qquad
([P_N,c]v)(x)=\int k_N(x-y)\big(c(y)-c(x)\big)v(y)\,dy.
$$

Metric variation across the $N^{-1}$ packet scale enters directly as a commutator error. Replacing $P_N$ by a *spectral* cutoff $\psi(\sqrt{-\Delta_g}/N)$ restores exact commutation $[\psi(\sqrt{-\Delta_g}/N),\Box_g]=0$ via functional calculus, yet commutation alone does not produce dispersion: on a compact manifold without boundary (such as $\mathbb S^d$), standing eigenmodes $\Delta_g\phi_\lambda=-\lambda^2\phi_\lambda$ oscillate periodically as $\cos(\lambda t)\phi_\lambda(x)$, refocusing infinitely often and ruling out global-in-time $L_t^aL_x^b(\mathbb R\times M)$ bounds.

## 2. Critical small-data theory and weak solutions for the cubic wave { #critical-cubic-wave }

In $\mathbb R^{1+3}$, consider the real-valued cubic wave equation

$$
\Box u=u^3,\qquad u(0)=f,\qquad\partial_tu(0)=g.
\tag{2.1}
$$

The rescaling $u_\lambda(t,x)=\lambda u(\lambda t,\lambda x)$ preserves (2.1) together with $\|f\|_{\dot H^{1/2}(\mathbb R^3)}$, $\|g\|_{\dot H^{-1/2}(\mathbb R^3)}$, and $\|u\|_{L_{t,x}^4([0,\infty)\times\mathbb R^3)}$. Notice that the negative homogeneous norm $\|g\|_{\dot H^{-1/2}}=\|D^{-1/2}g\|_{L^2}$ penalizes low frequencies and cannot be replaced globally in time by an inhomogeneous norm.

!!! theorem "Theorem 14.1. Global small-data well-posedness at critical regularity"

    There exists $\varepsilon_0>0$ such that whenever $(f,g)\in\dot H^{1/2}(\mathbb R^3)\times\dot H^{-1/2}(\mathbb R^3)$ satisfies $A:=\|f\|_{\dot H^{1/2}}+\|g\|_{\dot H^{-1/2}}\le\varepsilon_0$, the integral equation

    $$
    u(t)=(\Phi u)(t):=\cos(tD)f+\frac{\sin(tD)}Dg+\int_0^t\frac{\sin((t-\tau)D)}Du(\tau)^3\,d\tau
    \tag{2.2}
    $$

    has a unique global fixed point in a small closed ball of $L_{t,x}^4([0,\infty)\times\mathbb R^3)$, with $(u,\partial_tu)\in C([0,\infty);\dot H^{1/2}\times\dot H^{-1/2})$ and $\|u\|_{L_{t,x}^4([0,\infty)\times\mathbb R^3)}\lesssim A$. Moreover, $u$ is a global distributional weak solution on $[0,\infty)\times\mathbb R^3$: for every $\varphi\in C_c^\infty([0,\infty)\times\mathbb R^3)$ (not required to vanish at $t=0$),

    $$
    \iint_{[0,\infty)\times\mathbb R^3}u(\partial_t^2\varphi-\Delta\varphi)\,dx\,dt
    =\iint_{[0,\infty)\times\mathbb R^3}u^3\varphi\,dx\,dt+\langle g,\varphi(0)\rangle-\langle f,\partial_t\varphi(0)\rangle.
    \tag{2.3}
    $$

??? proof "Proof"

    Write $\|\cdot\|_4=\|\cdot\|_{L_{t,x}^4([0,\infty)\times\mathbb R^3)}$ and $\|\cdot\|_{4/3}=\|\cdot\|_{L_{t,x}^{4/3}([0,\infty)\times\mathbb R^3)}$. Since $\|v^3\|_{4/3}=\|v\|_4^3$ and $|v^3-w^3|\le(|v|^2+|v||w|+|w|^2)|v-w|$, applying (1.3) at $(a,b)=(\widetilde a,\widetilde b)=(4,4)$ ($s=\frac12$) and Hölder's inequality with $\frac34=\frac24+\frac14$ gives a constant $C\ge1$ such that

    $$
    \|\Phi(v)\|_4\le CA+C\|v\|_4^3,
    \qquad
    \|\Phi(v)-\Phi(w)\|_4\le C\big(\|v\|_4^2+\|v\|_4\|w\|_4+\|w\|_4^2\big)\|v-w\|_4.
    $$

    Set $B=2CA$ and choose $\varepsilon_0=(24C^3)^{-1/2}$, so $A\le\varepsilon_0$ implies $3CB^2\le\frac12$. On the complete ball $\mathcal B=\{v\in L_{t,x}^4([0,\infty)\times\mathbb R^3):\|v\|_4\le B\}$, we have $\|\Phi(v)\|_4\le\frac B2+\frac B6<B$ and $\|\Phi(v)-\Phi(w)\|_4\le\frac12\|v-w\|_4$. Banach's fixed-point theorem yields a unique fixed point $u\in\mathcal B$. Applying (1.3) with $(a,b)=(\infty,2)$ to $D^{1/2}u$ (keeping $(\widetilde a,\widetilde b)=(4,4)$ so $1-\frac12=\frac12$) shows $(u,\partial_tu)\in C([0,\infty);\dot H^{1/2}\times\dot H^{-1/2})$ (and scatters in $\dot H^{1/2}\times\dot H^{-1/2}$ as $t\to\infty$ because $\|u^3\|_{L_{t,x}^{4/3}}=\|u\|_4^3<\infty$).

    *Weak formulation and initial boundary signs.* Approximate $(f,g)$ in $\dot H^{1/2}\times\dot H^{-1/2}$ by $(f_n,g_n)\in\mathcal S(\mathbb R^3)^2$ with Fourier supports away from $0$. For small $A$, the corresponding smooth solutions $u_n$ lie in $\mathcal B$, and the contraction inequality gives $\|u_n-u\|_4\lesssim\|f_n-f\|_{\dot H^{1/2}}+\|g_n-g\|_{\dot H^{-1/2}}\to0$, hence $\|u_n^3-u^3\|_{4/3}\to0$. For each smooth $u_n$ and $\varphi\in C_c^\infty([0,\infty)\times\mathbb R^3)$, integrating by parts twice in $t$ on $[0,\infty)$ gives

    $$
    \int_0^\infty(\partial_t^2u_n)\varphi\,dt
    =\big[(\partial_tu_n)\varphi-u_n\partial_t\varphi\big]_0^\infty+\int_0^\infty u_n\partial_t^2\varphi\,dt
    =-g_n\varphi(0)+f_n\partial_t\varphi(0)+\int_0^\infty u_n\partial_t^2\varphi\,dt.
    $$

    Integrating in $x$ (no spatial boundary), moving the $t=0$ terms to the right side of $\Box u_n=u_n^3$, and passing to the limit $n\to\infty$ via $u_n\to u$ in $L_{t,x}^4$, $u_n^3\to u^3$ in $L_{t,x}^{4/3}$, and $(f_n,g_n)\to(f,g)$ in $\dot H^{1/2}\times\dot H^{-1/2}$ (paired against $\partial_t\varphi(0),\varphi(0)\in\mathcal S(\mathbb R^3)$) yields (2.3).

**Why strong convergence cannot be replaced by weak limits.** Boundedness of $u_n$ in $L_{t,x}^4$ alone supplies only a weakly convergent subsequence $u_{n_k}\rightharpoonup u$, which does *not* identify the weak limit of $u_{n_k}^3$:

- *Cubic weak-limit shift:* Fix $\chi\in C_c^\infty(\mathbb R^{1+3})\setminus\{0\}$ and set $u_j(t,x)=\chi(t,x)(1+\sin(jx_1))$. By the Riemann–Lebesgue lemma, $\sin(jx_1)\rightharpoonup0$, $\sin^2(jx_1)=\frac12-\frac12\cos(2jx_1)\rightharpoonup\frac12$, and $\sin^3(jx_1)=\frac34\sin(jx_1)-\frac14\sin(3jx_1)\rightharpoonup0$. Hence

    $$
    u_j\rightharpoonup\chi\quad\text{in }L^4,
    \qquad
    u_j^3=\chi^3(1+3\sin(jx_1)+3\sin^2(jx_1)+\sin^3(jx_1))\rightharpoonup\frac52\chi^3\ne\chi^3\quad\text{in }L^{4/3}.
    $$

- *Quadratic derivative defect measures:* If real sequences $v_j=\partial_\alpha u_j\rightharpoonup v$ weakly in $L_{\mathrm{loc}}^2(\mathbb R^{1+3})$ (as for finite-energy solutions of $\Box u_j=(\partial u_j)^2$), then $v_j^2$ is bounded only in $L_{\mathrm{loc}}^1$. Along a weak-$*$ convergent subsequence of Radon measures, lower semicontinuity $\int\psi v^2\le\liminf_j\int\psi v_j^2$ for $\psi\in C_c^\infty$, $\psi\ge0$, forces

    $$
    v_j^2\,dx\,dt\overset{*}{\rightharpoonup}v^2\,dx\,dt+\mu,
    \qquad\mu\ge0,
    $$

    while mixed products $\partial_\alpha u_j\partial_\beta u_j$ acquire signed defect measures by polarization. For $u_j(t,x)=j^{-1}\chi(t,x)\sin(jx_1)$, $u_j\to0$ uniformly while $(\partial_1u_j)^2=\chi^2\cos^2(jx_1)+O(j^{-1})\to\frac12\chi^2$ in $\mathcal D'$: high-frequency oscillations vanish from the weak limit while depositing macroscopic energy density.

## 3. Restriction to the sphere and the Stein–Tomas theorem { #stein-tomas }

Fix $d\ge2$ and let $d\sigma$ denote surface area on the unit sphere $\mathbb S^{d-1}=\{\omega\in\mathbb R^d:|\omega|=1\}$. For $f\in\mathcal S(\mathbb R^d)$ and $h\in L^1(\mathbb S^{d-1})$, define the **restriction** and **extension** operators

$$
(Rf)(\omega)=\widehat f(\omega)\quad(\omega\in\mathbb S^{d-1}),
\qquad
(Eh)(x)=\int_{\mathbb S^{d-1}}e^{ix\cdot\omega}h(\omega)\,d\sigma(\omega)\quad(x\in\mathbb R^d).
\tag{3.1}
$$

(Omitting $(2\pi)^{-d}$ from $E$ makes $E^*=R$ exact with constant $1$: Fubini gives $\int_{\mathbb R^d}(Eh)\overline f\,dx=\int_{\mathbb S^{d-1}}h\overline{Rf}\,d\sigma$.)

**Elementary endpoints.** At $L^1(\mathbb R^d)$, $|Rf(\omega)|\le\|f\|_{L^1(\mathbb R^d)}$ gives $\|Rf\|_{L^2(\mathbb S^{d-1})}\le|\mathbb S^{d-1}|^{1/2}\|f\|_{L^1(\mathbb R^d)}$. At $L^2(\mathbb R^d)$, however, *no* continuous restriction $L^2(\mathbb R^d)\to L^q(\mathbb S^{d-1})$ exists: choose $\zeta\in C_c^\infty((-1,1))$ with $\zeta(0)=1$, and set $\widehat f_\varepsilon(\xi)=\zeta\big(\frac{|\xi|-1}\varepsilon\big)$ for $0<\varepsilon<\frac12$. Then $Rf_\varepsilon\equiv1$ on $\mathbb S^{d-1}$, while Plancherel in polar coordinates gives

$$
\|f_\varepsilon\|_{L^2(\mathbb R^d)}^2
=(2\pi)^{-d}|\mathbb S^{d-1}|\int_0^\infty\left|\zeta\left(\frac{\rho-1}\varepsilon\right)\right|^2\rho^{d-1}\,d\rho
\simeq_d\varepsilon\longrightarrow0
\qquad(\varepsilon\downarrow0).
$$

Between $p'=1$ and $p'=2$, curvature of $\mathbb S^{d-1}$ yields the sharp $L^2(\mathbb S^{d-1})$ restriction range.

!!! theorem "Theorem 14.2. Stein–Tomas restriction theorem"

    Let $d\ge2$ and put $P=\frac{2(d+1)}{d-1}$, so $P'=\frac{2(d+1)}{d+3}$. For every $1\le p'\le\frac{2(d+1)}{d+3}$ (equivalently $p\ge P$),

    $$
    \|Rf\|_{L^2(\mathbb S^{d-1})}\lesssim_{d,p}\|f\|_{L^{p'}(\mathbb R^d)},
    \qquad\text{equivalently}\qquad
    \|Eh\|_{L^p(\mathbb R^d)}\lesssim_{d,p}\|h\|_{L^2(\mathbb S^{d-1})}.
    \tag{3.2}
    $$

??? proof "Proof"

    By duality $E^*=R$ and the same $TT^*$ equivalence as [Lemma 13.2](chapter-13.md#ttstar-duality), $\|E\|_{L^2(\mathbb S^{d-1})\to L^p(\mathbb R^d)}^2=\|ER\|_{L^{p'}(\mathbb R^d)\to L^p(\mathbb R^d)}$, where $(ERf)(x)=((E1)*f)(x)$. Since the $p'=1$ bound $\|Rf\|_{L^2(\mathbb S^{d-1})}\lesssim\|f\|_{L^1(\mathbb R^d)}$ holds trivially, Riesz–Thorin interpolation reduces the theorem to the endpoint $p=P$.

    Cover $\mathbb S^{d-1}$ by finitely many small smooth patches. Rotating coordinates, write one patch as the graph $\omega=(\eta,\phi(\eta))$ with $\phi(\eta)=\sqrt{1-|\eta|^2}$ and $|\eta|\le\frac12$ in $\mathbb R^{d-1}$, where the surface-area factor $d\sigma=\phi(\eta)^{-1}\,d\eta$ is smooth and bounded above and below. Absorbing $\phi(\eta)^{-1/2}$ into the $L^2$ datum and inserting a smooth patch cutoff $\chi\in C_c^\infty(B(0,1/2))$, split $x=(y,z)\in\mathbb R^{d-1}\times\mathbb R$ into **parallel spatial observation planes** and define

    $$
    (T_zb)(y)=\int_{\mathbb R^{d-1}}e^{i(y\cdot\eta+z\phi(\eta))}\chi(\eta)b(\eta)\,d\eta.
    $$

    For $F(y,z)\in\mathcal S(\mathbb R^d)$, the composition $(TT^*F)(y,z)=\int_{\mathbb R}(T_zT_w^*F(\cdot,w))(y)\,dw$ has slice operator

    $$
    (T_zT_w^*v)(y)=(k_{z-w}*_yv)(y),
    \qquad
    k_h(y)=(2\pi)^{d-1}\int_{\mathbb R^{d-1}}e^{i(y\cdot\eta+h\phi(\eta))}|\chi(\eta)|^2\,d\eta.
    $$

    For each $h=z-w\in\mathbb R$:

    1. *Plancherel on $\mathbb R^{d-1}$:* $|\mathcal F_yk_h(\eta)|=(2\pi)^{d-1}|\chi(-\eta)|^2\lesssim1$, so $\|T_zT_w^*\|_{L_y^2\to L_y^2}\lesssim1$.
    2. *Stationary phase on the patch:* For $|h|\le1$, $\|k_h\|_{L_y^\infty}\lesssim1$. For $|h|>1$, write $y\cdot\eta+h\phi(\eta)=h(\phi(\eta)+u\cdot\eta)$ with $u=y/h$. On $|\eta|\le\frac12$, $\nabla_\eta\phi(\eta)=-\eta/\phi(\eta)$ has modulus at most $1/\sqrt3$, while $\nabla_\eta^2\phi(\eta)=-\phi(\eta)^{-1}(I_{d-1}+\frac{\eta\otimes\eta}{\phi(\eta)^2})\preceq-I_{d-1}$ is uniformly negative definite! Thus if $|u|>2$, $|\nabla_\eta(\phi+u\cdot\eta)|\ge1$ and [Lemma 12.1](chapter-12.md#nonstationary-phase) gives $O_m(|h|^{-m})$; if $|u|\le2$, strict concavity ensures at most one critical point $\eta_*(u)=-u/\sqrt{1+|u|^2}$, and [Theorem 12.2](chapter-12.md#stationary-phase) (uniformly in $|u|\le2$) gives $\|k_h\|_{L_y^\infty}\lesssim_d(1+|h|)^{-(d-1)/2}$. Hence $\|T_zT_w^*\|_{L_y^1\to L_y^\infty}\lesssim_d(1+|z-w|)^{-(d-1)/2}$.

    Riesz–Thorin interpolation between $(1,\infty)$ and $(2,2)$ at $P=\frac{2(d+1)}{d-1}$ puts weight $1-\frac2P=1-\frac{d-1}{d+1}=\frac2{d+1}$ on the dispersive bound, so

    $$
    \frac{d-1}2\left(1-\frac2P\right)=\frac{d-1}{d+1}=\frac2P,
    \qquad
    \|T_zT_w^*v\|_{L_y^P}\lesssim_d|z-w|^{-2/P}\|v\|_{L_y^{P'}}.
    $$

    Since $0<\frac2P=\frac{d-1}{d+1}<1$ and $\frac1P=\frac1{P'}-(1-\frac2P)$, Minkowski in $L_y^P$ and the one-dimensional Hardy–Littlewood–Sobolev inequality ([Lemma 13.4](chapter-13.md#time-integration)) in $z$ yield $\|TT^*F\|_{L_{y,z}^P}\lesssim_d\|F\|_{L_{y,z}^{P'}}$. Summing finitely many patches completes the proof.

## 4. Waves, radiation fields, and Knapp beams { #three-examples }

Three concrete constructions illuminate what $E$ and $R$ measure in physical space.

### 4.1 Monochromatic waves and spherical slices of a moving wave

Since $\Delta(e^{ix\cdot\omega})=-|\omega|^2e^{ix\cdot\omega}=-e^{ix\cdot\omega}$ for $\omega\in\mathbb S^{d-1}$, every extension field $u=Eh$ solves the homogeneous **Helmholtz equation** $(\Delta+1)u=0$. Illuminating uniformly from all directions ($h\equiv1$) produces the regular standing wave $I(x)=(E1)(x)$, bounded by $(1+|x|)^{-(d-1)/2}$ by [Lemma 12.3](chapter-12.md#dispersive-estimate); in $d=3$, integrating over zonal bands $s=\omega\cdot x/r\in[-1,1]$ ($r=|x|$) gives the exact formula

$$
I(x)=2\pi\int_{-1}^1e^{irs}\,ds=4\pi\frac{\sin r}r.
$$

Now place spherical extensions inside the dyadic half-wave $T_Nf(t,x)=e^{itD}P_Nf(x)$ ($\operatorname{supp}\psi_N\subset(N/2,2N)$). Writing $\xi=\rho\omega$ ($\rho>0$, $\omega\in\mathbb S^{d-1}$), $c_d=(2\pi)^{-d}$, and $h_\rho(\omega)=\widehat f(\rho\omega)$ slices the annulus into concentric spheres:

$$
T_Nf(t,x)=c_d\int_0^\infty e^{it\rho}\psi_N(\rho)(Eh_\rho)(\rho x)\rho^{d-1}\,d\rho.
\tag{4.1}
$$

At the Stein–Tomas exponent $P=\frac{2(d+1)}{d-1}$, for each fixed $x\in\mathbb R^d$ the temporal Fourier transform of $t\mapsto T_Nf(t,x)$ is supported in $[N/2,2N]$, an interval of length $\frac32N$. One-dimensional Bernstein in $t$ ($\|\cdot\|_{L_t^P}\lesssim N^{\frac12-\frac1P}\|\cdot\|_{L_t^2}$) and temporal Plancherel give

$$
\|T_Nf(\cdot,x)\|_{L_t^P}\lesssim N^{\frac12-\frac1P}\left(\int_0^\infty|\psi_N(\rho)|^2|(Eh_\rho)(\rho x)|^2\rho^{2(d-1)}\,d\rho\right)^{1/2}.
$$

Take the $L_x^P$ norm, apply Minkowski's inequality in $L_x^{P/2}$ ($P>2$) to pull the $\rho$-integral outside, and apply Theorem 14.2 after rescaling $y=\rho x$ ($\|(Eh_\rho)(\rho\cdot)\|_{L_x^P}=\rho^{-d/P}\|Eh_\rho\|_{L^P}\lesssim\rho^{-d/P}\|h_\rho\|_{L^2(\mathbb S^{d-1})}$):

$$
\begin{aligned}
\|T_Nf\|_{L_{t,x}^P}
&\lesssim N^{\frac12-\frac1P}\left(\int_{N/2}^{2N}|\psi_N(\rho)|^2\rho^{2(d-1)-2d/P}\|h_\rho\|_{L^2(\mathbb S^{d-1})}^2\,d\rho\right)^{1/2}\\
&\simeq N^{\frac12-\frac1P+\frac{d-1}2-\frac dP}\left(c_d\int_0^\infty|\psi_N(\rho)|^2\|h_\rho\|_{L^2(\mathbb S^{d-1})}^2\rho^{d-1}\,d\rho\right)^{1/2}
=N^{1/2}\|P_Nf\|_{L^2(\mathbb R^d)},
\end{aligned}
$$

because $\frac12-\frac1P+\frac{d-1}2-\frac dP=\frac d2-\frac{d+1}P=\frac d2-\frac{d-1}2=\frac12$. Thus Stein–Tomas on spheres plus one-dimensional time Plancherel directly recovers the diagonal wave Strichartz bound! Notice the structural contrast: $ER$ in Section 3 acts on spatial functions alone, whereas $T_NT_N^*$ in [Chapter 13](chapter-13.md#ttstar-duality) acts on spacetime functions by integrating over all radial frequencies simultaneously.

### 4.2 Far field of a localized Helmholtz source

Let $F\in C_c^\infty(B_R(0))$ be a compactly supported source in $\mathbb R^3$, and consider the outgoing solution of $(\Delta+1)u=F$ (matching time dependence $e^{-it}$, so outgoing spherical waves carry $e^{ir}$):

$$
u(x)=-\frac1{4\pi}\int_{B_R(0)}\frac{e^{i|x-y|}}{|x-y|}F(y)\,dy
\qquad\big((\Delta+1)(e^{ir}/r)=-4\pi\delta_0;\text{ Exercise 1}\big).
\tag{4.2}
$$

Observe at $x=r\omega$ ($\omega\in\mathbb S^2$, $r>2R$). For $|y|\le R$, write $s=|r\omega-y|=\sqrt{(r-\omega\cdot y)^2+|y|^2-(\omega\cdot y)^2}$. Since $s\ge r-R>\frac r2$ and $r-\omega\cdot y\ge r-R>\frac r2$, rationalizing the difference gives the exact remainder

$$
0\le s-(r-\omega\cdot y)=\frac{|y|^2-(\omega\cdot y)^2}{s+r-\omega\cdot y}\le\frac{R^2}r,
\qquad
\left|\frac rs-1\right|=\frac{|r-s|}s\le\frac{2R}r.
$$

Using $|e^{i\alpha}-e^{i\beta}|\le|\alpha-\beta|$, we obtain uniformly for $\omega\in\mathbb S^2$ and $|y|\le R$:

$$
\left|\frac rse^{i(s-r)}-e^{-i\omega\cdot y}\right|
\le\left|\frac rs-1\right|+\big|e^{i[s-(r-\omega\cdot y)]}-1\big|
\le\frac{2R+R^2}r.
$$

Multiplying (4.2) by $-4\pi re^{-ir}$ and integrating over $B_R(0)$ proves the quantitative radiation asymptotic

$$
-4\pi re^{-ir}u(r\omega)=RF(\omega)+O\!\left(\frac{R+R^2}r\|F\|_{L^1(\mathbb R^3)}\right).
\tag{4.3}
$$

Stripping off the spherical phase $e^{ir}$ and geometric spreading $r^{-1}$ reveals the exact Fourier restriction $RF(\omega)$ of the source! Consequently, Theorem 14.2 bounds the total far-field energy flux by an $L^{4/3}$ norm without requiring support-dependent factors:

$$
\lim_{r\to\infty}r^2\int_{\mathbb S^2}|u(r\omega)|^2\,d\sigma(\omega)
=\frac{\|RF\|_{L^2(\mathbb S^2)}^2}{16\pi^2}
\lesssim\|F\|_{L^{4/3}(\mathbb R^3)}^2.
$$

In general dimension $d\ge2$, the outgoing fundamental solution of $-\Delta-1$ is $G_d(r)=\frac i4(2\pi r)^{-\nu}H_\nu^{(1)}(r)$ with $\nu=\frac{d-2}2$ and Hankel asymptotic $G_d(r)=b_de^{ir}r^{-(d-1)/2}(1+O_d(r^{-1}))$, $b_d=\frac i4(2\pi)^{-\nu}\sqrt{2/\pi}\,e^{-i(\pi\nu/2+\pi/4)}$, giving $r^{(d-1)/2}e^{-ir}u(r\omega)=-b_dRF(\omega)+O_{d,R}(r^{-1}\|F\|_{L^1})$ for $(\Delta+1)u=F$.

### 4.3 Knapp caps and wave-packet beams

Let $\theta=\{(\eta,\sqrt{1-|\eta|^2}):|\eta|\le\delta\}\subset\mathbb S^{d-1}$ ($0<\delta\le\frac12$) be a north-pole cap of aperture $\delta$, with surface area $\sigma(\theta)\simeq_d\delta^{d-1}$. For $u=Ea$ supported in $\theta$ and $x=(x',x_d)\in\mathbb R^{d-1}\times\mathbb R$, factor out the central plane wave $e^{ix_d}$:

$$
e^{-ix_d}u(x)=\int_\theta e^{i\left[x'\cdot\eta+x_d\big(\sqrt{1-|\eta|^2}-1\big)\right]}a(\omega)\,d\sigma(\omega).
\tag{4.4}
$$

Because $0\le1-\sqrt{1-|\eta|^2}=\frac{|\eta|^2}{1+\sqrt{1-|\eta|^2}}\le\delta^2$ on $\theta$, inside the physical tube

$$
T=\big\{(x',x_d):|x'|\le\tfrac1{10}\delta^{-1},\ |x_d|\le\tfrac1{10}\delta^{-2}\big\}
\tag{4.5}
$$

the residual phase in (4.4) has modulus at most $\frac1{10}+\frac1{10}=\frac15$. Taking $a=\mathbf 1_\theta$ and real parts gives the coherent lower bound

$$
|E\mathbf 1_\theta(x)|\ge\cos\left(\frac15\right)\sigma(\theta)\gtrsim_d\delta^{d-1}
\qquad(\forall\,x\in T).
\tag{4.6}
$$

For a *smooth* cap amplitude $a(\omega)=b(\eta/\delta)\sqrt{1-|\eta|^2}$ with $b\in C_c^\infty(B(0,1))$, substituting $\eta=\delta v$ gives $e^{-ix_d}u(x)=\delta^{d-1}\int_{B(0,1)}e^{i\Phi(v)}b(v)\,dv$, where $\Phi(v)=Y\cdot v+Z\phi_\delta(v)$, $Y=\delta x'$, $Z=\delta^2x_d$, and $\phi_\delta(v)=-|v|^2/(1+\sqrt{1-\delta^2|v|^2})$ has all derivatives uniformly bounded on $B(0,1)$ for $\delta\le\frac12$. Whenever $|Y|\ge4(1+|Z|)$, $|\nabla_v\Phi(v)|\ge|Y|-2|Z|\ge\frac12|Y|$; $M$-fold integration by parts ([Lemma 12.1](chapter-12.md#nonstationary-phase) with parameter $|Y|$) yields rapid *transverse* decay away from the beam:

$$
|Ea(x)|\le C_{M,b}\,\delta^{d-1}\big(1+\delta|x'|\big)^{-M}
\qquad\big(\delta|x'|\ge4(1+\delta^2|x_d|)\big).
\tag{4.7}
$$

Note carefully that (4.7) holds on the natural axial scale $|x_d|\lesssim\delta^{-2}$ (and outside the wider cone $|x'|\gtrsim\delta|x_d|$ when $|x_d|\gg\delta^{-2}$): along the axis $x'=0$ for $|x_d|\gg\delta^{-2}$, $v=0$ remains a stationary point where $Ea(0,x_d)$ decays only algebraically like $|x_d|^{-(d-1)/2}$, while a sharp indicator $\mathbf 1_\theta$ also picks up boundary oscillations from $\partial\theta$.

## 5. Necessary exponents and the sphere restriction conjecture { #restriction-conjecture }

For which $1\le p,q\le\infty$ can a global strong bound $\|Eh\|_{L^p(\mathbb R^d)}\le C\|h\|_{L^q(\mathbb S^{d-1})}$ (dually $\|Rf\|_{L^{q'}(\mathbb S^{d-1})}\le C\|f\|_{L^{p'}(\mathbb R^d)}$) hold? Two contrasting tests give sharp necessary conditions:

1. **Single-cap concentration (Knapp's example).** Take $h=\mathbf 1_\theta$ on the $\delta$-cap of Section 4.3. Then $\|\mathbf 1_\theta\|_{L^q(\mathbb S^{d-1})}=\sigma(\theta)^{1/q}\simeq_d\delta^{(d-1)/q}$ (equal to $1$ if $q=\infty$), while $|T|\simeq_d(\delta^{-1})^{d-1}\delta^{-2}=\delta^{-(d+1)}$, so (4.6) gives

    $$
    \delta^{d-1-\frac{d+1}p}\simeq_d\delta^{d-1}|T|^{1/p}\le\|E\mathbf 1_\theta\|_{L^p(\mathbb R^d)}\lesssim\|\mathbf 1_\theta\|_{L^q(\mathbb S^{d-1})}\simeq_d\delta^{\frac{d-1}q}.
    $$

    Sending $\delta\downarrow0$ forces the left exponent to be at least the right exponent:

    $$
    (d-1)\left(1-\frac1q\right)\ge\frac{d+1}p.
    \tag{5.1}
    $$

    At $q=2$, (5.1) reads $p\ge\frac{2(d+1)}{d-1}=P$: Stein–Tomas achieves the exact Knapp threshold.

2. **Isotropic radial tail ($h\equiv1$).** Stationary phase at the two poles $\omega=\pm x/|x|$ gives the asymptotic

    $$
    (E1)(x)=c_d\,r^{-\frac{d-1}2}\cos\!\left(r-\frac{\pi(d-1)}4\right)+O_d\big(r^{-\frac{d+1}2}\big)
    \qquad(r=|x|\to\infty,\ c_d\ne0).
    $$

    On every radial interval of length $2\pi$ at large $r$, $|\cos(r-\frac{\pi(d-1)}4)|\ge\frac12$ on a subinterval of fixed positive length, where $|E1(x)|\gtrsim_dr^{-(d-1)/2}$. Hence $E1\in L^p(\mathbb R^d)$ requires $\int_1^\infty r^{d-1-p(d-1)/2}\,dr<\infty$, which forces the strict inequality

    $$
    p>\frac{2d}{d-1},
    \qquad\text{equivalently}\qquad
    p'<\frac{2d}{d+1}.
    \tag{5.2}
    $$

    At $p=\frac{2d}{d-1}$ itself, $\|E1\|_{L^p(B_L)}^p\simeq_d\log L$ diverges logarithmically as $L\to\infty$.

**The Sphere Restriction Conjecture.** For every $d\ge2$, it is conjectured that $\|Eh\|_{L^p(\mathbb R^d)}\le C_{d,p,q}\|h\|_{L^q(\mathbb S^{d-1})}$ holds for *all* $1\le p,q\le\infty$ satisfying both (5.1) and (5.2) (proved in $d=2$ by Fefferman and Stein; open for $d\ge3$, see [[3]](#references)). Setting equality in both conditions meets at the critical corner

$$
p_c=q_c=\frac{2d}{d-1},
\qquad
p_c'=q_c'=\frac{2d}{d+1}
$$

(in $d=3$: $(p_c,q_c)=(3,3)$, distinct from the Stein–Tomas point $(4,2)$). Although global boundedness on $\mathbb R^d$ fails at $(p_c,q_c)$ due to the logarithmic radial tail of $E1$, restricting observation to balls $B_L$ with an $L^\alpha$ loss remains open for $d\ge3$ and directly controls Kakeya tube geometry.

## 6. From local endpoint restriction to Kakeya dimension { #restriction-to-kakeya }

Consider the local endpoint extension hypothesis at $p_c=q_c=\frac{2d}{d-1}$:

$$
\text{For every }\alpha>0\text{ and every ball }B_L\subset\mathbb R^d\text{ of radius }L\ge1,\quad
\|Eh\|_{L^{p_c}(B_L)}\le C_{\alpha,d}\,L^\alpha\|h\|_{L^{q_c}(\mathbb S^{d-1})}.
\tag{H}
$$

!!! theorem "Theorem 14.3. Local endpoint restriction implies Kakeya multiplicity and full Minkowski dimension"

    Assume Hypothesis (H) holds in dimension $d\ge2$. Let $0<\delta\le\frac12$, let $\{\omega_j\}_{j=1}^J\subset\mathbb S^{d-1}$ be a $\delta$-separated set of unit directions, and let $T_j\subset\mathbb R^d$ be cylindrical tubes of length $1$ and radius $\delta$ with axis direction $\omega_j$ (placed at arbitrary centers in $\mathbb R^d$). Write $m(y)=\sum_{j=1}^J\mathbf 1_{T_j}(y)$ and $U=\bigcup_{j=1}^JT_j$.

    1. For every $\varepsilon>0$,

        $$
        \|m\|_{L^{\frac d{d-1}}(\mathbb R^d)}\lesssim_{\varepsilon,d}\delta^{-\varepsilon}(J\delta^{d-1})^{\frac{d-1}d}.
        \tag{6.1}
        $$

        In particular, for a maximal $\delta$-separated direction set ($J\simeq_d\delta^{-(d-1)}$), $\|m\|_{L^{d/(d-1)}(\mathbb R^d)}\lesssim_{\varepsilon,d}\delta^{-\varepsilon}$ and $|U|\gtrsim_{\eta,d}\delta^\eta$ for every $\eta>0$.

    2. Every bounded **Kakeya (Besicovitch) set** $K\subset\mathbb R^d$ containing a unit line segment in every direction has lower (hence full) Minkowski dimension $\underline{\dim}_{\mathrm M}(K)=d$.

??? proof "Proof"

    Cover $\mathbb S^{d-1}$ by finitely many small patches so that on each patch the Knapp cap bound (4.6) applies; by triangle inequality in $L^{\frac d{d-1}}$, restrict to one patch. Suppose first that all tube centers $c_j\in\mathbb R^d$ lie inside a single unit cube $Q_0$, so $U\subset B(y_0,2)$ for the center $y_0$ of $Q_0$.

    *Step 1: Rescaling to wave-packet scale $\delta^{-2}$.* Set $x=\delta^{-2}y$ ($dx=\delta^{-2d}\,dy$). The rescaled tube $\widetilde T_j=\delta^{-2}T_j$ has center $b_j=\delta^{-2}c_j$, length $\delta^{-2}$, and radius $\delta^{-1}$, and all $\widetilde T_j$ lie inside $B_L:=B(\delta^{-2}y_0,2\delta^{-2})$ of radius $L=2\delta^{-2}\ge8$. Choose a small dimensional constant $c_0\in(0,\frac1{20}]$ so that the spherical caps $\theta_j=\{\omega\in\mathbb S^{d-1}:|\omega-\omega_j|\le c_0\delta\}$ are pairwise disjoint (since $|\omega_j-\omega_k|\ge\delta$ for $j\ne k$) and so that $|E\mathbf 1_{\theta_j}(z)|\gtrsim_d\delta^{d-1}$ whenever $|z_\perp|\le\delta^{-1}$ and $|z_\parallel|\le\frac12\delta^{-2}$ relative to $\omega_j$ (covering $\widetilde T_j$ directly, or after splitting each unit tube into $\lceil10/c_0^2\rceil=O_d(1)$ longitudinal segments). Modulate each cap by its tube center:

    $$
    h_j(\omega)=e^{-ib_j\cdot\omega}\mathbf 1_{\theta_j}(\omega),
    \qquad
    (Eh_j)(x)=(E\mathbf 1_{\theta_j})(x-b_j),
    \qquad
    |Eh_j(x)|\gtrsim_d\delta^{d-1}\mathbf 1_{\widetilde T_j}(x).
    $$

    *Step 2: Rademacher randomization and Jensen's inequality.* Let $\varepsilon_1,\dots,\varepsilon_J\in\{\pm1\}$ be independent symmetric random signs and set $h_\varepsilon(\omega)=\sum_{j=1}^J\varepsilon_jh_j(\omega)$. Because the caps $\theta_j$ are disjoint, $|h_\varepsilon(\omega)|=\sum_{j=1}^J\mathbf 1_{\theta_j}(\omega)$ for every sign choice $\varepsilon$, so

    $$
    \|h_\varepsilon\|_{L^{q_c}(\mathbb S^{d-1})}^{q_c}=\sum_{j=1}^J\sigma(\theta_j)\lesssim_dJ\delta^{d-1}.
    $$

    Pointwise in $x$, $\mathbb E_\varepsilon|Eh_\varepsilon(x)|^2=\sum_{j=1}^J|Eh_j(x)|^2$. Because $\frac{p_c}2=\frac d{d-1}>1$, $t\mapsto t^{p_c/2}$ is convex on $[0,\infty)$, so Jensen's inequality gives

    $$
    \mathbb E_\varepsilon|Eh_\varepsilon(x)|^{p_c}
    \ge\big(\mathbb E_\varepsilon|Eh_\varepsilon(x)|^2\big)^{p_c/2}
    =\left(\sum_{j=1}^J|Eh_j(x)|^2\right)^{p_c/2}
    \gtrsim_d\delta^{(d-1)p_c}\,m(\delta^2x)^{\frac d{d-1}}.
    $$

    Integrate over $x\in B_L$, interchange $\mathbb E_\varepsilon$ with $\int_{B_L}$ by Tonelli, apply Hypothesis (H) at $p_c=q_c=\frac{2d}{d-1}$, and substitute $x=\delta^{-2}y$:

    $$
    \delta^{(d-1)p_c-2d}\int_{\mathbb R^d}m(y)^{\frac d{d-1}}\,dy
    \lesssim_d\mathbb E_\varepsilon\|Eh_\varepsilon\|_{L^{p_c}(B_L)}^{p_c}
    \le C_{\alpha,d}^{p_c}(2\delta^{-2})^{\alpha p_c}(J\delta^{d-1}).
    $$

    Miraculously, $(d-1)p_c-2d=(d-1)\frac{2d}{d-1}-2d=0$: all powers of $\delta$ on the left cancel! Raising both sides to $\frac{d-1}d=\frac2{p_c}$ and choosing $\alpha=\varepsilon/4$ proves (6.1) when all centers lie in $Q_0$.

    *Step 3: Arbitrary tube centers.* Partition $\mathbb R^d$ into unit lattice cubes $Q_z=z+[0,1)^d$, $z\in\mathbb Z^d$, and group the tubes by the cube $Q_z$ containing their center ($J_z$ tubes in group $z$, $\sum_zJ_z=J$, $m=\sum_zm_z$). Each $m_z$ is supported in the $2$-enlargement $\widetilde Q_z$ of $Q_z$, and the family $\{\widetilde Q_z\}_{z\in\mathbb Z^d}$ has bounded overlap $M_d\le5^d$. Hence pointwise $m(y)^{\frac d{d-1}}\le M_d^{\frac1{d-1}}\sum_zm_z(y)^{\frac d{d-1}}$, and summing the pre-root estimate $\int m_z^{d/(d-1)}\,dy\lesssim_{\varepsilon,d}\delta^{-\frac{d\varepsilon}{d-1}}J_z\delta^{d-1}$ over $z\in\mathbb Z^d$ recovers (6.1) in general.

    *Step 4: Union volume and Minkowski dimension.* When $\{\omega_j\}_{j=1}^J$ is maximal $\delta$-separated on $\mathbb S^{d-1}$, area comparison gives $J\delta^{d-1}\simeq_d1$, while $|T_j|\simeq_d\delta^{d-1}$. By Hölder's inequality with exponents $\frac d{d-1}$ and $d$ on $U$,

    $$
    1\simeq_dJ\delta^{d-1}\simeq_d\sum_{j=1}^J|T_j|=\int_Um(y)\,dy\le\|m\|_{L^{\frac d{d-1}}(\mathbb R^d)}|U|^{1/d}
    \lesssim_{\varepsilon,d}\delta^{-\varepsilon}|U|^{1/d},
    $$

    giving $|U|\gtrsim_{\varepsilon,d}\delta^{d\varepsilon}$, i.e. $|U|\gtrsim_{\eta,d}\delta^\eta$ for every $\eta>0$. Finally, if $K\subset\mathbb R^d$ is bounded and contains a unit segment $I_\omega$ in every direction $\omega\in\mathbb S^{d-1}$, then for each $\delta\in(0,\frac12]$ the tubes $T_j=\mathcal N_\delta(I_{\omega_j})$ lie inside the $2\delta$-neighborhood $K_{2\delta}$ of $K$, so $|K_{2\delta}|\ge|U|\gtrsim_{\eta,d}\delta^\eta$ (Exercise 2), forcing $\underline{\dim}_{\mathrm M}(K)=d$. Note that $\delta^\eta$ rules out any dimension drop below $d$, though it does not assert positive $d$-dimensional Lebesgue measure of $K$ itself (which fails already in $d=2$ by Besicovitch's construction).

## 7. Exercises { #exercises }

!!! example "Exercise 1. Distributional verification of the outgoing Helmholtz Green's function"

    Verify that $G(x)=\frac{e^{i|x|}}{|x|}$ satisfies $(\Delta+1)G=-4\pi\delta_0$ in $\mathcal D'(\mathbb R^3)$.

??? solution "Solution"

    Since $|G(x)|=|x|^{-1}$ is locally integrable on $\mathbb R^3$, $G$ defines a distribution. For $r=|x|>0$, radial differentiation gives

    $$
    \Delta\left(\frac{e^{ir}}r\right)=\frac1r\frac{d^2}{dr^2}\left(r\cdot\frac{e^{ir}}r\right)=\frac1r\frac{d^2}{dr^2}(e^{ir})=-\frac{e^{ir}}r,
    $$

    so $(\Delta+1)G=0$ classically on $\mathbb R^3\setminus\{0\}$. For $\varphi\in C_c^\infty(\mathbb R^3)$, dominated convergence and Green's second identity on $\Omega_\varepsilon=\mathbb R^3\setminus\overline{B_\varepsilon(0)}$ (with inward normal $-\frac x\varepsilon$ on $\partial\Omega_\varepsilon=\partial B_\varepsilon(0)$) give

    $$
    \langle(\Delta+1)G,\varphi\rangle
    =\lim_{\varepsilon\downarrow0}\int_{|x|>\varepsilon}G(x)(\Delta\varphi+\varphi)(x)\,dx
    =\lim_{\varepsilon\downarrow0}\int_{|x|=\varepsilon}\left(\frac{\partial G}{\partial r}\varphi-G\frac{\partial\varphi}{\partial r}\right)d\sigma.
    $$

    On $|x|=\varepsilon$, $G=e^{i\varepsilon}/\varepsilon$, $\partial_rG=e^{i\varepsilon}(i\varepsilon-1)/\varepsilon^2$, $|\partial_r\varphi|\le\|\nabla\varphi\|_\infty$, and $\varphi(x)=\varphi(0)+O(\varepsilon)$. The second surface term is $O(\varepsilon)\to0$, while the first equals $4\pi\varepsilon^2\cdot\frac{e^{i\varepsilon}(i\varepsilon-1)}{\varepsilon^2}(\varphi(0)+O(\varepsilon))\to-4\pi\varphi(0)$. Hence $(\Delta+1)G=-4\pi\delta_0$.

!!! example "Exercise 2. Covering numbers and lower Minkowski dimension from neighborhood volume"

    For a nonempty bounded set $K\subset\mathbb R^d$ and $\delta>0$, let $N(K,\delta)$ denote the minimum number of closed balls of radius $\delta$ needed to cover $K$, so the lower Minkowski (box-counting) dimension is

    $$
    \underline{\dim}_{\mathrm M}(K)=\liminf_{\delta\downarrow0}\frac{\log N(K,\delta)}{\log(1/\delta)}.
    $$

    Prove that if the $2\delta$-neighborhood $K_{2\delta}=\{y\in\mathbb R^d:\operatorname{dist}(y,K)<2\delta\}$ satisfies $|K_{2\delta}|\ge c_\eta\delta^\eta$ for every $\eta>0$ and $0<\delta\le\frac12$, then $\underline{\dim}_{\mathrm M}(K)=d$.

??? solution "Solution"

    Let $B(x_1,\delta),\dots,B(x_N,\delta)$ be a minimal covering of $K$ by balls of radius $\delta$, with $N=N(K,\delta)$. For every $y\in K_{2\delta}$ there exists $x\in K$ with $|y-x|<2\delta$, and some covering center $x_m$ satisfies $|x-x_m|\le\delta$; by the triangle inequality, $|y-x_m|<3\delta$. Thus $K_{2\delta}\subset\bigcup_{m=1}^NB(x_m,3\delta)$, and subadditivity of Lebesgue measure gives

    $$
    c_\eta\delta^\eta\le|K_{2\delta}|\le N(K,\delta)\,\omega_d(3\delta)^d=3^d\omega_d\,\delta^dN(K,\delta).
    $$

    Hence $N(K,\delta)\ge(3^d\omega_d)^{-1}c_\eta\delta^{-(d-\eta)}$, and taking logarithms yields

    $$
    \underline{\dim}_{\mathrm M}(K)\ge d-\eta
    \qquad(\forall\,\eta>0).
    $$

    Sending $\eta\downarrow0$ gives $\underline{\dim}_{\mathrm M}(K)\ge d$. Conversely, since $K$ is bounded, covering a containing cube of side $L$ by $O_d((L/\delta)^d)$ balls of radius $\delta$ gives $\overline{\dim}_{\mathrm M}(K)\le d$, so $\underline{\dim}_{\mathrm M}(K)=\overline{\dim}_{\mathrm M}(K)=d$.

## References { #references }

1. P. Tomas, *A restriction theorem for the Fourier transform*, Bulletin of the American Mathematical Society **81** (1975), 477–478; and E. M. Stein, *Harmonic Analysis: Real-Variable Methods, Orthogonality, and Oscillatory Integrals*, Princeton University Press, 1993, Chapter IX.
2. M. Keel and T. Tao, *Endpoint Strichartz estimates*, American Journal of Mathematics **120** (1998), 955–980. [arXiv:math/9803054](https://arxiv.org/abs/math/9803054).
3. T. Tao, *Some recent progress on the restriction conjecture*, in *Fourier Analysis and Convexity*, Birkhäuser, 2004, 217–243. [arXiv:math/0311181](https://arxiv.org/abs/math/0311181).

[Previous: wave Strichartz estimates and the TT* argument](chapter-13.md)
