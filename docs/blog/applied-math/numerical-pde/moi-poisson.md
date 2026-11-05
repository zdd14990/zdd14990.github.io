---
title: MOI Poisson
date: 2026-11-05
render_macros: false
description: 用镜像延拓处理横向周期、两壁零 Dirichlet 的 Poisson 问题，说明周期势与 Chebyshev 体源 FMM 的连接，并验证目标裁剪的正确性与性能。
hide:
  - navigation
categories:
  - 应用数学
  - PDE 数值解
tags:
  - poisson-equation
  - method-of-images
  - fmm
  - adaptive-mesh
---

# MOI Poisson

求解横向周期、两壁零 Dirichlet 的 Poisson 问题：

\[
\boxed{
\Delta u=f\quad\text{于 }D=(0,1)\times(0,1),\qquad
u(x+1,z)=u(x,z),\qquad
u(x,0)=u(x,1)=0.
}
\]

令 \(\Omega=[0,2)^2\)。将 \(f\) 延拓为

\[
F(x,z)=
\begin{cases}
 f(x,z),&(x,z)\in Q_0,\\
 f(x-1,z),&(x,z)\in Q_1,\\
-f(x,2-z),&(x,z)\in Q_2,\\
-f(x-1,2-z),&(x,z)\in Q_3,
\end{cases}
\]

其中 \(Q_0,Q_1,Q_2,Q_3\) 分别是左下、右下、左上、右上四个单位正方形。

这个延拓满足

\[
F(x+1,z)=F(x,z),\qquad F(x,2-z)=-F(x,z),
\qquad \int_\Omega F=0.
\]

因此可以解零均值周期问题

\[
\boxed{
\Delta U=F\quad\text{于 }\Omega,\qquad
U\text{ 在两个方向周期 }2,\qquad
\int_\Omega U=0.
}
\]

由反射对称性和零均值周期解的唯一性，

\[
U(x,2-z)=-U(x,z).
\]

于是

\[
U(x,1)=0,\qquad U(x,0)=-U(x,2)=-U(x,0)=0.
\]

同理，\(U(x+1,z)=U(x,z)\)。所以

\[
\boxed{u=U|_D.}
\]

定义边长 2 的周期 Green 函数：

\[
\boxed{
G_\Omega(x,z)=
-\frac1{4\pi^2}
\sum_{\substack{m,n\in\mathbb Z\\(m,n)\ne(0,0)}}
\frac{e^{i\pi(mx+nz)}}{m^2+n^2}.
}
\]

记 \(r=(x,z)\)，\(\delta_{\rm per}\) 为周期格点 \(2\mathbb Z^2\) 上的 Dirac 点质量之和，则

\[
\Delta G_\Omega(r)=\delta_{\rm per}(r)-\frac14,
\qquad \int_\Omega G_\Omega=0.
\]


令 \(y\in\Omega\) 为源点，周期解为

\[
U(r)=\int_\Omega G_\Omega(r-y)F(y)\,dy.
\]

这就是我们最终希望计算的周期势。它满足 
自由空间核为

\[
G_0(r)=\frac{\log|r|}{2\pi},\qquad \Delta G_0=\delta_0,
\]

其中 \(\delta_0\) 是原点的 Dirac 点质量。原先我们有的算法是用 \(G_0\) 这个自由空间核计算近场的 FMM，对于远场我们使用 \(G_\Omega\) 这个周期核。

设完整扩展树的盒集合为 \(\mathcal T_\Omega\)，叶盒集合为 \(\mathcal L_\Omega\)。对叶盒 \(C\)，将其坐标线性映到 \([-1,1]^2\)，记为 \((\xi_C,\eta_C)\)。由该盒 \(8\times8\) 个节点值作 Chebyshev 变换，得到系数 \(a_{jk}^C\)。底层积分保留总次数不超过 7 的项，故定义实际使用的源多项式和分片源为

\[
F_C(y)=\sum_{j,k\ge0,\ j+k\le7}a_{jk}^C T_j(\xi_C(y))T_k(\eta_C(y)),
\qquad
F_h(y)=F_C(y)\quad(y\in C),
\]

其中 \(T_j\) 是第一类 Chebyshev 多项式。\(\int_\Omega F_h\,dA=0\)。

对目标叶盒 \(B\)，令 \(\mathcal N(B)\) 为原 FMM 直接积分的近场源盒列表。跨周期缝时，列表中的盒包含位移：若 \(C=C_0+2\ell\)，其中 \(C_0\in\mathcal L_\Omega\)、\(\ell\in\mathbb Z^2\)，则 \(F_C(y)=F_{C_0}(y-2\ell)\)。近场积分、盒中心及远场平移都使用这一坐标约定。

从周期势中减去这部分近场，定义

\[
\boxed{
V_{\rm far}^B(w)=\int_\Omega G_\Omega(w-y)F_h(y)\,dA_y
-\sum_{C\in\mathcal N(B)}\int_CG_0(w-y)F_C(y)\,dA_y.
}
\]

记 \(F_h^{\rm per}\) 为 \(F_h\) 的周期延拓，\(\mathbf1_C\) 为盒 \(C\) 的示性函数。原近远场划分使目标盒附近的源全部包含在近场项内，于是该邻域中

\[
\Delta V_{\rm far}^B
=F_h^{\rm per}-\frac14\int_\Omega F_h\,dA
-\sum_{C\in\mathcal N(B)}\mathbf1_CF_C=0.
\]

调和的是扣除近场后的完整势。单独的核差在原点附近满足 \(\Delta(G_\Omega-G_0)=-1/4\)，零均值源积分才消去这一背景项。

将平面点认作复数 \(w=x+iz\)，盒中心记为 \(c_B\)，局部展开为

\[
V_{\rm far}^B(w)=\operatorname{Re}\sum_{n=0}^{\infty}L_n^B(w-c_B)^n.
\]

\(\operatorname{Re}\) 表示取实部，\(L_n^B\) 是局部展开系数；计算中截断到阶数 \(p\)。这些系数同时包含普通远源和扣除显式交互后剩余的周期作用。现有 FMM 先对全部叶源形成多极展开、向上合并，再由根部多极展开作周期转换，初始化根部局部展开；其余远场交互按原列表累加并向下传递。近场则用已有的多项式体积分权重计算。这样得到的是上式周期势的近远场分解。

## 3. 目标裁剪

原先的 \(2\times2\) 镜像延拓（MOI）在目标端处理四份目标树，但只需输出物理域 \(D\) 内的节点。令物理目标叶盒集合为 \(\mathcal L_D\)，这些叶盒及其祖先组成 \(\mathcal T_D\)。

原 FMM 对 \(\mathcal T_\Omega\) 中的全部目标盒形成局部展开，再对 \(\mathcal L_\Omega\) 中的全部目标叶盒计算近场积分和节点值。目标裁剪将这两个遍历范围改为

\[
\boxed{
\mathcal T_\Omega\longrightarrow\mathcal T_D,
\qquad
\mathcal L_\Omega\longrightarrow\mathcal L_D.
}
\]

全部镜像源、源展开、上行和周期作用保留。对保留的目标盒，远场列表 \(\mathcal I(B)\) 和近场列表 \(\mathcal N(B)\) 仍来自完整扩展源树；\(\mathcal I(B)\) 表示在该盒接收的远场源盒交互，包含原自适应划分中的不同层级和周期位移交互。

根盒的局部展开由周期转换初始化。对非根盒 \(B\in\mathcal T_D\)，仍使用原递推式（\(0\le n\le p\)）：

\[
L_n^B
=
L_n^{B\leftarrow\operatorname{parent}(B)}
+
\sum_{C\in\mathcal I(B)}L_n^{B\leftarrow C}.
\]

这里 \(L_n^{B\leftarrow\operatorname{parent}(B)}\) 是父盒局部展开移到 \(c_B\) 后的系数，\(L_n^{B\leftarrow C}\) 是源盒 \(C\) 对该系数的贡献；有限阶计算沿用原 FMM 的截断规则。

对于物理目标叶盒 \(B\in\mathcal L_D\)，在其 Chebyshev 节点集合 \(X_B\) 上计算近似解 \(u_h\)：

\[
\boxed{
u_h(w)=
\operatorname{Re}\sum_{n=0}^{p}L_n^B(w-c_B)^n
+
\sum_{C\in\mathcal N(B)}
\int_CG_0(w-y)F_C(y)\,dA_y,
\qquad w\in X_B.
}
\]

物理目标及其祖先的计算依赖全部保留，外部目标输出不参与源上行。因此，保留目标接收的源贡献、交互划分和求值公式不变；裁剪只改变哪些目标执行这些公式。

省去的计算：

- 对 \(B\in\mathcal T_\Omega\setminus\mathcal T_D\)，跳过其不再需要的远场接收和下行计算；
- 对 \(B\in\mathcal L_\Omega\setminus\mathcal L_D\)，不再计算
  \[
  \left\{
  \operatorname{Re}\sum_{n=0}^{p}L_n^B(w-c_B)^n
  \right\}_{w\in X_B},
  \qquad
  \left\{
  \sum_{C\in\mathcal N(B)}
  \int_CG_0(w-y)F_C(y)\,dA_y
  \right\}_{w\in X_B}.
  \]


## 4. 实现要点

原型复用底层已有的目标开关：`iperiod=2` 将 `localonoff` 设为仅根盒和左下物理象限开启，远场接收、近场积累与节点求值在 FMM 内部按此开关跳过外部目标。所有源仍形成展开并上行，根部周期转换也保留。根向四个孩子的公共下行仍会执行，源侧方向展开及完整树工作空间也仍在，因此 \(\mathcal T_\Omega\to\mathcal T_D\) 描述的是所需目标依赖，实际操作量并非严格降为四分之一。见[目标开关与上行](<../../../assets/moi-poisson/sources/adaptfmm2d8.f.txt>)、[公共下行](<../../../assets/moi-poisson/sources/adaptfmm2d8.f.txt>)。

这个入口同时改变长度尺度。按本文 \(\Delta U=F\) 的记号，旧入口将边长 2 的根盒归一化为边长 1；令 \(r'=r/2\)、\(U'(r')=U(2r')\)，则

\[
\Delta_{r'}U'(r')=4F(2r').
\]

新入口直接使用边长 2，源因子由 4 改为 1，叶盒长度翻倍。源系数与盒面积的乘积保持不变；近场权重、平移尺度和长度对数项也须一起换算。见[入口缩放](<../../../assets/moi-poisson/sources/hho_ops.f90.txt>)及[原型说明](<../../../assets/moi-poisson/sources/RESULTS.md.txt>)。

裁剪后只有物理象限输出有效，不能用含未求值项的全胞数组计算均值。原型保留周期转换的常数和一次项修正，跳过原全胞输出均值校正；物理域均值由壁条件决定，也不能清零。例如 \(f=1\) 时

\[
u=\frac{z(z-1)}2,\qquad \int_Du\,dA=-\frac1{12}.
\]

若继续应用 \(\Delta^{-1}\)，须从物理输出重新作镜像延拓。见[均值处理与延拓](<../../../assets/moi-poisson/sources/hho_ops.f90.txt>)、[周期转换](<../../../assets/moi-poisson/sources/fmmrouts8_before.f.txt>)。

## 5. 正确性与性能实验

以下均使用每叶 \(8\times8\) 个第一类 Chebyshev 根节点和 `iprec=4`。令 \(X_D=\bigcup_{B\in\mathcal L_D}X_B\)，\(u\) 为解析解，\(u_h^{(m)}\) 为模式 \(m\) 的节点解，定义

\[
E_m=\frac{\max_{w\in X_D}|u_h^{(m)}(w)-u(w)|}
{\max_{w\in X_D}|u(w)|},\qquad
E_{\rm diff}=\frac{\max_{w\in X_D}|u_h^{(\rm clip)}(w)-u_h^{(\rm old)}(w)|}
{\max_{w\in X_D}|u(w)|}.
\]

其中 `old`、`clip` 分别表示原 MOI、裁剪 MOI。原始接口采用相反的势符号；数值势和解析势同时换成本文 \(\Delta^{-1}\) 的符号后，这些误差数值不变。

### 5.1 壁条件、势常数与非对称树

先用下列解析解检查镜像壁条件和势常数：

\[
\begin{aligned}
f=\sin(\pi z)&:\quad u=-\frac{\sin(\pi z)}{\pi^2},\qquad \int_Du\,dA=-\frac2{\pi^3},\\
f=1&:\quad u=\frac{z(z-1)}2,\qquad \int_Du\,dA=-\frac1{12}.
\end{aligned}
\]

两者都具有非零物理均值；常源在壁上不为零，奇延拓在壁面有跳跃，仍给出所需的零 Dirichlet 解。另取 \(f=\cos(2\pi x)\sin(\pi z)\)，其解为 \(u=-f/(5\pi^2)\)，检查横向周期缝与非对称加密。

下表取已有验证中**单次** \(\Delta^{-1}\) 的记录。`asym4to6` 从物理层级 4 加密到 6，在 \((0.035,0.07)\) 和 \((0.68,0.96)\) 附近形成不互为反射的加密区，覆盖横向周期缝与上下壁。

| 物理树 / 叶数 | 源 | 原 MOI 的 \(E_{\rm old}\) | 裁剪 MOI 的 \(E_{\rm clip}\) | \(E_{\rm diff}\) |
| --- | --- | ---: | ---: | ---: |
| 均匀 / 64 | \(\sin(\pi z)\) | \(9.43\times10^{-15}\) | \(1.18\times10^{-14}\) | \(6.30\times10^{-15}\) |
| 均匀 / 64 | \(1\) | \(4.91\times10^{-14}\) | \(4.78\times10^{-14}\) | \(2.00\times10^{-15}\) |
| asym4to6 / 565 | \(\cos(2\pi x)\sin(\pi z)\) | \(8.41\times10^{-14}\) | \(8.34\times10^{-14}\) | \(3.42\times10^{-15}\) |

验证还将叶内插值多项式求值到真实壁面：在每壁 129 个等距点上，前两例裁剪解的最大壁值除以解析解节点最大值，分别为 \(8.86\times10^{-14}\)、\(4.79\times10^{-14}\)。这些记录同时检验了势的绝对常数，而不只是新旧输出相近。数据见[正确性原始记录](<../../../assets/moi-poisson/data/kclip_verify_20261104_203933/verify.csv>)，树和边界求值见[验证驱动](<../../../assets/moi-poisson/sources/kclip_probe.f90.txt>)。

### 5.2 公平计时的源与误差

性能比较选择原文的三个源：

$$
f_1=\sin(2\pi x)\sin(2\pi z),\qquad
f_2=\sin(6\pi x)\sin(4\pi z),\qquad
f_3=f_1+0.3f_2.
$$

其解析解为

$$
\Delta^{-1}f_1=-\frac{f_1}{8\pi^2},\qquad
\Delta^{-1}f_2=-\frac{f_2}{52\pi^2},\qquad
\Delta^{-1}f_3=-\frac{f_1}{8\pi^2}-\frac{0.3f_2}{52\pi^2}.
$$

这三个解析解既满足两壁零值，又在 \(x,z\) 方向周期 1 且均值为零，所以 MOI 与双周期基线（DP）求得同一解，适合公平计时；壁条件与非零势均值由上一组测试单独检查。

本批取 64、256、1024 个物理叶的三棵均匀固定树，每树三个源，共 9 个配置。运行固定在一个逻辑核，正常优先级，OMP、OPENBLAS、MKL、NUMEXPR 线程数均为 1。每个配置三模式共同预热至少 8 秒，再计时 9 轮。以 1、2、3 表示原 MOI、裁剪 MOI、DP，块次序依次为 `123321`、`231132`、`312213`，循环三次；每块分别调用 16、8、3 次，对应上述三种叶数。

计时覆盖完整 Poisson 调用：驱动输出清零、包装层数组分配、源延拓、缓存清零、FMM、相应的常数处理和物理输出取回。物理树与扩展树构造、源采样、预热、误差计算和文件写出均在计时之外。三模式共享缓存前端和底层 FMM 对象。见[计时驱动](<../../../assets/moi-poisson/sources/kclip_sweep.f90.txt>)、[运行及汇总程序](<../../../assets/moi-poisson/sources/run_sweep.py.txt>)。

设第 \(r\) 轮模式 \(m\) 的两个对称块，其每次调用平均耗时为 \(b_{m,r,1}\)、\(b_{m,r,2}\)，定义

\[
t_{m,r}=\frac{b_{m,r,1}+b_{m,r,2}}2,\qquad
\bar t_m=\frac19\sum_{r=1}^9t_{m,r},
\]

\[
R_r=\frac{t_{{\rm clip},r}}{t_{{\rm DP},r}},\qquad
S_r=1-\frac{t_{{\rm clip},r}}{t_{{\rm old},r}},\qquad
\bar R=\frac19\sum_{r=1}^9R_r,\qquad
\bar S=\frac19\sum_{r=1}^9S_r.
\]

\(\bar R\) 是逐轮配对比值的平均，一般不等于 \(\bar t_{\rm clip}/\bar t_{\rm DP}\)；\(\bar S\) 是配对节省比例。下表保留双模态 \(f_3\) 的绝对耗时均值 \(\bar t_m\) 和 \(\bar S\)：

| 物理叶数 | 原 MOI / ms | 裁剪 MOI / ms | DP / ms | 相对原 MOI 的配对节省 |
| ---: | ---: | ---: | ---: | ---: |
| 64 | 10.97 | 4.79 | 3.20 | 56.4% |
| 256 | 42.04 | 17.26 | 11.19 | 58.9% |
| 1024 | 148.98 | 60.30 | 36.51 | 59.3% |

三种模式的节点误差在相同源、相同树上基本相同。汇总先对每模式的 18 个计时块取 \(E_m\) 最大值；下表除 1024 叶 \(f_1\) 一格保留三模式范围外，其余各格列三模式最大值：

| 物理叶数 | $f_1$ | $f_2$ | $f_3$ |
| ---: | ---: | ---: | ---: |
| 64 | $2.20\times10^{-10}$ | $9.03\times10^{-7}$ | $4.16\times10^{-8}$ |
| 256 | $7.46\times10^{-13}$ | $1.55\times10^{-9}$ | $7.18\times10^{-11}$ |
| 1024 | $(0.8\text{–}2.3)\times10^{-14}$ | $4.68\times10^{-12}$ | $2.20\times10^{-13}$ |

九个配置的新旧节点差均满足 \(E_{\rm diff}<1.9\times10^{-14}\)。当前表、图均来自同一批[均匀树汇总](<../../../assets/moi-poisson/data/kclip_sweep_20261105_004613/uniform_summary.csv>)；对应[逐块原始数据](<../../../assets/moi-poisson/data/kclip_sweep_20261105_004613/raw.csv>)和[逐轮配对数据](<../../../assets/moi-poisson/data/kclip_sweep_20261105_004613/paired_rounds.csv>)保留了完整记录。

![MOI/DP 耗时比](<../../../assets/moi-poisson/figures/kclip_sweep_ratios.svg>)

图中点为各配置的 \(\bar R\)，误差棒为 9 轮配对比值的样本标准差；这些轮次共享同一进程和缓存，误差棒表示轮间波动。图由[绘图脚本](<../../../assets/moi-poisson/sources/kclip_sweep_figures.py.txt>)读取上述均匀树汇总生成。

九个配置的裁剪 MOI / DP 平均配对比为 1.49–1.68，相对原 MOI 的配对节省为 56.4%–59.3%。这些范围比较的是配置均值；例如 1024 叶 \(f_3\) 的单轮比值为 1.34–2.24，仍存在计时波动。

## 6. 结论

镜像延拓把壁条件转为周期源的奇对称性；周期势扣除原近场后形成调和局部展开，因而可以继续使用现有 Chebyshev 体源 FMM。目标裁剪保留全部源贡献和物理目标的计算依赖，省去外部目标的远场接收、下行和叶节点求值。

已有正确性数据检验了非零物理均值、壁上非零的源以及非对称自适应树上的新旧一致性。当前均匀固定树实验中，完整 Poisson 调用节省约 56%–59%，裁剪耗时约为 DP 的 1.6 倍。这一倍数来自实测；四份源、一份目标只说明裁剪方向。现有数据没有分阶段计时，尚不能给出实际阶段占比或变树、完整时间步的加速比。