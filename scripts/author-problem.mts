/**
 * Authoring tool for the remaining curriculum problems. Local only — nothing
 * here ships to the browser.
 *
 *   npm run author                        남은 슬롯 목록
 *   npm run author -- new 5.1 dup-check   슬롯에 맞춘 문제 파일 스캐폴드
 *   npm run author -- fill dup-check      expected 생성 · 교차 검증 · 배선
 *
 * `fill` is the reason this exists. Expected values used to be typed by hand,
 * which makes the answer key a guess that `npm run verify` then confirms
 * against itself. Here the values are *derived*: both reference solutions run
 * through the real graders (scripts/runners.mts) and have to agree before
 * anything is written. Two independent implementations landing on the same
 * value is evidence; one hand-typed value is not.
 *
 * On success it also wires the problem up — the week's planned slot gets its
 * slug and src/lib/problems/index.ts gets the import and the entry — so a
 * problem enters the site only once its two solutions agree.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";
import { display, displayArgs, matches } from "../src/lib/compare";
import {
  TOTAL_PLANNED_PROBLEMS,
  type Week,
  type WeekProblem,
  getWeek,
  weekOfProblem,
  weeks,
} from "../src/lib/curriculum";
import {
  type Difficulty,
  LANGUAGES,
  LANGUAGE_LABEL,
  type Language,
  type Problem,
} from "../src/lib/types";
import { type Outcome, runSolution } from "./runners.mjs";

const ROOT = join(import.meta.dirname, "..");
const PROBLEM_DIR = join(ROOT, "src/lib/problems");
const WEEK_DIR = join(ROOT, "src/lib/curriculum/weeks");
const INDEX_FILE = join(PROBLEM_DIR, "index.ts");

const USAGE = `사용법:
  npm run author                          남은 슬롯 목록
  npm run author -- new <슬롯> <slug>      문제 파일 스캐폴드 (예: new 5.1 duplicate-check)
                        [--args a,b]      정답 함수의 매개변수 이름
  npm run author -- fill <slug>            expected 생성 · JS/PY 교차 검증 · 배선
                        [--force]         적어둔 expected 를 실행 결과로 덮어씀
                        [--slot <슬롯>]    제목으로 슬롯을 못 찾을 때 직접 지정`;

function die(message: string): never {
  console.error(message);
  process.exit(1);
}

const rel = (path: string) => relative(ROOT, path);

/** The CJK and Hangul blocks a terminal draws two columns wide. */
const WIDE = /[\u1100-\u115F\u2E80-\uA4CF\uAC00-\uD7A3\uF900-\uFAFF\uFF00-\uFF60]/;

/** Column-aware padEnd — `padEnd` counts UTF-16 units, so 한글 comes out short. */
function pad(text: string, width: number): string {
  let used = 0;
  for (const ch of text) used += WIDE.test(ch) ? 2 : 1;
  return text + " ".repeat(Math.max(0, width - used));
}

function flag(args: string[], name: string): string | undefined {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args[i + 1];
}

const camel = (slug: string) => slug.replace(/-(.)/g, (_, c: string) => c.toUpperCase());
const snake = (slug: string) => slug.replace(/-/g, "_");

/* ---------------------------------- slots ---------------------------------- */

interface Slot {
  week: Week;
  /** Zero-based index into `week.problems`; slot ids are one-based. */
  index: number;
  entry: WeekProblem;
}

const slotId = (slot: Slot) => `${slot.week.week}.${slot.index + 1}`;

function parseSlot(text: string): Slot {
  const match = /^(\d+)\.(\d+)$/.exec(text);
  if (!match) die(`슬롯은 "5.1" 형태로 적어주세요 (주차.번호). 받은 값: ${text}`);

  const week = getWeek(Number(match[1]));
  if (!week) die(`${match[1]}주차가 없습니다.`);

  const index = Number(match[2]) - 1;
  const entry = week.problems[index];
  if (!entry) {
    die(`${text} 슬롯이 없습니다. ${week.week}주차는 문제 ${week.problems.length}개입니다.`);
  }
  return { week, index, entry };
}

/** Where a written problem belongs: its own slot if wired, else a planned one. */
function resolveSlot(problem: Problem, override?: string): Slot {
  if (override) return parseSlot(override);

  for (const week of weeks) {
    const index = week.problems.findIndex((p) => p.slug === problem.slug);
    if (index >= 0) return { week, index, entry: week.problems[index] };
  }

  const planned: Slot[] = [];
  for (const week of weeks) {
    week.problems.forEach((entry, index) => {
      if (!entry.slug && entry.title === problem.title) planned.push({ week, index, entry });
    });
  }
  if (planned.length === 1) return planned[0];
  if (planned.length === 0) {
    die(
      `"${problem.title}" 과 제목이 같은 빈 슬롯이 없습니다.\n` +
        `제목을 바꿨다면 --slot 5.1 처럼 직접 지정하세요.`,
    );
  }
  die(`제목이 같은 빈 슬롯이 여럿입니다. --slot 으로 지정하세요: ${planned.map(slotId).join(", ")}`);
}

/* ------------------------------- source edits ------------------------------ */

interface Patch {
  start: number;
  end: number;
  text: string;
}

/** Applied back to front so earlier offsets stay valid. */
function applyPatches(text: string, patches: Patch[]): string {
  return [...patches]
    .sort((a, b) => b.start - a.start)
    .reduce((out, p) => out.slice(0, p.start) + p.text + out.slice(p.end), text);
}

function parse(file: string, text: string): ts.SourceFile {
  return ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
}

function property(
  object: ts.ObjectLiteralExpression,
  name: string,
): ts.PropertyAssignment | undefined {
  return object.properties.find(
    (p): p is ts.PropertyAssignment =>
      ts.isPropertyAssignment(p) && ts.isIdentifier(p.name) && p.name.text === name,
  );
}

/** `export const x: T = { … }`, seen through any `as`/`satisfies` wrapper. */
function exportedObject(source: ts.SourceFile, name: string): ts.ObjectLiteralExpression {
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== name) continue;
      let value = declaration.initializer;
      while (value && (ts.isAsExpression(value) || ts.isSatisfiesExpression(value))) {
        value = value.expression;
      }
      if (value && ts.isObjectLiteralExpression(value)) return value;
    }
  }
  die(`${source.fileName} 에서 ${name} 객체를 찾지 못했습니다.`);
}

function arrayProperty(
  object: ts.ObjectLiteralExpression,
  name: string,
  where: string,
): ts.ArrayLiteralExpression {
  const found = property(object, name);
  if (!found || !ts.isArrayLiteralExpression(found.initializer)) {
    die(`${where} 에서 ${name} 배열을 찾지 못했습니다.`);
  }
  return found.initializer;
}

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

/** A JSON value as this repo writes it: double quotes, spaces after commas. */
function literal(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return `[${value.map(literal).join(", ")}]`;
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    const body = entries
      .map(([key, v]) => `${IDENTIFIER.test(key) ? key : JSON.stringify(key)}: ${literal(v)}`)
      .join(", ");
    return `{ ${body} }`;
  }
  return JSON.stringify(value) ?? String(value);
}

/* ----------------------------------- list ---------------------------------- */

function list(): void {
  let remaining = 0;

  for (const week of weeks) {
    const open = week.problems
      .map((entry, index) => ({ week, index, entry }))
      .filter((slot) => !slot.entry.slug);
    if (open.length === 0) continue;

    console.log(`\n${week.week}주차 · ${week.title}`);
    for (const slot of open) {
      const teaches = slot.entry.teaches ? `  — ${slot.entry.teaches}` : "";
      console.log(
        `  ${pad(slotId(slot), 5)} ${pad(slot.entry.role, 9)} ${pad(slot.entry.title, 26)}${teaches}`,
      );
    }
    remaining += open.length;
  }

  const written = TOTAL_PLANNED_PROBLEMS - remaining;
  console.log(`\n작성 ${written} / 계획 ${TOTAL_PLANNED_PROBLEMS} — 남은 문제 ${remaining}개.`);
  console.log(`시작하려면: npm run author -- new ${remaining ? "<슬롯> <slug>" : "…"}`);
}

/* ----------------------------------- new ----------------------------------- */

const DIFFICULTY_OF_ROLE: Record<WeekProblem["role"], Difficulty> = {
  워밍업: "easy",
  핵심: "medium",
  도전: "hard",
  모의고사: "medium",
};

function scaffold(args: string[]): void {
  const [slotText, slug] = args;
  if (!slotText || !slug) die(USAGE);
  if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(slug)) {
    die(`slug 는 소문자와 하이픈만 씁니다: ${slug}`);
  }

  const slot = parseSlot(slotText);
  if (slot.entry.slug) die(`${slotText} 슬롯은 이미 ${slot.entry.slug} 입니다.`);

  const file = join(PROBLEM_DIR, `${slug}.ts`);
  if (existsSync(file)) die(`이미 있는 파일입니다: ${rel(file)}`);

  const params = (flag(args, "--args") ?? "input")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)
    .join(", ");
  const js = camel(slug);
  const py = snake(slug);

  writeFileSync(
    file,
    `import type { Problem } from "@/lib/types";

export const ${js}: Problem = {
  slug: "${slug}",
  title: ${JSON.stringify(slot.entry.title)},
  difficulty: "${DIFFICULTY_OF_ROLE[slot.entry.role]}",
  tags: [],
  summary: "TODO: 목록에 보일 한 줄.",
  description: [
    "TODO: 문제 설명. \`백틱\` 은 인라인 코드로 렌더링됩니다.",
  ],
  examples: [{ input: "TODO", output: "TODO" }],
  constraints: ["TODO"],
  entry: { javascript: "${js}", python: "${py}" },
  starter: {
    javascript: \`function ${js}(${params}) {
  // 여기에 코드를 작성하세요
}
\`,
    python: \`def ${py}(${params}):
    # 여기에 코드를 작성하세요
    pass
\`,
  },
  // expected 는 비워 둡니다 — npm run author -- fill ${slug} 가 채웁니다.
  testCases: [
    { input: [] },
    { input: [], hidden: true },
  ],
  hint: "TODO: 막혔을 때 볼 한 줄.",
  solution: {
    javascript: \`function ${js}(${params}) {
  // TODO
}
\`,
    python: \`def ${py}(${params}):
    # TODO
    pass
\`,
  },
};
`,
  );

  console.log(`${rel(file)} 을 만들었습니다.`);
  console.log(`  슬롯 ${slotText} · ${slot.entry.role} · ${slot.entry.title}`);
  if (slot.entry.teaches) console.log(`  가르칠 것: ${slot.entry.teaches}`);
  console.log();
  console.log("다음 순서:");
  console.log("  1. TODO 를 채우고 두 언어의 solution 을 작성합니다.");
  console.log("  2. testCases 에 input 만 적습니다 (expected 는 비워 둡니다).");
  console.log(`  3. npm run author -- fill ${slug}`);
  console.log();
  console.log(`아직 어디에도 연결하지 않았습니다. fill 이 통과하면 그때 배선합니다.`);
}

/* ----------------------------------- fill ---------------------------------- */

function isProblem(value: unknown): value is Problem {
  return (
    typeof value === "object" &&
    value !== null &&
    "slug" in value &&
    "testCases" in value &&
    "solution" in value
  );
}

/** Shortened for the terminal — a test case's input can be hundreds of chars. */
function brief(text: string, limit = 56): string {
  return text.length <= limit ? text : `${text.slice(0, limit - 1)}…`;
}

async function fill(args: string[]): Promise<void> {
  const slug = args[0];
  if (!slug || slug.startsWith("--")) die(USAGE);

  const file = join(PROBLEM_DIR, `${slug}.ts`);
  if (!existsSync(file)) die(`파일이 없습니다: ${rel(file)}`);

  const module_ = (await import(pathToFileURL(file).href)) as Record<string, unknown>;
  const found = Object.entries(module_).find(
    ([, value]) => isProblem(value) && value.slug === slug,
  );
  if (!found) die(`${rel(file)} 에서 slug 가 "${slug}" 인 Problem 을 찾지 못했습니다.`);
  const [exportName, problem] = found as [string, Problem];

  if (problem.testCases.length === 0) {
    die("테스트 케이스가 없습니다. input 을 먼저 적어주세요.");
  }
  if (problem.testCases.some((test) => test.input.length === 0)) {
    die("input 이 빈 테스트 케이스가 있습니다. 스캐폴드의 자리표시자를 채워주세요.");
  }

  /* 정답 코드를 실제 채점기로 실행 */
  const outcomes = {} as Record<Language, Outcome[]>;
  for (const language of LANGUAGES) {
    try {
      outcomes[language] = await runSolution(problem, language, problem.solution[language]);
    } catch (err) {
      die(
        `${LANGUAGE_LABEL[language]} 채점기 실행 실패\n${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  const mode = problem.compare ?? "exact";
  const derived: unknown[] = [];
  const errors: string[] = [];

  problem.testCases.forEach((test, index) => {
    const where = `테스트 ${index + 1} (${brief(displayArgs(test.input))})`;
    const values: Partial<Record<Language, unknown>> = {};

    for (const language of LANGUAGES) {
      const outcome = outcomes[language][index];
      const label = LANGUAGE_LABEL[language];
      if (!outcome) {
        errors.push(`${where}\n  ${label} 결과가 없습니다.`);
      } else if (!outcome.ok) {
        errors.push(`${where}\n  ${label} 실행 중 예외\n    ${outcome.error}`);
      } else if (outcome.undef) {
        errors.push(`${where}\n  ${label} 정답 코드가 아무 값도 반환하지 않았습니다.`);
      } else {
        values[language] = JSON.parse(outcome.json ?? "null");
      }
    }

    if (!("javascript" in values) || !("python" in values)) return;

    // The whole point of running both: agreement is the evidence.
    if (!matches(values.javascript, values.python, mode)) {
      errors.push(
        `${where}\n  두 언어의 결과가 다릅니다.\n` +
          `    JavaScript ${display(values.javascript)}\n` +
          `    Python     ${display(values.python)}`,
      );
      return;
    }
    derived[index] = values.javascript;
  });

  /* 이미 적어둔 expected 와 대조 */
  const force = args.includes("--force");
  const edits: { index: number; value: unknown }[] = [];

  problem.testCases.forEach((test, index) => {
    if (!(index in derived)) return;
    if (test.expected === undefined || force) {
      if (test.expected === undefined || !matches(derived[index], test.expected, mode)) {
        edits.push({ index, value: derived[index] });
      }
      return;
    }
    if (!matches(derived[index], test.expected, mode)) {
      errors.push(
        `테스트 ${index + 1}\n  적어둔 expected 와 정답 코드의 결과가 다릅니다.\n` +
          `    적어둔 값  ${display(test.expected)}\n` +
          `    실행 결과  ${display(derived[index])}\n` +
          `  정답 코드가 맞다면 --force 로 덮어씁니다.`,
      );
    }
  });

  if (errors.length > 0) {
    console.error(`${slug}: ${errors.length}건\n`);
    for (const error of errors) console.error(`${error}\n`);
    process.exit(1);
  }

  /* 결과를 눈으로 확인할 수 있게 전부 출력 */
  console.log(`${slug} — 두 언어가 ${problem.testCases.length}개 케이스에서 같은 값을 냈습니다.\n`);
  problem.testCases.forEach((test, index) => {
    const hidden = test.hidden ? " (hidden)" : "";
    console.log(
      `  ${String(index + 1).padStart(2)}. ${brief(displayArgs(test.input), 44)} → ${brief(display(derived[index]), 40)}${hidden}`,
    );
  });
  console.log();

  if (edits.length > 0) {
    const before = readFileSync(file, "utf8");
    writeFileSync(file, withExpected(file, before, slug, problem, edits));
    console.log(`expected ${edits.length}개를 ${rel(file)} 에 적었습니다.`);
  } else {
    console.log(`expected 는 이미 전부 맞습니다 — ${rel(file)} 은 그대로입니다.`);
  }

  /* 통과했으니 배선 */
  const slot = resolveSlot(problem, flag(args, "--slot"));
  const wired = [wireWeek(slot, slug), wireIndex(slug, exportName, slot)].filter(Boolean);
  for (const line of wired) console.log(line);

  console.log();
  console.log(wired.length > 0 ? `${slotId(slot)} 슬롯에 배선했습니다.` : "배선은 이미 되어 있습니다.");
  console.log("다음: npm run verify 로 확인하고, npm run docs 로 커리큘럼 문서를 갱신하세요.");
}

/** Inserts (or, with --force, replaces) the `expected` of the listed cases. */
function withExpected(
  file: string,
  text: string,
  slug: string,
  problem: Problem,
  edits: { index: number; value: unknown }[],
): string {
  const source = parse(file, text);
  const cases = arrayProperty(problemObject(source, slug), "testCases", rel(file));

  if (cases.elements.length !== problem.testCases.length) {
    die(
      `testCases 배열이 소스에서 ${cases.elements.length}개, 실행 시점에 ${problem.testCases.length}개입니다.\n` +
        `전개 구문이나 계산된 값은 지원하지 않습니다 — 리터럴로 적어주세요.`,
    );
  }

  const patches: Patch[] = [];
  for (const { index, value } of edits) {
    const element = cases.elements[index];
    if (!ts.isObjectLiteralExpression(element)) {
      die(`테스트 ${index + 1} 이 객체 리터럴이 아닙니다.`);
    }
    const existing = property(element, "expected");
    if (existing) {
      patches.push({
        start: existing.initializer.getStart(source),
        end: existing.initializer.end,
        text: literal(value),
      });
      continue;
    }
    const input = property(element, "input");
    if (!input) die(`테스트 ${index + 1} 에 input 이 없습니다.`);
    patches.push({ start: input.end, end: input.end, text: `, expected: ${literal(value)}` });
  }

  return applyPatches(text, patches);
}

/** Found by its `slug`, so the file is free to name its export anything. */
function problemObject(source: ts.SourceFile, slug: string): ts.ObjectLiteralExpression {
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      const value = declaration.initializer;
      if (!value || !ts.isObjectLiteralExpression(value)) continue;
      const found = property(value, "slug");
      if (found && ts.isStringLiteral(found.initializer) && found.initializer.text === slug) {
        return value;
      }
    }
  }
  die(`slug 가 "${slug}" 인 객체를 찾지 못했습니다.`);
}

/* ---------------------------------- wiring --------------------------------- */

/** Gives the week's planned slot its slug. Returns what changed, or "". */
function wireWeek(slot: Slot, slug: string): string {
  if (slot.entry.slug === slug) return "";
  if (slot.entry.slug) die(`${slotId(slot)} 슬롯은 이미 ${slot.entry.slug} 입니다.`);

  const name = `w${String(slot.week.week).padStart(2, "0")}`;
  const file = join(WEEK_DIR, `${name}.ts`);
  const text = readFileSync(file, "utf8");
  const source = parse(file, text);

  const element = arrayProperty(exportedObject(source, name), "problems", rel(file)).elements[
    slot.index
  ];
  if (!element || !ts.isObjectLiteralExpression(element)) {
    die(`${rel(file)} 의 ${slotId(slot)} 슬롯을 찾지 못했습니다.`);
  }

  const first = element.properties[0];
  if (!first) die(`${rel(file)} 의 ${slotId(slot)} 슬롯이 비어 있습니다.`);

  // Match the surrounding layout: one property per line, or all on one line.
  const start = first.getStart(source);
  const lineStart = text.lastIndexOf("\n", start - 1) + 1;
  const indent = text.slice(lineStart, start);
  const insert = /^\s*$/.test(indent)
    ? `slug: "${slug}",\n${indent}`
    : `slug: "${slug}", `;

  writeFileSync(file, applyPatches(text, [{ start, end: start, text: insert }]));
  return `${rel(file)} 의 ${slotId(slot)} 슬롯에 slug 를 넣었습니다.`;
}

/**
 * Rewrites the import block and the `problems` array of src/lib/problems/index.ts
 * from the curriculum, rather than splicing one line in. The array is ordered
 * by week and then by the week's own slot order, and only the first entry of a
 * week carries the week title in its comment — both are properties of the whole
 * list, so generating the whole list is what keeps them true.
 */
function wireIndex(slug: string, exportName: string, slot: Slot): string {
  const text = readFileSync(INDEX_FILE, "utf8");
  const source = parse(INDEX_FILE, text);

  const imports = source.statements.filter(ts.isImportDeclaration);
  if (imports.length === 0) die(`${rel(INDEX_FILE)} 에 import 가 없습니다.`);

  interface Entry {
    name: string;
    slug: string;
    week: Week;
    index: number;
  }
  const entries: Entry[] = [];

  for (const declaration of imports) {
    const specifier = (declaration.moduleSpecifier as ts.StringLiteral).text;
    if (!specifier.startsWith("./")) continue; // the `Problem` type import
    const bindings = declaration.importClause?.namedBindings;
    if (!bindings || !ts.isNamedImports(bindings)) continue;

    for (const element of bindings.elements) {
      const each = specifier.slice(2);
      const week = weekOfProblem(each);
      if (!week) die(`${each} 이 어느 주차에도 배치되어 있지 않습니다.`);
      entries.push({
        name: element.name.text,
        slug: each,
        week,
        index: week.problems.findIndex((p) => p.slug === each),
      });
    }
  }

  const already = entries.some((entry) => entry.slug === slug);
  if (!already) {
    entries.push({ name: exportName, slug, week: slot.week, index: slot.index });
  }
  entries.sort((a, b) => a.week.week - b.week.week || a.index - b.index);

  const importBlock = [
    `import type { Problem } from "@/lib/types";`,
    ...[...entries]
      .sort((a, b) => (a.slug < b.slug ? -1 : 1))
      .map((entry) => `import { ${entry.name} } from "./${entry.slug}";`),
  ].join("\n");

  let previous = 0;
  const arrayBlock = ["["];
  for (const entry of entries) {
    const week = entry.week.week;
    arrayBlock.push(`  ${entry.name}, // ${week}주차${week === previous ? "" : ` · ${entry.week.title}`}`);
    previous = week;
  }
  arrayBlock.push("]");

  const list = exportedArray(source, "problems");
  const patched = applyPatches(text, [
    { start: imports[0].getStart(source), end: imports[imports.length - 1].end, text: importBlock },
    { start: list.getStart(source), end: list.end, text: arrayBlock.join("\n") },
  ]);

  if (patched === text) return "";
  writeFileSync(INDEX_FILE, patched);
  return already
    ? `${rel(INDEX_FILE)} 의 목록을 다시 정렬했습니다.`
    : `${rel(INDEX_FILE)} 에 ${exportName} 을 넣었습니다.`;
}

/** `export const name: T[] = [ … ]`. */
function exportedArray(source: ts.SourceFile, name: string): ts.ArrayLiteralExpression {
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== name) continue;
      const value = declaration.initializer;
      if (value && ts.isArrayLiteralExpression(value)) return value;
    }
  }
  die(`${source.fileName} 에서 ${name} 배열을 찾지 못했습니다.`);
}

/* ----------------------------------- main ---------------------------------- */

const [command, ...rest] = process.argv.slice(2);

if (!command || command === "list") list();
else if (command === "new") scaffold(rest);
else if (command === "fill") await fill(rest);
else die(`${command} 은 모르는 명령입니다.\n\n${USAGE}`);
