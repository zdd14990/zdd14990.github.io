"""Lesson 7: verify that broadcasted gradients are reduced to input shapes."""

import autograd.numpy as np
from autograd import grad, make_vjp


def main():
    x = np.array([1.0, 2.0, 3.0])
    scalar_bias = 2.0

    vector_vjp, vector_value = make_vjp(lambda b: x + b)(scalar_bias)
    scalar_from_vector = vector_vjp(np.ones_like(vector_value))
    scalar_from_loss = grad(lambda b: np.sum(x + b))(scalar_bias)

    matrix = np.arange(6.0).reshape(2, 3)
    vector_bias = np.array([10.0, 20.0, 30.0])
    vector_gradient = grad(lambda b: np.sum(matrix + b))(vector_bias)

    assert np.shape(vector_value) == (3,)
    assert np.shape(scalar_from_vector) == ()
    assert scalar_from_vector == 3.0
    assert scalar_from_loss == 3.0
    assert np.shape(vector_gradient) == (3,)
    assert np.allclose(vector_gradient, np.array([2.0, 2.0, 2.0]))

    print(f"scalar -> vector forward shape: {np.shape(scalar_bias)} -> {np.shape(vector_value)}")
    print(f"vector cotangent -> scalar VJP: {scalar_from_vector}, shape={np.shape(scalar_from_vector)}")
    print(f"matrix + vector shapes: {matrix.shape} + {vector_bias.shape}")
    print(f"gradient wrt vector bias: {vector_gradient}, shape={vector_gradient.shape}")
    print("all checks passed")


if __name__ == "__main__":
    main()
