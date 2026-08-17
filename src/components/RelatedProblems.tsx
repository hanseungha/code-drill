"use client";

import { Icon } from "@astryxdesign/core/Icon";
import { List, ListItem } from "@astryxdesign/core/List";
import { Text } from "@astryxdesign/core/Text";
import { DifficultyToken } from "@/components/DifficultyToken";
import { useSolvedSlugs } from "@/lib/storage";
import type { Difficulty } from "@/lib/types";

export interface RelatedProblem {
  slug: string;
  title: string;
  summary: string;
  difficulty: Difficulty;
}

/**
 * The written problems that drill a pattern, with a per-problem solved mark —
 * the same checkmark the week screen uses, read from the same stored progress,
 * so a pattern and its problems agree on what you've finished.
 *
 * A pattern with no linked problem yet says so plainly rather than showing an
 * empty box: the number-theory types outrun the current problem set.
 */
export function RelatedProblems({ problems }: { problems: RelatedProblem[] }) {
  const solved = new Set(useSolvedSlugs());

  if (problems.length === 0) {
    return (
      <Text size="sm" color="secondary" textWrap="pretty">
        이 유형에 딱 맞는 문제는 아직 준비 중이에요. 개념과 코드로 먼저 감을
        잡아 두세요.
      </Text>
    );
  }

  return (
    <List hasDividers>
      {problems.map((problem) => {
        const isSolved = solved.has(problem.slug);
        return (
          <ListItem
            key={problem.slug}
            href={`/problems/${problem.slug}`}
            label={problem.title}
            description={problem.summary}
            startContent={
              isSolved ? (
                <Icon icon="success" color="accent" label="완료" />
              ) : undefined
            }
            endContent={<DifficultyToken difficulty={problem.difficulty} />}
          />
        );
      })}
    </List>
  );
}
