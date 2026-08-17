import type { Week } from "@/lib/curriculum/types";

export const w17: Week = {
  week: 17,
  phase: 3,
  title: "백트래킹",
  summary: "모든 경우를 만들되, 가망 없는 가지는 미리 잘라내요.",
  concept: [
    {
      kind: "text",
      body: "완전 탐색은 가능한 모든 경우를 만들어 보는 방식이에요. 백트래킹은 그것을 재귀로 구현하되, **도중에 답이 될 수 없다고 판단되면 그 아래를 통째로 건너뛰는** 기법이에요. 이 '건너뛰기'가 가지치기(pruning)이고, 백트래킹의 전부라고 해도 돼요.",
    },
    {
      kind: "text",
      body: "구조는 단순해요. 선택하고, 더 깊이 들어가고, 돌아와서 선택을 되돌려요. 이 세 줄이 반복될 뿐이에요.",
    },
    {
      kind: "list",
      ordered: true,
      items: [
        "**선택** — 현재 후보를 결과에 넣어요",
        "**진행** — 다음 단계로 재귀해요",
        "**취소** — 넣었던 것을 빼서 원래 상태로 되돌려요",
      ],
    },
    {
      kind: "trap",
      title: "취소를 빠뜨리면 조용히 틀려요",
      body: "결과 배열에 넣기만 하고 빼지 않으면 다음 가지가 이전 가지의 흔적을 물려받아요. 에러 없이 답만 틀리므로 원인을 찾기 어려워요. 넣는 줄과 빼는 줄을 항상 짝으로 쓰는 습관을 들여요.",
    },
    {
      kind: "trap",
      title: "결과를 그대로 담으면 나중에 전부 같은 값이 돼요",
      body: "진행 중인 배열을 결과 목록에 그냥 `push`하면 참조가 담겨요. 이후 취소 단계에서 그 배열이 계속 바뀌므로, 끝나고 보면 모든 결과가 빈 배열이 돼 있어요. **복사본**을 담아야 해요 — `[...path]` 또는 `path[:]`.",
    },
    {
      kind: "heading",
      body: "세 가지 기본 형태",
    },
    {
      kind: "table",
      headers: ["만들 것", "개수", "다음 후보의 시작", "중복 사용"],
      rows: [
        ["부분집합", "2ⁿ", "`i + 1`", "안 함"],
        ["조합 (nCk)", "nCk", "`i + 1`", "안 함"],
        ["순열 (nPn)", "n!", "처음부터", "`used` 배열로 막음"],
      ],
    },
    {
      kind: "text",
      body: "차이는 '다음 재귀에 무엇을 넘기는가' 한 줄이에요. 조합은 자기 다음 인덱스부터 보게 해서 순서가 다른 같은 조합을 만들지 않고, 순열은 전부 다시 보되 이미 쓴 것만 막아요.",
    },
    {
      kind: "heading",
      body: "가지치기가 실력이에요",
    },
    {
      kind: "text",
      body: "N-Queen에서 가지치기 없이 모든 배치를 만들면 8×8에서 약 40억 가지예요. 열과 대각선 충돌을 놓는 즉시 확인하면 2천 가지 정도만 탐색해요. 같은 알고리즘인데 결과가 완전히 달라요.",
    },
    {
      kind: "list",
      items: [
        "지금까지의 부분 답이 이미 조건을 어겼다면 즉시 되돌아가요",
        "남은 것을 다 더해도 목표에 못 미친다면 더 볼 필요가 없어요",
        "정렬해두면 '이 후보가 안 되면 뒤도 안 된다'는 판단이 가능해져요",
      ],
    },
  ],
  patterns: [
    {
      title: "부분집합",
      code: {
        javascript: `const out = [];
const path = [];
function backtrack(start) {
  out.push([...path]);          // 복사본을 담아요
  for (let i = start; i < nums.length; i++) {
    path.push(nums[i]);         // 선택
    backtrack(i + 1);           // 진행
    path.pop();                 // 취소
  }
}
backtrack(0);`,
        python: `out = []
path = []

def backtrack(start):
    out.append(path[:])          # 복사본을 담아요
    for i in range(start, len(nums)):
        path.append(nums[i])     # 선택
        backtrack(i + 1)         # 진행
        path.pop()               # 취소

backtrack(0)`,
      },
    },
    {
      title: "순열",
      note: "조합과 달리 매번 처음부터 보되, used로 이미 쓴 원소를 막아요.",
      code: {
        javascript: `const used = new Array(nums.length).fill(false);
function backtrack() {
  if (path.length === nums.length) {
    out.push([...path]);
    return;
  }
  for (let i = 0; i < nums.length; i++) {
    if (used[i]) continue;
    used[i] = true;
    path.push(nums[i]);
    backtrack();
    path.pop();
    used[i] = false;
  }
}`,
        python: `used = [False] * len(nums)

def backtrack():
    if len(path) == len(nums):
        out.append(path[:])
        return
    for i, n in enumerate(nums):
        if used[i]:
            continue
        used[i] = True
        path.append(n)
        backtrack()
        path.pop()
        used[i] = False`,
      },
    },
    {
      title: "가지치기를 넣은 조합의 합",
      note: "정렬해두면 후보가 남은 목표보다 클 때 뒤를 전부 버릴 수 있어요.",
      code: {
        javascript: `candidates.sort((a, b) => a - b);
function backtrack(start, remain) {
  if (remain === 0) {
    out.push([...path]);
    return;
  }
  for (let i = start; i < candidates.length; i++) {
    if (candidates[i] > remain) break;   // 가지치기
    path.push(candidates[i]);
    backtrack(i + 1, remain - candidates[i]);
    path.pop();
  }
}`,
        python: `candidates.sort()

def backtrack(start, remain):
    if remain == 0:
        out.append(path[:])
        return
    for i in range(start, len(candidates)):
        if candidates[i] > remain:       # 가지치기
            break
        path.append(candidates[i])
        backtrack(i + 1, remain - candidates[i])
        path.pop()`,
      },
    },
  ],
  problems: [
    {
      slug: "subsets-all",
      title: "부분집합 모두 구하기",
      role: "워밍업",
      teaches: "선택하고 되돌리는 구조",
    },
    {
      slug: "permutations",
      title: "순열 생성",
      role: "핵심",
      teaches: "used 배열로 중복 사용 막기",
    },
    {
      slug: "combination-sum",
      title: "합이 target인 조합",
      role: "핵심",
      teaches: "중복 제거와 가지치기",
    },
    {
      slug: "n-queens",
      title: "N-Queen",
      role: "도전",
      teaches: "가지치기가 만드는 차이",
    },
  ],
  selfCheck: [
    "결과 목록에 복사본이 아니라 원본을 담으면 무슨 일이 일어나나요?",
    "조합과 순열의 코드에서 실제로 다른 부분은 어디인가요?",
    "'n ≤ 20'이라는 제한이 백트래킹을 시사하는 이유는 무엇인가요? (1주차 표)",
  ],
};
