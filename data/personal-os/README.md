# Personal OS local data

This directory is the build target for the Personal OS import manifest, logical
catalog, review queue, and private passage index. Generated JSON/JSONL files are
intentionally ignored by Git and live outside `docs/`, so MkDocs cannot publish
course filenames, absolute paths, metadata, or extracted text.

`extraction-cache.jsonl` stores per-representation passage results keyed by file
SHA-256, modified time, size, extractor version, schema version, and extraction
limits. A normal rebuild reuses unchanged PDF/PPTX results; each new successful
extraction is appended immediately so an interrupted run does not lose progress.

Generate the local data with:

```powershell
python scripts/build_personal_os_data.py
```

To seed the cache from an already completed manifest/private index without
reading or extracting source documents:

```powershell
python scripts/build_personal_os_data.py --bootstrap-cache-only
```

By default, the generator reads the sibling `myblogs/course-materials` archive
without modifying it. Use `--source` to select another source archive.
Run the local-only viewer with `python personal_os_server.py`.
