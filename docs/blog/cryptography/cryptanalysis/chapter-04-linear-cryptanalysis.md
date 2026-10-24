---
title: 第四章：分组密码的线性分析及相关分析方法
description: "密码分析学笔记第四章：线性近似与偏差、堆积引理、线性近似表、线性路线、Matsui 算法 1/2、假设检验与复杂度评估、多重/多维线性分析、零相关线性分析、差分-线性分析与密钥差分不变偏差。"
hide:
  - navigation
categories:
  - 密码学
  - 密码分析
date: 2026-07-24
---

# 第四章：分组密码的线性分析及相关分析方法 { #top }

线性分析由 Matsui 在 1993 年欧密会 (EUROCRYPT) 上提出，首次应用于 DES 的理论分析；此前 Matsui 与 Yamagishi 开发的早期变种已在 EUROCRYPT 1992 上用于 FEAL。如今它和差分分析一样，是分组密码最有力的分析方法之一。本章先讲经典线性分析，再讨论它的几种推广：多重线性、多维线性、零相关线性、差分-线性分析，以及密钥差分不变偏差技术。

## 1. 线性分析 { #s1 }

### 1.1 研究动机与可行性 { #s1-1 }

如果能找到一个把明文和密文联系起来的线性表达式，那么通过密文就能算出与明文有关的信息，算法将很容易被破解，这也是密码算法要用 S 盒引入非线性的原因。非线性使得这类线性表达式不可能恒成立，但对某些存在设计缺陷的算法，我们也许能构造一些**很有可能（不）成立**的线性表达式，这就是线性分析的出发点。

- **区分攻击的可行性**：理想情况下，与明密文相关的线性表达式应以相同的概率取 $0$ 或 $1$。若已知某个线性表达式很有可能（不）成立，获取一定数量的明密文对后评估其成立的概率，观察它是否明显偏离 $1/2$，就能把算法与随机置换区分开。
- **密钥恢复的可行性**：若在明文和最后一轮输入之间找到了很有可能（不）成立的线性表达式，就可以猜测最后一轮密钥，把每个密文部分解密一轮。若猜对了，关于明文和部分解密中间状态的线性表达式很可能成立。对每个密钥猜测统计使表达式成立的明密文对数，成立次数最多的密钥很可能就是正确密钥。可见线性分析以**最大似然**思想为内核。

这里的表达式涉及明文比特、“密文”比特（密钥恢复时用的是倒数第二轮的输出）和密钥比特。我们对使用哪些明密文对没有额外要求，所以线性分析是一种**已知明文攻击**。

### 1.2 线性分析框架 { #s1-2 }

设迭代分组密码 $E:\mathbb F_2^n\times\mathbb F_2^k\to\mathbb F_2^n$，$n$ 为分组长度，$k$ 为密钥长度，记 $E_K(\cdot)=E(\cdot,K)$。主密钥通过密钥编排生成轮密钥 $K_0,\cdots,K_{r-1}$，加密是轮函数 $F_{K_i}(\cdot)=F(\cdot,K_i)$ 的 $r$ 次迭代：

$$
E_K(X)=F_{K_{r-1}}\circ F_{K_{r-2}}\circ\cdots\circ F_{K_0}(X).
$$

用 $X[i]$ 表示输入 $X$ 的第 $i$ 比特，$Z[j]$ 表示输出 $Z$ 的第 $j$ 比特，$K[l]$ 表示密钥的第 $l$ 比特。我们关心的线性表达式形如

$$
X[i_1]\oplus\cdots\oplus X[i_a]\oplus Z[j_1]\oplus\cdots\oplus Z[j_b]=K[l_1]\oplus\cdots\oplus K[l_c].\tag{1}
$$

理想中希望某个形如 (1) 的表达式恒（不）成立，但这一般不会出现。退而求其次，若它以高概率（不）成立，就是算法随机化能力差的表现。为简化记号，引入内积和掩码。

!!! definition "定义（内积与线性掩码）"
    设 $\boldsymbol a=(a_0,\cdots,a_{n-1})$，$\boldsymbol b=(b_0,\cdots,b_{n-1})\in\mathbb F_2^n$，二者的**内积**为

    $$
    \boldsymbol a\cdot\boldsymbol b=\langle\boldsymbol a,\boldsymbol b\rangle=\bigoplus_{i=0}^{n-1}a_i\wedge b_i.
    $$

    对 $X\in\mathbb F_2^n$，$X$ 的**线性掩码** $\alpha$ 也是 $\mathbb F_2^n$ 中的向量，它把 $X$ 中对应 $\alpha$ 非零位的比特取出来异或，结果就是 $\alpha\cdot X$。

!!! definition "定义（线性近似）"
    对迭代分组密码 $E_K(\cdot)$，一对给定的掩码 $(\alpha,\beta)$ 即可视作 $E_K$ 的一个**线性近似 (linear approximation)**，相应地称 $\alpha\cdot x\oplus\beta\cdot E_K(x)$ 为一个**线性近似表达式**，$\alpha$、$\beta$ 分别称为输入掩码和输出掩码。线性近似表达式的概率是使它取 $0$ 的输入在整个输入空间中的比例：

    $$
    \Pr(\alpha,\beta)=\frac{\#\{X\in\mathbb F_2^n\mid\alpha\cdot X\oplus\beta\cdot E_K(X)=0\}}{2^n}.
    $$

对随机化程度高的算法，随机选掩码时，表达式几乎以相等的概率取 $0$ 或 $1$。所以线性分析可行的关键，在于概率与 $1/2$ 的偏离程度。

!!! definition "定义（偏差与相关度）"
    线性近似 $(\alpha,\beta)$ 的**偏差 (bias)** 为

    $$
    \varepsilon(\alpha,\beta)=\Pr(\alpha,\beta)-\frac12,
    $$

    **相关度 (correlation)** 为 $c(\alpha,\beta)=2\varepsilon(\alpha,\beta)$。

分组较长时，即使给定 $(\alpha,\beta)$，精确计算其偏差也非常困难。我们需要以中间状态为衔接点，把输入和输出掩码逐轮连起来。

!!! definition "定义（线性路线）"
    对迭代分组密码 $E_K(\cdot)$，设输入、输出掩码为 $\alpha$、$\beta$，中间状态 $Y_1,\cdots,Y_{r-1}$ 处的掩码为 $\alpha_1,\cdots,\alpha_{r-1}$，则称 $(\alpha,\alpha_1,\cdots,\alpha_{r-1},\beta)$ 为 $E_K$ 的一条**线性路线 (linear trail)**。

为计算路线的偏差，先看两个独立的二元随机变量 $X_1,X_2$，$\Pr(X_1=0)=p_1$，$\Pr(X_2=0)=p_2$。则

$$
\Pr(X_1\oplus X_2=0)=\Pr(X_1=X_2)=p_1p_2+(1-p_1)(1-p_2).
$$

令 $\varepsilon_i=p_i-1/2$，代入得

$$
\Pr(X_1\oplus X_2=0)=\frac12+2\varepsilon_1\varepsilon_2,\qquad\text{即}\quad\varepsilon_{1,2}=2\varepsilon_1\varepsilon_2.
$$

推广到 $n$ 个变量，就是下面的堆积引理。

!!! theorem "引理（堆积引理, Piling-Up Lemma）"
    设 $X_1,\cdots,X_n$ 是相互独立的二元随机变量，$\Pr(X_i=0)=1/2+\varepsilon_i$，则

    $$
    \Pr(X_1\oplus\cdots\oplus X_n=0)=\frac12+2^{n-1}\prod_{i=1}^{n}\varepsilon_i,
    \qquad\text{即}\quad\varepsilon_{1,\cdots,n}=2^{n-1}\prod_{i=1}^{n}\varepsilon_i.
    $$

??? proof "证明"
    用相关度来写更简洁：$c_i=2\varepsilon_i=\mathbb E[(-1)^{X_i}]$。由独立性，

    $$
    \mathbb E\left[(-1)^{X_1\oplus\cdots\oplus X_n}\right]=\prod_{i=1}^n\mathbb E\left[(-1)^{X_i}\right]=\prod_{i=1}^nc_i,
    $$

    即异或的相关度等于各相关度之积。换回偏差，$2\varepsilon_{1,\cdots,n}=\prod 2\varepsilon_i$，即得结论。

可以看到，用相关度表示时堆积引理就是简单的乘法：$c_{1,\cdots,n}=\prod c_i$。由此立即得到：

!!! theorem "命题"
    1. 若 $n$ 个随机变量取 $0$ 的概率都是 $0$ 或 $1$，则 $\Pr(X_1\oplus\cdots\oplus X_n=0)$ 也是 $0$ 或 $1$。
    2. 若 $n$ 个相互独立的随机变量中有一个 $p_i=1/2$，则 $\Pr(X_1\oplus\cdots\oplus X_n=0)=1/2$。

!!! theorem "命题（线性路线的偏差）"
    设 $(\alpha,\alpha_1,\cdots,\alpha_{r-1},\beta)$ 为一条线性路线，各轮线性近似 $(\alpha,\alpha_1),(\alpha_1,\alpha_2),\cdots,(\alpha_{r-1},\beta)$ 的偏差为 $\varepsilon_0,\varepsilon_1,\cdots,\varepsilon_{r-1}$。若这些偏差与轮函数的输入值无关（即满足独立性），则路线的偏差为

    $$
    2^{r-1}\prod_{i=0}^{r-1}\varepsilon_i.
    $$

!!! note "注"
    线性近似与线性路线不同：一个线性近似通常包含很多条路线，线性近似的偏差与密钥相关，而且很可能与其中任一条路线的偏差都不相等。实际分析时，通常选一条偏差较高的路线作为代表，把它的偏差当作线性近似偏差的估计。这与第三章“差分”与“差分路线”的关系是对应的。

### 1.3 S 盒的线性性质 { #s1-3 }

大多数密码算法以 S 盒为唯一的非线性部件，所以构造线性路线的第一步是研究 S 盒的线性近似。S 盒的规模远小于整个算法，可以穷举它所有线性近似的偏差。

!!! example "例"
    考虑下面的 4 比特 S 盒（输入 $x=(x_0,x_1,x_2,x_3)$，输出 $y=(y_0,y_1,y_2,y_3)$，$x_0$ 为最高位）：

    | $x$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | A | B | C | D | E | F |
    |---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
    | $S(x)$ | E | 4 | D | 1 | 2 | F | B | 8 | 3 | A | 6 | C | 5 | 9 | 0 | 7 |

    求线性近似 $(\mathrm{0x6},\mathrm{0xB})$、$(\mathrm{0x9},\mathrm{0x4})$、$(\mathrm{0x3},\mathrm{0x9})$ 的偏差。

??? solution "解"
    输入掩码 $\mathrm{0x6}=0110$，输出掩码 $\mathrm{0xB}=1011$，对应的表达式为

    $$
    x_1\oplus x_2\oplus y_0\oplus y_2\oplus y_3.
    $$

    逐个检查 16 个输入，有 12 个使表达式取 $0$，故 $\Pr(\mathrm{0x6},\mathrm{0xB})=12/16=3/4$，偏差为 $1/4$。同理，$(\mathrm{0x9},\mathrm{0x4})$ 即 $x_0\oplus x_3\oplus y_1$ 恰有 8 个输入取 $0$，偏差为 $0$；$(\mathrm{0x3},\mathrm{0x9})$ 即 $x_2\oplus x_3\oplus y_0\oplus y_3$ 只有 2 个输入取 $0$，偏差为 $-3/8$。

S 盒所有线性近似的偏差信息可以整理成一张表。

!!! definition "定义（线性近似表）"
    对 $m\times n$ 的 S 盒，**线性近似表 (Linear Approximation Table, LAT)** 是 $2^m$ 行 $2^n$ 列的表，第 $\boldsymbol i$ 行第 $\boldsymbol j$ 列的元素为

    $$
    \#\{(\boldsymbol x,S(\boldsymbol x))\in\mathbb F_2^m\times\mathbb F_2^n\mid\boldsymbol i\cdot\boldsymbol x\oplus\boldsymbol j\cdot S(\boldsymbol x)=0\}-2^{m-1}.
    $$

    把表中元素除以 $2^m$，就是相应线性近似的偏差。

上例 S 盒的线性近似表如下（行为输入掩码 $a$，列为输出掩码 $b$）：

| $a\backslash b$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | A | B | C | D | E | F |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **0** | 8 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** | 0 | 0 | -2 | -2 | 0 | 0 | -2 | 6 | 2 | 2 | 0 | 0 | 2 | 2 | 0 | 0 |
| **2** | 0 | 0 | -2 | -2 | 0 | 0 | -2 | -2 | 0 | 0 | 2 | 2 | 0 | 0 | -6 | 2 |
| **3** | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 2 | -6 | -2 | -2 | 2 | 2 | -2 | -2 |
| **4** | 0 | 2 | 0 | -2 | -2 | -4 | -2 | 0 | 0 | -2 | 0 | 2 | 2 | -4 | 2 | 0 |
| **5** | 0 | -2 | -2 | 0 | -2 | 0 | 4 | 2 | -2 | 0 | -4 | 2 | 0 | -2 | -2 | 0 |
| **6** | 0 | 2 | -2 | 4 | 2 | 0 | 0 | 2 | 0 | -2 | 2 | 4 | -2 | 0 | 0 | -2 |
| **7** | 0 | -2 | 0 | 2 | 2 | -4 | 2 | 0 | -2 | 0 | 2 | 0 | 4 | 2 | 0 | 2 |
| **8** | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | -2 | 2 | 2 | -2 | 2 | -2 | -2 | -6 |
| **9** | 0 | 0 | -2 | -2 | 0 | 0 | -2 | -2 | -4 | 0 | -2 | 2 | 0 | 4 | 2 | -2 |
| **A** | 0 | 4 | -2 | 2 | -4 | 0 | 2 | -2 | 2 | 2 | 0 | 0 | 2 | 2 | 0 | 0 |
| **B** | 0 | 4 | 0 | -4 | 4 | 0 | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **C** | 0 | -2 | 4 | -2 | -2 | 0 | 2 | 0 | 2 | 0 | 2 | 4 | 0 | 2 | 0 | -2 |
| **D** | 0 | 2 | 2 | 0 | -2 | 4 | 0 | 2 | -4 | -2 | 2 | 0 | 2 | 0 | 0 | 2 |
| **E** | 0 | 2 | 2 | 0 | -2 | -4 | 0 | 2 | -2 | 0 | 0 | -2 | -4 | 2 | -2 | 0 |
| **F** | 0 | -2 | -4 | -2 | -2 | 0 | 2 | 0 | 0 | -2 | 4 | -2 | -2 | 0 | 2 | 0 |

例如 $(\mathrm{0x3},\mathrm{0x9})$ 处为 $-6$，偏差 $-6/16=-3/8$，反推概率为 $-3/8+1/2=1/8$，与上例一致。对双射 S 盒，线性近似表有以下性质。

!!! theorem "命题（LAT 的性质）"
    设 $S$ 是 $m$ 比特双射 S 盒，则

    1. 线性近似表中的元素都是偶数；
    2. $(\mathrm{0x0},\mathrm{0x0})$ 处的元素为 $2^{m-1}$；
    3. 第一行除 $(\mathrm{0x0},\mathrm{0x0})$ 外全为 $0$；
    4. 第一列除 $(\mathrm{0x0},\mathrm{0x0})$ 外全为 $0$。

??? proof "证明"
    记 $N(a,b)=\#\{x:a\cdot x\oplus b\cdot S(x)=0\}$，则 LAT 元素为 $N(a,b)-2^{m-1}$。

    2. $a=b=0$ 时表达式恒为 $0$，$N=2^m$，元素为 $2^{m-1}$。
    3. $a=0$，$b\ne0$：$S$ 是双射，$S(x)$ 遍历 $\mathbb F_2^m$，而非零线性函数 $b\cdot y$ 恰在一半的 $y$ 上取 $0$，故 $N=2^{m-1}$，元素为 $0$。
    4. $a\ne0$，$b=0$：同理，$a\cdot x$ 在一半的 $x$ 上取 $0$。
    1. 记 $f(x)=a\cdot x\oplus b\cdot S(x)$，$N=2^m-\mathrm{wt}(f)$，只需证 $\mathrm{wt}(f)$ 是偶数。$a,b$ 不全为零时，$f$ 是 $m$ 个分量布尔函数的线性组合。双射 S 盒的每个非零分量函数 $b\cdot S$ 都是平衡的，而对 $m\ge2$，代数次数 $\le m-1$ 的布尔函数（双射 S 盒的非零线性组合正是如此）重量为偶数，因为重量的奇偶性就是代数标准型中 $x_0x_1\cdots x_{m-1}$ 项的系数。所以 $N$ 为偶数，又 $2^{m-1}$ 为偶数，元素为偶数。

!!! note "注"
    只要 S 盒的代数次数小于输入比特数，上面四条都成立。（双射 S 盒的代数次数一定不超过 $m-1$。）

### 1.4 构造密码算法的线性近似 { #s1-4 }

下面以 4 轮 CipherFour（把 S 盒换成上面的 S 盒，结构见[算法附录](<appendix-algorithms.md>)）为例，连接 S 盒的线性近似，构造整个算法的线性近似。

用 $\mathcal X_i$ 表示 S 盒输入/输出的线性近似表达式。设 $\mathcal X_1,\mathcal X_2,\mathcal X_3$ 相互独立，$\Pr(\mathcal X_1\oplus\mathcal X_2=0)=1/2+\varepsilon_{1,2}$，$\Pr(\mathcal X_2\oplus\mathcal X_3=0)=1/2+\varepsilon_{2,3}$。若 $\mathcal X_1\oplus\mathcal X_2$ 与 $\mathcal X_2\oplus\mathcal X_3$ 也相互独立，由堆积引理，

$$
\Pr(\mathcal X_1\oplus\mathcal X_3=0)=\Pr\big((\mathcal X_1\oplus\mathcal X_2)\oplus(\mathcal X_2\oplus\mathcal X_3)=0\big)=\frac12+2\varepsilon_{1,2}\varepsilon_{2,3},
$$

即 $\varepsilon_{1,3}=2\varepsilon_{1,2}\varepsilon_{2,3}$。这里 $\mathcal X_1\oplus\mathcal X_2=0$、$\mathcal X_2\oplus\mathcal X_3=0$ 类似于 S 盒的线性近似，$\mathcal X_1\oplus\mathcal X_3=0$ 类似于消去中间状态 $\mathcal X_2$ 后的线性近似。

!!! definition "定义（线性活跃 S 盒）"
    在线性路线中，输入掩码非零的 S 盒称为**线性活跃 S 盒**。

记第 $i$ 轮 S 盒输入为 $Z^i$，输出为 $Y^i$，第 $j$ 个 S 盒为 $S^i_j$，下标为比特位置。选取下面 4 个 S 盒线性近似，可以构造 3 轮线性路线：

$$
\begin{aligned}
S_1^0:&\ Z_4^1\oplus Z_6^1\oplus Z_7^1\oplus Y_5^1=0, &&\text{偏差 }1/4;\\
S_1^1:&\ Z_5^2\oplus Y_5^2\oplus Y_{13}^2=0, &&\text{偏差 }-1/4;\\
S_1^2:&\ Z_5^3\oplus Y_5^3\oplus Y_{13}^3=0, &&\text{偏差 }-1/4;\\
S_3^2:&\ Z_{13}^3\oplus Y_7^3\oplus Y_{15}^3=0, &&\text{偏差 }-1/4.
\end{aligned}
$$

注意到 $Z^1=P\oplus K^0$，由 $S_1^0$ 的近似，

$$
Y_5^1=(P_4\oplus K_4^0)\oplus(P_6\oplus K_6^0)\oplus(P_7\oplus K_7^0)\tag{2}
$$

成立的概率为 $3/4$。又 $Z_5^2=Y_5^1\oplus K_5^1$，代入第二轮 $S_1^1$ 的近似，

$$
Y_5^1\oplus K_5^1=Y_5^2\oplus Y_{13}^2\tag{3}
$$

成立的概率为 $1/4$。由堆积引理，把 (2) 和 (3) 结合，

$$
Y_5^2\oplus Y_{13}^2\oplus P_4\oplus P_6\oplus P_7\oplus K_4^0\oplus K_6^0\oplus K_7^0\oplus K_5^1=0\tag{4}
$$

成立的概率为 $1/2+2(3/4-1/2)(1/4-1/2)=3/8$。

!!! note "注"
    推导中用到了 S 盒线性近似相互独立的假设，这并不严格成立，但对大多数算法在实践中都适用。

第三轮注意到 $Z_5^3=Y_5^2\oplus K_5^2$，$Z_{13}^3=Y_{13}^2\oplus K_{13}^2$，结合 $S_1^2$ 和 $S_3^2$ 得

$$
Y_5^3\oplus Y_7^3\oplus Y_{13}^3\oplus Y_{15}^3\oplus Y_5^2\oplus Y_{13}^2\oplus K_5^2\oplus K_{13}^2=0,\tag{5}
$$

成立的概率为 $1/2+2(1/4-1/2)^2=5/8$。把 (4) 与 (5) 结合，就得到覆盖 4 个 S 盒的线性近似表达式。再利用 $Y_j^3=Z_j^4\oplus K_j^3$，可以改写为

$$
P_4\oplus P_6\oplus P_7\oplus Z_5^4\oplus Z_7^4\oplus Z_{13}^4\oplus Z_{15}^4\oplus\Sigma_K=0,\tag{6}
$$

其中

$$
\Sigma_K=K_4^0\oplus K_6^0\oplus K_7^0\oplus K_5^1\oplus K_5^2\oplus K_{13}^2\oplus K_5^3\oplus K_7^3\oplus K_{13}^3\oplus K_{15}^3.
$$

!!! note "注"
    $\Sigma_K$ 在分析中是取值未知的常值 $0$ 或 $1$，它只影响偏差的符号，不影响绝对值。

由堆积引理，(6) 成立的概率为 $1/2+2^3(3/4-1/2)(1/4-1/2)^3=15/32$。既然 $\Sigma_K$ 是固定值，线性近似表达式

$$
P_4\oplus P_6\oplus P_7\oplus Z_5^4\oplus Z_7^4\oplus Z_{13}^4\oplus Z_{15}^4=0
$$

成立的概率为 $15/32$ 或 $17/32$，偏差为 $\pm1/32$。若目标算法只有三轮，就可以用这个近似恢复 $\Sigma_K$ 这 1 比特密钥信息。

!!! theorem "算法（Matsui 算法 1）"
    对 $R$ 轮密码，设已找到概率 $p$ 明显偏离 $1/2$ 的 $R$ 轮线性近似 $\alpha\cdot P\oplus\beta\cdot C=\gamma\cdot K$。给定 $N$ 个已知明密文对：

    1. 用计数器 $\mathrm{Cnt}$ 记录满足 $\alpha\cdot P\oplus\beta\cdot C=0$ 的明密文对数；
    2. 当 $p>1/2$ 时，若 $\mathrm{Cnt}>N/2$，则 $\gamma\cdot K=0$，否则 $\gamma\cdot K=1$；当 $p<1/2$ 时反之。

算法 1 的成功率与 $N$ 和 $|\varepsilon|=|p-1/2|$ 密切相关，评估方法见 [§1.7](#s1-7)。

### 1.5 恢复更多子密钥信息 { #s1-5 }

对 $R$ 轮密码，一旦发现有效的 $R-1$ 轮线性近似，就可以尝试恢复最后一轮子密钥。若 $K_{r-1}$ 已知，可以把密文部分解密一轮，构造 $R-1$ 轮线性近似表达式

$$
\alpha\cdot P\oplus\beta\cdot F^{-1}_{K_{r-1}}(C)=\gamma\cdot K.\tag{7}
$$

若代入正确的 $K_{r-1}$，等式成立的概率较高；代入错误的候选值，有效性明显下降。基于这一观测，可以用最大似然思想恢复 $K_{r-1}$ 和 $\gamma\cdot K$。

!!! theorem "算法（Matsui 算法 2）"
    对 $R$ 轮密码，设已找到概率 $p$ 明显偏离 $1/2$ 的 $R-1$ 轮线性近似 (7)。给定 $N$ 个已知明密文对：

    1. 对 $K_{r-1}$ 的每个候选值 $K_{r-1}^{(i)}$，用计数器 $\mathrm{Cnt}_i$ 记录满足 $\alpha\cdot P\oplus\beta\cdot F^{-1}_{K^{(i)}_{r-1}}(C)=0$ 的明密文对数；
    2. 记 $\mathrm{Cnt}_{\max}$、$\mathrm{Cnt}_{\min}$ 为所有计数器的最大值和最小值：
        - 若 $|\mathrm{Cnt}_{\max}-N/2|>|\mathrm{Cnt}_{\min}-N/2|$，采纳 $\mathrm{Cnt}_{\max}$ 对应的候选，且 $p>1/2$ 时 $\gamma\cdot K=0$，否则 $\gamma\cdot K=1$；
        - 若 $|\mathrm{Cnt}_{\max}-N/2|<|\mathrm{Cnt}_{\min}-N/2|$，采纳 $\mathrm{Cnt}_{\min}$ 对应的候选，且 $p>1/2$ 时 $\gamma\cdot K=1$，否则 $\gamma\cdot K=0$。

设两个算法中线性近似的偏差为 $\varepsilon$，Matsui 证明了所需的已知明文数 $N_{\mathrm L}$ 与 $\varepsilon^{-2}$ 成正比，实际中通常需要 $c\cdot\varepsilon^{-2}$ 个已知明文，$c$ 为较小的正整数。精确的评估同样见 [§1.7](#s1-7)。

!!! problem "习题"
    上面 3 轮线性近似的偏差为 $\pm1/32$。若用它对 4 轮算法实施 Matsui 算法 2，粗略估计需要多少已知明文？需要猜测最后一轮的哪些密钥比特？

??? solution "解"
    $\varepsilon^{-2}=2^{10}$，所以需要几千个已知明文，例如 $c=8$ 时约 $2^{13}$。表达式 (6) 用到第 4 轮 S 盒的输入比特 $Z_5^4,Z_7^4,Z_{13}^4,Z_{15}^4$。经过比特置换后，它们分别来自第 4 轮的哪些 S 盒取决于末轮结构：对附录中的 CipherFour（末轮没有置换），只需猜测这 4 个比特所在 S 盒对应的末轮密钥半字节，即 $k_{5,1}$ 和 $k_{5,3}$，共 8 比特，就能把这 4 个比特部分解密出来。

### 1.6 统计假设检验 { #s1-6 }

假设检验是所有线性分析模型的基础，先简要回顾。设两个随机变量 $T_W$、$T_R$，分布函数为 $F_W$、$F_R$，阈值 $\Theta$ 满足 $F_W(\Theta)>F_R(\Theta)$。获得测试值 $T$ 后：

- 若 $T>\Theta$，认为 $T$ 来自 $T_R$ 的分布；
- 若 $T\le\Theta$，认为 $T$ 来自 $T_W$ 的分布。

这会产生两类错误：

- **存伪错误（第一类错误）**：把 $T_W$ 中的数据判为来自 $T_R$，概率记为 $\varepsilon_0$；
- **弃真错误（第二类错误）**：把 $T_R$ 中的数据判为来自 $T_W$，概率记为 $\varepsilon_1$。

由分布函数，$\varepsilon_0=1-F_W(\Theta)$，$\varepsilon_1=F_R(\Theta)$，于是 $\Theta=F_W^{-1}(1-\varepsilon_0)=F_R^{-1}(\varepsilon_1)$，进而

$$
\varepsilon_1=F_R\big(F_W^{-1}(1-\varepsilon_0)\big).\tag{8}
$$

在线性分析中，分布函数取决于样本量，样本越大，越小的 $\varepsilon_0,\varepsilon_1$ 就能满足 (8)。反过来，给定一个错误概率，可以找到合适的样本量和另一个错误概率满足 (8)，并算出阈值。

现设 $T_W,T_R$ 是正态分布，均值 $\mu_W<\mu_R$，标准差 $\sigma_W,\sigma_R$。则

$$
\varepsilon_0=1-\Phi\left(\frac{\Theta-\mu_W}{\sigma_W}\right),\qquad
\varepsilon_1=\Phi\left(\frac{\Theta-\mu_R}{\sigma_R}\right)=1-\Phi\left(\frac{\mu_R-\Theta}{\sigma_R}\right),
$$

$\Phi$ 为标准正态分布函数。记 $\zeta_0,\zeta_1$ 为标准正态分布的 $1-\varepsilon_0$ 与 $1-\varepsilon_1$ 分位数，即 $\Phi(\zeta_0)=1-\varepsilon_0$，$\Phi(\zeta_1)=1-\varepsilon_1$，则阈值 $\Theta=\mu_R-\zeta_1\sigma_R=\mu_W+\zeta_0\sigma_W$，相应地

$$
1-\varepsilon_1=\Phi(\zeta_1)=\Phi\left(\frac{\mu_R-\mu_W-\sigma_W\Phi^{-1}(1-\varepsilon_0)}{\sigma_R}\right).\tag{9}
$$

这就给出了假设检验的成功率。

### 1.7 复杂度与成功率的评估 { #s1-7 }

统计攻击的目的是根据已知的统计属性确定部分密钥：只有正确的密钥候选满足该属性，不满足的错误候选被丢弃。所以线性分析也属于统计攻击，优势和成功率是衡量它的重要指标。

!!! definition "定义（优势与成功率）"
    若筛选过程中被丢弃的密钥比例为 $1-2^{-a}$（即留下 $2^{-a}$），则称 $a$ 为攻击的**优势 (advantage)**。$a$ 也可以理解为筛选确定的密钥比特数，通常取正值。

    正确密钥在筛选中存活的概率 $P_S$ 称为攻击的**成功率**。

估计复杂度需要讨论攻击中随机变量的分布，而分布又受获取样本的方式影响。

!!! definition "定义（两种抽样方式）"
    若明密文对 $(P,C)$ 通过随机接收获得，称为**已知明文抽样**；若明密文对满足随机且不重复，称为**不同已知明文抽样**。为统一处理，引入

    $$
    B=\begin{cases}1, & \text{已知明文抽样},\\ \dfrac{2^n-N}{2^n-1}, & \text{不同已知明文抽样}.\end{cases}
    $$

!!! note "注"
    两种抽样分别对应统计中的有放回和不放回抽样。不同已知明文抽样要以很高的存储为代价，所以线性分析中更常用已知明文抽样。

设获得了 $N$ 个已知明密文对构成的样本 $\mathcal D$，用 $Z$ 表示满足 $\alpha\cdot P\oplus\beta\cdot F^{-1}_{K_{r-1}}(C)=\gamma\cdot K$ 的样本数，它与 $\mathcal D$、$K$、$K_{r-1}$ 以及攻击中的猜测值 $\kappa$ 有关。经典的 Matsui 算法依赖以下假设：

1. 所用的 $R-1$ 轮线性近似 $(\alpha,\beta)$ 存在一条起主导作用的路线 $\tau=(\alpha_0,\cdots,\alpha_{r-1})$，$\alpha=\alpha_0$，$\beta=\alpha_{r-1}$，我们把这条路线的相关度当作线性近似的相关度：$c(\alpha,\beta)\approx\prod_{i=0}^{r-2}c(\alpha_i,\alpha_{i+1})$。
2. 目标算法是密钥交替算法，即轮函数形如 $F_{K_i}(X)=F(X\oplus K_i)$。此时 $\prod c(\alpha_i,\alpha_{i+1})=(-1)^{\tau\cdot K}\rho_\tau$，$\rho_\tau$ 与密钥无关，$(-1)^{\tau\cdot K}$ 只影响符号。记 $c=|\rho_\tau|$。

Matsui 算法 2 的原始版本基于最大似然，但后来的多重/多维/零相关线性分析多基于假设检验，在这个框架下更容易把它们统一起来。所以我们把算法 2 改写为基于假设检验的版本：

!!! theorem "算法（Matsui 算法 2，假设检验版）"
    1. 对 $K_{r-1}$ 的每个候选 $\kappa$，用计数器 $\mathrm{Cnt}$ 记录满足 $\alpha\cdot P\oplus\beta\cdot F_\kappa^{-1}(C)=0$ 的明密文对数；
    2. 计算经验相关度 $\hat c=2\,\mathrm{Cnt}/N-1$，作为检验统计量；
    3. 选取阈值 $\Theta$：若 $|\hat c|>\Theta$，认为 $\kappa$ 是 $K_{r-1}$ 的正确候选，否则为错误候选；
    4. 对与 $K_{r-1}$ 的正确候选兼容的主密钥，用一个或多个明密文对作加密匹配测试，恢复主密钥。

为导出统计量 $\hat c=2Z/N-1$ 的分布，还需要两条假设：

- **正确密钥等价假设**：若 $\kappa$ 是正确候选，则已知明文抽样下 $Z$ 服从二项分布，均值 $Np$，方差 $Np(1-p)$，其中 $p=(c(\alpha,\beta)+1)/2$；不同已知明文抽样下 $Z$ 服从超几何分布，均值 $Np$，方差 $Np(1-p)\frac{2^n-N}{2^n-1}$。由中心极限定理，$\hat c$ 近似服从正态分布：

    $$
    \mathbb E(\hat c)=\pm c,\qquad\mathrm{Var}(\hat c)=\frac{1-c^2}{N}B.
    $$

- **错误密钥随机假设**：若 $\kappa$ 不是正确候选，可以认为数据不是从密码算法获得的，相关度没有保证。此时 $Z$ 的 $p=1/2$，$\hat c$ 近似服从

    $$
    \mathbb E(\hat c)=0,\qquad\mathrm{Var}(\hat c)=\frac BN.
    $$

于是有三个正态分布：错误密钥的分布在 $0$ 处，正确密钥的分布在 $-c$ 或 $c$ 处。对一个固定密钥，实际只存在两个分布（中间的和两侧之一），但分析者不知道是哪一侧，这意味着两侧都可能接受错误密钥。

记 $T_W$、$T_R$ 为错误和正确候选对应的经验相关度分布，则 $\mu_W=0$，$\mu_R=\pm c$，$\sigma_W^2=B/N$，$\sigma_R^2=B(1-c^2)/N$。用 $\alpha_0$ 表示错误密钥被接受的概率，$\alpha_1$ 表示正确密钥被拒绝的概率，由定义 $\alpha_0=2^{-a}$，$\alpha_1=1-P_S$。由于两侧都可能接受错误密钥，两类错误概率应满足

$$
\varepsilon_0=\frac12\alpha_0=2^{-(a+1)},\qquad\varepsilon_1=\alpha_1=1-P_S,
$$

即

$$
\zeta_0=\Phi^{-1}\left(1-2^{-(a+1)}\right)\triangleq\varphi_{a+1},\qquad\zeta_1=\Phi^{-1}(P_S)\triangleq\varphi_{P_S}.
$$

代入 (9)，得

$$
\Theta=\varphi_{a+1}\sqrt{B/N}=c-\varphi_{P_S}\sqrt{B(1-c^2)/N},\qquad
P_S=\Phi\left(\frac{c-\varphi_{a+1}\sqrt{B/N}}{\sqrt{B(1-c^2)/N}}\right).
$$

$\alpha_0,\alpha_1$ 取定后，就可以解出数据量 $N$ 和阈值 $\Theta$。

!!! theorem "定理（线性分析的数据复杂度，Blondeau–Nyberg）"
    设 $R$ 轮分组密码存在一个 $R-1$ 轮线性近似，它有一条起主导作用的路线，相关度绝对值为 $c$。在正确密钥等价假设和错误密钥随机假设下，若已知明文数（$B=1$）满足

    $$
    N\ge\left(\frac{\varphi_{a+1}+\sqrt{1-c^2}\,\varphi_{P_S}}{c}\right)^2,
    $$

    则线性分析的成功率为 $P_S$，优势为 $a$。

!!! problem "习题"
    导出上面定理中数据量 $N$ 的计算公式。

??? solution "解"
    取 $B=1$，阈值的两个表达式相等：

    $$
    \frac{\varphi_{a+1}}{\sqrt N}=c-\frac{\varphi_{P_S}\sqrt{1-c^2}}{\sqrt N}
    \iff\sqrt N=\frac{\varphi_{a+1}+\sqrt{1-c^2}\,\varphi_{P_S}}{c}.
    $$

    $N$ 更大时，两个分布更集中，同样的阈值下成功率只会更高，所以条件是 $N\ge$ 右端的平方。$c$ 很小时 $\sqrt{1-c^2}\approx1$，得到常用的近似 $N\approx(\varphi_{a+1}+\varphi_{P_S})^2/c^2$，与 Matsui 的 $N\propto\varepsilon^{-2}$ 一致（$c=2\varepsilon$）。

!!! note "注"
    教材印刷的公式在右端没有平方，应该是排版漏掉了；由上面的推导可知需要平方，量纲上也才与 $c^{-2}$ 吻合。

### 1.8 进一步阅读 { #s1-8 }

- **复杂度模型之间的关系**：上面的模型基于 Blondeau 和 Nyberg 的工作；Selçuk 基于顺序统计量和折叠正态分布的模型，被 Blondeau 与 Nyberg 指出是他们的模型在 $1-c^2\approx1$ 时的特例。
- **两条假设对模型的影响**：很长一段时间里，人们认为所有正确/错误密钥的统计量分布都相同。近几年发现，密钥取值对经验相关度的方差有影响，并给出了修正版本的假设和更精确的复杂度模型。
- **线性壳效应**：Matsui 把主导路线的相关度当作线性近似的相关度，但当同一个线性近似存在多条不可忽略的路线，且它们涉及的密钥比特不同时，各路线的相关度随密钥取值产生建设性或破坏性的干扰，甚至使线性壳的相关度为零。这一效应由 Nyberg 在 EUROCRYPT 1994 首次提出。若各路线涉及的密钥集合相互独立，聚集效应可能大大降低线性壳的平均相关度，从而降低攻击的成功率。
- **最优路线的搜索**：堆积引理给出了计算给定路线偏差的工具，但如何找到最优路线仍未解决。Matsui 在分析 DES 的第二篇论文中提出了基于递归的搜索算法：已知 $i$ 轮最优偏差（$1\le i\le R-1$），可以高效推导 $R$ 轮最优路线。

最后比较一下线性分析和差分分析。二者有很多相似之处：

| 差分分析 | 线性分析 |
|---|---|
| 差分路线 | 线性路线 |
| 差分分布表 DDT | 线性近似表 LAT |
| 匹配差分，概率相乘 | 匹配掩码，偏差相乘（堆积引理） |
| 差分（差分闭包） | 线性壳 |
| 最优差分路线搜索 | 最优线性路线搜索 |

两者在操作上也有对偶性：异或操作和分支操作对差分和掩码的作用互为对偶。（异或处差分直接相加、掩码被复制到两个输入；分支处差分被复制、掩码相加。）

一个显著差异是**线性路线的偏差带符号**。两条输入、输出掩码相同、偏差绝对值相等但符号相反的路线会相互抵消，得到的线性壳可能是零偏差；而差分路线的概率都是非负的，不存在相互抵消的问题。

## 2. 多重线性分析 { #s2 }

线性分析提出后的第二年，Kaliski 和 Robshaw 就提出了用多个线性近似推广线性分析的想法。但他们对线性近似加了很强的限制，满足条件的近似额外提供的信息往往可以忽略。多重线性分析第一个具有一般性的统计模型由 Biryukov 等在 CRYPTO 2004 上给出。

### 2.1 多重线性分析框架 { #s2-1 }

多重线性分析要求所用的线性近似相互独立。

!!! definition "定义（线性近似的独立性）"
    给定 $\ell$ 个线性近似 $(\alpha_0,\beta_0),\cdots,(\alpha_{\ell-1},\beta_{\ell-1})$，若找不到不全为零的 $a_0,\cdots,a_{\ell-1}\in\mathbb F_2$ 使

    $$
    a_0\cdot(\alpha_0,\beta_0)\oplus a_1\cdot(\alpha_1,\beta_1)\oplus\cdots\oplus a_{\ell-1}\cdot(\alpha_{\ell-1},\beta_{\ell-1})=0,
    $$

    则称这 $\ell$ 个线性近似**相互独立**。（即作为 $\mathbb F_2^{2n}$ 中的向量线性无关。）

多重线性分析的优势在于可以综合不同线性近似的信息做判断，下面的“容量”就是为了收集所有线性近似的信息而引入的。

!!! definition "定义（容量）"
    $n$ 比特分组密码 $E_K$ 的 $\ell$ 个线性近似的**容量 (capacity)** 定义为它们相关度的平方和：

    $$
    C(K)=\sum_{i=0}^{\ell-1}\big(c(\alpha_i,\beta_i)(K)\big)^2.
    $$

对 $R$ 轮算法，若找到 $\ell$ 个相互独立且容量较大的 $R-1$ 轮线性近似，猜测最后一轮子密钥 $K_{r-1}$ 并部分解密一轮，得到

$$
\alpha_i\cdot P\oplus\beta_i\cdot F^{-1}_{K_{r-1}}(C)=\gamma_i\cdot K,\qquad0\le i\le\ell-1.\tag{10}
$$

代入正确的候选时经验容量较大，代入错误的候选时经验容量较小。

!!! theorem "算法（多重线性分析）"
    给定 $N$ 个已知明密文对构成的样本 $\mathcal D$：

    1. 对 $K_{r-1}$ 的每个候选 $\kappa$，建 $\ell$ 个计数器 $\mathrm{Cnt}_i$，记录满足 $\alpha_i\cdot P\oplus\beta_i\cdot F_\kappa^{-1}(C)=0$ 的明密文对数；
    2. 计算经验相关度 $\hat c_i(\mathcal D,K,K_{r-1},\kappa)=2\,\mathrm{Cnt}_i/N-1$，以

        $$
        T_{\mathrm{MP}}=N\sum_{i=0}^{\ell-1}\hat c_i(\mathcal D,K,K_{r-1},\kappa)^2
        $$

        为检验统计量；
    3. 选取阈值 $\Theta$：若 $T_{\mathrm{MP}}>\Theta$，认为 $\kappa$ 是正确候选，否则为错误候选；
    4. 对与正确候选兼容的主密钥作加密匹配测试，恢复主密钥。

下面记 $K_W$ 为 $\kappa\ne K_{r-1}$ 的组合，$K_R$ 为 $\kappa=K_{r-1}$ 的组合，分别讨论 $T_{\mathrm{MP}}$ 的分布。

### 2.2 错误密钥下 $T_{\mathrm{MP}}$ 的分布 { #s2-2 }

[§1.7](#s1-7) 的错误密钥随机假设认为 $\hat c$ 的分布与错误密钥的取值无关。但近年的实验观察到，密钥变化对 $\hat c$ 的分布影响较大。Bogdanov 和 Tischhauser 把这部分影响转化为随机向量函数，给出了修订版假设。

!!! theorem "假设（修订版错误密钥随机假设）"
    在错误密钥下，$\hat c(\mathcal D,K_W)$ 在极限情况下服从正态分布：

    $$
    \mathbb E_{\mathcal D,K_W}\big(\hat c(\mathcal D,K_W)\big)=0,\qquad
    \mathrm{Var}_{\mathcal D,K_W}\big(\hat c(\mathcal D,K_W)\big)=\frac BN+2^{-n}.
    $$

    （期望和方差对 $\mathcal D\times K_W$ 的所有组合求取。）

把 $T_{\mathrm{MP}}$ 变形为

$$
T_{\mathrm{MP}}=N\sum_{i=0}^{\ell-1}\hat c_i(\mathcal D,K_W)^2=(B+2^{-n}N)\sum_{i=0}^{\ell-1}\frac{\hat c_i(\mathcal D,K_W)^2}{B/N+2^{-n}}.
$$

由修订版假设，$\hat c_i/\sqrt{B/N+2^{-n}}\sim\mathcal N(0,1)$；线性近似的独立性又使各 $\hat c_i$ 相互独立。所以

$$
\frac{T_{\mathrm{MP}}}{B+2^{-n}N}\sim\chi_\ell^2.
$$

!!! theorem "定理（错误密钥下 $T_{\mathrm{MP}}$ 的分布）"
    在修订版错误密钥随机假设下，$T_{\mathrm{MP}}$ 是自由度为 $\ell$ 的卡方分布的常数倍，且

    $$
    \mathbb E(T_{\mathrm{MP}})=B\ell+N2^{-n}\ell,\qquad\mathrm{Var}(T_{\mathrm{MP}})=\frac2\ell\left(B\ell+N2^{-n}\ell\right)^2.
    $$

!!! theorem "推论"
    若用不同已知明文抽样，且 $N$ 充分大，则 $\mathbb E(T_{\mathrm{MP}})\approx\ell$，$\mathrm{Var}(T_{\mathrm{MP}})\approx2\ell$。

!!! problem "习题"
    导出上面的推论。

??? solution "解"
    不同已知明文抽样下 $B=\frac{2^n-N}{2^n-1}$，于是

    $$
    B+N2^{-n}=\frac{2^n-N}{2^n-1}+\frac N{2^n}=\frac{2^n(2^n-N)+N(2^n-1)}{2^n(2^n-1)}=\frac{2^{2n}-N}{2^{2n}-2^n}\approx1
    $$

    （只要 $N\ll2^{2n}$，而 $N\le2^n$ 总成立）。代入定理即得 $\mathbb E\approx\ell$，$\mathrm{Var}\approx\frac2\ell\ell^2=2\ell$。可见这时错误密钥的影响和抽样方式的影响恰好抵消，$T_{\mathrm{MP}}$ 近似就是 $\chi^2_\ell$。

### 2.3 正确密钥下 $T_{\mathrm{MP}}$ 的分布 { #s2-3 }

正确密钥下 $\hat c$ 的分布同样受密钥取值影响。先回顾线性壳定理。

!!! theorem "定理（线性壳定理）"
    对 $n$ 比特迭代分组密码 $E_K$ 的线性近似 $(\alpha,\beta)$，记

    $$
    c(\alpha,\beta)(K)=\frac{\#\{X:\alpha\cdot X\oplus\beta\cdot E_K(X)=0\}}{2^{n-1}}-1,\qquad
    c(\alpha,\tau,\beta)=\frac{\#\{X:\alpha\cdot X\oplus\tau\cdot K\oplus\beta\cdot E_K(X)=0\}}{2^{n-1}}-1,
    $$

    则 $c(\alpha,\beta)(K)^2$ 在 $K$ 上的平均等于 $c(\alpha,\tau,\beta)^2$ 对 $\tau$ 求和：

    $$
    2^{-|K|}\sum_Kc(\alpha,\beta)(K)^2=\sum_\tau c(\alpha,\tau,\beta)^2.
    $$

!!! definition "定义（期望线性势）"
    称 $\mathrm{ELP}(\alpha,\beta)=\sum_\tau c(\alpha,\tau,\beta)^2$ 为线性近似 $(\alpha,\beta)$ 的**期望线性势 (expected linear potential)**。

!!! theorem "假设（修订版正确密钥等价假设）"
    在正确密钥下，$c(\alpha,\beta)(K)$ 在极限情况下服从 $\mathcal N(\pm c,\ \mathrm{ELP}-c^2)$。

在这一假设下，Blondeau 和 Nyberg 导出 $\hat c(\mathcal D,K_R)$ 服从正态分布，

$$
\mathbb E_{\mathcal D,K_R}\big(\hat c(\mathcal D,K_R)\big)=\pm c,\qquad\mathrm{Var}_{\mathcal D,K_R}\big(\hat c(\mathcal D,K_R)\big)=\frac BN+\mathrm{ELP}-c^2.
$$

为处理平方和，还需要一条假设。

!!! theorem "假设（多重线性密钥方差假设）"
    $T_{\mathrm{MP}}$ 中的 $\hat c_i(\mathcal D,K_R)$ 是相互独立的正态随机变量，期望为 $c(\alpha_i,\beta_i)(K)$，方差都相同。

对固定的 $K$，记 $c_i(K)=c(\alpha_i,\beta_i)(K)=\mathbb E_{\mathcal D}(\hat c_i(\mathcal D,K_R))$，$c_i=\mathbb E_K(c_i(K))$，$\mathrm{ELP}_i=\mathrm{ELP}(\alpha_i,\beta_i)$，则 $\ell$ 个线性近似的容量和期望相关度的容量分别为

$$
C=\mathbb E_K(C(K))=\sum_{i=0}^{\ell-1}\mathrm{ELP}_i,\qquad C_0=\sum_{i=0}^{\ell-1}c_i^2.
$$

（一般 $\mathbb E_K(c_i(K)^2)\ne\mathbb E_K(c_i(K))^2$，所以二者不同。）

!!! theorem "定理（正确密钥下 $T_{\mathrm{MP}}$ 的分布）"
    在修订版正确密钥等价假设和多重线性密钥方差假设下，

    $$
    Q=\frac{T_{\mathrm{MP}}}{B+\frac N\ell(C-C_0)}\sim\chi_\ell^2(\delta),\qquad\delta=\frac{NC_0}{B+\frac N\ell(C-C_0)},
    $$

    即服从非中心参数为 $\delta$ 的非中心卡方分布。进而

    $$
    \mathbb E_{\mathcal D,K_R}(T_{\mathrm{MP}})=B\ell+NC,\qquad
    \mathrm{Var}_{\mathcal D,K_R}(T_{\mathrm{MP}})=\frac2\ell\left((B\ell+NC)^2-(NC_0)^2\right).
    $$

!!! problem "习题"
    由定理的第一部分导出 $T_{\mathrm{MP}}$ 的期望和方差。

??? solution "解"
    非中心卡方分布 $\chi^2_\ell(\delta)$ 的期望为 $\ell+\delta$，方差为 $2(\ell+2\delta)$。记 $s=B+\frac N\ell(C-C_0)$，$T_{\mathrm{MP}}=sQ$，则

    $$
    \mathbb E(T_{\mathrm{MP}})=s(\ell+\delta)=s\ell+NC_0=B\ell+N(C-C_0)+NC_0=B\ell+NC.
    $$

    $$
    \mathrm{Var}(T_{\mathrm{MP}})=2s^2(\ell+2\delta)=2s^2\ell+4sNC_0.
    $$

    另一方面，$B\ell+NC=s\ell+NC_0$，所以

    $$
    \frac2\ell\left((B\ell+NC)^2-(NC_0)^2\right)=\frac2\ell\left((s\ell+NC_0)^2-(NC_0)^2\right)=\frac2\ell\,s\ell\,(s\ell+2NC_0)=2s^2\ell+4sNC_0,
    $$

    两式相等。

!!! note "注"
    $T_{\mathrm{MP}}$ 的分布在两种情况下可以简化：$\ell>50$ 时可以用正态分布近似；若 $C_0=0$，则 $T_{\mathrm{MP}}\sim\Gamma\left(\frac\ell2,\ 2\left(B+N\frac C\ell\right)\right)$。

### 2.4 复杂度评估 { #s2-4 }

$T_{\mathrm{MP}}$ 在两种密钥下服从不同的卡方分布，于是可以用 [§1.6](#s1-6) 的假设检验评估复杂度。实践中 $C_0$ 很难评估，通常假设 $C_0=0$；多重线性分析中线性近似的数量通常大于 50，卡方分布可以用正态分布近似。

!!! theorem "推论（多重线性分析的数据量）"
    设线性近似数 $\ell>50$ 且 $C_0=0$，用卡方分布的正态近似，已知明文抽样与不同已知明文抽样所需的数据量分别为

    $$
    N^{\mathrm{KP}}\approx\frac{\sqrt{2\ell}(\varphi_{P_S}+\varphi_a)}{|C_R-C_W|-\sqrt{2/\ell}\,(C_W\varphi_a+C_R\varphi_{P_S})},
    $$

    $$
    N^{\mathrm{DKP}}\approx\frac{\sqrt{2\ell}(\varphi_{P_S}+\varphi_a)}{|C_R-C_W|-\sqrt{2/\ell}\,(C_W\varphi_a+C_R\varphi_{P_S})+2^{-n}\sqrt{2\ell}(\varphi_{P_S}+\varphi_a)},
    $$

    其中 $C_R=\mathbb E_K(C(K))$，$C_W=\mathbb E_{K_W}(C(K_W))$。

三种复杂度：

- **数据**：自选成功率 $P_S$ 和优势 $a$，由上面的推论算出。
- **时间**：收集数据的时间（基本等于数据复杂度）、步骤 1 的时间（可以融入各种密钥恢复技巧降低）、步骤 4 的时间（由优势 $a$ 或第一类错误 $\varepsilon_0$ 决定，$a$ 越大，要检测的候选越少）。
- **存储**：主要是步骤 1 存中间状态和步骤 4 存正确候选。

正确的多重线性攻击，时间复杂度不会小于数据复杂度。

## 3. 多维线性分析 { #s3 }

多重线性分析要求线性近似相互独立，导致许多好的近似因不满足独立性而无法使用。多维线性分析去掉了这一约束，但要求所用的近似构成线性空间：$\ell$ 个非零线性近似 $(\alpha_i,\beta_i)$ 加上零向量构成一个 $s$ 维线性空间 $\mathbf A\times\mathbf B$，从而 $\ell=2^s-1$。此时容量有如下等价定义。

!!! definition "定义（容量的等价定义）"
    若 $(\alpha_0,\beta_0),\cdots,(\alpha_{\ell-1},\beta_{\ell-1})$ 加上零向量构成 $s$ 维线性空间 $\mathbf A\times\mathbf B$，则

    $$
    C(K)=2^s\sum_{\eta=0}^{2^s-1}\left(p_\eta(K)-2^{-s}\right)^2,
    $$

    其中 $p_\eta(K)$ 是 $(X,E_K(X))$ 限制在空间 $\mathbf A\times\mathbf B$ 上取值为 $\eta$ 的概率。

!!! problem "习题"
    证明容量等价定义中的表达式。

??? solution "解"
    记 $V=\mathbf A\times\mathbf B$，把 $(X,E_K(X))$ 在 $V$ 上的“限制”理解为它在 $s$ 个基掩码下的取值，得到 $s$ 比特的随机变量 $Z$，$p_\eta=\Pr(Z=\eta)$。对 $\mathbb F_2^s$ 上的非零 $u$，$u\cdot Z$ 正好对应 $V$ 中的一个非零线性近似，其相关度为

    $$
    c_u=\sum_\eta(-1)^{u\cdot\eta}p_\eta=\hat p(u).
    $$

    由 Parseval 等式（Walsh 变换），

    $$
    \sum_{u}\hat p(u)^2=2^s\sum_\eta p_\eta^2.
    $$

    $u=0$ 项为 $\hat p(0)^2=1$，所以

    $$
    \sum_{u\ne0}c_u^2=2^s\sum_\eta p_\eta^2-1=2^s\sum_\eta\left(p_\eta-2^{-s}\right)^2,
    $$

    最后一步用了 $\sum_\eta p_\eta=1$：$2^s\sum(p_\eta-2^{-s})^2=2^s\sum p_\eta^2-2\sum p_\eta+1=2^s\sum p_\eta^2-1$。左边就是 $\ell=2^s-1$ 个线性近似的容量。

### 3.1 多维线性分析框架 { #s3-1 }

猜测 $K_{r-1}$ 并部分解密，考察 $(P,F^{-1}_{K_{r-1}}(C))$ 限制在 $\mathbf A\times\mathbf B$ 上的分布：猜对时经验容量较大，猜错时较小。

!!! theorem "算法（多维线性分析）"
    1. 对 $K_{r-1}$ 的每个候选 $\kappa$，建 $2^s$ 个计数器 $\mathrm{Cnt}_i$，记录 $(P,F_\kappa^{-1}(C))$ 限制在 $\mathbf A\times\mathbf B$ 上取值为 $i$ 的明密文对数；
    2. 以

        $$
        T_{\mathrm{MD}}=\sum_{i=0}^{2^s-1}\frac{(\mathrm{Cnt}_i-N2^{-s})^2}{N2^{-s}}
        $$

        为检验统计量（这正是 $\chi^2$ 检验的统计量）；
    3. 若 $T_{\mathrm{MD}}>\Theta$，认为 $\kappa$ 是正确候选，否则为错误候选；
    4. 对兼容的主密钥作加密匹配测试。

### 3.2 $T_{\mathrm{MD}}$ 的分布与复杂度 { #s3-2 }

由容量的等价定义，

$$
T_{\mathrm{MD}}=N\sum_{i=0}^{\ell-1}\hat c_i(\mathcal D,K,K_{r-1},\kappa)^2,\qquad\ell=2^s-1,
$$

这恰好就是多重线性分析中 $T_{\mathrm{MP}}$ 的表达式。所以构造 $T_{\mathrm{MD}}$ 分布的过程与 [§2.2](#s2-2) 完全相同：

!!! theorem "定理（$T_{\mathrm{MD}}$ 的分布）"
    设线性近似来自 $s$ 维线性空间，$\ell=2^s-1$。

    1. 在修订版错误密钥随机假设下，$T_{\mathrm{MD}}$ 是自由度为 $\ell$ 的卡方分布的常数倍，$\mathbb E(T_{\mathrm{MD}})=B\ell+N2^{-n}\ell$，$\mathrm{Var}(T_{\mathrm{MD}})=\frac2\ell(B\ell+N2^{-n}\ell)^2$。
    2. 若 $p_i(K)=\mathbb E_{\mathcal D}(\mathrm{Cnt}_i/N)$ 且**多维线性密钥方差假设**成立（对所有 $\eta$，$p_\eta(K)$ 作为 $K$ 的随机变量都服从正态分布且方差相等，任取 $\ell$ 个相互独立，并唯一决定剩下一个），则

        $$
        Q=\frac{T_{\mathrm{MD}}}{B+\frac N\ell(C-C_0)}\sim\chi_\ell^2(\delta),\qquad\delta=\frac{NC_0}{B+\frac N\ell(C-C_0)}.
        $$

可见 $T_{\mathrm{MD}}$ 与 $T_{\mathrm{MP}}$ 在两种密钥下的分布完全相同，所需数据量的公式也与多重线性分析的推论完全一致，三种复杂度的讨论也相同。多维线性分析的好处在于不再需要独立性，可用的线性近似更多。

## 4. 零相关线性分析 { #s4 }

差分分析利用高概率差分，不可能差分利用概率恒为 $0$ 的差分。作为不可能差分在线性分析中的对偶，零相关线性分析利用相关度恒为 $0$ 的线性近似，它的提出比不可能差分晚了近十年。

经典的零相关线性分析由 Bogdanov 和 Rijmen 提出。起初它很少被采纳，因为需要整个明文空间；他们也证明了用 $2^{n-1}$ 个选择明文就够，但接受度仍不高。为克服数据量上的缺陷，Bogdanov 和王美琴提出了**多重零相关**模型，通过在成功率和数据量之间折中，把数据复杂度降到约 $O(2^n/\sqrt\ell)$。但它依赖独立性假设，而实际中零相关线性近似通常具有截断结构，独立性很难满足。于是又有了**多维零相关**模型：不再依赖独立性，数据量仍维持在 $O(2^n/\sqrt\ell)$ 量级。它已被广泛用于一系列对称密码，成为很多算法的最优攻击。

### 4.1 零相关线性分析框架 { #s4-1 }

!!! definition "定义（零相关线性近似）"
    对 $n$ 比特迭代分组密码 $E_K$ 的线性近似 $(\alpha,\beta)$，若对 $K$ 的所有取值，$(\alpha,\beta)$ 的相关度都为零，则称其为 $E_K$ 的一条**零相关线性近似 (zero-correlation linear approximation)**。

!!! note "注"
    由堆积引理，要证明一条线性路线的相关度为零，只需其中某一轮的相关度为零。要证明线性近似的相关度为零，则需要它包含的所有路线都为零，常用的办法与不可能差分类似：从两端分别以概率 $1$ 传播掩码，在中间找到矛盾。

零相关线性分析的可行性基于下面的命题。

!!! theorem "命题"
    对 $n$ 比特随机置换（$n\ge5$），任意非平凡线性近似的相关度为零的概率近似为

    $$
    \frac1{\sqrt{2\pi}}2^{\frac{4-n}2}.
    $$

??? proof "证明概要"
    相关度为零即 $\#\{X:\alpha\cdot X=\beta\cdot E(X)\}=2^{n-1}$。对随机置换，这个计数近似服从超几何分布，在 $2^{n-1}$ 附近的方差约为 $2^{n-2}$。由正态近似，它恰好落在 $2^{n-1}$ 这一个点上的概率约为

    $$
    \frac1{\sqrt{2\pi\cdot2^{n-2}}}=\frac1{\sqrt{2\pi}}2^{\frac{2-n}2}.
    $$

    但计数只能取与 $2^{n-1}$ 同奇偶的值（相差为偶数），密度要乘 $2$，得到 $\frac1{\sqrt{2\pi}}2^{\frac{4-n}2}$。

$n$ 较大时这个概率非常低。所以对 $R$ 轮算法，找到 $R-1$ 轮零相关线性近似后，猜测最后一轮子密钥并部分解密，构造

$$
\alpha\cdot P\oplus\beta\cdot F^{-1}_{K_{r-1}}(C)=\gamma\cdot K.\tag{11}
$$

给定 $2^n$ 个明密文对：代入正确候选时，(11) 成立的概率恰好为 $0.5$；代入错误候选时，它很可能不等于 $0.5$。

!!! theorem "算法（零相关线性分析）"
    给定 $2^n$ 个明密文对：

    1. 对 $K_{r-1}$ 的每个候选 $\kappa$，用计数器 $\mathrm{Cnt}$ 记录满足 $\alpha\cdot P\oplus\beta\cdot F_\kappa^{-1}(C)=0$ 的明密文对数；
    2. 计算 $\hat c=2\,\mathrm{Cnt}/2^n-1$；
    3. 若 $\hat c=0$，认为 $\kappa$ 是正确候选；若 $\hat c\ne0$，认为是错误候选；
    4. 对兼容的主密钥作加密匹配测试。

### 4.2 复杂度 { #s4-2 }

- **成功率**：正确密钥下 $\hat c$ 必为零，所以成功率一定是 $100\%$。
- **优势**：错误密钥下相关度为零（即被留下）的概率为 $\varepsilon_0=\frac1{\sqrt{2\pi}}2^{\frac{4-n}2}$，由 $\varepsilon_0=2^{-a}$ 得到优势 $a$。
- **数据**：需要整个明文空间，$2^n$。
- **时间**：收集数据约 $2^n$；步骤 1 可以融入密钥恢复技巧；步骤 4 由优势 $a$ 决定。
- **存储**：步骤 1 存中间状态，步骤 4 存正确候选。

!!! example "例"
    $n=64$ 时，经典零相关分析的优势是多少？

??? solution "解"
    $\varepsilon_0=\frac1{\sqrt{2\pi}}2^{-30}\approx2^{-30}\cdot2^{-1.33}=2^{-31.33}$，所以 $a\approx31.3$，即一个零相关线性近似大约能筛掉 31 比特密钥信息。代价是要用整个 $2^{64}$ 的明文空间。

### 4.3 减少数据量 { #s4-3 }

把已知明文攻击改为选择明文攻击，可以把数据量减到 $2^{n-1}$，依据是下面的命题。

!!! theorem "命题（高效相关度评估）"
    对 $n$ 比特置换 $f$ 的任意非平凡线性近似 $(\alpha,\beta)$，计算相关度只需 $2^{n-1}$ 个输入输出对 $(X,Y)$，下面两种方式任选其一：

    $$
    c(\alpha,\beta)=\frac{\#\{(X,Y)\mid\alpha\cdot X=\beta\cdot Y=0\}}{2^{n-2}}-1=\frac{\#\{(X,Y)\mid\alpha\cdot X=\beta\cdot Y=1\}}{2^{n-2}}-1.
    $$

!!! problem "习题"
    证明上面的命题。

??? solution "解"
    记 $N_{ab}=\#\{X:\alpha\cdot X=a,\ \beta\cdot f(X)=b\}$。$\alpha\ne0$，所以 $N_{00}+N_{01}=2^{n-1}$；$f$ 是置换、$\beta\ne0$，所以 $N_{00}+N_{10}=2^{n-1}$。由此 $N_{01}=N_{10}=2^{n-1}-N_{00}$，$N_{11}=2^{n-1}-N_{10}=N_{00}$。于是

    $$
    c(\alpha,\beta)=\frac{N_{00}+N_{11}-N_{01}-N_{10}}{2^n}=\frac{4N_{00}-2^n}{2^n}=\frac{N_{00}}{2^{n-2}}-1,
    $$

    第二个等式同理（$N_{11}=N_{00}$）。而 $N_{00}$ 只需要遍历满足 $\alpha\cdot X=0$ 的 $2^{n-1}$ 个输入就能算出，这正是选择明文的用处。

## 5. 多重和多维零相关线性分析 { #s5 }

思路与多重、多维线性分析类似，即同时利用多条零相关线性近似的信息。设有 $\ell$ 条 $R-1$ 轮零相关线性近似：

- 多重零相关要求这 $\ell$ 条相互独立；
- 多维零相关要求它们加上零向量构成 $s$ 维线性空间 $\mathbf A\times\mathbf B$，$\ell=2^s-1$。

猜测 $K_{r-1}$ 并部分解密得到 (10) 的形式。给定 $N$ 个已知明密文对计算经验容量：**代入正确候选时经验容量较小，代入错误候选时相对较大**。这与多重/多维线性分析正好相反。

!!! theorem "算法（多重零相关 / 多维零相关线性分析）"
    1. 对每个 $\kappa$ 建立计数器：多重零相关建 $\ell$ 个 $\mathrm{Cnt}_i$ 记录满足 $\alpha_i\cdot P\oplus\beta_i\cdot F_\kappa^{-1}(C)=0$ 的对数；多维零相关建 $2^s$ 个 $\mathrm{Cnt}_i$ 记录限制在 $\mathbf A\times\mathbf B$ 上取值为 $i$ 的对数；
    2. 统计量分别为

        $$
        T^{\mathrm{ZC}}_{\mathrm{MP}}=N\sum_{i=0}^{\ell-1}\hat c_i^2,\qquad
        T^{\mathrm{ZC}}_{\mathrm{MD}}=\sum_{i=0}^{2^s-1}\frac{(\mathrm{Cnt}_i-N2^{-s})^2}{N2^{-s}},
        $$

        与 $T_{\mathrm{MP}}$、$T_{\mathrm{MD}}$ 相同；
    3. 若统计量 $<\Theta$，认为 $\kappa$ 是正确候选；若 $\ge\Theta$，认为是错误候选；
    4. 对兼容的主密钥作加密匹配测试。

起初多维零相关用不同已知明文抽样，多重零相关用已知明文抽样。Blondeau 和 Nyberg 证明了取样方式相同时，$T^{\mathrm{ZC}}_{\mathrm{MP}}$ 和 $T^{\mathrm{ZC}}_{\mathrm{MD}}$ 服从相同的分布，所以两种方法既可以用已知明文抽样，也可以用不同已知明文抽样，数据量与线性近似数和抽样方式有关。下面统一记作 $T^{\mathrm{ZC}}$。

!!! theorem "推论（多重/多维零相关的分布与数据量）"
    错误密钥下与正确密钥下分别有

    $$
    \frac{T^{\mathrm{ZC}}}{B+N/2^n}\sim\chi_\ell^2,\qquad\frac{T^{\mathrm{ZC}}}{B}\sim\chi_\ell^2.
    $$

    用正态近似，所需数据量为

    $$
    N^{\mathrm{KP}}\approx\frac{2^n(\varphi_{P_S}+\varphi_a)}{\sqrt{\ell/2}-\varphi_a},\qquad
    N^{\mathrm{DKP}}\approx\frac{2^n(\varphi_{P_S}+\varphi_a)}{\sqrt{\ell/2}+\varphi_{P_S}}.
    $$

!!! note "注"
    多重/多维零相关可以看作多重/多维线性分析中容量取零的特殊情况：错误密钥下的分布就是 [§2.2](#s2-2) 定理给出的分布；正确密钥下的分布就是 [§2.3](#s2-3) 定理中取 $C=C_0=0$ 的情况。由数据量公式也能看出，$\ell$ 越大，数据量越小，约为 $O(2^n/\sqrt\ell)$。三种复杂度的讨论与多重线性分析相同。

## 6. 差分-线性分析 { #s6 }

我们已经学了两类区分器：利用差分传播，或利用线性近似表达式。能否把两类区分器连起来构成更长的区分器？**差分-线性分析 (differential-linear cryptanalysis)** 给出了一种思路。它由 Langford 和 Hellman 于 1994 年在 CRYPTO 上提出，Biham 等在 ASIACRYPT 2002 推广到更一般的情况并破解了 COCONUT98，现在已是评估分组密码安全性的主要手段之一。

### 6.1 差分-线性分析框架 { #s6-1 }

把加密分为三部分

$$
C=E(P)=E_c(E_l(E_d(P))),
$$

明文 $P$ 经 $E_d$ 得 $x$，$x$ 经 $E_l$ 得 $y$，$y$ 经 $E_c$ 得密文 $C$。（这里以在区分器尾部加轮为例，也可以在头部加轮。）设对 $E_l$ 找到偏差为 $\varepsilon$ 的线性近似 $\lambda_x\xrightarrow{E_l}\lambda_y$。为了与差分连接，考虑明文对 $(P_1,P_2)$，对应的中间状态为 $(x_1,y_1)$、$(x_2,y_2)$，则

$$
\Pr(\lambda_x\cdot x_1\oplus\lambda_y\cdot y_1=0)=\frac12+\varepsilon,\qquad
\Pr(\lambda_x\cdot x_2\oplus\lambda_y\cdot y_2=0)=\frac12+\varepsilon.
$$

两式左边异或，得 $\lambda_x\cdot x_1\oplus\lambda_y\cdot y_1\oplus\lambda_x\cdot x_2\oplus\lambda_y\cdot y_2=0$，即

$$
\lambda_y\cdot(y_1\oplus y_2)=\lambda_x\cdot(x_1\oplus x_2).
$$

**关于取值的线性近似变成了关于差分值的线性近似！** 而 $x_1\oplus x_2$ 由 $E_d$ 部分的差分决定，从而可以推测 $\lambda_x\cdot(x_1\oplus x_2)$ 的信息。设 $\Pr(\lambda_x\cdot(x_1\oplus x_2)=0)=\frac12+p$，由堆积引理（三个量异或），

$$
\Pr\big(\lambda_y\cdot(y_1\oplus y_2)=0\big)=\frac12+4\varepsilon^2p.\tag{12}
$$

而对随机置换这一概率为 $1/2$。于是得到关于 $y_1\oplus y_2$ 的有偏差的线性近似，可以借助线性分析的算法 2 恢复密钥。攻击的复杂度与 $(4\varepsilon^2p)^{-2}\approx\varepsilon^{-4}p^{-2}$ 成正比，既要保证所需明文对不超过整个明文空间，又要保证复杂度不超过强力攻击。可见模型的关键是 $p$ 的计算，它与差分 $\Delta_{\mathrm{in}}\xrightarrow{E_d}\Delta_{\mathrm{out}}$ 的取值和概率有关。

### 6.2 CipherFour 的差分-线性分析 { #s6-2 }

仍以 S 盒换成 [§1.3](#s1-3) 中 S 盒的 CipherFour 为例。

**$p=1/2$ 的情形（Langford–Hellman 模型）。** 利用 [§1.4](#s1-4) 中偏差为 $\pm1/32$ 的 3 轮线性近似

$$
P_4\oplus P_6\oplus P_7\oplus Z_5^4\oplus Z_7^4\oplus Z_{13}^4\oplus Z_{15}^4=0,
$$

即 $\lambda_x=(0000\ 1011\ 0000\ 0000)\xrightarrow{3\text{ 轮}}\lambda_y=(0000\ 0101\ 0000\ 0101)$，$E_l$ 为 3 轮加密。CipherFour 有概率为 $1$ 的 1 轮截断差分

$$
(0000\ {*}{*}{*}{*}\ 0000\ 0000)\xrightarrow{1\text{ 轮}}(0{*}00\ 0{*}00\ 0{*}00\ 0{*}00).
$$

若 $E_d$ 为 1 轮加密，选择明文对满足 $P_1\oplus P_2=(0000\ {*}{*}{*}{*}\ 0000\ 0000)$，则 $x_1\oplus x_2$ 的第 4、6、7 比特一定为零，即 $\Pr(\lambda_x\cdot(x_1\oplus x_2)=0)=1$。代入 (12)，得到偏差为 $2\varepsilon^2=2^{-9}$ 的 4 轮线性近似

$$
y_{1,5}\oplus y_{1,7}\oplus y_{1,13}\oplus y_{1,15}\oplus y_{2,5}\oplus y_{2,7}\oplus y_{2,13}\oplus y_{2,15}=0,
$$

$y_{i,j}$ 表示 $y_i$ 的第 $j$ 比特。

!!! problem "习题"
    利用上面的 4 轮线性近似对 5 轮 CipherFour 进行密钥恢复攻击。（提示：选择明文攻击，线性分析算法 2。）

??? solution "解"
    1. **采样**：选 $N$ 对明文满足 $P_1\oplus P_2=(0000\ {*}{*}{*}{*}\ 0000\ 0000)$，获得密文对 $(C_1,C_2)$。可以用结构体：固定其余 12 比特，第 2 个半字节取遍 16 个值，一个结构体给出 $\binom{16}2=120$ 对。
    2. **部分解密**：近似用到第 5 轮输入的比特 5、7、13、15，它们在第 2 和第 4 个 S 盒里。猜测末轮这两个 S 盒对应的 8 比特密钥，把 $C_1,C_2$ 的相应半字节通过 $S^{-1}$ 解密，计算 $\lambda_y\cdot(y_1\oplus y_2)$。
    3. **计数**：对每个 8 比特猜测统计 $\lambda_y\cdot(y_1\oplus y_2)=0$ 的对数，取 $|\mathrm{Cnt}-N/2|$ 最大的为候选。
    4. **数据量**：偏差 $2^{-9}$，需要约 $c\cdot2^{18}$ 对，超过了 16 比特分组下所有可能的明文对数（约 $2^{31}$ 对，其中满足输入差分形式的只有 $2^{12}\cdot120\approx2^{19}$ 对），所以 $c$ 只能取很小，攻击处在可行的边缘。这也说明了 (12) 里 $\varepsilon^{-4}$ 的代价。

**$p<1/2$ 的情形（Biham 等的模型）。** 利用 [§1.4](#s1-4) 中偏差为 $\pm1/8$ 的 2 轮线性近似 (4)

$$
P_4\oplus P_6\oplus P_7\oplus Z_5^3\oplus Z_{13}^3=0,
$$

再利用 2 轮概率为 $\frac8{16}\cdot\frac6{16}=\frac3{16}$ 的差分路线

$$
\begin{aligned}
&(0000\ 1011\ 0000\ 0000)\xrightarrow{S}(0000\ 0010\ 0000\ 0000)\xrightarrow{P}(0000\ 0000\ 0100\ 0000)\\
\xrightarrow{S}{}&(0000\ 0000\ 0110\ 0000)\xrightarrow{P}(0000\ 0010\ 0010\ 0000).
\end{aligned}
$$

!!! example "例"
    设 $E_d$ 为 2 轮加密，随机选择明文对满足 $P_1\oplus P_2=(0000\ 1011\ 0000\ 0000)$，取 $\lambda_x=(0000\ 1011\ 0000\ 0000)$，求 $\Pr(\lambda_x\cdot(x_1\oplus x_2)=0)$。

??? solution "解"
    分两种情况。

    - $(P_1,P_2)\xrightarrow{2\text{ 轮}}(x_1,x_2)$ 满足上面的差分路线，记为事件 $A$。此时 $x_1\oplus x_2=(0000\ 0010\ 0010\ 0000)$，$\lambda_x\cdot(x_1\oplus x_2)=1$。
    - 不满足路线，记为 $\overline A$。假设 $x_1\oplus x_2$ 均匀分布，则 $\Pr(\lambda_x\cdot(x_1\oplus x_2)=1\mid\overline A)=1/2$。

    于是

    $$
    \begin{aligned}
    \Pr(\lambda_x\cdot(x_1\oplus x_2)=0)&=1-\Pr(\cdot=1\mid A)\Pr(A)-\Pr(\cdot=1\mid\overline A)\Pr(\overline A)\\
    &=1-1\cdot\frac3{16}-\frac12\left(1-\frac3{16}\right)=\frac12-\frac12\cdot\frac3{16}=\frac{13}{32}.
    \end{aligned}
    $$

!!! problem "习题"
    若找到概率为 $p'$ 的 2 轮差分 $\Delta P\xrightarrow{2\text{ 轮}}\Delta x$，且 $\lambda_x\cdot\Delta x=0$，随机选择的明文对满足 $P_1\oplus P_2=\Delta P$ 时，$\Pr(\lambda_x\cdot(x_1\oplus x_2)=0)$ 是多少？

??? solution "解"
    同样分两种情况：满足差分时 $\lambda_x\cdot(x_1\oplus x_2)=0$ 必然成立；不满足时按均匀分布，成立的概率为 $1/2$。故

    $$
    \Pr=p'+\frac12(1-p')=\frac12+\frac{p'}2.
    $$

    即 $p=p'/2$，偏差的符号由 $\lambda_x\cdot\Delta x$ 决定：等于 $0$ 时为正，等于 $1$ 时为负（如上例）。

由上例，(12) 中 $p=-\frac3{32}$，于是得到偏差为

$$
4\cdot\left(\pm\frac18\right)^2\cdot\left(-\frac3{32}\right)=-\frac3{512}\approx-2^{-7.42}
$$

的 4 轮线性近似

$$
y_{1,5}\oplus y_{1,13}\oplus y_{2,5}\oplus y_{2,13}=0.
$$

注意 $\varepsilon^2$ 消去了 $\varepsilon$ 的符号，所以这里偏差的符号是确定的。基于它可以开展 4 轮 CipherFour 的区分攻击：

1. 随机选 $N=(2^{-7.42})^{-2}$ 对 $(P_1,P_2)$ 满足 $P_1\oplus P_2=(0000\ 1011\ 0000\ 0000)$，获得密文对 $(C_1,C_2)$；
2. 统计 $C_{1,5}\oplus C_{1,13}\oplus C_{2,5}\oplus C_{2,13}=0$ 的对数，记为 $n$；
3. 若 $\frac nN<\frac12-\frac12\cdot2^{-7.42}$，判断黑盒为 4 轮 CipherFour，否则判断为随机置换。（偏差的符号确定，所以这里不用绝对值。）

!!! problem "习题"
    分析上述区分攻击的复杂度和成功率，并给出 5 轮 CipherFour 的密钥恢复攻击。

??? solution "解"
    **复杂度**：$N=2^{14.84}$ 对，即约 $2^{15.84}$ 个选择明文，超过了 $2^{16}$ 的明文空间的一半，但仍在范围内；时间约 $2^{15.84}$ 次加密，存储只需一个计数器。

    **成功率**：记 $\varepsilon=2^{-7.42}$。对 CipherFour，$n/N$ 近似服从 $\mathcal N\left(\frac12-\varepsilon,\frac1{4N}\right)$；对随机置换近似服从 $\mathcal N\left(\frac12,\frac1{4N}\right)$。阈值取两均值的中点 $\frac12-\frac\varepsilon2$，两种情况判错的概率都是

    $$
    \Phi\left(-\frac{\varepsilon/2}{1/(2\sqrt N)}\right)=\Phi(-\varepsilon\sqrt N)=\Phi(-1)\approx15.9\%,
    $$

    所以成功率约 $84\%$。数据量加到 $4N$，成功率提升到 $\Phi(2)\approx97.7\%$。

    **5 轮密钥恢复**：在尾部加 1 轮。比特 5 和 13 分别位于第 5 轮的第 2、4 个 S 盒，猜测这两个 S 盒对应的 8 比特末轮密钥，把密文对的这两个半字节部分解密，再按上面的统计量计数，计数使 $n/N$ 最偏离 $\frac12$（且偏向负方向）的猜测作为候选。需要的数据量同上，时间约 $2^8\times N$ 次 S 盒查表，即约 $2^{23}$ 次查表。

## 7. 密钥差分不变偏差技术 { #s7 }

**密钥差分不变偏差技术 (key difference invariant bias technique)** 是线性分析在相关密钥环境下的扩展，由 Bogdanov 等在 ASIACRYPT 2013 提出，最初用于分析密钥交替密码。在 FSE 2019 上，王美琴等提出了相关密钥统计饱和度分析，把积分分析推广到相关密钥环境，证明了相关密钥统计饱和度区分器与密钥差分不变偏差区分器的条件等价性，并给出了自动化搜索算法。

我们知道，线性近似的偏差与密钥有关，密钥不同，偏差的符号甚至大小都会不同。这一技术考察的是：**两个不同的密钥满足什么条件时，线性近似在这两个密钥下的偏差相同。**

!!! definition "定义（密钥交替密码）"
    设 $E$ 为分组长度 $n$、密钥长度 $l$ 的 $r$ 轮迭代密码，轮函数为 $F(x,k):\mathbb F_2^n\times\mathbb F_2^l\to\mathbb F_2^n$，各轮密钥 $k_i$（$0\le i\le r$）由主密钥 $\kappa$ 经密钥编排 $\varphi$ 生成。若

    - 第 $i$ 轮的轮函数可以写成 $F(x,k_i)=f(x)\oplus k_i$，$1\le i\le r$，其中 $f:\mathbb F_2^n\to\mathbb F_2^n$；
    - 第 1 轮的输入为 $k_0\oplus P$，

    则称 $E$ 为**密钥交替密码 (key-alternating cipher)**。

许多 Feistel 结构的算法和几乎所有 SPN 结构的算法都属于这一类。对迭代密码，线性近似也称**线性壳 (linear hull)**：线性壳 $(\Gamma,\Lambda)$ 包含所有输入掩码为 $\Gamma$、输出掩码为 $\Lambda$ 的线性路线。$\Gamma$ 或 $\Lambda$ 为 $0$ 时称为平凡的。

用 $n(r+1)$ 比特的列向量 $\theta=(\theta_0,\theta_1,\cdots,\theta_r)$ 表示一条线性路线，第 $i$ 轮的输入、输出掩码为 $\theta_{i-1},\theta_i$。对密钥交替密码，第 $i$ 轮的偏差为

$$
\varepsilon^F_{\theta_{i-1},\theta_i}=\Pr[\theta_{i-1}\cdot x\oplus\theta_i\cdot f(x)\oplus\theta_i\cdot k_i=0]-\frac12=(-1)^{\theta_i\cdot k_i}\varepsilon^f_{\theta_{i-1},\theta_i},
$$

其中 $\varepsilon^f_{\theta_{i-1},\theta_i}=\Pr[\theta_{i-1}\cdot x\oplus\theta_i\cdot f(x)=0]-\frac12$ 与密钥无关。于是路线 $\theta$ 在密钥 $\kappa$ 下的偏差为

$$
\varepsilon_\theta(\kappa)=2^{r-1}(-1)^{\theta_0\cdot k_0}\prod_{i=1}^r\varepsilon^F_{\theta_{i-1},\theta_i}=(-1)^{\theta^t\cdot K}2^{r-1}\prod_{i=1}^r\varepsilon^f_{\theta_{i-1},\theta_i},
$$

其中 $K=(k_0,\cdots,k_r)$ 称为**扩展密钥**，$\theta^t\cdot K=\bigoplus_j\theta_j\cdot k_j$。

!!! theorem "命题（线性壳偏差与密钥的关系）"
    对密钥交替密码，非平凡线性壳 $(\Gamma,\Lambda)$ 在主密钥 $\kappa$ 下的偏差为

    $$
    \varepsilon(\kappa)=\sum_{\theta:\theta_0=\Gamma,\theta_r=\Lambda}\varepsilon_\theta(\kappa)=\sum_{\theta}(-1)^{\theta^t\cdot K}\varepsilon_\theta(0)=\sum_\theta(-1)^{d_\theta\oplus\theta^t\cdot K}\varepsilon_\theta,
    $$

    其中 $\varepsilon_\theta(0)=(-1)^{d_\theta}\varepsilon_\theta$，$\varepsilon_\theta\ge0$，$d_\theta\in\{0,1\}$。

线性壳包含的路线太多，我们无法知道所有路线的偏差，也就算不出线性壳偏差的具体值。但我们不需要具体值，只需要知道在两个密钥下它是否相等。

### 7.1 分析框架 { #s7-1 }

设线性壳 $(\Gamma,\Lambda)$ 在两个密钥 $\kappa,\kappa'$ 下的偏差为 $\varepsilon(\kappa),\varepsilon(\kappa')$。由上面的命题，二者的区别只在每条路线的符号 $d_\theta\oplus\theta^t\cdot K$ 与 $d_\theta\oplus\theta^t\cdot K'$。若对每条路线这两个符号都相同，则 $\varepsilon(\kappa)=\varepsilon(\kappa')$。$d_\theta$ 对给定的 $\theta$ 是固定的，所以只需 $\theta^t\cdot(K\oplus K')=0$。记密钥差分 $\Delta=K\oplus K'=(k_0\oplus k_0',\cdots,k_r\oplus k_r')$：

!!! theorem "定理（密钥差分不变偏差成立的条件）"
    设 $(\Gamma,\Lambda)$ 是密钥交替密码的非平凡线性壳。若其中每一条满足 $\varepsilon_\theta\ne0$ 的路线 $\theta$ 都有 $\theta^t\cdot\Delta=0$，则此线性壳在扩展密钥为 $K$ 的主密钥 $\kappa$ 和扩展密钥为 $K'=K\oplus\Delta$ 的主密钥 $\kappa'$ 下偏差相同。

用 $\theta(j)$、$\Delta(j)$ 表示 $\theta$ 和 $\Delta$ 的第 $j$ 比特（$0\le j\le n(r+1)-1$），下面是一个便于检验的充分条件。

!!! theorem "推论（充分条件）"
    若对每个比特位置 $j$：

    - 只要有一条 $\varepsilon_\theta\ne0$ 的路线满足 $\theta(j)=1$，就有 $\Delta(j)=0$；
    - 若所有 $\varepsilon_\theta\ne0$ 的路线都有 $\theta(j)=0$，则 $\Delta(j)$ 可以任取，

    那么线性壳中每条 $\varepsilon_\theta\ne0$ 的路线都满足 $\theta^t\cdot\Delta=0$。

直观地说：**密钥差分只能出现在线性壳中所有非零路线都不经过的比特上。** 这正是做截断掩码分析时容易检验的条件。

设有 $\lambda$ 条 $r$ 轮线性壳 $(\Gamma,\Lambda)$ 和固定的密钥差分 $\Delta\ne0$，它们都满足上面的条件，称这个组合为**密钥差分不变偏差区分器**，轮数为线性壳的轮数。在前面加 $r_{\mathrm{top}}$ 轮、后面加 $r_{\mathrm{bot}}$ 轮，可以攻击 $R=r_{\mathrm{top}}+r+r_{\mathrm{bot}}$ 轮。

在主密钥 $\kappa$ 下收集 $N$ 组明密文对 $(P,C)$，在 $\kappa'$ 下收集 $N$ 组 $(P',C')$，$\kappa,\kappa'$ 对应的扩展密钥之差为 $\Delta$。对每条线性壳，用计数器 $S_i$、$S_i'$ 分别统计两组数据中满足此线性壳的明密文对数（通过猜测前 $r_{\mathrm{top}}$ 轮和后 $r_{\mathrm{bot}}$ 轮的密钥加解密，得到中间状态 $x,x'$），得到实验偏差 $\hat\varepsilon_i=S_i/N-\frac12$，$\hat\varepsilon_i'=S_i'/N-\frac12$。统计量为

$$
s=\sum_{i=1}^\lambda(\hat\varepsilon_i-\hat\varepsilon_i')^2=\sum_{i=1}^\lambda\left[\left(\frac{S_i}N-\frac12\right)-\left(\frac{S_i'}N-\frac12\right)\right]^2.
$$

!!! theorem "命题（$s$ 在正确密钥猜测下的分布）"
    设计数器 $S_i,S_i'$ 全都独立，$\lambda$、$N$、$n$ 足够大，则正确密钥猜测下

    $$
    s\sim\mathcal N\left(\frac\lambda{2N},\frac\lambda{2N^2}\right).
    $$

??? proof "证明"
    正确猜测下，第 $i$ 条线性壳的实验偏差 $\hat\varepsilon_i$ 近似服从 $\mathcal N(\varepsilon_i,\frac1{4N})$，$\varepsilon_i$ 是它在 $\kappa$ 下的理论偏差。所以

    $$
    \hat\varepsilon_i-\hat\varepsilon_i'\sim\mathcal N\left(\varepsilon_i,\frac1{4N}\right)-\mathcal N\left(\varepsilon_i',\frac1{4N}\right).
    $$

    由不变偏差 $\varepsilon_i=\varepsilon_i'$，又 $S_i,S_i'$ 独立，故 $\hat\varepsilon_i-\hat\varepsilon_i'\sim\mathcal N(0,\frac1{2N})$。于是

    $$
    s=\sum_{i=1}^\lambda(\hat\varepsilon_i-\hat\varepsilon_i')^2\sim\frac1{2N}\sum_{i=1}^\lambda\mathcal N^2(0,1)=\frac1{2N}\chi_\lambda^2.
    $$

    $\lambda$ 足够大时 $\chi_\lambda^2\approx\mathcal N(\lambda,2\lambda)$，所以 $s\sim\mathcal N\left(\frac\lambda{2N},\frac\lambda{2N^2}\right)$。

!!! theorem "命题（$s$ 在错误密钥猜测下的分布）"
    同样的条件下，错误密钥猜测下

    $$
    s\sim\mathcal N\left(\frac\lambda{2N}+\frac\lambda{2^{n+1}},\ \frac\lambda{2N^2}+\frac\lambda{2^{2n+1}}+\frac\lambda{N2^n}\right).
    $$

??? proof "证明"
    错误猜测下，$\hat\varepsilon_i$ 近似服从 $\mathcal N(\varepsilon_i,\frac1{4N})$，而这时的“理论偏差” $\varepsilon_i$ 相当于随机置换的偏差，$n\ge5$ 时服从 $\mathcal N(0,\frac1{2^{n+2}})$。于是

    $$
    \hat\varepsilon_i=\varepsilon_i+\mathcal N\left(0,\frac1{4N}\right)\sim\mathcal N\left(0,\frac1{4N}+\frac1{2^{n+2}}\right),\qquad
    \hat\varepsilon_i-\hat\varepsilon_i'\sim\mathcal N\left(0,\frac1{2N}+\frac1{2^{n+1}}\right).
    $$

    故 $s\sim\left(\frac1{2N}+\frac1{2^{n+1}}\right)\chi_\lambda^2\approx\left(\frac1{2N}+\frac1{2^{n+1}}\right)\mathcal N(\lambda,2\lambda)$，展开即得。

可见正确猜测下 $s\sim\mathcal N(\mu_0,\sigma_0^2)$，错误猜测下 $s\sim\mathcal N(\mu_1,\sigma_1^2)$，$\mu_0<\mu_1$。取阈值 $\tau$：$s\le\tau$ 时判为正确猜测，否则判为错误。记 $\alpha_0$ 为拒绝正确密钥的概率，$\alpha_1$ 为接受错误密钥的概率，阈值 $\tau=\mu_0+\sigma_0q_{1-\alpha_0}=\mu_1-\sigma_1q_{1-\alpha_1}$，$q$ 为标准正态分布的分位数。要使两类错误概率不超过 $\alpha_0,\alpha_1$，需要 $q_{1-\alpha_1}\sigma_1+q_{1-\alpha_0}\sigma_0=|\mu_1-\mu_0|$。

!!! theorem "命题（数据量与阈值）"
    记分组长度为 $n$，线性壳条数为 $\lambda$，则攻击中所需的明密文对组数为

    $$
    N=\frac{2^{n+0.5}}{\sqrt\lambda-q_{1-\alpha_1}\sqrt2}\left(q_{1-\alpha_0}+q_{1-\alpha_1}\right),
    $$

    阈值为

    $$
    \tau=\frac{\sqrt\lambda}{N\sqrt2}q_{1-\alpha_0}+\frac\lambda{2N}.
    $$

### 7.2 通用攻击过程 { #s7-2 }

!!! theorem "算法（密钥差分不变偏差攻击的通用过程）"
    **输入**：$\lambda$ 条线性壳 $(\Gamma,\Lambda)$、固定的密钥差分 $\Delta$、阈值 $\tau$、区分器轮数 $r$、前加轮数 $r_{\mathrm{top}}$、后加轮数 $r_{\mathrm{bot}}$。

    1. 在主密钥 $\kappa$ 下收集 $N$ 组 $(P,C)$，在 $\kappa'$ 下收集 $N$ 组 $(P',C')$，$\kappa,\kappa'$ 的扩展密钥差分为 $\Delta$；
    2. 猜测前 $r_{\mathrm{top}}$ 轮和后 $r_{\mathrm{bot}}$ 轮所需的密钥，部分加解密得到中间状态 $x,x'$，把计数器 $V[x]$、$V'[x']$ 加 1；
    3. $s\leftarrow0$。对每条线性壳：令 $S,S'\leftarrow0$；对所有 $x$（$x'$），若 $x$（$x'$）满足该线性壳，则 $S\leftarrow S+V[x]$（$S'\leftarrow S'+V'[x']$）；最后

        $$
        s\leftarrow s+\left[\left(\frac SN-\frac12\right)-\left(\frac{S'}N-\frac12\right)\right]^2;
        $$

    4. 若 $s\le\tau$，猜测的密钥是可能的正确密钥；
    5. 用几组明密文验证留下的密钥，输出验证通过的密钥。

### 7.3 Mini-AES 的相关密钥不变偏差攻击 { #s7-3 }

以 Mini-AES 为例完整描述一下这种攻击（结构见[算法附录](<appendix-algorithms.md>)）。这里用的版本共 10 轮，分组长 $n=16$ 比特，主密钥 $\kappa$ 长 32 比特。密钥编排如下，其中 S 盒与轮函数的 S 盒相同：

!!! theorem "算法（Mini-AES 的密钥编排）"
    1. 把 32 比特主密钥分为两半：$\kappa=\kappa^0\Vert\kappa^1$；
    2. 对 $\text{round}=0,\cdots,10$：
        - 若 $\text{round}\bmod4\in\{1,2\}$，输出 $\kappa^0$ 作为该轮轮密钥，否则输出 $\kappa^1$；
        - 更新：记 $\kappa^0=k_0^0\Vert k_1^0\Vert k_2^0\Vert k_3^0$，令 $\kappa^0\leftarrow(k_2^0\oplus k_3^0)\Vert S(k_0^0)\Vert k_2^0\Vert k_1^0$；$\kappa^1$ 同理。

用前面的推论，可以找到从第 2 轮到第 6 轮、概率为 $2^{-2}$ 的 5 轮区分器：密钥差分从 $\kappa^0$ 的某个半字节的差分 $\mathrm{0x9}$ 出发，经过几轮更新后在第 4 次更新时以概率 $2^{-2}$ 变为另一个半字节的差分 $\mathrm{0x4}$，同时线性壳所经过的半字节始终避开密钥差分非零的位置。在其前后各加 1 轮，就得到对 7 轮 Mini-AES 的密钥差分不变偏差攻击：

$$
X_0\xrightarrow{k_1^0,\ \mathrm{NS,SR,MC}}X_1\xrightarrow{5\text{ 轮区分器}}Y_1\xrightarrow{\mathrm{NS,SR},\ k_1^7}Y_0.
$$

!!! note "注"
    区分器的概率不是 1，而是 $2^{-2}$，所以它只对 $2^{30}$ 个主密钥成立。这个攻击实际上是**弱密钥攻击**，而且只对 $2^{30}$ 个密钥有效，所以攻击的时间复杂度不能超过 $2^{30}$ 次 7 轮加密。

具体的密钥恢复过程利用部分和技巧逐步合并计数器：

!!! theorem "算法（7 轮 Mini-AES 的密钥恢复）"
    **输入**：$\lambda=(2^4-1)\times(2^4-1)$ 条线性壳 $(\Gamma,\Lambda)$、密钥差分 $\Delta$、阈值 $\tau$。

    1. 在 $\kappa$ 下收集 $N$ 组 $(P,C)$，在 $\kappa'$ 下收集 $N$ 组 $(P',C')$；
    2. 声明两个 $2^{12}$ 的计数器 $V_1[x_1]$、$V_1'[x_1']$：对每组数据计算 $x_1=X_0[0,3]\Vert Y_0[1]$，$V_1[x_1]\leftarrow V_1[x_1]+1$（$x_1'$ 同理）；
    3. 对 $2^8$ 个 $K_1^0[0,3]$：声明 $2^8$ 的计数器 $V_2,V_2'$，对 $2^{12}$ 个 $x_1$，部分加密 $X_0[0,3]$ 得到 $X_1[0]$，令 $x_2=X_1[0]\Vert Y_0[1]$，$V_2[x_2]\leftarrow V_2[x_2]+V_1[x_1]$（$x_1'$ 同理）；
        - 对 $2^4$ 个 $K_1^7[3]$：声明 $2^8$ 的计数器 $V,V'$，对 $2^8$ 个 $x_2$，部分解密 $Y_0[1]$ 得 $Y_1[3]$，令 $x=X_1[0]\Vert Y_1[3]$，$V[x]\leftarrow V[x]+V_2[x_2]$（$x_2'$ 同理）；
        - 对所有线性壳计算统计量 $s$；若 $s\le\tau$，猜测的 $K_1^0[0,3]$（即 $\kappa_1[0,3]$）和 $K_1^7[3]$ 是可能的正确密钥；
    4. 对每个留下的候选，穷举 $2^{24}$ 个 $\kappa_0\Vert\kappa_1[1,2]$，用 $\kappa_1$ 算出末轮密钥的第 3 个半字节 $eK_1^7[3]$，若与猜测的 $K_1^7[3]$ 相同，用 3 组明密文验证 $\kappa$。

**复杂度**：取两类错误概率 $\alpha_0\approx2^{-2.7}$，$\alpha_1\approx2^{-3}$，由数据量命题得 $N\approx2^{13.88}$，数据复杂度 $D=2N\approx2^{14.88}$；阈值 $\tau\approx2^{-6.93}$。时间的主项是第 4 步，$T=2^{28}\times3\times\alpha_1\approx2^{26.58}$ 次 7 轮加密。存储主要是计数器，$M=2\times12\times2^{12}+2\times8\times2^8+2\times8\times2^8\approx2^{16.7}$ 比特。

!!! problem "习题"
    验证 $N\approx2^{13.88}$ 和 $\tau\approx2^{-6.93}$。

??? solution "解"
    $\lambda=15^2=225$，$\sqrt\lambda=15$，$n=16$。$q_{1-\alpha_0}=\Phi^{-1}(1-2^{-2.7})=\Phi^{-1}(0.8461)\approx1.020$，$q_{1-\alpha_1}=\Phi^{-1}(1-2^{-3})=\Phi^{-1}(0.875)\approx1.150$。则

    $$
    N=\frac{2^{16.5}}{15-1.150\sqrt2}(1.020+1.150)=\frac{2^{16.5}\times2.170}{13.374}\approx2^{16.5}\times0.1623\approx2^{16.5-2.62}=2^{13.88}.
    $$

    $$
    \tau=\frac{15}{2^{13.88}\sqrt2}\times1.020+\frac{225}{2\cdot2^{13.88}}=\frac{10.82+112.5}{2^{13.88}}\approx\frac{2^{6.95}}{2^{13.88}}=2^{-6.93}.
    $$

参考：王美琴主编，《密码分析学》，科学出版社，2024，第 4 章。
