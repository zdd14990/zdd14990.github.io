---
date: 2025-11-25
---

# 第三章：双曲型方程的有限差分法

* 线性双曲型偏微分方程：输运方程、波动方程、特征线。
* 线性混合方程：对流扩散方程、拟线性双曲型方程。
* 双曲守恒律：通量、总变差减小、激波、Godunov 方法、ENO / WENO 格式、黎曼求解器。

## 1. 一阶线性双曲型方程

### 1.1 特征线 (Characteristic lines)

考虑一个向量值函数 $u(x,t):\mathbb{R}^{n}\times\mathbb{R}^{+}\rightarrow\mathbb{R}^{p}$ 满足

$$
\partial_{t}u+\sum A_{i}\partial_{x_{i}}u+Bu=\psi
$$

其中 $A_{i}$, $B\in\mathbb{R}^{p\times p}$，$\psi:\mathbb{R}^{n}\times\mathbb{R}^{+}\rightarrow\mathbb{R}^{p}$。

!!! definition "定义 0."
    如果对于任意 $\alpha=(\alpha_{1},\dots,\alpha_{p})\in\mathbb{R}^{p}\setminus\{0\}$，$A=\sum_{i=1}^{p}\alpha_{i}A_{i}$ 是实可对角化的，则称该 PDE 为双曲型的。
    
    此外，如果 $A$ 具有互异的实特征值，则称该 PDE 为严格双曲型的。

对于二阶方程

$$
\partial_{t}^{2}u+2\sum_{i=1}^{n}a_{i}\partial_{t}\partial_{x_{i}}u+b_{0}\partial_{t}u-\sum_{i,j=1}^{n}a_{ij}\partial_{x_{i}}\partial_{x_{j}}u+\sum_{i=1}^{n}b_{i}\partial_{x_{i}}u+cu=\psi.
$$

令 $V=u$，$V_{0}=\partial_{t}u$，$V_{i}=\partial_{x_{i}}u$ ($i=1,\dots,n$)，则

$$
\begin{cases}
\partial_{t}V-V_{0}=0\\\\
\partial_{t}V_{0}+2\sum_{i=1}^{n}a_{i}\partial_{x_{i}}V_{0}-\sum_{i,j=1}^{n}a_{ij}\partial_{x_{j}}V_{i}+\sum_{i=1}^{n}b_{i}V_{i}+cV=\psi,\\\\
\partial_{t}V_{j}-\partial_{x_{j}}V_{0}=0.
\end{cases}
$$

我们考虑一维一阶线性双曲型方程

$$
u:\mathbb{R}\times\mathbb{R}^{+}\rightarrow\mathbb{R}^{p}, \quad u_{t}+Au_{x}=0
$$

其中 $A=R\Lambda R^{-1}$，$\Lambda=\text{diag}(\lambda_{1},\dots,\lambda_{p})$，$\lambda_{1}\le\dots\le\lambda_{p}$。令 $w=R^{-1}u$，则

$$
w_{t}+\Lambda w_{x}=0 \Rightarrow \partial_{t}w_{i}+\lambda_{i}\partial_{x_{i}}w_{i}=0.
$$

其特征线为 $\frac{dx_{i}}{\lambda_{i}}=dt \Rightarrow x_{i}=\lambda_{i}t+C$。我们可以发现

$$
\frac{d}{dt}w_{i}(x_{i}(t), t) = \partial_{t}w_{i}(x(t), t) + \partial_{x}w_{i}(x(t), t) x'(t) = 0.
$$

所以 $w_{i}(x_{i}(t),t)$ 是常数。因此对于任意 $x, t$，有 $w_{i}(x,t)=w_{i}(x-\lambda_{i}t,0)$。假设 $R=(\xi^{1},\dots,\xi^{p})$，$R^{-1}=(\eta^{1},\dots,\eta^{p})^T$，则 $w_{i}=\eta^{i}u$。我们称 $w_{i}$ 为特征 $(\lambda_{i},\xi^{i})$ 的黎曼不变量 (Riemann invariant)。那么

$$
u(x,t)=Rw(x,t)=\sum\xi^{i}w_{i}(x,t)=\sum\xi^{i}w_{i}(x-\lambda_{i}t,0)=\sum_{i=1}^{p}\xi^{i}\eta^{i}u_{0}(x-\lambda_{i}t).
$$

!!! definition "定义 1."
    对于区域 $\Omega\subseteq\mathbb{R}\times\mathbb{R}^{+}$，其**依赖域 (dependence domain)** 定义为

    $$
    D(\Omega):=\{y\in\mathbb{R} \mid \exists\lambda_{i},(x,t)\in\Omega \text{ s.t. } y=x-\lambda_{i}t\};
    $$

    其**影响域 (influence domain)** 定义为

    $$
    I(\Omega)=\{(x,t)\in\mathbb{R}\times\mathbb{R}^{+} \mid \exists\lambda_{i},(x^{\prime},t^{\prime})\in\Omega, t \ge t' \text{ s.t. } x=x^{\prime}-\lambda_{i}(t-t^{\prime})\};
    $$

    其**决定域 (decision domain)** 定义为

    $$
    K(\Omega) = \{(x, t) \in \mathbb{R} \times \mathbb{R}^{+} \mid \forall \lambda_i, (x', t') \in \Omega, t' \le t \text{ s.t. } x=x'-\lambda_i(t-t')\}.
    $$

    这里 $R^{-1}=(\eta^{1}, \dots, \eta^{p})^T$。

!!! example "例 1."

    1.  $\Omega=\{(x_{0},t_{0})\}$，$\lambda_{1}=1$，$\lambda_{2}=-1$。则 $D(\Omega)=\{x_{0}-t_{0},x_{0}+t_{0}\}$，$I(\Omega) = \{(x, t) \mid x = x_0 \pm(t-t_0), t \ge t_0\}$，$K(\Omega)=\Omega$。
    2.  $\Omega=[0,1]\times[0,1]$，$\lambda_{1}=1$，$\lambda_{2}=-1$。则 $D(\Omega)=[-1,2]$。
    3.  $\Omega=\{(x_{1},0),(x_{2},0)\}$，$\lambda=\pm1$。$K(\Omega)=\{(\frac{x_{1}+x_{2}}{2},\frac{x_{2}-x_{1}}{2})\}$。
    4.  $\Omega=[0,1]\times\{0\}$，$K(\Omega)=\{(x,t) \mid 0\le t\le\frac{1}{2}, t\le x\le1-t\}$。

### 1.2 输运方程的有限差分法 (FDM for transport equation)

考虑输运方程的初边值问题

$$
\begin{cases}
u_{t}+au_{x}=0,\\
u(x,0)=u_{0}(x), x\in[x_{L},x_{R}],\\
u(x_{L},t)=u_{L}(t), t>0.
\end{cases}
$$

当 $x-at\ge x_{L}$ 时，$u(x,t)=u(x-at,0)$；当 $x-at<x_{L}$ 时，$u(x,t)=u_{L}(t-\frac{x-x_{L}}{a})$。

令 $\tau=\Delta t$，$h=\frac{x_{R}-x_{L}}{N+1}$，$U_{j}^{m}\approx u(x_{j},t_{m})$，$x_{j}=x_{L}+jh$，$t_{m}=m\tau$，我们有以下三种简单的格式：($\mu=\frac{a\tau}{h}$)

* (backward/后向) $\frac{U_{j}^{m+1}-U_{j}^{m}}{\tau}+a\frac{U_{j}^{m}-U_{j-1}^{m}}{h}=0 \Rightarrow U_{j}^{m+1}=(1-\mu)U_{j}^{m}+\mu U_{j-1}^{m}$ (1)
* (forward/前向) $\frac{U_{j}^{m+1}-U_{j}^{m}}{\tau}+a\frac{U_{j+1}^{m}-U_{j}^{m}}{h}=0 \Rightarrow U_{j}^{m+1}=(1+\mu)U_{j}^{m}-\mu U_{j+1}^{m}$ (2)
* (central/中心) $\frac{U_{j}^{m+1}-U_{j}^{m}}{\tau}+a\frac{U_{j+1}^{m}-U_{j-1}^{m}}{2h}=0 \Rightarrow U_{j}^{m+1}=U_{j}^{m}+\frac{\mu}{2}(U_{j-1}^{m}-U_{j+1}^{m})$ (3)

**(1) $L^{\infty}$-稳定性**

通过凸组合，可以证明如果 $a>0$ 且 $0<\mu\le1$，则 (1) 是 $L^{\infty}$-稳定的，(2)(3) 是 $L^{\infty}$-不稳定的；
如果 $a<0$ 且 $-1\le\mu<0$，则 (2) 是 $L^{\infty}$-稳定的，(1)(3) 是 $L^{\infty}$-不稳定的。

**C.F.L. (Courant-Friedrichs-Lewy) 条件:** $D(U_{j}^{m})\subseteq D_{h}(U_{j}^{m})$

对于后向格式且 $a > 0$，数值依赖域为 $D_{h}(U_{j}^{m})=\{x_{j-m},x_{j-m+1},\dots,x_{j}\}$。
解析依赖域为 $D(U_{j}^{m})=\{x_{j}-at_{m}\}$。
为了使 $D_{h}(U_{j}^{m})\supseteq D(U_{j}^{m})$，我们需要 $x_{j-m}\le x_{j}-at_{m} \Rightarrow \mu\le1$。

!!! remark "注 1."
    1.  CFL 条件是 $L^{\infty}$-稳定性的必要条件。
        如果存在某个 $Q\in D(P)$ 但 $Q\notin D_{h}(P)$，则在 $Q$ 处改变初值会改变解析解，但不会改变数值解。所以数值解无法逼近解析解。

    2.  CFL 条件不是充分条件。例如，中心格式满足 CFL 条件，但是是不稳定的。

**(2) $L^{2}$-稳定性**

令 $U_{j}^{m}=\lambda_{k}^{m}e^{ik\pi jh}$。
在 (1) 中，$\lambda_{k}=1-\mu(1-e^{ik\pi h})$。当 $0<\mu\le1$ 时 $|\lambda_k| \le 1$，(1) 是稳定的；
在 (2) 中，$\lambda_{k}=1+\mu(1-e^{ik\pi h})$。当 $-1\le\mu<0$ 时，$|\lambda_{k}|\le1$。
在 (3) 中，$\lambda_{k}=1-i\mu \sin k\pi h$，(3) 是不稳定的。

接下来我们学习一些针对输运方程的常用格式。

**(i) 迎风格式 (Upwind scheme):**

（这里我们可以将 $a$ 改为某个函数 $a(x,t)$ 且 $\mu_{j}^{m}=\frac{a(x_{j},t_{m})\tau}{h}$）

$$
U_{j}^{m+1}=\begin{cases}
U_{j}^{m}-\mu_{j}^{m}(U_{j}^{m}-U_{j-1}^{m}), & a(x_{j},t_{m})\ge0\\
U_{j}^{m}-\mu_{j}^{m}(U_{j+1}^{m}-U_{j}^{m}), & a(x_{j},t_{m})\le0
\end{cases}
$$

$$
=U_{j}^{m}-\frac{1}{2}(u_{j}^{m}+|u_{j}^{m}|)(U_{j}^{m}-U_{j-1}^{m})-\frac{1}{2}(u_{j}^{m}-|u_{j}^{m}|)(U_{j+1}^{m}-U_{j}^{m})
$$

$$
=U_{j}^{m}-\frac{1}{2}u_{j}^{m}(U_{j+1}^{m}-U_{j-1}^{m})+\frac{1}{2}|u_{j}^{m}|(U_{j+1}^{m}-2U_{j}^{m}+U_{j-1}^{m}).
$$

**(ii) Lax-Friedrichs 格式**

$$
\frac{U_{j}^{m+1}-\frac{1}{2}(U_{j+1}^{m}+U_{j-1}^{m})}{\tau}+a_{j}^{m}\frac{U_{j+1}^{m}-U_{j-1}^{m}}{h}=0
$$

$$
\Rightarrow U_{j}^{m+1}=U_{j}^{m}-\mu_{j}^{m}(U_{j+1}^{m}-U_{j-1}^{m})+\frac{1}{2}(U_{j+1}^{m}-2U_{j}^{m}+U_{j-1}^{m}).
$$

局部截断误差 $T=O(\tau+h^{2}+\frac{h^{2}}{\tau})$。所以它是条件相容的。

!!! definition "TVD (总变差减小) 性质"
    $TV(U^{m+1})\le TV(U^{m})$，其中 $TV(U^{m})=\sum_{j=0}^{N-1}|U_{j+1}^{m}-U_{j}^{m}|\approx\int|\frac{\partial u}{\partial x}|dx$ 是离散总变差。
    
    该性质等价于单调格式或极值点数非增。

可以证明迎风格式和 LF 格式满足 TVD 性质。所以它们是 $L^{2}$-稳定的（或 $L^{1}$-稳定的）。

!!! theorem "Godnov 定理"
    任何单调（或 TVD）线性格式至多是一阶精度的。

**(iii) Lax-Wendroff 格式**

通过泰勒公式，我们有

$$
\frac{U_{j}^{m+1}-U_{j}^{m}}{\tau}+a\frac{U_{j}^{m}-U_{j-1}^{m}}{h}=-\frac{1}{2}[ahu_{xx}-\tau u_{tt}]_{j}^{m}+O(\tau^{2}+h^{2})
$$

$$
=-\frac{1}{2}[ahu_{xx}-\tau a^{2}u_{xx}]_{j}^{m}+O(\tau^{2}+h^{2})
$$

$$
=-\frac{1}{2}ah(1-\mu)[u_{xx}]_{j}^{m}+O(\tau^{2}+h^{2}).\quad (4)
$$

如果我们令 $[u_{xx}]_{j}^{m}\approx\frac{\delta_{x}^{2}U_{j}^{m}}{h^{2}}$，则得到 Lax-Wendroff 格式：

$$
U_{j}^{m+1}=-\frac{1}{2}\mu(1-\mu)U_{j+1}^{m}+(1-\mu^{2})U_{j}^{m}+\frac{1}{2}\mu(1+\mu)U_{j-1}^{m}
$$

$$
=U_{j}^{m}-\frac{1}{2}\mu(U_{j+1}^{m}-U_{j-1}^{m})+\frac{1}{2}\mu^{2}(U_{j+1}^{m}-2U_{j}^{m}+U_{j-1}^{m}). 
$$

局部截断误差为 $T=O(\tau^{2}+h^{2})$。我们有 $\lambda_{k}=1-2\mu^{2}\sin^{2}\frac{kh}{2}-i\mu \sin kh$，所以 $|\mu|\le1$ 是其 $L^{2}$ 稳定性的条件。并且它不具有 $L^{\infty}$-稳定性（会产生振荡）。

**(iv) Beam-Warming 格式**

如果我们令 $[u_{xx}]_{j}^{m}\approx\frac{\delta_{x}^{2}U_{j-1}^{m}}{h^{2}}$ 在 (4) 中，则得到 Beam-Warming 格式：

$$
U_{j}^{m+1}=\frac{1}{2}(1-\mu)(2-\mu)U_{j}^{m}+\mu(2-\mu)U_{j-1}^{m}-\frac{1}{2}\mu(1-\mu)U_{j-2}^{m}.
$$

局部截断误差也是 $T=O(\tau^{2}+h^{2})$。我们有 $\lambda_{k}=e^{-ikh}(1-2(1+\mu)^{2}\sin^{4}\frac{kh}{2}+i(1-\mu)\sin kh)$，所以 $a>0$ 且 $0\le\mu\le2$ 是其 $L^{2}$-稳定性的条件。并且它也不具有 $L^{\infty}$-稳定性（振荡）。

**(v) Leap-frog (蛙跳) 格式**

$$
\frac{U_{j}^{m+1}-U_{j}^{m-1}}{2\tau}+a\frac{U_{j+1}^{m}-U_{j-1}^{m}}{2h}=0
$$

$T=O(\tau^{2}+h^{2})$。
$\lambda_{k}=\pm\sqrt{1-\mu^{2}\sin^{2}kh}-i\mu \sin kh$。
$L^{2}$-稳定性: $|\mu|\le1$。

## 2. 数值耗散/色散 (修正方程分析)

我们考虑一种特殊的行波解

$$
u(x,t)=e^{i(kx-wt)}
$$

其中 $w(k)$ 是色散关系。例如，在 $u_{t}+au_{x}=0$ 中，$w(k)=ak$；在 $iu_{t}=-\frac{1}{2}u_{xx}$ (薛定谔方程) 中，$w(k)=\frac{1}{2}k^{2}$。

假设 $w=w_{0}+iw_{1}$，则

$$
e^{i(kx-wt)}=e^{w_{1}t}e^{ik(x-\frac{w_{0}}{k}t)}.
$$

我们定义位相位移为 $w_{0}$，角/相速度为 $c_{p}=\frac{w_{0}}{k}$。
回忆在 Von Neumann 分析中，$U^{(k)m}=\lambda_{k}^{m}e^{ikx}$。则

$$
\lambda_{k}e^{ikx}=e^{i(kx-wt)} \Rightarrow \lambda_{k}=e^{-iw\tau}=e^{w_{1}\tau}e^{-iw_{0}\tau}.
$$

我们有：

$$
w_{0}=-\frac{\arg(\lambda_{k})}{\tau}, \quad w_{1}=\frac{1}{\tau}\ln|\lambda_{k}|.
$$

所以这是高级傅里叶分析。对于给定的 $k_{0}$，令 $k$ 接近 $k_{0}$，$k=k_{0}+\Delta k, \Delta k\ll k_{0}$，则

$$
v_{0}(k)=w_{0}(k_{0})+w_{0}^{\prime}(k_{0})(k-k_{0})+O((k-k_{0})^{2})
$$

$$
\Rightarrow e^{i(kx-wt)}=e^{w_{1}t}e^{i(kx-w_{0}t)} \approx e^{w_{1}t}e^{ikx-it(w_{0}(k_{0})+w_{0}^{\prime}(k_{0})(k-k_{0}))} \approx e^{w_{1}t}e^{-iw_{0}(k_{0})t+iw_{0}^{\prime}(k_{0})k_{0}t}e^{ik(x-tw_{0}^{\prime}(k_{0}))}.
$$

项 $e^{ik(x-tw_{0}^{\prime}(k_{0})}$ 是唯一随 $k$ 变化的项。所以我们定义群速度为 $c_{g}=w_{0}^{\prime}(k)$。

然后我们对一些数值格式进行耗散和色散分析。

**(1) 迎风格式**

通过傅里叶分析，我们有

$$
\lambda_{k}=(1-|\mu|)+|\mu|e^{-i\text{sign}(a)kh}=1-|\mu|+|\mu|\cos kh-i\text{sign}(a)|\mu|\sin kh.
$$

**耗散分析:** $|\lambda_{k}|^{2}=1-4|\mu|(1-|\mu|)\sin^{2}\frac{kh}{2}$。
如果 $kh\ll1$，则
$|\lambda_{k}|\le1 \iff w_{1}\le0 \Rightarrow |\mu|\le1$。
$|\lambda_{k}|^{2}\approx1-|\mu|(1-|\mu|)k^{2}h^{2} \Rightarrow w_{1}=\frac{1}{\tau}\ln|\lambda_{k}|\approx-\frac{1}{2\tau}|\mu|(1-|\mu|)k^{2}h^{2}$。
所以单步耗散为 $e^{-w_{1}\tau}\approx1+O(k^{2}h^{2})$（$|\mu|=|\frac{a\tau}{h}|=O(1)$）。对于固定时间 $t_{max}$，我们需要 $\frac{t_{max}}{\tau}$ 步。所以长时间耗散为
$e^{-w_{1}t_{max}}=(e^{-w_1\tau})^{\frac{t_{max}}{\tau}} \approx (1+O(h^2))^{\frac{1}{h}} \approx 1+O(h)$。
对于高频，如果 $k$ 增加，则 $e^{-w_{1}\tau}$ 增加且 $|\lambda_{k}|$ 减小。缺点是解会被过度平滑。

**色散分析:**
对于 $a\ge0$。
$w_{0}\tau=-\arg(\lambda_{k})=-\arctan(\frac{\text{Im}(\lambda_{k})}{\text{Re}(\lambda_{k})})=\arctan(\frac{\text{sign}(a)|\mu|\sin kh}{1-|\mu|+|\mu|\cos kh})$
$\Rightarrow w_{0}=\text{sign}(a)\frac{1}{\tau}\arctan(\frac{|\mu|\sin kh}{1-|\mu|+|\mu|\cos kh})$。
所以

* 当 $|\mu|=1 \Rightarrow w_{0}=\frac{kh}{\tau}=ak$；
* 当 $|\mu|=\frac{1}{2} \Rightarrow w_{0}=\frac{1}{\tau}\cdot\frac{kh}{2}=ak$；
* 当 $|\mu|\ne1,\frac{1}{2} \Rightarrow w_{0}=ak(1-\frac{1}{6}(1-|\mu|)(1-2|\mu|)k^{2}h^{2}+o(k^{2}h^{2}))=ak(1-O(k^{2}h^{2}))$。

**(2) Lax-Wendroff**

通过傅里叶分析，我们有 $\lambda_{k}=1-2\mu^{2}\sin^{2}\frac{kh}{2}-i\mu \sin kh$。

**耗散分析:**
$|\lambda_{k}|^{2}=1-4\mu^{2}(1-\mu^{2})\sin^{4}\frac{kh}{2}$
$\Rightarrow |\lambda_{k}|\approx1-2\mu^{2}(1-\mu^{2})\sin^{4}\frac{kh}{2}$
$\Rightarrow w_{1}=\frac{1}{\tau}\ln|\lambda_{k}|\approx-\frac{2\mu^{2}}{\tau}(1-\mu^{2})\sin^{4}\frac{kh}{2}=-\frac{2\mu a}{h}(1-\mu^{2})\sin^{4}\frac{kh}{2}=O(k^{4}h^{3})$
$\Rightarrow e^{-w_{1}\tau}=1+O(k^{4}h^{4})$
对于长时间，$e^{-w_{1}t_{max}}=(e^{-w_{1}\tau})^{\frac{t_{max}}{\tau}}\approx1+\frac{t_{max}}{\tau}O(k^{4}h^{4})=1+O(h^{3})$。

**色散分析:**
$w_{0}=-\frac{1}{\tau}\arg(\lambda_{k})=-\frac{1}{\tau}\arctan(\frac{\mu \sin kh}{1-2\mu^{2}\sin^{2}\frac{kh}{2}}) \approx ak(1-\frac{1}{6}(1-\mu^{2})k^{2}h^{2}+o(k^{2}h^{2}))$。
由于 $1-\mu^{2}\ge0$，总是有 $w_{0}\le ak$（太小）。如果 $k$ 增加，则 $|w_{0}-ak|$ 增加，这是糟糕的。

**(3) Leap-frog**
我们有 $\lambda_{k}=\pm\sqrt{1-\mu^{2}\sin^{2}kh}-i\mu \sin kh$。
$-\frac{1}{\tau}\arg(\lambda_{k}^{\pm})=\pm ak(1-\frac{1}{6}(1-\mu^{2})k^{2}h^{2}+\dots)$。
故 $\lambda_{k}^{+}$ 是正确的因子。

**修正方程分析:**
所有数值格式都可以通过泰勒级数转化为无限项的常微分方程 (ODEs)，即

$$\tilde{u}_{t}=\sum_{m=0}^{\infty}a_{m}\partial_{x}^{m}\tilde{u}$$

令 $u=e^{i(kx-wt)}$，

$$-iw e^{i(kx-wt)}=\sum_{m=0}^{\infty}a_{m}(ik)^{m}e^{i(kx-wt)}$$

$$\Rightarrow -iw=w_{1}-iw_{0}=\sum_{m=0}^{\infty}a_{m}(ik)^{m}$$

$$\Rightarrow w_{1}=\sum_{m=0}^{\infty}(-1)^{m}a_{2m}k^{2m}, w_{0}=\sum_{m=0}^{\infty}(-1)^{m-1}a_{2m+1}k^{2m+1}$$

例如，在迎风格式中，我们有

$$u_{t}=-au_{x}+\frac{1}{2}ah(1-\mu)u_{xx}-\frac{1}{6}ah^{2}(1-\mu)(2-\mu)u_{xxx}+\dots$$

其修正方程为

* 一阶: $u_{t}=-au_{x}$，且 $T=O(\tau+h)$。
* 二阶: $u_{t}=-au_{x}+\frac{1}{2}ah(1-\mu)u_{xx}, T=O(\tau^{2}+h^{2})$。
* 三阶: $u_{t}=-au_{x}+\frac{1}{2}ah(1-\mu)u_{xx}-\frac{1}{6}ah^{2}(1-\mu)(2-\mu)u_{xxx}, T=O(\tau^{2}+h^{3})$。
  
以及

$$\begin{cases}w_{0}=ak-\frac{1}{6}a(1-\mu)(1-2\mu)k^{3}h^{2}+\dots\\ w_{1}=-\frac{1}{6}ah(1-\mu)k^{2}+\dots\end{cases}$$

在 Lax-Wendroff 中，$\tilde{u}_{t}=-au_{x}-\frac{1}{6}ah^{2}(1-\mu^{2})u_{xxx}-\frac{1}{8}ah^{3}\mu(1-\mu^{2})u_{xxxx}+\dots$，我们可以得到
$\begin{cases}w_{1}=-\frac{1}{8}a\mu(1-\mu^{2})k^{4}h^{3}+\dots\\ w_{0}=ak(1-\frac{1}{6}a(1-\mu^{2})k^{2}h^{2}+\dots)\end{cases}$

通过计算 $w_{1}$, $w_{0}$, $c_{p}$, $c_{g}$，我们得到下表：

| | advection (exact) | upwind | Lax-Wendroff |
| :--- | :--- | :--- | :--- |
| $w_{1}$ | 0 | $-\frac{1}{2}a(1-\mu)k^{2}h$ | $-\frac{1}{8}a\mu(1-\mu^{2})k^{4}h^{3}$ |
| $w_{0}$ | $ak$ | $ak[1-\frac{1}{6}(1-\mu)(1-2\mu)k^{2}h^{2}]$ | $ak[1-\frac{1}{6}a(1-\mu^{2})k^{2}h^{2}]$ |
| $c_{p}$ | $a$ | $a[1-\frac{1}{6}(1-\mu)(1-2\mu)k^{2}h^{2}]$ | $a[1-\frac{1}{6}a(1-\mu^{2})k^{2}h^{2}]$ |
| $c_{g}$ | $a$ | $a[1-\frac{2}{3}(1-\mu)(1-2\mu)k^{2}h^{2}]$ | $a[1-\frac{2}{3}a(1-\mu^{2})k^{2}h^{2}]$ |

!!! remark "注 2."

    1) 数值上，$c_{p}\le c_{g}$。

    2) 对于一阶或二阶格式，$3(a-c_{p})=a-c_{g}$。这是因为在 $\tilde{u}_{t}=\sum a_{m}\partial_{x}^{m}u$ 中，$a_{1}=a$，$a_{2}$ 是耗散，$a_{3}$ 是色散且 $a_{3}\ne0$。

## 3. 波动方程与线性双曲型方程

### 3.1 模型方程

我们考虑

$$
\begin{cases}
u_{tt}=a^{2}u_{xx}, x\in(0,1), t\ge0,\\
u(x,0)=u_{0}(x), u_{t}(x,0)=v_{0}(x)\\
u(0,t)=u(1,t)=0.
\end{cases}
$$

令 $v=u_{t}$, $w=-au_{x}$，向量形式为

$$\left(\begin{matrix}v\\ w\end{matrix}\right)_{t}+\left(\begin{matrix}0&a\\ a&0\end{matrix}\right)\left(\begin{matrix}v\\ w\end{matrix}\right)_{x}=0$$

解析解为

$$
u(x,t)=\frac{1}{2}[u_{0}(x+at)+u_{0}(x-at)]+\frac{1}{2a}\int_{x-at}^{x+at}v_{0}(\xi)d\xi.
$$

**(1) 显式格式:**

$$
\frac{U_{j}^{m+1}-2U_{j}^{m}+U_{j}^{m-1}}{\tau^{2}}=a^{2}\frac{U_{j+1}^{m}-2U_{j}^{m}+U_{j-1}^{m}}{h^{2}}, \quad \mu=\frac{a\tau}{h}.
$$

局部截断误差是 $T=O(\tau^{2}+h^{2})$。对于 $U^{1}$，我们有

$$u(x_{j},\tau)=u(x_{j},0)+\tau u_{t}(x_{j},0)+\frac{1}{2}\tau^{2}u_{tt}(x_{j},0)+O(\tau^{3})$$

$$=u_{0}(x_{j})+\tau v_{0}(x_{j})+\frac{1}{2}\tau^{2}a^{2}\frac{1}{h^{2}}\delta_{x}^{2}u(x_{j},0)+O(\tau^{3}+\tau^{2}h^{2})$$

所以

$$\begin{cases}U_{j}^{0}=u_{0}(x_{j}),\\ U_{j}^{1}=U_{j}^{0}+\tau v_{0}(x_{j})+\frac{1}{2}\mu^{2}\delta_{x}^{2}U_{j}^{0}.\end{cases}$$

对于 Von Neumann 分析，

$$\lambda_{k}^{2}-2\lambda_{k}+1=\lambda_{k}\mu^{2}(e^{ikh}+e^{-ikh}-2)$$

$$\Rightarrow \lambda_{k}^{\pm}=1-2\mu^{2}\sin^{2}\frac{kh}{2}\pm2i\mu \sin\frac{kh}{2}\sqrt{1-\mu^{2}\sin^{2}\frac{kh}{2}}$$

当 $\mu=\frac{a\tau}{h}\le1$ 时，我们可以得到 $|\lambda_{k}^{\pm}|^{2}=1$。（如果 $\mu>1$，则 $|\lambda_{k}|>1$，这是不稳定的。）并且

$$w_{0}=-\frac{\arg(\lambda_{k})}{\tau}=\pm ak(1-\frac{1}{24}(1-\mu^{2})k^{2}h^{2}+\cdots)$$

**(2) 隐式格式与 $\theta$-格式**

$$
\frac{\delta_{t}^{2}U_{j}^{m}}{\tau^{2}}=a^{2}[\theta\frac{\delta_{x}^{2}U_{j}^{m+1}}{h^{2}}+(1-2\theta)\frac{\delta_{x}^{2}U_{j}^{m}}{h^{2}}+\theta\frac{\delta_{x}^{2}U_{j}^{m-1}}{h^{2}}]
$$

其中 $\delta_{x}^{2}U_{j}^{m}:=U_{j+1}^{m}-2U_{j}^{m}+U_{j-1}^{m}, \delta_{t}^{2}U_{j}^{m}:=U_{j}^{m+1}-2U_{j}^{m}+U_{j}^{m-1}$。局部截断误差为 $T=O(\tau^{2}+h^{2})$。
通过 Von Neumann 分析，稳定性条件为

* 如果 $0\le\theta\le\frac{1}{4}$，则 $(1-4\theta)\mu^2 \le 1$；
* 如果 $\frac{1}{4}<\theta\le1$，则无条件稳定。

并且 

$$w_{0}=-\frac{1}{\tau}\arg(\lambda_{k})=\pm ak[1-\frac{1}{24}(1+(12\theta-1)\mu^{2})k^{2}h^{2}+\dots]$$

### 3.2 PDE 形式

我们考虑

$$
\vec{u}_{t}+A\vec{u}_{x}=0
$$

如果 $A=P\Lambda P^{-1}$ 容易对角化，那么我们有 $\vec{v}_{t}+\Lambda\vec{v}_{x}=0$，$\vec{v}=P^{-1}\vec{u}$。但现在我们直接考虑差分。

Lax-Wendroff 格式是：

$$
\vec{U}_{j}^{m+1}=\vec{U}_{j}^{m}-\tau A\frac{\vec{U}_{j+1}^{m}-\vec{U}_{j-1}^{m}}{2h}+\frac{1}{2}\tau^{2}A^{2}\frac{\vec{U}_{j+1}^{m}-2\vec{U}_{j}^{m}+\vec{U}_{j-1}^{m}}{h^{2}}
$$

Lax-Friedrichs 格式是：

$$
\frac{\vec{U}_{j}^{m+1}-\frac{1}{2}(\vec{U}_{j+1}^{m}+\vec{U}_{j-1}^{m})}{\tau}+A\frac{\vec{U}_{j+1}^{m}-\vec{U}_{j-1}^{m}}{2h}=0.
$$

Leap-frog 格式是：

$$
\begin{cases}\delta_{t}V_{j}^{m}+\mu\delta_{x}W_{j}^{m}=0\\ \delta_{t}W_{j+\frac{1}{2}}^{m+\frac{1}{2}}+\mu\delta_{x}V_{j+\frac{1}{2}}^{m+\frac{1}{2}}=0\end{cases}
\Rightarrow \begin{cases} \frac{V_{j}^{m+\frac{1}{2}}-V_{j}^{m-\frac{1}{2}}}{\tau} + a\frac{W_{j+\frac{1}{2}}^{m}-W_{j-\frac{1}{2}}^{m}}{h}=0 \\ \frac{W_{j+\frac{1}{2}}^{m+1}-W_{j+\frac{1}{2}}^{m}}{\tau} + a\frac{V_{j+1}^{m+\frac{1}{2}}-V_{j}^{m+\frac{1}{2}}}{h}=0 \end{cases}
$$

**迎风 (Courant-Issacson-Rees) 格式:**
假设 $P^{-1}AP=\text{diag}(\lambda_{1},\dots,\lambda_{n})$。对于所有 $\lambda_{1}\le\dots\le\lambda_{n}$，令 
$\lambda_{k}^{\pm}=\frac{1}{2}(|\lambda_{k}|\pm\lambda_{k})$，$\Lambda^{\pm}=\text{diag}(\lambda_{1}^{\pm},\dots,\lambda_{n}^{\pm})$，$A^{\pm}=P\Lambda^{\pm}P^{-1}$。则 

$$\lambda_{k}=\lambda_{k}^{+}-\lambda_{k}^{-},|\lambda_{k}|=\lambda_{k}^{+}+\lambda_{k}^{-}; \Lambda=\Lambda^{+}-\Lambda^{-}, |\Lambda|=\Lambda^{+}+\Lambda^{-}; A=A^{+}-A^{-}$$

CIR 格式为

$$
U_{j}^{m+1}=\frac{\tau}{h}A^{-}U_{j+1}^{m}+(I-\frac{\tau}{h}|A|)U_{j}^{m}+\frac{\tau}{h}A^{+}U_{j-1}^{m}.
$$

特别地，如果 $\lambda_{k}\ge0$，则 $A^{+}=A$, $A^{-}=0$，格式变为

$$U_{j}^{m+1}=(I-\frac{\tau}{h}A)U_{j}^{m}+\frac{\tau}{h}AU_{j-1}^{m}$$

### 3.3 高维波动方程

我们考虑二维问题 

$$u_{tt}=a^{2}(u_{xx}+u_{yy})$$

显式格式是

$$
\frac{\delta_{t}^{2}U_{j,k}^{m}}{\tau^{2}}=a^{2}(\frac{\delta_{x}^{2}U_{j,k}^{m}}{h_{x}^{2}}+\frac{\delta_{y}^{2}U_{j,k}^{m}}{h_{y}^{2}})
$$

$$
\Rightarrow U_{j,k}^{m+1}=2(1-\mu_{x}^{2}-\mu_{y}^{2})U_{j,k}^{m}+\mu_{x}^{2}(U_{j+1,k}^{m}+U_{j-1,k}^{m})+\mu_{y}^{2}(U_{j,k+1}^{m}+U_{j,k-1}^{m})-U_{j,k}^{m-1}
$$

$L^{2}$-稳定性条件是 $|\lambda_{k}|\le1 \Rightarrow \mu_{x},\mu_{y}\le\frac{1}{\sqrt{2}}$。

!!! remark "注 3."
    双曲型 PDE 与抛物型 PDE 有相同的麻烦。随着维度增加，对于显式格式，稳定性条件将变为 $\mu\le\frac{1}{\sqrt{d}}$；对于隐式格式，单步线性系统的系数矩阵将越来越复杂。

**ADI (Alternative direct implicit):**

$$
\begin{cases}
\frac{1}{\tau^2}(U_{j,k}^{m*}-2U_{j,k}^{m}+U_{j,k}^{m-1}) = a^2 \frac{\delta_x^2}{h_x^2}\left[\theta U_{j,k}^{m*}+(1-2\theta)U^m_{j,k}+\theta U_{j,k}^{m-1}\right]+ a^2 \frac{\delta_y^2}{h_y^2}\left[(1-2\theta)U^m_{j,k}+2\theta U^{m-1}_{j,k}\right],\\
\frac{1}{\tau^2}(U_{j,k}^{m+1}-U_{j,k}^{m*}) = a^2 \frac{\delta_y^2}{h_y^2}\theta (U^{m+1}_{j,k}-U^{m*}_{j,k})
\end{cases}
$$

**LOD (Local one-dimensional) / 算子分裂:** 见下一节。

## 4. 混合方程

### 4.1 传统方法

我们考虑对流扩散方程

$$u_t + au_x = cu_{xx}$$

其中 $au_{x}$ 是对流项，$cu_{xx}$ 是扩散项。令 $v(x,t)=u(x+at,t)$，则 $v_{t}=cv_{xx}$。
时空网格比率为

$$\nu=\frac{a\tau}{h},\mu=\frac{c\tau}{h^{2}},Pe=\frac{ah}{c}=\frac{\nu}{\mu}$$

其中 Pe 是 Péclet number。

**(1) 显式格式:**

**(a) 中心差分**

$$
\frac{U_{j}^{m+1}-U_{j}^{m}}{\tau}+a\frac{U_{j+1}^{m}-U_{j-1}^{m}}{2h}=c\frac{U_{j+1}^{m}-2U_{j}^{m}+U_{j-1}^{m}}{h^{2}}
$$

局部截断误差为 $T=\mathcal{O}(\tau+h^{2})$。

$L^{\infty}$-稳定性: 通过凸组合，

$$U_{j}^{m+1}=(\mu-\frac{\nu}{2})U_{j+1}^{m}+(1-2\mu)U_{j}^{m}+(\mu+\frac{\nu}{2})U_{j-1}^{m}$$

所以条件为

$$0 < \nu < 2\mu < 1\implies \mu\le \frac{1}{2},Pe\le2$$

$L^{2}$-稳定性:

$$\lambda_{k}=1-2\mu(1-\cos kh)-i\nu \sin kh$$

$$|\lambda_{k}|^{2}\le1 \Leftrightarrow \nu^{2}\le2\mu\le1 \Leftrightarrow \mu\le\frac{1}{2}, \tau\le\frac{2c}{a^{2}}$$

这里 $\nu^{2}\le2\mu\le1$ 可以由 $\mu\le\frac{1}{2}, Pe\le2$ 证明。

**(b) Lax-Wendroff (修正中心差分)**

$$u_{j}^{m+1}=[u+\tau u_{t}+\frac{1}{2}\tau^{2}u_{tt}]_{j}^{m}+\mathcal{O}(\tau^{3})=[u-a\tau u_{x}+c\tau u_{xx}+\frac{a^{2}\tau^{2}}{2}u_{xx}]_{j}^{m}+\mathcal{O}(c\tau^{2}+\tau^{3})$$

我们有

$$
\frac{U_{j}^{m+1}-U_{j}^{m}}{\tau}+a\frac{U_{j+1}^{m}-U_{j-1}^{m}}{2h}=(c+\frac{1}{2}a^{2}\tau)\frac{U_{j+1}^{m}-2U_{j}^{m}+U_{j-1}^{m}}{h^{2}}
$$

$$T=\mathcal{O}(c\tau+\tau^{2}+h^{2})$$

稳定性条件是

$$
\begin{cases}
    L^{2}: (c+\frac{1}{2}a^{2}\tau)\frac{\tau}{h^{2}}\le\frac{1}{2}, \tau\le\frac{2c+a^{2}\tau}{a^{2}}\text{(后者已满足)}\\
    L^{\infty}: (c+\frac{1}{2}a^{2}\tau)\frac{\tau}{h^{2}}\le\frac{1}{2}, h\le\frac{2c+a^{2}\tau}{a}
\end{cases}
$$

**(c) 迎风**

对于 $a>0$，

$$
\frac{U_{j}^{m+1}-U_{j}^{m}}{\tau}+a\frac{U_{j}^{m}-U_{j-1}^{m}}{h}=c\frac{U_{j+1}^{m}-2U_{j}^{m}+U_{j-1}^{m}}{h^{2}}
$$

$$
\Leftrightarrow \frac{U_{j}^{m+1}-U_{j}^{m}}{\tau}+a\frac{U_{j+1}^{m}-U_{j-1}^{m}}{2h}=(c+\frac{1}{2}ah)\frac{U_{j+1}^{m}-2U_{j}^{m}+U_{j-1}^{m}}{h^{2}}.
$$

它可以看作是修正中心差分。稳定性条件为

$$
\begin{cases}
    L^{2}: (c+\frac{1}{2}ah)\frac{\tau}{h^{2}}\le\frac{1}{2}, \tau\le\frac{2c+ah}{a^{2}}\text{(已满足)}\\
    L^{\infty}: (c+\frac{1}{2}ah)\frac{\tau}{h^{2}}\le\frac{1}{2}, h\le\frac{2c+ah}{a} \text{(已满足)}
\end{cases}
$$

**(2) 隐式格式**

**(a) Crank-Nicolson**

$$
\frac{U_{j}^{m+1}-U_{j}^{m}}{\tau}+\frac{a}{2}[\frac{U_{j+1}^{m}-U_{j-1}^{m}}{2h}+\frac{U_{j+1}^{m+1}-U_{j-1}^{m+1}}{2h}]=\frac{c}{2}[\frac{\delta_{x}^{2}U_{j}^{m}}{h^{2}}+\frac{\delta_{x}^{2}U_{j}^{m+1}}{h^{2}}]
$$

$$
\begin{cases}
    L^{2}: \lambda_{k}=\frac{1-\mu(1-\cos kh)-i\frac{\nu}{2}\sin kh}{1+\mu(1-\cos kh)+i\frac{\nu}{2}\sin kh}, \text{无条件稳定}\\
    L^{\infty}: (1+\mu)U_{j}^{m+1}=(1-\mu)U_{j}^{m}+(\frac{\mu}{2}-\frac{\nu}{4})(U_{j+1}^{m}+U^m_{j-1})+(\frac{\mu}{2}+\frac{\nu}{4})(U_{j-1}^{m}+U^{m+1}_{j-1})\\
    \qquad \implies \mu\le1, h\le\frac{2c}{a} (Pe\le2)
\end{cases}
$$

### 4.2 算子分裂 / 乘积公式 / Trotter 公式

我们考虑方程

$$u_{t}=Au+Bu$$

其中 A, B 是微分算子。例如，

* (对流扩散方程) $u_{t}+au_{x}=cu_{xx}$，则 $A=-a\partial_{x}, B=c\partial_{x}^{2}$。
* (薛定谔方程) $iu_{t}=-\Delta u+V(x)u$，则 $A=i\Delta, B=-iV(x)$。
* (一般形式) $\partial_{t}u+\sum_{l=1}^{d}C_{l}\partial_{x_{l}}u=0$，则 $A_{l}=-C_{l}\partial_{x_{l}}$。

为简单起见，假设 A, B 与时间无关。（否则我们可以使用 Dyson 级数代替泰勒级数。）所以 $\partial_{t}Au=Au_{t}, \partial_{t}Bu=Bu_{t} \Rightarrow \partial_{t}^{k}u=(A+B)^{k}u$。

由泰勒级数，

$$u(x,t)=\sum_{k=0}^{\infty}\frac{t^{k}}{k!}\partial_{t}^{k}u(x,0)=\sum_{k=0}^{\infty}\frac{t^{k}}{k!}(A+B)^{k}u(x,0)=\exp((A+B)t)u(x,0)$$

对于 $\tau\ll1$，直观上我们有 $e^{(A+B)\tau}\approx e^{B\tau}e^{A\tau}$。我们分析其误差：

$$e^{(A+B)\tau}=I+(A+B)\tau+\frac{1}{2}(A^{2}+AB+BA+B^{2})\tau^{2}+\mathcal{O}(\tau^{3})$$

$$e^{B\tau}e^{A\tau}=(I+B\tau+\frac{1}{2}B^{2}\tau^{2}+\mathcal{O}(\tau^{3}))(I+A\tau+\frac{1}{2}A^{2}\tau^{2}+\mathcal{O}(\tau^{3}))=I+(A+B)\tau+\frac{1}{2}(B^{2}+A^{2}+2BA)\tau^{2}+\mathcal{O}(\tau^{3})$$

$$\Rightarrow e^{(A+B)\tau}-e^{B\tau}e^{A\tau}=\frac{1}{2}[A,B]\tau^{2}+\mathcal{O}(\tau^{3}), [A,B]=AB-BA$$

$$\Rightarrow ||e^{(A+B)\tau}-e^{B\tau}e^{A\tau}||\le C\tau^{2}||[A,B]||$$

对于 $t_{max}$ 和 $m=\frac{t_{max}}{\tau}$，我们有

$$||e^{(A+B)t_{max}}-(e^{B\tau}e^{A\tau})^{m}||\le m\cdot C\tau^{2}||[A,B]||=t_{max}\tau\cdot C||[A,B]||$$

我们有二阶 Trotter/Strang 分裂：

$$||e^{(A+B)\tau}-e^{\frac{1}{2}A\tau}e^{B\tau}e^{\frac{1}{2}A\tau}||\le\frac{1}{2}\tau^{3}(||A||+||B||)^{3}+\mathcal{O}(\tau^{4})$$

以及 Trotter-Suzuki 公式：

$$U_{2}(\tau)=e^{\frac{1}{2}A\tau}e^{B\tau}e^{\frac{1}{2}A\tau}$$

$$U_{2k}(\tau)=U_{2k-2}^{2}(s_{k}\tau)U_{2k-2}((1-4s_{k})\tau)U_{2k-2}^{2}(s_{k}\tau)$$ 

$$s_{k}=1/(4-4^{\frac{1}{2k-1}})$$

$$||e^{(A+B)\tau}-U_{2k}(\tau)||=\mathcal{O}(\tau^{2k+1})$$

例如，求解 $u_{t}+au_{x}=cu_{xx}$，我们有

$$\begin{cases}U_{j}^{m*}=U_{j}^{m}-\frac{a\tau}{h}(U_{j}^{m}-U_{j-1}^{m}),\\ U_{j+1}^{m+1}=U_{j}^{m*}+\frac{c\tau}{h^{2}}(U_{j+1}^{m*}-2U_{j}^{m*}+U_{j-1}^{m*}).\end{cases}$$

误差分析包括两部分：

$$||e^{(A+B)t_{m}}-(e^{B\tau}e^{A\tau})^{m}||+||(e^{B\tau}e^{A\tau})^{m}-((I+B\tau)(I+A\tau))^{m}||$$

## 5. 非线性双曲守恒律*

我们考虑

$$
u_{t}+[f(u)]_{x}=0\Longleftrightarrow u_{t}+a(u)u_{x}=0,a(u)=f^{\prime}(u)
$$

### 5.1 性质


其特征线是 $\frac{dx}{dt}=a(u) \Rightarrow x(t)=a(u)t+x(0)$。那么 $\frac{d}{dt}(u(x(t),t))=u_{x}\cdot\frac{dx}{dt}+u_{t}=0$。

$$u(x(t),t)=u(x(0),0)=u_{0}(x(0)),x(t)=x(0)+a(u_{0}(x(0)))t$$

例如，我们考虑无粘 Burgers 方程 (一维 Euler 方程) 

$$u_{t}+uu_{x}=0$$

$$u_{0}(x)=\begin{cases}1,&x<-1,\\ -x,&-1\le x\le0,\\ 0,&x>0.\end{cases}$$

通过 $x(t)=x_{0}+a(u_{0}(x_{0}))t=x_{0}+u_{0}(x_{0})t$，我们有特征线的图：
$u(x,t)$ 的值在每条特征线上是常数，所以 $u(x,t)$ 从 $u_{0}$ 沿着特征线演化。
因为 (0,1) 是 $x_{0}\in[-1,0]$ 的特征线的交点，所以对于 $t\ge1$，$u(x,t)$ 没有经典解，并且在 (0,1) 处存在激波。

!!! definition "定义 2(弱解)"
    对于方程 $u_{t}+f^{\prime}(u)u_{x}=0$，其弱解定义为

    (1) $\forall x_{L},x_R\in \mathbb{R}$, $\int_{x_{L}}^{x_{R}}(u_{t}+f^{\prime}(u)u_{x})dx=0 \Rightarrow \frac{d}{dt}\int_{x_{L}}^{x_{R}}u(x,t)dx+f(u(x_{R},t))-f(u(x_{L},t))=0$。

    (2) 对任意具有紧支集的测试函数 $\phi\in C^{1}(\mathbb{R}^{2})$ ，$\int_{\mathbb{R}^{+}}\int_{\mathbb{R}}\phi(u_{t}+f^{\prime}(u)u_{x})dxdt=0 \Rightarrow \int_{\mathbb{R}^{+}}\int_{\mathbb{R}}(\phi_{t}u+\phi_{x}f(u))dxdt+\int_{\mathbb{R}}\phi(x,0)u(x,0)dx=0$。
    
    这里 (1) 和 (2) 是等价的。

特征线的导数可以计算为

$$\frac{dx}{dt}=\lim_{x_{R}\rightarrow x^{+}}\frac{f(u(x_{R},t))-f(u(x_{L},t))}{u(x_{R},t)-u(x_{L},t)}\approx f^{\prime}(u(x,t))=a(u)$$

所以在上述无粘 Burgers 方程的例子中，$\frac{dx}{dt}(0,1)=\lim_{x_{R}\rightarrow x^{-}}\frac{1}{2}(u(x_{R},t)+u(x_{L},t))=\frac{1}{2}$。

弱解是 (对于 $t\ge1$)

$$u(x,t)=\begin{cases}1,&x<\frac{1}{2}t-\frac{1}{2},\\ 0,&x<\frac{1}{2}t-\frac{1}{2}.\end{cases}$$

在线 $t=2x+1$ 上，两类特征线相交。

若 $u_{0}(x)=\begin{cases}1,&x<0,\\ 0,&x\ge0\end{cases}$，那么它的弱解是 

$$u(x,t)=\begin{cases}1,&x<\frac{t}{2},\\ 0,&x>\frac{t}{2},\\ \frac{1}{2},&x=\frac{t}{2}.\end{cases}$$

若 $u_{0}(x)=\begin{cases}0,&x<0,\\ 1,&x\ge0\end{cases}$，那么它的弱解可以是 

$$u(x,t)=\begin{cases}0,&x<\frac{t}{2},\\ 1,&x>\frac{t}{2},\\ \frac{1}{2},&x=\frac{t}{2}.\end{cases}$$

但这还不够好，因为它不满足熵解。

!!! definition "定义 3(熵解)"
    对于解 $u(x,t)$，如果
    
    $$\lim_{x_{L}\rightarrow x^{-}}\frac{f(u(x,t))-f(u(x_{L},t))}{u(x,t)-u(x_{L},t)}\ge\frac{dx}{dt}(x,t)\ge \lim_{x_{R}\rightarrow x^{+}}\frac{f(u(x,t))-f(u(x_{R},t))}{u(x,t)-u(x_{R},t)}$$

    则它满足熵条件。

令 

$$u(x,t)=\begin{cases}0,&x\le0,\\ \frac{x}{t},&0<x<t,\\ 1,&x\ge t.\end{cases}$$

这是一个满足熵条件的解。它被称为自相似解。

!!! theorem "定理 2"
    对于方程 $u_{t}+(f(u))_{x}=0$，$u_0(x) = \begin{cases} u_L, & x<0 \\ u_R, & x>0 \end{cases}$。
    如果 f(u) 是凸的，那么我们有

    (i) (稀疏波 rarefaction wave) 如果 $u_{L}<u_{R}$，则

    $$u(x,t)=\begin{cases}u_{L},&x<f^{\prime}(u_{L})t,\\ w(\frac{x}{t}),&f^{\prime}(u_{L})t\le x\le f^{\prime}(u_{R})t,\\ u_{R},&x>f^{\prime}(u_{R})t,\end{cases}$$

    其中 $w=(f^{\prime})^{-1}$。

    (ii) (激波 shock wave) 如果 $u_{L}>u_{R}$，则
    
    $$u(x,t)=\begin{cases}u_{L},&x<\frac{f(u_{L})-f(u_{R})}{u_{L}-u_{R}}t,\\ u_{R},&x>\frac{f(u_{L})-f(u_{R})}{u_{L}-u_{R}}t,\end{cases}$$

我们发现凸或凹的 f 可以保证 $w=(f^{\prime})^{-1}$ 的存在。对于非凸非凹的 f，解可以通过凸松弛方法构造。

### 5.2 算法

**(1) 非守恒格式:** 考虑迎风格式

$$U_{j}^{m+1}=U_{j}^{m}-\frac{\tau}{h}(U_{j}^{m}(U_{j}^{m}-U_{j-1}^{m}))$$

$$U_{j}^{0}=\begin{cases}1,&j<0,\\ 0,&j\ge0.\end{cases}$$

那么 $U_{j}^{m+1}=U_{j}^{m}=\dots=U_{j}^{0}$。这不是正确的解。

**(2) 通量守恒格式:** 在 $[x_{j-\frac{1}{2}},x_{j+\frac{1}{2}}]\times[t_{m},t_{m+1}]$ 上积分 $u_{t}+(\frac{1}{2}u^{2})_{x}=0$，我们有

$$\int_{x_{j-\frac{1}{2}}}^{x_{j+\frac{1}{2}}}(u(x,t_{m+1})-u(x,t_{m}))dx+\int_{t_{m}}^{t_{m+1}}(f(u(x_{j+\frac{1}{2}},t))-f(u(x_{j-\frac{1}{2}},t)))dt=0$$

令

$$\overline{U}_{j}^{m}=\frac{1}{h}\int_{x_{j-\frac{1}{2}}}^{x_{j+\frac{1}{2}}}u(x,t_{m})dx,\quad \overline{f}_{j+\frac{1}{2}}^{m+\frac{1}{2}}=\frac{1}{\tau}\int_{t_{m}}^{t_{m+1}}f(u(x_{j+\frac{1}{2}},t))dt$$

则

$$\overline{U}_{j}^{m+1}=\overline{U}_{j}^{m}-\frac{\tau}{h}(\overline{f}_{j+\frac{1}{2}}^{m+\frac{1}{2}}-\overline{f}_{j-\frac{1}{2}}^{m+\frac{1}{2}})$$

$$\Rightarrow U_{j}^{m+1}=U_{j}^{m}-\frac{\tau}{h}(F_{j+\frac{1}{2}}^{m+\frac{1}{2}}-F_{j-\frac{1}{2}}^{m+\frac{1}{2}})$$

其中 $F_{j+\frac{1}{2}}=F(U_{j}^{m},U_{j+1}^{m})\approx\overline{f}_{j+\frac{1}{2}}^{m+\frac{1}{2}}$ 是数值通量。

离散守恒律为

$$\sum_{j\in\mathbb{Z}}U_{j}^{m+1}=\sum_{j\in\mathbb{Z}}U_{j}^{m}$$

**(a) Roe 迎风格式:**
令 

$$a_{j+\frac{1}{2}}^{m}=\begin{cases}\frac{f(U_{j+1}^{m})-f(U_{j}^{m})}{U_{j+1}^{m}-U_{j}^{m}},&U_{j}^{m}\ne U_{j+1}^{m},\\ 0,&U_{j}^{m}=U_{j+1}^{m},\end{cases}$$

$$F_{j+\frac{1}{2}}^{m+\frac{1}{2}}=\begin{cases}f(U_{j}^{m}),&a_{j+\frac{1}{2}}^{m}\ge0,\\ f(U_{j+1}^{m}),&a_{j+\frac{1}{2}}^{m}<0.\end{cases}$$

如果 $a_{j+\frac{1}{2}}^{m}\ge0$ 总是成立，则

$$U_{j}^{m+1}=U_{j}^{m}-\frac{\tau}{h}(f(U_{j}^{m})-f(U_{j-1}^{m}))$$

**(b) Lax-Friedrichs 格式**

$$U_{j}^{m+1}=\frac{U_{j-1}^{m}+U_{j+1}^{m}}{2}-\frac{\tau}{2h}[f(U_{j+1}^{m})-f(U_{j-1}^{m})]$$

$$F_{j+\frac{1}{2}}^{m+\frac{1}{2}}=\frac{1}{2}(f(U_{j+1}^{m})+f(U_{j}^{m}))-\frac{h}{2\tau}(U_{j+1}^{m}-U_{j}^{m})$$

**(c) Lax-Wendroff 格式**

$$U_{j}^{m+1}=[u+\tau u_{t}+\frac{1}{2}\tau^{2}u_{tt}]_{j}^{m}+\mathcal{O}(\tau^{3})=[u-\tau(f(u))_{x}+\frac{1}{2}\tau^{2}(f^{\prime}(u)(f(u))_{x}]_{j}^{m}+\mathcal{O}(\tau^{3})$$

我们令 $a_{j+\frac{1}{2}}^{m}=f^{\prime}(\frac{1}{2}(U_{j}^{m}+U_{j+1}^{m}))\approx\frac{f(U_{j+1}^{m})-f(U_{j}^{m})}{U_{j+1}^{m}-U_{j}^{m}}$，则有

$$U_{j}^{m+1}=U_{j}^{m}-\frac{\tau}{2h}(f(U_{j+1}^{m})-f(U_{j-1}^{m}))+\frac{\tau^{2}}{2h^{2}}[a_{j+\frac{1}{2}}^{m}(f(U_{j+1}^{m})-f(U_{j}^{m}))-a_{j-\frac{1}{2}}^{m}(f(U_{j}^{m})-f(U_{j-1}^{m}))]$$

**(d) Godunov 格式**
在 $U_{j}^{m+1}=U_{j}^{m}-\frac{\tau}{h}(F_{j+\frac{1}{2}}^{m+\frac{1}{2}}-F_{j-\frac{1}{2}}^{m+\frac{1}{2}})$ 中，
我们令

$$F_{j+\frac{1}{2}}^{m+\frac{1}{2}}=f(u_{*}(U_{j}^{m},U_{j+1}^{m})), u_{*}(U_{j}^{m},U_{j+1}^{m}) = w(0, U_j^m, U_{j+1}^m)$$

其中 $w(\frac{x}{t},u_{L},u_{R})$ 是黎曼问题

$$u(x,0)=\begin{cases}u_{L},&x<0,\\ u_{R},&x>0.\end{cases}$$

的解。

假设 f 是凸的。那么我们有两种情况：

* 1) 如果 $U_{j}^{m}>U_{j+1}^{m}$，则由定理 2，存在激波。
我们有 $u_{*}(U_{j}^{m},U_{j+1}^{m})=\begin{cases}U_{j}^{m},&f(U_{j}^{m})>f(U_{j+1}^{m}),\\ U_{j+1}^{m},&f(U_{j}^{m})<f(U_{j+1}^{m}).\end{cases}$
* 2) 如果 $U_{j}^{m}<U_{j+1}^{m}$，则由定理 2，存在稀疏波。我们有
  
    $$u_{*}(U_{j}^{m},U_{j+1}^{m})=\begin{cases}U_{j}^{m},&f^{\prime}(U_{j}^{m})>0,\\ U_{j+1}^{m},&f^{\prime}(U_{j+1}^{m})<0,\\ u_{*},&f^{\prime}(U_{j}^{m})<0<f^{\prime}(U_{j+1}^{m}),\end{cases}$$

    其中 $u_{*}=(f^{\prime})^{-1}(0)$。

我们可以写出一个统一的公式：

$$F_{j+\frac{1}{2}}^{m+\frac{1}{2}}=\begin{cases} \min_{z\in[U_{j}^{m},U_{j+1}^{m}]}f(z), & U_{j}^{m}<U_{j+1}^{m}, \\ \max_{z\in[U_{j+1}^{m},U_{j}^{m}]}f(z), & U_{j}^{m}>U_{j+1}^{m}. \end{cases}$$

**(e) Engquist-Osher 格式 (通量分裂)**
考虑到 Godunov 格式太复杂，我们简化 Godunov 格式并使用通量

$$F_{j+\frac{1}{2}}^{m+\frac{1}{2}}=f^{+}(U_{j}^{m})+f^{-}(U_{j+1}^{m})$$

$$\begin{cases}f^{+}(u)=\int_{0}^{u}\max\{f^{\prime}(u),0\}du+f(0),\\ f^{-}(u)=\int_{0}^{u}\min\{f^{\prime}(u),0\}du.\end{cases}$$

值得一提的是，当 $f^{\prime}(u)=a(u)\ge0$ 总是成立时，Godunov 和 Engquist-Osher 格式中的 $F_{j+\frac{1}{2}}^{m+\frac{1}{2}}$ 将变为 $f(U_{j}^{m})$。所以如果 $a(u)\ge0$，Godunov, Roe, LF, EO 四种格式都将变成迎风格式 $U_{j}^{m+1}=U_{j}^{m}-\frac{\tau}{h}(f(U_{j}^{m})-f(U_{j-1}^{m}))$。
Roe, LF, EO 都是简化的 Godunov 格式。

!!! definition "定义 4."
    对于 $U_{j}^{m+1}=U_{j}^{m}-\frac{\tau}{h}(F_{j+\frac{1}{2}}^{m+\frac{1}{2}}-F_{j-\frac{1}{2}}^{m+\frac{1}{2}}):=H(U_{j-1}^{m},U_{j}^{m},U_{j+1}^{m})$。

    如果 $\forall v_{i}\ge u_{i}$, $H(v_{1},v_{2},v_{3})\ge H(u_{1},u_{2},u_{3})$，则称格式是**单调**的。

我们将 H 的单调性表示为 $H(\uparrow,\uparrow,\uparrow)$。

我们有以下充分条件：

$$\text{单调} \Leftarrow \frac{\partial H}{\partial u_{i}}\ge0$$

$$\Leftarrow U_{j}^{m+1}=U_{j}^{m}-\frac{\tau}{h}(f(U_{j}^{m},U_{j+1}^{m})-f(U_{j-1}^{m},U_{j}^{m})),f(\uparrow,\downarrow),\frac{\tau}{h}(\partial_{u_{1}}f(u_{1},u_{2})-\partial_{u_{2}}f(u_{1},u_{2}))\le1$$

$$\Leftarrow |\nu|\le Q(\nu)\le1$$

这里 $|\nu|\le1$ 是 CFL 条件。

一般的格式可以写成数值粘性格式：

$$U_{j}^{m+1}=\frac{1}{2}(U_{j-1}^{m}+U_{j+1}^{m}) - \frac{\tau}{2h}(f(U_{j+1}^{m})-f(U_{j-1}^{m})) + \frac{h}{2\tau}Q_{j+\frac{1}{2}}^m(U_{j+1}^m - U_j^m)$$

$$\Leftrightarrow F_{j+\frac{1}{2}}^{m+\frac{1}{2}}=\frac{1}{2}(f(U_{j}^{m})+f(U_{j+1}^{m}))-\frac{h}{2\tau}Q_{j+\frac{1}{2}}^{m}(U_{j+1}^{m}-U_{j}^{m})$$

我们有：

$$
Q_{j+\frac{1}{2}}^{m}=\begin{cases}
    1, \quad \text{Lax-Friedrichs}\\\\
    \text{sign}(a_{j+\frac{1}{2}}^m)\frac{\tau}{h}\frac{f(U_{j+1}^m)-f(U_j^m)}{U_{j+1}^m - U_j^m}, \quad \text{Roe}\\\\
    \frac{\tau }{h}\frac{f(U_j^m)+f(U_{j+1}^m-2f(u_*(U_j^m,U_{j+1}^m)))}{U_{j+1}^m - U_j^m}, \quad \text{Godunov}\\\\
    a_{j+\frac{1}{2}}^m\frac{\tau^2}{h^2}\frac{f(U_{j+1}^m)-f(U_j^m)}{U_{j+1}^m - U_j^m}, \quad \text{Lax-Wendroff}
\end{cases}
$$

回顾一些性质：

$$
\begin{cases}
L_1\text{-压缩}: ||U^{m+1}||_{L_1} \le ||U^m||_{L_1}\\\\
TVD: ||U^{m+1}||_{TV} \le ||U^m||_{TV}, \quad \text{其中} ||U^m||_{TV} = \sum_j |U_{j+1}^m - U_j^m|\\\\
\text{保单调}: \text{若} U_j^m \le U_{j+1}^m,\text{则} U_j^{m+1} \le U_{j+1}^{m+1}\\\\
TVB: ||U^{m+1}||_{TV} \le (1+\tau)||U^m||_{TV}
\end{cases}
$$

可以证明：

$$
\text{单调}\Rightarrow L_{\infty}\text{-稳定}\Rightarrow  \text{TVD} \Rightarrow \text{保单调 (如果线性 }\Rightarrow\text{ 单调)}
$$

$$\text{TVD} \Rightarrow \text{TVB}$$

在所有格式（Roe, LW, LF, Godunov）中，LW 仅满足 TVB，其他三种格式满足单调性。

!!! theorem "定理 3(Godunov 定理)"
    线性单调格式至多是一阶精度的。
    （当 $f(u)$ 关于 u 线性时，如果 $U_{j}^{m+1}=\sum c_{i}U_{j+i}^{m}$，即如果 $m+1$ 步的近似解可以表示为 $m$ 步近似解的线性组合，则它是线性格式。）

!!! remark "注"
    Lax-Wendroff 格式是二阶的，所以它不是单调的并且会产生振荡。

<!-- ### 5.3 打破 Godunov 定理**

1.  高分辨率方法：通量限制器 (flux limiter)、斜率限制器 (slope limiter)。
2.  高阶半离散方法 / 通量重构方法：RK, RKDG, IMAXDG, ENO, WENO。

**1. 高分辨率方法:** 结合一阶格式和二阶格式：如果光滑则使用二阶格式，如果不连续则保持一阶以平衡一阶和二阶。

**(a) 通量限制器格式:**
例如，考虑迎风和 Lax-Wendroff。
$F_{j+\frac{1}{2}}=F_{j+\frac{1}{2}}^{L}+\phi(F_{j+\frac{1}{2}}^{H}-F_{j+\frac{1}{2}}^{L})$。
$F_{j+\frac{1}{2}}^{H}=aU_{j}+\frac{1}{2}a(1-\nu)(U_{j+1}-U_{j})$，
$F_{j+\frac{1}{2}}^{L}=aU_{j}$。
$F_{j+\frac{1}{2}}=F_{j+\frac{1}{2}}^{L}+\phi_{j+\frac{1}{2}}(F_{j+\frac{1}{2}}^{H}-F_{j+\frac{1}{2}}^{L})=aU_{j}+\frac{1}{2}\phi_{j+\frac{1}{2}}a(1-\nu)(U_{j+1}-U_{j})$，
$\phi_{j+\frac{1}{2}}=\phi(\theta_{j+\frac{1}{2}}), \theta_{j+\frac{1}{2}}=\frac{U_{j}-U_{j-1}}{U_{j+1}-U_{j}}$，
其中通量限制器 $\phi(\theta)$ 满足 $0\le\phi(\theta)\le2, 0\le\frac{\phi(\theta)}{\theta}\le2$。函数 $\phi(\theta)$ 有以下选择：
$\phi(\theta)=\begin{cases}\max\{0,\min\{1,2\theta\},\min\{\theta,2\}\} & \text{(superbee)}\\ \frac{|\theta|+\theta}{1+|\theta|} & \text{(Van Lee)}\end{cases}$

**(b) 斜率限制器格式:**
$F_{j+\frac{1}{2}}=aU_{j}+\frac{1}{2}a(1-\nu)h\sigma_{j}$
$\sigma_{j}=\frac{U_{j+1}-U_{j}}{h}\phi_{j}$
可以与通量限制器格式有相同的表达式。
MUSCL 格式选择
$\sigma_{j}=\frac{1}{h}\text{minmod}\{U_{j}-U_{j-1},U_{j+1}-U_{j}\}$
其中 $\text{minmod}\{a,b\}=\begin{cases}0,&ab\le0,\\ \text{sign}(a)\min\{|a|,|b|\},&ab>0.\end{cases}$

**2. 高阶半离散方法:** 坚持使用具有最小振荡的高阶格式。
我们考虑
$\frac{d}{dt}[\int_{x_{j-\frac{1}{2}}}^{x_{j+\frac{1}{2}}}u dx+f(u(x_{j+\frac{1}{2}},t))-f(u(x_{j-\frac{1}{2}},t))]=0$。
$\frac{d}{dt}U_{j}+\frac{1}{h}[F(U_{j+\frac{1}{2}},t)-F(U_{j-\frac{1}{2}},t)]=0$。

**时间重构方法:** 高阶 ODE 求解器，如 Runge-Kutta 方法。

**空间重构方法:** ENO (Essentially Non-oscillatory) 格式通过优化 $U_{j}^{m}$ 的有限差分系数来重构 $U_{j+\frac{1}{2}}^{m}$，从而最小化振荡（使用光滑度指示器: SI）：
$\min_{c_{l}}SI=(U_{j+\frac{1}{2}}^{m}-U_{j-\frac{1}{2}}^{m})^{2}$，
s.t. $U_{j+\frac{1}{2}}^{m}=\sum_{l}c_{l}U_{l}^{m}$。 -->

<br>
<hr>

<div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;" markdown="1">

[ :octicons-arrow-left-24:  上一章：抛物 PDE 的有限差分法 ](chapter2.md){ .md-button }

[ 下一章：有限元方法 :octicons-arrow-right-24: ](chapter4.md){ .md-button .md-button--primary }

</div>