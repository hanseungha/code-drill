"use client";

import Link from "next/link";
import { useState } from "react";
import { DifficultyBadge } from "@/components/DifficultyBadge";
import { RichText } from "@/components/RichText";
import type { Language, Problem } from "@/lib/types";

export function ProblemPanel({
  problem,
  language,
  solved,
  prev,
  next,
}: {
  problem: Problem;
  language: Language;
  solved: boolean;
  prev?: { slug: string; title: string };
  next?: { slug: string; title: string };
}) {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-7 px-5 py-6">
        <header className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <DifficultyBadge difficulty={problem.difficulty} />
            {problem.tags.map((t) => (
              <span
                key={t}
                className="rounded bg-elevated px-1.5 py-0.5 text-[11px] text-muted"
              >
                {t}
              </span>
            ))}
            {solved && (
              <span className="inline-flex items-center gap-1 rounded-full bg-pass/10 px-2 py-0.5 text-xs font-medium text-pass ring-1 ring-inset ring-pass/25">
                <svg viewBox="0 0 24 24" className="size-3" fill="none" aria-hidden>
                  <path
                    d="m5 13 4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                해결
              </span>
            )}
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-balance">
            {problem.title}
          </h1>
        </header>

        <div className="space-y-3 leading-relaxed text-pretty text-ink/90">
          {problem.description.map((paragraph, i) => (
            <p key={i}>
              <RichText text={paragraph} />
            </p>
          ))}
        </div>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted">예시</h2>
          {problem.examples.map((ex, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-lg border border-line bg-surface"
            >
              <dl className="divide-y divide-line text-sm">
                <div className="flex gap-3 px-3.5 py-2.5">
                  <dt className="w-14 shrink-0 text-faint">입력</dt>
                  <dd className="min-w-0 flex-1 break-words font-mono text-[13px] text-ink/90">
                    {ex.input}
                  </dd>
                </div>
                <div className="flex gap-3 px-3.5 py-2.5">
                  <dt className="w-14 shrink-0 text-faint">출력</dt>
                  <dd className="min-w-0 flex-1 break-words font-mono text-[13px] text-brand">
                    {ex.output}
                  </dd>
                </div>
                {ex.explain && (
                  <div className="flex gap-3 px-3.5 py-2.5">
                    <dt className="w-14 shrink-0 text-faint">설명</dt>
                    <dd className="min-w-0 flex-1 text-[13px] leading-relaxed text-muted">
                      <RichText text={ex.explain} />
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          ))}
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-muted">제한 사항</h2>
          <ul className="space-y-1.5 text-sm text-ink/90">
            {problem.constraints.map((c, i) => (
              <li key={i} className="flex gap-2.5">
                <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-faint" />
                <span className="font-mono text-[13px]">{c}</span>
              </li>
            ))}
          </ul>
        </section>

        {problem.hint && (
          <section>
            <button
              type="button"
              onClick={() => setShowHint((v) => !v)}
              aria-expanded={showHint}
              className="flex w-full items-center justify-between rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm font-medium text-muted transition hover:border-line-strong hover:text-ink"
            >
              힌트 보기
              <Chevron open={showHint} />
            </button>
            {showHint && (
              <p className="mt-2 rounded-lg border border-line bg-surface px-3.5 py-3 text-sm leading-relaxed text-ink/90">
                <RichText text={problem.hint} />
              </p>
            )}
          </section>
        )}

        <section>
          <button
            type="button"
            onClick={() => setShowSolution((v) => !v)}
            aria-expanded={showSolution}
            className="flex w-full items-center justify-between rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm font-medium text-muted transition hover:border-line-strong hover:text-ink"
          >
            모범 답안 보기
            <Chevron open={showSolution} />
          </button>
          {showSolution && (
            <pre className="mt-2 overflow-x-auto rounded-lg border border-line bg-surface p-3.5 font-mono text-[13px] leading-relaxed text-ink/90">
              <code>{problem.solution[language]}</code>
            </pre>
          )}
        </section>

        <nav className="flex items-center justify-between gap-3 border-t border-line pt-5 text-sm">
          {prev ? (
            <Link
              href={`/problems/${prev.slug}`}
              className="group min-w-0 flex-1 text-muted transition hover:text-ink"
            >
              <span className="block text-xs text-faint">이전 문제</span>
              <span className="block truncate group-hover:text-brand">{prev.title}</span>
            </Link>
          ) : (
            <span className="flex-1" />
          )}
          {next ? (
            <Link
              href={`/problems/${next.slug}`}
              className="group min-w-0 flex-1 text-right text-muted transition hover:text-ink"
            >
              <span className="block text-xs text-faint">다음 문제</span>
              <span className="block truncate group-hover:text-brand">{next.title}</span>
            </Link>
          ) : (
            <span className="flex-1" />
          )}
        </nav>
      </div>
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
