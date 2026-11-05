"""Lesson 5: observe the two gradient contributions in f(x)=x*x."""

import autograd.core as core
from autograd import grad


def f(x):
    return x * x


def main():
    events = []
    original_add_outgrads = core.add_outgrads

    def logging_add_outgrads(previous, contribution):
        result = original_add_outgrads(previous, contribution)
        events.append((previous, contribution, result))
        return result

    core.add_outgrads = logging_add_outgrads
    try:
        result = grad(f)(3.0)
    finally:
        core.add_outgrads = original_add_outgrads

    contributions = [event[1] for event in events]
    assert result == 6.0
    assert contributions == [3.0, 3.0]
    assert events[-1][2][0] == 6.0

    for index, (previous, contribution, accumulated) in enumerate(events, start=1):
        print(
            f"add_outgrads call {index}: previous={previous}, "
            f"contribution={contribution}, accumulated={accumulated}"
        )
    print(f"gradient contributions: {contributions[0]} + {contributions[1]} = {result}")
    print("all checks passed")


if __name__ == "__main__":
    main()
