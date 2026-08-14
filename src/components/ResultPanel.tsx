"use client";

import { Banner } from "@astryxdesign/core/Banner";
import { Icon } from "@astryxdesign/core/Icon";
import { Kbd } from "@astryxdesign/core/Kbd";
import { Center } from "@astryxdesign/core/Center";
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { List, ListItem } from "@astryxdesign/core/List";
import {
  MetadataList,
  MetadataListItem,
} from "@astryxdesign/core/MetadataList";
import { Spinner } from "@astryxdesign/core/Spinner";
import { Text } from "@astryxdesign/core/Text";
import { Token } from "@astryxdesign/core/Token";
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
      <Center height="100%" padding={4}>
        <HStack gap={2} align="center">
          <Spinner size="sm" />
          <Text color="secondary">{STAGE_LABEL[stage]}</Text>
        </HStack>
      </Center>
    );
  }

  if (!outcome) {
    return (
      <Center height="100%" padding={4}>
        <HStack gap={1.5} align="center" wrap="wrap" justify="center">
          <Text color="secondary">코드를 작성하고</Text>
          <Kbd keys="mod+enter" />
          <Text color="secondary">를 눌러 예시 테스트를 확인하세요.</Text>
        </HStack>
      </Center>
    );
  }

  if (outcome.status === "fatal") {
    return (
      <VStack padding={4}>
        <Banner status="error" title="실행 오류" container="card">
          <Text type="code" display="block">
            {outcome.message}
          </Text>
        </Banner>
      </VStack>
    );
  }

  if (outcome.status === "timeout") {
    return (
      <VStack padding={4}>
        <Banner
          status="warning"
          title="시간 초과"
          description={
            outcome.completed === 0
              ? "테스트 1번에서 제한 시간을 넘겼습니다. 무한 루프가 있는지, 시간 복잡도가 충분히 낮은지 확인하세요."
              : `테스트 ${outcome.completed}개를 실행한 뒤 ${outcome.completed + 1}번에서 제한 시간을 넘겼습니다. 무한 루프가 있는지, 시간 복잡도가 충분히 낮은지 확인하세요.`
          }
          container="card"
        />
      </VStack>
    );
  }

  const allPassed = outcome.passed === outcome.total;

  return (
    <VStack height="100%" gap={0}>
      <Banner
        status={allPassed ? "success" : "error"}
        container="section"
        title={allPassed ? "모든 테스트 통과" : "테스트 실패"}
        endContent={
          <Text type="label" hasTabularNumbers>
            {outcome.passed} / {outcome.total}
          </Text>
        }
      />
      <VStack isScrollable height="100%">
        <List hasDividers density="compact">
          {outcome.results.map((result) => (
            <ListItem
              key={result.index}
              label={`테스트 ${result.index + 1}`}
              startContent={
                <Icon
                  icon={result.passed ? "success" : "error"}
                  color={result.passed ? "success" : "error"}
                  label={result.passed ? "통과" : "실패"}
                />
              }
              endContent={
                <HStack gap={2} align="center">
                  {result.hidden && <Token label="숨김" size="sm" />}
                  <Text type="supporting" hasTabularNumbers>
                    {result.ms < 1 ? "<1" : Math.round(result.ms)}ms
                  </Text>
                </HStack>
              }
              description={<TestDetail result={result} />}
            />
          ))}
        </List>
      </VStack>
    </VStack>
  );
}

function TestDetail({ result }: { result: TestResult }) {
  if (result.passed && !result.stdout.trim()) return null;

  return (
    <VStack gap={2} paddingBlock={2}>
      {!result.passed && (
        <MetadataList label={{ position: "start", width: 52 }}>
          {!result.hidden && (
            <MetadataListItem label="입력">
              <Text type="code">{displayArgs(result.input)}</Text>
            </MetadataListItem>
          )}
          <MetadataListItem label="기댓값">
            <Text type="code" color="accent">
              {display(result.expected)}
            </Text>
          </MetadataListItem>
          {!result.error && (
            <MetadataListItem label="실제값">
              <Text type="code">
                {result.returnedNothing
                  ? "반환값 없음 — return 문이 있는지 확인하세요"
                  : display(result.actual)}
              </Text>
            </MetadataListItem>
          )}
        </MetadataList>
      )}

      {result.error && (
        <Banner status="error" title="예외 발생" container="card">
          <Text type="code" display="block">
            {result.error}
          </Text>
        </Banner>
      )}

      {result.stdout.trim() && (
        <VStack gap={1}>
          <Text type="supporting">출력</Text>
          <Text type="code" display="block" color="secondary">
            {result.stdout}
          </Text>
        </VStack>
      )}
    </VStack>
  );
}
