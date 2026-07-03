/*
3620. Network Recovery Pathways

Hint
You are given a directed acyclic graph of n nodes numbered from 0 to n − 1. This is represented by a 2D array edges of length m, where edges[i] = [ui, vi, costi] indicates a one‑way communication from node ui to node vi with a recovery cost of costi.
Some nodes may be offline. You are given a boolean array online where online[i] = true means node i is online. Nodes 0 and n − 1 are always online.
A path from 0 to n − 1 is valid if:
All intermediate nodes on the path are online.
The total recovery cost of all edges on the path does not exceed k.
For each valid path, define its score as the minimum edge‑cost along that path.
Return the maximum path score (i.e., the largest minimum-edge cost) among all valid paths. If no valid path exists, return -1.

Example 1:
Input: edges = [[0,1,5],[1,3,10],[0,2,3],[2,3,4]], online = [true,true,true,true], k = 10
Output: 3
Explanation:
The graph has two possible routes from node 0 to node 3:
Path 0 → 1 → 3
Total cost = 5 + 10 = 15, which exceeds k (15 > 10), so this path is invalid.
Path 0 → 2 → 3
Total cost = 3 + 4 = 7 <= k, so this path is valid.
The minimum edge‐cost along this path is min(3, 4) = 3.
There are no other valid paths. Hence, the maximum among all valid path‐scores is 3.

Example 2:
Input: edges = [[0,1,7],[1,4,5],[0,2,6],[2,3,6],[3,4,2],[2,4,6]], online = [true,true,true,false,true], k = 12
Output: 6
Explanation:
Node 3 is offline, so any path passing through 3 is invalid.
Consider the remaining routes from 0 to 4:
Path 0 → 1 → 4
Total cost = 7 + 5 = 12 <= k, so this path is valid.
The minimum edge‐cost along this path is min(7, 5) = 5.
Path 0 → 2 → 3 → 4
Node 3 is offline, so this path is invalid regardless of cost.
Path 0 → 2 → 4
Total cost = 6 + 6 = 12 <= k, so this path is valid.
The minimum edge‐cost along this path is min(6, 6) = 6.
Among the two valid paths, their scores are 5 and 6. Therefore, the answer is 6.

Constraints:
n == online.length
2 <= n <= 5 * 10^4
0 <= m == edges.length <= min(10^5, n * (n - 1) / 2)
edges[i] = [ui, vi, costi]
0 <= ui, vi < n
ui != vi
0 <= costi <= 10^9
0 <= k <= 5 * 10^13
online[i] is either true or false, and both online[0] and online[n − 1] are true.
The given graph is a directed acyclic graph.

</> Typescript code:
*/

function findMaxPathScore(
  edges: number[][],
  online: boolean[],
  k: number,
): number {
  // Store the number of nodes.
  const n = online.length;

  // Build adjacency list where each item is [nextNode, edgeCost].
  const graph: [number, number][][] = Array.from({ length: n }, () => []);

  // Store indegrees for Kahn topological sort.
  const indeg = new Int32Array(n);

  // Store all edge costs so we can binary search only real score values.
  const costs: number[] = [];

  // Iterate through every directed weighted edge.
  for (const [u, v, c] of edges) {
    // Add edge u -> v with recovery cost c.
    graph[u].push([v, c]);

    // Increase indegree of destination node.
    indeg[v]++;

    // Save edge cost as a possible minimum path score.
    costs.push(c);
  }

  // Queue for nodes whose indegree is zero.
  const queue: number[] = [];

  // Add all zero-indegree nodes to start topological sorting.
  for (let i = 0; i < n; i++) if (indeg[i] === 0) queue.push(i);

  // Final topological order of the DAG.
  const topo: number[] = [];

  // Process queue using a moving pointer to avoid O(n) shift().
  for (let head = 0; head < queue.length; head++) {
    // Current node in topological order.
    const u = queue[head];

    // Append current node to topological list.
    topo.push(u);

    // Visit every outgoing edge.
    for (const [v] of graph[u]) {
      // Remove current dependency and enqueue if no dependencies remain.
      if (--indeg[v] === 0) queue.push(v);
    }
  }

  // Sort costs ascending for binary search.
  costs.sort((a, b) => a - b);

  // Length of deduplicated prefix.
  let len = 0;

  // Deduplicate sorted costs in place.
  for (const c of costs)
    if (len === 0 || costs[len - 1] !== c) costs[len++] = c;

  // Truncate array to unique costs only.
  costs.length = len;

  // Check whether there is a valid path using only edges with cost >= minCost.
  const can = (minCost: number): boolean => {
    // dist[i] is the cheapest valid cost found from node 0 to node i.
    const dist = Array(n).fill(k + 1);

    // Starting at node 0 costs zero.
    dist[0] = 0;

    // Relax edges in topological order.
    for (const u of topo) {
      // Ignore offline nodes and already-too-expensive paths.
      if (!online[u] || dist[u] > k) continue;

      // Try every outgoing edge.
      for (const [v, c] of graph[u]) {
        // Edge is unusable if below threshold or destination node is offline.
        if (c < minCost || !online[v]) continue;

        // Candidate total recovery cost to destination.
        const next = dist[u] + c;

        // Keep only cheaper paths that still respect budget.
        if (next < dist[v] && next <= k) dist[v] = next;
      }
    }

    // Feasible if target is reachable within budget.
    return dist[n - 1] <= k;
  };

  // No edge or no valid path even without score restriction.
  if (costs.length === 0 || !can(0)) return -1;

  // Left binary search pointer over unique edge costs.
  let left = 0;

  // Right binary search pointer over unique edge costs.
  let right = costs.length - 1;

  // Best feasible score found.
  let ans = 0;

  // Binary search maximum feasible minimum edge cost.
  while (left <= right) {
    // Middle index.
    const mid = (left + right) >> 1;

    // If this threshold works, try a larger score.
    if (can(costs[mid])) {
      // Save feasible score.
      ans = costs[mid];

      // Search higher thresholds.
      left = mid + 1;
    } else {
      // Search lower thresholds.
      right = mid - 1;
    }
  }

  // Return maximum valid path score.
  return ans;
}
