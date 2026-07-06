---
title: 凸优化
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
# 凸优化

## 共轭函数

### 共轭凸函数

对任意 $f:\mathbb{R}^n\rightarrow [-\infty,+\infty]$，其**共轭凸函数(conjugate convex function)** 定义为 $$f^*(y)=\sup_{x\in \mathbb{R}^n} (x'y -f(x)), \forall y\in \mathbb{R}^n. $$

**性质：**
$f^*$ 是闭且凸的函数。

### Conjugacy Theorem

若 $f$ 是闭且proper的凸函数，则 $f^{**}=f$。

### Conjugacy Theorem

设 $f:\mathbb{R}^n\rightarrow (-\infty,+\infty]$ ，设 $\check{\text{cl}}f$ 为其凸闭包，设 $f^*$ 是其共轭凸函数，考虑 $f^*$ 的共轭 $$f^{**}(x)=\sup_{y\in \mathbb{R}^n} (x'y -f^*(y)), \forall x\in \mathbb{R}^n. $$
* $f(x)\ge f^{**}(x),\forall x\in \mathbb{R}^n.$
* 若 $f$ 是凸的，则 $f,f^*,f^{**}$ 中任意一者是 proper 给出 另两者是 proper。
* 若 $f$ 是闭且 proper 的凸函数，则 $f=f^{**}$。
* 若 $\check{\text{cl}}f(x)>-\infty$ ，则 $\check{\text{cl}}f=f^{**}$。

**证明：**
$(a)$：显然。

$(b)$：由定义即得。

$(c)$：设 $g=f^{**}$，则 $g$ 是闭且 proper 的凸函数且 $f(x)\ge g(x),\forall x\in \mathbb{R}^n$。由支持超平面定理可知，$f$ 的任意支撑超平面也是 $g$ 的支撑超平面，故 $f=g$。

$(d)$：由$(a)$和$(c)$即得。

**例子：**

* 对 $\frac{1}{p}+\frac{1}{q}=1$，$p>1$ 的 $f(x)=\frac{1}{p}\|x\|^p$，其共轭函数为 $f^*(y)=\frac{1}{q}\|y\|^q$。
* $f(x)=\frac{1}{2}x'Qx+a'x+b$，$Q$ 为半正定矩阵，则 $f^*(y)=\frac{1}{2}(y-a)'Q^{-1}(y-a)-b$。
* $f(x)=p(A(x-c))+a'x+b$，则 $f^*(y)=q((A')^{-1}(y-a))+c'y+d$，其中 $q$ 是 $p$ 的共轭函数，$d=-(c'a+b)$。


<br>
<hr>

<div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;" markdown="1">

[ :octicons-arrow-left-24: 上一章：凸多面体](chapter2.md){ .md-button }

[ 下一章：几何对偶框架 :octicons-arrow-right-24: ](chapter4.md){ .md-button .md-button--primary }

</div>