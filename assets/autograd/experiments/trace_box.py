"""Lesson 4: inspect Box state and dynamic control flow for teaching only."""

import autograd.numpy as np
from autograd import grad
from autograd.tracer import isbox


observations = []


def observe(label, value):
    observations.append(
        {
            "label": label,
            "type": type(value).__name__,
            "isbox": isbox(value),
            "text": str(value),
            "underlying": getattr(value, "_value", None),
            "trace": getattr(value, "_trace", None),
            "node": type(getattr(value, "_node", None)).__name__,
        }
    )


def controlled_function(x):
    observe("input", x)
    y = np.sin(x)
    observe("sin", y)

    if x > 0:
        for index in range(2):
            y = y * x
            observe(f"positive-loop-{index}", y)
    else:
        y = -y
        observe("negative-branch", y)
    return y


def main():
    derivative = grad(controlled_function)(2.0)
    expected = 4.0 * np.sin(2.0) + 4.0 * np.cos(2.0)
    assert np.allclose(derivative, expected)
    assert observations
    assert all(item["isbox"] for item in observations)
    assert [item["label"] for item in observations] == [
        "input",
        "sin",
        "positive-loop-0",
        "positive-loop-1",
    ]

    print("Private fields below are inspected for teaching, not as user API.")
    for item in observations:
        print(item)
    print(f"gradient={derivative:.12f}")
    print(f"expected={expected:.12f}")
    print("executed branch=positive, loop iterations=2")
    print("all checks passed")


if __name__ == "__main__":
    main()
