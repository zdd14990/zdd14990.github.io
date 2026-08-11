#!/usr/bin/env python3
"""Build the local-only Personal OS catalog from the read-only course archive.

The source tree is opened for reading only. Generated files live outside MkDocs'
``docs`` directory so they cannot be copied into the public static site.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import mimetypes
import re
import subprocess
import sys
import time
import unicodedata
import zipfile
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path
from xml.etree import ElementTree


SOURCE_ROOT = Path(__file__).resolve().parents[2] / "myblogs" / "course-materials"
OUTPUT_ROOT = Path(__file__).resolve().parents[1] / "data" / "personal-os"
EXPECTED_COUNTS = {"include": 442, "exclude": 1063, "review": 81}
INDEX_VERSION = 1
MAX_PDF_PAGES = 60
MAX_PASSAGE_CHARS = 1_100
PDF_TIMEOUT_SECONDS = 30
EXTRACTION_SCHEMA_VERSION = 1
EXTRACTOR_VERSION = "zdd-local-text-v1"
CACHE_FILENAME = "extraction-cache.jsonl"


COURSES = {
    "ai4math": {"name": "AI4Math Seminar", "englishName": "AI for Mathematics Seminar"},
    "machine-learning-theory": {
        "name": "Machine Learning Theory",
        "englishName": "Machine Learning Theory",
        "teacher": "Angelica Aviles-Rivero",
        "offering": {"label": "Spring 2025", "year": 2025, "semester": "Spring"},
    },
    "deep-learning": {"name": "Deep Learning", "englishName": "Deep Learning", "teacher": "庞彤瑶", "offering": {"label": "2025 春", "year": 2025, "semester": "Spring"}},
    "optimization-for-ml": {"name": "Optimization for Machine Learning", "englishName": "Optimization for Machine Learning"},
    "natural-language-processing": {
        "name": "Natural Language Processing",
        "englishName": "Natural Language Processing",
        "teacher": "Mingming Sun",
        "offering": {"label": "2025", "year": 2025},
    },
    "probability-theory": {"name": "Probability Theory", "englishName": "Probability Theory", "teacher": "Hao Wu"},
    "mathematical-statistics": {
        "name": "Mathematical Statistics",
        "englishName": "Mathematical Statistics",
        "teacher": "杨帆",
        "offering": {"label": "2024–2025 秋", "year": 2024, "semester": "Fall"},
    },
    "high-dimensional-statistics": {"name": "High-dimensional Statistics", "englishName": "High-dimensional Statistics"},
    "stochastic-processes": {"name": "Stochastic Processes", "englishName": "Stochastic Processes"},
    "mathematical-analysis": {"name": "Mathematical Analysis", "englishName": "Mathematical Analysis"},
    "higher-algebra": {"name": "Higher Algebra", "englishName": "Higher Algebra"},
    "asymptotic-analysis": {"name": "Asymptotic Analysis", "englishName": "Asymptotic Analysis", "teacher": "朱毅", "offering": {"label": "2025 秋", "year": 2025, "semester": "Fall"}},
    "numerical-ode": {"name": "Numerical ODE", "englishName": "Numerical Ordinary Differential Equations"},
    "numerical-pde": {"name": "Numerical PDE", "englishName": "Numerical Partial Differential Equations", "teacher": "史作强 / 尹东升"},
    "numerical-analysis": {"name": "Numerical Analysis", "englishName": "Numerical Analysis"},
    "mathematical-optimization": {"name": "Mathematical Optimization", "englishName": "Mathematical Optimization"},
    "finite-element-methods": {"name": "Finite Element Methods", "englishName": "Finite Element Methods"},
    "quantum-mechanics": {"name": "Quantum Mechanics", "englishName": "Quantum Mechanics"},
    "electrodynamics": {"name": "Electrodynamics", "englishName": "Electrodynamics"},
    "statistical-mechanics": {"name": "Statistical Mechanics", "englishName": "Statistical Mechanics"},
    "russian": {"name": "Russian", "englishName": "Russian"},
    "french": {"name": "French", "englishName": "French"},
    "ai-qualification-exam": {"name": "AI Qualification Exam", "englishName": "AI Qualification Exam"},
    "applied-math-qualification-exam": {"name": "Applied Mathematics Qualification Exam", "englishName": "Applied Mathematics Qualification Exam"},
    "probability-qualification-exam": {"name": "Probability & Statistics Qualification Exam", "englishName": "Probability & Statistics Qualification Exam"},
    "other-qualification-exams": {"name": "Other Qualification Exams", "englishName": "Other Qualification Exams"},
    "applied-mathematics-reference": {"name": "Applied Mathematics References", "englishName": "Applied Mathematics References"},
    "other": {"name": "Unassigned", "englishName": "Unassigned"},
}


CUSTOM_MIME = {
    ".md": "text/markdown",
    ".tex": "application/x-tex",
    ".djvu": "image/vnd.djvu",
    ".m": "text/x-matlab",
    ".npy": "application/x-npy",
    ".synctex.gz": "application/gzip",
}


def iso_time(timestamp: float) -> str:
    return datetime.fromtimestamp(timestamp, timezone.utc).isoformat().replace("+00:00", "Z")


def stable_id(prefix: str, value: str, length: int = 20) -> str:
    digest = hashlib.sha256(value.encode("utf-8")).hexdigest()[:length]
    return f"{prefix}-{digest}"


def normalized_path(path: Path) -> str:
    return path.relative_to(SOURCE_ROOT).as_posix()


def compound_extension(path: Path) -> str:
    lower = path.name.lower()
    if lower.endswith(".synctex.gz"):
        return ".synctex.gz"
    return path.suffix.lower()


def mime_type(path: Path) -> str:
    extension = compound_extension(path)
    return CUSTOM_MIME.get(extension) or mimetypes.guess_type(path.name)[0] or "application/octet-stream"


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(4 * 1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def extraction_cache_key(row: dict) -> str:
    identity = {
        "sha256": row.get("sha256"),
        "modifiedAt": row.get("modifiedAt"),
        "size": row.get("size"),
        "extension": row.get("extension"),
        "extractorVersion": EXTRACTOR_VERSION,
        "schemaVersion": EXTRACTION_SCHEMA_VERSION,
        "maxPdfPages": MAX_PDF_PAGES,
        "maxPassageChars": MAX_PASSAGE_CHARS,
    }
    payload = json.dumps(identity, sort_keys=True, separators=(",", ":"))
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def load_jsonl(path: Path) -> list[dict]:
    if not path.is_file():
        return []
    rows = []
    with path.open(encoding="utf-8") as handle:
        for line_number, line in enumerate(handle, 1):
            if not line.strip():
                continue
            try:
                rows.append(json.loads(line))
            except json.JSONDecodeError as error:
                print(f"[cache] ignored invalid {path.name}:{line_number}: {error}", file=sys.stderr)
    return rows


def load_extraction_cache(path: Path) -> dict[str, dict]:
    cache = {}
    for entry in load_jsonl(path):
        if entry.get("schemaVersion") != EXTRACTION_SCHEMA_VERSION or entry.get("extractorVersion") != EXTRACTOR_VERSION:
            continue
        if entry.get("key"):
            cache[entry["key"]] = entry
    return cache


def write_extraction_cache(path: Path, cache: dict[str, dict]) -> None:
    temporary = path.with_suffix(path.suffix + ".tmp")
    with temporary.open("w", encoding="utf-8", newline="\n") as handle:
        for key in sorted(cache):
            handle.write(json.dumps(cache[key], ensure_ascii=False, sort_keys=True) + "\n")
    temporary.replace(path)


def append_extraction_cache(path: Path, entry: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8", newline="\n") as handle:
        handle.write(json.dumps(entry, ensure_ascii=False, sort_keys=True) + "\n")


def course_id_for(relative_path: str) -> str:
    path = relative_path.replace("/", "\\")
    checks = (
        ("AI与机器学习\\AI4Math与讨论班", "ai4math"),
        ("AI与机器学习\\机器学习", "machine-learning-theory"),
        ("AI与机器学习\\深度学习", "deep-learning"),
        ("AI与机器学习\\优化方法", "optimization-for-ml"),
        ("AI与机器学习\\自然语言处理", "natural-language-processing"),
        ("数学\\概率与统计\\概率论", "probability-theory"),
        ("数学\\概率与统计\\数理统计", "mathematical-statistics"),
        ("数学\\概率与统计\\高维统计", "high-dimensional-statistics"),
        ("数学\\概率与统计\\随机过程与随机分析", "stochastic-processes"),
        ("数学\\概率与统计\\教材习题解答", "probability-theory"),
        ("数学\\概率与统计\\综合资料", "probability-theory"),
        ("数学\\数学分析", "mathematical-analysis"),
        ("数学\\高等代数", "higher-algebra"),
        ("数学\\计算与应用数学\\渐近分析", "asymptotic-analysis"),
        ("数学\\计算与应用数学\\数值ODE", "numerical-ode"),
        ("数学\\计算与应用数学\\数值PDE", "numerical-pde"),
        ("数学\\计算与应用数学\\数值分析与科学计算", "numerical-analysis"),
        ("数学\\计算与应用数学\\优化方法", "mathematical-optimization"),
        ("数学\\计算与应用数学\\有限元方法", "finite-element-methods"),
        ("数学\\偏微分方程", "numerical-pde"),
        ("物理\\量子力学", "quantum-mechanics"),
        ("物理\\电动力学", "electrodynamics"),
        ("物理\\统计力学", "statistical-mechanics"),
        ("语言\\俄语", "russian"),
        ("语言\\法语", "french"),
        ("博士生资格考试\\人工智能", "ai-qualification-exam"),
        ("博士生资格考试\\计算与应用数学", "applied-math-qualification-exam"),
        ("博士生资格考试\\概率与统计", "probability-qualification-exam"),
        ("博士生资格考试", "other-qualification-exams"),
        ("数学\\计算与应用数学\\教材与参考书", "applied-mathematics-reference"),
    )
    for marker, course_id in checks:
        if path.startswith(marker):
            return course_id
    if "Probability_ Theory and Examples" in path or "(GTM295)Measure Theory" in path:
        return "probability-theory"
    if path.startswith("综合\\求真书院") and "analysis" in path.lower():
        return "mathematical-analysis"
    if path.startswith("综合\\求真书院") and "代数" in path:
        return "higher-algebra"
    if path.startswith("综合\\其他课程") and "Convex_Theory_Entire_Book" in path:
        return "mathematical-optimization"
    if path.startswith("综合\\其他课程") and (path.endswith("main (3) (1).pdf") or path.endswith("main (3).pdf")):
        return "quantum-mechanics"
    if path.startswith("综合\\其他课程") and (path.startswith("综合\\其他课程\\chapter 1_") or "notes of chapter" in path.lower()):
        return "numerical-pde"
    return "other"


def document_type_for(relative_path: str) -> tuple[str, str]:
    path = relative_path.lower()
    filename = Path(relative_path).name.lower()
    if compound_extension(Path(relative_path)) in {".jpg", ".jpeg", ".png", ".gif", ".webp", ".heic"}:
        return "supporting-asset", "attachment"
    if path.startswith("综合/其他课程/") and (filename.startswith("chapter 1_") or filename.startswith("notes of chapter") or filename == "main (3) (1).pdf"):
        return "lecture-note", "primary-material"
    if any(token in path for token in ("课程作业", "homework", "/hw", "\\hw", "/作业", "\\作业")) or re.search(r"(?:^|[-_ ])hw\d", filename):
        return "homework", "assignment"
    if any(token in path for token in ("历年试题", "final_exam", "final exam", "期末考试")):
        return "past-exam", "assessment"
    if "历年答案" in path or any(token in filename for token in ("solution", "solutions", "答案")) or re.search(r"(?:^|[-_ ])sol(?:\s|[-_.]|$)", filename):
        return "solution", "answer"
    if any(token in path for token in ("大作业", "course project", "final project", "项目")):
        return "course-project", "project-artifact"
    if any(token in path for token in ("syllabus", "教学大纲", "考试大纲", "course overview")):
        return "syllabus", "course-administration"
    if any(token in path for token in ("教材", "参考书", "参考资料")):
        return ("reference-book" if "参考" in path else "textbook"), "primary-material"
    if any(token in path for token in ("课程笔记", "笔记", "notes", "note ")):
        return "lecture-note", "primary-material"
    if any(token in path for token in ("课件", "slides", "lecture")) or Path(relative_path).suffix.lower() in {".ppt", ".pptx"}:
        return "lecture-slide", "primary-material"
    if any(token in path for token in ("讲义", "辅导资料", "培训", "复习资料")):
        return "lecture-note", "primary-material"
    return "reference", "primary-material"


def decision(relative_path: str, document_type: str) -> tuple[str, float, str]:
    """Apply the reviewed Phase-0 policy. Specific rules precede broad rules."""
    path = relative_path.replace("/", "\\")
    lower = path.lower()
    filename = Path(relative_path).name.lower()
    extension = compound_extension(Path(relative_path))

    if relative_path == "README.md" or path.startswith("_索引\\"):
        return "exclude", 1.0, "Repository inventory/administrative metadata, not course knowledge."
    if extension in {".aux", ".log", ".synctex.gz", ".ds_store"} or filename == ".ds_store":
        return "exclude", 1.0, "Temporary or build artifact."
    if any(marker in path for marker in ("求真书院报名材料", "信息工程研究所面试准备")):
        return "exclude", 1.0, "Personal application or interview material."
    if "大作业内容与提交说明" in path or "Robust PCA" in path or "robust_pca" in lower:
        return "exclude", 1.0, "Course project submission/code/data."
    if any(marker in lower for marker in ("课程作业", "homework_solutions", "homework ", "homework-", "homework_")) or re.search(r"(?:^|[\\/_ -])hw\d", lower):
        return "exclude", 0.99, "Homework or homework solution is outside the curated library policy."
    if any(marker in lower for marker in ("course project", "final project", "project-submission")):
        return "exclude", 0.99, "Course project/submission is outside the curated library policy."
    if extension in {".m", ".mat", ".npy", ".py", ".zip"} and not path.startswith("语言\\俄语"):
        return "exclude", 0.98, "Project code, dataset, archive, or generated artifact."

    if path.startswith("AI与机器学习\\机器学习\\教材与习题解答\\"):
        if any(marker in filename for marker in ("sol", "solution", "exercise set")):
            return "review", 0.98, "Machine learning solution/exercise set requires an owner decision."
        return "include", 0.99, "Machine learning textbook or durable reading material."
    if path.startswith("博士生资格考试\\概率与统计\\辅导资料\\"):
        return "include", 0.96, "Qualification training lecture material is allowed by policy."
    if path.endswith("Probability_ Theory and Examples (带答案)\\Probability_ Theory and Examples (Durrett).pdf"):
        return "include", 0.99, "Durrett textbook; grouped separately from solution material."
    if path.startswith("综合\\其他课程\\") and (filename.startswith("chapter 1_") or filename.startswith("notes of chapter")):
        return "include", 0.99, "Numerical PDE lecture note identified from extracted title and instructor metadata."
    if path.startswith("综合\\其他课程\\") and filename == "main (3) (1).pdf":
        return "include", 0.99, "Quantum mechanics lecture note identified from its title page."
    if path.startswith("综合\\其他课程\\") and filename == "convex_theory_entire_book.pdf":
        return "include", 0.95, "Long-lived convex optimization reference book."
    if path.startswith("数学\\概率与统计\\随机过程与随机分析\\") and "midterm" in filename:
        return "review", 0.99, "Midterm exam is an explicit review category."

    if path.startswith("博士生资格考试\\"):
        if any(marker in path for marker in ("历年试题", "历年答案")) or any(marker in filename for marker in ("练习题", "答案")):
            return "review", 0.98, "Qualification exam, past exam, exercise, or solution requires an owner decision."
        if path.startswith("博士生资格考试\\人工智能\\"):
            if filename == "generativemodels.pdf" and "2025年12月复习" in path:
                return "review", 1.0, "Malformed PDF; a valid representation exists elsewhere."
            return "include", 0.95, "Long-lived AI qualification training/reference material."
        if path.startswith("博士生资格考试\\计算与应用数学\\"):
            return "include", 0.90, "Applied mathematics qualification training/reference material."
        return "review", 0.95, "Qualification exam material is an explicit review category."

    if "数学\\概率与统计\\教材习题解答\\Durrett\\" in path:
        return "exclude", 1.0, "Durrett solution media is excluded from Personal OS v1 and OCR."
    if "数学\\概率与统计\\教材习题解答\\" in path:
        if any(marker in filename for marker in ("solution", "solutions", "sol_", "答案")):
            return "review", 0.97, "Textbook solution requires an owner decision."
        return "include", 0.99, "Probability textbook/reference book."

    if any(marker in path for marker in ("题目与竞赛", "专题题目合辑")):
        return "review", 0.96, "Exercise set, competition, or exam material requires an owner decision."
    if document_type in {"past-exam", "solution"} or any(marker in filename for marker in ("exercise set", "excercises", "exam_practice", "final_exam", "习题解答")):
        if path.startswith("物理\\"):
            return "exclude", 0.98, "Homework/solution is outside the curated library policy."
        return "review", 0.93, "Exercise, solution, or exam material requires an owner decision."

    if path.startswith("AI与机器学习\\机器学习\\课程考试与作业"):
        return "exclude", 0.99, "Homework is outside the curated library policy."
    if path.endswith("3-Kernel Method.md"):
        return "review", 0.99, "Placeholder Markdown note contains no substantive course content."
    if path.startswith("AI与机器学习\\自然语言处理\\2025课程作业"):
        return "exclude", 1.0, "Assignment is outside the curated library policy."
    if path.startswith("物理\\统计力学"):
        return "exclude", 1.0, "Directory contains homework only."
    if path.startswith("物理\\电动力学") and "hw" in filename:
        return "exclude", 1.0, "Homework is outside the curated library policy."
    if path.startswith("物理\\量子力学") and "hw" in filename:
        return "exclude", 1.0, "Homework is outside the curated library policy."
    if path.startswith("综合\\其他课程\\"):
        if filename in {"gram_zeta_style_preprint.pdf"}:
            return "review", 0.60, "Research preprint is not reliably attached to a course."
        if re.match(r"(?:f61|e721)", filename) or filename.startswith("notes_"):
            return "review", 0.45, "Unknown scan/title; needs manual identification."
        if any(marker in filename for marker in ("应数 ", "problems", "题目", "竞赛", "考试")):
            return "review", 0.80, "Exercise/exam/problem collection requires an owner decision."
        if any(marker in filename for marker in ("homework", "hw", "final", "members", "提交", "申请")):
            return "exclude", 0.98, "Homework, project, roster, or administrative artifact."
        if filename.startswith("chapter ") or filename.startswith("notes of chapter"):
            return "review", 0.55, "Course identity is uncertain despite note-like content."
        if "(gtm295)" in filename:
            return "include", 0.92, "Long-lived probability reference book."
        return "review", 0.55, "Unassigned cross-course material needs manual review."
    if path.startswith("综合\\待确认资料"):
        return "review", 0.35, "Existing folder explicitly marks the item as uncertain."
    if path.startswith("综合\\") and any(marker in filename for marker in ("申请", "操作手册", "提交说明", "members")):
        return "exclude", 0.98, "Administrative or personal material."

    if document_type == "homework":
        return "exclude", 0.98, "Homework is outside the curated library policy."
    return "include", 0.90, "Lecture, slide, textbook, reference, or durable note allowed by policy."


def integrity_status(path: Path) -> str:
    extension = compound_extension(path)
    try:
        if extension == ".pdf":
            with path.open("rb") as handle:
                return "ok" if handle.read(5) == b"%PDF-" else "corrupt"
        if extension in {".docx", ".pptx", ".xlsx"}:
            return "ok" if zipfile.is_zipfile(path) else "corrupt"
        return "ok"
    except OSError:
        return "unreadable"


def normalized_stem(path: Path) -> str:
    value = unicodedata.normalize("NFKC", path.stem).strip().lower()
    value = re.sub(r"\s+", " ", value)
    value = re.sub(r"\bweek0*(\d+)\b", r"week\1", value)
    value = re.sub(r"[（(](?:copy|\d+)[^)]*[)）]$", "", value, flags=re.I)
    value = re.sub(r"[ _.-]+", "-", value).strip("-")
    return value


def version_label(relative_path: str) -> str:
    name = Path(relative_path).stem.lower()
    if "旧旧" in name or "older" in name:
        return "older"
    if "旧" in name or re.search(r"\bold\b", name):
        return "old"
    if re.search(r"week0\d", name):
        return "alternate"
    return "current"


def logical_key(row: dict) -> str:
    relative = row["relativePath"]
    path = Path(relative)
    stem = normalized_stem(path)
    if row["courseId"] == "natural-language-processing" and "2025课程课件" in relative:
        return f"{row['courseId']}:slides:{stem}"
    if row["courseId"] == "machine-learning-theory":
        week = re.search(r"mlt-week(\d+)-slides", stem)
        if week:
            return f"{row['courseId']}:week{int(week.group(1))}-slides"
    if row["courseId"] == "mathematical-statistics" and stem.startswith("数理统计笔记"):
        return f"{row['courseId']}:personal-notes"
    parent = path.parent.as_posix().lower()
    return f"{row['courseId']}:{parent}:{stem}"


def clean_title(path: Path) -> str:
    title = path.stem.strip()
    title = re.sub(r"^[\[(]?@?[^\])]+[\])]?[_ -]+", "", title) if title.startswith("[@") else title
    return re.sub(r"\s+", " ", title).strip()


KNOWN_DISPLAY_TITLES = {
    "Textbook_Understanding_Machine_Learning_Theory_Algorithms": "Understanding Machine Learning: From Theory to Algorithms",
    "Textbook_Learning_Theory_from_First_Principles": "Learning Theory from First Principles",
    "Supplementary_Convex_Optimization_Algorithms_and_Complexity": "Convex Optimization: Algorithms and Complexity",
}


def cached_metadata_title(cache_entry: dict | None) -> str | None:
    if not cache_entry:
        return None
    passages = cache_entry.get("passages") or []
    if not passages:
        return None
    text = str(passages[0].get("text") or "").strip()
    match = re.match(
        r"((?:chapter|lecture)\s+\d+\s*:\s*.+?)(?=\s+(?:instructor|teacher|assistant)\s*:)",
        text,
        flags=re.I,
    )
    if not match:
        return None
    title = re.sub(r"\s+", " ", match.group(1)).strip()
    return title if 5 <= len(title) <= 180 else None


def normalized_display_title(raw_title: str, cache_entry: dict | None = None) -> str:
    metadata_title = cached_metadata_title(cache_entry)
    if metadata_title:
        return metadata_title
    if raw_title in KNOWN_DISPLAY_TITLES:
        return KNOWN_DISPLAY_TITLES[raw_title]
    title = unicodedata.normalize("NFKC", raw_title).strip()
    title = re.sub(r"\s+--\s+.*(?:Anna[’']s Archive|Z-Library).*$", "", title, flags=re.I)
    title = re.sub(r"[_ -]+\d{6,8}_\d{6}(?:\s*[（(]\d+[)）])?$", "", title)
    title = re.sub(r"\s*[（(]\d+[)）]$", "", title)
    title = title.replace("_", " ")
    week = re.fullmatch(r"MLT\s+Week\s*0*(\d+)\s+Slides", title, flags=re.I)
    if week:
        return f"Week {int(week.group(1))} Slides"
    title = re.sub(r"\s+", " ", title).strip(" -_")
    if re.fullmatch(r"chapter\s+\d+", title, flags=re.I):
        title = title.capitalize()
    return title or raw_title


def academic_order(value: str) -> int | None:
    patterns = (
        r"(?:^|\b)(?:lecture|week|chapter)\s*0*(\d+)\b",
        r"^\s*0*(\d+)\s*[.、)_-]",
        r"第\s*0*(\d+)\s*(?:讲|章|周|节)",
    )
    for pattern in patterns:
        match = re.search(pattern, value, flags=re.I)
        if match:
            return int(match.group(1))
    return None


def source_series_for(row: dict, raw_title: str, display_title: str) -> dict:
    path = row["relativePath"].replace("\\", "/")
    course_id = row.get("courseId")
    series = {}
    if course_id == "natural-language-processing" and "/2025课程课件/" in f"/{path}":
        series = {"seriesId": "nlp-2025-lectures", "seriesLabel": "2025 · Lecture Series", "seriesTeacher": "Mingming Sun", "seriesOrder": 10}
    elif course_id == "machine-learning-theory" and re.search(r"mlt[_ -]?week0?\d+", raw_title, flags=re.I):
        series = {"seriesId": "mlt-spring-2025-slides", "seriesLabel": "Spring 2025 · Lecture Slides", "seriesTeacher": "Angelica Aviles-Rivero", "seriesOrder": 10}
    elif course_id == "machine-learning-theory" and "/课程笔记/" in f"/{path}":
        series = {"seriesId": "mlt-course-notes", "seriesLabel": "Course Notes", "seriesTeacher": None, "seriesOrder": 20}
    elif course_id == "numerical-pde" and "/史作强/每个单独章节讲义/" in f"/{path}":
        series = {"seriesId": "npde-shi-lectures", "seriesLabel": "史作强 · Lecture Series", "seriesTeacher": "史作强", "seriesOrder": 10}
    elif course_id == "numerical-pde" and "/殷东生/" in f"/{path}":
        series = {"seriesId": "npde-yin-lectures", "seriesLabel": "尹东升 · Lecture Series", "seriesTeacher": "尹东升", "seriesOrder": 20}
    elif course_id == "numerical-pde" and path.startswith("综合/其他课程/") and re.search(r"(?:notes of )?chapter\s*\d+", raw_title, flags=re.I):
        series = {"seriesId": "npde-jinpeng-liu-lectures", "seriesLabel": "Jinpeng Liu · Lecture Series", "seriesTeacher": "Jinpeng Liu", "seriesOrder": 30}
    if series:
        series["seriesKind"] = "lecture-series"
        order = academic_order(display_title)
        series["explicitOrder"] = order if order is not None else academic_order(raw_title)
    return series


TOPIC_RULES = {
    "transformers": ("transformer", "attention"),
    "large-language-models": ("large language model", "llm", "pretrained language"),
    "multimodal-models": ("multi-modal", "multimodal"),
    "reinforcement-learning": ("reinforcement" ,),
    "generative-models": ("generative", "diffusion", "vae", "gan"),
    "optimization": ("optimization", "convex", "gradient", "admm"),
    "kernel-methods": ("kernel",),
    "statistical-learning": ("statistical learning", "learning theory"),
    "probability-spaces": ("proba_space", "probability space"),
    "law-of-large-numbers": ("lln", "large number"),
    "central-limit-theorem": ("clt", "central limit"),
    "conditional-expectation": ("condexp", "conditional expectation"),
    "markov-chains": ("markov",),
    "finite-difference-methods": ("difference", "fdm", "差分"),
    "finite-element-methods": ("finite element", "fem", "有限元"),
    "maximum-principle": ("maximum principle", "最大值原理"),
    "numerical-linear-algebra": ("matrix", "矩阵", "linear algebra", "线性方程"),
    "numerical-integration": ("integration", "积分", "quadrature"),
}


def topics_for(*values: str) -> list[str]:
    haystack = " ".join(values).lower()
    return sorted(topic for topic, markers in TOPIC_RULES.items() if any(marker in haystack for marker in markers))


def extract_zip_text(path: Path, member_pattern: re.Pattern[str]) -> list[tuple[str, str]]:
    sections = []
    with zipfile.ZipFile(path) as archive:
        names = sorted((name for name in archive.namelist() if member_pattern.search(name)), key=lambda name: [int(value) if value.isdigit() else value for value in re.split(r"(\d+)", name)])
        for index, name in enumerate(names, 1):
            try:
                root = ElementTree.fromstring(archive.read(name))
                text = " ".join(node.text or "" for node in root.iter() if node.tag.endswith("}t"))
                text = re.sub(r"\s+", " ", text).strip()
                if text:
                    sections.append((f"Part {index}", text))
            except (ElementTree.ParseError, KeyError):
                continue
    return sections


def extract_sections(path: Path) -> tuple[list[tuple[str, str]], str]:
    extension = compound_extension(path)
    try:
        if extension in {".md", ".tex", ".txt", ".csv"}:
            text = path.read_text(encoding="utf-8", errors="replace")
            sections = []
            current_title = "Document"
            current_lines = []
            heading_re = re.compile(r"^\s{0,3}#{1,6}\s+(.+?)\s*$") if extension == ".md" else re.compile(r"^\\(?:chapter|section|subsection)\*?\{(.+?)\}")
            for line in text.splitlines():
                match = heading_re.match(line)
                if match:
                    body = "\n".join(current_lines).strip()
                    if body:
                        sections.append((current_title, body))
                    current_title = match.group(1).strip()
                    current_lines = []
                else:
                    current_lines.append(line)
            body = "\n".join(current_lines).strip()
            if body:
                sections.append((current_title, body))
            return sections, "extracted"
        if extension == ".pdf":
            command = ["pdftotext", "-f", "1", "-l", str(MAX_PDF_PAGES), "-enc", "UTF-8", str(path), "-"]
            completed = subprocess.run(command, capture_output=True, check=False, timeout=PDF_TIMEOUT_SECONDS)
            text = completed.stdout.decode("utf-8", errors="replace")
            pages = [(f"Page {index}", page.strip()) for index, page in enumerate(text.split("\f"), 1) if page.strip()]
            status = "partial" if len(pages) >= MAX_PDF_PAGES else "extracted"
            return pages, status if pages else "no-text"
        if extension == ".pptx":
            return extract_zip_text(path, re.compile(r"ppt/slides/slide\d+\.xml$")), "extracted"
        if extension == ".docx":
            return extract_zip_text(path, re.compile(r"word/document\.xml$")), "extracted"
        return [], "unsupported"
    except (OSError, subprocess.SubprocessError, zipfile.BadZipFile):
        return [], "failed"


def chunk_text(text: str) -> list[str]:
    clean = re.sub(r"\s+", " ", text).strip()
    if not clean:
        return []
    return [clean[start:start + MAX_PASSAGE_CHARS].strip() for start in range(0, len(clean), MAX_PASSAGE_CHARS) if clean[start:start + MAX_PASSAGE_CHARS].strip()]


def passage_templates_from_sections(sections: list[tuple[str, str]], extension: str) -> list[dict]:
    templates = []
    passage_number = 0
    for section_number, (section, text) in enumerate(sections, 1):
        for chunk_number, chunk in enumerate(chunk_text(text)):
            location = {"passageIndex": passage_number, "chunkIndex": chunk_number}
            if extension == ".pdf":
                page_match = re.fullmatch(r"Page (\d+)", section)
                location["page"] = int(page_match.group(1)) if page_match else section_number
            elif extension == ".pptx":
                slide_match = re.fullmatch(r"Part (\d+)", section)
                location["slide"] = int(slide_match.group(1)) if slide_match else section_number
            templates.append({"section": section, "text": chunk, "location": location})
            passage_number += 1
    return templates


def snapshot(paths: list[Path]) -> dict[str, tuple[int, int]]:
    return {normalized_path(path): (path.stat().st_size, path.stat().st_mtime_ns) for path in paths}


def scan_files(skip_hash: bool, previous_rows: dict[str, dict] | None = None) -> tuple[list[dict], dict[str, tuple[int, int]], dict]:
    paths = sorted((path for path in SOURCE_ROOT.rglob("*") if path.is_file()), key=lambda path: normalized_path(path).casefold())
    before = snapshot(paths)
    rows = []
    total = len(paths)
    started_at = time.monotonic()
    previous_rows = previous_rows or {}
    hash_hits = 0
    hash_misses = 0
    for index, path in enumerate(paths, 1):
        relative = normalized_path(path)
        stat = path.stat()
        document_type, artifact_role = document_type_for(relative)
        policy, confidence, reason = decision(relative, document_type)
        course_id = course_id_for(relative)
        modified_at = iso_time(stat.st_mtime)
        previous = previous_rows.get(relative)
        reusable_hash = (
            previous
            and previous.get("size") == stat.st_size
            and previous.get("modifiedAt") == modified_at
            and re.fullmatch(r"[0-9a-f]{64}", str(previous.get("sha256", "")))
        )
        if skip_hash:
            content_hash = "skipped"
        elif reusable_hash:
            content_hash = previous["sha256"]
            hash_hits += 1
        else:
            content_hash = sha256_file(path)
            hash_misses += 1
        row = {
            "id": stable_id("file", relative),
            "path": str(path),
            "relativePath": relative,
            "filename": path.name,
            "extension": compound_extension(path),
            "mimeType": mime_type(path),
            "size": stat.st_size,
            "sha256": content_hash,
            "modifiedAt": modified_at,
            "course": COURSES[course_id]["name"] if course_id != "other" else None,
            "courseId": course_id if course_id != "other" else None,
            "courseOffering": COURSES[course_id].get("offering", {}).get("label") if course_id != "other" else None,
            "documentType": document_type,
            "artifactRole": artifact_role,
            "importPolicy": policy,
            "visibility": "private" if policy == "include" else "local-only",
            "confidence": confidence,
            "decisionReason": reason,
            "documentGroup": None,
            "versionGroup": None,
            "representationGroup": None,
            "textExtractionStatus": "pending" if policy == "include" else "not-indexed",
            "integrityStatus": integrity_status(path),
        }
        rows.append(row)
        if not skip_hash and (index % 100 == 0 or index == total):
            elapsed = time.monotonic() - started_at
            print(
                f"[manifest] {index}/{total} current={relative} hash-cache={hash_hits} computed={hash_misses} elapsed={elapsed:.1f}s",
                file=sys.stderr,
            )
    return rows, before, {"hits": hash_hits, "misses": hash_misses, "elapsedSeconds": round(time.monotonic() - started_at, 3)}


def build_catalog(
    rows: list[dict],
    skip_extraction: bool,
    extraction_cache: dict[str, dict] | None = None,
    cache_path: Path | None = None,
    force_extraction: bool = False,
) -> tuple[dict, dict, dict[str, dict], dict]:
    included = [row for row in rows if row["importPolicy"] == "include"]
    groups: dict[str, list[dict]] = defaultdict(list)
    for row in included:
        groups[logical_key(row)].append(row)

    documents = []
    versions = []
    representations = []
    relations = []
    passages = []
    topic_ids = set()
    course_document_counts = Counter()
    extraction_cache = extraction_cache or {}
    extraction_hits = 0
    extraction_misses = 0
    used_cache_keys: set[str] = set()
    extraction_started_at = time.monotonic()
    document_total = sum(1 for group_rows in groups.values() if any(row["artifactRole"] != "attachment" for row in group_rows))
    document_number = 0

    for group_key, group_rows in sorted(groups.items()):
        primary_rows = [row for row in group_rows if row["artifactRole"] != "attachment"]
        if not primary_rows:
            for row in group_rows:
                row["textExtractionStatus"] = "attached"
            continue
        document_number += 1
        primary_rows.sort(key=lambda row: (version_label(row["relativePath"]) != "current", row["extension"] != ".pdf", -row["size"], row["filename"].casefold()))
        primary = primary_rows[0]
        document_id = stable_id("doc", group_key)
        course_id = primary["courseId"] or "other"
        labels = sorted({version_label(row["relativePath"]) for row in primary_rows})
        needs_review = len(labels) > 1 and ("old" in labels or "older" in labels or "alternate" in labels)
        title = clean_title(Path(primary["relativePath"]))
        title_cache = extraction_cache.get(extraction_cache_key(primary)) if re.fullmatch(r"[0-9a-f]{64}", primary["sha256"]) else None
        display_title = normalized_display_title(title, title_cache)
        series = source_series_for(primary, title, display_title)
        if series and re.match(r"^\s*\d+\s*[.-]\s*", display_title):
            display_title = re.sub(r"^\s*\d+\s*[.-]\s*", "", display_title).strip()
        document_topics = topics_for(title, " ".join(row["relativePath"] for row in group_rows))
        topic_ids.update(document_topics)
        document = {
            "id": document_id,
            "title": title,
            "displayTitle": display_title,
            "courseId": course_id,
            "course": COURSES[course_id]["name"],
            "courseOfferingId": f"offering-{course_id}" if COURSES[course_id].get("offering") else None,
            "documentType": primary["documentType"],
            "artifactRole": primary["artifactRole"],
            "topics": document_topics,
            "visibility": "private",
            "needsReview": needs_review,
            "versionIds": [],
            "representationIds": [],
            "sourceFilenames": [row["filename"] for row in group_rows],
            "modifiedAt": max(row["modifiedAt"] for row in group_rows),
            "url": f"/os/?view=document&id={document_id}",
            **series,
        }
        course_document_counts[course_id] += 1

        label_groups: dict[str, list[dict]] = defaultdict(list)
        for row in primary_rows:
            label_groups[version_label(row["relativePath"])].append(row)
        for label, version_rows in sorted(label_groups.items()):
            version_id = stable_id("version", f"{group_key}:{label}")
            version = {
                "id": version_id,
                "documentId": document_id,
                "label": label,
                "isCanonical": label == "current" and not needs_review,
                "needsReview": needs_review,
                "representationIds": [],
            }
            for row in sorted(version_rows, key=lambda item: item["filename"].casefold()):
                representation_id = stable_id("representation", row["relativePath"])
                representation = {
                    "id": representation_id,
                    "documentId": document_id,
                    "documentVersionId": version_id,
                    "fileBlobId": row["id"],
                    "format": row["extension"].lstrip(".").upper() or "FILE",
                    "mimeType": row["mimeType"],
                    "filename": row["filename"],
                    "size": row["size"],
                    "previewKind": "pdf" if row["extension"] == ".pdf" else "markdown" if row["extension"] == ".md" else "download",
                }
                representations.append(representation)
                version["representationIds"].append(representation_id)
                document["representationIds"].append(representation_id)
                row["documentGroup"] = document_id
                row["versionGroup"] = version_id
                row["representationGroup"] = representation_id
            versions.append(version)
            document["versionIds"].append(version_id)

        for row in group_rows:
            if row["artifactRole"] == "attachment":
                row["documentGroup"] = document_id
                row["versionGroup"] = document["versionIds"][0]
                row["representationGroup"] = stable_id("asset", row["relativePath"])
                row["textExtractionStatus"] = "attached"

        extraction_row = primary_rows[0]
        cache_key = extraction_cache_key(extraction_row)
        used_cache_keys.add(cache_key)
        cached = None if force_extraction or extraction_row["sha256"] == "skipped" else extraction_cache.get(cache_key)
        if skip_extraction:
            status = "skipped"
            passage_templates = []
        elif cached:
            status = cached["status"]
            passage_templates = cached.get("passages", [])
            extraction_hits += 1
        else:
            extraction_misses += 1
            item_started_at = time.monotonic()
            print(
                f"[extract] {document_number}/{document_total} current={extraction_row['relativePath']} cache=miss elapsed={time.monotonic() - extraction_started_at:.1f}s",
                file=sys.stderr,
            )
            sections, status = extract_sections(Path(extraction_row["path"]))
            passage_templates = passage_templates_from_sections(sections, extraction_row["extension"])
            print(
                f"[extract] completed current={extraction_row['relativePath']} status={status} passages={len(passage_templates)} fileElapsed={time.monotonic() - item_started_at:.1f}s",
                file=sys.stderr,
            )
            if status != "failed" and extraction_row["sha256"] != "skipped":
                cached = {
                    "key": cache_key,
                    "schemaVersion": EXTRACTION_SCHEMA_VERSION,
                    "extractorVersion": EXTRACTOR_VERSION,
                    "sha256": extraction_row["sha256"],
                    "modifiedAt": extraction_row["modifiedAt"],
                    "size": extraction_row["size"],
                    "extension": extraction_row["extension"],
                    "status": status,
                    "passages": passage_templates,
                }
                extraction_cache[cache_key] = cached
                if cache_path:
                    append_extraction_cache(cache_path, cached)
        if cached and (document_number % 25 == 0 or document_number == document_total):
            print(
                f"[extract] {document_number}/{document_total} current={extraction_row['relativePath']} cache-hit={extraction_hits} cache-miss={extraction_misses} elapsed={time.monotonic() - extraction_started_at:.1f}s",
                file=sys.stderr,
            )
        extraction_row["textExtractionStatus"] = status
        for row in primary_rows[1:]:
            row["textExtractionStatus"] = "covered-by-representation" if row["extension"] != extraction_row["extension"] else "not-selected"
        for template_number, template in enumerate(passage_templates):
            location = dict(template["location"])
            location_number = location.get("page") or location.get("slide") or template_number + 1
            passages.append({
                "id": f"{document_id}:{location_number}:{location.get('chunkIndex', 0)}",
                "documentId": document_id,
                "section": template["section"],
                "breadcrumb": [document["course"], template["section"]],
                "text": template["text"],
                "url": f"/os/?view=document&id={document_id}&location={location_number}",
                "location": location,
            })
        documents.append(document)

    courses = []
    offerings = []
    for course_id, count in sorted(course_document_counts.items(), key=lambda item: COURSES[item[0]]["name"]):
        definition = COURSES[course_id]
        offering = definition.get("offering")
        courses.append({
            "id": course_id,
            "name": definition["name"],
            "englishName": definition.get("englishName"),
            "teacher": definition.get("teacher"),
            "offeringIds": [f"offering-{course_id}"] if offering else [],
            "documentCount": count,
            "documentIds": [document["id"] for document in documents if document["courseId"] == course_id],
            "topics": sorted({topic for document in documents if document["courseId"] == course_id for topic in document["topics"]}),
        })
        if offering:
            offerings.append({"id": f"offering-{course_id}", "courseId": course_id, **offering, "teacher": definition.get("teacher")})

    collections = [
        {"id": "lecture-materials", "name": "Lecture Materials", "documentIds": [doc["id"] for doc in documents if doc["documentType"] in {"lecture-note", "lecture-slide"}]},
        {"id": "books-and-references", "name": "Books & References", "documentIds": [doc["id"] for doc in documents if doc["documentType"] in {"textbook", "reference-book", "reference"}]},
        {"id": "focus-courses", "name": "Focus Courses", "documentIds": [doc["id"] for doc in documents if doc["courseId"] in {"machine-learning-theory", "mathematical-statistics", "numerical-pde", "natural-language-processing", "probability-theory"}]},
    ]
    for document in documents:
        for collection in collections:
            if document["id"] in collection["documentIds"]:
                relations.append({"id": stable_id("relation", f"{document['id']}:{collection['id']}"), "fromId": document["id"], "toId": collection["id"], "type": "member-of"})
    catalog = {
        "version": INDEX_VERSION,
        "scope": "private",
        "generatedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "entities": {
            "documents": documents,
            "documentVersions": versions,
            "representations": representations,
            "courses": courses,
            "courseOfferings": offerings,
            "collections": collections,
            "topics": [{"id": topic, "name": topic.replace("-", " ").title()} for topic in sorted(topic_ids)],
            "relations": relations,
        },
    }
    index_documents = [{
        "id": doc["id"],
        "sourceType": "course-material",
        "contentType": doc["documentType"],
        "title": doc["displayTitle"],
        "subtitle": doc["course"],
        "url": doc["url"],
        "categories": [doc["course"], doc["documentType"], doc["title"], *doc["sourceFilenames"]],
        "tags": doc["topics"],
        "course": doc["course"],
        "courseId": doc["courseId"],
        "documentType": doc["documentType"],
        "visibility": "private",
    } for doc in documents]
    payload_for_hash = json.dumps({"documents": index_documents, "passages": passages}, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
    private_index = {
        "version": INDEX_VERSION,
        "scope": "private",
        "generatedAt": catalog["generatedAt"],
        "documentCount": len(index_documents),
        "passageCount": len(passages),
        "contentHash": hashlib.sha256(payload_for_hash.encode("utf-8")).hexdigest(),
        "documents": index_documents,
        "passages": passages,
    }
    extraction_cache = {key: entry for key, entry in extraction_cache.items() if key in used_cache_keys}
    cache_stats = {
        "hits": extraction_hits,
        "misses": extraction_misses,
        "entries": len(extraction_cache),
        "elapsedSeconds": round(time.monotonic() - extraction_started_at, 3),
        "extractorVersion": EXTRACTOR_VERSION,
        "schemaVersion": EXTRACTION_SCHEMA_VERSION,
    }
    return catalog, private_index, extraction_cache, cache_stats


def write_json(path: Path, payload: object) -> None:
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def bootstrap_extraction_cache(output_root: Path) -> dict:
    """Create the first cache from a previously completed manifest/index.

    This performs no source-file parsing. It preserves the already extracted
    passage payload and associates it with the selected representation's hash,
    mtime, size, and extractor/schema versions.
    """
    manifest_path = output_root / "import-manifest.jsonl"
    index_path = output_root / "private-search-index.json"
    if not manifest_path.is_file() or not index_path.is_file():
        raise SystemExit("A completed import-manifest.jsonl and private-search-index.json are required to bootstrap the cache")
    rows = load_jsonl(manifest_path)
    private_index = json.loads(index_path.read_text(encoding="utf-8"))
    passages_by_document: dict[str, list[dict]] = defaultdict(list)
    for passage in private_index.get("passages", []):
        passages_by_document[passage["documentId"]].append(passage)
    selected_statuses = {"extracted", "partial", "no-text", "unsupported"}
    cache = {}
    skipped = []
    for row in rows:
        if row.get("textExtractionStatus") not in selected_statuses or not row.get("documentGroup"):
            continue
        if not re.fullmatch(r"[0-9a-f]{64}", str(row.get("sha256", ""))):
            skipped.append(row.get("relativePath"))
            continue
        templates = [{
            "section": passage["section"],
            "text": passage["text"],
            "location": passage.get("location", {}),
        } for passage in passages_by_document.get(row["documentGroup"], [])]
        key = extraction_cache_key(row)
        cache[key] = {
            "key": key,
            "schemaVersion": EXTRACTION_SCHEMA_VERSION,
            "extractorVersion": EXTRACTOR_VERSION,
            "sha256": row["sha256"],
            "modifiedAt": row["modifiedAt"],
            "size": row["size"],
            "extension": row["extension"],
            "status": row["textExtractionStatus"],
            "passages": templates,
        }
    document_count = private_index.get("documentCount", 0)
    if len(cache) != document_count:
        raise SystemExit(f"Cache bootstrap is incomplete: expected {document_count} selected representations, got {len(cache)}; skipped={len(skipped)}")
    cache_path = output_root / CACHE_FILENAME
    write_extraction_cache(cache_path, cache)
    result = {
        "cachePath": str(cache_path),
        "entries": len(cache),
        "passages": sum(len(entry["passages"]) for entry in cache.values()),
        "extractorVersion": EXTRACTOR_VERSION,
        "schemaVersion": EXTRACTION_SCHEMA_VERSION,
        "sourceParsingPerformed": False,
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return result


def verify_existing_cache(output_root: Path) -> dict:
    """Verify incremental reuse without hashing or extracting source content."""
    rows = load_jsonl(output_root / "import-manifest.jsonl")
    cache = load_extraction_cache(output_root / CACHE_FILENAME)
    hash_reusable = 0
    source_changed = []
    extraction_hits = 0
    extraction_misses = []
    selected_statuses = {"extracted", "partial", "no-text", "unsupported"}
    for row in rows:
        path = Path(row["path"])
        try:
            stat = path.stat()
        except OSError:
            source_changed.append(row["relativePath"])
            continue
        unchanged = stat.st_size == row["size"] and iso_time(stat.st_mtime) == row["modifiedAt"]
        if unchanged and re.fullmatch(r"[0-9a-f]{64}", str(row.get("sha256", ""))):
            hash_reusable += 1
        else:
            source_changed.append(row["relativePath"])
        if row.get("textExtractionStatus") in selected_statuses:
            if unchanged and extraction_cache_key(row) in cache:
                extraction_hits += 1
            else:
                extraction_misses.append(row["relativePath"])
    result = {
        "manifestRows": len(rows),
        "hashReusable": hash_reusable,
        "sourceChanged": len(source_changed),
        "extractionCacheEntries": len(cache),
        "extractionHits": extraction_hits,
        "extractionMisses": len(extraction_misses),
        "sourceParsingPerformed": False,
        "changedExamples": source_changed[:5],
        "missExamples": extraction_misses[:5],
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return result


def required_extraction_cache_misses(rows: list[dict], cache: dict[str, dict]) -> list[str]:
    groups: dict[str, list[dict]] = defaultdict(list)
    for row in rows:
        if row["importPolicy"] == "include":
            groups[logical_key(row)].append(row)
    misses = []
    for group_rows in groups.values():
        primary_rows = [row for row in group_rows if row["artifactRole"] != "attachment"]
        if not primary_rows:
            continue
        primary_rows.sort(key=lambda row: (version_label(row["relativePath"]) != "current", row["extension"] != ".pdf", -row["size"], row["filename"].casefold()))
        selected = primary_rows[0]
        if extraction_cache_key(selected) not in cache:
            misses.append(selected["relativePath"])
    return sorted(misses)


def main() -> int:
    global SOURCE_ROOT
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=Path, default=SOURCE_ROOT)
    parser.add_argument("--output", type=Path, default=OUTPUT_ROOT)
    parser.add_argument("--skip-hash", action="store_true")
    parser.add_argument("--skip-extraction", action="store_true")
    parser.add_argument("--bootstrap-cache-only", action="store_true")
    parser.add_argument("--verify-cache-only", action="store_true")
    parser.add_argument("--force-extraction", action="store_true")
    parser.add_argument("--no-cache", action="store_true")
    parser.add_argument("--require-cache", action="store_true", help="Fail before catalog build if any selected representation would need extraction")
    parser.add_argument("--allow-count-mismatch", action="store_true")
    args = parser.parse_args()
    SOURCE_ROOT = args.source.resolve()
    output_root = args.output.resolve()
    output_root.mkdir(parents=True, exist_ok=True)
    if args.bootstrap_cache_only:
        bootstrap_extraction_cache(output_root)
        return 0
    if args.verify_cache_only:
        result = verify_existing_cache(output_root)
        return 0 if result["sourceChanged"] == 0 and result["extractionMisses"] == 0 else 2
    if not SOURCE_ROOT.is_dir():
        raise SystemExit(f"Course materials root not found: {SOURCE_ROOT}")

    previous_rows = {row["relativePath"]: row for row in load_jsonl(output_root / "import-manifest.jsonl") if row.get("relativePath")}
    rows, before, hash_cache_stats = scan_files(args.skip_hash, previous_rows)
    counts = Counter(row["importPolicy"] for row in rows)
    print(f"[manifest] policy counts: {dict(counts)}", file=sys.stderr)
    if not args.allow_count_mismatch and dict(counts) != EXPECTED_COUNTS:
        raise SystemExit(f"Classification mismatch: expected {EXPECTED_COUNTS}, got {dict(counts)}")

    cache_path = output_root / CACHE_FILENAME
    extraction_cache = {} if args.no_cache else load_extraction_cache(cache_path)
    if args.require_cache:
        misses = required_extraction_cache_misses(rows, extraction_cache)
        if misses:
            raise SystemExit(f"Extraction cache preflight failed: {len(misses)} misses; first={misses[0]}")
    catalog, private_index, extraction_cache, extraction_cache_stats = build_catalog(
        rows,
        args.skip_extraction,
        extraction_cache=extraction_cache,
        cache_path=None if args.no_cache else cache_path,
        force_extraction=args.force_extraction,
    )
    after = snapshot([Path(row["path"]) for row in rows])
    source_unchanged = before == after
    if not source_unchanged:
        raise SystemExit("Source snapshot changed during the read-only scan")

    review_rows = [{
        "id": row["id"],
        "filename": row["filename"],
        "relativePath": row["relativePath"],
        "candidateType": row["documentType"],
        "candidateCourse": row["course"],
        "reason": row["decisionReason"],
        "confidence": row["confidence"],
        "integrityStatus": row["integrityStatus"],
    } for row in rows if row["importPolicy"] == "review"]
    summary_payload = {
        "version": INDEX_VERSION,
        "scope": "private",
        "generatedAt": catalog["generatedAt"],
        "sourceRoot": str(SOURCE_ROOT),
        "total": len(rows),
        "include": counts["include"],
        "exclude": counts["exclude"],
        "review": counts["review"],
        "closed": sum(counts.values()) == len(rows),
        "expectedCountsMatch": dict(counts) == EXPECTED_COUNTS,
        "sourceUnchanged": source_unchanged,
        "totalBytes": sum(row["size"] for row in rows),
        "documentCount": len(catalog["entities"]["documents"]),
        "documentVersionCount": len(catalog["entities"]["documentVersions"]),
        "representationCount": len(catalog["entities"]["representations"]),
        "courseCount": len(catalog["entities"]["courses"]),
        "collectionCount": len(catalog["entities"]["collections"]),
        "passageCount": private_index["passageCount"],
        "cache": {"hash": hash_cache_stats, "extraction": extraction_cache_stats},
        "integrity": dict(Counter(row["integrityStatus"] for row in rows)),
        "extraction": dict(Counter(row["textExtractionStatus"] for row in rows)),
        "policyByCourse": {course: dict(policy_counts) for course, policy_counts in sorted({course: Counter(item["importPolicy"] for item in rows if (item["course"] or "Unassigned") == course) for course in {row["course"] or "Unassigned" for row in rows}}.items())},
    }

    manifest_path = output_root / "import-manifest.jsonl"
    with manifest_path.open("w", encoding="utf-8", newline="\n") as handle:
        for row in rows:
            handle.write(json.dumps(row, ensure_ascii=False, sort_keys=True) + "\n")
    write_json(output_root / "import-summary.json", summary_payload)
    write_json(output_root / "review-queue.json", {"version": INDEX_VERSION, "scope": "private", "count": len(review_rows), "items": review_rows})
    write_json(output_root / "catalog.json", catalog)
    write_json(output_root / "private-search-index.json", private_index)
    if not args.no_cache:
        write_extraction_cache(cache_path, extraction_cache)
    print(json.dumps(summary_payload, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
