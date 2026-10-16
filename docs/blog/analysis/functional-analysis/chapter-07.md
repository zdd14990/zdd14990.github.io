---
title: 第七章：自伴算子、能量形式与 Fourier 分析
date: 2026-10-04
description: 构造 T*T 与 Friedrichs 扩张，证明 Stone 定理，理解 Fourier 谱模型、核心与自伴扰动。
hide:
  - navigation
categories:
  - 分析
  - 泛函分析
tags:
  - analysis
  - functional-analysis
  - spectral-theory
  - fourier-analysis
  - course
---

# 第七章：自伴算子、能量形式与 Fourier 分析 { #chapter-07 }

## 1. 本章的两种构造方法 { #section-1 }

上一章告诉我们自伴性是谱定理的入口。但遇到一个微分表达式，怎样实际构造自伴算子？本章使用两条路线：由正能量构造闭形式及其算子；由连续的酉演化构造自伴生成元。Fourier 变换会把二者连起来。

## 2. 闭算子为什么产生自伴的 $T^*T$ { #section-2 }

!!! theorem "$T^*T$ 的自伴性"

    若 $T:H\supset D(T)\to K$ 稠密定义且闭，则

    $$
    A=T^*T,\qquad D(A)=\{u\in D(T):Tu\in D(T^*)\}
    $$

    是非负自伴算子，且 $\langle u,Au\rangle=\|Tu\|^2$。

??? proof "证明：先解变分问题，再确定算子"

    $D(T)$ 在图内积下是 Hilbert 空间。给定 $f\in H$，Riesz 定理给出唯一 $u\in D(T)$，满足

    $$
    \langle v,u\rangle+\langle Tv,Tu\rangle=\langle v,f\rangle
    \quad\forall v\in D(T).
    $$

    按伴随定义，$Tu\in D(T^*)$，且 $(I+T^*T)u=f$。所以 $I+A$ 满射。取 $v=u$，得 $\|u\|\le\|f\|$。

    令 $Rf=u$。变分等式给出 $R$ 是有界自伴正算子，且单射：$Rf=0$ 时 $\langle v,f\rangle=0$ 对稠密的 $D(T)$ 成立。于是 $\operatorname{Ran}R$ 稠密。

    有界谱定理把 $R$ 变成乘以非负函数，零点的谱投影为零；其逆在像空间上是乘以倒数的自伴算子。因此 $A=R^{-1}-I$ 自伴，其定义域正是 $\operatorname{Ran}R=D(T^*T)$。正性由 $\|Tu\|^2$ 得到。

这里并没有先假定 $D(T^*T)$ 稠密；它由变分问题的逆算子自动得到。若 $T$ 仅可闭，通常应该先用 $\overline T{}^*\overline T$，而不能不经检查地断言 $T^*T$ 已自伴。

## 3. 闭形式与 Friedrichs 扩张 { #section-3 }

### 3.1 形式定义域比算子定义域大 { #section-3-1 }

!!! definition "非负闭形式"

    非负 Hermitian 形式 $q$ 定义在稠密子空间 $Q\subset H$ 上。若 $Q$ 在

    $$
    \|u\|_q^2=\|u\|^2+q(u,u)
    $$

    下完备，称 $q$ 闭。它与闭算子图范数的构造相似，但只控制能量而未必控制整个算子输出。

!!! theorem "闭形式的表示"

    对稠密非负闭形式 $q$，存在唯一非负自伴 $A$，满足

    $$
    D(A)=\{u\in Q:\exists f\in H,\ q(v,u)=\langle v,f\rangle\ \forall v\in Q\},\qquad Au=f.
    $$

    而且 $Q=D(A^{1/2})$，$q(v,u)=\langle A^{1/2}v,A^{1/2}u\rangle$。

??? proof "证明"

    在 $Q$ 的 Hilbert 内积 $\langle v,u\rangle+q(v,u)$ 中，用 Riesz 定理解

    $$
    \langle v,u\rangle+q(v,u)=\langle v,f\rangle.
    $$

    与上一节相同，得到有界正自伴单射 $R$，再定义 $A=R^{-1}-I$。等式本身正好给出上述定义域。

    $D(A)=\operatorname{Ran}R$ 在形式范数下稠密：若 $w$ 在形式内积下与所有 $Rf$ 正交，变分等式给出 $\langle w,f\rangle=0$ 对全部 $f$ 成立，因此 $w=0$。

    在 $D(A)$ 上，$q(u,u)=\langle u,Au\rangle=\|A^{1/2}u\|^2$。谱截断表明 $D(A)$ 在 $D(A^{1/2})$ 的图范数下也稠密；两者完备化一致，得到全部形式域的表示。唯一性由形式对 $Au$ 的测试定义得到。

### 3.2 从对称正算子到闭形式 { #section-3-2 }

!!! theorem "Friedrichs 扩张"

    每个稠密定义、下有界的对称算子 $S$ 都有一个规范的下有界自伴扩张 $S_F$。它由原始能量形式

    $$
    q_0(v,u)=\langle v,Su\rangle,\qquad u,v\in D(S)
    $$

    的闭包决定。下有界指 $\langle u,Su\rangle\ge c\|u\|^2$。

??? proof "证明：抽象梯度"

    先减去 $cI$，可假设 $S\ge0$。将 $D(S)$ 按 $q_0$ 的零空间取商，再完成为 Hilbert 空间 $K$，令 $Ju=[u]\in K$。则

    $$
    \langle Jv,Ju\rangle_K=\langle v,Su\rangle_H.
    $$

    $J$ 可闭：若 $u_n\to0$ 于 $H$、$Ju_n\to z$ 于 $K$，对 $v\in D(S)$ 有

    $$
    \langle Jv,z\rangle=\lim_n\langle v,Su_n\rangle
    =\lim_n\langle Sv,u_n\rangle=0.
    $$

    $J(D(S))$ 稠密，故 $z=0$。取闭梯度 $\overline J$，形式 $q(v,u)=\langle\overline Jv,\overline Ju\rangle$ 闭，关联算子 $\overline J{}^*\overline J$ 自伴非负，并扩张 $S$。它只由 $q_0$ 的闭包决定，与商空间的具体实现无关。最后把 $cI$ 加回。

Friedrichs 扩张是由能量选择的规范扩张，并不声称是唯一的自伴扩张。不同边界形式可能给出别的自伴算子。

### 3.3 Dirichlet 与 Neumann Laplacian { #section-3-3 }

在开集 $\Omega$ 上，弱导数由

$$
\int u\,\partial_j\phi=-\int v_j\phi,
\qquad\phi\in C_c^\infty(\Omega)
$$

定义，记 $v_j=\partial_ju$。令 $H^1=\{u\in L^2:\partial_ju\in L^2\}$，$H_0^1$ 为紧支撑光滑函数的 $H^1$ 闭包。

同一能量 $q(v,u)=\int_\Omega\overline{\nabla v}\cdot\nabla u$，在形式域 $H_0^1$ 上产生 Dirichlet 算子 $A_D=-\Delta_D$，在形式域 $H^1$ 上产生 Neumann 算子 $A_N=-\Delta_N$。这两个形式域都稠密且闭。

在光滑有界区域上可用迹解释边界条件；在一般开集上，形式定义仍有意义。在 $(0,1)$ 上，

$$
D(A_D)=H^2(0,1)\cap H_0^1(0,1),
$$

$$
D(A_N)=\{u\in H^2(0,1):u'(0)=u'(1)=0\},
$$

两者都作用为 $-u''$。Dirichlet 算子是 $C_c^\infty$ 上最初 $-\Delta$ 的 Friedrichs 扩张；Neumann 算子来自较大的能量域。

## 4. Stone 定理：酉演化与自伴生成元 { #section-4 }

!!! definition "强连续酉群"

    $U(t+s)=U(t)U(s)$、$U(0)=I$，每个 $U(t)$ 酉，且对每个 $x$，$\|U(t)x-x\|\to0$ 当 $t\to0$。这是 SOT 连续性，不要求算子范数连续。

!!! theorem "Stone 定理"

    强连续酉群与自伴算子一一对应：

    $$
    U(t)=e^{itA},\qquad
    D(A)=\left\{x:\lim_{t\to0}\frac{U(t)x-x}{t}\text{ 存在}\right\},
    $$

    且上述极限为 $iAx$。正负号的约定必须与群的定义一致。

??? proof "证明：先构造生成元，再证明它自伴"

    自伴 $A$ 的方向：谱演算给出酉性和群性质，$|e^{it\lambda}|=1$，控制收敛给出强连续性。若 $x\in D(A)$，由 $|(e^{it\lambda}-1)/t|\le|\lambda|$ 得差商趋于 $iAx$。反过来，差商收敛则范数有界，Fatou 引理给出 $\int\lambda^2\,\mathrm d\mu_x<\infty$，因此定义域恰为上式。

    反向，令 $Gx$ 为差商极限，$A=-iG$。用 $\phi\in C_c^\infty(\mathbb R)$ 平滑向量

    $$
    x_\phi=\int\phi(t)U(t)x\,\mathrm dt,
    \qquad Gx_\phi=-\int\phi'(t)U(t)x\,\mathrm dt.
    $$

    近似单位的 $\phi$ 使 $x_\phi\to x$，所以 $D(G)$ 稠密。这些向量积分的定义见本章第 8 节。

    $G$ 闭：对 $x\in D(G)$ 有 $U(t)x-x=\int_0^tU(s)Gx\,\mathrm ds$。若 $x_n\to x$、$Gx_n\to y$，此等式取极限后再除以 $t\to0$，得到 $x\in D(G)$、$Gx=y$。

    将 $\langle U(t)x,U(t)y\rangle=\langle x,y\rangle$ 求导，得 $G$ 反对称，所以 $A=-iG$ 对称。对 $\lambda>0$，Laplace 积分

    $$
    R_\lambda y=\int_0^\infty e^{-\lambda t}U(t)y\,\mathrm dt
    $$

    通过平移积分变量可验证 $R_\lambda y\in D(G)$，且 $(\lambda I-G)R_\lambda y=y$。用 $U(-t)$ 得到 $\lambda I+G$ 也满射。取 $\lambda=1$，便有 $A\pm iI$ 满射，第六章判据给出 $A$ 自伴。

    最后 $U(t)$ 与 $e^{itA}$ 有相同生成元。在 $D(A)$ 上对 $U(t-s)e^{isA}x$ 求导，导数为零，故二者相同，再由稠密性扩张到 $H$。这也给出唯一性。

有限维时此定理只是 Hermitian 矩阵指数。无穷维时生成元可能无界，但 $U(t)$ 对每个 $t$ 仍然是定义在全空间的有界酉算子。

对 $\mathbb R^N$ 的强连续酉表示，逐坐标应用 Stone 定理得到强交换生成元 $A_j$，有 $U(t)=e^{i\sum_jt_jA_j}$。坐标群互相交换，因而其谱投影强交换。

## 5. Fourier 变换就是平移的谱分解 { #section-5 }

### 5.1 规范与 Plancherel { #section-5-1 }

在 $\mathbb R^d$ 上采用酉归一化

$$
\mathcal F f(\xi)=(2\pi)^{-d/2}\int e^{-ix\cdot\xi}f(x)\,\mathrm dx.
$$

同时记未归一化的变换为 $\widehat f=(2\pi)^{d/2}\mathcal F f$。卷积代数中使用 $\widehat f$，而 $L^2$ 中的等距与谱模型使用 $\mathcal F$。

Schwartz 空间 $\mathcal S$ 由全部导数都比任意多项式倒数衰减得快的光滑函数组成。它在 $L^2$ 中稠密，Fourier 变换在其上保持 Schwartz 性，并有逆变换和

$$
\langle\mathcal F f,\mathcal F g\rangle=\langle f,g\rangle.
$$

??? proof "Plancherel 的证明组织"

    对 Schwartz 函数，分部积分说明 $\mathcal F f$ 也快速衰减。先在逆积分中加入 $e^{-\varepsilon|\xi|^2/2}$，此时所有重积分绝对可积，可用 Fubini。Gaussian 积分将逆变换写成 $f$ 与 Gaussian 近似单位的卷积。

    令 $\varepsilon\downarrow0$，得到 Fourier 反演。再将反演式代入 $\int\overline f g$，用 Fubini 得内积等式。Schwartz 空间的稠密性使等距映射唯一扩张到 $L^2$，其逆也扩张，因此得到酉变换。

    对一般 $L^2$ 元素，Fourier 变换由这个扩张定义；不能要求原来的绝对积分公式对每个 $L^2$ 函数都存在。

### 5.2 平移、动量与 Laplacian { #section-5-2 }

令 $U_+(t)f(x)=f(x+t)$。则

$$
\mathcal F(U_+(t)f)(\xi)=e^{it\cdot\xi}\mathcal F f(\xi),
\qquad\mathcal F(-i\partial_jf)(\xi)=\xi_j\mathcal F f(\xi).
$$

因此动量 $P_j=-i\partial_j$ 的自伴实现是

$$
P_j=\mathcal F^{-1}M_{\xi_j}\mathcal F,
\qquad D(P_j)=\{f:\xi_j\mathcal F f\in L^2\}.
$$

左平移 $U_-(t)f(x)=f(x-t)$ 则对应 $e^{-it\cdot\xi}$，生成元为 $-P_j$。两种平移方向不能混用符号。

对 $A=-\Delta$，

$$
\mathcal FA\mathcal F^{-1}=M_{|\xi|^2},
\qquad D(A)=\{f:|\xi|^2\mathcal F f\in L^2\}=H^2(\mathbb R^d).
$$

$\mathcal S$ 和 $C_c^\infty$ 都是它的核心：先截断频率得到图范数逼近，再用光滑化与空间截断逼近，导数误差由乘积法则控制。这里是在整空间上，不存在额外边界条件。

!!! example "热方程与 Schrödinger 方程"

    对 $A\ge0$ 自伴，定义 $u(t)=e^{-tA}u_0$ 与 $\psi(t)=e^{-itA}\psi_0$。前者是收缩半群，后者是酉群。

    若初值在 $D(A)$，它们分别满足 $u_t=-Au$、$i\psi_t=A\psi$。一般 $L^2$ 初值先得到强连续的温和解，不应直接断言它在 $t=0$ 有强导数。热演化在 $t>0$ 还会通过指数衰减改善谱可积性。

## 6. 调和分析、子表示与核心 { #section-6 }

### 6.1 把群积分成有界算子 { #section-6-1 }

对 $f\in L^1(\mathbb R^d)$，令

$$
U(f)x=\int f(t)U(-t)x\,\mathrm dt.
$$

有 $\|U(f)\|\le\|f\|_1$，$U(f*g)=U(f)U(g)$，$U(f)^*=U(f^*)$，其中 $f^*(t)=\overline{f(-t)}$。证明使用 Fubini 和群性质。

若 $U(t)=e^{it\cdot A}$，联合谱模型给出

$$
U(f)=(2\pi)^{d/2}(\mathcal F f)(A)=\widehat f(A).
$$

Fourier 变换把卷积变为点乘，这与算子乘法正相配。

闭子空间 $M$ 对全部 $U(t)$ 不变时，对 $U(-t)$ 也不变，因此它约化整个群。其正交投影与所有 $U(t)$、所有谱投影及有界联合演算可交换。这样的限制群称子表示。

### 6.2 指数函数的稠密性 { #section-6-2 }

对任意有限 Borel 测度 $\mu$，$e^{it\cdot x}$ 的线性张成在 $L^2(\mu)$ 中稠密。若 $h$ 与全部指数正交，则有限复测度 $\overline h\,\mu$ 的 Fourier 变换为零。用 Gaussian 卷积及 Fourier 反演可知该测度为零，故 $h=0$。

若进一步 $\int e^{r\sum_j|x_j|}\,\mathrm d\mu<\infty$ 对某个 $r>0$ 成立，则多项式也在 $L^2(\mu)$ 中稠密。证明：与多项式正交的 $h$ 给出在复条带内解析的 Fourier 变换，全部原点导数为零；解析唯一性使变换恒为零，再用上述测度唯一性。

仅有全部矩有限，不保证多项式稠密，也不保证矩问题唯一。这一点在第九章有具体例子。

### 6.3 用群不变性检查核心 { #section-6-3 }

!!! theorem "群不变的稠密子空间是核心"

    设 $A=f(A_1,\ldots,A_d)$，$f$ 为实 Borel 函数，$A_j$ 强交换自伴。若 $D_0\subset D(A)$ 在 $H$ 中稠密，且对所有 $t$ 有 $U(t)D_0\subset D_0$，其中 $U(t)=e^{it\cdot A_\bullet}$，则 $D_0$ 是 $A$ 的核心。

??? proof "证明"

    第六章估计表明 $A+iI$ 是 $D(A)$ 的图范数到 $H$ 的等距满射。因此只需证明 $(A+iI)D_0$ 在 $H$ 中稠密。

    若 $h$ 与该像正交，对任意 $v\in D_0$，不变性及谱交换给出

    $$
    \langle h,U(t)(A+iI)v\rangle=0\quad\forall t.
    $$

    左端是有限复谱测度的 Fourier 变换。上一节的唯一性使该测度为零，因此也可用任意有界 Borel 函数测试。取 $g(x)=1/(f(x)+i)$，便得 $\langle h,v\rangle=0$。$D_0$ 稠密推出 $h=0$。

此定理把难以直接控制的图范数问题转化成群不变性。使用时必须同时检查 $D_0\subset D(A)$，不能只检查它在 $H$ 中稠密。

## 7. 自伴扰动与方程求解 { #section-7 }

!!! definition "相对有界"

    $B$ 称 $A$-有界，若 $D(A)\subset D(B)$，且存在 $a,b\ge0$ 使

    $$
    \|Bu\|\le a\|Au\|+b\|u\|,\qquad u\in D(A).
    $$

    这里要求小的是乘在 $\|Au\|$ 前的系数，不是要求 $B$ 本身有界。

!!! theorem "Kato–Rellich 定理"

    若 $A$ 自伴、$B$ 对称且 $A$-有界，某个可用的相对界 $a<1$，则 $A+B$ 在 $D(A)$ 上自伴。两者图范数等价，因此 $A$ 的核心也是 $A+B$ 的核心。

??? proof "证明：用预解式把扰动变成小有界算子"

    对 $z=\pm is$、$s>0$，谱演算给出

    $$
    \|(A-zI)^{-1}\|\le1/s,
    \qquad\|A(A-zI)^{-1}\|\le1.
    $$

    因此 $\|B(A-zI)^{-1}\|\le a+b/s<1$ 当 $s$ 充分大。分解

    $$
    A+B-zI=[I+B(A-zI)^{-1}](A-zI).
    $$

    Neumann 级数使第一个因子可逆，所以两个非实方向均满射。对称算子的满射判据给出自伴性。

    图范数的上界来自相对有界估计；反向由

    $$
    (1-a)\|Au\|\le\|(A+B)u\|+b\|u\|
    $$

    得到。于是图闭包不改变核心。

!!! example "三维 Coulomb 势"

    取 $A=-\Delta$、$B=-\gamma/|x|$，$\gamma>0$。Hardy 不等式给出 $\|u/|x|\|_2\le2\|\nabla u\|_2$，而 $\|\nabla u\|_2^2\le\|u\|_2\|\Delta u\|_2$。于是

    $$
    \|Bu\|_2\le\varepsilon\|\Delta u\|_2+\frac{\gamma^2}{\varepsilon}\|u\|_2.
    $$

    相对界可以任意小，Kato–Rellich 给出 $H^2(\mathbb R^3)$ 上的自伴实现。Hardy 不等式可由展开 $\int|\nabla u+\tfrac12x|x|^{-2}u|^2\ge0$ 并分部积分证明，先对紧支撑光滑函数再取极限。

    能量也有下界：$\|\nabla u\|_2^2-\gamma\int|u|^2/|x|\ge-\gamma^2\|u\|_2^2$。这种估计说明形式构造与算子扰动能够在同一问题中配合。

对非对称的一阶项也可以用同一因子分解证明大参数方程可解。若 $A=-\Delta_D\ge0$，$Bu=\sum_jb_j\partial_ju+cu$，系数有界，则

$$
\|\nabla(A+\lambda I)^{-1}\|\le\frac1{2\sqrt\lambda},
\qquad\|(A+\lambda I)^{-1}\|\le\frac1\lambda.
$$

因此 $\|B(A+\lambda I)^{-1}\|<1$ 对充分大 $\lambda$ 成立，从而 $A+B+\lambda I$ 可逆。此论证给出存在性与估计；若 $B$ 不对称，结论并不包含自伴性。

## 8. 向量积分的补充 { #section-8 }

以上的群平均是 Hilbert 空间值积分。可从有限值简单函数 $s=\sum_jx_j\mathbf1_{E_j}$ 定义 $\int s=\sum_j\mu(E_j)x_j$，再按 $\int\|s_n-f\|\to0$ 扩张，得到 Bochner 积分。

要求 $f$ 强可测，即几乎处处是简单函数的点态极限，并满足 $\int\|f\|<\infty$。有

$$
\left\|\int f\right\|\le\int\|f\|,
\qquad T\int f=\int Tf\quad(T\text{ 有界}).
$$

可积标量函数乘以强连续向量轨道满足这些条件。强连续轨道的像落在一个可分子空间中，所以非可分 Hilbert 空间也不妨碍这里的积分。不能仅凭标量配对可测，就不加条件地断言 Bochner 可积。

## 9. 正算子、极分解与 Friedrichs 扩张 { #section-9 }

本节全部无界算子默认稠密定义。写 $\overline T$ 表示闭包，$|T|$ 表示绝对值；二者不能省略为同一记号。

### 从闭算子得到正自伴算子 { #topic-7-1-1 }

平方范数 $\|T\xi\|^2$ 自然产生 $T^*T$。图像 Hilbert 空间使它的正性进一步变成自伴性，极分解则说明平方根保留了原算子的图像范数。

!!! definition "定义 7.1.1：正性、严格正性与下界"

    $T$ 正指全部 $\xi\in D(T)$ 满足 $\langle\xi,T\xi\rangle\geq0$。若存在 $c>0$ 使 $T-cI$ 正，称严格正；若存在实 $c$ 使 $T+cI$ 正，称下有界。正性通过极化蕴含对称性。

!!! theorem "命题 7.1.2：正自伴的满射判据"

    对固定 $\lambda>0$，以下等价：$T$ 正且自伴；$T$ 自伴且谱位于 $[0,\infty)$；$T$ 正且 $\operatorname{ran}(\lambda+T)=H$。

??? proof "证明 7.1.2"

    自伴时谱积分直接给出正性与非负谱的等价。正自伴时 $(\lambda+T)^{-1}$ 是谱函数 $(\lambda+x)^{-1}$，处处有界。反向若 $T$ 正且 $\lambda+T$ 满射，7.10.3 说明对称算子 $\lambda+T$ 自伴，从而 $T$ 自伴。该引理的证明只用伴随核像关系，不依赖本结论。

!!! definition "定义 7.1.6：图像投影映射"

    $\Pi_T:G(T)\to H$ 将 $\xi\oplus T\xi$ 送到 $\xi$。这是范数至多一的线性映射；闭 $T$ 时其定义域为 Hilbert 空间，故可取有界伴随。

!!! theorem "定理 7.1.7：$T^*T$ 的自伴性"

    若 $T:D(T)\subset H\to K$ 稠密定义且闭，则 $T^*T$ 为正自伴算子，且 $D(T^*T)$ 是 $T$ 的核域。

??? proof "证明 7.1.7"

    令 $\Pi:G(T)\to H$ 为第一分量投影。它有界、单射、像稠密，因此 $\Pi^*$ 单射且像在图像中稠密。其无界逆 $\Psi\xi=(\xi,T\xi)$ 满足

    $$
    \Psi^*\Psi=I+T^*T,\qquad
    (I+T^*T)^{-1}=\Pi\Pi^*.
    $$

    第一式由 $\langle\Psi\eta,\Psi\xi\rangle=\langle\eta,\xi\rangle+\langle T\eta,T\xi\rangle$ 逐项检查伴随域；第二式由闭逆的伴随及复合逆得到。因此 $I+T^*T$ 满射。又 $\Psi$ 把 $D(T^*T)=\operatorname{ran}(\Pi\Pi^*)$ 送到 $\operatorname{ran}\Pi^*$，后者在 $G(T)$ 稠密。这同时证明核域性质和 $D(T^*T)$ 稠密。最后正性 $\langle\xi,T^*T\xi\rangle=\|T\xi\|^2$ 及 7.1.2 给出自伴性。

!!! definition "定义 7.1.10：部分等距"

    有界 $U:H\to K$ 在某个闭子空间 $V$ 上等距、在 $V^\perp$ 上为零时称部分等距。源空间为 $(\ker U)^\perp=V$，目标空间为其闭像。

!!! theorem "定理 7.1.11：闭算子的极分解"

    稠密定义的闭 $T$ 的 $|T|=(T^*T)^{1/2}$ 正自伴，并有唯一部分等距 $U$，源空间为 $\overline{\operatorname{ran}|T|}$，满足 $T=U|T|$。$D(T)=D(|T|)$ 且两者的图像内积相同。

??? proof "证明 7.1.11"

    令 $B=\sqrt{T^*T}$。$B^2=T^*T$，由 7.1.7，$D(T^*T)$ 同时是 $T$ 与 $B$ 的核域。该域上

    $$
    \langle B\xi,B\eta\rangle=\langle\xi,T^*T\eta\rangle=\langle T\xi,T\eta\rangle.
    $$

    故 $B\xi\mapsto T\xi$ 良定义且等距，延拓到 $\overline{\operatorname{ran}B}$，在正交补取零，得到部分等距 $U$。共同核域的图像闭包使 $T=UB$，并给出 $D(T)=D(B)$ 和图像内积相同。$U$ 在稠密的 $\operatorname{ran}B$ 上由等式唯一确定，在其正交补上规定为零，故唯一。

!!! definition "定义 7.1.12：Dirichlet 与 Neumann Laplacian"

    令 $G$ 为 $C_c^\infty(\Omega)$ 上梯度的闭包，$D$ 为紧支集光滑向量场上散度的闭包。定义 $\Delta_D=-G^*G$、$\Delta_N=-DD^*$，二者负自伴；对应的非负算子为 $-\Delta_D,-\Delta_N$。

??? proof "证明 7.1.12"

    $G$ 闭且稠密定义，7.1.7 给 $G^*G$ 正自伴。$D^*$ 也闭且稠密定义，对它应用同一定理得到 $DD^*$ 正自伴。因此取负号后的两个 Laplacian 负自伴。它们的形式分别为 $\|Gf\|^2$ 和 $\|D^*f\|^2$，边界条件体现在两个梯度域的差别中。

### 能量形式决定扩张 { #topic-7-2-1 }

正算子的二次型可看成一个抽象梯度的平方范数。先闭合梯度，再取其伴随乘积，就得到 Friedrichs 扩张；关键是形式完备化与梯度选择无关。

!!! definition "定义 7.2.1：抽象梯度"

    正算子 $A$ 的抽象梯度是某 Hilbert 空间 $K$ 中的算子 $T:H\to K$，满足 $D(T)=D(A)$ 和 $A=T^*T$，此处等式在初始域上成立。

!!! theorem "引理 7.2.2：抽象梯度的形式判据"

    在 $D(T)=D(A)$ 条件下，$T$ 为抽象梯度当且仅当对全部 $\xi,\eta\in D(A)$，$\langle\xi,A\eta\rangle=\langle T\xi,T\eta\rangle$。

??? proof "证明 7.2.2"

    若 $A=T^*T$，伴随恒等式立即给出形式等式。反向，对固定 $\eta\in D(A)=D(T)$，等式说明 $\xi\mapsto\langle T\xi,T\eta\rangle$ 由向量 $A\eta$ 在原空间中表示，因此 $T\eta\in D(T^*)$ 且 $T^*T\eta=A\eta$。复合域只能包含于 $D(T)=D(A)$，故域也相等。

!!! theorem "命题 7.2.3：抽象梯度可闭"

    正算子的每个抽象梯度均可闭。

??? proof "证明 7.2.3"

    若 $\xi_n\to0$ 且 $T\xi_n\to v$，对 $\eta\in D(A)$，
    $\langle T\eta,v\rangle=\lim_n\langle A\eta,\xi_n\rangle=0$。另一方面 $v$ 属于 $\overline{\operatorname{ran}T}$，因此既属于该闭空间又垂直它，必为零。由图像判据 $T$ 可闭。

!!! theorem "命题 7.2.4：抽象梯度的等距对应"

    两个抽象梯度 $T:H\to K$、$S:H\to M$ 之间存在唯一源空间为 $\overline{\operatorname{ran}T}$ 的部分等距 $U:K\to M$，使 $S=UT$。

??? proof "证明 7.2.4"

    两个梯度满足 $\langle T\xi,T\eta\rangle=\langle S\xi,S\eta\rangle$。故映射 $T\xi\mapsto S\xi$ 良定义并等距，延拓到 $\overline{\operatorname{ran}T}$，在其正交补上取零即得 $U$。其源空间、作用和唯一性均由这一构造给出。

!!! theorem "定理 7.2.5：抽象梯度的存在与独立性"

    每个正算子都有抽象梯度；对任意两个选择，$(\overline T)^*\overline T=(\overline S)^*\overline S$。

??? proof "证明 7.2.5"

    正形式 $\omega(\xi,\eta)=\langle\xi,A\eta\rangle$ 的零范数空间 $N$ 是线性空间；Cauchy–Schwarz 保证它与全部向量形式正交。于是商 $D(A)/N$ 获得内积，完备化为 $K$，映射 $T\xi=\xi+N$ 满足梯度形式判据。

    两个选择由 7.2.4 的 $U$ 对应；闭图像极限给 $\overline S=U\overline T$，且 $U^*U$ 是到 $\overline{\operatorname{ran}T}$ 的投影。因此

    $$
    (\overline S)^*\overline S
    =(\overline T)^*U^*U\overline T
    =(\overline T)^*\overline T,
    $$

    其中有界左因子的伴随公式也保证域相等。

!!! definition "定义 7.2.6：Friedrichs 扩张"

    定义 $A_F=(\overline T)^*\overline T$，其中 $T$ 为任意抽象梯度。它与选择无关，是扩张 $A$ 的正自伴算子。

??? proof "证明 7.2.6"

    7.2.5 保证定义与梯度选择无关，7.1.7 保证 $A_F$ 正自伴。若 $\eta\in D(A)$，梯度恒等式在图像极限下延拓为 $\langle\overline T\xi,T\eta\rangle=\langle\xi,A\eta\rangle$ 对全部 $\xi\in D(\overline T)$ 成立，故 $T\eta\in D((\overline T)^*)$，$A_F\eta=A\eta$。所以它确为扩张。

!!! theorem "定理 7.2.9：Friedrichs 扩张的核域判据"

    若正自伴 $B$ 扩张正 $A$，则以下等价：$B=A_F$；$D(A)$ 是 $\sqrt B$ 的核域；$D(A)$ 是 $\sqrt B|_{D(B)}$ 的核域。

??? proof "证明 7.2.9"

    取梯度 $T=\sqrt B|_{D(A)}$。它的闭包是 $\sqrt B$ 当且仅当 $D(A)$ 为其核域；此时 $A_F=T^*T=B$。反向若 $A_F=B$，对 $\overline T$ 用极分解得 $|\overline T|=\sqrt B$，两者图像范数相同；原域是 $\overline T$ 的核域，故也是 $\sqrt B$ 的核域。谱截断说明 $D(B)$ 是 $\sqrt B$ 的核域，所以第三条件与第二条件等价。

!!! theorem "命题 7.2.10：已自伴时的扩张"

    正自伴算子的 Friedrichs 扩张就是它自身。

??? proof "证明 7.2.10"

    $A_F$ 是 $A$ 的自伴扩张；自伴算子没有严格对称扩张，故必等于 $A$。也可用 7.2.9：谱截断证明 $D(A)$ 是 $\sqrt A$ 的核域。

!!! theorem "命题 7.2.11：闭包不改变 Friedrichs 扩张"

    正算子 $A$ 与其闭包的 Friedrichs 扩张相同。

??? proof "证明 7.2.11"

    若 $\xi_n\to\xi$、$A\xi_n\to\overline A\xi$，则 $\langle\xi_n-\xi_m,A(\xi_n-\xi_m)\rangle\leq\|\xi_n-\xi_m\|\|A\xi_n-A\xi_m\|\to0$。所以原域在闭包域的形式范数下稠密。两个域再作形式完备化得到同一梯度闭包，因而得到同一 Friedrichs 扩张。

!!! theorem "命题 7.2.12：有界正扰动"

    若 $B=A_F$，$x$ 为有界正算子，则 $x+B$ 是 $x+A$ 的 Friedrichs 扩张；特别允许加非负标量。

??? proof "证明 7.2.12"

    两种形式范数分别为 $\|\xi\|^2+\langle\xi,A\xi\rangle$ 与再加 $\langle\xi,x\xi\rangle$；它们互相控制，因为 $0\leq\langle\xi,x\xi\rangle\leq\|x\|\|\xi\|^2$。故闭形式域相同，闭形式只增加有界项 $\langle\xi,x\eta\rangle$。表示算子的定义要求形式对第一变量在原范数下有界，有界项不改变此条件，所以表示算子为 $B+x$，即所述扩张。

!!! definition "定义 7.2.13：等价内积"

    同一向量空间上的两个内积等价，指其二次型互相以正的固定常数控制。等价内积给出等价范数和相同的完备性。

!!! definition "定义 7.2.14：等价范数"

    存在 $c,C>0$ 使 $c\|\xi\|_1\leq\|\xi\|_2\leq C\|\xi\|_1$ 时称范数等价；等价于恒等映射及其逆均有界。

!!! definition "定义 7.2.15：下有界算子的 Friedrichs 扩张"

    若 $A+\lambda$ 正，定义 $A_F=(A+\lambda)_F-\lambda$。有界正扰动性质保证它与允许的 $\lambda$ 无关，并保留 $A$ 的下界。


??? proof "抽象梯度及极分解的构造"

    在 $D(A)$ 上取正形式 $q(\xi,\eta)=\langle\xi,A\eta\rangle$，除去零空间并完备化为 $K$。自然映射 $T:D(A)\to K$ 满足梯度形式恒等式。若 $\xi_n\to0$、$T\xi_n\to y$，对每个 $\eta\in D(A)$ 有 $\langle y,T\eta\rangle=\lim\langle\xi_n,A\eta\rangle=0$；梯度像稠密，所以 $y=0$，证明可闭。两个梯度的像具有相同 Gram 矩阵，因而等距对应，闭包后的 $T^*T$ 相同。

    对闭 $T$，图像 Hilbert 空间中的 Riesz 表示解决 $(1+T^*T)\xi=f$，从而由正算子满射判据证明自伴性。谱截断显示 $D(T^*T)$ 在图像范数下稠密。此域上 $\|T\xi\|=\||T|\xi\|$，核域逼近将等式扩大到全部域，再把 $|T|\xi\mapsto T\xi$ 延拓为部分等距，得到极分解。

## 10. 酉群、卷积代数与核域 { #section-10 }

### 连续时间由生成元描述 { #topic-7-3-1 }

酉群给出连续时间的演化，生成元给出瞬时变化率。Stone 定理需要证明差商域稠密并自伴，平滑向量与亏方程正是这两个步骤的工具。

!!! definition "定义 7.3.1：强连续酉表示"

    $U:\mathbb R^N\to\mathcal L(H)$ 满足各 $U(t)$ 酉、$U(s+t)=U(s)U(t)$、$U(0)=1$ 时称酉表示；每个 $t\mapsto U(t)\xi$ 范数连续时称强连续。一维情形称单参数酉群。

!!! theorem "定理 7.3.3：Stone 定理"

    强连续 $\mathbb R^N$ 酉表示与有限个强交换自伴生成元 $T_j$ 一一对应，$U(t)=e^{i\sum_jt_jT_j}$。$D(T_j)$ 恰由在原点存在第 $j$ 个范数差商极限的向量构成，极限为 $iT_j\xi$。

??? proof "证明 7.3.3"

    由 7.3.8，从强交换自伴族得到强连续群。反向将表示限制到各坐标轴，7.3.10 给出自伴生成元 $T_j$；原群交换，7.3.13 保证这些生成元强交换。群律给 $U(t)=\prod_je^{it_jT_j}=e^{it\cdot T}$。差商域及唯一性由 7.3.9 给出。

!!! definition "定义 7.3.4：生成元"

    上述唯一的自伴族 $(T_j)$ 称表示的生成元，约定指数符号为 $+i$。

!!! theorem "引理 7.3.8：从生成元构造群"

    强交换自伴族的 $e^{it\cdot T}$ 为强连续酉表示，连续性由向量谱测度上的控制收敛得到。

??? proof "证明 7.3.8"

    在乘法模型中 $e^{it\cdot T}=M_{e^{it\cdot x}}$，其模为一且指数满足加法群律。对每个 $\xi$，

    $$
    \|(U(t)-U(s))\xi\|^2=\int|e^{it\cdot x}-e^{is\cdot x}|^2\,d\mu_\xi\to0,
    $$

    因被积函数逐点趋零并被 $4$ 控制，向量测度有限。

!!! theorem "引理 7.3.9：差商的定义域"

    对自伴 $T_j$，$\lim_{s\to0}(e^{isT_j}\xi-\xi)/s$ 存在当且仅当 $\xi\in D(T_j)$，此时等于 $iT_j\xi$。

??? proof "证明 7.3.9"

    若 $\xi\in D(T_j)$，点态差商趋于 $ix_j$，且 $|(e^{isx_j}-1)/s|\leq|x_j|$，支配收敛给范数极限 $iT_j\xi$。反向差商范数收敛必有界，Fatou 给 $\int|x_j|^2\,d\mu_\xi\leq\liminf_s\|(e^{isT_j}-1)\xi/s\|^2<\infty$，故 $\xi\in D(T_j)$。

!!! theorem "引理 7.3.10：单参数生成元的存在与唯一"

    每个强连续单参数酉群存在唯一自伴 $T$ 满足 $U(t)=e^{itT}$；无须假设 $H$ 可分。

??? proof "证明 7.3.10"

    在差商存在的域定义 $T\xi=-i\,\partial_tU(t)\xi|_0$。酉性经内积求导给对称性。取 $h\in C_c^\infty(\mathbb R)$，平滑向量 $\xi_h=\int h(s)U(s)\xi\,ds$ 满足 $T\xi_h=i\int h'(s)U(s)\xi\,ds$；积分下求导合法，因为紧支撑光滑核给可积控制。近似单位 $h_\varepsilon$ 及强连续性使 $\xi_{h_\varepsilon}\to\xi$，所以该域含稠密且群不变的平滑子空间 $D_0$。

    若 $T^*v=iv$，则对 $\eta\in D_0$，$F(t)=\langle v,U(t)\eta\rangle$ 满足 $F'=F$。但 $F$ 全实轴有界，故 $F=0$；稠密性使 $v=0$。另一个亏核同样由 $F'=-F$ 消失，因此 $T$ 本质自伴。这里差商生成元本身闭：若 $\xi_n\to\xi$、$T\xi_n\to\eta$，由

    $$
    U(t)\xi_n-\xi_n=i\int_0^tU(s)T\xi_n\,ds
    $$

    取极限再求导，得到 $\xi\in D(T)$、$T\xi=\eta$。故 $T$ 已自伴。

    最后对 $D_0$ 中向量比较 $U(t)$ 与 $e^{itT}$，内积函数 $\langle e^{itT}\zeta,U(t)\eta\rangle$ 的导数两项相消，所以恒等于初值；取稠密的平滑 $\zeta,\eta$ 再连续延拓，得 $U(t)=e^{itT}$。7.3.9 从差商恢复 $T$，保证唯一。

!!! theorem "命题 7.3.12：与酉群的交换"

    酉 $V$ 满足 $VT=TV$（含域条件）当且仅当它与全部 $e^{itT}$ 交换。

??? proof "证明 7.3.12"

    若 $V$ 保持域并与 $T$ 交换，伴随共轭及谱演算唯一性给 $Ve^{itT}=e^{itT}V$。反向对群差商应用 $V$，差商域被 $V$ 及 $V^{-1}$ 保持，且差商极限给 $VT=TV$。

!!! theorem "定理 7.3.13：强交换的群判据"

    自伴 $T_1,T_2$ 强交换、全部 $e^{itT_1}T_2=T_2e^{itT_1}$、全部 $e^{isT_2}T_1=T_1e^{isT_2}$、两群的任意成员交换，四者等价。

??? proof "证明 7.3.13"

    强交换的联合演算立即给两群交换及各群与另一生成元交换。反向由 7.3.12，任意一种单边域交换条件均化为两群交换。此时各群成员与另一生成元及其 Cayley 变换交换；再对另一群使用 7.3.12 和 Cayley 判据，得到两个 Cayley 变换交换，即强交换。

### 用积分把群表示线性化 { #topic-7-4-2 }

把群成员按 $L^1$ 函数加权积分，群律就变成卷积乘法。Fourier 变换把卷积转成逐点乘法，为群表示与谱演算的关系提供可计算的桥梁。

!!! theorem "命题 7.4.2：$L^1$ 卷积"

    $f,g\in L^1(\mathbb R^N)$ 的 $(f*g)(x)=\int f(x-y)g(y)\,dy$ 几乎处处存在，属于 $L^1$，且 $\|f*g\|_1\leq\|f\|_1\|g\|_1$。

??? proof "证明 7.4.2"

    Tonelli 给

    $$
    \int\!\int|f(x-y)g(y)|\,dy\,dx=\|f\|_1\|g\|_1.
    $$

    所以内积分几乎处处绝对收敛，且积分后的函数在 $L^1$；三角不等式给所述范数界。

!!! theorem "定理 7.4.3：卷积星代数"

    $L^1$ 配备卷积和 $f^\dagger(x)=\overline{f(-x)}$ 是交换星代数；$C_c(\mathbb R^N)$ 是星子代数。除零维情形外，此代数没有 $L^1$ 单位元。

??? proof "证明 7.4.3"

    换元给卷积交换性，三重积分的绝对可积性给结合律；复共轭和 $x\mapsto-x$ 的换元给 $(f*g)^\dagger=g^\dagger*f^\dagger$。紧支集卷积的支集包含于两支集之和，连续性由平移连续性得到，故 $C_c$ 为星子代数。若有 $L^1$ 单位 $e$，则 $\widehat e\,\widehat f=\widehat f$，在每点选择变换非零的 $f$ 得 $\widehat e=1$；Riemann–Lebesgue 与此矛盾，所以正维数时无单位。

!!! theorem "定理 7.4.4：群表示的积分形式"

    定义 $U(f)\xi=\int f(x)U(-x)\xi\,dx$，得到卷积星代数的酉表示，且 $\|U(f)\|\leq\|f\|_1$。积分为向量值积分，负号与 Fourier 符号相配。

??? proof "证明 7.4.4"

    轨道函数连续且值域可分，$\|f(t)U(-t)\xi\|=|f(t)|\|\xi\|$，故向量积分存在并满足算子范数界。Fubini 与群律给

    $$
    U(f)U(g)\xi=\iint f(s)g(t)U(-s-t)\xi\,ds\,dt=U(f*g)\xi.
    $$

    取内积、酉伴随并换元 $t\mapsto-t$ 给 $U(f)^*=U(f^\dagger)$。

!!! definition "定义 7.4.5：$L^1$ Fourier 变换"

    定义未归一化变换 $\widehat f(t)=\int f(x)e^{-it\cdot x}\,dx$ 及 $\check f(t)=\int f(x)e^{it\cdot x}\,dx=\widehat f(-t)$。这里“逆号变换”尚未包含 Fourier 反演的归一化常数。

!!! theorem "命题 7.4.6：平移与调制"

    令 $\tau_yf(x)=f(x-y)$，则 $\widehat{\tau_yf}(t)=e^{-it\cdot y}\widehat f(t)$，$\widehat{e^{is\cdot x}f}(t)=\widehat f(t-s)$。

??? proof "证明 7.4.6"

    平移式令 $x=u+y$，指数分出 $e^{-it\cdot y}$；调制式将 $e^{is\cdot x}e^{-it\cdot x}$ 合成 $e^{-i(t-s)\cdot x}$。两者都由绝对可积积分直接得到。

!!! theorem "定理 7.4.7：Riemann–Lebesgue 与唯一性"

    Fourier 映射 $L^1\to C_0(\mathbb R^N)$ 有界、范数至多一、单射且像一致稠密；满足 $\widehat{f*g}=\widehat f\widehat g$ 和 $\widehat{f^\dagger}=\overline{\widehat f}$，故为星同态。逆号变换也具有这些性质。

??? proof "证明 7.4.7"

    $|\widehat f|\leq\|f\|_1$，支配收敛给连续性。先对矩形指标显式计算，其变换在无穷远消失；矩形阶梯函数在 $L^1$ 稠密，范数估计再给任意 $f$ 的消失性质。Fubini 及换元给卷积和星运算公式。7.4.8 给像的一致稠密性，7.4.10 给单射性；二者的证明如下，分别不使用单射结论。逆号情形由反射得到。

!!! theorem "定理 7.4.8：紧支集变换的稠密性"

    $\widehat{C_c(\mathbb R^N)}$ 是 $C_0(\mathbb R^N)$ 中一致稠密的星子代数。

??? proof "证明 7.4.8"

    卷积和星运算保持 $C_c$，所以变换像为星子代数。它无共同零点：给定 $t$，取 $f(x)=e^{it\cdot x}h(x)$，其中 $h\geq0$、$\int h>0$。它分离点：若 $s\ne t$，连续函数 $e^{-is\cdot x}-e^{-it\cdot x}$ 在某小球非零，选该球内适当紧支集 $f$ 使差的积分非零。局部紧 Stone–Weierstrass 定理遂给一致稠密。

!!! theorem "命题 7.4.9：Fourier 配对公式"

    对 $f,g\in L^1$，$\int\widehat f(t)g(t)\,dt=\int f(x)\widehat g(x)\,dx$，两边绝对可积，由 Fubini 得到。

??? proof "证明 7.4.9"

    双重绝对积分至多 $\|f\|_1\|g\|_1$，故 Fubini 可交换次序；共同双积分为 $\iint f(x)g(t)e^{-it\cdot x}\,dx\,dt$，恰是两边。

!!! theorem "引理 7.4.10：Fourier 唯一性"

    $f\in L^1$ 且 $\widehat f=0$ 时，$f=0$ 几乎处处。

??? proof "证明 7.4.10"

    $\widehat f=0$ 及配对公式给 $\int f\widehat g=0$ 对全部 $g\in C_c$ 成立。由 7.4.8 及积分泛函的一致范数连续性，得到 $\int fh=0$ 对全部 $h\in C_0$ 成立。连续紧支集单位球在 $L^\infty$ 单位球中弱-\* 稠密，因此可逼近相位 $h=\bar f/|f|$（零点取零），得到 $\int|f|=0$。

### 哪些子空间保留全部谱作用 { #topic-7-5-1 }

群不变性使闭子空间的投影与群交换。积分表示、Fourier 稠密性和 Borel 强逼近依次将这种交换扩到整个函数演算。

!!! definition "定义 7.5.1：酉子表示"

    对强连续酉表示的不变闭子空间 $K$，$U|_K$ 仍为强连续酉表示，称子表示。

!!! theorem "定理 7.5.2：积分表示与函数演算"

    若 $T_j$ 为强交换自伴族，$f\in L^1$，则 $\int f(t)e^{-it\cdot T}\,dt=\widehat f(T_1,\ldots,T_N)$，按每个向量的积分解释。

??? proof "证明 7.5.2"

    在联合乘法模型中，对每个矩阵元作 Fubini；绝对控制来自 $\int|f(t)|\,dt$ 和 $\int|\eta(x)\xi(x)|\,d\mu(x)\leq\|\eta\|_2\|\xi\|_2$。内积分为 $\widehat f(x)$，所以积分算子等于 $M_{\widehat f}$，换回模型得到公式。

!!! theorem "定理 7.5.4：不变子空间的等价条件"

    闭子空间 $K$ 对全部 $U(t)$ 不变，当且仅当对生成元的全部有界 Borel 联合演算 $f(T_\bullet)$ 不变。

??? proof "证明 7.5.4"

    若 $K$ 群不变，因 $U(-t)$ 也在群中，它正交约化，投影 $P_K$ 与每个群成员交换。向量积分使 $P_K$ 与 $\widehat f(T_\bullet)$ 交换；7.4.8 的一致稠密性使它与全部 $C_0$ 演算交换，再用有界 Borel 函数的强逼近得全部 Borel 演算交换。反向将条件用于指数函数即可。

### 稠密域怎样成为核域 { #topic-7-6-1 }

原空间稠密不自动等于图像稠密。群不变性补足这个差别：它使潜在的缺失方向也保留谱截断，而有界截断最终排除这些方向。

!!! theorem "引理 7.6.1：核域的稠密像判据"

    自伴 $T$ 的线性子空间 $D_0\subset D(T)$ 为核域，当且仅当 $(T+i)D_0$ 在 $H$ 中稠密。

??? proof "证明 7.6.1"

    映射 $\xi\mapsto(T+i)\xi$ 从图像范数域到 $H$ 满射等距，因为 $\|(T+i)\xi\|^2=\|\xi\|^2+\|T\xi\|^2$。它将图像稠密性恰好转成目标空间稠密性，所以得到判据。

!!! theorem "定理 7.6.2：群不变核域"

    对强连续表示及其生成元族，若实 Borel $f$ 的算子 $f(T_\bullet)$ 的某个子域 $D_0$ 在原空间稠密，且对全部 $U(t)$ 不变，则 $D_0$ 为 $f(T_\bullet)$ 的核域。

??? proof "证明 7.6.2"

    令 $A=f(T_\bullet)$、$K=((A+i)D_0)^\perp$。先有 $K\cap D(A)=0$：属于交集的向量满足 $A\xi=i\xi$，而自伴算子无非实特征值。因 $D_0$ 群不变且 $A$ 与群交换，$(A+i)D_0$ 及其正交补均群不变。7.5.4 遂使 $K$ 对全部有界联合演算不变。

    取 $g_n=\mathbf1_{\{|f|\leq n\}}$。对 $\xi\in K$，$g_n(T_\bullet)\xi$ 仍在 $K$，且 $fg_n$ 有界，7.6.3 保证它也在 $D(A)$，故为零。另一方面谱上的支配收敛给 $g_n(T_\bullet)\xi\to\xi$，所以 $K=0$。7.6.1 得出核域结论。

!!! theorem "引理 7.6.3：有界右因子的精确乘法"

    Borel $f$ 与有界 Borel $g$ 满足 $f(T_\bullet)g(T_\bullet)=(fg)(T_\bullet)$，包含定义域等式。若 $fg$ 有界，则复合处处有界，特别 $g(T_\bullet)H\subset D(f(T_\bullet))$。

??? proof "证明 7.6.3"

    在乘法模型中 $M_g$ 处处有界。$M_fM_g$ 的域正是 $fg\xi\in L^2$ 的条件，因为 $g\xi$ 已自动在 $L^2$；这与 $M_{fg}$ 的最大域相同。若 $fg$ 有界，条件对全部向量成立，得到后续结论。

!!! theorem "推论 7.6.7：全空间导数的本质自伴性"

    $i\partial_{x_j}$ 在 $C_c^\infty(\mathbb R^N)$ 上本质自伴，各闭包强交换，生成正则平移 $U_-(t)f(x)=f(x-t)$。

??? proof "证明 7.6.7"

    平移群的第 $j$ 个差商在测试函数上趋于 $-\partial_jf$，所以生成元在该域等于 $i\partial_j$。测试域在 $L^2$ 稠密并被所有平移保持，7.6.2 使它成为生成元的核域，故初始导数本质自伴。生成元来自同一个交换平移群，因此强交换。

!!! theorem "推论 7.6.8：实常系数多项式微分算子"

    实多项式 $p$ 的 $p(i\partial_{x_1},\ldots,i\partial_{x_N})$ 在 $C_c^\infty$ 上本质自伴，闭包等于导数闭包的联合 Borel 演算；换成 Schwartz 域给出同一闭包。

??? proof "证明 7.6.8"

    各生成元在测试函数上的复合就是相应微分，测试域由所有平移保持且稠密。将 7.6.2 用于实谱函数 $p$，得到本质自伴和所述闭包。Schwartz 域同样稠密、平移不变，并包含于该多项式演算域，故给出同一核域结论。

!!! theorem "推论 7.6.9：全空间 Laplacian"

    $\Delta$ 在 $C_c^\infty(\mathbb R^N)$ 上本质自伴，闭包等于 $\Delta_D=\Delta_N$。并有 $H_0^1(\mathbb R^N)=H^1(\mathbb R^N)=D(\sqrt{-\overline\Delta})$。

??? proof "证明 7.6.9"

    取 $p(x)=-\sum_jx_j^2$，7.6.8 给 $\Delta$ 本质自伴。Dirichlet 与 Neumann 构造均扩张初始 $\Delta$ 且自伴，故由扩张唯一性等于其闭包。7.1.11 的极分解使 $D(G)=D(\sqrt{G^*G})$、$D(D^*)=D(\sqrt{DD^*})$，两正算子相同，所以两个 Sobolev 域也相同。

??? proof "群不变性如何推出图像稠密"

    设 $A=f(T_\bullet)$。令 $M=\overline{(A+i)D_0}$，群交换与 $D_0$ 不变使 $M$ 对群不变，因此也对全部有界演算不变。若 $\eta\perp M$，用有界演算 $(A-i)^{-1}$ 将正交关系转成与 $D_0$ 的正交关系；其像只能为零，预解式单射便使 $\eta=0$。所以 $M=H$，由核域判据得到结论。

    正则平移保持 $C_c^\infty$，其范数导数分别是 $-\partial_j$；因此采用 $e^{itT}$ 的约定时生成元为 $+i\partial_j$。另一平移 $U_+(t)f(x)=f(x+t)$ 的生成元是 $-i\partial_j$。这两套符号可互换，但同一计算中必须保持一致。

## 11. 指数矩、Schwartz 空间与 Fourier 谱模型 { #section-11 }

### 用稠密向量检验完备性 { #topic-7-7-1 }

指数函数及 Gaussian 多项式提供具体的稠密测试族。指数矩使 Fourier 配对延拓为全纯函数，从而把所有矩为零转换成整个函数为零。

!!! theorem "命题 7.7.1：指数函数的稠密性"

    对任意有限正 Borel 测度 $\mu$，$\operatorname{span}\{e^{it\cdot x}:t\in\mathbb R^N\}$ 在 $L^2(\mu)$ 中稠密。

??? proof "证明 7.7.1"

    若 $h\in L^2(\mu)$ 与全部指数正交，则有限复测度 $h\,d\mu$ 的 Fourier 变换为零；其有限性由 Cauchy–Schwarz 得到。为说明测度唯一性，将 Fourier 配对公式用于紧支集函数并用 7.4.8 的一致稠密性，得到该测度对全部 $C_0$ 测试为零，故测度为零。于是 $h=0$，正交补判据给出稠密性。

!!! definition "定义 7.7.3：多变量全纯函数"

    开集 $\Omega\subset\mathbb C^N$ 上的连续函数若对每个变量单独全纯，则称全纯。有限维情形中这与通常的联合全纯定义一致。

!!! theorem "定理 7.7.4：指数矩保证多项式稠密"

    若有限正 Borel 测度满足某个 $r>0$ 的 $\int e^{r\sum_j|x_j|}\,d\mu<\infty$，则全部复多项式在 $L^2(\mu)$ 中稠密。条件等价于 $\sum_{n\in\mathbb N^N}r^{|n|}(\prod_j n_j!)^{-1}\int\prod_j|x_j|^{n_j}\,d\mu<\infty$。

??? proof "证明 7.7.4"

    展开 $e^{r\sum|x_j|}$，非负项的 Tonelli 定理给两条件等价。若 $h\in L^2(\mu)$ 与全部多项式正交，定义 $F(z)=\int\bar h(x)e^{iz\cdot x}\,d\mu(x)$。在 $|\operatorname{Im}z_j|<r/2$ 的较小闭条带上，Cauchy–Schwarz 和指数矩控制所有导数，可逐变量求导，故 $F$ 全纯。原点全部偏导均为零，Taylor 级数及连通域恒等定理使 $F$ 恒零。实轴上用 7.7.1 的测度唯一性得 $h=0$，因此多项式稠密。

!!! definition "定义 7.7.6：Gaussian 多项式空间"

    $\mathcal S_0(\mathbb R^N)$ 为 $x^\alpha e^{-|x|^2/2}$ 的有限线性组合空间。

!!! theorem "推论 7.7.7：Gaussian 多项式稠密"

    $\mathcal S_0$ 在 $L^2(\mathbb R^N,dx)$ 中稠密。

??? proof "证明 7.7.7"

    取 Gaussian 测度 $d\mu=e^{-|x|^2}dx$，它具有每个正半径的指数矩，7.7.4 保证多项式在 $L^2(\mu)$ 稠密。酉映射 $h\mapsto he^{-|x|^2/2}$ 把该空间送到 $L^2(dx)$，并把多项式送到 $\mathcal S_0$，所以后者稠密。

!!! theorem "命题 7.7.9：完备特征族判据"

    若对称 $T$ 的定义域包含标准正交基 $(e_i)$ 且 $Te_i=\lambda_ie_i$，$\lambda_i\in\mathbb R$，则 $T$ 本质自伴。对其闭包的任意有限值 Borel $f$，$e_i\in D(f(\overline T))$ 且 $f(\overline T)e_i=f(\lambda_i)e_i$。

??? proof "证明 7.7.9"

    若 $\xi\in\ker(T^*\mp i)$，则 $\langle e_j,T^*\xi\rangle=\langle Te_j,\xi\rangle=\lambda_j\langle e_j,\xi\rangle$，与 $T^*\xi=\pm i\xi$ 比较使每个系数为零。基完备给 $\xi=0$，故本质自伴。闭包的谱测度在 $e_j$ 上集中于 $\lambda_j$，因此任何有限值 Borel $f$ 的积分平方有限，且作用为 $f(\lambda_j)e_j$。

### Fourier 变换给出谱模型 { #topic-7-8-1 }

Schwartz 空间使求导、乘坐标和积分下运算都合法。Gaussian 先给可控的变换公式，稠密延拓再给全 $L^2$ 的酉变换，动量算子便成为坐标乘法。

!!! definition "定义 7.8.1：Schwartz 函数"

    光滑 $f$ 满足每个 $\sup_x|x^\alpha\partial^\beta f(x)|<\infty$ 时称 Schwartz 函数，空间记 $\mathcal S$；它包含于全部 $L^p$，$1\leq p\leq\infty$。

!!! theorem "命题 7.8.2：Schwartz 空间与 Fourier 运算"

    微分、乘坐标和 Fourier 变换保持 $\mathcal S$。对未归一化变换有 $\widehat{\partial_jf}(t)=it_j\widehat f(t)$、$\widehat{x_jf}(t)=i\partial_{t_j}\widehat f(t)$；逆号变换的两处 $i$ 改为 $-i$。

??? proof "证明 7.8.2"

    微分及乘坐标保持各 Schwartz 半范数，可用 Leibniz 公式直接核对。积分下求导给 $\partial_{t_j}\widehat f=\widehat{-ix_jf}$，分部积分给 $\widehat{\partial_jf}=it_j\widehat f$；快速衰减消除边界项。反复组合两式，用 $L^1$ 范数控制变换，得到全部 $t^\alpha\partial^\beta\widehat f$ 有界，故变换仍 Schwartz。逆号同理。

!!! theorem "命题 7.8.3：Gaussian 的变换"

    采用酉归一化 $\mathcal F=(2\pi)^{-N/2}\widehat{\phantom f}$，令 $\phi=e^{-|x|^2/2}$、$f=x^\alpha\phi$、$g=\partial^\alpha\phi$。则 $\mathcal Ff=i^{|\alpha|}g$、$\mathcal Fg=i^{|\alpha|}f$；逆变换将 $i$ 换成 $-i$。未归一化公式还须乘 $(2\pi)^{N/2}$。

??? proof "证明 7.8.3"

    一维 Gaussian 积分及积分下求导给 $\mathcal F\phi=\phi$，多维由乘积和 Fubini 得到。然后反复用 $\mathcal F(x_jf)=i\partial_j\mathcal Ff$ 和 $\mathcal F(\partial_jf)=ix_j\mathcal Ff$，得两式。逆变换反射频率，故 $i$ 变为 $-i$。

!!! theorem "定理 7.8.4：Plancherel 与反演"

    酉归一化变换在 $\mathcal S$ 上唯一延拓为 $L^2$ 酉算子 $\mathcal F$，满足 $\mathcal F^2f(x)=f(-x)$、$\mathcal F^4=1$、$\mathcal F^{-1}=\mathcal F^3$，并将 $\mathcal S$ 与 $\mathcal S_0$ 各自双射到自身。

??? proof "证明 7.8.4"

    7.8.3 先使 $\mathcal F_0$ 在 $\mathcal S_0$ 上双射，且平方为反射。Fourier 配对公式与复共轭关系给 $\|\mathcal F_0f\|_2=\|f\|_2$。对一般 Schwartz $f$ 及 $g\in\mathcal S_0$，配对公式给

    $$
    \left|\int\widehat f\,g\right|
    \leq\|f\|_2\|\widehat g\|_2=\|f\|_2\|g\|_2
    $$

    （此处变换均含酉归一化）。$\mathcal S_0$ 稠密遂给 $\|\mathcal Ff\|_2\leq\|f\|_2$，所以变换延拓到全 $L^2$。它在稠密子空间等距且像稠密，延拓因此酉。平方、四次方等式由稠密子空间延续；逆号变换保持 Schwartz 且与正号变换在稠密 $\mathcal S_0$ 上互逆，连续性得全部 Schwartz 上的反演与满射。

!!! theorem "定理 7.8.5：平移与动量的谱模型"

    对 $U_-(t)f(x)=f(x-t)$，$\mathcal FU_-(t)\mathcal F^{-1}=M_{e^{-it\cdot x}}$。若 $P_j=\overline{-i\partial_j|_{C_c^\infty}}$，则 $\mathcal FP_j\mathcal F^{-1}=M_{x_j}$，包括最大定义域；$U_-(t)=e^{-it\cdot P}$。

??? proof "证明 7.8.5"

    平移公式先在 Schwartz 上给 $\mathcal FU_-(t)\mathcal F^{-1}=M_{e^{-it\cdot x}}$，有界性使等式扩到 $L^2$。两群的自伴生成元由差商唯一确定，故 $-P_j$ 被共轭为 $-M_{x_j}$，亦即 $P_j$ 对应 $M_{x_j}$；生成元唯一性同时确定最大定义域。

??? proof "指数矩为何能决定多项式"

    若 $h\in L^2(\mu)$ 与所有指数函数正交，则复测度 $h\mu$ 的 Fourier 变换为零；测度版 Fourier 唯一性给出 $h=0$，证明指数族稠密。

    指数矩条件下，若 $h$ 与全部多项式正交，$F(z)=\int h(x)e^{iz\cdot x}\,d\mu(x)$ 在原点附近的复带状域全纯。Cauchy–Schwarz 和指数矩控制所有差商与导数；原点全部导数为零。解析唯一性使 $F$ 在该域为零，并沿实方向推广到全部实参数。指数族稠密性于是给出 $h=0$。Gaussian 测度满足任意有限指数矩，乘 Gaussian 的等距换元得到 $\mathcal S_0$ 稠密。

## 12. 相对有界扰动与正定函数 { #section-12 }

### 小扰动怎样保持域与可逆性 { #topic-7-9-1 }

相对界比较扰动与主算子的图像范数。界小于一时，Neumann 级数控制预解式，图像范数等价保持核域；Sobolev 估计再把这些抽象条件用于势函数和一阶项。

!!! definition "定义 7.9.1：相对有界"

    $B$ 为 $A$-有界，指 $D(A)\subset D(B)$ 且 $\|B\xi\|\leq\alpha\|A\xi\|+\beta\|\xi\|$。$\alpha$ 称一个相对界；$\beta=0$ 时称严格相对有界。

!!! theorem "命题 7.9.3：相对界传到闭包"

    若 $A,B$ 均可闭，则上述定义域包含和估计传到 $\overline A,\overline B$，常数不变。

??? proof "证明 7.9.3"

    若 $\xi_n\in D(A)$ 图像趋于 $\xi\in D(\overline A)$，相对界使 $B\xi_n$ Cauchy。因 $B$ 可闭，极限为 $\overline B\xi$，所以 $\xi\in D(\overline B)$。在原估计中取极限，常数不变。

!!! theorem "定理 7.9.4：小扰动保持可逆"

    若 $A^{-1}$ 处处有界，$B$ 严格 $A$-有界且 $\alpha<1$，则 $(A+B)^{-1}$ 处处有界，定义域为 $D(A)$。

??? proof "证明 7.9.4"

    令 $C=BA^{-1}$，严格相对界给 $\|C\|\leq\alpha<1$。于是 $I+C$ 有 Neumann 逆，且在 $D(A)$ 上 $A+B=(I+C)A$。故逆为 $A^{-1}(I+C)^{-1}$，处处有界；相对有界性使共同域就是 $D(A)$。

!!! theorem "命题 7.9.5：非实大参数处可逆"

    若 $A$ 自伴，$B$ 为 $A$-有界且相对界小于一，则对充分大的正 $y$，$A+B\pm iy$ 均有处处有界逆；不要求 $B$ 对称。

??? proof "证明 7.9.5"

    谱估计 $\|A(A\pm iy)^{-1}\|\leq1$、$\|(A\pm iy)^{-1}\|\leq y^{-1}$ 给

    $$
    \|B(A\pm iy)^{-1}\|\leq\alpha+\beta/y<1
    $$

    当 $y$ 充分大。用 7.9.4 的同一 Neumann 分解便得两处有界逆。

!!! theorem "定理 7.9.6：Kato–Rellich 定理"

    自伴 $A$ 与对称 $B$ 满足相对界 $\alpha<1$ 时，$A+B$ 在 $D(A)$ 上自伴，且与 $A$ 有相同核域。

??? proof "证明 7.9.6"

    $A+B$ 在 $D(A)$ 对称，7.9.5 使它加、减充分大的非实参数均满射。对称算子的满射判据（将参数缩放为 $i$）给自伴性。7.9.7 给图像范数等价，所以两者核域相同。

!!! theorem "命题 7.9.7：图像范数的等价"

    若 $A,B$ 取值于同一 Hilbert 空间，$B$ 为 $A$-有界且 $\alpha<1$，则 $A$ 与 $A+B$ 的图像范数等价。二者核域相同，且同时可闭。

??? proof "证明 7.9.7"

    上界由三角不等式得到。反向

    $$
    (1-\alpha)\|A\xi\|\leq\|(A+B)\xi\|+\beta\|\xi\|,
    $$

    故图像范数等价，并给同样的图像稠密子域。若 $A$ 可闭，对 $\xi_n\to0$、$(A+B)\xi_n$ 收敛，反向估计使 $A\xi_n$ Cauchy，其极限为零，再用相对界得 $B\xi_n\to0$。反向若 $A+B$ 可闭、$A\xi_n$ 收敛，相对界使 $B\xi_n$ Cauchy；和的极限为零，于是上式迫使 $A\xi_n\to0$。故可闭性也等价。

!!! theorem "推论 7.9.8：本质自伴的扰动"

    若 $A$ 本质自伴，$B$ 对称且为 $A$-有界、相对界小于一，则 $A+B$ 本质自伴。

??? proof "证明 7.9.8"

    $B$ 对称故可闭，7.9.3 将相对界传到自伴 $\overline A$。Kato–Rellich 使 $\overline A+\overline B|_{D(\overline A)}$ 自伴，原域由等价图像范数是其核域，所以原 $A+B$ 本质自伴。

!!! theorem "引理 7.9.9：低维 Sobolev 估计"

    $N=1,2,3$ 时，对每个 $\alpha>0$ 存在 $\beta>0$，使 $f\in\mathcal S(\mathbb R^N)$ 满足 $\|f\|_\infty\leq\alpha\|\Delta f\|_2+\beta\|f\|_2$。

??? proof "证明 7.9.9"

    Fourier 反演给 $\|f\|_\infty\leq(2\pi)^{-N/2}\|\mathcal Ff\|_1$。引入参数 $R>0$ 并用 Cauchy–Schwarz：

    $$
    \|\mathcal Ff\|_1
    \leq\left(\int_{\mathbb R^N}(R^2+|x|^2)^{-2}dx\right)^{1/2}
    \|(R^2+|x|^2)\mathcal Ff\|_2.
    $$

    积分在 $N<4$ 时有限，平方根为常数乘 $R^{N/2-2}$。故右侧至多为 $C_NR^{N/2-2}(\|\Delta f\|_2+R^2\|f\|_2)$。取充分大的 $R$ 使第一系数小于给定 $\alpha$，第二系数即为 $\beta$。

!!! theorem "定理 7.9.11：$L^2+L^\infty$ 势"

    $N=1,2,3$ 且实 $V\in L^2+L^\infty$ 时，$-\overline\Delta+M_V$ 在 $D(\overline\Delta)=H^2(\mathbb R^N)$ 上自伴，$C_c^\infty$ 为核域；初始域上的 $-\Delta+V$ 本质自伴。乘势具有任意小的 Laplacian 相对界。

??? proof "证明 7.9.11"

    写 $V=V_2+V_\infty$。有 $\|Vf\|_2\leq\|V_2\|_2\|f\|_\infty+\|V_\infty\|_\infty\|f\|_2$。7.9.9 允许把 $\Delta$ 系数任意缩小，得到任意小相对界。将估计由 Schwartz 核域延拓到 $D(\overline\Delta)$，再用 Kato–Rellich 得自伴性和原测试核域。Fourier 模型中该域由 $|x|^2\widehat f\in L^2$ 定义，正是 $H^2$。

!!! theorem "定理 7.9.14：正参数处的逆"

    若 $A$ 正自伴，$B$ 为 $A$-有界且相对界小于一，则存在 $\lambda_0$，使每个 $\lambda\geq\lambda_0$ 的 $\lambda+A+B$ 有处处有界逆。

??? proof "证明 7.9.14"

    正谱上 $\|A(\lambda+A)^{-1}\|\leq1$、$\|(\lambda+A)^{-1}\|\leq\lambda^{-1}$。于是 $\|B(\lambda+A)^{-1}\|\leq\alpha+\beta/\lambda<1$ 对全部充分大的 $\lambda$ 成立，Neumann 逆给出结论。

!!! theorem "推论 7.9.15：下界在小扰动下保留"

    若再要求 $B$ 对称，则 $A+B$ 自伴且下有界；上述 $L^2+L^\infty$ 实势 Hamiltonian 因而下有界。

??? proof "证明 7.9.15"

    Kato–Rellich 已给自伴性。7.9.14 排除全部充分大的负实数属于其谱，故谱有下界；谱积分说明同一下界也是算子二次型下界。势函数情形满足相同假设。

!!! theorem "命题 7.9.16：平方根相对界"

    若 $A$ 正自伴而 $B$ 为 $\sqrt A$-有界，则 $B$ 对 $A$ 具有任意小的正相对界。

??? proof "证明 7.9.16"

    正谱上的标量不等式 $\sqrt x\leq\varepsilon x+C_\varepsilon$，或平方后的相应估计，给 $\|\sqrt A\xi\|\leq\varepsilon\|A\xi\|+C_\varepsilon\|\xi\|$。代入 $B$ 的 $\sqrt A$ 相对界，任意缩小 $\varepsilon$ 即得到任意小 $A$ 相对界，同时 $D(A)\subset D(\sqrt A)\subset D(B)$。

!!! theorem "定理 7.9.17：Dirichlet 一阶扰动"

    对开集 $\Omega$、有界可测系数 $a_j,b$，令 $X_j=\overline{\partial_j|_{C_c^\infty}}$。有 $D(\sqrt{-\Delta_D})\subset D(X_j)$；$T=-\Delta_D+\sum_jM_{a_j}X_j+M_b$ 定义域为 $D(\Delta_D)$，充分大的 $\lambda$ 使 $\lambda+T$ 有处处有界逆。复系数时不额外声称自伴。

??? proof "证明 7.9.17"

    极分解给 $D(\sqrt{-\Delta_D})=D(G)$、$\|\sqrt{-\Delta_D}\xi\|=\|G\xi\|$。梯度各分量 $X_j$ 满足 $\|X_j\xi\|\leq\|G\xi\|$。有界系数因而使一阶项对 $\sqrt{-\Delta_D}$ 相对有界；7.9.16 使其对 $-\Delta_D$ 有任意小相对界，再用 7.9.14 得正参数处有界逆。

!!! theorem "定理 7.9.18：Neumann 一阶扰动"

    相同系数条件下，$D(\sqrt{-\Delta_N})\subset D(X_j^*)$；$S=-\Delta_N-\sum_jM_{a_j}X_j^*+M_b$ 的定义域为 $D(\Delta_N)$，充分大的 $\lambda$ 使 $\lambda+S$ 有处处有界逆。

??? proof "证明 7.9.18"

    对闭散度 $D$ 的伴随用极分解，得 $D(\sqrt{-\Delta_N})=D(D^*)$ 及 $\|\sqrt{-\Delta_N}\xi\|=\|D^*\xi\|$。从伴随测试恒等式逐分量可知 $\xi\in D(X_j^*)$，且 $D^*\xi=(X_j^*\xi)_j$，故每个分量由该范数控制。其余相对界与 Neumann 逆步骤同 7.9.17。

### 形式序、正定函数与解析向量 { #topic-7-10-1 }

形式序同时比较能量与形式域。正定函数通过内积构造恢复酉群，解析向量则通过指数矩控制所有幂，三者都把无穷信息组织为可用的估计。

!!! definition "定义 7.10.1：正自伴算子的形式序"

    $A\leq B$ 指 $D(\sqrt B)\subset D(\sqrt A)$，且全部 $\xi\in D(\sqrt B)$ 满足 $\|\sqrt A\xi\|^2\leq\|\sqrt B\xi\|^2$。这是包括形式域包含的序，不能只比较原算子域上的数值。

!!! theorem "引理 7.10.3：对称满射即自伴"

    稠密定义对称 $A$ 若 $\operatorname{ran}A=H$，则 $A$ 自伴。

??? proof "证明 7.10.3"

    若 $\xi\in D(A^*)$，满射性允许选 $\eta\in D(A)$ 使 $A\eta=A^*\xi$。对称性给 $A\subset A^*$，故 $\xi-\eta\in\ker A^*=(\operatorname{ran}A)^\perp=0$。所以 $D(A^*)\subset D(A)$，与反向包含合起来得到自伴。

!!! definition "定义 7.10.4：测度的 Fourier 变换"

    有限正 Borel 测度的 $\widehat\mu(t)=\int e^{-it\cdot x}\,d\mu(x)$ 有界连续，且 $|\widehat\mu(t)|\leq\mu(\mathbb R^N)$。

!!! definition "定义 7.10.5：正定函数"

    $\gamma:\mathbb R^N\to\mathbb C$ 正定，指对任意有限点 $t_j$ 与系数 $c_j$，$\sum_{j,k}\overline c_j\gamma(t_j-t_k)c_k\geq0$。连续于零的正定函数自动处处连续，并唯一是有限正测度的 Fourier 变换，即 Bochner 定理。

??? proof "证明 7.10.5"

    正定性给 $\gamma(-t)=\overline{\gamma(t)}$、$|\gamma(t)|\leq\gamma(0)$。在有限形式和 $\sum c_t e_t$ 上定义 $\langle e_s,e_t\rangle=\gamma(s-t)$，商去零范数并完备化。平移 $U(a)e_t=e_{t+a}$ 保持内积；$\|U(a)e_t-e_t\|^2=2(\gamma(0)-\operatorname{Re}\gamma(a))\to0$，所以由稠密性及统一等距界得到强连续酉群。

    Stone 定理给强交换自伴生成元，取循环向量 $e_0$ 的谱测度 $\mu$，则 $\gamma(t)=\langle U(t)e_0,e_0\rangle=\int e^{-it\cdot x}\,d\mu$，质量为 $\gamma(0)$。反向测度表示的正定性来自 $\int|\sum c_je^{it_j\cdot x}|^2d\mu\geq0$。测度 Fourier 唯一性给唯一，支配收敛给处处连续。

!!! definition "定义 7.10.6：联合光滑向量"

    $C^\infty(T_\bullet)$ 为全部有限算子单词 $T_{i_1}\cdots T_{i_k}$ 的定义域之交，其中 $k\geq1$。它对各 $T_j$ 不变；其中向量称联合光滑向量。

!!! definition "定义 7.10.7：联合解析向量"

    强交换自伴族的光滑向量 $\xi$ 解析，指存在 $r>0$ 使 $\sum_{n\in\mathbb N^N}r^{|n|}(\prod_jn_j!)^{-1}\|T_1^{n_1}\cdots T_N^{n_N}\xi\|<\infty$。等价于存在某个正半径使相应项的上确界有限，必要时缩小半径。此条件也等价于向量谱测度具有某个正指数矩。

??? proof "证明 7.10.7"

    若幂范数的加权和在半径 $r$ 有限，上确界显然有限；若上确界在 $r$ 有限，缩小到 $s<r$ 后由 $\sum_{n\in\mathbb N^N}(s/r)^{|n|}<\infty$ 得和有限。

    指数矩为 $M=\int e^{a\sum|x_j|}\,d\mu_\xi<\infty$ 时，
    $\|T^n\xi\|^2=\int|x|^{2n}d\mu_\xi\leq M(2n)!a^{-2|n|}$（阶乘逐坐标相乘）。因 $\sqrt{(2k)!}/k!\leq2^k$，取 $r<a/2$ 得解析级数收敛。反向，若 $K=\sum r^{|n|}\|T^n\xi\|/n!<\infty$，Cauchy–Schwarz 给 $\int|x|^n\,d\mu_\xi\leq\|\xi\|\|T^n\xi\|$；非负级数与 Tonelli 得 $\int e^{r\sum|x_j|}d\mu_\xi\leq\|\xi\|K$。

??? proof "小相对界与有界逆"

    写 $A+B=(1+BA^{-1})A$；严格相对界使 $\|BA^{-1}\|<1$，Neumann 级数给出逆。对自伴 $A$，$\|(A\pm iy)^{-1}\|\leq1/y$ 且 $\|A(A\pm iy)^{-1}\|\leq1$，所以扰动预解式的范数至多为 $\alpha+\beta/y<1$。两种非实满射性加对称性得到自伴。

    两侧图像估计来自 $\|B\xi\|\leq\alpha\|A\xi\|+\beta\|\xi\|$ 和 $(1-\alpha)\|A\xi\|\leq\|(A+B)\xi\|+\beta\|\xi\|$。平方根相对界用标量不等式 $\sqrt t\leq\varepsilon t+C_\varepsilon$ 降为任意小相对界。低维 Sobolev 估计在 Fourier 侧将 $\int|\widehat f|$ 分为球内和球外，球外的 $|\xi|^{-4}$ 在 $N<4$ 可积；增大球半径使高频系数任意小。

## 13. Hilbert 空间值积分 { #section-13 }

设 $(X,\mathcal M,\mu)$ 为测度空间，$H$ 为 Hilbert 空间。“可测”指相对于 $H$ 的范数 Borel 结构。

### 向量积分的存在与极限 { #topic-7-A-1 }

向量积分先由全部内积测试定义，范数可积性给有界配对，再用 Riesz 表示恢复积分向量。可分值域及可数极限保证可测性，控制收敛使积分下取极限和求导合法。

!!! theorem "命题 7.A.1：可分值域的可测性"

    若 $f:X\to H$ 的值域可分，则 $f$ 可测当且仅当对每个 $\eta\in H$，标量函数 $\langle\eta,f(\cdot)\rangle$ 可测。

??? proof "证明 7.A.1"

    可测函数与连续内积测试复合当然可测。反向取包含值域的可分闭子空间及其可数稠密集 $(v_n)$，弱可测性使 $\|f-v_n\|^2=\|f\|^2-2\operatorname{Re}\langle v_n,f\rangle+\|v_n\|^2$ 可测；这里 $\|f\|$ 可由可数单位向量测试的上确界表示。可数球构成该子空间的拓扑基，故每个开集原像可测。

!!! theorem "推论 7.A.3：可测函数的运算"

    可测且值域可分的 $f,g$，以及可测标量 $\gamma$，给出可测函数 $f+g$、$\gamma f$、$\langle f,g\rangle$。

??? proof "证明 7.A.3"

    两个可分值域的线性闭张成仍可分。$f+g$、$\gamma f$ 的全部固定向量测试可测，7.A.1 得向量可测。取可数正交基将内积写成部分和的极限，得到 $\langle f,g\rangle$ 可测；也可通过可测简单向量逼近得到。

!!! theorem "推论 7.A.4：逐点序列极限"

    可测且各自值域可分的 $f_n$ 若逐点范数趋于 $f$，则 $f$ 仍可测且值域可分。

??? proof "证明 7.A.4"

    所有值域的可数并的闭线性张成是可分空间，且包含极限值域。对固定向量，内积测试是可测标量函数的逐点极限，故可测；7.A.1 再给向量可测。

!!! definition "定义 7.A.5：弱积分"

    可测 $f$ 弱可积，指所有标量 $\langle\eta,f\rangle$ 可积，且存在 $I\in H$ 使 $\langle\eta,I\rangle=\int\langle\eta,f\rangle\,d\mu$ 对全部 $\eta$ 成立。$I$ 唯一，记 $\int f\,d\mu$，积分对可积函数线性。

!!! theorem "命题 7.A.6：积分的范数界"

    弱可积函数满足 $\|\int f\,d\mu\|\leq\int\|f\|\,d\mu$，右侧允许无穷。

??? proof "证明 7.A.6"

    对单位向量 $\eta$，$|\langle\eta,\int f\rangle|\leq\int|\langle\eta,f\rangle|\leq\int\|f\|$。对单位球取上确界就是积分向量范数，得到估计；右边无穷时不等式也成立。

!!! theorem "命题 7.A.7：有界线性映射与积分"

    弱可积 $f$ 和有界 $T:H\to K$ 满足 $Tf$ 弱可积，且 $T\int f=\int Tf$。

??? proof "证明 7.A.7"

    对 $\eta\in K$，$\langle\eta,Tf\rangle=\langle T^*\eta,f\rangle$ 可积，且其积分等于 $\langle T^*\eta,\int f\rangle=\langle\eta,T\int f\rangle$。因此 $T\int f$ 满足弱积分定义，唯一性给等式。

!!! theorem "命题 7.A.8：积分所在的子空间"

    弱积分属于 $\overline{\operatorname{span}f(X)}$，因为与该子空间正交的全部向量测试积分为零。

??? proof "证明 7.A.8"

    令 $M=\overline{\operatorname{span}f(X)}$。任何 $\eta\in M^\perp$ 都有 $\langle\eta,f(x)\rangle=0$，积分后 $\langle\eta,\int f\rangle=0$。故积分属于 $M^{\perp\perp}=M$。

!!! definition "定义 7.A.9：可积与 Bochner 可积"

    可测 $f$ 若 $\int\|f\|<\infty$，称范数可积。若另有可分值域，称 Bochner 可积；允许先删去零测集再要求可分值域时，给出通常的等价类定义。

!!! theorem "定理 7.A.10：范数可积保证弱积分"

    每个范数可积的 Hilbert 值函数均弱可积：积分配对为有界泛函，Riesz 表示给出对应向量。

??? proof "证明 7.A.10"

    配对 $\eta\mapsto\int\langle\eta,f\rangle$ 是反线性有界泛函，其范数至多 $\int\|f\|$。Hilbert 空间的 Riesz 表示给唯一向量 $I$，使该配对等于 $\langle\eta,I\rangle$，这恰是弱积分定义。

!!! theorem "定理 7.A.11：向量控制收敛"

    第一可数指标上的 Bochner 可积网 $f_\alpha$ 若逐点范数趋于 $f$，且 $\|f_\alpha\|\leq g\in L^1$，则 $f$ Bochner 可积，$\int\|f_\alpha-f\|\to0$，故向量积分范数收敛。

??? proof "证明 7.A.11"

    第一可数有向指标允许取递增共尾序列，故极限是可数个可分值域函数的范数极限；7.A.4 保证可测及可分值域，且 $\|f\|\leq g$。标量函数 $\|f_\alpha-f\|\leq2g$ 趋零，第一可数网的标量控制收敛定理给积分趋零，再由 7.A.6 得向量积分收敛。第一可数性不能任意删掉：一般网的逐点极限不自动适用标量控制收敛。

!!! theorem "推论 7.A.12：积分下求导"

    若区间 $I$ 上每个 $f(\cdot,t)$ Bochner 可积，每个 $x$ 的 $t\mapsto f(x,t)$ 可微且导数连续，并有同一个 $g\in L^1$ 控制全部 $\|\partial_tf(x,t)\|$，则导数截面 Bochner 可积，且 $\frac d{dt}\int f(x,t)\,d\mu=\int\partial_tf(x,t)\,d\mu$。端点按单侧导数解释。

??? proof "证明 7.A.12"

    导数是可数差商的逐点极限，故可测且值域可分；范数被 $g$ 控制，因而 Bochner 可积。微积分基本定理给小差商的范数也被 $g$ 控制，7.A.11 将差商极限移入积分，得到求导公式。端点只取允许方向的差商。

!!! theorem "命题 7.A.13：积分向量的内积"

    对 Bochner 可积 $f,g$，$\langle\int f,\int g\rangle=\int_X\int_X\langle f(x),g(y)\rangle\,d\mu(x)d\mu(y)$，两种迭代次序相同；绝对可积性由 $\|f(x)\|\|g(y)\|$ 控制。

??? proof "证明 7.A.13"

    绝对值被 $\|f(x)\|\|g(y)\|$ 控制，其双积分等于两个有限范数积分的乘积，故 Fubini 合法。先对 $y$ 用弱积分定义，再对 $x$ 使用共轭线性关系，得到双积分等于 $\langle\int f,\int g\rangle$；换序同样合法。

??? proof "可测性和控制收敛"

    可分值域的闭线性张成有可数标准正交基。标量坐标可测使各有限坐标投影可测；投影范数极限等于原函数，所以原函数可测。逐点序列极限的值域包含于全部值域并集的闭包，仍可分。

    第一可数指标允许取共尾序列，其值域闭包为可分空间并包含全部极限值。标量控制收敛作用于 $\|f_\alpha-f\|$，再由积分范数界得到积分收敛。求导时差商由导数的积分平均表示，统一控制函数和导数连续性使控制收敛可应用。

## 14. 练习 { #section-14 }

!!! problem "练习 1：形式域与算子域"

    对 $A_D=-u''$ 于 $(0,1)$，说明 $u\in H_0^1$ 只够定义能量，并不自动保证 $u\in D(A_D)$。

??? proof "解"

    取满足端点为零的分段线性帐篷函数。它的一阶弱导数是有界分段常数，故属于 $H_0^1$。但二阶分布导数含顶点处的 Dirac 测度，不属于 $L^2$，所以不在 $H^2\cap H_0^1$。

!!! problem "练习 2：生成元的定义域"

    在 $\ell^2$ 上令 $U(t)x=(e^{int}x_n)$。求自伴生成元，并说明为何群强连续但不是算子范数连续。

??? proof "解"

    生成元为 $Ax=(nx_n)$，定义域是 $\sum n^2|x_n|^2<\infty$。对固定 $x$，控制收敛保证强连续。取 $t_k=\pi/k$，则第 $k$ 个坐标的乘子为 $-1$，故 $\|U(t_k)-I\|=2$。

!!! problem "练习 3：有界势"

    若 $V\in L^\infty(\mathbb R^d,\mathbb R)$，证明 $-\Delta+V$ 在 $H^2$ 上自伴，并给出能量下界。

??? proof "解"

    实乘法算子 $M_V$ 有界自伴，相对界 $a=0$。Kato–Rellich 给出自伴性。$\langle u,(-\Delta+V)u\rangle\ge-\|V_-\|_\infty\|u\|^2$，其中 $V_-=\max\{-V,0\}$。

下一章利用紧性，把有界区域上的自伴微分算子化成离散谱。

[返回目录](index.md){ .md-button }
