"""Lesson 8: build a full Jacobian from basis-direction JVP calls."""

import autograd.numpy as np
from autograd import jacobian, make_jvp


def f(x):
    return np.array([x[0] + x[1], x[0] * x[1], np.sin(x[0])])


def main():
    x = np.array([2.0, 3.0])
    basis = np.eye(2)
    jvp = make_jvp(f)(x)

    columns = []
    for direction in basis:
        value, tangent = jvp(direction)
        columns.append(tangent)
        print(f"direction={direction} -> tangent={tangent}")

    from_jvps = np.stack(columns, axis=1)
    explicit = jacobian(f)(x)

    assert np.allclose(value, f(x))
    assert np.allclose(from_jvps, explicit)
    print("Jacobian assembled from two input-basis JVPs:")
    print(from_jvps)
    print("all checks passed")


if __name__ == "__main__":
    main()
