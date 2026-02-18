---
date: 2025-12-1
---

# 第四章：有限元理论与有限元方法

## 0. 简介与历史背景

* **1950s, 美国与德国**：航空工程与机械工程领域。代表人物：Plantl 和 Coniant。
* **1950s, 苏联**：基础数学与 Sobolev 空间。代表人物：Sobolev。
* **1965, 中国**：基于变分原理的差分格式。代表人物：冯康（Kang Feng）。
    * 他的十六字方针：**分整为零、裁弯取直、以简驭繁、化难为易**。

## 1. 有限元理论基础

### 1.1 两个引例

在引入抽象理论前，先考察三种问题的等价性：

1.  **线性系统**
    * (L) 线性方程组：$Ax=b$, $A\in\mathbb{R}^{n\times n}$；
    * (M) 优化问题：$\min J(x)=\frac{1}{2}\langle x,Ax\rangle-\langle b,x\rangle$；
    * (V) 变分问题：$\langle Ax-b,y\rangle=0$, $\forall y\in\mathbb{R}^{n}$。
    * 若 $A$ 对称正定，则 $(L)\Leftrightarrow(M)\Leftrightarrow(V)$。

2.  **微分方程（1维 Poisson 方程边值问题）**
    * (D) 微分方程：

        $$
        \begin{cases}-u^{\prime\prime}(x)=f(x), \quad 0<x<1 \\ u(0)=u(1)=0.\end{cases}
        $$

    * (M) 泛函极值问题：
        
        $$
        \min~J(u)=\frac{1}{2}\langle u^{\prime},u^{\prime}\rangle-\langle f,u\rangle
        $$
        
        s.t. $u\in V:=\{u|u(0)=u(1)=0, u \text{ 满足光滑条件}\}$。
    
    * (V) 变分问题：$\langle u^{\prime},v^{\prime}\rangle=\langle f,v\rangle$, $\forall v\in V$。
    * 通常情况下 $(M)\Rightarrow(V)$，若 $J$ 正定则 $(V)\Leftrightarrow(M)$。

这引入了求解 PDE 的三种思路：

* (D) $\rightarrow$ 有限差分法 (Finite Difference Method)
* (M) $\rightarrow$ Ritz 方法
* (V) $\rightarrow$ Galerkin 方法
* **(最终) 有限元方法 (FEM)**：(Bubnov-) Galerkin 方法 + 分段多项式空间。

### 1.2 抽象变分问题与微商

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

!!! definition "Fréchet 微商"
    $F$ 称为在 $x\in \Omega$ 处 **Fréchet 可微** 的，若存在线性映射 $A:\mathbb{X}\to \mathbb{Y}$，使得对任意的 $\varepsilon >0$，存在 $\delta >0$，当 $z\in \mathbb{X}$ 满足 $\|z\|\le \delta$ 时，有
    
    $$
        \|F(x+z) - F(x) - Az\|_{\mathbb{Y}} \le \varepsilon \|z\|_{\mathbb{X}}
    $$
    
    这时称 $A$ 为 $F$ 在 $x$ 处的 **Fréchet 微商**，记为 $F'(x)=A$ 或 $\mathrm{d}F(x)=A$。如果 $F'(x)$ 是零映射，则称 $x$ 为 $F$ 的驻点。

!!! definition "Gâteaux 微商"
    $F$ 称为在 $x\in \Omega$ 处沿方向 $z\in \mathbb{X}$ 是 **Gâteaux 可微** 的，若以下极限存在：
    
    $$
    \mathrm{D}F(x;z)=\lim_{t\to 0}\frac{F(x+tz)-F(x)}{t}
    $$
    
    这时称 $\mathrm{D}F(x;z)$ 为 $F$ 在点 $x$ 处沿方向 $z$ 的 **Gâteaux 微分**。若 $\mathrm{D}F(x;z)$ 关于 $z$ 是线性的，即存在一个线性映射 $A:\mathbb{X}\to \mathbb{Y}$，使得 $\mathrm{D}F(x;z)=Az$，则称 $A$ 是 $F$ 在点 $x$ 处的 **Gâteaux 微商**。

若 Fréchet 可微的函数 $F$ 在 $x$ 处取得极小值，则对任意的 $z\in \mathbb{X}$，$F(x+tz)$ 作为 $t$ 的函数在 $t=0$ 处也取得极小值，因此有 Euler-Lagrange 方程的弱形式：

$$
F'(x)z=0, \forall z\in \mathbb{X}
$$

!!! example "例"
    设 $J=\frac{1}{2}a(v,v)-f(v)$，且 $a$ 对称，则
    
    $$
    \lim_{t\to 0}\frac{1}{t}(J(u+tv)-J(u)) = a(u,v) - f(v)
    $$
    
    若 $J$ 在 $u$ 处取得极小值，则 $u$ 满足方程 $a(u,v)-f(v)=0, \forall v\in \mathbb{U}$。这建立了 $(M) \Rightarrow (V)$。
    反之，若 $J$ 满足椭圆性条件（正定性），则 $(V) \Rightarrow (M)$。

### 1.3 Lax-Milgram 定理

!!! theorem "Lax-Milgram 定理"
    设 $\mathbb{V}$ 是 Hilbert 空间，$a(\cdot,\cdot):\mathbb{V}\times \mathbb{V}\to \mathbb{R}$ 是一个连续的双线性泛函，且满足 $\mathbb{V}$ **椭圆性条件**(也称为 **强制性条件**)：
    
    
    $$
    \exists \alpha >0, \quad a(v,v)\ge \alpha \|v\|^2, \forall v\in \mathbb{V}
    $$
    
    设 $f:\mathbb{V}\to \mathbb{R}$ 是一个连续的线性泛函，则抽象变分问题
    
    $$
    \text{求 }u\in \mathbb{V},\quad \text{使得 } a(u,v)=f(v), \forall v\in \mathbb{V}
    $$
    
    存在唯一解。

!!! proof "证明"
    由双线性泛函 $a(\cdot,\cdot)$ 的连续性可知，存在常数 $M>0$，使得 $a(u,v)\le M\|u\|\|v\|$。
    对任意 $u\in \mathbb{V}$，由 Riesz 表示定理，存在算子 $A: \mathbb{V} \to \mathbb{V}$ 使得 $a(u,v) = \langle Au, v \rangle$。
    同理存在 $\tau f \in \mathbb{V}$ 使得 $f(v) = \langle \tau f, v \rangle$。
    原问题等价于求解 $Au = \tau f$。
    构造迭代 $u_{k+1} = u_k - \rho (Au_k - \tau f)$。当 $0 < \rho < \frac{2\alpha}{M^2}$ 时，映射 $F(v) = v - \rho(Av - \tau f)$ 是压缩映射。
    由 Banach 不动点定理可知存在唯一不动点。

### 1.4 Sobolev 空间与弱解

#### 1.4.1 弱导数与 Sobolev 空间定义

Poisson 方程的边值问题通常有如下形式：

$$
\begin{cases}
    -\Delta u=f ,&x\in \Omega\\
    u=\bar{u}_0,&x\in \partial \Omega_0\\
    \frac{\partial u}{\partial n}+bu=g,&x\in \partial \Omega_1
\end{cases}
$$

!!! definition "弱导数 (Weak Derivative)"
    设 $u\in \mathbb{L}_{\mathrm{loc}}^1(\Omega)$，若存在 $v_\alpha\in \mathbb{L}_{\mathrm{loc}}^1(\Omega)$，使得对任意的 $\phi\in C_0^\infty(\Omega)$，有
    
    $$
    \int_{\Omega} \phi v_\alpha \mathrm{d}x = (-1)^{|\alpha|} \int_{\Omega} u \partial^\alpha \phi \mathrm{d}x
    $$
    
    则称 $v_\alpha$ 为 $u$ 关于多重指标 $\alpha$ 的一个 $\left|\alpha\right|$ 阶 **弱导数**，记为 $\partial^\alpha u = v_\alpha$。

!!! definition "Sobolev 空间"
    设 $m$ 为非负整数，$1\le p\le \infty$，定义
    
    $$
    \mathbb{W}^{m,p}(\Omega)=\left\{u\in \mathbb{L}^p(\Omega): \partial^\alpha u \in \mathbb{L}^p(\Omega), \forall |\alpha|\le m\right\}
    $$
    
    范数为 $\|u\|_{m,p,\Omega} = \left( \sum_{|\alpha|\le m} \|\partial^\alpha u\|_{0,p,\Omega}^p \right)^{1/p}$。
    特别地，当 $p=2$ 时，记 $\mathbb{H}^m(\Omega) = \mathbb{W}^{m,2}(\Omega)$，这是一个 Hilbert 空间。
    $\mathbb{H}_0^m(\Omega)$ 定义为 $C_0^\infty(\Omega)$ 在 $\mathbb{H}^m(\Omega)$ 中的闭包（即迹为零的函数空间）。

#### 1.4.2 常用不等式与嵌入定理

* **Minkowski 不等式**：
    
    $$
    \|u+v\|_{0,p,\Omega} \le \|u\|_{0,p,\Omega} + \|v\|_{0,p,\Omega}
    $$

* **Holder 不等式**：
    
    $$
    \int_{\Omega} |uv| \mathrm{d}x \le \|u\|_{0,p,\Omega} \|v\|_{0,q,\Omega}, \quad \frac{1}{p} + \frac{1}{q} = 1
    $$

* **Cauchy-Schwarz 不等式**：当 $p=q=2$ 时。
  
    $$
    \int_{\Omega} |uv| \mathrm{d}x \le \|u\|_{0,2,\Omega} \|v\|_{0,2,\Omega}
    $$

* **Poincaré-Friedrichs 不等式**：
    
    $$
    \exists \alpha >0 \text{ s.t. } a(v,v)\ge \alpha \|v\|_{1,2}^2, \forall v\in H_0^1(\Omega).
    $$

    这保证了 $a(\cdot,\cdot)$ 在 $H_0^1$ 上的椭圆性。

* **迹定理 (Trace Theorem)**：
    对于 $H^1(\Omega)$ 中的函数，虽然其在边界 $\partial \Omega$（测度为0）上无经典定义，但可定义迹算子 $\nu: H^1(\Omega) \to L^2(\partial \Omega)$，且该算子连续（紧）。即 $H^1(\Omega) \hookrightarrow L^2(\partial \Omega)$。

### 1.5 椭圆边值问题的变分形式

#### 1.5.1 Dirichlet 边值问题

考虑 (D1): $\begin{cases}-\Delta u=f,&x\in\Omega,\\ u=\bar{u}_{0},&x\in\partial\Omega.\end{cases}$

由 Green 公式 $\int_{\Omega}\nabla u\cdot\nabla v~dx=\int_{\partial\Omega}v\frac{\partial u}{\partial n}dx+\int_{\Omega}vf~dx$，取 $v \in C_0^\infty(\Omega)$，边界项消失。

!!! definition "Dirichlet 问题的弱解"
    定义试探空间 $\mathbb{V}(\bar{u}_0;\Omega)=\{u\in H^1(\Omega) | u|_{\partial\Omega} = \bar{u}_0\}$，检验空间 $H_0^1(\Omega)$。
    若 $u\in \mathbb{V}(\bar{u}_0;\Omega)$ 满足：
    
    $$
    a(u,v) := \int_{\Omega} \nabla u \cdot \nabla v \mathrm{d}x = \int_{\Omega} f v \mathrm{d}x, \quad \forall v\in H_0^1(\Omega)
    $$
    
    则称 $u$ 为弱解。

!!! theorem "存在唯一性"
    由 Lax-Milgram 定理及 Poincaré 不等式，若 $\bar{u}_0$ 可延拓至 $H^1$ 且边界光滑，则弱解存在且唯一。

#### 1.5.2 Neumann 边值问题

考虑 (D2): $\begin{cases}-\Delta u=f,&x\in\Omega,\\ \frac{\partial u}{\partial n}=g,&x\in\partial\Omega.\end{cases}$

!!! definition "Neumann 问题的弱解"
    求 $u\in H^1(\Omega)$，使得
    
    $$
    a(u,v) = (f,v) + (g,v)_{\partial \Omega}, \quad \forall v\in H^1(\Omega)
    $$
    
    
    其中 $(g,v)_{\partial \Omega} = \int_{\partial \Omega} gv ds$。

* **注意**：Dirichlet 边界是**强制边界条件**（定义在空间中），Neumann 边界是**自然边界条件**（包含在变分方程中）。
* **唯一性**：Neumann 问题解不唯一（相差常数）。若限制在空间 $\mathbb{V}_0=\{v\in H^1(\Omega) | \int_\Omega v dx = 0\}$ 中，则解唯一。

## 2. 有限元方法 (FEM)

### 2.1 Ritz 与 Galerkin 方法

对于变分问题：求 $u\in V$，使得 $a(u,v)=(f,v), \forall v\in V$。

* **Ritz 方法**（基于极小化）：在有限维子空间 $V_h \subset V$ 中寻找 $u_h$，使得 $J(u_h) = \min_{v_h \in V_h} J(v_h)$。
* **Galerkin 方法**（基于正交化）：在有限维子空间 $V_h \subset V$ 中寻找 $u_h$，使得
    
    $$
    a(u_h, v_h) = (f, v_h), \quad \forall v_h \in V_h
    $$

设 $V_h = \text{span}\{\varphi_1, \dots, \varphi_{N_h}\}$，令 $u_h = \sum_{j=1}^{N_h} U_j \varphi_j$。代入 Galerkin 方程，取 $v_h = \varphi_i$，得线性方程组：

$$
\sum_{j=1}^{N_h} a(\varphi_j, \varphi_i) U_j = (f, \varphi_i), \quad i=1,\dots,N_h
$$

即 **$KU=F$**，其中：
* $K_{ij} = a(\varphi_j, \varphi_i)$ 为**刚度矩阵**（Stiffness Matrix）。
* $F_i = (f, \varphi_i)$ 为**载荷向量**（Load Vector）。

### 2.2 有限元空间的构造

FEM 的核心在于构造具有局部支集的基函数 $\varphi_i$，使得 $K$ 稀疏。

#### 2.2.1 一维 Lagrange 单元
对于 $\Omega=(0,1)$，剖分为 $0=x_0 < x_1 < \dots < x_N=1$。
定义“帽函数”（Hat functions）$\varphi_i(x)$：

$$
\varphi_{i}(x)=\begin{cases}\frac{x-x_{i-1}}{h},&x_{i-1}\le x\le x_{i},\\ \frac{x_{i+1}-x}{h},&x_{i}\le x\le x_{i+1},\\ 0,&\text{otherwise}.\end{cases}
$$

此时刚度矩阵 $K$ 为三对角矩阵：$K=\frac{1}{h}\text{tridiag}(-1, 2, -1)$。

#### 2.2.2 二维三角剖分与重心坐标
将 $\Omega$ 剖分为三角形集合 $\mathcal{T}_h=\{T_e\}$。
在每个单元 $T_e$ 上，线性基函数 $\lambda_\alpha^e$ ($\alpha=1,2,3$) 由**重心坐标**（Barycentric coordinates）给出。

* 重心坐标性质：$\lambda_i(A_j) = \delta_{ij}$，且 $\sum \lambda_i = 1$。
* 刚度矩阵计算转化为单元上的积分：
    
    $$
    k_{ij} = \sum_{e} \int_{T_e} \nabla \varphi_j \cdot \nabla \varphi_i dx
    $$
    
    仅当节点 $i, j$ 属于同一单元时，积分非零。

#### 2.2.3 刚度矩阵计算算法（仿射变换法）
实际计算中，利用参考单元 $T_{ref}$（顶点 $(0,0), (1,0), (0,1)$）和仿射变换 $L_e: T_{ref} \to T_e$。

$$
x = L_e(\hat{x}) = A_e \hat{x} + a_e
$$

单元刚度矩阵计算公式：

$$
K^e = \int_{T_{ref}} (\nabla_{\hat{x}} \lambda^S) A_e^{-1} (A_e^{-1})^T (\nabla_{\hat{x}} \lambda^S)^T |\det A_e| d\hat{x}
$$

其中 $A_e$ 为雅可比矩阵。这种方法将所有积分转化到固定的参考单元上进行，便于编程实现。

**算法流程**：

1. 初始化 $K=0, F=0$。
2. 循环遍历每个单元 $e=1 \dots M$：
    * 计算单元刚度矩阵 $K^e$ 和单元载荷向量 $F^e$。
    * 将 $K^e, F^e$ 累加到全局矩阵 $K, F$ 的对应位置（Assembly）。
3. 处理边界条件。
4. 求解 $KU=F$。

### 2.3 一般有限元定义与实例

!!! definition "有限元三要素 $(K, P_K, \Sigma_K)$"
    
    * **$K$**：几何单元（三角形、四边形、四面体等）。
    * **$P_K$**：单元上的函数空间（通常为多项式空间，如 $\mathbb{P}_k$ 或 $\mathbb{Q}_k$）。
    * **$\Sigma_K$**：自由度集合（Degrees of Freedom, DOFs），其为 $P_K$ 的对偶基。

#### 2.3.1 Lagrange 单元（单纯形）

* $K$ 为三角形，$\Sigma_K$ 为点值。
* $k=1$：$\mathbb{P}_1$，节点为顶点。
* $k=2$：$\mathbb{P}_2$，节点为顶点+边中点。

#### 2.3.2 矩形单元（张量积结构）

* $K$ 为矩形。
* **$\mathbb{Q}_1$ 单元**（双线性）：$span\{1, x, y, xy\}$，节点为4个顶点。
* **$\mathbb{Q}_2$ 单元**（双二次）：节点为9个（顶点+边中点+中心）。

#### 2.3.3 Hermite 型有限元与 $C^1$ 单元
为了解决四阶方程（如板弯曲问题），需要 $C^1$ 连续性。

* **Argyris 三角形**：$P_K = \mathbb{P}_5$（21个自由度）。自由度包括：顶点函数值、一阶导、二阶导，以及边法向导数。
* **Bogner-Fox-Schmidt 矩形**：$P_K = \mathbb{Q}_3$（16个自由度）。自由度包括：顶点值、$\partial_x, \partial_y, \partial_{xy}$。

## 3. 有限元误差分析

### 3.1 Céa 引理

!!! theorem "Céa 引理"
    设 $u$ 为变分问题解，$u_h$ 为有限元解。若 $a(\cdot,\cdot)$ 满足连续性和椭圆性，则存在常数 $C$，使得
    
    $$
    \|u-u_h\|_V \le C \inf_{v_h\in \mathbb{V}_h} \|u-v_h\|_V
    $$
    
    特别地，若 $a$ 对称，则 $u_h$ 是 $u$ 在能量范数 $\|\cdot\|_a$ 下的最佳逼近，即 $\|u-u_h\|_a = \inf_{v_h\in V_h} \|u-v_h\|_a$。

这意味着 FEM 的误差估计转化为**插值误差估计**。

### 3.2 插值误差估计

!!! theorem "Sobolev 插值定理"
    设 $u\in H^{r+1}(\Omega)$，$\Pi_h u$ 为 $k$ 次分段多项式插值（$k \le r$），且剖分满足正则性条件（Regularity assumption），则：
    
    $$
    \|u-\Pi_h u\|_{H^m} \le C h^{r+1-m} |u|_{H^{r+1}}, \quad 0 \le m \le r
    $$

结合 Céa 引理（取 $m=1$），可得**能量范数误差**：

$$
\|u-u_h\|_{H^1} \le C h^k |u|_{H^{k+1}}
$$


对于线性元 ($k=1$)：$\|u-u_h\|_{H^1} = O(h)$。

### 3.3 $L^2$ 范数误差估计 (Aubin-Nitsche 对偶技巧)

Céa 引理只能给出 $H^1$ 范数下的最佳逼近。由插值定理知 $\|u-\Pi_h u\|_{L^2} = O(h^{k+1})$，但直接推导只能得到 $\|u-u_h\|_{L^2} \le \|u-u_h\|_{H^1} = O(h^k)$，这并非最优。

利用 **Aubin-Nitsche 对偶技巧** 可证明最优 $L^2$ 估计：

引入对偶问题：求 $\varphi \in V$，使得

$$
a(v, \varphi) = (e, v), \quad \forall v \in V
$$

其中 $e = u - u_h$。假设对偶问题满足 $H^2$ 正则性，即 $\|\varphi\|_{H^2} \le C \|e\|_{L^2}$。
则：

$$
\|e\|_{L^2}^2 = (e, e) = a(e, \varphi) = a(e, \varphi - \Pi_h \varphi)
$$

利用 Galerkin 正交性 $a(e, v_h)=0$。

$$
\le M \|e\|_{H^1} \|\varphi - \Pi_h \varphi\|_{H^1}
\le M (Ch^k |u|_{H^{k+1}}) (Ch |\varphi|_{H^2})
\le C h^{k+1} |u|_{H^{k+1}} \|e\|_{L^2}
$$

消去 $\|e\|_{L^2}$ 得：

$$
\|u-u_h\|_{L^2} \le C h^{k+1} |u|_{H^{k+1}}
$$

对于线性元 ($k=1$)：$\|u-u_h\|_{L^2} = O(h^2)$。

### 3.2 插值定理的详细证明（补充）

在上一节中我们给出了插值误差的结论，这里根据讲义补充定理 7（插值定理）的详细证明。

!!! theorem "定理 7 (插值定理)"
    设 $u\in H^{r+1}(\Omega)$，$\Pi_h u|_K \in \mathbb{P}_r(K)$，且网格剖分 $K$ 是“正则”的。则对于满足 $\Pi_h u(A_i)=u(A_i)$ 的插值函数，有：
    
    $$
    \|u-\Pi_h u\|_{H^m} \le C h^{r+1-m} |u|_{H^{r+1}}, \quad m=0,\dots,r
    $$
    
    其中 $|v|_{H^m} := (\sum_{|\alpha|=m} \int |D^\alpha v|^2 dx)^{1/2}$ 是半范数。

!!! proof "证明"
    **1. 一维情形 ($\mathbb{R}^1$) 且 $r=1$ 的证明：**
    
    设 $e = u - \Pi_h u$，节点为 $x_0 < x_1 < \dots < x_N$。
    由于是线性插值，我们在节点处有 $e(x_j) = 0$。根据 Rolle 定理，存在 $\xi_j \in (x_{j-1}, x_j)$ 使得 $e'(\xi_j) = 0$。
    
    对于任意 $x \in [x_{j-1}, x_j]$，由微积分基本定理：
    
    $$
    e'(x) = \int_{\xi_j}^x e''(s) ds
    $$
    
    注意到 $\Pi_h u$ 在单元上是线性的，故 $(\Pi_h u)'' = 0$，因此 $e''(s) = u''(s)$。于是：
    
    $$
    e'(x) = \int_{\xi_j}^x u''(s) ds
    $$
    
    两边取平方并利用 Cauchy-Schwarz 不等式：
    
    $$
    |e'(x)|^2 \le \left( \int_{x_{j-1}}^{x_j} 1^2 ds \right) \left( \int_{x_{j-1}}^{x_j} |u''(s)|^2 ds \right) = h \int_{x_{j-1}}^{x_j} |u''(s)|^2 ds
    $$
    
    对上式在 $[x_{j-1}, x_j]$ 上积分：
    
    $$
    \int_{x_{j-1}}^{x_j} |e'(x)|^2 dx = h \cdot |e'(\tilde{x})|^2 \le h^2 \int_{x_{j-1}}^{x_j} |u''(s)|^2 ds
    $$
    
    这就证明了半范数估计：
    
    $$
    \|e'\|_{L^2}^2 \le h^2 \|u''\|_{L^2}^2 \implies |e|_{H^1} \le h |u|_{H^2}
    $$
    
    接下来估计 $L^2$ 误差。由于 $e(x_j)=0$，有 $e(x) = \int_{x_{j-1}}^x e'(s) ds$。
    
    $$
    |e(x)|^2 \le \left( \int_{x_{j-1}}^{x_j} |e'(s)| ds \right)^2 \le h \int_{x_{j-1}}^{x_j} |e'(s)|^2 ds
    $$
    
    将之前 $|e'|^2$ 的界代入：
    
    $$
    |e(x)|^2 \le h \cdot (h^2 \int_{x_{j-1}}^{x_j} |u''(s)|^2 ds) = h^3 \int_{x_{j-1}}^{x_j} |u''(s)|^2 ds
    $$
    
    再次在单元上积分：
    
    $$
    \int_{x_{j-1}}^{x_j} |e(x)|^2 dx \le h^4 \int_{x_{j-1}}^{x_j} |u''(s)|^2 ds
    $$
    
    这就证明了：
    
    $$
    \|e\|_{L^2} \le h^2 |u|_{H^2}
    $$
    
    **2. 二维情形 ($\mathbb{R}^2$) 且 $r=1$ 的证明思路：**
    
    设 $h_K$ 为单元 $K$ 的最长边，$\rho_K$ 为 $K$ 的内切圆直径。
    若存在 $\beta > 0$ 使得 $\rho_K / h_K \ge \beta, \forall K$，则称网格是“正则”的。
    对于 $u \in H^2$，$\Pi_h u|_K \in \mathbb{P}_1(K)$，可以证明点态误差估计：
    
    $$
    \max_{x\in K} |u - \Pi_h u| \le 2 h^2 \max_{|\alpha|=2} |D^\alpha u|
    $$
    
    $$
    \max_{x\in K} |D^\alpha(u - \Pi_h u)| \le 6 \frac{h^2}{\rho_K} \max_{|\alpha|=2} |D^\alpha u|
    $$
    
    通过积分可得：
    
    $$
    \|u - \Pi_h u\|_{L^2} \le C h^2 |u|_{H^2}
    $$
    
    $$
    |u - \Pi_h u|_{H^1} \le C h |u|_{H^2}
    $$
    
    这就完成了定理 7 的证明。因此，若 $u$ 越光滑（$r$ 越大），有限元解的收敛阶越高。

### 3.4 负范数误差估计 (Negative Norm Estimate)

除了通常的 $H^1$ 和 $L^2$ 误差估计外，我们还可以考虑更弱的范数下的误差，即负范数误差。

!!! definition "负范数"
    定义 $H^{-r}$ 范数为：
    
    $$
    \|u\|_{H^{-r}} := \sup_{0\ne v \in H^r} \frac{\langle u, v \rangle}{\|v\|_{H^r}} = \sup_{\|v\|_{H^r}=1} \langle u, v \rangle
    $$

我们继续使用 Aubin-Nitsche 对偶技巧来推导。
考虑对偶问题：

$$
\begin{cases}
    -\Delta \varphi = \phi, & x \in \Omega \\
    \varphi = 0, & x \in \partial \Omega
\end{cases}
$$

对于任意 $\phi \in H^r$，根据高阶椭圆正则性，有 $\|\varphi\|_{H^{r+2}} \le C \|\phi\|_{H^r}$。

令 $e = u - u_h$。对于任意 $\phi \in H^r$，我们有：

$$
\langle e, \phi \rangle = a(e, \varphi)
$$

利用 Galerkin 正交性 $a(e, \Pi_h \varphi) = 0$（注意这里 $\Pi_h \varphi \in V_h$）：

$$
\langle e, \phi \rangle = a(e, \varphi - \Pi_h \varphi)
$$

利用 Cauchy-Schwarz 不等式和插值误差估计：

$$
\begin{aligned}
\langle e, \phi \rangle &\le \|e\|_{H^1} \cdot \|\varphi - \Pi_h \varphi\|_{H^1} \\
&\le \|e\|_{H^1} \cdot (C h^{r+1} |\varphi|_{H^{r+2}}) \\
&\le \|e\|_{H^1} \cdot C h^{r+1} \|\varphi\|_{H^{r+2}} \\
&\le \|e\|_{H^1} \cdot C h^{r+1} \|\phi\|_{H^r}
\end{aligned}
$$

最后一步用到了正则性估计。
将 $\|\phi\|_{H^r}$ 除到左边，并取上确界：

$$
\|e\|_{H^{-r}} = \sup_{0\ne \phi \in H^r} \frac{\langle e, \phi \rangle}{\|\phi\|_{H^r}} \le C h^{r+1} \|e\|_{H^1}
$$

如果我们已知 $\|e\|_{H^1} \le C h^k |u|_{H^{k+1}}$（假设使用 $k$ 次多项式单元），那么：

$$
\|u - u_h\|_{H^{-r}} = O(h^{k+r+1})
$$

这表明在负范数意义下，有限元解具有更高的收敛阶。