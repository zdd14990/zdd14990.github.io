---
title: 第七章：ℝ³ 中曲面的微分几何
date: 2025-11-19
updated: 2026-10-15
description: 微分几何笔记第七章：mathbb{R}^3 中曲面的微分几何、高维切向量场的导数。
hide:
  - navigation
categories:
  - 分析
tags:
  - differential-geometry
---

# 第七章：ℝ³ 中曲面的微分几何 { #top }

## 1. $\mathbb{R}^3$ 中曲面的微分几何 { #s1 }

!!! definition "定义（曲面的参数化）"
    一个**参数化曲面**为一个光滑映射：

    $$
    \begin{aligned}
    \Omega \subseteq \mathbb{R}^2&\stackrel{F}{\rightarrow}M\stackrel{i}{\hookrightarrow}\mathbb{R}^3
    \\
    \left( \begin{array}{c}
    u\\
    v\\
    \end{array} \right) &\mapsto \left( \begin{array}{c}
    x\circ i\circ F(u,v)\\
    y\circ i\circ F(u,v)\\
    z\circ i\circ F(u,v)\\
    \end{array} \right)
    \end{aligned}
    $$

    简单起见，我们记 $r=i\circ F:\Omega\rightarrow \mathbb{R}^3$。

考虑参数化曲面($\Omega\stackrel{r}{\rightarrow }F$)上的曲线

$$
\begin{aligned}
I&\stackrel{\beta}{\longrightarrow}\Omega\stackrel{r}{\longrightarrow}M\subseteq \mathbb{R}^3
\\
t&\stackrel{\beta}{\mapsto}\left( \begin{array}{c}
u(t)\\
v(t)\\
\end{array} \right)\stackrel{r}{\mapsto}\left( \begin{array}{c}
x\circ r(u,v)\\
y\circ r(u,v)\\
z\circ r(u,v)\\
\end{array} \right)
\end{aligned}
$$

我们有：

$$
\begin{aligned}
\frac{\mathrm{d} (r\circ \beta)}{\mathrm{d} t}=&\frac{\mathrm{d} (x\circ r)(u(t),v(t))}{\mathrm{d} t}\frac{\partial }{\partial x}+\frac{\mathrm{d} (y\circ r)(u(t),v(t))}{\mathrm{d} t}\frac{\partial }{\partial y}+\frac{\mathrm{d} (z\circ r)(u(t),v(t))}{\mathrm{d} t}\frac{\partial }{\partial z}
\\
=&\left(\frac{\partial (x\circ r)(u(t),v(t))}{\partial u}\frac{\mathrm{d} u(t)}{\mathrm{d} t}+\frac{\partial (x\circ r)(u(t),v(t))}{\partial v}\frac{\mathrm{d} v(t)}{\mathrm{d} t}\right)\frac{\partial }{\partial x}
\\
+&\left(\frac{\partial (y\circ r)(u(t),v(t))}{\partial u}\frac{\mathrm{d} u(t)}{\mathrm{d} t}+\frac{\partial (y\circ r)(u(t),v(t))}{\partial v}\frac{\mathrm{d} v(t)}{\mathrm{d} t}\right)\frac{\partial }{\partial y}
\\
+&\left(\frac{\partial (z\circ r)(u(t),v(t))}{\partial u}\frac{\mathrm{d} u(t)}{\mathrm{d} t}+\frac{\partial (z\circ r)(u(t),v(t))}{\partial v}\frac{\mathrm{d} v(t)}{\mathrm{d} t}\right)\frac{\partial }{\partial z}
\\
=&\left(\frac{\partial (x\circ r)(u(t),v(t))}{\partial u}\frac{\partial }{\partial x}+\frac{\partial (y\circ r)(u(t),v(t))}{\partial u}\frac{\partial }{\partial y}+\frac{\partial (z\circ r)(u(t),v(t))}{\partial u}\frac{\partial }{\partial z}\right)\frac{\mathrm{d} u(t)}{\mathrm{d} t}
\\
+&\left(\frac{\partial (x\circ r)(u(t),v(t))}{\partial v}\frac{\partial }{\partial x}+\frac{\partial (y\circ r)(u(t),v(t))}{\partial v}\frac{\partial }{\partial y}+\frac{\partial (z\circ r)(u(t),v(t))}{\partial v}\frac{\partial }{\partial z}\right)\frac{\mathrm{d} v(t)}{\mathrm{d} t}
\\
(T\mathbb{R}^3\cong \mathbb{R}^3)=&\frac{\partial r(u(t),v(t))}{\partial u}\frac{\mathrm{d} u(t)}{\mathrm{d} t}+\frac{\partial r(u(t),v(t))}{\partial v}\frac{\mathrm{d} v(t)}{\mathrm{d} t}
\\
:=&r_u\frac{\mathrm{d} u(t)}{\mathrm{d} t}+r_v\frac{\mathrm{d} v(t)}{\mathrm{d} t}
\end{aligned}
$$

$$
\begin{aligned}
T_pM=&\left\{\left.\frac{\mathrm{d} (\text{过 } p \text{ 的道路})}{\mathrm{d} t}\right|_{t=0}\right\}\subseteq T_p\mathbb{R}^3=\mathbb{R}^3
\\
(\text{取特殊的道路 } \beta \text{，通过 } \gamma\circ \beta )=&\mathrm{span}_{\mathbb{R}}\left\{\left.r_u\right|_p,\left.r_v\right|_p\right\}
\end{aligned}
$$

其中

$$
r_u=r_*\frac{\partial }{\partial u},r_v=r_*\frac{\partial }{\partial v},r:\Omega\rightarrow M
\subseteq \mathbb{R}^3
$$

$M$ 上的度量

$$
\begin{aligned}
&g_{\mathbb{R}^3}=\mathrm{d} s^2=\mathrm{d} x\otimes \mathrm{d} x+\mathrm{d} y\otimes \mathrm{d} y+\mathrm{d} z\otimes \mathrm{d} z
\\
&\left.g_{\mathbb{R}^3}\right|_M:\Gamma(M,TM)\times \Gamma(M,TM)\rightarrow A^0(M)
\\
&\left.g_{\mathbb{R}^3}\right|_{p\in M}(X_p,Y_p)=g_{\mathbb{R}^3}(X_p,Y_p)
\end{aligned}
$$

取 $T_pM$ 的基 $r_u,r_v$，则 $g(r_u,r_u)=\left<r_u,r_u\right>,g(r_v,r_v)=\left<r_v,r_v\right>,g(r_u,r_v)=\left<r_u,r_v\right>$

!!! definition "定义（第 I  基本型）"
    定义参数化曲面 $r:\Omega\rightarrow M\subseteq \mathbb{R}^3$ 的第 I  基本型为 $I=\left.g_{\mathbb{R}^3}\right|_M$ 在 $TM$ 的基 $r_u,r_v$ 和局部坐标系 $u,v$ 下(此时 $r:\Omega\rightarrow M$ 为局部平凡化映射的逆)

    $$
    \begin{aligned}
    I=&\left<r_u,r_u\right>\mathrm{d} u\otimes \mathrm{d} u+\left<r_u,r_u\right>\mathrm{d} u\otimes \mathrm{d} u+\left<r_u,r_v\right>\mathrm{d} u\otimes \mathrm{d} v+\left<r_v,r_u\right>\mathrm{d} v\otimes \mathrm{d} u+\left<r_v,r_v\right>\mathrm{d} v\otimes \mathrm{d} v
    \\
    :=&\left<r_u\mathrm{d} u+r_v\mathrm{d} v,r_u\mathrm{d} u+r_v\mathrm{d} v\right>_{\mathbb{R}^3}=\left<\mathrm{d} r,\mathrm{d} r\right>_{\mathbb{R}^3}
    \end{aligned}
    $$

!!! theorem "命题"
    $I$ 不依赖于 $\Omega$ 坐标的选取，即在 $\Omega$ 的新坐标 $\left(\tilde{u},\tilde{v}\right)=\phi(u,v)$，其中 $\phi$ 是 $\Omega\rightarrow \Omega$ 的微分同胚，那么

    $$
    I=\sum_{k,l}\left<r_{u^k},r_{u^l}\right>\mathrm{d} u^k\otimes \mathrm{d} u^l=\phi^*\left(\sum_{k,l}\left<r_{\tilde{u}^k},r_{\tilde{u}^l}\right>\mathrm{d} \tilde{u}^k\otimes \mathrm{d} \tilde{u}^l\right)
    $$

??? proof "证明"
    $r,\mathrm{d} r$ 不依赖于 $\Omega$ 上坐标的选取，故 $I=r^*g_M$ 不依赖于坐标的选取。

$r$ 局部浸入，我们有 $r_u,r_v$ 局部线性无关，故

$$
N(u,v)=\frac{r_u\times r_v}{\left|r_u \times r_v\right|}\in \Gamma(\Omega,r^*T\mathbb{R}^3)
$$

!!! definition "定义（第 II  基本型）"
    参数化曲面 $r:\Omega\rightarrow M\subseteq \mathbb{R}^3$ 的第 II  基本型为 $\text{II} =-\left<\mathrm{d} r,\mathrm{d} N\right>_{\mathbb{R}^3}$

考虑线性映射

$$
\begin{aligned}
b:\Gamma(\Omega,r^*TM)&\rightarrow\Gamma(\Omega,r^*TM)
\\
r_u&\mapsto -N_u
\\
r_v&\mapsto -N_v
\end{aligned}
$$

从而 II $=-\left<\mathrm{d} r,\mathrm{d} N\right>_{\mathbb{R}^3}=\left<\mathrm{d} r,b(\mathrm{d} r)\right>_{\mathbb{R}^3}$，其中

$$
b(\mathrm{d} r)=b(\sum_{k=1}^2 r_{u^k}\mathrm{d} u^k)=\sum_{k=1}^2 b(r_{u^k})\mathrm{d} u^k=-\sum_{k=1}^2 N_{u^k}\mathrm{d} u^k=-\mathrm{d} N
$$

有时也称 $b$ 为第 II 基本型。

!!! theorem "命题"
    线性映射 $b$ 为自伴随映射，即在 $\left<bx,y\right>=\left<x,b^*y\right>$ 中有 $b^*=b$

??? proof "证明"
    取 $\Gamma(\Omega,r^*TM)$ 的基 $r_{u^k},k=1,2$

    $$
    LHS=-\left<N_{u^k},r_{u^l}\right>=\left<N,r_{u^lu^k}\right>=\left<N,r_{u^ku^l}\right>=RHS
    $$

定义双线性型

$$
\begin{aligned}
B:\Gamma(\Omega,r^*TM)\otimes \Gamma(\Omega,r^*TM)&\rightarrow \mathbb{R}
\\
(X,Y)&\mapsto B(X,Y)=\left<X,bY\right>
\end{aligned}
$$

则 $b$ 自伴随 $\Longleftrightarrow$ $B$ 对称。

!!! theorem "定理"
    考虑

    $$
    \kappa_1(p)=\max\limits_{\substack{
    X_p\in \left.TM\right|_p
    \\
    \left|X_p\right|=1
    }}B(X_p,X_p),\kappa_2(p)=\min\limits_{\substack{
    X_p\in \left.TM\right|_p
    \\
    \left|X_p\right|=1
    }}B(X_p,X_p)
    $$

    称 $\kappa_1,\kappa_2$ 为 $M$ 在 $p$ 处的主曲率，对应取到极值的向量 $X_p$ 称为主方向。则

    - 最大、最小值可以被取到。
    - $\kappa_1,\kappa_2$ 为映射 $b$ 的特征值，此时对应的主方向即为所对的特征向量。
    - $\kappa_1\neq \kappa_2$ 时主方向正交。

??? proof "证明"
    $B=U^T \mathrm{diag}\left\{\lambda_1,\cdots,\lambda_n\right\}U$，其中 $U$ 为正交阵，$\lambda_1\le \cdots \le \lambda_n$，做坐标变换可不妨 $B(x,x)=\sum \lambda_i x_i^2$，从而结论显然。

!!! definition "定义"
    考虑 $\Omega\overset{r}{\rightarrow}M\overset{i}{\hookrightarrow}\mathbb{R}^3$ 以及 $b:\Gamma(\Omega,r^*TM)\rightarrow\Gamma(\Omega,r^*TM)$。

    定义 $p$ 处的 **Gauss 曲率** 为 $\kappa=\det b=\kappa_1\kappa_2$，**平均曲率**为 $H=\mathrm{Tr}b=\kappa_1+\kappa_2$。

!!! theorem "命题"
    令 $b_{kl}=B(r_k,r_l)=\left<r_k,b(r_l)\right>=\left<r_{kl},N\right>$，$g_{kl}=\left<r_k,r_l\right>$，则

    $$
    \kappa=\frac{\det (b_{kl})}{\det (g_{kl})},H=\sum g^{kl}b_{kl}
    $$

下面我们讲介绍**高斯绝妙定理(Gauss's theorem egregium)**。

对 Gauss 曲面方程 $\Omega\overset{r}{\rightarrow}M\overset{i}{\hookrightarrow}\mathbb{R}^3$，考虑正交投影，

$$
\begin{aligned}
r_{jk}&=r_i\Gamma_{jk}^i+\left<r_{jk},N\right>N\qquad r_k=\frac{\partial r}{\partial u_k},r_{kl}=\frac{\partial ^2r}{\partial u^k\partial u^l}
\\
&=r_i\Gamma_{jk}^i+B_{jk}N
\end{aligned}
$$

这给出了 $\Gamma_{jk}^i$ 的定义。

!!! theorem "命题"
    $$
    \Gamma_{jk}^i=\frac{1}{2}g^{il}(\frac{\partial g_{lk}}{\partial u^j}+\frac{\partial g_{lj}}{\partial u^k}-\frac{\partial g_{jk}}{\partial u^l})
    $$

    其中 $g_M=\mathrm{d} s^2=\sum g_{jk}\mathrm{d} u^j\otimes \mathrm{d} u^k$

??? proof "证明"
    注意到 $r_{jk}$ 关于 $j,k$ 对称，故 $\Gamma_{jk}^i=\Gamma_{kj}^i$

    考虑

    $$
    \left<r_{jk},r_l\right>=\left<r_i\Gamma_{jk}^i+B_{jk}N,r_l\right>=g_{il}\Gamma_{jk}^i
    $$

    $$
    \begin{aligned}
    \partial_ig_{jk}=\partial_i\left<r_j,r_k\right>=&\left<\partial_ir_j,r_k\right>+\left<r_j,\partial_ir_k\right>
    \\
    =&\left<r_{ij},r_k\right>+\left<r_{ik},r_j\right>
    \\
    =&g_{ak}\Gamma^a_{ij}+g_{bj}\Gamma_{ki}^b
    \end{aligned}
    $$

    注意到 $\partial_ig_{jk}$ 关于 $j,k$ 对称。对上式中的 $i,j,k$ 做轮换，有

    $$
    \begin{aligned}
    &\partial_j g_{ki}+\partial_k g_{ij}-\partial_i g_{jk}
    \\
    =&(g_{ai}\Gamma_{jk}^a+g_{bk}\Gamma_{ij}^b)+(g_{aj}\Gamma_{ki}^a+g_{bi}\Gamma_{jk}^b)-(g_{ak}\Gamma_{ij}^a+g_{bj}\Gamma_{ik}^b)
    \\
    =&2g_{ai}\Gamma_{jk}^a
    \end{aligned}
    $$

    $$
    \Longrightarrow \frac{1}{2}g^{ai}(\partial_j g_{ki}+\partial_k g_{ij}+\partial_i g_{jk})=\Gamma_{jk}^a
    $$

**可积性条件**指的是 $r_{ijk}$ 与 $i,j,k$ 顺序无关。

!!! theorem "命题"
    $$
    0=r_{ijk}-r_{ikj}\overset{\text{Gauss 方程}}{=}r_a(R_{ijk}^a-U_{ijk}^a)+V_{ijk}N
    $$

    其中

    $$
    \begin{aligned}
    &R_{ikj}^a=(\partial_k\Gamma_{ij}^a-\partial_j\Gamma_{ik}^a)+(\Gamma_{kb}^a\Gamma_{ij}^b-\Gamma_{jb}^a\Gamma_{ki}^b)\text{称为 \textbf{Riemann 曲率张量}}
    \\
    &U^a_{ijk}=B^a_kB_{ij}-B_j^aB_{ik},B_j^i=g^{ik}B_{kj}
    \\
    &V_{ijk}=\Gamma_{ij}^aB_{ak}+\partial_kB_{ij}-\Gamma_{ik}^aB_{aj}-\partial_jB_{ik}
    \end{aligned}
    $$

    特别的，称 $R_{ikj}^a=U_{ijk}^a$ 为 **Gauss 方程**，$V_{ijk}=0$ 为 **Codazzi-Peterson 方程**

!!! theorem "推论"
    $\Gamma^i_{jk}$ 不是张量，$R^a_{bkl}$ 是张量，且关于 $k,l$ 反对称。

??? proof "证明"
    为方便记录，在下文中我们约定涉及旧坐标系 $\left\{  {x}^{i}\right\}$ 的指标均以拉丁字母表示，涉及新坐标系 $\left\{  {y}^{\alpha }\right\}$ 的指标均以希腊字母表示，采取 Einstein 求和约定,并适当省略计算过程。简记 ${\partial }_{i} \mathrel{\text{:=}} \frac{\partial }{\partial {x}^{i}},{\partial }_{\alpha } \mathrel{\text{:=}} \frac{\partial }{\partial {y}^{\alpha }}$ ,其可由 ${\partial }_{\alpha } = {\partial }_{\alpha }{x}^{j}{\partial }_{j}$ 联系. 记 $g,\Gamma ,R$ 在新坐标系中的对应分量为

    $$
    {\widetilde{g}}_{\alpha \beta } \mathrel{\text{:=}} g\left( { {\partial }_{\alpha },{\partial }_{\beta }}\right) ,{\widetilde{\Gamma }}_{\alpha \beta }^{\gamma } \mathrel{\text{:=}} \frac{1}{2}{\widetilde{g}}^{\gamma \delta }\left( { {\partial }_{\alpha }{\widetilde{g}}_{\delta \beta } + {\partial }_{\beta }{\widetilde{g}}_{\delta \alpha } - {\partial }_{\delta }{\widetilde{g}}_{\alpha \beta }}\right) ,{\widetilde{R}}_{\beta \gamma \delta }^{\alpha } \mathrel{\text{:=}} {\partial }_{\gamma }{\widetilde{\Gamma }}_{\beta \delta }^{\alpha } - {\partial }_{\delta }{\widetilde{\Gamma }}_{\beta \gamma }^{\alpha } + {\widetilde{\Gamma }}_{\gamma \varepsilon }^{\alpha }{\widetilde{\Gamma }}_{\beta \delta }^{\varepsilon } - {\widetilde{\Gamma }}_{\delta \varepsilon }^{\alpha }{\widetilde{\Gamma }}_{\beta \gamma }^{\varepsilon }
    $$

    由 $g$ 是一个(2,0)-型张量可知 ${\widetilde{g}}_{\alpha \beta } = {\partial }_{\alpha }{x}^{i}{\partial }_{\beta }{x}^{j}{g}_{ij}$ ,左右以 ${\partial }_{\delta } = {\partial }_{\delta }{x}^{k}{\partial }_{k}$ 求导可得

    $$
    {\partial }_{\delta }{\widetilde{g}}_{\alpha \beta } = {\partial }_{\delta }{\partial }_{\alpha }{x}^{i}{\partial }_{\beta }{x}^{j}{g}_{ij} + {\partial }_{\alpha }{x}^{i}{\partial }_{\delta }{\partial }_{\beta }{x}^{j}{g}_{ij} + {\partial }_{\delta }{x}^{k}{\partial }_{\alpha }{x}^{i}{\partial }_{\beta }{x}^{j}{\partial }_{k}{g}_{ij}.
    $$

    注意指标轮换, 计算可得

    $$
    {\partial }_{\alpha }{\widetilde{g}}_{\beta \delta } + {\partial }_{\beta }{\widetilde{g}}_{\delta \alpha } - {\partial }_{\delta }{\widetilde{g}}_{\alpha \beta } = 2{\partial }_{\alpha }{\partial }_{\beta }{x}^{i}{\partial }_{\delta }{x}^{j}{g}_{ij} + {\partial }_{\alpha }{x}^{k}{\partial }_{\beta }{x}^{i}{\partial }_{\delta }{x}^{j}\left( { {\partial }_{k}{g}_{ij} + {\partial }_{i}{g}_{jk} - {\partial }_{j}{g}_{ki}}\right) .
    $$

    最后两边同乘 $\frac{1}{2}{\widetilde{g}}^{\gamma \delta } = \frac{1}{2}{\partial }_{l}{y}^{\gamma }{\partial }_{j}{y}^{\delta }{g}^{lj}$ ,由 ${\widetilde{\Gamma }}_{\alpha \beta }^{\gamma } = \frac{1}{2}{\widetilde{g}}^{\gamma \delta }\left( { {\partial }_{\alpha }{\widetilde{g}}_{\beta \delta } + {\partial }_{\beta }{\widetilde{g}}_{\delta \alpha } - {\partial }_{\delta }{\widetilde{g}}_{\alpha \beta }}\right)$ 得

    $$
    {\widetilde{\Gamma }}_{\alpha \beta }^{\gamma } = {\partial }_{l}{y}^{\gamma }{\partial }_{\alpha }{\partial }_{\beta }{x}^{l} + {\partial }_{l}{y}^{\gamma }{\partial }_{\alpha }{x}^{k}{\partial }_{\beta }{x}^{i}{\Gamma }_{ki}^{l} = \frac{\partial {y}^{\gamma }}{\partial {x}^{i}}\frac{ {\partial }^{2}{x}^{i}}{\partial {y}^{\alpha }\partial {y}^{\beta }} + \frac{\partial {y}^{\gamma }}{\partial {x}^{k}}\frac{\partial {x}^{i}}{\partial {y}^{\alpha }}\frac{\partial {x}^{j}}{\partial {y}^{\beta }}{\Gamma }_{ij}^{k}.
    $$

    如果 ${\Gamma }_{ij}^{k}$ 为张量分量，则其应只有后一项,易见多出来的一项与 Jacobi 矩阵和 Hesse 矩阵均有关，一般情况下其并不平凡，故 ${\Gamma }_{ij}^{k}$ 不为某张量的分量。

    对于 $R$，由上得到

    $$
    \begin{aligned}
    {\partial }_{\gamma }{\widetilde{\Gamma }}_{\beta \delta }^{\alpha } &= {\partial }_{\gamma }{x}^{a}{\partial }_{p}\left( { {\partial }_{a}{y}^{\alpha }}\right) {\partial }_{\beta }{\partial }_{\delta }{x}^{p} + {\partial }_{a}{y}^{\alpha }{\partial }_{\beta }{\partial }_{\gamma }{\partial }_{\delta }{x}^{a}
    \\
    &+ {\partial }_{\gamma }\left( { {\partial }_{a}{y}^{\alpha }{\partial }_{\beta }{x}^{b}{\partial }_{\delta }{x}^{t}}\right) {\Gamma }_{bt}^{a} + {\partial }_{a}{y}^{\alpha }{\partial }_{\beta }{x}^{b}{\partial }_{\gamma }{x}^{k}{\partial }_{\delta }{x}^{l}{\partial }_{k}{\Gamma }_{bl}^{a},
    \end{aligned}
    $$

    $$
    \begin{aligned}
    {\widetilde{\Gamma }}_{\gamma \varepsilon }^{\alpha }{\widetilde{\Gamma }}_{\beta \delta }^{\varepsilon } &= {\partial }_{a}{y}^{\alpha }{\partial }_{p}\left( { {\partial }_{\gamma }{x}^{a}}\right) {\partial }_{\beta }{\partial }_{\delta }{x}^{p} + {\partial }_{p}{y}^{\alpha }{\partial }_{a}\left( { {\partial }_{\gamma }{x}^{p}}\right) {\partial }_{\beta }{x}^{b}{\partial }_{\delta }{x}^{t}{\Gamma }_{bt}^{a}
    \\
    &+ {\partial }_{\delta }\left( { {\partial }_{\beta }{x}^{b}}\right) {\partial }_{a}{y}^{\alpha }{\partial }_{\gamma }{x}^{t}{\Gamma }_{tb}^{a} + {\partial }_{a}{y}^{\alpha }{\partial }_{\beta }{x}^{b}{\partial }_{\gamma }{x}^{k}{\partial }_{\delta }{x}^{l}{\Gamma }_{kp}^{a}{\Gamma }_{bl}^{p}.
    \end{aligned}
    $$

    注意指标置换,将上两式代入 ${\widetilde{R}}_{\beta \gamma \delta }^{\alpha } = {\partial }_{\gamma }{\widetilde{\Gamma }}_{\beta \delta }^{\alpha } - {\partial }_{\delta }{\widetilde{\Gamma }}_{\beta \gamma }^{\alpha } + {\widetilde{\Gamma }}_{\gamma \varepsilon }^{\alpha }{\widetilde{\Gamma }}_{\beta \delta }^{\varepsilon } - {\widetilde{\Gamma }}_{\delta \varepsilon }^{\alpha }{\widetilde{\Gamma }}_{\beta \gamma }^{\varepsilon }$ ,由一系列计算可得

    $$
    {\widetilde{R}}_{\beta \gamma \delta }^{\alpha } = {\partial }_{a}{y}^{\alpha }{\partial }_{\beta }{x}^{b}{\partial }_{\gamma }{x}^{k}{\partial }_{\delta }{x}^{l}{R}_{bkl}^{a} = \frac{\partial {y}^{\alpha }}{\partial {x}^{a}}\frac{\partial {x}^{b}}{\partial {y}^{\beta }}\frac{\partial {x}^{k}}{\partial {y}^{\gamma }}\frac{\partial {x}^{l}}{\partial {y}^{\delta }}{R}_{bkl}^{a}.
    $$

    故由上式形式知 ${R}_{bkl}^{a}$ 是某张量的分量。

考虑 $M\overset{i}{\hookrightarrow} \mathbb{R}^3$，则 $R_{bkl}^a\overset{\text{Gauss 方程}}{=} B_k^aB_{bl}-B_l^aB_{bk}$ 由 $\partial \Gamma-\partial \Gamma+\Gamma\Gamma-\Gamma\Gamma$ 给出。

$\dim M=n=2$ 时，$R^a_{bkl}$ 中独立的分量之集 $R_{b12}^a(R^a_{b11}=R^a_{b22}=0,R_{b21}^a=-R_{b12}^a)$

考虑 $g^{cb}R^a_{bkl}$ 中独立的分量

$$
\begin{aligned}
g^{2b}R^1_{b12}\overset{\text{Gauss 方程}}{=}&g^{2b}(B^1_1B_{b2}-B^1_2B_{b1})
\\
=&B^1_1B_2^2-B^1_2B_1^2=K
\end{aligned}
$$

!!! theorem "定理（高斯绝妙定理）"
    $K$ 仅与 $g_M$ 有关，与 $M\overset{i}{\hookrightarrow} \mathbb{R}^3,r:\Omega\rightarrow M$ 无关。

??? proof "证明"
    $K=g^{2b}R^1_{b12}$，$R=\partial \Gamma-\partial \Gamma+\Gamma\Gamma-\Gamma\Gamma$ 仅与 $\Gamma$ 有关，$\Gamma=\frac{1}{2}g(\partial g+\partial g-\partial g)$ 仅与 $g$ 有关，故 $K$ 仅与 $g$ 有关。

!!! definition "定义（等距映射）"
    设 $(M,g_M),(N,g_N)$ 为赋予了度量的微分流形，称 $\phi:M\rightarrow N$ 为**等距同构**，若

    - $\phi$ 为微分同胚。
    - $\phi^*g_N=g_M(\forall X,Y\in \Gamma(M,TM),g_M(X,Y)=g_N(\phi^*X,\phi^*Y))$

**注：**等距映射保持**切向量场之间的内积**，而不是**两点的距离**。

于是我们可以如下陈述高斯绝妙定理：$K$ 在等距同构意义下不变。

!!! theorem "定理（Bonnet）"
    若满足 Gauss,Codazzi-Peterson 方程，则局部存在流形 $M$ 以及度量 $g_M$ 使得由 $g_M$ 定义的 $R$ 满足 Gauss-Codazzi-Peterson 的 $R$。

!!! theorem "定理（Frenet）"
    给定 $\kappa(s),\tau(s)$，存在空间曲线 $\gamma$ 使得其曲率，挠率分别为 $\kappa(s),\tau(s)$。

## 2. 高维切向量场的导数 { #s2 }

下面我们考虑如何对 $M$ 上切向量场 $V$ 求导。

在参数化曲面上，按前文所述，如果要给出 $r:\Omega\rightarrow M$ 在 $u_i$ 上的导数，我们需要取出正交投影，而这要求其上有度量结构。我们希望，通过某种方式定义导数而不依赖度量。

!!! definition "定义"
    $$
    \begin{aligned}
    \mathrm{d} :\Gamma(M,TM)\otimes C^{\infty}(M,\mathbb{R})\rightarrow &C^{\infty}(M,\mathbb{R})
    \\
    (X,f)\mapsto &X(f)=\mathrm{d} f(x):=\mathrm{d}_Xf
    \end{aligned}
    $$

    满足：

    - $\mathrm{d}_Xf$ 关于 $X$ 线性，满足 $\mathrm{d}_{gX}f=g\mathrm{d}_Xf$。
    - $\mathrm{d}_Xf$ 关于 $f$ 线性。
    - $\mathrm{d}_Xf$ 关于 $f$ 满足 Leibnitz 法则。

则 $\mathrm{d}$ 可视为 $C^{\infty}(M,\mathrm{R})\rightarrow \Gamma(M,TM)^*\otimes C^{\infty}(M,\mathbb{R})\cong \Gamma(M,T^*M)\otimes C^{\infty}(M,\mathbb{R})$或等价地视为

$$
d\in \Gamma(M,T^*M)\otimes \left\{Map(C^{\infty}(M,\mathbb{R}),C^{\infty}(M,\mathbb{R}))\Big|\text{线性、满足 Leibnitz 法则}\right\}
$$

在局部坐标图 $(U,\varphi,x)$ 取局部 $\Gamma(M,TM)$ 的基 $e_k=\frac{\partial }{\partial x^k}$ 与 $\Gamma(M,TM)^*=\Gamma(M,T^*M)$ 的对偶基 $\omega^k=\mathrm{d} x^k$，则

$$
\mathrm{d} =\sum_{k=1}^n\mathrm{d} x^k\otimes \frac{\partial }{\partial x^k}(-)\qquad \mathrm{d}_Xf=\sum_{k=1}^n\mathrm{d} x^k(X)\frac{\partial }{\partial x^k}f
$$

按定义 $\mathrm{d}$ 不依赖 $\left\{e_k\right\}$ 及对偶基 $\left\{\omega^k\right\}$ 的选取。

!!! definition "定义（协变导数）"
    $$
    \begin{aligned}
    \nabla:\Gamma(M,TM)\otimes \Gamma(M,TM)\rightarrow &\Gamma(M,TM)
    \\
    (X,V)\mapsto &\nabla_XV
    \end{aligned}
    $$

    称为切向量场 $V$ 沿 $X$ 的**协变导数**，若 $\nabla$ 满足：

    - $\nabla_XV$ 关于 $X$ 线性，满足 $\nabla_{gX}V=g\nabla_XV$。
    - $\nabla_XV$ 关于 $V$ 线性。
    - $\nabla_XV$ 关于 $V$ 满足 Leibnitz：$\nabla_X(fV)=(\nabla_Xf)V+f\nabla_XV=(\mathrm{d}_Xf)Vf\nabla_XV$

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/differential-geometry-notes.pdf){ .md-button download="differential-geometry-notes.pdf" }
