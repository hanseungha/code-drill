import type { Problem } from "@/lib/types";

export const rotateMatrix: Problem = {
  slug: "rotate-matrix",
  title: "행렬 90도 회전",
  difficulty: "medium",
  tags: ["배열", "구현"],
  summary: "n×n 행렬을 시계 방향으로 90도 돌립니다.",
  description: [
    "`n × n` 정수 행렬 `matrix`가 주어집니다. 시계 방향으로 90도 돌린 행렬을 반환하세요.",
    "인덱스를 한 번에 옮기려 하면 헷갈립니다. **전치한 뒤 각 행을 뒤집는다**로 나누면 두 단계 모두 실수할 여지가 거의 없습니다. 전치는 `(i, j)` 와 `(j, i)` 를 맞바꾸는 것이고, 그 다음 각 행을 뒤집으면 시계 방향 회전이 됩니다.",
    "어려운 문제를 아는 조각으로 쪼개는 연습입니다. 반시계 방향이 필요하면 순서를 바꿔 각 행을 먼저 뒤집고 전치하면 됩니다.",
  ],
  examples: [
    {
      input: "matrix = [[1, 2], [3, 4]]",
      output: "[[3, 1], [4, 2]]",
      explain: "왼쪽 아래의 3이 왼쪽 위로 올라옵니다.",
    },
    {
      input: "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
      output: "[[7, 4, 1], [8, 5, 2], [9, 6, 3]]",
      explain: "첫 열을 아래에서 위로 읽은 것이 새 첫 행입니다.",
    },
    { input: "matrix = [[1]]", output: "[[1]]" },
  ],
  constraints: ["1 ≤ n ≤ 200", "-10^6 ≤ matrix[i][j] ≤ 10^6", "행과 열의 개수는 같습니다."],
  entry: { javascript: "rotateMatrix", python: "rotate_matrix" },
  starter: {
    javascript: `/**
 * @param {number[][]} matrix n×n 행렬
 * @return {number[][]} 시계 방향으로 90도 회전한 행렬
 */
function rotateMatrix(matrix) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def rotate_matrix(matrix):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[[1, 2], [3, 4]]], expected: [[3, 1], [4, 2]] },
    { input: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expected: [[7, 4, 1], [8, 5, 2], [9, 6, 3]] },
    { input: [[[1]]], expected: [[1]] },
    { input: [[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]], expected: [[13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3], [16, 12, 8, 4]] },
    { input: [[[0, -1], [-2, 0]]], expected: [[-2, 0], [0, -1]] },
    { input: [[[1, 1], [1, 1]]], expected: [[1, 1], [1, 1]], hidden: true },
    { input: [[[1, 0, 0], [0, 1, 0], [0, 0, 1]]], expected: [[0, 0, 1], [0, 1, 0], [1, 0, 0]], hidden: true },
  ],
  hint: "새 행렬을 하나 만들어 `out[j][n - 1 - i] = matrix[i][j]` 로 옮겨도 됩니다. 제자리에서 하려면 전치 후 각 행 뒤집기가 가장 헷갈리지 않습니다. 전치할 때는 `j`를 `i + 1`부터 돌아야 두 번 바꿔 제자리로 돌아오지 않습니다.",
  solution: {
    javascript: `function rotateMatrix(matrix) {
  const n = matrix.length;
  const out = matrix.map((row) => row.slice());
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const tmp = out[i][j];
      out[i][j] = out[j][i];
      out[j][i] = tmp;
    }
  }
  for (const row of out) row.reverse();
  return out;
}
`,
    python: `def rotate_matrix(matrix):
    n = len(matrix)
    out = [row[:] for row in matrix]
    for i in range(n):
        for j in range(i + 1, n):
            out[i][j], out[j][i] = out[j][i], out[i][j]
    for row in out:
        row.reverse()
    return out
`,
  },
};
