import type { Week } from "@/lib/curriculum/types";

export const w04: Week = {
  week: 4,
  phase: 1,
  title: "완전탐색과 시뮬레이션",
  summary: "가능한 경우를 빠짐없이 만들어 보기. 모든 최적화의 출발점이에요.",
  concept: [
    {
      kind: "text",
      body: "자물쇠 비밀번호를 잊었을 때 0000부터 9999까지 하나씩 다 눌러 보는 걸 떠올려요. 똑똑하진 않아도 **답이 있으면 반드시 찾아내요**. 완전탐색이 딱 이거예요. 먼저 경우의 수를 세어 보고(`n ≤ 20`처럼 작으면), 시간 안에 다 눌러 볼 수 있으면 전부 시도해요. 순서가 거꾸로예요 — 똑똑한 방법을 고민하기 전에, 무식한 방법이 시간 안에 되는지부터 계산해요.",
    },
    {
      kind: "text",
      body: "완전탐색(브루트포스)은 가능한 모든 경우를 만들어 보고 조건에 맞는 것을 고르는 방법이에요. 무식해 보이지만 **가장 먼저 떠올려야 할 풀이**예요. 이유는 두 가지예요.",
    },
    {
      kind: "list",
      ordered: true,
      items: [
        "제한이 작으면 그게 정답이에요. `n ≤ 20` 이라고 적혀 있으면 출제자가 완전탐색을 의도한 거예요",
        "제한이 크더라도 완전탐색 풀이가 기준선이 돼요. 맞는 답을 먼저 만들어 두면, 어디를 줄여야 빨라지는지가 보여요",
      ],
    },
    {
      kind: "text",
      body: "실제로 앞으로 배울 기법의 절반은 '완전탐색인데 낭비를 줄인 것'이에요. 투 포인터(8주차)는 이중 반복문의 낭비를 없앤 것이고, 백트래킹(17주차)은 가망 없는 가지를 잘라낸 완전탐색이고, DP(19주차)는 이미 계산한 경우를 다시 세지 않는 완전탐색이에요.",
    },
    {
      kind: "heading",
      body: "경우를 만드는 세 가지 틀",
    },
    {
      kind: "table",
      headers: ["만들고 싶은 것", "방법", "경우의 수"],
      rows: [
        ["모든 쌍 / 삼중", "중첩 반복문", "`O(n²)` / `O(n³)`"],
        ["모든 연속 구간", "시작점 × 끝점 이중 반복문", "`O(n²)`"],
        ["모든 부분집합", "비트마스크 순회 또는 재귀", "`O(2ⁿ)`"],
        ["모든 순서 (순열)", "재귀 (17주차)", "`O(n!)`"],
      ],
    },
    {
      kind: "text",
      body: "이번 주는 앞의 셋, 즉 **반복문으로 만들 수 있는 것**까지 다뤄요. 재귀가 필요한 순열과 조합은 13주차에서 재귀를 배운 뒤 17주차 백트래킹에서 제대로 봐요.",
    },
    {
      kind: "heading",
      body: "비트마스크로 부분집합 열거하기",
    },
    {
      kind: "text",
      body: "정수 하나의 각 비트를 '포함/미포함'으로 읽으면 집합을 정수로 표현할 수 있어요. 원소가 20개 이하일 때 부분집합 전체를 `0`부터 `2ⁿ-1`까지의 정수로 순회할 수 있어, 재귀 없이 반복문 하나로 완전탐색이 돼요. `n = 20` 이면 약 100만 번이라 넉넉히 통과해요.",
    },
    {
      kind: "trap",
      title: "비트 연산자는 우선순위가 비교 연산자보다 낮아요",
      body: "`mask & 1 << i == 0` 은 의도대로 동작하지 않아요. 파이썬과 JavaScript 모두 `==`가 먼저 묶여 버려요. 비트 연산은 **항상 괄호로 감싸요**: `(mask & (1 << i)) == 0`. 에러 없이 조용히 틀리는 종류의 버그예요.",
    },
    {
      kind: "text",
      body: "말로만 보면 헷갈리니까 `[1, 2, 3]`의 부분집합을 직접 열거해 볼게요. 원소가 3개니까 `2³ = 8`가지예요. `mask`를 `0`부터 `7`까지 세면서, `mask`의 세 비트(`b2 b1 b0`)를 그대로 '3을 넣나 / 2를 넣나 / 1을 넣나'로 읽어요. 비트가 `1`인 원소만 골라 담으면 부분집합 하나가 나와요.",
    },
    {
      kind: "trace",
      caption: "[1,2,3]의 부분집합 8가지 — mask 000~111을 훑으며 합 구하기",
      lines: [
        "items = [1, 2, 3]     bit0->1  bit1->2  bit2->3",
        "",
        "mask  b2 b1 b0   고른 원소     합",
        "  0    0  0  0   { }           0",
        "  1    0  0  1   { 1 }         1",
        "  2    0  1  0   { 2 }         2",
        "  3    0  1  1   { 1, 2 }      3",
        "  4    1  0  0   { 3 }         3",
        "  5    1  0  1   { 1, 3 }      4",
        "  6    1  1  0   { 2, 3 }      5",
        "  7    1  1  1   { 1, 2, 3 }   6",
        "",
        "8가지를 하나도 안 빼먹고 훑었어요 → 합이 3인 부분집합은 2개",
      ],
    },
    {
      kind: "text",
      body: "`mask`를 `0`부터 하나씩 올리는 것만으로 부분집합 전체가 정확히 한 번씩 나와요. 겹치지도, 빠지지도 않아요. 재귀 없이 반복문 하나로 완전탐색이 되는 게 이 방식의 매력이에요.",
    },
    {
      kind: "heading",
      body: "시뮬레이션",
    },
    {
      kind: "text",
      body: "기업 코딩 테스트에서 가장 많이 나오는 유형이에요. 특별한 알고리즘이 필요 없고, 문제에 적힌 규칙을 그대로 코드로 옮기면 돼요. 그래서 쉬워 보이지만 실제 정답률은 낮아요 — **경계 조건 하나만 틀려도 전부 틀리기** 때문이에요.",
    },
    {
      kind: "text",
      body: "이 유형에서 필요한 건 아이디어가 아니라 절차예요. 문제를 읽으면서 규칙을 목록으로 적고, 상태로 무엇을 관리할지 정한 다음, 한 규칙씩 코드로 옮겨요. 머릿속에서 다 조립한 뒤 한 번에 쓰려 하면 반드시 빠뜨려요.",
    },
    {
      kind: "text",
      body: "격자 위를 움직이는 문제는 **델타 배열**로 방향을 표현해요. 방향을 시계 방향 순서로 적어두면 '오른쪽으로 90도 회전'이 인덱스 +1이 돼서 코드가 짧아져요. 이 배열은 앞으로 격자 DFS·BFS(15·16주차)에서 계속 나와요.",
    },
    {
      kind: "trap",
      title: "배열을 복사하지 않고 제자리에서 바꾸면 이미 바뀐 값을 읽어요",
      body: "시뮬레이션의 한 턴은 '모든 칸이 동시에' 바뀌는 경우가 많아요. 원본을 고쳐가며 읽으면 앞서 바뀐 결과가 뒷 계산에 섞여요. 새 배열에 결과를 쓰고 턴이 끝난 뒤 교체해요. 생명 게임이나 지도 확산 문제에서 이 실수가 대부분이에요.",
    },
    {
      kind: "heading",
      body: "경계 조건 체크리스트",
    },
    {
      kind: "text",
      body: "제출 전에 이 목록을 훑는 습관을 들여요. 완전탐색과 시뮬레이션 문제에서 감점의 대부분이 여기 있어요.",
    },
    {
      kind: "list",
      ordered: true,
      items: [
        "입력이 비어 있거나 크기가 1일 때",
        "격자의 네 모서리와 네 변",
        "인덱스가 `-1`이나 `길이`가 되는 순간",
        "0으로 나누기, 빈 배열의 최댓값",
        "좌표계 — 행이 먼저인가 열이 먼저인가? 문제 설명과 코드가 일치하는가?",
        "1-based인가 0-based인가",
      ],
    },
    {
      kind: "text",
      body: "디버깅은 중간 상태를 눈으로 보는 것이 가장 빨라요. 매 턴 격자를 출력하는 함수를 미리 만들어두고 예제의 첫 두세 턴을 문제 설명과 대조해요. 이 사이트의 채점 결과 화면에 `console.log` / `print` 출력이 그대로 표시돼요.",
    },
  ],
  patterns: [
    {
      title: "모든 쌍과 모든 구간 훑기",
      note: "구간을 볼 때 안쪽 반복문에서 합을 이어서 더하면, 매번 다시 더하는 O(n³)를 O(n²)로 줄여요.",
      code: {
        javascript: `// 모든 쌍
for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    check(nums[i], nums[j]);
  }
}

// 모든 연속 구간의 합
for (let start = 0; start < n; start++) {
  let sum = 0;
  for (let end = start; end < n; end++) {
    sum += nums[end];          // 다시 더하지 않아요
    best = Math.max(best, sum);
  }
}`,
        python: `# 모든 쌍
for i in range(n):
    for j in range(i + 1, n):
        check(nums[i], nums[j])

# 모든 연속 구간의 합
for start in range(n):
    total = 0
    for end in range(start, n):
        total += nums[end]      # 다시 더하지 않아요
        best = max(best, total)`,
      },
    },
    {
      title: "비트마스크로 부분집합 전체 순회",
      note: "괄호를 빠뜨리지 마요. n이 20이면 약 100만 번이에요.",
      code: {
        javascript: `for (let mask = 0; mask < (1 << n); mask++) {
  const subset = [];
  for (let i = 0; i < n; i++) {
    if ((mask & (1 << i)) !== 0) subset.push(items[i]);
  }
  // subset 처리
}`,
        python: `for mask in range(1 << n):
    subset = [items[i] for i in range(n) if (mask & (1 << i)) != 0]
    # subset 처리`,
      },
    },
    {
      title: "델타 배열과 방향 회전",
      note: "왼쪽 회전을 (d - 1) % 4 로 쓰면 JavaScript에서 음수가 돼요. +3 을 써요.",
      code: {
        javascript: `// 북, 동, 남, 서
const DX = [-1, 0, 1, 0];
const DY = [0, 1, 0, -1];
dir = (dir + 1) % 4;        // 오른쪽 90도
dir = (dir + 3) % 4;        // 왼쪽 90도

const ny = y + DX[dir];
const nx = x + DY[dir];
if (ny >= 0 && ny < rows && nx >= 0 && nx < cols) { }

// 8방향
const D8 = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];`,
        python: `# 북, 동, 남, 서
DIRS = ((-1, 0), (0, 1), (1, 0), (0, -1))
d = (d + 1) % 4        # 오른쪽 90도
d = (d + 3) % 4        # 왼쪽 90도

dy, dx = DIRS[d]
ny, nx = y + dy, x + dx
if 0 <= ny < rows and 0 <= nx < cols:
    pass

# 8방향
D8 = [(dy, dx) for dy in (-1, 0, 1) for dx in (-1, 0, 1) if (dy, dx) != (0, 0)]`,
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
      next[i][j] = step(grid, i, j);   // 원본만 읽어요
    }
  }
  grid = next;
}`,
        python: `grid = start
for _ in range(turns):
    nxt = [[0] * cols for _ in range(rows)]
    for i in range(rows):
        for j in range(cols):
            nxt[i][j] = step(grid, i, j)   # 원본만 읽어요
    grid = nxt`,
      },
    },
  ],
  problems: [
    {
      slug: "three-sum",
      title: "세 수의 합",
      role: "워밍업",
      teaches: "삼중 반복문으로 모든 경우를 만들어 보기",
    },
    {
      slug: "subset-sum",
      title: "부분집합의 합",
      role: "핵심",
      teaches: "비트마스크로 2ⁿ개 부분집합 순회하기",
    },
    {
      slug: "rotate-matrix",
      title: "행렬 90도 회전",
      role: "핵심",
      teaches: "전치 후 뒤집기로 나눠 생각하기",
    },
    {
      slug: "robot-simulation",
      title: "로봇 시뮬레이션",
      role: "도전",
      teaches: "방향과 위치를 상태로 관리하기",
    },
  ],
  selfCheck: [
    "'n ≤ 20' 이라는 제한이 왜 완전탐색 신호인가?",
    "`mask & 1 << i == 0` 이 왜 위험한가?",
    "동시에 바뀌는 시뮬레이션에서 원본을 제자리 수정하면 무슨 일이 생기는가?",
  ],
};
