---
title: GTM295 Chapter 10
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

# GTM295 Chapter 10

---

**Exercise 10.1** In this exercise, to emphasize the dependence on the underlying probability measure, we speak of convergence in $\mathbb{P}$-probability instead of convergence in probability. Let $(X_n)_{n\in\mathbb{N}}$ be a sequence of real random variables such that $X_n$ converges in $\mathbb{P}$-probability to $X$ when $n\to\infty$. Suppose that $\mathbb{P}'$ is another probability measure on $(\Omega,\mathcal{A})$ and that $\mathbb{P}'$ is absolutely continuous with respect to $\mathbb{P}$. Show that $X_n$ also converges in $\mathbb{P}'$-probability to $X$ when $n\to\infty$.

**Solution.** By radon-nikodym theorem, there exists a nonnegative random variable $Z$ such that $\mathbb{E}[Z]=1$ and, for every $A\in\mathcal{A}$,

$$
\mathbb{P}'(A)=\mathbb{E}[Z\mathbf{1}_A].
$$

we want to prove that $\forall \epsilon>0$, $\exist \delta>0$, s.t. $\forall \mathbb{P}(A)<\delta$, $\mathbb{P}'(A)<\epsilon$. Because $Z\in L^1$, $\exist M>0$, s.t. $\mathbb{E}[Z\mathbf{1}_{\{Z>M\}}]<\epsilon/2$. 

$$
\begin{aligned}
\mathbb{P}'(A)&=\mathbb{E}[Z\mathbf{1}_A]\\
&=\mathbb{E}[Z\mathbf{1}_{A\cap\{Z\le M\}}]+\mathbb{E}[Z\mathbf{1}_{A\cap\{Z>M\}}]\\
&\le M\mathbb{P}(A)+\mathbb{E}[Z\mathbf{1}_{\{Z>M\}}]\\
(\delta = \frac{\epsilon}{2M})&< \epsilon
\end{aligned}
$$

Set $A_n^\epsilon=\{|X_n-X|>\epsilon\}$, then $\mathbb{P}(A_n^\epsilon)\to 0$ as $n\to\infty$, so $\mathbb{P}'(A_n^\epsilon)\to 0$ as $n\to\infty$. This implies that $X_n$ converges in $\mathbb{P}'$-probability to $X$ when $n\to\infty$. 

---

**Solution.** Let \(X_1,X_2,\ldots\) be independent random variables uniformly distributed on \([0,1]\), and set

$$
S_n=X_1+\cdots+X_n.
$$

Then

$$
\int_{[0,1]^n}f\left(\frac{x_1+\cdots+x_n}{n}\right)\,dx_1\cdots dx_n
=
\mathbb E\left[f\left(\frac{S_n}{n}\right)\right].
$$

By the strong law of large numbers,

$$
\frac{S_n}{n}\to \mathbb E[X_1]=\frac12
\qquad \text{a.s.}
$$

Since \(f\) is continuous,

$$
f\left(\frac{S_n}{n}\right)\to f\left(\frac12\right)
\qquad \text{a.s.}
$$

Moreover, \(f\) is continuous on the compact interval \([0,1]\), hence bounded. Therefore, by the dominated convergence theorem,

$$
\lim_{n\to\infty}
\mathbb E\left[f\left(\frac{S_n}{n}\right)\right]
=
\mathbb E\left[f\left(\frac12\right)\right]
=
f\left(\frac12\right).
$$

Thus,

$$
\lim_{n\to\infty}\int_{[0,1]^n}f\left(\frac{x_1+\cdots+x_n}{n}\right)\,dx_1\cdots dx_n
=
f\left(\frac12\right).
$$

---

**Exercise 10.3 (Bernstein Polynomials)** Let $f:[0,1]\to\mathbb{R}$ be a continuous function. Prove that, for every $p\in[0,1]$,

$$
f(p)=\lim_{n\to\infty}\sum_{k=0}^n\binom{n}{k}p^k(1-p)^{n-k}f(k/n),
$$

and that the convergence holds uniformly in $p\in[0,1]$.

**Solution.**


---

**Exercise 10.4**

1. Let $f:\mathbb{R}_+\to\mathbb{R}$ be a bounded continuous function. Prove that, for every $\lambda>0$,

    $$
    \lim_{n\to\infty}e^{-\lambda n}\sum_{k=0}^\infty\frac{(\lambda n)^k}{k!}f(k/n)=f(\lambda),
    $$

    and that the convergence is uniform when $\lambda$ varies in a bounded subset of $(0,\infty)$.

2. Suppose that $f$ is only bounded and measurable, and is continuous at $x=\lambda$. Prove that the convergence in $(10.6)$ still holds.

3. Let $\mu$ be a probability measure on $\mathbb{R}_+$, and let $L(\lambda)=\int e^{-\lambda y}\mu(dy)$, for $\lambda\ge0$, be its Laplace transform. For every $\lambda>0$, write $L^{(k)}(\lambda)$ for the $k$-th derivative of $L$ at $\lambda$ (justify its existence!). Prove that, for every $x\in[0,\infty)$ such that $\mu(\{x\})=0$,

    $$
    \mu([0,x])
    =
    \lim_{n\to\infty}\sum_{k=0}^{\lfloor nx\rfloor}
    \frac{(-1)^k}{k!}n^kL^{(k)}(n).
    $$

**Solution.** (1) Set $Y_{n,\lambda}~\text{Poisson}(\lambda n)$, then

$$
\mathbb E[f(Y_{n,\lambda}/n)]=e^{-\lambda n}\sum_{k=0}^\infty\frac{(\lambda n)^k}{k!}f(k/n).
$$



$$
\mathbb{P}\left(|Y_{n,\lambda}/n-\lambda|>\varepsilon\right)\le \frac{\operatorname{var}(Y_{n,\lambda}/n)}{\varepsilon^2}=\frac{\lambda}{n\varepsilon^2}\to 0.
$$

So

$$
\frac{Y_{n,\lambda}}{n}\to\lambda \quad \text{in probability}.
$$

since $f$ is continuous,

$$
f\left(\frac{Y_{n,\lambda}}{n}\right)\to f(\lambda) \quad \text{in probability}.
$$

Since $f$ is bounded, by dominated convergence theorem,

$$
\lim_{n\to\infty}\mathbb E[f(Y_{n,\lambda}/n)]=f(\lambda).
$$

Set $0<\lambda<R$ for some $R>0$, then $f$ is uniformly continuous on $[0,R+1]$, so for any $\epsilon>0$, $\exists \delta>0$, s.t. $|f(x)-f(y)|<\epsilon$ when $|x-y|<\delta$.

$$
\left|f\left(\frac{Y_{n,\lambda}}{n}\right)-f(\lambda)\right|<\begin{cases}
    \epsilon &, \text{if } \left|\frac{Y_{n,\lambda}}{n}-\lambda\right|<\delta\\
    2M &, \text{otherwise}.
\end{cases}
$$

so

$$
\begin{aligned}
    \left|\mathbb{E}\left[f\left(\frac{Y_{n,\lambda}}{n}\right)\right]-f(\lambda)\right|\le& \epsilon+2M\mathbb{P}\left(\left|\frac{Y_{n,\lambda}}{n}-\lambda\right|\ge \delta\right)\\
    \le& \epsilon+2M\frac{\mathrm{var}(Y_{n,\lambda}/n)}{\delta^2}= \epsilon+\frac{2M\lambda}{n\delta^2}.
\end{aligned}
$$

we have

$$
\limsup_{n\to\infty}\sup_{\lambda\in[0,R]}\left|\mathbb{E}\left[f\left(\frac{Y_{n,\lambda}}{n}\right)\right]-f(\lambda)\right|\le \epsilon.
$$

for any $\epsilon>0$, so the convergence is uniform in $\lambda\in[0,R]$.

(3) 

$$
L^{(k)}(\lambda)=\int (-y)^ke^{-\lambda y}\mu(dy).
$$

Set $Y_{n,y}~\text{Poisson}(ny)$, then

$$
RHS=\int \sum_{k=0}^{\lfloor nx\rfloor}\frac{(-1)^k}{k!}n^k(-y)^ke^{-ny}\mu(dy):=\int_{\mathbb{R}_+}g_n(y)\mu(dy).
$$

$$
\begin{aligned}
    g_n(y)&=\mathbb{P}\left(\frac{Y_{n,y}}{n}\le \frac{\lfloor nx\rfloor}{n}\right) &\to \mathbf{1}_{[0,x]}(y)(\frac{\lfloor nx\rfloor}{n}\to x, \frac{Y_{n,y}}{n}\to y \text{ in probability})
\end{aligned}
$$


---

**Exercise 10.5 (Coupon Collector Problem)** Suppose that, for every $n\in\mathbb{N}$, $(X_k^{(n)})_{k\ge1}$ is a sequence of independent random variables uniformly distributed on $\{1,2,\ldots,n\}$. For every integer $m\ge1$, let $N_m^{(n)}$ be the number of distinct values in the finite sequence $X_1^{(n)},X_2^{(n)},\ldots,X_m^{(n)}$, and set

$$
T_n=\inf\{m\ge1:N_m^{(n)}=n\}.
$$

If we observe the values $X_1^{(n)},X_2^{(n)},\ldots$ one after the other, $T_n$ is the first time when all possible values have been observed.

1. For every $k\in\{1,\ldots,n\}$, set $\tau_k^{(n)}=\inf\{m\ge1:N_m^{(n)}=k\}$, so that in particular $T_n=\tau_n^{(n)}$. Show that the random variables $\tau_k^{(n)}-\tau_{k-1}^{(n)}$, for $k\in\{2,\ldots,n\}$, are independent, and the distribution of $\tau_k^{(n)}-\tau_{k-1}^{(n)}-1$ is geometric of parameter $(k-1)/n$.

2. Prove that

    $$
    \frac{T_n}{n\log n}\xrightarrow[n\to\infty]{}1
    $$

    in probability. (*Hint:* Estimate the expected value and the variance of $T_n$.)

**Solution.** (2)

By part (1), we can write

$$
T_n=\tau_n^{(n)}
=
1+\sum_{k=2}^n\left(\tau_k^{(n)}-\tau_{k-1}^{(n)}\right):=1+\sum_{k=2}^n D_k^{(n)}.
$$

$$
\mathbb E[D_k^{(n)}]
=
\frac{n}{n-k+1},

\operatorname{var}(D_k^{(n)})
=
\frac{n(k-1)}{(n-k+1)^2}.
$$

Therefore,

$$
\mathbb E[T_n]=
nH_n,
H_n=\sum_{j=1}^n\frac1j.
$$

Since $H_n\sim \log n,$ we have

$$
\frac{\mathbb E[T_n]}{n\log n}
=
\frac{H_n}{\log n}
\to 1.
$$

Next, by the independence from part (1),

$$
\operatorname{var}(T_n)
=
\sum_{k=2}^n \operatorname{var}(D_k^{(n)})
=
\sum_{k=2}^n
\frac{n(k-1)}{(n-k+1)^2}\le Cn^2.
$$

Therefore, for every \(\varepsilon>0\), Chebyshev's inequality gives

$$
\begin{aligned}
\mathbb P\left(
\left|
\frac{T_n-\mathbb E[T_n]}{n\log n}
\right|>\varepsilon
\right)
&\le
\frac{\operatorname{var}(T_n)}
{\varepsilon^2 n^2(\log n)^2}\\
&\le
\frac{C}{\varepsilon^2(\log n)^2}
\to0.
\end{aligned}
$$

So

$$
\frac{T_n-\mathbb E[T_n]}{n\log n}
\xrightarrow[n\to\infty]{\mathbb P}0.
$$

$$
\frac{T_n}{n\log n}
=
\frac{T_n-\mathbb E[T_n]}{n\log n}
+
\frac{\mathbb E[T_n]}{n\log n}
\xrightarrow[n\to\infty]{\mathbb P}1.
$$

---

**Exercise 10.6** Let $(X_n)_{n\in\mathbb{N}}$ and $(Y_n)_{n\in\mathbb{N}}$ be two sequences of real random variables, and let $X$ and $Y$ be two real random variables. Is it always true that the properties

$$
X_n\xrightarrow[n\to\infty]{(d)}X
\quad\text{and}\quad
Y_n\xrightarrow[n\to\infty]{(d)}Y
$$

imply that $(X_n,Y_n)\xrightarrow[n\to\infty]{(d)}(X,Y)$? Show that this fact holds in each of the following two cases:

1. The random variable $Y$ is constant a.s.

2. For every $n\in\mathbb{N}$, $X_n$ and $Y_n$ are independent, and $X$ and $Y$ are independent.

**Solution.** Not true, 

In general, the conclusion is not true. Let \(Z\sim \mathcal N(0,1)\), and set $X_n=Z,Y_n=Z.$


(1) Assume $Y=c$ a.s. Since $Y_n\xrightarrow{d}Y=c$, we have $Y_n\xrightarrow{\mathbb P}c$. We prove that \((X_n,Y_n)\xrightarrow{d}(X,c)\). 

Let \(\varphi:\mathbb R^2\to\mathbb R\) be bounded and continuous. We need to prove

$$
\mathbb E[\varphi(X_n,Y_n)]
\to
\mathbb E[\varphi(X,c)].
$$

Write

$$
\begin{aligned}
&\left|
\mathbb E[\varphi(X_n,Y_n)]
-
\mathbb E[\varphi(X,c)]
\right|\\
&\le
\left|
\mathbb E[\varphi(X_n,Y_n)]
-
\mathbb E[\varphi(X_n,c)]
\right|
+
\left|
\mathbb E[\varphi(X_n,c)]
-
\mathbb E[\varphi(X,c)]
\right|.
\end{aligned}
$$

For the second term, define $g(x)=\varphi(x,c).$ Then \(g\) is bounded and continuous on \(\mathbb R\). Since $X_n\xrightarrow{d}X,$ we get

$$
\mathbb E[g(X_n)]\to \mathbb E[g(X)].
$$

Thus

$$
\mathbb E[\varphi(X_n,c)]\to \mathbb E[\varphi(X,c)].
$$

It remains to prove

$$
\mathbb E[\varphi(X_n,Y_n)]
-
\mathbb E[\varphi(X_n,c)]
\to 0.
$$

Let $M=\|\varphi\|_\infty.$ Since \(X_n\xrightarrow{d}X\), the sequence \((X_n)\) is tight. Hence for every \(\eta>0\), there exists \(K>0\) such that

$$
\sup_n \mathbb P(|X_n|>K)<\eta.
$$

On the compact set $[-K,K]\times[c-1,c+1],$ the function \(\varphi\) is uniformly continuous. Hence for every \(\varepsilon>0\), there exists \(\delta\in(0,1)\) such that whenever $|x|\le K,|y-c|<\delta,$ we have

$$
|\varphi(x,y)-\varphi(x,c)|<\varepsilon.
$$

Therefore,

$$
\begin{aligned}
&\mathbb E\left[
|\varphi(X_n,Y_n)-\varphi(X_n,c)|
\right]\\
&\le
\varepsilon
+
2M\mathbb P(|X_n|>K)
+
2M\mathbb P(|Y_n-c|\ge \delta).
\end{aligned}
$$

Since $Y_n\xrightarrow{\mathbb P}c,$ we have $\mathbb P(|Y_n-c|\ge\delta)\to0.$ Thus

$$
\limsup_{n\to\infty}
\mathbb E\left[
|\varphi(X_n,Y_n)-\varphi(X_n,c)|
\right]
\le
\varepsilon+2M\eta.
$$

Since \(\varepsilon>0\) and \(\eta>0\) are arbitrary,

$$
\mathbb E\left[
|\varphi(X_n,Y_n)-\varphi(X_n,c)|
\right]\to0.
$$

Hence

$$
\mathbb E[\varphi(X_n,Y_n)]
\to
\mathbb E[\varphi(X,c)].
$$

Therefore,

$$
\boxed{
(X_n,Y_n)\xrightarrow{d}(X,c).
}
$$

(2) Assume that for every \(n\), \(X_n\) and \(Y_n\) are independent, and \(X\) and \(Y\) are independent. Let $\varphi_n(s,t)=\mathbb E[e^{i(sX_n+tY_n)}]$ be the characteristic function of \((X_n,Y_n)\). Since \(X_n\) and \(Y_n\) are independent,

$$
\begin{aligned}
\varphi_n(s,t)
&=
\mathbb E[e^{isX_n}e^{itY_n}]\\
&=
\mathbb E[e^{isX_n}]
\mathbb E[e^{itY_n}]\\
&=
\varphi_{X_n}(s)\varphi_{Y_n}(t).
\end{aligned}
$$

Since $X_n\xrightarrow{d}X,$ we have $\varphi_{X_n}(s)\to \varphi_X(s),\forall s\in\mathbb R.$ Similarly, $\varphi_{Y_n}(t)\to \varphi_Y(t),\forall t\in\mathbb R.$ Hence for every \((s,t)\in\mathbb R^2\),

$$
\varphi_n(s,t)
=
\varphi_{X_n}(s)\varphi_{Y_n}(t)
\to
\varphi_X(s)\varphi_Y(t).
$$

Since \(X\) and \(Y\) are independent,

$$
\varphi_X(s)\varphi_Y(t)
=
\mathbb E[e^{isX}]
\mathbb E[e^{itY}]
=
\mathbb E[e^{i(sX+tY)}].
$$

Thus $\varphi_X(s)\varphi_Y(t)$ is exactly the characteristic function of \((X,Y)\). Therefore the characteristic functions of \((X_n,Y_n)\) converge pointwise to the characteristic function of \((X,Y)\). By the continuity theorem for characteristic functions,

$$
\boxed{
(X_n,Y_n)\xrightarrow{d}(X,Y).
}
$$

---

**Exercise 10.7** Let $\mu$ be a probability measure on $\mathbb{R}$, and, for every $n\in\mathbb{N}$,

$$
\mu_n(dx)=\sum_{k\in\mathbb{Z}}\mu([k2^{-n},(k+1)2^{-n}))\,\delta_{k2^{-n}}(dx).
$$

Show that the sequence $\mu_n$ converges weakly to $\mu$.


**Solution.** Define $q_n(x)=2^{-n}\lfloor 2^n x\rfloor .$ Hence

$$
0\le x-q_n(x)<2^{-n},
$$

so \(q_n(x)\to x\) for every \(x\in\mathbb R\). Let \(f:\mathbb R\to\mathbb R\) be bounded and continuous. By the definition of \(\mu_n\),

$$
\int f\,d\mu_n
=
\sum_{k\in\mathbb Z} f(k2^{-n})\mu([k2^{-n},(k+1)2^{-n})).
$$

Since \(q_n(x)=k2^{-n}\) on \([k2^{-n},(k+1)2^{-n})\), we also have

$$
\int f(q_n(x))\,\mu(dx)
=
\sum_{k\in\mathbb Z}
\int_{[k2^{-n},(k+1)2^{-n})} f(k2^{-n})\,\mu(dx)
=
\int f\,d\mu_n.
$$

Thus

$$
\int f\,d\mu_n=\int f(q_n(x))\,\mu(dx).
$$

Since \(q_n(x)\to x\) and \(f\) is continuous,

$$
f(q_n(x))\to f(x).
$$

Moreover,

$$
|f(q_n(x))|\le \|f\|_\infty.
$$

By the dominated convergence theorem,

$$
\int f(q_n(x))\,\mu(dx)\to \int f(x)\,\mu(dx).
$$

Therefore,

$$
\int f\,d\mu_n\to \int f\,d\mu.
$$

Since this holds for every bounded continuous function \(f\), we conclude that

$$
\mu_n\Rightarrow \mu.
$$

---

**Exercise 10.8** Suppose that, for every $n\in\mathbb{N}$, $Y_n$ is a Gaussian $\mathcal{N}(m_n,\sigma_n^2)$ random variable, where $m_n\in\mathbb{R}$ and $\sigma_n>0$. Prove that the sequence $(Y_n)_{n\in\mathbb{N}}$ converges in distribution if and only if the two sequences $(m_n)$ and $(\sigma_n)$ converge, and identify the limiting distribution in that case.

**Solution.**

Assume $m_n\to m, \sigma_n\to \sigma,$ where necessarily \(\sigma\ge0\). The characteristic function of \(Y_n\) is

$$
\varphi_n(t)=\mathbb E[e^{itY_n}]
=
\exp\left(itm_n-\frac12\sigma_n^2t^2\right).
$$

Hence, for every \(t\in\mathbb R\),

$$
\varphi_n(t)\to
\exp\left(itm-\frac12\sigma^2t^2\right).
$$

If \(\sigma>0\), this is the characteristic function of \(\mathcal N(m,\sigma^2)\). If \(\sigma=0\), it is \(e^{itm}\), the characteristic function of the degenerate distribution \(\delta_m\).

By the continuity theorem for characteristic functions,

$$
Y_n\xrightarrow{d}
\begin{cases}
\mathcal N(m,\sigma^2), & \sigma>0,\\
\delta_m, & \sigma=0.
\end{cases}
$$

Assume $Y_n\xrightarrow{d}Y.$ Then \((Y_n)\) is tight. We first show that \((m_n)\) is bounded. If \(|m_n|>K\), then by symmetry of the Gaussian distribution around \(m_n\),

$$
\mathbb P(|Y_n|>K)\ge \frac12.
$$

For example, if \(m_n>K\), then

$$
\mathbb P(|Y_n|>K)\ge \mathbb P(Y_n>K)\ge \mathbb P(Y_n\ge m_n)=\frac12,
$$

and the case \(m_n<-K\) is analogous. This contradicts tightness for large \(K\). Hence \((m_n)\) is bounded.

Next we show that \((\sigma_n)\) is bounded. Suppose not. Then there is a subsequence \((n_j)\) such that \(\sigma_{n_j}\to\infty\). Since \((m_n)\) is bounded, say \(|m_n|\le M\), for every fixed \(K>0\),

$$
\mathbb P(|Y_{n_j}|\le K)
=
\mathbb P\left(
\frac{-K-m_{n_j}}{\sigma_{n_j}}
\le Z\le
\frac{K-m_{n_j}}{\sigma_{n_j}}
\right),
\qquad Z\sim \mathcal N(0,1).
$$

The interval on the right has length \(2K/\sigma_{n_j}\to0\). Since the standard Gaussian density is bounded,

$$
\mathbb P(|Y_{n_j}|\le K)\to0,
$$

so \(\mathbb P(|Y_{n_j}|>K)\to1\), contradicting tightness. Therefore \((\sigma_n)\) is bounded.

Thus \((m_n,\sigma_n)\) is bounded in \(\mathbb R\times[0,\infty)\). Every subsequence has a further subsequence such that

$$
m_{n_j}\to m,\qquad \sigma_{n_j}\to\sigma
$$

for some \(\sigma\ge0\). Along this subsequence,

$$
\varphi_{n_j}(t)
=
\exp\left(itm_{n_j}-\frac12\sigma_{n_j}^2t^2\right)
\to
\exp\left(itm-\frac12\sigma^2t^2\right).
$$

Hence \(Y_{n_j}\) converges in distribution to \(\mathcal N(m,\sigma^2)\) if \(\sigma>0\), and to \(\delta_m\) if \(\sigma=0\). But since the whole sequence \(Y_n\) converges in distribution to \(Y\), every subsequential limit must be the same.

The parameters are unique: if

$$
\exp\left(itm-\frac12\sigma^2t^2\right)
=
\exp\left(itm'-\frac12(\sigma')^2t^2\right),
\qquad \forall t\in\mathbb R,
$$

then comparing absolute values gives \(\sigma=\sigma'\), and then \(e^{it(m-m')}=1\) for all \(t\), so \(m=m'\).

Therefore all convergent subsequences of \((m_n,\sigma_n)\) have the same limit. Since \((m_n,\sigma_n)\) is bounded, this implies that the whole sequence converges:

$$
m_n\to m,\qquad \sigma_n\to\sigma.
$$

---

**Exercise 10.9** Let $(Z_n)_{n\in\mathbb{N}}$ be a sequence of random variables with values in $\mathbb{R}^d$, and let $(a_n)_{n\in\mathbb{N}}$ be a sequence of reals. Assume that $Z_n$ converges in distribution to $Z$ and $a_n$ converges to $a$ as $n\to\infty$. Prove that $a_nZ_n$ converges in distribution to $aZ$. (*Hint:* Use Proposition 10.12, and note that the space $H$ in this proposition can be chosen to contain only Lipschitz functions.)

**Solution.** By Proposition 10.12, it is enough to prove that for every bounded Lipschitz function \(f:\mathbb R^d\to\mathbb R\),

$$
\mathbb E[f(a_nZ_n)]\to \mathbb E[f(aZ)].
$$

Let \(f\) be bounded and Lipschitz. Write

$$
|f(x)-f(y)|\le L|x-y|,
\qquad
|f(x)|\le M.
$$

Then

$$
\begin{aligned}
\left|\mathbb E[f(a_nZ_n)]-\mathbb E[f(aZ)]\right|
&\le
\left|\mathbb E[f(a_nZ_n)]-\mathbb E[f(aZ_n)]\right|\\
&\quad+
\left|\mathbb E[f(aZ_n)]-\mathbb E[f(aZ)]\right|.
\end{aligned}
$$

For the second term, define \(g(z)=f(az)\). Since \(g\) is bounded and continuous, and \(Z_n\xrightarrow{d}Z\), we have

$$
\mathbb E[f(aZ_n)]
=
\mathbb E[g(Z_n)]
\to
\mathbb E[g(Z)]
=
\mathbb E[f(aZ)].
$$

Hence the second term tends to \(0\).

Now consider the first term. Since \(Z_n\xrightarrow{d}Z\), the sequence \((Z_n)\) is tight. Thus for every \(\eta>0\), there exists \(R>0\) such that

$$
\sup_n\mathbb P(|Z_n|>R)<\eta.
$$

Then

$$
\begin{aligned}
&\left|\mathbb E[f(a_nZ_n)]-\mathbb E[f(aZ_n)]\right|\\
&\le
\mathbb E\left[|f(a_nZ_n)-f(aZ_n)|;\ |Z_n|\le R\right]
+
\mathbb E\left[|f(a_nZ_n)-f(aZ_n)|;\ |Z_n|>R\right].
\end{aligned}
$$

On \(\{|Z_n|\le R\}\), by the Lipschitz property,

$$
|f(a_nZ_n)-f(aZ_n)|
\le L|(a_n-a)Z_n|
\le L|a_n-a|R.
$$

On \(\{|Z_n|>R\}\), by boundedness of \(f\),

$$
|f(a_nZ_n)-f(aZ_n)|\le 2M.
$$

Therefore,

$$
\left|\mathbb E[f(a_nZ_n)]-\mathbb E[f(aZ_n)]\right|
\le
L|a_n-a|R+2M\mathbb P(|Z_n|>R).
$$

By the choice of \(R\),

$$
\left|\mathbb E[f(a_nZ_n)]-\mathbb E[f(aZ_n)]\right|
\le
L|a_n-a|R+2M\eta.
$$

Letting \(n\to\infty\), since \(a_n\to a\), we get

$$
\limsup_{n\to\infty}
\left|\mathbb E[f(a_nZ_n)]-\mathbb E[f(aZ_n)]\right|
\le 2M\eta.
$$

Since \(\eta>0\) is arbitrary, the first term also tends to \(0\).

Combining the two parts,

$$
\mathbb E[f(a_nZ_n)]\to \mathbb E[f(aZ)].
$$

Hence, by Proposition 10.12,

$$
\boxed{
a_nZ_n\xrightarrow{d}aZ.
}
$$

---

**Exercise 10.10** Let $(X_n)_{n\in\mathbb{N}}$ be a sequence of independent and identically distributed random variables. For every $n\in\mathbb{N}$, set $M_n=\max\{X_1,\ldots,X_n\}$.

1. Suppose that $X_n$ is uniformly distributed over $[0,1]$. Prove that $n(1-M_n)$ converges in distribution and identify the limit.

2. Suppose that $X_n$ is distributed according to the Cauchy distribution of parameter $1$. Show that $n/M_n$ converges in distribution and identify the limit.

**Solution.** (1) 

$$
n(1-M_n)\xrightarrow{d}\mathrm{Exp}(1).
$$

(2)

$$
\frac{n}{M_n}\xrightarrow{d}\mathrm{Exp}(\frac{1}{\pi}).
$$

---

**Exercise 10.11**

1. Let $(X_n)_{n\in\mathbb{N}}$ be a sequence of independent and identically distributed real random variables in $L^2$, such that $\mathbb{E}[X_n]=1$ and $\operatorname{var}(X_n)>0$. Set $S_n=X_1+\cdots+X_n$. Show that the limit

    $$
    \lim_{n\to\infty}\mathbb{P}(S_n\le n)
    $$

    exists and compute it.

2. Compute

    $$
    \lim_{n\to\infty}e^{-n}\sum_{k=0}^n\frac{n^k}{k!}.
    $$

**Solution.** (1) By the central limit theorem,

$$
\mathbb{P}(S_n\le n)=\mathbb{P}\left(\frac{S_n-n}{\sqrt{n\mathrm{var}(X_1)}}\le 0\right)\to \mathbb P(Z\le 0)=\frac12,
$$

(2) Let \(Y_n\sim \text{Poisson}(n)\). Then

$$
\lim_{n\to\infty}e^{-n}\sum_{k=0}^n\frac{n^k}{k!}=\lim_{n\to\infty}\mathbb{P}(Y_n\le n)=\frac12.
$$

---

**Exercise 10.12 (Glivenko-Cantelli Theorem)** Let $(X_n)_{n\in\mathbb{N}}$ be a sequence of independent and identically distributed real random variables with distribution function $F$. For every integer $n\in\mathbb{N}$ and every $x\in\mathbb{R}$, define the random variable

$$
F_n(x)=\frac1n\operatorname{card}\{j\in\{1,\ldots,n\}:X_j\le x\},
$$

which is the distribution function of the empirical measure associated with $X_1,\ldots,X_n$. Prove that a.s.,

$$
\lim_{n\to\infty}\sup_{x\in\mathbb{R}}|F_n(x)-F(x)|=0.
$$

Compare with Theorem 10.14. (*Hint:* It may be useful to assume that the random variables $X_n$ are represented as in Lemma 8.7.)

**Solution.**

By the hint, we may assume that the random variables are represented by inverse transform. Let \((U_j)_{j\ge1}\) be i.i.d. uniform random variables on \([0,1]\), and define

$$
X_j=F^{-1}(U_j):=\inf\{x\in\mathbb R:F(x)\ge U_j\}.
$$

Then \(X_j\) has distribution function \(F\). Moreover, for every \(x\in\mathbb R\),

$$
X_j\le x \iff U_j\le F(x).
$$

Define the empirical distribution function of the \(U_j\)'s by

$$
G_n(t)=\frac1n\sum_{j=1}^n \mathbf 1_{\{U_j\le t\}},
\qquad 0\le t\le1.
$$

Then

$$
F_n(x)
=
\frac1n\sum_{j=1}^n \mathbf 1_{\{X_j\le x\}}
=
\frac1n\sum_{j=1}^n \mathbf 1_{\{U_j\le F(x)\}}
=
G_n(F(x)).
$$

Hence

$$
|F_n(x)-F(x)|
=
|G_n(F(x))-F(x)|
\le
\sup_{0\le t\le1}|G_n(t)-t|.
$$

Therefore it is enough to prove the Glivenko-Cantelli theorem for the uniform distribution on \([0,1]\), namely

$$
\sup_{0\le t\le1}|G_n(t)-t|\to0,
\qquad a.s.
$$

Now fix \(m\in\mathbb N\). For each grid point \(k/m\), by the strong law of large numbers,

$$
G_n(k/m)\to k/m,
\qquad a.s.
$$

Since there are only finitely many grid points \(k=0,1,\ldots,m\), we have simultaneously

$$
\max_{0\le k\le m}|G_n(k/m)-k/m|\to0,
\qquad a.s.
$$

For any \(t\in[0,1]\), choose \(k\in\{1,\ldots,m\}\) such that

$$
\frac{k-1}{m}\le t\le \frac{k}{m}.
$$

Since \(G_n\) is nondecreasing,

$$
G_n((k-1)/m)\le G_n(t)\le G_n(k/m).
$$

Thus

$$
G_n(t)-t
\le
G_n(k/m)-\frac{k-1}{m}
=
\left(G_n(k/m)-\frac{k}{m}\right)+\frac1m,
$$

and

$$
t-G_n(t)
\le
\frac{k}{m}-G_n((k-1)/m)
=
\left(\frac{k-1}{m}-G_n((k-1)/m)\right)+\frac1m.
$$

Therefore

$$
|G_n(t)-t|
\le
\max_{0\le j\le m}|G_n(j/m)-j/m|+\frac1m.
$$

Taking the supremum over \(t\in[0,1]\),

$$
\sup_{0\le t\le1}|G_n(t)-t|
\le
\max_{0\le j\le m}|G_n(j/m)-j/m|+\frac1m.
$$

Letting \(n\to\infty\), we get

$$
\limsup_{n\to\infty}
\sup_{0\le t\le1}|G_n(t)-t|
\le
\frac1m,
\qquad a.s.
$$

Since \(m\) is arbitrary,

$$
\sup_{0\le t\le1}|G_n(t)-t|\to0,
\qquad a.s.
$$

Finally,

$$
\sup_{x\in\mathbb R}|F_n(x)-F(x)|
\le
\sup_{0\le t\le1}|G_n(t)-t|\to0,
\qquad a.s.
$$

---

**Exercise 10.13** Let $(X_n)_{n\in\mathbb{N}}$ be a sequence of independent and identically distributed random variables in $L^2$, such that $\mathbb{E}[X_n]=0$ and $\operatorname{var}(X_n)>0$. Set $S_n=X_1+\cdots+X_n$.

1. Prove that

    $$
    \limsup_{n\to\infty}\frac{S_n}{\sqrt n}=\infty,\qquad \text{a.s.}
    $$

2. Prove that the sequence $S_n/\sqrt n$ does not converge in probability.

3. Prove that the limit

    $$
    \lim_{n\to\infty}\mathbb{P}(S_n>0,S_{2n}<0)
    $$

    exists and compute this limit.

**Solution.**

Let $\sigma^2=\operatorname{var}(X_1)>0.$

(1) By the central limit theorem,

$$
\frac{S_n}{\sigma\sqrt n}\xrightarrow{d}Z\sim\mathcal N(0,1).
$$

Fix \(A>0\). Then

$$
\mathbb P\left(\frac{S_n}{\sqrt n}>A\right)
=
\mathbb P\left(\frac{S_n}{\sigma\sqrt n}>\frac A\sigma\right)
\to
\mathbb P\left(Z>\frac A\sigma\right)>0.
$$

Hence

$$
\limsup_{n\to\infty}
\mathbb P\left(\frac{S_n}{\sqrt n}>A\right)>0.
$$

Therefore

$$
\mathbb P\left(
\frac{S_n}{\sqrt n}>A\ \text{i.o.}
\right)>0.
$$

Thus

$$
\mathbb P\left(
\limsup_{n\to\infty}\frac{S_n}{\sqrt n}\ge A
\right)=1.
$$

Since this holds for every \(A>0\), we get

$$
\limsup_{n\to\infty}\frac{S_n}{\sqrt n}=\infty,
\qquad a.s.
$$

(2)

Assume, for contradiction, that \(S_n/\sqrt n\) converges in probability. Then it is Cauchy in probability. In particular,

$$
\frac{S_{2n}}{\sqrt{2n}}-\frac{S_n}{\sqrt n}
\xrightarrow{\mathbb P}0.
$$

But write

$$
S_{2n}=S_n+(S_{2n}-S_n).
$$

Then

$$
\frac{S_{2n}}{\sqrt{2n}}-\frac{S_n}{\sqrt n}
=
\left(\frac1{\sqrt2}-1\right)\frac{S_n}{\sqrt n}
+
\frac{S_{2n}-S_n}{\sqrt{2n}}.
$$

By the central limit theorem, and since \(S_n\) is independent of \(S_{2n}-S_n\),

$$
\left(
\frac{S_n}{\sigma\sqrt n},
\frac{S_{2n}-S_n}{\sigma\sqrt n}
\right)
\xrightarrow{d}
(Z_1,Z_2),
$$

where \(Z_1,Z_2\) are independent standard normal random variables. Hence

$$
\frac{S_{2n}}{\sqrt{2n}}-\frac{S_n}{\sqrt n}
\xrightarrow{d}
\sigma\left(\frac1{\sqrt2}-1\right)Z_1+\frac{\sigma}{\sqrt2}Z_2.
$$

The limit is a non-degenerate normal random variable, so it is not identically \(0\). Therefore the left-hand side cannot converge in probability to \(0\), contradiction.

Hence

$$
\frac{S_n}{\sqrt n}
$$

does not converge in probability.

(3) Let

$$
T_n=S_{2n}-S_n=X_{n+1}+\cdots+X_{2n}.
$$

Then \(S_n\) and \(T_n\) are independent, and they have the same distribution. Also,

$$
S_{2n}=S_n+T_n.
$$

So

$$
\mathbb P(S_n>0,S_{2n}<0)
=
\mathbb P(S_n>0,S_n+T_n<0).
$$

By the central limit theorem,

$$
\left(
\frac{S_n}{\sigma\sqrt n},
\frac{T_n}{\sigma\sqrt n}
\right)
\xrightarrow{d}
(Z_1,Z_2),
$$

where \(Z_1,Z_2\) are independent standard normal random variables. Hence

$$
\mathbb P(S_n>0,S_n+T_n<0)
\to
\mathbb P(Z_1>0,Z_1+Z_2<0).
$$

Now compute this probability. Since \((Z_1,Z_2)\) is rotationally symmetric in \(\mathbb R^2\), the probability only depends on the angle of the region

$$
\{(x,y):x>0,\ x+y<0\}.
$$

This region is

$$
x>0,\qquad y<-x.
$$

It is the sector between the negative \(y\)-axis and the line \(y=-x\). Its angle is

$$
\frac{\pi}{4}.
$$

Therefore,

$$
\mathbb P(Z_1>0,Z_1+Z_2<0)
=
\frac{\pi/4}{2\pi}
=
\frac18.
$$

Thus

$$
\lim_{n\to\infty}\mathbb P(S_n>0,S_{2n}<0)
=
\boxed{\frac18}.
$$