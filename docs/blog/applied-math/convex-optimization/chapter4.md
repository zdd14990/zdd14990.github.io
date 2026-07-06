---
title: 几何对偶框架
date: 2025-11-25
hide:
  - navigation
categories:
  - 应用数学
  - 凸优化
tags:
  - applied-math
  - convex-optimization
---
# 几何对偶框架

## 最小公共点和最大相交点问题
我们介绍一对基本问题。

### 最小公共点问题

设 $M$ 是 $\mathbb{R}^{n+1}$ 的非空子集。**最小公共点问题(minimum common point problem)**：寻找点 $(x,w)\in M$ 使得 $w$ 最小化。

### 最大相交点问题

设 $M$ 是 $\mathbb{R}^{n+1}$ 的非空子集。**最大相交点问题(maximum intersecting point problem)**：考虑所有包含了 $M$ 的非垂直超平面，寻找其中与第 $n+1$ 维轴交点最大的超平面。

对最小公共问题 $w^*=\inf\{w|(x,w)\in M\}$，对最大相交点问题，我们考虑法向量为 $(\mu,1)$ 的超平面其相交点 $\xi$ 满足 $$\xi\le w+\mu'u,\forall (u,w)\in M$$从而最大相交点问题可表述为最大化 $\xi\le \inf_{(u,w)\in M} (w+\mu'u),\mu\in \mathbb{R}^n$，即$$\text{maximize } q(\mu)=\inf_{(u,w)\in M} (w+\mu'u),\quad \text{subject }\mu\in \mathbb{R}^n. $$

容易得到如下的**弱对偶(weak duality)**结果：
$$q(\mu)=\inf_{(u,w)\in M} (w+\mu'u)\le \inf_{(0,w)\in M} w=w^*,\forall \mu\in \mathbb{R}^n. $$
我们称**强对偶(strong duality)**成立，若 $q^*=w^*$。

**例子：**

$$M=\text{epi}(p)$$其中 $p:\mathbb{R}^n\rightarrow [-\infty,\infty]$，则 $w^*=p(0)$，且 $$q(\mu)=\inf_{(u,w)\in \text{epi}(p)} (w+\mu'u)=\inf_{u\in \mathbb{R}^n} (p(u)+\mu'u)=-p^*(-\mu). $$
进而有 $$q^*=\sup_{\mu\in \mathbb{R}^n} q(\mu)=\sup_{\mu\in \mathbb{R}^n}\left\{0\cdot (-\mu)-p^*(-\mu)\right\}=p^{**}(0)$$

**例子：**

考虑更一般的最小化 $f:\mathbb{R}^n \rightarrow [-\infty ,\infty]$ 的问题 。设 $F:\mathbb{R}^{n+r}\rightarrow [-\infty ,\infty]$ 为 $$f(x)=F(x,0),\forall x\in \mathbb{R}^n. $$
考虑**扰动函数(perturbation function)** $$p(u)=\inf_{x\in \mathbb{R}^n} F(x,u),\forall u\in \mathbb{R}^r. $$且 MC/MC 框架为 $M=\mathrm{epi}(p)$。

其最小公共值 $$w^*=p(0)=\inf_{x\in \mathbb{R}^n} F(x,0)=\inf_{x\in \mathbb{R}^n} f(x). $$
其对偶函数为 $$q(\mu)=\inf_{u\in \mathbb{R}^r} (p(u)+\mu'u)=\inf_{(x,u)\in \mathbb{R}^{n+r}} (F(x,u)+\mu'u). $$故 $q(\mu)=-F^*(0,-\mu)$，其中 $F^*$ 是 $F$ 的共轭函数，视作 $(x,u)$ 的函数。

我们有 $$q^*=\sup_{\mu\in \mathbb{R}^r} q(\mu)=-\inf_{\mu \in \mathbb{R}^r} F^*(0,-\mu)=-\inf_{\mu \in \mathbb{R}^r} F^*(0,\mu) $$
且弱对偶性形如：$$w^*=\inf_{x\in \mathbb{R}^n} F(x,0)\ge =-\inf_{\mu \in \mathbb{R}^r} F^*(0,\mu)=q^*. $$

**例子：**

考虑约束优化：最小化 $f:\mathbb{R}^n\rightarrow \mathbb{R}$ 在 $$C=\left\{x\in X\Big| g(x)\le 0\right\}$$ 其中 $X\subset \mathbb{R}^n$，$g:\mathbb{R}^n\rightarrow \mathbb{R}^r$。

考虑**扰动约束集(perturbed constraint set)** $$C_u=\left\{x\in X\Big| g(x)\le u\right\},\forall u\in \mathbb{R}^r. $$与函数 $$F(x,u)=\begin{cases}
    f(x)\quad &if \,x\in C_u\\
    +\infty &otherwise\end{cases} $$
    这满足 $F(x,0)=f(x),\forall x\in C$。

**例子：**

考虑扰动函数 $$p(u)=\inf_{x\in \mathbb{R}^n} F(x,u)=\inf_{x\in C_u} f(x),\forall u\in \mathbb{R}^r. $$且 MC/MC 框架为 $M=\mathrm{epi}(p)$。

设 $L(x,\mu)=f(x)+\mu'g(x)$ 为 Lagrange 函数，则 $$q(\mu)=\inf_{u\in \mathbb{R}^r}\left\{p(u)+\mu'u\right\}=\inf_{u\in \mathbb{R}^r,x\in X,g(x)\le u}\left\{f(x)+\mu'u\right\}=\begin{cases}
    \inf_{x\in X} L(x,\mu)\quad &if \,\mu\ge 0\\
    -\infty &otherwise
\end{cases}$$

**例子：**

考虑线性规划问题：最小化 $c'x$ 在 $$C=\left\{x\in \mathbb{R}^n\Big| a'_jx\ge b_j,j=1,\cdots,r\right\}$$其中 $c\in \mathbb{R}^n$，$a_j\in \mathbb{R}^n$，$b_j\in \mathbb{R}$。

对 $\mu\ge 0$，对偶函数 $$q(\mu)=\inf_{x\in \mathbb{R}^n} \left\{c'x+\sum_{j=1}^r \mu_j(b_j -a'_jx)\right\}=\begin{cases}
    b'\mu \quad &if \,c=\sum_{j=1}^r \mu_ja_j\\
    -\infty &otherwise\end{cases} $$因此其对偶问题为 $$\text{maximize } b'\mu,\quad \text{subject to } A\mu=c,\mu\ge 0. $$

### Minimax Problem

给定函数 $\phi:X\times Z\rightarrow \mathbb{R}$，其中 $X\subset \mathbb{R}^n$，$Z\subset \mathbb{R}^m$，考虑$$\text{minimize } \sup_{z\in Z} \phi(x,z),\quad \text{subject to } x\in X. $$
或 $$\text{maximize } \inf_{x\in X} \phi(x,z),\quad \text{subject to } z\in Z. $$

我们总是有 $$\sup_{z\in Z} \inf_{x\in X} \phi(x,z)\le \inf_{x\in X} \sup_{z\in Z} \phi(x,z). $$
一个关键问题是：何时等号成立？

**例子：**

对于约束问题 $$\text{minimize } f(x),\quad \text{subject to } g(x)\le 0,x\in X $$其 Lagrange 函数为 $L(x,\mu)=f(x)+\mu'g(x)$，其原始问题为 $$\min_{x\in X} \sup_{\mu\ge 0} L(x,\mu)$$
其对偶问题为 $$\max_{\mu\ge 0} \inf_{x\in X} L(x,\mu). $$
其等号成立需考虑何时 $$\sup_{\mu\ge 0} \inf_{x\in X} L(x,\mu)=w^*\overset{?}{=}q^*=\inf_{x\in X} \sup_{\mu\ge 0} L(x,\mu). $$

### Zero Sum Games

两个玩家：第一个选择 $i\in \left\{1,\cdots, n\right\}$，第二个选择 $j\in \left\{1,\cdots, m\right\}$。支付矩阵为 $A\in \mathbb{R}^{n\times m}$，则第一个玩家从第二个玩家处获得 $a_{ij}$。两个玩家选择 $$x=(x_1,\cdots,x_n)\quad z=(z_1,\cdots,z_m) $$其中 $x_i$ 和 $z_j$ 分别为两个玩家选择 $i$ 和 $j$ 的概率。则第一个玩家的期望收益为 $$\phi(x,z)=x'Az=\sum_{i=1}^n \sum_{j=1}^m a_{ij}x_iz_j. $$

第一个玩家的目标是最大化其最小收益：$\text{minmize } \max_{z} \phi(x,z)$

第二个玩家的目标是最小化其最大损失： $\text{maximize } \min_{x} \phi(x,z)$

<br>
<hr>

<div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;" markdown="1">

[ :octicons-arrow-left-24: 上一章： 凸优化](chapter3.md){ .md-button }

[ 下一章：还没写 :octicons-arrow-right-24: ](chapter4.md){ .md-button .md-button--primary }

</div>