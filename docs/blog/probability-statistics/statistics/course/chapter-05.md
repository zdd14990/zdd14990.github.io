---
title: Properties of a Random Sample
date: 2026-07-01
hide:
  - navigation
categories:
  - 概统
  - 统计
tags:
  - probability-statistics
  - statistics
  - course
---

# Properties of a Random Sample

---

The random variables $X_1,\cdots,X_n$ are called a **random sample of size $n$ from the population $f(x)$** if $X_1,\cdots,X_n$ are mutually independent and the marginal pdf or pmf of each $X_i$ is $f(x)$. Alternatively, $X_1,\cdots,X_n$ are called **independent and identically distributed random variables with pdf or pmf $f(x)$**.

Let $X_1,\cdots,X_n$ be a random sample of size $n$ from a population and let $T(x_1,\cdots,x_n)$ be a real-valued or vector-valued function whose domain includes the sample space of $(X_1,\cdots,X_n)$. Then the random variable or random vector $Y=T(X_1,\cdots,X_n)$ is called a **statistic**. The probability distribution of $Y$ is called the **sampling distribution of $Y$**.

The **sample mean** is the arithmetic average of the values in a random sample. It is usually denoted by

$$
\bar{X} = \frac{1}{n}\sum_{i=1}^{n} X_i
$$

The **sample variance** is the statistic defined by

$$
S^2 = \frac{1}{n-1}\sum_{i=1}^{n} (X_i-\bar{X})^2
$$

The **sample standard deviation** is the statistic defined by $S=\sqrt{S^2}$.

**Lemma 5.2.5** Let $X_1,\cdots,X_n$ be a random sample from a population and let $g(x)$ be a function such that $\mathrm{E}g(X_1)$ and $\mathrm{Var}g(X_1)$ exist. Then

$$
\mathrm{E}\left[\frac{1}{n}\sum_{i=1}^{n} g(X_i)\right] = \mathrm{E}g(X_1), \quad \mathrm{Var}\left[\frac{1}{n}\sum_{i=1}^{n} g(X_i)\right] = \frac{\mathrm{Var}g(X_1)}{n}
$$

$$
M_{\bar{X}}(t)=[M_X(t/n)]^n
$$

**Theorem 5.2.9** If $X$ and $Y$ are independent continuous random variables with pdfs $f_X(x)$ and $f_Y(y)$, then the pdf of $Z=X+Y$ is given by

$$
f_Z(z) = \int_{-\infty}^{\infty} f_X(w) f_Y(z-w) dw
$$

**Theorem 5.2.11** Sippose $X_1,\cdots,X_n$ is  a random sample from a pdf or pmf $f(x|\theta)$, where

$$
f(x|\theta) = h(x)c(\theta)\exp\left\{\sum_{i=1}^{k} w_i(\theta)t_i(x)\right\}
$$

is a member of an exponential family. Define statistics $T_1,\cdots,T_k$ by

$$
T_i = \sum_{j=1}^{n} t_i(X_j), \quad i=1,\cdots,k
$$

If the set $\left\{(w_1(\theta),\cdots,w_k(\theta)):\theta\in \Theta\right\}$ contains an open subset of $\mathbb{R}^k$, then the distribution of $(T_1,\cdots,T_k)$ is an exponential family of the form

$$
f_T(u_1,\cdots,u_k|\theta) =H(u_1,\cdots,u_k)[c(\theta)]^n\exp\left\{\sum_{i=1}^{k} w_i(\theta)u_i\right\}
$$

**Theorem 5.3.1** Let $X_1,\cdots,X_n$ be a random sample from a $n(\mu,\sigma^2)$ distribution, and let $X=(1/n)\sum_{i=1}^{n} X_i$ and $S^2=[1/(n-1)]\sum_{i=1}^{n} (X_i-\bar{X})^2$. Then

1. $\bar{X}$ and $S^2$ are independent random variables.

2. $\bar{X}$ has a $n(\mu,\sigma^2/n)$ distribution.

3. $(n-1)S^2/\sigma^2$ has a chi squared distribution with $n-1$ degrees of freedom.


---

If $X_1,\cdots,X_n$ are a random sample from a $n(\mu,\sigma^2)$, we know that the quantity

$$
\frac{\bar{X}-\mu}{\sigma/\sqrt{n}}
$$

has a $n(0,1)$ distribution. If $\sigma^2$ is unknown, we can replace $\sigma$ by $S$, the sample standard deviation. Then the quantity

$$
T=\frac{\bar{X}-\mu}{S/\sqrt{n}}=\frac{(\bar{X}-\mu)/(\sigma/\sqrt{n})}{\sqrt{S^2/\sigma^2}}
$$

The numerator is a $n(0,1)$ random variable and the denominator is $\sqrt{\chi^2_{n-1}/(n-1)}$, independent of the numerator. Thus, the distribution of $T$ can be found by solving the simplified problem of finding the distribution of $U/\sqrt{V/p}$, where $U\sim n(0,1)$ and $V\sim \chi^2_p$, and $U$ and $V$ are independent. This gives us **Student's $t$ distribution**. Equivalently, a random variable $T$ has a Student's $t$ distribution with $p$ degrees of freedom, and we write $T\sim t_p$, if it has pdf

$$
f_T(t)=\frac{\Gamma(\frac{p+1}{2})}{\sqrt{p\pi}\Gamma(\frac{p}{2})}\left(1+\frac{t^2}{p}\right)^{-\frac{p+1}{2}}, \quad -\infty<t<\infty
$$

Let $X_1,\cdots,X_n$ be a random sample from a $n(\mu_X,\sigma_X^2)$  population, and let $Y_1,\cdots,Y_m$ be a random sample from an independent $n(\mu_Y,\sigma_Y^2)$ population. The random variable $F=\frac{S_X^2/\sigma_X^2}{S_Y^2/\sigma_Y^2}$ has **Snedecor's $F$ distribution with $n-1$ and $m-1$ degrees of freedom**. Equivalently, the random variable $F$ has the $F$ distribution with $p$ and $q$ degrees of freedom if it has pdf

$$
f_F(x)=\frac{\Gamma(\frac{p+q}{2})}{\Gamma(\frac{p}{2})\Gamma(\frac{q}{2})}\left(\frac{p}{q}\right)^{p/2} \frac{x^{p/2-1}}{\left(1+\frac{px}{q}\right)^{(p+q)/2}}, \quad x>0
$$

**Theorem 5.3.8**

1. If $X~F_{p,q}$, then $1/X~F_{q,p}$.

2. If $X~t_q$, then $X^2~F_{1,q}$.

3. If $X~F_{p,q}$, then $(p/q)X/(1+(p/q)X)~Beta(p/2,q/2)$.


---

The **order statistics** of a random sample $X_1,\cdots,X_n$ are the sample values placed in ascending order. They are denoted by $X_{(1)},\cdots,X_{(n)}$.

The order statistics are random variables that stisfy $X_{(1)}\le \cdots \le X_{(n)}$. In particular, 

$$
\begin{aligned}
X_{(1)} &= \min(X_1,\cdots,X_n) \\
X_{(2)} &= \text{second smallest} X_i \\
\vdots\\
X_{(n)} &= \max(X_1,\cdots,X_n)
\end{aligned}
$$

The **sample range** is the statistic defined by $R=X_{(n)}-X_{(1)}$. The **sample median** is the statistic defined by

$$
M=\begin{cases}
(X_{(n/2)}+X_{(n/2+1)})/2, & \text{if $n$ is even} \\
X_{((n+1)/2)}, & \text{if $n$ is odd}
\end{cases}
$$

The notation $\left\{b\right\}$ is defined to be the number $b$ rounded to the nearest integer in the usual way. More precisely, if $i$ is an integer and $i-.5\le b<i+.5$, then $\left\{b\right\}=i$. 

**Theorem 5.4.3** Let $X_1,\cdots,X_n$ be a random sample from a discrete distribution with pmf $f_X(x_i)=p_i$, where $x_1<x_2<\cdots$ are the possible values of $X$ in ascending order. Define

$$
\begin{aligned}
P_0 &=0 \\
P_1 &=p_1 \\
P_2 &=p_1+p_2 \\
\vdots \\
P_n &=p_1+\cdots+p_n
\end{aligned}
$$

Let $X_{(1)},\cdots,X_{(n)}$ denote the order statistics from the sample. Then

$$
P(X_{(j)}\le x_i)=\sum_{k=j}^{n} \binom{n}{k} P_i^k (1-P_i)^{n-k}
$$

and

$$
P(X_{(j)}=x_i)=\sum_{k=j}^{n} \binom{n}{k} [P_i^k (1-P_i)^{n-k} - P_{i-1}^k (1-P_{i-1})^{n-k}]
$$

**Theorem 5.4.4** Let $X_{(1)},\cdots,X_{(n)}$ denote the order statistics of a random sample, $X_1,\cdots,X_n$, from a continuous population with cdf $F_X(x)$ and pdf $f_X(x)$. Then the pdf of $X_{(j)}$ is

$$
f_{X_{(j)}}(x) = \frac{n!}{(j-1)!(n-j)!} [F_X(x)]^{j-1} [1-F_X(x)]^{n-j} f_X(x)
$$

**Theorem 5.4.6** Let $X_{(1)},\cdots,X_{(n)}$ denote the order statistics of a random sample, $X_1,\cdots,X_n$, from a continuous population with cdf $F_X(x)$ and pdf $f_X(x)$. Then the joint pdf of $X_{(i)}$ and $X_{(j)}$, where $1\le i<j\le n$, is

$$
f_{X_{(i)},X_{(j)}}(u,v) = \frac{n!}{(i-1)!(j-i-1)!(n-j)!} [F_X(u)]^{i-1} [F_X(v)-F_X(u)]^{j-i-1} [1-F_X(v)]^{n-j} f_X(u)f_X(v)
$$

---

A sequence of random variables $X_1,X_2,\cdots$ **converges in probability** to a random variable $X$ if, for every $\epsilon>0$,

$$
\lim_{n\to \infty} P(|X_n-X|\ge\epsilon)=0
$$

or equivalently

$$
\lim_{n\to \infty} P(|X_n-X|<\epsilon)=1
$$

**Weak Law of Large Numbers** Let $X_1,X_2,\cdots$ be iid random variables with $\mathrm{E}X_i=\mu$ and $\mathrm{Var}X_i=\sigma^2<\infty$. Define $\bar{X}_n=(1/n)\sum_{i=1}^{n} X_i$. Then, for every $\epsilon>0$,

$$
\lim_{n\to \infty} P(|\bar{X}_n-\mu|<\epsilon)=1
$$

that is, $\bar{X}_n$ converges in probability to $\mu$.

**Theorem 5.5.4** Suppose that $X_1,X_2,\cdots$ converges in probability to $X$ and $h$ is a continuous function. Then $h(X_1),h(X_2),\cdots$ converges in probability to $h(X)$.

A sequence of random variables, $X_1,X_2,\cdots$, converges **almost surely** to a random variable $X$ if, for every $\epsilon>0$,

$$
P\left(\lim_{n\to \infty}|X_n-X|<\epsilon\right) = 1
$$

**Strong Law of Large Numbers** Let $X_1,X_2,\cdots$ be iid random variables with $\mathrm{E}X_i=\mu$ and $\mathrm{Var}X_i=\sigma^2<\infty$. Define $\bar{X}_n=(1/n)\sum_{i=1}^{n} X_i$. Then for every $\epsilon>0$,

$$
P(\lim_{n\to \infty} |\bar{X}_n-\mu|<\epsilon)=1
$$

that is, $\bar{X}_n$ converges almost surely to $\mu$.

A sequence of random variables $X_1,X_2,\cdots$ **converges in distribution** to a random variable $X$ if

$$
\lim_{n\to \infty} F_{X_n}(x) = F_X(x)
$$

at all points $x$ where $F_X(x)$ is continuous. 

**Theorem 5.5.12** If the sequence of random variables, $X_1,X_2,\cdots$, converges in probability to a random variable $X$, then it also converges in distribution to $X$.

**Theorem 5.5.13** The sequence of random variables, $X_1,X_2,\cdots$, converges in probability to a constant $\mu$ iff the sequence also converges in distribution to $\mu$. That is the statement

$$
P(|X_n-\mu|>\epsilon)\to 0 \quad\text{ for every} \epsilon>0
$$

is equivalent to

$$
P(X_n\le x)\to \begin{cases}
0, & x<\mu \\ 1, & x>\mu \end{cases}
$$

**Central Limit Theorem** Let $X_1,X_2,\cdots$ be a sequence of iid random variables whose mgfs exist in a neighborhood of $0$. Let $\mu=\mathrm{E}X_i$ and $\sigma^2=\mathrm{Var}X_i>0$. Define $\bar{X}_n=(1/n)\sum_{i=1}^{n} X_i$. Let $G_n(x)$ denote the cdf of $\sqrt{n}(\bar{X}_n-\mu)/\sigma$. Then, for every $x$, $-\infty<x<\infty$,

$$
\lim_{n\to \infty} G_n(x) = \int_{-\infty}^{x} \frac{1}{\sqrt{2\pi}} e^{-t^2/2} dt
$$

that is, $\sqrt{n}(\bar{X}_n-\mu)/\sigma$ has a limiting standard normal distribution.

**Stronger form of the Central Limit Theorem** Let $X_1,X_2,\cdots$ be a sequence of iid random variables with $\mathrm{E}X_i=\mu$ and $0<\mathrm{Var}X_i=\sigma^2<\infty$. Define $\bar{X}_n=(1/n)\sum_{i=1}^{n} X_i$. Let $G_n(x)$ denote the cdf of $\sqrt{n}(\bar{X}_n-\mu)/\sigma$. Then, for every $x$, $-\infty<x<\infty$,

$$
\lim_{n\to \infty} G_n(x) = \int_{-\infty}^{x} \frac{1}{\sqrt{2\pi}} e^{-t^2/2} dt
$$

that is, $\sqrt{n}(\bar{X}_n-\mu)/\sigma$ has a limiting standard normal distribution.

**Slutsky's Theorem** If $X_n\to X$ in distribution and $Y_n\to a$, a constant, in probability, then 

1. $Y_nX_n\to aX$ in distribution.

2. $X_n+Y_n\to X+a$ in distribution.

---

If a function $g(x)$ has derivatives of order $r$, that is, $g^{(r)}(x)=\frac{d^r }{dx^r}g(x)$ exists, then for any constant $a$, the **Taylor polynomial of order $r$ about $a$** is defined by

$$
T_r(x)=\sum_{i=0}^{r} \frac{g^{(i)}(a)}{i!}(x-a)^i
$$

**Taylor** If $g^{(r)}(a)$ exists, then

$$
\lim_{x\to a} \frac{g(x)-T_r(x)}{(x-a)^r} = 0
$$


**Delta Method** Let $Y_n$ be a sequence of random variables that satisfies $\sqrt{n}(Y_n-\theta)\to n(0,\sigma^2)$ in distribution. For a given function $g$ and a specific value of $\theta$, suppose that $g'(\theta)$ exists and is not $0$. Then 

$$
\sqrt{n}|g(Y_n)-g(\theta)|\to n(0,|g'(\theta)|^2\sigma^2) \text{ in distribution}
$$
