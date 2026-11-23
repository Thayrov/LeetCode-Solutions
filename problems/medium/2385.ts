/*
2385. Amount of Time for Binary Tree to Be Infected

You are given the root of a binary tree with unique values, and an integer start. At minute 0, an infection starts from the node with value start.

Each minute, a node becomes infected if:

The node is currently uninfected.
The node is adjacent to an infected node.
Return the number of minutes needed for the entire tree to be infected.

Example 1:
Input: root = [1,5,3,null,4,10,6,9,2], start = 3
Output: 4
Explanation: The following nodes are infected during:
- Minute 0: Node 3
- Minute 1: Nodes 1, 10 and 6
- Minute 2: Node 5
- Minute 3: Node 4
- Minute 4: Nodes 9 and 2
It takes 4 minutes for the whole tree to be infected so we return 4.

Example 2:
Input: root = [1], start = 1
Output: 0
Explanation: At minute 0, the only node in the tree is infected so we return 0.

Constraints:
The number of nodes in the tree is in the range [1, 10^5].
1 <= Node.val <= 10^5
Each node has a unique value.
A node with a value of start exists in the tree.

</> Typescript code:
*/

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *   val: number;
 *   left: TreeNode | null;
 *   right: TreeNode | null;
 *   constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *     this.val = val === undefined ? 0 : val;
 *     this.left = left === undefined ? null : left;
 *     this.right = right === undefined ? null : right;
 *   }
 * }
 */

function amountOfTime(root: TreeNode | null, start: number): number {
  // Graph to represent the tree as an adjacency list
  const graph = new Map<number, number[]>();
  // Build the graph from the binary tree
  buildGraph(root, null, graph);

  // Set to keep track of visited nodes during BFS
  const visited = new Set<number>();
  // Queue for BFS, containing pairs of node value and time taken to infect
  const queue: [number, number][] = [[start, 0]];
  // Variable to track the maximum time taken for infection
  let maxTime = 0;

  // BFS loop
  while (queue.length > 0) {
    // Dequeue a node and its associated time
    const [node, time] = queue.shift()!;
    // Update the maximum time
    maxTime = Math.max(maxTime, time);
    // Mark the node as visited
    visited.add(node);

    // Traverse all adjacent nodes
    for (const neighbor of graph.get(node) || []) {
      // If the neighbor has not been visited, enqueue it with incremented time
      if (!visited.has(neighbor)) {
        queue.push([neighbor, time + 1]);
      }
    }
  }

  // Return the maximum time taken for the infection to spread
  return maxTime;
}

// Helper function to build the graph from the binary tree
function buildGraph(
  node: TreeNode | null,
  parent: TreeNode | null,
  graph: Map<number, number[]>,
) {
  if (!node) return; // Base case: if the node is null
  // Initialize the adjacency list for this node
  if (!graph.has(node.val)) graph.set(node.val, []);
  // Add the parent to the current node's list and vice versa
  if (parent) {
    graph.get(node.val)!.push(parent.val);
    graph.get(parent.val)!.push(node.val);
  }
  // Recursively build the graph for left and right children
  buildGraph(node.left, node, graph);
  buildGraph(node.right, node, graph);
}
