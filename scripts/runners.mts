/**
 * Runs a solution against a problem's inputs using the *actual* grader code
 * that ships to the browser — js-runner.js under node:vm, and the Python
 * harness extracted from py-runner.js under the local python3.
 *
 * A library, not a command. Two scripts need it and they need it to behave
 * identically: `npm run verify` checks that the reference solutions still pass,
 * and `npm run author` derives the expected values from them. Neither
 * reimplements a grader, so a grader bug surfaces on the command line rather
 * than only in the browser.
 */
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createContext, runInContext } from "node:vm";
import type { Language, Problem } from "../src/lib/types";

const ROOT = join(import.meta.dirname, "..");
const JS_WORKER = join(ROOT, "public/workers/js-runner.js");
const PY_WORKER = join(ROOT, "public/workers/py-runner.js");
const PY_SENTINEL = "__CD_RESULT__";

export interface Outcome {
  ok: boolean;
  /** The returned value, JSON encoded. Absent when `ok` is false. */
  json?: string;
  /** The function returned nothing. */
  undef?: boolean;
  error?: string;
  stdout: string;
  ms: number;
}

/** What a grader needs to know about a problem — the answer is not part of it. */
type Runnable = Pick<Problem, "entry" | "testCases" | "argShapes" | "returnShape">;

function payload(problem: Runnable) {
  return {
    tests: problem.testCases.map((t) => ({ input: t.input })),
    argShapes: problem.argShapes ?? null,
    returnShape: problem.returnShape ?? null,
  };
}

function runJavaScript(problem: Runnable, code: string): Promise<Outcome[]> {
  const source = readFileSync(JS_WORKER, "utf8");

  return new Promise((resolve, reject) => {
    const sandbox: Record<string, unknown> = {};
    sandbox.globalThis = sandbox;
    sandbox.self = sandbox;
    sandbox.console = console;
    sandbox.performance = performance;
    sandbox.structuredClone = structuredClone;
    sandbox.postMessage = (message: { type: string; results?: Outcome[]; message?: string }) => {
      if (message.type === "done") resolve(message.results ?? []);
      if (message.type === "fatal") reject(new Error(message.message));
    };

    const context = createContext(sandbox);
    runInContext(source, context, { filename: "js-runner.js" });

    const onmessage = sandbox.onmessage as (event: { data: unknown }) => void;
    void onmessage({
      data: { code, entry: problem.entry.javascript, ...payload(problem) },
    });
  });
}

/** The Python side of the grader lives inside py-runner.js as a raw string. */
function extractHarness(): string {
  const source = readFileSync(PY_WORKER, "utf8");
  const match = source.match(/const HARNESS = String\.raw`([\s\S]*?)`;/);
  if (!match) {
    throw new Error("py-runner.js에서 HARNESS 블록을 찾지 못했습니다.");
  }
  return match[1];
}

function runPython(problem: Runnable, code: string): Outcome[] {
  const driver = `${extractHarness()}

import sys as __cd_sys

__cd_payload = json.loads(__cd_sys.stdin.read())
__cd_prepare(__cd_payload["code"], __cd_payload["entry"])
__cd_out = __cd_run(
    __cd_payload["entry"],
    json.dumps(__cd_payload["payload"]),
    lambda _i: None,
)
__cd_sys.stderr.write("${PY_SENTINEL}" + __cd_out)
`;

  const result = spawnSync("python3", ["-c", driver], {
    input: JSON.stringify({
      code,
      entry: problem.entry.python,
      payload: payload(problem),
    }),
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });

  if (result.error) throw result.error;

  const marker = result.stderr.indexOf(PY_SENTINEL);
  if (marker === -1) {
    throw new Error(`python3 실행 실패\n${result.stderr || result.stdout}`.trim());
  }

  const decoded = JSON.parse(result.stderr.slice(marker + PY_SENTINEL.length));
  if (decoded.fatal === "MISSING_ENTRY") {
    throw new Error(`${problem.entry.python} 함수를 찾을 수 없습니다.`);
  }
  return decoded.results as Outcome[];
}

/** One outcome per test case, in order. Rejects only if the grader itself fails. */
export async function runSolution(
  problem: Runnable,
  language: Language,
  code: string,
): Promise<Outcome[]> {
  return language === "javascript"
    ? runJavaScript(problem, code)
    : runPython(problem, code);
}
