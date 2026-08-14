import type { Problem } from "@/lib/types";
import { MIN_HEAP_JS } from "./snippets";

export const minHeap: Problem = {
  slug: "min-heap",
  title: "최소 힙 직접 구현",
  difficulty: "medium",
  tags: ["힙", "자료구조"],
  summary: "push · pop · peek 연산을 처리하는 최소 힙을 직접 만듭니다.",
  description: [
    "연산 목록 `operations`가 주어집니다. 최소 힙을 직접 만들어 순서대로 처리하고, 값을 꺼내는 연산의 결과만 모아 배열로 반환하세요.",
    "연산은 세 가지입니다. `[\"push\", x]`는 x를 넣고 아무것도 반환하지 않습니다. `[\"pop\"]`은 가장 작은 값을 꺼내 반환합니다. `[\"peek\"]`은 가장 작은 값을 꺼내지 않고 확인만 합니다. 힙이 비어 있으면 `pop`과 `peek` 모두 `null`을 반환합니다.",
    "결과 배열에는 `pop`과 `peek`의 반환값만 순서대로 담습니다.",
    "이 문제의 목적은 정렬 함수를 부르는 것이 아니라 **힙 내부 동작을 직접 만들어 보는 것**입니다. 배열을 완전 이진 트리로 보고, 인덱스 `i`의 부모가 `(i-1)/2`, 자식이 `2i+1`과 `2i+2`라는 규칙 위에서 위로 올리기(sift up)와 아래로 내리기(sift down)를 구현해 보세요.",
    "Python에는 `heapq`가 내장되어 있지만, 이 문제만큼은 직접 만들어 보길 권합니다. 다음 문제부터는 마음껏 쓰세요.",
  ],
  examples: [
    {
      input: 'operations = [["push", 5], ["push", 3], ["push", 8], ["pop"], ["pop"], ["pop"]]',
      output: "[3, 5, 8]",
      explain: "넣은 순서와 무관하게 작은 값부터 나옵니다.",
    },
    {
      input: 'operations = [["push", 4], ["peek"], ["push", 2], ["peek"], ["pop"], ["peek"]]',
      output: "[4, 2, 2, 4]",
      explain: "peek은 꺼내지 않으므로 두 번째와 세 번째 결과가 모두 2입니다.",
    },
    {
      input: 'operations = [["push", 1], ["pop"], ["pop"]]',
      output: "[1, null]",
      explain: "두 번째 pop은 힙이 비어 있어 null입니다.",
    },
  ],
  constraints: [
    "1 ≤ operations.length ≤ 100,000",
    "-10^9 ≤ x ≤ 10^9",
    "같은 값이 여러 번 들어올 수 있습니다.",
  ],
  entry: { javascript: "heapOps", python: "heap_ops" },
  starter: {
    javascript: `class MinHeap {
  constructor() {
    this.items = [];
  }

  push(value) {
    // 여기에 코드를 작성하세요
  }

  pop() {
    // 여기에 코드를 작성하세요
  }

  peek() {
    // 여기에 코드를 작성하세요
  }
}

/**
 * @param {Array<[string, number?]>} operations
 * @return {Array<number|null>}
 */
function heapOps(operations) {
  const heap = new MinHeap();
  const out = [];
  for (const [kind, value] of operations) {
    if (kind === "push") heap.push(value);
    else if (kind === "pop") out.push(heap.pop());
    else out.push(heap.peek());
  }
  return out;
}
`,
    python: `class MinHeap:
    def __init__(self):
        self.items = []

    def push(self, value):
        # 여기에 코드를 작성하세요
        pass

    def pop(self):
        # 여기에 코드를 작성하세요
        pass

    def peek(self):
        # 여기에 코드를 작성하세요
        pass


def heap_ops(operations):
    heap = MinHeap()
    out = []
    for op in operations:
        kind = op[0]
        if kind == "push":
            heap.push(op[1])
        elif kind == "pop":
            out.append(heap.pop())
        else:
            out.append(heap.peek())
    return out
`,
  },
  testCases: [
    {
      input: [
        [["push", 5], ["push", 3], ["push", 8], ["pop"], ["pop"], ["pop"]],
      ],
      expected: [3, 5, 8],
    },
    {
      input: [
        [["push", 4], ["peek"], ["push", 2], ["peek"], ["pop"], ["peek"]],
      ],
      expected: [4, 2, 2, 4],
    },
    { input: [[["push", 1], ["pop"], ["pop"]]], expected: [1, null] },
    { input: [[["pop"]]], expected: [null] },
    {
      input: [
        [
          ["push", 10],
          ["push", 1],
          ["push", 7],
          ["push", 3],
          ["push", 9],
          ["pop"],
          ["pop"],
          ["pop"],
          ["pop"],
          ["pop"],
        ],
      ],
      expected: [1, 3, 7, 9, 10],
      hidden: true,
    },
    {
      input: [
        [["push", 2], ["push", 2], ["push", 1], ["pop"], ["pop"], ["pop"], ["pop"]],
      ],
      expected: [1, 2, 2, null],
      hidden: true,
    },
    {
      input: [
        [
          ["push", -5],
          ["peek"],
          ["push", -10],
          ["pop"],
          ["push", 0],
          ["pop"],
          ["pop"],
          ["peek"],
        ],
      ],
      expected: [-5, -10, -5, 0, null],
      hidden: true,
    },
  ],
  hint: "push는 배열 끝에 넣고 부모보다 작은 동안 부모와 맞바꾸며 올라갑니다. pop은 뿌리를 빼내고 마지막 원소를 뿌리에 올린 뒤, 두 자식 중 더 작은 쪽과 맞바꾸며 내려갑니다. 두 연산 모두 높이만큼만 움직이므로 O(log n)입니다.",
  solution: {
    javascript: `${MIN_HEAP_JS}

function heapOps(operations) {
  const heap = new MinHeap();
  const out = [];
  for (const [kind, value] of operations) {
    if (kind === "push") heap.push(value);
    else if (kind === "pop") out.push(heap.pop());
    else out.push(heap.peek());
  }
  return out;
}
`,
    python: `class MinHeap:
    def __init__(self):
        self.items = []

    def push(self, value):
        a = self.items
        a.append(value)
        i = len(a) - 1
        while i > 0:
            parent = (i - 1) // 2
            if a[parent] <= a[i]:
                break
            a[parent], a[i] = a[i], a[parent]
            i = parent

    def pop(self):
        a = self.items
        if not a:
            return None
        top = a[0]
        last = a.pop()
        if a:
            a[0] = last
            i = 0
            while True:
                l = i * 2 + 1
                r = l + 1
                small = i
                if l < len(a) and a[l] < a[small]:
                    small = l
                if r < len(a) and a[r] < a[small]:
                    small = r
                if small == i:
                    break
                a[small], a[i] = a[i], a[small]
                i = small
        return top

    def peek(self):
        return self.items[0] if self.items else None


def heap_ops(operations):
    heap = MinHeap()
    out = []
    for op in operations:
        kind = op[0]
        if kind == "push":
            heap.push(op[1])
        elif kind == "pop":
            out.append(heap.pop())
        else:
            out.append(heap.peek())
    return out
`,
  },
};
