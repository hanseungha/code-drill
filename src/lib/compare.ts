import type { CompareMode } from "./types";

/**
 * Stable canonical form used to sort arrays when order is not significant.
 * Object keys are emitted in sorted order so `{a,b}` and `{b,a}` agree.
 */
function canonical(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) {
    return `[${value.map(canonical).join(",")}]`;
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .map(([k, v]) => [k, canonical(v)] as const)
      .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
    return `{${entries.map(([k, v]) => `${JSON.stringify(k)}:${v}`).join(",")}}`;
  }
  if (typeof value === "number") {
    // -0 and 0 are the same answer for our purposes.
    return Object.is(value, -0) ? "0" : String(value);
  }
  return JSON.stringify(value) ?? String(value);
}

function sortShallow(value: unknown): unknown {
  if (!Array.isArray(value)) return value;
  return [...value].sort((a, b) => {
    const ca = canonical(a);
    const cb = canonical(b);
    return ca < cb ? -1 : ca > cb ? 1 : 0;
  });
}

function sortDeep(value: unknown): unknown {
  if (!Array.isArray(value)) return value;
  return sortShallow(value.map(sortDeep));
}

function normalize(value: unknown, mode: CompareMode): unknown {
  if (mode === "unordered") return sortShallow(value);
  if (mode === "unordered-deep") return sortDeep(value);
  return value;
}

export function matches(
  actual: unknown,
  expected: unknown,
  mode: CompareMode = "exact",
): boolean {
  return (
    canonical(normalize(actual, mode)) === canonical(normalize(expected, mode))
  );
}

/** Compact, readable rendering of a value for the result panel. */
export function display(value: unknown): string {
  if (value === undefined) return "undefined";
  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
}

/** `fn(a, b)` style rendering of a test case's arguments. */
export function displayArgs(input: unknown[]): string {
  return input.map(display).join(", ");
}
