"""A small scalar reverse-mode AD engine written for teaching.

This is an independent implementation. It does not copy HIPS/autograd code.
"""

import math


def _as_value(value):
    return value if isinstance(value, Value) else Value(value)


class Value:
    """A scalar value plus the local reverse rule that produced it."""

    def __init__(self, data, parents=(), operation="leaf", label=None):
        self.data = float(data)
        self.grad = 0.0
        self.parents = tuple(parents)
        self.operation = operation
        self.label = label
        self._backward = lambda: None

    def __repr__(self):
        name = f", label={self.label!r}" if self.label else ""
        return f"Value(data={self.data}, grad={self.grad}, op={self.operation!r}{name})"

    def __add__(self, other):
        other = _as_value(other)
        out = Value(self.data + other.data, (self, other), "add")

        def backward():
            self.grad += out.grad
            other.grad += out.grad

        out._backward = backward
        return out

    def __radd__(self, other):
        return self + other

    def __neg__(self):
        out = Value(-self.data, (self,), "negative")

        def backward():
            self.grad -= out.grad

        out._backward = backward
        return out

    def __sub__(self, other):
        return self + (-_as_value(other))

    def __rsub__(self, other):
        return _as_value(other) - self

    def __mul__(self, other):
        other = _as_value(other)
        out = Value(self.data * other.data, (self, other), "multiply")

        def backward():
            self.grad += other.data * out.grad
            other.grad += self.data * out.grad

        out._backward = backward
        return out

    def __rmul__(self, other):
        return self * other

    def __truediv__(self, other):
        other = _as_value(other)
        out = Value(self.data / other.data, (self, other), "divide")

        def backward():
            self.grad += out.grad / other.data
            other.grad -= out.grad * self.data / (other.data**2)

        out._backward = backward
        return out

    def __rtruediv__(self, other):
        return _as_value(other) / self

    def __pow__(self, exponent):
        if isinstance(exponent, Value):
            raise TypeError("This teaching engine supports only constant exponents")
        out = Value(self.data**exponent, (self,), f"power({exponent})")

        def backward():
            self.grad += out.grad * exponent * self.data ** (exponent - 1)

        out._backward = backward
        return out

    def exp(self):
        out = Value(math.exp(self.data), (self,), "exp")

        def backward():
            self.grad += out.grad * out.data

        out._backward = backward
        return out

    def log(self):
        out = Value(math.log(self.data), (self,), "log")

        def backward():
            self.grad += out.grad / self.data

        out._backward = backward
        return out

    def sin(self):
        out = Value(math.sin(self.data), (self,), "sin")

        def backward():
            self.grad += out.grad * math.cos(self.data)

        out._backward = backward
        return out

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


def exp(value):
    return _as_value(value).exp()


def log(value):
    return _as_value(value).log()


def sin(value):
    return _as_value(value).sin()
