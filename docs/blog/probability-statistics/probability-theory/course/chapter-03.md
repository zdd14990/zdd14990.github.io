---
title: Law of Large Numbers
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

# Law of Large Numbers


---

## Weak Law of Large Numbers

Let $(X_n)_{n\ge 1}$ be i.i.d. random variables with finite mean $m$, and set

$$
S_n = \sum_{j=1}^n X_j.
$$

The **weak law of large numbers** says that

$$
\frac{S_n}{n} \longrightarrow m
\quad\text{in probability.}
$$

Equivalently, for every $\varepsilon>0$,

$$
\mathbb{P}\left(\left|\frac{S_n}{n}-m\right|>\varepsilon\right)\longrightarrow 0.
$$

---

Two sequences of random variables $(X_n)$ and $(Y_n)$ are called **equivalent** if

$$
\sum_{n=1}^{\infty}\mathbb{P}(X_n\ne Y_n)<\infty.
$$

By the Borel-Cantelli lemma, equivalent sequences differ only finitely many times almost surely.

**Lemma.** If $(X_n)$ and $(Y_n)$ are equivalent, then

$$
\frac1n\sum_{j=1}^n (X_j-Y_j)\to 0
\quad\text{almost surely.}
$$

$$
\frac{1}{n}\sum_{j=1}^n X_j\to X,\text{ in probability} \Longrightarrow \frac{1}{n}\sum_{j=1}^n Y_j\to X,\text{ in probability}.
$$


Thus equivalent truncations may be used to prove limit theorems.

---

## Strong Law of Large Numbers

Let $(X_n)_{n\ge 1}$ be i.i.d. and set $S_n=X_1+\cdots+X_n$. Then we have:

$$
\mathbb{E}|X_1|<\infty\Longrightarrow
\frac{S_n}{n}\to \mathbb{E}[X_1]
\quad\text{almost surely.}
$$

$$
\mathbb{E}|X_1|=\infty\Longrightarrow \limsup_{n\to\infty}\frac{|S_n|}{n}=\infty
\quad\text{almost surely.}
$$

---

## Truncation Method

For $A>0$, define

$$
Y_n = X_n\mathbf{1}_{\{|X_n|\le A\}}.
$$

Truncation separates the proof into two parts:

1. Control the large jumps:

    $$
    \sum_n \mathbb{P}(|X_n|>A_n)<\infty.
    $$

2. Prove convergence for bounded variables, usually by variance estimates or Kolmogorov inequalities.

This is the standard route from bounded laws to integrable laws.

---

## Three-Series Theorem

Let $(X_n)$ be independent real random variables and fix $A>0$. Put

$$
Y_n = X_n\mathbf{1}_{\{|X_n|\le A\}}.
$$

Then $\sum_n X_n$ converges almost surely if and only if the following three series converge:

$$
\sum_n \mathbb{P}(|X_n|>A),
$$

$$
\sum_n \mathbb{E}[Y_n],
$$

$$
\sum_n \operatorname{Var}(Y_n).
$$

The value of $A$ is not essential; changing $A$ gives an equivalent criterion.

---

## Maximal Growth

For i.i.d. nonnegative random variables, the behavior of

$$
\max_{1\le j\le n}X_j
$$

is controlled by the tail of $X_1$. In many applications, the largest summand explains why a law of large numbers fails when $\mathbb{E}|X_1|=\infty$.
