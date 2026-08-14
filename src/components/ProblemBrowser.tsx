"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DifficultyBadge } from "@/components/DifficultyBadge";
import { resetProgress, useSolvedSlugs } from "@/lib/storage";
import { DIFFICULTIES, DIFFICULTY_LABEL, type Difficulty } from "@/lib/types";

export interface ProblemSummary {
  slug: string;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  summary: string;
}

type DifficultyFilter = Difficulty | "all";

export function ProblemBrowser({
  items,
  tags,
}: {
  items: ProblemSummary[];
  tags: string[];
}) {
  const solvedSlugs = useSolvedSlugs();
  const solved = useMemo(() => new Set(solvedSlugs), [solvedSlugs]);

  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [tag, setTag] = useState<string | null>(null);
  const [hideSolved, setHideSolved] = useState(false);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((p) => {
      if (difficulty !== "all" && p.difficulty !== difficulty) return false;
      if (tag && !p.tags.includes(tag)) return false;
      if (hideSolved && solved.has(p.slug)) return false;
      if (!needle) return true;
      return (
        p.title.toLowerCase().includes(needle) ||
        p.summary.toLowerCase().includes(needle) ||
        p.tags.some((t) => t.toLowerCase().includes(needle))
      );
    });
  }, [items, query, difficulty, tag, hideSolved, solved]);

  const solvedCount = items.filter((p) => solved.has(p.slug)).length;
  const percent = items.length ? Math.round((solvedCount / items.length) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-sm font-medium text-secondary">진행률</h2>
          <p className="font-mono text-sm">
            <span className="text-primary">{solvedCount}</span>
            <span className="text-disabled"> / {items.length}</span>
            <span className="ml-2 text-accent">{percent}%</span>
          </p>
        </div>
        <div
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={solvedCount}
          aria-valuemin={0}
          aria-valuemax={items.length}
          aria-label="푼 문제 수"
        >
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        {solvedCount > 0 && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm("푼 기록과 저장된 코드를 모두 지웁니다. 계속할까요?")) {
                resetProgress();
              }
            }}
            className="mt-3 text-xs text-disabled underline-offset-2 transition hover:text-secondary hover:underline"
          >
            기록 초기화
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <label className="relative flex-1 sm:min-w-64 sm:flex-none">
            <span className="sr-only">문제 검색</span>
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-disabled"
              fill="none"
            >
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="문제 이름 또는 유형 검색"
              className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-sm outline-none transition placeholder:text-disabled focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
            />
          </label>

          <div className="flex gap-1 rounded-lg border border-border bg-card p-1">
            {(["all", ...DIFFICULTIES] as DifficultyFilter[]).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficulty(d)}
                aria-pressed={difficulty === d}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                  difficulty === d
                    ? "bg-muted text-primary"
                    : "text-secondary hover:text-primary"
                }`}
              >
                {d === "all" ? "전체" : DIFFICULTY_LABEL[d]}
              </button>
            ))}
          </div>

          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs text-secondary transition hover:text-primary">
            <input
              type="checkbox"
              checked={hideSolved}
              onChange={(e) => setHideSolved(e.target.checked)}
              className="size-3.5 accent-[var(--color-accent)]"
            />
            푼 문제 숨기기
          </label>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setTag(null)}
            aria-pressed={tag === null}
            className={`rounded-full px-2.5 py-1 text-xs transition ${
              tag === null
                ? "bg-accent/15 text-accent ring-1 ring-accent/30"
                : "bg-card text-secondary ring-1 ring-border hover:text-primary"
            }`}
          >
            모든 유형
          </button>
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(tag === t ? null : t)}
              aria-pressed={tag === t}
              className={`rounded-full px-2.5 py-1 text-xs transition ${
                tag === t
                  ? "bg-accent/15 text-accent ring-1 ring-accent/30"
                  : "bg-card text-secondary ring-1 ring-border hover:text-primary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-disabled">
          조건에 맞는 문제가 없습니다.
        </p>
      ) : (
        <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          {visible.map((p, i) => {
            const isSolved = solved.has(p.slug);
            return (
              <li key={p.slug}>
                <Link
                  href={`/problems/${p.slug}`}
                  className="group flex items-center gap-4 px-4 py-3.5 transition hover:bg-muted"
                >
                  <span
                    aria-hidden
                    className={`grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-medium ${
                      isSolved
                        ? "bg-success/15 text-success ring-1 ring-success/30"
                        : "bg-muted text-disabled ring-1 ring-border"
                    }`}
                  >
                    {isSolved ? (
                      <svg viewBox="0 0 24 24" className="size-3.5" fill="none">
                        <path
                          d="m5 13 4 4L19 7"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="truncate font-medium transition group-hover:text-accent">
                        {p.title}
                      </span>
                      {isSolved && (
                        <span className="sr-only">푼 문제</span>
                      )}
                    </span>
                    <span className="mt-0.5 block truncate text-sm text-disabled">
                      {p.summary}
                    </span>
                  </span>

                  <span className="hidden shrink-0 gap-1.5 sm:flex">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded bg-muted px-1.5 py-0.5 text-[11px] text-secondary"
                      >
                        {t}
                      </span>
                    ))}
                  </span>

                  <DifficultyBadge difficulty={p.difficulty} />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
