import { Badge } from "@astryxdesign/core/Badge";
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { Heading, Text } from "@astryxdesign/core/Text";
import { ProblemBrowser, type ProblemSummary } from "@/components/ProblemBrowser";
import { allTags, problems } from "@/lib/problems";

// Only the list-facing fields cross to the client — descriptions, test cases
// and solutions stay on the problem page's own bundle.
const items: ProblemSummary[] = problems.map((p) => ({
  slug: p.slug,
  title: p.title,
  difficulty: p.difficulty,
  tags: p.tags,
  summary: p.summary,
}));

export default function Home() {
  return (
    <VStack isScrollable height="100%" padding={6} hAlign="center" as="main">
      <VStack gap={10} width="100%" maxWidth={960}>
        <VStack gap={3}>
          <HStack>
            <Badge label="설치 없이 브라우저에서 바로 채점" variant="teal" />
          </HStack>
          <Heading level={1}>코딩테스트, 매일 한 문제씩 훈련하세요</Heading>
          <Text color="secondary" textWrap="pretty">
            JavaScript와 Python 코드를 브라우저 안에서 실행하고 테스트 케이스로
            채점합니다. 로그인도, 서버도 필요 없습니다.
          </Text>
        </VStack>

        <ProblemBrowser items={items} tags={allTags} />
      </VStack>
    </VStack>
  );
}
