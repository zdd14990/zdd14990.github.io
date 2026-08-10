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

**Proof.** We first establish the maximal inequalities used in the proof.

---

**Lemma 1:** Let \(Z_1,\ldots,Z_n\) be independent random variables satisfying

$$
\mathbb E[Z_j]=0,\qquad \mathbb E[Z_j^2]<\infty,
$$

and put \(R_k=\sum_{j=1}^k Z_j\). Then, for every \(\varepsilon>0\),

$$
\mathbb P\left(\max_{1\le k\le n}|R_k|\ge\varepsilon\right)
\le
\frac{\operatorname{Var}(R_n)}{\varepsilon^2}.
$$

For \(1\le k\le n\), define the first-exit events

$$
E_k=
\{|R_1|<\varepsilon,\ldots,|R_{k-1}|<\varepsilon,\ |R_k|\ge\varepsilon\}.
$$

The events \(E_k\) are pairwise disjoint and

$$
\bigcup_{k=1}^n E_k
=
\left\{\max_{1\le k\le n}|R_k|\ge\varepsilon\right\}.
$$

Since \(E_k\) and \(R_k\) depend only on \(Z_1,\ldots,Z_k\), while \(R_n-R_k\) is independent of them and has mean \(0\),

$$
\begin{aligned}
\mathbb E[R_n^2\mathbf 1_{E_k}]
&=
\mathbb E[(R_k+R_n-R_k)^2\mathbf 1_{E_k}]\\
&=
\mathbb E[R_k^2\mathbf 1_{E_k}]
+
\mathbb P(E_k)\mathbb E[(R_n-R_k)^2]\\
&\ge
\varepsilon^2\mathbb P(E_k).
\end{aligned}
$$

Summing over \(k\),

$$
\operatorname{Var}(R_n)
=
\mathbb E[R_n^2]
\ge
\varepsilon^2
\mathbb P\left(\max_{1\le k\le n}|R_k|\ge\varepsilon\right),
$$

which proves the inequality.

As a consequence, if \((Z_n)\) are independent and centered and

$$
\sum_n\operatorname{Var}(Z_n)<\infty,
$$

then \(\sum_n Z_n\) converges almost surely. Indeed, choose \(N_r\uparrow\infty\) such that

$$
\sum_{j>N_r}\operatorname{Var}(Z_j)\le 2^{-3r}.
$$

Kolmogorov's inequality gives

$$
\mathbb P\left(
\sup_{k>N_r}\left|\sum_{j=N_r+1}^k Z_j\right|>2^{-r}
\right)
\le
2^{2r}\sum_{j>N_r}\operatorname{Var}(Z_j)
\le 2^{-r}.
$$

The right-hand side is summable, so the Borel--Cantelli lemma shows that the partial sums of \(\sum_n Z_n\) satisfy the Cauchy criterion almost surely.

---

**Lemma 2:** Let \(Z_1,\ldots,Z_n\) be independent centered random variables satisfying \(|Z_j|\le C\) a.s., and put \(R_k=\sum_{j=1}^k Z_j\). Then

$$
\mathbb P\left(\max_{1\le k\le n}|R_k|\le B\right)
\le
\frac{(B+C)^2}{\operatorname{Var}(R_n)}.
$$

This centered form is sufficient for the proof below and is slightly sharper than the corresponding estimate stated in the slides.

Let

$$
E=\left\{\max_{1\le k\le n}|R_k|\le B\right\},
\qquad
p=\mathbb P(E),
$$

and let \(E_k\) be the event that \(R_k\) is the first partial sum to leave \([-B,B]\). On \(E_k\),

$$
|R_k|\le B+C.
$$

As in the proof of Lemma 1,

$$
\begin{aligned}
\mathbb E[R_n^2\mathbf 1_{E_k}]
&=
\mathbb E[R_k^2\mathbf 1_{E_k}]
+
\mathbb P(E_k)\mathbb E[(R_n-R_k)^2]\\
&\le
(B+C)^2\mathbb P(E_k)
+
\operatorname{Var}(R_n)\mathbb P(E_k).
\end{aligned}
$$

Also, \(|R_n|\le B\) on \(E\). Therefore,

$$
\begin{aligned}
\operatorname{Var}(R_n)
&=
\mathbb E[R_n^2\mathbf 1_E]
+
\sum_{k=1}^n\mathbb E[R_n^2\mathbf 1_{E_k}]\\
&\le
B^2p+(B+C)^2(1-p)+\operatorname{Var}(R_n)(1-p).
\end{aligned}
$$

Hence

$$
p\,\operatorname{Var}(R_n)
\le
B^2p+(B+C)^2(1-p)
\le
(B+C)^2,
$$

which gives the desired inequality.

---

**Lemma 3:** Let \((U_n)\) be independent and suppose that \(|U_n|\le A\) a.s. If

$$
\sum_n U_n
$$

converges almost surely, then

$$
\sum_n\operatorname{Var}(U_n)<\infty
$$

and the numerical series

$$
\sum_n\mathbb E[U_n]
$$

converges.

Let \((U_n')\) be an independent copy of \((U_n)\), defined on a product probability space, and set

$$
Z_n=U_n-U_n'.
$$

Then the \(Z_n\)'s are independent and centered,

$$
|Z_n|\le 2A,
\qquad
\operatorname{Var}(Z_n)=2\operatorname{Var}(U_n),
$$

and \(\sum_n Z_n\) converges almost surely.

Consequently,

$$
\sup_{k>m}\left|\sum_{j=m+1}^k Z_j\right|\to0
\qquad\text{a.s.}
$$

Thus, for all sufficiently large \(m\) and every \(n>m\),

$$
\mathbb P\left(
\max_{m<k\le n}
\left|\sum_{j=m+1}^k Z_j\right|\le1
\right)\ge\frac12.
$$

Applying Lemma 2 to \(Z_{m+1},\ldots,Z_n\),

$$
\frac12
\le
\frac{(1+2A)^2}
{\sum_{j=m+1}^n\operatorname{Var}(Z_j)}.
$$

Hence

$$
\sum_{j=m+1}^n\operatorname{Var}(Z_j)
\le
2(1+2A)^2.
$$

Letting \(n\to\infty\),

$$
\sum_n\operatorname{Var}(Z_n)<\infty,
$$

and therefore

$$
\sum_n\operatorname{Var}(U_n)<\infty.
$$

By Lemma 1,

$$
\sum_n\bigl(U_n-\mathbb E[U_n]\bigr)
$$

converges almost surely. Since \(\sum_nU_n\) also converges almost surely, their difference

$$
\sum_{j=1}^n\mathbb E[U_j]
=
\sum_{j=1}^nU_j
-
\sum_{j=1}^n\bigl(U_j-\mathbb E[U_j]\bigr)
$$

converges. Hence \(\sum_n\mathbb E[U_n]\) converges.

---

"$\Longleftarrow$"

Assume that

$$
\sum_n\mathbb P(|X_n|>A)<\infty,
\qquad
\sum_n\mathbb E[Y_n]\ \text{converges},
\qquad
\sum_n\operatorname{Var}(Y_n)<\infty.
$$

By the first Borel--Cantelli lemma,

$$
\mathbb P(|X_n|>A\ \text{i.o.})=0,
$$

so \(X_n=Y_n\) eventually almost surely.

Set

$$
Z_n=Y_n-\mathbb E[Y_n].
$$

Then the \(Z_n\)'s are independent and centered, and

$$
\sum_n\operatorname{Var}(Z_n)
=
\sum_n\operatorname{Var}(Y_n)<\infty.
$$

By Lemma 1, \(\sum_nZ_n\) converges almost surely. Since \(\sum_n\mathbb E[Y_n]\) converges,

$$
\sum_nY_n
=
\sum_nZ_n+\sum_n\mathbb E[Y_n]
$$

converges almost surely. Since \(X_n=Y_n\) eventually,

$$
\sum_nX_n
$$

also converges almost surely.

---

"$\Longrightarrow$"

Assume that

$$
\sum_nX_n
$$

converges almost surely. Then \(X_n\to0\) almost surely, so

$$
\mathbb P(|X_n|>A\ \text{i.o.})=0.
$$

The events \(\{|X_n|>A\}\) are independent. By the second Borel--Cantelli lemma,

$$
\sum_n\mathbb P(|X_n|>A)<\infty.
$$

Moreover, \(X_n=Y_n\) eventually almost surely, so \(\sum_nY_n\) converges almost surely. Since \(|Y_n|\le A\), Lemma 3 gives

$$
\sum_n\operatorname{Var}(Y_n)<\infty
$$

and

$$
\sum_n\mathbb E[Y_n]
$$

converges. Thus all three series converge.

Therefore,

$$
\sum_nX_n\text{ converges a.s.}
\quad\Longleftrightarrow\quad
\begin{cases}
\displaystyle \sum_n\mathbb P(|X_n|>A)<\infty,\\[2mm]
\displaystyle \sum_n\mathbb E[Y_n]\text{ converges},\\[2mm]
\displaystyle \sum_n\operatorname{Var}(Y_n)<\infty.
\end{cases}
$$

Finally, if the criterion holds for one value of \(A>0\), the series \(\sum_nX_n\) converges almost surely; the necessity part then shows that the criterion holds for every \(A>0\).



---

## Maximal Growth

For i.i.d. nonnegative random variables, the behavior of

$$
\max_{1\le j\le n}X_j
$$

is controlled by the tail of $X_1$. In many applications, the largest summand explains why a law of large numbers fails when $\mathbb{E}|X_1|=\infty$.
