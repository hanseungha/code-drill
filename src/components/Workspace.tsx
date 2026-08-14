"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CodeEditor } from "@/components/CodeEditor";
import { ProblemPanel } from "@/components/ProblemPanel";
import { ResultPanel } from "@/components/ResultPanel";
import { useSplit } from "@/components/useSplit";
import { runTests, warmUp, type RunOutcome, type RunStage } from "@/lib/runner";
import {
  clearCode,
  loadCode,
  loadLanguage,
  markSolved,
  saveCode,
  saveLanguage,
  useSolvedSlugs,
} from "@/lib/storage";
import { LANGUAGES, LANGUAGE_LABEL, type Language, type Problem } from "@/lib/types";

type MobileView = "problem" | "code";

interface WorkspaceProps {
  problem: Problem;
  prev?: { slug: string; title: string };
  next?: { slug: string; title: string };
}

export function Workspace({ problem, prev, next }: WorkspaceProps) {
  const [language, setLanguage] = useState<Language>("javascript");
  const [code, setCode] = useState(problem.starter.javascript);
  const [hydrated, setHydrated] = useState(false);
  const [running, setRunning] = useState<"run" | "submit" | null>(null);
  const [stage, setStage] = useState<RunStage>("starting");
  const [outcome, setOutcome] = useState<RunOutcome | null>(null);
  const [view, setView] = useState<MobileView>("problem");

  const solved = useSolvedSlugs().includes(problem.slug);
  const runningRef = useRef<"run" | "submit" | null>(null);

  const {
    percent: problemWidth,
    containerRef: columnsRef,
    onPointerDown: startColumnDrag,
    onKeyDown: onColumnDragKey,
  } = useSplit({ axis: "x", initial: 44, min: 25, max: 70 });
  const {
    percent: editorHeight,
    containerRef: rowsRef,
    onPointerDown: startRowDrag,
    onKeyDown: onRowDragKey,
  } = useSplit({ axis: "y", initial: 62, min: 25, max: 85 });

  // Restore the saved language and draft only after hydration — reading
  // localStorage during render would make the server and client markup differ.
  useEffect(() => {
    const saved = loadLanguage() ?? "javascript";
    /* eslint-disable react-hooks/set-state-in-effect */
    setLanguage(saved);
    setCode(loadCode(problem.slug, saved) ?? problem.starter[saved]);
    setOutcome(null);
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
    warmUp(saved);
  }, [problem.slug, problem.starter]);

  useEffect(() => {
    if (!hydrated) return;
    const timer = setTimeout(
      () => saveCode(problem.slug, language, code),
      600,
    );
    return () => clearTimeout(timer);
  }, [hydrated, code, language, problem.slug]);

  const changeLanguage = useCallback(
    (nextLanguage: Language) => {
      if (nextLanguage === language) return;
      saveCode(problem.slug, language, code);
      saveLanguage(nextLanguage);
      setLanguage(nextLanguage);
      setCode(
        loadCode(problem.slug, nextLanguage) ?? problem.starter[nextLanguage],
      );
      setOutcome(null);
      warmUp(nextLanguage);
    },
    [language, code, problem.slug, problem.starter],
  );

  const run = useCallback(
    async (mode: "run" | "submit") => {
      if (runningRef.current) return;
      runningRef.current = mode;
      setRunning(mode);
      setStage("starting");
      setOutcome(null);
      setView("code");

      const result = await runTests({
        problem,
        language,
        code,
        mode,
        onStage: setStage,
      });

      runningRef.current = null;
      setRunning(null);
      setOutcome(result);

      if (
        mode === "submit" &&
        result.status === "ok" &&
        result.passed === result.total
      ) {
        markSolved(problem.slug);
      }
    },
    [problem, language, code],
  );

  // Captured on the document so the shortcut works while Monaco has focus.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Enter" || !(event.metaKey || event.ctrlKey)) return;
      event.preventDefault();
      event.stopPropagation();
      void run(event.shiftKey ? "submit" : "run");
    }
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [run]);

  const resetCode = useCallback(() => {
    if (!window.confirm("작성한 코드를 지우고 기본 코드로 되돌립니다.")) return;
    clearCode(problem.slug, language);
    setCode(problem.starter[language]);
    setOutcome(null);
  }, [problem.slug, problem.starter, language]);

  return (
    <main className="flex h-[calc(100dvh-3.5rem)] flex-col">
      <div className="flex shrink-0 items-center gap-1 border-b border-line bg-surface px-3 py-1.5 lg:hidden">
        {(["problem", "code"] as MobileView[]).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            aria-pressed={view === v}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
              view === v ? "bg-elevated text-ink" : "text-muted"
            }`}
          >
            {v === "problem" ? "문제" : "코드"}
          </button>
        ))}
      </div>

      <div ref={columnsRef} className="flex min-h-0 flex-1 lg:flex-row">
        <section
          className={`min-h-0 min-w-0 flex-1 border-line lg:flex-none lg:border-r ${
            view === "problem" ? "" : "hidden lg:block"
          }`}
          style={{ flexBasis: `${problemWidth}%` }}
        >
          <ProblemPanel
            problem={problem}
            language={language}
            solved={solved}
            prev={prev}
            next={next}
          />
        </section>

        <div
          role="separator"
          aria-orientation="vertical"
          aria-label="문제와 코드 영역 너비 조절"
          tabIndex={0}
          onPointerDown={startColumnDrag}
          onKeyDown={onColumnDragKey}
          className="hidden w-1 shrink-0 cursor-col-resize bg-line transition hover:bg-brand/50 focus-visible:bg-brand focus-visible:outline-none lg:block"
        />

        <section
          className={`flex min-h-0 min-w-0 flex-1 flex-col ${
            view === "code" ? "" : "hidden lg:flex"
          }`}
        >
          <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-line bg-surface px-3 py-2">
            <div className="flex gap-0.5 rounded-lg bg-elevated p-0.5">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => changeLanguage(lang)}
                  aria-pressed={language === lang}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                    language === lang
                      ? "bg-canvas text-ink shadow-sm"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {LANGUAGE_LABEL[lang]}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={resetCode}
              className="rounded-md px-2 py-1 text-xs text-faint transition hover:bg-elevated hover:text-muted"
            >
              초기화
            </button>

            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => void run("run")}
                disabled={running !== null}
                className="rounded-lg border border-line bg-elevated px-3 py-1.5 text-xs font-medium transition hover:border-line-strong disabled:cursor-not-allowed disabled:opacity-50"
              >
                실행
              </button>
              <button
                type="button"
                onClick={() => void run("submit")}
                disabled={running !== null}
                className="rounded-lg bg-brand px-3.5 py-1.5 text-xs font-semibold text-canvas transition hover:bg-brand/85 disabled:cursor-not-allowed disabled:opacity-50"
              >
                제출
              </button>
            </div>
          </div>

          <div ref={rowsRef} className="flex min-h-0 flex-1 flex-col">
            <div
              className="min-h-0 overflow-hidden bg-surface"
              style={{ flexBasis: `${editorHeight}%`, flexGrow: 0, flexShrink: 1 }}
            >
              <CodeEditor language={language} value={code} onChange={setCode} />
            </div>

            <div
              role="separator"
              aria-orientation="horizontal"
              aria-label="에디터와 결과 영역 높이 조절"
              tabIndex={0}
              onPointerDown={startRowDrag}
              onKeyDown={onRowDragKey}
              className="h-1 shrink-0 cursor-row-resize bg-line transition hover:bg-brand/50 focus-visible:bg-brand focus-visible:outline-none"
            />

            <div className="min-h-0 flex-1 overflow-hidden border-t border-line bg-canvas">
              <ResultPanel outcome={outcome} running={running} stage={stage} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
