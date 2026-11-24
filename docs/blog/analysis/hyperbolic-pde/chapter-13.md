---
title: "Chapter 13: Wave Strichartz Estimates and the TT* Argument"
date: 2026-11-18
description: Wave admissibility, Littlewood–Paley reduction, spacetime TT* duality, Riesz–Thorin spatial interpolation, and temporal fractional integration for homogeneous Strichartz estimates.
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

# Chapter 13: Wave Strichartz Estimates and the TT* Argument { #chapter-13 }

A single dyadic band of a free wave conserves its $L^2(\mathbb R^n)$ norm while its $L^\infty(\mathbb R^n)$ amplitude decays like $(1+N|t|)^{-(n-1)/2}$ for $L^1(\mathbb R^n)$ data ([Chapter 12](chapter-12.md#dispersive-estimate)). This chapter converts those two fixed-time bounds into global spacetime $L_t^qL_x^r$ Strichartz estimates via the spacetime $TT^*$ duality method: passing to $T_NT_N^*$ makes the propagation kernel depend only on elapsed time $t-\tau$, allowing spatial Riesz–Thorin interpolation followed by one-dimensional Young or Hardy–Littlewood–Sobolev integration in time.

As in [Chapter 12](chapter-12.md), space-time is $\mathbb R^{1+n}$ with $n\ge2$, $\Box=\partial_t^2-\Delta_x$, $D=\sqrt{-\Delta_x}$, $\widehat f(\xi)=\int_{\mathbb R^n}e^{-ix\cdot\xi}f(x)\,dx$, and mixed norms read

$$
\|u\|_{L_t^qL_x^r}=\left(\int_{\mathbb R}\|u(t,\cdot)\|_{L^r(\mathbb R^n)}^q\,dt\right)^{1/q},
$$

with the essential supremum in $t$ when $q=\infty$. Homogeneous Sobolev norms are $\|h\|_{\dot H^s}=\|D^sh\|_{L^2(\mathbb R^n)}=(2\pi)^{-n/2}\||\xi|^s\widehat h(\xi)\|_{L^2_\xi}$.

## 1. Wave admissibility and dyadic Littlewood–Paley reduction { #dyadic-reduction }

!!! theorem "Theorem 13.1. Homogeneous wave Strichartz estimate"

    Let $n\ge2$, $2\le q\le\infty$, and $2\le r<\infty$ satisfy the **wave-admissibility** and **scaling** conditions

    $$
    \frac2q\le(n-1)\left(\frac12-\frac1r\right),
    \qquad
    s=\frac n2-\frac nr-\frac1q.
    \tag{1.1}
    $$

    For every solution of $\Box u=0$ with $(u,\partial_tu)|_{t=0}=(f,g)\in\dot H^s(\mathbb R^n)\times\dot H^{s-1}(\mathbb R^n)$,

    $$
    \|u\|_{L_t^qL_x^r(\mathbb R\times\mathbb R^n)}\le C_{n,q,r}\big(\|f\|_{\dot H^s(\mathbb R^n)}+\|g\|_{\dot H^{s-1}(\mathbb R^n)}\big).
    \tag{1.2}
    $$

In three dimensions ($n=3$), (1.1) reads $\frac1q+\frac1r\le\frac12$ and $s=\frac32-\frac3r-\frac1q$; admissible examples include the energy norm $(\infty,2)$ at $s=1$, the cubic-scattering norm $(3,6)$ at $s=\frac23$, the critical cubic norm $(4,4)$ at $s=\frac12$, and the energy-critical quintic norm $(5,10)$ at $s=1$.

**Why $r<\infty$ and why $(n,q,r)=(3,2,\infty)$ fails.** Restricting Theorem 13.1 to $r<\infty$ reflects two distinct obstructions at $r=\infty$:

1. *Summing dyadic bands:* Even at $q=\infty$, setting $r=\infty$ gives $s=\frac n2$, where $\dot H^{n/2}(\mathbb R^n)\not\hookrightarrow L^\infty(\mathbb R^n)$ ([Chapter 5](chapter-05.md#endpoint-counterexample)), and the Littlewood–Paley square-function equivalence fails at $p=\infty$ ([Chapter 7](chapter-07.md#endpoints)).
2. *The forbidden three-dimensional endpoint:* In $n=3$, $(q,r)=(2,\infty)$ satisfies $\frac12+\frac1\infty=\frac12$ and $s=1$, suggesting $\|u\|_{L_t^2L_x^\infty(\mathbb R^{1+3})}\lesssim\|f\|_{\dot H^1}+\|g\|_{L^2}$. Klainerman and Machedon (1993) proved that this estimate *fails* even for radial data (though its radial restriction away from $x=0$ or angularly smoothed versions survive). In the abstract $TT^*$ framework of Keel and Tao [[1]](#references), $(q,r,\sigma)=(2,\infty,1)$ is the unique forbidden endpoint. When $n\ge4$, equality at $q=2$ in (1.1) instead gives $r=\frac{2(n-1)}{n-3}<\infty$ ($\sigma=\frac{n-1}2\ge\frac32>1$), which *is* covered by Theorem 13.1.

**Reduction to one frequency band.** Let $\sum_{j\in\mathbb Z}\psi(2^{-j}|\xi|)=1$ ($\xi\ne0$) be the smooth real radial Littlewood–Paley partition of [Chapter 5](chapter-05.md#cutoffs), with $\operatorname{supp}\psi\subset[1/2,2]$, $N=2^j$, $\psi_N(\xi)=\psi(|\xi|/N)$, and $P_Nh=\mathcal F^{-1}(\psi_N\widehat h)$. Begin with Schwartz data whose Fourier transforms are supported in finitely many dyadic annuli (dense in $\dot H^s\times\dot H^{s-1}$); the resulting estimate defines the propagator on $\dot H^s\times\dot H^{s-1}$ by completion.

Suppose we establish, for every smooth radial cutoff $\psi$ supported in $[1/2,2]$ (and in particular for an enlarged cutoff $\widetilde P_N=\widetilde\psi(D/N)$ equal to $1$ on $\operatorname{supp}\psi_N$), the single-band half-wave bound

$$
\|T_Nh\|_{L_t^qL_x^r}\lesssim N^s\|h\|_{L^2(\mathbb R^n)},
\qquad
T_Nh(t,x):=e^{itD}P_Nh(x).
\tag{1.3}
$$

Applying (1.3) with $\widetilde P_N$ in place of $P_N$ to $h=P_Nf$ and $h=D^{-1}P_Ng$ (noting $\widetilde P_NP_N=P_N$ and $\|D^{-1}P_Ng\|_{L^2}\le2N^{-1}\|P_Ng\|_{L^2}$), and combining both half-waves $u(t)=\frac12(e^{itD}+e^{-itD})f+\frac1{2i}D^{-1}(e^{itD}-e^{-itD})g$, gives

$$
\|P_Nu\|_{L_t^qL_x^r}\lesssim N^s\|P_Nf\|_{L^2}+N^{s-1}\|P_Ng\|_{L^2}.
\tag{1.4}
$$

Because $2\le r<\infty$, the square-function theorem ([Theorem 7.2](chapter-07.md#square-function)) gives $\|u(t)\|_{L_x^r}\simeq\big\|\big(\sum_N|P_Nu(t)|^2\big)^{1/2}\big\|_{L_x^r}$ at every time $t$. Since $q/2\ge1$ and $r/2\ge1$, Minkowski's triangle inequality in $L_t^{q/2}L_x^{r/2}$ moves the sum over $N$ outside the spacetime norm:

$$
\|u\|_{L_t^qL_x^r}^2
\lesssim\left\|\sum_N|P_Nu|^2\right\|_{L_t^{q/2}L_x^{r/2}}
\le\sum_N\||P_Nu|^2\|_{L_t^{q/2}L_x^{r/2}}
=\sum_N\|P_Nu\|_{L_t^qL_x^r}^2.
$$

Inserting (1.4) and using $\sum_NN^{2s}\|P_Nf\|_{L^2}^2\simeq\|f\|_{\dot H^s}^2$ and $\sum_NN^{2(s-1)}\|P_Ng\|_{L^2}^2\simeq\|g\|_{\dot H^{s-1}}^2$ yields (1.2). Everything therefore reduces to proving (1.3).

## 2. Spacetime duality and the TT* kernel { #ttstar-duality }

Write $X=L_t^qL_x^r(\mathbb R\times\mathbb R^n)$ and $Y=L_t^{q'}L_x^{r'}(\mathbb R\times\mathbb R^n)$, where $\frac1q+\frac1{q'}=\frac1r+\frac1{r'}=1$, and denote the complex spacetime pairing by $\langle G,F\rangle_{t,x}=\iint_{\mathbb R^{1+n}}G(t,x)\overline{F(t,x)}\,dx\,dt$.

!!! lemma "Lemma 13.2. Abstract TT* duality equivalence"

    Let $2\le q\le\infty$, $2\le r<\infty$, and $A>0$. The following three bounds, tested over $h\in\mathcal S(\mathbb R^n)$ and $F\in\mathcal S(\mathbb R^{1+n})$, are equivalent:

    $$
    \begin{aligned}
    \|T_Nh\|_X&\le A\|h\|_{L_x^2}&&(\forall\,h\in\mathcal S(\mathbb R^n)),\\
    \|T_N^*F\|_{L_x^2}&\le A\|F\|_Y&&(\forall\,F\in\mathcal S(\mathbb R^{1+n})),\\
    \|T_NT_N^*F\|_X&\le A^2\|F\|_Y&&(\forall\,F\in\mathcal S(\mathbb R^{1+n})).
    \end{aligned}
    \tag{2.1}
    $$

??? proof "Proof"

    Because $1<r'<\infty$ and $1\le q'\le2$, $\mathcal S(\mathbb R^{1+n})$ is dense in $Y=L_t^{q'}L_x^{r'}$ (including $q'=1$ when $q=\infty$), and $X=Y^*$ is the isometric dual of $Y$, so $\|G\|_X=\sup\{|\langle G,F\rangle_{t,x}|:F\in\mathcal S(\mathbb R^{1+n}),\ \|F\|_Y\le1\}$ for every locally integrable $G$, while $\|v\|_{L_x^2}=\sup\{|\langle h,v\rangle_x|:h\in\mathcal S(\mathbb R^n),\ \|h\|_{L_x^2}\le1\}$. For $h\in\mathcal S(\mathbb R^n)$ and $F\in\mathcal S(\mathbb R^{1+n})$, $T_Nh$ is smooth with polynomially bounded derivatives and $F$ is rapidly decaying, so Fubini justifies $\langle T_Nh,F\rangle_{t,x}=\langle h,T_N^*F\rangle_x$. Taking suprema over $\|h\|_{L_x^2}\le1$ and $\|F\|_Y\le1$ proves equivalence of the first two lines.

    Composing the second line with the first gives $\|T_NT_N^*F\|_X\le A\|T_N^*F\|_{L_x^2}\le A^2\|F\|_Y$. Conversely, if the third line holds, then for every $F\in\mathcal S(\mathbb R^{1+n})$,

    $$
    \|T_N^*F\|_{L_x^2}^2=\langle T_N^*F,T_N^*F\rangle_x=\langle T_NT_N^*F,F\rangle_{t,x}
    \le\|T_NT_N^*F\|_X\|F\|_Y\le A^2\|F\|_Y^2,
    $$

    recovering the second line after taking square roots.

**Explicit formulas for $T_N^*$ and $T_NT_N^*$.** Let $\widehat F(\tau,\xi)=\int_{\mathbb R^n}e^{-ix\cdot\xi}F(\tau,x)\,dx$ denote the spatial Fourier transform of $F\in\mathcal S(\mathbb R^{1+n})$. Since $\psi_N$ is real-valued, spatial Plancherel gives

$$
\langle T_Nh,F\rangle_{t,x}
=(2\pi)^{-n}\int_{\mathbb R}\int_{\mathbb R^n}e^{i\tau|\xi|}\psi_N(\xi)\widehat h(\xi)\overline{\widehat F(\tau,\xi)}\,d\xi\,d\tau
=\left\langle h,\mathcal F_x^{-1}\!\left[\int_{\mathbb R}e^{-i\tau|\xi|}\psi_N(\xi)\widehat F(\tau,\cdot)\,d\tau\right]\right\rangle_x.
$$

Thus

$$
\widehat{T_N^*F}(\xi)=\int_{\mathbb R}e^{-i\tau|\xi|}\psi_N(\xi)\widehat F(\tau,\xi)\,d\tau,
\qquad
\widehat{T_NT_N^*F}(t,\xi)=\int_{\mathbb R}e^{i(t-\tau)|\xi|}\psi_N(\xi)^2\widehat F(\tau,\xi)\,d\tau.
$$

Transforming back to physical space, $T_NT_N^*$ is a spacetime convolution with squared cutoff:

$$
(T_NT_N^*F)(t,x)=\int_{\mathbb R}\big(K_N(t-\tau,\cdot)*_xF(\tau,\cdot)\big)(x)\,d\tau,
\qquad
K_N(t,x)=\frac1{(2\pi)^n}\int_{\mathbb R^n}e^{i(x\cdot\xi+t|\xi|)}\psi_N(\xi)^2\,d\xi.
\tag{2.2}
$$

By Lemma 13.2, proving (1.3) is equivalent to proving $\|T_NT_N^*F\|_{L_t^qL_x^r}\lesssim N^{2s}\|F\|_{L_t^{q'}L_x^{r'}}$.

## 3. Fixed-time Riesz–Thorin interpolation { #spatial-interpolation }

For a fixed elapsed time $t\in\mathbb R$, let $A_N(t)v=K_N(t,\cdot)*_xv=e^{itD}P_N^2v$. Put $\sigma=\frac{n-1}2$. We have two endpoint bounds in space:

1. **Dispersive $L^1\to L^\infty$ bound:** Applying [Theorem 12.4](chapter-12.md#dispersive-estimate) to the smooth cutoff $\chi=\psi^2\in C_c^\infty([1/2,2])$ gives

    $$
    \|A_N(t)v\|_{L^\infty(\mathbb R^n)}\lesssim N^n(1+N|t|)^{-\sigma}\|v\|_{L^1(\mathbb R^n)}.
    $$

2. **Unitary $L^2\to L^2$ bound:** Since $|e^{it|\xi|}\psi_N(\xi)^2|\le\|\psi\|_{L^\infty}^2$, Plancherel gives

    $$
    \|A_N(t)v\|_{L^2(\mathbb R^n)}\le\|\psi\|_{L^\infty}^2\|v\|_{L^2(\mathbb R^n)}.
    $$

!!! proposition "Proposition 13.3. Fixed-time $L^{r'}\to L^r$ decay"

    For $2\le r\le\infty$ and $\beta:=(n-1)\big(\frac12-\frac1r\big)$, every $v\in L^{r'}(\mathbb R^n)$ satisfies

    $$
    \|A_N(t)v\|_{L^r(\mathbb R^n)}\lesssim N^{n(1-2/r)}(1+N|t|)^{-\beta}\|v\|_{L^{r'}(\mathbb R^n)}
    \qquad(\forall\,t\in\mathbb R).
    \tag{3.1}
    $$

    In particular, for $t\ne0$,

    $$
    \|A_N(t)v\|_{L^r(\mathbb R^n)}\lesssim N^{\alpha(r)}|t|^{-\beta}\|v\|_{L^{r'}(\mathbb R^n)},
    \qquad
    \alpha(r):=(n+1)\left(\frac12-\frac1r\right).
    \tag{3.2}
    $$

??? proof "Proof"

    Apply the Riesz–Thorin interpolation theorem between $(p_0,b_0)=(1,\infty)$ (with operator norm $\lesssim N^n(1+N|t|)^{-\sigma}$) and $(p_1,b_1)=(2,2)$ (with operator norm $\lesssim1$). Choosing $\theta=2/r\in[0,1]$ gives

    $$
    \frac1{b_\theta}=\frac{1-\theta}\infty+\frac\theta2=\frac1r,
    \qquad
    \frac1{p_\theta}=\frac{1-\theta}1+\frac\theta2=1-\frac1r=\frac1{r'}.
    $$

    The interpolated norm carries exponent $1-\theta=1-2/r$ on the $L^1\to L^\infty$ bound, producing $N^{n(1-2/r)}$ and $(1+N|t|)^{-\sigma(1-2/r)}=(1+N|t|)^{-\beta}$. For $t\ne0$, $(1+N|t|)^{-\beta}\le N^{-\beta}|t|^{-\beta}$, and $n(1-2/r)-\beta=(2n-(n-1))(\frac12-\frac1r)=(n+1)(\frac12-\frac1r)=\alpha(r)$.

Inserting (3.1) into (2.2) and applying Minkowski's integral inequality in $L_x^r$ eliminates the spatial variables altogether:

$$
\|(T_NT_N^*F)(t,\cdot)\|_{L_x^r}
\le\int_{\mathbb R}\|A_N(t-\tau)F(\tau,\cdot)\|_{L_x^r}\,d\tau
\lesssim N^{n(1-2/r)}\int_{\mathbb R}\frac{\|F(\tau,\cdot)\|_{L_x^{r'}}}{(1+N|t-\tau|)^\beta}\,d\tau.
\tag{3.3}
$$

When $|t-\tau|\lesssim N^{-1}$—less than one oscillation period—waves have not yet dispersed and the kernel has height $O(1)$; for $|t-\tau|\gg N^{-1}$, angular spreading attenuates the kernel like $(N|t-\tau|)^{-\beta}$.

## 4. Temporal integration: Young, Hardy–Littlewood–Sobolev, and the endpoint { #time-integration }

Notice how the scaling exponent $2s$ emerges from (1.1):

$$
n\left(1-\frac2r\right)-\frac2q=2\left(\frac n2-\frac nr-\frac1q\right)=2s,
$$

and whenever $\frac2q=\beta$, we also have $\alpha(r)=n(1-\frac2r)-\beta=2s$. Admissible pairs $(q,r)$ with $2\le q\le\infty$ and $2\le r<\infty$ split into three cases according to whether $\frac2q<\beta$, $\frac2q=\beta$ with $q>2$, or $q=2$ with $\beta=1$.

**Case 1: Non-sharp admissible pairs ($\frac2q<\beta$, $q<\infty$, together with $q=\infty$).**

- If $q=\infty$, then $q'=1$ and $\beta\ge0$, so $(1+N|t-\tau|)^{-\beta}\le1$; taking the supremum in $t$ of (3.3) gives $\|T_NT_N^*F\|_{L_t^\infty L_x^r}\lesssim N^{n(1-2/r)}\|F\|_{L_t^1L_x^{r'}}=N^{2s}\|F\|_{L_t^1L_x^{r'}}$ (including $(q,r)=(\infty,2)$, where $\frac2q=\beta=0$).
- If $2\le q<\infty$ and $\frac2q<\beta$, apply Young's convolution inequality on $\mathbb R$ with $1+\frac1q=\frac1{q'}+\frac2q$:

    $$
    \|T_NT_N^*F\|_{L_t^qL_x^r}
    \lesssim N^{n(1-2/r)}\big\|(1+N|\cdot|)^{-\beta}\big\|_{L_t^{q/2}}\|F\|_{L_t^{q'}L_x^{r'}}.
    $$

    Changing variables $v=Nt$ gives $\|(1+N|t|)^{-\beta}\|_{L_t^{q/2}}=N^{-2/q}\big(\int_{\mathbb R}(1+|v|)^{-\beta q/2}\,dv\big)^{2/q}\lesssim_{q,\beta}N^{-2/q}$, where the integral converges precisely because $\beta q/2>1$. Since $n(1-2/r)-2/q=2s$, this yields $\|T_NT_N^*F\|_X\lesssim N^{2s}\|F\|_Y$.

**Case 2: Sharp non-endpoint line ($\frac2q=\beta$, $2<q<\infty$).**
When $\beta q/2=1$, $(1+N|t|)^{-\beta}\notin L_t^{q/2}(\mathbb R)$ due to logarithmic divergence at infinity. Instead, $2<q<\infty$ implies $0<\beta=\frac2q<1$, where the one-dimensional Hardy–Littlewood–Sobolev fractional integration theorem applies (quoted here without proof; see [[2]](#references)).

!!! lemma "Lemma 13.4. One-dimensional Hardy–Littlewood–Sobolev inequality"

    Let $0<\beta<1$ and $1<p_1<p_2<\infty$ satisfy $\frac1{p_2}=\frac1{p_1}-(1-\beta)$. For every $H\in L^{p_1}(\mathbb R)$,

    $$
    \left\|\int_{\mathbb R}|t-\tau|^{-\beta}H(\tau)\,d\tau\right\|_{L_t^{p_2}(\mathbb R)}\le C_{p_1,\beta}\|H\|_{L^{p_1}(\mathbb R)}.
    \tag{4.1}
    $$

Here $\frac1q-\frac1{q'}=\frac2q-1=\beta-1=-(1-\beta)$, so $(p_1,p_2)=(q',q)$ satisfies the scaling relation of Lemma 13.4. Using the pure-power spatial bound (3.2) inside Minkowski's inequality and applying Lemma 13.4 to $H(\tau)=\|F(\tau,\cdot)\|_{L_x^{r'}}$ gives

$$
\|T_NT_N^*F\|_{L_t^qL_x^r}
\lesssim N^{\alpha(r)}\left\|\int_{\mathbb R}|t-\tau|^{-\beta}\|F(\tau,\cdot)\|_{L_x^{r'}}\,d\tau\right\|_{L_t^q}
\lesssim N^{2s}\|F\|_{L_t^{q'}L_x^{r'}}.
$$

**Case 3: The sharp endpoint $q=2$, $\beta=1$ ($n\ge4$).**
When $q=2$ and $\beta=1$, solving $(n-1)(\frac12-\frac1r)=1$ with $r<\infty$ requires $n\ge4$ and fixes $r=\frac{2(n-1)}{n-3}$. At $\beta=1$, the scalar kernel $|t-\tau|^{-1}$ in (3.3) is neither integrable nor covered by Lemma 13.4: taking spatial norms inside the $\tau$-integral discarded temporal phase cancellations of the operator-valued kernel $A_N(t-\tau)$. Instead, at unit frequency $N=1$, the family $U(t)=e^{itD}P_1$ satisfies $\|U(t)\|_{L^2\to L^2}\lesssim1$ and $\|U(t)U(\tau)^*\|_{L^1\to L^\infty}\lesssim(1+|t-\tau|)^{-\sigma}$ with $\sigma=\frac{n-1}2\ge\frac32>1$. Theorem 1.2 of Keel and Tao [[1]](#references) (proved by bilinear real interpolation and Whitney dyadic decomposition in time) yields $\|T_1h\|_{L_t^2L_x^r}\lesssim\|h\|_{L_x^2}$ at $r=\frac{2(n-1)}{n-3}$. For general $N>0$, set $h_1(y)=N^{-n/2}h(y/N)$; then $\|h_1\|_{L_x^2}=\|h\|_{L_x^2}$ and $T_Nh(t,x)=N^{n/2}(T_1h_1)(Nt,Nx)$, so changing variables $(Nt,Nx)\mapsto(\widetilde t,\widetilde x)$ produces

$$
\|T_Nh\|_{L_t^2L_x^r}=N^{\frac n2-\frac nr-\frac12}\|T_1h_1\|_{L_t^2L_x^r}\lesssim N^s\|h\|_{L_x^2}.
$$

In all three cases, Lemma 13.2 gives (1.3), completing the proof of Theorem 13.1.

## 5. Exercises { #exercises }

!!! example "Exercise 1. The inhomogeneous Strichartz estimate on the diagonal line"

    Let $n\ge2$ and set $P=\frac{2(n+1)}{n-1}$ (so $P=4$ when $n=3$, $P'=4/3$, and $s=\frac n2-\frac{n+1}P=\frac12$). Prove directly from Proposition 13.3, Lemma 13.4, and Littlewood–Paley theory—without invoking the Christ–Kiselev lemma—that the retarded wave operator

    $$
    (\mathcal IF)(t,x):=\int_0^t\frac{\sin((t-\tau)D)}{D}F(\tau,x)\,d\tau
    $$

    satisfies

    $$
    \|\mathcal IF\|_{L_{t,x}^P([0,\infty)\times\mathbb R^n)}\le C_n\|F\|_{L_{t,x}^{P'}([0,\infty)\times\mathbb R^n)}.
    $$

??? solution "Solution"

    Since $\frac{\sin((t-\tau)D)}D=\frac1{2i}D^{-1}\big(e^{i(t-\tau)D}-e^{-i(t-\tau)D}\big)$, it suffices to bound $(\mathcal I_+F)(t)=\int_0^te^{i(t-\tau)D}D^{-1}F(\tau)\,d\tau$ for $t\ge0$. Localize to dyadic shells $N=2^j$, choosing an enlarged radial cutoff $\widetilde P_N$ equal to $1$ on $\operatorname{supp}\psi_N$, so $P_N\mathcal I_+F=\int_0^te^{i(t-\tau)D}\widetilde P_N^2D^{-1}P_NF(\tau)\,d\tau$.

    At $r=P=\frac{2(n+1)}{n-1}$, we have $\frac12-\frac1P=\frac1{n+1}$, hence

    $$
    \alpha(P)=(n+1)\left(\frac12-\frac1P\right)=1,
    \qquad
    \beta=(n-1)\left(\frac12-\frac1P\right)=\frac{n-1}{n+1}=\frac2P\in(0,1).
    $$

    Applying Proposition 13.3 (equation (3.2), with $\widetilde\psi_N$ in place of $\psi_N$) and noting that the degree-zero annular multiplier $ND^{-1}\widetilde P_N$ is uniformly bounded on $L^{P'}(\mathbb R^n)$ (its kernel scales in $L^1$ independently of $N$, just as in [Chapter 5](chapter-05.md#kernels)), we obtain for $\tau\ne t$

    $$
    \big\|e^{i(t-\tau)D}\widetilde P_N^2D^{-1}P_NF(\tau)\big\|_{L_x^P}
    \lesssim N^{\alpha(P)}|t-\tau|^{-\beta}\|D^{-1}\widetilde P_NP_NF(\tau)\|_{L_x^{P'}}
    \lesssim|t-\tau|^{-2/P}\|P_NF(\tau)\|_{L_x^{P'}},
    $$

    where $N^1\cdot N^{-1}=1$ cancels identically! Because $\mathbf 1_{\{0\le\tau\le t\}}|t-\tau|^{-2/P}\le|t-\tau|^{-2/P}$, Minkowski in $L_x^P$ and Lemma 13.4 with $p_1=P'$, $p_2=P$, $\beta=2/P$ give

    $$
    \|P_N\mathcal I_+F\|_{L_{t,x}^P([0,\infty)\times\mathbb R^n)}
    \lesssim\|P_NF\|_{L_{t,x}^{P'}([0,\infty)\times\mathbb R^n)},
    $$

    uniformly in $N$.

    Now sum over $N=2^j$. On the left, $P>2$, so the spatial square-function theorem and Minkowski in $L_{t,x}^{P/2}$ give $\|\mathcal I_+F\|_{L_{t,x}^P}\lesssim\big(\sum_N\|P_N\mathcal I_+F\|_{L_{t,x}^P}^2\big)^{1/2}$. On the right, $1<P'<2$, so $2/P'>1$; applying Minkowski's integral inequality for $\ell^2$ over $L_{t,x}^{P'}$ (namely $\|\{a_N\}\|_{\ell^2_NL_{t,x}^{P'}}\le\|\{a_N\}\|_{L_{t,x}^{P'}\ell^2_N}$ when $P'\le2$) followed by the spatial square-function theorem at $P'\in(1,\infty)$ yields

    $$
    \left(\sum_N\|P_NF\|_{L_{t,x}^{P'}}^2\right)^{1/2}
    \le\left\|\left(\sum_N|P_NF|^2\right)^{1/2}\right\|_{L_{t,x}^{P'}}
    \simeq\|F\|_{L_{t,x}^{P'}}.
    $$

    Combining the two inequalities proves the inhomogeneous Strichartz bound.

!!! example "Exercise 2. Necessity of wave admissibility via a Lorentz-boosted Knapp wave packet"

    Let $n\ge2$, $1\le q,r\le\infty$, and suppose the unit-annulus estimate $\|e^{itD}h\|_{L_t^qL_x^r(\mathbb R\times\mathbb R^n)}\le C\|h\|_{L^2(\mathbb R^n)}$ holds for all Schwartz $h$ with $\operatorname{supp}\widehat h\subset\{\frac12\le|\xi|\le2\}$. By testing $\widehat h_\delta$ supported in a rectangular slab of radial length $\simeq1$ around $e_1$ and transverse width $\delta\ll1$ in $\xi'=(\xi_2,\dots,\xi_n)$, prove that

    $$
    \frac2q\le(n-1)\left(\frac12-\frac1r\right).
    $$

??? solution "Solution"

    Fix a nonnegative bump $\eta\in C_c^\infty(\mathbb R\times\mathbb R^{n-1})$ equal to $1$ on $[1,5/4]\times[-1/2,1/2]^{n-1}$ and supported in $[3/4,3/2]\times[-1,1]^{n-1}$. For $0<\delta\le1/10$, define $\widehat h_\delta(\xi_1,\xi')=\eta(\xi_1,\xi'/\delta)$. The support lies in $\{\frac12\le|\xi|\le2\}$ and has volume $\simeq\delta^{n-1}$, so Plancherel gives $\|h_\delta\|_{L^2(\mathbb R^n)}\simeq\delta^{(n-1)/2}$.

    Expand $|\xi|$ near the ray $\xi'=0$, $\xi_1>0$:

    $$
    |\xi|-\xi_1=\frac{|\xi'|^2}{|\xi|+\xi_1},
    \qquad
    0\le|\xi|-\xi_1\le\delta^2\quad\text{on }\operatorname{supp}\widehat h_\delta.
    $$

    Write $x\cdot\xi+t|\xi|=(x_1+t)\xi_1+x'\cdot\xi'+t(|\xi|-\xi_1)$. Choose $c=1/10$ and consider the spacetime tube

    $$
    \mathcal T_\delta=\big\{(t,x):|t|\le c\delta^{-2},\ |x_1+t|\le c,\ |x'|\le c\delta^{-1}\big\}.
    $$

    For $(t,x)\in\mathcal T_\delta$ and $\xi\in\operatorname{supp}\widehat h_\delta$, the phase oscillation after factoring out $e^{i(x_1+t)}$ (or directly) satisfies $|(x_1+t)\xi_1+x'\cdot\xi'+t(|\xi|-\xi_1)|\le\frac32c+\sqrt{n-1}\,c+c$, so shrinking $c=c_n>0$ makes $\cos(x\cdot\xi+t|\xi|)\ge\frac12$ across all of $\operatorname{supp}\widehat h_\delta$. Hence

    $$
    |e^{itD}h_\delta(x)|\ge\frac1{2(2\pi)^n}\int_{\mathbb R^n}\widehat h_\delta(\xi)\,d\xi\simeq\delta^{n-1}
    \qquad\big(\forall\,(t,x)\in\mathcal T_\delta\big).
    $$

    For each fixed $|t|\le c_n\delta^{-2}$, the spatial slice of $\mathcal T_\delta$ has measure $\simeq1\cdot(\delta^{-1})^{n-1}=\delta^{-(n-1)}$, so $\|e^{itD}h_\delta\|_{L_x^r}\gtrsim\delta^{n-1}\delta^{-(n-1)/r}$. Integrating over $|t|\le c_n\delta^{-2}$ gives $\|e^{itD}h_\delta\|_{L_t^qL_x^r}\gtrsim\delta^{(n-1)(1-1/r)-2/q}$. Comparing with $\|h_\delta\|_{L^2}\simeq\delta^{(n-1)/2}$ as $\delta\downarrow0$ forces $(n-1)(1-\frac1r)-\frac2q\ge\frac{n-1}2$, which rearranges to $\frac2q\le(n-1)(\frac12-\frac1r)$.

## References { #references }

1. M. Keel and T. Tao, *Endpoint Strichartz estimates*, American Journal of Mathematics **120** (1998), 955–980, Theorem 1.2 and Corollary 1.3. [arXiv:math/9803054](https://arxiv.org/abs/math/9803054).
2. E. M. Stein, *Singular Integrals and Differentiability Properties of Functions*, Princeton University Press, 1970, Chapter V, §1.2.

[Previous: stationary phase and wave dispersion](chapter-12.md) · [Next: critical cubic waves, Stein–Tomas restriction, and Kakeya dimension](chapter-14.md)
