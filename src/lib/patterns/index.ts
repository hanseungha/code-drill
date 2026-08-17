import { divisorsPattern } from "./divisors";
import { gcdLcmPattern } from "./gcd-lcm";
import { primeFactorizationPattern } from "./prime-factorization";
import { primeTestPattern } from "./prime-test";
import { sievePattern } from "./sieve";
import type { Pattern, PatternCategory } from "./types";

export const patternCategories: PatternCategory[] = [
  {
    id: "number-theory",
    title: "수학·정수론",
    blurb:
      "약수·소수·최대공약수처럼 수의 성질을 다루는 유형이에요. 대부분 √n이나 log 시간으로 줄이는 게 핵심이에요.",
  },
];

/**
 * Reading order within the category — foundations first (divisors → prime test
 * → sieve), then the two that build on them (gcd/lcm, factorization). Adjacent
 * navigation on each page follows this array.
 */
export const patterns: Pattern[] = [
  divisorsPattern,
  primeTestPattern,
  sievePattern,
  gcdLcmPattern,
  primeFactorizationPattern,
];

export function getPattern(slug: string): Pattern | undefined {
  return patterns.find((p) => p.slug === slug);
}

export function getPatternCategory(id: string): PatternCategory | undefined {
  return patternCategories.find((c) => c.id === id);
}

export function patternsOfCategory(id: string): Pattern[] {
  return patterns.filter((p) => p.category === id);
}

export function getAdjacentPattern(slug: string) {
  const i = patterns.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? patterns[i - 1] : undefined,
    next: i >= 0 && i < patterns.length - 1 ? patterns[i + 1] : undefined,
  };
}

export type { Pattern, PatternCategory } from "./types";
