---
title: 量子力学
date: 2026-05-10
hide:
  - navigation
categories:
  - 物理
tags:
  - physics
  - quantum-mechanics
---
# 量子力学

---

一个复向量空间 $V$ 称为**内积空间**，如果其上定义了一个映射 $\langle \cdot, \cdot \rangle : V \times V \rightarrow \mathbb{C}$，满足：

* **正定性**：$\langle v, v \rangle \ge 0$，且 $\langle v, v \rangle = 0 \iff v = 0$
  
* **共轭对称性**：$\langle u, v \rangle = \langle v, u \rangle^*$
  
* **对第二变元的线性**：$\langle u, \alpha v + \beta w \rangle = \alpha\langle u, v \rangle + \beta\langle u, w \rangle$
  
* **推论（反线性）**：对第一变元满足反线性（Sesquilinear Property），即 $\langle \alpha u + \beta v, w \rangle = \alpha^*\langle u, w \rangle + \beta^*\langle v, w \rangle$。

---

内积自然诱导了一个**范数** $||v|| = \sqrt{\langle v, v \rangle}$，进而诱导了**距离度量** $d(u, v) = ||u - v||$。物理上，归一化条件即要求状态向量满足 $||v|| = 1$。


**海森堡不确定关系**：对于算符 $A$ 和 $B$，定义它们的对易子为 $[A, B] = AB - BA$。我们有

$$
\Delta_\psi A \cdot \Delta_\psi B \ge \frac{1}{2} |\langle \psi| [A, B]|\psi \rangle|
$$

这里 $\Delta_\psi A = \sqrt{\langle A^2 \rangle - \langle A \rangle^2}$ 是算符 $A$ 在状态 $\psi$ 下的标准差。

---

一个内积空间被称为 **希尔伯特空间** $\mathcal{H}$，如果它在其内积诱导的范数度量下是**完备的 (Complete)**。

---

* **右矢 (Ket) $| \psi \rangle$**：代表希尔伯特空间 $\mathcal{H}$ 中的一个态向量。

* **左矢 (Bra) $\langle \phi |$**：代表连续对偶空间 $\mathcal{H}'$ 中的一个线性泛函。

根据 Riesz 表示定理，在希尔伯特空间中，每一个连续线性泛函都唯一对应 $\mathcal{H}$ 中的一个向量。内积 $\langle \phi | \psi \rangle$ 即可视为左矢泛函作用在右矢向量上产生的一个复数（物理上代表概率幅）。

---

* **有界算符 (Bounded Operator)**：如果存在常数 $M > 0$，使得对所有 $x \in \mathcal{H}$ 都有 $||Ax|| \le M||x||$，则算符 $A$ 是有界的。这里 

$$
||A|| = \sup_{||x||=1} ||Ax||
$$
  
* **无界算符 (Unbounded Operator)** ：若不存在这样的 $M$，即 $\sup_{||x||=1} ||Ax|| = \infty$，则算符无界。

物理现实：量子力学中最重要的算符（位置 $\hat{X}$ 和动量 $\hat{P}$）都是无界算符。

* **Hellinger-Toeplitz 定理**：如果一个对称算符 $A$ 的定义域是整个希尔伯特空间 $\mathcal{H}$，那么 $A$ 必然是有界算符。

由这个定理我们知道既然位置和动量是无界算符，它们绝对不可能在整个 $\mathcal{H}$ 上被定义。它们只能在 $\mathcal{H}$ 的一个稠密子空间 $\mathcal{D}(A)$ 上起作用。

* **稠密定义 (Densely Defined)**：如果算符 $A$ 的定义域 $\mathcal{D}(A)$ 在 $\mathcal{H}$ 中是稠密的，即 $\overline{\mathcal{D}(A)} = \mathcal{H}$，则称 $A$ 是稠密定义的。

* $A$ 的伴随 $A^\dagger$ 是良定义的当且仅当 $A$ 是稠密定义的。其具体定义为

$$
\mathcal{D}(A^\dagger) = \{\phi \in \mathcal{H} : \exists \eta \in \mathcal{H}, \forall \psi \in \mathcal{D}(A), \langle A\psi, \phi \rangle = \langle \psi, \eta \rangle\}
$$

---

对于稠密定义的线性算符 $A : \mathcal{D}(A) \subset \mathcal{H} \rightarrow \mathcal{H}$：

* **对称 (Symmetric / Hermitian)**：若对于所有 $\phi, \psi \in \mathcal{D}(A)$，有 $\langle \phi, A\psi \rangle = \langle A\phi, \psi \rangle$。

* **伴随算符 (Adjoint) $A^\dagger$**：其定义域 $\mathcal{D}(A^\dagger)$ 包含所有使得泛函 $\psi \mapsto \langle \phi, A\psi \rangle$ 连续的 $\phi$。
  
* **自伴随 (Self-Adjoint)**：若 $A$ 是对称的，并且其定义域与伴随算符的定义域完全相等，即 $\mathcal{D}(A) = \mathcal{D}(A^\dagger)$。物理意义：只有严格的自伴随算符，才能代表物理上的可观测量，并保证时间演化的概率守恒（幺正性）。

---

**幺正算符 (Unitary Operator)**：如果 $U$ 是一个线性算符，满足 $U^\dagger U = UU^\dagger = I$，则称 $U$ 是幺正的。幺正算符代表量子系统的对称变换（如时间演化、空间平移、旋转等），它们保持内积不变，即 $\langle U\phi, U\psi \rangle = \langle \phi, \psi \rangle$。

---

**算符的图**：设 $A: \mathcal{D}(A) \subset \mathcal{H} \rightarrow \mathcal{H}$ 为线性算符。其图 $G(A)$ 定义为直和空间 $\mathcal{H} \oplus \mathcal{H}$ 中的集合：

$$
G(A) := \{ (x, Ax) \in \mathcal{H} \oplus \mathcal{H} \mid x \in \mathcal{D}(A) \}$$

其中 $\mathcal{H} \oplus \mathcal{H}$ 上的内积定义为 $\langle(x_1, y_1), (x_2, y_2)\rangle_{\mathcal{H} \oplus \mathcal{H}} := \langle x_1, x_2\rangle_{\mathcal{H}} + \langle y_1, y_2\rangle_{\mathcal{H}}$。这给出了其上的范数 $||(x, y)||_{\mathcal{H} \oplus \mathcal{H}} = \sqrt{||x||^2 + ||y||^2}$。

**闭算符**：一个线性算符 $A: \mathcal{D}(A) \subset \mathcal{H} \rightarrow \mathcal{H}$ 是闭的，当且仅当它的图 $G(A)$ 是直和空间 $\mathcal{H} \oplus \mathcal{H}$ 中的闭子集.

---

设 $A: \mathcal{D}(A) \subset \mathcal{H} \rightarrow \mathcal{H}$ 是一个线性算符。

* $G(A)$ 是 $\mathcal{H} \oplus \mathcal{H}$ 中的一个线性子空间。

* 投影 $\pi_1: \mathcal{H} \oplus \mathcal{H} \rightarrow \mathcal{H}$ 定义为 $\pi_1(x, y) = x$ 在 $G(A)$ 的限制是双射：

$$
\pi_1|_{G(A)}: G(A) \xrightarrow{\cong} \mathcal{D}(A)
$$

* 其逆映射定义为 $x\mapsto  (x, Ax)$.

* $A$ 由 $G(A)$ 唯一确定：若 $G(A) = G(B)$，则 $A = B$ 且 $\mathcal{D}(A) = \mathcal{D}(B)$.

---

**序列刻画（闭算符）**：一个线性算符 $A: \mathcal{D}(A) \subset \mathcal{H} \rightarrow \mathcal{H}$ 是闭的，当且仅当对于任何序列 $\{x_n\} \subset \mathcal{D}(A)$，如果满足 $x_n \rightarrow x$ 且 $Ax_n \rightarrow y$ （在 $\mathcal{H}$ 中），那么必定有 $x \in \mathcal{D}(A)$ 且 $Ax = y$。

*(注：对于无界算符，闭性不等于连续性。闭算符不要求当 $x_n \rightarrow x$ 时 $Ax_n$ 必须收敛；但它要求如果 $Ax_n$ 决定收敛，它必定收敛到 $Ax$)*。

---

**可闭算符 (Closable Operator)**：一个线性算符 $A$ 是可闭的，当且仅当它的图 $G(A)$ 在 $\mathcal{H} \oplus \mathcal{H}$ 中的闭包 $\overline{G(A)}$ 本身也是某个线性算符的图。

* **等价刻画**：$A$ 是可闭的，当且仅当对于任何满足 $x_n \rightarrow 0$ 且 $Ax_n \rightarrow y$ 的序列 $\{x_n\} \subset \mathcal{D}(A)$，必定有 $y = 0$。

* **闭包的构造**：如果 $A$ 是可闭的，其对应的闭包算符记为 $\overline{A}$，其定义域为：

  $$
  \mathcal{D}(\overline{A}) = \{ x \in \mathcal{H} \mid \exists \{x_n\} \subset \mathcal{D}(A), x_n \rightarrow x \text{ 且 } Ax_n \text{ 在 } \mathcal{H} \text{ 中收敛} \}
  $$
  
  并且映射关系为 $\overline{A}x = \lim_{n \rightarrow \infty} Ax_n$。

---

**图范数 (Graph Norm)**：对于 $x \in \mathcal{D}(A)$，定义图范数为：

$$
||x||_A^2 := ||x||_{\mathcal{H}}^2 + ||Ax||_{\mathcal{H}}^2
$$

* **定理**：算符 $A$ 是闭的，当且仅当 $(\mathcal{D}(A), ||\cdot||_A)$ 是一个完备的希尔伯特空间。

* **推论**：如果 $A$ 是可闭算符，将其定义域 $\mathcal{D}(A)$ 在图范数下完备化（即添加所有柯西序列的极限点），就精确得到了其闭包的定义域 $\mathcal{D}(\overline{A})$。

---

**伴随算符的图 (Graph of the Adjoint)**：设 $A: \mathcal{D}(A) \subset \mathcal{H} \rightarrow \mathcal{H}$ 为稠密定义的线性算符。定义一个直和空间上的幺正翻转算符 $V: \mathcal{H} \oplus \mathcal{H} \rightarrow \mathcal{H} \oplus \mathcal{H}$，规则为 $V(x, y) = (y, -x)$。则伴随算符 $A^\dagger$ 的图满足：

$$
G(A^\dagger) = [VG(A)]^\perp
$$

* **推论**：因为正交补集在拓扑上必定是闭集，所以任何稠密定义算符的伴随算符 $A^\dagger$ **永远是闭算符**。

---

**自伴随性的几何刻画 (Geometric Characterization)**：对于稠密定义的算符 $A$，其代数性质可以完全等价于 $\mathcal{H} \oplus \mathcal{H}$ 中的几何性质：

* **对称 (Symmetric)**：$A \subset A^\dagger \iff G(A) \subset G(A^\dagger) \iff G(A) \subset [VG(A)]^\perp$。

* **自伴随 (Self-Adjoint)**：$A = A^\dagger \iff G(A) = G(A^\dagger) \iff G(A) = [VG(A)]^\perp$。

* **本质自伴随 (Essentially Self-Adjoint)**：$\overline{G(A)} = G(A^\dagger)$。

---

## 谱理论 (Spectral Theory)

---

在量子力学中，可观测量必须是自伴随算符，而其测量的所有可能结果精确对应于该算符的**谱 (Spectrum)**。对于无界算符，不能简单地用“特征值”来定义谱，必须通过**预解算符 (Resolvent Operator)** 来严密界定。

**预解集 (Resolvent Set, $\rho(A)$)**：设 $A$ 是希尔伯特空间 $\mathcal{H}$ 上的闭算符。预解集 $\rho(A)$ 包含所有满足以下条件的复数 $\lambda \in \mathbb{C}$：

1. 算子 $(A - \lambda I): \mathcal{D}(A) \rightarrow \mathcal{H}$ 是双射 (Bijective)。
   
2. 其逆映射 $(A - \lambda I)^{-1}$ 是 $\mathcal{H}$ 上的有界算符。

对于 $\lambda \in \rho(A)$，定义**预解算符**为 $R_\lambda(A) = (A - \lambda I)^{-1}$。

---

**谱 (Spectrum, $\sigma(A)$)**：谱是预解集在复平面上的补集，即 $\sigma(A) = \mathbb{C} \setminus \rho(A)$。当 $\lambda \in \sigma(A)$ 时，意味着算子 $(A - \lambda I)^{-1}$ 不是单射、不是满射，或者存在但无界。

谱被严格分类为以下三种：

* **点谱 (Point Spectrum, $\sigma_p$)**：$(A - \lambda I)$ 不是单射，即存在非零向量 $\psi$ 使得 $A\psi = \lambda\psi$。对应的 $\lambda$ 是本征值，存在属于 $L^2$ 空间的本征函数（对应物理上的**束缚态 Bound States**）。

* **连续谱 (Continuous Spectrum, $\sigma_c$)**：$(A - \lambda I)$ 是单射，且其值域在 $\mathcal{H}$ 中稠密但**不封闭**。此时没有属于 $L^2$ 空间的本征函数（需引入装备希尔伯特空间 Rigged Hilbert Space 来处理平面波等，对应物理上的**散射态 Scattering States**）。

* **剩余谱 (Residual Spectrum, $\sigma_r$)**：$(A - \lambda I)$ 是单射，但其值域在 $\mathcal{H}$ 中**不稠密**。

**自伴随算符的谱性质**：如果算符 $A$ 是自伴随的，则必须满足：

1. **实数谱定理**：$\sigma(A) \subseteq \mathbb{R}$。物理上保证了测量结果必然是实数。

2. **无剩余谱**：$\sigma_r(A) = \emptyset$。

3. **预解式范数**：当 $\lambda \notin \mathbb{R}$ 时，预解算符的范数严格等于 $\lambda$ 到谱集的几何距离的倒数：$||R_\lambda(A)|| = \frac{1}{\text{dist}(\lambda, \sigma(A))}$。

---

**投影值测度 (Projection-Valued Measure, PVM)**：为了将连续的谱也纳入“对角化”的范畴，引入投影值测度作为无限维的“谱标尺”。$P_A$ 是从实数集的 Borel 子集 $\mathcal{B}(\mathbb{R})$ 映射到 $\mathcal{H}$ 上的正交投影算符的映射，满足：


1. $P_A(\emptyset) = 0$, $P_A(\mathbb{R}) = I$。

2. $P_A(\Omega_1 \cap \Omega_2) = P_A(\Omega_1)P_A(\Omega_2)$。

3. 对于互不相交的集合序列 $\{\Omega_n\}$，满足强算子收敛：$P_A(\cup_n \Omega_n) = \sum_n P_A(\Omega_n)$。

**谱定理 (Spectral Theorem)**：谱定理证明了**每一个自伴随算符都可以被对角化**。对于任何自伴随算符 $A$，存在唯一的一个投影值测度 $P_A$，使得：

$$
A = \int_{\sigma(A)} \lambda \, dP_A(\lambda)
$$

* **定义域条件**：并不是空间中的所有向量都能被 $A$ 作用。向量 $\psi$ 属于定义域 $\mathcal{D}(A)$ 的充要条件是其“谱权重的二阶矩”有限：

  $$
  \mathcal{D}(A) = \left\{ \psi \in \mathcal{H} \mid \int |\lambda|^2 d\langle \psi, P_A(\lambda) \psi \rangle < \infty \right\}
  $$

**泛函演算 (Functional Calculus)**：
一旦算符被谱定理“对角化”，就可以合法地定义算符的任意函数。对于任何 Borel 函数 $f: \mathbb{R} \rightarrow \mathbb{C}$，定义算符函数为：

$$
f(A) = \int f(\lambda) \, dP_A(\lambda)
$$

这为计算诸如时间演化算符 $e^{-iHt/\hbar}$ 等提供了坚如磐石的数学基础。

---

在上述泛函分析的框架搭建完毕后，Dirac 和 von Neumann 确立了量子力学的公理化体系：

* **公理 I (状态 State)** 物理系统的纯态 (Pure State) 由可分复希尔伯特空间 $\mathcal{H}$ 中的一条“射线” (Ray) 来表示。即由单位向量 $\psi$ 构成的等价类 $[\psi] = \{\lambda\psi : |\lambda|=1\}$。

* **公理 II (可观测量 Observables)** 物理上的可观测量由定义在 $\mathcal{H}$ 的稠密子空间上的自伴随算符 (Self-adjoint Operators) $A$ 来表示。

* **公理 III (测量结果 Spectrum)** 对观测量 $A$ 进行测量，唯一可能得到的物理结果 $a$，必然属于算符 $A$ 的谱集：$a \in \sigma(A)$。

* **公理 IV (玻恩法则 Born Rule)** 给定状态 $\psi$，测量观测量 $A$ 时，其结果落在实数集 Borel 子集 $\Omega \subset \mathbb{R}$ 中的概率，由该算符的投影值测度 (PVM) 给出：
  
 $$P(\Omega) = \langle \psi | E_A(\Omega) | \psi \rangle = ||E_A(\Omega)\psi||^2$$
 
* **推论**：物理量的期望值为 $\langle A \rangle = \int \lambda \, d\langle \psi | E_A(\lambda) | \psi \rangle$。

* **公理 V (动力学演化 Dynamics)** 孤立量子系统状态随时间的演化，由一个强连续的单参数幺正群 $U(t) = e^{-iHt/\hbar}$ 支配。根据 Stone 定理，其生成元 $H$ 必然是一个自伴随算符（即哈密顿量，代表总能量）。微分形式即为薛定谔方程：
  
$$i\hbar\frac{d}{dt} |\psi(t)\rangle = H |\psi(t)\rangle$$
  
* **注**：这是一个完全确定性、连续且可逆的线性偏微分方程演化。

* **公理 VI (投影/坍缩假设 Projection Postulate)** 如果对状态为 $\psi$ 的系统测量观测量 $A$，并得到确定的结果 $a \in \sigma(A)$，那么系统的状态会发生非幺正的、不连续的瞬间投影（坍缩）：
  
  $$|\psi\rangle \xrightarrow{\text{测量}} \frac{P_A(\{a\})|\psi\rangle}{||P_A(\{a\})|\psi\rangle||}$$

* **注**：这是整个体系中唯一非确定性、非时间反演对称的公理，它与公理 V 的连续演化产生了深刻的逻辑冲突，这正是量子力学中著名的“测量问题 (Measurement Problem)”。

---

在一维空间中，位置算符定义为乘法算符 $(\hat{X}\psi)(x) = x\psi(x)$ 。由空间平移对称性（动量作为平移生成元）严格导出正则对易关系 (CCR) $[\hat{X}, \hat{P}] = i\hbar\hat{I}$ 。

**Stone-von Neumann 定理**：对于满足 CCR 指数形式（Weyl 关系）的不可约表示，在可分希尔伯特空间上酉等价于薛定谔表示：$\hat{P} = -i\hbar\frac{d}{dx}$ 。

**边界对自伴随性的破坏**：在有限区间 $\Omega = [-L/2, L/2]$ 上，若施加 Dirichlet 边界条件 $\psi(\pm L/2) = 0$，动量算符 $\hat{P}$ 的伴随算符 $\hat{P}^\dagger$ 定义域大于 $\mathcal{D}(\hat{P})$，因此 $\hat{P}$ 不是自伴随的（亏指数不为零） 。物理上这意味着有界盒子内的平移对称性被破坏，动量不再是守恒的观测量 。

**哈密顿算符的自伴随扩张**：哈密顿算符 $\hat{H} = -\frac{\hbar^2}{2m}\frac{d^2}{dx^2}$ 。为了满足时间演化的幺正性，必须选择使其自伴随的边界条件。Dirichlet 边界条件 $\psi(\pm L/2) = 0$ 使得边界项 $[\overline{\phi'}\psi - \overline{\phi}\psi']_{-L/2}^{L/2} = 0$，保证了 $\mathcal{D}(\hat{H}) = \mathcal{D}(\hat{H}^\dagger)$ 。

**推论**：解特征值问题 $\hat{H}\psi = E\psi$，得到纯点谱 $E_n = \frac{n^2\pi^2\hbar^2}{2mL^2}$ ($n \in \mathbb{N}$) 。本征函数在 $L^2$ 中构成完备正交基 。

---

根据作业的考纲要求，我们在你已有的泛函和谱理论笔记基础上，继续补充用于实战求解的四大核心模块（边界条件检验、一维势场求解、Wigner 定理、角动量耦合）：

---

## 算符自伴随性的边界条件检验

---

对于定义在有限区间（如 $[0,1]$）上的动量算符 $P = -i\frac{d}{dx}$，其代数性质完全由边界条件决定。

* **对称性检验 (Symmetric Check)**：
  检验 $\langle \phi | P \psi \rangle = \langle P \phi | \psi \rangle$ 是否成立。通过分部积分，这等价于要求边界项必须消失：

  $$
  [\overline{\phi(x)}\psi(x)]_0^1 = \overline{\phi(1)}\psi(1) - \overline{\phi(0)}\psi(0) = 0
  $$
  
  如果给定的边界条件使得上式不为零，则该算符不是对称的。

* **亏指数计算 (Deficiency Indices)**：
  若算符不自伴随，需要计算亏指数 $n_\pm = \dim \ker(P^\dagger \mp i)$ 来判断其是否具有自伴随扩张。

  1. 求解常微分方程 $P^\dagger \psi = \pm i \psi$，即 $-i\psi' = \pm i\psi$。

  2. 得到通解 $\psi_\pm(x) = C e^{\mp x}$。

  3. 将 $\psi_\pm(x)$ 代入伴随算符 $P^\dagger$ 的定义域（即能让边界项为 0 的最宽泛条件），能存活的独立解的个数即为 $n_+$ 和 $n_-$。只有当 $n_+ = n_- = 0$ 时，算符才是本质自伴随的。

---

## 一维定态势场与边界条件匹配

---

在求解一维定态薛定谔方程 $-\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2} + V(x)\psi = E\psi$ 时，物理状态必须满足特定的边界匹配条件：

* **有限势能区的匹配**：
  在势能 $V(x)$ 发生有限跃变的边界处，波函数及其一阶导数必须连续：

  $$
  \psi(x_0^+) = \psi(x_0^-), \quad \psi'(x_0^+) = \psi'(x_0^-)
  $$

* **Dirac $\delta$ 势的匹配 (Dirac Delta Potential)**：
  对于势场 $V(x) = -\alpha \delta(x)$，波函数 $\psi(x)$ 依然保持连续，但由于势能在原点无穷大，其一阶导数在 $x=0$ 处会发生跃变。对薛定谔方程在 $[-\epsilon, \epsilon]$ 区间积分并取极限，得到导数跃变条件：

  $$
  \Delta \psi' = \psi'(0^+) - \psi'(0^-) = -\frac{2m\alpha}{\hbar^2}\psi(0)
  $$

  此边界条件直接决定了 $\delta$ 势阱的束缚态能量与透射系数。

---

## 对称性与 Wigner 定理

---

* **Wigner 状态对称性**：
  量子力学中的对称变换必须保持物理观测的转移概率不变。在数学上，这意味着状态空间上的映射 $T: \mathcal{H} \rightarrow \mathcal{H}$ 必须保持内积的模长不变：
  $$|\langle T\psi | T\phi \rangle| = |\langle \psi | \phi \rangle|$$
  满足此条件的映射被称为满足 Wigner 条件。

* **Wigner 定理**：
  任何满足上述 Wigner 条件的满射 $T$，必然可以被表示为以下两种算符之一：

  1. **幺正算符 (Unitary)**：线性（$T(\alpha\psi + \beta\phi) = \alpha T\psi + \beta T\phi$）且严格保内积（$\langle T\psi | T\phi \rangle = \langle \psi | \phi \rangle$）。

  2. **反幺正算符 (Antiunitary)**：反线性（$T(\alpha\psi + \beta\phi) = \alpha^* T\psi + \beta^* T\phi$）且内积取复共轭（$\langle T\psi | T\phi \rangle = \langle \psi | \phi \rangle^*$），如时间反演操作。

---

## 角动量代数与 Clebsch-Gordan 耦合

* **角动量生成元**：
  角动量算符必须满足 $SU(2)$ 李代数的标准对易关系：
  $$[J_i, J_j] = i\hbar\epsilon_{ijk}J_k$$
  总角动量平方 $J^2 = J_x^2 + J_y^2 + J_z^2$ 与所有分量对易，其本征值为 $\hbar^2 j(j+1)$。

* **多体系张量积与 Clebsch-Gordan 分解**：
  当系统由两个角动量分别为 $j_1$ 和 $j_2$ 的子系统构成时，总系统的状态空间为张量积空间。总角动量 $\vec{J} = \vec{J_1} \otimes I + I \otimes \vec{J_2}$ 的可能量子数 $J$ 只能取以下离散值：

  $$
  J \in \{ |j_1 - j_2|, |j_1 - j_2| + 1, \dots, j_1 + j_2 \}
  $$

  耦合基 $|J, M\rangle$ 可以通过无耦合基 $|j_1, m_1\rangle \otimes |j_2, m_2\rangle$ 的线性组合得到，其展开系数即为 Clebsch-Gordan 系数。可通过总降算符 $J_- = J_{1-} + J_{2-}$ 作用于最高权态 $|j_1+j_2, j_1+j_2\rangle$ 递归求出所有状态矩阵。