---
date: 2026-2-14
hide:
  - navigation # 隐藏侧边栏，让目录卡片居中显示
  - toc
---

## 数值 ODE
!!! problem "Autumn, 2023"
    Consider a Runge-Kutta method for the ODE $y^{\prime}=f(t,y)$ ($f$ is Lipschitz continuous in $y$ and uniform in $t$) with the following Butcher tableau:
    
    $$
    \begin{array}{c|cc}
    0 & 0 & \\
    1 & 1 & 0 \\
    \hline
    & 1/2 & 1/2
    \end{array}
    $$
    
    (1). Rewrite the scheme in the form of $u_{n+1}=u_{n}+hF(t_{n},u_{n},h;f)$.
    
    (2). Assume that $f$ is sufficiently smooth. Prove that this method is convergent and determine the order of convergence.
    
    (3). What is the region of absolute stability of this method? Give a description that is as explicit as possible.

!!! proof "证明"
    $(1)$：
    $$
    \begin{aligned}
        k_1 &= f(t_n, u_n)\\
        k_2 &= f(t_n + c_2 h, u_n + h a_{21} k_1) = f(t_n + h, u_n + h f(t_n, u_n))\\
        u_{n+1} &= u_n + h(b_1 k_1 + b_2 k_2) = u_n + h \left( \frac{1}{2} k_1 + \frac{1}{2} k_2 \right)
    \end{aligned}
    $$

    代入能得到

    $$
    u_{n+1} = u_n + h \underbrace{\left[ \frac{1}{2} f(t_n, u_n) + \frac{1}{2} f\big(t_n + h, u_n + h f(t_n, u_n)\big) \right]}_{F(t_n, u_n, h; f)}
    $$

    $(2)$：
    
    $$
    y(t_{n+1}) = y(t_n) + h y'(t_n) + \frac{h^2}{2} y''(t_n) + \mathcal{O}(h^3)
    $$

    $$
    y(t_{n+1}) = y(t_n) + h f + \frac{h^2}{2} (f_t + f_y f) + \mathcal{O}(h^3)
    $$

    $$
    k_2 = f(t_n + h, y(t_n) + h f) = f + h f_t + (hf) f_y + \mathcal{O}(h^2) = f + h(f_t + f_y f) + \mathcal{O}(h^2)
    $$

    $$
    h F = \frac{h}{2} f + \frac{h}{2} \big[ f + h(f_t + f_y f) + \mathcal{O}(h^2) \big] = h f + \frac{h^2}{2} (f_t + f_y f) + \mathcal{O}(h^3)
    $$

    $$
    \tau_{n+1} = y(t_{n+1}) - y(t_n) - h F = \mathcal{O}(h^3)
    $$

    由于局部截断误差（单步误差）为 $\mathcal{O}(h^3)$，该方法的收敛阶（整体截断误差）为 2 阶。

    由于 $f$ 是 Lipschitz 连续的，容易得到 $F$ 也是 Lipschitz 连续的，因此该方法是收敛的。

    $(3)$：考虑
    
    $$
    y' = \lambda y \quad (\text{其中 } \lambda \in \mathbb{C}, \text{ 即 } f(t,y) = \lambda y)
    $$

    代入公式得到

    $$
    \begin{aligned}
        k_1 &= \lambda u_n\\
        k_2 &= \lambda (u_n + h k_1) = \lambda (u_n + h \lambda u_n) = \lambda (1 + h\lambda) u_n\\
        u_{n+1} &= \left[ 1 + \frac{h\lambda}{2} + \frac{h\lambda + (h\lambda)^2}{2} \right] u_n = \left( 1 + h\lambda + \frac{1}{2}(h\lambda)^2 \right) u_n
    \end{aligned}
    $$

    令复变量 $z = h\lambda$。我们得到了该方法的稳定函数：
    
    $$
    R(z) = 1 + z + \frac{1}{2}z^2
    $$
    
    绝对稳定区域 $\mathcal{D} = \{ z \in \mathbb{C} \mid |R(z)| < 1 \}$
!!! problem "2017 Individual"
    **Problem 1.** Consider the differential equation

    $$
    -u'' + \alpha u = f, \quad x \in (0,1),
    $$

    where prime denotes $d/dx$ and $\alpha$ is a constant. We consider a mixed boundary condition

    $$
    u(0) = 0, \quad u'(1) - b u(0) = 0.
    $$

    This equation is approximated by a standard finite difference method:

    $$
    \frac{-U_{j-1} + 2U_j - U_{j+1}}{h^2} + \alpha U_j = f_j, \quad j = 1, \ldots, N-1.
    $$

    Here, $N$ is the number of grid points, $h = 1/N$ is the mesh size, $U_j$ is the approximate solution at $x_j := jh$, and $f_j = f(x_j)$. The boundary condition is approximated by

    $$
    U_0 = 0, \quad \frac{U_N - U_{N-1}}{h} - b U_N = 0.
    $$

    The resulting linear system is $AU = F$ with 
    
    $$
    \begin{matrix}
    \beta & -1 & 0 & \cdots \\
    -1 & \beta & -1 & \cdots \\
      & & \ddots & \\
      & & & -1 \\
      & & & 0
    \end{matrix}
    \begin{bmatrix}
    U_1 \\
    U_2 \\
    \vdots \\
    U_{N-1} \\
    U_N
    \end{bmatrix}
    =
    \begin{bmatrix}
    h^2 f_1 \\
    h^2 f_2 \\
    \vdots \\
    h^2 f_{N-1} \\
    0
    \end{bmatrix},
    $$

    where $\beta = 2 + \alpha h^2$.

    * (a) Write down the complete linear system, including the last row corresponding to the boundary condition at $x=1$.
    * (b) Analyze the stability and convergence of this finite difference scheme.

---

!!! problem "2017 Individual"
    **Problem 2.** For solving the partial differential equation

    $$
    u_t + f(u)_x = 0, \quad 0 \leq x \leq 1,
    $$

    where $f'(u) \geq 0$, with periodic boundary condition, we can use the following semi-discrete upwind scheme

    $$
    \frac{d}{dt} u_j + \frac{f(u_j) - f(u_{j-1})}{\Delta x} = 0, \quad j = 1,2,\ldots,N,
    $$

    with periodic boundary condition $u_0 = u_N$, where $u_j = u_j(t)$ approximates $u(x_j,t)$ at the grid point $x = x_j = j \Delta x$, with $\Delta x = \frac{1}{N}$.

    * (a) Prove the following $L^2$ stability of the scheme:

        $$
        \frac{d}{dt} E(t) \leq 0,
        $$

        where $E(t) = \sum_{j=1}^N |u_j|^2 \Delta x$.
    * (b) Do you believe the above inequality is true for $E(t) = \sum_{j=1}^N |u_j|^{2p} \Delta x$ for arbitrary integer $p \geq 1$? If yes, prove the result. If not, give a counterexample.

---

!!! problem "2019 Team"
    **Problem 3.** (Störmer's Method)
    Consider the following problems.

    * (i) Determine the order of Störmer's method,

        $$
        y_{n+2} - 2y_{n+1} + y_n = h^2 f(t_{n+1}, y_{n+1}), \quad n \geq 0,
        $$

        for solving the second order system of ODE's

        $$
        y'' = f(t, y), \quad t \geq 0,
        $$

        with the initial conditions $y(0) = y_0$ and $y'(0) = y_0'$.
    * (ii) Using the second order central differences in space and Störmer's method in time, construct a scheme to solve the wave equation,

        $$
        u_{tt} = u_{xx}.
        $$
    * (iii) Determine the condition for its stability.

!!! proof "证明"
    $(1)$： 设 $y(t)$ 为微分方程的精确解，则由 Taylor 展开可得

    $$
    y(t_{n+1}) = y(t_n) + h y'(t_n) + \frac{h^2}{2} y''(t_n) + \frac{h^3}{6} y^{(3)}(t_n) + O(h^4),
    $$

    $$
    y(t_{n-1}) = y(t_n) - h y'(t_n) + \frac{h^2}{2} y''(t_n) - \frac{h^3}{6} y^{(3)}(t_n) + O(h^4).
    $$

    将上述两式相加，得到

    $$
    y(t_{n+1}) + y(t_{n-1}) = 2 y(t_n) + h^2 y''(t_n) + O(h^4).
    $$

    因此，有

    $$
    y(t_{n+1}) - 2 y(t_n) + y(t_{n-1}) = h^2 y''(t_n) + O(h^4).
    $$

    另一方面，由于 $y''(t_n) = f(t_n, y(t_n))$，所以

    $$
    y(t_{n+1}) - 2 y(t_n) + y(t_{n-1}) = h^2 f(t_n, y(t_n)) + O(h^4).
    $$

    因此，Störmer 方法的局部截断误差为 $O(h^4)$，从而该方法的阶数为 $4 - 2 = 2$。

    $(ii)$：
    $$
    \frac{u_j^{n+1} - 2 u_j^n + u_j^{n-1}}{h^2} = \frac{u_{j+1}^n - 2 u_j^n + u_{j-1}^n}{\tau^2},
    $$

    其中，$u_j^n$ 近似表示 $u(x_j, t_n)$，$x_j = j \Delta x$，$t_n = n \tau$。

    $(iii)$： 设 $u_j^n = \xi^n e^{i jkh}$，代入差分方程，得到

    $$
    \frac{\xi^{n+1} - 2 \xi^n + \xi^{n-1}}{h^2} = \frac{e^{i (j+1)kh} - 2 e^{i jkh} + e^{i (j-1)kh}}{\tau^2}.
    $$

    化简后得到特征方程

    $$
    \xi^2 - 2 \left( 1 - 2 r^2 \sin^2 \left( \frac{kh}{2} \right) \right) \xi + 1 = 0,
    $$

    两个根的乘积
---

!!! problem "2020 Team"
    **Problem 4.** For the initial value problem $y' = f(t, y)$, $y(0) = y_0$ on the interval $[0, T]$, consider the implicit two-step method

    $$
    y_{n+1} = \frac{4}{3} y_n - \frac{1}{3} y_{n-1} + \frac{2h}{3} f(t_{n+1}, y_{n+1}),
    $$

    with starting value $y_1 = y_0 + h f(t_1, y_0)$, where $h$ is the step size and $t_n = n h$.

    * (a) What is the order of accuracy of the scheme?
    * (b) Check the stability of the scheme by analyzing the stability polynomial.
    * (c) Find the stability region of the scheme.

---

!!! problem "2020 Team"
    **Problem 5.** Suppose the difference scheme $u^{n+1} = B u^n$ is stable, and $C(\Delta t)$ is a bounded family of operators. Show that the scheme

    $$
    u^{n+1} = (B + \Delta t C(\Delta t)) u^n
    $$

    is stable.

---

!!! problem "2021 Team"
    **Problem 6.** Consider the family of semi-implicit Runge-Kutta methods

    $$
    \begin{aligned}
    k_1 &= f(y_n + \beta h k_1), \\
    k_2 &= f(y_n + h k_1 + \beta h k_2), \\
    y_{n+1} &= y_n + h \left( \left(\frac{1}{2} + \beta\right) k_1 + \left(\frac{1}{2} - \beta\right) k_2 \right).
    \end{aligned}
    $$

    * (a) Determine the order and the principal part of the local truncation error.
    * (b) Show that if $\beta > \frac{1}{2}$, then the negative real axis $\{z : \text{Re}(z) < 0, \text{Im}(z) = 0\}$ is contained in the region of absolute stability of the method.

---

!!! problem "2021 Team"
    **Problem 7.** (Beam Equation) Consider the Beam equation from mechanics with boundary conditions that model a cantilever beam:

    $$
    u^{(4)} = f(x), \quad x \in (0,1),
    $$

    with boundary conditions

    $$
    u(0) = u'(0) = u''(1) = u'''(1) = 0.
    $$

    * (a) Recast this equation into a variational problem, stating the trial and test function spaces.
    * (b) Interpret the variational problem as an energy minimization problem, clearly stating the energy functional. Prove that the variational problem and the energy minimization problems are equivalent.
    * (c) Develop a CG(3) (cubic continuous Galerkin method) finite element method for this problem.
    * (d) Prove an a priori error estimate for this method in the energy norm:

        $$
        \|e\|_E = \left( \int_0^1 (e'')^2 dx \right)^{1/2},
        $$

        where $e = u(x) - U(x)$, in which $u(x)$ is the exact solution to the variational problem, $U(x)$ is the FEM solution.
    * (e) Prove an a priori error estimate for this method in the $L^2$ norm:

        $$
        \|e\|_{L^2} = \left( \int_0^1 e^2 dx \right)^{1/2}.
        $$
