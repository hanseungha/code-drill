/**
 * Pulls the recommended-problem list out of tony9402/baekjoon (MIT) and writes
 * it to `src/lib/baekjoon/recommended.json`.
 *
 * Only the curated *index* comes across — problem number, title, solved.ac tier
 * and which category the list put it in. The statements and judge data are not
 * in that repository at all (its tables are links to acmicpc.net), and they
 * belong to Baekjoon, so the site links out rather than hosting them.
 *
 * Run with `npm run baekjoon`. The output is committed, so the site never
 * fetches anything at build or request time.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const REPO = "https://github.com/tony9402/baekjoon";
const RAW = "https://raw.githubusercontent.com/tony9402/baekjoon/main/algorithms";
const OUT = fileURLToPath(
  new URL("../src/lib/baekjoon/recommended.json", import.meta.url),
);

/**
 * The repository's 23 categories, mapped onto our weeks. A category lands in
 * exactly one week; see OVERRIDES for the handful of problems that don't.
 *
 * Two weeks get nothing and that is expected: 7주차 (정렬) has no matching
 * category upstream, and the checkpoint weeks are mock exams rather than a
 * topic. Weeks 6, 12 and 24 are checkpoints.
 */
const CATEGORY_WEEK: Record<string, number> = {
  math: 1,
  prefix_sum: 2,
  string: 3,
  brute_force: 4,
  implementation: 4,
  simulation: 4,
  two_pointer: 8,
  greedy: 9,
  data_structure: 10, // 큐 · 스택 · 덱
  binary_search: 11,
  divide_and_conquer: 13,
  tree: 14,
  graph_traversal: 15,
  backtracking: 17,
  data_structure2: 18, // Map · Set · 우선순위 큐 — Map/Set 쪽은 아래에서 5주차로
  dynamic_programming_1: 19,
  dynamic_programming_2: 20,
  shortest_path: 21,
  topological_sorting: 21,
  minimum_spanning_tree: 22,
  disjoint_set: 22,
  dynamic_programming_on_trees: 23,
  trie: 23,
};

/**
 * Problems whose week differs from their category's. Keyed by problem number so
 * a re-fetch keeps them in place.
 *
 * - `data_structure2` mixes hash containers with priority queues, and we teach
 *   those 13 weeks apart.
 * - `graph_traversal` holds both "walk the graph" and "BFS gives the shortest
 *   path", which are our weeks 15 and 16.
 */
const OVERRIDES: Record<number, number> = {
  // data_structure2 → 5주차 (해시)
  1620: 5, // 나는야 포켓몬 마스터 이다솜
  14425: 5, // 문자열 집합
  4358: 5, // 생태학

  // graph_traversal → 16주차 (BFS 최단 거리와 격자)
  14940: 16, // 쉬운 최단거리
  2178: 16, // 미로 탐색
  13549: 16, // 숨바꼭질 3
  17836: 16, // 공주님을 구해라!
  7576: 16, // 토마토
  7569: 16, // 토마토 (3차원)
  18513: 16, // 샘터
  16973: 16, // 직사각형 탈출
  14502: 16, // 연구소
  4179: 16, // 불!
  1600: 16, // 말이 되고픈 원숭이
  2206: 16, // 벽 부수고 이동하기
  16954: 16, // 움직이는 미로 탈출
  22868: 16, // 산책 (small)
  22946: 16, // 원 이동하기 1
  22948: 16, // 원 이동하기 2

  // graph_traversal → 23주차 (트리 DP)
  1967: 23, // 트리의 지름
};

/**
 * A row of the category README's table.
 * Columns: 순번 · 추천 · 번호 · 이름 · 난이도 · 풀이 — captured as 1‥4.
 * Numbered groups rather than named ones: tsconfig targets below ES2018.
 */
const ROW =
  /^\|\d+\|([^|]*)\|<a href="https:\/\/www\.acmicpc\.net\/problem\/(\d+)"[^>]*>\d+<\/a>\|<a href="[^"]*"[^>]*>([^<]*)<\/a>\|([^|]*)\|/;

interface Entry {
  id: number;
  title: string;
  /** solved.ac tier, 1 (브론즈 V) ~ 30 (루비 I). 0 means unrated. */
  tier: number;
  category: string;
  week: number;
}

async function fetchCategory(category: string): Promise<Entry[]> {
  const response = await fetch(`${RAW}/${category}/README.md`);
  if (!response.ok) {
    throw new Error(`${category}: HTTP ${response.status}`);
  }
  const entries: Entry[] = [];
  let rows = 0;

  for (const line of (await response.text()).split("\n")) {
    const match = ROW.exec(line);
    if (!match) continue;
    rows++;
    const [, recommended, number, title, tier] = match;
    if (!recommended.includes("heavy_check_mark")) continue;

    const id = Number(number);
    entries.push({
      id,
      title: title.trim(),
      tier: Number(/tier_small\/(\d+)\.svg/.exec(tier)?.[1] ?? 0),
      category,
      week: OVERRIDES[id] ?? CATEGORY_WEEK[category],
    });
  }

  // A silent zero here would mean the upstream table changed shape and we
  // quietly shipped an empty list, so fail loudly instead.
  if (rows === 0) throw new Error(`${category}: 표를 한 줄도 파싱하지 못했습니다`);
  console.log(`${category.padEnd(30)} ${String(rows).padStart(4)}행 → 추천 ${entries.length}개`);
  return entries;
}

const categories = Object.keys(CATEGORY_WEEK);
const all = (await Promise.all(categories.map(fetchCategory))).flat();

// Sorted so a re-fetch produces a minimal diff — and so that the dedupe below,
// which keeps the first of a repeated problem, keeps the *earliest* week. A
// problem listed under two categories is one the earlier week's tools already
// solve, which is the curriculum's own ordering rule.
all.sort((a, b) => a.week - b.week || a.tier - b.tier || a.id - b.id);

const seen = new Map<number, Entry>();
for (const entry of all) {
  const previous = seen.get(entry.id);
  if (previous) {
    console.log(`  중복: ${entry.id} ${entry.title} (${previous.category} · ${entry.category})`);
    continue;
  }
  seen.set(entry.id, entry);
}
const problems = [...seen.values()];

const byWeek = new Map<number, number>();
for (const p of problems) byWeek.set(p.week, (byWeek.get(p.week) ?? 0) + 1);

writeFileSync(
  OUT,
  JSON.stringify(
    {
      source: REPO,
      license: "MIT",
      note: "큐레이션 목록만 가져옵니다. 문제 지문과 채점 데이터는 acmicpc.net에 있습니다.",
      problems,
    },
    null,
    2,
  ) + "\n",
);

console.log();
console.log(`추천 ${problems.length}문제를 ${byWeek.size}개 주차에 배치했습니다.`);
console.log(
  [...byWeek.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([week, count]) => `${week}주차 ${count}`)
    .join(" · "),
);
