---
date: 2026-2-7
---
## 数值 PDE
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
!!! problem "Spring, 2025"
    For the system
    
    $$
    u_{t}=-v_{x},
    $$
    
    $$
    v_{t}=u_{x},
    $$
    
    analyze the truncation error and stability of the scheme
    
    $$
    \frac{u_{j}^{n+1}-u_{j}^{n}}{\tau}=-\frac{1}{2h^{2}}(v_{j+1}^{n}-2v_{j}^{n}+v_{j-1}^{n}+v_{j+1}^{n+1}-2v_{j}^{n+1}+v_{j-1}^{n+1}),
    $$
    
    $$
    \frac{v_{j}^{n+1}-v_{j}^{n}}{\tau}=\frac{1}{2h^{2}}(u_{j+1}^{n}-2u_{j}^{n}+u_{j-1}^{n}+u_{j+1}^{n+1}-2u_{j}^{n+1}+u_{j-1}^{n+1}).
    $$
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