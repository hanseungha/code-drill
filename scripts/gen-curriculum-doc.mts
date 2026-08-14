/**
 * Rewrites the week-by-week half of `docs/curriculum.md` from the curriculum
 * data, so the plan of record cannot drift from what the site actually shows.
 *
 * Only the middle is generated. Everything before `## 페이즈 1` (설계 원칙,
 * 커버리지 표, 주간 루틴) and everything from `## 정해진 규약` on is hand
 * written and passes through untouched — keep those two headings intact.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { phases, weeks, weeksOfPhase, TOTAL_PLANNED_PROBLEMS } from "@/lib/curriculum";
import { problems } from "@/lib/problems";

const DOC = fileURLToPath(new URL("../docs/curriculum.md", import.meta.url));

const HEAD_MARKER = "## 페이즈 1";
const TAIL_MARKER = "## 정해진 규약";

const written = new Set(problems.map((p) => p.slug));
const out: string[] = [];

for (const phase of phases) {
  out.push(`## 페이즈 ${phase.id} · ${phase.title} (${phase.range[0]}~${phase.range[1]}주)`);
  out.push("");
  out.push(phase.goal);
  out.push("");

  for (const week of weeksOfPhase(phase.id)) {
    out.push(`### ${week.week}주차 — ${week.title}${week.isCheckpoint ? " 🏁" : ""}`);
    out.push("");
    out.push(week.summary);
    out.push("");

    const headings = week.concept
      .filter((b) => b.kind === "heading")
      .map((b) => (b as { body: string }).body);
    if (headings.length > 0) {
      out.push(`**개념** — ${headings.join(" · ")}`);
      out.push("");
    }
    if (week.patterns.length > 0) {
      out.push(`**패턴 코드** — ${week.patterns.map((p) => p.title).join(" · ")}`);
      out.push("");
    }

    if (week.isCheckpoint) {
      out.push("| # | 모의고사 문제 |");
      out.push("| --- | --- |");
      week.problems.forEach((p, i) => out.push(`| ${i + 1} | ${p.title} |`));
    } else {
      out.push("| 역할 | 문제 | 배우는 것 |");
      out.push("| --- | --- | --- |");
      for (const p of week.problems) {
        const done = p.slug && written.has(p.slug);
        out.push(`| ${p.role} | ${done ? `**${p.title}** ✅` : p.title} | ${p.teaches} |`);
      }
    }
    out.push("");
  }
  out.push("---");
  out.push("");
}

// 배치 현황
const placement: string[] = [];
placement.push("| 문제 | 배치 |");
placement.push("| --- | --- |");
for (const week of weeks) {
  for (const p of week.problems) {
    if (p.slug && written.has(p.slug)) {
      placement.push(`| ${p.title} | ${week.week}주차 |`);
    }
  }
}

const src = readFileSync(DOC, "utf8");
const headEnd = src.indexOf(HEAD_MARKER);
const tailStart = src.indexOf(TAIL_MARKER);
if (headEnd < 0 || tailStart < 0) {
  throw new Error(`docs/curriculum.md에 "${HEAD_MARKER}" 또는 "${TAIL_MARKER}" 제목이 없습니다.`);
}
const head = src.slice(0, headEnd);
const tail = src.slice(tailStart);

const stats = [
  "## 문제 배치 현황",
  "",
  `표에 ✅로 표시한 문제는 이미 만들어져 있습니다. 현재 ${written.size}문제 / ${TOTAL_PLANNED_PROBLEMS}문제.`,
  "",
  ...placement,
  "",
];

writeFileSync(DOC, head + out.join("\n") + stats.join("\n") + "\n" + tail);
console.log(`주차 ${weeks.length}개, 계획 문제 ${TOTAL_PLANNED_PROBLEMS}개, 작성 완료 ${written.size}개`);
