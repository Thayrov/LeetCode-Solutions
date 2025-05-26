/*
1857. Largest Color Value in a Directed Graph

There is a directed graph of n colored nodes and m edges. The nodes are numbered from 0 to n - 1.

You are given a string colors where colors[i] is a lowercase English letter representing the color of the ith node in this graph (0-indexed). You are also given a 2D array edges where edges[j] = [aj, bj] indicates that there is a directed edge from node aj to node bj.

A valid path in the graph is a sequence of nodes x1 -> x2 -> x3 -> ... -> xk such that there is a directed edge from xi to xi+1 for every 1 <= i < k. The color value of the path is the number of nodes that are colored the most frequently occurring color along that path.

Return the largest color value of any valid path in the given graph, or -1 if the graph contains a cycle.

Example 1:
Input: colors = "abaca", edges = [[0,1],[0,2],[2,3],[3,4]]
Output: 3
Explanation: The path 0 -> 2 -> 3 -> 4 contains 3 nodes that are colored "a" (red in the above image).

Example 2:
Input: colors = "a", edges = [[0,0]]
Output: -1
Explanation: There is a cycle from 0 to 0.

Constraints:
n == colors.length
m == edges.length
1 <= n <= 10^5
0 <= m <= 10^5
colors consists of lowercase English letters.
0 <= aj, bj < n

</> Typescript code:
*/

function largestPathValue(colors: string, edges: number[][]): number {
  // Get the number of nodes in the graph.
  const n = colors.length;

  // Adjacency list to represent the graph. adj[u] contains a list of nodes v such that there's an edge u -> v.
  const adj: number[][] = Array.from({length: n}, () => []);
  // Array to store the in-degree of each node. inDegree[i] is the number of incoming edges to node i.
  const inDegree: number[] = Array(n).fill(0);

  // Populate the adjacency list and in-degree array from the given edges.
  for (const [u, v] of edges) {
    adj[u].push(v); // Add edge from u to v.
    inDegree[v]++; // Increment in-degree of node v.
  }

  // dp[i][j] will store the maximum count of color j (0-25) on any path ending at node i.
  const dp: number[][] = Array.from({length: n}, () => Array(26).fill(0));

  // Queue for Kahn's algorithm (topological sort). Stores nodes with an in-degree of 0.
  const queue: number[] = [];
  // Pointer for the head of the queue to achieve O(1) amortized dequeue.
  let qHead = 0;

  // Cache the charCode of 'a' for efficient conversion of colors to indices (0-25).
  const aCharCode = 'a'.charCodeAt(0);

  // Initialize the queue with all nodes that have an in-degree of 0 (source nodes).
  for (let i = 0; i < n; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  // Stores the maximum color value found so far across all valid paths.
  let maxPathValue = 0;
  // Counts the number of nodes processed in the topological sort. Used for cycle detection.
  let processedCount = 0;

  // Process nodes in topological order.
  while (qHead < queue.length) {
    // Dequeue a node u.
    const u = queue[qHead++];
    // Increment the count of processed nodes.
    processedCount++;

    // Get the color index (0-25) of the current node u.
    const uColorIndex = colors.charCodeAt(u) - aCharCode;
    // Increment the count of this color for paths ending at u.
    // This adds the color of node u itself to the counts inherited from its predecessors.
    dp[u][uColorIndex]++;

    // Update the overall maximum path value.
    // The color value of a path is the count of its most frequent color.
    // For paths ending at u, we check all 26 possible colors to find the maximum frequency.
    for (let c = 0; c < 26; c++) {
      maxPathValue = Math.max(maxPathValue, dp[u][c]);
    }

    // Process all neighbors v of node u.
    for (const v of adj[u]) {
      // Propagate the maximum color counts from u to v.
      // For each color c, the count for paths ending at v (via u) is at least the count for paths ending at u.
      for (let c = 0; c < 26; c++) {
        dp[v][c] = Math.max(dp[v][c], dp[u][c]);
      }
      // Decrement the in-degree of neighbor v as we've processed the edge u -> v.
      inDegree[v]--;
      // If in-degree of v becomes 0, it means all its prerequisites are met, so add it to the queue.
      if (inDegree[v] === 0) {
        queue.push(v);
      }
    }
  }

  // If the number of processed nodes is less than the total number of nodes,
  // it means there was a cycle in the graph, and not all nodes could be part of the topological sort.
  if (processedCount < n) {
    return -1; // Cycle detected.
  }

  // Otherwise, return the largest color value found.
  return maxPathValue;
}
