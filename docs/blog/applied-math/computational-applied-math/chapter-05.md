---
title: 第五章：渐近级数
date: 2026-07-07
updated: 2026-10-15
description: 计算与应用数学笔记第五章：渐进级数、收敛与发散幂级数、渐近级数的例子、使用渐近级数的数值近似：最优截断法则、渐近级数的性质、微分方程解的渐近展开、复平面中的渐近幂级数：不同有效扇形区域之间的联系。
hide:
  - navigation
categories:
  - 应用数学
tags:
  - asymptotic-analysis
---

# 第五章：渐近级数 { #top }

## 1. 渐进级数 { #s1 }

在本节中，我们用严谨的数学分析语言叙述前文所用到的渐进方法。

## 2. 收敛与发散幂级数 { #s2 }

在3.5节中，我们将 $f(x) \sim \sum_{n=0}^\infty a_n (x-x_0)^n$ ($x \to x_0$) 定义为：对于每一个 $N$，当 $x \to x_0$ 时，余项 $\varepsilon_N(x) = f(x) - \sum_{n=0}^N a_n(x-x_0)^n \ll (x-x_0)^N$ ($x \to x_0$)。

容易看出渐近级数是Taylor级数的推广。一个级数不必是收敛的才能是渐近的。收敛是一个绝对的概念,它代表的是系数 $a_n$ 的性质，而渐近性是展开系数和级数所属函数 $f(x)$ 的一个相对属性。事实上，每个幂级数对于某个连续函数 $f(x)$ 都是渐近的。

!!! theorem "命题"
    给定一个形式幂级数 $\sum_{n=0}^\infty a_n (x-x_0)^n$，我们定义一个连续函数 $\phi(x;\alpha)$如下：

    $$
    \phi(x; \alpha) =
    \begin{cases}
    1, & |x| \le \frac{1}{2}\alpha, \\
    2\left(1 - \frac{|x|}{\alpha}\right), & \frac{1}{2}\alpha < |x| < \alpha, \\
    0, & \alpha \le |x|.
    \end{cases}
    $$

    再定义 $\alpha_n = \min(1/|a_n|, 2^{-n})$，其中 $a_n$ 是任意级数 $\sum_{n=0}^\infty a_n(x-x_0)^n$ 的系数。定义：

    $$
    f(x) = \sum_{n=0}^\infty a_n \phi(x-x_0; \alpha_n)(x-x_0)^n
    $$

    则 $f$ 是有限、连续的，且满足

    $$
    f(x) \sim \sum_{n=0}^\infty a_n(x-x_0)^n, \quad x \to x_0.
    $$

??? proof "证明"
    对于任何 $x \neq x_0$，因为该级数在最多 $N$ 项后截断，其中 $N$ 是满足 $2^{-N} \le |x-x_0|$ 的最小整数，故它是有限且连续的。若 $|x-x_0| \le \min(2^{-n}, 1/|a_n|, \dots, 1/|a_N|) = R_N$，则 $\phi(x-x_0; \alpha_n) = 1$,$n=0, \dots, N$。因此，若 $|x-x_0| \le R_N$，

    $$
    f(x) = a_0 + a_1(x-x_0) + \dots + a_N(x-x_0)^N + \sum_{n=N+1}^\infty a_n \phi(x-x_0; \alpha_n)(x-x_0)^n.
    $$

    由定义任意 $x$ 与 $n$有$|a_n \phi(x-x_0; \alpha_n)| \le 1,|\phi(x-x_0; \alpha_n)| \le 1$，因此若 $|x-x_0| \le R_N$，则

    $$
    \begin{aligned}
    |\varepsilon_N(x)| &= \left| f(x) - \sum_{n=0}^N a_n(x-x_0)^n \right| \\
    &= \left| a_{N+1} \phi(x-x_0; \alpha_{N+1})(x-x_0)^{N+1} + \sum_{n=N+2}^\infty a_n \phi(x-x_0; \alpha_n)(x-x_0)^n \right| \\
    &\le |a_{N+1}| |x-x_0|^{N+1} + \sum_{n=N+2}^\infty |x-x_0|^{n-1} \\
    &= |x-x_0|^{N+1} \left(|a_{N+1}| +(1-|x-x_0|)^{-1}\right) \ll (x-x_0)^N, \quad x \to x_0.
    \end{aligned}
    $$

    因此，$\sum_{n=0}^\infty a_n(x-x_0)^n$ 对于 $x \to x_0$ 是 $f(x)$ 的渐近级数。

## 3. 渐近级数的例子 { #s3 }

!!! definition "定义（Stieltjes 级数）"
    **Stieltjes级数**定义为

    $$
    \sum_{n=0}^\infty (-1)^n n! x^n. \tag{3.8.1}
    $$

上文提到这是微分方程([3.4.2](chapter-03.md))的形式幂级数解。我们现在将利用它来渐近该方程的解。

为了对级数进行“求和”，我们利用积分恒等式 $n! = \int_0^\infty e^{-t} t^n dt$：

$$
\sum_{n=0}^\infty (-x)^n n! \to \sum_{n=0}^\infty (-x)^n \int_0^\infty e^{-t} t^n dt.
$$

无视任何收敛定理所要求的条件，交换求和与积分的顺序：

$$
\sum_{n=0}^\infty (-x)^n \int_0^\infty e^{-t} t^n dt \to \int_0^\infty dt \, e^{-t} \sum_{n=0}^\infty (-xt)^n,
$$

然后对 $\sum_{n=0}^\infty (-xt)^n \to 1/(1+xt)$ 求和，即使对于 $|xt| \ge 1$ 的 $t$ 是发散的，至此我们得到：

$$
y(x) = \int_0^\infty \frac{e^{-t}}{1+xt} dt, \tag{3.8.2}
$$

这被称为Stieltjes积分，存在且在 $x>0$ 上解析，并且 $y(x)$ 满足微分方程([3.4.2](chapter-03.md))。

!!! theorem "命题"
    Stieltjes级数对于Stieltjes积分是渐近的。

??? proof "证明"
    反复利用分部积分我们得到：

    $$
    \begin{aligned}
    y(x) = 1 - x + 2!x^2 - 3!x^3 + \dots + (-1)^N N!x^N + \varepsilon_N(x),
    \end{aligned}
    $$

    其中

    $$
    \varepsilon_N(x) = (-1)^{N+1} (N+1)! x^{N+1} \int_0^\infty (1+xt)^{-N-2} e^{-t} dt.
    $$

    利用不等式

    $$
    \int_0^\infty (1+xt)^{-N-2} e^{-t} dt \le \int_0^\infty e^{-t} dt = 1, \quad x \to 0+,
    $$

    得到

    $$
    |\varepsilon_N(x)| \le (N+1)! x^{N+1} \ll x^N, \quad x \to 0+.
    $$

!!! definition "定义（广义Stieltjes级数和积分）"
    **广义Stieltjes积分**定义为

    $$
    f(x) = \int_0^\infty \frac{\rho(t)}{1+xt} dt, \tag{3.8.3}
    $$

    其中权重函数 $\rho(t)$ 是非负的，并且当 $t \to \infty$ 时迅速趋于零，使得积分

    $$
    a_n = \int_0^\infty t^n \rho(t) dt \tag{3.8.4}
    $$

    对于所有正整数 $n$ 都存在。对应的**广义Stieltjes级数**定义为

    $$
    f(x) \sim \sum_{n=0}^\infty (-1)^n a_n x^n, \quad x \to 0+. \tag{3.8.5}
    $$

!!! theorem "命题"
    广义Stieltjes级数对于广义Stieltjes积分是渐近的。

??? proof "证明"
    注意到对任意 $N$，有

    $$
    \begin{aligned}
    \varepsilon_N(x) &= f(x) - \sum_{n=0}^N (-1)^n a_n x^n  \\
    &= \int_0^\infty \rho(t) \left[ \frac{1}{1+xt} - \sum_{n=0}^N (-xt)^n \right] dt  \\
    &= \int_0^\infty \frac{\rho(t)}{1+xt} (-xt)^{N+1} dt
    \end{aligned}\tag{3.8.6}
    $$

    因此，

    $$
    |\varepsilon_N(x)| \le x^{N+1} \int_0^\infty \rho(t) t^{N+1} dt = a_{N+1} x^{N+1} \ll x^N, \quad x \to 0+, \tag{3.8.7}
    $$

!!! theorem "命题"
    如果 $\rho(t) = K_0(t)$，即零阶修正Bessel函数([3.3.15](chapter-03.md))，那么 (3.8.5) 变为

    $$
    \int_0^\infty \frac{K_0(t)}{1+xt} dt \sim \frac{1}{2} \sum_{n=0}^\infty (-2x)^n \left[ \Gamma\left(\frac{1}{2}n+\frac{1}{2}\right) \right]^2 \tag{3.8.8}
    $$

## 4. 使用渐近级数的数值近似：最优截断法则 { #s4 }

对于Stieltjes级数，我们可以提供一个精确的渐近估计，用于描述当$x \to 0+$时Stieltjes积分的精确值与Stieltjes级数的最优截断之间的差异。

!!! example "例"
    根据(3.8.6)，对于权重函数$\rho(t) = e^{-t}$的Stieltjes级数(3.8.1)，其$N$项后的误差为

    $$
    (-x)^{N} \int_0^\infty \frac{t^N}{1+xt} e^{-t} dt.
    $$

    因为第$n+1$项与第$n$项的比值是$-nx$，故Stieltjes级数(3.8.1)的最优截断是选择$N$ 为$1/x$的向下取整。如果用这个积分表示来近似最优误差$\varepsilon_{\text{optimal}}(x)$，我们有

    $$
    |\varepsilon_{\text{optimal}}(x)| \sim \left(\frac{\pi}{2x}\right)^{1/2} e^{-1/x}, \quad x \to 0+. \tag{3.8.9}
    $$

    当$x \to 0+$时，两者比值接近1。

## 5. 渐近级数的性质 { #s5 }

### 5.1 (a) 非唯一性 { #s5-1 }

一个发散幂级数的“和”并不是唯一确定的。例如，如果$f(x) \sim \sum_{n=0}^\infty a_n(x-x_0)^n$ ($x \to x_0$)，那么$f(x) + e^{-(x-x_0)^{-2}} \sim \sum_{n=0}^\infty a_n(x-x_0)^n$ ($x \to x_0$)也同样成立。事实上，级数$\sum_{n=0}^\infty a_n(x-x_0)^n$对于任何与$f(x)$相差一个函数$g(x)$的函数都是渐近的，只要当$x \to x_0$时$g(x)$比$f(x)$的所有幂次$x-x_0$都更快地趋于0。这样的函数$g(x)$被称为相对于渐近幂级数是**次主导的**，其渐近展开是

$$
g(x) \sim \sum_{n=0}^\infty 0 \cdot (x-x_0)^n, \quad x \to x_0.
$$

### 5.2 (b) 唯一性 { #s5-2 }

虽然有许多不同的函数可以渐近于一个给定的幂级数，但对于每个函数只有一个渐近幂级数。这已在3.5节中给出。

### 5.3 (c) 渐近级数中的系数等同 { #s5-3 }

$\sum_{n=0}^\infty a_n(x-x_0)^n \sim \sum_{n=0}^\infty b_n(x-x_0)^n$ ($x \to x_0$) 并不严格，因为幂级数只能渐近于函数。这个记号的意思是$\sum a_n(x-x_0)^n$和$\sum b_n(x-x_0)^n$为渐近的函数类别是相同的。容易看出两个幂级数是渐近的，当且仅当对于所有$n$，$a_n = b_n$。因此，我们可以将幂级数中的系数等同起来。

### 5.4 (d) 渐近级数的算术运算 { #s5-4 }

算术运算可以逐项对渐近级数进行。具体来说，假设

$$
f(x) \sim \sum_{n=0}^\infty a_n (x-x_0)^n, \quad x \to x_0,
$$

$$
g(x) \sim \sum_{n=0}^\infty b_n (x-x_0)^n, \quad x \to x_0.
$$

那么

$$
\alpha f(x) + \beta g(x) \sim \sum_{n=0}^\infty (\alpha a_n + \beta b_n) (x-x_0)^n, \quad x \to x_0,
$$

$$
f(x)g(x) \sim \sum_{n=0}^\infty c_n (x-x_0)^n, \quad x \to x_0,
$$

$$
\frac{f(x)}{g(x)} \sim \sum_{n=0}^\infty d_n (x-x_0)^n, \quad x \to x_0,
$$

其中

$$
c_n = \sum_{m=0}^n a_m b_{n-m},d_n = \frac{a_n - \sum_{m=0}^{n-1} d_m b_{n-m}}{b_0},
$$

后者当然要求 $b_0 \neq 0$。证明留给读者。

### 5.5 (e) 渐近级数的积分 { #s5-5 }

!!! theorem "命题"
    任何渐近级数$f(x) \sim \sum_{n=0}^\infty a_n (x-x_0)^n$ ($x \to x_0$)，如果$f(x)$在$x_0$附近可积，则可以逐项积分：

    $$
    \int_{x_0}^x f(t) dt \sim \sum_{n=0}^\infty \frac{a_n}{n+1} (x-x_0)^{n+1}, \quad x \to x_0.
    $$

??? proof "证明"
    由$|f(x) - \sum_{n=0}^N a_n(x-x_0)^n| \ll (x-x_0)^N$ ($x \to x_0$)可知，对于任何$\varepsilon > 0$，存在$\delta,R > 0$使得任意$|x-x_0| \le R$，有

    $$
    \left|f(x) - \sum_{n=0}^N a_n (x-x_0)^n\right| \le \varepsilon |x-x_0|^N,
    $$

    因此，

    $$
    \begin{aligned}
    \left| \int_{x_0}^x \left( f(t) - \sum_{n=0}^N a_n (t-x_0)^n \right) dt \right| &\le \left| \int_{x_0}^x \left| f(t) - \sum_{n=0}^N a_n(t-x_0)^n \right| dt \right| \\
    &\le \varepsilon \left| \int_{x_0}^x |t-x_0|^N dt \right| \\
    &= \frac{\varepsilon}{N+1} |x-x_0|^{N+1}
    \end{aligned}
    $$

    于是有，

    $$
    \left| \frac{\int_{x_0}^x f(t) dt - \sum_{n=0}^N \frac{a_n}{(n+1)} (x-x_0)^{n+1}}{(x-x_0)^{N+1}} \right| \le \frac{\varepsilon}{N+1}
    $$

    由于$\varepsilon > 0$是任意的，故

    $$
    \int_{x_0}^x f(t) dt - \sum_{n=0}^N \frac{a_n}{n+1} (x-x_0)^{n+1} \ll (x-x_0)^{N+1}, \quad x \to x_0,
    $$

    这表明渐近级数可以逐项积分。

如果我们希望对一个在无穷远处的渐近级数进行积分，则上述论证可以推广到，如果$f(x) \sim \sum_{n=0}^\infty a_n x^{-n}$ ($x \to \infty$)，那么

$$
\int_x^\infty [f(t) - a_0 - a_1 t^{-1}] dt \sim \sum_{n=2}^\infty \frac{a_n}{n-1} x^{1-n}, \quad x \to \infty.
$$

### 5.6 (f) 渐近级数的微分 { #s5-6 }

渐近级数通常不能逐项微分，这与次主导性有关。考虑

$$
g(x) = f(x) + e^{-1/(x-x_0)^2} \sin(e^{1/(x-x_0)^2})
$$

与$f(x)$相差一个次主导函数，因此当$x \to x_0$时具有相同的渐近级数展开。然而，$f'(x)$和

$$
g'(x) = f'(x) - 2(x-x_0)^{-3} \cos(e^{1/(x-x_0)^2}) + 2(x-x_0)^{-3} e^{-1/(x-x_0)^2} \sin(e^{1/(x-x_0)^2})
$$

不具有相同的渐近幂级数展开。我们有如下几种定理来处理渐近级数的微分。

!!! theorem "定理"
    设$f'(x)$存在且可积，且$f(x) \sim \sum_{n=0}^\infty a_n(x-x_0)^n$ ($x \to x_0$)，那么

    $$
    f'(x) \sim \sum_{n=1}^\infty n a_n(x-x_0)^{n-1}, \quad x \to x_0.
    $$

??? proof "证明"
    设$f'(x) \sim \sum_{n=0}^\infty b_n(x-x_0)^n$ ($x \to x_0$)。逐项积分给出

    $$
    f(x) = f(x_0) + \int_{x_0}^x f'(t) dt \sim f(x_0) + \sum_{n=0}^\infty \frac{b_n}{n+1} (x-x_0)^{n+1}, \quad x \to x_0.
    $$

    由渐进级数的唯一性即得。

!!! theorem "定理"
    设$f(x) \sim x^p$ ($x \to +\infty$)，其中$p \ge 1$且$f''(x)$是正的，那么$f'(x) \sim px^{p-1}$ ($x \to +\infty$)。

这个结果只涉及$f(x)$的主导行为，并不能证明渐近级数的逐项微分。渐近级数的逐项微分在复数域中要清晰得多。

!!! theorem "定理"
    设$f(z)$在扇区$\theta_1 \le \arg(z-z_0) \le \theta_2$, $0 < |z-z_0| < R$内是解析的，并且$f(z) \sim \sum_{n=0}^\infty a_n(z-z_0)^n$ [$z \to z_0; \theta_1 \le \arg(z-z_0) \le \theta_2$]，那么

    $$
    f'(z) \sim \sum_{n=1}^\infty n a_n (z-z_0)^{n-1}, \quad z \to z_0; \theta_1 < \arg(z-z_0) < \theta_2.
    $$

即使渐进级数的微分定理比较复杂，但我们指出，如果已知一个函数满足一个线性微分方程，其系数可以展开为渐近级数，那么整个情况就会大大简化。

## 6. 微分方程解的渐近展开 { #s6 }

上文中给出的形式化方法需要有其合理性的证明，这有如下几点困难要处理。首先，我们一直在假设主导行为被分解出来后，解的剩余部分存在一个渐近级数展开。然而，容易看到并非所有函数都能被展开为渐近级数。其次，渐近级数通常不能逐项微分。我们考虑 $y(x)$ 是 $y'' + py' + qy = 0$ 的解，其中 $p(x), q(x)$ 当 $x \to x_0$ 时可展开为渐近幂级数，则若 $y(x)$ 当 $x \to x_0$ 时可展开为渐近幂级数，就有 $y'(x)$ 的渐近幂级数是对 $y(x)$ 的渐近幂级数逐项微分得到的。这个结论对于一般的$n$阶微分方程也是成立的。

剩下的问题是要证明解具有渐近级数表示，我们通过一个例子来说明。

!!! example "例（$K_\nu(x)$ 渐近展开的存在性）"
    回忆，$K_\nu(x)$ 被定义为修正Bessel方程

    $$
    x^2 y'' + xy' - (x^2 + \nu^2)y = 0 \tag{3.8.10}
    $$

    的解，其主导行为是

    $$
    K_\nu(x) \sim \left(\frac{\pi}{2x}\right)^{1/2} e^{-x}, \quad x \to +\infty. \tag{3.8.11}
    $$

    将 $w(x) = (\pi/2x)^{-1/2} e^x w(x)$ 代入 (3.8.10)，得到 $w(x)$ 的微分方程：

    $$
    w'' - 2w' + \frac{\lambda}{x^2} w = 0, \tag{3.8.12}
    $$

    其中 $\lambda = \frac{1}{4} - \nu^2$。我们想证明 $w(x)$ 具有 $w(x) \sim 1 + a_1/x + a_2/x^2 + \dots$ 形式的渐近展开，容易验证它必须满足积分方程：

    $$
    w(x) = 1 + \frac{\lambda}{2} \int_x^\infty (e^{2(x-t)}-1) \frac{w(t)}{t^2} dt. \tag{3.8.13}
    $$

    可以证明积分方程(3.8.13)有一个对 $x>a$ 有界 $B_0$ 的解：$|w(x)| \le B_0$ ($x>a$)，进而有：

    $$
    \frac{1}{2} \left| \int_x^\infty (e^{2(x-t)}-1) \frac{w(t)}{t^2} dt \right| \le \frac{1}{2} \int_x^\infty \frac{|w(t)|}{t^2} dt \le \frac{B_0}{2x}, \quad x>a.
    $$

    上式与(3.8.13) 表明 $w(x) \equiv 1+w_1(x)$ 满足 $|w_1(x)| \le B_1/x$ ($x>a$)，其中 $B_1 = \frac{1}{2} \lambda B_0$，代入(3.8.13) 给出

    $$
    w_1(x) = \frac{\lambda}{2} \int_x^\infty (e^{2(x-t)}-1) \frac{1}{t^2} dt + \frac{\lambda}{2} \int_x^\infty (e^{2(x-t)}-1) \frac{w_1(t)}{t^2} dt.
    $$

    对第一个积分分部积分得到

    $$
    \frac{\lambda}{2} \int_x^\infty (e^{2(x-t)}-1) \frac{1}{t^2} dt = -\frac{\lambda}{2x} + \frac{\lambda^2}{2} \int_x^\infty \frac{e^{2x-2t}}{t^2} dt.
    $$

    因此，存在一个正常数 $B_2$ 使得 $w(x) = 1 - \lambda/2x + w_2(x)$，其中 $|w_2(x)| < B_2/x^2$ ($x>a$)，这等价于 $w(x) \sim 1 - \lambda/2x$ ($x \to \infty$)。反复进行分部积分，我们可以证明 $w(x)$ 具有渐近展开。

## 7. 复平面中的渐近幂级数：不同有效扇形区域之间的联系 { #s7 }

在级数对一个函数的有效扇形区域之外，通常还有其他级数对该函数渐近，且它们有自己的有效扇形区域。例如，我们在3.5节和3.7节中看到，函数 Ai($x$) 和 Bi($x$) 对大 $|x|$ 有不同的渐近展开，这取决于 $x$ 的符号。因此，对于Airy方程 $y''=zy$，一般的渐近表示为

$$
y(z) \sim a_1 z^{-1/4} e^{-\frac{2}{3}z^{3/2}} \sum_{n=0}^\infty (-1)^n c_n z^{-3n/2} + a_2 z^{-1/4} e^{\frac{2}{3}z^{3/2}} \sum_{n=0}^\infty c_n z^{-3n/2}, \quad z \to \infty, \tag{3.8.14}
$$

其中 $a_1$ 和 $a_2$ 是常数。特殊解 Ai($z$) 和 Bi($z$) 的渐近展开可以通过指定 $a_1$ 和 $a_2$ 的值来确定。斯托克斯现象仅表明在复平面的不同扇形区域中，Ai($z$) 或 Bi($z$) 的 $a_1$ 和 $a_2$ 的值可能不同。对于 Ai($z$):

$$
\begin{align*}
a_1 = \frac{1}{2\sqrt{\pi}}, \quad a_2 = 0, \quad &|\arg z| < \pi; \tag{3.8.15} \\
a_1 = \frac{1}{2\sqrt{\pi}}, \quad a_2 = \frac{i}{2\sqrt{\pi}}, \quad &\frac{\pi}{3} < \arg z < \frac{5\pi}{3}; \tag{3.8.16} \\
a_1 = \frac{1}{2\sqrt{\pi}}, \quad a_2 = \frac{-i}{2\sqrt{\pi}}, \quad &-\frac{5\pi}{3} < \arg z < -\frac{\pi}{3}. \tag{3.8.17}
\end{align*}
$$

对于 Bi($z$):

$$
\begin{align*}
a_1 \text{ 任意}, \quad a_2 = \frac{1}{\sqrt{\pi}}, \quad &|\arg z| < \frac{\pi}{3}; \tag{3.8.18} \\
a_1 = \frac{i}{2\sqrt{\pi}}, \quad a_2 = \frac{1}{\sqrt{\pi}}, \quad &\frac{\pi}{3} < \arg z < \frac{5\pi}{3}; \tag{3.8.19} \\
a_1 = \frac{-i}{2\sqrt{\pi}}, \quad a_2 = \frac{1}{\sqrt{\pi}}, \quad &-\frac{5\pi}{3} < \arg z < -\frac{\pi}{3}. \tag{3.8.20}
\end{align*}
$$

在(3.8.18)中，$a_1$是任意的，这是因为其为在$|\arg z| < \pi/3$时为次主导的函数。尽管Airy函数的渐近展开是唯一的，但人们不能解析地将其渐近展开从一个有效扇形区域延拓到另一个。那么，这些对大$|z|$的不同渐近展开之间有什么联系呢？要回答这个问题，考虑：

$$
\begin{align*}
\text{Ai}(z) &= -\omega \text{Ai}(\omega z) - \omega^2 \text{Ai}(\omega^2 z), \tag{21} \\
\text{Bi}(z) &= i\omega \text{Ai}(\omega z) - i\omega^2 \text{Ai}(\omega^2 z), \tag{22}
\end{align*}
$$

其中 $\omega = e^{-2\pi i/3}$ 。我们使用该函数关系来推导(3.8.15)和(3.8.16)与(3.8.19)之间的联系。若 $\frac{1}{3}\pi < \arg z < \frac{5}{3}\pi$，那么 $-\pi/3 < \arg(\omega z) < \pi$ 并且 $-\pi < \arg(\omega^2 z) < \pi/3$。因此，(3.8.14)中具有 $a_1$ 和 $a_2$ 的(3.8.15)给出了 Ai($\omega z$) 和 Ai($\omega^2 z$) 的有效渐近展开。使用(3.8.14)，我们得到(3.8.16)。方程(3.8.21a,b)允许我们将渐近展开旋转120度。Ai($z$)的渐近展开由(3.8.14)和(3.8.16)给出。然而，Bi($z$)的渐近展开(3.8.18)与(3.8.20)给出的区域没有重叠。为了验证 Bi($z$) 在 $-\pi < \arg z < -\pi/3$ 和 $\pi/3 < \arg z < \pi$ 时的有效性，可能需要获得额外的渐近展开。通过推导这些不同的渐近展开，我们解释了 Ai($x$) 和 Bi($x$) 对大正 $x$ 的指数行为与对大负 $x$ 的振荡行为之间的联系。

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/computational-applied-math.pdf){ .md-button download="computational-applied-math.pdf" }
