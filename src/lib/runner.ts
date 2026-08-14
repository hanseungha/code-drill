import { matches } from "./compare";
import type { Language, Problem, TestCase } from "./types";

/** Wall-clock budget for the tests themselves, measured after the runtime is ready. */
const RUN_TIMEOUT_MS = 8000;
/** Pyodide has to download a few MB of WebAssembly the first time. */
const LOAD_TIMEOUT_MS = 90000;

const WORKER_URL: Record<Language, string> = {
  javascript: "/workers/js-runner.js",
  python: "/workers/py-runner.js",
};

/** Raw per-test payload posted back by a worker. */
interface TestOutcome {
  ok: boolean;
  json?: string;
  undef?: boolean;
  error?: string;
  stdout: string;
  ms: number;
}

export interface TestResult {
  index: number;
  passed: boolean;
  hidden: boolean;
  input: unknown[];
  expected: unknown;
  actual: unknown;
  /** The function ran but returned nothing — usually an unfinished stub. */
  returnedNothing: boolean;
  error?: string;
  stdout: string;
  ms: number;
}

export type RunOutcome =
  | { status: "ok"; results: TestResult[]; passed: number; total: number }
  | { status: "fatal"; message: string }
  | { status: "timeout"; completed: number; total: number };

export type RunStage = "starting" | "loading-runtime" | "running";

export interface RunOptions {
  problem: Problem;
  language: Language;
  code: string;
  /** `run` uses only the visible cases; `submit` adds the hidden ones. */
  mode: "run" | "submit";
  onStage?: (stage: RunStage) => void;
}

/**
 * Pyodide costs seconds to boot, so its worker is kept alive between runs.
 * The JS worker is disposable — a fresh one guarantees clean globals.
 */
let pythonWorker: Worker | null = null;
/**
 * The worker announces readiness once, which may happen before any run starts.
 * Tracking it here means a later run still knows the runtime is already up.
 */
let pythonReady = false;

function acquireWorker(language: Language): Worker {
  if (language === "javascript") {
    return new Worker(WORKER_URL.javascript);
  }
  if (!pythonWorker) {
    pythonReady = false;
    // Pyodide 314 only starts inside a module worker.
    const worker = new Worker(WORKER_URL.python, { type: "module" });
    worker.addEventListener("message", (event: MessageEvent) => {
      if (event.data?.type === "status" && event.data.stage === "ready") {
        pythonReady = true;
      }
    });
    pythonWorker = worker;
  }
  return pythonWorker;
}

function releaseWorker(language: Language, worker: Worker, kill: boolean) {
  if (language === "javascript" || kill) {
    worker.terminate();
    if (worker === pythonWorker) {
      pythonWorker = null;
      pythonReady = false;
    }
  }
}

/** Boot the Python runtime ahead of the first 실행 so the wait is not blocking. */
export function warmUp(language: Language) {
  if (typeof window === "undefined" || language !== "python") return;
  acquireWorker("python");
}

function toResult(
  outcome: TestOutcome,
  test: TestCase,
  index: number,
  problem: Problem,
): TestResult {
  const base = {
    index,
    hidden: Boolean(test.hidden),
    input: test.input,
    expected: test.expected,
    stdout: outcome.stdout ?? "",
    ms: outcome.ms ?? 0,
  };

  if (!outcome.ok) {
    return {
      ...base,
      passed: false,
      actual: undefined,
      returnedNothing: false,
      error: outcome.error,
    };
  }
  if (outcome.undef) {
    return { ...base, passed: false, actual: undefined, returnedNothing: true };
  }

  let actual: unknown;
  try {
    actual = JSON.parse(outcome.json ?? "null");
  } catch {
    return {
      ...base,
      passed: false,
      actual: undefined,
      returnedNothing: false,
      error: "반환값을 읽을 수 없습니다. 순환 참조가 있는지 확인하세요.",
    };
  }

  return {
    ...base,
    actual,
    returnedNothing: false,
    passed: matches(actual, test.expected, problem.compare ?? "exact"),
  };
}

export function runTests(options: RunOptions): Promise<RunOutcome> {
  const { problem, language, code, mode, onStage } = options;
  const tests = problem.testCases.filter(
    (t) => mode === "submit" || !t.hidden,
  );

  return new Promise<RunOutcome>((resolve) => {
    const worker = acquireWorker(language);
    let settled = false;
    let completed = 0;
    // JavaScript is ready the moment the worker exists; Python may already be
    // warm from an earlier run or from warmUp().
    let runtimeReady = language === "javascript" || pythonReady;
    let timer: ReturnType<typeof setTimeout>;

    const finish = (outcome: RunOutcome, kill: boolean) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      worker.removeEventListener("message", onMessage);
      worker.removeEventListener("error", onError);
      releaseWorker(language, worker, kill);
      resolve(outcome);
    };

    const armTimer = (ms: number) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        finish(
          runtimeReady
            ? { status: "timeout", completed, total: tests.length }
            : {
                status: "fatal",
                message:
                  "Python 런타임을 불러오는 데 너무 오래 걸립니다. 네트워크 상태를 확인하고 다시 시도하세요.",
              },
          true,
        );
      }, ms);
    };

    function onMessage(event: MessageEvent) {
      const data = event.data;
      if (data.type === "status") {
        if (data.stage === "loading") {
          onStage?.("loading-runtime");
        } else if (data.stage === "ready") {
          runtimeReady = true;
          onStage?.("running");
          armTimer(RUN_TIMEOUT_MS);
        }
        return;
      }
      if (data.type === "progress") {
        completed = data.index + 1;
        return;
      }
      if (data.type === "fatal") {
        finish({ status: "fatal", message: data.message }, true);
        return;
      }
      if (data.type === "done") {
        const results = (data.results as TestOutcome[]).map((outcome, i) =>
          toResult(outcome, tests[i], i, problem),
        );
        finish(
          {
            status: "ok",
            results,
            passed: results.filter((r) => r.passed).length,
            total: results.length,
          },
          false,
        );
      }
    }

    function onError(event: ErrorEvent) {
      finish(
        {
          status: "fatal",
          message: event.message || "실행기를 시작하지 못했습니다.",
        },
        true,
      );
    }

    worker.addEventListener("message", onMessage);
    worker.addEventListener("error", onError);

    if (runtimeReady) onStage?.("running");
    else onStage?.(language === "python" ? "loading-runtime" : "starting");
    armTimer(runtimeReady ? RUN_TIMEOUT_MS : LOAD_TIMEOUT_MS);
    worker.postMessage({
      code,
      entry: problem.entry[language],
      tests,
      argShapes: problem.argShapes ?? null,
      returnShape: problem.returnShape ?? null,
    });
  });
}
