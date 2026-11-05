import math

from mini_autograd import Value, exp, log, sin


def close(actual, expected):
    assert math.isclose(actual, expected, rel_tol=1e-12, abs_tol=1e-12)


def test_course_expression():
    x = Value(2.0)
    y = Value(5.0)
    z = log(x) + x * y - sin(y)
    z.backward()

    close(z.data, math.log(2.0) + 10.0 - math.sin(5.0))
    close(x.grad, 0.5 + 5.0)
    close(y.grad, 2.0 - math.cos(5.0))


def test_multiple_paths_accumulate():
    x = Value(3.0)
    z = x * x
    z.backward()
    close(x.grad, 6.0)


def test_supported_operations():
    x = Value(2.0)
    y = Value(4.0)
    z = exp(x) + log(y) + sin(x) + (y - x) / x + x**3
    z.backward()

    expected_dx = math.exp(2.0) + math.cos(2.0) - 4.0 / (2.0**2) + 3.0 * 2.0**2
    expected_dy = 1.0 / 4.0 + 1.0 / 2.0
    close(x.grad, expected_dx)
    close(y.grad, expected_dy)


def test_non_unit_seed():
    x = Value(3.0)
    y = x * x
    y.backward(seed=0.5)
    close(x.grad, 3.0)
