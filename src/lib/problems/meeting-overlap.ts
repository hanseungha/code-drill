import type { Problem } from "@/lib/types";

export const meetingOverlap: Problem = {
  slug: "meeting-overlap",
  title: "회의 시간 겹침 판정",
  difficulty: "medium",
  tags: ["정렬"],
  summary: "회의들 중 시간이 겹치는 쌍이 하나라도 있는지 판정해요.",
  description: [
    "각 원소가 `[시작, 끝]`인 회의 배열 `meetings`가 주어져요. 시간이 겹치는 두 회의가 **하나라도 있으면** `true`, 하나도 없으면 `false`를 반환해요.",
    "한 회의가 끝나는 시각에 다른 회의가 시작하는 건 겹치는 것으로 보지 않아요(끝 = 다음 시작은 괜찮아요).",
  ],
  examples: [
    {
      input: "meetings = [[0, 30], [5, 10], [15, 20]]",
      output: "true",
      explain: "[0, 30]이 [5, 10]과 겹쳐요.",
    },
    {
      input: "meetings = [[7, 10], [2, 4]]",
      output: "false",
      explain: "두 회의는 시간이 겹치지 않아요.",
    },
  ],
  constraints: [
    "1 ≤ meetings.length ≤ 100,000",
    "0 ≤ 시작 < 끝 ≤ 1,000,000,000",
  ],
  entry: { javascript: "meetingOverlap", python: "meeting_overlap" },
  starter: {
    javascript: `/**
 * @param {[number, number][]} meetings
 * @return {boolean}
 */
function meetingOverlap(meetings) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def meeting_overlap(meetings):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[[0, 30], [5, 10], [15, 20]]], expected: true },
    { input: [[[7, 10], [2, 4]]], expected: false },
    { input: [[[1, 2], [2, 3], [3, 4]]], expected: false },
    { input: [[[1, 5]]], expected: false },
    { input: [[[1, 100], [2, 3], [4, 5]]], expected: true, hidden: true },
    { input: [[[5, 8], [0, 3], [3, 5], [8, 10]]], expected: false, hidden: true },
  ],
  hint: "시작 시각 기준으로 정렬한 뒤, 지금까지 본 회의들의 **가장 늦은 끝 시각**을 기억해요. 새 회의의 시작이 그 값보다 앞이면 겹치는 거예요. 정렬돼 있어서 한 번만 훑으면 돼요.",
  solution: {
    javascript: `function meetingOverlap(meetings) {
  const sorted = [...meetings].sort((a, b) => a[0] - b[0]);
  let maxEnd = -Infinity;
  for (const [start, end] of sorted) {
    if (start < maxEnd) return true;
    maxEnd = Math.max(maxEnd, end);
  }
  return false;
}
`,
    python: `def meeting_overlap(meetings):
    max_end = float("-inf")
    for start, end in sorted(meetings, key=lambda m: m[0]):
        if start < max_end:
            return True
        max_end = max(max_end, end)
    return False
`,
  },
};
