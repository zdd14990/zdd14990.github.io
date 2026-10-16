---
title: 第三章：内积空间与 Hilbert 空间
date: 2026-10-04
description: 证明正交投影、Hilbert 空间的 Riesz 表示与伴随算子，并学习无穷矩阵、弱收敛、SOT 和 WOT。
hide:
  - navigation
categories:
  - 分析
  - 泛函分析
tags:
  - functional-analysis
  - hilbert-space
  - operator-theory
  - course
---

# 第三章：内积空间与 Hilbert 空间 { #chapter-03 }

## 1. 为什么要引入内积 { #section-1 }

范数给出误差大小，但只凭范数未必能谈正交方向。对于最小二乘、Fourier 展开和能量方法，我们还需要角度与投影。内积把这些几何工具带入函数空间，而完备性保证正交展开和最佳逼近的极限存在。

全篇约定第一变量共轭线性、第二变量线性：$\langle f,g\rangle_{L^2}=\int\overline f g$。

## 2. 半双线性形式与内积 { #section-2 }

!!! definition "半双线性形式"

    $a:H\times H\to\mathbb C$ 对第一变量共轭线性、第二变量线性时，称半双线性形式。若 $a(x,y)=\overline{a(y,x)}$，称 Hermitian 形式；若 $a(x,x)\ge0$，称正形式。

    正形式且 $a(x,x)=0$ 只发生在 $x=0$ 时，称内积。其诱导范数为 $\|x\|=\sqrt{\langle x,x\rangle}$。内积空间在此范数下完备，称 Hilbert 空间。

!!! theorem "Cauchy–Schwarz 与平行四边形恒等式"

    $$
    |\langle x,y\rangle|\le\|x\|\|y\|,
    $$

    $$
    \|x+y\|^2+\|x-y\|^2=2\|x\|^2+2\|y\|^2.
    $$

??? proof "证明"

    对 $y\ne0$，令 $c=\langle y,x\rangle/\|y\|^2$，展开 $0\le\|x-cy\|^2$ 得 Cauchy–Schwarz；$y=0$ 显然。平行四边形恒等式直接展开内积。

    Cauchy–Schwarz 给出 $\|x+y\|^2\le(\|x\|+\|y\|)^2$，所以内积确实诱导范数。

对正半双线性形式同样有 Cauchy–Schwarz。其零空间中的向量与所有向量都配对为零，因此可先商去零空间，再完备化。第四章会把矩数据产生的正形式这样变为 Hilbert 空间。

!!! note "从二次型恢复形式"

    令 $Q(x)=a(x,x)$。采用本篇约定时，极化公式为

    $$
    a(x,y)=\frac14\big[Q(x+y)-Q(x-y)-iQ(x+iy)+iQ(x-iy)\big].
    $$

    展开右边即可验证。这说明能量中的二次型已经包含全部半双线性信息。相反，一般范数未必来自内积，例如 $\ell^1$ 的范数不满足平行四边形恒等式。

## 3. 正交与最佳逼近 { #section-3 }

### 3.1 有限正交展开 { #section-3-1 }

对标准正交向量 $e_1,\ldots,e_n$，令

$$
P_nx=\sum_{j=1}^n\langle e_j,x\rangle e_j.
$$

$x-P_nx$ 与各 $e_j$ 正交，勾股恒等式给出

$$
\|x\|^2=\sum_{j=1}^n|\langle e_j,x\rangle|^2+\|x-P_nx\|^2.
$$

这既给出 Bessel 不等式，也说明 $P_nx$ 是张成空间中的最佳逼近。Gram–Schmidt 正交化就是逐次减去已有投影，再把非零余项归一化。

### 3.2 闭子空间上的投影 { #section-3-2 }

!!! theorem "正交投影定理"

    设 $M$ 是 Hilbert 空间 $H$ 的闭线性子空间。每个 $x\in H$ 唯一写成

    $$
    x=P_Mx+(x-P_Mx),\qquad P_Mx\in M,\quad x-P_Mx\in M^\perp.
    $$

    $P_Mx$ 是 $M$ 中距离 $x$ 最近的点，$P_M$ 线性、有界且 $\|P_M\|\le1$。

??? proof "证明：最小化序列为何一定收敛"

    令 $d=\inf_{m\in M}\|x-m\|$，选 $m_n\in M$ 使 $\|x-m_n\|\to d$。平行四边形恒等式给出

    $$
    \|m_n-m_k\|^2
    =2\|x-m_n\|^2+2\|x-m_k\|^2
    -4\left\|x-\frac{m_n+m_k}{2}\right\|^2.
    $$

    最后一项中的范数至少为 $d$，故 $m_n$ 是 Cauchy 列。完备性与 $M$ 闭性给出 $m_n\to m\in M$，且 $\|x-m\|=d$。

    对 $v\in M$，函数 $\|x-m-tv\|^2$ 在实数 $t=0$ 取最小值，得到 $\operatorname{Re}\langle v,x-m\rangle=0$；再以 $iv$ 代替 $v$，得到虚部也为零。

    若有两个正交分解，其 $M$ 分量之差同时属于 $M$ 与 $M^\perp$，只能为零。唯一性给出 $P_M$ 线性；勾股恒等式给出范数估计。

因此 $H=M\oplus M^\perp$，$P_M^2=P_M=P_M^*$。对于任意线性子空间 $E$，

$$
(E^\perp)^\perp=\overline E,
\qquad \overline E=H\Longleftrightarrow E^\perp=\{0\}.
$$

!!! example "Galerkin 投影中的误差"

    在能量内积 $a(\cdot,\cdot)$ 下，若精确解 $u$ 和离散解 $u_h$ 满足 $a(v_h,u-u_h)=0$，则 $u_h$ 是离散空间中的能量正交投影，故

    $$
    \|u-u_h\|_a=\inf_{v_h}\|u-v_h\|_a.
    $$

    这是对称椭圆问题有限元误差分析的核心。一般非对称问题需要第八章的 Céa 估计。

### 3.3 正交基与 Parseval { #section-3-3 }

!!! definition "Hilbert 正交基"

    标准正交族 $(e_j)_{j\in J}$ 的线性张成稠密时，称正交基。它通常不是 Hamel 基：向量往往需要无穷多个项的范数极限来展开。

!!! theorem "正交展开"

    对 Hilbert 正交基，

    $$
    x=\sum_{j\in J}\langle e_j,x\rangle e_j,
    \qquad \|x\|^2=\sum_{j\in J}|\langle e_j,x\rangle|^2.
    $$

    若 $J$ 不可数，和按有限子集网理解；每个固定向量只有至多可数个非零系数。$H$ 等距同构于 $\ell^2(J)$。

??? proof "证明"

    Bessel 不等式使平方系数和有限，因此有限部分和是 Cauchy 网。完备性给出极限 $y$。对每个 $e_j$，$\langle e_j,x-y\rangle=0$；稠密性推出 $x=y$，勾股恒等式取极限即得 Parseval。

    反过来，对任意 $\ell^2(J)$ 系数，正交部分和同样 Cauchy，所以每组平方可和系数都能恢复一个向量。由此得到满射等距同构。一般正交基的存在可用 Zorn 引理；可分空间则可对一列稠密向量作 Gram–Schmidt。

## 4. Hilbert 空间的 Riesz 表示 { #section-4 }

!!! theorem "Riesz–Fréchet 表示定理"

    对每个 $f\in H^*$，存在唯一的 $y\in H$，使

    $$
    f(x)=\langle y,x\rangle,\qquad \|f\|=\|y\|.
    $$

    按我们的内积约定，$y\mapsto f$ 是共轭线性等距双射。

??? proof "证明"

    $f=0$ 时取 $y=0$。否则 $M=\ker f$ 是真闭子空间。取 $u$ 使 $f(u)\ne0$，令 $q=u-P_Mu$，则 $q\ne0$、$q\in M^\perp$。

    对任意 $x$，$x-f(x)q/f(q)\in M$，所以

    $$
    \langle q,x\rangle=\frac{f(x)}{f(q)}\|q\|^2.
    $$

    因此取 $y=\overline{f(q)}q/\|q\|^2$ 即可。唯一性：若 $\langle y_1-y_2,x\rangle=0$ 对所有 $x$ 成立，取 $x=y_1-y_2$。范数上界由 Cauchy–Schwarz，下界用 $x=y/\|y\|$ 测试。

!!! note "两个 Riesz 定理的区别"

    第一章的 Riesz–Markov 定理把 $C_0(X)$ 上的泛函表示为测度；本章把 $H$ 上的泛函表示为空间里的向量。前者依赖连续函数与测度结构，后者依赖内积和完备性。谱定理会同时用到两者。

## 5. 从形式到算子，从算子到伴随 { #section-5 }

### 5.1 半双线性形式的表示 { #section-5-1 }

设 $a(x,y)$ 有界，即 $|a(x,y)|\le C\|x\|\|y\|$。固定 $y$ 后它对 $x$ 共轭线性，Riesz 定理给出唯一的 $Ay$，使

$$
a(x,y)=\langle x,Ay\rangle.
$$

第二变量的线性和唯一性保证 $A$ 线性，且 $\|A\|=\|a\|$。因此有界半双线性形式与有界算子等价。若 $a$ Hermitian，则 $A=A^*$；若 $a$ 正，则 $A\ge0$。

### 5.2 伴随算子 { #section-5-2 }

!!! definition "有界算子的伴随"

    对 $T\in\mathcal B(H,K)$，$T^*\in\mathcal B(K,H)$ 由

    $$
    \langle Tx,y\rangle_K=\langle x,T^*y\rangle_H
    $$

    定义。固定 $y$ 时左端关于 $x$ 共轭线性，Riesz 定理保证表示向量存在。

有

$$
(ST)^*=T^*S^*,\qquad (T^*)^*=T,
\qquad\|T^*\|=\|T\|,\qquad\|T^*T\|=\|T\|^2.
$$

最后一个等式中，上界由范数次乘性；下界由

$$
\|Tx\|^2=\langle x,T^*Tx\rangle\le\|T^*T\|\|x\|^2
$$

得到。核与像的关系为

$$
(\operatorname{Ran}T)^\perp=\ker T^*,
\qquad\overline{\operatorname{Ran}T}=(\ker T^*)^\perp.
$$

注意第二式需要闭包，像空间可能不闭。

!!! definition "三个重要算子类型"

    $T=T^*$ 称自伴；$T^*T=TT^*$ 称正规；$U^*U=UU^*=I$ 称酉。仅有 $U^*U=I$ 时，$U$ 是等距映射，未必满射。

    例如 $\ell^2(\mathbb N_0)$ 上的右移 $S(x_0,x_1,\ldots)=(0,x_0,x_1,\ldots)$ 等距，但没有覆盖第一坐标非零的向量，所以不是酉算子。

## 6. 无穷矩阵与算子拓扑 { #section-6 }

### 6.1 矩阵的每一列存在还不够 { #section-6-1 }

在正交基下，$T$ 的矩阵系数为 $a_{ij}=\langle e_i,Te_j\rangle$。任意无穷矩阵并不自动定义有界算子。准确条件是：对所有有限支撑系数 $x,y$，

$$
\left|\sum_{i,j}\overline{y_i}a_{ij}x_j\right|
\le C\|x\|_2\|y\|_2.
$$

这个有界形式由 Riesz 表示产生唯一的 $T$。其乘积应通过算子复合定义，而不是未经检验交换多重无穷和。例如对角矩阵 $\operatorname{diag}(1,2,3,\ldots)$ 每列都属于 $\ell^2$，却不是有界算子。

### 6.2 三种收敛强度 { #section-6-2 }

!!! definition "范数、强算子、弱算子拓扑"

    对 $T_\alpha,T\in\mathcal B(H,K)$：

    | 名称 | 条件 |
    | --- | --- |
    | 算子范数收敛 | $\|T_\alpha-T\|\to0$ |
    | SOT，强算子收敛 | 对每个 $x$，$\|(T_\alpha-T)x\|\to0$ |
    | WOT，弱算子收敛 | 对每个 $x,y$，$\langle y,(T_\alpha-T)x\rangle\to0$ |

    有范数收敛 $\Rightarrow$ SOT 收敛 $\Rightarrow$ WOT 收敛，反向一般不成立。

!!! example "有限秩截断与移位"

    在 $\ell^2$ 中令 $P_n$ 投影到前 $n$ 个坐标。平方尾和趋于零，所以 $P_n\to I$ 强收敛；但 $\|I-P_n\|=1$，故不在范数下收敛。

    双边移位 $U$ 在 $\ell^2(\mathbb Z)$ 上酉，$U^n\to0$ 弱算子收敛：先检查有限支撑向量，再用统一范数界扩张。它不强趋于零，因为 $\|U^nx\|=\|x\|$。

若 $T_\alpha\to T$、$S_\alpha\to S$ 强收敛，且 $\sup_\alpha\|T_\alpha\|\le M$，则

$$
\|(T_\alpha S_\alpha-TS)x\|
\le M\|(S_\alpha-S)x\|+\|(T_\alpha-T)Sx\|\to0.
$$

故在统一有界条件下，强收敛与乘积相容，进而与多项式演算相容。弱算子收敛一般不能这么乘：$U^n\to0$、$U^{-n}\to0$ 弱收敛，但乘积一直为 $I$。

### 6.3 向量的弱收敛 { #section-6-3 }

$x_n\rightharpoonup x$ 在 Hilbert 空间中等价于对每个 $y$，$\langle y,x_n\rangle\to\langle y,x\rangle$。Bessel 不等式给出 $e_n\rightharpoonup0$，但 $\|e_n\|=1$。

!!! theorem "弱收敛加范数收敛"

    若 $x_n\rightharpoonup x$，则 $\|x\|\le\liminf\|x_n\|$。并且

    $$
    x_n\to x\text{ 强收敛}
    \Longleftrightarrow\|x_n\|\to\|x\|.
    $$

??? proof "证明"

    下半连续性可对 $y=x/\|x\|$ 测试得到。若范数趋于极限范数，则

    $$
    \|x_n-x\|^2=\|x_n\|^2+\|x\|^2-2\operatorname{Re}\langle x,x_n\rangle\to0.
    $$

    反向由范数连续性。对网也成立。

Hilbert 空间闭单位球弱紧：Riesz 表示把它对应到某个对偶闭单位球，应用 Banach–Alaoglu 即可。第九章把这种性质推广到自反 Banach 空间。

## 7. 半双线性形式与正交结构 { #section-7 }

本节的 $V,W$ 可以只是内积空间，$H,K,M$ 表示完备的 Hilbert 空间。内积第一变量共轭线性、第二变量线性；省略共轭符号会改变 Riesz 映射和矩阵的含义。

### 正性决定形式的结构 { #topic-3-1-1 }

从二次型出发，极化恢复交叉项，正性给 Cauchy–Schwarz。零范数向量必须先商掉，剩下的形式才是内积；这一构造以后也用于矩问题和能量空间。

!!! definition "定义 3.1.1：共轭线性映射"

    $T:V\to W$ 共轭线性，指 $T(a\xi+b\eta)=\overline aT\xi+\overline bT\eta$。

!!! definition "定义 3.1.2：半双线性形式"

    $\omega:V\times W\to\mathbb C$ 对第一变量共轭线性、对第二变量线性时称半双线性。定义在 $V\times V$ 时，其二次型为 $q_\omega(\xi)=\omega(\xi,\xi)$。

!!! definition "定义 3.1.4：形式的伴随"

    定义 $\omega^*(\eta,\xi)=\overline{\omega(\xi,\eta)}$，这是 $W\times V$ 上的半双线性形式。

!!! definition "定义 3.1.5：Hermitian 形式"

    形式满足 $\omega^*=\omega$，即 $\omega(\eta,\xi)=\overline{\omega(\xi,\eta)}$ 时称 Hermitian 形式。

!!! theorem "命题 3.1.6：Hermitian 性的二次型判据"

    复半双线性形式是 Hermitian 形式，当且仅当全部 $\omega(\xi,\xi)$ 都为实数。

??? proof "证明 3.1.6"

    若形式 Hermitian，$\omega(\xi,\xi)=\overline{\omega(\xi,\xi)}$，故对角值实。反过来，$\omega$ 与 $\omega^*$ 的二次型相同。一般复半双线性形式满足极化公式

    $$
    \omega(\xi,\eta)=\frac14\sum_{k=0}^3i^kq_\omega(i^k\xi+\eta).
    $$

    直接展开右侧，常数项与反向交叉项相消，只留下 $\omega(\xi,\eta)$。因此二次型决定形式，$\omega=\omega^*$，即得 Hermitian 性。

!!! definition "定义 3.1.7：正形式"

    若全部 $\omega(\xi,\xi)\geq0$，称 $\omega$ 正或半正定，记 $\omega\geq0$。令 $\|\xi\|_\omega=\sqrt{\omega(\xi,\xi)}$；其值为一的向量称单位向量。

!!! definition "定义 3.1.8：形式的序"

    对 Hermitian 形式，$\omega_1\leq\omega_2$ 指每个 $\xi$ 都有 $\omega_1(\xi,\xi)\leq\omega_2(\xi,\xi)$。由极化公式，这是形式空间上的偏序。

!!! theorem "定理 3.1.9：Cauchy–Schwarz 不等式"

    对任意正形式，$|\omega(\xi,\eta)|\leq\|\xi\|_\omega\|\eta\|_\omega$，即使形式退化也成立。

??? proof "证明 3.1.9"

    若 $\omega(\eta,\eta)>0$，对任意 $t\in\mathbb C$ 展开 $0\leq\omega(\xi+t\eta,\xi+t\eta)$，取 $t=-\omega(\eta,\xi)/\omega(\eta,\eta)$，得到

    $$
    0\leq\omega(\xi,\xi)-\frac{|\omega(\xi,\eta)|^2}{\omega(\eta,\eta)}.
    $$

    若 $\omega(\eta,\eta)=0$，展开式成为 $\omega(\xi,\xi)+2\operatorname{Re}(t\omega(\xi,\eta))\geq0$。若交叉项非零，可选择相位并让 $|t|$ 增大使其为负，矛盾。因此交叉项也为零，退化情形同样成立。

!!! theorem "推论 3.1.10：正形式的零空间"

    $\{\xi:\|\xi\|_\omega=0\}=\{\xi:\omega(\xi,\psi)=0\text{ 对全部 }\psi\}$，是线性子空间。

??? proof "证明 3.1.10"

    Cauchy–Schwarz 使 $\|\xi\|_\omega=0$ 时全部 $\omega(\xi,\psi)=0$。反过来取 $\psi=\xi$ 即可。后一个集合是所有共轭线性映射 $\xi\mapsto\omega(\xi,\psi)$ 的核的交，因此是线性子空间。

!!! theorem "推论 3.1.11：正形式给出半范数"

    $\|\cdot\|_\omega$ 满足齐次性和三角不等式，故为半范数。

??? proof "证明 3.1.11"

    齐次性来自 $\omega(a\xi,a\xi)=|a|^2\omega(\xi,\xi)$。三角不等式来自

    $$
    \|\xi+\eta\|_\omega^2
    =\|\xi\|_\omega^2+\|\eta\|_\omega^2+
    2\operatorname{Re}\omega(\xi,\eta)
    \leq(\|\xi\|_\omega+\|\eta\|_\omega)^2.
    $$

    两侧开平方即可；不需要非退化性。

### 内积如何控制算子 { #topic-3-2-1 }

内积中的估计最终要变成范数估计。有界形式的对角值能够控制全部矩阵元，而平行四边形恒等式说明哪些范数确实来自内积。

!!! definition "定义 3.2.1：内积空间"

    非退化正半双线性形式称内积。配备内积的复向量空间称内积空间或预 Hilbert 空间，其范数为 $\sqrt{\langle\xi,\xi\rangle}$。

!!! definition "定义 3.2.7：共轭空间"

    共轭空间 $\overline V$ 的元素记 $\overline\xi$，规定 $a\overline\xi+b\overline\eta=\overline{\overline a\xi+\overline b\eta}$ 和 $\langle\overline\xi,\overline\eta\rangle_{\overline V}=\overline{\langle\xi,\eta\rangle_V}$。自然映射 $V\to\overline V$ 为反酉映射，二次共轭自然识别为 $V$。

!!! definition "定义 3.2.10：有界半双线性形式"

    $\|\omega\|=\sup_{\|\xi\|,\|\eta\|\leq1}|\omega(\xi,\eta)|$；有限时称有界。记其空间为 $\operatorname{Ses}(V\mid W)=\mathcal L(\overline V\times W,\mathbb C)$。

!!! theorem "命题 3.2.12：二次型控制形式"

    若 $|\omega(\xi,\xi)|\leq M\|\xi\|^2$ 对全部 $\xi$ 成立，则 $\|\omega\|\leq4M$。该估计不要求形式 Hermitian。

??? proof "证明 3.2.12"

    对单位球内的 $\xi,\eta$，每个 $\|i^k\xi+\eta\|\leq2$，所以 $|q_\omega(i^k\xi+\eta)|\leq4M$。代入命题 3.1.6 中的极化公式，有 $|\omega(\xi,\eta)|\leq(1/4)\cdot4\cdot4M=4M$。再对两变量的单位球取上确界即得估计。

### 正交展开的有限与无限 { #topic-3-3-1 }

有限正交分解只需代数；无限展开还需要平方可和与完备性。Bessel 不等式先控制系数，Parseval 等式再判断正交族是否穷尽了整个空间。

!!! definition "定义 3.3.1：正交族与标准正交族"

    不同向量两两内积为零时称正交族；再要求每个向量范数为一时称标准正交族。

!!! theorem "命题 3.3.3：勾股恒等式"

    若 $\xi\perp\eta$，则 $\|\xi+\eta\|^2=\|\xi\|^2+\|\eta\|^2$，特别 $\|\xi\|\leq\|\xi+\eta\|$。

??? proof "证明 3.3.3"

    展开 $\langle\xi+\eta,\xi+\eta\rangle$，两个交叉项因正交性为零，所以只剩 $\|\xi\|^2+\|\eta\|^2$。后者不小于 $\|\xi\|^2$，得到附带不等式。

!!! theorem "命题 3.3.5：Gram–Schmidt 的投影步骤"

    若 $e_1,\ldots,e_n$ 标准正交，则 $\xi-\sum_je_j\langle e_j,\xi\rangle$ 与所有 $e_j$ 正交。递归使用并归一化非零余项，得到 Gram–Schmidt 正交化。

??? proof "证明 3.3.5"

    对任意 $k$，$\langle e_k,\xi-\sum_je_j\langle e_j,\xi\rangle\rangle=\langle e_k,\xi\rangle-\langle e_k,\xi\rangle=0$。从给定向量依次减去已取得的正交投影；余项非零时归一化，余项为零时该向量已在已有张成中，略过即可。每一步都保留到当前为止的线性张成。

!!! theorem "推论 3.3.7：Bessel 不等式"

    对标准正交族 $(e_i)_{i\in I}$，$\sum_i|\langle e_i,\xi\rangle|^2\leq\|\xi\|^2$。非零系数的指标至多可数。

??? proof "证明 3.3.7"

    对有限 $F$，投影步骤和勾股恒等式给出

    $$
    \|\xi\|^2=\left\|\xi-\sum_{i\in F}e_i\langle e_i,\xi\rangle\right\|^2+
    \sum_{i\in F}|\langle e_i,\xi\rangle|^2.
    $$

    因此有限和不超过 $\|\xi\|^2$，取上确界就是无序和的 Bessel 不等式。每个集合 $\{i:|\langle e_i,\xi\rangle|\geq1/n\}$ 必有限，否则有限和无界；其可数并包含全部非零系数，故后者至多可数。

!!! definition "定义 3.3.8：正交分解"

    相对于线性子空间 $U$ 的分解为 $\xi=\eta+\psi$，其中 $\eta\in U$、$\psi\perp U$。存在时唯一，$\eta$ 称 $\xi$ 在 $U$ 上的正交投影。

!!! definition "定义 3.3.9：投影算子"

    若每个向量均有上述分解，定义 $P\xi=\eta$。则 $P$ 线性，$\|P\|\leq1$，并称为空间到 $U$ 的正交投影算子。

!!! theorem "命题 3.3.11：最佳逼近"

    正交分解 $\xi=\eta+\psi$ 满足 $\|\xi-\eta\|=\inf_{u\in U}\|\xi-u\|$，且最佳逼近向量唯一。

??? proof "证明 3.3.11"

    对 $u\in U$，$\xi-u=(\eta-u)+\psi$ 的两部分正交，因此 $\|\xi-u\|^2=\|\eta-u\|^2+\|\psi\|^2\geq\|\psi\|^2$。等号当且仅当 $u=\eta$。所以投影是唯一的最佳逼近向量。

!!! definition "定义 3.3.12：有限正交直和"

    $V_1\oplus\cdots\oplus V_n$ 取分量线性运算，内积为 $\sum_j\langle\xi_j,\eta_j\rangle$；各分量自然嵌入且互相正交。

!!! definition "定义 3.3.15：正交补"

    $S^\perp=\{\xi:\langle\xi,s\rangle=0\text{ 对全部 }s\in S\}$，是闭线性子空间。也记 $V\ominus U=U^\perp$。

!!! theorem "命题 3.3.18：投影与直和"

    若存在到 $U$ 的正交投影 $P$，则 $V=U\oplus U^\perp$，$1-P$ 投影到 $U^\perp$，并有 $\operatorname{ran}P=\ker(1-P)=U$、$\ker P=\operatorname{ran}(1-P)=U^\perp$、$U^{\perp\perp}=U$。

??? proof "证明 3.3.18"

    分解的唯一性使 $P$ 线性，并对 $u\in U$ 有 $Pu=u$，对 $\psi\in U^\perp$ 有 $P\psi=0$。于是 $P^2=P$，各核像关系直接成立，$1-P$ 取得正交余项。若 $\xi\in U^{\perp\perp}$，把它写成 $u+\psi$，则 $0=\langle\psi,\xi\rangle=\|\psi\|^2$，故 $\xi=u\in U$；相反包含显然。

!!! theorem "推论 3.3.19：有限维子空间闭"

    内积空间的每个有限维线性子空间均闭。

??? proof "证明 3.3.19"

    给有限维 $U$ 取标准正交基 $e_1,\ldots,e_n$，有限投影公式对整个空间有定义且有界。由命题 3.3.18，$U=\ker(1-P)$，连续映射的核闭，故 $U$ 闭。这个论证不需要整个空间完备。

!!! theorem "推论 3.3.20：投影的正性"

    正交投影满足 $P^2=P$，且 $\langle\xi,P\eta\rangle$ 是正形式，因为 $\langle\xi,P\xi\rangle=\|P\xi\|^2$。

??? proof "证明 3.3.20"

    将 $\xi=P\xi+(1-P)\xi$ 分成正交两项，得到 $\langle\xi,P\xi\rangle=\|P\xi\|^2\geq0$。对任意 $\xi,\eta$ 同样有 $\langle\xi,P\eta\rangle=\langle P\xi,P\eta\rangle$，因此其形式 Hermitian 且正。$P$ 在自身像上恒等，所以 $P^2=P$。

!!! definition "定义 3.3.21：标准正交基"

    标准正交族的线性张成稠密时称标准正交基。这里的基按范数收敛展开，区别于仅允许有限线性组合的 Hamel 基。

!!! theorem "定理 3.3.24：正交展开"

    对标准正交基 $(e_i)$，$\xi=\sum_ie_i\langle e_i,\xi\rangle$，无序有限部分和在范数下收敛。

??? proof "证明 3.3.24"

    给定 $\varepsilon>0$，稠密性让某个有限线性组合 $u=\sum_{i\in F_0}a_ie_i$ 满足 $\|\xi-u\|<\varepsilon$。对任何 $F\supset F_0$，有限投影 $P_F\xi$ 是到该有限维张成的最佳逼近，因此 $\|\xi-P_F\xi\|\leq\|\xi-u\|<\varepsilon$。这直接证明无序有限部分和收敛，不需要先假设整个空间完备。

!!! theorem "推论 3.3.25：Parseval 恒等式"

    $\langle\xi,\eta\rangle=\sum_i\langle\xi,e_i\rangle\langle e_i,\eta\rangle$，特别 $\|\xi\|^2=\sum_i|\langle e_i,\xi\rangle|^2$。

??? proof "证明 3.3.25"

    由正交展开，$P_F\eta\to\eta$。连续性给出 $\langle\xi,\eta\rangle=\lim_F\langle\xi,P_F\eta\rangle=\sum_i\langle\xi,e_i\rangle\langle e_i,\eta\rangle$。Bessel 和 Cauchy–Schwarz 保证该标量和绝对收敛。取 $\eta=\xi$ 得 Parseval。

!!! theorem "推论 3.3.26：坐标等距嵌入"

    若内积空间 $V$ 有标准正交基 $(e_x)_{x\in X}$，则 $\xi\mapsto(\langle e_x,\xi\rangle)_x$ 是到 $\ell^2(X)$ 的线性等距嵌入，像稠密，但 $V$ 不完备时未必满射。

??? proof "证明 3.3.26"

    坐标对第二变量线性，Parseval 保证等距，所以单射。像包含全部有限支集坐标族，它们在 $\ell^2(X)$ 中稠密，故像稠密。若原空间不完备，其等距像未必闭，不能据此宣布满射。

### 完备性与投影 { #topic-3-4-1 }

正交级数的极限及闭子空间的投影都是完备性的表现。投影把一般向量拆成子空间部分与正交误差，随后 Riesz 表示就能把泛函沿这个几何分解恢复成向量。

!!! theorem "定理 3.4.1：Hilbert 空间的等价定义"

    内积空间的以下条件等价：完备；每个标准正交族 $(e_i)$ 与每个平方可和系数族 $(a_i)$ 的无序和 $\sum_i a_ie_i$ 都在空间中收敛；与某个 $\ell^2(X)$ 酉等价。满足这些条件称 Hilbert 空间。

??? proof "证明 3.4.1"

    完备性推出平方可和正交和收敛：两个有限部分和之差的范数平方就是系数尾和，故为 Cauchy 网；完备空间中 Cauchy 网有极限。

    反过来假设全部这类和都存在。用 Zorn 引理取极大标准正交族 $(e_i)$。对任意 $\xi$，Bessel 使其坐标平方可和，假设便产生 $\eta=\sum_ie_i\langle e_i,\xi\rangle$。每个 $\langle e_i,\xi-\eta\rangle=0$；若余项非零，可归一化后加入原正交族，与极大性矛盾。因此余项为零，原族为基。坐标映射等距；又对任意 $\ell^2$ 系数族，假设给出的正交和提供其原像，所以它满射。

    最后 $\ell^2$ 完备，酉同构把 Cauchy 极限传回原空间。这同时证明三种条件等价，且避免预先使用闭子空间投影定理。

!!! theorem "推论 3.4.5：标准正交基的存在"

    每个 Hilbert 空间都有标准正交基；空间可分当且仅当可取至多可数的标准正交基。

??? proof "证明 3.4.5"

    基的存在已在定理 3.4.1 的极大正交族构造中得到。若基可数，有限有理实虚系数组合构成可数稠密集。反过来，标准正交族不同向量的距离为 $\sqrt2$，以它们为中心、半径小于 $\sqrt2/2$ 的球两两不交；可数稠密集必须为每个球提供不同点，因此这族至多可数。

!!! theorem "定理 3.4.6：Hilbert 空间的坐标表示"

    Hilbert 空间的标准正交基给出酉同构 $H\to\ell^2(X)$，$\xi\mapsto(\langle e_x,\xi\rangle)_x$。

??? proof "证明 3.4.6"

    命题 3.3.26 已给出等距且像稠密的坐标映射。Hilbert 完备性使等距像闭：像中 Cauchy 序列对应原空间 Cauchy 序列。闭且稠密的像就是全部 $\ell^2(X)$，故映射酉。

!!! theorem "定理 3.4.7：闭子空间投影定理"

    Hilbert 空间中，每个闭线性子空间 $U$ 均有正交投影，且 $H=U\oplus U^\perp$。

??? proof "证明 3.4.7"

    记 $d=\inf_{u\in U}\|\xi-u\|$，取 $u_n\in U$ 使距离趋于 $d$。平行四边形恒等式给出

    $$
    \|u_n-u_m\|^2
    =2\|\xi-u_n\|^2+2\|\xi-u_m\|^2-
    4\left\|\xi-\frac{u_n+u_m}{2}\right\|^2
    \leq2\|\xi-u_n\|^2+2\|\xi-u_m\|^2-4d^2.
    $$

    右侧趋零，所以 $(u_n)$ Cauchy。完备性给出极限，闭性使极限 $u$ 留在 $U$。对任意 $v\in U$，$\|\xi-u-tv\|^2$ 在 $t=0$ 最小；分别令 $t$ 为实数及纯虚数，得到 $\langle v,\xi-u\rangle=0$。因此最佳逼近产生正交分解，唯一性使这些分解定义投影。

!!! theorem "推论 3.4.8：双正交补"

    Hilbert 空间中，对任意线性子空间 $U$，$U^{\perp\perp}=\overline U$。

??? proof "证明 3.4.8"

    连续性给出 $U^\perp=(\overline U)^\perp$。对闭子空间 $\overline U$ 应用投影定理及命题 3.3.18，即有 $U^{\perp\perp}=(\overline U)^{\perp\perp}=\overline U$。

!!! theorem "推论 3.4.9：稠密性的正交判据"

    Hilbert 空间中的线性子空间 $U$ 稠密当且仅当 $U^\perp=\{0\}$。

??? proof "证明 3.4.9"

    若 $U$ 稠密，任何与它正交的向量也与整个空间正交，取自身测试便为零。反过来，$U^\perp=0$ 时，推论 3.4.8 给出 $\overline U=U^{\perp\perp}=H$。

??? proof "完备性与平方可和展开"

    平方可和正交和的尾部范数平方等于系数的平方和，所以它是 Cauchy 网。反过来，给定 Cauchy 序列，可用 Gram–Schmidt 正交化它所张成的可分子空间；在所有基方向上的系数存在极限，Bessel 不等式给出平方可和性。假设这些正交和都存在，即可恢复序列的范数极限。

    取极大标准正交族。如果它的闭线性张成不等于空间，对闭子空间投影后可得到一个非零正交余项，归一化后便能扩大正交族，矛盾。因此它是基。坐标映射等距且具有稠密像，完备性使像闭，故满射。可分空间的任意标准正交族至多可数，因为不同基向量周围的小球两两不交，必须对应不同的可数稠密点。

## 8. 形式、矩阵和算子拓扑 { #section-8 }

### 从矩阵元恢复算子 { #topic-3-5-1 }

Riesz 表示先恢复一个泛函的代表向量，再逐变量恢复有界形式对应的算子。伴随、乘法和矩阵表达都必须与复内积的反线性变量约定一致。

!!! definition "定义 3.5.1：算子的形式"

    线性 $T:V\to W$ 对应形式 $\omega_T(w,v)=\langle w,Tv\rangle$。

!!! theorem "命题 3.5.2：形式与算子的范数"

    $\|\omega_T\|=\|T\|$，允许二者同时无穷。因此二者同时有界，且 $T\mapsto\omega_T$ 单射。

??? proof "证明 3.5.2"

    Cauchy–Schwarz 给出 $|\langle w,Tv\rangle|\leq\|w\|\|Tv\|$，所以 $\|\omega_T\|\leq\|T\|$。对固定 $v$ 且 $Tv\ne0$，取 $w=Tv/\|Tv\|$，便使配对模等于 $\|Tv\|$；再对单位球内的 $v$ 取上确界，得到反向不等式。有界性可以不预设，以上上确界论证对无穷值仍有效。若形式为零，逐个 $v$ 用 $Tv$ 测试得 $Tv=0$，所以映射单射。

!!! theorem "定理 3.5.3：Riesz–Fréchet 定理及完备性判据"

    内积空间 $W$ 的映射 $\Phi:W\to(\overline W)^*$，$\Phi(\xi)(\overline w)=\langle w,\xi\rangle$，是线性等距嵌入；它满射当且仅当 $W$ 是 Hilbert 空间。等价地，Hilbert 空间上每个线性有界泛函唯一写成 $v\mapsto\langle h,v\rangle$。

??? proof "证明 3.5.3"

    Cauchy–Schwarz 和用自身归一化测试，说明 $\Phi$ 是线性等距嵌入。若 $W$ 完备，取标准正交基 $(e_i)$，对 $\Lambda\in(\overline W)^*$ 令 $b_i=\Lambda(\overline{e_i})$。在有限坐标族上用等号测试，得到 $\sum_i|b_i|^2\leq\|\Lambda\|^2$，所以 $\xi=\sum_ib_ie_i$ 存在。$\Phi(\xi)$ 与 $\Lambda$ 在有限坐标张成上相同，连续性使它们处处相同，故满射。

    反过来，若 $\Phi$ 满射，则 $W$ 与一个连续对偶等距同构；对偶总完备，所以 $W$ 完备。线性泛函的通常版本由共轭变换得到：$\Lambda(v)=\langle h,v\rangle$，其表示向量唯一，且 $\|\Lambda\|=\|h\|$。

!!! definition "定义 3.5.4：Riesz 映射"

    上述 $\Phi$ 称 Riesz 等距映射；Hilbert 空间中称 Riesz 同构。它对应于内积的柯里化。

!!! theorem "定理 3.5.5：有界形式与算子的等价"

    对 Hilbert 空间 $H,K$，$T\mapsto\omega_T$ 给出 $\mathcal L(H,K)\cong\operatorname{Ses}(K\mid H)$ 的线性等距同构。

??? proof "证明 3.5.5"

    对固定 $\xi\in H$，$w\mapsto\omega(w,\xi)$ 为有界共轭线性泛函。$K$ 上的 Riesz 同构唯一给出 $T\xi\in K$，满足 $\langle w,T\xi\rangle=\omega(w,\xi)$。形式对 $\xi$ 的线性及代表向量唯一性使 $T$ 线性；$\|T\xi\|\leq\|\omega\|\|\xi\|$ 使它有界。命题 3.5.2 给出范数相等。反方向由算子取形式，两个构造互逆。

!!! definition "定义 3.5.6：伴随算子"

    $T^*:K\to H$ 由 $\langle\eta,T\xi\rangle=\langle T^*\eta,\xi\rangle$ 唯一确定。它有界且 $\|T^*\|=\|T\|$，对应形式 $\omega_T^*$。

!!! definition "定义 3.5.8：自伴算子"

    有界算子 $T$ 满足 $T=T^*$ 时称自伴；等价于 $\omega_T$ 为 Hermitian 形式。

!!! definition "定义 3.5.9：算子的序与正性"

    自伴 $A\leq B$ 指 $\langle\xi,A\xi\rangle\leq\langle\xi,B\xi\rangle$ 对全部 $\xi$ 成立。正算子指 $A\geq0$；其形式正。

!!! theorem "引理 3.5.12：复合算子的正交展开"

    若 $(e_i)$ 为中间 Hilbert 空间 $K$ 的标准正交基，$S:M\to K$、$T:K\to H$ 有界，则 $TS\xi=\sum_iTe_i\langle e_i,S\xi\rangle$，范数收敛。

??? proof "证明 3.5.12"

    中间空间中 $S\xi=\sum_ie_i\langle e_i,S\xi\rangle$ 范数收敛。有界 $T$ 可与这个极限交换，因此 $TS\xi=\sum_iTe_i\langle e_i,S\xi\rangle$。有界性是把向量展开变成算子复合展开所必需的条件。

!!! definition "定义 3.5.13：形式的复合"

    对 $\omega\in\operatorname{Ses}(H\mid K)$、$\sigma\in\operatorname{Ses}(K\mid M)$，定义 $(\omega\circ\sigma)(\psi,\xi)=\sum_i\omega(\psi,e_i)\sigma(e_i,\xi)$，得到 $\operatorname{Ses}(H\mid M)$ 中的形式。和绝对收敛、与基无关，且 $\omega_{TS}=\omega_T\circ\omega_S$。中间内积空间只要具有标准正交基，也可用同一公式。

!!! theorem "命题 3.5.14：复合范数估计"

    赋范空间间的有界映射满足 $\|TS\|\leq\|T\|\|S\|$；算子复合为范数至多一的双线性映射。

??? proof "证明 3.5.14"

    对任意 $\xi$，$\|TS\xi\|\leq\|T\|\|S\xi\|\leq\|T\|\|S\|\|\xi\|$，取单位球上确界即得结论。逐变量线性来自复合的分配律，该估计使复合双线性映射的范数至多为一。

!!! theorem "推论 3.5.15：代数的范数闭包"

    $\mathcal L(V)$ 中任意子代数的算子范数闭包仍为子代数。

??? proof "证明 3.5.15"

    设 $A_n,B_n$ 位于子代数且范数趋于 $A,B$。收敛序列 $(A_n)$ 有界，故

    $$
    \|A_nB_n-AB\|\leq\|A_n\|\|B_n-B\|+\|A_n-A\|\|B\|\to0.
    $$

    每个 $A_nB_n$ 留在原子代数，所以 $AB$ 留在其闭包。加法及标量乘法同样与范数极限相容，故闭包仍为子代数。

!!! theorem "推论 3.5.16：预解式的 Neumann 展开"

    对 Hilbert 空间上的 $T\in\mathcal L(H)$，若 $|z|>\|T\|$，则 $zI-T$ 有有界逆 $R_T(z)=\sum_{n\geq0}z^{-n-1}T^n$。每个矩阵元 $\langle\eta,R_T(z)\xi\rangle$ 在此区域全纯。

??? proof "证明 3.5.16"

    此处 $T\in\mathcal L(H)$，$H$ 完备。复合范数估计给出 $\|z^{-n-1}T^n\|\leq|z|^{-n-1}\|T\|^n$，右侧几何级数收敛，故算子级数在完备的 $\mathcal L(H)$ 中收敛。

    有限部分和 $S_N$ 满足 $(zI-T)S_N=S_N(zI-T)=I-z^{-N-1}T^{N+1}$。余项范数趋零，取极限得双侧逆。对紧集 $K\subset\{|z|>\|T\|\}$，存在统一几何比率小于一，因此各矩阵元级数在 $K$ 上一致绝对收敛。每项全纯，局部一致极限仍全纯。

### 固定哪些变量来测极限 { #topic-3-6-1 }

WOT 固定两个测试向量，只看矩阵元；SOT 固定输入向量，要求像的范数收敛。下面的判据说明稠密测试何时足够，以及乘法为什么需要额外的统一界。

!!! definition "定义 3.6.1：无限矩阵及其范数"

    $X\times Y$ 矩阵为标量族 $A(x,y)$。定义 $\|A\|$ 为 $|\sum_{x,y}\overline{\xi(x)}A(x,y)\eta(y)|$ 在有限支集 $\xi,\eta$ 且 $\|\xi\|_2,\|\eta\|_2\leq1$ 下的上确界；值有限称有界矩阵。

!!! definition "定义 3.6.2：矩阵表示"

    相对于两侧标准正交基，形式的矩阵为 $[\omega](x,y)=\omega(e_x,e_y)$，算子的矩阵为 $[T](x,y)=\langle e_x,Te_y\rangle$。

!!! theorem "定理 3.6.3：矩阵表示定理"

    有界形式到矩阵的映射单射，像恰为全部有界矩阵，并保持范数。相应矩阵唯一给出 $\ell^2(Y)\to\ell^2(X)$ 的有界算子。

??? proof "证明 3.6.3"

    用坐标酉同构把两空间化为 $\ell^2(X),\ell^2(Y)$。有界形式在有限支集向量上的限制给出矩阵 $A$；矩阵范数正是该限制的范数，稠密延拓保范数，故 $\|A\|=\|\omega\|$。若矩阵为零，则形式在稠密乘积上为零，连续性使它处处为零，得到单射。

    反过来，给定有界矩阵，在有限支集向量上定义 $\omega(\xi,\eta)=\sum_{x,y}\overline{\xi(x)}A(x,y)\eta(y)$。定义中的矩阵范数保证它有界，所以唯一延拓到全部 $\ell^2(X)\times\ell^2(Y)$。延拓的矩阵仍为 $A$，并由 Riesz 同构产生唯一有界算子。

!!! definition "定义 3.6.4：有界矩阵的乘法"

    定义 $(AB)(x,z)=\sum_yA(x,y)B(y,z)$。每个和由行列的 $\ell^2$ 性及 Cauchy–Schwarz 不等式绝对收敛，并与算子复合一致，因此乘法结合且 $\|AB\|\leq\|A\|\|B\|$。

### 弱收敛与范数收敛的距离 { #topic-3-7-1 }

弱收敛只控制内积坐标，范数可以仍有误差。Hilbert 结构允许用“弱收敛加范数收敛”消掉这个误差，并使闭单位球具有弱紧性。

!!! definition "定义 3.7.1：内积诱导的弱拓扑"

    内积空间 $V$ 上，通过 Riesz 等距映射拉回弱-\* 拓扑，得到以所有内积坐标检测的弱拓扑：$\xi_\alpha\rightharpoonup\xi$ 当且仅当全部 $\langle\eta,\xi_\alpha\rangle\to\langle\eta,\xi\rangle$。Hilbert 空间中它等于 $\sigma(V,V^*)$；不完备时须区别这两种定义。

!!! theorem "命题 3.7.3：弱收敛与范数"

    弱收敛时 $\|\xi\|\leq\liminf\|\xi_\alpha\|$。在已有弱收敛的前提下，范数收敛到 $\|\xi\|$ 当且仅当向量在范数下收敛。

??? proof "证明 3.7.3"

    若 $\xi\ne0$，以 $\eta=\xi/\|\xi\|$ 测试弱收敛，得 $\|\xi\|=|\langle\eta,\xi\rangle|\leq\liminf_\alpha\|\xi_\alpha\|$；$\xi=0$ 时直接成立。若范数也趋于 $\|\xi\|$，则

    $$
    \|\xi_\alpha-\xi\|^2=\|\xi_\alpha\|^2+\|\xi\|^2-
    2\operatorname{Re}\langle\xi,\xi_\alpha\rangle\to0.
    $$

    反向由范数连续性。整个论证适用于网，也不依赖完备性。

!!! theorem "定理 3.7.5：Hilbert 球的弱紧性"

    Hilbert 空间的闭单位球弱紧。

??? proof "证明 3.7.5"

    Riesz 同构把 Hilbert 闭单位球等距对应到 $(\overline H)^*$ 的闭单位球。其每个弱-\* 坐标恰为一个内积测试坐标，因此这个对应还是拓扑同构。Banach–Alaoglu 给出对偶球的弱-\* 紧性，拉回就是原球的弱紧性。

!!! definition "定义 3.7.6：SOT 与 WOT"

    强算子拓扑由全部 $T\mapsto Tv$ 的范数坐标诱导；弱算子拓扑由全部 $T\mapsto\langle w,Tv\rangle$ 诱导。形式空间的弱-\* 拓扑为逐对变量的数值收敛，WOT 就是经 $T\mapsto\omega_T$ 的拉回拓扑。

!!! theorem "命题 3.7.10：迭代极限"

    若 $T_\alpha\to T$ 强算子收敛，$\xi_\beta\to\xi$ 范数收敛，则两种迭代极限 $\lim_\alpha\lim_\beta T_\alpha\xi_\beta$ 与 $\lim_\beta\lim_\alpha T_\alpha\xi_\beta$ 均为 $T\xi$。此结论本身不声称乘积网收敛。

??? proof "证明 3.7.10"

    固定 $\alpha$，有界 $T_\alpha$ 使 $\lim_\beta T_\alpha\xi_\beta=T_\alpha\xi$；再取 $\alpha$ 极限得 $T\xi$。固定 $\beta$，强算子收敛给出 $\lim_\alpha T_\alpha\xi_\beta=T\xi_\beta$；有界 $T$ 再给出 $\beta$ 极限。这里先后固定一个指标，尚未使用统一算子范数界，所以只推出两种迭代极限。

!!! theorem "推论 3.7.11：算子复合的迭代极限"

    若 $T_\alpha\to T$ 和 $S_\beta\to S$ 均为 SOT 收敛，则对每个 $u$，两种迭代极限 $T_\alpha S_\beta u$ 均为 $TSu$。

??? proof "证明 3.7.11"

    令 $\xi_\beta=S_\beta u$，则 $\xi_\beta\to Su$。把它代入命题 3.7.10，得到两种迭代极限都为 $TSu$。

!!! theorem "定理 3.7.13：一致有界下的联合极限"

    若再有 $\sup_\alpha\|T_\alpha\|<\infty$，则乘积网 $T_\alpha\xi_\beta\to T\xi$。同一指标时也有 $T_\alpha\xi_\alpha\to T\xi$。

??? proof "证明 3.7.13"

    记 $C=\sup_\alpha\|T_\alpha\|$。直接估计

    $$
    \|T_\alpha\xi_\beta-T\xi\|
    \leq C\|\xi_\beta-\xi\|+\|(T_\alpha-T)\xi\|.
    $$

    两项分别由 $\beta$ 和 $\alpha$ 的尾部控制，因此在乘积有向集上趋零。共用一个指标时，同一指标可以同时超过两个要求的下界，故对角网也收敛。

!!! theorem "推论 3.7.14：多个算子的联合复合"

    若 $T^j_{\alpha_j}:V_{j-1}\to V_j$ 各自 SOT 趋于 $T^j$，且 $j\geq2$ 的族一致有界，则对每个 $\xi$，乘积指标网 $T^k_{\alpha_k}\cdots T^1_{\alpha_1}\xi\to T^k\cdots T^1\xi$。共用指标时对角网也收敛。

??? proof "证明 3.7.14"

    先以第一族的强收敛得到 $T^1_{\alpha_1}\xi\to T^1\xi$。第二族统一有界，定理 3.7.13 给出两族联合复合极限。再将这个乘积网作为新的向量网，与第三族复合，依次归纳便得到全部 $k$ 个因子的联合极限。第一族无需统一范数界，因为它在这里仅作用于固定的 $\xi$。

!!! theorem "推论 3.7.15：多项式保持有界 SOT 极限"

    一致有界且 SOT 趋于 $T$ 的算子网满足 $p(T_\alpha)\to p(T)$ 强算子收敛，对任意复多项式成立。

??? proof "证明 3.7.15"

    对每个固定 $n$，把 $n$ 个同样的一致有界算子族代入推论 3.7.14，并取共同指标的对角网，得到 $T_\alpha^n\xi\to T^n\xi$。有限线性组合可与极限交换，故任意多项式 $p$ 保持强算子收敛。

### 区分正规性与对称性 { #topic-3-8-1 }

有界正规算子包含自伴与酉算子。它的实、虚部交换，为下一章之后的联合谱演算提供代数条件。

!!! definition "定义 3.8.1：Hilbert 完备化"

    内积空间 $V$ 的 Hilbert 完备化是等距线性嵌入 $V\to H$，其中 $H$ 完备且像稠密。可用 Cauchy 序列等价类构造，线性运算与内积取极限定义；任意两个完备化之间有唯一保持原空间的酉同构。


??? proof "联合极限需要的估计"

    $\|T_\alpha\xi_\beta-T\xi\|\leq C\|\xi_\beta-\xi\|+\|(T_\alpha-T)\xi\|$，其中 $C=\sup_\alpha\|T_\alpha\|$。分别令两个指标充分大即得乘积网收敛。迭代极限只固定其中一个指标，所以不需要统一的 $C$。对算子复合逐层应用此估计，即得到多项式的结论。

    有界矩阵乘法中的行和列分别是 $\ell^2$ 向量，故单个乘积系数的和绝对收敛。但三重乘积不宜未经证明任意交换两层和；将矩阵还原为有界算子后，有限部分和在范数下收敛，复合的连续性保证两种迭代计算给出同一结果。

## 9. 练习 { #section-9 }

!!! problem "练习 1：平均值作为正交投影"

    在 $L^2[0,1]$ 中，把 $f$ 投影到常数函数空间。再求在条件 $\int_0^1u=0$ 下离 $f$ 最近的 $u$。

??? proof "解"

    常数函数 $1$ 的范数为 $1$，故 $P f=\langle1,f\rangle1=(\int_0^1f)1$。零均值空间是常数空间的正交补，最佳逼近为 $u=f-\int_0^1f$。

!!! problem "练习 2：像空间为什么需要闭包"

    在 $\ell^2$ 上取 $Tx=(x_n/n)_{n\ge1}$。证明像稠密却不闭，并核对 $(\operatorname{Ran}T)^\perp=\ker T^*$。

??? proof "解"

    像包含所有有限支撑数列，故稠密。$y=(1/n)$ 属于 $\ell^2$，但原像必须是全为 $1$ 的数列，不属于 $\ell^2$，故 $y$ 不在像中。其有限截断属于像且趋于 $y$，所以像不闭。$T=T^*$、核为零，因此像的正交补也为零。

!!! problem "练习 3：强收敛不保证伴随强收敛"

    在 $\ell^2(\mathbb N_0)$ 上取右移 $S$。证明 $(S^*)^n\to0$ 强收敛，而其伴随 $S^n$ 不强趋于零。

??? proof "解"

    $\|(S^*)^nx\|^2$ 是 $x$ 的平方尾和，趋于零。但 $\|S^nx\|=\|x\|$。伴随在 WOT 下保持收敛，在 SOT 下则需额外条件。

接下来，我们会用正形式构造 Hilbert 空间，再把乘以变量的映射解释为一个算子，使矩问题进入谱理论。

[返回目录](index.md){ .md-button }
