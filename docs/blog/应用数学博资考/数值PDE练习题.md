---
date: 2026-2-7
hide:
  - navigation # 隐藏侧边栏，让目录卡片居中显示
  - toc
---
## 数值 PDE
!!! problem "Autumn, 2023"
    For the equation $u_{t}+au_{xxx}=0$ ($a$ is a constant), applying the idea of the Lax-Friedrichs scheme, one can get the scheme
    
    $$
    u_{m}^{n+1}=\frac{1}{2}(u_{m+1}^{n}+u_{m-1}^{n})-\frac{1}{2}akh^{-3}(u_{m+2}^{n}-2u_{m+1}^{n}+2u_{m-1}^{n}-u_{m-2}^{n}),
    $$
    
    where $k$ and $h$ represent the time step and mesh size, respectively.
    
    (1). Give the leading order term of local truncation error.
    
    (2). Analyze the stability of this scheme.
!!! proof "证明"
    $(1)$：由 Taylor 展开可得

    $$
    T_m^n = \frac{k}{2} u_{tt} - \frac{h^2}{2k} u_{xx} + O(h^2 + k^2 + \frac{h^4}{k})
    $$

    $(2)$：设 $u_m^n = G^n e^{i m kh}$，代入差分方程得到特征方程

    $$
    G=\cos(kh)-i a k h^{-3} \sin(kh)(2\cos (kh)-2).
    $$

    $|G|\le 1$ 等价于 $|a| k h^{-3} |2\cos (kh)-2| \le 1$，进一步给出 $|a| k h^{-3}  \le \frac{1}{4}$。
!!! problem "Spring, 2024"
    Apply the following three-step method with a parameter $\theta \ge 0$ for solving the heat equation $u_{t}-a^{2}u_{xx}=0$ (Cauchy or periodic problem):
    
    $$
    (1+\theta)\frac{u_{j}^{n+1}-u_{j}^{n}}{k} - \theta\frac{u_{j}^{n}-u_{j}^{n-1}}{k} = a^{2}\frac{u_{j+1}^{n+1}-2u_{j}^{n+1}+u_{j-1}^{n+1}}{h^{2}}
    $$
    
    Give its truncation error and stability. Particularly, give the value of $\theta$ such that the truncation error attains its highest order.
!!! proof "证明"
    计算得截断误差

    $$
    T_j^n = \left( \theta -\frac{1}{2}\right) k u_{tt}-\frac{h^2}{12a^2}u_{tt}+O(k^2+h^4).
    $$

    该格式的截断误差一般情况下为 $O(k + h^2)$。当 $\theta = \frac{1}{2}$ 时，截断误差的 $O(k)$ 项被消除，此时截断误差为 $O(k^2 + h^2)$，达到了最高阶。

    对于稳定性分析，设 $u_j^n = G^n e^{i j h \xi}$，代入差分方程得到：

    $$
    (1+\theta-A)G^2-(1+2\theta)G+\theta=0
    $$

    这里 $A = -4 a^2 k \sin^2\left(\frac{h\xi}{2}\right)/h^2$。容易证明该二次方程的两个根的模长都不大于 $1$，因此该方法无条件稳定。
!!! problem "Spring, 2024"
    Denote the grid $I_{h}=\{x_{j}\}_{j=0}^{M}$, $x_{0} < x_{1} < ... < x_{M}$. Set $u=\{u_{j}\}_{j=0}^{M}$ as a grid function on $I_{h}$. Suppose:
    
    $$
    Lu_{j} = -(a_{j}u_{j-1} - b_{j}u_{j} + c_{j}u_{j+1}) + q_{j}u_{j}, \quad j=1,...,M-1,
    $$
    
    where $a_{j}, b_{j}, c_{j} > 0$, $q_{j} \ge 0$ and $a_{j}+c_{j} \le b_{j}$.
    
    (i) Assume $Lu_{j} \le 0$ for all $1 \le j \le M-1$. Show that $u_{j}$ can't attain positive maximum at inner points $(1 \le j \le M-1)$ unless $u_{j} \equiv C$.
    
    (ii) Suppose $d_{j} = b_{j}-a_{j}-c_{j}+q_{j} > 0$ $(j=1,...,M-1)$. Show the solution of the difference equation
    
    $$
    Lu_{j} = \varphi_{j}, \quad j=1,...,M-1; \quad u_{0}=u_{M}=0
    $$
    
    satisfies $||u||_{\infty} = \max_{j}|u_{j}| \le \max_{j}\frac{|\varphi_{j}|}{d_{j}}$.
!!! proof "证明"
    $(i)$：反证法即可。
    
    $(ii)$：取 $|u_k|=\max_j |u_j|$，由绝对值不等式易得 $|u_k|\le \frac{|\varphi_k|}{d_k}\le \max_j \frac{|\varphi_j|}{d_j}$。
!!! problem "Autumn, 2024"
    For the system
    
    $$
    u_{t}=v_{x},
    $$
    
    $$
    v_{t}=u_{x},
    $$
    
    analyze the truncation error and stability of the scheme
    
    $$
    \frac{1}{\tau}\left(u_{j}^{n+1}-\frac{1}{2}(u_{j+1}^{n}+u_{j-1}^{n})\right)=\frac{1}{2h}(v_{j+1}^{n}-v_{j-1}^{n}),
    $$
    
    $$
    \frac{1}{\tau}\left(v_{j}^{n+1}-\frac{1}{2}(v_{j+1}^{n}+v_{j-1}^{n})\right)=\frac{1}{2h}(u_{j+1}^{n}-u_{j-1}^{n}).
    $$
!!! proof "证明"
    设 $U=\begin{pmatrix} u \\ v \end{pmatrix}$，则条件可写为

    $$
    U_t=AU_x
    $$

    其中 $A=\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$。格式可写为

    $$
    \frac{1}{\tau}\left(U_j^{n+1}-\frac{1}{2}(U_{j+1}^n + U_{j-1}^n)\right) = \frac{1}{2h} A (U_{j+1}^n - U_{j-1}^n)
    $$

    计算得到截断误差

    $$
    T_j^n=(\frac{\tau}{2}-\frac{h^2}{2\tau })U_{xx}+O(\tau^2+h^4/\tau).
    $$

    稳定性：设 $U_j^n=\hat{U}^n e^{i k j h}$，代入差分方程解得

    $$
    \hat{U}=\cos (kh)+i\sin (kh) \frac{\tau}{h}A
    $$

    故 $\hat{U}$ 的特征值为 $\cos (kh) \pm i\sin (kh) \frac{\tau}{h}$，模长为 $\sqrt{\cos^2(kh)+\sin^2(kh)\frac{\tau^2}{h^2}}$。因此该方法稳定的条件是 $\frac{\tau}{h} \le 1$。
!!! problem "Autumn, 2024"
    Write and prove the maximum principle of the centered finite difference scheme for discretizing the equation
    
    $$
    u_{xx}+u_{yy}+d(x,y)u_{x}+e(x,y)u_{y}+f(x,y)u=0, \quad f<0
    $$
    
    under some suitable assumptions.

!!! proof "证明"
    设求解区域为 $\Omega$，采用均匀网格进行离散，步长为 $h$。记网格点为 $(x_i, y_j)$，其中 $x_i = i h, y_j = j h$。令 $U_{i,j}$ 为精确解 $u(x_i, y_j)$ 的数值近似，并记 $d_{i,j} = d(x_i, y_j)$，依次类推。对各阶导数使用二阶中心差分进行近似： 
    
    $$
    u_{xx} \approx \frac{U_{i-1,j} - 2U_{i,j} + U_{i+1,j}}{h^2}, u_{yy} \approx \frac{U_{i,j-1} - 2U_{i,j} + U_{i,j+1}}{h^2}
    $$
    
    $$
    u_x \approx \frac{U_{i+1,j} - U_{i-1,j}}{2h}, u_y \approx \frac{U_{i,j+1} - U_{i,j-1}}{2h}
    $$
    
    将上述近似代入整理后得到：
    
    $$
    \left(1 - \frac{h}{2}d_{i,j}\right) U_{i-1,j} + \left(1 + \frac{h}{2}d_{i,j}\right) U_{i+1,j} + \left(1 - \frac{h}{2}e_{i,j}\right) U_{i,j-1} + \left(1 + \frac{h}{2}e_{i,j}\right) U_{i,j+1} + (h^2 f_{i,j} - 4) U_{i,j} = 0
    $$
    
    为了后续分析方便，我们定义如下系数：
    
    $$
    C_W = 1 - \frac{h}{2}d_{i,j}, C_E = 1 + \frac{h}{2}d_{i,j}, C_S = 1 - \frac{h}{2}e_{i,j}, C_N = 1 + \frac{h}{2}e_{i,j}, C_0 = 4 - h^2 f_{i,j}
    $$
    
    则：
    
    $$
    C_0 U_{i,j} = C_W U_{i-1,j} + C_E U_{i+1,j} + C_S U_{i,j-1} + C_N U_{i,j+1}$$
    
    中心差分格式的系数必须满足非负性条件
    
    $$
    C_W,  C_E , C_S,  C_N \ge 0
    $$
    
    这意味着我们需要满足网格 Péclet 数限制：
    
    $$
    \frac{h}{2} |d(x,y)| \le 1 \quad \text{且} \quad \frac{h}{2} |e(x,y)| \le 1
    $$
    
    即假设步长满足：$h \le \min \left( \frac{2}{\|d\|_\infty}, \frac{2}{\|e\|_\infty} \right)$。 同时，注意到邻居系数之和为常数：
    
    $$
    C_W + C_E + C_S + C_N = 4
    $$
    
    由于题目已知 $f < 0$，因此中心系数 $C_0$ 满足： 
    
    $$
    C_0 = 4 - h^2 f_{i,j} > 4
    $$
    
    离散极值原理：
    假设上述非负性条件成立，且 $f(x,y) < 0$。如果网格函数 $U_{i,j}$ 在内部网格点满足上述离散差分方程，那么 $U_{i,j}$ 的最大值必定在边界 $\partial \Omega_h$ 上取得：

    $$
    \max_{\Omega_h \cup \partial \Omega_h} U_{i,j} \le \max \left( 0, \max_{\partial \Omega_h} U_{i,j} \right)
    $$
    
    采用反证法。假设网格函数 $U$ 在区域内部的某一点 $(i_0, j_0)$ 取得了全局严格正的最大值 $M$。即：
    
    $$
    U_{i_0, j_0} = M > 0
    $$
    
    并且对于所有网格点，都有 $U_{i,j} \le M$。将该点代入我们的离散格式中：
    
    $$
    C_0 M = C_W U_{i_0-1, j_0} + C_E U_{i_0+1, j_0} + C_S U_{i_0, j_0-1} + C_N U_{i_0, j_0+1}
    $$
    
    $$
    C_0 M=C_W U_{i_0-1, j_0} + C_E U_{i_0+1, j_0} + C_S U_{i_0, j_0-1} + C_N U_{i_0, j_0+1} \le (C_W + C_E + C_S + C_N) M\le 4 M
    $$
    
    即

    $$
    C_0 M \le 4 M
    $$
    
    由于 $C_0 = 4 - h^2 f_{i_0, j_0}$ 且 $f_{i_0, j_0} < 0$，因此 $C_0 > 4$。这与上式矛盾，因此我们的反证假设不成立。即最大值不可能在内部取得，而必须在边界上取得。
!!! problem "Spring, 2025"
    $$
    u_{j}^{n+1}=-\frac{1}{2}\nu(1-\nu)u_{j+1}^{n}+(1-\nu^{2})u_{j}^{n}+\frac{1}{2}\nu(1+\nu)u_{j-1}^{n},
    $$
    
    where $\nu=a\tau/h$.
    
    (i) For the Cauchy problem imposed on the real line, show that
    
    $$
    ||u^{n+1}||_{2}^{2}=||u^{n}||_{2}^{2}-\frac{1}{2}\nu^{2}(1-\nu^{2})(||\delta_{x}^{+}u^{n}||_{2}^{2}-\langle\delta_{x}^{+}u^{n},\delta_{x}^{-}u^{n}\rangle),$$
    
    where $||v||_{2}^{2}=\sum_{j}|v_{j}|^{2}$, $\langle v,w\rangle=\sum_{j}v_{j}w_{j}$, $\delta_{x}^{-}v_{j}=v_{j}-v_{j-1}$, $\delta_{x}^{+}v_{j}=v_{j+1}-v_{j}$.
    
    (ii) Suppose $a>0$ for the problem imposed on $(0,1)$ with homogeneous boundary condition at $x=0$ (i.e., $u_{0}^{n}=0$), give a simple numerical boundary condition for $x=1$ such that the Lax-Wendroff scheme is stable.
!!! proof "证明"
    $(i)$：纯计算。

    $(ii)$：在边界点 $x_N = 1$ 处，放弃中心差分的 Lax-Wendroff 格式，改用一阶迎风格式：
    
    $$
    u_N^{n+1} = u_N^n - \nu (u_N^n - u_{N-1}^n)
    $$
    
    当 $a>0$ 时，迎风格式是稳定的（只要 CFL 条件 $\nu \le 1$ 满足），且只利用了左侧的信息 $u_N, u_{N-1}$，符合特征线把信息从内部传向边界的物理事实，不会引入错误的反向波。计算量小，易于实现。
!!! problem "Spring, 2025"
    For the system
    
    $$
    u_{t}=-v_{x},
    $$
    
    $$
    v_{t}=u_{xx},
    $$
    
    analyze the truncation error and stability of the scheme
    
    $$
    \frac{u_{j}^{n+1}-u_{j}^{n}}{\tau}=-\frac{1}{2h^{2}}(v_{j+1}^{n}-2v_{j}^{n}+v_{j-1}^{n}+v_{j+1}^{n+1}-2v_{j}^{n+1}+v_{j-1}^{n+1}),
    $$
    
    $$
    \frac{v_{j}^{n+1}-v_{j}^{n}}{\tau}=\frac{1}{2h^{2}}(u_{j+1}^{n}-2u_{j}^{n}+u_{j-1}^{n}+u_{j+1}^{n+1}-2u_{j}^{n+1}+u_{j-1}^{n+1}).
    $$
!!! proof "证明"
    由 Taylor 展开

    $$
    \frac{u_{j}^{n+1}-u_{j}^{n}}{\tau}=u_{t}+\frac{\tau}{2}u_{tt}+O(\tau^{2}),
    $$

    $$
    \frac{v_{j+1}^{n}-2v_{j}^{n}+v_{j-1}^{n}}{2h^2}=\frac{1}{2}v_{xx}+O(h^2),
    $$

    $$
    \frac{v_{j+1}^{n+1}-2v_{j}^{n+1}+v_{j-1}^{n+1}}{2h^2}=\frac{1}{2}v_{xx}+\frac{\tau}{2}v_{xxt}+O(\tau^2+h^2).
    $$

    因此截断误差为 $u_t+ \frac{\tau}{2}u_{tt} +v_{xx} + \frac{\tau}{2}v_{xxt} + O(\tau^2+h^2)$。由条件有 $u_t+v_{xx}=0$，$u_{tt}+v_{xxt}=0$，因此截断误差为 $O(\tau^2+h^2)$。因此该格式对时间和空间都具有二阶精度。第二个格式同理。

    对于稳定性分析，设 $u_j^n = U^n e^{i k j h}$，$v_j^n = V^n e^{i k j h}$，代入差分方程有

    $$
    \frac{U^{n+1} - U^n}{\tau} = -\frac{1}{2} (-S) (V^n + V^{n+1}) = \frac{S}{2} (V^n + V^{n+1})
    $$
    
    $$
    \frac{V^{n+1} - V^n}{\tau} = \frac{1}{2} (-S) (U^n + U^{n+1}) = -\frac{S}{2} (U^n + U^{n+1})
    $$

    其中 $S=\frac{4}{h^2} \sin^2\left(\frac{k h}{2}\right)$。设 $\mu=\frac{\tau S}{2} = \frac{2\tau}{h^2} \sin^2\left(\frac{kh}{2}\right)$。整理为矩阵形式：
    
    $$
    \begin{pmatrix} U^{n+1} \\ V^{n+1} \end{pmatrix} - \begin{pmatrix} U^n \\ V^n \end{pmatrix} = \mu \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix} \left( \begin{pmatrix} U^{n+1} \\ V^{n+1} \end{pmatrix} + \begin{pmatrix} U^n \\ V^n \end{pmatrix} \right)
    $$

    设 $W^n = \begin{pmatrix} U^n \\ V^n \end{pmatrix}$，则上式可写为

    $$
    W^{n+1} - W^n = \mu J (W^{n+1} + W^n)
    $$

    也就是

    $$
    W^{n+1} = (I - \mu J)^{-1} (I + \mu J) W^n
    $$

    由于 $J$ 的特征值为 $\pm i$，因此 $(I - \mu J)^{-1} (I + \mu J)$ 的特征值为 $\frac{1 + i \mu}{1 - i \mu}$ 和 $\frac{1 - i \mu}{1 + i \mu}$，它们的模长均为 $1$。因此该方法无条件稳定。

!!! problem "Autumn, 2025"
    Construct the Du Fort-Frankel scheme for the diffusion equation in 2D $u_t = u_{xx} + u_{yy}$ and discuss its consistency and stability.

!!! proof "证明"

    $$
    \frac{u_{i,j}^{n+1} - u_{i,j}^{n-1}}{2\tau} = \frac{u_{i+1,j}^n - \left(u_{i,j}^{n+1} + u_{i,j}^{n-1}\right) + u_{i-1,j}^n}{h^2} + \frac{u_{i,j+1}^n - \left(u_{i,j}^{n+1} + u_{i,j}^{n-1}\right) + u_{i,j-1}^n}{h^2}$$
    
    设 $\Delta x = \Delta y = h$，网格比 $r = \frac{\tau}{h^2}$：

    $$
    u_{i,j}^{n+1} = \frac{1 - 4r}{1 + 4r} u_{i,j}^{n-1} + \frac{2r}{1 + 4r} (u_{i+1,j}^n + u_{i-1,j}^n + u_{i,j+1}^n + u_{i,j-1}^n)
    $$

    相容性：由 Taylor 展开可得

    $$
    LHS=u_t+\frac{\tau^2}{6}u_{ttt}+O(\tau^4)
    $$

    $$
    RHS=u_{xx}+u_{yy}-\frac{\tau^2}{h^2}u_{tt}\cdot 2+O(h^2)
    $$

    故截断误差

    $$
    LHS-RHS=O(\tau^2+h^2+\frac{\tau^2}{h^2}).
    $$

    若 $\frac{\tau^2}{h^2}\to 0$，则该方法相容。否则，该方法不相容。

    稳定性：设 $u_{i,j}^n = \xi^n e^{i(k_x i h + k_y j h)}$，代入差分方程，得到特征方程

    $$
    (1 + 4r) \xi^2 - 4r\alpha \xi - (1 - 4r) = 0
    $$

    其中 $r=\frac{\tau}{h^2}$，$\alpha = \cos(k_x h) + \cos(k_y h)$。我们需要两根 $\|\xi_{1,2}\|\leq 1$。容易验证这是无条件稳定的。

!!! problem "Autumn, 2025"
    For the wave equation $u_{tt} = u_{xx}$, analyze the stability of the scheme
    
    $$
    \frac{u_j^{n+1} - 2u_j^n + u_j^{n-1}}{\tau^2} = \frac{u_{j+1}^{n+1} - 2u_j^{n+1} + u_{j-1}^{n+1}}{4h^2} + \frac{u_{j+1}^n - 2u_j^n + u_{j-1}^n}{2h^2} + \frac{u_{j+1}^{n-1} - 2u_j^{n-1} + u_{j-1}^{n-1}}{4h^2}.
    $$

!!! proof "证明"
    由 von Neumann 分析，设 $u_j^n = \xi^n e^{i k j h}$，代入上式得到特征方程

    $$
    \xi+\frac{1}{\xi}-2=\frac{a^2}{4}\xi (e^{i k h}+e^{-i k h}-2)+\frac{a^2}{2}(e^{i k h}+e^{-i k h}-2)+\frac{a^2}{4}\frac{1}{\xi}(e^{i k h}+e^{-i k h}-2),
    $$

    即

    $$
    \frac{(\xi-1)^2}{(\xi+1)^2}=\frac{a^2}{4}(e^{i k h}+e^{-i k h}-2)=-a^2 \sin^2\left(\frac{k h}{2}\right).
    $$

    解得 $\xi =\frac{1 \pm i I}{1 \mp i I}$，其中 $I = a \sin\left(\frac{k h}{2}\right)$。由于 $\|\xi\|=1$，所以该方法无条件稳定。
!!! problem "2019T"
    **Problem 1.** Consider the following problems.
    * (i) Determine the order of Störmer's method,
    
        $$
        y_{n+2}-2y_{n+1}+y_{n}=h^{2}f(t_{n+1},y_{n+1}),\quad n\geq 0,
        $$
    
        for solving the second order system of ODE's
    
        $$
        y^{\prime\prime}=f(t,y),\quad t\geq 0,
        $$
    
        with the initial conditions $y(0)=y_{0}$ and $y^{\prime}(0)=y_{0}^{\prime}$.
    * (ii) Using the second order central differences in space and Störmer's method in time, construct a scheme to solve the wave equation,
    
        $$
        u_{tt}=u_{xx}.
        $$
    * (iii) Determine the condition for its stability.

!!! proof "证明"
    

!!! problem "2019I"
    **Problem 2.** Consider Richardson's difference scheme for the heat equation $u_t = u_{xx}$:
    
    $$
    \frac{1}{2k}(u(x,t+k)-u(x,t-k))=\frac{1}{h^{2}}(u(x-h,t)-2u(x,t)+u(x+h,t)).
    $$
    
    * (i) Show that this scheme has second-order truncation error.
    * (ii) Use either ODE principles or von Neumann analysis to show that this scheme is unconditionally unstable.
    * (iii) Demonstrate a minor modification of the left-side of Richardson's scheme that yields a familiar unconditionally stable scheme and prove it.

---

!!! problem "2018T"
    **Problem 3.** For the one-way wave equation
    
    $$
    u_{t}+au_{x}=f,
    $$
    
    consider the multistep scheme given by
    
    $$
    \frac{3u_{m}^{n+1}-4u_{m}^{n}+u_{m}^{n-1}}{2k}+a\frac{u_{m+1}^{n+1}-u_{m-1}^{n+1}}{2h}=f_{m}^{n+1}.
    $$
    
    * (i) Show that the scheme is second order accurate.
    * (ii) Show that the scheme is unconditionally stable.
    
    **Hint:** (1) apply von Neumann analysis to the scheme with $f\equiv 0$ and find the characteristic polynomial. (2) show that for all $k,h$, the characteristic polynomial satisfies the root condition: all roots reside in the unit disk, and all roots on the unit circle are simple. (3) for a root $r$ of the characteristic polynomial, it would be more convenient to study the form $\frac{1}{r}=X+iY$ and prove that $X^{2}+Y^{2}\geq 1$.

---

!!! problem "2018I"
    **Problem 4.** We consider the following convection-diffusion equation
    
    $$
    u_{t}+au_{x}=bu_{xx},\quad 0\leq x<1
    $$
    
    with an initial condition $u(x,0)=f(x)$ and periodic boundary condition, where $a$ and $b>0$ are constants. The first order IMEX (implicit-explicit) time discretization and second order central spatial discretization are used to give the following scheme:
    
    $$
    \frac{u_j^{n+1}-u_j^n}{\Delta t}+a\frac{u_{j+1}^n-u_{j-1}^n}{2\Delta x}=b\frac{u_{j+1}^{n+1}-2u_j^{n+1}+u_{j-1}^{n+1}}{\Delta x^2}
    $$
    
    with a uniform mesh $x_j=j\Delta x$ with spatial mesh size $\Delta x$ and time step $\Delta t$. Here $u_j^n$ is the numerical solution approximating the exact solution at $x=x_j$ and $t=n\Delta t$. Prove that the scheme is $L^2$ stable under the very mild time step restriction
    
    $$
    \Delta t \leq c,
    $$
    
    with a constant $c$ which is independent of $\Delta x$. Can you determine the dependency of $c$ on the two constants $a$ and $b$?

---

!!! problem "2017T"
    **Problem 5.** We have the following partial differential equation
    
    $$
    u_{t}=H(u)_{xx},\quad 0\leq x<1
    $$
    
    with an initial condition $u(x,0)=f(x)$ and periodic boundary condition. Here $0\leq H^{\prime}(u)\leq d$. Consider the following one-step, three-point scheme on a uniform mesh $x_j=j\Delta x$ with spatial mesh size $\Delta x$:
    
    $$
    u^{n+1}_{j}=u^{n}_{j}+aH(u^{n}_{j-1})+bH(u^{n}_{j})+cH(u^{n}_{j+1}),
    $$
    
    where $a,b,c$ are constants which may depend on the mesh ratio $\mu=\Delta t/\Delta x^{2}$, $\Delta t$ is the time step, and $u^{n}_{j}$ approximates the exact solution at $u(x_j,t^n)$ with $t^{n}=n\Delta t$.
    
    * (i) Find the constants $a,b,c$ such that the scheme is second order accurate.
    * (ii) Find the CFL number $\mu_0$ such that the scheme (with the constants determined by (i)) is stable under the time step restriction $\mu\leq\mu_0$. Please specify which norm you are using for stability, and prove this stability result.

!!! proof "证明"

    $(i)$ 由 Taylor 展开，

    $$
    H(u_{j-1}^n)=H(u_j^n-\Delta x u_x+\frac{\Delta x^2}{2}u_{xx}+O(\Delta x^3))=H(u_j^n)+(-\Delta x u_x+\frac{\Delta x^2}{2}u_{xx})H'(u_j^n)+\frac{(-\Delta x u_x)^2}{2}H''(u_j^n)+O(\Delta x^3),
    $$

    $$
    H(u_{j+1}^n)=H(u_j^n+\Delta x u_x+\frac{\Delta x^2}{2}u_{xx}+O(\Delta x^3))=H(u_j^n)+(\Delta x u_x+\frac{\Delta x^2}{2}u_{xx})H'(u_j^n)+\frac{(\Delta x u_x)^2}{2}H''(u_j^n)+O(\Delta x^3).
    $$

    $$
    H(u_{j-1}^n)+H(u_{j+1}^n)-2H(u_j^n)=\Delta x^2 u_{xx} H'(u_j^n)+(\Delta x u_x)^2 H''(u_j^n)+O(\Delta x^3).
    $$

    $$
    u_j^{n+1}-u_j^n=\Delta t u_t+\frac{\Delta t^2}{2}u_{tt}+O(\Delta t^3)=\mu \Delta x^2 H(u)_{xx}+O(\Delta x^4)=\mu \Delta x^2 (H'(u_j^n) u_{xx}+H''(u_j^n) (u_x)^2)+O(\Delta x^4).
    $$

    比较上面两式的系数，得到

    $$
    a=c=\mu, \quad b=-2\mu.
    $$
---

!!! problem "2017I, 2014I"
    **Problem 6.** For solving the following partial differential equation
    
    $$
    u_{t}+f(u)_{x}=0,\quad 0\leq x\leq 1
    $$
    
    where $f^{\prime}(u)\geq 0$, with periodic boundary condition, we can use the following semidiscrete upwind scheme
    
    $$
    \frac{d}{dt}u_{j}+\frac{f(u_{j})-f(u_{j-1})}{\Delta x}=0,\quad j=1,2,\ldots,N,
    $$
    
    with periodic boundary condition $u_{0}=u_{N}$, where $u_{j}=u_{j}(t)$ approximates $u(x_j,t)$ at the grid point $x=x_j=j\Delta x$, with $\Delta x=1/N$.
    
    * (i) Prove the following $L^{2}$ stability of the scheme
    
        $$
        \frac{d}{dt}E(t)\leq 0 \quad \text{where} \quad E(t)=\sum_{j=1}^{N}|u_{j}|^{2}\Delta x.
        $$
    * (ii) Do you believe the above inequality is true for $E(t)=\sum_{j=1}^{N}|u_{j}|^{2p}\Delta x$ for arbitrary integer $p\geq 1$? If yes, prove the result. If not, give a counterexample.

---

!!! problem "2016T"
    **Problem 7.** For solving the following partial differential equation
    
    $$
    u_{t}+u_{x}=0,\quad -\infty\leq x\leq\infty
    $$
    
    with compactly supported initial condition, we consider the following one-step, three-point scheme on a uniform mesh $x_{j}=j\Delta x$ with spatial mesh size $\Delta x$:
    
    $$
    u^{n+1}_{j}=au^{n}_{j}+bu^{n}_{j-1}+cu^{n}_{j-2},\quad j=\ldots,-1,0,1,\ldots
    $$
    
    where $a,b,c$ are constants which may depend on the mesh ratio $\lambda=\Delta t/\Delta x$. Here $\Delta t$ is the time step, and $u^{n}_{j}$ approximates the exact solution at $u(x_{j},t^{n})$ with $t^{n}=n\Delta t$.
    
    * (i) Find the constants $a,b,c$ such that the scheme is second order accurate.
    * (ii) Find the CFL number $\lambda_0$ such that the scheme (with the constants determined by (i)) is stable in $L^{2}$ under the time step restriction $\lambda\leq\lambda_0$.
    * (iii) If the PDE is defined on $(0,\infty)$ with an initial condition compactly supported in $(0,\infty)$ and a boundary condition $u(0,t)=g(t)$, how would you modify the scheme so that it can be applied? Can you prove the stability and accuracy of your modified scheme?

---

!!! problem "2016I"
    **Problem 8.** Consider the implicit leapfrog scheme
    
    $$
    \frac{u_{m}^{n+1}-u_{m}^{n-1}}{2k}+a\left(1+\frac{h^{2}}{6}\delta^{2}\right)^{-1}\delta_{0}u_{m}^{n}=f_{m}^{n}
    $$
    
    for the one-way wave equation $u_{t}+au_{x}=f$. Here $\delta^{2}$ is the central second difference operator, and $\delta_{0}$ is the central first difference operator.
    
    * (1) Show that the scheme is of order $(2,4)$ (second order in time, fourth order in space).
    * (2) Show that the scheme is stable if and only if $|\frac{ak}{h}|<\frac{1}{\sqrt{3}}$.

---

!!! problem "2015I"
    **Problem 9.** Solve the following linear hyperbolic partial differential equation
    
    $$
    u_{t}+au_{x}=0,\quad t\geq 0,
    $$
    
    where $a$ is a constant. Using the finite difference approximation, we can obtain the forward-time central-space scheme as follows,
    
    $$
    \frac{u_{m}^{n+1}-u_{m}^{n}}{k}+a\frac{u_{m+1}^{n}-u_{m-1}^{n}}{2h}=0,
    $$
    
    where $k$ and $h$ are temporal and spatial mesh sizes.
    
    * (i) Show that when we fix $\lambda=k/h$ as a positive constant, the forward-time central-space scheme is consistent with equation $u_t + a u_x = 0$.
    * (ii) Analyze the stability of this method. Is the method stable with $\lambda=k/h$ being fixed as a constant?
    * (iii) How would the answer change if you are allowed to make $\lambda=k/h$ small?
    * (iv) Would this be a good scheme to use even if you can make it stable by making $\lambda$ small? If not, please provide a simple modification to make this scheme stable by keeping $\lambda$ fixed.

---

!!! problem "2014I"
    **Problem 10.** For solving the following heat equation on interval
    
    $$
    u_{t}=u_{xx},\quad 0\leq x\leq 1
    $$
    
    with boundary condition $u(0)=u_{0},\ u(1)=u_{1}$, we first discretize the interval $[0,1]$ into $N$ subintervals uniformly, that is, the mesh size $h=1/N$. We choose a temporal step size $k$ and approximate the solution $u(jh,nk)$ by $U_{j}^{n}$, $j=1,\ldots,N-1,n=0,1,2,\ldots$. Using the backward Euler method in time and central finite difference in space, the discrete function $U_{j}^{n}$ satisfies:
    
    $$
    U_{j}^{n+1}-U_{j}^{n}=\lambda(U_{j-1}^{n+1}-2U_{j}^{n+1}+U_{j+1}^{n+1}),\quad j =1,\ldots,N-1,
    $$
    
    where $\lambda=k/h^{2}$, and $U_0^{n+1}=u_0$, $U_N^{n+1}=u_1$.
    
    Show that
    
    $$
    \frac{1}{2}\sum_{j=1}^{N-1}((U^{n+1}_{j})^{2}-(U^{n}_{j})^{2}) \leq-\lambda\sum_{j=1}^{N-2}(U^{n+1}_{j+1}-U^{n+1}_{j})^{2} -\frac{\lambda}{2}((U^{n+1}_{1})^{2}+(U^{n+1}_{N-1})^{2})+\frac{\lambda}{2}(u_{0}^{2}+u_{1}^{2}).
    $$

---

!!! problem "2013T"
    **Problem 11.** The wave guide problem is defined as
    
    $$
    u_{t}+u_{x}=0,\quad v_{t}-v_{x}=0
    $$
    
    with the boundary condition
    
    $$
    u(-1,t)=v(-1,t),\quad v(1,t)=u(1,t)
    $$
    
    and the initial condition
    
    $$
    u(x,0)=f(x),\quad v(x,0)=g(x).
    $$
    
    The upwind scheme for the guide problem is defined as
    
    $$
    \begin{aligned}
    \frac{u^{n+1}_{j}-u^{n}_{j}}{\Delta t}+\frac{u^{n}_{j}-u^{n}_{j-1}}{\Delta x}&=0,\quad j=-N+1,\ldots,N;\\[5pt]
    \frac{v^{n+1}_{j}-v^{n}_{j}}{\Delta t}-\frac{v^{n}_{j+1}-v^{n}_{j}}{\Delta x}&=0,\quad j=-N,\ldots,N-1;
    \end{aligned}
    $$
    
    with the boundary condition
    
    $$
    u^{n+1}_{-N}=v^{n+1}_{-N},\quad v^{n+1}_{N}=u^{n+1}_{N}
    $$
    
    where $u^{n}_{j}$ and $v^{n}_{j}$ approximate $u(x_{j},t^{n})$ and $v(x_{j},t_{n})$ respectively at the grid point $(x_{j},t_{n})$, with $x_{j}=j\Delta x$, $t^{n}=n\Delta t$, $\Delta x=\frac{1}{N}$.
    
    * (i) For the solution to the wave guide problem with the above boundary condition, prove the energy conservation
    
        $$
        \frac{d}{dt}\int_{-1}^{1}(u^{2}+v^{2})dx=0.
        $$
    * (ii) For the numerical solution of the the upwind scheme, if we define the discrete energy as
    
        $$
        E^{n}=\sum_{j=-N+1}^{N}(u^{n}_{j})^{2}+\sum_{j=-N}^{N-1}(v^{n}_{j})^{2},
        $$
    
        prove the discrete energy stability $E^{n+1}\leq E^{n}$ under a suitable time step restriction $\frac{\Delta t}{\Delta x}\leq\lambda_{0}$. You should first find $\lambda_{0}$.
    * (iii) Under the same time step restriction, is the numerical solution stable in the maximum norm? That is, can you prove
    
        $$
        \max_{-N\leq j\leq N}\max(|u^{n+1}_{j}|,|v^{n+1}_{j}|)\leq\max_{-N\leq j\leq N}\max(|u^{n}_{j}|,|v^{n}_{j}|)?
        $$

---

!!! problem "2012I"
    **Problem 12.** Describe the forward-in-time and center-in-space finite difference scheme for the one-way wave equation:
    
    $$
    u_{t}+u_{x}=0.
    $$
    
    * (i) Conduct the von Neumann stability analysis and comment on their stability property.
    * (ii) Under what condition on $\Delta t$ and $\Delta x$ would this scheme be stable and convergent?
    * (iii) How many ways you can modify this scheme to make it stable when the CFL condition is satisfied?

---

!!! problem "2011T"
    **Problem 13.** We use the following scheme to solve the PDE $u_{t}+u_{x}=0$:
    
    $$
    u^{n+1}_{j}=au^{n}_{j-2}+bu^{n}_{j-1}+cu^{n}_{j}
    $$
    
    where $a,b,c$ are constants which may depend on the CFL number $\lambda=\frac{\Delta t}{\Delta x}$. Here $x_{j}=j\Delta x$, $t^{n}=n\Delta t$ and $u^{n}_{j}$ is the numerical approximation to the exact solution $u(x_{j},t^{n})$ with periodic boundary conditions.
    
    * (i) Find $a,b,c$ so that the scheme is second order accurate.
    * (ii) Verify that the scheme you derived in Part (i) is exact (i.e. $u^{n}_{j}=u(x_{j},t^{n})$) if $\lambda=1$ or $\lambda=2$. Does this imply that the scheme is stable for $\lambda\leq 2$? If not, find $\lambda_{0}$ such that the scheme is stable for $\lambda\leq\lambda_{0}$.
    
    Recall that a scheme is stable if there exist constants $M$ and $C$, which are independent of the mesh sizes $\Delta x$ and $\Delta t$, such that $\|u^{n}\|\leq Me^{CT}\|u^{0}\|$ for all $\Delta x$, $\Delta t$ and $n$ such that $t^{n}\leq T$. You can use either the $L^{\infty}$ norm or the $L^{2}$ norm to prove stability.

---

!!! problem "2010T"
    **Problem 14.** When considering finite difference schemes approximating partial differential equations (PDEs), for example, the scheme
    
    $$
    u^{n+1}_{j}=u^{n}_{j}-\lambda(u^{n}_{j}-u^{n}_{j-1})
    $$
    
    where $\lambda=\frac{\Delta t}{\Delta x}$, approximating the PDE $u_{t}+u_{x}=0$, we are often interested in stability, namely
    
    $$
    \|u^{n}\|\leq C\|u^{0}\|,\quad n\Delta t\leq T
    $$
    
    for a constant $C=C(T)$ independent of the time step $\Delta t$ and the spatial mesh size $\Delta x$. Here $\|\cdot\|$ is a given norm, for example the $L^{2}$ norm or the $L^{\infty}$ norm, of the numerical solution vector $u^{n}=(u^{n}_{1},u^{n}_{2},\ldots,u^{n}_{N})$. The mesh points are $x_{j}=j\Delta x$, $t^{n}=n\Delta t$, and the numerical solution $u^{n}_{j}$ approximates the exact solution $u(x_{j},t^{n})$ of the PDE with a periodic boundary condition.
    
    * (i) Prove that the scheme $u^{n+1}_{j}=u^{n}_{j}-\lambda(u^{n}_{j}-u^{n}_{j-1})$ is stable in the sense of (14) for both the $L^{2}$ norm and the $L^{\infty}$ norm under the time step restriction $\lambda\leq 1$.
    * (ii) Since the numerical solution $u^{n}$ is in a finite dimensional space, Student A argues that the stability (14), once proved for a specific norm $\|\cdot\|_{a}$, would also automatically hold for any other norm $\|\cdot\|_{b}$. His argument is based on the equivalency of all norms in a finite dimensional space, namely for any two norms $\|\cdot\|_{a}$ and $\|\cdot\|_{b}$ on a finite dimensional space $W$, there exists a constant $\delta>0$ such that
    
        $$
        \delta\|u\|_{b}\leq\|u\|_{a}\leq\frac{1}{\delta}\|u\|_{b}.
        $$
    
        Do you agree with his argument? If yes, please give a detailed proof of the following theorem: If a scheme is stable, namely (14) holds for one particular norm (e.g. the $L^{2}$ norm), then it is also stable for any other norm. If not, please explain the mistake made by Student A.

---

!!! problem "2010T"
    **Problem 15.** We have the following 3 PDEs
    
    $$
    \begin{aligned}
    u_{t}+Au_{x} &=0, (15)\\
    u_{t}+Bu_{x} &=0, (16)\\
    u_{t}+Cu_{x} &=0,\quad C=A+B. (17)
    \end{aligned}
    $$
    
    Here $u$ is a vector of size $m$ and $A$ and $B$ are $m\times m$ real matrices. We assume $m\geq 2$ and both $A$ and $B$ are diagonalizable with only real eigenvalues. We also assume periodic initial condition for these PDEs.
    
    * (i) Prove that (15) and (16) are both well-posed in the $L^{2}$-norm. Recall that a PDE is well-posed if its solution satisfies
    
        $$
        \|u(\cdot,t)\|\leq C(T)\|u(\cdot,0)\|,\quad 0\leq t\leq T
        $$
    
        for a constant $C(T)$ which depends only on $T$.
    * (ii) Is (17) guaranteed to be well-posed as well? If yes, give a proof; if not, give a counter example.
    * (iii) Suppose we have a finite difference scheme $u^{n+1}=A_{h}u^{n}$ for approximating (15) and another scheme $u^{n+1}=B_{h}u^{n}$ for approximating (16). Suppose both schemes are stable in the $L^{2}$-norm. If we now form the splitting scheme $u^{n+1}=B_{h}A_{h}u^{n}$ which is a consistent scheme for solving (17), is this scheme guaranteed to be $L^{2}$ stable as well? If yes, give a proof; if not, give a counter example.