---
title: Deep Learning Crash Course
date: 2026-02-21
hide:
  - navigation
categories:
  - 应用数学
  - AI 博资考
tags:
  - ai-exam
  - applied-math
  - deep-learning-crash-course
---
## 深度学习速通

---

### Transformer 与注意力机制

---

Transformer 的本质是摒弃了 RNN 的时序递归，用极其暴力的全局矩阵乘法来实现特征交互。
假设输入序列为 $X \in \mathbb{R}^{n \times d}$（$n$ 是序列长度，$d$ 是词向量维度）。首先，输入 $X$ 会乘上三个不同的权重矩阵 $W^Q, W^K \in \mathbb{R}^{d \times d_k}$ 和 $W^V \in \mathbb{R}^{d \times d_v}$，将特征映射到不同的子空间：

$$
Q = XW^Q, \quad K = XW^K, \quad V = XW^V
$$

定义注意力权重矩阵 Attention：

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

这里 softmax 是一个行归一化函数，确保每行的权重和为 1。通过这个机制，Transformer 能够捕捉输入序列中任意位置之间的依赖关系，而不受距离限制。

---

如果只用一组 $Q,K,V$，模型只能学到一种特征交互模式。为了增加表达能力，我们将特征维度切分成 $h$ 个“头 (heads)”。

$$
\text{head}_i = \text{Attention}(XW_i^Q, XW_i^K, XW_i^V)
$$

$$
\text{MultiHead}(X) = \text{Concat}(\text{head}_1, \dots, \text{head}_h)W^O
$$

这里 Concat 是将多个头的输出拼接起来，$W^O \in \mathbb{R}^{h d_v \times d}$ 是最后的输出投影矩阵。多头注意力机制允许模型在不同的子空间中学习不同的特征交互模式，从而提升了模型的表达能力。

---

一个重点是 Transformer 和 RNN/CNN 的复杂度对比。计算 $QK^T$ 的复杂度：$Q \in \mathbb{R}^{n \times d_k}$，$K^T \in \mathbb{R}^{d_k \times n}$。矩阵乘法的时间复杂度为 $\mathcal{O}(n^2 d_k)$。随着序列长度 $n$ 的增加，自注意力的时间和空间复杂度都是 $\mathcal{O}(n^2)$。

---

**位置编码**：自注意力公式本质上是一个集合运算 (Set Operation)。如果你把输入序列 $X$ 的两行打乱，输出的结果也会跟着对应打乱，但内容完全不变。它完全不知道词的先后顺序！必须在输入 $X$ 传入网络之前，硬生生地把位置信息加进去：$X_{\text{input}} = X_{\text{embed}} + PE$。

经典的正余弦编码：

$$
PE_{(pos, 2i)} = \sin(pos / 10000^{2i/d})
$$

$$
PE_{(pos, 2i+1)} = \cos(pos / 10000^{2i/d})
$$

---

在标准 Transformer 中通常使用 Layer Normalization，而不是 Batch Normalization。

**BatchNorm**：对每个通道使用 Mini-batch 的统计量进行归一化。它依赖 Batch Size，并且训练阶段使用当前 batch 统计量、测试阶段使用移动平均统计量。对于变长序列，padding 和不同位置的统计分布会增加处理难度；训练和推理统计量不一致也可能带来误差。因此 BatchNorm 更常见于 CNN，而不是标准 Transformer。

**LayerNorm**：在每个样本内部（沿着词向量维度 $d$）独立求均值和方差。它完全不受 Batch Size 影响，是 Transformer 在 NLP 中大杀器的标配。

---

**缩放因子为什么是 $\sqrt{d_k}$**：假设 query 和 key 的每个分量都独立、均值为 0、方差为 1，则

$$
q^Tk=\sum_{i=1}^{d_k}q_ik_i
$$

的方差约为 $d_k$。当 $d_k$ 很大时，不缩放的 attention logits 会变得非常大，softmax 会接近 one-hot，梯度也会接近 0。除以 $\sqrt{d_k}$ 后，logits 的方差恢复到常数量级，训练会稳定得多。

---

Transformer Block 并不只有 Attention。一个标准的 Pre-LN Transformer Block 可以写成：

$$
Y=X+\operatorname{MHA}(\operatorname{LN}(X))
$$

$$
Z=Y+\operatorname{FFN}(\operatorname{LN}(Y))
$$

其中

$$
\operatorname{FFN}(x)=W_2\phi(W_1x+b_1)+b_2
$$

Attention 负责 token 之间的信息交换，FFN 则对每个 token 独立地进行非线性特征变换。Residual Connection 为梯度提供短路，LayerNorm 控制每层输入的尺度。

---

### 反向传播、激活函数与优化

---

设一个 $L$ 层 MLP 满足

$$
x_l=f_l(x_{l-1},\theta_l),\qquad l=1,\dots,L
$$

损失为

$$
J=\mathcal{L}(x_L,y)
$$

根据链式法则，第 $l$ 层参数的梯度为

$$
\frac{\partial J}{\partial\theta_l}
=
\frac{\partial J}{\partial x_L}
\frac{\partial x_L}{\partial x_{L-1}}
\cdots
\frac{\partial x_{l+1}}{\partial x_l}
\frac{\partial x_l}{\partial\theta_l}
$$

直接对每个参数重复计算这条链会产生大量重复。Backpropagation 从最后一层开始递推

$$
\delta_l
=
\frac{\partial J}{\partial x_l}
=
\delta_{l+1}\frac{\partial x_{l+1}}{\partial x_l}
$$

并利用

$$
\frac{\partial J}{\partial\theta_l}
=
\delta_l\frac{\partial x_l}{\partial\theta_l}
$$

一次性复用中间结果。因此，计算所有参数梯度的复杂度与一次前向传播处于同一量级，只差一个常数因子。

---

Sigmoid 激活函数为

$$
\sigma(z)=\frac1{1+e^{-z}}
$$

其导数满足

$$
\sigma'(z)=\sigma(z)(1-\sigma(z))\le\frac14
$$

在深层网络中，反向传播需要不断乘以 $\sigma'(z)$，所以梯度容易按指数速度衰减。ReLU 的导数为

$$
\operatorname{ReLU}'(z)
=
\begin{cases}
1,&z>0,\\
0,&z<0.
\end{cases}
$$

在正半轴上不会额外缩小梯度，因此能够缓解梯度消失。但如果一个神经元长期处于负半轴，它也可能出现 Dead ReLU。

---

带动量的 SGD 可以写成

$$
v_{k+1}=\beta v_k+\nabla\widehat{\mathcal{L}}(\theta_k)
$$

$$
\theta_{k+1}=\theta_k-\eta v_{k+1}
$$

其中 $\beta\in[0,1)$ 是动量系数。动量相当于对历史梯度做指数加权平均：梯度方向长期一致时会加速，梯度在狭长谷底两侧来回摆动时会相互抵消，从而减少震荡。

Adam 在此基础上同时维护一阶矩和二阶矩：

$$
m_t=\beta_1m_{t-1}+(1-\beta_1)g_t
$$

$$
v_t=\beta_2v_{t-1}+(1-\beta_2)g_t^2
$$

经过偏差修正后，

$$
\theta_t
=
\theta_{t-1}
-
\eta\frac{\widehat m_t}{\sqrt{\widehat v_t}+\epsilon}
$$

它会根据每个参数的历史梯度尺度自适应地调整步长。

---

### CNN 基础与深度网络

---

与全连接网络（MLP）相比，**卷积神经网络 (CNN)** 能够极大地减少参数量，其底层的数学逻辑依赖于对现实世界信号（如图像、音频）的两个极强的先验假设：

**局部连接 (Local Connectivity)：**

假设：空间上相近的像素往往具有高度相关性（构成边缘、角点等局部特征），而距离远的像素相关性极弱。

实现：每个神经元不再与上一层的所有神经元相连，而是只与一个极小的局部窗口（感受野）相连。

**权重共享 (Weight Sharing)** 与 **平移等变性 (Translation Equivariance)**：

假设：如果一个特征（比如猫的耳朵）在图像左上角有用，那么它在右下角同样有用。

实现：同一个卷积核（一组固定的权重矩阵）在整个输入特征图上滑动扫过。数学性质：$f(g(x)) = g(f(x))$，即先平移输入再卷积，等于先卷积再平移输出。这赋予了模型极强的平移等变性。

---

假设输入通道数为 $C_{in}$，输出通道数为 $C_{out}$，卷积核大小为 $k\times k$。每个输出通道有一个大小为 $k\times k\times C_{in}$ 的卷积核和一个偏置，因此参数量为

$$
k^2C_{in}C_{out}+C_{out}
$$

这个参数量与输入图像的空间大小 $H,W$ 无关。相比之下，把图像完全展平后接全连接层，参数量会同时依赖输入和输出的所有空间位置，通常远大于卷积层。

卷积输出的空间大小为

$$
H_{out}
=
\left\lfloor
\frac{H+2p-d(k-1)-1}{s}
+1
\right\rfloor
$$

$$
W_{out}
=
\left\lfloor
\frac{W+2p-d(k-1)-1}{s}
+1
\right\rfloor
$$

其中 $p$ 是 padding，$s$ 是 stride，$d$ 是 dilation。

---

**感受野 (Receptive Field)**指的是网络深层的一个神经元，能“看到”原始输入图像上多大范围的区域。这是决定网络能捕捉多大宏观特征的核心指标。递推公式：假设第 $l$ 层的感受野为 $RF_l$，卷积核大小为 $k_l$，步长为 $s_l$。

$$
RF_l = RF_{l-1} + (k_l - 1) \times \prod_{i=1}^{l-1} s_i
$$

---

**障碍一：梯度消失/爆炸 (Vanishing/Exploding Gradients)**

原因：反向传播基于链式法则，本质是无数个雅可比矩阵的连乘：$\frac{\partial L}{\partial x_1} = \frac{\partial L}{\partial x_n} \frac{\partial x_n}{\partial x_{n-1}} \dots \frac{\partial x_2}{\partial x_1}$。如果这些矩阵的奇异值普遍小于 1，连乘后梯度趋于 0；如果普遍大于 1，则趋于无穷。

**障碍二：网络退化 (Degradation) —— 深度学习的至暗时刻**

现象：当网络层数不断增加时，训练误差不仅没有下降，反而升高了！

本质：注意！这绝对不是过拟合（过拟合是训练误差低，测试误差高）。这纯粹是一个优化灾难。理论上，一个 50 层的网络，只要把后面 30 层设为恒等映射，它的表现就绝对不会比 20 层的网络差。但普通的非线性层极难学到完美的恒等映射。

---

何恺明提出的 ResNet 用一个极其简单的加法，完美破解了网络退化的死局。残差块核心公式：

$$
H(x) = \mathcal{F}(x, W_i) + x
$$

其中 $x$ 是输入，$H(x)$ 是期望的输出，$\mathcal{F}$ 是要学习的残差映射。优化视角的降维打击：我们不再强迫网络直接拟合极其复杂的底层映射 $H(x)$，而是让网络去拟合残差 $\mathcal{F}(x) = H(x) - x$。

对残差公式求导：

$$
\frac{\partial H}{\partial x} = \frac{\partial \mathcal{F}}{\partial x} + 1
$$

这个 $+1$ 是极其伟大的！它让梯度可以通过恒等分支直接传回浅层，显著缓解梯度消失和网络退化问题，因此网络可以稳定地堆叠到上百层。它并不意味着任何深层网络都绝对不会发生梯度消失，但确实大幅改善了优化条件。

---

### 深度生成模型与 VAE

---

生成模型的目标是学习真实数据的概率分布 $p(x)$，以便我们能从中采样出新的数据（比如生成新图片）。VAE 假设每个极其复杂的高维数据 $x$（如人脸图像），都是由一个低维的、符合标准正态分布的潜在变量（Latent Variable）$z$ 决定并生成的。

**边际似然（极大似然估计的目标）**：

$$
p(x) = \int p(x, z) dz = \int p(x|z) p(z) dz
$$

在深度学习中，$p(x|z)$ 是一个极其复杂的神经网络（解码器）。这意味着上面这个积分包含了一个复杂的非线性函数，积分绝对无法解析求解（Intractable）。同时，真实的后验分布 $p(z|x) = p(x|z)p(z)/p(x)$ 也因为分母算不出来而变得不可知。

---

既然真实的后验分布 $p(z|x)$ 算不出来，我们就用一个神经网络 $q_\phi(z|x)$（编码器）去强行逼近它。我们用 **KL 散度 (Kullback-Leibler Divergence)** 衡量这两个分布的差距：

$$
D_{KL}(q_\phi(z|x) \,||\, p(z|x)) = \mathbb{E}_{q_\phi} \left[ \log \frac{q_\phi(z|x)}{p(z|x)} \right]
$$

代入贝叶斯公式 $p(z|x) = \frac{p(x, z)}{p(x)}$：

$$
D_{KL}(q_\phi(z|x) \,||\, p(z|x)) = \mathbb{E}_{q_\phi} \left[ \log q_\phi(z|x) - \log p(x, z) + \log p(x) \right]
$$

这给出了

$$
\begin{aligned}
    \log p(x) &= D_{KL}(q_\phi(z|x) \,||\, p(z|x)) + \mathbb{E}_{q_\phi} [\log p(x, z) - \log q_\phi(z|x)]\\
    &\ge \mathbb{E}_{q_\phi} [\log p(x, z) - \log q_\phi(z|x)]
\end{aligned}
$$

最后一项被称为 **证据下界 (Evidence Lower Bound, ELBO)**，记为 $\mathcal{L}(x, \phi, \theta)$，是我们实际优化的目标：

$$
\begin{aligned}
    \mathcal{L} &= \mathbb{E}_{q_\phi} [\log p_\theta(x|z) + \log p(z) - \log q_\phi(z|x)]\\
    &= \mathbb{E}_{q_\phi(z|x)} [\log p_\theta(x|z)] - \mathbb{E}_{q_\phi(z|x)} \left[ \log \frac{q_\phi(z|x)}{p(z)} \right]\\
    &= \underbrace{\mathbb{E}_{q_\phi(z|x)} [\log p_\theta(x|z)]}_{\text{重建项 (Reconstruction Term)}} - \underbrace{D_{KL}(q_\phi(z|x) \,||\, p(z))}_{\text{正则化项 (Regularization Term)}}\\
\end{aligned}
$$

**第一项（重建项）**：这是个期望。意思是编码器 $q_\phi$ 吐出一个隐变量 $z$，解码器 $p_\theta$ 要尽可能把它还原成原来的 $x$（等价于均方误差 MSE 或交叉熵）。

**第二项（正则化项）**：强制要求编码器输出的隐变量分布 $q_\phi(z|x)$，尽可能贴近我们预设的标准正态分布 $p(z) = \mathcal{N}(0, I)$。如果不加这一项，潜在空间可能变得离散而不规则，聚合后验也不会匹配先验，导致直接从 $p(z)$ 采样时难以生成合理样本。

---

**最后一道障碍**：在训练网络时，我们需要用反向传播更新编码器 $\phi$ 的参数。但是，ELBO 的第一项包含了采样操作（即 $z \sim q_\phi(z|x)$）。采样是一个不可导的随机过程！ 梯度在这里会瞬间断裂。

**解决方案**：假设编码器输出的是正态分布的均值 $\mu$ 和标准差 $\sigma$。我们不再直接从 $\mathcal{N}(\mu, \sigma^2)$ 中采样 $z$。我们转而从一个与网络参数完全无关的标准正态分布 $\epsilon \sim \mathcal{N}(0, I)$ 中采样，然后通过一个确定的线性变换来构造 $z$：

$$
z = \mu + \sigma \odot \epsilon
$$

此时，$z$ 依然服从 $\mathcal{N}(\mu, \sigma^2)$。但是，采样操作被完美地隔离在了 $\epsilon$ 上！梯度可以直接顺着乘法（$\sigma$）和加法（$\mu$）极其丝滑地反向传播回编码器。这就是 VAE 能够使用低方差路径导数进行端到端训练的关键。

---

### Normalizing Flow、Diffusion 与 Flow Matching

---

Normalizing Flow 从一个简单的基础分布 $z_0\sim p_0$ 出发，通过一串可逆变换

$$
z_l=f_l(z_{l-1}),\qquad l=1,\dots,L
$$

最后令 $x=z_L$。根据变量替换公式，

$$
\log p_\theta(x)
=
\log p_0(z_0)
-
\sum_{l=1}^L
\log\left|
\det\frac{\partial f_l(z_{l-1})}{\partial z_{l-1}}
\right|
$$

其中 $z_0=f_1^{-1}\circ\cdots\circ f_L^{-1}(x)$。因此 Normalizing Flow 可以精确计算似然，但代价是每一层都必须可逆，而且 Jacobian 行列式必须高效可算。

---

离散扩散模型的前向过程不断加入高斯噪声：

$$
q(x_t|x_{t-1})
=
\mathcal{N}(\sqrt{\alpha_t}x_{t-1},\beta_tI)
$$

其中

$$
\alpha_t=1-\beta_t,\qquad
\overline{\alpha}_t=\prod_{s=1}^t\alpha_s
$$

利用高斯分布的闭包性，可以直接从 $x_0$ 采样任意时刻的 $x_t$：

$$
q(x_t|x_0)
=
\mathcal{N}
\left(
\sqrt{\overline{\alpha}_t}x_0,
(1-\overline{\alpha}_t)I
\right)
$$

等价地，

$$
x_t
=
\sqrt{\overline{\alpha}_t}x_0
+
\sqrt{1-\overline{\alpha}_t}\epsilon,
\qquad
\epsilon\sim\mathcal{N}(0,I)
$$

条件 score 为

$$
\nabla_{x_t}\log q(x_t|x_0)
=
-
\frac{x_t-\sqrt{\overline{\alpha}_t}x_0}
{1-\overline{\alpha}_t}
=
-
\frac{\epsilon}{\sqrt{1-\overline{\alpha}_t}}
$$

因此可以用神经网络 $s_\theta(x_t,t)$ 逼近 score，或者让网络直接预测噪声 $\epsilon$。

---

连续时间扩散模型把前向过程写成 SDE：

$$
dx=f(x,t)dt+g(t)dW_t
$$

其逆时间 SDE 为

$$
dx
=
\left[
f(x,t)-g(t)^2\nabla_x\log p_t(x)
\right]dt
+
g(t)d\overline W_t
$$

其中 $dt$ 沿逆时间方向推进。逆过程唯一未知的关键量就是边缘分布的 score：

$$
\nabla_x\log p_t(x)
$$

这也是 score matching 在扩散模型中出现的根本原因。

---

Flow Matching 不使用逆时间 SDE，而是直接学习一个 ODE 的速度场。给定耦合

$$
(x_0,x_1)\sim\gamma
$$

以及线性插值

$$
x_t=(1-t)x_0+tx_1
$$

其条件速度为

$$
\frac{d}{dt}x_t=x_1-x_0
$$

训练目标为

$$
\min_\theta
\mathbb{E}_{t,(x_0,x_1)}
\left[
\left||
v_\theta(t,x_t)-(x_1-x_0)
\right||^2
\right]
$$

平方损失的最优解就是条件均值：

$$
v^*(t,x)
=
\mathbb{E}[x_1-x_0\mid x_t=x]
$$

这个边缘速度场满足连续性方程

$$
\partial_t\pi_t+\nabla\cdot(\pi_tv_t)=0
$$

所以 ODE

$$
\frac{d}{dt}x_t=v_t(x_t)
$$

能够把基础分布 $\pi_0$ 输运到数据分布 $\pi_1$。

---

### 强化学习基础与策略梯度

---

强化学习中的 Markov Decision Process 由

$$
(\mathcal{S},\mathcal{A},P,r,\gamma)
$$

组成。策略 $\pi(a|s)$ 下的状态价值函数为

$$
V^\pi(s)
=
\mathbb{E}_\pi
\left[
\sum_{t=0}^{\infty}\gamma^tr(s_t,a_t)
\mid s_0=s
\right]
$$

动作价值函数为

$$
Q^\pi(s,a)
=
\mathbb{E}_\pi
\left[
\sum_{t=0}^{\infty}\gamma^tr(s_t,a_t)
\mid s_0=s,a_0=a
\right]
$$

它们满足 Bellman 方程：

$$
V^\pi(s)
=
\sum_a\pi(a|s)
\left[
r(s,a)
+
\gamma\sum_{s'}P(s'|s,a)V^\pi(s')
\right]
$$

---

Policy Iteration 在两个步骤之间交替：

**Policy Evaluation**：固定 $\pi_k$，求解 $V^{\pi_k}$。

**Policy Improvement**：令

$$
\pi_{k+1}(s)
\in
\arg\max_a
\left[
r(s,a)+\gamma\sum_{s'}P(s'|s,a)V^{\pi_k}(s')
\right]
$$

在未知模型的情况下，Actor-Critic 用 critic $V_\phi$ 或 $Q_\phi$ 近似价值函数，再用 TD error

$$
\delta_t
=
r_t+\gamma V_\phi(s_{t+1})-V_\phi(s_t)
$$

更新 critic，并用

$$
\nabla_\theta\log\pi_\theta(a_t|s_t)\delta_t
$$

更新 actor。

---

策略梯度定理给出

$$
\nabla_\theta J(\theta)
=
\mathbb{E}_{\pi_\theta}
\left[
\sum_{t=0}^{\infty}
\gamma^t
\nabla_\theta\log\pi_\theta(a_t|s_t)
Q^{\pi_\theta}(s_t,a_t)
\right]
$$

因为

$$
\mathbb{E}_{a\sim\pi_\theta(\cdot|s)}
\left[
\nabla_\theta\log\pi_\theta(a|s)b(s)
\right]
=0
$$

所以可以减去任意只依赖状态的 baseline。通常取

$$
b(s)=V^{\pi_\theta}(s)
$$

此时

$$
Q^\pi(s,a)-V^\pi(s)=A^\pi(s,a)
$$

这不会改变梯度的期望，但可以显著降低方差。

---

### 真题

---

**(Spring, 2025, B1)** [18 pts.] Consider a classification problem: the training dataset is given as $\{(x_i, y_i)\}_{i=1}^N$, where $x_i \in \mathbb{R}^d$ represents the input features, and $y_i \in \{1, 2, \dots, C\}$ represents the class labels .A supervised deep learning pipeline typically includes preparing training data, defining a hypothesis space, designing a training scheme, and optimizing the network .Answer the following questions:

(a) [4 pts.] Define the hypothesis space consisting of all neural networks structured with

* a **feature extractor**: a multi-layer perceptron (MLP) that maps the inputs to a learned feature representation ,
  
* a **classifier**: a multi-layer perceptron (MLP) that maps the feature representation to class probabilities .Please specify the input, output and the parameters for training .

(b) [4 pts.] Specify an appropriate loss function for this classification problem and explain how stochastic gradient descent (SGD) is used to optimize the neural network .

(c) [4 pts.] To stabilize training, batch normalization is often applied. Describe how batch normalization works during the training and testing phase .

(d) [3 pts.] If the training error is unsatisfactory, describe what adjustments you can make to improve the expressivity of the neural network. Discuss at least two approaches .

(e) [3 pts.] If the training error is low but the testing error is high, propose strategies to reduce overfitting. Discuss at least two approaches .

---

**解答**：$(a)$：Feature Extractor 定义为函数 $f_{\theta_1}: \mathbb{R}^d \rightarrow \mathbb{R}^h$。它将 $d$ 维输入映射到 $h$ 维的隐藏层特征空间。

Classifier 定义为函数 $g_{\theta_2}: \mathbb{R}^h \rightarrow [0, 1]^C$。它将 $h$ 维特征映射为 $C$ 个类别的概率分布 。

整个网络的假设空间 Hypothesis Space 是由这两部分复合而成的函数集合：$\mathcal{H} = \{g_{\theta_2}(f_{\theta_1}(x)) \mid \theta_1 \in \Theta_1, \theta_2 \in \Theta_2\}$

Input: $x \in \mathbb{R}^d$

Output: 一个 $C$ 维的概率向量 $\hat{y} \in [0, 1]^C$，满足 $\sum_{c=1}^C \hat{y}_c = 1$ 。

Parameters: 训练参数为 $\theta = \{\theta_1, \theta_2\}$，其中包含了两个 MLP 网络中所有的权重矩阵（Weight Matrices）和偏置向量（Bias Vectors） 。

$(b)$：适合分类问题的损失函数是交叉熵损失 (Cross-Entropy Loss)：

$$
\mathcal{L} = -\sum_{c=1}^C \mathbb{I}(y = c) \log(\hat{y}_c)
$$

SGD 的优化流程：

* 采样：每次从训练集中随机抽取一个微批次（Mini-batch）的样本 。
  
* 前向与反向传播：计算该批次样本的平均交叉熵损失，然后利用反向传播（Backpropagation）计算损失函数对网络所有参数 $\theta$ 的梯度 $\nabla_\theta \mathcal{L}$ 。
  
* 参数更新：沿着梯度的反方向，按照学习率 $\eta$ 更新参数：$\theta \leftarrow \theta - \eta \nabla_\theta \mathcal{L}$ 。

$(c)$：**训练阶段 (Training Phase)**：在前向传播时，计算当前 Mini-batch 内特征的均值 $\mu_B$ 和方差 $\sigma_B^2$ 。用这两个统计量对当前批次的特征进行标准化（减去均值，除以标准差）。应用可学习的仿射变换参数（缩放因子 $\gamma$ 和平移因子 $\beta$）。同时维护一个全局均值和方差的指数移动平均 (Exponential Moving Average, EMA)，用于测试阶段。

**测试阶段 (Testing/Inference Phase)**：使用在训练阶段累积计算好的全局移动平均均值和方差 (EMA statistics) 来进行归一化。这保证了模型在测试单个样本时也能输出确定的结果 。

$(d)$：增加网络深度，增加网络宽度，更换激活函数。

$(e)$：增加正则化项，随机丢弃（Dropout）部分神经元，数据增强（Data Augmentation），提前停止。

---

**(Spring, 2025, B2)**[15 pts.] Generative models aim to train a neural network generator to produce samples similar to the training data. The forward process of a diffusion model progressively adds noise to the data, transforming the data distribution into a normal distribution . The reverse process gradually denoises the data, reverting the normal distribution back to the data distribution .In score-based diffusion models, the forward process can be represented as a Stochastic Differential Equation (SDE) . Consider the Variance Preserving (VP) SDE:

$$
dx = -\frac{1}{2}\beta(t)x dt + \sqrt{\beta(t)}dW_t
$$

where $W_t$ is a standard Wiener process, and $\beta(t)$ is a time-dependent noise schedule .

(a) [4 pts.] Write down the reverse-time SDE corresponding to the forward process and explain why training the diffusion model requires score matching as follows

$$
\min_{\theta}\mathbb{E}_t \lambda(t) \mathbb{E}_{x_t} ||s_\theta(x_t, t) - \nabla_{x_t} \log p_t(x_t)||_2^2,
$$

where $\lambda(t)$ is a weighting function, $s_\theta(x_t, t)$ is the neural network to train and $p_t$ is the marginal distribution of $x_t$ .

(b) [6 pts.] Prove that

$$
\mathbb{E}_{x_t} ||s(\theta, t) - \nabla_{x_t} \log p_t(x_t)||_2^2 = \mathbb{E}_{(x_0, x_t)} ||s_\theta(x_t, t) - \nabla_{x_t} \log p_{t|0}(x_t|x_0)||_2^2 + C,
$$

where $C$ is a constant, $p_t(x_t)$ is the marginal distribution of $x_t$, and $p_{t|0}(x_t|x_0)$ is the conditional distribution of $x_t$ given the original data $x_0$ .

(c) [5 pts.] For the given VP SDE, what is the conditional distribution $p_{t|0}(x_t|x_0)$? Based on this, derive the final denoising score-matching loss function for training score-based diffusion models .

---

**解答**：$(a)$：根据 Anderson 定理，对于任意前向 SDE $dx = f(x,t)dt + g(t)dW_t$，其对应的逆向时间 SDE 为：

$$
dx = [f(x,t) - g(t)^2 \nabla_x \log p_t(x)]dt + g(t)d\bar{W}_t
$$

将题目中的 $f(x,t) = -\frac{1}{2}\beta(t)x$ 和 $g(t) = \sqrt{\beta(t)}$ 代入，得到：

$$
dx = \left[ -\frac{1}{2}\beta(t)x - \beta(t) \nabla_{x} \log p_t(x) \right] dt + \sqrt{\beta(t)} d\bar{W}_t
$$

真实的边缘分布 $p_t(x)$ 极其复杂，包含了整个数据集的积分，我们根本算不出它的解析梯度。因此，我们必须引入一个神经网络 $s_\theta(x_t, t)$ 去强行逼近这个真实的 Score。

$(b)$：

$$
LHS = \mathbb{E}_{x_t} [||s_\theta||^2] - 2\mathbb{E}_{x_t} [\langle s_\theta, \nabla_{x_t} \log p_t \rangle] + \mathbb{E}_{x_t} [||\nabla_{x_t} \log p_t||^2]
$$

$$
RHS = \mathbb{E}_{x_0, x_t}[||s_\theta||^2] - 2\mathbb{E}_{x_0, x_t}[\langle s_\theta, \nabla_{x_t} \log p_{t|0} \rangle] + \mathbb{E}_{x_0, x_t}[||\nabla_{x_t} \log p_{t|0}||^2]
$$

最后一项与神经网络参数 $\theta$ 无关，可以扔进常数 $C$ 里。重点看交叉项：

$$
\begin{aligned}
    \mathbb{E}_{x_t} [\langle s_\theta, \nabla_{x_t} \log p_t \rangle] &= \int s_\theta(x_t, t) \cdot \nabla_{x_t} p_t(x_t) dx_t\\
    &= \int s_\theta(x_t, t) \cdot \left( \int \nabla_{x_t} p_{t|0}(x_t|x_0) p(x_0) dx_0 \right) dx_t\\
    (\nabla_{x_t} p_{t|0} = p_{t|0} \nabla_{x_t} \log p_{t|0})&= \iint s_\theta(x_t, t) \cdot \nabla_{x_t} \log p_{t|0}(x_t|x_0) \cdot p_{t|0}(x_t|x_0) p(x_0) dx_0 dx_t\\
    &= \mathbb{E}_{x_0, x_t} [\langle s_\theta(x_t, t), \nabla_{x_t} \log p_{t|0}(x_t|x_0) \rangle]
\end{aligned}
$$

$(c)$：令

$$
\overline{\alpha}(t)
=
\exp\left(-\int_0^t\beta(s)ds\right)
$$

VP SDE 是线性 SDE，其解可以写成

$$
x_t
=
\sqrt{\overline{\alpha}(t)}x_0
+
\sqrt{1-\overline{\alpha}(t)}\epsilon,
\qquad
\epsilon\sim\mathcal{N}(0,I)
$$

因此条件分布为

$$
p_{t|0}(x_t|x_0)
=
\mathcal{N}
\left(
\sqrt{\overline{\alpha}(t)}x_0,
\left(1-\overline{\alpha}(t)\right)I
\right)
$$

其条件 score 为

$$
\begin{aligned}
\nabla_{x_t}\log p_{t|0}(x_t|x_0)
&=
-
\frac{x_t-\sqrt{\overline{\alpha}(t)}x_0}
{1-\overline{\alpha}(t)}\\
&=
-
\frac{\epsilon}
{\sqrt{1-\overline{\alpha}(t)}}
\end{aligned}
$$

代入 $(b)$ 的等价目标，得到最终的 denoising score matching loss：

$$
\mathcal{L}_{DSM}(\theta)
=
\mathbb{E}_{t,x_0,\epsilon}
\left[
\lambda(t)
\left||
s_\theta(x_t,t)
+
\frac{\epsilon}{\sqrt{1-\overline{\alpha}(t)}}
\right||_2^2
\right]
$$

其中

$$
x_t
=
\sqrt{\overline{\alpha}(t)}x_0
+
\sqrt{1-\overline{\alpha}(t)}\epsilon
$$






---

**(Autumn, 2025, B1)**[9 pts.] Neural Network Architectures (CNNs & Transformers)

(a) [3 pts.] Derive the number of trainable parameters in a single convolutional layer with input size $H \times W \times C_{in}$, kernel size $k \times k$, and $C_{out}$ output channels (assume bias), and compare it with a fully connected (dense) layer of the same input and output size .

(b) [3 pts.] Write the scaled dot-product self-attention formula (define Q, K, V). Explain why positional information is necessary in Transformers and describe one method to inject positional information .

(c) [3 pts.] State one key benefit of (i) convolution for vision and (ii) self-attention. Then design a minimal vision transformer for images that uses both structures: specify how to tokenize the image into patch embeddings, where self-attention is applied, and where convolution is introduced .

---

**解答**：$(a)$：每个输出通道都有一个大小为 $k\times k\times C_{in}$ 的卷积核和一个偏置，因此卷积层参数量为

$$
k^2C_{in}C_{out}+C_{out}
$$

它与输入图像的空间大小 $H,W$ 无关。

若卷积输出大小为 $H_{out}\times W_{out}\times C_{out}$，把输入和输出都完全展开后使用全连接层，则参数量为

$$
(HWC_{in})(H_{out}W_{out}C_{out})
+
H_{out}W_{out}C_{out}
$$

因此，全连接层的参数量会随图像空间大小迅速增长，而卷积通过局部连接和权重共享显著减少参数。

$(b)$：设输入 token 矩阵为

$$
X\in\mathbb{R}^{n\times d}
$$

定义

$$
Q=XW^Q,\qquad K=XW^K,\qquad V=XW^V
$$

则 scaled dot-product self-attention 为

$$
\operatorname{Attention}(Q,K,V)
=
\operatorname{softmax}
\left(
\frac{QK^T}{\sqrt{d_k}}
\right)V
$$

Self-attention 本身对 token 的排列是 permutation equivariant 的，无法区分相同 token 出现在不同位置的情况。因此必须加入位置编码。例如使用可学习的位置嵌入

$$
X^{(0)}=X+E_{pos}
$$

也可以使用正余弦位置编码。

$(c)$：卷积的核心优势是局部连接、权重共享和平移等变性，它能够高效提取边缘、纹理等局部视觉模式。Self-attention 的核心优势是具有全局感受野，可以根据输入内容让任意两个图像区域直接交互。

一个最小的混合视觉模型可以写成

$$
X
\longrightarrow
\operatorname{ConvStem}
\longrightarrow
\operatorname{Flatten}
\longrightarrow
\operatorname{PositionEmbedding}
\longrightarrow
\operatorname{SelfAttention}
\longrightarrow
\operatorname{Classifier}
$$

设输入图像为

$$
X\in\mathbb{R}^{B\times C\times H\times W}
$$

先使用卷积 stem 提取局部特征并下采样：

$$
F=\operatorname{ConvStem}(X)
\in
\mathbb{R}^{B\times d\times H'\times W'}
$$

然后把空间位置展平为 token：

$$
T=\operatorname{Flatten}_{HW}(F)
\in
\mathbb{R}^{B\times N\times d},
\qquad
N=H'W'
$$

加入位置编码后，在 $N$ 个图像 token 上使用 self-attention，最后对 token 做平均池化或加入 class token，再接线性分类头。这样卷积负责局部特征，self-attention 负责全局关系。

---

**(Autumn, 2025, B2)**[14 pts.] Generative Models and Likelihood-based Training

(a) [2 pts.] Show that maximizing the likelihood of a generative model $p_\theta(x)$ given data distribution $p_{data}(x)$ is equivalent to minimizing the KL divergence $KL(p_{data}||p_\theta)$ .

(b) [4 pts.] Consider a normalizing flow model composed of $L$ invertible transformations $z_0 \sim p(z_0)$, $z_l = f_l(z_{l-1}) \quad l=1,\dots,L$, $x = z_L$, where each $f_l$ is bijective and differentiable, and $p(z_0)$ is a simple base density (e.g., standard Gaussian) . Write down the training objective (loss) for normalizing flows on a dataset $\{x^{(i)}\}_{i=1}^N$ sampled from the data distribution .

(c) [4 pts.] Explain why the variational autoencoder (VAE) uses the evidence lower bound (ELBO) to approximate maximum likelihood training. Write down the ELBO expression and explain the roles of the reconstruction term and the regularization term . 

(d) [4 pts.] We can interpret diffusion probabilistic models as a form of hierarchical variational autoencoders (VAEs). Let $x_0 \sim p_{data}$ denote a data sample. The forward process (the encoder) is defined by adding noise

$$
q(x_{1:T}|x_0) = \prod_{t=1}^T q(x_t|x_{t-1}),
$$

$$
q(x_t|x_{t-1}) = \mathcal{N}(\sqrt{\alpha_t}x_{t-1}, \beta_t I),
$$

where $\alpha_t = 1 - \beta_t \in (0, 1)$ and $\overline{\alpha}_t = \prod_{s=1}^t \alpha_s$ .Write down the probabilistic model of the backward process (the decoder), and show that the ELBO for $\log p_\theta(x_0)$ can be written as

$$
\log p_\theta(x_0) \ge -KL(q(x_T|x_0)||p(x_T)) - \sum_{t=2}^T \mathbb{E}_q [KL(q(x_{t-1}|x_t, x_0)||p_\theta(x_{t-1}|x_t))] + \mathbb{E}_q [\log p_\theta(x_0|x_1)]
$$

---

**解答**：$(a)$：

$$
\begin{aligned}
KL(p_{data}||p_\theta)
&=
\mathbb{E}_{p_{data}}
\left[
\log\frac{p_{data}(x)}{p_\theta(x)}
\right]\\
&=
\mathbb{E}_{p_{data}}[\log p_{data}(x)]
-
\mathbb{E}_{p_{data}}[\log p_\theta(x)]
\end{aligned}
$$

第一项与参数 $\theta$ 无关，因此

$$
\arg\min_\theta KL(p_{data}||p_\theta)
=
\arg\max_\theta
\mathbb{E}_{p_{data}}[\log p_\theta(x)]
$$

也就是最小化 KL 散度等价于最大化数据似然。

$(b)$：对于每个数据 $x=z_L$，依次使用逆变换得到

$$
z_{l-1}=f_l^{-1}(z_l),
\qquad
l=L,\dots,1
$$

根据变量替换公式，

$$
\log p_\theta(x)
=
\log p_0(z_0)
-
\sum_{l=1}^L
\log
\left|
\det
\frac{\partial f_l(z_{l-1})}{\partial z_{l-1}}
\right|
$$

因此训练集上的负对数似然损失为

$$
\mathcal{L}_{flow}(\theta)
=
-
\frac1N
\sum_{i=1}^N
\left[
\log p_0(z_0^{(i)})
-
\sum_{l=1}^L
\log
\left|
\det
J_{f_l}(z_{l-1}^{(i)})
\right|
\right]
$$

训练就是最小化该损失。

$(c)$：VAE 的边际似然为

$$
\log p_\theta(x)
=
\log\int p_\theta(x,z)dz
$$

这个积分通常无法直接计算。引入变分后验 $q_\phi(z|x)$，有

$$
\log p_\theta(x)
=
\mathcal{L}_{ELBO}(x)
+
KL(q_\phi(z|x)||p_\theta(z|x))
$$

由于 KL 散度非负，

$$
\log p_\theta(x)\ge\mathcal{L}_{ELBO}(x)
$$

其中

$$
\begin{aligned}
\mathcal{L}_{ELBO}(x)
&=
\mathbb{E}_{q_\phi(z|x)}
[\log p_\theta(x,z)-\log q_\phi(z|x)]\\
&=
\mathbb{E}_{q_\phi(z|x)}
[\log p_\theta(x|z)]
-
KL(q_\phi(z|x)||p(z))
\end{aligned}
$$

第一项是重建项，要求解码器能够根据 $z$ 恢复 $x$；第二项是正则化项，要求近似后验接近先验，从而使潜在空间连续并允许从先验采样生成数据。

$(d)$：反向生成模型定义为

$$
p_\theta(x_{0:T})
=
p(x_T)
\prod_{t=1}^T
p_\theta(x_{t-1}|x_t)
$$

其中通常取

$$
p(x_T)=\mathcal{N}(0,I)
$$

并令

$$
p_\theta(x_{t-1}|x_t)
=
\mathcal{N}
\left(
\mu_\theta(x_t,t),
\Sigma_\theta(x_t,t)
\right)
$$

由 Jensen 不等式，

$$
\begin{aligned}
\log p_\theta(x_0)
&=
\log
\int
p_\theta(x_{0:T})dx_{1:T}\\
&=
\log
\mathbb{E}_{q(x_{1:T}|x_0)}
\left[
\frac{p_\theta(x_{0:T})}
{q(x_{1:T}|x_0)}
\right]\\
&\ge
\mathbb{E}_q
\left[
\log
\frac{p_\theta(x_{0:T})}
{q(x_{1:T}|x_0)}
\right]
\end{aligned}
$$

利用前向过程的 Markov 结构，并把每一步整理成 KL 散度，得到

$$
\begin{aligned}
\log p_\theta(x_0)
\ge{}&
-
KL(q(x_T|x_0)||p(x_T))\\
&-
\sum_{t=2}^T
\mathbb{E}_q
\left[
KL
\left(
q(x_{t-1}|x_t,x_0)
||
p_\theta(x_{t-1}|x_t)
\right)
\right]\\
&+
\mathbb{E}_q[\log p_\theta(x_0|x_1)]
\end{aligned}
$$

第一项要求最终噪声分布接近标准高斯；中间各项训练反向去噪转移；最后一项是从 $x_1$ 重建 $x_0$ 的 likelihood。

---

**(Autumn, 2025, B3)**[10 pts.] Policy Gradient Methods

Consider a discounted Markov Decision Process $(\mathcal{S},\mathcal{A},P,r,\gamma)$ with a differentiable stochastic policy $\pi_\theta(a|s)$. Let

$$
G_0=\sum_{t=0}^{\infty}\gamma^tr(s_t,a_t)
$$

and

$$
J(\theta)=V^{\pi_\theta}(s_0)
=
\mathbb{E}_{\tau\sim\pi_\theta}[G_0]
$$

(a) [6 pts.] Prove the Policy Gradient Theorem:

$$
\nabla_\theta J(\theta)
=
\mathbb{E}_{\pi_\theta}
\left[
\sum_{t=0}^{\infty}
\gamma^t
\nabla_\theta\log\pi_\theta(a_t|s_t)
Q^{\pi_\theta}(s_t,a_t)
\right]
$$

(b) [4 pts.] Show that for any function $b:\mathcal{S}\to\mathbb{R}$,

$$
\mathbb{E}_{\pi_\theta}
\left[
\sum_{t=0}^{\infty}
\gamma^t
\nabla_\theta\log\pi_\theta(a_t|s_t)b(s_t)
\right]
=0
$$

and explain how the baseline should be chosen in the advantage method.

---

**解答**：$(a)$：轨迹概率为

$$
p_\theta(\tau)
=
\rho_0(s_0)
\prod_{t=0}^{\infty}
\pi_\theta(a_t|s_t)
P(s_{t+1}|s_t,a_t)
$$

环境转移概率 $P$ 与 $\theta$ 无关，因此

$$
\nabla_\theta\log p_\theta(\tau)
=
\sum_{t=0}^{\infty}
\nabla_\theta\log\pi_\theta(a_t|s_t)
$$

由 log-derivative trick，

$$
\begin{aligned}
\nabla_\theta J(\theta)
&=
\nabla_\theta
\int p_\theta(\tau)G_0(\tau)d\tau\\
&=
\int
p_\theta(\tau)
\nabla_\theta\log p_\theta(\tau)
G_0(\tau)d\tau\\
&=
\mathbb{E}_{\pi_\theta}
\left[
\sum_{t=0}^{\infty}
\nabla_\theta\log\pi_\theta(a_t|s_t)
G_0
\right]
\end{aligned}
$$

时间 $t$ 的动作不可能影响过去的奖励，因此在与

$$
\nabla_\theta\log\pi_\theta(a_t|s_t)
$$

相乘时，可以删除 $t$ 之前的 reward-to-go。再对 $s_t,a_t$ 条件化，未来折扣回报的条件期望就是 $Q^{\pi_\theta}(s_t,a_t)$，所以

$$
\nabla_\theta J(\theta)
=
\mathbb{E}_{\pi_\theta}
\left[
\sum_{t=0}^{\infty}
\gamma^t
\nabla_\theta\log\pi_\theta(a_t|s_t)
Q^{\pi_\theta}(s_t,a_t)
\right]
$$

$(b)$：固定状态 $s$，有

$$
\begin{aligned}
\mathbb{E}_{a\sim\pi_\theta(\cdot|s)}
[\nabla_\theta\log\pi_\theta(a|s)b(s)]
&=
b(s)
\sum_a
\pi_\theta(a|s)
\nabla_\theta\log\pi_\theta(a|s)\\
&=
b(s)
\sum_a
\nabla_\theta\pi_\theta(a|s)\\
&=
b(s)
\nabla_\theta
\sum_a
\pi_\theta(a|s)\\
&=0
\end{aligned}
$$

再对状态访问分布取期望并对时间求和，即得题目结论。因此可以把策略梯度中的 $Q^\pi(s,a)$ 替换为

$$
Q^\pi(s,a)-b(s)
$$

而不改变梯度期望。Advantage 方法取

$$
b(s)=V^\pi(s)
$$

于是

$$
Q^\pi(s,a)-V^\pi(s)=A^\pi(s,a)
$$

这样可以保留无偏性并降低梯度估计的方差。

---

**(Spring, 2026, B1)**[10 pts.]

(a) [2 pts.] Consider a multi-layer perceptron with

$$
x_l=f_l(x_{l-1},\theta_l),
\qquad
l=1,\dots,L
$$

and a loss $J=\mathcal{L}(x_L,y)$.

(i) Using chain rule, derive the expression for $\frac{\partial J}{\partial\theta_l}$.

(ii) State why computing all gradients using backpropagation has the same order of computational complexity as one forward evaluation.

(b) [2 pts.] Explain mathematically why sigmoid often leads to the vanishing gradient problem. Contrast this with ReLU.

(c) [2 pts.] Write the update rules for SGD with momentum and explain how momentum improves optimization.

(d) [2 pts.] Explain the purpose of the scaling factor $1/\sqrt{d_k}$ in scaled dot-product attention.

(e) [2 pts.] Compare the computational structure of RNNs and Transformers.

---

**解答**：$(a)$：$(i)$ 根据链式法则，

$$
\frac{\partial J}{\partial\theta_l}
=
\frac{\partial J}{\partial x_L}
\frac{\partial x_L}{\partial x_{L-1}}
\frac{\partial x_{L-1}}{\partial x_{L-2}}
\cdots
\frac{\partial x_{l+1}}{\partial x_l}
\frac{\partial x_l}{\partial\theta_l}
$$

如果使用 column-vector Jacobian 的记号，也可以写成

$$
\nabla_{\theta_l}J
=
\left(
\frac{\partial x_l}{\partial\theta_l}
\right)^T
\left(
\prod_{j=l+1}^{L}
\left(
\frac{\partial x_j}{\partial x_{j-1}}
\right)^T
\right)
\nabla_{x_L}\mathcal{L}
$$

$(ii)$：反向传播把

$$
\delta_l=\frac{\partial J}{\partial x_l}
$$

从后向前递推：

$$
\delta_l
=
\delta_{l+1}
\frac{\partial x_{l+1}}{\partial x_l}
$$

每一层的中间梯度只计算一次，并被该层所有参数复用。每个前向算子只需要对应执行一次反向算子，所以总复杂度仍然是一次前向传播的常数倍。

$(b)$：Sigmoid 的导数为

$$
\sigma'(z)=\sigma(z)(1-\sigma(z))\le\frac14
$$

深层网络的梯度包含许多激活导数的连乘。若连续经过 $L$ 个 sigmoid 层，仅激活函数部分就可能产生

$$
\prod_{l=1}^L\sigma'(z_l)\le\left(\frac14\right)^L
$$

因此梯度会迅速趋于 0，尤其是在 sigmoid 饱和区间中。

ReLU 满足

$$
\operatorname{ReLU}'(z)=1
$$

当 $z>0$ 时，梯度不会因为激活函数而继续缩小，因此能够缓解梯度消失。但当 $z<0$ 时导数为 0，也可能产生 Dead ReLU。

$(c)$：一种常用的 momentum 记号为

$$
v_{k+1}
=
\beta v_k
+
\nabla\widehat{\mathcal{L}}(x_k)
$$

$$
x_{k+1}
=
x_k-\eta v_{k+1}
$$

其中 $\beta\in[0,1)$。动量累积历史梯度，在长期一致的方向上加速；在狭长谷底中，来回振荡的梯度分量会被平均抵消，因此比普通 SGD 更稳定。

$(d)$：若 $q_i,k_i$ 独立、均值为 0、方差为 1，则

$$
q^Tk=\sum_{i=1}^{d_k}q_ik_i
$$

的方差约为 $d_k$。除以 $\sqrt{d_k}$ 后，logits 的方差回到常数量级。若不缩放，当 $d_k$ 很大时，softmax 输入的绝对值会很大，输出接近 one-hot，Jacobian

$$
\frac{\partial p_i}{\partial z_j}
=
p_i(\mathbb{1}_{i=j}-p_j)
$$

会接近 0，从而产生很小的梯度。

$(e)$：RNN 按照

$$
h_t=f(h_{t-1},x_t)
$$

递归计算，$h_t$ 必须等待 $h_{t-1}$，所以沿序列方向存在长度为 $n$ 的串行依赖，难以充分利用 GPU 并行计算。

Transformer 把所有 token 组成矩阵，同时计算 $Q,K,V$ 和 attention，因此训练时可以对所有位置并行。虽然标准 self-attention 的时间和空间复杂度为

$$
O(n^2d)
$$

但它主要由高度优化的大规模矩阵乘法构成，所以在现代硬件上通常比串行 RNN 更高效。对于极长序列，$O(n^2)$ 的 attention 仍然会成为瓶颈。

---

**(Spring, 2026, B2)**[15 pts.] Let $\pi_0$ be a simple base distribution on $\mathbb{R}^d$ and let $\pi_1$ be a data distribution. We seek a time-dependent vector field $v_t(x)$ such that

$$
\frac{d}{dt}x_t=v_t(x_t),
\qquad
x_0\sim\pi_0
$$

transports $\pi_0$ to $\pi_1$ at $t=1$.

(a) [2 pts.] Given a coupling $(x_0,x_1)\sim\gamma$ and the interpolation

$$
x_t=(1-t)x_0+tx_1
$$

compute the conditional velocity.

(b) [3 pts.] Define

$$
v_t(x)
=
\mathbb{E}
[v_t(x_t|x_0,x_1)\mid x_t=x]
$$

Show that the density $\pi_t$ satisfies

$$
\partial_t\pi_t+\nabla\cdot(\pi_tv_t)=0
$$

and conclude that the ODE transports $\pi_0$ to $\pi_1$.

(c) [5 pts.] Propose a squared-loss regression objective for $v_\theta(t,x)$ and prove that its minimizer recovers $v_t(x)$.

(d) [5 pts.] Consider the SDE

$$
dx_t
=
\left(
v_t(x_t)
+
\beta_t\nabla_x\log\pi_t(x_t)
\right)dt
+
\sqrt{2\beta_t}dW_t
$$

Derive its Fokker-Planck equation and show that it has the same marginals as the deterministic ODE. Explain how the unknown score is approximated.

---

**解答**：$(a)$：直接对插值求导：

$$
v_t(x_t|x_0,x_1)
=
\frac{d}{dt}
\left[
(1-t)x_0+tx_1
\right]
=
x_1-x_0
$$

$(b)$：任取光滑且紧支撑的测试函数 $\varphi$。由链式法则，

$$
\frac{d}{dt}
\mathbb{E}[\varphi(x_t)]
=
\mathbb{E}
\left[
\nabla\varphi(x_t)^T(x_1-x_0)
\right]
$$

对 $x_t$ 条件化，并利用边缘速度场的定义，

$$
\begin{aligned}
\frac{d}{dt}
\mathbb{E}[\varphi(x_t)]
&=
\mathbb{E}
\left[
\nabla\varphi(x_t)^T
\mathbb{E}[x_1-x_0\mid x_t]
\right]\\
&=
\int
\nabla\varphi(x)^Tv_t(x)
\pi_t(x)dx
\end{aligned}
$$

另一方面，

$$
\frac{d}{dt}
\mathbb{E}[\varphi(x_t)]
=
\int\varphi(x)\partial_t\pi_t(x)dx
$$

对前式分部积分，

$$
\int
\varphi(x)
\left[
\partial_t\pi_t(x)
+
\nabla\cdot(\pi_t(x)v_t(x))
\right]dx
=0
$$

由于 $\varphi$ 任意，所以

$$
\partial_t\pi_t+\nabla\cdot(\pi_tv_t)=0
$$

并且线性插值满足

$$
x_{t=0}=x_0,\qquad x_{t=1}=x_1
$$

所以端点边缘分布分别为 $\pi_0$ 和 $\pi_1$。具有相同连续性方程和初始分布的 ODE 产生相同的边缘分布，因此它把 $\pi_0$ 输运到 $\pi_1$。

$(c)$：取 $t\sim Uniform[0,1]$、$(x_0,x_1)\sim\gamma$，并令

$$
x_t=(1-t)x_0+tx_1
$$

训练目标为

$$
\mathcal{L}(\theta)
=
\mathbb{E}_{t,(x_0,x_1)}
\left[
\left||
v_\theta(t,x_t)-(x_1-x_0)
\right||^2
\right]
$$

记

$$
Y=x_1-x_0,
\qquad
X=x_t
$$

对固定的 $t$，平方损失可以分解为

$$
\begin{aligned}
\mathbb{E}[||v_\theta(t,X)-Y||^2]
={}&
\mathbb{E}
\left[
\left||
v_\theta(t,X)-\mathbb{E}[Y|X]
\right||^2
\right]\\
&+
\mathbb{E}
\left[
\left||
Y-\mathbb{E}[Y|X]
\right||^2
\right]
\end{aligned}
$$

第二项与 $\theta$ 无关，所以最优回归函数为

$$
v_\theta^*(t,x)
=
\mathbb{E}[Y|X=x]
=
\mathbb{E}[x_1-x_0|x_t=x]
=
v_t(x)
$$

$(d)$：一般 SDE

$$
dx_t=b_t(x_t)dt+\sqrt{2\beta_t}dW_t
$$

的 Fokker-Planck 方程为

$$
\partial_t p_t
=
-
\nabla\cdot(p_tb_t)
+
\beta_t\Delta p_t
$$

本题中

$$
b_t(x)
=
v_t(x)
+
\beta_t\nabla\log\pi_t(x)
$$

因此

$$
\partial_t p_t
=
-
\nabla\cdot(p_tv_t)
-
\beta_t
\nabla\cdot
\left(
p_t\nabla\log\pi_t
\right)
+
\beta_t\Delta p_t
$$

令 $p_t=\pi_t$。由于

$$
\pi_t\nabla\log\pi_t=\nabla\pi_t
$$

所以

$$
-
\beta_t
\nabla\cdot
\left(
\pi_t\nabla\log\pi_t
\right)
+
\beta_t\Delta\pi_t
=0
$$

从而

$$
\partial_t\pi_t
=
-
\nabla\cdot(\pi_tv_t)
$$

这与确定性 ODE 的连续性方程完全相同，因此二者具有相同的边缘分布 $\{\pi_t\}_{t\in[0,1]}$。

实际中 $\nabla_x\log\pi_t(x)$ 未知，可以训练 score network

$$
s_\phi(t,x)
\approx
\nabla_x\log\pi_t(x)
$$

例如使用 denoising score matching：

$$
\min_\phi
\mathbb{E}
\left[
\left||
s_\phi(t,x_t)
-
\nabla_{x_t}\log p(x_t|x_0)
\right||^2
\right]
$$

然后在 SDE 中用 $s_\phi(t,x)$ 替代真实 score。

---

**(Spring, 2026, B3)**[8 pts.] Consider a discounted Markov Decision Process $(\mathcal{S},\mathcal{A},P,r,\gamma)$.

(a) [2 pts.] Derive the Bellman equation satisfied by

$$
V^\pi(s)
=
\mathbb{E}_\pi
\left[
\sum_{t=0}^{\infty}\gamma^tr(s_t,a_t)
\mid s_0=s
\right]
$$

(b) [2 pts.] Write down the policy iteration algorithm, including policy evaluation and policy improvement.

(c) [2 pts.] When $P$ is unknown, describe how actor-critic adapts the evaluation and improvement steps.

(d) [2 pts.] Write down one RLHF algorithm for preference data $(x,y^+,y^-)$ by specifying the objective used to update $\pi_\theta(y|x)$.

---

**解答**：$(a)$：把第一个时刻的 reward 单独取出：

$$
\begin{aligned}
V^\pi(s)
&=
\mathbb{E}_\pi
\left[
r(s_0,a_0)
+
\gamma
\sum_{t=1}^{\infty}
\gamma^{t-1}r(s_t,a_t)
\mid s_0=s
\right]\\
&=
\sum_a
\pi(a|s)
\left[
r(s,a)
+
\gamma
\sum_{s'}
P(s'|s,a)V^\pi(s')
\right]
\end{aligned}
$$

因此 Bellman expectation equation 为

$$
V^\pi(s)
=
\sum_a
\pi(a|s)
\left[
r(s,a)
+
\gamma
\sum_{s'}
P(s'|s,a)V^\pi(s')
\right]
$$

$(b)$：给定初始策略 $\pi_0$，重复以下两步：

**Policy Evaluation**：固定 $\pi_k$，求解

$$
V^{\pi_k}(s)
=
\sum_a
\pi_k(a|s)
\left[
r(s,a)
+
\gamma
\sum_{s'}
P(s'|s,a)V^{\pi_k}(s')
\right]
$$

**Policy Improvement**：对每个状态令

$$
\pi_{k+1}(s)
\in
\arg\max_a
\left[
r(s,a)
+
\gamma
\sum_{s'}
P(s'|s,a)V^{\pi_k}(s')
\right]
$$

当策略不再变化时停止。

$(c)$：当 $P$ 未知时，不能直接求 Bellman 方程中的期望。Actor-Critic 使用采样转移

$$
(s_t,a_t,r_t,s_{t+1})
$$

进行 model-free 学习。

Critic 用 TD target

$$
y_t=r_t+\gamma V_\phi(s_{t+1})
$$

最小化

$$
\mathcal{L}_{critic}(\phi)
=
\left(
V_\phi(s_t)-y_t
\right)^2
$$

从而近似策略评估。Actor 使用 TD error

$$
\delta_t
=
r_t+\gamma V_\phi(s_{t+1})-V_\phi(s_t)
$$

作为 advantage 的估计，并更新

$$
\theta
\leftarrow
\theta
+
\eta
\nabla_\theta
\log\pi_\theta(a_t|s_t)
\delta_t
$$

从而实现策略改进。

$(d)$：可以使用 Direct Preference Optimization。设 $\pi_{ref}$ 为参考策略，$\beta>0$ 为控制偏离参考策略程度的参数。DPO 的损失为

$$
\begin{aligned}
\mathcal{L}_{DPO}(\theta)
=
-
\mathbb{E}_{(x,y^+,y^-)}
\log\sigma
\Bigg(
\beta
\Big[
&
\log\pi_\theta(y^+|x)
-
\log\pi_{ref}(y^+|x)\\
&-
\log\pi_\theta(y^-|x)
+
\log\pi_{ref}(y^-|x)
\Big]
\Bigg)
\end{aligned}
$$

最小化该损失会提高相对于参考策略的 preferred response $y^+$ 的对数概率，同时降低 dispreferred response $y^-$ 的相对对数概率，不需要单独训练 reward model。
