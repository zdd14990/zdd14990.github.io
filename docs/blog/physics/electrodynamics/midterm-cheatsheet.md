---
title: 电动力学期中cheatsheet
date: 2026-04-01
updated: 2026-10-15
description: 电动力学期中复习速查表：矢量分析、静电场、静磁场、Maxwell 方程组、电磁波与辐射的核心公式。
hide:
  - navigation
categories:
  - 物理
  - 电动力学
tags:
  - electrodynamics
  - physics
---

# 电动力学期中cheatsheet { #top }

$$
\epsilon_{ijk}\epsilon_{lmn} = \begin{vmatrix} \delta_{il} & \delta_{im} & \delta_{in} \\ \delta_{jl} & \delta_{jm} & \delta_{jn} \\ \delta_{kl} & \delta_{km} & \delta_{kn} \end{vmatrix}
$$

$$
\sum_{k} \epsilon_{ijk}\epsilon_{kmn} = \delta_{im}\delta_{jn} - \delta_{in}\delta_{jm}
$$

$$
\sum_{j,k} \epsilon_{ijk}\epsilon_{mjk} = 2\delta_{im}, \quad \sum_{i,j,k} \epsilon_{ijk}\epsilon_{ijk} = 3! = 6
$$

$$
\boldsymbol{A}\times(\boldsymbol{B}\times\boldsymbol{C}) = \boldsymbol{B}(\boldsymbol{A}\cdot\boldsymbol{C}) - \boldsymbol{C}(\boldsymbol{A}\cdot\boldsymbol{B})
$$

$$
\nabla(\boldsymbol{A}\cdot\boldsymbol{B}) = \boldsymbol{A}\times(\nabla\times\boldsymbol{B}) + \boldsymbol{B}\times(\nabla\times\boldsymbol{A}) + (\boldsymbol{A}\cdot\nabla)\boldsymbol{B} + (\boldsymbol{B}\cdot\nabla)\boldsymbol{A}
$$

$$
\nabla \cdot (\boldsymbol{A} \times \boldsymbol{B}) = \boldsymbol{B} \cdot (\nabla \times \boldsymbol{A}) - \boldsymbol{A} \cdot (\nabla \times \boldsymbol{B})
$$

$$
\nabla \times (\nabla \times \boldsymbol{A}) = \nabla(\nabla \cdot \boldsymbol{A}) - \nabla^2\boldsymbol{A}
$$

**相对位置矢量 $\boldsymbol{R} = \boldsymbol{r} - \boldsymbol{r}'$ :** $R = |\boldsymbol{r} - \boldsymbol{r}'|$

$$
\nabla \cdot \boldsymbol{R} = 3, \quad \nabla \times \boldsymbol{R} = 0
$$

$$
\nabla R = \frac{\boldsymbol{R}}{R} = \hat{R}, \quad \nabla \left(\frac{1}{R}\right) = -\frac{\hat{R}}{R^2}
$$

$$
\nabla \cdot \left(\frac{\hat{R}}{R^2}\right) = 4\pi\delta^3(\boldsymbol{R}) \implies \nabla^2 \left(\frac{1}{R}\right) = -4\pi\delta^3(\boldsymbol{r} - \boldsymbol{r}')
$$

静电力 $\boldsymbol{F} = q\boldsymbol{E}$, 电场 $\boldsymbol{E} = -\nabla V$。

**基本方程:** $\nabla \times \boldsymbol{E} = 0 \implies \boldsymbol{E} = -\nabla V$.

高斯定律积分形式：

$$
\oint \boldsymbol{E} \cdot d\boldsymbol{A} = \frac{Q_{\text{enc}}}{\epsilon_0}
$$

泊松方程: $\nabla^2 V = -\frac{\rho}{\epsilon_0}$. 拉普拉斯方程: $\nabla^2 V = 0$.

**直接积分法 (库仑定律):**

$$
V(\boldsymbol{r}) = \frac{1}{4\pi\epsilon_0} \int \frac{\rho(\boldsymbol{r}')}{|\boldsymbol{r}-\boldsymbol{r}'|} d\tau'
$$

\* **方形线圈** (边长 $a$，求 $z$ 轴上的点):

$$
V = \frac{\lambda}{\pi\epsilon_0}\ln\left(\frac{\sqrt{z^2+a^2/2}+a/2}{\sqrt{z^2+a^2/2}-a/2}\right)
$$

\* **圆形线圈** (半径 $r$): $V = \frac{Q}{4\pi\epsilon_0\sqrt{r^2+z^2}}$

\* **扁平面圆盘** (半径 $R$): $V = \frac{\sigma}{2\epsilon_0}(\sqrt{R^2+z^2} - |z|)$

**静电场能量:**

$$
W = \frac{1}{2} \int \rho V d\tau = \frac{\epsilon_0}{2} \int E^2 d\tau
$$

**位于接地平面上方 $z=d$ 处的点电荷 $q$:**

\* 镜像电荷: 位于 $z=-d$ 处的 $-q$。

\* 受力: $\boldsymbol{F} = -\frac{q^2}{4\pi\epsilon_0 (2d)^2}\hat{z}$

\* 诱导表面电荷密度: $\sigma(x,y) = -\frac{qd}{2\pi(x^2+y^2+d^2)^{3/2}}$

\* 系统总能量: $W = -\frac{q^2}{16\pi\epsilon_0 d}$ (真实电荷与镜像电荷系统能量的一半！)。

**相交接地平面 (夹角 $\alpha$):**需要的镜像电荷数量: $N = \frac{360^\circ}{\alpha} - 1$。

\* 仅当 $180^\circ/\alpha \in \mathbb{Z}^+$ 时有效 (例如 $90^\circ, 60^\circ, 45^\circ$)。

静电学界面条件：

$$
E_{out}-E_{in} = \frac{\sigma}{\epsilon_0}
$$

当 $r \gg r'$ 时，通过泰勒级数展开 $\frac{1}{|\boldsymbol{r}-\boldsymbol{r}'|}$ :

$$
V(\boldsymbol{r}) = \frac{1}{4\pi\epsilon_0} \sum_{n=0}^{\infty} \frac{1}{r^{n+1}} \int (r')^n P_n(\cos\theta') \rho(\boldsymbol{r}') d\tau'
$$

球坐标系下具有方位角对称性（与 $\phi$ 无关）的拉普拉斯通解为：

$$
V(r, \theta) = \sum_{l=0}^{\infty} \left( A_l r^l + \frac{B_l}{r^{l+1}} \right) P_l(\cos\theta)
$$

$P_1(x)=x$, $P_2(x)=\frac{1}{2}(3x^2-1)$, $P_3(x)=\frac{1}{2}(5x^3-3x)$。

**单极子 (Monopole):** $V_{mon} = \frac{Q}{4\pi\epsilon_0 r}$ (其中 $Q = \int \rho d\tau'$)

**偶极矩 (Dipole Moment):** $\boldsymbol{p} = \int \boldsymbol{r}' \rho(\boldsymbol{r}') d\tau'$ (离散形式: $\sum q_i \boldsymbol{r}_i$)

$$
V_{dip}(\boldsymbol{r}) = \frac{1}{4\pi\epsilon_0} \frac{\boldsymbol{p} \cdot \hat{r}}{r^2}
$$

$$
\boldsymbol{E}_{dip}(\boldsymbol{r}) = \frac{1}{4\pi\epsilon_0 r^3} [3(\boldsymbol{p}\cdot\hat{r})\hat{r} - \boldsymbol{p}]
$$

\* 注：若总电荷 $Q=0$，则 $\boldsymbol{p}$ 的值与坐标原点的选择无关。

极化强度 $\boldsymbol{P}$ = 单位体积的偶极矩。

**束缚电荷 (Bound Charges):**

$$
\rho_b = -\nabla \cdot \boldsymbol{P} \quad \text{(体束缚电荷)}
$$

$$
\sigma_b = \boldsymbol{P} \cdot \hat{n} \quad \text{(面束缚电荷)}
$$

\* $\hat{n}$ 是电介质表面的 **向外** 单位法向量。

\* 总束缚电荷始终为零: $\int \rho_b d\tau + \oint \sigma_b da = 0$。

**电位移矢量 $\boldsymbol{D}$:**

$$
\boldsymbol{D} = \epsilon_0\boldsymbol{E} + \boldsymbol{P}
$$

$\boldsymbol{D}$ 的高斯定理 (仅包含自由电荷):

$$
\nabla \cdot \boldsymbol{D} = \rho_f \implies \oint \boldsymbol{D} \cdot d\boldsymbol{A} = Q_{f, \text{enc}}
$$

\* 线性、各向同性、均匀 (LIH) 介质:

$$
\boldsymbol{P} = \epsilon_0 \chi_e \boldsymbol{E}, \quad \boldsymbol{D} = \epsilon_0(1+\chi_e)\boldsymbol{E} = \epsilon \boldsymbol{E} = \epsilon_r\epsilon_0\boldsymbol{E}
$$

**边界条件 (一般形式):**

$$
\boldsymbol{E}_{1\parallel} - \boldsymbol{E}_{2\parallel} = 0 \implies \text{切向 } \boldsymbol{E} \text{ 连续。}
$$

$$
\boldsymbol{D}_{1\perp} - \boldsymbol{D}_{2\perp} = \sigma_f \implies \text{法向 } \boldsymbol{D} \text{ 突变 } \sigma_f \text{。}
$$

$$
V_1 = V_2 \quad \text{(电势始终连续)}
$$

\* 计算电介质中的电容套路: 由 $Q_f$ 求 $D$ $\to$ $E = D/\epsilon$ $\to$ $V = \int E dl$ $\to$ $C = Q_f / V$。

**毕奥-萨伐尔定律 (Biot-Savart Law):**

$$
\boldsymbol{B}(\boldsymbol{r}) = \frac{\mu_0 I}{4\pi} \int \frac{d\boldsymbol{l}' \times \hat{R}}{R^2}
$$

**安培定律 (Ampere's Law):** (适用于高对称性，如圆柱、平面)

$$
\oint \boldsymbol{B} \cdot d\boldsymbol{l} = \mu_0 I_{\text{enc}} \implies \nabla \times \boldsymbol{B} = \mu_0\boldsymbol{J}
$$

\* 长同轴电缆 ($a < s < b$ 间隙处): $B = \frac{\mu_0 I}{2\pi s}\hat{\phi}$

\* 螺线管 (内部): $B = \mu_0 n I$ ($n$ = 单位长度匝数)

**磁矢势 $\boldsymbol{A}$ (Magnetic Vector Potential):**

$$
\boldsymbol{B} = \nabla \times \boldsymbol{A}, \quad \nabla \cdot \boldsymbol{B} = 0
$$

远场标准磁偶极子:

$$
\boldsymbol{A} = \frac{\mu_0}{4\pi} \frac{\boldsymbol{m} \times \hat{r}}{r^2} = \frac{\mu_0 (\pi \lambda \omega R^3)}{4\pi} \frac{\hat{z} \times \hat{r}}{r^2} = \frac{\mu_0 \lambda \omega R^3}{4 r^2} \sin\theta \hat{\phi}
$$

$$
\boldsymbol{B} = \frac{\mu_0 m}{4\pi r^3} (2\cos\theta \hat{r} + \sin\theta \hat{\theta}) = \frac{\mu_0 \lambda \omega R^3}{4 r^3} (2\cos\theta \hat{r} + \sin\theta \hat{\theta})
$$

库仑规范 ($\nabla \cdot \boldsymbol{A} = 0$) $\implies \nabla^2\boldsymbol{A} = -\mu_0\boldsymbol{J}$

$$
\boldsymbol{A}(\boldsymbol{r}) = \frac{\mu_0}{4\pi} \int \frac{\boldsymbol{J}(\boldsymbol{r}')}{|\boldsymbol{r}-\boldsymbol{r}'|} d\tau'
$$

**磁性介质与束缚电流:**磁化强度 $\boldsymbol{M}$ (单位体积的磁偶极矩)。

$$
\boldsymbol{J}_b = \nabla \times \boldsymbol{M} \quad \text{(体电流)}, \quad \boldsymbol{K}_b = \boldsymbol{M} \times \hat{n} \quad \text{(面电流)}
$$

$$
\boldsymbol{H} = \frac{\boldsymbol{B}}{\mu_0} - \boldsymbol{M} \implies \nabla \times \boldsymbol{H} = \boldsymbol{J}_f
$$

线性介质: $\boldsymbol{M} = \chi_m \boldsymbol{H}$, $\boldsymbol{B} = \mu\boldsymbol{H} = \mu_r\mu_0\boldsymbol{H}$。

**法拉第电磁感应定律:**

$$
\mathcal{E} = \oint \boldsymbol{E} \cdot d\boldsymbol{l} = -\frac{d\Phi_B}{dt} = -\frac{d}{dt} \int \boldsymbol{B} \cdot d\boldsymbol{A}
$$

微分形式: $\nabla \times \boldsymbol{E} = -\frac{\partial\boldsymbol{B}}{\partial t}$.

\* 楞次定律: 感应电流的方向总是阻碍磁通量 $\Phi_B$ 的变化。

\* *在半径为 $s$ 的圆形区域内有均匀变化的 $\boldsymbol{B}$:*

$$
E(r<s) = -\frac{r}{2}\frac{dB}{dt}; \quad E(r>s) = -\frac{s^2}{2r}\frac{dB}{dt}
$$

**电感 ($L$) 与 磁能 ($U$):**

$$
L = \frac{\Phi_B}{I}, \quad \mathcal{E} = -L\frac{dI}{dt}
$$

磁能密度: $u_B = \frac{1}{2}\boldsymbol{B}\cdot\boldsymbol{H} = \frac{B^2}{2\mu_0}$总磁能:

$$
U = \int u_B d\tau = \frac{1}{2}LI^2 \implies L = \frac{2U}{I^2}
$$

\* *同轴电缆单位长度自感:* $L/l = \frac{\mu_0}{2\pi}\ln(b/a)$。

**麦克斯韦方程组 (介质中):**

1. $\nabla \cdot \boldsymbol{D} = \rho_f$ (高斯定律)

2. $\nabla \cdot \boldsymbol{B} = 0$ (无磁单极子定律)

3. $\nabla \times \boldsymbol{E} = -\frac{\partial\boldsymbol{B}}{\partial t}$ (法拉第定律)

4. $\nabla \times \boldsymbol{H} = \boldsymbol{J}_f + \frac{\partial\boldsymbol{D}}{\partial t}$ (安培-麦克斯韦定律)

**坡印廷定理 (能量守恒):**

$$
\frac{\partial u}{\partial t} + \nabla \cdot \boldsymbol{S} = -\boldsymbol{J}_f \cdot \boldsymbol{E}
$$

坡印廷矢量 (能流密度): $\boldsymbol{S} = \boldsymbol{E} \times \boldsymbol{H} = \frac{1}{\mu}(\boldsymbol{E} \times \boldsymbol{B})$。

**波动方程 (无源、LIH 介质):**

$$
\nabla^2\boldsymbol{E} = \mu\epsilon\frac{\partial^2\boldsymbol{E}}{\partial t^2}, \quad v = \frac{1}{\sqrt{\mu\epsilon}}
$$

**平面波:** $\boldsymbol{E} = \boldsymbol{E}_0 e^{i(\boldsymbol{k}\cdot\boldsymbol{r} - \omega t)}$

\* 色散关系: $k = \omega\sqrt{\mu\epsilon} \implies \omega = vk$。

\* 正交性: $\boldsymbol{k} \cdot \boldsymbol{E} = 0, \quad \boldsymbol{B} = \frac{1}{\omega}(\boldsymbol{k} \times \boldsymbol{E}) = \frac{1}{v}(\hat{k} \times \boldsymbol{E})$。

\* 振幅关系: $B_0 = E_0 / v$。

\* 能量: $u_E = u_B$, $u = \epsilon E^2$. 时间平均 $\langle\boldsymbol{S}\rangle = \frac{1}{2}\epsilon v E_0^2 \hat{k}$。

**复介电常数 (吸收介质):**若 $\epsilon = \epsilon_1 + i\epsilon_2$, 波矢变为复数 $k = k_1 + ik_2$。

$$
k_{1} = \omega\sqrt{\frac{\mu_0(|\epsilon|+\epsilon_1)}{2}}, \quad k_{2} = \omega\sqrt{\frac{\mu_0(|\epsilon|-\epsilon_1)}{2}}
$$

\* 衰减: 波的振幅随 $e^{-k_2 z}$ 呈指数衰减。

\* 趋肤深度: $\delta = 1/k_2$。相速度 $v_p = \omega/k_1$。

**波的叠加与速度:**两列波 $\omega_1 \approx \omega_2$, $k_1 \approx k_2$ 叠加会产生拍频 (beats)。

\* 载波相速度 (Phase velocity): $v_p = \bar{\omega}/\bar{k} = \omega/k$。

\* 包络群速度 (Group velocity): $v_g = d\omega/dk$。

界面位于 $x=0$。入射波 (I)、反射波 (R)、透射波 (T):

$$
E_I = \tilde{E}_{0I} e^{i(k_{1}x\cos \theta_I + k_{1}y\sin \theta_I - \omega t)}\hat{z}
$$

$$
E_R = \tilde{E}_{0R} e^{i(-k_{1}x\cos \theta_R + k_{1}y\sin \theta_R - \omega t)}\hat{z}
$$

$$
E_T = \tilde{E}_{0T} e^{i(k_{2}x\cos \theta_T + k_{2}y\sin \theta_T - \omega t)}\hat{z}
$$

斯涅尔定律 (Snell's Law): $\theta_I = \theta_R, \quad n_1\sin\theta_I = n_2\sin\theta_T$。

**边界条件:** $\boldsymbol{E}_{\parallel}$，$\boldsymbol{B}_{\perp}$ 连续；$\boldsymbol{B}_{\parallel}/\mu$，$\boldsymbol{D}_{\perp}$ 连续。

**TE 模式 / s-极化 ($\boldsymbol{E} \perp$ 入射面):**令 $\alpha = \frac{\cos\theta_T}{\cos\theta_I}$, $\beta = \frac{\mu_1 v_1}{\mu_2 v_2} \approx \frac{n_2}{n_1}$ (若 $\mu_1=\mu_2$)。

$$
r = \frac{\tilde{E}_{0R}}{\tilde{E}_{0I}} = \frac{1 - \alpha\beta}{1 + \alpha\beta}, \quad t = \frac{\tilde{E}_{0T}}{\tilde{E}_{0I}} = \frac{2}{1 + \alpha\beta}
$$

\* 反射率 $R = |r|^2$. 透射率 $T = \alpha\beta |t|^2$. $R+T=1$.

\* *布儒斯特角:* 发生于反射波振幅 $r=0$ 时。对于 TE 模式，要求 $1-\alpha\beta=0 \implies n_1=n_2$。因此，**TE 模式不存在布儒斯特角**。

**TM 模式 / p-极化 ($\boldsymbol{B} \perp$ 入射面):**

$$
r = \frac{\alpha - \beta}{\alpha + \beta}, \quad t = \frac{2}{\alpha + \beta}
$$

\* *布儒斯特角:* 发生于 $\alpha=\beta$ 时。$\theta_B \approx \arctan(n_2/n_1)$。

由 $\phi$ 和 $\boldsymbol{A}$ 求解电磁场:

$$
\boldsymbol{E} = -\nabla\phi - \frac{\partial\boldsymbol{A}}{\partial t}, \quad \boldsymbol{B} = \nabla \times \boldsymbol{A}
$$

\* 洛伦兹规范: $\nabla \cdot \boldsymbol{A} = -\mu_0\epsilon_0\frac{\partial\phi}{\partial t}$。这使得 $\phi$ 和 $\boldsymbol{A}$ 的波动方程完全解耦。

\* *示例:* 若 $\phi=0$, $\boldsymbol{A} = A_0\sin(kx-\omega t)\hat{y}$。

则 $\boldsymbol{E} = A_0\omega\cos(\dots)\hat{y}$, $\boldsymbol{B} = A_0 k\cos(\dots)\hat{z}$。

必须要求 $\omega = ck$ 才能满足真空麦克斯韦方程组。

**球坐标系基矢转换:** $x=r\sin\theta\cos\phi$, $y=r\sin\theta\sin\phi$, $z=r\cos\theta$.

$\hat{x}= \sin\theta\cos\phi\hat{r} + \cos\theta\cos\phi\hat{\theta} - \sin\phi\hat{\phi}$

$\hat{y}= \sin\theta\sin\phi\hat{r} + \cos\theta\sin\phi\hat{\theta} + \cos\phi\hat{\phi}$

$\hat{z} = \cos\theta \hat{r} - \sin\theta \hat{\theta}$

$\hat{\phi} = -\sin\phi\hat{x} + \cos\phi\hat{y}$

$\hat{\theta} = \cos\theta\cos\phi\hat{x} + \cos\theta\sin\phi\hat{y} - \sin\theta\hat{z}$

$\hat{r} = \sin\theta\cos\phi\hat{x} + \sin\theta\sin\phi\hat{y} + \cos\theta\hat{z}$

**球坐标系正交关系:**

$\hat{r} \times \hat{\theta} = \hat{\phi}, \quad \hat{\theta} \times \hat{\phi} = \hat{r}, \quad \hat{\phi} \times \hat{r} = \hat{\theta}$

**球坐标系下的梯度与散度:**

$$
\nabla f = \frac{\partial f}{\partial r}\hat{r} + \frac{1}{r}\frac{\partial f}{\partial \theta}\hat{\theta} + \frac{1}{r\sin\theta}\frac{\partial f}{\partial \phi}\hat{\phi}
$$

$$
\nabla \cdot \boldsymbol{A} = \frac{1}{r^2}\frac{\partial}{\partial r}(r^2 A_r) + \frac{1}{r\sin\theta}\frac{\partial}{\partial \theta}(\sin\theta A_\theta) + \frac{1}{r\sin\theta}\frac{\partial A_\phi}{\partial \phi}
$$

**1. 电介质与电容:**

$$
Q_f \xrightarrow{\oint \boldsymbol{D}\cdot d\boldsymbol{A} = Q_f} \boldsymbol{D} \xrightarrow{\boldsymbol{E}=\frac{\boldsymbol{D}}{\epsilon}} \boldsymbol{E} \xrightarrow{\int \boldsymbol{E}\cdot d\boldsymbol{l}} V \implies C = \frac{Q_f}{V}
$$

\* **求束缚电荷:** $\boldsymbol{P} = \boldsymbol{D} - \epsilon_0\boldsymbol{E} \implies \rho_b = -\nabla\cdot\boldsymbol{P}, \sigma_b = \boldsymbol{P}\cdot\hat{n}_{out}$

**2. 磁介质与电感:**

$$
I_f \xrightarrow{\oint \boldsymbol{H}\cdot d\boldsymbol{l} = I_f} \boldsymbol{H} \xrightarrow{\boldsymbol{B}=\mu\boldsymbol{H}} \boldsymbol{B} \xrightarrow{\int \boldsymbol{B}\cdot d\boldsymbol{A}} \Phi_B \implies L = \frac{\Phi_B}{I_f}
$$

\* **能量法求电感:** $U = \int \frac{B^2}{2\mu} d\tau \implies L = \frac{2U}{I_f^2}$

\* **求束缚电流:** $\boldsymbol{M} = \frac{\boldsymbol{B}}{\mu_0} - \boldsymbol{H} \implies \boldsymbol{J}_b = \nabla\times\boldsymbol{M}, \boldsymbol{K}_b = \boldsymbol{M}\times\hat{n}_{out}$

**3. 变磁场与感应电场:**

$$
\boldsymbol{B}(t) \xrightarrow{\int \boldsymbol{B}\cdot d\boldsymbol{A}} \Phi_B(t) \xrightarrow{-\frac{d}{dt}} \mathcal{E} \xrightarrow{\oint \boldsymbol{E}\cdot d\boldsymbol{l} = \mathcal{E}} \boldsymbol{E}_{ind}
$$

\* **能量流验证:** $\boldsymbol{S} = \frac{1}{\mu_0}(\boldsymbol{E}\times\boldsymbol{B}) \xrightarrow{\oint \boldsymbol{S}\cdot d\boldsymbol{A}} P_{in} = \frac{dU_B}{dt}$

**4. 电磁波界面透射/反射:**

① :画出界面，利用斯涅尔定律定 $\boldsymbol{k}_I, \boldsymbol{k}_R, \boldsymbol{k}_T$ 方向。

② : $\boldsymbol{E} \perp$ 入射面(TE) 或 $\boldsymbol{B} \perp$ 入射面(TM)。

③ : 用 $\boldsymbol{B} = \frac{1}{v}(\hat{k}\times\boldsymbol{E})$ 或 $\boldsymbol{E} = -v(\hat{k}\times\boldsymbol{B})$ 补全所有场。

④ : 界面处 $\boldsymbol{E}_{\parallel}$ 连续，$\boldsymbol{B}_{\parallel}/\mu$ 连续。

⑤ : 联立方程组，解出 $r$ 和 $t$。

\* **Permittivity** - 介电常数 ($\epsilon$)

\* **Permeability** - 磁导率 ($\mu$)

\* **Method of Images** - 镜像法

\* **Multipole Expansion** - 多极展开

\* **Electric Displacement** - 电位移矢量 ($\boldsymbol{D}$)

\* **Magnetic Vector Potential** - 磁矢势 ($\boldsymbol{A}$)

\* **Poynting Vector** - 坡印廷矢量 / 能流密度 ($\boldsymbol{S}$)

\* **Dispersion Relation** - 色散关系

\* **Phase Velocity / Group Velocity** - 相速度 / 群速度

\* **Attenuation** - 衰减

\* **Brewster's Angle** - 布儒斯特角

\* **Polarization** - 极化 (介质中) / 偏振 (电磁波)

\* **Indutance** - 电感 ($L$)

设带电量为 $q$ 的点电荷位于坐标原点，一个半径为 $R$、长度为 $L$、均匀体电荷密度为 $\rho$ 的实心圆柱体被放置在 $z$ 轴上。圆柱靠近原点的一端位于 $z=d$ 处，较远的一端位于 $z=d+L$ 处。

$$
E_z = \int_d^{d+L} \frac{\rho}{2\epsilon_0} \left( 1 - \frac{z}{\sqrt{z^2 + R^2}} \right) dz
$$

$$
= \frac{\rho}{2\epsilon_0} \left( L + \sqrt{d^2 + R^2} - \sqrt{(d+L)^2 + R^2} \right)
$$

$$
F = \frac{q \rho}{2\epsilon_0} \left( L + \sqrt{d^2 + R^2} - \sqrt{(d+L)^2 + R^2} \right)
$$

---

## PDF 原文 { #pdf }

[打开原文件](../../../assets/electrodynamics-midterm-cheatsheet.pdf){ .md-button target="_blank" rel="noopener" }
[下载 PDF](../../../assets/electrodynamics-midterm-cheatsheet.pdf){ .md-button download="electrodynamics-midterm-cheatsheet.pdf" }

若下方预览无法显示，可直接打开原文件或下载后阅读。

<div style="height: 800px; width: 100%;">
    <embed src="../../../assets/electrodynamics-midterm-cheatsheet.pdf" type="application/pdf" width="100%" height="100%">
</div>
