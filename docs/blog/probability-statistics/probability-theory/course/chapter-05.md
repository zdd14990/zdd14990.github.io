---
title: Conditional Expectation
date: 2026-07-23
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


**Theorem** Let $X\in L^1(\Omega,\mathcal{F},\mathbb{P})$ and let $\mathcal{A}\subset\mathcal{F}$ be a sub-$\sigma$-field. Then there exists a **unique** random variable $Y$ such that:

1. $Y$ is $\mathcal{A}$-measurable.

2. for any $A\in\mathcal{A}$, we have $\mathbb{E}[Y\mathbf{1}_A]=\mathbb{E}[X\mathbf{1}_A]$.

A random variable $Y$ satisfying the above two properties is called a **conditional expectation** of $X$ given $\mathcal{A}$, and is denoted by $\mathbb{E}[X\mid\mathcal{A}]$.

---

## Basic Properties

For integrable random variables $X,Y$ and constants $a,b$,

* If $\mathcal{A}=\{\emptyset,\Omega\}$, then $\mathbb{E}[X\mid\mathcal{A}]=\mathbb{E}[X]$ a.s.

* If $X$ is $\mathcal{A}$-measurable, then $\mathbb{E}[X\mid\mathcal{A}]=X$ a.s.

* $\mathbb{E}[aX+bY\mid\mathcal{A}]=a\mathbb{E}[X\mid\mathcal{A}]+b\mathbb{E}[Y\mid\mathcal{A}].$

* If $X\ge 0$ a.s., then $\mathbb{E}[X\mid\mathcal{A}]\ge 0$ a.s.

* If $X\le Y$ a.s., then $\mathbb{E}[X\mid\mathcal{A}]\le \mathbb{E}[Y\mid\mathcal{A}]$ a.s.

* If $Z=\mathbb{E}[X\mid\mathcal{A}]$, then $\mathbb{E}[Z]=\mathbb{E}[X]$ and $|Z|\le \mathbb{E}[|X|\mid\mathcal{A}]$ a.s. and $\mathbb{E}[|Z|]\le \mathbb{E}[|X|]$.

* $\mathbb{E}[X\mid \mathcal{A}]\le \mathbb{E}[Y\mid \mathcal{A}]$ a.s. iff $\mathbb{E}[X\mathbf{1}_A]\le \mathbb{E}[Y\mathbf{1}_A]$ for all $A\in\mathcal{A}$.


---

Suppose $X$ and $\left\{X_n\right\}$ are r.v. in $L^1(\Omega,\mathcal{F},\mathbb{P})$ and $\mathcal{A}\subset\mathcal{F}$ is a sub-$\sigma$-field. Then we have:

* (Monotone Converge Theorem) If $0\le X_n\uparrow X$ a.s., then $\mathbb{E}[X_n\mid\mathcal{A}]\uparrow \mathbb{E}[X\mid\mathcal{A}]$ a.s.

* (Fatou's lemma) If $X_n\ge 0$ a.s., then $\mathbb{E}[\liminf_{n}X_n\mid\mathcal{A}]\le \liminf_{n}\mathbb{E}[X_n\mid\mathcal{A}]$ a.s.

* (DCT) If $X_n\to X$ a.s. and $|X_n|\le Z$ a.s. for some $Z\in L^1$, then $\mathbb{E}[X_n\mid\mathcal{A}]\to \mathbb{E}[X\mid\mathcal{A}]$ a.s.

* (Jensen) If $\varphi$ is convex and $\varphi(X)\in L^1$, then $\varphi(\mathbb{E}[X\mid\mathcal{A}])\le \mathbb{E}[\varphi(X)\mid\mathcal{A}]$

* (Holder) Let $p,q>1$ with $1/p+1/q=1$. If $X\in L^p$ and $Y\in L^q$, then $\mathbb{E}[|XY|\mid\mathcal{A}]\le \mathbb{E}[|X|^p\mid\mathcal{A}]^{1/p}\mathbb{E}[|Y|^q\mid\mathcal{A}]^{1/q}$ a.s.

* (Tower property) Suppose that $\mathcal{B}$ is a sub-$\sigma$-field of $\mathcal{A}$. Then $\mathbb{E}[\mathbb{E}[X\mid\mathcal{A}]\mid\mathcal{B}]=\mathbb{E}[X\mid\mathcal{B}]$ a.s.

* ("Thinking out what is known") If $Z$ is $\mathcal{A}$-measurable, then $\mathbb{E}[XZ\mid\mathcal{A}]=Z\mathbb{E}[X\mid\mathcal{A}]$ a.s.

* (Independence) If $\mathcal{B}$ is independent of $\sigma(X,\mathcal{A})$, then $\mathbb{E}[X\mid\sigma(\mathcal{A},\mathcal{B})]=\mathbb{E}[X\mid\mathcal{A}]$ a.s. In particular, if $X$ is independent of $\mathcal{B}$, then $\mathbb{E}[X\mid\mathcal{B}]=\mathbb{E}[X]$ a.s.

---

## Conditioning probability

Suppose $A,B$ are events with $\mathbb{P}(B)>0$ and  $\mathcal{G}$ is a sub-$\sigma$-field of $\mathcal{F}$. Then we define conditional probability as

$$
\mathbb{P}[A\mid \mathcal{G}]=\mathbb{E}[\mathbf{1}_A\mid \mathcal{G}],\quad \mathbb{P}[A\mid B]=\frac{\mathbb{P}[A\cap B]}{\mathbb{P}[B]}.
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
