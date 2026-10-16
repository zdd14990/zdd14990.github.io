---
title: RB 学习笔记
date: 2026-09-18
code_notes: inline
description: 从二维热方程到 Rayleigh–Bénard 对流：用 Fortran 实现 FGT 热传播、自适应网格与无滑移流体求解器，附完整代码与算法解析。
hide:
  - navigation
categories:
  - 应用数学
  - PDE 数值解
tags:
  - applied-math
  - numerical-pde
  - fortran
  - heat-equation
  - fgt
  - adaptive-mesh
  - rayleigh-benard
---

# RB 学习笔记

从二维热方程出发，用 Fortran 逐步实现 FGT 热传播、自适应四叉树、无滑移 Stokes、Navier–Stokes 与 Rayleigh–Bénard 对流求解器。


<!--
批注维护说明（仅编辑本文件即可）：
1. code_notes: inline 启用文章内绑定，不再读取 data/rb-code-notes.json。
2. 完整 Fortran 代码中的 ! @note-start 标识 与 ! @note-end 标识
   圈定可触发批注的代码；标记在网页和复制出的代码中隐藏。
3. 讲解区域用 HTML 注释 note-start: 标识 和 note-end: 标识 包围，
   实际语法可参考下文；区域内可以直接增删文字、公式、列表、表格和代码片段。
4. 标识固定不变，无需随章节编号、代码行号或段落位置更新。
   新建批注时使用一个全篇唯一的代码标识，并添加对应讲解区域。
5. 同一段讲解可供多个批注使用：在起止注释中填写相同的空格分隔标识列表。
   同一标识也可对应多段讲解；讲解标题取自所在的小节，按文章顺序显示。
6. 代码范围与讲解范围各自不能嵌套；起止标识必须配对。
   不要把完整 module/program 放进讲解范围，示例片段可以正常放入。
-->

## Chapter 1：混合边界热方程的直接传播

### 1. 目标

考虑单位方盒上的温度扰动 $\theta=T-(1-z)$：

$$
\theta_t=D\Delta\theta,\qquad
\theta(x,0,t)=\theta(x,1,t)=0,\qquad
\theta(x+1,z,t)=\theta(x,z,t).
$$

### 2. 完整代码

```fortran
module heat_direct
    use iso_fortran_env, only: real64
    implicit none
    private

    integer, parameter, public :: rk = real64
    real(rk), parameter :: pi = acos(-1.0_rk)

    public :: heat_step

contains

    ! @note-start heat_direct-note-1
    function gaussian(r, delta) result(g)
        real(rk), intent(in) :: r, delta
        real(rk) :: g

        g = exp(-r*r/delta) / sqrt(pi * delta)
    end function gaussian
    ! @note-end heat_direct-note-1

    ! @note-start heat_direct-note-2
    subroutine heat_step(source, x, z, D, h, images, u)
        real(rk), intent(in) :: source(:, :)
        real(rk), intent(in) :: x(:), z(:), D, h
        integer, intent(in) :: images
        real(rk), intent(out) :: u(size(x), size(z))

        real(rk) :: kx(size(x), size(source, 1))
        real(rk) :: kz(size(z), size(source, 2))
        real(rk) :: delta, q, shift
        integer :: n, i, j, p
    ! @note-end heat_direct-note-2

        n = size(source, 1)

        if (n < 1 .or. size(source, 2) /= n) error stop "source must be a square array"

        if (D <= 0.0_rk .or. h <= 0.0_rk .or. images < 0) error stop "invalid heat parameters"

        ! @note-start heat_direct-note-3
        delta = 4.0_rk * D * h
        kx = 0.0_rk
        kz = 0.0_rk
        ! @note-end heat_direct-note-3

        do i = 1, size(x)
            do j = 1, n
                ! @note-start heat_direct-note-4
                q = (real(j, rk) - 0.5_rk) / real(n, rk)
                ! @note-end heat_direct-note-4

        ! @note-start heat_direct-note-5
                do p = -images, images
                    shift = real(p, rk)
                    kx(i, j) = kx(i, j) + gaussian(x(i) - q + shift, delta)
                end do
            end do
        end do
        ! @note-end heat_direct-note-5

        do i = 1, size(z)
            do j = 1, n
                ! @note-start heat_direct-note-6
                q = (real(j, rk) - 0.5_rk) / real(n, rk)
                ! @note-end heat_direct-note-6

        ! @note-start heat_direct-note-7
                do p = -images, images
                    shift = 2.0_rk * real(p, rk)
                    kz(i, j) = kz(i, j) + gaussian(z(i) - q + shift, delta)-gaussian(z(i) + q + shift, delta)
                end do
            end do
        end do
        ! @note-end heat_direct-note-7

    ! @note-start heat_direct-note-8
        u = matmul(kx, matmul(source, transpose(kz))) / real(n, rk)**2
    end subroutine heat_step
    ! @note-end heat_direct-note-8
end module heat_direct
```

### 3. 传播公式

二维热方程经过时间 $h$ 的自由空间热核为

$$
G_h(x-\xi,z-\eta)
=
\frac{1}{4\pi Dh}
\exp\left[-\frac{(x-\xi)^2+(z-\eta)^2}{4Dh}\right].
$$

<!-- note-start: heat_direct-note-1 heat_direct-note-3 -->

令

$$
\delta=4Dh,\qquad
g_\delta(r)=\frac{e^{-r^2/\delta}}{\sqrt{\pi\delta}},
$$

<!-- note-end: heat_direct-note-1 heat_direct-note-3 -->

<!-- note-start: heat_direct-note-1 -->

则二维核可以分离为

$$
G_h(x-\xi,z-\eta)
=
g_\delta(x-\xi)\,g_\delta(z-\eta).
$$

`gaussian(r, delta)` 实现的是这个**一维归一化核**。两个方向相乘后，归一化因子已经是 $1/(\pi\delta)=1/(4\pi Dh)$，后面不再额外乘一次二维热核系数。

<!-- note-end: heat_direct-note-1 -->

<!-- note-start: heat_direct-note-3 -->

`delta = 4.0_rk * D * h` 中，`h` 是传播时间，不是空间网格间距；核的空间宽度量级为 $\sqrt{\delta}$。

<!-- note-end: heat_direct-note-3 -->

#### 3.2 水平方向：周期镜像

<!-- note-start: heat_direct-note-5 -->

对周期为 1 的方向，将每个源点按整数平移复制，得到

$$
K_x(x,\xi)
=
\sum_{p\in\mathbb Z}g_\delta(x-\xi+p).
$$

将 $x$ 换成 $x+1$，只相当于把求和指标平移，因此无限和满足周期性。

代码保留 `p = -images, ..., images`：

~~~fortran
shift = real(p, rk)
kx(i, j) = kx(i, j) + gaussian(x(i) - q + shift, delta)
~~~

这里 `i` 遍历水平目标位置，`j` 遍历水平源位置，`p` 遍历镜像。每个 `kx(i,j)` 累加的是同一个源位置对同一个目标位置的各个周期副本贡献，不能只取最近的那一个距离。

<!-- note-end: heat_direct-note-5 -->

#### 3.3 竖直方向：奇反射与周期为 2 的延拓

<!-- note-start: heat_direct-note-7 -->

要使 $z=0$ 上的温扰为零，将源在该壁面作奇反射：

$$
\widetilde\theta(\xi,-\eta)=-\theta(\xi,\eta).
$$

源点 $\eta$ 与反射点 $-\eta$ 的核贡献因此分别为

$$
g_\delta(z-\eta),\qquad -g_\delta(z+\eta).
$$

再作周期为 2 的延拓，就同时得到关于上壁面 $z=1$ 的奇对称关系。对应核为

$$
K_z(z,\eta)
=
\sum_{p\in\mathbb Z}
\left[
g_\delta(z-\eta+2p)
-
g_\delta(z+\eta+2p)
\right].
$$

在 $z=0$，利用 Gaussian 的偶对称性并将 $p$ 换成 $-p$，两组无限和相消；在 $z=1$，将指标换成 $-p-1$ 后同样相消。因此 $K_z(0,\eta)=K_z(1,\eta)=0$。

代码中的 `shift = 2.0_rk * real(p, rk)` 对应长度为 2 的延拓；两个 Gaussian 之间的减号来自奇反射的负号。

水平周期长度为 1、竖直延拓周期长度为 2，分别由两种边界条件决定。壁面条件已经进入积分核，无需在算出结果后再将壁面值强制置零。

<!-- note-end: heat_direct-note-7 -->

### 4. 从积分公式到矩阵乘法

#### 4.1 中点采样与接口约定

混合边界下的精确传播写成

$$
\theta(x,z,t+h)
=
\int_0^1\int_0^1
K_x(x,\xi)\,
\theta(\xi,\eta,t)\,
K_z(z,\eta)
\,d\eta\,d\xi.
$$

<!-- note-start: heat_direct-note-4 heat_direct-note-6 -->

每个方向取 $n$ 个等距中点：

$$
q_a=\frac{a-\tfrac12}{n},\qquad a=1,\ldots,n.
$$

<!-- note-end: heat_direct-note-4 heat_direct-note-6 -->

<!-- note-start: heat_direct-note-2 heat_direct-note-4 heat_direct-note-6 -->

因此输入数组必须满足

$$
S_{ab}=\texttt{source}(a,b)=\theta(q_a,q_b,t).
$$

`source` 的第一维是 $x$，第二维是 $z$。代码只接收源值，没有接收源坐标；它通过

~~~fortran
q = (real(j, rk) - 0.5_rk) / real(n, rk)
~~~

自行生成中点坐标。因此，调用者不能直接把端点网格或 Chebyshev 节点上的值传给这个接口。

<!-- note-end: heat_direct-note-2 heat_direct-note-4 heat_direct-note-6 -->

<!-- note-start: heat_direct-note-2 -->

令 $N_x=\texttt{size(x)}$、$N_z=\texttt{size(z)}$，各参数含义为：

| 参数 | 形状或类型 | 含义 |
| --- | --- | --- |
| `source` | $n\times n$ | 时刻 $t$ 的温度扰动中点值 |
| `x`、`z` | 长度 $N_x$、$N_z$ 的数组 | 输出点两方向的坐标 |
| `D` | 正实数 | 扩散系数 |
| `h` | 正实数 | 从当前状态传播的时间长度 |
| `images` | 非负整数 $M$ | 两方向均保留 $-M\le p\le M$ 的镜像指标 |
| `u` | $N_x\times N_z$ | `u(i,j)` 对应 $\theta(x_i,z_j,t+h)$ |

目标位置是 `x` 与 `z` 的笛卡尔积，可以与源网格不同；源网格在这个实现中固定为正方形中点网格。

<!-- note-end: heat_direct-note-2 -->

#### 4.2 为什么最后除以 \(n^2\)

<!-- note-start: heat_direct-note-8 -->

两个方向的中点求积权重都是 $1/n$，因此每个源点的面积权重为 $1/n^2$。离散传播为

$$
u_{ij}
\approx
\frac{1}{n^2}
\sum_{a=1}^{n}\sum_{b=1}^{n}
K_x(x_i,q_a)\,
S_{ab}\,
K_z(z_j,q_b).
$$

定义矩阵

$$
(K_x)_{ia}=K_x(x_i,q_a),\qquad
(K_z)_{jb}=K_z(z_j,q_b),
$$

就得到

$$
\boxed{U=\frac{1}{n^2}K_x S K_z^{\mathsf T}.}
$$

这里的 $1/n^2$ 是**面积求积权重**。`source` 中保存的是函数值，尚未乘这个权重。

<!-- note-end: heat_direct-note-8 -->

#### 4.3 两次 `matmul` 分别计算什么

<!-- note-start: heat_direct-note-8 -->

代码按以下顺序收缩求和指标：

~~~fortran
u = matmul(kx, matmul(source, transpose(kz))) / real(n, rk)**2
~~~

先计算

$$
V=SK_z^{\mathsf T},\qquad
V_{aj}=\sum_b S_{ab}(K_z)_{jb},
$$

即对每个水平源位置，完成竖直方向的求和。再计算

$$
U_{ij}=\frac{1}{n^2}\sum_a(K_x)_{ia}V_{aj},
$$

完成水平方向的求和。

数组形状对应为

$$
\underbrace{S}_{n\times n}
\underbrace{K_z^{\mathsf T}}_{n\times N_z}
\longrightarrow
\underbrace{V}_{n\times N_z},
\qquad
\underbrace{K_x}_{N_x\times n}
\underbrace{V}_{n\times N_z}
\longrightarrow
\underbrace{U}_{N_x\times N_z}.
$$

`transpose(kz)` 将竖直源指标放到矩阵乘法的收缩位置。这种写法利用了核的可分离性，避免直接枚举每个二维目标与每个二维源的组合。

<!-- note-end: heat_direct-note-8 -->

### 5. 模块中的执行流程

~~~text
source、x、z、D、h、images
    → 检查源数组形状和参数范围
    → 计算 delta = 4Dh
    → 累加水平周期核 kx
    → 累加竖直奇反射核 kz
    → 两次矩阵乘法并乘面积权重
    → 返回目标位置上的温度扰动 u
~~~

当 $N_x,N_z$ 与 $n$ 同量级时，两次稠密矩阵乘法的算术量为 $O(n^3)$；直接枚举全部二维源与目标则为 $O(n^4)$。核矩阵构造还需要 $O((2M+1)n(N_x+N_z))$ 次一维核计算。

## Chapter 2：Chebyshev 节点与盒内插值

### 1. 目标

将一个正方形盒子中的场表示为张量积多项式。每个方向使用 $k$ 个 Chebyshev 根节点，保存 $k\times k$ 个函数值，再通过插值计算任意盒内位置的值。

`cheb_box` 提供三个操作：生成节点 `cheb_nodes`、构造一维插值矩阵 `cheb_matrix`、计算二维插值 `evaluate_box`。后续的源场表示、网格细化和粗化都以这一表示为基础。

### 2. 完整代码

```fortran
module cheb_box
    use iso_fortran_env, only: real64
    implicit none
    private

    integer, parameter, public :: rk = real64
    real(rk), parameter :: pi = acos(-1.0_rk)

    public :: cheb_nodes, cheb_matrix, evaluate_box

contains

    ! @note-start cheb_box-note-1
    subroutine cheb_nodes(k, nodes)
        integer, intent(in) :: k
        real(rk), intent(out) :: nodes(k)
        integer :: j

        if (k < 2) error stop "k must be at least 2"

        do j = 1, k
            nodes(j) = cos(pi * (real(j, rk) - 0.5_rk) / real(k, rk))
        end do
    end subroutine cheb_nodes
    ! @note-end cheb_box-note-1

    ! @note-start cheb_box-note-2
    subroutine cheb_matrix(k, target, matrix)
        integer, intent(in) :: k
        real(rk), intent(in) :: target(:)
        real(rk), intent(out) :: matrix(size(target), k)

        real(rk) :: nodes(k), weights(k), angle
        integer :: i, j

        call cheb_nodes(k, nodes)

        do j = 1, k
            angle = pi * (real(j, rk) - 0.5_rk) / real(k, rk)
            weights(j) = (-1.0_rk)**(j - 1) * sin(angle)
        end do

        do i = 1, size(target)
            j = minloc(abs(target(i) - nodes), dim=1)

            if (abs(target(i) - nodes(j)) <= 8.0_rk*epsilon(1.0_rk)) then
                matrix(i, :) = 0.0_rk
                matrix(i, j) = 1.0_rk
            else
                matrix(i, :) = weights / (target(i) - nodes)
                matrix(i, :) = matrix(i, :) / sum(matrix(i, :))
            end if
        end do
    end subroutine cheb_matrix
    ! @note-end cheb_box-note-2

    ! @note-start cheb_box-note-3
    subroutine evaluate_box(values, center, width, x, z, u)
        real(rk), intent(in) :: values(:, :)
        real(rk), intent(in) :: center(2), width, x(:), z(:)
        real(rk), intent(out) :: u(size(x), size(z))

        real(rk) :: bx(size(x), size(values, 1))
        real(rk) :: bz(size(z), size(values, 2))
        integer :: k

        k = size(values, 1)

        if (size(values, 2) /= k .or. width <= 0.0_rk) error stop "invalid box"

        call cheb_matrix(k, 2.0_rk*(x - center(1))/width, bx)
        call cheb_matrix(k, 2.0_rk*(z - center(2))/width, bz)

        u = matmul(bx, matmul(values, transpose(bz)))
    end subroutine evaluate_box
    ! @note-end cheb_box-note-3

end module cheb_box
```

### 3. 节点与物理坐标

<!-- note-start: cheb_box-note-1 -->

参考区间上的节点为

$$
r_j=\cos\frac{(j-\tfrac12)\pi}{k},\qquad j=1,\ldots,k.
$$

它们是 $T_k$ 的零点，不包含端点，并按**从大到小**排列。对于中心 $\boldsymbol c=(c_x,c_z)$、边长 $w$ 的盒子，

$$
x_i=c_x+\frac w2r_i,\qquad
z_j=c_z+\frac w2r_j.
$$

因此 `values(i,j)` 保存的是这些位置的函数值，不是 Chebyshev 展开系数。所得多项式在每个方向上的次数至多为 $k-1$。

目标位置先通过

$$
\widehat x=\frac{2(x-c_x)}w,\qquad
\widehat z=\frac{2(z-c_z)}w
$$

映射到参考区间。`evaluate_box` 中传给 `cheb_matrix` 的就是这两个参考坐标数组。

<!-- note-end: cheb_box-note-1 -->

### 4. 重心插值矩阵

<!-- note-start: cheb_box-note-2 -->

一维重心插值写成

$$
p(r)=
\frac{\displaystyle\sum_{j=1}^k\frac{\omega_j f_j}{r-r_j}}
     {\displaystyle\sum_{j=1}^k\frac{\omega_j}{r-r_j}},
\qquad
\omega_j=(-1)^{j-1}\sin\frac{(j-\tfrac12)\pi}{k}.
$$

将与 $f_j$ 相乘的系数记为 $B_{ij}$，就有

$$
p(\widehat x_i)=\sum_jB_{ij}f_j,\qquad
B_{ij}
=
\frac{\omega_j/(\widehat x_i-r_j)}
     {\sum_\ell\omega_\ell/(\widehat x_i-r_\ell)}.
$$

`cheb_matrix` 先计算每行的 `weights/(target(i)-nodes)`，再除以该行的和。这里的 `weights` 是插值权重，不是积分权重。

当目标恰好落在节点上，公式会出现除零。代码先用 `minloc` 找到最近节点；若距离不超过 `8*epsilon(1.0_rk)`，便把该行设成对应的单位向量，直接返回那个节点的函数值。

<!-- note-end: cheb_box-note-2 -->

### 5. 二维张量积与调用关系

<!-- note-start: cheb_box-note-3 -->

二维插值为

$$
u_{\alpha\beta}
=
\sum_{i=1}^k\sum_{j=1}^k
(B_x)_{\alpha i}\,V_{ij}\,(B_z)_{\beta j},
\qquad
U=B_xVB_z^{\mathsf T}.
$$

| 数组 | 形状 | 含义 |
| --- | --- | --- |
| `values` | $k\times k$ | 源节点上的场值 |
| `bx` | $N_x\times k$ | 水平方向插值矩阵 |
| `bz` | $N_z\times k$ | 竖直方向插值矩阵 |
| `u` | $N_x\times N_z$ | 目标坐标笛卡尔积上的场值 |

调用关系是 `evaluate_box → cheb_matrix → cheb_nodes`。两次 `matmul` 与上一章形式相近，但这里执行的是插值，不是积分，因此既不除以 $k^2$，也不乘盒面积。

<!-- note-end: cheb_box-note-3 -->

## Chapter 3：单盒 Gaussian 积分与 FGT 接口

### 1. 目标

把一个盒子上的连续密度交给FGT库，计算

$$
P(\boldsymbol x)
=
\int_B
e^{-|\boldsymbol x-\boldsymbol y|^2/\delta}
\,\sigma(\boldsymbol y)\,d\boldsymbol y.
$$

`gaussian_box` 负责准备数据并调用 `boxfgt`。输入是盒内多项式密度的节点值，输出是同一盒节点上的 Gaussian 体积势。这个核尚未包含热方程的 $1/(\pi\delta)$ 归一化因子。

### 2. 完整代码

```fortran
module fgt_single_box
    use cheb_box, only: rk
    use, intrinsic :: ieee_arithmetic, only: ieee_is_finite
    implicit none
    private
    public :: gaussian_box, boxfgt

    interface
    ! @note-start fgt_single_box-note-1
        subroutine boxfgt(nd, d, delta, eps, ipoly, iperiod, k, np, nb, nlev, ltree, itree, iptr, centers, boxsize, fvals, ifpgh, pot, grad, hess, ifnewtree, nt, targs, ifpghtarg, pote, grade, hesse, timeinfo)
            import rk
            integer :: nd, d, ipoly, k, np, nb, nlev, ltree
            integer, intent(inout) :: iperiod
            integer :: itree(ltree), iptr(8), ifpgh, ifnewtree, nt, ifpghtarg
            real(rk) :: delta, eps, centers(d,nb), boxsize(0:nlev)
            real(rk) :: fvals(nd,np,nb), pot(nd,np,nb)
            real(rk) :: grad(nd,d,np,*), hess(nd,d*(d+1)/2,np,*)
            real(rk) :: targs(d,nt), pote(nd,nt)
            real(rk) :: grade(nd,d,*), hesse(nd,d*(d+1)/2,*), timeinfo(*)
        end subroutine boxfgt
    end interface

    ! @note-end fgt_single_box-note-1
contains

    subroutine gaussian_box(k, values, center, width, delta, tolerance, potential)
        integer, intent(in) :: k
        real(rk), intent(in) :: values(k,k), center(2), width, delta, tolerance
        real(rk), intent(out) :: potential(k,k)

        integer :: tree(20), ptr(8), nb, nlev, ltree, np, iperiod
        real(rk) :: centers(2,1), boxsize(0:0), dd, eps
        real(rk) :: f(1,k*k,1), p(1,k*k,1)
        real(rk) :: grad(1,2,k*k,1), hess(1,3,k*k,1)
        real(rk) :: target(2,1), pt(1,1), gt(1,2,1), ht(1,3,1), times(100)

        if (k < 2 .or. k > 32) error stop "unsupported order"

        if (.not. all(ieee_is_finite([center, width, delta, tolerance]))) error stop "nonfinite parameter"

        if (width <= 0.0_rk .or. delta <= 0.0_rk) error stop "invalid geometry or delta"

        if (tolerance < 1.0e-14_rk .or. tolerance >= 0.1_rk) error stop "use a tolerance between 1e-14 and 0.1"

        if (.not. all(ieee_is_finite(values))) error stop "nonfinite density"

        ! @note-start fgt_single_box-note-2
        nb = 1
        nlev = 0
        ltree = 20
        np = k*k
        iperiod = 0

        ptr = [1, 3, 4, 5, 6, 10, 11, 20]
        tree = -1
        tree(1:2) = [1, 1]
        tree(ptr(2)) = 0
        tree(ptr(4)) = 0
        tree(ptr(6)) = 1
        tree(ptr(7)) = 1

        centers(:,1) = center
        boxsize(0) = width
        ! @note-end fgt_single_box-note-2
        dd = delta
        eps = tolerance

        ! @note-start fgt_single_box-note-3
        f(1,:,1) = reshape(values, [np])

        p = 0.0_rk
        grad = 0.0_rk
        hess = 0.0_rk
        target = 0.0_rk
        pt = 0.0_rk
        gt = 0.0_rk
        ht = 0.0_rk
        times = 0.0_rk

        call boxfgt(1, 2, dd, eps, 1, iperiod, k, np, nb, nlev, ltree, tree, ptr, centers, boxsize, f, 1, p, grad, hess, 0, 0, target, 0, pt, gt, ht, times)
        ! @note-end fgt_single_box-note-3

        if (.not. all(ieee_is_finite(p))) error stop "nonfinite FGT output"

        ! @note-start fgt_single_box-note-4
        potential = reshape(p(1,:,1), [k,k])
        ! @note-end fgt_single_box-note-4
    end subroutine gaussian_box

end module fgt_single_box
```

### 3. 接口声明与库实现分别在哪里

<!-- note-start: fgt_single_box-note-1 -->

`interface` 中的 `boxfgt` 只声明参数类型、数组维度和调用约定，不包含 FGT 算法。真正执行计算的位置是

~~~fortran
call boxfgt(...)
~~~

编译 `fgt_single_box` 时，编译器利用显式接口检查调用；链接时，再从 `code/build/advisor/libadvisor_fgt.a` 取得实现。以下路径以项目根目录为基准。库对应的入口源码位于 `code/src/advisor_fgt/src/bfgt/boxfgt.f`。

后续模块中的 `use fgt_single_box, only: boxfgt` 导入的是这个接口声明。`use` 不会搜索任意源码目录，也不会代替链接库；模块的 `.mod` 文件提供编译信息，目标文件或库提供可执行实现。

<!-- note-end: fgt_single_box-note-1 -->

### 4. 用一棵只有根节点的树描述单盒

<!-- note-start: fgt_single_box-note-2 -->

单盒同时是根盒与叶盒，因此 `nb=1`、`nlev=0`、`np=k*k`。`centers(:,1)` 给出盒中心，`boxsize(0)` 给出根盒边长。

FGT 接口用一维整数数组 `tree` 保存树信息，`ptr` 记录各段起始位置。这里各段依次是层内编号范围、盒层数、父盒、子盒数量、子盒编号、邻居数量和邻居编号。

`tree(1:2)=[1,1]` 表示第 0 层只有盒 1；父盒保持 `-1`，子盒数量为 0。最后将自身设为它的一个同层邻居。通用多盒布局将在 Chapter 7 展开。

<!-- note-end: fgt_single_box-note-2 -->

### 5. 密度数组与计算标志

<!-- note-start: fgt_single_box-note-3 -->

Fortran 第一维连续。`reshape(values,[k*k])` 将二维节点值排成

$$
s=i+(j-1)k,
$$

即先改变第一维 $x$，再改变第二维 $z$。传入 `f(1,s,1)` 时，三个下标分别表示密度分量、盒内节点和盒编号。

| 参数 | 本模块取值 | 含义 |
| --- | --- | --- |
| `nd`、`d` | 1、2 | 一个标量密度，二维空间 |
| `ipoly` | 1 | Chebyshev 表示 |
| `iperiod` | 0 | 自由空间 Gaussian 积分 |
| `ifpgh` | 1 | 只计算势值 |
| `ifnewtree` | 0 | 不要求库重建输出树 |
| `nt`、`ifpghtarg` | 0、0 | 不计算额外任意目标点 |

`grad`、`hess` 和目标点缓冲区仍按接口要求提供，但当前没有请求这些结果。`iperiod` 必须使用变量：库内部会写回这个参数，不能把字面常量直接传给可写形参。

`fvals` 表示连续密度值，盒内积分和几何尺度由库处理，所以调用前不乘面积或中点权重。`potential` 返回未归一化体积势；只有将其用于热传播时，才令 $\delta=4Dh$ 并除以 $\pi\delta$。

<!-- note-end: fgt_single_box-note-3 -->

### 6. 节点顺序与单盒对称性

<!-- note-start: fgt_single_box-note-4 -->

学习版 `cheb_nodes` 按降序给出节点，FGT库的 `chebexps` 按升序给出相同节点。本模块直接 `reshape` 输入与输出，没有显式转换两轴次序。

在单盒上，反向解释两轴相当于关于盒中心作反射 $R$。由于 Gaussian 核只依赖距离，且盒子在此反射下不变，

$$
A(\sigma\circ R)=(A\sigma)\circ R,
$$

其中 $A$ 表示本节的单盒积分算子。因此输入与输出同时反向解释，可以利用该几何的反射对称性得到相应的降序结果。

这个性质不能直接推广到各盒中心、大小不同的任意树。后面的通用树接口会在输入打包和输出恢复时明确反转两个坐标轴。

<!-- note-end: fgt_single_box-note-4 -->

## Chapter 4：固定树上的混合边界热传播

### 1. 目标

将单位物理盒延拓成 $[0,2]\times[0,2]$ 上的周期场，用一次周期 FGT 实现水平周期、上下零温扰边界的热传播。

这一步把 Chapter 1 中显式构造的混合边界核，改写成“密度延拓 → 周期 Gaussian 积分 → 限制回物理域”。

### 2. 完整代码

```fortran
module heat_fgt_mixed
    use cheb_box, only: rk
    use fgt_single_box, only: boxfgt
    use, intrinsic :: ieee_arithmetic, only: ieee_is_finite
    implicit none
    private
    public :: heat_step_fgt

contains

    subroutine heat_step_fgt(k, source, diffusion, step, tolerance, output)
        integer, intent(in) :: k
        real(rk), intent(in) :: source(k,k), diffusion, step, tolerance
        real(rk), intent(out) :: output(k,k)

        integer :: tree(90), ptr(8), nb, nlev, ltree, np, iperiod
        real(rk), parameter :: pi = acos(-1.0_rk)
        real(rk) :: centers(2,5), boxsize(0:1), delta, eps
        real(rk) :: f(1,k*k,5), p(1,k*k,5)
        real(rk) :: grad(1,2,k*k,5), hess(1,3,k*k,5)
        real(rk) :: target(2,1), pt(1,1), gt(1,2,1), ht(1,3,1), times(100)

        if (k < 2 .or. k > 32) error stop "unsupported order"

        if (.not. all(ieee_is_finite([diffusion, step, tolerance]))) error stop "nonfinite heat parameter"

        if (diffusion <= 0.0_rk .or. step <= 0.0_rk) error stop "diffusion and step must be positive"

        if (tolerance < 1.0e-14_rk .or. tolerance >= 0.1_rk) error stop "invalid tolerance"

        if (.not. all(ieee_is_finite(source))) error stop "nonfinite source"

        nb = 5
        nlev = 1
        ltree = 90
        np = k*k
        iperiod = 1

        delta = 4.0_rk*diffusion*step
        eps = tolerance

        if (.not. ieee_is_finite(delta) .or. delta <= 0.0_rk) error stop "invalid delta"

        ! @note-start heat_fgt_mixed-note-1
        ptr = [1, 5, 10, 15, 20, 40, 45, 90]
        tree = -1

        tree(1:4) = [1, 1, 2, 5]
        tree(ptr(2):ptr(2)+4) = [0, 1, 1, 1, 1]
        tree(ptr(3):ptr(3)+4) = [-1, 1, 1, 1, 1]
        tree(ptr(4):ptr(4)+4) = [4, 0, 0, 0, 0]
        tree(ptr(5):ptr(5)+3) = [2, 3, 4, 5]

        tree(ptr(6):ptr(6)+4) = 0

        centers(:,1) = [1.0_rk, 1.0_rk]
        centers(:,2) = [0.5_rk, 0.5_rk]
        centers(:,3) = [1.5_rk, 0.5_rk]
        centers(:,4) = [0.5_rk, 1.5_rk]
        centers(:,5) = [1.5_rk, 1.5_rk]

        boxsize = [2.0_rk, 1.0_rk]
        ! @note-end heat_fgt_mixed-note-1

        f = 0.0_rk
        ! @note-start heat_fgt_mixed-note-2
        f(1,:,2) = reshape(source, [np])
        f(1,:,3) = f(1,:,2)
        f(1,:,4) = reshape(-source(:,k:1:-1), [np])
        f(1,:,5) = f(1,:,4)
        ! @note-end heat_fgt_mixed-note-2

        p = 0.0_rk
        grad = 0.0_rk
        hess = 0.0_rk
        target = 0.0_rk
        pt = 0.0_rk
        gt = 0.0_rk
        ht = 0.0_rk
        times = 0.0_rk

        ! @note-start heat_fgt_mixed-note-3
        call boxfgt(1, 2, delta, eps, 1, iperiod, k, np, nb, nlev, ltree, tree, ptr, centers, boxsize, f, 1, p, grad, hess, 0, 0, target, 0, pt, gt, ht, times)

        output = reshape(p(1,:,2), [k,k])/(pi*delta)
        ! @note-end heat_fgt_mixed-note-3

        if (.not. all(ieee_is_finite(output))) error stop "nonfinite output"
    end subroutine heat_step_fgt

end module heat_fgt_mixed
```

### 3. 为什么采用四个单位盒

<!-- note-start: heat_fgt_mixed-note-2 -->

水平方向把原场复制一次，使长度为 1 的周期场也能放入边长为 2 的计算盒。竖直方向在 $z=1$ 处作奇反射：

$$
\widetilde\theta(x,z)=
\begin{cases}
\theta(x\bmod1,z), & 0\le z\le1,\\
-\theta(x\bmod1,2-z), & 1<z\le2.
\end{cases}
$$

再将该场按两方向周期 2 延拓。计算根盒中心为 $(1,1)$、边长为 2，四个叶盒按以下顺序排列：

| 叶盒 | 中心 | 源值 |
| --- | --- | --- |
| 2：左下 | $(0.5,0.5)$ | 原场 |
| 3：右下 | $(1.5,0.5)$ | 水平复制 |
| 4：左上 | $(0.5,1.5)$ | 竖直反射后取负 |
| 5：右上 | $(1.5,1.5)$ | 左上盒的水平复制 |

`source(:,k:1:-1)` 反转竖直节点顺序，实现 $z\mapsto2-z$；前面的负号实现奇反射。只取负号而不反转节点，会把场值放到错误位置。

<!-- note-end: heat_fgt_mixed-note-2 -->

### 4. 固定树的数组布局

<!-- note-start: heat_fgt_mixed-note-1 -->

树共有 5 个盒、最大层数为 1。`tree(1:4)=[1,1,2,5]` 表示第 0 层为盒 1，第 1 层为盒 2 至 5；根盒的四个孩子是 `[2,3,4,5]`。

`boxsize=[2,1]` 给出两层的边长。`f(:,:,1)` 保持为零，只在叶盒填入密度，避免把同一物理区域同时作为父盒和子盒积分。

`iperiod=1` 要求库计算计算盒上的周期 Gaussian 势。原树不改变，返回值只取左下叶盒 `p(1,:,2)`。

这一固定几何也直接 `reshape` 输入和输出。把两轴反向解释，对延拓场对应全局反射 $R(x,z)=(1-x,1-z)$，坐标按周期 2 理解；周期热算子与该反射可交换。后续自适应树不再依赖这种固定布局的对称性，而显式处理库节点次序。

<!-- note-end: heat_fgt_mixed-note-1 -->

### 5. 从 Gaussian 势恢复热传播

<!-- note-start: heat_fgt_mixed-note-3 -->

库返回的是周期 Gaussian 卷积

$$
P(\boldsymbol x)=
\int_{[0,2]^2}
\sum_{\boldsymbol m\in\mathbb Z^2}
e^{-|\boldsymbol x-\boldsymbol y+2\boldsymbol m|^2/\delta}
\widetilde\theta(\boldsymbol y,t)\,d\boldsymbol y.
$$

设 $\delta=4Dh$，限制回原物理域后，

$$
\theta(\boldsymbol x,t+h)=\frac{P(\boldsymbol x)}{\pi\delta}.
$$

对应最后一行：

~~~fortran
output = reshape(p(1,:,2), [k,k])/(pi*delta)
~~~

虽然计算域面积为 4，但延拓积分已经包含实际面积，不再除以 4。这里输出仍是温度扰动；需要完整温度时再加回 $1-z$。

<!-- note-end: heat_fgt_mixed-note-3 -->

## Chapter 5：带源热方程的二阶时间推进

### 1. 目标

在扩散方程中加入已知源项：

$$
\theta_t=D\Delta\theta+f(x,z,t).
$$

`forced_step` 接收当前状态及时间区间两端的源值，调用已有热传播算子完成一步更新。`state` 是温度扰动，`force0`、`force1` 才是这里的 PDE 源项。

### 2. 完整代码

```fortran
module heat_forced
    use cheb_box, only: rk
    use heat_fgt_mixed, only: heat_step_fgt
    use, intrinsic :: ieee_arithmetic, only: ieee_is_finite
    implicit none
    private
    public :: forced_step

contains

    subroutine forced_step(k, state, force0, force1, diffusion, step, tolerance, next)
        integer, intent(in) :: k
        real(rk), intent(in) :: state(k,k), force0(k,k), force1(k,k)
        real(rk), intent(in) :: diffusion, step, tolerance
        real(rk), intent(out) :: next(k,k)
        real(rk) :: work(k,k)

        if (.not. ieee_is_finite(step) .or. step <= 0.0_rk) error stop "invalid step"

        if (.not. all(ieee_is_finite(force0)) .or. .not. all(ieee_is_finite(force1))) error stop "nonfinite forcing"

        ! @note-start heat_forced-note-1
        work = state + 0.5_rk*step*force0
        call heat_step_fgt(k, work, diffusion, step, tolerance, next)
        next = next + 0.5_rk*step*force1
        ! @note-end heat_forced-note-1

        if (.not. all(ieee_is_finite(next))) error stop "nonfinite forced output"
    end subroutine forced_step

end module heat_forced
```

### 3. Duhamel 公式与端点积分

<!-- note-start: heat_forced-note-1 -->

记齐次热传播算子为 $H(h)=e^{hD\Delta}$，则精确更新满足

$$
\theta(t+h)
=
H(h)\theta(t)
+
\int_0^hH(h-s)f(t+s)\,ds.
$$

对被积函数 $g(s)=H(h-s)f(t+s)$ 使用梯形公式。两个端点分别是

$$
g(0)=H(h)f(t),\qquad g(h)=f(t+h),
$$

因此

$$
\theta^{n+1}
=
H(h)\theta^n
+\frac h2H(h)f^n
+\frac h2f^{n+1}.
$$

利用 $H(h)$ 的线性性，将前两项合并：

$$
\boxed{
\theta^{n+1}
=
H(h)\left(\theta^n+\frac h2f^n\right)
+\frac h2f^{n+1}.
}
$$

当被积函数足够光滑、空间误差可控时，梯形近似的局部时间误差为 $O(h^3)$，对应固定终止时间下的二阶时间精度。若源项和壁面条件不相容，不能直接套用这一光滑性前提。

<!-- note-end: heat_forced-note-1 -->

### 4. 三行实现对应三个操作

| 实现 | 数学操作 |
| --- | --- |
| `work = state + 0.5_rk*step*force0` | 形成 $\theta^n+\tfrac h2f^n$ |
| `call heat_step_fgt(...,work,...,next)` | 对整个组合场施加 $H(h)$ |
| `next = next + 0.5_rk*step*force1` | 加入 $\tfrac h2f^{n+1}$ |

左端源项需要经历整个时间间隔的扩散，右端源项在终点加入。因此不能把两端源值都放到传播器外面相加。

`work` 是局部临时数组，`state` 不被覆盖；调用成功后由外部把 `next` 提交为新状态。三组输入数组使用相同节点与形状。

## Chapter 6：自适应四叉树与周期 2:1 平衡

### 1. 目标

用多个不同大小的盒子表示单位域中的场：每个叶盒仍保存 $k\times k$ 个 Chebyshev 节点值，误差过大的区域继续细分。

`build_field` 根据函数回调生成树，`evaluate_field` 在树上定位并插值，`mark_unbalanced` 标记破坏 2:1 平衡的粗盒。启用 `balance=.true.` 时，建树同时补齐水平方向周期接缝处的平衡。

### 2. 完整代码

```fortran
module adaptive_boxes
    use cheb_box, only: rk, cheb_nodes, evaluate_box
    use, intrinsic :: ieee_arithmetic, only: ieee_is_finite
    implicit none
    ! @note-start adaptive_boxes-note-1
    private
    public :: adaptive_field, build_field, evaluate_field, mark_unbalanced

    type :: adaptive_field
        integer :: k = 0, nbox = 0
        real(rk), allocatable :: center(:,:), width(:)
        real(rk), allocatable :: values(:,:,:), indicator(:)
        integer, allocatable :: level(:), parent(:), child(:,:)
    end type adaptive_field
    ! @note-end adaptive_boxes-note-1

    abstract interface
        function scalar_field(x, z) result(f)
            import rk
            real(rk), intent(in) :: x, z
            real(rk) :: f
        end function scalar_field
    end interface

contains

        subroutine build_field(fun, k, tolerance, max_level, max_boxes, field, balance)
        procedure(scalar_field) :: fun
        integer, intent(in) :: k, max_level, max_boxes
        real(rk), intent(in) :: tolerance
        type(adaptive_field), intent(out) :: field
        logical, intent(in), optional :: balance
        logical :: enforce_balance, marked(max_boxes)

        real(rk) :: nodes(k), xs(k), zs(k)
        real(rk) :: xp(2*k+1), zp(2*k+1)
        real(rk) :: check_values(2*k+1,2*k+1)
        real(rk) :: truth(2*k+1,2*k+1), r(2*k+1), offset(2)
        integer :: b, i, j, c, id, m

        if (k < 2 .or. max_level < 0 .or. max_boxes < 1) error stop "invalid tree settings"

        if (.not. ieee_is_finite(tolerance) .or. tolerance <= 0.0_rk) error stop "invalid tolerance"
        
        enforce_balance = .false.
        if (present(balance)) enforce_balance = balance
        marked = .false.

        field%k = k
        field%nbox = 1

        allocate(field%center(2,max_boxes), field%width(max_boxes))
        allocate(field%values(k,k,max_boxes), field%indicator(max_boxes))
        allocate(field%level(max_boxes), field%parent(max_boxes))
        allocate(field%child(4,max_boxes))

        field%center = 0.0_rk
        field%width = 0.0_rk
        field%values = 0.0_rk
        field%indicator = 0.0_rk
        field%level = 0
        field%parent = 0
        field%child = 0

        field%center(:,1) = [0.5_rk,0.5_rk]
        field%width(1) = 1.0_rk

        call cheb_nodes(k, nodes)

        m = 2*k+1
        do i = 1, m
            r(i) = -1.0_rk + 2.0_rk*real(i-1,rk)/real(m-1,rk)
        end do

        b = 1
        do
        do while (b <= field%nbox)
            if (field%child(1,b) /= 0) then
                b = b+1
                cycle
            end if

            ! @note-start adaptive_boxes-note-2
            xs = field%center(1,b) + field%width(b)*nodes/2.0_rk
            zs = field%center(2,b) + field%width(b)*nodes/2.0_rk

            do j = 1, k
                do i = 1, k
                    field%values(i,j,b) = fun(xs(i), zs(j))
                end do
            end do

            xp = field%center(1,b) + field%width(b)*r/2.0_rk
            zp = field%center(2,b) + field%width(b)*r/2.0_rk

            call evaluate_box(field%values(:,:,b), field%center(:,b), field%width(b), xp, zp, check_values)

            do j = 1, m
                do i = 1, m
                    truth(i,j) = fun(xp(i), zp(j))
                end do
            end do

            if (.not. all(ieee_is_finite(check_values)) .or. .not. all(ieee_is_finite(truth))) error stop "nonfinite field"

            field%indicator(b) = maxval(abs(check_values-truth))
            ! @note-end adaptive_boxes-note-2

            if (field%indicator(b) > tolerance .or. marked(b)) then
                if (field%level(b) >= max_level) error stop "maximum level reached"

                if (field%nbox+4 > max_boxes) error stop "maximum box count reached"

                do c = 1, 4
                ! @note-start adaptive_boxes-note-3
                    id = field%nbox+c

                    offset = [real(2*mod(c-1,2)-1,rk), real(2*((c-1)/2)-1,rk)]

                    field%center(:,id) = field%center(:,b) + field%width(b)*offset/4.0_rk
                    field%width(id) = field%width(b)/2.0_rk
                    field%level(id) = field%level(b)+1
                    field%parent(id) = b
                    field%child(c,b) = id
                end do

                field%nbox = field%nbox+4
                ! @note-end adaptive_boxes-note-3
            end if

            b = b+1
        end do

        ! @note-start adaptive_boxes-note-4
        if (.not. enforce_balance) exit

        call mark_unbalanced(field, marked)
        if (.not. any(marked(1:field%nbox))) exit

        b = 1
        ! @note-end adaptive_boxes-note-4
        end do
    end subroutine build_field

    ! @note-start adaptive_boxes-note-5
    subroutine evaluate_field(field, x, z, u)
        type(adaptive_field), intent(in) :: field
        real(rk), intent(in) :: x(:), z(:)
        real(rk), intent(out) :: u(size(x),size(z))

        real(rk) :: value(1,1)
        integer :: i, j, b, c

        if (field%nbox < 1) error stop "empty field"

        if (.not. all(ieee_is_finite(x)) .or. .not. all(ieee_is_finite(z))) error stop "nonfinite target"

        if (any(x < 0.0_rk) .or. any(x > 1.0_rk) .or. any(z < 0.0_rk) .or. any(z > 1.0_rk)) error stop "target outside unit box"

        do j = 1, size(z)
            do i = 1, size(x)

                b = 1
                do while (field%child(1,b) /= 0)
                    c = 1
                    if (x(i) >= field%center(1,b)) c = c+1
                    if (z(j) >= field%center(2,b)) c = c+2
                    b = field%child(c,b)
                end do

                call evaluate_box(field%values(:,:,b), field%center(:,b), field%width(b), [x(i)], [z(j)], value)

                u(i,j) = value(1,1)
            end do
        end do
    end subroutine evaluate_field
    ! @note-end adaptive_boxes-note-5

    ! @note-start adaptive_boxes-note-6
    subroutine mark_unbalanced(field, marked)
        type(adaptive_field), intent(in) :: field
        logical, intent(out) :: marked(:)

        real(rk), parameter :: geometry_tol = 32.0_rk*epsilon(1.0_rk)
        real(rk) :: distance(2), reach
        integer :: a, b

        marked = .false.

        do a = 1, field%nbox
            if (field%child(1,a) /= 0) cycle

            do b = a+1, field%nbox
                if (field%child(1,b) /= 0) cycle
                if (abs(field%level(a)-field%level(b)) <= 1) cycle

                distance = abs(field%center(:,a)-field%center(:,b))
                distance(1) = min(distance(1), 1.0_rk-distance(1))

                reach = (field%width(a)+field%width(b))/2.0_rk

                if (any(distance > reach+geometry_tol)) cycle

                if (field%level(a) < field%level(b)) then
                    marked(a) = .true.
                else
                    marked(b) = .true.
                end if
            end do
        end do
    end subroutine mark_unbalanced
    ! @note-end adaptive_boxes-note-6
end module adaptive_boxes
```

### 3. 一个场如何保存在树中

<!-- note-start: adaptive_boxes-note-1 -->

| 成员 | 含义 |
| --- | --- |
| `k`、`nbox` | 每方向节点数、当前有效盒总数 |
| `center(:,b)`、`width(b)` | 盒中心与边长 |
| `values(:,:,b)` | 盒内的 $k\times k$ 个函数值 |
| `indicator(b)` | 局部表示误差指标 |
| `level(b)`、`parent(b)` | 盒层数与父盒编号 |
| `child(:,b)` | 四个子盒编号 |

根盒编号为 1，中心为 $(1/2,1/2)$，边长为 1，层数为 0。`nbox` 包含内部盒和叶盒，只有 `1:nbox` 是有效数据；数组其余位置是为后续细化保留的容量。

四子盒的顺序固定为左下、右下、左上、右上。叶盒以 `child(1,b)==0` 判断。各叶盒覆盖物理域，内部盒用于组织层次，不再与子盒一起计入场的积分。

<!-- note-end: adaptive_boxes-note-1 -->

### 4. 用独立采样决定是否细化

<!-- note-start: adaptive_boxes-note-2 adaptive_boxes-note-3 -->

对候选叶盒 $B$，先调用 `fun` 得到 Chebyshev 节点值，构造插值多项式 $p_B$。然后在每方向 $2k+1$ 个均匀探针点上比较

$$
\eta_B=\max_{\boldsymbol x\in Q_B}
|p_B(\boldsymbol x)-f(\boldsymbol x)|.
$$

`check_values` 是插值结果，`truth` 是对回调 `fun` 的直接求值。这里的 `truth` 只表示回调提供的参照，不要求它一定是 PDE 的解析解。

若 $\eta_B$ 超过容差，父盒拆成四个边长减半的孩子：

$$
w_c=\frac{w_B}{2},\qquad
\boldsymbol c_c=\boldsymbol c_B+\frac{w_B}{4}
\begin{bmatrix}s_x\\s_z\end{bmatrix},
\qquad s_x,s_z\in\{-1,1\}.
$$

代码用 `offset` 生成四组符号，再将新盒追加到数组末尾。内层 `do while (b <= field%nbox)` 的上限会随追加增长，所以新孩子也会继续被采样和判断。

这一阶段可以调用 `fun`，所以子盒值重新取自函数；后面的纯数值场细化则需要从已有多项式转移。$\eta_B$ 是有限探针上的指标，不是连续域最大误差的严格上界。

<!-- note-end: adaptive_boxes-note-2 adaptive_boxes-note-3 -->

### 5. 2:1 平衡为什么需要外层循环

<!-- note-start: adaptive_boxes-note-4 adaptive_boxes-note-6 -->

相邻叶盒的层数之差要求不超过 1。这里的相邻包括边接触和角点接触，还包括水平周期接缝两侧的接触。

对叶盒 $A,B$，设

$$
d_x=\min(|c_{x,A}-c_{x,B}|,\;1-|c_{x,A}-c_{x,B}|),
\qquad
d_z=|c_{z,A}-c_{z,B}|,
$$

$$
r=\frac{w_A+w_B}{2}.
$$

若 $d_x\le r$、$d_z\le r$，加上小的几何舍入容差，就认为两盒接触。竖直方向不取周期距离，因为上下是物理壁面。

`mark_unbalanced` 枚举叶盒对；层差超过 1 时，只标记较粗的盒子。外层循环随后将 `b` 重新设为 1，再次扫描并细化被标记盒。新细化可能影响别的邻居，因此重复到没有标记为止。

`balance` 默认关闭；打开后，误差超限和破坏平衡两种条件都能触发细化。当前邻接判断采用叶盒两两比较，每轮成本为 $O(N_{\mathrm{leaf}}^2)$。

<!-- note-end: adaptive_boxes-note-4 adaptive_boxes-note-6 -->

### 6. 查询点怎样找到对应叶盒

<!-- note-start: adaptive_boxes-note-5 -->

`evaluate_field` 从根盒开始，用目标位置与当前盒中心比较：

- 位于右半边，子盒编号加 1；
- 位于上半边，子盒编号加 2；
- 最终得到 1 至 4 中的一个孩子，继续向下查找。

落在分割线上的点按 `>=` 进入右侧或上侧。找到叶盒后，只对该盒调用 `evaluate_box`。这个函数负责点定位和插值，不会自动细化，也不会把域外坐标自动绕回周期域。

<!-- note-end: adaptive_boxes-note-5 -->

## Chapter 7：将四叉树转换为 FGT 数据布局

### 1. 目标

由于 FGT 接口要求同层盒子连续排列，并用一个整数数组保存拓扑。

故这里 `pack_tree` 完成三件事：按层重新编号、转换父子关系、将叶盒值按库的节点顺序打包。它不改变盒子几何，也不负责误差细化或平衡。

### 2. 完整代码

```fortran
module fgt_tree_layout
    use cheb_box, only: rk
    use adaptive_boxes, only: adaptive_field
    implicit none
    private
    public :: fgt_layout, pack_tree

    type :: fgt_layout
        integer :: k = 0, nbox = 0, nlevels = 0, npbox = 0, ltree = 0
        integer :: ptr(8) = 0
        integer, allocatable :: tree(:), new_to_old(:), old_to_new(:)
        real(rk), allocatable :: centers(:,:), boxsize(:), density(:,:,:)
    end type fgt_layout

contains

    subroutine pack_tree(field, packed)
        type(adaptive_field), intent(in) :: field
        type(fgt_layout), intent(out) :: packed

        integer :: nb, lev, first, b, old, c, base

        if (field%nbox < 1 .or. field%k < 2 .or. field%k > 32) error stop "invalid field for FGT"

        nb = field%nbox
        packed%k = field%k
        packed%nbox = nb
        packed%nlevels = maxval(field%level(1:nb))
        packed%npbox = field%k**2

        ! @note-start fgt_tree_layout-note-1
        packed%ptr(1) = 1
        packed%ptr(2) = packed%ptr(1)+2*(packed%nlevels+1)
        packed%ptr(3) = packed%ptr(2)+nb
        packed%ptr(4) = packed%ptr(3)+nb
        packed%ptr(5) = packed%ptr(4)+nb
        packed%ptr(6) = packed%ptr(5)+4*nb
        packed%ptr(7) = packed%ptr(6)+nb
        packed%ptr(8) = packed%ptr(7)+9*nb
        packed%ltree = packed%ptr(8)
        ! @note-end fgt_tree_layout-note-1

        allocate(packed%tree(packed%ltree))
        allocate(packed%new_to_old(nb), packed%old_to_new(nb))
        allocate(packed%centers(2,nb), packed%boxsize(0:packed%nlevels))
        allocate(packed%density(1,packed%npbox,nb))

        packed%tree = -1
        packed%density = 0.0_rk
        packed%tree(packed%ptr(6):packed%ptr(6)+nb-1) = 0

        b = 0
        do lev = 0, packed%nlevels
            ! @note-start fgt_tree_layout-note-2
            first = b+1

            do old = 1, nb
                if (field%level(old) /= lev) cycle

                b = b+1
                packed%new_to_old(b) = old
                packed%old_to_new(old) = b
            end do

            if (b < first) error stop "missing tree level"

            base = packed%ptr(1)+2*lev
            packed%tree(base:base+1) = [first,b]
            packed%boxsize(lev) = field%width(1)/2.0_rk**lev
            ! @note-end fgt_tree_layout-note-2
        end do

        if (b /= nb) error stop "invalid box levels"

        do b = 1, nb
            ! @note-start fgt_tree_layout-note-3
            old = packed%new_to_old(b)

            packed%centers(:,b) = field%center(:,old)
            packed%tree(packed%ptr(2)+b-1) = field%level(old)

            if (field%parent(old) /= 0) then
                packed%tree(packed%ptr(3)+b-1) = packed%old_to_new(field%parent(old))
            end if
            ! @note-end fgt_tree_layout-note-3

            packed%tree(packed%ptr(4)+b-1) = 0

            ! @note-start fgt_tree_layout-note-4
            if (field%child(1,old) == 0) then
                packed%density(1,:,b) = reshape(field%values(field%k:1:-1,field%k:1:-1,old), [packed%npbox])
            ! @note-end fgt_tree_layout-note-4
            else
                ! @note-start fgt_tree_layout-note-5
                packed%tree(packed%ptr(4)+b-1) = 4
                base = packed%ptr(5)+4*(b-1)

                do c = 1, 4
                    packed%tree(base+c-1) = packed%old_to_new(field%child(c,old))
                ! @note-end fgt_tree_layout-note-5
                end do
            end if
        end do
    end subroutine pack_tree

end module fgt_tree_layout
```

### 3. 为什么需要两张编号映射表

<!-- note-start: fgt_tree_layout-note-2 fgt_tree_layout-note-3 fgt_tree_layout-note-5 -->

设旧编号为 `old`，按层排序后的编号为 `b`：

$$
\texttt{new\_to\_old}(b)=old,\qquad
\texttt{old\_to\_new}(old)=b.
$$

外层循环枚举层数，内层扫描旧盒号，将这一层的盒子连续放入新数组，同时记录该层首尾编号 `[first,b]`。

复制某个新盒的数据时，先用 `new_to_old` 找到原盒。原盒的父、子编号也是旧编号，因此必须再通过 `old_to_new` 转换。只对盒子排序而保留旧父子编号，会让树指向错误的几何位置。

`nlevels` 存的是最大层号 $L$，层号从 0 开始，所以共有 $L+1$ 层。`boxsize(lev)` 根据根盒宽度计算为 $w_0/2^{lev}$。

<!-- note-end: fgt_tree_layout-note-2 fgt_tree_layout-note-3 fgt_tree_layout-note-5 -->

### 4. 一维树数组中的各段

<!-- note-start: fgt_tree_layout-note-1 -->

设总盒数为 $N$，`ptr` 给出各段的 Fortran 起始下标：

| 起始位置 | 内容 | 整数数量 |
| --- | --- | --- |
| `ptr(1)` | 各层首尾编号 `laddr` | $2(L+1)$ |
| `ptr(2)` | 各盒层数 | $N$ |
| `ptr(3)` | 各盒父编号 | $N$ |
| `ptr(4)` | 各盒孩子数量 | $N$ |
| `ptr(5)` | 各盒四个孩子编号 | $4N$ |
| `ptr(6)` | 同层邻居数量 | $N$ |
| `ptr(7)` | 同层邻居编号 | $9N$ |
| `ptr(8)` | 本实现采用的总数组长度 | 一个长度值 |

代码以 `ptr(8)` 作为 `ltree`，因此

$$
\texttt{ltree}=2(L+1)+17N+1.
$$

最后多保留一个整数位置。根盒父编号和未使用的孩子槽位为 `-1`，叶盒的孩子数量为 0，内部盒为 4。

邻居数量先置零、邻居编号保留为 `-1`；当前FGT库的 `bfgtmain` 会调用 `computecoll` 重新构造邻接表，这些初始槽位并不是已经算好的邻居信息。

<!-- note-end: fgt_tree_layout-note-1 -->

### 5. 叶盒密度的节点次序

<!-- note-start: fgt_tree_layout-note-4 -->

FGT库的 `chebexps` 按升序排列节点，学习版 `cheb_nodes` 按降序排列。节点集合相同，但同一数组下标对应的位置相反，因此要在每个方向执行

$$
i_{\mathrm{native}}=k+1-i_{\mathrm{learning}}.
$$

代码先反转两轴：

~~~fortran
field%values(field%k:1:-1,field%k:1:-1,old)
~~~

再 `reshape` 为一维节点序列，放入 `density(1,:,b)`。其形状为

$$
\texttt{density}:\quad 1\times k^2\times N.
$$

`1` 表示一个标量密度；第二维按第一坐标优先的顺序展开；第三维使用新盒编号。只有叶盒写入密度，内部盒保持为零。

这里的两种变换必须区分：`old_to_new` 调整**盒子的编号**，`k:1:-1` 调整**盒内节点的编号**。它们都不改变物理场，也不引入积分权重。

<!-- note-end: fgt_tree_layout-note-4 -->

## Chapter 8：自适应树上的 Gaussian 积分

### 1. 目标

把已有的 `adaptive_field` 交给 FGT，并将结果恢复到我们的树编号与节点顺序。

`gaussian_tree` 返回形状为 `(k,k,nbox)` 的势值数组。默认计算自由空间 Gaussian 积分；`periodic=.true.` 时，计算周期长度等于根盒边长的周期积分。本层仍不做热核归一化。

### 2. 完整代码

```fortran
module fgt_adaptive
    use cheb_box, only: rk
    use adaptive_boxes, only: adaptive_field
    use fgt_tree_layout, only: fgt_layout, pack_tree
    use fgt_single_box, only: boxfgt
    use, intrinsic :: ieee_arithmetic, only: ieee_is_finite
    implicit none
    private
    public :: gaussian_tree

contains

    subroutine gaussian_tree(field, delta, tolerance, potential, periodic)
        type(adaptive_field), intent(in) :: field
        real(rk), intent(in) :: delta, tolerance
        real(rk), allocatable, intent(out) :: potential(:,:,:)
        logical, intent(in), optional :: periodic

        type(fgt_layout), allocatable :: packed
        integer :: k, np, nb, nlev, ltree, iperiod, b, old
        real(rk) :: dd, eps, values(field%k,field%k)
        real(rk), allocatable :: p(:,:,:), grad(:,:,:,:), hess(:,:,:,:)
        real(rk) :: target(2,1), pt(1,1), gt(1,2,1), ht(1,3,1), times(100)

        if (.not. all(ieee_is_finite([delta,tolerance]))) error stop "nonfinite FGT parameter"

        if (delta <= 0.0_rk) error stop "delta must be positive"

        if (tolerance < 1.0e-14_rk .or. tolerance >= 0.1_rk) error stop "invalid FGT tolerance"

        allocate(packed)
        ! @note-start fgt_adaptive-note-1
        call pack_tree(field, packed)

        if (.not. all(ieee_is_finite(packed%density))) error stop "nonfinite density"

        k = packed%k
        np = packed%npbox
        nb = packed%nbox
        nlev = packed%nlevels
        ltree = packed%ltree
        ! @note-end fgt_adaptive-note-1

        iperiod = 0
        if (present(periodic)) then
            if (periodic) iperiod = 1
        end if
        
        dd = delta
        eps = tolerance

        allocate(p(1,np,nb), grad(1,2,np,nb), hess(1,3,np,nb))
        allocate(potential(k,k,nb))

        p = 0.0_rk
        grad = 0.0_rk
        hess = 0.0_rk
        potential = 0.0_rk
        target = 0.0_rk
        pt = 0.0_rk
        gt = 0.0_rk
        ht = 0.0_rk
        times = 0.0_rk

        ! @note-start fgt_adaptive-note-2
        call boxfgt(1, 2, dd, eps, 1, iperiod, k, np, nb, nlev, ltree, packed%tree, packed%ptr, packed%centers, packed%boxsize, packed%density, 1, p, grad, hess, 0, 0, target, 0, pt, gt, ht, times)
        ! @note-end fgt_adaptive-note-2

        if (nb /= field%nbox .or. nlev /= packed%nlevels .or. ltree /= packed%ltree) error stop "unexpected tree change"

        do b = 1, nb
            ! @note-start fgt_adaptive-note-3
            old = packed%new_to_old(b)
            if (field%child(1,old) /= 0) cycle

            if (.not. all(ieee_is_finite(p(1,:,b)))) error stop "nonfinite FGT output"

            values = reshape(p(1,:,b), [k,k])
            potential(:,:,old) = values(k:1:-1,k:1:-1)
            ! @note-end fgt_adaptive-note-3
        end do
    end subroutine gaussian_tree

end module fgt_adaptive
```

### 3. 从学习版树到库调用

<!-- note-start: fgt_adaptive-note-1 -->

调用关系为：

~~~text
gaussian_tree(field, ...)
    → pack_tree(field, packed)
        → 按层重排盒编号
        → 转换父子关系
        → 反转两轴并打包叶盒值
    → boxfgt(...)
    → 恢复旧盒编号和降序节点
~~~

`packed` 保存库所需的树、几何和密度。局部变量 `k`、`np`、`nb`、`nlev`、`ltree` 对应库接口中的规模参数；`dd`、`eps` 保存传入的核参数与精度要求。

`periodic` 是可选参数，先通过 `present(periodic)` 判断是否提供，再设置可写整数变量 `iperiod`。调用使用 `ifpgh=1`、`ifnewtree=0`，不请求额外目标点，因此只获得原树叶节点上的势值。

<!-- note-end: fgt_adaptive-note-1 -->

### 4. 输出的编号和节点次序怎样恢复

<!-- note-start: fgt_adaptive-note-3 -->

库输出 `p(1,:,b)` 使用打包后的新盒编号。先取

~~~fortran
old = packed%new_to_old(b)
~~~

找到原盒，再将一维节点向量恢复为二维数组：

~~~fortran
values = reshape(p(1,:,b), [k,k])
potential(:,:,old) = values(k:1:-1,k:1:-1)
~~~

第二行把FGT库的升序节点转回学习版降序节点。`reshape` 只改变数组形状，不会自动处理节点位置，所以反序操作必须单独写出。

只复制叶盒结果；`potential` 的非叶盒位置保持初始化的零值。后续若构造一个数值场，应使用原树几何配上这些叶值，不能将非叶盒位置解释为已计算的插值表示。

<!-- note-end: fgt_adaptive-note-3 -->

### 5. FGT 精度与场表示精度

<!-- note-start: fgt_adaptive-note-2 -->

`tolerance` 控制本次 FGT 计算请求的精度，但接口没有检查返回势能否在每个原叶盒上被同阶多项式充分表示。

源场已经分辨，并不保证扩散后的输出在原树上也充分分辨。`ifnewtree=0` 明确关闭了库的输出重建；这个问题由后面的 `checked_heat_step` 通过加密节点和重新传播处理。

<!-- note-end: fgt_adaptive-note-2 -->

## Chapter 9：自适应树上的混合边界热传播

### 1. 目标

将固定四叶盒的混合边界延拓推广到任意有效的物理自适应树。

`extend_mixed` 创建四份平移或反射的子树；`heat_step_adaptive` 调用周期 FGT，取回物理域中的叶节点结果，并完成热核归一化。

### 2. 完整代码

```fortran
module heat_adaptive_mixed
    use cheb_box, only: rk
    use adaptive_boxes, only: adaptive_field
    use fgt_adaptive, only: gaussian_tree
    use, intrinsic :: ieee_arithmetic, only: ieee_is_finite
    implicit none
    private
    public :: extend_mixed, heat_step_adaptive

contains

    subroutine extend_mixed(field, extended)
        type(adaptive_field), intent(in) :: field
        type(adaptive_field), intent(out) :: extended

        integer, parameter :: reflected_child(4) = [3,4,1,2]
        integer :: nb, k, q, b, c, old_child, offset, id

        if (field%nbox < 1) error stop "empty input tree"

        if (maxval(abs(field%center(:,1)-0.5_rk)) > 1.0e-12_rk .or. abs(field%width(1)-1.0_rk) > 1.0e-12_rk) &
            error stop "expected a unit physical box"

        ! @note-start heat_adaptive_mixed-note-1
        nb = field%nbox
        k = field%k
        extended%k = k
        extended%nbox = 1+4*nb
        ! @note-end heat_adaptive_mixed-note-1

        allocate(extended%center(2,extended%nbox), extended%width(extended%nbox))
        allocate(extended%values(k,k,extended%nbox), extended%indicator(extended%nbox))
        allocate(extended%level(extended%nbox), extended%parent(extended%nbox))
        allocate(extended%child(4,extended%nbox))

        extended%center = 0.0_rk
        extended%width = 0.0_rk
        extended%values = 0.0_rk
        extended%indicator = 0.0_rk
        extended%level = 0
        extended%parent = 0
        extended%child = 0

        extended%center(:,1) = [1.0_rk,1.0_rk]
        extended%width(1) = 2.0_rk

        do q = 1, 4
            ! @note-start heat_adaptive_mixed-note-2
            offset = 1+(q-1)*nb
            extended%child(q,1) = offset+1

            do b = 1, nb
                id = offset+b

                extended%center(:,id) = field%center(:,b)
                extended%center(1,id) = field%center(1,b)+real(mod(q-1,2),rk)
                extended%width(id) = field%width(b)
                extended%level(id) = field%level(b)+1
                extended%indicator(id) = field%indicator(b)
                extended%values(:,:,id) = field%values(:,:,b)

                if (b == 1) then
                    extended%parent(id) = 1
                else
                    extended%parent(id) = offset+field%parent(b)
                end if
            ! @note-end heat_adaptive_mixed-note-2

                ! @note-start heat_adaptive_mixed-note-3
                if (q >= 3) then
                    extended%center(2,id) = 2.0_rk-field%center(2,b)
                    extended%values(:,:,id) = -field%values(:,k:1:-1,b)
                end if

                if (field%child(1,b) == 0) cycle

                do c = 1, 4
                    old_child = c
                    if (q >= 3) old_child = reflected_child(c)
                    extended%child(c,id) = offset+field%child(old_child,b)
                end do
                ! @note-end heat_adaptive_mixed-note-3
            end do
        end do
    end subroutine extend_mixed

    subroutine heat_step_adaptive(field, diffusion, step, tolerance, potential)
        type(adaptive_field), intent(in) :: field
        real(rk), intent(in) :: diffusion, step, tolerance
        real(rk), allocatable, intent(out) :: potential(:,:,:)

        type(adaptive_field), allocatable :: extended
        real(rk), allocatable :: all_potential(:,:,:)
        real(rk), parameter :: pi = acos(-1.0_rk)
        real(rk) :: delta

        if (.not. all(ieee_is_finite([diffusion,step]))) error stop "nonfinite heat parameter"

        if (diffusion <= 0.0_rk .or. step <= 0.0_rk) error stop "diffusion and step must be positive"

        ! @note-start heat_adaptive_mixed-note-4
        delta = 4.0_rk*diffusion*step

        allocate(extended)
        call extend_mixed(field, extended)

        call gaussian_tree(extended, delta, tolerance, all_potential, periodic=.true.)

        allocate(potential(field%k,field%k,field%nbox))
        potential = all_potential(:,:,2:field%nbox+1)/(pi*delta)
        ! @note-end heat_adaptive_mixed-note-4
    end subroutine heat_step_adaptive

end module heat_adaptive_mixed
```

### 3. 四份子树的几何与编号

<!-- note-start: heat_adaptive_mixed-note-1 heat_adaptive_mixed-note-2 -->

若原树共有 $N$ 个盒，延拓树共有

$$
N_{\mathrm{ext}}=1+4N
$$

个盒。额外的盒 1 是中心 $(1,1)$、边长为 2 的新根。

对四个象限 $q=1,2,3,4$，代码设置

$$
o_q=1+(q-1)N,\qquad
b_{\mathrm{ext}}=o_q+b.
$$

因此，每份旧树都占据一个连续编号区间。四个旧根接到新根下面，其余父子编号加上同一偏移；所有旧盒的层数加 1，边长保持不变。

| 象限 | 中心变换 | 节点值变换 |
| --- | --- | --- |
| 左下 | $(x,z)$ | 原值 |
| 右下 | $(x+1,z)$ | 原值 |
| 左上 | $(x,2-z)$ | 竖直节点反序并取负 |
| 右上 | $(x+1,2-z)$ | 竖直节点反序并取负 |

源树应已经满足物理域上的周期 2:1 平衡。`extend_mixed` 只复制几何与拓扑，不会再次判断或修复输入树。

<!-- note-end: heat_adaptive_mixed-note-1 heat_adaptive_mixed-note-2 -->

### 4. 反射为什么还要交换子盒位置

<!-- note-start: heat_adaptive_mixed-note-3 -->

竖直反射把原来的下方变成上方，因此原子盒编号关系

~~~text
1 左下    2 右下    3 左上    4 右上
~~~

在新几何中变为

~~~text
新位置 1 ← 原 3
新位置 2 ← 原 4
新位置 3 ← 原 1
新位置 4 ← 原 2
~~~

这就是 `reflected_child=[3,4,1,2]` 的作用。只改中心和函数值，不交换孩子槽位，会使点定位时的几何方向与拓扑不一致。

本层 `-field%values(:,k:1:-1,b)` 实现物理奇反射；`pack_tree` 的双轴反序实现学习节点到库节点的顺序转换。两次反序发生在不同层次，不能互相省略。

<!-- note-end: heat_adaptive_mixed-note-3 -->

### 5. 限制回原域与归一化

<!-- note-start: heat_adaptive_mixed-note-4 -->

传播流程为：

~~~text
物理树 field
    → extend_mixed：四份子树组成周期计算域
    → gaussian_tree(..., periodic=.true.)
    → 取左下子树的节点势
    → 除以 pi*delta
~~~

其中 $\delta=4Dh$。`gaussian_tree` 返回时已经恢复延拓树的原编号，所以原物理盒 `b` 对应 `all_potential(:,:,b+1)`。整份物理树恰好是区间 `2:N+1`：

~~~fortran
potential = all_potential(:,:,2:field%nbox+1)/(pi*delta)
~~~

结果沿用原物理树的盒序和降序节点，形状为 `(k,k,N)`。当前接口只返回值数组，不更新原树，也不更新它原有的误差指标。

<!-- note-end: heat_adaptive_mixed-note-4 -->

## Chapter 10：输出分辨率检查与重新传播

### 1. 目标

热传播后的场可能进入原先很粗的区域，即使源场已被准确表示，原树也未必能准确表示输出。

`checked_heat_step` 比较父盒输出插值与细化节点上的重新传播结果。超出容差时细化正式树、恢复平衡，再从同一个数值源重新传播。

### 2. 完整代码

```fortran
module heat_output_control
    use cheb_box, only: rk, cheb_nodes, evaluate_box
    use adaptive_boxes, only: adaptive_field, mark_unbalanced
    use heat_adaptive_mixed, only: heat_step_adaptive
    use, intrinsic :: ieee_arithmetic, only: ieee_is_finite
    implicit none
    private
    public :: refine_leaves, checked_heat_step

contains

    ! @note-start heat_output_control-note-1
    subroutine refine_leaves(field, marked, max_level)
        type(adaptive_field), intent(inout) :: field
        logical, intent(in) :: marked(:)
        integer, intent(in) :: max_level

        real(rk) :: nodes(field%k), x(field%k), z(field%k), offset(2)
        integer :: b, c, id, old_count

        old_count = field%nbox
        if (size(marked) < old_count) error stop "mark array too short"
        call cheb_nodes(field%k, nodes)

        do b = 1, old_count
            if (.not. marked(b) .or. field%child(1,b) /= 0) cycle
            if (field%level(b) >= max_level) error stop "maximum level reached"
            if (field%nbox+4 > size(field%width)) error stop "maximum box count reached"

            do c = 1, 4
                id = field%nbox+c
                offset = [real(2*mod(c-1,2)-1,rk), real(2*((c-1)/2)-1,rk)]
                field%center(:,id) = field%center(:,b)+field%width(b)*offset/4.0_rk
                field%width(id) = field%width(b)/2.0_rk
                field%level(id) = field%level(b)+1
                field%parent(id) = b
                field%child(:,id) = 0
                field%child(c,b) = id

                x = field%center(1,id)+field%width(id)*nodes/2.0_rk
                z = field%center(2,id)+field%width(id)*nodes/2.0_rk
                call evaluate_box(field%values(:,:,b), field%center(:,b), field%width(b), x, z, field%values(:,:,id))
                field%indicator(id) = -1.0_rk
            end do
            field%indicator(b) = -1.0_rk
            field%nbox = field%nbox+4
        end do
    end subroutine refine_leaves
    ! @note-end heat_output_control-note-1

    ! @note-start heat_output_control-note-2
    subroutine checked_heat_step(source, diffusion, step, fgt_eps, output_tol, &
                                 max_level, max_passes, output, passes, first_error)
        type(adaptive_field), intent(in) :: source
        real(rk), intent(in) :: diffusion, step, fgt_eps, output_tol
        integer, intent(in) :: max_level, max_passes
        type(adaptive_field), intent(out) :: output
        integer, intent(out) :: passes
        real(rk), intent(out) :: first_error

        type(adaptive_field) :: work, probe
        real(rk), allocatable :: coarse(:,:,:), fine(:,:,:), eta(:)
        logical, allocatable :: marked(:)
        real(rk) :: nodes(source%k), x(source%k), z(source%k)
        real(rk) :: predicted(source%k,source%k)
        integer :: b, c, id

        if (.not. ieee_is_finite(output_tol) .or. output_tol <= 0.0_rk) error stop "invalid output tolerance"
        if (max_passes < 1 .or. max_level < 0) error stop "invalid refinement limit"
    ! @note-end heat_output_control-note-2

        work = source
        allocate(marked(size(work%width)), eta(size(work%width)))
        call mark_unbalanced(work, marked)
        if (any(marked)) error stop "input tree must be balanced"
        call cheb_nodes(source%k, nodes)

        passes = 0
        first_error = -1.0_rk
        do
            passes = passes+1
            ! @note-start heat_output_control-note-3
            call heat_step_adaptive(work, diffusion, step, fgt_eps, coarse)

            probe = work
            marked = .false.
            marked(1:work%nbox) = work%child(1,1:work%nbox) == 0
            call refine_leaves(probe, marked, max_level+1)
            call heat_step_adaptive(probe, diffusion, step, fgt_eps, fine)

            eta = 0.0_rk
            do b = 1, work%nbox
                if (work%child(1,b) /= 0) cycle
                do c = 1, 4
                    id = probe%child(c,b)
                    x = probe%center(1,id)+probe%width(id)*nodes/2.0_rk
                    z = probe%center(2,id)+probe%width(id)*nodes/2.0_rk
                    call evaluate_box(coarse(:,:,b), work%center(:,b), work%width(b), x, z, predicted)
                    eta(b) = max(eta(b), maxval(abs(predicted-fine(:,:,id))))
            ! @note-end heat_output_control-note-3
                end do
            end do
            if (.not. all(ieee_is_finite(eta))) error stop "nonfinite output indicator"
            if (passes == 1) first_error = maxval(eta)

            if (maxval(eta) <= output_tol) then
                ! @note-start heat_output_control-note-4
                output = work
                output%values(:,:,1:work%nbox) = coarse
                output%indicator = -1.0_rk
                do b = 1, work%nbox
                    if (work%child(1,b) == 0) output%indicator(b) = eta(b)
                end do
                ! @note-end heat_output_control-note-4
                return
            end if

            if (passes >= max_passes) error stop "output resolution did not converge"
            ! @note-start heat_output_control-note-5
            marked = eta > output_tol
            call refine_leaves(work, marked, max_level)
            do
                call mark_unbalanced(work, marked)
                if (.not. any(marked)) exit
                call refine_leaves(work, marked, max_level)
            ! @note-end heat_output_control-note-5
            end do
        end do
    end subroutine checked_heat_step

end module heat_output_control
```

### 3. 数值源的细化：保持多项式不变

<!-- note-start: heat_output_control-note-1 -->

`refine_leaves` 只细化被标记的叶盒。子盒中心、边长和父子关系沿用四叉树规则，但新节点值来自

~~~fortran
call evaluate_box(field%values(:,:,b), field%center(:,b), &
    field%width(b), x, z, field%values(:,:,id))
~~~

这相当于把父盒多项式限制到四个子区域。父多项式在每方向的次数至多为 $k-1$，子盒仍使用每方向 $k$ 个节点，因此在精确算术下可以表示同一个多项式。

这里不需要已知函数回调，也不会凭空恢复源表示中已经丢失的细节。其作用是给同一个数值源换一棵更细的树。

`old_count` 固定为调用开始时的盒数，避免本轮继续细分刚追加的孩子。`indicator=-1` 标记新盒尚无对应的分辨率指标。

<!-- note-end: heat_output_control-note-1 -->

### 4. 在新节点上重新计算输出

<!-- note-start: heat_output_control-note-3 -->

每轮保留两棵树：

| 对象 | 保存的内容 |
| --- | --- |
| `work` | 正式树上的原始数值源 |
| `probe` | 将 `work` 的所有叶盒再细化一级后的同一数值源 |
| `coarse` | 在 `work` 节点上计算的热传播结果 |
| `fine` | 在 `probe` 节点上重新计算的热传播结果 |

先计算 `coarse`，然后复制 `probe=work`，细化所有叶盒并再次调用 FGT。输入树已平衡，所有叶盒同时加深一级后仍保持层差约束。

对 `work` 中的叶盒 $B$，在它四个子盒的全部节点上计算

$$
\eta_B
=
\max_{C\subset B}\;
\max_{\boldsymbol x\in X_C}
\left|
I_B[\texttt{coarse}](\boldsymbol x)
-
\texttt{fine}(\boldsymbol x)
\right|.
$$

`predicted` 是父盒输出插值得到的值，`fine(:,:,id)` 是重新调用传播器得到的值。若只把 `coarse` 插值到孩子上再互相比较，就没有引入新的输出计算信息，无法发现父盒表示遗漏的细节。

<!-- note-end: heat_output_control-note-3 -->

### 5. 超限后为什么必须重新传播原源

<!-- note-start: heat_output_control-note-4 heat_output_control-note-5 -->

当 $\max_B\eta_B$ 超过 `output_tol` 时，代码执行：

~~~text
标记 eta 超限的正式叶盒
    → 细化 work 中的这些叶盒
    → mark_unbalanced 标记需要补齐的粗邻居
    → 继续细化直到平衡
    → 在新的 work/probe 上再次传播
~~~

整个过程中，`work%values` 始终表示输入时的数值源。代码没有把 `coarse` 或 `fine` 写回 `work`，因此每轮计算的都是同一个

$$
H(h)\theta^n,
$$

而不是反复执行 $H(h)$ 把物理时间推进到 $t+2h,t+3h$。

只有指标通过后，才执行 `output=work`，将几何复制到输出，再用 `coarse` 替换有效盒的值。叶盒 `indicator` 保存本轮输出指标，其余位置设为 `-1`。

<!-- note-end: heat_output_control-note-4 heat_output_control-note-5 -->

### 6. 容差与循环限制

<!-- note-start: heat_output_control-note-2 -->

`fgt_eps` 控制库计算精度，`output_tol` 控制当前输出多项式的分辨率指标；初始源场自身的表示误差仍由调用者负责。

`passes` 统计检查轮数，每轮调用两次传播器；`first_error` 保存第一轮的最大指标。`max_passes` 限制重算次数，`max_level` 限制正式树深度，临时探针允许再深一层。两棵树都沿用预留数组容量，容量必须容纳临时全叶细化。

$\eta_B$ 是有限节点上的输出估计，包含 FGT 数值误差的影响，不是总误差的严格上界。达到资源限制仍未通过时，子程序终止，不返回一个被标记为已分辨的结果。

<!-- note-end: heat_output_control-note-2 -->

## Chapter 11：受控粗化与重网格

### 1. 目标

扩散使场逐渐平滑后，部分细盒不再必要。`coarsen_field` 尝试用父盒多项式替代原子树，并在控制场转移误差的同时保持周期 2:1 平衡。

粗化不推进时间。输入 `reference` 和输出 `result` 表示同一时刻的场，且必须使用不同变量。

### 2. 完整代码

```fortran
module field_regrid
    use cheb_box, only: rk, cheb_nodes, evaluate_box
    use adaptive_boxes, only: adaptive_field, evaluate_field, mark_unbalanced
    use heat_output_control, only: refine_leaves
    use, intrinsic :: ieee_arithmetic, only: ieee_is_finite
    implicit none
    private
    public :: coarsen_field

contains

    ! @note-start field_regrid-note-1
    subroutine transfer_indicator(reference, center, width, values, error)
        type(adaptive_field), intent(in) :: reference
        real(rk), intent(in) :: center(2), width, values(:,:)
        real(rk), intent(out) :: error

        integer :: a, i, m
        real(rk) :: r(2*reference%k+1), x(2*reference%k+1), z(2*reference%k+1)
        real(rk) :: old_values(2*reference%k+1,2*reference%k+1)
        real(rk) :: new_values(2*reference%k+1,2*reference%k+1)
        real(rk) :: lower(2), upper(2)
        logical :: covered

        m = size(r)
        r = [(real(i-1,rk)/real(m-1,rk), i=1,m)]
        error = 0.0_rk
        covered = .false.

        do a = 1, reference%nbox
            if (reference%child(1,a) /= 0) cycle

            lower = max(center-width/2.0_rk, &
                reference%center(:,a)-reference%width(a)/2.0_rk)
            upper = min(center+width/2.0_rk, &
                reference%center(:,a)+reference%width(a)/2.0_rk)

            if (any(upper <= lower)) cycle
            covered = .true.

            x = lower(1)+(upper(1)-lower(1))*r
            z = lower(2)+(upper(2)-lower(2))*r

            call evaluate_box(reference%values(:,:,a), reference%center(:,a), &
                reference%width(a), x, z, old_values)
            call evaluate_box(values, center, width, x, z, new_values)

            if (.not. all(ieee_is_finite(old_values)) .or. &
                .not. all(ieee_is_finite(new_values))) error stop "nonfinite transfer"

            error = max(error, maxval(abs(new_values-old_values)))
        end do

        if (.not. covered) error stop "box outside reference tree"
    end subroutine transfer_indicator
    ! @note-end field_regrid-note-1

    subroutine coarsen_field(reference, tolerance, result, monitor)
        type(adaptive_field), intent(in) :: reference
        real(rk), intent(in) :: tolerance
        type(adaptive_field), intent(out) :: result
        real(rk), intent(out) :: monitor

        logical, allocatable :: marked(:)
        real(rk) :: nodes(reference%k), error
        integer :: b, max_level

        if (.not. ieee_is_finite(tolerance) .or. tolerance <= 0.0_rk) &
            error stop "invalid transfer tolerance"
        if (reference%nbox < 1) error stop "empty reference tree"

        allocate(marked(size(reference%width)))
        call mark_unbalanced(reference, marked)
        if (any(marked)) error stop "reference tree must be balanced"

        max_level = maxval(reference%level(1:reference%nbox))
        call cheb_nodes(reference%k, nodes)

        ! @note-start field_regrid-note-2
        result = reference
        result%nbox = 1
        result%center = 0.0_rk
        result%width = 0.0_rk
        result%values = 0.0_rk
        result%indicator = -1.0_rk
        result%level = 0
        result%parent = 0
        result%child = 0

        call visit(1,1)

        do
            call mark_unbalanced(result, marked)
            if (.not. any(marked)) exit
            call refine_leaves(result, marked, max_level)
        end do

        monitor = 0.0_rk
        do b = 1, result%nbox
            if (result%child(1,b) /= 0) cycle
            call transfer_indicator(reference, result%center(:,b), &
                result%width(b), result%values(:,:,b), error)
            monitor = max(monitor,error)
        end do

        if (monitor > tolerance) error stop "final transfer check failed"
        ! @note-end field_regrid-note-2
        result%indicator = -1.0_rk

    contains

        recursive subroutine visit(old, id)
            integer, intent(in) :: old, id
            real(rk) :: x(reference%k), z(reference%k)
            real(rk) :: candidate(reference%k,reference%k), local_error
            integer :: c, first

            result%center(:,id) = reference%center(:,old)
            result%width(id) = reference%width(old)
            result%level(id) = reference%level(old)

            if (reference%child(1,old) == 0) then
                result%values(:,:,id) = reference%values(:,:,old)
                return
            end if

            ! @note-start field_regrid-note-3
            x = reference%center(1,old)+reference%width(old)*nodes/2.0_rk
            z = reference%center(2,old)+reference%width(old)*nodes/2.0_rk
            call evaluate_field(reference, x, z, candidate)

            call transfer_indicator(reference, reference%center(:,old), &
                reference%width(old), candidate, local_error)

            if (local_error <= tolerance) then
                result%values(:,:,id) = candidate
                return
            ! @note-end field_regrid-note-3
            end if

            if (result%nbox+4 > size(result%width)) error stop "maximum box count reached"

            ! @note-start field_regrid-note-4
            first = result%nbox+1
            result%nbox = result%nbox+4

            do c = 1, 4
                result%child(c,id) = first+c-1
                result%parent(first+c-1) = id
            end do

            do c = 1, 4
                call visit(reference%child(c,old),first+c-1)
            ! @note-end field_regrid-note-4
            end do
        end subroutine visit

    end subroutine coarsen_field

end module field_regrid
```

### 3. 用原数值场构造候选父盒

<!-- note-start: field_regrid-note-3 -->

`coarsen_field` 以粗化前的 `reference` 为固定参照，从根开始调用内部递归过程 `visit(old,id)`。`old` 是旧树盒号，`id` 是新树盒号。

如果旧盒已经是叶盒，直接复制它的值。如果旧盒还有孩子，就尝试用一个盒子代替整棵子树：

1. 生成这个父盒的 Chebyshev 节点；
2. 调用 `evaluate_field(reference,...)`，从原叶盒场取得节点值；
3. 由这些值形成候选父盒多项式；
4. 检查它相对于原数值场的转移误差。

不能直接复制 `reference%values(:,:,old)` 作为内部盒的候选值。热传播更新的是叶盒数据，内部盒中的旧值可能已经失效，甚至保持为零。

<!-- note-end: field_regrid-note-3 -->

### 4. 在每个旧叶盒内部比较两种表示

<!-- note-start: field_regrid-note-1 -->

对于候选盒 $B$，`transfer_indicator` 遍历旧叶盒 $A$，求出交叠矩形

$$
\boldsymbol \ell
=
\max\left(
\boldsymbol c_B-\frac{w_B}{2},
\boldsymbol c_A-\frac{w_A}{2}
\right),
$$

$$
\boldsymbol u
=
\min\left(
\boldsymbol c_B+\frac{w_B}{2},
\boldsymbol c_A+\frac{w_A}{2}
\right).
$$

`max`、`min` 按坐标分量作用；若任一方向没有正长度交叠，就跳过该叶盒。

在交叠区域每方向取 $2k+1$ 个含端点的均匀探针，分别计算旧叶多项式和候选父盒多项式，取

$$
\eta_B=
\max_A\;\max_{\boldsymbol x\in Q_{A\cap B}}
|p_B(\boldsymbol x)-p_A^{\mathrm{ref}}(\boldsymbol x)|.
$$

逐个旧叶盒比较，可以保留对旧场局部结构的检查，而不只在大父盒上取少量可能遗漏细节的点。

所有候选盒始终与原始 `reference` 比较。即使一次合并跨过多层，也不会仅比较“这次结果与上次结果”，从而把多次转移偏差隐藏在逐层容差中。该指标仍是有限采样估计。

<!-- note-end: field_regrid-note-1 -->

### 5. 递归决定保留哪些盒子

<!-- note-start: field_regrid-note-4 -->

若 `local_error <= tolerance`，候选父盒作为新叶盒保存，递归立即返回，原来的整棵子树不再复制。

若指标超限，则在新数组末尾预留四个孩子编号：

~~~fortran
first = result%nbox+1
result%nbox = result%nbox+4
~~~

先写好它们的父子关系，再分别递归访问旧树的四个孩子。`first` 固定了本层四个孩子的位置，避免第一个孩子继续递归、增加 `nbox` 后扰乱其余孩子的编号。

因此新树只包含保留的有效盒，编号连续占据 `1:result%nbox`；删除的旧子树不会留下仍被算作有效叶盒的空洞。预留数组容量保持，供后续细化使用。

<!-- note-end: field_regrid-note-4 -->

### 6. 恢复平衡与最终转移检查

<!-- note-start: field_regrid-note-2 -->

独立合并不同区域后，邻盒层差可能超过 1。因此递归结束后继续调用

~~~text
mark_unbalanced(result)
    → refine_leaves(result)
    → 重复直到没有失衡标记
~~~

这里的细化只限制已经接受的候选多项式，不重新调用解析函数，也不执行热传播。

最后对所有输出叶盒再次调用 `transfer_indicator`，得到 `monitor`。只有最终树的转移指标满足容差才返回；原来的 `indicator` 全部置为 `-1`，因为它既不能沿用旧输出分辨率估计，也不能把转移误差误认为热传播误差。

`result=reference` 会复制派生类型中的 allocatable 数组，后续清空和重建 `result` 不会改变 `reference`。保留这一份固定参照，是粗化过程中重建候选值和判断转移误差的共同基础。

<!-- note-end: field_regrid-note-2 -->


## Chapter 12：连续自适应热推进

### 1. 目标

把已有的热传播、输出细化和粗化串成时间步。现在传入的是上一时刻的数值场，以及可以在任意位置、任意时刻计算的已知源项。

### 2. 完整代码

```fortran
module heat_time_driver
    use cheb_box, only: rk
    use adaptive_boxes, only: adaptive_field, build_field, evaluate_field
    use heat_output_control, only: checked_heat_step
    use field_regrid, only: coarsen_field
    use, intrinsic :: ieee_arithmetic, only: ieee_is_finite
    implicit none
    private
    public :: advance_known_heat
    abstract interface
        real(kind=kind(1.0d0)) function known_source(x,z,t)
            import rk
            real(rk), intent(in) :: x,z,t
        end function known_source
    end interface
contains
    ! @note-start heat_time_driver-note-1
    subroutine advance_known_heat(state,time,h,diffusion,forcing,space_tol,next,passes,transfer_error)
        type(adaptive_field), intent(in) :: state
        real(rk), intent(in) :: time,h,diffusion,space_tol
        procedure(known_source) :: forcing
        type(adaptive_field), intent(out) :: next
        integer, intent(out) :: passes
        real(rk), intent(out) :: transfer_error
        type(adaptive_field) :: combined, evolved
        real(rk) :: first_error
    ! @note-end heat_time_driver-note-1
        if (h <= 0 .or. diffusion <= 0) error stop "positive timestep and diffusion required"
        ! @note-start heat_time_driver-note-2
        call build_field(combined_value,state%k,space_tol,9,size(state%width),combined,.true.)
        call checked_heat_step(combined,diffusion,h,1.0e-12_rk,space_tol,9,6,evolved,passes,first_error)
        ! Rebuild after adding the endpoint source, which can contain new spatial structure.
        call build_field(endpoint_value,state%k,space_tol,9,size(state%width),combined,.true.)
        call coarsen_field(combined,space_tol,next,transfer_error)
        ! @note-end heat_time_driver-note-2
        if (.not. all(ieee_is_finite(next%values(:,:,1:next%nbox)))) error stop "invalid heat state"
    contains
        ! @note-start heat_time_driver-note-3
        real(rk) function combined_value(x,z) result(v)
            real(rk), intent(in) :: x,z
            real(rk) :: old(1,1)
            call evaluate_field(state,[x],[z],old)
            v = old(1,1)+h*forcing(x,z,time)/2
        end function combined_value
        ! @note-end heat_time_driver-note-3
        ! @note-start heat_time_driver-note-4
        real(rk) function endpoint_value(x,z) result(v)
            real(rk), intent(in) :: x,z
            real(rk) :: old(1,1)
            call evaluate_field(evolved,[x],[z],old)
            v = old(1,1)+h*forcing(x,z,time+h)/2
        end function endpoint_value
        ! @note-end heat_time_driver-note-4
    end subroutine advance_known_heat
end module heat_time_driver
```

### 3. 一个时间步中的三个场

<!-- note-start: heat_time_driver-note-2 heat_time_driver-note-3 heat_time_driver-note-4 -->

记当前数值场为 $\theta_n$，已知源为 $f(x,z,t)$，$H_D(h)$ 为混合边界热传播。更新公式仍是

$$
\theta_{n+1}=H_D(h)\left(\theta_n+\frac h2f_n\right)+\frac h2f_{n+1}.
$$

`combined_value` 从 `state` 的当前叶盒插值得到旧场，再加旧端点源。`build_field` 按这个组合函数重新建树，避免源项出现了旧树没有分辨的新结构。

`checked_heat_step` 返回传播后的 `evolved`。随后 `endpoint_value` 在它上面加新端点源，再建树并粗化。两次内部函数都通过宿主关联访问 `state`、`evolved`、`time`、`h` 和 `forcing`，调用者只需提供 `forcing(x,z,t)`。

`next` 与 `state` 是两个不同对象。调用返回后，外层才执行 `state=next` 和时间更新。树改变后只按坐标读取数值，不保留旧盒号。这里没有多步历史，也不通过解析真值重置状态。

<!-- note-end: heat_time_driver-note-2 heat_time_driver-note-3 heat_time_driver-note-4 -->

### 4. 各种容差控制什么

<!-- note-start: heat_time_driver-note-1 -->

`space_tol` 用于组合源的表示、热输出表示和最后的粗化。它不是整个时间积分的总误差上界；累计时间误差仍随步长变化。`transfer_error` 只比较粗化前后的同一数值场，`passes` 记录本步热传播的输出检查轮数。

<!-- note-end: heat_time_driver-note-1 -->

## Chapter 13：小型数值工具

### 1. 目标

后面需要解小型椭圆系统、计算积分和导数。把这些重复操作集中到一个模块，主算法只保留物理步骤。

### 2. 完整代码

```fortran
module numerical_tools
    use cheb_box, only: rk
    implicit none
    private
    public :: pi, inverse_matrix, gauss_rule, interpolation_matrix, differentiation_matrix
    real(rk), parameter :: pi = acos(-1.0_rk)
contains
    ! @note-start numerical_tools-note-1
    function inverse_matrix(a) result(b)
        real(rk), intent(in) :: a(:,:)
        real(rk) :: b(size(a,1),size(a,1)), work(size(a,1),size(a,1)), row(size(a,1)), pivot, factor
        integer :: n, i, j, p
        n = size(a,1)
        if (size(a,2) /= n) error stop "inverse requires a square matrix"
        work = a
        b = 0
        do i = 1, n
            b(i,i) = 1
        end do
        do j = 1, n
            p = j-1+maxloc(abs(work(j:n,j)),dim=1)
            if (abs(work(p,j)) < tiny(1.0_rk)) error stop "singular matrix"
            row = work(j,:)
            work(j,:) = work(p,:)
            work(p,:) = row
            row = b(j,:)
            b(j,:) = b(p,:)
            b(p,:) = row
            pivot = work(j,j)
            work(j,:) = work(j,:)/pivot
            b(j,:) = b(j,:)/pivot
            do i = 1, n
                if (i == j) cycle
                factor = work(i,j)
                work(i,:) = work(i,:)-factor*work(j,:)
                b(i,:) = b(i,:)-factor*b(j,:)
            end do
        end do
    end function inverse_matrix
    ! @note-end numerical_tools-note-1

    ! @note-start numerical_tools-note-2
    subroutine gauss_rule(n,x,w)
        integer, intent(in) :: n
        real(rk), intent(out) :: x(n), w(n)
        real(rk) :: z, previous, p0, p1, p2, derivative
        integer :: i, j, it
        do i = 1, (n+1)/2
            z = cos(pi*(real(i,rk)-0.25_rk)/(real(n,rk)+0.5_rk))
            do it = 1, 100
                p0 = 1
                p1 = z
                do j = 2, n
                    p2 = ((2*j-1)*z*p1-(j-1)*p0)/j
                    p0 = p1
                    p1 = p2
                end do
                derivative = n*(z*p1-p0)/(z*z-1)
                previous = z
                z = z-p1/derivative
                if (abs(z-previous) < 4*epsilon(z)) exit
            end do
            if (it > 100) error stop "Gauss rule iteration failed"
            x(i) = -z
            x(n+1-i) = z
            w(i) = 2/((1-z*z)*derivative**2)
            w(n+1-i) = w(i)
        end do
    end subroutine gauss_rule
    ! @note-end numerical_tools-note-2

    ! @note-start numerical_tools-note-3
    function interpolation_matrix(nodes,weights,targets) result(b)
        real(rk), intent(in) :: nodes(:), weights(:), targets(:)
        real(rk) :: b(size(targets),size(nodes)), difference(size(nodes))
        integer :: i, j
        do i = 1, size(targets)
            difference = targets(i)-nodes
            j = minloc(abs(difference),dim=1)
            if (abs(difference(j)) < 8*epsilon(1.0_rk)) then
                b(i,:) = 0
                b(i,j) = 1
            else
                b(i,:) = weights/difference
                b(i,:) = b(i,:)/sum(b(i,:))
            end if
        end do
    end function interpolation_matrix
    ! @note-end numerical_tools-note-3

    ! @note-start numerical_tools-note-4
    function differentiation_matrix(nodes,weights) result(d)
        real(rk), intent(in) :: nodes(:), weights(:)
        real(rk) :: d(size(nodes),size(nodes))
        integer :: i, j
        d = 0
        do i = 1, size(nodes)
            do j = 1, size(nodes)
                if (i /= j) d(i,j) = weights(j)/(weights(i)*(nodes(i)-nodes(j)))
            end do
            d(i,i) = -sum(d(i,:))
        end do
    end function differentiation_matrix
    ! @note-end numerical_tools-note-4
end module numerical_tools
```

### 3. 矩阵求逆与节点运算

<!-- note-start: numerical_tools-note-1 -->

`inverse_matrix` 对增广矩阵 $[A,I]$ 做带列内主元选择的 Gauss–Jordan 消元。每次选择当前列绝对值最大的剩余元素作为主元，交换整行，再消去该列。这里矩阵规模只有几十，求逆用于预计算；大规模系统更适合分解后反复求解。

<!-- note-end: numerical_tools-note-1 -->

<!-- note-start: numerical_tools-note-3 -->

重心插值矩阵的一行是

$$
B_{ij}=\frac{\lambda_j/(x_i-r_j)}{\sum_\ell\lambda_\ell/(x_i-r_\ell)}.
$$

<!-- note-end: numerical_tools-note-3 -->

<!-- note-start: numerical_tools-note-3 numerical_tools-note-4 -->

目标点与节点重合时直接写单位行，避免除零。对应的一阶导数矩阵为

<!-- note-end: numerical_tools-note-3 numerical_tools-note-4 -->

<!-- note-start: numerical_tools-note-4 -->

$$
D_{ij}=\frac{\lambda_j}{\lambda_i(r_i-r_j)},\quad i\ne j,
\qquad D_{ii}=-\sum_{j\ne i}D_{ij}.
$$

因此 `matmul(D,v)` 给出一维节点导数。常数的导数为零，由每行元素和为零保证。

<!-- note-end: numerical_tools-note-4 -->

<!-- note-start: numerical_tools-note-2 -->

`gauss_rule` 用 Legendre 多项式递推和 Newton 迭代计算 Gauss–Legendre 节点与权重。它服务于后面的热积分，不是 FGT 密度的额外权重。

<!-- note-end: numerical_tools-note-2 -->

## Chapter 14：周期 Poisson、Hodge 分解与周期 Stokes

### 1. 目标

先在两个方向都周期的单位方盒上建立椭圆逆与无散分解。该模块接收前面的自适应树，Poisson 逆由真实 FGT 热传播积分组成。

### 2. 完整代码

```fortran
module periodic_operators
    use cheb_box, only: rk, cheb_nodes
    use adaptive_boxes, only: adaptive_field
    use heat_output_control, only: refine_leaves
    use fgt_adaptive, only: gaussian_tree
    use numerical_tools, only: pi, differentiation_matrix, gauss_rule
    implicit none
    private
    public :: periodic_heat, periodic_poisson, hodge_project, periodic_stokes_step, field_derivative, field_mean, balance_periodic
contains
    real(rk) function field_mean(field) result(mean)
        type(adaptive_field), intent(in) :: field
        real(rk) :: weights(field%k),angle(field%k)
        integer :: i,n,b
        angle = [(pi*(i-0.5_rk)/field%k,i=1,field%k)]
        weights = 1
        do n = 2, field%k-1, 2
            weights = weights+2*cos(n*angle)/(1.0_rk-n*n)
        end do
        weights = weights/field%k
        mean = 0
        do b = 1, field%nbox
            if (field%child(1,b) /= 0) cycle
            mean = mean+field%width(b)**2*dot_product(weights,matmul(field%values(:,:,b),weights))
        end do
        mean = mean/field%width(1)**2
    end function field_mean

    ! @note-start periodic_operators-note-1
    function field_derivative(field,axis) result(derivative)
        type(adaptive_field), intent(in) :: field
        integer, intent(in) :: axis
        type(adaptive_field) :: derivative
        real(rk) :: nodes(field%k),weights(field%k),d(field%k,field%k)
        integer :: j,b
        if (axis < 1 .or. axis > 2) error stop "derivative axis must be 1 or 2"
        call cheb_nodes(field%k,nodes)
        weights = [((-1.0_rk)**(j-1)*sin(pi*(j-0.5_rk)/field%k),j=1,field%k)]
        d = differentiation_matrix(nodes,weights)
        derivative = field
        derivative%values = 0
        derivative%indicator = -1
        do b = 1, field%nbox
            if (field%child(1,b) /= 0) cycle
            if (axis == 1) then
                derivative%values(:,:,b) = 2*matmul(d,field%values(:,:,b))/field%width(b)
            else
                derivative%values(:,:,b) = 2*matmul(field%values(:,:,b),transpose(d))/field%width(b)
            end if
        end do
    end function field_derivative
    ! @note-end periodic_operators-note-1

    ! @note-start periodic_operators-note-2
    subroutine balance_periodic(field)
        type(adaptive_field), intent(inout) :: field
        logical :: marked(size(field%width))
        real(rk) :: distance(2),reach
        integer :: a,b
        do
            marked = .false.
            do a = 1, field%nbox
                if (field%child(1,a) /= 0) cycle
                do b = a+1, field%nbox
                    if (field%child(1,b) /= 0 .or. abs(field%level(a)-field%level(b)) <= 1) cycle
                    distance = abs(field%center(:,a)-field%center(:,b))
                    distance = min(distance,field%width(1)-distance)
                    reach = (field%width(a)+field%width(b))/2+32*epsilon(1.0_rk)
                    if (any(distance > reach)) cycle
                    if (field%level(a) < field%level(b)) then
                        marked(a) = .true.
                    else
                        marked(b) = .true.
                    end if
                end do
            end do
            if (.not. any(marked)) exit
            call refine_leaves(field,marked,10)
        end do
    end subroutine balance_periodic
    ! @note-end periodic_operators-note-2

    ! @note-start periodic_operators-note-3
    function periodic_heat(field,diffusion,h,eps) result(output)
        type(adaptive_field), intent(in) :: field
        real(rk), intent(in) :: diffusion,h,eps
        type(adaptive_field) :: output
        real(rk), allocatable :: potential(:,:,:)
        if (h <= 0 .or. diffusion <= 0) error stop "positive heat lag required"
        output = field
        call gaussian_tree(field,4*diffusion*h,eps,potential,.true.)
        output%values(:,:,1:field%nbox) = potential/(4*pi*diffusion*h)
        output%indicator = -1
    end function periodic_heat
    ! @note-end periodic_operators-note-3

    ! @note-start periodic_operators-note-4
    subroutine periodic_poisson(rho,tolerance,phi,monitor,heat_calls)
        type(adaptive_field), intent(in) :: rho
        real(rk), intent(in) :: tolerance
        type(adaptive_field), intent(out) :: phi
        real(rk), intent(out) :: monitor
        integer, intent(out) :: heat_calls
        type(adaptive_field) :: source,coarse,fine
        real(rk) :: mean,bound,left_tail,right_tail,start,finish,gauge
        integer :: panels,b
        if (abs(rho%width(1)-1) > epsilon(1.0_rk)) error stop "Poisson requires unit periodic square"
        if (tolerance < 1.0e-11_rk .or. tolerance > 1.0e-3_rk) error stop "invalid Poisson tolerance"
        mean = field_mean(rho)
        if (abs(mean) > tolerance/8) error stop "non-neutral periodic Poisson source"
        source = rho
        bound = 0
        do b = 1, rho%nbox
            if (rho%child(1,b) /= 0) cycle
            source%values(:,:,b) = rho%values(:,:,b)-mean
            bound = max(bound,maxval(abs(source%values(:,:,b))))
        end do
        heat_calls = 0
        monitor = 0
        phi = source
        phi%values = 0
        if (bound < tiny(1.0_rk)) return
        start = min(1.0e-5_rk,tolerance/(128*bound))
        finish = max(0.25_rk,log(max(1.0_rk,128*bound/tolerance))/(4*pi*pi))
        left_tail = start*bound
        right_tail = bound*exp(-4*pi*pi*finish)/(pi*pi*(1-exp(-4*pi*pi*finish))**2)
        panels = ceiling(log(finish/start)/2)
        call integrate_heat(8,coarse)
        call integrate_heat(16,fine)
        monitor = maxval(abs(coarse%values(:,:,1:rho%nbox)-fine%values(:,:,1:rho%nbox)))+left_tail+right_tail
        if (monitor > tolerance/2) error stop "heat-integral quadrature unresolved"
        phi = fine
        gauge = field_mean(phi)
        do b = 1, phi%nbox
            if (phi%child(1,b) == 0) phi%values(:,:,b) = phi%values(:,:,b)-gauge
        end do
    ! @note-end periodic_operators-note-4
    contains
        ! @note-start periodic_operators-note-5
        subroutine integrate_heat(order,result)
            integer, intent(in) :: order
            type(adaptive_field), intent(out) :: result
            type(adaptive_field) :: evolved
            real(rk) :: nodes(order),weights(order),lo,hi,mid,half,lag,weight
            integer :: panel,j
            result = source
            result%values = 0
            call gauss_rule(order,nodes,weights)
            do panel = 1, panels
                lo = log(start)+log(finish/start)*(panel-1)/panels
                hi = log(start)+log(finish/start)*panel/panels
                mid = (lo+hi)/2
                half = (hi-lo)/2
                do j = 1, order
                    lag = exp(mid+half*nodes(j))
                    weight = half*weights(j)*lag
                    evolved = periodic_heat(source,1.0_rk,lag,1.0e-12_rk)
                    result%values(:,:,1:source%nbox) = result%values(:,:,1:source%nbox)-weight*evolved%values(:,:,1:source%nbox)
                    heat_calls = heat_calls+1
                end do
            end do
        end subroutine integrate_heat
        ! @note-end periodic_operators-note-5
    end subroutine periodic_poisson

    ! @note-start periodic_operators-note-6
    subroutine hodge_project(fx,fz,tolerance,ux,uz,pressure,monitor,calls)
        type(adaptive_field), intent(in) :: fx,fz
        real(rk), intent(in) :: tolerance
        type(adaptive_field), intent(out) :: ux,uz,pressure
        real(rk), intent(out) :: monitor
        integer, intent(out) :: calls
        type(adaptive_field) :: gx,gz,rho
        if (fx%nbox /= fz%nbox .or. fx%k /= fz%k) error stop "Hodge requires a common tree"
        if (any(fx%child(:,1:fx%nbox) /= fz%child(:,1:fz%nbox))) error stop "Hodge tree mismatch"
        gx = field_derivative(fx,1)
        gz = field_derivative(fz,2)
        rho = gx
        rho%values = gx%values+gz%values
        call periodic_poisson(rho,tolerance,pressure,monitor,calls)
        gx = field_derivative(pressure,1)
        gz = field_derivative(pressure,2)
        ux = fx
        uz = fz
        ux%values = fx%values-gx%values
        uz%values = fz%values-gz%values
    end subroutine hodge_project
    ! @note-end periodic_operators-note-6

    ! @note-start periodic_operators-note-7
    function periodic_stokes_step(velocity,force0,force1,viscosity,h) result(next)
        type(adaptive_field), intent(in) :: velocity,force0,force1
        real(rk), intent(in) :: viscosity,h
        type(adaptive_field) :: combined,next
        if (velocity%nbox /= force0%nbox .or. velocity%nbox /= force1%nbox) error stop "Stokes source tree mismatch"
        combined = velocity
        combined%values = velocity%values+h*force0%values/2
        next = periodic_heat(combined,viscosity,h,1.0e-12_rk)
        next%values = next%values+h*force1%values/2
    end function periodic_stokes_step
    ! @note-end periodic_operators-note-7
end module periodic_operators
```

### 3. 把 Poisson 逆写成热积分

<!-- note-start: periodic_operators-note-3 periodic_operators-note-4 -->

对零均值源 $\rho$，要求

$$
\Delta\phi=\rho,\qquad \langle\phi\rangle=0.
$$

周期热半群满足 $\partial_tH(t)\rho=\Delta H(t)\rho$，并且零均值部分随时间衰减，所以

$$
\phi=-\int_0^\infty H(t)\rho\,dt.
$$

负号来自积分端点：$\Delta\phi=-[H(t)\rho]_0^\infty=\rho$。常数源不满足周期 Poisson 的相容条件，因此程序先检查源的均值，只有预算以内的舍入量才会被扣除。

`periodic_heat` 直接调用 `gaussian_tree(...,.true.)`，再除以 $4\pi Dh$。这里没有温度壁面，也不使用上下奇延拓。

<!-- note-end: periodic_operators-note-3 periodic_operators-note-4 -->

### 4. 无穷时间区间的处理

<!-- note-start: periodic_operators-note-4 periodic_operators-note-5 -->

代码截取 $[a,b]$，以 $s=\log t$ 变换积分：

$$
\int_a^b H(t)\rho\,dt
=\int_{\log a}^{\log b}e^sH(e^s)\rho\,ds.
$$

对数分段同时覆盖很短的扩散时间和长时间尾部。每段用两档 Gauss 阶数重复积分，以两者之差监测时间求积。短尾使用 $a$ 乘源幅值估计，长尾利用周期单位盒首个非零 Laplacian 特征值 $4\pi^2$ 的衰减估计。当前源幅值取叶节点最大值，`monitor` 是操作性估计，不能替代独立空间误差检查。

最后再扣除势的均值，固定压力规范。此模块属于项目推导的热积分 Poisson 方案，不是论文中的 FMM Poisson 实现。

<!-- note-end: periodic_operators-note-4 periodic_operators-note-5 -->

### 5. Hodge 分解的调用关系

<!-- note-start: periodic_operators-note-1 periodic_operators-note-2 periodic_operators-note-6 -->

给定向量场 $\boldsymbol F$，

$$
\Delta\phi=\nabla\cdot\boldsymbol F,\qquad
\boldsymbol F_s=\boldsymbol F-\nabla\phi.
$$

`hodge_project` 先逐叶求导构造散度，再求 $\phi$，最后逐叶减去梯度。势只确定到常数，但梯度唯一；向量场原来的常数均值应保留，它代表合法的周期均匀流。

两分量必须放在同一棵树上。`field_derivative` 对物理盒再乘 $2/w_B$，不能直接把参考坐标导数当作物理导数。`balance_periodic` 检查两个方向的周期接缝，与只有水平周期的热物理树不同。

<!-- note-end: periodic_operators-note-1 periodic_operators-note-2 periodic_operators-note-6 -->

### 6. 周期 Stokes 的时间步

<!-- note-start: periodic_operators-note-7 -->

投影后的速度满足

$$
\boldsymbol u_t=\nu\Delta\boldsymbol u+\boldsymbol F_s.
$$

`periodic_stokes_step` 对一个速度分量执行

$$
u_{n+1}=H_\nu(h)\left(u_n+\frac h2F_{s,n}\right)+\frac h2F_{s,n+1}.
$$

调用者对两个分量分别调用，并保证两个端点源已经完成 Hodge 投影。这里的 Helmholtz 指 Helmholtz–Hodge 分解，不是修改 Helmholtz 方程。

<!-- note-end: periodic_operators-note-7 -->

## Chapter 15：板间问题的辅助网格

### 1. 目标

为真实上下壁准备速度求导、Poisson 逆、密输出和去混叠所需的公共表示。水平使用 Fourier，竖直使用包含两壁的 Chebyshev–Lobatto 节点。

### 2. 完整代码

```fortran
module slab_grid
    use cheb_box, only: rk
    use numerical_tools
    implicit none
    private
    public :: auxiliary_grid, make_grid, fourier, physical, dx, dz, laplacian, poisson_dirichlet
    public :: grid_coefficients, evaluate_grid, fine_values, restrict_product, integral, inner_product
    type :: auxiliary_grid
        integer :: nx = 0, nz = 0, nxf = 0, nzf = 0
        real(rk), allocatable :: x(:), z(:), frequency(:), d(:,:), d2(:,:), v(:,:), iv(:,:), inverse(:,:,:)
        real(rk), allocatable :: lift(:,:,:), xf(:), zf(:), vf(:,:), ivf(:,:), gram(:,:), moments(:)
        complex(rk), allocatable :: transform(:,:), synthesis(:,:), fine_synthesis(:,:), fine_transform(:,:)
    end type auxiliary_grid
contains
    ! @note-start slab_grid-note-1
    subroutine make_grid(g,nx,nz)
        type(auxiliary_grid), intent(out) :: g
        integer, intent(in) :: nx, nz
        real(rk) :: weights(nz), matrix(nz-2,nz-2), a
        integer :: i, j, m, mode
        if (nx < 8 .or. mod(nx,2) /= 0 .or. nz < 8) error stop "invalid auxiliary grid"
        g%nx = nx
        g%nz = nz
        g%nxf = 3*nx/2
        g%nzf = 2*nz-1
        allocate(g%x(nx),g%z(nz),g%frequency(nx),g%d(nz,nz),g%d2(nz,nz),g%v(nz,nz),g%iv(nz,nz))
        allocate(g%inverse(nz-2,nz-2,nx),g%lift(nz,2,nx),g%gram(nz,nz),g%moments(nz))
        allocate(g%xf(g%nxf),g%zf(g%nzf),g%vf(g%nzf,g%nzf),g%ivf(g%nzf,g%nzf))
        allocate(g%transform(nx,nx),g%synthesis(nx,nx),g%fine_synthesis(g%nxf,nx),g%fine_transform(nx,g%nxf))
        g%x = [(real(i-1,rk)/nx,i=1,nx)]
        g%z = [(0.5_rk*(1-cos(pi*real(i-1,rk)/(nz-1))),i=1,nz)]
        weights = [((-1.0_rk)**(i-1),i=1,nz)]
        weights(1) = weights(1)/2
        weights(nz) = weights(nz)/2
        g%d = differentiation_matrix(g%z,weights)
        g%d2 = matmul(g%d,g%d)
        g%xf = [(real(i-1,rk)/g%nxf,i=1,g%nxf)]
        g%zf = [(0.5_rk*(1-cos(pi*real(i-1,rk)/(g%nzf-1))),i=1,g%nzf)]
        do j = 1, nz
            g%v(:,j) = cos((j-1)*acos(2*g%z-1))
            g%moments(j) = moment(j-1)
            do i = 1, nz
                g%gram(i,j) = (moment(i+j-2)+moment(abs(i-j)))/2
            end do
        end do
        do j = 1, g%nzf
            g%vf(:,j) = cos((j-1)*acos(2*g%zf-1))
        end do
        g%iv = inverse_matrix(g%v)
        g%ivf = inverse_matrix(g%vf)
        do m = 1, nx
            mode = m-1
            if (mode >= nx/2) mode = mode-nx
            g%frequency(m) = 2*pi*mode
            g%synthesis(:,m) = exp(cmplx(0.0_rk,g%frequency(m)*g%x,rk))
            g%transform(m,:) = conjg(g%synthesis(:,m))/nx
            g%fine_synthesis(:,m) = exp(cmplx(0.0_rk,g%frequency(m)*g%xf,rk))
            g%fine_transform(m,:) = conjg(g%fine_synthesis(:,m))/g%nxf
            a = abs(g%frequency(m))
            matrix = -g%d2(2:nz-1,2:nz-1)
            do i = 1, nz-2
                matrix(i,i) = matrix(i,i)+a*a
            end do
            g%inverse(:,:,m) = inverse_matrix(matrix)
            if (m == 1) then
                g%lift(:,1,m) = 1-g%z
                g%lift(:,2,m) = g%z
            else
                g%lift(:,1,m) = (exp(-a*g%z)-exp(-a*(2-g%z)))/(1-exp(-2*a))
                g%lift(:,2,m) = (exp(-a*(1-g%z))-exp(-a*(1+g%z)))/(1-exp(-2*a))
            end if
        end do
    end subroutine make_grid
    ! @note-end slab_grid-note-1

    ! @note-start slab_grid-note-2
    pure real(rk) function moment(n)
        integer, intent(in) :: n
        moment = 0
        if (mod(n,2) == 0) moment = 1.0_rk/(1.0_rk-real(n,rk)**2)
    end function moment
    ! @note-end slab_grid-note-2

    ! @note-start slab_grid-note-3
    function fourier(g,v) result(c)
        type(auxiliary_grid), intent(in) :: g
        real(rk), intent(in) :: v(:,:)
        complex(rk) :: c(g%nx,g%nz)
        c = matmul(g%transform,cmplx(v,0.0_rk,rk))
    end function fourier

    function physical(g,c) result(v)
        type(auxiliary_grid), intent(in) :: g
        complex(rk), intent(in) :: c(:,:)
        real(rk) :: v(g%nx,g%nz)
        v = real(matmul(g%synthesis,c),rk)
    end function physical
    ! @note-end slab_grid-note-3

    ! @note-start slab_grid-note-4
    function dx(g,v) result(result)
        type(auxiliary_grid), intent(in) :: g
        real(rk), intent(in) :: v(:,:)
        real(rk) :: result(g%nx,g%nz)
        complex(rk) :: c(g%nx,g%nz)
        integer :: m
        c = fourier(g,v)
        do m = 1, g%nx
            c(m,:) = cmplx(0.0_rk,g%frequency(m),rk)*c(m,:)
        end do
        result = physical(g,c)
    end function dx

    function dz(g,v) result(result)
        type(auxiliary_grid), intent(in) :: g
        real(rk), intent(in) :: v(:,:)
        real(rk) :: result(g%nx,g%nz)
        result = matmul(v,transpose(g%d))
    end function dz

    function laplacian(g,v) result(result)
        type(auxiliary_grid), intent(in) :: g
        real(rk), intent(in) :: v(:,:)
        real(rk) :: result(g%nx,g%nz)
        complex(rk) :: c(g%nx,g%nz)
        integer :: m
        c = fourier(g,v)
        do m = 1, g%nx
            c(m,:) = -g%frequency(m)**2*c(m,:)
        end do
        result = physical(g,c)+matmul(v,transpose(g%d2))
    end function laplacian
    ! @note-end slab_grid-note-4

    ! @note-start slab_grid-note-5
    function poisson_dirichlet(g,rho) result(p)
        type(auxiliary_grid), intent(in) :: g
        complex(rk), intent(in) :: rho(:,:)
        complex(rk) :: p(g%nx,g%nz)
        integer :: m
        p = 0
        do m = 1, g%nx
            p(m,2:g%nz-1) = matmul(g%inverse(:,:,m),rho(m,2:g%nz-1))
        end do
    end function poisson_dirichlet
    ! @note-end slab_grid-note-5

    ! @note-start slab_grid-note-6
    function grid_coefficients(g,v) result(c)
        type(auxiliary_grid), intent(in) :: g
        real(rk), intent(in) :: v(:,:)
        complex(rk) :: c(g%nx,g%nz)
        c = matmul(fourier(g,v),transpose(g%iv))
    end function grid_coefficients

    function evaluate_grid(g,c,x,z) result(v)
        type(auxiliary_grid), intent(in) :: g
        complex(rk), intent(in) :: c(:,:)
        real(rk), intent(in) :: x(:), z(:)
        real(rk) :: v(size(x),size(z)), vz(size(z),g%nz)
        complex(rk) :: ex(size(x),g%nx)
        integer :: j
        do j = 1, g%nx
            ex(:,j) = exp(cmplx(0.0_rk,g%frequency(j)*x,rk))
        end do
        do j = 1, g%nz
            vz(:,j) = cos((j-1)*acos(max(-1.0_rk,min(1.0_rk,2*z-1))))
        end do
        v = real(matmul(matmul(ex,c),transpose(vz)),rk)
    end function evaluate_grid
    ! @note-end slab_grid-note-6

    ! @note-start slab_grid-note-7
    function fine_values(g,v) result(f)
        type(auxiliary_grid), intent(in) :: g
        real(rk), intent(in) :: v(:,:)
        real(rk) :: f(g%nxf,g%nzf)
        f = real(matmul(matmul(g%fine_synthesis,grid_coefficients(g,v)),transpose(g%vf(:,1:g%nz))),rk)
    end function fine_values

    function restrict_product(g,f) result(v)
        type(auxiliary_grid), intent(in) :: g
        real(rk), intent(in) :: f(:,:)
        real(rk) :: v(g%nx,g%nz)
        complex(rk) :: c(g%nx,g%nzf)
        c = matmul(matmul(g%fine_transform,cmplx(f,0.0_rk,rk)),transpose(g%ivf))
        c(g%nx/2+1,:) = 0
        v = physical(g,matmul(c(:,1:g%nz),transpose(g%v)))
    end function restrict_product
    ! @note-end slab_grid-note-7

    ! @note-start slab_grid-note-8
    real(rk) function integral(g,v) result(value)
        type(auxiliary_grid), intent(in) :: g
        real(rk), intent(in) :: v(:,:)
        value = dot_product(matmul(g%iv,sum(v,dim=1)/g%nx),g%moments)
    end function integral

    real(rk) function inner_product(g,v,w) result(value)
        type(auxiliary_grid), intent(in) :: g
        real(rk), intent(in) :: v(:,:), w(:,:)
        complex(rk) :: a(g%nx,g%nz), b(g%nx,g%nz)
        integer :: m
        a = grid_coefficients(g,v)
        b = grid_coefficients(g,w)
        value = 0
        do m = 1, g%nx
            if (m == g%nx/2+1) then
                value = value+real(dot_product(a(m,:),matmul(g%gram,b(m,:))),rk)/2
            else
                value = value+real(dot_product(a(m,:),matmul(g%gram,b(m,:))),rk)
            end if
        end do
    ! @note-end slab_grid-note-8
    end function inner_product
end module slab_grid
```

### 3. 数组与变换

<!-- note-start: slab_grid-note-1 slab_grid-note-3 slab_grid-note-4 slab_grid-note-6 -->

`v(i,j)` 的第一轴是水平方向，第二轴是竖直方向。

$$
x_i=\frac{i-1}{N_x},\qquad
z_j=\frac{1-\cos(\pi(j-1)/(N_z-1))}{2}.
$$

`fourier` 的正变换除以 $N_x$，`physical` 的逆变换不再除。`frequency` 保存 $2\pi m$，负频率放在数组后半段。水平求导乘 $ia_m$，竖向求导使用 `D`；Laplacian 则是两方向二阶导数之和。

`grid_coefficients` 将节点值进一步转换成 Fourier–Chebyshev 系数。`evaluate_grid` 接收任意两组坐标，返回它们的笛卡尔积上的数值。这是辅助网格和自适应盒之间的取值接口。

<!-- note-end: slab_grid-note-1 slab_grid-note-3 slab_grid-note-4 slab_grid-note-6 -->

### 4. Dirichlet Poisson 逆的符号

<!-- note-start: slab_grid-note-5 -->

对每个水平波数，定义

$$
L_m=\partial_{zz}-a_m^2,\qquad A_m=-L_m.
$$

`inverse(:,:,m)` 存储内部点矩阵 $A_m^{-1}$。因此 `poisson_dirichlet(g,rho)` 求的是

$$
-\Delta v=\rho,\qquad v|_{z=0,1}=0.
$$

它与上一章 $\Delta\phi=\rho$ 的符号不同。这里特意采用正算子逆，供流函数和源势使用。边界节点不作为未知量，返回数组的两壁值为零。

<!-- note-end: slab_grid-note-5 -->

### 5. 非线性乘积的去混叠

<!-- note-start: slab_grid-note-7 -->

`fine_values` 把原场评价到 $3N_x/2$ 个水平点和 $2N_z-1$ 个竖向点。两个方向的导数也先从原场求出，再评价到这些点上；乘积在加密点计算。

`restrict_product` 将乘积变换回系数，截去超出原表示范围的部分，并清除水平 Nyquist 模态，再回到原网格。这样不会直接把节点乘积中的高频误认成原网格的低频。

<!-- note-end: slab_grid-note-7 -->

### 6. 物理积分

<!-- note-start: slab_grid-note-2 slab_grid-note-8 -->

单位高度上的 Chebyshev 矩为

$$
\int_0^1T_n(2z-1)\,dz=
\begin{cases}
(1-n^2)^{-1},&n\text{ 为偶数},\\
0,&n\text{ 为奇数}.
\end{cases}
$$

`integral` 取水平零模态，再应用这些矩。`inner_product` 用

$$
T_iT_j=\frac12(T_{i+j}+T_{|i-j|})
$$

预计算 Gram 矩阵，直接积分两个表示多项式的乘积。因此动能和热输运不依赖简单的节点算术平均。

这套网格负责导数和椭圆辅助计算；它不执行完整状态的谱热推进。辅助分辨率仍需独立加密，自适应体积树无法补回这里已经截掉的频率。

<!-- note-end: slab_grid-note-2 slab_grid-note-8 -->

## Chapter 16：辅助表示与自适应 FGT 的连接

### 1. 目标

让速度涡量、平均流和温度的体积扩散都调用现有自适应混合边界热算子，同时把源表示和输出表示的误差分开检查。

### 2. 完整代码

```fortran
module slab_heat
    use cheb_box, only: rk, cheb_nodes, evaluate_box
    use adaptive_boxes, only: adaptive_field, build_field, evaluate_field, mark_unbalanced
    use heat_output_control, only: refine_leaves, checked_heat_step
    use slab_grid, only: auxiliary_grid, grid_coefficients, evaluate_grid
    implicit none
    private
    public :: sample_grid_field, heat_on_grid, heat_statistics
    type :: heat_statistics
        integer :: calls = 0, min_leaves = huge(1), max_leaves = 0, max_level = 0, refinements = 0
        real(rk) :: source_monitor = 0, output_monitor = 0
    end type heat_statistics
contains
    ! @note-start slab_heat-note-1
    subroutine sample_grid_field(g,values,k,tol,min_level,field)
        type(auxiliary_grid), intent(in) :: g
        real(rk), intent(in) :: values(:,:), tol
        integer, intent(in) :: k, min_level
        type(adaptive_field), intent(out) :: field
        complex(rk) :: coefficients(g%nx,g%nz)
        real(rk) :: nodes(k), x(k), z(k), probes(2*k+1), xp(2*k+1), zp(2*k+1), predicted(2*k+1,2*k+1)
        logical :: marked(4096), balance_marks(4096)
        integer :: b,i,pass
        coefficients = grid_coefficients(g,values)
        call build_field(zero,k,tol,0,4096,field)
        call cheb_nodes(k,nodes)
        probes = [(-1.0_rk+real(i-1,rk)/k,i=1,2*k+1)]
        do pass = 1, 9
            marked = .false.
            do b = 1, field%nbox
                if (field%child(1,b) /= 0) cycle
                x = field%center(1,b)+field%width(b)*nodes/2
                z = field%center(2,b)+field%width(b)*nodes/2
                field%values(:,:,b) = evaluate_grid(g,coefficients,x,z)
                xp = field%center(1,b)+field%width(b)*probes/2
                zp = field%center(2,b)+field%width(b)*probes/2
                call evaluate_box(field%values(:,:,b),field%center(:,b),field%width(b),xp,zp,predicted)
                field%indicator(b) = maxval(abs(predicted-evaluate_grid(g,coefficients,xp,zp)))
                marked(b) = field%indicator(b) > tol .or. field%level(b) < min_level
            end do
            call mark_unbalanced(field,balance_marks)
            marked = marked .or. balance_marks
            if (.not. any(marked)) return
            call refine_leaves(field,marked,7)
        end do
        error stop "source sampling did not converge"
    contains
        real(rk) function zero(x,z)
            real(rk), intent(in) :: x,z
            zero = 0*(x+z)
        end function zero
    end subroutine sample_grid_field
    ! @note-end slab_heat-note-1

    ! @note-start slab_heat-note-2
    function heat_on_grid(g,values,diffusion,h,k,tol,min_level,stats) result(output)
        type(auxiliary_grid), intent(in) :: g
        real(rk), intent(in) :: values(:,:), diffusion,h,tol
        integer, intent(in) :: k,min_level
        type(heat_statistics), intent(inout) :: stats
        real(rk) :: output(g%nx,g%nz), first_error
        type(adaptive_field) :: source, evolved
        integer :: passes, leaves
        if (h <= 0 .or. diffusion <= 0) error stop "invalid heat parameters"
        if (maxval(abs(values)) < 1.0e-27_rk) then
            output = 0
            return
        end if
        call sample_grid_field(g,values,k,tol,min_level,source)
        stats%source_monitor = max(stats%source_monitor,maxval(source%indicator(1:source%nbox)))
        call checked_heat_step(source,diffusion,h,1.0e-12_rk,8*tol,7,5,evolved,passes,first_error)
        call evaluate_field(evolved,g%x,g%z,output)
        stats%calls = stats%calls+2*passes
        leaves = count(evolved%child(1,1:evolved%nbox) == 0)
        stats%min_leaves = min(stats%min_leaves,leaves)
        stats%max_leaves = max(stats%max_leaves,leaves)
        stats%max_level = max(stats%max_level,maxval(evolved%level(1:evolved%nbox)))
        stats%refinements = stats%refinements+passes-1
        stats%output_monitor = max(stats%output_monitor,maxval(evolved%indicator(1:evolved%nbox)))
    end function heat_on_grid
    ! @note-end slab_heat-note-2
end module slab_heat
```

### 3. 从辅助场建立源树

<!-- note-start: slab_heat-note-1 -->

`sample_grid_field` 先保存原场的 Fourier–Chebyshev 系数，再从根盒开始。对每个叶盒：

1. 在盒的 Chebyshev 根节点上评价原辅助场；
2. 用盒多项式插值到额外探针；
3. 在相同探针直接评价原辅助场；
4. 超过容差或低于最低层数时细化。

所有新叶盒都重新读取同一个辅助场。细化不是反复插值上一次已被拒绝的源多项式。随后加入周期 2:1 平衡所需的标记，直到源表示和几何都满足要求。

<!-- note-end: slab_heat-note-1 -->

### 4. 实际扩散的路径

<!-- note-start: slab_heat-note-2 -->

~~~text
heat_on_grid
  → sample_grid_field
  → checked_heat_step
  → heat_step_adaptive
  → extend_mixed
  → gaussian_tree
  → FGT 库 boxfgt
  → evaluate_field
~~~

返回辅助节点上的数组后，才参与壁修正和时间更新。`heat_statistics` 累计真实调用数、叶盒范围、最大层数、输出重新传播轮数及两类分辨率指标。

每次源树都从当前数值场重建，所以叶盒数可随场的平滑或局部结构改变。持久时间状态保存在辅助表示中，没有把上一树的盒号作为历史传递。该选择简化了状态管理，但不能据此称整个求解器的所有自由度都是局部自适应的。

<!-- note-end: slab_heat-note-2 -->

## Chapter 17：真实无滑移 Stokes 壁面

### 1. 目标

同时满足不可压条件和两壁的两个速度分量为零。采用流函数–涡量表示，以两列壁响应修正 FGT 得到的体积热势。

### 2. 完整代码

```fortran
module wall_stokes
    use cheb_box, only: rk
    use numerical_tools, only: pi, inverse_matrix
    use slab_grid
    implicit none
    private
    public :: wall_operator, make_wall_operator, apply_lift, impose_noslip, velocity_from_vorticity, recover_pressure
    type :: wall_operator
        real(rk), allocatable :: j(:,:,:), b(:,:,:), influence_inverse(:,:,:)
    end type wall_operator
contains
    ! @note-start wall_stokes-note-1
    subroutine make_wall_operator(g,diffusion,h,wall)
        type(auxiliary_grid), intent(in) :: g
        real(rk), intent(in) :: diffusion,h
        type(wall_operator), intent(out) :: wall
        real(rk) :: heat(g%nz,2), psi(g%nz,2), influence(2,2), rate, coefficient, a
        integer :: m,n,c,nmax
        if (diffusion <= 0 .or. h <= 0) error stop "invalid wall response parameters"
        allocate(wall%j(g%nz,2,g%nx),wall%b(g%nz,2,g%nx),wall%influence_inverse(2,2,g%nx))
        wall%j = 0
        wall%influence_inverse = 0
        nmax = ceiling(sqrt(40/(diffusion*h))/pi)+1
        do m = 1, g%nx
            a = abs(g%frequency(m))
            heat = 0
            ! Only two boundary lifting functions are propagated analytically.
            do n = 1, nmax
                rate = a*a+(pi*n)**2
                coefficient = 2*pi*n*exp(-diffusion*h*rate)/rate
                heat(:,1) = heat(:,1)+coefficient*sin(pi*n*g%z)
                heat(:,2) = heat(:,2)-(-1.0_rk)**n*coefficient*sin(pi*n*g%z)
            end do
            do c = 1, 2
                wall%j(2:g%nz-1,c,m) = matmul(g%inverse(:,:,m),g%lift(2:g%nz-1,c,m)-heat(2:g%nz-1,c))/diffusion
            end do
            wall%b(:,:,m) = g%lift(:,:,m)-wall%j(:,:,m)/h
            if (m == 1) cycle
            psi = 0
            psi(2:g%nz-1,:) = matmul(g%inverse(:,:,m),wall%b(2:g%nz-1,:,m))
            influence(1,:) = matmul(g%d(1,:),psi)
            influence(2,:) = matmul(g%d(g%nz,:),psi)
            wall%influence_inverse(:,:,m) = inverse_matrix(influence)
        end do
    end subroutine make_wall_operator
    ! @note-end wall_stokes-note-1

    ! @note-start wall_stokes-note-2
    function apply_lift(g,matrix,boundary) result(v)
        type(auxiliary_grid), intent(in) :: g
        real(rk), intent(in) :: matrix(:,:,:)
        complex(rk), intent(in) :: boundary(:,:)
        complex(rk) :: v(g%nx,g%nz)
        integer :: m
        do m = 1, g%nx
            v(m,:) = matmul(matrix(:,:,m),boundary(m,:))
        end do
    end function apply_lift
    ! @note-end wall_stokes-note-2

    ! @note-start wall_stokes-note-3
    function impose_noslip(g,wall,rhs) result(omega)
        type(auxiliary_grid), intent(in) :: g
        type(wall_operator), intent(in) :: wall
        complex(rk), intent(in) :: rhs(:,:)
        complex(rk) :: omega(g%nx,g%nz), psi(g%nx,g%nz), boundary(2), new_boundary(2)
        integer :: m
        psi = poisson_dirichlet(g,rhs)
        omega = rhs
        omega(1,:) = 0
        do m = 2, g%nx
            boundary(1) = sum(g%d(1,:)*psi(m,:))
            boundary(2) = sum(g%d(g%nz,:)*psi(m,:))
            new_boundary = -matmul(wall%influence_inverse(:,:,m),boundary)
            omega(m,:) = rhs(m,:)+matmul(wall%b(:,:,m),new_boundary)
        end do
        omega(g%nx/2+1,:) = 0
    end function impose_noslip
    ! @note-end wall_stokes-note-3

    subroutine velocity_from_vorticity(g,omega,mean_u,u,w)
        type(auxiliary_grid), intent(in) :: g
        real(rk), intent(in) :: omega(:,:),mean_u(:)
        real(rk), intent(out) :: u(g%nx,g%nz),w(g%nx,g%nz)
        complex(rk) :: psi(g%nx,g%nz), c(g%nx,g%nz)
        integer :: m
        ! @note-start wall_stokes-note-4
        psi = poisson_dirichlet(g,fourier(g,omega))
        psi(1,:) = 0
        ! @note-end wall_stokes-note-4
        ! @note-start wall_stokes-note-5
        u = physical(g,matmul(psi,transpose(g%d)))+spread(mean_u,1,g%nx)
        do m = 1, g%nx
            c(m,:) = -cmplx(0.0_rk,g%frequency(m),rk)*psi(m,:)
        end do
        w = physical(g,c)
        ! @note-end wall_stokes-note-5
    end subroutine velocity_from_vorticity

    ! @note-start wall_stokes-note-6
    function recover_pressure(g,u,w,fx,fz,diffusion) result(p)
        type(auxiliary_grid), intent(in) :: g
        real(rk), intent(in) :: u(:,:),w(:,:),fx(:,:),fz(:,:),diffusion
        real(rk) :: p(g%nx,g%nz), matrix(g%nz,g%nz), c(g%nz), antiderivative(g%nz+1), values(g%nz)
        complex(rk) :: rho(g%nx,g%nz), wall(g%nx,g%nz), phat(g%nx,g%nz), rhs(g%nz)
        integer :: m,i,n
        if (any(shape(u) /= shape(w))) error stop "velocity shape mismatch"
        rho = fourier(g,dx(g,fx)+dz(g,fz))
        wall = fourier(g,diffusion*laplacian(g,w)+fz)
        phat = 0
        do m = 2, g%nx
            matrix = g%d2
            do i = 1, g%nz
                matrix(i,i) = matrix(i,i)-g%frequency(m)**2
            end do
            matrix(1,:) = g%d(1,:)
            matrix(g%nz,:) = g%d(g%nz,:)
            rhs = rho(m,:)
            rhs(1) = wall(m,1)
            rhs(g%nz) = wall(m,g%nz)
            phat(m,:) = matmul(inverse_matrix(matrix),rhs)
        end do
        ! The horizontal mean obeys p_z = mean(F_z); integrate its Chebyshev series.
        c = matmul(g%iv,sum(fz,dim=1)/g%nx)
        antiderivative = 0
        antiderivative(2) = c(1)
        antiderivative(3) = c(2)/4
        do n = 2, g%nz-1
            antiderivative(n+2) = antiderivative(n+2)+c(n+1)/(2*(n+1))
            antiderivative(n) = antiderivative(n)-c(n+1)/(2*(n-1))
        end do
        values = 0
        do n = 0, g%nz
            values = values+antiderivative(n+1)*cos(n*acos(2*g%z-1))/2
        end do
        phat(1,:) = cmplx(values,0.0_rk,rk)
        p = physical(g,phat)
        p = p-integral(g,p)
    end function recover_pressure
    ! @note-end wall_stokes-note-6
end module wall_stokes
```

### 3. 为什么要额外求壁涡量

<!-- note-start: wall_stokes-note-2 wall_stokes-note-4 -->

约定

$$
u=\psi_z,\qquad w=-\psi_x,\qquad
\omega=w_x-u_z=-\Delta\psi.
$$

这一表示自动满足 $u_x+w_z=0$。对非零水平模态，先令 $\psi(0)=\psi(1)=0$，可以保证 $w$ 的壁值为零；切向速度还要求 $\psi_z(0)=\psi_z(1)=0$。后两个条件通过求解壁涡量实现。

令 $g=(\omega(0),\omega(1))$，并定义两个调和提升函数

$$
\ell_0(z)=\frac{\sinh(a(1-z))}{\sinh a},\qquad
\ell_1(z)=\frac{\sinh(az)}{\sinh a},\qquad L\ell_i=0.
$$

$a=0$ 时分别取 $1-z$ 和 $z$。从 $\omega$ 中减去 $\ell g$，剩下的体积场在两壁为零，可以进入混合边界 FGT 热传播。

<!-- note-end: wall_stokes-note-2 wall_stokes-note-4 -->

### 4. 两列壁响应

<!-- note-start: wall_stokes-note-1 wall_stokes-note-3 -->

设 $H_\nu$ 为零 Dirichlet 热传播，

$$
J=\int_0^hH_\nu(s)\ell\,ds,\qquad B=\ell-\frac Jh.
$$

`make_wall_operator` 只对两个固定的提升函数计算 $J$。利用其正弦系数，可直接形成 $H_\nu(h)\ell$，再由

$$
J=(-\nu L_D)^{-1}\bigl(\ell-H_\nu(h)\ell\bigr)
$$

得到时间积分。正弦级数按指数衰减截断；这一步没有对完整速度状态做谱传播。

当一步的其余部分已组成 $R$，新涡量具有

$$
\omega_{n+1}=R+B g_{n+1}.
$$

把它代入 $-\Delta\psi=\omega$，对两壁取 $\psi_z$，得到每个非零水平模态的 $2\times2$ 线性系统：

$$
\left.\partial_z(-L_D)^{-1}B\right|_{\rm walls}g_{n+1}
=-\left.\partial_z(-L_D)^{-1}R\right|_{\rm walls}.
$$

`impose_noslip` 求解此系统。返回的速度直接由修正后的流函数求导，不再把壁面速度人为清零。

<!-- note-end: wall_stokes-note-1 wall_stokes-note-3 -->

### 5. 水平零模态

<!-- note-start: wall_stokes-note-5 -->

若强行对所有模态都规定两壁流函数为零，会误删非零水平流量。因此 `omega` 只保存非零水平模态，水平平均速度 $\bar u(z)$ 单独推进：

$$
\bar u_t=\nu\bar u_{zz}+\overline{F_x},\qquad
\bar u(0)=\bar u(1)=0.
$$

`velocity_from_vorticity` 最后把 `mean_u` 加回 $u$。平均竖向速度仍为零。

<!-- note-end: wall_stokes-note-5 -->

### 6. 压力的边界条件

<!-- note-start: wall_stokes-note-6 -->

由连续动量方程和不可压条件，

$$
\Delta p=\nabla\cdot\boldsymbol F.
$$

静止壁面上的法向动量给出

$$
p_z=\nu\Delta w+F_z.
$$

`recover_pressure` 对非零水平模态求带上述 Neumann 行的系统。平均模态满足 $\bar p_z=\overline{F_z}$，通过 Chebyshev 系数积分恢复。最后扣除物理域平均值固定规范。压力不能沿用温度的零 Dirichlet 边界。

<!-- note-end: wall_stokes-note-6 -->

## Chapter 18：从 Stokes 到 Navier–Stokes 与 Boussinesq

### 1. 目标

把体积扩散、壁修正、对流、浮力和温度方程放入同一个二阶预测校正时间步，并固定状态、诊断和检查点的语义。

### 2. 完整代码

```fortran
module boussinesq_solver
    use cheb_box, only: rk
    use slab_grid
    use slab_heat
    use wall_stokes
    use, intrinsic :: ieee_arithmetic, only: ieee_is_finite
    implicit none
    ! @note-start boussinesq_solver-note-1
    private
    public :: flow_state, flow_solver, configure_solver, zero_state, set_velocity, get_velocity, advance_flow
    public :: flow_forcing, diagnostics, flow_pressure, save_checkpoint, load_checkpoint, external_force
    type :: flow_state
        real(rk), allocatable :: omega(:,:),mean_u(:),theta(:,:)
        real(rk) :: time = 0
    end type flow_state
    type :: flow_solver
        type(auxiliary_grid) :: grid
        type(wall_operator) :: wall
        type(heat_statistics) :: stats
        real(rk) :: pr = 1, ra = 0, dt = 0.001_rk, tolerance = 1.0e-10_rk
        integer :: k = 12, min_level = 1, steps = 0
        logical :: nonlinear = .true., thermal_feedback = .true.
    ! @note-end boussinesq_solver-note-1
    end type flow_solver
    abstract interface
        subroutine external_force(g,t,fx,fz,ft)
            import rk, auxiliary_grid
            type(auxiliary_grid), intent(in) :: g
            real(rk), intent(in) :: t
            real(rk), intent(out) :: fx(g%nx,g%nz),fz(g%nx,g%nz),ft(g%nx,g%nz)
        end subroutine external_force
    end interface
contains
    ! @note-start boussinesq_solver-note-2
    subroutine configure_solver(s,nx,nz,k,dt,pr,ra,tolerance,min_level)
        type(flow_solver), intent(out) :: s
        integer, intent(in) :: nx,nz,k,min_level
        real(rk), intent(in) :: dt,pr,ra,tolerance
        if (.not. all(ieee_is_finite([dt,pr,ra,tolerance]))) error stop "nonfinite solver parameters"
        if (dt <= 0 .or. pr <= 0 .or. tolerance <= 0 .or. k < 4 .or. k > 16) error stop "invalid solver parameters"
        s%pr = pr
        s%ra = ra
        s%dt = dt
        s%tolerance = tolerance
        s%k = k
        s%min_level = min_level
        call make_grid(s%grid,nx,nz)
        call make_wall_operator(s%grid,pr,dt,s%wall)
    end subroutine configure_solver
    ! @note-end boussinesq_solver-note-2

    subroutine zero_state(s,state)
        type(flow_solver), intent(in) :: s
        type(flow_state), intent(out) :: state
        allocate(state%omega(s%grid%nx,s%grid%nz),state%theta(s%grid%nx,s%grid%nz),state%mean_u(s%grid%nz))
        state%omega = 0
        state%theta = 0
        state%mean_u = 0
        state%time = 0
    end subroutine zero_state

    subroutine set_velocity(s,state,u,w)
        type(flow_solver), intent(in) :: s
        type(flow_state), intent(inout) :: state
        real(rk), intent(in) :: u(:,:),w(:,:)
        state%mean_u = sum(u,dim=1)/s%grid%nx
        state%omega = dx(s%grid,w)-dz(s%grid,u)
        state%omega = state%omega-spread(sum(state%omega,dim=1)/s%grid%nx,1,s%grid%nx)
    end subroutine set_velocity

    subroutine get_velocity(s,state,u,w)
        type(flow_solver), intent(in) :: s
        type(flow_state), intent(in) :: state
        real(rk), intent(out) :: u(s%grid%nx,s%grid%nz),w(s%grid%nx,s%grid%nz)
        call velocity_from_vorticity(s%grid,state%omega,state%mean_u,u,w)
    end subroutine get_velocity

    ! @note-start boussinesq_solver-note-3
    subroutine physical_forcing(s,state,fx,fz,ft,external)
        type(flow_solver), intent(in) :: s
        type(flow_state), intent(in) :: state
        real(rk), intent(out) :: fx(:,:),fz(:,:),ft(:,:)
        procedure(external_force), optional :: external
        real(rk) :: u(s%grid%nx,s%grid%nz),w(s%grid%nx,s%grid%nz)
        real(rk) :: uf(s%grid%nxf,s%grid%nzf),wf(s%grid%nxf,s%grid%nzf)
        real(rk) :: ex(size(fx,1),size(fx,2)),ez(size(fx,1),size(fx,2)),et(size(fx,1),size(fx,2))
        associate(g => s%grid)
            call get_velocity(s,state,u,w)
            fx = 0
            fz = s%ra*s%pr*state%theta
            ft = 0
            if (s%thermal_feedback) ft = w
            if (s%nonlinear) then
                uf = fine_values(g,u)
                wf = fine_values(g,w)
                fx = -restrict_product(g,uf*fine_values(g,dx(g,u))+wf*fine_values(g,dz(g,u)))
                fz = fz-restrict_product(g,uf*fine_values(g,dx(g,w))+wf*fine_values(g,dz(g,w)))
                ft = ft-restrict_product(g,uf*fine_values(g,dx(g,state%theta))+wf*fine_values(g,dz(g,state%theta)))
            end if
            if (present(external)) then
                call external(g,state%time,ex,ez,et)
                fx = fx+ex
                fz = fz+ez
                ft = ft+et
            end if
        end associate
    end subroutine physical_forcing
    ! @note-end boussinesq_solver-note-3

    ! @note-start boussinesq_solver-note-4
    function flow_forcing(s,state,external) result(source)
        type(flow_solver), intent(in) :: s
        type(flow_state), intent(in) :: state
        procedure(external_force), optional :: external
        real(rk) :: source(s%grid%nx,s%grid%nz,3),fx(s%grid%nx,s%grid%nz),fz(s%grid%nx,s%grid%nz)
        call physical_forcing(s,state,fx,fz,source(:,:,3),external)
        source(:,:,1) = dx(s%grid,fz)-dz(s%grid,fx)
        source(:,:,1) = source(:,:,1)-spread(sum(source(:,:,1),dim=1)/s%grid%nx,1,s%grid%nx)
        source(:,:,2) = spread(sum(fx,dim=1)/s%grid%nx,1,s%grid%nx)
    end function flow_forcing
    ! @note-end boussinesq_solver-note-4

    ! @note-start boussinesq_solver-note-5
    function source_potential(s,state,external) result(r)
        type(flow_solver), intent(in) :: s
        type(flow_state), intent(in) :: state
        procedure(external_force), optional :: external
        complex(rk) :: r(s%grid%nx,s%grid%nz,3)
        real(rk) :: source(s%grid%nx,s%grid%nz,3)
        integer :: c
        source = flow_forcing(s,state,external)
        do c = 1, 3
            r(:,:,c) = poisson_dirichlet(s%grid,fourier(s%grid,source(:,:,c)))
            if (c < 3) r(:,:,c) = r(:,:,c)/s%pr
        end do
    end function source_potential
    ! @note-end boussinesq_solver-note-5

    subroutine advance_flow(s,state,next,external,corrections)
        type(flow_solver), intent(inout) :: s
        type(flow_state), intent(in) :: state
        type(flow_state), intent(out) :: next
        procedure(external_force), optional :: external
        integer, intent(in), optional :: corrections
        complex(rk) :: r0(s%grid%nx,s%grid%nz,3),r1(s%grid%nx,s%grid%nz,3),slope(s%grid%nx,s%grid%nz,3)
        complex(rk) :: om(s%grid%nx,s%grid%nz),boundary(s%grid%nx,2),rhs(s%grid%nx,s%grid%nz)
        real(rk) :: v(s%grid%nx,s%grid%nz),evolved(s%grid%nx,s%grid%nz),u(s%grid%nx,s%grid%nz),w(s%grid%nx,s%grid%nz),spacing,cfl
        integer :: iteration,ncorrect,j,c
        ! @note-start boussinesq_solver-note-6
        ncorrect = 2
        if (present(corrections)) ncorrect = corrections
        if (ncorrect < 1) error stop "at least one endpoint correction required"
        call get_velocity(s,state,u,w)
        cfl = 0
        do j = 2, s%grid%nz-1
            spacing = min(s%grid%z(j)-s%grid%z(j-1),s%grid%z(j+1)-s%grid%z(j))
            cfl = max(cfl,s%dt*maxval(s%grid%nx*abs(u(:,j))+abs(w(:,j))/spacing))
        end do
        if (s%nonlinear .and. cfl > 0.9_rk) error stop "advection CFL too large; reduce dt"
        if (s%dt*sqrt(abs(s%ra*s%pr)) > 0.5_rk) error stop "coupling timestep too large"
        ! @note-end boussinesq_solver-note-6
        call zero_state(s,next)
        associate(g => s%grid)
            ! @note-start boussinesq_solver-note-7
            om = fourier(g,state%omega)
            boundary(:,1) = om(:,1)
            boundary(:,2) = om(:,g%nz)
            r0 = source_potential(s,state,external)
            r1 = r0
            do iteration = 0, ncorrect
            ! @note-end boussinesq_solver-note-7
                ! @note-start boussinesq_solver-note-8
                ! Integrate the affine endpoint source exactly: q = (-D Lap_D)^(-1)(r1-r0)/h.
                do c = 1, 3
                    slope(:,:,c) = poisson_dirichlet(g,(r1(:,:,c)-r0(:,:,c))/s%dt)
                    if (c < 3) slope(:,:,c) = slope(:,:,c)/s%pr
                end do
                v = physical(g,om-apply_lift(g,g%lift,boundary)-r0(:,:,1)+slope(:,:,1))
                evolved = heat_on_grid(g,v,s%pr,s%dt,s%k,s%tolerance,s%min_level,s%stats)
                rhs = fourier(g,evolved)+r1(:,:,1)-slope(:,:,1)+apply_lift(g,s%wall%j,boundary/s%dt)
                next%omega = physical(g,impose_noslip(g,s%wall,rhs))
                v = spread(state%mean_u,1,g%nx)-physical(g,r0(:,:,2)-slope(:,:,2))
                evolved = heat_on_grid(g,v,s%pr,s%dt,s%k,s%tolerance,s%min_level,s%stats)+physical(g,r1(:,:,2)-slope(:,:,2))
                next%mean_u = sum(evolved,dim=1)/g%nx
                v = state%theta-physical(g,r0(:,:,3)-slope(:,:,3))
                next%theta = heat_on_grid(g,v,1.0_rk,s%dt,s%k,s%tolerance,s%min_level,s%stats)+physical(g,r1(:,:,3)-slope(:,:,3))
                ! @note-end boussinesq_solver-note-8
        ! @note-start boussinesq_solver-note-9
                next%time = state%time+s%dt
                if (iteration < ncorrect) r1 = source_potential(s,next,external)
            end do
        end associate
        if (.not. all(ieee_is_finite(next%omega)) .or. .not. all(ieee_is_finite(next%theta))) error stop "nonfinite flow state"
        s%steps = s%steps+1
        ! @note-end boussinesq_solver-note-9
    end subroutine advance_flow

    ! @note-start boussinesq_solver-note-10
    function diagnostics(s,state) result(d)
        type(flow_solver), intent(in) :: s
        type(flow_state), intent(in) :: state
        real(rk) :: d(14),u(s%grid%nx,s%grid%nz),w(s%grid%nx,s%grid%nz),tz(s%grid%nx,s%grid%nz),v(s%grid%nx,s%grid%nz)
        call get_velocity(s,state,u,w)
        associate(g => s%grid)
            tz = dz(g,state%theta)
            d(1) = state%time
            d(2) = (inner_product(g,u,u)+inner_product(g,w,w))/2
            d(3) = 1+inner_product(g,w,state%theta)
            d(4) = 1-sum(tz(:,1))/g%nx
            d(5) = 1-sum(tz(:,g%nz))/g%nx
            d(6) = integral(g,state%theta)
            d(7) = integral(g,state%theta*spread(1-g%z,1,g%nx))
            d(8) = integral(g,state%theta*spread(g%z,1,g%nx))
            d(9) = max(maxval(abs(u(:,[1,g%nz]))),maxval(abs(w(:,[1,g%nz]))))
            d(10) = maxval(abs(state%theta(:,[1,g%nz])))
            d(11) = maxval(abs(dx(g,u)+dz(g,w)))
            d(12) = inner_product(g,state%theta,state%theta)/2
            v = dx(g,u)
            d(13) = inner_product(g,v,v)
            v = dz(g,u)
            d(13) = d(13)+inner_product(g,v,v)
            v = dx(g,w)
            d(13) = d(13)+inner_product(g,v,v)
            v = dz(g,w)
            d(13) = s%pr*(d(13)+inner_product(g,v,v))
            v = dx(g,state%theta)
            d(14) = inner_product(g,v,v)+inner_product(g,tz,tz)
        end associate
    end function diagnostics
    ! @note-end boussinesq_solver-note-10

    function flow_pressure(s,state,external) result(p)
        type(flow_solver), intent(in) :: s
        type(flow_state), intent(in) :: state
        procedure(external_force), optional :: external
        real(rk) :: p(s%grid%nx,s%grid%nz),fx(s%grid%nx,s%grid%nz),fz(s%grid%nx,s%grid%nz),ft(s%grid%nx,s%grid%nz),u(s%grid%nx,s%grid%nz),w(s%grid%nx,s%grid%nz)
        call get_velocity(s,state,u,w)
        call physical_forcing(s,state,fx,fz,ft,external)
        p = recover_pressure(s%grid,u,w,fx,fz,s%pr)
    end function flow_pressure

    ! @note-start boussinesq_solver-note-11
    subroutine save_checkpoint(s,state,path)
        type(flow_solver), intent(in) :: s
        type(flow_state), intent(in) :: state
        character(*), intent(in) :: path
        integer :: unit
        open(newunit=unit,file=path,access="stream",form="unformatted",status="replace")
        write(unit) "RBFGT002",s%grid%nx,s%grid%nz,s%k,s%min_level,s%dt,s%pr,s%ra,s%tolerance,s%nonlinear,s%thermal_feedback
        write(unit) state%time,state%omega,state%mean_u,state%theta
        close(unit)
    end subroutine save_checkpoint
    ! @note-end boussinesq_solver-note-11

    ! @note-start boussinesq_solver-note-12
    subroutine load_checkpoint(s,state,path)
        type(flow_solver), intent(in) :: s
        type(flow_state), intent(out) :: state
        character(*), intent(in) :: path
        character(8) :: magic
        integer :: unit,nx,nz,k,level,ios
        real(rk) :: dt,pr,ra,tol
        logical :: nonlinear,thermal
        open(newunit=unit,file=path,access="stream",form="unformatted",status="old")
        read(unit,iostat=ios) magic,nx,nz,k,level,dt,pr,ra,tol,nonlinear,thermal
        if (ios /= 0 .or. magic /= "RBFGT002") error stop "invalid checkpoint header"
        if (nx /= s%grid%nx .or. nz /= s%grid%nz .or. k /= s%k .or. level /= s%min_level) error stop "checkpoint grid mismatch"
        if (abs(dt-s%dt)+abs(pr-s%pr)+abs(ra-s%ra)+abs(tol-s%tolerance) > 1.0e-15_rk) error stop "checkpoint parameter mismatch"
        if ((nonlinear .neqv. s%nonlinear) .or. (thermal .neqv. s%thermal_feedback)) error stop "checkpoint mode mismatch"
        call zero_state(s,state)
        read(unit,iostat=ios) state%time,state%omega,state%mean_u,state%theta
        close(unit)
        if (ios /= 0) error stop "truncated checkpoint"
        if (.not. all(ieee_is_finite(state%omega)) .or. .not. all(ieee_is_finite(state%theta)) .or. .not. all(ieee_is_finite(state%mean_u))) error stop "nonfinite checkpoint"
    end subroutine load_checkpoint
    ! @note-end boussinesq_solver-note-12
end module boussinesq_solver
```

### 3. 状态里保存什么

<!-- note-start: boussinesq_solver-note-1 boussinesq_solver-note-2 -->

`flow_state` 保存四项：非零水平模态涡量 `omega`、平均水平速度 `mean_u`、温度扰动 `theta` 和 `time`。速度由涡量和平均流恢复，源项由当前状态重新评价。

`flow_solver` 保存辅助网格、壁响应、$Pr$、$Ra$、步长、FGT 表示参数及统计量。`configure_solver` 初始化这些参数并预计算椭圆逆和壁响应；改变步长或黏性时应重新配置，不能只改一个成员而继续使用旧壁响应。

<!-- note-end: boussinesq_solver-note-1 boussinesq_solver-note-2 -->

### 4. 温度扰动与浮力符号

<!-- note-start: boussinesq_solver-note-3 boussinesq_solver-note-4 -->

令

$$
T=1-z+\theta.
$$

因为 $\boldsymbol u\cdot\nabla(1-z)=-w$，无量纲方程为

$$
\boldsymbol u_t+\boldsymbol u\cdot\nabla\boldsymbol u
=-\nabla p+Pr\Delta\boldsymbol u+RaPr\,\theta\boldsymbol e_z,
$$

$$
\theta_t+\boldsymbol u\cdot\nabla\theta=\Delta\theta+w.
$$

`physical_forcing` 构造

$$
F_x=-\boldsymbol u\cdot\nabla u+f_x,\qquad
F_z=-\boldsymbol u\cdot\nabla w+RaPr\,\theta+f_z,
$$

$$
f_\theta=w-\boldsymbol u\cdot\nabla\theta+f_{\rm ext}.
$$

`flow_forcing` 再取 $\partial_xF_z-\partial_zF_x$ 得到涡量源，并提取 $\overline{F_x}$。浮力涡量源因此是正号的 $RaPr\,\theta_x$。

`external` 是可选的连续外力过程。没有外力时省略这个参数；有外力时，它按照传入的网格和时刻填写三个物理源数组。

<!-- note-end: boussinesq_solver-note-3 boussinesq_solver-note-4 -->

### 5. 用源势处理非零壁源

<!-- note-start: boussinesq_solver-note-5 boussinesq_solver-note-8 -->

涡量源 $S$ 一般不在壁面为零。直接把 $S$ 当作零 Dirichlet 热场的端点增量，会给时间推进带来壁迹问题。先定义

$$
K=(-D\Delta_D)^{-1},\qquad r_n=KS_n,\qquad r_{n+1}=KS_{n+1}.
$$

把本步源按两个端点作线性插值，再定义

$$
q=\frac1hK(r_{n+1}-r_n).
$$

由 $v_t=D\Delta(v-r)$，并利用 $r_t=(r_{n+1}-r_n)/h$，可直接积分得到

$$
v_{n+1}=H_D(h)(v_n-r_n+q)+r_{n+1}-q.
$$

这里使用了 $\int_0^hH_D(s)\,ds=K(I-H_D(h))$。常数源和线性时变源都被精确积分；一般光滑源用端点线性插值，得到二阶时间格式。`source_potential` 先计算 $r$，校正循环中的 `slope` 再通过一次椭圆逆计算 $q$，无需增加体积热传播次数。

带未知壁涡量的更新为

$$
\omega_{n+1}
=H_\nu(h)(\omega_n-\ell g_n-r_n+q)
+r_{n+1}-q+\frac Jh g_n+B g_{n+1}.
$$

代码中的 `rhs` 就是右端除最后一项以外的部分。`impose_noslip` 求出 $g_{n+1}$，完成本次候选状态。壁迹也按本步两个端点线性插值，$J$ 精确积分其斜率。这是针对板间问题推导的二阶源势提升格式，不能直接称作论文原式。

<!-- note-end: boussinesq_solver-note-5 boussinesq_solver-note-8 -->

### 6. 预测、校正与提交

<!-- note-start: boussinesq_solver-note-6 boussinesq_solver-note-7 boussinesq_solver-note-9 -->

`advance_flow` 的顺序是：

1. 由提交状态计算旧源势 `r0`，用 `r1=r0` 预测；
2. 由两个端点源势形成 `slope` 和三个待传播体积场；
3. 对涡量、平均流和温度分别调用真实 FGT 热传播；
4. 解壁影响系统，得到候选新状态；
5. 在候选时刻和候选状态上重新评价 `r1`，再次校正。

默认一次预测、两次校正。预测令两端源相同，因此 `slope=0`；校正时才使用新的端点源。每次校正改变了待传播的体积场，所以会重新调用 FGT。下一时间步从实际返回的状态重算旧端点源，没有跨步 AB 历史。

对流和浮力耦合仍有步长限制。程序用局部网格尺度检查对流 CFL，并限制 $h\sqrt{|RaPr|}$；这些是原型的运行保护，不是适用于所有参数的严格稳定性定理。

<!-- note-end: boussinesq_solver-note-6 boussinesq_solver-note-7 boussinesq_solver-note-9 -->

### 7. 诊断量的物理含义

<!-- note-start: boussinesq_solver-note-10 -->

`diagnostics` 的 14 个返回量依次为：

| 索引 | 量 |
|---|---|
| 1–2 | 时刻、动能 $E=\langle u^2+w^2\rangle/2$ |
| 3–5 | $Nu_V$、$Nu_b$、$Nu_t$ |
| 6–8 | $\langle\theta\rangle$、$\langle(1-z)\theta\rangle$、$\langle z\theta\rangle$ |
| 9–11 | 壁速度、壁温扰动、散度最大值 |
| 12–14 | 温度扰动能、黏性耗散、温度梯度耗散 |

这里

$$
Nu_V=1+\langle w\theta\rangle,\quad
Nu_b=1-\langle\theta_z(x,0)\rangle_x,\quad
Nu_t=1-\langle\theta_z(x,1)\rangle_x.
$$

所有积分都在原物理域上进行。非稳态下三种 Nu 不必相等，应满足储热关系

$$
\frac d{dt}\langle\theta\rangle=Nu_b-Nu_t,\quad
\frac d{dt}\langle(1-z)\theta\rangle=Nu_b-Nu_V,\quad
\frac d{dt}\langle z\theta\rangle=Nu_V-Nu_t.
$$

<!-- note-end: boussinesq_solver-note-10 -->

### 8. 检查点

<!-- note-start: boussinesq_solver-note-11 boussinesq_solver-note-12 -->

`save_checkpoint` 保存文件标识、网格和物理参数、运行开关以及完整状态。`load_checkpoint` 先核对这些信息，再读取数组，拒绝不同参数的文件。

由于这是只保存当前时间层的一步法，端点源可由恢复的状态重新计算，不需要保存额外的旧时间层。当前二进制检查点用于同一工具链环境，不承诺跨编译器的字节格式兼容。

<!-- note-end: boussinesq_solver-note-11 boussinesq_solver-note-12 -->

## Chapter 19：单位周期盒的独立线性参考

### 1. 目标

根据当前几何计算临界 Rayleigh 数和近临界增长率。单位宽周期盒只允许 $a_m=2\pi m$，不能直接采用连续最优波数对应的经典阈值。

### 2. 完整代码

```fortran
module rb_linear_reference
    use cheb_box, only: rk
    use numerical_tools, only: pi
    implicit none
    private
    public :: neutral_rayleigh, reference_growth, reference_mode
contains
    ! @note-start rb_linear_reference-note-1
    subroutine characteristic_roots(ra,a,sigma,qr,qc)
        real(rk), intent(in) :: ra,a,sigma
        complex(rk), intent(out) :: qr,qc
        real(rk) :: p,q,discriminant,u,v
        ! Pr=1: q^3 - 2*sigma*q^2 + sigma^2*q + Ra*a^2 = 0.
        p = -sigma*sigma/3
        q = 2*sigma**3/27+ra*a*a
        discriminant = (q/2)**2+(p/3)**3
        if (discriminant <= 0) error stop "reference outside one-real-root branch"
        v = sign(abs(-q/2-sqrt(discriminant))**(1.0_rk/3),-q/2-sqrt(discriminant))
        u = -p/(3*v)
        qr = cmplx(u+v+2*sigma/3,0.0_rk,rk)
        qc = cmplx(-(u+v)/2+2*sigma/3,sqrt(3.0_rk)*(u-v)/2,rk)
    end subroutine characteristic_roots
    ! @note-end rb_linear_reference-note-1

    ! @note-start rb_linear_reference-note-2
    function basis(ra,a,sigma,z,derivative,thermal,odd) result(v)
        real(rk), intent(in) :: ra,a,sigma,z
        integer, intent(in) :: derivative
        logical, intent(in) :: thermal
        logical, intent(in), optional :: odd
        real(rk) :: v(3)
        complex(rk) :: qr,qc,sr,sc,vr,vc
        logical :: even_derivative
        call characteristic_roots(ra,a,sigma,qr,qc)
        sr = sqrt(a*a+qr)
        sc = sqrt(a*a+qc)
        even_derivative = mod(derivative,2) == 0
        if (present(odd)) then
            if (odd) even_derivative = .not. even_derivative
        end if
        if (even_derivative) then
            vr = sr**derivative*cosh(sr*(z-0.5_rk))
            vc = sc**derivative*cosh(sc*(z-0.5_rk))
        else
            vr = sr**derivative*sinh(sr*(z-0.5_rk))
            vc = sc**derivative*sinh(sc*(z-0.5_rk))
        end if
        if (present(odd)) then
            if (odd) then
                if (abs(sr) > 1.0e-12_rk) then
                    vr = vr/sr
                else
                    vr = 0
                    if (derivative == 0) vr = z-0.5_rk
                    if (derivative == 1) vr = 1
                end if
            end if
        end if
        if (thermal) then
            vr = vr/(sigma-qr)
            vc = vc/(sigma-qc)
        end if
        v = [real(vc,rk),aimag(vc),real(vr,rk)]
    end function basis
    ! @note-end rb_linear_reference-note-2

    function cross(a,b) result(c)
        real(rk), intent(in) :: a(3),b(3)
        real(rk) :: c(3)
        c = [a(2)*b(3)-a(3)*b(2),a(3)*b(1)-a(1)*b(3),a(1)*b(2)-a(2)*b(1)]
    end function cross

    ! @note-start rb_linear_reference-note-3
    real(rk) function determinant(ra,a,sigma,odd) result(value)
        real(rk), intent(in) :: ra,a,sigma
        logical, intent(in), optional :: odd
        real(rk) :: r1(3),r2(3),r3(3)
        r1 = basis(ra,a,sigma,1.0_rk,0,.false.,odd)
        r2 = basis(ra,a,sigma,1.0_rk,1,.false.,odd)
        r3 = basis(ra,a,sigma,1.0_rk,0,.true.,odd)
        r1 = r1/sqrt(sum(r1*r1))
        r2 = r2/sqrt(sum(r2*r2))
        r3 = r3/sqrt(sum(r3*r3))
        value = dot_product(cross(r1,r2),r3)
    end function determinant
    ! @note-end rb_linear_reference-note-3

    ! @note-start rb_linear_reference-note-4
    real(rk) function neutral_rayleigh(mode,odd) result(ra)
        integer, intent(in) :: mode
        logical, intent(in), optional :: odd
        real(rk) :: a,lo,hi,mid,flo,fhi,fmid
        integer :: i
        if (mode < 1 .or. mode > 8) error stop "reference mode outside scan range"
        a = 2*pi*mode
        lo = 100
        flo = determinant(lo,a,0.0_rk,odd)
        do i = 1, 200
            hi = lo*1.1_rk
            fhi = determinant(hi,a,0.0_rk,odd)
            if (flo*fhi < 0) exit
            lo = hi
            flo = fhi
        end do
        if (i > 200) error stop "neutral branch not bracketed"
        do i = 1, 100
            mid = (lo+hi)/2
            fmid = determinant(mid,a,0.0_rk,odd)
            if (flo*fmid <= 0) then
                hi = mid
            else
                lo = mid
                flo = fmid
            end if
            if (hi-lo < 1.0e-9_rk) exit
        end do
        ra = (lo+hi)/2
    end function neutral_rayleigh
    ! @note-end rb_linear_reference-note-4

    ! @note-start rb_linear_reference-note-5
    real(rk) function reference_growth(ra,mode) result(sigma)
        real(rk), intent(in) :: ra
        integer, intent(in) :: mode
        real(rk) :: a,lo,hi,mid,flo,fhi,fmid
        integer :: i
        a = 2*pi*mode
        lo = -10
        hi = 10
        flo = determinant(ra,a,lo)
        fhi = determinant(ra,a,hi)
        if (flo*fhi >= 0) error stop "growth rate not bracketed on near-onset branch"
        do i = 1, 100
            mid = (lo+hi)/2
            fmid = determinant(ra,a,mid)
            if (flo*fmid <= 0) then
                hi = mid
            else
                lo = mid
                flo = fmid
            end if
            if (hi-lo < 1.0e-12_rk) exit
        end do
        sigma = (lo+hi)/2
    end function reference_growth
    ! @note-end rb_linear_reference-note-5

    ! @note-start rb_linear_reference-note-6
    subroutine reference_mode(ra,mode,sigma,z,w,dw,theta)
        real(rk), intent(in) :: ra,sigma,z(:)
        integer, intent(in) :: mode
        real(rk), intent(out) :: w(size(z)),dw(size(z)),theta(size(z))
        real(rk) :: a,c(3),normalization
        integer :: i
        a = 2*pi*mode
        c = cross(basis(ra,a,sigma,1.0_rk,0,.false.),basis(ra,a,sigma,1.0_rk,1,.false.))
        normalization = dot_product(c,basis(ra,a,sigma,0.5_rk,0,.false.))
        if (abs(normalization) < tiny(1.0_rk)) error stop "singular eigenfunction normalization"
        c = c/normalization
        do i = 1, size(z)
            w(i) = dot_product(c,basis(ra,a,sigma,z(i),0,.false.))
            dw(i) = dot_product(c,basis(ra,a,sigma,z(i),1,.false.))
            theta(i) = dot_product(c,basis(ra,a,sigma,z(i),0,.true.))
        end do
    end subroutine reference_mode
    ! @note-end rb_linear_reference-note-6
end module rb_linear_reference
```

### 3. 连续常系数方程

<!-- note-start: rb_linear_reference-note-1 -->

对竖向速度和温度的模态 $e^{\sigma t+iax}$，令 $L=\partial_{zz}-a^2$。线性化后

$$
\sigma LW=PrL^2W-RaPr\,a^2\Theta,\qquad
\sigma\Theta=L\Theta+W.
$$

边界条件为 $W=W'=\Theta=0$。本模块限定 $Pr=1$，设某个特征分量满足 $LW=qW$，消去 $\Theta$ 得

$$
q^3-2\sigma q^2+\sigma^2q+Ra\,a^2=0,\qquad
\Theta=\frac{W}{\sigma-q}.
$$

`characteristic_roots` 计算近起流分支上的一个实根和一对共轭根。其竖向指数为 $s=\sqrt{a^2+q}$。

<!-- note-end: rb_linear_reference-note-1 -->

### 4. 由边界行列式确定参数

<!-- note-start: rb_linear_reference-note-2 rb_linear_reference-note-3 rb_linear_reference-note-4 rb_linear_reference-note-5 rb_linear_reference-note-6 -->

对于关于中面偶对称的 $W$，使用 $\cosh(s(z-1/2))$；奇对称分支使用 $\sinh$。共轭根对应的实部、虚部和实根分量组成三个实基函数。

在 $z=1$ 施加 $W=W'=\Theta=0$，得到一个 $3\times3$ 系统。中面对称性同时保证下壁条件。非平凡解要求其行列式为零。

`neutral_rayleigh` 固定 $\sigma=0$，先寻找异号区间，再二分求 $Ra$。可选 `odd=.true.` 用于反对称分支。`reference_growth` 固定 $Ra$，在近起流区间求 $\sigma$。

`reference_mode` 用前两行的叉积形成系数向量，并以中面速度归一化，输出 $W$、$W'$ 和 $\Theta$。该函数用于构造小扰动初场；后续演化不会重新注入这个参考解。

此参考使用连续特征函数，不调用 FGT 或生产网格矩阵。它限定了 $Pr=1$、所搜索的实增长率分支和模态范围，不是任意参数下的通用特征值求解器。

<!-- note-end: rb_linear_reference-note-2 rb_linear_reference-note-3 rb_linear_reference-note-4 rb_linear_reference-note-5 rb_linear_reference-note-6 -->

## Chapter 20：完整 RB 运行入口

### 1. 目标

把求解器组织成一个可运行程序：配置参数、生成初场、推进、输出场和诊断、保存检查点。

### 2. 完整代码

```fortran
program run_rb
    use cheb_box, only: rk
    use numerical_tools, only: pi
    use boussinesq_solver
    use rb_linear_reference
    implicit none
    type(flow_solver) :: solver
    type(flow_state) :: state,next
    real(rk), allocatable :: u(:,:),w(:,:),vertical(:),derivative(:),thermal(:)
    real(rk) :: dt,final_time,ra,critical,sigma,amplitude,d(14),old(14),flux_integral(5),begin(14),fit_t,fit_y,fit_tt,fit_ty,fit_n,growth,y
    integer :: nx,nz,k,steps,n,j,unit,field_unit
    character(256) :: argument,prefix,mode
    mode = "super"
    dt = 0.002_rk
    final_time = 2
    nx = 24
    nz = 33
    k = 12
    ra = 0
    prefix = "rb"
    if (command_argument_count() >= 1) call get_command_argument(1,mode)
    if (command_argument_count() >= 2) then
        call get_command_argument(2,argument)
        read(argument,*) dt
    end if
    if (command_argument_count() >= 3) then
        call get_command_argument(3,argument)
        read(argument,*) final_time
    end if
    if (command_argument_count() >= 4) then
        call get_command_argument(4,argument)
        read(argument,*) nx
    end if
    if (command_argument_count() >= 5) then
        call get_command_argument(5,argument)
        read(argument,*) nz
    end if
    if (command_argument_count() >= 6) then
        call get_command_argument(6,argument)
        read(argument,*) ra
    end if
    if (command_argument_count() >= 7) call get_command_argument(7,prefix)
    critical = neutral_rayleigh(1)
    if (ra <= 0) ra = 1.2_rk*critical
    sigma = reference_growth(ra,1)
    steps = nint(final_time/dt)
    if (steps < 1 .or. abs(steps*dt-final_time) > 1.0e-10_rk) error stop "final time must be an integer number of steps"
    ! @note-start run_rb-note-1
    call configure_solver(solver,nx,nz,k,dt,1.0_rk,ra,2.0e-10_rk,1)
    solver%nonlinear = trim(mode) /= "linear"
    call zero_state(solver,state)
    ! @note-end run_rb-note-1
    allocate(u(nx,nz),w(nx,nz),vertical(nz),derivative(nz),thermal(nz))
    ! @note-start run_rb-note-2
    call reference_mode(ra,1,sigma,solver%grid%z,vertical,derivative,thermal)
    amplitude = 0.01_rk
    if (trim(mode) == "linear" .or. trim(mode) == "onset") amplitude = 1.0e-5_rk
    if (trim(mode) == "conduction") amplitude = 0
    do j = 1, nz
        u(:,j) = -amplitude*derivative(j)*sin(2*pi*solver%grid%x)/(2*pi)
        w(:,j) = amplitude*vertical(j)*cos(2*pi*solver%grid%x)
        state%theta(:,j) = amplitude*thermal(j)*cos(2*pi*solver%grid%x)
    end do
    call set_velocity(solver,state,u,w)
    ! @note-end run_rb-note-2
    open(newunit=unit,file=trim(prefix)//"_history.csv",status="replace")
    write(unit,'(a)') "t,E,NuV,Nub,Nut,Q,Qb,Qt,wall,temp_wall,divergence,theta_energy,viscous_dissipation,thermal_dissipation"
    d = diagnostics(solver,state)
    write(unit,'(*(es24.16,:,","))') d
    old = d
    begin = d
    flux_integral = 0
    fit_t=0; fit_y=0; fit_tt=0; fit_ty=0; fit_n=0
    call prini(6,0)
    do n = 1, steps
        ! @note-start run_rb-note-3
        call advance_flow(solver,state,next)
        state = next
        d = diagnostics(solver,state)
        ! @note-end run_rb-note-3
        write(unit,'(*(es24.16,:,","))') d
        flush(unit)
        ! @note-start run_rb-note-4
        flux_integral(1:3) = flux_integral(1:3)+dt*([old(4)-old(5),old(4)-old(3),old(3)-old(5)]+[d(4)-d(5),d(4)-d(3),d(3)-d(5)])/2
        flux_integral(4) = flux_integral(4)+dt*(ra*(old(3)+d(3)-2)-old(13)-d(13))/2
        flux_integral(5) = flux_integral(5)+dt*(old(3)+d(3)-2-old(14)-d(14))/2
        ! @note-end run_rb-note-4
        old = d
        if (d(1) >= final_time/4 .and. d(2) > tiny(1.0_rk)) then
            ! @note-start run_rb-note-5
            y = log(sqrt(d(2)))
            fit_n = fit_n+1
            fit_t = fit_t+d(1)
            fit_tt = fit_tt+d(1)**2
            fit_y = fit_y+y
            fit_ty = fit_ty+d(1)*y
            ! @note-end run_rb-note-5
        end if
        if (maxval(d(9:11)) > 1.0e-7_rk) error stop "RB wall/divergence budget exceeded"
    end do
    close(unit)
    growth = 0
    if (fit_n > 1) growth = (fit_ty-fit_t*fit_y/fit_n)/(fit_tt-fit_t**2/fit_n)
    open(newunit=unit,file=trim(prefix)//"_summary.txt",status="replace")
    write(unit,'(a,es24.16)') "critical Ra (symmetric m=1 ODE): ",critical
    write(unit,'(a,es24.16)') "Ra: ",ra
    write(unit,'(a,es24.16)') "reference growth: ",sigma
    write(unit,'(a,es24.16)') "measured amplitude growth: ",growth
    write(unit,'(a,14es24.16)') "final diagnostics: ",d
    write(unit,'(a,3es24.16)') "heat window balance: ",d(6:8)-begin(6:8)-flux_integral(1:3)
    write(unit,'(a,2es24.16)') "energy window balance: ",d(2)-begin(2)-flux_integral(4),d(12)-begin(12)-flux_integral(5)
    write(unit,'(a,5i12)') "FGT calls/min leaves/max leaves/max level/refinements: ",solver%stats%calls,solver%stats%min_leaves,solver%stats%max_leaves,solver%stats%max_level,solver%stats%refinements
    write(unit,'(a,2es24.16)') "source/output monitor maxima: ",solver%stats%source_monitor,solver%stats%output_monitor
    close(unit)
    ! @note-start run_rb-note-6
    call save_checkpoint(solver,state,trim(prefix)//"_checkpoint.bin")
    call get_velocity(solver,state,u,w)
    open(newunit=field_unit,file=trim(prefix)//"_field.csv",status="replace")
    write(field_unit,'(a)') "x,z,u,w,theta,T"
    do j = 1, nz
        do n = 1, nx
            write(field_unit,'(*(es24.16,:,","))') solver%grid%x(n),solver%grid%z(j),u(n,j),w(n,j),state%theta(n,j),1-solver%grid%z(j)+state%theta(n,j)
        end do
    end do
    close(field_unit)
    print *, "RB run finished: ",trim(prefix)
    ! @note-end run_rb-note-6
    print *, "E, NuV, wall, divergence:",d(2),d(3),d(9),d(11)
    print *, "amplitude growth / reference:",growth,sigma
end program run_rb
```

### 3. 主程序怎样调用这些模块

<!-- note-start: run_rb-note-1 run_rb-note-3 -->

`use boussinesq_solver` 让编译器读取模块的接口，具体过程仍由链接阶段提供。`build_learning.ps1` 按依赖顺序把本目录的模块和主程序一起交给 gfortran，再链接项目中既有的 FGT 静态库和 FINUFFT 动态库。

编译使用 `-ffree-line-length-none`，允许一条 Fortran 语句写在同一物理行。新增源文件不需要续行符。

主程序的关键调用为

~~~text
configure_solver → zero_state → reference_mode → set_velocity
循环：advance_flow → state=next → diagnostics → 写文件
结束：save_checkpoint → get_velocity → 输出完整场
~~~

`run_rb` 的命令行参数依次为：运行模式、步长、终时、水平点数、竖向点数、Rayleigh 数、输出文件前缀。模式 `super` 执行非线性演化，`onset` 使用小幅初场但保留非线性，`linear` 关闭非线性，`conduction` 使用零扰动。Rayleigh 数传非正值时，程序采用独立参考阈值的 1.2 倍。

<!-- note-end: run_rb-note-1 run_rb-note-3 -->

### 4. 初场和增长率

<!-- note-start: run_rb-note-2 -->

对于水平余弦竖向速度，

$$
w=A W(z)\cos(ax),\qquad
u=-\frac A aW'(z)\sin(ax),\qquad
\theta=A\Theta(z)\cos(ax).
$$

两分量满足连续不可压条件。`set_velocity` 将它们转换成生产状态。

<!-- note-end: run_rb-note-2 -->

<!-- note-start: run_rb-note-5 -->

增长率通过拟合 $\log\sqrt E$ 关于时间的斜率得到。若拟合 $\log E$，得到的是振幅增长率的两倍。程序默认取运行后四分之三的窗口；非线性饱和阶段的这条斜率只描述该窗口，不再等于线性特征值。

<!-- note-end: run_rb-note-5 -->

### 5. 输出与有限时间平衡

<!-- note-start: run_rb-note-4 run_rb-note-6 -->

`history.csv` 保存每步的 14 个诊断量；`field.csv` 保存 $x,z,u,w,\theta,T$；`summary.txt` 保存参数、增长率、积分平衡和 FGT 树统计；二进制文件保存可恢复状态。

三条热矩方程用窗口两端储热差与通量的梯形时间积分比较。能量关系为

$$
\frac{dE}{dt}=-Pr\langle|\nabla\boldsymbol u|^2\rangle+RaPr\langle w\theta\rangle,
$$

$$
\frac d{dt}\frac{\langle\theta^2\rangle}{2}
=-\langle|\nabla\theta|^2\rangle+\langle w\theta\rangle.
$$

窗口平衡误差同时包含数值演化误差和输出序列的时间求积误差。程序记录二者的合成结果，不能只因终态三种 Nu 接近就忽略整个瞬态。

<!-- note-end: run_rb-note-4 run_rb-note-6 -->

## Chapter 21：密输出上的连续方程残差

### 1. 目标

从三个相邻数值状态构造独立时间差分，把速度、温度和压力评价到更密的空间网格，再按连续 PDE 计算残差。

### 2. 完整代码

```fortran
module flow_residuals
    use cheb_box, only: rk
    use slab_grid
    use boussinesq_solver
    implicit none
    private
    public :: dense_residual
contains
    subroutine dense_residual(s,before,center,after,residual,external)
        type(flow_solver), intent(in) :: s
        type(flow_state), intent(in) :: before,center,after
        real(rk), intent(out) :: residual(5)
        procedure(external_force), optional :: external
        type(auxiliary_grid) :: dense
        real(rk) :: u(s%grid%nx,s%grid%nz),w(s%grid%nx,s%grid%nz),ub(s%grid%nx,s%grid%nz),wb(s%grid%nx,s%grid%nz),ua(s%grid%nx,s%grid%nz),wa(s%grid%nx,s%grid%nz),p(s%grid%nx,s%grid%nz),lag
        real(rk), allocatable :: ud(:,:),wd(:,:),td(:,:),pd(:,:),ut(:,:),wt(:,:),tt(:,:),rx(:,:),rz(:,:),rt(:,:),fx(:,:),fz(:,:),ft(:,:)
        ! @note-start flow_residuals-note-1
        call make_grid(dense,2*s%grid%nx,2*s%grid%nz-1)
        allocate(ud(dense%nx,dense%nz),wd(dense%nx,dense%nz),td(dense%nx,dense%nz),pd(dense%nx,dense%nz),ut(dense%nx,dense%nz),wt(dense%nx,dense%nz),tt(dense%nx,dense%nz))
        allocate(rx(dense%nx,dense%nz),rz(dense%nx,dense%nz),rt(dense%nx,dense%nz),fx(dense%nx,dense%nz),fz(dense%nx,dense%nz),ft(dense%nx,dense%nz))
        if (abs((center%time-before%time)-(after%time-center%time)) > 1.0e-12_rk) error stop "residual requires symmetric time samples"
        lag = after%time-before%time
        if (lag <= 0) error stop "invalid residual time samples"
        call get_velocity(s,center,u,w)
        call get_velocity(s,before,ub,wb)
        call get_velocity(s,after,ua,wa)
        p = flow_pressure(s,center,external)
        ud = evaluate_grid(s%grid,grid_coefficients(s%grid,u),dense%x,dense%z)
        wd = evaluate_grid(s%grid,grid_coefficients(s%grid,w),dense%x,dense%z)
        td = evaluate_grid(s%grid,grid_coefficients(s%grid,center%theta),dense%x,dense%z)
        pd = evaluate_grid(s%grid,grid_coefficients(s%grid,p),dense%x,dense%z)
        ut = evaluate_grid(s%grid,grid_coefficients(s%grid,(ua-ub)/lag),dense%x,dense%z)
        wt = evaluate_grid(s%grid,grid_coefficients(s%grid,(wa-wb)/lag),dense%x,dense%z)
        tt = evaluate_grid(s%grid,grid_coefficients(s%grid,(after%theta-before%theta)/lag),dense%x,dense%z)
        ! @note-end flow_residuals-note-1
        fx = 0
        fz = s%ra*s%pr*td
        ft = 0
        if (s%thermal_feedback) ft = wd
        if (present(external)) then
            call external(dense,center%time,rx,rz,rt)
            fx = fx+rx
            fz = fz+rz
            ft = ft+rt
        end if
        ! @note-start flow_residuals-note-2
        rx = ut-s%pr*laplacian(dense,ud)+dx(dense,pd)-fx
        rz = wt-s%pr*laplacian(dense,wd)+dz(dense,pd)-fz
        rt = tt-laplacian(dense,td)-ft
        if (s%nonlinear) then
            rx = rx+ud*dx(dense,ud)+wd*dz(dense,ud)
            rz = rz+ud*dx(dense,wd)+wd*dz(dense,wd)
            rt = rt+ud*dx(dense,td)+wd*dz(dense,td)
        end if
        residual(1) = max(maxval(abs(rx)),maxval(abs(rz)))
        residual(2) = maxval(abs(rt))
        residual(3) = maxval(abs(dx(dense,ud)+dz(dense,wd)))
        residual(4) = max(maxval(abs(ud(:,[1,dense%nz]))),maxval(abs(wd(:,[1,dense%nz]))))
        residual(5) = maxval(abs(td(:,[1,dense%nz])))
        ! @note-end flow_residuals-note-2
    end subroutine dense_residual
end module flow_residuals
```

### 3. 时间导数与空间导数的来源

<!-- note-start: flow_residuals-note-1 -->

输入 `before`、`center`、`after` 必须等时间间隔。中心时间导数采用

$$
u_t(t_n)\approx\frac{u_{n+1}-u_{n-1}}{2h}.
$$

它直接来自三个不同时间状态，不把生产 RHS 当成时间导数。

空间输出采用两倍水平点数和 $2N_z-1$ 个竖向点。先从原表示评价到这些点，再求导；非线性乘积也直接在密输出网格形成。压力由中心状态按 Poisson–Neumann 条件恢复。

<!-- note-end: flow_residuals-note-1 -->

### 4. 返回量与适用范围

<!-- note-start: flow_residuals-note-2 -->

`residual` 依次返回动量、温度、散度、壁速度和壁温扰动的最大绝对值。动量残差按照

$$
R_u=\boldsymbol u_t+\boldsymbol u\cdot\nabla\boldsymbol u
+\nabla p-Pr\Delta\boldsymbol u-\boldsymbol F_{\rm buoyancy}-\boldsymbol f_{\rm ext}
$$

组装，温度残差同理。

这与时间步内部的系数方程不同，但仍使用同一数值状态和压力重建，不能称为完全独立解。中心差分带来二阶时间误差，原辅助表示也限制空间精度；因此应同时检查步长和辅助网格加密。

<!-- note-end: flow_residuals-note-2 -->
