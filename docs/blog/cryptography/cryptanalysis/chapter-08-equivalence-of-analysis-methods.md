---
title: 第八章：分组密码各种分析方法的等价性
description: "密码分析学笔记第八章：相关度与零相关线性壳、平衡与零和、SP 型轮函数、结构与对偶结构；不可能差分与零相关线性壳的等价性、零相关线性壳导出积分区分器、不可能差分与积分区分器的联系。"
hide:
  - navigation
categories:
  - 密码学
  - 密码分析
date: 2026-07-24
---

# 第八章：分组密码各种分析方法的等价性 { #top }

前面几章学了多种分组密码的分析方法，随之而来的问题是：这些方法之间有没有联系？答案是肯定的。研究它们之间的联系，能加深对方法本身的理解；同时可以借助分析方法之间的（条件）等价性，从一种区分器得到另一种区分器，进一步评估算法的安全性。

这方面已有不少结果：

- Chabaud 和 Vaudenay 给出了差分分析与线性分析的理论联系，Blondeau 和 Nyberg 进一步分析了两者的联系，使之能用到实际中，并揭示了在某些特殊情形下，零相关线性壳的存在等价于不可能差分区分器的存在；
- Blondeau 等揭示了 Feistel 类和 Skipjack 类算法的零相关线性壳与不可能差分区分器存在性的等价；
- 孙兵等在 CRYPTO 2015 上引入**结构 (structure)** 和**对偶结构 (dual structure)** 的概念，对 Feistel 类和 SPN 类算法证明了不可能差分区分器与零相关线性壳的等价，并从代数角度说明积分分析可以看作插值攻击的一种特例；
- Leander 阐述了统计饱和度区分器与多维线性区分器的平均等价；
- Bogdanov 等证明了积分区分器的存在无条件地意味着零相关线性壳的存在，零相关线性壳在某些条件下意味着积分区分器的存在。孙兵等改进了这一结果，证明零相关线性壳的存在可以**无条件地**意味着积分区分器的存在，并指出“积分区分器导出零相关线性壳”只对具有平衡特性的积分区分器成立；
- Blondeau 和 Nyberg 阐述了截断差分区分器与多维线性区分器的关系，证明了统计饱和度分析与截断差分分析等价，可以借此估计统计饱和度攻击的数据量；
- 李明明等在 FSE 2019 上给出了相关密钥统计饱和度区分器与密钥差分不变偏差区分器的条件等价（见[第四章](<chapter-04-linear-cryptanalysis.md#s7>)）。

本章主要依据孙兵等 CRYPTO 2015 的工作，讨论轮函数为 SP 型的 Feistel 结构和 SPN 结构算法中，**不可能差分区分器、零相关线性壳、积分区分器三者之间的联系**。

## 1. 基础知识 { #s1 }

### 1.1 相关定义 { #s1-1 }

$\mathbb F_2^n$ 为 $\mathbb F_2$ 上的 $n$ 维向量空间。对行向量 $a=(a_1,\cdots,a_n)$，$b=(b_1,\cdots,b_n)\in\mathbb F_2^n$，内积为

$$
a\cdot b\triangleq a_1b_1\oplus a_2b_2\oplus\cdots\oplus a_nb_n,
$$

也可以写作矩阵乘法 $ab^{\mathrm T}$。

!!! definition "定义（相关度）"
    布尔函数 $G:\mathbb F_2^n\to\mathbb F_2$ 的**相关度**为

    $$
    \mathrm{Cor}(G(x))\triangleq\frac{\#\{x\in\mathbb F_2^n\mid G(x)=0\}-\#\{x\in\mathbb F_2^n\mid G(x)=1\}}{2^n}=\frac1{2^n}\sum_{x\in\mathbb F_2^n}(-1)^{G(x)}.
    $$

    对向量布尔函数 $H:\mathbb F_2^n\to\mathbb F_2^m$，输入掩码为 $n$ 比特的 $a$、输出掩码为 $m$ 比特的 $b$ 的线性逼近的相关度为

    $$
    \mathrm{Cor}(a\cdot x\oplus b\cdot H(x))\triangleq\frac1{2^n}\sum_{x\in\mathbb F_2^n}(-1)^{a\cdot x\oplus b\cdot H(x)}.
    $$

!!! definition "定义（零相关线性壳）"
    若 $\mathrm{Cor}(a\cdot x\oplus b\cdot H(x))=0$，称 $a\to b$ 为 $H$ 的一条**零相关线性壳**。推广地，设 $A\subseteq\mathbb F_2^n$，$B\subseteq\mathbb F_2^m$，若对任意 $a\in A$，$b\in B$ 都有相关度为零，称 $A\to B$ 为 $H$ 的一条零相关线性壳。

!!! note "注"
    $H$ 是 $\mathbb F_2^n$ 上的置换时，对任意 $b\ne0$ 都有 $\mathrm{Cor}(b\cdot H(x))=0$，对任意 $a\ne0$ 都有 $\mathrm{Cor}(a\cdot x)=0$。所以 $a,b$ 都不为 $0$ 时，把 $0\to b$ 和 $a\to0$ 称作**平凡的**零相关线性壳。

积分区分器主要利用具有平衡 (balanced) 或零和 (zero-sum) 特性的函数。

!!! definition "定义（平衡与零和）"
    设 $A\subseteq\mathbb F_2^n$。

    - 若集合 $H_A^{-1}(y)\triangleq\{x\in A\mid H(x)=y\}$ 的大小与 $y\in\mathbb F_2^m$ 的取值无关，称 $H$ 在 $A$ 上具有**平衡特性**；
    - 若 $H$ 在 $A$ 上所有函数值的异或和为 $0$，即 $\sum_{x\in A}H(x)=0$，称 $H$ 在 $A$ 上具有**零和特性**。

!!! definition "定义（不可能差分区分器）"
    对向量布尔函数 $H:\mathbb F_2^n\to\mathbb F_2^m$，$n$ 比特的 $a$ 和 $m$ 比特的 $b$ 分别为输入和输出差分，差分传播概率为

    $$
    \Pr(a\to b)\triangleq\frac{\#\{x\in\mathbb F_2^n\mid H(x)\oplus H(x\oplus a)=b\}}{2^n}.
    $$

    若 $\Pr(a\to b)=0$，称 $a\to b$ 为 $H$ 的一条**不可能差分区分器**。类似地可以推广到集合 $A\to B$。

### 1.2 SP 型轮函数与两类结构 { #s1-2 }

!!! definition "定义（SP 型轮函数）"
    若 $f:\mathbb F_2^{s\times t}\to\mathbb F_2^{s\times t}$ 按如下方式计算，称 $f$ 为 **SP 型轮函数**：先把输入 $x$ 分成 $t$ 份，$x=(x_0,\cdots,x_{t-1})$，每块 $x_i$ 为 $s$ 比特；对每个 $x_i$ 分别作非线性变换 $S_i$，得到 $y=(S_0(x_0),\cdots,S_{t-1}(x_{t-1}))\in\mathbb F_2^{s\times t}$；最后对 $y$ 作线性变换 $P$，输出 $f(x)=P(y)$。

!!! definition "定义（$r$ 轮 Feistel 结构算法）"
    记 $(L_0,R_0)\in\mathbb F_2^{2n}$ 为算法 $E$ 的输入，按如下方式迭代 $r$ 次：

    $$
    \begin{cases}L_{i+1}=F_i(L_i)\oplus R_i,\\R_{i+1}=L_i,\end{cases}\qquad0\le i\le r-1,
    $$

    $F_i$ 为第 $i+1$ 轮的轮函数，$L_i,R_i\in\mathbb F_2^n$，输出为 $(L_r,R_r)$。轮函数都为 SP 型时，称 $E$ 为轮函数为 SP 型的 Feistel 结构算法。

!!! definition "定义（$r$ 轮 SPN 结构算法）"
    记 $x_0\in\mathbb F_2^n$ 为算法 $E$ 的输入，按 $x_{i+1}=F_i(x_i)$，$0\le i\le r-1$ 迭代 $r$ 次，$F_i$ 为第 $i+1$ 轮的 SP 型轮函数，$x_r$ 为输出。

轮函数为 SP 型的 Feistel 和 SPN 结构算法中，线性变换 $P$ 的构造方式有很多种，但都可以用一个矩阵表示：若 $P$ 为 $\mathbb F_2^m$ 上的线性变换，则存在 $m\times m$ 的矩阵 $M=(a_{i,j})$，$a_{i,j}\in\mathbb F_2$，使 $P(x)=xM$，$x$ 为 $m$ 比特行向量。称 $M$ 为 $P$ 的**原始表示 (primitive representation)**。

大多数情况下，构造不可能差分区分器或零相关线性壳时，我们只关心 S 盒活跃与否，不关心 S 盒具体的输入输出差分值或掩码值。所以构造出的区分器与具体的 S 盒无关，换成别的 S 盒仍然成立。这引出下面的定义。

!!! definition "定义（结构, Structure）"
    设 $E:\mathbb F_2^n\to\mathbb F_2^n$ 为分组密码算法，使用 $s$ 比特的双射 S 盒作为非线性变换。$\mathbb F_2^n$ 上的**结构** $\mathcal E^E$ 是一个集合，包含所有除 S 盒外与 $E$ 完全相同、且使用 $s$ 比特双射 S 盒的算法 $E'$。

    若对任意 $E'\in\mathcal E^E$，$a\to b$ 都是不可能差分区分器（零相关线性壳），则称 $a\to b$ 为结构 $\mathcal E^E$ 的不可能差分区分器（零相关线性壳）。

!!! note "注"
    若 $E$ 使用的 S 盒不要求是双射的，结构 $\mathcal E^E$ 中算法的 S 盒也只需是一个变换。

!!! definition "定义（对偶结构, Dual Structure）"
    1. 记 $\mathcal F_{SP}$ 为轮函数为 SP 型的 Feistel 结构，$P$ 为其线性变换的原始表示，$\sigma$ 为交换左右支的操作，则 $\mathcal F_{SP}$ 的对偶结构为

        $$
        \mathcal F_{SP}^\perp=\sigma\circ\mathcal F_{P^{\mathrm T}S}\circ\sigma,
        $$

        其中 $\mathcal F_{P^{\mathrm T}S}$ 表示轮函数先作线性变换 $P^{\mathrm T}$、再过 S 层的 Feistel 结构；
    2. 记 $\mathcal E_{SP}$ 为 SPN 结构，$P$ 为其线性变换的原始表示，则对偶结构为

        $$
        \mathcal E_{SP}^\perp=\mathcal E_{S(P^{-1})^{\mathrm T}}.
        $$

对偶结构的直觉来自差分和掩码在线性层上的对偶传播：差分过线性变换 $x\mapsto xM$ 时乘以 $M$，掩码则乘以 $M$ 的逆转置。利用结构和对偶结构，就可以写出三种区分器之间的联系。

!!! theorem "定理（三种区分器的联系）"
    记 $\mathcal E\in\{\mathcal F_{SP},\mathcal E_{SP}\}$，则

    1. $a\to b$ 是 $\mathcal E$ 的一条 $r$ 轮不可能差分区分器，当且仅当 $a\to b$ 是 $\mathcal E^\perp$ 的一条 $r$ 轮零相关线性壳；
    2. 若 $\mathcal E$ 存在一条非平凡的零相关线性壳，则 $\mathcal E$ 一定存在相应轮数的积分区分器；
    3. 若 $\mathcal E$ 存在一条不可能差分区分器，则 $\mathcal E^\perp$ 一定存在相应轮数的积分区分器。

下面三节分别证明这三条，并给出推论。

## 2. 不可能差分区分器与零相关线性壳的等价性 { #s2 }

!!! theorem "定理（不可能差分区分器与零相关线性壳）"
    记 $\mathcal E\in\{\mathcal F_{SP},\mathcal E_{SP}\}$，则 $a\to b$ 是 $\mathcal E$ 的一条 $r$ 轮不可能差分区分器，当且仅当 $a\to b$ 是 $\mathcal E^\perp$ 的一条 $r$ 轮零相关线性壳。

??? proof "证明"
    以 $\mathcal E=\mathcal F_{SP}$ 为例，$\mathcal E_{SP}$ 的结论可以类似证明。需要证明两个方面：

    - 若 $a\to b$ 是 $\mathcal F_{SP}$ 的 $r$ 轮不可能差分区分器，则它是 $\mathcal F_{SP}^\perp$ 的 $r$ 轮零相关线性壳；
    - 若 $a\to b$ 是 $\mathcal F_{SP}$ 的 $r$ 轮零相关线性壳，则它是 $\mathcal F_{SP}^\perp$ 的 $r$ 轮不可能差分区分器。

    注意到若 $a\to b$ 为 $\mathcal F_{SP}^\perp$ 的不可能差分区分器（零相关线性壳），则 $\sigma(a)\to\sigma(b)$ 为 $\mathcal F_{P^{\mathrm T}S}$ 的不可能差分区分器（零相关线性壳），反之亦然。取逆否命题，上面两条等价于：

    - **(A)** 对 $r$ 轮的线性壳 $(\delta_0,\delta_1)\to(\delta_r,\delta_{r+1})$，若存在 $E\in\mathcal F_{P^{\mathrm T}S}$ 使其相关度不为 $0$，则存在 $E'\in\mathcal F_{SP}$ 使 $(\delta_1,\delta_0)\to(\delta_{r+1},\delta_r)$ 是概率不为 $0$ 的 $r$ 轮差分；
    - **(B)** 对 $r$ 轮的差分 $(\delta_1,\delta_0)\to(\delta_{r+1},\delta_r)$，若存在 $E\in\mathcal F_{SP}$ 使其概率大于 $0$，则存在 $E'\in\mathcal F_{P^{\mathrm T}S}$ 使 $(\delta_0,\delta_1)\to(\delta_r,\delta_{r+1})$ 是相关度不为 $0$ 的 $r$ 轮线性壳。

    **证 (A)。** $\mathcal F_{P^{\mathrm T}S}$ 的线性壳相关度不为 $0$，所以其中一定包含一条相关度不为 $0$ 的线性路线

    $$
    (\delta_0,\delta_1)\to\cdots\to(\delta_{i-1},\delta_i)\to\cdots\to(\delta_r,\delta_{r+1}),
    $$

    $\delta_i=(\delta_{i,1},\cdots,\delta_{i,t})\in(\mathbb F_2^s)^t$。第 $i$ 轮 S 盒 $S_i=(S_{i,1},\cdots,S_{i,t})$ 的输出掩码为 $\delta_i$，记其输入掩码为 $\beta_i=(\beta_{i,1},\cdots,\beta_{i,t})$，则 $\delta_{i+1}=\delta_{i-1}\oplus\beta_iP$。

    用归纳法构造 $E'\in\mathcal F_{SP}$，使对任意 $(x_L,x_R)$ 都有

    $$
    E_r(x_L,x_R)\oplus E_r(x_L\oplus\delta_1,x_R\oplus\delta_0)=(\delta_{r+1},\delta_r),
    $$

    从而 $(\delta_1,\delta_0)\to(\delta_{r+1},\delta_r)$ 的概率为 $1$，当然不为 $0$。

    - $r=1$：如下构造 $E_1$ 的 S 盒 $S_1=(S_{1,1},\cdots,S_{1,t})$。若 $\delta_{1,j}=0$，$S_{1,j}$ 可以是 $\mathbb F_2^s$ 上的任意变换；否则选择满足 $S_{1,j}(x_{L,j})=x_{L,j}$、$S_{1,j}(x_{L,j}\oplus\delta_{1,j})=x_{L,j}\oplus\beta_{1,j}$ 以及 $S_{1,j}(x_{L,j}\oplus\beta_{1,j})=x_{L,j}\oplus\delta_{1,j}$ 的 S 盒（即对差分 $\delta_{1,j}$ 输出差分恒为 $\beta_{1,j}$）。于是 $E_1(x_L,x_R)\oplus E_1(x_L\oplus\delta_1,x_R\oplus\delta_0)=(\delta_0\oplus\beta_1P,\delta_1)=(\delta_2,\delta_1)$。
    - 设已构造出 $r-1$ 轮的 $E_{r-1}$ 满足 $E_{r-1}(x_L,x_R)\oplus E_{r-1}(x_L\oplus\delta_1,x_R\oplus\delta_0)=(\delta_r,\delta_{r-1})$。记 $(y_L,y_R)=E_{r-1}(x_L,x_R)$，对第 $r$ 轮的 S 盒 $S_{r,j}$ 同样构造：$\delta_{r,j}=0$ 时任意；否则选择满足 $S_{r,j}(y_{L,j})=y_{L,j}$、$S_{r,j}(y_{L,j}\oplus\delta_{r,j})=y_{L,j}\oplus\beta_{r,j}$ 且 $S_{r,j}(y_{L,j}\oplus\beta_{r,j})=y_{L,j}\oplus\delta_{r,j}$ 的 S 盒。于是对任意 $(x_L,x_R)$，$E_r(x_L,x_R)\oplus E_r(x_L\oplus\delta_1,x_R\oplus\delta_0)=(\delta_{r+1},\delta_r)$。

    **证 (B)。** $\mathcal F_{SP}$ 的差分 $(\delta_1,\delta_0)\to(\delta_{r+1},\delta_r)$ 概率不为 $0$，所以存在一条概率不为 $0$ 的差分路线

    $$
    (\delta_1,\delta_0)\to\cdots\to(\delta_i,\delta_{i-1})\to\cdots\to(\delta_{r+1},\delta_r).
    $$

    第 $i$ 轮 S 盒 $S_i$ 的输入差分为 $\delta_i$，记输出差分为 $\beta_i$，则 $\delta_{i+1}=\delta_{i-1}\oplus\beta_iP$。注意到对每一对 $(\delta_{i,j},\beta_{i,j})$，总能找到 $\mathbb F_2$ 上的 $s\times s$ 可逆矩阵 $M_{i,j}$ 使 $\beta_{i,j}=\delta_{i,j}M_{i,j}^{\mathrm T}$，于是当 $S_{i,j}(x)=xM_{i,j}$ 时，

    $$
    \mathrm{Cor}(\beta_{i,j}\cdot x\oplus\delta_{i,j}\cdot S_{i,j}(x))=1.
    $$

    （$\delta\cdot(xM)=xM\delta^{\mathrm T}=x\cdot(\delta M^{\mathrm T})=x\cdot\beta$，即掩码对 $(\beta,\delta)$ 恒成立。）

    类似地用归纳法构造 $E_r\in\mathcal F_{P^{\mathrm T}S}$，使 $\mathrm{Cor}((\delta_0,\delta_1)\cdot x\oplus(\delta_r,\delta_{r+1})\cdot E_r(x))=1$：

    - $r=1$：对第 1 轮的每个 S 盒，若 $\delta_{1,j}=0$，$S_{1,j}$ 可以是任意线性变换；否则令 $S_{1,j}(x)=xM_{1,j}$。于是 $E_1$ 中所有操作都是线性的，存在 $\mathbb F_2$ 上的 $2st\times2st$ 矩阵 $M_1$ 使 $E_1(x)=xM_1$，且 $\mathrm{Cor}((\delta_0,\delta_1)\cdot x\oplus(\delta_1,\delta_2)\cdot E_1(x))=1$；
    - 设已构造出 $E_{r-1}(x)=xM_{r-1}$ 且 $\mathrm{Cor}((\delta_0,\delta_1)\cdot x\oplus(\delta_{r-1},\delta_r)\cdot E_{r-1}(x))=1$。对第 $r$ 轮的 S 盒同样构造：$\delta_{r,j}=0$ 时为任意线性变换，否则 $S_{r,j}(x)=xM_{r,j}$。于是 $r$ 轮算法 $E_r$ 的所有操作都是线性的，$\mathrm{Cor}((\delta_0,\delta_1)\cdot x\oplus(\delta_r,\delta_{r+1})\cdot E_r(x))=1$。

    证毕。

证明的核心想法值得记住：**结构中的 S 盒可以任意选**。对一条概率非零的差分路线，总能选线性的 S 盒使对应的掩码路线以相关度 $1$ 成立；对一条相关度非零的线性路线，总能选 S 盒使对应的差分以概率 $1$ 成立。所以“结构上不可能”和“对偶结构上零相关”是同一件事。

!!! theorem "推论"
    若 $P$ 可逆，则寻找 $\mathcal F_{SP}$ 的零相关线性壳与寻找 $\mathcal F_{SP^{\mathrm T}}$ 的不可能差分区分器是等价的。

!!! theorem "推论"
    1. 对 $\mathcal F_{SP}$，若 $P$ 可逆且 $P^{\mathrm T}=P$，则其不可能差分区分器与零相关线性壳一一对应；
    2. 对 $\mathcal E_{SP}$，若 $P^{\mathrm T}P=I$（$I$ 为单位矩阵），则 $a\to b$ 是一条不可能差分区分器当且仅当它是一条零相关线性区分器。

!!! problem "习题"
    CipherFour 的线性层是比特置换 $P$，它是对合的（见[算法附录](<appendix-algorithms.md#cipherfour>)）。由上面的推论，CipherFour 结构的不可能差分区分器与零相关线性壳有什么关系？

??? solution "解"
    比特置换的原始表示 $M$ 是置换矩阵，满足 $M^{\mathrm T}M=I$，即 $(M^{-1})^{\mathrm T}=M$，所以 $\mathcal E_{SP}^\perp=\mathcal E_{S(P^{-1})^{\mathrm T}}=\mathcal E_{SP}$，对偶结构就是自身。由推论第 2 条，CipherFour 结构的 $a\to b$ 是不可能差分区分器当且仅当它是零相关线性壳。实际上，对任何以比特置换为线性层的 SPN（如 PRESENT、GIFT），不可能差分和零相关线性壳的搜索结果是一样的。

## 3. 零相关线性壳与积分区分器的联系 { #s3 }

先给出一个重要的引理。

!!! theorem "引理"
    设 $A$ 是 $\mathbb F_2^n$ 的子空间，$A^\perp=\{x\in\mathbb F_2^n\mid a\cdot x=0,\ \forall a\in A\}$ 为 $A$ 的对偶空间。函数 $F:\mathbb F_2^n\to\mathbb F_2^n$，对任意 $\lambda\in\mathbb F_2^n$，定义 $T_\lambda:A^\perp\to\mathbb F_2^n$ 为 $T_\lambda(x)=F(x\oplus\lambda)$。则对任意 $b\in\mathbb F_2^n$，

    $$
    \sum_{a\in A}(-1)^{a\cdot\lambda}\mathrm{Cor}(a\cdot x\oplus b\cdot F(x))=\mathrm{Cor}(b\cdot T_\lambda(x)),
    $$

    右端的相关度在 $A^\perp$ 上计算：$\mathrm{Cor}(b\cdot T_\lambda(x))=\frac1{|A^\perp|}\sum_{y\in A^\perp}(-1)^{b\cdot T_\lambda(y)}$。

??? proof "证明"
    $$
    \begin{aligned}
    \sum_{a\in A}(-1)^{a\cdot\lambda}\mathrm{Cor}(a\cdot x\oplus b\cdot F(x))
    &=\sum_{a\in A}(-1)^{a\cdot\lambda}\frac1{2^n}\sum_{x\in\mathbb F_2^n}(-1)^{a\cdot x\oplus b\cdot F(x)}\\
    &=\frac1{2^n}\sum_{x\in\mathbb F_2^n}(-1)^{b\cdot F(x)}\sum_{a\in A}(-1)^{a\cdot(\lambda\oplus x)}\\
    &=\frac1{2^n}\sum_{x\in\mathbb F_2^n}(-1)^{b\cdot F(x)}|A|\,\delta_{A^\perp}(\lambda\oplus x)\\
    &=\frac1{|A^\perp|}\sum_{y\in A^\perp}(-1)^{b\cdot T_\lambda(y)}=\mathrm{Cor}(b\cdot T_\lambda(x)),
    \end{aligned}
    $$

    其中 $\delta_{A^\perp}(x)=1$ 当 $x\in A^\perp$，否则为 $0$。第三步用了特征和的正交性：$\sum_{a\in A}(-1)^{a\cdot z}$ 当 $z\in A^\perp$ 时为 $|A|$，否则为 $0$。第四步令 $y=x\oplus\lambda$，并用了 $|A|\cdot|A^\perp|=2^n$。

!!! theorem "推论"
    设 $F:\mathbb F_2^n\to\mathbb F_2^n$，$A$ 是 $\mathbb F_2^n$ 的子空间，$b\in\mathbb F_2^n\setminus\{0\}$。若 $A\to b$ 是 $F$ 的一条零相关线性壳，则对任意 $\lambda\in\mathbb F_2^n$，$b\cdot F(x\oplus\lambda)$ 在 $A^\perp$ 上都是平衡的。

??? proof "证明"
    $A\to b$ 零相关，即对所有 $a\in A$，$\mathrm{Cor}(a\cdot x\oplus b\cdot F(x))=0$，引理左端为 $0$，于是 $\mathrm{Cor}(b\cdot T_\lambda(x))=0$，即布尔函数 $b\cdot F(x\oplus\lambda)$ 在 $A^\perp$ 上取 $0$ 和 $1$ 的次数相等。

可见，若零相关线性壳的输入掩码构成子空间，这条零相关线性壳就对应一条积分区分器：取明文集合为陪集 $\lambda\oplus A^\perp$，则输出的 $b\cdot F$ 是平衡的，从而零和。

!!! theorem "定理（零相关线性壳与积分区分器）"
    记 $\mathcal E\in\{\mathcal F_{SP},\mathcal E_{SP}\}$。若 $\mathcal E$ 存在一条非平凡的零相关线性壳，则 $\mathcal E$ 一定存在相应轮数的积分区分器。

??? proof "证明"
    设 $A\to B$ 是 $\mathcal E$ 的一条非平凡零相关线性壳。选择 $a\in A$，$b\in B$ 且 $a,b$ 均不为 $0$，则 $\{0,a\}\to b$ 也是 $\mathcal E$ 的一条零相关线性壳（$0\to b$ 的相关度对置换总为 $0$）。$V=\{0,a\}$ 构成 $\mathbb F_2^n$ 的一个子空间，由上面的推论，$b\cdot\mathcal E(x)$ 在 $V^\perp$ 的任意陪集上都是平衡的。这就是具有相同轮数的积分区分器。

!!! note "注"
    这个积分区分器的数据量是 $|V^\perp|=2^{n-1}$，很大，但存在性是无条件的。若零相关线性壳的输入掩码集合 $A$ 本身是高维子空间，得到的积分区分器只需 $|A^\perp|=2^{n-\dim A}$ 个明文，这就有实用意义了。

## 4. 不可能差分区分器与积分区分器的联系 { #s4 }

把前两节结合起来，就能建立不可能差分区分器与积分区分器的联系。

!!! theorem "定理（不可能差分区分器与积分区分器）"
    记 $\mathcal E\in\{\mathcal F_{SP},\mathcal E_{SP}\}$。若 $\mathcal E$ 存在一条不可能差分区分器，则 $\mathcal E^\perp$ 一定存在相应轮数的积分区分器。

??? proof "证明"
    由 [§2](#s2) 的定理，$\mathcal E$ 的不可能差分区分器 $a\to b$ 就是 $\mathcal E^\perp$ 的零相关线性壳。再由 [§3](#s3) 的定理，$\mathcal E^\perp$ 的一条零相关线性壳意味着 $\mathcal E^\perp$ 的一条积分区分器存在。

当 $\mathcal E^\perp=A_2\mathcal EA_1$（$A_1,A_2$ 为线性变换）时，$\mathcal E^\perp$ 的积分区分器可以直接转换为 $\mathcal E$ 的积分区分器，于是得到不可能差分区分器与积分区分器之间的直接转换：

!!! theorem "推论"
    若 $P$ 可逆，且存在作用在 $t$ 个元素上的置换 $\pi$，使对任意 $(x_0,\cdots,x_{t-1})\in\mathbb F_2^{s\times t}$ 都有

    $$
    P(x_0,\cdots,x_{t-1})=\pi^{-1}P^{\mathrm T}\pi(x_0,\cdots,x_{t-1}),
    $$

    则对 $\mathcal F_{SP}$，一条不可能差分区分器的存在总意味着积分区分器的存在。

!!! theorem "推论"
    若 $P^{\mathrm T}P$ 为分块对角矩阵 $\mathrm{diag}(Q_1,\cdots,Q_t)$，$Q_i\in\mathbb F_2^{s\times s}$，则对 $\mathcal E_{SP}$，一条不可能差分区分器的存在总意味着积分区分器的存在。

!!! theorem "推论"
    对以比特置换为线性扩散层的 SPN 结构算法，$r$ 轮不可能差分区分器的存在意味着 $r$ 轮积分区分器的存在。

!!! problem "习题"
    解释最后一个推论为什么是前一个推论的特例。

??? solution "解"
    比特置换的原始表示 $M$ 是置换矩阵，$M^{\mathrm T}M=I$。单位矩阵当然是分块对角矩阵（每块 $Q_i=I_s$），满足前一个推论的条件，所以不可能差分区分器的存在意味着积分区分器的存在。更直接地，$P^{\mathrm T}P=I$ 说明 $\mathcal E_{SP}^\perp=\mathcal E_{SP}$，不可能差分就是自身的零相关线性壳，再由 [§3](#s3) 得到积分区分器。轮数在这些转换中保持不变。

!!! problem "习题"
    由本章的结论，设计者在评估一个以比特置换为线性层的 SPN 算法（如 PRESENT）时，若已经用自动化工具搜索到最长的不可能差分区分器为 $r$ 轮，还需要单独搜索零相关线性区分器吗？积分区分器呢？

??? solution "解"
    零相关线性区分器不需要：它与不可能差分区分器在结构意义下一一对应，最长轮数相同。积分区分器则至少有 $r$ 轮，但**可能更长**：上面的结论只是“不可能差分 $\Rightarrow$ 积分”的单向关系，而且是在“结构”（S 盒任意）的意义下。实际的积分区分器（例如用分离特性搜索）会利用具体 S 盒的代数次数，往往比结构意义下的结论更长。所以积分区分器仍需单独搜索，见[第五章](<chapter-05-integral-cryptanalysis.md>)和[第九章](<chapter-09-automated-distinguisher-search.md>)。

## 5. 小结 { #s5 }

$$
\begin{array}{ccc}
\mathcal E\ \text{的不可能差分} & \Longleftrightarrow & \mathcal E^\perp\ \text{的零相关线性壳}\\
 & & \Downarrow\\
 & & \mathcal E^\perp\ \text{的积分区分器}
\end{array}
$$

- 不可能差分与零相关线性壳在**结构**意义下等价，桥梁是对偶结构（线性层 $P$ 换成 $P^{\mathrm T}$ 或 $(P^{-1})^{\mathrm T}$）。$P$ 满足对称或正交条件时，对偶结构就是自身。
- 零相关线性壳无条件地导出积分区分器，桥梁是引理中的特征和恒等式。
- 二者结合，不可能差分区分器导出对偶结构的积分区分器；在一定条件下（如比特置换线性层）可以直接导出同一算法的积分区分器。

参考：王美琴主编，《密码分析学》，科学出版社，2024，第 8 章。
