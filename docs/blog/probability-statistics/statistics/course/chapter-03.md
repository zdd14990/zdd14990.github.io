---
title: Common Families of Distributions
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

# Common Families of Distributions

---

**discrete uniform (1,N) distribution**

$$
P(X=x|N)=\frac{1}{N}, x=1,2,\cdots,N
$$

**hypergeometric distribution**

$$
P(X=x|N,M,K) = \frac{\binom{M}{x}\binom{N-M}{K-x}}{\binom{N}{K}}, x=0,1,\cdots,K
$$

**binomial distribution**

$$
X=\begin{cases}
1, & \text{with probability } p\\
0, & \text{with probability } 1-p
\end{cases}
$$

**Poisson($\lambda$) distribution**

$$
P(X=x|\lambda) = \frac{e^{-\lambda}\lambda^x}{x!}, \quad x=0,1,2,\cdots
$$

**negative binomial($r,p$) distribution**

$$
P(Y=y)=\binom{y+r-1}{r-1} p^r (1-p)^y, \quad y=0,1,2,\cdots
$$

**geometric($p$) distribution**

$$
P(X=x|p) = p(1-p)^{x-1}, \quad x=1,2,\cdots
$$

**Uniform distribution**

$$
f_X(x|a,b) =\frac{1}{b-a},  a<x<b
$$

**Gamma($\alpha,\beta$) distribution**

$$
f_X(x|\alpha,\beta) = \frac{1}{\Gamma(\alpha)\beta^{\alpha}} x^{\alpha-1} e^{-x/\beta}, x>0
$$

**Normal($\mu,\sigma^2$) distribution**

$$
f_X(x|\mu,\sigma^2) = \frac{1}{\sqrt{2\pi}\sigma} e^{-(x-\mu)^2/(2\sigma^2)}, \quad -\infty<x<\infty
$$


**beta($\alpha,\beta$) distribution**

$$
f_X(x|\alpha,\beta) =\frac{1}{B(\alpha,\beta)} x^{\alpha-1} (1-x)^{\beta-1},  0<x<1
$$

where

$$
B(\alpha,\beta) = \int_{0}^{1} x^{\alpha-1} (1-x)^{\beta-1} dx=\frac{\Gamma(\alpha)\Gamma(\beta)}{\Gamma(\alpha+\beta)}
$$

**Cauchy Distribution**

$$
f_X(x|\theta) = \frac{1}{\pi}\frac{1}{1+(x-\theta)^2}, \quad -\infty<x<\infty
$$

**Lognormal distribution**

$$
f_X(x|\mu,\sigma^2) = \frac{1}{x\sqrt{2\pi}\sigma} e^{-(\ln x-\mu)^2/(2\sigma^2)}, \quad x>0
$$

**Double exponential distribution**

$$
f_X(x|\mu,\sigma) = \frac{1}{2\sigma} e^{-|x-\mu|/\sigma}, \quad -\infty<x<\infty
$$

**exponential family**

$$
f_X(x|\bm{\theta}) = h(x)c(\bm{\theta})\exp\left\{\sum_{i=1}^{k} w_i(\bm{\theta})t_i(x)\right\}
$$

**exponential(beta) distribution**

$$
f_X(x|\beta) = \frac{1}{\beta} e^{-x/\beta}, \quad x>0
$$

**Theorem 3.4.2** If $X$ has a pdf (or pmf) in the exponential family, then 

1. $\mathrm{E}\left(\sum_{i=1}^{k} \dfrac{\partial w_i(\bm{\theta})}{\partial \theta_j}t_i(X)\right) = -\dfrac{\partial}{\partial \theta_j} \log c(\bm{\theta})$

2. $\mathrm{Var}\left(\sum_{i=1}^{k} \dfrac{\partial w_i(\bm{\theta})}{\partial \theta_j}t_i(X)\right) = -\dfrac{\partial^2}{\partial \theta_j^2} \log c(\bm{\theta}) - \mathrm{E}\left(\sum_{i=1}^{k} \dfrac{\partial^2 w_i(\bm{\theta})}{\partial \theta_j^2}t_i(X)\right)$

A **curved exponential family** is a family of densities of the form above for which the dimension of the vector $\bm{\theta}$ is equal to $d<k$. If $d=k$, the family is a **full exponential family**. 


**Theorem 3.5.1** Let $f(x)$ be any pdf and let $\mu$ and $\sigma>0$ be any given constants. Then the function

$$
g(x|\mu,\sigma) = \frac{1}{\sigma} f\left(\frac{x-\mu}{\sigma}\right)
$$

is a pdf. 


Let $f(x)$ be any pdf. Then the family of pdfs $f(x-\mu)$, indexed by the parameter $\mu$, $-\infty<\mu<\infty$, is called the **location family with standard pdf** $f(x)$ and $\mu$ is called the **location parameter** of the family. For any $\sigma>0$, the family of pdfs $\frac{1}{\sigma} f\left(\frac{x}{\sigma}\right)$, indexed by the parameter $\sigma$, is called the **scale family with standard pdf** $f(x)$ and $\sigma$ is called the **scale parameter** of the family. The family of pdfs $\frac{1}{\sigma} f\left(\frac{x-\mu}{\sigma}\right)$, indexed by the parameters $\mu$ and $\sigma$, is called the **location-scale family with standard pdf** $f(x)$, where $\mu$ is a location parameter and $\sigma$ is a scale parameter.


**Theorem 3.5.6** Let $f(\cdot)$ be any pdf. Let $\mu$ be any real number, and let $\sigma$ be any positive number. Then $X$ is a random varible with pdf $\frac{1}{\sigma} f\left(\frac{x-\mu}{\sigma}\right)$ iff there exists a random variable $Z$ with pdf $f(z)$ and $X= \mu + \sigma Z$.

**Theorem 3.5.7** Let $Z$ be a random variable with pdf $f(z)$. Suppose $\mathrm{E}Z$ and $\mathrm{Var}Z$ exist. If $X$ is a random variable with pdf $\frac{1}{\sigma} f\left(\frac{x-\mu}{\sigma}\right)$, then

$$
\mathrm{E}X = \mu + \sigma \mathrm{E}Z, \quad \mathrm{Var}X = \sigma^2 \mathrm{Var}Z
$$

In particular, if $\mathrm{E}Z=0$ and $\mathrm{Var}Z=1$, then $\mathrm{E}X = \mu$ and $\mathrm{Var}X = \sigma^2$.


**Chebyshev** Let $X$ be a random variable and let $g(x)$ be a nonnegative function. Then for any $r>0$,

$$
P(g(X)\ge r) \le \frac{\mathrm{E}[g(X)]}{r}
$$

**Theorem 3.6.4** Let $X_{\alpha,\beta}$ denote a gamma$(\alpha,\beta)$ random variable with pdf $f(x|\alpha,\beta)$, where $\alpha>1$. Then for any constants $a$ and $b$,

$$
P(X_{\alpha,\beta}\in (a,b)) =\beta (f(a|\alpha,\beta) - f(b|\alpha,\beta)) + P(X_{\alpha-1,\beta}\in (a,b))
$$

**Stein's Lemma** Let $X\sim n(\theta,\sigma^2)$ and let $g$ be a differentiable function satisfying $\mathrm{E}|g'(X)|<\infty$. Then

$$
\mathrm{E}[(X-\theta)g(X)] = \sigma^2 \mathrm{E}[g'(X)]
$$

**Theorem 3.6.7** Let $\chi_p^2$ denote a chi-square random variable with $p$ degrees of freedom, which has pdf $f(x|p)=\frac{1}{2^{p/2}\Gamma(p/2)} x^{p/2-1} e^{-x/2}, x>0$. Then for any function $h(x)$,

$$
\mathrm{E}[h(\chi_p^2)] = p \mathrm{E}\left[\frac{h(\chi_{p+2}^2)}{\chi_{p+2}^2}\right]
$$

provided that the expectations exist. 

**Theorem 3.6.8** Let $g(x)$ be a function with $-\infty<\mathrm{E}g(X)<\infty$ and $-\infty<g(-1)<\infty$. Then:

1. If $X\sim \text{Poisson}(\lambda)$, then

$$
\mathrm{E}[\lambda g(X)] = \mathrm{E}[Xg(X-1)]
$$

2. If $X\sim \text{negative binomial}(r,p)$, then

$$
\mathrm{E}[(1-p)g(X)] = \mathrm{E}[\frac{X}{X+r-1} g(X-1)]
$$


---
