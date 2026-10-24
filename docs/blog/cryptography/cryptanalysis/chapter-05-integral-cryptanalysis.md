---
title: 第五章：积分分析
description: "密码分析学笔记第五章：积分与积分特性（活跃/平衡/常数）、群上的和、积分传播规则、Mini-AES 的高阶积分与 5 轮攻击、分离特性、向量化与比特级分离特性的传播规则。"
hide:
  - navigation
categories:
  - 密码学
  - 密码分析
date: 2026-07-24
---

# 第五章：积分分析 { #top }

这一章介绍对称密码中的另一种分析方法：**积分分析 (integral cryptanalysis)**。差分分析考虑两个明文之差的传播，积分分析关注的则是**多个明文之和**（即积分）在算法中的传播。从这个意义上说，积分分析与差分分析是一种耦合关系。

积分分析的雏形来自 Daemen 等对 Square 算法的安全性分析，也称 Square 攻击。随后 Knudsen 和 Wagner 对方法作了总结，首次提出积分分析的概念。2015 年 Todo 提出了**分离特性 (division property)**，使积分攻击的能力大大加强。分离特性定义在多重集上，但从传播特性来看，它与算法的代数正规型联系密切。2020 年胡凯等提出**单项式预测 (monomial prediction)**，从代数正规型中某个单项式在各组件中的传播规律来研究分离特性，得到了更直观的结果。本章先讲传统积分分析，再讲分离特性。

## 1. 积分分析基本原理 { #s1 }

设 $(G,+)$ 是 $k$ 阶有限阿贝尔群，考虑乘积群 $G^n=G\times\cdots\times G$，其中元素形如 $v=(v_1,\cdots,v_n)$，$v_i\in G$，加法逐分量进行：$u+v=w$ 当且仅当对所有 $i$，$u_i+v_i=w_i$。

!!! definition "定义（积分）"
    设 $S$ 是元素取自 $G^n$ 的多重集，称

    $$
    \int S=\sum_{v\in S}v
    $$

    为 $S$ 上的**积分**，加法是 $G^n$ 上的群运算。

!!! note "注"
    不失一般性，我们用“字节”称呼 $v_i$ 的单位。实际上，不同算法中 $v_i$ 的单位可能是字、半字节或比特。

记 $n$ 为明密文中的字节数，$m$ 为明密文数，通常 $m=k$。这里 $G=\mathrm{GF}(2^s)$ 或 $\mathbb Z/k\mathbb Z$。$S$ 是由 $m$ 个明文（或中间状态）组成的多重集。攻击者的目标是推测加密若干轮后某些字节上的非随机积分特性，进而恢复密钥。

!!! definition "定义（积分特性）"
    对 $S$ 中所有向量在第 $i$ 个字节上的积分特性，定义：

    - **活跃特性 (active) $\mathcal A$**：$\{v_i:v\in S\}=G$；
    - **平衡特性 (balance) $\mathcal B$**：$\sum_{v\in S}v_i=c'$；
    - **常数特性 (constant) $\mathcal C$**：$v_i=c$，$\forall v\in S$。

    $c,c'\in G$ 是已知且固定的常数，$c'$ 往往为零。

!!! note "注"
    有些论文分别用“平衡特性”和“零和特性 (zero-sum property)”称呼这里的活跃特性和平衡特性，读文献时要注意区分。

若 $S$ 中所有向量在某个字节上的值相同，由拉格朗日定理，该字节上的积分为 $G$ 的幺元（$k$ 个相同元素相加）。若在某个字节上的值各不相同，即取遍 $G$，积分值就是群中所有元素之和，下面两个定理给出它。

!!! theorem "定理"
    设 $(G,+)$ 是有限阿贝尔加群，$H=\{g\in G:g+g=0\}$ 为 $G$ 中 1 阶和 2 阶元素组成的子集，$s(G)=\sum_{g\in G}g$，则

    $$
    s(G)=\sum_{h\in H}h,\qquad s(G)\in H,\ \text{即}\ s(G)+s(G)=0.
    $$

??? proof "证明"
    $G\setminus H$ 中的元素 $g$ 满足 $g\ne-g$，可以与其逆元两两配对，每对之和为 $0$，所以 $s(G)=\sum_{h\in H}h$。$H$ 是子群，且每个元素都是自己的逆，所以 $s(G)+s(G)=\sum_{h\in H}(h+h)=0$。

!!! example "例"
    $G=\mathrm{GF}(2^s)$（加法为异或）时，$s(G)=0$。$G=\mathbb Z/k\mathbb Z$ 时，若 $k$ 为奇数，$s(\mathbb Z/k\mathbb Z)=0$；若 $k$ 为偶数，$s(\mathbb Z/k\mathbb Z)=k/2$。

??? solution "解"
    $\mathrm{GF}(2^s)$ 中所有元素之和的每一个比特位上都有 $2^{s-1}$ 个 $1$，$s\ge2$ 时为偶数，所以和为 $0$。（$s=1$ 时 $0+1=1$，是个例外。）

    $\mathbb Z/k\mathbb Z$ 中 $g+g=0$ 即 $2g\equiv0$，$k$ 为奇数时只有 $g=0$；$k$ 为偶数时 $H=\{0,k/2\}$，和为 $k/2$。

!!! theorem "定理"
    设 $(G,*)$ 是有限阿贝尔乘群，$H=\{g\in G:g*g=e\}$，$p(G)=\prod_{g\in G}g$，则 $p(G)=\prod_{h\in H}h$，且 $p(G)*p(G)=e$。

!!! example "例"
    $G=(\mathbb Z/p\mathbb Z)^*$，$p$ 为素数时，$H=\{1,-1\}$，故 $p(G)=-1$，这正是 Wilson 定理 $(p-1)!\equiv-1\pmod p$。

设 $S_1=\{v\}$，$S_2=\{u\}$，$S_3=\{w\}$，积分特性有以下传播规律。

!!! theorem "性质（积分的传播）"
    **加法**（$\sum_{S_3}w_i=\sum_{S_1}v_i+\sum_{S_2}u_i$）：

    - 若 $S_1$ 和 $S_2$ 在第 $i$ 个字节上都具有活跃或平衡特性，则 $S_3$ 在第 $i$ 个字节上一定是平衡的，但不一定保持活跃；
    - 若 $S_1$ 在第 $i$ 个字节上是常数，则 $S_2$ 和 $S_3$ 在第 $i$ 个字节上的积分特性相同。

    **双射函数**（$u_i=f(v_i)$）：

    - 若 $S_1$ 在第 $i$ 个字节上是活跃或常数的，则 $S_2$ 与 $S_1$ 在该字节上积分特性相同；
    - 若 $S_1$ 在第 $i$ 个字节上是平衡的，则 $S_2$ 在该字节上的积分特性不确定。

!!! example "例（Mini-AES 的 3 轮积分）"
    Mini-AES 的状态是 $2\times2$ 的半字节矩阵（见[算法附录](<appendix-algorithms.md>)），$G=\mathrm{GF}(2^4)$，加法为异或。取 $m=2^4$ 个明文，在第一个半字节上取遍 16 个值，其余三个半字节为常数，即积分 $(\mathcal A,\mathcal C,\mathcal C,\mathcal C)$。则

    $$
    \begin{bmatrix}\mathcal A&\mathcal C\\\mathcal C&\mathcal C\end{bmatrix}
    \xrightarrow{1r}
    \begin{bmatrix}\mathcal A&\mathcal C\\\mathcal A&\mathcal C\end{bmatrix}
    \xrightarrow{1r}
    \begin{bmatrix}\mathcal A&\mathcal A\\\mathcal A&\mathcal A\end{bmatrix}
    \xrightarrow{1r}
    \begin{bmatrix}\mathcal B&\mathcal B\\\mathcal B&\mathcal B\end{bmatrix}\quad(\mathcal B=0).
    $$

??? solution "说明"
    第 1 轮：NS 是双射，$\mathcal A$ 保持；SR 不动第一列；MC 把第一列的 $(\mathcal A,\mathcal C)$ 线性组合，每个输出半字节都是“非零常数乘活跃半字节再加常数”，仍是双射，所以第一列两个半字节都活跃，第二列仍为常数。第 2 轮：SR 把第二行左右交换，两列各有一个活跃半字节，MC 后四个半字节全活跃。第 3 轮：SR 后每列两个活跃半字节，MC 的输出是它们的线性组合 $a\cdot x\oplus b\cdot y$，在 16 个状态上求和为 $a\sum x\oplus b\sum y=0$，即平衡，但不再保证活跃。

类似高阶差分，积分也有高阶的概念。

!!! definition "定义（高阶积分）"
    设 $S=\{v\}$ 是由 $m^d$ 个向量组成的多重集，每个字节有 $m$ 种取值。若这 $m^d$ 个向量在 $d$ 个字节上的每种可能取值恰好出现一次，则称 $S$ 上的积分为 **$d$ 阶积分**，记为 $\mathcal A^d$。$d=1$ 时 $\mathcal A^1=\mathcal A$。

!!! example "例"
    以比特为单位：$S_1=\{0000,0001\}$ 在第 4 比特上两种取值各出现一次，是 1 阶积分；$S_2=\{0000,0001,0010,0011\}$ 在后两个比特上的 4 种取值各出现一次，是 2 阶积分；$S_3=\{0000,\cdots,0111\}$ 是 3 阶积分。

用 $\mathcal A_i^d$ 表示具有相同角标 $i$ 的 $d$ 个字节一起构成 $d$ 阶积分。

!!! example "例（Mini-AES 的 4 轮 2 阶积分）"
    取 $m=2^8$ 个明文，使第 1 和第 4 个半字节取遍所有 $2^8$ 种组合（这两个半字节共 8 比特上的值各出现一次，是 2 阶积分），其余两个半字节为常数，即 $(\mathcal A_0^2,\mathcal C,\mathcal A_0^2,\mathcal C)$。则

    $$
    \begin{bmatrix}\mathcal A_0^2&\mathcal C\\\mathcal C&\mathcal A_0^2\end{bmatrix}
    \xrightarrow{1r}
    \begin{bmatrix}\mathcal A_0^2&\mathcal C\\\mathcal A_0^2&\mathcal C\end{bmatrix}
    \xrightarrow{1r}
    \begin{bmatrix}\mathcal A_0^2&\mathcal A_0^2\\\mathcal A_1^2&\mathcal A_1^2\end{bmatrix}
    \xrightarrow{1r}
    \begin{bmatrix}\mathcal A&\mathcal A\\\mathcal A&\mathcal A\end{bmatrix}
    \xrightarrow{1r}
    \begin{bmatrix}\mathcal B&\mathcal B\\\mathcal B&\mathcal B\end{bmatrix}\quad(\mathcal B=0).
    $$

    比 1 阶积分多走了一轮，这就是高阶积分的优势。

利用 $r$ 轮积分路线，可以给出 $r+1$ 轮积分攻击的一般过程。

!!! theorem "算法（$r+1$ 轮积分攻击）"
    1. 找一条 $r$ 轮积分路线作为区分器；
    2. 选择满足区分器输入特性的明文集合，加密得到密文；
    3. 猜测最后一轮的密钥，部分解密，验证是否满足区分器输出端的积分特性：满足则为正确密钥的候选，否则为错误密钥。

!!! example "例（Mini-AES 的 5 轮积分攻击）"
    1. 选择满足 4 轮 2 阶积分输入特性 $(\mathcal A_0^2,\mathcal C,\mathcal A_0^2,\mathcal C)$ 的 $2^8$ 个明文，加密得到密文；
    2. 猜测最后一轮第一个半字节密钥的所有可能取值，用密文的第一个半字节部分解密到第 4 轮输出，检查积分是否为平衡特性。若是，为正确密钥的候选；否则为错误密钥；
    3. 重复第 2 步，恢复其他三个半字节的第 5 轮子密钥。

    数据复杂度为 $2^8$ 个选择明文（遍历 8 比特），时间复杂度为 $2^8$ 次 5 轮加密和 $4\times2^8$ 次半字节一轮部分解密，存储主要是密文，至多 $2^8\times2=512$ 字节。

!!! problem "习题"
    上面的攻击中，一个错误的半字节密钥通过平衡检验的概率约是多少？要使四个半字节的错误候选都几乎被排除，应怎么做？

??? solution "解"
    错误密钥下部分解密得到的 $2^8$ 个半字节可以看作随机的，它们的异或和是 $\mathrm{GF}(2^4)$ 中的均匀随机值，等于 $0$ 的概率为 $2^{-4}$。所以每个半字节的 15 个错误候选中，期望有 $15/16\approx1$ 个误通过。再选一个满足同样输入特性的明文集合（换一组常数）重复检验，错误候选两次都通过的概率降为 $2^{-8}$，期望只剩 $15\times2^{-8}\approx0.06$ 个。所以通常用 2 个结构体，数据量为 $2^9$。

传统积分攻击利用三种积分特性区分算法与随机函数。饱和度攻击 (saturation attack) 也利用平衡特性，但原理不同。积分攻击往往受到数据量的制约，为此王美琴等在 2016 年提出了统计积分区分攻击，降低了所需的数据。

## 2. 分离特性 { #s2 }

### 2.1 分离特性的思想 { #s2-1 }

分离特性是一种新的寻找积分区分器的方法，由 Todo 在 EUROCRYPT 2015 上提出，是积分分析的扩展。给定 $\mathbb F_2^n$ 上的多重集 $\mathbb X$ 和向量 $\boldsymbol u\in\mathbb F_2^n$，考虑

$$
\lambda=\bigoplus_{\boldsymbol x\in\mathbb X}\pi_{\boldsymbol u}(\boldsymbol x),
$$

其中 $\pi_{\boldsymbol u}$ 是下面定义的比特乘积函数。$\lambda$ 与 $\boldsymbol u$ 有什么关系？先看 $\mathbb X$ 具有 $\mathcal A$ 和 $\mathcal B$ 的情形。

1. **$\mathbb X$ 具有活跃特性 $\mathcal A$**（每种可能的值出现相同的次数）。容易验证对汉明重量小于 $n$ 的 $\boldsymbol u$，$\lambda$ 恒为 $0$；而 $\boldsymbol u$ 的汉明重量为 $n$ 时，$\lambda$ 取决于每个值出现次数的奇偶：

    $$
    \lambda=\begin{cases}0,&\mathrm{wt}(\boldsymbol u)<n,\\0\text{ 或 }1,&\mathrm{wt}(\boldsymbol u)=n.\end{cases}
    $$

    只知道 $\mathbb X$ 具有 $\mathcal A$，无法确定 $\mathrm{wt}(\boldsymbol u)=n$ 时 $\lambda$ 的值，Todo 称此时 $\lambda$ **不确定**。

2. **$\mathbb X$ 具有平衡特性 $\mathcal B$**。显然

    $$
    \lambda=\begin{cases}0,&\mathrm{wt}(\boldsymbol u)<2,\\0\text{ 或 }1\ \text{（不确定）},&\mathrm{wt}(\boldsymbol u)\ge2.\end{cases}
    $$

可见 $\mathcal A$ 和 $\mathcal B$ 都可以用一个数 $1\le k\le n$ 描述：汉明重量小于 $k$ 的向量，$\lambda$ 恒为 $0$。$\mathcal A$ 对应 $k=n$，$\mathcal B$ 对应 $k=2$。那么 $k$ 介于 $2$ 和 $n$ 之间的多重集有什么特性？**分离特性就是对介于 $\mathcal A$ 和 $\mathcal B$ 之间的多重集特性的总结**，利用它能更精确地刻画积分特性的传播规律。

!!! definition "定义（比特乘积函数）"
    对 $\boldsymbol u=(u_0,\cdots,u_{n-1})$，$\boldsymbol x=(x_0,\cdots,x_{n-1})\in\mathbb F_2^n$，定义

    $$
    \pi_{\boldsymbol u}(\boldsymbol x)=\prod_{i=0}^{n-1}x_i^{u_i}=x_0^{u_0}x_1^{u_1}\cdots x_{n-1}^{u_{n-1}}\qquad(0^0=1).
    $$

    对多重集 $\mathbb X$，记 $s(\boldsymbol u)=\bigoplus_{\boldsymbol x\in\mathbb X}\pi_{\boldsymbol u}(\boldsymbol x)$。

$\pi_{\boldsymbol u}(\boldsymbol x)=1$ 当且仅当 $\boldsymbol x$ 在 $\boldsymbol u$ 为 $1$ 的位置上都是 $1$，记为 $\boldsymbol u\preceq\boldsymbol x$。所以 $s(\boldsymbol u)$ 就是 $\mathbb X$ 中满足 $\boldsymbol x\succeq\boldsymbol u$ 的元素个数的奇偶。若 $\mathrm{wt}(\boldsymbol u)<k$ 时 $s(\boldsymbol u)$ 始终为 $0$，而 $\mathrm{wt}(\boldsymbol u)\ge k$ 时 $s(\boldsymbol u)$ 不全为 $0$，就说 $\mathbb X$ 的分离特性是 $\mathcal D^n_k$。

!!! example "例"
    多重集 $\mathbb X=\{\mathrm{0x0},\mathrm{0x3},\mathrm{0x3},\mathrm{0x3},\mathrm{0x5},\mathrm{0x6},\mathrm{0x8},\mathrm{0xB},\mathrm{0xD},\mathrm{0xE}\}\subset\mathbb F_2^4$，求它的分离特性。

??? solution "解"
    对 16 个 $\boldsymbol u$ 逐一数出 $\mathbb X$ 中满足 $\boldsymbol x\succeq\boldsymbol u$ 的元素个数：

    - $\boldsymbol u=0000$：10 个，$s=0$；
    - $\mathrm{wt}(\boldsymbol u)=1$：$\boldsymbol u=0001$ 时有 $3,3,3,5,\mathrm B,\mathrm D$ 共 6 个；$0010$ 时有 $3,3,3,6,\mathrm B,\mathrm E$ 共 6 个；$0100$ 时有 $5,6,\mathrm D,\mathrm E$ 共 4 个；$1000$ 时有 $8,\mathrm B,\mathrm D,\mathrm E$ 共 4 个，全为 $0$；
    - $\mathrm{wt}(\boldsymbol u)=2$：例如 $0011$ 有 $3,3,3,\mathrm B$ 共 4 个，$1001$ 有 $\mathrm B,\mathrm D$ 共 2 个，逐一验证全为 $0$；
    - $\mathrm{wt}(\boldsymbol u)=3$：$\boldsymbol u\in\{\mathrm{0xB},\mathrm{0xD},\mathrm{0xE}\}$ 时只有它本身满足，$s=1$；$\boldsymbol u=\mathrm{0x7}$ 时没有元素满足，$s=0$。

    所以 $\mathrm{wt}(\boldsymbol u)<3$ 时 $s(\boldsymbol u)$ 都为 $0$，$\mathrm{wt}(\boldsymbol u)=3$ 时不全为 $0$，$\mathbb X$ 的分离特性是 $\mathcal D^4_3$。（程序核对：$s(\boldsymbol u)=1$ 的恰为 $\mathrm B,\mathrm D,\mathrm E$。）

!!! definition "定义（分离特性）"
    设多重集 $\mathbb X$ 的元素取自 $\mathbb F_2^n$，$k$ 为 $0$ 到 $n$ 之间的整数。称 $\mathbb X$ 具有**分离特性** $\mathcal D^n_k$，若 $\mathrm{wt}(\boldsymbol u)<k$ 时 $\bigoplus_{\boldsymbol x\in\mathbb X}\pi_{\boldsymbol u}(\boldsymbol x)$ 一定为 $0$，而 $\mathrm{wt}(\boldsymbol u)\ge k$ 时其值不确定 (unknown)。

记 $\mathbb S^n_k=\{\boldsymbol u\in\mathbb F_2^n\mid\mathrm{wt}(\boldsymbol u)\ge k\}$，若 $\mathbb X$ 的分离特性是 $\mathcal D^n_k$，则

$$
\bigoplus_{\boldsymbol x\in\mathbb X}\pi_{\boldsymbol u}(\boldsymbol x)=\begin{cases}0,&\boldsymbol u\in\mathbb F_2^n\setminus\mathbb S^n_k,\\\text{不确定},&\boldsymbol u\in\mathbb S^n_k.\end{cases}\tag{1}
$$

如何利用分离特性找积分特性？加密明文集合 $\mathbb P$ 得到密文集合 $\mathbb C$，若知道 $\mathbb C$ 的分离特性，就知道了密文的积分特性。实际中考察分离特性经过各组件时的传播，逐步得到密文集合的分离特性。

先看一个简单的例子。设一轮加密由 $n$ 比特、代数次数为 $d$ 的 S 盒 SB 和 $n$ 比特的密钥加 AK 组成，明文集合 $\mathbb X$ 的分离特性为 $\mathcal D^n_k$：

$$
\mathbb X\xrightarrow{\mathrm{SB}(\cdot)}\mathbb Y\xrightarrow{\mathrm{AK}(\cdot)}\mathbb Z.
$$

$\mathbb Y=\{\mathrm{SB}(\boldsymbol x)\mid\boldsymbol x\in\mathbb X\}$。为求 $\mathbb Y$ 的分离特性，要考察 $\bigoplus_{\boldsymbol y\in\mathbb Y}\pi_{\boldsymbol v}(\boldsymbol y)$ 随 $\boldsymbol v$ 的变化，把它与 $\mathbb X$ 联系起来：

$$
\bigoplus_{\boldsymbol y\in\mathbb Y}\pi_{\boldsymbol v}(\boldsymbol y)=\bigoplus_{\boldsymbol x\in\mathbb X}(\pi_{\boldsymbol v}\circ\mathrm{SB})(\boldsymbol x).\tag{2}
$$

$\pi_{\boldsymbol v}\circ\mathrm{SB}$ 是 $\boldsymbol x$ 的布尔函数，展开为单项式 $\pi_{\boldsymbol u}(\boldsymbol x)$ 的和。$\mathbb X$ 是 $\mathcal D^n_k$，所以只要每个出现的单项式都满足 $\mathrm{wt}(\boldsymbol u)<k$，即 $\pi_{\boldsymbol v}\circ\mathrm{SB}$ 的代数次数小于 $k$，就能保证 (2) 为 $0$。而

$$
\deg(\pi_{\boldsymbol v}\circ\mathrm{SB})\le\mathrm{wt}(\boldsymbol v)\cdot d.
$$

所以只要 $\mathrm{wt}(\boldsymbol v)<k/d$，(2) 就一定为 $0$。$\mathrm{wt}(\boldsymbol v)$ 是整数，故 $\mathbb Y$ 的分离特性是 $\mathcal D^n_{\lceil k/d\rceil}$。

SB 是置换时有一个特例：置换的代数次数至多为 $n-1$，且 $\mathrm{wt}(\boldsymbol v)<n$ 时 $\pi_{\boldsymbol v}\circ\mathrm{SB}$ 的次数也一定小于 $n$，所以 $\mathbb X$ 为 $\mathcal D^n_n$ 时，$\mathbb Y$ 的分离特性是 $\mathcal D^n_n$ 而非 $\mathcal D^n_{\lceil n/d\rceil}$。

从 $\mathbb Y$ 到 $\mathbb Z$ 经过 AK，它的代数次数为 1，所以 $\mathbb Z$ 的分离特性仍是 $\mathcal D^n_{\lceil k/d\rceil}$。逐轮迭代下去，就得到每一轮中间状态集合的分离特性，最终得到密文集合的分离特性。

任意向量布尔函数都可以看作一个 S 盒（线性和仿射操作看作代数次数为 1 的 S 盒），推导方式相同：

!!! theorem "命题（分离特性经过向量布尔函数的传播）"
    设 $f:\mathbb F_2^n\to\mathbb F_2^m$ 是代数次数为 $d$ 的 S 盒函数，输入多重集 $\mathbb X$ 的分离特性为 $\mathcal D^n_k$，则输出多重集 $\mathbb Y$ 的分离特性为 $\mathcal D^m_{\lceil k/d\rceil}$。若 $f$ 还是置换，则 $\mathbb X$ 为 $\mathcal D^n_n$ 时 $\mathbb Y$ 为 $\mathcal D^n_n$。

!!! problem "习题"
    由上面的命题推导分离特性经过 XOR、COPY 和线性层（如 AES 的 MC）的传播规则。

??? solution "解"
    **XOR**：$(x_0,x_1)\mapsto x_0\oplus x_1$。输入 $\mathcal D^{n,n}_{(k_0,k_1)}$，输出单项式 $\pi_{\boldsymbol v}(x_0\oplus x_1)$ 展开后是 $\pi_{\boldsymbol a}(x_0)\pi_{\boldsymbol b}(x_1)$ 的和，$\boldsymbol a\oplus\boldsymbol b$ 落在 $\boldsymbol v$ 之下，$\mathrm{wt}(\boldsymbol a)+\mathrm{wt}(\boldsymbol b)=\mathrm{wt}(\boldsymbol v)$。所以输出为 $\mathcal D^n_{k_0+k_1}$。

    **COPY**：$x\mapsto(x,x)$。输入 $\mathcal D^n_k$，输出单项式 $\pi_{\boldsymbol v_0}(x)\pi_{\boldsymbol v_1}(x)=\pi_{\boldsymbol v_0\vee\boldsymbol v_1}(x)$，次数为 $\mathrm{wt}(\boldsymbol v_0\vee\boldsymbol v_1)$，至多 $\mathrm{wt}(\boldsymbol v_0)+\mathrm{wt}(\boldsymbol v_1)$。所以输出为 $\bigcup_{0\le i\le k}\mathcal D^{n,n}_{(k-i,i)}$：原来的 $k$ 可以任意分给两个分支。

    **线性层**：代数次数为 1，由命题 $\mathcal D^n_k$ 传播为 $\mathcal D^n_k$。按字分组时（如 MC 作用于一列的若干字节），输出各字的 $k_i$ 之和不超过输入各字的 $k_i$ 之和，具体哪些分配可行由线性层的矩阵决定，通常写程序或用 MILP 刻画。

### 2.2 向量化的分离特性 { #s2-2 }

现代分组密码一般用小分组组件拼成长分组算法，例如 AES 的分组长 128 比特，轮函数的置换层用 16 个 8 比特 S 盒。只用上面的命题无法同时刻画 16 个 S 盒。这 16 个 S 盒作用在 128 比特的各个字节上，可以分别考虑各个字节的分离特性变化，这就是**向量化的分离特性**。

先把乘积函数向量化。$\pi_{\boldsymbol u}:(\mathbb F_2^n)^m\to\mathbb F_2$，$\boldsymbol u=(\boldsymbol u_0,\cdots,\boldsymbol u_{m-1})$，$\boldsymbol x\in(\mathbb F_2^n)^m$，

$$
\pi_{\boldsymbol u}(\boldsymbol x)=\prod_{i=0}^{m-1}\pi_{\boldsymbol u_i}(\boldsymbol x_i)=\prod_{i=0}^{m-1}\left(\prod_{j=0}^{n-1}(x_i)_j^{(u_i)_j}\right).
$$

!!! definition "定义（向量分离特性, Vectorial Division Property）"
    设多重集 $\mathbb X$ 的元素取自 $(\mathbb F_2^n)^m$，$\boldsymbol k=(k_0,\cdots,k_{m-1})$ 是 $m$ 维整数向量，$0\le k_i\le n$。称 $\mathbb X$ 具有分离特性 $\mathcal D^{n,m}_{(k_0,\cdots,k_{m-1})}$，若存在某个 $i$ 使 $\mathrm{wt}(\boldsymbol u_i)<k_i$ 时，$\bigoplus_{\boldsymbol x\in\mathbb X}\pi_{\boldsymbol u}(\boldsymbol x)$ 一定为 $0$；而对所有 $i$ 都有 $\mathrm{wt}(\boldsymbol u_i)\ge k_i$ 时，其值不确定。

!!! note "注"
    教材此处的“$\forall i$”与“$\exists i$”位置互换了。按 Todo 原文，$\boldsymbol k$ 刻画的是不确定的集合 $\{\boldsymbol u:\mathrm{wt}(\boldsymbol u_i)\ge k_i,\ \forall i\}$，其补集上和为 $0$。这里按原文写。

向量化带来一个问题：一个多重集可能同时具有多个向量分离特性。例如两部分组成的 $\mathbb X=(\mathbb X_0,\mathbb X_1)$，可能是 $\mathcal D^{n,n}_{(1,3)}$，也可能是 $\mathcal D^{n,n}_{(2,2)}$，此时称它的分离特性为 $\mathcal D^{n,n}_{(1,3)}\cup\mathcal D^{n,n}_{(2,2)}$，叫做**组合分离特性**。

!!! example "例（3 轮 Mini-AES 的分离特性）"
    教材以半字节为单位（$n=4$），从一个半字节活跃的明文集合出发，逐步追踪 3 轮 Mini-AES 的分离特性：

    1. 经过第 1 轮的 MC，一列两个半字节的组合分离特性为 $\mathcal{DP}_0=\mathcal D^{4,4}_{(0,4)}\cup\mathcal D^{4,4}_{(1,3)}\cup\mathcal D^{4,4}_{(2,2)}\cup\mathcal D^{4,4}_{(3,1)}\cup\mathcal D^{4,4}_{(4,0)}$；
    2. 经过 NibbleSub（代数次数为 3 的 S 盒），化为 $\mathcal{DP}_1=\mathcal D^{4,4}_{(0,4)}\cup\mathcal D^{4,4}_{(1,1)}\cup\mathcal D^{4,4}_{(4,0)}$（$\mathcal D^{4,4}_{(1,1)}$ 已经包含了 $(1,3)$、$(2,2)$、$(3,1)$ 的情形）；
    3. 第 2 轮后整体为 $\mathcal{DP}_2=\mathcal D^{16}_4\cup\mathcal D^{16}_2\cup\mathcal D^{16}_4=\mathcal D^{16}_2$（$\mathcal D^{16}_2$ 已包含 $\mathcal D^{16}_4$，冗余的只写 $\mathcal D^{16}_2$）；
    4. 第 3 轮中再展开为若干 $\mathcal D^{4,4,4,4}_{(\cdot)}$ 的并 $\mathcal{DP}_3$、$\mathcal{DP}_4$，最终密文为 $\mathcal D^{16}_2$。

    密文多重集的分离特性是 $\mathcal D^{16}_2$，所以**密文的每一个比特都是零和的**（汉明重量为 1 的 $\boldsymbol u$ 对应单个比特的和）。

求实际算法时，一般写程序追踪分离特性的传播，通常用 MILP 或 SAT 等建模工具刻画，见[第九章](<chapter-09-automated-distinguisher-search.md>)。

### 2.3 比特级的分离特性 { #s2-3 }

上面的分离特性只考虑了向量布尔函数的代数次数，且总以“字”为最小单位，称为**字级的分离特性**。但字级分离特性有时不能准确刻画一个集合。考虑 $\mathbb F_2^4$ 上的多重集

$$
\mathbb X=\{0,1,2,3,4,5,6,7\}.\tag{3}
$$

它的字级分离特性是 $\mathcal D^4_3$。但汉明重量为 3 的四个向量中，只有一个使 $\bigoplus_{\boldsymbol x\in\mathbb X}\pi_{\boldsymbol u}(\boldsymbol x)=1$，其他三个都恒为 $0$。为了更精确地刻画，引入比特级分离特性。

!!! note "注"
    按 $x_0$ 为最高位，$\{0,\cdots,7\}$ 是最高位为 $0$、低三位取遍的集合，和为 $1$ 的重量 3 向量是 $\boldsymbol u=(0,1,1,1)$，我写程序核对过。教材写作 $(1,0,1,1)$，与比特序约定有关。

比特级分离特性按考虑的和值种类分为两子集和三子集。

!!! definition "定义（两子集比特级分离特性）"
    给定 $\mathbb K\subseteq\mathbb F_2^n$，称 $\mathbb F_2^n$ 上的多重集 $\mathbb X$ 具有比特级分离特性 $\mathcal D^{1^n}_{\mathbb K}$，若

    $$
    \bigoplus_{\boldsymbol x\in\mathbb X}\pi_{\boldsymbol u}(\boldsymbol x)=\begin{cases}\text{不确定},&\exists\boldsymbol k\in\mathbb K\ \text{s.t.}\ \boldsymbol k\preceq\boldsymbol u,\\0,&\text{其他}.\end{cases}
    $$

对 (3) 的集合，我们明确知道那个向量的和为 $1$ 而不是“不确定”，两子集分离特性没有考虑这个信息。为了捕捉它，引入三子集分离特性。

!!! definition "定义（三子集比特级分离特性）"
    给定 $\mathbb K,\mathbb L\subseteq\mathbb F_2^n$，称 $\mathbb X$ 具有比特级分离特性 $\mathcal D^{1^n}_{\mathbb K,\mathbb L}$，若

    $$
    \bigoplus_{\boldsymbol x\in\mathbb X}\pi_{\boldsymbol u}(\boldsymbol x)=\begin{cases}\text{不确定},&\exists\boldsymbol k\in\mathbb K\ \text{s.t.}\ \boldsymbol k\preceq\boldsymbol u,\\1,&\exists\boldsymbol\ell\in\mathbb L\ \text{s.t.}\ \boldsymbol\ell=\boldsymbol u,\\0,&\text{其他}.\end{cases}
    $$

可见比特级分离特性把同样汉明重量的向量又做了区分。与字级不同，它的每一个比特都是独立的单位，传播规则也以比特为单位。下面是三个基本函数的传播规则（三子集情形）。

!!! theorem "传播规则（COPY）"
    $f:(x_0,x_1,\cdots,x_{m-1})\mapsto(x_0,x_0,x_1,\cdots,x_{m-1})$。设输入 $\mathbb X$ 为 $\mathcal D^{1^m}_{\mathbb K,\mathbb L}$，输出 $\mathbb Y$ 为 $\mathcal D^{1^{m+1}}_{\mathbb K',\mathbb L'}$，则

    $$
    \mathbb K'=\begin{cases}(0,0,k_1,\cdots,k_{m-1}),&k_0=0,\\(0,1,k_1,\cdots,k_{m-1}),\ (1,0,k_1,\cdots,k_{m-1}),&k_0=1,\end{cases}
    $$

    $$
    \mathbb L'=\begin{cases}(0,0,\ell_1,\cdots,\ell_{m-1}),&\ell_0=0,\\(1,0,\ell_1,\cdots),\ (0,1,\ell_1,\cdots),\ (1,1,\ell_1,\cdots),&\ell_0=1.\end{cases}
    $$

!!! theorem "传播规则（XOR）"
    $f:(x_0,x_1,\cdots,x_{m-1})\mapsto(x_0\oplus x_1,x_2,\cdots,x_{m-1})$。$\mathbb K'$ 由 $\mathbb K$ 中满足 $(k_0,k_1)\in\{(0,0),(1,0),(0,1)\}$ 的向量按 $\mathbb K'\leftarrow(k_0+k_1,k_2,\cdots,k_{m-1})$ 得到；$\mathbb L'$ 由 $\mathbb L$ 中满足 $(\ell_0,\ell_1)\in\{(0,0),(1,0),(0,1)\}$ 的向量按

    $$
    \mathbb L'\xleftarrow{x}(\ell_0+\ell_1,\ell_2,\cdots,\ell_{m-1})
    $$

    得到，其中 $\mathbb L'\xleftarrow{x}\boldsymbol\ell$ 表示：若 $\mathbb L'$ 中没有 $\boldsymbol\ell$，则加入；若已经有，则删去（两次出现在模 2 下抵消）。

!!! theorem "传播规则（AND）"
    $f:(x_0,x_1,\cdots,x_{m-1})\mapsto(x_0\wedge x_1,x_2,\cdots,x_{m-1})$。$\mathbb K'$ 由 $\mathbb K$ 中满足 $(k_0,k_1)\in\{(0,0),(1,1)\}$ 的向量按

    $$
    \mathbb K'\leftarrow\left(\left\lceil\frac{k_0+k_1}2\right\rceil,k_2,\cdots,k_{m-1}\right)
    $$

    得到；$\mathbb L'$ 由 $\mathbb L$ 中满足 $(\ell_0,\ell_1)\in\{(0,0),(1,1)\}$ 的向量按 $\mathbb L'\leftarrow\left(\left\lceil\frac{\ell_0+\ell_1}2\right\rceil,\ell_2,\cdots,\ell_{m-1}\right)$ 得到。

对 COPY、XOR、AND 等与密钥无关的操作，$\mathbb K$ 到 $\mathbb K'$ 与 $\mathbb L$ 到 $\mathbb L'$ 的传播是独立的。但遇到**异或密钥**时，$\mathbb L$ 中的一些向量就不再使 $\bigoplus\pi_{\boldsymbol\ell}(\boldsymbol x)$ 为 $1$ 了：我们不知道密钥，和在某些向量下变成了不确定，应把这部分向量转移到 $\mathbb K$ 中。

设 $\mathbb X$、$\mathbb Y$ 是异或密钥的输入与输出，$\boldsymbol y=\boldsymbol x\oplus\boldsymbol k$。对 $\mathbb L$ 中的每个 $\boldsymbol\ell$，所有 $\boldsymbol v\succ\boldsymbol\ell$ 都会使 $\bigoplus\pi_{\boldsymbol v}(\boldsymbol x\oplus\boldsymbol k)$ 变得不确定。实际算法中轮密钥可能只与部分状态异或，设第 $i$ 个比特上有密钥异或，则对 $\mathbb L$ 中满足 $\ell_i=0$ 的 $\boldsymbol\ell$，

$$
\mathbb K'\leftarrow(\ell_0,\ell_1,\cdots,\ell_i\vee1,\cdots,\ell_{m-1}).
$$

!!! problem "习题"
    分组大小为 32 的 SIMON 算法中，设输入集合 $X$ 具有三子集比特级分离特性 $\mathbb L=\{(0,1,1,\cdots,1)\}$，$\mathbb K=\varnothing$，求经过一轮 SIMON 加密后输出集合 $Y$ 的分离特性。

    **提示**：SIMON 一轮为 $(L,R)\mapsto\big(R\oplus f(L)\oplus k,\ L\big)$，其中 $f(L)=\big((L\lll1)\wedge(L\lll8)\big)\oplus(L\lll2)$。把它拆成 COPY、AND、XOR 和异或密钥，依次用上面的传播规则。异或密钥后，要把 $\mathbb L$ 中在密钥位置为 $0$ 的向量补成 $1$ 转入 $\mathbb K$。

## 3. 小结 { #s3 }

- **积分特性**：活跃 $\mathcal A$、平衡 $\mathcal B$、常数 $\mathcal C$，以及高阶积分 $\mathcal A^d$。经过双射保持 $\mathcal A$ 与 $\mathcal C$，经过加法得到 $\mathcal B$，经过非线性部件后 $\mathcal B$ 变为不确定。
- **积分攻击**：找 $r$ 轮积分区分器，猜测最后一轮的部分密钥，检验部分解密后是否满足平衡特性。
- **分离特性**：用“汉明重量小于 $k$ 的单项式在集合上的和恒为 $0$”刻画介于 $\mathcal A$ 与 $\mathcal B$ 之间的多重集，经过代数次数为 $d$ 的函数时 $k\mapsto\lceil k/d\rceil$。向量化、比特级（两子集、三子集）的分离特性逐步提高了刻画的精度。

参考：王美琴主编，《密码分析学》，科学出版社，2024，第 5 章。
