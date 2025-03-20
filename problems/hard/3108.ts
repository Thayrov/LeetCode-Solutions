/* 
3108. Minimum Cost Walk in Weighted Graph

There is an undirected weighted graph with n vertices labeled from 0 to n - 1.

You are given the integer n and an array edges, where edges[i] = [ui, vi, wi] indicates that there is an edge between vertices ui and vi with a weight of wi.

A walk on a graph is a sequence of vertices and edges. The walk starts and ends with a vertex, and each edge connects the vertex that comes before it and the vertex that comes after it. It's important to note that a walk may visit the same edge or vertex more than once.

The cost of a walk starting at node u and ending at node v is defined as the bitwise AND of the weights of the edges traversed during the walk. In other words, if the sequence of edge weights encountered during the walk is w0, w1, w2, ..., wk, then the cost is calculated as w0 & w1 & w2 & ... & wk, where & denotes the bitwise AND operator.

You are also given a 2D array query, where query[i] = [si, ti]. For each query, you need to find the minimum cost of the walk starting at vertex si and ending at vertex ti. If there exists no such walk, the answer is -1.

Return the array answer, where answer[i] denotes the minimum cost of a walk for query i.

Example 1:
Input: n = 5, edges = [[0,1,7],[1,3,7],[1,2,1]], query = [[0,3],[3,4]]
Output: [1,-1]
Explanation:
To achieve the cost of 1 in the first query, we need to move on the following edges: 0->1 (weight 7), 1->2 (weight 1), 2->1 (weight 1), 1->3 (weight 7).
In the second query, there is no walk between nodes 3 and 4, so the answer is -1.

Example 2:
Input: n = 3, edges = [[0,2,7],[0,1,15],[1,2,6],[1,2,1]], query = [[1,2]]
Output: [0]
Explanation:
To achieve the cost of 0 in the first query, we need to move on the following edges: 1->2 (weight 1), 2->1 (weight 6), 1->2 (weight 1).

Constraints:
2 <= n <= 10^5
0 <= edges.length <= 10^5
edges[i].length == 3
0 <= ui, vi <= n - 1
ui != vi
0 <= wi <= 10^5
1 <= query.length <= 10^5
query[i].length == 2
0 <= si, ti <= n - 1
si != ti

</> Typescript code:
*/

function minimumCost(
  n: number,
  edges: number[][],
  query: number[][]
): number[] {
  // Initialize parent array for DSU using Uint32Array for memory efficiency
  const parent = new Uint32Array(n);
  // Initialize cost array with -1 (all bits set) as neutral element for AND
  const cost = new Uint32Array(n).fill(-1);
  // Set each node as its own parent initially
  for (let i = 0; i < n; i++) parent[i] = i;

  // Find function with path compression for O(α(n)) amortized time
  const find = (x: number): number => {
    // If node is its own parent, return it
    // Otherwise recursively find parent and update current node's parent
    return parent[x] === x ? x : (parent[x] = find(parent[x]));
  };

  // Union function that merges components and updates costs
  const union = (x: number, y: number, w: number) => {
    // Find roots of both nodes
    const px = find(x),
      py = find(y);
    // If already in same component, update cost with new edge weight
    if (px === py) {
      cost[px] &= w; // Bitwise AND with existing cost
      return;
    }
    // Merge components by setting py's parent to px
    parent[py] = px;
    // New component cost is AND of both components' costs and new edge weight
    cost[px] = cost[px] & cost[py] & w;
  };

  // Process all edges to build connected components
  for (const [u, v, w] of edges) union(u, v, w);

  // Initialize result array with Int32Array for proper -1 representation
  const res = new Int32Array(query.length);
  // Process each query
  for (let i = 0; i < query.length; i++) {
    const [s, t] = query[i];
    // If nodes are in same component, return cost, otherwise -1
    res[i] = find(s) === find(t) ? cost[find(s)] : -1;
  }

  // Return result array (type assertion needed due to TS limitations)
  return res as any;
}
