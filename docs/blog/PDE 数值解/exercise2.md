---
date: 2025-12-23
---

# 习题 2

!!! problem "1."
    试引入适当的无量纲的空间和时间变量，将一维有限区域上均匀介质中无源热流运动在齐次 Dirichlet 边界条件下的初边值问题化为定义在 $(0,1) \times \mathbb{R}_+$ 上的标准形式的模型问题 $(2.2.1) \sim (2.2.3)$。

!!! proof "证明"
    控制方程为 $\frac{\partial U}{\partial T} = a^2 \frac{\partial^2 U}{\partial X^2}$。边值 $U(0, T) = U(L, T) = 0$ 以及 $U(X, 0) = \phi(X)$。

    设 $x = X/L$，$t = T/T_0$，其中 $T_0$ 待定。令 $u(x, t) = U(X, T)/U_0$，$U_0$ 为特征温度常量。代入得 
    
    $$\frac{\partial u}{\partial t} = \left( \frac{a^2 T_0}{L^2} \right) \frac{\partial^2 u}{\partial x^2}=  \frac{\partial^2 u}{\partial x^2}$$
    
    这里取 $T_0 = \frac{L^2}{a^2}$。

    边值 $u(0, t) = 0$ 和 $u(1, t) = 0$。对于初始条件，当 $T=0$ 时 $t=0$，代入变换关系得 $U_0 u(x, 0) = \phi(Lx)$，记无量纲初始函数为 $u^0(x) = \frac{1}{U_0}\phi(Lx)$。原初边值问题被转化为如下标准形式的模型问题：
    
    $$
    \begin{cases}
    \frac{\partial u}{\partial t} = \frac{\partial^2 u}{\partial x^2}, & 0 < x < 1, \ t > 0 \\
    u(0, t) = 0, \quad u(1, t) = 0, & t \geqslant 0 \\
    u(x, 0) = u^0(x), & 0 \leqslant x \leqslant 1
    \end{cases}
    $$


!!! problem "2."
    将上题中的无源热流运动换为有源热流运动，并将边界条件换为第三类边界条件，试给出相应的初边值问题，并引入适当的无量纲的空间和时间变量，将其化为定义在 $(0,1) \times \mathbb{R}_+$ 上的标准形式的模型问题 $(2.2.1) \sim (2.2.3)$。

!!! proof "证明"
    控制方程为 $ \frac{\partial U}{\partial T} = a^2 \frac{\partial^2 U}{\partial X^2} + F(X, T)$。边界条件为 $- \frac{\partial U}{\partial X}(0, T) + \sigma_0 U(0, T) = g_0(T)$，$\frac{\partial U}{\partial X}(L, T) + \sigma_L U(L, T) = g_L(T)$。初始条件为 $U(X, 0) = \phi(X)$。

    设 $x = X/L$ 和 $t = T/T_0$，令 $u(x, t) = U(X, T)/U_0$，其中 $U_0$ 为特征温度常量，$T_0$ 为待定时间尺度。带入得
    
    $$\frac{\partial u}{\partial t} = \left( \frac{a^2 T_0}{L^2} \right) \frac{\partial^2 u}{\partial x^2} + \frac{T_0}{U_0} F(Lx, T_0 t)=u_{xx} + f(x,t)$$
    
    这里取 $T_0 = \frac{L^2}{a^2}$，$f(x,t) = \frac{L^2}{a^2 U_0} F(Lx, \frac{L^2}{a^2}t)$。

    边值 $-\frac{\partial u}{\partial x} + (\sigma_0 L) u = \frac{L}{U_0} g_0(T_0 t)$，$\frac{\partial u}{\partial x} + (\sigma_L L) u = \frac{L}{U_0} g_L(T_0 t)$。记 $p_0 = \sigma_0 L, p_1 = \sigma_L L$，$q_0(t) = \frac{L}{U_0} g_0(T_0 t), q_1(t) = \frac{L}{U_0} g_L(T_0 t)$。初始直接代入得 $u(x, 0) = \frac{1}{U_0}\phi(Lx)$，记为 $u^0(x)$。原问题被转化为定义在 $(0,1) \times \mathbb{R}_+$ 上的标准形式的模型问题：

    $$
    \begin{cases}
    \frac{\partial u}{\partial t} = \frac{\partial^2 u}{\partial x^2} + f(x,t), & 0 < x < 1, \ t > 0 \\
    -\frac{\partial u}{\partial x} + p_0 u = q_0(t), & x = 0, \ t \geqslant 0 \\
    \frac{\partial u}{\partial x} + p_1 u = q_1(t), & x = 1, \ t \geqslant 0 \\
    u(x, 0) = u^0(x), & 0 \leqslant x \leqslant 1
    \end{cases}
    $$

!!! problem "3."
    设模型问题的真解 $u$ 是 $[0,1] \times \mathbb{R}_+$ 上的连续函数，试证明：对任给的 $t_{\max} > 0$，差分解在 $\mathbb{L}^\infty((0,1) \times (0, t_{\max}))$ 范数意义下的收敛性等价于

    $$
    \|e\|_{\infty, \Omega_{t_{\max}}} = \max_{0 \leqslant m \leqslant t_{\max}/\tau} \max_{0 \leqslant j \leqslant 1/h} |e_j^m| \to 0, \quad \text{当} \quad h, \tau \to 0,
    $$

!!! proof "证明"
    我们需要证明 $\lim_{h,\tau \to 0} \|u - \tilde{U}_{h,\tau}\|_{L^\infty(\bar{D})} = 0$ 等价于离散误差范数 $\|e\|_{\infty, \Omega_{t_{\max}}} \to 0$，这里 $\tilde{U}_{h,\tau}$ 是离散解 $U=\left\{U_j^m\right\}$ 在 $\bar{D}=[0,1] \times [0,t_{\max}]$ 上的分片常数延拓，$e_j^m = u(x_j, t_m) - U_j^m$ 是离散误差。

    先证必要性。由于 $\tilde{U}_{h,\tau}(x_j, t_m) = U_j^m$，因此离散误差的最大值满足不等式 
    
    $$\max_{j,m} |e_j^m| = \max_{j,m} |u(x_j, t_m) - U_j^m| \leqslant \sup_{(x,t)\in\bar{D}} |u(x,t) - \tilde{U}_{h,\tau}(x,t)|\to 0$$
    
    当 $h, \tau \to 0$。这证明了必要性。

    再证充分性。对于区域 $\bar{D}$ 内的任意一点 $(x,t)$，设其位于某个以 $(x_j, t_m)$ 为节点的网格单元 $\omega_{j,m}$ 中。根据三角不等式，该点的逼近误差可放缩为 $|u(x,t) - \tilde{U}_{h,\tau}(x,t)| = |u(x,t) - U_j^m| \leqslant |u(x,t) - u(x_j, t_m)| + |u(x_j, t_m) - U_j^m|$。不等式右端第二项即为离散误差 $|e_j^m|$，受控于 $\|e\|_{\infty, \Omega_{t_{\max}}}$。对于第一项，因为真解 $u$ 是闭区域 $\bar{D}$ 上的连续函数，根据 Cantor 定理，连续函数在紧集上一致连续。这意味着对于任给的 $\epsilon > 0$，存在 $\delta > 0$，使得只要网格尺寸 $\sqrt{h^2 + \tau^2} < \delta$，就有 $|u(x,t) - u(x_j, t_m)| < \epsilon/2$。同时，若已知离散误差收敛，则对于足够小的 $h, \tau$，有 $|e_j^m| < \epsilon/2$。综合可得 $\|u - \tilde{U}_{h,\tau}\|_{L^\infty(\bar{D})} < \epsilon$，即证明了充分性。

!!! problem "4."
    试应用最大值原理证明：当网格比 $\mu = \Delta t / (\Delta x)^2 \leqslant 1/2$ 时，显式格式
    
    $$
    \frac{U_j^{m+1} - U_j^m}{\tau} = \frac{U_{j-1}^m - 2U_j^m + U_{j+1}^m}{h^2}
    $$

    的解 $U$ 满足最大值原理，即
    
    $$
    \max_{1\le j\le N-1} |U_j^m| \leqslant \max \left\{ \max_{0 \leqslant i \leqslant N} |U_i^0|, \max_{0 < l \leqslant m} \max \{|U_0^l|, |U_N^l|\} \right\},\forall m\ge 0,
    $$
    
    成立。

!!! proof "证明"
    
    $$
    U_j^{m+1} = \mu U_{j-1}^m + (1 - 2\mu)U_j^m + \mu U_{j+1}^m
    $$
    
    对等式两边取绝对值可得
    
    $$
    \begin{aligned}
        |U_j^{m+1}| &\leqslant \mu |U_{j-1}^m| + (1 - 2\mu)|U_j^m| + \mu |U_{j+1}^m|\\
        &\leqslant (\mu + 1 - 2\mu + \mu) \|U^m\|_\infty = \|U^m\|_\infty
    \end{aligned}
    $$

    于是有递推关系
    
    $$
    \|U^{m+1}\|_\infty \leqslant \max \{ \|U^m\|_\infty, |U_0^{m+1}|, |U_N^{m+1}| \}$$
    
    递推得：

    $$
    \max_{1\le j\le N-1} |U_j^m| \le \|U^m\|_\infty \leqslant \max \left\{ \max_{0 \leqslant i \leqslant N} |U_i^0|, \max_{0 < l \leqslant m} \max \{|U_0^l|, |U_N^l|\} \right\}.
    $$

!!! problem "5."
    取比较函数 $\Phi_j^m = t_m \|T\|_{\infty, \Omega_{t_{\max}}}$ 和 $\Psi_j^m = \frac{1}{2} x_j (1-x_j) \|T\|_{\infty, \Omega_{t_{\max}}}$，试证明：

    $$
    L_{(h,\tau)}(e-\Phi)_j^m \geqslant 0, \quad L_{(h,\tau)}(e-\Psi)_j^m \geqslant 0,
    $$

    $$
    \forall j = 1, 2, \cdots, N-1, \quad m \geqslant 0,
    $$

    这里 $h=1/N, L_{(h,\tau)}=\frac{\delta_x^2}{(\Delta x)^2}-\frac{\Delta_{+t}}{\Delta t}$ 。利用最大值原理进一步证明：当网格比 $\mu = \Delta t / (\Delta x)^2 \leqslant 1/2$ 时，误差方程
    
    $$
    \frac{e_j^{m+1}-e_j^m}{\tau}= \frac{e_{j-1}^m - 2e_j^m + e_{j+1}^m}{h^2} + T_j^m
    $$
    
    的解满足

    $$
    \begin{aligned}
    |e_j^m| \leqslant & \max_{0 \leqslant i \leqslant N} |e_i^0| + \max_{0 < l < m} \max \{|e_0^l|, |e_N^l|\} \\
    & + \min \left\{ t_m, \frac{1}{2} x_j (1-x_j) \right\} \|T\|_{\infty, \Omega_{t_{\max}}},
    \end{aligned}
    $$

    $$
    \forall j = 1, 2, \cdots, N-1, \quad m = 0, 1, \cdots, [t_{\max}/\tau].
    $$
!!! proof "证明"
    $L_{(h,\tau)} e_j^m = -T_j^m$。$L_{(h,\tau)} \Phi_j^m =-\frac{\Delta_{+t} \Phi_j^m}{\tau} = -\|T\|_{\infty, \Omega_{t_{\max}}}$，$L_{(h,\tau)} \Psi_j^m =\frac{\delta_x^2 \Psi_j^m}{h^2} =- \|T\|_{\infty, \Omega_{t_{\max}}}$，故
    
    $$L_{(h,\tau)}(e-\Phi)_j^m =L_{(h,\tau)}(e-\Psi)_j^m = \|T\|_\infty - T_j^m\geqslant 0$$

    记 $E^m = \max \{ \max_{0 \leqslant i \leqslant N} |e_i^0|, \max_{0 < l < m} \max \{|e_0^l|, |e_N^l|\} \}$。构造辅助函数 $W_j^m = E^m + \Phi_j^m \pm e_j^m$。则有 
    
    $$L_{(h,\tau)} (E^m + \Phi_j^m \pm e_j^m) = 0 - \|T\|_\infty \mp (-T_j^m) \leqslant 0$$
    
    带入 $W_j^m$ 的显式递推关系：$W_j^{m+1} \geqslant \mu W_{j-1}^m + (1-2\mu)W_j^m + \mu W_{j+1}^m$。当 $\mu \leqslant 1/2$ 时，右端系数皆为非负。由于 $W_j^0 = E^0 \pm e_j^0 \geqslant 0$，且在边界上 $W_{0,N}^l = E^l + \Phi_{0,N}^l \pm e_{0,N}^l \geqslant E^l - |e_{0,N}^l| \geqslant 0$，故 $W_j^m \geqslant 0$，这意味着 $|e_j^m| \leqslant E^m + \Phi_j^m$。

    同理可得 $|e_j^m| \leqslant E^m + \Psi_j^m$。

!!! problem "6."
    设应用显式格式求解模型问题的局部截断误差满足

    $$
    |T_j^m| \leqslant C(1-\alpha\tau)^m, \quad \forall j=1, 2, \cdots, N-1, \, m \geqslant 0,
    $$

    其中 $\alpha > 0, C > 0$ 是常数。取形如 $\Psi_j^m = A(1-\alpha\tau)^m x_j (1-x_j)$ ($A$ 为待定常数) 的比较函数，试在 $\alpha\tau < 1, \alpha < 8$ 和 $\mu \leqslant 1/2$ 的条件下导出误差估计

    $$
    |e_j^{m+1}| \leqslant K(1-\alpha\tau)^m x_j (1-x_j), \quad \forall j=1, 2, \cdots, N-1, \, m \geqslant 0,
    $$

    并用 $C$ 将常数 $K$ 表出。
!!! proof "证明"
    $$
    \begin{aligned}
        |e_j^{m+1}| &=| \mu e_{j-1}^m + (1-2\mu)e_j^m + \mu e_{j+1}^m + \tau T_j^m|\\
        \leqslant & |\mu e_{j-1}^m| + |(1-2\mu)e_j^m| + |\mu e_{j+1}^m| + |\tau T_j^m|
    \end{aligned}
    $$
    
    假设$|e_j^m| \leqslant K(1-\alpha\tau)^{m-1} x_j(1-x_j)$ 成立，带入得
    
    $$
    \begin{aligned}
    \text{RHS} & \leqslant K(1-\alpha\tau)^{m-1} \left[ \mu x_{j-1}(1-x_{j-1}) + (1-2\mu)x_j(1-x_j) + \mu x_{j+1}(1-x_{j+1}) \right] + \tau C(1-\alpha\tau)^m \\
    & = K(1-\alpha\tau)^{m-1} [x_j(1-x_j) - 2\tau] + \tau C(1-\alpha\tau)^m
    \end{aligned}
    $$
    
    为了使 $|e_j^{m+1}| \leqslant K(1-\alpha\tau)^m x_j(1-x_j)$ 成立，只需

    $$
    K(1-\alpha\tau)^{m-1} [x_j(1-x_j) - 2\tau] + \tau C(1-\alpha\tau)^m \leqslant K(1-\alpha\tau)^m x_j(1-x_j)
    $$
    
    $$
    \Longleftrightarrow K [x_j(1-x_j) - 2\tau] + \tau C (1-\alpha\tau) \leqslant K(1-\alpha\tau) x_j(1-x_j)
    $$
    
    $$
    \Longleftrightarrow C(1-\alpha\tau) \leqslant K [2 - \alpha x_j(1-x_j)]
    $$
    
    取 $K$ 满足：

    $$
    K = \frac{4C}{8-\alpha}
    $$
    
    即可。
!!! problem "7."
    **结论 2.5**：设 $\{h_i\}_{i=1}^\infty$ 为给定的一族空间网格步长，$\lim_{i\to \infty} h_i = 0$，加密路径 $r$ 满足 $\mu_i = r(h_i)/h_i^2 \leqslant 1/2$。又设定义在 $(-1, 1) \times \mathbb{R}_+$ 上的方程 $u_t = u_{xx}$ 的周期初边值问题的解 $u$ 满足 $u_{xxxx} \in \mathbb{C}((-1,1) \times \mathbb{R}_+)$，且 $\int_0^{t_{\max}} \|u_{xxxx}(\cdot, t)\|_2 \, \mathrm{d}t < \infty$。则在网格尺度为 $(h_i, \tau_i = r(h_i))$ 的网格族上得到的显式差分格式
    
    $$
    U_j^{m+1} = (1-2\mu ) U_j^m + \mu (U_{j-1}^m + U_{j+1}^m)
    $$
    
    的相应初边值问题的差分逼近解序列 $\{U^{(i)}\}$ 在 $[-1,1] \times [0, t_{\max}]$ 上依 $\mathbb{L}^\infty[(0, t_{\max}); \mathbb{L}^2((-1,1))]$ 空间的范数收敛到模型问题的解 $u$，且收敛速度为 $O(h_i^2)$，即

    $$
    \max_{0 \leqslant m\tau_i \leqslant t_{\max}} \|e^{(i)m}\|_2 = O(h_i^2),
    $$

    其中 $e^{(i)m}$ 表示第 $i$ 个网格上第 $m$ 层的误差。

    **证明结论 2.5**。设 $\mu_i \equiv \mu \leqslant \frac{1}{2}$，证明：

    $$
    \lim_{i \to \infty} \left( \tau_i^{-1} \max_{0 \leqslant m\tau \leqslant t_{\max}} \|e^{(i)m}\|_2 \right) \leqslant \left( \frac{1}{2} + \frac{1}{12\mu} \right) \int_0^{t_{\max}} \|u_{xxxx}(\cdot, t)\|_2 \, \mathrm{d}t.
    $$

!!! proof "证明"

    $$
    e_j^{m+1} = e_j^m + \mu (e_{j-1}^m - 2e_j^m + e_{j+1}^m) + \tau T_j^m,
    $$

    考虑 $\mathbf{e}^m = (e_0^m, e_1^m, \cdots, e_{N-1}^m)^T$，$\mathbf{T}^m = (T_0^m, T_1^m, \cdots, T_{N-1}^m)^T$，以及差分算子矩阵 $S$ 满足

    $$
    \mathbf{e}^{m+1} = S \mathbf{e}^m + \tau \mathbf{T}^m,
    $$

    容易证明 $S$ 的谱半径 $\rho(S) \leqslant 1$，因此 $\|S\|_2 \leqslant 1$。对上式取 $L^2$ 范数，有

    $$
    \begin{aligned}
        \|e^{m+1}\|_2 &\leqslant \|S\|_2 \|e^m\|_2 + \tau \|T^m\|_2 \\
        &\leqslant \|e^m\|_2 + \tau \|T^m\|_2\\
        &\leqslant \cdots\\
        &\leqslant \|e^0\|_2 + \tau \sum_{k=0}^{m} \|T^k\|_2.
    \end{aligned}
    $$

    假设初始误差 $\|e^0\|_2 = 0$，则有：

    $$
    \|e^m\|_2 \leqslant \tau \sum_{k=0}^{m-1} \|T^k\|_2.
    $$

    利用 Taylor 展开，有：
    
    $$
    \begin{aligned}
        T_j^m &= \left( u_t + \frac{\tau}{2} u_{tt} \right) - \left( u_{xx} + \frac{h^2}{12} u_{xxxx} \right) + O(\tau^2 + h^4)\\
        &=\tau \left( \frac{1}{2} - \frac{1}{12\mu} \right) u_{xxxx}(x_j, t_m) + R_j^m.
    \end{aligned}    
    $$
    
    则

    $$
    \|T^k\|_2 \leqslant \tau \left( \frac{1}{2} + \frac{1}{12\mu} \right) \|u_{xxxx}(\cdot, t_k)\|_2.
    $$
    
    将此估计代入误差递推式：

    $$
    \|e^m\|_2 \leqslant \tau \sum_{k=0}^{m-1} \tau \left( \frac{1}{2} + \frac{1}{12\mu} \right) \|u_{xxxx}(\cdot, t_k)\|_2.
    $$
    
    即

    $$
    \tau^{-1} \|e^m\|_2 \leqslant \left( \frac{1}{2} + \frac{1}{12\mu} \right) \sum_{k=0}^{m-1} \|u_{xxxx}(\cdot, t_k)\|_2 \tau.
    $$
    
    当 $i \to \infty$ 时，上式右端的求和项正是积分 $\int_0^{t_m} \|u_{xxxx}(\cdot, t)\|_2 \, \mathrm{d}t$ 的黎曼和。由于 $u_{xxxx}$ 的范数可积，该黎曼和收敛于积分。取最大值 $\max_{0 \leqslant m\tau \leqslant t_{\max}}$ 并取极限，我们得到：

    $$
    \lim_{i \to \infty} \left( \tau_i^{-1} \max_{0 \leqslant m\tau \leqslant t_{\max}} \|e^{(i)m}\|_2 \right) \leqslant \left( \frac{1}{2} + \frac{1}{12\mu} \right) \int_0^{t_{\max}} \|u_{xxxx}(\cdot, t)\|_2 \, \mathrm{d}t.
    $$

!!! problem "8."
    **结论 2.6**：设定义在 $(-1, 1) \times \mathbb{R}_+$ 上的方程 $u_t = u_{xx}$ 的周期初边值问题的初值 $u^0$ 可展开成 Fourier 级数 $u^0(x) = \sum_{k=-\infty}^{\infty} a_k e^{ik\pi x}$，且有 $\sum_{k=-\infty}^{\infty} |a_k| < \infty$，又设 $U$ 是显式差分格式

    $$
    U_j^{m+1} = (1-2\mu ) U_j^m + \mu (U_{j-1}^m + U_{j+1}^m)
    $$

    的相应初边值问题的解，则当网格比 $\mu \leqslant \frac{1}{2}$ 时，对任给的 $t_{\max} > 0$，都有

    $$
    \lim_{\tau \to 0} \|e\|_{\infty, \Omega_{t_{\max}}} = 0.
    $$

!!! proof "证明"
    利用 Fourier 级数展开，误差可写为：

    $$
    e_j^m = \sum_{k=-\infty}^{\infty} a_k e^{ik\pi j h} \left( \lambda_k^m - e^{-k^2 \pi^2 m \tau} \right).
    $$
    
    其中 $\lambda_k = 1 - 4\mu \sin^2 \frac{k\pi h}{2}$ 是差分算子的特征值。取绝对值有
    
    $$|e_j^m| \leqslant \sum_{k=-\infty}^{\infty} |a_k| \cdot \left| \lambda_k^m - e^{-k^2 \pi^2 m \tau} \right|$$
    
    由于稳定性条件 $\mu \leqslant 1/2$ 成立，此时 $|\lambda_k| \leqslant 1$，对于高频部分，

    $$
    \sum_{|k|>K} |a_k| \cdot \left| \lambda_k^m - e^{-k^2 \pi^2 m \tau} \right| \leqslant \sum_{|k|>K} |a_k| \cdot 2
    $$

    由于已知 $\sum |a_k| < \infty$，故对于任给的 $\epsilon > 0$，存在充分大的整数 $K$，使得高频部分的尾项和满足 $\sum_{|k|>K} |a_k| < \epsilon/4$。于是，高频部分的误差贡献被控制在 $\sum_{|k|>K} |a_k| \cdot 2 < \epsilon/2$ 以内。
    
    对于低频部分，存在只依赖于 $\mu$ 的常数 $C(\mu)$ 使得：

    $$
    \begin{aligned}
        \left| \lambda_k^m - e^{-k^2 \pi^2 m \tau} \right| \leqslant m \left| \lambda_k - e^{-k^2 \pi^2 \tau} \right| &= m \left| 1 - 4\mu \sin^2 \frac{k\pi \sqrt{\tau}}{2\sqrt{\mu}} - e^{-k^2 \pi^2 \tau} \right|\\
        &\leqslant m C(\mu) k^4 \tau^2\le t_{\max} C(\mu) k^4 \tau.
    \end{aligned}
    $$

    于是，低频部分的误差和满足：

    $$
    \sum_{|k|\leqslant K} |a_k| \left| \lambda_k^m - e^{-k^2 \pi^2 m \tau} \right| \leqslant \tau \cdot t_{\max} C(\mu) \sum_{|k|\leqslant K} |a_k| k^4.
    $$
    由于 $K$ 是固定的有限数，上式右端的求和项是有限值。因此存在 $\tau_0 > 0$，使得当 $\tau < \tau_0$ 时，低频部分误差小于 $\epsilon/2$。

    综上所述，当 $\tau$ 充分小时，总误差 $\|e\|_{\infty, \Omega_{t_{\max}}} < \epsilon/2 + \epsilon/2 = \epsilon$。
!!! problem "9."
    分别画出 Richardson 格式
    
    $$
    \frac{U_j^{m+1} - U_j^{m-1}}{2\tau} = \frac{U_{j-1}^m - 2U_j^m + U_{j+1}^m}{h^2}
    $$
    
    和 Du Fort-Frankel 格式
    
    $$
    \frac{U_j^{m+1} - U_j^{m-1}}{2\tau} = \frac{U_{j-1}^m - (U_j^{m+1} + U_j^{m-1}) + U_{j+1}^m}{h^2}
    $$
    
    的模板。利用 Taylor 展开式计算出 Du Fort-Frankel 格式的局部截断误差主项的表达式，给出并证明格式相容性的条件。

!!! problem "9."
    Du Fort-Frankel 格式的差分算子形式为：

    $$
    L_{h,\tau}u = \frac{u(x, t+\tau) - u(x, t-\tau)}{2\tau} - \frac{u(x-h, t) - [u(x, t+\tau) + u(x, t-\tau)] + u(x+h, t)}{h^2}
    $$

    在点 $(x, t)$ 处进行 Taylor 展开：
    
    $$
    \frac{u(x, t+\tau) - u(x, t-\tau)}{2\tau} = u_t + \frac{\tau^2}{6} u_{ttt} + O(\tau^4)
    $$
    
    $$
    u(x, t+\tau) + u(x, t-\tau) = 2u + \tau^2 u_{tt} + O(\tau^4)
    $$

    $$
    u(x-h, t) + u(x+h, t) = 2u + h^2 u_{xx} + \frac{h^4}{12} u_{xxxx} + O(h^6)
    $$

    代入得：

    $$
    \begin{aligned}
    L_{h,\tau}u &= \left( u_t + \frac{\tau^2}{6} u_{ttt} \right) - \frac{(2u + h^2 u_{xx} + \frac{h^4}{12} u_{xxxx}) - (2u + \tau^2 u_{tt})}{h^2} + O(\tau^4+h^4+\tau^4/h^2) \\
    &= u_t + \frac{\tau^2}{6} u_{ttt} - \left( u_{xx} + \frac{h^2}{12} u_{xxxx} - \frac{\tau^2}{h^2} u_{tt} \right) + O(\tau^4+h^4+\tau^4/h^2) \\
    &= (u_t - u_{xx}) + \frac{\tau^2}{h^2} u_{tt} - \frac{h^2}{12} u_{xxxx} + \frac{\tau^2}{6} u_{ttt} + O(\tau^4+h^4+\tau^4/h^2)\\
    &=\left( \frac{\tau^2}{h^2} - \frac{h^2}{12} \right) u_{tt} + O(\tau^2+h^4+\tau^4/h^2)
    \end{aligned}
    $$
    
    因此，局部截断误差的主项为：

    $$
    T_j^m = \left( \frac{\tau^2}{h^2} - \frac{h^2}{12} \right) u_{tt}
    $$

    容易看出 Du Fort-Frankel 格式相容的充要条件是 $\tau \to 0$ 时，$\frac{\tau}{h} \to 0$。

!!! problem "10."
    证明：对任意的网格比 $\mu > 0$，差分方程 $(2.2.51)$ 的解都满足最大值原理，且隐式格式 $(2.2.44)$ 的逼近误差满足式 $(2.2.53)$。

!!! problem "11."
    参照关于显式差分格式 $(2.2.8)$ 的结论 $2.1 \sim 2.6$，根据 $\S 2.2$ 的分析结果，总结陈述关于隐式差分格式 $(2.2.44)$ 的相应结论。

!!! problem "12."
    参照关于显式差分格式 $(2.2.8)$ 的结论 $2.1 \sim 2.6$，根据 $\S 2.2$ 的分析结果，总结陈述关于 Crank-Nicolson 格式 $(2.2.56)$ 的相应结论。

!!! problem "13."
    证明 $\theta$ 格式 $\mathbb{L}^2$ 和 $\mathbb{L}^\infty$ 稳定的充分必要条件分别是式 $(2.2.63)$ 和 $(2.2.65)$。

!!! problem "14."
    证明 $\theta$ 格式 $(2.2.61)$ 的局部截断误差满足式 $(2.2.66)$。

!!! problem "15."
    证明方程 $(2.3.10)$ 的 $\theta$ 格式 $(2.3.11)$ 的局部截断误差满足式 $(2.3.8)$，且当式 $(2.3.9)$ 成立时，$\theta$ 格式 $(2.3.11)$ 在区域 $\bar{\Omega}_{t_{\max}}$ 上满足最大值原理。

!!! problem "16."
    对于方程 $(2.3.13)$，设系数 $a(u)$ 的一阶导数 $a'$ 和真解 $u$ 的二阶导数 $u_{xx}$ 有界，又设式 $(2.3.15)$ 成立，试证明方程 $(2.3.13)$ 的显式格式 $(2.3.14)$ 的逼近解 $U$ 在指定时刻 $t_{\max}$ 之内有形如 $e^{Kt_{\max}}(C_1 \|e^0\|_\infty + C_2 \|T\|_\infty)$ 的用初始误差 $e^0$ 和局部截断误差 $T$ 表示的整体误差上界，并估算出常数 $K, C_1, C_2$。

!!! problem "17."
    证明格式 $(2.3.29)$ 和 $(2.3.30)$ 等价于格式 $(2.3.31)$ 和 $(2.3.33)$。

!!! problem "18."
    在模型问题 $(2.2.1) \sim (2.2.3)$ 中，将 $x=0$ 处的 Dirichlet 边界条件换为第三类边界条件 $(2.3.35)$。设用向前差分显式格式 $(2.2.8)$ 逼近方程 $(2.2.1)$，用边界条件 $(2.3.36)$ 逼近边界条件 $(2.3.35)$。试证明：当网格比 $\mu \leqslant 1/2$ 时，格式的整体误差仍然是 $O(\tau + h^2)$。

!!! problem "19."
    在模型问题 $(2.2.1) \sim (2.2.3)$ 中，将 $x=0$ 处的 Dirichlet 边界条件换为第三类边界条件 $(2.3.35)$，试建立将 $\theta$ 格式分别与逼近边界条件 $(2.3.36)$, $(2.3.47)$ 和 $(2.3.55)$ 结合后的等价差分格式与误差方程，分析局部截断误差和满足最大值原理的条件。

!!! problem "20."
    试将方程 $u_t = a u_{xx}$ ($a$ 为常数) 的 $\theta$ 格式写成守恒型的有限体积格式。

!!! problem "21."
    用 $\theta$ 格式数值求解 $(0,1) \times \mathbb{R}_+$ 上方程 $u_t = a u_{xx}$ ($a$ 为常数) 的具有 Neumann 边界条件的初边值问题。试给出能保证数值解在每个整时间步上与连续问题解具有相同总热量的离散初值和边界热通量的取法。

!!! problem "22."
    证明 ADI 格式 $(2.4.27)$ 的等价单步格式为 $(2.4.25)$，其中的高阶项由式 $(2.4.30)$ 给出，并证明格式是无条件 $\mathbb{L}^2$ 稳定的，局部截断误差为 $O(\tau^2 + h_x^2 + h_y^2 + h_z^2)$。