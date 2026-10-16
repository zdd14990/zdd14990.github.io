---
title: 第七章：PDE 数值解
date: 2026-07-07
updated: 2026-10-15
description: 计算与应用数学笔记第七章：椭圆 PDE 的有限差分方法。
hide:
  - navigation
categories:
  - 应用数学
tags:
  - pde
  - numerical-methods
---

# 第七章：PDE 数值解 { #top }

我们考虑一般形式的二阶PDE：

$$
\sum_{i,j=1}^{n}a_{ij}(x)u_{x_ix_j}+\sum_{i=1}^{n}b_i(x)u_{x_i}+c(x)u=f(x)
$$

其中 $u=u(x_1,\cdots,x_n)$ 是未知解，$a_{ij},b_i,c,f$ 为 $x=(x_1,\cdots,x_n)$ 的已知函数，且 $a_{ij}=a_{ji}$。设 $A=[a_{ij}]^n_{i,j=1}$，则 PDE 通过 $A$ 分为如下几类：

!!! definition "定义"
    - 若 $A$ 的特征值符号为 $\left\{+,+,\cdots,+\right\}$ 或 $\left\{-,-,\cdots,-\right\}$，则称为 **椭圆型(elliptic)** PDE。
    - 若 $A$ 的特征值符号为 $\left\{+,+,\cdots,+,0\right\}$ 或 $\left\{-,-,\cdots,-,0\right\}$，则称为 **抛物型(parabolic)** PDE。
    - 若 $A$ 的特征值符号为 $\left\{+,+,\cdots,+,-\right\}$ 或 $\left\{-,-,\cdots,-,+\right\}$，则称为 **双曲型(hyperbolic)** PDE。

考虑 $n=2$ 与 $u=u(x,y)$，则 PDE 可写成

$$
au_{xx}+2bu_{xy}+cu_{yy}+du_x+eu_y+fu=g
$$

我们有

$$
\left\|A\right\|=ac-b^2=\begin{cases}
>0 \quad &elliptic\\
=0 &parabolic\\
<0 &hyperbolic
\end{cases}
$$

为了简化书写，我们定义如下记号：

!!! definition "定义"
    - 对 $f:\mathbb{R}^n\rightarrow \mathbb{R}$，定义 $\nabla f=\text{grad} f=\left(\frac{\partial f}{\partial x_1},\cdots,\frac{\partial f}{\partial x_n}\right)^T$
    - 对 $F:\mathbb{R}^n\rightarrow \mathbb{R}^n$，定义 $\nabla \cdot F=\text{div} F=\sum_{i=1}^n \frac{\partial F_i}{\partial x_i}$
    - 对 $f:\mathbb{R}^n\rightarrow \mathbb{R}$，定义 $\Delta f =\nabla \cdot \nabla f=\sum_{i=1}^n \frac{\partial^2 f}{\partial x_i^2}$

!!! example "例（Elliptic）"
    考虑带边界条件的一般形式

    $$
    \begin{cases}
    \mathcal{L}u=f,\quad x\in \Omega\\
    u=g,\quad x\in \partial \Omega
    \end{cases}
    $$

    其中 $\mathcal{L}$ 是椭圆型算子。进一步的例子有 $\Delta u=0,x\in \Omega$(Laplace 方程)，$\Delta u=f,x\in \Omega$(Poisson 方程)。

!!! example "例（Parabolic）"
    考虑带边界条件的一般形式

    $$
    \begin{cases}
    u_t=\mathcal{L}u+f,\\
    u|_{t=0}=u_0,\\
    u|_{x\in \partial \Omega}=g
    \end{cases}
    $$

    其中 $\mathcal{L}$ 是椭圆型算子。进一步的例子有 $u_t=\beta\Delta u+f$(热方程)。

!!! example "例（Hyperbolic）"
    考虑带边界条件的一般形式

    $$
    \begin{cases}
    u_{tt}=\mathcal{L}u+f,\\
    u|_{t=0}=u_0,u_t|_{t=0}=\hat{u}_0,\\
    u|_{x\in \partial \Omega}=g
    \end{cases}
    $$

    其中 $\mathcal{L}$ 是椭圆型算子。进一步的例子有 $u_{tt}=c^2\Delta u+f$(波动方程)。

下面我们介绍另一种分类方法。

设 $\vec{u}(t,x):\mathbb{R}\times \mathbb{R}^m$ 且 $\vec{u}_t+A\vec{u}_x=\vec{F},A\in \mathbb{R}^{m\times m}$。

!!! definition "定义"
    - 若 $A$ 无实特征值，则称为 **椭圆型(elliptic)** PDE。
    - 若 $A$ 有 $m$ 个互不相同的实特征向量和 $m$ 个实特征值，即可对角化，则称为 **双曲型( hyperbolic)** PDE。
    - 若 $A$ 有 $m$ 个互不相同的实特征值，则称为 **严格双曲型(strictly hyperbolic)** PDE。

事实上我们可以从物理角度考虑，视 $u(x,t)$ 为密度函数，由如下方式改变 $u$:

$$
\begin{cases}
\text{flux: }F,\\
\text{source: }G,
\end{cases}
$$

则 $u_t+F_x=G$。于是有如下三种有物理意义的例子：

!!! example "例"
    - Advection：若 $F=au$，$G=0$，则 $u_t+au_x=0$。
    - Diffusion：若 $F=-\beta u_x$，$G=0$，则 $u_t=\beta u_{xx}$。
    - Steady：若 $F=-\beta u_x$，$G\neq 0$，$u_t\rightarrow 0(t\rightarrow \infty)$，则 $-\beta u_{xx}=G$。

### 0.1 Fourier 分析 { #s0-1 }

回忆，我们有

!!! theorem "命题"
    - 对 $e^{i\xi x}$，有 $\frac{\mathrm{d} }{\mathrm{d} x}e^{i\xi x}=i\xi e^{i\xi x}$。
    - 定义 $D_hV_j:=\frac{1}{2h}(V_{j+1}-V_{j-1})$ 是定义在 $\left\{V_j\right\}$ 上的算子。对 $\omega_j=e^{ijh\xi}$，$D_h\omega_j=\frac{1}{2h}(\omega_{j+1}-\omega_{j-1})=\frac{1}{h}\sin(h\xi )\omega_j$。

于是我们可以将 $e^{i\xi x}$ 视作 $\frac{\mathrm{d} }{\mathrm{d} x}$ 与 $D_h$ 的特征函数。

!!! definition "定义"
    设 $V(x)\in L^2(\mathbb{R})$，即 $\left\|V\right\|^2_{L^2}=\int _\mathbb{R} \left\|V(x)\right\|^2\mathrm{d} x<\infty$，则 **Fourier 变换(Fourier Transformation)** 定义为

    $$
    \mathcal{F}(V(x))=\hat{V}(\xi)=\frac{1}{\sqrt{2\pi}}\int_\mathbb{R} V(x)e^{-i\xi x}\mathrm{d} x
    $$

    反过来，$\hat{V}(\xi )$ 有逆 Fourier 变换：

    $$
    \mathcal{F}^{-1}(\hat{V}(\xi))=\frac{1}{\sqrt{2\pi}}\int_\mathbb{R} \hat{V}(\xi )e^{i\xi x}\mathrm{d} \xi =V(x)
    $$

!!! theorem "定理（Parseval equation）"
    $$
    \left\|V(x)\right\|_{L^2}=\left\|\hat{V}(\xi)\right\|_{L^2}
    $$

我们可以将其运用到 PDE 中。

对 $u(x,t)\in L^2(\mathbb{R})$，则 $u(x,t)=\frac{1}{\sqrt{2\pi }}\int_\mathbb{R} \hat{u}(\xi,t)e^{i\xi x}\mathrm{d} \xi$，则

$$
\begin{cases}
u_t(t,x)=\frac{1}{\sqrt{2\pi}}\int_\mathbb{R} \hat{u}(\xi ,t)e^{i\xi x}\mathrm{d} \xi\\
u_x(t,x)=\frac{1}{\sqrt{2\pi}}\int_\mathbb{R} i\xi \hat{u}(\xi ,t)e^{i\xi x}\mathrm{d} \xi\\
\end{cases}
$$

!!! example "例"
    对于 Advection 方程

    $$
    \begin{cases}
    u_t+au_x=0\\
    u(x,0)=\eta(x)\\
    \end{cases}
    $$

    由 FT 得 $\hat{u}_t+a\cdot i\xi \hat{u}=0$。解 ODE 得 $\hat{u}(\xi ,t)=e^{-i\xi xat}\hat{y}(\xi )$再用 IFT 得

    $$
    \begin{aligned}
    u(x,t)&=\frac{1}{\sqrt{2\pi}}\int_\mathbb{R} \hat{u}(\xi ,t)e^{i\xi x}\mathrm{d}\xi\\
    &=\frac{1}{\sqrt{2\pi}}\int_\mathbb{R} e^{i\xi (x-at)}\hat{\eta}(\xi )\mathrm{d} \xi \\
    &=\eta(x-at)
    \end{aligned}
    $$

!!! example "例"
    对于热方程

    $$
    \begin{cases}
    u_t=\beta u_{xx}\\
    u(x,0)=\eta(x)
    \end{cases}
    $$

    由 FT 得 $\hat{u}_t=-\beta \xi^2\hat{u}$。解 ODE 得 $\hat{u}(\xi,t)=e^{-\beta \xi^2t}\hat{eta}(x)$

!!! example "例"
    对于 Dispersive 方程

    $$
    \begin{cases}
    u_t=cu_{xxx}
    u(x,0)=\eta(x)
    \end{cases}
    $$

    由 FT 得 $\hat{u}_t=-i\xi^3 c\hat{u}$。解 ODE 得 $\hat{u}(\xi ,t)=e^{-i\xi ^3ct}\hat{\eta}(\xi)$，进一步 IFT 得：

    $$
    u(x,t)=\frac{1}{\sqrt{2\pi}} \int_\mathbb{R} e^{i\xi (x-c\xi ^2t)}\hat{\eta}(\xi )\mathrm{d} \xi
    $$

## 1. 椭圆 PDE 的有限差分方法 { #s1 }

首先我们给出推广的定义。考虑高维 PDE

$$
-\mathcal{L}u=f,\quad \mathcal{L}=\sum_{k=1}^{2m}\sum_{i_1,\cdots,i_k=1}^n a_{i_1\cdots i_k}(x)\frac{\partial ^k}{\partial x_{i_1}\cdots \partial x_{i_k}}+\cdots +a_0
$$

!!! definition "定义"
    我们称其为椭圆型的，若

    $$
    \forall x\in \Omega,\forall \xi \in \mathbb{R}^n\setminus \left\{0\right\},\sum_{i_1\cdots i_{2m}=1}^n a_{i_1\cdots i_{2m}}(x)\xi_{i_1}\cdots \xi_{i_{2m}}\ge \alpha(x)\sum_{i=1}^n \xi_i^{2m}
    $$

    其中 $\alpha(x)>0$。若 $\inf_{x\in \Omega} \alpha(x)>0$，则称其为一致严格椭圆型。对 $n=2$ 的情形，该定义等价于 $A\succ 0$。

!!! definition "定义"
    对 $p\ge 1$，向量 $a\in \mathbb{R}^n$ 的 $p-$范数定义为 $\left\|a\right\|_p=\left(\sum_{i=1}^n |a_i|^p\right)^\frac{1}{p}$。对矩阵 $A\in \mathbb{R}^{n\times m}$，其 $p-$范数定义为

    $$
    \left\|A\right\|_p=\max \left\{\left\|Ax\right\|_p\Big| x\in \mathbb{R}^m,\left\|x\right\|_p=1\right\}
    $$

    $A$ 的 Schatten 范数定义为：

    $$
    \left\|A\right\|_{S_p}=\left[\text{Tr}\left(\left(\sqrt{A^TA}\right)^p\right)\right]^\frac{1}{p}=\left[\sum_i s_i^p\right]^\frac{1}{p}
    $$

    其中 $s_i$ 为 $A$ 的奇异值。

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/computational-applied-math.pdf){ .md-button download="computational-applied-math.pdf" }
