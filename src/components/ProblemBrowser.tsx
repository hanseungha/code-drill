"use client";

import { Button } from "@astryxdesign/core/Button";
import { EmptyState } from "@astryxdesign/core/EmptyState";
import { Icon } from "@astryxdesign/core/Icon";
import { Card, HStack, VStack } from "@astryxdesign/core/Layout";
import { List, ListItem } from "@astryxdesign/core/List";
import { ProgressBar } from "@astryxdesign/core/ProgressBar";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@astryxdesign/core/SegmentedControl";
import { Switch } from "@astryxdesign/core/Switch";
import { Text } from "@astryxdesign/core/Text";
import { TextInput } from "@astryxdesign/core/TextInput";
import { Token } from "@astryxdesign/core/Token";
import { useMemo, useState } from "react";
import { DifficultyToken } from "@/components/DifficultyToken";
import { resetProgress, useSolvedSlugs } from "@/lib/storage";
import { DIFFICULTIES, DIFFICULTY_LABEL, type Difficulty } from "@/lib/types";

export interface ProblemSummary {
  slug: string;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  summary: string;
  /** Curriculum week, absent only if a problem is not scheduled yet. */
  week?: number;
}

type DifficultyFilter = Difficulty | "all";

export function ProblemBrowser({
  items,
  tags,
}: {
  items: ProblemSummary[];
  tags: string[];
}) {
  const solvedSlugs = useSolvedSlugs();
  const solved = useMemo(() => new Set(solvedSlugs), [solvedSlugs]);

  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [tag, setTag] = useState<string | null>(null);
  const [hideSolved, setHideSolved] = useState(false);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((p) => {
      if (difficulty !== "all" && p.difficulty !== difficulty) return false;
      if (tag && !p.tags.includes(tag)) return false;
      if (hideSolved && solved.has(p.slug)) return false;
      if (!needle) return true;
      return (
        p.title.toLowerCase().includes(needle) ||
        p.summary.toLowerCase().includes(needle) ||
        p.tags.some((t) => t.toLowerCase().includes(needle))
      );
    });
  }, [items, query, difficulty, tag, hideSolved, solved]);

  const solvedCount = items.filter((p) => solved.has(p.slug)).length;
  const isFiltered =
    query.trim() !== "" || difficulty !== "all" || tag !== null || hideSolved;

  function clearFilters() {
    setQuery("");
    setDifficulty("all");
    setTag(null);
    setHideSolved(false);
  }

  return (
    <VStack gap={6}>
      {/* Card is right here: a self-contained progress widget, not a list row. */}
      <Card padding={4}>
        <VStack gap={3}>
          <HStack justify="between" align="center" gap={4}>
            <Text type="label" color="secondary">
              진행률
            </Text>
            <Text type="label" hasTabularNumbers>
              {solvedCount} / {items.length}
            </Text>
          </HStack>
          <ProgressBar
            label="푼 문제 수"
            isLabelHidden
            value={solvedCount}
            max={items.length}
          />
          {solvedCount > 0 && (
            <HStack>
              <Button
                variant="ghost"
                size="sm"
                label="기록 초기화"
                onClick={() => {
                  if (
                    window.confirm(
                      "푼 기록과 저장된 코드를 모두 지웁니다. 계속할까요?",
                    )
                  ) {
                    resetProgress();
                  }
                }}
              />
            </HStack>
          )}
        </VStack>
      </Card>

      <VStack gap={3}>
        <HStack gap={3} align="center" wrap="wrap">
          <TextInput
            label="문제 검색"
            isLabelHidden
            placeholder="문제 이름 또는 유형 검색"
            value={query}
            onChange={setQuery}
            size="sm"
            startIcon={SearchIcon}
            hasClear
          />
          <SegmentedControl
            value={difficulty}
            onChange={(next) => setDifficulty(next as DifficultyFilter)}
            label="난이도 필터"
            size="sm"
          >
            <SegmentedControlItem value="all" label="전체" />
            {DIFFICULTIES.map((d) => (
              <SegmentedControlItem
                key={d}
                value={d}
                label={DIFFICULTY_LABEL[d]}
              />
            ))}
          </SegmentedControl>
          <Switch
            label="푼 문제 숨기기"
            value={hideSolved}
            onChange={setHideSolved}
            size="sm"
          />
        </HStack>

        <HStack gap={1.5} wrap="wrap">
          <Token
            label="모든 유형"
            size="sm"
            color={tag === null ? "teal" : "default"}
            onClick={() => setTag(null)}
          />
          {tags.map((t) => (
            <Token
              key={t}
              label={t}
              size="sm"
              color={tag === t ? "teal" : "default"}
              onClick={() => setTag(tag === t ? null : t)}
            />
          ))}
        </HStack>
      </VStack>

      {visible.length === 0 ? (
        <EmptyState
          title="조건에 맞는 문제가 없습니다"
          description="검색어나 필터를 바꿔보세요."
          actions={
            isFiltered ? (
              <Button label="필터 초기화" onClick={clearFilters} />
            ) : undefined
          }
        />
      ) : (
        <List hasDividers density="balanced">
          {visible.map((p, i) => {
            const isSolved = solved.has(p.slug);
            return (
              <ListItem
                key={p.slug}
                href={`/problems/${p.slug}`}
                label={p.title}
                description={p.summary}
                startContent={
                  isSolved ? (
                    <Icon icon="success" color="success" label="푼 문제" />
                  ) : (
                    <Text type="supporting" hasTabularNumbers>
                      {String(i + 1).padStart(2, "0")}
                    </Text>
                  )
                }
                endContent={
                  <HStack gap={1.5} align="center">
                    {/* The list is in curriculum order, so the week explains
                        why an easy problem can follow a harder one. */}
                    {p.week !== undefined && (
                      <Token label={`${p.week}주차`} size="sm" color="blue" />
                    )}
                    {p.tags.map((t) => (
                      <Token key={t} label={t} size="sm" />
                    ))}
                    <DifficultyToken difficulty={p.difficulty} />
                  </HStack>
                }
              />
            );
          })}
        </List>
      )}
    </VStack>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
