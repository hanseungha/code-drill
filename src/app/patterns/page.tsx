import { Badge } from "@astryxdesign/core/Badge";
import { HStack, VStack } from "@astryxdesign/core/Layout";
import { List, ListItem } from "@astryxdesign/core/List";
import { Heading, Text } from "@astryxdesign/core/Text";
import { Token } from "@astryxdesign/core/Token";
import type { Metadata } from "next";
import { patternCategories, patternsOfCategory } from "@/lib/patterns";

export const metadata: Metadata = {
  title: "유형별 정리",
  description:
    "자주 나오는 알고리즘 유형을 개념·코드·함정까지 한 장에 모은 참고서예요.",
};

export default function PatternsPage() {
  return (
    <VStack isScrollable height="100%" padding={6} hAlign="center" as="main">
      <VStack gap={10} width="100%" maxWidth={860}>
        <VStack gap={3}>
          <HStack>
            <Badge label="유형별 정리" variant="teal" />
          </HStack>
          <Heading level={1}>자주 나오는 유형</Heading>
          <Text color="secondary" textWrap="pretty">
            커리큘럼이 순서대로 익히는 길이라면, 여기는 필요할 때 바로 펴보는
            참고서예요. 유형마다 언제 쓰는지, 어떻게 짜는지, 어디서 실수하는지를
            한 장에 모았어요.
          </Text>
        </VStack>

        {patternCategories.map((category) => (
          <VStack key={category.id} gap={5}>
            <VStack gap={2}>
              <Heading level={2}>{category.title}</Heading>
              <Text color="secondary" textWrap="pretty">
                {category.blurb}
              </Text>
            </VStack>
            <List hasDividers>
              {patternsOfCategory(category.id).map((pattern) => (
                <ListItem
                  key={pattern.slug}
                  href={`/patterns/${pattern.slug}`}
                  label={pattern.title}
                  description={pattern.summary}
                  endContent={
                    <Token label={pattern.complexity} size="sm" color="blue" />
                  }
                />
              ))}
            </List>
          </VStack>
        ))}
      </VStack>
    </VStack>
  );
}
