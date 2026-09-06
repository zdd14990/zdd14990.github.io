"""Lesson 12: compare analytical, Autograd, and central-difference gradients."""

import autograd.numpy as np
from autograd import grad
from autograd.test_util import check_grads


def f(x):
    return np.sin(x) * x**2


def analytical_derivative(x):
    return np.cos(x) * x**2 + 2.0 * x * np.sin(x)


def central_difference(fun, x, eps):
    return (fun(x + eps) - fun(x - eps)) / (2.0 * eps)


def main():
    x = 1.7
    exact = analytical_derivative(x)
    automatic = grad(f)(x)

    print(f"analytical={exact:.16e}")
    print(f"autograd={automatic:.16e}; error={abs(automatic - exact):.3e}")
    for eps in [1e-1, 1e-3, 1e-5, 1e-7, 1e-9]:
        numerical = central_difference(f, x, eps)
        print(f"eps={eps:.0e}; numerical={numerical:.16e}; error={abs(numerical - exact):.3e}")

    assert np.allclose(automatic, exact)
    check_grads(f, modes=["fwd", "rev"], order=2)(x)
    print("Autograd check_grads passed in forward and reverse mode through order 2")
    print("all checks passed")


if __name__ == "__main__":
    main()
