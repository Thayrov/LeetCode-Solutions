/*
2359. Find Closest Node to Given Two Nodes

You are given a directed graph of n nodes numbered from 0 to n - 1, where each node has at most one outgoing edge.

The graph is represented with a given 0-indexed array edges of size n, indicating that there is a directed edge from node i to node edges[i]. If there is no outgoing edge from i, then edges[i] == -1.

You are also given two integers node1 and node2.

Return the index of the node that can be reached from both node1 and node2, such that the maximum between the distance from node1 to that node, and from node2 to that node is minimized. If there are multiple answers, return the node with the smallest index, and if no possible answer exists, return -1.

Note that edges may contain cycles.

Example 1:
Input: edges = [2,2,3,-1], node1 = 0, node2 = 1
Output: 2
Explanation: The distance from node 0 to node 2 is 1, and the distance from node 1 to node 2 is 1.
The maximum of those two distances is 1. It can be proven that we cannot get a node with a smaller maximum distance than 1, so we return node 2.

Example 2:
Input: edges = [1,2,-1], node1 = 0, node2 = 2
Output: 2
Explanation: The distance from node 0 to node 2 is 2, and the distance from node 2 to itself is 0.
The maximum of those two distances is 2. It can be proven that we cannot get a node with a smaller maximum distance than 2, so we return node 2.

Constraints:
n == edges.length
2 <= n <= 10^5
-1 <= edges[i] < n
edges[i] != i
0 <= node1, node2 < n

</> Typescript code:
*/

function closestMeetingNodeCommented(
  edges: number[],
  node1: number,
  node2: number
): number {
  // Store the total number of nodes in the graph
  const n = edges.length;

  // Helper function to calculate distances from a starting node to all reachable nodes
  function getDistances(start: number): number[] {
    // Initialize distance array with -1 (meaning unreachable)
    const distances = new Array(n).fill(-1);
    // Start traversal from the given starting node
    let current = start;
    // Initialize distance counter
    let dist = 0;

    // Continue traversal until we reach a dead end (-1) or revisit a node (cycle detection)
    while (current !== -1 && distances[current] === -1) {
      // Record the distance to the current node
      distances[current] = dist;
      // Move to the next node following the directed edge
      current = edges[current];
      // Increment distance for the next iteration
      dist++;
    }

    // Return the distances array containing shortest distances to all reachable nodes
    return distances;
  }

  // Calculate distances from node1 to all reachable nodes
  const dist1 = getDistances(node1);
  // Calculate distances from node2 to all reachable nodes
  const dist2 = getDistances(node2);

  // Initialize result to -1 (no valid meeting node found)
  let result = -1;
  // Initialize minimum maximum distance to infinity for comparison
  let minMaxDist = Infinity;

  // Iterate through all nodes to find the optimal meeting point
  for (let i = 0; i < n; i++) {
    // Check if node i is reachable from both starting nodes
    if (dist1[i] !== -1 && dist2[i] !== -1) {
      // Calculate the maximum distance from either starting node to node i
      const maxDist = Math.max(dist1[i], dist2[i]);
      // Update result if this node provides a better (smaller) maximum distance
      if (maxDist < minMaxDist) {
        minMaxDist = maxDist;
        result = i;
      }
      // Note: Since we iterate from 0 to n-1, we automatically get the smallest index in case of ties
    }
  }

  // Return the optimal meeting node index, or -1 if no valid meeting node exists
  return result;
}
