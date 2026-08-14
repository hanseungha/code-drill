import type { Week } from "@/lib/curriculum/types";

export const w21: Week = {
  week: 21,
  phase: 4,
  title: "유니온 파인드와 MST",
  summary: "'이 둘이 같은 무리인가'를 거의 상수 시간에 답합니다.",
  concept: [
    {
      kind: "text",
      body: "11주차에서 연결 요소를 DFS로 셌습니다. 그런데 간선이 하나씩 추가되는 상황이라면 매번 DFS를 다시 돌려야 합니다. 유니온 파인드는 **합치기와 같은 무리인지 확인하기**를 각각 거의 `O(1)`에 처리합니다.",
    },
    {
      kind: "text",
      body: "아이디어는 각 무리마다 대표 하나를 정해두는 것입니다. `find(x)`는 x가 속한 무리의 대표를 찾고, `union(a, b)`는 두 무리의 대표를 하나로 합칩니다. 같은 무리인지는 대표가 같은지로 판정합니다.",
    },
    {
      kind: "heading",
      body: "두 가지 최적화",
    },
    {
      kind: "text",
      body: "순진하게 구현하면 트리가 한 줄로 길어져 `find`가 `O(n)`이 됩니다. 두 가지를 함께 쓰면 사실상 상수 시간이 됩니다.",
    },
    {
      kind: "list",
      items: [
        "**경로 압축** — `find` 하는 김에 지나온 노드를 전부 대표에 직접 붙입니다. 다음부터 한 번에 도달합니다",
        "**union by rank/size** — 합칠 때 작은 무리를 큰 무리 밑에 붙입니다. 트리가 깊어지지 않습니다",
      ],
    },
    {
      kind: "trap",
      title: "경로 압축 없이 쓰면 최악에 O(n)입니다",
      body: "`union(0,1), union(1,2), union(2,3)...` 처럼 이어 붙이면 한 줄짜리 트리가 만들어집니다. `find`가 매번 끝까지 내려가야 해서 전체가 `O(n²)`이 됩니다. 경로 압축은 두 줄이면 되니 항상 넣으세요.",
    },
    {
      kind: "heading",
      body: "사이클 판정",
    },
    {
      kind: "text",
      body: "간선 `(a, b)`를 추가하려는데 a와 b가 **이미 같은 무리**라면, 그 간선은 사이클을 만듭니다. 이 판정이 다음에 나올 크루스칼의 핵심 부품입니다.",
    },
    {
      kind: "heading",
      body: "최소 신장 트리 (MST)",
    },
    {
      kind: "text",
      body: "모든 정점을 연결하되 간선 비용의 합이 최소가 되게 고른 것을 최소 신장 트리라 합니다. 정점이 V개면 간선은 정확히 V-1개이고 사이클이 없습니다. '모든 도시를 잇는 최소 비용 도로망' 같은 문제가 이것입니다.",
    },
    {
      kind: "text",
      body: "크루스칼은 그리디입니다(15주차). 간선을 비용 오름차순으로 정렬해놓고 싼 것부터 집되, 사이클을 만드는 간선만 건너뜁니다. 유니온 파인드가 바로 그 사이클 판정을 담당합니다.",
    },
    {
      kind: "table",
      headers: ["단계", "도구", "복잡도"],
      rows: [
        ["간선 정렬", "정렬 (4주차)", "`O(E log E)`"],
        ["사이클 판정", "유니온 파인드", "거의 `O(1)`"],
        ["전체", "크루스칼", "`O(E log E)`"],
      ],
    },
    {
      kind: "text",
      body: "간선을 V-1개 고르는 순간 멈춰도 됩니다. 그리디가 여기서 통하는 이유는 '가장 싼 간선은 항상 어떤 MST에 포함된다'는 성질 때문입니다.",
    },
  ],
  patterns: [
    {
      title: "유니온 파인드 (경로 압축 + union by size)",
      code: {
        javascript: `const parent = Array.from({ length: n }, (_, i) => i);
const size = new Array(n).fill(1);

function find(x) {
  while (parent[x] !== x) {
    parent[x] = parent[parent[x]];   // 경로 압축
    x = parent[x];
  }
  return x;
}

function union(a, b) {
  let ra = find(a);
  let rb = find(b);
  if (ra === rb) return false;       // 이미 같은 무리 = 사이클
  if (size[ra] < size[rb]) [ra, rb] = [rb, ra];
  parent[rb] = ra;
  size[ra] += size[rb];
  return true;
}`,
        python: `parent = list(range(n))
size = [1] * n

def find(x):
    while parent[x] != x:
        parent[x] = parent[parent[x]]   # 경로 압축
        x = parent[x]
    return x

def union(a, b):
    ra, rb = find(a), find(b)
    if ra == rb:                        # 이미 같은 무리 = 사이클
        return False
    if size[ra] < size[rb]:
        ra, rb = rb, ra
    parent[rb] = ra
    size[ra] += size[rb]
    return True`,
      },
    },
    {
      title: "크루스칼 MST",
      note: "union이 false를 돌려주면 그 간선은 사이클을 만든다는 뜻이라 건너뜁니다.",
      code: {
        javascript: `edges.sort((a, b) => a[2] - b[2]);
let total = 0;
let used = 0;
for (const [a, b, cost] of edges) {
  if (union(a, b)) {
    total += cost;
    if (++used === n - 1) break;
  }
}`,
        python: `edges.sort(key=lambda e: e[2])
total = used = 0
for a, b, cost in edges:
    if union(a, b):
        total += cost
        used += 1
        if used == n - 1:
            break`,
      },
    },
  ],
  problems: [
    {
      title: "유니온 파인드 구현",
      role: "워밍업",
      teaches: "find와 union, 그리고 두 가지 최적화",
    },
    {
      title: "그래프 사이클 판정",
      role: "핵심",
      teaches: "합치기 전에 같은 무리인지 확인하기",
    },
    {
      title: "크루스칼 MST",
      role: "핵심",
      teaches: "정렬 + 유니온 파인드의 결합",
    },
    {
      title: "섬 연결하기",
      role: "도전",
      teaches: "MST를 실제 문제 상황에 적용하기",
    },
  ],
  selfCheck: [
    "경로 압축을 빼면 어떤 입력에서 O(n²)가 되는가?",
    "유니온 파인드로 사이클을 판정하는 원리는?",
    "크루스칼이 그리디로 정당한 이유를 한 문장으로 말할 수 있는가?",
  ],
};
