---
title: Transformation and expectation
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

# Transformation and expectation

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
