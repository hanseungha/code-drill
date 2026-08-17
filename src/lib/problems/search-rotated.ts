import type { Problem } from "@/lib/types";

export const searchRotated: Problem = {
  slug: "search-rotated",
  title: "회전된 정렬 배열에서 검색",
  difficulty: "medium",
  tags: ["이분 탐색"],
  summary: "한 번 회전된 정렬 배열에서 target의 위치를 O(log n)에 찾아요.",
  description: [
    "서로 다른 정수로 이루어진 오름차순 배열을 어떤 지점에서 한 번 회전한 배열 `nums`가 주어져요. 예를 들어 `[0, 1, 2, 4, 5, 6, 7]`을 회전하면 `[4, 5, 6, 7, 0, 1, 2]`가 돼요.",
    "정수 `target`이 `nums`에 있으면 그 인덱스를, 없으면 `-1`을 반환해요. 회전됐어도 `O(log n)`에 풀 수 있어요.",
    "핵심은 이거예요. 배열을 반으로 자르면 **한쪽은 반드시 정렬돼 있어요.** 정렬된 쪽의 양끝과 target을 비교하면, target이 그 안에 있는지 바로 알 수 있어서 어느 절반을 버릴지 정해져요.",
  ],
  examples: [
    {
      input: "nums = [4, 5, 6, 7, 0, 1, 2], target = 0",
      output: "4",
    },
    {
      input: "nums = [4, 5, 6, 7, 0, 1, 2], target = 3",
      output: "-1",
      explain: "3은 배열에 없어요.",
    },
  ],
  constraints: [
    "1 ≤ nums.length ≤ 100,000",
    "nums의 값은 서로 달라요.",
    "nums는 오름차순 배열을 한 번 회전한 형태예요(회전량이 0일 수도 있어요).",
    "-10^9 ≤ nums[i], target ≤ 10^9",
  ],
  entry: { javascript: "searchRotated", python: "search_rotated" },
  starter: {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function searchRotated(nums, target) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def search_rotated(nums, target):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[4, 5, 6, 7, 0, 1, 2], 0], expected: 4 },
    { input: [[4, 5, 6, 7, 0, 1, 2], 3], expected: -1 },
    { input: [[1], 1], expected: 0 },
    { input: [[1], 0], expected: -1 },
    { input: [[5, 1, 2, 3, 4], 1], expected: 1 },
    { input: [[3, 4, 5, 6, 7, 0, 1, 2], 6], expected: 3, hidden: true },
    { input: [[6, 7, 8, 1, 2, 3, 4, 5], 8], expected: 2, hidden: true },
  ],
  hint: "`mid`를 정한 뒤 `nums[lo] <= nums[mid]`이면 왼쪽 절반이 정렬된 쪽이에요. 그때 `nums[lo] <= target < nums[mid]`이면 왼쪽으로, 아니면 오른쪽으로 좁혀요. 반대면 오른쪽 절반이 정렬된 쪽이라 같은 방식으로 판단해요.",
  solution: {
    javascript: `function searchRotated(nums, target) {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] === target) return mid;
    if (nums[lo] <= nums[mid]) {
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}
`,
    python: `def search_rotated(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[lo] <= nums[mid]:
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        else:
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return -1
`,
  },
};
