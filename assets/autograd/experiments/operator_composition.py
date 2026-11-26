"""Lesson 11: verify advanced operators are compositions of core AD tools."""

import autograd.numpy as np
from autograd import elementwise_grad, grad, hessian, jacobian, make_hvp, value_and_grad


def vector_function(x):
    return np.array([x[0] * x[1], np.sin(x[0])])


def loss(x):
    return np.sum(x**3)


def main():
    x = np.array([1.0, 2.0])
    direction = np.array([2.0, -1.0])

    jac = jacobian(vector_function)(x)
    gradient = grad(loss)(x)
    hess = hessian(loss)(x)
    value, combined_gradient = value_and_grad(loss)(x)
    diagonal = elementwise_grad(np.sin)(x)
    hvp, gradient_at_x = make_hvp(loss)(x)
    hessian_vector = hvp(direction)

    expected_jac = np.array([[2.0, 1.0], [np.cos(1.0), 0.0]])
    expected_gradient = np.array([3.0, 12.0])
    expected_hessian = np.diag(np.array([6.0, 12.0]))

    assert np.allclose(jac, expected_jac)
    assert np.allclose(gradient, expected_gradient)
    assert np.allclose(hess, expected_hessian)
    assert value == 9.0
    assert np.allclose(combined_gradient, expected_gradient)
    assert np.allclose(diagonal, np.cos(x))
    assert np.allclose(gradient_at_x, expected_gradient)
    assert np.allclose(hessian_vector, np.dot(expected_hessian, direction))

    print(f"jacobian=\n{jac}")
    print(f"gradient={gradient}")
    print(f"hessian=\n{hess}")
    print(f"value_and_grad=({value}, {combined_gradient})")
    print(f"elementwise_grad(sin)={diagonal}")
    print(f"H @ {direction} = {hessian_vector}")
    print("all checks passed")


if __name__ == "__main__":
    main()
