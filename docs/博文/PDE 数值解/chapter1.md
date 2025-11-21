首先我们给出推广的定义。考虑高维 PDE

$$
-\mathcal{L}u=f,\quad \mathcal{L}=\sum_{k=1}^{2m}\sum_{i_1,\cdots,i_k=1}^n a_{i_1\cdots i_k}(x)\frac{\partial ^k}{\partial x_{i_1}\cdots \partial x_{i_k}}+\cdots +a_0
$$

!!! abstract "定义"
    我们称其为椭圆型的，若
    $$
    \forall x\in \Omega,\forall \xi \in \mathbb{R}^n\setminus \{0\},\sum_{i_1\cdots i_{2m}=1}^n a_{i_1\cdots i_{2m}}(x)\xi_{i_1}\cdots \xi_{i_{2m}}\ge \alpha(x)\sum_{i=1}^n \xi_i^{2m}
    $$
    其中 $\alpha(x)>0$。若 $\inf_{x\in \Omega} \alpha(x)>0$，则称其为一致严格椭圆型。对 $n=2$ 的情形，该定义等价于 $A\succ 0$。

!!! abstract "定义"
    对 $p\ge 1$，向量 $a\in \mathbb{R}^n$ 的 $p-$范数定义为 $\|a\|_p=\left(\sum_{i=1}^n |a_i|^p\right)^\frac{1}{p}$。对矩阵 $A\in \mathbb{R}^{n\times m}$，其 $p-$范数定义为

    $$
    \|A\|_p=\max \left\{\|Ax\|_p\Big| x\in \mathbb{R}^m,\|x\|_p=1\right\}
    $$

    $A$ 的 Schatten 范数定义为：

    $$
    \|A\|_{S_p}=\left[\text{Tr}\left(\left(\sqrt{A^TA}\right)^p\right)\right]^\frac{1}{p}=\left[\sum_i s_i^p\right]^\frac{1}{p}
    $$

    其中 $s_i$ 为 $A$ 的奇异值。

!!! remark "注"
    我们有 $\|A\|_{S_\infty}=\|A\|_2,\|A\|_{S_2}=\|A\|_F$.

## 1.模型问题

对于一般的 2 阶椭圆方程

$$
-\mathcal{L}u=f,\quad \mathcal{L}=\sum_{i,j=1}^n a_{ij}(x)\frac{\partial^2}{\partial x_i\partial x_j}+\sum_{i=1}^n b_i(x)\frac{\partial }{\partial x_i}+c(x)
$$

我们考虑三种不同的边界条件：

$$
\begin{cases}
    \text{Dirichlet}: u|_{x\in \partial \Omega}=g\\
    \text{Neumann}: \frac{\partial u}{\partial n}|_{x\in \partial \Omega}=g,n \text{ 为 }\partial\Omega \text{ 的法向量}\\
    \text{Robin}: (\frac{\partial u}{\partial n}+\alpha u)|_{x\in \partial \Omega}=g,\alpha>0.
\end{cases}
$$

对于 Neumann 边界或周期性边界，差分矩阵通常具有特定的形式 $\left( \begin{matrix}
	1&		-1&		&		\\
	-1&		2&		-1&		\\
	&		\ddots&		\ddots&		-1\\
	&		&		-1&		1\\
\end{matrix} \right)$
或
$\left( \begin{matrix}
	2&		-1&		&		-1\\
	-1&		2&		-1&		\\
	&		\ddots&		\ddots&		-1\\
	-1&		&		-1&		2\\
\end{matrix} \right)$
。这些矩阵是奇异的，因此解不唯一！必须添加额外条件。这可能会破坏系数矩阵的性质。因此，我们主要讨论 Dirichlet 边界。

我们求解的模型问题是带有 Dirichlet 边界的 Poisson 方程：

$$-\Delta u(x,y)=f, \quad x\in\Omega=(0,1)\times(0,1)$$

### 1.1 有限差分法 (Finite Difference Method)

通过有限差分，我们令 $\Delta x = \Delta y = h$，网格点为 $x_i=ih, y_j=jh$。
索引集合定义为：

* $J=\{ (i,j)\Big| (x_i,y_j)\in \bar{\Omega}\}$
* $J_\Omega = \{(i, j) \mid (x_i, y_j) \in \Omega\}$
* $J_{\partial\Omega} = J_D=\{(i, j) \mid (x_i, y_j) \in \partial\Omega\}$

**5点差分格式**：令近似解 $U:J\rightarrow\mathbb{R}$ 为网格集 $J$ 上的函数。
根据泰勒公式，我们定义离散算子 $L_h U_{ij}$：

$$L_h U_{ij} = \frac{U_{i+1,j}-2U_{i,j}+U_{i-1,j}}{h^2}+\frac{U_{i,j+1}-2U_{i,j}+U_{i,j-1}}{h^2}=\frac{U_{i+1,j}+U_{i-1,j}+U_{i,j+1}+U_{i,j-1}-4U_{ij}}{h^{2}}$$

由泰勒展开：

$$\frac{u(x_{i+1},y_{j})-2u(x_{i},y_{j})+u(x_{i-1},y_{j})}{h^2}-u_{xx}(x_i,y_j)=\frac{h^2}{24}(u_{xxxx}(\xi_1,y_j)+u_{xxxx}(\xi_2,y_j))$$

$$\frac{u(x_{i},y_{j+1})-2u(x_{i},y_{j})+u(x_{i},y_{j-1})}{h^2}-u_{yy}(x_i,y_j)=\frac{h^2}{24}(u_{yyyy}(x_i,\eta_1)+u_{yyyy}(x_i,\eta_2))$$

故

$$L_{h}u(x_{i},y_{j})-\Delta u(x_{i},y_{j})=\frac{h^{2}}{12}(u_{xxxx}(\xi,y_{j})+u_{yyyy}(x_{i},\eta))$$

令 $U$ 为向量 $[U_{ij}]_{i,j=1}^{N-1}$，$F$ 为向量 $[f(x_{i},y_{j})]_{i,j=1}^{N-1}$，则我们只需求解：

$$\begin{cases}-L_{h}U=F, \\ U_{ij}=g(x_{i},y_{j}), & (i,j)\in J_{\partial\Omega}\end{cases}$$

这是一个 $(N-1)^2$ 维的线性系统。未知量是 $J_{\Omega}$ 中的 $U_{ij}$。可以证明（例如利用离散最大模原理）方程：

$$\begin{cases}-L_{h}U=0 \\ U_{ij}=0, & (i,j)\in J_{\partial\Omega}\end{cases}$$

仅有零解 $U=0$，因此原方程有唯一解。

### 1.2 误差分析

令 $e=[e_{ij}]$，其中 $e_{ij}=U_{ij}-u(x_{i},y_{j})$。局部截断误差为：

$$T_{h}=[T_{ij}], \quad T_{ij}=-L_{h}U_{ij}-(-\mathcal{L}_{h}u(x_{i},y_{j}))=-L_{h}e_{ij}$$

我们也有

$$T_{ij}=f_{ij}+L_{h}u(x_{i},y_{j})=(-\mathcal{L}+L_{h})u(x_{i},y_{j})$$

!!! info "定理 1 (离散最大模原理 Discrete Maximum Principle)"
    对于如前定义的 $L_h$：

    * 若 $-L_{h}U_{ij}\le0$，则 $\max_{J} U_{ij} \le \max_{J_{\partial\Omega}}U_{ij}$。
    * 若 $-L_{h}U_{ij}\ge0$，则 $\min_{J} U_{ij} \ge \min_{J_{\partial\Omega}}U_{ij}$。

!!! quote "定义 2"
    1.  如果对于某种范数 $||\cdot||$，有 $\lim_{h\rightarrow0}||T_{h}||=0$，则称差分格式具有**相容性 (Consistency)**。
    2.  如果对于任意 $f_1, f_2$，由 $-L_h u_1 = f_1, -L_h u_2 = f_2$ 推出 $||u_1 - u_2|| \le C||f_1 - f_2||$，则称差分格式具有**稳定性 (Stability)**。
        * 这里，如果我们能得到 $||L_{h}^{-1}||\le C$ 且 $C$ 与 $h$ 无关，则稳定性得到保证。
    3.  如果对于某种范数 $||\cdot||$，有 $\lim_{h\rightarrow0}||e||=0$，则称差分格式具有**收敛性 (Convergence)**。

!!! remark "注"
    由 $T_{ij}=-L_{h}e_{ij}$，我们有 $||e_{ij}||\le||L_{h}^{-1}||\cdot||T_{ij}||$。如果 $||L_{h}^{-1}||\le C$ 且 $||T_{ij}||\rightarrow0$，则 $||e_{ij}||\rightarrow0$。即：**相容性 + 稳定性 $\Rightarrow$ 收敛性**。

### 1.3 $L^{2}$-稳定性

令 $A=-L_{h}$。我们有

$$A=D_{h}\otimes I+I\otimes D_{h},\quad D_{h}=\frac{1}{h^{2}}\begin{pmatrix} 2 & -1 & & \\ -1 & 2 & \ddots & \\ & \ddots & \ddots & -1 \\ & & -1 & 2 \end{pmatrix}_{(N-1)\times (N-1)}$$

即 $A=-\frac{1}{h^2}\begin{pmatrix} T & -I & & \\ -I & T & \ddots & \\ & \ddots & \ddots & -I \\ & & -I & T \end{pmatrix},T=\begin{pmatrix} 4 & -1 & & \\ -1 & 4 & \ddots & \\ & \ddots & \ddots & -1 \\ & & -1 & 4 \end{pmatrix}$。可以计算出 $D_h$ 的特征值为 $\frac{1}{h^{2}}(2-2\cos\frac{j\pi}{N}), j=1,\dots,N-1$，对应的特征向量为 $v_{j}=[\sin\frac{jk\pi}{N}]_{k=1}^{N-1}$。
最大和最小特征值为：

$$\lambda_\max (D_h)=\frac{2}{h^2}\left(1-\cos \frac{(N-1)\pi}{N}\right)\le \frac{4}{h^2}$$

$$\lambda_\min (D_h)=\frac{2}{h^2}\left(1-\cos \frac{\pi}{N}\right)=\frac{4}{h^2}\sin^2\frac{\pi}{2N}\ge 4$$

故 $\|D_h\|_2 \le \frac{4}{h^2},\|D_h^{-1}\|_2\le \frac{1}{4}$。

由 $A=D_{h}\otimes I+I\otimes D_{h}$，$A$ 的特征值为 $\frac{1}{h^{2}}(4-2\cos\frac{i\pi}{N}-2\cos\frac{j\pi}{N})$，$A$ 的特征向量为 $v_{ij}=v_{i}\otimes v_{j}$。
我们有 $\lambda_{\min}(L_{h}) \ge 8$。
因此 $||L_{h}^{-1}||_{2}\le\frac{1}{8}=C$，且 $C$ 与 $h$ 无关。稳定性和收敛性均得到保证。
根据您的要求，以下是文件从 **1.4节** 开始的完整翻译，已删除所有引用标记。

***

### 1.4 $L^{\infty}$-稳定性与 M-矩阵

!!! note "引理1"
    若 $-L_{h}U_{ij}=f_{ij}$ 且 $U_{ij}|_{J_{\partial\Omega}}=g_{ij}$，则存在常数 $C$ 使得

    $$\max_{J}|U_{ij}|\le C(\max_{J}|f_{ij}|+\max_{J_{\partial\Omega}}|g_{ij}|)$$

!!! success "证明"
    令 $\phi(x,y)=(x-\frac{1}{2})^{2}+(y-\frac{1}{2})^{2}$。我们有 $L_{h}\phi(x_{i},y_{j})=4$。

    1) 取 $V_{ij}=U_{ij}+\frac{1}{4}F\phi(x_{i},y_{j})$，其中 $F = \max |f_{ij}|$。则 $L_{h}V_{ij}=L_{h}U_{ij}+F=-f_{ij}+F\ge0$。

    由最大模原理，$\max_{J} V_{ij}\le \max_{J_{\partial\Omega}}V_{ij}$。
    所以 $U_{ij}\le V_{ij}\le \max_{J_{\partial\Omega}}V_{ij}\le \max_{J_{\partial\Omega}}|U_{ij}|+\frac{1}{4}F \max_{J_{\partial\Omega}}\phi(x_{i},y_{j})\le \max_{J_{\partial\Omega}}|g_{ij}|+F$。

    2) 取 $V_{ij}=-U_{ij}+\frac{1}{4}F\phi(x_{i},y_{j})$ 并重复上述过程。

!!! abstract "定义3"
    矩阵 $A$ 被称为 $M$-矩阵，如果满足以下条件：

    >$A$ 是 $Z$-矩阵，即对于任意 $i\ne j$，有 $a_{ij}\le 0$；

    > 满足下列条件之一：
    >    > (主子式正性) $A$ 的所有主子式均为正；

    >    > (正稳定) $A$ 的所有特征值具有正实部（如果 $A$ 是对称的，则 $A$ 的所有特征值均为正，即 $A$ 是对称正定的）；

    >    > (单调性) $A$ 非奇异且 $A^{-1}\ge0$，即 $A^{-1}$ 的所有元素均为非负；

    >    > (对角占优) 对任意 $i$，有 $|a_{ii}|\ge\sum_{j\ne i}|a_{ij}|$，且存在 $i_{0}$ 使得 $|a_{i_{0}i_{0}}|>\sum_{j\ne i_{0}}|a_{i_{0}j}|$。并且 $A$ 是不可约的。

显然，$A=-L_{h}$ 是一个 $M$-矩阵。我们可以计算：

$$[D_{h}^{-1}]_{ij}=h^{2}\frac{1}{N}\min\{i,j\}(N-\max\{i,j\})\ge0$$

$$-[L_{h}^{-1}]_{ij,pk}=h^{2}\sum_{m=1}^{N-1}\sum_{n=1}^{N-1}\frac{\sin(imh\pi)\sin(jnh\pi)\sin(pmh\pi)\sin(knh\pi)}{\lambda_{m,n}}\ge0$$

其中 $\lambda_{m,n}=\frac{2}{h^{2}}(2-\cos(mh\pi)-\cos(nh\pi))$。
所以 $||D_{h}^{-1}||_{\infty}\le\frac{1}{8}, ||L_{h}^{-1}||_{\infty}\le\frac{1}{8}$。因此满足稳定性。

---

## 2 一般椭圆方程

### 2.1 有限差分法

对于一般椭圆方程：$-\mathcal{L}u=f, x\in\Omega$。

$$\mathcal{L}u = \underbrace{\sum_{i,j=1}^{n}\frac{\partial}{\partial x_{i}}(a_{ij}(x)\frac{\partial u}{\partial x_{j}})}_{\text{散度形式}} + \underbrace{\sum_{i=1}^{n}b_{i}(x)\frac{\partial u}{\partial x_{i}}}_{\text{对流项}} + c(x)u$$

带有 Dirichlet 边界 $u|_{\partial\Omega}=g$。

!!! example "例子（稳态对流-扩散方程）"
    $$-\nabla\cdot(a(x,y)\nabla u(x,y))+\nabla\cdot(u(x,y)\vec{v}(x,y))=f(x,y)$$

    有限差分方法为：

    $$-\frac{\partial}{\partial x_{i}}(a_{ij}\frac{\partial u_{ij}}{\partial x_{1}})\approx-\frac{\partial}{\partial x_{1}}(a_{ij}\frac{u_{i+\frac{1}{2},j}-u_{i-\frac{1}{2},j}}{h})\approx-a_{i+\frac{1}{2},j}\frac{u_{i+1,j}-u_{i,j}}{h^{2}}+a_{i-\frac{1}{2},j}\frac{u_{i,j}-u_{i-1,j}}{h^{2}}$$

    $$\frac{\partial}{\partial x_{1}}(uv^{1})\approx\frac{(uv^{1})_{i+1,j}-(uv^{1})_{i-1,j}}{2h}$$

### 2.2 有限体积法

对于每个 $(i, j)$，我们在半点构成的正方形区域 $W$ 上对 PDE 进行积分。由高斯公式，我们有：

$$-\int_{\partial W}a\nabla u\cdot\vec{n}ds+\int_{\partial W}u\vec{v}\cdot\vec{n}ds=\int_{W}f~dxdy$$

$$
\begin{matrix}
	&		&		\,\,\,\,\,\,\,\,  \bullet ^{\left( i,j+1 \right)}&		&		\\
	&		&		\cdot ^{P_N}&		&		\\
	\bullet ^{\left( i-1,j \right)}&		\cdot ^{P_W}&		\,\,\,\bullet ^{\left( i,j \right)}&		\cdot ^{P_E}&		\bullet ^{\left( i+1,j \right)}\\
	&		&		\cdot ^{P_S}&		&		\\
	&		&		\,\,\,\,\,\,\,\,  \bullet ^{\left( i,j-1 \right)}&		&		\\
\end{matrix}
$$


然后我们离散化这些积分：

$$\int_{W}f~dxdy\approx f_{ij}\Delta x\Delta y$$

$$\int_{P_{E}}a\nabla u\cdot\vec{n}ds=\int_{(j-\frac{1}{2})\Delta y}^{(j+\frac{1}{2})\Delta y}a(x_{i+\frac{1}{2}},y)\frac{\partial}{\partial x}u(x_{i+\frac{1}{2}},y)dy\approx a(x_{i+\frac{1}{2}},y_{j})\frac{\partial}{\partial x}u(x_{i+\frac{1}{2}},y_{j})\cdot\Delta y\approx a(x_{i+\frac{1}{2}},y_{j})\frac{u(x_{i+1},y_{j})-u(x_{i},y_{j})}{\Delta x}\cdot\Delta y$$

$$\int_{P_{E}}u\vec{v}\cdot\vec{n}ds=\int_{(j-\frac{1}{2})\Delta y}^{(j+\frac{1}{2})\Delta y}u(x_{i+\frac{1}{2}},y)v^{1}(x_{i+\frac{1}{2}},y)dy\approx\frac{u(x_{i+1},y_{j})+u(x_{i},y_{j})}{2}v^{1}(x_{i+\frac{1}{2}},y_{j})\Delta y$$

边 $P_{N}, P_{W}, P_{S}$ 可以类似地近似。

### 2.3 稳定性分析

关于 $M$-矩阵的构造：2阶差分矩阵
$-\frac{\partial^{2}}{\partial x^{2}}\approx\frac{1}{h^{2}}\begin{pmatrix}2&-1&&\dots\\ -1&2&\dots&\dots\\ &\dots&-1\\ &-1&2\end{pmatrix}$
是一个 $M$-矩阵。但是1阶中心差分矩阵
$-\frac{\partial}{\partial x}\approx\frac{1}{2h}\begin{pmatrix}0&-1&&\dots\\ 1&0&\dots&\\ \dots&\dots&\dots&-1\\ \dots&1&0\end{pmatrix}$
**不是**一个 $M$-矩阵。只有前向矩阵
$-\frac{\partial}{\partial x} \approx \frac{1}{h} \begin{pmatrix} 1 & & \\ -1 & 1 & \\ & -1 & 1 \end{pmatrix}$
是一个 $M$-矩阵。我们必须注意矩阵的选择。虽然中心差分矩阵具有更高的精度，但其矩阵性质较差。

!!! info "定理 2 (离散最大模原理 Discrete Maximum Principle)"
    如果 $A$ 是一个 $M$-矩阵，且 $AU \preceq   0$，则

    $$\max_{J}U\le \max\{\max_{J_{\partial\Omega}}U,0\}$$

!!! success "证明"

    1) 如果 $\max_{\partial\Omega}U\le0$：由 $AU \preceq 0$ 和 $A^{-1}\succeq 0$，我们有 $U\preceq 0$，所以 $\max_{J} U\preceq 0$。
    
    2) 如果 $\max_{\partial\Omega}U:=M>0$：令 $\mathbf{1}$ 为全1向量，且 $V=U-M\mathbf{1}$。则 $M\cdot A\mathbf{1}\succeq 0$。
    于是 $A(U-M\mathbf{1})\preceq AU\preceq0$。由 $A^{-1}\succeq 0$ 我们有 $U-M\mathbf{1}\preceq 0$，所以 $U_{ij}\preceq M$。

**注**：如果 $Au=0$，由 DMP，$\max_{J} u=0$，所以 $u\equiv0$。唯一性可以通过 DMP 证明。

!!! info "定理 3 (比较原理 Conmparison Principle)"
    如果 $A=-L_{h}$ 是一个 M-矩阵，且存在 $\phi\ge 0$ 使得 $L_{h}\phi_{j}\succeq 1$，则
    
    $$\max_{J}|U_{j}|\le \max_{J_{\partial\Omega}}|U_{j}|+\max_{J_{\partial\Omega}}|\phi_{j}|\cdot \max_{J}|f_{j}|$$

!!! success "证明"
    令 $\max_{J}|f_{j}|=F$ 且 $V_{j}^{\pm}=\pm U_{j}+F\phi_{j}$。则
    $L_{h}V_{j}^{\pm}=\pm L_{h}U_{j}+F\cdot L_{h}\phi_{j}\succeq \pm L_{h}U_{j}+F\cdot1=\mp f_{j}+F\succeq 0$。
    由 DMP，$\max_{J} V_{j}^{\pm}\le \max_{\partial\Omega}V_{j}^{\pm}$。所以
    $\max_{J}|U_{j}|\le \max_{J}V^{\pm}\le \max_{\partial\Omega}V^{\pm}\le \max_{\partial\Omega}|U_{j}|+F \max_{\partial\Omega}|\phi_{j}|$。
    $\square$

**注**：(CP $\Rightarrow L^{\infty}$-稳定性) 如果存在 $\phi\ge0$ 使得 $L_{h}\phi_{j}\ge1$，则我们将 $U$ 替换为误差 $e=U-u$。则 $||e||_{\infty}\le||\phi||_{\infty}\cdot||T||_{\infty}$。

!!! quote "引理 2"
    如果 $A$ 是一个 M-矩阵 且存在 $\phi$ 使得 $A\phi\ge1$，则 $||A^{-1}||_{\infty}\le||\phi||_{\infty}$。

!!! success "证明"
    由 $A\phi\succeq 1$ 和 $A^{-1}\succeq 0$ 我们有 $\phi\succeq  A^{-1}\mathbf{1}$，这表明 $||A^{-1}||_{\infty}=||A^{-1}\mathbf{1}||_{\infty}\le||\phi||_{\infty}$。

**外推法 (Extrapolation)**：
假设有两组网格 $J_{h}$ 和 $J_{\frac{h}{2}}$：

$$U_{h,j}=u_{j}+T_{h}, \quad T_{h}=Ch^{2}+O(h^{4})$$

$$U_{\frac{h}{2},j}=u_{j}+T_{\frac{h}{2}}, \quad T_{\frac{h}{2}}=C(\frac{h}{2})^{2}+O(h^{4})$$

则

$$\frac{4U_{\frac{h}{2},j}-U_{h,j}}{3}=u_{j}+O(h^{4})$$

外推法的优势：我们可以通过 $\log||U_{h}-U_{\frac{h}{2}}||$ 做后验误差估计；提高精度。

---

## 3 线性系统求解

* **直接法**：高斯消元法，LU 分解。
* **迭代法**：
    * 经典方法：Jacobi, G-S, SOR。
    * 基于梯度的方法：梯度下降，共轭梯度。
    * Krylov 子空间方法。
    * 多重网格法。
* **傅里叶方法**：如果 $A=FDF^{\dagger}$，其中 $F$ 是傅里叶变换矩阵，则 $Ax=b\Rightarrow DF^{\dagger}x=F^{\dagger}b$。

**注**：一般来说，直接法的复杂度是 $O(n^{3})$，而迭代法的复杂度是 $O(mn^{2})$。所以我们需要迭代次数 $m$ 小于 $n$。

### 3.1 经典迭代法

令 $A=P-N$。$P$ 被称为预处理子（preconditioner）。
则

$$Ax=b\Rightarrow Px=Nx+b\Rightarrow x=P^{-1}Nx+P^{-1}b$$

所以我们令

$$x^{(k+1)}=Bx^{(k)}+P^{-1}b, \quad B=P^{-1}N=I-P^{-1}A$$

!!! info "定理 4"
    对于任意 $x^{(0)}$，上式中的 $\{x^{(k)}\}$ 收敛到 $x$ 当且仅当 
    
    $$\rho(B):=\max\{|\lambda|:\lambda \text{ 是 } B \text{ 的特征值}\} < 1$$

!!! success "证明"
    我们有

    $$x^{(k+1)}-x=Bx^{(k)}+P^{-1}b-(P^{-1}Nx+P^{-1}b) = B(x^{(k)}-x)$$

    所以 $x^{(k)}-x=B^{k}(x^{(0)}-x)$。
    在 $B$ 的特征向量方向上分解 $x^{0}-x$ 可以得出结论。

**注**：对于任意范数 $||\cdot||$，由于 $\rho(B)\le||B||$，所以 $||B||<1$ 是收敛的充分条件。
且由

$$||x^{(k)}-x||\le||B||^{k}||x^{(0)}-x||$$

迭代次数为 $k\ge\frac{\ln 1/\epsilon+\ln||x^{0}-x||}{\ln 1/||B||}$。

然后我们考虑一种带有系数 $\alpha$ 的迭代：

$$x^{(k+1)}=x^{(k)}+\alpha P^{-1}(b-Ax^{(k)}) = (I-\alpha P^{-1}A)x^{(k)}+\alpha P^{-1}b, \quad B_{\alpha}=I-\alpha P^{-1}A$$

!!! quote "引理 3"
    假设 $P^{-1}A$ 的最大和最小特征值分别为 $\lambda_{1}>0$ 和 $\lambda_{n}>0$。则 $\min_{\alpha}\rho(B_{\alpha})=\rho_{opt}=\frac{\lambda_{1}-\lambda_{n}}{\lambda_{1}+\lambda_{n}}<1$，$\alpha_{opt}=\frac{2}{\lambda_{1}+\lambda_{n}}$。

令 $A=D+L+U=P-N$，其中 $L$ 是下三角矩阵，$U$ 是上三角矩阵。我们回顾数值代数中的迭代方法。

* **Jacobi 迭代**：令 $P=D$，则 $B_{J}=-D^{-1}(L+U)$。如果 $A$ 是严格对角占优的，则 Jacobi 迭代收敛。
* **Gauss-Seidel (G-S) 迭代**：令 $P=D+L$，则 $B_{GS}=-(D+L)^{-1}U$。如果 $A$ 是正定的，则 G-S 迭代收敛。

### 3.2 基于梯度的迭代

假设 $A$ 是正定的，则 $Ax=b\Leftrightarrow \min \phi(x)=\frac{1}{2}x^{T}Ax-b^{T}x$。

**3.2.1 梯度下降 (Gradient Descent)**

令 $x^{(k+1)}=x^{(k)}+\alpha_{k}d^{k}$，$d^{k}=r^{k}=b-Ax^{(k)}=-\nabla\phi(x^{(k)})$。我们希望 $\alpha_{k}=\arg \min_{\alpha}\phi(x^{(k)}+\alpha d^{k})$。
则我们有：

$$\alpha_{k}=\frac{{r^k}^{T}r^{k}}{{r^{k}}^TAr^{k}},\quad r^{k+1}=r^k \alpha_k A r^k$$

!!! quote "引理 4"
    $||x^{(k+1)}-x||_{A}\le\frac{\kappa(A)-1}{\kappa(A)+1}||x^{(k)}-x||_{A}$，
    其中 $||x||_{A}=\sqrt{x^{T}Ax}$。

**预处理梯度下降 (Pre-conditioned GDM)**：假设 $P$ 是非奇异矩阵且容易得到 $P^{-1}$：

$$\begin{cases}
r^{(0)}=b-Ax^{(0)}, z^{(0)}=P^{-1}r^{(0)}\\
\alpha_{k}=\frac{{r^k}^{T}r^{k}}{{r^{k}}^TAr^{k}}\\
x^{(k+1)}=x^{(k)} + \alpha_k z^k\\
r^{k+1} = r^k - \alpha_k A z^k\\
z^{k+1} = P^{-1}r^{k+1}\\
\end{cases}$$


!!! quote "引理 5"
    $||x^{(k+1)}-x||_{A}\le\frac{\kappa(P^{-1}A)-1}{\kappa(P^{-1}A)+1}||x^{(k)}-x||_{A}$，其中 $||x||_{A}=\sqrt{x^{T}Ax}$。

**3.2.2 共轭梯度法 (Conjugate Gradient Method)**

对于 $x^{(k+1)}=x^{(k)}+\alpha_{k}p^{k}$，我们令 $p^{i^{T}}Ap^{k}=0$。则迭代过程为：

$$\begin{cases}
r^{(0)}=b-Ax^{(0)}\\
\alpha_{k}=\frac{{r^k}^{T}r^{k}}{{p^{k}}^TAp^{k}}\\
x^{(k+1)}= x^{(k)} + \alpha_k p^k\\
r^{k+1} = r^k - \alpha_k Ap^k=b-Ax^{(k+1)}\\
\beta_k = -\frac{{p^k}^TAr^{k+1}}{{p^k}^T A p^k}=\frac{||r^{k+1}||^2}{||r^k||^2}\\
p^{k+1}=r^{k+1}+\beta_k p^k\\
\end{cases}
$$

!!! quote "引理 6"
    $||x^{(k)}-x||_A \le \frac{2c^k}{1+c^{2k}}||x^{(0)}-x||_A$，其中 $c = \frac{\sqrt{\kappa(A)}-1}{\sqrt{\kappa(A)}+1}$。

**预处理 CGM (Pre-conditioned CGM)**：

$$\begin{cases}
\alpha_{k}=\frac{{r^k}^{T}r^{k}}{{p^{k}}^TAp^{k}}\\
x^{(k+1)}= x^{(k)} + \alpha_k p^k\\
r^{k+1} = r^k - \alpha_k Ap^k\\
Pz^{k+1} = r^{k+1}\\
\beta_k = \frac{{r^{k+1}}^Tz^{k+1}}{{r^{k}}Tz^k}\\
p^{k+1}=z^{k+1}+\beta_k p^k\\
\end{cases}$$


!!! quote "引理 7"
    $||x^{(k)}-x||_{A}\le\frac{2c^{k}}{1+c^{2k}}||x^{(0)}-x||_{A}, c=\frac{\sqrt{\kappa(P^{-1}A)}-1}{\sqrt{\kappa(P^{-1}A)}+1}$。

---

## 4 多重网格法 (Multigrid method)

首先，我们举一个例子来说明一般迭代法的缺点：

我们考虑使用 Jacobi 迭代来求解方程 

$$A_{h}x_{h}=b_{h}, A_{h}=-\frac{1}{h^{2}}\begin{pmatrix}2&-1&&\\ -1&2&\dots\\ \dots&-1\\ \dots&-1&2\end{pmatrix}$$

我们有 $B_{J}=-D^{-1}(A-D)=\begin{pmatrix}0&\frac{1}{2}&\\ \frac{1}{2}&\dots&\frac{1}{2}&\\ \dots&\frac{1}{2}&0\end{pmatrix}$。
$B_{J}$ 的特征值为 $\lambda_{j}=\cos jh\pi$，特征向量为 $v_{j}=(\sin jh\pi, \sin 2jh\pi, \dots, \sin(N-1)jh\pi)^{T}$。
如果 $e^{(0)}=x^{(0)}-x=\sum_{j=1}^{N-1}\alpha_{j}v_{j}$，则

$$e^{(k)}=B_{j}^{k}e^{(0)}=\sum_{j=1}^{N-1}\alpha_{j}\lambda_{j}^{k}v_{j}$$

对于 $\lambda_{j}$ 接近 1 的情况，$\lambda_{j}^{k}\rightarrow0$ 收敛速度非常慢。

**多重网格法的迭代过程**：

>1) **预平滑 (Pre-smooth)**：使用迭代法求解 $A_{h}x_{h}=b_{h}$ 并在第 m 步得到 $x_{h}^{(m)}$。
   
>2) **残差 (Residue)**：令 $r_{h}=b_{h}-A_{h}x_{h}^{(m)}$。
   
>3) **限制 (Restriction)**：$r_{H}=I_{h}^{H}r_{h}:=Rr_{h}, r_{H,j}=\frac{1}{4}[r_{h,2j-1}+2r_{h,2j}+r_{h,2j+1}]$。
   
>4) **求解**：使用直接法求解 $A_{H}e_{H}=r_{H}$。
   
>5) **延拓/插值 (Prolongation/Interpolation)**：$x_{h}^{(m+1)}=x_{h}^{(m)}+I_{H}^{h}e_{H}, P:=I_{H}^{h}, e_{h}=I_{H}^{h}e_{H}$。
   
   >$$\begin{cases}e_{h,2j}=e_{H,j}\\
   e_{h,2j-1}=\frac{1}{2}(e_{H,j-1}+e_{H,j})
   \end{cases}$$

>6) 重复 2) - 5) 直到得到 $x_{h}^{(m+1)}\rightarrow x_{h}^{(m+l+1)}$。

由上可知，我们有：

$$x_{h}^{(m+1)}=x_{h}^{(m)}+PA_{H}^{-1}R(b_{h}-A_{h}x_{h}^{(m)}) = x_{h}^{(m)}+P(RA_{h}P)^{-1}R(b_{h}-A_{h}x_{h}^{(m)})$$

所以

$$e^{(m+1)}=x^{(m+1)}-x=e^{(m)}-Se^{(m)}=(I-S)e^{(m)}, S:=P(RA_{h}P)^{-1}RA_{h}$$

我们可以证明 $S^{2}=S$。所以 $S$ 是一个投影算子。

**利用前面的例子 (3) 分析收敛性**：

我们已经得到了特征向量 $v_k^h = (\sin kh\pi, \sin 2kh\pi, \dots, \sin(N-1)kh\pi)^T, k = 1,\dots, N-1$。

令 

$$\begin{array}
    ww_{k}^{h}=v_{N-k}^{h} &= (\sin(N-k)h\pi, \sin 2(N-k)h\pi, \dots, \sin(N-1)(N-k)h\pi)^{T}\\
    &=(\sin kh\pi, -\sin 2kh\pi, \dots, (-1)^{N}\sin(N-1)kh\pi)^{T}
\end{array}
$$


我们有 $[v_{k}^{h}]_{2j-1}=[w_{k}^{h}]_{2j-1}, [v_{k}^{h}]_{2j}=-[w_{k}^{h}]_{2j}$。可以证明：

$$(I-S)v_{k}^{h}=\frac{1}{2}(1-\cos kh\pi)(w_{k}^{h}+v_{k}^{h})$$

$$(I-S)w_{k}^{h}=\frac{1}{2}(1+\cos kh\pi)(w_{k}^{h}+v_{k}^{h})$$

然后我们在这个例子中给出多重网格法的三个性质。
!!! summary "性质 1 (消除低频)"
    当 k 相对较小时，$\frac{1}{2}(1-\cos kh\pi)=O(k^{2}h^{2})$。这些频率衰减很快。
!!! summary "性质 2 (I-S 后的混叠)"
    $v_{k}^{h}$ 和 $w_{k}^{h}$ 混合在一起。$R$ 产生混叠，无法区分 $v_{k}$ 和 $w_{k}$:
    
    $$\begin{cases}Rv_{k}^{h}=\frac{1}{2}(1-\cos kh\pi)v_{k}^{2h},\\ Rw_{k}^{h}=\frac{1}{2}(-1-\cos kh\pi)v_{k}^{2h}\end{cases}$$

    $P$ 产生振荡：

    $$Pv_{k}^{2h}=\frac{1}{2}(1+\cos kh\pi)v_{k}^{h}-\frac{1}{2}(1-\cos kh\pi)w_{k}^{h}$$

!!! summary "性质 3 (特征空间分析)"

    $$\begin{cases}(I-S)(v_{k}+w_{k})=v_{k}+w_{k},\\ (I-S)Sv_{k}=0.\end{cases}$$

    这里 $v_{k}+w_{k}=(2\sin kh\pi, 0, \sin 3kh\pi, 0, \dots)^{T}$ 满足 $(v_{k}+w_{k})_{2j}=0$。

**几种多重网格方法**：

* V-cycle
* W-cycle
* Full Multigrid (FMG)

令 $W$ 为一个工作单元。则 $W_{i}=CN_{i}=\frac{1}{h_{i}}$，$\rho=\frac{N_{i+1}}{N_{i}}<1$。
$W_{k}=W_{k+1}+C\rho N_{k}\implies W_1=CN_1\cdot \sum \rho^k<\frac{CN_1}{1-\rho}$。

于是我们有 V-cycle 成本 $<2(1+\rho+\dots)W_{1}<\frac{2}{1-\rho}W_{1}$。

FMG 成本 $<(1+\rho+\dots)\text{V-cycle-cost} < \frac{2}{(1-\rho)^{2}}W_{1}$。

<br>
<hr>

<div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;" markdown="1">

[ :octicons-arrow-left-24:  上一章：基本定义 ](chapter0.md){ .md-button }

[ 下一章：还没写 :octicons-arrow-right-24: ](chapter2.md){ .md-button .md-button--primary }

</div>