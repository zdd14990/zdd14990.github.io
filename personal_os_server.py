#!/usr/bin/env python3
"""Loopback-only development server for the private Personal OS library."""

from __future__ import annotations

import argparse
import json
import mimetypes
import os
import re
import subprocess
import sys
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import quote, unquote, urlparse


PROJECT_ROOT = Path(__file__).resolve().parent
DATA_ROOT = PROJECT_ROOT / "data" / "personal-os"
DEFAULT_SITE_ROOT = PROJECT_ROOT / ".cache" / "personal-os-site"


class PersonalOSData:
    def __init__(self, root: Path):
        self.root = root
        self.summary = self._load("import-summary.json")
        self.catalog = self._load("catalog.json")
        self.search_index = self._load("private-search-index.json")
        self.files = {}
        manifest = root / "import-manifest.jsonl"
        with manifest.open(encoding="utf-8") as handle:
            for line in handle:
                row = json.loads(line)
                self.files[row["id"]] = row
        entities = self.catalog["entities"]
        self.documents = {item["id"]: item for item in entities["documents"]}
        self.versions = {item["id"]: item for item in entities["documentVersions"]}
        self.representations = {item["id"]: item for item in entities["representations"]}
        self.courses = {item["id"]: item for item in entities["courses"]}

    def _load(self, name: str):
        return json.loads((self.root / name).read_text(encoding="utf-8"))

    def document_payload(self, document_id: str):
        document = self.documents.get(document_id)
        if not document:
            return None
        representations = [self.representations[item_id] for item_id in document["representationIds"]]
        versions = [self.versions[item_id] for item_id in document["versionIds"]]
        return {
            "document": document,
            "course": self.courses.get(document["courseId"]),
            "versions": versions,
            "representations": representations,
        }


class PersonalOSHandler(SimpleHTTPRequestHandler):
    server_version = "zddOS-local/1"

    def __init__(self, *args, directory=None, **kwargs):
        super().__init__(*args, directory=str(directory), **kwargs)

    @property
    def data(self) -> PersonalOSData:
        return self.server.personal_os_data  # type: ignore[attr-defined]

    def end_headers(self):
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "no-referrer")
        self.send_header("X-Personal-OS-Mode", "loopback-only")
        if not self.path.startswith("/__personal_os/api/"):
            # This is a development server: stale shell assets are more harmful
            # than the small cost of revalidation.
            self.send_header("Cache-Control", "no-cache, must-revalidate")
        super().end_headers()

    def _valid_host(self) -> bool:
        host = (self.headers.get("Host") or "").split(":", 1)[0].strip("[]").lower()
        return host in {"127.0.0.1", "localhost", "::1"}

    def _json(self, payload, status=HTTPStatus.OK):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store, private")
        self.end_headers()
        self.wfile.write(body)

    def _error_json(self, status, message):
        self._json({"error": message, "status": int(status)}, status)

    def do_GET(self):
        if not self._valid_host():
            self._error_json(HTTPStatus.FORBIDDEN, "Loopback Host header required")
            return
        parsed = urlparse(self.path)
        if parsed.path.startswith("/__personal_os/api/"):
            self._serve_api(parsed.path)
            return
        super().do_GET()

    def _serve_api(self, path: str):
        route = unquote(path[len("/__personal_os/api/"):]).strip("/")
        if route == "status":
            self._json({
                "mode": "local-development",
                "scope": "private",
                "authenticated": False,
                "loopbackOnly": True,
                "summary": self.data.summary,
            })
        elif route == "summary":
            self._json(self.data.summary)
        elif route == "catalog":
            self._json(self.data.catalog)
        elif route == "search-index":
            self._json(self.data.search_index)
        elif route.startswith("document/"):
            document_id = route.split("/", 1)[1]
            payload = self.data.document_payload(document_id)
            self._json(payload) if payload else self._error_json(HTTPStatus.NOT_FOUND, "Document not found")
        elif route.startswith("file/"):
            self._serve_file(route.split("/", 1)[1], inline=True)
        elif route.startswith("download/"):
            self._serve_file(route.split("/", 1)[1], inline=False)
        elif route.startswith("text/"):
            self._serve_text(route.split("/", 1)[1])
        else:
            self._error_json(HTTPStatus.NOT_FOUND, "API route not found")

    def _file_row(self, file_id: str):
        row = self.data.files.get(file_id)
        if not row or row.get("importPolicy") != "include":
            return None
        source = Path(row["path"]).resolve()
        source_root = Path(self.data.summary["sourceRoot"]).resolve()
        try:
            source.relative_to(source_root)
        except ValueError:
            return None
        return row, source

    def _serve_text(self, file_id: str):
        resolved = self._file_row(file_id)
        if not resolved:
            self._error_json(HTTPStatus.NOT_FOUND, "File not found")
            return
        row, source = resolved
        if row["extension"] not in {".md", ".tex", ".txt"}:
            self._error_json(HTTPStatus.UNSUPPORTED_MEDIA_TYPE, "Text preview is unavailable")
            return
        text = source.read_text(encoding="utf-8", errors="replace")
        self._json({"fileBlobId": file_id, "filename": row["filename"], "format": row["extension"], "text": text})

    def _serve_file(self, file_id: str, inline: bool):
        resolved = self._file_row(file_id)
        if not resolved:
            self._error_json(HTTPStatus.NOT_FOUND, "File not found")
            return
        row, source = resolved
        size = source.stat().st_size
        start, end = 0, size - 1
        partial = False
        range_header = self.headers.get("Range", "")
        match = re.match(r"bytes=(\d*)-(\d*)$", range_header)
        if match:
            partial = True
            if not match.group(1) and match.group(2):
                suffix = int(match.group(2))
                start = max(0, size - suffix)
            elif match.group(1):
                start = int(match.group(1))
            if match.group(1) and match.group(2):
                end = min(int(match.group(2)), size - 1)
            if start > end or start >= size:
                self.send_response(HTTPStatus.REQUESTED_RANGE_NOT_SATISFIABLE)
                self.send_header("Content-Range", f"bytes */{size}")
                self.end_headers()
                return
        length = end - start + 1
        self.send_response(HTTPStatus.PARTIAL_CONTENT if partial else HTTPStatus.OK)
        self.send_header("Content-Type", row["mimeType"] or mimetypes.guess_type(source.name)[0] or "application/octet-stream")
        disposition = "inline" if inline else "attachment"
        safe_name = re.sub(r"[^A-Za-z0-9._-]+", "_", row["filename"]) or "document"
        encoded_name = quote(row["filename"], safe="")
        self.send_header("Content-Disposition", f'{disposition}; filename="{safe_name}"; filename*=UTF-8\'\'{encoded_name}')
        self.send_header("Accept-Ranges", "bytes")
        self.send_header("Content-Length", str(length))
        self.send_header("Cache-Control", "no-store, private")
        if partial:
            self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
        self.end_headers()
        with source.open("rb") as handle:
            handle.seek(start)
            remaining = length
            while remaining:
                chunk = handle.read(min(1024 * 1024, remaining))
                if not chunk:
                    break
                self.wfile.write(chunk)
                remaining -= len(chunk)


def ensure_site(site_root: Path, rebuild: bool) -> None:
    index = site_root / "os" / "index.html"
    if index.exists() and not rebuild:
        return
    environment = os.environ.copy()
    environment["ZDD_SKIP_PIXIV"] = "1"
    environment["PYTHONDONTWRITEBYTECODE"] = "1"
    command = [sys.executable, "-m", "mkdocs", "build", "--clean", "--site-dir", str(site_root)]
    subprocess.run(command, cwd=PROJECT_ROOT, env=environment, check=True)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Serve zddOS on loopback only")
    parser.add_argument("--host", default="127.0.0.1", choices=["127.0.0.1", "localhost", "::1"])
    parser.add_argument("--port", type=int, default=8765)
    parser.add_argument("--site-dir", type=Path, default=DEFAULT_SITE_ROOT)
    parser.add_argument("--data-dir", type=Path, default=DATA_ROOT)
    parser.add_argument("--rebuild", action="store_true", help="Force a fresh MkDocs shell build (the default already refreshes it)")
    parser.add_argument("--reuse-site", action="store_true", help="Reuse an existing site directory without rebuilding the UI shell")
    return parser


def should_rebuild_site(args: argparse.Namespace) -> bool:
    return bool(args.rebuild or not args.reuse_site)


def main() -> int:
    args = build_parser().parse_args()
    required = ["import-summary.json", "import-manifest.jsonl", "catalog.json", "review-queue.json", "private-search-index.json"]
    missing = [name for name in required if not (args.data_dir / name).is_file()]
    if missing:
        raise SystemExit(f"Missing local data ({', '.join(missing)}). Run scripts/build_personal_os_data.py first.")
    # Refresh the cheap public UI shell by default. This never invokes the
    # expensive private course-material extraction pipeline.
    ensure_site(args.site_dir.resolve(), should_rebuild_site(args))
    data = PersonalOSData(args.data_dir.resolve())

    def handler(*handler_args, **handler_kwargs):
        return PersonalOSHandler(*handler_args, directory=args.site_dir.resolve(), **handler_kwargs)

    server = ThreadingHTTPServer((args.host, args.port), handler)
    server.personal_os_data = data  # type: ignore[attr-defined]
    print(f"zddOS local-only server: http://{args.host}:{args.port}/os/")
    print("Private API is bound to loopback and is not production authentication.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
