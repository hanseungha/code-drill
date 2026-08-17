import type { Week } from "@/lib/curriculum/types";

export const w19: Week = {
  week: 19,
  phase: 4,
  title: "DP 입문 (1차원)",
  summary: "점화식을 세우는 절차를 손에 붙여요. 상태 → 전이 → 초기값 → 순서.",
  concept: [
    {
      kind: "text",
      body: "9주차에 그리디가 지는 걸 봤어요. 후회 없는 선택을 하려면 모든 경우를 따져야 하는데, 그냥 따지면 지수 시간이에요. 동적 계획법(DP)은 **이미 계산한 하위 문제를 다시 계산하지 않음**으로써 그것을 다항 시간으로 만들어요.",
    },
    {
      kind: "text",
      body: "DP를 쓸 수 있는 조건은 13주차 재귀에서 이미 봤어요. 중복되는 하위 문제가 있고(피보나치), 하위 문제의 최적해로 전체 최적해를 만들 수 있으면 돼요.",
    },
    {
      kind: "heading",
      body: "점화식 세우는 4단계",
    },
    {
      kind: "text",
      body: "DP가 어려운 이유는 아이디어가 매번 달라 보이기 때문인데, 절차는 항상 같아요. 이 순서대로 종이에 써요.",
    },
    {
      kind: "list",
      ordered: true,
      items: [
        "**상태 정의** — `dp[i]`가 무엇인지 한 문장으로. 여기서 대부분 판가름 나요",
        "**전이** — `dp[i]`를 더 작은 `dp`로 어떻게 표현하나요",
        "**초기값** — 가장 작은 경우의 답을 직접 채워요",
        "**계산 순서** — `dp[i]`를 구할 때 필요한 값이 이미 채워져 있도록",
      ],
    },
    {
      kind: "text",
      body: "1번을 대충 넘기면 나머지가 전부 꼬여요. '`dp[i]`는 i번째까지 봤을 때의 최댓값'처럼 **애매한 정의를 피하고**, '`dp[i]`는 i번째를 반드시 쓸 때의 최댓값'처럼 조건을 붙여 정확히 적어요.",
    },
    {
      kind: "heading",
      body: "탑다운과 바텀업",
    },
    {
      kind: "table",
      headers: ["", "탑다운 (메모이제이션)", "바텀업 (타뷸레이션)"],
      rows: [
        ["형태", "재귀 + 캐시", "반복문 + 배열"],
        ["장점", "점화식을 그대로 옮기면 돼요", "스택 걱정 없고, 보통 더 빨라요"],
        ["단점", "재귀 깊이 제한", "계산 순서를 직접 정해야 해요"],
        ["언제", "상태가 듬성듬성할 때", "상태를 전부 채울 때"],
      ],
    },
    {
      kind: "text",
      body: "처음에는 탑다운으로 점화식을 확인하고, 통과하면 바텀업으로 바꿔 보는 연습을 권해요. 둘의 대응 관계가 보이기 시작하면 DP가 훨씬 쉬워져요.",
    },
    {
      kind: "trap",
      title: "초기값을 0으로 두면 '불가능'과 '0개'가 구분되지 않아요",
      body: "최솟값 DP에서 배열을 0으로 초기화하면, 아직 계산 안 된 칸이 '0개로 만들 수 있다'로 읽혀 답이 0이 돼요. 불가능을 뜻하는 값(`Infinity`, `-1`, `n+1`)으로 채우고 시작해요. 거스름돈 문제에서 특히 자주 나오는 실수예요.",
    },
    {
      kind: "heading",
      body: "대표 점화식",
    },
    {
      kind: "table",
      headers: ["문제", "상태", "전이"],
      rows: [
        ["계단 오르기", "`dp[i]` = i번째 칸에 도달하는 방법 수", "`dp[i] = dp[i-1] + dp[i-2]`"],
        ["도둑질", "`dp[i]` = i번째 집까지의 최대 금액", "`dp[i] = max(dp[i-1], dp[i-2] + a[i])`"],
        ["거스름돈", "`dp[x]` = x원을 만드는 최소 동전 수", "`dp[x] = min(dp[x-c] + 1)`"],
        ["LIS", "`dp[i]` = i를 마지막으로 쓰는 최장 길이", "`dp[i] = max(dp[j] + 1)`, `j < i`이고 `a[j] < a[i]`"],
      ],
    },
  ],
  patterns: [
    {
      title: "바텀업 기본형",
      code: {
        javascript: `const dp = new Array(n + 1).fill(0);
dp[0] = 1;
dp[1] = 1;
for (let i = 2; i <= n; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}
return dp[n];`,
        python: `dp = [0] * (n + 1)
dp[0] = dp[1] = 1
for i in range(2, n + 1):
    dp[i] = dp[i - 1] + dp[i - 2]
return dp[n]`,
      },
    },
    {
      title: "최솟값 DP — 불가능한 값으로 초기화",
      code: {
        javascript: `const dp = new Array(amount + 1).fill(Infinity);
dp[0] = 0;
for (let x = 1; x <= amount; x++) {
  for (const c of coins) {
    if (c <= x) dp[x] = Math.min(dp[x], dp[x - c] + 1);
  }
}
return dp[amount] === Infinity ? -1 : dp[amount];`,
        python: `INF = float("inf")
dp = [INF] * (amount + 1)
dp[0] = 0
for x in range(1, amount + 1):
    for c in coins:
        if c <= x:
            dp[x] = min(dp[x], dp[x - c] + 1)
return -1 if dp[amount] == INF else dp[amount]`,
      },
    },
    {
      title: "탑다운 (메모이제이션)",
      note: "점화식을 그대로 옮길 수 있어 처음 검증할 때 편해요.",
      code: {
        javascript: `const memo = new Map();
function solve(i) {
  if (i <= 1) return 1;
  if (memo.has(i)) return memo.get(i);
  const value = solve(i - 1) + solve(i - 2);
  memo.set(i, value);
  return value;
}`,
        python: `from functools import lru_cache

@lru_cache(maxsize=None)
def solve(i):
    if i <= 1:
        return 1
    return solve(i - 1) + solve(i - 2)`,
      },
    },
  ],
  problems: [
    {
      slug: "climbing-stairs",
      title: "계단 오르기",
      role: "워밍업",
      teaches: "가장 단순한 점화식",
    },
    {
      slug: "house-robber",
      title: "도둑질",
      role: "핵심",
      teaches: "선택과 미선택을 상태로 다루기",
    },
    {
      slug: "triangle-max-path",
      title: "정수 삼각형",
      role: "핵심",
      teaches: "계산 순서를 뒤집으면 쉬워지는 경우",
    },
    {
      slug: "longest-increasing-subseq",
      title: "최장 증가 부분 수열",
      role: "도전",
      teaches: "O(n²) 풀이 후 이분 탐색으로 O(n log n)까지",
    },
  ],
  selfCheck: [
    "지금 푼 문제에서 `dp[i]`가 무엇인지 한 문장으로 말할 수 있나요?",
    "최솟값 DP에서 배열을 0으로 초기화하면 왜 틀리나요?",
    "탑다운과 바텀업 중 어느 쪽을 언제 고르나요?",
  ],
};
