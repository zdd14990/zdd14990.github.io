---
title: 附录：算法说明
description: "密码分析学附录：恩尼格玛、CipherFour、AES、Mini-AES、Grain-128、Keccak、Whirlpool、MD4 与 MD5 的算法说明。"
hide:
  - navigation
categories:
  - 密码学
  - 密码分析
date: 2026-07-24
---

# 附录：算法说明

本附录记录前面分析中需要用到的状态布局、轮函数和参数。玩具算法用于验证分析方法，不用于实际保密；标准算法的生产实现应使用经过审计的密码库。

约定 $\oplus$ 为按比特异或，$\Vert$ 为拼接，$\operatorname{ROL}_r$ 为定长字的循环左移。除非另有说明，矩阵作用于列向量。

## 恩尼格玛密码机

固定一次按键位置，设接线板为 $S$、正向转子组为 $R_i$、反射器为 $U$，则

$$
E_i=S^{-1}R_i^{-1}UR_iS.
$$

接线板是若干互不相交的换位与不动点，反射器是 13 个互不相交的换位。于是固定位置的 $E_i$ 是无不动点的对合。

若接线板使用 $p$ 条线，其连接数为

$$
\frac{26!}{(26-2p)!\,p!\,2^p}.
$$

从 $t$ 个转子中有序选取 $s$ 个，再考虑每个 26 种初始位置，简化模型的转子设置数为

$$
\frac{t!}{(t-s)!}26^s.
$$

教材为说明分析原理采用简化步进。复现历史机器时，需另外定义型号、环设置、缺口位置和双步进，不能直接把转子看作简单的 26 进制计数器。攻击方法见[第 2 章](<chapter-02-enigma.md>)。

## CipherFour

CipherFour 是 16 比特 SPN 玩具密码。状态由 4 个 4 比特半字节组成，$r$ 轮版本使用 $r+1$ 个独立的 16 比特轮密钥 $k_0,\ldots,k_r$。

### S 盒与比特置换

十六进制 S 盒如下：

```text
x : 0 1 2 3 4 5 6 7 8 9 A B C D E F
S : 6 4 C 5 0 7 2 E 1 F 3 D 8 A 9 B
```

把状态最左侧标为第 0 比特，输入第 $i$ 比特送到第 $P(i)$ 比特，其中

```text
i : 0 1 2  3 4 5 6  7 8 9 10 11 12 13 14 15
P : 0 4 8 12 1 5 9 13 2 6 10 14  3  7 11 15
```

这相当于转置一个 $4\times4$ 比特矩阵，故 $P^{-1}=P$。$S$ 对每个半字节分别作用，记整个替换层为 $\mathcal S$。

### 加密过程

从 $x_0=P_{\mathrm{plain}}$ 开始，对 $i=0,\ldots,r-2$，

$$
x_{i+1}=P(\mathcal S(x_i\oplus k_i)).
$$

最后输出

$$
C=\mathcal S(x_{r-1}\oplus k_{r-1})\oplus k_r.
$$

末轮没有比特置换。其目的之一是让末轮部分解密更容易说明，而不是因为最后一次置换会增加实质安全性。

```python
S = [6, 4, 12, 5, 0, 7, 2, 14, 1, 15, 3, 13, 8, 10, 9, 11]
P = [0, 4, 8, 12, 1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15]
INV_S = [S.index(x) for x in range(16)]

def substitute(x, box):
    return sum(box[(x >> shift) & 15] << shift
               for shift in (0, 4, 8, 12))

def permute(x):
    # 教材编号从最高位开始，不是整数的最低位编号。
    return sum(((x >> (15 - i)) & 1) << (15 - P[i])
               for i in range(16))

def encrypt(x, keys):
    assert len(keys) >= 2
    for key in keys[:-2]:
        x = permute(substitute(x ^ key, S))
    return substitute(x ^ keys[-2], S) ^ keys[-1]

def decrypt(x, keys):
    x = substitute(x ^ keys[-1], INV_S) ^ keys[-2]
    for key in reversed(keys[:-2]):
        x = substitute(permute(x), INV_S) ^ key
    return x

keys = [0x1234, 0x5678, 0x9ABC, 0xDEF0, 0x1357, 0x2468]
assert all(decrypt(encrypt(x, keys), keys) == x for x in range(1 << 16))
```

这里输入与轮密钥均限定为 16 比特。5 轮版本的独立轮密钥总量为 96 比特，并不是标准 AES 式的 16 比特主密钥扩展。

## AES

AES 的分组长度固定为 128 比特，密钥长度与轮数为：

| 密钥长度 | 轮数 |
| --- | --- |
| 128 比特 | 10 |
| 192 比特 | 12 |
| 256 比特 | 14 |

输入 16 个字节按列装入状态，$s_{r,c}=\mathrm{input}_{4c+r}$。先做一次 AddRoundKey，普通轮依次为 SubBytes、ShiftRows、MixColumns、AddRoundKey；末轮省去 MixColumns。

- **SubBytes**：在 $\mathbb F_{2^8}$ 上求逆（0 映为 0），再作固定仿射变换。
- **ShiftRows**：第 $r$ 行循环左移 $r$ 个字节。
- **MixColumns**：每列左乘矩阵

$$
\begin{pmatrix}
02&03&01&01\\
01&02&03&01\\
01&01&02&03\\
03&01&01&02
\end{pmatrix}.
$$

- **AddRoundKey**：状态与该轮密钥逐比特异或。

字节乘法在

$$
\mathbb F_2[x]/(x^8+x^4+x^3+x+1)
$$

中进行，不是普通整数乘法。MixColumns 的字节分支数为 5，即非零输入列 $u$ 满足

$$
\operatorname{wt}_{\mathrm{byte}}(u)
+\operatorname{wt}_{\mathrm{byte}}(Mu)\ge5.
$$

AES 轮密钥由同一个主密钥扩展生成，并非各轮独立随机。在攻击中可以把轮密钥暂作独立变量建模，但最后必须加入真实密钥编排约束。

一个常用的 AES-128 核对向量为：

```text
key        = 000102030405060708090a0b0c0d0e0f
plaintext  = 00112233445566778899aabbccddeeff
ciphertext = 69c4e0d86a7b0430d8cdb78070b4c55a
```

## Mini-AES

教材 Mini-AES 使用 16 比特状态，按列排列为

$$
\begin{pmatrix}x_0&x_2\\x_1&x_3\end{pmatrix},
$$

其中每个 $x_i$ 为 4 比特。普通轮依次为 NibbleSub、ShiftRow、MixColumn、KeyAddition，另有初始白化，末轮省去 MixColumn。

教材采用的 S 盒取自 LED，而不是所有其他资料中同名 Mini-AES 的 S 盒：

```text
x : 0 1 2 3 4 5 6 7 8 9 A B C D E F
S : C 5 6 B 9 0 A D 3 E F 8 4 7 1 2
```

第二行循环左移一个半字节；每列在 $\mathbb F_2[x]/(x^4+x+1)$ 上乘

$$
\begin{pmatrix}3&2\\2&3\end{pmatrix}.
$$

默认主密钥为 16 比特，拆成 $w_0,\ldots,w_3$。第 $r$ 轮的四个半字节可按下式扩展（$r\ge1$，轮常数按所选版本定义）：

$$
\begin{aligned}
w_{4r}&=w_{4r-4}\oplus S(w_{4r-1})\oplus\mathrm{RC}_r,\\
w_{4r+1}&=w_{4r-3}\oplus w_{4r},\\
w_{4r+2}&=w_{4r-2}\oplus w_{4r+1},\\
w_{4r+3}&=w_{4r-1}\oplus w_{4r+2}.
\end{aligned}
$$

教材基本公式使用轮编号作为轮常数。扩展到任意轮数时，必须明确它在 4 比特域内的编码，不应让数值无意溢出。

教材部分攻击章节会替换密钥编排，例如使用 32 比特主密钥或交替轮密钥。复现实验必须使用该节的版本，不能把附录默认编排与正文改版混在一起。

## Grain-128

本节指原始 Grain-128 结构，不与 Grain-128a 或 Grain-128AEAD 混用。密钥为 128 比特、IV 为 96 比特，内部有一个 128 比特 LFSR 和一个 128 比特 NFSR。

设两寄存器序列分别为 $s_i,b_i$。LFSR 的正常反馈为

$$
s_{i+128}=s_i\oplus s_{i+7}\oplus s_{i+38}
\oplus s_{i+70}\oplus s_{i+81}\oplus s_{i+96}.
$$

NFSR 反馈包含线性项、若干 $b$ 比特的乘积以及 $s_i$；输出函数再非线性组合两类寄存器抽头。

写成抽象状态更新为

$$
s_{i+128}=f(S_i),\qquad
b_{i+128}=s_i\oplus g(B_i),\qquad
z_i=h(S_i,B_i).
$$

初始化时把密钥装入 NFSR，把 IV 和规定的固定常数装入 LFSR，运行 256 次更新，且输出反馈到两个寄存器；随后进入正常密钥流生成阶段，不再把输出额外反馈进去。

复现时必须核对所选版本的固定装入常数、反馈抽头、输出位编号和初始化轮数。尤其不能根据本文的结构摘要自行补全常数表；教材的减轮实验也不等于完整初始化版本。

第 12 章利用的正是初始化阶段的非线性传播：通过输入条件让某些乘积因子为零，延缓公开变量的次数增长。

## Keccak

Keccak 使用海绵结构，状态宽度为 $b=r+c$。对 Keccak-f[1600]，状态排列为 $5\times5$ 个 64 比特 lane，共 24 轮。

一轮依次执行

$$
\theta\longrightarrow\rho\longrightarrow\pi
\longrightarrow\chi\longrightarrow\iota.
$$

以下坐标 $x,y$ 均模 5，lane 内旋转模 64。

**$\theta$：列奇偶扩散。**

$$
C[x]=\bigoplus_y A[x,y],\qquad
D[x]=C[x-1]\oplus\operatorname{ROL}_1(C[x+1]),
$$

再令 $A[x,y]\leftarrow A[x,y]\oplus D[x]$。

**$\rho$：**各 lane 按固定偏移循环旋转。

**$\pi$：**重新排列 lane，例如把旋转后的 $A[x,y]$ 送到 $B[y,2x+3y]$。

**$\chi$：非线性层。**

$$
A'[x,y]=B[x,y]\oplus
\bigl((\neg B[x+1,y])\land B[x+2,y]\bigr).
$$

**$\iota$：**对 $A'[0,0]$ 异或轮常数。

$\chi$ 的布尔代数次数为 2，其余步骤为线性或仿射。因此未经细化的 $r$ 轮次数上界为 $2^r$，实际还受变量数、重复变量与条件抵消限制。

| SHA-3 实例 | 输出长度 | 速率 $r$ | 容量 $c$ |
| --- | --- | --- | --- |
| SHA3-224 | 224 | 1152 | 448 |
| SHA3-256 | 256 | 1088 | 512 |
| SHA3-384 | 384 | 832 | 768 |
| SHA3-512 | 512 | 576 | 1024 |

SHA-3 与早期 Keccak 实例的域分离后缀不完全相同，不能仅凭相同输出长度认为结果相同。SHAKE 的可扩展输出也有自己的域分离规则。分析时还要区分公开置换、海绵杂凑和带密钥 MAC 三个对象。

## Whirlpool

Whirlpool 使用 512 比特消息块和 512 比特链接状态，摘要长为 512 比特。内部有一个 512 比特分组密码 $W$，采用 Miyaguchi-Preneel 型反馈：

$$
h_i=W_{h_{i-1}}(M_i)\oplus M_i\oplus h_{i-1}.
$$

这里链接状态用作 $W$ 的密钥，消息块用作输入。初始链接状态为零；消息填充包含长度信息。

状态排成 $8\times8$ 字节矩阵，内部密码有 10 轮，主要步骤为字节替换、列移位、行混合与轮密钥加；密钥扩展也采用相近的变换。

大状态与字节型扩散适合研究截断差分和反弹攻击，但最终碰撞必须满足反馈后的输出关系，不能仅让内部置换的某部分差分归零。减轮攻击轮数也应说明是否计入初始或最后的部分变换。

## MD4

MD4 使用 MD 迭代结构，消息块长为 512 比特，链接状态与摘要长为 128 比特。每块分成 16 个小端序 32 比特字。

初始状态为：

```text
A = 67452301   B = efcdab89
C = 98badcfe   D = 10325476
```

填充先加一个 1 比特，再加若干 0，使长度达到模 512 余 448，最后附上原消息长度的 64 比特小端编码。

压缩函数有 3 轮，每轮 16 步，共 48 步；轮布尔函数为

$$
F(X,Y,Z)=(X\land Y)\lor(\neg X\land Z),
$$

$$
G(X,Y,Z)=(X\land Y)\lor(X\land Z)\lor(Y\land Z),
\qquad H(X,Y,Z)=X\oplus Y\oplus Z.
$$

各步交替更新四个状态字，基本形式是

$$
A\leftarrow\operatorname{ROL}_s(A+f(B,C,D)+M_j+T),
$$

其中加法模 $2^{32}$。三轮常数分别为 0、`5a827999`、`6ed9eba1`，使用不同消息字顺序与旋转量。48 步结束后，将四个结果分别与输入链接状态模加，形成下一链接状态。

“3 轮”和“48 步”是不同计数单位。描述减轮结果时，要明确删去的是整轮还是若干步。

## MD5

MD5 同样使用 512 比特消息块、128 比特状态和摘要，采用与 MD4 相同的初值及小端长度填充框架，但压缩函数改为 4 轮、共 64 步。

四轮使用的布尔函数可以写为

$$
\begin{aligned}
F(B,C,D)&=(B\land C)\lor(\neg B\land D),\\
G(B,C,D)&=(B\land D)\lor(C\land\neg D),\\
H(B,C,D)&=B\oplus C\oplus D,\\
I(B,C,D)&=C\oplus(B\lor\neg D).
\end{aligned}
$$

每步的核心更新为

$$
B'=B+\operatorname{ROL}_s(A+f(B,C,D)+M_j+T_i)
\pmod{2^{32}},
$$

再重排四个状态字。与 MD4 相比，旋转结果外面多了对 $B$ 的模加，各步消息索引、常数和旋转量也不同。常数为

$$
T_i=\lfloor2^{32}|\sin(i+1)|\rfloor,\qquad0\le i<64.
$$

64 步之后仍进行链接状态的前馈模加。消息修改与差分分析必须连同这些模加的进位一起考虑。

MD4、MD5 的碰撞安全性已被破坏，不应作为新系统的抗碰撞安全基础。它们在这里用于理解差分路线、消息修改和迭代结构，不作为部署建议。

## 实验前的核对表

1) 固定算法版本、轮数和密钥编排，区分玩具版、减轮版与标准版。

2) 明确最高位/最低位编号、字节序、状态按行还是按列装入。

3) 核对末轮是否省略扩散、是否存在初始白化和最终反馈。

4) 先测试加解密互逆，再测试公开标准向量；互逆测试本身不能证明实现符合标准。

5) 小 S 盒先穷举检查 DDT、LAT 与 ANF，再测试整轮性质。

参考：王美琴主编，《密码分析学》，附录 A。正文中的具体改版参数以相应攻击章节为准。
