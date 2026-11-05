import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v314.0.5/full/pyodide.mjs";

const PYODIDE_VERSION = "314.0.5";
const RUNTIME_ROOT = "/isaac-runtime";
let runtimePromise = null;

function sendProgress(requestId, phase, message) {
  self.postMessage({ type: "progress", requestId, phase, message });
}

async function sha256Hex(buffer) {
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(digest), (value) => value.toString(16).padStart(2, "0")).join("");
}

async function createRuntime(manifestUrl, requestId) {
  sendProgress(requestId, "manifest", "Checking the bundled generator…");
  const manifestResponse = await fetch(manifestUrl, { cache: "no-cache" });
  if (!manifestResponse.ok) {
    throw new Error(`Generator manifest request failed (${manifestResponse.status})`);
  }
  const manifest = await manifestResponse.json();
  if (manifest.pyodide_version !== PYODIDE_VERSION) {
    throw new Error("Generator runtime and Pyodide versions do not match");
  }

  const wheelUrl = new URL(manifest.wheel, manifestUrl).href;
  sendProgress(requestId, "download", "Loading Python and the exact generator…");
  const [pyodide, wheelResponse] = await Promise.all([
    loadPyodide({
      indexURL: `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`,
    }),
    fetch(wheelUrl, { cache: "force-cache" }),
  ]);
  if (!wheelResponse.ok) {
    throw new Error(`Generator wheel request failed (${wheelResponse.status})`);
  }
  const wheel = await wheelResponse.arrayBuffer();
  const actualHash = await sha256Hex(wheel);
  if (actualHash !== manifest.wheel_sha256) {
    throw new Error("Generator wheel integrity check failed");
  }

  sendProgress(requestId, "prepare", "Preparing the recovered floor pipelines…");
  pyodide.unpackArchive(new Uint8Array(wheel), "wheel", { extractDir: RUNTIME_ROOT });
  pyodide.runPython(`
import sys
import types
if "${RUNTIME_ROOT}" not in sys.path:
    sys.path.insert(0, "${RUNTIME_ROOT}")
from isaacmap.preview import generate_preview
from isaacmap.seed import encode_seed
# The desktop UI package initializer imports Pillow/Tk. The browser needs only
# its pure presentation model, so expose the package path without running that
# desktop-only initializer.
_ui = types.ModuleType("isaacmap.ui")
_ui.__path__ = ["${RUNTIME_ROOT}/isaacmap/ui"]
sys.modules["isaacmap.ui"] = _ui
from isaacmap.ui.models import preview_to_dict
`);
  return { pyodide, manifest };
}

function getRuntime(manifestUrl, requestId) {
  if (!runtimePromise) {
    runtimePromise = createRuntime(manifestUrl, requestId).catch((error) => {
      runtimePromise = null;
      throw error;
    });
  }
  return runtimePromise;
}

const GENERATE_PYTHON = `
import json

_request = json.loads(__isaac_request_json)
_seed = _request.get("seed")
if _request.get("random_value") is not None:
    _seed = encode_seed(int(_request["random_value"]) & 0xFFFFFFFF)
_preview = generate_preview(
    _seed,
    _request["difficulty"],
    _request["floor"],
)
json.dumps(preview_to_dict(_preview), ensure_ascii=False, separators=(",", ":"))
`;

self.addEventListener("message", async (event) => {
  const request = event.data || {};
  const requestId = request.requestId;
  if (request.action !== "generate" || typeof request.manifestUrl !== "string") {
    self.postMessage({ type: "error", requestId, message: "Unsupported worker request" });
    return;
  }

  try {
    const { pyodide, manifest } = await getRuntime(request.manifestUrl, requestId);
    sendProgress(requestId, "generate", `Generating ${request.floor} with Python…`);
    pyodide.globals.set("__isaac_request_json", JSON.stringify({
      seed: request.seed,
      random_value: request.randomValue ?? null,
      difficulty: request.difficulty,
      floor: request.floor,
    }));
    let resultJson;
    try {
      resultJson = pyodide.runPython(GENERATE_PYTHON);
    } finally {
      pyodide.globals.delete("__isaac_request_json");
    }
    self.postMessage({
      type: "result",
      requestId,
      result: JSON.parse(resultJson),
      runtime: {
        sourceCommit: manifest.source_commit,
        pyodideVersion: manifest.pyodide_version,
      },
    });
  } catch (error) {
    const detail = String(error?.message || error || "Unknown generator error");
    self.postMessage({
      type: "error",
      requestId,
      message: detail.split("\n").filter(Boolean).at(-1) || "Generator failed",
    });
  }
});
