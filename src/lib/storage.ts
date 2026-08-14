"use client";

import { useSyncExternalStore } from "react";
import type { Language } from "./types";

const SOLVED_KEY = "code-drill:solved";
const CODE_KEY = "code-drill:code";
const LANG_KEY = "code-drill:language";
const BAEKJOON_KEY = "code-drill:baekjoon";

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keep other tabs in sync.
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Private mode or a full quota — progress just won't persist.
  }
  emit();
}

/* ---------------------------------- solved --------------------------------- */

const EMPTY: string[] = [];
let solvedCache: string[] = EMPTY;
let solvedRaw: string | null = null;

/**
 * useSyncExternalStore compares snapshots by identity, so the array is cached
 * and only rebuilt when the underlying string actually changes.
 */
function getSolvedSnapshot(): string[] {
  if (typeof window === "undefined") return EMPTY;
  const raw = window.localStorage.getItem(SOLVED_KEY);
  if (raw !== solvedRaw) {
    solvedRaw = raw;
    try {
      const parsed = raw === null ? [] : JSON.parse(raw);
      solvedCache = Array.isArray(parsed) ? parsed : [];
    } catch {
      solvedCache = [];
    }
  }
  return solvedCache;
}

export function useSolvedSlugs(): string[] {
  return useSyncExternalStore(subscribe, getSolvedSnapshot, () => EMPTY);
}

export function markSolved(slug: string) {
  const current = read<string[]>(SOLVED_KEY, []);
  if (current.includes(slug)) return;
  write(SOLVED_KEY, [...current, slug]);
}

export function resetProgress() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SOLVED_KEY);
  window.localStorage.removeItem(CODE_KEY);
  window.localStorage.removeItem(BAEKJOON_KEY);
  emit();
}

/* --------------------------------- baekjoon -------------------------------- */

/**
 * Baekjoon problems are solved on acmicpc.net, so nothing here can be inferred
 * — this is a manual checklist, kept apart from `solved` because those slugs
 * are graded by this site and these numbers never are.
 */
const NO_IDS: number[] = [];
let baekjoonCache: number[] = NO_IDS;
let baekjoonRaw: string | null = null;

function getBaekjoonSnapshot(): number[] {
  if (typeof window === "undefined") return NO_IDS;
  const raw = window.localStorage.getItem(BAEKJOON_KEY);
  if (raw !== baekjoonRaw) {
    baekjoonRaw = raw;
    try {
      const parsed = raw === null ? [] : JSON.parse(raw);
      baekjoonCache = Array.isArray(parsed) ? parsed : [];
    } catch {
      baekjoonCache = [];
    }
  }
  return baekjoonCache;
}

export function useSolvedBaekjoon(): number[] {
  return useSyncExternalStore(subscribe, getBaekjoonSnapshot, () => NO_IDS);
}

export function toggleBaekjoon(id: number) {
  const current = read<number[]>(BAEKJOON_KEY, []);
  write(
    BAEKJOON_KEY,
    current.includes(id) ? current.filter((n) => n !== id) : [...current, id],
  );
}

/* ----------------------------------- code ---------------------------------- */

type CodeStore = Record<string, string>;

const codeKey = (slug: string, language: Language) => `${slug}:${language}`;

export function loadCode(slug: string, language: Language): string | null {
  const store = read<CodeStore>(CODE_KEY, {});
  return store[codeKey(slug, language)] ?? null;
}

export function saveCode(slug: string, language: Language, code: string) {
  const store = read<CodeStore>(CODE_KEY, {});
  store[codeKey(slug, language)] = code;
  write(CODE_KEY, store);
}

export function clearCode(slug: string, language: Language) {
  const store = read<CodeStore>(CODE_KEY, {});
  delete store[codeKey(slug, language)];
  write(CODE_KEY, store);
}

/* --------------------------------- language -------------------------------- */

export function loadLanguage(): Language | null {
  const value = read<string | null>(LANG_KEY, null);
  return value === "javascript" || value === "python" ? value : null;
}

export function saveLanguage(language: Language) {
  write(LANG_KEY, language);
}
