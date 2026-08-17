import type { Week } from "@/lib/curriculum/types";

export const w10: Week = {
  week: 10,
  phase: 2,
  title: "스택 · 큐 · 덱",
  summary: "무엇을 먼저 꺼낼 것인가로 갈리는 세 자료구조.",
  concept: [
    {
      kind: "text",
      body: "일상의 그림으로 기억하면 안 헷갈려요. **스택**은 접시 더미예요. 위에 쌓고, 꺼낼 때도 맨 위(가장 마지막에 올린 것)부터 꺼내요. **큐**는 매표소 줄이에요. 뒤에 서고, 먼저 온 사람이 먼저 나가요. **덱**은 양쪽이 다 열린 줄이라서 앞뒤 어디로든 넣고 뺄 수 있어요. 셋을 가르는 단 하나의 질문은 **'무엇을 먼저 꺼낼 것인가'**예요.",
    },
    {
      kind: "text",
      body: "셋 다 '순서대로 담았다가 꺼내는' 자료구조인데, 꺼내는 쪽이 달라요. 스택은 마지막에 넣은 것부터(LIFO), 큐는 먼저 넣은 것부터(FIFO), 덱은 양쪽 모두에서 꺼낼 수 있어요.",
    },
    {
      kind: "heading",
      body: "스택이 답인 신호",
    },
    {
      kind: "text",
      body: "**가장 최근 것과 짝을 맞춰야 할 때** 스택이에요. 괄호가 대표적이에요 — 닫는 괄호는 언제나 가장 최근에 열린 괄호와 짝이에요. 수식 계산, 되돌리기(undo), 함수 호출 관계도 같은 구조예요.",
    },
    {
      kind: "text",
      body: "재귀도 사실 스택이에요. 컴퓨터가 호출 스택을 대신 관리해 줄 뿐이에요. 13주차에서 이 관계를 다시 봐요.",
    },
    {
      kind: "heading",
      body: "직접 따라가 보기: 괄호 검사",
    },
    {
      kind: "text",
      body: "문자열 `(()())`가 올바른 괄호인지 스택으로 확인해 볼게요. 규칙은 간단해요. 여는 괄호 `(`를 만나면 스택에 **쌓고**, 닫는 괄호 `)`를 만나면 맨 위를 **꺼내요**. 닫는 괄호는 언제나 가장 최근에 연 괄호와 짝이니까요. 다 보고 나서 스택이 **비어 있으면** 올바른 괄호예요.",
    },
    {
      kind: "trace",
      caption: "( 는 push, ) 는 pop — 끝에 스택이 비면 올바른 괄호예요",
      lines: [
        "문자열   (  (  )  (  )  )",
        "위치     0  1  2  3  4  5",
        "",
        "0  '('   push       스택: ( ",
        "1  '('   push       스택: ( ( ",
        "2  ')'   pop        스택: ( ",
        "3  '('   push       스택: ( ( ",
        "4  ')'   pop        스택: ( ",
        "5  ')'   pop        스택: (비었음) ",
        "",
        "끝에 스택이 비었어요  ->  올바른 괄호",
      ],
    },
    {
      kind: "text",
      body: "만약 중간에 `)`가 왔는데 스택이 이미 비어 있으면, 짝지을 여는 괄호가 없다는 뜻이라 그 순간 틀린 괄호예요. 끝까지 갔는데 스택에 `(`가 남아 있어도 짝을 못 찾은 여는 괄호가 있다는 뜻이라 틀려요.",
    },
    {
      kind: "trap",
      title: "닫는 괄호인데 스택이 비어 있는 경우를 빼먹기 쉬워요",
      body: "`)`를 만나면 무작정 `pop`부터 하면 안 돼요. `())` 같은 입력에서 스택이 빈 채로 `pop`하면 빈 값이 나와 엉뚱한 비교를 하거나 오류가 나요. **꺼내기 전에 스택이 비어 있지 않은지** 먼저 확인해요. 그래서 코드가 `if not stack or ...` 같은 형태예요.",
    },
    {
      kind: "trap",
      title: "배열을 큐로 쓰면 `shift()`와 `pop(0)`이 O(n)이에요",
      body: "맨 앞을 빼면 나머지 원소를 전부 한 칸씩 당겨야 해요. 큐에 10만 개를 넣고 빼면 `O(n²)`가 되어 시간 초과가 나요. 파이썬은 `collections.deque`를 쓰고, JavaScript는 배열에 인덱스 포인터(`head`)를 두고 앞에서 꺼낸 척만 하면 돼요. 15주차 BFS부터 이 실수가 바로 성능에 드러나요.",
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
      body: "'각 원소의 오른쪽에서 처음으로 자기보다 큰 값'을 모든 원소에 대해 구하는 문제가 있어요. 순진하게 짜면 `O(n²)`인데, 스택 안의 값을 항상 증가(또는 감소) 순서로 유지하면 `O(n)`이 돼요.",
    },
    {
      kind: "text",
      body: "핵심 발상은 이래요. 새 값이 들어올 때 스택 위쪽에 그보다 작은 값들이 있다면, 그 값들의 답이 지금 확정돼요. 각 원소는 스택에 한 번 들어가고 한 번 나오니 전체가 `O(n)`이에요.",
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
      note: "JavaScript에서 shift()를 피하는 방법. 메모리를 조금 더 쓰는 대신 O(1)이에요.",
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
const stack = []; // 인덱스를 담아요
for (let i = 0; i < nums.length; i++) {
  while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
    answer[stack.pop()] = nums[i];
  }
  stack.push(i);
}`,
        python: `answer = [-1] * len(nums)
stack = []  # 인덱스를 담아요
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
      slug: "moving-average",
      title: "최근 K개의 이동 평균",
      role: "핵심",
      teaches: "큐와 덱으로 창을 관리하기",
    },
    {
      slug: "eval-postfix",
      title: "후위 표기식 계산",
      role: "핵심",
      teaches: "스택으로 수식 처리하기",
    },
    {
      slug: "next-greater-element",
      title: "다음 큰 원소",
      role: "도전",
      teaches: "단조 스택으로 O(n²)를 O(n)으로",
    },
  ],
  selfCheck: [
    "배열의 `shift()`가 O(n)인 이유와, 큐가 필요할 때의 대안은?",
    "스택을 써야 한다는 걸 알아채는 신호는 무엇인가?",
    "단조 스택이 O(n)인 이유를 '각 원소가 몇 번 들어가고 나오는가'로 설명할 수 있는가?",
    "괄호 검사에서 닫는 괄호를 만났는데 스택이 비어 있으면 무슨 뜻인가요?",
  ],
};
