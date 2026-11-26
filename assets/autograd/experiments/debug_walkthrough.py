"""Automated debugger-level call trace for grad(sin(x) * x) at x=2."""

import sys
from pathlib import Path

import autograd.numpy as np
from autograd import grad


SOURCE_ROOT = Path(r"C:\myproject\autograd\autograd")
events = []


def short(value):
    text = repr(value)
    return text if len(text) <= 90 else text[:87] + "..."


def debugger(frame, event, arg):
    path = Path(frame.f_code.co_filename)
    try:
        relative = path.relative_to(SOURCE_ROOT)
    except ValueError:
        return debugger

    name = frame.f_code.co_name
    label = None
    details = ""

    if relative.name == "differential_operators.py" and name == "grad":
        label = "grad"
    elif relative.name == "core.py" and name in {"make_vjp", "backward_pass", "add_outgrads"}:
        label = name
    elif relative.name == "core.py" and name == "__init__" and "fun" in frame.f_locals:
        label = "VJPNode.__init__"
        details = f" primitive={getattr(frame.f_locals.get('fun'), '__name__', '?')}"
    elif relative.name == "tracer.py" and name in {"trace", "new_box"}:
        label = name
    elif relative.name == "tracer.py" and name == "f_wrapped":
        raw = frame.f_locals.get("f_raw")
        raw_name = getattr(raw, "__name__", "?")
        if raw_name in {"sin", "multiply"}:
            label = "primitive wrapper"
            details = f" primitive={raw_name}"

    if label and event in {"call", "return"}:
        payload = ""
        if event == "return":
            payload = f" return={short(arg)}"
        events.append(f"{event:6} {relative}:{frame.f_lineno} {label}{details}{payload}")
    return debugger


def f(x):
    return np.sin(x) * x


def main():
    sys.settrace(debugger)
    try:
        result = grad(f)(2.0)
    finally:
        sys.settrace(None)

    expected = np.sin(2.0) + 2.0 * np.cos(2.0)
    assert np.allclose(result, expected)
    assert any("make_vjp" in event for event in events)
    assert any("VJPNode.__init__" in event for event in events)
    assert any("backward_pass" in event for event in events)

    print("Automated call/return trace at source-level debugger boundaries:")
    for item in events:
        print(item)
    print(f"gradient={result:.12f}; expected={expected:.12f}")
    print("all checks passed")


if __name__ == "__main__":
    main()
