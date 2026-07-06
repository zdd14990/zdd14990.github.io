---
title: 概率论part2
date: 2026-07-05
hide:
  - navigation
categories:
  - 概统
  - 概率论
tags:
  - probability-statistics
  - probability-theory
---
# 概率论part2

---

**参考书：吴昊老师的讲义**

---

## Convergences

The convergence of a sequence $\{X_n\}$:

* **almost sure convergence**,

* **convergence in probability**,

* **convergence in $L^p$** with $p\in [1,\infty)$,

* **convergence in distribution** (also called convergence in law, weak convergence).

---

**Definition** The sequence of random variables $\{X_n\}$ **converges a.s.** to the random variable $X$ if there exists a null set $\mathcal{N}$ such that

$$
\lim_{n\to\infty}X_n(\omega)=X(\omega),\quad \forall \omega\in \Omega\setminus \mathcal{N}.
$$

**Lemma** The sequence $\{X_n\}$ converges a.s. to $X$ if and only if, for any $\varepsilon>0$,

$$
\lim_{m\to\infty}\mathbb{P}\left[|X_n-X|\le \varepsilon,\ \forall n\ge m\right]=1.
$$

---

**Definition** The sequence $\{X_n\}$ converges in probability to the random variable $X$ if, for every $\varepsilon>0$,

$$
\lim_{n\to\infty}\mathbb{P}\left[|X_n-X|>\varepsilon\right]=0.
$$

Almost sure convergence implies convergence in probability. But the converse is false.

---

**Definition** Assume $p\ge 1$. The sequence $\{X_n\}$ converges in $L^p$ to the random variable $X$ if $X_n\in L^p$, $X\in L^p$ and

$$
\lim_{n\to\infty}\mathbb{E}\left[|X_n-X|^p\right]=0.
$$

**Lemma** Assume $p>0$. If $X_n\to X$ in $L^p$, then $X_n\to X$ in probability.

---

**Lemma (L2 weak law)** Let $X_1,X_2,\ldots$ be independent random variables with $\mathbb{E}[X_i]=m$ and $\operatorname{var}(X_i)\le C<\infty$. Set

$$
S_n=\sum_{j=1}^n X_j.
$$

Then

$$
\frac{S_n}{n}\to m,\quad \text{in }L^2.
$$

---

Let $f$ be a continuous function on $[0,1]$. Define the polynomial

$$
f_n(x)=\sum_{j=0}^n {n\choose j}x^j(1-x)^{n-j}f(j/n).
$$

This is called the **Bernstein polynomial of degree $n$ associated to $f$**. Then

$$
\sup_{x\in[0,1]}|f_n(x)-f(x)|\to 0,\quad n\to\infty.
$$

---

**Example (Coupon collecting)** Let $X_1,X_2,\ldots$ be i.i.d. uniform on $\{1,2,\ldots,N\}$. Let $T_N$ be the first time $n$ that

$$
\#\{X_1,\ldots,X_n\}=N.
$$

Then

$$
\frac{T_N}{N\log N}\to 1,\quad \text{in }L^2.
$$

---

**Definition** Let $\{E_n\}$ be a sequence of subsets in $\mathcal{F}$. Define

$$
\limsup_{n\to\infty}E_n=\bigcap_{m=1}^{\infty}\bigcup_{n\ge m}E_n,\quad
\liminf_{n\to\infty}E_n=\bigcup_{m=1}^{\infty}\bigcap_{n\ge m}E_n.
$$

**Lemma** A point belongs to $\limsup_n E_n$ if and only if it belongs to infinitely many terms of the sequence $\{E_n,n\ge 1\}$.

In more intuitive language: the event $\limsup_n E_n$ occurs if and only if the events $E_n$ occur infinitely many often, and we write

$$
\{\limsup_{n\to\infty}E_n\}=\{E_n,\ i.o.\}.
$$

---

**Theorem (Borel Cantelli lemma)**

For arbitrary sequence $\{E_n\}$, we have

$$
\sum_n \mathbb{P}[E_n]<\infty \Longrightarrow \mathbb{P}[E_n\ i.o.]=0.
$$

If the events $\{E_n\}$ are independent, we have

$$
\sum_n \mathbb{P}[E_n]=\infty \Longrightarrow \mathbb{P}[E_n\ i.o.]=1.
$$

**Corollary** Convergence in probability implies almost sure convergence along subsequence.

---

**Example** Suppose $X_1,X_2,\ldots$ are i.i.d. with $\mathbb{E}[X_j]=m$ and $\mathbb{E}[X_j^4]<\infty$. Set

$$
S_n=\sum_{j=1}^n X_j.
$$

Then

$$
\frac{S_n}{n}\to m,\quad a.s.
$$

---

**Theorem** The implication

$$
\sum_n \mathbb{P}[E_n]=\infty \Longrightarrow \mathbb{P}[E_n\ i.o.]=1
$$

remains true if the events $\{E_n\}$ are pairwise independent.

---

**Definition** A sequence of measures $\{\mu_n\}$ **converges weakly to a measure $\mu$** if

$$
\mu_n((a,b])\to \mu((a,b]),
$$

for all continuity points $a,b$ of $\mu$. We denote by

$$
\mu_n\Rightarrow \mu.
$$

---

### Helly's extraction principle

A measure $\mu$ on $(\mathbb{R},\mathcal{B})$ is a **subprobability measure** if

$$
\mu(\mathbb{R})\le 1.
$$

**Proposition** Given any sequence of subprobability measures, there is a subsequence that converges weakly to a subprobability measure.

**Proposition** Suppose $\{\mu_n\}$ is a sequence of subprobability measures. If every weakly convergent subsequence converges to the same limit $\mu$, then

$$
\mu_n\Rightarrow \mu.
$$

---

**Definition** A family of probability measures $\{\mu_{\alpha},\alpha\in A\}$ is **tight** if, for any $\varepsilon>0$, there exists a finite interval $I$ such that

$$
\inf_{\alpha\in A}\mu_{\alpha}(I)\ge 1-\varepsilon.
$$

**Theorem** Let $\{\mu_{\alpha},\alpha\in A\}$ be a family of probability measures. In order that any sequence contains a subsequence which converges weakly to a probability measure, it is necessary and sufficient that the family is tight.

This statement can also be phrased as follows: a family of probability measures is relatively compact if and only if it is tight.

---

## Criterion for weak convergence

Let

$$
C_c=\{\text{continuous functions which vanish outside a compact set}\},
$$

$$
C_0=\{\text{continuous functions }f\text{ such that }f(x)\to 0\text{ as }|x|\to\infty\},
$$

$$
C_b=\{\text{bounded continuous functions}\},
$$

$$
C=\{\text{continuous functions}\}.
$$

We have

$$
C_c\subset C_0\subset C_b\subset C.
$$

It is well known that $C_0$ is the closure of $C_c$ with respect to uniform convergence.

**Proposition** Suppose $\{\mu_n\}$ and $\mu$ are probability measures. Then $\mu_n\Rightarrow \mu$ if and only if

$$
\lim_{n\to\infty}\int f(x)\mu_n[dx]=\int f(x)\mu[dx],\quad \forall f\in C_b.
$$

---

A function $f$ on $\mathbb{R}$ is lower semicontinuous if

$$
f(x)\le \liminf_{y\to x,\ y\ne x}f(y),\quad \forall x.
$$

$f$ is bounded and lower semicontinuous if and only if there exists a sequence $f_n\in C_b$ which increases to $f$ everywhere.

**Corollary** Suppose $\{\mu_n\}$ and $\mu$ are probability measures. Then the following statements are equivalent:

1. $\mu_n\Rightarrow \mu$.

2. $\lim_{n\to\infty}\int f\,d\mu_n=\int f\,d\mu,\quad \forall f\in C_b$.

3. $\liminf_{n\to\infty}\int f\,d\mu_n\ge \int f\,d\mu,\quad \forall$ bounded lower semicontinuous $f$.

4. $\limsup_{n\to\infty}\int f\,d\mu_n\le \int f\,d\mu,\quad \forall$ bounded upper semicontinuous $f$.

**Corollary** Suppose $\{\mu_n\}$ and $\mu$ are probability measures. Then the following statements are equivalent:

1. $\mu_n\Rightarrow \mu$.

2. $\liminf_{n\to\infty}\mu_n(O)\ge \mu(O)$, for any open set $O$.

3. $\limsup_{n\to\infty}\mu_n(K)\le \mu(K)$, for any closed set $K$.

Combining the criteria above, we can also use the equivalent condition

$$
\lim_{n\to\infty}\int f\,d\mu_n=\int f\,d\mu,\quad \forall f\in C_c.
$$

---

## Convergence in distribution

**Definition** A sequence of random variables $\{X_n\}$ converges in distribution to a random variable $X$ if

$$
\mathcal{L}(X_n)\Rightarrow \mathcal{L}(X).
$$

We denote by

$$
X_n\xRightarrow{d}X,
$$

or $X_n\to X$ in distribution.

**Lemma** Convergence in probability implies convergence in distribution.

---

**Proposition** If

$$
X_n\to X,\quad \alpha_n\to a,\quad \beta_n\to b
$$

in distribution where $a,b$ are constants, then

$$
\alpha_nX_n+\beta_n\to aX+b
$$

in distribution.

**Lemma** Suppose $X_n$ converges to a constant $c$ in distribution. Then $X_n\to c$ in probability.

**Lemma** Suppose $X_n\to X$ in distribution, and $Y_n\to 0$ in distribution, then

1. $X_n+Y_n\to X$ in distribution.

2. $X_nY_n\to 0$ in distribution.

---

**Theorem** Suppose $X_n\to X$ in distribution. Then there exists a probability space and random variables in the space $\{Y_n\}$ and $Y$ such that

$$
Y_n\to Y\quad a.s.,\quad \mathcal{L}(Y_n)=\mathcal{L}(X_n),\quad \mathcal{L}(Y)=\mathcal{L}(X).
$$

This is the coupling viewpoint: convergence in distribution can be realized as almost sure convergence on another probability space.

---

## Uniform Integrable

**Definition** A collection $(X_i,i\in I)$ of random variables is Uniform Integrable (UI) if

$$
\sup_i\mathbb{E}\left[|X_i|\mathbf{1}_{\{|X_i|\ge \alpha\}}\right]\to 0,\quad \alpha\to\infty.
$$

**Lemma** If the family contains finitely many random variables in $L^1$, then it is UI.

**Lemma**

1. A UI family is bounded in $L^1$.

2. If a family of random variables is bounded in $L^p$ for $p>1$, then it is UI.

---

## Convergence in $L^1$ vs. almost sure convergence

**Proposition** Suppose that $X_n,X\in L^1$ and $X_n\to X$ a.s. Then

$$
X_n\to X\text{ in }L^1\quad \text{if and only if}\quad \{X_n,n\ge 1\}\text{ is UI}.
$$

**Corollary** Suppose that $\{X_n,n\ge 1\}$ is UI, and that $X_n\to X$ in distribution. Then

$$
\mathbb{E}[X_n]\to \mathbb{E}[X].
$$

---

## Summary

The basic implication chain is

$$
\text{almost sure convergence}
\Longrightarrow
\text{convergence in probability}
\Longrightarrow
\text{convergence in distribution}.
$$

Also,

$$
\text{convergence in }L^1
\Longrightarrow
\text{convergence in probability}.
$$

Together with UI, almost sure convergence is equivalent to convergence in $L^1$:

$$
X_n\to X\ a.s.\quad\text{and}\quad \{X_n,n\ge 1\}\text{ is UI}
\Longleftrightarrow
X_n\to X\text{ in }L^1.
$$

By the coupling theorem, convergence in distribution can be represented as almost sure convergence after moving to a suitable probability space.

---

## Exercises of Chapter 1

**Exercise 1.4.2** Suppose $\{X_1,\ldots,X_n,X_{n+1},\ldots,X_{n+m}\}$ are independent random variables. Then

$$
(X_1,\ldots,X_n)\quad \text{and}\quad (X_{n+1},\ldots,X_{n+m})
$$

are independent.

Question: What is $\mathcal{B}(\mathbb{R}^n)$?

---

**Exercise 1.7.5** Suppose that $Z$ is a random variable such that $Z$ is independent of itself. Show that $Z$ is almost surely a constant.

Hint: Cauchy inequality?
