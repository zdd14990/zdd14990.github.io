---
title: 序列密码的经典安全性分析技术
description: "序列密码的经典安全性分析：Berlekamp-Massey 算法、布尔函数相关性、Walsh-Hadamard 变换与相关攻击。"
hide:
  - navigation
categories:
  - 密码学
  - 密码分析
date: 2026-07-24
---

# 序列密码的经典安全性分析技术

## 序列密码概述

同步序列密码由密钥 $K$ 与初始向量 $IV$ 生成密钥流 $z_0,z_1,\ldots$，然后加密

$$
c_i=p_i\oplus z_i.
$$

已知一段明文及对应密文，就得到同一段密钥流 $z_i=p_i\oplus c_i$。本章主要讨论如何从密钥流恢复生成器的状态，而不是从自然语言中直接猜测明文。

短密钥生成长序列并不等于一次一密。它只能追求计算安全，且必须避免同一密钥、同一初始状态下重用密钥流。

### 线性反馈移位寄存器

长度为 $L$ 的二元线性递推可以写为

$$
s_t=c_1s_{t-1}\oplus\cdots\oplus c_Ls_{t-L},
\qquad t\ge L.
$$

其连接多项式记为

$$
C(D)=1+c_1D+\cdots+c_LD^L.
$$

能产生给定无限序列的最短 LFSR 长度称为该序列的**线性复杂度**。对有限前缀也可以定义最短拟合递推，但这个递推不一定继续适用于尚未观察的输出。

若连接多项式本原且初态非零，$L$ 级 LFSR 可产生周期 $2^L-1$ 的序列。**长周期不等于不可预测**：其线性复杂度仍只有 $L$。

## Berlekamp-Massey 算法

Berlekamp-Massey（B-M）算法根据已知序列前缀，逐步求出能解释该前缀的最短线性递推。

若当前连接多项式为 $C(D)$，新到达的第 $N$ 项产生差异量

$$
d_N=s_N\oplus\bigoplus_{i=1}^{L}c_i s_{N-i}.
$$

- $d_N=0$：当前递推仍能解释新数据。
- $d_N=1$：需要利用先前保存的失败位置和连接多项式进行修正。

在二元域上，修正系数只可能为 1，算法可以写得很简洁：

```python
def berlekamp_massey(bits):
    """返回 (L, C)，使 s[t] = XOR(C[i]*s[t-i])，i=1..L。"""
    n = len(bits)
    c = [1] + [0] * n
    b = [1] + [0] * n
    length, shift = 0, 1
    for t in range(n):
        discrepancy = bits[t]
        for i in range(1, length + 1):
            discrepancy ^= c[i] & bits[t - i]
        if discrepancy == 0:
            shift += 1
            continue
        old = c[:]
        for j in range(n + 1 - shift):
            c[j + shift] ^= b[j]
        if 2 * length <= t:
            length = t + 1 - length
            b = old
            shift = 1
        else:
            shift += 1
    return length, c[:length + 1]

seq = [1, 0, 0]
for t in range(3, 20):
    seq.append(seq[t - 1] ^ seq[t - 3])
assert berlekamp_massey(seq) == (3, [1, 1, 0, 1])
```

若已知序列确实由线性复杂度为 $L$ 的 LFSR 产生，则至少 $2L$ 个连续输出足以恢复其最短递推。朴素实现对长度 $N$ 的输入耗时 $O(N^2)$，也常按 $O(NL)$ 描述递推更新的量级。

这个结论不适用于任意截断序列的未来预测。若输出经过非线性滤波或不规则抽取，直接对短前缀运行 B-M，得到的仅是该前缀的线性复杂度。

## 相关攻击

给多个 LFSR 加一个非线性组合函数，并不自动消除线性弱点。

设输出为

$$
z_t=f(x_{1,t},\ldots,x_{m,t}),
$$

如果某个寄存器输出满足

$$
\Pr[z_t=x_{j,t}]=\frac12+\varepsilon,
\qquad\varepsilon\ne0,
$$

就可以单独枚举第 $j$ 个寄存器的初态，生成候选序列，并按它与已知密钥流的符合程度排序。

若第 $j$ 个寄存器长度为 $L_j$，朴素成本约为 $N2^{L_j}$，而不是一次枚举所有寄存器的 $2^{\sum_jL_j}$ 个联合初态。相关攻击正是利用了这种分治。

但符合率的理论计算通常假设函数输入独立均匀。真实寄存器的有限长度序列不一定满足这一条件，需检验实际相关度与周期效应。

## 布尔函数的线性相关性

对 $f:\mathbb F_2^m\to\mathbb F_2$，定义 Walsh 谱

$$
W_f(a)=\sum_{x\in\mathbb F_2^m}(-1)^{f(x)\oplus a\cdot x}.
$$

则

$$
\Pr[f(x)=a\cdot x]
=\frac12+\frac{W_f(a)}{2^{m+1}}.
$$

特别地，$W_f(0)=0$ 当且仅当 $f$ 平衡。$f$ 与所有低重量非零掩码的相关性为零，意味着它能抵抗相应阶数的相关泄露。

在均匀独立输入下，**$t$ 阶相关免疫**等价于

$$
W_f(a)=0\qquad(1\le\operatorname{wt}(a)\le t).
$$

若还要求 $f$ 平衡，则称为 $t$ 阶弹性函数。

**例：择多函数。**设

$$
f(x_1,x_2,x_3)=x_1x_2\oplus x_1x_3\oplus x_2x_3.
$$

它在至少两个输入为 1 时输出 1，因此是平衡的。但当 $x_2=x_3\ne x_1$ 时才有 $f\ne x_1$，这种情况占 $1/4$，所以

$$
\Pr[f=x_1]=\frac34.
$$

可见，平衡并不等于相关免疫。

## Walsh-Hadamard 变换

直接对每个掩码计算 Walsh 和需要 $O(2^{2m})$ 次基本工作。快速 Walsh-Hadamard 变换用蝶形操作将其降为 $O(m2^m)$。

```python
def walsh_spectrum(truth):
    size = len(truth)
    if size == 0 or size & (size - 1):
        raise ValueError("真值表长度必须是 2 的幂")
    a = [1 - 2 * bit for bit in truth]
    step = 1
    while step < size:
        for base in range(0, size, 2 * step):
            for j in range(base, base + step):
                u, v = a[j], a[j + step]
                a[j], a[j + step] = u + v, u - v
        step *= 2
    return a

truth = [int(x.bit_count() >= 2) for x in range(8)]
spectrum = walsh_spectrum(truth)
assert spectrum[0] == 0
assert spectrum[1] == 4
assert sum(w * w for w in spectrum) == 64
```

最后一个断言是 Parseval 恒等式

$$
\sum_a W_f(a)^2=2^{2m}.
$$

布尔函数与仿射函数之间的最小 Hamming 距离称为非线性度，满足

$$
\operatorname{NL}(f)=2^{m-1}-\frac12\max_a|W_f(a)|.
$$

因此频谱既可以找相关攻击的入口，也可以衡量函数远离线性的程度。

## LFSR 驱动序列密码的相关攻击

设对候选初态 $g$ 生成序列 $s_t(g)$，定义评分

$$
S(g)=\sum_{t=0}^{N-1}(-1)^{z_t\oplus s_t(g)}.
$$

正确候选的期望约为 $2N\varepsilon$，错误候选在随机近似下均值约为 0、标准差约为 $\sqrt N$。因此辨认单个相关候选的基本数据量级是 $O(\varepsilon^{-2})$；从 $2^L$ 个候选中选出正确值，还要考虑大量错误候选的极值。

**快速相关攻击**把密钥流看作 LFSR 输出经过有噪声信道得到的观测。LFSR 的反馈关系提供奇偶校验，例如

$$
s_t\oplus c_1s_{t-1}\oplus\cdots\oplus c_Ls_{t-L}=0.
$$

由此可使用类似纠错译码的方法，避免完全枚举初态。是否有效取决于相关偏差、低重量校验式的数量以及译码复杂度，不能只凭“有相关性”就认为一定存在快速攻击。

恢复内部状态后，可以预测后续密钥流；但恢复初始密钥还需逆推初始化过程。状态恢复与主密钥恢复也是两个不同目标。

## 本章总结

LFSR 的长周期不能抵抗 B-M；非线性组合函数的平衡性不能抵抗相关攻击。评价序列密码需要同时考虑线性复杂度、相关性、初始化与状态恢复难度。

Walsh-Hadamard 变换提供了寻找线性相关的工具；下一章的[立方攻击](<chapter-12-cube-attacks.md>)则从代数标准型和高阶求和研究非线性反馈结构。

参考：王美琴主编，《密码分析学》，第 11 章。
