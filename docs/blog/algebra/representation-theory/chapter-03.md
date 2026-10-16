---
title: 第三章：有限群的表示：一些基本结论
date: 2025-11-19
updated: 2026-10-15
description: 表示论笔记第三章：Maschke 定理、特征、表示的对偶和张量积、特征的正交性、酉表示与 Maschke 定理的另一个对复表示的证明、矩阵元素的正交性、特征表、Frobeniu 行列式。
hide:
  - navigation
categories:
  - 代数
tags:
  - representation-theory
---

# 第三章：有限群的表示：一些基本结论 { #top }

## 1. Maschke 定理 { #s1 }

!!! theorem "定理（Maschke）"
    设 $G$ 是有限群，$k$ 是域且 $\mathrm{char}k\nmid \left|G\right|$，则：

    - 代数 $k[G]$ 是半单的。

    - 存在同构 $\psi:k[G]\rightarrow \bigoplus_i \mathrm{End}V_i,g\mapsto \bigoplus_i g\big|_{V_i}$，其中 $V_i$ 是 $G$ 的不可约表示。特别的，这是一个 $G$ 的表示的同构。因此，$k[G]$ 的正则表示可以分解成不可约表示的直和：$\bigoplus_i\dim(V_i)V_i$，于是我们有“平方和公式”：

        $$
        \left|G\right|=\sum_i \dim (V_i)^2
        $$

??? proof "证明"
    由**命题 2.4**，$(1)\Longrightarrow(2)$。下面我们来证明 $(1)$。

    只需要证明对 $G$ 的任意有限维表示 $V$ 与其子表示 $W$，存在子表示 $W'\subset V$ 满足 $V=W\oplus W'$ 在表示的意义下成立。

    取任意 $\widehat{W}$ 使得作为向量空间 $V=W\oplus \widehat{W}$。设 $P$ 为 $V\rightarrow W$ 的投影算子满足 $P\big|_W=\mathrm{Id}$ 且 $P\big|_{\widehat{W}}=0$。令

    $$
    \overline{P}:=\frac{1}{\left|G\right|}\sum_{g\in G} \rho(g)P\rho(g^{-1})
    $$

    其中 $\rho(g)$ 是 $g$ 在 $V$ 上的作用，令 $W':=\ker \overline{P}$。则 $\overline{P}\big|_W=\mathrm{Id}$ 且 $\overline{P}(V)\subseteq W$。故 $\overline{P} ^2=\overline{P}$，进而 $\overline{P}$ 是垂直于 $W'$ 的投影，于是作为向量空间 $V=W\oplus W'$。进一步对 $h\in G,y\in W'$ ，我们有

    $$
    \overline{P}\rho(h)y=\frac{1}{\left|G\right|}\sum_{g\in G} \rho(g)P\rho(g^{-1}h)y=\frac{1}{\left|G\right|}\sum_{l\in G} \rho(hl)P\rho(l^{-1})y=\rho(h)\overline{P}y
    $$

    故 $\rho(h)y\in \ker\overline{P}=W'$，于是 $W'$ 是 $G-$不变子空间，故作为表示 $V=W\oplus \overline{W}$。

**定理 3.1**反过来也是成立的。

!!! theorem "命题"
    若 $k[G]$ 是半单的，则 $\mathrm{char}k\nmid \left|G\right|$。

??? proof "证明"
    设 $k[G]=\bigoplus_{i=1}^r \mathrm{End} V_i$，其中 $V_i$ 是所有不可约表示，且 $V_1=k$ 为一维平凡表示。则

    $$
    k[G]=k\oplus \bigoplus_{i=1}^r \mathrm{End} V_i=k\oplus \bigoplus_{i=2}^r d_iV_i
    $$

    其中 $d_i=\dim V_i$。由 Schur 引理，

    $$
    \mathrm{Hom}_{k[G]}(k,k[G])=k\Lambda,\mathrm{Hom}_{k[G]}(k[G],k)=k\epsilon
    $$

    其中表示间的非零同态  $\epsilon:k[G]\rightarrow k$,$\Lambda:k\rightarrow k[G]$ 在差一个倍数意义下唯一。取 $\epsilon(g)=1,\forall g\in G$，取 $\Lambda(1)=\sum_{g\in G}g$，则

    $$
    \epsilon\circ \Lambda(1)=\epsilon(\sum_{g\in G}g)=\sum_{g\in G} 1=\left|G\right|
    $$

    若 $\left|G\right|=0$ 则 $\Lambda$ 无左逆，即任意 $a\in k$，$(a\epsilon)\circ \Lambda(1)=0$，矛盾！

!!! problem "习题"
    设 $G$ 指数为 $p^n$，证明 $G$ 在特征为 $p$ 的域 $k$ 上的表示平凡。

## 2. 特征 { #s2 }

设 $V$ 是有限群 $G$ 的有限维表示，则其特征 $\chi_V:G\rightarrow k$ 定义为 $\chi_V(g)=\mathrm{Tr}\big|_V(\rho(g))$。显然 $V$ 作为 $k[G]$ 的表示的特征限制在 $G$ 上就得到了 $\chi_V(g)$。

特征函数是**中心函数(central function)** 或 **类函数(class function)**：$\chi_V(g)$ 由 $g$ 的共轭类唯一确定，即 $\chi_V(hgh^{-1})=\chi_V(g)$。

记 $F_c(G,k)=\left\{f:G\rightarrow k\Big| f(hgh^{-1})=f(g),\forall g,h\in G)\right\}\subset F(G,k)=\left\{f:G\rightarrow k \right\}$

!!! theorem "定理"
    若 $\mathrm{char}k\nmid \left|G\right|$，则 $G$ 的不可约表示的特征构成了 $F_c(G,k)$ 的一组基。

??? proof "证明"
    由 Maschke 定理知，$k[G]$ 是半单的，故由**定理 2.4**知这些特征是线性独立的且为 $(A/[A,A])^*$ 的基，其中 $A=k[G]$。又注意到作为 $k$ 上的向量空间

    $$
    \begin{aligned}
    (A/[A,A])^*&\cong \left\{\varphi\in \mathrm{Hom}_k(k[G],k)\Big| gh-hg\in \ker \varphi \forall g,h \in G\right\}\\
    &\cong \left\{f\in F(G,k)\Big| f(gh)=f(hg)\forall g,h\in G\right\}\\
    \end{aligned}
    $$

    此即 $F_c(G,k)$。

!!! theorem "推论"
    若在 $k$ 上 $\left|G\right|\neq 0$，则 $G$ 的表示的同构类数等于 $G$ 的共轭类数。

!!! theorem "推论"
    若在 $k$ 上 $\left|G\right|= 0$，对任意 $G$ 的不可约表示 $V,W$，$\chi_V=\chi_W\Longleftrightarrow V\cong W$。

!!! problem "习题"
    若在 $k$ 上 $\left|G\right|= 0$，则 $G$ 的表示的同构类数严格小于 $G$ 的共轭类数。

## 3. 表示的对偶和张量积 { #s3 }

若 $V$ 是群 $G$ 的表示，则 $V^*$ 同样也是表示，由

$$
\rho_{V^*}(g)=(\rho_V(g))^{-1}=(\rho_V(g)^{-1})^T=\rho_V(g^{-1})^T
$$

给出，即 $(\rho_{V^*}(g)f)(v)=f(\rho_V(g^{-1})v)$，其特征 $\chi_{V^*}(g)=\chi_V(g^{-1})$。

我们有 $\chi_V(g)=\sum \lambda_i$，其中 $\lambda_i$ 为 $g$ 在 $V$ 中的特征值。这些特征值必定为单位根，因为 $\rho(g)^{\left|G\right|}=\rho(g^{\left|G\right|})=\rho(e)=\mathrm{Id}$。故对复表示

$$
\chi_{V^*}(g)=\chi_V(g^{-1})=\sum \lambda_i^{-1}=\sum \overline{\lambda_i}=\overline{\sum \lambda_i}=\overline{\chi_V(g)}
$$

特别的，$V\cong  V^*$ 当且仅当 $\chi_V(g)\in \mathbb{R},\forall g\in G$。

若 $V,W$ 为 $G$ 的表示，则 $V\otimes W$ 当然也是表示，由

$$
\rho_{V\otimes W}(g)=\rho_V(g)\otimes\rho_W(g)
$$

给出。因此 $\chi_{V\otimes W}(g)=\chi_V(g)\chi_W(g)$。

一个有趣的问题是将 $V\otimes W$ 分解成不可约表示的直和，我们下面将会提到。

## 4. 特征的正交性 { #s4 }

我们在 $F_c(G,\mathbb{C})$ 上定义一个 Hermitian 内积：

$$
(f_1,f_2)=\frac{1}{\left|G\right|} \sum_{g\in G} f_1(g)\overline{f_2(g)}
$$

下面的定理说明 $G$ 的不可约表示的特征在上述内积下是 $F_c(G,\mathbb{C})$ 的一组正交基。

!!! theorem "定理"
    对任意表示 $V,W$，

    $$
    (\chi_V,\chi_W)=\dim \mathrm{Hom}_G(W,V)
    $$

    且当 $V,W$ 均为不可约表示时

    $$
    (\chi_V,\chi_W)=\begin{cases}
    1, V\cong W\\
    0, V\ncong W\\
    \end{cases}
    $$

??? proof "证明"
    由定义

    $$
    (\chi_V,\chi_W)=\frac{1}{\left|G\right|}\sum_{g\in G}\chi_V(g)\overline{\chi_W(g)}=\frac{1}{\left|G\right|}\sum_{g\in G}\chi_V(g){\chi_{W^*}(g)}=\frac{1}{\left|G\right|}\sum_{g\in G}\chi_{V\otimes W^*}(g)=\mathrm{Tr}\big|_{V\otimes W^*}(P)
    $$

    其中 $P=\frac{1}{\left|G\right|}\sum_{g\in G}g\in Z(\mathbb{C}[G])$。若 $X$ 是 $G$ 的不可约表示，由 Schur 引理知 $P$ 在 $X$ 上作用为标量，则

    $$
    P\big|_X=\begin{cases}
    \mathrm{Id} ,X=\mathbb{C}\\
    0,X\neq \mathbb{C}\\
    \end{cases}
    $$

    第二个情形中 $\mathrm{Tr}(P\big|_X)= \frac{1}{\left|G\right|}\sum_{g\in G}\chi_X(g)=(\chi_X,\chi_\mathbb{C})=0$，故作用的标量为 0。因此，对于任何表示 $X$，算子 $P\big|_X$ 都是作用在 $X$ 中 $G-$ 不变元素构成的子空间 $X^G$ 上的 $G-$不变投影算子。于是

    $$
    \mathrm{Tr}\big|_{V\otimes W^*}(P)=\dim \mathrm{Hom}_G(\mathbb{C},V\otimes W^*)=\dim(V\otimes W^*)^G=\dim \mathrm{Hom}_G(W,V)
    $$

该定理给了一个强力的方法判断一个有限群的表示是否是不可约的：$V$ 不可约当且仅当 $(\chi_V,\chi_V)=1$。

!!! problem "习题"
    设 $G$ 是有限群，令 $V_i$ 是其不可约表示。对每个 $i$，定义

    $$
    \psi_i=\frac{\dim V_i}{\left|G\right|}\sum_{g\in G} \chi_{V_i}(g)\cdot g^{-1}\in \mathbb{C}[G]
    $$

    - 证明 $\psi_i$ 在 $V_j$ 上作用为 $\delta_{ij}$。
    - 证明 $\psi_i$ 是**幂等的(idempotents)**，即 $\psi_i^2=\psi_i$，且 $\psi_i\psi_j=0,\forall i\neq j$。

!!! theorem "定理"
    令 $g,h\in G$，记 $Z_g$ 是 $g$ 在 $G$ 中的中心化子，则

    $$
    \sum_V\chi_V(g)\overline{\chi_V(h)}=\begin{cases}
    \left|Z_g\right|, g,h \text{共轭}\\
    0,otherwise\\
    \end{cases}
    $$

    其中求和符号对所有不可约表示 $V$ 求和。

??? proof "证明"
    由上知 $\overline{\chi_V(h)}=\chi_{V^*}(h)$，故结合 Maschke 定理原式$=$

    $$
    \sum_V\chi_V(g)\chi_{V^*}(h)=\mathrm{Tr}\big|_{\bigoplus_V V\otimes V^*}(g\otimes h)=\mathrm{Tr}\big|_{\bigoplus_V \mathrm{End}V}(x\mapsto gxh^{-1})=\mathrm{Tr}\big|_{\mathbb{C}[G]}(x\mapsto gxh^{-1})
    $$

    其中第二个等号是因为

    $$
    \begin{aligned}
    V\otimes V^*&\cong \mathrm{End} V\\
    x\otimes y&\mapsto (\varphi_{x,y}:v\mapsto (y,v)\cdot x)\\
    \end{aligned}
    $$

    又

    $$
    \begin{aligned}
    (g\otimes h)(x\otimes y)(v)=(\rho_V(g)x\otimes \rho_{V^*}(h)y)(v)&=\left<\rho_{V^*}(h)y,v\right>\cdot \rho_V(g)x\\
    &=\left<y,\rho_{V}(h^{-1})v\right>\cdot \rho_V(g)x
    \end{aligned}
    $$

    故 $(g\otimes h)(\varphi_{x,y})=g\circ \varphi_{x,y} \circ h^{-1}$

    若 $g,h$ 不共轭，则该迹显然为 $0$(考虑 $x\mapsto gxh^{-1}$ 在群元素构成的基下对应的矩阵对角线为 $0$)。另一方面，若 $g,h$ 共轭，则迹为满足 $x=gxh^{-1}$ 的元素 $x$ 的个数，即中心化子 $Z_g$ 的元素个数。

## 5. 酉表示与 Maschke 定理的另一个对复表示的证明 { #s5 }

!!! definition "定义"
    一个群 $G$ 的有限维**酉(unitary)**表示为一个有限维复向量空间 $V$ 伴有 $G-$不变正定的 Hermitian 形式 $(\text{ },\text{ })$，这里 $G-$不变指对任意 $g\in G$，$(\rho_V(g)v,\rho_V(g)w)=(v,w)$。

!!! theorem "定理"
    若 $G$ 有限，则任意 $G$ 的有限维表示均有一个酉结构。若该表示为不可约的，则这个结构在相差一个正倍数的关系下是唯一的。

??? proof "证明"
    对任意 $V$ 上的正定 Hermitian 形式 $B$，定义

    $$
    \overline{B}(v,w)=\sum_{g\in G}B(\rho_V(g)v,\rho_V(g)w)
    $$

    则 $\overline{B}$ 是 $V$ 上的正定 Hermitian 形式，且 $\rho_V(g)$ 是酉算子。若 $V$ 是不可约表示，对 $V$ 的两个正定 Hermitian 形式 $B_1,B_2$，则 $B_1(v,w)=B_2(Av,w)$ 对某个同态 $A:V\rightarrow V$ 成立。由 Schur 引理，$A=\lambda Id$，且显然 $\lambda>0$，得证。

!!! theorem "定理"
    任意群 $G$ 的有限维酉表示 $V$ 是完全可约的。

??? proof "证明"
    令 $W$ 为 $V$ 的子表示。令 $W^\bot$ 为 $W$ 在 $V$ 中对 Hermitian 内积的正交补。则 $W^\bot$ 为 $W$ 的子表示，且 $V=W\oplus W^\bot$。这表明 $V$ 是完全可约的。

考虑 $G=\mathbb{Z}\cap \mathbb{C}^2,n(a,b):=(a+nb,b)$，则该表示不可分解，但不是不可约的，其上没有酉结构。

## 6. 矩阵元素的正交性 { #s6 }

设 $V$ 为有限群 $G$ 的不可约表示，令 $v_1,\cdots,v_n$ 为 $V$ 的正交基(在 Hermitian 形式下)。$V$ 的**矩阵元素(matrix elements)** $t_{ij}^V(x)=(\rho_V(x)v_i,v_j)$。

回忆在 $F(G,\mathbb{C})$ 上定义的形式 $(f,g)=\frac{1}{\left|G\right|}\sum _{x\in G}f(x)\overline{g(x)}$

!!! theorem "命题"
    $V,W$ 是不可约表示，

    $$
    (t^V_{ij},t^W_{i'j'})=\begin{cases}
    0,V\ncong W\\
    \delta_{ii'}\delta_{jj'}\cdot \frac{1}{\dim V},V\cong W\\
    \end{cases}
    $$

    即 $G$ 的不可约表示的矩阵元素构成了一组 $F(G,\mathbb{C})$ 的正交基。

??? proof "证明"
    设 $\left\{v_i\right\},\left\{w_i\right\}$ 分别为 $V,W$ 在对应正定不变 Hermitian 形式下的正交基。取 $w^*_i:u\mapsto (u,w_i)\in W^*$。

    断言：这给出了一个 $W^*$ 上的酉结构，$(gw)^*=g\cdot w^*$。

    则对 $x\in G$ 我们有 $(xw^*_i,w^*_j)=\overline{(xw_i,w_j)}$，于是我们有

    $$
    (t^V_{ij},t^W_{i'j'})=\left|G\right|^{-1}\sum_{x\in G}(xv_i,v_j)\overline{(xw_{i'},w_{j'})}=\left|G\right|^{-1}\sum_{x\in G} (xv_i,v_j)(xw^*_{i'},w^*_{j'})=(P(v_i\otimes w^*_i),v_j\otimes w^*_{j'})
    $$

    其中 $P=\frac{1}{\left|G\right|}\sum_{x\in G} x$。若 $V\ncong W$，由于 $P$ 投影到平凡表示，而该表示在 $V\otimes W$ 中并不存在，故上式为 $0$。若 $V\cong W$，$(t_{ij}^V,t_{i'j'}^V)=(P(v_i\otimes v_{i'}^*),v_j\otimes v_{j'}^*)$，注意到 $(V\otimes V^*)^G$ 由单位向量 $f:=\frac{1}{\sqrt{\dim V}}\sum_{i} v_i\otimes v_i^*$ 生成，故 $(V\otimes V^*)^G\cong \mathbb{C}$。故 $P(v_i\otimes v^*_{i'})=(v_i\otimes v_{i'}^*,f)\cdot f=\frac{1}{\sqrt{\dim V}}\cdot f\cdot \delta_{ii'}$，故

    $$
    (t_{ij}^V,t_{i'j'}^V)=\frac{1}{\sqrt{\dim V}}\delta_{ii'} (f,v_j\otimes v^*_{j'})=\frac{1}{\dim V} \delta_{ii'}\delta_{jj'}
    $$

    由于 $\dim F(G,\mathbb{C})=\left|G\right|=\sum_V (\dim V)^2$，故确实为 基。

## 7. 特征表 { #s7 }

在本节中，$k = \mathbb{C}$，$G$ 是一个有限群。

$G$ 的特征表结构如下：

$$
\begin{array}{|c|c|c|c|c|}
\hline
G & g_1 & g_2 & \cdots & g_i\\
\hline
\# & & & &\\
\hline
V_1 \, (\text{平凡}) & 1 & 1 & 1 & 1 \\
\hline
V_2 & \dim V_2 & & &  \\
\hline
\vdots & \vdots & & &  \\
\hline
V_i& \dim V_i & & &\chi_V(g_i)   \\
\hline
\end{array}
$$

其中第一行为 $G$ 的共轭类，第二行为对应共轭类的元素个数。

已证明结论：

- 正交关系：

    $$
    \frac{1}{|G|} \sum_{g \in G} \chi_{V_i}(g) \overline{\chi_{V_j}(g)}
    = \frac{1}{|G|} \sum_{C_i} |C_i| \chi_{V_i}(g) \overline{\chi_{V_j}(g)}
    = \begin{cases}
    1 & \text{若 } V_i = V_j \\
    0 & \text{otherwise}
    \end{cases}
    $$

- 特征标和关系：

    $$
    \sum_{V_i} \chi_{V_i}(g) \cdot \overline{\chi_{V_j}(h)}
    =
    \begin{cases}
    |Z_g| & \text{若 } g \text{ 与 } h \text{ 共轭} \\
    0 & \text{otherwise}
    \end{cases}
    $$

我们来看一些简单的例子：

- $G=S_3$

    $$
    \begin{array}{|c|c|c|c|}
    \hline
    S_3 & \mathrm{Id} & (12) & (123)\\
    \hline
    \# &1 & 3& 2\\
    \hline
    \mathbb{C} & 1 & 1 & 1  \\
    \hline
    \text{sign} & 1 & -1& 1 \\
    \hline
    \mathbb{C}^2 & 2 &0 & 1 \\
    \hline
    \end{array}
    $$

    这里 $S_3\curvearrowright \mathbb{C}^2=\left\{(x_1,x_2,x_3)\in \mathbb{C}^3\Big| x_1+x_2+x_3=0\right\}$。

    **断言：**

    $$
    S_n\curvearrowright \mathbb{C}^{n-1}=\left\{(x_1,\cdots,x_n)\in \mathbb{C}^{n}\Big| x_1+\cdots+x_n=0\right\}
    $$

    为不可约表示，这称为 $S_n$ 的**标准表示(standard representation)**。

    **断言：**若 $V$ 是不可约表示，则 $V\otimes \text{sign}$ 也是不可约表示。由 $\chi_{V\otimes \text{sign}}(g)=\chi_V\cdot (-1)^{\text{l}(g)}$ 即得。

- $G=S_4$

    $$
    \begin{array}{|c|c|c|c|c|c|}
    \hline
    S_4 & \mathrm{Id} & (12) & (12)(34)&(123)&(1234)\\
    \hline
    \# &1 & 6&3&8&6\\
    \hline
    \mathbb{C} & 1 & 1 & 1& 1& 1  \\
    \hline
    \text{sign} & 1 & -1& 1 & -1& 1 \\
    \hline
    \mathbb{C}^3 & 3&1 & -1&0 &-1 \\
    \hline
    \mathbb{C}^3\otimes \text{sign} & 3&-1 & 1&0 &1 \\
    \hline
    \mathbb{C}^2 & 2&0 & 2&-1 &0 \\
    \hline
    \end{array}
    $$

    最后一个由 $H:=\left\{\mathrm{Id},(12)(34),(13)(24),(14)(23)\right\}\triangleleft S_4$ 与 $S_4\twoheadrightarrow  S_4/H\cong S_3$ 给出。

- $G=A_4$

    $$
    \begin{array}{|c|c|c|c|c|}
    \hline
    A_4 & \mathrm{Id} &(123) &(132)&(12)(34)\\
    \hline
    \# &1 & 4 &4&3\\
    \hline
    \mathbb{C} & 1 & 1 & 1& 1  \\
    \hline
    \mathbb{C}_\omega& 1 & \omega& \omega^2 & 1 \\
    \hline
    \mathbb{C}_\omega^2& 1 & \omega^2& \omega & 1 \\
    \hline
    \mathbb{C}^3 & 3&0 &0 &-1 \\
    \hline
    \end{array}
    $$

我们可以通过特征表来计算 $V_i\otimes V_j=\sum N_{ij}^k V_k$ 中的系数 $N_{ij}^k=(\chi_i\chi_j,\chi_k)$。

## 8. Frobeniu 行列式 { #s8 }

设 $G$ 是有限群，$\left\{x_g\Big| g\in G\right\}$ 为变量。

!!! definition "定义"
    考虑 $\left|G\right|\times \left|G\right|$ 矩阵 $X_G$，其中 $a_{g,h}:=x_{g^{-1}h}$，称 $\det(X_G)$ 为 **Frobenius 行列式**。

!!! example "例"
    考虑 $G=C_n=\left<r\Big| r^n=1\right>$，则

    $$
    X_G=\left( \begin{matrix}
    x_0&		x_1&		\cdots&		x_{n-1}\\
    x_{n-1}&		x_0&		\cdots&		x_{n-2}\\
    \vdots&		\vdots&		\ddots&		\vdots\\
    x_1&		x_2&		\cdots&		x_0\\
    \end{matrix} \right)
    $$

    **断言：**

    $$
    \begin{aligned}
    \det(X_{c_n})&=\prod_{j=0}^{n-1}(\sum_{k=0}^{n-1}\zeta^{jk}x_k),\zeta=e^{2\pi j/n}\\
    &=\prod_{j=0}^{n-1}(\sum_{k=0}^{n-1}\chi_j(r^k)x_k),\chi_j \text{为第} j \text{个不可约表示}\\
    \end{aligned}
    $$

!!! theorem "定理（Dedekind）"
    设 $G$ 是有限群，则

    $$
    \det X_G=\prod_\chi (\prod_{g\in G} \chi(g)x_g)
    $$

    $\chi$ 对所有 $G\rightarrow \mathbb{C}^*$ 的群同态求和。

!!! theorem "定理（Frobenius）"
    存在互不成比例的不可约多项式 $P_j(x)$ 满足：

    $$
    \det X_G=\prod_{j=1}^{r} P_j(x)^{\deg P_j}
    $$

    其中 $r$ 为 $G$ 的共轭类数。

??? proof "证明"
    先证明一个引理：

    !!! theorem "引理"
        设 $Y=(y_{ij})$，则 $\det Y$ 在 $\left\{y_{ij}\right\}$ 上为不可约多项式。

    ??? proof "引理的证明"
        设 $X=t\cdot \mathrm{Id} +\sum_{i=1}^n x_i E_{i,i+1}$，其中下标模 $n$ 理解，$E_{i,j}$ 是初等矩阵。则 $\det(X)=t^n-(-1)^nx_1\cdots x_n$ 显然不可约。因此，行列式 $\det(Y)$ 是不可约的（这是因为当 $Y$ 特化为 $X$ 时行列式保持不可约性，且齐次多项式的不可约因子本身必须是齐次的，因此无法通过特化得到非零常数）。

    回到原题。令 $V = \mathbb{C}[G]$ 为群 $G$ 的正则表示。考虑

    $$
    L(\mathbf{x}) = \sum_{g \in G} x_g \rho(g),
    $$

    其中 $\rho(g) \in \text{End}(V)$ 由 $g$ 诱导。$L(\mathbf{x})$ 作用于元素 $h \in G$ 的结果为

    $$
    L(\mathbf{x})h = \sum_{g \in G} x_g \rho(g)h = \sum_{g \in G} x_g gh = \sum_{z \in G} x_{zh^{-1}} z.
    $$

    因此，线性算子 $L(\mathbf{x})$ 在基 $g_1, g_2, \ldots, g_n$ 下的矩阵为 $X_G$ 的列置换矩阵，故其行列式至多相差一个符号。

    根据 Maschke 定理，我们有

    $$
    \det\nolimits_V L(\mathbf{x}) = \prod_{i=1}^r \left( \det\nolimits_{V_i} L(\mathbf{x}) \right)^{\dim V_i},
    $$

    其中 $V_i$ 是 $G$ 的不可约表示。令 $P_i = \det_{V_i} L(\mathbf{x})$。设 $\{e_{im}\}$ 为 $V_i$ 的基，$E_{i,j,k} \in \text{End}(V_i)$ 为这些基下的矩阵单位元。则 $\{E_{i,jk}\}$ 构成 $\mathbb{C}[G]$ 的一组基，且

    $$
    L(\mathbf{x})|_{V_i} = \sum_{j,k} y_{i,jk} E_{i,jk},
    $$

    其中 $y_{i,j,k}$ 是 $\mathbb{C}[G]$ 上通过线性变换与 $x_g$ 关联的新坐标。于是

    $$
    P_i(\mathbf{x}) = \det\nolimits_{V_i} L(\mathbf{x}) = \det (y_{i,jk}).
    $$

    因此，由引理 $P_i$ 是不可约的且互不成比例（因为它们依赖于不同的变量集合 $y_{i,jk}$）。定理得证。

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/representation-theory.pdf){ .md-button download="representation-theory.pdf" }
