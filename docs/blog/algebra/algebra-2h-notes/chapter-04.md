---
title: 第四章：Galois 扩张与 Galois 对应
date: 2025-11-19
updated: 2026-10-15
description: 代数2-H 笔记第四章：Galois 扩张、Galois 对应。
hide:
  - navigation
categories:
  - 代数
tags:
  - algebra
---

# 第四章：Galois 扩张与 Galois 对应 { #top }

## 1. Galois 扩张 { #s1 }

!!! definition "定义"
    一个有限正规可分域扩张 $E/F$ 称为**Galois 扩张**。

由我们前文的讨论，可以知道 $E/F$ 是 Galois 扩张当且仅当它是一个可分多项式的分裂域。若 $\mathrm{char}F=0$，则 $E/F$ 是 Galois 扩张当且仅当它是分裂域。

!!! theorem "命题"
    $E/K/F$ 是有限扩张，若 $E/F$ 是 Galois 扩张，则 $E/K$ 也是 Galois 扩张。

!!! definition "定义"
    $E/F$ 是域扩张，则 $\mathrm{Aut}(E/F)$ 有自然群结构，称为 $E/F$ 的 Galois 群，记为 $\mathrm{Gal}(E/F)$。

回忆，若 $E/F$ 是 Galois 扩张，则 $\left|\mathrm{Gal}(E/F)\right|=[E:F]$。更一般的，若 $E/F$ 是分裂域，$E=F(u_1,\cdots,u_n)$，则 $\forall \sigma\in \mathrm{Gal}(E/F),\sigma(u_i)\in\left\{ u_1,\cdots,u_n\right\}$，这表示我们有嵌入映射 $\mathrm{Gal}(E/F)\hookrightarrow S_n$。

!!! theorem "命题"
    若 $E/F$ 是有限扩张，则 $\mathrm{Gal}(E/F)$ 是有限的。

??? proof "证明"
    设 $E=F(u_1,\cdots,u_n)$，$u_i$ 的极小多项式是 $g_i(x)$，则 $\forall \sigma\in \mathrm{Gal}(E/F)$，$\sigma(u_i)$ 是 $g_i(x)$ 的根，这样的选择是有限的。

!!! definition "定义"
    $E$ 是域，$G$ 是 $\mathrm{Aut}(E)$ 的有限子群。记

    $$
    E^G=\left\{ a\in E\Big| \sigma(a)=a,\forall \sigma\in G\right\}
    $$

    易验证 $E^G$ 是 $E$ 的一个子域，称为 $E$ 的 $G$ **不变子域(G-invariant subfield)**。

!!! theorem "定理"
    域扩张 $E/F$，则如下命题等价：

    - $E/F$ 是 Galois 扩张；
    - $E$ 是 $F$ 上某个可分多项式的分裂域；
    - $F=E^G$，其中 $G$ 是 $\mathrm{Aut}(E)$ 的有限子群。

??? proof "证明"
    $(1)\Longrightarrow(2)$ 由**定理 1.16**即得。

    $(2)\Longrightarrow(3)$：我们来证 $F=E^G$，其中 $G=\mathrm{Gal}(E/F)$。我们先来证明如下引理：

    !!! theorem "引理"
        $E/F$ 是有限扩张，则

        $$
        \mathrm{Gal}(E/F)=\mathrm{Gal}(E/E^{\mathrm{Gal}(E/F)})
        $$

    ??? proof "引理的证明"
        一方面，$F\subseteq E^{\mathrm{Gal}(E/F)}$，故 $\mathrm{Gal}(E/F)\supseteq \mathrm{Gal}(E/E^{\mathrm{Gal}(E/F)})$。

        另一方面，$\forall \sigma \in \mathrm{Gal}(E/F)$，由定义 $\sigma|_{E^{\mathrm{Gal}(E/F)}}=id$，则 $\sigma \in \mathrm{Gal}(E/E^{\mathrm{Gal}(E/F)})$，这表示 $\mathrm{Gal}(E/F)\subseteq \mathrm{Gal}(E/E^{\mathrm{Gal}(E/F)})$。

    一方面我们显然有 $F\subseteq E^G$。另一方面，由上述引理 $\mathrm{Gal}(E/E^G)=\mathrm{Gal}(E/F)$。因为 $E/F$ 是可分的，$\left|\mathrm{Gal}(E/F)\right|=[E:F]$，故 $\left|\mathrm{Gal}(E/E^G)\right|=[E:F]$。因为 $E/E^G/F$ 是域扩张，$E/F$ 是可分的，我们有 $E/E^G$ 是可分的，这表示 $\left|\mathrm{Gal}(E/E^G)\right|=[E:E^G]$。

    综上 $E^G=F$。

    $(3)\Longrightarrow(1)$：我们先来证明如下引理：

    !!! theorem "引理（Artin）"
        $E$ 是域，$G$ 是 $\mathrm{Aut}(E)$ 的有限子群，则 $[E:E^G]\le \left|G\right|$。

    由该引理，$[E:F]=[E:E^G]\le \left|G\right|<\infty$。

    $\forall u\in E$ 的极小多项式 $g(x)$，需要证明 $g(x)$ 在 $E$ 中分裂且没有重根。设 $u_1,\cdots,u_n\in E$ 是 $g(x)$ 的所有不同根。令 $u=u_1,f(x)=(x-u_1)\cdots(x-u_n)$。

    注意到对 $\forall \sigma \in G,\sigma(g(x))=g(x)$，故 $\sigma(\left\{u_1,\cdots,u_n\right\})=\left\{u_1,\cdots,u_n\right\}$，这表示 $\sigma(f(x))=f(x)$。由于 $F=E^G$，我们有 $f(x)\in F[x]$。$g(x)$ 在 $F$ 上可分，故只能 $f=g$，即 $g(x)$ 在 $E$ 上可分且没有重根。

!!! theorem "推论"
    若 $G\le \mathrm{Aut}(E)$，则 $\mathrm{Gal}(E/E^G)=G$ 且 $[E:E^G]=\left|G\right|$。

??? proof "证明"
    由**定理 1.17**，$E/E^G$ 是 Galois 扩张，故 $[E:E^G]=\mathrm{Gal}(E/E^G)$。由 Artin's lemma $[E:E^G]\le G$，但 $G\subseteq (E/E^G)$，故 $G=\mathrm{Gal}(E/E^G)$。

!!! theorem "推论"
    $E/F$ 是 Galois 扩张当且仅当 $F=E^{\mathrm{Gal}(E/F)}$。

??? proof "证明"
    令 $G=\mathrm{Gal}(E/F)$。一方面若 $F=E^G$，由**定理 1.17** $E/F$ 是 Galois 扩张。另一方面，若 $E/F$ 是 Galois 扩张，$[E:F]=\left|G\right|=[E:E^G]$，故 $F=E^G$。

!!! theorem "推论"
    $E/F$ 是有限扩张，则 $\left|\mathrm{Gal}(E/F)\right|\mid [E:F]$，取等当且仅当 $E/F$ 是 Galois 扩张。

??? proof "证明"
    $E/E^{\mathrm{Gal}(E/F)}/F$ 是域扩张，故

    $$
    \left|\mathrm{Gal}(E/F)\right|=\dfrac{[E:F]}{[E^{\mathrm{Gal}(E/F)}:F]}
    $$

    取等当且仅当 $E^{\mathrm{Gal}(E/F)}=F$，即$E/F$ 是 Galois 扩张。

!!! example "例"
    - 考虑 Galois 扩张 $\mathbb{Q}(\sqrt2)/\mathbb{Q}$，则 $\left|\mathrm{Gal}(\mathbb{Q}(\sqrt2)/\mathbb{Q})\right|=[\mathbb{Q}(\sqrt2)/\mathbb{Q}]=2$，故 $\mathrm{Gal}(\mathbb{Q}(\sqrt2)/\mathbb{Q})\cong C_2$，这两个元素分别是 $\eta_1=id$ 和 $\eta_2:\sqrt{2}\rightarrow -\sqrt{2}$。
    - $\mathrm{Gal}(\mathbb{Q}(\sqrt[3]2)/\mathbb{Q})$ 是平凡群，即必须有 $\eta(\sqrt[3]2)=\sqrt[3]2$。
    - 令 $\omega=e^{2\pi i/3}$，则 $x^3-2$ 的分裂域 $\mathbb{Q}(\sqrt[3]2,\omega)/\mathbb{Q}$ 是 Galois 扩张。我们有 $[\mathbb{Q}(\sqrt[3]2,\omega):\mathbb{Q}]=6$。注意到任意 $\eta\in\mathrm{Gal}(\mathbb{Q}(\sqrt[3]2,\omega)/\mathbb{Q})$ 是 $\sqrt[3]2,\sqrt[3]2\omega,\sqrt[3]2\omega^2$，故 $\mathrm{Gal}(\mathbb{Q}(\sqrt[3]2,\omega)/\mathbb{Q})\cong S_3$。
    - 考虑 $(x^2-3)(x^2-2)$ 的分裂域 $\mathbb{Q}(\sqrt2,\sqrt3)/\mathbb{Q}$ 是 Galois 扩张，且 $[\mathbb{Q}(\sqrt2,\sqrt3):\mathbb{Q}]=4$。这四个元素是 $\eta:\sqrt2\rightarrow\pm \sqrt2,\sqrt3\rightarrow \pm\sqrt3$，故 $\mathrm{Gal}(\mathbb{Q}(\sqrt2,\sqrt3)/\mathbb{Q})\cong C_2\times C_2$。
    - 考虑 $F=\mathbb{Z}_p(t)$，$f(x)=x^p-t$ 是不可分且不可约的，故 $f(x)$ 的分裂域 $E/F$ 不是 Galois 的/事实上若 $u\in E$，$f(u)=0$，则 $f(x)=(x-u)^p$，这表示任意 $\eta$，$\eta(u)=u$ 且 $E=F(u)$，这表示 $\mathrm{Gal}(E/F)$ 是平凡群。

## 2. Galois 对应 { #s2 }

给定域扩张 $E/F$，$G=\mathrm{Gal}(E/F)$，令 $\Sigma=\left\{ H\Big| H\le G\right\}$，$\Omega=\left\{K\Big| E/K/F\right\}$。定义 $\varphi:\Sigma\rightarrow \Omega,H\mapsto E^H$，$\phi:\Omega\rightarrow \Sigma,K\mapsto \mathrm{Gal}(E/K)$。我们有如下基础推论：

- 若 $H_1\subset H_2$，则 $E^{H_1}\supset E^{H_2}$；
- 若 $K_1\subset K_2$，则 $\mathrm{Gal}(E/K_1)\supset \mathrm{Gal}(E/K_2)$；
- $H\subset \mathrm{Gal}(E/E^H)$；
- $K\subset E^{\mathrm{Gal}(E/K)}$。

现在我们来介绍**伽罗瓦理论基本定理(the fundamental theorem of Galois correspondence)**

!!! theorem "定理"
    $E/F$ 是 Galois 扩张，则如下命题成立：

    - $\varphi,\phi$ 互为逆映射，即 $H=\mathrm{Gal}(E/E^H),K=E^{\mathrm{Gal}(E/K)}$；
    - $H_1\subset H_2$ 当且仅当 $E^{H_2}\subset E^{H_1}$；
    - $\left|H\right|=[E:E^H],[G:H]=[E^H:F]$；
    - $H\lhd G$ 当且仅当 $E^H/F$ 是正规扩张，这时还有 $\mathrm{Gal}(E^H/F)\cong G/H$。

??? proof "证明"
    $(1)$ 利用**推论 1.14**和**推论 1.15**。

    $(2)$ 由$(1)$显然。

    $(3)$ 由**推论 1.14**得$\left|H\right|=[E:E^H]$。进而

    $$
    [G:H]=\dfrac{\left|G\right|}{\left|H\right|}=\dfrac{[E:F]}{[E:E^H]}=[E^H:F]
    $$

    $(4)$ 回忆 $K/F$ 是正规的当且仅当 $\forall \eta\in \mathrm{Gal}(E/F),\eta(K)=K$。$H$ 是正规子群当且仅当 $\forall \eta \in \mathrm{Gal}(E/F),\eta H\eta^{-1}=H$，这等价于 $E^{\eta H\eta^{-1}}=E^H$，注意到：

    $$
    x\in E^{\eta H\eta^{-1}}\Longleftrightarrow \eta H \eta^{-1}x=x\overset{x=\eta (y)}{\Longleftrightarrow} Hy=y\Longleftrightarrow y\in E^H\Longleftrightarrow x\in \eta(E^H)\Rightarrow E^{\eta H\eta^{-1}}=\eta(E^H)
    $$

    故 $H$ 正规$\Longleftrightarrow\forall \eta\in \mathrm{Gal}(E/F),\eta(E^H)=E^H\Longleftrightarrow$ $E^H/F$ 是正规的。

    接下来考虑 $\psi:G\rightarrow \mathrm{Gal}(E^H/F),\eta\mapsto \eta|_{E^H}$。由于 $\eta(E^H)=E^H$ 故是良定义的。$\mathrm{ker}\psi=\mathrm{Gal}(E/E^H)=H$。因为 $E^H/F$ 是 Galois 扩张，$[G:H]=[E^H/F]=\mathrm{Gal}(E^H/F)$，故 $\psi$ 是满射，进而 $G/H\cong \mathrm{Gal}(E^H/F)$，我们完成了证明。

!!! theorem "推论"
    $E/F$ 是有限可分扩张，则 $E$ 是单扩张。

??? proof "证明"
    设 $E=F(u_1,\cdots,u_n)$，$u_i$ 的极小多项式是 $g_i(x)$，考虑 $g_1(x)\cdots g_n(x)$ 的分裂域 $E'$，则 $E\subset E'$，且 $E'/F$ 是 Galois 扩张。由 Galois 对应，$E'/F$ 有有限的子域，则 $E/F$ 也只有有限的子域。回忆[Steinitz's theorem](chapter-01.md)，我们完成了证明。

$E'$ 被称为 $E/F$ 的 **Galois 闭包(Galois closure)**。事实上，类似正规闭包的定义，我们可以对任一可分扩张 $E/F$ 定义 Galois 闭包。

!!! theorem "推论（代数基本定理）"
    $\mathbb{C}$ 是代数闭的。

??? proof "证明"
    $\forall f(x)\in \mathbb{C}[x]$，设 $g(x)=f(x)\bar{f}(x)\mathbb{R}[x]$，我们只需证 $g$ 有一根。

    设 $g$ 的分裂域为 $E$，则 $E/\mathbb{R}$ 是 Galois 扩张。设 $n=[E:R]$，我们来证明 $n=1$ 或 $2$。由 Sylow 定理，取 2-Sylow 子群 $H\le \mathrm{Gal}(E/\mathbb{R})$。由于 $[G:H]=[E^H:\mathbb{R}]$ 是奇数，故 $E^H=\mathbb{R}(\alpha)$，其中 $\alpha$ 的极小多项式次数为奇数，即 $\alpha\in \mathbb{R}$，这表示 $E^H=\mathbb{R}$，故 $H=G$，$\left|G\right|=2^k$。由于

    $$
    G\supset G_1\supset \cdots \supset G_k={1}
    $$

    故

    $$
    \mathbb{R}\overset{\mathrm{deg}2}{\subset}E^{G_1}\overset{\mathrm{deg}2}{\subset}\cdots\overset{\mathrm{deg}2}{\subset}E^{G_k}=E
    $$

    所以

    $$
    \mathbb{C}\cong E^{G_k}=E^{G_2}=\cdots=E
    $$

    即 $g(x)$ 在 $\mathbb{C}$ 上分裂，故 $\mathbb{C}$ 是代数闭的。

!!! theorem "命题"
    设 $E/K,K/F$ 是 Galois 扩张，则有如下命题成立：

    - $EK/F$ 是 Galois 扩张；
    - $\mathrm{Gal}(EK/K)\overset{\varphi}{\rightarrow} \mathrm{Gal}(E/E\cap K)$ 是同构，且 $[EK:E\cap K]=[EK:E][EK:K]$；
    - $\mathrm{Gal}(EK/F)\overset{\phi}{\rightarrow} \mathrm{Gal}(E/F)\times \mathrm{Gal} (K/F)$ 是单射。当 $F=E\cap K$ 时是同构。

??? proof "证明"
    $(1)$：$EK/F$ 是一个可分多项式的分裂域。

    $(2)$：$\eta\in \mathrm{Gal}(EK/K)$。若 $\eta \in \mathrm{ker}\varphi$，则 $\eta|_E=id$，进而 $\eta|_{EK}=id$，即 $\varphi$ 是单射。

    $E^{\mathrm{Im}\varphi}=E\cap K$推出 $\mathrm{Im}\varphi=\mathrm{Gal}(E/E\cap K)$。

    $$
    a\in E\subset EK,\mathrm{Im}\varphi (a)=a\Longleftrightarrow a\in EK^{\mathrm{Gal}(EK/K)}=K\Longleftrightarrow a\in E\cap K
    $$

    故 $[EK:E\cap K]=[E:E\cap K][K:E\cap K]=[EK:K][EK:E]$

    $(3)$：$\eta\in\mathrm{ker}\phi,\eta|_E,\eta|K=id$，故 $\eta|_{EK}=id$，即 $\phi$ 是单射。

    若 $F=E\cap K$ 则 $\phi$ 是两个相同指数的有限集之间的单射，即 $\phi$ 是满射。

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/algebra-2h-notes.pdf){ .md-button download="algebra-2h-notes.pdf" }
