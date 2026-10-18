---
title: 第六章：GL₂(𝔽_q) 与 SL₂(𝔽_q) 的表示
date: 2025-11-19
updated: 2026-10-15
description: 表示论笔记第六章：GL₂(𝔽_q) 的表示、SL₂(𝔽_q) 的表示、习题。
hide:
  - navigation
categories:
  - 代数
tags:
  - representation-theory
---

# 第六章：GL₂(𝔽_q) 与 SL₂(𝔽_q) 的表示 { #top }

群 $\mathrm{GL}_2(\mathbb{F}_q)$（即元素取自有限域 $\mathbb{F}_q$ 的可逆 $2 \times 2$ 矩阵群，其中 $q$ 是素数的幂）及其子群 $\mathrm{SL}_2(\mathbb{F}_q)$（由行列式为 1 的矩阵组成）构成了另一类重要的有限群。商群 $\mathrm{PGL}_2(\mathbb{F}_q) = \mathrm{GL}_2(\mathbb{F}_q)/\mathbb{F}_q^*$ 是有限射影直线 $\mathbb{P}^1(\mathbb{F}_q)$ 的自同构群。商群 $\mathrm{PSL}_2(\mathbb{F}_q) = \mathrm{SL}_2(\mathbb{F}_q)/\{\pm 1\}$ 在 $q \neq 2, 3$ 时是单群。本节将概述这些群的表示理论。

## 1. $\mathrm{GL}_2(\mathbb{F}_q)$ 表示 { #s1 }

我们从 $G = \mathrm{GL}_2(\mathbb{F}_q)$ 开始。以下是几个关键子群：

$$
G \supset B = \left\{ \begin{pmatrix} a & b \\ 0 & d \end{pmatrix} \right\} \supset N = \left\{ \begin{pmatrix} 1 & b \\ 0 & 1 \end{pmatrix} \right\}.
$$

由于 $G$ 在射影直线 $\mathbb{P}^1(\mathbb{F}_q)$ 上可传递地作用，且 $B$ 是点 (1:0) 的稳定子群，因此有：

$$
|G| = |B| \cdot |\mathbb{P}^1(\mathbb{F}_q)| = (q - 1)^2 q(q + 1).
$$

我们还需要对角子群：

$$
D = \left\{ \begin{pmatrix} a & 0 \\ 0 & d \end{pmatrix} \right\} = \mathbb{F}^* \times \mathbb{F}^*,
$$

这里记 $\mathbb{F} = \mathbb{F}_q$。设 $\mathbb{F}' = \mathbb{F}_{q^2}$ 是 $\mathbb{F}$ 的二次扩张，在同构意义下唯一。我们可以将 $\mathrm{GL}_2(\mathbb{F}_q)$ 视为 $\mathbb{F}'$ 上所有可逆线性自同态的群。这使得一个大的循环子群 $K = (\mathbb{F}')^*$ 在 $G$ 中显现。特别地，当 $q$ 为奇数时，可以通过选择 $\mathbb{F}^*$ 的生成元 $\epsilon$ 及其在 $\mathbb{F}'$ 中的平方根 $\sqrt{\epsilon}$ 来显式构造这个同构。此时，1 和 $\sqrt{\epsilon}$ 构成 $\mathbb{F}'$ 作为 $\mathbb{F}$ 上向量空间的基，因此可以建立以下对应关系：

$$
K = \left\{ \begin{pmatrix} x & \epsilon y \\ y & x \end{pmatrix} \right\} \cong (\mathbb{F}')^*, \quad \begin{pmatrix} x & \epsilon y \\ y & x \end{pmatrix} \mapsto \zeta = x + y \sqrt{\epsilon};
$$

$K$ 是 $G$ 的一个循环子群，阶为 $q^2 - 1$。我们通常使用这种对应关系，对于 $q$ 为偶数的情形，请读者自行调整。

$G$ 中的共轭类很容易确定：

| 代表元 | 类中元素数量 | 类的数量 |
| --- | --- | --- |
| $a_x = \begin{pmatrix} x & 0 \\ 0 & x \end{pmatrix}$ | 1 | $q - 1$ |
| $b_x = \begin{pmatrix} x & 1 \\ 0 & x \end{pmatrix}$ | $q^2 - 1$ | $q - 1$ |
| $c_{x,y} = \begin{pmatrix} x & 0 \\ 0 & y \end{pmatrix}, x \neq y$ | $q^2 + q$ | $\frac{(q - 1)(q - 2)}{2}$ |
| $d_{x,y} = \begin{pmatrix} x & \epsilon y \\ y & x \end{pmatrix}, y \neq 0$ | $q^2 - q$ | $\frac{q(q - 1)}{2}$ |

这里 $c_{x,y}$ 和 $c_{y,x}$ 通过 $\begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}$ 共轭，而 $d_{x,y}$ 和 $d_{x,-y}$ 通过任何 $\begin{pmatrix} a & -\epsilon c \\ c & -a \end{pmatrix}$ 共轭。为了计算 $b_x$ 共轭类中元素的数量，观察 $G$ 通过共轭作用在该类上的行为；稳定子群是 $\left\{ \begin{pmatrix} a & b \\ 0 & a \end{pmatrix} \right\}$，因此类中元素的数量是该群在 $G$ 中的指数，即 $q^2 - 1$。类似地，$c_{x,y}$ 的稳定子群是 $D$，而 $d_{x,y}$ 的稳定子群是 $K$。通过考虑特征值和 Jordan 标准形，可以验证这些类是不相交的。由于它们总共覆盖了 $|G|$ 个元素，因此列表是完整的。

共有 $q^2 - 1$ 个共轭类，因此我们需要找到相同数量的不可约表示。

首先考虑 $G$ 在 $\mathbb{P}^1(\mathbb{F})$ 上的置换表示，其维数为 $q + 1$。它包含平凡表示；设 $V$ 是互补的 $q$ 维表示。特征标 $\chi$ 在四类共轭类上的取值为：

$$
\chi(a_x) = q, \quad \chi(b_x) = 0, \quad \chi(c_{x,y}) = 1, \quad \chi(d_{x,y}) = -1,
$$

简记为：

$$
V: \quad q \quad 0 \quad 1 \quad -1
$$

由于 $(\chi, \chi) = 1$，$V$ 是不可约的。对于 $F^*$ 的每个特征标 $\alpha: F^* \to \mathbb{C}^*$（共 $q - 1$ 个），我们有一个一维表示 $U_\alpha$，定义为 $U_\alpha(g) = \alpha(\det(g))$。此外，还有表示 $V_\alpha = V \otimes U_\alpha$。这些表示的特征标值为：

$$
U_\alpha: \quad \alpha(x)^2 \quad \alpha(x)^2 \quad \alpha(x)\alpha(y) \quad \alpha(x^2 - \epsilon y^2)
$$

$$
V_\alpha: \quad q\alpha(x)^2 \quad 0 \quad \alpha(x)\alpha(y) \quad -\alpha(x^2 - \epsilon y^2)
$$

注意到若将 $\begin{pmatrix} x & \epsilon y \\ y & x \end{pmatrix}$ 与 $F'$ 中的 $\zeta = x + y\sqrt{\epsilon}$ 等同，则：

$$
x^2 - \epsilon y^2 = \det\begin{pmatrix} x & \epsilon y \\ y & x \end{pmatrix} = \text{Norm}_{F'/F}(\zeta) = \zeta \cdot \zeta^q = \zeta^{q+1}.
$$

下一步是寻找从大子群诱导的表示。对于每对特征标 $\alpha, \beta$，存在子群 $B$ 的一个特征标：

$$
B \to B/N = D = F^* \times F^* \to \mathbb{C}^* \times \mathbb{C}^* \to \mathbb{C}^*,
$$

将 $\begin{pmatrix} a & b \\ 0 & d \end{pmatrix}$ 映射为 $\alpha(a)\beta(d)$。设 $W_{\alpha, \beta}$ 是由此表示从 $B$ 诱导到 $G$ 的表示，其维数为 $[G : B] = q + 1$，其特征标值为：

$$
W_{\alpha, \beta}: \quad (q + 1)\alpha(x)\beta(x) \quad \alpha(x)\beta(x) \quad \alpha(x)\beta(y) + \alpha(y)\beta(x) \quad 0
$$

由此可知 $W_{\alpha, \beta} \cong W_{\beta, \alpha}$，$W_{\alpha, \alpha} \cong U_\alpha \oplus V_\alpha$，且当 $\alpha \neq \beta$ 时，表示是不可约的。这给出了 $\frac{1}{2}(q - 1)(q - 2)$ 个额外的不可约表示，维数为 $q + 1$。

与共轭类的列表对比，还需找到 $\frac{1}{2}q(q - 1)$ 个不可约特征标。一种自然的方法是从循环子群 $K$ 诱导特征标。对于表示 $\varphi: K = (F')^* \to \mathbb{C}^*$，诱导表示的特征标值为：

$$
\text{Ind}(\varphi): \quad q(q - 1)\varphi(x) \quad 0 \quad 0 \quad \varphi(\zeta) + \varphi(\zeta)^q
$$

这里 $\zeta = x + y\sqrt{\epsilon} \in K = (F')^*$。注意到 $\text{Ind}(\varphi^q) \cong \text{Ind}(\varphi)$，因此当 $\varphi^q \neq \varphi$ 时，$\text{Ind}(\varphi)$ 给出了 $\frac{1}{2}q(q - 1)$ 个不同的表示。

然而，这些表示并非不可约：若 $\varphi^q \neq \varphi$，则 $\text{Ind}(\varphi)$ 的特征标 $\chi$ 满足 $(\chi, \chi) = q - 1$；否则 $(\chi, \chi) = q$。我们需要进一步从这些诱导表示中提取不可约表示。

另一种尝试是通过已知表示的张量积寻找新表示。我们有 $V_\alpha \otimes U_\gamma = V_{\alpha \gamma}$，以及 $W_{\alpha,\beta} \otimes U_\gamma \cong W_{\alpha \gamma, \beta \gamma}$，因此这种方法无法得到新的表示。但 $V_\alpha$ 和 $W_{\alpha,\beta}$ 的张量积更具潜力。例如，$V \otimes W_{\alpha,1}$ 的特征标值为：

$$
V \otimes W_{\alpha,1}: \quad q(q + 1)\alpha(x) \quad 0 \quad \alpha(x) + \alpha(y) \quad 0
$$

通过计算特征标的内积，可以估计这些表示中包含多少不可约表示以及它们的共同部分。例如：

$$
(\chi_V \otimes W_{\alpha,1}, \chi_{W_{\alpha,1}}) = 2,
$$

$$
(\chi_{\text{Ind}(\varphi)}, \chi_{W_{\alpha,1}}) = 1 \quad \text{若 } \varphi|_{F^*} = \alpha,
$$

$$
(\chi_V \otimes W_{\alpha,1}, \chi_V \otimes W_{\alpha,1}) = q + 3,
$$

$$
(\chi_V \otimes W_{\alpha,1}, \chi_{\text{Ind}(\varphi)}) = q \quad \text{若 } \varphi|_{F^*} = \alpha.
$$

结合 $(\chi_{\text{Ind}(\varphi)}, \chi_{\text{Ind}(\varphi)}) = q - 1$，可以推断 $V \otimes W_{\alpha,1}$ 和 $\text{Ind}(\varphi)$ 包含许多相同的表示。幸运的是，$\text{Ind}(\varphi)$ 和 $W_{\alpha,1}$ 都应包含在 $V \otimes W_{\alpha,1}$ 中。这一猜想容易验证：虚拟特征标

$$
\chi_\varphi = \chi_V \otimes W_{\alpha,1} - \chi_{W_{\alpha,1}} - \chi_{\text{Ind}(\varphi)}
$$

在四类共轭类上的取值为 $(q - 1)\alpha(x), -\alpha(x), 0$ 和 $-(\varphi(\zeta) + \varphi(\zeta)^q)$。因此，$(\chi_\varphi, \chi_\varphi) = 1$，且 $\chi_\varphi(1) = q - 1 > 0$，故 $\chi_\varphi$ 实际上是 $V \otimes W_{\alpha,1}$ 的一个 $q - 1$ 维不可约子表示的特征标。我们将此表示记为 $X_\varphi$。这些表示（共 $\frac{1}{2}q(q - 1)$ 个，且 $X_\varphi = X_{\varphi^q}$）完成了 $\mathrm{GL}_2(F)$ 的不可约表示列表。其特征标表为：

$$
\begin{array}{c|cccc}
&1&q^2-1&q^2+q&q^2-q\\
\mathrm{GL}_2(\mathbb{F}_p)& a_x & b_x & c_{x,y} & d_{x,y} = \zeta \\
\hline
U_\alpha & \alpha(x^2) & \alpha(x^2) & \alpha(xy) & \alpha(\zeta^{q}) \\
V_\alpha & q\alpha(x^2) & 0 & \alpha(xy) & -\alpha(\zeta^{q}) \\
W_{\alpha,\beta} & (q + 1)\alpha(x)\beta(x) & \alpha(x)\beta(x) & \alpha(x)\beta(y) + \alpha(y)\beta(x) & 0 \\
X_\varphi & (q - 1)\varphi(x) & -\varphi(x) & 0 & -(\varphi(\zeta) + \varphi(\zeta^q)) \\
\end{array}
$$

## 2. $\mathrm{SL}_2(\mathbb{F}_q)$ 表示 { #s2 }

接下来讨论行列式为1的 $2 \times 2$ 矩阵子群 $SL_2(\mathbb{F}_q)$（$q$ 为奇数）。其共轭类、每类元素数量及类的数量如下：

$$
\begin{array}{cccc}
&\text{代表元} & \text{类中元素数量} & \text{类的数量} \\
(1)&e = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} & 1 & 1 \\
(2)&-e = \begin{pmatrix} -1 & 0 \\ 0 & -1 \end{pmatrix} & 1 & 1 \\
(3)&\begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix} & \frac{q^2 - 1}{2} & 1 \\
(4)&\begin{pmatrix} 1 & \epsilon \\ 0 & 1 \end{pmatrix} & \frac{q^2 - 1}{2} & 1 \\
(5)&\begin{pmatrix} -1 & 1 \\ 0 & -1 \end{pmatrix} & \frac{q^2 - 1}{2} & 1 \\
(6)&\begin{pmatrix} -1 & \epsilon \\ 0 & -1 \end{pmatrix} & \frac{q^2 - 1}{2} & 1 \\
(7)&\begin{pmatrix} x & 0 \\ 0 & x^{-1} \end{pmatrix}, x \neq \pm 1 & q(q + 1) & \frac{q - 3}{2} \\
(8)&\begin{pmatrix} x & y \\ \epsilon y & x \end{pmatrix}, y \neq0 \ & q(q - 1) & \frac{q - 1}{2} \\
\end{array}
$$

验证过程与 $\mathrm{GL}_2(\mathbb{F}_q)$ 类似。在 (7) 中，$\begin{pmatrix} x & 0 \\ 0 & x^{-1} \end{pmatrix}$ 和 $\begin{pmatrix} x^{-1} & 0 \\ 0 & x \end{pmatrix}$ 的类是相同的。在 (8) 中，$(x, y)$ 和 $(x, -y)$ 的类是相同的；更好的标记方式是使用循环群 $C = \{\zeta \in (\mathbb{F}')^* : \zeta^{q+1} = 1\}$ 中的元素 $\zeta$，其中 $\pm 1$ 未被使用，且 $\zeta$ 和 $\zeta^{-1}$ 的类是相同的。

共轭类的总数为 $q + 4$，因此需要找到 $q + 4$ 个不可约表示。我们首先通过限制 $\mathrm{GL}_2(\mathbb{F}_q)$ 的表示来获取部分表示：

- 所有 $U_\alpha$ 限制为平凡表示 $U$。
- $V_\alpha$ 的限制 $V$ 是不可约的。
- $W_{\alpha,1}$ 的限制 $W_\alpha$ 在 $\alpha^2 \neq 1$ 时是不可约的，且当 $\beta = \alpha$ 或 $\beta = \alpha^{-1}$ 时 $W_\alpha \cong W_\beta$。这给出了 $\frac{1}{2}(q - 3)$ 个 $q + 1$ 维不可约表示。
- 设 $\tau$ 是 $F^*$ 的特征标且 $\tau^2 = 1$，$\tau \neq 1$。$W_{\tau,1}$ 的限制是两个不同的不可约表示 $W'$ 和 $W''$ 的直和。
- $X_\varphi$ 的限制仅依赖于 $\varphi$ 在子群 $C$ 上的限制，且 $\varphi$ 和 $\varphi^{-1}$ 决定相同的表示。若 $\varphi^2 \neq 1$，则表示是不可约的。这给出了 $\frac{1}{2}(q - 1)$ 个 $q - 1$ 维不可约表示。
- 设 $\psi$ 是 $C$ 的特征标且 $\psi^2 = 1$，$\psi \neq 1$。$X_\psi$ 的限制是两个不同的不可约表示 $X'$ 和 $X''$ 的直和。

综上，我们得到了 $q + 4$ 个不同的不可约表示，因此这是一个完整的列表。为了完成特征标表，问题转化为描述四个表示 $W', W'', X'$ 和 $X''$。已知所有表示的维数平方和为 $q^2 + 1$，由此可以推断前两个表示的维数为 $\frac{1}{2}(q + 1)$，后两个为 $\frac{1}{2}(q - 1)$。这与我们在指数为二的子群限制表示中观察到的现象类似。尽管这里的指数更大，但我们可以通过寻找 $GL_2(\mathbb{F}_q)$ 中一个包含 $SL_2(\mathbb{F}_q)$ 的指数为二的子群 $H$，并分析这四个表示在 $H$ 上的限制来解决问题。

对于 $H$，我们取 $GL_2(\mathbb{F}_q)$ 中行列式为平方数的矩阵。其共轭类的代表元与 $GL_2(\mathbb{F}_q)$ 相同（仅包含行列式为平方数的代表元），但需要额外添加由元素 $\begin{pmatrix} x & \varepsilon \\ 0 & x \end{pmatrix}$（$x \in \mathbb{F}^*$）表示的类。这些类在 $GL_2(\mathbb{F}_q)$ 中与 $\begin{pmatrix} x & 1 \\ 0 & x \end{pmatrix}$ 共轭，但在 $H$ 中不共轭。这些是 $q - 1$ 个分裂共轭类。虽然可以利用前述方法计算 $H$ 的所有表示，但我们仅需部分信息。

注意到从 $G/H$ 的符号表示 $U'$ 是 $U_\tau$，因此有 $W_{\tau,1} \cong W_{\tau,1} \otimes U'$ 和 $X_\psi \cong X_\psi \otimes U'$；它们在 $H$ 上的限制会分裂为两个共轭的不可约表示，且维数减半。这表明这些表示在从 $H$ 限制到 $SL_2(\mathbb{F}_q)$ 时仍保持不可约性，因此 $W'$ 和 $W''$ 是维数为 $\frac{1}{2}(q + 1)$ 的共轭表示，而 $X'$ 和 $X''$ 是维数为 $\frac{1}{2}(q - 1)$ 的共轭表示。此外，我们知道它们在所有非分裂共轭类上的特征标值分别是 $W_{\tau,1}$ 和 $X_\psi$ 特征标值的一半。这些信息足以完成特征标表。唯一未被覆盖的特征标值如下：

$$
\begin{array}{ccccc}
& \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix} & \begin{pmatrix} 1 & \varepsilon \\ 0 & 1 \end{pmatrix} & \begin{pmatrix} -1 & 1 \\ 0 & -1 \end{pmatrix} & \begin{pmatrix} -1 & \varepsilon \\ 0 & -1 \end{pmatrix} \\
W' & s & t & s' & t' \\
W'' & t & s & t' & s' \\
X' & u & v & u' & v' \\
X'' & v & u & v' & u' \\
\end{array}
$$

前两行的确定方法如下：已知 $s + t = \chi_{W_{\tau,1}} \left( \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix} \right) = 1$。此外，由于 $\begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}^{-1} = \begin{pmatrix} 1 & -1 \\ 0 & 1 \end{pmatrix}$ 在 $q \equiv 1 \mod 4$ 时与 $\begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$ 共轭，否则与 $\begin{pmatrix} 1 & \varepsilon \\ 0 & 1 \end{pmatrix}$ 共轭，且对于任何特征标有 $\chi(g^{-1}) = \overline{\chi(g)}$，因此可以得出：若 $q \equiv 1 \mod 4$，则 $s$ 和 $t$ 为实数；若 $q \equiv 3 \mod 4$，则 $s = \overline{t}$。此外，由于 $-e$ 在任何不可约表示中作用为单位或负单位（根据Schur引理），对于任何不可约特征标 $\chi$，有：

$$
\chi(-g) = \chi(g) \cdot \chi(1)/\chi(-e).
$$

由此得到关系 $s' = \tau(-1)s$ 和 $t' = \tau(-1)t$。最后，将方程 $(\chi, \chi) = 1$ 应用于 $W'$ 的特征标，可以得到 $\overline{s}t + t\overline{s}$ 的表达式。解这些方程可得：

$$
s, t = \frac{1}{2} \pm \frac{1}{2}\sqrt{\omega q}, \quad u, v = -\frac{1}{2} \pm \frac{1}{2}\sqrt{\omega q},
$$

其中 $\omega = \tau(-1)$，当 $q \equiv 1 \mod 4$ 时为 1，当 $q \equiv 3 \mod 4$ 时为 -1。至此，我们完成了特征标表所需的全部计算。

## 3. 习题 { #s3 }

!!! problem "习题"
    计算每个不可约表示在 $V \otimes W_{\alpha,1}$ 和 $\text{Ind}(\varphi)$ 中的重数。

!!! problem "习题"
    求 $\text{PGL}_2(\mathbb{F}) = \text{GL}_2(\mathbb{F})/\mathbb{F}^*$ 的特征标表。

!!! problem "习题"
    通过 $\text{SL}_2(\mathbb{F}_q)$ 在 $\mathbb{P}^1(\mathbb{F}_q)$ 上的作用，证明 $\text{SL}_2(\mathbb{F}_2) \cong \mathfrak{S}_3$，$\text{PSL}_2(\mathbb{F}_3) \cong \mathfrak{A}_4$，以及 $\text{SL}_2(\mathbb{F}_4) \cong \mathfrak{A}_5$。

!!! problem "习题"
    利用 $\text{SL}_2(\mathbb{F}_q)$ 的特征标表证明当 $q$ 为奇数且大于3时，$\text{PSL}_2(\mathbb{F}_q)$ 是单群。

!!! problem "习题"
    计算 $\text{PSL}_2(\mathbb{F}_q)$ 的特征标表。

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/representation-theory.pdf){ .md-button download="representation-theory.pdf" }
