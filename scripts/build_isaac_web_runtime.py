"""Build the browser-side Isaac runtime from a clean generator checkout."""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import tempfile
import zipfile


PYODIDE_VERSION = "314.0.5"
EXPECTED_RESOURCE_FILES = 13
EXPECTED_ICON_FILES = 22


def _run(*args: str, cwd: Path) -> str:
    completed = subprocess.run(
        args,
        cwd=cwd,
        check=True,
        capture_output=True,
        text=True,
    )
    return completed.stdout.strip()


def _sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def build_runtime(source: Path, output_dir: Path) -> dict[str, object]:
    source = source.resolve()
    output_dir = output_dir.resolve()
    python = source / ".venv" / "Scripts" / "python.exe"
    if not python.is_file():
        raise FileNotFoundError(f"generator virtualenv not found: {python}")
    if not (source / "pyproject.toml").is_file():
        raise FileNotFoundError(f"generator pyproject not found: {source}")

    status = _run("git", "status", "--porcelain", cwd=source)
    if status:
        raise RuntimeError("generator checkout must be clean before building the web runtime")
    commit = _run("git", "rev-parse", "HEAD", cwd=source)
    source_build = source / "build"
    build_existed = source_build.exists()

    with tempfile.TemporaryDirectory(prefix="isaac-web-runtime-") as temporary:
        wheel_dir = Path(temporary) / "wheel"
        wheel_dir.mkdir()
        try:
            subprocess.run(
                [
                    str(python),
                    "-m",
                    "pip",
                    "wheel",
                    str(source),
                    "--no-deps",
                    "--no-build-isolation",
                    "--wheel-dir",
                    str(wheel_dir),
                ],
                cwd=source,
                check=True,
            )
        finally:
            if not build_existed and source_build.is_dir():
                shutil.rmtree(source_build)

        wheels = list(wheel_dir.glob("*.whl"))
        if len(wheels) != 1:
            raise RuntimeError(f"expected one wheel, found {len(wheels)}")
        built_wheel = wheels[0]

        with zipfile.ZipFile(built_wheel) as archive:
            names = set(archive.namelist())
        resource_files = [
            name
            for name in names
            if name.startswith("isaacmap/data/resources/")
            and not name.endswith("/")
        ]
        icon_files = [
            name
            for name in names
            if name.startswith("isaacmap/data/icons/") and name.endswith(".png")
        ]
        if len(resource_files) != EXPECTED_RESOURCE_FILES:
            raise RuntimeError(
                f"expected {EXPECTED_RESOURCE_FILES} resources, found {len(resource_files)}"
            )
        if len(icon_files) != EXPECTED_ICON_FILES:
            raise RuntimeError(
                f"expected {EXPECTED_ICON_FILES} icons, found {len(icon_files)}"
            )

        output_dir.mkdir(parents=True, exist_ok=True)
        wheel_name = f"isaacmap-runtime-{commit[:8]}.whl"
        destination = output_dir / wheel_name
        shutil.copy2(built_wheel, destination)

    source_icons = source / "src" / "isaacmap" / "data" / "icons"
    icon_destination = output_dir / "isaac-icons"
    icon_destination.mkdir(parents=True, exist_ok=True)
    expected_icon_names = {path.name for path in source_icons.glob("*.png")}
    if len(expected_icon_names) != EXPECTED_ICON_FILES:
        raise RuntimeError(
            f"expected {EXPECTED_ICON_FILES} source icons, found {len(expected_icon_names)}"
        )
    for existing in icon_destination.glob("*.png"):
        if existing.name not in expected_icon_names:
            existing.unlink()
    for icon in source_icons.glob("*.png"):
        shutil.copy2(icon, icon_destination / icon.name)

    manifest = {
        "schema_version": 1,
        "source_project": "isaac-offline-map-generator",
        "source_commit": commit,
        "pyodide_version": PYODIDE_VERSION,
        "wheel": wheel_name,
        "wheel_bytes": destination.stat().st_size,
        "wheel_sha256": _sha256(destination),
        "resource_files": len(resource_files),
        "icon_files": len(icon_files),
    }
    (output_dir / "isaac-runtime.json").write_text(
        json.dumps(manifest, indent=2) + "\n",
        encoding="utf-8",
    )
    return manifest


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path, help="clean generator checkout")
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path(__file__).resolve().parents[1] / "docs" / "assets",
    )
    args = parser.parse_args()
    manifest = build_runtime(args.source, args.output_dir)
    print(json.dumps(manifest, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
