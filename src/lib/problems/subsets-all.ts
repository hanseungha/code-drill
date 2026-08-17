import type { Problem } from "@/lib/types";

export const subsetsAll: Problem = {
  slug: "subsets-all",
  title: "부분집합 모두 구하기",
  difficulty: "medium",
  tags: ["백트래킹"],
  summary: "서로 다른 수들의 모든 부분집합을 백트래킹으로 만들어요.",
  description: [
    "서로 다른 정수 배열 `nums`가 주어져요. `nums`의 **모든 부분집합**을 담은 배열을 반환해요. 빈 집합과 전체 집합도 포함해요.",
    "원소마다 '넣는다 / 안 넣는다' 두 갈래가 있으니 부분집합은 `2ⁿ`개예요. 하나를 고르고, 더 깊이 들어가고, 돌아와서 그 선택을 되돌리는 백트래킹으로 빠짐없이 만들어요.",
    "부분집합의 순서나 각 부분집합 안 원소의 순서는 채점에서 신경 쓰지 않아요.",
  ],
  examples: [
    {
      input: "nums = [1, 2, 3]",
      output: "[[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]",
      explain: "부분집합 8개예요. 순서는 달라도 괜찮아요.",
    },
    {
      input: "nums = [0]",
      output: "[[], [0]]",
    },
  ],
  constraints: [
    "0 ≤ nums.length ≤ 12",
    "nums의 값은 서로 달라요.",
    "-1,000 ≤ nums[i] ≤ 1,000",
  ],
  entry: { javascript: "subsetsAll", python: "subsets_all" },
  starter: {
    javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function subsetsAll(nums) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def subsets_all(nums):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  compare: "unordered-deep",
  testCases: [
    { input: [[1, 2, 3]], expected: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]] },
    { input: [[0]], expected: [[], [0]] },
    { input: [[]], expected: [[]] },
    { input: [[1, 2]], expected: [[], [1], [1, 2], [2]] },
    { input: [[5, 6, 7, 8]], expected: [[], [5], [5, 6], [5, 6, 7], [5, 6, 7, 8], [5, 6, 8], [5, 7], [5, 7, 8], [5, 8], [6], [6, 7], [6, 7, 8], [6, 8], [7], [7, 8], [8]], hidden: true },
    { input: [[-1, 0, 1]], expected: [[], [-1], [-1, 0], [-1, 0, 1], [-1, 1], [0], [0, 1], [1]], hidden: true },
  ],
  hint: "`backtrack(start)`를 만들어요. 함수에 들어오면 지금까지 고른 `path`의 **복사본**을 결과에 담아요. 그다음 `start`부터 각 원소를 골라 `path`에 넣고 `backtrack(i + 1)`로 진행한 뒤, 돌아와서 `pop`으로 되돌려요.",
  solution: {
    javascript: `function subsetsAll(nums) {
  const out = [];
  const path = [];
  function backtrack(start) {
    out.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1);
      path.pop();
    }
  }
  backtrack(0);
  return out;
}
`,
    python: `def subsets_all(nums):
    out = []
    path = []

    def backtrack(start):
        out.append(path[:])
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1)
            path.pop()

    backtrack(0)
    return out
`,
  },
};
