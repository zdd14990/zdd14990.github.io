---
title: 第四章：有限群的表示：一些进阶结论
date: 2025-11-19
updated: 2026-10-15
description: 表示论笔记第四章：Frobenius-Schur 指标、代数数和代数整数、Frobenius 可除性、Burnside 定理、积的表示、虚拟表示、诱导表示、诱导表示特征的 Frobenius 公式。
hide:
  - navigation
categories:
  - 代数
tags:
  - algebra
---

# 第四章：有限群的表示：一些进阶结论 { #top }

## 1. Frobenius-Schur 指标 { #s1 }

设 $G$ 为有限群，$V/\mathbb{C}$ 为 $G$ 的不可约表示。

!!! definition "定义"
    称 $V$ 是

    - **复型(complex type)**，若 $V\ncong V^*$。
    - **实型(real type)**，若其存在非退化 $G-$不变对称形式。
    - **四元数型(quaternionic type)**，若其存在非退化 $G-$不变反对称形式。

!!! problem "习题"
    -

        $$
        \mathrm{End}_{\mathbb{R}[G]}V=\begin{cases}
        \mathbb{C},V \text{为复型}\\
        \mathrm{Mat}_2(\mathbb{R}),V \text{为实型}\\
        \mathbb{H},V \text{为四元数型}\\
        \end{cases}
        $$

        其中 $\mathbb{H}$ 为四元数。

    - $V$ 为实型 $\Longleftrightarrow$ $V=\mathbb{C}\otimes_\mathbb{R} V_\mathbb{R}$，对某个 $G$ 在 $\mathbb{R}$ 上的表示 $V_\mathbb{R}$ 成立。

!!! theorem "定理"
    $V/\mathbb{C}$ 为 $G$ 的不可约表示，则

    $$
    \frac{1}{\left|G\right|}\sum_{g\in G} \chi_V (g^2)=\begin{cases}
    1,V \text{为实型}\\
    -1,V \text{为四元数型}\\
    0,V \text{为复型}\\
    \end{cases}
    $$

??? proof "证明"
    对矩阵 $A\in \mathrm{End}V$，设 $\lambda_1,\cdots,\lambda_n$ 为其特征值。则 $A\otimes A\big|_{S^2V}$ 有特征值 $\left\{\lambda_i\lambda_j\big| i\le j\right\}$，$A\otimes A\big|_{\land^2V}$ 有特征值 $\left\{\lambda_i\lambda_j\big| i< j\right\}$，故

    $$
    \mathrm{Tr}_V(A^2)=\sum \lambda_i^2 =\mathrm{Tr}_{S^2V}(A\otimes A)-\mathrm{Tr}_{\land^2V}(A\otimes A)
    $$

    于是

    $$
    \chi_V(g^2)=\chi_{S^2V}(g)-\chi_{\land^2V}(g)
    $$

    令 $P=\frac{1}{\left|G\right|}\sum_{g\in G} g$，对任意 $G$ 的表示 $U$，$P\big|_U$ 为其在 $U^G$ 上的投影。故

    $$
    \begin{aligned}
    \frac{1}{\left|G\right|}\sum_{g\in G} \chi_V(g^2)&=\chi_{S^2V}(P)-\chi_{\land^2V}(P)\\
    &=\dim (S^2V)^G-\dim (\land^2V)^G\\
    &=\begin{cases}
    1,V \text{为实型}\\
    -1,V \text{为四元数型}\\
    0,V \text{为复型}\\
    \end{cases}
    \end{aligned}
    $$

    最后一个等号是因为对于非退化的 $G-$不变形式 $V\times V\rightarrow \mathbb{C}$ 诱导了一个同构 $V^*\cong C$，故

    $$
    \mathrm{Hom}_G(V^*,V)\cong (V\otimes V)^G=(S^2V)^G\oplus (\land^2V)^G=\begin{cases}
    0,V^*\ncong V\\
    \mathbb{C},V^*\cong V\\
    \end{cases}
    $$

!!! definition "定义"
    定义不可约表示 $V$ 的 Frobenius-Schur 指标为

    $$
    FS(V)=\begin{cases}
    1,V \text{为实型}\\
    -1,V \text{为四元数型}\\
    0,V \text{为复型}\\
    \end{cases}
    $$

!!! theorem "定理"
    $$
    \#\left\{g\in G\Big| g^2=1\right\}=\sum_V\dim V\cdot FS(V)
    $$

    其中 $V$ 对所有不可约表示求和。

??? proof "证明"
    注意到 $g^2=1$ 当且仅当 $\chi_{\mathbb{C}[G]}(g^2)=\left|G\right|$，故

    $$
    \begin{aligned}
    \#\left\{g\in G\Big| g^2=1\right\}&=\frac{1}{\left|G\right|}\sum_{g\in 	G}\chi_{\mathbb{C}[G]}(g^2)\\
    &=\frac{1}{\left|G\right|}\sum_{g\in G} \sum_V \dim V\cdot \chi_V(g^2)\\
    &=\sum_V \dim V\cdot FS(V)\\
    \end{aligned}
    $$

!!! theorem "推论"
    设有限群 $G$ 的所有表示定义在 $\mathbb{R}$ 上(即所有复表示都由实表示复化得到)，则

    $$
    \#\left\{g\in G\Big| g^2=1\right\}=\sum_V\dim V
    $$

!!! problem "习题"
    证明所有非平凡的奇数阶有限群 $G$ 有一个不在 $\mathbb{R}$ 上定义的不可约表示。

## 2. 代数数和代数整数 { #s2 }

!!! definition "定义"
    $z\in \mathbb{C}$ 称为**代数数(algebraic number)**(**代数整数(algebraic integer)**)，若 $z$ 为一个首一的有理(整数)系数多项式的根。

!!! definition "定义"
    $z\in \mathbb{C}$ 称为**代数数(algebraic number)**(**代数整数(algebraic integer)**)，若 $z$ 为一个有理(整数)系数矩阵的特征值。

!!! theorem "命题"
    上述两定义等价。

??? proof "证明"
    注意到 $x^n+a_1x^{n-1}+\cdots+a_n$ 是 $\left( \begin{matrix} 0&		&		&		-a_n\\ 1&		0&		&		\vdots\\ &		\ddots&		\ddots&		-a_2\\ &		&		1&		-a_1\\ \end{matrix} \right)$ 的特征多项式即证。

记 $\overline{\mathbb{Q}}$ 为全体代数数，$\mathbb{A}$ 为所有代数整数。

!!! theorem "命题"
    - $\mathbb{A}$ 是环。
    - $\overline{\mathbb{Q}}$ 是域。

??? proof "证明"
    设 $\alpha,\beta$ 分别是 $A,B$ 的特征值。则 $\alpha \pm \beta$ 是 $A\otimes \mathrm{Id} \pm \mathrm{Id} \otimes B$ 的特征值，$\alpha \cdot \beta$ 是 $A\otimes B$ 的特征值，故 $\mathbb{A},\overline{\mathbb{Q}}$ 是环。

    若 $\alpha \in \overline{\mathbb{Q}}$ 是 $P(x)$ 的根，设 $d:=\deg P$，则 $\alpha^{-1}$ 是 $x^dP(\frac{1}{x})$ 的根，故 $\overline{\mathbb{Q}}$ 是域。

!!! theorem "命题"
    $\mathbb{A}\cap \mathbb{Q}=\mathbb{Z}$

!!! definition "定义"
    任意代数数 $\alpha$ 有**极小多项式(minimal polynomial)** $P(x)$ 是满足 $P(\alpha)=0$ 的次数最小的首一有理系数多项式。所有 $P(x)$ 的根称为 $\alpha$ 的**代数共轭(algebraic conjugates)**。

!!! theorem "引理"
    $\alpha_1,\cdots,\alpha_m\in \overline{\mathbb{Q}}$，则所有 $\alpha_1+\cdots+\alpha_m$ 的代数共轭均形如 $\alpha'_1+\cdots+\alpha'_m$，其中 $\alpha'_i$ 为 $\alpha_i$ 的代数共轭。

??? proof "证明"
    只需证 $m=2$ 的情形。设 $\alpha_i$ 是 $A_i$ 的特征值，且其特征多项式为极小多项式，则 $\alpha_1+\alpha_2$ 是 $A:=A_1\otimes \mathrm{Id} +\mathrm{Id} \otimes A_2$ 的特征值，任意 $\alpha_1+\alpha_2$ 的代数共轭 $\alpha'$ 均为 $A$ 的特征值，于是 $\alpha'=\alpha'_1+\alpha'_2$，其中 $\alpha'_1,\alpha'_2$ 为 $A$ 的特征值。

## 3. Frobenius 可除性 { #s3 }

!!! theorem "定理"
    $G$ 为有限群，$V/\mathbb{C}$ 为其不可约表示，则 $\dim V\mid \left|G\right|$

??? proof "证明"
    先证一个引理：

    !!! theorem "引理"
        对任意 $G$ 的共轭类 $C$，$\lambda:=\chi_V(g)\cdot \frac{\left|C\right|}{\dim V}\in \mathbb{A}$，其中 $g\in C$。

    ??? proof "引理的证明"
        设 $P=\sum_{g\in C} g\in Z(\mathbb{Z}[G])$，则 $P\big|_V=\lambda\cdot \mathrm{Id}$，于是 $\left|C\right|\cdot \chi(g)=\lambda\cdot \dim V$。

        由于 $\mathbb{Z}[G]$ 是有限生成 $\mathbb{Z}-$模，故对任意 $x\in \mathbb{Z}[G]$，子环 $\mathbb{Z}[x]$ 是有限生成模，于是存在 $n$ 使得 $\mathbb{Z}[x]=\left\{1,x,\cdots,x^{n-1}\right\}$生成的子模，故 $x$ 在 $\mathbb{Z}$ 上是整的。于是存在整系数多项式 $f(x)$ 使得 $f(P)=0$，即 $f(\lambda)=0$。

    设 $C_1,\cdots,C_n$ 为 $G$ 的共轭类。$\lambda_i:=\chi_V(g_i)\cdot \frac{\left| C_i\right|}{\dim V},g_i\in C$，则由引理 $\lambda_i\in \mathbb{A}$。由于 $\chi_V(g_i)$ 是 $\mathbb{A}$ 中的单位根且 $\mathbb{A}$ 是环，故 $\sum_i \lambda_i\cdot \overline{\chi_V(g_i)}\in \mathbb{A}$。

    另一方面

    $$
    \sum_i \lambda_i \overline{\chi_V(g_i)}=\sum_i \left|\chi_V(g_i)\right|^2\cdot \frac{\left|C_i\right|}{\dim V}=\frac{\left|G\right|}{\dim V}(\chi_V,\chi_V)=\frac{\left|G\right|}{\dim V}\in \mathbb{Q}
    $$

    综上有 $\frac{\left|G\right|}{\dim V}\in \mathbb{A}\cap \mathbb{Q}=\mathbb{Z}$，即证。

!!! theorem "定理"
    $V/\mathbb{C}$ 是有限群 $G$ 的不可约表示，$C$ 为 $G$ 的中心，则 $\dim V\mid \left|G\right|/\left|C\right|$。

## 4. Burnside 定理 { #s4 }

!!! theorem "引理"
    若 $\varepsilon_1,\cdots,\varepsilon_n$ 为单位根，满足 $\frac{\varepsilon_1+\cdots+\varepsilon_n}{n}\in \mathbb{A}$，则要么 $\varepsilon_1=\cdots=\varepsilon_n$，要么 $\varepsilon_1+\cdots+\varepsilon_n=0$。

??? proof "证明"
    设 $a=\frac{\varepsilon_1+\cdots+\varepsilon_n}{n}$，若 $\varepsilon$ 不全相等，则 $\left|a\right|<1$。$\varepsilon_i$ 的代数共轭还是单位根。而 $a$ 的代数共轭形如

    $$
    a'=\frac{\varepsilon'_1+\cdots+\varepsilon'_n}{n}
    $$

    其中 $\varepsilon'_i$ 是 $\varepsilon_i$ 的代数共轭。故 $\left|a'\right|< 1$，于是 $\left|\prod_{ a'} a'\right|< 1$。但该乘积为整数，故 $\prod_{a'} a'=0$，于是 $a=0$。

!!! theorem "命题"
    $V$ 为 $G$ 的不可约表示，$C\subseteq G$ 为共轭类满足 $(\left|C\right|,\dim V)=1$，则 $\forall g\in C$，  要么 $\chi_V(g)=0$，要么 $\rho_V(g)=\lambda_g\cdot \mathrm{Id}_V$ 对某个 $\lambda_g\in k^*$ 成立。

??? proof "证明"
    设 $n=\dim V$，且 $\varepsilon_1,\cdots,\varepsilon_n$ 是 $\rho_V(g)$ 的特征值。则 $\varepsilon_i$ 是单位根，且 $\chi_V(g)=\varepsilon_1+\cdots+\varepsilon_n$。由于 $(\left|C\right|,n)=1$，存在 $a,b\in \mathbb{Z}$ 使得 $a\left|C\right|+bn=1$。于是

    $$
    a\frac{\left|C\right|\cdot \chi_V(g)}{n}+b\chi_V(g)=\frac{\chi_V(g)}{n}=\frac{\varepsilon_1+\cdots+\varepsilon_n}{n}
    $$

    由 **引理 4.2**知 $\frac{\left|C\right|\chi_V(g)}{n}\in \mathbb{A}$，又 $\chi_V(g)=\varepsilon_1+\cdots+\varepsilon_n\in \mathbb{A}$，结合 $\mathbb{A}$ 是环知 $\frac{\varepsilon_1+\cdots+\varepsilon_n}{n}\in \mathbb{A}$，由**引理 4.3**即得。

!!! theorem "定理"
    设 $G$ 为有限群，$C$ 是 $G$ 的共轭类，$\left|C\right|=p^a$ 其中 $p$ 为素数，$a$ 为正整数。则 $G$ 有一个非平凡正规子群。

??? proof "证明"
    $$
    \mathrm{Irr}(G) = \left\{trivial\right\}\sqcup \left\{V\in \mathrm{Irr}(G)\Big| p\min \dim V\right\}\sqcup \left\{V\in \mathrm{Irr}(G)\Big| p\nmid \dim V,V\neq trivial\right\}
    $$

    后两者记为 $D$ 与 $N$。取 $g \in C$， $g \neq e$。对任意$V \in D, \ \frac{1}{p} \dim V \cdot \chi_V(g)) \in \mathbb{A}$，故 $\sum_{V \in D} \frac{1}{p} \dim V \cdot \chi_V(g) = b \in \mathbb{A}$，再由正交性条件推出 $\sum_{V \in \mathrm{Irr}(G)} \dim V \cdot \chi_V(g)) = 0$。进一步有

    $$
    1 + pb + \sum_{V\in N} \dim V \cdot \chi_V(g) = 0
    $$

    又 $\mathbb{A} \cap \mathbb{Q} = \mathbb{Z},b \in \mathbb{A}$，于是对某个 $V\in N$，$\chi_V(g) \neq 0$

    由 **命题 4.4**，结合 $|C| = p^q,(|C|, \dim V) = 1$ 知存在 $\lambda \in k^{*}$ 使得 $\chi_V(g) = \lambda \operatorname{Id}_V$。故对任意 $h\in C$ 有 $\rho_V(h)=\lambda\cdot \mathrm{Id}_V$，进一步有 $\forall g_1,g_2\in C,g_1g_2^{-1}\in \ker \rho_V=:H$。于是 $\left\{e\right\}\neq H\triangleleft G$。由于 $V$ 非平凡故 $H \neq G$。因此，$H$ 是 $G$ 的一个非平凡真正规子群。

!!! definition "定义"
    一个群 $G$ 称为**可解的(solvable)**，若存在 $\left\{e\right\}=G_1\lhd G_2\lhd \cdots\lhd G_n=G$ 使得 $G_{i-1}\subset G_i$ 为正规子群，$G_i/G_{i-1}$ 为阿贝尔群。

!!! theorem "定理（Burnside）"
    若 $\left|G\right|=p^aq^b$，$p,q$ 为素数，$a,b\ge 0$，则 $G$ 可解。

??? proof "证明"
    反证法。设 $G$ 是最小的不可解群，其阶为 $p^aq^b$。则 $G$ 必为单群，于是 $Z(G)=\left\{e\right\}$。

    设 $G=\bigsqcup_i C_i$，$\left\{C_i\right\}$ 是共轭类。由**定理 4.5**知 $p\cdot q\mid \left|C_i\right|$ 对所有 $C_i\neq \left\{e_i\right\}$ 成立。故

    $$
    \left|G\right|=p^aq^b=\sum \left|C_i\right|=1+\sum_{C_i\neq \left\{e\right\}} \left|C_i\right|
    $$

    矛盾！

## 5. 积的表示 { #s5 }

!!! theorem "定理"
    设 $G,H$ 是有限群，$\mathrm{Irr}(G)=\left\{V_i\right\},\mathrm{Irr}(H)=\left\{W_j\right\}$，则 $\mathrm{Irr}(G\times H)=\left\{V_i\otimes W_j\right\}$

??? proof "证明"
    由**定理 2.7**即得。

## 6. 虚拟表示 { #s6 }

!!! definition "定义"
    有限群 $G$ 的**虚拟表示(virtual representation)**是一个不可约表示的整系数线性组合 $V=\sum n_iV_i,n_i\in \mathbb{Z}$，其特征 $\chi_V:=\sum n_i\chi_{V_i}$。

!!! theorem "引理"
    设 $V$ 是虚拟表示，其特征为 $\chi_V$，若 $(\chi_V,\chi_V)=1$ 且 $\chi_V(1)>0$，则 $\chi_V$ 为 $G$ 某个不可约表示的特征。

??? proof "证明"
    $\chi_V=\sum n_i \chi_{V_i}$，则 $(\chi_V,\chi_V)=\sum n_i^2=1$，又 $\chi_V(1)=\sum n_i\dim V>0$， 故 $n_i$ 中只有一者为 1 其余为 0。

## 7. 诱导表示 { #s7 }

!!! definition "定义"
    对群 $G$ 的表示 $V$ 与子群 $H\subset G$，存在一个自然 $H$ 的表示。$V$ 在 $H$ 上的**限制(restriction)** $\mathrm{Res}_H^G V$ 为由向量空间 $V$ 与限制在其上的作用 $\rho_{\mathrm{Res}_H^G V}=\rho_V\big|_H$ 构成的表示。

反过来，我们有一种自然但不平凡的方式对给定子群 $H$ 的表示 $V$ 构造 $G$ 的表示。

!!! definition "定义"
    设 $G$ 是群，$H\subset G$ 为子群，$V$ 是 $H$ 的表示，则**诱导表示(induced representation)** $\mathrm{Ind}_H^G V$ 是 $G$ 的表示，由

    $$
    \mathrm{Ind}_H^GV=\left\{f:G\rightarrow V\Big| f(hx)=\rho_V(h)f(x)\forall x\in G,h\in H\right\}
    $$

    与作用 $g(f)(x)=f(xg),\forall g\in G$ 给出。

由 $g(f)(hx)=f(hxg)=\rho_V(h)f(xg)=\rho_V(x)g(f)(x)$ 故 $g\in \mathrm{End}(\mathrm{Ind}_H^GV)$，结合 $(g_1g_2)(f)(x)=f(xg_1g_2)=g_2f(xg_1)=g_2(g_1f(x))$ 知 $\mathrm{Ind}_H^GV$ 确实是表示。

事实上，我们自然地有 $\mathrm{Ind}_H^GV\cong \mathrm{Hom}_H(k[G],V)$。于是：

!!! theorem "命题"
    $$
    \mathrm{Ind}_H^GV\cong k[G]\otimes_{k[H]} V
    $$

另外，注意到如果我们从所有 $H$ 对 $G$ 的右陪集 $\sigma$ 中取出一个代表元 $x_\sigma$，则任意 $f\in \mathrm{Ind}_H^G V$ 由 $\left\{x_\sigma\right\}$ 唯一确定。于是我们有

$$
\dim(\mathrm{Ind}_H^G V)=\dim V\cdot \frac{\left|G\right|}{\left|H\right|}
$$

考虑群 $K\subset H\subset G$ ，考虑 $K$ 对 $H$、$H$ 对 $G$、$K$ 对 $G$ 的右陪集的代表元分别为 $\left\{x_i\right\}$、$\left\{y_j\right\}$、$\left\{z_k\right\}$，我们有一一对应 $\left\{x_i\right\}\times \left\{y_j\right\}\leftrightarrow\left\{z_k\right\}$。于是

$$
\begin{aligned}
\mathrm{Hom}_H(k[G],\mathrm{Hom}_K(k[H],V))&\rightarrow \mathrm{Hom}_K(k[G],V)\\
\varphi:\begin{aligned}
k[G]&\rightarrow \mathrm{Hom}_K(k[H],V)\\
y_j&\mapsto \left(x_i\mapsto \varphi(y_j)(x_i)\right)
\end{aligned}
&\mapsto \phi:z_k\mapsto \varphi(y_j)(x_i)\\
\end{aligned}
$$

是同构，这表明 $\mathrm{Ind}_H^G\mathrm{Ind}_K^HV\cong \mathrm{Ind}_K^GV$。

## 8. 诱导表示特征的 Frobenius 公式 { #s8 }

现在我们来计算 $\mathrm{Ind}_H^G(V)$ 的特征 $\chi$。对右陪集 $\sigma\in G/H$，取代表元 $x_\sigma$

!!! theorem "定理"
    $$
    \chi(g)=\sum_{\sigma\in G/H:x_\sigma g x^{-1}_\sigma\in H} \chi_V(x_\sigma g x^{-1}_\sigma)
    $$

    这个式子被称作 Frobenius 公式。

**注：**若 $\mathrm{char} k$ 与 $\left|H\right|$ 互素，则有

$$
\chi(g)=\frac{1}{\left|H\right|}\sum_{x\in G:xg x^{-1}\in H} \chi_V(x g x^{-1})
$$

??? proof "证明"
    对 $G$ 的 $H-$右陪集 $\sigma$，定义

    $$
    V_\sigma=\left\{f\in \mathrm{Ind}_H^GV\Big| f(g)=0,\forall g\notin \sigma\right\}
    $$

    则我们有

    $$
    \mathrm{Ind}_H^GV=\bigoplus_\sigma V_\sigma
    $$

    于是

    $$
    \chi(g)=\sum_\sigma \chi_\sigma(g)
    $$

    其中 $\chi_\sigma$ 是 $\rho(g)$ 对应在 $V_\sigma$ 的迹。由于 $g(\sigma)=\sigma g$ 依旧是 $H-$右陪集，故若 $\sigma\neq \sigma g$ 则 $\chi_\sigma(g)=0$。

    若 $\sigma=\sigma g$ 则 $x_\sigma g=hx_\sigma$，其中 $h=x_\sigma g x^{-1}_\sigma\in H$。考虑 $\alpha:V_\sigma \rightarrow V,f\mapsto f(x_\sigma)$。由于 $f\in V_\sigma$ 由 $f(x_\sigma)$ 唯一确定，故 $\alpha$ 是同构，我们有

    $$
    \alpha(gf)=g(f)(x_\alpha)=f(x_\sigma g)=f(hx_\sigma)=\rho_V(h)f(x_\sigma)=h\alpha (f)
    $$

    即 $gf=\alpha^{-1}h\alpha(f)$，这表明 $\chi_\sigma(g)=\chi_V(h)$，于是

    $$
    \chi(g)=\sum_{\sigma\in H\setminus G:\sigma g=\sigma} \chi_V(x_\sigma g x_\sigma ^{-1})
    $$

## 9. Frobenius 互反律 { #s9 }

!!! theorem "定理"
    设群 $H\subset G$，$V$ 与 $W$ 分别是 $G$ 与 $H$ 的表示。则

    $$
    \mathrm{Hom}_H(V,\mathrm{Ind}_H^GW)\cong \mathrm{Hom}_H(\mathrm{Res}_H^G V,W)
    $$

??? proof "证明"
    我们有

    $$
    \mathrm{Hom}_A(P\otimes_BW,V)\cong \mathrm{Hom}_B(W,\mathrm{Hom}_A(P,V))
    $$

    带入 $A=k[G],B=k[H],P=k[G]$ 即得。

## 10. Mackey 公式 { #s10 }

设 $H,K\subset G$ 是子群，$\rho:H\rightarrow \mathrm{GL}(W)$，$V=\mathrm{Ind}_H^G W$，设 $G=\coprod_{s\in S} KsH$ 为双陪集分解。对任意 $s\in S$，取 $H_s:=sHs^{-1}\cap K$ 与 $\rho^s:H_s\rightarrow \mathrm{GL}(W),x\mapsto \rho(s^{-1}xs)$，这是一个表示，记作 $W_s$。

!!! theorem "定理（Mackey）"
    $$
    \mathrm{Res}_K^G\mathrm{Ind}_H^G(W)=\bigoplus_{s\in S} \mathrm{Ind}_{H_s}^K(W_s)
    $$

??? proof "证明"
    $$
    \begin{aligned}
    LHS=\bigoplus_{g\in G/H}g \otimes W&=\bigoplus_{s\in S}\bigoplus_{g\in KsH/H} g\otimes W\\
    &=\bigoplus_{s\in S}\bigoplus_{g\in K/H_s} gs\otimes W\\
    &=\bigoplus_{s\in S}\mathrm{Ind}_{H_s}^K(s\otimes W)\\
    &\cong \bigoplus_{s\in S}\mathrm{Ind}_{H_s}^KW_s\\
    \end{aligned}
    $$

!!! theorem "推论（Mackey 不可约性判定）"
    设 $\mathrm{char} k=0$ 且 $k$ 代数闭。则 $V=\mathrm{Ind}_H^G W$ 不可约当且仅当 $W$ 不可约且对 $\forall s\in G\setminus H$ ，两个 $H_s$ 的表示 $\rho^s$ 与 $\mathrm{Res}_{H_s}^H(\rho)$ 不交。

??? proof "证明"
    由假设 $k[G]$ 是半单的。于是 $V$ 不可约当且仅当 $\mathrm{Hom}_G(V,V)=k$。但

    $$
    \begin{aligned}
    \mathrm{Hom}_G(V,V)&=\mathrm{Hom}_G(\mathrm{Ind}_H^GW,V)\\
    (Frobenius \text{ }reciprocity)&=\mathrm{Hom}_H(W,\mathrm{Res}_H^GV)\\
    (Mackey's \text{ }formula)&=\oplus_{s\in H\setminus G/H}\mathrm{Hom}_H(W,\mathrm{Ind}_{H_s}^H(W_s))\\
    &=\oplus_{s\in H\setminus G/H} \mathrm{Hom}_{H_s}(\mathrm{Res}_{H_s}^H W,W_s)
    \end{aligned}
    $$

    由于当 $s=e$ 时，$\mathrm{Hom}_{H_s}(\mathrm{Res}_{H_s}^HW,W_s)=\mathrm{Hom}_H(W,W)\supseteq k$，故 $V=\mathrm{Ind}_H^G W$ 不可约当且仅当 $W$ 不可约且对 $\forall s\in G\setminus H$，$\mathrm{Hom}_{H_s}(\mathrm{Res}_{H_s}^HW,W_s)=\left\{0\right\}$。

## 11. 正规子群 { #s11 }

!!! theorem "命题"
    令 $A$ 是群 $G$ 的一个正规子群，$\rho:G\rightarrow \mathrm{GL}(V)$ 是 $G$ 的一个不可约表示，则

    - 或者存在 $G$ 的一个子群 $H\neq G$ 且包含 $A$，以及 $H$ 的一个不可约表示 $\sigma$ 使得 $\rho$ 由 $\sigma$ 诱导。
    - 或者 $\rho$ 在 $A$ 上的限制是**同型的(isotypic)**，即是一些同构的不可约表示的直和。

??? proof "证明"
    $$
    \mathrm{Res}_A^GV=\bigoplus_i W_i\otimes U_i
    $$

    其中 $\left\{W_i\right\}$ 是 $A$ 的不可约表示，$U_i:=\mathrm{Hom}_A(W_i,V)$(这称为**同型分解(isotypical decomposition)**)。令 $V_i=W_i\otimes U_i$。由于 $A\lhd G$，故 $\forall g\in G,gAg^{-1}=A$。于是 $gW_i\le \mathrm{Res}_A^G V$ 为 $A$ 的表示，结合 $W_i$ 为 $A$ 的不可约表示知 $gW_i$ 为不可约表示，于是 $\exists j$，$gW_i=W_j$。于是 $g\in G$ 为 $\left\{V_i\right\}$ 的一个置换。由于 $V$ 不可约，$V=\sum_{g\in G} gV_i$。

    取 $V_{i_0}\in \left\{V_i\right\}$，若 $V_{i_0}=V$，则为 $(2)$。若 $V_{i_0}\neq V$，令 $H:=\left\{s\in G\Big| sV_{i_0}=V_{i_0}\right\}\supset A$。于是 $H\subsetneq G$，且 $V=\bigotimes_{g\in G/H}g V_{i_0}\cong \mathrm{Ind}_H^GV_{i_0}$ 为 $(1)$。

!!! theorem "推论"
    $A\lhd G$，$A$ 阿贝尔群，则对任意 $G$ 的表示 $V$，

    $$
    \dim V\mid (G:A)
    $$

??? proof "证明"
    对 $\left|G\right|$ 归纳。若为 $(1)$，$V=\mathrm{Ind}_H^G W$，则 $\dim W\mid (H:A)$，故 $\dim V\mid (G:A)$。

    若为 $(2)$，令 $G'=\rho_V(G),A'=\rho_V(A)$，则 $G/A\rightarrow G'/A'$ 是满射，故 $(G':A')\mid (G:A)$。由 $A$ 是阿贝尔群，$\mathrm{Res}_A^G V=W_i\otimes U_i$，其中 $W_i$ 为 $A$ 的一维表示，于是 $A'$ 是标量 $\Longrightarrow A'\subset Z(G')\Longrightarrow \dim V\mid (G':A')\Longrightarrow \dim V\mid (G:A)$。

## 12. 半直积 { #s12 }

设 $A,H$ 是群 $G$ 的两个子群，且 $A$ 是正规子群，做如下假设：

- $A$ 是 Abel 的。
- $G$ 是 $H$ 和 $A$ 的半直积(这意味着 $G=A\cdot H$ 且 $A\cap H=\left\{1\right\}$，换句话说，$G$ 的每一个元素都可以唯一的写成乘积 $ah$ 的形式，$a\in A,h\in H$)

我们证明，$G$ 的不可约表示可以由 $H$ 的某些子群的不可约表示构造出来。

首先因为 $A$ 是 Abel 的，所以它的不可约特征标都是一级的，并且构成一个群 $X=\mathrm{Hom}(A,\mathbb{C}^*)$。群 $G$ 如下作用于 $X$ 上：对于 $s\in G,\chi\in X,a\in A,$

$$
(s\chi)(a)=\chi(s^{-1}as)
$$

令 $(\chi_i)_{i\in X/H}$ 是 $H$ 在 $X$ 中轨道的一个代表系，对于每一 $i\in X/H$，令 $H_i$ 是 $H$ 中使得 $h\chi_i=\chi_i$ 的元素 $h$ 所成的子群，又令 $G_i=A\cdot H$ 是 $G$ 中相应的子群。对于 $a\in A,h\in H_i$，令

$$
\chi_i(ah)=\chi_i(a)
$$

这样就将函数 $\chi_i$ 开拓到 $G_i$ 上。对于一切 $h\in H_i$，都有 $h\chi_i=\chi_i$。利用这一事实就能看出 $\chi_i$ 是 $G_i$ 的一个一级特征标。现在令 $\rho$ 是 $H_i$ 的一个不可约表示，作 $\rho$ 与典范射影 $G_i\rightarrow H_i$ 的合成映射，就得到 $G_i$ 的一个不可约表示 $\tilde{\rho}$。最后作 $\chi_i$ 与 $\tilde{\rho}$ 的张量积我们得到 $G_i$ 的一个不可约表示 $\chi_i\otimes \tilde{\rho}$，这诱导出 $G$ 上的表示 $\theta_{i,\rho}$。

!!! theorem "命题"
    - $\theta_{i,\rho}$ 是不可约的。
    - 若 $\theta_{i,\rho}$ 与 $\theta_{i',\rho'}$ 同构，则 $i=i'$ 且 $\rho$ 与 $\rho'$ 同构。
    - $G$ 的每一不可约表示都与某一  $\theta_{i,\rho}$ 同构。

??? proof "证明"
    我们利用 Mackey 判定来证明 $(1)$。设 $s \notin G_i = A \cdot H_i$，且 $K_s = G_i \cap sG_i s^{-1}$。需验证：若将 $G_i$ 的表示 $\chi_i \otimes \hat{\rho}$ 分别与单射 $K_s \to G_i$，$x \mapsto x$ 和 $x \mapsto s^{-1}xs$ 合成，则得到 $K_s$ 的两个不同表示。为此，只需证明这两个表示在 $K_s$ 的子群 $A$ 上的限制不同。第一个表示在 $A$ 上的限制是 $\chi_i$ 的一个倍数，而第二个表示的限制是 $s\chi_i$ 的倍数。由于 $s \notin A \cdot H_i$，有 $s\chi_i \neq \chi_i$，故两表示确实不同。

    现证明 $(2)$。首先，$\theta_{i,\rho}$ 在 $A$ 上的限制仅包含属于轨道 $H\chi_i$ 的特征标 $\chi$，这确定了 $i$。其次，设 $W$ 为 $\theta_{i,\rho}$ 的表示空间，$W_i$ 是 $W$ 中对应 $\chi_i$ 的子空间（即满足 $\theta_{i,\rho}(a)x = \chi_i(a)x \, (\forall a \in A)$ 的 $x \in W$）。子空间 $W_i$ 在 $H_i$ 下稳定，且可直接验证 $H_i$ 在 $W_i$ 中的表示与 $\rho$ 同构，故 $\theta_{i,\rho}$ 也确定了 $\rho$。

    最后，设 $\sigma: G \to GL(W)$ 为 $G$ 的不可约表示，并设 $W = \bigoplus_{\chi \in X} W_\chi$ 是 $\operatorname{Res}_A W$ 的典范分解。至少存在一个非零的 $W_\chi$。若 $s \in G$，则 $\sigma(s)$ 将 $W_\chi$ 映射至 $W_{s(\chi)}$。群 $H_i$ 保持 $W_\chi$ 不变；取 $W_i$ 为 $W_{\chi_i}$ 的不可约子 $\mathbb{C}[H_i]$-模，对应表示 $\rho$。显然 $G_i = A \cdot H_i$ 的表示与 $\chi_i \otimes \hat{\rho}$ 同构。因此，$\sigma$ 在 $G_i$ 上的限制至少包含一次 $\chi_i \otimes \hat{\rho}$。故

    $$
    1\le \dim \mathrm{Hom}_{G_i} (\chi_i\otimes \tilde{\rho},\mathrm{Res}_{G_i}^G W)\le \overset{Frobenius}{=}\dim \mathrm{Hom}_G(\theta_{i,\rho},W)
    $$

    ，由于 $\theta_{i,\rho}$ 和 $W$ 不可约，故 $\sigma$ 与 $\theta_{i,\rho}$ 同构，即证 $(3)$。

## 13. Artin 定理 { #s13 }

在本节中，$k=\mathbb{C}$，$G$ 是有限群。

回忆 $F_c(G,\mathbb{C})$ 为 $G$ 上的复值类函数，$\forall \varphi,\psi \in F_c(G,\mathbb{C})$，

$$
\left<\varphi,\psi\right>:=\frac{1}{\left|G\right|} \sum_{g\in G} \varphi(g)\cdot \overline{\psi(g)}
$$

!!! theorem "命题"
    对子群 $H\subseteq{} G$，我们有

    $$
    \mathrm{Res}_H^G:F_c(G,\mathbb{C})\rightarrow F_c(H,\mathbb{C})
    $$

    $$
    \begin{aligned}
    \mathrm{Ind}_H^G:F_c(H,\mathbb{C})&\rightarrow F_c(G,\mathbb{C})\\
    f&\mapsto \left(\mathrm{Ind}_H^G f(x)=\frac{1}{\left|H\right|}\sum_{\substack{g\in G\\ gxg^{-1}\in H}} f(gxg^{-1})\right)
    \end{aligned}
    $$

    容易验证 $\mathrm{Ind}_H^G f\in F_c(G,\mathbb{C})$。

于是我们有

!!! theorem "命题"
    - 若 $\varphi_i=\chi_{V_i},i=1,2$ 为两个表示的特征标，则

        $$
        \left<\varphi_1,\varphi_2\right>=\dim \mathrm{Hom}_G(V_2,V_1)
        $$

    - ( Frobenius 互反律) 若 $\psi \in F_c(H,\mathbb{C}),\varphi\in F_c(G,\mathbb{C})$，则

        $$
        \left<\mathrm{Ind}_H^G \psi,\varphi\right>_G=\left<\psi, \mathrm{Res}_H^G \varphi\right>_H
        $$

    - 若 $\psi \in F_c(H,\mathbb{C}),\varphi\in F_c(G,\mathbb{C})$，则

        $$
        \mathrm{Ind}_H^G(\psi \cdot \mathrm{Res}_H^G(\varphi))=\mathrm{Ind}_H^G(\psi )\cdot \varphi
        $$

        $$
        \left( \begin{aligned}
        \text{作为 $G-$表示 }\mathrm{Ind}_H^G(W\otimes \mathrm{Res}_H^G V)&\cong \mathrm{Ind}_H^G W\otimes V\\
        g\otimes (w\otimes v) &\mapsto g\otimes w\otimes gv
        \end{aligned}\right)
        $$

考虑

$$
R(G):=\mathbb{Z}\chi_i\oplus \cdots \oplus \mathbb{Z} \chi_n
$$

其中 $\left\{\chi_1,\cdots,\chi_n\right\}$ 为 $G$ 的不同的不可约特征标，由 $\chi_i\cdot \chi_j\in R(G)$，故 $R[G]\subseteq F_c(G,\mathbb{C})$ 为子环，且

$$
\mathbb{C}\otimes_\mathbb{Z} R(G)\cong F_c(G,\mathbb{C})
$$

!!! definition "定义（Artin 定理）"
    令 $X$ 是有限群 $G$ 的一个子群族，令

    $$
    \mathrm{Ind}:\bigoplus_{H\in X} R(H)\mapsto R(G)
    $$

    是由映射族 $\mathrm{Ind}_H^G,H\in X$ 定义的同态，则

    $$
    G=\bigcup_{\substack{g\in G\\ H\in X}}gHg^{-1} \Longleftrightarrow \mathrm{Ind} \text{的余核有限}
    $$

**注：**

- $R(G)$ 作为群是有限生成的，故 $\mathrm{coker} \mathrm{Ind}$ 有限当且仅当对任意 $G$ 的特征 $\chi$，存在 $\chi_H\in R(H),d\in \mathbb{Z}_{\ge 1}$ 满足

    $$
    d\chi=\sum_{H\in X} \mathrm{Ind}_H^G(\chi_H)
    $$

- 设 $X$ 为所有 $G$ 的循环子群，则 $G=\bigcup_{\substack{g\in G\\ H\in X}} gHg^{-1}$，于是任意 $G$ 的特征标都是这些循环子群的特征标的有理线性组合。

??? proof "证明"
    $\Longleftarrow$：设 $S=\bigcup_{\substack{g\in G\\ H\in X}} gHg^{-1}$，对任意 $f_H\in R(H)$，$\sum_{H\in X} \mathrm{Ind}_H^G(f_H)$ 在 $G\setminus S$ 上取到 0。于是每个 $f\in R(G)\otimes_\mathbb{Z} \mathbb{C}=F_c(G,\mathbb{C})$ 在 $G\setminus S$ 上取到 0。故 $G=S$。

    $\Longrightarrow$：只需证

    $$
    \mathbb{Q}\otimes \mathrm{Ind}:\bigoplus_{H\in X} \mathbb{Q}\otimes R(H)\rightarrow \mathbb{Q}\otimes R(G) \text{ 是满射}
    $$

    即证

    $$
    \mathbb{C}\otimes \mathrm{Ind}:\bigoplus_{H\in X} \mathbb{C}\otimes R(H)\rightarrow \mathbb{C}\otimes R(G) \text{ 是满射}
    $$

    即证

    $$
    \mathbb{C}\otimes \mathrm{Ind}:\bigoplus_{H\in X} F_C(H,\mathbb{C})\rightarrow F_c(G,\mathbb{C}) \text{ 是满射}
    $$

    (两者都等价于矩阵 $A$ 的行线性无关这一事实，其中 $A$ 是一个这样的矩阵：其列由关于 $G$ 的不可约表示的诱导表示 $\mathrm{Ind}_H^G V$（针对不同子群 $H$ 和表示 $V$）的分解系数构成。)

    由对偶性，$\mathbb{C}\otimes \mathrm{Ind}$ 是满射等价于 $\mathbb{C}\otimes \mathrm{Res} :F_c(G,\mathbb{C})\rightarrow \oplus_{H\in X} F_c(H,\mathbb{C})$ 是单射，由于 $G=\bigcup_{\substack{g\in G\\ H\in X}} gHg^{-1}$，这是显然的。

??? proof "$\Longrightarrow$ 的另一个证明"
    设 $A$ 是循环群，定义 $\theta_A(x)=\begin{cases} \left|A\right| &,\text{若 } x \text{ 生成 } A\\ 0& ,otherwise\\ \end{cases}$

    !!! theorem "引理"
        -

            $$
            \left|G\right|=\sum_{A\subseteq G} \mathrm{Ind}_A^G \theta_A
            $$

            其中求和号对所有 $G$ 的循环群 $A$ 求和。

        - 若 $A$ 是循环群，则 $\theta_A\in R(A)$。

    ??? proof "引理的证明"
        $(1)$：

        $$
        \mathrm{Ind}_A^G \theta_A(x)=\frac{1}{\left|A\right|} \sum_{\substack{y\in G\\ yxy^{-1}\in A}} \theta_A(yxy^{-1})=\sum_{\substack{y\in G\\ yxy^{-1}\text{ 生成 } A}} 1
        $$

        故

        $$
        \sum_{A\subseteq G} \mathrm{Ind}_A^G \theta_A(x)=\sum_{y\in G} 1=\left|G\right|
        $$

        $(2)$：对 $\left|A\right|$ 归纳。由 $(1)$ 知

        $$
        \theta_A=\left|A\right|-\sum_{B\subsetneq A} \mathrm{Ind}_B^A(\theta_B)
        $$

        若 $\theta_B\in R(B)$ 则 $\mathrm{Ind}_B^A \theta_B\in R(A)$，结合 $\left|A\right|\in R(A)$ 知 $\theta_A\in R(A)$。

    回原题，注意到若对某个 $g\in G$，$H'\subseteq gHg^{-1}\subseteq G$，则

    $$
    \mathrm{Ind}_{H'}^GW'=\mathrm{Ind}_{gHg^{-1}}^G \mathrm{Ind}_{H'}^{gHg^{-1}} W'
    $$

    因此

    $$
    \mathrm{Im} \mathrm{Ind}_{H'}^G\subseteq \mathrm{Im} \mathrm{Ind}_{gHg^{-1}}^G=\mathrm{Im} \mathrm{Ind}_H^G
    $$

    由于 $G=\bigcup_{\substack{g\in G\\ H\in X}} gHg^{-1}$，任意循环子群均包含于某个 $gHg^{-1}$。于是我们可以设 $X=\left\{G \text{ 的循环子群}\right\}$。由引理知 $\left|G\right|=\sum_{A\in X}\mathrm{Ind}_A^G(\theta_A)$ 且 $\theta_A\in R(A)$，故 $\left|G\right|\in \mathrm{Im} \mathrm{Ind}$。

    由于 $\mathrm{Ind}_H^G(\varphi\cdot \mathrm{Res}_H^G \psi)=(\mathrm{Ind}_H^G \varphi)\cdot \psi$，故 $\mathrm{Im} \mathrm{Ind} \subset R(G)$ 是理想。结合 $\left|G\right|\in \mathrm{Im} \mathrm{Ind}$ 知 $\mathrm{coker} \mathrm{Ind}$ 是有限的。

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/representation-theory.pdf){ .md-button download="representation-theory.pdf" }
