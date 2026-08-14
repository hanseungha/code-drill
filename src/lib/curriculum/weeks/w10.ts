import type { Week } from "@/lib/curriculum/types";

export const w10: Week = {
  week: 10,
  phase: 2,
  title: "트리",
  summary: "재귀가 가장 자연스럽게 맞아떨어지는 자료구조.",
  concept: [
    {
      kind: "text",
      body: "트리는 노드마다 자식을 가지는 구조입니다. 이진 트리는 자식이 최대 둘이고, 각각 `left`와 `right`로 부릅니다. 트리 문제가 재귀와 잘 맞는 이유는 명확합니다 — **어떤 노드에서 봐도 왼쪽 서브트리와 오른쪽 서브트리가 다시 트리**이기 때문입니다.",
    },
    {
      kind: "text",
      body: "그래서 트리 문제의 재귀는 거의 항상 같은 모양입니다. 빈 노드면 기본값을 돌려주고, 아니면 두 자식에게 같은 질문을 던진 뒤 그 답을 합칩니다.",
    },
    {
      kind: "heading",
      body: "네 가지 순회",
    },
    {
      kind: "table",
      headers: ["순회", "방문 순서", "쓰임"],
      rows: [
        ["전위 (preorder)", "자기 → 왼쪽 → 오른쪽", "트리 복사, 구조 출력"],
        ["중위 (inorder)", "왼쪽 → 자기 → 오른쪽", "BST를 정렬된 순서로 얻기"],
        ["후위 (postorder)", "왼쪽 → 오른쪽 → 자기", "자식 결과가 필요한 계산, 삭제"],
        ["레벨 (level order)", "위에서 아래로, 왼쪽에서 오른쪽", "깊이별 처리, 큐 사용"],
      ],
    },
    {
      kind: "text",
      body: "앞의 셋은 코드가 완전히 같고 **세 줄의 순서만** 다릅니다. 레벨 순회만 재귀가 아니라 큐를 씁니다 — 사실상 BFS이고, 11주차에서 그래프로 확장됩니다.",
    },
    {
      kind: "heading",
      body: "이진 탐색 트리",
    },
    {
      kind: "text",
      body: "모든 노드에서 **왼쪽 서브트리의 모든 값이 자기보다 작고, 오른쪽 서브트리의 모든 값이 자기보다 큰** 트리를 이진 탐색 트리(BST)라 합니다. 이 성질 덕에 값을 찾을 때 매번 한쪽을 통째로 버릴 수 있어 평균 `O(log n)`입니다 — 8주차 이분 탐색과 같은 아이디어입니다.",
    },
    {
      kind: "trap",
      title: "BST 검사에서 부모만 보면 틀립니다",
      body: "각 노드에서 '왼쪽 자식 < 나 < 오른쪽 자식'만 확인하면 통과하지만 실제로는 BST가 아닌 트리가 있습니다. 손자가 조상의 조건을 어길 수 있기 때문입니다. 노드마다 **들어갈 수 있는 값의 범위**를 물려주면서 내려가야 합니다. 왼쪽으로 가면 상한이 부모 값으로, 오른쪽으로 가면 하한이 부모 값으로 좁혀집니다.",
    },
    {
      kind: "heading",
      body: "이 사이트에서 트리를 주고받는 방식",
    },
    {
      kind: "text",
      body: "테스트 케이스는 JSON이어야 해서(같은 케이스가 JavaScript와 Python 채점기를 함께 돌아야 합니다) 트리는 **레벨 순서 배열**로 적습니다. `null`은 자식이 없다는 뜻이고, 뒤쪽 `null`은 생략합니다. 채점기가 호출 직전에 이 배열을 노드로 바꿔서 넘겨주므로, 여러분은 `root.left`와 `root.right`만 쓰면 됩니다.",
    },
    {
      kind: "text",
      body: "`[3, 9, 20, null, null, 15, 7]`은 루트 3에 자식 9와 20이 있고, 9는 자식이 없으며, 20의 자식이 15와 7인 트리입니다. 새 노드가 필요하면 `TreeNode`를 두 언어 모두에서 바로 쓸 수 있습니다.",
    },
  ],
  patterns: [
    {
      title: "트리 재귀의 기본형",
      note: "빈 노드에서 기본값을 돌려주고, 두 자식의 답을 합칩니다.",
      code: {
        javascript: `function depth(node) {
  if (node === null) return 0;
  return 1 + Math.max(depth(node.left), depth(node.right));
}`,
        python: `def depth(node):
    if node is None:
        return 0
    return 1 + max(depth(node.left), depth(node.right))`,
      },
    },
    {
      title: "중위 순회",
      note: "세 줄의 순서만 바꾸면 전위·후위가 됩니다.",
      code: {
        javascript: `const out = [];
function walk(node) {
  if (node === null) return;
  walk(node.left);
  out.push(node.val);
  walk(node.right);
}`,
        python: `out = []

def walk(node):
    if node is None:
        return
    walk(node.left)
    out.append(node.val)
    walk(node.right)`,
      },
    },
    {
      title: "범위를 물려주며 BST 검사",
      code: {
        javascript: `function check(node, low, high) {
  if (node === null) return true;
  if (low !== null && node.val <= low) return false;
  if (high !== null && node.val >= high) return false;
  return check(node.left, low, node.val) && check(node.right, node.val, high);
}`,
        python: `def check(node, low, high):
    if node is None:
        return True
    if low is not None and node.val <= low:
        return False
    if high is not None and node.val >= high:
        return False
    return check(node.left, low, node.val) and check(node.right, node.val, high)`,
      },
    },
  ],
  problems: [
    {
      slug: "tree-max-depth",
      title: "트리의 최대 깊이",
      role: "워밍업",
      teaches: "트리 재귀의 기본형",
    },
    {
      slug: "tree-inorder",
      title: "중위 순회",
      role: "핵심",
      teaches: "순회 순서가 만드는 차이",
    },
    {
      slug: "invert-tree",
      title: "트리 뒤집기",
      role: "핵심",
      teaches: "트리를 읽는 것이 아니라 만들어 반환하기",
    },
    {
      slug: "validate-bst",
      title: "이진 탐색 트리 유효성 검사",
      role: "도전",
      teaches: "범위를 물려주는 재귀",
    },
  ],
  selfCheck: [
    "중위 순회로 BST를 훑으면 왜 정렬된 순서가 나오는가?",
    "BST 검사에서 부모만 보면 안 되는 반례를 하나 만들 수 있는가?",
    "레벨 순회만 다른 셋과 구현이 다른 이유는?",
  ],
};
