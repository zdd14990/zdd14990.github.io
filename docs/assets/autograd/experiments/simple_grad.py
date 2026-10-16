"""Lesson 3: record the operation graph for f(x)=x*x, then run grad."""

import autograd.numpy as np
from autograd import grad, make_vjp
from autograd.tracer import Node, trace
from autograd.util import toposort


class RecordingNode(Node):
    next_id = 0

    def initialize_root(self, value):
        self.name = "x"
        self.value = value
        self.fun_name = "root"
        self.parent_argnums = ()
        self.parents = ()

    def __init__(self, value, fun, args, kwargs, parent_argnums, parents):
        type(self).next_id += 1
        self.name = f"v{type(self).next_id}"
        self.value = value
        self.fun_name = fun.__name__
        self.parent_argnums = parent_argnums
        self.parents = parents


def f(x):
    return x * x


def main():
    x = 3.0

    root = RecordingNode.new_root(x)
    end_value, end_node = trace(root, f, x)
    reverse_nodes = list(toposort(end_node))

    vjp, forward_value = make_vjp(f)(x)
    result = vjp(1.0)
    grad_result = grad(f)(x)

    assert end_value == 9.0
    assert forward_value == 9.0
    assert result == 6.0
    assert grad_result == 6.0
    assert end_node.fun_name == "multiply"
    assert end_node.parents == (root, root)

    print(f"trace root: name={root.name}, value={root.value}")
    print(
        "operation: "
        f"name={end_node.name}, primitive={end_node.fun_name}, value={end_node.value}, "
        f"parent_argnums={end_node.parent_argnums}, parents={[p.name for p in end_node.parents]}"
    )
    print(f"reverse topo order: {[node.name for node in reverse_nodes]}")
    print(f"make_vjp forward value: {forward_value}")
    print(f"vjp(1.0): {result}")
    print(f"grad(f)(3.0): {grad_result}")
    print("all checks passed")


if __name__ == "__main__":
    main()
