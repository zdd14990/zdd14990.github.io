Blog Edition 文本附件：保留技术内容，仅适配路径/链接与运行命令。

# Mini Autograd

这是一个独立编写的 scalar reverse-mode 教学实现，不复制 HIPS/autograd 源码。它支持 `+`、`-`、`*`、`/`、常数指数 `**`、`exp`、`log`、`sin`。

## 核心映射

| Mini Autograd | HIPS/autograd 当前实现 |
| --- | --- |
| `Value.data` | forward value；HIPS 中运行值由 `Box._value` 携带 |
| `Value.parents` | `VJPNode.parents` |
| `Value._backward` | `VJPNode.vjp` 局部 closure |
| `Value.backward()` 的 DFS topo | `util.py :: toposort` |
| `parent.grad += contribution` | `core.py :: backward_pass` + `add_outgrads` |
| `Value` 同时保存值和 node 信息 | HIPS 将运行时 `Box` 与 `VJPNode` 分开 |

## 运行

```powershell
python mini-autograd/demo.py
python -m pytest -q -o addopts='' -p no:cacheprovider mini-autograd
```

这个版本故意只做 scalar happy path，不处理 ndarray、broadcasting、复杂容器、nested tracing、稀疏 cotangent 或可变 exponent。
