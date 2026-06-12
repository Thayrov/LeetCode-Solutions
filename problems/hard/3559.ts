/*
3559. Number of Ways to Assign Edge Weights II

Hint
There is an undirected tree with n nodes labeled from 1 to n, rooted at node 1. The tree is represented by a 2D integer array edges of length n - 1, where edges[i] = [ui, vi] indicates that there is an edge between nodes ui and vi.
Initially, all edges have a weight of 0. You must assign each edge a weight of either 1 or 2.
The cost of a path between any two nodes u and v is the total weight of all edges in the path connecting them.
You are given a 2D integer array queries. For each queries[i] = [ui, vi], determine the number of ways to assign weights to edges in the path such that the cost of the path between ui and vi is odd.
Return an array answer, where answer[i] is the number of valid assignments for queries[i].
Since the answer may be large, apply modulo 109 + 7 to each answer[i].

Note: For each query, disregard all edges not in the path between node ui and vi.

Example 1:
Input: edges = [[1,2]], queries = [[1,1],[1,2]]
Output: [0,1]
Explanation:
Query [1,1]: The path from Node 1 to itself consists of no edges, so the cost is 0. Thus, the number of valid assignments is 0.
Query [1,2]: The path from Node 1 to Node 2 consists of one edge (1 → 2). Assigning weight 1 makes the cost odd, while 2 makes it even. Thus, the number of valid assignments is 1.

Example 2:
Input: edges = [[1,2],[1,3],[3,4],[3,5]], queries = [[1,4],[3,4],[2,5]]
Output: [2,1,4]
Explanation:
Query [1,4]: The path from Node 1 to Node 4 consists of two edges (1 → 3 and 3 → 4). Assigning weights (1,2) or (2,1) results in an odd cost. Thus, the number of valid assignments is 2.
Query [3,4]: The path from Node 3 to Node 4 consists of one edge (3 → 4). Assigning weight 1 makes the cost odd, while 2 makes it even. Thus, the number of valid assignments is 1.
Query [2,5]: The path from Node 2 to Node 5 consists of three edges (2 → 1, 1 → 3, and 3 → 5). Assigning (1,2,2), (2,1,2), (2,2,1), or (1,1,1) makes the cost odd. Thus, the number of valid assignments is 4.

Constraints:
2 <= n <= 10^5
edges.length == n - 1
edges[i] == [ui, vi]
1 <= queries.length <= 10^5
queries[i] == [ui, vi]
1 <= ui, vi <= n
edges represents a valid tree.

</> Typescript code:
*/

function assignEdgeWeights(edges: number[][], queries: number[][]): number[] {
  // Stores the modulo required by the problem.
  const MOD = 1000000007;

  // Number of nodes in the tree.
  const n = edges.length + 1;

  // Number of binary-lifting levels needed to jump up to n ancestors.
  const LOG = Math.ceil(Math.log2(n)) + 1;

  // Builds adjacency list for the undirected tree.
  const g: number[][] = Array.from({ length: n + 1 }, () => []);

  // Adds every undirected edge to the adjacency list.
  for (const [u, v] of edges) {
    // Adds v as neighbor of u.
    g[u].push(v);

    // Adds u as neighbor of v.
    g[v].push(u);
  }

  // up[j][i] stores the 2^j-th ancestor of node i.
  const up: number[][] = Array.from({ length: LOG }, () =>
    Array(n + 1).fill(0),
  );

  // depth[i] stores distance in edges from root 1 to node i.
  const depth = Array(n + 1).fill(0);

  // Iterative DFS stack, starting from root node 1.
  const stack = [1];

  // Root has no parent.
  up[0][1] = 0;

  // Traverses tree iteratively to avoid recursion stack overflow.
  for (let i = 0; i < stack.length; i++) {
    // Current node.
    const u = stack[i];

    // Visits all neighbors.
    for (const v of g[u]) {
      // Skips the parent edge.
      if (v === up[0][u]) continue;

      // Stores direct parent of child.
      up[0][v] = u;

      // Stores child depth.
      depth[v] = depth[u] + 1;

      // Pushes child for later traversal.
      stack.push(v);
    }
  }

  // Builds the full binary-lifting table.
  for (let j = 1; j < LOG; j++) {
    // Computes 2^j-th ancestor for every node.
    for (let i = 1; i <= n; i++) {
      // 2^j ancestor = 2^(j-1) ancestor of the 2^(j-1) ancestor.
      up[j][i] = up[j - 1][up[j - 1][i]];
    }
  }

  // pow2[i] stores 2^i modulo MOD.
  const pow2 = Array(n + 1).fill(1);

  // Precomputes powers of 2 up to n.
  for (let i = 1; i <= n; i++) {
    // Doubles previous power under modulo.
    pow2[i] = (pow2[i - 1] * 2) % MOD;
  }

  // Finds lowest common ancestor of nodes a and b.
  const lca = (a: number, b: number): number => {
    // Ensures a is at least as deep as b.
    if (depth[a] < depth[b]) [a, b] = [b, a];

    // Difference in depths.
    let diff = depth[a] - depth[b];

    // Lifts a until both nodes have same depth.
    for (let j = 0; diff; j++, diff >>= 1) {
      // If this bit is set, jump a upward by 2^j.
      if (diff & 1) a = up[j][a];
    }

    // If b was ancestor of a, return it.
    if (a === b) return a;

    // Lifts both nodes while keeping them below their LCA.
    for (let j = LOG - 1; j >= 0; j--) {
      // If ancestors differ, both nodes can jump upward.
      if (up[j][a] !== up[j][b]) {
        // Jumps a upward.
        a = up[j][a];

        // Jumps b upward.
        b = up[j][b];
      }
    }

    // Parent of both final nodes is the LCA.
    return up[0][a];
  };

  // Answers every query independently.
  return queries.map(([u, v]) => {
    // Lowest common ancestor of query endpoints.
    const w = lca(u, v);

    // Path length in edges between u and v.
    const len = depth[u] + depth[v] - 2 * depth[w];

    // No edges means sum is 0, never odd; otherwise half of all 2^len assignments are odd.
    return len === 0 ? 0 : pow2[len - 1];
  });
}
