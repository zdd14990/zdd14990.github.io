---
title: "Chapter 1: Local Theory and Loss of Regularity"
date: 2026-10-14
description: Picard iteration, continuous dependence, continuation, and the gradient catastrophe of inviscid Burgers.
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

# Chapter 1: Local Theory and Loss of Regularity { #chapter-01 }

## 1. What local well-posedness means { #local-well-posedness }

An evolution equation has the schematic form

$$
\partial_tu=F(u),\qquad u(0)=u_0.
$$

The state may be a vector in $\mathbb R^n$, a scalar function, or a vector field. The phrase "a solution exists" becomes mathematically useful only after we specify the phase space and the solution class.

!!! definition "Definition 1.1. Local well-posedness"

    An initial-value problem is locally well-posed in a phase space $X$ if each admissible datum has a solution on a nontrivial time interval, the solution is unique in a specified class, and the solution depends continuously on the datum in the chosen topologies. In the arguments below, nearby data also have a common lifespan.

Continuous dependence is often called **Cauchy stability**. It concerns perturbing the initial data on a fixed finite interval. It is different from Lyapunov stability, which asks whether a trajectory stays close to an equilibrium for all future times.

## 2. Picard iteration in finite dimensions { #picard-iteration }

Consider the autonomous equation

$$
\dot u=F(u),\qquad u(0)=u_0,\qquad F:\mathbb R^n\to\mathbb R^n.
$$

Integrating in time gives

$$
u(t)=u_0+\int_0^tF(u(s))\,ds.
$$

Thus a solution is a fixed point of the Picard map

$$
(\mathcal Pu)(t)=u_0+\int_0^tF(u(s))\,ds.
$$

!!! theorem "Theorem 1.2. Picard–Lindelöf"

    If $F$ is locally Lipschitz on $\mathbb R^n$, every $u_0$ has a unique local $C^1$ solution. The lifespan can be chosen uniformly for data in a sufficiently small neighborhood of $u_0$, and the solution depends continuously on the initial data.

??? proof "Proof"

    Choose $r>0$ such that $F$ is Lipschitz with constant $L$ on $\overline B(u_0,r)$. Let $M=\sup_{\overline B(u_0,r)}|F|$, which is finite. On the complete set

    $$
    \mathcal B=\{u\in C([-T,T];\mathbb R^n):\sup_{|t|\le T}|u(t)-u_0|\le r\},
    $$

    use the uniform metric. For $u\in\mathcal B$,

    $$
    \|\mathcal Pu-u_0\|_\infty\le TM,
    $$

    while for $u,v\in\mathcal B$,

    $$
    \|\mathcal Pu-\mathcal Pv\|_\infty\le TL\|u-v\|_\infty.
    $$

    Choose $T$ so that $TM\le r$ and $TL<1$. The contraction theorem produces a unique fixed point in $\mathcal B$. Its integral equation makes it $C^1$ and gives the ODE. Any other local solution starts inside this ball and agrees with the fixed point on a short interval; restarting the uniqueness argument gives agreement throughout a common interval.

    For data in $B(u_0,r/2)$, use the same larger ball and choose $TM\le r/2$. This gives a common lifespan. The estimate in the next section proves continuous dependence.

Two conditions are necessary in this proof: the map must preserve the chosen ball, and it must contract distances on that ball. A small Lipschitz constant alone does not establish a fixed-point theorem if the iterates leave its domain.

## 3. Quantitative Cauchy stability { #cauchy-stability }

Suppose $u$ and $v$ remain in a region where $F$ is $L$-Lipschitz. For $t\ge0$,

$$
|u(t)-v(t)|\le |u_0-v_0|+L\int_0^t|u(s)-v(s)|\,ds.
$$

Gronwall's inequality gives

$$
|u(t)-v(t)|\le e^{Lt}|u_0-v_0|.
$$

The same argument backwards in time gives $e^{L|t|}$. This is a finite-interval estimate: an exponentially growing upper bound does not imply that nearby trajectories remain uniformly close as $t\to\infty$.

The regularity assumption on $F$ is tied to uniqueness. Consider, for $0<\alpha<1$, the continuous vector field $F(u)=|u|^\alpha$. It is not locally Lipschitz at zero. Besides $u\equiv0$, for every $a\ge0$ there is the solution

$$
u_a(t)=
\begin{cases}
0,&t\le a,\\
\big((1-\alpha)(t-a)\big)^{1/(1-\alpha)},&t>a.
\end{cases}
$$

Both the function and its first derivative match at $t=a$. All these solutions satisfy $u(0)=0$. Mere continuity of the vector field therefore does not guarantee uniqueness.

## 4. Maximal lifespan and continuation { #continuation }

Uniqueness lets us join overlapping local solutions into a maximal solution. Write its maximal forward interval as $[0,T_+)$.

!!! proposition "Proposition 1.3. The finite-dimensional continuation principle"

    Let $F:\mathbb R^n\to\mathbb R^n$ be locally Lipschitz. If $T_+<\infty$ and $u(t)$ remains bounded on $[0,T_+)$, the solution extends beyond $T_+$. Consequently, a finite maximal lifespan forces

    $$
    \limsup_{t\uparrow T_+}|u(t)|=\infty.
    $$

??? proof "Proof by restarting before the endpoint"

    The bounded trajectory lies in a compact ball. On a slightly larger ball, $F$ is bounded and has a finite Lipschitz constant. The Picard argument therefore supplies a uniform lifespan $\tau>0$ for data in the smaller ball.

    Choose $t_0<T_+$ so close to $T_+$ that $t_0+\tau>T_+$. Solve the equation starting from $u(t_0)$. Uniqueness joins this solution to the original one and extends it past $T_+$. This contradicts maximality. No endpoint value $u(T_+)$ was assumed.

If the vector field is defined only on an open set, a trajectory can also approach the boundary of that set. The correct statement then requires the trajectory to remain in a compact subset of the domain.

The Riccati equation gives an exact singularity:

$$
\dot u=u^2,\qquad u(0)=u_0>0,
\qquad
u(t)=\frac{u_0}{1-tu_0}.
$$

Its forward lifespan is $T_+=u_0^{-1}$. More generally, positive solutions of $\dot u=u^\alpha$, $\alpha>1$, satisfy

$$
u(t)=\big(u_0^{1-\alpha}-(\alpha-1)t\big)^{-1/(\alpha-1)},
\qquad T_+=\frac{u_0^{1-\alpha}}{\alpha-1}.
$$

## 5. Why a PDE is more than a finite-dimensional ODE { #pde-phase-space }

For a second-order wave equation,

$$
\partial_t^2u-\Delta u=G(u),
$$

introduce $v=\partial_tu$ and $U=(u,v)$. Then formally

$$
\partial_tU=
\begin{pmatrix}0&I\\\Delta&0\end{pmatrix}U+
\begin{pmatrix}0\\G(u)\end{pmatrix}.
$$

This is an evolution in a function space, for example $H^s\times H^{s-1}$. However, $\Delta$ is unbounded there, so the full right-hand side is not an ordinary locally Lipschitz vector field on that space. One instead solves the linear evolution and places the nonlinear term inside an integral equation.

There is another distinction. Closed bounded balls in an infinite-dimensional space are generally not compact. A PDE continuation principle must come from its local theory: typically the local lifespan must be uniform on bounded subsets of the norm used for continuation. A bound in a weaker norm does not automatically suffice.

## 6. Burgers: a bounded solution with an unbounded derivative { #burgers }

Consider inviscid Burgers on the line,

$$
\partial_tu+u\partial_xu=0,\qquad u(0,x)=u_0(x).
$$

Assume $u_0\in C_b^1(\mathbb R)$, meaning that $u_0$ and $u_0'$ are continuous and bounded. Label a characteristic by its initial position $\xi$. Its equation is

$$
\dot x(t,\xi)=u(t,x(t,\xi)),\qquad x(0,\xi)=\xi.
$$

The chain rule and the PDE give

$$
\frac d{dt}u(t,x(t,\xi))=\partial_tu+\dot x\partial_xu=0.
$$

Thus the value is constant along each characteristic and

$$
x(t,\xi)=\xi+tu_0(\xi),\qquad
u(t,x(t,\xi))=u_0(\xi).
$$

The characteristic map has derivative

$$
\partial_\xi x(t,\xi)=1+tu_0'(\xi).
$$

When this derivative has a positive lower bound, the map is strictly increasing. Since $u_0$ is bounded, $x(t,\xi)\to\pm\infty$ as $\xi\to\pm\infty$, so it is a global $C^1$ diffeomorphism. Its inverse defines a classical solution.

!!! theorem "Theorem 1.4. Gradient catastrophe"

    Put $a=\inf_\xi u_0'(\xi)$. If $a<0$, the maximal forward lifespan in the class with bounded continuous first derivative is

    $$
    T_*=-\frac1a.
    $$

    For $0\le t<T_*$,

    $$
    \partial_xu(t,x(t,\xi))=
    \frac{u_0'(\xi)}{1+tu_0'(\xi)},
    \qquad \|u(t)\|_\infty=\|u_0\|_\infty,
    $$

    and $\|\partial_xu(t)\|_\infty\to\infty$ as $t\uparrow T_*$. If $a\ge0$, this forward gradient catastrophe does not occur.

??? proof "Proof"

    For $t<T_*$, $1+tu_0'(\xi)\ge1+ta>0$. The characteristic map is a global diffeomorphism as above. Differentiate $u(t,x(t,\xi))=u_0(\xi)$ to obtain the derivative formula.

    Constancy of $u$ along characteristics and surjectivity of the map give the $L^\infty$ identity. Since $w\mapsto w/(1+tw)$ is increasing where the denominator is positive,

    $$
    \inf_x\partial_xu(t,x)=\frac a{1+ta}.
    $$

    This holds even if the infimum $a$ is not attained: approximate it by a sequence of initial labels. The expression tends to $-\infty$ at $T_*$. Hence a solution with a bounded continuous derivative cannot continue across that time.

    If $a\ge0$, the characteristic derivative is at least one for all $t\ge0$, so the same construction works on every finite forward interval.

The derivative also obeys a Riccati equation. For smooth solutions, set $w=\partial_xu$ and differentiate the PDE:

$$
\partial_tw+u\partial_xw+w^2=0.
$$

Along a characteristic, $\dot w=-w^2$, giving the same formula. For $C^1$ data the characteristic calculation already proves it without needing a second classical derivative.

Crossing characteristics indicate a failure of a single-valued classical solution. At $T_*$ the derivative of the characteristic map may vanish, or its lower bound may tend to zero along labels escaping to infinity. After classical breakdown, entropy weak solutions belong to a different theory with a different uniqueness criterion.

## 7. From derivatives to frequency { #regularity-and-frequency }

Burgers shows that the amplitude of a solution can stay bounded while regularity is lost. The Fourier identity

$$
\widehat{\partial_j u}(\xi)=i\xi_j\widehat u(\xi)
$$

expresses the cost of differentiation as a frequency weight. Controlling $H^s$ therefore means controlling high-frequency mass. For nonlinear equations, interactions among scales, concentration in physical space, and coherent wave propagation can all threaten that control. The local Klein–Gordon argument will use Sobolev embedding; the later dyadic analysis explains how such embeddings arise from scale-by-scale estimates.

## 8. Exercises { #exercises }

!!! example "Exercise 1. Uniform continuity of the solution map"

    Suppose two ODE solutions stay in a set on which $F$ is $L$-Lipschitz. Prove an estimate for their difference on $[-T,T]$ and explain why it does not establish long-time Lyapunov stability.

??? solution "Solution"

    Apply the integral inequality and Gronwall in each time direction:

    $$
    \sup_{|t|\le T}|u(t)-v(t)|\le e^{LT}|u_0-v_0|.
    $$

    The constant grows with $T$. Lyapunov stability requires a smallness threshold that works for all forward times near an equilibrium.

!!! example "Exercise 2. An explicit Burgers singularity"

    Take $u_0(x)=-\tanh x$. Find the first gradient blow-up time and compute the solution and derivative on the characteristic starting at zero.

??? solution "Solution"

    Since $u_0'(x)=-\operatorname{sech}^2x$, its infimum is $-1$ and $T_*=1$. The zero characteristic stays at $x=0$, with $u(t,0)=0$ and

    $$
    \partial_xu(t,0)=-\frac1{1-t}.
    $$

    Nevertheless $\|u(t)\|_\infty=1$ before blow-up.

[Next: stability and Lyapunov functions](chapter-02.md)
