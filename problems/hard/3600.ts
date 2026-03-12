/*
3600. Maximize Spanning Tree Stability with Upgrades

You are given an integer n, representing n nodes numbered from 0 to n - 1 and a list of edges, where edges[i] = [ui, vi, si, musti]:
ui and vi indicates an undirected edge between nodes ui and vi.
si is the strength of the edge.
musti is an integer (0 or 1). If musti == 1, the edge must be included in the spanning tree. These edges cannot be upgraded.
You are also given an integer k, the maximum number of upgrades you can perform. Each upgrade doubles the strength of an edge, and each eligible edge (with musti == 0) can be upgraded at most once.
The stability of a spanning tree is defined as the minimum strength score among all edges included in it.
Return the maximum possible stability of any valid spanning tree. If it is impossible to connect all nodes, return -1.

Note: A spanning tree of a graph with n nodes is a subset of the edges that connects all nodes together (i.e. the graph is connected) without forming any cycles, and uses exactly n - 1 edges.

Example 1:
Input: n = 3, edges = [[0,1,2,1],[1,2,3,0]], k = 1
Output: 2
Explanation:
Edge [0,1] with strength = 2 must be included in the spanning tree.
Edge [1,2] is optional and can be upgraded from 3 to 6 using one upgrade.
The resulting spanning tree includes these two edges with strengths 2 and 6.
The minimum strength in the spanning tree is 2, which is the maximum possible stability.

Example 2:
Input: n = 3, edges = [[0,1,4,0],[1,2,3,0],[0,2,1,0]], k = 2
Output: 6
Explanation:
Since all edges are optional and up to k = 2 upgrades are allowed.
Upgrade edges [0,1] from 4 to 8 and [1,2] from 3 to 6.
The resulting spanning tree includes these two edges with strengths 8 and 6.
The minimum strength in the tree is 6, which is the maximum possible stability.

Example 3:
Input: n = 3, edges = [[0,1,1,1],[1,2,1,1],[2,0,1,1]], k = 0
Output: -1
Explanation:
All edges are mandatory and form a cycle, which violates the spanning tree property of acyclicity. Thus, the answer is -1.

Constraints:
2 <= n <= 10^5
1 <= edges.length <= 10^5
edges[i] = [ui, vi, si, musti]
0 <= ui, vi < n
ui != vi
1 <= si <= 10^5
musti is either 0 or 1.
0 <= k <= n
There are no duplicate edges.

</> Typescript code:
*/

function maxStability(n: number, edges: number[][], k: number): number {
  // Separate mandatory edges (musti === 1) from optional ones (musti === 0)
  const mandatory = edges.filter((e) => e[3] === 1);
  const optional = edges.filter((e) => e[3] === 0);

  // Shared parent array for Union-Find (DSU) operations
  const parent = new Int32Array(n);
  // Optimized Find operation with path compression (iterative for performance)
  const find = (i: number): number => {
    while (parent[i] !== i) {
      parent[i] = parent[parent[i]]; // Path halving
      i = parent[i];
    }
    return i;
  };

  // Initial check: Mandatory edges must not form a cycle and must be part of a tree
  const checkMandatory = (): [boolean, number] => {
    for (let i = 0; i < n; i++) parent[i] = i;
    let count = 0;
    for (const [u, v] of mandatory) {
      const rootU = find(u);
      const rootV = find(v);
      if (rootU === rootV) return [true, 0]; // Cycle detected in mandatory edges
      parent[rootU] = rootV;
      count++;
    }
    return [false, count]; // Returns [hasCycle, number of edges used]
  };

  const [hasCycle, mandCount] = checkMandatory();
  // If mandatory edges are invalid (cycle) or exceed n-1, return -1
  if (hasCycle || mandCount >= n) return -1;

  // Binary search validation: Can we build a spanning tree where all edges >= limit?
  const check = (limit: number): boolean => {
    for (let i = 0; i < n; i++) parent[i] = i;
    let edgesUsed = 0;
    let upgradesUsed = 0;

    // Step 1: Add all mandatory edges. They must all satisfy the stability limit.
    for (const [u, v, s] of mandatory) {
      if (s < limit) return false;
      const rootU = find(u);
      const rootV = find(v);
      parent[rootU] = rootV;
      edgesUsed++;
    }

    // Step 2: Add optional edges that satisfy the limit WITHOUT needing an upgrade.
    for (const [u, v, s] of optional) {
      if (s >= limit) {
        const rootU = find(u);
        const rootV = find(v);
        if (rootU !== rootV) {
          parent[rootU] = rootV;
          edgesUsed++;
        }
      }
    }

    // Step 3: Add optional edges that satisfy the limit ONLY IF upgraded.
    for (const [u, v, s] of optional) {
      // Only consider if original < limit but 2x >= limit, and upgrades remain
      if (s < limit && s * 2 >= limit && upgradesUsed < k) {
        const rootU = find(u);
        const rootV = find(v);
        if (rootU !== rootV) {
          parent[rootU] = rootV;
          edgesUsed++;
          upgradesUsed++;
        }
      }
    }

    // Spanning tree is valid only if it connects all n nodes (n-1 edges)
    return edgesUsed === n - 1;
  };

  // Range for stability: 1 to max possible upgraded strength (10^5 * 2)
  let low = 1,
    high = 200000,
    ans = -1;
  while (low <= high) {
    let mid = (low + high) >>> 1; // Bitwise right shift for fast floor division
    if (check(mid)) {
      ans = mid; // Current limit is possible, try higher
      low = mid + 1;
    } else {
      high = mid - 1; // Current limit is too high
    }
  }

  return ans;
}
