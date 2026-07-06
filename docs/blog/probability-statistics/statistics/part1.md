---
title: 统计part1
date: 2026-07-01
hide:
  - navigation
categories:
  - 概统
  - 统计
tags:
  - probability-statistics
  - statistics
---
# 统计part1

---

**参考书：Statistical Inference**

---

## Probability Theory

---

**样本空间(sample space)** The set $S$ of all possible outcomes of a particular experiment is called the sample space.

**事件(event)** An event is any collection of possible outcomes of an experiment, that is, any subset of $S$ (including $S$ itself).

**σ-代数(sigma algebra)** A collection of subsets of $S$ is called a sigma algebra (or Borel field), denoted by $\mathcal{B}$, if it satisfies the following three properties:

1. $\emptyset \in \mathcal{B}$

2. If $A \in \mathcal{B}$, then $A^c \in \mathcal{B}$

3. If $A_1, A_2, \ldots \in \mathcal{B}$, then $\bigcup_{i=1}^{\infty} A_i \in \mathcal{B}$

**probability function** Given a sample space $S$ and an associated sigma algebra $\mathcal{B}$, a probability function is a function $P$ with domain $\mathcal{B}$ that satisfies

1. $P(A)\ge 0$ for all $A \in \mathcal{B}$

2. $P(S) = 1$

3. If $A_1, A_2, \ldots \in \mathcal{B}$ are pairwise disjoint, then $P(\bigcup_{i=1}^{\infty} A_i) = \sum_{i=1}^{\infty} P(A_i)$

**Theorem 1.2.6** Let $S=\left\{s_1,\cdots,s_n\right\}$ be a finite set. Let $\mathcal{B}$ be any sigma algebra of subsets of $S$. Let $p_1,\cdots,p_n$ be nonnegative numbers that sum to 1. For any $A\in \mathcal{B}$, define $P(A)$ by 

$$
P(A) = \sum_{s_i \in A} p_i
$$

Then $P$ is a probability function on $\mathcal{B}$. This remains true if $S$ is a countable set.

**Theorem 1.2.8** If $P$ is a probability function and $A$ is any set in $\mathcal{B}$, then 

1. $P(\emptyset) = 0$

2. $P(A)\le 1$

3. $P(A^c) = 1 - P(A)$


**Theorem 1.2.9** If $P$ is a probability function and $A$ and $B$ are any sets in $\mathcal{B}$, then

1. $P(B\cap A^c) = P(B) - P(A\cap B)$

2. $P(A\cup B) = P(A) + P(B) - P(A\cap B)$

3. If $A\subset B$, then $P(A)\le P(B)$

**Theorem 1.2.10** If $P$ is a probability function, then 

1. $P(A)=\sum_{i=1}^{\infty} P(A\cap C_i)$ for any partition $C_1,C_2,\cdots$

2. $P(\bigcup_{i=1}^{\infty} A_i) \le \sum_{i=1}^{\infty} P(A_i)$ for any sequence of sets $A_1,A_2,\cdots$


If $A$ and $B$ are events in $S$, and $P(B)>0$, then the **conditional probability** of $A$ given $B$, written $P(A|B)$, is

$$
P(A|B) = \frac{P(A\cap B)}{P(B)}
$$


**Bayes' Rule** Let $A_1,A_2,\cdots $ be a partition of the sample space, and let $B$ be any set. Then, for each $i=1,2,\cdots$,

$$
P(A_i|B) = \frac{P(B|A_i)P(A_i)}{\sum_{j=1}^{\infty} P(B|A_j)P(A_j)}
$$

Two events, $A$ and $B$, are **statistically independent** if

$$
P(A\cap B) = P(A)P(B)
$$

**Theorem 1.3.9** If $A$ and $B$ are independent events, then the following pairs are also independent:

1. $A$ and $B^c$

2. $A^c$ and $B$

3. $A^c$ and $B^c$

A collection of events $A_1,\cdots, A_n$ are **mutually independent** if for any subcollection $A_{i_1},\cdots, A_{i_k}$, we have

$$
P\left(\bigcap_{j=1}^{k} A_{i_j}\right) = \prod_{j=1}^{k} P(A_{i_j})
$$

A **random variable**  is a function from a sample space $S$ into the real numbers.

The **cumulative distribution function** or **CDF** of a random variable $X$, denoted by $F_X(x)$, is defined by

$$
F_X(x) = P(X\le x), \text{for all } x.
$$

**Theorem 1.5.3** The function $F(x)$ is a cdf iff the following three conditions hold:

1. $\lim_{x\to -\infty} F(x) = 0$ and $\lim_{x\to \infty} F(x) = 1$

2. $F(x)$ is nondecreasing

3. $F(x)$ is right continuous, that is, $\lim_{x\to x_0^+} F(x) = F(x_0)$ for all $x$.

A random variable $X$ is **continuous** if $F_X(x)$ is a continuous function of $x$. A random variable $X$ is **discrete** if $F_X(x)$ is a step function of $x$.

The random variables $X$ and $Y$ are **identically distributed** if, for every set $A\in \mathcal{B}$, we have $P(X\in A) = P(Y\in A)$.

**Theorem 1.5.10** The following two statements are equivalent:

1. The random variables $X$ and $Y$ are identically distributed.

2. $F_X(x) = F_Y(x)$ for all $x$.

The **probability mass function** or **pmf** of a discrete random variable $X$ is given by 

$$
f_X(x) = P(X=x), \text{for all } x.
$$

The **probability density function** or **pdf**, $f_X(x)$, of a continuous random variable $X$ is the function that satisfies

$$
F_X(x) = \int_{-\infty}^{x} f_X(t) dt, \text{for all } x.
$$

**notation** "X has a distribution given by $F_X(x)$" is abbreviated symbolically by $X\sim F_X(x)$. We can similarly write $X\sim f_X(x)$, $X\sim Y$.

**Theorem 1.6.5** A function $f_X(x)$ is a pdf(or pmf) of a random variable $X$ iff

1. $f_X(x)\ge 0$ for all $x$

2. $\sum_{x} f_X(x) = 1$ (pmf) or $\int_{-\infty}^{\infty} f_X(x) dx = 1$ (pdf)


---

## Transformation and expectation

---

**Transformation** Let $X$ be a random variable with cdf $F_X(x)$ and pdf (or pmf) $f_X(x)$. Let $Y = g(X)$, where $g$ is a one-to-one function, mapping the original sample space of $X$, $\mathcal{X}$, to a new sample space, $\mathcal{Y}$, the sample space of random variable $Y$. We can write for any set $A\subset \mathcal{Y}$,

$$
P(Y\in A) = P(g(X)\in A) = P(X\in g^{-1}(A))
$$

the pmf of $Y$ is

$$
f_Y(y)=P(Y=y)=\sum_{x\in g^{-1}(y)} P(X=x) = \sum_{x\in g^{-1}(y)} f_X(x)
$$

If $g(x)$ is an increasing function, we can write

$$
F_Y(y) = \int_{\left\{x\in \mathcal{X}:x\le g^{-1}(y)\right\}} f_X(x) dx = \int_{-\infty}^{g^{-1}(y)} f_X(x) dx = F_X(g^{-1}(y))
$$

else if $g(x)$ is a decreasing function, we can write

$$
F_Y(y) =  \int_{g^{-1}(y)}^{\infty} f_X(x) dx = 1 - F_X(g^{-1}(y))
$$

**Theorem 2.1.3** Let $X$ have cdf $F_X(x)$, let $Y=g(X)$, and let $\mathcal{X}$ and $\mathcal{Y}$ be defined as $\mathcal{X} = \left\{x: f_X(x)>0\right\}$ and $\mathcal{Y} = \left\{y:y=g(x)\text{ for some }x\in \mathcal{X}\right\}$. 

1. If $g$ is an increasing function on $\mathcal{X}$, $F_Y(y) = F_X(g^{-1}(y))$ for $y\in \mathcal{Y}$

2. If $g$ is a decreasing function on $\mathcal{X}$ and $X$ is a continuous random variable, $F_Y(y) = 1 - F_X(g^{-1}(y))$ for $y\in \mathcal{Y}$

**Theorem 2.1.5** Let $X$ have pdf $f_X(x)$ and let $Y=g(X)$, where $g$ is a monotone function. Let $\mathcal{X}$ and $\mathcal{Y}$ be defined as above. Suppose that $f_X(x)$ is continuous on $\mathcal{X}$ and that $g^{-1}(y)$ has a continuous derivative on $\mathcal{Y}$. Then the pdf of $Y$ is given by

$$
f_X(y)=\begin{cases}
f_X(g^{-1}(y))\left|\frac{d}{dy}g^{-1}(y)\right|, & y\in \mathcal{Y}\\
0, & y\notin \mathcal{Y}
\end{cases}
$$

**Theorem 2.1.8** Let $X$ have pdf $f_X(x)$ and let $Y=g(X)$, and define the sample spaces $\mathcal{X}$  as above. Suppose there exists a partition, $A_0,A_1,\cdots,A_k$ of $\mathcal{X}$ such that $P(X\in A_0)=0$ and $f_X(x)$ is continuous on each $A_i$. Further, suppose there exist functions $g_1,\cdots,g_k$, defined on $A_1,\cdots,A_k$, respectively, satisfying

1. $g(x)=g_i(x)$ for $x\in A_i$

2. $g_i$ is monotone on $A_i$

3. the set $\mathcal{Y} = \left\{y:y=g_i(x)\text{ for some }x\in A_i\right\}$ is the same for each $i=1,\cdots,k$

4. $g_i^{-1}(y)$ has a continuous derivative on $\mathcal{Y}$ for each $i=1,\cdots,k$

Then

$$
f_Y(y) =\begin{cases}
\sum_{i=1}^{k} f_X(g_i^{-1}(y))\left|\frac{d}{dy}g_i^{-1}(y)\right|, & y\in \mathcal{Y}\\
0, & y\notin \mathcal{Y}
\end{cases}
$$

**Theorem 2.1.10** Let $X$ have continuous cdf $F_X(x)$ and define the random variable $Y$ as $Y=F_X(X)$. Then $Y$ is uniformly distributed on $(0,1)$, that is, $P(Y\le y) = y$ for $0<y<1$.


The **expected value** or **mean** of a random variable $g(X)$, denoted by $\mathrm{E}[g(X)]$, is

$$
\mathrm{E}[g(X)] = \begin{cases}
\sum_{x\in \mathcal{X}} g(x)f_X(x)=\sum_{x\in \mathcal{X}} g(x)f_X(x), & \text{if } X \text{ is discrete}\\
\int_{-\infty}^{\infty} g(x)f_X(x) dx, & \text{if } X \text{ is continuous}
\end{cases}
$$

For each integer $n$, the $n$th **moment** of $X$, $\mu'_n$,is 

$$
\mu'_n = \mathrm{E}[X^n]
$$

The $n$th **central moment** of $X$, $\mu_n$, is

$$
\mu_n = \mathrm{E}[(X-\mu)^n]
$$

where $\mu=\mu'_1=\mathrm{E}[X]$.

The **variance** of $X$, denoted by $\mathrm{Var}(X)=\mathrm{E}[(X-\mu)^2]$, is the second central moment of $X$. The positive square root of $\mathrm{Var}(X)$ is the **standard deviation** of $X$.

Let $X$ be a random variable with cdf $F_X$. The **moment generating function** or **mgf** of $X$, denoted by $M_X(t)$, is

$$
M_X(t)=\mathrm{E}[e^{tX}]=\begin{cases}
\sum_{x\in \mathcal{X}} e^{tx}P(X=x), & \text{if } X \text{ is discrete}\\
\int_{-\infty}^{\infty} e^{tx}f_X(x) dx, & \text{if } X \text{ is continuous}
\end{cases}
$$

**Theorem 2.3.7** If $X$ has mgf $M_X(t)$, then

$$
\mathrm{E}[X^n] = M_X^{(n)}(0)
$$

**Theorem 2.3.11** Let $F_X(x)$ and $F_Y(y)$ be two cdfs all of whose moments exist. 

1. If $X$ and $Y$ have bounded support, then $F_X(u)=F_Y(u)$ for all $u$ iff $\mathrm{E}[X^r] = \mathrm{E}[Y^r]$ for all $r=0,1,2,\cdots$

2. If the moment generating functions exist and $M_X(t)=M_Y(t)$ for all $t$ in some neighborhood of 0, then $F_X(u)=F_Y(u)$ for all $u$.

**Theorem 2.3.12** Suppose $\left\{X_i,i=1,2,\cdots\right\}$ is a sequence of random varibles, each with mgf $M_{X_i}(t)$. Furthermore, suppose that

$$
\lim_{i\to \infty} M_{X_i}(t) = M_X(t), \text{ foor all } t \text{ in a neighborhood of } 0
$$

and $M_X(t)$ is an mgf. Then there is a unique cdf $F_X$ whose moments are determined by $M_X(t)$, and for all $x$ where $F_X$ is continuous, we have

$$
\lim_{i\to \infty} F_{X_i}(x) = F_X(x)
$$

That is convergence for $|t|<h$ of mgfs to an mgf implies convergence of cdfs.


**Leibnitz's Rule** If $f(x,\theta)$,$a(\theta)$, and $b(\theta)$ are differentiable functions of $\theta$, then

$$
\frac{d}{d\theta}\int_{a(\theta)}^{b(\theta)} f(x,\theta) dx = \int_{a(\theta)}^{b(\theta)} \frac{\partial}{\partial \theta} f(x,\theta) dx + f(b(\theta),\theta)\frac{db}{d\theta} - f(a(\theta),\theta)\frac{da}{d\theta}
$$

**Theorem 2.4.2** Suppose the function $h(x,y)$ is continuous at $y_0$ for each $x$, and there exists a function $g(x)$ satisfying

1. $|h(x,y)|\le g(x)$ for all $x$ and $y$

2. $\int_{-\infty}^{\infty} g(x) dx < \infty$

Then

$$
\lim_{y\to y_0} \int_{-\infty}^{\infty} h(x,y) dx = \int_{-\infty}^{\infty} \lim_{y\to y_0} h(x,y) dx
$$

**Theorem 2.4.3** Suppose $f(x,\theta)$ is differentiable at $\theta=\theta_0$, and there exists a function $g(x,\theta_0)$ and a constant $\delta_0>0$ such that

1. $\left|\frac{f(x,\theta_0+\delta)-f(x,\theta_0)}{\delta}\right| \le g(x,\theta_0)$ for all $x$ and $|\delta|<\delta_0$

2. $\int_{-\infty}^{\infty} g(x,\theta_0) dx < \infty$

Then

$$
\frac{d}{d\theta}\int_{-\infty}^{\infty} f(x,\theta) dx \Big|_{\theta=\theta_0} = \int_{-\infty}^{\infty} \frac{\partial}{\partial \theta} f(x,\theta) \Big|_{\theta=\theta_0} dx
$$

---

## Common Families of Distributions

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

## Multiple Random Variables

---

An **$n$-dimensional random vector** is a function from a sample space $S$ into $\mathbb{R}^n$, $n$-dimensional Euclidean space. 

Let $(X,Y)$ be a discrete bivariate random vector. Then the function $f(x,y)$ from $\mathbb{R}^2$ into $\mathbb{R}$ defined by $f(x,y)=P(X=x,Y=y)$ is called the **joint probability mass function** or **joint pmf** of $(X,Y)$. 

**Theorem 4.1.6** Let $(X,Y)$ be a discrete bivariate random vector with joint pmf $f_{X,Y}(x,y)$. Then the marginal pmfs of $X$ and $Y$, $f_X(x)=P(X=x)$ and $f_Y(y)=P(Y=y)$, are given by

$$
f_X(x)=\sum_{y\in \mathbb{R}} f_{X,Y}(x,y), \quad f_Y(y)=\sum_{x\in \mathbb{R}} f_{X,Y}(x,y)
$$

A function $f(x,y)$ from $\mathbb{R}^2$ into $\mathbb{R}$ is called a **joint probability density function** or **joint pdf** of the continuous bivariate random vector $(X,Y)$ if for every set $A\subset \mathbb{R}^2$,

$$
P((X,Y)\in A) = \int\int_{(x,y)\in A} f(x,y) dx dy
$$

the **expected value** of $g(X,Y)$ is defined to be

$$
\mathrm{E}[g(X,Y)] = \int_{-\infty}^{\infty}\int_{-\infty}^{\infty} g(x,y) f(x,y) dx dy
$$

the **marginal probability density functions** of $X$ and $Y$ are defined to be

$$
f_X(x) = \int_{-\infty}^{\infty} f(x,y) dy, \quad f_Y(y) = \int_{-\infty}^{\infty} f(x,y) dx
$$

Let $(X,Y)$ be a discrete bivariate random vector with joint pmf $f(x,y)$ and marginal pmfs $f_X(x)$ and $f_Y(y)$. For any $x$ such that $P(X=x)= f_X(x)>0$, the **conditional pmf** of $Y$ given that $X=x$ is the function of $y$ denoted by $f(y|x)$ and defined by

$$
f(y|x) = P(Y=y|X=x) =  \frac{f(x,y)}{f_X(x)}
$$

For any $y$ such that $P(Y=y)= f_Y(y)>0$, the **conditional pmf** of $X$ given that $Y=y$ is the function of $x$ denoted by $f(x|y)$ and defined by

$$
f(x|y) = P(X=x|Y=y) =  \frac{f(x,y)}{f_Y(y)}
$$

For continuous random variables, the **conditional pdf** is same as above.

If $g(Y)$ is a function of $Y$, then the **conditional expected value** of $g(Y)$ given that $X=x$ is denoted by $\mathrm{E}[g(Y)|x]$ and given by

$$
\mathrm{E}[g(Y)|x] = \int_{-\infty}^{\infty} g(y) f(y|x) dy \quad\text{ and } \quad\mathrm{E}[g(Y)|x] = \sum_{y} g(y) f(y|x)
$$

The variance of the probability distribution described by $f(y|x)$ is called the **conditional variance of $Y$ given $X=x$**, we have

$$
\mathrm{Var}(Y|x) = \mathrm{E}[Y^2|x]-(\mathrm{E}[Y|x])^2
$$


Let $(X,Y)$ be a bivariate random vector with joint pdf or pmf $f(x,y)$ and marginal pdfs or pmfs $f_X(x)$ and $f_Y(y)$. Then $X$ and $Y$ are called **independent random variables** if for all $x\in \mathbb{R}$ and $y\in \mathbb{R}$, we have

$$
f(x,y) = f_X(x)f_Y(y)
$$

**Lemma 4.2.7** Let $(X,Y)$ be a bivariate random vector with joint pdf or pmf $f(x,y)$ and marginal pdfs or pmfs $f_X(x)$ and $f_Y(y)$. Then $X$ and $Y$ are independent iff there exist functions $g(x)$ and $h(y)$ such that, for every $x\in \mathbb{R}$ and $y\in \mathbb{R}$, 

$$
f(x,y) = g(x)h(y)
$$

**Theorem 4.2.10** Let $X$ and $Y$ be independent random variables. 

1. For any $A\subset \mathbb{R}$ and $B\subset \mathbb{R}$, $P(X\in A, Y\in B) = P(X\in A)P(Y\in B)$ that is, the events $\left\{X\in A\right\}$ and $\left\{Y\in B\right\}$ are independent events.

2. Let $g(x)$ be a function only of $x$ and let $h(y)$ be a function only of $y$. Then

$$
\mathrm{E}(g(X)h(Y)) = \mathrm{E}(g(X))\mathrm{E}(h(Y))
$$

3. The moment generating function of $Z=X+Y$ is given by

$$
M_Z(t) = M_X(t)M_Y(t)
$$

For example, if $X\sim n(\mu,\sigma^2)$ and $Y\sim n(\gamma,\tau^2)$ be independent, then $Z=X+Y\sim n(\mu+\gamma,\sigma^2+\tau^2)$. If $X\sim \text{Poisson}(\theta)$ and $Y\sim \text{Poisson}(\lambda)$ be independent, then $Z=X+Y\sim \text{Poisson}(\theta+\lambda)$. 

Let $(X,Y)$ be a bivariate random vector with a known probability distribution. Now cansider a new bivariate random vector $(U,V)$ defined by $U=g_1(X,Y)$ and $V=g_2(X,Y)$, where $g_1(x,y)$ and $g_2(x,y)$ are some specified functions. Then the joint pdf of $(U,V)$ is given by

$$
f_{U,V}(u,v) = f_{X,Y}(g_1^{-1}(u,v), g_2^{-1}(u,v)) \left| \frac{\partial (x,y)}{\partial (u,v)} \right|
$$

**Theorem 4.3.5** Let $X$ and $Y$ be independent random variables. Let $g(x)$ be a function only of $x$ and let $h(y)$ be a function only of $y$. Then the random variables $U=g(X)$ and $V=h(Y)$ are independent.

**Theorem 4.4.3** If $X$ and $Y$ are any two random variables, then

$$
\mathrm{E}X=\mathrm{E}(\mathrm{E}(X|Y))
$$


A random variable $X$ is said to have a **mixture distribution** if the distribution of $X$ depends on a quantity that also has a distribution.

**Conditional variance identity:** For any two random variables $X$ and $Y$,

$$
\mathrm{Var}X=\mathrm{E}(\mathrm{Var}(X|Y))+\mathrm{Var}(\mathrm{E}(X|Y))
$$

provided that the expectations exist.

We use notation $\mu_X=\mathrm{E}X$, $\sigma_X^2=\mathrm{Var}X$.

The **covariance of $X$ and $Y$** is the number defined by

$$
\mathrm{Cov}(X,Y)=\mathrm{E}((X-\mu_X)(Y-\mu_Y))
$$

The **correlation of $X$ and $Y$** is the number defined by

$$
\rho_{XY}=\frac{\mathrm{Cov}(X,Y)}{\sigma_X\sigma_Y}
$$

The value $\rho_{XY}$ is also called the **correlation coefficient**.

**Theorem 4.5.3**

$$
\mathrm{Cov}(X,Y)=\mathrm{E}XY-\mu_X\mu_Y
$$

**Theorem 4.5.5** If $X$ and $Y$ are independent, then $\mathrm{Cov}(X,Y)=0$ and $\rho_{XY}=0$.

**Theorem 4.5.6** If $X$ and $Y$ are random variables and $a$ and $b$ are constants, then

$$
\mathrm{Var}(aX+bY) = a^2\mathrm{Var}X + b^2\mathrm{Var}Y + 2ab\mathrm{Cov}(X,Y)
$$

If $X$ and $Y$ are independent, then

$$
\mathrm{Var}(aX+bY) = a^2\mathrm{Var}X + b^2\mathrm{Var}Y
$$

**Theorem 4.5.7** For any random variables $X$ and $Y$,

1. $-1\le \rho_{XY} \le 1$

2. $|\rho_{XY}|=1$ iff there exist constants $a$ and $b$ such that $P(Y=aX+b)=1$. If $\rho_{XY}=1$, then $a>0$; if $\rho_{XY}=-1$, then $a<0$.

Let $-\infty<\mu_X,\mu_Y<\infty$, $0<\sigma_X,0<\sigma_Y$, and $-1<\rho<1$. The **bivariate normal pdf** is given by

$$
f(x,y)=\left({2\pi\sigma_X\sigma_Y\sqrt{1-\rho^2}}\right)^{-1}\exp\left\{-\frac{1}{2(1-\rho^2)}\left[\left(\frac{x-\mu_X}{\sigma_X}\right)^2-2\rho\left(\frac{x-\mu_X}{\sigma_X}\right)\left(\frac{y-\mu_Y}{\sigma_Y}\right)+\left(\frac{y-\mu_Y}{\sigma_Y}\right)^2\right]\right\}
$$

1. The marginal distributions of $X$ is $n(\mu_X,\sigma_X^2)$.

2. The marginal distributions of $Y$ is $n(\mu_Y,\sigma_Y^2)$.

3. The correlation between $X$ and $Y$ is $\rho_{XY}=\rho$.

4. For any constants $a$ and $b$, the distribution of $aX+bY$ is $n(a\mu_X+b\mu_Y,a^2\sigma_X^2+b^2\sigma_Y^2+2ab\rho\sigma_X\sigma_Y)$.


---

The random vector $\bm{X}=(X_1,\cdots,X_n)$ has a sample space that is a subset of $\mathbb{R}^n$. If $(X_1,\cdots,X_n)$ is a discrete random vector, then the **joint pmf of $(X_1,\cdots,X_n)$** is the function defined by $f(\bm{x})=f(x_1,\cdots,x_n)=P(X_1=x_1,\cdots,X_n=x_n)$. Then for any $A\subset \mathbb{R}^n$,

$$
P(\bm{X}\in A)=\sum_{\bm{x}\in A} f(\bm{x})
$$

If $(X_1,\cdots,X_n)$ is a continuous random vector, then the **joint pdf of $(X_1,\cdots,X_n)$** is the function defined by $f(\bm{x})=f(x_1,\cdots,x_n)$ that satisfies, 

$$
P(\bm{X}\in A)=\int\cdots\int_{ A} f(\bm{x}) dx_1\cdots dx_n
$$

Let $g(\bm{x})=g(x_1,\cdots,x_n)$ be a real-valued function defined on the sample space of $\bm{X}$. Then $g(\bm{X})$ is a random variable and the **expected value of $g(\bm{X})$** is 

$$
\mathrm{E}g(\bm{X})=\int_{-\infty}^{\infty}\cdots\int_{-\infty}^{\infty} g(\bm{x}) f(\bm{x}) d\bm{x} \quad\text{and}\quad \mathrm{E}g(\bm{X})=\sum_{\bm{x}} g(\bm{x}) f(\bm{x})
$$

The marginal distribution of $(X_1,\cdots,X_k)$ is given by the pdf or pmf

$$
f(x_1,\cdots,x_k)=\int_{-\infty}^{\infty}\cdots\int_{-\infty}^{\infty} f(x_1,\cdots,x_n) dx_{k+1}\cdots dx_n
$$

or

$$
f(x_1,\cdots,x_k)=\sum_{(x_{k+1},\ldots,x_n)\in \mathbb{R}^{n-k}} f(x_1,\cdots,x_n)
$$

The **conditional pdf or pmf** of $(X_{k+1},\cdots,X_n)$ given $(X_1,\cdots,X_k)=(x_1,\cdots,x_k)$ is defined by

$$
f(x_{k+1},\cdots,x_n|x_1,\cdots,x_k) = \frac{f(x_1,\cdots,x_n)}{f(x_1,\cdots,x_k)}
$$

Let $n$ and $m$ be positive integers and let $p_1,\cdots,p_n$ be numbers satisfying $0\le p_i\le 1$ and $\sum_{i=1}^{n} p_i=1$. Then the random vector $(X_1,\cdots,X_n)$ has a **multinomial distribution with m trials and cell probabilities $p_1,\cdots,p_n$** if the joint pmf of $(X_1,\cdots,X_n)$ is 

$$
f(x_1,\cdots,x_n) = \frac{m!}{x_1!\cdots x_n!} p_1^{x_1}\cdots p_n^{x_n}, \quad x_i=0,1,\cdots,m, \sum_{i=1}^{n} x_i=m 
$$

Let $\bm{X}_1,\cdots,\bm{X}_n$ be random vectors with joint pdf or pmf $f(\bm{x}_1,\cdots,\bm{x}_n)$. Let $f_{\bm{X}}(\bm{x})$ denote the marginal pdf or pmf of $\bm{X}_i$. Then $\bm{X}_1,\cdots,\bm{X}_n$ are called **mutually independent random vectors** if for every $(\bm{x}_1,\cdots,\bm{x}_n)$,

$$
f(\bm{x}_1,\cdots,\bm{x}_n) = f_{\bm{X}_1}(\bm{x}_1)\cdots f_{\bm{X}_n}(\bm{x}_n)
$$

If the $\bm{X}_i$ are all one-dimensional, then the $\bm{X}_i$ are called **mutually independent random vectors**. Then

$$
E(g_1(\bm{X}_1)\cdots g_n(\bm{X}_n)) = E(g_1(\bm{X}_1))\cdots E(g_n(\bm{X}_n))
$$

For $Z=\bm{X}_1+\cdots+\bm{X}_n$, the mgf of $Z$ is given by

$$
M_Z(t) = M_{\bm{X}_1}(t)\cdots M_{\bm{X}_n}(t)
$$

**Theorem 4.6.11** Let $\bm{X}_1,\cdots,\bm{X}_n$ be random vectors. Then $\bm{X}_1,\cdots,\bm{X}_n$ are mutually independent iff there exist functions $g_i(\bm{x}_i)$ such that, the joint pdf or pmf of $(\bm{X}_1,\cdots,\bm{X}_n)$ can be written as

$$
f(\bm{x}_1,\cdots,\bm{x}_n) = g_1(\bm{x}_1)\cdots g_n(\bm{x}_n)
$$

**Theorem 4.6.12** Let $\bm{X}_1,\cdots,\bm{X}_n$ be mutually independent random vectors. Let $g_i(\bm{x}_i)$ be a function only of $\bm{x}_i$. Then the random variables $U_i=g_i(\bm{X}_i)$ are mutually independent.

Let $(X_1,\cdots,X_n)$ be a random vector with pdf $f_{\bm{X}}(x_1,\cdots,x_n)$. Consider $U_i=g_i(X_1,\cdots,X_n)$, we have the following representation of the joint pdf of $(U_1,\cdots,U_n)$:

$$
f_{\bm{U}}(u_1,\cdots,u_n) = f_{\bm{X}}(g_1^{-1}(u_1,\cdots,u_n),\cdots,g_n^{-1}(u_1,\cdots,u_n)) \left| \frac{\partial (x_1,\cdots,x_n)}{\partial (u_1,\cdots,u_n)} \right|
$$

**Young** For $a,b,p,q>0$ such that $\frac{1}{p}+\frac{1}{q}=1$, we have

$$
ab\le \frac{a^p}{p}+\frac{b^q}{q}
$$

**Holder** Let $X$ and $Y$ be random variables and let $p,q>0$ such that $\frac{1}{p}+\frac{1}{q}=1$. Then

$$
|\mathrm{E}XY|\le \mathrm{E}|XY|\le (\mathrm{E}|X|^p)^{1/p}(\mathrm{E}|Y|^q)^{1/q}
$$

**Minkowski** Let $X$ and $Y$ be random variables and let $1\le p < \infty$. Then

$$
(\mathrm{E}|X+Y|^p)^{1/p} \le (\mathrm{E}|X|^p)^{1/p} + (\mathrm{E}|Y|^p)^{1/p}
$$

A function $g(x)$ is **convex** if $g(\lambda x+(1-\lambda)y)\le \lambda g(x) + (1-\lambda)g(y)$ for all $x,y$ and $0\le \lambda \le 1$. A function $g(x)$ is **concave** if $-g(x)$ is convex.

**Jensen** For any random variable $X$ and any convex function $g(x)$, we have

$$
g(\mathrm{E}X)\le \mathrm{E}g(X)
$$

**Covariance Inequality** Let $X$ be any random variable and $g(x)$ and $h(x)$ any functions such that $\mathrm{E}g(X), \mathrm{E}h(X), \mathrm{E}(g(X)h(X))$ exist. Then

1. If $g(x)$ is nondeceasing funcction and $h(x)$ is a nonincreasing function, then

$$
\mathrm{E}(g(X)h(X)) \le \mathrm{E}g(X)\mathrm{E}h(X)
$$

2. If $g(x)$ and $h(x)$ are either both nondecreasing or both nonincreasing, then 

$$
\mathrm{E}(g(X)h(X)) \ge \mathrm{E}g(X)\mathrm{E}h(X)
$$

---

## Properties of a Random Sample

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

