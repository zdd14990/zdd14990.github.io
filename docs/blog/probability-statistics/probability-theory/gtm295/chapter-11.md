---
title: GTM295 Chapter 11
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

# GTM295 Chapter 11

---

**Exercise 11.1 (Bayes Formula)**

1. Let $(\Omega,\mathcal{A},\mathbb{P})$ be a probability space, and let $(A_1,A_2,\ldots,A_n)$ be a measurable partition of $\Omega$ such that $\mathbb{P}(A_i)>0$ for every $i\in\{1,\ldots,n\}$. Prove that, for every $B\in\mathcal{A}$ such that $\mathbb{P}(B)>0$, for every $i\in\{1,\ldots,n\}$,

    $$
    \mathbb{P}(A_i\mid B)
    =
    \frac{\mathbb{P}(A_i)\mathbb{P}(B\mid A_i)}
    {\sum_{j=1}^n\mathbb{P}(A_j)\mathbb{P}(B\mid A_j)}.
    $$

2. Suppose that we have $n$ boxes numbered $1,2,\ldots,n$, and that the $i$-th box contains $r_i$ red balls and $n_i$ black balls, where $r_i,n_i\ge1$. Imagine that one chooses a box uniformly at random, and then picks a ball (again at random) in the chosen box. Compute the probability that the $i$-th box was chosen knowing that a red ball was picked.

---

**Exercise 11.2** Let $X_1,\ldots,X_n$ be independent Bernoulli random variables with parameter $p\in(0,1)$, and $S_n=X_1+\cdots+X_n$. Prove that, for every $k\in\{0,1,\ldots,n\}$, the conditional distribution of $(X_1,\ldots,X_n)$ knowing that $S_n=k$ (that is, the law of $(X_1,\ldots,X_n)$ under $\mathbb{P}(\cdot\mid S_n=k)$) is the uniform distribution on

$$
\{(x_1,\ldots,x_n)\in\{0,1\}^n:x_1+\cdots+x_n=k\}.
$$

---

**Exercise 11.3** Let $(X_n)_{n\in\mathbb{N}}$ be a sequence of independent real random variables uniformly distributed over $[0,1]$. Define the *record times* of the sequence by $T_1=1$ and, for every $p\ge2$,

$$
T_p:=\inf\{n>T_{p-1}:X_n>X_{T_{p-1}}\}
$$

with the convention $\inf\varnothing=\infty$. Show that $\mathbb{P}(T_p<\infty)=1$ for every $p\in\mathbb{N}$. Then determine the law of $T_2$, and prove that, for every $p\ge2$ and $k\in\mathbb{N}$,

$$
\mathbb{E}\!\left[\mathbf{1}_{\{T_p=k\}}\mid(T_1,\ldots,T_{p-1})\right]
=
\mathbb{E}\!\left[\mathbf{1}_{\{T_p=k\}}\mid T_{p-1}\right]
=
\frac{T_{p-1}}{k(k-1)}\mathbf{1}_{\{k>T_{p-1}\}}.
$$

---

**Exercise 11.4** Let $\mathcal{B}$ be a sub-$\sigma$-field of $\mathcal{A}$, and let $X$ be a nonnegative real random variable. Prove that the set

$$
A=\{\mathbb{E}[X\mid\mathcal{B}]>0\}
$$

is the smallest $\mathcal{B}$-measurable set containing $\{X>0\}$, in the sense that:

- $\mathbb{P}(\{X>0\}\setminus A)=0$;
- if $B\in\mathcal{B}$ is such that $\{X>0\}\subset B$, then $\mathbb{P}(A\setminus B)=0$.

---

**Exercise 11.5** Let $X$ and $Y$ be two independent Gaussian $\mathcal{N}(0,1)$ random variables. Compute

$$
\mathbb{E}[X\mid X^2+Y^2].
$$

---

**Exercise 11.6** Let $X$ be a $d$-dimensional Gaussian vector. Prove that the law $\mathbb{P}_X$ of $X$ is absolutely continuous with respect to Lebesgue measure on $\mathbb{R}^d$ if and only if the covariance matrix $K_X$ is invertible, and in that case the density of $\mathbb{P}_X$ is

$$
p(x)=
\frac{1}{(2\pi)^{d/2}\sqrt{\det(K_X)}}
\exp\left(-\frac12\,{}^t(x-m)K_X^{-1}(x-m)\right),
\qquad x\in\mathbb{R}^d,
$$

where $m=\mathbb{E}[X]$ and $\det(K_X)$ is the determinant of $K_X$.

---

**Exercise 11.7** Let $(\mathcal{A}_n)_{n\in\mathbb{N}}$ be a sequence of sub-$\sigma$-fields of $\mathcal{A}$, and let $(X_n)_{n\in\mathbb{N}}$ be a sequence of nonnegative random variables.

1. Prove that the condition "$\mathbb{E}[X_n\mid\mathcal{A}_n]$ converges in probability to $0$" implies that $X_n$ converges in probability to $0$.

2. Show that the converse is false.

---

**Exercise 11.8** Let $(\mathcal{A}_n)_{n\in\mathbb{N}}$ be a decreasing sequence of sub-$\sigma$-fields of $\mathcal{A}$, with $\mathcal{A}_1=\mathcal{A}$, and let $X\in L^2(\Omega,\mathcal{A},\mathbb{P})$.

1. Prove that the random variables $\mathbb{E}[X\mid\mathcal{A}_n]-\mathbb{E}[X\mid\mathcal{A}_{n+1}]$, for $n\in\mathbb{N}$, are orthogonal in $L^2$, and that the series

    $$
    \sum_{n\in\mathbb{N}}\left(\mathbb{E}[X\mid\mathcal{A}_n]-\mathbb{E}[X\mid\mathcal{A}_{n+1}]\right)
    $$

    converges in $L^2$.

2. Let $\mathcal{A}_\infty=\bigcap_{n\in\mathbb{N}}\mathcal{A}_n$. Prove that

    $$
    \lim_{n\to\infty}\mathbb{E}[X\mid\mathcal{A}_n]
    =
    \mathbb{E}[X\mid\mathcal{A}_\infty],
    \qquad \text{in } L^2.
    $$

---

**Exercise 11.9** Let $X$ and $Y$ be two nonnegative random variables in $L^1$. We assume that we have both $\mathbb{E}[X\mid Y]=Y$ and $\mathbb{E}[Y\mid X]=X$.

1. Under the additional assumption that $X\in L^2$, prove that $X=Y$.

2. We come back to the general case. Prove that, for every $a>0$,

    $$
    \mathbb{E}[X\mid X\wedge a]\wedge a=X\wedge a.
    $$

3. Verify that, for every $a>0$, the pair $(X\wedge a,Y\wedge a)$ satisfies the same assumptions as the pair $(X,Y)$, and conclude that $X=Y$. (*Hint:* Start by verifying that $\mathbb{E}[X\wedge a\mid Y\wedge a]\le Y\wedge a$.)

---

**Exercise 11.10** Let $\mathcal{B}$ be a sub-$\sigma$-field of $\mathcal{A}$, and let $X$ and $Y$ be two random variables taking values in $(E,\mathcal{E})$ and $(F,\mathcal{F})$ respectively. We say that $X$ and $Y$ are conditionally independent given $\mathcal{B}$ if, for any nonnegative measurable functions $f$ and $g$ defined respectively on $E$ and on $F$, we have

$$
\mathbb{E}[f(X)g(Y)\mid\mathcal{B}]
=
\mathbb{E}[f(X)\mid\mathcal{B}]\,\mathbb{E}[g(Y)\mid\mathcal{B}].
$$

1. Discuss the special cases $\mathcal{B}=\{\varnothing,\Omega\}$ and $\mathcal{B}=\mathcal{A}$.

2. Prove that $X$ and $Y$ are conditionally independent given $\mathcal{B}$ if and only if, for any nonnegative $\mathcal{B}$-measurable random variable $Z$ and any functions $f$ and $g$ as above,

    $$
    \mathbb{E}[f(X)g(Y)Z]
    =
    \mathbb{E}\!\left[f(X)Z\mathbb{E}[g(Y)\mid\mathcal{B}]\right],
    $$

    and that this property is also equivalent to saying that, for any nonnegative measurable function $g$ on $F$,

    $$
    \mathbb{E}[g(Y)\mid\mathcal{B}\vee\sigma(X)]
    =
    \mathbb{E}[g(Y)\mid\mathcal{B}].
    $$

3. We now assume that $E=F=\mathbb{R}$, and that $\mathcal{B}=\sigma(Z)$, where $Z$ is a real random variable. Furthermore, we assume that the random vector $(X,Y,Z)$ has a density which is positive on $\mathbb{R}^3$. Prove that $X$ and $Y$ are conditionally independent given $\mathcal{B}$ if and only if the density of $(X,Y,Z)$ can be written in the form

    $$
    p(x,y,z)=q(z)r(z,x)s(z,y)
    $$

    where $q$ is the density of $Z$ and $r,s$ are positive measurable functions on $\mathbb{R}^2$.

---

**Exercise 11.11** Let $a,b\in(0,\infty)$, and let $(X,Y)$ be a random variable with values in $\mathbb{Z}_+\times\mathbb{R}_+$, whose distribution is characterized by the formula

$$
\mathbb{P}(X=n,Y\le t)
=
b\int_0^t\frac{(ay)^n}{n!}\exp(-(a+b)y)\,dy,
$$

for every $n\in\mathbb{Z}_+$ and $t\in\mathbb{R}_+$.

1. Compute $\mathbb{P}(X=n)$ for every $n\in\mathbb{Z}_+$, and then determine the conditional distribution of $Y$ knowing $X$. Compute $\mathbb{E}\!\left[\frac{1}{X+1}\right]$.

2. Compute the law of $Y$ and then $\mathbb{E}[\mathbf{1}_{\{X=n\}}\mid Y]$. Give the conditional distribution of $X$ knowing $Y$ and compute $\mathbb{E}[X\mid Y]$.

---

**Exercise 11.12** Let $\lambda>0$, and let $X$ be a Gamma $\Gamma(2,\lambda)$ random variable (with density $\lambda^2xe^{-\lambda x}$ on $\mathbb{R}_+$). Let $Y$ be another real random variable, and assume that the conditional distribution of $Y$ knowing $X$ is the uniform distribution over $[0,X]$. Prove that $Y$ and $X-Y$ are two independent exponential variables with parameter $\lambda$.

---

**Exercise 11.13** Let $(E,\mathcal{E})$ and $(F,\mathcal{F})$ be two measurable spaces, and let $X$ and $Y$ be two random variables taking values in $(E,\mathcal{E})$ and $(F,\mathcal{F})$ respectively. Assume that the conditional distribution of $Y$ knowing $X$ is the transition kernel $\nu(x,dy)$. Prove that, for any nonnegative measurable function $h$ on $(E\times F,\mathcal{E}\otimes\mathcal{F})$,

$$
\mathbb{E}[h(X,Y)\mid X]
=
\int_F\nu(X,dy)\,h(X,y).
$$

(*Hint:* Consider first the case where $h=\mathbf{1}_{A\times B}$, with $A\in\mathcal{E}$ and $B\in\mathcal{F}$, and then use a monotone class argument.)
