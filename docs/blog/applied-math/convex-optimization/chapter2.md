---
title: 凸多面体
date: 2025-11-25
hide:
  - navigation
categories:
  - 应用数学
  - 凸优化
tags:
  - applied-math
  - convex-optimization
---
# 凸多面体

## 超平面

### 超平面

一个**超平面(hyperplane)** 是形如 $$H=\left\{ x\Big| a'x=b\right\} $$的集合，其中 $a\in \mathbb{R}^n,b\in \mathbb{R}$ 且 $a\neq 0$。

### 分离

我们称两个集合 $C_1$ 和 $C_2$ 被超平面 $H$ **分离(separated)**，若 $$a'x\le b,\forall x\in C_1,\quad a'x\ge b,\forall x\in C_2. $$
或 者 $$a'x\ge b,\forall x\in C_1,\quad a'x\le b,\forall x\in C_2. $$
若 上述不等式均严格成立，则称 $C_1$ 和 $C_2$ 被 $H$ **严格分离(strictly separated)**。

### 支撑

若 $\bar{x}$ 属于 $C$ 的闭包和一个分离 $C$ 超平面 $H$，则称单点集 $\left\{\bar{x}\right\}$ 是 $C$ 在 $\bar{x}$ 处的**支撑(supporting)**。

### Supporting Hyperplane Theorem

设 $C$ 是凸集，$\bar{x}$ 不是 $C$ 的内点，则存在一个超平面经过 $\bar{x}$ 且支撑 $C$。

**证明：**
取 $\left\{x_k\right\}$ 不属于 $\text{cl}(C)$ 且 $x_k\rightarrow \bar{x}$。设 $\hat{x_k}$ 为 $x_k$ 在 $\text{cl}(C)$ 上的投影，我们有对任意 $x\in \text{cl}(C)$，$$a'_kx\ge a_k'x_k,\forall k=0,1,\cdots$$其中 $a_k=(x_k-\hat{x_k})/\left\|x_k-\hat{x_k}\right\|$。令 $k\rightarrow \infty$ 即得。

### Separating Hyperplane Theorem

设 $C_1$ 和 $C_2$ 是 $\mathbb{R}^n$ 中的非空凸集且 $\text{ri}(C_1)\cap \text{ri}(C_2)=\emptyset$，则存在一个超平面分离 $C_1$ 和 $C_2$。

**证明：**
考虑凸集 $$C_1-C_2=\left\{x_1 -x_2|x_1\in C_1,x_2\in C_2\right\}.$$
由于 $C_1,C_2$ 是不交的，故 $0\notin \text{ri}(C_1-C_2)$。由支持超平面定理可知，存在 $0\neq a\in \mathbb{R}^n$ 使得 $$a'x\ge 0,\forall x\in C_1-C_2. $$

### Strict Separation Theorem

设 $C_1$ 和 $C_2$ 是 $\mathbb{R}^n$ 中的非空闭凸集且 $C_1\cap C_2=\emptyset$。若 $C_1$ 是闭的，$C_2$ 是紧的，则存在一个超平面严格分离 $C_1$ 和 $C_2$。

**证明：**
考虑 $C_1-C_2$，由于 $C_1$ 闭 $C_2$ 紧，$C_1-C_2$ 是闭的。设 $\bar{x_1}-\bar{x_2}$ 是 $0$ 在 $C_1-C_2$ 上的投影，则 $\|\bar{x_1}-\bar{x_2}\|>0$。令 $a=\bar{x_1}-\bar{x_2}$，则 $$a'x\ge \|a\|^2,\forall x\in C_1-C_2. $$

### Fundamental Characterization

集合 $C$ 的凸包的闭包为所有包含 $C$ 的闭半平面的交。

### Properly 分离

我们称超平面 properly 分离 两个集合 $C_1$ 和 $C_2$，若其分离 $C_1$ 和 $C_2$ 且不完全包含 $C_1$ 或 $C_2$。

### Proper Separation Theorem

设 $C_1$ 和 $C_2$ 是 $\mathbb{R}^n$ 中的非空闭凸集且 $C_1\cap C_2=\emptyset$。则存在一个超平面 properly 分离 $C_1$ 和 $C_2$ 当且仅当 $\text{ri}(C_1)\cap \text{ri}(C_2)=\emptyset$。

### 非垂直的

一个 $\mathbb{R}^{n+1}$ 中的超平面伴有法向量 $(\mu,\beta)$ 称为**非垂直的(nonvertical)**，若 $\beta\neq 0$。

其与第 $n+1$ 维轴交于 $\xi=(\mu/\beta)'\bar{u}+\bar{w}$，其中 $(\bar{u},\bar{w})$ 是超平面上的任意点。

### Novertical Hyperplane Theorem

设 $C$ 是 $\mathbb{R}^{n+1}$ 中的非空闭凸集且 $C$ 不包含某个垂直方向的直线，则：
* $C$ 包含于某个非垂直超平面的一侧，即存在 $\mu \in \mathbb{R}^n,\beta\in \mathbb{R}\backslash \{0\}$ 使得 $$\mu'u+\beta w\ge \gamma,\forall (u,w)\in C.$$
* 若 $(\bar{u},\bar{w})\notin \text{cl}(C)$，则存在一个非垂直超平面严格分离 $C$ 和 $(\bar{u},\bar{w})$。

**证明：**
由于 $C$ 不包含任意方向的垂线，故 $\text{ri}(C)$ 不包含任意方向的垂线，而 $\text{ri}(C)$ 和 $\text{cl}(C)$ 有相同的回收锥，故 $\text{cl}(C)$ 也不包含任意方向的垂线。故我们只考虑 $C$ 是闭的。

$(a)$：$C$ 为所有包含 $C$ 的闭半平面的交，若这些半平面均垂直，则 $C$ 包含某个垂直方向的直线，矛盾。

$(b)$：由支持超平面定理可知，存在一个超平面分离 $C$ 和 $(\bar{u},\bar{w})$。若该超平面垂直，则 $C$ 包含某个垂直方向的直线，矛盾。

## 凸包、仿射包和相对内点

给定集合 $X\subset \mathbb{R}^n$。

#### 凸组合

$X$ 中元素的一个**凸组合(convex combination)**是形如
$$\sum_{i=1}^k \alpha_i x_i,$$其中 $x_i\in X$，$\alpha_i\ge 0$ 且 $\sum_{i=1}^k \alpha_i = 1$ 的向量。

#### 凸包

$X$ 的**凸包(convex hull)**是包含 $X$ 的所有凸集的交集，记为 $\text{conv}(X)$。

#### 仿射集

一个**仿射集(affine set)**形如 $\bar{x}+S$，其中 $\bar{x}\in \mathbb{R}^n$，$S$ 是 $\mathbb{R}^n$ 的子空间。 

#### 仿射包

$X$ 的**仿射包(affine hull)**是包含 $X$ 的所有仿射集的交集，记为 $\text{aff}(X)$。

#### 非负线性组合

$X$ 中元素的一个**非负线性组合(nonnegative linear combination)**是形如
$ \sum_{i=1}^k \alpha_i x_i, $其中 $x_i\in X$，$\alpha_i\ge 0$ 的向量。

#### 锥

$X$ 生成的**锥(cone)**是所有 $X$ 中元素的非负线性组合的集合，记为 $\text{cone}(X)$。

#### Caratheodory's Theorem

设 $X$ 是 $\mathbb{R}^n$ 的子集。
* 任意非零元 $x\in \text{cone}(X)$ 可表示为 $X$ 中至多 $n$ 个元素的非负线性组合。
* 任意非零元 $x\in \text{conv}(X)$ 可表示为 $X$ 中至多 $n+1$ 个元素的凸组合。

**证明：**
$(a)$：设 $x\in \text{cone}(X)$，则存在 $x_i\in X$ 和 $\alpha_i\ge 0$ 使得
$$x = \sum_{i=1}^m \alpha_i x_i.$$
若 $m\le n$，则结论成立。若 $m>n$，则 $\{x_1,\cdots,x_m\}$ 线性相关，故存在不全为零的 $\beta_i$ 使得
$$\sum_{i=1}^m \beta_i x_i = 0.$$
设 $I=\{i|\beta_i>0\}$，$J=\{i|\beta_i<0\}$，则 $I\cup J=\{1,\cdots,m\}$。由于 $x\neq 0$，故 $I\neq \emptyset$。令
$$\theta = \min_{i\in I} \frac{\alpha_i}{\beta_i} > 0,$$
则对任意 $i\in I$，都有 $\alpha_i - \theta \beta_i \ge 0$，且存在 $i_0\in I$ 使得 $\alpha_{i_0} - \theta \beta_{i_0} = 0$。因此，
$$x = \sum_{i=1}^m \alpha_i x_i = \sum_{i=1}^m (\alpha_i - \theta \beta_i) x_i,$$
其中 $\alpha_i - \theta \beta_i \ge 0$ 且 $\alpha_{i_0} - \theta \beta_{i_0} = 0$。由此可去掉 $x_{i_0}$，得到 $x$ 的一个新的表示。反复进行该过程，直到表示中不超过 $n$ 个元素为止。

$(b)$：将 $(a)$ 应用于 $X' = \{(x,1)|x\in X\}\subseteq \mathbb{R}^{n+1}$ 即可。

**性质：**
紧集的凸包是紧集。

**证明：**
设 $X$ 是 $\mathbb{R}^n$ 中的紧集，$\{y_k\}\subseteq \text{conv}(X)$ 且 $y_k\to y$，则存在 $x_{k,i}\in X$ 和 $\alpha_{k,i}\ge 0$ 使得
$$y_k = \sum_{i=1}^{m_k} \alpha_{k,i} x_{k,i}, \quad \sum_{i=1}^{m_k} \alpha_{k,i} = 1.$$
由Caratheodory定理可知，$m_k\le n+1$。因此，存在 $m\le n+1$ 和 $\{y_{k_j}\}\subseteq \{y_k\}$ 使得
$$y_{k_j} = \sum_{i=1}^m \alpha_{k_j,i} x_{k_j,i}, \quad \sum_{i=1}^m \alpha_{k_j,i} = 1.$$
由于 $X$ 是紧集，故存在 $\{x_i\}\subseteq X$ 和 $\{\alpha_i\}$ 使得 $x_{k_j,i}\to x_i$ 和 $\alpha_{k_j,i}\to \alpha_i$。由 $\sum_{i=1}^m \alpha_{k_j,i} = 1$ 可知 $\sum_{i=1}^m \alpha_i = 1$。因此，
$$y = \lim_{j\to\infty} y_{k_j} = \sum_{i=1}^m \alpha_i x_i,$$
即 $y\in \text{conv}(X)$。

#### 相对内点

称 $x$ 是 $C$ 的**相对内点(relative interior)**，记为 $\text{ri}(C)$，若 $x$ 是一个 $C$ 在 $\text{aff}(C)$ 中的内点。
记 $\text{ri}(C)$ 为 $C$ 所有相对内点的集合。

#### Line Segment Principle

设 $C$ 是 $\mathbb{R}^n$ 中的非空凸集，则对任意 $x\in \text{ri}(C)$ 和 $\bar{x}\in \text{cl}(C)$，都有 $$\alpha x + (1-\alpha)\bar{x} \in \text{ri}(C), \forall \alpha\in [0,1).$$

**证明：**
固定 $\alpha \in (0, 1]$。考虑 $x_\alpha = \alpha x + (1 - \alpha)\bar{x}$。

令 $L$ 为平行于 $\text{aff}(C)$ 的子空间。定义 $B_L(0, \epsilon) := \{z \in L \mid \|z\| < \epsilon\}$。

由于 $\bar{x} \in \text{cl}(C)$，对于所有 $\epsilon > 0$，有 $\bar{x} \in C + B_L(0, \epsilon)$。那么

\[
\begin{aligned}
    B(x_\alpha; \epsilon) \cap \text{aff}(C) 
    &= \{\alpha x + (1 - \alpha)\bar{x}\} + B_L(0; \epsilon) \\
    &\subset \{\alpha x\} + (1 - \alpha)C + (2 - \alpha)B_L(0; \epsilon) \\
    &= (1 - \alpha)C + \alpha \left[x + B_L\left(0; \frac{2 - \alpha}{\alpha}\epsilon\right)\right]
\end{aligned}
\]

由于 $x \in \text{ri}(C)$，对于足够小的 $\epsilon$，有 $x + B_L\left(0; \frac{2 - \alpha}{\alpha}\epsilon\right) \subset C$。

因此 $B(x_\alpha; \epsilon) \cap \text{aff}(C) \subset \alpha C + (1 - \alpha)C = C$（因为 $C$ 是凸集）。所以，$x_\alpha \in \text{ri}(C)$。

**性质：**
设 $C$ 是非空凸集。
* $\text{ri}(C)$ 是非空凸集，且其仿射包与 $C$ 相同。
* **Prolongation Lemma**：$x\in \text{ri}(C)$ 当且仅当对任意以 $x$ 为端点的所有线段可以延伸超过 $x$ 的另一端点而仍在 $C$ 内。

**证明：**
$(a)$：设 $0\in C$。取 $m$ 个线性独立向量 $z_1,\cdots,z_m\in C$，其中 $m$ 是 $\text{aff}(C)$ 的维数，设 $$X=\left\{ \sum_{i=1}^m \alpha_i z_i\Big| \sum_{i=1}^m \alpha_i<1,\alpha_i>0,i=1,\cdots, m \right\}$$
则 $X\subseteq \text{ri}(C)$ 且 $\text{aff}(X)=\text{aff}(C)$。因此，$\text{ri}(C)$ 是非空的。由凸性可知，$\text{ri}(C)$ 是凸集。

$(b)$：必要性显然。充分性：任取 $\bar{x}\in C$ ，由 Line Segment Principle 可知 $$\alpha x + (1-\alpha)\bar{x} \in \text{ri}(C), \forall \alpha\in [0,1).$$因此，$x\in \text{ri}(C)$。

**性质：**
一个凹函数 $f:\mathbb{R}^n\rightarrow \mathbb{R}$ 在 $X$ 上的最小值在 $x^*\in \text{ri}(X)$ 处取得，则 $f$ 在 $X$ 上为常值。

**证明：**
反证法，设存在 $x\in X$ 使得 $f(x)>f(x^*)$。 由 Line Segment Principle 可知 $$\alpha x + (1-\alpha)x^* \in \text{ri}(X), \forall \alpha\in [0,1).$$
由凸性可知 $$f(\alpha x + (1-\alpha)x^*) \le \alpha f(x) + (1-\alpha)f(x^*) < f(x^*),$$矛盾。

**推论：**
一个非常值线性函数在其定义域的相对内点上没有极值。

**性质：**
* $\text{cl}(C)=\text{cl}(\text{ri}(C))$ 且 $\text{ri}(\text{cl}(C))=\text{ri}(C)$。
* 设 $\bar{C}$ 是 $\mathbb{R}^n$ 中的非空闭凸集，则
    * $C$ 和 $\bar{C}$ 有相同的相对内点；
    * $C$ 和 $\bar{C}$ 有相同的闭包；
    * $\text{ri}(C)\subset \bar{C}\subset \text{cl}(C)$。

**证明：**
$(a)$：由定义可知 $\text{cl}(\text{ri}(C))\subseteq \text{cl}(C)$。反过来，设 $\bar{x}\in \text{cl}(C)$，$x\in \text{ri}(C)$，则由 Line Segment Principle 可知 $$\alpha x + (1-\alpha)\bar{x} \in \text{ri}(C), \forall \alpha\in (0,1].$$因此，$\bar{x}\in \text{cl}(\text{ri}(C))$，从而 $\text{cl}(C)\subseteq \text{cl}(\text{ri}(C))$。

其余同理。

**性质：**
设 $C$ 是 $\mathbb{R}^n$ 中的非空凸集且 $A$ 是 $m\times n$ 矩阵，则 
* $A\cdot (\text{ri}(C))=\text{ri}(A\cdot C)$；
* $A\cdot (\text{cl}(C))\subset \text{cl}(A\cdot C)$。若 $C$ 是有界的，则等号成立。

**证明：**
$(a)$：由 $C$ 中(关于仿射包)的邻域映射为 $A\cdot C$ 中的邻域即得。

$(b)$：我们有 $A\cdot \text{cl}(C)\subseteq \text{cl}(A\cdot C)$，这是因为对序列 $\left\{x_k\right\}\subset C$，若 $x_k\to x\in \text{cl}(C)$，则 $Ax_k\to Ax\in \text{cl}(A\cdot C)$。

反过来，设 $C$ 是有界的，取任意 $z\in \text{cl}(A\cdot C)$，则存在 $\{x_k\}\subseteq A\cdot C$ 使得 $x_k\to z$。由 $C$ 有界可知存在 $\{x_{k_j}\}\subseteq \{x_k\}$ 和 $x\in \mathbb{R}^n$ 使得 $x_{k_j}\to x$。由于 $C$ 是闭集，故 $x\in C$，于是有 $z=Ax$。因此，$z\in A\cdot \text{cl}(C)$。

**性质：**
设 $C_1$ 和 $C_2$ 是 $\mathbb{R}^n$ 中的非空凸集，则
* $$\text{ri}(C_1)+\text{ri}(C_2)=\text{ri}(C_1+C_2); $$
        $$\text{cl}(C_1)+\text{cl}(C_2)\subset \text{cl}(C_1+C_2). $$若 $C_1$ 和 $C_2$ 都是有界的，则等号成立。
* $$\text{ri}(C_1)\cap \text{ri}(C_2)\subset \text{ri}(C_1\cap C_2)\quad \text{cl}(C_1\cap C_2)\subset \text{cl}(C_1)\cap\text{cl}( C_2). $$
若 $\text{ri}(C_1)\cap \text{ri}(C_2)\neq \emptyset$，则等号成立。

**证明：**
证明留给读者。

#### Cartesian Product

设 $C$ 是 $\mathbb{R}^{n+m}$ 中的非空凸集，对 $x\in \mathbb{R}^n$，定义
$$C_x = \{y\in \mathbb{R}^m | (x,y)\in C\}.$$
与 $$D=\left\{ x\Big| C_x\neq \emptyset\right\}$$
则 $$\text{ri}(C)=\left\{(x,y)|x\in \text{ri}(D), y\in \text{ri}(C_x)\right\} $$

**证明：**
由于 $D$ 是 $C$ 的投影，故 $$\text{ri}(D)=\left\{x\Big| \exists y\in \mathbb{R}^m ,(x,y)\in \text{ri}(C)\right\}$$
于是 $$\text{ri}(C)=\bigcup_{x\in \text{ri}(D)}(M_x\cap \text{ri}(C))$$
其中 $M_x=\{(x,y)|y\in \mathbb{R}^m\}$。对任意 $x\in \text{ri}(D)$，$M_x\cap \text{ri}(C)=\text{ri}(M_x\cap C)=\left\{ (x,y)\Big| y\in \text{ri}(C_x)\right\}$

### 支撑函数

$X$ 的示性函数 $\delta_X$ $$\sigma_X(y)=\sup_{x\in X} y'x$$ 称为 $X$ 的**支撑函数(support function)**。

**性质：**
$\text{epi}(\sigma_X)$ 是闭凸锥。

**性质：**
$X,\text{cl}(X),\text{conv}(X),\text{cl}(\text{conv}(X))$ 有相同的支撑函数。

**性质：**
若 $C$ 是锥，$$\sigma_C(y)=\begin{cases}
    0 \quad &if \,y'x\le 0,\forall x\in C\\
    +\infty &otherwise
\end{cases}$$
即 $\sigma_C$ 是 $C^*$ 的示性函数，其中 $$C^*=\left\{ y\Big| y'x\le 0,\forall x\in C\right\} $$称为 $C$ 的**极锥(polar cone)**。

由共轭定理可知 $C^*$ 的极锥为 $\text{cl}(\text{conv}(C))$，这称为**极锥定理(polar cone theorem)**。

**例子：**
若 $C=\text{cone}\left(\left\{a_1,\cdots,a_r\right\}\right)$，则 $$C^*=\left\{x\Big| a_j'x\le 0,j=1,\cdots,r\right\}. $$

### Farkas' Lemma

$$(C^*)^*=C$$
<br>
<hr>

<div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;" markdown="1">

[ :octicons-arrow-left-24: 上一章：凸分析](chapter1.md){ .md-button }

[ 下一章：凸优化 :octicons-arrow-right-24: ](chapter3.md){ .md-button .md-button--primary }

</div>