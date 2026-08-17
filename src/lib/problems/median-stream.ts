import type { Problem } from "@/lib/types";
import { MIN_HEAP_JS, withMinHeap } from "./snippets";

export const medianStream: Problem = {
  slug: "median-stream",
  title: "스트림 중앙값",
  difficulty: "hard",
  tags: ["힙"],
  summary: "값이 하나씩 들어올 때마다 지금까지의 중앙값을 구해요.",
  description: [
    "숫자가 하나씩 들어오는 배열 `nums`가 주어져요. 값이 하나 들어올 때마다 **지금까지 들어온 모든 값의 중앙값**을 구해서, 그 중앙값들을 순서대로 담은 배열로 반환해요.",
    "중앙값은 값을 정렬했을 때 가운데 값이에요. 개수가 홀수면 가운데 하나, 짝수면 가운데 **두 값의 평균**이에요.",
    "매번 전체를 정렬하면 느려요. **작은 절반은 최대 힙, 큰 절반은 최소 힙**으로 나눠 개수를 비슷하게 유지하면, 두 힙의 꼭대기만 봐서 중앙값을 바로 구할 수 있어요.",
    "JavaScript는 스타터의 `MinHeap`에 비교자를 뒤집어 최대 힙을 만들어요. 파이썬은 값에 마이너스를 붙여 `heapq`로 최대 힙을 흉내 내요.",
  ],
  examples: [
    {
      input: "nums = [5, 2, 8, 1]",
      output: "[5, 3.5, 5, 3.5]",
      explain: "[5]→5, [2,5]→(2+5)/2=3.5, [2,5,8]→5, [1,2,5,8]→(2+5)/2=3.5 이에요.",
    },
    {
      input: "nums = [1, 2, 3]",
      output: "[1, 1.5, 2]",
    },
  ],
  constraints: [
    "1 ≤ nums.length ≤ 100,000",
    "-100,000 ≤ nums[i] ≤ 100,000",
  ],
  entry: { javascript: "medianStream", python: "median_stream" },
  starter: {
    javascript: withMinHeap(`/**
 * @param {number[]} nums
 * @return {number[]}
 */
function medianStream(nums) {
  // 여기에 코드를 작성하세요
}
`),
    python: `import heapq


def median_stream(nums):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[5, 2, 8, 1]], expected: [5, 3.5, 5, 3.5] },
    { input: [[1, 2, 3]], expected: [1, 1.5, 2] },
    { input: [[10]], expected: [10] },
    { input: [[3, 3, 3, 3]], expected: [3, 3, 3, 3] },
    { input: [[6, 10, 2, 6, 5, 0, 6, 3]], expected: [6, 8, 6, 6, 6, 5.5, 6, 5.5], hidden: true },
    { input: [[-5, -1, -3, -2, -4]], expected: [-5, -3, -3, -2.5, -3], hidden: true },
  ],
  hint: "작은 절반을 담는 최대 힙 `low`, 큰 절반을 담는 최소 힙 `high`를 둬요. 새 값이 `low`의 꼭대기보다 작거나 같으면 `low`에, 아니면 `high`에 넣고, 두 힙의 크기 차이가 1을 넘지 않게 옮겨 균형을 맞춰요. `low`가 더 크면 그 꼭대기가 중앙값, 크기가 같으면 두 꼭대기의 평균이 중앙값이에요.",
  solution: {
    javascript: `${MIN_HEAP_JS}

function medianStream(nums) {
  const low = new MinHeap((a, b) => b - a);
  const high = new MinHeap((a, b) => a - b);
  const result = [];
  for (const n of nums) {
    if (low.size === 0 || n <= low.peek()) low.push(n);
    else high.push(n);
    if (low.size > high.size + 1) high.push(low.pop());
    else if (high.size > low.size) low.push(high.pop());
    if (low.size > high.size) result.push(low.peek());
    else result.push((low.peek() + high.peek()) / 2);
  }
  return result;
}
`,
    python: `import heapq


def median_stream(nums):
    low = []
    high = []
    result = []
    for n in nums:
        if not low or n <= -low[0]:
            heapq.heappush(low, -n)
        else:
            heapq.heappush(high, n)
        if len(low) > len(high) + 1:
            heapq.heappush(high, -heapq.heappop(low))
        elif len(high) > len(low):
            heapq.heappush(low, -heapq.heappop(high))
        if len(low) > len(high):
            result.append(-low[0])
        else:
            result.append((-low[0] + high[0]) / 2)
    return result
`,
  },
};
