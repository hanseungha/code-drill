import { Badge } from "@astryxdesign/core/Badge";
import { Divider } from "@astryxdesign/core/Divider";
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { Link } from "@astryxdesign/core/Link";
import { Markdown } from "@astryxdesign/core/Markdown";
import { Heading, Text } from "@astryxdesign/core/Text";
import { Token } from "@astryxdesign/core/Token";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConceptNote } from "@/components/ConceptNote";
import { PatternList } from "@/components/PatternList";
import {
  type RelatedProblem,
  RelatedProblems,
} from "@/components/RelatedProblems";
import {
  getAdjacentPattern,
  getPattern,
  getPatternCategory,
  patterns,
} from "@/lib/patterns";
import { getProblem } from "@/lib/problems";

export function generateStaticParams() {
  return patterns.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/patterns/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const pattern = getPattern(slug);
  if (!pattern) return { title: "유형을 찾을 수 없어요" };
  return {
    title: `${pattern.title} · 유형별 정리`,
    description: pattern.summary,
  };
}

export default async function PatternPage({
  params,
}: PageProps<"/patterns/[slug]">) {
  const { slug } = await params;
  const pattern = getPattern(slug);
  if (!pattern) notFound();

  const category = getPatternCategory(pattern.category);
  const { prev, next } = getAdjacentPattern(slug);

  // Resolve related problems here so a renamed problem can't leave a pattern
  // pointing at a stale title, and so the client component only receives the
  // few fields it renders.
  const related: RelatedProblem[] = pattern.relatedSlugs
    .map((s) => getProblem(s))
    .filter((p) => p !== undefined)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      difficulty: p.difficulty,
    }));

  return (
    <VStack isScrollable height="100%" padding={6} hAlign="center" as="main">
      <VStack gap={8} width="100%" maxWidth={860}>
        <VStack gap={3}>
          <HStack gap={2} align="center">
            <Link href="/patterns" isStandalone>
              유형별 정리
            </Link>
            <Text color="secondary">/</Text>
            <Text type="label" color="secondary">
              {category?.title}
            </Text>
          </HStack>

          <HStack gap={3} align="center">
            <Badge label={category?.title ?? "유형"} variant="teal" />
            <Token label={pattern.complexity} color="blue" />
          </HStack>

          <Heading level={1}>{pattern.title}</Heading>
          <Text color="secondary" textWrap="pretty">
            {pattern.summary}
          </Text>
        </VStack>

        <Divider />

        <VStack gap={3}>
          <Heading level={2}>이럴 때 써요</Heading>
          <Markdown density="compact">
            {pattern.cues.map((cue) => `- ${cue}`).join("\n")}
          </Markdown>
        </VStack>

        <Divider />

        <VStack gap={5}>
          <Heading level={2}>개념</Heading>
          <ConceptNote blocks={pattern.concept} />
        </VStack>

        {pattern.codes.length > 0 && (
          <>
            <Divider />
            <PatternList patterns={pattern.codes} />
          </>
        )}

        <Divider />

        <VStack gap={5}>
          <Heading level={2}>이 유형으로 풀어보기</Heading>
          <RelatedProblems problems={related} />
        </VStack>

        <Divider />

        <HStack hAlign="between" align="center">
          {prev ? (
            <Link href={`/patterns/${prev.slug}`} isStandalone>
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/patterns/${next.slug}`} isStandalone>
              {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </HStack>
      </VStack>
    </VStack>
  );
}
