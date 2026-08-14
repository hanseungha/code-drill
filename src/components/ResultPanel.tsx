"use client";

import { display, displayArgs } from "@/lib/compare";
import type { RunOutcome, RunStage, TestResult } from "@/lib/runner";

const STAGE_LABEL: Record<RunStage, string> = {
  starting: "실행기를 준비하는 중…",
  "loading-runtime": "Python 런타임을 불러오는 중… (처음 한 번만 걸립니다)",
  running: "테스트를 실행하는 중…",
};

export function ResultPanel({
  outcome,
  running,
  stage,
}: {
  outcome: RunOutcome | null;
  running: "run" | "submit" | null;
  stage: RunStage;
}) {
  if (running) {
    return (
      <Centered>
        <span className="inline-flex items-center gap-2.5 text-sm text-secondary">
          <Spinner />
          {STAGE_LABEL[stage]}
        </span>
      </Centered>
    );
  }

  if (!outcome) {
    return (
      <Centered>
        <p className="text-sm text-disabled">
          코드를 작성하고 <Kbd>실행</Kbd> 을 눌러 예시 테스트를 확인하세요.
        </p>
      </Centered>
    );
  }

  if (outcome.status === "fatal") {
    return (
      <div className="p-4">
        <div className="rounded-lg border border-error/30 bg-error/5 p-3.5">
          <p className="text-sm font-medium text-error">실행 오류</p>
          <pre className="mt-2 overflow-x-auto whitespace-pre-wrap font-mono text-[12.5px] leading-relaxed text-primary/85">
            {outcome.message}
          </pre>
        </div>
      </div>
    );
  }

  if (outcome.status === "timeout") {
    return (
      <div className="p-4">
        <div className="rounded-lg border border-yellow-ring/40 bg-yellow-subtle p-3.5">
          <p className="text-sm font-medium text-yellow-vivid">시간 초과</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-secondary">
            {outcome.completed === 0
              ? `테스트 1번에서 제한 시간을 넘겼습니다.`
              : `테스트 ${outcome.completed}개를 실행한 뒤 ${outcome.completed + 1}번에서 제한 시간을 넘겼습니다.`}{" "}
            무한 루프가 있는지, 시간 복잡도가 충분히 낮은지 확인하세요.
          </p>
        </div>
      </div>
    );
  }

  const allPassed = outcome.passed === outcome.total;

  return (
    <div className="flex h-full flex-col">
      <div
        className={`flex shrink-0 items-center gap-3 border-b px-4 py-2.5 ${
          allPassed
            ? "border-success/20 bg-success/5"
            : "border-error/20 bg-error/5"
        }`}
      >
        <span
          className={`inline-flex items-center gap-1.5 text-sm font-semibold ${
            allPassed ? "text-success" : "text-error"
          }`}
        >
          {allPassed ? <CheckIcon /> : <XIcon />}
          {allPassed ? "모든 테스트 통과" : "테스트 실패"}
        </span>
        <span className="font-mono text-xs text-secondary">
          {outcome.passed} / {outcome.total}
        </span>
      </div>

      <ul className="min-h-0 flex-1 divide-y divide-border overflow-y-auto">
        {outcome.results.map((result) => (
          <TestRow key={result.index} result={result} />
        ))}
      </ul>
    </div>
  );
}

function TestRow({ result }: { result: TestResult }) {
  return (
    <li className="px-4 py-3">
      <div className="flex items-center gap-2.5">
        <span
          className={`inline-flex items-center gap-1.5 text-[13px] font-medium ${
            result.passed ? "text-success" : "text-error"
          }`}
        >
          {result.passed ? <CheckIcon /> : <XIcon />}
          테스트 {result.index + 1}
        </span>
        {result.hidden && (
          <span className="rounded bg-muted px-1.5 py-0.5 text-[11px] text-disabled">
            숨김
          </span>
        )}
        <span className="ml-auto font-mono text-[11px] text-disabled">
          {result.ms < 1 ? "<1" : Math.round(result.ms)}ms
        </span>
      </div>

      {!result.passed && (
        <dl className="mt-2.5 space-y-1.5 font-mono text-[12.5px]">
          {!result.hidden && (
            <Row label="입력" value={displayArgs(result.input)} tone="muted" />
          )}
          <Row label="기댓값" value={display(result.expected)} tone="pass" />
          {result.error ? null : result.returnedNothing ? (
            <Row
              label="실제값"
              value="반환값 없음 — return 문이 있는지 확인하세요"
              tone="fail"
            />
          ) : (
            <Row label="실제값" value={display(result.actual)} tone="fail" />
          )}
        </dl>
      )}

      {result.error && (
        <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded-md border border-error/25 bg-error/5 p-2.5 font-mono text-[12px] leading-relaxed text-red-vivid">
          {result.error}
        </pre>
      )}

      {result.stdout.trim() && (
        <details className="mt-2">
          <summary className="cursor-pointer text-[12px] text-disabled transition hover:text-secondary">
            출력 보기
          </summary>
          <pre className="mt-1.5 overflow-x-auto whitespace-pre-wrap rounded-md bg-muted p-2.5 font-mono text-[12px] leading-relaxed text-secondary">
            {result.stdout}
          </pre>
        </details>
      )}
    </li>
  );
}

function Row({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "muted" | "pass" | "fail";
}) {
  const color =
    tone === "pass" ? "text-success" : tone === "fail" ? "text-error" : "text-primary/85";
  return (
    <div className="flex gap-3">
      <dt className="w-12 shrink-0 text-disabled">{label}</dt>
      <dd className={`min-w-0 flex-1 break-all ${color}`}>{value}</dd>
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-full place-items-center px-4 py-8 text-center">
      {children}
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] text-secondary">
      {children}
    </kbd>
  );
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 animate-spin text-accent" aria-hidden>
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        opacity="0.2"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden>
      <path
        d="m5 13 4 4L19 7"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
