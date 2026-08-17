"use client";

import { Icon } from "@astryxdesign/core/Icon";
import { Card, HStack, VStack } from "@astryxdesign/core/Layout";
import { List, ListItem } from "@astryxdesign/core/List";
import { ProgressBar } from "@astryxdesign/core/ProgressBar";
import { Heading, Text } from "@astryxdesign/core/Text";
import { Token } from "@astryxdesign/core/Token";
import { useSolvedSlugs } from "@/lib/storage";

export interface WeekRow {
  week: number;
  title: string;
  summary: string;
  isCheckpoint: boolean;
  /** Slugs of the problems that exist, used as the progress denominator. */
  slugs: string[];
  plannedCount: number;
}

export interface PhaseGroup {
  id: number;
  title: string;
  range: [number, number];
  goal: string;
  weeks: WeekRow[];
}

export function CurriculumMap({
  groups,
  totalPlanned,
}: {
  groups: PhaseGroup[];
  totalPlanned: number;
}) {
  const solvedSlugs = useSolvedSlugs();
  const solved = new Set(solvedSlugs);

  const allSlugs = groups.flatMap((g) => g.weeks.flatMap((w) => w.slugs));
  const written = allSlugs.length;
  const done = allSlugs.filter((slug) => solved.has(slug)).length;

  return (
    <VStack gap={8}>
      <Card>
        <VStack gap={3} padding={5}>
          <HStack hAlign="between" align="center">
            <Text type="label" weight="semibold">
              전체 진행
            </Text>
            <Text type="label" color="secondary">
              {done} / {written} 문제
            </Text>
          </HStack>
          <ProgressBar
            value={written === 0 ? 0 : (done / written) * 100}
            label="전체 진행률"
            isLabelHidden
          />
          <Text size="sm" color="secondary">
            커리큘럼 전체 계획은 {totalPlanned}문제이고, 그중 {written}문제를
            지금 풀 수 있어요.
          </Text>
        </VStack>
      </Card>

      {groups.map((group) => (
        <VStack key={group.id} gap={4}>
          <VStack gap={1}>
            <HStack gap={2} align="center">
              <Text type="label" color="accent" weight="semibold">
                페이즈 {group.id}
              </Text>
              <Text type="label" color="secondary">
                {group.range[0]}~{group.range[1]}주차
              </Text>
            </HStack>
            <Heading level={2}>{group.title}</Heading>
            <Text size="sm" color="secondary" textWrap="pretty">
              {group.goal}
            </Text>
          </VStack>

          <List hasDividers>
            {group.weeks.map((week) => {
              const weekDone = week.slugs.filter((s) => solved.has(s)).length;
              const complete =
                week.slugs.length > 0 && weekDone === week.slugs.length;
              return (
                <ListItem
                  key={week.week}
                  href={`/week/${week.week}`}
                  label={`${week.week}주차 · ${week.title}`}
                  description={week.summary}
                  startContent={
                    complete ? (
                      <Icon icon="success" color="accent" label="완료" />
                    ) : (
                      <Text type="label" color="secondary">
                        {String(week.week).padStart(2, "0")}
                      </Text>
                    )
                  }
                  endContent={
                    <HStack gap={2} align="center">
                      {week.isCheckpoint && (
                        <Token label="체크포인트" color="yellow" size="sm" />
                      )}
                      <Text type="label" color="secondary">
                        {week.slugs.length === 0
                          ? "준비 중"
                          : `${weekDone}/${week.slugs.length}`}
                      </Text>
                    </HStack>
                  }
                />
              );
            })}
          </List>
        </VStack>
      ))}
    </VStack>
  );
}
