---
title: Convex Optimization Exercises
date: 2026-02-17
hide:
  - navigation
categories:
  - 应用数学
  - 应用数学博资考
tags:
  - applied-math
  - applied-math-exam
  - convex-optimization-exercises
---
## 凸优化
!!! problem "Autumn, 2023"
    Consider the following linear programming problem:
    
    $$
    \max_{x}\langle c,x\rangle \quad \text{s.t.} \quad Ax=b, \quad x\ge0
    $$
    
    where $x\in\mathbb{R}^{n}$, $0\le b\in\mathbb{R}^{m}$, $A\in\mathbb{R}^{m\times n}$ and $c\in\mathbb{R}^{n}$. $A$ is a full rank matrix and $m<n$.
    
    (1) Prove that the basic feasible solutions are equivalent to the vertices of its feasible region.
    
    (2) Write down the dual problem, and prove that when the optimal solution exists, the dual problem must also have an optimal solution, and the optimal objective values of these two problems are equal.
!!! proof "证明"
    $(1)$：对于 $x \in \mathcal{P}$，设其严格正分量的指标集为 $I = \{i \mid x_i > 0\}$。
    
    $\text{BFS} \implies \text{Vertex}$：采用反证法。假设 $x$ 是一个 BFS，但它不是顶点。则存在 $y, z \in \mathcal{P}$ ($y \ne z$) 且 $\lambda \in (0, 1)$，使得 $x = \lambda y + (1-\lambda) z$。因为 $y \ge 0, z \ge 0$ 且 $\lambda \in (0, 1)$，对于任意使得 $x_j = 0$ 的指标 $j \notin I$，必须有 $\lambda y_j + (1-\lambda) z_j = 0$。这蕴含着 $y_j = 0$ 且 $z_j = 0$ ($\forall j \notin I$)。也就是说，$y$ 和 $z$ 的非零分量也只能出现在指标集 $I$ 中。由于 $y, z \in \mathcal{P}$，它们都满足线性约束：
    
    $$
    Ay = \sum_{i \in I} y_i A_i = b
    $$
    
    $$
    Az = \sum_{i \in I} z_i A_i = b
    $$
    
    两式相减得到：
    
    $$
    \sum_{i \in I} (y_i - z_i) A_i = 0
    $$
    
    因为 $x$ 是 BFS，根据定义，列向量组 $\{A_i\}_{i \in I}$ 是线性无关的。因此，必须有 $y_i - z_i = 0 \quad (\forall i \in I)$，即 $y = z$。矛盾！

    $\text{Vertex} \implies \text{BFS}$：反证法，假设 $\{A_i\}_{i \in I}$ 是线性相关的。于是存在一组不全为零的标量 $\{d_i\}_{i \in I}$ 使得 $\sum_{i \in I} d_i A_i = 0$。
    
    构造一个全空间向量 $d \in \mathbb{R}^n$，使得其在 $I$ 上的分量为 $d_i$，其余分量 $d_j = 0$ ($\forall j \notin I$)。显然 $d \ne 0$ 且 $Ad = 0$。因为对于 $i \in I$ 有 $x_i > 0$，我们可以取一个足够小的正数 $\epsilon > 0$，使得：
    
    $$
    x + \epsilon d \ge 0 \quad \text{且} \quad x - \epsilon d \ge 0
    $$
    
    令 $y = x + \epsilon d$，$z = x - \epsilon d$。显然 $y \ne z$（因为 $d \ne 0$）。验证它们是否在可行域 $\mathcal{P}$ 中：
    
    $$
    Ay = A(x + \epsilon d) = Ax + \epsilon Ad = b + 0 = b \implies y \in \mathcal{P}
    $$
    
    $$
    Az = A(x - \epsilon d) = Ax - \epsilon Ad = b - 0 = b \implies z \in \mathcal{P}
    $$
    
    此时我们发现 $x = \frac{1}{2}y + \frac{1}{2}z$。这意味着 $x$ 可以表示为 $\mathcal{P}$ 中两个不同点的严格凸组合，这与 $x$ 是顶点的条件矛盾！
!!! problem "Spring, 2024"
    Let $S \subset \mathbb{R}^{n}$ be a non-empty closed convex set, $f \in \mathcal{C}^{2}(S)$ is convex. For any $x^{0} \in S$, define $L(f(x^{0})) = \{x \in S | f(x) \le f(x^{0})\}$. If there exists some $m > 0$ such that:
    
    $$
    d^{\top}\nabla^{2}f(x)d \ge m||d||^{2} \quad \forall x \in L(f(x^{0})), d \in \mathbb{R}^{n}
    $$
    
    Prove that $L(f(x^{0}))$ is a bounded and closed convex set.
!!! proof "证明"
    闭：由 $L(f(x^{0}))=f^{-1}((-\infty, f(x^{0})])\cap S$ 可知 $L(f(x^{0}))$ 是闭集。

    凸：由于 $f$ 是凸函数，$f(\lambda x + (1-\lambda) y) \le \lambda f(x) + (1-\lambda) f(y)$ 对任意 $x, y \in S$ 和 $\lambda \in [0, 1]$ 成立。因此，如果 $x, y \in L(f(x^{0}))$，则 f(\lambda x + (1-\lambda) y) \le \lambda f(x) + (1-\lambda) f(y) \le \lambda f(x^{0}) + (1-\lambda) f(x^{0}) = f(x^{0})$，即 $\lambda x + (1-\lambda) y \in L(f(x^{0}))$。因此 $L(f(x^{0}))$ 是凸集。

    有界：取 $x\in L(f(x^{0}))$，对 $f$ 进行二阶 Taylor 展开，存在 $\xi$ 在 $x$ 和 $x^{0}$ 之间，使得

    $$
    \begin{aligned}
        f(x^{0})\ge f(x) &= f(x^{0}) + \nabla f(x^{0})^{\top}(x - x^{0}) + \frac{1}{2}(x - x^{0})^{\top}\nabla^{2}f(\xi)(x - x^{0})\\
        &= f(x^{0}) + \nabla f(x^{0})^{\top}(x - x^{0}) + \frac{1}{2} m ||x - x^{0}||^{2}\\
        (Cauchy)&= f(x^{0}) - \|\nabla f(x^{0})\| \cdot \|x - x^{0}\| + \frac{1}{2} m ||x - x^{0}||^{2}
    \end{aligned}
    $$

    这给出了

    $$
    \frac{1}{2} m ||x - x^{0}||^{2} \le \|\nabla f(x^{0})\| \cdot \|x - x^{0}\|
    $$

    即 $||x - x^{0}|| \le \frac{2}{m} \|\nabla f(x^{0})\|$，因此 $L(f(x^{0}))$ 是有界的。
!!! problem "Spring, 2024"
    Given a linear programming (LP):
    
    $$
    \max 3x_{1} + 2x_{2} + 15x_{3}
    $$
    
    $$
    s.t. x_{1} + x_{2} + x_{3} \le 12
    $$
    
    $$
    2x_{1} + x_{2} + 5x_{3} \le 18
    $$
    
    $$
    x_{1}, x_{2}, x_{3} \ge 0
    $$
    
    (i) Write down the standard LP form.
    
    (ii) Compute the optimal solution and optimal value of the problem.
!!! proof "证明"
    $(i)$：标准型如下：
    
    $$
    \begin{aligned}
        \max \quad & Z = 3x_1 + 2x_2 + 15x_3 + 0x_4 + 0x_5 \\
        \text{s.t.} \quad & x_1 + x_2 + x_3 + x_4 = 12 \\
        & 2x_1 + x_2 + 5x_3 + x_5 = 18 \\
        & x_1, x_2, x_3, x_4, x_5 \ge 0
    \end{aligned}
    $$

    $(ii)$：使用单纯形法，初始基本可行解为 $x_4 = 12, x_5 = 18$，对应的目标函数值为 $Z = 0$。计算检验数：

    $$
    \begin{aligned}
        c_1 - z_1 &= 3 - (0 \cdot 1 + 0 \cdot 2) = 3 > 0\\
        c_2 - z_2 &= 2 - (0 \cdot 1 + 0 \cdot 1) = 2 > 0\\
        c_3 - z_3 &= 15 - (0 \cdot 1 + 0 \cdot 5) = 15 > 0
    \end{aligned}
    $$

    选择 $x_3$ 进入基，计算离开基变量：

    $$
    \begin{aligned}
        \frac{12}{1} = 12, \quad \frac{18}{5} = 3.6
    \end{aligned}
    $$

    因此 $x_5$ 离开基。更新基本可行解为 $x_3 = 3.6, x_4 = 12 - 3.6 = 8.4, x_5 = 0$，对应的目标函数值为 $Z = 15 \cdot 3.6 = 54$。计算新的检验数：

    $$
    \begin{aligned}
        c_1 - z_1 &= 3 - (0.4 \cdot 15) = -3<0\\
        c_2 - z_2 &= 2 - (0.2 \cdot 15) = -1<0\\
        c_5 - z_5 &= 0 - (0.2 \cdot 15) = -3<0
    \end{aligned}
    $$

    由于所有检验数均为负数，当前解为最优解。最终的最优解为 $x_1 = 0, x_2 = 0, x_3 = 3.6$，最优值为 $Z = 54$。


!!! problem "Autumn, 2024"
    Let $f:\mathbb{R}^{n}\rightarrow\mathbb{R}$ be convex and define $\partial f(x)$ to be the subgradient set of $f$ at $x$.
    
    (i) If $x \in \text{int dom} f$, prove that $\partial f(x)$ is nonempty and bounded.
    
    (ii) Assume $f(x)=||x||_{1}=\sum_{i=1}^{n}|x_{i}|$, write down the $\partial f(x)$.
    
    (iii) Given $y\in\mathbb{R}^{n}$ and $\lambda>0$, calculate the closed form solution of the problem:
    
    $$
    \min_{x}\frac{1}{2}||x-y||_{2}^{2}+\lambda||x||_{1}.
    $$


!!! proof "证明"
    $(i)$：非空性：因为 $x$ 属于 $f$ 定义域的内部，函数 $f$ 在 $x$ 处是局部 Lipschitz 连续的，且在任何方向 $d$ 上的方向导数 $f'(x; d) = \lim_{t \downarrow 0} \frac{f(x+td) - f(x)}{t}$ 均存在且有限。由凸函数的性质，其上图 $\text{epi} f = \{ (y, t) \in \mathbb{R}^{n+1} \mid f(y) \le t \}$ 是一个凸集。点 $(x, f(x))$ 位于 $\text{epi} f$ 的边界上。根据凸集的支撑超平面定理，在边界点处必然存在一个非垂直的支撑超平面。该支撑超平面的法向量在 $\mathbb{R}^n$ 上的投影即给出了一个向量 $g$，使得 $f(y) \ge f(x) + \langle g, y - x \rangle$ 对所有 $y$ 成立。因此，$g \in \partial f(x)$，即次梯度集合非空。

    有界性：采用反证法。假设 $\partial f(x)$ 是无界的。则存在一个序列 $g_k \in \partial f(x)$，使得 $\|g_k\| \to \infty$。根据次梯度的定义，对于任意 $y$，有 $f(y) \ge f(x) + \langle g_k, y - x \rangle$。因为 $x \in \text{int dom } f$，我们可以取一个以 $x$ 为圆心、半径为 $r > 0$ 的小闭球 $B(x, r)$，使得 $B(x, r) \subset \text{dom } f$。在有限维空间中，凸函数在其定义域内部的紧集上是有界的，假设其在该闭球上的最大值为 $M$。令 $y_k = x + r \frac{g_k}{\|g_k\|}$。显然 $y_k \in B(x, r)$，因此 $f(y_k) \le M$。代入次梯度不等式：
    
    $$
    f(y_k) \ge f(x) + \left\langle g_k, r \frac{g_k}{\|g_k\|} \right\rangle = f(x) + r \|g_k\|
    $$
    
    移项得到：$r \|g_k\| \le f(y_k) - f(x) \le M - f(x)$。由于 $r > 0$ 且 $M - f(x)$ 是一个常数，这要求 $\|g_k\|$ 必须是有界的。这与我们假设的 $\|g_k\| \to \infty$ 矛盾。因此，$\partial f(x)$ 必须是有界的。

    $(ii)$：对于 $f(x) = \|x\|_1 = \sum_{i=1}^n |x_i|$，次梯度 $\partial f(x)$ 的第 $i$ 个分量为：

    $$
    g_i = \begin{cases}
        1, & \text{if } x_i > 0, \\
        -1, & \text{if } x_i < 0, \\
        [-1, 1], & \text{if } x_i = 0.
    \end{cases}
    $$

    $(iii)$：该问题是一个典型的 Lasso 问题。对于每个分量 $x_i$，我们可以单独求解：

    $$
    \min_{x_i} \frac{1}{2}(x_i - y_i)^2 + \lambda |x_i|.
    $$

    该问题的解为：

    $$
    x_i^* = \begin{cases}
        y_i - \lambda, & \text{if } y_i > \lambda, \\
        0, & \text{if } |y_i| \le \lambda, \\
        y_i + \lambda, & \text{if } y_i < -\lambda.
    \end{cases}
    $$
!!! problem "Spring, 2025"
    Let $K$ be a nonempty closed convex set in $\mathbb{R}^{n}$. For any $z\in\mathbb{R}^{n}$, define $\Pi_{K}(z)$ as the optimal solution of the problem $\min \frac{1}{2}||y-z||^2$, s.t. $y\in K$. Prove the following statements.
    
    (i) Show that $\Pi_{K}(z)$ satisfies
    
    $$
    \langle z-\Pi_{K}(z), d-\Pi_{K}(z)\rangle\le0, \quad \forall d\in K.
    $$
    
    (ii) Define
    
    $$
    \Theta(z):=\frac{1}{2}||z-\Pi_{K}(z)||^{2}.
    $$
    
    Prove that $\Theta(\cdot)$ is a continuously differentiable convex function and $\nabla\Theta(z)=z-\Pi_{K}(z)$.
!!! proof "证明"
    $(i)$：对于定义在凸集 $K$ 上的可微凸函数 $f(y)$，点 $\Pi_{K}(z) \in K$ 是最优解的充要条件是：

    $$
    \langle \nabla f(\Pi_{K}(z)), d - \Pi_{K}(z) \rangle \ge 0, \quad \forall d \in K
    $$

    即

    $$
    \langle \Pi_{K}(z) - z, d - \Pi_{K}(z) \rangle \ge 0, \quad \forall d \in K
    $$

    $(ii)$：根据定义，$\Theta(z)$ 是一个最小化问题的最优值函数：
    
    $$
    \Theta(z) = \inf_{y \in K} \frac{1}{2} \|y - z\|^2
    $$
    
    设 $z_1, z_2 \in \mathbb{R}^n$，$\lambda \in [0, 1]$。令 $z_\lambda = \lambda z_1 + (1-\lambda)z_2$。设 $p_1 = \Pi_K(z_1)$， $p_2 = \Pi_K(z_2)$。由于 $p_1, p_2 \in K$ 且 $K$ 是凸集，所以它们的凸组合也在 $K$ 中：
    
    $$
    p_\lambda := \lambda p_1 + (1-\lambda)p_2 \in K
    $$
    
    由于 $\Theta(z_\lambda)$ 是在 $K$ 上的最小值，所以代入任意可行点 $p_\lambda$ 都会得到一个上界：
    
    $$
    \begin{aligned}
    \Theta(z_\lambda) &= \min_{y \in K} \frac{1}{2} \|y - z_\lambda\|^2 \\
    &\le \frac{1}{2} \|p_\lambda - z_\lambda\|^2 \\
    &= \frac{1}{2} \| (\lambda p_1 + (1-\lambda)p_2) - (\lambda z_1 + (1-\lambda)z_2) \|^2 \\
    &= \frac{1}{2} \| \lambda (p_1 - z_1) + (1-\lambda)(p_2 - z_2) \|^2
    \end{aligned}
    $$
    
    由于函数 $g(v) = \frac{1}{2}\|v\|^2$ 是凸函数，根据 Jensen 不等式：
    
    $$
    \begin{aligned}
    \frac{1}{2} \| \lambda (p_1 - z_1) + (1-\lambda)(p_2 - z_2) \|^2 &\le \lambda \left( \frac{1}{2} \|p_1 - z_1\|^2 \right) + (1-\lambda) \left( \frac{1}{2} \|p_2 - z_2\|^2 \right) \\
    &= \lambda \Theta(z_1) + (1-\lambda) \Theta(z_2)
    \end{aligned}
    $$
    
    综上，$\Theta(\lambda z_1 + (1-\lambda)z_2) \le \lambda \Theta(z_1) + (1-\lambda) \Theta(z_2)$，即 $\Theta(z)$ 是凸函数。

    对于任意增量 $h \in \mathbb{R}^n$：
    
    $$
    \begin{aligned}
    \Theta(z+h) &= \min_{y \in K} \frac{1}{2} \|y - (z+h)\|^2 \\
    &\le \frac{1}{2} \|\Pi_K(z) - (z+h)\|^2 \\
    &= \frac{1}{2} \| (\Pi_K(z) - z) - h \|^2 \\
    &= \frac{1}{2} \|\Pi_K(z) - z\|^2 - \langle \Pi_K(z) - z, h \rangle + \frac{1}{2} \|h\|^2 \\
    &= \Theta(z) + \langle z - \Pi_K(z), h \rangle + \frac{1}{2} \|h\|^2
    \end{aligned}
    $$
    
    移项得：
    
    $$
    \Theta(z+h) - \Theta(z) \le \langle z - \Pi_K(z), h \rangle + \frac{1}{2} \|h\|^2
    $$

    另一方面

    $$
    \begin{aligned}
    \Theta(z) &\le \frac{1}{2} \|\Pi_K(z+h) - z\|^2 \\
    &= \frac{1}{2} \| (\Pi_K(z+h) - (z+h)) + h \|^2 \\
    &= \frac{1}{2} \|\Pi_K(z+h) - (z+h)\|^2 + \langle \Pi_K(z+h) - (z+h), h \rangle + \frac{1}{2} \|h\|^2 \\
    &= \Theta(z+h) - \langle z+h - \Pi_K(z+h), h \rangle + \frac{1}{2} \|h\|^2
    \end{aligned}
    $$

    移项得：
    
    $$
    \Theta(z+h) - \Theta(z) \ge \langle z - \Pi_K(z+h), h \rangle - \frac{1}{2} \|h\|^2=\langle z - \Pi_K(z), h \rangle + \langle h - (\Pi_K(z+h) - \Pi_K(z)), h \rangle- \frac{1}{2} \|h\|^2
    $$

    结合 $\|\Pi_K(z+h) - \Pi_K(z)\| \le \|(z+h) - z\| = \|h\|$ 可得
    
    $$
    \Theta(z+h) - \Theta(z) = \langle z - \Pi_K(z), h \rangle + o(\|h\|)
    $$

    这表明 $\Theta(z)$ 在 $z$ 处可微，且梯度为：
    
    $$
    \nabla \Theta(z) = z - \Pi_K(z)
    $$

    连续性是显然的。

!!! problem "Autumn, 2025"
    Consider the minimization
    
    $$
    \min_{x \in \mathbb{R}^n} \|Ax - b\|_2 + \gamma \|x\|_1
    $$
    
    with $A \in \mathbb{R}^{m \times n}$, $b \in \mathbb{R}^m$, and $\gamma > 0$.
    
    (a) Derive the Lagrange dual of the equivalent problem:
    
    $$
    \min_{x, y} \|y\|_2 + \gamma \|x\|_1, \quad \text{s.t. } Ax - b = y
    $$
    
    with $x \in \mathbb{R}^n$ and $y \in \mathbb{R}^m$.
    
    (b) Suppose $Ax^* - b \neq 0$ where $x^*$ is an optimal point. Define $r = \frac{Ax^* - b}{\|Ax^* - b\|_2}$. Show that
    
    $$
    \|A^T r\|_\infty \le \gamma \quad \text{and} \quad r^T A x^* + \gamma \|x^*\|_1 = 0.
    $$
    
    (c) Show that if $\|a_i\|_2 < \gamma$ where $a_i$ is the $i$-th column of $A$, then $x_i^* = 0$.

!!! proof "证明"

    $(a)$：设拉格朗日函数

    $$
    \begin{aligned}
        L(x, y, \lambda) &= \|y\|_2 + \gamma \|x\|_1 + \nu^T (Ax - b - y)\\
        &=(\|y\|_2 - \nu^T y) + (\gamma \|x\|_1 + \nu^T A x) - \nu^T b.
    \end{aligned}
    $$

    对偶函数 $g(\nu) = \inf_{x, y} L(x, y, \nu)$，而 $\inf_y (\|y\|_2 - \nu^T y) $ 当 $\|\nu\|_2 \le 1$ 时为 $0$，否则为 $-\infty$；$\inf_x (\gamma \|x\|_1 -(- \nu^T A) x)$ 当 $\|A^T \nu\|_\infty \le \gamma$ 时为 $0$，否则为 $-\infty$。因此

    $$
    g(\nu) = \begin{cases}
        -\nu^T b, & \text{if } \|\nu\|_2 \le 1 \text{ and } \|A^T \nu\|_\infty \le \gamma,\\
        -\infty, & \text{otherwise}.
    \end{cases}
    $$

    $(b)$：由 KKT 条件，知

    $$
    0\in \partial (\|Ax^* - b\|_2+\gamma \|x^*\|_1)=A^T \partial (\|Ax^* - b\|_2) + \gamma \partial (\|x^*\|_1)= A^T r + \gamma \partial (\|x^*\|_1).
    $$

    即 $-A^T r \in \gamma \partial (\|x^*\|_1)$，因此 $\|A^T r\|_\infty \le \gamma$，且 $r^T A x^* + \gamma \|x^*\|_1 = 0$。

    $(c)$：由 $(b)$ 知若 $x_i^*\neq 0$ 则有 $-A^T r \in \gamma \partial (\|x^*\|_1)$，因此 $\|A^T r\|_\infty = \gamma$，矛盾。