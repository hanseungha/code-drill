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
    title: "기초 체력",
    range: [1, 6],
    goal: "배열·해시·문자열·정렬처럼 모든 문제의 바닥에 깔리는 도구를 손에 붙입니다.",
  },
  {
    id: 2,
    title: "탐색과 재귀",
    range: [7, 12],
    goal: "빠짐없이, 그러나 낭비 없이 훑는 방법을 배웁니다.",
  },
  {
    id: 3,
    title: "알고리즘 패러다임",
    range: [13, 18],
    goal: "모든 경우를 감당하는 네 가지 방식과, 그중 무엇을 고를지 판단합니다.",
  },
  {
    id: 4,
    title: "실전",
    range: [19, 24],
    goal: "당락을 가르는 유형을 다루고, 아는 것을 점수로 바꾸는 법까지.",
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
