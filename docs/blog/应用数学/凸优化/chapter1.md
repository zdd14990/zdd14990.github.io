# 凸分析

### 一些符号约定

* 我们只考虑 $\mathbb{R}^n$ 空间上的优化问题。
* 所有的向量约定为列向量。
* $'$表示转置。
* $x'y$ 为 $\sum_{i=1}^{n}$ 表示 $x$ 和 $y$ 的内积。
* $||x||_2 = (x'x)^{1/2}$ 为 $x$ 的欧几里得范数。

### 凸集与凸函数

#### 凸集

设 $C \subseteq \mathbb{R}^n$，如果对于任意 $x,y \in C$ 和 $\alpha \in [0,1]$，都有
$$\alpha x + (1-\alpha)y \in C,$$
则称 $C$ 是**凸集(convex set)**。

**例子：**

* **Polyhedron sets**：非空的满足 $$C = \left\{x \Big| a'_jx \le b_j,j=1,\cdots,r\right\}$$

* **Cones**：满足对任意的 $x\in C,\lambda>0$ 均有 $\lambda x \in C$ 的集合。

#### 凸函数

设 $C \subseteq \mathbb{R}^n$ 是凸集，$f: C \to \mathbb{R}$，如果对于任意 $x,y \in C$ 和 $\alpha \in [0,1]$，都有
$$f(\alpha x + (1-\alpha)y) \le \alpha f(x) + (1-\alpha)f(y),$$
则称 $f$ 是定义在 $C$ 上的**凸函数(convex function)**。
若等号当且仅当 $x=y$ 时成立，则称 $f$ 是**严格凸函数(strictly convex function)**。

**性质：**
若 $f$ 是凸函数，则 $\left\{ x\in C\Big| f(x)\le \gamma\right\}$ 与 $\left\{ x\in C\Big| f(x)< \gamma\right\}$ 均为凸集。

#### Epigraph

$f:X\rightarrow [-\infty,+\infty]$ 的 **epigraph** 定义为
$$\text{epi} (f) = \left\{(x,w) \Big| x\in X,w\in \mathbb{R},w\ge f(x)\right\}.$$

#### Effective domain

$f$ 的 **effective domain** 定义为
$$\text{dom} (f) = \left\{x\in X \Big| f(x)<+\infty\right\}.$$

#### 凸的

我们称 $f$ 是 **凸的**，若 $\text{epi}(f)$ 是凸集。
注意到，若 $f(x)\in \mathbb{R}$，则该定义与之前的定义等价。

#### 闭的

我们称 $f$ 是**闭的**，若 $\text{epi}(f)$ 是闭集。

#### 下半连续

我们称 $f$ 在 $x\in X$ 处是**下半连续的(lower semicontinuous)**，若对于任意 $\{x_k\}\subseteq X$ 满足 $x_k\to x$ 时，有
$$\liminf_{k\to\infty} f(x^k) \ge f(x).$$

**性质：**
对函数 $f:\mathbb{R}^n \to [-\infty,+\infty]$，下列命题等价：
* 对任意 $\gamma \in \mathbb{R}$，集合 $V_\gamma=\left\{x\in \mathbb{R}^n\Big| f(x)\le \gamma\right\}$ 是闭集；
* $f$ 在任意 $x\in \mathbb{R}^n$ 处是下半连续的；
* $f$ 是闭的。

**证明：**
$(1)\Longrightarrow(2)$：设 $\{x_k\}\subseteq \mathbb{R}^n$ 且 $x_k\to x$，则对任意 $\varepsilon>0$，存在 $N>0$ 使得当 $k>N$ 时，有 $f(x_k)>f(x)-\varepsilon$。因此，
$$\liminf_{k\to\infty} f(x_k) \ge f(x)-\varepsilon.$$
由于 $\varepsilon>0$ 是任意的，故 $\liminf_{k\to\infty} f(x_k) \ge f(x)$。

$(2)\Longrightarrow(3)$：设 $\{(x_k,w_k)\}\subseteq \text{epi}(f)$ 且 $(x_k,w_k)\to (x,w)$，则 $w_k \ge f(x_k)$。由下半连续性可知
$$w = \lim_{k\to\infty} w_k \ge \liminf_{k\to\infty} f(x_k) \ge f(x),$$
因此，$(x,w)\in \text{epi}(f)$。

$(3)\Longrightarrow(1)$：设 $\{x_k\}\subseteq V_\gamma$ 且 $x_k\to x$，则 $(x_k,\gamma)\in \text{epi}(f)$。由闭性可知 $(x,\gamma)\in \text{epi}(f)$，即 $f(x)\le \gamma$，所以 $x\in V_\gamma$。

**性质：**
设 $f:X\rightarrow [-\infty,+\infty]$，则若 $\text{dom}(f)$ 是闭集且 $f$ 在 $\text{dom}(f)$ 上下半连续，则 $f$ 是闭的。

**证明：**
设 $\{(x_k,w_k)\}\subseteq \text{epi}(f)$ 且 $(x_k,w_k)\to (x,w)$，则 $w_k \ge f(x_k)$。若 $x\in \text{dom}(f)$，则由下半连续性可知
$$w = \lim_{k\to\infty} w_k \ge \liminf_{k\to\infty} f(x_k) \ge f(x),$$
因此，$(x,w)\in \text{epi}(f)$。若 $x\notin \text{dom}(f)$，则 $f(x)=+\infty$，显然 $(x,w)\in \text{epi}(f)$。

#### Proper

我们称 $f$ 是 **proper** 若 $\text{dom}(f)\neq \emptyset$ 且 $f(x)>-\infty$ 对任意 $x\in X$ 成立。我们称 $f$ 是 **improper** 若 $f$ 不是 proper。

**性质：**
* $g:\mathbb{R}^n\rightarrow (-\infty,+\infty]$ 由下式给出$$g(x)=\lambda_1f_1(x)+\cdots+\lambda_mf_m(x),$$其中 $\lambda_i> 0$，若 $f_i:\mathbb{R}^n\rightarrow [-\infty,+\infty]$ 是凸(闭)函数，则 $g$ 是凸(闭)函数。
* $g:\mathbb{R}^n\rightarrow (-\infty,+\infty]$ 由下式给出$$g(x)=f(Ax)$$其中 $A\in \mathbb{R}^{m\times n}$，若 $f:\mathbb{R}^m\rightarrow [-\infty,+\infty]$ 是凸(闭)函数，则 $g$ 是凸(闭)函数。
* 考虑 $f_i:\mathbb{R}^n\rightarrow (-\infty,\infty]$，$i\in I$，$g:\mathbb{R}^n\rightarrow (-\infty,+\infty]$ 由下式给出$$g(x)=\max_{i\in I} f_i(x)$$若$f_i$ 是凸(闭)函数，则 $g$ 是凸(闭)函数。

**证明：**
证明留给读者。

### 可微凸函数

**性质：**
设 $C\subset \mathbb{R}^n$ 是凸集，$f:\mathbb{R}^n\rightarrow \mathbb{R}$ 是可微函数，则 $f$ 是 $C$ 上的凸函数当且仅当
$$ f(z) \ge f(x) + (z-x)'\nabla f(x), \forall x,z\in C$$
若等号当且仅当 $x=z$ 时成立，则 $f$ 是严格凸函数。

**证明：**
“$\Longleftarrow$”：设 $x,y\in C$，$\alpha\in [0,1]$，$z=\alpha x+(1-\alpha)y$，则
\begin{align*}
f(z) &\ge f(x) + (z-x)'\nabla f(x) \\
&= f(x) + (1-\alpha)(y-x)'\nabla f(x) \\
&\ge f(x) + (1-\alpha)(f(y)-f(x)) \\
&= \alpha f(x) + (1-\alpha)f(y)
\end{align*}
“$\Longrightarrow$”：设 $x,z\in C$，$\alpha\in (0,1)$，$y=\frac{z-\alpha x}{1-\alpha}$，则
\begin{align*}
f(z) &= f(\alpha x + (1-\alpha)y) \\
&\le \alpha f(x) + (1-\alpha)f(y)
\end{align*}
即
$$f(y) \ge \frac{f(z)-\alpha f(x)}{1-\alpha}.$$
由 $y=\frac{z-\alpha x}{1-\alpha}$ 可知
$$z = \alpha x + (1-\alpha)y.$$
对上式两边关于 $\alpha$ 求导，得
$$0 = x - y + (1-\alpha)\frac{\partial y}{\partial \alpha},$$
即
$$\frac{\partial y}{\partial \alpha} = \frac{y-x}{1-\alpha}.$$
因此，
$$\frac{\partial}{\partial \alpha} f(y) = \nabla f(y)' \frac{\partial y}{\partial \alpha} = \nabla f(y)' \frac{y-x}{1-\alpha}.$$
对不等式两边关于 $\alpha$ 求导，得
$$0 \le -\frac{f(z)-f(x)}{(1-\alpha)^2} + \frac{1}{1-\alpha} \nabla f(y)'(y-x).$$
令 $\alpha\to 0$，则 $y\to z$，从而
$$f(z) \ge f(x) + (z-x)'\nabla f(z).$$

#### Optimality Condition

设 $C$ 是 $\mathbb{R}^n$ 中的非空凸集，$f:\mathbb{R}^n\rightarrow \mathbb{R}$ 是凸函数且在 $C$ 上可微，则 $x^*\in C$ 是 $\min_{x\in C} f(x)$ 的解当且仅当
$$(x-x^*)'\nabla f(x^*) \ge 0, \forall x\in C.$$

**证明：**
“$\Longrightarrow$”：设 $x\in C$，$\alpha\in (0,1)$，则 $\alpha x + (1-\alpha)x^* \in C$，因此
$$f(\alpha x + (1-\alpha)x^*) \ge f(x^*).$$
由凸性可知
$$f(\alpha x + (1-\alpha)x^*) \le \alpha f(x) + (1-\alpha)f(x^*),$$
故
$$\alpha f(x) + (1-\alpha)f(x^*) \ge f(x^*).$$
即
$$f(x) - f(x^*) \ge 0.$$
对上式两边关于 $\alpha$ 求导，得
$$0 \le f(x) - f(x^*) = (x-x^*)'\nabla f(x^*).$$

“$\Longleftarrow$”：设 $x\in C$，$\alpha\in [0,1]$，则 $\alpha x + (1-\alpha)x^* \in C$，由凸性可知
$$f(\alpha x + (1-\alpha)x^*) \le \alpha f(x) + (1-\alpha)f(x^*).$$
由假设可知
$$f(x) - f(x^*) \ge 0.$$
因此，
$$f(\alpha x + (1-\alpha)x^*) \le \alpha f(x) + (1-\alpha)f(x^*) \le \alpha f(x^*) + (1-\alpha)f(x^*) = f(x^*).$$

#### Projection Theorem

设 $C$ 是 $\mathbb{R}^n$ 中的非空闭凸集。
* 对于任意 $z\in \mathbb{R}^n$，存在唯一的 $x^*\in C$ 使得 $f(x)=||x-z||^2$ 在 $C$ 上取得最小值，$x^*$称为 $z$ 在 $C$ 上的**投影(projection)**。
* $x^*$ 是 $z$ 在 $C$ 上的投影当且仅当
$$(x-x^*)'(z-x^*) \le 0, \forall x\in C.$$

**证明：**
$(a)$: 设 $\{x_k\}\subseteq C$ 且 $f(x_k)\to \inf_{x\in C} f(x)$，则 $\{x_k\}$ 有界，因此存在 $\{x_{k_i}\}\subseteq \{x_k\}$ 和 $x^*\in \mathbb{R}^n$ 使得 $x_{k_i}\to x^*$。由于 $C$ 是闭集，故 $x^*\in C$。由$f$的连续性可知
$$f(x^*) = \lim_{i\to\infty} f(x_{k_i}) = \inf_{x\in C} f(x).$$
若 $y^*\in C$ 且 $y^*\neq x^*$，则
$$||y^*-z||^2 = ||y^*-x^* + x^*-z||^2 = ||y^*-x^*||^2 + ||x^*-z||^2 + 2(y^*-x^*)'(x^*-z) > ||x^*-z||^2,$$
因此，$x^*$ 是唯一的。 

$(b)$: 由上一定理可知，$x^*$ 是 $z$ 在 $C$ 上的投影当且仅当
$$(x-x^*)'\nabla f(x^*) \ge 0, \forall x\in C.$$
由于 $\nabla f(x) = 2(x-z)$，因此结论成立。

**性质：**
设 $C$ 是 $\mathbb{R}^n$ 中的非空闭凸集，$f:\mathbb{R}^n\rightarrow \mathbb{R}$ 是 $\mathbb{R}^n$ 上的二阶连续可微函数。
* 若 $\nabla^2 f(x)$ 在 $C$ 上半正定，则 $f$ 是 $C$ 上的凸函数。
* 若 $\nabla^2 f(x)$ 在 $C$ 上正定，则 $f$ 是 $C$ 上的严格凸函数。
* 若 $C$ 是开的且 $f$ 是 $C$ 上的凸函数，则 $\nabla^2 f(x)$ 在 $C$ 上半正定。

**证明：**
$(a)$：由中值定理可知对 $x,y\in C$，存在 $\alpha\in (0,1)$ 使得
$$f(y) = f(x) + (y-x)'\nabla f(x)+\frac{1}{2}(y-x)'\nabla^2 f(x+\alpha(y-x))(y-x).$$
由于 $\nabla^2 f(x+\alpha(y-x))$ 半正定，故
$$f(y) \ge f(x) + (y-x)'\nabla f(x).$$
由前命题可知，$f$ 是 $C$ 上的凸函数。

$(b)$：同$(a)$，由于 $\nabla^2 f(x+\alpha(y-x))$ 正定，故
$$f(y) > f(x) + (y-x)'\nabla f(x).$$
由前命题可知，$f$ 是 $C$ 上的严格凸函数。

$(c)$：由反证法，设存在 $x\in C$ 和 $d\in \mathbb{R}^n$ 使得 $d'\nabla^2 f(x)d < 0$，则存在 $\alpha>0$ 使得
$$f(x+\alpha d) < f(x) + \alpha d'\nabla f(x).$$
由于 $C$ 是开的，故 $x+\alpha d\in C$。由前命题可知，$f$ 不是 $C$ 上的凸函数，这与假设矛盾。


## 凸函数的性质

**性质：**
若 $f:\mathbb{R}^n\rightarrow \mathbb{R}$ 是凸的，则 $f$ 连续。

**证明：**
我们来证明 $f$ 在 $0$ 处连续。由凸性，$f$ 在单位正方体上有界且最大值在顶点处取得。

考虑 $x_k\rightarrow 0$，令 $y_k=x_k/\|x_k\|_\infty$，$z_k=-x_k/\|x_k\|_\infty$，则
$$f(x_k)\le (1-\|x_k\|_\infty ) f(0)+\|x_k\|_\infty f(y_k)$$
$$f(0)\le \frac{\|x_k\|_\infty }{\|x_k\|_\infty +1}f(z_k)+\frac{1}{\|x_k\|_\infty +1}f(x_k)$$
令 $k\rightarrow \infty$ 即得。

不仅如此，我们还可以将连续性延拓到 $\text{ri} (\text{dom}(f))$ 上。

#### 闭包

函数 $f:X\rightarrow [-\infty,+\infty]$ 的**闭包**为函数 $\text{cl} f:\mathbb{R}^n\rightarrow [-\infty,+\infty]$ 定义为 $$\text{epi}(\text{cl} f)=\text{cl}(\text{epi}(f)). $$

#### 凸包

$f$ 的 **凸包** 为函数 $\check{\text{cl}}f$ 定义为 $$\text{epi}(\check{\text{cl}} f)=\text{cl}(\text{conv}(\text{epi}(f))). $$

**性质：**
对任意 $f:X\rightarrow [-\infty,+\infty]$，
$$\inf_{x\in X} f(x)=\inf _{x\in \mathbb{R}^n}(\text{cl} f)(x)=\inf_{x\in \mathbb{R}^n}(\check{\text{cl}} f)(x). $$

**性质：**
对任意 $f:X\rightarrow [-\infty,+\infty]$，则
* $\text{cl} f$(或 $\check{\text{cl}} f$) 是最大的闭(或闭凸)函数满足被 $f$ 优化。
* 若 $f$ 是凸的，则 $\text{cl} f$ 是凸的。其 proper 当且仅当 $f$ proper。且
$$(\text{cl}f)(x)=f(x), \forall x\in \text{ri}(\text{dom}(f)). $$
且若 $x\in \text{ri}(\text{dom}(f))$，$y\in \text{dom}(\text{cl}f)$，则
$$(\text{cl}f)(y)=\lim_{\alpha\rightarrow 0^+} f(y+\alpha(x-y)). $$

#### 回收方向

给定非空凸集 $C$，向量 $d$ 称为 **回收方向(a direction of recession)**，若从任意点 $x\in C$ 沿 $d$ 方向出发的射线都包含在 $C$ 中，即 $$x+\alpha d\in C, \forall x\in C, \forall \alpha\ge 0.$$

#### 回收锥

$C$ 的**回收锥(recession cone)** 定义为所有回收方向构成的集合，记为 $R_C$。

容易看到 $R_C$ 是包含原点的锥。

**性质：**
设 $C$ 是非空闭凸集。
* $R_C$ 是闭凸锥。
* 向量 $d\in R_C$ 当且仅当存在向量 $x\in C$ 使得 $x+\alpha d\in C, \forall \alpha\ge 0$。
* $R_C$ 含非零向量当且仅当 $C$ 是无界的。
* $C$ 和 $\text{ri}(C)$ 有相同的回收锥。
* 若 $D$ 为另一个闭凸集满足 $C\cap D\neq \emptyset$，则 $$R_{C\cap D}=R_C\cap R_D$$更一般的对一族闭凸集 $\{C_i\}_{i\in I}$，若 $\cap_{i\in I} C_i\neq \emptyset$，则 $$R_{\cap_{i\in I} C_i}=\cap_{i\in I} R_{C_i}.$$

**证明：**
$(b)$的证明：
设 $d\neq 0$，存在 $x\in C$ 使得 $x+\alpha d\in C, \forall \alpha\ge 0$。固定 $\bar{x}\in C,\alpha>0$，我们来证明 $\bar{x}+\alpha d\in C$。通过单位化 $d$ 只需证明 $\bar{x}+d\in C$。

对 $k=1,2\cdots$，令 $$z_k=x_k+kd,d_k=\frac{(z_k-\bar{x})}{\|z_k-\bar{x}\|}\|d\|$$
我们有 $$\frac{d_k}{\|d_k\|}=\frac{z_k-\bar{x}}{\|z_k-\bar{x}\|}\frac{d}{\|d\|}+\frac{x-\bar{x}}{\|z_k-\bar{x}\|},\frac{z_k-\bar{x}}{\|z_k-\bar{x}\|}\rightarrow 1,\frac{x-\bar{x}}{\|z_k-\bar{x}\|}\rightarrow 0$$
故 $d_k\rightarrow d$ 且 $\bar{x}+d_k\rightarrow \bar{x}+d$。由于 $C$ 是闭凸集，故 $\bar{x}+d\in C$。

#### 线性空间

凸集 $C$ 的**线性空间(lineality space)** 定义为 $C$ 的回收锥与其负回收锥的交集，记为 $$L_C=R_C\cap (-R_C). $$

若 $d\in L_C$，这表明 $C$ 包含经过任意点 $x\in C$ 的方向为 $d$ 的直线。
由此我们可以将凸集 $C$ 分解为 $$C=L_C +(C\cap L_C^\perp). $$
这使得我们可以将证明关于 $C$ 的结论归结为关于 $C\cap L_C^\perp$ 的结论。该分解将 $L_C$ 换成其子空间 $S$ 同样成立。

接下来我们的目标是刻画凸函数的单调递减方向。

**性质：**
设 $f:\mathbb{R}^n\rightarrow (-\infty,+\infty]$ 是闭且 proper 的凸函数，考虑水平集 $V_\gamma=\left\{ x\Big| f(x)\le \gamma\right\}$，其中 $\gamma$ 是标量，则：
* 所有非空水平集 $V_\gamma$ 有相同的回收锥：$$R_{V_\gamma}=\left\{ d\Big| (d,0)\in R_{\text{epi}(f)}\right\}.$$
* 若某个非空水平集 $V_\gamma$ 是紧的，则所有水平集都是紧的。

**证明：**
$(a)$：显然。

$(b)$：由$(a)$即得。

#### 函数的回收锥

对闭且 proper 的凸函数 $f:\mathbb{R}^n\rightarrow (-\infty,+\infty]$，$V_\gamma$ 的回收锥称为称为 $f$ 的**回收锥(recession cone)**，记为 $R_f$。同上定义 $d\in R_f$ 为 $f$ 的**回收方向**，$L_f=R_f\cap (-R_f)$ 为 $f$ 的**线性空间**，$d\in L_f$ 称为 $f$ 的**不变空间**。

**例子：**
对半正定矩阵 $Q$，函数 $f(x)=x'Qx+a'x+b$，我们有 $$R_f=\left\{ d\Big|Qd=0,a'd\le 0\right\},L_f=\left\{d\Big| Qd=0,a'd=0\right\}. $$

#### 回收函数

定义 $f$ 的**回收函数(recession function)** 为 $r_f:\mathbb{R}^n\rightarrow (-\infty,+\infty]$，其满足 $$\text{epi}(r_f)=R_{\text{epi}(f)}. $$

**性质：**
$$R_f=\left\{ d\Big| r_f(d)\le 0\right\},L_f=\left\{ d\Big| r_f(d)=r_f(-d)=0\right\}. $$

**性质：**
$$r_f(d)=\sup_\alpha \frac{f(x+\alpha d)-f(x)}{\alpha}=\lim_{\alpha\rightarrow +\infty}\frac{f(x+\alpha d)-f(x)}{\alpha}, \forall x\in \text{dom}(f). $$

因此 $r_f(d)$ 描述了 $f$ 的渐进线。事实上若 $f$ 可微，$$r_f(d)=\lim_{\alpha\rightarrow +\infty} \nabla f(x+\alpha d)'d, \forall x,d \in \mathbb{R}^n. $$

## 局部与全局最小值

考虑在集合 $X\subset \mathbb{R}^n$ 上极小化 $f:\mathbb{R}^n \rightarrow \mathbb{R}$ 的问题。

#### 定义

* 称 $x$ 是**可行的(feasible)** 若 $x\in X\cap \text{dom}(f)$ 。
* 称 $x^*$ 是 $f$ 在 $X$ 上的(全局) **最小值点(minimum)**，若 $x^*$ 可行且 $f(x^*)=\inf_{x\in X} f(x)$。
* 称 $x^*$ 是 $f$ 在 $X$ 上的**局部最小值点(local minimum)**，若存在某个 $\epsilon>0$ 使得 $x^*$ 是 $X\cap B(x^*;\epsilon)$ 上的最小值点。

**性质：**
若 $X$ 是凸集且 $f$ 是凸的，则
* 任意局部最小值点都是全局最小值点；
* 若 $f$ 是严格凸的，则最小值点唯一。

下面我们考虑优化问题的解的存在性问题。

注意到 $f$ 最小值点的集合是 $f$ 的水平集的交集。若某个水平集是紧的，则所有水平集都是紧的，且最小值点存在。

#### (An Extension of the) Weierstrass's Theorem

$f$ 最小值点的集合是非空且紧的，若 $X$ 是闭的，$f$ 在 $X$ 上下半连续，且下述条件有一者成立：
* $X$ 有界；
* 某个水平集 $V_\gamma=\{x\in X|f(x)\le \gamma\}$ 是非空的且有界。
* 对任意子序列 $\{x_k\}\subset X$，若 $\|x_k\|\rightarrow +\infty$，则 $f(x_k)\rightarrow +\infty$。

**证明：**
在每种情形下，$f$ 的水平集 $\cap X$ 均为紧集。

**Weierstrass' Theorem specialized to convex function**

设 $X$ 是 $\mathbb{R}^n$ 中的非空闭凸集，$f:\mathbb{R}^n\rightarrow (-\infty,+\infty]$ 是闭且凸的函数满足 $X\cap \text{dom}(f)\neq \emptyset$，则 $f$ 在 $X$ 上的最小值点存在当且仅当 $R_X\cap R_f=\{0\}$。

**证明：**
设 $f^*=\inf_{x\in X} f(x)$。注意到由于 $X\cap \text{dom}(f)\neq \emptyset$，故 $f^*<\infty$。设 $\left\{\gamma_k\right\}$ 是一个递减到 $f^*$ 的数列，考虑 $$V_k=\{x\in X|f(x)\le \gamma_k\}$$则 $f$ 在 $X$ 上的最小值点为 $$X^*=\cap_{k=1}^\infty (X\cap V_k). $$
其中 $X\cap V_k$ 是非空的且 $R_f\cap R_X$ 是其回收锥，当 $X\neq 0$ 时这也是 $X^*$ 的回收锥。这表明 $X^*$ 是非空且紧的当且仅当 $R_f\cap R_X=\{0\}$。

**性质：**
设 $f_i:\mathbb{R}^n\rightarrow (-\infty,+\infty]$，$i=1,2$ 是闭且 proper 的凸函数，且满足 $$f=f_1+\cdots +f_m$$ 是 proper 的。若存在一个 $f_i$ 满足 $r_{f_i}(d)=\infty$ 对任意非零 $d\in R_{f}$，则 $f$ 在 $\mathbb{R}^n$ 上的最小值点集非空且紧。

**证明：**
由假设可知 $r_f(d)=\infty$ 对任意非零 $d\in R_f$。因此，$R_f=\{0\}$，由 Weierstrass 定理即得。

将 $f$ 改为 $\max\{f_1,\cdots,f_m\}$ 结论同样成立。

考虑一个基础的问题：给定 $\mathbb{R}^n$ 上的非空闭集序列 $\left\{C_k\right\}$  满足 $C_{k+1}\subseteq C_k$，则 $\cap_{k=1}^\infty C_k$ 是否非空？由此可以借由 $X\cap V_k$ 的交集非空判断 $f$ 在 $X$ 上的最小值点集是否非空。

还有一个相关的问题：若 $C$ 是闭的，$A$ 是矩阵，则 $AC$ 是否是闭的？更特别的若 $C_1,C_2$ 是闭的，$C_1+C_2$ 是否是闭的？注意到 $C_1+C_2= A(C_1\times C_2)$，其中 $A(x_1,x_2)=x_1+x_2$。

**性质：**
设 $C$ 是非空闭凸集，$A$ 是矩阵，$N(A)$ 是其零空间。则 $AC$ 是闭的当且仅当 $N(A)\cap R_C=\{0\}$。

**证明：**
设 $\left\{y_k\right\}\subset AC$ 满足 $y_k\rightarrow \bar{y}$。定义 $C_k=C\cap N_k$ ，其中 $$N_k=\left\{x\Big| Ax\in W_k\right\},\quad W_k=\left\{z\Big| \|z-\bar{y}\|\le \|y_k-\bar{y}\| \right\}$$
我们有 $R_{N_k}=N(A)$，故 $C_k$ 是紧的，且 $C_k$ 的交不空。取 $x\in \cap_{k=1}^\infty C_k$，则 $Ax=\bar{y}$，从而 $\bar{y}\in AC$。

于是我们有：$C_1+C_2$ 是闭的当且仅当 $C_1,C_2$ 是闭的且有一者是紧的。

**定理：**
若 $X$ 是多面体，则 $AX$ 是闭的。

设 $F:\mathbb{R}^{n+m}\rightarrow (-\infty,+\infty]$ 是闭且 proper 的凸函数，定义 $f:\mathbb{R}^n\rightarrow (-\infty,+\infty]$ 为 $$f(x)=\inf_{z\in \mathbb{R}^m} F(x,z). $$

**性质：**
若 $F$ 是凸的，则 $f$ 是凸的。

若 $F(x,z)$ 是闭的，$f(x)$ 不一定是闭的。考虑闭的凸函数 $$F(x,z)=\begin{cases}
    e^{-\sqrt{xz}}\quad&\text{if } x\ge 0,z\ge 0\\
    \infty &\text{otherwise}
\end{cases}$$
但是 $$f(x)=\inf_{z\in \mathbb{R}^m} F(x,z)=\begin{cases}
    0 \quad &x>0\\
    1 &x=0\\
    \infty &x<0
\end{cases}$$不是闭的

**性质：**
$$P(\text{epi}(F))\subset \text{epi}(f)\subset \text{cl}(P(\text{epi}(F))),$$其中 $P(x,z,w)=(x,w)$。

**Preservation of Closedness Under Compactness**

设 $F:\mathbb{R}^{n+m}\rightarrow (-\infty,+\infty]$ 是闭且 proper 的凸函数，定义 $f:\mathbb{R}^n\rightarrow (-\infty,+\infty]$ 为 $f(x)=\inf_{z\in \mathbb{R}^m} F(x,z). $若存在某个 $\bar{x}\in \mathbb{R}^n,\bar{\gamma}\in \mathbb{R}$ 满足 $$\left\{z\Big| F(\bar{x},z)\le \bar{\gamma}\right\}$$是非空且紧的，则 $f$ 是闭且 proper 的凸函数。同样的，对任意 $x\in \text{dom}(f)$，都有 $F(x,\cdot)$ 的极小值点是非空且紧的。

## 渐进序列

#### 渐近序列

给定闭凸集序列 $\left\{C_k\right\}$，$\left\{x_k\right\}$ 称为 **渐近序列(asymptotic sequence)**，若 $$0\neq x_k\in C_k,\|x_k\|\rightarrow +\infty,\lim_{k\rightarrow \infty}\frac{x_k}{\|x_k\|}=\frac{d}{\|d\|} $$其中 $d$ 是 $C_k$ 共有的非零回收方向。

**性质：**
任意无界序列 $\left\{x_k\right\}$ 中存在一个渐近子序列。

#### 可收缩

$\left\{x_k\right\}$ 称为 **可收缩的(retractive)**，若存在某个非零回收方向 $d$ ，存在某个 $\bar{k}>0$ 使得 $$x_k-d\in C_k,\forall k\ge \bar{k}. $$

#### 可收缩集

一个闭凸集序列 $\left\{C_k\right\}$ 称为 **可收缩的(retractive)**，若其任意渐近序列都是可收缩的。

**性质：**
设 $\left\{C_k\right\}$ 是闭凸集序列，$X$ 是可收缩集，即 $\bar{C_k}=X\cap C_k$ 是非空集。设 $$R_X\cap R\subset L$$，其中 $$R=\cap_{k=0}^\infty R_{C_k},\quad L=\cap_{k=0}^\infty L_{C_k}$$则 $\left\{\bar{C_k}\right\}$ 是可收缩的且 $\cap_{k=0}^\infty \bar{C_k}$ 非空。

**证明：**
$\left\{\bar{C_k}\right\}$ 共有的回收方向为 $R_X\cap R$。对任意 $\left\{x_k\right\}$，其渐近方向 $d\in R_X\cap R$，由 $d\in L$ 有 $x_k-d\in C_k$，由 $X$ 可收缩有 $x_k-d\in X$，从而 $x_k-d\in \bar{C_k}$。因此，$\left\{\bar{C_k}\right\}$ 是可收缩的。由 Weierstrass 定理即得。

**定理：**
设 $$f(x)=x'Qx+c'x,X=\left\{x\Big| a_j'x+b_j\le 0,j=1,\cdots,r\right\}$$
其中 $Q$ 是半正定对称矩阵。若 $f$ 在 $X$ 上的最小值有限，则 $f$ 在 $X$ 上存在最小值点。

**证明：**
我们有 $$\text{最小值点集}=\cap _{k=0}^\infty \left(X\cap \left\{x\Big| x'Qx+c'x\le \gamma_k\right\} \right)$$
其中 $\gamma_k \downarrow f^*=\inf_{x\in X} f(x)$。设 $R_X$ 和 $R_f$ 分别为 $X$ 和 $f$ 的回收锥，则共有的回收锥为 $R_X\cap R_f$。注意到 $$R_f=\left\{d\Big| Qd=0,c'd\le 0\right\},L_f=\left\{d\Big| Qd=0,c'd=0\right\}.$$
由 $f^*>-\infty$ 可知 $R_X\cap R_f\subseteq L_f$，由此可知该闭凸集序列是可收缩的。由此由前一命题即得。

**性质：**
设 $C$ 是非空闭凸集，设 $A$ 是矩阵其零空间为 $N(A)$。
* 若 $R_C\cap N(A)\subset L_C$，则 $AC$ 是闭的。
* 若 $X$ 是可收缩的且 $R_X\cap R_C\cap N(A)\subset L_C$，则 $A(X\cap C)$ 是可收缩的。

**证明：**
设 $\left\{y_k\right\}\subset AC$ 满足 $y_k\rightarrow \bar{y}$。我们来证明 $\cap_{k=0}^\infty C_k\neq \emptyset$，其中 $$C_k=C\cap N_k,\quad N_k=\left\{x\Big| Ax\in W_k\right\},\quad W_k=\left\{z\Big| \|z-\bar{y}\|\le \|y_k-\bar{y}\| \right\}.$$
由于 $R_{N_k}=N(A)$，故共有的回收锥为 $R_C\cap N(A)$。由假设可知该闭凸集序列是可收缩的。由 Weierstrass 定理即得。

**性质：**
设 $C_1,\cdots,C_m$ 是 $\mathbb{R}^n$ 的非空闭凸子集满足若 $d_1+\cdots +d_m=0$ 且 $d_i\in R_{C_i}$，则有 $d_i=0$。则 $C_1+\cdots +C_m$ 是闭的。

**证明：**
$C=C_1\times \cdots \times C_m$ 是 $\mathbb{R}^{nm}$ 的非空闭凸子集，且其回收锥 $R_C=R_{C_1}\times \cdots \times R_{C_m}$。定义 $A$ 满足：$$A(x_1,\cdots,x_m)=x_1+\cdots +x_m$$则 $N(A)=\left\{(x_1,\cdots,x_m)\Big| x_1+\cdots +x_m=0\right\}$。由假设可知 $R_C\cap N(A)=\{0\}$，由前一命题即得。




我们已经将对偶的概念从集合的对偶延伸至函数的对偶，现在我们考虑问题的对偶。

<br>
<hr>

<div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;" markdown="1">

[ :octicons-arrow-left-24: 返回目录](凸优化.md){ .md-button }

[ 下一章：凸多面体 :octicons-arrow-right-24: ](chapter2.md){ .md-button .md-button--primary }

</div>