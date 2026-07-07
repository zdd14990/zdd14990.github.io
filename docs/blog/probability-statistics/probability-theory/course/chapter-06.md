---
title: Markov Chains
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

# Markov Chains


---

## Markov Property

Let $E$ be a countable state space. A sequence $(X_n)_{n\ge 0}$ is a **Markov chain** if

$$
\mathbb{P}(X_{n+1}=y\mid X_0,\ldots,X_n)
=
\mathbb{P}(X_{n+1}=y\mid X_n)
$$

for all states $y\in E$.

The transition probabilities are

$$
Q(x,y)=\mathbb{P}(X_{n+1}=y\mid X_n=x).
$$

The matrix $Q=(Q(x,y))_{x,y\in E}$ satisfies

$$
Q(x,y)\ge 0,
\qquad
\sum_{y\in E}Q(x,y)=1.
$$

---

## Finite-Dimensional Distributions

If $X_0$ has law $\mu$, then

$$
\mathbb{P}(X_0=x_0,\ldots,X_n=x_n)
=
\mu(x_0)Q(x_0,x_1)\cdots Q(x_{n-1},x_n).
$$

The $n$-step transition matrix is

$$
Q^n(x,y)=\mathbb{P}_x(X_n=y).
$$

It satisfies the Chapman-Kolmogorov identity

$$
Q^{m+n}(x,y)=\sum_{z\in E}Q^m(x,z)Q^n(z,y).
$$

---

## Stopping Times and Strong Markov Property

A random time $T$ is a stopping time if

$$
\{T\le n\}\in\sigma(X_0,\ldots,X_n)
$$

for every $n$.

The **strong Markov property** says that, conditionally on $\{T<\infty\}$ and $X_T=x$, the shifted process

$$
(X_{T+n})_{n\ge 0}
$$

is a Markov chain started from $x$ with the same transition matrix.

---

## Recurrence and Transience

For $x\in E$, define the return time

$$
T_x^+=\inf\{n\ge 1:X_n=x\}.
$$

The state $x$ is **recurrent** if

$$
\mathbb{P}_x(T_x^+<\infty)=1,
$$

and **transient** otherwise.

The Green function is

$$
G(x,y)=\sum_{n=0}^{\infty}Q^n(x,y),
$$

the expected number of visits to $y$ when the chain starts from $x$.

---

## Irreducibility

We write $x\to y$ if $Q^n(x,y)>0$ for some $n\ge 0$.

The chain is **irreducible** if every state communicates with every other state:

$$
x\to y
\qquad\text{and}\qquad
y\to x
$$

for all $x,y\in E$.

In an irreducible chain, recurrence and transience are class properties.

---

## Invariant Measures

A measure $\pi$ on $E$ is invariant if

$$
\pi Q=\pi,
$$

or equivalently

$$
\pi(y)=\sum_{x\in E}\pi(x)Q(x,y).
$$

If $\pi$ is a probability measure, it is called a **stationary distribution**.

When $X_0\sim\pi$, all $X_n$ have law $\pi$.

---

## Reversibility

A probability measure $\pi$ is reversible for $Q$ if

$$
\pi(x)Q(x,y)=\pi(y)Q(y,x)
$$

for all $x,y\in E$.

The detailed balance condition implies invariance.

---

## Convergence to Equilibrium

For finite irreducible aperiodic Markov chains, there is a unique stationary distribution $\pi$, and

$$
Q^n(x,y)\longrightarrow \pi(y)
$$

as $n\to\infty$.

This is the basic ergodic theorem for finite Markov chains.
