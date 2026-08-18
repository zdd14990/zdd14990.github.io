import gzip
import unittest
from pathlib import Path
from tempfile import TemporaryDirectory
from xml.etree import ElementTree

import main


class SitemapTests(unittest.TestCase):
    def test_non_indexable_pages_are_removed_from_xml_and_gzip_sitemaps(self):
        namespace = "http://www.sitemaps.org/schemas/sitemap/0.9"
        source = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="{namespace}">
  <url><loc>https://example.com/</loc></url>
  <url><loc>https://example.com/404/</loc></url>
  <url><loc>https://example.com/os/</loc></url>
</urlset>
"""
        with TemporaryDirectory() as temporary_directory:
            site_dir = Path(temporary_directory)
            sitemap = site_dir / "sitemap.xml"
            sitemap.write_text(source, encoding="utf-8")

            removed = main._exclude_sitemap_urls(site_dir, "https://example.com/", ["404/", "os/"])
            locations = [
                node.text
                for node in ElementTree.parse(sitemap).getroot().iter(f"{{{namespace}}}loc")
            ]
            with gzip.open(site_dir / "sitemap.xml.gz", "rt", encoding="utf-8") as handle:
                compressed = handle.read()

        self.assertEqual(removed, 2)
        self.assertEqual(locations, ["https://example.com/"])
        self.assertIn("https://example.com/", compressed)
        self.assertNotIn("/404/", compressed)
        self.assertNotIn("/os/", compressed)


if __name__ == "__main__":
    unittest.main()
