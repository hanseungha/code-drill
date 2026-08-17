import type { Problem } from "@/lib/types";

export const movingAverage: Problem = {
  slug: "moving-average",
  title: "최근 K개의 이동 평균",
  difficulty: "medium",
  tags: ["큐", "덱"],
  summary: "값이 들어올 때마다 최근 K개의 평균을 구해요.",
  description: [
    "숫자가 하나씩 들어오는 배열 `nums`와 창 크기 `k`가 주어져요. 값이 하나 들어올 때마다 **가장 최근 K개**의 평균을 구해서, 그 평균들을 순서대로 담은 배열로 반환해요.",
    "아직 K개가 안 모였다면 지금까지 들어온 값 전부의 평균을 써요. K개를 넘기면 가장 오래된 값은 창에서 빠져요. 예를 들어 `k = 3`이면 4번째 값부터는 바로 앞 3개만 평균에 넣어요.",
  ],
  examples: [
    {
      input: "nums = [1, 10, 3, 5], k = 3",
      output: "[1, 5.5, 4.666666666666667, 6]",
      explain:
        "1 → 1/1, 1·10 → 11/2, 1·10·3 → 14/3, 10·3·5 → 18/3 이에요. 네 번째에서 첫 값 1이 창 밖으로 빠져요.",
    },
    {
      input: "nums = [4, 4, 4], k = 2",
      output: "[4, 4, 4]",
      explain: "값이 모두 같아서 평균도 계속 4예요.",
    },
  ],
  constraints: [
    "1 ≤ k ≤ nums.length ≤ 100,000",
    "-10,000 ≤ nums[i] ≤ 10,000",
  ],
  entry: { javascript: "movingAverage", python: "moving_average" },
  starter: {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function movingAverage(nums, k) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def moving_average(nums, k):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[1, 10, 3, 5], 3], expected: [1, 5.5, 4.666666666666667, 6] },
    { input: [[4, 4, 4], 2], expected: [4, 4, 4] },
    { input: [[5], 1], expected: [5] },
    { input: [[2, 4, 6, 8, 10], 1], expected: [2, 4, 6, 8, 10] },
    { input: [[-3, 3, -3, 3], 2], expected: [-3, 0, 0, 0], hidden: true },
    { input: [[10, 20, 30, 40, 50, 60], 4], expected: [10, 15, 20, 25, 35, 45], hidden: true },
  ],
  hint: "창 안의 값을 큐(또는 덱)에 담아 둬요. 새 값을 넣을 때 합에 더하고, 창이 K를 넘으면 가장 오래된 값을 큐에서 빼면서 그만큼 합에서도 빼요. 그러면 매 단계 평균을 창 크기에 상관없이 빠르게 구할 수 있어요.",
  solution: {
    javascript: `function movingAverage(nums, k) {
  const result = [];
  const window = [];
  let head = 0;
  let sum = 0;
  for (const n of nums) {
    window.push(n);
    sum += n;
    if (window.length - head > k) {
      sum -= window[head];
      head++;
    }
    result.push(sum / (window.length - head));
  }
  return result;
}
`,
    python: `from collections import deque


def moving_average(nums, k):
    result = []
    window = deque()
    total = 0
    for n in nums:
        window.append(n)
        total += n
        if len(window) > k:
            total -= window.popleft()
        result.append(total / len(window))
    return result
`,
  },
};
