---
title: Probability Theory
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

# Probability Theory

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
