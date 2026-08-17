import { TREE_ENCODING_NOTE, type Problem } from "@/lib/types";

export const treeMaxDepth: Problem = {
  slug: "tree-max-depth",
  title: "트리의 최대 깊이",
  difficulty: "easy",
  tags: ["트리", "DFS", "재귀"],
  summary: "루트에서 가장 먼 잎까지의 노드 수를 구해요.",
  description: [
    "이진 트리의 루트 `root`가 주어져요. 루트에서 가장 먼 잎 노드까지 내려가면서 만나는 노드의 개수를 반환해요.",
    "빈 트리의 깊이는 0이에요.",
    TREE_ENCODING_NOTE,
  ],
  examples: [
    {
      input: "root = [3, 9, 20, null, null, 15, 7]",
      output: "3",
      explain: "3 → 20 → 15 경로가 가장 길어 노드 3개를 지나요.",
    },
    { input: "root = [1, null, 2]", output: "2" },
    { input: "root = []", output: "0", explain: "빈 트리예요." },
  ],
  constraints: [
    "노드 개수는 0개 이상 10,000개 이하예요.",
    "-1,000 ≤ node.val ≤ 1,000",
  ],
  entry: { javascript: "maxDepth", python: "max_depth" },
  argShapes: ["tree"],
  starter: {
    javascript: `/**
 * 노드는 val, left, right 를 가져요. 자식이 없으면 null 이에요.
 *
 * @param {TreeNode|null} root
 * @return {number}
 */
function maxDepth(root) {
  // 여기에 코드를 작성하세요
}
`,
    python: `# 노드는 val, left, right 를 가져요. 자식이 없으면 None 이에요.
def max_depth(root):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[3, 9, 20, null, null, 15, 7]], expected: 3 },
    { input: [[1, null, 2]], expected: 2 },
    { input: [[]], expected: 0 },
    { input: [[1]], expected: 1 },
    { input: [[1, 2, 3, 4, null, null, 5, 6]], expected: 4, hidden: true },
    { input: [[1, 2, null, 3, null, 4]], expected: 4, hidden: true },
  ],
  hint: "깊이는 '자기 자신 1개 + 두 자식 중 더 깊은 쪽'이에요. 빈 노드를 0으로 두면 그대로 재귀가 돼요.",
  solution: {
    javascript: `function maxDepth(root) {
  if (root === null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
`,
    python: `def max_depth(root):
    if root is None:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))
`,
  },
};
