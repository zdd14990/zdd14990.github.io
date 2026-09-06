"""Run the main expression from the course with the teaching engine."""

from mini_autograd import Value, log, sin


def main():
    x = Value(2.0, label="x")
    y = Value(5.0, label="y")
    z = log(x) + x * y - sin(y)
    topo = z.backward()

    print(f"z={z.data:.12f}")
    print(f"dz/dx={x.grad:.12f}")
    print(f"dz/dy={y.grad:.12f}")
    print("forward topological operations:")
    print([node.operation for node in topo])


if __name__ == "__main__":
    main()
