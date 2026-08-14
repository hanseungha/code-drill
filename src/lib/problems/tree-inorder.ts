import { TREE_ENCODING_NOTE, type Problem } from "@/lib/types";

export const treeInorder: Problem = {
  slug: "tree-inorder",
  title: "중위 순회",
  difficulty: "easy",
  tags: ["트리", "DFS", "재귀"],
  summary: "이진 트리를 왼쪽 → 자기 자신 → 오른쪽 순서로 방문합니다.",
  description: [
    "이진 트리의 루트 `root`가 주어집니다. 중위 순회(inorder) 순서로 방문한 노드 값을 배열로 반환하세요.",
    "중위 순회는 각 노드에서 **왼쪽 서브트리 → 자기 자신 → 오른쪽 서브트리** 순으로 내려갑니다. 이 순서가 중요한 이유는 이진 탐색 트리를 중위 순회하면 값이 정렬된 채로 나오기 때문입니다.",
    TREE_ENCODING_NOTE,
  ],
  examples: [
    {
      input: "root = [1, null, 2, 3]",
      output: "[1, 3, 2]",
      explain:
        "1의 왼쪽은 비었으니 1을 먼저 방문하고, 오른쪽 서브트리(2)로 가서 그 왼쪽 자식 3을 먼저 방문합니다.",
    },
    {
      input: "root = [4, 2, 6, 1, 3, 5, 7]",
      output: "[1, 2, 3, 4, 5, 6, 7]",
      explain: "이진 탐색 트리라 정렬된 순서로 나옵니다.",
    },
    { input: "root = []", output: "[]" },
  ],
  constraints: [
    "노드 개수는 0개 이상 10,000개 이하입니다.",
    "-1,000 ≤ node.val ≤ 1,000",
  ],
  entry: { javascript: "inorderTraversal", python: "inorder_traversal" },
  argShapes: ["tree"],
  starter: {
    javascript: `/**
 * 노드는 val, left, right 를 가집니다. 자식이 없으면 null 입니다.
 *
 * @param {TreeNode|null} root
 * @return {number[]}
 */
function inorderTraversal(root) {
  // 여기에 코드를 작성하세요
}
`,
    python: `# 노드는 val, left, right 를 가집니다. 자식이 없으면 None 입니다.
def inorder_traversal(root):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[1, null, 2, 3]], expected: [1, 3, 2] },
    { input: [[4, 2, 6, 1, 3, 5, 7]], expected: [1, 2, 3, 4, 5, 6, 7] },
    { input: [[]], expected: [] },
    { input: [[1]], expected: [1] },
    { input: [[1, 2]], expected: [2, 1], hidden: true },
    { input: [[3, 1, 4, null, 2]], expected: [1, 2, 3, 4], hidden: true },
  ],
  hint: "결과 배열 하나를 만들어두고, 재귀 함수 안에서 왼쪽을 먼저 처리하고 자기 값을 넣은 다음 오른쪽을 처리하세요. 세 줄의 순서가 곧 순회 이름입니다.",
  solution: {
    javascript: `function inorderTraversal(root) {
  const out = [];
  const walk = (node) => {
    if (node === null) return;
    walk(node.left);
    out.push(node.val);
    walk(node.right);
  };
  walk(root);
  return out;
}
`,
    python: `def inorder_traversal(root):
    out = []

    def walk(node):
        if node is None:
            return
        walk(node.left)
        out.append(node.val)
        walk(node.right)

    walk(root)
    return out
`,
  },
};
