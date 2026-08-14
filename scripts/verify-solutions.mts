/**
 * Runs every reference solution against its own test cases using the actual
 * grader code that ships to the browser (see scripts/runners.mts).
 *
 * A problem whose own solution fails is a broken problem, so this guards the
 * expected values, the comparison modes and the graders in one pass.
 *
 *   npm run verify
 */
import { display, displayArgs, matches } from "../src/lib/compare";
import { weeks, writtenSlugs } from "../src/lib/curriculum";
import { problems } from "../src/lib/problems";
import { LANGUAGES, type Language, type Problem } from "../src/lib/types";
import { type Outcome, runSolution } from "./runners.mjs";

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

    // `expected` is optional in the type so a draft can be written without it;
    // shipping one that way would otherwise fail with a confusing diff.
    if (test.expected === undefined) {
      failures.push({
        problem: problem.slug,
        language,
        detail: `${where} 의 expected 가 비어 있습니다. npm run author -- fill ${problem.slug} 로 채우세요.`,
      });
      return;
    }
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
      outcomes = await runSolution(problem, language, problem.solution[language]);
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
