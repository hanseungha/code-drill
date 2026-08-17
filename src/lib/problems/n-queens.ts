import type { Problem } from "@/lib/types";

export const nQueens: Problem = {
  slug: "n-queens",
  title: "N-Queen",
  difficulty: "hard",
  tags: ["백트래킹"],
  summary: "서로 공격하지 않게 퀸 N개를 놓는 방법의 수를 세요.",
  description: [
    "`n × n` 체스판에 퀸 `n`개를 놓되, **어떤 두 퀸도 서로 공격할 수 없게** 놓으려고 해요. 퀸은 같은 행·같은 열·같은 대각선에 있는 말을 공격해요. 가능한 배치의 **개수**를 반환해요.",
    "한 행에 퀸은 하나만 놓을 수 있으니, 행을 하나씩 내려가며 열을 고르는 백트래킹으로 풀어요. 열이나 대각선이 이미 막혀 있으면 그 칸은 건너뛰어요.",
    "이 문제의 핵심은 **가지치기**예요. 충돌을 놓는 즉시 확인해 가망 없는 가지를 잘라내면, 모든 배치를 다 만들어 보는 것과 탐색량이 수천 배 차이가 나요.",
  ],
  examples: [
    {
      input: "n = 4",
      output: "2",
      explain: "4×4 판에서 서로 공격하지 않는 배치는 2가지예요.",
    },
    {
      input: "n = 1",
      output: "1",
      explain: "1×1 판에는 퀸 하나를 놓는 방법 하나뿐이에요.",
    },
  ],
  constraints: [
    "1 ≤ n ≤ 12",
  ],
  entry: { javascript: "nQueens", python: "n_queens" },
  starter: {
    javascript: `/**
 * @param {number} n
 * @return {number}
 */
function nQueens(n) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def n_queens(n):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [4], expected: 2 },
    { input: [1], expected: 1 },
    { input: [2], expected: 0 },
    { input: [6], expected: 4 },
    { input: [8], expected: 92, hidden: true },
    { input: [10], expected: 724, hidden: true },
  ],
  hint: "행 번호를 인자로 받는 재귀를 만들어요. `row`가 `n`이 되면 배치 하나를 완성한 거예요. 열, `row - col` 대각선, `row + col` 대각선이 쓰였는지 집합 세 개로 관리하면 충돌을 빠르게 확인하며 놓고 되돌릴 수 있어요.",
  solution: {
    javascript: `function nQueens(n) {
  const cols = new Set();
  const diag1 = new Set();
  const diag2 = new Set();
  let count = 0;
  function backtrack(row) {
    if (row === n) {
      count++;
      return;
    }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;
      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);
      backtrack(row + 1);
      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  }
  backtrack(0);
  return count;
}
`,
    python: `def n_queens(n):
    cols = set()
    diag1 = set()
    diag2 = set()
    count = 0

    def backtrack(row):
        nonlocal count
        if row == n:
            count += 1
            return
        for col in range(n):
            if col in cols or (row - col) in diag1 or (row + col) in diag2:
                continue
            cols.add(col)
            diag1.add(row - col)
            diag2.add(row + col)
            backtrack(row + 1)
            cols.remove(col)
            diag1.remove(row - col)
            diag2.remove(row + col)

    backtrack(0)
    return count
`,
  },
};
