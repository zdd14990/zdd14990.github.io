"""Lesson 2: verify JVP and VJP without materializing them internally."""

import autograd.numpy as np
from autograd import jacobian, make_jvp, make_vjp


def f(x):
    return np.array([x[0] * x[1], np.sin(x[0]) + x[1] ** 2])


def main():
    x = np.array([2.0, 3.0])
    tangent = np.array([1.0, -1.0])
    cotangent = np.array([2.0, -0.5])

    explicit_jacobian = np.array([[3.0, 2.0], [np.cos(2.0), 6.0]])

    jvp = make_jvp(f)(x)
    jvp_value, actual_jvp = jvp(tangent)

    vjp, vjp_value = make_vjp(f)(x)
    actual_vjp = vjp(cotangent)

    expected_jvp = np.dot(explicit_jacobian, tangent)
    expected_vjp = np.dot(cotangent, explicit_jacobian)
    actual_jacobian = jacobian(f)(x)

    assert np.allclose(jvp_value, f(x))
    assert np.allclose(vjp_value, f(x))
    assert np.allclose(actual_jvp, expected_jvp)
    assert np.allclose(actual_vjp, expected_vjp)
    assert np.allclose(actual_jacobian, explicit_jacobian)

    print("J =")
    print(actual_jacobian)
    print(f"v={tangent}; Jv={actual_jvp}")
    print(f"w={cotangent}; w^T J={actual_vjp}")
    print(f"make_jvp returned callable: {callable(jvp)}")
    print(f"make_vjp returned callable: {callable(vjp)}")
    print("all checks passed")


if __name__ == "__main__":
    main()
