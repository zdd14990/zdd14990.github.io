---
title: Machine Learning Crash Course
date: 2026-02-21
hide:
  - navigation
categories:
  - 应用数学
  - AI 博资考
tags:
  - ai-exam
  - applied-math
  - machine-learning-crash-course
---
## 机器学习

---

### 监督学习和 PAC 学习

---
在监督学习中，我们有一个输入空间 $\mathcal{X}$（比如图片的像素特征）和一个标签空间 $\mathcal{Y}$（比如分类类别）。

自然界中存在一个未知的数据分布 $\mathcal{D}$，我们所有的训练数据 $S = \{(x_1, y_1), \dots, (x_m, y_m)\}$ 都是从这个分布中独立同分布（i.i.d.）采样得到的。

这里存在一个根本的矛盾，也是机器学习理论要解决的核心问题：

* **真实风险 (True Risk / Generalization Error, $L_{\mathcal{D}}(h)$)**：这是我们真正想要最小化的目标。它衡量的是模型 $h$ 在整个未知分布 $\mathcal{D}$ 上的预期表现。

$$
L_{\mathcal{D}}(h) = \mathbb{P}_{(x,y) \sim \mathcal{D}}[h(x) \neq y]
$$

因为分布 $\mathcal{D}$ 是未知的，真实风险永远无法直接计算。

* **经验风险 (Empirical Risk / Training Error, $L_S(h)$)**：
这是我们实际能算出来的目标。它衡量的是模型在已知的训练集 $S$ 上的平均错误率 。

$$
L_S(h) = \frac{1}{m} \sum_{i=1}^m \mathbb{I}[h(x_i) \neq y_i]
$$

在实际操作中，我们使用的是经验风险最小化 (ERM, Empirical Risk Minimization) 策略，即选出在训练集上表现最好的模型 $h_S = \arg\min_{h \in \mathcal{H}} L_S(h)$ 。但这会带来一个致命陷阱：过拟合（Overfitting）。在训练集上表现完美，并不代表在真实分布上表现好。

---

为了解决上述矛盾，Leslie Valiant 提出了 PAC 学习框架。既然我们无法保证选出的模型 $h$ 百分之百完美（因为数据是随机抽样的，存在运气极差抽到极端数据的可能），那我们就退而求其次，给出一个概率论意义上的保证。PAC 这个名字包含了两个核心指标：

* **近似正确 (Approximately Correct, $\epsilon$)**：我们容忍模型有一定的误差，只要它的真实风险 $L_{\mathcal{D}}(h) \le \epsilon$（比如误差小于 1%），我们就认为它是个好模型。

* **极大概率 (Probably, $1-\delta$)**：由于抽样的随机性，我们无法保证每次训练都能得到好模型。我们只要求，在绝大多数情况下（概率至少为 $1-\delta$，比如 99% 的情况下），算法都能输出一个“近似正确”的模型。

---

一个假设空间（模型集合）$\mathcal{H}$ 被称为是 **PAC 可学习** 的，如果存在一个学习算法和一个多项式级别的函数 $m_{\mathcal{H}}(\epsilon, \delta)$，使得对于：

* 任意的数据分布 $\mathcal{D}$
* 任意的精度参数 $\epsilon \in (0, 1)$
* 任意的置信度参数 $\delta \in (0, 1)$

只要训练样本量 $m \ge m_{\mathcal{H}}(\epsilon, \delta)$，该算法在独立同分布的样本集 $S$ 上运行后，输出的假设 $h$ 满足以下不等式：

$$
\mathbb{P}_{S \sim \mathcal{D}^m}[L_{\mathcal{D}}(h) \le \epsilon] \ge 1 - \delta
$$

---

考试中经常会区分这两种 PAC 模型：

* **可实现 PAC (Realizable PAC)**：
这是一个强假设。它假设自然界中那个产生真实标签的完美函数 $f$，本身就包含在我们选择的假设空间 $\mathcal{H}$ 里面。因此，算法总能在假设空间中找到一个在训练集上误差为 0 的模型 。

* **不可知 PAC (Agnostic PAC)**：
这是更符合真实世界的假设。它不假设完美函数存在于 $\mathcal{H}$ 中（甚至标签可能含有噪声） 。在这种情况下，我们的目标不再是追求绝对误差小于 $\epsilon$，而是追求与假设空间中最优模型的差距小于 $\epsilon$ 。
其数学表达变为：

$$
\mathbb{P}_{S \sim \mathcal{D}^m} \left[ L_{\mathcal{D}}(h) \le \min_{h' \in \mathcal{H}} L_{\mathcal{D}}(h') + \epsilon \right] \ge 1 - \delta
$$

---

### VC维、Sauer引理与统计学习理论基本定理

---

当假设空间 $\mathcal{H}$ 是有限的，我们可以简单地用 $\log|\mathcal{H}|$ 来衡量它的复杂度。但对于大多数实用模型（如线性分类器、神经网络），参数是连续的，$\mathcal{H}$ 的大小是无限的。为了在无限空间中建立概率误差界限，我们引入了基于组合数学的测度。

* **对分 (Dichotomy)** 与 **生长函数 (Growth Function, $\tau_{\mathcal{H}}(m)$)**：对于包含 $m$ 个样本的数据集 $C = \{x_1, \dots, x_m\}$，空间 $\mathcal{H}$ 中的模型最多能给这 $m$ 个点打出多少种不同的二值标签组合？这个数量的最大值就是生长函数 $\tau_{\mathcal{H}}(m)$ 。显然，它的绝对上限是 $2^m$（即所有的正负组合都被模型实现了） 。

* **打散 (Shattering)**：如果 $\tau_{\mathcal{H}}(m) = 2^m$，这就意味着无论这 $m$ 个点被标记成什么样，我们的假设空间 $\mathcal{H}$ 里总能挑出一个模型把它们完美分类（误差为 0）。一旦模型能打散数据，说明它具备了绝对的“死记硬背”能力，我们在训练集上看到的 0 误差，就无法证明它真的学到了规律，它可能只是把答案背下来了 。

---

为了量化这种死记硬背的极限，我们定义 VC 维度：空间 $\mathcal{H}$ 的 **VC 维** $d$ 是它能够打散的最大样本集的大小 ：如果对于任意大小的 $m$，$\mathcal{H}$ 都能打散，那么 $\text{VCdim}(\mathcal{H}) = \infty$ 。

要严格证明 $\text{VCdim}(\mathcal{H}) = d$，需完成两步：下界：找到某一个大小为 $d$ 的样本集，证明它可以被 $\mathcal{H}$ 打散。上界：证明任意大小为 $d+1$ 的样本集，都绝对不能被 $\mathcal{H}$ 打散。

---

**Sauer 引理**：如果 $\text{VCdim}(\mathcal{H}) = d < \infty$，那么对于所有的 $m$，生长函数必定满足：

$$
\tau_{\mathcal{H}}(m) \le \sum_{i=0}^d \binom{m}{i}
$$

当 $m > d$ 时，上述多项式和可以被严格放缩为 ：

$$
\tau_{\mathcal{H}}(m) \le \left(\frac{em}{d}\right)^d
$$

这表明当 $m$ 超过 VC 维度 $d$ 时，生长函数的增长速度从指数级骤降为多项式级。

---

**统计学习理论基本定理 (The Fundamental Theorem)** 一个假设空间 $\mathcal{H}$ 是（不可知）PAC 可学习的，当且仅当它的 VC 维是有限的（$\text{VCdim}(\mathcal{H}) < \infty$） 。

---

为了达到 PAC 保证 $\mathbb{P}[L_{\mathcal{D}}(h) \le L_{\mathcal{D}}(h^*) + \epsilon] \ge 1 - \delta$，所需的样本量 $m$ 必须满足：

* 可实现情形 (Realizable Case)：$m_{\mathcal{H}}(\epsilon, \delta) \le C \frac{d \log(1/\epsilon) + \log(1/\delta)}{\epsilon}$ 
  
* 不可知情形 (Agnostic Case)：$m_{\mathcal{H}}(\epsilon, \delta) \le C \frac{d + \log(1/\delta)}{\epsilon^2}$

---

### 模型的选择与偏差-方差权衡

---

假设真实世界的数据生成规律是 $y = f(x) + \epsilon$，其中 $\epsilon$ 是均值为 0、方差为 $\sigma^2$ 的固有白噪声（Irreducible Noise）。我们利用训练集 $S$ 训练出了一个模型 $\hat{f}_S(x)$。当我们把这个模型放到未知的测试点 $x$ 上去预测时，它的期望均方误差 (Expected Squared Error) 可以被分解为三个部分：

$$
\mathbb{E}_S \left[ (y - \hat{f}_S(x))^2 \right] = \text{Bias}^2(\hat{f}_S(x)) + \text{Var}(\hat{f}_S(x)) + \sigma^2
$$

这三个部分代表了误差的三个不同来源：

* **固有噪声 ($\sigma^2$)**：数据本身自带的随机性，这是任何模型都无法消除的“天花板”误差。
* **偏差 (Bias)**：定义为 $\mathbb{E}_S[\hat{f}_S(x)] - f(x)$。它衡量的是我们模型的平均预测值与真实规律之间的差距。它反映了我们所选的假设空间 $\mathcal{H}$ 本身的局限性（即 Approximation Error）。
* **方差 (Variance)**：定义为 $\mathbb{E}_S \left[ (\hat{f}_S(x) - \mathbb{E}_S[\hat{f}_S(x)])^2 \right]$。它衡量的是在不同训练集 $S$ 上，模型预测值的波动程度。它反映了模型对训练集随机波动的敏感性（即 Estimation Error）。

---

* **高偏差 (High Bias) $\rightarrow$ 欠拟合 (Underfitting)**：
  * 表现：模型太简单、太僵化（例如用一条直线去拟合复杂的正弦曲线）。
  * 特点：无论你怎么换训练集，它画出的线都差不多（方差极低），但它永远抓不住真实的数据趋势（偏差极大）。增加模型的偏差会降低方差，但同时会增加近似误差 。
  
* **高方差 (High Variance) $\rightarrow$ 过拟合 (Overfitting)**：
  * 表现：模型太复杂、太灵活（例如用 100 次多项式去穿过每一个数据点，把噪声也当成了规律）。
  * 特点：它能在当前训练集上做到 0 误差（偏差极低），但只要训练集稍微变动一点点，它画出的曲线就会发生剧烈扭曲（方差极大）。

---

**No Free Lunch Theorem**：没有任何一个单一的学习算法能够在所有可能的数据分布上都表现最优 。你必须根据具体的任务，引入特定的先验知识（Inductive Bias）。

---

**结构风险最小化 (Structural Risk Minimization, SRM)**：为了控制方差，SRM 在 ERM 的基础上引入了对模型复杂度的惩罚：

$$
\arg\min_{h \in \mathcal{H}} L_S(h) + \text{Penalty}(h)
$$

这里的 $\text{Penalty}(h)$ 与模型的 VC 维度高度相关。模型越复杂，惩罚越大。在实际应用中，这就演变成了我们熟知的 **正则化 (Regularization)**（如 L1/L2 惩罚项）。

---

**交叉验证 (Cross-Validation)**：在工程实践中，我们通过保留一部分数据作为验证集（Validation Set），来模拟测试环境，从而画出偏差-方差的 U 型曲线，找到那个让总测试误差降到最低的“甜点 (Sweet Spot)”。

---

### 线性回归模型和逻辑回归模型 (Linear & Logistic Regression)

---

线性回归假设输出 $y$ 是输入特征 $x$ 的线性组合，即 $y = w^T x + b$。

---

**损失函数：均方误差 (Mean Squared Error, MSE)**

如果假设观测值 $y$ 的误差服从高斯分布（正态分布），那么最大化观测数据的 **似然函数（Maximum Likelihood Estimation, MLE）**，在数学上完全等价于最小化均方误差。

目标函数（经验风险）：

$$
L(w) = \frac{1}{m} \sum_{i=1}^m (w^T x_i - y_i)^2
$$

向量化表示：令设计矩阵为 $X \in \mathbb{R}^{m \times d}$，标签向量为 $y \in \mathbb{R}^m$，则

$$L(w) = \frac{1}{m} ||Xw - y||^2_2
$$


---

**闭式解 (Closed-form Solution / 解析解)**

这是一个极其优良的凸二次规划问题。对 $w$ 求导并令梯度为零：

$$
\nabla_w L(w) = \frac{2}{m} X^T (Xw - y) = 0
$$

求解得到著名的正规方程 (Normal Equation)：

$$
w^* = (X^T X)^{-1} X^T y
$$

当特征维度 $d$ 大于样本数 $m$ 时，$X^T X$ 不可逆（奇异矩阵），这就必须引入正则化（如 L2 岭回归）来保证其可逆性并控制模型复杂度。

---

**逻辑回归 (Logistic Regression)**

**Sigmoid (Logistic) 函数**定义：$\sigma(z) = \frac{1}{1 + \exp(-z)}$

模型输出：预测样本属于正类 ($y=1$) 的概率为 $P(y=1|x) = \sigma(w^T x)$。

**损失函数：交叉熵 (Cross-Entropy / Log-Loss)**：基于极大似然估计，我们希望最大化所有样本产生真实标签的联合概率。取负对数后，就得到了交叉熵损失：

$$
L(w) = - \frac{1}{m} \sum_{i=1}^m \left[ y_i \log(\sigma(w^T x_i)) + (1-y_i) \log(1-\sigma(w^T x_i)) \right]
$$

它的梯度形式极其简洁优美：

$$
\nabla_w L(w) = \frac{1}{m} \sum_{i=1}^m (\sigma(w^T x_i) - y_i) x_i
$$

---

### 一致收敛与拉德马赫复杂度

---

如果对于任意 $\epsilon > 0$ 和 $\delta > 0$，当样本量 $m$ 足够大时，满足：

$$
\mathbb{P} \left[ \sup_{h \in \mathcal{H}} |L_S(h) - L_{\mathcal{D}}(h)| > \epsilon \right] \le \delta
$$

我们就称假设空间 $\mathcal{H}$ 满足 **一致收敛**。

**一致收敛 $\Longleftrightarrow$ 假设空间是不可知 PAC 可学习的。**

---

**拉德马赫复杂度**

引入一个随机变量序列 $\sigma = (\sigma_1, \dots, \sigma_m)$，其中每个 $\sigma_i$ 以 $50\%$ 的概率取 $+1$，以 $50\%$ 的概率取 $-1$。给定一个具体的样本集 $S = \{x_1, \dots, x_m\}$，空间 $\mathcal{H}$ 的**经验拉德马赫复杂度**定义为：

$$
\hat{\mathcal{R}}_S(\mathcal{H}) = \mathbb{E}_{\sigma} \left[ \sup_{h \in \mathcal{H}} \frac{1}{m} \sum_{i=1}^m \sigma_i h(x_i) \right]
$$

**真实拉德马赫复杂度**为对外层的样本集 $S$ 再求一次期望：

$$
\mathcal{R}_m(\mathcal{H}) = \mathbb{E}_{S \sim \mathcal{D}^m} [\hat{\mathcal{R}}_S(\mathcal{H})]
$$

---

对于任意 $h \in \mathcal{H}$，以至少 $1-\delta$ 的概率，以下不等式成立：

$$
L_{\mathcal{D}}(h) \le L_S(h) + 2\mathcal{R}_m(\mathcal{H}) + 3 \sqrt{\frac{\ln(2/\delta)}{2m}}
$$

---

假设我们的输入特征空间是 $\mathbb{R}^d$，且每个样本特征向量的 L2 范数都被常数 $B$ 限制（即不越界）：对于任意 $x_i \in S$，$||x_i||_2 \le B$。我们的假设空间 $\mathcal{H}$ 是所有 L2 权重范数不超过 $R$ 的线性模型：

$$
\mathcal{H} = \{x \mapsto w^T x \mid ||w||_2 \le R\}
$$

我们要计算的是给定样本集 $S = \{x_1, \dots, x_m\}$ 时，这个假设空间的经验拉德马赫复杂度 $\hat{\mathcal{R}}_S(\mathcal{H})$。把线性假设 $h(x) = w^T x$ 代入经验拉德马赫复杂度的标准公式：

$$
\hat{\mathcal{R}}_S(\mathcal{H}) = \mathbb{E}_{\sigma} \left[ \sup_{||w||_2 \le R} \frac{1}{m} \sum_{i=1}^m \sigma_i (w^T x_i) \right]= \frac{1}{m} \mathbb{E}_{\sigma} \left[ \sup_{||w||_2 \le R} w^T \left( \sum_{i=1}^m \sigma_i x_i \right) \right]
$$

由柯西

$$
\sup_{||w||_2 \le R} w^T \left( \sum_{i=1}^m \sigma_i x_i \right) = R \left\| \sum_{i=1}^m \sigma_i x_i \right\|_2
$$

故

$$
\hat{\mathcal{R}}_S(\mathcal{H}) = \frac{R}{m} \mathbb{E}_{\sigma} \left[ \left\| \sum_{i=1}^m \sigma_i x_i \right\|_2 \right]\le  \frac{R}{m} \sqrt{ \mathbb{E}_{\sigma} \left[ \left\| \sum_{i=1}^m \sigma_i x_i \right\|_2^2 \right] }
$$

最后一个不等式是 Jensen。

$$
\mathbb{E}_{\sigma} \left[ \left\| \sum_{i=1}^m \sigma_i x_i \right\|_2^2 \right] = \mathbb{E}_{\sigma} \left[ \sum_{i=1}^m \sum_{j=1}^m \sigma_i \sigma_j (x_i^T x_j) \right]= \sum_{i=1}^m \mathbb{E}[\sigma_i^2] (x_i^T x_i) = \sum_{i=1}^m ||x_i||_2^2\sum_{i=1}^m ||x_i||_2^2 \le m \cdot B^2
$$

代回得到：

$$
\hat{\mathcal{R}}_S(\mathcal{H}) \le \frac{R}{m} \sqrt{m B^2} = \frac{R \cdot B \cdot \sqrt{m}}{m} = \frac{R \cdot B}{\sqrt{m}}
$$

---

$$
\begin{aligned}
  &\hat{\mathcal{R}}_S(\text{conv}(\mathcal{H})) = \hat{\mathcal{R}}_S(\mathcal{H})\text{（凸包不变性）}\\
  &\hat{\mathcal{R}}_S(\mathcal{H} + \{h_0\}) = \hat{\mathcal{R}}_S(\mathcal{H})\text{（平移不变性）}\\
  &\hat{\mathcal{R}}_S(\phi \circ \mathcal{H}) \le \rho \cdot \hat{\mathcal{R}}_S(\mathcal{H}), \text{where } \phi \text{ is } \rho\text{-Lipschitz function}\\
  &\hat{\mathcal{R}}_S(A=\{a_i\in \mathbb{R}^m \mid ||a_i||_2 \le R\})= \frac{1}{m} \mathbb{E}_\sigma \left[ \sup_{a \in A} \sum_{i=1}^m \sigma_i a_i \right] \le \frac{R\sqrt{2 \ln |A|}}{m}\\
  &\hat{\mathcal{R}}_S(\mathcal{H}_{L_1}=\{x \mapsto w^T x \mid ||w||_1 \le R,||x||_\infty \le B\}) \le RB \sqrt{\frac{2 \ln(2d)}{m}}\\
  &\hat{\mathcal{R}}_S(\mathcal{H}_{L_2} = \{x \mapsto w^T x \mid ||w||_2 \le R,||x||_2 \le B\}) \le \frac{R  B}{\sqrt{m}}\\
  &\hat{\mathcal{R}}_S( \mathcal{H} \subseteq \{\pm 1\}^{\mathcal{X}}, VCdim\mathcal{H}=d) \le \sqrt{\frac{2d \ln\left(\frac{em}{d}\right)}{m}}
\end{aligned}
$$

---

### 支持向量机模型与核方法 (SVM & Kernel Methods)

---

**硬间隔 SVM (Hard Margin)**：

纯粹的几何与不等式对于线性可分的数据集，存在无数个超平面 $w^T x + b = 0$ 可以将正负类分开。

SVM 的核心目标是：**最优的超平面应该使得离它最近的样本点（支持向量）之间的“间隔 (Margin)”最大化**。

样本点到超平面的几何距离为 $\frac{|w^T x + b|}{||w||}$。通过缩放 $w$ 和 $b$，我们可以强制令离超平面最近的样本点满足 $|w^T x + b| = 1$。此时，正负类支持向量之间的总间隔为 $\frac{2}{||w||}$。

最大化间隔 $\frac{2}{||w||}$，等价于最小化 $\frac{1}{2}||w||^2$。这是一个经典的带线性不等式约束的凸二次优化问题：

$$
\min_{w,b} \frac{1}{2}||w||^2
$$

$$
\text{s.t.} \quad y_i(w^T x_i + b) \ge 1, \quad i = 1, \dots, m
$$

---

**软间隔 (Soft Margin) 与 Hinge Loss**

现实数据通常存在噪声，不可能完美线性可分。如果强行用硬间隔，会导致优化无解，或者为了迁就几个异常点而使得间隔极窄（高方差、过拟合）。

* **松弛变量 (Slack Variables, $\xi_i$)**：允许样本点突破间隔边界，甚至被分错类别，但要付出代价 $\xi_i \ge 0$。
  
$$
\min_{w,b,\xi} \frac{1}{2}||w||^2 + C \sum_{i=1}^m \xi_i
$$

$$
\text{s.t.} \quad y_i(w^T x_i + b) \ge 1 - \xi_i, \quad \xi_i \ge 0
$$

超参数 $C$ 控制着偏差与方差的权衡。$C$ 越大，对分错的容忍度越低（逼近硬间隔，容易过拟合）；$C$ 越小，间隔越宽（容易欠拟合）。

* **等价的无约束形式 (Hinge Loss)**：将约束条件代入目标函数，SVM 其实等价于带有 L2 正则化的经验风险最小化，其损失函数被称为 **合页损失 (Hinge Loss)**：

$$
\min_{w,b} \frac{1}{2}||w||^2 + C \sum_{i=1}^m \max(0, 1 - y_i(w^T x_i + b))
$$

---

**拉格朗日对偶与 KKT 条件**

为了处理不等式约束并引入核技巧，我们需要将原问题转化为**对偶问题 (Dual Problem)**。

构造拉格朗日函数：引入非负乘子 $\alpha_i \ge 0$：

$$
\mathcal{L}(w, b, \alpha) = \frac{1}{2}||w||^2 - \sum_{i=1}^m \alpha_i [y_i(w^T x_i + b) - 1]
$$

**强对偶性 (Strong Duality)**：由于原问题是凸二次规划且满足 Slater 条件，原问题的极小极大等价于对偶问题的极大极小（即 $\min_{w,b} \max_{\alpha} \mathcal{L} = \max_{\alpha} \min_{w,b} \mathcal{L}$）。

**求导与代换**：令 $\mathcal{L}$ 对 $w$ 和 $b$ 的偏导为零，得到：

$$
w = \sum_{i=1}^m \alpha_i y_i x_i, \quad \sum_{i=1}^m \alpha_i y_i = 0
$$

**KKT 互补松弛条件 (Complementary Slackness)**：最优解必须满足 $\alpha_i [y_i(w^T x_i + b) - 1] = 0$。

---

**核技巧 (The Kernel Trick)**

如果数据在原始空间完全非线性，我们可以通过一个映射函数 $\phi(x)$ 将其映射到极高维甚至无限维的特征空间，使其变得线性可分。

观察将 $w$ 代回后的对偶问题目标函数，你会发现，所有的样本 $x$ 都是以 内积 $\langle x_i, x_j \rangle$ 的形式出现的。

如果我们能找到一个 **核函数 $K(x_i, x_j) = \langle \phi(x_i), \phi(x_j) \rangle$**，我们就可以在原空间中直接计算出高维空间的内积。

**Mercer 定理**：判断一个函数能否作为核函数的充要条件是：对于任意有限个样本点，其构成的核矩阵 (Gram Matrix) 是**对称半正定的**。

常用核函数：
* **多项式核 (Polynomial)**：$K(x, z) = (\gamma \langle x, z \rangle + r)^d$

* **高斯径向基核 (RBF/Gaussian)**：$K(x, z) = \exp(-\gamma ||x - z||^2)$ 

---

### 表示定理

---

我们的目标是最小化带有 L2 正则化的经验风险：

$$
\min_{w} J(w) = \frac{1}{m} \sum_{i=1}^m L(w^T \phi(x_i), y_i) + \lambda ||w||^2
$$

**表示定理**指出，无论这个高维空间有多少维，上述优化问题的全局最优解 $w^*$，永远可以表示为训练样本特征向量的线性组合：$$w^* = \sum_{i=1}^m \alpha_i \phi(x_i)$$

---

有了表示定理，我们就可以把一个原本无法求解的无限维问题，转化为求解 $m$ 个未知数 $\alpha = [\alpha_1, \dots, \alpha_m]^T$ 的问题。最经典的例子就是**核岭回归 (Kernel Ridge Regression, KRR)**：

$$
\min_{w} \frac{1}{m} ||\Phi w - Y||^2 + \lambda ||w||^2
$$

令 $w = \Phi^T \alpha$，其中 $\Phi$ 是特征矩阵。此时预测值为 $\Phi w = \Phi \Phi^T \alpha$。定义核矩阵 $K = \Phi \Phi^T$，其元素 $K_{ij} = \phi(x_i)^T \phi(x_j) = k(x_i, x_j)$。

$$
||w||^2 = w^T w = (\Phi^T \alpha)^T (\Phi^T \alpha) = \alpha^T \Phi \Phi^T \alpha = \alpha^T K \alpha
$$

代回目标函数：

$$
\min_{\alpha} \frac{1}{m} ||K\alpha - Y||^2 + \lambda \alpha^T K \alpha
$$

对 $\alpha$ 求导并令为零得：

$$
\alpha^* = (K + \lambda m I)^{-1} Y
$$

---

### 神经网络理论与泛化谜题

---

**万能逼近定理** ：对于任意一个定义在紧致集（比如闭区间 $[-1, 1]^n$）上的连续函数 $f(x)$，以及任意一个误差容忍度 $\epsilon > 0$，只要隐藏层的神经元数量足够多，哪怕只有一个隐藏层，使用任何非多项式的激活函数（如 Sigmoid、ReLU），都存在一个神经网络 $N(x)$，使得对所有的 $x$，都有：

$$
|f(x) - N(x)| \le \epsilon
$$

---

既然一层隐藏层就能逼近所有函数，我们为什么还需要“深度学习 (Deep Learning)”？事实上万能逼近定理虽然保证了浅层网络的能力，但它往往需要指数级爆炸的神经元数量。深度网络通过层级结构，能够以更少的参数实现同样的函数逼近能力，从而更高效地学习复杂的模式。

---

模型的参数量 $W$ 越大，VC 维就越大（通常 $\text{VCdim} = \mathcal{O}(W \log W)$）。在现代深度学习中，模型通常处于过度参数化体制 (Over-parameterized Regime)，即参数量远远大于训练样本量（$W \gg m$）。
按照 VC 维和结构风险最小化 (SRM) 的观点，这种模型应该具有极高的方差，在训练集上死记硬背（经验风险为 0），在测试集上表现极差（严重过拟合）。但实际情况却是，深度神经网络在过度参数化的情况下，反而表现得更好，这就是所谓的 **深度学习的泛化谜题 (Generalization Puzzle)**。

---

**解释一：双重下降现象 (Double Descent)**：研究发现，随着模型参数量的增加，测试误差呈现出一个“U 型”后接着“下降”的奇特曲线：欠参数化区域：参数较少时，符合传统的偏差-方差权衡，误差先降后升，在 $W \approx m$（参数量刚够死记硬背训练集，即插值阈值）时达到顶峰。过度参数化区域：当参数量越过阈值继续增加（$W \gg m$），测试误差竟然再次开始下降！因为极其庞大的参数空间给了模型足够的自由度去寻找不仅能穿过所有训练点，而且极其平滑的函数曲线。

---

**解释二：SGD 的隐式正则化 (Implicit Regularization of SGD)**：
我们并没有在损失函数里手动加上 L2 正则化，但随机梯度下降（SGD）算法本身自带一种“寻优偏好”。
在过度参数化的空间里，经验损失为 0 的全局最优点有无数个。SGD 由于其自带的随机噪声，往往倾向于收敛到那些**“平坦的极小值 (Flat Minima)”**。在平坦区域，即使测试数据有轻微扰动，损失也不会剧烈增加，从而保证了强大的泛化能力。

---

### AdaBoost

---

给定 $m$ 个训练样本 $(x_i, y_i)$，其中 $y_i \in \{-1, +1\}$。

AdaBoost 在第 $t$ 轮维护一个样本权重分布 $D_t(i)$，初始时 $D_1(i) = 1/m$。

**弱分类器错误率**：$\epsilon_t = \sum_{i: h_t(x_i) \neq y_i} D_t(i)$。我们假设它比瞎猜好一点点，令 $\epsilon_t = \frac{1}{2} - \gamma_t$（$\gamma_t > 0$ 称为**优势 edge）**。

**权重系数**：$\alpha_t = \frac{1}{2} \ln \frac{1-\epsilon_t}{\epsilon_t}$。

**分布更新公式**：$D_{t+1}(i) = \frac{D_t(i) \exp(-\alpha_t y_i h_t(x_i))}{Z_t}$，其中 $Z_t$ 是归一化因子（确保 $D_{t+1}$ 依然是个概率分布）。

**最终分类器**：$f(x) = \sum_{t=1}^T \alpha_t h_t(x)$，预测输出为 $\text{sign}(f(x))$。

---

我们把 $D_{t+1}(i)$ 从第 1 轮一直展开到第 $T$ 轮：

$$
D_{T+1}(i) = \frac{D_T(i) \exp(-\alpha_T y_i h_T(x_i))}{Z_T} = \dots = \frac{D_1(i) \exp\left(-y_i \sum_{t=1}^T \alpha_t h_t(x_i)\right)}{\prod_{t=1}^T Z_t}
$$

因为初始权重 $D_1(i) = 1/m$，且指数里的求和正是最终分类器 $f(x_i)$：

$$
D_{T+1}(i) = \frac{1}{m} \frac{\exp(-y_i f(x_i))}{\prod_{t=1}^T Z_t}
$$

考虑最终分类器的经验误差（即分错的样本比例）：

$$
\hat{R}_S = \frac{1}{m} \sum_{i=1}^m \mathbb{I}(\text{sign}(f(x_i)) \neq y_i)
$$

注意到

$$
\mathbb{I}(\text{sign}(f(x_i)) \neq y_i) \le \exp(-y_i f(x_i))
$$

代入得

$$
\hat{R}_S \le \frac{1}{m} \sum_{i=1}^m \exp(-y_i f(x_i))=\sum_{i=1}^m \left( D_{T+1}(i) \prod_{t=1}^T Z_t \right) =\prod_{t=1}^T Z_t
$$

$$
\begin{aligned}
  Z_t &= \sum_{i=1}^m D_t(i) \exp(-\alpha_t y_i h_t(x_i))\\
  &= \exp(-\alpha_t) \sum_{\text{correct}} D_t(i) + \exp(\alpha_t) \sum_{\text{incorrect}} D_t(i)\\
  &= (1-\epsilon_t)e^{-\alpha_t} + \epsilon_te^{\alpha_t}\\
  &= (1-\epsilon_t)\sqrt{\frac{\epsilon_t}{1-\epsilon_t}} + \epsilon_t\sqrt{\frac{1-\epsilon_t}{\epsilon_t}}= 2\sqrt{\epsilon_t(1-\epsilon_t)}\\
  &= 2\sqrt{\left(\frac{1}{2} - \gamma_t\right)\left(\frac{1}{2} + \gamma_t\right)} = \sqrt{1 - 4\gamma_t^2}\\
  &\le (e^{-4\gamma_t^2})^{1/2} = \exp(-2\gamma_t^2)\\
\end{aligned}
$$

代回原式并设 $0 < \gamma = \min_{t} \gamma_t$，得到：

$$
\hat{R}_S \le \prod_{t=1}^T \exp(-2\gamma_t^2) = \exp\left( -2\sum_{t=1}^T \gamma_t^2 \right)\le \exp(-2\gamma^2 T)
$$

---

将经验误差放宽为 **“经验间隔误差 (Empirical Margin Error)”**：

$$
\hat{R}_{S, \rho}(f) = \frac{1}{m} \sum_{i=1}^m \mathbb{I}(y_i f(x_i) \le \rho)
$$

我们有定理：

$$
R(f) \le \hat{R}_{S, \rho}(f) + \frac{2}{\rho} \hat{\mathcal{R}}_S(\mathcal{H}) + 3 \sqrt{\frac{\ln(2/\delta)}{2m}}
$$

**VC 维失效的原因**：传统的理论把 AdaBoost 看作一个巨大的多项式组合，导致第二项的复杂度随 $T$ 爆炸。但在这个公式里，集成模型的复杂度被完美降维成了“基分类器（如单层决策树）的复杂度”，它是一个极小的常数，完全不随 $T$ 的增加而增长！

**结论**：AdaBoost 在训练误差为 0 之后继续迭代，本质上是在做 $L_1$ 空间下的 Margin Maximization（间隔最大化）（类似于 SVM 在做 $L_2$ 空间的间隔最大化）。它通过拉大 $\rho$ 压低了泛化界限。

---

### 在线学习与感知机错误界

---

在线学习的设定是：数据流一个接一个地到来 $(x_1, y_1), (x_2, y_2), \dots$，其中 $y_t \in \{-1, +1\}$。

**算法规则 (Perceptron)**：初始权重 $w_0 = \mathbf{0}$。

当新样本 $x_t$ 到来时，如果预测错误，即 $y_t(w_{t-1} \cdot x_t) \le 0$，就进行更新：

$$
w_t = w_{t-1} + y_t x_t
$$

如果预测正确，权重不变（$w_t = w_{t-1}$）。

我们假设所有的输入特征都在一个有限大小的球体内：$||x_t|| \le R$。且存在一个完美的“上帝权重” $w^*$（为方便，设其范数 $||w^*|| = 1$），它能以至少 $\rho > 0$ 的物理间隔完美分开所有数据：

$$
y_t(w^* \cdot x_t) \ge \rho, \quad \forall t
$$

我们来证明无论数据流有多长，感知机算法总共犯错的次数 $M$，绝对不会超过 $(R/\rho)^2$。

---

假设在第 $t$ 步发生了错误：

$$
w_t \cdot w^* = (w_{t-1} + y_t x_t) \cdot w^* = w_{t-1} \cdot w^* + y_t(x_t \cdot w^*)
$$

$y_t(x_t \cdot w^*) \ge \rho$。代入上式：

$$
w_t \cdot w^* \ge w_{t-1} \cdot w^* + \rho
$$

如果在整个数据流中，感知机总共犯了 $M$ 次错，把这 $M$ 次错误累加起来（初始 $w_0 = 0$）：

$$
w_M \cdot w^* \ge M\rho
$$

考虑 $w_t$ 的范数平方：

$$
||w_t||^2 = ||w_{t-1} + y_t x_t||^2 = ||w_{t-1}||^2 + 2y_t(w_{t-1} \cdot x_t) + ||y_t x_t||^2
$$

交叉项 $2y_t(w_{t-1} \cdot x_t) \le 0$：

$$
||w_t||^2 \le ||w_{t-1}||^2 + ||x_t||^2\le ||w_{t-1}||^2 + R^2\le M R^2 \implies ||w_M|| \le \sqrt{M} R
$$

由柯西：

$$
w_M \cdot w^* \le ||w_M|| \cdot ||w^*|| = \sqrt{M} R \cdot 1 = \sqrt{M} R
$$

于是我们有

$$
M \le \frac{R^2}{\rho^2}
$$






---

## 真题

---

**(Spring, 2025, A1)** Let $\mathcal{H}$ be a class of binary classifiers over a domain $\mathcal{X}$. Let $\mathcal{D}$ be an unknown distribution over $\mathcal{X}$, and let $f$ be the target hypothesis in $\mathcal{H}$. Fix some $h \in \mathcal{H}$. Show that the variance of the empirical loss $L_S(h)$, over all possible samples $S$ of size $m$ drawn from $\mathcal{D}$, is inversely proportional to $m$ .
That is, show the following relationship:

$$
Var_{S|x \sim \mathcal{D}^m}[L_S(h)] \propto \frac{1}{m}
$$

More specifically, prove the exact expression:

$$
Var_{S|x \sim \mathcal{D}^m}[L_S(h)] = \frac{L_{\mathcal{D},f}(h) \cdot (1 - L_{\mathcal{D},f}(h))}{m}
$$

---

**解答**：设 $Z_i = \mathbb{I}[h(x_i) \neq f(x_i)]$，则 $L_S(h) = \frac{1}{m} \sum_{i=1}^m Z_i$。由于 $Z_i$ 是独立同分布的二项随机变量，且 $P(Z_i = 1) = L_{\mathcal{D},f}(h)$，我们有：

$$
Var[Z_i] = L_{\mathcal{D},f}(h) \cdot (1 - L_{\mathcal{D},f}(h))
$$

因此，

$$
Var[L_S(h)] = Var\left[\frac{1}{m} \sum_{i=1}^m Z_i\right] = \frac{1}{m^2} \sum_{i=1}^m Var[Z_i] = \frac{L_{\mathcal{D},f}(h) \cdot (1 - L_{\mathcal{D},f}(h))}{m}
$$

---

**(Spring, 2025, A2)** Let $\mathcal{X}$ be a domain, and let $\mathcal{D}_1, \mathcal{D}_2, \dots, \mathcal{D}_m$ be a sequence of distributions over $\mathcal{X}$. Let $\mathcal{H}$ be a finite class of binary classifiers over $\mathcal{X}$, and let $f \in \mathcal{H}$. Suppose we obtain a sample $S = \{(x_1, y_1), \dots, (x_m, y_m)\}$, where the $i$-th instance $x_i$ is sampled from $\mathcal{D}_i$ and $y_i = f(x_i)$.
Let $\overline{\mathcal{D}}_m$ denote the average as:

$$
\overline{\mathcal{D}}_m = \frac{\mathcal{D}_1 + \dots + \mathcal{D}_m}{m}
$$

Fix an accuracy parameter $\epsilon = \frac{1}{4}$. Show that

$$
\mathbb{P}[\exists h \in \mathcal{H}: L_{(\overline{\mathcal{D}}_m, f)}(h) > \epsilon \text{ and } L_{(S,f)}(h) = 0] \le |\mathcal{H}| e^{\frac{-m}{4}}
$$

Hint: $\ln(\frac{3}{4}) < -\frac{1}{4}$ 

---

**解答**：设 $p_i=\mathbb{P}_{x \sim \mathcal{D}_i}[h(x) \neq f(x)]$，则 $L_{(\overline{\mathcal{D}}_m, f)}(h) = \frac{1}{m} \sum_{i=1}^m p_i>\epsilon$。

而 $\mathbb{P}_{S|x \sim \mathcal{D}^m}[L_{(S,f)}(h) = 0] = \prod_{i=1}^m (1-p_i) \le (1-\epsilon)^m=e^{m \ln(1-\epsilon)} \le e^{\frac{-m}{4}}$。

---

**(Spring, 2025, A3)** Let $\mathcal{H}$ and $\mathcal{H}'$ be two families of functions mapping from $\mathcal{X}$ to $\{0,1\}$ with finite VC dimensions.

(a) [5 pts.] Show that

$$
VCdim(\mathcal{H} \cup \mathcal{H}') \le VCdim(\mathcal{H}) + VCdim(\mathcal{H}') + 1
$$

(b) [4 pts.] Use this to determine the VC dimension of the hypothesis set formed by the union of axis-aligned rectangles and triangles in dimension 2. You may use the fact that the VC dimension of the hypothesis set formed by the union of triangles in dimension 2 is 7, without any proof.

---

**解答**：$(a)$：

$$
2^m=\tau_{\mathcal{H} \cup \mathcal{H}'}(m) \le \tau_{\mathcal{H}}(m) + \tau_{\mathcal{H}'}(m) \le \sum_{i=0}^d \binom{m}{i} + \sum_{i=0}^{d'} \binom{m}{i} 
$$

若 $m > d + d' + 1$，则

$$
\sum_{i=0}^d \binom{m}{i} + \sum_{i=0}^{d'} \binom{m}{i} = \sum_{i=0}^d \binom{m}{i} + \sum_{i=m-d'}^m \binom{m}{i} < 2^m
$$

矛盾！

$(b)$：$4+7+1=12$

---

**常见假设空间的 VC 维**

* **简单一维空间 ($\mathbb{R}^1$)**：**射线**：$h(x) = \mathbb{I}[x \ge a]$ 或 $\mathbb{I}[x \le a]$ VC 维 = 1。**闭区间 (Intervals)**：$h(x) = \mathbb{I}[x \in [a, b]]$ VC 维 = 2。**带符号的区间 (Signed Intervals)** VC 维 = 3。
  
* **二维与高维几何空间 ($\mathbb{R}^d$)**：**半空间 (Halfspaces)**：$h(x) = \text{sign}(w^T x + b)$ VC 维 = $d + 1$ 。**轴对齐矩形 (Axis-aligned Rectangles)**：$d$ 维空间 ($\mathbb{R}^d$) VC 维 = $2d$。**同心圆 (Concentric Circles)**：$h_r(x) = \mathbb{1}_{\{||x|| \le r\}}$。VC 维 = 1。**凸多边形 (Convex Polygons)**：具有 $k$ 个顶点的凸多边形。VC 维 = $2k + 1$。
  
* **正弦波分类器 (Sine Waves)**：$h(x) = \text{sign}(\sin(\omega x))$，其中 $\omega$ 是唯一的参数。VC 维 = $\infty$。
  
---

**(Spring, 2025, A4)** Prove the following two statements: 

(a) [5 pts.] Let $\mathcal{D}$ be a distribution. Let $S = (z_1, \dots, z_m)$ be an i.i.d. sequence of examples. Let $A$ be a learning algorithm that is on-average replace-one stable with rate $\epsilon(m)$. Then:

$$
\mathbb{E}_{S \sim \mathcal{D}^m}[L_{\mathcal{D}}(A(S)) - L_S(A(S))] \le \epsilon(m)
$$

(b) [5 pts.] Let $L$ be a convex $\rho$-Lipschitz loss function. The regularised Empirical Risk Minimisation (ERM) satisfies:

$$
\mathbb{E}_S[L_{\mathcal{D}}(A(S))] \le L_{\mathcal{D}}(w^*) + \lambda||w^*||^2 + \frac{2\rho^2}{\lambda m}
$$

where $w^* = \arg\min_{w \in \mathcal{H}} L_{\mathcal{D}}(w)$.

---


**解答**：$(a)$：设 $S^{(i)}$ 是将 $S$ 中的第 $i$ 个样本替换为一个独立同分布的样本 $z_i'$ 后得到的样本集。则：

$$
\mathbb{E}_{S,z'_i,z}[l(A(S), z) - l(A(S^{(i)}), z)] \le \epsilon(m)
$$

如果我们引入一个全新的测试样本 $z'$，真实风险的期望可以写成：

$$
\mathbb{E}_S[L_{\mathcal{D}}(A(S))] = \mathbb{E}_{S, z'}[\ell(A(S), z')]
$$

如果 我们将 $z'$ 替换为 $z_i$，经验风险的期望可以写成：

$$
\mathbb{E}_{S, z'}[\ell(A(S), z')] = \mathbb{E}_{S, z'_i}[\ell(A(S^{(i)}), z_i)]
$$

经验风险是训练集上的平均误差：

$$
\mathbb{E}_S[L_S(A(S))] = \mathbb{E}_S \left[ \frac{1}{m} \sum_{i=1}^m \ell(A(S), z_i) \right]= \frac{1}{m} \sum_{i=1}^m \mathbb{E}_{S}[\ell(A(S^{(i)}), z_i)]
$$

将真实风险的期望也写成 $m$ 项取平均的形式（因为每项期望都相等）：

$$
\mathbb{E}[L_{\mathcal{D}} - L_S] = \frac{1}{m} \sum_{i=1}^m \mathbb{E}_{S, z'_i} \left[ \ell(A(S^{(i)}), z_i) - \ell(A(S), z_i) \right]
$$

代回稳定性定义即得。

$(b)$：ERM 定义的算法 $A(S)$ 实际上是在最小化以下目标函数：

$$
F_S(w) = L_S(w) + \lambda||w||^2
$$

我们有

$$
L_S(A(S))\le F_S(A(S)) \le F_S(w^*) = L_S(w^*) + \lambda||w^*||^2
$$

取期望有

$$
\mathbb{E}_S[L_S(A(S))] \le \mathbb{E}_S[L_S(w^*)] + \lambda||w^*||^2= L_{\mathcal{D}}(w^*) + \lambda||w^*||^2
$$

带回 $(a)$ 的结果：

$$
\mathbb{E}_S[L_{\mathcal{D}}(A(S))] \le L_{\mathcal{D}}(w^*) + \lambda||w^*||^2 + \epsilon(m)
$$

现在只需证明 $\epsilon(m) \le \frac{2\rho^2}{\lambda m}$ 即可。设 $u = A(S)$，$v = A(S^{(i)})$。

因为 $F_S$ 是 $\lambda$-强凸的，根据强凸性一阶条件：

$$
\begin{aligned}
     \lambda ||u - v||^2&\le \langle \nabla F_S(u) - \nabla F_S(v), u - v \rangle\\
     &=\langle 0 - \nabla F_S(v), u - v \rangle \\
     &= \langle \nabla F_{S^{(i)}}(v) - \nabla F_S(v), u - v \rangle\\
     &= \frac{1}{m} \langle \nabla \ell(v, z'_i) - \nabla \ell(v, z_i), u - v \rangle\\
     &\le \frac{1}{m} ||\nabla \ell(v, z'_i) - \nabla \ell(v, z_i)|| \cdot ||u - v||\\
     &\le \frac{1}{m}(\rho + \rho) ||u - v|| = \frac{2\rho}{m} ||u - v||
\end{aligned}
$$

两边约去即得。

---

**(Autumn, 2025, A9)** Let $\mathcal{H}$ be the class of signed intervals, that is,

$$
\mathcal{H} = \{h_{a,b,s}: a \le b, s \in \{-1, 1\}\}
$$

where

$$
h_{a,b,s}(x) = \begin{cases} s & \text{if } x \in [a, b] \\ -s & \text{if } x \notin [a, b] \end{cases}
$$

Calculate $VCdim(\mathcal{H})$.

---

**解答**：考虑依次四个点分别取 $1,-1,1,-1$，则不能被 $\mathcal{H}$ 完全打乱。三个点可以被 $\mathcal{H}$ 完全打乱。故 $VCdim(\mathcal{H})=3$。

---

如果函数 $f(x)$ 是 **$L$-smoothness** 的，意味着它的梯度是 $L$-Lipschitz 连续的。对于定义域内的任意 $x, y$，满足：$$||\nabla f(x) - \nabla f(y)|| \le L ||x - y||$$等价的二阶泰勒展开上限形式：

$$
f(y) \le f(x) + \langle \nabla f(x), y-x \rangle + \frac{L}{2}||y-x||^2
$$

还有一个等价条件是 $\frac{L}{2}||x||^2 - f(x)$ 是凸函数

---

如果函数 $f(x)$ 是 **$\mu$-strong convexity** 的，说明它不仅是一个凸函数，而且至少和一个二次函数一样“凸”。对于任意 $x, y$，满足：$$f(y) \ge f(x) + \langle \nabla f(x), y-x \rangle + \frac{\mu}{2}||y-x||^2$$或者用梯度的单调性表示：$$\langle \nabla f(x) - \nabla f(y), x - y \rangle \ge \mu ||x - y||^2$$

---

**(Autumn, 2025, A10)** Strong Convexity Properties. Show the following holds.
Let $f: \mathbb{R}^d \rightarrow \mathbb{R}$. Then: 

(a) The function $f(w) = \lambda||w||^2$ is $2\lambda$-strongly convex.

(b) If $f$ is $\lambda$-strongly convex and $g$ is convex, then $f+g$ is $\lambda$-strongly convex.

(c) If $f$ is $\lambda$-strongly convex and $u$ is a minimiser of $f$, then for any $w$,

$$
f(w) - f(u) \ge \frac{\lambda}{2}||w-u||^2
$$

---


**解答**：$(a)$：我们需要证明对于任意 $x,y$，满足：

$$
f(y)\ge f(x) + \langle \nabla f(x), y-x \rangle + \frac{2\lambda}{2}||y-x||^2
$$

这等价于

$$
\lambda||y||^2 \ge \lambda||x||^2 + 2\lambda \langle x, y-x \rangle + \lambda ||y-x||^2
$$

代入 $y=x+(y-x)$ 展开即得。

$(b)$：由于 $f$ 是 $\lambda$-强凸的，满足：

$$
f(y) \ge f(x) + \langle \nabla f(x), y-x \rangle + \frac{\lambda}{2}||y-x||^2
$$

由于 $g$ 是凸的，满足：

$$
g(y) \ge g(x) + \langle \nabla g(x), y-x \rangle
$$

相加即得。

$(c)$：由于 $u$ 是 $f$ 的最小值点，满足 $\nabla f(u) = 0$。代入即得。

---

**(Autumn, 2025, A11)** Let $\mathcal{X} = \mathbb{R}^2$, $\mathcal{Y} = \{0, 1\}$, and let $\mathcal{H}$ be the class of concentric circles in the plane, that is,

$$
\mathcal{H} = \{h_r: r \in \mathbb{R}_+\}
$$

where $h_r(x) = \mathbb{1}_{\{||x|| \le r\}}$ 
Prove that $\mathcal{H}$ is PAC learnable (assume realisability), and its sample complexity is bounded by

$$
m_{\mathcal{H}}(\epsilon, \delta) \le \frac{\log(1/\delta)}{\epsilon}
$$

---

**解答**：我们只需取离原点最近的正样本点 $x_{min}$，令 $r = ||x_{min}||$ 即可。此时对于真实的圆 $r^*$，模型的真实误差 $L_{\mathcal{D}}(h_{\hat{r}})$ 就等于这个圆环区域在真实分布 $\mathcal{D}$ 下的概率。

对 $m$ 个独立的点，全不落在该圆环内的概率为 $(1-\epsilon)^m\le e^{-\epsilon m}$。

因此为满足 $\mathbb{P}[L_{\mathcal{D}}(h_{\hat{r}}) > \epsilon] \le \delta$，我们需要 $e^{-\epsilon m} \le \delta$，即 $m \ge \frac{\log(1/\delta)}{\epsilon}$。

---

**(Autumn, 2025, A12)** We initialise $w_1 \in \mathcal{W}$. At round $t = 1, 2, \dots,$ we obtain a random estimate $\hat{g}_t$ of a subgradient $g_t \in \partial F(w_t)$ so that $\mathbb{E}[\hat{g}_t] = g_t$, and update the iterate $w_t$ as follows:

$$
w_{t+1} = \Pi_{\mathcal{W}}(w_t - \eta_t \hat{g}_t)
$$

where $\eta_t$ is a suitably chosen step-size parameter, and $\Pi_{\mathcal{W}}$ denotes projection on $\mathcal{W}$. Assume $F$ is $\lambda$-strongly convex, and that

$$
\mathbb{E}[||\hat{g}_t||^2] \le G^2
$$

for all $t$. Consider Stochastic Gradient Descent with step sizes $\eta_t = \frac{1}{\lambda t}$.
Show that for any $w \in \mathcal{W}$, the following inequality holds:

$$
\mathbb{E}[||w_{t+1} - w||^2] \le \mathbb{E}[||w_t - w||^2] - 2\eta_t \mathbb{E}[\langle g_t, w_t - w \rangle] + \eta_t^2 G^2
$$

---

**解答**：根据投影的非扩张性，我们有：

$$
\begin{aligned}
    \mathbb{E}[||w_{t+1} - w||^2] &= \mathbb{E}[||\Pi_{\mathcal{W}}(w_t - \eta_t \hat{g}_t) - \Pi_{\mathcal{W}}(w)||^2] \\
    &\le \mathbb{E}[||w_t - \eta_t \hat{g}_t - w||^2] \\
    &= \mathbb{E}[||w_t - w||^2] - 2\eta_t \mathbb{E}[\langle \hat{g}_t, w_t - w \rangle] + \eta_t^2 \mathbb{E}[||\hat{g}_t||^2] \\
    &\le \mathbb{E}[||w_t - w||^2] - 2\eta_t \mathbb{E}[\langle g_t, w_t - w \rangle] + \eta_t^2 G^2
\end{aligned}
$$

---

**(Autumn, 2025, A13)** Neural Networks are universal approximators: Let $f: [-1, 1]^n \rightarrow [-1, 1]$ be a $\rho$-Lipschitz function.
Fix some $\epsilon > 0$. Construct a neural network $N: [-1, 1]^n \rightarrow [-1, 1]$ with the sigmoid activation function, such that for every $x \in [-1, 1]^n$ it holds that

$$
|f(x) - N(x)|\le \epsilon
$$

Hint: Partition $[-1, 1]^n$ into small boxes. Use the Lipschitzness of $f$ to show that it is approximately constant at each box. Finally, show that a neural network can first decide which box the input vector belongs to, and then predict the averaged value of $f$ at that box.

---

**解答**：将 $[-1, 1]^n$ 均匀划分成 $M^n$ 个小立方体，这里 $M> \frac{2\rho \sqrt{n}}{\epsilon}$。此时每个小立方体中函数值之差不超过 $\epsilon$，取 $c_k$ 为该立方体中函数的平均值。

Sigmoid 函数 $\sigma(z) = \frac{1}{1 + e^{-z}}$。对大 $K$ 考虑 $\sigma(Kz)$，它就会变成阶跃函数。

对于一维区间 $[a, b]$，我们可以用两个并排的神经元来构造它的指示函数：

$$
I_{[a,b]}(x_i) \approx \sigma(K(x_i - a)) - \sigma(K(x_i - b))
$$

当 $x_i$ 落在 $[a, b]$ 内时，前一项约为 1，后一项约为 0，差值为 1。落在外面则差值为 0。

对于高维的小立方体 $B_k$，构造

$$
I_{B_k}(x) \approx \sigma\left( K' \left( \sum_{i=1}^n I_{[a_i, b_i]}(x_i) - (n - 0.5) \right) \right)
$$

只有当 $x$ 的每个坐标都落在对应的区间 $[a_i, b_i]$ 内时，内部的和才会达到 $n$，使得 $\sigma$ 的输入大于 0.5，输出约为 1。否则至少有一个坐标不满足，和最多为 $n-1$，使得 $\sigma$ 的输入小于 0.5，输出约为 0。

最后取 $N=\sum_{k=1}^{M^n} c_k I_{B_k}(x)$ 即可。