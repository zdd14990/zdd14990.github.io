---
title: GTM295习题
date: 2026-07-06
hide:
  - navigation
categories:
  - 概统
  - 概率论
tags:
  - probability-statistics
  - probability-theory
  - exercises
---

# GTM295习题

---

**Exercise 8.1** Consider a population of $n$ individuals and $r \in \{1,\ldots,n-1\}$.

1. Give a probability space for the random experiment consisting in choosing at random a sample of $r$ individuals in the population.

2. Suppose that the population is composed of individuals of two types, with $n_1$ individuals of type 1 and $n_2$ individuals of type 2, where $n_1+n_2=n$. Let $X$ be the number of individuals of type 1 in the sample. Prove that the law of $X$ is given by

   $$
   \mathbb{P}(X=k)
   =
   \frac{\binom{n_1}{k}\binom{n_2}{r-k}}{\binom{n}{r}}
   $$

   for every $k \in \{0,1,\ldots,r\}$, where we make the convention that $\binom{k}{j}=0$ if $j>k$. This is the so-called **hypergeometric distribution**.

3. Show that, when $n,n_1,n_2 \to \infty$ in such a way that $n_1/n$ tends to $p \in (0,1)$, and $r$ remains fixed, the law of $X$ becomes close to the binomial $\mathcal{B}(r,p)$ distribution. Interpret this result.

**Solution.** (3). Use Stirling's formula, we have

$$
\begin{aligned}
\binom{n_1}{k}&\sim \frac{\sqrt{2\pi n_1}(\frac{n_1}{e})^{n_1}}{k!\sqrt{2\pi (n_1-k)}(\frac{n_1-k}{e})^{n_1-k}}=\frac{n_1^k}{k!}\sqrt{\frac{n_1}{n_1-k}}\left(1-\frac{k}{n_1}\right)^{n_1-k}\sim \frac{n_1^k}{k!}e^{-k}\\
\binom{n_2}{r-k}&\sim \frac{n_2^{r-k}}{(r-k)!}e^{-(r-k)},\quad \binom{n}{r}\sim \frac{n^r}{r!}e^{-r}.
\end{aligned}
$$

so that

$$
\begin{aligned}
    \mathbb{P}(X=k)&\sim \frac{n_1^k}{k!}e^{-k}\frac{n_2^{r-k}}{(r-k)!}e^{-(r-k)}\frac{r!}{n^r}e^r\\
    &=\frac{r!}{k!(r-k)!}\left(\frac{n_1}{n}\right)^k\left(\frac{n_2}{n}\right)^{r-k}\sim \binom{r}{k}p^k(1-p)^{r-k}.
\end{aligned}
$$


---

**Exercise 8.2** Let $n \geq 1$ and $r \geq 1$ be integers. Suppose that we have $n$ balls and $r$ compartments numbered $1,2,\ldots,r$.

1. Give a probability space for the random experiment consisting in placing the $n$ balls at random in the $r$ compartments, where each ball is placed in one of the $r$ compartments chosen at random. Compute the law $\mu_{r,n}$ of the number of balls placed in the first compartment.

2. Show that, when $r,n \to \infty$ in such a way that $r/n \to \lambda \in (0,\infty)$, the law $\mu_{r,n}$ becomes close to the Poisson distribution with parameter $\lambda$.

**Solution.** Let

$$
\Omega=\{1,2,\ldots,r\}^n,
$$

where \(\omega=(\omega_1,\ldots,\omega_n)\in\Omega\) means that the \(i\)-th ball is placed in compartment \(\omega_i\). Take

$$
\mathcal A=\mathcal P(\Omega),
\qquad
\mathbb P(\{\omega\})=\frac{1}{r^n},
\quad \omega\in\Omega.
$$

Let \(X\) be the number of balls placed in the first compartment. Then

$$
X(\omega)=\sum_{i=1}^n \mathbf 1_{\{\omega_i=1\}}.
$$

For \(k=0,1,\ldots,n\),

$$
\begin{aligned}
\mu_{r,n}(\{k\})
&=
\mathbb P(X=k) \\[4pt]
&=
\frac{\binom nk (r-1)^{n-k}}{r^n} \\[4pt]
&=
\binom nk
\left(\frac1r\right)^k
\left(1-\frac1r\right)^{n-k}=\mathcal B\left(n,\frac1r\right).
\end{aligned}
$$

For the limiting distribution, fix \(k\in\mathbb N\). If

$$
\frac rn\to \lambda\in(0,\infty),
$$

then

$$
\begin{aligned}
\mu_{r,n}(\{k\})
&=
\binom nk
\left(\frac1r\right)^k
\left(1-\frac1r\right)^{n-k} \\[4pt]
&=
\frac{n(n-1)\cdots(n-k+1)}{k!r^k}
\left(1-\frac1r\right)^{n-k} \\[4pt]
&=
\frac{1}{k!}
\frac{n}{r}
\frac{n-1}{r}
\cdots
\frac{n-k+1}{r}
\left(1-\frac1r\right)^{n-k}.
\end{aligned}
$$

Since \(k\) is fixed,

$$
\frac{n-j}{r}
=
\frac nr-\frac jr
\to
\frac1\lambda,
\qquad j=0,1,\ldots,k-1,
$$

and

$$
\left(1-\frac1r\right)^{n-k}
=
\exp\left((n-k)\log\left(1-\frac1r\right)\right)
\to
\exp\left(-\frac1\lambda\right).
$$

Hence

$$
\begin{aligned}
\mu_{r,n}(\{k\})
&\to
\frac1{k!}
\left(\frac1\lambda\right)^k
e^{-1/\lambda}.
\end{aligned}
$$

So, under the condition \(r/n\to\lambda\),

$$
\mu_{r,n}
\to
\operatorname{Poisson}\left(\frac1\lambda\right).
$$

---

**Exercise 8.3**

1. Let $A_1,\ldots,A_n$ be $n$ events in a probability space $(\Omega,\mathcal{A},\mathbb{P})$. Prove that

   $$
   \mathbb{P}\left(\bigcup_{i=1}^n A_i\right)
   =
   \sum_{k=1}^n (-1)^{k+1}
   \sum_{1\leq j_1<\cdots<j_k\leq n}
   \mathbb{P}(A_{j_1}\cap \cdots \cap A_{j_k}).
   $$

   This is called the **inclusion-exclusion formula**.

2. Consider a group of $n$ persons attending a lecture. Each person wears a hat and leaves it in a dark cloakroom before the lecture. After the lecture, the members of the group come successively to the cloakroom and each of them picks a hat at random among the remaining ones. What is the probability that at least one person of the group picks the hat he or she was wearing before the lecture? What is the limit of this probability when $n\to\infty$? Interpret and reprove the result of the calculation in terms of the group of permutations of $n$ elements.

---

**Exercise 8.4** (**Ballot Theorem**) In an election, candidate A has obtained $a$ votes and candidate B has obtained $b$ votes, where $a>b$. The scrutineer proceeds to the counting of votes by reading the ballot papers one after the other in a random order. Prove that the probability that candidate A has strictly more votes than candidate B at each step of the counting process is

$$
\frac{a-b}{a+b}.
$$

Hint: Represent the difference between votes for A and votes for B during the counting process by a discrete function from $\{0,1,\ldots,a+b\}$ into $\mathbb{Z}$ that starts from $0$, has jumps of size $+1$ or $-1$ and terminates at $a-b$. Then note that the probability of occurrence of any such function is the same, so that the problem reduces to enumerating those among these functions that stay positive on $\{1,\ldots,a+b\}$.

---

**Exercise 8.5** Following the description of Bertrand’s paradox in Section 8.1.4, treat the third method that had been proposed by Bertrand: one first chooses the ray carrying the center of the chord, and then a point uniformly distributed on this ray to be the center of the chord. Give the probability space corresponding to this method and compute the law of the length of the chord.


**Solution.** 

$$
F_X(x)=\begin{cases}
    0, &x<0, \\
    1-\sqrt{1-\frac{x^2}{4}}, &0\le x\le 2, \\
    1, &x>2.
\end{cases}
$$

---

**Exercise 8.6** Let $X=(X_1,X_2,\ldots,X_d)$ be a random vector with values in $\mathbb{R}^d$. Assume that the law of $X$ has a density $p_X(x_1,\ldots,x_d)$. Compute the density of the random variable $X_1+X_2$ in terms of the function $p_X$.

**Solution.** 

$$
p_{X_1+X_2}(x)=\int_{\mathbb{R}}\left(\int_{\mathbb{R}^{d-2}}p_X(x-y,y,x_3,\ldots,x_d)\,dx_3\cdots dx_d\right)dy.
$$



---

**Exercise 8.7** Let $N$ be a Gaussian $\mathcal{N}(0,1)$ random variable. Compute the law of $1/N^2$. This is the so-called stable $(1/2)$ distribution, which we shall encounter in Chapter 14.

**Solution.** Set $Y=1/N^2$. Then

$$
F_Y(y)=\mathbb{P}(Y\le y)=\mathbb{P}\left(\frac1{N^2}\le y\right)=\mathbb{P}\left(|N|\ge \frac1{\sqrt y}\right)=2\mathbb{P}\left(N\ge \frac1{\sqrt y}\right).
$$

Set $\Phi(x)=\mathbb{P}(N\le x)$. Then

$$
F_Y(y)=2(1-\Phi(1/\sqrt y)),\quad y>0.
$$

$$
f_Y(y)=\frac{d}{dy}F_Y(y)=\frac{1}{y^{3/2}\sqrt{2\pi}}e^{-1/(2y)},\quad y>0.
$$





---

**Exercise 8.8** Let $(X,Y)$ be a random variable with values in $\mathbb{R}^2$ whose law has a density given by

$$
p(x,y)=\mathbf{1}_{\mathbb{R}_+^2}(x,y)\lambda\mu e^{-\lambda x-\mu y},
$$

where $\lambda,\mu>0$. Compute the law of

$$
U=\max(X,Y),
$$

of

$$
V=\min(X,Y),
$$

and of the pair $(U,V)$.

**Solution.** 

$$
\begin{aligned}
    F_U(a)&=\mathbb{P}(U\le a)=\mathbb{P}(X\le a,Y\le a)=\int_0^a\int_0^a \lambda\mu e^{-\lambda x-\mu y}\,dxdy\\
    &=\left(1-e^{-\lambda a}\right)\left(1-e^{-\mu a}\right),\quad a>0.\\
    \Longrightarrow f_U(u)&=\lambda e^{-\lambda u}\left(1-e^{-\mu u}\right)+\mu e^{-\mu u}\left(1-e^{-\lambda u}\right),\quad u>0.
\end{aligned}
$$

$$
\begin{aligned}
    F_V(a)&=\mathbb{P}(V\le a)=1-\mathbb{P}(V>a)=1-\mathbb{P}(X>a,Y>a)\\
    &=1-\int_a^{\infty}\int_a^{\infty}\lambda\mu e^{-\lambda x-\mu y}\,dxdy\\
    &=1-e^{-(\lambda+\mu)a},\quad a>0\\
    \Longrightarrow f_V(v)&=(\lambda+\mu)e^{-(\lambda+\mu)v},\quad v>0.
\end{aligned}
$$

$$
\begin{aligned}
    f_{U,V}(u,v)&=f_{X,Y}(u,v)\mathbf{1}_{\{u>v\}}+f_{X,Y}(v,u)\mathbf{1}_{\{v>u\}}\\
    &=\lambda\mu \left(e^{-\lambda u-\mu v}+e^{-\lambda v-\mu u}\right),\quad u>v>0.
\end{aligned}
$$

---

**Exercise 8.9** Suppose that a light source is located at the point $(-1,0)$ of the plane. Let $\theta$ be uniformly distributed over the interval $(-\pi/2,\pi/2)$. The light source emits a ray in the direction of the vertical coordinate axis making an angle $\theta$ with the horizontal axis. Determine the law of the point of the vertical axis that is hit by the ray.

**Solution.** Set $Y=\tan \theta$. Then

$$
F_Y(y)=\mathbb{P}(Y\le y)=\mathbb{P}(\tan \theta\le y)=\mathbb{P}(\theta\le \arctan y)=\frac{\arctan y+\pi/2}{\pi},
$$





---

**Exercise 8.10** Let $X$ be a real random variable, and let $F=F_X$ be its distribution function. Assume that the law of $X$ has no atoms. What is the distribution of the random variable

$$
Y=F(X)?
$$

Compare with Lemma 8.7.

---

**Exercise 8.11** Determine the $\sigma$-field generated by $X$ in the following two cases:

1. $(\Omega,\mathcal{A})=(\mathbb{R},\mathcal{B}(\mathbb{R}))$ and

   $$
   X(\omega)=\omega^2.
   $$

2. $(\Omega,\mathcal{A})=(\mathbb{R}^2,\mathcal{B}(\mathbb{R}^2))$, and

   $$
   X(\omega_1,\omega_2)
   =
   \frac{\omega_1\omega_2}{\omega_1^2+\omega_2^2}
   $$

   if $(\omega_1,\omega_2)\neq (0,0)$, and $X(0,0)=0$.

---

**Exercise 8.12** Let $X$ be a real random variable. Assume that $X$ is integrable, that is,

$$
\mathbb{E}[|X|]<\infty.
$$

Prove that

$$
\lim_{x\to+\infty}
\mathbb{E}\left[|X|\mathbf{1}_{\{|X|\geq x\}}\right]
=
0.
$$

---

**Exercise 8.13**

1. Let $(X_n)_{n\in\mathbb{N}}$ be a sequence of nonnegative random variables in $L^2$. Assume that the sequence $(X_n)_{n\in\mathbb{N}}$ is increasing and that

   $$
   \mathbb{E}[X_n]\xrightarrow[n\to\infty]{}+\infty,
   \qquad
   \liminf_{n\to\infty}
   \frac{\operatorname{var}(X_n)}{\mathbb{E}[X_n]^2}
   =
   0.
   $$

   Prove that

   $$
   X_n \xrightarrow[n\to\infty]{} +\infty
   \quad \text{a.s.}
   $$

2. Let $(A_n)_{n\in\mathbb{N}}$ be a sequence of events. Prove that the conditions

   $$
   \sum_{n=1}^{\infty}\mathbb{P}(A_n)=\infty,
   $$

   and

   $$
   \liminf_{n\to\infty}
   \frac{
   \sum_{j=1}^n\sum_{k=1}^n \mathbb{P}(A_j\cap A_k)
   }{
   \left(\sum_{k=1}^n \mathbb{P}(A_k)\right)^2
   }
   =
   1
   $$

   imply that

   $$
   \sum_{n=1}^{\infty}\mathbf{1}_{A_n}
   =
   \infty,
   \quad \text{a.s.}
   $$

---

**Exercise 8.14** Let $(X_1,X_2,\ldots,X_d)$ be a random vector with values in $\mathbb{R}^d$.

1. Prove that one can uniquely define real random variables $Y_1,Y_2,\ldots,Y_d$ such that, for every $\omega\in\Omega$,

   $$
   Y_1(\omega)\leq Y_2(\omega)\leq \cdots \leq Y_d(\omega),
   $$

   and, for every $\omega\in\Omega$ and $x\in\mathbb{R}$, the sets

   $$
   \{i\in\{1,\ldots,d\}:X_i(\omega)=x\}
   $$

   and

   $$
   \{i\in\{1,\ldots,d\}:Y_i(\omega)=x\}
   $$

   have the same cardinality. The random vector $(Y_1,\ldots,Y_d)$ is called the increasing reordering of $(X_1,\ldots,X_d)$.

2. Suppose that $(X_1,\ldots,X_d)$ has density

   $$
   p(x_1,\ldots,x_d)
   =
   \mathbf{1}_{[0,1]^d}(x_1,\ldots,x_d).
   $$

   Show that the random vector $(Y_1,\ldots,Y_d)$ has density

   $$
   q(x_1,\ldots,x_d)
   =
   d!\,\mathbf{1}_{\{0\leq x_1<x_2<\cdots<x_d\leq 1\}}.
   $$

3. Suppose that $d=3$ and that $(X_1,X_2,X_3)$ has density

   $$
   p(x)=\mathbf{1}_{[0,1]^3}(x)
   $$

   for $x\in\mathbb{R}^3$. Compute the law of the pair

   $$
   (Y_1/Y_2,\;Y_2/Y_3).
   $$

---

**Exercise 8.15** Let $(X_n)_{n\in\mathbb{Z}}$ be random variables in $L^2$ such that, for every $n,m\in\mathbb{Z}$,

$$
\mathbb{E}[X_n]=a,
\qquad
\operatorname{cov}(X_n,X_m)=b\rho^{|m-n|},
$$

where $a,b,\rho$ are reals such that $b>0$ and $|\rho|<1$. Let $F$ be the closed linear subspace of $L^2$ spanned by the variables $X_n$ for $n\leq 0$ and the constant variable $1$. Show that, for every integer $m\geq 1$,

$$
\inf_{Y\in F}\mathbb{E}\left[(X_m-Y)^2\right]
=
\mathbb{E}\left[(X_m-Y_m)^2\right],
$$

where

$$
Y_m=a+\rho^m(X_0-a).
$$

---

**Exercise 8.16** Compute the generating function of the integer-valued random variable $X$ in the following three cases:

1. $X$ is binomial $\mathcal{B}(n,p)$ where $n\in\mathbb{N}$ and $p\in[0,1]$.

2. $X$ is geometric with parameter $p\in(0,1)$.

3. $X$ is Poisson with parameter $\lambda>0$.