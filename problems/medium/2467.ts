/* 
2467. Most Profitable Path in a Tree

There is an undirected tree with n nodes labeled from 0 to n - 1, rooted at node 0. You are given a 2D integer array edges of length n - 1 where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the tree.

At every node i, there is a gate. You are also given an array of even integers amount, where amount[i] represents:

the price needed to open the gate at node i, if amount[i] is negative, or,
the cash reward obtained on opening the gate at node i, otherwise.
The game goes on as follows:

Initially, Alice is at node 0 and Bob is at node bob.
At every second, Alice and Bob each move to an adjacent node. Alice moves towards some leaf node, while Bob moves towards node 0.
For every node along their path, Alice and Bob either spend money to open the gate at that node, or accept the reward. Note that:
If the gate is already open, no price will be required, nor will there be any cash reward.
If Alice and Bob reach the node simultaneously, they share the price/reward for opening the gate there. In other words, if the price to open the gate is c, then both Alice and Bob pay c / 2 each. Similarly, if the reward at the gate is c, both of them receive c / 2 each.
If Alice reaches a leaf node, she stops moving. Similarly, if Bob reaches node 0, he stops moving. Note that these events are independent of each other.
Return the maximum net income Alice can have if she travels towards the optimal leaf node.

Example 1:
Input: edges = [[0,1],[1,2],[1,3],[3,4]], bob = 3, amount = [-2,4,2,-4,6]
Output: 6
Explanation: 
The above diagram represents the given tree. The game goes as follows:
- Alice is initially on node 0, Bob on node 3. They open the gates of their respective nodes.
  Alice's net income is now -2.
- Both Alice and Bob move to node 1. 
  Since they reach here simultaneously, they open the gate together and share the reward.
  Alice's net income becomes -2 + (4 / 2) = 0.
- Alice moves on to node 3. Since Bob already opened its gate, Alice's income remains unchanged.
  Bob moves on to node 0, and stops moving.
- Alice moves on to node 4 and opens the gate there. Her net income becomes 0 + 6 = 6.
Now, neither Alice nor Bob can make any further moves, and the game ends.
It is not possible for Alice to get a higher net income.

Example 2:
Input: edges = [[0,1]], bob = 1, amount = [-7280,2350]
Output: -7280
Explanation: 
Alice follows the path 0->1 whereas Bob follows the path 1->0.
Thus, Alice opens the gate at node 0 only. Hence, her net income is -7280. 

Constraints:
2 <= n <= 10^5
edges.length == n - 1
edges[i].length == 2
0 <= ai, bi < n
ai != bi
edges represents a valid tree.
1 <= bob < n
amount.length == n
amount[i] is an even integer in the range [-10^4, 10^4].

</> Typescript Code:
*/

// Each function calculates the maximum net income for Alice in the tree-based game.
// First, we build the tree's adjacency list.
function mostProfitablePath(edges: number[][], bob: number, amount: number[]): number {
  const n = amount.length; // Total number of nodes
  const graph: number[][] = Array.from({length: n}, () => []); // Initialize the graph
  for (const [u, v] of edges) {
    // For undirected tree, fill both directions
    graph[u].push(v);
    graph[v].push(u);
  }

  // Array to store the time Bob takes to reach each node along his unique path to the root.
  const bobTime = new Array(n).fill(Infinity);

  // DFS to mark Bob's arrival times from his starting node to the root (node 0)
  function dfsBob(node: number, parent: number, t: number): boolean {
    if (node === 0) {
      bobTime[node] = t; // When Bob reaches the root, record the time.
      return true;
    }
    for (const nei of graph[node]) {
      if (nei === parent) continue; // Avoid revisiting the parent
      // If the neighbor leads to the root, record the current time and propagate success.
      if (dfsBob(nei, node, t + 1)) {
        bobTime[node] = t;
        return true;
      }
    }
    return false; // No path to root found from this branch
  }
  dfsBob(bob, -1, 0); // Start from Bob's node, with an initial time of 0.

  // DFS for Alice's journey from the root to a leaf, recording maximum profit.
  function dfsAlice(node: number, parent: number, t: number): number {
    let curr = 0;
    // Compare Alice's arrival time with Bob's arrival time at the node.
    if (t < bobTime[node]) curr = amount[node]; // Alice gets full amount if she arrives before Bob.
    else if (t === bobTime[node]) curr = amount[node] / 2; // They share the amount if arriving simultaneously.
    // If Bob arrives earlier, Alice gains nothing at this node.

    let best = -Infinity; // Initialize best additional profit from child nodes.
    let isLeaf = true; // Flag to check if the node is a leaf.
    for (const nei of graph[node]) {
      if (nei === parent) continue; // Skip the parent node.
      isLeaf = false; // If there's any child, this is not a leaf.
      best = Math.max(best, dfsAlice(nei, node, t + 1)); // Recursively find the best profit.
    }
    // At a leaf, no further profit is added.
    return curr + (isLeaf ? 0 : best);
  }
  return dfsAlice(0, -1, 0); // Start Alice's journey from the root at time 0.
}
