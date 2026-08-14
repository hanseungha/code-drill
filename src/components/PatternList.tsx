"use client";

import { CodeBlock } from "@astryxdesign/core/CodeBlock";
import { HStack, VStack } from "@astryxdesign/core/Layout";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@astryxdesign/core/SegmentedControl";
import { Heading, Text } from "@astryxdesign/core/Text";
import { useEffect, useState } from "react";
import { RichText } from "@/components/RichText";
import type { CodePattern } from "@/lib/curriculum";
import { loadLanguage, saveLanguage } from "@/lib/storage";
import { LANGUAGES, LANGUAGE_LABEL, type Language } from "@/lib/types";

/**
 * One language switch drives every pattern on the page, and it writes back to
 * the same stored preference the editor uses so a lesson and its problems do
 * not disagree about which language you are learning in.
 */
export function PatternList({ patterns }: { patterns: CodePattern[] }) {
  const [language, setLanguage] = useState<Language>("javascript");

  // Read after mount. Touching localStorage during render would make the
  // client markup differ from what was prerendered.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setLanguage(loadLanguage() ?? "javascript");
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const choose = (next: Language) => {
    setLanguage(next);
    saveLanguage(next);
  };

  return (
    <VStack gap={5}>
      <HStack hAlign="between" align="center">
        <Heading level={2}>패턴 코드</Heading>
        <SegmentedControl
          value={language}
          onChange={(value) => choose(value as Language)}
          size="sm"
          label="언어 선택"
        >
          {LANGUAGES.map((lang) => (
            <SegmentedControlItem
              key={lang}
              value={lang}
              label={LANGUAGE_LABEL[lang]}
            />
          ))}
        </SegmentedControl>
      </HStack>

      {patterns.map((pattern, i) => (
        <VStack key={i} gap={2}>
          <Text type="label" weight="semibold">
            {pattern.title}
          </Text>
          {pattern.note && (
            <Text size="sm" color="secondary" textWrap="pretty">
              <RichText text={pattern.note} />
            </Text>
          )}
          <CodeBlock
            code={pattern.code[language]}
            language={language}
            width="100%"
          />
        </VStack>
      ))}
    </VStack>
  );
}
