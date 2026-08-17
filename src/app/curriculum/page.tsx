import { Badge } from "@astryxdesign/core/Badge";
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { Heading, Text } from "@astryxdesign/core/Text";
import type { Metadata } from "next";
import {
  CurriculumMap,
  type PhaseGroup,
} from "@/components/CurriculumMap";
import {
  TOTAL_PLANNED_PROBLEMS,
  phases,
  weeksOfPhase,
  writtenSlugs,
} from "@/lib/curriculum";

export const metadata: Metadata = {
  title: "24주 커리큘럼",
  description:
    "개념을 먼저 익히고 그 주의 문제로 굳히는 6개월 코딩테스트 학습 과정이에요.",
};

// Only what the map needs crosses to the client — the lesson bodies stay on
// each week's own page.
const groups: PhaseGroup[] = phases.map((phase) => ({
  id: phase.id,
  title: phase.title,
  range: phase.range,
  goal: phase.goal,
  weeks: weeksOfPhase(phase.id).map((week) => ({
    week: week.week,
    title: week.title,
    summary: week.summary,
    isCheckpoint: Boolean(week.isCheckpoint),
    slugs: writtenSlugs(week),
    plannedCount: week.problems.length,
  })),
}));

export default function CurriculumPage() {
  return (
    <VStack isScrollable height="100%" padding={6} hAlign="center" as="main">
      <VStack gap={10} width="100%" maxWidth={860}>
        <VStack gap={3}>
          <HStack>
            <Badge label="24주 · 4페이즈" variant="teal" />
          </HStack>
          <Heading level={1}>6개월 코딩테스트 커리큘럼</Heading>
          <Text color="secondary" textWrap="pretty">
            매주 개념을 먼저 익히고, 그 개념으로 풀리는 문제 4개로 굳혀요.
            난이도는 1주차부터 24주차까지 올라가고, 6주마다 복습과 모의고사가
            들어가요.
          </Text>
        </VStack>

        <CurriculumMap groups={groups} totalPlanned={TOTAL_PLANNED_PROBLEMS} />
      </VStack>
    </VStack>
  );
}
