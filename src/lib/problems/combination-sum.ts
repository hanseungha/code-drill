import type { Problem } from "@/lib/types";

export const combinationSum: Problem = {
  slug: "combination-sum",
  title: "합이 target인 조합",
  difficulty: "hard",
  tags: ["백트래킹"],
  summary: "서로 다른 수 중 몇 개를 골라 합이 target이 되는 모든 조합을 찾아요.",
  description: [
    "서로 다른 양의 정수 배열 `candidates`와 정수 `target`이 주어져요. `candidates`에서 몇 개를 골라(각 수는 **최대 한 번**) 합이 정확히 `target`이 되는 **모든 조합**을 담아 반환해요.",
    "순서만 다른 같은 조합은 한 번만 세요. `[2, 5]`와 `[5, 2]`는 같은 조합이에요. 그래서 다음 후보는 항상 **자기 다음 인덱스부터** 봐요.",
    "정렬해 두면 가지치기를 할 수 있어요. 남은 목표보다 큰 후보를 만나면, 그 뒤 후보는 더 크니 볼 필요 없이 멈춰도 돼요.",
    "조합들의 순서와 각 조합 안 원소의 순서는 채점에서 신경 쓰지 않아요.",
  ],
  examples: [
    {
      input: "candidates = [2, 3, 6, 7], target = 7",
      output: "[[7]]",
      explain: "합이 7이 되는 조합은 [7] 하나뿐이에요(각 수는 한 번씩).",
    },
    {
      input: "candidates = [2, 3, 5], target = 8",
      output: "[[3, 5]]",
      explain: "합이 8인 조합은 3 + 5뿐이에요.",
    },
    {
      input: "candidates = [2, 3, 4, 6], target = 6",
      output: "[[2, 4], [6]]",
      explain: "2 + 4 = 6, 그리고 6 자체예요. 순서는 달라도 괜찮아요.",
    },
  ],
  constraints: [
    "1 ≤ candidates.length ≤ 20",
    "candidates의 값은 서로 다른 양수예요.",
    "1 ≤ candidates[i] ≤ 100, 1 ≤ target ≤ 500",
  ],
  entry: { javascript: "combinationSum", python: "combination_sum" },
  starter: {
    javascript: `/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum(candidates, target) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def combination_sum(candidates, target):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  compare: "unordered-deep",
  testCases: [
    { input: [[2, 3, 6, 7], 7], expected: [[7]] },
    { input: [[2, 3, 5], 8], expected: [[3, 5]] },
    { input: [[1, 2, 3, 4, 5], 5], expected: [[1, 4], [2, 3], [5]] },
    { input: [[10, 20, 30], 5], expected: [] },
    { input: [[1, 2, 3, 4, 5, 6, 7, 8], 10], expected: [[1, 2, 3, 4], [1, 2, 7], [1, 3, 6], [1, 4, 5], [2, 3, 5], [2, 8], [3, 7], [4, 6]], hidden: true },
    { input: [[5], 5], expected: [[5]], hidden: true },
  ],
  hint: "후보를 오름차순으로 정렬하고 `backtrack(start, remain)`을 만들어요. `remain`이 0이면 완성이라 복사본을 담아요. `start`부터 후보를 보되, 후보가 `remain`보다 크면 뒤는 볼 필요 없으니 멈춰요. 아니면 넣고 `backtrack(i + 1, remain - 후보)`로 진행한 뒤 되돌려요.",
  solution: {
    javascript: `function combinationSum(candidates, target) {
  const sorted = [...candidates].sort((a, b) => a - b);
  const out = [];
  const path = [];
  function backtrack(start, remain) {
    if (remain === 0) {
      out.push([...path]);
      return;
    }
    for (let i = start; i < sorted.length; i++) {
      if (sorted[i] > remain) break;
      path.push(sorted[i]);
      backtrack(i + 1, remain - sorted[i]);
      path.pop();
    }
  }
  backtrack(0, target);
  return out;
}
`,
    python: `def combination_sum(candidates, target):
    ordered = sorted(candidates)
    out = []
    path = []

    def backtrack(start, remain):
        if remain == 0:
            out.append(path[:])
            return
        for i in range(start, len(ordered)):
            if ordered[i] > remain:
                break
            path.append(ordered[i])
            backtrack(i + 1, remain - ordered[i])
            path.pop()

    backtrack(0, target)
    return out
`,
  },
};
