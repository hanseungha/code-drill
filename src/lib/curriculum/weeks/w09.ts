import type { Week } from "@/lib/curriculum/types";

export const w09: Week = {
  week: 9,
  phase: 2,
  title: "그리디",
  summary: "당장 최선인 선택이 전체 최선이 되는 경우 — 그리고 안 되는 경우.",
  concept: [
    {
      kind: "text",
      body: "그리디는 매 순간 가장 좋아 보이는 것을 고르고 뒤돌아보지 않는 방식이에요. 코드가 짧고 빨라요. 문제는 **언제 이게 옳은가**이고, 그것을 판단하는 것이 이번 주의 전부예요.",
    },
    {
      kind: "heading",
      body: "그리디가 통하려면",
    },
    {
      kind: "list",
      items: [
        "**탐욕 선택 속성** — 지금의 최선을 골라도 최적해를 놓치지 않는다",
        "**최적 부분 구조** — 그 선택을 하고 남은 문제의 최적해를 더하면 전체 최적해가 된다",
      ],
    },
    {
      kind: "text",
      body: "말은 어렵지만 실전에서 확인하는 방법은 단순해요. **반례를 먼저 찾아보는 것**이에요. 5분 안에 반례가 안 나오면 그리디로 밀어붙이고, 반례가 나오면 DP로 가요. 증명하려 들면 시험 시간이 사라져요.",
    },
    {
      kind: "heading",
      body: "자주 나오는 형태",
    },
    {
      kind: "table",
      headers: ["문제", "무엇을 기준으로 정렬", "왜"],
      rows: [
        ["회의실 배정", "끝나는 시각 오름차순", "빨리 끝날수록 뒤에 남는 시간이 많다"],
        ["구명보트", "무게 오름차순 + 양끝 포인터", "가장 무거운 사람은 가장 가벼운 사람과 짝지어야 이득"],
        ["동전 거스름돈 (배수 화폐)", "큰 단위부터", "큰 단위가 작은 단위의 배수라 손해가 없다"],
        ["최소 회의실 개수", "시작 시각 + 힙", "가장 빨리 끝나는 방을 재사용"],
      ],
    },
    {
      kind: "text",
      body: "회의실 배정에서 '시작이 빠른 것'이나 '짧은 것'을 고르면 왜 안 되는지 직접 반례를 그려 봐요. 긴 회의 하나가 짧은 회의 둘을 막는 그림이 바로 나와요. 이런 식으로 **기준을 바꿔가며 반례를 찾는 연습**이 그리디의 훈련법이에요.",
    },
    {
      kind: "heading",
      body: "그리디가 깨지는 순간",
    },
    {
      kind: "text",
      body: "이번 주의 마지막 문제가 이 지점이에요. 동전이 1, 5, 10처럼 배수 관계면 큰 것부터 집는 그리디가 맞아요. 그런데 동전이 1, 3, 4이고 6원을 만든다면?",
    },
    {
      kind: "list",
      items: [
        "그리디: 4 + 1 + 1 = **3개**",
        "최적: 3 + 3 = **2개**",
      ],
    },
    {
      kind: "trap",
      title: "그리디로 풀리지 않는데 풀린다고 착각하기 쉬워요",
      body: "예제 몇 개가 통과했다고 그리디가 맞다고 볼 수 없어요. 위 반례처럼 특정 화폐 조합에서만 어긋나는 경우가 흔해요. '앞의 선택이 뒤의 선택지를 바꾸는가?'를 자문해 봐요. 바꾼다면 모든 경우를 따져야 하고, 그게 19주차 DP예요.",
    },
    {
      kind: "text",
      body: "즉 그리디로 안 되는 문제란 '지금의 선택이 나중에 후회를 만드는' 문제예요. 후회를 없애려면 모든 선택지를 다 따져봐야 하는데, 그것을 중복 없이 하는 방법이 동적 계획법이에요.",
    },
  ],
  patterns: [
    {
      title: "정렬 후 하나씩 집기 (회의실 배정)",
      note: "끝나는 시각 기준 정렬이 핵심. 시작 시각 기준으로 하면 틀려요.",
      code: {
        javascript: `meetings.sort((a, b) => a[1] - b[1]);
let count = 0;
let lastEnd = -Infinity;
for (const [start, end] of meetings) {
  if (start >= lastEnd) {
    count++;
    lastEnd = end;
  }
}`,
        python: `meetings.sort(key=lambda m: m[1])
count = 0
last_end = float("-inf")
for start, end in meetings:
    if start >= last_end:
        count += 1
        last_end = end`,
      },
    },
    {
      title: "정렬 후 양끝에서 짝짓기 (구명보트)",
      code: {
        javascript: `people.sort((a, b) => a - b);
let i = 0;
let j = people.length - 1;
let boats = 0;
while (i <= j) {
  if (people[i] + people[j] <= limit) i++;
  j--;
  boats++;
}`,
        python: `people.sort()
i, j, boats = 0, len(people) - 1, 0
while i <= j:
    if people[i] + people[j] <= limit:
        i += 1
    j -= 1
    boats += 1`,
      },
    },
  ],
  problems: [
    {
      slug: "min-coins-greedy",
      title: "거스름돈 최소 동전 (배수 화폐)",
      role: "워밍업",
      teaches: "그리디가 성립하는 조건 확인하기",
    },
    {
      slug: "meeting-rooms",
      title: "회의실 배정",
      role: "핵심",
      teaches: "끝나는 시각 기준 정렬과 그 이유",
    },
    {
      slug: "rescue-boats",
      title: "구명보트",
      role: "핵심",
      teaches: "정렬 + 투 포인터 그리디",
    },
    {
      slug: "coin-change",
      title: "거스름돈",
      role: "도전",
      teaches: "그리디가 실패하는 경험 — 19주차 DP의 동기",
    },
  ],
  selfCheck: [
    "회의실 배정에서 '시작이 빠른 순'으로 고르면 안 되는 반례를 그릴 수 있는가?",
    "동전 1, 3, 4로 6원을 만들 때 그리디가 왜 지는가?",
    "그리디를 쓸지 DP를 쓸지 판단할 때 스스로에게 던지는 질문은 무엇인가?",
  ],
};
