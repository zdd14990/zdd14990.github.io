---
title: GTM295 Chapter 12
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

# GTM295 Chapter 12

---

**Exercise 12.1** Let $(X_n)_{n\in\mathbb{N}}$ be a sequence of independent real random variables. Set $S_0=0$ and $S_n=X_1+\cdots+X_n$ for every $n\in\mathbb{N}$, and consider the canonical filtration $(\mathcal{F}_n)_{n\in\mathbb{Z}_+}$ of the process $(S_n)_{n\in\mathbb{Z}_+}$. Prove that:

1. If $X_n\in L^1$ for every $n$, $\widetilde{S}_n=S_n-\mathbb{E}[S_n]$ is a martingale.

2. If $X_n\in L^2$ for every $n$, $(\widetilde{S}_n)^2-\mathbb{E}[(\widetilde{S}_n)^2]$ is a martingale.

3. If, for some $\theta\in\mathbb{R}$, $\mathbb{E}[e^{\theta X_n}]<\infty$ for every $n\in\mathbb{N}$, then $e^{\theta S_n}/\mathbb{E}[e^{\theta S_n}]$ is a martingale.

---

**Exercise 12.2** Let $T$ be a stopping time.

1. Prove that, for every $n\in\mathbb{Z}_+$ and every $A\in\mathcal{F}_n$, the set $A\cap\{T\ge n\}$ belongs to $\mathcal{F}_T$.

2. For $B\in\mathcal{F}_\infty$, let $T^B:\Omega\to[0,\infty]$ be defined by $T^B(\omega)=T(\omega)$ if $\omega\in B$, and $T^B(\omega)=\infty$ if $\omega\in B^c$. Prove that $T^B$ is a stopping time if and only if $B\in\mathcal{F}_T$.

---

**Exercise 12.3** Let $T$ be a stopping time. Assume that there exists $\varepsilon\in(0,1)$ and an integer $N\ge1$ such that, for every $n\ge0$,

$$
\mathbb{P}(T\le n+N\mid\mathcal{F}_n)\ge\varepsilon,\qquad \text{a.s.}
$$

Prove that $T<\infty$ a.s. and $\mathbb{E}[T]<\infty$.

---

**Exercise 12.4** Let $(S_n)_{n\in\mathbb{Z}_+}$ be a simple random walk on $\mathbb{Z}$, with $S_0=k\in\mathbb{Z}$, and consider a function $\varphi:\mathbb{Z}\times\mathbb{Z}_+\to\mathbb{R}$. Prove that $\varphi(S_n,n)$ is a martingale if $\varphi$ satisfies the functional relation

$$
\varphi(s+1,n+1)+\varphi(s-1,n+1)=2\varphi(s,n).
$$

Infer that $S_n^2-n$ and $S_n^3-3nS_n$ are martingales.

---

**Exercise 12.5** Let $(X_n)_{n\in\mathbb{Z}_+}$ be an adapted random process such that $X_n\in L^1$ for every $n\in\mathbb{Z}_+$. Prove that this process is a martingale if and only if the property $\mathbb{E}[X_T]=\mathbb{E}[X_0]$ holds for every bounded stopping time $T$.

---

**Exercise 12.6** Let $(X_n)_{n\in\mathbb{Z}_+}$ be a martingale, and let $T$ be a stopping time such that

$$
\mathbb{P}(T<\infty)=1,\qquad
\mathbb{E}[|X_T|]<\infty,\qquad
\mathbb{E}[|X_T|\mathbf{1}_{\{T>n\}}]\xrightarrow[n\to\infty]{}0.
$$

1. Prove that $\mathbb{E}[|X_T-X_{T\wedge n}|]\to0$ as $n\to\infty$.

2. Conclude that $\mathbb{E}[X_T]=\mathbb{E}[X_0]$.

---

**Exercise 12.7** Let $(X_n)_{n\in\mathbb{Z}_+}$ be a martingale with $X_0=0$. Assume that there exists a constant $M>0$ such that $|X_{n+1}-X_n|\le M$ for every $n\in\mathbb{Z}_+$.

1. For $C>0$ and $K>0$, set $T_{C,K}=\inf\{n\ge0:X_n\ge K\text{ or }X_n\le-C\}$. Prove that

    $$
    \lim_{C\to+\infty}\mathbb{P}(T_{C,K}<\infty,X_{T_{C,K}}\le-C)=0.
    $$

2. Prove that, $\mathbb{P}(d\omega)$ almost surely, exactly one of the following two properties holds:

    - $X_n(\omega)$ has a finite limit as $n\to\infty$;
    - $\sup_{n\ge0}X_n(\omega)=+\infty$ and $\inf_{n\ge0}X_n(\omega)=-\infty$.

---

**Exercise 12.8 (Wald's Identity)** Let $(X_n)_{n\in\mathbb{N}}$ be a sequence of independent and identically distributed random variables in $L^1$. Set $S_0=0$ and $S_n=X_1+\cdots+X_n$ for every $n\ge1$, and let $(\mathcal{F}_n)_{n\in\mathbb{Z}_+}$ be the canonical filtration of $(S_n)_{n\in\mathbb{Z}_+}$.

1. Let $T$ be a stopping time such that $\mathbb{E}[T]<\infty$. Prove that the random process

    $$
    M_n=S_{n\wedge T}-(n\wedge T)\mathbb{E}[X_1]
    $$

    is a uniformly integrable martingale.

2. Prove that $S_T\in L^1$ and $\mathbb{E}[S_T]=\mathbb{E}[T]\mathbb{E}[X_1]$.

---

**Exercise 12.9 (Another Proof of the Strong Law of Large Numbers)** We consider a sequence $(X_n)_{n\in\mathbb{N}}$ of independent and identically distributed random variables in $L^1$, and assume that $\mathbb{E}[X_1]>0$. For every $n\ge0$, we set $S_n=X_1+\cdots+X_n$ $(S_0=0)$ and $I_n=\min\{S_k:0\le k\le n\}$. Finally, we set $T=\inf\{n\ge0:S_n>0\}\le+\infty$.

1. Let $n\ge0$. Verify that the two random vectors $(S_0,S_1,S_2,\ldots,S_n)$ and $(S_n-S_n,S_n-S_{n-1},S_n-S_{n-2},\ldots,S_n-S_0)$ have the same law and use this to obtain that $\mathbb{P}(T>n)=\mathbb{P}(S_n=I_n)$, and

    $$
    \mathbb{E}[T]
    =
    \mathbb{E}\left[\sum_{n=0}^\infty\mathbf{1}_{\{S_n=I_n\}}\right].
    $$

2. Verify that, for every $n\ge0$, $\mathbb{E}[S_{n\wedge T}]=\mathbb{E}[X_1]\mathbb{E}[n\wedge T]$.

3. In this question only, we assume that there is a constant $C>0$ such that $X_1\le C$ a.s. Deduce from the preceding question that $\mathbb{E}[n\wedge T]\le C/\mathbb{E}[X_1]$, for every integer $n\ge0$. Using question (1), verify that

    $$
    \sum_{n=0}^\infty\mathbf{1}_{\{S_n=I_n\}}<\infty,\qquad \text{a.s.}
    $$

    and conclude that $\inf_{n\ge0}S_n>-\infty$, a.s.

4. Show that the conclusion of question (3) remains valid without the assumption that $X_1\le C$ a.s. (*Hint:* Choose $C>0$ so that $\mathbb{E}[X_1\mathbf{1}_{\{X_1\le C\}}]>0$.)

5. Prove the strong law of large numbers (Theorem 10.8). (*This short proof of the strong law of large numbers is taken from [5].*)

---

**Exercise 12.10** Let $(X_n)_{n\in\mathbb{N}}$ be a sequence of independent random variables. For every $n\ge1$, set $\mathcal{G}_n=\sigma(X_n,X_{n+1},\ldots)$ and

$$
\mathcal{G}_\infty=\bigcap_{n=1}^\infty\mathcal{G}_n.
$$

Use Corollary 12.18 to give a martingale proof of the fact that $\mathbb{P}(A)=0$ or $1$ for every $A\in\mathcal{G}_\infty$ (Theorem 10.6).

---

**Exercise 12.11** The goal of this exercise is to prove that a Lipschitz function on $[0,1]$ can be written as the integral of a bounded measurable function. We fix a Lipschitz function $f:[0,1]\to\mathbb{R}$ (there exists $L>0$ such that $|f(x)-f(y)|\le L|x-y|$ for every $x,y\in[0,1]$). We also let $X$ be a random variable with values in $[0,1)$, which is uniformly distributed over $[0,1)$. For every integer $n\ge0$, we set

$$
X_n=2^{-n}\lfloor2^nX\rfloor
\quad\text{and}\quad
Z_n=2^n(f(X_n+2^{-n})-f(X_n)),
$$

and we let $(\mathcal{F}_n)_{n\in\mathbb{Z}_+}$ be the canonical filtration of the process $(X_n)_{n\in\mathbb{Z}_+}$.

1. Verify that $\sigma(X_0,X_1,\ldots)=\sigma(X)$, and $\mathcal{F}_n=\sigma(X_n)$ for every $n\ge0$.

2. Compute $\mathbb{E}[h(X_{n+1})\mid\mathcal{F}_n]$ for any bounded Borel function $h:\mathbb{R}\to\mathbb{R}$. Infer that $(Z_n)_{n\in\mathbb{Z}_+}$ is a bounded martingale with respect to the filtration $(\mathcal{F}_n)_{n\in\mathbb{Z}_+}$.

3. Show that there exists a bounded Borel function $g:[0,1)\to\mathbb{R}$ such that $Z_n\to g(X)$ as $n\to\infty$, a.s.

4. Verify that a.s. for every $n\ge0$,

    $$
    Z_n=2^n\int_{X_n}^{X_n+2^{-n}}g(u)\,du.
    $$

5. Conclude that, for every $x\in[0,1]$,

    $$
    f(x)=f(0)+\int_0^x g(u)\,du.
    $$

---

**Exercise 12.12** Consider a sequence $(X_n)_{n\in\mathbb{Z}_+}$ of random variables with values in $[0,1]$, such that $X_0=a$. For every $n\ge0$, set $\mathcal{F}_n=\sigma(X_0,X_1,\ldots,X_n)$. We assume that, for every $n\ge0$,

$$
\mathbb{P}\left(X_{n+1}=\frac{X_n}{2}\mid\mathcal{F}_n\right)=1-X_n,
\qquad
\mathbb{P}\left(X_{n+1}=\frac{1+X_n}{2}\mid\mathcal{F}_n\right)=X_n.
$$

1. Prove that $(X_n)_{n\in\mathbb{Z}_+}$ is a martingale with respect to the filtration $(\mathcal{F}_n)_{n\in\mathbb{Z}_+}$, which converges a.s. to a random variable $Z$.

2. Prove that $\mathbb{E}[(X_{n+1}-X_n)^2]=\frac14\mathbb{E}[X_n(1-X_n)]$.

3. Compute the distribution of $Z$.

---

**Exercise 12.13 (Polya's Urn)** At time $0$, an urn contains $a$ white balls and $b$ red balls, where $a,b\in\mathbb{N}$. We draw one ball at random in the urn, and replace it by two balls of the same color to obtain the urn at time $1$. We then proceed in the same manner to get the urn at time $2$ from the urn at time $1$, and so on. Thus, at time $n\ge0$, the urn contains $a+b+n$ balls. To simplify notation, we set $N=a+b$.

1. For every $n\ge0$, let $Y_n$ be the number of white balls in the urn at time $n$, and $X_n=Y_n/(N+n)$ (which is the proportion of white balls at time $n$). We consider the filtration $\mathcal{F}_n=\sigma(Y_0,Y_1,\ldots,Y_n)$. Show that $(X_n)_{n\in\mathbb{Z}_+}$ is a martingale that converges a.s. to a limiting random variable denoted by $U$.

2. Consider the special case where $a=b=1$. Prove by induction that, for every $n\ge0$, $Y_n$ is uniformly distributed over $\{1,2,\ldots,n+1\}$. Give the distribution of $U$ in that case.

3. We come back to the general case. Fix $k\ge1$, and, for every $n\ge0$, set

    $$
    Z_n=
    \frac{Y_n(Y_n+1)\cdots(Y_n+k-1)}
    {(N+n)(N+n+1)\cdots(N+n+k-1)}.
    $$

    Prove that $(Z_n)_{n\in\mathbb{Z}_+}$ is a martingale, and then compute $\mathbb{E}[U^k]$.

---

**Exercise 12.14 (Yet Another Proof of the Strong Law of Large Numbers)**

1. Let $(Z_n)_{n\in\mathbb{N}}$ be a sequence of independent random variables in $L^2$, such that $\mathbb{E}[Z_n]=0$ for every $n$ and

    $$
    \sum_{n=1}^\infty\frac{\operatorname{var}(Z_n)}{n^2}<\infty.
    $$

    For every $n\in\mathbb{N}$, we set $S_n=\sum_{j=1}^nZ_j$ and $M_n=\sum_{j=1}^n\frac{Z_j}{j}$. Prove that $M_n$ converges a.s. as $n\to\infty$, and infer that $S_n/n$ converges a.s. to $0$ as $n\to\infty$. *Hint:* Verify that

    $$
    \frac{S_n}{n}=M_n-\frac1n\sum_{j=1}^{n-1}M_j.
    $$

2. Let $(X_n)_{n\in\mathbb{N}}$ be a sequence of independent and identically distributed random variables in $L^1$. For every $n\in\mathbb{N}$, set

    $$
    Y_n=X_n\mathbf{1}_{\{|X_n|\le n\}}.
    $$

    Verify that $\mathbb{E}[Y_n]\to\mathbb{E}[X_1]$ as $n\to\infty$. Then prove that almost surely there exists an integer $n_0(\omega)\in\mathbb{N}$ such that $X_n=Y_n$ for every $n\ge n_0(\omega)$, and that

    $$
    \sum_{n=1}^\infty\frac{\operatorname{var}(Y_n)}{n^2}<\infty.
    $$

3. Conclude that $\frac1n(X_1+\cdots+X_n)\to\mathbb{E}[X_1]$ a.s. as $n\to\infty$.

---

**Exercise 12.15 (Law of the Iterated Logarithm)** Let $(X_n)_{n\in\mathbb{N}}$ be a sequence of independent Gaussian $\mathcal{N}(0,1)$ random variables, and $S_n=X_1+\cdots+X_n$ for every $n\in\mathbb{N}$.

1. Prove that, for every $\theta>0$ and $n\in\mathbb{N}$, we have for every $c>0$,

    $$
    \mathbb{P}\left(\max_{1\le k\le n}S_k\ge c\right)
    \le
    e^{-c\theta}\mathbb{E}[e^{\theta S_n}]
    $$

    and consequently

    $$
    \mathbb{P}\left(\max_{1\le k\le n}S_k\ge c\right)
    \le
    \exp\left(-\frac{c^2}{2n}\right).
    $$

2. For every $x>e$, set $h(x)=\sqrt{2x\log\log(x)}$. Prove that

    $$
    \limsup_{n\to\infty}\frac{S_n}{h(n)}\le1,\qquad \text{a.s.}
    $$

    *Hint:* For $K>1$ fixed, bound the probabilities

    $$
    \mathbb{P}\left(\max_{1\le k\le K^n}S_k\ge Kh(K^{n-1})\right).
    $$

---

**Exercise 12.16 (Kakutani's Theorem)** Let $(X_n)_{n\in\mathbb{N}}$ be a sequence of independent positive random variables, such that $\mathbb{E}[X_n]=1$ for every $n$. Set $M_0=1$ and, for every $n\in\mathbb{N}$,

$$
M_n=\prod_{k=1}^n X_k.
$$

1. Prove that $(M_n)_{n\ge0}$ is a martingale, which converges a.s. to a limit denoted by $M_\infty$.

2. For every $n\ge1$, we set $a_n=\mathbb{E}[\sqrt{X_n}]\in(0,1]$. Verify that the following three conditions are equivalent:

    (a) $\mathbb{E}[M_\infty]=1$;

    (b) $M_n\to M_\infty$ in $L^1$ as $n\to\infty$;

    (c) $\prod_{k=1}^\infty a_k>0$.

    If these conditions do not hold prove that $M_\infty=0$ a.s.

    *Hint:* Use Scheffe's lemma (Proposition 10.5), and also consider the process

    $$
    N_n=\prod_{k=1}^n\frac{\sqrt{X_k}}{a_k}.
    $$

---

**Exercise 12.17** Let $(X_n)_{n\in\mathbb{N}}$ be a sequence of independent Bernoulli random variables with parameter $1/2$, and let $(\alpha_n)_{n\in\mathbb{N}}$ be a sequence of positive real numbers. For every $n\ge1$, set

$$
S_n=\sum_{j=1}^n\alpha_jX_j.
$$

1. Prove that the condition $\sum_{j=1}^\infty\alpha_j^2<\infty$ implies that $S_n$ converges a.s. as $n\to\infty$.

2. Prove that if $\sum_{j=1}^\infty\alpha_j^2=\infty$ then $\sup_{n\in\mathbb{N}}S_n=\infty$ and $\inf_{n\in\mathbb{N}}S_n=-\infty$, a.s. (*Hint:* Use Theorem 10.6 and consider the martingale $(S_n)^2-\mathbb{E}[(S_n)^2]$.)
