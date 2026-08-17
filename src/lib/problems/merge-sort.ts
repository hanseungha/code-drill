import type { Problem } from "@/lib/types";

export const mergeSort: Problem = {
  slug: "merge-sort",
  title: "병합 정렬 직접 구현",
  difficulty: "medium",
  tags: ["분할 정복", "정렬"],
  summary: "배열을 반씩 나눠 정렬한 뒤 합치는 병합 정렬을 직접 구현해요.",
  description: [
    "정수 배열 `nums`가 주어져요. 언어의 내장 정렬을 쓰지 않고 **병합 정렬**로 오름차순 정렬한 새 배열을 반환해요.",
    "병합 정렬은 세 단계예요. 배열을 반으로 **나누고**, 각 절반을 재귀로 **정렬하고**, 정렬된 두 절반을 앞에서부터 비교하며 하나로 **합쳐요**. 나누는 깊이가 `log n`이고 각 깊이에서 합치는 데 `O(n)`이 들어 전체가 `O(n log n)`이에요.",
    "정렬 결과만 채점하지만, 연습의 핵심은 내장 정렬 없이 나누기·합치기를 직접 짜 보는 거예요.",
  ],
  examples: [
    {
      input: "nums = [5, 2, 8, 1, 9, 3]",
      output: "[1, 2, 3, 5, 8, 9]",
    },
    {
      input: "nums = [3, 1, 2]",
      output: "[1, 2, 3]",
    },
  ],
  constraints: [
    "0 ≤ nums.length ≤ 100,000",
    "-10^9 ≤ nums[i] ≤ 10^9",
    "값이 중복될 수 있어요.",
  ],
  entry: { javascript: "mergeSort", python: "merge_sort" },
  starter: {
    javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function mergeSort(nums) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def merge_sort(nums):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[5, 2, 8, 1, 9, 3]], expected: [1, 2, 3, 5, 8, 9] },
    { input: [[3, 1, 2]], expected: [1, 2, 3] },
    { input: [[]], expected: [] },
    { input: [[1]], expected: [1] },
    { input: [[4, 4, 2, 2, 3, 3]], expected: [2, 2, 3, 3, 4, 4] },
    { input: [[-5, 10, -3, 0, 7, -1]], expected: [-5, -3, -1, 0, 7, 10], hidden: true },
    { input: [[9, 8, 7, 6, 5, 4, 3, 2, 1]], expected: [1, 2, 3, 4, 5, 6, 7, 8, 9], hidden: true },
  ],
  hint: "기저 조건은 길이가 1 이하면 그대로 반환하는 거예요. 아니면 가운데에서 둘로 잘라 각각 `mergeSort`를 부르고, 정렬된 두 배열을 인덱스 둘로 앞에서부터 비교하며 작은 값을 차례로 담아 합쳐요.",
  solution: {
    javascript: `function mergeSort(nums) {
  if (nums.length <= 1) return nums;
  const mid = nums.length >> 1;
  const left = mergeSort(nums.slice(0, mid));
  const right = mergeSort(nums.slice(mid));
  const out = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    out.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  return out.concat(left.slice(i), right.slice(j));
}
`,
    python: `def merge_sort(nums):
    if len(nums) <= 1:
        return nums
    mid = len(nums) // 2
    left = merge_sort(nums[:mid])
    right = merge_sort(nums[mid:])
    out = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i])
            i += 1
        else:
            out.append(right[j])
            j += 1
    return out + left[i:] + right[j:]
`,
  },
};
