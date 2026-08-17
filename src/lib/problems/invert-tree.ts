import { TREE_ENCODING_NOTE, type Problem } from "@/lib/types";

export const invertTree: Problem = {
  slug: "invert-tree",
  title: "트리 뒤집기",
  difficulty: "medium",
  tags: ["트리", "DFS", "재귀"],
  summary: "모든 노드의 왼쪽과 오른쪽 자식을 맞바꿔 좌우 대칭으로 만들어요.",
  description: [
    "이진 트리의 루트 `root`가 주어져요. 모든 노드에서 왼쪽 자식과 오른쪽 자식을 맞바꾼 트리의 루트를 반환해요.",
    "루트에서 한 번만 바꾸는 게 아니라 **모든 깊이에서** 바꿔야 해요.",
    TREE_ENCODING_NOTE,
    "반환값도 트리예요. 채점기가 다시 레벨 순서 배열로 바꿔서 비교하니까, 노드를 그대로 반환하면 돼요.",
  ],
  examples: [
    {
      input: "root = [4, 2, 7, 1, 3, 6, 9]",
      output: "[4, 7, 2, 9, 6, 3, 1]",
      explain: "모든 층에서 좌우가 뒤집혔어요.",
    },
    { input: "root = [2, 1, 3]", output: "[2, 3, 1]" },
    { input: "root = []", output: "[]" },
  ],
  constraints: [
    "노드 개수는 0개 이상 10,000개 이하예요.",
    "-1,000 ≤ node.val ≤ 1,000",
  ],
  entry: { javascript: "invertTree", python: "invert_tree" },
  argShapes: ["tree"],
  returnShape: "tree",
  starter: {
    javascript: `/**
 * 노드는 val, left, right 를 가져요. 자식이 없으면 null 이에요.
 * 새 노드가 필요하면 new TreeNode(val, left, right) 로 만들 수 있어요.
 *
 * @param {TreeNode|null} root
 * @return {TreeNode|null}
 */
function invertTree(root) {
  // 여기에 코드를 작성하세요
}
`,
    python: `# 노드는 val, left, right 를 가져요. 자식이 없으면 None 이에요.
# 새 노드가 필요하면 TreeNode(val, left, right) 로 만들 수 있어요.
def invert_tree(root):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[4, 2, 7, 1, 3, 6, 9]], expected: [4, 7, 2, 9, 6, 3, 1] },
    { input: [[2, 1, 3]], expected: [2, 3, 1] },
    { input: [[]], expected: [] },
    { input: [[1, 2]], expected: [1, null, 2] },
    { input: [[1]], expected: [1], hidden: true },
    {
      input: [[1, 2, 3, null, 4]],
      expected: [1, 3, 2, null, null, 4],
      hidden: true,
    },
  ],
  hint: "각 노드에서 두 자식을 맞바꾸고, 그 두 자식에도 같은 일을 재귀로 맡기면 끝이에요. 빈 노드는 그대로 돌려보내요.",
  solution: {
    javascript: `function invertTree(root) {
  if (root === null) return null;
  const left = invertTree(root.left);
  root.left = invertTree(root.right);
  root.right = left;
  return root;
}
`,
    python: `def invert_tree(root):
    if root is None:
        return None
    root.left, root.right = invert_tree(root.right), invert_tree(root.left)
    return root
`,
  },
};
