import type { Week } from "@/lib/curriculum/types";

export const w23: Week = {
  week: 23,
  phase: 4,
  title: "고급 기법",
  summary: "알아두면 어려운 문제가 갑자기 쉬워지는 도구 모음.",
  concept: [
    {
      kind: "text",
      body: "마지막 개념 주차입니다. 여기 나오는 것들은 매번 쓰이지는 않지만, 필요한 순간에 모르면 아예 못 푸는 도구들입니다.",
    },
    {
      kind: "heading",
      body: "누적합과 차분 배열",
    },
    {
      kind: "text",
      body: "1주차에서 누적합을 잠깐 봤습니다. 미리 앞에서부터 더해두면 어떤 구간 합이든 뺄셈 한 번으로 답합니다. **차분 배열**은 그 반대입니다 — 구간에 값을 여러 번 더해야 할 때 씁니다.",
    },
    {
      kind: "text",
      body: "구간 `[l, r]`에 x를 더하려면, 차분 배열의 `l`에 `+x`, `r+1`에 `-x`만 기록합니다. 모든 갱신을 마친 뒤 누적합을 한 번 취하면 최종 배열이 나옵니다. 갱신 하나가 `O(1)`이라, 갱신이 많고 조회는 마지막에 한 번인 문제에서 `O(n·q)`를 `O(n+q)`로 줄입니다.",
    },
    {
      kind: "table",
      headers: ["상황", "도구", "효과"],
      rows: [
        ["구간 합을 여러 번 조회, 값은 안 바뀜", "누적합", "조회 `O(1)`"],
        ["구간에 값을 여러 번 더함, 조회는 마지막에", "차분 배열", "갱신 `O(1)`"],
        ["갱신과 조회가 뒤섞임", "세그먼트 트리 (범위 밖)", "둘 다 `O(log n)`"],
      ],
    },
    {
      kind: "heading",
      body: "비트마스크",
    },
    {
      kind: "text",
      body: "정수 하나의 각 비트를 '포함/미포함'으로 읽으면 집합을 정수로 표현할 수 있습니다. 원소가 20개 이하일 때 부분집합 전체를 `0`부터 `2ⁿ-1`까지의 정수로 순회할 수 있어, 백트래킹 대신 반복문 하나로 완전 탐색이 됩니다.",
    },
    {
      kind: "text",
      body: "13주차의 '상태를 늘린 BFS'와도 이어집니다. 열쇠를 여러 개 모으는 문제에서 '어떤 열쇠를 가졌는가'를 비트마스크 하나로 표현하면 `visited[x][y][mask]`가 됩니다.",
    },
    {
      kind: "trap",
      title: "비트 연산자는 우선순위가 비교 연산자보다 낮습니다",
      body: "`mask & 1 << i == 0` 은 의도대로 동작하지 않습니다. 파이썬과 JavaScript 모두 `==`가 먼저 묶여 버립니다. 비트 연산은 **항상 괄호로 감싸세요**: `(mask & (1 << i)) == 0`. 에러 없이 조용히 틀리는 종류의 버그입니다.",
    },
    {
      kind: "heading",
      body: "좌표 압축",
    },
    {
      kind: "text",
      body: "값의 범위가 10억인데 실제로 등장하는 서로 다른 값은 1,000개뿐인 경우가 있습니다. 이때 값을 정렬해 순위로 바꾸면 배열 크기를 1,000으로 줄일 수 있습니다. 값 자체가 아니라 **대소 관계만 필요할 때** 쓰는 기법입니다.",
    },
    {
      kind: "heading",
      body: "문자열 매칭 (KMP)",
    },
    {
      kind: "text",
      body: "긴 문자열에서 패턴을 찾을 때, 어긋날 때마다 처음부터 다시 비교하면 `O(nm)`입니다. KMP는 패턴 자신의 접두사-접미사 정보를 미리 계산해두어 **어긋나도 되돌아가지 않게** 만들어 `O(n+m)`으로 줄입니다.",
    },
    {
      kind: "text",
      body: "실전에서는 내장 `includes`/`in`으로 충분한 경우가 많습니다. 다만 실패 함수(부분 일치 테이블)의 개념 자체가 다른 문자열 문제에도 응용되므로 한 번은 만들어 보길 권합니다.",
    },
  ],
  patterns: [
    {
      title: "차분 배열로 구간 갱신",
      code: {
        javascript: `const diff = new Array(n + 1).fill(0);
for (const [l, r, x] of updates) {
  diff[l] += x;
  diff[r + 1] -= x;
}
const result = new Array(n).fill(0);
let running = 0;
for (let i = 0; i < n; i++) {
  running += diff[i];
  result[i] = running;
}`,
        python: `diff = [0] * (n + 1)
for l, r, x in updates:
    diff[l] += x
    diff[r + 1] -= x

result = []
running = 0
for i in range(n):
    running += diff[i]
    result.append(running)`,
      },
    },
    {
      title: "비트마스크로 부분집합 전체 순회",
      note: "괄호를 빠뜨리지 마세요. n이 20이면 약 100만 번입니다.",
      code: {
        javascript: `for (let mask = 0; mask < (1 << n); mask++) {
  const subset = [];
  for (let i = 0; i < n; i++) {
    if ((mask & (1 << i)) !== 0) subset.push(items[i]);
  }
  // subset 처리
}`,
        python: `for mask in range(1 << n):
    subset = [items[i] for i in range(n) if (mask & (1 << i)) != 0]
    # subset 처리`,
      },
    },
    {
      title: "좌표 압축",
      code: {
        javascript: `const sorted = [...new Set(values)].sort((a, b) => a - b);
const rank = new Map(sorted.map((v, i) => [v, i]));
const compressed = values.map((v) => rank.get(v));`,
        python: `sorted_values = sorted(set(values))
rank = {v: i for i, v in enumerate(sorted_values)}
compressed = [rank[v] for v in values]`,
      },
    },
  ],
  problems: [
    {
      title: "구간 합 쿼리",
      role: "워밍업",
      teaches: "누적합 복습과 2차원으로의 확장",
    },
    {
      title: "부분집합 비트마스크 순회",
      role: "핵심",
      teaches: "정수 하나로 집합 표현하기",
    },
    {
      title: "겹치는 구간 최댓값",
      role: "핵심",
      teaches: "차분 배열로 구간 갱신을 O(1)에",
    },
    {
      title: "부분 문자열 찾기 (KMP)",
      role: "도전",
      teaches: "실패 함수와 되돌아가지 않는 비교",
    },
  ],
  selfCheck: [
    "누적합과 차분 배열은 각각 어떤 상황에서 쓰는가?",
    "`mask & 1 << i == 0` 이 왜 위험한가?",
    "좌표 압축이 필요해지는 조건은 무엇인가?",
  ],
};
