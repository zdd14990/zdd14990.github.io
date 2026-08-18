"""Explicitly refresh and safely publish the cached Pixiv rankings."""

import argparse
import json
import os
import re
import ssl
import urllib.request
from pathlib import Path


PIXIV_ID_RE = re.compile(r"^[1-9]\d{0,19}$")
RANKINGS = (
    ("pixiv-ranking.json", "daily", False),
    ("pixiv-r18-ranking.json", "daily_r18", True),
)


def normalize_item(item):
    if not isinstance(item, dict):
        return None
    illust_id = item.get("id", item.get("illust_id"))
    if isinstance(illust_id, bool) or not PIXIV_ID_RE.fullmatch(str(illust_id or "")):
        return None
    title = item.get("title", "")
    if not isinstance(title, str):
        return None
    numeric_id = int(illust_id)
    return {
        "id": numeric_id,
        "title": title,
        "url": f"https://www.pixiv.net/artworks/{numeric_id}",
    }


def validate_ranking(data):
    if not isinstance(data, list):
        return []
    return [normalized for item in data if (normalized := normalize_item(item)) is not None]


def load_cache(path):
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        print(f"[pixiv:cache] Missing {path}; continuing without this ranking")
        return []
    except (OSError, json.JSONDecodeError) as exc:
        print(f"[pixiv:cache] Invalid {path}: {exc}; continuing without this ranking")
        return []

    validated = validate_ranking(data)
    if not isinstance(data, list) or len(validated) != len(data):
        print(f"[pixiv:cache] Ignored invalid entries in {path}")
    return validated


def write_cache(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
    temporary.replace(path)


def publish_cached_rankings(site_dir, cache_dir=Path("docs") / "assets"):
    for file_name, mode, _requires_session in RANKINGS:
        data = load_cache(Path(cache_dir) / file_name)
        if not data:
            print(f"[pixiv:{mode}] No valid cache available; skipping")
            continue
        output_path = Path(site_dir) / "assets" / file_name
        write_cache(output_path, data)
        print(f"[pixiv:{mode}] Published {len(data)} cached entries")


def fetch_ranking(mode, session="", timeout=15):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "https://www.pixiv.net/",
        "Accept": "application/json",
        "Accept-Language": "zh-CN,zh;q=0.9",
    }
    if session:
        headers["Cookie"] = f"PHPSESSID={session}"
    request = urllib.request.Request(
        f"https://www.pixiv.net/ranking.php?format=json&mode={mode}",
        headers=headers,
    )
    try:
        with urllib.request.urlopen(request, context=ssl.create_default_context(), timeout=timeout) as response:
            payload = json.loads(response.read().decode("utf-8"))
    except Exception as exc:
        print(f"[pixiv:{mode}] Refresh failed: {exc}")
        return []
    return validate_ranking(payload.get("contents", []) if isinstance(payload, dict) else [])


def refresh(cache_dir=Path("docs") / "assets", session="", timeout=15):
    refreshed = 0
    for file_name, mode, requires_session in RANKINGS:
        if requires_session and not session:
            print(f"[pixiv:{mode}] PIXIV_SESSION is not set; keeping the existing cache")
            continue
        data = fetch_ranking(mode, session=session if requires_session else "", timeout=timeout)
        if not data and session and not requires_session:
            print(f"[pixiv:{mode}] Anonymous refresh failed; retrying with PIXIV_SESSION")
            data = fetch_ranking(mode, session=session, timeout=timeout)
        if not data:
            print(f"[pixiv:{mode}] No valid fresh data; keeping the existing cache")
            continue
        write_cache(Path(cache_dir) / file_name, data)
        refreshed += 1
        print(f"[pixiv:{mode}] Refreshed {len(data)} entries")
    return refreshed


def main():
    parser = argparse.ArgumentParser(description="Refresh the Pixiv ranking caches used by the blog")
    parser.add_argument("--cache-dir", type=Path, default=Path("docs") / "assets")
    parser.add_argument("--timeout", type=int, default=15)
    args = parser.parse_args()
    refreshed = refresh(args.cache_dir, os.environ.get("PIXIV_SESSION", ""), args.timeout)
    return 0 if refreshed else 1


if __name__ == "__main__":
    raise SystemExit(main())
