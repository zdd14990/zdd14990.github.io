---
title: 第一章：常微分方程基础
date: 2026-07-07
updated: 2026-10-15
description: 计算与应用数学笔记第一章：ODE、初值问题与边值问题、齐次线性方程、解的线性无关性、朗斯基行列式、初值问题、边值问题、齐次线性方程解法。
hide:
  - navigation
categories:
  - 应用数学
tags:
  - ode
---

# 第一章：常微分方程基础 { #top }

## 1. ODE { #s1 }

!!! definition "定义"
    一个$n$阶微分方程具有如下形式

    $$
    y^{(n)}(x)=F[x,y(x),y'(x),\cdots,y^{(n-1)}(x)],
    \tag{1.1.1}
    $$

    其中 $y^{(k)}=d^ky/dx^k$。

    如果 $F$ 是 $y$ 及其导数的线性函数，则称方程 (1.1.1) 是**线性**微分方程。

如果 (1.1.1) 是线性的，则其通解 $y(x)$ 依赖于 $n$ 个独立的参数（称为积分常数）且其所有解都可以通过适当选择这些常数得到。如果 (1.1.1) 是非线性微分方程，则它也有一个包含 $n$ 个积分常数的通解。然而，非线性微分方程有时存在特殊的额外解，这些解无法通过选择积分常数从通解中得到。我们省略对这些微分方程基本性质的严格讨论，在接下来的三个例子中说明它们。

!!! example "例（可分方程）"
    **可分方程(Separable equations)**是最容易求解的微分方程。如果一个方程是一阶的，且方程 (1.1.1) 中的 $F$ 关于 $x$ 和 $y$ 的依赖可以分离，则称它是**可分**的。

    最一般的可分方程是

    $$
    y'(x)=a(x)b(y)
    $$

    直接积分给出通解

    $$
    \int^y\frac{dt}{b(t)}=\int^xa(s)ds+c_1
    $$

    其中 $c_1$ 是积分常数。

形式上，线性微分方程可写为

$$
Ly(x)=f(x)
\tag{1.1.4}
$$

其中 $L$ 是线性微分算子：

$$
L=p_0(x)+p_1(x)\frac{d}{dx}+\cdots+p_{n-1}(x)\frac{d^{n-1}}{dx^{n-1}}+\frac{d^n}{dx^n}
\tag{1.1.5}
$$

!!! definition "定义"
    若 $f(x)\equiv 0$，则称微分方程 (1.1.4) 是**齐次(homogeneous)**的，否则是**非齐次(inhomogeneous)**的。

!!! example "例（线性方程的解）"
    齐次线性方程

    $$
    y''-\frac{1+x}{x}y'+\frac{1}{x}y=0
    \tag{1.1.6}
    $$

    的通解为 $y(x)=c_1e^x+c_2(1+x)$，这显式地依赖于两个积分常数 $c_1$ 和 $c_2$，这也给出了方程 (1.1.6) 的所有解。

!!! example "例（非线性方程的解）"
    两个常规可解的非线性微分方程是 Riccati 方程

    $$
    y'=\frac{A^2}{x^4}-y^2,\qquad \text{$A$ 是常数}
    $$

    其通解为

    $$
    y(x)=\frac{1}{x}+\frac{A}{x^2}\frac{c_1-e^{2A/x}}{c_1+e^{2A/x}}
    $$

    和等维方程

    $$
    y''=yy'/x
    \tag{1.1.9}
    $$

    其通解为

    $$
    y(x)=2c_1 \tan (c_1 \ln x+c_2)-1
    \tag{1.1.10}
    $$

    方程 (1.1.9) 存在一个特解 $y=c_3$，该解无法通过选择 $c_1$ 和 $c_2$ 从通解 (1.1.10) 中得到。

## 2. 初值问题与边值问题 { #s2 }

微分方程的解 $y(x)$ 不能仅由方程本身唯一确定，必须指定 $n$ 个独立积分常数的值。这些积分常数可通过多种不同方式指定。

在**初值问题(initial-value problem)**中，在单点 $x=x_0$ 处指定 $y$ 及其前 $n-1$ 阶导数 $y',\cdots,y^{(n-1)}$ 的值：

$$
\begin{aligned}
y(x_0)&=a_0,\\
y'(x_0)&=a_1,\cdots,\\
y^{(n-1)}(x_0)&=a_{n-1}.
\end{aligned}
\tag{1.2.1}
$$

其中 $a_0, \cdots, a_{n-1}$ 是初值问题的 $n$ 个积分常数。在**边值问题(boundary value problem)**中，在两个或多个点处总共指定 $n$ 个量。例如，对于五阶微分方程，可施加条件：$y(x_1) = a_1, \quad y'(x_2) = a_2, \quad y''(x_3) = a_3, \quad y'''(x_4) = a_4, \quad y'''(x_1) + [y(x_2)]^2 = a_5$，其中一些点 $x_i$ 可能位于求解区域 $y(x)$ 的内部而非边界上。但无论如何，$a_i$ 仍是该问题的积分常数。

关于初值和边值问题解的存在唯一性定理为应用分析的两个层次提供了基础。局部分析研究解在某点邻域的性质，当邻域足够小时结果有效。全局分析则试图在有限区域内确定解的性质，这一般更为困难。例如，渐近级数仅局部有效，而 WKB 近似是全局的。

初值问题本质上比边值问题简单得多。可通过局部分析判断在 $x_0$ 的足够小邻域内是否存在唯一解 $y(x)$。例如，可重复微分方程 (1.1.1)以计算 $y(x)$ 在 $x_0$ 处 Taylor 展开的系数。一般而言，若 $F, \partial F/\partial y, \partial F/\partial y', \cdots, \partial F/\partial y^{(n-1)}$ 在 $x_0, a_0, a_1, \cdots, a_{n-1}$ 的某邻域内均为 $x, y, y', \cdots, y^{(n-1)}$ 的连续函数，则在包含 $x_0$ 的某区间上存在满足 (1.1.1) 和 (1.2.1) 的唯一解 $y(x)$。

!!! example "例（存在唯一解的初值问题）"
    由于满足存在唯一性定理的条件，以下五个初值问题均有唯一解（当 $x$ 充分接近 0 时存在）：

    $$
    \begin{aligned}
    &(a)\quad y' = \sin (xy), &&y(0) = 1; \\
    &(b)\quad  y' = (x + y)x^2y^2, &&y(0) = 1; \\
    &(c)\quad y' = e^x + x/y, &&y(0) = 1; \\
    &(d)\quad  y'' = y^2 + e^x, &&y(0) = y'(0) = 0; \\
    &(e)\quad  y''' = e^{xyy'},&& y(0) = y'(0) = y''(0) = 0. \\
    \end{aligned}
    $$

    遗憾的是，这些解的存在性仅是理论上的，因为我们无法用已知函数表示其中任何一个。

若 $F$ 不是其自变量的光滑函数，则存在唯一性定理可能不成立。

!!! example "例（具有非唯一解的微分方程）"
    初值问题 $y' = y^{1/3}\ [ y(0) = 0]$ 中，$F$ 在 $x=0,y=0$ 附近连续但 $\partial F / \partial y$ 不连续。因此该问题存在两个解：$y=0$ 和 $y=(2x/3)^{3/2}$。注意到一阶方程 $y'=y^{1/3}$ 的通解为 $y(x)=\eta(2x/3+c_1)^{3/2}$，其中 $\eta=\pm1,0$，$c_1$ 任意。此通解不仅依赖于积分常数 $c_1$，还依赖于离散参数 $\eta$。

    一般地，若 (1.1.1) 中的 $F$ 不光滑，则解 $y(x)$ 可能依赖于超过 $n$ 个积分常数。

!!! example "例（存在唯一解的微分方程）"
    初值问题 $y' = x^{-1/2}\ [y(0) = 1]$ 确有唯一解 $y=2x^{1/2}+1$，尽管 $F$ 在 $x=0$ 不连续。但这不违背唯一性定理，因该定理给出的是存在唯一性的充分非必要条件。

若初值问题在 $x_0$ 附近存在解，下一步是确定该解的全局性质，特别是确定局部解存在的区间范围。这对线性方程较容易，可以证明：与初始条件无关，该区间至少与不包含 $p_0(x), p_1(x), \cdots, p_{n-1}(x)$ 间断点的最大区间一样大，作进一步分析时可能发现区间更大。

!!! example "例（线性方程解的存在区间）"
    习题 1.4 的结果保证初值问题 $y' = (\tan x)y + 1 \ [y(0) = 1]$ 的解在 $\tan x$ 连续的区间内存在，即 $(-\pi/2, \pi/2)$。然而，其解 $y(x) = (1 + \sin x)/\cos x$ 实际存在于 $-3\pi/2 < x < \pi/2$ 区间。

非线性微分方程初值问题的全局分析要困难得多。

边值问题本质上是全局的。解的存在唯一性定理必须在包含所有点 $x_1, x_2, \cdots$ 的足够大区间上证明。线性微分方程的全局性质相对容易得到，但对非线性微分方程边值问题解的存在唯一性建立严格准则非常困难。

## 3. 齐次线性方程 { #s3 }

本节回顾齐次线性微分方程初值和边值问题的理论。

## 4. 解的线性无关性 { #s4 }

!!! theorem "命题"
    $n$阶齐次线性方程

    $$
    y^{(n)} + p_{n-1}(x)y^{(n-1)} + \cdots + p_0(x)y = 0
    \tag{1.3.1}
    $$

    的通解具有形式：

    $$
    y(x) = \sum_{j=1}^{n} c_j y_j(x)
    \tag{1.3.2}
    $$

    其中 $c_j$ 是任意积分常数，$\{y_j(x)\}$ 是线性无关函数集，且每个函数均满足 (1.3.1)。在系数 $p_0(x), p_1(x), \cdots, p_{n-1}(x)$ 连续的任意区域内，方程 (1.3.1) 总存在恰好 $n$ 个线性无关解。

若存在不全为零的数集 $\{c_j\}$ 满足 $\sum_{j=1}^{n} c_j y_j(x) = 0$，则称函数集 $\{y_j(x)\}$ **线性相关(linearly dependent)**。若不存在这样的集合，则 $\{y_j(x)\}$ **线性无关(linearly independent)**。

**注：**由于线性无关是全局概念，故在单点讨论线性无关无意义。

对于可微函数集我们有简单的线性相关性检验方法。

## 5. 朗斯基行列式 { #s5 }

!!! definition "定义（朗斯基行列式）"
    **朗斯基行列式(Wronskian)** $W(x)$ 定义为行列式：

    $$
    W(x) = W[y_1(x), y_2(x), \cdots, y_n(x)]
    \equiv \det \begin{vmatrix}
    y_1 & y_2 & \cdots & y_n \\
    y_1' & y_2' & \cdots & y_n' \\
    \vdots & \vdots & \ddots & \vdots \\
    y_1^{(n-1)} & y_2^{(n-1)} & \cdots & y_n^{(n-1)}
    \end{vmatrix}
    $$

!!! theorem "命题"
    $W(x)$ 在区间上恒为零当且仅当 $\{y_j(x)\}$ 是线性相关函数集。若 $\{y_j(x)\}$ 在某个区间线性无关，则 $W(x)$ 不恒为零（可能在孤立点为零）。

!!! example "例（线性相关）"
    对所有 $x$ 有 $W[e^x, e^{-x}, \cosh x] = 0$，故 $[e^x, e^{-x}, \cosh x]$ 是线性相关函数集。

!!! example "例（线性无关）"
    为验证方程 $y'' - y'(1 + x)/x + y/x = 0$ 的解 $y(x) = c_1 e^x + c_2(1 + x)$ 确为通解，计算朗斯基行列式：$W[1+x,e^x]=xe^x$。而 $xe^x$ 仅在 $x=0$ 处为零，因此对所有 $x$，$\{1+x,e^x\}$ 是线性无关集。

齐次线性方程具有如下性质：

!!! theorem "命题"
    方程 (1.3.1) 任意 $n$ 个解的朗斯基行列式 $W(x)$ 满足简单一阶方程：

    $$
    W^{\prime}(x)=-p_{n-1}(x)W(x)
    \tag{1.3.4}
    $$

    方程 (1.3.4) 的解称为阿贝尔公式：

    $$
    W(x)=\exp\left[-\int^{x}p_{n-1}(t)\,dt\right].
    \tag{1.3.5}
    $$

因此，我们可以在得到微分方程的任何解之前计算 $W(x)$。

现在使用这些理论结果讨论初值和边值问题的适定性。此处定义**适定**问题为存在唯一解的问题。

## 6. 初值问题 { #s6 }

求解初值问题需选择 (1.3.2) 中的 $c_{j}$ 以满足 (1.2.1) 的初始条件。$c_{j}$ 由 $n$ 个联立代数方程组 $\sum_{j=1}^{n}c_{j}y_{j}^{(i)}(x_{0})=a_{i}\ (i=0,\ 1,\cdots,n-1)$ 确定。根据 Cramer 法则，这些方程有唯一解仅当：

$$
\det\left[y_{j}^{(i)}(x_{0})\right]=W(x_{0})\neq 0.
\tag{1.3.6}
$$

因此，朗斯基行列式自然出现在初值问题研究中。它实际有两种应用。首先，可通过检验 $\{y_{j}\}$ 是否线性无关集，**全局**判断 (1.3.2) 形式的解是否为 (1.3.1) 的通解。

其次，朗斯基行列式可**局部**用于发现不适定初值问题，无需实际求解微分方程，仅需计算 (1.3.5) 并参考 (1.3.6)。若齐次初值问题的初始条件给定在朗斯基行列式为零的点 $x_{0}$（由阿贝尔公式计算），则该问题不适定。

!!! example "例（不适定问题——朗斯基行列式为零）"
    方程 (1.1.6) 的朗斯基行列式仅在 $x=0$ 处为零。因此初值问题 $y'' - y'(1 + x)/x + y/x = 0\ [y(1)=1, y'(1)=2]$ 适定并不意外。当初始条件替换为 $y(0)=1$，$y'(0)=2$ 时，无解。当替换为 $y(0)=1$，$y'(0)=1$ 时，解 $y(x)=e^{x}+c(e^{x}-1-x)$ 不唯一。

遗憾的是，朗斯基行列式非零不意味着问题适定。

!!! example "例（不适定问题——朗斯基行列式非零）"
    初值问题 $y''-6y/x^{2}=0\ [y(0)=6, y'(0)=6]$ 不适定，因其通解 $y(x)=c_{1}x^{3}+c_{2}x^{-2}$ 在 $x=0$ 处或发散或为零。阿贝尔公式 (1.3.5) 表明朗斯基行列式处处为常数（含 $x=0$），且该常数非零（因 $y(x)$ 是通解）。因此，(1.2.1) 中 $W(y)$ 在 $x=x_{0}$ 非零是初值问题适定的必要非充分条件。当然，此问题不适定是显然的，初始条件给在 $p_{0}(x)$ 的间断点。

因此，尽管朗斯基行列式在理论上是有趣的对象，但作为初值问题局部分析工具有时不实用。

## 7. 边值问题 { #s7 }

边值问题的解由两个或多个不同点处的条件确定。与初值问题不同，系数函数的连续性不足以保证边值问题有解：

!!! example "例（无解的边值问题）"
    考虑边值问题 $y'' + y = 0 \ [y'(0) = 0, y(\pi/2) = 1]$。微分方程通解为 $y(x) = c_1 \sin x + c_2 \cos x$。朗斯基行列式 $W(\sin x, \cos x) = -1$ 非零且微分方程系数函数连续。然而，边值问题无解：条件 $y'(0) = 0$ 蕴含 $c_1 = 0$，剩余解 $y(x) = c_2 \cos x$ 无法满足 $y(\pi/2) = 1$。

上例可能暗示边值问题很少有解。但事实正相反：多数边值问题存在唯一解。考虑一般二阶线性微分方程 $y'' + p_1(x)y' + p_0(x)y = 0$ 及边界条件 $y'(x_0) = a$，$y(x_1) = b$。若 $y_1(x)$ 和 $y_2(x)$ 是微分方程的两个线性无关解，则通解可写为 $y(x) = Ay_1(x) + By_2(x)$，边界条件要求：$Ay_1'(x_0) + By_2'(x_0) = a,  Ay_1(x_1) + By_2(x_1) = b$。当行列式非零时，可由 $a,b$ 唯一确定 $A,B$：

$$
\det \begin{vmatrix}
y_1'(x_0) & y_2'(x_0) \\
y_1(x_1) & y_2(x_1)
\end{vmatrix} \neq 0
$$

此条件是 (1.3.6) 中朗斯基条件的推广，通常成立（保证边值问题有唯一解）。但若选择点 $x_0$ 和 $x_1$ 使得 $y_1'(x_0)y_2(x_1) - y_2'(x_0)y_1(x_1) = 0$，则边值问题不适定：或无解，或有无穷多解。若 $by_1'(x_0) = ay_1(x_1)$ 且 $y_1'(x_0) \neq 0$，$y_1(x_1) \neq 0$ 时，后者可能出现。此时边值问题有无穷多解，它们相差函数 $z(x) = y_1(x)y_2'(x_0) - y_2(x)y_1'(x_0)$ 的任意常数倍。

## 8. 齐次线性方程解法 { #s8 }

本节讨论如何解方程 $Ly=0$。一阶方程易解（可分）。但当阶数 $\geq 2$ 时，显式解仅在少数情况下存在。我们简要分类并讨论部分可解方程。

## 9. 常系数方程 { #s9 }

常系数方程的特征是 $p_{0}$, $p_{1},\cdots,p_{n-1}$ 与 $x$ 无关。寻求形如 $y(x)=e^{rx}$ 的解，代入微分方程得 $L[e^{rx}]=P(r)e^{rx}$，其中

$$
P(r)=r^n + \sum_{j=0}^{n-1}p_{j}r^{j}
$$

是 $n$ 次多项式。对应 $P(r)=0$ 的不同根 $r_{1},r_{2},\cdots$ 的解为：

$$
y=e^{r_{1}x},e^{r_{2}x},\cdots
\tag{1.4.1}
$$

但若有重根，(1.4.1) 不是完全解集。设 $r_{1}$ 是 $m$ 重根，则

$$
L[e^{rx}]=e^{r_1x}(r-r_{1})^{m}Q(r)
\tag{1.4.2}
$$

其中 $Q$ 是 $n-m$ 次多项式。容易验证函数 $x^k e^{r_1 x}$ 是解，这给出 $m$ 个解：

$$
y=e^{r_{1}x}, xe^{r_{1}x}, x^{2}e^{r_{1}x},\cdots,x^{m-1}e^{r_{1}x}.
\tag{1.4.3}
$$

(1.4.1) 和 (1.4.3) 中所有解的线性组合构成微分方程的通解。

## 10. 等维(Equidimensional)方程 { #s10 }

等维（或欧拉）方程在变换 $x \to ax$ 下不变，其系数形式为 $p_j(x) = q_j/ x^{n-j}$，其中 $q_j$ 与 $x$ 无关。可通过变量替换

$$
x=e^{t},\qquad x\frac{d}{dx}=\frac{d}{dt}
\tag{1.4.4}
$$

将等维方程转化为关于 $t$ 的常系数方程。或者，直接代试探函数 $y=x^{r}$ 得 $L[x^{r}]=P(r)x^{r-n}$，这里 $P(r)$ 是 $n$ 次多项式。因此当 $r_{1},r_{2},\cdots$ 是 $P(r)$ 的不同根时，解为：

$$
y=x^{r_{1}},x^{r_{2}},\cdots
\tag{1.4.5}
$$

当 $P(r)$ 有重根 $r_{1}$ 时，完全解集形式为：

$$
y=x^{r_{1}}, x^{r_{1}}\ln x, x^{r_{1}}(\ln x)^{2},\cdots
\tag{1.4.6}
$$

$P(r)$ 的根称为**指标指数(indicial exponents)**。

## 11. 恰当(Exact)方程 { #s11 }

恰当方程是低阶方程的导数：$Ly = \frac{d}{dx}(My) = 0$。此方程的解为 $My = c_1$（所得方程不再齐次）。

**积分因子(Integrating factor)**是使微分方程乘以该函数后变为恰当方程的函数。

## 12. 降阶法(Reduction of Order) { #s12 }

是通过找到的解来简化线性微分方程以降至低阶的技术。设 $y_1(x)$ 是 $Ly = 0$ 的解，寻求如下形式的其他线性无关解：

$$
y(x) = u(x)y_1(x)
\tag{1.4.7}
$$

将 $y(x)$ 代入 $Ly = 0$ 得新方程 $Mu = 0$。此替换的精妙在于 $Mu$ 不含 $p_0(x)u$ 项，故 $Mu = 0$ 是关于 $v(x) = u'(x)$ 的 $n-1$ 阶线性齐次方程。

## 13. 变换为已知方程 { #s13 }

若其他方法均不适用，可将微分方程变换为其他经典方程。

!!! definition "定义（Airy 方程）"
    $$
    y'' = x y,
    \tag{1.4.8}
    $$

!!! definition "定义（抛物柱面方程（Weber-Hermite 方程））"
    $$
    y'' + \left( \nu + \frac{1}{2} - \frac{1}{4}x^2 \right) y = 0,
    \tag{1.4.9}
    $$

!!! definition "定义（Bessel 方程）"
    $$
    y'' + \frac{1}{x}y' + \left( 1 - \frac{\nu^2}{x^2} \right) y = 0,
    \tag{1.4.10}
    $$

## 14. 非齐次线性函数 { #s14 }

非齐次线性微分方程仅比齐次方程略复杂。这是因为 $Ly=f(x)$ 的任意两解之差满足 $Ly=0$。因此，$Ly=f(x)$ 的通解是其任一特解与 $Ly=0$ 的通解之和。

所有一阶线性非齐次方程均可解，因为总存在仅依赖于 $x$ 的积分因子。方程

$$
y'(x)+p_{0}(x)y(x)=f(x)
\tag{1.5.1}
$$

的积分因子为 $I(x)=\exp\left[\int p_{0}(t)\,dt\right]$。乘以 $I(x)$ 得 $\frac{d}{dx}\big[I(x)y(x)\big]=f(x)I(x)$，故 (1.5.1) 的解为：

$$
y(x)=\frac{c_{1}}{I(x)} + \frac{1}{I(x)}\int f(t)I(t)\,dt
\tag{1.5.2}
$$

求解高阶非齐次线性方程有以下标准方法。

## 15. 参数变异法(Variation of Parameters) { #s15 }

当齐次方程可解时，求解非齐次方程的难点在于寻找特解。参数变异法是确定特解的通用可靠方法，可视为高阶降阶法。

以二阶方程为例。设 $y_{1}(x)$ 和 $y_{2}(x)$ 是齐次方程 $Ly=0$ 的两个线性无关解，其中$L=d^{2}/dx^{2}+p_{1}(x)d/dx+p_{0}(x)$。我们来求 $Ly=f(x)$ 的对称形式特解：

$$
y(x)=u_{1}(x)y_{1}(x)+u_{2}(x)y_{2}(x)
\tag{1.5.3}
$$

其中 $u_{1}$, $u_{2}$ 待定，可施加约束简化方程：

$$
u_{1}'(x)y_{1}(x)+u_{2}'(x)y_{2}(x)=0
\tag{1.5.4}
$$

对 (1.5.3) 求导两次并代入 $Ly=f(x)$，结合 $Ly_{1}=Ly_{2}=0$ 和 (1.5.4) 得：

$$
u_{1}'(x)y'_{1}(x)+u_{2}'(x)y'_{2}(x)=f(x)
\tag{1.5.5}
$$

联立 (1.5.4) 和 (1.5.5) 解出：

$$
\begin{aligned}
u_{1}'(x) &= -\frac{f(x)y_{2}(x)}{W(x)}, \\
u_{2}'(x) &= \frac{f(x)y_{1}(x)}{W(x)}
\end{aligned}
\tag{1.5.6}
$$

其中 $W(x)=W[y_{1}(x),y_{2}(x)]$ 为朗斯基行列式，因 $y_{1}$, $y_{2}$ 线性无关作为分母 $W$ 非零。积分 (1.5.6) 即得特解：

$$
y(x) = -y_{1}(x)\int\frac{f(t)y_{2}(t)}{W(t)}\,dt + y_{2}(x)\int\frac{f(t)y_{1}(t)}{W(t)}\,dt + c_{1}y_{1}(x) + c_{2}y_{2}(x)
\tag{1.5.7}
$$

## 16. 格林函数(Green's Function) { #s16 }

构造非齐次线性微分方程解有另一种通用方法，等价于参数变异法。该方法将解表示为**格林函数**的积分。定义格林函数需引入 Dirac 函数 $\delta(x-a)$：

!!! definition "定义"
    定义 Dirac 函数为满足如下两个性质的函数：

    $$
    \begin{aligned}
    \delta(x-a) &= 0, \quad x \neq a \\
    \int_{-\infty}^{\infty} \delta(x-a) \, dx &= 1
    \end{aligned}\tag{1.5.8}
    $$

    此函数可视为单位脉冲：在 $x=a$ 处无限大的尖峰，且面积为1。

!!! theorem "命题"
    若 $f(x)$ 在 $a$ 连续，则

    $$
    \int_{-\infty}^{\infty} \delta(x-a)f(x) \, dx = f(a)
    \tag{1.5.9}
    $$

!!! theorem "命题"
    $\delta$ 函数有如下多种表示：

    $$
    \begin{aligned}
    \delta(x-a) &= \lim_{\varepsilon \to 0} F_{\varepsilon}(x)  \\
    \text{其中} \quad F_{\varepsilon}(x) &=
    \begin{cases}
    0, & x < a - \frac{1}{2}\varepsilon \\
    1/\varepsilon, & a - \frac{1}{2}\varepsilon \leq x \leq a + \frac{1}{2}\varepsilon \\
    0, & a + \frac{1}{2}\varepsilon < x
    \end{cases}  \\
    \text{或} \quad \delta(x-a) &= \lim_{\varepsilon \to 0^+} \frac{\varepsilon}{\pi[(x-a)^2 + \varepsilon^2]}  \\
    \text{或} \quad \delta(x-a) &= \lim_{\varepsilon \to 0^+} (\pi\varepsilon)^{-1/2} e^{-(x-a)^2/\varepsilon}  \\
    \text{或} \quad \delta(x-a) &= \lim_{L \to +\infty} \frac{1}{2\pi} \int_{-L}^{L} e^{i(x-a)t}  dt
    \end{aligned}
    $$

$\delta$ 函数也可视为不连续函数的导数。设 $h(x-a)$ 为 Heaviside 阶跃函数：

$$
h(x-a) =
\begin{cases}
0, & x < a \\
\frac{1}{2}, & x = a \\
1, & x > a
\end{cases}
$$

则

$$
\delta(x-a) \equiv \frac{d}{dx} h(x-a)
\tag{1.5.11}
$$

!!! definition "定义"
    非齐次方程 $Ly=f(x)$ 的格林函数 $G(x,a)$ 满足微分方程

    $$
    LG(x,a) = \delta(x-a)
    \tag{1.5.12}
    $$

已知 $G(x,a)$ 后，$Ly=f(x)$ 的解可表示为积分：

$$
y(x) = \int_{-\infty}^{\infty} da \, f(a) G(x,a)
\tag{1.5.13}
$$

剩余问题是从 (1.5.12) 中解出 $G(x,a)$。当齐次方程 $Ly=0$ 的解已知时，这是简单的。以二阶方程为例：

$$
LG(x,a) = \left[ \frac{d^{2}}{dx^{2}} + p_{1}(x) \frac{d}{dx} + p_{0}(x) \right] G(x,a) = \delta(x-a)
\tag{1.5.14}
$$

设 $y_{1}(x)$, $y_{2}(x)$ 为 $Ly=0$ 的线性无关解。则当 $x \neq a$ 时，(1.5.14) 右边为零：

$$
\begin{aligned}
G(x,a) &= A_{1}y_{1}(x) + A_{2}y_{2}(x), \quad x < a \\
G(x,a) &= B_{1}y_{1}(x) + B_{2}y_{2}(x), \quad x > a
\end{aligned}
$$

为关联 $x < a$ 和 $x > a$ 的格林函数解，我们来论证 $G(x, a)$ 在 $x = a$ 连续且 $\partial G/\partial x$ 在 $x = a$ 有幅度为 1 的有限跳跃间断。格林函数方程 (1.5.14) 左侧最奇异项必为 $\partial^2 G/\partial x^2$，进一步有 $\partial^2 G/\partial x^2 - \delta(x - a)$ 在 $x = a$ 处奇异度低于 $\delta$ 函数。积分 $\partial^2 G/\partial x^2 - \delta(x - a)$ 得 ${\partial G}/{\partial x} - h(x - a)$ 处处连续。因此 $\partial G/\partial x$ 在 $x = a$ 的间断性与函数 $h(x - a)$ 相同：

$$
\lim_{\varepsilon \to 0^+} \left[ \frac{\partial G}{\partial x} \bigg|_{x=a+\varepsilon} - \frac{\partial G}{\partial x} \bigg|_{x=a-\varepsilon} \right] = 1
\tag{1.5.15}
$$

且因 $\partial G/\partial x$ 仅有有限跳跃间断，其原函数 $G(x, a)$ 在 $x = a$ 连续，这给出条件：

$$
A_1 y_1(a) + A_2 y_2(a) = B_1 y_1(a) + B_2 y_2(a)
\tag{1.5.16}
$$

(1.5.15) 要求：

$$
B_1 y_1'(a) + B_2 y_2'(a) - A_1 y_1'(a) - A_2 y_2'(a) = 1
\tag{1.5.17}
$$

解出 $B_1 - A_1$ 和 $B_2 - A_2$:

$$
B_1 - A_1 = -\frac{y_2(a)}{W[y_1(a), y_2(a)]}
\tag{1.5.18}
$$

$$
B_2 - A_2 = \frac{y_1(a)}{W[y_1(a), y_2(a)]}
\tag{1.5.19}
$$

此式与 (1.5.6) 高度相似。令 $A_1 = A_2 = 0$ 并用 (1.5.18)、(1.5.19) 确定 $B_1$, $B_2$ 得：

$$
G(x, a) =
\begin{cases}
-\dfrac{y_2(a)y_1(x)}{W[y_1(a), y_2(a)]}, & x < a \\[2ex]
\dfrac{y_1(a)y_2(x)}{W[y_1(a), y_2(a)]}, & x \geq a
\end{cases}
\tag{1.5.20}
$$

代入 (1.5.13) 即得与参数变异法 (1.5.7) 相同结果。

当需对固定算子 $L$ 和边界条件，对不同 $f$ 求解 $Ly = f$ 时，格林函数法优于参数变异法，这是因为格林函数可反复利用。齐次边界条件下分析尤简。

!!! example "例（格林函数解边值问题）"
    边值问题 $y'' = f(x) \ [y(0)=0, y(1)=0]$ 的格林函数满足：

    $$
    \frac{\partial^2 G}{\partial x^2}(x, a) = \delta(x - a), \quad G(0, a) = 0, \quad \frac{\partial G}{\partial x}(1, a) = 0
    $$

    解为：

    $$
    G(x, a) =
    \begin{cases}
    -x, & x < a \\
    -a, & x \geq a
    \end{cases} \quad (0 < a < 1)
    $$

    故对任意 $f(x)$，解为 $y(x) = \int_0^1 G(x, a)f(a)  \,da (0 \leq x \leq 1)$。积分限为 $[0,1]$ 而非 $\mathbb{R}$ 是因为边界条件限制在有限区间。

!!! example "例（格林函数解边值问题）"
    边值问题 $y'' - y = f(x) \ [y(\pm \infty)=0]$ 的格林函数满足：

    $$
    \frac{\partial^2 G}{\partial x^2} - G(x, a) = \delta(x - a), \quad G(0, a) = 0, \quad G(\pm \infty ,a)=0
    $$

    解为：

    $$
    G(x, a) = -\frac{1}{2} e^{-\left|x-a\right|}
    $$

    故对任意 $f(x)$，解为 $y(x) = -\frac{1}{2}\int_{-\infty }^\infty  e^{-\left|x-a\right|}f(a) \, da$。

## 17. 降阶法 { #s17 }

!!! example "例（非齐次方程的降阶法）"
    齐次方程 $a(x) y'' + x y' - y = 0$ 的一个解为 $y_1(x) = x$。为用降阶法解非齐次方程 $a(x) y'' + x y' - y = f(x)$，设解形如 $y(x) = x u(x)$。代入得关于 $u'(x)$ 的一阶方程：

    $$
    xa(x) u'' + (2a(x)+x^2) u' = f(x)
    $$

## 18. 待定系数法(Method of Undetermined Coefficients) { #s18 }

此法本质上是系统猜测，通常适用于常系数方程且 $f(x)$ 为 $e^x$、$\sin x$、$\cos x$ 与多项式之组合，或等维方程且 $f(x)$ 为多项式。

!!! example "例"
    - (a) 解 $y''' + y = e^x \sin x$，猜测 $y = ae^x \sin x + be^x \cos x$，代入确定系数 $a = -\frac{1}{5}$, $b = -\frac{2}{5}$。
    - (b) 解 $y'' - y = e^x$，因 $e^x$ 已满足齐次方程，猜特解 $y = axe^x$，得 $a = \frac{1}{2}$。
    - (c) 解 $y'' - \frac{y}{x^2} = x^4 + x^3$，猜多项式特解 $y = ax^6 + bx^5$，得 $a = \frac{1}{25}$, $b = \frac{1}{15}$。
    - (d) 解 $y'' + xy' + 2y = 1$，猜特解 $y = a$，得 $y = \frac{1}{2}$
    - (e) 解 $y'' + xy' + 2y = x^4$，猜特解 $y = ax^4 + bx^2 + c$，得 $y = \frac{x^4}{6} - \frac{x^2}{2} + \frac{1}{4}$。

## 19. 一阶非线性微分方程 { #s19 }

尽管多数非线性微分方程难以显式求解，但识别可解方程类型并掌握相应解法至关重要。一阶方程的常规策略是通过代换转化为线性或恰当方程。

## 20. 伯努利方程 { #s20 }

标准形式为：

$$
y' = a(x)y + b(x)y^p
\tag{1.6.1}
$$

其中 $a(x)$, $b(x)$ 为任意函数，$P$ 为任意常数。当 $P = 0$ 时为线性方程，$P = 1$ 时为可分方程。解法为利用代换

$$
y(x) = [u(x)]^{1-P}
\tag{1.6.2}
$$

得线性方程：

$$
u'(x) = (1 - P)a(x)u(x) + (1 - P)b(x)
\tag{1.6.3}
$$

## 21. Riccati方程 { #s21 }

标准形式为：

$$
y'(x) = a(x)y^2(x) + b(x)y(x) + c(x)
\tag{1.6.4}
$$

当 $a(x) = 0$ 时为线性方程，$c(x) = 0$ 时为伯努利方程。解法为利用代换

$$
y(x) = -\frac{w'(x)}{a(x)w(x)}
\tag{1.6.5}
$$

转化为二阶线性方程：

$$
w''(x) - \left[ \frac{a'(x)}{a(x)} + b(x) \right] w'(x) + a(x)c(x)w(x) = 0
\tag{1.6.6}
$$

此变换可逆。这表明方程与二阶齐次线性方程等价，但我们目前并未得到二阶线性微分方程的通解。回到开头，若已知特解 $y_1(x)$，令

$$
y(x) = y_1(x) + u(x)
\tag{1.6.7}
$$

则转化为伯努利方程：

$$
u'(x) = [b(x) + 2a(x)y_1(x)]u(x) + a(x)u^2(x)
$$

!!! example "例（因式分解法）"
    Riccati 方程源于二阶线性方程的因式分解尝试，希望将 $n$ 阶线性算子分解为：

    $$
    Ly = \left[ \frac{d}{dx} + a_1(x) \right] \left[ \frac{d}{dx} + a_2(x) \right] \cdots \left[ \frac{d}{dx} + a_n(x) \right] y(x)
    \tag{1.6.8}
    $$

    要注意这些因子既不是可交换的：

    $$
    \left( \frac{d}{dx} + \frac{1}{x} \right) \left( \frac{d}{dx} + x \right) \neq \left( \frac{d}{dx} + x \right) \left( \frac{d}{dx} + \frac{1}{x} \right)
    $$

    也不是唯一的：

    $$
    y'' - y = \left( \frac{d}{dx} + 1 \right) \left( \frac{d}{dx} - 1 \right) y = \left( \frac{d}{dx} + \tanh x \right) \left( \frac{d}{dx} - \tanh x \right) y
    $$

    若分解成功，求解 $Ly = f(x)$ 转化为一系列一阶线性方程：

    $$
    \begin{aligned}
    w_1' + a_1 w_1 &= f(x) \\
    w_2' + a_2 w_2 &= w_1(x) \\
    &\,\,\,\, \vdots \\
    y' + a_n y &= w_{n-1}(x)
    \end{aligned}
    \tag{1.6.9}
    $$

    最终解含 $n$ 个积分常数。

    当然这里的难点在于分解算子。以二阶算子 $L = \frac{d^2}{dx^2} + p_1(x) \frac{d}{dx} + p_0(x)$ 为例：

    $$
    Ly = \left[ \frac{d}{dx} + a_1(x) \right] \left[ \frac{d}{dx} + a_2(x) \right] y
    $$

    比较系数消去 $a_1$ 得 $a_2$ 的 Riccati 方程：

    $$
    a_2' = a_2^2 - p_1 a_2 + p_0
    $$

    其难度与原二阶方程相当。代换 $a_2(x) = -w'(x)/w(x)$ 后恰好还原为原方程 $Lw = 0$。

## 22. 恰当方程 { #s22 }

一阶恰当方程可表示为：

$$
M[x, y(x)] + N[x, y(x)]y'(x) = \frac{d}{dx}f[x, y(x)] = 0
$$

其解为 $f[x, y(x)] = c_1$。恰当性的充要条件为：

$$
\frac{\partial M}{\partial y}(x, y) = \frac{\partial N}{\partial x}(x, y)
\tag{1.6.10}
$$

解存在性定理表明每个非线性方程均可通过积分因子化为恰当方程，但寻找积分因子可能极困难。设方程 $a(x, y) + b(x, y)y'(x) = 0$，乘以待定积分因子 $I(x, y)$ 后要求满足 (1.6.10)，得 $I$ 的线性偏微分方程：

$$
a(x, y)\frac{\partial I}{\partial y} - b(x, y)\frac{\partial I}{\partial x} = \left( \frac{\partial b}{\partial x} - \frac{\partial a}{\partial y} \right)I
$$

此方程的标准解法（特征线法）的特征曲线方程为 $dy/dx = -a/b$，恰为原微分方程！

## 23. 代换法 { #s23 }

有时可通过代换将非线性方程转化为可直接求解的形式。线性代换因易识别而应优先考虑。

!!! example "例"
    - (a) 代换 $u = x + y$ 使 $y' = \cos (x + y)$ 可分：$u' = 1 + \cos u$。

    - (b) 线性变换 $x = av + bw + c$, $y = dv + ew + f$ 在适当选择参数后可将 $y' = (Ax + By + C)/(Dx + Ey + F)$ 转化为关于 $w(v)$ 的可分方程。

    - (c) 方程 $y' = (y - x)/(y + x)$ 的解为对数螺线。使用极坐标代换：

        $$
        x = r \cos \theta, \quad dx = \cos \theta  dr - r \sin \theta  d\theta,
        $$

        $$
        y = r \sin \theta, \quad dy = \sin \theta  dr + r \cos \theta  d\theta,
        $$

        得可分方程 $dr/d\theta = -r$，解为 $r = c_1 e^{-\theta}$。

    - (d) 代换 $u = x + y$ 将 $y' = y/x + 1/(y + x)$ 转化为伯努利方程：$u' = u/x + 1/u$。

    - (e) 对形如 $y' = F(y/x)$ 的方程，代换 $u = y/x$ 得可分方程：$u' = [F(u) - u]/x$。

    - (f) 代换 $u = xy$ 将 $y' = \cos (xy)$ 转化为 $u' = x \cos u + u/x$，其求解难度未降低。乘法型代换（$u = xy$, $u = x^2 y$ 等）通常对 $y' = F(xy)$ 类方程无效。

## 24. 高阶非线性微分方程 { #s24 }

本节简要总结求解 $n$ 阶非线性微分方程的方法，大多数方法试图降低微分方程的阶数。

## 25. 自治方程(Autonomous Equations) { #s25 }

!!! definition "定义"
    自治方程是指自变量不显式出现的方程，如 $y'' + y' + y = 0$, $y''' + y'' = 0$, $yy' = y''y''$。自治方程在平移变换 $x \rightarrow x + a$ 下保持不变。

一个 $n$ 阶自治方程总可以用一个 $(n-1)$ 阶非自治方程替代。标准技巧是将 $u \equiv y'(x)$ 表示为 $y$ 的函数，并找出 $u$ 及其导数满足的方程。因此，我们令

$$
\begin{aligned}
y'(x) &= u(y),\\
y''(x) &= \frac{du}{dx} = \frac{du}{dy} \frac{dy}{dx} = u'(y)u(y),\\
y'''(x) &= \frac{d}{dx} [u'(y)u(y)] = u(y)[u'(y)]^2 + [u(y)]^2u''(y)
\end{aligned}
$$

以此类推得到关于自变量 $y$ 的新微分方程，且其中 $u$ 关于 $y$ 的最高阶导数总是比原方程中 $y$ 关于 $x$ 的最高阶导数低一阶。

## 26. 关于 x 的齐次方程(Equidimensional-in-x Equations) { #s26 }

!!! definition "定义"
    如果一个方程在尺度变换 $x \rightarrow a x$ 下保持不变，则称该方程是关于 $x$ 齐次的。

所有关于 $x$ 齐次的方程都可以转化为同阶的自治方程。所需的变量变换已在 (1.4.4) 中给出：

$$
\begin{aligned}
x &= e^t, \\
\frac{d}{dx} &= e^{-t} \frac{d}{dt}, \\
x^2 \frac{d^2}{dx^2} &= \frac{d^2}{dt^2} - \frac{d}{dt}.
\end{aligned}
$$

## 27. 尺度不变方程 (Scale-Invariant Equations) { #s27 }

!!! definition "定义"
    如果存在 $p$ 使得尺度变换

    $$
    x \rightarrow a x,\quad y \rightarrow a^p y
    \tag{1.7.3}
    $$

    保持原微分方程不变，则该微分方程是尺度不变的。

识别微分方程为尺度不变是求解的重要进展，因为所有尺度不变方程可通过代换

$$
y(x) = x^p v(x)
\tag{1.7.4}
$$

转化为关于 $x$ 的齐次方程。

## 28. 关于 $y$ 的齐次方程 (Equidimensional-in-$y$ Equations) { #s28 }

!!! definition "定义"
    若方程在尺度变换 $y \rightarrow a y$ 下不变，则称为关于 $y$ 齐次。

此类方程可通过变换

$$
y(x) = e^{u(x)}
\tag{1.7.5}
$$

将方程阶数降低一阶。

## 29. 特征值问题 { #s29 }

特征值问题是一类边界值问题，仅当问题中的参数 $E$ 取特定值（称为特征值）时才存在非平凡解。

!!! example "例（简单特征值问题）"
    考虑边值问题

    $$
    y'' + E y = 0, \quad y(0) = 0, \quad y(1) = 0.
    \tag{1.8.1}
    $$

    对任意参数 $E$，存在平凡解 $y(x) = 0$（$0 \leq x \leq 1$）。但当 $E$ 取特定值时，(1.8.1) 存在额外的非零解：

    $$
    E = (n\pi)^2, \quad y(x) = A_n \sin (n\pi x), \quad n = 1, 2, 3, \cdots
    \tag{1.8.2}
    $$

    其中 $A_n$ 为任意常数，$E = \pi^2, 4\pi^2, 9\pi^2, \cdots$ 称为特征值，对应的非平凡解 $\sin \pi x, \sin 2\pi x, \sin 3\pi x,  \cdots$ 称为特征函数。且易证 (1.8.1) 无其他特征值。

对齐次线性边值问题，当 $E$ 为特征值时，解不唯一：除 $y(x) = 0$ 外，存在特征函数的任意常数倍解。反之，当 $E$ 非特征值时，平凡解唯一。

!!! example "例（另一简单特征值问题）"
    考虑特征值问题

    $$
    y'' + E y = 0, \quad y(0) = 0, \quad y'(1) = 0.
    \tag{1.8.3}
    $$

    对任意参数 $E$ ，存在平凡解 $y(x) = 0$。满足 $y(0) = 0$ 的通解为 $y(x) = A \sin (\sqrt{E} x)$，由 $y'(1) = 0$ 得 $A \sqrt{E} \cos \sqrt{E} = 0$，故特征值为 $E = \left(\frac{\pi}{2}\right)^2, \left(\frac{3\pi}{2}\right)^2, \left(\frac{5\pi}{2}\right)^2, \cdots$

!!! example "例（无限域上的特征值问题）"
    特征值问题

    $$
    \begin{aligned}
    &y'' + (E - x^2) y = 0, \quad -\infty < x < \infty,\\
    &y(x) \to 0 \quad \text{当} \quad |x| \to \infty
    \end{aligned}
    $$

    称为**量子谐振子(quantum harmonic oscillator)**。对任意 $E$ 存在平凡解 $y(x) = 0$，但对特定 $E$ 存在非平凡解。(“特征值问题”一节) 的特征值为 $E = n+\frac{1}{2}$，对应的特征函数为

    $$
    y_n(x) = A \cdot \mathrm{He}_n(x) e^{-x^2/4},
    \tag{1.8.5}
    $$

    其中 $A$ 为任意常数，$\mathrm{He}_n(x)$ 为 $n$ 阶 Hermite 多项式，$\mathrm{He}_0(x) = 1, \mathrm{He}_1(x) = x, \mathrm{He}_2(x) = x^2 - 1, \cdots$。

!!! example "例（含超越特征值的问题）"
    考虑特征值问题

    $$
    y'' + (E - x) y = 0\, (0 < x < \infty), \quad y(0) = 0, \quad y(\infty) = 0.
    \tag{1.8.6}
    $$

    后文中将证明：满足 $x \to \infty$ 时 $y \to 0$ 的通解为

    $$
    y(x) = A \cdot \mathrm{Ai}(x - E),
    \tag{1.8.7}
    $$

    其中 $\mathrm{Ai}(z)$ 为 Airy 函数（见 (1.4.8)）。边界条件 $y(0) = 0$ 给出特征值条件 $\mathrm{Ai}(-E) = 0$，这是超越函数，其零点可数值计算，得到特征值序列：

    $$
    E_0 \approx 2.338, \ E_1 \approx 4.088, \ E_2 \approx 5.521, \ E_3 \approx 6.787, \ E_4 \approx 7.944, \ E_5 \approx 9.023, \cdots
    $$

!!! example "例"
    考虑特征值问题

    $$
    y'' + (E + v\sec^2 x) y = 0, \quad y \to 0 \quad \text{当} \quad |x| \to \infty.
    \tag{1.8.8}
    $$

    仅存在有限个离散特征值：$E = -\frac{1}{4}(2n + 1 - \sqrt{1 + 4v})^2$（$0 \leq n \leq V$），其中 $V = (\sqrt{1 + 4v} - 1)/2$ 且 $n$ 为整数。

!!! example "例（Sturm-Liouville 特征值问题）"
    特征值问题

    $$
    a(x)y''(x) + b(x)y'(x) + c(x)y(x) + d(x)E y(x) = 0, \quad y(\alpha) = y(\beta) = 0
    \tag{1.8.9}
    $$

    总可化为 Sturm-Liouville 标准形式：

    $$
    \frac{d}{dx} \left[ p(x) \frac{dy}{dx} \right] + q(x) y + E r(x) y = 0, \quad y(\alpha) = y(\beta) = 0
    \tag{1.8.10}
    $$

    方程 (1.8.10) 称为 Sturm-Liouville 问题。其性质为：当

    $$
    p(x) > 0, \quad q(x) \leq 0, \quad r(x) > 0, \quad \alpha \leq x \leq \beta
    $$

    时，存在无限多个实数正特征值 $E = E_0, E_1, E_2, \cdots$。此外，对应特征值 $E_n$ 的特征函数 $y_n(x)$（$n = 0, 1, 2, \cdots$）可关于权函数 $r(x)$ 正交归一化：

    $$
    \int_{\alpha}^{\beta} r(x) y_n(x) y_m(x)  dx =
    \begin{cases}
    1, & n = m \\
    0, & n \neq m
    \end{cases}
    $$

!!! example "例（薛定谔特征值问题）"
    若选取满足 $|x| \to \infty$ 时 $V(x) \to +\infty$ 的正函数 $V(x)$，则薛定谔特征值问题

    $$
    -y''(x) + V(x) y(x) = E y(x), \quad y(\pm \infty) = 0
    \tag{1.8.11}
    $$

    有无限多个实数正特征值 $E_0, E_1, E_2, \cdots$。物理上，这些特征值表示势场 $V(x)$ 中粒子的允许能级。(“特征值问题”一节) 的问题是特例。仅对特殊 $V(x)$ 存在 (1.8.11) 的显式解。

## 30. 复平面中的微分方程 { #s30 }

此前我们使用字母 $x$ 表示微分方程的自变量，并假设 $x$ 为实数。但在后续分析中，我们将关注复平面中的微分方程性质，此时自变量记为 $z$。当微分方程从实轴 $x$ 推广到复平面 $z$ 时，所有导数必须按复导数解释。这导出一个重要结论（实变函数不适用）：在复导数 $y'(z)$ 存在的区域，函数 $y(z)$ 是解析的，该结论限制了可在复平面中构造的微分方程类型。

!!! example "例（一阶微分方程）"
    微分方程 $dy/dx = |x|$ 在实轴上有意义，其解为 $y(x) = \frac{1}{2}x |x| + c$。但方程 $dy/dz = |z|$ 在复平面中无意义，因为 $y'(z)$ 要求 $y(z)$ 解析，而 $|z|$ 处处不解析。

    一般地，为使复微分方程 $dy/dz = g(z)$ 有意义，需存在某个复区域使 $g(z)$ 解析。

!!! example "例（二阶微分方程）"
    若微分方程 $y'' + p_1(z)y' + p_0(z)y = 0$ 在某个区域存在两个线性无关解，则 $p_0(z)$ 和 $p_1(z)$ 除可能孤立点外必须是解析函数。设 $y_1$ 和 $y_2$ 为两个线性无关解，因其复导数存在故解析，则

    $$
    p_0(z) = \frac{y_1'' y_2' - y_2'' y_1'}{y_1' y_2 - y_1 y_2'}, \quad
    p_1(z) = \frac{y_2'' y_1 - y_1'' y_2}{y_1' y_2 - y_1 y_2'},
    \tag{1.5.14}
    $$

    其中分母仅在孤立点为零。

    具有非解析系数的二阶复微分方程可能有解，但解可能不含两个独立任意参数。例如方程 $y'' - |z|y' + (|z| - 1)y = 0$ 有解 $y = c e^z$，但无其他解。

除上述限制外，实微分方程与复微分方程无本质区别。本章介绍的求解方法同样适用于复微分方程。

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/computational-applied-math.pdf){ .md-button download="computational-applied-math.pdf" }
