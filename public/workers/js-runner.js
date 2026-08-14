/**
 * JavaScript grader. Runs untrusted user code inside a worker so an infinite
 * loop only wedges this thread — the page stays responsive and can terminate us.
 *
 * Protocol
 *   in : { code, entry, tests: [{ input: unknown[] }], argShapes?, returnShape? }
 *   out: { type: "progress", index }
 *        { type: "done", results: TestOutcome[] }
 *        { type: "fatal", message }
 *
 * TestOutcome: { ok, json?, undef?, error?, stdout, ms }
 * `json` is the returned value serialized to JSON so the main thread compares
 * JS and Python answers in exactly the same domain.
 */
"use strict";

const MAX_LOG_LINES = 100;
const MAX_LOG_CHARS = 4000;

function inspect(value, depth) {
  const level = depth || 0;
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  const t = typeof value;
  if (t === "string") return level === 0 ? value : JSON.stringify(value);
  if (t === "number" || t === "boolean" || t === "bigint") return String(value);
  if (t === "function") return `[Function: ${value.name || "anonymous"}]`;
  if (t === "symbol") return String(value);
  if (level > 4) return "…";
  if (Array.isArray(value)) {
    return `[${value.map((v) => inspect(v, level + 1)).join(", ")}]`;
  }
  if (value instanceof Set) {
    return `Set(${value.size}) {${[...value].map((v) => inspect(v, level + 1)).join(", ")}}`;
  }
  if (value instanceof Map) {
    const body = [...value]
      .map(([k, v]) => `${inspect(k, level + 1)} => ${inspect(v, level + 1)}`)
      .join(", ");
    return `Map(${value.size}) {${body}}`;
  }
  if (value instanceof Error) return `${value.name}: ${value.message}`;
  try {
    const body = Object.entries(value)
      .map(([k, v]) => `${k}: ${inspect(v, level + 1)}`)
      .join(", ");
    return `{ ${body} }`;
  } catch {
    return String(value);
  }
}

/** Serialize a result value, keeping non-JSON values legible instead of dropping them. */
function toJson(value) {
  return JSON.stringify(value, (_key, v) => {
    if (typeof v === "number" && !Number.isFinite(v)) return String(v);
    if (typeof v === "bigint") return String(v);
    if (typeof v === "function") return `[Function: ${v.name || "anonymous"}]`;
    if (v instanceof Set) return [...v];
    if (v instanceof Map) return Object.fromEntries(v);
    return v;
  });
}

function clone(value) {
  try {
    return structuredClone(value);
  } catch {
    return JSON.parse(JSON.stringify(value));
  }
}

/* ------------------------------ shaped values ------------------------------ */

/**
 * Test cases travel as plain JSON so one case can drive both graders. Values a
 * solution wants as real objects are declared per problem through `argShapes` /
 * `returnShape` and converted here — arguments on the way in, the return value
 * on the way out. See src/lib/types.ts for the encoding.
 */
class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/**
 * Published as a global rather than injected into the compiled source: a
 * submission that declares its own `TreeNode` then merely shadows this one
 * inside its function scope, where prepending a declaration would instead be a
 * redeclaration SyntaxError. The grader keeps using the class captured here.
 */
self.TreeNode = TreeNode;

/** Guards against a returned tree that links back to itself. */
const MAX_TREE_NODES = 200000;

function buildTree(values) {
  if (!Array.isArray(values) || values.length === 0 || values[0] === null) {
    return null;
  }
  const root = new TreeNode(values[0]);
  const queue = [root];
  let head = 0;
  let i = 1;
  while (head < queue.length && i < values.length) {
    const node = queue[head++];
    if (i < values.length) {
      const left = values[i++];
      if (left !== null) {
        node.left = new TreeNode(left);
        queue.push(node.left);
      }
    }
    if (i < values.length) {
      const right = values[i++];
      if (right !== null) {
        node.right = new TreeNode(right);
        queue.push(node.right);
      }
    }
  }
  return root;
}

function treeToArray(root) {
  const out = [];
  if (root === null || root === undefined) return out;
  const queue = [root];
  let head = 0;
  while (head < queue.length) {
    const node = queue[head++];
    if (node === null || node === undefined) {
      out.push(null);
      continue;
    }
    if (out.length > MAX_TREE_NODES) {
      throw new Error("반환한 트리가 너무 큽니다. 순환 참조가 있는지 확인하세요.");
    }
    out.push(node.val);
    queue.push(node.left === undefined ? null : node.left);
    queue.push(node.right === undefined ? null : node.right);
  }
  while (out.length > 0 && out[out.length - 1] === null) out.pop();
  return out;
}

function reviveArg(value, shape) {
  return shape === "tree" ? buildTree(value) : value;
}

function serializeReturn(value, shape) {
  return shape === "tree" ? treeToArray(value) : value;
}

const logs = [];
let logChars = 0;

function capture(args) {
  if (logs.length >= MAX_LOG_LINES) return;
  if (logs.length === MAX_LOG_LINES - 1) {
    logs.push("… 출력이 너무 많아 이후 로그는 생략했습니다.");
    return;
  }
  const line = args.map((a) => inspect(a, 0)).join(" ");
  logChars += line.length;
  if (logChars > MAX_LOG_CHARS) {
    logs.push("… 출력이 너무 길어 이후 로그는 생략했습니다.");
    logChars = Infinity;
    return;
  }
  logs.push(line);
}

const patched = {
  log: (...a) => capture(a),
  info: (...a) => capture(a),
  warn: (...a) => capture(a),
  error: (...a) => capture(a),
  debug: (...a) => capture(a),
};
self.console = Object.assign({}, self.console, patched);

/**
 * Only the message is reported. User code is compiled through `new Function`,
 * so every frame in the stack is offset by the wrapper and points at the wrong
 * line — a misleading line number is worse than none. (Python keeps its real
 * traceback because that harness compiles against a genuine "solution.py".)
 */
function formatError(err) {
  if (err instanceof Error) {
    return err.message ? `${err.name}: ${err.message}` : err.name;
  }
  return String(err);
}

self.onmessage = async (event) => {
  const { code, entry, tests, argShapes, returnShape } = event.data;
  const shapes = Array.isArray(argShapes) ? argShapes : [];

  let fn;
  try {
    const factory = new Function(
      `"use strict";\n${code}\n;return typeof ${entry} === "function" ? ${entry} : null;`,
    );
    fn = factory();
  } catch (err) {
    self.postMessage({
      type: "fatal",
      message: `코드를 실행할 수 없습니다.\n${formatError(err)}`,
    });
    return;
  }

  if (typeof fn !== "function") {
    self.postMessage({
      type: "fatal",
      message: `\`${entry}\` 함수를 찾을 수 없습니다. 함수 이름을 그대로 두었는지 확인하세요.`,
    });
    return;
  }

  const results = [];
  for (let i = 0; i < tests.length; i++) {
    logs.length = 0;
    logChars = 0;
    const args = tests[i].input.map((value, k) =>
      reviveArg(clone(value), shapes[k]),
    );
    const started = performance.now();
    try {
      const returned = await fn(...args);
      const ms = performance.now() - started;
      // Tested before serializing: an empty tree is a legitimate `null`, but a
      // stub that never returns leaves `undefined`, and shaping would erase the
      // difference by turning both into [].
      if (returned === undefined) {
        results.push({ ok: true, undef: true, stdout: logs.join("\n"), ms });
      } else {
        results.push({
          ok: true,
          json: toJson(serializeReturn(returned, returnShape)),
          stdout: logs.join("\n"),
          ms,
        });
      }
    } catch (err) {
      results.push({
        ok: false,
        error: formatError(err),
        stdout: logs.join("\n"),
        ms: performance.now() - started,
      });
    }
    self.postMessage({ type: "progress", index: i });
  }

  self.postMessage({ type: "done", results });
};
