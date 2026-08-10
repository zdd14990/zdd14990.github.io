---
title: Central Limit Theorem
date: 2026-07-06
hide:
  - navigation
categories:
  - 概统
  - 概率论
tags:
  - probability-statistics
  - probability-theory
  - course
---

# Central Limit Theorem


---

## Characteristic Functions

For a real random variable $X$ with law $\mu$, its **characteristic function** is

$$
\varphi_X(t)=\mathbb{E}[e^{itX}]
=\int_{\mathbb{R}}e^{itx}\,\mu(dx),
\qquad t\in\mathbb{R}.
$$

It is the Fourier transform of the probability measure $\mu$.

Basic properties:

1. $\varphi_X(0)=1$ and $|\varphi_X(t)|\le 1$, and $\varphi_X(-t)=\overline{\varphi_X(t)}$.

2. $\varphi_X$ is uniformly continuous.

3. For $a,b\in\mathbb{R}$,

    $$
    \varphi_{aX+b}(t)=e^{ibt}\varphi_X(at).
    $$

4. If $X$ and $Y$ are independent, then

    $$
    \varphi_{X+Y}(t)=\varphi_X(t)\varphi_Y(t).
    $$

5. Convex combination of characteristic functions is a characteristic function. That is because the law of a convex combination of independent random variables is the corresponding convex combination of their laws.

6. If $f$ is a characteristic function, then $|f|^2$ is also a characteristic function. 

---

## Examples

* If $X=a$ almost surely, then $\varphi_X(t)=e^{iat}$.

* If $\mathbb{P}(X=1)=\mathbb{P}(X=-1)=1/2$, then

    $$
    \varphi_X(t)=\cos t.
    $$

* If $X\sim \mathrm{Uniform}[-a,a]$, then

    $$
    \varphi_X(t)=\frac{\sin(at)}{at}.
    $$


* If $X\sim N(m,\sigma^2)$, then

    $$
    \varphi_X(t)=\exp\left(imt-\frac{\sigma^2t^2}{2}\right).
    $$

* If $X \sim \mathrm{Exponential}(\lambda)$, then

    $$
    \varphi_X(t)=\frac{\lambda}{\lambda-it}.
    $$


* If $X\sim \mathrm{Poisson}(\lambda)$, then

    $$
    \varphi_X(t)=\exp\{\lambda(e^{it}-1)\}.
    $$

* If $X\sim \mathrm{Geometric}(p)$, then

    $$
    \varphi_X(t)=\frac{pe^{it}}{1-(1-p)e^{it}}.
    $$


---

**Lemma:** Suppose $X$ and $Y$ are independent. Then

* The distribution of $X+Y$ is $F_X*F_Y$ 

* The characteristic function of $X+Y$ is $\varphi_X\times \varphi_Y$.


---
## Inversion and Uniqueness

**Theorem:** Suppose $f$ is the characteristic function of a law $\mu$. Then for any $x<y$ we have:

$$
\mu[(x,y)]+\frac{1}{2}\mu[\{x\}]+\frac{1}{2}\mu[\{y\}]=\lim_{T\to\infty}\frac{1}{2\pi}\int_{-T}^{T}\frac{e^{-itx}-e^{-ity}}{it}f(t)\,dt.
$$


**Corollary:** If two probability measures have the same characteristic function, then they are equal.

If $\varphi\in L^1(\mathbb{R})$, then the corresponding law has density

$$
p(x)=\frac{1}{2\pi}\int_{\mathbb{R}}e^{-itx}\varphi(t)\,dt.
$$

The atoms are recovered by

$$
\mu(\{x\})=
\lim_{T\to\infty}
\frac{1}{2T}\int_{-T}^{T}e^{-itx}\varphi(t)\,dt.
$$

---

The random variable $X$ is **symmetric**  if $X$ and $-X$ have the same law. 

**Lemma:** $X$ is symmetric if and only if $\varphi_X(t)$ is real for all $t\in\mathbb{R}$.

A random vector $X=(X_1,\ldots,X_d)$ is a **Gaussian vector** if for every $u=(u_1,\ldots,u_d)\in\mathbb{R}^d$, the random variable $u^TX=\sum_{j=1}^du_jX_j$ is Gaussian. We denote

$$
m=(\mathbb{E}[X_1],\ldots,\mathbb{E}[X_d])\in \mathbb{R}^d,
$$

$$
\Sigma = (w_{ij})_{1\le i,j\le d},\qquad w_{ij}=\operatorname{Cov}(X_i,X_j),
$$

**Lemma:** The matrix $\Sigma$ is a positive semidefinite matrix and we have

$$
\mathbb{E}[e^{i u^TX}]=\exp\left(i u^Tm-\frac{1}{2}u^T\Sigma u\right).
$$

**Lemma:** As $\Sigma$ is positive semidefinite, there exists a matrix $A$ such that $\Sigma=AA^T$. Suppose $Y=(Y_1,\ldots,Y_d)$ where $Y_1,\ldots,Y_d$ are i.i.d. $\sim N(0,1)$. Then $X$ has the same law as $AY+m$.



















---

## Levy Continuity Theorem

Let $(X_n)$ be real random variables with characteristic functions $\varphi_n$.

If $X_n\Rightarrow X$, then

$$
\varphi_n(t)\longrightarrow \varphi_X(t)
\qquad\text{for every }t\in\mathbb{R}.
$$

Conversely, if $\varphi_n(t)\to \varphi(t)$ pointwise and $\varphi$ is continuous at $0$, then $\varphi$ is the characteristic function of some law $\mu$, and

$$
X_n\Rightarrow \mu.
$$

---

## Central Limit Theorem

Let $(X_n)$ be i.i.d. with

$$
\mathbb{E}[X_1]=m,
\qquad
\operatorname{Var}(X_1)=\sigma^2\in(0,\infty).
$$

Then

$$
\frac{S_n-nm}{\sigma\sqrt n}
\Rightarrow N(0,1).
$$

Equivalently, for every $x\in\mathbb{R}$,

$$
\mathbb{P}\left(\frac{S_n-nm}{\sigma\sqrt n}\le x\right)
\longrightarrow
\frac{1}{\sqrt{2\pi}}\int_{-\infty}^{x}e^{-u^2/2}\,du.
$$

---

## Lindeberg-Feller Theorem 

For each $n$, let $\left\{X_{n,m}\right\}_{m=1}^{n}$ be i.r.v. with $\mathbb{E}[X_{n,m}]=0$ Suppose that 

$$
\lim_{n\to\infty}\sum_{m=1}^{n}\mathbb{E}[X_{n,m}^2]=\sigma^2\in(0,\infty),
$$

and for every $\varepsilon>0$,

$$
\lim_{n\to\infty}\sum_{m=1}^{n}\mathbb{E}[X_{n,m}^2\mathbf{1}_{\{|X_{n,m}|>\varepsilon\}}]=0.
$$

Then 

$$
S_n^{\#}=\sum_{m=1}^{n}X_{n,m}\Rightarrow N(0,\sigma^2).
$$


---

## Poisson Convergence

**Theorem** For each $n$, let $\left\{X_{n,m}:1\le m\le n\right\}$ be i.v. with $\mathbb{P}(X_{n,m}=1)=p_n$ and $\mathbb{P}(X_{n,m}=0)=1-p_n$. Suppose that 

$$
\sum_{m=1}^{n}p_n\longrightarrow \lambda\in(0,\infty), \text{ and }, \max_{1\le m\le n}p_n\longrightarrow 0.
$$

Then 

$$
S_n^{\#}=\sum_{m=1}^{n}X_{n,m}\Rightarrow \mathrm{Poisson}(\lambda).
$$

---

A complex-valued function $f$ defined on $\mathbb{R}$ is called **positive definite** if for any set of real numbers $t_j$ and complex numbers $z_j$, we have

$$
\sum _{j,k}f(t_j-t_k)z_j\overline{z_k}\ge 0.
$$


**Theorem:** $f$ is a characteristic function if and only if it is positive definite and continuous at zero with $f(0)=1$.