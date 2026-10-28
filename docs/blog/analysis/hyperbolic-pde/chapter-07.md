---
title: "Chapter 7: Square Functions, the Heat Flow, and Paraproducts"
date: 2026-10-15
description: The Littlewood–Paley square function theorem via Khintchine and Calderón–Zygmund, heat decay at each scale, and the paraproduct decomposition of products.
hide:
  - navigation
categories:
  - 分析
  - Hyperbolic PDEs
tags:
  - hyperbolic-pde
  - harmonic-analysis
  - littlewood-paley
  - course
---

# Chapter 7: Square Functions, the Heat Flow, and Paraproducts { #chapter-07 }

## 1. Setting and what we keep from Chapter 5 { #setting }

This chapter has two aims: to recover an $L^p$ norm from its frequency pieces, and to organize the interactions of these pieces in a nonlinear equation. The first is the square function theorem, proved from Khintchine's inequality, the Calderón–Zygmund theorem, and duality. The heat equation then illustrates the linear theory, and products lead to the paraproduct decomposition.

We work on $\mathbb R^d$, $d\ge1$, with the Fourier convention of [Chapter 5](chapter-05.md#motivation):

$$
\widehat f(\xi)=\int_{\mathbb R^d}e^{-ix\cdot\xi}f(x)\,dx,
\qquad
f(x)=\frac1{(2\pi)^d}\int_{\mathbb R^d}e^{ix\cdot\xi}\widehat f(\xi)\,d\xi.
$$

The dyadic cutoffs are those of [Chapter 5](chapter-05.md#cutoffs): $\varphi$ is a radial, radially nonincreasing bump with $\varphi=1$ on $\{|\xi|\le1\}$ and $\varphi=0$ on $\{|\xi|\ge2\}$, and

$$
\psi(\xi)=\varphi(\xi)-\varphi(2\xi),\qquad
\widehat{P_kf}(\xi)=\psi(2^{-k}\xi)\widehat f(\xi),\qquad
\widehat{P_{\le j}f}(\xi)=\varphi(2^{-j}\xi)\widehat f(\xi).
$$

Thus $\psi\ge0$, $\operatorname{supp}\psi\subset\{1/2\le|\xi|\le2\}$, $\sum_{k\in\mathbb Z}\psi(2^{-k}\xi)=1$ for $\xi\ne0$, and $\sum_{k\le j}\psi(2^{-k}\xi)=\varphi(2^{-j}\xi)$ for $\xi\ne0$. In this chapter we write the kernel as

$$
\Phi=\mathcal F^{-1}\psi,\qquad
P_kf=\Phi_k*f,\qquad
\Phi_k(x)=2^{kd}\Phi(2^kx).
$$

(Chapter 5 called this kernel $K$; we reserve $K$ for Calderón–Zygmund kernels.) $\Phi$ is Schwartz and $\int\Phi=\psi(0)=0$: each $P_k$ measures variation at scale $2^{-k}$ and removes a constant background. $P_kf$ is localized in frequency, not in space; its kernel is concentrated at distances of order $2^{-k}$ with rapidly decaying tails.

We use from Chapter 5, without repeating the proofs: $L^2$ reconstruction and almost orthogonality $\|f\|_2^2\simeq\sum_k\|P_kf\|_2^2$ ([§3](chapter-05.md#almost-orthogonality)); Bernstein's inequality $\|P_kf\|_r\lesssim2^{kd(1/p-1/r)}\|P_kf\|_p$ for $p\le r$ ([§5](chapter-05.md#bernstein)); the dyadic descriptions of $H^s$, $\dot H^s$ and the Besov norms ([§6–7](chapter-05.md#sobolev)); and the critical embedding and its failure ([§8–10](chapter-05.md#sobolev-embedding)). Constants in $\lesssim$ may depend on $d$, the exponents, and the fixed cutoff, but not on the function or the dyadic index.

!!! remark "Remark. Homogeneous reconstruction and the general critical embedding"

    Annular cutoffs annihilate polynomials, so a homogeneous Besov seminorm cannot distinguish $f$ from $f$ plus a polynomial. Whenever an actual function is reconstructed, we choose the representative with vanishing low-frequency remainder:

    $$
    P_{\le j}f\longrightarrow0\quad\text{in }\mathcal S'\qquad(j\to-\infty).
    $$

    Schwartz functions satisfy this convention. With it, the argument of [Proposition 5.6](chapter-05.md#besov-endpoint) extends from $p=2$ to every $1\le p\le\infty$: Bernstein with $r=\infty$ gives

    $$
    \|f\|_\infty\le\sum_k\|P_kf\|_\infty\lesssim\sum_k2^{kd/p}\|P_kf\|_p=\|f\|_{\dot B^{d/p}_{p,1}},
    $$

    and the finite right side makes the reconstruction converge uniformly. So $\dot B^{d/p}_{p,1}\hookrightarrow L^\infty$, and likewise $B^{d/p}_{p,1}\hookrightarrow L^\infty$, using $\|P_{\le0}f\|_\infty\lesssim\|P_{\le0}f\|_p$ for the low block. The failure of $H^{d/2}\hookrightarrow L^\infty$ can also be seen with equal weights: for a real Schwartz $h$ with Fourier support in $\{1<|\xi|<2\}$ and $h(0)>0$, the functions $f_N=N^{-1/2}\sum_{j=1}^Nh(2^{3j}x)$ have disjoint Fourier supports above unit frequency, so $\|f_N\|_{H^{d/2}}\lesssim1$, while $f_N(0)=\sqrt N\,h(0)$. Quadratic summability lets the bands pile up at one point; the $\ell^1$ sum in $\dot B^{d/2}_{2,1}$ controls precisely this accumulation.

## 2. Why a nonlinear equation requires frequency analysis { #nonlinear-motivation }

Consider the wave or Klein–Gordon equation

$$
\partial_t^2u-\Delta u+m^2u=N(u),\qquad u(0)=u_0,\quad\partial_tu(0)=u_1,
$$

with $m\ge0$. The motivating nonlinearity is $N(u)=\lambda u^3$; the sign of $\lambda$ does not matter for the norm calculation below. On a time interval $I$,

$$
\|u^3\|_{L_t^1L_x^2(I\times\mathbb R^d)}
=\int_I\Big(\int|u(t,x)|^6\,dx\Big)^{1/2}dt
=\int_I\|u(t)\|_{L_x^6}^3\,dt
=\|u\|_{L_t^3L_x^6(I\times\mathbb R^d)}^3.
$$

This explains the norm $L_t^3L_x^6$: it makes the cubic forcing integrable in time in the energy estimate. As in [Chapter 4](chapter-04.md#scattering), for a global energy solution, finiteness of this norm on $[0,\infty)$ is a sufficient scattering criterion.

Here scattering means approaching a solution of the *linear* equation in the energy norm

$$
\|(v,w)\|_{\mathcal E_m}^2=\|\nabla v\|_2^2+m^2\|v\|_2^2+\|w\|_2^2.
$$

For $m>0$ this is equivalent to the $H^1\times L^2$ norm; for $m=0$ it is the homogeneous energy norm. Let $U_m(t)$ be the linear energy evolution, an isometry group on $\mathcal E_m$, and $X(t)=(u(t),\partial_tu(t))$. Duhamel's formula $X(t)=U_m(t)X(0)+\int_0^tU_m(t-s)(0,N(u(s)))\,ds$ can be rewritten as

$$
U_m(-t)X(t)=X(0)+\int_0^tU_m(-s)\big(0,N(u(s))\big)\,ds.
$$

Since $\|U_m(-s)(0,F)\|_{\mathcal E_m}=\|F\|_2$, the integral converges absolutely in $\mathcal E_m$ as $t\to\infty$ when $N(u)\in L_t^1L_x^2([0,\infty)\times\mathbb R^d)$. Its limit defines $X_+=X(0)+\int_0^\infty U_m(-s)(0,N(u(s)))\,ds$, and applying the isometry $U_m(t)$,

$$
\|X(t)-U_m(t)X_+\|_{\mathcal E_m}
=\left\|\int_t^\infty U_m(-s)\big(0,N(u(s))\big)\,ds\right\|_{\mathcal E_m}
\le\int_t^\infty\|N(u(s))\|_2\,ds\longrightarrow0.
$$

This is a criterion for a solution already known to exist globally. It is neither a proof of global existence nor a claim that every scattering solution satisfies this particular spacetime bound.

**Concentration and transfer to fine scales.** The density $|u(t,x)|^6$ might concentrate near a point. A precise model is

$$
u_k(x)=2^{kd/6}w\big(2^k(x-x_0)\big),\qquad\int_{\mathbb R^d}|w|^6\,dx=1,
$$

with $w$ Schwartz. A change of variables gives $\|u_k\|_6=1$, and for every bounded continuous $a$, $\int a(x)|u_k(x)|^6\,dx=\int a(x_0+2^{-k}y)|w(y)|^6\,dy\to a(x_0)$; that is,

$$
|u_k(x)|^6\,dx\rightharpoonup\delta_{x_0},\qquad\|u_k\|_{L^6}=1.
$$

The spatial width is $2^{-k}$ and the Fourier profile is dilated by $2^k$: if $\widehat w$ lives in a unit annulus, $u_k$ is localized at $|\xi|\sim2^k$. (A one-dimensional picture is the family $2^ke^{-2^{2k}(x-x_0)^2}$, $k=0,1,2,\dots$, all with integral $\sqrt\pi$.) Concentration of the density alone does not force its integral, or the $L^6$ norm, to diverge. What matters for the $L_t^3L_x^6$ norm is how long the concentration persists in time.

Applying $P_k$ to the equation leaves the linear terms diagonal in frequency, but the cubic term becomes

$$
P_k(u^3)=P_k\left(\sum_{k',k'',k'''}(P_{k'}u)(P_{k''}u)(P_{k'''}u)\right).
$$

It is not $(P_ku)^3$: a nonlinear term couples different scales. One may picture a transfer to successively finer scales during the evolution,

$$
k\longrightarrow k+10\longrightarrow k+100\longrightarrow k+1000.
$$

!!! remark "Remark. The arrows are schematic"

    Establishing such a transfer requires analysis of the solution; it is a possible mechanism, not a proved evolution law. One interaction cannot jump far: if $\widehat u$ is supported in $\{|\xi|\le R\}$, then $\widehat{u^3}$ is supported in $\{|\xi|\le3R\}$ (see [§11](#paraproducts)). An arbitrarily large jump requires further evolution and repeated interactions.

Two tools are therefore needed: the square function, to reconstruct an $L^p$ norm from the bands, and paraproducts, to organize the nonlinear interactions.

## 3. The Littlewood–Paley square function { #square-function }

!!! definition "Definition 7.1. Square function"

    The Littlewood–Paley square function of $f$ is

    $$
    Sf(x)=\left(\sum_{k\in\mathbb Z}|P_kf(x)|^2\right)^{1/2}.
    $$

For $f\in L^2$, Tonelli and almost orthogonality give $\int(Sf)^2=\sum_k\|P_kf\|_2^2\le\|f\|_2^2<\infty$, so $Sf$ is finite almost everywhere.

!!! theorem "Theorem 7.2. Square function theorem"

    For $1<p<\infty$ there are constants $0<c_p\le C_p<\infty$ such that

    $$
    c_p\|f\|_p\le\|Sf\|_p\le C_p\|f\|_p.
    $$

    The estimate holds first for Schwartz functions, hence for $C_c^\infty$, and extends to every $f\in L^p$ by density.

The proof occupies [§5–8](#khintchine). For the density step: the upper bound for Schwartz functions shows that $f\mapsto(P_kf)_k$ extends to a bounded map $L^p\to L^p(\ell^2)$, and the lower bound then passes to limits.

At a point $x$, $Sf(x)$ records the quadratic size of the oscillations seen at every scale. Adding the bands to reconstruct $f(x)$ retains their relative signs and phases; the square function discards cancellation between different bands. The theorem says that after spatial integration in $L^p$ these two measurements are comparable. It does not assert a pointwise comparison.

For $p=2$, Tonelli and Plancherel give

$$
\|Sf\|_2^2=\sum_k\|P_kf\|_2^2\simeq\|f\|_2^2.
$$

For $p\ne2$, the square sum must remain *inside* the spatial $L^p$ norm; it cannot simply be replaced by $\big(\sum_k\|P_kf\|_p^2\big)^{1/2}$.

**The cancellation example.** On $\mathbb R$ take

$$
f(x)=\cos x-\cos2x.
$$

For our cutoff, $\psi(1)=\varphi(1)-\varphi(2)=1$, while $\psi(1/2)=\varphi(1/2)-\varphi(1)=0$ and $\psi(2)=\varphi(2)-\varphi(4)=0$. Since $\widehat f$ is supported at $\pm1,\pm2$ and $\psi$ is even,

$$
P_0f=\cos x,\qquad P_1f=-\cos2x,\qquad P_kf=0\quad(k\ne0,1).
$$

Consequently $f(0)=0$ while $Sf(0)=\sqrt2$. This correctly demonstrates the loss of pointwise cancellation.

!!! remark "Remark. What the example does and does not show"

    By itself the example does not disprove an $L^\infty$ norm estimate, which compares suprema over all $x$. The trigonometric example may be read periodically, or as a bounded tempered distribution on $\mathbb R$ (with $P_k$ acting by the multiplier on its Fourier measure); it is not in $L^p(\mathbb R)$ for finite $p$. The norm equivalence really does fail at $p=1$ and $p=\infty$, but this requires separate examples, given next.

## 4. The endpoints p = 1 and p = ∞ { #endpoints }

**Failure at $p=1$.** Take $f\in C_c^\infty$, $f\ge0$, with $\int f=1$. Since $\psi\ge0$ is not identically zero,

$$
\Phi(0)=(2\pi)^{-d}\int\psi(\xi)\,d\xi>0.
$$

By continuity choose $a,c>0$ with $\Phi(z)\ge c$ for $|z|\le3a$ (in particular $\Phi$ is real there; in fact $\Phi$ is real and even since $\psi$ is). Suppose $\operatorname{supp}f\subset\{|y|\le\rho\}$. For $|x|$ large, choose $k=k(x)\in\mathbb Z$ with

$$
a\le2^k|x|<2a.
$$

If $y\in\operatorname{supp}f$, then $|2^k(x-y)|\le2^k|x|+2^k\rho<2a+2a\rho/|x|\le3a$ once $|x|\ge2\rho$. Hence

$$
P_kf(x)=2^{kd}\int\Phi\big(2^k(x-y)\big)f(y)\,dy\ge c\,2^{kd}\ge c\,a^d|x|^{-d}.
$$

Thus $Sf(x)\ge|P_{k(x)}f(x)|\gtrsim|x|^{-d}$ for large $|x|$, so $Sf\notin L^1$, although $f\in L^1$. The upper estimate fails at $p=1$.

**Failure at $p=\infty$.** Choose a real Schwartz function $h$ with $\operatorname{supp}\widehat h\subset\{|\xi|<1/10\}$ and $h(0)>0$, and let

$$
f_N(x)=h(x)\sum_{j=1}^N\cos\big(2^{4j}x_1\big).
$$

Then $\|f_N\|_\infty\ge f_N(0)=N\,h(0)$. The $j$th term has Fourier support within distance $1/10$ of $\pm2^{4j}e_1$, so its frequencies satisfy $2^{4j}-1/10<|\xi|<2^{4j}+1/10$. The annulus $\{2^{k-1}\le|\xi|\le2^{k+1}\}$ meets this set only for $k\in\{4j-1,4j,4j+1\}$; these groups are disjoint for different $j$. Therefore, at each point, at most $3N$ bands are nonzero, each band $P_kf_N=P_k\big(h\cos(2^{4j}x_1)\big)$ comes from a single term, and

$$
|P_kf_N(x)|\le\|\Phi\|_1\|h\|_\infty
$$

since $\|P_k\|_{L^\infty\to L^\infty}\le\|\Phi_k\|_1=\|\Phi\|_1$. It follows that

$$
\|Sf_N\|_\infty\le\sqrt{3N}\,\|\Phi\|_1\|h\|_\infty\lesssim\sqrt N.
$$

No constant can make $\|f\|_\infty\lesssim\|Sf\|_\infty$ hold for all such $f$, since the ratio is at least a multiple of $\sqrt N$. This suffices to rule out the endpoint norm equivalence. The point is that $\ell^2$ summation of $N$ unit amplitudes gives $\sqrt N$, while coherent addition gives $N$.

## 5. Khintchine's inequality { #khintchine }

The proof of Theorem 7.2 has three ingredients: Khintchine's inequality, the Calderón–Zygmund theorem, and duality. The first converts a family of linear operators into the square function.

Let $\varepsilon_k$ be independent random signs, each equal to $1$ or $-1$ with probability $1/2$, and write $\mathbb E_\varepsilon$ for the expectation.

!!! lemma "Lemma 7.3. Khintchine's inequality"

    For $0<p<\infty$ there are constants $0<A_p\le B_p<\infty$ such that, for every finite complex sequence $(z_k)$,

    $$
    A_p\left(\sum_k|z_k|^2\right)^{1/2}
    \le\left(\mathbb E_\varepsilon\left|\sum_k\varepsilon_kz_k\right|^p\right)^{1/p}
    \le B_p\left(\sum_k|z_k|^2\right)^{1/2}.
    $$

    The constants do not depend on the number of terms.

Equivalently, the expectation without its $p$th root is comparable to $\big(\sum_k|z_k|^2\big)^{p/2}$. For $p=2$ this is an identity: since $\mathbb E\varepsilon_k\varepsilon_j=\delta_{kj}$ by independence, the cross terms vanish and

$$
\mathbb E_\varepsilon\left|\sum_k\varepsilon_kz_k\right|^2
=\sum_{k,j}\mathbb E(\varepsilon_k\varepsilon_j)\,z_k\overline{z_j}
=\sum_k|z_k|^2.
$$

Random signs remove systematic alignment between different bands; the typical size of a randomly signed sum is governed by the quadratic size of its coefficients. Only $1<p<\infty$ is needed below. A proof is the [exercise](#exercise) at the end of the chapter.

## 6. The Calderón–Zygmund theorem used here { #calderon-zygmund }

We use the following convolution form of the theorem, quoted without proof.

!!! theorem "Theorem 7.4. Calderón–Zygmund, convolution form"

    Let $T$ be a linear operator bounded on $L^2(\mathbb R^d)$ with $\|T\|_{L^2\to L^2}\le B$. Suppose that for compactly supported smooth $f$ and $x\notin\operatorname{supp}f$,

    $$
    Tf(x)=\int_{\mathbb R^d}K(x-y)f(y)\,dy,
    $$

    where $K$ is $C^1$ away from the origin and

    $$
    |K(z)|\le A|z|^{-d},\qquad|\nabla K(z)|\le A|z|^{-d-1}\qquad(z\ne0).
    $$

    Then, for $1<p<\infty$,

    $$
    \|Tf\|_p\le C_{p,d}(A+B)\|f\|_p.
    $$

The representation is required only away from the support because a singular kernel need not define an absolutely convergent integral on the diagonal. The operator is already defined on $L^2$; its $L^2$ boundedness is an essential hypothesis, not a consequence of the size bound alone.

The first kernel estimate gives the strength of the interaction across a separation $|z|$. The derivative estimate says that moving the observation point by a small fraction of that separation changes the kernel only by a controlled amount. These scale-consistent estimates let cancellation, first available in $L^2$, control the other $L^p$ norms. What matters for us is that the conclusion depends only on $A$ and $B$.

## 7. Randomized operators and the upper estimate { #upper-estimate }

Work first with a finite set $F\subset\mathbb Z$ and a fixed choice of signs $\varepsilon=(\varepsilon_k)$. Define

$$
T_{\varepsilon,F}f=\sum_{k\in F}\varepsilon_kP_kf=K_{\varepsilon,F}*f,
\qquad
K_{\varepsilon,F}(x)=\sum_{k\in F}\varepsilon_k2^{kd}\Phi(2^kx).
$$

!!! proposition "Proposition 7.5. Uniform bounds for randomized operators"

    For $1<p<\infty$,

    $$
    \|T_{\varepsilon,F}f\|_p\le C_p\|f\|_p,
    $$

    with $C_p$ independent of both the signs and $F$.

??? proof "Proof"

    Since $F$ is finite, $K_{\varepsilon,F}$ is a Schwartz function and the integral representation of Theorem 7.4 holds trivially. The whole point is to verify the hypotheses with constants $A,B$ independent of $\varepsilon$ and $F$.

    **The $L^2$ bound.** The multiplier is

    $$
    m_{\varepsilon,F}(\xi)=\sum_{k\in F}\varepsilon_k\psi(2^{-k}\xi).
    $$

    Because $\psi\ge0$ and the full sum is one for $\xi\ne0$,

    $$
    |m_{\varepsilon,F}(\xi)|\le\sum_{k\in F}\psi(2^{-k}\xi)\le1.
    $$

    Plancherel gives $\|T_{\varepsilon,F}\|_{L^2\to L^2}\le1$, so $B=1$.

    **Kernel size and smoothness.** The change of variables $\eta=2^k\xi$ gives

    $$
    \Phi(2^kx)=(2\pi)^{-d}\int e^{i2^kx\cdot\xi}\psi(\xi)\,d\xi
    =2^{-kd}(2\pi)^{-d}\int e^{ix\cdot\eta}\psi(2^{-k}\eta)\,d\eta.
    $$

    The last integrand is supported in $2^{k-1}\le|\eta|\le2^{k+1}$, a set of volume $\simeq2^{kd}$. Taking absolute values shows only that $|\Phi(2^kx)|\lesssim1$, i.e. $|2^{kd}\Phi(2^kx)|\lesssim2^{kd}$, which cannot be summed over all $k$. To sum the kernels we also need their rapid decay. Since $\psi\in C_c^\infty$, repeated integration by parts gives, for $a=0,1$ and every $N$,

    $$
    |\nabla^a\Phi(z)|\le C_{N,a}(1+|z|)^{-N}.
    $$

    Since $\nabla^a[2^{kd}\Phi(2^kx)]=2^{k(d+a)}(\nabla^a\Phi)(2^kx)$ and $|\varepsilon_k|=1$, enlarging $F$ to $\mathbb Z$ gives

    $$
    |\nabla^aK_{\varepsilon,F}(x)|\lesssim\sum_{k\in\mathbb Z}2^{k(d+a)}(1+2^k|x|)^{-N}.
    $$

    Fix $x\ne0$, write $r=|x|$, and choose $j\in\mathbb Z$ with

    $$
    2^jr\le1<2^{j+1}r.
    $$

    For the low indices, bound $(1+2^kr)^{-N}\le1$ and sum the geometric series:

    $$
    \sum_{k\le j}2^{k(d+a)}(1+2^kr)^{-N}\le\sum_{k\le j}2^{k(d+a)}\lesssim2^{j(d+a)}\le r^{-d-a}.
    $$

    For the high indices, bound $(1+2^kr)^{-N}\le(2^kr)^{-N}$ and take $N>d+a$:

    $$
    \sum_{k>j}2^{k(d+a)}(1+2^kr)^{-N}\le r^{-N}\sum_{k>j}2^{k(d+a-N)}
    \lesssim r^{-N}2^{(j+1)(d+a-N)}
    =r^{-d-a}(2^{j+1}r)^{d+a-N}\le r^{-d-a},
    $$

    since $2^{j+1}r>1$ and $d+a-N<0$. Thus

    $$
    |K_{\varepsilon,F}(x)|\lesssim|x|^{-d},\qquad|\nabla K_{\varepsilon,F}(x)|\lesssim|x|^{-d-1},
    $$

    uniformly in $\varepsilon$ and $F$. The case $a=1$ is the derivative bound. Theorem 7.4 with these uniform $A$ and $B=1$ proves the proposition.

!!! remark "Remark. Why the sum must be split"

    The scale with $2^k\sim|x|^{-1}$ determines the size of the sum. Larger spatial kernels (smaller $k$) contribute a convergent geometric series through their amplitude; smaller spatial kernels (larger $k$) contribute through their rapid decay. Bounding each summand separately by $|x|^{-d}$ and then summing over infinitely many $k$ would miss this mechanism and would not prove the estimate.

!!! proposition "Proposition 7.6. The upper square-function estimate"

    For $1<p<\infty$ and $f\in\mathcal S(\mathbb R^d)$, $\|Sf\|_p\le C_p\|f\|_p$.

??? proof "Proof"

    Apply Khintchine pointwise with $z_k=P_kf(x)$, $k\in F$. Since $\mathbb E_\varepsilon$ is a finite average over the $2^{|F|}$ sign choices, it commutes with the integral (Tonelli), and Proposition 7.5 applies to each choice:

    $$
    \left\|\Big(\sum_{k\in F}|P_kf|^2\Big)^{1/2}\right\|_p^p
    \lesssim_p\int_{\mathbb R^d}\mathbb E_\varepsilon\left|\sum_{k\in F}\varepsilon_kP_kf(x)\right|^p dx
    =\mathbb E_\varepsilon\|T_{\varepsilon,F}f\|_p^p
    \lesssim_p\|f\|_p^p.
    $$

    Let $F=\{-M,\dots,M\}$ and send $M\to\infty$. The left side increases to $\|Sf\|_p^p$ by monotone convergence, and the right side does not depend on $M$.

Working with finite sums makes the probabilistic calculation and the limiting step unambiguous.

## 8. The reverse estimate by duality { #reverse-estimate }

Let $p'=p/(p-1)$ and take $f,g\in\mathcal S(\mathbb R^d)$. With the complex pairing $\langle f,g\rangle=\int f\overline g$,

$$
\langle f,g\rangle=\sum_{k,j}\langle P_kf,P_jg\rangle
=\sum_{|k-j|\le1}\int_{\mathbb R^d}P_kf(x)\,\overline{P_jg(x)}\,dx.
$$

Indeed, $\langle f,g\rangle=\lim_M\big\langle\sum_{|k|\le M}P_kf,\sum_{|j|\le M}P_jg\big\rangle$ by $L^2$ reconstruction, and by Plancherel $\langle P_kf,P_jg\rangle=(2\pi)^{-d}\int\psi_k\psi_j\widehat f\,\overline{\widehat g}=0$ when $|k-j|\ge2$, because separated annuli have disjoint supports. Absolute convergence of the remaining sum is justified by the bound below.

For each shift $\ell\in\{-1,0,1\}$, Cauchy–Schwarz in $k$ gives the pointwise bound

$$
\sum_k|P_kf(x)|\,|P_{k+\ell}g(x)|
\le\Big(\sum_k|P_kf(x)|^2\Big)^{1/2}\Big(\sum_k|P_{k+\ell}g(x)|^2\Big)^{1/2}
=Sf(x)\,Sg(x).
$$

Summing over the three shifts, then applying Hölder and the upper estimate at the exponent $p'\in(1,\infty)$,

$$
|\langle f,g\rangle|\le3\int_{\mathbb R^d}Sf\,Sg\,dx
\le3\|Sf\|_p\|Sg\|_{p'}
\le3C_{p'}\|Sf\|_p\|g\|_{p'}.
$$

Taking the supremum over Schwartz $g$ with $\|g\|_{p'}\le1$ (which are dense in the unit ball of $L^{p'}$, as $p'<\infty$) gives

$$
\|f\|_p\le3C_{p'}\|Sf\|_p,
$$

which completes the proof of Theorem 7.2 with $c_p=(3C_{p'})^{-1}$.

!!! remark "Remark. Two or three neighbors"

    The lecture notes sum over $|k-j|\le2$, i.e. five shifts, obtaining the constant $5$. This is harmless but slightly wasteful: for the cutoffs of [Chapter 5](chapter-05.md#almost-orthogonality), $\psi_k\psi_j=0$ already when $|k-j|\ge2$, so three shifts suffice. With a different cutoff whose bands overlap more, one simply includes more shifts.

In this argument, only neighboring frequency bands can detect one another in a pairing. Duality turns this restricted overlap into control of the whole function by its quadratic band sizes.

## 9. The heat equation, scale by scale { #heat }

Consider

$$
\partial_tu=\Delta u,\qquad u(0)=u_0,\qquad t\ge0,
$$

with $u_0\in\mathcal S(\mathbb R^d)$ to begin with. Since $P_k$ commutes with $\Delta$,

$$
\partial_tP_ku=\Delta P_ku,
$$

and the exact Fourier evolution is

$$
\widehat{P_ku}(t,\xi)=e^{-t|\xi|^2}\psi(2^{-k}\xi)\widehat{u_0}(\xi).
$$

!!! remark "Remark. A band is not an eigenfunction"

    The mnemonic $\partial_tP_ku\approx-2^{2k}P_ku$ correctly identifies the decay scale, but it is not an equality: a dyadic annulus contains many values of $|\xi|^2$, from $2^{2k-2}$ to $2^{2k+2}$. In particular, one cannot write $P_ku(t,x)=e^{-t2^{2k}}P_ku_0(x)$ pointwise. Exponential decay of a band is a norm estimate.

**Exponential decay of a band.** For $p=2$, the exact formula and $|\xi|\ge2^{k-1}$ on the support give directly

$$
\|P_ku(t)\|_2\le e^{-t2^{2k-2}}\|P_ku_0\|_2.
$$

!!! proposition "Proposition 7.7. Band decay in Lᵖ"

    There are constants $C,c>0$, independent of $k$ and $t\ge0$, such that for $1\le p\le\infty$

    $$
    \|P_ku(t)\|_p\le Ce^{-ct2^{2k}}\|P_ku_0\|_p.
    $$

??? proof "Proof"

    Choose an annular cutoff $\widetilde\psi\in C_c^\infty(\{1/4<|\eta|<4\})$ equal to one on $\operatorname{supp}\psi$. Since $\widetilde\psi\psi=\psi$, the operator taking $P_ku_0$ to $P_ku(t)$ may be taken to have multiplier

    $$
    e^{-t|\xi|^2}\widetilde\psi(2^{-k}\xi).
    $$

    After the scaling $\xi=2^k\eta$, its kernel is $2^{kd}\kappa_\tau(2^kx)$, where

    $$
    \kappa_\tau=\mathcal F^{-1}\big[m_\tau\big],\qquad m_\tau(\eta)=e^{-\tau|\eta|^2}\widetilde\psi(\eta),\qquad\tau=t2^{2k},
    $$

    and it has the same $L^1$ norm as $\kappa_\tau$. On the fixed annular support, $|\eta|^2\ge1/16$, and every derivative of $m_\tau$ of fixed order is bounded by a polynomial in $\tau$ times $e^{-\tau/16}$. Integration by parts gives $x^\alpha\kappa_\tau=\mathcal F^{-1}\big[(i\partial_\eta)^\alpha m_\tau\big]$, so for $|\alpha|\le d+1$

    $$
    |x^\alpha\kappa_\tau(x)|\le(2\pi)^{-d}\|\partial^\alpha m_\tau\|_1\lesssim(1+\tau)^{d+1}e^{-\tau/16},
    $$

    hence $|\kappa_\tau(x)|\lesssim(1+|x|)^{-d-1}(1+\tau)^{d+1}e^{-\tau/16}$ and

    $$
    \|\kappa_\tau\|_1\lesssim(1+\tau)^{d+1}e^{-\tau/16}\le Ce^{-c\tau}
    $$

    for any fixed $c<1/16$. Young's inequality gives the claim.

Thus a structure of size $\ell=2^{-k}$ diffuses on the time scale $t\sim\ell^2=2^{-2k}$: fine structures are erased first. The linear heat equation damps each frequency without transferring it to another frequency.

**Recovering the $L^p$ estimate with the square function.** For $t>0$ write

$$
u(t)=G_t*u_0,\qquad G_t(x)=(4\pi t)^{-d/2}e^{-|x|^2/(4t)},\qquad G_t\ge0,\quad\|G_t\|_1=1.
$$

Because convolutions commute, $P_ku(t)=G_t*P_ku_0$. Minkowski's integral inequality in $\ell^2$ (the $\ell^2$ norm of an integral is at most the integral of the $\ell^2$ norms, using $G_t\ge0$) yields the pointwise comparison

$$
\begin{aligned}
Su(t,x)
&=\left(\sum_k\left|\int G_t(y)P_ku_0(x-y)\,dy\right|^2\right)^{1/2}\\
&\le\int G_t(y)\left(\sum_k|P_ku_0(x-y)|^2\right)^{1/2}dy
=(G_t*Su_0)(x).
\end{aligned}
$$

For $1<p<\infty$, the square function theorem and Young's inequality now give

$$
\|u(t)\|_p\lesssim\|Su(t)\|_p\le\|G_t*Su_0\|_p\le\|Su_0\|_p\lesssim\|u_0\|_p.
$$

The pointwise bound is by a spatial average of $Su_0$, not by $Su_0(x)$ itself: heat can arrive at a point from its neighbors.

!!! remark "Remark. The endpoints belong to the square function, not to the heat flow"

    The restriction $1<p<\infty$ in the last chain comes from the square function theorem. The heat estimate itself is stronger and includes both endpoints:

    $$
    \|u(t)\|_p\le\|u_0\|_p,\qquad1\le p\le\infty,
    $$

    directly from $u(t)=G_t*u_0$ and $\|G_t\|_1=1$. The failure at $p=1,\infty$ in [§4](#endpoints) concerns the square-function norm equivalence, not heat-flow contraction. The square-function route is instructive because it generalizes to evolutions without a positive kernel.

## 10. Nonlinear equations after frequency localization { #localized-nonlinear }

The linear $L^p$ reconstruction is now available. What remains is to estimate the products generated by the equation. Two examples illustrate this: the cubic Klein–Gordon equation and the incompressible Navier–Stokes equations.

Writing the cubic term on the left, consider

$$
\begin{cases}
\partial_t^2u-\Delta u+m^2u+\lambda u^3=0,\\
u(0)=u_0,\qquad\partial_tu(0)=u_1.
\end{cases}
$$

This is [§2](#nonlinear-motivation) with $N(u)=-\lambda u^3$; moving the term across the equality changes its sign. Applying $P_k$ gives the exact equation

$$
\partial_t^2P_ku-\Delta P_ku+m^2P_ku+\lambda P_k(u^3)=0,
$$

with data $P_ku_0$ and $P_ku_1$. Only the last term couples frequency bands.

For incompressible Navier–Stokes with viscosity normalized to one,

$$
\begin{cases}
\partial_tv+v\cdot\nabla v=-\nabla p+\Delta v,\\
\nabla\cdot v=0,\qquad v(0)=v_0,
\end{cases}
$$

the localized system is

$$
\begin{cases}
\partial_tP_kv+P_k(v\cdot\nabla v)=-\nabla P_kp+\Delta P_kv,\\
\nabla\cdot(P_kv)=0,\qquad P_kv(0)=P_kv_0.
\end{cases}
$$

Here $p$ denotes the pressure, not an exponent. The spatial multipliers commute with $\partial_t$, $\nabla$, and $\Delta$; they do not commute with multiplication by $v$.

The velocity at a large scale can transport a much finer feature, while two fine-scale oscillations can interact to produce a slowly varying component. The viscous term damps each band on its own, exactly as in [§9](#heat); the transport term couples the bands. These different roles are visible in the localized system before any nonlinear estimate is attempted.

## 11. Products, Fourier support, and paraproducts { #paraproducts }

**Multiplication adds frequency vectors.** Recall $(f*g)(x)=\int_{\mathbb R^d}f(x-y)g(y)\,dy$. With our Fourier convention,

$$
\widehat{fg}(\xi)=(2\pi)^{-d}(\widehat f*\widehat g)(\xi)
=(2\pi)^{-d}\int\widehat f(\eta)\,\widehat g(\xi-\eta)\,d\eta.
$$

If $\operatorname{supp}\widehat f\subset D_1$ and $\operatorname{supp}\widehat g\subset D_2$ with $D_1,D_2$ compact, then

$$
\operatorname{supp}\widehat{fg}\subset D_1+D_2,\qquad
D_1+D_2=\{\xi_1+\xi_2:\xi_1\in D_1,\ \xi_2\in D_2\}.
$$

Indeed, the integrand vanishes unless $\eta\in D_1$ and $\xi-\eta\in D_2$, which forces $\xi\in D_1+D_2$, a compact hence closed set. This is a containment; cancellation can make the support smaller. More generally $\operatorname{supp}(f*g)\subset\operatorname{supp}f+\operatorname{supp}g$ when the supports are compact; when the convolution exists and the supports are not compact, the containment uses the closure of the sum. Applied twice, it gives the claim of [§2](#nonlinear-motivation) that $\widehat{u^3}$ is supported in $\{|\xi|\le3R\}$ if $\widehat u$ is supported in $\{|\xi|\le R\}$.

For plane waves the rule is exact:

$$
e^{ix\cdot\xi_1}e^{ix\cdot\xi_2}=e^{ix\cdot(\xi_1+\xi_2)}.
$$

Frequency is a vector. Two large vectors can nearly cancel, leaving a small output frequency; their magnitudes alone do not determine the output. On the other hand, adding a small frequency set $D_{\rm low}$ to a distant one $D_{\rm high}$ only broadens $D_{\rm high}$ slightly without moving it toward zero: high plus low stays near the high frequency.

**An exact partition of the interactions.** For $f,g\in\mathcal S(\mathbb R^d)$,

$$
P_k(fg)=P_k\left[\Big(\sum_{k'}P_{k'}f\Big)\Big(\sum_{k''}P_{k''}g\Big)\right].
$$

The double series converges absolutely in $L^2$: for Schwartz $f$, $\|P_{k'}f\|_\infty\le(2\pi)^{-d}\|\psi_{k'}\widehat f\|_1$ is $O(2^{k'd})$ as $k'\to-\infty$ and rapidly decreasing as $k'\to\infty$, so $\sum_{k',k''}\|P_{k'}f\|_\infty\|P_{k''}g\|_2<\infty$. Hence the terms may be regrouped freely. Fix the separation of ten dyadic indices and define the low-frequency cutoff relative to $k'$ by

$$
\widetilde P_{k'}g:=\sum_{k''\le k'-10}P_{k''}g=P_{\le k'-10}\,g,
$$

the second equality because $\sum_{k''\le j}\psi(2^{-k''}\xi)=\varphi(2^{-j}\xi)$ for $\xi\ne0$. Every pair $(k',k'')$ lies in exactly one of the three disjoint regions

$$
k''\le k'-10,\qquad k'\le k''-10,\qquad|k'-k''|<10.
$$

Thus

$$
fg=\underbrace{\sum_{k'}(P_{k'}f)(\widetilde P_{k'}g)}_{\text{high–low}}
+\underbrace{\sum_{k''}(\widetilde P_{k''}f)(P_{k''}g)}_{\text{low–high}}
+\underbrace{\sum_{|k'-k''|<10}(P_{k'}f)(P_{k''}g)}_{\text{high–high}}.
$$

!!! definition "Definition 7.8. Paraproduct pieces"

    For $f,g\in\mathcal S(\mathbb R^d)$ and $k\in\mathbb Z$, set

    $$
    \begin{aligned}
    \Pi^{(k)}_{H\text{–}L}(f,g)&:=P_k\sum_{k'}(P_{k'}f)(\widetilde P_{k'}g),\\
    \Pi^{(k)}_{L\text{–}H}(f,g)&:=P_k\sum_{k''}(\widetilde P_{k''}f)(P_{k''}g),\\
    \Pi^{(k)}_{H\text{–}H}(f,g)&:=P_k\sum_{|k'-k''|<10}(P_{k'}f)(P_{k''}g).
    \end{aligned}
    $$

Since $P_k$ is bounded on $L^2$ and may be applied termwise,

$$
P_k(fg)=\Pi^{(k)}_{H\text{–}L}(f,g)+\Pi^{(k)}_{L\text{–}H}(f,g)+\Pi^{(k)}_{H\text{–}H}(f,g).
$$

The low–high term is obtained from the high–low term by interchanging $f$ and $g$: $\Pi^{(k)}_{L\text{–}H}(f,g)=\Pi^{(k)}_{H\text{–}L}(g,f)$. The number ten is only a separation buffer. The strict inequality in the high–high range prevents pairs with $|k'-k''|=10$ from being counted twice.

**Where can the output frequency lie?** In a high–low interaction, write $j=k'$. The multiplier of $\widetilde P_j=P_{\le j-10}$ is $\varphi(2^{-(j-10)}\xi)$, supported in $|\xi|\le2^{j-9}$. The supports therefore satisfy

$$
2^{j-1}\le|\xi_1|\le2^{j+1},\qquad|\xi_2|\le2^{j-9},
$$

and hence

$$
\big(\tfrac12-2^{-9}\big)2^j\le|\xi_1+\xi_2|\le\big(2+2^{-9}\big)2^j.
$$

The output remains comparable to $2^j$. The support of $\psi_k$ is $\{2^{k-1}\le|\xi|\le2^{k+1}\}$; it misses this shell if $2^{k+1}<(\frac12-2^{-9})2^j$, i.e. if $k\le j-3$, and if $2^{k-1}>(2+2^{-9})2^j$, i.e. if $k\ge j+3$. So applying $P_k$ to the $j$th high–low term gives zero unless $|k-j|\le2$, and

$$
\Pi^{(k)}_{H\text{–}L}(f,g)=P_k\sum_{|k'-k|\le2}(P_{k'}f)(P_{\le k'-10}\,g).
$$

The same statement holds with the roles reversed in a low–high interaction.

For high–high interactions, let $J=\max(k',k'')$. Then $|\xi_1|,|\xi_2|\le2^{J+1}$ and

$$
|\xi_1+\xi_2|\le2^{J+2},
$$

but there is no positive lower bound. An output band must satisfy $2^{k-1}\le2^{J+2}$, i.e. $k\le J+3$; it may lie arbitrarily far below $J$.

| Interaction | Output | Interpretation |
| --- | --- | --- |
| High–low | Near the high input band, $\lvert k-k'\rvert\le2$ | A slowly varying factor modulates a fine oscillation |
| Low–high | Near the high input band, $\lvert k-k''\rvert\le2$ | The same mechanism with the factors reversed |
| High–high | Comparable or much lower frequencies, $k\le J+3$ | Fine oscillations can reinforce or produce a slowly varying beat |

For example, in one dimension,

$$
e^{iNx}e^{-i(N-\eta)x}=e^{i\eta x},\qquad|\eta|\ll N,
$$

is a high–high interaction with low output. The real-valued identity

$$
\cos^2(Nx)=\tfrac12+\tfrac12\cos(2Nx)
$$

produces both a constant component and a higher harmonic. These examples explain why high–high interactions cannot be treated as though their output were always high.

The product estimates that motivate the decomposition concern quantities such as

$$
\|fg\|_{\dot B^s_{p,q}},\qquad\|fgh\|_{\dot B^s_{p,q}},\qquad\|P_k(u^3)\|_p.
$$

The decomposition separates the three interaction patterns before estimating them. Cubic terms can be handled by applying the bilinear decomposition twice, or by sorting the three input frequencies in the expansion of $P_k(u^3)$ from [§2](#nonlinear-motivation).

!!! remark "Remark. Scope of the formulas"

    The required estimates depend on the regularities and integrabilities of the factors; no unrestricted product of arbitrary distributions is asserted here. For Schwartz functions the formulas are justified directly, as above. In rough function spaces, convergence of the series must be established by the corresponding estimates.

## 12. Exercise: Khintchine's inequality { #exercise }

!!! example "Exercise. Prove Lemma 7.3"

    Prove Khintchine's inequality for $0<p<\infty$, and explain why the constants are independent of the number of terms. Hint: first take $z_k=a_k$ real with $\sum_ka_k^2=1$ and bound $\mathbb E_\varepsilon e^{\lambda X}$, where $X=\sum_k\varepsilon_ka_k$.

??? solution "Solution"

    **Real coefficients, upper bound.** By homogeneity assume $\sum_ka_k^2=1$. Comparing Taylor series, $(2n)!\ge2^nn!$ gives $\cosh y\le e^{y^2/2}$. By independence, for $\lambda>0$,

    $$
    \mathbb E e^{\lambda X}=\prod_k\mathbb E e^{\lambda\varepsilon_ka_k}=\prod_k\cosh(\lambda a_k)
    \le\prod_ke^{\lambda^2a_k^2/2}=e^{\lambda^2/2}.
    $$

    Chebyshev's inequality gives $\mathbb P(X>t)\le e^{-\lambda t}\mathbb Ee^{\lambda X}\le e^{\lambda^2/2-\lambda t}$; choose $\lambda=t$. Since $X$ and $-X$ have the same law,

    $$
    \mathbb P(|X|>t)\le2e^{-t^2/2}.
    $$

    The layer-cake formula then gives

    $$
    \mathbb E|X|^p=\int_0^\infty pt^{p-1}\mathbb P(|X|>t)\,dt
    \le2p\int_0^\infty t^{p-1}e^{-t^2/2}\,dt=:B_p^p<\infty.
    $$

    **Real coefficients, lower bound.** The case $p=2$ is the identity $\mathbb EX^2=1$. If $p\ge2$, Hölder on the probability space gives $(\mathbb E|X|^p)^{1/p}\ge(\mathbb EX^2)^{1/2}=1$. If $0<p<2$, write $2=\theta p+4(1-\theta)$ with $\theta=2/(4-p)\in(0,1)$. Hölder with exponents $1/\theta$ and $1/(1-\theta)$ gives

    $$
    1=\mathbb E\big(|X|^{\theta p}|X|^{4(1-\theta)}\big)
    \le(\mathbb E|X|^p)^\theta(\mathbb E|X|^4)^{1-\theta}
    \le(\mathbb E|X|^p)^\theta B_4^{4(1-\theta)},
    $$

    so $\mathbb E|X|^p\ge B_4^{-4(1-\theta)/\theta}>0$.

    **Complex coefficients.** Write $z_k=a_k+ib_k$ and $X=X_1+iX_2$ with $X_1=\sum\varepsilon_ka_k$, $X_2=\sum\varepsilon_kb_k$. Since $\max(|X_1|,|X_2|)\le|X|\le|X_1|+|X_2|$ and $\sum|z_k|^2=\sum a_k^2+\sum b_k^2$, the real case applied to $X_1$ and $X_2$ gives both inequalities, with constants changed by factors depending only on $p$ (for instance $2^{-1/2}A_p$ below, from $\mathbb E|X|^p\ge\max(\mathbb E|X_1|^p,\mathbb E|X_2|^p)$; and above $\sqrt2B_p$ by Minkowski if $p\ge1$, or $2^{1/p}B_p$ from $|X|^p\le|X_1|^p+|X_2|^p$ if $p<1$).

    **Independence of the number of terms.** The only property of $(a_k)$ used was $\sum_ka_k^2=1$: the moment generating bound $e^{\lambda^2/2}$, hence the Gaussian tail and every moment bound, involve neither the length of the sequence nor the individual coefficients. This is what allows the inequality to be applied pointwise to $z_k=P_kf(x)$ with $F$ arbitrary in [§7](#upper-estimate).

[Previous: restriction and wave packets](chapter-06.md) · [Next: anisotropic Littlewood–Paley theory](chapter-08.md)
