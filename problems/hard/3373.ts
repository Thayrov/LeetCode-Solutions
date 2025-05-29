/*
3373. Maximize the Number of Target Nodes After Connecting Trees II

There exist two undirected trees with n and m nodes, labeled from [0, n - 1] and [0, m - 1], respectively.
You are given two 2D integer arrays edges1 and edges2 of lengths n - 1 and m - 1, respectively, where edges1[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the first tree and edges2[i] = [ui, vi] indicates that there is an edge between nodes ui and vi in the second tree.
Node u is target to node v if the number of edges on the path from u to v is even. Note that a node is always target to itself.
Return an array of n integers answer, where answer[i] is the maximum possible number of nodes that are target to node i of the first tree if you had to connect one node from the first tree to another node in the second tree.
Note that queries are independent from each other. That is, for every query you will remove the added edge before proceeding to the next query.

Example 1:
Input: edges1 = [[0,1],[0,2],[2,3],[2,4]], edges2 = [[0,1],[0,2],[0,3],[2,7],[1,4],[4,5],[4,6]]
Output: [8,7,7,8,8]
Explanation:
For i = 0, connect node 0 from the first tree to node 0 from the second tree.
For i = 1, connect node 1 from the first tree to node 4 from the second tree.
For i = 2, connect node 2 from the first tree to node 7 from the second tree.
For i = 3, connect node 3 from the first tree to node 0 from the second tree.
For i = 4, connect node 4 from the first tree to node 4 from the second tree.

Example 2:
Input: edges1 = [[0,1],[0,2],[0,3],[0,4]], edges2 = [[0,1],[1,2],[2,3]]
Output: [3,6,6,6,6]
Explanation:
For every i, connect node i of the first tree with any node of the second tree.

Constraints:
2 <= n, m <= 10^5
edges1.length == n - 1
edges2.length == m - 1
edges1[i].length == edges2[i].length == 2
edges1[i] = [ai, bi]
0 <= ai, bi < n
edges2[i] = [ui, vi]
0 <= ui, vi < m
The input is generated such that edges1 and edges2 represent valid trees.

</> Typescript code:
*/

function maxTargetNodes(edges1: number[][], edges2: number[][]): number[] {
  const n = edges1.length + 1; // Number of nodes in tree1
  const m = edges2.length + 1; // Number of nodes in tree2

  // Build adjacency list representation of tree
  const buildGraph = (edges: number[][]): number[][] => {
    const graph: number[][] = Array(edges.length + 1)
      .fill(null)
      .map(() => []);
    for (const [u, v] of edges) {
      graph[u].push(v); // Add undirected edge
      graph[v].push(u);
    }
    return graph;
  };

  // Color nodes based on distance parity from root (0=even, 1=odd distance)
  const getColors = (graph: number[][], root: number): number[] => {
    const color = new Array(graph.length).fill(-1);

    const dfs = (node: number, c: number) => {
      color[node] = c; // Assign color (0 for even distance, 1 for odd)
      for (const neighbor of graph[node]) {
        if (color[neighbor] === -1) {
          dfs(neighbor, 1 - c); // Alternate color for neighbor
        }
      }
    };

    dfs(root, 0); // Start coloring from root with color 0
    return color;
  };

  // Build graphs for both trees
  const graph1 = buildGraph(edges1);
  const graph2 = buildGraph(edges2);

  // Get bipartition coloring for both trees (using node 0 as root)
  const colors1 = getColors(graph1, 0);
  const colors2 = getColors(graph2, 0);

  // Count nodes at even/odd distances from root in tree1
  const even1 = colors1.filter((c) => c === 0).length; // Nodes at even distance
  const odd1 = n - even1; // Nodes at odd distance

  // Count nodes at even/odd distances from root in tree2
  const even2 = colors2.filter((c) => c === 0).length; // Nodes at even distance
  const odd2 = m - even2; // Nodes at odd distance

  // Maximum contribution we can get from tree2 by choosing optimal connection
  // We can always achieve max(even2, odd2) additional targets
  const maxTree2 = Math.max(even2, odd2);

  const result: number[] = [];

  // For each node i in tree1, calculate maximum targets
  for (let i = 0; i < n; i++) {
    // Key insight: if node i has color c, then nodes with color c are at even distance from i
    // So targets from tree1 = count of nodes with same color as i
    const evenTargets = colors1[i] === 0 ? even1 : odd1;

    // Total targets = targets in tree1 + optimal targets from tree2
    result.push(evenTargets + maxTree2);
  }

  return result;
}
