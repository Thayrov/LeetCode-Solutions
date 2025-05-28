/*
3372. Maximize the Number of Target Nodes After Connecting Trees I

There exist two undirected trees with n and m nodes, with distinct labels in ranges [0, n - 1] and [0, m - 1], respectively.
You are given two 2D integer arrays edges1 and edges2 of lengths n - 1 and m - 1, respectively, where edges1[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the first tree and edges2[i] = [ui, vi] indicates that there is an edge between nodes ui and vi in the second tree. You are also given an integer k.
Node u is target to node v if the number of edges on the path from u to v is less than or equal to k. Note that a node is always target to itself.
Return an array of n integers answer, where answer[i] is the maximum possible number of nodes target to node i of the first tree if you have to connect one node from the first tree to another node in the second tree.
Note that queries are independent from each other. That is, for every query you will remove the added edge before proceeding to the next query.

Example 1:
Input: edges1 = [[0,1],[0,2],[2,3],[2,4]], edges2 = [[0,1],[0,2],[0,3],[2,7],[1,4],[4,5],[4,6]], k = 2
Output: [9,7,9,8,8]
Explanation:
For i = 0, connect node 0 from the first tree to node 0 from the second tree.
For i = 1, connect node 1 from the first tree to node 0 from the second tree.
For i = 2, connect node 2 from the first tree to node 4 from the second tree.
For i = 3, connect node 3 from the first tree to node 4 from the second tree.
For i = 4, connect node 4 from the first tree to node 4 from the second tree.

Example 2:
Input: edges1 = [[0,1],[0,2],[0,3],[0,4]], edges2 = [[0,1],[1,2],[2,3]], k = 1
Output: [6,3,3,3,3]
Explanation:
For every i, connect node i of the first tree with any node of the second tree.

Constraints:
2 <= n, m <= 1000
edges1.length == n - 1
edges2.length == m - 1
edges1[i].length == edges2[i].length == 2
edges1[i] = [ai, bi]
0 <= ai, bi < n
edges2[i] = [ui, vi]
0 <= ui, vi < m
The input is generated such that edges1 and edges2 represent valid trees.
0 <= k <= 1000

</> Typescript code:
*/

function maxTargetNodes(edges1: number[][], edges2: number[][], k: number): number[] {
  // Get the number of nodes in tree 1 (n) and tree 2 (m).
  // For a tree with 'x' edges, it has 'x + 1' nodes.
  const n = edges1.length + 1;
  const m = edges2.length + 1;

  // Helper function to build an adjacency list representation of a tree.
  // An adjacency list is an array where each index `i` contains a list of nodes
  // directly connected to node `i`.
  const buildAdj = (edges: number[][], numNodes: number): number[][] => {
    // Initialize an array of empty arrays, one for each node.
    const adj: number[][] = Array.from({length: numNodes}, () => []);
    // Iterate over each edge [u, v].
    for (const [u, v] of edges) {
      // Add v to u's adjacency list.
      adj[u].push(v);
      // Add u to v's adjacency list (since it's an undirected tree).
      adj[v].push(u);
    }
    return adj;
  };

  // Build the adjacency list for the first tree.
  const adj1 = buildAdj(edges1, n);
  // Build the adjacency list for the second tree.
  const adj2 = buildAdj(edges2, m);

  // Helper function to calculate for every node `startNode` in a tree,
  // the count of nodes that are within `maxDist` distance from `startNode`.
  const calculateCounts = (adj: number[][], numNodes: number, maxDist: number): number[] => {
    // Initialize an array `counts` to store the calculated counts for each `startNode`.
    // All elements are initialized to 0.
    const counts: number[] = Array(numNodes).fill(0);

    // If `maxDist` is negative, it means no nodes (not even the start node itself)
    // can be considered "target" nodes. So, all counts will be 0.
    if (maxDist < 0) {
      return counts;
    }

    // `distances` array will be used to store the shortest distance from the current `startNode`
    // to every other node in the tree. It is re-used and reset for each BFS.
    const distances: number[] = Array(numNodes);

    // Iterate through each node in the tree, treating it as the `startNode` for a BFS.
    // This calculates the counts for every possible root node.
    for (let startNode = 0; startNode < numNodes; startNode++) {
      // Reset distances for the current BFS. -1 indicates unvisited.
      distances.fill(-1);
      // Initialize a queue for the BFS. This queue stores only node IDs.
      const q: number[] = [];

      // Add the `startNode` to the queue and set its distance to 0.
      q.push(startNode);
      distances[startNode] = 0;

      // `head` pointer for efficient dequeuing from the `q` array (simulates shift operation).
      let head = 0;
      // Standard BFS loop: continue as long as there are nodes in the queue.
      while (head < q.length) {
        // Dequeue the current node `u` and its distance `d`.
        const u = q[head++];
        const d = distances[u];

        // If the current node `u` is within the `maxDist` from `startNode`, increment the count for `startNode`.
        if (d <= maxDist) {
          counts[startNode]++;
        }

        // Optimization: Only explore neighbors if the current node's distance `d` is strictly less than `maxDist`.
        // If `d` is already `maxDist`, its neighbors will be at `d+1`, which is greater than `maxDist`,
        // so they wouldn't be counted anyway and don't need to be added to the queue.
        if (d < maxDist) {
          // Explore neighbors of `u`.
          for (const v of adj[u]) {
            // If neighbor `v` has not been visited yet (distance is -1).
            if (distances[v] === -1) {
              // Set its distance.
              distances[v] = d + 1;
              // Enqueue `v` to be processed later.
              q.push(v);
            }
          }
        }
      }
    }
    return counts;
  };

  // Calculate `counts1`: For each node `i` in T1, how many nodes in T1 are within distance `k` from `i`.
  const counts1 = calculateCounts(adj1, n, k);

  // Calculate `counts2`: For each node `j` in T2, how many nodes in T2 are within distance `k-1` from `j`.
  // (This is because if T1's node `i` connects to T2's node `j`, any node `x` in T2
  // reachable from `j` will have `dist_new(i, x) = dist_T1(i, i) + 1 + dist_T2(j, x) = 1 + dist_T2(j, x)`.
  // For `dist_new(i, x) <= k`, we need `1 + dist_T2(j, x) <= k`, which means `dist_T2(j, x) <= k - 1`).
  const counts2 = calculateCounts(adj2, m, k - 1);

  // Find the maximum count among all nodes in T2 for distance `k-1`.
  // This value will be added to `counts1[i]` for every `i` in T1, because we can choose
  // any node `j` in T2 to maximize the total target nodes.
  let maxCountT2 = 0;
  // Ensure `m` is positive to avoid issues with `Math.max` on an empty array if `m` were 0 (though constraints say m >= 2).
  if (m > 0) {
    maxCountT2 = Math.max(...counts2);
  }

  // Initialize the `answer` array for `n` nodes.
  const answer: number[] = Array(n);
  // Populate the `answer` array.
  // For each node `i` in T1, the maximum target nodes are
  // (nodes in T1 within distance `k` of `i`) + (maximum possible nodes in T2 within distance `k-1`).
  for (let i = 0; i < n; i++) {
    answer[i] = counts1[i] + maxCountT2;
  }

  return answer;
}
