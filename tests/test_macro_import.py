import json
import subprocess
import sys
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class MacroImportTests(unittest.TestCase):
    def test_file_loader_registers_catalog_without_project_on_import_path(self):
        paths = [
            str(Path(entry or Path.cwd()).resolve())
            for entry in sys.path
            if Path(entry or Path.cwd()).resolve() != ROOT
        ]
        script = r'''
import json
import sys
from types import SimpleNamespace

sys.path[:] = json.loads(sys.argv[2])
from mkdocs_macros.util import import_local_module

module = import_local_module(sys.argv[1], 'main')
macros = {}
module.define_env(SimpleNamespace(macro=lambda function: macros.setdefault(function.__name__, function)))
assert {'blog_catalog', 'recent_posts', 'tag_explorer', 'lab_catalog'} <= macros.keys()
assert 'zdd-blog-catalog' in macros['blog_catalog']()
'''
        result = subprocess.run(
            [sys.executable, '-B', '-c', script, str(ROOT), json.dumps(paths)],
            cwd=ROOT.parent,
            capture_output=True,
            text=True,
            encoding='utf-8',
            timeout=30,
        )
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)


if __name__ == '__main__':
    unittest.main()
