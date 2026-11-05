"""Lesson 9: count f evaluations for a full gradient of R^3 -> R."""

import autograd.numpy as np
from autograd import grad, make_jvp, make_vjp


def main():
    calls = {"count": 0}

    def loss(x):
        calls["count"] += 1
        return x[0] * x[1] + x[0] ** 2 + np.sin(x[2])

    x = np.array([1.0, 2.0, 0.5])

    jvp = make_jvp(loss)(x)
    forward_components = []
    for basis_direction in np.eye(3):
        _, component = jvp(basis_direction)
        forward_components.append(component)
    forward_evaluations = calls["count"]

    calls["count"] = 0
    vjp, value = make_vjp(loss)(x)
    reverse_gradient = vjp(1.0)
    reverse_evaluations = calls["count"]

    expected = np.array([x[1] + 2.0 * x[0], x[0], np.cos(x[2])])
    assert np.allclose(np.array(forward_components), expected)
    assert np.allclose(reverse_gradient, expected)
    assert forward_evaluations == 3
    assert reverse_evaluations == 1

    non_scalar_error = None
    try:
        grad(lambda values: values**2)(x)
    except TypeError as error:
        non_scalar_error = str(error)
    assert non_scalar_error is not None

    print(f"loss={value:.12f}")
    print(f"forward-mode full gradient={forward_components}; f evaluations={forward_evaluations}")
    print(f"reverse-mode full gradient={reverse_gradient}; f evaluations={reverse_evaluations}")
    print(f"grad on non-scalar output: {non_scalar_error}")
    print("all checks passed")


if __name__ == "__main__":
    main()
