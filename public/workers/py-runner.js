/**
 * Python grader. Pyodide compiles CPython to WebAssembly, so submissions run
 * entirely in the browser — no execution backend to host or pay for.
 *
 * This must run as a module worker (`new Worker(url, { type: "module" })`):
 * Pyodide 314 refuses to start in a classic worker, and importScripts() cannot
 * pull the runtime from the CDN anyway. The import is dynamic so the worker can
 * report "loading" before the multi-megabyte download begins.
 *
 * Same protocol as js-runner.js, plus a "status" message because the runtime
 * takes a few seconds to download on first use.
 *
 * Protocol
 *   in : { code, entry, tests: [{ input: unknown[] }] }
 *   out: { type: "status", stage: "loading" | "ready" }
 *        { type: "progress", index }
 *        { type: "done", results: TestOutcome[] }
 *        { type: "fatal", message }
 */

const PYODIDE_VERSION = "314.0.3";
const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

const HARNESS = String.raw`
import io, json, sys, time, traceback

_CD_MAX_LOG = 4000

def __cd_sanitize(v, depth=0):
    if v is None or isinstance(v, (bool, str, int)):
        return v
    if isinstance(v, float):
        if v != v:
            return "NaN"
        if v == float("inf"):
            return "Infinity"
        if v == float("-inf"):
            return "-Infinity"
        return v
    if depth > 6:
        return str(v)
    if isinstance(v, (list, tuple, set, frozenset)):
        return [__cd_sanitize(x, depth + 1) for x in v]
    if isinstance(v, dict):
        return {str(k): __cd_sanitize(x, depth + 1) for k, x in v.items()}
    return str(v)

def __cd_prepare(code, entry):
    # Drop a previous submission's function so a renamed one can't pass on stale state.
    globals().pop(entry, None)
    exec(compile(code, "solution.py", "exec"), globals())

def __cd_run(entry, tests_json, on_progress):
    fn = globals().get(entry)
    if not callable(fn):
        return json.dumps({"fatal": "MISSING_ENTRY"})

    tests = json.loads(tests_json)
    out = []
    for i, t in enumerate(tests):
        buf = io.StringIO()
        real_stdout = sys.stdout
        sys.stdout = buf
        started = time.perf_counter()
        try:
            returned = fn(*t["input"])
            ms = (time.perf_counter() - started) * 1000
            sys.stdout = real_stdout
            row = {"stdout": buf.getvalue()[:_CD_MAX_LOG], "ms": ms, "ok": True}
            if returned is None:
                row["undef"] = True
            else:
                row["json"] = json.dumps(__cd_sanitize(returned))
            out.append(row)
        except BaseException as e:
            ms = (time.perf_counter() - started) * 1000
            sys.stdout = real_stdout
            # tb_next skips this harness frame so the trace starts in solution.py.
            tb = e.__traceback__
            if tb is not None and tb.tb_next is not None:
                tb = tb.tb_next
            out.append({
                "ok": False,
                "error": "".join(traceback.format_exception(type(e), e, tb)).strip(),
                "stdout": buf.getvalue()[:_CD_MAX_LOG],
                "ms": ms,
            })
        finally:
            sys.stdout = real_stdout
        on_progress(i)
    return json.dumps({"results": out})
`;

let pyodidePromise = null;

function getPyodide() {
  if (!pyodidePromise) {
    self.postMessage({ type: "status", stage: "loading" });
    pyodidePromise = import(`${PYODIDE_BASE}pyodide.mjs`)
      .then(({ loadPyodide }) => loadPyodide({ indexURL: PYODIDE_BASE }))
      .then((py) => {
        py.runPython(HARNESS);
        self.postMessage({ type: "status", stage: "ready" });
        return py;
      });
  }
  return pyodidePromise;
}

// Warm the runtime as soon as the worker exists so the first 실행 is not the
// one that pays the download cost.
getPyodide().catch(() => {
  /* surfaced on the next run */
});

self.onmessage = async (event) => {
  const { code, entry, tests } = event.data;

  let py;
  try {
    py = await getPyodide();
  } catch (err) {
    pyodidePromise = null;
    self.postMessage({
      type: "fatal",
      message: `Python 런타임을 불러오지 못했습니다. 네트워크를 확인하고 다시 시도하세요.\n${String(err)}`,
    });
    return;
  }

  try {
    py.globals.get("__cd_prepare")(code, entry);
  } catch (err) {
    self.postMessage({
      type: "fatal",
      message: `코드를 실행할 수 없습니다.\n${cleanPyError(err)}`,
    });
    return;
  }

  const onProgress = (index) => self.postMessage({ type: "progress", index });

  let raw;
  try {
    raw = py.globals.get("__cd_run")(
      entry,
      JSON.stringify(tests),
      onProgress,
    );
  } catch (err) {
    self.postMessage({
      type: "fatal",
      message: `채점 중 오류가 발생했습니다.\n${cleanPyError(err)}`,
    });
    return;
  }

  const parsed = JSON.parse(raw);
  if (parsed.fatal === "MISSING_ENTRY") {
    self.postMessage({
      type: "fatal",
      message: `\`${entry}\` 함수를 찾을 수 없습니다. 함수 이름을 그대로 두었는지 확인하세요.`,
    });
    return;
  }

  self.postMessage({ type: "done", results: parsed.results });
};

/** Pyodide wraps Python errors with JS frames that mean nothing to the user. */
function cleanPyError(err) {
  const text = err && err.message ? err.message : String(err);
  const lines = text.split("\n").filter((l) => !l.includes("pyodide.asm"));
  const start = lines.findIndex((l) => l.includes("solution.py"));
  const trimmed = start > 0 ? lines.slice(start) : lines;
  return trimmed.join("\n").trim();
}
