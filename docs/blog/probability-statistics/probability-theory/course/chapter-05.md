---
title: Conditional Expectation
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

# Conditional Expectation


---

## Definition

Let $X\in L^1(\Omega,\mathcal{A},\mathbb{P})$ and let $\mathcal{G}\subset\mathcal{A}$ be a sub-$\sigma$-field.

The **conditional expectation** of $X$ given $\mathcal{G}$ is the random variable $\mathbb{E}[X\mid\mathcal{G}]$ such that:

1. $\mathbb{E}[X\mid\mathcal{G}]$ is $\mathcal{G}$-measurable.

2. For every $G\in\mathcal{G}$,

    $$
    \int_G \mathbb{E}[X\mid\mathcal{G}]\,d\mathbb{P}
    =
    \int_G X\,d\mathbb{P}.
    $$

It is unique up to almost sure equality.

---

## Basic Properties

For integrable random variables $X,Y$ and constants $a,b$,

$$
\mathbb{E}[aX+bY\mid\mathcal{G}]
=a\mathbb{E}[X\mid\mathcal{G}]
+b\mathbb{E}[Y\mid\mathcal{G}].
$$

If $X\ge 0$, then

$$
\mathbb{E}[X\mid\mathcal{G}]\ge 0.
$$

If $Y$ is bounded and $\mathcal{G}$-measurable, then

$$
\mathbb{E}[YX\mid\mathcal{G}]
=Y\mathbb{E}[X\mid\mathcal{G}].
$$

---

## Tower Property

If $\mathcal{H}\subset\mathcal{G}\subset\mathcal{A}$, then

$$
\mathbb{E}\left[\mathbb{E}[X\mid\mathcal{G}]\mid\mathcal{H}\right]
=
\mathbb{E}[X\mid\mathcal{H}].
$$

In particular,

$$
\mathbb{E}\left[\mathbb{E}[X\mid\mathcal{G}]\right]
=
\mathbb{E}[X].
$$

---

## Conditioning by a Random Variable

For a random variable $Y$, write

$$
\mathbb{E}[X\mid Y]
=
\mathbb{E}[X\mid\sigma(Y)].
$$

This is the best approximation of $X$ by a measurable function of $Y$ in the $L^2$ sense when $X\in L^2$.

If $X$ is independent of $\mathcal{G}$, then

$$
\mathbb{E}[X\mid\mathcal{G}]=\mathbb{E}[X].
$$

---

## Jensen Inequality

If $\varphi$ is convex and $\varphi(X)\in L^1$, then

$$
\varphi\left(\mathbb{E}[X\mid\mathcal{G}]\right)
\le
\mathbb{E}[\varphi(X)\mid\mathcal{G}]
$$

almost surely.

As a consequence, for $p\ge 1$,

$$
\left|\mathbb{E}[X\mid\mathcal{G}]\right|^p
\le
\mathbb{E}[|X|^p\mid\mathcal{G}].
$$

---

## Conditional Probability

For an event $A\in\mathcal{A}$, define

$$
\mathbb{P}(A\mid\mathcal{G})
=
\mathbb{E}[\mathbf{1}_A\mid\mathcal{G}].
$$

This is a $\mathcal{G}$-measurable random variable. It satisfies the same integration identity:

$$
\int_G \mathbb{P}(A\mid\mathcal{G})\,d\mathbb{P}
=
\mathbb{P}(A\cap G),
\qquad G\in\mathcal{G}.
$$

---

## Regular Conditional Distribution

For random variables $X$ and $Y$, a regular conditional distribution of $X$ given $Y$ is a transition kernel

$$
K(y,B)
$$

such that

$$
K(Y,B)=\mathbb{P}(X\in B\mid Y)
$$

for every Borel set $B$. It lets us write conditional expectations as

$$
\mathbb{E}[f(X)\mid Y]
=
\int f(x)K(Y,dx).
$$
