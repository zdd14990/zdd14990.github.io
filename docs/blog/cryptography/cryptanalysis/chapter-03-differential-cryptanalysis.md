---
title: 第三章：分组密码的差分分析及相关分析方法
date: 2026-07-24
description: 密码分析学笔记第三章：差分分析的原理与攻击模型、CipherFour 的差分路线与密钥恢复、信噪比与成功率、截断差分、飞去来器与矩形攻击、不可能差分、相关密钥差分。
hide:
  - navigation
categories:
  - 密码学
  - 密码分析
---

# 第三章：分组密码的差分分析及相关分析方法 { #top }

差分分析利用满足特定输入差分 $\Delta X$ 的明文对，经过若干轮加密后输出差分 $\Delta Y$ 分布的不均匀性来构造区分器，进而恢复密钥。本章的几种方法都是这个思路的变形：截断差分把单个差分值放宽为集合；飞去来器与矩形攻击把两条短轮数的高概率差分“错位”拼接起来；不可能差分则反其道而行之，利用概率为 $0$ 的差分。最后讨论相关密钥差分。

实际使用的分组密码大多是迭代密码，即反复调用同一个轮函数 $F$：

$$
P\xrightarrow{F(\cdot,K_0)}\cdot\xrightarrow{F(\cdot,K_1)}\cdots\xrightarrow{F(\cdot,K_{r-1})}C,
$$

因此寻找区分器也从 $F$ 内部各部件的不随机性质入手。全章的例子都基于 CipherFour，其 S 盒、比特置换与轮结构见[算法附录](<appendix-algorithms.md#cipherfour>)。

## 1. 差分分析 { #s1 }

差分分析由 Biham 和 Shamir 于 1990 年在美密会 (CRYPTO) 上公开提出。事实上 NSA 在 1970 年代设计 DES 时就已经考虑了如何抵抗差分分析。如今它是衡量分组密码安全性的基本指标，也用于杂凑函数和流密码的分析。

### 1.1 差分分析原理 { #s1-1 }

先看一个最简单的“加密” $C=P\oplus K$。对同一密钥下的一对明文 $(P,P')$，

$$
C\oplus C'=(P\oplus K)\oplus(P'\oplus K)=P\oplus P'.
$$

密钥在异或中被抵消了！于是我们不必知道密钥，就能从明文对的异或值直接得到密文对的异或值。差分分析正是把这一现象推广到整个密码。

!!! definition "定义（差分值）"
    设 $X,X'$ 是两个长度为 $n$ 的比特串，称 $\Delta X=X\oplus X'$ 为 $X$ 与 $X'$ 的**差分值**。

!!! note "注"
    差分的定义并不唯一，取决于密钥以何种运算介入。分组密码中密钥多以异或介入，故多用异或差分；若密钥以模加介入，即 $Y=X+K\pmod{2^n}$，则用模减差分

    $$
    \Delta Y=Y'-Y=(X'+K)-(X+K)=X'-X\pmod{2^n}
    $$

    同样能消去密钥。例如 $X'=1001\mathrm B$，$X=0011\mathrm B$ 时，$X\oplus X'=1010\mathrm B$，而 $X'-X=0110\mathrm B$。

!!! definition "定义（$i$ 轮差分）"
    设 $\beta_0,\beta_i\in\{0,1\}^n$。若输入对 $(X,X')$ 满足 $\Delta X=\beta_0$，经过 $i$ 轮加密后输出对 $(Y,Y')$ 满足 $\Delta Y=\beta_i$，则称 $\beta_0\xrightarrow{i\text{ 轮}}\beta_i$ 为一个 **$i$ 轮差分 ($i$-round differential)**。解密方向可类似定义。

由于非线性部件的存在，$i$ 轮差分一般不会以概率 $1$ 出现，因此我们关心的是它的概率。

!!! definition "定义（$i$ 轮差分概率）"
    设输入 $X$ 以及轮密钥 $K_1,\cdots,K_i$ 相互独立且均匀分布。满足 $\Delta X=\beta_0$ 的输入对经过 $i$ 轮后满足 $\Delta Y=\beta_i$ 的概率，称为 $i$ 轮差分的概率，记为 $\mathrm{DP}(\beta_0\xrightarrow{i\text{ 轮}}\beta_i)$。

    把“$i$ 轮运算”换成轮函数 $F$ 或若干连续部件的复合，就得到相应部件的差分与差分概率。

对理想分组密码，即随机置换，固定输入差分 $\alpha$ 后，输出差分 $\beta$ 在 $2^n$ 种取值上（近似）均匀分布，即 $\mathrm{DP}(\alpha\to\beta)\approx 2^{-n}$。（严格地说，$\alpha\ne0$ 时 $\beta=0$ 不可能出现，非零 $\beta$ 的概率是 $1/(2^n-1)$。）所以构造差分区分器的关键就是找到

$$
\mathrm{DP}(\alpha\xrightarrow{i\text{ 轮}}\beta)>2^{-n}
$$

的高概率差分。

!!! theorem "命题（差分分析的基本原理）"
    差分分析是**选择明文攻击**。

    1. 研究满足输入差分 $\alpha$ 的明文对经过若干轮后输出差分 $\beta$ 的不均匀性，建立 $i$ 轮区分器；
    2. 在区分器头部或尾部添加若干轮，确定与头尾差分相关的密钥比特，即待恢复的密钥集合 $\widetilde K$；
    3. 利用明文对、密文对与 $(\alpha,\beta)$ 建立关于 $\widetilde K$ 的方程或约束，分割密钥空间。

在区分器尾部添加 $r-i$ 轮时，对正确的 $\widetilde K$，由 $(C_r,C_r')$ 部分解密得到的 $(C_i,C_i')$ 满足 $C_i\oplus C_i'=\beta$ 的概率接近 $\mathrm{DP}(\alpha\to\beta)$；而对错误的 $\widetilde K$，解密出的 $(C_i,C_i')$ 可以看作随机的，$\Pr(C_i\oplus C_i'=\beta)\approx2^{-n}$。由此得到一般的攻击模型。

!!! theorem "命题（差分分析的攻击模型）"
    设 $\mathrm{DP}(\alpha,\beta)=p>2^{-n}$，$|\widetilde K|=2^k$。对 $\widetilde K$ 的每个可能取值设置一个计数器，初始化为 $0$。

    1. **采样**：选择约 $m\approx c/p$ 对满足输入差分 $\alpha$ 的明文，获得相应密文，$c$ 为常数；
    2. **去噪**：根据 $\beta$ 对密文对作初步过滤；
    3. **恢复密钥**：对每个保留下来的密文对，建立关于 $\widetilde K$ 的方程，将每个解对应的计数器 $+1$。全部处理完后按计数从大到小排序，取前 $2^{k-a}$ 个作为候选，再穷举确定正确密钥。

这样求出的通常只是部分密钥比特，但已经分割了密钥空间：剩下的比特可以换一个区分器继续求，或者直接穷举，再借助密钥编排恢复主密钥。只要总复杂度低于穷举，就算是攻破了算法。

### 1.2 各部件的差分传播 { #s1-2 }

下面以 CipherFour 为例，逐个分析差分经过 S 盒、比特置换 $P$ 和异或密钥 (AK) 的传播情况，再把它们链接起来。

!!! definition "定义（S 盒的差分传播）"
    设 $S:\mathbb F_2^m\to\mathbb F_2^n$，$\alpha\in\{0,1\}^m$，$\beta\in\{0,1\}^n$。记

    $$
    \mathrm{IN}_S(\alpha,\beta)=\{X\in\mathbb F_2^m:S(X)\oplus S(X\oplus\alpha)=\beta\},\qquad N_S(\alpha,\beta)=\#\mathrm{IN}_S(\alpha,\beta),
    $$

    则 $\alpha\xrightarrow{S}\beta$ 的差分传播概率为

    $$
    \mathrm{DP}(\alpha\xrightarrow{S}\beta)=\frac{N_S(\alpha,\beta)}{2^m}.
    $$

    以 $\alpha$ 为行标、$\beta$ 为列标、$N_S(\alpha,\beta)$ 为元素的 $2^m\times2^n$ 表称为**差分分布表 (Differential Distribution Table, DDT)**。

!!! example "例"
    CipherFour 的 S 盒为

    | $x$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | A | B | C | D | E | F |
    |---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
    | $S(x)$ | 6 | 4 | C | 5 | 0 | 7 | 2 | E | 1 | F | 3 | D | 8 | A | 9 | B |

    求 $N_S(\mathrm{0x2},\mathrm{0x2})$。

??? solution "解"
    输入只有 4 比特，穷举 16 个满足 $\alpha=\mathrm{0x2}$ 的明文对 $(\mathrm{0x0},\mathrm{0x2}),(\mathrm{0x1},\mathrm{0x3}),\cdots$ 即可。例如 $S(\mathrm{0x0})\oplus S(\mathrm{0x2})=\mathrm{0x6}\oplus\mathrm{0xC}=\mathrm{0xA}$，$S(\mathrm{0x1})\oplus S(\mathrm{0x3})=\mathrm{0x1}$。逐一验证可得 $N_S(\mathrm{0x2},\mathrm{0x2})=6$，即

    $$
    \mathrm{DP}(\mathrm{0x2}\xrightarrow{S}\mathrm{0x2})=\frac{6}{16}=\frac38>\frac1{16}.
    $$

对每个 $\alpha$ 遍历 $X$，计算 $S(X)\oplus S(X\oplus\alpha)$ 并累加，就得到完整的差分分布表：

| $\alpha\backslash\beta$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | A | B | C | D | E | F |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **0** | 16 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** | 0 | 0 | 6 | 0 | 0 | 0 | 0 | 2 | 0 | 2 | 0 | 0 | 2 | 0 | 4 | 0 |
| **2** | 0 | 6 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 2 | 0 | 0 | 0 | 0 | 0 |
| **3** | 0 | 0 | 0 | 6 | 0 | 2 | 0 | 0 | 2 | 0 | 0 | 0 | 4 | 0 | 2 | 0 |
| **4** | 0 | 0 | 0 | 2 | 0 | 2 | 4 | 0 | 0 | 2 | 2 | 2 | 0 | 0 | 2 | 0 |
| **5** | 0 | 2 | 2 | 0 | 4 | 0 | 0 | 4 | 2 | 0 | 0 | 2 | 0 | 0 | 0 | 0 |
| **6** | 0 | 0 | 2 | 0 | 4 | 0 | 0 | 2 | 2 | 0 | 2 | 2 | 2 | 0 | 0 | 0 |
| **7** | 0 | 0 | 0 | 0 | 0 | 4 | 4 | 0 | 2 | 2 | 2 | 2 | 0 | 0 | 0 | 0 |
| **8** | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 2 | 4 | 0 | 0 | 4 | 0 | 2 | 0 | 2 |
| **9** | 0 | 2 | 0 | 0 | 0 | 2 | 2 | 2 | 0 | 4 | 2 | 0 | 0 | 0 | 0 | 2 |
| **A** | 0 | 0 | 0 | 0 | 2 | 2 | 0 | 0 | 0 | 4 | 4 | 0 | 2 | 2 | 0 | 0 |
| **B** | 0 | 0 | 0 | 2 | 2 | 0 | 2 | 2 | 2 | 0 | 0 | 4 | 0 | 0 | 2 | 0 |
| **C** | 0 | 4 | 0 | 2 | 0 | 2 | 0 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 6 | 0 |
| **D** | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 2 | 0 | 0 | 0 | 0 | 6 | 2 | 0 | 4 |
| **E** | 0 | 2 | 0 | 4 | 2 | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 0 | 0 | 6 |
| **F** | 0 | 0 | 0 | 0 | 2 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 10 | 0 | 2 |

注意到：

- 对任意 S 盒，$\mathrm{DP}(0\xrightarrow{S}0)=1$，$\mathrm{DP}(0\xrightarrow{S}\beta)=0\ (\beta\ne0)$；若 S 盒是双射，还有 $\mathrm{DP}(\alpha\xrightarrow{S}0)=0\ (\alpha\ne0)$。
- 若 $N_S(\alpha,\beta)=0$，称该差分不可能，记为 $\alpha\overset{S}{\not\to}\beta$，例如 $\mathrm{0x1}\overset{S}{\not\to}\mathrm{0x1}$。
- 表中最大值为 $10$，故 CipherFour 的 S 盒最大差分传播概率为 $\mathrm{DP}(\mathrm{0xF}\xrightarrow{S}\mathrm{0xD})=10/16=5/8$。

!!! problem "习题"
    为何 S 盒差分分布表中的数都是偶数？

??? solution "解"
    若 $X\in\mathrm{IN}_S(\alpha,\beta)$，则 $X\oplus\alpha$ 也满足 $S(X\oplus\alpha)\oplus S(X)=\beta$，即 $X\oplus\alpha\in\mathrm{IN}_S(\alpha,\beta)$。$\alpha\ne0$ 时 $X\ne X\oplus\alpha$，所以 $\mathrm{IN}_S(\alpha,\beta)$ 中的元素两两配对；$\alpha=0$ 时表值为 $2^m$ 或 $0$。

再看比特置换 $P$。它只改变比特位置，是线性变换，于是

$$
P(X)\oplus P(X')=P(X\oplus X'),
$$

即输出差分就是输入差分经过 $P$ 的像。例如 $P(0000\,0000\,0000\,1101)=0001\,0001\,0000\,0001$。行移位、列混合、扩展变换等线性运算也是同理。最后，异或密钥 $(X\oplus K_i)\oplus(X'\oplus K_i)=X\oplus X'$，差分不变。总结如下：

!!! theorem "命题（差分在常见部件中的传播规则）"
    1. **线性变换差分确定**：若 $P$ 是线性变换，则 $P(X)\oplus P(X')=P(\Delta X)$。特别地，异或密钥不改变差分。
    2. **非线性变换差分不确定，概率由 DDT 决定**：若 $\Delta X=0$，则 $\mathrm{DP}(0\xrightarrow{S}0)=1$；若 $\Delta X=\alpha\ne0$，则 $\mathrm{DP}(\alpha\xrightarrow{S}\beta)=N_S(\alpha,\beta)/2^m$。

可见在轮密钥未知时，线性部件后的差分可以直接算出，而 S 盒后的差分只能以一定概率预测。所以 **S 盒输入输出差分分布的不均匀性是差分分析的基础**。

### 1.3 差分路线 { #s1-3 }

固定输入差分经过 S 盒后可能产生多种输出差分，就像一条路在 S 盒处分了岔。要精确刻画传播情况，就把每一轮的走法都记下来。

!!! definition "定义（差分路线）"
    记输入对为 $(X,X')$，第 $j$ 轮的输出对为 $(Y_j,Y_j')$，$1\le j\le i$。若 $\Delta X=\beta_0$，$\Delta Y_j=\beta_j$，则称

    $$
    \beta_0\xrightarrow{1\text{ 轮}}\beta_1\xrightarrow{1\text{ 轮}}\cdots\xrightarrow{1\text{ 轮}}\beta_i
    $$

    为一条 **$i$ 轮差分路线**，也称**差分特征 (differential trail / characteristic)**。在输入与各轮密钥相互独立且均匀分布的假设下，其概率为各轮概率之积：

    $$
    \mathrm{DP}(\beta_0\to\beta_1\to\cdots\to\beta_i)=\prod_{j=1}^{i}\mathrm{DP}(\beta_{j-1}\xrightarrow{1\text{ 轮}}\beta_j).
    $$

    所有 $i$ 轮路线中概率最大的称为 **$i$ 轮最优差分路线**（可能不止一条）。

一轮路线的概率完全由该轮的 S 盒决定，具体地说，取决于**输入差分非零的 S 盒个数**以及**这些 S 盒对应的输出差分**。输入差分非零的 S 盒称为**活跃 S 盒 (active S-box)**。

!!! example "例（1 轮最优路线）"
    设输入与轮密钥相互独立且均匀分布，求 CipherFour 的 1 轮最优差分路线。

??? solution "解"
    除平凡的 $0\to0$ 外，活跃 S 盒至少 $1$ 个。要使概率最大，应恰有 $1$ 个活跃 S 盒，且取 DDT 的最大值：

    $$
    \max\mathrm{DP}(\beta_0\xrightarrow{1\text{ 轮}}\beta_1)=\mathrm{DP}(\mathrm{0xF}\xrightarrow{S}\mathrm{0xD})=\frac58.
    $$

    活跃 S 盒可以在 4 个位置中任选，所以这样的路线共 4 条。例如活跃 S 盒在最右侧时，S 盒输出 $(0,0,0,\mathrm{D})$ 经过 $P$ 得到 $(\mathrm{0x1},\mathrm{0x1},\mathrm{0x0},\mathrm{0x1})$。

自然的想法是以 1 轮最优路线的输出为输入继续传播。输入 $(\mathrm{0x1},\mathrm{0x1},\mathrm{0x0},\mathrm{0x1})$ 有 3 个活跃 S 盒，DDT 第 1 行最大值在 $\beta=\mathrm{0x2}$，三个 $\mathrm{0x2}$ 经过 $P$ 后得到 $(0,0,\mathrm{D},0)$，概率 $(3/8)^3$。于是得到 2 轮路线

$$
(0,0,0,\mathrm{F})\xrightarrow{1\text{ 轮}}(1,1,0,1)\xrightarrow{1\text{ 轮}}(0,0,\mathrm{D},0),\qquad \mathrm{DP}=\frac58\cdot\left(\frac38\right)^3\approx0.033.
$$

这种把前一条路线的输出差分接到后一条路线的输入差分上的方式称为路线的**级联**：概率分别为 $p_i,p_j$ 的路线 $\beta_0\to\cdots\to\beta_i$ 与 $\gamma_0\to\cdots\to\gamma_j$，若 $\beta_i=\gamma_0$，则可级联为一条 $i+j$ 轮路线，概率为 $p_ip_j$。

但这条路线并不是 2 轮最优的！

!!! example "例（2 轮最优路线）"
    求 CipherFour 的 2 轮最优差分路线。

??? solution "解"
    2 轮至少有 2 个活跃 S 盒，我们先排查能否每轮恰有一个。这要求第 1 轮活跃 S 盒的输出差分只有 1 比特非零，即只能是 $1,2,4,8$。在 DDT 中这四列最大的项是 $\mathrm{0x1}\xrightarrow{S}\mathrm{0x2}$ 与 $\mathrm{0x2}\xrightarrow{S}\mathrm{0x2}$，概率均为 $3/8$。再对活跃 S 盒的位置逐一尝试，可得一条 2 轮最优路线

    $$
    (0,0,2,0)\xrightarrow{1\text{ 轮}}(0,0,2,0)\xrightarrow{1\text{ 轮}}(0,0,2,0),\qquad \mathrm{DP}=\left(\frac38\right)^2>\frac58\left(\frac38\right)^3.
    $$

    这里用到了 $P$ 的一个性质：差分 $(0,0,2,0)$ 只有第 $10$ 比特非零，而 $P(10)=10$，所以经过 $P$ 后差分不变。

!!! note "注"
    并非所有算法的 $r$ 轮路线都至少有 $r$ 个活跃 S 盒。例如 DES 存在只有 1 个活跃 S 盒的 2 轮路线，需结合算法结构具体分析。

可见 2 轮最优路线与 1 轮最优路线无关，在 1 轮最优的基础上逐轮贪心并不能得到最优路线。轮数一多，可能的走法增长极快，**长轮数最优路线的搜索是差分分析的一个难点**，这正是第九章自动化搜索要解决的问题。

上面的 2 轮路线每轮输入、输出差分相同。一般地，若路线 $\beta_0\to\cdots\to\beta_i$ 满足 $\beta_0=\beta_i$，则可将其迭代 $k$ 次得到 $ki$ 轮路线，概率为 $p^k$，称为**迭代型差分路线**。由此立即得到 4 轮路线

$$
(0,0,2,0)\xrightarrow{1\text{ 轮}}(0,0,2,0)\xrightarrow{1\text{ 轮}}(0,0,2,0)\xrightarrow{1\text{ 轮}}(0,0,2,0)\xrightarrow{1\text{ 轮}}(0,0,2,0),\qquad\mathrm{DP}=\left(\frac38\right)^4\approx0.02.\tag{1}
$$

### 1.4 差分与差分路线 { #s1-4 }

教材做了这样一个实验：随机取 20 组密钥，对每组密钥把全部 $2^{16}$ 个明文对 $(x,x\oplus(0,0,2,0))$ 输入 4 轮 CipherFour（末轮带 $P$），统计输出差分 $(0,0,2,0)$ 出现的频率；再对 20 个随机置换做同样的统计。结果是：

- 对 CipherFour，频率随密钥略有波动，但都在 $0.08$ 附近；
- 对随机置换，频率在 $2^{-16}\approx0.000015$ 附近。

这里有两个现象值得注意。第一，$0.08$ 与路线 (1) 的概率 $0.02$ 差了好几倍；第二，$0.08\gg0.000015$。

第一个现象的原因是，实验测的其实是 4 轮**差分**

$$
(0,0,2,0)\xrightarrow{4\text{ 轮}}(0,0,2,0),
$$

它只规定了起点和终点，而路线 (1) 还规定了中间每一轮的差分。从起点到终点的所有路线互不相交，所以差分概率是所有路线概率之和。

!!! definition "定义（$i$ 轮差分概率的计算）"
    设输入差分为 $\beta_0$、$i$ 轮后输出差分为 $\beta_i$ 的路线共 $s$ 条，第 $t$ 条为 $\beta_0\to\beta_1^t\to\cdots\to\beta_{i-1}^t\to\beta_i$，则

    $$
    \mathrm{DP}(\beta_0\xrightarrow{i\text{ 轮}}\beta_i)=\sum_{t=1}^{s}\prod_{j=1}^{i}\mathrm{DP}(\beta_{j-1}^t\xrightarrow{1\text{ 轮}}\beta_j^t).
    $$

因此 $i$ 轮差分的概率一般大于单条路线的概率。上面的所有计算都依赖**独立性假设**：同一轮不同活跃 S 盒、不同轮、不同路线的传播都相互独立。来学嘉等把满足这一假设的算法称为 Markov 密码。

!!! definition "定义（Markov 密码）"
    轮函数为 $Y=f(X,k)$ 的迭代密码，若当子密钥 $k$ 均匀随机选取时，对所有 $\Delta_{\mathrm{in}}\ne0$，$\Delta_{\mathrm{out}}\ne0$，

    $$
    \Pr(\Delta Y=\Delta_{\mathrm{out}}\mid\Delta X=\Delta_{\mathrm{in}},X=\gamma)
    $$

    与 $\gamma$ 无关，则称其为 **Markov 密码 (Markov cipher)**。

!!! note "注"
    在 Markov 假设下把所有路线加起来（逐轮对差分分布做转移即可），得到

    $$
    \mathrm{DP}\big((0,0,2,0)\xrightarrow{4\text{ 轮}}(0,0,2,0)\big)=0.0791\cdots,
    $$

    与实验的 $0.08$ 吻合，而单条路线 (1) 只贡献了其中的 $0.0198$。对具体算法，扩散、混淆效果和密钥编排都会影响独立性假设成立的程度，理论值与实测可能有较大偏差，仍需结合数据测试。

第二个现象说明我们找到了一个不随机事件，可以用来区分 4 轮 CipherFour 与随机置换。

!!! example "例（区分攻击）"
    设一个黑盒，给定输入能得到输出，但内部构造未知。如何判断它是 4 轮 CipherFour 还是随机置换？

??? solution "解"
    随机选取 $m$ 对满足 $P_i\oplus P_i'=(0,0,2,0)$ 的输入，得到黑盒的 $m$ 对输出。记 $T$ 为输出差分等于 $(0,0,2,0)$ 的对数，这是 $m$ 重 Bernoulli 试验：

    - 若黑盒为 4 轮 CipherFour，$T\sim B(m,0.08)$；
    - 若黑盒为随机置换，$T\sim B(m,2^{-16})$。

    于是若 $T$ 接近 $0.08m$ 就判定为 CipherFour，否则判定为随机置换。只需少量明文就能以很大概率判断正确，成功率可用假设检验计算。

### 1.5 5 轮 CipherFour 的密钥恢复攻击 { #s1-5 }

现在把 5 轮 CipherFour 看作黑盒，在 4 轮区分器尾部添加 1 轮，即“4+1”模式。设明文对满足

$$
P\oplus P'=\Delta_{\mathrm{in}}=(0,0,2,0),
$$

则 4 轮后的中间状态 $(C_4,C_4')$ 以概率约 $0.08$ 满足 $C_4\oplus C_4'=\Delta_{\mathrm{out}}=(0,0,2,0)$。探测这个中间变量的直接办法就是猜测末轮密钥 $k_5$：

- 若猜对，由 $(C,C')$ 解密出正确的 $(C_4,C_4')$，以概率约 $0.08$ 满足 $C_4\oplus C_4'=\Delta_{\mathrm{out}}$；
- 若猜错，解密出的 $(C_4,C_4')$ 可以看作随机的，满足的概率为 $2^{-16}$。

所以对 $k_5$ 的每个取值设一个计数器，处理完 $m$ 对后，正确密钥的计数（期望 $0.08m$）明显高于错误密钥（期望 $m/2^{16}$）。

!!! definition "定义（正确对与错误对）"
    对 $i$ 轮差分 $\beta_0\xrightarrow{i\text{ 轮}}\beta_i$，若一个明文对的中间结果满足 $C_k\oplus C_k'=\beta_0$ 且 $C_{k+i}\oplus C_{k+i}'=\beta_i$，即服从这个差分，则称其为**正确对 (right pair)**，否则称为**错误对 (wrong pair)**。（本节的“4+1”中 $k=0$，即明文。）

用正确密钥解密正确对一定满足 $C_4\oplus C_4'=\Delta_{\mathrm{out}}$，而错误对必有 $C_4\oplus C_4'\ne\Delta_{\mathrm{out}}$，它们只会给计数器带来干扰。下面按三个步骤来看。

**(1) 采样。** 随机选 $P$，令 $P'=P\oplus(0,0,2,0)$，重复 $m$ 次，获得密文。采样阶段约有 $0.08m$ 个正确对与 $0.92m$ 个错误对。我们无法在采样时直接挑出正确对，但能从密文差分推出一部分信息。

**(2) 去噪。** 把第 5 轮的密文按半字节记为 $C=(C_{5,0},C_{5,1},C_{5,2},C_{5,3})$。对正确对，末轮 S 盒层的输入差分为 $(0,0,2,0)$：输入差分为 $0$ 的 S 盒输出差分也为 $0$；输入差分为 $\mathrm{0x2}$ 的 S 盒，查 DDT 第 2 行，输出差分只能是 $\mathrm{0x1},\mathrm{0x2},\mathrm{0x9},\mathrm{0xA}$。故只保留满足

$$
\Delta C\in\{(0,0,h,0):h\in\{\mathrm{0x1},\mathrm{0x2},\mathrm{0x9},\mathrm{0xA}\}\}
$$

的密文对，其余的一定是错误对。

!!! problem "习题"
    取 5 轮 CipherFour 的 6 个轮密钥为 $\mathrm{0x5b92},\mathrm{0x064b},\mathrm{0x1e03},\mathrm{0xa55f},\mathrm{0xecbd},\mathrm{0x7ca5}$，对全部 $2^{16}$ 个满足输入差分 $(0,0,2,0)$ 的明文对测试，统计去噪后保留的对数，估计去噪后正确对的占比。

教材的测试结果是去噪后约保留 $7387$ 对。去噪前正确对占比约 $8\%$，去噪后变为

$$
\frac{2^{16}\times0.08}{7387}\approx71\%,
$$

提升非常显著。（按附录的实现跑一遍，我得到的是保留 $7216$ 对、其中正确对 $5080$ 对，占比约 $70\%$，同一量级；细小差别应来自比特编号等实现约定。）

**(3) 恢复密钥。** 由去噪条件，末轮只有第 3 个 S 盒的输入差分非零，可以只恢复它对应的 4 比特密钥 $k_{5,2}$。设去噪后剩 $\epsilon m$ 对，每对给出一个方程

$$
S^{-1}(C_{5,2}\oplus k_{5,2})\oplus S^{-1}(C_{5,2}'\oplus k_{5,2})=\mathrm{0x2}.\tag{2}
$$

对 $k_{5,2}$ 的每个可能值设计数器 $T[k_{5,2}]$，若它是方程的解则 $+1$。全部处理后排序，取前 $2^{4-a}$ 个为候选（$a$ 是控制成功率的参数）。其余 $6\times16-4=92$ 比特密钥可以用其他差分或穷举恢复。

方程 (2) 一般化为 $S(x\oplus k)\oplus S(x'\oplus k)=\beta$，其中 $x,x',\beta$ 已知。直接穷举 $k$ 需要 $2^{s+1}$ 次查表（$s$ 为 $k$ 的比特数）；更好的办法是借助 DDT：

!!! theorem "命题（借助 DDT 求解密钥）"
    记 $\alpha=x\oplus x'$，则方程 $S(x\oplus k)\oplus S(x'\oplus k)=\beta$ 的解集为

    $$
    \{x\oplus X: X\in\mathrm{IN}_S(\alpha,\beta)\}.
    $$

??? proof "证明"
    令 $X=x\oplus k$，则 $x'\oplus k=X\oplus\alpha$，方程化为 $S(X)\oplus S(X\oplus\alpha)=\beta$，即 $X\in\mathrm{IN}_S(\alpha,\beta)$，再由 $k=x\oplus X$ 即得。

### 1.6 信噪比与成功率 { #s1-6 }

直观来看，要成功率高，就要正确密钥的计数明显高于错误密钥的计数。早期的差分分析用 Biham 和 Shamir 提出的信噪比衡量这一点。

!!! definition "定义（信噪比）"
    密钥恢复阶段中，正确对的个数与计数器的平均计数之比称为**信噪比 (signal-to-noise ratio)**，记为 $S_N$。

正确对的个数就是正确密钥的计数；计数器的平均计数等于所有方程解的总数平均到 $2^k$ 个密钥上。设差分概率为 $p$，恢复的密钥长 $k$ 比特，采样 $m$ 对，去噪后剩 $\epsilon m$ 对，每个方程平均 $\eta$ 个解，则

$$
S_N=\frac{m\cdot p}{\epsilon m\cdot\eta/2^k}=\frac{p\cdot2^k}{\epsilon\cdot\eta}.
$$

Biham 和 Shamir 通过实验指出：信噪比在 $1$ 到 $2$ 之间时需要约 $20$ 到 $40$ 个正确对；信噪比较大时，三四个正确对就够了。

!!! example "例"
    求上述攻击中恢复 $k_{5,2}$ 的信噪比。

??? solution "解"
    $p=0.08$，$k=4$，$\epsilon=7387/2^{16}\approx0.113$。去噪后方程 (2) 的解数为 $N_S(\mathrm{0x2},\beta)$，$\beta\in\{\mathrm{0x1},\mathrm{0x2},\mathrm{0x9},\mathrm{0xA}\}$。设各输出差分等可能出现，查 DDT 得

    $$
    \eta=\frac{6+6+2+2}{4}=4,\qquad S_N=\frac{0.08\times2^4}{0.113\times4}\approx2.84.
    $$

    （教材此处把 $\epsilon$ 取整为 $0.11$，得到 $2.91$，后文计算成功率时用的是 $2.84$。）

更精确的公式由 Selçuk 和 Biçak 于 2002 年给出。

!!! theorem "命题（成功率）"
    设错误密钥的计数器相互独立且均匀分布，差分概率为 $p$，恢复 $k$ 比特密钥，采样 $m$ 对，信噪比 $S_N$，取前 $2^{k-a}$ 个计数器为候选，则对充分大的 $k,m$，成功率

    $$
    P_S=\Phi\left(\frac{\sqrt{pmS_N}-\Phi^{-1}(1-2^{-a})}{\sqrt{S_N+1}}\right),
    $$

    其中 $\Phi$ 为标准正态分布函数。反过来，要达到成功率 $P_S$ 需要的明文对数为

    $$
    m=\frac{\left(\sqrt{S_N+1}\,\Phi^{-1}(P_S)+\Phi^{-1}(1-2^{-a})\right)^2}{S_N}\,p^{-1}.
    $$

!!! example "例"
    恢复 $k_{5,2}$ 时选 $2^7$ 个明文对，只输出计数最大的密钥，求成功率与复杂度。

??? solution "解"
    $p=0.08$，$m=2^7$，$S_N=2.84$，$k=a=4$，代入得

    $$
    P_S=\Phi\left(\frac{\sqrt{0.08\times2^7\times2.84}-\Phi^{-1}(1-2^{-4})}{\sqrt{2.84+1}}\right)\approx97.56\%.
    $$

    复杂度如下（具体数字随实现细节略有差异）：

    - **数据**：$2^7$ 个明文对，即 $2^8$ 个选择明文。
    - **时间**：采样需 $2^8$ 次 5 轮加密；去噪需 $2^7$ 次异或；恢复密钥时剩约 $0.11\times2^7\approx14$ 对，每对借助 DDT 得 4 个候选，约 $56$ 次异或。采样占主项，总计约 $2^8$ 次 5 轮加密。
    - **存储**：若逐对处理，只需存当前一对密文；16 个计数器各占 8 比特，共 $2^7$ 比特。

## 2. 截断差分分析 { #s2 }

截断差分分析 (truncated differential cryptanalysis) 由 Knudsen 于 1994 年提出。“截断”是指把差分的一部分比特放宽为不确定，从而改变不随机事件的概率，构造新的区分器。

### 2.1 截断差分 { #s2-1 }

回顾 DDT 第 2 行：输入差分为 $\mathrm{0x2}$ 时，输出差分只能是 $\mathrm{0x1},\mathrm{0x2},\mathrm{0x9},\mathrm{0xA}$。记输出差分为 $b_0b_1b_2b_3$，则这四个值都满足 $b_1=0$。也就是说，“输入差分为 $\mathrm{0x2}$ 时输出差分第 1 位为 $0$”是概率为 $1$ 的事件！

!!! definition "定义（截断）"
    设 $m_0m_1\cdots m_{n-1}$ 是 $n$ 比特串。称 $m_0'm_1'\cdots m_{n-1}'$ 为它的**截断**，若对所有 $0\le i<n$，$m_i'=m_i$ 或 $m_i'$ 不固定（记为 ?）。

例如 $?0??$ 是 $0001\mathrm B$ 的一个截断。去掉比特串本身和全不确定这两个平凡情形，一个 $n$ 比特串共有 $2^n-2$ 种截断。

!!! definition "定义（截断差分路线与截断差分）"
    若 $\beta_0\to\beta_1\to\cdots\to\beta_i$ 是一条 $i$ 轮差分路线，$\beta_j'$ 是 $\beta_j$ 的截断，则称 $\beta_0'\to\beta_1'\to\cdots\to\beta_i'$ 为 **$i$ 轮截断差分路线**。类似地，若 $\beta_0\xrightarrow{i\text{ 轮}}\beta_i$ 是 $i$ 轮差分，则称 $\beta_0'\xrightarrow{i\text{ 轮}}\beta_i'$ 为 **$i$ 轮截断差分 (truncated differential)**。

!!! example "例"
    CipherFour 的输入差分为 $(0000,0000,0010,0000)$，求概率为 $1$ 的截断差分。

??? solution "解"
    只有第 3 个 S 盒活跃，输出差分为 $1,2,9,\mathrm A$ 之一，经过比特拉线后 1 轮输出差分只有四种：

    $$
    \begin{gathered}
    (0000,0000,0010,0000),\quad(0000,0000,0000,0010),\\
    (0010,0000,0010,0000),\quad(0010,0000,0000,0010).
    \end{gathered}
    $$

    取公共比特，得概率为 $1$ 的 1 轮截断差分路线

    $$
    (0000,0000,0010,0000)\xrightarrow{1\text{ 轮}}(00?0,0000,00?0,00?0).
    $$

    不在第 1 轮就截断，而是把四种输出分别作为第 2 轮的输入继续追踪，结合 DDT 与比特拉线得到

    $$
    \begin{aligned}
    (0000,0000,0010,0000)&\xrightarrow{1\text{ 轮}}(00?0,0000,00?0,00?0),\\
    (0000,0000,0000,0010)&\xrightarrow{1\text{ 轮}}(000?,0000,000?,000?),\\
    (0010,0000,0010,0000)&\xrightarrow{1\text{ 轮}}(?0?0,0000,?0?0,?0?0),\\
    (0010,0000,0000,0010)&\xrightarrow{1\text{ 轮}}(?00?,0000,?00?,?00?).
    \end{aligned}
    $$

    取公共比特，得概率为 $1$ 的 2 轮截断差分；再走一轮，得 3 轮截断差分：

    $$
    (0000,0000,0010,0000)\xrightarrow{2\text{ 轮}}(?0??,0000,?0??,?0??),\qquad
    (0000,0000,0010,0000)\xrightarrow{3\text{ 轮}}(?0??,?0??,?0??,?0??).
    $$

!!! note "注"
    这里用的截断差分概率都是 $1$，但实际上只要截断差分的概率与随机置换有差异，就可以用来区分和恢复密钥。

!!! theorem "命题（$i+1$ 轮截断差分攻击）"
    1. 找到一条 $i$ 轮截断差分；
    2. 选择满足截断差分头部的明文对，获得密文；
    3. 根据截断差分尾部对密文对作初步过滤；
    4. 对末轮密钥的 $k$ 比特建立方程组，每个解的计数器 $+1$，按计数排序取前 $2^{k-a}$ 个为候选，穷举确定正确密钥。

### 2.2 5 轮 CipherFour 的截断差分分析 { #s2-2 }

现在用概率为 $1$ 的 3 轮截断差分攻击 5 轮 CipherFour，采用“1+3+1”模式：区分器头部和尾部各加一轮。

**1. 采样。** 与“4+1”不同，区分器的头部差分 $(0000,0000,0010,0000)$ 是第 2 轮的输入差分，所以第 1 轮 S 盒层的输出差分必须是 $P^{-1}(0000,0000,0010,0000)=(0000,0000,0010,0000)$。输出差分为 $0$ 的 S 盒只需输入差分为 $0$；输出差分非零的第 3 个 S 盒则要借助密钥猜测来筛选。具体地说，选取由 $2^4$ 个明文构成的结构体

$$
\mathcal S=\{P_i:P_i=(t_0,t_1,i,t_3)\},\quad 0\le i\le15,
$$

其中 $t_0,t_1,t_3$ 为随机选取的 4 比特常数，于是任两个明文的差分都形如 $(0000,0000,????,0000)$。记 $P_i=P_{i,0}\Vert P_{i,1}\Vert P_{i,2}\Vert P_{i,3}$，$k_0=k_{0,0}\Vert\cdots\Vert k_{0,3}$。猜测 4 比特的 $k_{0,2}$，从结构体中选出满足

$$
S(P_{i,2}\oplus k_{0,2})\oplus S(P_{j,2}\oplus k_{0,2})=0010
$$

的明文对，记共有 $s$ 对。（对一般算法，可用 $\binom{2^4}{2}\cdot2^{-4}=7.5$ 估计 $s$；CipherFour 很小，可以直接测出来。）

**2. 去噪。** 3 轮截断差分的尾部经过末轮 S 盒后没有确定的比特，无法过滤。

**3. 恢复密钥。**

- 若 $k_{0,2}$ 猜对，选出的 $s$ 对都满足截断差分的头部，从而尾部一定为 $(?0??,?0??,?0??,?0??)$，即若 $k_5$ 也猜对，由 $(C_i,C_j)$ 解密一轮得到的差分满足尾部的对数恰为 $s$；
- 若 $k_{0,2}$ 猜错，选出的对只以小于 $1$ 的概率满足头部，即使 $k_5$ 猜对，满足尾部的对数也小于 $s$。

所以判定依据是：满足尾部的对数是否为 $s$。由于 $C_i=C_{i,0}\Vert\cdots\Vert C_{i,3}$ 的各半字节独立，可以把 $k_5=k_{5,0}\Vert\cdots\Vert k_{5,3}$ 拆成四个半字节分别求解：

$$
S^{-1}(C_{i,t}\oplus k_{5,t})\oplus S^{-1}(C_{j,t}\oplus k_{5,t})=?0??,\qquad t=0,1,2,3.
$$

对每个 $k_{0,2}$ 的猜测值，依次穷举 $k_{5,0},k_{5,1},k_{5,2},k_{5,3}$，每一段只保留 $s$ 对全部满足方程的取值，四段都通过才把 $k_{0,2}\Vert k_5$ 输出为候选。共恢复 $4+16=20$ 比特密钥，候选可以再用多个结构体进一步筛选，其余密钥用穷举或其他截断差分恢复。

!!! problem "习题"
    随机选一个 96 比特密钥，分别统计用 1、2、3 个结构体时正确恢复 20 比特密钥的次数。例如用 2 个结构体即 $32$ 个明文，重复 100 次，统计输出的 $k_{0,2}\Vert k_5$ 是正确密钥的次数。

## 3. 飞去来器攻击与矩形攻击 { #s3 }

搜索路线时，常常能找到一些轮数短但概率高的路线，却无法首尾直接相接成长路线。**飞去来器攻击 (boomerang attack)** 由 Wagner 于 1999 年提出，用“错位”的方式连接两条短路线，并破解了 COCONUT98。但它需要选择密文的能力。Kelsey 等于 2000 年提出**增强飞去来器攻击 (amplified boomerang attack)**，以增大选择明文量为代价去掉了这一要求；Biham 等于 2001 年提出**矩形攻击 (rectangle attack)**，同时利用多条短路线提高区分器概率。

### 3.1 飞去来器攻击 { #s3-1 }

把加密分为三部分

$$
C=E(P)=E_b(E_m(E_f(P))),
$$

明文 $P$ 经 $E_f$ 得中间状态 $x$，$x$ 经 $E_m$ 得 $y$，$y$ 经 $E_b$ 得密文 $C$。为简单起见，设 $E_m$ 是线性或仿射变换，记为 $A$，它不影响差分传播的概率。设有三条高概率差分：

$$
\alpha\xrightarrow{E_f}\beta\ (p_1),\qquad
\beta\xrightarrow{E_f^{-1}}\alpha\ (p_2),\qquad
\gamma\xrightarrow{E_b^{-1}}\phi\ (q).
$$

其中 $E_f$ 是加密方向，$E_f^{-1},E_b^{-1}$ 是解密方向。许多情况下，例如 SPN 结构且 S 盒为置换时，$p_1=p_2$。

所谓“错位”相连，是指中间差分 $\beta\ne\phi$ 时，一对明文满足中间差分 $\beta$，而另一对满足 $\phi$。

!!! example "例（飞去来器区分器）"
    按如下步骤得到 $(m_3,m_4)$：

    1. 选择明文对 $(m_1,m_2)$，$m_1\oplus m_2=\alpha$，得到密文 $(c_1,c_2)$；
    2. 令 $c_3=c_1\oplus\gamma$，$c_4=c_2\oplus\gamma$，选择密文得到明文 $(m_3,m_4)$。

    分别对特定算法和随机置换求 $\Pr(m_3\oplus m_4=\alpha)$。

??? solution "解"
    由 $\gamma\xrightarrow{E_b^{-1}}\phi$，密文 $c_1,c_2,c_3,c_4$ 解密得到的中间值满足 $\Pr(y_1\oplus y_3=\phi)=\Pr(y_2\oplus y_4=\phi)=q$，故

    $$
    \Pr(y_1\oplus y_2\oplus y_3\oplus y_4=0)\ge q^2.
    $$

    $A$ 仿射，所以 $\Pr(x_1\oplus x_2\oplus x_3\oplus x_4=0)\ge q^2$。又 $(x_1,x_2)$ 以概率 $p_1$ 满足 $x_1\oplus x_2=\beta$，此时 $x_3\oplus x_4=\beta$，即 $\Pr(x_3\oplus x_4=\beta)\ge p_1q^2$。再由 $\beta\xrightarrow{E_f^{-1}}\alpha$，

    $$
    \Pr(m_3\oplus m_4=\alpha)\ge p_1p_2q^2.
    $$

    而对随机置换，这一概率为 $2^{-n}$。

所以当 $p_1p_2q^2>2^{-n}$ 时，可以构造飞去来器区分器；$p_1=p_2=p$ 时，条件化为 $pq>2^{-n/2}$。“飞去来器”这个名字很形象：差分 $\alpha$ 从明文出发，在密文端被 $\gamma$ 推回来，又回到明文端。

!!! note "注"
    要使 $y_1\oplus y_2\oplus y_3\oplus y_4=0$，只需 $y_1\oplus y_3=y_2\oplus y_4$，不必等于固定的 $\phi$；$\beta$ 同理。因此概率可以进一步增大为

    $$
    q^2=\sum_{\phi}\Pr(\gamma\xrightarrow{E_b^{-1}}\phi)^2,\qquad
    p_1p_2=\sum_{\beta}\Pr(\alpha\xrightarrow{E_f}\beta)\Pr(\beta\xrightarrow{E_f^{-1}}\alpha).
    $$

    另外，上面的计算把两条路线视为相互独立，这并不准确。为在连接处作更精确的估计，人们提出了与 DDT、LAT 类似的**飞去来器连接表 (Boomerang Connectivity Table, BCT)**；$E_m$ 也可以推广为多轮。

利用飞去来器区分器恢复密钥的原理与差分分析类似。以在尾部添加 1 轮为例：

1. 选择明文对 $(m_1,m_2)$，$m_1\oplus m_2=\alpha$，得到密文 $(c_1,c_2)$；
2. 去噪，并猜测尾部涉及的密钥 $K_2$，把 $(c_1,c_2)$ 部分解密为 $(c_1',c_2')$；
3. 异或 $\gamma$ 得到 $(c_3',c_4')$，再在 $K_2$ 下加密回 $(c_3,c_4)$；
4. 选择密文 $(c_3,c_4)$，获得明文 $(m_3,m_4)$；
5. 若 $m_3\oplus m_4=\alpha$，则 $K_2$ 的计数器 $+1$。

全部处理后按计数排序，取前 $2^{k-a}$ 个为候选。

### 3.2 增强的飞去来器攻击 { #s3-2 }

只用选择明文时，我们只能控制 $(x_1,x_2)$ 与 $(x_3,x_4)$ 的差分，$(y_1,y_3)$ 的差分不可控，最差也服从均匀分布，即以随机概率 $2^{-n}$ 取到 $\phi$。增强的飞去来器攻击就是基于这一思路的选择明文攻击，它使用两条加密方向的差分：

$$
\alpha\xrightarrow{E_f}\beta\ (p),\qquad\phi\xrightarrow{E_b}\gamma\ (q).
$$

!!! example "例（增强的飞去来器区分器）"
    选择四元组 $(m_1,m_2,m_3,m_4)$，满足 $m_1\oplus m_2=m_3\oplus m_4=\alpha$，得到密文 $(c_1,c_2,c_3,c_4)$。分别对特定算法和随机置换求 $\Pr(c_1\oplus c_3=c_2\oplus c_4=\gamma)$。

??? solution "解"
    $\Pr(x_1\oplus x_2=\beta)=\Pr(x_3\oplus x_4=\beta)=p$，故 $\Pr(x_1\oplus x_2\oplus x_3\oplus x_4=0)\ge p^2$，由 $A$ 仿射，$\Pr(y_1\oplus y_2\oplus y_3\oplus y_4=0)\ge p^2$。

    $y_1,y_3$ 以随机概率 $2^{-n}$ 满足 $y_1\oplus y_3=\phi$，此时 $y_2\oplus y_4=\phi$，故 $\Pr(y_1\oplus y_3=\phi,\ y_2\oplus y_4=\phi)\ge2^{-n}p^2$。再经过 $E_b$，

    $$
    \Pr(c_1\oplus c_3=c_2\oplus c_4=\gamma)\ge2^{-n}p^2q^2.
    $$

    对随机置换这一概率为 $2^{-2n}$。

因此当 $2^{-n}p^2q^2>2^{-2n}$，即 $pq>2^{-n/2}$ 时可以构造区分器。与飞去来器的条件一样，代价是数据量大得多。同样地，$p^2,q^2$ 可以换成对所有中间差分求和：

$$
p^2=\sum_{\beta}\Pr(\alpha\xrightarrow{E_f}\beta)^2,\qquad q^2=\sum_{\phi}\Pr(\phi\xrightarrow{E_b}\gamma)^2.
$$

### 3.3 矩形攻击 { #s3-3 }

矩形攻击也是选择明文攻击，区别是它把增强飞去来器中的 $x_1\oplus x_2\oplus x_3\oplus x_4=0$ 放宽为 $x_1\oplus x_2\oplus x_3\oplus x_4=\epsilon$，从而包含更多的差分形式。具体地说，利用

$$
\alpha\xrightarrow{E_f}\beta,\qquad\alpha\xrightarrow{E_f}\beta',\qquad\phi\xrightarrow{E_b}\gamma,\qquad\phi\oplus A(\beta\oplus\beta')\xrightarrow{E_b}\gamma,
$$

若 $x_1\oplus x_2=\beta$，$x_3\oplus x_4=\beta'$，记 $\epsilon=\beta\oplus\beta'$，则

$$
x_1\oplus x_2\oplus x_3\oplus x_4=\epsilon\iff y_1\oplus y_2\oplus y_3\oplus y_4=A(\epsilon).
$$

于是

$$
\Pr(c_1\oplus c_3=c_2\oplus c_4=\gamma)
=\sum_{\beta,\beta'}\left[\Pr(\alpha\xrightarrow{E_f}\beta)\Pr(\alpha\xrightarrow{E_f}\beta')\cdot2^{-n}\sum_{\phi}\Pr(\phi\xrightarrow{E_b}\gamma)\Pr(\phi\oplus A(\beta\oplus\beta')\xrightarrow{E_b}\gamma)\right].
$$

## 4. 不可能差分分析 { #s4 }

差分分析利用 $\mathrm{DP}>2^{-n}$ 的高概率差分。但从假设检验的角度看，概率小于随机概率同样与随机置换有区别。不可能差分分析考虑的是与高概率差分相反的极端情形：利用 $\mathrm{DP}=0$ 的差分构造区分器，再用**排除法**识别正确密钥。

不可能事件在密码分析中并不罕见，例如 Enigma 的分析就利用了明文字母不会加密为自身这一点。不可能差分由两个团队独立提出：Knudsen 发现轮函数为双射的 Feistel 结构一定存在 5 轮不可能差分，从而可以攻击 6 轮；Biham 等发现 32 轮的 Skipjack 存在 24 轮不可能差分，从而攻击了 31 轮。

### 4.1 不可能差分原理 { #s4-1 }

!!! definition "定义（$i$ 轮不可能差分）"
    设 $\beta_0,\beta_i\in\{0,1\}^n$。若对每一对满足 $\Delta X=\beta_0$ 的明文 $(X,X')$，经过 $i$ 轮后的输出对 $(Y,Y')$ 都满足 $\Delta Y\ne\beta_i$，则称 $\beta_0\overset{i\text{ 轮}}{\not\to}\beta_i$ 为一个 **$i$ 轮不可能差分 (impossible differential)**。

此时随机选 $m$ 对满足输入差分 $\beta_0$ 的明文，该密码的输出差分一定不等于 $\beta_i$，而随机置换平均有 $m/2^n$ 对的输出差分为 $\beta_i$，这就是区分器。

!!! theorem "命题（不可能差分的常见构造）"
    $i$ 轮不可能差分通常用**中间相错 (miss-in-the-middle)** 的方式构造：从输入向加密方向、从输出向解密方向各推导一条概率为 $1$ 的差分（多为截断差分），使它们在中间矛盾。按矛盾的种类，常见的有三种：

    1. **零与非零的矛盾。** 这是最常见的形式。为了以概率 $1$ 传播，把差分按非线性部件的规模分割，每段只考虑零和非零两种取值，此时非线性部件只有 $0\xrightarrow{S}0$ 与 $*\xrightarrow{S}*$ 两种可能（$*$ 表示任意非零差分）。
    2. **非零与非零的矛盾。** 加密方向以概率 $1$ 推出某处差分为 $\alpha\ne0$，解密方向推出该处为 $\beta\ne0$，且 $\alpha\ne\beta$。下面的 5 轮 Feistel 就是这一类。
    3. **其他矛盾。** 结合算法的运算特性，发现字节之间甚至多个字节之间的关系矛盾。

!!! example "例（4 轮 AES 的不可能差分）"
    考虑 4 轮 AES（末轮无列混合 MC），按字节把状态分割。从头部只有 1 个活跃字节出发，由 MC 分支数为 5，加密 2 轮后 16 个字节全部活跃；而从尾部差分沿解密方向推 2 轮，得到的差分中有 4 个字节为零。二者在中间矛盾。

    类似地，4 轮 ARIA 的不可能差分属于第三类：加密方向 2 轮后某两个字节的差分相等（都为 $\alpha$），而解密方向推出的这两处差分 $\beta\ne\gamma$。

!!! theorem "命题（不可能差分的攻击模型）"
    设找到 $r-1$ 轮不可能差分 $\beta_0\overset{(r-1)\text{ 轮}}{\not\to}\beta_{r-1}$，$|\widetilde K|=2^k$，对 $\widetilde K$ 的每个取值设一个 1 比特计数器，初始为 $0$。

    1. **采样**：选择满足输入差分 $\beta_0$ 的明文对，获得密文；
    2. **去噪**：根据 $\beta_{r-1}$ 对密文对作初步过滤；
    3. **恢复密钥**：对每对建立关于 $\widetilde K$ 的方程组，**满足方程的解一定是错误密钥**，将其计数器置 $1$。全部处理后计数器仍为 $0$ 的作为候选，必要时再穷举确定。

原因是对正确密钥，由 $(C_r,C_r')$ 解密到的 $(C_{r-1},C_{r-1}')$ 一定满足 $C_{r-1}\oplus C_{r-1}'\ne\beta_{r-1}$；而对错误密钥，解密结果是随机的，以概率 $2^{-n}$ 落在 $\beta_{r-1}$ 上。注意判定方向与差分分析正好相反：差分分析选计数最大的，不可能差分排除计数非零的。

### 4.2 Feistel 结构的不可能差分 { #s4-2 }

约定 Feistel 一轮为 $(L,R)\mapsto(R,\ L\oplus f(R,k))$，最后一轮不交换左右。

!!! theorem "命题（5 轮 Feistel 的不可能差分）"
    若 Feistel 结构的轮函数 $f$ 是双射，则对任意 $\alpha\ne0$，

    $$
    (\alpha,0)\overset{5\text{ 轮}}{\not\to}(\alpha,0).
    $$

??? proof "证明"
    加密方向：第 1 轮 $f$ 的输入差分为 $0$，输出差分以概率 $1$ 为 $0$，故 $(\Delta L_1,\Delta R_1)=(0,\alpha)$；第 2 轮 $f$ 的输入差分为 $\alpha\ne0$，$f$ 是双射，输出差分以概率 $1$ 为某个 $\beta\ne0$，故 $(\Delta L_2,\Delta R_2)=(\alpha,\beta)$。

    解密方向：输出差分为 $(\alpha,0)$ 时，类似地逐轮向上可得

    $$
    (\Delta L_4,\Delta R_4)=(\alpha,0),\quad(\Delta L_3,\Delta R_3)=(\gamma,\alpha),\quad(\Delta L_2,\Delta R_2)=(\alpha\oplus\delta,\gamma),
    $$

    其中 $\gamma\ne0$，$\delta\ne0$。于是 $\Delta L_2=\alpha\oplus\delta\ne\alpha$，与加密方向矛盾。

在此基础上可以攻击 6 轮 Feistel，同样分为采样、去噪和恢复密钥三步。设分组长度为 $b$ 比特。

**1. 采样。** 构造由 $2^{b/2}$ 个明文组成的结构体

$$
\mathcal S=\{m_i=(m_i^L,m_i^R)=(i,c)\},\quad i=0,1,\cdots,2^{b/2}-1,
$$

$c$ 为任意常数。任取 $m_i\ne m_j$，均有 $m_i\oplus m_j=(i\oplus j,0)$，正是不可能差分的头部（$\alpha$ 可以取任意非零值）。只需保证尾部差分 $(\Delta L_5,\Delta R_5)=(0,\alpha)$（注意第 6 轮前左右已交换）。

**2. 去噪。** 由 Feistel 的结构，$c^L=L_5\oplus f(R_5,k_6)$，$c^R=R_5$。若 $(\Delta L_5,\Delta R_5)=(0,\alpha)$，则

$$
\begin{cases}
c_i^R\oplus c_j^R=\alpha=m_i^L\oplus m_j^L, & (3\mathrm a)\\
f(c_i^R,k_6)\oplus f(c_j^R,k_6)=c_i^L\oplus c_j^L. & (3\mathrm b)
\end{cases}
$$

与差分分析不同，满足这组方程的 $k_6$ 会导致不可能差分出现，所以一定是错误密钥。注意到 (3a) 与密钥无关，不满足 (3a) 的明文对对应的方程组一定无解，可以先筛掉。把 (3a) 改写为

$$
c_i^R\oplus m_i^L=c_j^R\oplus m_j^L,
$$

就可以先按 $c^R\oplus m^L$ 排序，再把取值相等的两两组对。这样每个结构体约得到

$$
\binom{2^{b/2}}{2}\cdot2^{-b/2}\approx2^{b/2-1}
$$

个满足头部差分及 (3a) 的明文对。

**3. 恢复密钥。** 设 (3b) 涉及的密钥 $k_6$ 有 $k$ 比特，对每个取值设 1 比特计数器 $T[k_6]$。对每个去噪后的明文对求解 (3b)，解集中的 $T[k_6]$ 置 $1$。最后计数器为 $0$ 的作为候选。

!!! example "例"
    设 $f$ 为伪随机置换，需要多少个结构体，才能使计数器为 $0$ 的错误密钥个数的期望小于 $1$？

??? solution "解"
    方程 (3b) 有 $b/2$ 比特，$f$ 为伪随机置换，一个方程平均有 $2^k/2^{b/2}$ 个解，即任一错误密钥落在一个方程解集中的概率为 $2^{-b/2}$。处理完一个结构体的 $2^{b/2-1}$ 个方程后，一个错误密钥仍未被删除的概率为

    $$
    \left(1-2^{-b/2}\right)^{2^{b/2-1}}\approx e^{-1/2}\approx0.61.
    $$

    处理完 $s$ 个结构体后，剩余错误密钥个数的期望为 $2^k\cdot e^{-s/2}$。要使其小于 $1$，需

    $$
    s>2\ln2\cdot k\approx1.39k.
    $$

!!! note "注"
    实际攻击中，未被排除的错误密钥期望可以多于 1 个，再结合穷举进一步筛选，具体个数由总复杂度平衡决定。

以选择 $s$ 个结构体为例，复杂度如下：

- **数据**：$s\cdot2^{b/2}$ 个选择明文。
- **时间**：采样需 $s\cdot2^{b/2}$ 次 6 轮加密；去噪只需异或和排序，不超过采样阶段。恢复密钥时，与差分分析不同，已经置 $1$ 的密钥无需再代入验证。以结构体为单位，第一个结构体需穷举 $2^k$ 个密钥，之后期望剩 $2^k e^{-1/2}$ 个，依此类推：

    $$
    \left(2^k+2^ke^{-1/2}+2^ke^{-1}+\cdots+2^ke^{-(s-1)/2}\right)\cdot2^{b/2-1}\cdot2\approx2^{k+b/2+1.34}
    $$

    次一轮加密，约为 $2^{k+b/2-1.24}$ 次 6 轮加密。可见密钥恢复阶段占主项。
- **存储**：计数器占主项，约 $2^k$ 比特。

## 5. 相关密钥差分分析 { #s5 }

前面我们只假设敌手能控制明密文，用明文或密文的差分关系构造区分器。如果敌手还能查询不同密钥下的加密机，并知道（但不知道具体值）密钥之间的关系，就可以考察密钥编排对安全性的影响，这就是**相关密钥攻击 (related-key attack)**。差分、线性、积分三大方法都已推广到相关密钥场景。本节讨论密钥关系为差分时的情形，即**相关密钥差分攻击**，这是在选择密钥、选择明文场景下的攻击。

在密钥上引入差分的主要目的是与状态上的差分抵消，以获得更长的路线。例如两个明文的差分为 $\alpha$，两个主密钥的差分也为 $\alpha$，则

$$
X^1\oplus X^2=(P^1\oplus K^1)\oplus(P^2\oplus K^2)=\alpha\oplus\alpha=0,
$$

于是这一轮经过 S 盒时以概率 $1$ 传播。之后密钥差分经密钥编排传到后续轮密钥上，再转移到状态差分里，引入概率。因此相关密钥下的路线一般比单密钥下的长。Dunkelman 等在 CRYPTO 2010 上用相关密钥三明治攻击破解了 GSM 与 3G 中使用的 KASUMI。

一条 $r$ 轮相关密钥差分路线 $\alpha\xrightarrow{r\text{ 轮}}\beta$ 包含两部分：

- 算法上的差分路线 $\alpha\to\beta$，概率为 $p_1$；
- 密钥编排上的差分路线 $\{\Delta k_1,\cdots,\Delta k_r\}$，其中 $\Delta k_i=K_i^1\oplus K_i^2$ 是由主密钥 $K^1,K^2$ 生成的第 $i$ 轮子密钥之差，概率为 $p_2$。

设分组长度为 $n$，主密钥长度为 $k$。这条路线能用于攻击，必须同时满足

$$
p_1>2^{-n},\qquad p_2>2^{-k},\qquad p_1p_2>\max(2^{-n},2^{-k}).
$$

!!! theorem "命题（$r+1$ 轮相关密钥差分攻击）"
    1. 找到一条高概率的相关密钥差分路线 $\alpha\xrightarrow{r\text{ 轮}}\beta$；
    2. 设置以第 $r+1$ 轮子密钥对为索引的计数器；
    3. 对明文 $P_1,P_2,\cdots$，计算 $C_i^1=\mathrm{Enc}_{K^1}(P_i)$，$C_i^2=\mathrm{Enc}_{K^2}(P_i\oplus\alpha)$，找出所有使 $\mathrm{Dec}^{1r}_{K_{r+1}^1}(C_i^1)\oplus\mathrm{Dec}^{1r}_{K_{r+1}^2}(C_i^2)=\beta$ 的子密钥对，相应计数器 $+1$（$\mathrm{Dec}^{1r}$ 表示解密一轮）；
    4. 按计数排序，取前 $2^{k-a}$ 个为候选，穷举确定正确密钥。

!!! note "注"
    这只是相关密钥差分攻击的一种形式，所有利用相关密钥差分路线的攻击都可以视为相关密钥差分攻击。除与差分结合外，还有相关密钥不可能差分、相关密钥矩形攻击等。

参考：王美琴主编，《密码分析学》，科学出版社，2024，第 3 章。
