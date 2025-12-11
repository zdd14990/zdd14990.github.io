---
date: 2025-12-1
---

# 第四章：有限元方法

## 1.椭圆边值条件的变分形式

### 1.1 抽象变分问题

许多物理问题可以通过能量极小化原理求解，相应的变分问题是：

!!! definition "抽象变分问题"
    
    $$
        \text{求 }u\in \mathbb{U},\quad \text{使得 } J(u) = \min_{v\in \mathbb{U}} J(v)
    $$

    其中 $\mathbb{U}$ 是 Banach 空间 $\mathbb{V}$ 的一个非空闭子集，$J:\mathbb{U}\to \mathbb{R}$ 是定义在 $\mathbb{U}$ 上的能量泛函。特别的，在许多问题中 $\mathbb{V}$ 是 Hilbert 空间，$\mathbb{U}$ 是 $\mathbb{V}$ 的一个闭线性子空间，泛函 $J$ 具有如下形式：

    $$
        J(v) = \frac{1}{2} a(v,v) - f(v)
    $$

    其中 $a(\cdot,\cdot): \mathbb{V}\times \mathbb{V}\to \mathbb{R}$ 是一个双线性形式，$f:\mathbb{V}\to \mathbb{R}$ 是一个连续的线性泛函。

这类问题一般直接求解，或利用变分问题的 Euler-Lagrange 方程进行求解。两种方法都会用到微商的概念。

!!! definition "Frechet 微商"
    
    $F$ 称为在 $x\in \Omega$ 处 **Frechet 可微** 的，若存在线性映射 $A:\mathbb{X}\to \mathbb{Y}$，使得对任意的 $\varepsilon >0$，存在 $\delta >0$，当 $z\in \mathbb{X}$ 满足 $\|z\|\le \delta$ 时，有

    $$
        \|F(x+z) - F(x) - Az\|_{\mathbb{Y}} \le \varepsilon \|z\|_{\mathbb{X}}
    $$

    这时称 $A$ 为 $F$ 在 $x$ 处的 **Frechet 微商**，记为 $F'(x)=A$ 或 $\mathrm{d}F(x)=A$。
    $F'(x)z=Az$ 称为 $F$ 在点 $x$ 处的 **Frechet 微分** 或 **一阶变分**。如果对任意的 $z\in \mathbb{X}$，$F'(x)z$ 在 $x\in \Omega$ 处是 **Frechet 可微** 的，则称 $F$ 在 $x$ 处是 **二次 Frechet 可微** 的，且 **二阶 Frechet 微商** 是一个 $\mathbb{X}\times \mathbb{X}$ 上的双线性映射，记为 $F''(x)$ 或 $\mathrm{d}^2 F(x)$。此时 $F''(x)(z,y)=\mathrm{d}^2 F(x)(z,y)=(F'(x)z)'y$ 称为 $F$ 在点 $x$ 处的 **二阶 Frechet 微分** 或 **二阶变分**。一般地，可由 $\mathrm{d}^mF(x)=\mathrm{d}(\mathrm{d}^{m-1}F(x))$ 定义 **$m$ 阶 Frechet 微商**，以及 **$m$ 阶 Frechet 微分** $\mathrm{d}^mF(x)(z_1,z_2,\ldots,z_m)$。点 $x$ 处的 $m$ 阶 Frechet 微商 $\mathrm{d}^mF(x)$ 称为 **有界** 的，若 $\mathrm{d}^mF(x)$ 是一个有界的多线性映射。

!!! definition "Gateaux 微商"
    
    $F$ 称为在 $x\in \Omega$ 处沿方向 $z\in \mathbb{X}$ 是 **Gateaux 可微** 的，若以下极限存在：

    $$
    \mathrm{D}F(x;z)=\lim_{t\to 0}\frac{F(x+tz)-F(x)}{t}
    $$

    这时称 $\mathrm{D}F(x;z)$ 为 $F$ 在点 $x$ 处沿方向 $z$ 的 **Gateaux 微分**。若 $\mathrm{D}F(x;z)$ 关于 $z$ 是线性的，即存在一个线性映射 $A:\mathbb{X}\to \mathbb{Y}$，使得 $\mathrm{D}F(x;z)=Az$，则称 $A$ 是 $F$ 在点 $x$ 处的 **Gateaux 微商**，记为 $\mathrm{D}F(x)=A$。若对给定的 $z\in \mathbb{X}$，$\mathrm{D}F(x;z)$ 在 $x\in \Omega$ 处沿方向 $y\in \mathbb{X}$ 是 **Gateaux 可微** 的，则称其微分为 $F$ 在点 $x$ 处沿方向 $z$ 和 $y$ 的 **二阶混合 Gateaux 微分**，记为 $\mathrm{D}^2F(x;z,y)$。若 $\mathrm{D}^2F(x;z,y)$ 关于 $z$ 和 $y$ 是双线性的，则定义 $\mathrm{D}^2F(x)(z,y)=\mathrm{D}^2F(x;z,y)$，并称 $\mathrm{D}^2F(x)$ 为 $F$ 在点 $x$ 处的 **二阶 Gateaux 微商**。一般地，可归纳定义 **$m$ 阶混合 Gateaux 微分** $\mathrm{D}^mF(x;z_1,z_2,\ldots,z_m)=\mathrm{D}(\mathrm{D}^{m-1}F(x;z_1,z_2,\ldots,z_{m-1});z_m)$，以及 **$m$ 阶 Gateaux 微商** $\mathrm{D}^mF(x)=\mathrm{D}(\mathrm{D}^{m-1}F(x))$。

若 $F$ 的 Frechet 微商存在，则其 Gateaux 微商也存在，且两者相等；反之，若 $F$ 的 Gateaux 微商在 $x$ 的邻域中存在且在 $x$ 处连续，则 $F$ 在 $x$ 处的 Frechet 微商也存在，且两者相等。这时可以利用 Gateaux 微商来计算 Frechet 微商：

$$
F'(x)z=\mathrm{D}F(x)z=\frac{\mathrm{d}}{\mathrm{d}t}F(x+tz)\Big|_{t=0}
$$

一般 $\mathrm{D}^2F(x;z,y)\neq F''(x)(z,y)$，但若 $m$ 阶 Gateaux 微商 $\mathrm{D}^mF(\cdot)$ 在 $x_0$ 的邻域中是一致有界的 $m$ 线性映射，且关于 $x$ 一致连续时，则它关于 $(z_1,\cdots,z_m)$ 有对称性，且此时 $F$ 在 $x$ 处的 $m$ 阶 Frechet 微商存在，且取值为 $\mathrm{D}^mF(x_0)$。这时我们可以用 $m$ 阶 Gateaux 微分来计算 $m$ 阶 Frechet 微分：

$$
F^{(m)}(x)(z_1,z_2,\ldots,z_m)=\frac{\mathrm{d}}{\mathrm{d}t_m}\left[\cdots \frac{\mathrm{d}}{\mathrm{d}t_1}(x+t_1z_1+\cdots +t_mz_m)\Big|_{t_1=0}\cdots\right]\Big|_{t_m=0}
$$

若 Frechet 可微的函数 $F$ 在 $x$ 处取得极小值，则对任意的 $z\in \mathbb{X}$，$F(x+tz)$ 作为 $t$ 的函数在 $t=0$ 处也取得极小值，因此有

$$
F'(x)z=0, \forall z\in \mathbb{X}
$$

因此 Frechet 可微泛函 $F$ 在 $x$ 处取得极小值的必要条件是 $x$ 满足上式。上式也被称为 Euler-Lagrange 方程 $F'(x)=0$ 的弱形式。此外若存在 $\alpha >0$ 和 $\delta >0$，使得对任意的 $z\in \mathbb{X}$ 和 $\|z\|\le \delta$，有 $F''(x)(z,z)\ge \alpha \|z\|^2$，则 $F$ 在 $x$ 处取得极小值的充分条件也成立。

!!! example "例"
    设 $J=\frac{1}{2}a(v,v)-f(v)$，则

    $$
    \frac{1}{t}(J(u+tv)-J(u)) = + a(u,v) - f(v)+\frac{1}{2}a(v,v)t 
    $$

    结合 $a(\cdot,\cdot)$ 和 $f(\cdot)$ 的连续性可知

    $$
    J'(u)(v)=a(u,v)-f(v)
    $$

    若 $J$ 在 $u$ 处取得极小值，则 $u$ 满足方程

    $$
    a(u,v)-f(v)=0, \forall v\in \mathbb{U}
    $$

!!! theorem "Lax-Milgram 定理"
    
    设 $\mathbb{V}$ 是 Hilbert 空间，$a(\cdot,\cdot):\mathbb{V}\times \mathbb{V}\to \mathbb{R}$ 是一个连续的双线性泛函，且满足 $\mathbb{V}$ **椭圆性条件**(也称为 **强制性条件**)：

    $$
    \exists \alpha >0, \quad a(v,v)\ge \alpha \|u\|^2, \forall u\in \mathbb{V}
    $$

    设 $f:\mathbb{V}\to \mathbb{R}$ 是一个连续的线性泛函，则抽象变分问题

    $$
    \text{求 }u\in \mathbb{V},\quad \text{使得 } a(u,v)=f(v), \forall v\in \mathbb{V}
    $$

    存在唯一解。

!!! proof "证明"
    由双线性泛函 $a(\cdot,\cdot)$ 的连续性可知，存在常数 $M>0$，使得

    $$
    a(u,v)\le M\|u\|\|v\|, \forall u,v\in \mathbb{V}
    $$

    对任意 $u\in \mathbb{V}$，由 $v\in \mathbb{V}\mapsto a(u,v)$ 是连续线性泛函知存在唯一的 $A(u)\in \mathbb{V}^*$，使得

    $$
    A(u)v=a(u,v), \forall v\in \mathbb{V}
    $$

    易知 $A:\mathbb{V}\to \mathbb{V}^*$ 是线性映射，且

    $$
    \|A\|_{\mathcal{L}(\mathbb{V},\mathbb{V}^*)}\triangleq \sup_{u\in \mathbb{V},\|u\|=1}{\|A(u)\|_{\mathbb{V}^*}}=\sup_{u,v\in \mathbb{V},\|u\|=\|v\|=1}|A(u)v|\le M
    $$

    记 $\tau:\mathbb{V}^*\to \mathbb{V}$ 为 Riesz 映射，由定义有

    $$
    f(v)=\left<\tau f,v\right>, \forall v\in \mathbb{V}
    $$

    于是求解该问题等价于求解问题

    $$
    \text{求 }u\in \mathbb{V},\quad \text{使得 } \tau A(u)=\tau f
    $$

    定义映射 $F:\mathbb{V}\to \mathbb{V}$ 为 $F(v)=v-\rho(\tau A(v)-\tau f)$，其中 $\rho >0$ 是待定参数。则求解上问题的解等价于求解 $F(\cdot)$ 的不动点。我们还有

    $$
    \left<\tau A(v),v\right>=a(v,v)\ge \alpha \|v\|^2
    $$

    $$
    \| \tau A(v) \| = \| A(v) \|_{\mathbb{V}^*} \le M \| v \|
    $$

    因此对于给定的 $\rho\in (0, \frac{2\alpha}{M^2})$，有

    $$
    \begin{aligned}
        \|F(v_1)-F(v_2)\|^2 &= \|v_1-v_2\|^2 - 2\rho \left<\tau A(v_1)-\tau A(v_2), v_1-v_2\right> + \rho^2 \|\tau A(v_1)-\tau A(v_2)\|^2\\
        &\le \left(1 - 2\rho \alpha + \rho^2 M^2\right) \|v_1-v_2\|^2 < \|v_1-v_2\|^2
    \end{aligned}
    $$

    即 $F$ 为 $\mathbb{V}$ 上的压缩映射。由 Banach 不动点定理可知，$F$ 存在唯一不动点，即原问题存在唯一解。


### 1.2 变分形式和弱解

Poisson 方程的边值问题通常有如下形式：

$$
\begin{cases}
    -\Delta u=f ,&x\in \Omega\\
    u=\bar{u}_0,&x\in \partial \Omega_0\\
    \frac{\partial u}{\partial n}+bu=g,&x\in \partial \Omega_1
\end{cases}
$$


下面我们考虑 Sobolev 空间。

设 $\Omega\subset \mathbb{R}^d$ 是连通的开区域，$\partial \Omega$ 是其边界，在 $\Omega$ 内具有紧支集的 $m$ 次连续可微函数的集合记作 $C_0^m(\Omega)$。

设 $u\in C^m(\Omega)$，$\alpha=(\alpha_1,\alpha_2,\ldots,\alpha_d)$ 为多重指标，则对任意的 $\phi\in C_0^m(\Omega)$，由 Green 公式有

$$
\int_{\Omega} \phi \partial^\alpha u\mathrm{d}x = (-1)^{|\alpha|} \int_{\Omega} u \partial^\alpha \phi \mathrm{d}x
$$

这启发了我们关于区域 $\Omega$ 上所有局部 Lebesgue 可积函数构成的线性空间 $\mathbb{L}_{\mathrm{loc}}^1(\Omega)$ 中的广义导数的概念。

!!! definition "广义导数"
    
    设 $u\in \mathbb{L}_{\mathrm{loc}}^1(\Omega)$，若存在 $v_\alpha\in \mathbb{L}_{\mathrm{loc}}^1(\Omega)$，使得对任意的 $\phi\in C_0^\infty(\Omega)$，有

    $$
    \int_{\Omega} \phi v_\alpha \mathrm{d}x = (-1)^{|\alpha|} \int_{\Omega} u \partial^\alpha \phi \mathrm{d}x
    $$

    则称 $v_\alpha$ 为 $u$ 关于多重指标 $\alpha$ 的一个 $\left|\alpha\right|$ 阶 **广义偏导数**，记为 $\partial^\alpha u = v_\alpha$。


下文中若不作特别说明，均假设所有的导数为广义导数。

!!! theorem "定理"
    设 $\Omega\subset \mathbb{R}^n$ 是连通的开区域，$u$ 的所有 $\left|\alpha\right|=m+1$ 阶广义偏导数均为零，则 $u$ 是 $\Omega$ 上的一个次数不超过 $m$ 的多项式。

!!! definition "Sobolev 空间"
    设 $m$ 为非负整数，$1\le p\le \infty$，令

    $$
    \mathbb{W}=\left\{u\in \mathbb{L}^p(\Omega): \partial^\alpha u \in \mathbb{L}^p(\Omega), \forall |\alpha|\le m\right\}
    $$

    其中 $\mathbb{L}^p(\Omega)$ 是 $\Omega$ 上的 $p$ 次 Lebesgue 可积函数空间，其范数记为 $\|\cdot\|_{0,p,\Omega}$。集合 $\mathbb{W}$ 赋予范数

    $$
    \|u\|_{m,p,\Omega} = \left( \sum_{|\alpha|\le m} \|\partial^\alpha u\|_{0,p,\Omega}^p \right)^{1/p}, \quad 1\le p < \infty
    $$

    $$
    \|u\|_{m,\infty,\Omega} = \max_{|\alpha|\le m} \|\partial^\alpha u\|_{0,\infty,\Omega}
    $$

    后得到的线性赋范空间称为一个 **Sobolev 空间**，记为 $\mathbb{W}^{m,p}(\Omega)$，并称 $p$ 是 **Sobolev 指标**。

我们有如下重要不等式

!!! theorem "Minkowski 不等式"
    
    对任意 $1\le p \le \infty$ 和 $f,g\in \mathbb{L}^p(\Omega)$，有

    $$
    \|f+g\|_{0,p,\Omega} \le \|f\|_{0,p,\Omega} + \|g\|_{0,p,\Omega}
    $$

!!! theorem "Holder 不等式"
    
    设 $1\le p,q \le \infty$，且 $\frac{1}{p}+\frac{1}{q}=1$，则对任意的 $f\in \mathbb{L}^p(\Omega)$ 和 $g\in \mathbb{L}^q(\Omega)$，有

    $$
    \|fg\|_{0,1,\Omega} \le \|f\|_{0,p,\Omega} \|g\|_{0,q,\Omega}
    $$

!!! theorem "Cauchy 不等式"
    
    当 $p=q=2$ 时，由 Holder 不等式可得 Cauchy 不等式：

    $$
    \|fg\|_{0,1,\Omega} \le \|f\|_{0,2,\Omega} \|g\|_{0,2,\Omega}
    $$

不难证明，$\mathbb{W}^{m,p}(\Omega)$ 是 Banach 空间，当 $p=2$ 时，$\mathbb{W}^{m,2}(\Omega)$ 是 Hilbert 空间，记为 $\mathbb{H}^m(\Omega)$，其范数记为 $\|\cdot\|_{m,\Omega}$。

!!! theorem "定理"

    若 $\Omega$ 的边界 $\partial \Omega$ 是 Lipschitz 连续的曲面，$1\le p<\infty $，则 $C^\infty(\bar{\Omega})$ 在 $\mathbb{W}^{m,p}(\Omega)$ 中是稠密的。

由该定理我们有对于具有 Lipschitz 连续边界的区域 $\Omega$，$\mathbb{W}^{m,p}(\Omega)$ 是 $C^\infty(\bar{\Omega})$ 在范数 $\|\cdot\|_{m,p,\Omega}$ 下的完备化度量空间。空间 $C_0^\infty(\Omega)$ 在 $\mathbb{W}^{m,p}(\Omega)$ 中的闭包是 Sobolev 空间 $\mathbb{W}^{m,p}(\Omega)$ 的一个子空间，记为 $\mathbb{W}_0^{m,p}(\Omega)$。不难证明 $\mathbb{W}_0^{m,2}(\Omega)$ 在范数 $\|\cdot\|_{m,\Omega}$ 下是 Banach 空间，特别的，当 $p=2$ 时，它是 Hilbert 空间，记为 $\mathbb{H}_0^m(\Omega)$。

!!! theorem "Poincare-Friedrichs 不等式"
    
    设 $\Omega$ 有有限宽度，即它位于两个平行的超平面之间，则存在只依赖于空间维数 $n$，偏导数的阶数 $m$，两超平面距离 $d$ 和 Sobolev 指标 $1\le p<\infty $ 的常数 $K(n,m,d,p)$，使得

    $$
    |u|_{m,p,\Omega}\le \|u\|_{m,p,\Omega} \le K(n,m,d,p) |u|_{m,p,\Omega}, \forall u\in \mathbb{W}_0^{m,p}(\Omega)
    $$

    其中

    $$
    |u|_{m,p,\Omega} = \left( \sum_{|\alpha|=m} \|\partial^\alpha u\|_{0,p,\Omega}^p \right)^{1/p}, \quad 1\le p < \infty
    $$

    是 Sobolev 空间 $\mathbb{W}^{m,p}(\Omega)$ 上的 **半范数**。

!!! proof "证明"
    设 $\Omega$ 位于 $x_n=0$ 和 $x_n=d$ 两个平行超平面之间，令 $x=(x',x_n)$，其中 $x'=(x_1,x_2,\ldots,x_{n-1})$。对任意的 $u\in C_0^\infty(\Omega)$，有

    $$
    u(x)= \int_0^{x_n} \partial_t u(x',t) \mathrm{d}t
    $$

    因此，由 Holder 不等式可得

    $$
    \left| \int_0^{x_n} \partial_t u(x',t) \mathrm{d}t \right|^p \le \left( \int_0^{x_n} |\partial_t u(x',t)|^p \mathrm{d}t \right) \left( \int_0^{x_n} 1 \mathrm{d}t \right)^{p-1} = x_n^{p-1} \int_0^{x_n} |\partial_t u(x',t)|^p \mathrm{d}t
    $$

    进而有

    $$
    \begin{aligned}
        \|u\|_{0,p,\Omega}^p&=\int_{\mathbb{R}^{n-1}} \mathrm{d}x' \int_0^d |u(x)|^p \mathrm{d}x_n \\
        &\le \int_{\mathbb{R}^{n-1}} \mathrm{d}x' \int_0^d x_n^{p-1} \mathrm{d}x_n \int_0^{x_n} |\partial_t u(x',t)|^p \mathrm{d}t \\
        &\le \left(\frac{d^p}{p}\right) |u|_{1,p,\Omega}^p
    \end{aligned}
    $$

    于是得

    $$
    |u|_{1,p,\Omega} \le \|u\|_{1,p,\Omega} =\|u\|_{0,p,\Omega}+|u|_{1,p,\Omega} \le \left(1+\frac{d^p}{p}\right) |u|_{1,p,\Omega}
    $$

    对导函数 $\partial^\alpha u$，$|\alpha|<m$，重复上述过程，可得

    $$
    |u|_{m,p,\Omega} \le \|u\|_{m,p,\Omega} \le K(d,p) |u|_{m,p,\Omega}, \quad \forall u\in C_0^\infty(\Omega)
    $$

    由此与 $C_0^\infty(\Omega)$ 在 $\mathbb{W}_0^{m,p}(\Omega)$ 中的稠密性可知该不等式对任意的 $u\in \mathbb{W}_0^{m,p}(\Omega)$ 成立。

!!! definition "嵌入算子"
    对于 Banach 空间 $\mathbb{X}$ 和 $\mathbb{Y}$，若 $\mathbb{X}\subset \mathbb{Y}$，且存在常数 $C>0$，使得对任意的 $x\in \mathbb{X}$，有 $\|x\|_{\mathbb{Y}}\le C \|x\|_{\mathbb{X}}$，则称恒同算子 $I:\mathbb{X}\to \mathbb{Y}$ 为一个 **嵌入算子**，记为 $\mathbb{X}\hookrightarrow \mathbb{Y}$。若嵌入算子 $I$ 是紧的，即 $I$ 将 $\mathbb{X}$ 中的有界闭集映为 $\mathbb{Y}$ 中的紧集，则称相应的嵌入算子为 **紧嵌入算子**，记为 $\mathbb{X}\overset{c}{\hookrightarrow} \mathbb{Y}$。

!!! theorem "Sobolev 嵌入定理"
    设有界连通区域 $\Omega$ 的边界 $\partial \Omega$ 是 Lipschitz 连续的曲面，则：

    * 当 $m<n/p$ 时，$\mathbb{W}^{m+k,p}(\Omega)\hookrightarrow \mathbb{W}^{k,q}(\Omega)$，$1\le q\le \frac{np}{n-mp}$，$k\ge 0$；
    * 当 $m<n/p$ 时，$\mathbb{W}^{m+k,p}(\Omega)\overset{c}{\hookrightarrow} \mathbb{W}^{k,q}(\Omega)$，$1\le q< \frac{np}{n-mp}$，$k\ge 0$；
    * 当 $m=n/p$ 时，$\mathbb{W}^{m+k,p}(\Omega)\overset{c}{\hookrightarrow} \mathbb{W}^{k,q}(\Omega)$，$1\le q< \infty$，$k\ge 0$；
    * 当 $m>n/p$ 时，$\mathbb{W}^{m+k,p}(\Omega)\overset{c}{\hookrightarrow} C^k(\bar{\Omega})$，$k\ge 0$。

由于 Lipschitz 连续边界的 $n$ 维 Lebesgue 测度为零，所以 $\mathbb{W}^{m,p}(\Omega)$ 中的函数在 $\partial \Omega$ 上的值没有定义。但由于 $C^\infty(\bar{\Omega})$ 在 $\mathbb{W}^{m,p}(\Omega)$ 中是稠密的，因此对于任意 $u\in \mathbb{W}^{m,p}(\Omega)$，都存在一个序列 $\{u_k\}\subset C^\infty(\bar{\Omega})$，使得 $\|u-u_k\|_{m,p,\Omega}\to 0$。记 $u_k$ 在 $\partial \Omega$ 上的限制为 $u_k|_{\partial \Omega}$。若对于任意逼近序列 $\{u_k\}$，$u_k|_{\partial \Omega}$ 在 $\mathbb{L}^q(\partial \Omega)$ 都收敛，则称其极限为 $u$ 在 $\partial \Omega$ 上的 **迹**，记为 $u|_{\partial \Omega}$，称映射 $\nu:\mathbb{W}^{m,p}(\Omega)\to \mathbb{L}^q(\partial \Omega)$，$u\mapsto u|_{\partial \Omega}$ 为 **迹算子**。若 $\nu$ 是连续的（且是紧的），则称空间 $\mathbb{W}^{m,p}(\Omega)$ 嵌入（紧嵌入）到 $\mathbb{L}^q(\partial \Omega)$，记为 $\mathbb{W}^{m,p}(\Omega)\hookrightarrow \mathbb{L}^q(\partial \Omega)$（$\mathbb{W}^{m,p}(\Omega)\overset{c}{\hookrightarrow} \mathbb{L}^q(\partial \Omega)$）。关于迹算子还有如下嵌入定理：

!!! theorem "迹嵌入定理"
    
    设有界连通区域 $\Omega$ 的边界 $\partial \Omega$ 是 $m\ge 1$ 阶光滑的曲面，则：

    * 当 $m<n/p$ 时，$\mathbb{W}^{m,p}(\Omega)\hookrightarrow \mathbb{L}^q(\partial \Omega)$，$1\le q\le \frac{(n-1)p}{n-mp}$；
    * 当 $m=n/p$ 时，$\mathbb{W}^{m,p}(\Omega)\hookrightarrow \mathbb{L}^q(\partial \Omega)$，$1\le q< \infty$；
    
    另外，当 $m=1,p=q=2$ 时，若边界 $\partial \Omega$ 是 Lipschitz 连续的曲面，则特别的有

    $$
    \mathbb{H}^1(\Omega)\hookrightarrow \mathbb{L}^2(\partial \Omega)
    $$

下面我们介绍椭圆边值问题的变分形式和弱解。我们总是假设区域 $\Omega$ 是有界连通区域，且其边界 $\partial \Omega$ 是 Lipschitz 连续的曲面。首先来考虑 Poisson 方程的 Dirichlet 边值问题：

$$
\begin{cases}
    -\Delta u=f ,&x\in \Omega\\
    u=\bar{u}_0,&x\in \partial \Omega
\end{cases}
$$

设其有古典解 $u\in C^2(\bar{\Omega})$，任取函数 $v\in C_0^\infty(\Omega)$，由 Green 公式有

$$
\int_{\Omega} \nabla u \cdot \nabla v \mathrm{d}x - \int_{\partial \Omega} v\partial_\nu u \mathrm{d}x= \int_{\Omega} f v \mathrm{d}x
$$

其中 $\nabla=(\partial_1,\cdots,\partial_n)$ 为梯度算子，$\partial_\nu u$ 为 $u$ 在边界 $\partial \Omega$ 上的外法向导数。由于 $v\in C_0^\infty(\Omega)$ 在 $\partial \Omega$ 上为零，所以上式化简为

$$
\int_{\Omega} \nabla u \cdot \nabla v \mathrm{d}x = \int_{\Omega} f v \mathrm{d}x
$$

以 $(\cdot,\cdot)$ 表示 $\mathbb{L}^2(\Omega)$ 上的内积，令

$$
a(u,v) = \int_{\Omega} \nabla u \cdot \nabla v \mathrm{d}x
$$

则上述方程可写为

$$
a(u, v) = (f,v)
$$

又因为 $a(\cdot,\cdot)$ 和 $(\cdot,\cdot)$ 都是 $\mathbb{H}^1(\Omega)$ 上的连续的双线性泛函，再有稠密性就有

$$
a(u,v) = (f,v), \quad \forall v\in \mathbb{H}_0^1(\Omega)
$$

虽然这个方程是由 $u\in C^2(\bar{\Omega})$ 推导出来的，但它对 $u\in \mathbb{H}^1(\Omega)$ 也是有意义的。由此引出弱解的定义：

!!! definition "弱解"
    
    若 $u\in \mathbb{V}(\bar{u}_0;\Omega)=\left\{u\in\mathbb{H}^1(\Omega):u|_{\partial \Omega} = \bar{u}_0 \right\}$ 满足变分方程：

    $$
    a(u,v) = (f,v), \quad \forall v\in \mathbb{H}_0^1(\Omega)
    $$

    则称 $u$ 为 Poisson 方程 Dirichlet 边值问题的一个 **弱解**，称相应的变分问题为该方程的 **变分形式** 或 **弱形式**，并分别称 $u$ 所属的空间 $\mathbb{V}(\bar{u}_0;\Omega)$ 和 $v$ 所属的空间 $\mathbb{H}_0^1(\Omega)$ 为 **试探函数空间** 和 **检验函数空间**。

弱解和古典解有如下关系：

!!! theorem "定理"
    
    设 $f\in C(\bar{\Omega})$，$\bar{u}_0\in C(\partial \Omega)$，若 $u\in C^2(\bar{\Omega})$ 是 Poisson 方程 Dirichlet 边值问题的古典解，则 $u$ 也是该问题的弱解。反之，若 $u$ 是该问题的弱解，且 $u\in \mathbb{H}^2(\Omega)$，则 $u$ 也是该问题的古典解。

!!! proof "证明"
    前半部分我们在弱解导出过程中已证明。后半部分，设 $u$ 是该问题的弱解，且 $u\in \mathbb{C}^2(\bar{\Omega})$，取检验函数 $v\in C_0^\infty(\Omega)$，则有

    $$
    \int_{\Omega} (\Delta u + f)v \mathrm{d}x = 0,\forall v\in C_0^\infty(\Omega)
    $$

    由于 $\Delta u + f$ 在 $\Omega$ 内连续，故

    $$
    -\Delta u = f, x\in \Omega
    $$

    再由迹的定义知 $u|_{\partial \Omega}=\bar{u}_0$，因此 $u$ 也是该问题的古典解。

注意到 $a(u,v)-(f,v)$ 是定义在 $\mathbb{H}^1(\Omega)$ 上的二次泛函

$$
J(v)=\frac{1}{2}a(v,v)-(f,v)
$$

的 Frechet 微分，于是我们也可以通过极小化该泛函来定义变分形式和弱解：

!!! definition "变分形式和弱解"
    
    若 $u\in \mathbb{V}(\bar{u}_0;\Omega)$ 为泛函 $J(\cdot)$ 在 $\mathbb{V}(\bar{u}_0;\Omega)$ 上的最小值点，即

    $$
    J(u) = \min_{v\in \mathbb{V}(\bar{u}_0;\Omega)} J(v)
    $$

    则称 $u$ 为 Poisson 方程 Dirichlet 边值问题的一个 **弱解**，称相应的极小化问题为该方程的 **变分形式** 或 **弱形式**。


!!! theorem "定理"
    
    两种定义的弱解是等价的。

!!! proof "证明"
    设 $u\in \mathbb{V}(\bar{u}_0;\Omega)$ 满足 $J(u) = \min_{v\in \mathbb{V}(\bar{u}_0;\Omega)} J(v)$，则有

    $$
    J'(u)v=0, \forall v\in \mathbb{H}_0^1(\Omega)
    $$

    由此以及 $J'(u)v=a(u,v)-(f,v)$ 可知 $u$ 满足变分方程

    $$
    a(u,v) = (f,v), \quad \forall v\in \mathbb{H}_0^1(\Omega)
    $$

    反之，设 $u\in \mathbb{V}(\bar{u}_0;\Omega)$ 满足变分方程

    $$ 
    a(u,v) = (f,v), \quad \forall v\in \mathbb{H}_0^1(\Omega)
    $$

    则对任意的 $v\in \mathbb{V}(\bar{u}_0;\Omega)$，有

    $$
    J(v)-J(u)=a(u,v-u)-(f,v-u)+\frac{1}{2}a(v-u,v-u)
    $$

    由于 $v-u\in \mathbb{H}_0^1(\Omega)$，由变分方程可知

    $$
    J(v)-J(u)=\frac{1}{2}a(v-u,v-u)\ge 0
    $$

    即 $J(u) = \min_{v\in \mathbb{V}(\bar{u}_0;\Omega)} J(v)$。

!!! theorem "存在唯一性定理"
    
    设 $\Omega$ 是有界连通区域，且其边界 $\partial \Omega$ 是 Lipschitz 连续的曲面，$f\in \mathbb{L}^2(\Omega)$，且存在 $\bar{u}_0\in \mathbb{H}^1(\Omega)$，使得 $\bar{u}_0|_{\partial \Omega} = \bar{u}_0$，则 Poisson 方程 Dirichlet 边值问题存在唯一弱解 $u\in \mathbb{V}(\bar{u}_0;\Omega)$。

下面我们考虑 Poisson 方程的 Neumann 边值问题：

$$
\begin{cases}
    -\Delta u=f ,&x\in \Omega\\
    \frac{\partial u}{\partial \nu}=g,&x\in \partial \Omega
\end{cases}
$$

设其有古典解 $u\in C^2(\bar{\Omega})$，任取函数 $v\in C^\infty(\bar{\Omega})$，推导如上。需要注意的是，此时 $v$ 在 $\partial \Omega$ 上不必为零，因此有

$$
a(u,v)=(f,v)+(g,v)_{\partial \Omega}
$$

其中 $a(\cdot,\cdot)$ 和 $(\cdot,\cdot)$ 的定义如上，$(\cdot,\cdot)_{\partial \Omega}$ 为 $\mathbb{L}^2(\partial \Omega)$ 上的内积，即：

$$
(g,v)_{\partial \Omega} = \int_{\partial \Omega} g v \mathrm{d}s
$$

!!! definition "弱解"
    
    若 $u\in \mathbb{H}^1(\Omega)$ 满足变分方程：

    $$
    a(u,v)=(f,v)+(g,v)_{\partial \Omega}, \quad \forall v\in \mathbb{H}^1(\Omega)
    $$

    则称 $u$ 为 Poisson 方程 Neumann 边值问题的一个 **弱解**，称相应的变分问题为该方程的 **变分形式** 或 **弱形式**，这里试探函数空间和检验函数空间均为 $\mathbb{H}^1(\Omega)$。

!!! theorem "定理"
    
    设 $f\in C(\bar{\Omega})$，$g\in C(\partial \Omega)$，若 $u\in C^2(\bar{\Omega})$ 是 Poisson 方程 Neumann 边值问题的古典解，则 $u$ 也是该问题的弱解。反之，若 $u$ 是该问题的弱解，且 $u\in \mathbb{C}^2(\Omega)$，则 $u$ 也是该问题的古典解。

下面我们考虑解的存在唯一性。注意到带入 $v=1$ 可得 

$$
\int_{\Omega} f \mathrm{d}x + \int_{\partial \Omega} g \mathrm{d}s=0
$$

因此解的存在唯一性的必要条件是上式成立。事实上，若该条件成立，则弱解存在，且若 $u$ 是一个弱解，则对任意常数 $c$，$u+c$ 也是一个弱解。为了避免这种不唯一性，我们考虑 $\mathbb{H}^1(\Omega)$ 的一个子空间：

$$
\mathbb{V}_0=\left\{u\in \mathbb{H}^1(\Omega): \int_{\Omega} u \mathrm{d}x =0 \right\}
$$

上求解方程。

!!! theorem "Poincare-Friedrichs 不等式"
    
    设 $\Omega$ 有界连通且具有 Lipschitz 连续边界，则存在常数 $\gamma_1\ge \gamma_0>0$，使得

    $$
    \gamma_0 \|u\|_{1,2,\Omega} \le \left|\int_\Omega u \mathrm{d}x \right| + |u|_{1,2,\Omega} \le \gamma_1 \|u\|_{1,2,\Omega}, \forall u\in \mathbb{H}^1(\Omega)
    $$

!!! theorem "存在唯一性定理"

    设 $\Omega$ 是有界连通区域，且其边界 $\partial \Omega$ 是 Lipschitz 连续的曲面，$f\in \mathbb{L}^2(\Omega)$，$g\in \mathbb{L}^2(\partial \Omega)$，且满足

    $$
    \int_{\Omega} f \mathrm{d}x + \int_{\partial \Omega} g \mathrm{d}s=0
    $$

    $F:\mathbb{V}_0\rightarrow \mathbb{R}$ 定义为

    $$
    F(v)=(f,v)+(g,v)_{\partial \Omega}
    $$

    则 Poisson 方程 Neumann 边值问题存在唯一弱解 $u\in \mathbb{V}_0$。

## 2.椭圆边值问题的有限元方法

### 2.1 Galerkin 方法和 Ritz 方法

我们来讨论如何数值求解椭圆边值问题的弱解，本节中我们始终假设 $\Omega$ 是有界连通区域，且其边界 $\partial \Omega$ 是 Lipschitz 连续的曲面。

以 Poisson 方程的齐次 Dirichlet 边值问题为例：

$$
\begin{cases}
    -\Delta u=f ,&x\in \Omega\\
    u=0,&x\in \partial \Omega
\end{cases}
$$

该问题对应的虚功原理的弱解为：

$$
\text{求 }u\in \mathbb{H}_0^1(\Omega),\quad \text{使得 } a(u,v) = (f,v), \forall v\in \mathbb{H}_0^1(\Omega)
$$

其中 $a(u,v)=\int_{\Omega} \nabla u \cdot \nabla v \mathrm{d}x,(f,v)=\int_{\Omega} f v \mathrm{d}x$。

对应的最小势能的弱解为：

$$
\text{求 }u\in \mathbb{H}_0^1(\Omega),\quad \text{使得 } J(u) = \min_{v\in \mathbb{H}_0^1(\Omega)} J(v)
$$

其中 $J(v)=\frac{1}{2}a(v,v)-(f,v)$。

为了数值求解该问题，我们引入有限维子空间 $\mathbb{V}_h(0)\subset \mathbb{H}_0^1(\Omega)$，其中 $h$ 是与子空间维数相关的参数，就给出了该问题相应的近似解法：

$$
\text{求 }u_h\in \mathbb{V}_h(0),\quad \text{使得 } a(u_h,v_h) = (f,v_h), \forall v_h\in \mathbb{V}_h(0)
$$

和 

$$
\text{求 }u_h\in \mathbb{V}_h(0),\quad \text{使得 } J(u_h) = \min_{v_h\in \mathbb{V}_h(0)} J(v_h)
$$

分别称为 **Galerkin 方法** 和 **Ritz 方法**。不难证明这两种方法的等价性和解的存在唯一性。这两个问题可以化为线性代数的方程组求解。

设 $\left\{\varphi_i\right\}_{i=1}^{N}$ 是 $\mathbb{V}_h(0)$ 的一组基，令

$$
u_h=\sum_{j=1}^{N_h} u_j \varphi_j,v_h=\sum_{i=1}^{N_h} v_i \varphi_i
$$

则 Galerkin 方法可写为

$$
\text{求 }u_h=(u_1,\cdots,u_{N_h})^T\in \mathbb{R}^{N_h} ,\quad \text{使得 } \sum_{i,j=1}^{N_h} a(\varphi_j,\varphi_i) u_j v_i = \sum_{i=1}^{N_h} (f,\varphi_i) v_i, \forall v_h=(v_1,\cdots,v_{N_h})^T\in \mathbb{R}^{N_h}
$$

由于 $v_i$ 的任意性，这等价于求解线性方程组

$$
\sum_{j=1}^{N_h} a(\varphi_j,\varphi_i) u_j = (f,\varphi_i), \quad i=1,2,\cdots,N_h
$$

通常将其写成

$$
K u_h = f
$$

根据其力学背景，称 $K=(k_{ij})=(a(\varphi_j,\varphi_i))$ 为 **刚度矩阵**，$u_h$ 为 **位移向量**，$f=(f_i) = ((f,\varphi_i))$ 为 **载荷向量**。容易证明刚度矩阵 $K$ 是对称正定矩阵，因此该线性方程组存在唯一解。

利用 Galerkin 方法或 Ritz 方法求解椭圆边值问题的关键在于如何选择合适的有限维子空间 $\mathbb{V}_h(0)$。有限元方法提供了一种系统的构造方法，下面我们介绍有限元方法的基本思想。

### 2.2 有限元方法

先看一个简单的例子。考虑定义在多边形区域 $\Omega\subset \mathbb{R}^2$ 上的 Poisson 方程的齐次 Dirichlet 边值问题的变分形式

$$
\text{求 }u\in \mathbb{H}_0^1(\Omega),\quad \text{使得 } a(u,v) = (f,v), \forall v\in \mathbb{H}_0^1(\Omega)
$$

对于多边形区域 $\Omega$，我们通过下述方法构造 $\mathbb{H}^1(\Omega)$ 和 $\mathbb{H}_0^1(\Omega)$ 的子空间。

首先将 $\bar{\Omega}$ 做三角剖分 $\mathfrak{T}_h(\Omega)$，即将其分割为有限个互相之间没有公共内点的三角形 $T_i$，并作编号 $i=1,2,\cdots,M$ 称之为 **单元**，其中 $h=\max_{1\le i \le M} \sup_{x,y\in T_i} |x-y|$ 为剖分中所有单元的最大直径。要求每个单元的顶点（称为 **节点**）只能是其相邻单元的顶点。将所有剖分的节点作整体编号 $A_i,i=1,2,\cdots,N$，并定义如下的空间：

$$
\mathbb{V}_h=\left\{u\in C(\bar{\Omega}): u|_{T_i} \in \mathbb{P}_1(T_i), \forall T_i\in \mathfrak{T}_h(\Omega) \right\}
$$

并根据齐次强制要求边界条件取有限元试探函数空间和检验函数空间为

$$
\mathbb{V}_h(0)=\left\{u\in \mathbb{V}_h:u(A_i)=0,\forall A_i \in \partial \Omega \right\}
$$

其中 $\mathbb{P}_k(T_i)$ 为定义在单元 $T_i$ 上所有次数不超过 $k$ 的多项式构成的空间。容易验证 $\mathbb{V}_h\subset \mathbb{H}^1(\Omega)$，$\mathbb{V}_h(0)\subset \mathbb{H}_0^1(\Omega)$。显然 $\mathbb{V}_h$ 和 $\mathbb{V}_h(0)$ 中的任意函数都由其节点处函数值 $\left\{u(A_i)\right\}$ 唯一确定。这样一来，其基底的选择就是十分自然的了：

$$
\varphi_i(A_j) = \delta_{ij}, \quad i,j=1,2,\cdots,N
$$

即 $\varphi_i$ 在节点 $A_i$ 处取值为 $1$，在其他节点处取值为 $0$，在每个单元上为其插值多项式，则 $\left\{\varphi_i\right\}_{i=1}^{N}$ 构成 $\mathbb{V}_h$ 的基底，$\left\{\varphi_i\right\}_{A_i\notin \partial \Omega}$ 构成 $\mathbb{V}_h(0)$ 的基底。

这样的基底有个突出的性质，即每个基底函数的支集都很小，实际上每个基底函数 $\varphi_i$ 仅在与节点 $A_i$ 相邻的单元上非零，这样就大大减少了刚度矩阵 $K$ 中非零元的个数，使得 $K$ 成为一个稀疏矩阵，从而节省了存储空间和计算时间。

建立了 $\mathbb{V}_h(0)$ 之后，我们就可以计算 $K$ 和 $f$ 了。为了方便数据管理，我们通常引入如下两个数组：

* 取值为整体节点序数的 $en(\alpha,e)$，其中 $e$ 为单元序数，$\alpha$ 为单元的局部节点序数，即第 $e$ 个单元的第 $\alpha$ 个节点在整体节点中的序数为 $en(\alpha,e)$；
* 取值为空间坐标的 $cd(i,nd)$，其中 $nd$ 为整体节点序数，$cd(i,nd)$ 表示第 $nd$ 个节点的空间坐标的第 $i$ 个分量。
  
记 $a^e(u,v)=\int_{T_e} \nabla u \cdot \nabla v \mathrm{d}x$，由定义有

$$
k_{ij}=a(\varphi_j,\varphi_i) = \sum_{e=1}^{M} a^e(\varphi_j,\varphi_i)= \sum_{e=1}^{M} \int_{T_e} \nabla \varphi_j \cdot \nabla \varphi_i \mathrm{d}x= \sum_{e=1}^{M} k_{ij}^e
$$

由于有大量 $k_{ij}$ 为零，故我们通常不遍历 $i,j$ 而选择遍历单元的方式计算。设 $\alpha=1,2,3$ 是单元 $T_e$ 的三个节点 $A_i,A_j,A_k$ 的局部节点序数，即在单元 $T_e$ 上这三个节点分别记作 $A_1^e,A_2^e,A_3^e$，又 $\lambda_\alpha^e\in \mathbb{P}_1(T_e)$ 满足 $\lambda_\alpha^e(A_\beta^e)=\delta_{\alpha\beta}$，则有

$$
\lambda_\alpha^e(A)=\frac{|\nabla AA_\beta^eA_\gamma^e|}{|\nabla A_\alpha^eA_\beta^eA_\gamma^e|}, \forall A\in T_e
$$

这里 $|T|$ 表示 $T$ 的面积。通常称 $\lambda^e(A)=(\lambda_1^e(A),\lambda_2^e(A),\lambda_3^e(A))$ 为单元 $T_e$ 上的 **重心坐标**。显然有 $\varphi_{en(\alpha,e)}|_{T_e}=\lambda_\alpha^e$ 且 $\left\{\lambda_\alpha^e\right\}_{\alpha=1}^3$ 构成 $\mathbb{P}_1(T_e)$ 的基底。对于每一个单元 $T_e$ 定义 **单元刚度矩阵**

$$
K^e=(k_{\alpha\beta}^e), \quad k_{\alpha\beta}^e = a^e(\lambda_\beta^e,\lambda_\alpha^e) = \int_{T_e} \nabla \lambda_\beta^e \cdot \nabla \lambda_\alpha^e \mathrm{d}x
$$

则有 

$$
k_{ij}=\sum_{en(\alpha,e)=i \in T_e\atop en(\beta,e)=j\in T_e} k_{\alpha\beta}^e
$$

同理可以通过遍历单元计算载荷向量 $f=(f_i)$：

$$
f_i = \sum_{en(\alpha,e)=i \in T_e} \int_{T_e} f \lambda_\alpha^e \mathrm{d}x := \sum_{en(\alpha,e)=i \in T_e} f_\alpha^e
$$

我们称 $f^e=(f_\alpha^e)$ 为 **单元载荷向量**。

对于边界条件为

$$
u(x)=u_0(x), \quad x\in \partial \Omega
$$

的 Poisson 方程 Dirichlet 边值问题，我们只需将有限元试探函数空间 $\mathbb{V}_h(0)$ 改为

$$
\mathbb{V}_h(u_0)=\left\{u\in \mathbb{V}_h:u(A_i)=u_0(A_i),\forall A_i \in \partial \Omega \right\}
$$

下面我们介绍有限元的一般定义。有限元方法的关键是构造适当的有限元空间。对于有限元空间的构造有如下三个基本要求：

* 对区域 $\bar{\Omega}$ 作有限元剖分 $\mathfrak{T}_h$，即将区域 $\bar{\Omega}$ 分为有限个称为有限元的子集 $K$ 使其满足：
    * $\bar{\Omega}=\bigcup_{K\in \mathfrak{T}_h} K$；
    * 每个有限元 $K\in \mathfrak{T}_h$ 都是内点集 $K^\circ$ 非空的闭集；
    * 对于两个不同的有限元 $K_1,K_2\in \mathfrak{T}_h$，有 $K_1^\circ \cap K_2^\circ = \emptyset$；
    * 每个有限元 $K\in \mathfrak{T}_h$ 都是 Lipschitz 连续的曲面边界的区域。
* 在每个有限元 $K\in \mathfrak{T}_h$ 上定义一个由多项式或其他一些具有一定逼近性质又便于分析和计算的函数组成的函数空间 $P_K$；
* 有限元函数空间 $\mathbb{V}_h$ 有一组容易得到且具有局部支集性质的基底。


!!! definition "有限元"

    一个三元组 $(K,P_K,\Sigma_K)$ 称为一个 **有限元**，若：

    * $K\subset \mathbb{R}^n$ 是一个有非空内部和 Lipschitz 连续边界的闭集，称为 **单元**；
    * $P_K$ 是一个由定义在单元 $K$ 上的充分光滑实函数组成的有限维函数空间；
    * $\Sigma_K$ 是一组定义在 $C^\infty(K)$ 上的线性泛函 $\left\{\varphi_i\right\}_{i=1}^{N}$，称之为有限元的 **自由度集**，并称 $\varphi_i$ 为 **自由度**，它们构成了 $P_K$ 的一组对偶集，且恰好定义了 $P_K$ 上的一组规范化基底，即存在 $P_K$ 上唯一的一组基 $\left\{p_i\right\}_{i=1}^{N}$，使得 $\varphi_i(p_j)=\delta_{ij}$。

!!! definition "插值"

    设 $(K,P_K,\Sigma_K)$ 是给定的有限元，$\left\{\varphi_i\right\}$ 是其自由度集，$p_i\in P_K$ 是相应的一组对偶基，即 $\varphi_i(p_j)=\delta_{ij}$。定义算子

    $$
    \Pi_K: C^\infty(K) \to P_K, \quad \Pi_K v = \sum_{i=1}^{N} \varphi_i(v) p_i
    $$

    称 $\Pi_K$ 为该有限元的 **插值算子**，称 $\Pi_K(v)$ 为 $v$ 的 $P_K$ **插值函数**。

!!! definition "等价"
    设两个有限元 $(K,P_K,\Sigma_K)$ 和 $(L,P_L,\Sigma_L)$，若

    $$
    K=L,P_K=P_L,\Sigma_K=\Sigma_L
    $$

    则称两个有限元是 **等价的**。

对于区域 $\Omega$ 上的有限元剖分 $\mathfrak{T}_h$ 和给定的有限元 $\left\{(K,P_K,\Sigma_K)\right\}$，令 $\mathbb{V}_h=\left\{v:\bigcup_{K\in \mathfrak{T}_h} K\to \mathbb{R} : v|_K\in P_K\right\}$。为了使 $\mathbb{V}_h$ 是一个有限元函数空间，我们还希望相邻的有限元函数空间 $P_K$ 和自由度集 $\Sigma_K$ 之间满足一定的相容性关系。令 $\Sigma_h=\bigcup_{K\in \mathfrak{T}_h} \Sigma_K$ 称之为 $\mathbb{V}_h$ 的**自由度集**。

!!! definition "插值"
    定义算子

    $$
    \Pi_h: C^\infty(\bar{\Omega}) \to \mathbb{V}_h, \quad \Pi_h (v)_K = \Pi_K (v|_K), \forall v\in C^\infty(\bar{\Omega})
    $$

    称 $\Pi_h$ 为 $\mathbb{V}_h$ 的 **插值算子**，称 $\Pi_h(v)$ 为 $v$ 在 $\mathbb{V}_h$ 中的 **插值函数**。

!!! definition "等价"
    设 $\hat{K},K\in \mathbb{R}^n$，$(\hat{K},\hat{P},\hat{\Sigma})$ 和 $(K,P_K,\Sigma_K)$ 分别是两个有限元，若存在充分光滑的可逆映射 $F_K:\hat{K}\to K$，使得

    $$
    \begin{cases}
        F_K(\hat{K})=K\\
        p_i=\hat{p}_i \circ F_K^{-1}, \forall i=1,\cdots,N\\
        \varphi_i(p) = \hat{\varphi}_i (p\circ F_K), \forall p\in P_K, i=1,\cdots,N
    \end{cases}
    $$

    其中 $\left\{\hat{\varphi}_i\right\}_{i=1}^N$ 和 $\left\{\varphi_i\right\}_{i=1}^N$ 分别是自由度集 $\hat{\Sigma}$ 和 $\Sigma_K$，$\left\{\hat{p}_i\right\}_{i=1}^N$ 和 $\left\{p_i\right\}_{i=1}^N$ 分别是 $\hat{P}$ 和 $P_K$ 上的对偶基，则称两个有限元是 **等参等价** 的，特别的，当 $F_K$ 是仿射变换时，称两个有限元是 **仿射等价** 的。如果一族有限元都是彼此等参(仿射)等价的，则称他们是一个 **等参(仿射)族**。


我们来看一些常用的有限元的例子。最简单的一类是 $n$ 单纯形 Lagrange 有限元。此时 $K\subset \mathbb{R}^n$ 是一个 $n$ 维单纯形，它有 $n+1$ 个部落在同一个超平面上的顶点 $a_j=(a_{ij})_{i=1}^n\in \mathbb{R}^n(k=1,\cdots,n+1)$，即矩阵

$$
A=\begin{pmatrix}
    a_{11} & a_{12} & \cdots & a_{1,n+1}\\
    a_{21} & a_{22} & \cdots & a_{2,n+1}\\
    \vdots & \vdots & \ddots & \vdots\\
    a_{n1} & a_{n2} & \cdots & a_{n,n+1}\\
    1 & 1 & \cdots & 1
\end{pmatrix}
$$

是非奇异的，单元 $K$ 是这些顶点的凸包，即

$$
K=\left\{x=\sum_{i=1}^{n+1} \lambda_i a_i : \lambda_i \ge 0, \sum_{i=1}^{n+1} \lambda_i =1 \right\}
$$

设 $\lambda=(\lambda_1,\lambda_2,\cdots,\lambda_{n+1})^T,x=(x_1,x_2,\cdots,x_n,1)^T$，则有

$$
A\lambda=x \Rightarrow \lambda = A^{-1} x
$$

$\lambda(x)=(\lambda_1(x),\lambda_2(x),\cdots,\lambda_{n+1}(x))^T$ 称为单元 $K$ 上的 **重心坐标**。显然 $\lambda_i \in \mathbb{P}_1(K)$，且 $\lambda_i(a_j)=\delta_{ij}$。

!!! theorem "Lagrange 有限元"
    
    令

    $$
    K_0^n=\left\{\frac{1}{n+1}\sum_{i=1}^{n+1} a_i \right\}
    $$

    $$
    K_k^n=\left\{x=\sum_{i=1}^{n+1} \lambda_i a_i : \lambda_i \ge 0, \sum_{i=1}^{n+1} \lambda_i =1, \lambda_i\in\left\{0,\frac{1}{k},\frac{2}{k},\cdots,1\right\} \right\}
    $$

    则自由度集 $\Sigma_k^n=\left\{p(x):x\in K_k^n\right\}$ 构成了 $\mathbb{P}_k(K^n)$ 的一组对偶基。

另一类最基本的有限元是正 $2n$ 面体 Lagrange 有限元。此时单元 $K=[X_{11},X_{12}]\times [X_{21},X_{22}]\times \cdots \times [X_{n1},X_{n2}]\subset \mathbb{R}^n$ 是一个正 $2n$ 面体，$P_K$ 取为 $n$ 个变量 $x_1,\cdots,x_n$ 的所有关于每个变量的次数不超过 $k$ 的多项式的集合 $\mathbb{Q}_k(K)$，即

$$
\mathbb{Q}_k(K)=\left\{p(x):p(x)=\sum_{0\le \alpha_i \le k} p_{\alpha_1\cdots \alpha_n} x_1^{\alpha_1} x_2^{\alpha_2} \cdots x_n^{\alpha_n} \right\}
$$

显然 $\dim \mathbb{Q}_k(K) = (k+1)^n$。定义 $h_i=X_{i2}-X_{i1}$，令

$$
\bar{K}_k^n=\left\{x=\left(X_11+\frac{i_1}{k}h_1,\cdots,X_{n1}+\frac{i_n}{k}h_n\right)^T\in \mathbb{R}^n: i_j\in \left\{0,1,\cdots,k\right\}, 1\le j\le n  \right\}
$$

称之为正 $2n$ 面体 $K$ 的 $k$ 阶主格点。

对于给定的椭圆型方程边值问题，选定了适当的变分形式和有限元空间后，就可以直接得到问题相应的有限元解的方法。除了直接的求解，我们依然可以使用前文中介绍的多重网格迭代方法。

## 3.误差分析

### 3.1 Céa 引理与抽象误差估计

误差分析的标准做法是，将问题转化为函数逼近论的问题，然后利用插值误差估计来得到有限元解的误差估计。

我们考虑变分问题

$$
    \text{求 }u\in V,\text{使得 } a(u,v) = F(v), \forall v\in V
$$

!!! theorem "Céa 引理"
    
    设 $V$ 是一个 Hilbert 空间，$\mathbb{V}_h$ 是 $V$ 的一个有限维子空间，双线性泛函 $a(\cdot,\cdot)$ 和线性泛函 $f(\cdot)$ 满足 Lax-Milgram 定理的条件，$u\in \mathbb{V}$ 是上述问题的解，$u_h\in \mathbb{V}_h$ 满足方程

    $$
    a(u_h,v_h) = F(v_h), \forall v_h\in \mathbb{V}_h
    $$

    则存在与 $\mathbb{V}_h$ 无关的常数 $C>0$，使得

    $$
    \|u-u_h\|_V \le C \inf_{v_h\in \mathbb{V}_h} \|u-v_h\|_V
    $$

    其中 $\|\cdot\|_V$ 是 $V$ 上的范数。

!!! proposition "推论"
    在上述定理的假设下，若还有双线性泛函 $a(\cdot,\cdot)$ 为对称的，则解 $u_h$ 是 $u$ 在 $\mathbb{V}_h$ 上由 $a(\cdot,\cdot)$ 定义的正交投影，即 $u_h=P_hu$，其中 $P_h:V\to \mathbb{V}_h$ 是正交投影算子。这时在 $a(\cdot,\cdot)$ 诱导的范数意义下，$C=1$ 满足 Céa 引理。

### 3.2 Sobolev 空间插值理论

设变分问题的解 $u$ 充分光滑，则 $u$ 在有限元空间 $\mathbb{V}_h$ 上的插值 $\Pi_h u$ 有明确定义，于是由 Céa 引理可知

$$
\|u-u_h\|\le C \inf_{v_h\in \mathbb{V}_h} \|u-v_h\| \le C \|u-\Pi_h u\|
$$

因此我们可以通过 $u$ 在 $\mathbb{V}_h$ 上的插值误差来估计有限元解的误差上界。