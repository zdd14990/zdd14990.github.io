---
title: "Chapter 6: Restriction, Wave Packets, and Kakeya Geometry"
date: 2026-10-14
description: Characteristic Fourier surfaces, spacetime estimates, wave-packet scales, and elementary bounds for tube multiplicity.
hide:
  - navigation
categories:
  - Analysis
  - Hyperbolic PDEs
tags:
  - analysis
  - hyperbolic-pde
  - harmonic-analysis
  - wave-packets
  - course
---

# Chapter 6: Restriction, Wave Packets, and Kakeya Geometry { #chapter-06 }

## 1. Oscillation and dispersion { #dispersion }

For a dispersive linear equation, the solution is a superposition of Fourier modes with time-dependent phases. Oscillation can reduce concentration and weaken nonlinear interactions, but that effect must be quantified in a norm. A conserved energy gives a bound at each time; a spacetime estimate measures the accumulation of the solution over time as well.

For the free wave equation,

$$
\partial_t^2u-\Delta u=0,\qquad (u,\partial_tu)|_{t=0}=(f,g),
$$

the Fourier solution is

$$
\widehat u(t,\xi)=\cos(t|\xi|)\widehat f(\xi)+
\frac{\sin(t|\xi|)}{|\xi|}\widehat g(\xi).
$$

At $\xi=0$, the sine quotient is understood by its continuous limit $t$. Splitting into half-waves gives

$$
u(t,x)=(2\pi)^{-d}\int e^{i(x\cdot\xi+t|\xi|)}a_+(\xi)\,d\xi
+(2\pi)^{-d}\int e^{i(x\cdot\xi-t|\xi|)}a_-(\xi)\,d\xi,
$$

where

$$
a_\pm(\xi)=\frac12\widehat f(\xi)\pm\frac1{2i|\xi|}\widehat g(\xi).
$$

For suitable data these formulas are ordinary oscillatory integrals; more generally they are read in the relevant distribution or norm sense. The spacetime Fourier transform is supported on the characteristic cone

$$
\tau^2=|\xi|^2.
$$

For the massive Klein–Gordon equation, the corresponding surface is $\tau^2=m^2+|\xi|^2$. Frequency surfaces encode both propagation and the curvature available for analytic estimates.

## 2. What a Strichartz estimate would supply { #strichartz }

For the wave equation, a spacetime estimate has the form

$$
\|u\|_{L_t^qL_x^r}\lesssim
\|f\|_{\dot H^s}+\|g\|_{\dot H^{s-1}},
$$

in a suitable range of exponents. Scaling fixes the necessary regularity relation

$$
s=\frac d2-\frac dr-\frac1q.
$$

To see this, rescale $u_a(t,x)=u(at,ax)$. Its spacetime norm is $a^{-1/q-d/r}\|u\|_{L_t^qL_x^r}$, while the initial displacement norm scales as $a^{s-d/2}$; the velocity $a g(ax)$ has the same scaling in $\dot H^{s-1}$.

For $d\ge2$, the familiar wave-admissibility inequality is

$$
\frac1q+\frac{d-1}{2r}\le\frac{d-1}{4},\qquad q,r\ge2.
$$

This numerical condition alone is not a complete endpoint theorem. In particular, $(q,r,d)=(2,\infty,3)$ is excluded in the classical homogeneous wave estimate, and spatial $r=\infty$ cases require separate attention. This chapter introduces the framework rather than proving the optimal range; we do not use an unproved endpoint estimate here.

The nonlinear application uses such bounds together with Duhamel estimates to control the forcing. A linear homogeneous estimate alone does not prove a global spacetime bound for a large nonlinear solution. Nor can the massless scaling theorem be transferred to the massive equation without examining its high- and low-frequency regimes.

## 3. Fourier restriction and extension { #restriction }

Let $S\subset\mathbb R^n$ be a smooth hypersurface, and let $d\sigma$ be surface measure. Define

$$
E_Sh(x)=\int_Se^{ix\cdot\xi}h(\xi)\,d\sigma(\xi).
$$

The extension problem asks when

$$
\|E_Sh\|_{L^q(\mathbb R^n)}\le C\|h\|_{L^p(S)}.
$$

For a Schwartz function $F$, the adjoint pairing with $E_Sh$ involves $\widehat F|_S$. Therefore, for $1<p,q<\infty$, the extension bound is dual to

$$
\|\widehat F|_S\|_{L^{p'}(S)}\le C\|F\|_{L^{q'}(\mathbb R^n)}.
$$

The factors depend on Fourier normalization and can be absorbed into $C$. The issue is that an ambient $L^2$ Fourier transform is defined only almost everywhere in $n$ dimensions; its values on a lower-dimensional surface are not automatically meaningful. A restriction estimate extends the initially defined Schwartz restriction continuously to the required function space.

When a surface is parametrized as $\xi\mapsto(\xi,\omega(\xi))$, its surface measure is $\sqrt{1+|\nabla\omega|^2}\,d\xi$. The PDE oscillatory integral uses $d\xi$. One matches the two by absorbing that density into the amplitude. On a fixed regular frequency patch the factor is controlled, but the distinction should not be silently omitted.

## 4. Caps, uncertainty, and the packet scale { #packet-scale }

Decompose a frequency patch into caps $\theta$ and write $h=\sum_\theta h_\theta$, so $E_Sh=\sum_\theta E_Sh_\theta$. A smooth partition may be used to avoid sharp cutoff edges.

For a surface with nondegenerate quadratic curvature, suppose the cap has tangential diameter $\delta$. Near its center, the departure from the tangent plane is of order $\delta^2$. At physical scale $R$, this contributes a phase error of order $R\delta^2$. The natural choice making this error of order one is

$$
\delta\simeq R^{-1/2}.
$$

Tangential Fourier localization at width $\delta$ gives a physical transverse scale $\delta^{-1}\simeq R^{1/2}$. The quadratic normal width $\delta^2$ corresponds to a longitudinal scale $\delta^{-2}\simeq R$. After also localizing the physical position, the model packet occupies a tube with dimensions

$$
R\times R^{1/2}\times\cdots\times R^{1/2}
$$

in $\mathbb R^n$, directed approximately along the surface normal. Here one works on a fixed frequency patch and inside a physical region of scale $R$.

This is a scale calculation, not a full wave-packet decomposition theorem. It describes the standard fully curved model. The wave cone has a flat radial direction, so its optimal decompositions can be anisotropic and require additional attention to radial and angular localization. The displayed tube dimensions are not a universal sharp statement for every hypersurface or cap choice.

Schematically, after frequency and position localization,

$$
E_Sh\approx\sum_\theta\sum_{T\in\mathcal T_\theta}c_T\phi_T,
$$

where $\phi_T$ is rapidly concentrated near a tube $T$. The approximation includes an error that must be estimated in any rigorous application. A packet is not a compactly supported indicator function: it retains an oscillatory phase and decaying tails.

## 5. An elementary Kakeya estimate { #kakeya-estimate }

The geometry of packets motivates a question about overlap of long thin tubes pointing in many directions. For a finite collection $\mathcal T$ of positive-volume measurable tubes, define

$$
K=\bigcup_{T\in\mathcal T}T,\qquad
\mu(x)=\sum_{T\in\mathcal T}\mathbf1_T(x).
$$

The multiplicity $\mu$ counts how many tubes contain a point, and

$$
\int_K\mu=\sum_T|T|.
$$

!!! proposition "Proposition 6.1. Union volume from pairwise overlaps"

    For a finite nonempty collection of finite-volume tubes,

    $$
    |K|\ge
    \frac{\left(\sum_T|T|\right)^2}{\sum_{T,T'}|T\cap T'|}.
    $$

??? proof "Proof"

    Cauchy–Schwarz on the support $K$ gives

    $$
    \left(\int_K\mu\right)^2\le|K|\int_K\mu^2.
    $$

    Expanding the finite square,

    $$
    \int\mu^2=\sum_{T,T'}\int\mathbf1_T\mathbf1_{T'}
    =\sum_{T,T'}|T\cap T'|.
    $$

    Divide by this positive denominator. The diagonal terms $T=T'$ are included.

If there are $N$ tubes, each of volume $v$, the estimate reads

$$
|K|\ge\frac{N^2v^2}{\sum_{T,T'}|T\cap T'|}.
$$

For disjoint tubes, the denominator is $Nv$ and the result is $|K|\ge Nv$, with equality. For coincident tubes, it is $N^2v$ and gives $|K|\ge v$, again with equality. These extremes explain why pairwise overlap, rather than tube count alone, matters.

For any $1<p<\infty$, Hölder gives the more general relation

$$
\|\mu\|_1\le|K|^{1-1/p}\|\mu\|_p,
\qquad
|K|\ge\left(\frac{\|\mu\|_1}{\|\mu\|_p}\right)^{p/(p-1)}.
$$

Upper bounds on multiplicity norms therefore imply lower bounds on the volume occupied by the tubes.

## 6. Transversality and its limits { #transversality }

Two nearly parallel tubes can overlap over much of their length. Tubes meeting at a substantial angle have a shorter overlap region. For equal cylindrical tubes of length $L$ and radius $r$ in $\mathbb R^n$, $n\ge2$, at an angle $0<\alpha\le\pi/2$ between their axes, a geometric upper bound is

$$
|T\cap T'|\lesssim
r^{n-1}\min\left(L,\frac r{\sin\alpha}\right).
$$

The overlap length along an axis is at most a constant times $r/\sin\alpha$, and each transverse section has volume at most a constant times $r^{n-1}$. The full tube length bounds it as well. When $\alpha$ is bounded away from zero, the intersection is of order at most $r^n$, much smaller than $Lr^{n-1}$ if $r\ll L$.

This pairwise estimate illustrates geometric gain from direction separation. It does not resolve the high-dimensional many-tube Kakeya problem: summing all pairs can still lose important information. Multilinear estimates exploit stronger transversality among several families of directions.

The indicator model also omits cancellation among oscillatory packets. Tube multiplicity is a useful part of the analytic problem, not a complete substitute for the extension operator. Rigorous restriction estimates must track amplitudes, phases, packet errors, and the geometry of the surface.

## 7. Returning to nonlinear evolution { #return-to-pde }

These theories connect through a sequence of concrete requirements. The local theorem needs control of the nonlinearity in a phase space. Continuation needs a bound for the norm controlling the lifespan. Scattering can follow from integrable nonlinear forcing. Dispersive estimates aim to provide the required spacetime control; frequency localization exposes the geometry and concentration of the linear waves; tube estimates address part of the overlap problem.

For the cubic Klein–Gordon example, we have proved local well-posedness, global defocusing existence, focusing small-data existence for positive mass, and scattering conditional on $L_t^3L_x^6$ control. Littlewood–Paley theory and the restriction–Kakeya connection provide tools for further analysis. Establishing the full global spacetime estimate requires additional dispersive and nonlinear arguments.

## 8. Exercise: two tubes { #exercise }

!!! example "Exercise. How sharp is the overlap inequality?"

    Two tubes have volume $v$ and intersection volume $w\in[0,v]$. Compare the Cauchy–Schwarz lower bound with their exact union volume.

??? solution "Solution"

    The diagonal overlaps contribute $2v$ and the two ordered off-diagonal overlaps contribute $2w$. Proposition 6.1 gives

    $$
    |T_1\cup T_2|\ge\frac{4v^2}{2v+2w}=\frac{2v^2}{v+w}.
    $$

    The exact volume is $2v-w$. The gap is

    $$
    (2v-w)-\frac{2v^2}{v+w}=\frac{w(v-w)}{v+w}\ge0.
    $$

    Equality holds when the tubes are disjoint up to null sets or coincide up to null sets. For partial overlap, the multiplicity is nonconstant on the union and Cauchy–Schwarz is strict.

[Previous: Littlewood–Paley theory](chapter-05.md)
