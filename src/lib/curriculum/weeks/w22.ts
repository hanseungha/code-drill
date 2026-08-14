import type { Week } from "@/lib/curriculum/types";

export const w22: Week = {
  week: 22,
  phase: 4,
  title: "구현과 시뮬레이션",
  summary: "알고리즘이 아니라 꼼꼼함이 당락을 가르는 유형.",
  concept: [
    {
      kind: "text",
      body: "기업 코딩 테스트에서 가장 많이 나오는 유형입니다. 특별한 알고리즘이 필요 없고, 문제에 적힌 규칙을 그대로 코드로 옮기면 됩니다. 그래서 쉬워 보이지만 실제 정답률은 낮습니다 — **경계 조건 하나만 틀려도 전부 틀리기** 때문입니다.",
    },
    {
      kind: "text",
      body: "이 유형에서 필요한 건 아이디어가 아니라 절차입니다. 문제를 읽으면서 규칙을 목록으로 적고, 상태로 무엇을 관리할지 정한 다음, 한 규칙씩 코드로 옮기세요. 머릿속에서 다 조립한 뒤 한 번에 쓰려 하면 반드시 빠뜨립니다.",
    },
    {
      kind: "heading",
      body: "델타 배열",
    },
    {
      kind: "text",
      body: "11주차에서 상하좌우 4방향을 봤습니다. 시뮬레이션에서는 8방향(대각선 포함)이나 회전 순서가 중요한 방향 배열이 자주 나옵니다. 방향을 **시계 방향 순서로** 적어두면 '오른쪽으로 90도 회전'이 인덱스 +1이 되어 코드가 짧아집니다.",
    },
    {
      kind: "heading",
      body: "행렬 회전",
    },
    {
      kind: "text",
      body: "90도 회전을 인덱스 계산으로 한 번에 쓰려 하면 실수하기 쉽습니다. **전치(transpose) 후 각 행을 뒤집기**로 나누면 두 단계 모두 단순해서 틀릴 여지가 적습니다.",
    },
    {
      kind: "list",
      items: [
        "시계 방향 90도 = 전치 → 각 행 뒤집기",
        "반시계 방향 90도 = 전치 → 각 열 뒤집기 (또는 행 순서 뒤집기 → 전치)",
        "180도 = 90도를 두 번",
      ],
    },
    {
      kind: "trap",
      title: "배열을 복사하지 않고 제자리에서 바꾸면 이미 바뀐 값을 읽습니다",
      body: "시뮬레이션의 한 턴은 '모든 칸이 동시에' 바뀌는 경우가 많습니다. 원본을 고쳐가며 읽으면 앞서 바뀐 결과가 뒷 계산에 섞입니다. 새 배열에 결과를 쓰고 턴이 끝난 뒤 교체하세요. 생명 게임이나 지도 확산 문제에서 이 실수가 대부분입니다.",
    },
    {
      kind: "trap",
      title: "2차원 배열을 잘못 만들면 모든 행이 같은 배열이 됩니다",
      body: "`new Array(n).fill([])` 나 `[[0] * m] * n` 은 같은 배열 하나를 n번 참조합니다. 한 칸을 고치면 모든 행이 함께 바뀝니다. `Array.from({length: n}, () => new Array(m).fill(0))` 또는 `[[0] * m for _ in range(n)]` 으로 만드세요.",
    },
    {
      kind: "heading",
      body: "경계 조건 체크리스트",
    },
    {
      kind: "text",
      body: "제출 전에 이 목록을 훑는 습관을 들이세요. 시뮬레이션 문제에서 감점의 대부분이 여기 있습니다.",
    },
    {
      kind: "list",
      ordered: true,
      items: [
        "입력이 비어 있거나 크기가 1일 때",
        "격자의 네 모서리와 네 변",
        "인덱스가 `-1`이나 `길이`가 되는 순간",
        "0으로 나누기, 빈 배열의 최댓값",
        "좌표계 — 행이 x인가 y인가? 문제 설명과 코드가 일치하는가?",
        "1-based인가 0-based인가",
      ],
    },
    {
      kind: "heading",
      body: "디버깅 루틴",
    },
    {
      kind: "text",
      body: "시뮬레이션은 중간 상태를 눈으로 보는 것이 가장 빠른 디버깅입니다. 매 턴 격자를 출력하는 함수를 미리 만들어두고, 예제의 첫 두세 턴을 문제 설명과 대조하세요. 이 사이트의 채점 결과 화면에도 `console.log` / `print` 출력이 그대로 표시됩니다.",
    },
  ],
  patterns: [
    {
      title: "시계 방향 델타 배열",
      note: "방향 인덱스에 +1 하면 오른쪽으로 90도 회전이 됩니다.",
      code: {
        javascript: `// 북, 동, 남, 서
const DX = [-1, 0, 1, 0];
const DY = [0, 1, 0, -1];
dir = (dir + 1) % 4;        // 오른쪽 90도
dir = (dir + 3) % 4;        // 왼쪽 90도

// 8방향
const D8 = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];`,
        python: `# 북, 동, 남, 서
DIRS = ((-1, 0), (0, 1), (1, 0), (0, -1))
d = (d + 1) % 4        # 오른쪽 90도
d = (d + 3) % 4        # 왼쪽 90도

# 8방향
D8 = [(dx, dy) for dx in (-1, 0, 1) for dy in (-1, 0, 1) if (dx, dy) != (0, 0)]`,
      },
    },
    {
      title: "행렬 90도 회전 (전치 후 뒤집기)",
      code: {
        javascript: `// 전치
for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    [m[i][j], m[j][i]] = [m[j][i], m[i][j]];
  }
}
// 각 행 뒤집기
for (const row of m) row.reverse();`,
        python: `# 전치 + 각 행 뒤집기를 한 줄로
rotated = [list(row) for row in zip(*matrix[::-1])]`,
      },
    },
    {
      title: "턴마다 새 배열에 쓰기",
      code: {
        javascript: `let grid = start;
for (let turn = 0; turn < turns; turn++) {
  const next = Array.from({ length: rows }, () => new Array(cols).fill(0));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      next[i][j] = step(grid, i, j);   // 원본만 읽습니다
    }
  }
  grid = next;
}`,
        python: `grid = start
for _ in range(turns):
    nxt = [[0] * cols for _ in range(rows)]
    for i in range(rows):
        for j in range(cols):
            nxt[i][j] = step(grid, i, j)   # 원본만 읽습니다
    grid = nxt`,
      },
    },
  ],
  problems: [
    {
      title: "행렬 90도 회전",
      role: "워밍업",
      teaches: "전치 후 뒤집기로 나눠 생각하기",
    },
    {
      title: "나선형 순회",
      role: "핵심",
      teaches: "경계 네 개를 좁혀가며 관리하기",
    },
    {
      title: "지뢰찾기 판 만들기",
      role: "핵심",
      teaches: "8방향 델타와 경계 처리",
    },
    {
      title: "로봇 시뮬레이션",
      role: "도전",
      teaches: "방향과 위치를 상태로 관리하기",
    },
  ],
  selfCheck: [
    "`[[0] * m] * n` 이 왜 위험한가?",
    "동시에 바뀌는 시뮬레이션에서 원본을 제자리 수정하면 무슨 일이 생기는가?",
    "제출 전 경계 조건 체크리스트를 외워서 말할 수 있는가?",
  ],
};
