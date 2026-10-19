---
title: 第九章：Noether 模与 Artin 模
date: 2025-11-19
updated: 2026-10-15
description: 代数2-H 笔记第九章：诺特环、准素分解、Artin 环。
hide:
  - navigation
categories:
  - 代数
tags:
  - commutative-algebra
---

# 第九章：Noether 模与 Artin 模 { #top }

!!! definition "定义"
    $R-$模 $M$ 称为 Noether 模，若其满足升链条件：$M_1\subset M_2\subset \cdots\Longrightarrow \exists k,M_k=M_{k+1}=\cdots$。

    $R-$模 $M$ 称为 Artin 模，若其满足链降条件：$M_1\supset M_2\supset \cdots\Longrightarrow \exists k,M_k=M_{k+1}=\cdots$。

!!! definition "定义"
    环 $R$ 称为 Noether/Artin 环若它对自身是 Noether/Artin 模。

!!! example "例"
    有限群看作 $\mathbb{Z}-$模既是 Noether 也是 Artin 模。

!!! example "例"
    - $\mathbb{Z}$ 是 Noether 的但不是 Artin 的；
    - 任一域既是 Noether 也是 Artin 的；
    - 任一 PID 是 Noether 的。

!!! example "例"
    $k[x]$ 是 Noether 的但不是 Artin 的，$k[x_1,x_2,\cdots]$ 既不是 Noether 也不是 Artin 的。

!!! example "例"
    Noether/Artin 环的子环不一定是 Noether/Artin 环，如 $k[x_1,x_2,\cdots]$ 的分式域是域。

后文中我们会证明任一 Artin 环均为 Noether 环。

!!! theorem "命题"
    $M$ 是 Noether 的当且仅当任意 $M$ 的子模都是有限生成的。

??? proof "证明"
    “$\Longrightarrow$”：令 $N$ 是 $M$ 的子模，若 $N$ 不是有限生成的，设 $x_1\in N,x_2\in N\setminus Rx_1,x_3\in N\setminus (Rx_1+Rx_2),\cdots$，则我们有升链：

    $$
    Rx_1\subset Rx_1+Rx_2\subset \cdots
    $$

    由于 $M$ 是 Noether 的，故存在 $n$，$Rx_1+Rx_2+\cdots+Rx_n=Rx_1+\cdots+Rx_{n+1}$，矛盾！

    “$\Longleftarrow$”：对任意 $M_1\subset M_2\subset \cdots,M=\bigcup M_i$ 由一些 $x_1,\cdots,x_n$ 生成，则存在 $a_i$，$x_i\in M_{a_i}$，取 $m=\max a_i$，则 $M_m=M$。

!!! theorem "命题"
    令 $0\rightarrow M'\overset{f}{\rightarrow}M\overset{g}{\rightarrow}M''\rightarrow 0$ 是短正合列。则 $M$ 是 Noether/Artin 的当且仅当 $M',M''$ 均为 Noether/Artin 的。特别的，由于 $0\rightarrow M'\rightarrow M'\oplus M''\rightarrow M''\rightarrow 0$ 是正合的，故 Noether/Artin 模的直和也是 Noether/Artin 的。

??? proof "证明"
    下次再补。

!!! theorem "命题"
    $R$ 是 Noether/Artin 环，$M$ 是有限生成 $R-$模，则 $M$ 是 Noether/Artin 模。令 $I$ 是 $R$ 的理想，则作为 $R-$模 $R/I$ 是 Noether/Artin 的。

??? proof "证明"
    设 $M$ 是 $R^n$ 的商模，则我们有正合列

    $$
    0\rightarrow \ker f \rightarrow R^n\overset{f}{\rightarrow} M\rightarrow 0
    $$

    由**命题 2.30**，我们有正合列 $0\rightarrow I\rightarrow R\rightarrow R/I\rightarrow 0$，故 $R/I$ 是 Noether/Artin 的。

!!! definition "定义"
    一个 $R-$模 $M$ 称为单模，若它没有非平凡的子模。一个合成列是一列子模

    $$
    M=M_0\supsetneqq M_1 \supsetneqq M_2 \supsetneqq \cdots \supsetneqq M_n=0
    $$

    其中 $M_i/M_{i+1}$ 是单模。$n$ 称为这个合成列的长度。

!!! theorem "命题"
    合成列的长度相同。

??? proof "证明"
    对 $R-$模 $M$，记 $l(M)$ 为其合成列中最小的长度。我们断言若 $N\subsetneqq M,l(M)<\infty$，则 $l(M)>l(N)$。

    若该断言成立，则对任意序列 $M=M_0\supsetneqq M_1 \supsetneqq M_2 \supsetneqq\cdots \supsetneqq M_n=0$，我们有 $l(M)>l(M_1)>\cdots>l(M_n)=0$，故 $l(M)\ge n$，但由定义 $l(M)\le n$，故 $n=l(M)$。

    现在我们来证明这个断言。取 $M$ 的一个合成列，$M=M_0\supset M_1 \supset M_2\supset \cdots \supset M_l=0$，其中 $l=l(M)$。则

    $$
    N=M_0\cap N\supset \cdots \supset M_l\cap N=0
    $$

    是 $N$ 的合成列，这是因为 $M_i\cap N/M_{i+1}\cap N\subset M_i/M_{i+1}$ 是单的，故 $M_i\cap N=M_{i+1}\cap N$ 或 $M_i\cap N/M_{i+1}\cap N=M_i/M_{i+1}$。若第一种情况发生了，则我们可以删去一些项，这表示 $l(N)<l(M)$。否则我们可以归纳得到 $M_i=M_i\cap N$，这表明 $M=N$。

!!! theorem "命题"
    $M$ 有合成列当且仅当 $M$ 既是 Noether 又是 Artin 的。

??? proof "证明"
    “$\Longleftarrow$”：对全体子模用升链条件我们有极大子模 $M_1\subset M$，$M/M_1$ 是单的。类似的得到 $M_1\supset M_2\supset \cdots$，$M_i/M_{i+1}$ 是单的。再利用降链条件得到这个序列有限。

    “$\Longrightarrow$”：设 $M$ 有合成列，对任意 $M_1\supset M_2\supset \cdots$，$l(M_1)\le l(M_2)\le \cdots\le l(M)$ 有限，故存在 $k$，$l(M_k)=l(M_{k+1})=\cdots$，即 $M_k=M_{k+1}=\cdots$，故是 Noether 的。Artin 同理。

注：若 $l(M)<\infty$，则任意序列 $M=M_0\supsetneqq M_1 \supsetneqq\cdots \supsetneqq M_n=0$ 可通过将 $M_i/M_{i+1}$ 拆开扩张成合成列。

!!! theorem "命题"
    定义在有限长度的 $R-$模上的 $l(M)$ 是加性函数。即对任意正合列 $0\rightarrow M'\overset{f}{\rightarrow}M\overset{g}{\rightarrow}M''\rightarrow 0$ 我们有 $l(M)=l(M')+l(M'')$。

??? proof "证明"
    对任意 $M'$ 的合成列，$M'=M'_0\supset M'_1\supset \cdots \supset M'_m=0$，任意 $M''$ 的合成列，$M''=M''_0\supset M''_1\supset \cdots \supset M''_n=0$，我们有

    $$
    M=g^{-1}(M'')\supset g^{-1}(M''_1)\supset \cdots\supset g^{-1}(M''_n)=f(M')\supset f(M'_1)\supset \cdots\supset f(M'_m)=0
    $$

    是 $M$ 的长度为 $m+n$ 的合成列。

!!! theorem "推论"
    若环 $R$ 满足 $(0)=\mathfrak{m}_1\cdots \mathfrak{m}_n$，其中 $\mathfrak{m}_i$ 是极大理想，则 $R$ 是 Noether 的当且仅当 $R$ 是 Artin 的。

??? proof "证明"
    由于 $0\rightarrow \mathfrak{m}_1\rightarrow R\rightarrow R/\mathfrak{m}_1\rightarrow 0$ 是正合列，$R$ 是 Noether 的当且仅当 $\mathfrak{m}_1$ 和 $R/\mathfrak{m}_1$  是 Noether 的，且 $R/\mathfrak{m}_1$ 在 $R$ 上是 Noether 的当且仅当它在 $R/\mathfrak{m}_1$ 上是 Noether 的。类似的 $\mathfrak{m}_1$ 是 Noether 的当且仅当 $\mathfrak{m}_1/\mathfrak{m}_1\mathfrak{m}_2$ 在 $R/\mathfrak{m}_2$ 上是 Noether 的且 $\mathfrak{m}_1\mathfrak{m}_2$ 在 $R$ 上是 Noether 的。继续这样下去我们有 $R$ 是 Noether 的当且仅当对任意 $i$，$\mathfrak{m}_1\cdots\mathfrak{m}_{i-1}/\mathfrak{m}_1\cdots\mathfrak{m}_i$ 在 $R/\mathfrak{m}_i$ 上是 Noether 的。对 Artin 的讨论可以得到类似的结果。而由于 $R/\mathfrak{m}_i$ 是域，故我们可以将 Noether 替换成 Artin，便完成了证明。

## 1. 诺特环 { #s1 }

!!! theorem "命题"
    $R$ 是 Noether 环。

    - 同态 $f:R\rightarrow R'$，$R'$ 是有限生成 $R-$模，则 $R'$ 是 Noether 的。特别的，若 $f$ 是满射，则 $R'$ 是 Noether 的；
    - $S\subset R$ 是乘性子集，则 $S^{-1}R$ 是 Noether 的。特别的 $R_\mathfrak{p}$ 是 Noether 的。

??? proof "证明"
    $(1)$ $f(R)\cong R/\ker f$ 是 Noether 的。$R'$ 是有限生成 $f(R)-$模，故是 Noether $f(R)-$模。因此 $R'$ 是 Noether 的。

    $(2)$ 注意到 $S^{-1}R$ 中的理想均为扩张的，故升链条件显然成立。

!!! example "例"
    数域所包含的全体代数整数形成的环是诺特环。

!!! theorem "定理（Hilbert basis theorem）"
    若 $R$ 是 Noether 的，则 $R[x]$ 是 Noether 的。

??? proof "证明"
    由于 $R\left\lbrack  { {X}_{1},\ldots ,{X}_{n + 1}}\right\rbrack   \simeq  R\left\lbrack  { {X}_{1},\ldots ,{X}_{n}}\right\rbrack  \left\lbrack  {X}_{n + 1}\right\rbrack$，断言化约到 $n = 1$ 亦即环 $R\left\lbrack  X\right\rbrack$  的情形。给定理想 $\mathfrak{a} \subset  R\left\lbrack  X\right\rbrack$，我们将指出如何递归地构造一列元素 ${f}_{1},\ldots ,{f}_{m} \in  \mathfrak{a}$ 使之 生成 $\mathfrak{a}$ 进而导出 $R\left\lbrack  X\right\rbrack$ 为 Noether 环。

    对任意 $f = \mathop{\sum }\limits_{ {k = 0}}^{n}{a}_{k}{X}^{k} \in  R\left\lbrack  X\right\rbrack  ,{a}_{n} \neq  0$，定义其领导系数为

    $$
    \operatorname{in}\left( f\right)  \mathrel{\text{:=}} {a}_{n}.
    $$

    取 ${f}_{1} \in  \mathfrak{a} \setminus  \{ 0\}$ 使得 $\deg {f}_{1}$ 最小。今假设已选取 ${f}_{1},\ldots ,{f}_{k} \in  \mathfrak{a}$，倘若 $\mathfrak{a} = \left\langle  { {f}_{1},\ldots ,{f}_{k}}\right\rangle$  则构造终止，否则选择 ${f}_{k + 1} \in  \mathfrak{a}$ 使得 (i) ${f}_{k + 1} \in  \mathfrak{a} \setminus  \left\langle  { {f}_{1},\ldots ,{f}_{k}}\right\rangle$；(ii) 在前述条件下  $\deg {f}_{k + 1}$ 取最小可能的值. 置 ${\alpha }_{i} \mathrel{\text{:=}} \operatorname{in}\left( {f}_{i}\right)$。由 $R$ 的升链条件，理想 $\left\langle  { {\alpha }_{1},\ldots }\right\rangle$ 有一族生成元 ${\alpha }_{1},\ldots ,{\alpha }_{m}$。倘若上述构造可以走到第 $m + 1$ 步，则有

    $$
    \operatorname{in}\left( {f}_{m + 1}\right)  = \mathop{\sum }\limits_{ {i = 1}}^{m}{u}_{i}{\alpha }_{i},\;{u}_{1},\ldots ,{u}_{m} \in  R.
    $$

    根据前 $m$ 步的选取，对 $i = 1,\ldots ,m$ 皆有 ${d}_{i} \mathrel{\text{:=}} \deg {f}_{m + 1} - \deg {f}_{i} \geq  0$。显见

    $$
    {f}_{m + 1} - \mathop{\sum }\limits_{ {i = 1}}^{m}{u}_{i}{f}_{i}{X}^{ {d}_{i}}\; \in  \mathfrak{a} \setminus  \left\langle  { {f}_{1},\ldots ,{f}_{m}}\right\rangle
    $$

    的次数严格小于 $\deg {f}_{m + 1}$ ,此与 ${f}_{m + 1}$ 的选取矛盾。

**注：**反复使用该定理我们有 $R[x_1,\cdots,x_n]$ 是 Noether 的。对任意有限生成 $R-$代数 $R'$，存在满射 $R[x_1,\cdots,x_n]\rightarrow R'$，故 $R'$ 也是 Noether 的。

!!! theorem "命题"
    $R\subset R'\subset R''$，$R$ 是 Noether 的，$R''$ 是有限生成 $R-$代数，也是有限生成 $R'-$模，则 $R'$ 是有限生成 $R-$代数。

??? proof "证明"
    我们来构造这样的 $R_0$：$R\subset R_0\subset R'\subset R''$ 使得 $R''$ 是有限生成 $R_0-$模，$R_0$ 是有限生成 $R-$代数。这样由 Hilbert 基定理就有 $R_0$ 是 Noether 的，故 $R''$ 是 Noether $R_0-$模，因此 $R'$ 是有限生成 $R_0-$模。由于 $R_0$ 是有限生成 $R-$代数，$R'$ 也是有限生成 $R-$代数。

    我们这样来构造 $R_0$：设 $R''$ 作为 $R-$代数由 $x_1,\cdots,x_m$ 生成，作为 $R-$模由 $y_1,\cdots,y_n$ 生成，则我们有

    $$
    x_i=\sum_{j=1}^n a_{ij}y_j,a_{ij}\in R';y_iy_j=\sum_{k=1}^n a_{ijk}y_k,a_{ijk}\in R'
    $$

    令 $R_0=R[a_{ij},a_{ijk}]$，这是一个有限生成 $R-$代数。对任意 $m\in R''$ 我们可以将它写成 $y_i$ 的系数在 $R_0$ 中的多项式，且由上关系可以将其写成 $y_i$ 的线性表达式，即 $R''$ 是有限生成 $R_0-$模。

!!! theorem "推论（First part of Hilbert's Nullstellensatz）"
    $k$ 是域，$R$ 是有限生成 $k-$代数。若 $R$ 是域，则也是 $k$ 的有限扩张。

??? proof "证明"
    设 $R$ 作为 $k-$代数由 $a_1,\cdots,a_n$ 生成，若 $R$ 不是有限生成的，我们可以找到 $a_1,\cdots,a_r$ 在 $k$ 上是代数不相关的，$a_{r+1},\cdots,a_n$ 在 $R'=k(a_1,\cdots,a_r)\cong k(x_1,\cdots,x_r)$ 是代数的。则 $R$ 是 $R'$ 的有限扩张。由于 $R$ 是有限生成 $R,k-$模，由上命题我们有 $R'$ 在 $k$ 上是有限生成的。

    设 $R'$ 由 $\frac{f_1}{g_1},\cdots,\frac{f_m}{g_m}$ 生成，其中 $(f_i,g_i)=1$，令 $h\in k[x_1,\cdots,x_r]$，满足 $(h,g_1,g_2,\cdots,g_m)=1$，则 $\frac{1}{h}$ 不在 $k[\frac{f_1}{g_1},\cdots,\frac{f_m}{g_m}]$ 中，矛盾！

## 2. 准素分解 { #s2 }

!!! definition "定义"
    $R$ 是环，理想 $\mathfrak{q}$ 称为**准素的(primary)**，若 $\mathfrak{q}\neq (1)$ 且若 $xy\in \mathfrak{q}$，则 $x\in \mathfrak{q}$ 或 $y^n \in \mathfrak{q}$ 对某个 $n>0$。等价的定义是 $R/\mathfrak{q}\neq 0$ 且其中零因子均幂零。

!!! example "例"
    在 $\mathbb{Z}$ 中，$(0),(p^n)$ 是准素的。

    在 $k[x,y]$ 中，$(x^2,y)$ 是准素的，这是因为 $k[x,y]/(x^2,y)\cong k[x]/(x^2)$ 且 $(x^2)$ 在 $k[x]$ 中是准素的。

!!! theorem "命题"
    设 $\mathfrak{q}$ 是准素的，则 $r(\mathfrak{q})$ 是包含 $\mathfrak{q}$ 的极小素理想。

??? proof "证明"
    Check directly by definition.

若 $r(\mathfrak{q})=\mathfrak{p}$，则称 $\mathfrak{q}$ 是 $\mathfrak{p}-$准素的。

!!! example "例"
    $(x,y^2)\subset k[x,y]$，$r(x,y^2)=(x,y)$。

!!! example "例"
    考虑 $R=k[x,y,z]/(xy-z^2)$，$\mathfrak{p}=(\bar{x},\bar{z})$，$r(\mathfrak{p}^2)=\mathfrak{p}$，但 $\mathfrak{p}^2$ 不是准素的，因为 $\bar{x}\bar{y}=\bar{z}^2$，但 $\bar{x}\neq \mathfrak{p}^2$，$\bar{y}\neq r(\mathfrak{p})=\mathfrak{p}$。

!!! theorem "命题"
    若 $r(\mathfrak{q})$ 是极大的，则 $\mathfrak{q}$ 是准素的。特别的，对任意极大理想 $\mathfrak{m}$，$\mathfrak{m}^n$ 是准素的。

??? proof "证明"
    $R/\mathfrak{q}$ 的幂零根是极大的，故 $R/\mathfrak{q}$ 有唯一的素理想，因此任意 $R/\mathfrak{q}$ 中的元素要么是单位的，要么是幂零的。

!!! definition "定义"
    $I$ 的一个**准素分解(primary decomposition)**为 $I=\bigcap_{i=1}^n \mathfrak{q}_i$，其中 $\mathfrak{q}_i$ 是准素的，此时 $I$ 称作**可分解的(decomposible)**。这样的分解称为极小的，若对任意 $i\neq j$，$r(\mathfrak{q}_i)\neq r(\mathfrak{q}_j)$ 且 $\bigcap_{k\neq i}\mathfrak{q}_k$ 不包含于 $\mathfrak{q}_i$。

!!! theorem "引理"
    若 $\mathfrak{q}_1,\mathfrak{q}_2$ 是 $\mathfrak{q}-$准素的，则 $\mathfrak{q}_1\cap \mathfrak{q}_2$ 是 $\mathfrak{p}-$准素的。

??? proof "证明"
    首先 $r(\mathfrak{q}_1\cap \mathfrak{q}_2)=r(\mathfrak{q}_1)\cap r(\mathfrak{q}_2)$。若 $xy\in \mathfrak{q}_1\cap \mathfrak{q}_2$，$x\notin \mathfrak{q}_1\cap \mathfrak{q}_2$，不妨 $x\notin \mathfrak{q}_1$，则 $y\in r(\mathfrak{q}_1)=r(\mathfrak{q}_1\cap \mathfrak{q}_2)$，即 $\mathfrak{q}_1\cap \mathfrak{q}_2$ 是准素的。

由该引理我们知道准素分解总能化简为极小分解，然而下面给出的例子表明极小分解并不唯一。

!!! example "例"
    $R=k[x,y]$，$I=(x^2,xy)=(x)\cap (x,y)^2=(x)\cap (x^2,y)$。

!!! theorem "定理"
    $I$ 是可分解的理想，$I=\bigcap_{i=1}^n\mathfrak{q}_i$ 是一个极小分解，设 $\mathfrak{p}_i=r(\mathfrak{q}_i)$，则

    $$
    \left\{\mathfrak{p}_i\right\}=\left\{prime\ r(I:x)\Big| x\in R\right\}
    $$

    由 $I$ 唯一确定。

??? proof "证明"
    首先我们有 $r(I:x)=r(\bigcap_{i=1}^n\mathfrak{q}_i:x)=\bigcap_{i=1}^nr(\mathfrak{q}_i:x)$，为了计算 $r(\mathfrak{q}_i:x)$，我们需要如下引理：

    !!! theorem "引理"
        $\mathfrak{q}$ 是 $\mathfrak{p}-$准素理想，则

        - 若 $x\in \mathfrak{q}$，则 $(\mathfrak{q}:x)=(1)$；
        - 若 $x\notin \mathfrak{q}$，则 $(\mathfrak{q}:x)$ 是 $\mathfrak{p}-$准素的；
        - 若 $x\notin \mathfrak{p}$，则 $(\mathfrak{q}:x)=\mathfrak{q}$。

    ??? proof "证明"
        $(1)$ 和 $(3)$ 是显然的。对于 $(2)$，$y\in (\mathfrak{q}:x)\Longrightarrow xy\in \mathfrak{q}\Longrightarrow y\in r(\mathfrak{q})=\mathfrak{p}$，由于 $\mathfrak{q}\subset (\mathfrak{q}:x)$，故只能 $r(\mathfrak{q}:x)=\mathfrak{p}$。若 $yz\in (\mathfrak{q}:x),y\notin (\mathfrak{q}:x)$，则 $xyz\in \mathfrak{q},xy\notin \mathfrak{q}$，故 $z\in r(\mathfrak{q})=r(\mathfrak{q}:x)$，即 $(\mathfrak{q}:x)$ 是准素的。

    由引理，$r(\mathfrak{q}:x)=\begin{cases} R,&x\in \mathfrak{q}_i;\\ \mathfrak{p}_i,&x\notin \mathfrak{q}_i. \end{cases}$ 故 $\bigcap_{i=1}^n r(\mathfrak{q}_i:x)=\bigcap_{x\notin \mathfrak{q}_i} \mathfrak{p}_i$。

    一方面由于这个分解是极小的，我们可以找到 $x,x\notin \mathfrak{q}_i$，$x\in \bigcap_{j\neq i} \mathfrak{q}_j$，则 $(I:x)=\mathfrak{p}_i$。另一方面当 $r(I:x)$ 是素的，若 $r(I:x)\neq \mathfrak{p}_i$，我们可以取出 $y_i\notin r(I:x),y_i\in \mathfrak{p}_i$，则 $\prod y_i\in \bigcap \mathfrak{p}_i$，但因为 $r(I:x)$ 是素的，$\prod y_i\notin r(I:x)$，矛盾！

上面的 $\mathfrak{p}_i$ 称作**与 $I$ 相伴的(associated)**，$\left\{\mathfrak{p}_i\right\}$ 中的最小元称作 $I$ 的**伴随素理想(isolated prime ideals)**。

!!! example "例"
    $I$ 是准素的当且仅当只有一个伴随素理想。

!!! theorem "命题"
    设 $I$ 为可分解理想，则对任意素理想 $\mathfrak{p}\supset I$，$\mathfrak{p}$ 包含一个伴随素理想。

??? proof "证明"
    设 $\mathfrak{p}\supset I=\bigcap_{i=1}^n \mathfrak{q}_i$ 是一个极小分解，$r(\mathfrak{q}_i)=\mathfrak{p}_i$，则 $\mathfrak{p}=r(\mathfrak{p})\supset r(\bigcap_{i=1}^n \mathfrak{q}_i)\supset \bigcap_{i=1}^n r(\mathfrak{q}_i)=\bigcap_{i=1}^n \mathfrak{p}_i$，故 $\mathfrak{p}\supset \mathfrak{p}_i$，对某个 $i$。

!!! theorem "命题"
    设 $I=\bigcap_{i=1}^n \mathfrak{q}_i$ 是一个极小准素分解，则 $\left\{\mathfrak{q}_i\Big| r(\mathfrak{q}_i\text{是极小的})\right\}$ 唯一确定。

??? proof "证明"
    详见 Atiyah。

现在我们来看 Noether 环的准素分解。

!!! definition "定义"
    理想 $I$ 称为**不可约的(irreducible)**，若 $I=I_1\cap I_2$，则 $I=I_1$ 或 $I=I_2$。

!!! example "例"
    $I$ 是不可约的当且仅当 $(0)$ 在 $R/I$ 中不可约，任意素理想都是不可约的。

!!! theorem "命题"
    对 Noether 环 $R$：

    - 任意理想是有限个不可约理想的交；
    - 任意不可约理想是准素理想；
    - 任意理想有准素分解。

??? proof "证明"
    $(1)$：设 $\Sigma=\left\{\text{不是有限个不可约理想的交}\right\}$，由 Noether 环的性质对每个升链都有上界，故由 Zorn 引理存在 $\Sigma$ 的极大元 $I$。由于 $I$ 是可约的，$I=I_1\cap I_2,I_1,I_2\notin \Sigma$，这是一个矛盾！

    $(2)$：考虑商环，需要证明 $(0)$ 是不可约的。若 $xy=0,y\neq 0$，我们有升链

    $$
    \mathrm{Ann}(x)\subset \mathrm{Ann}(x^2)\subset \cdots
    $$

    由 Noether 环的性质知存在 $n$，$\mathrm{Ann}(x^n)=\mathrm{Ann}(x^{n+1})=\cdots$。

    对于 $a\in (x^n)\cap (y)$，设 $a=x^nb=cy$，则 $ax=cxy=0=x^{n+1}b$，故 $b\in \mathrm{Ann}(x^{n+1})=\mathrm{Ann}(x^n)$，即 $a=0$。由于 $y\neq 0,x^n=0$，$(x^n)\cap (y)=(0)$。

    $(3)$ 由 $(1)$ 和 $(2)$ 直接推出。

!!! theorem "命题"
    $R$ 是 Noether 环，$I$ 是 $R$ 的理想，则 $I$ 包含一个 $r(I)$ 的幂。特别的，$R$ 的幂零根是幂零的。

??? proof "证明"
    设 $r(I)$ 由 $x_1,\cdots,x_n$ 生成，其中 $x_i^{k_i}\in I$。令 $k=\sum_{i=1}^n (k_i-1)+1$，则 $r(I)^k\in I$。

!!! theorem "推论"
    $R$ 是 Noether 环，$\mathfrak{m}$ 是 $A$ 的极大理想，则下述命题等价：

    - $\mathfrak{q}$ 是 $\mathfrak{m}-$准素的；
    - $\mathfrak{m}^n\subset \mathfrak{q}\subset \mathfrak{m}$，对某个 $n>0$；
    - $r(\mathfrak{q})=\mathfrak{m}$。

??? proof "证明"
    $(1)\Longrightarrow (2)$ 由上命题即得。

    $(2)\Longrightarrow (3)$ 是因为 $\mathfrak{m}=r(\mathfrak{m}^n)\subset r(\mathfrak{q})\subset r(\mathfrak{m})=\mathfrak{m}$。

    $(3)\Longrightarrow (1)$ 由**命题 2.38**即得。

!!! theorem "命题"
    $R$ 是 Noether 环，$I\neq(1)$，则伴随素理想=$\left\{(I:x)\right\}_{x\in R}$ 的素理想。

??? proof "证明"
    我们已证明伴随素理想是 $r(I:x)$ 中的素理想。另一方面，若 $(I:x)$ 是素理想，则 $r(I:x)=(I:x)$ 是相伴的。反过来，我们需要证明任意相伴的素理想 $\mathfrak{p}$ 对应的 $\mathfrak{q}$ 形如 $(I:y)$，其中 $y\in R$。

    回忆对极小分解，$\mathfrak{p}=r(I:x)=\bigcap r(\mathfrak{q}_i:x)=\bigcap_{x\notin \mathfrak{q}_i} r(\mathfrak{q}_i)$。对任意 $x\notin I$，$x\in \bigcap_{\mathfrak{q}_i\neq \mathfrak{q}} \mathfrak{q}_i=I'$，则 $r(I:x)=\mathfrak{p}$。由**命题 2.42**知，存在 $n$，$\mathfrak{p}^n\subset \mathfrak{q}$。则 $I'\mathfrak{p}^n\subset I'\cap \mathfrak{q}=0$ 取这样最小的 $n$，则存在 $0\neq y\in I'\mathfrak{p}^{n-1},y\mathfrak{p}=0$，即 $(I:y)\supset \mathfrak{p}$。因此 $\mathfrak{p}=(I:y)$，我们完成了证明。

## 3. Artin 环 { #s3 }

!!! theorem "命题"
    若 $R$ 是 Artin 环，则任意素理想均是极大的，即幂零根与Jacobson根相等。

??? proof "证明"
    考虑 Artin 整环 $R'=R/\mathfrak{p}$，对任意 $0\neq x\in R'$，我们有 $(x)\supset (x^2) \supset \cdots$，存在 $n$，$(x^n)=(x^{n+1})$，即存在 $y\in R'$，$x^n=x^{n+1}y$，故 $x^n(xy-1)=0$，由于

!!! definition "定义"
    环 $R$ 的 Krull 维数为素理想升链 $\mathfrak{p}_0\subsetneq \mathfrak{p}_1\subsetneq \cdots \subsetneq\mathfrak{p}_n$ 长度 $n$ 的最大值。

由上命题，若 $R$ 是 Artin 的，则 $\dim R=0$。

!!! theorem "命题"
    Artin 环只有有限个极大理想。

??? proof "证明"
    考虑 $\Sigma=\left\{ \text{极大理想的有限交}\right\}$，由 Artin 环的降链条件这个集合有极小元，记为 $I=\mathfrak{m}_1\cap \cdots \cap \mathfrak{m}_n$。则对任意其他极大理想 $\mathfrak{m}$，$\mathfrak{m}\cap I=I$，故存在 $i$，$\mathfrak{m}=\mathfrak{m}_i$，取法有限。

!!! theorem "命题"
    在 Artin 环中，幂零根是幂零的。

??? proof "证明"
    设 $\Re$ 是幂零根，由 Artin 环的升链条件存在 $n$，$\Re^n=\Re^{n+1}=\cdots$，记为 $I$，我们来证明 $I=0$。若 $I\neq 0$，设 $\Sigma=\left\{J\Big|ideal \\ J,I\cdots J\neq 0\right\}$，则 $I\in \Sigma$。由 Artin，$\Sigma$ 有极小元，记为 $I'$，对任意 $x\in I',xI\neq 0$，$(x)\subset I'$，故 $I'=(x)$。$(xI)I=xI^2=xI\neq 0$，故 $xI\in \Sigma$，这表明 $xI=(x)$。故存在 $y\in I\subset \Re$，$xy=x$。故存在 $k$，$y^k=0$，$x=xy^k=0$，矛盾！

!!! theorem "定理"
    $R$ 是 Artin 的当且仅当 $R$ 是 Noether 的且 $\dim R=0$。

??? proof "证明"
    “$\Longrightarrow$”：设 $R$ 是 Artin 的，则幂零根 $\Re=\bigcap_{i=1}^n \mathfrak{m}_i$。由上一个命题存在 $k$，$\prod_{i=1}^n  \mathfrak{m}_i^k\subset (\bigcap_{i=1}^n \mathfrak{m}_i)^k=\Re^k=0$，由**推论 2.18**知 $R$ 是 Noether 的。

    “$\Longleftarrow$”：设 $R$ 是 Noether 的，$(0)$ 有准素分解 $(0)=\cap \mathfrak{q}_i$。由于存在 $n_i$，$r(\mathfrak{q}_i)^{n_i}\subset \mathfrak{q}_i$，我们可以找到 $n$，$(0)=(\cap r(\mathfrak{q}_i))^n$。再由 $\dim R=0$ 与 $r(\mathfrak{q}_i)$ 是素的知其均为极大理想，结合**推论 2.18**知 $R$ 是 Artin 的。

上面定理说明了 Artin 环都是 Noether 环，但是 Artin 模不一定是 Noether 模。

!!! example "例"
    考虑 $G\subset \mathbb{Q}/\mathbb{Z}$ 作为 $\mathbb{Z}-$模，取素数 $p$，$G={\frac{q}{p^n}}$，其所有子模为 $(0)\subset \mathbb{Z}\subset \frac{\mathbb{Z}}{p}\subset \frac{\mathbb{Z}}{p^2}\subset \cdots$，故 $G$ 是 Noether 模但不是 Artin 模。

!!! example "例"
    设 $R$ 是 Artin 局部环，极大理想为 $\mathfrak{m}$，则 $\mathfrak{m}$ 是幂零的，故 $x\in R$ 要么是单位，要么是幂零的。

!!! example "例"
    $R$ 是 Noether 局部环，极大理想为 $\mathfrak{m}$，若存在 $n$，$\mathfrak{m}^n=\mathfrak{m}^{n+1}$，由于 Noether 环的理想均有限生成，利用 Nakayama 引理，$\mathfrak{m}^n=0$。对任意素理想 $\mathfrak{p}$，$\mathfrak{m}^n\subset \mathfrak{p}$，故 $\mathfrak{m}\subset r(\mathfrak{m}^n)\subset r(\mathfrak{p})\subset \mathfrak{p}$，即 $\mathfrak{m}=\mathfrak{p}$。因此 $\mathfrak{m}$ 是唯一的素理想，由上定理，$R$ 是 Artin 的。另外若 $R$ 不是 Artin 的，则对任意 $\mathfrak{m}$，$\mathfrak{m}^n\neq \mathfrak{m}^{n+1}$。

!!! example "例"
    维数为 $0$ 的局部环不一定是 Noether 或者 Artin 的。考虑 $R=k[x_1,x_2,\cdots]/(x_1,x_2^2,x_3^3,\cdots)$，有唯一的素理想 $\mathfrak{p}=(\bar{x}_2,\bar{x}_3,\cdots)$，但 $(\bar{x}_1)\subset (\bar{x}_1,\bar{x}_2)\subset \cdots$ 不是稳定的。

!!! theorem "定理（Artin 环的结构定理）"
    任意 Artin 环 $R$ 是有限个 Artin 局部环的直积，此直积在同构意义下是唯一的。

为了证明这个定理，我们需要介绍如下定义：

!!! definition "定义"
    环 $R$ 的两个理想 $I_1,I_2$ 称为**互素的(coprime)**，若 $I_1+I_2=(1)$。

!!! theorem "引理"
    设 $I_1,\cdots,I_n \subset R$ 是理想，我们有自然同态 $\phi:R\rightarrow \prod R/I_i$，则：

    - 若对任意 $i\neq j$，$I_i$ 与 $I_j$ 互素，则 $\cap I_i=\prod I_i$；
    - $\phi$ 是满射当且仅当对任意 $i\neq j$，$I_i$ 与 $I_j$ 互素；
    - $\phi$ 是单射当且仅当 $\cap I_i=(0)$。

??? proof "证明"
    $(1)$：设结论对 $n-1$ 成立，即 $I=\cap_{i=2}^n I_i=\prod_{i=2}^n I_i$。我们来证明 $I_1$ 与 $I$ 互素。事实上对任意 $2\le i\le n$，我们可以找到 $a_i\in I_1,b_i\in I_i,a_i+b_i=1$。故 $I\ni \prod b_i=\prod(1-a_i)\in 1+I_1$，故 $1\in I+I_1$。于是我们只需证明 $n=2$ 的情形。事实上，我们有

    $$
    I_1\cdot I_2\subset I_1\cap I_2=(I_1\cap I_2)(I_1+I_2)=(I_1\cap I_2)I_1+(I_1\cap I_2)I_2\subset I_1\cdot I_2
    $$

    故 $I_1\cap I_2=I_1\cdot I_2$。

    $(2)$：“$\Longrightarrow$”：$R\rightarrow R/I_1\times R/I_2$ 是满射，故存在 $a$，$a\in I_i,a\in 1+I_j$，即 $I_i+I_j=1$。

    “$\Longleftarrow$”：同 $(1)$，$I_1+\cap_{i=2}^n I_i=(1)$，故对任意 $r_1\in R/I_1$，我们可以找到 $a_1$，$\phi(a_1)=(r_1,0,\cdots,0)$。则对任意 $r=(r_1,\cdots,r_n),\phi(a_1+\cdots+a_n)=r$，故 $\phi$ 是满射。

    $(3)$：由 $\ker \phi=\cap I_i$ 显然。

??? proof "定理 2.9 的证明"
    存在性：我们有极小分解 $(0)=\mathfrak{q}_1\cap \cdots\cap \mathfrak{q}_n$，$r(\mathfrak{q}_i)\neq r(\mathfrak{q}_j)$ 是极大理想。故 $r(\mathfrak{q}_i)+r(\mathfrak{q}_j)=(1)$。则 $\mathfrak{q}_i+\mathfrak{q}_j=(1)$，故由上引理我们有同构

    $$
    R\cong \prod R/\mathfrak{q}_i
    $$

    唯一性：设 $R\cong \prod R_i$，其中 $R_i$ 是 Artin 局部环。我们有自然投影 $\pi_i:R\rightarrow R_i$。令 $I_i=\ker \pi_i$，则 $(0)=\cap I_i$。我们希望这是一个极小分解。

    首先 $r(I_i)=\pi_i^{-1}(r(0))$，其中 $r(0)$ 是 $R_i$ 唯一的极大理想，因此 $r(I_i)$ 是极大的，故 $I_i$ 是准素的。由上引理对任意 $i\neq j$，$I_i+I_j=(1)$，故 $r(I_i)+r(I_j)=(1)$，这表明 $r(I_i)\neq r(I_j)$。由于 $I_i+\cap _{j\neq i}I_j=(1)$，$\cap_{j\neq i}I_j$ 不包含于 $I_i$。

    于是 $(0)=\cap I_i$ 是极小分解，由于任意素理想是极大的，故均为极小素理想。由**命题 2.40**知唯一。

!!! theorem "命题"
    $R$ 是 Artin 局部环且不是域，则如下条件等价：

    - $R$ 是 PID；
    - 极大理想 $\mathfrak{m}$ 是主理想；
    - $\dim_{R/\mathfrak{m}} \mathfrak{m}/\mathfrak{m}^2=1$。

??? proof "证明"
    $(1)\Longrightarrow(2)\Longrightarrow(3)$ 是显然的。下假设 $(3)$ 成立。

    由**推论 2.2**知 $\mathfrak{m}$ 是主理想，设为 $(x)$。由**命题 2.46**知存在 $r$，$I\subset \mathfrak{m}^r$ 但不被包含于 $\mathfrak{m}^{r+1}$，故存在 $y\in I,y=ax^r,a\notin \mathfrak{m}$。则 $a$ 是 $R$ 中的单位，故 $(x^r)\subset I$，即 $I=(x^r)$ 是主理想。

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/algebra-2h-notes.pdf){ .md-button download="algebra-2h-notes.pdf" }
