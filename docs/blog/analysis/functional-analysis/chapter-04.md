---
title: 第四章：多项式矩问题与谱理论的起源
date: 2026-10-04
description: 从矩的正性构造 Hilbert 空间与乘法算子，通过有限维谱分解得到正交多项式、Padé 逼近和连分式。
hide:
  - navigation
categories:
  - 分析
  - 泛函分析
tags:
  - analysis
  - functional-analysis
  - moment-problem
  - spectral-theory
  - course
---

# 第四章：多项式矩问题与谱理论的起源 { #chapter-04 }

## 1. 从一串数到一个测度 { #section-1 }

给定实数 $c_0,c_1,\ldots$，我们希望寻找正测度 $\mu$，使

$$
c_n=\int_Ix^n\,\mathrm{d}\mu(x).
$$

所有矩都要求绝对可积。根据 $I$ 分别为 $\mathbb R$、$[0,\infty)$、$[0,1]$，称 Hamburger、Stieltjes、Hausdorff 矩问题。

为什么要问这样的问题？例如形式级数

$$
\frac{c_0}{z}+\frac{c_1}{z^2}+\frac{c_2}{z^3}+\cdots
$$

可能发散，但若存在 $\mu$，它仍可能是函数

$$
F(z)=\int_I\frac{\mathrm{d}\mu(x)}{z-x}
$$

的渐近信息。我们可以用有限个矩构造有理函数，再通过极限恢复 $F$。这使矩问题、逼近与谱分解联系起来。

!!! warning "形式展开不等于收敛展开"

    若 $\mu$ 支撑在 $[-R,R]$，则 $|z|>R$ 时可将 $1/(z-x)$ 展成一致收敛的几何级数，得到真正的 Laurent 展开。

    无界支撑情形不能保证存在这样的收敛区域。有限阶渐近展开需要估计余项，不能把“所有矩存在”理解为“矩级数收敛”。

## 2. 正性为什么是核心条件 { #section-2 }

令 $\Lambda(x^n)=c_n$，在多项式上定义

$$
\langle p,q\rangle=\Lambda(\overline p q).
$$

若 $\Lambda$ 来自正测度，那么

$$
\Lambda(|p|^2)=\int|p|^2\,\mathrm{d}\mu\ge0.
$$

这给出 Hankel 矩阵

$$
H=(c_{i+j})_{i,j\ge0},\qquad H_1=(c_{i+j+1})_{i,j\ge0}.
$$

无穷矩阵半正定的含义是所有有限支撑向量的二次型非负。不能只检查一个有限截断。

!!! theorem "三个矩问题的可解条件"

    对实矩序列，存在具有全部给定矩的有限正 Borel 测度，当且仅当满足下表条件。

    | 支撑区间 | 条件 |
    | --- | --- |
    | $\mathbb R$ | $H\ge0$ |
    | $[0,\infty)$ | $H\ge0$ 且 $H_1\ge0$ |
    | $[0,1]$ | $H\ge0$，$H_1\ge0$，$H-H_1\ge0$ |

    第一行控制 $\int|p|^2$，第二行增加 $\int x|p|^2$，第三行再增加 $\int(1-x)|p|^2$。下面给出充分性的构造。

若 $c_0=0$，Cauchy–Schwarz 给出 $|c_n|^2\le c_0c_{2n}=0$，所有矩为零，对应零测度。以下设 $c_0>0$，必要时除以 $c_0$ 归一化。

## 3. 从正形式构造乘法算子 { #section-3 }

令 $N=\{p:\Lambda(|p|^2)=0\}$，在 $V=\mathbb C[x]/N$ 上使用上述内积。设 $\Omega=[1]$，定义

$$
T[p]=[xp].
$$

!!! note "为什么这个定义不依赖代表元"

    若 $p\in N$，正形式的 Cauchy–Schwarz 给出 $\langle p,q\rangle=0$ 对所有多项式 $q$ 成立。取 $q=x^2p$，得

    $$
    \|[xp]\|^2=\Lambda(x^2|p|^2)=\langle p,x^2p\rangle=0.
    $$

    所以乘以 $x$ 保持零空间，$T$ 良定义。并且 $\langle Tp,q\rangle=\langle p,Tq\rangle$，故 $T$ 对称。

我们已经得到

$$
c_n=\langle\Omega,T^n\Omega\rangle.
$$

这就是一个简单的 GNS 构造：正泛函产生内积空间，代数元素通过乘法作用为空间上的算子。这里 $V$ 暂时只含多项式类，并不假定 $T$ 已是一个有界或自伴算子。

若 $H$ 不正定，存在非零多项式 $p\in N$。$N$ 对乘以 $x$ 封闭，因此商空间由次数低于 $\deg p$ 的多项式张成，是有限维的。有限维 $T$ 可对角化，直接给出有限原子测度。若 $H$ 正定，则所有非零多项式都有正范数，继续进行有限维截断。

## 4. 有限维谱分解怎样解矩问题 { #section-4 }

令

$$
V_n=\operatorname{span}\{\Omega,T\Omega,\ldots,T^n\Omega\},
\qquad T_n=P_nT|_{V_n},
$$

其中 $P_n$ 是到 $V_n$ 的正交投影。$T_n$ 是有限维自伴算子。设 $T_ne_{n,j}=\lambda_{n,j}e_{n,j}$，定义

$$
\mu_n=\sum_j|\langle e_{n,j},\Omega\rangle|^2\delta_{\lambda_{n,j}}.
$$

于是 $\mu_n(I)=c_0$。若 $H_1\ge0$，$T_n\ge0$，所以节点非负；若同时 $H-H_1\ge0$，则 $0\le T_n\le I$，所以节点位于 $[0,1]$。谱节点的范围由正性决定。

!!! theorem "前 $2n+1$ 阶矩精确匹配"

    对 $0\le k\le2n+1$，

    $$
    \int x^k\,\mathrm{d}\mu_n
    =\langle\Omega,T_n^k\Omega\rangle=c_k.
    $$

??? proof "证明"

    对 $j\le n$，归纳得 $T_n^j\Omega=T^j\Omega$，而 $T_n^{n+1}\Omega=P_nT^{n+1}\Omega$。

    将 $k=a+b$，其中 $a\le n$、$b\le n+1$。利用对称性和投影关系，

    $$
    \langle\Omega,T_n^{a+b}\Omega\rangle
    =\langle T^a\Omega,P_nT^b\Omega\rangle
    =\langle T^a\Omega,T^b\Omega\rangle=c_{a+b}.
    $$

    有限维谱分解给出等式中的积分表达。因此一个 $n+1$ 维截断能精确匹配比维数多得多的矩，这也是 Gaussian 求积高阶精度的来源。

!!! theorem "有限原子测度的极限给出全部矩"

    在上述条件下，$\mu_n$ 有一个子列趋于正测度 $\mu$，且 $\int x^k\,\mathrm{d}\mu=c_k$ 对全部 $k$ 成立。

??? proof "证明：为什么不能只说弱收敛就完成了"

    在 $[0,1]$ 上，Helly 选择给出弱-\* 收敛子列，每个 $x^k$ 都是连续有界测试函数，所以矩直接通过极限。这就证明 Hausdorff 情形。

    在无界区间上，先用 $C_0(I)^*$ 的弱-\* 紧性取得子列；这里 $C_0(I)$ 可分。对充分大的 $n$，$\int x^2\,\mathrm{d}\mu_n=c_2$，因此

    $$
    \mu_n(\{|x|>R\})\le c_2/R^2.
    $$

    此估计防止质量逃逸，保证极限总质量仍为 $c_0$。对于任意 $k$，选偶数 $2m>k$。当 $n$ 充分大时，$2m$ 阶矩已精确匹配，因此

    $$
    \int_{|x|>R}|x|^k\,\mathrm{d}\mu_n
    \le R^{k-2m}c_{2m}.
    $$

    对非负紧支撑截断取极限，也得到极限测度的同样高阶矩上界。先在 $[-R,R]$ 上以连续截断函数测试，再令 $R\to\infty$，便能令第 $k$ 阶矩通过极限。极限保持原闭支撑区间，从而证明 Hamburger 与 Stieltjes 情形。

    关键是高阶矩控制尾部。单独的弱-\* 收敛不能测试无界函数 $x^k$。

在紧区间上解唯一：多项式稠密，使所有连续函数的积分都由矩确定，再用 Riesz 表示的唯一性。无界区间上可能不唯一，第九章会讨论不定矩问题。

## 5. 正交多项式与 Jacobi 矩阵 { #section-5 }

设 $c_0=1$，$H$ 正定。对 $1,x,x^2,\ldots$ 作 Gram–Schmidt，取首项系数为正，得到实系数正交多项式 $p_n$，且 $p_0=1$。

!!! theorem "三项递推"

    存在 $b_n\in\mathbb R$、$a_n>0$，使

    $$
    xp_n=a_np_{n+1}+b_np_n+a_{n-1}p_{n-1},
    \qquad p_{-1}=0.
    $$

??? proof "证明"

    $xp_n$ 次数为 $n+1$，因此只需在 $p_0,\ldots,p_{n+1}$ 中展开。若 $j\le n-2$，则

    $$
    \langle p_j,xp_n\rangle=\langle xp_j,p_n\rangle=0,
    $$

    因为 $xp_j$ 次数至多 $n-1$。对称性使上下对角系数相同，对角系数为实数；比较首项系数给出 $a_n>0$。

因此 $T$ 在 $p_n$ 基下成为三对角 Jacobi 矩阵

$$
J=\begin{pmatrix}
b_0&a_0&0&\cdots\\
a_0&b_1&a_1&\cdots\\
0&a_1&b_2&\ddots\\
\vdots&\vdots&\ddots&\ddots
\end{pmatrix}.
$$

这并不表示任意 Jacobi 矩阵在 $\ell^2$ 上都已自伴：若系数无界，首先只有有限支撑上的对称算子，定义域与自伴扩张属于第六章的问题。

## 6. Padé 逼近与连分式 { #section-6 }

定义有限维预解式的标量值

$$
F_n(z)=\langle\Omega,(zI-T_n)^{-1}\Omega\rangle
=\int\frac{\mathrm{d}\mu_n(x)}{z-x}.
$$

它是有理函数，分母可取 $\det(zI-J_n)$，其中 $J_n$ 是前 $n+1$ 阶截断。递推说明此行列式是 $p_{n+1}$ 的首一化版本，所以零点真实且与谱节点相同。

当 $|z|$ 大于有限矩阵的范数时，

$$
F_n(z)=\sum_{k=0}^\infty\frac{\langle\Omega,T_n^k\Omega\rangle}{z^{k+1}}
=\sum_{k=0}^{2n+1}\frac{c_k}{z^{k+1}}+O(z^{-2n-3}).
$$

故 $F_n$ 是在无穷远处匹配有限阶系数的 Padé 逼近。此处的 $O$ 是对固定 $n$ 讨论 $z\to\infty$，不能当作对所有 $n$ 统一的估计。

!!! theorem "Jacobi 矩阵产生连分式"

    对 $c_0=1$，$F_n$ 等于截断连分式

    $$
    F_n(z)=\cfrac1{z-b_0-\cfrac{a_0^2}{z-b_1-\cfrac{a_1^2}{\ddots-\cfrac{a_{n-1}^2}{z-b_n}}}}.
    $$

??? proof "证明"

    将 $zI-J_n$ 按首坐标与余下坐标分块：

    $$
    zI-J_n=\begin{pmatrix}z-b_0&-a_0e_1^*\\-a_0e_1&B\end{pmatrix}.
    $$

    解该分块方程或使用 Schur 补，逆矩阵的左上角为 $[z-b_0-a_0^2\langle e_1,B^{-1}e_1\rangle]^{-1}$。再对尾部矩阵重复操作，得到连分式。先在所有逆存在的区域证明，随后由有理函数恒等性扩张。

沿测度的收敛子列，$F_{n_j}\to F(z)=\int(z-x)^{-1}\,\mathrm{d}\mu(x)$，在 $\mathbb C\setminus I$ 的紧子集上局部一致。原因是积分核及其 $z$ 导数都有由 $\operatorname{dist}(z,I)$ 控制的统一界。紧区间上矩解唯一，因此整个序列收敛；非紧区间上这里先保证子列。

我们至此看到同一个对象的四种表达：有限原子测度、有限维自伴矩阵、正交多项式、有理连分式。它们之间的转换来自同一套矩数据。

## 7. 再看 Riesz 表示定理 { #section-7 }

若 $\Lambda$ 是 $C[0,1]$ 上的正泛函，取 $c_n=\Lambda(x^n)$。三个正矩阵条件自动成立，于是构造出 $\mu$。多项式上的表示成立，再由正泛函估计

$$
|\Lambda(f)|\le\Lambda(1)\|f\|_\infty
$$

和多项式一致稠密性，得到 $\Lambda(f)=\int f\,\mathrm{d}\mu$ 对全部连续 $f$ 成立。

这条证明说明：Riesz 表示也可以由有限维谱分解与极限产生；它并不是谱理论之外的一块孤立工具。

## 8. 矩问题与有限维压缩的精确表述 { #section-8 }

约定 $I$ 为 $\mathbb R$、$[0,\infty)$ 或 $[0,1]$，矩序列 $(c_n)_{n\geq0}$ 为实数。$\mathcal R_r(I)$ 表示有界非负单调右连续函数，在 $I=\mathbb R$ 时另要求 $\rho(-\infty)=0$；它们对应有限正 Borel 测度。

### 有限维的谱分解作为起点 { #topic-4-1-1 }

矩问题的有限逼近需要先掌握 Hermitian 矩阵如何对角化。这里用二次型极值构造特征方向，随后把它用于有限维的乘法压缩。

!!! definition "定义 4.1.1：Stieltjes 变换"

    有限正测度 $\mu$ 的 Stieltjes 变换为 $F_\mu(z)=\int_I(z-x)^{-1}\,d\mu(x)$，定义在 $\mathbb C\setminus I$。若 $\mu=d\rho$，也称 $\rho$ 的 Stieltjes 变换。它在此区域全纯。

??? proof "证明 4.1.1"

    对紧集 $K\subset\mathbb C\setminus I$，令 $d=\operatorname{dist}(K,I)>0$。积分核的模至多为 $d^{-1}$，其任意阶 $z$ 导数的模至多为 $k!d^{-k-1}$。有限测度使这些统一控制函数可积，所以可以在积分下逐阶求导，得到全纯性。特别地 $F_\mu'(z)=-\int_I(z-x)^{-2}\,d\mu(x)$。

### 正矩阵产生测度 { #topic-4-2-2 }

给定矩先确定多项式上的泛函；平方多项式的积分非负，因此 Hankel 正性是必要条件。商去零空间得到乘法算子后，有限压缩产生原子测度，紧性与高阶矩尾部估计再恢复全部矩。

!!! definition "定义 4.2.2：可测函数的 Stieltjes 积分"

    对 $\rho\in\mathcal R_r(I)$ 的代表测度 $\mu_\rho$，定义 $\int_I f\,d\rho=\int_I f\,d\mu_\rho$，适用于非负 Borel 函数或绝对可积实、复 Borel 函数。

!!! definition "定义 4.2.4：无限矩阵的正性"

    矩阵 $H=(H(m,n))_{m,n\geq0}$ 对应多项式上的半双线性形式 $\langle x^m,x^n\rangle=H(m,n)$。形式 Hermitian、半正定或正定时，矩阵分别称 Hermitian、正或正定。截断 $H_n$ 为前 $n+1$ 行列；半正定等价于每个截断半正定。

!!! definition "定义 4.2.6：Hankel 矩阵"

    令 $H(m,n)=c_{m+n}$、$H'(m,n)=c_{m+n+1}$。定义 $\Lambda(x^n)=c_n$，则 $\langle f,g\rangle=\Lambda(\overline f g)$，而 $H'$ 和 $H-H'$ 分别对应 $\langle f,xg\rangle$ 和 $\langle f,(1-x)g\rangle$。

!!! theorem "命题 4.2.8：解的必要条件"

    若 $c_n=\int x^n\,d\rho$ 对全部 $n$ 成立，则 $H\geq0$。$H$ 正定当且仅当代表测度的支集无限，亦即累积函数的值域无限。$I=[0,\infty)$ 时还须 $H'\geq0$；$I=[0,1]$ 时还须 $H'\geq0$ 和 $H-H'\geq0$。

??? proof "证明 4.2.8"

    对多项式 $p$，$\Lambda(|p|^2)=\int|p|^2\,d\mu\geq0$，所以 $H\geq0$。若支集无限，非零多项式只有有限个零点，不可能在整个支集上为零；连续性及支集定义使其平方积分严格为正。若支集有限，以这些支集点为零点的非零多项式平方积分为零，故不正定。

    在半轴上 $\int x|p|^2\,d\mu\geq0$，在 $[0,1]$ 上还可用 $\int(1-x)|p|^2\,d\mu\geq0$，分别得到 $H'$、$H-H'$ 的必要正性。有限支集与累积函数只有有限多级等价，因此也得到值域表述。

!!! theorem "定理 4.2.9：三个矩问题的充要条件"

    Hamburger 矩问题可解当且仅当 $H\geq0$；Stieltjes 矩问题可解当且仅当 $H,H'\geq0$；Hausdorff 矩问题可解当且仅当 $H,H',H-H'\geq0$。解须使全部 $|x|^n$ 可积。紧区间情形解唯一；另两种情形可能不唯一。

??? proof "证明 4.2.9"

    必要性由命题 4.2.8 给出。充分性按三个步骤构造：先由 $H$ 取正形式、除去零空间，得到带循环向量 $\Omega$ 的对称乘法算子；再把它压缩到 $V_n$，有限维谱定理产生 $\mu_n$；最后用 Helly 选择与高阶矩尾部估计取得 $\mu$。这三个步骤分别在定理 4.2.10、命题 4.2.17、定理 4.2.19 中证明。

    半轴条件使每个压缩 $T_n\geq0$，所以原子都在 $[0,\infty)$；紧区间条件使 $0\leq T_n\leq I$，所以原子都在 $[0,1]$。非紧情形借助偶数高阶矩控制尾部，保证每个 $|x|^m$ 可积且保留给定矩。紧区间上多项式一致稠密，两个解若全部矩相同，对全部连续函数的积分相同，测度表示的唯一性使它们相同。

!!! theorem "定理 4.2.10：乘法算子的良定义性"

    若 $H\geq0$，令 $\mathcal N=\{f:\Lambda(|f|^2)=0\}$、$V=\mathbb C[x]/\mathcal N$。则 $T(f+\mathcal N)=xf+\mathcal N$ 唯一确定一个线性算子，且 $\langle\xi,T\eta\rangle=\langle T\xi,\eta\rangle$。其关键是 $\mathcal N$ 对乘以 $x$ 封闭。

??? proof "证明 4.2.10"

    若 $\|f\|^2=\Lambda(|f|^2)=0$，正形式的 Cauchy–Schwarz 给出 $\langle f,g\rangle=0$ 对全部多项式 $g$ 成立。取 $g=x^2f$，则

    $$
    \|xf\|^2=\Lambda(x^2|f|^2)=\langle f,x^2f\rangle=0.
    $$

    因此 $x\mathcal N\subset\mathcal N$，乘以 $x$ 与代表元选择无关。又因 $x$ 实值，$\Lambda(\overline f\,xg)=\Lambda(\overline{xf}\,g)$，得到商空间上的对称性。商内积的非退化性已由除去零空间保证。

!!! definition "定义 4.2.13：循环子空间与投影"

    令 $\Omega=1+\mathcal N$，$V_n=\operatorname{span}\{\Omega,T\Omega,\ldots,T^n\Omega\}$，$E_n$ 为到 $V_n$ 的正交投影。则 $\Omega\in V_0$、$TV_n\subset V_{n+1}$，$\langle\Omega,T^m\Omega\rangle=c_m$。

!!! definition "定义 4.2.15：压缩矩"

    定义 $c_{n,m}=\langle\Omega,(E_nTE_n)^m\Omega\rangle$。$T_n=E_nTE_n|_{V_n}$ 自伴，且 $c_{n,m}=c_m$ 对 $0\leq m\leq2n+1$ 成立。

??? proof "证明 4.2.15"

    由 $T^j\Omega\in V_j$，归纳得 $T_n^j\Omega=T^j\Omega$ 对 $j\leq n$ 成立。若 $m=r+s\leq2n$ 且 $r,s\leq n$，对称性给出

    $$
    \langle\Omega,T_n^m\Omega\rangle
    =\langle T_n^r\Omega,T_n^s\Omega\rangle
    =\langle T^r\Omega,T^s\Omega\rangle=c_m.
    $$

    最后一阶 $m=2n+1$ 使用 $\langle T_n^n\Omega,T_nT_n^n\Omega\rangle$。两侧向量都在 $V_n$ 中，夹在中间的 $E_n$ 可从内积中去掉，所得正是 $\langle T^n\Omega,TT^n\Omega\rangle=c_{2n+1}$。这解释了压缩为什么匹配到 $2n+1$ 阶，而不只匹配到 $n$ 阶。

!!! theorem "命题 4.2.17：有限原子代表"

    在相应矩阵正性条件下，每个 $n$ 有 $\rho_n\in\mathcal R_r(I)$，其值域为 $[0,c_0]$ 的有限子集，满足 $c_{n,m}=\int_Ix^m\,d\rho_n$ 对全部 $m$ 成立。它由 $T_n$ 的特征值和 $\Omega$ 在对应特征空间投影的范数平方给出。

??? proof "证明 4.2.17"

    在有限维 $V_n$ 上写 $T_n=\sum_j\lambda_jP_j$，令 $\mu_n=\sum_j\|P_j\Omega\|^2\delta_{\lambda_j}$。则 $\int x^m\,d\mu_n=\sum_j\lambda_j^m\|P_j\Omega\|^2=\langle\Omega,T_n^m\Omega\rangle$，总质量为 $\|\Omega\|^2=c_0$。

    若 $H'\geq0$，压缩二次型非负，所以 $\lambda_j\geq0$；若再有 $H-H'\geq0$，则 $T_n\leq I$，所以 $\lambda_j\leq1$。因此支集位于相应 $I$。取累积函数 $\rho_n(x)=\mu_n(I\cap(-\infty,x])$，它只有有限多个级值，右连续且满足所有所需积分式。

!!! definition "定义 4.2.18：极限累积函数"

    对上述一致有界的 $\rho_n$，取 Helly 子列 $\rho_{n_k}$ 逐点趋于 $\widetilde\rho$。在非负半轴或紧区间取其右连续正规化；在全实轴先减去 $\widetilde\rho(-\infty)$ 再正规化，得到 $\rho\in\mathcal R_r(I)$，并有 $d\rho_{n_k}\to d\rho$ 对 $C_c(I)$ 测试弱-\* 收敛。

!!! theorem "定理 4.2.19：压缩极限保留全部矩"

    在各区间相应正性条件下，上述 $\rho$ 满足 $c_m=\int_Ix^m\,d\rho$ 对全部 $m$ 成立，且这些积分绝对可积。

??? proof "证明 4.2.19"

    紧区间上 $x^m$ 是连续合法测试，直接由弱-\* 收敛和矩匹配取得结论。非紧情形要先证明尾部不会破坏极限。选择偶数 $2r>m$。对充分大的 $n$，矩匹配给出 $\int |x|^{2r}\,d\mu_n=c_{2r}$，因此

    $$
    \int_{|x|>R}|x|^m\,d\mu_n\leq R^{m-2r}c_{2r}.
    $$

    对连续紧支撑截断 $\beta_R\uparrow1$，弱-\* 收敛给出 $\int\beta_R|x|^{2r}\,d\mu\leq c_{2r}$；单调收敛使 $\int|x|^{2r}\,d\mu\leq c_{2r}$，于是同一个尾界对 $\mu$ 也成立。

    现在 $\beta_Rx^m$ 的积分可以直接取极限，删掉截断的误差由上述两侧尾界控制。先取子列极限，再令 $R\to\infty$，得到 $\int x^m\,d\mu=c_m$ 及绝对可积性。$m=0$ 的同一论证保留总质量，排除质量逃到无穷远。

!!! theorem "定理 4.2.20：Padé 逼近"

    $F_n(z)=\int(z-x)^{-1}\,d\rho_n$ 为有理函数，在充分大的 $|z|$ 下展开为 $\sum_{m=0}^{2n+1}c_mz^{-m-1}+O(z^{-2n-3})$。所选子列 $F_{n_k}$ 在 $\mathbb C\setminus I$ 上局部一致趋于 $F(z)=\int(z-x)^{-1}\,d\rho$，即匹配前 $2n+2$ 个 Laurent 系数的 Padé 逼近。

??? proof "证明 4.2.20"

    $\mu_n$ 支集有限，所以 $F_n$ 是有限个 $(z-\lambda_j)^{-1}$ 的正权和。对大于全部支集点模的 $|z|$ 展开几何级数，得到 $F_n(z)=\sum_{m\geq0}c_{n,m}z^{-m-1}$。由矩匹配，前 $2n+2$ 个系数就是 $c_m$，得到所述 Laurent 展开。

    对 $z\notin I$，函数 $g_z(x)=(z-x)^{-1}$ 属于 $C_0(I)$，且 $z\mapsto g_z$ 在一致范数下连续，例如邻近 $z,w$ 时 $\|g_z-g_w\|_\infty\leq|z-w|/(\operatorname{dist}(z,I)\operatorname{dist}(w,I))$。因此紧参数集 $K$ 的像 $\{g_z:z\in K\}$ 在 $C_0(I)$ 中紧。测度泛函有统一范数界且逐点收敛，定理 4.2.21 把它升级为这个紧集上的一致收敛，即 $F_{n_k}\to F$ 局部一致。

!!! theorem "定理 4.2.21：紧集上的一致收敛"

    赋范空间间的一致有界线性算子网 $T_\alpha$ 若逐点趋于有界 $T$，则在每个相对紧子集 $K$ 上一致收敛：$\sup_{\xi\in K}\|(T_\alpha-T)\xi\|\to0$。

??? proof "证明 4.2.21"

    设统一界为 $C$，取 $K$ 的有限 $\delta$ 网 $\xi_1,\ldots,\xi_N$。对任意 $\xi\in K$，选择 $\|\xi-\xi_j\|<\delta$，则

    $$
    \|(T_\alpha-T)\xi\|
    \leq(C+\|T\|)\delta+\max_j\|(T_\alpha-T)\xi_j\|.
    $$

    有限多个逐点极限可由同一个指标控制。先把 $\delta$ 选得小，再让指标充分大，就得到一致收敛。相对紧集的闭包紧，所以同一论证适用。

??? proof "零空间、矩匹配和无穷远尾部"

    若 $f\in\mathcal N$，正形式的 Cauchy–Schwarz 不等式给出 $\langle f,x^2f\rangle=0$。由于 $\|xf\|^2=\langle f,x^2f\rangle$，$xf\in\mathcal N$，乘法算子因而良定义。$T$ 的对称性来自多项式乘法交换。

    对 $m\leq2n$，将 $m=r+s$，$r,s\leq n$，利用 $T_n^j\Omega=T^j\Omega$（$j\leq n$），得到压缩矩相等。对 $m=2n+1$，用 $\langle T^n\Omega,T T^n\Omega\rangle$ 和投影的作用处理。

    弱-\* 收敛只直接控制紧支集函数；$x^m$ 无界时必须截断。选择偶数 $2r>m$，在 $|x|>R$ 上有 $|x|^m\leq R^{m-2r}|x|^{2r}$。充分大的压缩序号精确匹配 $2r$ 阶矩，故尾部积分一致趋于零。紧支集部分取极限后再令 $R\to\infty$，得到全部矩匹配。二阶矩同时防止总质量逃到无穷远。

## 9. 正交多项式、Jacobi 矩阵与连分数 { #section-9 }

以下无限阶正交多项式讨论假设 $H$ 正定；Jacobi 对应和归一化递推采用 $c_0=1$。若 $H$ 退化，则多项式商空间有限维，相应构造在有限阶终止。

### 让乘法算子只有三条对角线 { #topic-4-3-1 }

对单项式作 Gram–Schmidt 后，乘以坐标只能连接相邻次数，因而得到 Jacobi 三对角矩阵。递推关系、特征多项式与求积节点便来自同一个算子。

!!! theorem "命题 4.3.1：预解式表示"

    对充分大的 $|z|$，$F_n(z)=\langle\Omega,(zI-T_n)^{-1}\Omega\rangle$；实际上该式在 $\mathbb C\setminus\sigma(T_n)$ 均成立。

??? proof "证明 4.3.1"

    在 $T_n$ 的有限谱分解中，$(zI-T_n)^{-1}=\sum_j(z-\lambda_j)^{-1}P_j$。用 $\Omega$ 配对，得到 $\sum_j\|P_j\Omega\|^2/(z-\lambda_j)$，恰为 $\mu_n$ 的 Stieltjes 变换。这直接对全部非谱参数成立；大参数区域的级数展开只是同一等式的另一种表达。

!!! definition "定义 4.3.2：正交多项式"

    多项式族 $(p_n)$ 满足 $\deg p_n=n$，并在 Hankel 内积下两两正交时称正交多项式；各自范数为一时称标准正交多项式。固定最高次系数为正；最高次系数为一称首一多项式。

!!! theorem "定理 4.3.5：特征多项式的正交性"

    $\widetilde p_0=1$、$\widetilde p_{n+1}(z)=\det(zI-T_n)$ 给出唯一的首一正交多项式族。

??? proof "证明 4.3.5"

    令 $D_{n+1}(z)=\det(zI-T_n)$。它首一，次数为 $n+1$。对 $0\leq k\leq n$，多项式 $x^kD_{n+1}(x)$ 次数至多为 $2n+1$，矩匹配与 Cayley–Hamilton 给出

    $$
    \Lambda(x^kD_{n+1})=
    \langle\Omega,T_n^kD_{n+1}(T_n)\Omega\rangle=0.
    $$

    所以它与所有次数至多 $n$ 的多项式正交。两个满足同样条件的首一多项式之差次数至多为 $n$，又与该有限维空间正交；内积正定使差为零，故唯一。

!!! theorem "推论 4.3.6：Hankel 行列式公式"

    令 $\Delta_n=\det(c_{i+j})_{0\leq i,j\leq n}>0$，则 $\widetilde p_{n+1}(z)=\Delta_n^{-1}\det\begin{pmatrix}c_0&c_1&\cdots&c_{n+1}\\c_1&c_2&\cdots&c_{n+2}\\\vdots&\vdots&&\vdots\\c_n&c_{n+1}&\cdots&c_{2n+1}\\1&z&\cdots&z^{n+1}\end{pmatrix}$。除以 $\Delta_n$ 是保证首一的必要归一化。

??? proof "证明 4.3.6"

    按最后一行展开行列式，得到次数 $n+1$ 的多项式；最高次项系数为 $\Delta_n$，所以除以它后首一。将最后一行的 $1,z,\ldots,z^{n+1}$ 与 $x^k$ 配对，就是用 $c_k,c_{k+1},\ldots,c_{k+n+1}$ 替换最后一行。$k\leq n$ 时这与前面的某一行相同，行列式为零。于是所得首一多项式与低阶空间正交，定理 4.3.5 的唯一性确定公式。

!!! definition "定义 4.3.7：Jacobi 矩阵"

    给定实数 $b_n$ 和正数 $a_n$，定义三对角矩阵 $J$：$J_{n,n}=b_n$、$J_{n,n+1}=J_{n+1,n}=a_n$，其余为零。移去首行首列的 $J^+$ 对应序列 $(a_{n+1})$、$(b_{n+1})$。

!!! theorem "定理 4.3.8：矩与 Jacobi 参数的一一对应"

    $c_0=1$ 且 Hankel 矩阵正定的实矩序列，与任意 $a_n>0,b_n\in\mathbb R$ 的参数族一一对应。正向映射把乘法算子写成标准正交多项式基下的 Jacobi 矩阵；反向为 $c_n=(J^n)_{0,0}$，每个幂的该系数只涉及有限多项。

??? proof "证明 4.3.8"

    对标准正交多项式 $p_n$，$xp_n$ 次数为 $n+1$；若 $j\leq n-2$，则 $\langle p_j,xp_n\rangle=\langle xp_j,p_n\rangle=0$。因此展开只有 $p_{n-1},p_n,p_{n+1}$ 三项。对称性使两侧相邻系数相同且 $b_n$ 实；最高次系数均选正，使 $a_n>0$。这取得 Jacobi 参数，Gram–Schmidt 的唯一性使它们由矩确定。

    反过来，给定参数，在有限支集数列上定义对称三对角 $J$，令 $c_m=\langle e_0,J^me_0\rangle$。每个计算只经过有限个坐标，所以不存在无界级数的定义问题。对应 Hankel 形式为 $\langle p(J)e_0,q(J)e_0\rangle$。次数为 $n$ 的非零 $p$ 在 $p(J)e_0$ 的第 $n$ 个坐标有非零值，故形式正定。递推使所构造 $p_n(J)e_0=e_n$，所以反向构造恢复原参数；$c_0=1$ 也自动成立。

!!! theorem "推论 4.3.10：最高次系数"

    标准正交多项式 $p_n$ 的最高次系数为 $(a_0\cdots a_{n-1})^{-1}$，$n=0$ 时空乘积为一。

??? proof "证明 4.3.10"

    记 $p_n$ 的最高次系数为 $\kappa_n>0$。比较 $xp_n=a_np_{n+1}+b_np_n+a_{n-1}p_{n-1}$ 的最高次项，得到 $\kappa_n=a_n\kappa_{n+1}$。由 $\kappa_0=1$ 递推得 $\kappa_n=(a_0\cdots a_{n-1})^{-1}$。

!!! theorem "推论 4.3.11：递推与有限行列式"

    设 $p_{-1}=0,p_0=1$，$xp_n=a_np_{n+1}+b_np_n+a_{n-1}p_{n-1}$（首项中 $a_{-1}p_{-1}=0$）。则 $a_0\cdots a_n p_{n+1}(z)=\det(zI-J_{[0,n]})$，其中截断矩阵大小为 $n+1$。

??? proof "证明 4.3.11"

    标准正交基 $p_0,\ldots,p_n$ 中，$T_n$ 的矩阵正是 $J_{[0,n]}$。定理 4.3.5 给出其特征行列式为首一正交多项式，再由最高次系数公式把 $p_{n+1}$ 变成首一，得到 $(a_0\cdots a_n)p_{n+1}=\det(zI-J_{[0,n]})$。也可按三对角行列式的末行展开验证：两侧满足同一个两步递推和相同初值。

!!! theorem "定理 4.3.12：第二类多项式与 Padé 商"

    令 $p_n$ 满足上述递推，$q_{-1}=0,q_0=1/a_0$，并满足 $xq_n=a_{n+1}q_{n+1}+b_{n+1}q_n+a_nq_{n-1}$。则 $F_n(z)=q_n(z)/p_{n+1}(z)$。

??? proof "证明 4.3.12"

    Cramer 法则把 $(zI-J_{[0,n]})^{-1}$ 的左上角写成

    $$
    F_n(z)=\frac{\det(zI-J_{[1,n]})}{\det(zI-J_{[0,n]})}.
    $$

    分母由推论 4.3.11 为 $(a_0\cdots a_n)p_{n+1}$。对尾部 Jacobi 参数 $(a_{n+1}),(b_{n+1})$，多项式 $a_0q_n$ 满足标准正交递推及初值一，所以分子为 $(a_1\cdots a_n)a_0q_n$。公因子相消即得商；$n=0$ 时空行列式为一，同样正确。

### 预解式、Padé 与连分式 { #topic-4-4-1 }

取 Jacobi 矩阵预解式的首个矩阵元，既得到有限原子测度的 Stieltjes 变换，也得到逐层 Schur 补的连分式。这使矩匹配转成有理函数逼近。

!!! theorem "定理 4.4.1：Jacobi 连分数"

    $F_n(z)=\cfrac{1}{z-b_0-\cfrac{a_0^2}{z-b_1-\cfrac{a_1^2}{\ddots-\cfrac{a_{n-1}^2}{z-b_n}}}}$。这些有限连分数是无限 Jacobi 连分数的逐阶逼近；$n=0$ 时取 $1/(z-b_0)$。

??? proof "证明 4.4.1"

    先给出分块证明。按首坐标与尾部写 $zI-J_{[0,n]}$，其 Schur 补给出

    $$
    F_n(z)=\bigl(z-b_0-a_0^2F^+_{n-1}(z)\bigr)^{-1}.
    $$

    尾部使用移位的 Jacobi 参数，重复此式并以最后的 $(z-b_n)^{-1}$ 终止，便得到有限连分数。先在各逆存在的区域计算，两侧为有理函数，所以等式延伸到共同定义域。

    还可直接从三项递推验证。令 $P_{n+1}=(a_0\cdots a_n)p_{n+1}$、$Q_n=(a_0\cdots a_n)q_n$，则

    $$
    P_{n+1}=(z-b_n)P_n-a_{n-1}^2P_{n-1},\qquad
    Q_n=(z-b_n)Q_{n-1}-a_{n-1}^2Q_{n-2}.
    $$

    初值为 $P_0=1,P_1=z-b_0,Q_{-1}=0,Q_0=1$。有限连分数的分母、分子逐层通分后也满足这两个递推，因此其第 $n$ 个收敛子等于 $Q_n/P_{n+1}=q_n/p_{n+1}$。

### 在稠密代数上保留正性 { #topic-4-5-1 }

正性比单纯有界性多提供了序结构。含常数且一致稠密的函数代数上，正泛函的范数由常数值控制，因此可唯一延拓到连续函数，再得到代表测度。

!!! theorem "命题 4.5.1：正泛函自动有界"

    若 $A$ 是 $\ell^\infty(X,\mathbb F)$ 的含幺星子代数，$\Lambda$ 对点态非负函数为正，则 $\|\Lambda\|\leq\Lambda(1)$；包含单位元且 $\|1\|=1$ 时实际取等号。

??? proof "证明 4.5.1"

    实值 $f$ 满足 $-\|f\|_\infty1\leq f\leq\|f\|_\infty1$，正性给出 $|\Lambda(f)|\leq\Lambda(1)\|f\|_\infty$。复值时选择单位相位 $z$ 使 $z\Lambda(f)=|\Lambda(f)|$，将实值结论应用于 $\operatorname{Re}(zf)$；正泛函对实值元素取实值，故 $\Lambda(\operatorname{Re}(zf))=|\Lambda(f)|$。于是仍有同一界。最后取 $f=1$ 给出反向范数界，得到等号。

!!! theorem "定理 4.5.2：正泛函的连续延拓"

    令 $\overline A$ 为上述代数的一致闭包，并假设其中每个非负 $f$ 可写成 $g^*g$，$g\in\overline A$。限制映射给出 $\overline A$ 与 $A$ 上正线性泛函锥之间的一一对应，保持非负标量线性组合和范数。延拓由一致范数连续性唯一确定。

??? proof "证明 4.5.2"

    命题 4.5.1 使 $A$ 上正泛函有界，所以稠密延拓定理给出唯一保范数延拓 $\overline\Lambda$。要检查其正性，不能只把一个非负元素任意一致逼近。对 $f\in\overline A$、$f\geq0$，按假设写 $f=g^*g$，取 $g_n\in A$ 一致趋于 $g$。则 $g_n^*g_n\to f$ 一致，且每个 $\Lambda(g_n^*g_n)\geq0$，故 $\overline\Lambda(f)\geq0$。

    限制与延拓互逆，唯一性也使非负线性组合与延拓交换，范数由延拓定理保留。

!!! theorem "定理 4.5.3：紧区间的正泛函表示"

    紧区间 $I$ 上的正线性泛函恰为 $f\mapsto\int_I f\,d\rho$，其中 $\rho:I\to[0,\infty)$ 有界单调。可选右连续代表；其代表测度唯一。

??? proof "证明 4.5.3"

    经仿射变换只需考虑 $I=[0,1]$。令 $c_n=\Lambda(x^n)$；正性使 $\Lambda(|p|^2)$、$\Lambda(x|p|^2)$、$\Lambda((1-x)|p|^2)$ 都非负。因此 Hausdorff 矩问题的三个矩阵条件成立，定理 4.2.9 产生正测度 $\mu$，使多项式上的积分等于 $\Lambda$。

    正泛函自动有界，多项式在 $C([0,1])$ 中一致稠密，所以等式唯一延拓到全部连续函数。测度的累积函数给出 Stieltjes 写法，右连续代表保留全部积分。反向的积分泛函显然正，唯一性来自连续测试函数确定有限正则测度。

??? proof "三项递推、Padé 商与连分数"

    $xp_n$ 与 $p_0,\ldots,p_{n-2}$ 正交，因为 $\langle p_j,xp_n\rangle=\langle xp_j,p_n\rangle=0$。因此只能含 $p_{n-1},p_n,p_{n+1}$ 三项；最高次系数为正保证 $a_n>0$。这同时给出 Jacobi 对应和最高次系数公式。

    有限三对角矩阵的特征行列式按末行展开，满足相同的三项递推；其首一性确定它就是首一正交多项式。Cramer 法则将预解式的 $(0,0)$ 元写成删去首行首列的行列式与整个行列式之比，经最高次系数归一化即得 $q_n/p_{n+1}$。也可对首行首列作 Schur 补：$(z-b_0-a_0^2F^+_{n-1}(z))^{-1}$，逐层重复得到连分数。

    对正泛函，$-\|f\|1\leq f\leq\|f\|1$ 先给出实函数估计；复函数转动相位后对实部应用估计。连续延拓对 $g^*g$ 保持非负，再由平方根条件得到全部非负元素上的正性。

## 10. 练习 { #section-10 }

!!! problem "练习 1：最初两个矩的限制"

    设 $c_0=1$。证明 $c_2\ge c_1^2$，并说明等号成立时测度是什么。

??? proof "解"

    $\begin{pmatrix}1&c_1\\c_1&c_2\end{pmatrix}\ge0$ 给出不等式。等号时 $\int(x-c_1)^2\,\mathrm{d}\mu=0$，所以测度只能支撑在 $c_1$，即 $\mu=\delta_{c_1}$。

!!! problem "练习 2：一个两点谱的连分式"

    对 $\mu=\tfrac12\delta_{-1}+\tfrac12\delta_1$，计算 $F(z)$，并找出对应的有限 Jacobi 矩阵。

??? proof "解"

    $p_0=1$、$p_1=x$，乘以 $x$ 在此二维空间的矩阵为 $\begin{pmatrix}0&1\\1&0\end{pmatrix}$。于是

    $$
    F(z)=\frac12\left(\frac1{z+1}+\frac1{z-1}\right)
    =\frac z{z^2-1}=\frac1{z-1/z}.
    $$

!!! problem "练习 3：弱收敛不能控制无界矩"

    令 $\mu_n=(1-1/n)\delta_0+(1/n)\delta_n$。求其弱极限及一阶矩。

??? proof "解"

    对有界连续 $f$，$\int f\,\mathrm{d}\mu_n\to f(0)$，故极限为 $\delta_0$。但一阶矩始终为 $1$，极限的一阶矩为零。尾部质量虽小，位置却远，因而无界测试函数仍能感受到它。

第五章会将每个向量对应的标量测度，组织为统一的投影值测度。

[返回目录](index.md){ .md-button }
