import type { Problem } from "@/lib/types";

export const removeDuplicatesSorted: Problem = {
  slug: "remove-duplicates-sorted",
  title: "정렬된 배열 중복 제거",
  difficulty: "medium",
  tags: ["투 포인터", "배열"],
  summary: "정렬된 배열에서 중복을 제거해 서로 다른 값만 순서대로 남겨요.",
  description: [
    "**오름차순으로 정렬된** 정수 배열 `nums`가 주어져요. 중복을 제거하고 **서로 다른 값만** 원래의 오름차순을 유지한 채 담은 배열을 반환해요.",
    "정렬돼 있으니 같은 값은 항상 이웃해 있어요. 읽기 포인터로 배열을 훑고, 앞서 쓴 값과 다를 때만 쓰기 포인터 위치에 채워 넣는 방식으로 `O(n)`에 처리할 수 있어요.",
  ],
  examples: [
    {
      input: "nums = [1, 1, 2]",
      output: "[1, 2]",
    },
    {
      input: "nums = [0, 0, 1, 1, 1, 2, 2, 3, 4]",
      output: "[0, 1, 2, 3, 4]",
    },
  ],
  constraints: [
    "0 ≤ nums.length ≤ 100,000",
    "nums는 오름차순으로 정렬되어 있어요.",
    "-10^9 ≤ nums[i] ≤ 10^9",
  ],
  entry: { javascript: "removeDuplicatesSorted", python: "remove_duplicates_sorted" },
  starter: {
    javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function removeDuplicatesSorted(nums) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def remove_duplicates_sorted(nums):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[1, 1, 2]], expected: [1, 2] },
    { input: [[0, 0, 1, 1, 1, 2, 2, 3, 4]], expected: [0, 1, 2, 3, 4] },
    { input: [[]], expected: [] },
    { input: [[5]], expected: [5] },
    { input: [[-2, -2, -2, -1, 0, 0]], expected: [-2, -1, 0], hidden: true },
    { input: [[1, 2, 3, 4, 5]], expected: [1, 2, 3, 4, 5], hidden: true },
  ],
  hint: "쓰기 포인터 `w`를 두고, 각 원소가 바로 앞에 쓴 값(`nums[w - 1]`)과 다를 때만 `nums[w]`에 쓰고 `w`를 늘려요. 마지막에 앞에서 `w`개를 잘라 반환해요.",
  solution: {
    javascript: `function removeDuplicatesSorted(nums) {
  let w = 0;
  for (let r = 0; r < nums.length; r++) {
    if (w === 0 || nums[r] !== nums[w - 1]) {
      nums[w] = nums[r];
      w++;
    }
  }
  return nums.slice(0, w);
}
`,
    python: `def remove_duplicates_sorted(nums):
    w = 0
    for r in range(len(nums)):
        if w == 0 or nums[r] != nums[w - 1]:
            nums[w] = nums[r]
            w += 1
    return nums[:w]
`,
  },
};
