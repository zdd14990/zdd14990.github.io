---
title: "Chapter 5: Littlewood–Paley Theory and Function Spaces"
date: 2026-10-14
description: Dyadic reconstruction, almost orthogonality, Bernstein inequalities, Sobolev and Besov norms, and the critical embedding obstruction.
hide:
  - navigation
categories:
  - Analysis
  - Hyperbolic PDEs
tags:
  - analysis
  - hyperbolic-pde
  - harmonic-analysis
  - littlewood-paley
  - course
---

# Chapter 5: Littlewood–Paley Theory and Function Spaces { #chapter-05 }

## 1. Why separate scales? { #motivation }

The scattering criterion in [Chapter 4](chapter-04.md#scattering) uses the norm $L_t^3L_x^6$ because

$$
\|u^3\|_{L_t^1L_x^2}=\|u\|_{L_t^3L_x^6}^3.
$$

To estimate solutions in such spacetime norms, one often separates their frequency scales and treats each scale using its own propagation and concentration properties. High frequencies describe fine spatial variation; low frequencies describe larger-scale structure. A dyadic decomposition makes that separation systematic.

All constructions in this chapter are on $\mathbb R^d$, $d\ge1$. We use the Fourier convention

$$
\widehat f(\xi)=\int_{\mathbb R^d}e^{-ix\cdot\xi}f(x)\,dx,
\qquad
f(x)=\frac1{(2\pi)^d}\int_{\mathbb R^d}e^{ix\cdot\xi}\widehat f(\xi)\,d\xi.
$$

Consequently, $\widehat{\partial_jf}=i\xi_j\widehat f$ and $\|f\|_2^2=(2\pi)^{-d}\|\widehat f\|_2^2$. We write $A\lesssim B$ when $A\le CB$ for a constant independent of the dyadic index, and $A\simeq B$ when both inequalities hold.

## 2. A smooth dyadic partition { #cutoffs }

Choose a radial, radially nonincreasing $\varphi\in C_c^\infty(\mathbb R^d)$ with

$$
0\le\varphi\le1,\qquad
\varphi(\xi)=1\text{ for }|\xi|\le1,\qquad
\varphi(\xi)=0\text{ for }|\xi|\ge2.
$$

Define

$$
\psi(\xi)=\varphi(\xi)-\varphi(2\xi),\qquad
\psi_k(\xi)=\psi(2^{-k}\xi),\qquad
P_kf=\mathcal F^{-1}(\psi_k\widehat f),\quad k\in\mathbb Z.
$$

Then $0\le\psi_k\le1$ and

$$
\operatorname{supp}\psi\subset\{1/2\le|\xi|\le2\},\qquad
\operatorname{supp}\widehat{P_kf}\subset\{2^{k-1}\le|\xi|\le2^{k+1}\}.
$$

The operators are smooth frequency cutoffs, not idempotent projections: in general $P_k^2\ne P_k$ because $\psi_k^2\ne\psi_k$.

The sum telescopes:

$$
\sum_{k=-M}^N\psi_k(\xi)
=\varphi(2^{-N}\xi)-\varphi(2^{M+1}\xi).
$$

For each $\xi\ne0$, the right side tends to one as $M,N\to\infty$. At $\xi=0$, every annular cutoff vanishes. This exception is harmless for $L^2$ functions and essential for understanding homogeneous spaces of distributions.

!!! theorem "Theorem 5.1. Reconstruction in L²"

    For every $f\in L^2(\mathbb R^d)$,

    $$
    \sum_{k=-M}^NP_kf\longrightarrow f\quad\text{in }L^2
    \qquad(M,N\to\infty).
    $$

??? proof "Proof"

    By telescoping,

    $$
    \widehat{f-\sum_{k=-M}^NP_kf}
    =\big(1-\varphi(2^{-N}\xi)+\varphi(2^{M+1}\xi)\big)\widehat f.
    $$

    Plancherel and the triangle inequality reduce the error to two tails. They satisfy

    $$
    \|(1-\varphi(2^{-N}\xi))\widehat f\|_2^2
    \le\int_{|\xi|\ge2^N}|\widehat f(\xi)|^2\,d\xi,
    $$

    $$
    \|\varphi(2^{M+1}\xi)\widehat f\|_2^2
    \le\int_{|\xi|\le2^{-M}}|\widehat f(\xi)|^2\,d\xi.
    $$

    The first tends to zero by integrability at infinity. The second tends to zero by absolute continuity of the integral as the ball shrinks to a measure-zero point. Hence the reconstruction converges in $L^2$.

This is convergence of symmetric or two-sided truncated sums in a norm. It is not a pointwise assertion for arbitrary distributions.

## 3. Almost orthogonality { #almost-orthogonality }

The frequency bands overlap only with their neighbors. More precisely,

$$
\psi_k(\xi)\psi_j(\xi)=0\qquad\text{if }|k-j|\ge2.
$$

At the possible touching boundaries the smooth cutoffs vanish. Thus the dyadic pieces are not all mutually orthogonal, but separated pieces are.

!!! proposition "Proposition 5.2. L² almost orthogonality"

    For $f\in L^2$,

    $$
    \frac13\|f\|_2^2\le\sum_{k\in\mathbb Z}\|P_kf\|_2^2\le\|f\|_2^2.
    $$

??? proof "Proof"

    For finite sums, Plancherel implies $\langle P_kf,P_jf\rangle=0$ when $|k-j|\ge2$. Use the complex inner product $\langle a,b\rangle=\int a\overline b$ when needed. Therefore

    $$
    \left\|\sum_{k=-M}^NP_kf\right\|_2^2
    \le\sum_{\substack{-M\le k,j\le N\\|k-j|<2}}\|P_kf\|_2\|P_jf\|_2
    \le3\sum_{k=-M}^N\|P_kf\|_2^2.
    $$

    The last bound uses $2ab\le a^2+b^2$ and the three possible neighbors. Reconstruction gives the lower inequality in the limit.

    For the upper inequality, nonnegativity and the partition identity give $\sum_k\psi_k(\xi)^2\le\sum_k\psi_k(\xi)=1$ for $\xi\ne0$. Tonelli and Plancherel yield

    $$
    \sum_k\|P_kf\|_2^2
    =(2\pi)^{-d}\int\sum_k\psi_k(\xi)^2|\widehat f(\xi)|^2\,d\xi
    \le\|f\|_2^2.
    $$

Finite overlap gives comparison of squared norms, rather than equality of norms or pointwise magnitudes.

## 4. Spatial kernels and one-scale differentiation { #kernels }

Let $K=\mathcal F^{-1}\psi$. Fourier inversion gives

$$
P_kf=K_k*f,\qquad K_k(x)=2^{kd}K(2^kx).
$$

Since $\psi$ is smooth and compactly supported, $K$ is Schwartz. Hence

$$
\|K_k\|_1=\|K\|_1,\qquad
\|K_k\|_\infty=2^{kd}\|K\|_\infty,
$$

and for every $A>0$,

$$
|K_k(x)|\le C_A2^{kd}(1+2^k|x|)^{-A}.
$$

The kernel has spatial scale $2^{-k}$ and height of order $2^{kd}$. It is rapidly localized, not compactly supported in physical space. Young's inequality gives a uniform bound $\|P_kf\|_p\lesssim\|f\|_p$ for $1\le p\le\infty$. The multiplier has uniformly bounded height; its kernel does not have uniformly bounded pointwise height.

!!! example "Exercise 5.3. Differentiation of a dyadic piece"

    Replace the heuristic $|\nabla P_kf|\sim2^k|P_kf|$ by a precise $L^2$ statement and prove it.

??? solution "Solution"

    On the support of $\widehat{P_kf}$, $2^{k-1}\le|\xi|\le2^{k+1}$. Thus

    $$
    \|\nabla P_kf\|_2^2=(2\pi)^{-d}\int|\xi|^2|\psi_k(\xi)\widehat f(\xi)|^2\,d\xi
    $$

    is bounded below by $2^{2k-2}\|P_kf\|_2^2$ and above by $2^{2k+2}\|P_kf\|_2^2$. Consequently,

    $$
    \tfrac12\,2^k\|P_kf\|_2\le\|\nabla P_kf\|_2\le2\,2^k\|P_kf\|_2.
    $$

    For one coordinate derivative, only the upper bound holds without an angular restriction, since $\xi_j$ may be arbitrarily small on an annulus. There is no general pointwise two-sided comparison between the function and its gradient.

The same Plancherel argument with $|\xi|^s$ gives $\||D|^sP_kf\|_2\simeq2^{ks}\|P_kf\|_2$ for fixed real $s$.

## 5. Bernstein's inequality { #bernstein }

!!! proposition "Proposition 5.4. Bernstein at one scale"

    Let $1\le p\le r\le\infty$. If $P_kf\in L^p$, then

    $$
    \|P_kf\|_r\lesssim2^{kd(1/p-1/r)}\|P_kf\|_p.
    $$

    The constant is independent of $k$ and $f$.

??? proof "Proof using an enlarged cutoff"

    Choose $\widetilde\psi\in C_c^\infty$ equal to one on $\operatorname{supp}\psi$, and let $\widetilde\psi_k(\xi)=\widetilde\psi(2^{-k}\xi)$. Then

    $$
    P_kf=\widetilde K_k*P_kf,
    \qquad\widetilde K_k=\mathcal F^{-1}\widetilde\psi_k.
    $$

    Choose $a\in[1,\infty]$ with $1+1/r=1/p+1/a$. Such an $a$ exists precisely because $p\le r$. The kernel scaling gives

    $$
    \|\widetilde K_k\|_a
    =2^{kd(1-1/a)}\|\widetilde K\|_a
    =2^{kd(1/p-1/r)}\|\widetilde K\|_a.
    $$

    Young's inequality proves the result, including the endpoints.

The enlarged cutoff is needed because $P_k$ is not an idempotent projection. In particular, one cannot justify the proof by writing $P_kf=K_k*P_kf$ with the original multiplier.

The critical special case is

$$
\|P_kf\|_\infty\lesssim2^{kd/2}\|P_kf\|_2
\simeq\|P_kf\|_{\dot H^{d/2}}.
$$

At one frequency scale, the critical estimate holds. Its failure for a whole function will be a failure of summation across scales.

## 6. Sobolev norms as weighted square sums { #sobolev }

For $f\in L^2$ and fixed real $s$, weighted Plancherel gives, whenever the expressions are finite,

$$
\|f\|_{H^s}^2\simeq
\sum_{k\in\mathbb Z}(1+2^k)^{2s}\|P_kf\|_2^2.
$$

Indeed, on the support of $\psi_k$, the weights $(1+|\xi|^2)^s$ and $(1+2^k)^{2s}$ are comparable uniformly in $k$. At each nonzero frequency, the nonnegative partition has finite overlap and

$$
\tfrac13\le\sum_k\psi_k(\xi)^2\le1.
$$

Multiplying this comparison by the Sobolev weight and integrating proves both directions. For the homogeneous expression,

$$
\|f\|_{\dot H^s}^2\simeq
\sum_{k\in\mathbb Z}2^{2ks}\|P_kf\|_2^2.
$$

For nonnegative integer $s$, the Fourier Sobolev norm is equivalent to the sum of squared $L^2$ norms of all weak derivatives of order at most $s$. The Fourier definition also handles fractional smoothness. Extensions to distributions use the appropriate low-frequency or quotient conventions.

The weights quantify smoothness: $s$ derivatives cost $2^{ks}$ at scale $2^k$. The inhomogeneous norm retains control of undifferentiated low frequencies, while the homogeneous weight can tend to zero there.

## 7. Besov spaces and the low-frequency block { #besov }

The three Besov indices measure smoothness $s$, spatial integrability $p$, and summability across scales $q$. For $1\le p,q\le\infty$, the homogeneous expression is

$$
\|f\|_{\dot B^s_{p,q}}=
\left(\sum_{k\in\mathbb Z}\big(2^{ks}\|P_kf\|_p\big)^q\right)^{1/q},
$$

with a supremum over $k$ when $q=\infty$. On distributions, this is interpreted modulo polynomials or with an explicit dyadic reconstruction convention, because annular cutoffs annihilate the Fourier distributions supported at zero corresponding to polynomials.

For the inhomogeneous space, define the low-frequency block

$$
P_{\le0}f=\mathcal F^{-1}(\varphi\widehat f).
$$

Telescoping gives $f=P_{\le0}f+\sum_{k\ge1}P_kf$, first in $L^2$. The standard norm is

$$
\|f\|_{B^s_{p,q}}=
\|P_{\le0}f\|_p+
\left(\sum_{k\ge1}\big(2^{ks}\|P_kf\|_p\big)^q\right)^{1/q},
$$

again replacing the sum by a supremum when $q=\infty$.

One can also consider the all-scale weighted expression

$$
\left(\sum_{k\in\mathbb Z}\big((1+2^k)^s\|P_kf\|_p\big)^q\right)^{1/q}.
$$

For $p=q=2$, almost orthogonality makes it equivalent to the Sobolev norm. For general $p,q$, it must not be substituted for the standard inhomogeneous norm without additional justification: the low frequencies need to be collected into a single block. In particular,

$$
B^s_{2,2}=H^s
$$

with equivalent norms.

## 8. Sobolev embedding above the critical index { #sobolev-embedding }

!!! theorem "Theorem 5.5. Sobolev embedding into L∞"

    If $s>d/2$, then $H^s(\mathbb R^d)\hookrightarrow L^\infty(\mathbb R^d)$ and

    $$
    \|f\|_\infty\lesssim\|f\|_{H^s}.
    $$

??? proof "Proof by summing Bernstein estimates"

    Bernstein gives

    $$
    \sum_k\|P_kf\|_\infty\lesssim\sum_k2^{kd/2}\|P_kf\|_2.
    $$

    Insert the Sobolev weight and apply Cauchy–Schwarz in $k$:

    $$
    \sum_k2^{kd/2}\|P_kf\|_2
    \le
    \left(\sum_k(1+2^k)^{2s}\|P_kf\|_2^2\right)^{1/2}
    \left(\sum_k\frac{2^{kd}}{(1+2^k)^{2s}}\right)^{1/2}.
    $$

    The first factor is comparable to $\|f\|_{H^s}$. For $k\le0$, the second series is bounded by a constant times $\sum_{k\le0}2^{kd}$. For $k\ge1$, it is comparable to $\sum_{k\ge1}2^{-k(2s-d)}$. Both converge when $s>d/2$.

    Thus the dyadic series converges absolutely in $L^\infty$. Its limit agrees with the $L^2$ reconstruction: on each bounded set, $L^\infty$ convergence also gives $L^2$ convergence, so the two limits coincide almost everywhere. The displayed norm bound follows.

At $s=d/2$, the high-frequency terms in the last series stay comparable to one. This explains why this proof fails at the endpoint. Failure of a proof alone is not a counterexample; the next construction establishes failure of the embedding itself.

## 9. A critical Sobolev counterexample { #endpoint-counterexample }

Choose a nonzero real, even, nonnegative $\chi\in C_c^\infty$ supported in $\{1<|\xi|<3/2\}$, and set $h=\mathcal F^{-1}\chi$. Then $h$ is real and Schwartz, and

$$
h(0)=(2\pi)^{-d}\int\chi(\xi)\,d\xi>0.
$$

Let

$$
f_N(x)=\sum_{j=1}^N\frac1j h(2^jx).
$$

The Fourier supports of the summands are disjoint annuli. Scaling gives

$$
\|h(2^j\cdot)\|_{\dot H^{d/2}}^2=\|h\|_{\dot H^{d/2}}^2,
\qquad
\|h(2^j\cdot)\|_2^2=2^{-jd}\|h\|_2^2.
$$

All these supports have $|\xi|>2$, where the inhomogeneous and homogeneous critical weights are comparable. Orthogonality therefore yields

$$
\|f_N\|_{H^{d/2}}^2\lesssim\sum_{j=1}^N\frac1{j^2}\lesssim1.
$$

But

$$
f_N(0)=h(0)\sum_{j=1}^N\frac1j\to\infty.
$$

Each $f_N$ is continuous, so its essential supremum is at least $|f_N(0)|$. There can be no uniform estimate $\|f\|_\infty\le C\|f\|_{H^{d/2}}$. Hence the usual continuous Sobolev embedding fails at the critical index.

## 10. The Besov endpoint remedy { #besov-endpoint }

!!! proposition "Proposition 5.6. Critical Besov control"

    If

    $$
    \sum_{k\in\mathbb Z}2^{kd/2}\|P_kf\|_2<\infty,
    $$

    the dyadic reconstruction defines a bounded representative and satisfies

    $$
    \left\|\sum_kP_kf\right\|_\infty
    \lesssim\|f\|_{\dot B^{d/2}_{2,1}}.
    $$

    For $f\in L^2$, this representative equals $f$ almost everywhere. With the stated reconstruction convention, this is the embedding $\dot B^{d/2}_{2,1}\hookrightarrow L^\infty$.

??? proof "Proof"

    Sum the one-scale Bernstein estimate:

    $$
    \sum_k\|P_kf\|_\infty
    \lesssim\sum_k2^{kd/2}\|P_kf\|_2.
    $$

    The series converges absolutely in $L^\infty$. If the original function is in $L^2$, the same uniqueness-of-limits argument as above identifies the reconstruction with it. For a homogeneous distribution class, the assertion chooses this reconstruction as its representative; it is not an estimate for every polynomial added to that representative.

Similarly, $B^{d/2}_{2,1}\hookrightarrow L^\infty$: the low block satisfies $\|P_{\le0}f\|_\infty\lesssim\|P_{\le0}f\|_2$ by an enlarged ball cutoff, and the high blocks are summed as above.

| Space at critical smoothness | Summation of band sizes | Consequence |
| --- | --- | --- |
| $H^{d/2}=B^{d/2}_{2,2}$ | Square summation | Does not control the sum of amplitudes |
| $B^{d/2}_{2,1}$ | Absolute summation | Controls the $L^\infty$ norm |
| $\dot B^{d/2}_{2,1}$ | Absolute summation over all scales | Controls the bounded dyadic representative |

## 11. Exercise: concentration and scaling { #exercise }

!!! example "Exercise. A narrowing profile"

    For $g\in C_c^\infty(\mathbb R^d)$ with $\int g=1$, set $g_\varepsilon(x)=\varepsilon^{-d}g(x/\varepsilon)$. Show distributional convergence to a delta and compute the $L^p$ scaling.

??? solution "Solution"

    For every test function $a$,

    $$
    \int g_\varepsilon(x)a(x)\,dx
    =\int g(y)a(\varepsilon y)\,dy\to a(0).
    $$

    A change of variables gives

    $$
    \|g_\varepsilon\|_p=\varepsilon^{-d(1-1/p)}\|g\|_p,
    $$

    including $p=\infty$ with the usual convention. The total integral is preserved, but the $L^p$ norms for $p>1$ grow. Also $\widehat{g_\varepsilon}(\xi)=\widehat g(\varepsilon\xi)$, so concentration broadens the relevant frequency range.

[Previous: global existence and scattering](chapter-04.md) · [Next: restriction and wave packets](chapter-06.md)
