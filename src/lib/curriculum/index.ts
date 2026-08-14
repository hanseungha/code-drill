import type { Phase, Week } from "./types";
import { w01 } from "./weeks/w01";
import { w02 } from "./weeks/w02";
import { w03 } from "./weeks/w03";
import { w04 } from "./weeks/w04";
import { w05 } from "./weeks/w05";
import { w06 } from "./weeks/w06";
import { w07 } from "./weeks/w07";
import { w08 } from "./weeks/w08";
import { w09 } from "./weeks/w09";
import { w10 } from "./weeks/w10";
import { w11 } from "./weeks/w11";
import { w12 } from "./weeks/w12";
import { w13 } from "./weeks/w13";
import { w14 } from "./weeks/w14";
import { w15 } from "./weeks/w15";
import { w16 } from "./weeks/w16";
import { w17 } from "./weeks/w17";
import { w18 } from "./weeks/w18";
import { w19 } from "./weeks/w19";
import { w20 } from "./weeks/w20";
import { w21 } from "./weeks/w21";
import { w22 } from "./weeks/w22";
import { w23 } from "./weeks/w23";
import { w24 } from "./weeks/w24";

export const phases: Phase[] = [
  {
    id: 1,
    title: "기본기",
    range: [1, 6],
    goal: "문법과 복잡도를 점검하고, 배열·문자열·완전탐색·해시로 문제를 일단 풀어냅니다.",
  },
  {
    id: 2,
    title: "탐색의 기술",
    range: [7, 12],
    goal: "완전탐색의 낭비를 줄이는 다섯 가지 방법 — 정렬, 투 포인터, 그리디, 스택·큐, 이분 탐색.",
  },
  {
    id: 3,
    title: "자료구조와 그래프",
    range: [13, 18],
    goal: "재귀로 구조를 다루기 시작합니다. 트리와 그래프, 그리고 우선순위 큐까지.",
  },
  {
    id: 4,
    title: "심화 알고리즘",
    range: [19, 24],
    goal: "DP·최단 경로·MST처럼 당락을 가르는 유형과, 아는 것을 점수로 바꾸는 법.",
  },
];

export const weeks: Week[] = [
  w01, w02, w03, w04, w05, w06,
  w07, w08, w09, w10, w11, w12,
  w13, w14, w15, w16, w17, w18,
  w19, w20, w21, w22, w23, w24,
];

export const TOTAL_WEEKS = weeks.length;

/** Every problem the curriculum plans, written or not. */
export const TOTAL_PLANNED_PROBLEMS = weeks.reduce(
  (sum, week) => sum + week.problems.length,
  0,
);

export function getWeek(n: number): Week | undefined {
  return weeks.find((w) => w.week === n);
}

export function getPhase(id: number): Phase | undefined {
  return phases.find((p) => p.id === id);
}

export function weeksOfPhase(id: number): Week[] {
  return weeks.filter((w) => w.phase === id);
}

/** Slugs a week expects, ignoring problems that are still planned. */
export function writtenSlugs(week: Week): string[] {
  return week.problems
    .map((p) => p.slug)
    .filter((slug): slug is string => Boolean(slug));
}

/**
 * Which week a problem belongs to. Built once rather than scanned per call so
 * the problem page can show a week badge without an O(weeks × problems) walk.
 */
const weekBySlug = new Map<string, Week>();
for (const week of weeks) {
  for (const slug of writtenSlugs(week)) {
    weekBySlug.set(slug, week);
  }
}

export function weekOfProblem(slug: string): Week | undefined {
  return weekBySlug.get(slug);
}

export function getAdjacentWeek(n: number) {
  return {
    prev: n > 1 ? getWeek(n - 1) : undefined,
    next: n < TOTAL_WEEKS ? getWeek(n + 1) : undefined,
  };
}

export type { ConceptBlock, CodePattern, Phase, Week, WeekProblem } from "./types";
