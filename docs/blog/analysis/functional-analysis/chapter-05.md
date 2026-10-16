---
title: 第五章：有界自伴与正规算子的谱理论
date: 2026-10-04
description: 从有限维截断建立连续函数演算，用循环子空间证明谱定理，并理解投影值测度、Borel 演算与平均遍历定理。
hide:
  - navigation
categories:
  - 分析
  - 泛函分析
tags:
  - analysis
  - functional-analysis
  - spectral-theory
  - operator-theory
  - course
---

# 第五章：有界自伴与正规算子的谱理论 { #chapter-05 }

## 1. 为什么对角化要变成积分 { #section-1 }

有限维自伴矩阵有 $T=\sum_j\lambda_jP_j$。但在 $L^2[0,1]$ 上，乘法算子

$$
(Tf)(x)=xf(x)
$$

没有非零特征向量：$Tf=\lambda f$ 要求 $f$ 只支撑在单点 $\{\lambda\}$，而该集合的 Lebesgue 测度为零。

因此，谱理论不能只寻找特征向量。更合适的问题是：能否把算子化为“乘以一个函数”？这个模型允许连续谱，并把对角求和自然推广为谱积分。

## 2. 谱与预解式 { #section-2 }

!!! definition "谱"

    对 $T\in\mathcal B(H)$，预解集与谱分别是

    $$
    \rho(T)=\{z\in\mathbb C:zI-T\text{ 有有界双侧逆}\},
    \qquad\sigma(T)=\mathbb C\setminus\rho(T).
    $$

    写 $R(z,T)=(zI-T)^{-1}$。全篇预解式采用 $zI-T$ 的符号，因此预解恒等式为

    $$
    R(z,T)-R(w,T)=(w-z)R(z,T)R(w,T).
    $$

!!! theorem "Neumann 级数与自伴算子的实谱"

    若 $|z|>\|T\|$，则

    $$
    R(z,T)=\sum_{n=0}^\infty z^{-n-1}T^n.
    $$

    若 $T=T^*$，则 $\sigma(T)\subset[-\|T\|,\|T\|]$，并且对非实 $z$，$\|R(z,T)\|\le1/|\operatorname{Im}z|$。

??? proof "证明"

    当 $\|T/z\|<1$ 时，几何级数在算子范数下收敛，乘以 $I-T/z$ 后望远镜相消，得到双侧逆。这同时证明预解集是开集。

    对自伴 $T$，$\langle x,Tx\rangle$ 为实数，故

    $$
    \|(T-zI)x\|\|x\|
    \ge|\operatorname{Im}\langle x,(T-zI)x\rangle|
    =|\operatorname{Im}z|\|x\|^2.
    $$

    这给出单射、像闭和逆的估计。像的正交补是 $\ker(T-\overline zI)=0$，所以像又稠密，因而等于 $H$。非实 $z$ 都属于预解集。

实谱中的点仍可能不是特征值。对自伴算子有一个有用刻画：$\lambda\in\sigma(T)$ 当且仅当存在单位向量 $x_n$ 使 $\|(T-\lambda I)x_n\|\to0$。若没有这种近似特征向量，算子有严格下界，像闭且核为零；自伴性又使像稠密，于是可逆。

## 3. 从多项式到连续函数演算 { #section-3 }

设 $T=T^*$，$r\ge\|T\|$，$K=[-r,r]$。多项式演算已经有意义：$p(T)=\sum_ka_kT^k$。关键是得到一个由函数值控制的估计。

!!! theorem "多项式的一致估计"

    $$
    \|p(T)\|\le\max_{t\in K}|p(t)|.
    $$

??? proof "证明：有限维截断与强收敛"

    取 Hilbert 正交基，令 $P_F$ 投影到有限个基向量张成的空间，并令 $T_F=P_FTP_F$，视为全空间上的算子。$T_F\to T$ 强收敛，且 $\|T_F\|\le r$。

    $T_F$ 在 $P_FH$ 上是有限维自伴矩阵，在正交补上为零。有限维谱定理给出 $\|p(T_F)\|\le\max_K|p|$，正交补上则取值 $p(0)$，也满足同一界。

    第三章的乘积估计保证 $p(T_F)x\to p(T)x$。对每个 $x$ 取极限，即得 $\|p(T)x\|\le\max_K|p|\|x\|$。

由多项式一致稠密性，对于 $f\in C(K)$，任取 $p_n\to f$ 一致，定义

$$
f(T)=\lim_np_n(T).
$$

估计保证极限存在且与选择无关。得到含幺的 $*$-同态

$$
\pi:C(K)\to\mathcal B(H),\qquad
(fg)(T)=f(T)g(T),\quad\overline f(T)=f(T)^*.
$$

若 $f\ge0$，对连续函数 $\sqrt f$ 演算，便有 $f(T)=\sqrt f(T)^*\sqrt f(T)\ge0$。注意正性来自平方根，而不是从“把变量代成算子”的形式记号自动得到。

## 4. 用循环子空间证明谱定理 { #section-4 }

### 4.1 每个向量先得到一个标量测度 { #section-4-1 }

对 $v\in H$，定义正泛函

$$
\Lambda_v(f)=\langle v,f(T)v\rangle.
$$

Riesz–Markov 定理给出唯一正测度 $\mu_v$，使

$$
\langle v,f(T)v\rangle=\int_Kf(t)\,\mathrm{d}\mu_v(t),
\qquad\mu_v(K)=\|v\|^2.
$$

若取 $f(t)=(z-t)^{-1}$，便得到

$$
\langle v,R(z,T)v\rangle
=\int_K\frac{\mathrm{d}\mu_v(t)}{z-t}.
$$

这是 Hilbert 谱定理的标量预解式形态。第四章由有限谱逼近产生这种测度；这里由连续函数演算产生它。不完备内积空间上的有界 Hermitian 形式也有相应版本：先将形式连续扩张到 Hilbert 完备化，再建立标量表示。

### 4.2 循环模型 { #section-4-2 }

!!! definition "循环子空间与约化子空间"

    $H_v=\overline{\{p(T)v:p\text{ 是多项式}\}}$ 称由 $v$ 生成的循环子空间。它在 $T$ 下不变，自伴性又使 $H_v^\perp$ 不变，因此称约化子空间。

!!! theorem "循环谱模型"

    存在酉映射 $W_v:L^2(K,\mu_v)\to H_v$，使

    $$
    W_vf=f(T)v\quad(f\in C(K)),
    \qquad W_vM_t=TW_v,
    $$

    其中 $M_t$ 表示乘以坐标函数 $t$。

??? proof "证明"

    对连续 $f$，

    $$
    \|f(T)v\|^2
    =\langle v,|f|^2(T)v\rangle
    =\int|f|^2\,\mathrm{d}\mu_v.
    $$

    因此该映射在 $L^2$ 等价类上良定义且等距。连续函数在有限 Radon 测度的 $L^2$ 中稠密，所以它唯一扩张到整个 $L^2$。像包含多项式循环向量，且等距像闭，故像等于 $H_v$。

    对连续 $f$，$T f(T)v=(tf)(T)v$。有界性与稠密性将该关系扩张到全部 $L^2$。

### 4.3 全空间上的谱定理 { #section-4-3 }

!!! theorem "有界自伴算子的乘法模型"

    每个有界自伴算子都酉等价于一族 $L^2$ 空间的 Hilbert 直和上逐块乘以实坐标的算子：

    $$
    H\simeq\bigoplus_{\alpha}L^2(K,\mu_\alpha),
    \qquad T\simeq\bigoplus_\alpha M_t.
    $$

??? proof "证明"

    选取极大的两两正交循环约化子空间族 $(H_\alpha)$。其正交和的补空间仍在 $T$ 下约化。若补空间非零，其中任意非零向量又生成一个非零循环约化子空间，违反极大性。

    因此它们的正交和就是 $H$。逐块使用上一条定理即可。一般情形的极大家族用 Zorn 引理构造；可分空间可以逐次取一列稠密向量尚未覆盖的分量。

这里“每块乘以 $t$”并不意味着谱没有重数：不同块可能具有相同的谱区间。循环模型的分块并非唯一，抽象函数演算与谱测度却是唯一的。

## 5. 从连续演算到 Borel 演算 { #section-5 }

### 5.1 谱投影如何出现 { #section-5-1 }

在乘法模型中，对 Borel 集 $B\subset K$，乘以 $\mathbf1_B$ 是正交投影。搬回 $H$，记作 $E(B)$。

!!! definition "投影值测度，PVM"

    $E$ 满足 $E(\varnothing)=0$、$E(K)=I$、$E(B)^*=E(B)=E(B)^2$，并且

    $$
    E(B)E(C)=E(B\cap C).
    $$

    对两两不交的 $B_n$，有

    $$
    E\left(\bigcup_nB_n\right)x=\sum_nE(B_n)x
    $$

    在向量范数下收敛，即强算子意义的可数可加性。一般并非算子范数可加。

对任意有界 Borel 函数，定义 $f(T)$ 为各块的 $M_f$，或写成

$$
f(T)=\int_Kf(t)\,\mathrm{d}E(t).
$$

它保留乘积、共轭和单位元。简单函数的积分是 $\sum_jc_jE(B_j)$，一般有界 Borel 函数可用简单函数一致逼近。并且

$$
\|f(T)x\|^2=\int_K|f|^2\,\mathrm{d}\mu_x,
\qquad\mu_x(B)=\langle x,E(B)x\rangle.
$$

!!! note "为什么演算与分块无关"

    对每个 $x$，连续函数上的 $\Lambda_x$ 已唯一决定 $\mu_x$，因此所有 $\langle x,E(B)x\rangle$ 唯一。极化公式恢复全部 $\langle y,E(B)x\rangle$，所以 $E(B)$ 唯一。简单函数逼近再保证全部有界 Borel 演算唯一。

### 5.2 单调扩张的意义 { #section-5-2 }

若 $f_n\to f$ 逐点且有共同的有界上界，则控制收敛给出

$$
\|(f_n(T)-f(T))x\|^2
=\int|f_n-f|^2\,\mathrm{d}\mu_x\to0.
$$

特别地，有界递增函数列产生强算子收敛。这种保持单调极限的表示称为正常表示。它使连续演算能够延伸到示性函数，再延伸到 Borel 函数。可测函数是经过这种扩张得到的，不能假定都能由连续函数一致逼近。

!!! warning "Borel 函数的范数是谱测度意义的本质上界"

    总有 $\|f(T)\|\le\sup|f|$，准确等式是 $\|f(T)\|=\operatorname*{ess\,sup}_{E}|f|$。这里忽略的集合满足 $E(B)=0$。

    对 $L^2[0,1]$ 上的 $M_t$，$f=\mathbf1_{\mathbb Q\cap[0,1]}$ 逐点上确界为 $1$，却有 $f(T)=0$。连续函数在谱支撑上则有普通最大值的范数等式。

### 5.3 Riesz 的谱族版本 { #section-5-3 }

令 $E_\lambda=E(( -\infty,\lambda])$，则它递增且右连续于 SOT。右连续性来自测度对递减集合的连续性：

$$
\|(E_{\lambda_n}-E_\lambda)x\|^2
=\mu_x((\lambda,\lambda_n])\to0
\quad(\lambda_n\downarrow\lambda).
$$

连续 $f$ 的谱积分可由分割求和 $\sum_jf(\xi_j)E(I_j)$ 得到，误差至多为 $f$ 的连续模。区间必须构成完整的不交分割，包括最左端点的原子。最后得到 $T=\int\lambda\,\mathrm{d}E_\lambda$。

谱定理的四种表述由此联系起来：标量预解式、投影谱族、Borel 函数演算、乘法模型。

## 6. 谱支撑、函数演算与应用 { #section-6 }

### 6.1 谱支撑等于谱 { #section-6-1 }

定义谱测度的支撑为所有 $\lambda$，使每个含 $\lambda$ 的开区间 $U$ 都有 $E(U)\ne0$。

若 $\lambda$ 不在支撑上，可以在实际支撑上对 $t-\lambda$ 取有界倒数，得到 $T-\lambda I$ 的逆。若 $\lambda$ 在支撑上，从 $E((\lambda-\varepsilon,\lambda+\varepsilon))H$ 取单位向量 $x_\varepsilon$，便有

$$
\|(T-\lambda I)x_\varepsilon\|\le\varepsilon.
$$

所以它不可能有有界逆。由此谱支撑正是 $\sigma(T)$。

对连续 $f$，

$$
\|f(T)\|=\max_{\sigma(T)}|f|,
\qquad\sigma(f(T))=f(\sigma(T)).
$$

范数下界通过 $|f|$ 接近最大值的谱投影取得；谱映射则通过倒数演算与近似特征向量证明。对一般 Borel 函数，不能不加修改地使用右边的逐点像集。

!!! example "平方根与方程的稳定性"

    若 $T\ge0$，则 $T^{1/2}=\int\sqrt\lambda\,\mathrm{d}E$ 是唯一的正平方根。若 $T\ge\alpha I$、$\alpha>0$，则 $T^{-1}$ 有界且 $\|T^{-1}\|\le1/\alpha$。

    因而 $Tu=f$ 的解满足 $\|u\|\le\|f\|/\alpha$。这就是谱的下界怎样产生稳定估计。

### 6.2 正规算子与联合谱 { #section-6-2 }

若 $T$ 正规，令 $A=(T+T^*)/2$、$B=(T-T^*)/(2i)$，则 $A,B$ 自伴且可交换。有限族彼此及彼此伴随均可交换的有界正规算子，具有联合投影值测度；在乘法模型下，它们同时变为乘以各坐标。

!!! theorem "有界正规算子的谱定理"

    正规 $T$ 存在定义在 $\sigma(T)\subset\mathbb C$ 上的唯一谱测度 $E$，使

    $$
    T=\int z\,\mathrm{d}E(z),\qquad T^*=\int\overline z\,\mathrm{d}E(z).
    $$

??? proof "从可交换自伴算子到联合测度"

    若有界算子 $S$ 同时与自伴 $A$ 可交换，则先与 $p(A)$、$f(A)$ 可交换。用有界连续函数逼近半直线示性函数，再取 SOT 极限，得到 $S$ 与 $A$ 的谱投影可交换；其余 Borel 集由单调类扩张。

    因而 $A,B$ 的谱投影彼此可交换。在矩形上定义 $E(I\times J)=E_A(I)E_B(J)$，这是正交投影。对每个向量取二次型得到矩形上的正可加函数，经测度扩张成为二维 Borel 测度；极化恢复算子值，正交性保证强可数可加。这给出联合 PVM。

    坐标演算恢复 $A,B$，把 $(a,b)$ 映到 $a+ib$ 就得到 $T$ 的谱测度。谱支撑与谱相等的证明与自伴情形相同，使用小圆盘上的近似特征向量。

    同样的矩形构造可逐次用于有限个可交换自伴算子；复数情况下对实部、虚部联合处理。这里要求“与伴随也可交换”，以保证各个实部与虚部能进行联合演算。

联合谱是使每个邻域投影非零的点集。对连续函数的联合演算与单算子类似。酉算子的谱位于单位圆：在乘法模型中 $U^*U=UU^*=I$ 等价于坐标的模为 $1$ 几乎处处。

## 7. 平均遍历定理 { #section-7 }

反复作用酉算子可能永不收敛，例如旋转。但平均可能消掉非固定方向。

!!! theorem "von Neumann 平均遍历定理：等距算子版本"

    若 $U^*U=I$，$P$ 是到 $\ker(I-U)$ 的正交投影，则

    $$
    A_N=\frac1N\sum_{k=0}^{N-1}U^k\longrightarrow P
    \quad\text{于 SOT}.
    $$

??? proof "证明：固定方向与望远镜相消"

    对 $Ux=x$，显然 $A_Nx=x$。若 $x=(I-U)y$，则

    $$
    A_Nx=\frac{y-U^Ny}{N}\to0.
    $$

    而 $\|A_N\|\le1$，所以此收敛扩张到 $\overline{\operatorname{Ran}(I-U)}$。

    这个像空间的正交补为 $\ker(I-U^*)$。对等距 $U$，若 $U^*x=x$，则 $\|Ux-x\|^2=2\|x\|^2-2\operatorname{Re}\langle x,Ux\rangle=0$；反向也成立。因此两固定空间相同，正交分解完成证明。

    若 $U$ 酉，也可在谱模型中用 $N^{-1}\sum_{k=0}^{N-1}z^k\to\mathbf1_{\{1\}}(z)$，再用有界控制收敛。此时 $P=E(\{1\})$。

## 8. 投影、正常表示与函数演算 { #section-8 }

记 $\operatorname{Bor}_b(X)$ 为有界 Borel 函数的含幺星代数，星运算为逐点复共轭。正常性在这里指保持递增序列的极限；一般不可数网需要另加条件。

### 先获得标量谱信息 { #topic-5-1-1 }

对固定向量，算子的矩阵元可以先写成一个标量测度的积分。把所有向量的标量信息组合成一致的算子表示，需要接下来的投影和极化构造。

!!! theorem "定理 5.1.1：有界 Hermitian 形式的谱表示"

    设 $V$ 可分内积空间，$\omega$ 为有界 Hermitian 形式，$\|\omega\|\leq r$。对每个 $\xi\in V$，存在 $[-r,r]$ 上非负单调函数 $\rho_\xi$，使 $|z|>r$ 时 $(z-\omega)^{-1}(\xi,\xi)=\int_{[-r,r]}(z-\lambda)^{-1}\,d\rho_\xi(\lambda)$。形式的预解式定义为延拓到 Hilbert 完备化后对应算子的预解式形式再限制到 $V$；总质量为 $\|\xi\|^2$。

??? proof "证明 5.1.1"

    把 $V$ 完备化为 $H$，有界形式唯一延拓为 $\langle\xi,T\eta\rangle$，其中 $T=T^*$、$\|T\|\leq r$。先看循环子空间：向量 $\xi$ 产生矩 $s_n=\langle\xi,T^n\xi\rangle$，正性来自 $\langle\xi,|p|^2(T)\xi\rangle=\|p(T)\xi\|^2\geq0$；第四章的矩定理给出 $[-r,r]$ 上测度 $\mu_\xi$。令 $\rho_\xi(\lambda)=\mu_\xi([-r,\lambda])$，质量为 $s_0=\|\xi\|^2$。当 $|z|>r$，Neumann 级数及一致收敛给出

    $$
    \langle\xi,(z-T)^{-1}\xi\rangle
    =\sum_{n=0}^{\infty}\frac{s_n}{z^{n+1}}
    =\int\frac{d\mu_\xi(\lambda)}{z-\lambda}.
    $$

    这里使用第四章的矩构造即可，无须先假设本章的谱定理。

### 用投影表示子空间 { #topic-5-2-1 }

投影把“属于某个闭子空间”写成算子等式。其序、正交和单调极限正好对应子空间的包含、正交和闭张成，因而适合表示越来越细的谱区间。

!!! definition "定义 5.2.1：正交投影的代数定义"

    内积空间上的有界 $P$ 称正交投影，若 $P^2=P$ 且 $\langle\xi,P\eta\rangle=\langle P\xi,\eta\rangle$。$P^\perp=1-P$ 也是投影；Hilbert 空间中条件等价于 $P=P^*$。

!!! theorem "定理 5.2.3：投影与闭子空间"

    Hilbert 空间的投影与闭线性子空间一一对应，映射为 $P\mapsto\operatorname{ran}P$，逆映射为正交投影。每个 $\xi-P\xi$ 都与像空间正交。

??? proof "证明 5.2.3"

    $P^2=P$ 使 $\operatorname{ran}P=\ker(1-P)$ 闭。若 $\eta=P\zeta$，则 $\langle\eta,\xi-P\xi\rangle=\langle\zeta,P(1-P)\xi\rangle=0$，所以 $P$ 正是像空间的正交投影。反之，闭子空间 $M$ 的正交分解 $H=M\oplus M^\perp$ 给出 $P(m+n)=m$，直接满足 $P^2=P=P^*$。分解唯一，故对应也唯一。

!!! theorem "定理 5.2.4：投影的序"

    投影 $P,Q$ 的以下条件等价：$\operatorname{ran}P\subset\operatorname{ran}Q$；$QP=P$；$PQ=P$；$P\leq Q$；对全部 $\xi$，$\|P\xi\|\leq\|Q\xi\|$。

??? proof "证明 5.2.4"

    像包含等价于 $QP=P$；取伴随得到 $PQ=P$。此时 $Q\xi=P\xi+(Q-P)\xi$ 是正交和，故 $\|Q\xi\|^2-\|P\xi\|^2\geq0$；这也等于 $\langle\xi,(Q-P)\xi\rangle$。反之，若范数不等式成立，对 $\xi\in\ker Q$ 有 $P\xi=0$，于是 $\ker Q\subset\ker P$，取正交补即得像包含。上述等式说明正算子序和范数比较等价。

!!! theorem "推论 5.2.5：正交投影的正交性"

    $\operatorname{ran}P\perp\operatorname{ran}Q$、$QP=0$、$PQ=0$、$P+Q\leq1$ 等价；此时 $P+Q$ 投影到两像空间的正交直和。

??? proof "证明 5.2.5"

    像空间正交等价于 $QP=0$，取伴随等价于 $PQ=0$。这时 $(P+Q)^2=P+Q$，且 $P+Q\leq1$。反之 $P+Q\leq1$ 意味 $P\leq1-Q$，由 5.2.4 得 $\operatorname{ran}P\subset\ker Q$。其像恰是两个像空间的正交直和。

!!! theorem "推论 5.2.6：投影的差"

    若 $P\leq Q$，则 $Q-P$ 是投影，像为 $\operatorname{ran}Q\cap(\operatorname{ran}P)^\perp$。

??? proof "证明 5.2.6"

    由 $PQ=QP=P$ 算出 $(Q-P)^2=Q-P$，且它自伴。其像中的向量被 $Q$ 固定、被 $P$ 消去；反之同时满足这两个条件的向量被 $Q-P$ 固定。这就识别了像空间。

!!! theorem "定理 5.2.7：递增投影网"

    递增投影网 $E_\alpha$ 强算子收敛到 $E$，其中 $\operatorname{ran}E=\overline{\bigcup_\alpha\operatorname{ran}E_\alpha}$，并有 $E_\alpha\leq E$。若已知它 WOT 收敛到 $F$，也必有 $F=E$。

??? proof "证明 5.2.7"

    令 $M=\overline{\bigcup_\alpha\operatorname{ran}E_\alpha}$，$E$ 为到 $M$ 的投影。若 $\xi\in\operatorname{ran}E_{\alpha_0}$，则 $\alpha\geq\alpha_0$ 时 $E_\alpha\xi=\xi$；若 $\xi\in M^\perp$，则始终 $E_\alpha\xi=0$。对一般 $m\in M$，取并集中的 $m_0$ 逼近，由 $\|E_\alpha\|\leq1$ 得

    $$
    \|E_\alpha m-m\|\leq2\|m-m_0\|\quad(\alpha\geq\alpha_0).
    $$

    故整个网 SOT 趋于 $E$。像包含给出 $E_\alpha\leq E$，而 WOT 极限的唯一性给出 $F=E$。

!!! theorem "推论 5.2.8：递减投影网"

    递减投影网 $E_\alpha$ 强算子收敛到交空间 $\bigcap_\alpha\operatorname{ran}E_\alpha$ 的投影，并有 $E\leq E_\alpha$。

??? proof "证明 5.2.8"

    $1-E_\alpha$ 是递增投影网。应用 5.2.7 得到极限 $F$，于是 $E_\alpha\to1-F$。由正交补的关系

    $$
    \operatorname{ran}(1-F)
    =\left(\overline{\bigcup_\alpha\ker E_\alpha}\right)^\perp
    =\bigcap_\alpha\operatorname{ran}E_\alpha.
    $$

### 从连续测试扩到 Borel 测试 { #topic-5-3-1 }

连续函数足以确定测度，但区间指标通常不连续。正常性要求保持非负递增序列的极限，使测度积分能够延拓到这些指标及全部有界 Borel 函数。

!!! definition "定义 5.3.1：正常正泛函"

    正泛函 $\Lambda:\operatorname{Bor}_b(X)\to\mathbb F$ 正常，指对 $0\leq f_n\uparrow f$ 且 $f$ 有界，$\Lambda(f_n)\uparrow\Lambda(f)$。

!!! theorem "命题 5.3.2：正常泛函与测度"

    有限正 Borel 测度与正常正泛函一一对应：$\Lambda_\mu(f)=\int f\,d\mu$，逆为 $\mu(E)=\Lambda(\mathbf1_E)$。

??? proof "证明 5.3.2"

    由测度得到的泛函正且线性，单调收敛定理保证正常性。反过来令 $\mu(E)=\Lambda(\mathbf1_E)$。互不相交 $E_n$ 的有限并指标递增到并集指标，故

    $$
    \mu\left(\bigcup_nE_n\right)=\lim_N\sum_{n\leq N}\mu(E_n)=\sum_n\mu(E_n).
    $$

    并且 $\mu(X)=\Lambda(1)<\infty$。简单函数的积分等于 $\Lambda$，非负有界函数由简单函数递增逼近，再拆分实部、虚部，得到全部有界 Borel 函数的表示。

!!! theorem "定理 5.3.4：连续泛函的正常延拓"

    第二可数紧 Hausdorff 空间中，限制映射将 $\operatorname{Bor}_b(X)$ 上正常正泛函与 $C(X)$ 上正泛函一一对应，保持非负标量线性组合。

??? proof "证明 5.3.4"

    $C(X)$ 上的正泛函由 Riesz–Markov 定理对应唯一有限正 Radon 测度 $\mu$；以 $\int f\,d\mu$ 延拓即得正常泛函。第二可数紧空间上的有限 Borel 测度自动 Radon，故任一正常延拓都由 5.3.2 给出同类测度，连续测试函数的唯一性迫使测度相同。限制和积分都保持非负标量线性组合。

!!! theorem "推论 5.3.5：抽象 Hausdorff 矩定理"

    若再有含幺星子代数 $A\subset C(X)$ 分离点，则限制到 $A$ 也给出上述正常正泛函与 $A$ 上正泛函的一一对应。

??? proof "证明 5.3.5"

    Stone–Weierstrass 保证 $A$ 一致稠密于 $C(X)$。第四章的正泛函延拓定理给出 $\|\Lambda\|=\Lambda(1)$，故它唯一连续延拓到 $C(X)$；非负函数的保正逼近使延拓仍正。再用 5.3.4 延拓到有界 Borel 函数。每一步均唯一，因此复合仍一一对应。

### 谱族把区间变成投影 { #topic-5-4-3 }

右连续累积函数记录标量测度，右连续谱族则记录子空间投影。连续函数的谱积分由区间增量构造，左端原子也必须按闭区间积分约定保留。

!!! definition "定义 5.4.3：右连续谱族"

    区间上的投影族 $E(\lambda)$ 递增，指 $\lambda\leq\mu$ 时 $E(\lambda)\leq E(\mu)$。右连续指 $\mu\downarrow\lambda$ 时 $E(\mu)\to E(\lambda)$ 强算子收敛；等价于弱算子右连续或 $\operatorname{ran}E(\lambda)=\bigcap_{\mu>\lambda}\operatorname{ran}E(\mu)$。

!!! theorem "定理 5.4.4：Riesz 谱定理"

    自伴 $T\in\mathcal L(H)$、$\|T\|\leq r$ 对应唯一的右连续递增投影族 $E$，满足 $E(r)=1$，且全部 $f\in C([-r,r])$ 满足 $f(T)=\int_{[-r,r]}f(\lambda)\,dE(\lambda)$。这里 $E(\lambda)=\mathbf1_{[-r,\lambda]}(T)$，左端原子通过闭区间积分约定保留。

??? proof "证明 5.4.4"

    先由多项式估计 $\|p(T)\|\leq\|p\|_{C([-r,r])}$ 建立连续演算，再用 5.5.17 的延拓构造定义 $E(\lambda)=\mathbf1_{[-r,\lambda]}(T)$。指标函数的乘法说明它们是递增投影。若 $\lambda_n\downarrow\lambda$，单调收敛作用于每个向量测度，结合 5.2.8 得到右连续。阶梯和在算子范数下逼近 $f(T)$，于是得到积分公式。

    唯一性不能只看 $f(x)=x$ 的积分。对两个候选谱族，积分对连续 $f$ 定义含幺星表示并将坐标送到 $T$，多项式及一致稠密性保证连续演算一致。各向量的标量 Stieltjes 测度由连续测试唯一确定，右连续累积分布遂一致；极化后投影一致。闭区间积分中的 $f(-r)E(-r)$ 保留左端原子。

### 证明演算确实保持乘法 { #topic-5-5-1 }

谱演算要同时保持加法、乘法和复共轭。标量 Riesz 表示先恢复矩阵元，普遍 $L^2$ 逼近再恢复算子；乘法通过固定一个因子、分两次取极限来验证。

!!! definition "定义 5.5.1：投影值 Stieltjes 积分"

    对递增投影族 $E$ 与连续 $f$，定义带标记和 $\sum_jf(\xi_j)(E(a_j)-E(a_{j-1}))$ 的加细极限为 $\int_{(a,b]}f\,dE$，并令 $\int_{[a,b]}f\,dE=f(a)E(a)+\int_{(a,b]}f\,dE$。

!!! theorem "命题 5.5.2：算子范数收敛与标量积分"

    上述极限在算子范数下存在，且 $\langle\xi,(\int f\,dE)\xi\rangle=\int f\,d\langle\xi,E(\cdot)\xi\rangle$。

??? proof "证明 5.5.2"

    区间增量 $P_j=E(a_j)-E(a_{j-1})$ 是相互正交投影，故

    $$
    \left\|\sum_jc_jP_j\right\|\leq\max_j|c_j|.
    $$

    将两份标记和放到共同加细分割上，系数之差至多为 $f$ 在各小区间的振荡。连续函数的一致连续性使和成为算子范数 Cauchy 网，有界算子空间完备给出极限。对角矩阵元的和恰为标量 Stieltjes 和，连续取极限即得公式；左端项同样逐项对应。

!!! definition "定义 5.5.3：预酉表示与酉表示"

    含幺星代数的预酉表示为内积空间 $V$ 上的线性映射 $\pi:A\to\operatorname{Lin}(V)$，满足 $\pi(ab)=\pi(a)\pi(b)$、$\langle\eta,\pi(a)\xi\rangle=\langle\pi(a^*)\eta,\xi\rangle$、$\pi(1)=1$。若 $V$ 完备且全部像算子有界，称酉表示。非含幺代数不要求单位条件。

!!! definition "定义 5.5.5：正表示"

    对 $A\subset\ell^\infty(X)$，预酉表示正，指每个点态非负 $f\in A$ 都满足 $\langle\xi,\pi(f)\xi\rangle\geq0$。

!!! theorem "命题 5.5.6：平方根保证正性"

    若 $A$ 中每个非负元素均可写成 $g^*g$，$g\in A$，则每个预酉表示正。$C(X)$（$X$ 紧）与 $\operatorname{Bor}_b(X)$ 均满足此条件。

??? proof "证明 5.5.6"

    若 $f=g^*g$，则 $\langle\xi,\pi(f)\xi\rangle=\langle\pi(g)\xi,\pi(g)\xi\rangle\geq0$。连续或 Borel 非负函数的点态平方根仍属相应代数，故两类代数均满足假设。

!!! definition "定义 5.5.7：Radon 表示"

    局部紧 Hausdorff 空间上，$\operatorname{Bor}_b(X)$ 的预酉表示为 Radon 表示，指每个正泛函 $f\mapsto\langle\xi,\pi(f)\xi\rangle$ 都由有限正 Radon 测度表示。

!!! definition "定义 5.5.8：正常表示"

    若每个上述向量泛函正常，则称表示正常。第二可数局部紧空间中，正常表示与 Radon 表示等价。

!!! definition "定义 5.5.10：普遍 $L^2$ 拓扑"

    $\operatorname{Bor}_b(X)$ 上由所有半范数 $f\mapsto(\int|f|^2\,d\mu)^{1/2}$ 诱导的拓扑，其中 $\mu$ 遍历有限 Radon 测度，称普遍 $L^2$ 拓扑。收敛要求在每一个这样的 $L^2(\mu)$ 中收敛。

!!! theorem "引理 5.5.12：有范数控制的普遍逼近"

    若星子代数 $A\subset C_0(X,\mathbb F)$ 分离点且无共同零点，则其一致范数闭单位球在 $\operatorname{Bor}_b(X,\mathbb F)$ 闭单位球中普遍 $L^2$ 稠密。任意 $f$ 可由 $\|f_\alpha\|_\infty\leq\|f\|_\infty$ 的 $A$ 中网逼近。

??? proof "证明 5.5.12"

    先固定有限个有限 Radon 测度，令 $\nu$ 为其和。Lusin 定理在损失 $\nu$ 质量小于 $\varepsilon$ 的紧集上把 $|f|\leq1$ 化为连续函数，Tietze 延拓并作径向截断，得到 $h\in C_c(X)$、$|h|\leq1$，且 $\int|h-f|^2\,d\nu\leq4\varepsilon$。再由 Stone–Weierstrass 用 $a\in A$ 一致逼近 $h$，将 $a$ 除以 $\max(1,\|a\|_\infty)$ 以保持单位球，误差仍趋零。

    把有限测度集合按包含排序、误差按递减排序，以上构造形成同时对所有测度收敛的网。一般 $f$ 通过乘上 $\|f\|_\infty$ 得到，$f=0$ 时取零网。

!!! theorem "定理 5.5.13：算子值矩定理"

    若 $X$ 紧 Hausdorff，$A\subset C(X)$ 含幺、星封闭并分离点，则 $A$ 的每个正酉表示唯一延拓为 $\operatorname{Bor}_b(X)$ 的 Radon 酉表示；限制映射给出一一对应。第二可数时可将 Radon 换成正常。

??? proof "证明 5.5.13"

    对每个 $\xi$，正泛函 $\Lambda_\xi(a)=\langle\xi,\pi(a)\xi\rangle$ 唯一延拓为由 Radon 测度表示的 $\Lambda_\xi(f)$。定义

    $$
    \Phi(\eta,f,\xi)=\frac14\sum_{k=0}^3i^k\Lambda_{i^k\eta+\xi}(f).
    $$

    在 $A$ 上这就是 $\langle\eta,\pi(f)\xi\rangle$。由 5.5.12 取普遍 $L^2$ 逼近，再在有限个极化所需测度下取极限，得 $\Phi$ 对第一变量反线性、其余变量线性，且 $\Phi(\xi,f,\xi)=\Lambda_\xi(f)$。估计 $|\Lambda_\xi(f)|\leq\|f\|_\infty\|\xi\|^2$ 及有界形式表示定理给出唯一算子 $\widetilde\pi(f)$。

    单位及星运算由矩阵元立即继承。乘法需分两次取极限：取 $a_\alpha,b_\beta\in A$ 分别普遍 $L^2$ 趋于 $f,g$。固定有界函数 $h$ 时，$a_\alpha h\to fh$；矩阵元连续性和 5.5.14 遂给出

    $$
    \widetilde\pi(fb_\beta)
    =\lim_\alpha\pi(a_\alpha b_\beta)
    =\widetilde\pi(f)\pi(b_\beta).
    $$

    再令 $\beta$ 趋于极限得到 $\widetilde\pi(fg)=\widetilde\pi(f)\widetilde\pi(g)$。这一做法只使用固定因子的 WOT 连续性。对角元等于 $\Lambda_\xi(f)$ 保证 Radon 性；这些标量延拓的唯一性经极化给出整个表示的唯一性。

!!! theorem "引理 5.5.14：固定因子的 WOT 连续性"

    若 $T_\alpha:H\to K$ WOT 趋于 $T$，$A\in\mathcal L(H)$、$B\in\mathcal L(K)$ 固定，则 $T_\alpha A\to TA$、$BT_\alpha\to BT$ 仍 WOT 收敛。

??? proof "证明 5.5.14"

    测试向量 $\eta,\xi$ 有 $\langle\eta,T_\alpha A\xi\rangle\to\langle\eta,TA\xi\rangle$，以及 $\langle\eta,BT_\alpha\xi\rangle=\langle B^*\eta,T_\alpha\xi\rangle\to\langle B^*\eta,T\xi\rangle$。这正是两条 WOT 收敛的定义。

!!! theorem "命题 5.5.15：普遍 $L^2$ 极限与 SOT"

    Radon 预酉表示中，$f_\alpha\to f$ 普遍 $L^2$ 收敛蕴含 $\pi(f_\alpha)\to\pi(f)$ 强算子收敛，因为对每个 $\xi$，误差平方等于相应向量测度下的 $L^2$ 误差平方。

??? proof "证明 5.5.15"

    记 $\mu_\xi$ 为向量测度。星同态性质给出

    $$
    \|(\pi(f_\alpha)-\pi(f))\xi\|^2
    =\langle\xi,\pi(|f_\alpha-f|^2)\xi\rangle
    =\int|f_\alpha-f|^2\,d\mu_\xi\longrightarrow0.
    $$

    逐向量成立即为 SOT 收敛。

!!! theorem "命题 5.5.16：正表示的范数"

    非零内积空间上的含幺正预酉表示自动取值于有界算子，且 $\|\pi(f)\|\leq\|f\|_\infty$、$\|\pi\|=1$。零空间上的表示范数为零。

??? proof "证明 5.5.16"

    点态不等式 $0\leq f^*f\leq\|f\|_\infty^2\,1$ 经正表示得到

    $$
    \|\pi(f)\xi\|^2\leq\|f\|_\infty^2\|\xi\|^2.
    $$

    因此每个像算子自动有界且表示范数至多 $1$。非零空间中 $\pi(1)=I$ 的范数为 $1$，给出反向不等式。零空间情形直接计算。

!!! theorem "定理 5.5.17：自伴算子的 Borel 演算"

    若 $T=T^*$、$\|T\|\leq r$，则有唯一正常酉表示 $\pi_T:\operatorname{Bor}_b([-r,r])\to\mathcal L(H)$，将坐标函数送到 $T$。记 $f(T)=\pi_T(f)$；限制到连续函数即连续函数演算。

??? proof "证明 5.5.17"

    多项式演算含幺且保持星运算。第四章的区间矩正性或本章前面的多项式一致估计保证它正，故 5.5.13 在紧区间上给出唯一 Radon 延拓。区间第二可数，Radon 与正常等价。任何另一正常表示在多项式上都由 $\pi(x)=T$ 决定，延拓唯一性使之相同。

??? proof "表示延拓为何保持乘法"

    对每个向量的二次型先用测度表示延拓，再由极化恢复所有矩阵元。Riesz 表示把这些有界形式恢复成有界算子。普遍 $L^2$ 逼近允许所有向量测度同时控制误差，故连续函数的算子像强收敛到 Borel 函数的像。选取一致有界的逼近后，复合算子的联合极限保持乘法；星运算由矩阵元的共轭关系保持。向量测度的唯一性保证延拓唯一。

    递增投影的极限证明也体现了这一机制：在像空间并集中的向量最终被投影固定，在其闭包上用投影统一范数界延拓，在正交补上始终为零。投影值积分的不同区间增量互相正交，所以和的范数由系数的最大值控制，连续函数的振荡直接给出算子范数误差。

## 9. 联合谱及函数演算的性质 { #section-9 }

### 多个算子的共同坐标 { #topic-5-7-1 }

交换性使各算子的谱投影能够共同细分。联合演算先对实坐标构造，再把正规算子的实、虚部合成复坐标，支集由所有向量测度共同确定。

!!! definition "定义 5.7.1：正规算子"

    $T$ 正规，指 $T^*T=TT^*$；等价于自伴算子 $\operatorname{Re}T=(T+T^*)/2$ 与 $\operatorname{Im}T=(T-T^*)/(2i)$ 交换。

!!! theorem "引理 5.7.3：交换的函数演算"

    若自伴 $A,B$ 交换，则任意有界 Borel $f(A)$ 与 $g(B)$ 交换。仅有二者自伴并不足以保证此结论。

??? proof "证明 5.7.3"

    先有多项式 $p(A)$ 与 $B$ 交换，一致逼近给出所有连续 $f(A)$。有界 Borel $f$ 由一致有界的连续函数网普遍 $L^2$ 逼近，故 SOT 极限及固定因子乘法保持 $[f(A),B]=0$。同样先对 $B$ 的多项式、连续函数，再对 Borel 函数逼近，得到 $[f(A),g(B)]=0$。

!!! theorem "定理 5.7.4：联合自伴演算"

    对两两交换的有限个有界自伴算子 $T_1,\ldots,T_N$，取 $R\geq\max_i\|T_i\|$。存在唯一正常酉表示 $\operatorname{Bor}_b([-R,R]^N)\to\mathcal L(H)$，将每个坐标 $x_i$ 送到 $T_i$，记 $f(T_1,\ldots,T_N)$。

??? proof "证明 5.7.4"

    交换性使多元多项式代换成为星同态。为验证正性，分别用值在 $[-R,R]$ 的简单函数一致逼近各坐标：$T_i^{(n)}=\sum_jc_{ij}E_{ij}$。由 5.7.3，全部投影交换，乘积 $P_{j_1,\ldots,j_N}=\prod_iE_{ij_i}$ 构成正交单位分解。因此当 $p\geq0$ 于立方体时，

    $$
    p(T_1^{(n)},\ldots,T_N^{(n)})
    =\sum_{j_1,\ldots,j_N}p(c_{1j_1},\ldots,c_{Nj_N})P_{j_1,\ldots,j_N}\geq0.
    $$

    算子范数取极限得 $p(T_\bullet)\geq0$。多元多项式分离点，5.5.13 给出正常 Borel 延拓；坐标确定多项式，故也确定唯一延拓。

!!! definition "定义 5.7.5：伴随交换"

    $A,B$ 伴随交换，指 $[A,B]=[A^*,B]=0$；取伴随后也有 $[A,B^*]=[A^*,B^*]=0$。

!!! definition "定义 5.7.9：表示的支集"

    $\operatorname{supp}\pi=\{x:\pi(\mathbf1_U)\ne0\text{ 对每个开邻域 }U\ni x\}$，它是闭集，等于全部向量测度支集并集的闭包。该集紧时称表示具有紧支集。

!!! theorem "命题 5.7.12：限制到支集"

    若 $X$ 第二可数、$\pi$ 正常，Borel 集 $K$ 包含 $\operatorname{supp}\pi$，则唯一的正常表示 $\pi|_K$ 满足 $\pi|_K(f|_K)=\pi(f)$。因此支集外的函数值不影响演算。

??? proof "证明 5.7.12"

    支集外每个点都有投影为零的开邻域。第二可数性把这些邻域化为可数覆盖，所以每个向量测度在支集外为零，$\pi(\mathbf1_{X\setminus K})=0$。对 $f$ 于 $K$，零延拓为 $\widetilde f$ 并定义 $\pi|_K(f)=\pi(\widetilde f)$；因 $\pi(\mathbf1_K)=I$，它含幺且保持乘法、星运算和正常性。两种延拓之差支撑在 $X\setminus K$，其像为零，从而定义与唯一性均成立。

!!! theorem "定理 5.7.13：联合正规演算"

    有限个伴随交换的有界正规算子 $T_1,\ldots,T_N$ 对应唯一具有紧支集的正常酉表示 $\operatorname{Bor}_b(\mathbb C^N)\to\mathcal L(H)$，在支集上受限的各坐标送到 $T_i$。坐标在全空间无界，但紧支集使此说法有意义。

??? proof "证明 5.7.13"

    把每个 $T_i$ 拆成 $A_i+iB_i$，其中 $A_i,B_i$ 自伴。正规性和伴随交换保证这 $2N$ 个算子全部交换。用 5.7.4 构造实坐标立方体上的表示，再经映射 $(a_i,b_i)\mapsto(a_i+ib_i)$ 推前，得到复坐标演算；支集包含于有界立方体的紧像。反过来任何候选表示的实、虚坐标必须给出这些 $A_i,B_i$，由联合自伴演算的唯一性得到唯一。

### 用支集理解谱 { #topic-5-8-1 }

谱中的点未必对应特征向量，但它的每个邻域都有非零谱投影。这直接产生近似特征向量，并把正性、自伴性和酉性转成谱所在区域的条件。

!!! definition "定义 5.8.1：联合谱"

    上述表示的支集称联合谱 $\sigma(T_1,\ldots,T_N)$。点 $\lambda$ 属于联合谱当且仅当它的每个邻域 $U$ 均有 $\mathbf1_U(T_1,\ldots,T_N)\ne0$。

!!! theorem "命题 5.8.4：一致范数估计"

    $\|f(T_1,\ldots,T_N)\|\leq\sup_{\sigma(T_1,\ldots,T_N)}|f|$。因而谱上的一致函数收敛蕴含算子范数收敛。

??? proof "证明 5.8.4"

    由 5.7.12 可将表示限制到联合谱 $K$；5.5.16 于是给出 $\|\pi(f)\|\leq\|f|_K\|_\infty$。应用于差 $f_\alpha-f$ 即得一致收敛的推论。

!!! theorem "命题 5.8.5：普遍 $L^2$ 与联合演算"

    若 $f_\alpha$ 在联合谱上对每个有限 Radon 测度均 $L^2$ 趋于 $f$，则 $f_\alpha(T_1,\ldots,T_N)\to f(T_1,\ldots,T_N)$ 强算子收敛。

??? proof "证明 5.8.5"

    对每个 $\xi$，向量测度 $\mu_\xi$ 支撑于联合谱，且

    $$
    \|(f_\alpha(T_\bullet)-f(T_\bullet))\xi\|^2
    =\int_K|f_\alpha-f|^2\,d\mu_\xi\to0.
    $$

    这就是 SOT 收敛。

!!! theorem "定理 5.8.6：复合规则"

    对有界 Borel 函数 $g_1,\ldots,g_L$ 及 $f\in\operatorname{Bor}_b(\mathbb C^L)$，算子 $g_j(T_\bullet)$ 正规且伴随交换，并有 $f(g_1(T_\bullet),\ldots,g_L(T_\bullet))=(f\circ(g_1,\ldots,g_L))(T_\bullet)$。

??? proof "证明 5.8.6"

    令 $G=(g_1,\ldots,g_L)$。映射 $h\mapsto(h\circ G)(T_\bullet)$ 是含幺星表示，其正常性由非负函数的逐点单调极限得到。其坐标像是 $g_j(T_\bullet)$，这些算子因来自交换星代数而正规、伴随交换；$G$ 有界，表示有紧支集。5.7.13 的唯一性识别它与这些坐标像的联合演算。

!!! theorem "推论 5.8.7：忽略无关变量"

    若 $f$ 只依赖前 $L$ 个坐标，则 $f(T_1,\ldots,T_L)=f(T_1,\ldots,T_N)$。

??? proof "证明 5.8.7"

    在 5.8.6 中取 $g_j(z)=z_j$ 于联合谱，并在谱外作有界延拓。复合函数正是只依赖前 $L$ 个变量的 $f$，故得到等式。

!!! theorem "命题 5.8.8：单点谱投影"

    对正规 $T$，$\mathbf1_{\{\lambda\}}(T)$ 是到 $\ker(T-\lambda I)$ 的投影。因此特征值就是具有非零单点谱投影的点。

??? proof "证明 5.8.8"

    令 $E=\mathbf1_{\{\lambda\}}(T)$，则 $(T-\lambda)E=0$，所以 $\operatorname{ran}E\subset\ker(T-\lambda)$。若 $(T-\lambda)\xi=0$，则

    $$
    0=\|(T-\lambda)\xi\|^2=\int|z-\lambda|^2\,d\mu_\xi.
    $$

    非负被积函数迫使 $\mu_\xi$ 集中于 $\{\lambda\}$，于是 $\|(1-E)\xi\|^2=0$。这给出反向包含。

!!! theorem "命题 5.8.9：联合谱的包含关系"

    $\sigma(T_1,\ldots,T_N)\subset\sigma(T_1,\ldots,T_L)\times\sigma(T_{L+1},\ldots,T_N)$，从而包含于各单算子谱的乘积；一般不等于该乘积。

??? proof "证明 5.8.9"

    若前 $L$ 个坐标不在其联合谱，取该坐标组的开邻域 $U$ 使 $\mathbf1_U(T_1,\ldots,T_L)=0$。5.8.7 得 $\mathbf1_{U\times\mathbb C^{N-L}}(T_\bullet)=0$，故原点也不在全联合谱。对后一坐标组同理，得到所述乘积包含。例 $T_1=T_2$ 的联合谱位于对角线上，显示一般严格包含。

!!! definition "定义 5.8.10：近似特征值"

    赋范空间上 $\lambda$ 为 $T$ 的近似特征值，指每个 $\varepsilon>0$ 都存在非零 $\xi$ 满足 $\|(T-\lambda)\xi\|\leq\varepsilon\|\xi\|$；等价于存在单位向量序列 $\xi_n$ 使 $(T-\lambda)\xi_n\to0$。

!!! theorem "定理 5.8.11：正规谱与近似特征值"

    有界正规算子的谱恰为近似特征值集合，也等于通常通过有界可逆性定义的谱。

??? proof "证明 5.8.11"

    若 $\lambda$ 在谱支集内，每个球 $U_\varepsilon$ 的谱投影非零，取其像中的单位向量 $\xi_\varepsilon$，有

    $$
    \|(T-\lambda)\xi_\varepsilon\|^2
    =\int_{U_\varepsilon}|z-\lambda|^2\,d\mu_{\xi_\varepsilon}\leq\varepsilon^2.
    $$

    若 $\lambda$ 不在紧谱内，距离谱为正，积分公式给出 $\|(T-\lambda)\xi\|\geq d\|\xi\|$，不能是近似特征值。此时谱上 $1/(z-\lambda)$ 有界，其演算给出 $T-\lambda$ 的双侧有界逆。反过来若它有有界逆，就有相同类型的正下界，排除近似特征值，故两种谱定义相同。

!!! theorem "命题 5.8.14：正性与谱"

    正规 $T$ 正当且仅当 $\sigma(T)\subset[0,\infty)$。

??? proof "证明 5.8.14"

    若 $T\geq0$，对谱中任一近似特征值的单位向量 $\xi_n$，$\lambda=\lim_n\langle\xi_n,T\xi_n\rangle\geq0$。反之谱包含于非负实轴时，$\langle\xi,T\xi\rangle=\int z\,d\mu_\xi(z)\geq0$，故 $T$ 正。

!!! theorem "命题 5.8.15：自伴性与谱"

    正规 $T$ 自伴当且仅当 $\sigma(T)\subset\mathbb R$。

??? proof "证明 5.8.15"

    $T-T^*$ 的平方范数满足 $\|(T-T^*)\xi\|^2=\int|z-\bar z|^2\,d\mu_\xi$。因此 $T=T^*$ 当且仅当所有向量测度在 $\mathbb C\setminus\mathbb R$ 上为零。当谱有非实点，其小邻域有非零投影，取投影像中的向量便与该消失条件矛盾。故恰等价于谱为实。

!!! theorem "命题 5.8.16：酉性与谱"

    正规 $U$ 酉当且仅当 $\sigma(U)\subset\{z:|z|=1\}$。

??? proof "证明 5.8.16"

    酉性给出 $\|(U-\lambda)\xi\|\geq|1-|\lambda||\,\|\xi\|$，所以模不为 $1$ 的点都不是近似特征值。反之谱在单位圆时，演算给出 $U^*U=(|z|^2)(U)=I$；正规性又给 $UU^*=I$，所以 $U$ 酉。

### 平均消去非固定方向 { #topic-5-9-1 }

单位圆上的几何级数平均在 $1$ 处保持为一，在其余点趋零。谱演算把这一标量极限转成算子强极限，一般等距算子可通过酉扩张进入同一论证。

!!! theorem "定理 5.9.1：von Neumann 平均遍历定理"

    若 $U$ 为等距算子，即 $U^*U=1$，则 $n^{-1}\sum_{k=0}^{n-1}U^k$ 强算子趋于 $\ker(1-U)$ 的正交投影。

??? proof "证明 5.9.1"

    先看酉算子 $W$。单位圆上 $f_n(z)=n^{-1}\sum_{k=0}^{n-1}z^k$ 满足 $|f_n|\leq1$，且逐点趋于 $\mathbf1_{\{1\}}$；支配收敛及 5.8.5 给出 $f_n(W)\to\mathbf1_{\{1\}}(W)$ 强收敛。

    一般等距 $U$ 可扩成更大空间上的酉算子：取足够大的 Hilbert 空间 $K$，使 $K\cong(\operatorname{ran}U)^\perp\oplus K$，用酉映射 $V$ 实现此对应，令 $W(h+k)=Uh+Vk$。正交像覆盖 $H\oplus K$，故 $W$ 酉，且 $W^nh=U^nh$。因此平均在 $H$ 中收敛。若 $W(h+k)=h+k$，投影回 $H$ 得 $h=Uh+P_HVk$，其中两项正交；因 $\|Uh\|=\|h\|$，必有 $P_HVk=0$，于是 $Uh=h$。这说明大空间固定向量的 $H$ 分量都是 $U$ 的固定向量，故极限限制正是到 $\ker(1-U)$ 的投影。

## 10. 直和、循环表示与单生成元 { #section-10 }

### 由循环向量得到乘法模型 { #topic-5-10-1 }

一个循环向量的测度决定其整个循环子空间：泛函值变成积分，算子作用变成乘法。一般表示通过正交循环分解拼成这些模型的直和。

!!! definition "定义 5.10.1：向量空间的乘积"

    $\prod_\alpha V_\alpha$ 的加法和标量乘法逐分量定义，不要求范数可和。

!!! definition "定义 5.10.2：Hilbert 直和"

    $\bigoplus_\alpha H_\alpha=\{(\xi_\alpha):\sum_\alpha\|\xi_\alpha\|^2<\infty\}$，内积为 $\sum_\alpha\langle\eta_\alpha,\xi_\alpha\rangle$。此和绝对收敛，空间完备，每个向量只有至多可数个非零分量。

!!! definition "定义 5.10.4：有界算子的直和"

    若 $\sup_\alpha\|T_\alpha\|<\infty$，定义 $(\bigoplus_\alpha T_\alpha)(\bigoplus_\alpha\xi_\alpha)=\bigoplus_\alpha T_\alpha\xi_\alpha$。范数为各分量范数上确界，伴随为 $\bigoplus_\alpha T_\alpha^*$。

!!! definition "定义 5.10.7：不变子空间"

    $V$ 对算子族 $S$ 不变，指每个 $T\in S$ 满足 $TV\subset V$；对表示 $\pi$，$A$-不变指对全部 $\pi(a)$ 不变。

!!! definition "定义 5.10.10：表示的同态与酉等价"

    有界 $\Phi:V_1\to V_2$ 若满足 $\Phi\pi_1(a)=\pi_2(a)\Phi$ 则称同态。酉的同态称酉等价；其存在时两表示酉等价。

!!! definition "定义 5.10.11：子表示"

    闭 $A$-不变子空间 $K\subset H$ 上的限制 $(\pi|_K,K)$ 称酉子表示。星封闭性还保证 $K^\perp$ 不变。

!!! definition "定义 5.10.12：直和表示"

    若每个 $a\in A$ 均有 $\sup_\alpha\|\pi_\alpha(a)\|<\infty$，则 $a\mapsto\bigoplus_\alpha\pi_\alpha(a)$ 在 Hilbert 直和上给出酉表示，称直和表示。

!!! definition "定义 5.10.15：循环向量"

    若 $\pi(A)\xi$ 的线性张成稠密，则 $\xi$ 称循环向量。有循环向量的表示称循环表示；对应不变闭子空间上的循环表示称循环子表示。

!!! theorem "命题 5.10.16：循环分解"

    任意酉表示均为相互正交循环子表示的直和；不要求 Hilbert 空间可分。

??? proof "证明 5.10.16"

    取互相正交的非零循环子表示族，用 Zorn 引理得到极大族。各子空间及其正交补均不变：对 $\eta\perp K$、$\xi\in K$，$\langle\xi,\pi(a)\eta\rangle=\langle\pi(a^*)\xi,\eta\rangle=0$。因此该族张成的闭空间的正交补也不变。若正交补非零，取其中非零 $\eta$，$\overline{\pi(A)\eta}$ 就是可加入的新循环子空间，矛盾。故直和穷尽全空间。

!!! theorem "命题 5.10.19：循环表示的乘法模型"

    $\operatorname{Bor}_b(X)$ 的正常酉表示中，$\psi$ 循环当且仅当存在有限正 Borel 测度 $\mu$ 和酉同态 $\Phi:H\to L^2(X,\mu)$，使 $\Phi\psi=1$ 且 $\Phi\pi(f)\Phi^{-1}=M_f$。

??? proof "证明 5.10.19"

    若 $\psi$ 循环，取 $\mu(E)=\langle\psi,\pi(\mathbf1_E)\psi\rangle$。定义 $\Phi(\pi(f)\psi)=f$，因

    $$
    \langle\pi(f)\psi,\pi(g)\psi\rangle=\int\bar f g\,d\mu,
    $$

    它良定义并等距。循环性使定义域稠密，简单函数使像在 $L^2(\mu)$ 稠密，故延拓为酉映射。等式 $\Phi\pi(a)\pi(f)\psi=af=M_a\Phi\pi(f)\psi$ 在稠密子空间成立，再连续延拓到全空间。反向中 $\pi(f)\psi$ 对应 $f$，有界简单函数稠密保证 $\psi$ 循环。

!!! theorem "引理 5.10.20：保持 Gram 矩阵的等距映射"

    若 $(\xi_\alpha)$ 线性稠密于内积空间 $V$，$(\eta_\alpha)$ 位于 Hilbert 空间 $K$，且两族全部内积相同，则唯一存在等距线性 $\Phi:V\to K$ 将各 $\xi_\alpha$ 送到 $\eta_\alpha$。若 $V$ 完备且后者线性稠密，则 $\Phi$ 酉。

??? proof "证明 5.10.20"

    有限和的 Gram 矩阵相同意味着

    $$
    \left\|\sum c_\alpha\xi_\alpha\right\|^2
    =\left\|\sum c_\alpha\eta_\alpha\right\|^2.
    $$

    所以把左侧有限和送到右侧的映射不依赖表达式，且等距。目标完备，故从稠密线性张成唯一延拓到 $V$。若 $V$ 完备，等距像也完备从而闭；再由像的稠密性得到满射。

!!! theorem "引理 5.10.21：下界保证闭像"

    若 $V$ 完备、$T:V\to W$ 有界且 $\|T\xi\|\geq C\|\xi\|$，$C>0$，则 $\operatorname{ran}T$ 闭。像中的 Cauchy 序列由此对应定义域中的 Cauchy 序列。

??? proof "证明 5.10.21"

    若 $T\xi_n\to\eta$，下界给出 $\|\xi_n-\xi_m\|\leq C^{-1}\|T\xi_n-T\xi_m\|$。定义域完备保证 $\xi_n\to\xi$，连续性于是给 $\eta=T\xi$，所以像闭。

    也可以从逆映射看：$T$ 单射，$T^{-1}$ 在像上有界，因目标 $V$ 完备可延拓到像的闭包。由 $TT^{-1}=I$ 在稠密子集成立，连续性使它在闭包上仍成立，闭包遂已包含于像。

!!! theorem "定理 5.10.22：乘法算子版本的谱定理"

    有限个伴随交换的有界正规算子可同时酉化为 $\bigoplus_\alpha L^2(X,\mu_\alpha)$ 上的坐标乘法 $\bigoplus_\alpha M_{z_i}$，其中 $X\subset\mathbb C^N$ 紧、各 $\mu_\alpha$ 为有限正 Borel 测度。

??? proof "证明 5.10.22"

    取 $X=\sigma(T_\bullet)$ 上的联合 Borel 表示。5.10.16 将其分解成正交循环子表示；正常性在子空间上保留。5.10.19 将每个分量酉化为 $L^2(X,\mu_\alpha)$ 的乘法表示。直和酉映射把每个坐标像 $T_i$ 送到 $\bigoplus_\alpha M_{z_i}$，得到所需模型。

!!! theorem "定理 5.10.23：乘法模型的演算"

    对可测空间上的有界可测 $f_1,\ldots,f_N$ 及任意测度族，$T_i=\bigoplus_\alpha M_{f_i}$ 正规且伴随交换，并满足 $g(T_1,\ldots,T_N)=\bigoplus_\alpha M_{g\circ(f_1,\ldots,f_N)}$。

??? proof "证明 5.10.23"

    乘法算子的伴随是 $M_{\bar f}$，故这些算子正规且伴随交换。定义 $\pi(g)=\bigoplus_\alpha M_{g\circ f_\bullet}$，它含幺、保持乘法和星运算，支撑在包含 $f_\bullet$ 像的紧集。若 $0\leq g_n\uparrow g$，对 $\xi=(\xi_\alpha)$ 有

    $$
    \langle\xi,\pi(g_n)\xi\rangle
    =\sum_\alpha\int(g_n\circ f_\bullet)|\xi_\alpha|^2\,d\mu_\alpha
    \uparrow\langle\xi,\pi(g)\xi\rangle.
    $$

    单调收敛可用于积分和计数求和，故表示正常。其坐标像是 $T_i$，唯一性给出公式。

### 把可数信息编码进一个算子 { #topic-5-11-1 }

有理端点谱投影给出可数个二值信息，用快速递减权重相加可逐位恢复它们。闭代数中的截断逼近还需保证乘法封闭；可分性则用于把强极限恢复为单个 Borel 函数。

!!! definition "定义 5.11.1：强-\*算子拓扑"

    $T_\alpha\to T$ 在 SOT\* 下收敛，指 $T_\alpha\to T$ 且 $T_\alpha^*\to T^*$ 均为 SOT 收敛。

!!! definition "定义 5.11.4：测度的 Fourier 系数"

    有限正 Borel 测度 $\mu$ 在 $\mathbb T^N$ 上的 Fourier 系数为 $\widehat\mu(n)=\int z^{-n}\,d\mu(z)$，$n\in\mathbb Z^N$。其绝对值至多为总质量；三角多项式一致稠密性保证这些系数唯一确定测度。

!!! theorem "定理 5.11.5：可分空间中的单算子编码"

    可分 Hilbert 空间上，有限或可数个相互交换的有界自伴算子 $T_i$ 可写成 $T_i=f_i(S)$，其中 $S$ 为一个有界自伴算子，$f_i$ 为有界实 Borel 函数。

??? proof "证明 5.11.5"

    由 5.11.12 取正算子 $S$ 使可数自伴族与 $S$ 生成同一闭代数。可分性及 5.11.11 保证每个 $T_i$ 均为 $f_i(S)$。自伴性给出 $T_i=(\operatorname{Re}f_i)(S)$，所以可把 $f_i$ 取为有界实 Borel 函数。这两个后续结果的独立证明分别如下，不以本定理作前提。

!!! definition "定义 5.11.6：生成的交换算子代数"

    对伴随交换的有界正规算子族 $S$，令 $\mathbb C[S\cup S^*]$ 为含幺星多项式代数，$W^*(S)$ 为其 SOT\* 闭包。

!!! theorem "定理 5.11.9：闭包仍为星代数"

    $W^*(S)$ 是 SOT\* 闭的含幺交换星子代数；其全部元素正规且相互伴随交换。

??? proof "证明 5.11.9"

    固定因子的 SOT 连续性及取伴随的 SOT\* 连续性使闭包元素仍两两伴随交换；与自己的伴随交换便是正规性。线性运算及单位也在闭包中。乘法需要处理逼近网可能没有统一范数界：对自伴目标 $S$，将实多项式逼近 $p_\alpha$ 经截断 $\phi_R(t)=\max(-R,\min(t,R))$，其中 $R\geq\|S\|$。联合演算中的点态不等式

    $$
    |\phi_R(s)-t|\leq|s-t|\quad(|t|\leq R)
    $$

    保证 $\phi_R(p_\alpha)\to S$ 强收敛；每个截断仍在闭包中，因为单个有界自伴多项式的连续演算由多项式一致逼近得到。故有一致有界的自伴逼近。对 $S,T$ 各取这种网，则

    $$
    \|S_\alpha T_\beta\xi-ST\xi\|
    \leq R\|(T_\beta-T)\xi\|+\|(S_\alpha-S)T\xi\|\to0.
    $$

    伴随同理。上述 $S_\alpha,T_\beta$ 是原代数元素的连续截断，各自可用多项式一致逼近；因此它们的乘积先由两个原代数多项式的乘积逼近，也在闭包中。这一步保证用于取极限的乘积确实属于闭包。将一般算子拆成实、虚部，得乘法封闭。因此闭包是含幺交换星代数。

!!! theorem "定理 5.11.11：有限生成代数的 Borel 描述"

    若 $H$ 可分，$S=\{T_1,\ldots,T_N\}$，则 $W^*(S)=\{f(T_1,\ldots,T_N):f\in\operatorname{Bor}_b(\mathbb C^N)\}$。

??? proof "证明 5.11.11"

    Borel 演算的像在闭包中，由普遍 $L^2$ 逼近及星运算可得。反向只需证明自伴 $S$。取实星多项式逼近它，用 5.11.9 的截断步骤得到 $f_\alpha(T_\bullet)\to S$ 且 $|f_\alpha|\leq R$。可分性允许取线性稠密的 $\psi_n$，满足 $\sum_n\|\psi_n\|^2<\infty$，令 $\mu=\sum_n\mu_{\psi_n}$。于是

    $$
    \|f_\alpha-f_\beta\|_{L^2(\mu)}^2
    =\sum_n\|(f_\alpha(T_\bullet)-f_\beta(T_\bullet))\psi_n\|^2\to0.
    $$

    有限部分由强收敛控制，尾部由 $4R^2\sum_{n>N}\|\psi_n\|^2$ 控制。完备性给出 $L^2$ 极限 $f$，取几乎处处收敛子序列可选 $|f|\leq R$ 的 Borel 代表。对每个 $\psi_n$，$\|(f_\alpha(T_\bullet)-f(T_\bullet))\psi_n\|^2\leq\|f_\alpha-f\|_{L^2(\mu)}^2\to0$。故 $S=f(T_\bullet)$ 于稠密张成及全空间。一般元素拆成实、虚部即可。

!!! theorem "定理 5.11.12：可数族的正单生成元"

    若上述算子族 $S$ 可数，则存在有界正算子 $A$，使 $W^*(S)=W^*(\{A\})$。此代数生成结论不要求 $H$ 可分；将代数元素全部写成单个 Borel 函数时使用可分条件。

??? proof "证明 5.11.12"

    把每个正规算子拆成实、虚部，再取各自有理端点谱投影，得到可数交换投影族 $E_0,E_1,\ldots$。阶梯逼近和 Borel 演算的强逼近说明原算子族与这些投影生成同一闭代数。令

    $$
    A_n=\sum_{k\geq n}3^{-k}E_k,\qquad A=A_0.
    $$

    级数在算子范数下收敛且为正。尾和满足 $0\leq3^nA_{n+1}\leq\frac12 I$，并与 $E_n$ 交换，所以联合演算给出

    $$
    E_n=\mathbf1_{[1,\infty)}(3^nA_n).
    $$

    先由 $A_0$ 恢复 $E_0$，再用 $A_1=A_0-E_0$，递归恢复全部 $E_n$。这些谱投影在 $W^*(A)$ 中，因为 Borel 演算由连续及多项式的强逼近得到。反向 $A$ 是原投影的范数极限，故两闭代数相同。此构造不使用可分性。

??? proof "循环模型与可数谱投影的编码"

    对循环向量 $\psi$，取 $\mu(E)=\langle\psi,\pi(\mathbf1_E)\psi\rangle$。映射 $\pi(f)\psi\mapsto f$ 保持内积，因为其两边内积均为 $\int\overline f g\,d\mu$。有界简单函数在 $L^2$ 中稠密，循环性保证两边的稠密像，从而延拓为酉映射。对一般空间取极大互相正交的循环子空间族，正交补若非零还可加入一个循环子空间，故它们张成全空间。

    对可数自伴族，取各算子的有理端点谱投影，得到可数个交换投影 $E_0,E_1,\ldots$。令 $A=\sum_{n\geq0}3^{-n}E_n$，算子范数收敛。第 $n$ 位投影可通过对剩余尾和作阈值函数恢复，因为后续尾和至多为该位权重的一半；依次恢复全部 $E_n$，故它们与 $A$ 生成同一闭代数。

    对自伴闭包元素 $S$，先用实星多项式 $p_\alpha(T_\bullet)$ 强逼近，再以截断函数 $\phi(t)=\max(-\|S\|,\min(t,\|S\|))$ 代换。由于全部算子交换，联合谱上的标量不等式 $|\phi(s)-t|\leq|s-t|$（$|t|\leq\|S\|$）保证截断仍强逼近 $S$，同时取得统一范数界。一般元素分别处理实部和虚部。

    可分空间中取线性稠密的 $\psi_n$ 且 $\sum_n\|\psi_n\|^2<\infty$，用控制测度 $\mu=\sum_n\mu_{\psi_n}$ 将有界 SOT\* 逼近变成 $L^2(\mu)$ 的 Cauchy 逼近。完备性和几乎处处子列给出有界 Borel 代表，稠密测试再恢复算子。这证明有限生成时所有闭包元素均来自 Borel 演算，并完成单算子编码。

## 11. 练习 { #section-11 }

!!! problem "练习 1：乘法算子的谱"

    在 $L^2[0,1]$ 上令 $Tf(t)=tf(t)$。证明 $\sigma(T)=[0,1]$，并写出谱投影。

??? proof "解"

    对 $z\notin[0,1]$，逆算子为乘以 $(z-t)^{-1}$，它有界。对 $\lambda\in[0,1]$，取支撑在 $\lambda$ 附近小区间、归一化的示性函数，得到近似特征向量，故 $\lambda\in\sigma(T)$。$E(B)$ 是乘以 $\mathbf1_B$。

!!! problem "练习 2：谱族不是范数连续的"

    对上题证明 $E_{\lambda+h}\to E_\lambda$ 强收敛，但当 $0<\lambda<1$、$h>0$ 充分小时，二者的算子范数距离为 $1$。

??? proof "解"

    对固定 $f$，$\int_\lambda^{\lambda+h}|f|^2\to0$，故强收敛。差是到区间 $(\lambda,\lambda+h]$ 上的非零正交投影，其范数为 $1$。

!!! problem "练习 3：一个纯点谱模型"

    在 $\ell^2$ 上令 $Te_n=e_n/n$。求谱、谱投影，并判断 $0$ 是否为特征值。

??? proof "解"

    $\sigma(T)=\{1/n:n\ge1\}\cup\{0\}$。$E(B)$ 保留那些 $1/n\in B$ 的坐标。零不对应任何非零特征向量，但 $Te_n\to0$，所以它是谱中的极限点。$E(\{0\})=0$，再次说明谱点不一定带有原子质量。

下一章保留乘法模型，但不再要求乘法函数有界，定义域因此成为谱理论的一部分。

[返回目录](index.md){ .md-button }
