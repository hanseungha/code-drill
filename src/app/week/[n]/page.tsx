import { Badge } from "@astryxdesign/core/Badge";
import { Divider } from "@astryxdesign/core/Divider";
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { Link } from "@astryxdesign/core/Link";
import { Markdown } from "@astryxdesign/core/Markdown";
import { Heading, Text } from "@astryxdesign/core/Text";
import { Token } from "@astryxdesign/core/Token";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BaekjoonList } from "@/components/BaekjoonList";
import { ConceptNote } from "@/components/ConceptNote";
import { PatternList } from "@/components/PatternList";
import {
  WeekProblemList,
  type WeekProblemRow,
} from "@/components/WeekProblemList";
import {
  getAdjacentWeek,
  getPhase,
  getWeek,
  weeks,
} from "@/lib/curriculum";
import { recommendedForWeek } from "@/lib/baekjoon";
import { getProblem } from "@/lib/problems";

export function generateStaticParams() {
  return weeks.map((w) => ({ n: String(w.week) }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/week/[n]">): Promise<Metadata> {
  const { n } = await params;
  const week = getWeek(Number(n));
  if (!week) return { title: "주차를 찾을 수 없어요" };
  return {
    title: `${week.week}주차 · ${week.title}`,
    description: week.summary,
  };
}

export default async function WeekPage({ params }: PageProps<"/week/[n]">) {
  const { n } = await params;
  const week = getWeek(Number(n));
  if (!week) notFound();

  const phase = getPhase(week.phase);
  const { prev, next } = getAdjacentWeek(week.week);

  // A written problem's own title and difficulty win over the curriculum's
  // placeholder, so renaming a problem cannot leave the week screen stale.
  const rows: WeekProblemRow[] = week.problems.map((entry) => {
    const problem = entry.slug ? getProblem(entry.slug) : undefined;
    return {
      slug: problem?.slug,
      title: problem?.title ?? entry.title,
      role: entry.role,
      teaches: entry.teaches,
      difficulty: problem?.difficulty,
      summary: problem?.summary,
    };
  });

  return (
    <VStack isScrollable height="100%" padding={6} hAlign="center" as="main">
      <VStack gap={8} width="100%" maxWidth={860}>
        <VStack gap={3}>
          <HStack gap={2} align="center">
            <Link href="/curriculum" isStandalone>
              커리큘럼
            </Link>
            <Text color="secondary">/</Text>
            <Text type="label" color="secondary">
              페이즈 {week.phase} · {phase?.title}
            </Text>
          </HStack>

          <HStack gap={3} align="center">
            <Badge label={`${week.week}주차`} variant="teal" />
            {week.isCheckpoint && <Token label="체크포인트" color="yellow" />}
          </HStack>

          <Heading level={1}>{week.title}</Heading>
          <Text color="secondary" textWrap="pretty">
            {week.summary}
          </Text>
        </VStack>

        <Divider />

        <VStack gap={5}>
          <Heading level={2}>개념</Heading>
          <ConceptNote blocks={week.concept} />
        </VStack>

        {week.patterns.length > 0 && (
          <>
            <Divider />
            <PatternList patterns={week.patterns} />
          </>
        )}

        <Divider />

        <VStack gap={5}>
          <Heading level={2}>
            {week.isCheckpoint ? "모의고사" : "이번 주 문제"}
          </Heading>
          {week.isCheckpoint && (
            <Text size="sm" color="secondary" textWrap="pretty">
              유형은 알려주지 않아요. 타이머를 걸고 풀어 보세요.
            </Text>
          )}
          <WeekProblemList rows={rows} />
          <BaekjoonList problems={recommendedForWeek(week.week)} />
        </VStack>

        <Divider />

        <VStack gap={3}>
          <Heading level={2}>셀프 체크</Heading>
          <Text size="sm" color="secondary" textWrap="pretty">
            다음 주로 넘어가기 전에 소리 내어 답해 보세요. 막히면 그 부분이 아직
            덜 익은 개념이에요.
          </Text>
          {/*
            Markdown rather than List/ListItem, for the same reason ConceptNote
            uses it: a ListItem's label is a plain string, so a question like
            "`[[0] * m] * n` 이 왜 위험한가?" would show its backticks.
          */}
          <Markdown density="compact">
            {week.selfCheck.map((q, i) => `${i + 1}. ${q}`).join("\n")}
          </Markdown>
        </VStack>

        <Divider />

        <HStack hAlign="between" align="center">
          {prev ? (
            <Link href={`/week/${prev.week}`} isStandalone>
              ← {prev.week}주차 · {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/week/${next.week}`} isStandalone>
              {next.week}주차 · {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </HStack>
      </VStack>
    </VStack>
  );
}
