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

1. $\varphi_X(0)=1$ and $|\varphi_X(t)|\le 1$.

2. $\varphi_X$ is uniformly continuous.

3. For $a,b\in\mathbb{R}$,

    $$
    \varphi_{aX+b}(t)=e^{ibt}\varphi_X(at).
    $$

4. If $X$ and $Y$ are independent, then

    $$
    \varphi_{X+Y}(t)=\varphi_X(t)\varphi_Y(t).
    $$

---

## Examples

* If $X=a$ almost surely, then $\varphi_X(t)=e^{iat}$.

* If $\mathbb{P}(X=1)=\mathbb{P}(X=-1)=1/2$, then

    $$
    \varphi_X(t)=\cos t.
    $$

* If $X\sim N(m,\sigma^2)$, then

    $$
    \varphi_X(t)=\exp\left(imt-\frac{\sigma^2t^2}{2}\right).
    $$

* If $X\sim \mathrm{Poisson}(\lambda)$, then

    $$
    \varphi_X(t)=\exp\{\lambda(e^{it}-1)\}.
    $$

---

## Inversion and Uniqueness

The characteristic function determines the law. More precisely, if two probability measures have the same characteristic function, then they are equal.

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

## Lindeberg Form

For independent centered variables $(X_{n,k})$, set

$$
s_n^2=\sum_k \operatorname{Var}(X_{n,k}).
$$

The Lindeberg condition is

$$
\frac{1}{s_n^2}
\sum_k
\mathbb{E}\left[
X_{n,k}^2\mathbf{1}_{\{|X_{n,k}|>\varepsilon s_n\}}
\right]
\longrightarrow 0
$$

for every $\varepsilon>0$. Under this condition,

$$
\frac{\sum_k X_{n,k}}{s_n}\Rightarrow N(0,1).
$$
