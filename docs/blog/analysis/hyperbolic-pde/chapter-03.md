---
title: "Chapter 3: The Klein–Gordon Equation and Local Well-Posedness"
date: 2026-10-14
description: The Hamiltonian energy space, the linear Klein–Gordon group, and a complete cubic contraction argument in three dimensions.
hide:
  - navigation
categories:
  - Analysis
  - Hyperbolic PDEs
tags:
  - analysis
  - hyperbolic-pde
  - klein-gordon
  - course
---

# Chapter 3: The Klein–Gordon Equation and Local Well-Posedness { #chapter-03 }

## 1. The model and its phase space { #model }

Consider a real-valued solution on $\mathbb R^3$ of

$$
\partial_t^2u-\Delta u+m^2u+\lambda u^3=0,
\qquad u(0)=u_0,\quad \partial_tu(0)=u_1,
$$

where $m>0$ and $\lambda\in\mathbb R$. The sign of $\lambda$ affects the global theory, but not the local contraction argument.

Set $v=\partial_tu$, $U=(u,v)$, and define

$$
\mathcal H_m=H^1(\mathbb R^3)\times L^2(\mathbb R^3),
\qquad
\|U\|_{\mathcal H_m}^2=
\|\nabla u\|_2^2+m^2\|u\|_2^2+\|v\|_2^2.
$$

Because $m>0$,

$$
\min(1,m^2)\|U\|_{H^1\times L^2}^2
\le\|U\|_{\mathcal H_m}^2
\le\max(1,m^2)\|U\|_{H^1\times L^2}^2.
$$

The first-order formulation is

$$
\partial_tU=AU+N(U),\qquad
A=\begin{pmatrix}0&I\\\Delta-m^2&0\end{pmatrix},
\qquad N(U)=\begin{pmatrix}0\\-\lambda u^3\end{pmatrix}.
$$

The scalar nonlinearity belongs to the second component. This placement matters in every Duhamel and scattering formula.

## 2. The Hamiltonian { #hamiltonian }

The conserved quantity suggested by the equation is

$$
E(U)=\frac12\|U\|_{\mathcal H_m}^2+
\frac\lambda4\int_{\mathbb R^3}u^4\,dx.
$$

The potential is $V(u)=\lambda u^4/4$. The integral is finite and continuous on $H^1$ because $H^1(\mathbb R^3)\hookrightarrow L^4$.

With the formal $L^2\times L^2$ pairing,

$$
\nabla E(U)=\begin{pmatrix}-\Delta u+m^2u+\lambda u^3\\v\end{pmatrix},
\qquad
J=\begin{pmatrix}0&I\\-I&0\end{pmatrix},
\qquad \partial_tU=J\nabla E(U).
$$

This is the Hamiltonian formulation. At energy regularity, $-\Delta u$ generally belongs to $H^{-1}$, so the displayed gradient is a formal variational derivative, not necessarily an $L^2\times L^2$ vector. Indeed,

$$
dE(U)[h,k]=\int\big(\nabla u\cdot\nabla h+m^2uh+\lambda u^3h+vk\big)\,dx
$$

is the precise continuous differential on $H^1\times L^2$.

For $\lambda\ge0$, $E(U)\ge\tfrac12\|U\|_{\mathcal H_m}^2$. The energy therefore suggests the right phase-space norm. The conservation and continuation argument is given in the next chapter.

## 3. Constructing the free group { #linear-group }

Let $\omega(\xi)=\sqrt{m^2+|\xi|^2}$ and $\omega(D)=\sqrt{m^2-\Delta}$. The spatial Fourier transform turns the linear equation into

$$
\partial_t^2\widehat u+\omega(\xi)^2\widehat u=0.
$$

For initial state $(f,g)$, define

$$
S_m(t)\begin{pmatrix}f\\g\end{pmatrix}
=\begin{pmatrix}
\cos(t\omega(D))f+\omega(D)^{-1}\sin(t\omega(D))g\\
-\omega(D)\sin(t\omega(D))f+\cos(t\omega(D))g
\end{pmatrix}.
$$

These Fourier multipliers define bounded maps on the energy space.

!!! proposition "Proposition 3.1. A strongly continuous isometric group"

    The operators $S_m(t)$ satisfy

    $$
    S_m(0)=I,\qquad S_m(t+s)=S_m(t)S_m(s),\qquad
    \|S_m(t)U\|_{\mathcal H_m}=\|U\|_{\mathcal H_m}.
    $$

    They form a strongly continuous group, orthogonal on the real space and unitary after complexification. Its generator is $A$, with domain $H^2\times H^1$.

??? proof "Proof"

    In Fourier variables the energy is

    $$
    \|U\|_{\mathcal H_m}^2=(2\pi)^{-3}\int
    \big(\omega(\xi)^2|\widehat u(\xi)|^2+|\widehat v(\xi)|^2\big)\,d\xi.
    $$

    The pair $(\omega\widehat u,\widehat v)$ evolves by the rotation matrix

    $$
    \begin{pmatrix}\cos(t\omega)&\sin(t\omega)\\-\sin(t\omega)&\cos(t\omega)\end{pmatrix}.
    $$

    It preserves the squared length pointwise in $\xi$, giving the isometry. The trigonometric identities give the group law and inverse $S_m(-t)$.

    To prove strong continuity at zero, the integrand for $\|(S_m(t)-I)U\|_{\mathcal H_m}^2$ tends pointwise to zero and is bounded by four times the energy density. Dominated convergence applies. The group law gives strong continuity at every time.

    Differentiating the Fourier formula at zero gives $AU=(v,-\omega(D)^2u)$ whenever this vector lies in $\mathcal H_m$. The requirements are $v\in H^1$ and $\omega(D)^2u\in L^2$, equivalent to $u\in H^2$. Difference quotients converge there by dominated convergence. Conversely, convergence of those quotients in the energy space forces these distributional derivatives to lie in the required spaces. Thus $D(A)=H^2\times H^1$.

The same isometry follows from integration by parts. For smooth decaying solutions,

$$
\frac d{dt}\frac12\int
\big(|\nabla u|^2+m^2u^2+v^2\big)\,dx
=\int\big(\nabla u\cdot\nabla v+v\Delta u\big)\,dx=0.
$$

Density then extends the flow to energy data: if smooth $U_{0,n}\to U_0$, the isometry gives

$$
\sup_t\|S_m(t)(U_{0,n}-U_{0,k})\|_{\mathcal H_m}
=\|U_{0,n}-U_{0,k}\|_{\mathcal H_m}.
$$

The Fourier construction also supplies the strong continuity and generator domain needed to interpret the evolution.

## 4. Duhamel's formula and mild solutions { #duhamel }

Formally applying the product rule to $S_m(-t)U(t)$ yields

$$
\frac d{dt}\big(S_m(-t)U(t)\big)=S_m(-t)N(U(t)).
$$

Integrating and using the group law gives

$$
U(t)=S_m(t)U_0+
\int_0^tS_m(t-s)N(U(s))\,ds.
$$

At energy regularity, this integral equation is the definition of a **mild solution**. The integral is a Bochner integral in $\mathcal H_m$. The corresponding scalar formula is

$$
u(t)=\cos(t\omega(D))u_0+
\omega(D)^{-1}\sin(t\omega(D))u_1
-\lambda\int_0^t\omega(D)^{-1}\sin((t-s)\omega(D))u(s)^3\,ds.
$$

A mild solution in $C(I;\mathcal H_m)$ has $u\in C(I;H^1)\cap C^1(I;L^2)$, with $\partial_tu=v$. Differentiating the scalar formula in $L^2$ is justified because $u^3\in C(I;L^2)$, and the differentiated forcing multiplier is bounded on $L^2$. A second derivative belongs to $H^{-1}$ and gives

$$
\partial_t^2u=\Delta u-m^2u-\lambda u^3
$$

in distributions. Conversely, an energy-class distributional solution has this integral representation: subtract the Duhamel solution for its continuous forcing, and use uniqueness of the homogeneous linear equation with zero initial data. That uniqueness follows by taking the spatial Fourier transform, or by a regularized energy identity.

## 5. The cubic estimate in dimension three { #cubic-estimate }

The essential input is $H^1(\mathbb R^3)\hookrightarrow L^6$. Factor the difference:

$$
u^3-w^3=(u-w)(u^2+uw+w^2).
$$

Hölder with $1/2=1/6+1/3$ gives

$$
\begin{aligned}
\|u^3-w^3\|_2
&\le\|u-w\|_6\big(\|u\|_6^2+\|u\|_6\|w\|_6+\|w\|_6^2\big)\\
&\le C\big(\|u\|_{H^1}^2+\|w\|_{H^1}^2\big)\|u-w\|_{H^1}.
\end{aligned}
$$

Also, $\|u^3\|_2=\|u\|_6^3\le C\|u\|_{H^1}^3$. Norm equivalence implies, for a fixed constant $K=K(m)>0$ enlarged if necessary,

$$
\|N(U)\|_{\mathcal H_m}\le K|\lambda|\|U\|_{\mathcal H_m}^3,
$$

$$
\|N(U)-N(W)\|_{\mathcal H_m}
\le K|\lambda|\big(\|U\|_{\mathcal H_m}^2+\|W\|_{\mathcal H_m}^2\big)
\|U-W\|_{\mathcal H_m}.
$$

Thus $N$ is locally Lipschitz from the phase space into itself. This is a dimension-dependent assertion. In dimension $d>3$, $H^1$ does not generally embed into $L^6$, so this particular energy-space proof cannot simply be reused.

## 6. The complete fixed-point argument { #fixed-point }

!!! theorem "Theorem 3.2. Energy-space local well-posedness"

    For $m>0$, $\lambda\in\mathbb R$, and every $U_0\in\mathcal H_m$, there is a unique local mild solution. For every $B<\infty$, one can choose a common $T=T(B,m,\lambda)>0$ for all data with $\|U_0\|_{\mathcal H_m}\le B$. The solution belongs to $C([-T,T];\mathcal H_m)$ and depends locally Lipschitz continuously on the data there.

??? proof "Proof"

    Let $X_T=C([-T,T];\mathcal H_m)$ with the supremum norm, and set $R=2\max(1,B)$. This choice also covers zero initial data. Define

    $$
    (\Psi U)(t)=S_m(t)U_0+\int_0^tS_m(t-s)N(U(s))\,ds.
    $$

    On the closed ball $\mathcal B_R=\{U:\|U\|_{X_T}\le R\}$, the linear isometry and cubic estimates give

    $$
    \|\Psi U\|_{X_T}\le B+K|\lambda|TR^3,
    $$

    $$
    \|\Psi U-\Psi W\|_{X_T}
    \le2K|\lambda|TR^2\|U-W\|_{X_T}.
    $$

    The same bounds hold for negative times by reversing the orientation of the integral. Choose $T>0$ so that $K|\lambda|TR^2\le1/4$; if $\lambda=0$, any finite $T$ works. Then

    $$
    B+K|\lambda|TR^3\le R/2+R/4<R,
    $$

    and the contraction constant is at most $1/2$. The ball is complete, so the contraction theorem produces a unique fixed point there.

    For two data in the same initial ball, their solutions satisfy

    $$
    \|U-W\|_{X_T}\le\|U_0-W_0\|_{\mathcal H_m}+\tfrac12\|U-W\|_{X_T},
    $$

    and hence $\|U-W\|_{X_T}\le2\|U_0-W_0\|_{\mathcal H_m}$. This proves the stated dependence.

    To obtain uniqueness among all continuous energy-class mild solutions, take a compact common interval. Both solutions are bounded there. Their difference obeys a Gronwall inequality with a finite coefficient, so solutions with the same datum agree. The argument applies in each time direction and on successive compact intervals.

The local lifespan is controlled by an energy-space bound, rather than by a stronger norm. This is what makes the later continuation argument possible. The time integral contributes a factor $T$; a sufficiently short interval makes the nonlinear correction small.

## 7. Maximal evolution and the continuation criterion { #continuation }

By uniqueness, the local solutions assemble into a maximal solution on an open interval $(T_-,T_+)$ containing zero. If $T_+<\infty$, then

$$
\limsup_{t\uparrow T_+}\|U(t)\|_{\mathcal H_m}=\infty.
$$

Indeed, a bound near $T_+$ gives a uniform local lifespan for data $U(t_0)$ there. Restarting at $t_0<T_+$ extends the solution past $T_+$ if $t_0$ is sufficiently late, contradicting maximality. The same argument works backwards.

Define the nonlinear flow by $\Phi_t(U_0)=U(t)$. Its composition law follows from autonomy and uniqueness, but the map is only defined for data whose solution exists at $t$. Unlike $S_m(t)$, $\Phi_t$ is nonlinear and does not generally preserve the quadratic norm. It conserves the full Hamiltonian, including its quartic term.

## 8. Exercise: a forced energy estimate { #exercise }

!!! example "Exercise. Time-integrable forcing"

    If $F\in L^1([0,T];L^2)$ and $\partial_t^2u-\Delta u+m^2u=F$, prove the energy-space bound for its mild solution.

??? solution "Solution"

    The first-order forcing is $(0,F)$. Duhamel and the isometry give

    $$
    \|U(t)\|_{\mathcal H_m}
    \le\|U_0\|_{\mathcal H_m}+\int_0^t\|F(s)\|_2\,ds.
    $$

    For the nonlinear equation, $F=-\lambda u^3$ and $\|F\|_{L_t^1L_x^2}=|\lambda|\|u\|_{L_t^3L_x^6}^3$. This identity explains the spacetime norm in the scattering criterion.

[Previous: stability](chapter-02.md) · [Next: global existence and scattering](chapter-04.md)
