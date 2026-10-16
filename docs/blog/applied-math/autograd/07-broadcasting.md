---
title: Autograd 源码学习（七）：Broadcasting 的反向传播
description: "Autograd 源码学习（七）：把 broadcasting 看作线性映射，理解 unbroadcast 如何保证梯度回到输入的 shape。"
date: 2026-09-05
hide:
  - navigation
categories:
  - 应用数学
  - Autograd 源码学习
tags:
  - python
---

# Autograd 源码学习（七）：Broadcasting 的反向传播

上一篇的 binary VJP 总会出现 `unbroadcast_f`。即使局部导数的每个数字都算对了，若返回的 shape 不属于原输入空间，整个规则仍然是错的。

我们用 scalar bias 加到向量，以及长度 3 的 bias 加到两行矩阵这两个已有实验，沿着与 forward broadcasting 相反的方向，把每一步 reduction 写清楚。


源码基线：HIPS/autograd 1.9.1，commit `f53a21734fdfae636f448744d9097d8d35a643a0`。

## 本文目标

1. forward broadcasting 为什么要求 backward reduction？
2. scalar bias 与 vector bias 的 cotangent shape 应分别是什么？
3. `unbroadcast` 在当前源码中如何恢复 shape？

## Mental Model

broadcasting 看似复制了一个输入值到多个输出位置。反向时，每个使用位置都会产生 contribution，所以必须沿新增或 size-1 的轴求和，回到原输入的 vector space。

## 必要的数学

下面的公式概括本篇使用的数学关系，具体数值与传播步骤接着展开。

$$
B(b)=\begin{bmatrix}b\\b\end{bmatrix},\qquad (3,)\longrightarrow(2,3).
$$

反向沿两行相同的列位置求和：

$$
B^T\begin{bmatrix}g_{0,:}\\g_{1,:}\end{bmatrix}=g_{0,:}+g_{1,:}.
$$

```text
x.shape=(3,), b.shape=()
y=x+b, L=sum(y)
dL/db = 1+1+1 = 3, shape=()
```

```text
A.shape=(2,3), b.shape=(3,)
L=sum(A+b)
dL/db=[2,2,2], shape=(3,)
```

gradient 的 shape 属于导数契约；返回 broadcast 后的 `(2,3)` 或 `(3,)` 给 scalar `b` 都是错误的。

## 一个最小例子

forward/backward shape 流：

```text
scalar b -> broadcast -> vector y
scalar cotangent <- sum <- vector cotangent

vector b(3,) -> broadcast axis 0 -> matrix y(2,3)
vector cotangent(3,) <- sum axis 0 <- matrix cotangent(2,3)
```

## 对应的 Autograd 源码

| File / symbol | 谁调用 | 它调用谁 | 输入 -> 输出 | AD 角色 |
| --- | --- | --- | --- | --- |
| `numpy_vjps.py :: unbroadcast_f`（896 行） | add/multiply/subtract/divide rule makers | `metadata`, `unbroadcast` | target + raw VJP -> shape-aware VJP | 捕获目标 shape |
| `numpy_vjps.py :: unbroadcast`（884 行） | returned VJP closure | `anp.sum`, `anp.real` | broadcast cotangent + metadata -> input-shaped cotangent | reduction |
| `numpy_wrapper.py :: metadata` | VJP/JVP rules | `shape,ndim,result_type,iscomplexobj` | value -> metadata tuple | shape/dtype 描述 |
| `numpy_jvps.py :: broadcast`（292 行） | forward JVP rules | expand/repeat | input tangent -> output-shaped tangent | 相反方向的 shape 扩展 |

## 调用时序

```text
forward add(x,b)
  -> NumPy broadcasts b
  -> add VJP maker calls unbroadcast_f(b, lambda g:g)
  -> closure captures metadata(b)
backward g
  -> unbroadcast(g,target_meta)
  -> remove extra leading dimensions with sum
  -> sum axes where target size is 1
  -> restore real dtype if needed
```

## 源码 walkthrough

### broadcasting 本身是一个线性映射

scalar b 被三个输出位置使用，可写成 `B(b)=[b,b,b]`。B 的 Jacobian 是三行一列的全 1 矩阵；给输出方向 `[g0,g1,g2]` 做 VJP，得到 `g0+g1+g2`。这个结论来自链式法则，不取决于 forward 是否真的分配了三份 b 内存。

向量 b=(b0,b1,b2) 被两行共享，可写成 `B(b)=[b;b]`，其 Jacobian 是上下叠放的两个单位矩阵。VJP 对两行相同列位置求和，结果有三个分量。我们只用矩阵解释 reduction 的来源；真实规则没有构造这个矩阵。

### forward 捕获目标空间，backward 才应用 reduction

[REAL SOURCE]  
File: [`autograd/numpy/numpy_vjps.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_vjps.py)  
Symbol: [`unbroadcast_f`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_vjps.py#L896-L898)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
def unbroadcast_f(target, f):
    target_meta = anp.metadata(target)
    return lambda g: unbroadcast(f(g), target_meta)
```

maker 调用此函数时，`target` 是正在求导的那个 primitive 输入，`f` 是暂不管 shape 的局部 VJP。例如 add 对 b 的 rule 传 `target=b`、`f=lambda g:g`；multiply 则传 `f=lambda g:另一个输入*g`。`target_meta` 在 forward 已确定，返回 closure 等到 backward 收到 g 后先计算局部贡献，再把它归约到目标空间。下一步是 `unbroadcast`，不是通用 backward loop。

[REAL SOURCE]  
File: [`autograd/numpy/numpy_wrapper.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_wrapper.py)  
Symbol: [`metadata`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_wrapper.py#L189-L190)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
def metadata(A):
    return _np.shape(A), _np.ndim(A), _np.result_type(A), _np.iscomplexobj(A)
```

输入是目标 b，产物是 `(shape,ndim,dtype,iscomplex)`。scalar b 对应 `((),0,float64,False)`；长度3向量对应 `((3,),1,float64,False)`。这里的 dtype 用显示名称简记真实 dtype 对象。shape/ndim 告诉下一步需要收回哪些轴；metadata 不保存任何本次梯度。

[REAL SOURCE]  
File: [`autograd/numpy/numpy_vjps.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_vjps.py)  
Symbol: [`unbroadcast`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_vjps.py#L884-L893)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
def unbroadcast(x, target_meta, broadcast_idx=0):
    target_shape, target_ndim, _dtype, target_iscomplex = target_meta
    while anp.ndim(x) > target_ndim:
        x = anp.sum(x, axis=broadcast_idx)
    for axis, size in enumerate(target_shape):
        if size == 1:
            x = anp.sum(x, axis=axis, keepdims=True)
    if anp.iscomplexobj(x) and not target_iscomplex:
        x = anp.real(x)
    return x
```

这里的局部变量 `x` 是待还原形状的 cotangent，不是原函数中恰好也叫 x 的输入向量。第一阶段 `while` 删除额外维度，默认每次沿最前面的 axis 0 求和；第二阶段针对目标已有的 size-1 轴求和，并用 `keepdims=True` 保留它属于输入 shape 的事实。本文都是真实数值，末尾 complex 判断不触发；原文仍完整保留。

它返回输入形状的 contribution，之后 `backward_pass` 才把这个贡献与同一 parent 的其他路径相加。因此 reverse engine 保持通用，NumPy integration 负责数组规则。

### STATE SNAPSHOT：scalar -> vector 的每个步骤

沿用已有实验：`x=[1,2,3]`，`b=2.0`，`y=x+b=[3,4,5]`。只对 b 求导，所以 add 的 traced parent 只有 b 的 root，`parent_argnums=(1,)`；普通向量 x 仍参与数值计算，但不是本次求导的 parent。

```text
forward:  b, shape=() ------ broadcast/add ------> y, shape=(3,)
          2                                      [3,4,5]
backward: bar(b), shape=() <------ sum axis 0 ---- bar(y), shape=(3,)
          3                                      [1,1,1]
```

| 执行点 | 当前局部对象 | value | shape / ndim | 下一步 |
| --- | --- | --- | --- | --- |
| forward maker | target=b | 2 | () / 0 | 捕获 target_meta |
| VJP 查询 | g | [1,1,1] | (3,) / 1 | add 的 f(g)=g |
| unbroadcast 进入 | x=f(g) | [1,1,1] | (3,) / 1 | 1 > target_ndim=0 |
| while 第1次 | sum(x,axis=0) | 3 | () / 0 | 维度已相等 |
| for target_shape | 空 shape tuple | 3 | () / 0 | 没有目标轴可遍历 |
| 返回 contribution | 输入 b 的 cotangent | 3 | () / 0 | 通用引擎接收 scalar |

实验提供两条验证路线：直接 `make_vjp(lambda b:x+b)` 给 vector output 注入全 1；以及 `grad(lambda b:sum(x+b))` 由 sum 的 VJP 先产生全 1。两条路最后都进入 add 对 b 的同一 unbroadcast 规则。

### STATE SNAPSHOT：(3,) -> (2,3) 的每个步骤

继续复用实验中的 `matrix=arange(6).reshape(2,3)` 与 `b=[10,20,30]`，输出两行为 `[10,21,32]`、`[13,24,35]`。loss=sum(output)，所以 output 的 cotangent 是全 1 矩阵。

```text
forward:
b [10,20,30] (3,) ------ share across rows ------> matrix+b (2,3)
                                                 [10,21,32]
                                                 [13,24,35]
backward:
bar(b) [2,2,2] (3,) <------ sum rows, axis=0 ----- bar(output) (2,3)
                                                 [1,1,1]
                                                 [1,1,1]
```

| 执行点 | value | shape | 维度判断 / 轴处理 |
| --- | --- | --- | --- |
| target metadata | b 的目标空间 | (3,) | target_ndim=1 |
| 进入 unbroadcast | [[1,1,1],[1,1,1]] | (2,3) | ndim=2 > 1 |
| while 求和 | [2,2,2] | (3,) | axis=0 被消去 |
| 再判断 while | [2,2,2] | (3,) | ndim=1，退出 |
| for axis=0,size=3 | [2,2,2] | (3,) | size 不为1，不再归约 |
| 返回 | [2,2,2] | (3,) | 与输入 cotangent 空间一致 |

不要沿 axis 1 求和，那会把不同 b 分量混在一起，得到长度2的结果。对于目标本来就有的 size-1 轴，不能直接丢掉它，所以第二阶段保留维度。两个阶段分别处理“新增轴”和“已有轴被扩展”，不是重复做同一件事。

### 与 第五篇 的梯度累加有什么关系

`unbroadcast` 在一次 primitive 的某一个输入位置内部，收回重复使用各数组元素产生的贡献；`add_outgrads` 在不同输入边或不同下游节点之间，汇合同一个 graph parent 的贡献。两者都对应数学求和，但职责边界不同。先让每条贡献回到输入空间，再让通用引擎相加，才能保持 shape 契约。

同样不要把 sum 的 VJP 与 unbroadcast 互换：forward sum 会减少元素，反向把 seed 扩展回输入；forward broadcast 会扩展使用位置，反向把 cotangent 归约回输入。两对方向恰好相反。

## 实验验证

[完整实验：broadcasting.py](../../../assets/autograd/experiments/broadcasting.py)。运行环境、资源目录及路径配置见[系列总览](00-overview.md#experiments)。下方命令以解压后的资源目录为工作目录。

[EXPERIMENT]  
File: [`experiments/broadcasting.py`](../../../assets/autograd/experiments/broadcasting.py)  
Purpose: 比较 vector-output VJP 与 scalar-loss grad，并验证两种 bias 的返回 shape。

```python
    vector_vjp, vector_value = make_vjp(lambda b: x + b)(scalar_bias)
    scalar_from_vector = vector_vjp(np.ones_like(vector_value))
    scalar_from_loss = grad(lambda b: np.sum(x + b))(scalar_bias)

    matrix = np.arange(6.0).reshape(2, 3)
    vector_bias = np.array([10.0, 20.0, 30.0])
    vector_gradient = grad(lambda b: np.sum(matrix + b))(vector_bias)
```

进入时 x 与 scalar_bias 已定义；前两条 scalar 结果来自同一广播映射的不同输出接口，最后一条计算向量 bias 梯度。随后断言同时验证数值与 shape，防止“数值元素对了，但向量空间错了”的实现混过去。

运行 `python -B experiments/broadcasting.py`，实测结果：

```text
scalar -> vector forward shape: () -> (3,)
vector cotangent -> scalar VJP: 3.0, shape=()
matrix + vector shapes: (2,3) + (3,)
gradient wrt vector bias: [2,2,2], shape=(3,)
all checks passed
```

## 理论与源码的对应关系

| 理论 | 实现 |
| --- | --- |
| repeated use introduced by broadcast | raw NumPy forward result shape |
| contributions over repeated positions | incoming array `g` |
| sum over broadcast axes | `unbroadcast` |
| input cotangent space | captured `target_meta` |
| forward tangent expansion | `numpy_jvps.py :: broadcast` |

## 几个自测问题

1. 对 `b.shape=(1,3)` 加到 `(2,3)`，哪些轴需要 backward sum，是否 keepdims？
2. 为什么不能把 unbroadcast 放进通用 `backward_pass`？
3. broadcasting 与普通 multiple-path accumulation 在数学上有什么共同点？

## 小结

broadcasting 引入重复使用位置，反向必须把这些位置的贡献求和。unbroadcast 先消除新增轴，再对目标 size-1 轴保留维度地归约；它负责单条 NumPy 规则的 shape，add_outgrads 负责图上路径的汇合。

## 下一篇

接下来读[第八篇：Forward Mode 与 JVPNode](08-forward-mode.md)。

## 参考资料

- [autograd/numpy/numpy_vjps.py](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_vjps.py)，固定 commit 原文件。
- [autograd/numpy/numpy_wrapper.py](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/numpy/numpy_wrapper.py)，固定 commit 原文件。
- [Automatic Differentiation lecture](https://mlsyscourse.org/slides/04-automatic-differentiation.pdf)。

