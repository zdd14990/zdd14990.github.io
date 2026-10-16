---
title: 第六章：根式可解性
date: 2025-11-19
updated: 2026-10-15
description: 代数2-H 笔记第六章：根式可解性。
hide:
  - navigation
categories:
  - 代数
tags:
  - algebra
---

# 第六章：根式可解性 { #top }

## 1. 根式可解性 { #s1 }

!!! definition "定义"
    有限扩张 $E/F$ 称为**根式扩张(radical extension)**，若存在一个**根塔(root tower)**：$F=F_1\subset F_2\subset \cdots \subset F_r=E$，其中 $F_{i+1}=F_i(d_i),d_i^{n_i}\in F$。

我们有如下基本推论：

!!! theorem "命题"
    $E/K/F,E/K'/F$ 是域扩张，

    - 若 $E/F$ 是根式扩张，则 $E/K$ 也是根式扩张；
    - 若 $E/K,K/F$ 是根式扩张，则 $E/F$ 是根式扩张；
    - 若 $K/F,K'/F$ 是根式扩张，则 $KK'/F$ 是根式扩张；
    - 若 $\mathrm{char}F=0$，$E/F$ 是根式扩张，则 $E/F$ 的正规闭包是根式扩张。

??? proof "证明"
    我们给出 $(4)$ 的证明。设我们有根塔 $F\subset F(d_1)\subset \cdots \subset F(d_1,\cdots,d_r)=E$，$E/F$ 的正规闭包是 $K$。

    设 $\mathrm{Aut}(K/F)={\delta_1=id,\delta_2,\cdots,\delta_n}$，考虑 $K$ 的子域

    $$
    K'=\bigcup_{\delta\in \mathrm{Aut}(K/F)}\delta(E)=\bigcup_{i,j}F(\delta_i(d_j))
    $$

    则 $K'$ 是 $\mathrm{Aut}(K/F)-$不变的，故 $K'/F$ 是正规的，这表示 $K=K'$。于是我们有根塔：

    $\begin{aligned} F&\subset F(d_1)\subset F(d_1,\delta_2(d_1))\subset \cdots \subset F(d_1,\delta_2(d_1),\cdots,\delta_n(d_1))\triangleq F_1\\ &\subset F_1(d_2)\subset F_1(d_2,\delta_2(d_2))\subset \cdots \subset F_1(d_2,\delta_2(d_2),\cdots,\delta_n(d_2))\triangleq F_2\\ &\subset \cdots \\ &\subset F_n=K\\ \end{aligned}$

    故 $K/F$ 是根式扩张。

!!! definition "定义"
    设 $\mathrm{char}F=0$，$f(x)$ 是 $F$ 上的首一多项式。等式 $f(x)=0$ 称作**根式可解的(solvable by radicals)**，若存在根式扩张 $E/F$，$E$ 包含了 $f(x)$ 的分裂域。

!!! definition "定义"
    设 $E_f$ 是 $f(x)/F$ 的分裂域，则 $\mathrm{Gal}(E_f/F)$ 称为 $f(x)$ 的 Galois 群，记为 $G_F(f)$。

!!! theorem "定理（Galois's criterion）"
    $f(x)=0$ 根式可解当且仅当 $G_F(f)$ 可解。

回忆：我们称一个群是可解的当且仅当有正规子列：

$$
\left\{1\right\}=G_0\lhd G_1\lhd \cdots\lhd G_r=G
$$

使 $G_i/G_{i-1}$ 是 Abel 的。由于简单 Abel 群是素数阶循环群，因此假设 $G_i/G_{i-1}$ 是素数阶循环群。

注意到 $G_i/G_{i-1}$ 是 Abel 群当且仅当 $G_{i-1}$ 包含 $[G_i,G_i]=\left< [a,b]=aba^{-1}b^{-1}\Big| a,b\in G_i\right>$。设 $G^{(0)}=G,G^{(i)}=[G^{(i-1)},G^{(i-1)}]$，则 $G_{r-i}\supset G^{(i)}$。由于 $[G:G]\lhd G$，故 $G$ 可解当且仅当 $G^{(r)}=1$ 对某个 $r$ 成立。

回忆如下结论：

- 可解群的子群/商群是可解的；
- 非交换单群是不可解的。

!!! theorem "引理"
    域扩张 $K/F$，$f(x)\in F[x]$，则 $G_K(f)\le G_F(f)$。

??? proof "证明"
    设 $f(x)/F$ 的分裂域为 $E_{f,F}$，$f(x)/K$ 的分裂域为 $E_{f,K}$。考虑映射 $\varphi:G_K(f)\rightarrow G_F(f),\eta\mapsto \eta|_{E_ {f,F}}$，由于 $\eta$ 在 $F$ 上不变且将 $f$ 根的集合映到自身，故该 $\varphi$ 是良定义的且是同态。

    若 $\eta|_{E_{f,F}}=id$，注意到 $\eta|_K=id$，我们有 $\eta=id$，故 $\varphi$ 是单射。

接下来我们来证明 Galois 判别定理(Galois's criterion)。

??? proof "证明"
    “$\Longleftarrow$”：设 $G_F(f)$ 是可解的。令 $E$ 是 $f(x)/F$ 的分裂域，$[E:F]=n$。考虑 $E(\xi_n)/F(\xi_n)$，其为 $f(x)(x^n-1)$ 的分裂域。由上引理，$\mathrm{Gal}(E(\xi_n)/F(\xi_n))$ 是 $\mathrm{Gal}(E/F)$ 的子群，而 $\mathrm{Gal}(E/F)$ 是可解的，设

    $$
    \left\{1\right\}=G_0\lhd G_1\lhd \cdots \lhd G_r=\mathrm{Gal}(E(\xi_n)/F(\xi_n))
    $$

    由 Galois 对应我们有

    $$
    F\subset F(\xi_n)=E(\xi_n)^{G_r}\subset \cdots \subset E(\xi_n)^{G_1}\subset E(\xi_n)
    $$

    是正规扩张。再由 Galois 对应有

    $$
    \mathrm{Gal}(E(\xi_n)^{G_{i-1}}/E(\xi_n)^{G_i})=G_i/G_{i-1}
    $$

    是循环群，由[Kummer's theorem](chapter-05.md)，$E(\xi_n)^{G_{i-1}}/E(\xi_n)^{G_i}$ 是单根式扩张，进而上式为根塔，于是得到 $E(\xi_n)/F$ 是根式扩张。

    “$\Longrightarrow$”：设我们有根塔 $F\subset F_1\subset\cdots\subset F_r\subset K$，其中 $E\subset K$。由**引理 1.10**我们可以将 $K$ 换成其正规闭包，故不妨 $K/F$ 是正规的。则

    $$
    F\subset F(\xi_n)\subset
    F_1(\xi_n)\subset\cdots\subset F_r(\xi_n)\subset K(\xi_n)
    $$

    是根塔，由**命题 1.13**，$F_i(\xi_n)/F_{i-1}(\xi_n)$ 是分圆扩张。

    回忆我们已经证明 $F(\xi_n)/F$ 是 Abel 扩张，故我们有

    $$
    \mathrm{Gal}(K(\xi_n)/F)\rhd \mathrm{Gal}(K(\xi_n)/F_1(\xi_n))\rhd \cdots \rhd \mathrm{Gal}(K(\xi_n)/F_r(\xi_n))\rhd \left\{1\right\}
    $$

    利用 Galois 对应，

    $$
    \mathrm{Gal}(K(\xi_n)/F_i(\xi_n))/\mathrm{Gal}(K(\xi_n)/F_{i+1}(\xi_n))\cong \mathrm{Gal}(F_{i+1}(\xi_n)/F_i(\xi_n))
    $$

    是循环群。故 $\mathrm{Gal}(K(\xi_n)/F)$ 是可解的，因此其子群 $\mathrm{Gal}(K/F)$ 也是可解的。

!!! theorem "推论"
    考虑 $f(x)\in \mathbb{Q}[x],\mathrm{deg}f=n$ 不可约。

    - $G_F(f)\le S_n$，特别的，$n\le 4$ 时 $f(x)=0$ 根式可解。
    - $n\ge 5$ 是素数，$f$ 恰有两个非实根，$G_F(f)\cong S_n$，此时 $f(x)=0$ 根式不可解。

??? proof "证明"
    $(1)$ 利用 $S_n$ 可解当且仅当 $n\le4$ 即证。

    $(2)$ 	$n\mid \left|G_F(f)\right|$，则存在 $a\in G_F(f)$ 阶为 $n$，故 $a=(12\cdots n)$ 是 $n-$循环。

    $\tau:\mathbb{C}\rightarrow \mathbb{C},z\mapsto \bar{z}$，则$\tau\in G_F(f)$，故 $\tau=(ij)$，进而 $\left<a,\tau\right>=S_n$，即 $G_F(f)=S_n$。

!!! example "例"
    $f(x)=x^5-5x+2\in \mathbb{Q}[x]$，容易验证 $f(x)$ 不可约且有三个根，由上推论知根式不可解。

考虑 $f(x)=x^n-s_1x^{n-1}+s_2x^{n-2}-\cdots+(-1)^ns_n$，令 $x_1,\cdots,x_n$ 为 $f(x)$ 的根。由韦达定理我们知

$$
s_1=\sum x_i,s_2=\sum_{i<j}x_ix_j,\cdots,s_n=\prod x_i
$$

考虑 $S_n\curvearrowright F[x_1,\cdots,x_n]$，$s_i$ 在 $S_n$ 作用下不变。$s_i$ 被称为**初等对称多项式**。则 $F[x_1,\cdots,x_n]^{S_n}$ 是所有对称多项式。

我们有同构 $F[y_1,\cdots,y_n]\cong F[x_1,\cdots,x_n]^{S_n},y_i\mapsto s_i$。

!!! theorem "定理"
    P $F=\mathbb{Q}(s_1,\cdots,s_n)$，则 $G_F(f)\cong S_n$

??? proof "证明"
    设 $x_1,\cdots,x_n$ 是 $f(x)$ 的根，则 $E_F(f)=F(x_1,\cdot,x_n)$。

    $\forall \sigma\in S_n$，我们希望 $x_i\rightarrow x_{\sigma(i)}$ 是 $E_F(f)$ 的一个自同构。我们先证明 $\left\{x_i\right\}$ 代数独立。

    若不然存在 $g\in F[y_1,\cdots,y_n],g(x_1,\cdots,x_n)=0$，令 $h=\prod_{\sigma\in S_n} \sigma(g)\in F[y_1,\cdots,y_n]^{S_n}$，其中 $\sigma(g)=g(y_{\sigma(1)},\cdots,y_{\sigma(n)})$，故 $h=h'(s_1^y,\cdots,s_n^y)$，由 $h(x_1,\cdots,x_n)=0$ 得 $h'(s_1,\cdots,s_n)=0$ 矛盾！

!!! theorem "推论（Abel-Ruffini）"
    当 $n\ge 5$ 时，$\mathbb{Q}$ 上的 $n$ 次多项式不可解。

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/algebra-2h-notes.pdf){ .md-button download="algebra-2h-notes.pdf" }
