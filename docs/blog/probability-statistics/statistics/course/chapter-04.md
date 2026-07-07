---
title: Multiple Random Variables
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

# Multiple Random Variables

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
