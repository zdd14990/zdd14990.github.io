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
\text{head}_i = \text{Attention}(QW_i^Q, KW_i^K, VW_i^V)
$$

$$
\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \dots, \text{head}_h)W^O
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

在 Transformer 中，我们统一使用 Layer Normalization，绝对不用 Batch Normalization。

**BatchNorm**：在特征维度 (Channel) 上对整个 Batch 的样本求均值和方差。缺点是极其依赖 Batch Size，且处理变长序列（NLP 任务的常态）时，后面的 token 获取不到足够的统计量，会导致严重崩溃。

**LayerNorm**：在每个样本内部（沿着词向量维度 $d$）独立求均值和方差。它完全不受 Batch Size 影响，是 Transformer 在 NLP 中大杀器的标配。

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

这个 $+1$ 是极其伟大的！它保证了即使深层的梯度 $\frac{\partial \mathcal{F}}{\partial x}$ 衰减到了 0，梯度依然可以通过 $+1$ 这条“短路连接 (Shortcut)”直接无损地传递回浅层。梯度消失问题被彻底终结，网络可以轻松堆叠到上百层。

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

既然真实的后验分布 $p(z|x)$ 算不出来，我们就用一个神经网络 $q_\phi(z|x)$（编码器）去强行逼近它。我们用 **KL 散度 (Kullback-Leibler Divergence)** S衡量这两个分布的差距：

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

**第二项（正则化项）**：强制要求编码器输出的隐变量分布 $q_\phi(z|x)$，尽可能贴近我们预设的标准正态分布 $p(z) = \mathcal{N}(0, I)$。如果不加这一项，编码器就会退化成一个死记硬背的字典（方差变为 0），彻底失去生成新样本的能力。

---

**最后一道障碍**：在训练网络时，我们需要用反向传播更新编码器 $\phi$ 的参数。但是，ELBO 的第一项包含了采样操作（即 $z \sim q_\phi(z|x)$）。采样是一个不可导的随机过程！ 梯度在这里会瞬间断裂。

**解决方案**：假设编码器输出的是正态分布的均值 $\mu$ 和标准差 $\sigma$。我们不再直接从 $\mathcal{N}(\mu, \sigma^2)$ 中采样 $z$。我们转而从一个与网络参数完全无关的标准正态分布 $\epsilon \sim \mathcal{N}(0, I)$ 中采样，然后通过一个确定的线性变换来构造 $z$：

$$
z = \mu + \sigma \odot \epsilon
$$

此时，$z$ 依然服从 $\mathcal{N}(\mu, \sigma^2)$。但是，采样操作被完美地隔离在了 $\epsilon$ 上！梯度可以直接顺着乘法（$\sigma$）和加法（$\mu$）极其丝滑地反向传播回编码器。这就是 VAE 能够被端到端训练的唯一原因。

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






---

**(Autumn, 2025, B1)**[9 pts.] Neural Network Architectures (CNNs & Transformers)

(a) [3 pts.] Derive the number of trainable parameters in a single convolutional layer with input size $H \times W \times C_{in}$, kernel size $k \times k$, and $C_{out}$ output channels (assume bias), and compare it with a fully connected (dense) layer of the same input and output size .

(b) [3 pts.] Write the scaled dot-product self-attention formula (define Q, K, V). Explain why positional information is necessary in Transformers and describe one method to inject positional information .

(c) [3 pts.] State one key benefit of (i) convolution for vision and (ii) self-attention. Then design a minimal vision transformer for images that uses both structures: specify how to tokenize the image into patch embeddings, where self-attention is applied, and where convolution is introduced .

---

**解答**：

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