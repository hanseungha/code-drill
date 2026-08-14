"use client";

import { CheckboxInput } from "@astryxdesign/core/CheckboxInput";
import { Collapsible } from "@astryxdesign/core/Collapsible";
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { Link } from "@astryxdesign/core/Link";
import { List, ListItem } from "@astryxdesign/core/List";
import { ProgressBar } from "@astryxdesign/core/ProgressBar";
import { Text } from "@astryxdesign/core/Text";
import { Token } from "@astryxdesign/core/Token";
import { type BaekjoonProblem, tierLabel } from "@/lib/baekjoon/tier";
import { toggleBaekjoon, useSolvedBaekjoon } from "@/lib/storage";

/** solved.ac's tier colours, mapped onto the palette Token already ships. */
const TIER_COLOR = [
  "orange", // 브론즈
  "gray", // 실버
  "yellow", // 골드
  "teal", // 플래티넘
  "blue", // 다이아
  "red", // 루비
] as const;

/**
 * The week's curated Baekjoon problems.
 *
 * These are links, not exercises: Baekjoon keeps its judge data private, so
 * this site cannot grade them. The checkbox is therefore a manual checklist —
 * you tick it after solving on acmicpc.net.
 *
 * Collapsed by default. A week can carry 60+ recommendations, which would bury
 * the week's own four problems above it.
 */
export function BaekjoonList({ problems }: { problems: BaekjoonProblem[] }) {
  const solvedIds = useSolvedBaekjoon();
  const solved = new Set(solvedIds);
  const done = problems.filter((p) => solved.has(p.id)).length;

  if (problems.length === 0) return null;

  return (
    <Collapsible
      defaultIsOpen={false}
      trigger={
        <HStack gap={3} align="center">
          <Text weight="semibold">백준 추천 문제</Text>
          <Text type="label" color="secondary">
            {done} / {problems.length}
          </Text>
        </HStack>
      }
    >
      <VStack gap={3}>
        <Text size="sm" color="secondary" textWrap="pretty">
          이 주차 주제로 골라둔 문제입니다. 채점은 백준에서 하고, 풀고 나면
          여기에 체크해 두세요. 난이도 순입니다.
        </Text>

        <ProgressBar
          value={(done / problems.length) * 100}
          label="백준 진행률"
          isLabelHidden
        />

        <List hasDividers>
          {problems.map((problem) => {
            const tier = tierLabel(problem.tier);
            return (
              <ListItem
                key={problem.id}
                label={`${problem.id}. ${problem.title}`}
                startContent={
                  <CheckboxInput
                    size="sm"
                    label={`${problem.title} 푼 문제로 표시`}
                    isLabelHidden
                    value={solved.has(problem.id)}
                    onChange={() => toggleBaekjoon(problem.id)}
                  />
                }
                endContent={
                  <HStack gap={3} align="center">
                    <Token
                      label={tier.text}
                      size="sm"
                      color={tier.group < 0 ? "default" : TIER_COLOR[tier.group]}
                    />
                    <Link
                      href={`https://www.acmicpc.net/problem/${problem.id}`}
                      target="_blank"
                      isStandalone
                    >
                      풀기
                    </Link>
                  </HStack>
                }
              />
            );
          })}
        </List>
      </VStack>
    </Collapsible>
  );
}
