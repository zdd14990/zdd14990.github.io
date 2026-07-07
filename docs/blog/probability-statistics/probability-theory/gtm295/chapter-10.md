---
title: GTM295 Chapter 10
date: 2026-07-06
hide:
  - navigation
categories:
  - 概统
  - 概率论
tags:
  - probability-statistics
  - probability-theory
  - gtm295
  - exercises
---

# GTM295 Chapter 10

---

**Exercise 10.1** In this exercise, to emphasize the dependence on the underlying probability measure, we speak of convergence in $\mathbb{P}$-probability instead of convergence in probability. Let $(X_n)_{n\in\mathbb{N}}$ be a sequence of real random variables such that $X_n$ converges in $\mathbb{P}$-probability to $X$ when $n\to\infty$. Suppose that $\mathbb{P}'$ is another probability measure on $(\Omega,\mathcal{A})$ and that $\mathbb{P}'$ is absolutely continuous with respect to $\mathbb{P}$. Show that $X_n$ also converges in $\mathbb{P}'$-probability to $X$ when $n\to\infty$.

---

**Exercise 10.2** Let $f:[0,1]\to\mathbb{R}$ be a continuous function. Prove that

$$
\lim_{n\to\infty}\int_{[0,1]^n}f\left(\frac{x_1+x_2+\cdots+x_n}{n}\right)\,dx_1dx_2\cdots dx_n
=f\left(\frac12\right).
$$

---

**Exercise 10.3 (Bernstein Polynomials)** Let $f:[0,1]\to\mathbb{R}$ be a continuous function. Prove that, for every $p\in[0,1]$,

$$
f(p)=\lim_{n\to\infty}\sum_{k=0}^n\binom{n}{k}p^k(1-p)^{n-k}f(k/n),
$$

and that the convergence holds uniformly in $p\in[0,1]$.

---

**Exercise 10.4**

1. Let $f:\mathbb{R}_+\to\mathbb{R}$ be a bounded continuous function. Prove that, for every $\lambda>0$,

    $$
    \lim_{n\to\infty}e^{-\lambda n}\sum_{k=0}^\infty\frac{(\lambda n)^k}{k!}f(k/n)=f(\lambda),
    \tag{10.6}
    $$

    and that the convergence is uniform when $\lambda$ varies in a bounded subset of $(0,\infty)$.

2. Suppose that $f$ is only bounded and measurable, and is continuous at $x=\lambda$. Prove that the convergence in $(10.6)$ still holds.

3. Let $\mu$ be a probability measure on $\mathbb{R}_+$, and let $L(\lambda)=\int e^{-\lambda y}\mu(dy)$, for $\lambda\ge0$, be its Laplace transform. For every $\lambda>0$, write $L^{(k)}(\lambda)$ for the $k$-th derivative of $L$ at $\lambda$ (justify its existence!). Prove that, for every $x\in[0,\infty)$ such that $\mu(\{x\})=0$,

    $$
    \mu([0,x])
    =
    \lim_{n\to\infty}\sum_{k=0}^{\lfloor nx\rfloor}
    \frac{(-1)^k}{k!}n^kL^{(k)}(n).
    $$

---

**Exercise 10.5 (Coupon Collector Problem)** Suppose that, for every $n\in\mathbb{N}$, $(X_k^{(n)})_{k\ge1}$ is a sequence of independent random variables uniformly distributed on $\{1,2,\ldots,n\}$. For every integer $m\ge1$, let $N_m^{(n)}$ be the number of distinct values in the finite sequence $X_1^{(n)},X_2^{(n)},\ldots,X_m^{(n)}$, and set

$$
T_n=\inf\{m\ge1:N_m^{(n)}=n\}.
$$

If we observe the values $X_1^{(n)},X_2^{(n)},\ldots$ one after the other, $T_n$ is the first time when all possible values have been observed.

1. For every $k\in\{1,\ldots,n\}$, set $\tau_k^{(n)}=\inf\{m\ge1:N_m^{(n)}=k\}$, so that in particular $T_n=\tau_n^{(n)}$. Show that the random variables $\tau_k^{(n)}-\tau_{k-1}^{(n)}$, for $k\in\{2,\ldots,n\}$, are independent, and the distribution of $\tau_k^{(n)}-\tau_{k-1}^{(n)}-1$ is geometric of parameter $(k-1)/n$.

2. Prove that

    $$
    \frac{T_n}{n\log n}\xrightarrow[n\to\infty]{}1
    $$

    in probability. (*Hint:* Estimate the expected value and the variance of $T_n$.)

---

**Exercise 10.6** Let $(X_n)_{n\in\mathbb{N}}$ and $(Y_n)_{n\in\mathbb{N}}$ be two sequences of real random variables, and let $X$ and $Y$ be two real random variables. Is it always true that the properties

$$
X_n\xrightarrow[n\to\infty]{(d)}X
\quad\text{and}\quad
Y_n\xrightarrow[n\to\infty]{(d)}Y
$$

imply that $(X_n,Y_n)\xrightarrow[n\to\infty]{(d)}(X,Y)$? Show that this fact holds in each of the following two cases:

1. The random variable $Y$ is constant a.s.

2. For every $n\in\mathbb{N}$, $X_n$ and $Y_n$ are independent, and $X$ and $Y$ are independent.

---

**Exercise 10.7** Let $\mu$ be a probability measure on $\mathbb{R}$, and, for every $n\in\mathbb{N}$,

$$
\mu_n(dx)=\sum_{k\in\mathbb{Z}}\mu([k2^{-n},(k+1)2^{-n}))\,\delta_{k2^{-n}}(dx).
$$

Show that the sequence $\mu_n$ converges weakly to $\mu$.

---

**Exercise 10.8** Suppose that, for every $n\in\mathbb{N}$, $Y_n$ is a Gaussian $\mathcal{N}(m_n,\sigma_n^2)$ random variable, where $m_n\in\mathbb{R}$ and $\sigma_n>0$. Prove that the sequence $(Y_n)_{n\in\mathbb{N}}$ converges in distribution if and only if the two sequences $(m_n)$ and $(\sigma_n)$ converge, and identify the limiting distribution in that case.

---

**Exercise 10.9** Let $(Z_n)_{n\in\mathbb{N}}$ be a sequence of random variables with values in $\mathbb{R}^d$, and let $(a_n)_{n\in\mathbb{N}}$ be a sequence of reals. Assume that $Z_n$ converges in distribution to $Z$ and $a_n$ converges to $a$ as $n\to\infty$. Prove that $a_nZ_n$ converges in distribution to $aZ$. (*Hint:* Use Proposition 10.12, and note that the space $H$ in this proposition can be chosen to contain only Lipschitz functions.)

---

**Exercise 10.10** Let $(X_n)_{n\in\mathbb{N}}$ be a sequence of independent and identically distributed random variables. For every $n\in\mathbb{N}$, set $M_n=\max\{X_1,\ldots,X_n\}$.

1. Suppose that $X_n$ is uniformly distributed over $[0,1]$. Prove that $n(1-M_n)$ converges in distribution and identify the limit.

2. Suppose that $X_n$ is distributed according to the Cauchy distribution of parameter $1$. Show that $n/M_n$ converges in distribution and identify the limit.

---

**Exercise 10.11**

1. Let $(X_n)_{n\in\mathbb{N}}$ be a sequence of independent and identically distributed real random variables in $L^2$, such that $\mathbb{E}[X_n]=1$ and $\operatorname{var}(X_n)>0$. Set $S_n=X_1+\cdots+X_n$. Show that the limit

    $$
    \lim_{n\to\infty}\mathbb{P}(S_n\le n)
    $$

    exists and compute it.

2. Compute

    $$
    \lim_{n\to\infty}e^{-n}\sum_{k=0}^n\frac{n^k}{k!}.
    $$

---

**Exercise 10.12 (Glivenko-Cantelli Theorem)** Let $(X_n)_{n\in\mathbb{N}}$ be a sequence of independent and identically distributed real random variables with distribution function $F$. For every integer $n\in\mathbb{N}$ and every $x\in\mathbb{R}$, define the random variable

$$
F_n(x)=\frac1n\operatorname{card}\{j\in\{1,\ldots,n\}:X_j\le x\},
$$

which is the distribution function of the empirical measure associated with $X_1,\ldots,X_n$. Prove that a.s.,

$$
\lim_{n\to\infty}\sup_{x\in\mathbb{R}}|F_n(x)-F(x)|=0.
$$

Compare with Theorem 10.14. (*Hint:* It may be useful to assume that the random variables $X_n$ are represented as in Lemma 8.7.)

---

**Exercise 10.13** Let $(X_n)_{n\in\mathbb{N}}$ be a sequence of independent and identically distributed random variables in $L^2$, such that $\mathbb{E}[X_n]=0$ and $\operatorname{var}(X_n)>0$. Set $S_n=X_1+\cdots+X_n$.

1. Prove that

    $$
    \limsup_{n\to\infty}\frac{S_n}{\sqrt n}=\infty,\qquad \text{a.s.}
    $$

2. Prove that the sequence $S_n/\sqrt n$ does not converge in probability.

3. Prove that the limit

    $$
    \lim_{n\to\infty}\mathbb{P}(S_n>0,S_{2n}<0)
    $$

    exists and compute this limit.
