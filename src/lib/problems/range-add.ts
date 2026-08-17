import type { Problem } from "@/lib/types";

export const rangeAdd: Problem = {
  slug: "range-add",
  title: "구간에 값 더하기",
  difficulty: "medium",
  tags: ["누적합", "배열"],
  summary: "구간 갱신을 양끝 두 칸에만 기록해두고, 마지막에 한 번에 펼쳐요.",
  description: [
    "길이 `n`인 배열이 있고 모든 칸이 `0`으로 시작해요. 갱신 목록 `updates`가 주어지며, 각 갱신은 `[l, r, v]` 형태로 `l`번부터 `r`번까지(양끝 포함) 모든 칸에 `v`를 더하라는 뜻이에요.",
    "모든 갱신을 끝낸 뒤의 배열을 반환해요.",
    "갱신마다 구간을 직접 돌면 `O(nm)`이에요. **차분 배열**을 쓰면 갱신 하나가 두 칸 수정으로 끝나요. `diff[l] += v`, `diff[r + 1] -= v` 를 기록해 두고, 마지막에 `diff`의 누적합을 구하면 그것이 답이에요. 3주차의 누적합을 거꾸로 쓰는 셈이에요.",
  ],
  examples: [
    {
      input: "n = 5, updates = [[0, 2, 1], [1, 3, 2]]",
      output: "[1, 3, 3, 2, 0]",
      explain: "첫 갱신으로 [1,1,1,0,0], 두 번째 갱신으로 1~3번 칸에 2가 더해져요.",
    },
    { input: "n = 3, updates = []", output: "[0, 0, 0]", explain: "갱신이 없으면 그대로예요." },
    { input: "n = 4, updates = [[0, 3, -2]]", output: "[-2, -2, -2, -2]" },
  ],
  constraints: [
    "1 ≤ n ≤ 100,000",
    "0 ≤ updates.length ≤ 100,000",
    "0 ≤ l ≤ r < n",
    "-1,000 ≤ v ≤ 1,000",
  ],
  entry: { javascript: "rangeAdd", python: "range_add" },
  starter: {
    javascript: `/**
 * @param {number} n 배열 길이
 * @param {number[][]} updates 각 원소는 [l, r, v] (양끝 포함)
 * @return {number[]} 모든 갱신을 적용한 배열
 */
function rangeAdd(n, updates) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def range_add(n, updates):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [5, [[0, 2, 1], [1, 3, 2]]], expected: [1, 3, 3, 2, 0] },
    { input: [3, []], expected: [0, 0, 0] },
    { input: [4, [[0, 3, -2]]], expected: [-2, -2, -2, -2] },
    { input: [1, [[0, 0, 7]]], expected: [7] },
    { input: [6, [[0, 0, 1], [5, 5, 2], [2, 3, 3]]], expected: [1, 0, 3, 3, 0, 2] },
    { input: [5, [[0, 4, 1], [0, 4, 1], [0, 4, 1]]], expected: [3, 3, 3, 3, 3], hidden: true },
    { input: [4, [[1, 2, 5], [1, 2, -5]]], expected: [0, 0, 0, 0], hidden: true },
  ],
  hint: "차분 배열의 길이를 `n + 1`로 잡으면 `r`이 마지막 칸일 때 `diff[r + 1]` 이 배열 밖으로 나가는 걱정을 하지 않아도 돼요. 마지막에 앞에서부터 누적해 더하면서 앞 `n`칸만 반환해요.",
  solution: {
    javascript: `function rangeAdd(n, updates) {
  const diff = new Array(n + 1).fill(0);
  for (const [l, r, v] of updates) {
    diff[l] += v;
    diff[r + 1] -= v;
  }
  const out = new Array(n).fill(0);
  let running = 0;
  for (let i = 0; i < n; i++) {
    running += diff[i];
    out[i] = running;
  }
  return out;
}
`,
    python: `def range_add(n, updates):
    diff = [0] * (n + 1)
    for l, r, v in updates:
        diff[l] += v
        diff[r + 1] -= v
    out = []
    running = 0
    for i in range(n):
        running += diff[i]
        out.append(running)
    return out
`,
  },
};
