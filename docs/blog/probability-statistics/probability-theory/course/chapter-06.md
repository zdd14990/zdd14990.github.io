---
title: Markov Chains
date: 2026-07-24
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

A sequence of random variables $\left\{X_n\right\}$ is a **Markov process** with state space $S$ and transition probabilities $P$ if for all $n\ge 0$ and all sequences $x_0,\ldots,x_n,x_{n+1}\in S$, we have that

$$
\mathbb{P}[X_{n+1}=x_{n+1}\mid X_0=x_0,\ldots,X_n=x_n]=\mathbb{P}[X_{n+1}=x_{n+1}\mid X_n=x_n]= P(x_n,x_{n+1}).
$$



* the conditional probability is $P(x,y)$, no matter what sequence $x_0,\cdots,x_{n-1}$ of states proceeds the current state $x$

* the transition matrix $P$ is a stochastic matrix, i.e. $P(x,y)\ge 0$ and $\sum_{y\in S}P(x,y)=1$ for all $x\in S$.

---

## Ergodic theorem

**Theorem** Let $f$ be a real-valued function defined on $S$. If $\left\{X_n\right\}$ is an irreducible Markov chain with stationary distribution $\pi$, then for any starting distribution $\mu$, we have

$$
\lim_{n\to\infty}\frac{1}{n}\sum_{k=0}^{n}f(X_k)=\pi(f),\quad \mathbb{P}_\mu\text{-a.s.}
$$

**Theorem** Suppose that $P$ is irreducible, aperiodic, with stationary distribution $\pi$. Then there exist constants $\alpha \in (0,1)$ and $C > 0$ such that

$$
\max_{x\in S}\|P^n(x,\cdot)-\pi\|_{\text{TV}}\le C\alpha^n.
$$

In particular, for any state $y$, we have

$$
\lim _{n\to\infty}P^n(x,y)=\pi(y).
$$

A transition matrix $P$ is called **irreducible** if for any two states $x,y\in S$, there exists an integer $n\ge 0$ such that $P^n(x,y)>0$. For any $x\in S$, define $T(x)=\left\{n\ge 1:P^n(x,x)>0\right\}$, the **period** of $x$ is the greatest common divisor of $T(x)$, denote by $gcd(T(x))$.

**Lemma** If $P$ is irreducible, then $gcd(T(x)) = gcd(T(y))$ for all $x,y \in S$. We define this common number to be the period of the chain.

For an irreducible chain, the chain is **aperiodic** if all states have period one.

### Simple random walk on a cycle

For the simple random walk on the \(N\)-cycle:

- the chain is irreducible;
- if \(N\) is odd, it is aperiodic;
- if \(N\) is even, it has period \(2\).

---
## Stationary Measure

Consider a Markov chain \((X_n)_{n\ge0}\) with state space \(S\) and transition matrix \(P\). Let

- \(\mu_0\) be the distribution of \(X_0\);
- \(\mu_n\) be the distribution of \(X_n\).

Then

$$
\mu_{n+1}=\mu_nP,
\qquad
\mu_n=\mu_0P^n.
$$

For a function \(f:S\to\mathbb R\), define

$$
Pf(x)=\sum_{y\in S}P(x,y)f(y).
$$

Then

$$
\mathbb E_\mu[f(X_n)]=\mu P^nf.
$$

A probability measure \(\pi\) on \(S\) is called a **stationary distribution** if

$$
\pi=\pi P.
$$

Equivalently, for every \(y\in S\),

$$
\pi(y)=\sum_{x\in S}\pi(x)P(x,y).
$$

If \(X_0\sim\pi\), then

$$
X_n\sim\pi,\qquad \forall n\ge0.
$$

Indeed,

$$
\mu_n=\pi P^n=\pi.
$$

---

## Time Reversal and Detailed Balance

A probability distribution \(\pi\) satisfies the **detailed balance equations** if

$$
\pi(x)P(x,y)=\pi(y)P(y,x),
\qquad \forall x,y\in S.
$$

Any probability distribution satisfying the detailed balance equations is stationary. In fact,

$$
\sum_{x\in S}\pi(x)P(x,y)
=
\sum_{x\in S}\pi(y)P(y,x)
=
\pi(y)\sum_{x\in S}P(y,x)
=
\pi(y).
$$

Suppose \(X_0\sim\pi\). For every sequence \(x_0,\ldots,x_n\),

$$
\begin{aligned}
&\mathbb P_\pi(X_0=x_0,\ldots,X_n=x_n)\\
&=
\pi(x_0)P(x_0,x_1)\cdots P(x_{n-1},x_n)\\
&=
\pi(x_n)P(x_n,x_{n-1})\cdots P(x_1,x_0)\\
&=
\mathbb P_\pi(X_0=x_n,\ldots,X_n=x_0).
\end{aligned}
$$

Thus the chain has the same law when time is reversed.

A Markov chain satisfying the detailed balance equations is called **reversible**.

---

## Birth-and-Death Chains

A birth-and-death chain has state space

$$
S=\{0,1,\ldots,N\}.
$$

From state \(k\), the chain can only move to \(k-1\), \(k\), or \(k+1\). Write

$$
P(k,k+1)=p_k,
\qquad
P(k,k)=r_k,
\qquad
P(k,k-1)=q_k,
$$

where

$$
p_k+r_k+q_k=1,
\qquad
p_N=0,
\qquad
q_0=0.
$$

Assume the chain is irreducible. The detailed balance equations are

$$
\pi(k)p_k=\pi(k+1)q_{k+1},
\qquad 0\le k<N.
$$

Hence

$$
\pi(k+1)=\pi(k)\frac{p_k}{q_{k+1}}.
$$

Starting from \(\pi(0)\),

$$
\pi(k)
=
\pi(0)
\prod_{j=0}^{k-1}\frac{p_j}{q_{j+1}}.
$$

Define

$$
w_0=1,
\qquad
w_k=\prod_{j=0}^{k-1}\frac{p_j}{q_{j+1}},
\qquad 1\le k\le N.
$$

After normalization,

$$
\boxed{
\pi(k)=\frac{w_k}{\sum_{j=0}^Nw_j}.
}
$$

Therefore every finite irreducible birth-and-death chain is reversible.

---

## Hitting and Return Times

For \(x\in S\), define

$$
\tau_x=\inf\{n\ge0:X_n=x\},
$$

and

$$
\tau_x^+=\inf\{n\ge1:X_n=x\}.
$$

The random variable \(\tau_x\) is the **hitting time** of \(x\), while \(\tau_x^+\) is the **first return time** when \(X_0=x\).

**Theorem.** Suppose that \(S\) is finite and \(P\) is irreducible. Then there exists a unique stationary distribution \(\pi\). Moreover,

$$
\boxed{
\pi(x)=\frac1{\mathbb E_x[\tau_x^+]},
\qquad x\in S.
}
$$

In particular,

$$
\pi(x)>0.
$$

The formula has the following interpretation:

$$
\boxed{
\text{long-run proportion of time at }x
=
\frac1{\text{mean return time to }x}.
}
$$

For every \(x,y\in S\),

$$
\mathbb E_x[\tau_y]<\infty.
$$

This follows from finiteness and irreducibility: there exist \(m\ge1\) and \(c>0\) such that, from every state, the chain reaches \(y\) within \(m\) steps with probability at least \(c\). Hence

$$
\mathbb P_x(\tau_y>km)\le(1-c)^k,
$$

and consequently

$$
\mathbb E_x[\tau_y]<\infty.
$$

---

## Harmonic Functions

A function \(f:S\to\mathbb R\) is called **harmonic** if

$$
f=Pf,
$$

that is,

$$
f(x)=\sum_{y\in S}P(x,y)f(y).
$$

**Lemma.** If \(S\) is finite and \(P\) is irreducible, then every harmonic function is constant.

**Proof.** Let \(x_0\) be a point where \(f\) attains its maximum. Since

$$
f(x_0)=\sum_yP(x_0,y)f(y)
$$

is a convex combination of values not exceeding \(f(x_0)\), every state \(y\) with \(P(x_0,y)>0\) must satisfy

$$
f(y)=f(x_0).
$$

Repeating this argument and using irreducibility shows that every state has the same value.

---

## Ergodic Theorem

**Theorem.** Let \(f:S\to\mathbb R\). If \((X_n)\) is a finite irreducible Markov chain with stationary distribution \(\pi\), then for every starting distribution \(\mu\),

$$
\boxed{
\frac1n\sum_{j=0}^{n}f(X_j)
\longrightarrow
\pi(f),
\qquad
\mathbb P_\mu\text{-a.s.}
}
$$

where

$$
\pi(f)=\sum_{x\in S}f(x)\pi(x).
$$

In particular, take

$$
f(y)=\mathbf 1_{\{y=x\}}.
$$

Then

$$
\boxed{
\frac1n\sum_{j=0}^{n}\mathbf 1_{\{X_j=x\}}
\longrightarrow
\pi(x),
\qquad
\mathbb P_\mu\text{-a.s.}
}
$$

Thus \(\pi(x)\) is the long-run proportion of time spent at state \(x\).

Aperiodicity is not required for this time-average result.

---

## Total Variation Distance

For two probability measures \(\mu\) and \(\nu\) on \(S\), their **total variation distance** is

$$
\|\mu-\nu\|_{\mathrm{TV}}
=
\max_{A\subset S}|\mu(A)-\nu(A)|.
$$

For a finite or countable state space,

$$
\boxed{
\|\mu-\nu\|_{\mathrm{TV}}
=
\frac12\sum_{x\in S}|\mu(x)-\nu(x)|.
}
$$

The total variation distance satisfies the triangle inequality:

$$
\|\mu-\nu\|_{\mathrm{TV}}
\le
\|\mu-\eta\|_{\mathrm{TV}}
+
\|\eta-\nu\|_{\mathrm{TV}}.
$$

For every \(y\in S\),

$$
|\mu(y)-\nu(y)|
\le
\|\mu-\nu\|_{\mathrm{TV}}.
$$

---

## Convergence Theorem

**Theorem.** Suppose that \(S\) is finite and \(P\) is irreducible and aperiodic, with stationary distribution \(\pi\). Then there exist constants

$$
\alpha\in(0,1),
\qquad
C>0,
$$

such that

$$
\boxed{
\max_{x\in S}
\|P^n(x,\cdot)-\pi\|_{\mathrm{TV}}
\le C\alpha^n.
}
$$

In particular, for every \(x,y\in S\),

$$
\boxed{
P^n(x,y)\longrightarrow\pi(y).
}
$$

The ergodic theorem and the convergence theorem are different:

- irreducibility is sufficient for convergence of time averages;
- aperiodicity is additionally required for convergence of the distribution at a fixed time.

---

## Recurrence and Transience

For \(x\in S\), recall

$$
\tau_x^+=\inf\{n\ge1:X_n=x\}.
$$

A state \(x\) is called **recurrent** if

$$
\mathbb P_x(\tau_x^+<\infty)=1.
$$

Otherwise, \(x\) is called **transient**.

**Lemma.** Suppose \(P\) is irreducible. The following are equivalent:

1. there exists \(x\in S\) such that

   $$
   \mathbb P_x(\tau_x^+<\infty)=1;
   $$

2. for every \(x,y\in S\),

   $$
   \mathbb P_x(\tau_y<\infty)=1.
   $$

Thus an irreducible Markov chain is either recurrent or transient.

If \(S\) is finite and \(P\) is irreducible, then every state is recurrent.

---

## Positive Recurrence

A recurrent state \(x\) is called **positive recurrent** if

$$
\mathbb E_x[\tau_x^+]<\infty.
$$

If \(x\) is recurrent but

$$
\mathbb E_x[\tau_x^+]=\infty,
$$

then \(x\) is called **null recurrent**.

For an irreducible chain, positive recurrence is a class property: if one state is positive recurrent, then every state is positive recurrent.

**Theorem.** An irreducible Markov chain is positive recurrent if and only if there exists a stationary probability distribution \(\pi\).

In this case, the stationary distribution is unique and

$$
\boxed{
\pi(x)=\frac1{\mathbb E_x[\tau_x^+]},
\qquad x\in S.
}
$$

---

## Ergodic Theorem: Countable State Space

**Theorem.** Let \(f:S\to\mathbb R\) satisfy

$$
\pi(|f|)<\infty.
$$

If \((X_n)\) is irreducible and positive recurrent with stationary distribution \(\pi\), then for every starting distribution \(\mu\),

$$
\boxed{
\frac1n\sum_{j=0}^{n}f(X_j)
\longrightarrow
\pi(f),
\qquad
\mathbb P_\mu\text{-a.s.}
}
$$

In particular,

$$
\frac1n\sum_{j=0}^{n}\mathbf 1_{\{X_j=x\}}
\longrightarrow
\pi(x),
\qquad a.s.
$$

---

## Convergence Theorem: Countable State Space

**Theorem.** Suppose that the Markov chain is irreducible, aperiodic and positive recurrent. Then

$$
\boxed{
\|P^n(x,\cdot)-\pi\|_{\mathrm{TV}}
\longrightarrow0.
}
$$

In particular,

$$
P^n(x,y)\longrightarrow\pi(y)>0.
$$

For an infinite state space, the theorem does not in general give a uniform exponential estimate of the form

$$
C\alpha^n.
$$

---

## Simple Random Walk

Let \((S_n)\) be a simple random walk on \(\mathbb Z^d\) starting from the origin. Define successive return times by

$$
\tau_0=0,
$$

and

$$
\tau_{k+1}
=
\inf\{n>\tau_k:S_n=0\}.
$$

The following statements are equivalent:

1. the random walk is recurrent;
2. the walk returns to the origin almost surely:

   $$
   \mathbb P(\tau_1<\infty)=1;
   $$

3. the expected total number of visits to the origin is infinite:

   $$
   \sum_{m=0}^\infty\mathbb P(S_m=0)=\infty.
   $$

Let

$$
p_d(m)=\mathbb P(S_m=0).
$$

For \(d=1\),

$$
p_1(2n)
=
\binom{2n}{n}2^{-2n}
\sim
\frac1{\sqrt{\pi n}}.
$$

For \(d=2\),

$$
p_2(2n)
=
p_1(2n)^2
\sim
\frac1{\pi n}.
$$

For \(d=3\),

$$
p_3(2n)=O(n^{-3/2}).
$$

Therefore,

$$
\sum_np_1(n)=\infty,
\qquad
\sum_np_2(n)=\infty,
\qquad
\sum_np_3(n)<\infty.
$$

Hence

$$
\boxed{
\text{simple random walk on }\mathbb Z^d
\text{ is recurrent for }d\le2
\text{ and transient for }d\ge3.
}
$$

---

# Galton--Watson Tree

A tree is a connected graph with no cycles. A rooted tree has a distinguished vertex called the root.

The **depth** of a vertex is its graph distance from the root. Vertices at depth \(n\) form the \(n\)-th generation.

In a regular rooted tree, every vertex has exactly \(m\) offspring, so the number of vertices in generation \(n\) is

$$
Z_n=m^n.
$$

In a Galton--Watson tree, the number of offspring is random.

Start with one ancestor:

$$
Z_0=1.
$$

Each individual independently produces a random number of offspring with distribution

$$
p_k=\mathbb P(Z_1=k),
\qquad k\ge0.
$$

If \(\xi_{n,i}\) denotes the number of offspring produced by individual \(i\) in generation \(n\), then

$$
Z_{n+1}
=
\sum_{i=1}^{Z_n}\xi_{n,i}.
$$

The state \(0\) is absorbing.

Define the extinction time

$$
T=\inf\{n\ge0:Z_n=0\},
$$

and the extinction probability

$$
q
=
\mathbb P(Z_n=0\text{ eventually})
=
\mathbb P(T<\infty).
$$

---

## Reproduction Law

The reproduction law is

$$
p_k=\mathbb P(Z_1=k),
\qquad
\sum_{k=0}^\infty p_k=1.
$$

Assume

$$
p_0+p_1<1,
$$

so the reproduction law is nontrivial.

The mean number of offspring is

$$
R_0
=
\mathbb E[Z_1]
=
\sum_{k=0}^\infty kp_k.
$$

Conditioning on \(Z_n\),

$$
\mathbb E[Z_{n+1}\mid Z_n]
=
R_0Z_n.
$$

Taking expectations,

$$
\mathbb E[Z_{n+1}]
=
R_0\mathbb E[Z_n].
$$

Since \(Z_0=1\),

$$
\boxed{
\mathbb E[Z_n]=R_0^n.
}
$$

---

## Generating Function

Define the generating function

$$
f(s)
=
\mathbb E[s^{Z_1}]
=
\sum_{k=0}^\infty p_ks^k,
\qquad 0\le s\le1.
$$

Then

$$
f(0)=p_0,
\qquad
f(1)=1,
\qquad
f'(1)=R_0.
$$

The function \(f\) is increasing and convex.

Conditioning on \(Z_n\),

$$
\begin{aligned}
\mathbb E[s^{Z_{n+1}}\mid Z_n]
&=
\mathbb E\left[
s^{\xi_{n,1}+\cdots+\xi_{n,Z_n}}
\mid Z_n
\right]\\
&=
f(s)^{Z_n}.
\end{aligned}
$$

Let \(f_n\) denote the \(n\)-fold composition of \(f\). Then

$$
\boxed{
\mathbb E[s^{Z_n}]=f_n(s).
}
$$

In particular,

$$
\mathbb P(Z_n=0)=f_n(0).
$$

---

## Extinction Probability

Set

$$
q_n=\mathbb P(Z_n=0)=f_n(0).
$$

Since extinction is permanent,

$$
q_n\uparrow q.
$$

Also,

$$
q_{n+1}=f(q_n).
$$

Taking limits gives

$$
f(q)=q.
$$

If \(s\in[0,1]\) satisfies \(f(s)=s\), then \(q_0=0\le s\), and by induction,

$$
q_n\le s.
$$

Hence \(q\le s\). Therefore,

$$
\boxed{
q\text{ is the smallest solution of }f(s)=s
\text{ in }[0,1].
}
$$

The shape of the generating function gives

$$
\boxed{
\begin{cases}
R_0<1 &\Longrightarrow q=1,\\
R_0=1 &\Longrightarrow q=1,\\
R_0>1 &\Longrightarrow q<1.
\end{cases}
}
$$

Thus:

- \(R_0<1\): extinction occurs almost surely;
- \(R_0=1\): extinction occurs almost surely;
- \(R_0>1\): survival has positive probability \(1-q\).

---

## Subcritical Case

Suppose

$$
R_0<1
$$

and

$$
\sigma^2
=
\operatorname{Var}(Z_1)
=
\sum_{k=0}^\infty(k-R_0)^2p_k
<\infty.
$$

Then there exists \(C>0\) such that

$$
\boxed{
\mathbb P(T>n)\sim CR_0^n.
}
$$

Thus the survival probability decays exponentially.

---

## Critical Case

Suppose

$$
R_0=1
$$

and

$$
\sigma^2=\operatorname{Var}(Z_1)<\infty.
$$

Then

$$
\boxed{
\mathbb P(T>n)
\sim
\frac{2}{\sigma^2n}.
}
$$

Extinction still occurs almost surely, but the survival probability decays only at rate \(1/n\).

---

## Supercritical Case

Suppose

$$
R_0>1.
$$

Then the survival probability is

$$
1-q>0.
$$

Define

$$
W_n=\frac{Z_n}{R_0^n}.
$$

Let \(\mathcal F_n\) be the information up to generation \(n\). Since

$$
\mathbb E[Z_{n+1}\mid\mathcal F_n]
=
R_0Z_n,
$$

we have

$$
\mathbb E[W_{n+1}\mid\mathcal F_n]
=
W_n.
$$

Thus \((W_n)\) is a nonnegative martingale. By the martingale convergence theorem,

$$
\boxed{
W_n\longrightarrow W,
\qquad a.s.
}
$$

The Kesten--Stigum theorem states that

$$
\boxed{
\mathbb E[W]=1
\iff
\mathbb P(W>0\mid\text{survival})=1
\iff
\mathbb E[Z_1\log^+Z_1]<\infty,
}
$$

where

$$
\log^+x=\max\{\log x,0\}.
$$

Under this condition, on the survival event,

$$
Z_n\approx WR_0^n,
$$

so the population grows exponentially.