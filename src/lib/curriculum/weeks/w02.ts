import type { Week } from "@/lib/curriculum/types";

export const w02: Week = {
  week: 2,
  phase: 1,
  title: "배열: 1차원과 2차원",
  summary: "순회·누적합·차분, 그리고 격자를 다루는 기본기.",
  concept: [
    {
      kind: "text",
      body: "배열은 인덱스로 원소에 바로 접근할 수 있어 읽기와 쓰기가 `O(1)`입니다. 대신 중간에 끼워 넣거나 빼면 뒤쪽 원소를 전부 밀어야 해서 `O(n)`입니다. 이 비대칭이 나중에 큐를 배열로 만들면 안 되는 이유(10주차)로 이어집니다.",
    },
    {
      kind: "list",
      items: [
        "맨 뒤에 넣고 빼기는 빠릅니다 — JS `push`/`pop`, Python `append`/`pop`",
        "맨 앞에 넣고 빼기는 느립니다 — JS `unshift`/`shift`, Python `insert(0, x)`/`pop(0)`",
        "길이를 미리 알면 `Array(n).fill(0)` / `[0] * n` 으로 한 번에 만드는 편이 낫습니다",
        "잘라내기는 복사입니다 — `slice` / `nums[a:b]` 는 `O(잘라낸 길이)`",
      ],
    },
    {
      kind: "trap",
      title: "반복문 안에서 `includes` / `in` 을 쓰면 O(n²)가 됩니다",
      body: "`nums.includes(x)`와 파이썬 리스트의 `x in nums`는 배열을 처음부터 훑기 때문에 `O(n)`입니다. 반복문 안에서 부르면 전체가 `O(n²)`이 되고, `n`이 10만이면 그대로 시간 초과입니다. 5주차에서 배울 해시 집합으로 바꾸면 `O(1)`이 됩니다.",
    },
    {
      kind: "heading",
      body: "2차원 배열",
    },
    {
      kind: "text",
      body: "격자·행렬·지도는 전부 2차원 배열입니다. 앞으로 나올 격자 BFS(16주차), 2차원 DP(20주차), 시뮬레이션(4주차)이 모두 여기서 출발하므로, 만들고 훑는 법을 지금 확실히 해둡니다.",
    },
    {
      kind: "text",
      body: "관례는 `grid[행][열]`, 즉 `grid[y][x]` 입니다. 문제 설명이 (x, y) 좌표로 쓰여 있으면 코드와 순서가 뒤집히므로, **어느 쪽을 첫 번째 인덱스로 쓸지 시작할 때 정하고 끝까지 지키세요.** 중간에 섞이면 예제는 통과하고 제출은 틀리는 상태가 됩니다.",
    },
    {
      kind: "trap",
      title: "2차원 배열을 잘못 만들면 모든 행이 같은 배열이 됩니다",
      body: "`new Array(n).fill([])` 나 `[[0] * m] * n` 은 같은 배열 하나를 n번 참조합니다. 한 칸을 고치면 모든 행이 함께 바뀝니다. `Array.from({length: n}, () => new Array(m).fill(0))` 또는 `[[0] * m for _ in range(n)]` 으로 만드세요.",
    },
    {
      kind: "heading",
      body: "누적합",
    },
    {
      kind: "text",
      body: "구간 합을 여러 번 물어보는 문제에서, 매번 그 구간을 더하면 질문 하나당 `O(n)`입니다. 앞에서부터 더한 값을 미리 만들어 두면 어떤 구간이든 뺄셈 한 번, 즉 `O(1)`에 답할 수 있습니다. 질문이 10만 개면 `O(n·q)`가 `O(n+q)`로 줄어듭니다.",
    },
    {
      kind: "text",
      body: "`prefix` 배열의 길이를 `n+1`로 잡고 `prefix[0] = 0` 으로 두는 게 요령입니다. 그러면 `l`이 0일 때를 따로 처리하지 않아도 됩니다 — 구간 `[l, r]`의 합이 언제나 `prefix[r+1] - prefix[l]` 입니다.",
    },
    {
      kind: "heading",
      body: "차분 배열",
    },
    {
      kind: "text",
      body: "누적합의 반대 방향입니다. **구간에 값을 여러 번 더해야 할 때** 씁니다. 구간 `[l, r]`에 x를 더하려면 차분 배열의 `l`에 `+x`, `r+1`에 `-x`만 기록합니다. 모든 갱신을 마친 뒤 누적합을 한 번 취하면 최종 배열이 나옵니다.",
    },
    {
      kind: "table",
      headers: ["상황", "도구", "효과"],
      rows: [
        ["구간 합을 여러 번 조회, 값은 안 바뀜", "누적합", "조회 `O(1)`"],
        ["구간에 값을 여러 번 더함, 조회는 마지막에", "차분 배열", "갱신 `O(1)`"],
        ["갱신과 조회가 뒤섞임", "세그먼트 트리 (이 과정 범위 밖)", "둘 다 `O(log n)`"],
      ],
    },
  ],
  patterns: [
    {
      title: "2차원 배열 만들고 훑기",
      note: "행 개수와 열 개수를 변수로 먼저 꺼내두면 경계 조건을 쓸 때 헷갈리지 않습니다.",
      code: {
        javascript: `const rows = grid.length;
const cols = grid[0].length;
const seen = Array.from({ length: rows }, () => new Array(cols).fill(false));

for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    if (grid[y][x] === 1) seen[y][x] = true;
  }
}`,
        python: `rows = len(grid)
cols = len(grid[0])
seen = [[False] * cols for _ in range(rows)]

for y in range(rows):
    for x in range(cols):
        if grid[y][x] == 1:
            seen[y][x] = True`,
      },
    },
    {
      title: "누적합으로 구간 합을 O(1)에 답하기",
      note: "prefix[i]는 앞에서부터 i개의 합입니다. 구간 [l, r]의 합은 prefix[r+1] - prefix[l].",
      code: {
        javascript: `const prefix = new Array(nums.length + 1).fill(0);
for (let i = 0; i < nums.length; i++) {
  prefix[i + 1] = prefix[i] + nums[i];
}
const rangeSum = (l, r) => prefix[r + 1] - prefix[l];`,
        python: `prefix = [0] * (len(nums) + 1)
for i, n in enumerate(nums):
    prefix[i + 1] = prefix[i] + n

def range_sum(l, r):
    return prefix[r + 1] - prefix[l]`,
      },
    },
    {
      title: "차분 배열로 구간 갱신",
      note: "갱신은 O(1), 마지막에 누적합을 한 번 취해 실제 배열을 복원합니다.",
      code: {
        javascript: `const diff = new Array(n + 1).fill(0);
for (const [l, r, x] of updates) {
  diff[l] += x;
  diff[r + 1] -= x;
}
const result = new Array(n).fill(0);
let running = 0;
for (let i = 0; i < n; i++) {
  running += diff[i];
  result[i] = running;
}`,
        python: `diff = [0] * (n + 1)
for l, r, x in updates:
    diff[l] += x
    diff[r + 1] -= x

result = []
running = 0
for i in range(n):
    running += diff[i]
    result.append(running)`,
      },
    },
  ],
  problems: [
    {
      slug: "array-sum-max",
      title: "배열의 합과 최댓값",
      role: "워밍업",
      teaches: "순회 기본과 언어별 배열 API",
    },
    {
      slug: "max-row-sum",
      title: "행의 합이 가장 큰 줄",
      role: "핵심",
      teaches: "2차원 배열을 행 단위로 훑기",
    },
    {
      slug: "range-sum",
      title: "구간 합 구하기",
      role: "핵심",
      teaches: "누적합으로 질문마다 O(1)에 답하기",
    },
    {
      slug: "range-add",
      title: "구간에 값 더하기",
      role: "도전",
      teaches: "차분 배열 — 갱신을 O(1)로 미루기",
    },
  ],
  selfCheck: [
    "배열 맨 앞에 원소를 넣는 연산이 O(n)인 이유를 설명할 수 있는가?",
    "`[[0] * m] * n` 이 왜 위험한가?",
    "누적합과 차분 배열은 각각 어떤 상황에서 쓰는가?",
  ],
};
