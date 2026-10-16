---
title: 第六章：曲线的微分几何
date: 2025-11-19
updated: 2026-10-15
description: 微分几何笔记第六章：曲线的微分几何。
hide:
  - navigation
categories:
  - 分析
tags:
  - differential-geometry
---

# 第六章：曲线的微分几何 { #top }

## 1. 曲线的微分几何 { #s1 }

!!! definition "定义（参数化曲线）"
    $M$ 上的一条**参数化曲线** $C$ 为一个光滑映射，

    $$
    \gamma:I=(-\varepsilon,\varepsilon)\rightarrow M
    $$

    称 $C$ 在 $p\in I$ 处**正则**，若 $\mathrm{rank}\gamma_{*,p}=1$。

    称 $C$ 为**分段光滑参数化曲线**，若 $\gamma$ 分段光滑。

注意到，$C$ 在 $p$ 处正则表明 $\gamma$ 在 $p$ 附近是浸入映射，由秩定理知局部 $\gamma$ 为单浸入，且为嵌入，从而局部可将 $\gamma$ 看成 $\gamma(p)$ 邻域的局部平凡化 $\varphi=\gamma^{-1}$。

但是 $C$ 处处正则并不代表整体 $\gamma$ 是单射。

构造 $\gamma^*TM=\left\{(t,X_{\gamma(t)})\in I\times T_{\gamma(t)}M\right\}$，这是流形上的一个向量丛，且秩为 $\dim M$，其为 $\Gamma(I,\gamma^*TM)$ 中的一个元素。

!!! definition "定义"
    称 $\gamma^*TM$ 为 $TM$ 沿着 $\gamma$ 的拉回，称 $\left( t,\gamma_{*,t}\left(\left.\dfrac{\partial }{\partial t}\right|_t\right)\right)$ 为 $\gamma$ 的切向量场。

考虑 $M=\mathbb{R}^3$，取局部图册 $\left(U=\mathbb{R}^3,\varphi=\mathrm{id},\left(x,y,z \right)^T \right)$

此时

$$
\begin{aligned}
\gamma:I\rightarrow &M
\\
t\mapsto & \left( \begin{array}{c}
x(t)=\pi^1\circ \gamma(t)\\
y(t)=\pi^2\circ \gamma(t)\\
z(t)=\pi^3\circ \gamma(t)\\
\end{array} \right)=\gamma(t)
\end{aligned}
$$

!!! definition "定义（Frenet 标架）"
    $$
    \begin{aligned}
    T\in \Gamma(I,\gamma^*TM),&\quad T(t)=\frac{\mathrm{d} \gamma(t)}{\mathrm{d} t}/\left|\frac{\mathrm{d} \gamma(t)}{\mathrm{d} t}\right|=\gamma_*(\frac{\partial }{\partial t})/\left|\gamma_*(\frac{\partial }{\partial t})\right|
    \\
    N\in \Gamma(I,\gamma^*TM),&\quad N=T'(t)/\left|T'(t)\right|
    \\
    b\in \Gamma(I,\gamma^*TM),&\quad b=T\times N
    \end{aligned}
    $$

    此处取度量为 $1\cdot 1$($M$ 上的度量在 $\gamma(I)$ 上的限制)：

    $$
    \left|X_{\gamma(t)}\right|^2=g_{\mathbb{R}^3}(X_{\gamma(t)},X_{\gamma(t)}),\forall X_{\gamma(t)}\in T_{\gamma(t)}M
    $$

**事实**：若 $\gamma$ 正则，且 $\left|T'(t)\right|\neq 0$，$b\neq 0$，则 $\left\{ T(t),N(t),b(t)\right\}$ 为 $\gamma^*TM$ 的一个标架。

!!! theorem "定理"
    Frenet 标架满足

    $$
    \frac{\mathrm{d} }{\mathrm{d} t}(T,N,b)=(T,N,b)\cdot M
    $$

    其中 $M$ 具有形式

    $$
    M(t)=\left( \begin{matrix}
    0&		-a\left( t \right)&		0\\
    a\left( t \right)&		0&		-b\left( t \right)\\
    0&		b\left( t \right)&		0\\
    \end{matrix} \right)
    $$

??? proof "证明"
    记 $e=(T,N,b)$

我们来看 Frenet 标架对参数 $t$ 是否有依赖性，设 $\tilde{t}$ 为另一参数化，$\dfrac{\mathrm{d} t}{\mathrm{d} \tilde{t}}>0$

$$
\begin{aligned}
\tilde{T}=& \frac{\mathrm{d} \gamma(t(\tilde{t}))}{\mathrm{d} \tilde{t}}/\left|\frac{\mathrm{d} \gamma(t(\tilde{t}))}{\mathrm{d} \tilde{t}}\right|=\frac{\mathrm{d} t}{\mathrm{d} \tilde{t}}\frac{\mathrm{d} \gamma(t))}{\mathrm{d} t}/\left|\frac{\mathrm{d} t}{\mathrm{d} \tilde{t}}\frac{\mathrm{d} \gamma(t))}{\mathrm{d} t}\right|=T
\\
\tilde{N}=&\frac{\mathrm{d} \tilde{T}}{\mathrm{d} \tilde{t}}/\left|\frac{\mathrm{d} \tilde{T}}{\mathrm{d} \tilde{t}}\right|=\frac{\mathrm{d} T}{\mathrm{d} \tilde{t}}/\left|\frac{\mathrm{d} T}{\mathrm{d} \tilde{t}}\right|=\frac{\mathrm{d} t}{\mathrm{d} \tilde{t}}\frac{\mathrm{d} T}{\mathrm{d} t}/\left|\frac{\mathrm{d} t}{\mathrm{d} \tilde{t}}\frac{\mathrm{d} T}{\mathrm{d} t}\right|=N
\end{aligned}
$$

$\tilde{t}$ 自然不变。$\dfrac{\mathrm{d} \tilde{e}}{\mathrm{d} \tilde{t}}=\tilde{e}\tilde{M}$，$\dfrac{\mathrm{d} e}{\mathrm{d} t}=eM$，故 $\tilde{M}=\dfrac{\mathrm{d} t}{\mathrm{d} \tilde{t}}M$。

事实上

$$
\begin{aligned}
a(t)=&\frac{\left|\gamma\times \gamma''\right|}{\left|\gamma'\right|^2}
\\
b(t)=&\frac{\mathrm{vol}(\gamma,\gamma',\gamma'')}{\left|\gamma'\times \gamma''\right|^2}\left|\gamma'\right|
\end{aligned}
$$

**弧长参数** $s$ 为满足 $\dfrac{\mathrm{d} t}{\mathrm{d} s}$ 的下述方程的解：

$$
\begin{aligned}
&\left|\frac{\mathrm{d} \gamma}{\mathrm{d} s}\right|=1
\\
\Longleftrightarrow&\frac{\mathrm{d} t}{\mathrm{d} s}\left|\frac{\mathrm{d} \gamma}{\mathrm{d} t}\right|=1
\\
\Longleftrightarrow&\frac{\mathrm{d} s}{\mathrm{d} t}=\left|\frac{\mathrm{d} \gamma}{\mathrm{d} t}\right|
\\
\Longleftrightarrow&s=\int^t\left|\gamma'(u)\right|\mathrm{d} u
\end{aligned}
$$

!!! definition "定义"
    曲线 $C$ 的**曲率** $\kappa(s)=a(s)$，**挠率** $\tau(s)=b(s)$。

在弧长参数下，

$$
\begin{aligned}
\kappa(s)=\left|\frac{\mathrm{d} ^2 \gamma(s)}{\mathrm{d} s^2}\right|=\left|\ddot{\gamma}(s)\right|
\\
\tau(s)=\frac{\mathrm{vol}(T,\dot{T},\ddot{T})}{\left|\dot{T}\right|^2}=\frac{\mathrm{vol}(\gamma,\dot{\gamma},\ddot{\gamma})}{\left|\dot{\gamma}\right|^2}
\end{aligned}
$$

特别的，当 $\kappa(s)=0$ 当且仅当 $\gamma$ 为直线，$\tau(s)=0$ 当且仅当 $\gamma$ 为平面曲线，证明留作习题。

下面我们来看看微分几何在狭义相对论的体现。

之后补。

（2025.1.7补：还是不看了，过于大分）

---

[返回目录](index.md){ .md-button } [下载 PDF 完整版](../../../assets/differential-geometry-notes.pdf){ .md-button download="differential-geometry-notes.pdf" }
