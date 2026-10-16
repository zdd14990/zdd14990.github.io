---
title: 第八章：紧算子、Fredholm 二择一与 PDE
date: 2026-10-04
description: 证明紧自伴谱定理与 Fredholm 二择一，连接紧预解式、Rellich 紧性、椭圆方程及有限元误差。
hide:
  - navigation
categories:
  - 分析
  - 泛函分析
tags:
  - functional-analysis
  - compact-operators
  - pde
  - course
---

# 第八章：紧算子、Fredholm 二择一与 PDE { #chapter-08 }

## 1. 从边值问题到积分方程 { #section-1 }

在 $(0,1)$ 上，$-u''=f$、$u(0)=u(1)=0$ 的逆算子具有 Green 核

$$
G(x,y)=\min(x,y)-xy,
\qquad u(x)=\int_0^1G(x,y)f(y)\,\mathrm dy.
$$

于是 $-u''-\lambda u=f$ 可化为 $u-\lambda Ku=Kf$，其中 $K$ 是上面的积分算子。若能理解 $K$ 的谱，就能判断原边值问题何时可解。

核的连续性使积分输出比输入更规整。这种规整性在函数空间中表现为紧性，进而产生离散谱。一维模型将积分方程与紧算子的联系具体算出来。

## 2. 紧性、全连续性与有限秩逼近 { #section-2 }

!!! definition "紧算子"

    有界线性 $K:X\to Y$ 称紧，若它把有界集合映为相对紧集合。对于 Banach 空间，等价于每个有界序列 $(x_n)$ 都有子列使 $Kx_{n_j}$ 在范数下收敛。

有限秩算子紧；紧算子的和、与有界算子的左右复合仍紧；紧算子在算子范数下的极限仍紧。最后一点用有限 $\varepsilon$ 网证明：先逼近算子，再逼近逼近算子的单位球像。

!!! theorem "Hilbert 空间上的有限秩逼近"

    $K:H\to K_1$ 紧，当且仅当它是有限秩算子的算子范数极限。

??? proof "证明"

    对紧单位球像，选有限 $\varepsilon$ 网 $y_1,\ldots,y_m$，令 $P$ 投影到它们的张成空间。每个 $Kx$ 距此空间至多 $\varepsilon$，故 $\|K-PK\|\le\varepsilon$，且 $PK$ 有限秩。

    反向由范数极限保持紧性。在一般 Banach 值域里，这种有限秩逼近涉及逼近性质，不能不加条件套用。

### 2.1 与弱收敛的关系 { #section-2-1 }

Hilbert 空间中，紧算子将有界弱收敛网变为强收敛网。若 $x_\alpha\rightharpoonup x$，但 $Kx_\alpha$ 没有强趋于 $Kx$，可选一个始终离 $Kx$ 至少 $\varepsilon$ 的子网；紧性再给范数收敛子网，它的弱极限又必须是 $Kx$，矛盾。

反过来，Hilbert 空间中若算子把每个弱收敛序列变为强收敛序列，则它紧：有界序列落在一个可分 Hilbert 子空间内，存在弱收敛子列，输出便有强收敛子列。

!!! warning "全连续不总等于紧"

    Banach 空间中，“弱收敛序列映为强收敛序列”常称全连续。它在 Hilbert 空间中等价于紧性，但一般不等价。例如 $\ell^1$ 有 Schur 性质，其恒等算子满足这项序列性质，却在无限维时不紧。

还可以研究半双线性形式 $a(y,x)=\langle y,Kx\rangle$ 在两个弱单位球乘积上的联合连续性。紧 $K$ 给出该连续性：把差写成 $\langle y_\alpha,K(x_\alpha-x)\rangle+\langle y_\alpha-y,Kx\rangle$。反向利用弱单位球紧性，把联合连续性转化为对全部单位 $y$ 的统一控制，得到 $K$ 的弱到强连续性。

### 2.2 积分核与 Hilbert–Schmidt 类 { #section-2-2 }

设 $X,Y$ 是 $\sigma$-有限测度空间。若 $k\in L^2(X\times Y)$，则

$$
(Kf)(x)=\int_Yk(x,y)f(y)\,\mathrm d\mu(y),
\qquad\|Kf\|_2\le\|k\|_{L^2(X\times Y)}\|f\|_2.
$$

把核在 $L^2$ 中用有限个乘积函数 $a_j(x)b_j(y)$ 逼近，产生有限秩算子的范数逼近，所以 $K$ 紧。连续核在紧区域上是常见例子。

!!! note "两个 Hilbert–Schmidt 用法"

    紧自伴算子的对角化常称 Hilbert–Schmidt 定理；Hilbert–Schmidt **算子类**则要求奇异值平方可和。后者比紧性强。例如 $Ke_n=n^{-1/2}e_n$ 紧，但 $\sum_n\|Ke_n\|^2=\infty$，并不属于 Hilbert–Schmidt 类。

## 3. 紧自伴谱定理 { #section-3 }

!!! theorem "紧自伴算子的离散谱"

    设 $K=K^*$ 紧。存在非零特征值 $\lambda_n\in\mathbb R$ 及标准正交特征向量 $e_n$，使

    $$
    H=\ker K\oplus\overline{\operatorname{span}\{e_n\}},
    \qquad Kx=\sum_n\lambda_n\langle e_n,x\rangle e_n.
    $$

    每个非零特征值的重数有限；若非零特征值无限多个，则 $\lambda_n\to0$。核可以无限维。

??? proof "证明：极值产生第一个特征向量，再递归"

    对自伴 $K$，$\|K\|=\sup_{\|x\|=1}|\langle x,Kx\rangle|$，可由第五章谱演算得到，也可用 Hermitian 形式的极化估计证明。

    若 $K\ne0$，选一列单位向量使二次型的绝对值趋于 $\|K\|$，再固定其正负号。取弱收敛子列 $x_n\rightharpoonup x$；紧性使 $Kx_n\to Kx$，所以二次型趋于 $\langle x,Kx\rangle$。下半连续性给出 $\|x\|\le1$，但达到非零极值迫使 $\|x\|=1$。

    在单位球面上对二次型沿正交方向变分，得到 $Kx=\lambda x$，其中 $|\lambda|=\|K\|$。其正交补约化 $K$，继续递归取得特征向量。

    非零特征空间不能无限维，否则其中的正交单位列被映为距离不趋于零的序列，违反紧性。同样，无穷多个特征值不能保持 $|\lambda_n|\ge\varepsilon$，因此趋于零。

    每一步选择剩余算子的最大绝对特征值，故去掉前 $n$ 项后剩余算子的范数趋于零。最终的正交补上 $K=0$，得到展开式。

因此紧自伴算子的非零谱都是特征值，只有 $0$ 可能是聚点。紧正规算子也有类似复特征值展开：其 $|\lambda|\ge\varepsilon$ 的谱子空间必须有限维，否则该子空间上 $K$ 有有界逆而仍紧，迫使恒等算子紧；把这些有限维子空间合起来即可得到正规版本。

## 4. 紧三角矩阵与非自伴问题 { #section-4 }

紧算子未必自伴。积分核不对称时，这一点自然发生。若在某正交基下 $K$ 是上三角紧矩阵，则对角元 $a_{nn}\to0$，因为 $e_n\rightharpoonup0$ 且 $Ke_n\to0$。

其非零谱恰是非零对角值。理由是有限前缀子空间不变，有限块的特征值就是对角元；另一方面，对充分大 $n$，尾部压缩 $C_n=(I-P_n)K(I-P_n)$ 的范数任意小。若 $\lambda\ne0$ 不等于任何对角值，分块

$$
\lambda I-K=
\begin{pmatrix}\lambda I-K_n&-B_n\\0&\lambda I-C_n\end{pmatrix}
$$

的两个对角块均可逆，故全算子可逆。

这里是对已给出的三角表示讨论性质，并非宣称每个紧算子都能由一组特征向量对角化。非正规紧算子可能有 Jordan 型结构，甚至所有非零特征值都不存在。

## 5. Fredholm 二择一 { #section-5 }

考虑 $A=I-K$，其中 $K$ 紧。方程可能受有限维共振阻碍，但不会出现任意多独立的坏方向。

!!! theorem "Hilbert 空间中的 Fredholm 二择一"

    $\ker(I-K)$、$\ker(I-K^*)$ 有限维且维数相等，$\operatorname{Ran}(I-K)$ 闭，并且

    $$
    (I-K)u=f\text{ 可解}
    \quad\Longleftrightarrow\quad
    f\perp\ker(I-K^*).
    $$

    若核为零，方程对每个 $f$ 有唯一解且逆有界；若核非零，可解时解相差一个核向量。$I-\lambda K$ 也有同样结论。

??? proof "证明：把困难压到一个有限维块"

    在 Hilbert 空间中选有限秩 $F$，使 $K=F+R$、$\|R\|<1$。则

    $$
    I-K=(I-R)(I-G),\qquad G=(I-R)^{-1}F
    $$

    有限秩。第一因子有界可逆。令 $M=\operatorname{Ran}G$，按 $H=M\oplus M^\perp$ 写

    $$
    I-G=\begin{pmatrix}I-G_{11}&-G_{12}\\0&I\end{pmatrix}.
    $$

    用有界可逆行变换消去右上块，便得到 $\operatorname{diag}(I-G_{11},I)$。因此核、余核有限维且相等，像闭。乘可逆算子保留这些性质。

    对任意有界算子，$\operatorname{Ran}A^\perp=\ker A^*$；像闭后得到 $\operatorname{Ran}A=(\ker A^*)^\perp$，给出可解条件。核为零时余核也为零，故双射；上述因子分解同时给出有界逆。

在一般 Banach 空间，仍有紧算子的 Riesz–Schauder 二择一：$I-K$ 单射当且仅当满射。单射时首先通过紧性证明 $\|Ax\|\ge c\|x\|$。若仍不满射，闭子空间 $A^nX$ 严格递减，Riesz 引理可从中取单位向量，使其 $K$ 像两两分离，违反紧性。满射而不单射时，对严格递增的 $\ker A^n$ 用同样方法得到矛盾。这里不需要假定一般 Banach 紧算子可作有限秩范数逼近。

!!! example "共振条件"

    若 $K=K^*$ 且 $Ke_j=\mu_je_j$，方程 $(I-\lambda K)u=f$ 在各谱方向上变为

    $$
    (1-\lambda\mu_j)u_j=f_j.
    $$

    当 $\lambda\mu_j=1$ 时，必须有 $f_j=0$，该方向的解系数任意。这就是抽象正交可解条件。

## 6. 紧预解式：无界算子的离散谱 { #section-6 }

!!! definition "紧预解式"

    闭算子 $A$ 若存在 $z\in\rho(A)$ 使 $(zI-A)^{-1}$ 紧，称具有紧预解式。预解恒等式说明一个预解式紧，就使所有预解式紧。

    在 $\rho(A)\ne\varnothing$ 的前提下，等价条件是嵌入 $D(A)$ 的图范数空间到 $H$ 紧。因为 $zI-A$ 给出图空间到 $H$ 的有界同构，嵌入与预解式通过这个同构互相转换。自伴算子的非实预解集总非空，可以直接使用此刻画。

!!! example "图空间紧嵌入仍需检查预解集"

    在 $L^2(0,1)$ 中，取 $A=-i\,d/dx$、$D(A)=H^1(0,1)$，不加边界条件。图空间紧嵌入 $L^2$，但每个 $z\in\mathbb C$ 都有非零特征函数 $e^{izx}$，所以 $\rho(A)=\varnothing$。因此不能只凭图空间的紧嵌入就称一个任意闭算子具有紧预解式。

!!! theorem "下有界自伴算子的紧谱"

    若自伴 $A\ge cI$ 有紧预解式，则存在正交特征基，特征值具有有限重数，在无限维情形可排序为 $\lambda_n\to+\infty$。定义域为

    $$
    D(A)=\left\{x:\sum_n\lambda_n^2|\langle e_n,x\rangle|^2<\infty\right\}.
    $$

??? proof "证明"

    取 $a$ 使 $A+aI\ge I$。$R=(A+aI)^{-1}$ 是紧正自伴单射，且像稠密。紧谱定理给出正交特征基，$Re_n=\mu_ne_n$、$\mu_n>0$、$\mu_n\to0$。

    因此 $Ae_n=(\mu_n^{-1}-a)e_n$，得到 $\lambda_n\to\infty$。图范数中的平方和给出定义域。一般不下有界的自伴情形，可使用紧正规预解式，同样得到实离散谱，但只能保证特征值的绝对值趋于无穷。

注意这里的紧算子是预解式，$A$ 本身通常无界，不能称它为“紧算子”。

## 7. Rellich 紧性与椭圆方程 { #section-7 }

### 7.1 为什么有界区域上有紧嵌入 { #section-7-1 }

!!! theorem "Rellich 紧嵌入：Dirichlet 版本"

    若 $\Omega\subset\mathbb R^d$ 有界开，则 $H_0^1(\Omega)\hookrightarrow L^2(\Omega)$ 紧。此版本不要求边界光滑。

??? proof "证明：零延拓、平移估计与光滑化"

    将 $u\in H_0^1$ 零延拓到整空间，所有延拓支撑在同一有界盒子中。由沿线积分和密度有

    $$
    \|u(\cdot+h)-u\|_2\le|h|\|\nabla u\|_2.
    $$

    因此对标准光滑核 $\rho_\varepsilon$，有 $\|u-\rho_\varepsilon*u\|_2\le C\varepsilon\|\nabla u\|_2$，误差在 $H_0^1$ 有界集上统一小。

    固定 $\varepsilon$ 后，Cauchy–Schwarz 控制光滑化函数及导数的一致范数，支撑仍在固定紧盒子中，Arzelà–Ascoli 给出相对紧性，进而得到 $L^2$ 相对紧性。再让光滑化误差小于任意 $\delta$，原集合全有界，完成证明。

若使用 $H^1(\Omega)$ 而非 $H_0^1$，零延拓不再自动合法。常用的 Neumann 版本假设 $\Omega$ 有界且边界 Lipschitz，以便使用有界延拓算子。

### 7.2 Poincaré 不等式与 Poisson 问题 { #section-7-2 }

把 $\Omega$ 包含在宽度为 $L$ 的盒子中，对零延拓的紧支撑光滑函数沿第一坐标积分，Cauchy–Schwarz 给出

$$
\|u\|_2\le L\|\partial_1u\|_2\le L\|\nabla u\|_2,
\qquad u\in H_0^1(\Omega).
$$

这是 Poincaré 不等式。它使梯度能量成为 $H_0^1$ 上等价的 Hilbert 范数。

对 $f\in L^2$，弱解满足

$$
\int_\Omega\overline{\nabla v}\cdot\nabla u
=\int_\Omega\overline v f,
\qquad v\in H_0^1.
$$

Riesz 或下面的 Lax–Milgram 定理给出唯一 $u$ 和能量估计。解算子把 $L^2$ 有界集映为 $H_0^1$ 有界集，再由 Rellich 得到 $L^2$ 中的紧像。因此 $A_D^{-1}$ 紧，Dirichlet Laplacian 有正离散特征值及 $L^2$ 正交特征基。

对 Neumann 问题，在连通有界 Lipschitz 区域上常数属于核。方程可解需 $\int f=0$，解需指定均值才能唯一；不连通时须在每个分支满足相应条件。

### 7.3 Lax–Milgram 与 Céa 估计 { #section-7-3 }

!!! theorem "Lax–Milgram 定理"

    在 Hilbert 空间 $V$ 上，设 $a$ 是有界半双线性形式，且

    $$
    |a(u,v)|\le M\|u\|_V\|v\|_V,
    \qquad\operatorname{Re}a(v,v)\ge\alpha\|v\|_V^2,\quad\alpha>0.
    $$

    则对每个线性 $\ell\in V^*$，存在唯一 $u$ 使 $a(u,v)=\ell(v)$ 对全部 $v$ 成立，且 $\|u\|_V\le\|\ell\|/\alpha$。实空间中去掉实部和共轭即可。

??? proof "证明"

    按第三章的 Riesz 表示，写 $a(u,v)=\langle Au,v\rangle$、$\ell(v)=\langle g,v\rangle$，$A$ 是有界线性算子。强制性给出 $\|Au\|\ge\alpha\|u\|$，所以核为零、像闭。

    又有 $\operatorname{Re}\langle A^*v,v\rangle=\operatorname{Re}\langle Av,v\rangle\ge\alpha\|v\|^2$，所以 $\ker A^*=0$，像的正交补为零。像闭且稠密，故等于 $V$。于是 $Au=g$ 唯一可解，估计直接由下界得到。

!!! theorem "Céa 误差估计"

    若闭子空间 $V_h\subset V$ 上的 Galerkin 解满足 $a(u_h,v_h)=\ell(v_h)$，则

    $$
    \|u-u_h\|_V\le\frac M\alpha\inf_{v_h\in V_h}\|u-v_h\|_V.
    $$

??? proof "证明"

    误差 $e=u-u_h$ 满足 $a(e,v_h)=0$。对任意 $v_h\in V_h$，

    $$
    \alpha\|e\|_V^2\le\operatorname{Re}a(e,e)
    =\operatorname{Re}a(e,u-v_h)\le M\|e\|_V\|u-v_h\|_V.
    $$

    约去误差范数并取下确界。对称正形式的能量范数下，最佳逼近常数可取 $1$，就是第三章的正交投影结论。

这与数值 PDE 笔记的关系很具体：空间近似误差由插值估计控制，稳定性由 $\alpha$ 控制，两者结合得到整体收敛误差。

## 8. 一维 Dirichlet 问题算到底 { #section-8 }

对 $A=-u''$、$u(0)=u(1)=0$，特征基为

$$
e_n(x)=\sqrt2\sin(n\pi x),\qquad\lambda_n=n^2\pi^2.
$$

若 $f=\sum_nf_ne_n$，则

$$
u=A^{-1}f=\sum_n\frac{f_n}{n^2\pi^2}e_n,
\qquad\|u\|_2\le\pi^{-2}\|f\|_2.
$$

这与开头的 Green 核表示是同一个逆算子的两种写法。对于 $(A-\lambda I)u=f$，若 $\lambda=n^2\pi^2$，需对应 $f_n=0$ 才可解；否则按 $u_n=f_n/(\lambda_n-\lambda)$ 求解。

一般椭圆问题未必能显式求特征函数，但紧性仍保证离散谱结构。数值离散得到的矩阵谱，是对这个无限维谱问题的逼近。

## 9. 全连续形式、紧算子与有限秩逼近 { #section-9 }

本节 $H,K$ 为 Hilbert 空间，$V,W$ 为一般赋范空间。Hilbert 空间中紧性、全连续性与有限秩可逼近性等价；一般 Banach 空间中不能不加条件照搬最后一个等价关系。

### 联合弱连续性控制有限截断 { #topic-8-2-1 }

全连续形式在两个弱单位球上联合连续。弱紧性使这种连续性变成对有限矩阵截断的统一控制，平方可积核于是可由有限秩核范数逼近。

!!! definition "定义 8.2.1：全连续形式"

    半双线性形式 $\omega:K\times H\to\mathbb C$ 全连续，指其在两个闭单位球的乘积上，相对于两侧弱拓扑联合连续。此条件自动保证形式有界。

!!! theorem "命题 8.2.3：伴随保持全连续性"

    全连续形式的伴随 $\omega^*(\xi,\eta)=\overline{\omega(\eta,\xi)}$ 仍全连续。

??? proof "证明 8.2.3"

    交换两变量是弱单位球乘积上的连续映射，复共轭是标量连续映射。将它们与原全连续形式复合，得到伴随形式的联合连续性。

!!! definition "定义 8.2.4：有限秩形式"

    有限个形式 $\omega_{\psi,\phi}(\eta,\xi)=\langle\eta,\psi\rangle\langle\phi,\xi\rangle$ 的线性组合称有限秩形式，其中 $\psi\in K,\phi\in H$。

!!! theorem "定理 8.2.5：有限秩形式全连续"

    每个有限秩形式全连续，因为有限个内积坐标均为弱连续函数。

??? proof "证明 8.2.5"

    固定向量的内积坐标是弱连续函数；两个标量坐标的乘积连续，有限线性组合仍连续。所以每个有限秩形式全连续。

!!! theorem "定理 8.2.6：全连续形式的范数闭性"

    全连续形式的算子范数收敛网，其极限仍全连续。

??? proof "证明 8.2.6"

    单位球乘积上 $|\omega_\alpha-\omega|\leq\|\omega_\alpha-\omega\|$，故形式范数收敛就是该紧空间上的一致收敛。连续标量函数的一致极限连续，得到全连续性。

!!! definition "定义 8.2.7：可逼近形式"

    全连续形式的范数极限称可逼近形式，使用网或序列等价。结合下述有限截断判据，这也等价于能够被有限秩形式范数逼近。

!!! theorem "推论 8.2.8：可逼近形式全连续"

    可逼近形式全连续。

??? proof "证明 8.2.8"

    按可逼近定义取全连续逼近网，直接用 8.2.6；若以有限秩逼近作为等价定义，则先用 8.2.5，再用同一范数闭性。

!!! theorem "定理 8.2.9：有限矩阵截断判据"

    相对于两侧标准正交基，令 $\omega_{I,J}(\eta,\xi)=\sum_{i\in I,j\in J}\omega(e_i,f_j)\langle\eta,e_i\rangle\langle f_j,\xi\rangle$。形式全连续当且仅当 $\|\omega-\omega_{I,J}\|\to0$，其中 $I,J$ 遍历有限指标集。

??? proof "证明 8.2.9"

    有限截断写成 $\omega_{I,J}(\eta,\xi)=\omega(P_I\eta,Q_J\xi)$。正交基完备使 $P_I,Q_J$ 强趋于单位，投影自伴且范数至多一，故 8.2.10 给范数收敛。反向，截断有限秩且全连续，范数闭性给原形式全连续。8.2.10 的证明如下，直接使用弱紧性而不依赖此截断结论。

!!! theorem "引理 8.2.10：全连续形式与强收敛因子"

    若 $A_\alpha^*\to A^*$、$B_\alpha^*\to B^*$ 为 SOT 收敛，且两族一致有界，则对全连续 $\omega$，形式 $(\eta,\xi)\mapsto\omega(A_\alpha\eta,B_\alpha\xi)$ 范数趋于 $\omega(A\eta,B\xi)$。

??? proof "证明 8.2.10"

    若范数收敛失败，可选子网和单位向量 $\eta_\alpha,\xi_\alpha$ 使误差绝对值有固定正下界。弱单位球的乘积紧，进一步取子网使它们分别弱趋于 $\eta,\xi$。对固定测试 $v$，

    $$
    \langle v,A_\alpha\eta_\alpha\rangle
    =\langle A_\alpha^*v,\eta_\alpha\rangle
    \to\langle A^*v,\eta\rangle.
    $$

    因为前一因子范数收敛，后一因子一致有界；$B_\alpha\xi_\alpha$ 同理。两像网由统一算子界位于固定倍数的弱单位球，全连续性遂给 $\omega(A_\alpha\eta_\alpha,B_\alpha\xi_\alpha)\to\omega(A\eta,B\xi)$。固定 $A,B$ 的弱连续性也给 $\omega(A\eta_\alpha,B\xi_\alpha)$ 趋于同一值，矛盾。

!!! theorem "引理 8.2.11：测试可变弱向量"

    闭单位球中的 $\phi_\alpha$ 范数趋于 $\phi$，当且仅当每个同指标、同样位于闭单位球中的弱收敛网 $\xi_\alpha\rightharpoonup\xi$ 都满足 $\langle\phi_\alpha,\xi_\alpha\rangle\to\langle\phi,\xi\rangle$。

??? proof "证明 8.2.11"

    范数收敛时

    $$
    |\langle\phi_\alpha,\xi_\alpha\rangle-\langle\phi,\xi\rangle|
    \leq\|\phi_\alpha-\phi\|+|\langle\phi,\xi_\alpha-\xi\rangle|\to0.
    $$

    反向，先取全部常值测试网得 $\phi_\alpha\rightharpoonup\phi$，再取 $\xi_\alpha=\phi_\alpha$ 得 $\|\phi_\alpha\|^2\to\|\phi\|^2$。弱收敛与范数收敛的 Hilbert 判据给强收敛。

!!! theorem "命题 8.2.12：乘积空间的正交基"

    若 $X,Y$ 局部紧 Hausdorff，$\mu,\nu$ 为 $\sigma$-有限 Radon 测度，则两个 $L^2$ 标准正交基的乘积 $e_i(x)f_j(y)$ 构成 $L^2(X\times Y,\mu\times\nu)$ 的标准正交基。

??? proof "证明 8.2.12"

    Fubini 使乘积族的内积分解，故标准正交。完备性可先用有限测度矩形指标：这些指标的有限线性组合在乘积 $L^2$ 稠密，而各因子可由各自正交基有限和逼近，乘积误差用 $\|uv\|_{L^2(\mu\times\nu)}=\|u\|_2\|v\|_2$ 控制。$\sigma$-有限性允许先截到有限测度矩形。故乘积族线性稠密。

!!! theorem "定理 8.2.13：平方可积核"

    在上述测度条件下，$K\in L^2(X\times Y)$ 定义的 $\omega(f,g)=\int\overline{f(x)}K(x,y)g(y)\,d\mu(x)d\nu(y)$ 全连续，且 $\|\omega\|\leq\|K\|_2$；两种迭代积分均有意义且相同。

??? proof "证明 8.2.13"

    $\bar f(x)g(y)$ 的乘积 $L^2$ 范数为 $\|f\|_2\|g\|_2$，Cauchy–Schwarz 使三因子积分绝对可积并给形式范数界。8.2.12 将 $K$ 以有限个乘积基函数在 $L^2$ 中逼近，对应形式有限秩；误差形式范数至多为核的 $L^2$ 误差，所以原形式全连续。绝对可积性同时允许两种迭代次序。

### 用弱紧性取得特征方向 { #topic-8-3-1 }

自伴二次型在弱单位球上达到极值，正形式的零向量判据把极值向量变成特征向量。反复在正交补上进行，非零特征值就会趋于零。

!!! theorem "定理 8.3.1：Hilbert–Schmidt 自伴谱定理"

    $T$ 的形式 Hermitian 且全连续，当且仅当 $H$ 有标准正交基 $(e_n)\cup(f_j)$，其中 $Te_n=\lambda_ne_n$、$\lambda_n\in\mathbb R\setminus\{0\}$，$Tf_j=0$，非零部分至多可数，若无限则 $\lambda_n\to0$。

??? proof "证明 8.3.1"

    全连续 Hermitian 形式的 $|\langle\xi,T\xi\rangle|$ 在弱紧单位球上达到最大值。若 $T\ne0$，极值向量可归一化为 $e_1$，值为 $\lambda_1\ne0$。选正极值情形，则 $\lambda_1 I-T\geq0$ 且在 $e_1$ 上二次型为零；正形式 Cauchy–Schwarz 迫使 $(\lambda_1-T)e_1=0$。负极值对 $-T$ 同理。

    $e_1^\perp$ 约化 $T$，在该空间重复极值构造，得到标准正交特征序列。若无限，则 $e_n\rightharpoonup0$，全连续性给 $\lambda_n=\langle e_n,Te_n\rangle\to0$。每一步剩余空间的二次型绝对值由当前极值控制，极化估计使剩余算子范数趋零，所以所有 $e_n$ 的正交补上 $T=0$。补上其正交基得到结论。

    反向取有限谱截断 $T_N=\sum_{n\leq N}\lambda_nP_{e_n}$，有 $\|T-T_N\|\leq\sup_{n>N}|\lambda_n|\to0$。各截断自伴有限秩，故极限的形式 Hermitian 且全连续。

### 把弱输入变成强输出 { #topic-8-4-1 }

Hilbert 单位球弱紧，所以全连续映射等价于紧映射。一般赋范空间中则直接以单位球像的相对紧性定义紧算子，有限秩和范数逼近给出基本例子。

!!! definition "定义 8.4.1：全连续映射"

    线性 $T:H\to K$ 全连续，指其闭单位球上的限制由弱拓扑到值域范数拓扑连续；它自动有界。

!!! theorem "命题 8.4.2：有界映射的弱连续性"

    有界线性 $T:H\to K$ 在两侧都取弱拓扑时连续。

??? proof "证明 8.4.2"

    每个目标弱测试 $\eta$ 的复合为 $\langle\eta,T\xi\rangle=\langle T^*\eta,\xi\rangle$，是源空间弱连续函数。弱拓扑由全部这类测试诱导，所以 $T$ 弱连续。

!!! theorem "命题 8.4.3：形式与映射的全连续性"

    线性 $T:H\to K$ 全连续当且仅当其形式 $\omega_T(\eta,\xi)=\langle\eta,T\xi\rangle$ 全连续。

??? proof "证明 8.4.3"

    若 $T$ 将弱单位球连续映到范数空间，两个变量变化时将配对误差拆为弱测试误差与 $T\xi$ 的范数误差，得到形式联合连续。反向形式联合连续时，对每个 $\xi_\alpha\rightharpoonup\xi$，向量 $T\xi_\alpha$ 弱趋于 $T\xi$，且与任意可变弱单位球测试配对均收敛。缩放后用 8.2.11 得 $T\xi_\alpha\to T\xi$ 于范数，故全连续。

!!! definition "定义 8.4.4：紧算子"

    线性 $T:V\to W$ 紧，指单位球的像相对紧；等价于每个有界网的像有范数收敛子网，或每个有界序列的像有范数收敛子列。该条件自动保证有界。

!!! theorem "定理 8.4.7：Hilbert 空间中的三个等价条件"

    $T$ 紧、$T$ 全连续、$\omega_T$ 全连续，三者等价。

??? proof "证明 8.4.7"

    全连续映射把弱紧单位球连续映到范数紧集，因而紧。反向若 $T$ 紧且 $\xi_\alpha\rightharpoonup\xi$ 于单位球，若像不范数趋于 $T\xi$，取误差有正下界的子网；紧性再给像的范数收敛子网。8.4.2 强制其弱极限是 $T\xi$，矛盾。故紧蕴含全连续，再用 8.4.3 得三者等价。

!!! theorem "推论 8.4.8：紧伴随"

    Hilbert 空间间紧算子的伴随仍紧。

??? proof "证明 8.4.8"

    紧 $T$ 的形式全连续，8.2.3 使 $T^*$ 的形式全连续，8.4.7 再得 $T^*$ 紧。这个证明同时解释了为何此处使用 Hilbert 结构。

!!! definition "定义 8.4.11：有限秩算子"

    有界且像有限维的线性映射称有限秩算子。像有限维的纯代数映射若不连续，不在此定义之内。

!!! theorem "命题 8.4.12：有限秩的向量表达"

    Hilbert 空间间 $T$ 有限秩，当且仅当 $\omega_T$ 有限秩，也当且仅当 $T\xi=\sum_{j=1}^n\psi_j\langle\phi_j,\xi\rangle$。

??? proof "证明 8.4.12"

    有限秩 $T$ 的像取标准正交基 $\psi_1,\ldots,\psi_n$，令 $\phi_j=T^*\psi_j$，则 $T\xi=\sum_j\psi_j\langle\phi_j,\xi\rangle$。这种表达立即给有限秩形式。反向给定这种形式表达，非退化内积迫使 $T$ 具有对应向量表达，像于是有限维。

!!! theorem "定理 8.4.13：有限秩即紧"

    一般赋范空间间的有限秩算子紧。

??? proof "证明 8.4.13"

    有限秩有界算子的单位球像有界，位于有限维像空间。8.4.14 给该空间中闭有界集紧，故像相对紧。

!!! theorem "定理 8.4.14：有限维范数与紧性"

    有限维实或复向量空间的全部范数等价；有界闭子集紧，空间完备。

??? proof "证明 8.4.14"

    取基并以欧氏范数比较。三角不等式给任意范数的欧氏上界；欧氏单位球面紧且范数连续，其正的最小值给下界。范数等价后，欧氏空间的 Heine–Borel 与完备性转移到任意范数。任意两个范数都与欧氏范数等价，故互相等价。

!!! theorem "定理 8.4.15：紧算子的范数闭性"

    若值域 $W$ 完备，紧算子网 $T_\alpha:V\to W$ 范数趋于 $T$，则 $T$ 紧。

??? proof "证明 8.4.15"

    给定 $\varepsilon>0$，取紧 $T_\alpha$ 使 $\|T-T_\alpha\|<\varepsilon/3$，再用 $T_\alpha$ 单位球像的有限 $\varepsilon/3$ 网覆盖。相同中心成为 $T$ 单位球像的有限 $\varepsilon$ 网，故像全有界。目标完备使其闭包完备且全有界，因此紧。

!!! definition "定义 8.4.16：可逼近算子"

    有限秩算子的算子范数闭包中的元素称可逼近算子；用网或序列逼近等价。

!!! theorem "推论 8.4.17：可逼近性蕴含紧性"

    值域完备时，每个可逼近算子紧。

??? proof "证明 8.4.17"

    取有限秩算子网 $T_\alpha$ 范数趋于给定可逼近算子 $T$。8.4.13 使每个 $T_\alpha$ 紧，目标完备允许应用 8.4.15，故其范数极限 $T$ 仍紧。

??? proof "从紧性得到有限秩逼近"

    Hilbert 空间中，紧像的有限 $\varepsilon$ 网张成有限维子空间 $M$。令 $P_M$ 为其投影，则对单位球中的 $\xi$，$\|(1-P_M)T\xi\|\leq\varepsilon$，所以 $P_MT$ 有限秩且范数逼近 $T$。伴随紧性后，再在定义域作有限投影，得到两侧有限截断的范数收敛。

    对平方可积核，乘积正交基使核可由有限个乘积函数在 $L^2$ 中逼近。核误差控制算子范数误差，因此积分形式是有限秩形式的范数极限。一般赋范空间中的范数闭性则由对角抽取像序列和值域完备性证明；若值域不完备，得到的 Cauchy 极限可能落在完备化中。

## 10. 非零谱、子空间链与 Fredholm 理论 { #section-10 }

### 非零近似谱值必须成为特征值 { #topic-8-5-3 }

紧性先让像收敛；非零标量再从像与小残差恢复输入的收敛。这就是紧算子把非零近似特征值转成真正特征值的机制。

!!! theorem "引理 8.5.3：自伴范数是近似谱值"

    有界自伴 $A$ 的 $\|A\|$ 和 $-\|A\|$ 中至少一个为近似特征值。

??? proof "证明 8.5.3"

    自伴算子的范数等于单位球上二次型绝对值上确界，取单位向量 $\xi_n$ 使二次型趋于 $\lambda=\|A\|$ 或 $-\|A\|$。正算子 $B=\lambda I-A$（负端点改对 $-A$ 处理）满足 $\|B\xi\|^2\leq\|B\|\langle\xi,B\xi\rangle$，故 $\|(A-\lambda)\xi_n\|\to0$。所以至少一个端点是近似特征值。

!!! theorem "定理 8.5.4：紧算子的近似特征值"

    对紧 $A:V\to V$ 和 $\lambda\ne0$，$\lambda$ 为特征值当且仅当为近似特征值；不要求 $V$ 完备。

??? proof "证明 8.5.4"

    特征值当然是近似特征值。反向取单位 $\xi_n$ 使 $(A-\lambda)\xi_n\to0$；紧性给子列 $A\xi_n\to\eta$。因 $\lambda\ne0$，$\xi_n=\lambda^{-1}[A\xi_n-(A-\lambda)\xi_n]\to\lambda^{-1}\eta$，极限在空间内且范数为一。连续性给 $A\xi=\lambda\xi$，不需要源空间完备。

### 紧性阻止无限严格三角链 { #topic-8-6-3 }

在严格递增或递减子空间链中选近似正交单位向量，三角条件会使它们的像保持分离。紧性不允许这种无限分离，除非相应标量趋于零。

!!! theorem "定理 8.6.3：递增链上的三角行为"

    若闭子空间严格递增 $V_0\subsetneq V_1\subsetneq\cdots$，紧 $T$ 满足 $(T-\lambda_n)V_n\subset V_{n-1}$，则 $\lambda_n\to0$。

??? proof "证明 8.6.3"

    Riesz 引理选单位 $e_n\in V_n$，使 $\operatorname{dist}(e_n,V_{n-1})\geq1/2$。若 $m<n$，三角条件给 $Te_n-Te_m=\lambda_ne_n+v$，$v\in V_{n-1}$，故 $\|Te_n-Te_m\|\geq|\lambda_n|/2$。若 $\lambda_n$ 不趋零，可取其绝对值有正下界的子列，像之间不能 Cauchy，违反紧性。

    Hilbert 空间还可取 $e_n\perp V_{n-1}$，它们标准正交并弱趋零；全连续性使 $Te_n\to0$，而 $\|Te_n\|\geq|\lambda_n|$，直接得到结论。

!!! definition "定义 8.6.4：近似正交"

    $\xi$ 与子空间 $U$ 为 $\varepsilon$-正交，指 $\operatorname{dist}(\xi,U)\geq(1-\varepsilon)\|\xi\|$。

!!! theorem "定理 8.6.5：Riesz 引理"

    若 $U$ 为真闭线性子空间，给定 $\psi\notin U$ 和 $0<\varepsilon<1$，存在非零 $\xi\in\psi+U$ 与 $U$ 为 $\varepsilon$-正交。

??? proof "证明 8.6.5"

    令 $d=\operatorname{dist}(\psi,U)>0$，取 $u\in U$ 使 $\|\psi-u\|<d/(1-\varepsilon)$，设 $\xi=\psi-u$。它仍在 $\psi+U$，且 $\operatorname{dist}(\xi,U)=d>(1-\varepsilon)\|\xi\|$，所以满足要求。

!!! theorem "定理 8.6.7：递减链上的三角行为"

    若闭子空间严格递减 $V_1\supsetneq V_2\supsetneq\cdots$，紧 $T$ 满足 $(T-\lambda_n)V_n\subset V_{n+1}$，则 $\lambda_n\to0$。

??? proof "证明 8.6.7"

    选单位 $e_n\in V_n$，距离 $V_{n+1}$ 至少为 $1/2$。对 $n<m$，三角条件给 $Te_n-Te_m=\lambda_ne_n+v$，$v\in V_{n+1}$，故距离至少 $|\lambda_n|/2$。若存在绝对值有正下界的无限子列，其紧像不能 Cauchy，矛盾。Hilbert 情形也可将递减链的正交补转成递增链，并对紧伴随用 8.6.3。

!!! theorem "推论 8.6.9：非稳定递增链"

    若递增闭子空间链不最终稳定，且 $(T-\lambda_n)V_n\subset V_{n-1}$，则 $\liminf_n|\lambda_n|=0$。

??? proof "证明 8.6.9"

    若 $\liminf|\lambda_n|>0$，所有充分大的标量有统一正下界。取所有严格增长位置形成严格递增子链；在增长位置，原三角条件将算子送入前一不同子空间，故 8.6.3 强制该子列标量趋零，矛盾。因此链若不稳定只能有零下极限。

!!! theorem "推论 8.6.10：非稳定递减链"

    若递减闭子空间链不最终稳定，且 $(T-\lambda_n)V_n\subset V_{n+1}$，则 $\liminf_n|\lambda_n|=0$。

??? proof "证明 8.6.10"

    取所有严格下降位置构成子链，原条件仍将该位置空间送入下一个不同空间。若标量最终有统一正下界，8.6.7 给矛盾；所以不稳定链要求 $\liminf|\lambda_n|=0$。

### 从链稳定到 Fredholm 二择一 { #topic-8-7-1 }

核链和像链将单射、满射的失败转成三角链。非零参数使这些链必须稳定，再配合像的正下界与完备性，得到有界逆和有限维障碍。

!!! definition "定义 8.7.1：赋范空间算子的谱"

    对 $T\in\mathcal L(V)$，定义 $\sigma(T)=\{\lambda\in\mathbb F:T-\lambda I\text{ 在 }\mathcal L(V)\text{ 中不可逆}\}$。实空间时此处只讨论实标量谱，复化后的复谱另行定义。

!!! theorem "定理 8.7.2：Fredholm 二择一"

    若 $V$ 完备、$T$ 紧、$\lambda\ne0$，则 $\ker(T-\lambda)=0$、$\lambda\notin\sigma(T)$、$\operatorname{ran}(T-\lambda)=V$ 三者等价。故非零谱点恰为非零特征值。

??? proof "证明 8.7.2"

    令 $A=T-\lambda$。若单射，8.5.4 排除零下界失效，即有 $\|A\xi\|\geq c\|\xi\|$。完备性使各 $A^nV$ 闭。若 $A$ 不满射，单射性使这些像严格递减，且 $(T-\lambda)A^nV=A^{n+1}V$；8.6.7 强制 $\lambda=0$，矛盾。因此满射，正下界给逆有界。

    反向若满射而核非零，可从非零核向量逐次取原像，使 $\ker A^n$ 严格递增，违反 8.7.3。可逆自然同时单射、满射，所以三个条件等价。

!!! theorem "命题 8.7.3：广义特征核稳定"

    紧 $T$ 与 $\lambda\ne0$ 存在 $n$，使 $\ker(T-\lambda)^n=\ker(T-\lambda)^{n+1}=\cdots$。

??? proof "证明 8.7.3"

    核链闭且递增，满足 $(T-\lambda)\ker(T-\lambda)^n\subset\ker(T-\lambda)^{n-1}$。若不最终稳定，8.6.9 使常数序列 $|\lambda|$ 的下极限为零，矛盾。一次相等后，对 $A\xi\in\ker A^n$ 使用相等条件即可逐步推出后续全部相等。

!!! theorem "命题 8.7.5：广义特征空间有限维"

    对每个有限 $n$ 和 $\lambda\ne0$，$\ker(T-\lambda)^n$ 有限维。

??? proof "证明 8.7.5"

    特征空间上 $T=\lambda I$，紧性使其单位球紧，Riesz 引理遂迫使它有限维。一般幂展开为 $(T-\lambda)^n=(-\lambda)^nI+TK$，其中 $K$ 是有界多项式，$TK$ 紧。其核正是紧算子 $TK$ 的非零特征空间，故也有限维。

!!! theorem "推论 8.7.6：单位球的紧性判据"

    赋范空间有限维当且仅当其闭单位球范数紧。

??? proof "证明 8.7.6"

    有限维方向由 8.4.14。若无限维，递归取单位向量与前面有限维张成距离至少 $1/2$；有限维张成闭，Riesz 引理可用。所得单位球内序列两两距离至少 $1/2$，不可能有收敛子列，所以单位球不紧。

!!! theorem "命题 8.7.8：非零特征值的聚点"

    紧算子的非零特征值在 $\mathbb F\setminus\{0\}$ 中无聚点；无限多个时只能趋于零。

??? proof "证明 8.7.8"

    若不同非零特征值 $\lambda_n$ 聚到非零点，取各特征向量，8.7.9 保证其有限张成 $V_n$ 严格递增且闭。有 $(T-\lambda_n)V_n\subset V_{n-1}$，8.6.3 强制 $\lambda_n\to0$，矛盾。特征值又被 $\|T\|$ 控制，因此每个远离零的区域只有有限多个。

!!! theorem "引理 8.7.9：不同特征值线性独立"

    任意线性算子的不同特征值对应的非零特征向量线性独立，无须范数或完备性。

??? proof "证明 8.7.9"

    对 $n$ 归纳。若 $\sum_{j=1}^nc_je_j=0$，作用 $T-\lambda_n$ 得 $\sum_{j<n}c_j(\lambda_j-\lambda_n)e_j=0$。归纳假设及不同特征值给 $c_j=0$，$j<n$；再由原式给 $c_n=0$。

??? proof "Riesz 引理与子空间链"

    令 $d=\operatorname{dist}(\psi,U)>0$，取 $u\in U$ 使 $\|\psi-u\|<d/(1-\varepsilon)$，令 $\xi=\psi-u$，即得近似正交。对严格递增链，在每个新方向选单位向量 $\xi_n$，与上一子空间距离至少为固定正数。三角条件使不同 $T\xi_n$ 的距离由 $|\lambda_n|$ 下界控制；若它不趋零，就与紧性矛盾。递减链作相反方向的同一比较。

    将此论证用于 $\ker(T-\lambda)^n$ 及闭像链，可排除非零标量下的无限增长或无限下降，得到核稳定和 Fredholm 的单射、满射等价。广义特征空间上 $T=\lambda I+N$ 且 $N$ 幂零，所以 $T$ 有有界的多项式逆；若该空间无限维，单位球会由紧 $T$ 和其逆推出紧性，与 Riesz 引理矛盾。

## 11. 图像紧性、紧预解式与椭圆问题 { #section-11 }

### 让图像单位球的嵌入变紧 { #topic-8-8-1 }

无界算子本身不能直接要求单位球像紧，合适对象是图像域到原空间的嵌入。预解式把图像域与原空间同构，因而将这种紧性转成紧预解式。

!!! definition "定义 8.8.1：紧图像投影"

    $T:H\to K$ 有紧图像投影，指 $\Pi_T:G(T)\to H$ 紧；等价于图像范数下的嵌入 $D(T)\hookrightarrow H$ 紧。不预设定义域稠密或图像闭。

!!! theorem "命题 8.8.2：在核域上检验图像紧性"

    若 $D_0$ 为 $T$ 的核域，则 $T$ 有紧图像投影当且仅当 $T|_{D_0}$ 有此性质。

??? proof "证明 8.8.2"

    图像域中的核域图像稠密，图像投影有界且目标 $H$ 完备。对该稠密限制使用 8.8.3，恰得到所述等价。

!!! theorem "引理 8.8.3：稠密限制与紧性"

    若 $W$ 完备，$A:V\to W$ 有界，$U\subset V$ 线性稠密，则 $A$ 紧当且仅当 $A|_U$ 紧。

??? proof "证明 8.8.3"

    紧性当然传到限制。反向，源单位球中每个向量可用 $U$ 中范数不超过 $1+\delta$ 的向量任意逼近，再用 $A$ 有界控制像误差。因此原单位球像的闭包等于限制单位球像的闭包（归一化后令 $\delta\to0$）。后者紧，故原算子紧。

!!! theorem "命题 8.8.4：图像紧性的小扰动"

    若 $S$ 为 $T$-有界且相对界小于一，则 $T$ 与 $T+S$ 同时具有紧图像投影。

??? proof "证明 8.8.4"

    7.9.7 给 $T$ 与 $T+S$ 的图像范数等价。两个图像域之间的恒等映射及其逆有界，嵌入到 $H$ 只相差这种有界复合。紧算子在有界复合下仍紧，得到同时性。

!!! theorem "定理 8.8.5：紧预解式的三个判据"

    假设 $T$ 的预解集非空，则 $T$ 自动闭，且以下等价：每个预解式紧；某个预解式紧；图像投影紧。满足时称有紧预解式。单独图像紧性不能保证预解集非空。

??? proof "证明 8.8.5"

    处处有界预解式 $R(z,T)$ 的逆图像闭，故 $T$ 闭。映射 $\xi\mapsto(z-T)\xi$ 从图像域到 $H$ 有界可逆：逆的图像范数由 $R$ 和 $TR=zR-I$ 控制。图像嵌入与 $R$ 相差此有界同构，所以某个预解式紧等价于图像嵌入紧。预解式恒等式

    $$
    R(w,T)=R(z,T)+(z-w)R(w,T)R(z,T)
    $$

    又使一个紧预解式推出每个预解式紧。

!!! theorem "推论 8.8.6：紧预解式的小扰动"

    自伴 $T$ 与相对界小于一的 $T$-有界 $S$，满足 $T$ 有紧预解式当且仅当 $T+S$ 有紧预解式；$S$ 可不对称。

??? proof "证明 8.8.6"

    7.9.5 保证 $T+S$ 的预解集非空；$T$ 自伴也有非空预解集。8.8.4 保持图像嵌入紧性，8.8.5 再将其转成两算子的紧预解式性质。

!!! theorem "定理 8.8.7：正算子的离散谱"

    正自伴 $T$ 有紧预解式，当且仅当 $H$ 有至多可数的标准正交特征基，特征值 $\lambda_n\geq0$，若无限则 $\lambda_n\to\infty$。因此空间自动可分，各有限谱值重数有限。

??? proof "证明 8.8.7"

    取正紧自伴 $R=(I+T)^{-1}$，它单射且像稠密。紧自伴谱定理给标准正交特征基 $Re_n=\mu_ne_n$，$\mu_n>0$，无限时 $\mu_n\to0$；没有零特征空间。故 $Te_n=(\mu_n^{-1}-1)e_n$，这些特征值趋于无穷。反向，在所述特征基上预解式是对角算子，系数 $(1+\lambda_n)^{-1}$ 趋零，有限截断范数逼近使其紧。

!!! theorem "推论 8.8.9：正幂与紧预解式"

    正自伴 $T$ 对任意 $r>0$，$T$ 有紧预解式当且仅当 $T^r$ 有紧预解式。

??? proof "证明 8.8.9"

    若 $T$ 有紧预解式，其特征基同时对角化 $T^r$，$\lambda_n^r\to\infty$，故后者也有。反向对 $T^r$ 的特征基用 Borel 函数 $x^{1/r}$，得到 $T$ 的同一特征基，特征值也趋无穷；再用 8.8.7。

!!! theorem "定理 8.8.10：绝对值与图像紧性"

    稠密定义且闭的 $T:D(T)\subset H\to K$ 的以下条件等价：图像投影紧；$T^*T$ 有紧预解式；$|T|$ 有紧预解式。

??? proof "证明 8.8.10"

    极分解给 $D(T)=D(|T|)$ 且图像范数相同，所以两个图像嵌入同时紧。$|T|$ 正自伴，8.8.5 将其图像紧性化为紧预解式。最后 $T^*T=|T|^2$，8.8.9 给剩余等价。

!!! theorem "定理 8.8.11：无界 Fredholm 二择一"

    有紧预解式的 $T$ 满足 $\ker T=0$、$T^{-1}$ 处处有界、$\operatorname{ran}T=H$ 三者等价。

??? proof "证明 8.8.11"

    取预解点 $z$。若 $z=0$，有界逆已存在；否则令 $R=(z-T)^{-1}$，则 $T=(zR-I)(z-T)$ 在 $D(T)$ 成立。前一因子是紧算子的非零标量扰动，Fredholm 二择一说明其单射、满射、有界可逆等价。后一因子把图像域同构到 $H$，故这些条件转回 $T$ 恰是所述三条件。

### 用 Fourier 尾部证明 Rellich 紧性 { #topic-8-9-1 }

有界域上的零边界函数可零延拓到大环面。梯度范数控制高频尾部，低频部分有限维；二者结合给紧嵌入，再给 Dirichlet Laplacian 的离散谱。

!!! theorem "定理 8.9.1：Rellich 紧性"

    若 $\Omega\subset\mathbb R^N$ 为有界开集，则 $H_0^1(\Omega)\hookrightarrow L^2(\Omega)$ 紧，因而正 Dirichlet Laplacian $-\Delta_D$ 有紧预解式；不要求边界光滑。

??? proof "证明 8.9.1"

    先在测试域上把函数零延拓到包含 $\Omega$ 的大立方体，再把立方体视为环面。这保持 $L^2$ 与梯度范数；图像完备化后也保持。环面的归一化指数构成标准正交基，若 Fourier 系数为 $c_n$，梯度单位球满足

    $$
    \sum_n(1+|n|^2)|c_n|^2\leq1.
    $$

    因此去掉 $|n|\leq R$ 的有限模式后，$L^2$ 尾部平方至多 $(1+R^2)^{-1}$。有限维截断像有界且相对紧，统一尾部估计使嵌入成为有限秩映射的范数极限，故紧。限制回 $\Omega$ 仍紧。8.8.10 将梯度图像紧性化为 $-\Delta_D$ 的紧预解式，无须任何边界正则性。

!!! theorem "推论 8.9.3：有界一阶项的紧预解式"

    令 $X_j=\overline{\partial_j|_{C_c^\infty(\Omega)}}$，$M_a$ 表示乘以 $a$。在有界开集 $\Omega$ 及有界可测系数条件下，$-\Delta_D+\sum_jM_{a_j}X_j+M_b$ 在 $D(\Delta_D)$ 上有紧预解式，故它单射当且仅当满射。

??? proof "证明 8.9.3"

    一阶有界系数项对 $\sqrt{-\Delta_D}$ 相对有界，故对 $-\Delta_D$ 有任意小相对界。8.9.1 及 8.8.6 给扰动后紧预解式，再由 8.8.11 得单射等价于满射。

!!! theorem "定理 8.9.5：Poincaré 不等式"

    有界开集上存在 $C_\Omega$ 使 $\|u\|_2\leq C_\Omega\|\nabla u\|_2$ 对全部 $u\in H_0^1$ 成立。所以 $-\Delta_D$ 严格正且满射，逆算子有界且紧。

??? proof "证明 8.9.5"

    取包含 $\Omega$ 的立方体 $(-R,R)^N$ 并零延拓测试函数。沿第一坐标有 $u(x)=\int_{-R}^{x_1}\partial_1u(s,x')ds$，Cauchy–Schwarz 后积分得

    $$
    \|u\|_2^2\leq4R^2\|\partial_1u\|_2^2\leq4R^2\|\nabla u\|_2^2.
    $$

    核域逼近把估计传到 $H_0^1$。这给 $-\Delta_D\geq(4R^2)^{-1}I$，非负谱及正下界使零在预解集，逆有界；Rellich 紧性再使该预解式紧。

### 绝对可和让极限留在空间中 { #topic-8-10-1 }

在闭像与商空间的论证中，经常需要把逐次误差加起来。绝对收敛级数判据把这种操作与 Banach 完备性直接联系起来。

!!! theorem "引理 8.10.1：绝对收敛级数与完备性"

    赋范空间完备当且仅当每个满足 $\sum_n\|v_n\|<\infty$ 的级数均在空间中收敛。

??? proof "证明 8.10.1"

    完备时绝对可和级数的部分和是 Cauchy，所以收敛。反向取任意 Cauchy 序列 $x_n$，选子列使 $\|x_{n_{k+1}}-x_{n_k}\|\leq2^{-k}$。差的级数绝对可和而收敛，故子列收敛；Cauchy 性再使整个序列趋于同一极限。

### 正规紧算子的复谱展开 { #topic-8-A-1 }

正规性使不同特征空间正交，紧性使非零谱离散。正常谱表示将全部单点投影加起来恢复单位，遂得到复特征值版本的正交展开。

!!! theorem "引理 8.A.1：正规特征空间的正交性"

    有界正规算子的不同特征值的特征空间相互正交。

??? proof "证明 8.A.1"

    两特征空间的投影为 $\mathbf1_{\{\lambda_j\}}(T)$，它们的乘积等于不相交指标乘积的演算，故为零。正交投影乘积为零正是两个像空间正交。

!!! theorem "定理 8.A.2：紧正规谱定理"

    有界 $T$ 紧且正规，当且仅当有标准正交基 $(e_n)\cup(f_j)$，$Te_n=\lambda_ne_n$、$\lambda_n\in\mathbb C\setminus\{0\}$，$Tf_j=0$，非零部分至多可数且无限时 $\lambda_n\to0$。

??? proof "证明 8.A.2"

    紧正规算子的非零谱点由近似谱判据及 8.5.4 全是特征值。不同特征空间正交；若非零谱有非零聚点，取对应单位特征向量得到标准正交序列，紧性使其像范数趋零，却等于特征值绝对值，矛盾。故非零谱至多可数且唯一可能聚于零，各特征空间由紧性为有限维。

    正常谱演算将各单点投影与零点投影的和强收敛到单位，因为这些点穷尽谱。因此 $H$ 正交分解成全部特征空间及核，分别取正交基即得所述基。反向有限谱截断范数趋于 $T$，每个截断正规有限秩；对角表达使极限正规，范数闭性使其紧。

??? proof "预解式、图像嵌入与 Rellich"

    若 $R(z)=(z-T)^{-1}$ 有界，则 $z-T=R(z)^{-1}$ 的图像由闭图像反射得到闭性。$R(z)$ 将原空间有界地映到图像域，因为 $TR(z)=zR(z)-1$；反向 $z-T$ 从图像域到原空间也有界。两者将图像嵌入与预解式的紧性互相转化。预解式恒等式保证一个参数紧就所有参数紧。

    对有界开集，将 $H_0^1$ 元素零延拓到包含它的立方体，再视为环面函数。梯度范数控制 Fourier 系数的加权平方和，高频 $L^2$ 尾部一致小；有限低频投影为有限秩，所以嵌入紧。Poincaré 可直接沿一个坐标积分并用 Cauchy–Schwarz，得到只依赖外包立方体大小的常数。

    紧预解式的 Fredholm 结论令 $A=(T-z)^{-1}$，将 $T$ 写成 $(zA-1)A^{-1}$，再应用有界紧算子的二择一。正算子的特征展开则对紧正自伴 $(1+T)^{-1}$ 应用紧谱定理，其非零特征值趋零对应 $T$ 的特征值趋于无穷。

## 12. 练习 { #section-12 }

!!! problem "练习 1：对角紧算子的准确条件"

    对有界数列 $(a_n)$，令 $Ke_n=a_ne_n$。证明 $K$ 紧当且仅当 $a_n\to0$。

??? proof "解"

    若 $a_n\to0$，前 $N$ 项截断与 $K$ 的范数差为 $\sup_{n>N}|a_n|\to0$。反过来，若有无穷多个 $|a_n|\ge\varepsilon$，相应 $Ke_n$ 两两距离至少 $\sqrt2\varepsilon$，没有收敛子列。

!!! problem "练习 2：非自伴方程测试哪个核"

    在 $\mathbb C^2$ 中取 $K=\begin{pmatrix}1&1\\0&0\end{pmatrix}$。求 $(I-K)u=f$ 的可解条件，并区分 $\ker(I-K)$ 与 $\ker(I-K^*)$。

??? proof "解"

    $I-K=\begin{pmatrix}0&-1\\0&1\end{pmatrix}$，像由 $(-1,1)$ 张成，所以需 $f_1+f_2=0$。原核由 $(1,0)$ 张成，伴随核由 $(1,1)$ 张成。可解条件测试的是伴随核。

!!! problem "练习 3：Neumann 的非唯一性"

    对 $-u''=f$、$u'(0)=u'(1)=0$，推导兼容条件，并说明怎样恢复唯一性。

??? proof "解"

    积分得 $\int_0^1f=-u'(1)+u'(0)=0$。若兼容，$u$ 加任意常数仍是解；附加 $\int_0^1u=0$ 可恢复唯一性。


[返回目录](index.md){ .md-button }
