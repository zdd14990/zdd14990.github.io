---
title: GTM295 Chapter 9
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

# GTM295 Chapter 9

---

**Exercise 9.1**

1. Let $X$ and $Y$ be two independent real random variables with the same law. Compute $\mathbb{P}(X=Y)$ in terms of the common law $\mu$ of $X$ and $Y$. Show that $\mathbb{P}(X>Y)=\mathbb{P}(Y>X)>0$, except in a particular case to be discussed.

2. Let $(X_n)_{n\in\mathbb{N}}$ be a sequence of independent and identically distributed random variables with values in $\mathbb{R}_+$. Show that $\sum_{n\in\mathbb{N}}X_n=\infty$ a.s., except in the special case where $X_n=0$ a.s. for every $n$.

3. Under the assumptions of the previous question, show that there is a constant $\ell\in[0,\infty]$ such that $\max\{X_1,\ldots,X_n\}\to\ell$ as $n\to\infty$, almost surely, and determine $\ell$ in terms of the distribution function of $X_1$.

**Solution.** (1).

$$
\mathbb{P}(X=Y)=\int_{\mathbb{R}}\mu(\{x\})\,\mu(dx)=\sum_{x\in\mathbb{R}}\mu(\{x\})^2.
$$

$$
\mathbb{P}(X>Y)=\mathbb{P}(Y>X)=\frac{1}{2}\left(1-\sum_{x\in\mathbb{R}}\mu(\{x\})^2\right).
$$

when $\sum_{x\in\mathbb{R}}\mu(\{x\})^2=1$, then $\mu$ is a Dirac measure, and $X=Y$ a.s.

(2). Check is easy. Suppose $\mathbb{P}(X_1>0)>0$, then there exist $\epsilon>0$, $\mathbb{P}(X_n\ge \epsilon):=\mathbb{P}(A_n)=p>0$, so $\sum_n \mathbb{P}(A_n)=\infty$, by Borel-Cantelli lemma, $\mathbb{P}(A_n \text{ i.o.})=1$, so there exist inftinitely $n$ such that $X_n\ge \epsilon$, so $\sum_n X_n=\infty$ a.s.

(3). Let $M_n=\max\{X_1,\ldots,X_n\}$, then $M_n$ is non-decreasing, so $M_n\to M_\infty$ a.s. Let $F$ be the distribution function of $X_1$, set $l=\inf\{x\in\mathbb{R}:F(x)=1\}$, prove that $l=M_\infty$ a.s. by showing $\mathbb{P}(M_\infty<l)=0$ and $\mathbb{P}(M_\infty>l)=0$.


---

**Exercise 9.2** Let $U$ and $V$ be two independent real random variables distributed according to the exponential distribution with parameter $\lambda>0$. Show that the variables $\frac{U}{U+V}$ and $U+V$ are independent and determine their law.

**Solution.** Let $T=\frac{U}{U+V}$, $S=U+V$, 

$$
f_{T,S}(t,s)=f_{U,V}(ts,s-ts)\left|\frac{\partial(u,v)}{\partial(t,s)}\right|=\lambda^2s e^{-\lambda s}=\mathbf{1}_{(0,1)}(t)\cdot \lambda^2 s e^{-\lambda s}\mathbf{1}_{(0,\infty)}(s)
$$



---

**Exercise 9.3** Let $N$ and $N'$ be two independent Gaussian $\mathcal{N}(0,1)$ random variables. Show that the random variable $N^2/(N^2+N'^2)$ has density

$$
\frac{1}{\pi}\frac{1}{\sqrt{t(1-t)}}\mathbf{1}_{(0,1)}(t).
$$

This is the so-called arcsine distribution.


**Solution.** Set $x=r\sin\theta$, $y=r\cos\theta$.

---

**Exercise 9.4** Let $(X_n)_{n\in\mathbb{N}}$ be a sequence of independent and identically distributed random variables uniformly distributed over $\{1,2,\ldots,p\}$. For every $n\in\mathbb{N}$, determine the law of $M_n=\max\{X_1,\ldots,X_n\}$, and show that $\mathbb{E}[M_n]/p\to n/(n+1)$ when $p\to\infty$.

**Solution.** Stolz.


---

**Exercise 9.5** Let $A_0,A_1,A_2,\ldots$ be a sequence of independent events. For every $\omega\in\Omega$, set

$$
T(\omega)=\inf\{n\ge0:\omega\in A_n\},
$$

with the convention $\inf\varnothing=\infty$. Verify that $T$ is a random variable and give its distribution in terms of the numbers $p_n=\mathbb{P}(A_n)$. What condition on the $p_n$'s ensures that $T<\infty$ a.s.? In the case where $p_n=p\in(0,1)$ for every $n$, identify the distribution of $T$ and compute $\mathbb{E}[T]$ and $\operatorname{var}(T)$.

**Solution.** 

$$
\mathbb{P}(T=n)=p_n\prod_{k=0}^{n-1}(1-p_k),\quad n\ge 0
$$

$$
\mathbb{P}(T=\infty)=\prod_{k=0}^{\infty}(1-p_k)
$$

set $p_n=p$, $\mathbb{P}(T=n)=p(1-p)^n$, $T$ is geometric distribution, $\mathbb{E}[T]=\frac{1-p}{p}$, $\operatorname{var}(T)=\frac{1-p}{p^2}$.


---

**Exercise 9.6** A real random variable $X$ is called symmetric if $X$ and $-X$ have the same law.

1. Let $X$ be a symmetric random variable, whose law has a density $f$. Show that $f$ can be chosen such that $f(x)=f(-x)$ for every $x\in\mathbb{R}$.

2. Show that a real random variable $X$ is symmetric if and only if its characteristic function takes values in $\mathbb{R}$.

3. Let $Y$ and $Y'$ be two independent real random variables with the same distribution. Show that $Y-Y'$ is symmetric. Does this still hold without the independence assumption?

4. Let $\varepsilon$ be a random variable with values in $\{-1,1\}$ such that $\mathbb{P}(\varepsilon=1)=\mathbb{P}(\varepsilon=-1)=1/2$. Show that, if $X$ is a symmetric random variable and $X$ is independent of $\varepsilon$, then $\varepsilon|X|$ has the same distribution as $X$.

**Solution.** (1).Define

$$
f(x)=\frac{1}{2}(f_0(x)+f_0(-x)),\quad x\in\mathbb{R},
$$

(2)

$$
\varphi_X(\xi)=\overline{\varphi_X(\xi)}\Longleftrightarrow X = -X \text{ in law}
$$

(3)

$$
\varphi_{Y-Y'}(\xi)=\mathbb{E}[e^{i\xi(Y-Y')}]=\mathbb{E}[e^{i\xi Y}]\mathbb{E}[e^{-i\xi Y'}]=|\varphi(\xi)|^2\in\mathbb{R}
$$

(4) For any bounded continuous function $g$,

$$
\mathbb{E}[g(\varepsilon|X|)]=\mathbb{E}[\mathbb{E}[g(\varepsilon|X|)|X]]=\frac{1}{2}\mathbb{E}[g(|X|)]+\frac{1}{2}\mathbb{E}[g(-|X|)]=\mathbb{E}[g(X)].
$$

---

**Exercise 9.7** Let $(X_n)_{n\in\mathbb{N}}$ be a sequence of independent and identically distributed random variables with values in $\mathbb{R}_+$. Show that, if $\mathbb{E}[X_1]<\infty$,

$$
\limsup_{n\to\infty}\frac{X_n}{n}=0,\qquad \text{a.s.},
$$

whereas, if $\mathbb{E}[X_1]=\infty$,

$$
\limsup_{n\to\infty}\frac{X_n}{n}=\infty,\qquad \text{a.s.}
$$

---

**Exercise 9.8** Let $\alpha>0$ and let $(Z_n)_{n\in\mathbb{N}}$ be a sequence of independent random variables with values in $\{0,1\}$, such that, for every $n\in\mathbb{N}$,

$$
\mathbb{P}(Z_n=1)=\frac{1}{n^\alpha}
\quad\text{and}\quad
\mathbb{P}(Z_n=0)=1-\frac{1}{n^\alpha}.
$$

Verify that $Z_n\to0$ as $n\to\infty$ in $L^1$, but nonetheless we have a.s.

$$
\limsup_{n\to\infty}Z_n=
\begin{cases}
1, & \alpha\le1,\\
0, & \alpha>1.
\end{cases}
$$

---

**Exercise 9.9** Let $(X_n)_{n\in\mathbb{N}}$ be a sequence of real random variables. Assume that there exists a constant $C$ such that $\mathbb{E}[(X_n)^2]\le C$ for every $n\in\mathbb{N}$, and that $\operatorname{cov}(X_n,X_m)=0$ if $n\ne m$. Set $S_n=X_1+\cdots+X_n$.

1. Verify that

    $$
    \frac{S_{n^2}-\mathbb{E}[S_{n^2}]}{n^2}\xrightarrow[n\to\infty]{}0,\qquad \text{a.s.}
    $$

2. Deduce from question (1) that we have also

    $$
    \frac{S_n-\mathbb{E}[S_n]}{n}\xrightarrow[n\to\infty]{}0,\qquad \text{a.s.}
    $$

**Solution.** (1) 

$$
\mathbb{P}\left(\left|\frac{S_{n^2}-\mathbb{E}[S_{n^2}]}{n^2}\right|>\varepsilon\right)\le \frac{\operatorname{var}(S_{n^2})}{\varepsilon^2 n^4}\le \frac{C}{\varepsilon^2 n^2}\Longrightarrow \sum_n \mathbb{P}\left(\left|\frac{S_{n^2}-\mathbb{E}[S_{n^2}]}{n^2}\right|>\varepsilon\right)<\infty
$$

By Borel-Cantelli lemma, we have $\left|\frac{S_{n^2}-\mathbb{E}[S_{n^2}]}{n^2}\right|\to0$ a.s.

(2)

Let $\widetilde S_n=S_n-\mathbb E[S_n].$ For each \(m\), choose \(k\) such that $k^2\le m<(k+1)^2.$ Then

$$
\frac{|\widetilde S_m|}{m}
\le
\frac{|\widetilde S_{k^2}|}{m}
+
\frac{|\widetilde S_m-\widetilde S_{k^2}|}{m}
\le
\frac{|\widetilde S_{k^2}|}{k^2}
+
\frac{D_k}{k^2},
$$

where $D_k=\max_{k^2\le m<(k+1)^2}|\widetilde S_m-\widetilde S_{k^2}|.$ By part (1),

$$
\frac{|\widetilde S_{k^2}|}{k^2}\to0
\qquad \text{a.s.}
$$

It remains to prove

$$
\frac{D_k}{k^2}\to0
\qquad \text{a.s.}
$$

Let $Y_j=X_j-\mathbb E[X_j].$ Then

$$
D_k
\le
\sum_{j=k^2+1}^{(k+1)^2}|Y_j|.
$$

Hence, by Cauchy-Schwarz and \(\mathbb E[Y_j^2]\le C\),

$$
\begin{aligned}
\mathbb P\left(\frac{D_k}{k^2}>\varepsilon\right)
&\le
\mathbb P\left(\sum_{j=k^2+1}^{(k+1)^2}|Y_j|>\varepsilon k^2\right)\\
&\le
\frac{1}{\varepsilon^2 k^4}
\mathbb E\left[\left(\sum_{j=k^2+1}^{(k+1)^2}|Y_j|\right)^2\right]\\
&\le
\frac{1}{\varepsilon^2 k^4}
(2k+1)\sum_{j=k^2+1}^{(k+1)^2}\mathbb E[Y_j^2]\\
&\le
\frac{C(2k+1)^2}{\varepsilon^2 k^4}.
\end{aligned}
$$

Since

$$
\sum_k
\mathbb P\left(\frac{D_k}{k^2}>\varepsilon\right)\le \sum_k \frac{C(2k+1)^2}{\varepsilon^2 k^4}<\infty,
$$

By Borel-Cantelli lemma,

$$
\frac{D_k}{k^2}\to0
\qquad \text{a.s.}
$$

---

**Exercise 9.10** Let $(X_n)_{n\in\mathbb{N}}$ be a sequence of independent random variables distributed according to the exponential distribution with parameter $1$.

1. Prove that

    $$
    \limsup_{n\to\infty}(\log n)^{-1}X_n=1,\qquad \text{a.s.}
    $$

2. Let $Z_n=\max\{X_1,\ldots,X_n\}$. Verify that

    $$
    \liminf_{n\to\infty}(\log n)^{-1}Z_n\ge1,\qquad \text{a.s.}
    $$

3. Verify that, for an appropriate sequence $n_k\uparrow\infty$, one has

    $$
    \limsup_{k\to\infty}(\log n_k)^{-1}Z_{n_k}\le1,\qquad \text{a.s.}
    $$

    Then show that $\lim_{n\to\infty}(\log n)^{-1}Z_n=1$, a.s.

**Solution.** (1). Consider $A_n^\epsilon=\{X_n>(1+\epsilon)\log n\}$ and $B_n^\epsilon=\{X_n>(1-\epsilon)\log n\}$, use Borel-Cantelli .

(2). Consider event $\left\{Z_n\le(1-\epsilon)\log n\right\}$, it is equivalent to

$$
X_1,\cdots,X_n\le(1-\epsilon)\log n
$$

so,

$$
\begin{aligned}
    \mathbb{P}\left(Z_n\le(1-\epsilon)\log n\right)&=\mathbb{P}\left(X_1\le(1-\epsilon)\log n\right)^n\\
    &=\left(1-\frac{1}{n^{1-\epsilon}}\right)^n\\
    &\le \exp\left(-n^{\epsilon}\right).
\end{aligned}
$$

use Borel-Cantelli lemma.

(3). The otherside is easy by (1).



---

**Exercise 9.11**

1. Let $N$ and $N'$ be two independent Gaussian $\mathcal{N}(0,1)$ random variables. Show that $X=N/N'$ follows a Cauchy distribution with density $(\pi(1+x^2))^{-1}$.

2. Compute the characteristic function of $X$. (*Hint:* Verify that

    $$
    \mathbb{E}\left[e^{i\xi X}\right]
    =(2\pi)^{-1/2}\int_{\mathbb{R}}\exp\left(-\frac12\left(y-\frac{|\xi|}{y}\right)^2-|\xi|\right)\,dy
    $$

    and then use the result of Exercise 7.5.)

3. Let $X_1,\ldots,X_n$ be $n$ independent random variables with the same distribution as $X$. Show that $\frac1n(X_1+\cdots+X_n)$ also has the same distribution as $X$. Why does this not contradict the weak law of large numbers?

4. Let $(Y_n)_{n\in\mathbb{N}}$ be a sequence of independent and identically distributed real random variables with a symmetric distribution ($Y_n$ has the same law as $-Y_n$). Assume that $\frac1n(Y_1+\cdots+Y_n)$ has the same distribution as $Y_1$, for every $n\in\mathbb{N}$. Show that $Y_n$ follows a Cauchy distribution.

**Solution.** (1)(2)(3) Purely computation.

(4) Let $\varphi$ be the characteristic function of $Y_1$. Then, for every $n\in\mathbb{N}$,

$$
\varphi (\xi)=\mathbb{E}\left[e^{i\xi Y_1}\right]
=\mathbb{E}\left[e^{i\xi \frac{Y_1+\cdots+Y_n}{n}}\right]
=\varphi\left(\frac{\xi}{n}\right)^n.
$$

use Cauchy functional equation, we have $\varphi(\xi)=e^{-c|\xi|}$ for some $c>0$, so $Y_1$ follows a Cauchy distribution.

---

**Exercise 9.12**

1. Let $a,b\in\mathbb{R}$ with $a<0<b$. If $Y$ is a random variable with values in $[a,b]$, verify that $\operatorname{var}(Y)\le (b-a)^2/4$.

2. Let $Z$ be a centered random variable with values in $[a,b]$, and, for every $\lambda\ge0$, set $\psi_Z(\lambda)=\log\mathbb{E}[e^{\lambda Z}]$. Prove that, for every $\lambda\ge0$,

    $$
    \psi_Z(\lambda)\le\frac{(b-a)^2}{8}\lambda^2.
    $$

    (*Hint:* Verify that the second derivative $\psi_Z''(\lambda)$ makes sense and is equal to the variance of $Z$ under a probability measure absolutely continuous with respect to $\mathbb{P}$.)

3. Let $X_1,\ldots,X_n$ be independent real random variables such that, for every $i\in\{1,\ldots,n\}$, $X_i$ takes values in $[a_i,b_i]$, where $a_i<0<b_i$. Prove that, for every $\varepsilon>0$,

    $$
    \mathbb{P}\left(\sum_{i=1}^n X_i-\mathbb{E}\left[\sum_{i=1}^n X_i\right]\ge\varepsilon\right)
    \le
    \exp\left(-\frac{2\varepsilon^2}{\sum_{i=1}^n(b_i-a_i)^2}\right).
    $$

This is known as *Hoeffding's inequality*.

**Solution.** (1)

$$
\mathrm{var}(Y)=\inf_{c\in\mathbb{R}}\mathbb{E}[(Y-c)^2]\le \mathbb{E}\left[\left(Y-\frac{a+b}{2}\right)^2\right]\le \frac{(b-a)^2}{4}.
$$

(2)



---

**Exercise 9.13** Let $U_1,\ldots,U_n$ be independent random variables with values in $\{-1,1\}$ such that $\mathbb{P}(U_j=1)=\mathbb{P}(U_j=-1)=1/2$ for every $j\in\{1,\ldots,n\}$. Let $a_1,\ldots,a_n\in\mathbb{R}$. Prove that

$$
\mathbb{E}\left[\left|\sum_{j=1}^n a_jU_j\right|\right]
\ge
\sqrt{\frac13\sum_{j=1}^n a_j^2}.
$$

This is a particular case of the *Khintchine inequality* (the constant $1/3$ can be replaced by $1/2$, but this requires more work). *Hint:* Verify that, if $X$ is a real random variable in $L^4$,

$$
\mathbb{E}[|X|]\ge\frac{\mathbb{E}[X^2]^{3/2}}{\mathbb{E}[X^4]^{1/2}}.
$$

**Solution.** Easy to check.
