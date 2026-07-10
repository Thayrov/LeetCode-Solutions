/*
3534. Path Existence Queries in a Graph II

Hint
You are given an integer n representing the number of nodes in a graph, labeled from 0 to n - 1.
You are also given an integer array nums of length n and an integer maxDiff.
An undirected edge exists between nodes i and j if the absolute difference between nums[i] and nums[j] is at most maxDiff (i.e., |nums[i] - nums[j]| <= maxDiff).
You are also given a 2D integer array queries. For each queries[i] = [ui, vi], find the minimum distance between nodes ui and vi. If no path exists between the two nodes, return -1 for that query.
Return an array answer, where answer[i] is the result of the ith query.

Note: The edges between the nodes are unweighted.

Example 1:
Input: n = 5, nums = [1,8,3,4,2], maxDiff = 3, queries = [[0,3],[2,4]]
Output: [1,1]
Explanation:
The resulting graph is:
Query	Shortest Path	Minimum Distance
[0, 3]	0 → 3	1
[2, 4]	2 → 4	1
Thus, the output is [1, 1].

Example 2:
Input: n = 5, nums = [5,3,1,9,10], maxDiff = 2, queries = [[0,1],[0,2],[2,3],[4,3]]
Output: [1,2,-1,1]
Explanation:
The resulting graph is:
Query	Shortest Path	Minimum Distance
[0, 1]	0 → 1	1
[0, 2]	0 → 1 → 2	2
[2, 3]	None	-1
[4, 3]	3 → 4	1
Thus, the output is [1, 2, -1, 1].

Example 3:
Input: n = 3, nums = [3,6,1], maxDiff = 1, queries = [[0,0],[0,1],[1,2]]
Output: [0,-1,-1]
Explanation:
There are no edges between any two nodes because:
Nodes 0 and 1: |nums[0] - nums[1]| = |3 - 6| = 3 > 1
Nodes 0 and 2: |nums[0] - nums[2]| = |3 - 1| = 2 > 1
Nodes 1 and 2: |nums[1] - nums[2]| = |6 - 1| = 5 > 1
Thus, no node can reach any other node, and the output is [0, -1, -1].

Constraints:
1 <= n == nums.length <= 10^5
0 <= nums[i] <= 10^5
0 <= maxDiff <= 10^5
1 <= queries.length <= 10^5
queries[i] == [ui, vi]
0 <= ui, vi < n

</> Typescript code:
*/

// Defines the function that answers every shortest-path query.
function pathExistenceQueries(
  // Receives the number of graph nodes.
  n: number,
  // Receives each node's numeric value.
  nums: number[],
  // Receives the maximum value difference allowed by an edge.
  maxDiff: number,
  // Receives the node pairs whose distances must be calculated.
  queries: number[][],
): number[] {
  // Creates the node indices sorted by their corresponding values.
  const order = Array.from({ length: n }, (_, i) => i).sort(
    // Sorts indices by ascending node value.
    (a, b) => nums[a] - nums[b],
  );

  // Stores each original node's position in the sorted order.
  const rank = new Int32Array(n);

  // Stores node values in sorted order.
  const values = new Int32Array(n);

  // Iterates through every sorted position.
  for (let i = 0; i < n; i++) {
    // Maps the original node index to its sorted position.
    rank[order[i]] = i;

    // Copies the node value into the sorted-value array.
    values[i] = nums[order[i]];
  }

  // Stores the connected-component identifier of every sorted node.
  const component = new Int32Array(n);

  // Processes every adjacent pair in sorted order.
  for (let i = 1; i < n; i++) {
    // Starts a new component exactly when the adjacent value gap is too large.
    component[i] =
      component[i - 1] + Number(values[i] - values[i - 1] > maxDiff);
  }

  // Calculates enough binary-lifting levels to cover any path length.
  const maxLog = Math.ceil(Math.log2(Math.max(1, n))) + 1;

  // Allocates the binary-lifting table.
  const jump: Int32Array[] = Array.from(
    // Creates one array for each power-of-two jump size.
    { length: maxLog },
    // Allocates one destination per sorted node.
    () => new Int32Array(n),
  );

  // Tracks the farthest reachable sorted position for the sliding window.
  let right = 0;

  // Computes the farthest node reachable with one edge from every position.
  for (let left = 0; left < n; left++) {
    // Keeps the right pointer from falling behind the left pointer.
    if (right < left) right = left;

    // Expands while the next node remains within maxDiff of the source.
    while (right + 1 < n && values[right + 1] - values[left] <= maxDiff) {
      // Includes the next reachable sorted node.
      right++;
    }

    // Records the optimal one-edge destination from this source.
    jump[0][left] = right;
  }

  // Builds destinations after powers of two edges.
  for (let level = 1; level < maxLog; level++) {
    // References destinations after half the current number of edges.
    const previous = jump[level - 1];

    // References the current binary-lifting level.
    const current = jump[level];

    // Computes the current destination for every sorted node.
    for (let i = 0; i < n; i++) {
      // Combines two equal-size jumps into one doubled jump.
      current[i] = previous[previous[i]];
    }
  }

  // Allocates the result array.
  const answer = new Array<number>(queries.length);

  // Processes every query independently.
  for (let queryIndex = 0; queryIndex < queries.length; queryIndex++) {
    // Extracts the original node indices.
    const [u, v] = queries[queryIndex];

    // Converts the first node to its sorted position.
    let left = rank[u];

    // Converts the second node to its sorted position.
    let target = rank[v];

    // Ensures traversal always proceeds from left to right.
    if (left > target) [left, target] = [target, left];

    // Handles a node queried against itself.
    if (left === target) {
      // A node has distance zero from itself.
      answer[queryIndex] = 0;

      // Continues with the next query.
      continue;
    }

    // Checks whether a gap larger than maxDiff separates the nodes.
    if (component[left] !== component[target]) {
      // Reports that no path exists.
      answer[queryIndex] = -1;

      // Continues with the next query.
      continue;
    }

    // Counts the number of edges selected so far.
    let distance = 0;

    // Tries jumps from largest to smallest.
    for (let level = maxLog - 1; level >= 0; level--) {
      // Finds the destination after 2^level optimal edges.
      const next = jump[level][left];

      // Uses this jump only when it does not reach the target yet.
      if (next < target) {
        // Advances to the jump destination.
        left = next;

        // Adds the corresponding number of edges.
        distance += 2 ** level;
      }
    }

    // Adds the final edge that reaches or passes the target.
    answer[queryIndex] = distance + 1;
  }

  // Returns every minimum distance in query order.
  return answer;
}
