"use client";

import { HStack } from "@astryxdesign/core/Layout";
import { Link } from "@astryxdesign/core/Link";
import { Text } from "@astryxdesign/core/Text";
import { TopNav } from "@astryxdesign/core/TopNav";
import { ColorModeToggle } from "@/components/ColorModeToggle";

const REPO_URL = "https://github.com/hanseungha/code-drill";

export function SiteHeader() {
  return (
    <TopNav
      label="주요 메뉴"
      heading={
        // LinkProvider routes this through next/link, so it prefetches.
        <Link href="/">
          <HStack gap={2} align="center">
            <BrandMark />
            <Text type="label" weight="semibold">
              code-drill
            </Text>
          </HStack>
        </Link>
      }
      endContent={
        <HStack gap={4} align="center">
          <Link href="/curriculum" isStandalone>
            커리큘럼
          </Link>
          <Link href="/" isStandalone>
            문제
          </Link>
          <Link href={REPO_URL} isExternalLink isStandalone>
            GitHub
          </Link>
          <ColorModeToggle />
        </HStack>
      }
    />
  );
}

function BrandMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 6 3 12l5 6M16 6l5 6-5 6" />
    </svg>
  );
}
