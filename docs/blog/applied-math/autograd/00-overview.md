---
title: Autograd 源码学习系列总览
date: 2026-09-05
hide:
  - navigation
categories:
  - 应用数学
  - Autograd 源码学习
tags:
  - autograd
  - automatic-differentiation
  - python
---

# Autograd 源码学习

用过自动微分之后，很自然会想知道：输入仍然是一段普通 Python 程序，梯度究竟是在什么时刻、由哪些对象算出来的？这个系列沿 HIPS/autograd 的实际调用链，把数学里的链式法则接到 Box、primitive、局部 VJP 和运行时状态上。

正文来自已经完成验证的 V2 教材。每篇保留推导、关键源码和实验，按前后篇可以连续阅读；完整文件则留作查看分支、查找 symbol 和运行实验的入口。

## 为什么读这个仓库

HIPS/autograd 是较早面向 Python/NumPy 的自动微分项目之一，也是理解后来函数变换式 AD 思路的一条入口。这里的价值在于实现足够直接：用户 API、tracer、传播引擎和 NumPy 局部规则可以沿少量核心文件连起来。

我们主要研究运行中的 Python 对象如何组合局部导数，包括 reverse mode、forward mode、broadcasting、高阶微分、operator 组合及规则验证。重点是读懂这个仓库自己的实现；现代框架的编译器与设备运行时不在主线中。

## 源码版本

- HIPS/autograd **1.9.1**。
- Commit：`f53a21734fdfae636f448744d9097d8d35a643a0`。
- [固定版本源码](https://github.com/HIPS/autograd/tree/f53a21734fdfae636f448744d9097d8d35a643a0)。

源码引用保留 File、Symbol、Commit，行号仅用于定位这一版本。三种代码标识分别表示：

- `[REAL SOURCE]`：该 commit 的连续原文；片段可能依赖所在模块上下文。
- `[TEACHING SIMPLIFICATION]`：为解释机制保留的教学代码，明确声明“以下不是 HIPS/autograd verbatim source。”；Mini 也属于独立教学实现。
- `[EXPERIMENT]`：已有实验文件中的真实节选，标明 File 和 Purpose。

`STATE SNAPSHOT` 展示某个时刻的对象与 cotangent。R、M、Bx 等是教学标签，不是 VJPNode 自带的字段；源码推演与实验直接观察会分别说明。

## 学习路线

| 顺序 | 文章 | 这一篇的目标 |
| --- | --- | --- |
| 01 | [自动微分与计算图](01-ad-and-computational-graph.md) | 区分三类微分，把计算图上的局部导数接到真实 grad 入口。 |
| 02 | [JVP、VJP 与两种自动微分模式](02-jvp-vjp.md) | 手算 J、Jv 和 w^T J，并理解两种 closure 的不同生命周期。 |
| 03 | [从 grad 开始追踪完整调用链](03-grad-call-chain.md) | 逐对象跟踪 grad(f)(3.0) 如何从输入 3 得到梯度 6。 |
| 04 | [tracer.py 与动态计算图](04-tracer.md) | 看清 Box、trace 身份与 primitive 的完整生命周期。 |
| 05 | [Reverse Mode 的核心实现](05-core-reverse-mode.md) | 逐状态执行 backward_pass，解释两个 3 在哪里累加成 6。 |
| 06 | [NumPy Primitive 与 VJP](06-numpy-vjps.md) | 把基础 NumPy 运算的局部规则与 staged closure 对齐。 |
| 07 | [Broadcasting 的反向传播](07-broadcasting.md) | 逐步还原 scalar 和 vector bias 的 cotangent shape。 |
| 08 | [Forward Mode 与 JVPNode](08-forward-mode.md) | 理解 tangent 为什么在节点创建时立即算出。 |
| 09 | [为什么机器学习偏爱 Reverse Mode](09-why-reverse-mode.md) | 用实际调用次数说明 scalar loss 的模式选择与保存成本。 |
| 10 | [高阶自动微分与 Nested Tracing](10-higher-order-ad.md) | 把三次 grad 与 trace 2 -> 1 -> 0 的 nested Box 接起来。 |
| 11 | [Jacobian、Hessian 与算子组合](11-operator-composition.md) | 按导数信息需求阅读高级 operator 的组合实现。 |
| 12 | [Numerical Gradient Checking](12-numerical-gradient-checking.md) | 用有限差分与伴随恒等式独立检查 JVP/VJP。 |
| 13 | [自定义 Primitive](13-custom-primitive.md) | 复现缺失规则、注册 VJP 和二阶验证的完整流程。 |
| 14 | [Mini Autograd：实现与源码对读](14-mini-autograd-design.md) | 对读已有标量教学引擎与 HIPS，区分概念相同和实现不同。 |

## 推荐阅读方式

第一阶段按第一篇到第八篇阅读：先手算一个方向，再跟随源码观察值、Box、node 和 g。第三篇到第五篇是整套系列的核心，状态表可以和代码来回对照，不必一开始通读整个源文件。

第二阶段读第九篇到第十四篇：把模式选择、高阶变换和验证方法接起来，最后用 Mini 的独立实现检验自己是否理解了必要职责。每篇末尾的自测问题保留为问题，可以先独立解释，再回头查源码。

## Repository Mental Map

这张表从已有 repository map 提炼出主线文件；完整目录地图作为补充附件。

| 层次 | 文件 / symbol | 接到下一层时带着什么 |
| --- | --- | --- |
| 用户求导 API | `differential_operators.py :: grad/jacobian/hessian` | 函数、选定输入与查询策略 |
| 参数适配 | `wrap_util.py :: unary_to_nary` | 只替换目标参数的一元函数 |
| tracing | `tracer.py :: trace/primitive/Box` | value、trace 身份、node |
| reverse / forward core | `core.py :: VJPNode/JVPNode` | parents + pullback，或已计算的 tangent |
| 反向访问与汇合 | `util.py :: toposort`、`core.py :: add_outgrads` | 合法节点顺序与累计 cotangent |
| NumPy 集成 | `numpy_wrapper.py`、`numpy_boxes.py` | 已包装 callable 与 ArrayBox 运算符 |
| 局部导数和 shape | `numpy_vjps.py`、`numpy_jvps.py` | 局部乘积规则、unbroadcast |
| 独立验证 | `test_util.py :: check_grads` | 数值方向检查与高阶验证 |

## 实验与完整代码 { #experiments }

[下载完整资源包](../../../assets/autograd/autograd-resources.zip){ .md-button .md-button--primary }

资源包包含 14 个原实验、Mini 的实现/demo/测试、两份较大 ASCII 图，以及 repository map、理论页码表、设计复盘、源码自测题与调试指南。Python 文件与教材原文件逐字节一致，正文保留关键片段，完整代码不额外占用一篇博客。

源码要求 Python >=3.10，依赖 NumPy；建议使用独立虚拟环境。先取得并安装固定 checkout（以下是环境准备命令，不是 HIPS 源码节选）：

```sh
git clone https://github.com/HIPS/autograd.git
cd autograd
git switch --detach f53a21734fdfae636f448744d9097d8d35a643a0
python -m pip install -e .
python -m pip install pytest
git rev-parse HEAD
python -c "import autograd; print(autograd.__file__)"
```

最后两项分别核对 commit 和实际导入位置。这里的安装属于读者的实验环境，与博客构建依赖无关。V2 的原验证环境为 Python 3.14.4、NumPy 2.5.2；其他环境的浮点末位可能略有不同。

解压后进入 `autograd-resources` 目录。12 个实验可直接按 `python -B experiments/文件名.py` 运行；另有两个原实验带着作者机器的路径常量，运行前只调整下载副本中的路径配置：

- `experiments/lesson01_ad_and_graph.py`：将 `main` 中的 `source_root` 指向自己的 Autograd repository root，保留后续实际导入位置断言。
- `experiments/debug_walkthrough.py`：将 `SOURCE_ROOT` 指向该 repository 下的 `autograd/` package 目录，它用于过滤 debugger 的源码文件。

这些路径用于导入验证和调用记录，不参与数学计算。原文件保留原状供核对；修改的是读者的下载副本。配置后可以按第一篇开始运行，或单独核验核心的多路径例子：

```sh
python -B experiments/lesson01_ad_and_graph.py
python -B experiments/multiple_paths.py
python -B mini-autograd/demo.py
python -B -m pytest -q -o addopts= -p no:cov -p no:cacheprovider mini-autograd
```

Mini demo 本身只依赖 Python 标准库，tests 使用 pytest。它没有 ndarray、broadcasting 或 nested tracing 的实现，测试通过的范围也限于这个标量引擎。

| 对应正文 | 完整实验 |
| --- | --- |
| [01 自动微分与计算图](01-ad-and-computational-graph.md) | [lesson01_ad_and_graph.py](../../../assets/autograd/experiments/lesson01_ad_and_graph.py) |
| [02 JVP、VJP 与两种自动微分模式](02-jvp-vjp.md) | [jvp_vjp.py](../../../assets/autograd/experiments/jvp_vjp.py) |
| [03 从 grad 开始追踪完整调用链](03-grad-call-chain.md) | [simple_grad.py](../../../assets/autograd/experiments/simple_grad.py) |
| [04 tracer.py 与动态计算图](04-tracer.md) | [trace_box.py](../../../assets/autograd/experiments/trace_box.py) |
| [05 Reverse Mode 的核心实现](05-core-reverse-mode.md) | [multiple_paths.py](../../../assets/autograd/experiments/multiple_paths.py) |
| [06 NumPy Primitive 与 VJP](06-numpy-vjps.md) | [numpy_primitives.py](../../../assets/autograd/experiments/numpy_primitives.py) |
| [07 Broadcasting 的反向传播](07-broadcasting.md) | [broadcasting.py](../../../assets/autograd/experiments/broadcasting.py) |
| [08 Forward Mode 与 JVPNode](08-forward-mode.md) | [forward_mode.py](../../../assets/autograd/experiments/forward_mode.py) |
| [09 为什么机器学习偏爱 Reverse Mode](09-why-reverse-mode.md) | [reverse_mode_scaling.py](../../../assets/autograd/experiments/reverse_mode_scaling.py) |
| [10 高阶自动微分与 Nested Tracing](10-higher-order-ad.md) | [higher_order.py](../../../assets/autograd/experiments/higher_order.py) |
| [11 Jacobian、Hessian 与算子组合](11-operator-composition.md) | [operator_composition.py](../../../assets/autograd/experiments/operator_composition.py) |
| [12 Numerical Gradient Checking](12-numerical-gradient-checking.md) | [gradient_check.py](../../../assets/autograd/experiments/gradient_check.py) |
| [13 自定义 Primitive](13-custom-primitive.md) | [custom_primitive.py](../../../assets/autograd/experiments/custom_primitive.py) |
| [14 Mini Autograd](14-mini-autograd-design.md) | [mini_autograd.py](../../../assets/autograd/mini-autograd/mini_autograd.py)、[demo.py](../../../assets/autograd/mini-autograd/demo.py)、[tests](../../../assets/autograd/mini-autograd/test_mini_autograd.py) |
| 源码级调试补充 | [debug_walkthrough.py](../../../assets/autograd/experiments/debug_walkthrough.py) |

## 图示与补充资料

- [完整 Repository Map](../../../assets/autograd/source-notes/repository-map.txt)（文本附件）。
- [理论讲义页码与源码对照](../../../assets/autograd/source-notes/theory-reference.txt)（文本附件）。
- [实现设计复盘](../../../assets/autograd/concepts/implementation-design-review.txt)（文本附件）。
- [源码自测题（不附答案）](../../../assets/autograd/questions/source-oral-exam.txt)（文本附件）。
- [Debugger Walkthrough](../../../assets/autograd/source-notes/debugger-walkthrough.txt)（文本附件）。
- [grad 完整调用时序图](../../../assets/autograd/diagrams/grad-runtime-sequence.txt)（文本附件）。
- [Nested Traces 大版图](../../../assets/autograd/diagrams/nested-traces.txt)（文本附件）。
- [Mini Autograd 原说明](../../../assets/autograd/mini-autograd/README.txt)（文本附件）。
- [V2 教材原验收记录](../../../assets/autograd/VERIFICATION_V2.txt)（文本附件）。

## 最终应该能回答的问题

以下问题选自已有源码口试，先尝试用对象和调用时刻回答，再定位具体 symbol：

1. `grad(loss,0)` 创建时做什么，真正 trace 何时开始？
2. root node 与 start Box 分别是什么？
3. 当前实现中 computational graph 存在哪里？
4. 每个 `VJPNode` 保存什么，不保存什么？
5. forward evaluation 的哪些 state 会被 VJP closure 捕获？
6. `add_outgrads` 的 `(gradient,mutable_flag)` 表示什么？
7. `unbroadcast` 可能在哪些 operation rules 中介入？
8. `grad(grad(...))` 时 TraceStack 如何避免层次混乱？
9. 如何用 `check_grads` 独立验证该函数？

## 参考资料

- [HIPS/autograd](https://github.com/HIPS/autograd)，本系列使用上方固定 commit。
- [Automatic Differentiation lecture](https://mlsyscourse.org/slides/04-automatic-differentiation.pdf)，reverse pseudocode 对照第 14 页。

[开始阅读：自动微分与计算图](01-ad-and-computational-graph.md){ .md-button .md-button--primary }
