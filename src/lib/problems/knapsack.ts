import type { Problem } from "@/lib/types";

export const knapsack: Problem = {
  slug: "knapsack",
  title: "0-1 배낭",
  difficulty: "medium",
  tags: ["DP"],
  summary: "무게 한도 안에서 물건을 골라 담아 가치 합을 최대로 만들어요.",
  description: [
    "각 원소가 `[무게, 가치]`인 물건 배열 `items`와 배낭이 버틸 수 있는 무게 한도 `capacity`가 주어져요. 물건은 **쪼갤 수 없고**, 각 물건은 **넣거나 안 넣거나** 둘 중 하나예요(그래서 0-1 배낭이에요).",
    "무게 합이 `capacity`를 넘지 않게 골랐을 때 **가치 합의 최댓값**을 반환해요.",
    "용량을 상태 축으로 둬요. `dp[c]`를 '한도가 `c`일 때의 최대 가치'라 하고, 물건을 하나씩 보며 `dp[c] = max(dp[c], dp[c - 무게] + 가치)`로 갱신해요. 한 물건을 두 번 쓰지 않도록 용량은 **큰 쪽부터** 훑어요.",
  ],
  examples: [
    {
      input: "items = [[6, 13], [4, 8], [3, 6], [5, 12]], capacity = 10",
      output: "21",
      explain: "무게 6·4짜리(가치 13·8)를 담으면 무게 합 10, 가치 합 21로 최대예요.",
    },
    {
      input: "items = [[1, 1], [3, 4], [4, 5], [5, 7]], capacity = 7",
      output: "9",
      explain: "무게 3·4(가치 4·5)를 담아 무게 7, 가치 9예요.",
    },
  ],
  constraints: [
    "1 ≤ items.length ≤ 100",
    "1 ≤ 무게 ≤ capacity ≤ 10,000",
    "1 ≤ 가치 ≤ 1,000",
  ],
  entry: { javascript: "knapsack", python: "knapsack" },
  starter: {
    javascript: `/**
 * @param {[number, number][]} items
 * @param {number} capacity
 * @return {number}
 */
function knapsack(items, capacity) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def knapsack(items, capacity):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[[6, 13], [4, 8], [3, 6], [5, 12]], 10], expected: 21 },
    { input: [[[1, 1], [3, 4], [4, 5], [5, 7]], 7], expected: 9 },
    { input: [[[5, 10]], 4], expected: 0 },
    { input: [[[2, 3], [2, 3], [2, 3]], 6], expected: 9 },
    { input: [[[1, 6], [2, 10], [3, 12]], 5], expected: 22, hidden: true },
    { input: [[[10, 100], [20, 200]], 5], expected: 0, hidden: true },
  ],
  hint: "`dp`를 `capacity + 1` 크기로 0으로 채워요. 각 물건 `[w, v]`마다 용량 `c`를 `capacity`에서 `w`까지 **거꾸로** 내려가며 `dp[c] = Math.max(dp[c], dp[c - w] + v)`로 갱신해요. 거꾸로 도는 게 같은 물건을 두 번 담지 않게 하는 핵심이에요.",
  solution: {
    javascript: `function knapsack(items, capacity) {
  const dp = new Array(capacity + 1).fill(0);
  for (const [weight, value] of items) {
    for (let c = capacity; c >= weight; c--) {
      dp[c] = Math.max(dp[c], dp[c - weight] + value);
    }
  }
  return dp[capacity];
}
`,
    python: `def knapsack(items, capacity):
    dp = [0] * (capacity + 1)
    for weight, value in items:
        for c in range(capacity, weight - 1, -1):
            dp[c] = max(dp[c], dp[c - weight] + value)
    return dp[capacity]
`,
  },
};
