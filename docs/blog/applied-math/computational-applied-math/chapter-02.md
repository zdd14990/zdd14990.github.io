---
title: 第二章：差分方程
date: 2026-07-07
updated: 2026-10-15
description: 计算与应用数学笔记第二章：差分、初等差分方程、齐次线性差分方程、常数系数方程、线性无关性与Wronskian、Wronskian的递推关系、初值问题与边值问题、降阶法。
hide:
  - navigation
categories:
  - 应用数学
tags:
  - applied-math
---

# 第二章：差分方程 { #top }

差分方程的研究基于离散微积分概念，旨在总结其求解的基本方法。其常用于计算递归定义的量，例如：Taylor 级数或 Fourier 展开的第 $n$ 项系数，通过余子式展开的 $n \times n$ 矩阵的行列式。在数值分析中，差分方程频繁出现于用离散系统逼近连续系统的场景。

## 1. 差分 { #s1 }

!!! definition "定义"
    定义在整数集上的函数将每个整数 $n$ 映射到数 $a_n$，函数 $a_n$ 的离散导数定义为：

    $$
    D a_n \equiv a_{n+1} - a_n.
    $$

    二阶导数 $D^2 a_n$ 是导数的导数：

    $$
    D^2 a_n = (a_{n+2} - a_{n+1}) - (a_{n+1} - a_n) = a_{n+2} - 2a_{n+1} + a_n.
    $$

    $k$ 阶导数通过连续取 $k$ 次导数定义。

!!! definition "定义"
    函数 $a_n$ 的离散原函数（或离散积分） $b_n$ 定义为和式：

    $$
    b_n = \sum_{j=n_0}^n a_j.
    $$

!!! example "例"
    连续函数 $f(x) = x^k$ 对应的离散函数为：

    $$
    f_n = n(n+1)\cdots(n+k-1)
    $$

    - **连续导数**：$f'(x) = kx^{k-1}$

    - **离散导数**：

        $$
        f_{n+1} - f_n = k \cdot (n+1)(n+2)\cdots(n+k-1)
        $$

        含 $k-1$ 个因子。

## 2. 初等差分方程 { #s2 }

!!! definition "定义"
    同 1.1节 $N$ 阶微分方程的定义，$N$ 阶差分方程的自然定义为：

    $$
    a_n^{(N)} = F\left[n, a_n, a_n^{(1)}, \cdots, a_n^{(N-1)}\right]
    $$

    其中 $a_n^{(j)}$ 是 $a_n$ 的$j$阶离散导数。为避免 $a_n, a_{n+1}, \cdots$ 的重复，采用更简洁的常规定义：

    $$
    a_{n+N} = G[n, a_n, a_{n+1}, \cdots, a_{n+N-1}]
    \tag{2.2.1}
    $$

    此形式可显式转换为离散导数形式。

$N$阶差分方程(2.2.1)的通解含$N$个独立参数 $c_1, c_2, \cdots, c_N$。

!!! example "例（阶乘函数）"
    一阶线性齐次差分方程 $a_{n+1} = n a_n$ 的解为：

    $$
    a_n = c_1 (n-1)!
    $$

    其中常数 $c_1$ 为求和常数。

!!! example "例（伽马函数 $\Gamma(z)$）"
    Gamma 函数是最广泛使用的高等超越函数。当 $z = n$ 为正整数时，$\Gamma(n) = (n-1)!$。对 $\operatorname{Re} z > 0$，其积分定义为：

    $$
    \Gamma(z) = \int_0^\infty e^{-t} t^{z-1} dt
    \tag{2.2.2}
    $$

    其满足差分方程：

    $$
    \Gamma(z+1) = z\Gamma(z)
    \tag{2.2.3}
    $$

    此差分方程可将$\Gamma(z)$解析延拓至 $\operatorname{Re} z \leq 0$。Γ(z)是复平面上的单值解析函数，在 $z = 0, -1, -2, \cdots$ 处有单极点。

!!! example "例（一阶线性齐次方程）"
    方程 $a_{n+1} = p(n)a_n$ 的解为乘积形式：

    $$
    a_{n} = a_1 \prod_{j=1}^{n-1} p(j)
    \tag{2.2.4}
    $$

    其中 $a_1$ 为任意常数。类比微分方程 $y' = p(x)y$ 的解为：

    $$
    y(x) = y(0) \exp \left( \int_0^x p(t)  dt \right)
    $$

!!! example "例（一阶线性非齐次方程）"
    解方程 $a_{n+1} = p(n)a_n + q(n)$ 需用求和因子：

    $$
    \left[ \prod_{j=1}^n p(j) \right]^{-1}
    $$

    乘两边得：

    $$
    \frac{a_{n+1}}{\prod_{j=1}^n p(j)} - \frac{a_n}{\prod_{j=1}^{n-1} p(j)} = \frac{q(n)}{\prod_{j=1}^n p(j)}
    $$

    左式为离散导数。从1到 $n-1$ 求和得解：

    $$
    a_n = \prod_{j=1}^{n-1} p(j) \left[ \sum_{k=1}^{n-1} \frac{q(k)}{\prod_{j=1}^k p(j)} + a_1 \right], \quad n \geq 2
    $$

!!! example "例（带边界条件的一阶方程）"
    要求方程 $a_{n+1} = \frac{n}{n+1} a_n + \frac{n-1}{(n+1)^2(n+2)(n+3)}$ 在 $n=0$ 处有界。乘求和因子 $n+1$ 后求和得通解：

    $$
    a_n = \frac{a_1 + \frac{1}{6}}{n} - \frac{1}{(n+1)(n+2)} \quad (n>0)
    $$

    由 $a_0$ 有界得 $a_1 = -\frac{1}{6}$，故唯一解：

    $$
    a_n = -\frac{1}{(n+1)(n+2)} \quad (n \geq 0)
    $$

    类比微分方程 $y' + (\cot x)y = -1$ 在 $x=0$ 处有界的解为：

    $$
    y(x) = \frac{\cos x - 1}{\sin x}
    $$

非线性差分方程通常难解，但以下特例可求显式解。

!!! example "例（$a_{n+1} = a_n^2$）"
    取对数得线性方程：

    $$
    \ln a_{n+1} = 2 \ln a_n \implies \ln a_n = 2^{n-1} \ln a_1 \implies a_n = a_1^{2^{n-1}}
    $$

!!! example "例（$a_{n+2} = a_{n+1}^2 / a_n$）"
    取对数得：

    $$
    \ln a_{n+2} - 2 \ln a_{n+1} + \ln a_n = 0
    $$

    二阶离散导数为零。两次求和得：

    $$
    \ln a_n = c_1 n + c_2 \implies a_n = e^{c_1 n + c_2}
    $$

!!! example "例（$a_{n+1} = 2a_n^2 - 1$）"
    $$
    a_n =
    \begin{cases}
    \cos \left( 2^{n-1} \cos^{-1} a_1 \right), & |a_1| \leq 1 \\
    \cosh \left( 2^{n-1} \cosh^{-1} a_1 \right), & |a_1| \geq 1
    \end{cases}
    $$

## 3. 齐次线性差分方程 { #s3 }

$N$阶齐次线性差分方程的一般形式为：

$$
a_{n+N} + p_{N-1}(n)a_{n+N-1} + \cdots + p_0(n)a_n = 0
\tag{2.3.1}
$$

其中 $p_0, p_1, \cdots, p_{N-1}$ 为 $n$ 的任意函数。与微分方程类似，(2.3.1)的通解是其$N$个线性无关解的任意线性组合。

## 4. 常数系数方程 { #s4 }

当系数 $p_j$ 与 $n$ 无关时，称为常数系数方程。借鉴微分方程解法，指数形式解 $a_n = r^n$，代入(2.3.1)得特征方程：

$$
r^N + p_{N-1}r^{N-1} + \cdots + p_0 = 0
\tag{2.3.2}
$$

若特征根 $r_1, r_2, \cdots, r_N$ 互异，则通解为 $a_n = \sum_{k=1}^N c_k r_k^n$。若 $r_1$ 为 $m$ 重根，则对应解为 $r_1^n, n r_1^n, \cdots, n^{m-1} r_1^n$。

## 5. 线性无关性与Wronskian { #s5 }

函数集 $\{a_n, b_n, \cdots\}$ 在区间 $n_1 \leq n \leq n_2$ 线性无关当且仅当方程 $k_1a_n+k_2b_n+\cdots = 0$ 仅有零解。

!!! definition "定义"
    离散Wronskian（Casoratian）定义为：

    $$
    W_n = \det
    \begin{pmatrix}
    a_n & b_n & \cdots \\
    a_{n+1} & b_{n+1} & \cdots \\
    \vdots & \vdots & \ddots
    \end{pmatrix}
    \tag{2.3.3}
    $$

!!! theorem "命题"
    函数集线性相关当且仅当对所有 $n$ 有 $W_n \equiv 0$。

## 6. Wronskian的递推关系 { #s6 }

对$N$阶齐次线性差分方程，解的Wronskian满足一阶方程（类比Abel公式）：

!!! example "例（二阶方程情形）"
    设 $a_n, b_n$ 为方程

    $$
    a_{n+2} + p_1(n)a_{n+1} + p_0(n)a_n = 0
    \tag{2.3.4}
    $$

    的解，则：

    $$
    W_{n+1} = W_n p_0(n) \implies W_n = W_{n_0} \prod_{j=n_0}^{n-1} p_0(j)
    \tag{2.3.5}
    $$

    当 $p_0(n) \neq 0$ 时，非零Wronskian保持非零。

## 7. 初值问题与边值问题 { #s7 }

$N$阶齐次线性差分方程的通解含$N$个参数，可通过两种方式确定：

1. **初值问题**：在定义域 $n_1 \leq n \leq n_2$ 内指定单点 $n_0$ 的$N$个离散导数值（或$N$个连续函数值）。解存在唯一的充要条件：

    - $n_0$ 处Wronskian非零
    - $p_0(n)$ 在 $n_1 \leq n \leq n_0$ 非零

2. **边值问题**：在定义域内任意点指定$N$个函数值或导数值。解的存在唯一性无简单判别准则。

## 8. 降阶法 { #s8 }

若已知方程的一个特解 $A_n$，可通过代换

$$
a_n = A_n x_n
\tag{2.3.6}
$$

将方程降阶。

## 9. 欧拉方程 { #s9 }

回顾1.4节，除常数系数微分方程外，还有一类可求解的方程称为欧拉方程。欧拉微分方程的形式为：

$$
x^N \frac{d^N}{dx^N} y + p_{N-1}x^{N-1} \frac{d^{N-1}}{dx^{N-1}} y + \cdots + p_1 x \frac{dy}{dx} + p_0 y = 0
\tag{2.3.7}
$$

其中 $p_0, p_1, \cdots, p_{N-1}$ 是常数。为构造欧拉方程的差分方程类比，回顾2.1节例 2.1中 $x$ 幂的离散类比：$x \leftrightarrow n, \quad x^2 \leftrightarrow n(n+1), \quad x^3 \leftrightarrow n(n+1)(n+2), \quad \cdots, \quad x^N \leftrightarrow n(n+1)(n+2) \cdots (n+N-1).$我们利用 Gamma 函数重写：

$$
\frac{\Gamma(n+N)}{\Gamma(n)} = n(n+1)(n+2) \cdots (n+N-1)
\tag{2.3.8}
$$

!!! definition "定义（离散欧拉方程）"
    定义离散欧拉方程为：

    $$
    \frac{\Gamma(n+N)}{\Gamma(n)} a_n^{(N)} + p_{N-1} \frac{\Gamma(n+N-1)}{\Gamma(n)} a_n^{(N-1)} + \cdots + p_1 n a_n^{(1)} + p_0 a_n = 0
    \tag{2.3.9}
    $$

现回顾欧拉微分方程(2.3.7)的解法，取代换

$$
y(x) = x^r
\tag{2.3.10}
$$

将方程(2.3.7)化为关于 $r$ 的方程：

$$
r(r-1)(r-2) \cdots (r-N+1) + p_{N-1} r(r-1) (r-2) \cdots (r-N+2) + \cdots + p_1 r + p_0 = 0.
\tag{2.3.11}
$$

为求解离散欧拉方程(2.3.9)，需对实数 $r$ 代换 $x^r$ 的离散类比。定义 $x^r$ 的离散类比为 $\Gamma(n+r)/\Gamma(n)$。其一阶离散导数为：

$$
\frac{\Gamma(n+r+1)}{\Gamma(n+1)} - \frac{\Gamma(n+r)}{\Gamma(n)} = \frac{r}{n} \frac{\Gamma(n+r)}{\Gamma(n)},
$$

此即 $r x^r / x$ 的离散类比。二阶导数为：$r(r-1)\frac{\Gamma(n+r)}{\Gamma(n) n (n+1)},$对应 $r(r-1) x^r / x^2$。$N$ 阶导数为：

$$
\left[ \frac{r(r-1)\cdots(r-N+1)}{\Gamma(n+N)/\Gamma(n)} \right] \left[ \frac{\Gamma(n+r)}{\Gamma(n)} \right],
$$

对应 $r(r-1)\cdots(r-N+1) x^r / x^N$。将 $a_n = \Gamma(n+r)/\Gamma(n)$ 代入(2.3.9)得关于 $r$ 的多项式方程：

$$
r(r-1)\cdots(r-N+1) + p_{N-1} r(r-1)\cdots(r-N+2) + \cdots + p_1 r + p_0 = 0.
\tag{2.3.12}
$$

此方程的根决定(2.3.9)的解。

!!! example "例（离散欧拉方程求解）"
    - (a) 求解欧拉方程：

        $$
        n(n + 1)a_n^{(2)} + n a_n^{(1)} - \frac{1}{4}a_n = 0
        \tag{2.3.13}
        $$

        代换 $a_n = \Gamma(n + r)/\Gamma(n)$ 得特征方程：$r^2 - \frac{1}{4} = 0$根为 $r_1 = \frac{1}{2},\, r_2 = -\frac{1}{2}$。通解为：

        $$
        a_n = c_1 \frac{\Gamma(n + \frac{1}{2})}{\Gamma(n)} + c_2 \frac{\Gamma(n - \frac{1}{2})}{\Gamma(n)}
        $$

    - (b) 求解欧拉方程：

        $$
        n(n + 1)a_n^{(2)} + \frac{1}{4}a_n = 0
        \tag{2.3.14}
        $$

        同上代换得特征方程：$r^2 - r + \frac{1}{4} = 0$有二重根 $r = \frac{1}{2}$，仅得一个特解：

        $$
        a_n = \frac{\Gamma(n + \frac{1}{2})}{\Gamma(n)}
        $$

        设 $a_n = \varphi(n) \frac{\Gamma(n + \frac{1}{2})}{\Gamma(n)}$，通过降阶法得：$\varphi(n) = \sum_{k=1}^{n} \frac{1}{k - \frac{1}{2}}$，通解为：

        $$
        a_n=c_1\frac{\Gamma(n + \frac{1}{2})}{\Gamma(n)}+c_2 \varphi(n)\frac{\Gamma(n + \frac{1}{2})}{\Gamma(n)}
        \tag{2.3.15}
        $$

## 10. 生成函数法 { #s10 }

若差分方程的解 $a_n$ 是 $F(x)$ Taylor展开的第 $n$ 项系数，则 $F(x)$ 可能满足易解的微分方程。

!!! example "例（生成函数法求解差分方程）"
    解差分方程：

    $$
    (n+1)(n+2)a_{n+2} - 2(n+1)a_{n+1} - 3a_n = 0, \quad n \geq 0
    \tag{2.3.16}
    $$

    初值条件：$a_0 = 2, \, a_1 = 2$。定义生成函数：$F(x) = \sum_{n=0}^{\infty} a_n x^n$，逐项求导得：

    $$
    F'(x) = \sum_{n=0}^{\infty} (n+1)a_{n+1} x^n, \quad
    F''(x) = \sum_{n=0}^{\infty} (n+2)(n+1)a_{n+2} x^n
    $$

    代入(2.3.16)得微分方程：

    $$
    F''(x) - 2F'(x) - 3F(x) = 0
    $$

    初值条件：$F(0) = 2, \, F'(0) = 2$。解得：

    $$
    F(x) = e^{3x} + e^{-x}
    $$

    由 Taylor 公式得到

    $$
    a_n = \left. \frac{1}{n!} \frac{d^n}{dx^n} F(x) \right|_{x=0} = \frac{3^n + (-1)^n}{n!}
    $$

!!! example "例（降阶的生成函数法）"
    二阶差分方程：

    $$
    a_{n+2} = a_{n+1} + (n+1)a_n, \quad a_0 = a_1 = 1
    \tag{2.3.17}
    $$

    定义生成函数：

    $$
    F(x) = \sum_{n=0}^{\infty} \frac{a_n x^n}{n!}
    $$

    将(2.3.17)乘以 $\frac{x^{n+1}}{(n+1)!}$ 后求和得微分方程：

    $$
    F'(x) - 1 = (F(x) - 1) + xF(x) \implies F'(x) = (x + 1)F(x)
    $$

    初值条件 $F(0) = 1$，解得：

    $$
    F(x) = e^{x + \frac{x^2}{2}}
    $$

    最终解为：

    $$
    a_n = \left. \frac{d^n}{dx^n} e^{x + \frac{x^2}{2}} \right|_{x=0}
    $$

## 11. 特征值问题 { #s11 }

与微分方程类似，差分方程也存在边值问题以确定特征值和特征函数。

!!! example "例"
    考虑差分方程：

    $$
    (n + 8)(n + 2)a_{n+2} - (n + 1)(2n + 11)a_{n+1} + (n + 1)(n + 2)a_n = E a_{n+1}
    \tag{2.3.18}
    $$

    满足边界条件：

    $$
    a_{-1} < \infty
    \tag{2.3.19}
    $$

    $$
    S = \sum_{n=0}^{\infty} a_n < \infty
    \tag{2.3.20}
    $$

    仅当参数 $E$ 取特定值（特征值）时，方程组(2.3.18)-(2.3.20)有解，下面我们来逐步分析。

    代入 $n = -1$ 得：$7a_1 = E a_0 \implies a_1 = \frac{E}{7} a_0$，这表明以 $a_0, a_1$ 为初值，序列由递推唯一确定。不妨 $a_0 = 1$，则序列完全由 $E$ 决定。

    在 $n \to \infty$ 时有渐近形式：

    $$
    a_n = c_1(E)n^{-3+\sqrt{2+E}} \text{ 或 } c_2(E)n^{-3-\sqrt{2+E}}
    \tag{2.3.21}
    $$

    当 $E \geq 2$ 时，仅当 $c_1(E) = 0$ 时级数收敛；当 $E < 2$ 时，级数可能收敛。

    对(2.3.18)从 $n = -1$ 到 $\infty$ 求和得

    $$
    2 \sum_{n=0}^{\infty} a_n = 2S
    \tag{2.3.22}
    $$

    故有 $E=2$ 或 $S=0$。

    - **$E = 2$ 的特征函数**：

        $$
        a_n = \frac{720}{(n+2)(n+3)(n+4)(n+5)(n+6)}
        \tag{2.3.23}
        $$

    - **$E = -1$ 的特征函数**：

        $$
        a_n = \frac{(1 - 3n/2) \cdot 720}{(n+2)(n+3)(n+4)(n+5)(n+6)}
        \tag{2.3.24}
        $$

    - **$E = -2$ 的特征函数**：

        $$
        a_n = \frac{(n^2 - 13n + 6) \cdot 120}{(n+2)(n+3)(n+4)(n+5)(n+6)}
        \tag{2.3.25}
        $$

    不同特征值 $E_a \neq E_b$ 对应的特征函数 $a_n, b_n$ 满足正交关系：

    $$
    \sum_{n=0}^{\infty} (n+2)(n+3)(n+4)(n+5)(n+6) a_n b_n = 0
    \tag{2.3.26}
    $$

    可通过直接计算验证(2.3.23)-(2.3.25)满足此条件。

## 12. 非齐次线性差分方程 { #s12 }

非齐次线性差分方程的通解由特解与对应齐次方程通解的线性组合构成。求解方法与微分方程类似。

## 13. 参数变异法 { #s13 }

参数变异法用于构造 $N$ 阶非齐次差分方程

$$
a_{n+N} + p_{N-1}(n)a_{n+N-1} + \cdots + p_1(n)a_{n+1} + p_0(n)a_n = q(n) \tag{2.4.1}
$$

的解，其解的基为相关联的齐次方程

$$
a_{n+N} + p_{N-1}(n)a_{n+N-1} + \cdots + p_1(n)a_{n+1} + p_0(n)a_n = 0 \tag{2.4.2}
$$

的 $N$ 个线性无关解。此处展示二阶方程的求解过程。设 $A_n$ 和 $B_n$ 是方程

$$
a_{n+2} + p_1(n)a_{n+1} + p_0(n)a_n = 0 \tag{2.4.3}
$$

的两个已知线性无关解。为求解

$$
a_{n+2} + p_1(n)a_{n+1} + p_0(n)a_n = q(n), \tag{2.4.4}
$$

我们寻求形如

$$
a_n = A_nx_n + B_ny_n \tag{2.4.5}
$$

的解 $a_n$。将 (2.4.5) 代入 (2.4.4) 得

$$
A_{n+2}x_{n+2} + B_{n+2}y_{n+2} + p_1(n)A_{n+1}x_{n+1} + p_1(n)B_{n+1}y_{n+1} + p_0(n)A_nx_n + p_0(n)B_ny_n = q(n).
$$

利用 $A_n$ 和 $B_n$ 满足 (2.4.3) 的性质，可从此方程中消去 $A_{n+2}$ 和 $B_{n+2}$，得到：

$$
\begin{aligned}
- x_{n+2}p_1(n)A_{n+1} &- x_{n+2}p_0(n)A_n - y_{n+2}p_1(n)B_{n+1} - y_{n+2}p_0(n)B_n \\
&+ p_1(n)A_{n+1}x_{n+1} + p_1(n)B_{n+1}y_{n+1} + p_0(n)A_nx_n + p_0(n)B_ny_n = q(n).
\end{aligned}
\tag{2.4.6}
$$

至此，我们视 $x_n$ 和 $y_n$ 为 $n$ 的两个独立函数。保持 $x_n$ 任意性，施加约束

$$
A_{n+1}(x_{n+2} - x_{n+1}) + B_{n+1}(y_{n+2} - y_{n+1}) = 0 \tag{2.4.7}
$$

(2.4.6)化简为：

$$
- A_np_0(n)(x_{n+2} - x_{n+1}) - p_0(n)B_n(y_{n+2} - y_{n+1}) = q(n). \tag{2.4.8}
$$

联立 (2.4.7) 和 (2.4.8) 解得 $x_{n+1} - x_n$ 和 $y_{n+1} - y_n$：

$$
x_{n+2} - x_{n+1} = -\frac{q(n)B_{n+1}}{p_0(n)W_n},
$$

$$
y_{n+2} - y_{n+1} = \frac{q(n)A_{n+1}}{p_0(n)W_n},
$$

其中 $W_n = A_nB_{n+1} - B_nA_{n+1}$ 为齐次方程两解的 Wronskian 行列式。由此得到通解 $a_n$：

$$
a_n = c_1A_n + c_2B_n - A_n\sum^{n-2}\frac{q(j)B_{j+1}}{W_{j+1}} + B_n\sum^{n-2}\frac{q(j)A_{j+1}}{W_{j+1}}, \tag{2.4.9}
$$

此处求和下限保留任意性，$c_1$ 和 $c_2$ 为任意常数，并利用了关系式 $W_{j+1} = p_0(j)W_j$ 。

!!! example "例（二阶方程的参数变异法）"
    考虑方程

    $$
    (n + 4)a_{n+2} + a_{n+1} - (n + 1)a_n = 1.
    \tag{2.4.10}
    $$

    的特解。系数函数 $p_1(n) = 1/(n + 4)$，$p_0(n) = -(n + 1)/(n + 4)$，$q(n) = 1/(n + 4)$。两个线性无关解已知：

    $$
    A_n = \frac{1}{(n + 1)(n + 2)},
    $$

    $$
    B_n = \frac{(-1)^{n+1}(2n + 3)}{4(n + 1)(n + 2)}.
    $$

    利用 $A_n$ 和 $B_n$ 的表达式计算 Wronskian 行列式 $W_n$：

    $$
    W_n = A_n B_{n+1} - B_n A_{n+1}
    = \frac{(-1)^n}{(n + 1)(n + 2)(n + 3)}.
    $$

    由此可得

    $$
    \frac{B_{n+1}}{W_{n+1}} = -\frac{(n + 4)(2n + 5)}{4}, \quad \frac{A_{n+1}}{W_{n+1}} = (-1)^{n+1}(n + 4).
    $$

    将上述结果代入 (2.4.9) 得特解公式：

    $$
    \begin{aligned}
    a_n &= -A_n \sum_{j=0}^{n-2} \frac{q(j)B_{j+1}}{W_{j+1}} + B_n \sum_{j=0}^{n-2} \frac{q(j)A_{j+1}}{W_{j+1}}\\
    &= \frac{1}{4(n + 1)(n + 2)} \left[ (n + 1)^2 + (2n + 3) \frac{1 + (-1)^n}{2} \right].\\
    \end{aligned}
    $$

    可舍弃括号中的 $(-1)^n (2n + 3)$ 项，因其与齐次方程的解 $B_n$ 成比例；亦可舍弃括号中的常数项，因其与 $A_n$ 成比例。最终得特解 $a_n = n(n + 3)/[4(n + 1)(n + 2)]$。易验证此解满足 (2.4.10)。

    通解：

    $$
    a_n = c_1 \frac{1}{(n + 1)(n + 2)} + c_2 \frac{(-1)^{n+1}(2n + 3)}{4(n + 1)(n + 2)} + \frac{n(n + 3)}{4(n + 1)(n + 2)}.
    $$

## 14. 降阶法 { #s14 }

若已知 $N$ 阶齐次线性差分方程的一个解，可用降阶法分离该解并将方程降至 $N-1$ 阶。降阶法亦适用于非齐次方程。对于二阶方程

$$
a_{n+2} + p_1(n)a_{n+1} + p_0(n)a_n = q(n), \tag{2.4.11}
$$

设 $A_n$ 是相关联齐次方程的已知解。仿照 (2.3.6)，寻求形如

$$
a_n = x_n A_n \tag{2.4.12}
$$

的非齐次方程通解。将 (2.4.12) 代入 (2.4.11) 得

$$
A_{n+2}(x_{n+2} - x_{n+1}) - p_0(n)A_n(x_{n+1} - x_n) = q(n). \tag{2.4.13}
$$

此式为关于差分 $x_n^{(1)} = x_{n+1} - x_n$ 的一阶非齐次方程。

## 15. 待定系数法 { #s15 }

待定系数法并非一种通用方法，该方法极少适用于更复杂类型的方程，故此处不赘述。

## 16. 非线性差分方程 { #s16 }

除已提及的方法外，非线性差分方程求显式解的方法极少，下例简要概述几种应用较广的方法。

!!! example "例（代换法）"
    方程 $a_{n+1} = 2a_n(1 - a_n)$ 可通过代换 $a_n = (1 - b_n)/2$ 求解。新方程 $b_{n+1} = b_n^2$ 的解为 $b_n = b_1^{(2^{n-1})}$。因此，

    $$
    a_n = \frac{1 - (1 - 2a_1)^{2^{n-1}}}{2}.
    $$

!!! example "例（利用非线性函数关系求解方程）"
    方程 $a_{n+1} = 4a_n^3 - 3a_n$（$|a_0| \leq 1$）可通过代换 $a_n = \cos \theta_n$ 简化为 $\cos \theta_{n+1} = \cos 3\theta_n$。故解为 $a_n = \cos (3^n \cos^{-1} a_0)$。若 $|a_0| > 1$，如何求解此差分方程？

!!! example "例（生成函数法）"
    卷积方程

    $$
    a_{n+1} = K \sum_{j=0}^n a_j a_{n-j}, \quad a_0 = 1, \tag{2.5.1}
    $$

    最适合通过生成函数 $f(x) = \sum_{n=0}^\infty a_n x^n$ 求解。将 (2.5.1) 乘以 $x^n$ 并对 $n = 0$ 至 $\infty$ 求和，得 $f(x)$ 的方程：

    $$
    \frac{f(x) - 1}{x} = K[f(x)]^2.
    $$

    解为 $f(x) = (1 \pm \sqrt{1 - 4xK})/2xK$，为确保 $f(0) = a_0 = 1$ 需取负号。Taylor 展开得到：

    $$
    f(x) = \sum_{n=0}^\infty \frac{(4xK)^n \Gamma(n + \frac{1}{2})}{(n + 1)!  \Gamma(\frac{1}{2})},
    $$

    故 $x^n$ 的系数 $a_n$ 为

    $$
    a_n = \frac{(4K)^n \Gamma(n + \frac{1}{2})}{(n + 1)!  \Gamma(\frac{1}{2})}.
    $$

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/computational-applied-math.pdf){ .md-button download="computational-applied-math.pdf" }
