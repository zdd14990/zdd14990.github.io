"""Lesson 6: exercise basic wrapped NumPy primitives and their VJPs."""

import autograd.numpy as np
from autograd import grad


def f(x):
    terms = np.sin(x) + np.exp(x) * np.log(x) - x / 2.0
    return np.sum(terms)


def analytical_gradient(x):
    return np.cos(x) + np.exp(x) * np.log(x) + np.exp(x) / x - 0.5


def main():
    x = np.array([0.5, 1.5, 2.0])
    actual = grad(f)(x)
    expected = analytical_gradient(x)

    assert np.allclose(actual, expected)
    print(f"input={x}")
    print(f"value={f(x):.12f}")
    print(f"autograd gradient={actual}")
    print(f"analytical gradient={expected}")
    print("primitives: sin, exp, log, multiply, add, divide, subtract, sum")
    print("all checks passed")


if __name__ == "__main__":
    main()
