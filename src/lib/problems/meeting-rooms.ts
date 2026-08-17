import type { Problem } from "@/lib/types";

export const meetingRooms: Problem = {
  slug: "meeting-rooms",
  title: "회의실 배정",
  difficulty: "medium",
  tags: ["그리디", "정렬"],
  summary: "회의실 하나에 겹치지 않게 배정할 수 있는 최대 회의 수를 구해요.",
  description: [
    "각 원소가 `[시작, 끝]`인 회의 배열 `meetings`가 주어져요. 회의실은 하나뿐이고, 한 회의가 끝난 시각에 다른 회의가 시작하는 건 겹치지 않는 것으로 봐요(끝나는 시각 = 다음 시작 시각 허용).",
    "겹치지 않게 배정할 수 있는 **회의의 최대 개수**를 반환해요.",
    "핵심은 **끝나는 시각이 빠른 회의부터** 고르는 거예요. 빨리 끝날수록 뒤에 남는 시간이 많아 더 많은 회의를 넣을 수 있어요. 시작이 빠른 순이나 짧은 순으로 고르면 반례가 생겨요.",
  ],
  examples: [
    {
      input: "meetings = [[1, 4], [2, 3], [3, 5], [5, 6]]",
      output: "3",
      explain: "[2, 3] → [3, 5] → [5, 6]을 고르면 3개예요. [1, 4]는 [2, 3]과 겹쳐요.",
    },
    {
      input: "meetings = [[0, 2], [1, 3], [2, 4]]",
      output: "2",
      explain: "[0, 2] → [2, 4]를 고르면 2개예요.",
    },
  ],
  constraints: [
    "1 ≤ meetings.length ≤ 100,000",
    "0 ≤ 시작 < 끝 ≤ 1,000,000,000",
  ],
  entry: { javascript: "meetingRooms", python: "meeting_rooms" },
  starter: {
    javascript: `/**
 * @param {[number, number][]} meetings
 * @return {number}
 */
function meetingRooms(meetings) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def meeting_rooms(meetings):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[[1, 4], [2, 3], [3, 5], [5, 6]]], expected: 3 },
    { input: [[[0, 2], [1, 3], [2, 4]]], expected: 2 },
    { input: [[[1, 2]]], expected: 1 },
    { input: [[[1, 5], [1, 5], [1, 5]]], expected: 1 },
    { input: [[[4, 5], [0, 1], [2, 3], [1, 2], [3, 4]]], expected: 5, hidden: true },
    { input: [[[0, 10], [1, 2], [2, 3], [3, 4]]], expected: 3, hidden: true },
  ],
  hint: "끝나는 시각 기준으로 정렬한 뒤, `lastEnd`를 두고 현재 회의의 시작이 `lastEnd` 이상이면 고르고 `lastEnd`를 그 회의의 끝으로 갱신해요.",
  solution: {
    javascript: `function meetingRooms(meetings) {
  const sorted = [...meetings].sort((a, b) => a[1] - b[1]);
  let count = 0;
  let lastEnd = -Infinity;
  for (const [start, end] of sorted) {
    if (start >= lastEnd) {
      count++;
      lastEnd = end;
    }
  }
  return count;
}
`,
    python: `def meeting_rooms(meetings):
    count = 0
    last_end = float("-inf")
    for start, end in sorted(meetings, key=lambda m: m[1]):
        if start >= last_end:
            count += 1
            last_end = end
    return count
`,
  },
};
