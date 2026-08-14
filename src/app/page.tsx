import { Badge } from "@astryxdesign/core/Badge";
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { Link } from "@astryxdesign/core/Link";
import { Heading, Text } from "@astryxdesign/core/Text";
import { ProblemBrowser, type ProblemSummary } from "@/components/ProblemBrowser";
import { weekOfProblem } from "@/lib/curriculum";
import { allTags, problems } from "@/lib/problems";

// Only the list-facing fields cross to the client — descriptions, test cases
// and solutions stay on the problem page's own bundle.
const items: ProblemSummary[] = problems.map((p) => ({
  slug: p.slug,
  title: p.title,
  difficulty: p.difficulty,
  tags: p.tags,
  summary: p.summary,
  week: weekOfProblem(p.slug)?.week,
}));

export default function Home() {
  return (
    <VStack isScrollable height="100%" padding={6} hAlign="center" as="main">
      <VStack gap={10} width="100%" maxWidth={960}>
        <VStack gap={3}>
          <HStack>
            <Badge label="설치 없이 브라우저에서 바로 채점" variant="teal" />
          </HStack>
          <Heading level={1}>문제 전체</Heading>
          <Text color="secondary" textWrap="pretty">
            <Link href="/curriculum">24주 커리큘럼</Link> 순서로 정렬돼 있습니다.
            개념부터 익히려면 주차별로 보는 편이 낫습니다. JavaScript와 Python
            코드는 브라우저 안에서 실행되고 채점됩니다.
          </Text>
        </VStack>

        <ProblemBrowser items={items} tags={allTags} />
      </VStack>
    </VStack>
  );
}
