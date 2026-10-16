---
title: "Chapter 4: Global Existence and Scattering"
date: 2026-10-14
description: Energy conservation, defocusing global evolution, focusing small data, and a conditional scattering criterion.
hide:
  - navigation
categories:
  - Analysis
  - Hyperbolic PDEs
tags:
  - analysis
  - hyperbolic-pde
  - klein-gordon
  - scattering
  - course
---

# Chapter 4: Global Existence and Scattering { #chapter-04 }

We use the local theory from [Chapter 3](chapter-03.md).

Unless stated otherwise, $m>0$, space is $\mathbb R^3$, and

$$
\partial_t^2u-\Delta u+m^2u+\lambda u^3=0,
\qquad U=(u,\partial_tu)\in\mathcal H_m=H^1\times L^2.
$$

## 1. Conservation at energy regularity { #energy-conservation }

!!! theorem "Theorem 4.1. Conservation of the Hamiltonian"

    Every energy-class mild solution conserves

    $$
    E(U)=\frac12\big(\|\partial_tu\|_2^2+\|\nabla u\|_2^2+m^2\|u\|_2^2\big)
    +\frac\lambda4\|u\|_4^4
    $$

    throughout its lifespan.

??? proof "Proof by smooth approximation"

    For smooth sufficiently decaying solutions, integration by parts gives

    $$
    \frac d{dt}E(U(t))=
    \int\partial_tu\big(\partial_t^2u-\Delta u+m^2u+\lambda u^3\big)\,dx=0.
    $$

    Take smooth compactly supported initial data $U_{0,n}\to U_0$ in $H^1\times L^2$. The local theorem gives a common interval and uniform convergence $U_n\to U$ there in $C_t\mathcal H_m$.

    The approximating solutions have the regularity needed for the identity. One can see persistence at $H^2\times H^1$ directly from

    $$
    \|u^3\|_{H^1}\lesssim\|u\|_{H^1}^2\|u\|_{H^2},
    $$

    since $\|\nabla(u^3)\|_2\le3\|u\|_6^2\|\nabla u\|_6$. The corresponding higher energy estimate and Gronwall prevent loss of this regularity on an interval with a bounded $H^1\times L^2$ norm. Spatial cutoff or density justifies integration by parts at this regularity.

    The functional $E$ is continuous in the energy topology. In particular, $H^1\hookrightarrow L^4$ implies

    $$
    \left|\|u\|_4^4-\|w\|_4^4\right|
    \lesssim(\|u\|_4^3+\|w\|_4^3)\|u-w\|_4.
    $$

    Passing to the limit gives $E(U(t))=E(U_0)$ on the common local interval. On any compact subinterval of the maximal lifespan, the solution norm is bounded. Finitely many local intervals cover it, and repeating the same argument proves conservation throughout the lifespan.

The free group preserves the quadratic norm; the nonlinear flow conserves the full $E$. These are different statements. The quadratic norm of the nonlinear solution need not be constant.

## 2. Defocusing global existence { #defocusing }

!!! theorem "Theorem 4.2. Global defocusing well-posedness"

    If $m>0$ and $\lambda\ge0$, every $U_0\in\mathcal H_m$ produces a unique global solution $U\in C(\mathbb R;\mathcal H_m)$. Moreover,

    $$
    \sup_{t\in\mathbb R}\|U(t)\|_{\mathcal H_m}^2\le2E(U_0).
    $$

    The solution depends continuously on the datum on every compact time interval.

??? proof "Proof"

    Nonnegativity of the quartic term gives

    $$
    \tfrac12\|U(t)\|_{\mathcal H_m}^2\le E(U(t))=E(U_0).
    $$

    The continuation criterion rules out a finite endpoint in either direction. Alternatively, time reversal sends $(u(t),\partial_tu(t))$ to $(u(-t),-\partial_tu(-t))$, so forward global existence gives backward global existence as well.

    On a fixed compact interval, nearby initial data have uniformly bounded initial energies, hence uniformly bounded solution norms. Iterating the local stability estimate gives continuous dependence there.

This is the coercive Lyapunov principle in an evolution setting: a local theory with norm-controlled lifespan, plus a conserved functional controlling that norm, yields global existence.

The upper comparison has a quartic contribution,

$$
E(U)\le\tfrac12\|U\|_{\mathcal H_m}^2+C_{m,\lambda}\|U\|_{\mathcal H_m}^4.
$$

For $\lambda>0$ there is no global upper bound by a fixed constant times the squared norm. Indeed, for a fixed nonzero smooth $\varphi$, the energy of $(a\varphi,0)$ grows like $a^4$, whereas its squared phase-space norm grows like $a^2$.

## 3. Focusing data and a preserved small neighborhood { #focusing }

When $\lambda<0$, the full pointwise potential is

$$
W(u)=\frac{m^2}2u^2-\frac{|\lambda|}4u^4.
$$

It tends to $-\infty$ as $|u|\to\infty$ and has nonzero roots $u=\pm\sqrt{2m^2/|\lambda|}$. The positive quadratic well near zero does not imply global coercivity for all data: $E(a\varphi,0)\to-\infty$ for a fixed nonzero $\varphi$ as $a\to\infty$.

Small data lie in a region where the quartic term can be absorbed.

!!! theorem "Theorem 4.3. Focusing small-data global existence"

    Let $m>0$ and $\lambda<0$. There is $\varepsilon=\varepsilon(m,\lambda)>0$ such that every $\|U_0\|_{\mathcal H_m}<\varepsilon$ produces a unique global energy solution, with continuous dependence on every compact interval.

??? proof "Proof by a first-exit argument"

    Put $Q=\|U\|_{H^1\times L^2}$, $c_m=\min(1,m^2)$, and $C_m=\max(1,m^2)$. Let $C_4$ be an embedding constant for $\|u\|_4\le C_4\|u\|_{H^1}$. Then

    $$
    E(U)\ge\frac{c_m}2Q^2-\frac{|\lambda|C_4^4}4Q^4.
    $$

    Choose $R>0$ with $|\lambda|C_4^4R^2\le c_m$. On the ball $Q\le R$,

    $$
    E(U)\ge\frac{c_m}4Q^2,
    \qquad E(U)\le\frac{C_m}2Q^2.
    $$

    Choose initial data so small that $Q_0<R$ and $(C_m/2)Q_0^2<c_mR^2/4$. Norm equivalence gives an $\varepsilon$ ensuring both conditions.

    If the solution first reached the boundary $Q=R$ at $t_*$, conservation would give

    $$
    E(U_0)=E(U(t_*))\ge\frac{c_m}4R^2,
    $$

    contradicting the initial energy bound. Thus $Q<R$ throughout the forward lifespan, and in fact $Q(t)^2\le4E(U_0)/c_m$. Continuation gives global forward existence. The same proof works backwards.

    To obtain stability for these data on compact intervals, fix a sufficiently small datum and choose a neighborhood satisfying the same strict initial inequalities. The preserved ball supplies a common norm bound, allowing iteration of local continuous dependence.

The continuity argument is essential: it proves that the smallness needed to absorb the quartic term persists. A pointwise estimate valid only while the solution is small cannot by itself establish global existence. This proof does not decide the behavior of arbitrary large focusing data.

## 4. Stationary states and the strong topology { #stationary-states }

A stationary state is $U_*=(u_*,0)$ with

$$
-\Delta u_*+m^2u_*+\lambda u_*^3=0.
$$

For $\lambda>0$ and $m\ge0$, the only stationary state in $H^1\times L^2$ is zero. To prove this, interpret the equation weakly and test against $u_*$. The cubic pairing is legitimate by $H^1\hookrightarrow L^4$. Density of compactly supported tests gives

$$
0=\|\nabla u_*\|_2^2+m^2\|u_*\|_2^2+\lambda\|u_*\|_4^4,
$$

so $u_*=0$.

For nonzero defocusing initial data, $E(U_0)>0$. Strong convergence $U(t)\to0$ in $H^1\times L^2$ would imply $E(U(t))\to0$ by continuity, contradicting conservation. This statement concerns a global strong norm; it does not exclude local decay or convergence in a weaker topology. Energy can travel away from a fixed spatial region without disappearing from the whole-space norm.

The appropriate asymptotic comparison is therefore a moving free solution.

## 5. Scattering and the interaction representation { #scattering }

!!! definition "Definition 4.4. Forward scattering"

    A global forward solution scatters in $\mathcal H_m$ if there is $U_+\in\mathcal H_m$ such that

    $$
    \|U(t)-S_m(t)U_+\|_{\mathcal H_m}\to0\qquad(t\to\infty).
    $$

The scattering datum $U_+$ depends on the nonlinear trajectory. It need not equal the original datum $U_0$.

Remove the free motion by setting $\widetilde U(t)=S_m(-t)U(t)$. Duhamel gives

$$
\widetilde U(t)=U_0+
\int_0^tS_m(-s)\begin{pmatrix}0\\-\lambda u(s)^3\end{pmatrix}\,ds.
$$

Since $S_m$ is isometric,

$$
\|U(t)-S_m(t)U_+\|_{\mathcal H_m}
=\|\widetilde U(t)-U_+\|_{\mathcal H_m}.
$$

Thus scattering is precisely convergence of the trajectory in the interaction representation. It does not require the PDE to become exactly linear after a finite interaction time.

!!! proposition "Proposition 4.5. A sufficient spacetime criterion for scattering"

    Let $m>0$, $\lambda\in\mathbb R$, and suppose the solution is global forward. If

    $$
    u\in L_t^3([0,\infty);L_x^6),
    $$

    then it has a unique scattering state

    $$
    U_+=U_0-\lambda\int_0^\infty S_m(-s)
    \begin{pmatrix}0\\u(s)^3\end{pmatrix}\,ds,
    $$

    and

    $$
    \|U(t)-S_m(t)U_+\|_{\mathcal H_m}
    \le|\lambda|\int_t^\infty\|u(s)\|_6^3\,ds\to0.
    $$

??? proof "Proof"

    The nonlinear force satisfies

    $$
    \left\|\begin{pmatrix}0\\-\lambda u(s)^3\end{pmatrix}\right\|_{\mathcal H_m}
    =|\lambda|\|u(s)\|_6^3.
    $$

    Its norm is time integrable. The isometry therefore makes the improper Bochner integral defining $U_+$ absolutely convergent in $\mathcal H_m$. Moreover,

    $$
    \|U_+\|_{\mathcal H_m}\le\|U_0\|_{\mathcal H_m}+|\lambda|\|u\|_{L_t^3L_x^6}^3.
    $$

    Multiply its defining equation by $S_m(t)$ and subtract from Duhamel. With $N(U)=(0,-\lambda u^3)$,

    $$
    U(t)-S_m(t)U_+=-\int_t^\infty S_m(t-s)N(U(s))\,ds.
    $$

    The isometry gives the displayed tail bound, and the tail of an integrable nonnegative function tends to zero. If $U_+$ and $W_+$ both scattered to the same solution, then

    $$
    \|U_+-W_+\|_{\mathcal H_m}
    =\|S_m(t)(U_+-W_+)\|_{\mathcal H_m}\to0
    $$

    by the triangle inequality. Hence the state is unique.

This is a sufficient condition, not a necessary characterization of every possible scattering solution. Oscillatory integrals can converge without absolute integrability. The local and conserved-energy estimates above yield an $L_t^\infty H_x^1$ bound, not the global $L_t^3L_x^6$ bound. Establishing that additional estimate is a separate dispersive-analysis problem.

## 6. The massless equation { #massless }

For $m=0$, the quadratic energy controls

$$
\|(u,v)\|_{\dot H^1\times L^2}^2=\|\nabla u\|_2^2+\|v\|_2^2,
$$

and the free wave group $S_0(t)$ is isometric in this homogeneous space. It does not preserve the inhomogeneous $H^1\times L^2$ norm. The bound $|\sin(t|\xi|)|/|\xi|\le|t|$ gives

$$
\|S_0(t)\|_{H^1\times L^2\to H^1\times L^2}\lesssim1+|t|.
$$

The cubic nonlinearity is still locally Lipschitz on $H^1\times L^2$, and finite-interval boundedness of the free group gives a local contraction and the same norm-based continuation principle. For $\lambda\ge0$, conservation controls the gradient and velocity. In addition,

$$
\|u(t)\|_2\le\|u_0\|_2+\int_0^t\|\partial_su(s)\|_2\,ds
\le\|u_0\|_2+t\sqrt{2E(U_0)}\qquad(t\ge0).
$$

The full inhomogeneous norm stays bounded on every finite interval, so the solution is global. No uniform-in-time $L^2$ bound follows from this argument. The focusing small-data coercivity proof above uses $c_m>0$ and does not apply when $m=0$.

For a global massless solution with $u\in L_t^3L_x^6$, the scattering proof gives convergence in $\dot H^1\times L^2$. To obtain inhomogeneous scattering by the same absolute-integral method, a sufficient stronger condition is

$$
\int_0^\infty(1+s)\|u(s)\|_6^3\,ds<\infty.
$$

This controls the interaction-picture integral in $H^1\times L^2$. The tail estimate also converges to zero there because $1+|t-s|\le1+s$ for $s\ge t\ge0$. This distinction is entirely a low-frequency issue.

## 7. Exercise: rate from a decay assumption { #exercise }

!!! example "Exercise. A conditional scattering rate"

    Suppose $m>0$ and a global solution satisfies $\|u(t)\|_6\le C(1+t)^{-\alpha}$ with $\alpha>1/3$. Find a rate for the difference from its scattering orbit.

??? solution "Solution"

    The assumption makes $\|u(t)\|_6^3$ time integrable. Proposition 4.5 gives

    $$
    \|U(t)-S_m(t)U_+\|_{\mathcal H_m}
    \le\frac{|\lambda|C^3}{3\alpha-1}(1+t)^{1-3\alpha}.
    $$

    The decay assumption is extra input; energy conservation alone does not supply it.

[Previous: local Klein–Gordon theory](chapter-03.md) · [Next: Littlewood–Paley theory](chapter-05.md)
