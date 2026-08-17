"use client";

import { Button } from "@astryxdesign/core/Button";
import { useMediaQuery } from "@astryxdesign/core/hooks";
import { Divider } from "@astryxdesign/core/Divider";
import {
  HStack,
  Layout,
  LayoutContent,
  LayoutPanel,
  StackItem,
  VStack,
} from "@astryxdesign/core/Layout";
import { ResizeHandle, useResizable } from "@astryxdesign/core/Resizable";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@astryxdesign/core/SegmentedControl";
import { Tab, TabList } from "@astryxdesign/core/TabList";
import { useCallback, useEffect, useRef, useState } from "react";
import { CodeEditor } from "@/components/CodeEditor";
import { ProblemPanel } from "@/components/ProblemPanel";
import { ResultPanel } from "@/components/ResultPanel";
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

/**
 * Responsive contract:
 *   > 1024px  problem panel 300–720 (resizable) | editor · results
 *   <= 1024px the two regions become 문제 / 코드 tabs; no split, no handles
 */
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

  // useMediaQuery returns false during SSR, so the first paint is the split
  // layout; the narrow layout swaps in on the client.
  const isNarrow = useMediaQuery("(max-width: 1024px)");

  const problemPane = useResizable({
    defaultSize: 480,
    minSizePx: 300,
    maxSizePx: 720,
    autoSaveId: "code-drill:problem-pane",
  });
  const resultPane = useResizable({
    defaultSize: 260,
    minSizePx: 120,
    maxSizePx: 560,
    autoSaveId: "code-drill:result-pane",
  });

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
    const timer = setTimeout(() => saveCode(problem.slug, language, code), 600);
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
    if (!window.confirm("작성한 코드를 지우고 기본 코드로 되돌려요.")) return;
    clearCode(problem.slug, language);
    setCode(problem.starter[language]);
    setOutcome(null);
  }, [problem.slug, problem.starter, language]);

  const problemRegion = (
    <ProblemPanel
      problem={problem}
      language={language}
      solved={solved}
      prev={prev}
      next={next}
    />
  );

  const codeRegion = (
    <VStack height="100%" gap={0}>
      <HStack
        gap={2}
        align="center"
        justify="between"
        paddingInline={3}
        paddingBlock={2}
        wrap="wrap"
      >
        <HStack gap={2} align="center">
          <SegmentedControl
            value={language}
            onChange={(next) => changeLanguage(next as Language)}
            label="언어 선택"
            size="sm"
          >
            {LANGUAGES.map((lang) => (
              <SegmentedControlItem
                key={lang}
                value={lang}
                label={LANGUAGE_LABEL[lang]}
              />
            ))}
          </SegmentedControl>
          <Button
            variant="ghost"
            size="sm"
            label="초기화"
            onClick={resetCode}
          />
        </HStack>
        <HStack gap={2} align="center">
          <Button
            variant="secondary"
            size="sm"
            label="실행"
            tooltip="예시 테스트만 실행 (Cmd/Ctrl+Enter)"
            isDisabled={running !== null}
            onClick={() => void run("run")}
          />
          <Button
            variant="primary"
            size="sm"
            label="제출"
            tooltip="숨김 테스트까지 채점 (Cmd/Ctrl+Shift+Enter)"
            isLoading={running === "submit"}
            isDisabled={running !== null}
            onClick={() => void run("submit")}
          />
        </HStack>
      </HStack>
      <Divider />

      <StackItem size="fill">
        <CodeEditor language={language} value={code} onChange={setCode} />
      </StackItem>

      {isNarrow ? (
        <>
          <Divider />
          <VStack height={260}>
            <ResultPanel outcome={outcome} running={running} stage={stage} />
          </VStack>
        </>
      ) : (
        <>
          <ResizeHandle
            direction="vertical"
            hasDivider
            isReversed
            resizable={resultPane.props}
            label="결과 영역 높이 조절"
          />
          <VStack height={resultPane.size}>
            <ResultPanel outcome={outcome} running={running} stage={stage} />
          </VStack>
        </>
      )}
    </VStack>
  );

  if (isNarrow) {
    return (
      <VStack height="100%" gap={0} as="main">
        <TabList
          value={view}
          onChange={(next) => setView(next as MobileView)}
          hasDivider
          layout="fill"
        >
          <Tab value="problem" label="문제" />
          <Tab value="code" label="코드" />
        </TabList>
        <StackItem size="fill" isScrollable={view === "problem"}>
          {view === "problem" ? problemRegion : codeRegion}
        </StackItem>
      </VStack>
    );
  }

  return (
    <Layout
      height="fill"
      start={
        <>
          <LayoutPanel
            resizable={problemPane.props}
            padding={0}
            isScrollable
            label="문제 설명"
          >
            {problemRegion}
          </LayoutPanel>
          <ResizeHandle
            direction="horizontal"
            hasDivider
            resizable={problemPane.props}
            label="문제 영역 너비 조절"
          />
        </>
      }
      content={<LayoutContent padding={0}>{codeRegion}</LayoutContent>}
    />
  );
}
