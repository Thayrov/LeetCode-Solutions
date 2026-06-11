/*
3558. Number of Ways to Assign Edge Weights I

Hint
There is an undirected tree with n nodes labeled from 1 to n, rooted at node 1. The tree is represented by a 2D integer array edges of length n - 1, where edges[i] = [ui, vi] indicates that there is an edge between nodes ui and vi.
Initially, all edges have a weight of 0. You must assign each edge a weight of either 1 or 2.
The cost of a path between any two nodes u and v is the total weight of all edges in the path connecting them.
Select any one node x at the maximum depth. Return the number of ways to assign edge weights in the path from node 1 to x such that its total cost is odd.
Since the answer may be large, return it modulo 109 + 7.

Note: Ignore all edges not in the path from node 1 to x.

Example 1:
Input: edges = [[1,2]]
Output: 1
Explanation:
The path from Node 1 to Node 2 consists of one edge (1 → 2).
Assigning weight 1 makes the cost odd, while 2 makes it even. Thus, the number of valid assignments is 1.

Example 2:
Input: edges = [[1,2],[1,3],[3,4],[3,5]]
Output: 2
Explanation:
The maximum depth is 2, with nodes 4 and 5 at the same depth. Either node can be selected for processing.
For example, the path from Node 1 to Node 4 consists of two edges (1 → 3 and 3 → 4).
Assigning weights (1,2) or (2,1) results in an odd cost. Thus, the number of valid assignments is 2.

Constraints:
2 <= n <= 10^5
edges.length == n - 1
edges[i] == [ui, vi]
1 <= ui, vi <= n
edges represents a valid tree.

</> Typescript code:
*/

function assignEdgeWeights(edges: number[][]): number {
  // Modulo required by the problem.
  const MOD = 1000000007n;

  // Tree has edges.length + 1 nodes.
  const n = edges.length + 1;

  // Adjacency list for 1-indexed nodes.
  const g: number[][] = Array.from({ length: n + 1 }, () => []);

  // Build undirected graph.
  for (const [u, v] of edges) {
    // Add v as neighbor of u.
    g[u].push(v);

    // Add u as neighbor of v.
    g[v].push(u);
  }

  // Stack stores current node, parent node, and depth from root.
  const stack: [number, number, number][] = [[1, 0, 0]];

  // Deepest distance from node 1.
  let maxDepth = 0;

  // Iterative DFS avoids recursion depth overflow.
  while (stack.length) {
    // Read one DFS state.
    const [u, p, d] = stack.pop()!;

    // Track maximum root-to-node depth.
    if (d > maxDepth) maxDepth = d;

    // Visit children.
    for (const v of g[u]) {
      // Avoid going back to parent.
      if (v !== p) stack.push([v, u, d + 1]);
    }
  }

  // For path length d, exactly half of 2^d assignments have odd sum: 2^(d - 1).
  let ans = 1n;

  // Compute 2^(maxDepth - 1) modulo MOD.
  for (let i = 1; i < maxDepth; i++) ans = (ans * 2n) % MOD;

  // Convert bigint result to number.
  return Number(ans);
}
