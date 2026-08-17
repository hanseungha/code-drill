import type { Problem } from "@/lib/types";

export const robotSimulation: Problem = {
  slug: "robot-simulation",
  title: "로봇 시뮬레이션",
  difficulty: "hard",
  tags: ["시뮬레이션", "구현"],
  summary: "방향과 위치를 상태로 들고 명령을 하나씩 실행해요.",
  description: [
    "로봇이 좌표 `(0, 0)`에서 **북쪽**을 보고 서 있어요. 명령 문자열 `commands`가 주어지며, 각 문자는 다음을 뜻해요.",
    "`G` 는 바라보는 방향으로 한 칸 전진, `L` 은 제자리에서 왼쪽으로 90도 회전, `R` 은 오른쪽으로 90도 회전이에요.",
    "모든 명령을 실행한 뒤의 위치를 `[x, y]` 로 반환해요. 북쪽은 `y`가 늘어나는 방향, 동쪽은 `x`가 늘어나는 방향이에요.",
    "위치만 답하면 되지만 **방향을 정확히 들고 있어야** 위치가 맞아요. 회전을 잘못 구현하면 몇 걸음 뒤부터 어긋나요.",
  ],
  examples: [
    { input: 'commands = "GG"', output: "[0, 2]", explain: "북쪽으로 두 칸 가요." },
    {
      input: 'commands = "GRG"',
      output: "[1, 1]",
      explain: "북쪽으로 한 칸 간 뒤 동쪽으로 돌아 한 칸 더 가요.",
    },
    { input: 'commands = "LLGG"', output: "[0, -2]", explain: "두 번 왼쪽으로 돌면 남쪽이에요." },
  ],
  constraints: [
    "1 ≤ commands.length ≤ 10,000",
    "commands 는 `G`, `L`, `R` 로만 이루어져요.",
  ],
  entry: { javascript: "robotSimulation", python: "robot_simulation" },
  starter: {
    javascript: `/**
 * @param {string} commands G(전진) L(좌회전) R(우회전)
 * @return {number[]} 마지막 위치 [x, y]
 */
function robotSimulation(commands) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def robot_simulation(commands):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: ["GG"], expected: [0, 2] },
    { input: ["GRG"], expected: [1, 1] },
    { input: ["LLGG"], expected: [0, -2] },
    { input: ["G"], expected: [0, 1] },
    { input: ["LR"], expected: [0, 0] },
    { input: ["GLGLGLG"], expected: [0, 0] },
    { input: ["RRGG"], expected: [0, -2], hidden: true },
    { input: ["GRGRGRGR"], expected: [0, 0], hidden: true },
    { input: ["LLLLG"], expected: [0, 1], hidden: true },
  ],
  hint: "방향을 델타 배열로 들고 인덱스만 돌려요. `[[0, 1], [1, 0], [0, -1], [-1, 0]]` 을 북·동·남·서 순으로 두면 우회전은 `+1`, 좌회전은 `+3` (또는 `-1`) 이고, 둘 다 `% 4` 로 감싸요. 좌회전을 `-1` 로 쓸 때 자바스크립트의 `%` 는 음수를 그대로 두니 `(d + 3) % 4` 가 안전해요.",
  solution: {
    javascript: `function robotSimulation(commands) {
  const delta = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let dir = 0;
  let x = 0;
  let y = 0;
  for (const c of commands) {
    if (c === "R") dir = (dir + 1) % 4;
    else if (c === "L") dir = (dir + 3) % 4;
    else {
      x += delta[dir][0];
      y += delta[dir][1];
    }
  }
  return [x, y];
}
`,
    python: `def robot_simulation(commands):
    delta = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    d = 0
    x = y = 0
    for c in commands:
        if c == "R":
            d = (d + 1) % 4
        elif c == "L":
            d = (d + 3) % 4
        else:
            dx, dy = delta[d]
            x += dx
            y += dy
    return [x, y]
`,
  },
};
