"""Lesson 1: compare symbolic, automatic, and numerical differentiation."""

from pathlib import Path

import autograd
import autograd.numpy as np
from autograd import grad


def f(x1, x2):
    return np.log(x1) + x1 * x2 - np.sin(x2)


def central_difference(fun, argnum, x1, x2, h=1e-6):
    args_plus = [x1, x2]
    args_minus = [x1, x2]
    args_plus[argnum] += h
    args_minus[argnum] -= h
    return (fun(*args_plus) - fun(*args_minus)) / (2.0 * h)


def main():
    x1 = 2.0
    x2 = 3.0

    v1 = np.log(x1)
    v2 = x1 * x2
    v3 = np.sin(x2)
    v4 = v1 + v2
    y = v4 - v3

    symbolic = (1.0 / x1 + x2, x1 - np.cos(x2))
    automatic = (grad(f, 0)(x1, x2), grad(f, 1)(x1, x2))
    numerical = (
        central_difference(f, 0, x1, x2),
        central_difference(f, 1, x1, x2),
    )

    source_root = Path(r"C:\myproject\autograd").resolve()
    imported_from = Path(autograd.__file__).resolve()
    assert source_root in imported_from.parents, imported_from
    assert np.allclose(automatic, symbolic, rtol=1e-12, atol=1e-12)
    assert np.allclose(numerical, symbolic, rtol=1e-7, atol=1e-7)

    print(f"autograd imported from: {imported_from}")
    print(f"forward: v1={v1:.12f}, v2={v2:.12f}, v3={v3:.12f}, v4={v4:.12f}")
    print(f"y={y:.12f}")
    print(f"symbolic=({symbolic[0]:.12f}, {symbolic[1]:.12f})")
    print(f"autograd=({automatic[0]:.12f}, {automatic[1]:.12f})")
    print(f"numerical=({numerical[0]:.12f}, {numerical[1]:.12f})")
    print("all checks passed")


if __name__ == "__main__":
    main()
