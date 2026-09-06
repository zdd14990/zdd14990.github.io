"""Lesson 13: observe failure before VJP registration and success after it."""

from autograd import grad
from autograd.extend import defvjp, primitive
from autograd.test_util import check_grads


@primitive
def square(x):
    return x * x


def main():
    failure = None
    try:
        grad(square)(3.0)
    except NotImplementedError as error:
        failure = str(error)

    assert failure is not None
    print(f"before defvjp: {failure}")

    defvjp(square, lambda ans, x: lambda g: g * 2.0 * x)
    derivative = grad(square)(3.0)
    assert derivative == 6.0
    check_grads(square, modes=["rev"], order=2)(3.0)

    print(f"after defvjp: grad(square)(3.0)={derivative}")
    print("reverse-mode gradient check through order 2 passed")
    print("all checks passed")


if __name__ == "__main__":
    main()
