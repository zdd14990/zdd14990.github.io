---
title: 第六章：无界算子、定义域与自伴扩张
date: 2026-10-04
description: 系统学习无界算子的图、闭包、伴随、亏指数及 Cayley 变换，并证明无界自伴谱定理。
hide:
  - navigation
categories:
  - 分析
  - 泛函分析
tags:
  - functional-analysis
  - unbounded-operators
  - spectral-theory
  - course
---

# 第六章：无界算子、定义域与自伴扩张 { #chapter-06 }

## 1. 为什么不能只写一个微分表达式 { #section-1 }

在 $L^2$ 中，位置算子 $u(x)\mapsto xu(x)$ 和动量表达式 $-i\,\mathrm{d}/\mathrm{d}x$ 通常无界。高频函数的导数可以很大，而函数自身的 $L^2$ 范数不变。它们仍然是重要的算子，但不能定义在所有 $L^2$ 元素上。

更重要的是，同一个表达式配上不同边界条件，可以给出不同谱。例如在 $(0,1)$ 上，$-i\,\mathrm{d}/\mathrm{d}x$ 配周期条件与配相位周期条件的特征值就不同。

!!! definition "算子包含定义域"

    无界算子 $T:H\supset D(T)\to K$ 是定义在线性子空间 $D(T)$ 上的线性映射。“无界算子”作为理论类别也允许实际有界的映射。

    $S\subset T$ 表示 $D(S)\subset D(T)$ 且二者在 $D(S)$ 上相同。算子相等必须同时有相同定义域和相同作用。

本章对伴随使用**稠密定义**的算子，保证伴随表示向量唯一。非稠密定义情形需要线性关系等额外语言，此处不混入基本定义。

## 2. 图、闭性、闭包与核心 { #section-2 }

!!! definition "图与闭算子"

    $G(T)=\{(x,Tx):x\in D(T)\}\subset H\oplus K$。若 $G(T)$ 闭，称 $T$ 闭。

    等价地，若 $x_n\in D(T)$、$x_n\to x$、$Tx_n\to y$，则 $x\in D(T)$ 且 $Tx=y$。

    图范数为 $\|x\|_T=(\|x\|^2+\|Tx\|^2)^{1/2}$。$T$ 闭等价于 $D(T)$ 在图范数下完备。

闭性不等于有界性。它只说输入和输出同时收敛时，极限仍符合算子关系。第十章的闭图像定理只有在定义域是整个 Banach 空间时才推出有界性。

!!! definition "可闭与核心"

    若 $\overline{G(T)}$ 仍是某个算子的图，称 $T$ 可闭，所得算子记为 $\overline T$。线性子空间 $D_0\subset D(T)$ 在图范数下稠密时，称 $T$ 的核心；于是 $\overline{T|_{D_0}}=T$，前提是 $T$ 闭。

!!! theorem "可闭判据"

    $T$ 可闭，当且仅当每个 $x_n\in D(T)$ 若满足 $x_n\to0$、$Tx_n\to y$，就有 $y=0$。

??? proof "证明"

    图闭包是线性子空间。它是一个映射的图，当且仅当同一输入不能对应两个输出；两个图点相减后，这等价于不存在非零竖直图点 $(0,y)$。在 Hilbert 直和这个度量空间中，闭包中的竖直图点正由这样的序列产生。

!!! example "一个不可闭算子"

    令 $T:C[0,1]\subset L^2[0,1]\to\mathbb C$，$Tf=f(0)$。第一章中的连续尖峰满足 $f_n\to0$ 于 $L^2$，但 $Tf_n=1$，所以它不可闭。

## 3. 伴随与对称性 { #section-3 }

!!! definition "无界算子的伴随"

    若 $D(T)$ 在 $H$ 中稠密，定义

    $$
    D(T^*)=\{y\in K:\exists z\in H,\ \langle Tx,y\rangle=\langle x,z\rangle\ \forall x\in D(T)\},
    $$

    并令 $T^*y=z$。唯一性由 $D(T)$ 稠密保证。等价条件是左端关于 $x$ 的作用可被 $C_y\|x\|$ 控制。

!!! theorem "伴随的闭性与可闭性"

    $T^*$ 总是闭的。$T$ 可闭当且仅当 $D(T^*)$ 稠密；此时 $\overline T=T^{**}$，且 $(\overline T)^*=T^*$。

??? proof "证明"

    若 $y_n\to y$、$T^*y_n\to z$，对每个固定 $x\in D(T)$ 将伴随等式取极限，便得 $y\in D(T^*)$、$T^*y=z$。

    图的正交补有精确形式

    $$
    G(T)^\perp=\{(-T^*y,y):y\in D(T^*)\}.
    $$

    因此 $(0,z)\in\overline{G(T)}$ 当且仅当 $z$ 与 $D(T^*)$ 中所有向量正交。图闭包没有非零竖直点，当且仅当 $D(T^*)$ 稠密。再对图取两次正交补，得到 $G(T^{**})=\overline{G(T)}$。伴随等式对图极限仍成立，故闭包不改变伴随。

!!! definition "对称、自伴、本质自伴"

    稠密定义的 $T:H\supset D(T)\to H$ 若满足 $T\subset T^*$，称对称，也称 Hermitian。若 $T=T^*$，称自伴。若 $\overline T$ 自伴，称本质自伴。

对称性只检验定义域内的配对；自伴性还要求伴随没有更大的定义域。对称算子自动可闭，因为 $D(T)\subset D(T^*)$ 稠密。

对稠密定义的算子，始终有 $(\operatorname{Ran}T)^\perp=\ker T^*$。反向的像空间描述要加闭包。算子和与积也有定义域：

$$
D(S+T)=D(S)\cap D(T),
\qquad D(ST)=\{x\in D(T):Tx\in D(S)\}.
$$

对无界算子不能任意交换乘积，也不能无条件套用有界算子的伴随乘法公式。

## 4. Cayley 变换：把无界问题变成等距扩张 { #section-4 }

若 $T$ 对称，则

$$
\|(T\pm iI)x\|^2=\|Tx\|^2+\|x\|^2.
$$

因此 $T\pm iI$ 单射，且在 $T$ 闭时其像闭。定义

$$
U_T=(T-iI)(T+iI)^{-1}:
\operatorname{Ran}(T+iI)\to\operatorname{Ran}(T-iI).
$$

这是两个像空间间的等距满射，称 Cayley 变换。它把寻找对称扩张的问题，变成寻找等距映射扩张的问题。

!!! theorem "自伴性的满射判据"

    对稠密定义对称 $T$，

    $$
    T=T^*\quad\Longleftrightarrow\quad
    \operatorname{Ran}(T+iI)=\operatorname{Ran}(T-iI)=H.
    $$

    因而自伴算子的 Cayley 变换是全空间上的酉算子。

??? proof "证明"

    若 $T$ 自伴，它闭；上面的估计使像闭。像的正交补为 $\ker(T\mp iI)=0$，所以像稠密，继而满射。

    反过来，设两个像都为 $H$。对 $y\in D(T^*)$，由满射性选 $x\in D(T)$，使 $(T-iI)x=(T^*-iI)y$。于是 $y-x\in\ker(T^*-iI)$，而此核等于 $\operatorname{Ran}(T+iI)^\perp=0$，故 $y=x\in D(T)$。因此 $T^*=T$。

反向变换为

$$
T=i(I+U)(I-U)^{-1},\qquad D(T)=\operatorname{Ran}(I-U).
$$

需要 $\ker(I-U)=0$，否则逆的输入不能唯一决定原像。酉性使此像稠密；所得算子自伴。即使 $U$ 没有特征值 $1$，$1$ 仍可属于连续谱，因此 $T$ 可能无界。

## 5. 亏空间与所有自伴扩张 { #section-5 }

设 $T$ 闭、稠密定义且对称。定义

$$
N_+=\ker(T^*-iI),\qquad N_-=\ker(T^*+iI),
\qquad n_\pm=\dim N_\pm.
$$

它们正是 Cayley 变换定义空间与像空间的正交补：$N_+=\operatorname{Ran}(T+iI)^\perp$，$N_-=\operatorname{Ran}(T-iI)^\perp$。

!!! theorem "von Neumann 自伴扩张定理"

    $T$ 存在自伴扩张，当且仅当 $n_+=n_-$。每个酉映射 $V:N_+\to N_-$ 对应一个自伴扩张 $T_V$：

    $$
    D(T_V)=D(T)\mathbin{\dot+}\{u+Vu:u\in N_+\},
    $$

    $$
    T_V(x+u+Vu)=Tx+iu-iVu.
    $$

    点号表示代数直和。$n_+=n_-=0$ 等价于 $T$ 自伴；对未闭对称算子，则先取闭包，零亏指数对应本质自伴。

??? proof "证明：缺少的边界信息藏在何处"

    先建立图范数正交分解

    $$
    D(T^*)=D(T)\mathbin{\dot+}N_+\mathbin{\dot+}N_-.
    $$

    对 $y\in D(T^*)$，把 $(T^*+iI)y$ 按闭空间 $\operatorname{Ran}(T+iI)$ 与其正交补 $N_+$ 分解为 $(T+iI)x+v$。令 $u=v/(2i)\in N_+$，则 $y-x-u\in N_-$。各部分在图内积下正交，因此分解唯一。

    在此分解中，边界形式

    $$
    \mathfrak b(y,z)=\langle T^*y,z\rangle-\langle y,T^*z\rangle
    $$

    在 $D(T)$ 部分为零，在 $N_+$ 上为 $-2i\langle u,v\rangle$，在 $N_-$ 上为 $2i\langle u,v\rangle$，交叉部分为零。

    所以 $u+Vu$ 形成对称扩张，恰要求 $V$ 保持内积。要让扩张与其伴随的定义域相同，还必须把全部两个亏空间匹配，即 $V$ 酉且满射。得到定理的条件和公式。

    从 Cayley 角度，同样是在两个正交补之间补上酉映射；按本节的 $u+Vu$ 记法，补在 Cayley 变换上的映射是 $-V$。这个负号只来自参数化约定。

## 6. 一个完整例子：区间上的动量算子 { #section-6 }

在 $H=L^2(0,1)$ 上定义

$$
T_0=-i\frac{\mathrm d}{\mathrm dx},\qquad D(T_0)=C_c^\infty(0,1).
$$

分部积分给出对称性。其闭包 $T$ 的定义域是 $H_0^1(0,1)$，伴随 $T^*$ 的定义域是 $H^1(0,1)$，两者作用均为 $-iu'$。

这里 $H^1$ 的函数有绝对连续代表，弱导数属于 $L^2$，因此端点值有意义。伴随条件正是弱导数条件；图范数等于 $H^1$ 范数，紧支撑光滑函数的图闭包给出 $H_0^1$。

对 $u,v\in H^1$，边界形式为

$$
\langle T^*u,v\rangle-\langle u,T^*v\rangle
=i[\overline u v]_0^1.
$$

!!! theorem "相位周期边界给出全部自伴扩张"

    对 $\theta\in[0,2\pi)$，

    $$
    D(T_\theta)=\{u\in H^1(0,1):u(1)=e^{i\theta}u(0)\},
    \qquad T_\theta u=-iu'.
    $$

    它自伴，谱为 $\theta+2\pi\mathbb Z$，特征函数为 $e^{i(\theta+2\pi k)x}$。

??? proof "证明"

    代入边界形式，两个端点项相消，得到对称性。若 $v$ 属于其伴随定义域，弱导数条件给出 $v\in H^1$；对所有满足该边界条件的 $u$，边界形式为零，得到 $v(1)=e^{i\theta}v(0)$，所以伴随定义域相同。

    方程 $-iu'=\lambda u$ 给出 $u(x)=Ce^{i\lambda x}$。边界条件要求 $e^{i\lambda}=e^{i\theta}$，故特征值如上。乘以 $e^{-i\theta x}$ 把特征函数族变为通常 Fourier 正交基，因此没有遗漏其他谱。

    此外 $N_+$ 由 $e^{-x}$ 张成，$N_-$ 由 $e^x$ 张成，亏指数为 $(1,1)$，所以全部自伴扩张由一个相位参数决定。仅要求两个端点都为零得到的是对称闭算子，不是自伴动量算子。

## 7. 无界自伴谱定理 { #section-7 }

### 7.1 先理解无界乘法 { #section-7-1 }

对可测实函数 $m$，定义

$$
M_mf=mf,\qquad D(M_m)=\{f\in L^2:mf\in L^2\}.
$$

截断 $f\mathbf1_{\{|m|\le n\}}$ 证明定义域稠密；伴随定义用相同截断测试给出 $M_m^*=M_m$。事实上复可测 $m$ 有 $M_m^*=M_{\overline m}$。自伴乘法模型的定义域是乘积可积的**最大定义域**，任意缩小它一般会破坏自伴性。

!!! theorem "无界自伴算子的谱定理"

    每个自伴 $T$ 都存在唯一 PVM $E$，使

    $$
    T=\int_{\mathbb R}\lambda\,\mathrm dE(\lambda),
    \qquad
    D(T)=\left\{x:\int\lambda^2\,\mathrm d\mu_x(\lambda)<\infty\right\},
    $$

    其中 $\mu_x(B)=\langle x,E(B)x\rangle$。等价地，$T$ 酉等价于若干 $L^2$ 空间上乘以实变量的直和。

??? proof "证明：经 Cayley 变换使用有界谱定理"

    $U=(T-iI)(T+iI)^{-1}$ 酉，且 $\ker(I-U)=0$。第五章给出单位圆上的谱测度 $E_U$，其中 $E_U(\{1\})=0$。

    把单位圆除去 $1$ 后映到实轴：

    $$
    \lambda=i\frac{1+z}{1-z},\qquad z=\frac{\lambda-i}{\lambda+i}.
    $$

    在乘法模型中，这个实函数产生最大定义域上的自伴乘法算子。其 Cayley 变换仍是 $U$，因此由反向变换，它就是原来的 $T$。推前 $E_U$ 得到 $E$，平方可积条件正是乘法算子的定义域。

    唯一性由 Cayley 变换及其有界谱测度的唯一性得到。无界性集中在函数 $i(1+z)/(1-z)$ 靠近 $z=1$ 的增长，而不是有界谱测度本身。

### 7.2 无界 Borel 函数演算 { #section-7-2 }

对任意复 Borel 函数 $f$，

$$
D(f(T))=\left\{x:\int|f|^2\,\mathrm d\mu_x<\infty\right\},
\qquad\|f(T)x\|^2=\int|f|^2\,\mathrm d\mu_x.
$$

使用 $f_n=f\mathbf1_{\{|f|\le n\}}$ 的有界演算，$f_n(T)x$ 在上述定义域内收敛，定义 $f(T)x$。实 $f$ 给出自伴算子。

!!! warning "无界演算中的等式必须检查定义域"

    总有 $f(T)g(T)\subset(fg)(T)$，但两者未必具有同样定义域。例如 $T=M_x$ 在 $L^2(\mathbb R)$ 上，$g=0$：$T\cdot0$ 在全空间定义，而 $0\cdot T$ 只在 $D(T)$ 上定义，虽然二者的作用都为零。

    同样，$f(T)+g(T)$ 的定义域是交集；若函数恰好相消，$(f+g)(T)$ 的最大定义域可能更大。

### 7.3 强交换与联合谱 { #section-7-3 }

自伴 $T_1,T_2$ 称强交换，若所有谱投影彼此可交换。这等价于有界演化群 $e^{itT_1}$ 与 $e^{isT_2}$ 对所有实 $t,s$ 可交换。

强交换的有限自伴族具有 $\mathbb R^N$ 上的联合 PVM 和坐标乘法模型，$f(T_1,\ldots,T_N)$ 的定义域仍由 $\int|f|^2\,\mathrm d\mu_x$ 给出。证明对各 Cayley 变换使用联合有界谱定理，再将圆周坐标映回实轴。

仅在某个稠密公共域上写 $T_1T_2=T_2T_1$，一般不足以保证谱投影交换。定义域条件和强交换条件承担不同任务。

## 8. 为什么有限截断不再自动确定极限 { #section-8 }

有界自伴算子的连续演算有统一的谱区间与范数估计。无界对称算子的有限截断虽然仍可对角化，却可能对应不同的自伴边界条件，进而产生不同的极限谱测度。不定矩问题正体现这种不唯一性。

因此，无界谱定理必须先确定自伴算子，而不仅是对称的表达式。Cayley 变换把缺少的定义域信息转化为等距扩张问题，使定义域问题转化为有界映射的扩张问题。

## 9. 定义域、图像与 Cayley 变换 { #section-9 }

以下算子允许无界，但默认定义域稠密；不要求稠密时会明确说明。算子的等式同时要求定义域相同，包含关系也包含定义域的包含。$H,K,L$ 均为 Hilbert 空间。

### 先核对定义域 { #topic-6-2-1 }

相同微分表达式可以配上不同的定义域，得到不同算子。因此加法、复合、逆和乘法模型的每一条等式，都要同时检查允许输入的向量。

!!! definition "定义 6.2.1：无界算子"

    无界算子 $T:H\to K$ 是线性子空间 $D(T)\subset H$ 到 $K$ 的线性映射。这里“无界”意为不预设有界，允许通常的有界算子；$D(T)=H$ 时称处处定义。

!!! definition "定义 6.2.3：限制算子"

    对线性 $D_0\subset D(T)$，$T|_{D_0}$ 的定义域为 $D_0$，作用与 $T$ 相同。限制可能不再稠密定义。

!!! definition "定义 6.2.4：算子的和"

    $D(S+T)=D(S)\cap D(T)$，$(S+T)\xi=S\xi+T\xi$。即使两者各自稠密定义，交域仍须另行检查。

!!! definition "定义 6.2.5：复合与标量乘法"

    $D(ST)=\{\xi\in D(T):T\xi\in D(S)\}$；$D(\lambda T)=D(T)$，$(\lambda T)\xi=\lambda T\xi$，包括 $\lambda=0$。零倍算子不自动扩大为全空间零算子。

!!! theorem "命题 6.2.6：加法结合律"

    允许非稠密定义的算子满足 $(A+B)+C=A+(B+C)$，两侧定义域均为三个定义域的交。

??? proof "证明 6.2.6"

    两侧定义域都是 $D(A)\cap D(B)\cap D(C)$，在此域上的值都是 $A\xi+B\xi+C\xi$。因此不仅作用相等，定义域也相等。

!!! theorem "命题 6.2.7：复合结合律"

    允许非稠密定义的算子满足 $(AB)C=A(BC)$，定义域均要求 $\xi\in D(C)$、$C\xi\in D(B)$、$BC\xi\in D(A)$。

??? proof "证明 6.2.7"

    两侧均要求 $\xi\in D(C)$、$C\xi\in D(B)$、$B(C\xi)\in D(A)$，在共同域上都取值 $A(B(C\xi))$。故复合结合律成立。

!!! theorem "命题 6.2.8：分配律的定义域"

    $(A+B)C=AC+BC$，而 $A(C+D)\supset AC+AD$。若 $A$ 处处定义，则后一包含成为等式；否则 $C\xi+D\xi$ 可能因相消而属于 $D(A)$。

??? proof "证明 6.2.8"

    前一等式的两侧域均为 $\{\xi\in D(C):C\xi\in D(A)\cap D(B)\}$。后一式中，$AC+AD$ 的域要求 $C\xi,D\xi$ 分别属于 $D(A)$，其和当然属于该线性域，故只有包含。若 $A$ 处处定义，此额外要求消失，两侧域同为 $D(C)\cap D(D)$，包含成为等式。

!!! definition "定义 6.2.10：扩张"

    $S\subset T$ 指 $D(S)\subset D(T)$ 且 $T|_{D(S)}=S$。

!!! definition "定义 6.2.11：对称算子"

    稠密定义的 $T:H\to H$ 对称，指 $\langle\eta,T\xi\rangle=\langle T\eta,\xi\rangle$ 对全部 $\xi,\eta\in D(T)$ 成立。也称 Hermitian 算子；其定义域上的形式为 $\omega_T(\eta,\xi)=\langle\eta,T\xi\rangle$。

!!! definition "定义 6.2.14：最大乘法算子"

    有限值可测函数 $f$ 定义 $M_f\xi=f\xi$，$D(M_f)=\{\xi\in L^2:f\xi\in L^2\}$。此域稠密；实 $f$ 给出对称算子，实际上在此最大域上自伴。

??? proof "证明 6.2.14"

    对任意 $\xi\in L^2$，$\xi_n=\mathbf1_{\{|f|\leq n\}}\xi$ 属于 $D(M_f)$ 且趋于 $\xi$，故域稠密。分部乘法的内积直接给 $M_{\bar f}\subset M_f^*$。若 $\eta\in D(M_f^*)$，将伴随恒等式限制到 $\{|f|\leq n\}$，在该处用任意 $L^2$ 测试可得 $M_f^*\eta=\bar f\eta$；这些集合穷尽空间，故 $\bar f\eta\in L^2$。因此 $M_f^*=M_{\bar f}$，实 $f$ 时自伴。

!!! definition "定义 6.2.15：无界算子的直和"

    $\bigoplus_\alpha T_\alpha$ 的定义域为满足各 $\xi_\alpha\in D(T_\alpha)$ 且 $\sum_\alpha\|T_\alpha\xi_\alpha\|^2<\infty$ 的 Hilbert 直和向量；作用逐分量定义。

??? proof "证明 6.2.15"

    定义域中的有限分量向量在直和中稠密，只要各 $D(T_\alpha)$ 稠密。定义中平方可和的条件恰好保证像属于目标直和。对称算子的直和仍对称，因为内积的分量求和绝对收敛，可以逐项使用对称性；最大域实乘法算子的直和也自伴，可逐分量使用伴随判据并检查像的平方可和。

!!! theorem "命题 6.2.19：乘法算子的幂"

    对每个非负整数 $n$，$M_f^n=M_{f^n}$，定义域也相同。较高幂的可积性结合 $\xi\in L^2$ 保证所有中间幂可积。

??? proof "证明 6.2.19"

    $n=0$ 时两侧都是全空间单位算子。对 $n\geq1$，点态作用相同；需要核对域。若 $f^n\xi\in L^2$ 且 $\xi\in L^2$，则对 $0\leq k\leq n$，

    $$
    |f|^{2k}|\xi|^2\leq(1+|f|^{2n})|\xi|^2,
    $$

    所以所有中间幂均在 $L^2$，$\xi$ 属于复合域。反向复合域自然要求最终幂在 $L^2$。

!!! definition "定义 6.2.21：无界逆"

    若 $T$ 单射，定义 $T^{-1}$ 于 $\operatorname{ran}T$，令 $T^{-1}(T\xi)=\xi$。有 $D(T^{-1})=\operatorname{ran}T$、$\operatorname{ran}T^{-1}=D(T)$、$(T^{-1})^{-1}=T$；逆稠密定义当且仅当 $T$ 有稠密像。

!!! theorem "命题 6.2.22：复合的逆"

    单射算子 $A,B$ 的复合也单射，且 $(AB)^{-1}=B^{-1}A^{-1}$，按实际定义域理解。

??? proof "证明 6.2.22"

    $AB\xi=AB\eta$ 先由 $A$ 单射得 $B\xi=B\eta$，再得 $\xi=\eta$。$B^{-1}A^{-1}$ 的域要求 $y\in\operatorname{ran}A$ 且 $A^{-1}y\in\operatorname{ran}B$，即 $y=AB\xi$ 且 $B\xi\in D(A)$。这正是 $\operatorname{ran}(AB)$，在此域上逆式逐项相消。

!!! definition "定义 6.2.25：处处定义的有界逆"

    $T^{-1}\in\mathcal L(K,H)$ 表示 $T$ 单射、像为全部 $K$ 且其逆有界。等价于 $T=S^{-1}$，其中 $S:K\to H$ 有界、单射且像稠密。

!!! theorem "命题 6.2.26：有界算子的核像关系"

    有界 $T:H\to K$ 满足 $\ker T=(\operatorname{ran}T^*)^\perp$、$\overline{\operatorname{ran}T}=(\ker T^*)^\perp$。因此 $T$ 的像稠密当且仅当 $T^*$ 单射。

??? proof "证明 6.2.26"

    $T\xi=0$ 等价于 $\langle\eta,T\xi\rangle=\langle T^*\eta,\xi\rangle=0$ 对全部 $\eta$ 成立，故 $\ker T=(\operatorname{ran}T^*)^\perp$。把 $T$ 换成 $T^*$ 并取正交补，利用 $T^{**}=T$，得到第二式。像稠密恰是其正交补为零。

### 把无界问题变成等距问题 { #topic-6-3-1 }

对称性使 $T+i$ 与 $T-i$ 在图像范数下等长，Cayley 变换据此得到两个子空间间的等距映射。扩张 $T$ 遂转成扩张这个等距映射。

!!! theorem "引理 6.3.1：对称算子的特征值"

    对称算子的全部特征值为实数，因为 $T\xi=\lambda\xi$ 时 $\lambda\|\xi\|^2=\langle\xi,T\xi\rangle$ 为实数。

??? proof "证明 6.3.1"

    特征向量 $\xi\ne0$ 给出 $\lambda=\langle\xi,T\xi\rangle/\|\xi\|^2$。对称性使分子等于自己的复共轭，因此 $\lambda\in\mathbb R$。

!!! definition "定义 6.3.2：Cayley 变换"

    对称 $T$ 的 Cayley 变换 $U_T=(T-i)(T+i)^{-1}$ 定义于 $\operatorname{ran}(T+i)$，将 $(T+i)\xi$ 送到 $(T-i)\xi$。

!!! theorem "命题 6.3.3：Cayley 变换的等距性"

    $U_T$ 是 $\operatorname{ran}(T+i)$ 到 $\operatorname{ran}(T-i)$ 的满射等距映射，并有 $\operatorname{ran}(U_T-1)=D(T)$，故该像稠密。

??? proof "证明 6.3.3"

    对称性消掉交叉项，得到

    $$
    \|(T\pm i)\xi\|^2=\|T\xi\|^2+\|\xi\|^2.
    $$

    故 $T+i$ 单射，变换良定义，且保持范数；它按定义满射到 $\operatorname{ran}(T-i)$。又 $U_T(T+i)\xi-(T+i)\xi=-2i\xi$，所以 $\operatorname{ran}(U_T-1)=D(T)$。

!!! theorem "引理 6.3.4：固定向量的排除"

    线性子空间间的满射等距 $U$ 若 $\operatorname{ran}(U-1)$ 稠密，则 $\ker(U-1)=0$。

??? proof "证明 6.3.4"

    若 $U\eta=\eta$，等距性经极化给 $\langle U\eta,U\xi\rangle=\langle\eta,\xi\rangle$，从而 $\langle\eta,(U-1)\xi\rangle=0$ 对所有 $\xi\in D(U)$ 成立。该像稠密，故 $\eta=0$。

!!! theorem "定理 6.3.5：Cayley 对应"

    稠密定义对称算子与满足 $\operatorname{ran}(U-1)$ 稠密的子空间间满射等距 $U$ 一一对应。逆式为 $T=-i(U+1)(U-1)^{-1}=i(1+U)(1-U)^{-1}$。对应保持扩张关系：$T\subset\widetilde T$ 当且仅当 $U_T\subset U_{\widetilde T}$。

??? proof "证明 6.3.5"

    给定 $U$，6.3.4 保证 $U-1$ 单射，所以逆变换良定义于稠密域 $\operatorname{ran}(U-1)$。令 $\xi=(U-1)\eta$，则

    $$
    \langle\xi,T\xi\rangle
    =-i\langle U\eta-\eta,U\eta+\eta\rangle
    =-i(\langle U\eta,\eta\rangle-\langle\eta,U\eta\rangle)\in\mathbb R.
    $$

    极化给出对称性。计算 $(T+i)(U-1)\eta=-2i\eta$、$(T-i)(U-1)\eta=-2iU\eta$，便还原 $U$；由 6.3.3 的公式也还原 $T$。图像 Cayley 映射可逆并线性，故图像包含在对应前后等价，也就是扩张关系等价。

### 用图像保留极限中的作用 { #topic-6-4-1 }

图像把输入及输出一起作为向量。闭性要求它们的联合极限仍满足同一个作用关系；可闭性则要求图像闭包没有多值的竖直部分。

!!! definition "定义 6.4.1：算子图像"

    $G(T)=\{\xi\oplus T\xi:\xi\in D(T)\}\subset H\oplus K$，取子空间内积。算子扩张等价于图像包含。

!!! definition "定义 6.4.2：线性关系的定义域"

    对线性 $G\subset H\oplus K$，$D(G)=\{\xi:\exists\eta,\ \xi\oplus\eta\in G\}$。此域稠密时称关系稠密定义。

!!! definition "定义 6.4.4：何时关系是算子"

    $G$ 是某个算子的图像，当且仅当每个 $\xi$ 至多对应一个 $\eta$，也当且仅当 $0\oplus\eta\in G$ 蕴含 $\eta=0$。

!!! definition "定义 6.4.5：闭算子与可闭算子"

    图像闭时称算子闭。图像闭包仍是算子图像时称可闭，其对应算子记 $\overline T$。可闭等价于：若 $\xi_n\to0$ 且 $T\xi_n\to\eta$，则 $\eta=0$；用网代替序列给出等价条件，亦可将像收敛换成像 Cauchy。

!!! theorem "命题 6.4.7：闭扩张判据"

    $T$ 可闭当且仅当存在闭算子扩张它。可闭时 $\overline T$ 是最小闭扩张。

??? proof "证明 6.4.7"

    若闭 $S$ 扩张 $T$，则 $\overline{G(T)}\subset G(S)$。后者没有非零竖直向量，所以前者也是算子图像；于是 $T$ 可闭。反向由定义 $\overline T$ 就是闭扩张。任一闭扩张的图像均含图像闭包，故 $\overline T$ 最小。

!!! theorem "命题 6.4.8：有界限制的闭包"

    若 $T$ 在 $D(T)$ 的原空间范数下有界，则可闭，闭包是到 $\overline{D(T)}$ 的唯一连续延拓；此时 $T$ 闭当且仅当 $D(T)$ 闭。

??? proof "证明 6.4.8"

    若 $\xi_n\to\xi$ 于 $\overline{D(T)}$，有界性使 $T\xi_n$ Cauchy，目标完备给出唯一极限，定义连续延拓 $\widetilde T$。图像极限正是 $(\xi,\widetilde T\xi)$，故 $G(\widetilde T)=\overline{G(T)}$。若原域闭，延拓没有新增向量；若 $T$ 闭，图像闭包等于原图像，也迫使原域等于其闭包。

!!! definition "定义 6.4.9：算子核域"

    $D_0\subset D(T)$ 是 $T$ 的核域（core，也称核心），指 $G(T|_{D_0})$ 在 $G(T)$ 中稠密。等价于每个 $\xi\in D(T)$ 可由 $D_0$ 中序列或网满足 $\xi_n\to\xi$、$T\xi_n\to T\xi$。可闭算子的原定义域是其闭包的核域。

!!! definition "定义 6.4.10：图像的对角反射"

    定义 $G^{-1}=\{\eta\oplus\xi:\xi\oplus\eta\in G\}$，由酉映射 $r(\xi\oplus\eta)=\eta\oplus\xi$ 给出。单射算子时它是逆算子的图像。

!!! definition "定义 6.4.11：图像的 Cayley 变换"

    定义 $\operatorname{Cay}(\xi\oplus\phi)=2^{-1/2}(\phi+i\xi)\oplus2^{-1/2}(\phi-i\xi)$，其逆将 $\alpha\oplus\beta$ 送到 $2^{-1/2}i(\beta-\alpha)\oplus2^{-1/2}(\beta+\alpha)$。

!!! theorem "命题 6.4.12：图像变换为酉映射"

    $\operatorname{Cay}$ 及其逆都是 $H\oplus H$ 上的酉映射，因而保持闭包、正交性和闭子空间。

??? proof "证明 6.4.12"

    由平行四边形恒等式，

    $$
    \tfrac12\|\phi+i\xi\|^2+\tfrac12\|\phi-i\xi\|^2=\|\phi\|^2+\|\xi\|^2.
    $$

    所以 Cayley 映射等距；给出的逆公式直接代入相消，故它满射并酉。酉映射及其逆都连续，也保持内积，因而保持闭包与正交关系。

!!! theorem "定理 6.4.16：对称算子可闭"

    每个稠密定义对称算子可闭，闭包仍对称；闭包的 Cayley 变换是 $U_T$ 到 $\overline{D(U_T)}$ 的连续延拓。$T$ 闭当且仅当 $D(U_T)$ 闭，也当且仅当 $\operatorname{ran}U_T$ 闭。

??? proof "证明 6.4.16"

    若 $\xi_n\to0$、$T\xi_n\to\eta$，则对任意 $\zeta\in D(T)$，
    $\langle\zeta,\eta\rangle=\lim_n\langle T\zeta,\xi_n\rangle=0$。域稠密迫使 $\eta=0$，故可闭。将对称恒等式在两个图像逼近序列上取极限，闭包仍对称。

    Cayley 酉映射将 $G(T)$ 化为 $G(U_T)$，所以将其闭包化为后者的闭包。等距 $U_T$ 的图像闭包是其到 $\overline{D(U_T)}$ 的连续延拓。等距映射的图像闭等价于定义域闭；它的像完备又等价于其域完备，故域闭与像闭等价。

### 缺少的方向来自亏空间 { #topic-6-5-1 }

闭对称算子的 Cayley 域、像都闭，其正交补记录尚未覆盖的方向。新增等距映射只能连接这两个正交补，所以扩张的自由度由亏空间决定。

!!! theorem "定理 6.5.1：闭对称扩张的分类"

    闭对称 $T$ 的闭对称扩张，与两个亏空间的闭子空间间的满射等距 $V:D(V)\subset\operatorname{ran}(T+i)^\perp\to\operatorname{ran}(T-i)^\perp$ 一一对应。扩张域为 $D(T)+\operatorname{ran}(V-1)$，在新增向量上作用为 $i(V\eta-\eta)\mapsto V\eta+\eta$。去掉扩张闭性时，对应子空间不要求闭。

??? proof "证明 6.5.1"

    令 $U=U_T$，其域 $M$ 与像 $L$ 均闭。任何等距扩张 $\widetilde U$ 的新增部分可先正交分解为 $M$ 与 $M^\perp$：若 $\eta$ 是新增域中垂直 $M$ 的向量，保持内积迫使 $\widetilde U\eta\perp L$。因此扩张恰为 $U\oplus V$，其中 $V$ 是 $M^\perp$ 和 $L^\perp$ 的子空间间满射等距。域闭恰好要求 $D(V)$ 闭。

    应用逆 Cayley 变换，原域与新增域为 $\operatorname{ran}(U-1)+\operatorname{ran}(V-1)$，并在新增向量 $i(V\eta-\eta)$ 上取值 $V\eta+\eta$。等距扩张的 $(\widetilde U-1)$ 像仍含稠密的原像，所以逆变换合法，分类一一对应。

!!! definition "定义 6.5.2：亏指数"

    约定 $N_+=\operatorname{ran}(T+i)^\perp=\ker(T^*-i)$，$N_-=\operatorname{ran}(T-i)^\perp=\ker(T^*+i)$，亏指数为 $n_\pm=\dim N_\pm$，维数可为无限基数。$T$ 与 $\overline T$ 的亏指数相同。


??? proof "Cayley 对应及闭扩张"

    对称性使 $\|(T\pm i)\xi\|^2=\|T\xi\|^2+\|\xi\|^2$，故两者单射，Cayley 变换等距。其差作用在 $(T+i)\xi$ 上为 $-2i\xi$，得到像为 $D(T)$。若 $U\eta=\eta$，等距性说明 $\eta$ 与全部 $(U-1)\zeta$ 正交，稠密性迫使 $\eta=0$，逆变换于是有定义。

    图像的酉 Cayley 变换将对称算子图像变为等距映射图像；等距映射能在定义域闭包上连续延拓，故原算子可闭。闭等距映射的扩张只能在原定义域和像的正交补之间添加一个等距块 $V$；逆 Cayley 变换给出全部闭对称扩张。这使扩张问题成为亏空间间的等距匹配问题。

## 10. 伴随、自伴性与一阶微分算子 { #section-10 }

### 伴随是图像的正交条件 { #topic-6-6-1 }

伴随恒等式可以写成一个旋转图像的正交补。这种几何表达同时解释伴随的闭性、双伴随的闭包，以及可闭性为何等价于伴随域稠密。

!!! definition "定义 6.6.1：关系的伴随"

    $\operatorname{Ad}G=\{\eta\oplus\psi:\langle\eta,\phi\rangle=\langle\psi,\xi\rangle\text{ 对全部 }\xi\oplus\phi\in G\}$。若 $J_{H,K}(\xi\oplus\phi)=i\phi\oplus(-i\xi)$，则 $\operatorname{Ad}G=(JG)^\perp$。

!!! theorem "命题 6.6.2：旋转映射的逆"

    $J_{K,H}J_{H,K}=1$，故 $J_{H,K}^*=J_{H,K}^{-1}=J_{K,H}$。

??? proof "证明 6.6.2"

    连续应用两次 $J$ 得 $J_{K,H}(i\phi\oplus(-i\xi))=\xi\oplus\phi$。又 $\|J(\xi\oplus\phi)\|^2=\|\phi\|^2+\|\xi\|^2$，故 $J$ 酉，其伴随就是给出的逆。

!!! theorem "命题 6.6.3：正交补与反射"

    在对应直和空间中，$J(G^\perp)=(JG)^\perp$，$(JG)^{-1}=J(G^{-1})$（此处使用相应方向的 $J$），$(G^{-1})^\perp=(G^\perp)^{-1}$。因此 $\operatorname{Ad}(G^{-1})=(\operatorname{Ad}G)^{-1}$。

??? proof "证明 6.6.3"

    任一酉映射 $V$ 满足 $V(G^\perp)=(VG)^\perp$，分别用于 $J$ 和反射 $r$ 得第一、三式。第二式用 $rJ=-Jr$；线性子空间与其负号相同，故 $(JG)^{-1}=J(G^{-1})$。将这些恒等式代入 $\operatorname{Ad}G=(JG)^\perp$ 即得最后一式。

!!! theorem "定理 6.6.4：双伴随关系"

    $\operatorname{Ad}(\operatorname{Ad}G)=\overline G$；$G$ 稠密定义当且仅当 $\operatorname{Ad}G$ 为算子图像。

??? proof "证明 6.6.4"

    由 $J^2=1$（按正确空间方向理解）及酉性，

    $$
    \operatorname{Ad}(\operatorname{Ad}G)
    =J((JG)^\perp)^\perp=G^{\perp\perp}=\overline G.
    $$

    竖直向量 $0\oplus\psi$ 属于 $\operatorname{Ad}G$，当且仅当 $\langle\psi,\xi\rangle=0$ 对全部 $\xi\in D(G)$ 成立。故伴随关系没有非零竖直向量，当且仅当 $D(G)$ 稠密；这恰是算子图像判据。

!!! theorem "推论 6.6.5：图像判据的对偶形式"

    $\overline G$ 为算子图像当且仅当 $\operatorname{Ad}G$ 稠密定义。特别，当 $G$ 本身闭时，可将 $\overline G$ 换成 $G$；一般算子图像还须检查可闭性。

??? proof "证明 6.6.5"

    对 $\operatorname{Ad}G$ 应用 6.6.4 的第二部分，得到其定义域稠密当且仅当双伴随关系是算子图像。第一部分识别双伴随为 $\overline G$。这里闭包不可省略：对不可闭算子，原图像是算子图像，但其伴随域并不稠密。

!!! definition "定义 6.6.6：伴随算子"

    稠密定义 $T:H\to K$ 的伴随 $T^*:K\to H$ 由 $G(T^*)=\operatorname{Ad}G(T)$ 定义。具体地，$\eta\in D(T^*)$ 当且仅当存在 $\psi$ 使全部 $\xi\in D(T)$ 满足 $\langle\eta,T\xi\rangle=\langle\psi,\xi\rangle$，并令 $T^*\eta=\psi$。

!!! theorem "定理 6.6.9：可闭性与双伴随"

    $T$ 可闭当且仅当 $D(T^*)$ 稠密。伴随总是闭；可闭时 $\overline T=T^{**}$，且 $(\overline T)^*=T^*=T^{***}$。

??? proof "证明 6.6.9"

    伴随图像是某个子空间的正交补，故总闭。由 6.6.5，$D(T^*)$ 稠密恰等价于 $\overline{G(T)}$ 是算子图像，即 $T$ 可闭。此时 6.6.4 给 $\overline T=T^{**}$。正交补不因先取闭包而变化，故 $(\overline T)^*=T^*$；再对闭 $T^*$ 应用双伴随公式得 $T^{***}=T^*$。

!!! theorem "命题 6.6.11：无界算子的核像关系"

    $\ker T^*=(\operatorname{ran}T)^\perp$。若 $T$ 还闭，则 $\ker T=(\operatorname{ran}T^*)^\perp$，特别闭算子的核闭。

??? proof "证明 6.6.11"

    $\eta\in\ker T^*$ 等价于 $\langle\eta,T\xi\rangle=0$ 对全部 $\xi\in D(T)$ 成立，给出第一式。若 $T$ 闭，它等于 $T^{**}$；对 $T^*$ 应用第一式得第二式。正交补闭，故闭算子的核闭。

!!! theorem "命题 6.6.12：闭逆的伴随"

    闭、单射且有稠密像的 $T$，其 $T^{-1}$ 和 $T^*$ 也闭、单射且有稠密像，并有 $(T^*)^{-1}=(T^{-1})^*$。

??? proof "证明 6.6.12"

    交换图像两分量是酉映射，故闭 $T$ 的逆也闭。$\operatorname{ran}T$ 稠密使逆稠密定义；$D(T)$ 稠密使逆有稠密像。6.6.11 又给 $\ker T^*=0$ 与 $\overline{\operatorname{ran}T^*}=H$。最后 6.6.3 将图像反射与伴随交换，得到 $(T^{-1})^*=(T^*)^{-1}$，包括两边域。

!!! definition "定义 6.6.13：初始微分算子"

    在开集 $\Omega\subset\mathbb R^N$ 上，$\partial^\alpha$ 初始定义域为 $C_c^\infty(\Omega)$，$|\alpha|=\sum_j\alpha_j$。梯度从标量 $L^2$ 到向量 $L^2$，散度方向相反，初始域分别为 $C_c^\infty(\Omega)$ 与其 $N$ 重直和。

!!! theorem "命题 6.6.14：分部积分与可闭性"

    上述微分算子均可闭，且 $(\partial^\alpha)^*\supset(-1)^{|\alpha|}\partial^\alpha$、$\nabla^*\supset-\operatorname{div}$、$\operatorname{div}^*\supset-\nabla$。这些首先是初始测试域上的包含，不能直接当作所有边界条件下的等式。

??? proof "证明 6.6.14"

    紧支撑测试函数消去边界项，反复分部积分给

    $$
    \langle f,\partial^\alpha g\rangle
    =\langle(-1)^{|\alpha|}\partial^\alpha f,g\rangle.
    $$

    故初始域包含于伴随域。这个域在 $L^2$ 中稠密，6.6.9 保证可闭。对各坐标导数求和，得到梯度与负散度的两条包含，同样由测试域稠密得可闭。

!!! definition "定义 6.6.15：图像内积"

    $D(T)$ 上取 $\langle\xi,\eta\rangle_T=\langle\xi,\eta\rangle+\langle T\xi,T\eta\rangle$。它与图像等距；$T$ 闭当且仅当图像范数下定义域完备。

### 自伴要求没有剩余亏方向 { #topic-6-7-1 }

对称性只给 $T\subset T^*$，自伴还要求没有新增伴随域。von Neumann 分解把这些新增方向显式拆成两个亏空间，从而得到满射与扩张判据。

!!! definition "定义 6.7.1：自伴与本质自伴"

    对称 $T$ 自伴，指 $T=T^*$，包括定义域相等；本质自伴，指 $\overline T$ 自伴。自伴算子必闭。

!!! theorem "命题 6.7.2：极大对称性"

    对称 $T$ 没有严格的对称扩张，当且仅当 $\operatorname{ran}(T+i)=H$ 或 $\operatorname{ran}(T-i)=H$。等价于 $T$ 闭且至少一个亏指数为零；只有一个为零时未必自伴。

??? proof "证明 6.7.2"

    极大对称算子必须闭，否则对称闭包给出严格扩张。闭时用 6.5.1 分类：若两个亏空间都非零，取各自单位向量便可构造一维等距 $V$，得到严格扩张；若至少一个为零，则没有非零 $V$。亏空间为零等价于对应闭像为全空间，因此得到满射判据。

!!! theorem "引理 6.7.4：伴随图像的 Cayley 刻画"

    $\operatorname{Cay}G(T^*)$ 恰由满足 $\langle\alpha,\eta\rangle=\langle\beta,U_T\eta\rangle$ 对全部 $\eta\in D(U_T)$ 成立的 $\alpha\oplus\beta$ 构成。

??? proof "证明 6.7.4"

    将 $\eta\oplus T\eta$ 及候选伴随向量代入 Cayley 变换，并展开内积，伴随恒等式恰化为 $\langle\alpha,\zeta\rangle=\langle\beta,U_T\zeta\rangle$ 对全部 $\zeta\in D(U_T)$ 成立。变换可逆，故这个条件既必要也充分。

!!! theorem "命题 6.7.5：变换后的三块分解"

    闭对称 $T$ 满足 $\operatorname{Cay}G(T^*)=G(U_T)\oplus(N_+\oplus0)\oplus(0\oplus N_-)$，三项在直和空间中互相正交且闭。

??? proof "证明 6.7.5"

    记 $M=D(U_T)$、$L=\operatorname{ran}U_T$。把 $\alpha=m+n_+$、$\beta=\ell+n_-$ 按 $M\oplus N_+$、$L\oplus N_-$ 分解，6.7.4 的条件变成 $\langle m,\eta\rangle=\langle\ell,U_T\eta\rangle$，即 $\ell=U_Tm$。所以关系恰为 $(m,U_Tm)+(n_+,0)+(0,n_-)$。三项正交且闭，得到分解。

!!! theorem "定理 6.7.6：von Neumann 定义域分解"

    闭对称 $T$ 满足 $D(T^*)=D(T)\oplus N_+\oplus N_-$，正交性相对于 $T^*$ 的图像内积；$T^*$ 在三部分上分别作用为 $T,i,-i$。

??? proof "证明 6.7.6"

    对 6.7.5 的三块应用逆 Cayley 酉映射。第一块还原 $G(T)$；第二块给 $(-in_+,n_+)/\sqrt2$，其第二分量为第一分量的 $i$ 倍；第三块给 $(in_-,n_-)/\sqrt2$，对应 $-i$ 倍。故定义域分解及作用公式成立。图像中的正交性就是图像内积的正交性。

!!! theorem "推论 6.7.8：自伴的满射判据"

    对称 $T$ 自伴当且仅当 $\operatorname{ran}(T+i)=\operatorname{ran}(T-i)=H$，亦即其 Cayley 变换为全空间酉算子。

??? proof "证明 6.7.8"

    若两像为全空间，Cayley 变换全空间酉，且 $T$ 闭；6.7.6 中两亏空间为零，故 $D(T^*)=D(T)$。反之自伴时两亏核 $\ker(T^*\mp i)$ 均为零，因为对称算子没有非实特征值；闭对称算子的 $T\pm i$ 像闭且稠密，故满射。

!!! theorem "推论 6.7.9：本质自伴的稠密判据"

    对称 $T$ 本质自伴当且仅当 $\operatorname{ran}(T+i)$ 与 $\operatorname{ran}(T-i)$ 均稠密。

??? proof "证明 6.7.9"

    6.4.16 将闭包的 Cayley 域、像识别为原域、像的闭包。故原两像稠密等价于闭包的两像为全空间，再用 6.7.8 即得本质自伴性。

!!! theorem "推论 6.7.10：闭扩张的唯一性"

    本质自伴 $T$ 的闭包为唯一闭对称扩张，并自伴。特别，自伴算子没有严格的对称扩张。

??? proof "证明 6.7.10"

    任何闭对称扩张均含 $\overline T$。它自伴，6.7.2 排除严格对称扩张，故候选必等于 $\overline T$。自伴算子本身就是自己的闭包，特别结论随之成立。

!!! theorem "推论 6.7.11：自伴扩张的存在"

    对称 $T$ 存在自伴扩张当且仅当 $n_+=n_-$，包括无限维基数相等的情形。

??? proof "证明 6.7.11"

    自伴扩张对应把 Cayley 变换扩成全空间酉，6.5.1 表明这要求 $V:N_+\to N_-$ 满射等距。两个 Hilbert 空间存在这种映射当且仅当正交基的基数相等，正是 $n_+=n_-$。非闭的 $T$ 先取闭包，不改变亏指数。

### 从抽象扩张到边界条件 { #topic-6-8-1 }

区间导数的伴随先由分部积分得到最大 Sobolev 域，亏方程则化为指数函数。端点边界形式把一维酉参数转成具体的相位边界条件。

!!! theorem "引理 6.8.1：区间导数的核"

    在有界区间 $I=(a,b)$ 上，令 $T_0=-i\,d/dx$ 的初始域为 $C_c^\infty(I)$，$T=\overline{T_0}$。则 $\ker T^*=\ker T_0^*$ 恰为几乎处处常数函数。

??? proof "证明 6.8.1"

    常数 $f$ 满足 $\langle f,-ig'\rangle=0$ 对全部紧支撑 $g$ 成立，故属于伴随核。反之伴随核给 $\int\bar f g'=0$；6.8.2 将此泛函识别为常数乘积分，故 $\bar f$ 也几乎处处为常数。闭包不改变伴随，因此两核相同。

!!! theorem "引理 6.8.2：零导数分布"

    若线性泛函 $\Lambda:C_c^\infty(I)\to\mathbb C$ 满足 $\Lambda(g')=0$ 对全部 $g$ 成立，则存在 $c$，使 $\Lambda(h)=c\int_Ih\,dx$。不必额外假设泛函连续。

??? proof "证明 6.8.2"

    取 $h_0\in C_c^\infty(I)$，使 $\int h_0=1$。若 $\int h=0$，原函数 $g(x)=\int_a^xh(t)\,dt$ 在两端邻域均为零，故 $g\in C_c^\infty(I)$ 且 $g'=h$，于是 $\Lambda(h)=0$。任意 $h$ 拆为 $(\int h)h_0+[h-(\int h)h_0]$，第二项积分为零。令 $c=\Lambda(h_0)$ 即得结论，无须连续性。

!!! theorem "命题 6.8.3：导数的亏空间"

    在该有界区间，$\ker(T^*-i)=\operatorname{span}\{e^{-x}\}$、$\ker(T^*+i)=\operatorname{span}\{e^x\}$，故亏指数为 $(1,1)$。

??? proof "证明 6.8.3"

    伴随方程 $T^*f=if$ 化为分布方程 $f'=-f$。乘以光滑积分因子 $e^x$ 得 $(e^xf)'=0$，6.8.2 给出 $f=ce^{-x}$。同理 $T^*f=-if$ 得 $f=ce^x$。两函数在有界区间均属 $L^2$ 且满足伴随积分恒等式，所以不是仅仅必要候选，亏空间恰如所述。

!!! theorem "推论 6.8.4：Sobolev 域的分解"

    相对于 $H^1$ 的图像内积，$H^1(I)=H_0^1(I)\oplus\operatorname{span}\{e^{-x}\}\oplus\operatorname{span}\{e^x\}$，$T^*e^{-x}=ie^{-x}$、$T^*e^x=-ie^x$。

??? proof "证明 6.8.4"

    $D(T)=H_0^1(I)$、$D(T^*)=H^1(I)$ 是这里通过图像域定义的空间；将 6.8.3 的亏空间代入 6.7.6，即得正交分解及作用。下一个定理再将这两个抽象域识别成具体绝对连续函数空间。

!!! theorem "定理 6.8.5：一维 Sobolev 代表"

    $H^1(I)$ 的元素具有唯一连续的绝对连续代表，满足 $f'\in L^2$；反之这些函数属于 $H^1$。$H_0^1(I)$ 对应再满足 $f(a)=f(b)=0$ 的代表，且 $T^*f=-if'$。

??? proof "证明 6.8.5"

    若 $f\in D(T)$，取测试函数 $f_n$ 使 $f_n\to f$、$f_n'\to iTf$ 于 $L^2$。令 $F(x)=\int_a^xiTf$，Cauchy–Schwarz 给

    $$
    \sup_x\left|f_n(x)-F(x)\right|\leq\sqrt{b-a}\,\|f_n'-iTf\|_2\to0.
    $$

    所以 $f=F$ 几乎处处，且 $F(a)=F(b)=0$。由 6.8.4，$D(T^*)$ 中每个元素再加上 $e^{\pm x}$ 的线性组合，因此均有绝对连续代表且 $T^*f=-if'$。

    反向，绝对连续且导数在 $L^2$ 的函数经分部积分满足伴随定义，所以属于 $D(T^*)$。若再两端为零，用 6.8.4 写为 $f=f_0+c_-e^{-x}+c_+e^x$，其中 $f_0\in D(T)$。两端值给非奇异二元线性方程，迫使 $c_-=c_+=0$，于是 $f\in D(T)$。连续代表若几乎处处相同则处处相同，所以唯一。

!!! theorem "定理 6.8.6：相位边界条件"

    $T_0$ 的自伴扩张与 $\lambda\in\mathbb S^1$ 一一对应，扩张为 $-if'$，定义域 $D_\lambda=\{f\in H^1(I):f(b)=\lambda f(a)\}$。

??? proof "证明 6.8.6"

    分部积分得到边界形式

    $$
    \langle f,T^*g\rangle-\langle T^*f,g\rangle
    =-i[\bar f g]_a^b.
    $$

    迹映射 $f\mapsto(f(a),f(b))$ 满射到 $\mathbb C^2$，其核为 $H_0^1$。自伴扩张对应此边界形式下等于自身正交补的子空间。各向同性条件要求 $|u_a|=|u_b|$，非零这样的子空间必为一维直线 $u_b=\lambda u_a$，$|\lambda|=1$。每条直线的边界正交补又是自己，故对应限制算子确实自伴；不同相位给不同域。这也把亏空间间的一维酉参数转成了具体边界条件。

??? proof "一维导数、绝对连续与边界形式"

    若测试函数 $h$ 的积分为零，则 $g(x)=\int_a^x h(t)\,dt$ 仍是紧支集光滑函数，$h=g'$。所以零导数泛函在积分为零的测试函数上消失，选一个积分为一的测试函数即可得到 6.8.2。若 $f$ 的弱导数为 $g\in L^2$，减去 $\int_a^xg$ 后弱导数为零，因此它是常数，得到绝对连续代表。

    分部积分给出边界形式 $\langle f,T^*g\rangle-\langle T^*f,g\rangle=-i[\overline f g]_a^b$。两端取值满足同一单位相位关系时边界项为零；再利用伴随域的同一边界关系得到自伴性。亏空间由一阶方程 $-if'=\pm if$ 求解。闭对称扩张的分类保证这些相位域已穷尽所有自伴扩张。

## 11. 联合无界演算、谱与预解式极限 { #section-11 }

### 谱投影交换才允许同时演算 { #topic-6-9-1 }

无界复合的域可能太小，形式上的交换不能代替共同谱模型。强交换用有界 Cayley 变换表达这一要求，再通过逆换元恢复实坐标乘法。

!!! definition "定义 6.9.1：强交换"

    自伴 $A,B$ 强交换，指其酉 Cayley 变换交换。等价于各自全部谱投影交换；形式上的 $AB=BA$ 若未说明域，不足以代替此条件。

!!! theorem "引理 6.9.3：可测换元的酉性"

    可测同构 $\phi:X\to Y$ 及测度族 $\nu_\alpha$ 给出酉映射 $\bigoplus L^2(Y,\nu_\alpha)\to\bigoplus L^2(X,\phi^*\nu_\alpha)$，$\eta_\alpha\mapsto\eta_\alpha\circ\phi$；它将最大域乘法 $M_g$ 共轭为 $M_{g\circ\phi}$，同时映射相应定义域。

??? proof "证明 6.9.3"

    换元公式给 $\int_X|\eta\circ\phi|^2\,d(\phi^*\nu)=\int_Y|\eta|^2\,d\nu$，故逐分量及直和映射等距。可测逆 $\phi^{-1}$ 给出其逆，所以酉。$g\eta\in L^2(\nu)$ 恰等价于 $(g\circ\phi)(\eta\circ\phi)\in L^2(\phi^*\nu)$，同时验证作用和最大定义域的对应。

!!! theorem "定理 6.9.4：联合无界谱定理"

    有限个强交换自伴 $T_j$ 可同时酉化为 $\bigoplus_\alpha L^2(\mathbb R^N,\mu_\alpha)$ 上的坐标乘法 $M_{x_j}$，各 $\mu_\alpha$ 为有限正 Borel 测度；等式包括最大乘法定义域。

??? proof "证明 6.9.4"

    强交换使酉 Cayley 变换 $U_j$ 伴随交换，用有界联合谱定理把它们化为单位环面上的坐标乘法。因为 $\ker(U_j-I)=0$，坐标等于 $1$ 的集合在每个循环测度下质量为零，故可删去这些集合。逐坐标逆 Cayley 映射

    $$
    x_j=i\frac{1+u_j}{1-u_j}
    $$

    把剩余环面可测同构到 $\mathbb R^N$；6.9.3 的换元酉映射把逆变换算子化为最大域 $M_{x_j}$。由 Cayley 对应的唯一性，这些正是原 $T_j$，包括域。

### 用可积性规定演算域 { #topic-6-10-1 }

无界谱函数的像不能对所有向量都有意义。向量谱测度上的平方可积条件精确规定最大定义域，也使复合规则和酉换元包含域的等式。

!!! theorem "定理 6.10.1：无界 Borel 演算"

    强交换自伴族有唯一的全部有限值 Borel 函数演算。其有界部分为正常酉表示，将 $(x_j-i)/(x_j+i)$ 送到 Cayley 变换；对向量测度 $\mu_\xi$，$D(f(T_\bullet))=\{\xi:\int|f|^2\,d\mu_\xi<\infty\}$，且 $\|f(T_\bullet)\xi\|^2=\int|f|^2\,d\mu_\xi$、$\langle\xi,f(T_\bullet)\xi\rangle=\int f\,d\mu_\xi$。

??? proof "证明 6.10.1"

    在 6.9.4 的模型中定义 $f(T_\bullet)=\bigoplus M_f$。向量测度为 $d\mu_\xi=\sum_\alpha|\xi_\alpha|^2d\mu_\alpha$，故定义域、范数及对角积分公式都由乘法算子直接给出；截断 $\mathbf1_{\{|f|\leq n\}}\xi$ 证明域稠密。

    唯一性先对有界部分证明：将实坐标空间嵌入 Cayley 环面并对遗漏集合取零测度，环面坐标分离点，故有界表示由各 $U_j$ 唯一确定。它遂确定全部 $\mu_\xi$，也确定每个无界 $f$ 的域。对角积分公式经极化确定该共同稠密域上的所有矩阵元，因此确定算子本身。

!!! theorem "定理 6.10.2：乘法模型中的演算"

    对任意可测实函数族 $f_j$ 和测度族，最大域实乘法 $M_{f_j}$ 强交换且自伴，$g(M_{f_1},\ldots,M_{f_N})=M_{g\circ(f_1,\ldots,f_N)}$，定义域也一致。

??? proof "证明 6.10.2"

    最大域实乘法自伴，其 Cayley 变换是相应模为 $1$ 的乘法算子，彼此交换。定义 $\pi(g)=M_{g\circ f_\bullet}$，有界部分的正常性来自单调收敛；向量测度是 $\sum_\alpha(f_\bullet)_*(|\xi_\alpha|^2\mu_\alpha)$。于是

    $$
    \int|g|^2\,d\mu_\xi
    =\sum_\alpha\int|g\circ f_\bullet|^2|\xi_\alpha|^2\,d\mu_\alpha.
    $$

    该量有限恰是右侧最大域条件，范数和积分公式也成立。6.10.1 的唯一性完成识别。

!!! theorem "命题 6.10.4：有界时强交换即交换"

    有限个有界自伴算子强交换当且仅当通常的算子复合交换；两种理论定义的有界 Borel 演算一致。

??? proof "证明 6.10.4"

    通常交换的有界自伴算子的全部 Borel 演算交换，特别 Cayley 变换交换。反向，两个 Cayley 变换交换时，6.9.4 给出共同乘法模型，其中原有界算子自然交换。两种演算的有界正常表示满足相同坐标要求，由唯一性相等。

!!! theorem "定理 6.10.5：无界复合规则"

    实 Borel $g_1,\ldots,g_L$ 给出强交换自伴 $g_j(T_\bullet)$，且对任意 Borel $f:\mathbb R^L\to\mathbb C$，$f(g_1(T_\bullet),\ldots,g_L(T_\bullet))=(f\circ(g_1,\ldots,g_L))(T_\bullet)$，使用两侧的最大演算定义域。

??? proof "证明 6.10.5"

    把 $T_\bullet$ 化为坐标乘法，$g_j(T_\bullet)=M_{g_j}$。6.10.2 说明这些实乘法自伴并强交换，其演算就是 $M_{f\circ g_\bullet}$。把模型换回原空间便得等式；两侧域都是满足 $\int|f\circ g_\bullet|^2\,d\mu_\xi<\infty$ 的向量，所以也确实同域。

!!! theorem "推论 6.10.6：演算的坐标限制"

    只依赖前 $L$ 个坐标的 Borel 函数，满足 $f(T_1,\ldots,T_L)=f(T_1,\ldots,T_N)$。

??? proof "证明 6.10.6"

    在 6.10.5 中取 $g_j(x)=x_j$，$1\leq j\leq L$，复合函数恰是将 $f$ 忽略其余变量后的函数。公式同时识别作用和定义域。

!!! theorem "命题 6.10.7：酉算子与自伴算子的交换"

    酉 $V$ 满足 $VT=TV$（含域相等）当且仅当它与 $T$ 的 Cayley 变换交换。

??? proof "证明 6.10.7"

    若 $VT=TV$ 且 $VD(T)=D(T)$，则 $V(T+i)=(T+i)V$，两侧满射，取逆并相乘得到 $VU_T=U_TV$。反向用 $D(T)=\operatorname{ran}(U_T-1)$：交换性及 $V^{-1}$ 的交换性保证该域被 $V$ 双向保持；逆 Cayley 公式再给出 $VT=TV$。

!!! theorem "定理 6.10.8：强交换的五个判据"

    自伴 $T_1,T_2$ 强交换、$U_1T_2=T_2U_1$、$U_2T_1=T_1U_2$、全部有界实 Borel 演算互相交换、全部有界复 Borel 演算互相伴随交换，这五个条件等价。

??? proof "证明 6.10.8"

    前两个单边交换判据分别由 6.10.7 化为 $U_1U_2=U_2U_1$。强交换给出共同乘法模型，所以全部有界复演算伴随交换，实演算当然交换。反向，复演算条件直接用于 Cayley 函数；实演算条件先用于 Cayley 函数的实部、虚部，再线性组合得到 Cayley 变换交换。

!!! definition "定义 6.10.9：无界联合谱"

    有界部分演算的表示支集称 $\sigma(T_1,\ldots,T_N)$，是 $\mathbb R^N$ 中的闭集；其每个邻域对应非零谱投影。谱一般不紧。

!!! theorem "定理 6.10.10：乘法模型的联合谱"

    若各测度 $\mu_\alpha$ 为 $\sigma$-有限，则 $\sigma(M_{f_1},\ldots,M_{f_N})=\overline{\bigcup_\alpha\operatorname{essran}_{\mu_\alpha}(f_1,\ldots,f_N)}$。坐标乘法的联合谱为各测度支集并集的闭包。

??? proof "证明 6.10.10"

    开邻域 $U$ 的联合谱投影为各分量的 $M_{\mathbf1_{f_\bullet^{-1}(U)}}$。在 $\sigma$-有限测度下，该乘法非零当且仅当该原像有正测度：正测度集合含一个有限正测度子集，其指标提供非零向量。因此一个点属于表示支集恰是其每个邻域都碰到某个分量的本质像，这等价于本质像并集的闭包。坐标函数时本质像闭集正是测度支集。

!!! theorem "命题 6.10.12：无界联合谱的包含"

    $\sigma(T_1,\ldots,T_N)\subset\sigma(T_1,\ldots,T_L)\times\sigma(T_{L+1},\ldots,T_N)$。

??? proof "证明 6.10.12"

    若某个坐标组在其谱外，取该组的开邻域 $U$ 使谱投影为零。6.10.6 将其识别为全演算中柱状集合的投影，所以全坐标点也不在联合谱。对两组分别运用即得包含。

### 实结构配对两个亏空间 { #topic-6-11-1 }

复共轭型的反酉映射会交换 $+i$ 与 $-i$。若它与原算子相容，就能把两个亏空间一一对应，从而保证存在自伴扩张。

!!! theorem "定理 6.11.1：实结构保证自伴扩张"

    若反酉 $C:H\to H$ 满足 $C^2=1$、$CD(T)\subset D(T)$ 且 $TC=CT$ 于定义域，其中 $T$ 对称，则 $CD(T)=D(T)$，并存在自伴扩张。$C$ 将两个亏空间互相反酉对应，故亏指数相等。固定点空间 $H_{\mathbb R}=\{\xi:C\xi=\xi\}$ 给出对应实 Hilbert 空间。

??? proof "证明 6.11.1"

    $C^2=I$ 使 $CD(T)\subset D(T)$ 自动成为等式。反线性给 $C(T+i)\xi=(T-i)C\xi$，故 $C$ 将两像互相映射；反酉保持正交补，因此也将 $N_+$ 与 $N_-$ 反酉对应。亏指数相等，6.7.11 便给出自伴扩张。固定点空间的内积为实，任意 $\xi$ 都可唯一写成 $(\xi+C\xi)/2+i(\xi-C\xi)/(2i)$，说明它给出实结构。

### 谱判据与极限 { #topic-6-12-1 }

近似特征向量把谱支集与可逆性连接起来。对无界算子，预解式是适合比较的有界对象；它的强收敛还可控制有界连续谱函数的演算。

!!! definition "定义 6.12.1：正负惯性指数"

    可分 Hilbert 空间上的有界 Hermitian 形式 $\omega$，其正、负惯性指数分别为使 $\omega$、$-\omega$ 在闭子空间上正定的最大可能维数。它们等于对应正、负谱子空间的维数。

??? proof "证明 6.12.1"

    谱演算给出正、零、负三个正交谱子空间，正谱子空间上的形式严格正，负谱子空间上严格负。若闭子空间 $L$ 上形式严格正，则到正谱子空间的投影在 $L$ 上单射：投影为零的非零向量只能落在零、负谱部分，其形式不可能正。这个有界单射使 $\dim L$ 不超过正谱空间的维数（可用其极分解识别闭像的支撑空间）；反向正谱空间达到此维数。负指数同理。

!!! definition "定义 6.12.3：联合近似特征值"

    $\lambda\in\mathbb C^N$ 为联合近似特征值，指每个 $\varepsilon>0$ 都有非零 $\xi\in\bigcap_jD(T_j)$ 满足 $\sum_j\|(T_j-\lambda_j)\xi\|^2\leq\varepsilon\|\xi\|^2$。等价于存在单位向量序列使每一项误差趋零；对强交换自伴族，这些点恰为联合谱，因而实际位于 $\mathbb R^N$。

??? proof "证明 6.12.3"

    若 $\lambda\in\sigma(T_\bullet)$，小球内的联合谱投影非零。取其像中的单位向量，因各坐标在此球上有界，该向量属于全部 $D(T_j)$，且误差平方和至多为球半径平方。反向若 $\lambda$ 在闭谱外，$\sum_j|x_j-\lambda_j|^2$ 在谱上有严格正下界，积分后得到误差平方和的正下界，排除近似特征值。非实坐标也有由其虚部提供的正下界。

!!! definition "定义 6.12.4：通过可逆性定义的谱"

    对稠密定义算子，$\sigma_{\mathrm{inv}}(T)=\{\lambda:(\lambda I-T)^{-1}\notin\mathcal L(H)\}$；预解集为其补集。有界逆必须处处定义。

!!! theorem "定理 6.12.5：两种谱定义一致"

    自伴算子的谱演算支集等于通过可逆性定义的谱。

??? proof "证明 6.12.5"

    若 $\lambda$ 距离实谱为正，谱上的 $r(x)=(\lambda-x)^{-1}$ 有界，且 $xr(x)$ 也有界。因此 $r(T)$ 取值在 $D(T)$，并满足 $(\lambda-T)r(T)=I$、$r(T)(\lambda-T)=I$，给出处处有界逆。若 $\lambda$ 在谱内，6.12.3 给单位近似特征向量；有界逆会强制 $\|(\lambda-T)\xi\|\geq\|(\lambda-T)^{-1}\|^{-1}\|\xi\|$，矛盾。

!!! definition "定义 6.12.6：强预解式收敛"

    自伴算子网 $T_\alpha$ 强预解式趋于自伴 $T$，指其 Cayley 变换 SOT 收敛到 $U_T$；等价于某个（从而每个）非实 $z$ 处 $(z-T_\alpha)^{-1}$ SOT 趋于 $(z-T)^{-1}$。

!!! theorem "推论 6.12.7：有界 SOT 极限的连续演算"

    若有界自伴 $T_\alpha$ SOT 趋于有界自伴 $T$，则对每个有界连续 $f:\mathbb R\to\mathbb C$，$f(T_\alpha)\to f(T)$ 在 SOT\* 下收敛。不要求整个算子网一致范数有界。

??? proof "证明 6.12.7"

    预解式恒等式及 $\|(z-T_\alpha)^{-1}\|\leq|\operatorname{Im}z|^{-1}$ 给

    $$
    (z-T_\alpha)^{-1}-(z-T)^{-1}
    =(z-T_\alpha)^{-1}(T_\alpha-T)(z-T)^{-1}\longrightarrow0
    $$

    强收敛。非实预解式函数及其共轭生成一致稠密于 $C_0(\mathbb R)$ 的代数，故由一致有界的演算估计，所有 $h\in C_0$ 的演算也强收敛。

    对一般有界连续 $f$，固定 $\xi$，取 $0\leq\chi_R\leq1$ 的紧支撑连续截断，$\chi_R\uparrow1$。先对极限向量测度选 $R$ 使 $\|(1-\chi_R(T))\xi\|$ 小，再用 $\chi_R(T_\alpha)\to\chi_R(T)$ 使同一尾部对充分大的 $\alpha$ 也小。分解 $f=f\chi_R+f(1-\chi_R)$，后一项范数至多为 $\|f\|_\infty$ 乘尾部误差，前一项已强收敛。这证明 $f(T_\alpha)\to f(T)$；对 $\bar f$ 同理，得到 SOT\*。全过程只需要逐向量的最终控制。

??? proof "从 Cayley 变换恢复无界谱与极限"

    Cayley 函数 $c(t)=(t-i)/(t+i)$ 将实轴 Borel 同构到圆周去掉 $1$ 的部分。自伴算子的 Cayley 变换没有特征值 $1$，故对应单点投影为零；将酉谱测度经 $c^{-1}$ 拉回实轴便得到无界乘法模型。最大定义域由 $|f|^2$ 的向量积分确定，使变换前后的算子域严格对应。

    在谱外，$(z-t)^{-1}$ 在谱上有界，演算给出处处有界逆；在谱内任意小邻域有非零谱投影，取其中单位向量构造近似特征向量，排除有界逆。联合情况用小球同时控制全部坐标误差。

    有界 SOT 自伴极限在预解式处满足恒等式 $R_\alpha(z)-R(z)=R_\alpha(z)(T_\alpha-T)R(z)$，而 $\|R_\alpha(z)\|\leq|\operatorname{Im}z|^{-1}$，故强预解式收敛。先对由预解式生成的连续函数应用逼近，再对固定向量控制谱测度的尾部，得到所有有界连续 $f$ 的 SOT\* 收敛。

## 12. 练习 { #section-12 }

!!! problem "练习 1：一个有界表达式的非闭限制"

    在 $\ell^2$ 的有限支撑子空间上定义恒等映射。它是否闭？闭包是什么？

??? proof "解"

    它不闭：取一个无限支撑向量的有限截断，输入输出同时收敛，但极限不在定义域中。其闭包是全 $\ell^2$ 上的恒等算子。此例说明闭性既涉及作用，也涉及定义域。

!!! problem "练习 2：图核心"

    在 $\ell^2$ 上令 $Tx=(nx_n)$，$D(T)=\{x:\sum n^2|x_n|^2<\infty\}$。证明有限支撑数列是核心。

??? proof "解"

    对有限截断 $x^{(N)}$，图误差平方为 $\sum_{n>N}(1+n^2)|x_n|^2\to0$。这同时控制输入和输出。只知道 $\|x^{(N)}-x\|_2\to0$ 还不能证明是核心。

!!! problem "练习 3：两个不同边界条件"

    对区间动量算子，分别求 $\theta=0$ 与 $\theta=\pi$ 的谱，判断常数函数是否在定义域。

??? proof "解"

    周期情形谱为 $2\pi\mathbb Z$，常数在定义域；反周期情形谱为 $\pi+2\pi\mathbb Z$，非零常数不满足边界条件。二者具有相同微分表达式，却是不同的自伴算子。

下一章会用闭梯度、能量形式与酉群构造具体的自伴算子。

[返回目录](index.md){ .md-button }
