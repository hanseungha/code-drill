/**
 * Runs every reference solution against its own test cases using the *actual*
 * worker code that ships to the browser — js-runner.js under node:vm, and the
 * Python harness extracted from py-runner.js under the local python3.
 *
 * A problem whose own solution fails is a broken problem, so this guards the
 * expected values, the comparison modes and the graders in one pass.
 *
 *   npm run verify
 */
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createContext, runInContext } from "node:vm";
import { display, displayArgs, matches } from "../src/lib/compare";
import { weeks, writtenSlugs } from "../src/lib/curriculum";
import { problems } from "../src/lib/problems";
import { LANGUAGES, type Language, type Problem } from "../src/lib/types";

const ROOT = join(import.meta.dirname, "..");
const JS_WORKER = join(ROOT, "public/workers/js-runner.js");
const PY_WORKER = join(ROOT, "public/workers/py-runner.js");
const PY_SENTINEL = "__CD_RESULT__";

interface Outcome {
  ok: boolean;
  json?: string;
  undef?: boolean;
  error?: string;
  stdout: string;
  ms: number;
}

/* --------------------------------- runners -------------------------------- */

function runJavaScript(problem: Problem, code: string): Promise<Outcome[]> {
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
      data: {
        code,
        entry: problem.entry.javascript,
        tests: problem.testCases.map((t) => ({ input: t.input })),
        argShapes: problem.argShapes ?? null,
        returnShape: problem.returnShape ?? null,
      },
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

function runPython(problem: Problem, code: string): Outcome[] {
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
      payload: {
        tests: problem.testCases.map((t) => ({ input: t.input })),
        argShapes: problem.argShapes ?? null,
        returnShape: problem.returnShape ?? null,
      },
    }),
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });

  if (result.error) throw result.error;

  const marker = result.stderr.indexOf(PY_SENTINEL);
  if (marker === -1) {
    throw new Error(
      `python3 실행 실패\n${result.stderr || result.stdout}`.trim(),
    );
  }

  const payload = JSON.parse(result.stderr.slice(marker + PY_SENTINEL.length));
  if (payload.fatal === "MISSING_ENTRY") {
    throw new Error(`${problem.entry.python} 함수를 찾을 수 없습니다.`);
  }
  return payload.results as Outcome[];
}

/* --------------------------------- checking -------------------------------- */

interface Failure {
  problem: string;
  language: Language;
  detail: string;
}

function check(problem: Problem, language: Language, outcomes: Outcome[]): Failure[] {
  const failures: Failure[] = [];

  if (outcomes.length !== problem.testCases.length) {
    failures.push({
      problem: problem.slug,
      language,
      detail: `테스트 ${problem.testCases.length}개 중 ${outcomes.length}개만 실행됐습니다.`,
    });
    return failures;
  }

  problem.testCases.forEach((test, i) => {
    const outcome = outcomes[i];
    const where = `테스트 ${i + 1} (${problem.entry[language]}(${displayArgs(test.input)}))`;

    if (!outcome.ok) {
      failures.push({
        problem: problem.slug,
        language,
        detail: `${where} 실행 중 예외\n${outcome.error}`,
      });
      return;
    }
    if (outcome.undef) {
      failures.push({
        problem: problem.slug,
        language,
        detail: `${where} 가 아무 값도 반환하지 않았습니다.`,
      });
      return;
    }

    const actual = JSON.parse(outcome.json ?? "null");
    if (!matches(actual, test.expected, problem.compare ?? "exact")) {
      failures.push({
        problem: problem.slug,
        language,
        detail: `${where}\n  기댓값 ${display(test.expected)}\n  실제값 ${display(actual)}`,
      });
    }
  });

  return failures;
}

/* --------------------------------- curriculum ------------------------------- */

/**
 * The curriculum references problems by slug, so a typo or a renamed problem
 * would only surface as an empty week in the browser. Checked here instead.
 */
function checkCurriculum(): string[] {
  const problems_ = new Set(problems.map((p) => p.slug));
  const seen = new Map<string, number>();
  const errors: string[] = [];

  for (const week of weeks) {
    for (const slug of writtenSlugs(week)) {
      if (!problems_.has(slug)) {
        errors.push(`${week.week}주차가 없는 문제를 가리킵니다: ${slug}`);
      }
      const already = seen.get(slug);
      if (already !== undefined) {
        errors.push(`${slug} 이 ${already}주차와 ${week.week}주차에 중복 배치됐습니다.`);
      }
      seen.set(slug, week.week);
    }
  }

  for (const problem of problems) {
    if (!seen.has(problem.slug)) {
      errors.push(`${problem.slug} 이 어느 주차에도 배치되지 않았습니다.`);
    }
  }

  return errors;
}

/* ----------------------------------- main ---------------------------------- */

const failures: Failure[] = [];
let checkedCases = 0;

for (const detail of checkCurriculum()) {
  failures.push({ problem: "커리큘럼", language: "javascript", detail });
}

for (const problem of problems) {
  const marks: string[] = [];

  for (const language of LANGUAGES) {
    let outcomes: Outcome[];
    try {
      outcomes =
        language === "javascript"
          ? await runJavaScript(problem, problem.solution.javascript)
          : runPython(problem, problem.solution.python);
    } catch (err) {
      failures.push({
        problem: problem.slug,
        language,
        detail: err instanceof Error ? err.message : String(err),
      });
      marks.push(`${language === "javascript" ? "JS" : "PY"} ✗`);
      continue;
    }

    const found = check(problem, language, outcomes);
    checkedCases += outcomes.length;
    failures.push(...found);
    marks.push(`${language === "javascript" ? "JS" : "PY"} ${found.length ? "✗" : "✓"}`);
  }

  console.log(
    `${marks.join("  ")}  ${problem.slug.padEnd(28)} ${problem.testCases.length}개 케이스`,
  );
}

console.log();
if (failures.length === 0) {
  console.log(
    `통과 — 문제 ${problems.length}개, 실행한 케이스 ${checkedCases}개, 언어 ${LANGUAGES.length}종.`,
  );
  console.log(`커리큘럼 ${weeks.length}주차 배치도 일치합니다.`);
  process.exit(0);
}

console.error(`실패 ${failures.length}건:\n`);
for (const failure of failures) {
  console.error(`[${failure.problem} / ${failure.language}] ${failure.detail}\n`);
}
process.exit(1);
