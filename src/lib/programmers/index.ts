import data from "./recommended.json";
import type { ProgrammersProblem } from "./level";

/**
 * Curated Programmers problems, grouped by the week whose topic they practise.
 *
 * Hand-maintained in `recommended.json` — Programmers has no public index to
 * fetch, so the list is picked from its 고득점 Kit and famous Lv.1~Lv.5
 * problems. Only the index lives here (number, title, level); the statements
 * and judge data stay on programmers.co.kr, so the site links out.
 *
 * Server-only in practice — importing this pulls in the whole list. Client
 * components take `./level` instead.
 *
 * Built once as a Map rather than filtered per call: every week page asks for
 * its own slice during the static build.
 */
const byWeek = new Map<number, ProgrammersProblem[]>();
for (const problem of data.problems as ProgrammersProblem[]) {
  const list = byWeek.get(problem.week);
  if (list) list.push(problem);
  else byWeek.set(problem.week, [problem]);
}

const NONE: ProgrammersProblem[] = [];

export function recommendedForWeek(week: number): ProgrammersProblem[] {
  return byWeek.get(week) ?? NONE;
}

export const PROGRAMMERS_SOURCE = data.source;
export const TOTAL_RECOMMENDED = (data.problems as ProgrammersProblem[]).length;

export type { ProgrammersProblem } from "./level";
