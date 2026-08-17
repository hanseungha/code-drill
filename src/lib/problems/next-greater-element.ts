import type { Problem } from "@/lib/types";

export const nextGreaterElement: Problem = {
  slug: "next-greater-element",
  title: "다음 큰 원소",
  difficulty: "hard",
  tags: ["스택", "단조 스택"],
  summary: "각 원소의 오른쪽에서 처음으로 자기보다 큰 값을 찾아요.",
  description: [
    "정수 배열 `nums`가 주어져요. 각 원소마다 **그 오른쪽에서 처음으로 나타나는 자기보다 큰 값**을 찾아, 같은 자리에 담은 배열로 반환해요. 오른쪽에 더 큰 값이 없으면 그 자리에는 `-1`을 넣어요.",
    "예를 들어 `[2, 1, 3]`에서 2의 다음 큰 값은 3, 1의 다음 큰 값도 3, 3은 오른쪽에 더 큰 값이 없어서 -1이에요.",
    "모든 쌍을 하나하나 비교하면 `O(n²)`이지만, **단조 스택**을 쓰면 각 원소가 스택에 한 번 들어갔다 한 번 나오면서 `O(n)`으로 풀 수 있어요.",
  ],
  examples: [
    {
      input: "nums = [2, 1, 3]",
      output: "[3, 3, -1]",
    },
    {
      input: "nums = [5, 4, 3, 2, 6]",
      output: "[6, 6, 6, 6, -1]",
      explain: "앞의 네 값은 모두 마지막 6에서 처음으로 더 큰 값을 만나요.",
    },
  ],
  constraints: [
    "1 ≤ nums.length ≤ 100,000",
    "-10^9 ≤ nums[i] ≤ 10^9",
  ],
  entry: { javascript: "nextGreaterElement", python: "next_greater_element" },
  starter: {
    javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function nextGreaterElement(nums) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def next_greater_element(nums):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[2, 1, 3]], expected: [3, 3, -1] },
    { input: [[5, 4, 3, 2, 6]], expected: [6, 6, 6, 6, -1] },
    { input: [[1, 2, 3, 4]], expected: [2, 3, 4, -1] },
    { input: [[4, 3, 2, 1]], expected: [-1, -1, -1, -1] },
    { input: [[7]], expected: [-1], hidden: true },
    { input: [[2, 7, 3, 5, 4, 6, 8]], expected: [7, 8, 5, 6, 6, 8, -1], hidden: true },
  ],
  hint: "스택에 **아직 답을 못 찾은 원소들의 인덱스**를 담아 둬요. 새 값을 볼 때, 스택 맨 위 원소보다 크면 그 원소의 답이 지금 확정되니 꺼내서 채워요. 더 이상 큰 관계가 아니면 현재 인덱스를 스택에 넣어요. 끝까지 남은 인덱스들은 답이 -1이에요.",
  solution: {
    javascript: `function nextGreaterElement(nums) {
  const answer = new Array(nums.length).fill(-1);
  const stack = [];
  for (let i = 0; i < nums.length; i++) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
      answer[stack.pop()] = nums[i];
    }
    stack.push(i);
  }
  return answer;
}
`,
    python: `def next_greater_element(nums):
    answer = [-1] * len(nums)
    stack = []
    for i, n in enumerate(nums):
        while stack and nums[stack[-1]] < n:
            answer[stack.pop()] = n
        stack.append(i)
    return answer
`,
  },
};
