import type { Problem } from "@/lib/types";

export const minCoinsGreedy: Problem = {
  slug: "min-coins-greedy",
  title: "거스름돈 최소 동전 (배수 화폐)",
  difficulty: "easy",
  tags: ["그리디"],
  summary: "큰 단위가 작은 단위의 배수인 화폐에서 최소 동전 개수를 구해요.",
  description: [
    "거슬러 줄 금액 `amount`와 동전 단위 배열 `coins`가 주어져요. `amount`를 만드는 데 필요한 **동전의 최소 개수**를 반환해요. 각 단위는 무한히 쓸 수 있어요.",
    "이 문제의 `coins`는 큰 단위가 항상 작은 단위의 **배수**가 되도록 주어져요(예: 1, 5, 10, 50, 100). 이 조건에서는 큰 단위부터 최대한 쓰는 그리디가 항상 최적이에요 — 큰 단위를 덜 쓰고 작은 단위로 메우면 개수가 늘기만 하거든요.",
    "`amount`는 주어진 동전들로 항상 만들 수 있어요(1원이 포함돼요).",
  ],
  examples: [
    {
      input: "amount = 1260, coins = [1, 5, 10, 50, 100, 500]",
      output: "6",
      explain: "500×2 + 100×2 + 50×1 + 10×1 = 1260, 동전 6개.",
    },
    {
      input: "amount = 4, coins = [1, 5, 10]",
      output: "4",
      explain: "5로는 넘치니까 1원 4개를 써요.",
    },
  ],
  constraints: [
    "0 ≤ amount ≤ 1,000,000,000",
    "1 ≤ coins.length ≤ 20, coins에는 1이 포함돼요.",
    "coins를 내림차순으로 보면 각 단위는 바로 다음 단위의 배수예요.",
  ],
  entry: { javascript: "minCoinsGreedy", python: "min_coins_greedy" },
  starter: {
    javascript: `/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
function minCoinsGreedy(amount, coins) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def min_coins_greedy(amount, coins):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [1260, [1, 5, 10, 50, 100, 500]], expected: 6 },
    { input: [4, [1, 5, 10]], expected: 4 },
    { input: [0, [1, 5, 10]], expected: 0 },
    { input: [999, [1, 10, 100]], expected: 27 },
    { input: [500, [1, 5, 10, 50, 100, 500]], expected: 1, hidden: true },
    { input: [12345, [1, 5, 25, 100]], expected: 128, hidden: true },
  ],
  hint: "동전을 내림차순으로 정렬하고, 각 단위마다 `Math.floor(amount / coin)`개를 쓰고 `amount %= coin`으로 남은 금액을 줄여요.",
  solution: {
    javascript: `function minCoinsGreedy(amount, coins) {
  const sorted = [...coins].sort((a, b) => b - a);
  let count = 0;
  for (const coin of sorted) {
    count += Math.floor(amount / coin);
    amount %= coin;
  }
  return count;
}
`,
    python: `def min_coins_greedy(amount, coins):
    count = 0
    for coin in sorted(coins, reverse=True):
        count += amount // coin
        amount %= coin
    return count
`,
  },
};
