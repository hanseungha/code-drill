import { TREE_ENCODING_NOTE, type Problem } from "@/lib/types";

export const validateBst: Problem = {
  slug: "validate-bst",
  title: "이진 탐색 트리 유효성 검사",
  difficulty: "medium",
  tags: ["트리", "DFS", "재귀"],
  summary: "주어진 이진 트리가 이진 탐색 트리 조건을 지키는지 판별해요.",
  description: [
    "이진 트리의 루트 `root`가 주어져요. 이 트리가 이진 탐색 트리(BST)이면 `true`, 아니면 `false`를 반환해요.",
    "이진 탐색 트리는 모든 노드에 대해 **왼쪽 서브트리의 모든 값이 자기 값보다 작고, 오른쪽 서브트리의 모든 값이 자기 값보다 커야** 해요. 바로 아래 두 자식만 보는 것으로는 부족해요 — 손자 이하도 조건을 지켜야 해요.",
    "값은 모두 서로 다르다고 가정해요. 빈 트리는 유효한 BST예요.",
    TREE_ENCODING_NOTE,
  ],
  examples: [
    { input: "root = [2, 1, 3]", output: "true" },
    {
      input: "root = [5, 1, 4, null, null, 3, 6]",
      output: "false",
      explain:
        "4는 5의 오른쪽에 있어서 5보다 커야 하는데 그렇지 않아요. 부모인 4만 보면 3과 6은 올바르지만, 조상인 5까지 따지면 어긋나요.",
    },
    { input: "root = []", output: "true" },
  ],
  constraints: [
    "노드 개수는 0개 이상 10,000개 이하예요.",
    "-100,000 ≤ node.val ≤ 100,000",
    "모든 값은 서로 달라요.",
  ],
  entry: { javascript: "isValidBST", python: "is_valid_bst" },
  argShapes: ["tree"],
  starter: {
    javascript: `/**
 * 노드는 val, left, right 를 가져요. 자식이 없으면 null 이에요.
 *
 * @param {TreeNode|null} root
 * @return {boolean}
 */
function isValidBST(root) {
  // 여기에 코드를 작성하세요
}
`,
    python: `# 노드는 val, left, right 를 가져요. 자식이 없으면 None 이에요.
def is_valid_bst(root):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[2, 1, 3]], expected: true },
    { input: [[5, 1, 4, null, null, 3, 6]], expected: false },
    { input: [[]], expected: true },
    { input: [[1]], expected: true },
    { input: [[3, 1, 5, 0, 2, 4, 6]], expected: true, hidden: true },
    { input: [[5, 4, 6, null, null, 3, 7]], expected: false, hidden: true },
    { input: [[10, 5, 15, null, null, 6, 20]], expected: false, hidden: true },
  ],
  hint: "노드마다 '이 값이 들어갈 수 있는 범위'를 물려주세요. 왼쪽으로 내려가면 상한이 부모 값으로 좁혀지고, 오른쪽으로 내려가면 하한이 부모 값으로 좁혀져요. 중위 순회 결과가 오름차순인지 보는 방법도 있어요.",
  solution: {
    javascript: `function isValidBST(root) {
  const check = (node, low, high) => {
    if (node === null) return true;
    if (low !== null && node.val <= low) return false;
    if (high !== null && node.val >= high) return false;
    return check(node.left, low, node.val) && check(node.right, node.val, high);
  };
  return check(root, null, null);
}
`,
    python: `def is_valid_bst(root):
    def check(node, low, high):
        if node is None:
            return True
        if low is not None and node.val <= low:
            return False
        if high is not None and node.val >= high:
            return False
        return check(node.left, low, node.val) and check(node.right, node.val, high)

    return check(root, None, None)
`,
  },
};
