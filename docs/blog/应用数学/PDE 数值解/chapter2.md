---
date: 2025-11-23
---

# 第二章：抛物型方程的有限差分法

## 1. 模型问题

我们考虑带有初值和 Dirichlet 边界条件的一维热方程：

$$
\begin{cases}
u_t = u_{xx},\\\\
u(x, 0) = u_0(x), \quad x \in [0, 1],\\\\
u(0,t) = u(1,t) = 0, \quad t > 0.
\end{cases}
$$

其解析解为：

$$
u(x,t)=\sum_{k=1}^{\infty}a_{k}e^{-k^{2}\pi^{2}t}\sin(k\pi x)
$$

其中 $a_k = 2 \int_0^1 u_0(x) \sin(k\pi x) \mathrm{d}x$。

我们引入时空网格：令 $h = \frac{1}{N},x_j = jh,  j=0,\dots,N; \tau=\Delta t,  t_{m}=m\tau, m=0,1,\dots$。这就构成了一个网格函数 $U=\{U_{j}^{m}\}$。

### 1.1 显式格式

令

$$
\Delta_{+t}u(x,t)=u(x,t+\tau)-u(x,t)
$$

$$
\delta_{x}^{2}u(x,t)=u(x+h,t)-2u(x,t)+u(x-h,t)
$$

于是我们得到离散方程：

$$
\begin{cases}
\frac{U_{j}^{m+1}-U_{j}^{m}}{\tau}=\frac{U_{j+1}^{m}-2U_{j}^{m}+U_{j-1}^{m}}{h^{2}}\\\\
U_{j}^{0}=u_{0}(x_{j}), \quad j=0,\dots,N\\\\
U_{0}^{m}=U_{N}^{m}=0, \quad m=1,2,\dots
\end{cases}
$$

**有限体积法 (FVM) 推导：**

令 $\Omega$ 为矩形区域 $[x_j - \frac{1}{2}h, x_j + \frac{1}{2}h] \times [t_m, t_{m+1}]$。利用 $\iint_{\Omega}(u_{t}-u_{xx})dxdt=0$，我们有：

$$
\int_{x_{j}-\frac{1}{2}h}^{x_{j}+\frac{1}{2}h}(u(x,t_{m+1})-u(x,t_{m}))dx=\int_{t_{m}}^{t_{m+1}}(u_{x}(x_{j}+\frac{1}{2}h,t)-u_{x}(x_{j}-\frac{1}{2}h,t))dt
$$

然后：

$$
LHS \approx h(u(x_{j},t_{m+1})-u(x_{j},t_{m}))
$$

$$
RHS \approx \tau(u_{x}(x_{j}+\frac{1}{2}h,t_{m})-u_{x}(x_{j}-\frac{1}{2}h,t_{m})) \approx \frac{\tau}{h}(u(x_{j+1},t_{m})-2u(x_{j},t_{m})+u(x_{j-1},t_{m}))
$$

于是我们再次得到了上述离散方程。

局部截断误差 $T$ 可以通过泰勒公式计算：

$$
T=(\frac{\Delta_{+t}}{\tau}-\frac{\delta_{x}^{2}}{h^{2}})u - (\frac{\partial}{\partial t}-\frac{\partial^{2}}{\partial x^{2}})u
$$

$$
T = \frac{1}{2}\tau u_{tt} - \frac{1}{12}h^{2}u_{xxxx} + O(\tau^{2}+h^{4}) = \frac{1}{2}\tau u_{tt}(x,\eta)-\frac{1}{12}h^{2}u_{xxxx}(\xi,t)
$$

而真实误差

$$
e=U-u,e_{j}^{m}=U_{j}^{m}-u(x_{j},t_{m})
$$

**1. $L^{\infty}$-稳定性:**

令 $\Omega_{t_{max}}=(0,1)\times(0,t_{max})$。我们考虑范数：

$$
||e||_{\infty}:=||e||_{L^{\infty}(\Omega_{t_{max}})} = \max \{|e_{j}^{m}| : 0 \le jh \le 1, 0 \le m\tau \le t_{max} \}
$$

若对于某个与 $h$ 无关的常数 $C$，满足 $||e||_{\infty}\le C||T||_{\infty}$，则称该差分格式具有 $L^{\infty}$-稳定性。

令 $U^{m}=(U_{1}^{m},\dots,U_{N-1}^{m})^T$。则 $U^{m+1}=BU^{m}$，其中：

$$
B = \begin{pmatrix}
1-2\mu & \mu & & \\\\
\mu & 1-2\mu & \ddots & \\\\
& \ddots & \ddots & \mu \\\\
& & \mu & 1-2\mu
\end{pmatrix}
$$

这里 $\mu=\frac{\tau}{h^{2}}$。若 $1-2\mu \ge 0 \Rightarrow 0 \le \mu \le \frac{1}{2}$，我们有 $B$ 的元素非负且 $\sum_{j=1}^{N}B_{ij}\le1$，即 $B$ 是一个行次随机矩阵 (row sub-stochastic matrix)。所以 $U_{j}^{m+1}$ 是 $U^{m}$ 的凸组合。我们可以得到：

$$
||U^{m}||_{\infty} \le ||U^{m-1}||_{\infty} \le \dots \le ||U^{0}||_{\infty}
$$

由 $U_{j}^{m+1}=(1-2\mu)U_{j}^{m}+\mu U_{j-1}^{m}+\mu U_{j+1}^{m}$，我们有：

$$
e_{j}^{m+1}=(1-2\mu)e_{j}^{m}+\mu e_{j-1}^{m}+\mu e_{j+1}^{m}-\tau T_{j}^{m}
$$

$$
|e_{j}^{m+1}| \le \max_{0\le j\le N}|e_{j}^{m}| + \tau \max_{1\le j\le N-1}|T_{j}^{m}| \Rightarrow ||e^{m+1}||_{\infty} \le ||e^{m}||_{\infty}+\tau||T^{m}||_{\infty}
$$

由于 $||e^{0}||_{\infty}=0$，我们得到：

$$
||e^{m}||_{\infty} \le \tau\sum_{l=0}^{m-1}||T^{l}||_{\infty} \le t_{max}||T||_{\infty}
$$

所以 $||e||_{\infty} \le t_{max}||T||_{\infty}$。我们有以下结论：

!!! success "定理 1 (Theorem 1)"
    如果 $\mu=\frac{\tau}{h^{2}}\in(0,\frac{1}{2}]$，则：

    1.  **极大值原理 (Maximum principle):** $||U^{m+1}||_{\infty} \le ||U^{m}||_{\infty}, \forall m \ge 1$；
    2.  **收敛性 (Convergence):** $||e||_{\infty} \le t_{max}||T||_{\infty}$；
    3.  如果 $\mu$ 固定，则 $||e||_{\infty} \le \tau(\frac{1}{2}M_{tt}+\frac{1}{12\mu}M_{xxxx})t_{max}=O(\tau)$。
    这里 $M_{tt}=\max\{|u_{tt}|:x\in[0,1],t\in[0,t_{max}]\}$，$M_{xxxx}=\max\{|u_{xxxx}|:x\in[0,1],t\in[0,t_{max}]\}$。

**2. $L^{2}$-稳定性 / Von Neumann 稳定性 / 特征值分析:**

为了周期性，令 $x\in[-1,1]$，$h=\frac{1}{N}$，$x_{j}=jh$ 对于 $j=-N,\dots,N$。通过离散傅里叶逆变换 (IDFT) 和变换 (DFT)：

$$
\begin{cases}
U_{j}=\frac{1}{\sqrt{2N}}\sum_{k=-N+1}^{N}\hat{U}_{k}e^{ik\pi jh},\\\\
\hat{U}_{k}=\frac{1}{\sqrt{2N}}\sum_{j=-N+1}^{N}U_{j}e^{-ik\pi jh}.
\end{cases}
$$

傅里叶模态为 $U_{j}^{(k)m}=\lambda_{k}^{m}e^{ik\pi jh}$，$-N+1\le k \le N$。

我们有 $L^{2}$-稳定性的一个必要条件：

$$
|\lambda_{k}^{m}|\le C, \quad -N+1\le k\le N
$$

以及 Von Neumann 条件：对于某个独立于 $N$ 和 $h$ 的 $K$，

$$
|\lambda_{k}|\le 1+K\tau, \quad -N+1\le k\le N \quad (2)
$$

取 $K=\frac{C-1}{t_{max}}$，可以证明 (2) 是 Von Neumann 条件的充分条件。

??? proof "$L^2$-稳定性的证明"

    对于 $U_{j}^{m+1}=(1-2\mu)U_{j}^{m}+\mu U_{j-1}^{m}+\mu U_{j+1}^{m}$ 以及 $U_{j}^{(k)m}=\lambda_{k}^{m}e^{ik\pi jh}$，我们有：

    $$
    \lambda_{k}^{m+1}e^{ik\pi jh}=\lambda_{k}^{m}e^{ik\pi jh}[1+\mu(e^{ik\pi h}+e^{-ik\pi h}-2)]
    $$

    $$
    \Rightarrow \lambda_{k}=1-4\mu \sin^{2}\frac{k\pi h}{2}
    $$

    当 $\mu\le\frac{1}{2}$ 时，我们有 $|\lambda_{k}|\le1$。由于 $U_{j}^{m}=\frac{1}{\sqrt{2N}}\sum_{k=-N+1}^{N}\hat{U}_{k}^{m}e^{ik\pi jh}$，我们有：

    $$
    ||U^{m+1}||_{2}^{2}=||\hat{U}^{m+1}||_{2}^{2}=\sum_{k=-N+1}^{N}|\lambda_{k}^{m+1}\hat{U}_{k}^{0}|^{2} \le \sum_{k=-N+1}^{N}|\lambda_{k}^{m}\hat{U}_{k}^{0}|^{2}=||\hat{U}^{m}||_{2}^{2}=||U^{m}||_{2}^{2}
    $$

    所以：

    $$
    ||e^{m+1}||_{2}=||Be^{m}-\tau T^{m}||_{2}\le||Be^{m}||_{2}+\tau||T^{m}||_{2}\le||e^{m}||_{2}+\tau||T^{m}||_{2}\le\tau\sum_{l=0}^{m}||T^{l}||_{2}
    $$

    $$
    \Rightarrow ||e^{m}||_{2}\le t_{max}||T||_{2}
    $$

    对于函数 $\tau=r(h)$，如果 $r(0)=0$ 且 $r(h)$ 是严格递增的，则 $\tau=r(h)$ 是一条路径。如果 $\{h_{i}\}$ 满足 $h_{i}\rightarrow 0 (i\rightarrow\infty)$ 且 $\mu_{i}=\frac{r(h_{i})}{h_{i}^{2}}\le\frac{1}{2}$，则：

    $$
    \max_{m\tau\le t_{max}}||e^{m}||_{L}=O(h_{i}^{2})
    $$

    其中 $L$ 是 2-范数或 $\infty$-范数。

**3. 其他显式格式:**

**1) Richardson 格式:**

$$
\frac{U_{j}^{m+1}-U_{j}^{m-1}}{2\tau}=\frac{U_{j-1}^{m}-2U_{j}^{m}+U_{j+1}^{m}}{h^{2}}
$$

我们有：

$$
\lambda_{k}^{2}+8\lambda_{k}\mu \sin^{2}\frac{k\pi h}{2}-1=0
$$

两个根满足 $\lambda_{k}^{+}\lambda_{k}^{-}=-1$ 且 $\lambda_{k}^{+}\ne\lambda_{k}^{-}$，所以其中一个根的模大于 1。该格式没有稳定性。

**2) Du Fort-Frankel 格式:**

$$
\frac{U_{j}^{m+1}-U_{j}^{m-1}}{2\tau}=\frac{U_{j-1}^{m}-(U_{j}^{m+1}+U_{j}^{m-1})+U_{j+1}^{m}}{h^{2}}
$$

我们有：

$$
(1+2\mu)\lambda_{k}^{2}-4\lambda_{k}\cos(k\pi h)-(1-2\mu)=0
$$

解该方程，我们可以得到该格式是无条件稳定的。但是局部截断误差是：

$$
T_{j}^{m}=O((\frac{\tau}{h})^{2})+O(\tau^{2}+h^{2})+O(\frac{\tau^{4}}{h^{2}})
$$

所以我们必须令 $\tau=o(h)$ 以保证相容性。

### 1.2 隐式格式

$$
\begin{cases}
\frac{U_{j}^{m+1}-U_{j}^{m}}{\tau}=\frac{U_{j+1}^{m+1}-2U_{j}^{m+1}+U_{j-1}^{m+1}}{h^{2}}\\\\
U_{j}^{0}=u(x_{j},0), \quad U_{0}^{m}=U_{N}^{m}=0.
\end{cases}
$$

**1. $L^{\infty}$-稳定性:**

假设 $C\cdot U^{m+1}=U^{m}$，其中

$$
C=\begin{pmatrix}
1+2\mu & -\mu & & \\\\
-\mu & 1+2\mu & \ddots & \\\\
& \ddots & \ddots & -\mu \\\\
&  & -\mu & 1+2\mu
\end{pmatrix}_{N-1}
$$

我们知道 $C$ 是一个 M-矩阵。所以 $C^{-1}\succeq 0$。并且我们可以证明 $\sum_{j=1}^{N-1}(C^{-1})_{ij}\le1$。所以

$$
||U^{m+1}||_{\infty}=||C^{-1}U^{m}||_{\infty}\le||U^{m}||_{\infty}
$$

回忆：

$$
T_{j}^{m+1}=(\frac{\Delta_{-t}}{\tau}-\frac{\delta_{x}^{2}}{h^{2}})u_{j}^{m+1}-(\frac{\partial}{\partial t}-\frac{\partial^{2}}{\partial x^{2}})u_{j}^{m+1}=O(\tau+h^{2})
$$

$$
=\frac{u_{j}^{m+1}-u_{j}^{m}}{\tau}-\frac{u_{j+1}^{m+1}+u_{j-1}^{m+1}-2u_{j}^{m+1}}{h^{2}}
$$

我们有：

$$
Ce^{m+1}=CU^{m+1}-Cu^{m+1} = U^{m}-Cu^{m+1} = e^{m}+u^{m}-Cu^{m+1} = e^{m}-\tau T^{m+1}
$$

所以：

$$
||e^{m+1}||_{\infty}\le||C^{-1}e^{m}||_{\infty}+\tau||C^{-1}T^{m+1}|| \le ||e^{m}||_{\infty}+\tau||T^{m+1}||
$$

$$
\le||e^{0}||_{\infty}+\tau\sum_{l=1}^{m+1}||T^{l}|| \Rightarrow ||e^{m}||\le\tau\sum_{l=1}^{m}||T^{l}||_{\infty}\le t_{max}||T||_{\infty}
$$

**2. $L^{2}$-稳定性:**

我们有：

$$
\lambda_{k}^{m+1}e^{ik\pi jh}[1-\mu(e^{ik\pi h}+e^{-ik\pi h}-2)]=\lambda_{k}^{m}e^{ik\pi jh}
$$

$$
\Rightarrow \lambda_{k}=\frac{1}{1+4\mu \sin^{2}\frac{k\pi h}{2}} \Rightarrow |\lambda_{k}|\le1
$$

所以该格式是无条件稳定的。

**注：** 在显式和隐式格式中，我们可以发现 $\lambda_{k}$ 分别是用多项式和有理分式对 $e^{-4\mu \sin^{2}\frac{k\pi h}{2}}$ 的逼近。

### 1.3 半显式与半隐式格式

**Crank-Nicolson 格式:**

$$
\frac{U_{j}^{m+1}-U_{j}^{m}}{\tau}=\frac{1}{2}\left(\frac{U_{j+1}^{m+1}-2U_{j}^{m+1}+U_{j-1}^{m+1}}{h^{2}}+\frac{U_{j+1}^{m}-2U_{j}^{m}+U_{j-1}^{m}}{h^{2}}\right)
$$

我们有 $T=O(\tau^{2}+h^{2})$。

**$L^{\infty}$ 稳定性:**

我们有 $(1+\mu)U_{j}^{m+1}=(1-\mu)U_{j}^{m}+\frac{\mu}{2}(U_{j-1}^{m+1}+U_{j+1}^{m+1}+U_{j-1}^{m}+U_{j+1}^{m})$，即 $CU^{m+1}=BU^{m}$，其中

$$
C=\begin{pmatrix}
1+\mu & -\frac{\mu}{2} &  \\\\
-\frac{\mu}{2} & 1+\mu & \ddots \\\\
&\ddots &\ddots & -\frac{\mu}{2} \\\\
&  & -\frac{\mu}{2} & 1+\mu
\end{pmatrix}, \quad
B=\begin{pmatrix}
1-\mu & \frac{\mu}{2} & \\\\
\frac{\mu}{2} & 1-\mu & \ddots \\\\
&\ddots & \ddots & \frac{\mu}{2} \\\\
& & \frac{\mu}{2} & 1-\mu
\end{pmatrix}
$$

可以证明当 $\mu\le1$ 时，$C^{-1}B\succ 0$ 且 $\sum_{j=1}^{N-1}(C^{-1}B)_{ij}\le1$。类似前面的过程，可以证明稳定性。

**$L^{2}$ 稳定性:**

我们有：

$$
(1+\mu)\lambda_{k}=(1-\mu)+\frac{\mu}{2}(\lambda_{k}e^{-ik\pi h}+\lambda_{k}e^{ik\pi h}+e^{-ik\pi h}+e^{ik\pi h})
$$

$$
\Rightarrow \lambda_{k}=\frac{1-2\mu \sin^{2}\frac{k\pi h}{2}}{1+2\mu \sin^{2}\frac{k\pi h}{2}}
$$

所以 $|\lambda_{k}|\le1$，故是无条件稳定的。

在实际应用中，我们使用以下策略：

* 初始阶段：令 $\tau=O(h^{2})$ 以消除高频分量。
* 长期阶段：令 $\tau=O(h)$ 以加速收敛。

**$\theta$-格式:**

$$
\frac{U_{j}^{m+1}-U_{j}^{m}}{\tau}=\theta\frac{U_{j+1}^{m+1}-2U_{j}^{m+1}+U_{j-1}^{m+1}}{h^{2}}+(1-\theta)\frac{U_{j+1}^{m}-2U_{j}^{m}+U_{j-1}^{m}}{h^{2}}
$$

$$
\Rightarrow (1+2\mu\theta)U_{j}^{m+1}=(1-2\mu(1-\theta))U_{j}^{m}+\mu(1-\theta)(U_{j-1}^{m}+U_{j+1}^{m})+\mu\theta(U_{j-1}^{m+1}+U_{j+1}^{m+1})
$$

$L^{\infty}$ 稳定性: $2\mu(1-\theta)\le1$。

$L^{2}$-稳定性:

$$
|\lambda_{k}| = \left|\frac{1-4\mu(1-\theta)\sin^{2}\frac{k\pi h}{2}}{1+4\mu\theta \sin^{2}\frac{k\pi h}{2}}\right|\le1
$$

$$
\begin{cases}
\frac{1}{2}\le\theta\le1, \quad \text{无条件稳定}\\\\
0\le\theta<\frac{1}{2}, \quad 2\mu(1-2\theta)\le1
\end{cases}
$$

**最优 $\theta$-格式:** 令 $\theta=\frac{1}{2}-\frac{1}{12\mu}$ (Douglas 格式)，局部截断误差为 $O(\tau^{2}+h^{4})$。

**下表总结:**

| | 相容性 | 稳定性 | 收敛性 |
| :--- | :--- | :--- | :--- |
| Explicit | $\checkmark$ | $\mu\le\frac{1}{2}$ | $O(\tau+h^{2})$ |
| Implicit | $\tau=o(h)$ | $\checkmark$ | $O(\tau^{2}+h^{2})$ |
| DFF | $\checkmark$ | $\checkmark$ | $O(\tau+h^{2})$ |
| CN | $\checkmark$ | $\checkmark$ | $O(\tau^{2}+h^{2})$ |

**注:** 显式格式不能同时满足无条件相容性和无条件稳定性。

### 1.4 线方法 (半离散差分格式)

对于

$$
\begin{cases}
u_{t}=u_{xx},\\\\
u(0,t)=u(1,t)=0,\\\\
u(x,0)=u_{0}.
\end{cases}
$$

令 $U_{j}(t)\approx u(x_{j},t)=u(\frac{j}{N},t)$，则

$$
\begin{cases}
U_{j}^{\prime}(t)=N^{2}(U_{j+1}(t)-2U_{j}(t)+U_{j-1}(t))\\\\
U_{0}(t)=U_{N}(t)=0\\\\
U_{j}(0)=u_{0}(x_{j})
\end{cases}
$$

$$
\Rightarrow U^{\prime}(t)=-AU(t), \quad A=N^{2}\begin{pmatrix}
2 & -1 & & \\\\
-1 & 2 & \ddots \\\\
& \ddots & \ddots & -1 \\\\
& & -1 & 2
\end{pmatrix}
$$

$$
\Rightarrow U(t)=e^{-tA}U(0)
$$

我们知道 $A$ 的特征值为 $4N^{2}\sin^{2}\frac{k\pi}{2N}$ ($k=1,\dots,N-1$)。$\kappa(A)=O(N^{2})$，这是非常大的。我们可以计算 $U_i(t)$ 的显式形式：

$$
U_{i}(t)=\sum_{k=1}^{N-1}b_{k}e^{-4N^{2}t \sin^{2}\frac{k\pi}{2N}}\sin\frac{k\pi i}{N}, \quad b_{k}=\frac{2}{N}\sum_{j=1}^{N-1}u_{0}(x_{j})\sin\frac{k\pi j}{N}
$$

## 2. 一般抛物型 PDE

有以下常见方程：

$$
\begin{cases}
u_{t}=a(x,t)u_{xx}, \quad (3)\\\\
u_{t}=(a(x,t)u_{x})_{x}, \quad (4)\\\\
u_{t}=(a(x,t)u_{x})_{x}+b(x,t)u_{x}+c(x,t)u+f(x,t)+F(u), \quad (5)\\\\
u_{t}=\alpha(u)u_{xx}. \quad (6)\\\\
\end{cases}
$$

对于 (3)，我们令：

$$
\frac{U_{j}^{m+1}-U_{j}^{m}}{\tau}=a_{j}^{m}\frac{U_{j+1}^{m}-2U_{j}^{m}+U_{j-1}^{m}}{h^{2}}
$$

$L^{2}/L^{\infty}$-稳定性条件：对于任何 $j, m$，满足 $0\le a_{j}^{m}\cdot\frac{\tau}{h^{2}}\le\frac{1}{2}$。

对于 (6)，我们令：

$$
\frac{U_{j}^{m+1}-U_{j}^{m}}{\tau}=a(U_{j}^{m})\frac{U_{j+1}^{m}-2U_{j}^{m}+U_{j-1}^{m}}{h^{2}}
$$

$L^{2}/L^{\infty}$-稳定性条件：对于任何 $j, m$，满足 $0\le a(u_{j}^{m})\frac{\tau}{h^{2}}\le\frac{1}{2}$。

或者我们可以使用隐式格式：

$$
\frac{U_{j}^{m+1}-U_{j}^{m}}{\tau}=a_{j}^{m+1}\frac{U_{j+1}^{m+1}-2U_{j}^{m+1}+U_{j-1}^{m+1}}{h^{2}}
$$

$$
\frac{U_{j}^{m+1}-U_{j}^{m}}{\tau}=a(U_{j}^{m+1})\frac{U_{j+1}^{m+1}-2U_{j}^{m+1}+U_{j-1}^{m+1}}{h^{2}}
$$

但是带有变量 $a_{j}^{m+1}$ 的线性系统或非线性系统可能很难求解。这是用隐式格式求解变系数 PDE 的一个缺点。

## 3. 高维抛物型 PDE

考虑二维热方程：

$$
\begin{cases}
u_{t}=u_{xx}+u_{yy}, \quad (x,y)\in\Omega=(0,X)\times(0,Y)\\\\
u(x,y,0)=u_{0}(x,y), \quad (x,y)\in\bar{\Omega}\\\\
u(x,y,t)=g(x,y,t), \quad (x,y)\in\partial\Omega
\end{cases}
$$

令 $h_{x}=\frac{X}{N_{x}}$，$h_{y}=\frac{Y}{N_{y}}$，$\tau=\Delta t$，$x_{j}=jh_{x}$，$y_{k}=kh_{y}$，$t_{m}=m\tau$，则 $U_{j,k}^{m}\approx u(x_{j},y_{k},t_{m})$。

**1. 传统格式**

**(1) 显式格式为：**

$$
\frac{U_{j,k}^{m+1}-U_{j,k}^{m}}{\tau}=\frac{U_{j+1,k}^{m}-2U_{j,k}^{m}+U_{j-1,k}^{m}}{h_{x}^{2}}+\frac{U_{j,k+1}^{m}-2U_{j,k}^{m}+U_{j,k-1}^{m}}{h_{y}^{2}}
$$

局部截断误差 $T=O(\tau+h_{x}^{2}+h_{y}^{2})$。令 $\mu_{x}=\frac{\tau}{h_{x}^{2}}$，$\mu_{y}=\frac{\tau}{h_{y}^{2}}$。

$$
U_{j,k}^{m+1}=(1+\mu_{x}\delta_{x}^{2}+\mu_{y}\delta_{y}^{2})U_{j,k}^{m}
$$

可以证明 $L^{\infty}/L^{2}$-稳定性的条件是：

$$
\mu_{x}+\mu_{y}\le\frac{1}{2}
$$

该条件表明当维数为 $d$ 时，我们需要 $\mu=\frac{\tau}{h^{2}}\le\frac{1}{2d}$。这是在高维问题中使用显式格式的一个缺点。

**(2) 隐式格式为：**

$$
\frac{\Delta_{-t}U_{j,k}^{m+1}}{\tau}=(\frac{\delta_{x}^{2}}{h_{x}^{2}}+\frac{\delta_{y}^{2}}{h_{y}^{2}})U_{j,k}^{m+1}
$$

$$
\Rightarrow (1-\mu_{x}\delta_{x}^{2}-\mu_{y}\delta_{y}^{2})U_{j,k}^{m+1}=U_{j,k}^{m}
$$

可以证明 $L^{2}/L^{\infty}$-稳定性条件是 $\mu_{x}\ge 0, \mu_{y}\ge 0$（即无条件稳定），这与维度无关。
但是对于高维问题，矩阵 $I-\mu_{x}\delta_{x}^{2}-\mu_{y}\delta_{y}^{2}$ 太复杂而难以求逆。这是隐式格式的缺点。

**(3) CN 格式:**

$$
(1-\frac{1}{2}\mu_{x}\delta_{x}^{2}-\frac{1}{2}\mu_{y}\delta_{y}^{2})U_{j,k}^{m+1}=(1+\frac{1}{2}\mu_{x}\delta_{x}^{2}+\frac{1}{2}\mu_{y}\delta_{y}^{2})U_{j,k}^{m}
$$

**2. 交替方向隐式 (ADI) 方法**

Peaceman-Rachford 格式:

$$
\begin{cases}
    \frac{U_{j,k}^{m+\frac{1}{2}}-U_{j,k}^{m}}{\tau/2}=\frac{\delta_{x}^{2}}{h_{x}^{2}}U_{j,k}^{m+\frac{1}{2}}+\frac{\delta_{y}^{2}}{h_{y}^{2}}U_{j,k}^{m} \\\\
    \frac{U_{j,k}^{m+1}-U_{j,k}^{m+\frac{1}{2}}}{\tau/2}=\frac{\delta_{x}^{2}}{h_{x}^{2}}U_{j,k}^{m+\frac{1}{2}}+\frac{\delta_{y}^{2}}{h_{y}^{2}}U_{j,k}^{m+1}
\end{cases}
$$

这里，当 $(x_{j},y_{k})\in\partial\Omega$ 时，$U_{j,k}^{m+\frac{1}{2}}=g(x_{j},y_{k},t_{m}+\frac{\tau}{2})$ 是已知的。该格式为：

$$
\begin{cases}
(1-\frac{1}{2}\mu_{x}\delta_{x}^{2})U_{j,k}^{m+\frac{1}{2}}=(1+\frac{1}{2}\mu_{y}\delta_{y}^{2})U_{j,k}^{m},\\\\
(1-\frac{1}{2}\mu_{y}\delta_{y}^{2})U_{j,k}^{m+1}=(1+\frac{1}{2}\mu_{x}\delta_{x}^{2})U_{j,k}^{m+\frac{1}{2}}
\end{cases}
$$

$$
\Rightarrow (1-\frac{1}{2}\mu_{x}\delta_{x}^{2})(1-\frac{1}{2}\mu_{y}\delta_{y}^{2})U_{j,k}^{m+1}=(1+\frac{1}{2}\mu_{x}\delta_{x}^{2})(1+\frac{1}{2}\mu_{y}\delta_{y}^{2})U_{j,k}^{m}
$$

可以证明：
$T_{u}=O(\tau^{2}+h_{x}^{2}+h_{y}^{2})$，
$L^{2}$-稳定性：无条件，
$L^{\infty}$-稳定性：$\max\{\mu_{x},\mu_{y}\}\le1$。

**3. 局部一维 (LOD) 方法**

直观上，$u_{t}=\partial_{x}^{2}u+\partial_{y}^{2}u \Rightarrow U^{m+1}=e^{(\partial_{x}^{2}+\partial_{y}^{2})\tau}U^{m}\approx e^{\partial_{x}^{2}\tau}e^{\partial_{y}^{2}\tau}U^{m}$。所以我们使用映射：

$$
U^{m} \xrightarrow{e^{\partial_{x}^{2}\tau}} U^{m*} := e^{\partial_{x}^{2}\tau}U^{m} \xrightarrow{e^{\partial_{y}^{2}\tau}} U^{m+1}
$$

格式为：

$$
\frac{U_{j,k}^{m*}-U_{j,k}^{m}}{\tau}=\frac{1}{2h_{x}^{2}}\delta_{x}^{2}(U_{j,k}^{m*}+U_{j,k}^{m})
$$

$$
\frac{U_{j,k}^{m+1}-U_{j,k}^{m*}}{\tau}=\frac{1}{2h_{y}^{2}}\delta_{y}^{2}(U_{j,k}^{m+1}+U_{j,k}^{m*})
$$

$$
\Rightarrow
\begin{cases}
    (1-\frac{1}{2}\mu_{x}\delta_{x}^{2})U_{j,k}^{m*}=(1+\frac{1}{2}\mu_{x}\delta_{x}^{2})U_{j,k}^{m}, \quad (7)\\\\
    (1-\frac{1}{2}\mu_{y}\delta_{y}^{2})U_{j,k}^{m+1}=(1+\frac{1}{2}\mu_{y}\delta_{y}^{2})U_{j,k}^{m*}  \quad (8)
\end{cases}
$$

**注：** 如果 $\delta_{x}^{2}\delta_{y}^{2}=\delta_{y}^{2}\delta_{x}^{2}$（本方程中满足），则 ADI 和 LOD 是等价的，但 $U^{m*}\ne U^{m+\frac{1}{2}}$。

**$U^{m*}$ 的边界:** 假设 $\Omega$ 的四条边是 W(西)，E(东)，N(北) 和 S(南)。
方程 (7) 需要 W 和 E 上的 $U^{m*}$ 值，方程 (8) 需要 N 和 S 上的 $U^{m*}$ 值。对方程 (7) 乘以 $1+\frac{1}{2}\mu_{x}\delta_{x}^{2}$，我们得到：

$$
U_{j,k}^{m*}|_{\partial\Omega}=(1+\mu_{x}\delta_{x}^{2})U_{j,k}^{m}|_{\partial\Omega} \quad \text{在 W, E 上}
$$

对方程 (8) 乘以 $1-\frac{1}{2}\mu_{y}\delta_{y}^{2}$：

$$
(1-\frac{1}{2}\mu_{y}\delta_{y}^{2})U_{j,k}^{m+1} = U_{j,k}^{m*} \quad \text{在 N, S 上}
$$

可以证明：
$T_{u}=O(\tau^{2}+h_{x}^{2}+h_{y}^{2})$，
$L^{2}$-稳定性：无条件，
$L^{\infty}$-稳定性：$\max\{\mu_{x},\mu_{y}\}\le1$。

对于 d 维问题 ($d\ge3$)，ADI 将执行 d 步，每步执行一个隐式格式。并且它将不再是无条件稳定的。LOD 将执行 d 步，每步处理一个维度。并且其边界值 $U^{m*}$ 很难获取。

## 4. 能量分析与能量稳定格式*

对于半线性抛物型 PDEs：

$$
u_{t}=\mathcal{L}u+\mathcal{N}(u)
$$

其中 $\mathcal{L}$ 是椭圆型的。

**连续能量:** 为了使用能量分析，我们需要找到一个能量泛函 $E:\mathcal{H}\rightarrow\mathbb{R}, u\mapsto E[u]$，其中 $\mathcal{H}$ 是包含 PDE 解的某个希尔伯特空间。
例如，对于区间 [a, b] 和 Dirichlet 边界，$\mathcal{H}\subset\{u\in L^{2}[a,b]|u(a)=u(b)=0\}$。我们需要让：

$$
u_{t}=-\frac{\delta E}{\delta u}[u]
$$

其中 $\frac{\delta E}{\delta u}[u]$ 是泛函 E 的导数。类似于 $\mathbb{R}^{n}$ 中的函数，泛函导数可以定义为：

$$
\frac{\delta E}{\delta u}[u]=a\in\mathcal{H} \Leftrightarrow \forall g\in\mathcal{H}, \lim_{\epsilon\to0}\frac{E[u+\epsilon g]-E[u]}{\epsilon} = \left<a,g\right>
$$

可以证明在 Dirichlet 边界条件下：

$$
\begin{cases}
E[u]=\int_{\Omega}\frac{1}{2}||\nabla u||^{2}dx \Rightarrow \frac{\delta E}{\delta u}[u]=-\Delta u,\\\\
E[u]=\int_{\Omega}F(u)dx \Rightarrow \frac{\delta E}{\delta u}[u]=F^{\prime}(u).
\end{cases}
$$

所以对于方程 $u_{t}=\Delta u-f(u)$（带 Dirichlet 边界），我们可以令 $F^{\prime}(u)=f(u)$，则：

$$
E=\int_{\Omega}(\frac{1}{2}||\nabla u||^{2}+F(u))dx
$$

**离散能量:** 假设我们使用某种差分格式求解 PDE，并且对于 $t=n\tau$ 我们已经得到了 $U^{m}$。
我们需要定义离散能量函数（不是泛函）$E_{h}:\mathbb{R}^{N}\rightarrow\mathbb{R}$，其中 $\mathbb{R}^{N}$ 用于包含 $U^{m}$。$E_{h}$ 可以通过将 E 中的积分变换为求和得到，例如：

$$
\frac{1}{2}\int_{\Omega}|\nabla u|^2 dx \rightarrow \frac{1}{2}h||\nabla_{h}U^{m}||_{2}^{2}, \quad \int_{\Omega}F(u)dx \rightarrow h\sum_{j}F(U_{j}^{m})
$$

如果 $E_{h}(U^{m+1})\le E_{h}(U^{m})$，则该格式是能量稳定的。

!!! example "例 1：带 Dirichlet 边界的热方程"

    我们使用隐式格式 $u_{t}=u_{xx}$，即 $U_{j}^{m+1}-U_{j}^{m}=\mu\delta_{x}^{2}U_{j}^{m+1}$。

    令 $E[u]=\frac{1}{2}\int_{\Omega}u_{x}^{2}dx$，则 $E_h(U^m) = \sum \frac{1}{2}(\frac{U_{j+1}^m-U_j^m}{h})^2 \cdot h$。我们有 $\frac{\delta E}{\delta u}[u]=-u_{xx}$。
    离散梯度 $\nabla E_h(U^{m+1})$ 对应 $-\frac{1}{h} \delta_x^2 U^{m+1}$。

    $$
    u_{t}=-\frac{\delta E}{\delta u}[u], \quad \frac{U_{j}^{m+1}-U_{j}^{m}}{\tau}=-\frac{1}{h}(\nabla E_{h}(U^{m+1}))_{j}
    $$

    **(方法 1):** 可以证明 $E_{h}(U^{m})$ 是凸的，所以

    $$
    E_{h}(U^{m})-E_{h}(U^{m+1})-\langle\nabla E_{h}(U^{m+1}),U^{m}-U^{m+1}\rangle\ge0
    $$

    由 $\langle\nabla E_{h}(U^{m+1}),U^{m}-U^{m+1}\rangle=\langle\nabla E_{h}(U^{m+1}),\frac{\tau}{h}\nabla E_{h}(U^{m+1})\rangle\ge0$，我们有 $E_{h}(U^{m})\ge E_{h}(U^{m+1})$。

    **(方法 2):** 使用分部积分（求和），

    $$
    \frac{1}{\tau}||U^{m+1}-U^{m}||^{2}=\langle\frac{\delta_{x}^{2}}{h^{2}}U^{m+1},U^{m+1}-U^{m}\rangle
    $$

    $$
    =-\langle\nabla_{h}U^{m+1},\nabla_{h}(U^{m+1}-U^{m})\rangle
    $$

    $$
    =-\frac{1}{2}(||\nabla_{h}U^{m+1}||^{2}+||\nabla_{h}U^{m+1}-\nabla_{h}U^{m}||^{2})+\frac{1}{2}||\nabla_{h}U^{m}||^{2}
    $$

    $$
    \Rightarrow E_{h}(U^{m})-E_{h}(U^{m+1})=\frac{2}{\tau}||U^{m+1}-U^{m}||^{2}+||\nabla_{h}U^{m+1}-\nabla_{h}U^{m}||^{2}
    $$

!!! example "例 2：Allen-Cahn 方程"

    $$
    u_{t}=\Delta u+u-u^{3}=-\frac{\delta E}{\delta u}[u], \quad E[u]=\int_{\Omega}(\frac{1}{2}||\nabla u||^{2}+\frac{1}{4}(u^{2}-1)^{2})dx
    $$

    这里 $F(u)=\frac{1}{4}(u^{2}-1)^{2}$ 是双阱势，$f(u)=F^{\prime}(u)=u^{3}-u$ 是非线性反应项。

    **(方法 1: 隐显格式 (IMEX))**

    令 $\hat{F}(U^{m})=\sum_{j}F(U_{j}^{m})\cdot h$，则

    $$
    \frac{U_{j}^{m+1}-U_{j}^{m}}{\tau}=\Delta_{h}U_{j}^{m+1}-f(U_{j}^{m})
    $$

    $$
    \hat{F}(U^{m+1})-\hat{F}(U^{m})\le\frac{1}{2}M||U^{m+1}-U^{m}||^{2}
    $$

    其中 $M\ge \sup|f^{\prime}(u)|$。令 $E_{h}(U^{m})=\frac{1}{2}||\nabla_{h}U^{m}||^{2}+\hat{F}(U^{m})$，则

    $$
    E_{h}(U^{m})-E_{h}(U^{m+1})=\frac{1}{2}||\nabla_{h}U^{m}||^{2}-\frac{1}{2}||\nabla_{h}U^{m+1}||^{2}+\hat{F}(U^{m})-\hat{F}(U^{m+1})
    $$

    $$
    \ge\frac{1}{\tau}||U^{m}-U^{m+1}||^{2}+\frac{1}{2}||\nabla_{h}U^{m}-\nabla_{h}U^{m+1}||^{2}-\frac{1}{2}M||U^{m}-U^{m+1}||^{2}
    $$

    $$
    =(\frac{1}{\tau}-\frac{M}{2})||U^{m}-U^{m+1}||^{2}+\frac{1}{2}||\nabla_{h}U^{m}-\nabla_{h}U^{m+1}||^{2}
    $$

    当 $\frac{1}{\tau}\ge\frac{M}{2}\Rightarrow\tau\le\frac{2}{M}$ 时，$E_{h}(U^{m})\ge E_{h}(U^{m+1})$。

    **(方法 2: 凸分裂格式 Convex-splitting scheme)**

    令 $E_{h}=E_{h}^{\cup}-E_{h}^{\cap}$，其中 $E_{h}^{\cup}$，$E_{h}^{\cap}$ 都是凸的。则

    $$
    \frac{U^{m+1}-U^{m}}{\tau}=-\nabla E_{h}^{\cup}(U^{m+1})+\nabla E_{h}^{\cap}(U^{m})
    $$

    所以

    $$
    E_{h}(U^{m})-E_{h}(U^{m+1})=E_{h}^{\cup}(U^{m})-E_{h}^{\cup}(U^{m+1})-E_{h}^{\cap}(U^{m})+E_{h}^{\cap}(U^{m+1})
    $$

    $$
    \ge\langle\nabla E_{h}^{\cup}(U^{m+1}),U^{m}-U^{m+1}\rangle-\langle\nabla E_{h}^{\cap}(U^{m}),U^{m}-U^{m+1}\rangle
    $$

    $$
    =\langle\nabla E_{h}^{\cup}(U^{m+1})-\nabla E_{h}^{\cap}(U^{m}),U^{m}-U^{m+1}\rangle
    $$

    $$
    =\langle\frac{U^{m}-U^{m+1}}{\tau},U^{m}-U^{m+1}\rangle\ge0
    $$

    对于非凸势 $F(u)=\frac{1}{4}(u^{2}-1)^{2}=F^{\cup}(u)-F^{\cap}(u)$，我们可以选择 $F^{\cup}(u)=\frac{1}{4}(u^{4}+1), F^{\cap}(u)=\frac{1}{2}u^{2}$，或者 $F^{\cup}(u)=\frac{1}{4}(u^{2}+1)^{2}, F^{\cap}(u)=u^{2}$。

## 5. 线性发展方程的有限差分法 (FDM)

考虑线性发展方程：

$$
\begin{cases}
u_{t}=\mathcal{L}u+f,\\\\
u(x,0)=u_{0}(x), x\in\Omega,\\\\
u(x,t)=g(x,t), x\in\partial\Omega.
\end{cases}
$$

假设格式为：

$$
AU^{m+1}=BU^{m}+F^{m}
$$

并假设 $A$ 非奇异且 $A=O(\tau^{-1})$ 或 $O(\tau^{-2})$。条件数良好的条件是 $||A^{-1}||\le K\tau$ 或 $K\tau^{2}$。局部截断误差为 $T^{m}=AU^{m+1}-BU^{m}-F^{m}$。

**稳定性 (Lax-Richtmyer):** $\forall\{V^{m}\}, \{W^{m}\}$ 满足

$$
\begin{cases}
AV^{m+1}=BV^{m}+F^{m}, \quad \text{给定 } V^{0}\\\\
AW^{m+1}=BW^{m}+F^{m}, \quad \text{给定 } W^{0}
\end{cases}
$$

存在独立于 $V^{0}, W^{0}$ 的 $K$ 使得 $||V^{m}-W^{m}||\le K||V^{0}-W^{0}||$。

**相容性:** $T^{m}\rightarrow0 (\tau(h)\rightarrow0)$。

**收敛性:** $U_{j}^{m}\rightarrow u(x_{j},t_{m}) (\tau(h)\rightarrow0)$。

!!! success "定理 2 (Lax 等价定理)"
    对于一个适定的线性发展方程和一个相容的线性差分格式，其稳定性等价于其收敛性。

在矩阵分析中，$L^{2}$-稳定性条件结合两个必要条件是：

$$
||(A^{-1}B)^{m}||_{2}\le K
$$

$$
\Rightarrow (\rho(A^{-1}B))^{m}\le K \Rightarrow \rho(A^{-1}B)\le 1+C\tau
$$

其中 $\rho(A)=\max\{|\lambda|:\lambda \text{ 是 A 的特征值}\}$ 是谱半径。
如果 $A$ 是正规矩阵 ($AA^{\dagger}=A^{\dagger}A$)，包括对称矩阵、反对称矩阵、厄米矩阵等，则 $\rho(A)=||A||_{2}$。

在 Von Neumann 分析中，$A, B$ 是循环矩阵。所以 $A, B$ 的特征向量是傅里叶模态 $U_{j}^{(k)m}$，特征值是 $\lambda_{k}$。

两个必要条件是：

$$
||(A^{-1}B)^{m}||_{2}\le K \Rightarrow |\lambda_{k}^{m}|\le K \Rightarrow |\lambda_{k}|\le 1+C\tau
$$

所以当 $A, B$ 是循环矩阵时，矩阵分析将转化为 Von Neumann 分析。

可以证明对于 $AU^{m+1}=BU^{m}$，如果 $U^{m}=U^{(k)m}=\{e^{ik\pi jh}\}_{j}$，则

$$
\lambda_{k}=\frac{\sum_{j}b_{j^{\prime},j}e^{ik\pi jh}}{\sum_{j}a_{j^{\prime},j}e^{ik\pi jh}}
$$

对任何 $j^{\prime}$ 成立，其中 $A=(a_{j^{\prime},j})$ 和 $B=(b_{j^{\prime},j})$。例如，在 Crank-Nicolson 方程中 $(1+\mu)U_{j}^{m+1}=(1-\mu)U_{j}^{m}+\frac{\mu}{2}(U_{j-1}^{m+1}+U_{j+1}^{m+1}+U_{j-1}^{m}+U_{j+1}^{m})$，我们有：

$$
\lambda_{k}=\frac{\frac{\mu}{2}e^{-ik\pi h}+1-\mu+\frac{\mu}{2}e^{ik\pi h}}{-\frac{\mu}{2}e^{-ik\pi h}+1+\mu-\frac{\mu}{2}e^{ik\pi h}}=\frac{1-2\mu \sin^{2}\frac{kh\pi}{2}}{1+2\mu \sin^{2}\frac{kh\pi}{2}}
$$




<br>
<hr>

<div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;" markdown="1">

[ :octicons-arrow-left-24:  上一章：椭圆 PDE 的有限差分法 ](chapter1.md){ .md-button }

<!-- [ 下一章：还没写 :octicons-arrow-right-24: ](chapter2.md){ .md-button .md-button--primary } -->
[ 下一章：双曲 PDE 的有限差分法 :octicons-arrow-right-24: ](chapter3.md){ .md-button .md-button--primary }

</div>