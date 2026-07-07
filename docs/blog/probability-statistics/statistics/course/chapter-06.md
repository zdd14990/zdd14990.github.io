---
title: Principles of Data Reduction
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

# Principles of Data Reduction

---

A **sufficient statistic** for a parameter $\theta$ is a statistic that, in a certain sense, captures all the information about $\theta$ contained in the sample. Any additional information in the sample, besides the value of the sufficient statistic, does not contain any more information about $\theta$.

A statistic $T(\bm{X})$ is a **sufficient statistic for $\theta$** if the conditional distribution of the sample $\bm{X}$ given $T(\bm{X})$ does not depend on $\theta$. 

We need to show that $\bm{X}$ and $\bm{Y}$ have the same unconditional distribution, where $\bm{Y}$ is a random vector with the same distribution as $\bm{X}$, but independent of $T(\bm{X})$. That is $P_\theta(\bm{X}=\bm{x}) = P_\theta(\bm{Y}=\bm{x})$ for all $\bm{x}$ and $\theta$. Note that the events $\{\bm{X}=\bm{x}\}$ and $\{\bm{Y}=\bm{x}\}$ are both subsets of the event $\{T(\bm{X})=T(\bm{x})\}$. Also recall that

$$
P_\theta(\bm{X}=\bm{x}|T(\bm{X})=T(\bm{x}))=P_\theta(\bm{Y}=\bm{x}|T(\bm{X})=T(\bm{x}))
$$

and these conditional probabilities do not depend on $\theta$. Therefore, we have

$$
\begin{aligned}
P_\theta(\bm{X}=\bm{x}) &= P_\theta(\bm{X}=\bm{x} \text{ and } T(\bm{X})=T(\bm{x})) \\
&= P_\theta(\bm{X}=\bm{x}|T(\bm{X})=T(\bm{x}))P_\theta(T(\bm{X})=T(\bm{x})) \\
&= P_\theta(\bm{Y}=\bm{x}|T(\bm{X})=T(\bm{x}))P_\theta(T(\bm{X})=T(\bm{x})) \\
&= P_\theta(\bm{Y}=\bm{x} \text{ and } T(\bm{X})=T(\bm{x})) \\
&= P_\theta(\bm{Y}=\bm{x})
\end{aligned}
$$

So we must verify only that $P_\theta(\bm{X}=\bm{x}|T(\bm{X})=T(\bm{x}))$ does not depend on $\theta$.

$$
\begin{aligned}
P_\theta(\bm{X}=\bm{x}|T(\bm{X})=T(\bm{x})) &= \frac{P_\theta(\bm{X}=\bm{x}) \text{ and } T(\bm{X})=T(\bm{x}))}{P_\theta(T(\bm{X})=T(\bm{x})) }\\
&= \frac{P_\theta(\bm{X}=\bm{x})}{P_\theta(T(\bm{X})=T(\bm{x})) }\\
&= \frac{p(\bm{x}|\theta)}{q(T(\bm{x})|\theta)}
\end{aligned}
$$

where $p(\bm{x}|\theta)$ is the joint pmf of the sample $\bm{X}$ and $q(t|\theta)$ is the pmf of $T(\bm{X})$. 

**Theorem 6.2.2** If $p(\bm{x}|\theta)$ is the joint pdf or pmf of $\bm{X}$, and  $q(t|\theta)$  is the pdf or pmf of $T(\bm{X})$, then $T(\bm{X})$ is a sufficient statistic for $\theta$ if, for every $\bm{x}$ in the sample space, the ratio $p(\bm{x}|\theta)/q(T(\bm{x})|\theta)$ is constant as a function of $\theta$.

**Factorization Theorem** Let $f(\bm{x}|\theta)$ denote the joint pdf or pmf of a sample $\bm{X}$. A statistic $T(\bm{X})$ is a sufficient statistic for $\theta$ if and only if there exist functions $g(t|\theta)$ and $h(\bm{x})$ such that, for all sample points $\bm{x}$ and all parameter values $\theta$,

$$
f(\bm{x}|\theta) = g(T(\bm{x})|\theta)h(\bm{x})
$$

**Theorem 6.2.10** Let $X_1, X_2, \cdots, X_n$ be iid observations from a pdf or pmf $f(x|\theta)$ that belongs to an exponential family given by

$$
f(x|\theta)=h(x)c(\theta)\exp\left\{\sum_{i=1}^k w_i(\theta)t_i(x)\right\}
$$

where $\bm{\theta}=(\theta_1, \cdots, \theta_d),d\le k$. Then

$$
T(\bm{X})=\left(\sum_{i=1}^n t_1(X_i), \cdots, \sum_{i=1}^n t_k(X_i)\right)
$$

is a sufficient statistic for $\bm{\theta}$.

A sufficient statistic $T(\bm{X})$ is called a **minimal sufficient statistic** if, for any other sufficient statistic $T'(\bm{X})$, $T(\bm{X})$ is a function of $T'(\bm{X})$. 

**Theorem 6.2.13** Let $f(\bm{x}|\theta)$ be the pmf or pdf of a sample $\bm{X}$. Suppose there exists a function $T(\bm{x})$ such that, for every two sample points $\bm{x}$ and $\bm{y}$, the ratio $f(\bm{x}|\theta)/f(\bm{y}|\theta)$ is constant as a function of $\theta$ iff $T(\bm{x})=T(\bm{y})$. Then $T(\bm{X})$ is a minimal sufficient statistic for $\theta$.

A statistic $S(\bm{X})$ whose distribution does not depend on the parameter $\theta$ is called an **ancillary statistic**.

Let $f(t|\theta)$ be a family of pdfs or pmfs for a statistic $T(\bm{X})$. The family of probability distributions is called **complete** if $E_\theta[g(T)] = 0$ for all $\theta$ implies $P_\theta(g(T)=0)=1$ for all $\theta$. Equivalently, $T(\bm{X})$ is called a **complete statistic**.

**Basu's Theorem** If $T(\bm{X})$ is a complete and minimal sufficient statistic, then $T(\bm{X})$ is independent of every ancillary statistic.

**Complete statistics in the exponential family** Let $X_1, X_2, \cdots, X_n$ be iid observations from an exponential family with pdf or pmf of the form 

$$
f(x|\bm{\theta})=h(x)c(\bm{\theta})\exp\left\{\sum_{j=1}^k w(\theta_j)t_j(x)\right\}
$$

where $\bm{\theta}=(\theta_1, \cdots, \theta_k)$, Then the statistic

$$
T(\bm{X})=\left(\sum_{i=1}^n t_1(X_i), \cdots, \sum_{i=1}^n t_k(X_i)\right)
$$

is complete as long as the parameter space $\Theta$ contains an open set in $\mathbb{R}^k$.

**Theorem 6.2.28** If a minimal sufficient statistic exists, then any complete statistic is also a minimal sufficient statistic.

---
