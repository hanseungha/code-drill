import type { Problem } from "@/lib/types";
import { MIN_HEAP_JS, withMinHeap } from "./snippets";

export const mergeKLists: Problem = {
  slug: "merge-k-lists",
  title: "K개 정렬 리스트 병합",
  difficulty: "medium",
  tags: ["힙"],
  summary: "이미 정렬된 여러 리스트를 하나의 정렬된 리스트로 합쳐요.",
  description: [
    "각각 **오름차순으로 정렬된** 정수 리스트들이 배열 `lists`로 주어져요. 이들을 하나의 오름차순 리스트로 합쳐 반환해요.",
    "전부 이어 붙여 다시 정렬해도 되지만, 각 리스트가 이미 정렬돼 있다는 점을 살리면 더 좋아요. **각 리스트의 맨 앞 값만 힙에 넣고** 가장 작은 것을 꺼내 결과에 담은 뒤, 그 값이 온 리스트의 다음 값을 힙에 넣어요. 이러면 힙 크기가 리스트 개수만큼만 유지돼요.",
    "JavaScript는 스타터에 딸려 온 `MinHeap`을 써요. 파이썬은 `heapq`를 써요.",
  ],
  examples: [
    {
      input: "lists = [[1, 4, 5], [1, 3, 4], [2, 6]]",
      output: "[1, 1, 2, 3, 4, 4, 5, 6]",
    },
    {
      input: "lists = [[], [1]]",
      output: "[1]",
    },
  ],
  constraints: [
    "0 ≤ lists.length ≤ 10,000",
    "각 리스트는 오름차순으로 정렬돼 있어요.",
    "모든 값의 개수 합은 100,000 이하예요.",
    "-10^9 ≤ 값 ≤ 10^9",
  ],
  entry: { javascript: "mergeKLists", python: "merge_k_lists" },
  starter: {
    javascript: withMinHeap(`/**
 * @param {number[][]} lists
 * @return {number[]}
 */
function mergeKLists(lists) {
  // 여기에 코드를 작성하세요
}
`),
    python: `import heapq


def merge_k_lists(lists):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[[1, 4, 5], [1, 3, 4], [2, 6]]], expected: [1, 1, 2, 3, 4, 4, 5, 6] },
    { input: [[[], [1]]], expected: [1] },
    { input: [[]], expected: [] },
    { input: [[[1, 2, 3]]], expected: [1, 2, 3] },
    { input: [[[-5, 0, 5], [-3, 3], [-1]]], expected: [-5, -3, -1, 0, 3, 5] },
    { input: [[[10, 20], [5, 15, 25], [1]]], expected: [1, 5, 10, 15, 20, 25], hidden: true },
    { input: [[[], [], []]], expected: [], hidden: true },
  ],
  hint: "각 리스트의 첫 값을 `[값, 리스트번호, 원소인덱스]` 형태로 힙에 넣어요(비교 기준은 값). 힙에서 가장 작은 것을 꺼내 결과에 담고, 그 리스트에 다음 값이 있으면 그 값을 힙에 넣어요. 힙이 빌 때까지 반복해요.",
  solution: {
    javascript: `${MIN_HEAP_JS}

function mergeKLists(lists) {
  const heap = new MinHeap((a, b) => a[0] - b[0]);
  for (let i = 0; i < lists.length; i++) {
    if (lists[i].length > 0) heap.push([lists[i][0], i, 0]);
  }
  const out = [];
  while (heap.size > 0) {
    const [value, i, j] = heap.pop();
    out.push(value);
    if (j + 1 < lists[i].length) heap.push([lists[i][j + 1], i, j + 1]);
  }
  return out;
}
`,
    python: `import heapq


def merge_k_lists(lists):
    heap = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst[0], i, 0))
    out = []
    while heap:
        value, i, j = heapq.heappop(heap)
        out.append(value)
        if j + 1 < len(lists[i]):
            heapq.heappush(heap, (lists[i][j + 1], i, j + 1))
    return out
`,
  },
};
