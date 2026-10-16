---
title: "Chapter 2: Stability and Lyapunov Functions"
date: 2026-10-14
description: Equilibria, linearized stability, nonlinear Lyapunov functions, and the limits of finite-dimensional compactness.
hide:
  - navigation
categories:
  - Analysis
  - Hyperbolic PDEs
tags:
  - analysis
  - hyperbolic-pde
  - dynamical-systems
  - course
---

# Chapter 2: Stability and Lyapunov Functions { #chapter-02 }

## 1. Autonomous equations and their flow { #flow }

Let $F\in C^1(\mathbb R^n;\mathbb R^n)$ and consider

$$
\dot x=F(x),\qquad x(0)=x_0.
$$

Write $\Phi_t(x_0)=x(t;x_0)$ whenever that solution exists at time $t$. Autonomy and uniqueness imply

$$
\Phi_0=\operatorname{Id},\qquad
\Phi_{t+s}(x_0)=\Phi_t(\Phi_s(x_0)),
$$

whenever the expressions are defined. Indeed, the trajectory $r\mapsto x(r+s;x_0)$ solves the same initial-value problem as the trajectory starting from $x(s;x_0)$.

For a globally defined two-sided flow, $\Phi_t^{-1}=\Phi_{-t}$. The $C^1$ dependence on data makes these maps $C^1$ diffeomorphisms. For a local flow, their domains must be restricted to data whose trajectories exist for the required times.

A point $x_*$ is an **equilibrium** if $F(x_*)=0$. The solution starting there is constant. A nearby trajectory might leave a small neighborhood, stay nearby without converging, or approach the equilibrium. These possibilities lead to different notions of stability.

## 2. Stability, attraction, and Cauchy stability { #stability-definitions }

!!! definition "Definition 2.1. Lyapunov stability and asymptotic stability"

    An equilibrium $x_*$ is **Lyapunov stable** if, for every $\varepsilon>0$, there is $\delta>0$ such that $|x_0-x_*|<\delta$ yields a global forward trajectory satisfying

    $$
    |\Phi_t(x_0)-x_*|<\varepsilon\qquad\text{for all }t\ge0.
    $$

    It is a **local attractor** if all data in some neighborhood give global forward trajectories converging to $x_*$. It is **locally asymptotically stable** if it has both properties.

For a locally Lipschitz vector field on $\mathbb R^n$, confinement to a sufficiently small closed ball already implies global forward existence by the continuation principle. This makes the definition equivalent to requiring closeness for all times for which the local trajectory is defined.

The planar rotation

$$
\dot x=-y,\qquad \dot y=x
$$

preserves $x^2+y^2$. The origin is Lyapunov stable, but each nonzero orbit is periodic and does not converge to it.

| Property | Time scale | What it controls |
| --- | --- | --- |
| Cauchy stability | A common compact time interval | Dependence of a solution on its initial data |
| Lyapunov stability | Every forward time | Distance from an equilibrium |
| Attraction | As $t\to\infty$ | Convergence to an equilibrium |
| Asymptotic stability | Every forward time and the limit | Stability together with attraction |

## 3. Linearization { #linearization }

Translate the equilibrium to the origin and write $x=x_*+h$. Fréchet differentiability gives

$$
F(x_*+h)=Lh+R(h),\qquad
L=DF(x_*),\qquad \frac{|R(h)|}{|h|}\to0\quad(h\to0).
$$

Thus the perturbation satisfies

$$
\dot h=Lh+R(h),
$$

and its linearized equation is $\dot z=Lz$, with solution $z(t)=e^{tL}z_0$.

One can also differentiate the flow with respect to its initial data. If $x_s(0)=x_*+sz_0$, then

$$
z(t)=\left.\partial_sx_s(t)\right|_{s=0}
$$

satisfies $\dot z=Lz$, $z(0)=z_0$. This is the variational equation along the equilibrium. Along a nonstationary trajectory, the coefficient becomes $DF(x(t))$ and depends on time.

!!! theorem "Theorem 2.2. Linearized stability and instability"

    Suppose $F\in C^1$ near $x_*$.

    1. If every eigenvalue of $DF(x_*)$ has negative real part, $x_*$ is locally exponentially stable.
    2. If at least one eigenvalue has positive real part, $x_*$ is unstable.
    3. If there is no positive-real-part eigenvalue but some eigenvalue lies on the imaginary axis, the spectrum alone does not decide stability.

??? proof "Proof of exponential stability"

    In finite dimensions, the spectral assumption implies $\|e^{tL}\|\le Me^{-at}$ for some $M\ge1$, $a>0$. Jordan blocks contribute polynomial factors, which can be absorbed by choosing $a$ smaller than the spectral decay rate.

    Choose $0<b<a$. On a sufficiently small ball, $|R(h)|\le\eta|h|$, where $M\eta/(a-b)<1/2$. Variation of constants gives

    $$
    h(t)=e^{tL}h_0+\int_0^te^{(t-s)L}R(h(s))\,ds.
    $$

    As long as the trajectory stays in that ball, put $Z_t=\sup_{0\le s\le t}e^{bs}|h(s)|$. Then

    $$
    Z_t\le M|h_0|+\frac{M\eta}{a-b}Z_t,
    \qquad Z_t\le2M|h_0|.
    $$

    Choose $h_0$ so small that this bound is strictly inside the ball. A first-exit argument shows the trajectory cannot leave; continuation gives global forward existence. Therefore $|h(t)|\le2Me^{-bt}|h_0|$.

??? proof "Proof of instability by an expanding cone"

    Split the real generalized eigenspaces as $\mathbb R^n=E_u\oplus E_c$, where $E_u$ contains all positive-real-part eigenvalues and $E_c$ the remaining ones. Write $h=z+y$ accordingly. There are inner-product norms on these spaces and constants $a>b>0$ such that for the linear equations

    $$
    \frac d{dt}\|z\|_u^2\ge2a\|z\|_u^2,
    \qquad
    \frac d{dt}\|y\|_c^2\le2b\|y\|_c^2.
    $$

    To obtain the first norm, choose $a$ below the least positive spectral real part and apply the finite-dimensional Lyapunov construction to the stable matrix $-L|_{E_u}+aI$. For the second, choose $0<b<a$ and apply it to $L|_{E_c}-bI$. The construction for a stable matrix $B$ is

    $$
    P=\int_0^\infty e^{tB^T}e^{tB}\,dt,
    \qquad B^TP+PB=-I,
    $$

    which is positive definite. Equivalent norms do not change $R(h)=o(|h|)$.

    In a sufficiently small ball, the nonlinear contribution to each squared-norm derivative is at most $C\eta(\|z\|_u+\|y\|_c)^2$. On the boundary of the cone $\|y\|_c\le\|z\|_u$, the derivative of $\|z\|_u^2-\|y\|_c^2$ is strictly positive if $\eta$ is small compared with $a-b$. Thus a trajectory starting with $y_0=0$, $z_0\ne0$, remains in that cone until it leaves the ball. Inside the cone,

    $$
    \frac d{dt}\|z\|_u^2\ge a\|z\|_u^2
    $$

    after further reducing $\eta$. If it never left the ball, it would be global and this exponential growth would contradict boundedness. Arbitrarily small nonzero $z_0$ therefore leave a fixed neighborhood. That is instability. If $E_c$ is empty, the same growth argument applies directly.

A non-hyperbolic equilibrium has at least one imaginary-axis eigenvalue. This only makes the test inconclusive when there is no already unstable direction. For instance, the scalar equations $\dot x=-x^3$, $\dot x=0$, and $\dot x=x^2$ all have derivative zero at the origin, but exhibit attraction, neutral stability, and instability respectively. For $x_0>0$ in the last equation,

$$
x(t)=\frac{x_0}{1-tx_0},
$$

so arbitrarily small data eventually leave any fixed small neighborhood.

## 4. Lyapunov functions { #lyapunov-functions }

Let $V\in C^1(U)$ on a neighborhood of $x_*$. Its derivative along the vector field is

$$
\dot V(x)=\nabla V(x)\cdot F(x).
$$

A function is **positive definite relative to $x_*$** if $V(x_*)=0$ and $V(x)>0$ for $x\ne x_*$. It is a Lyapunov function if additionally $\dot V\le0$, and a strict Lyapunov function if $\dot V<0$ away from the equilibrium.

!!! theorem "Theorem 2.3. Lyapunov stability"

    If there is a positive definite $C^1$ function $V$ with $\dot V\le0$ near $x_*$, then $x_*$ is Lyapunov stable.

??? proof "Proof"

    Choose a small $\varepsilon>0$ with $\overline B_\varepsilon(x_*)\subset U$. Compactness of the boundary sphere gives

    $$
    c_\varepsilon=\min_{|x-x_*|=\varepsilon}V(x)>0.
    $$

    Continuity at $x_*$ yields $0<\delta<\varepsilon$ such that $|x_0-x_*|<\delta$ implies $V(x_0)<c_\varepsilon$. Before any exit from the ball,

    $$
    V(x(t))\le V(x_0)<c_\varepsilon.
    $$

    A first exit would occur on the boundary, where $V\ge c_\varepsilon$, a contradiction. The trajectory stays bounded in the ball and hence continues for all forward times. Larger $\varepsilon$ follow by using a smaller ball.

The geometry is that low sublevel sets cannot cross a boundary on which $V$ has a larger value. For a locally defined $V$, this statement is used inside a containing compact neighborhood; one need not assume that every global sublevel set is compact.

!!! theorem "Theorem 2.4. Strict Lyapunov functions imply local asymptotic stability"

    Under the hypotheses of Theorem 2.3, suppose further that $\dot V(x)<0$ whenever $x\ne x_*$. Then $x_*$ is locally asymptotically stable.

??? proof "Proof with the compactness step made explicit"

    The stability proof places every sufficiently small initial trajectory in a fixed compact ball contained in $U$. The nonincreasing, nonnegative function $V(x(t))$ has a limit $\ell\ge0$.

    Suppose an accumulation point $y$ of the trajectory differs from $x_*$. Choose a small neighborhood of $y$ where $\dot V\le-c<0$. The vector field is bounded on the containing compact ball, say by $M$. Along a sequence of late times at which the trajectory is close enough to $y$, it must stay in that neighborhood for a common positive duration $\tau$: it cannot travel a fixed distance faster than $M$. If $M=0$, a nonzero $\dot V$ there is already impossible.

    Each such visit decreases $V$ by at least $c\tau$. This contradicts the fact that both the values at the start and end of arbitrarily late visits tend to $\ell$. Thus the only accumulation point is $x_*$. Compactness then implies $x(t)\to x_*$; otherwise a sequence staying a fixed distance away would have a different accumulation point.

Nonpositive derivative alone does not imply attraction: rotation has $\dot V=0$. Strict negativity gives attraction here, but a rate requires additional estimates. If $\dot V\le-cV$ and $a|x-x_*|^2\le V(x)\le b|x-x_*|^2$, then

$$
|x(t)-x_*|\le\sqrt{b/a}\,e^{-ct/2}|x_0-x_*|.
$$

## 5. A cancellation that gives an exact decay law { #nonlinear-example }

Consider the system

$$
\dot x=-x-xy,\qquad \dot y=-y+x^2.
$$

Take $V(x,y)=\tfrac12(x^2+y^2)$. Directly,

$$
\dot V=x(-x-xy)+y(-y+x^2)
=-x^2-y^2=-2V.
$$

The cubic terms cancel exactly, yielding

$$
V(t)=e^{-2t}V(0),\qquad
\sqrt{x(t)^2+y(t)^2}=e^{-t}\sqrt{x_0^2+y_0^2}.
$$

This boundedness prevents finite-time breakdown for every datum. The origin is globally exponentially stable.

The nonlinear vector field $(-xy,x^2)$ is perpendicular to $(x,y)$, so it changes the angle without changing radial energy. In polar coordinates, for a nonzero trajectory,

$$
\dot r=-r,\qquad
\dot\theta=\frac{x\dot y-y\dot x}{r^2}=x=r\cos\theta.
$$

The radius shrinks exactly exponentially while the angle evolves. The cancellation is the finite-dimensional prototype of the integration-by-parts identities used in PDE energy estimates.

## 6. What survives in infinite dimensions? { #infinite-dimensions }

The Lyapunov method needs quantitative comparison with the phase-space norm when used for PDE. Positivity of a functional does not automatically give a positive minimum on an infinite-dimensional sphere. For example, on $\ell^2$,

$$
V(x)=\sum_{j\ge1}\frac{|x_j|^2}{j}
$$

is continuous and positive for nonzero $x$, but $V(e_j)=1/j\to0$ on the unit sphere. It cannot serve as a uniform measure of distance there.

The compactness step in the strict Lyapunov proof also fails for bounded infinite-dimensional orbits without an additional compactness mechanism. Even at the linear level, spectral information for a general unbounded operator does not automatically provide a semigroup norm bound of the form used in Theorem 2.2.

For the Klein–Gordon equation, the useful replacement is explicit coercivity of the Hamiltonian together with a norm-based continuation theorem. The Hamiltonian is conserved, so it gives confinement and global existence rather than strict attraction to zero. Long-time behavior will be measured against a moving free orbit.

## 7. Exercises { #exercises }

!!! example "Exercise 1. A degenerate stable equilibrium"

    Solve $\dot x=-x^3$ and determine the stability and convergence rate of the origin.

??? solution "Solution"

    For $x_0\ne0$,

    $$
    x(t)=\frac{x_0}{\sqrt{1+2tx_0^2}}.
    $$

    The zero solution is constant. The absolute value never increases and tends to zero for every datum. Thus the equilibrium is globally asymptotically stable, with algebraic decay for nonzero trajectories. Since $F'(0)=0$, the negative-real-part criterion does not apply.

!!! example "Exercise 2. Tangential nonlinearities"

    Let $\dot z=-z+Q(z)$ on $\mathbb R^n$, where $Q$ is locally Lipschitz and $z\cdot Q(z)=0$. Prove global forward existence and an exact formula for $|z(t)|$.

??? solution "Solution"

    The identity $\tfrac d{dt}|z|^2=-2|z|^2$ gives $|z(t)|=e^{-t}|z_0|$. Continuation follows from boundedness. The nonlinear term may alter direction but cannot change this radial decay.

[Previous: local theory](chapter-01.md) · [Next: Klein–Gordon local theory](chapter-03.md)
