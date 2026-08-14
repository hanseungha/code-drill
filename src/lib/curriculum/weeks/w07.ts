import type { Week } from "@/lib/curriculum/types";

export const w07: Week = {
  week: 7,
  phase: 2,
  title: "스택 · 큐 · 덱",
  summary: "무엇을 먼저 꺼낼 것인가로 갈리는 세 자료구조.",
  concept: [
    {
      kind: "text",
      body: "셋 다 '순서대로 담았다가 꺼내는' 자료구조인데, 꺼내는 쪽이 다릅니다. 스택은 마지막에 넣은 것부터(LIFO), 큐는 먼저 넣은 것부터(FIFO), 덱은 양쪽 모두에서 꺼낼 수 있습니다.",
    },
    {
      kind: "heading",
      body: "스택이 답인 신호",
    },
    {
      kind: "text",
      body: "**가장 최근 것과 짝을 맞춰야 할 때** 스택입니다. 괄호가 대표적입니다 — 닫는 괄호는 언제나 가장 최근에 열린 괄호와 짝입니다. 수식 계산, 되돌리기(undo), 함수 호출 관계도 같은 구조입니다.",
    },
    {
      kind: "text",
      body: "재귀도 사실 스택입니다. 컴퓨터가 호출 스택을 대신 관리해 줄 뿐입니다. 9주차에서 이 관계를 다시 봅니다.",
    },
    {
      kind: "trap",
      title: "배열을 큐로 쓰면 `shift()`와 `pop(0)`이 O(n)입니다",
      body: "맨 앞을 빼면 나머지 원소를 전부 한 칸씩 당겨야 합니다. 큐에 10만 개를 넣고 빼면 `O(n²)`가 되어 시간 초과입니다. 파이썬은 `collections.deque`를 쓰고, JavaScript는 배열에 인덱스 포인터(`head`)를 두고 앞에서 꺼낸 척만 하세요. 11주차 BFS부터 이 실수가 바로 성능에 드러납니다.",
    },
    {
      kind: "table",
      headers: ["연산", "JavaScript", "Python"],
      rows: [
        ["스택 넣기 / 빼기", "`arr.push(x)` / `arr.pop()`", "`a.append(x)` / `a.pop()`"],
        ["스택 맨 위 보기", "`arr[arr.length - 1]`", "`a[-1]`"],
        ["큐 넣기", "`arr.push(x)`", "`dq.append(x)`"],
        ["큐 빼기 (권장)", "`arr[head++]`", "`dq.popleft()`"],
        ["큐 빼기 (느림)", "`arr.shift()` ✗", "`a.pop(0)` ✗"],
        ["덱 앞에 넣기", "인덱스 관리 필요", "`dq.appendleft(x)`"],
      ],
    },
    {
      kind: "heading",
      body: "단조 스택",
    },
    {
      kind: "text",
      body: "'각 원소의 오른쪽에서 처음으로 자기보다 큰 값'을 모든 원소에 대해 구하는 문제가 있습니다. 순진하게 짜면 `O(n²)`인데, 스택 안의 값을 항상 증가(또는 감소) 순서로 유지하면 `O(n)`이 됩니다.",
    },
    {
      kind: "text",
      body: "핵심 발상은 이렇습니다. 새 값이 들어올 때 스택 위쪽에 그보다 작은 값들이 있다면, 그 값들의 답이 지금 확정됩니다. 각 원소는 스택에 한 번 들어가고 한 번 나오므로 전체가 `O(n)`입니다.",
    },
  ],
  patterns: [
    {
      title: "괄호 짝 맞추기",
      code: {
        javascript: `const pair = { ")": "(", "]": "[", "}": "{" };
const stack = [];
for (const c of s) {
  if (c in pair) {
    if (stack.pop() !== pair[c]) return false;
  } else {
    stack.push(c);
  }
}
return stack.length === 0;`,
        python: `pair = {")": "(", "]": "[", "}": "{"}
stack = []
for c in s:
    if c in pair:
        if not stack or stack.pop() != pair[c]:
            return False
    else:
        stack.append(c)
return not stack`,
      },
    },
    {
      title: "인덱스 포인터로 만든 큐",
      note: "JavaScript에서 shift()를 피하는 방법. 메모리를 조금 더 쓰는 대신 O(1)입니다.",
      code: {
        javascript: `const queue = [start];
let head = 0;
while (head < queue.length) {
  const node = queue[head++];
  // ...
  queue.push(next);
}`,
        python: `from collections import deque

queue = deque([start])
while queue:
    node = queue.popleft()
    # ...
    queue.append(next_node)`,
      },
    },
    {
      title: "단조 스택으로 다음 큰 원소 찾기",
      code: {
        javascript: `const answer = new Array(nums.length).fill(-1);
const stack = []; // 인덱스를 담습니다
for (let i = 0; i < nums.length; i++) {
  while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
    answer[stack.pop()] = nums[i];
  }
  stack.push(i);
}`,
        python: `answer = [-1] * len(nums)
stack = []  # 인덱스를 담습니다
for i, n in enumerate(nums):
    while stack and nums[stack[-1]] < n:
        answer[stack.pop()] = n
    stack.append(i)`,
      },
    },
  ],
  problems: [
    {
      slug: "valid-parentheses",
      title: "올바른 괄호",
      role: "워밍업",
      teaches: "스택의 교과서적 사용",
    },
    {
      title: "최근 K개의 이동 평균",
      role: "핵심",
      teaches: "큐와 덱으로 창을 관리하기",
    },
    {
      title: "후위 표기식 계산",
      role: "핵심",
      teaches: "스택으로 수식 처리하기",
    },
    {
      title: "다음 큰 원소",
      role: "도전",
      teaches: "단조 스택으로 O(n²)를 O(n)으로",
    },
  ],
  selfCheck: [
    "배열의 `shift()`가 O(n)인 이유와, 큐가 필요할 때의 대안은?",
    "스택을 써야 한다는 걸 알아채는 신호는 무엇인가?",
    "단조 스택이 O(n)인 이유를 '각 원소가 몇 번 들어가고 나오는가'로 설명할 수 있는가?",
  ],
};
