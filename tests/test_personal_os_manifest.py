import hashlib
import json
import os
import unittest
from collections import Counter
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest import mock

from scripts import build_personal_os_data as builder


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DATA_ROOT = PROJECT_ROOT / "data" / "personal-os"


class PersonalOSManifestTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        with (DATA_ROOT / "import-manifest.jsonl").open(encoding="utf-8") as handle:
            cls.rows = [json.loads(line) for line in handle]
        cls.by_id = {row["id"]: row for row in cls.rows}
        cls.summary = json.loads((DATA_ROOT / "import-summary.json").read_text(encoding="utf-8"))
        cls.catalog = json.loads((DATA_ROOT / "catalog.json").read_text(encoding="utf-8"))
        cls.search_index = json.loads((DATA_ROOT / "private-search-index.json").read_text(encoding="utf-8"))

    def test_manifest_closes_reviewed_policy(self):
        counts = Counter(row["importPolicy"] for row in self.rows)
        self.assertEqual(len(self.rows), 1586)
        self.assertEqual(counts, {"include": 442, "exclude": 1063, "review": 81})
        self.assertTrue(self.summary["closed"])
        self.assertTrue(self.summary["expectedCountsMatch"])
        self.assertTrue(self.summary["sourceUnchanged"])

    def test_ids_paths_and_hashes_are_stable(self):
        self.assertEqual(len({row["id"] for row in self.rows}), 1586)
        sample = next(row for row in self.rows if row["importPolicy"] == "include" and row["size"] < 2_000_000)
        expected_id = "file-" + hashlib.sha256(sample["relativePath"].encode("utf-8")).hexdigest()[:20]
        self.assertEqual(sample["id"], expected_id)
        digest = hashlib.sha256()
        with Path(sample["path"]).open("rb") as handle:
            for block in iter(lambda: handle.read(1024 * 1024), b""):
                digest.update(block)
        self.assertEqual(sample["sha256"], digest.hexdigest())

    def test_removed_general_indexes_are_absent(self):
        paths = {row["relativePath"] for row in self.rows}
        self.assertNotIn("博士生资格考试/计算与应用数学/相关通用资料索引.md", paths)
        self.assertNotIn("博士生资格考试/人工智能/相关通用资料索引.md", paths)

    def test_display_titles_and_real_course_series(self):
        documents = self.catalog["entities"]["documents"]
        textbook = next(document for document in documents if document["title"] == "Textbook_Understanding_Machine_Learning_Theory_Algorithms")
        self.assertEqual(textbook["displayTitle"], "Understanding Machine Learning: From Theory to Algorithms")
        npde_series = {document.get("seriesLabel") for document in documents if document["courseId"] == "numerical-pde" and document.get("seriesId")}
        self.assertEqual(npde_series, {"史作强 · Lecture Series", "尹东升 · Lecture Series", "Jinpeng Liu · Lecture Series"})
        jinpeng = sorted((document for document in documents if document.get("seriesId") == "npde-jinpeng-liu-lectures"), key=lambda document: document["explicitOrder"])
        self.assertEqual([document["explicitOrder"] for document in jinpeng], [0, 1, 2, 3, 4, 5])
        self.assertTrue(all(document["displayTitle"].startswith(f"Chapter {index}:") for index, document in enumerate(jinpeng)))

    def test_logical_catalog_only_consumes_include(self):
        entities = self.catalog["entities"]
        representation_file_ids = {item["fileBlobId"] for item in entities["representations"]}
        self.assertTrue(representation_file_ids)
        self.assertTrue(all(self.by_id[file_id]["importPolicy"] == "include" for file_id in representation_file_ids))
        homework_ids = {row["id"] for row in self.rows if row["documentType"] == "homework"}
        self.assertFalse(representation_file_ids & homework_ids)

    def test_nlp_pdf_and_pptx_are_representations_of_one_document(self):
        entities = self.catalog["entities"]
        representations = {item["id"]: item for item in entities["representations"]}
        match = next(document for document in entities["documents"] if document["courseId"] == "natural-language-processing" and "Multi-Modal Model" in document["title"])
        formats = {representations[item_id]["format"] for item_id in match["representationIds"]}
        self.assertEqual(formats, {"PDF", "PPTX"})

    def test_mlt_week_four_has_reviewable_version_relation(self):
        entities = self.catalog["entities"]
        versions = {item["id"]: item for item in entities["documentVersions"]}
        match = next(document for document in entities["documents"] if document["courseId"] == "machine-learning-theory" and "Week4" in document["title"])
        labels = {versions[item_id]["label"] for item_id in match["versionIds"]}
        self.assertTrue(match["needsReview"])
        self.assertEqual(labels, {"current", "alternate"})

    def test_ml_note_images_are_not_documents(self):
        document_file_names = {name for document in self.catalog["entities"]["documents"] for name in document["sourceFilenames"]}
        self.assertFalse(any(name.lower().endswith(".png") for name in document_file_names))
        attached = [row for row in self.rows if row["courseId"] == "machine-learning-theory" and row["extension"] == ".png"]
        self.assertTrue(attached)
        self.assertTrue(all(row["artifactRole"] == "attachment" for row in attached))

    def test_private_index_metadata_and_scope(self):
        self.assertEqual(self.search_index["scope"], "private")
        self.assertEqual(self.search_index["documentCount"], len(self.search_index["documents"]))
        self.assertEqual(self.search_index["passageCount"], len(self.search_index["passages"]))
        self.assertRegex(self.search_index["contentHash"], r"^[0-9a-f]{64}$")

    def test_extraction_cache_covers_completed_documents(self):
        with (DATA_ROOT / "extraction-cache.jsonl").open(encoding="utf-8") as handle:
            cache = [json.loads(line) for line in handle]
        self.assertEqual(len(cache), self.search_index["documentCount"])
        self.assertEqual(sum(len(entry["passages"]) for entry in cache), self.search_index["passageCount"])
        self.assertTrue(all(entry["extractorVersion"] == builder.EXTRACTOR_VERSION for entry in cache))
        self.assertTrue(all(entry["schemaVersion"] == builder.EXTRACTION_SCHEMA_VERSION for entry in cache))

    def test_extraction_cache_key_invalidates_on_source_or_extractor_change(self):
        sample = next(row for row in self.rows if row["textExtractionStatus"] in {"extracted", "partial"})
        original = builder.extraction_cache_key(sample)
        changed_mtime = dict(sample, modifiedAt="2099-01-01T00:00:00Z")
        changed_hash = dict(sample, sha256="0" * 64)
        self.assertNotEqual(builder.extraction_cache_key(changed_mtime), original)
        self.assertNotEqual(builder.extraction_cache_key(changed_hash), original)
        with mock.patch.object(builder, "EXTRACTOR_VERSION", builder.EXTRACTOR_VERSION + "-next"):
            self.assertNotEqual(builder.extraction_cache_key(sample), original)

    def test_local_server_does_not_run_course_extraction(self):
        import inspect
        import personal_os_server

        source = inspect.getsource(personal_os_server.ensure_site)
        self.assertNotIn("build_personal_os_data", source)
        self.assertIn("mkdocs", source)

    def test_local_server_refreshes_ui_shell_by_default(self):
        import personal_os_server

        default_args = personal_os_server.build_parser().parse_args([])
        reused_args = personal_os_server.build_parser().parse_args(["--reuse-site"])
        self.assertTrue(personal_os_server.should_rebuild_site(default_args))
        self.assertFalse(personal_os_server.should_rebuild_site(reused_args))

    def test_local_server_does_not_expose_review_queue(self):
        import inspect
        import personal_os_server

        data_source = inspect.getsource(personal_os_server.PersonalOSData.__init__)
        api_source = inspect.getsource(personal_os_server.PersonalOSHandler._serve_api)
        self.assertNotIn('self._load("review-queue.json")', data_source)
        self.assertNotIn('route == "review"', api_source)

    def test_local_server_rebuild_is_mkdocs_only(self):
        import personal_os_server

        with TemporaryDirectory() as temporary_directory:
            site_root = Path(temporary_directory)
            with mock.patch.object(personal_os_server.subprocess, "run") as run:
                personal_os_server.ensure_site(site_root, rebuild=True)
            run.assert_called_once()
            command = run.call_args.args[0]
            self.assertIn("mkdocs", command)
            self.assertNotIn("build_personal_os_data.py", " ".join(map(str, command)))

    def test_private_payload_is_outside_mkdocs_docs(self):
        docs_root = (PROJECT_ROOT / "docs").resolve()
        for name in ("import-manifest.jsonl", "catalog.json", "review-queue.json", "private-search-index.json", "extraction-cache.jsonl"):
            path = (DATA_ROOT / name).resolve()
            with self.assertRaises(ValueError):
                path.relative_to(docs_root)
        site_dir = os.environ.get("PERSONAL_OS_SITE_DIR")
        if site_dir:
            built = Path(site_dir)
            self.assertFalse(any(built.rglob("private-search-index.json")))
            self.assertFalse(any(built.rglob("import-manifest.jsonl")))


if __name__ == "__main__":
    unittest.main()
