---
title: GTM295 Chapter 13
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

# GTM295 Chapter 13

---

**Exercise 13.1** Let $E$ and $F$ be two countable sets and let $f:E\to F$ be a surjective map. Let $(X_n)_{n\in\mathbb{Z}_+}$ be a Markov chain on $E$ with transition matrix $Q$. Assume that, for every $a\in F$, and every $x,x'\in E$, the equality

$$
\sum_{y\in f^{-1}(a)}Q(x,y)
=
\sum_{y\in f^{-1}(a)}Q(x',y)
$$

holds whenever $f(x)=f(x')$. Show that $(f(X_n))_{n\in\mathbb{Z}_+}$ is a Markov chain on $F$ and give its transition matrix.

---

**Exercise 13.2 (Random Walk on the Binary Tree)** Consider the countable set

$$
E=\bigcup_{k=0}^\infty\{1,2\}^k,
$$

where we make the convention that $\{1,2\}^0=\{\dagger\}$ consists of a single element $\dagger$. An element of $E$ other than $\dagger$ is thus a $k$-tuple $(i_1,\ldots,i_k)$, where $i_1,\ldots,i_k\in\{1,2\}$, and we define $\pi((i_1,\ldots,i_k))=(i_1,\ldots,i_{k-1})$ $(=\dagger$ when $k=1)$. We view $E$ as a graph whose edge set is $A=\{\{x,\pi(x)\}:x\in E\setminus\{\dagger\}\}$. Prove that simple random walk on this graph is transient. (*Hint:* Use the preceding exercise.)

---

**Exercise 13.3** Let $(X_n)_{n\in\mathbb{Z}_+}$ be a simple random walk on $\mathbb{Z}$, with $X_0=0$. For every $k\in\mathbb{Z}_+$, set $T_k=\inf\{n\ge0:X_n=k\}$. Prove that the random variables $T_k-T_{k-1}$, $k\in\mathbb{N}$, are independent and identically distributed.

---

**Exercise 13.4** Let $S$ be a countable set, and let $(G,\mathcal{G})$ be a measurable space. Let $(Z_n)_{n\in\mathbb{N}}$ be a sequence of independent and identically distributed random variables with values in $G$, and let $\phi:S\times G\to S$ be a measurable function. Also fix $x\in S$. We define a random process $(X_n)_{n\in\mathbb{Z}_+}$ with values in $S$ by induction, by setting $X_0=x$ and then, for every $n\ge0$, $X_{n+1}=\phi(X_n,Z_{n+1})$. Prove that $(X_n)_{n\in\mathbb{Z}_+}$ is a Markov chain, and determine its transition matrix in terms of the distribution of the random variables $Z_n$.

---

**Exercise 13.5** Consider the Galton-Watson process $(X_n)_{n\in\mathbb{N}}$ of Section 13.2.4, and assume that $X_0=1$ and that the offspring distribution $\mu$ satisfies $\mu(0)+\mu(1)<1$. Write $m=\sum_{k=0}^\infty k\mu(k)$ for the mean of $\mu$, and $g$ for the generating function of $\mu$,

$$
g(r)=\sum_{k=0}^\infty\mu(k)r^k,
\qquad \forall r\in[0,1].
$$

1. Verify that, for every $n\in\mathbb{N}$ and $r\in[0,1]$, $\mathbb{E}[r^{X_n}]=g_n(r)$, where $g_n$ is the $n$-th iterate of $g$ ($g_1=g$ and $g_{n+1}=g\circ g_n$ for every $n\in\mathbb{N}$).

2. Set $T_0=\inf\{n\ge0:X_n=0\}$. Verify that $\mathbb{P}(T_0<\infty)=\lim_{n\to\infty}g_n(0)$.

3. Prove that $\mathbb{P}(T_0<\infty)$ is the smallest solution of the equation $g(t)=t$ in the interval $[0,1]$. Verify that $\mathbb{P}(T_0<\infty)<1$ if and only if $m>1$.

---

**Exercise 13.6 (Birth and Death Process)** Let $Q$ be the transition matrix on $\mathbb{Z}_+$ that is determined by

$$
Q(0,0)=r_0,\qquad Q(0,1)=p_0,
$$

and, for every $k\ge1$,

$$
Q(k,k-1)=q_k,\qquad Q(k,k)=r_k,\qquad Q(k,k+1)=p_k,
$$

where $r_0+p_0=1$ and $q_k+r_k+p_k=1$ for every $k\ge1$. We assume that $p_j>0$ for every $j\ge0$ and $q_j>0$ for every $j\ge1$. We consider the canonical Markov chain associated with $Q$.

1. Verify that the chain is irreducible and has a reversible measure unique up to a multiplicative constant.

2. Under the condition

    $$
    \sum_{i=1}^\infty\frac{p_0p_1\cdots p_{i-1}}{q_1q_2\cdots q_i}<\infty,
    $$

    prove that the chain is positive recurrent.

3. We suppose that $p_k=p$ for every $k\ge0$ and $q_k=q$ for every $k\ge1$, where $q>p>0$. Compute the quantities $\mathbb{E}_k[H_k]$ for every $k\ge0$.

---

**Exercise 13.7** Let $N\in\mathbb{N}$ and let $Q$ be the transition matrix on $E=\{0,1,\ldots,N\}$ defined by

$$
Q(i,j)=\binom{N}{j}\left(\frac{i}{N}\right)^j
\left(1-\frac{i}{N}\right)^{N-j},
\qquad \forall i,j\in\{0,1,\ldots,N\}.
$$

In other words, $Q(i,\cdot)$ is the binomial $\mathcal{B}(N,i/N)$ distribution. Let $k\in\{0,1,\ldots,N\}$ and let $(X_n)_{n\in\mathbb{Z}_+}$ be a Markov chain with transition matrix $Q$ started at $X_0=k$.

1. Classify the states of $(X_n)_{n\in\mathbb{Z}_+}$.

2. Verify that $(X_n)_{n\in\mathbb{Z}_+}$ is a martingale, which converges to a limit $X_\infty$, a.s. as $n\to\infty$. Determine the law of $X_\infty$.

---

**Exercise 13.8** Let $(S_n)_{n\in\mathbb{Z}_+}$ be a simple random walk on $\mathbb{Z}$, with $S_0=0$. For $k\in\mathbb{Z}\setminus\{0\}$, show that the expected value of the number of visits of $k$ before the first return to $0$ is equal to $1$.

---

**Exercise 13.9 (Kolmogorov's Criterion for Reversibility)** Consider an irreducible Markov chain on $E$ with transition matrix $Q$. Prove that the chain has a reversible measure if and only if the following two conditions hold.

- For every $x,y\in E$, the property $Q(x,y)>0$ implies $Q(y,x)>0$.
- For every finite sequence $x_0,x_1,\ldots,x_n$ in $E$ such that $x_n=x_0$ and $Q(x_{i-1},x_i)>0$ for every $i\in\{1,\ldots,n\}$,

$$
\prod_{i=1}^n\frac{Q(x_i,x_{i-1})}{Q(x_{i-1},x_i)}=1.
$$

---

**Exercise 13.10 ($h$-Transform)** Let $Q$ be a transition matrix on a countable space $E$, and let $h:E\to\mathbb{R}_+$ be a nonnegative function on $E$. We assume that the set $F=\{x\in E:h(x)>0\}$ is not empty and that $h$ is $Q$-harmonic on $F$.

1. For every $x,y\in F$, set

    $$
    Q'(x,y)=\frac{h(y)}{h(x)}Q(x,y).
    $$

    Verify that $Q'$ is a transition matrix on $F$.

2. Fix $a\in F$, and suppose that $(X_n)_{n\in\mathbb{Z}_+}$ is a Markov chain in $E$ with transition matrix $Q$, such that $X_0=a$, and $(Y_n)_{n\in\mathbb{Z}_+}$ is a Markov chain in $F$ with transition matrix $Q'$, such that $Y_0=a$. Prove that, for every integer $n\ge1$ and every function $F:E^{n+1}\to\mathbb{R}_+$,

    $$
    \mathbb{E}[F(Y_0,Y_1,\ldots,Y_n)]
    =
    \frac1{h(a)}
    \mathbb{E}\!\left[\mathbf{1}_{\{T>n\}}h(X_n)F(X_0,X_1,\ldots,X_n)\right],
    $$

    where $T=\inf\{k\ge0:X_k\notin F\}$.

3. We now assume that $Q$ is the transition matrix of simple random walk on $\mathbb{Z}$. Verify that the assumptions are satisfied when $h(i)=i\vee0$ and $F=\mathbb{N}$, and compute $Q'$. Retain the assumptions and notation of question (2) (in particular $a\in\mathbb{N}$ is fixed), and for every integer $N>a$ set

    $$
    \tau_N=\inf\{n\ge0:X_n=N\},
    \qquad
    \sigma_N=\inf\{n\ge0:Y_n=N\}.
    $$

    Verify that $\sigma_N<\infty$ a.s., and that the law of $(Y_0,Y_1,\ldots,Y_{\sigma_N})$ coincides with the conditional distribution of $(X_0,X_1,\ldots,X_{\tau_N})$ under $\mathbb{P}(\cdot\mid\tau_N<T)$.

---

**Exercise 13.11** Let $(Y_n)_{n\in\mathbb{N}}$ be a sequence of independent and identically distributed random variables with values in $\mathbb{N}$. We assume that:

- $a=\mathbb{E}[Y_1]<\infty$;
- the greatest common divisor of $\{k\ge1:\mathbb{P}(Y_1=k)>0\}$ is $1$.

We then define $Z_1=Y_1$, $Z_2=Y_1+Y_2,\ldots,Z_k=Y_1+\cdots+Y_k,\ldots$, and we set $X_0=0$ and, for every integer $n\ge0$,

$$
X_n=Z_{k(n)}-n,
\qquad \text{where } k(n)=\min\{k\ge1:Z_k\ge n\}.
$$

1. Verify that $(X_n)_{n\in\mathbb{Z}_+}$ is an irreducible Markov chain with values in a subset of $\mathbb{Z}_+$ to be determined. Prove that this Markov chain is positive recurrent and aperiodic.

2. Consider the random set of integers $\mathcal{Z}=\{Z_1,Z_2,Z_3,\ldots\}$. Prove that

    $$
    \lim_{n\to\infty}\mathbb{P}(n\in\mathcal{Z})=\frac1a.
    $$

---

**Exercise 13.12** We consider a random walk $(S_n)_{n\in\mathbb{Z}_+}$ on $\mathbb{Z}$ starting from $0$, with jump distribution $\mu$ satisfying the following two properties:

- $\mu(0)<1$ and $\mu(k)=0$ for every $k<-1$;
- $\sum_{k\in\mathbb{Z}}|k|\mu(k)<\infty$ and $\sum_{k\in\mathbb{Z}}k\mu(k)=0$.

1. Verify that the Markov chain $(S_n)_{n\in\mathbb{Z}_+}$ is recurrent and irreducible.

2. Let $H=\inf\{n\ge1:S_n=0\}$ and $R=\inf\{n\ge1:S_n\ge0\}$. Prove that, for every $k\in\mathbb{Z}$,

    $$
    \mathbb{E}\left[\sum_{n=0}^{H-1}\mathbf{1}_{\{S_n=k\}}\right]=1
    $$

    and infer that we have also for every integer $k\le0$,

    $$
    \mathbb{E}\left[\sum_{n=0}^{R-1}\mathbf{1}_{\{S_n=k\}}\right]=1.
    $$

3. Let $p\in\mathbb{Z}_+$. Verify that

    $$
    \mathbb{P}(S_R=p)
    =
    \sum_{n=0}^\infty
    \mathbb{E}\!\left[\mathbf{1}_{\{n<R\}}\mathbf{1}_{\{S_{n+1}=p\}}\right]
    $$

    and using question (2) conclude that

    $$
    \mathbb{P}(S_R=p)=\sum_{k=p}^\infty\mu(k).
    $$

---

**Exercise 13.13** A student owns three books numbered $1,2,3$, which are stored on a shelf. Each morning, the student chooses at random one of the books, in such a way that the probability that the book $i$ is chosen is $\alpha_i>0$, and the choices are made independently every day. At the end of the day, the student places the chosen book back on the shelf, to the left of the other two. Suppose that on the morning of the first day the books stand in the order $1,2,3$ from left to right on the shelf, and for every $n\ge1$, let $p_n$ be the probability that the books are in the same order on the morning of the $n$-th day. Compute the limit of $p_n$ as $n\to\infty$.

---

**Exercise 13.14** Suppose that we move a knight randomly on a chess board according to the following rules. Initially, the knight stands on one of the corners of the chess board. Then, at each step, the knight chooses one of the possible moves at random with equal probabilities, independently of what happened before. (Recall that a chess board is a square board of eight rows and eight columns, resulting in $64$ squares, and that the knight's moves form an "L" shape, two squares horizontally and one square vertically, or two squares vertically and one square horizontally.) Compute the expected value of the number of steps before the knight comes back to its starting point. (Answer: $168$).
