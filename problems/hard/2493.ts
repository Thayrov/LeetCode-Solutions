/* 
2493. Divide Nodes Into the Maximum Number of Groups

You are given a positive integer n representing the number of nodes in an undirected graph. The nodes are labeled from 1 to n.

You are also given a 2D integer array edges, where edges[i] = [ai, bi] indicates that there is a bidirectional edge between nodes ai and bi. Notice that the given graph may be disconnected.

Divide the nodes of the graph into m groups (1-indexed) such that:

Each node in the graph belongs to exactly one group.
For every pair of nodes in the graph that are connected by an edge [ai, bi], if ai belongs to the group with index x, and bi belongs to the group with index y, then |y - x| = 1.
Return the maximum number of groups (i.e., maximum m) into which you can divide the nodes. Return -1 if it is impossible to group the nodes with the given conditions.

Example 1:
Input: n = 6, edges = [[1,2],[1,4],[1,5],[2,6],[2,3],[4,6]]
Output: 4
Explanation: As shown in the image we:
- Add node 5 to the first group.
- Add node 1 to the second group.
- Add nodes 2 and 4 to the third group.
- Add nodes 3 and 6 to the fourth group.
We can see that every edge is satisfied.
It can be shown that that if we create a fifth group and move any node from the third or fourth group to it, at least on of the edges will not be satisfied.

Example 2:
Input: n = 3, edges = [[1,2],[2,3],[3,1]]
Output: -1
Explanation: If we add node 1 to the first group, node 2 to the second group, and node 3 to the third group to satisfy the first two edges, we can see that the third edge will not be satisfied.
It can be shown that no grouping is possible.

Constraints:
1 <= n <= 500
1 <= edges.length <= 10^4
edges[i].length == 2
1 <= ai, bi <= n
ai != bi
There is at most one edge between any pair of vertices.

</> Typescript Code:
*/

function magnificentSets(n: number, edges: number[][]): number {
  // 1) Build adjacency list from 1..n
  const adj: number[][] = Array.from({length: n + 1}, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  // Arrays to track visited status and bipartite coloring
  const visited: boolean[] = Array(n + 1).fill(false);
  // color[node] = 0 (uncolored), or 1 / -1 for bipartite sets
  const color: number[] = Array(n + 1).fill(0);

  // Will hold arrays of nodes for each connected component
  const components: number[][] = [];

  // 2) Identify connected components and check bipartite
  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      // Standard BFS to gather all nodes in this component
      const queue = [i];
      visited[i] = true;
      color[i] = 1; // start with color 1
      const compNodes = [i]; // record nodes in this component

      for (let idx = 0; idx < queue.length; idx++) {
        const node = queue[idx];
        for (const nei of adj[node]) {
          if (!visited[nei]) {
            visited[nei] = true;
            // Assign opposite color to maintain bipartite property
            color[nei] = -color[node];
            queue.push(nei);
            compNodes.push(nei);
          } else {
            // If already visited but has the same color => not bipartite
            if (color[nei] === color[node]) {
              return -1; // Return early for conflict
            }
          }
        }
      }
      // Store nodes from this connected component
      components.push(compNodes);
    }
  }

  // 3) BFS-layers function restricted to the given component
  const getBFSLayering = (start: number, inComp: Set<number>): number => {
    // -1 distance means unvisited in the BFS layering
    const dist = Array(n + 1).fill(-1);
    dist[start] = 0; // distance to itself is 0
    const queue = [start];
    let maxDepth = 0;

    // Expand BFS from 'start', but only among nodes in 'inComp'
    for (let idx = 0; idx < queue.length; idx++) {
      const cur = queue[idx];
      for (const nei of adj[cur]) {
        // Only proceed if 'nei' is in the same component and unvisited
        if (inComp.has(nei) && dist[nei] === -1) {
          dist[nei] = dist[cur] + 1; // Set BFS distance
          if (dist[nei] > maxDepth) {
            maxDepth = dist[nei]; // Track the furthest layer
          }
          queue.push(nei);
        }
      }
    }
    // BFS layering is distance + 1, e.g., distance 0 => layer 1
    return maxDepth + 1;
  };

  // 4) For each bipartite component, find the maximum BFS layering from any node
  let ans = 0;
  for (const compNodes of components) {
    // Put the component's nodes in a quick Set for adjacency checks
    const compSet = new Set<number>(compNodes);

    // We'll try BFS from each node in the component
    let bestLayering = 0;
    for (const node of compNodes) {
      const layering = getBFSLayering(node, compSet);
      if (layering > bestLayering) {
        bestLayering = layering;
      }
    }
    // Accumulate the maximum layering for this component
    ans += bestLayering;
  }

  // If all components are bipartite, return the sum of their max BFS layerings
  return ans;
}
