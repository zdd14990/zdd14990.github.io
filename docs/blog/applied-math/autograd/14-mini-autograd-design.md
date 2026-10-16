---
title: Autograd 源码学习（十四）：Mini Autograd：实现与源码对读
description: "Autograd 源码学习（十四）：实现一个标量 Mini Autograd，并与 HIPS/autograd 的 Box、VJPNode 设计对读。"
date: 2026-09-05
hide:
  - navigation
categories:
  - 应用数学
  - Autograd 源码学习
tags:
  - python
---

# Autograd 源码学习（十四）：Mini Autograd：实现与源码对读

最后回到一个可以完整掌握的标量引擎。教材已有的 Mini Autograd 把值、父引用和梯度放在 Value 中，正好可以与 HIPS 中分开的 Box、VJPNode 和 outgrads 对照。

这一篇保留原实现的关键方法、共享输入的状态变化和四项测试。我们关注哪些职责在两边对应，以及接口、遍历算法和高阶能力为何不能直接画等号。


源码基线：HIPS/autograd 1.9.1，commit `f53a21734fdfae636f448744d9097d8d35a643a0`。

## 本文目标

1. 一个 scalar reverse-mode engine 最少需要哪些状态？
2. local backward closure、toposort 与 accumulation 如何配合？
3. 教学实现与 HIPS/autograd 为什么不能简单一一等同？

## Mental Model

每个 `Value` 既保存 forward scalar，也保存产生它的 parents 和局部 backward closure。`backward()` 先得到 parent-before-child 的 topo list，再反转遍历；每个 closure 用 `+=` 把 contribution 写给 parents。

## 必要的数学

支持的局部规则：

```text
add: (g,g)                 multiply: (g*y,g*x)
negative: -g               divide: (g/y,-g*x/y^2)
x^p: g*p*x^(p-1)           exp: g*exp(x)
log: g/x                   sin: g*cos(x)
```

所有规则都是 VJP；`g` 是 node 的当前 adjoint。

## 一个最小例子

[TEACHING SIMPLIFICATION]  
以下不是 HIPS/autograd verbatim source。下面是已有 Mini demo 的原文；它使用独立标量教学引擎，省略 NumPy、trace 分层与高阶支持。
File: [`mini-autograd/demo.py`](../../../assets/autograd/mini-autograd/demo.py)  
Symbol: main, expression excerpt

```python
    x = Value(2.0, label="x")
    y = Value(5.0, label="y")
    z = log(x) + x * y - sin(y)
    topo = z.backward()
```

结果：`z=11.652071455223`, `dz/dx=5.5`, `dz/dy=1.716337814537`。

输入 x,y 是 Value 对象；每个运算返回新 Value，最后 backward 写入叶子的 grad，并返回 topo 列表供 demo 显示。它返回的并不是 HIPS VJP closure，也不是输入 gradient 数组。

## 对应的 Autograd 源码

| Mini symbol | HIPS/autograd 当前对应 | 重要差异 |
| --- | --- | --- |
| `Value.data` | `Box._value` | HIPS Box 还关联 trace 与 node |
| `Value.parents` | `VJPNode.parents` | HIPS 把 node 与 Box 分开 |
| `Value._backward` | `VJPNode.vjp` | HIPS VJP 返回 ingrads，不直接写 parent.grad |
| DFS topo | `util.py :: toposort` | HIPS 从 end node 依据 child counts yield reverse order |
| `parent.grad += ...` | `backward_pass` + `add_outgrads` | HIPS 支持 VSpace、sparse 与可变优化 |
| `Value.backward(seed)` | `make_vjp` closure + `backward_pass` | HIPS API 将 graph construction/pullback 分离 |

## 调用时序

```text
operator calls -> compute out.data -> attach parents/local closure
z.backward()
  -> DFS builds topological list
  -> zero grads
  -> z.grad=1
  -> reverse(topo)
  -> each local closure accumulates parent grads
  -> leaf grads available
```

## 源码 walkthrough

### Value.__mul__：值、父引用和写梯度的 closure 放在一起

[TEACHING SIMPLIFICATION]  
以下不是 HIPS/autograd verbatim source。下面是现有 Mini 教学实现的原文节选，保留文件中的原缩进。它只支持 scalar happy path。
File: [`mini-autograd/mini_autograd.py`](../../../assets/autograd/mini-autograd/mini_autograd.py)  
Symbol: `Value.__mul__`

```python
    def __mul__(self, other):
        other = _as_value(other)
        out = Value(self.data * other.data, (self, other), "multiply")

        def backward():
            self.grad += other.data * out.grad
            other.grad += self.data * out.grad

        out._backward = backward
        return out
```

进入时 self 是左输入 Value，other 经 `_as_value` 规范化为 Value。`out` 立刻保存数值乘积与两个父引用；内层 `backward` 捕获 self、other、out，此时还没有运行。返回的 out 继续参加用户表达式。稍后调用 `out._backward()` 时，它读取 out.grad 作为 upstream，并直接把贡献写到两个 parent.grad。

若计算 x*x，self 与 other 是同一 Value，两条 `+=` 都必须执行，所以 `3+3=6`。这里函数返回 None，贡献通过副作用写入；HIPS 的局部 VJP 则返回贡献，把写入与合并留给通用引擎。这是关键实现差别。

### Value.backward：先排序，再清零，再倒序执行

[TEACHING SIMPLIFICATION]  
以下不是 HIPS/autograd verbatim source。下面是已有 Mini 实现的完整方法，保留原 DFS、清零与 seed 逻辑；没有为教材修改引擎。
File: [`mini-autograd/mini_autograd.py`](../../../assets/autograd/mini-autograd/mini_autograd.py)  
Symbol: Value.backward

```python
    def backward(self, seed=1.0):
        """Accumulate adjoints in reverse topological order."""
        topo = []
        visited = set()

        def visit(node):
            if node in visited:
                return
            visited.add(node)
            for parent in node.parents:
                visit(parent)
            topo.append(node)

        visit(self)
        for node in topo:
            node.grad = 0.0
        self.grad = float(seed)
        for node in reversed(topo):
            node._backward()
        return topo
```

进入时 self 是 scalar 输出 Value，图已经由运算方法建立。`visited` 按对象避免重复访问，`topo` 先保存 parents 再保存 node，得到 input-before-output 的顺序。清零 loop 重置这张图中每个 Value.grad，seed 写到输出；随后 reversed(topo) 才给出反向访问顺序，每个 closure 直接累加父梯度。返回 topo 用于观察，而梯度结果留在 Value.grad 中。

visited 去重的是节点访问，不是删除重复的输入边。对 x*x，topo=[x,z]，但 z.parents 仍是 `(x,x)`，且局部 closure 保留两条累加语句。这与 HIPS 的重复边计数在数学上相容，实现机制不同。

### HIPS 对照：Node、局部 VJP 与累计表分离

[REAL SOURCE]  
File: [`autograd/core.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)  
Symbol: [`VJPNode`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py#L36-L50)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
class VJPNode(Node):
    __slots__ = ["parents", "vjp"]

    def __init__(self, value, fun, args, kwargs, parent_argnums, parents):
        self.parents = parents
        try:
            vjpmaker = primitive_vjps[fun]
        except KeyError:
            fun_name = getattr(fun, "__name__", fun)
            raise NotImplementedError(f"VJP of {fun_name} wrt argnums {parent_argnums} not defined")
        self.vjp = vjpmaker(parent_argnums, value, args, kwargs)

    def initialize_root(self):
        self.parents = []
        self.vjp = lambda g: ()
```

进入时 primitive 已算好 value，节点只保存 parents 与本次局部 pullback。`value/args` 的必要部分由规则捕获；没有 data 或 grad 字段。root 有单独的初始化路径，局部 vjp 返回空 tuple。下一步由 caller 重新装箱继续 forward，或在未来由 backward_pass 调用 node.vjp。

[REAL SOURCE]  
File: [`autograd/core.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)  
Symbol: [`backward_pass`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py#L26-L33)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
def backward_pass(g, end_node):
    outgrads = {end_node: (g, False)}
    for node in toposort(end_node):
        outgrad = outgrads.pop(node)
        ingrads = node.vjp(outgrad[0])
        for parent, ingrad in zip(node.parents, ingrads):
            outgrads[parent] = add_outgrads(outgrads.get(parent), ingrad)
    return outgrad[0]
```

进入时 graph 与 output seed 是分开的参数。每次调用新建 outgrads，局部 VJP 显式接收 upstream，返回 ingrads；caller 再把它们加给相应 parent。`toposort` 已经提供 output-before-input 的顺序，无需 reversed。最后直接返回 root cotangent，没有要求调用者再去读 root.grad。

### 累加的正路径对照

Mini 的教学简化就是上面两条 `parent.grad += contribution`：没有 sparse、VSpace 或 mutable flag。HIPS 的对应正路径保留下面的原文区段。

[REAL SOURCE]  
File: [`autograd/core.py`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)  
Symbol: [`add_outgrads, non-mutable and first-contribution branches`](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py#L195-L205)  
Commit: [f53a21734fdfae636f448744d9097d8d35a643a0](https://github.com/HIPS/autograd/commit/f53a21734fdfae636f448744d9097d8d35a643a0)

```python
        else:
            if sparse:
                prev_g_mutable = vs.mut_add(None, prev_g)
                return sparse_add(vs, prev_g_mutable, g), True
            else:
                return vs.add(prev_g, g), True
    else:
        if sparse:
            return sparse_add(vspace(g), None, g), True
        else:
            return g, False
```

这是 add_outgrads 的末尾连续原文。x*x 的第一次 dense 贡献走最后一行得到 `(3,False)`；第二次已有非 mutable 累计值，走 `vs.add(prev_g,g)` 得到 `(6,True)`。两次返回都由 backward_pass 写入 outgrads[root]。完整位置是 `autograd/core.py :: add_outgrads`；较早的 mutable 分支和 flag 的意义已在 第五篇 展开。

### 并排比较：哪些概念同构，哪些实现不同

| AD 职责 | Mini 原实现 | HIPS 当前实现 | 判断 |
| --- | --- | --- | --- |
| primal value | Value.data=3/9 | Box._value，必要值被规则捕获 | 数学值相同，存储拆分不同 |
| operation dependencies | out.parents=(self,other) | VJPNode.parents | parent 引用概念同构 |
| local pullback | `_backward()` 读 out.grad，写 parent.grad | `vjp(g)` 返回 ingrads | 局部链式法则同构，函数接口/副作用不同 |
| output seed | `self.grad=float(seed)` | `outgrads[end_node]=(g,False)` | 数学 seed 同构，数据结构不同 |
| node order | DFS append 后 reversed(topo) | child-count toposort 直接 yield reverse order | 遍历目的相同，算法不同 |
| gradient sum | 原地 `parent.grad += ...` | `add_outgrads` + VSpace + tuple flag | 数学求和同构，表示管理不同 |
| duplicate x*x | visited 只去重节点，closure 仍写两次 | parents=(R,R)，zip 迭代两次 | 两条贡献都保留 |
| repeated backward | 先重置同一图的所有 Value.grad | 每次新建 outgrads | 查询状态生命周期不同 |
| constants | `_as_value` 将普通常数也做成 Value parent | 未被本 trace 装箱的参数不进入 parents | 记录边界不同 |
| differentiable backward | float 数据、math 函数与字段累加 | 可微 primitives、nested Box/TraceStack | Mini 没有实现高阶 tracing |
| user result | leaf.grad；backward 返回 topo | VJP closure 返回 input cotangent | 用户接口不同 |

不能据此把 Value 直接改名为 VJPNode：Value 同时承担运行值、节点、梯度存储三种职责，而 HIPS 明确拆开。也不能把 Mini 的 DFS 细节套到 `util.toposort` 上；可迁移的是反向拓扑依赖条件。

### STATE SNAPSHOT：同一个 x*x 在两套引擎中

| 时刻 | Mini | HIPS/autograd |
| --- | --- | --- |
| forward 后 | x.data=3，z.data=9，z.parents=(x,x) | Bx.value=3，Bz.value=9，M.parents=(R,R) |
| 开始反传 | x.grad=0，z.grad=1 | outgrads={M:(1,False)} |
| 第一条贡献 | self.grad += 3，x.grad=3 | None + 3 -> outgrads[R]=(3,False) |
| 第二条贡献 | other 是同一 x，x.grad=6 | 3 + 3 -> outgrads[R]=(6,True) |
| 最后 root | leaf 的空 closure 不再写梯度 | R.vjp(6)=()，返回 outgrad[0]=6 |
| 读结果 | x.grad 为6 | 调用者直接收到6 |

表中的 Bx.value/Bz.value 是数学简记，真实属性名是 `_value`；Mini 的真实数值属性是 data。两边都没有创建完整 Jacobian。

```text
Mini: operation -> Value(data,parents,_backward)
       -> DFS topo -> clear .grad -> output .grad=seed
       -> reversed(topo) -> closures mutate parent.grad -> inspect leaf.grad

HIPS: primitive -> Box(value,trace,VJPNode(parents,vjp))
       -> trace returns end value/node -> VJP closure(seed)
       -> toposort -> node.vjp -> add_outgrads -> return input cotangent
```

该实现为原创教学代码，不复制 HIPS/autograd。它刻意不支持 ndarray broadcasting、nested tracing、容器、复数、sparse cotangent 与 Value exponent。

## 实验验证

[完整教学实现](../../../assets/autograd/mini-autograd/mini_autograd.py) | [demo](../../../assets/autograd/mini-autograd/demo.py) | [四项测试](../../../assets/autograd/mini-autograd/test_mini_autograd.py)。运行环境、资源目录及路径配置见[系列总览](00-overview.md#experiments)。下方命令以解压后的资源目录为工作目录。

`mini-autograd/demo.py` 已运行；`test_mini_autograd.py` 覆盖主表达式、多路径、全部运算和非 unit seed：

```text
4 passed in 0.02s
```

该时间为原验证记录，V2 复跑结果见 [验收记录](../../../assets/autograd/VERIFICATION_V2.txt)。运行命令：

```powershell
python -B mini-autograd/demo.py
python -B -m pytest -q -o addopts= -p no:cov -p no:cacheprovider mini-autograd
```

`test_multiple_paths_accumulate` 保证共享输入不能漏掉第二条贡献；`test_non_unit_seed` 保证规则真正乘了 upstream；其余测试覆盖原主表达式和支持的运算。它们验证的是现有 scalar engine，不代表 Mini 已支持 HIPS 的数组或高阶能力。

## 理论与源码的对应关系

| Reverse AD 步骤 | Mini implementation |
| --- | --- |
| record forward graph | operator-created `Value.parents` |
| output adjoint 1 | `self.grad=seed` |
| reverse topo | `reversed(topo)` |
| upstream × local derivative | each `_backward` closure |
| partial adjoint sum | `parent.grad += contribution` |

## 几个自测问题

1. 为什么 topo list 构建时要先访问 parents，执行 backward 时再反转？
2. 把 `+=` 改成 `=` 会在哪个最小例子上失败？
3. HIPS/autograd 将 Box 与 Node 分开，为 nested tracing 带来了什么空间？

## 小结

Mini 与 HIPS 都通过局部链式法则、反向拓扑顺序和贡献累加完成求导。Mini 的 Value 同时承担值、节点和梯度存储；HIPS 将这些职责拆开，才得以结合 VSpace、NumPy 规则和 nested tracing。

## 继续复盘

可以结合[实现设计复盘](../../../assets/autograd/concepts/implementation-design-review.txt)检查职责边界，再用[源码自测题](../../../assets/autograd/questions/source-oral-exam.txt)独立复述整个过程。题目保留为开放问题，不附答案。

## 参考资料

- [autograd/core.py](https://github.com/HIPS/autograd/blob/f53a21734fdfae636f448744d9097d8d35a643a0/autograd/core.py)，固定 commit 原文件。
- [Automatic Differentiation lecture](https://mlsyscourse.org/slides/04-automatic-differentiation.pdf)。

