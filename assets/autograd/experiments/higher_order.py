"""Lesson 10: verify nested tracing for first through third derivatives."""

from autograd import grad
from autograd.tracer import isbox


observed_box_layers = []


def describe_box_layers(value):
    layers = []
    current = value
    while isbox(current):
        layers.append((type(current).__name__, current._trace))
        current = current._value
    return layers


def f(x):
    observed_box_layers.append(describe_box_layers(x))
    return x**3


def main():
    first = grad(f)(2.0)
    second = grad(grad(f))(2.0)
    third = grad(grad(grad(f)))(2.0)

    assert first == 12.0
    assert second == 12.0
    assert third == 6.0
    assert observed_box_layers[0] == [("ArrayBox", 0)]
    assert observed_box_layers[1] == [("ArrayBox", 1), ("ArrayBox", 0)]
    assert observed_box_layers[2] == [("ArrayBox", 2), ("ArrayBox", 1), ("ArrayBox", 0)]

    print(f"f'(2)={first}")
    print(f"f''(2)={second}")
    print(f"f'''(2)={third}")
    for order, layers in enumerate(observed_box_layers, start=1):
        print(f"order {order} input box layers={layers}")
    print("all checks passed")


if __name__ == "__main__":
    main()
