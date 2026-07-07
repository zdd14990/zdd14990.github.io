---
title: GTM295 Chapter 14
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

# GTM295 Chapter 14

In Exercises 14.1 to 14.11, $(B_t)_{t\ge0}$ is a one-dimensional Brownian motion with $B_0=0$, and $S_t=\sup\{B_s:0\le s\le t\}$.

---

**Exercise 14.1** For every $a\ge0$, set $T_a=\inf\{t\ge0:B_t=a\}$.

1. Prove that, for every $0\le a<b$, the random variable $T_b-T_a$ is independent of $\sigma(T_c,0\le c\le a)$ and has the same distribution as $T_{b-a}$.

2. Prove that, for every $a_1,\ldots,a_n\in\mathbb{R}_+$ and $\lambda>0$, the vector $(T_{\lambda a_1},\ldots,T_{\lambda a_n})$ has the same law as $(\lambda^2T_{a_1},\ldots,\lambda^2T_{a_n})$.

3. Let $n\in\mathbb{N}$ and let $T^{(1)},T^{(2)},\ldots,T^{(n)}$ be $n$ independent random variables distributed as $T_1$. Verify that $T^{(1)}+\cdots+T^{(n)}$ has the same distribution as $n^2T_1$. Comment on the relation between this result and the strong law of large numbers.

---

**Exercise 14.2** Let $a>0$ and $T_a=\inf\{t\ge0:B_t=a\}$. Prove that we have almost surely

$$
T_a=\inf\{t\ge0:B_t>a\}.
$$

---

**Exercise 14.3** Prove that

$$
\left(\int_0^t e^{B_s}\,ds\right)^{1/\sqrt{t}}
\xrightarrow[t\to\infty]{(d)}
e^{|N|},
$$

where $N$ is a Gaussian $\mathcal{N}(0,1)$ random variable.

---

**Exercise 14.4**

1. Prove that a.s.,

    $$
    \limsup_{t\downarrow0}\frac{B_t}{\sqrt{t}}=+\infty,
    \qquad
    \liminf_{t\downarrow0}\frac{B_t}{\sqrt{t}}=-\infty.
    $$

2. Let $s>0$. Prove that a.s. the function $t\mapsto B_t$ is not differentiable at $s$.

---

**Exercise 14.5**

1. For every integer $n\ge1$, set

    $$
    \Sigma_n
    =
    \sum_{k=1}^{2^n}
    \left(B_{k2^{-n}}-B_{(k-1)2^{-n}}\right)^2.
    $$

    Compute $\mathbb{E}[\Sigma_n]$ and $\operatorname{var}(\Sigma_n)$, and prove that $\Sigma_n$ converges in $L^2$ and a.s. to a constant as $n\to\infty$.

2. Prove that a.s. the function $t\mapsto B_t(\omega)$ is not of bounded variation on the interval $[0,1]$ (see Exercise 6.1 for the definition of functions of bounded variation).

---

**Exercise 14.6**

1. For every $t\in[0,1]$, set $B'_t=B_{1-t}-B_1$. Prove that the two random processes $(B_t)_{t\in[0,1]}$ and $(B'_t)_{t\in[0,1]}$ have the same law (as in the definition of the Wiener measure, this law is a probability measure on the space $C([0,1],\mathbb{R})$).

2. Let $t>0$. Prove that $S_t-B_t$ and $S_t$ have the same law without using Corollary 14.17.

---

**Exercise 14.7** Let $\tau=\inf\{t\ge0:B_t=S_1\}$.

1. Prove that $0<\tau<1$ a.s. (one may use the preceding exercise) and then that $\tau$ is **not** a stopping time.

2. Using question (2) of the preceding exercise, verify (without making any calculation) that, for every $a\in(0,1)$,

    $$
    \mathbb{P}(\tau>a)
    =
    \mathbb{P}(\sqrt{1-a}|N|>\sqrt{a}|N'|)
    $$

    where $N$ and $N'$ are two independent Gaussian $\mathcal{N}(0,1)$ random variables.

3. Conclude that the law of $\tau$ is the arcsine distribution of Exercise 9.3.

---

**Exercise 14.8** Show the local maxima of $B$ are almost surely distinct. In other words, a.s. for any rationals $0\le a<b<c<d$, we have

$$
\sup_{a\le t\le b}B_t\ne\sup_{c\le t\le d}B_t.
$$

---

**Exercise 14.9** Let $H=\{t\in[0,1]:B_t=0\}$. Using Corollary 14.10 and the strong Markov property, prove that $H$ is a.s. a compact subset of $[0,1]$ with no isolated points and zero Lebesgue measure.

---

**Exercise 14.10**

1. For every $a>0$, set $\sigma_a=\inf\{t\ge0:|B_t|\ge a\}$. Show that there is a constant $\gamma\in(0,1)$ depending on $a$ such that, for every integer $N\ge1$,

    $$
    \mathbb{P}(\sigma_a>N)\le\gamma^N.
    $$

2. For every $n\ge1$, define a sequence $T_0^n,T_1^n,\ldots$ by induction by setting

    $$
    T_0^n=0,\qquad
    T_1^n=\sigma_{2^{-n}},\qquad
    T_{k+1}^n=\inf\{t>T_k^n:|B_t-B_{T_k^n}|=2^{-n}\}.
    $$

    Verify that the random times $T_k^n$ are almost surely finite and are stopping times. Prove that the random variables $T_k^n-T_{k-1}^n$, $k=1,2,\ldots$, are independent and identically distributed, and similarly the random variables $B_{T_k^n}-B_{T_{k-1}^n}$, $k=1,2,\ldots$, are independent and identically distributed.

3. We set $X_k^n=2^nB_{T_k^n}$ for every $k\in\mathbb{Z}_+$. Verify that $(X_k^n)_{k\in\mathbb{Z}_+}$ is a simple random walk on $\mathbb{Z}$.

4. Show that there exists a constant $c>0$ such that, for every $t\ge0$,

    $$
    \lim_{n\to\infty}T_{\lfloor 2^{2n}t\rfloor}^n=ct,
    \qquad \text{a.s.}
    $$

5. Infer that, for every $t>0$,

    $$
    \lim_{n\to\infty}
    \sup_{0\le s\le t}
    \left|
    \frac1{2^n}X_{\lfloor 2^{2n}s\rfloor}^n-B_{cs}
    \right|
    =0,
    \qquad \text{a.s.}
    $$

    and finally that $c=1$.

---

**Exercise 14.11** For $\alpha\in(0,1]$, a continuous function $f:[0,1]\to\mathbb{R}$ is said to be $\alpha$-Holder if there exists a constant $C$ such that $|f(s)-f(t)|\le C|s-t|^\alpha$ for every $s,t\in[0,1]$.

1. Prove that the function $[0,1]\ni t\mapsto B_t(\omega)$ is a.s. not $\frac12$-Holder.

2. Let $\delta\in(0,\frac12)$. Prove that a.s. there exists an integer $n_0(\omega)$ such that the bound

    $$
    |B_{k2^{-n}}-B_{(k-1)2^{-n}}|\le2^{-n\delta}
    $$

    holds for every $n\ge n_0(\omega)$ and every $k\in\{1,\ldots,2^n\}$.

3. Prove that the function $[0,1]\ni t\mapsto B_t(\omega)$ is a.s. $\delta$-Holder.

---

**Exercise 14.12** Let $d\ge3$ and let $B$ be a $d$-dimensional Brownian motion started from $0$. Fix $A>1$ and $\delta\in(0,1)$, and set

$$
\mathcal{R}_{\delta,A}=\{x\in\mathbb{R}^d:\delta\le|x|\le A\}.
$$

For every $n\ge1$ and every $k_1,\ldots,k_d\in\mathbb{Z}$, define the cube

$$
C_{k_1,\ldots,k_d}^{(n)}
=
[k_12^{-n},(k_1+1)2^{-n}]
\times[k_22^{-n},(k_2+1)2^{-n}]
\times\cdots\times
[k_d2^{-n},(k_d+1)2^{-n}].
$$

Set

$$
N_n
=
\operatorname{card}
\left\{
(k_1,\ldots,k_d)\in\mathbb{Z}^d:
C_{k_1,\ldots,k_d}^{(n)}\cap\mathcal{R}_{\delta,A}\cap\{B_t,t\ge0\}\ne\varnothing
\right\}.
$$

1. Prove that there is a constant $K$ depending on $\delta$ and $A$ such that, for every $n\ge1$,

    $$
    \mathbb{E}[N_n]\le K2^{2n}.
    $$

2. Recall from Exercise 3.4 the definition of the Hausdorff dimension $\dim(A)$ of a subset $A$ of $\mathbb{R}^d$. Prove that $\dim(\{B_t,t\ge0\})\le2$ a.s.

---

**Exercise 14.13** Let $D$ be a bounded domain in $\mathbb{R}^d$, $d\ge2$, and let $g$ be a continuous function on $\partial D$. Suppose that $h$ solves the Dirichlet problem with boundary condition $g$. Show that, for every $x\in D$,

$$
h(x)=\mathbb{E}_x[g(B_T)],
$$

with the notation of Theorem 14.23 (in particular $T=\inf\{t\ge0:B_t\notin D\}$).

---

**Exercise 14.14** Let $d\ge2$, and let $D=\{x\in\mathbb{R}^d:0<|x|<1\}$ be the punctured open unit ball. Define $g:\partial D\to\mathbb{R}$ by setting $g(x)=1$ if $|x|=1$ and $g(0)=0$. Prove that the Dirichlet problem in $D$ with boundary condition $g$ has no solution. (*Hint:* Use the result of the preceding exercise.)

---

**Exercise 14.15** Let $d\ge3$. Let $K$ be a compact subset of the closed unit ball, and $D=\mathbb{R}^d\setminus K$. We assume that $D$ is connected and satisfies the exterior cone condition. Let $g:\partial D\to\mathbb{R}$ be a continuous function. We consider a function $u$ that satisfies the Dirichlet problem in $D$ with boundary condition $g$, and assume that $u$ is bounded.

We use the canonical representation of Brownian motion in $\mathbb{R}^d$, and set $T_K=\inf\{t\ge0:B_t\in K\}\in[0,\infty]$.

1. Let $(R_n)_{n\in\mathbb{N}}$ be a sequence of real numbers in $(1,\infty)$ such that $R_n\uparrow\infty$ as $n\to\infty$. For every $n$, set $T_{(n)}=\inf\{t\ge0:|B_t|\ge R_n\}$. Prove that, for every $n\ge1$ and every $x\in D$ such that $|x|<R_n$,

    $$
    u(x)
    =
    \mathbb{E}_x[g(B_{T_K})\mathbf{1}_{\{T_K<T_{(n)}\}}]
    +
    \mathbb{E}_x[u(B_{T_{(n)}})\mathbf{1}_{\{T_{(n)}<T_K\}}].
    $$

2. Prove that, up to replacing the sequence $(R_n)_{n\in\mathbb{N}}$ by a subsequence, we can assume that there exists a constant $\alpha\in\mathbb{R}$ such that, for every $x\in\mathbb{R}$,

    $$
    \lim_{n\to\infty}\mathbb{E}_x[u(B_{T_{(n)}})]=\alpha.
    $$

3. Deduce from questions (1) and (2) that

    $$
    \lim_{|x|\to\infty}u(x)=\alpha
    $$

    and then prove that, for every $x\in D$,

    $$
    u(x)
    =
    \mathbb{E}_x[g(B_{T_K})\mathbf{1}_{\{T_K<\infty\}}]
    +
    \alpha\,\mathbb{P}_x(T_K=\infty).
    $$

4. Conversely, verify that, for any $\alpha\in\mathbb{R}$, the right-hand side of the last display gives a solution of the Dirichlet problem in $D$ with boundary condition $g$.
