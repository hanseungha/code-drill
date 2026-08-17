"use client";

import { Card } from "@astryxdesign/core/Card";
import { CodeBlock } from "@astryxdesign/core/CodeBlock";
import { Collapsible } from "@astryxdesign/core/Collapsible";
import { Divider } from "@astryxdesign/core/Divider";
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { Link } from "@astryxdesign/core/Link";
import { List, ListItem } from "@astryxdesign/core/List";
import {
  MetadataList,
  MetadataListItem,
} from "@astryxdesign/core/MetadataList";
import { Heading, Text } from "@astryxdesign/core/Text";
import { Token } from "@astryxdesign/core/Token";
import { DifficultyToken } from "@/components/DifficultyToken";
import { RichText } from "@/components/RichText";
import { weekOfProblem } from "@/lib/curriculum";
import type { Language, Problem } from "@/lib/types";

export function ProblemPanel({
  problem,
  language,
  solved,
  prev,
  next,
}: {
  problem: Problem;
  language: Language;
  solved: boolean;
  prev?: { slug: string; title: string };
  next?: { slug: string; title: string };
}) {
  // Every problem belongs to a week, so the lesson behind it is always one hop
  // away — the concept is the point of the site, not a footnote.
  const week = weekOfProblem(problem.slug);

  return (
    <VStack gap={6} padding={5}>
      <VStack gap={3}>
        {week && (
          <Link href={`/week/${week.week}`} isStandalone>
            ← {week.week}주차 · {week.title}
          </Link>
        )}
        <HStack gap={1.5} align="center" wrap="wrap">
          <DifficultyToken difficulty={problem.difficulty} />
          {problem.tags.map((t) => (
            <Token key={t} label={t} size="sm" />
          ))}
          {solved && <Token label="해결" size="sm" color="green" />}
        </HStack>
        <Heading level={1}>{problem.title}</Heading>
      </VStack>

      <VStack gap={3}>
        {problem.description.map((paragraph, i) => (
          <Text key={i} as="p" display="block" textWrap="pretty">
            <RichText text={paragraph} />
          </Text>
        ))}
      </VStack>

      <VStack gap={3}>
        <Heading level={2}>예시</Heading>
        {problem.examples.map((example, i) => (
          <Card key={i} variant="muted" padding={4}>
            <VStack gap={2}>
              {problem.examples.length > 1 && (
                <Text type="label">예시 {i + 1}</Text>
              )}
              <MetadataList label={{ position: "start", width: 56 }}>
                <MetadataListItem label="입력">
                  <Text type="code">{example.input}</Text>
                </MetadataListItem>
                <MetadataListItem label="출력">
                  <Text type="code" color="accent">
                    {example.output}
                  </Text>
                </MetadataListItem>
                {example.explain && (
                  <MetadataListItem label="설명">
                    <Text type="supporting">
                      <RichText text={example.explain} />
                    </Text>
                  </MetadataListItem>
                )}
              </MetadataList>
            </VStack>
          </Card>
        ))}
      </VStack>

      <VStack gap={2}>
        <Heading level={2}>제한 사항</Heading>
        <List listStyle="disc" density="compact">
          {problem.constraints.map((constraint, i) => (
            <ListItem key={i} label={constraint} />
          ))}
        </List>
      </VStack>

      {problem.hint && (
        <Collapsible trigger="힌트 보기" defaultIsOpen={false}>
          <Text textWrap="pretty">
            <RichText text={problem.hint} />
          </Text>
        </Collapsible>
      )}

      <Collapsible trigger="모범 답안 보기" defaultIsOpen={false}>
        <CodeBlock
          code={problem.solution[language]}
          language={language}
          width="100%"
          hasLineNumbers
        />
      </Collapsible>

      <Divider />

      <HStack justify={prev ? "between" : "end"} gap={4} align="start">
        {prev && (
          <VStack gap={0.5}>
            <Text type="supporting">이전 문제</Text>
            <Link href={`/problems/${prev.slug}`}>{prev.title}</Link>
          </VStack>
        )}
        {next && (
          <VStack gap={0.5} hAlign="end">
            <Text type="supporting">다음 문제</Text>
            <Link href={`/problems/${next.slug}`}>{next.title}</Link>
          </VStack>
        )}
      </HStack>
    </VStack>
  );
}
