import type { Problem } from "@/lib/types";

export const searchInsert: Problem = {
  slug: "search-insert",
  title: "삽입 위치 찾기",
  difficulty: "medium",
  tags: ["이분 탐색"],
  summary: "정렬된 배열에서 target이 들어갈 자리를 이분 탐색으로 찾아요.",
  description: [
    "**오름차순으로 정렬된** 정수 배열 `nums`와 정수 `target`이 주어져요. `target`이 배열에 있으면 그 인덱스를, 없으면 **정렬을 유지하며 끼워 넣을 자리**의 인덱스를 반환해요.",
    "이건 `target` **이상인 첫 위치**를 찾는 것과 같아요(lower bound). 같은 값이 여러 개면 그 중 가장 앞 위치를 골라요. `O(log n)`에 풀어요.",
  ],
  examples: [
    {
      input: "nums = [1, 3, 5, 6], target = 5",
      output: "2",
      explain: "5가 인덱스 2에 있어요.",
    },
    {
      input: "nums = [1, 3, 5, 6], target = 2",
      output: "1",
      explain: "2는 없지만, 넣는다면 1과 3 사이인 인덱스 1이에요.",
    },
    {
      input: "nums = [1, 3, 5, 6], target = 7",
      output: "4",
      explain: "가장 큰 값보다 커서 맨 뒤인 인덱스 4에 들어가요.",
    },
  ],
  constraints: [
    "0 ≤ nums.length ≤ 100,000",
    "nums는 오름차순으로 정렬돼 있고, 값이 중복될 수 있어요.",
    "-10^9 ≤ nums[i], target ≤ 10^9",
  ],
  entry: { javascript: "searchInsert", python: "search_insert" },
  starter: {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function searchInsert(nums, target) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def search_insert(nums, target):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[1, 3, 5, 6], 5], expected: 2 },
    { input: [[1, 3, 5, 6], 2], expected: 1 },
    { input: [[1, 3, 5, 6], 7], expected: 4 },
    { input: [[1, 3, 5, 6], 0], expected: 0 },
    { input: [[], 3], expected: 0 },
    { input: [[2, 2, 2, 4], 2], expected: 0, hidden: true },
    { input: [[1, 4, 4, 4, 9], 4], expected: 1, hidden: true },
  ],
  hint: "`lo = 0`, `hi = nums.length`로 두고 `while (lo < hi)`를 돌려요. `nums[mid] < target`이면 `lo = mid + 1`, 아니면 `hi = mid`로 좁혀요. 루프가 끝나면 `lo`가 바로 답이에요.",
  solution: {
    javascript: `function searchInsert(nums, target) {
  let lo = 0;
  let hi = nums.length;
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
`,
    python: `def search_insert(nums, target):
    lo, hi = 0, len(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo
`,
  },
};
