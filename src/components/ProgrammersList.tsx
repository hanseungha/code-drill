"use client";

import { CheckboxInput } from "@astryxdesign/core/CheckboxInput";
import { Collapsible } from "@astryxdesign/core/Collapsible";
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { Link } from "@astryxdesign/core/Link";
import { List, ListItem } from "@astryxdesign/core/List";
import { ProgressBar } from "@astryxdesign/core/ProgressBar";
import { Text } from "@astryxdesign/core/Text";
import { Token } from "@astryxdesign/core/Token";
import { type ProgrammersProblem, levelLabel } from "@/lib/programmers/level";
import { toggleProgrammers, useSolvedProgrammers } from "@/lib/storage";

/** Programmers 난이도 Lv.1~Lv.5를 Token이 이미 쓰는 팔레트에 얹어요. */
const LEVEL_COLOR = [
  "teal", // Lv.1
  "blue", // Lv.2
  "yellow", // Lv.3
  "orange", // Lv.4
  "red", // Lv.5
] as const;

/**
 * The week's curated Programmers problems.
 *
 * These are links, not exercises: Programmers keeps its judge data on its own
 * site, so this site cannot grade them. The checkbox is therefore a manual
 * checklist — you tick it after solving on programmers.co.kr.
 *
 * Collapsed by default so it doesn't bury the week's own four problems above it.
 */
export function ProgrammersList({
  problems,
}: {
  problems: ProgrammersProblem[];
}) {
  const solvedIds = useSolvedProgrammers();
  const solved = new Set(solvedIds);
  const done = problems.filter((p) => solved.has(p.id)).length;

  if (problems.length === 0) return null;

  return (
    <Collapsible
      defaultIsOpen={false}
      trigger={
        <HStack gap={3} align="center">
          <Text weight="semibold">프로그래머스 추천 문제</Text>
          <Text type="label" color="secondary">
            {done} / {problems.length}
          </Text>
        </HStack>
      }
    >
      <VStack gap={3}>
        <Text size="sm" color="secondary" textWrap="pretty">
          이번 주 주제로 골라둔 문제예요. 채점은 프로그래머스에서 하고, 풀고 나면
          여기에 체크해 두세요. 난이도 순으로 보여줘요.
        </Text>

        <ProgressBar
          value={(done / problems.length) * 100}
          label="프로그래머스 진행률"
          isLabelHidden
        />

        <List hasDividers>
          {problems.map((problem) => {
            const level = levelLabel(problem.level);
            return (
              <ListItem
                key={problem.id}
                label={problem.title}
                startContent={
                  <CheckboxInput
                    size="sm"
                    label={`${problem.title} 푼 문제로 표시`}
                    isLabelHidden
                    value={solved.has(problem.id)}
                    onChange={() => toggleProgrammers(problem.id)}
                  />
                }
                endContent={
                  <HStack gap={3} align="center">
                    <Token
                      label={level.text}
                      size="sm"
                      color={
                        level.group < 0 ? "default" : LEVEL_COLOR[level.group]
                      }
                    />
                    <Link
                      href={`https://school.programmers.co.kr/learn/courses/30/lessons/${problem.id}`}
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
