---
title: "Chapter 8: Anisotropic Littlewood–Paley Theory and Vortex Stretching"
date: 2026-10-22
description: Angular frequency localization on dyadic annuli, anisotropic Bernstein bounds, plate-shaped kernels, and their use on the vortex-stretching term of Navier–Stokes.
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

# Chapter 8: Anisotropic Littlewood–Paley Theory and Vortex Stretching { #chapter-08 }

## 1. From radial pieces to directions { #directions }

We work on $\mathbb R^3$, initially with Schwartz functions, and use the Fourier convention of [Chapter 5](chapter-05.md#motivation) with $d=3$:

$$
\widehat f(\xi)=\int_{\mathbb R^3}e^{-ix\cdot\xi}f(x)\,dx,
\qquad
f(x)=(2\pi)^{-3}\int_{\mathbb R^3}e^{ix\cdot\xi}\widehat f(\xi)\,d\xi .
$$

Thus $\widehat{f*g}=\widehat f\,\widehat g$ and $\|f\|_2^2=(2\pi)^{-3}\|\widehat f\|_2^2$. Any dependence of constants on the angular parameter $\delta$ below is stated explicitly.

From [Chapter 5](chapter-05.md#cutoffs) we have a smooth radial profile $\psi\ge0$ supported in $[1/2,2]$ with $\sum_{j\in\mathbb Z}\psi(2^{-j}r)=1$ for $r>0$, and

$$
\widehat{P_jf}(\xi)=\psi\Big(\frac{|\xi|}{2^j}\Big)\widehat f(\xi),
\qquad
f=\sum_{j\in\mathbb Z}P_jf\quad\text{in }L^2 .
$$

The piece $P_jf$ has Fourier support in $2^{j-1}\le|\xi|\le2^{j+1}$: it records the size of the frequency (wavelength $2^{-j}$) but not its direction.

Directions matter already for convolution. Whatever norm $X$ one uses for $\|f*g\|_X$, the identity $\widehat{f*g}=\widehat f\,\widehat g$ gives

$$
\operatorname{supp}\widehat{f*g}\subset\operatorname{supp}\widehat f\cap\operatorname{supp}\widehat g ,
\qquad
\|f*g\|_2^2=(2\pi)^{-3}\int_{\operatorname{supp}\widehat f\cap\operatorname{supp}\widehat g}|\widehat f|^2|\widehat g|^2\,d\xi .
$$

Two functions with Fourier transforms in the same annulus but in angular sectors separated by an angle $\alpha>0$ have $f*g=0$, which $|\xi|\simeq2^j$ alone cannot detect. Products, such as the Navier–Stokes nonlinearity below, follow a different rule: $\widehat{fg}$ is a convolution, so frequencies *add* rather than intersect.

## 2. A δ-net and a partition of unity on the sphere { #sphere-partition }

Fix $0<\delta\le1/16$; this harmless bound makes the cap geometry below uniform. Let $\mathcal E_\delta\subset\mathbb S^2$ be a maximal $\delta$-separated set: $|e-e'|\ge\delta$ for $e\ne e'$, and no point can be added. Maximality gives the covering

$$
\mathbb S^2=\bigcup_{e\in\mathcal E_\delta}\{\sigma\in\mathbb S^2:|\sigma-e|\le\delta\},
$$

since a point farther than $\delta$ from all of $\mathcal E_\delta$ could be added. The caps of radius $\delta/2$ about the points of $\mathcal E_\delta$ have disjoint interiors and area $\simeq\delta^2$, so $\#\mathcal E_\delta\lesssim\delta^{-2}$; the covering gives the reverse, so $\#\mathcal E_\delta\simeq\delta^{-2}$. Likewise there is an absolute $M$ such that each $\sigma$ lies in at most $M$ of the enlarged caps $|\sigma-e|\le4\delta$: the disjoint $\delta/2$-caps about such $e$ lie in the $5\delta$-cap about $\sigma$; compare areas.

Choose a smooth $\eta:[0,\infty)\to[0,1]$ with $\eta=1$ on $[0,1]$ and $\eta=0$ on $[4,\infty)$, and set

$$
b_e(\sigma)=\eta\Big(\frac{|\sigma-e|}{\delta}\Big),
\qquad
\varphi_e(\sigma)=\frac{b_e(\sigma)}{\sum_{e'\in\mathcal E_\delta}b_{e'}(\sigma)} .
$$

The denominator lies in $[1,M]$: some center is within $\delta$ of $\sigma$, and at most $M$ terms are nonzero. So $\varphi_e$ is smooth, vanishes outside $|\sigma-e|\le4\delta$, and

$$
0\le\varphi_e\le1,\qquad\sum_e\varphi_e=1,\qquad M^{-1}\le\sum_e\varphi_e^2\le1 .
$$

The upper bound is $\sum\varphi_e^2\le(\sum\varphi_e)^2$; the lower bound is Cauchy–Schwarz over at most $M$ nonzero terms, $1=(\sum\varphi_e)^2\le M\sum\varphi_e^2$.

!!! definition "Definition 8.1. Anisotropic Littlewood–Paley operators"

    For $j\in\mathbb Z$ and $e\in\mathcal E_\delta$,

    $$
    \widehat{P_{j,e}f}(\xi)=\psi\Big(\frac{|\xi|}{2^j}\Big)\varphi_e\Big(\frac{\xi}{|\xi|}\Big)\widehat f(\xi).
    $$

    The support $T_{j,e}$ of this multiplier lies in the sector $\{2^{j-1}\le|\xi|\le2^{j+1},\ |\xi/|\xi|-e|\le4\delta\}$.

The sector has radial width $\simeq2^j$ and two transverse widths $\simeq2^j\delta$. The operator filters by wavelength and wave-vector direction; $e$ says nothing about where $P_{j,e}f$ lives in physical space.

## 3. Reconstruction and L² almost orthogonality { #almost-orthogonality }

Since $\sum_e\varphi_e=1$, we have $\sum_eP_{j,e}f=P_jf$, and summing the finite angular partition before the radial limit gives

$$
f=\sum_{j\in\mathbb Z}\sum_{e\in\mathcal E_\delta}P_{j,e}f\qquad\text{in }L^2 .
$$

!!! proposition "Proposition 8.2. Angular almost orthogonality"

    For all $j$ and $f\in L^2(\mathbb R^3)$, with constants independent of $j$ and $\delta$,

    $$
    M^{-1}\|P_jf\|_2^2\le\sum_{e\in\mathcal E_\delta}\|P_{j,e}f\|_2^2\le\|P_jf\|_2^2 .
    $$

??? proof "Proof"

    By Plancherel, in polar coordinates $\xi=r\sigma$ (Jacobian $r^2$),

    $$
    \sum_e\|P_{j,e}f\|_2^2
    =(2\pi)^{-3}\int_0^\infty\!\!\int_{\mathbb S^2}|\psi(r/2^j)|^2\Big(\sum_e\varphi_e(\sigma)^2\Big)|\widehat f(r\sigma)|^2r^2\,d\sigma\,dr .
    $$

    The bracket lies in $[M^{-1},1]$, and without it the integral is exactly $\|P_jf\|_2^2$.

Neighboring sectors overlap, so this is almost orthogonality; bounded overlap prevents both loss of $L^2$ mass and amplification by the number $\simeq\delta^{-2}$ of channels. With the square function

$$
S_\delta f(x)=\Big(\sum_{j\in\mathbb Z}\sum_{e\in\mathcal E_\delta}|P_{j,e}f(x)|^2\Big)^{1/2},
$$

Tonelli, Proposition 8.2 and [radial almost orthogonality](chapter-05.md#almost-orthogonality) give

$$
\|S_\delta f\|_2^2=\sum_j\sum_e\|P_{j,e}f\|_2^2\simeq\sum_j\|P_jf\|_2^2\simeq\|f\|_2^2 .
$$

## 4. The square function in Lᵖ { #square-function }

!!! theorem "Theorem 8.3"

    For fixed $\delta\in(0,1/16]$ and $1<p<\infty$, $\ C_{p,\delta}^{-1}\|f\|_p\le\|S_\delta f\|_p\le C_{p,\delta}\|f\|_p$.

!!! note "Clarification: which constants are controlled"

    For $p=2$ the constants are independent of $\delta$. The argument below gives no such uniformity for other $p$, so the theorem cannot be used without further work when $\delta$ shrinks with $j$.

??? proof "Proof via Calderón–Zygmund theory"

    The identity $\sum_{j,e}\psi(|\xi|/2^j)\varphi_e(\xi/|\xi|)=1$ reconstructs $f$ but does not bound $S_\delta f$. Instead, for signs $\varepsilon_{j,e}\in\{\pm1\}$ and a finite index set, let $T_\varepsilon f=\sum_{j,e}\varepsilon_{j,e}P_{j,e}f$.

    *Signed sums.* At each frequency at most three radial and $M$ angular cutoffs are nonzero, so $T_\varepsilon$ is bounded on $L^2$. For fixed $\delta$ the angular cutoffs have $\delta$-dependent derivative bounds, and scaling plus integration by parts in $\xi$ give, for the scale-$2^j$ kernel $k_j=\sum_e\varepsilon_{j,e}K_{j,e}$ and any large $L$,

    $$
    |k_j(x)|\le C_{L,\delta}2^{3j}(1+2^j|x|)^{-L},\qquad
    |\nabla k_j(x)|\le C_{L,\delta}2^{4j}(1+2^j|x|)^{-L}.
    $$

    Summing the geometric series separately over $2^j|x|\le1$ and $2^j|x|>1$,

    $$
    \Big|\sum_jk_j(x)\Big|\le C_\delta|x|^{-3},\qquad\Big|\nabla\sum_jk_j(x)\Big|\le C_\delta|x|^{-4}\qquad(x\ne0).
    $$

    The Calderón–Zygmund theorem yields $\|T_\varepsilon f\|_p\le C_{p,\delta}\|f\|_p$, uniformly in the signs and the index set.

    *Upper bound.* By Khintchine's inequality ([Chapter 7](chapter-07.md#khintchine)) the average of $|T_\varepsilon f(x)|^p$ over random signs is comparable to $(\sum_{j,e}|P_{j,e}f(x)|^2)^{p/2}$. Integrate in $x$ and let the index set grow.

    *Lower bound.* Let $m_{j,e}$ be the multiplier of $P_{j,e}$ and $A=\sum_{j,e}m_{j,e}^2$; the overlap bounds give $0<c\le A\le C$ off the origin. The dual multipliers $m_{j,e}/A$, with operators $\widetilde P_{j,e}$, have the same fixed-$\delta$ properties, so their square function is bounded on $L^{p'}$. Since $\sum_{j,e}m_{j,e}\cdot m_{j,e}/A=1$ and the multipliers are real, Plancherel, Cauchy–Schwarz in $(j,e)$ and Hölder give

    $$
    |\langle f,g\rangle|=\Big|\sum_{j,e}\langle P_{j,e}f,\widetilde P_{j,e}g\rangle\Big|
    \le\|S_\delta f\|_p\Big\|\Big(\sum_{j,e}|\widetilde P_{j,e}g|^2\Big)^{1/2}\Big\|_{p'}
    \le C_{p,\delta}\|S_\delta f\|_p\|g\|_{p'} .
    $$

    Take the supremum over $\|g\|_{p'}\le1$.

## 5. Anisotropic Bernstein inequality { #anisotropic-bernstein }

!!! proposition "Proposition 8.4. Anisotropic Bernstein"

    For $1\le q\le p\le\infty$, with constants independent of $j,e,\delta$,

    $$
    \|P_{j,e}f\|_p\lesssim\big(2^{3j}\delta^2\big)^{\frac1q-\frac1p}\|P_{j,e}f\|_q,
    \qquad\text{in particular}\qquad
    \|P_{j,e}f\|_\infty\lesssim2^{3j/2}\delta\,\|P_{j,e}f\|_2 .
    $$

Compare the isotropic factor $2^{3j(1/q-1/p)}$ of [Chapter 5](chapter-05.md#bernstein). The new factor is the sector volume:

$$
|T_{j,e}|\simeq\int_{2^{j-1}}^{2^{j+1}}r^2\,dr\cdot\delta^2\simeq2^{3j}\delta^2=2^j\cdot2^j\delta\cdot2^j\delta ,
$$

a fraction $\simeq\delta^2$ of the annulus. The kernel $K_{j,e}=\mathcal F^{-1}[\psi(|\cdot|/2^j)\varphi_e(\cdot/|\cdot|)]$, with $P_{j,e}f=K_{j,e}*f$, satisfies

$$
|K_{j,e}(x)|=(2\pi)^{-3}\Big|\int_0^\infty\!\!\int_{\mathbb S^2}e^{irx\cdot\sigma}\psi(r/2^j)\varphi_e(\sigma)r^2\,d\sigma\,dr\Big|
\le C\int_{2^{j-1}}^{2^{j+1}}r^2\,dr\int_{\operatorname{supp}\varphi_e}\varphi_e\,d\sigma\lesssim2^{3j}\delta^2 .
$$

The bound $\|K_{j,e}\|_1\lesssim1$ needs spatial decay and is proved in [Section 7](#plates).

**A slightly larger bump.** In general $P_{j,e}P_{j,e}f\ne P_{j,e}f$, so, as in [Chapter 5](chapter-05.md#bernstein), use a larger cutoff equal to $1$ on $T_{j,e}$, with kernel $\widetilde K_{j,e}$; then $g=\widetilde K_{j,e}*g$ for $g=P_{j,e}f$. Complete $e$ to an orthonormal frame $(a,b,e)$. Since $\delta\le1/16$, $T_{j,e}$ lies in a box of sides $C2^j\delta,C2^j\delta,C2^j$ along $a,b,e$; take a product of three fixed one-variable cutoffs, rescaled to these sides, equal to $1$ on the box. Then

$$
\widetilde K_{j,e}(x)=2^{3j}\delta^2\,\widetilde k\big(2^j\delta\,x\cdot a,\ 2^j\delta\,x\cdot b,\ 2^jx\cdot e\big),
\qquad
\|\widetilde K_{j,e}\|_r\lesssim(2^{3j}\delta^2)^{1-1/r}\quad(1\le r\le\infty),
$$

with a fixed Schwartz $\widetilde k$; the norm follows by the change of variables $y=(2^j\delta\,x\cdot a,2^j\delta\,x\cdot b,2^jx\cdot e)$.

??? proof "Proof of Proposition 8.4"

    Choose $r$ with $1+\frac1p=\frac1r+\frac1q$; $q\le p$ gives $1\le r\le\infty$. By Young's inequality,

    $$
    \|P_{j,e}f\|_p=\|\widetilde K_{j,e}*P_{j,e}f\|_p\le\|\widetilde K_{j,e}\|_r\|P_{j,e}f\|_q
    \lesssim(2^{3j}\delta^2)^{1-1/r}\|P_{j,e}f\|_q=(2^{3j}\delta^2)^{1/q-1/p}\|P_{j,e}f\|_q .
    $$

Fewer available frequencies leave less freedom to concentrate in physical space; from $L^2$ to $L^\infty$ one angular piece gains the factor $\delta$.

## 6. Geometric depletion { #geometric-depletion }

When can angular localization remove the penalty $(2^{3j}\delta^2)^{1/q-1/p}$? For $j\ge0$, take

$$
\delta\simeq2^{-3j/2}
$$

(say $\delta=c2^{-3j/2}$, $c\le1/16$). Then $2^{3j}\delta^2\simeq1$ and $\|P_{j,e}f\|_p\lesssim\|P_{j,e}f\|_q$ with no growing power of $2^j$: this is *geometric depletion* for a single piece.

!!! note "Clarification: two different apertures"

    The aperture $\delta=O(2^{-j})$ does not produce this. At $\delta\simeq2^{-j}$, $2^{3j}\delta^2\simeq2^j$ and a factor $2^{j(1/q-1/p)}$ remains; the sufficient threshold is $\delta\lesssim2^{-3j/2}$. The two scalings are distinct.

A narrow *filter* is not a function *concentrated* in few directions. Refining the partition increases the number of pieces, and summing the $L^2\to L^\infty$ bound with Cauchy–Schwarz and Proposition 8.2,

$$
\|P_jf\|_\infty\le\sum_e\|P_{j,e}f\|_\infty
\lesssim2^{3j/2}\delta\sum_e\|P_{j,e}f\|_2
\le2^{3j/2}\delta(\#\mathcal E_\delta)^{1/2}\Big(\sum_e\|P_{j,e}f\|_2^2\Big)^{1/2}
\lesssim2^{3j/2}\|P_jf\|_2 .
$$

The gain $\delta$ is cancelled by $(\#\mathcal E_\delta)^{1/2}\simeq\delta^{-1}$: we recover the isotropic estimate, no better. For a regular function, say a PDE solution, an improvement for a nonlinear expression must use more than the existence of a fine partition: actual concentration in few directions, restrictions on which pieces interact, or cancellation in the equation.

## 7. The kernel in physical space: plates { #plates }

Write $x=x_\parallel e+x_\perp$ with $x_\parallel=x\cdot e$ and $x_\perp=(x\cdot a)a+(x\cdot b)b$. On $T_{j,e}$,

$$
|\xi\cdot a|+|\xi\cdot b|\lesssim2^j\delta,\qquad\xi\cdot e\simeq2^j .
$$

Indeed $\xi\cdot a=|\xi|(\xi/|\xi|-e)\cdot a$ since $e\cdot a=0$, so $|\xi\cdot a|\le2^{j+1}\cdot4\delta$, and similarly for $b$; and $|\sigma-e|^2=2-2\sigma\cdot e\le16\delta^2$ gives $\xi\cdot e\ge\frac{31}{32}|\xi|$.

!!! note "Clarification: normalized versus actual frequency"

    "Transverse components of order $\delta$, parallel of order $1$" refers to the frequency normalized by $2^j$. For $\xi$ itself the factors $2^j$ must be kept.

!!! proposition "Proposition 8.5. Plate decay"

    For each integer $N\ge0$ there is $C_N$, independent of $j,e,\delta$, with

    $$
    |K_{j,e}(x)|\le C_N\,2^{3j}\delta^2\big(1+2^j\delta|x_\perp|+2^j|x_\parallel|\big)^{-N}.
    $$

    Consequently $\|K_{j,e}\|_1\lesssim1$ and $\|P_{j,e}f\|_p\lesssim\|f\|_p$ for $1\le p\le\infty$, uniformly.

So the kernel decays rapidly outside $|x_\parallel|\lesssim2^{-j}$, $|x_\perp|\lesssim(2^j\delta)^{-1}$: a *plate*, thin along $e$ and broad in the two transverse directions. Its height $2^{3j}\delta^2$ is the reciprocal of its volume.

??? proof "Proof by integration by parts"

    Substitute $\xi=2^j\delta\,\eta_1a+2^j\delta\,\eta_2b+2^j\eta_3e$ (Jacobian $2^{3j}\delta^2$). The multiplier becomes $A_{e,\delta}(\eta)$, supported in the fixed set $|\eta_1|,|\eta_2|\le8$, $1/4\le\eta_3\le2$. Its derivatives of each order are bounded uniformly: $\psi$ depends smoothly on $|\xi|/2^j=|(\delta\eta_1,\delta\eta_2,\eta_3)|$; each angular derivative of $\varphi_e$ costs $\delta^{-1}$, but a unit change of $\eta_1,\eta_2$, or of $\eta_3$ on the cap, moves $\xi/|\xi|$ by only $O(\delta)$; the normalizing denominator is handled the same way, using its lower bound $1$. Thus, with $y=(2^j\delta\,x\cdot a,\,2^j\delta\,x\cdot b,\,2^jx_\parallel)$,

    $$
    K_{j,e}(x)=(2\pi)^{-3}2^{3j}\delta^2\int_{\mathbb R^3}e^{iy\cdot\eta}A_{e,\delta}(\eta)\,d\eta .
    $$

    Using $(1-\Delta_\eta)^Le^{iy\cdot\eta}=(1+|y|^2)^Le^{iy\cdot\eta}$ and integrating by parts (no boundary terms, as $A_{e,\delta}$ is smooth with compact support),

    $$
    |K_{j,e}(x)|\le(2\pi)^{-3}2^{3j}\delta^2(1+|y|^2)^{-L}\|(1-\Delta_\eta)^LA_{e,\delta}\|_1\le C_L2^{3j}\delta^2(1+|y|^2)^{-L}.
    $$

    As $|y|\simeq2^j\delta|x_\perp|+2^j|x_\parallel|$, take $2L\ge N$. For the $L^1$ bound take $N=4$ and change variables $x\mapsto y$, $dx=(2^{3j}\delta^2)^{-1}dy$:

    $$
    \|K_{j,e}\|_1\le C_42^{3j}\delta^2\int\big(1+2^j\delta|x_\perp|+2^j|x_\parallel|\big)^{-4}dx\le C_4\int_{\mathbb R^3}(1+|y|)^{-4}dy\lesssim1 .
    $$

!!! note "Clarification: “supported on a plate”"

    For smooth cutoffs this means rapid decay outside the plate, not vanishing. Also $P_{j,e}f=K_{j,e}*f$ superposes translated plates weighted by $f$; it need not concentrate near one plate at the origin. The radial width here is the full $2^j$; no thinner radial localization or wave-packet decomposition is made.

## 8. Kinetic energy for Navier–Stokes { #kinetic-energy }

The decomposition gives refined information for the three-dimensional incompressible Navier–Stokes system (viscosity one):

$$
\partial_tu+(u\cdot\nabla)u=-\nabla P+\Delta u,\qquad\nabla\cdot u=0,\qquad u(0)=u_0 ,
$$

with $u_0$ smooth, compactly supported and divergence free. Below, $u$ is assumed smooth with enough decay to justify integration by parts; these are identities for such solutions, not a claim of global existence.

Pair the equation with $u$. The time derivative gives $\frac12\frac d{dt}\|u\|_2^2$; transport and pressure cancel by incompressibility,

$$
\int u\cdot(u\cdot\nabla)u\,dx=\sum_{i,k}\int u_iu_k\partial_ku_i\,dx=\frac12\int u\cdot\nabla|u|^2\,dx=-\frac12\int(\nabla\cdot u)|u|^2\,dx=0,
\qquad
-\int u\cdot\nabla P\,dx=\int P\,\nabla\cdot u\,dx=0 ;
$$

and $\int u\cdot\Delta u=-\|\nabla u\|_2^2$. Hence $\frac12\frac d{dt}\|u\|_2^2+\|\nabla u\|_2^2=0$, and

$$
\frac12\|u(t)\|_2^2+\int_0^t\|\nabla u(s)\|_2^2\,ds=\frac12\|u_0\|_2^2 .
$$

This controls total energy and integrated dissipation, not the size of small-scale gradients at each time.

## 9. Vorticity and vortex stretching { #vortex-stretching }

Let $\omega=\nabla\times u$. Curl kills $\nabla P$ and commutes with $\Delta$. From $(u\cdot\nabla)u=\nabla\frac{|u|^2}2-u\times\omega$ and

$$
\nabla\times(u\times\omega)=u(\nabla\cdot\omega)-\omega(\nabla\cdot u)+(\omega\cdot\nabla)u-(u\cdot\nabla)\omega ,
$$

with $\nabla\cdot u=\nabla\cdot\omega=0$, we get $\nabla\times[(u\cdot\nabla)u]=(u\cdot\nabla)\omega-(\omega\cdot\nabla)u$, so

$$
\partial_t\omega+(u\cdot\nabla)\omega=(\omega\cdot\nabla)u+\Delta\omega .
$$

The left side is the material derivative $\partial_t+U$, $U=u_i\partial_{x_i}$. The *vortex-stretching* term $(\omega\cdot\nabla)u$, the change of velocity along the vorticity, is not cancelled by incompressibility.

**Velocity gradient from vorticity.** Since $\nabla\times\omega=\nabla(\nabla\cdot u)-\Delta u=-\Delta u$, the decaying solution is

$$
u=(-\Delta)^{-1}(\nabla\times\omega),\qquad\nabla u=\nabla(-\Delta)^{-1}(\nabla\times\omega)=:R(\omega),\qquad
\widehat u(\xi)=\frac{i\xi\times\widehat\omega(\xi)}{|\xi|^2}.
$$

!!! note "Clarification: the sign of the inverse Laplacian"

    With $\Delta=\sum_k\partial_k^2$, the inverse is $(-\Delta)^{-1}$, i.e. $u=-\Delta^{-1}\nabla\times\omega$. The sign is irrelevant for norms but matters in the identity.

The entries of $\widehat{\nabla u}$ are combinations of the degree-zero multipliers $\xi_k\xi_l/|\xi|^2$ applied to $\widehat\omega$, so they are Calderón–Zygmund operators and

$$
\|\nabla u\|_p\le C_p\|\omega\|_p,\qquad1<p<\infty
$$

(no claim at $p=1,\infty$). No power of the frequency is lost. Write $R_{ij}(\omega)=\partial_ju_i$, so $[(\omega\cdot\nabla)u]_i=\sum_j\omega_jR_{ij}(\omega)$.

**Enstrophy.** Dot the vorticity equation with $\omega$ and use $\omega\cdot\Delta\omega=\Delta\frac{|\omega|^2}2-|\nabla\omega|^2$:

$$
(\partial_t+u\cdot\nabla-\Delta)\frac{|\omega|^2}2=\omega\cdot[(\omega\cdot\nabla)u]-|\nabla\omega|^2 .
$$

Integrating, the transport and Laplacian terms vanish, and

$$
\frac12\frac d{dt}\|\omega\|_2^2+\|\nabla\omega\|_2^2=\sum_{i,j=1}^3\int_{\mathbb R^3}\omega_i\omega_jR_{ij}(\omega)\,dx .
$$

Viscosity removes enstrophy $\frac12\|\omega\|_2^2$; stretching can create it. Only the symmetric part of $\nabla u$ contributes, since $\omega_i\omega_j$ is symmetric, so the orientation of $\omega$ relative to the strain matters.

!!! note "Clarification: the ODE heuristic"

    Since $\nabla u=R(\omega)$, the right side is cubic in $\omega$ and the stretching term is quadratic, suggesting $\dot x\sim x^2$, which blows up in finite time, competing with dissipation. This is a heuristic, not a closed ODE; the precise statements are the two displays above.

!!! note "Clarification: a continuation criterion"

    "Control of $\|\omega(t)\|_{L^2}$ gives global well-posedness" means: if a strong solution with smooth data exists on $[0,T)$, $T<\infty$, and $\sup_{0\le t<T}\|\omega(t)\|_2<\infty$, then it continues past $T$. Finiteness at each $t<T$ is not enough, and no such bound is proved here for arbitrary data.

Indeed, for divergence-free decaying $u$, $|\xi|^2|\widehat u|^2=|\xi\times\widehat u|^2+|\xi\cdot\widehat u|^2$ gives $\|\nabla u\|_2=\|\omega\|_2$. With the energy bound this is a uniform $H^1$ bound, and local strong theory restarts from a bounded $H^1$ set with a common existence time. The real issue is the a priori bound: stretching production against viscous dissipation.

## 10. Plate decomposition of the stretching term { #plate-stretching }

Write a plate index as $\mathfrak p=(k,e)$, $k\in\mathbb Z$, $e\in\mathcal E_\delta$, and $P_{\mathfrak p}=P_{k,e}$ (the letters $i,j$ remain vector components). Expand all three factors:

$$
\omega_i=\sum_{\mathfrak p_1}P_{\mathfrak p_1}\omega_i,\qquad
\omega_j=\sum_{\mathfrak p_2}P_{\mathfrak p_2}\omega_j,\qquad
R_{ij}(\omega)=\sum_{\mathfrak p_3}P_{\mathfrak p_3}R_{ij}(\omega)=\sum_{\mathfrak p_3}R_{ij}(P_{\mathfrak p_3}\omega),
$$

the last because Fourier multipliers commute. The stretching integral becomes

$$
\sum_{i,j=1}^3\sum_{\mathfrak p_1,\mathfrak p_2,\mathfrak p_3}\int_{\mathbb R^3}(P_{\mathfrak p_1}\omega_i)(P_{\mathfrak p_2}\omega_j)(P_{\mathfrak p_3}R_{ij}(\omega))\,dx .
$$

For smooth decaying $\omega$, read this with finite radial sums first, then pass to the limit: Littlewood–Paley partial sums converge in $L^3$, $R_{ij}$ is bounded on $L^3$, and Hölder controls the cubic integral. No absolute summability of the trilinear terms is presupposed.

Each term carries three scales and three directions; one piece is controlled by [Section 5](#anisotropic-bernstein) and [Section 7](#plates), and the task is to sum without losing the angular gains, as happened in [Section 6](#geometric-depletion). By the identity

$$
\int f_1f_2f_3\,dx=(2\pi)^{-6}\iint\widehat f_1(\xi_1)\widehat f_2(\xi_2)\widehat f_3(-\xi_1-\xi_2)\,d\xi_1\,d\xi_2
$$

(see the exercise), a term vanishes if

$$
0\notin T_{\mathfrak p_1}+T_{\mathfrak p_2}+T_{\mathfrak p_3}.
$$

This is a *sum* condition, unlike the intersection condition for convolution in [Section 1](#directions). A nonzero term needs compatible frequencies and overlapping plates in physical space; the decomposition exposes these constraints, but does not by itself make stretching small.

!!! note "Clarification: frequency direction is not vorticity direction"

    The label $e$ is a Fourier direction. Since $\operatorname{div}\omega=0$ gives $\xi\cdot\widehat\omega(\xi)=0$, on $P_{k,e}\omega$ the vorticity vector is nearly perpendicular to $e$. Physical vorticity alignment must be justified separately.

The lecture stops at this reduction. The next task is an estimate for the trilinear sum that keeps the geometric gains and closes the enstrophy balance, via the overlap and incidence geometry of plates and Guth's multilinear Kakeya methods; no Kakeya estimate or regularity theorem has been proved here. [Chapter 9](chapter-09.md) continues with analytic tubes, multilinear Kakeya and overlap estimates.

## 11. Exercise: three plates in one direction { #exercise }

!!! example "Exercise. Frequency sums of plate pieces"

    (a) Prove the trilinear identity of [Section 10](#plate-stretching) for Schwartz $f_1,f_2,f_3$.

    (b) If $\mathfrak p_\ell=(k_\ell,e)$, $\ell=1,2,3$, share one cap center $e$, show $\int(P_{\mathfrak p_1}f_1)(P_{\mathfrak p_2}f_2)(P_{\mathfrak p_3}f_3)\,dx=0$. Which directions can interact?

??? solution "Solution"

    (a) $\widehat{f_1f_2}=(2\pi)^{-3}\widehat f_1*\widehat f_2$, and $\int gh\,dx=(2\pi)^{-3}\int\widehat g(\xi)\widehat h(-\xi)\,d\xi$ by Plancherel, since $\overline{\widehat{\bar h}(\xi)}=\widehat h(-\xi)$. With $g=f_1f_2$, $h=f_3$,

    $$
    \int f_1f_2f_3\,dx=(2\pi)^{-6}\iint\widehat f_1(\xi_1)\widehat f_2(\xi-\xi_1)\widehat f_3(-\xi)\,d\xi_1\,d\xi ,
    $$

    and $\xi_2=\xi-\xi_1$ gives the identity; all integrals converge absolutely.

    (b) Every $\xi\in T_{k,e}$ has $\xi\cdot e\ge\frac{31}{32}|\xi|>0$ ([Section 7](#plates)). So $\xi_\ell\in T_{\mathfrak p_\ell}$ forces $(\xi_1+\xi_2+\xi_3)\cdot e>0$, and the integrand in (a) vanishes. The same holds whenever some unit $v$ has $\xi\cdot v>0$ on all three sectors. A nonzero stretching term therefore needs frequency directions not confined to an open hemisphere: two nearly opposite directions, or three spread around a great circle. Quantifying such interactions is the task of the next chapter.

[Previous: square functions and paraproducts](chapter-07.md) · [Next: analytic tubes and overlap estimates](chapter-09.md)
