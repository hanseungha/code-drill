"use client";

import { Icon } from "@astryxdesign/core/Icon";
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { List, ListItem } from "@astryxdesign/core/List";
import { ProgressBar } from "@astryxdesign/core/ProgressBar";
import { Text } from "@astryxdesign/core/Text";
import { Token } from "@astryxdesign/core/Token";
import { DifficultyToken } from "@/components/DifficultyToken";
import { useSolvedSlugs } from "@/lib/storage";
import type { Difficulty } from "@/lib/types";

export interface WeekProblemRow {
  slug?: string;
  title: string;
  role: string;
  teaches: string;
  difficulty?: Difficulty;
  summary?: string;
}

/**
 * A week's four problems with per-week progress.
 *
 * Rows without a slug are planned but unwritten. They stay visible rather than
 * being hidden so the week reads as a complete plan, but they are inert and
 * excluded from the progress denominator — otherwise a finished week would
 * still show as unfinished.
 */
export function WeekProblemList({ rows }: { rows: WeekProblemRow[] }) {
  const solvedSlugs = useSolvedSlugs();
  const solved = new Set(solvedSlugs);

  const written = rows.filter((r) => r.slug);
  const done = written.filter((r) => r.slug && solved.has(r.slug)).length;

  return (
    <VStack gap={4}>
      {written.length > 0 && (
        <VStack gap={2}>
          <HStack hAlign="between" align="center">
            <Text type="label" weight="semibold">
              이번 주 진행
            </Text>
            <Text type="label" color="secondary">
              {done} / {written.length}
              {written.length < rows.length &&
                ` (준비된 문제 ${written.length}개)`}
            </Text>
          </HStack>
          <ProgressBar
            value={written.length === 0 ? 0 : (done / written.length) * 100}
            label="주차 진행률"
            isLabelHidden
          />
        </VStack>
      )}

      <List hasDividers>
        {rows.map((row) => {
          const isSolved = Boolean(row.slug && solved.has(row.slug));
          return (
            <ListItem
              key={row.slug ?? row.title}
              href={row.slug ? `/problems/${row.slug}` : undefined}
              label={row.title}
              description={row.teaches || row.summary || undefined}
              isDisabled={!row.slug}
              startContent={
                isSolved ? (
                  <Icon icon="success" color="accent" label="완료" />
                ) : (
                  <Token label={row.role} size="sm" />
                )
              }
              endContent={
                row.slug ? (
                  row.difficulty && <DifficultyToken difficulty={row.difficulty} />
                ) : (
                  <Text type="label" color="secondary">
                    준비 중
                  </Text>
                )
              }
            />
          );
        })}
      </List>
    </VStack>
  );
}
