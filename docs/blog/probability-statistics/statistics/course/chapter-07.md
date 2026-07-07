---
title: Point Estimation
date: 2026-07-04
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

# Point Estimation

---

A **point estimator** is any function $W(X_1, \cdots, X_n)$ of a sample; that is, any statistic is a point estimator. 

---

**The method of moments** is a technique for constructing point estimators by equating sample moments to population moments.

Let $X_1, X_2, \cdots, X_n$ be a sample from a population with pdf or pmf $f(x|\theta)$. Define

$$
\begin{aligned}
m_1=\frac{1}{n}\sum_{i=1}^n X_i^1,& \quad \mu'_1=EX^1,\\
m_2=\frac{1}{n}\sum_{i=1}^n X_i^2,& \quad \mu'_2=EX^2,\\
\vdots& \\
m_k=\frac{1}{n}\sum_{i=1}^n X_i^k,& \quad \mu'_k=EX^k.
\end{aligned}
$$

The population moments $\mu'_j$ will typically be a function of $\theta_1,\cdots,\theta_k$, say $\mu'_j(\theta_1,\cdots,\theta_k)$. The method of moments estimator $(\hat{\theta}_1, \cdots, \hat{\theta}_k)$ of $(\theta_1, \cdots, \theta_k)$ is obtained by solving the following system of equations for $(\theta_1, \cdots, \theta_k)$ in terms of $(m_1, \cdots, m_k)$:

$$
\begin{aligned}
m_1&=\mu'_1(\theta_1, \cdots, \theta_k),\\
m_2&=\mu'_2(\theta_1, \cdots, \theta_k),\\
\vdots& \\
m_k&=\mu'_k(\theta_1, \cdots, \theta_k).
\end{aligned}
$$

---

**The method of maximum likelihood** is a technique for constructing point estimators by maximizing the likelihood function, that if $X_1, \cdots, X_n$ is a sample from a population with pdf or pmf $f(x|\theta_1,\cdots,\theta_k)$, then the likelihood function is defined by

$$
L(\theta|\bm{x})=L(\theta_1, \cdots, \theta_k|x_1, \cdots, x_n)=\prod_{i=1}^n f(x_i|\theta_1, \cdots, \theta_k)
$$

For each sample point $\bm{x}$, let $\hat{\theta}(\bm{x})$ be a parameter value at which $L(\theta|\bm{x})$ attains its maximum as a function of $\theta$, with $\bm{x}$ held fixed. A **maximum likelihood estimator (MLE)** of the parameter $\theta$ based on a sample $\bm{X}$ is $\hat{\theta}(\bm{X})$.

**Theorem 7.2.10** If $\hat{\theta}$ is the MLE of $\theta$, then for any function $\tau(\theta)$, the MLE of $\tau(\theta)$ is $\tau(\hat{\theta})$.

---

**The EM(Expectation-Maximization) algorithm** is an iterative method for finding MLEs when the data is incomplete or has missing values. It consists of two steps: the E-step, where we compute the expected value of the log-likelihood function with respect to the current estimate of the parameters, and the M-step, where we maximize this expected log-likelihood to update our parameter estimates.

The EM algorithm allows us to maximize $L(\theta|\bm{y})$ by working with only $L(\theta|\bm{y},\bm{x})$ and the conditional pdf or pmf of $\bm{X}$ given $\bm{y}$ and $\theta$ defined by

$$
L(\theta|\bm{x},\bm{y})=f(\bm{y},\bm{x}|\theta),\quad L(\theta|\bm{y})=g(\bm{y}|\theta),\quad k(\bm{x}|\theta,\bm{y})=\frac{f(\bm{y},\bm{x}|\theta)}{g(\bm{y}|\theta)}
$$

which gives the identity

$$
\log L(\theta|\bm{y}) = \log L(\theta|\bm{x},\bm{y}) - \log k(\bm{x}|\theta,\bm{y})
$$

As $\bm{x}$ is missing data and hence not observed, we replace the riht side of above with its expection under $k(\bm{x}|\theta',\bm{y})$:

$$
\log L(\theta|\bm{y}) = E[\log L(\theta|\bm{y},\bm{X})|\theta',\bm{y}] - E[\log k(\bm{X}|\theta,\bm{y})|\theta',\bm{y}]
$$

From an initial value $\theta^{(0)}$, we can create a sequence $\theta^{(r)}$ according to 

$$
\theta^{(r+1)} = \arg\max_\theta E[\log L(\theta|\bm{y},\bm{X})|\theta^{(r)},\bm{y}]
$$

**Theorem 7.2.20** The sequence $\left\{\hat{\theta}^{(r)}\right\}$ defined by above satisfies

$$
L(\hat{\theta}^{(r+1)}|\bm{y}) \ge L(\hat{\theta}^{(r)}|\bm{y})
$$

with equality holding iff successive iterations yield the same value of the maximized expected complete-data log likelihood, that is

$$
E[\log L(\hat{\theta}^{(r+1)}|\bm{y},\bm{X})|\hat{\theta}^{(r)},\bm{y}] = E[\log L(\hat{\theta}^{(r)}|\bm{y},\bm{X})|\hat{\theta}^{(r)},\bm{y}]
$$

---

The **mean squared error (MSE)** of an estimator $W$ of a parameter $\theta$ is the function of $\theta$ defined by $E_\theta(W-\theta)^2$.

The **bias** of a point estimator $W$ of a parameter $\theta$ is defined by $\mathrm{Bias}_\theta(W)=E_\theta(W)-\theta$. An estimator is **unbiased** if $\mathrm{Bias}_\theta(W)=0$ for all $\theta$.

---
