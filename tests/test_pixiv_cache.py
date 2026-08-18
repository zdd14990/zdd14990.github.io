import json
import unittest
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest import mock

import main
from scripts import refresh_pixiv_cache


class PixivCacheTests(unittest.TestCase):
    def test_cache_validation_rejects_malformed_entries_and_remote_urls(self):
        data = [
            {"id": 123, "title": "valid", "url": "javascript:alert(1)"},
            {"id": "456", "title": "also valid", "url": "data:text/html,bad"},
            {"id": "not-a-number", "title": "invalid"},
            {"id": "9" * 21, "title": "too long"},
            {"id": True, "title": "invalid"},
            {"id": 789, "title": 123},
        ]

        self.assertEqual(
            refresh_pixiv_cache.validate_ranking(data),
            [
                {"id": 123, "title": "valid", "url": "https://www.pixiv.net/artworks/123"},
                {"id": 456, "title": "also valid", "url": "https://www.pixiv.net/artworks/456"},
            ],
        )

    def test_missing_or_corrupt_cache_degrades_to_empty_data(self):
        with TemporaryDirectory() as temporary_directory:
            root = Path(temporary_directory)
            self.assertEqual(refresh_pixiv_cache.load_cache(root / "missing.json"), [])
            corrupt = root / "corrupt.json"
            corrupt.write_text("not json", encoding="utf-8")
            self.assertEqual(refresh_pixiv_cache.load_cache(corrupt), [])

    def test_post_build_publishes_cache_without_network_or_source_writes(self):
        cache_paths = [Path("docs") / "assets" / name for name, _mode, _auth in refresh_pixiv_cache.RANKINGS]
        before = {path: path.read_bytes() for path in cache_paths}
        index = {"documents": [], "passages": [], "version": 2}

        with TemporaryDirectory() as temporary_directory:
            with mock.patch.object(main, "_public_search_index", return_value=index):
                with mock.patch.object(
                    refresh_pixiv_cache.urllib.request,
                    "urlopen",
                    side_effect=AssertionError("ordinary builds must not access the network"),
                ):
                    main.on_post_build(config={"site_dir": temporary_directory})

            for path in cache_paths:
                output = Path(temporary_directory) / "assets" / path.name
                self.assertTrue(output.exists())
                self.assertTrue(refresh_pixiv_cache.load_cache(output))

        self.assertEqual(before, {path: path.read_bytes() for path in cache_paths})

    def test_explicit_refresh_retries_daily_with_session(self):
        daily = [{"id": 123, "title": "daily", "url": "https://www.pixiv.net/artworks/123"}]
        r18 = [{"id": 456, "title": "r18", "url": "https://www.pixiv.net/artworks/456"}]
        with TemporaryDirectory() as temporary_directory:
            cache_dir = Path(temporary_directory)
            with mock.patch.object(refresh_pixiv_cache, "fetch_ranking", side_effect=[[], daily, r18]) as fetch:
                refreshed = refresh_pixiv_cache.refresh(cache_dir, session="test-session", timeout=7)

            self.assertEqual(refreshed, 2)
            self.assertEqual(
                fetch.call_args_list,
                [
                    mock.call("daily", session="", timeout=7),
                    mock.call("daily", session="test-session", timeout=7),
                    mock.call("daily_r18", session="test-session", timeout=7),
                ],
            )
            self.assertEqual(refresh_pixiv_cache.load_cache(cache_dir / "pixiv-ranking.json"), daily)
            self.assertEqual(refresh_pixiv_cache.load_cache(cache_dir / "pixiv-r18-ranking.json"), r18)


if __name__ == "__main__":
    unittest.main()
