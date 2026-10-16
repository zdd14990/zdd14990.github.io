---
title: 交换代数
date: 2025-11-19
updated: 2026-10-15
description: 交换代数笔记：素谱与 Zariski 拓扑、局部化、整扩张、Noether 环、准素分解与维数理论等内容。
hide:
  - navigation
categories:
  - 代数
tags:
  - algebra
---

# 交换代数 { #top }

## 1. 环和理想 { #s1 }

**环与环同态**

##### 定义1.1 { #s1-0-0-1 }

**环**$A$是具有两个二元运算**加法**和**乘法**的集合，满足：

1)$A$对加法是一个交换群(这样$A$有零元素，记为0)

2)对乘法是结合的：

$$
(xy)z=x(yz)
$$

且对加法是分配的：

$$
x(y+z)=xy+xz
$$

$$
(y+z)x=yz+zx
$$

**在本文中提到的环都表示具有单位元的交换环.**

3)对乘法是交换的：

$$
xy=yx
$$

且具有**单位元**(记为1)

4)$\exists1\in A$,使得对所有$x\in A,x1=1x=x$

当$1=0$时，$A$是平凡的环，它只含零元，这种环称为**零环**.

##### 定义1.2 { #s1-0-0-2 }

**环同态**$f$是指一个从环$A$映入环$B$的映射，满足：

1)$f(x+y)=f(x)+f(y)$

2)$f(xy)=f(x)f(y)$

3)$f(1)=1$

环$A$的子集$S$称为$A$的**子环**，如果$S$是加法子群且对乘法封闭，并且含有$A$的单位元.  此时从$S$映入$A$的恒同映射是环同态.

环同态的复合也是环同态.

**理想. 商环**

##### 定义1.3 { #s1-0-0-3 }

环$A$的加法子群$\mathfrak{a}$称为$A$的一个**理想**，若$A\mathfrak{a}\subseteq\mathfrak{a}$.	$A$中乘法诱导出商群$A/\mathfrak{a}$中的乘法，故$A/\mathfrak{a}$是一个环，称为**商环**.因而映射$\varphi:A\rightarrow A/\mathfrak{a},x\rightarrow x+\mathfrak{a}$是环的满同态.

##### 命题1.4 { #s1-0-0-4 }

环$A$的理想$\mathfrak{a}$与$\mathfrak{b}$满足$\mathfrak{a} \subseteq \mathfrak{b}$与环$A/\mathfrak{a}$的理想$\mathfrak{\bar{b}}$之间存在保持包含关系的一一对应：

$$
\mathfrak{b}=\varphi^{-1}(\mathfrak{\bar{b}})
$$

##### 定义1.5 { #s1-0-0-5 }

环同态$f:A\rightarrow B$的**核**$\boldsymbol{f^{-1}(0)}$是$A$的理想，记作$\boldsymbol{\mathbf{Ker}(f)}$；$f$的**象**$\boldsymbol{f(A)}$是环$B$中的子环，记作$\boldsymbol{\mathbf{Im}(f)}$.同态$f$导出环同构:

$$
A/Ker(f)\cong Im(f)
$$

若$x-y\in \mathfrak{a}$，可写作$x\equiv y(mod \text{ }    \mathfrak{a})$

**零因子. 幂零元. 可逆元**

##### 定义1.6 { #s1-0-0-6 }

i) $x\in A$ 称为**零因子**，如果$\exists y\in A,y\ne 0,xy=0$.没有非零零因子(且$1\ne 0$)的环叫做**整环**.如$\mathbb{Z}$和$\mathcal{K}[x_1,\dots,x_n]$(其中$\mathcal{K}$是域而$x_1,\dots,x_n$是无关变元)都是整环.

ii) $x\in A$称为**幂零的**，如果$\exists n\in \mathbb{N}^*,x^n=0$.

iii) $x\in A$称为**可逆元**，如果$\exists y\in A,xy=1$.显然$y$唯一，记作$\boldsymbol{x^{-1}}$.

iv) $x\in A$,称$Ax$或$(x)$为**主理想**.$x$是可逆元当且仅当$(x)=A=(1)$.**零理想**$(0)$通常记作$0$.

v) 若环$A$中$1\ne 0$且每个非零元都是可逆元，则称$A$为**域**，任一域都是整环，但反之不对.

##### 命题1.7 { #s1-0-0-7 }

设$A$是非零环，则下述条件等价:

1)$A$是域.

2)$A$除平凡的理想($0$与$(1)$)外无别的理想.

3)任一从$A$映入非零环的同态都是单的.

**素理想和极大理想**

##### 定义1.8 { #s1-0-0-8 }

i) 环$A$的理想$\mathfrak{p}$称做**素理想**，若$\mathfrak{p}\ne (1)$，且可以从$xy\in \mathfrak{p}$推出$x\in \mathfrak{p}$或$y\in \mathfrak{p}$.

$\mathfrak{p}$是素理想$\Longleftrightarrow$$A/\mathfrak{p}$是整环.

ii) 环$A$的理想$\mathfrak{m}$称做**极大理想**，如果$\mathfrak{m}\ne (1)$，且不存在理想$\mathfrak{a}$满足$\mathfrak{m}\subset \mathfrak{a} \subset (1)$

$\mathfrak{m}$是极大理想$\Longleftrightarrow$$A/\mathfrak{m}$是域.

考虑所有不为$(1)$的理想的并集，可知每个非零环$A$都有极大理想。同样的，对于A的每个不为$(1)$的理想$\mathfrak{a}$，考虑所有包含$\mathfrak{a}$且不为$(1)$的理想的并集，可知有一个包含$\mathfrak{a}$的极大理想。(或者考虑$A/\mathfrak{a}$即可)。于是，我们有**$A$中任一不可逆元都包含在一个极大理想内。**

##### 定义1.9 { #s1-0-0-9 }

恰有一个极大理想$\mathfrak{m}$的环$A$叫做**局部环**，域$\mathcal{K}=A/\mathfrak{m}$叫做环A的**同余类域**。

##### 命题1.10 { #s1-0-0-10 }

i) 环$A$的理想$\mathfrak{m}$使得$A/\mathfrak{m}$中均为可逆元，则$A$是局部环，$\mathfrak{m}$是$A$的极大理想。

ii) 环$A$的理想$\mathfrak{m}$使得$1+\mathfrak{m}$中均为可逆元，则$A$是局部环。

**证明：**i) 任一不为$(1)$的理想都由不可逆元组成，由条件它们都在$\mathfrak{m}$中，进而$\mathfrak{m}$是$A$中唯一的极大理想。

ii) 取$\boldsymbol{x} \in A/\mathfrak{m}$。由于$\mathfrak{m}$是极大理想，因此$\boldsymbol{x}$与$\mathfrak{m}$可以生成$(1)$，即存在$y\in A$和$z\in \mathfrak{m}$满足$\boldsymbol{x}y+z=1$，进而$\boldsymbol{x}y=1-t\in\mathfrak{m}$，故是$\boldsymbol{x}$是可逆元，由i)即证。

##### 定义1.11 { #s1-0-0-11 }

i) 仅有有限个极大理想的环叫做**半局部环**。

ii) 所有理想都是主理想的整环称作**主理想整环(PID)**.在这种环里非零素理想都是极大的。

**小根和大根**

##### 命题1.12 { #s1-0-0-12 }

环$A$所有幂零元的集合$\Re$是一个理想，且环$A/\Re$中无非零幂零元。$\Re$称作环$A$的**小根**。

##### 命题1.13 { #s1-0-0-13 }

$A$的小根是$A$中所有素理想的交。

**证明：**设$\Re^\prime$为$A$中所有素理想的交。

一方面，任意$a\in \Re$以及任一素理想$\mathfrak{p}$，有$n>0$使得$a^n=0\in \mathfrak{p}$，由$\mathfrak{p}$是素理想得到$a \in  \mathfrak{p}$，故$\Re\subset  \Re^\prime$。

另一方面，对任一非幂零元$a$，考虑所有对任意$n$均不包含$a^n$的理想，它们构成的集合记为$\varSigma$。$0\in \varSigma$，再按包含关系对$\varSigma$使用Zorn引理得到$\varSigma$中的最大元$\mathfrak{p}$。设$x,y\notin  \mathfrak{p}$，那么理想$\mathfrak{p} + (x)$与$\mathfrak{p}+(y)$都严格包含$\mathfrak{p}$，故不属于$\varSigma$，因此有$a^n\in  \mathfrak{p}+(x), a^m\in  \mathfrak{p}+(y)$，于是$a^{n+m}\in  \mathfrak{p}+(xy)$，即$\mathfrak{p}+(xy)\notin \varSigma$，所以$xy\notin  \mathfrak{p}$，这表示$\mathfrak{p}$是素理想且不包含$a$，因此$a\notin  \Re^\prime$。

##### 定义1.14 { #s1-0-0-14 }

环$A$的**大根**$\mathfrak{R}$为它的所有极大理想的交。

##### 命题1.15 { #s1-0-0-15 }

$x\in \mathfrak{R}\Longleftrightarrow$对任意$y\in A,1-xy$是可逆元。

**证明：**“$\Longrightarrow$” 若$1-xy$不可逆那么它就属于某个极大理想$\mathfrak{m}$，又$x\in \mathfrak{R} \subset \mathfrak{m}$，故$xy\in \mathfrak{m}$，进而$1\in \mathfrak{m}$，矛盾！

“$\Longleftarrow$” 若$x\notin \mathfrak{m}$，任取极大理想$\mathfrak{m}$，那么$x$与$\mathfrak{m}$可以生成(1)，因此存在$z\in \mathfrak{m}$和$y\in A$满足$z+xy=1$，即$1-xy\in \mathfrak{m}$不是可逆元。

**理想的运算**

##### 定义1.16 { #s1-0-0-16 }

设$\mathfrak{a}$和$\mathfrak{b}$均为环$A$的理想，定义

$\mathfrak{a}+\mathfrak{b}=\left\{x+y\Big| x\in \mathfrak{a},y \in \mathfrak{b} \right\}$

$\mathfrak{a}\mathfrak{b}=\left\{ \sum_{i=1}^n x_iy_i\Big| x_i \in \mathfrak{a},y \in \mathfrak{b},i=1,2,\dots,n\right\}$

这个定义满足分配律，即$\mathfrak{a(b+c)=ab+ac}$。另外如果$\mathfrak{a\supseteq b,c}$，我们就有$\mathfrak{a\cap (b+c)=a\cap b+a\cap c}$。若$\mathfrak{a+b}=(1)$，称它们是**互素**的。此时我们有$\mathfrak{a\cap b=ab}$(因为$\mathfrak{(a+b)(a\cap b)=a(a \cap b)+b(a\cap b)}$)。

##### 定义1.17 { #s1-0-0-17 }

环$A_1,A_2,\dots,A_n$的**直积**$A=\prod_{i=1}^{n}A_i=\left\{ (x_1,x_2,\dots,x_n)\Big| x_i\in A_i,i=1,2,\dots,n\right\}$是一个有单位元$(1,1,\dots,1)$的交换环。反过来，投影$p_i:A\rightarrow A_i$由$(x_1,x_2,\dots,x_n)\mapsto x_i$所定义是环同态。

用环$A$的理想们$\mathfrak{a}_1,\mathfrak{a}_2,\dots,\mathfrak{a}_n$定义同态

$\varphi:A\rightarrow \prod_{i=1}^{n}(A/\mathfrak{a}_i)$

$x\mapsto (x+\mathfrak{a}_1,x+\mathfrak{a}_2,\dots,x+\mathfrak{a}_n)$

##### 命题1.18 { #s1-0-0-18 }

i) 如果对任意$i\neq j$,$\mathfrak{a}_i$和$\mathfrak{a}_j$互素，那么$\prod \mathfrak{a}_i=\cap \mathfrak{a}_i$

ii) 同态$\varphi$是满的$\Longleftrightarrow$对任意$i\neq j$,$\mathfrak{a}_i$和$\mathfrak{a}_j$互素。

iii) 同态$\varphi$是单的$\Longleftrightarrow\cap \mathfrak{a}_i = (0)$。

##### 命题1.19 { #s1-0-0-19 }

i) 设$\mathfrak{p}_1,\dots,\mathfrak{p}_n$是素理想，理想$\mathfrak{a}\subset\bigcup_{i=1}^{n}\mathfrak{p}_i$,则存在某个$i,\mathfrak{a}\subseteq\mathfrak{p}_i$。

ii) 设$\mathfrak{a}_1,\dots,\mathfrak{a}_n$是理想，素理想$\mathfrak{p}\subset\bigcap_{i=1}^{n}\mathfrak{a}_i$,则存在某个$i,\mathfrak{p}\supseteq\mathfrak{a}_i$。

进而若$\mathfrak{p}=\prod_{i=1}^{n}\mathfrak{a}_i$，则存在某个$i$,$\mathfrak{p}=\mathfrak{a}_i$。

##### 定义1.20 { #s1-0-0-20 }

对环$A$的理想$\mathfrak{a,b}$定义**商**为：

$(\mathfrak{a:b})=\left\{ x\in A \Big| x\mathfrak{b}\subseteq \mathfrak{a}\right\}$

它是一个理想。特别地，$(0:\mathfrak{b})$叫做$\mathfrak{b}$的**零化子**并记作$\mathrm{Ann}(\mathfrak{b})$。另外，如果$\mathfrak{b}$是主理想$(x)$，我们也将$(\mathfrak{a}:(x))$记作$(\mathfrak{a}:x)$。

##### 性质1.21 { #s1-0-0-21 }

i) $\mathfrak{a}\subseteq(\mathfrak{a}:\mathfrak{b})$.

ii) $(\mathfrak{(a:b)b\subseteq a}$.

iii) $\mathfrak{((a:b):c)=(a:bc)=(a:(b:c))}$.

iv) $(\cap_i \mathfrak{a}_i:\mathfrak{b})=\cap_i (\mathfrak{a}_i:\mathfrak{b})$.

v) $(\mathfrak{a}:\sum_i \mathfrak{b}_i)=\cap_i (\mathfrak{a}:\mathfrak{b}_i)$.

##### 定义1.22 { #s1-0-0-22 }

环$A$的理想$\mathfrak{a}$的**根**定义为集合：

$r(a)=\left\{ x\in A \Big| x^n\in  \mathfrak{a},n>0\right\}$

若$\varphi:A\rightarrow A/\mathfrak{a}$是自然同态，那么$r(a)=\varphi^{-1}(\Re_{A/\mathfrak{a}})$，故它是理想。

##### 性质1.23 { #s1-0-0-23 }

i) $r(\mathfrak{a})\supseteq \mathfrak{a}$.

ii) $r(r(\mathfrak{a}))=r(\mathfrak{a})$.

iii) $r(\mathfrak{ab})=r(\mathfrak{a\cap b})=r(\mathfrak{a})\cap r(\mathfrak{b})$.

iv) $r(\mathfrak{a})=(1)\Leftrightarrow \mathfrak{a}=(1)$.

v) $r(\mathfrak{a+b})=r(r(\mathfrak{a})+r(\mathfrak{b}))$.

vi) 若$\mathfrak{p}$是素理想，那么$r(\mathfrak{p}^n)=r(\mathfrak{p})$对一切$n>0$成立.

##### 命题1.24 { #s1-0-0-24 }

理想$\mathfrak{p}$的根是包含$\mathfrak{p}$的一切素理想的交。

**证明：**对$A/\mathfrak{a}$同**命题1.13**证明即可。

##### 命题1.25 { #s1-0-0-25 }

$D=A$中零因子的集合$=r(D)=r(\cup_{x\neq 0}\mathrm{Ann}(x))=\cup_{x\neq 0}r(\mathrm{Ann}(x))$

##### 命题1.26 { #s1-0-0-26 }

若环$A$的理想$\mathfrak{a,b}$的根$r(\mathfrak{a})$和$r(\mathfrak{b})$互素，则$\mathfrak{a,b}$互素。

**扩张和局限**

##### 定义1.27 { #s1-0-0-27 }

设$f:A\rightarrow B$是环同态，$\mathfrak{a}$是$A$的理想，则$\mathfrak{a}$的象$f(\mathfrak{a})$在$B$中生成的理想$Bf(\mathfrak{a})$叫做理想$\mathfrak{a}$的**扩理想**$\mathfrak{a}^e$。$B$的理想$\mathfrak{b}$的**局限理想**$\mathfrak{b}^c$定义为$f^{-1}(\mathfrak{b})$。$\mathfrak{b}$是素理想可以推出$\mathfrak{b}^c$是素理想，但是$\mathfrak{a}$是素理想不能推出$\mathfrak{a}^e$是素理想。

##### 性质1.28 { #s1-0-0-28 }

i) $\mathfrak{a}\subseteq {\mathfrak{a}^e}^c$，$\mathfrak{b}\supseteq {\mathfrak{b}^c}^e$.

ii) $\mathfrak{a}^e= { {\mathfrak{a}^e}^c}^e$，$\mathfrak{b}^c ={ {\mathfrak{b}^c}^e}^c$.

iii) 设$C$包含$B$中所有理想的局限理想，设$E$包含$A$中所有理想的扩张理想。则

$C=\left\{ \mathfrak{a}\Big| {\mathfrak{a}^e}^c=\mathfrak{a}\right\}$,$E=\left\{ \mathfrak{b}\Big| {\mathfrak{b}^c}^e=\mathfrak{b}\right\}$。

而$\mathfrak{a}\mapsto \mathfrak{a}^e$是$C$到$E$的一一映射，它的逆是$\mathfrak{b}\mapsto \mathfrak{b}^c$。

##### 性质1.29 { #s1-0-0-29 }

设$\mathfrak{a}_1,\mathfrak{a}_2$是$A$中的理想，$\mathfrak{b}_1,\mathfrak{b}_2$是$B$中的理想，那么：

$(\mathfrak{a}_1+\mathfrak{a}_2)^e=\mathfrak{a}_1^e+\mathfrak{a}_2^e$，$(\mathfrak{b}_1+\mathfrak{b}_2)^c\supseteq\mathfrak{b}_1^c+\mathfrak{b}_2^c$

$(\mathfrak{a}_1\cap \mathfrak{a}_2)^e\subseteq \mathfrak{a}_1^e\cap\mathfrak{a}_2^e$，$(\mathfrak{b}_1\cap \mathfrak{b}_2)^c= \mathfrak{b}_1^c\cap\mathfrak{b}_2^c$

$(\mathfrak{a}_1\mathfrak{a}_2)^e=\mathfrak{a}_1^e\mathfrak{a}_2^e$，$(\mathfrak{b}_1\mathfrak{b}_2)^c\supseteq\mathfrak{b}_1^c\mathfrak{b}_2^c$

$(\mathfrak{a}_1:\mathfrak{a}_2)^e\subseteq \mathfrak{a}_1^e:\mathfrak{a}_2^e$，$(\mathfrak{b}_1:\mathfrak{b}_2)^c\subseteq \mathfrak{b}_1^c:\mathfrak{b}_2^c$

$r(\mathfrak{a})^e\subseteq r(\mathfrak{a}^e)$，$r(\mathfrak{b})^c= r(\mathfrak{b}^c)$

**习题**

##### 1. { #s1-0-0-30 }

设$x$是环$A$中幂零元，证明$1+x$是$A$的可逆元，由此推出幂零元和可逆元的和是可逆元。

##### 证明： { #s1-0-0-31 }

存在$n,x^n=0$,则$(1+x)(1-x+\dots +(-1)^{n-1}x^{n-1})=1+(-1)^nx^n=1$，故$1+x$可逆。

设$a$是可逆元，则$(a^{-1}x)^n=a^{-n}x^n=0$，即$a^{-1}x$为幂零元，由上知$1+a^{-1}x$可逆，故$a+x=a(1+a^{-1}x)$为可逆元之积可逆。

##### 2. { #s1-0-0-32 }

$A$是环，$A[x]$是对应的多项式环。令$f=a_0+a_1x+\dots+a_nx^n\in A[x]$，证明：

i) $f$是$A[x]$中可逆元$\Longleftrightarrow a_0$是$A$中可逆元，且$a_1,a_2,\dots,a_n$是幂零元。

ii) $f$幂零$\Longleftrightarrow a_0,a_1,\dots,a_n$幂零。

iii) $f$是零因子$\Longleftrightarrow$ 存在环$A$的非零元$a$使得$af=0$

iv)如果$(a_0,a_1,\dots ,a_n)=(1)$,$f$就叫做**本原多项式**，证明，如果$f,g\in A[x]$，那么$fg$本原$\Longleftrightarrow f$和$g$都是本原

##### 证明： { #s1-0-0-33 }

i)$f$可逆$\Longleftrightarrow$存在$g=\sum_{j=0}^m b_jx^j\in A[x]$使得$fg=\sum_{i=0}^n a_ix^i\sum_{j=0}^m b_jx^j=1$

“$\Longrightarrow$”	若$f$可逆，则$1=[x^0]fg=a_0b_0\Longrightarrow a_0,b_0$可逆

$0=[x^{n+m}]fg=a_nb_m$

$0=[x^{n+m-1}]fg\Longrightarrow 0=a_n\cdot [x^{n+m-1}]fg=a_n(a_nb_{m-1}+a_{n-1}b_m)=a_n^2b_{m-1}$

$0=[x^{n+m-1}]fg\Longrightarrow 0=a_n^2\cdot [x^{n+m-1}]fg=a_n^2(a_nb_{m-2}+a_{n-1}b_{m-1}+a_{n-2}b_m)=a_n^3b_{m-2}$

…

$0=[x^{n+m-r}]fg\Longrightarrow 0=a_n^r\cdot [x^{n+m-r}]fg=a_n^r(a_nb_{m-r}+\dots+a_{n-r}b_m)=a_n^{r+1}b_{m-r}$

…

$0=[x^{n}]fg\Longrightarrow 0=a_n^m\cdot [x^{n}]fg=a_n^m(a_nb_0+\dots)=a_n^{m+1}b_{0}$，又$b_0$可逆，故$a_n$是幂零的。

由**1.**知$f-a_nx^n$也是可逆的，继续如上证明可依次得到$a_{n-1},a_{n-2},\dots,a_1$均是幂零的。

“$\Longleftarrow$” 设$a_i^{k_i}=0$，则$(\sum_{i=1}^n a_ix^i)^{\sum_{i=1}^n k_i}=0$。$a_0$可逆且$\sum_{i=1}^n a_ix^i$幂零，由**1.**知$f$可逆。

ii) “$\Longleftarrow$”$f^{\sum_{i=0}^n k_i}=(\sum_{i=0}^n a_ix^i)^{\sum_{i=0}^n k_i}=0$故幂零。

“$\Longrightarrow$”设$f^m=0$，则$0=[x^{nm}]f^m=a_n^m$故$a_n$幂零。进而$f-a_nx^n$也是幂零的，继续如上证明可依次得到$a_{n-1},a_{n-2},\dots,a_0$均是幂零的。

iii)“$\Longrightarrow$”设$g=\sum_{j=0}^m b_jx^j\in A[x]$是使得$fg=\sum_{i=0}^n a_ix^i\sum_{j=0}^m b_jx^j=0$且$m$最小的一个$g$。

$0=[x^{n+m}]fg=a_nb_m$，进而$a_ng=0$否则$a_ng$是次数更小的满足要求的多项式。

$0=[x^{n+m-1}]fg=a_nb_{m-1}+a_{n-1}bm=a_{n_1}b_m$，同上可知$a_{n-1}g=0$。

…

$0=a_0b_m$，至此，我们有$fb_m=0$

“$\Longleftarrow$”是显然的。

iv)“$\Longrightarrow$”$(1)=(a_0b_0,a_0b_1+a_1b_0,\dots)\subseteq(a_0,a_0b_1,a_1b_0,\dots)=(a_0,a_1b_0,\dots)\subseteq(a_0,a_1,\dots)=\dots=(a_0,a_1,\dots,a_n)\subseteq (1)$，因此$(a_0,a_1,\dots,a_n)=(1)$，故$f$是本原的，$g$同理。

“$\Longleftarrow$”若$fg$不是本原的，设$(1)\supsetneq I=(a_0b_0,a_0b_1+a_1b_0,\dots)$，取包含$I$的极大理想$I_{max}$。

考虑域$A/I_{max}$上的多项式整环$(A/I_{max})[x]$中的元素

$F=f+I_{max}=\sum_{i=0}^n (a_i+I_{max})x^i$

$G=g+I_{max}=\sum_{j=0}^m (b_j+I_{max})x^j$

因为$(a_0b_0,a_0b_1+a_1b_0,\dots)\subseteq I_{max}$，故$FG=(a_0b_0+I_{max})+(a_0b_1+a_1b_0+I_{max})x+\dots=0$，进而$F=0$或$G=0$，不妨是前者。这表示$a_i\in I_{max}$对$i=0,1,\dots,n$均成立，这与$(a_0,a_1,\dots,a_n)=(1)$矛盾！

##### 3. { #s1-0-0-34 }

推广**2.**至环$A[x_1,\dots,x_r]$上。

设$f=\sum_{i_1,i_2,\dotsm,i_r}a_{i_1,i_2,\dots,i_r}x_1^{i_1}x_2^{i_2}\dots x_r^{i_r}$

##### 断言： { #s1-0-0-35 }

i)$f$可逆$\Longleftrightarrow a_{0,0,\dots,0}$可逆且$a_{i_1,i_2,\dots,i_r}$幂零，其中$i_1,i_2,\dots,i_r$不全为零。

ii)$f$幂零$\Longleftrightarrow a_{i_1,i_2,\dots,i_r}$幂零，对于任意的$i_1,i_2,\dots,i_r$。

iii)iv)均同**2.**

##### 证明： { #s1-0-0-36 }

均将$A[x_1,\dots,x_r]$视为$A[x_1,\dots,x_{r-1}][x_r]$利用**2.**归纳即可。

##### 4. { #s1-0-0-37 }

在环$A[x]$中，大根与小根重合。

##### 证明： { #s1-0-0-38 }

由**2.**与**命题1.15**，小根$\Re=\left\{f=\sum_{i} a_ix^i \Big| a_i\text{幂零}\right\}$，大根$\mathfrak{R}=\left\{g=\sum_j b_jx^j \Big|\forall h\in A[x],1+gh\text{可逆}\right\}$

一方面，任取$f\in \Re$，由于$f$幂零，则$\forall h \in A[x]$，$fh$也幂零。由**1.**知$1+fh$可逆，因此$\Re \subset \mathfrak{R}$。

另一方面，任取$g\in \mathfrak{R}$，取$h=x\in A[x]$，则$1+xg$可逆，由**2.**知$b_j$均幂零，因此$\mathfrak{R}\subset \Re$。

##### 5. { #s1-0-0-39 }

设$A$是环，$A[[x]]$是$A$上的形式幂级数，设$f=\sum_{n=0}^{\infty}a_nx^n\in A[[x]]$，证明：

i)$f$是$A[[x]]$中可逆元$\Longleftrightarrow a_0$是$A$中可逆元。

ii)如果$f$幂零，则对一切$n\ge 0$，$a_n$都幂零。逆命题是否成立？

iii)$f$属于环$A[[x]]$的大根$\Longleftrightarrow a_0$属于环$A$的大根。

iv)环$A[[x]]$中任一极大理想$\mathfrak{m}$对$A$的局限理想都是$A$中的极大理想，而$\mathfrak{m}$由$\mathfrak{m}^c$和$x$生成。

v)$A$中任一素理想都是$A[[x]]$中一个素理想的局限理想。

##### 证明： { #s1-0-0-40 }

i)“$\Longrightarrow$”是显然的。

“$\Longleftarrow$”设$g=\sum_{n=0}^{\infty}b_nx^n\in A[[x]]$，我们来求解满足$fg=1$的$g$。

$\begin{cases} 1=[x^0]fg=a_0b_0\Longrightarrow b_0=a_0^{-1}\\ 0=[x^n]fg=a_0b_n+\sum_{i=1}^n a_ib_{n-i}\Longrightarrow b_n=-a_0^{-1}\sum_{i=1}^n a_ib_{n-i},n=1,2,\dots\\ \end{cases}$

这样我们便确定了唯一的$g$。因此$f$可逆。

ii)与$A[x]$上的情形相同，不再赘述。

iii)$f$属于环$A[[x]]$的大根$\Longleftrightarrow$$\forall g=\sum_{n=0}^{\infty}b_nx^n\in A[[x]],1+fg$可逆

$\Longleftrightarrow$$\forall b_0 \in A,1+a_0b_0$是$A$中可逆元$\Longleftrightarrow$$a_0$属于环$A$的大根。

iv)$\mathfrak{m}^c=\mathfrak{m}\cap A$，若$\mathfrak{m}^c$不是极大的，取极大理想$I_{max}\supsetneq \mathfrak{m}^c$。

则$(I_{max},x)\supsetneq \mathfrak{m}$且$(I_{max},x)^c=I_{max}$，所以$(I_{max},x)\neq A[[x]]$，这与$\mathfrak{m}$是极大的矛盾。

由$\mathfrak{m}^c=\mathfrak{m}\cap A$可知$\mathfrak{m}^c$是$\mathfrak{m}$中所有常数项的集合。因此$(\mathfrak{m}^c,x)$是所有常数项属于$\mathfrak{m}^c$的形式幂级数，自然包含$\mathfrak{m}$。再由$\mathfrak{m}$的极大性，可知$\mathfrak{m}=(\mathfrak{m}^c,x)$。

v)设$\mathfrak{p}$是$A$中的素理想，则$\mathfrak{p}=(\mathfrak{p},x)\cap A=(\mathfrak{p},x)^c$。下证$(\mathfrak{p},x)$是$A[[x]]$的素理想。

设$f=\sum_{n=0}^{\infty}a_nx^n,g=\sum_{n=0}^{\infty}b_nx^n$，$fg=a_0b_0+(a_0b_1+a_1b_0)x+\dots\in (\mathfrak{p},x)$。

则$a_0b_0\in \mathfrak{p}$，所以$a_0\in \mathfrak{p}$或$b_0 \in \mathfrak{p}$，进而$f\in (\mathfrak{p},x)$或$g \in (\mathfrak{p},x)$。

##### 6. { #s1-0-0-41 }

假定环$A$中任一不含在小根中的理想都包含非$0$幂等元，证明，$A$的小根与大根重合。

##### 证明： { #s1-0-0-42 }

显然$\Re\subset \mathfrak{R}$。若$\Re \subsetneq \mathfrak{R}$，由定义，存在幂等元$x\in \mathfrak{R}$，则$\forall y \in A$，$1+xy$是可逆元。取$y=-1$我们得到$1-x$是可逆元。但是$x(1-x)=x-x^2=0$矛盾！

##### 7. { #s1-0-0-43 }

设环$A$中任意元素$x$都适合$x^n=x$对某个$n>1$，证明$A$中任一素理想都极大。

##### 证明： { #s1-0-0-44 }

设$\mathfrak{p}$是素理想。若不然$A/\mathfrak{p}$中有不可逆元$\bar{x}=x+\mathfrak{p}$。

但$\bar{x}^n=x^n+\mathfrak{p}=x+\mathfrak{p}=\bar{x}$，故$\bar{x}^{n-1}=1$，这与它不可逆矛盾！

##### 8. { #s1-0-0-45 }

设$A$是非零环，证明$A$中素理想的集合有一个极小元素。

##### 证明： { #s1-0-0-46 }

由Zorn引理，我们只需证明对于任一个素理想的降链$\left\{\mathfrak{p}_\alpha\right\}$，$\cap_{\alpha} \mathfrak{p}_\alpha=\mathfrak{p}$也是素理想。

设$xy\in \mathfrak{p}$，对任意的$\alpha$，$x\in \mathfrak{p}_\alpha$或$y\in \mathfrak{p}_\alpha$。若$x\notin \mathfrak{p}$，则存在$\alpha$使得$x\notin \mathfrak{p}_\alpha$。

对于任意的$\beta$，若$\mathfrak{p}_\alpha \subset \mathfrak{p}_\beta$，则$y\in \mathfrak{p}_\alpha \subset \mathfrak{p}_\beta$；若$\mathfrak{p}_\alpha \supset \mathfrak{p}_\beta$，则$x \notin \mathfrak{p}_\beta$，只能$y\in \mathfrak{p}_\beta$。由上可知$y\in \mathfrak{p}$。于是$\mathfrak{p}$是素理想。

##### 9. { #s1-0-0-47 }

设$\mathfrak{a}\neq (1)$是环$A$中的理想。证明$\mathfrak{a}=r(\mathfrak{a})\Longleftrightarrow \mathfrak{a}$是素理想。

##### 证明： { #s1-0-0-48 }

$\mathfrak{a}=r(\mathfrak{a})\Longleftrightarrow \forall x \notin \mathfrak{a},\forall n, x^n \notin \mathfrak{a}\Longleftrightarrow A/\mathfrak{a}$中无非零幂零元$\Longleftrightarrow \Re_{A/\mathfrak{a}}=0$。

设$f:A\rightarrow A/\mathfrak{a}$是自然同态。$\Re_{A/\mathfrak{a}}=0\Longleftrightarrow \mathfrak{a}=f^{-1}(0)=f^{-1}\left(\displaystyle\bigcap_{\mathfrak{p}\in \mathrm{Spec}(A/\mathfrak{a})}\mathfrak{p}\right)=\displaystyle\bigcap_{\mathfrak{p}\in \mathrm{Spec}(A/\mathfrak{a})}f^{-1}(\mathfrak{p})$是一些素理想的交。

##### 10. { #s1-0-0-49 }

设$A$是环，$\Re$是它的小根，证明下列诸断言等价：

i)$A$恰好只有一个素理想。

ii)$A$中任意元素或者是可逆元，或者是幂零元。

iii)$A/\Re$是域。

##### 证明： { #s1-0-0-50 }

i)$\Longrightarrow$iii) 对于包含$\Re$的极大理想$\mathfrak{m}$，则$\mathfrak{m}$是素的，进而$\mathfrak{p}=\mathfrak{m}$，故$A/\mathfrak{R}$是域。

iii)$\Longrightarrow$i)$A/\Re$是域可知$\Re$是极大理想，对于任一素理想$\mathfrak{p},p\subset \Re\Longrightarrow \mathfrak{p}=\Re$，即$A$有唯一素理想。

iii)$\Longrightarrow$ii)$A/\Re$是域可知$\forall x\in A$，要么$x\in \Re$，要么$x+\Re$可逆，即$x$可逆。

ii)$\Longrightarrow$iii)因此$A$中除了$\Re$中的元素均可逆，即得$A/\Re$中非零元均可逆。

##### 11. { #s1-0-0-51 }

环$A$叫做**Boole环**如果$x^2=x$对一切$x\in A$。在Boole环中证明：

i)$2x=0$对一切$x\in A$

ii)任意素理想$\mathfrak{p}$均极大，而$A/\mathfrak{p}$是由两个元素组成的域。

iii)任一具有有限个生成元的理想$A$都是主理想。

##### 证明： { #s1-0-0-52 }

i)$2x=x+x=(x+x)^2=4x^2=4x\Longrightarrow 2x=0$

ii)同**7.**所证，$A/\mathfrak{p}$中元素$\bar{x}$满足$\bar{x}(\bar{x}-1)=\mathfrak{p}\Longrightarrow \bar{x}=\mathfrak{p}\text{或}1+\mathfrak{p}$。

iii)只需证二元情形。注意到$(x+y-xy)x=x$与$(x+y-xy)y=y$可知$(x,y)=(x+y-xy)$。

##### 12. { #s1-0-0-53 }

局部环里除了0和1之外没有别的幂等元。

##### 证明： { #s1-0-0-54 }

设$x^2=x$，则$x(x-1)=0$。若$x$不为0和1，则$x$和$x-1$均为零因子。又$x$与$x-1$至多一个在$A$的唯一极大理想$\mathfrak{m}$中，不妨是后者。则理想$(x)$是极大的，与$\mathfrak{m}$的唯一性矛盾！

**域的代数闭包的造法(E.Artin)**

##### 13. { #s1-0-0-55 }

设$K$是域，$\Sigma$是系数属于$K$的，首项系数等于$1$的一个未定元的不可约多项式$f$的全体所组成的集合。对每个$f \in \Sigma$，相应一个未定元$x_{f}$。用$A$表这些未定元$x_{f}$在$K$上生成的多项式环。由$\mathfrak{a}$表由所有的多项式$f\left(x_{f}\right)$，对一切$f \in \Sigma$，在$A$中生成的理想。证明$\mathfrak{a} \neq(1)$。

设$\mathfrak{m}$是$A$中的一个包有$\mathfrak{a}$的极大理想，并令$K_{1}=A / \mathfrak{m}$。那么$K_{1}$是$K$的扩域，在其中每个多项式$f \in \Sigma$都有根。对$K_{1}$重复对$K$的作法，得到域$K_{2}$，等等。令$L=\displaystyle\bigcup_{n=1}^{\infty} K_{n}$。那么$L$是域，在其中每个多项式$f \in \Sigma$都分解成线性因式之积。用$\vec{K}$表$L$中在$K$上代数的那些元素的集合。那么$\bar{K}$是$K$的代数闭包。

##### 证明： { #s1-0-0-56 }

若不然，$1=\displaystyle\sum_{i=1}^n g_if_i(x_{f_i})$，其中$g_i\in A,f_i\in \Sigma$。

考虑$K$的环扩张$E=K[x_{f_1},\dots,x_{f_n}]/(f_1(x_{f_1})\dots,f_n(x_{f_n}))$，在$E$上取$\alpha_i$使$f_i(\alpha_i)=0$，令$x_{f_i}=\alpha_i$带回上式得到$1=0$，矛盾！

##### 14. { #s1-0-0-57 }

用$\Sigma$表环$A$中完全由零因子组成的理想的全体所组成的集合。证明$\Sigma$有一个极大元，而且$\Sigma$的每个极大元都是素理想。因此$A$中零因子的集合是素理想的并。

##### 证明： { #s1-0-0-58 }

对于任一个$\Sigma$中的升链$\left\{\mathfrak{m}_\alpha\right\}$，设$\cup_{\alpha} \mathfrak{m}_\alpha=\mathfrak{m}$。对任意$x\in \mathfrak{m}$，存在$\alpha$使$x\in \mathfrak{m}_\alpha$，进而对任意$y\in A$，$xy\in \mathfrak{m}_\alpha \subset \mathfrak{m}$。再取$z\in \mathfrak{m}_\beta \subset \mathfrak{m}$，不妨$\mathfrak{m}_\alpha \subset \mathfrak{m}_\beta$，则$x+z\in \mathfrak{m}_\alpha \subset \mathfrak{m}$。故$\mathfrak{m}$是理想。由Zorn引理知$\Sigma$中有极大元，记为$\mathfrak{M}$。

若$xy\in \mathfrak{M}$，则$x,y$至少有一零因子，不妨是$x$。由于$\mathfrak{M}\subset(\mathfrak{M},x)\in \Sigma$，故$(\mathfrak{M},x)=\mathfrak{M}$，即$x\in \mathfrak{M}$，进而$\mathfrak{M}$是素理想。

对于任一零因子$a$，设$\Sigma_a$是$\Sigma$中包含$a$的那些理想，同上可知$\Sigma_a$有极大元且是素理想，这就得出了最后一个结论。

## 2. 模 { #s2 }

**模和模同态**

##### 定义2.1 { #s2-0-0-1 }

设$A$是一个交换环，$M$是一个交换群，如果$A$线性地作用在它上面，就叫做一个$A$-**模**。确切地说，模是一个对$(M,\mu)$，这里$M$是交换群，而$\mu$是个映射$A\times M\rightarrow M$，它们满足以下公理，其中我们把$\mu(a,x)(a\in A,x\in M)$写作$ax$：

$a(x+y)=ax+by$，

$(a+b)x=ax+bx$，

$(ab)=a(bx)$，

$1x=x$。

一个等价的定义是：$M$是交换群且有环同态$A\rightarrow \mathrm{Aut}(M)$。

##### 定义2.2 { #s2-0-0-2 }

设$M$和$N$是两个$A$-模，映射$f:M\rightarrow N$叫做$A$-**模同态**，如果对一切$a\in A$和$x,y\in M$：

$f(x+y)=f(x)+f(y)$，

$f(ax)=af(x)$，

$A$-模同态的复合仍然是$A$-模同态。

##### 定义2.3 { #s2-0-0-3 }

从$M$到$N$中的所有$A$-模同态所成的集合可以成为一个$A$-模，如果按以下公式定义$f+g$和$af$：

$(f+g)(x)=f(x)+g(x)$

$(af)(x)=af(x)$

对一切$x\in M$。这个$A$-模记作$\mathrm{Hom}_A(M,N)$，在无歧义的情况下可以简记为$\mathrm{Hom}(M,N)$。

同态$u:M^\prime \rightarrow M$和$v:N\rightarrow N^\prime$导出映射：

$\bar{u}:\mathrm{Hom}(M,N)\rightarrow \mathrm{Hom}(M',N)$

$f\mapsto f\circ u$

$\bar{v}:\mathrm{Hom}(M,N)\rightarrow \mathrm{Hom}(M,N^\prime)$

$f\mapsto v\circ f$

这两个映射都是$A$-模同态。

对任意$A$-模$M$，有自然同构$\mathrm{Hom}(A,M)\cong M$：每个$A$-模同态$f:A\rightarrow M$由元素$f(1)$所唯一确定，而这个元素可以任意选取。

**子模和商模**

##### 定义2.4 { #s2-0-0-4 }

模$M$的**子模**$M^\prime$是$M$的子群，它对$A$的元素乘法封闭。再在交换群$M/M^\prime$上按公式

$a(x+M^\prime)=ax+M^\prime$

来定义乘法，$A$-模的结构就搬到商群$M/M^\prime$上来。$A$-模$M/M^\prime$叫做$M$对于$M^\prime$的**商模**。从$M$到$M/M^\prime$的自然映射是$A$-模同态。在$M$的包含$M^\prime$的子模所构成的集合与$M/M^\prime$的子模的集合之间由保持包含关系的一一对应。

##### 定义2.5 { #s2-0-0-5 }

$f:M\rightarrow N$是$A$-模同态，**核**定义为集合$\mathrm{Ker}(f)=\left\{ x\in M\Big| f(x)=0\right\}$，它是$M$的子模。

**象**定义为集合$\mathrm{Im}(f)=f(M)$，它是$N$的子模。

**余核**定义为集合$\mathrm{Coker}(f)=N/\mathrm{Im}(f)$，它是$N$的商模。

设$M^\prime$是$M$的子模，$M^\prime \subseteq \mathrm{Ker}(f)$，那么$f$诱导同态$\bar{f}:M/M^\prime\rightarrow N$，$x+M^\prime \mapsto f(x)$，$\bar{f}$的核是$\mathrm{Ker}(f)/M^\prime$。特别的，令$M\prime=\mathrm{Ker}(f)$，我们有一个$A$-模同构$M/\mathrm{Ker}(f)\cong \mathrm{Im}(f)$。

**子模上的运算**

##### 定义2.6 { #s2-0-0-6 }

设$M$是个$A$-子模，定义$(M_i)_{i\in I}$的**和**$\sum M_i$为所有$\sum x_i$的集合，其中$x_i\in M_i,i\in I$且只有有限个非零。它是$M$的包含所有$M_i$的最小子模。

定义它们的**交**$\bigcap M_i$也是$M$的子模。

定义$A$的理想$\mathfrak{a}$和$A$-模$M$的**积**$\mathfrak{a}M$为一切可能的有限和$\sum a_ix_i$的集合，其中$a_i\in \mathfrak{a},x_i \in M$，它是$M$的子模。

定义$M$两个子模$N,P$的**商**$(N:P)=\left\{a\Big|  aP\subseteq N,a\in A\right\}$，它是$A$的理想。特别的，$(0:M)$叫做$M$的**零化子**并记作$\mathrm{\mathrm{Ann}}(M)$。如果理想$\mathfrak{a}\subseteq \mathrm{Ann}(M)$，那么通过定义$\bar{x}m=xm,x\in A,\bar{x}=x+\mathfrak{a}$，$M$可以看作一个$A/\mathfrak{a}$-模。

$A$-模$M$是**忠实的**，如果$\mathrm{Ann}(M)=0$。因此$M$看作$A/\mathrm{Ann}(M)$-模是忠实的。

##### 命题2.7 { #s2-0-0-7 }

i)设$L\supseteq M\supseteq N$，它们都是$A$-模，那么$(L/N)/(M/N)\cong L/M$。

ii)设$M_1,M_2$是$M$的子模，那么$(M_1+M_2)/M_1\cong M_2/(M_1\cap M_2)$。

iii) $\mathrm{Ann}(M+N)=\mathrm{Ann}(M)\cap \mathrm{Ann}(N)$。

iv)$(N:P)=\mathrm{Ann}((N+P)/N)$。

**证明：**i)考虑满同态$\varphi :L/N\rightarrow L/M,x+N\rightarrow x+M$，它的$\mathrm{Ker}=M/N$。

ii)考虑同态的合成$M_2\rightarrow M_1+M_2\rightarrow (M_1+M_2)/M_1$是满的，它的$\mathrm{Ker}=M_1\cap M_2$。

##### 定义2.8 { #s2-0-0-8 }

设$x$是$M$的任意一个元素，所有它的倍元$ax(a\in A)$的集合是$M$中的一个子模，记作$Ax$或$(x)$。如果$M=\displaystyle\sum_{i\in I}Ax_i$，那么$x_i$这组元素叫做$M$的**一组生成元**，$A$-模$M$叫做**有限生成的**。

**直和与直积**

##### 定义2.9 { #s2-0-0-9 }

定义$A$-模$M,N$的直和$M\oplus N=\left\{(x,y)\Big| x\in M,y\in N\right\}$，它就成为一个$A$-模。

更一般的，定义$\displaystyle\bigoplus_{i\in I}M_i=\left\{(x_i)_{i\in I}\Big| x_i\in M_i,i\in I,\text{且仅有有限个}x_i\text{非零}\right\}$。去除有限个非零的条件就得到直积$\displaystyle\prod_{i\in I}M_i$。

假定环$A$是个直积$\displaystyle\prod_{i=1}^{n}A_i$，$\mathfrak{a}_i=\left\{(0,\dots,0,a_i,0,\dots,0)\Big| a_i\in A_i\right\}$是$A$的理想。环$A$看成$A$-模就是理想$\mathfrak{a}_1,\dots,\mathfrak{a_n}$的直和。反过来，若$A=\mathfrak{a}_1\oplus \dots \mathfrak{a}_n$，则$A\cong \displaystyle\prod_{i\in I}A/\mathfrak{b}_i$，其中$\mathfrak{b}_i=\displaystyle\bigoplus_{j\neq i}\mathfrak{a_j}$

**有限生成的模**

##### 定义2.10 { #s2-0-0-10 }

**自由**$A$-模是同构于形如$\displaystyle\bigoplus_{i\in I}M_i$的$A$-模的一个$A$-模。这里所有$M_i$都同构于$A$，有时记作$A^{(I)}$。因此有限生成的自由$A$-模同构于$A^n$。

##### 命题2.11 { #s2-0-0-11 }

$A$-模$M$是有限生成+的$\Longleftrightarrow$$M$同构于模$A^n$的一个商模，对某个$n>0$。

##### 命题2.12 { #s2-0-0-12 }

设$M$是有限生成的$A$-模，$\mathfrak{a}$是$A$的一个理想，$\varphi$是$A$-模$M$的一个自同态，使$\varphi(M)\subseteq \mathfrak{a}M$，那么$\varphi$满足：$\varphi^n+a_1\varphi^{n-1}+\dots+a_n=0$，其中$a_i\in \mathfrak{a}$

##### 推论2.13 { #s2-0-0-13 }

设$M$是有限生成的$A$-模，$\mathfrak{a}$是$A$的一个理想，且$\mathfrak{a}M=M$，则有一个$x\equiv 1(mod \text{ }\mathfrak{ a})$使得$xM=0$

##### 命题2.14 { #s2-0-0-14 }

(Nakayama引理)设$M$是有限生成的$A$-模，$\mathfrak{a}$是包含在$A$的大根$\mathfrak{R}$中的理想，如果$\mathfrak{a}M=M$，则$M=0$

##### 推论2.15 { #s2-0-0-15 }

设$M$是有限生成的$A$-模，$N$是$M$的一个子模，$\mathfrak{a}$是$A$的一个包含在$\mathfrak{R}$中的理想，则$M=\mathfrak{a}M+N\Longrightarrow M=N$

**证明：**将**命题2.14**应用于$M/N$并结合$\mathfrak{a}(M/N)=(\mathfrak{a}M+N)/N$即可。

##### 命题2.16 { #s2-0-0-16 }

设$x_i(1\le i \le n)$是$M$的一组元素，它们在$M/\mathfrak{m}M$中的象组成这个向量空间的一组基，那么$x_i$生成$M$。

**正合序列**

##### 定义2.17 { #s2-0-0-17 }

一个$A$-模和$A$-同态的序列

$$
\dots \rightarrow M_{i-1} \stackrel{f_i}{\longrightarrow}M_i\stackrel{f_{i+1}}{\longrightarrow}M_{i+1} \rightarrow \dots\tag{0}
$$

叫做**在$M_i$处正合**，如果$\mathrm{Im}(f_i)=\mathrm{Ker}(f_{i+1})$。如果它在每个$M_i$处都正合，则称它为正合序列。

特别的，

$$
\begin{align*}
0 \rightarrow M^{\prime} \xrightarrow{f} M \text{~正合~} \Longleftrightarrow f\text{~是单的~}\tag{1}\\
M \xrightarrow{g} M^{\prime \prime} \rightarrow 0 \text{~正合~} \Longleftrightarrow g \text{~是满的}\tag{2}\\
0 \rightarrow M^{\prime} \xrightarrow{f} M \xrightarrow{g} M^{\prime \prime} \rightarrow 0 \text{~正合~} \Longleftrightarrow f \text{~是单的}, g \text{~是满的}\tag{3}
\end{align*}
$$

$x^n+y^n=z^n$

---

## PDF 原文 { #pdf }

[打开原文件](../../assets/commutative-algebra-notes.pdf){ .md-button target="_blank" rel="noopener" }
[下载 PDF](../../assets/commutative-algebra-notes.pdf){ .md-button download="commutative-algebra-notes.pdf" }

若下方预览无法显示，可直接打开原文件或下载后阅读。

<div style="height: 800px; width: 100%;">
    <embed src="../../assets/commutative-algebra-notes.pdf" type="application/pdf" width="100%" height="100%">
</div>
