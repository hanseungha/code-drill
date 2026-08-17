import type { Problem } from "@/lib/types";

export const budgetAllocation: Problem = {
  slug: "budget-allocation",
  title: "예산 배정",
  difficulty: "medium",
  tags: ["이분 탐색", "파라메트릭 서치"],
  summary: "총예산을 넘지 않는 선에서 요청 금액에 적용할 상한액을 최대로 정해요.",
  description: [
    "지방들의 예산 요청 금액 배열 `budgets`와 나라의 총예산 `total`이 주어져요. 각 요청에 **상한액**을 정해서, 요청 금액이 상한액보다 크면 상한액만큼만, 작거나 같으면 요청한 만큼 배정해요.",
    "배정한 금액의 합이 `total`을 넘지 않는 선에서 **상한액을 가능한 한 크게** 정하려고 해요. 그 최대 상한액을 반환해요.",
    "단, 모든 요청을 그대로 다 배정해도 `total` 이하라면, 상한액을 둘 필요가 없으니 **요청 중 가장 큰 값**을 반환해요.",
  ],
  examples: [
    {
      input: "budgets = [120, 110, 140, 150], total = 485",
      output: "127",
      explain: "상한액 127이면 120·110·127·127 = 484 ≤ 485예요. 128이면 486이 되어 넘쳐요.",
    },
    {
      input: "budgets = [70, 80, 30], total = 200",
      output: "80",
      explain: "다 합쳐도 180 ≤ 200이라 상한액이 필요 없어요. 가장 큰 요청 80을 반환해요.",
    },
  ],
  constraints: [
    "1 ≤ budgets.length ≤ 10,000",
    "1 ≤ budgets[i] ≤ 100,000",
    "1 ≤ total ≤ 1,000,000,000",
  ],
  entry: { javascript: "budgetAllocation", python: "budget_allocation" },
  starter: {
    javascript: `/**
 * @param {number[]} budgets
 * @param {number} total
 * @return {number}
 */
function budgetAllocation(budgets, total) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def budget_allocation(budgets, total):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[120, 110, 140, 150], 485], expected: 127 },
    { input: [[70, 80, 30], 200], expected: 80 },
    { input: [[10], 5], expected: 5 },
    { input: [[100, 100, 100], 150], expected: 50 },
    { input: [[1, 2, 3, 4, 5], 15], expected: 5 },
    { input: [[100000, 100000], 1], expected: 0, hidden: true },
    { input: [[50, 50, 50, 50], 100], expected: 25, hidden: true },
  ],
  hint: "상한액 후보를 `[0, max(budgets)]` 범위에서 이분 탐색해요. 어떤 상한액 `x`에서 배정액은 `각 요청과 x 중 작은 값의 합`이에요. 이 합이 total 이하면 더 크게(`lo = mid + 1`), 넘치면 더 작게(`hi = mid - 1`) 조절해요. 요청 총합이 total 이하인 경우만 따로 처리하면 돼요.",
  solution: {
    javascript: `function budgetAllocation(budgets, total) {
  const sumAll = budgets.reduce((a, b) => a + b, 0);
  if (sumAll <= total) return Math.max(...budgets);
  let lo = 0;
  let hi = Math.max(...budgets);
  let best = 0;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    let used = 0;
    for (const b of budgets) used += Math.min(b, mid);
    if (used <= total) {
      best = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return best;
}
`,
    python: `def budget_allocation(budgets, total):
    if sum(budgets) <= total:
        return max(budgets)
    lo, hi = 0, max(budgets)
    best = 0
    while lo <= hi:
        mid = (lo + hi) // 2
        used = sum(min(b, mid) for b in budgets)
        if used <= total:
            best = mid
            lo = mid + 1
        else:
            hi = mid - 1
    return best
`,
  },
};
