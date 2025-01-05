/* 
2471. Minimum Number of Operations to Sort a Binary Tree by Level

You are given the root of a binary tree with unique values.

In one operation, you can choose any two nodes at the same level and swap their values.

Return the minimum number of operations needed to make the values at each level sorted in a strictly increasing order.

The level of a node is the number of edges along the path between it and the root node.

Example 1:
Input: root = [1,4,3,7,6,8,5,null,null,null,null,9,null,10]
Output: 3
Explanation:
- Swap 4 and 3. The 2nd level becomes [3,4].
- Swap 7 and 5. The 3rd level becomes [5,6,8,7].
- Swap 8 and 7. The 3rd level becomes [5,6,7,8].
We used 3 operations so return 3.
It can be proven that 3 is the minimum number of operations needed.

Example 2:
Input: root = [1,3,2,7,6,5,4]
Output: 3
Explanation:
- Swap 3 and 2. The 2nd level becomes [2,3].
- Swap 7 and 4. The 3rd level becomes [4,6,5,7].
- Swap 6 and 5. The 3rd level becomes [4,5,6,7].
We used 3 operations so return 3.
It can be proven that 3 is the minimum number of operations needed.

Example 3:
Input: root = [1,2,3,4,5,6]
Output: 0
Explanation: Each level is already sorted in increasing order so return 0.

Constraints:
The number of nodes in the tree is in the range [1, 10^5].
1 <= Node.val <= 10^5
All the values of the tree are unique.

</> Typescript Code:
*/

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

// class TreeNode {
//   // Node value
//   val: number;
//   // Left child
//   left: TreeNode | null;
//   // Right child
//   right: TreeNode | null;
//   // Constructor to initialize node
//   constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
//     this.val = val === undefined ? 0 : val;
//     this.left = left === undefined ? null : left;
//     this.right = right === undefined ? null : right;
//   }
// }

function minimumOperations(root: TreeNode | null): number {
  // If there's no tree, no operations needed
  if (!root) return 0;
  // Queue for BFS
  let queue = [root],
    // Count operations
    ops = 0;
  // Process level by level
  while (queue.length) {
    let levelSize = queue.length,
      // Array to hold values in this level
      lvl: number[] = [];
    // Extract each node in the current level
    for (let i = 0; i < levelSize; i++) {
      let node = queue.shift()!;
      // Store its value
      lvl.push(node.val);
      // Push children if they exist
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    // Accumulate the swaps needed for this level
    ops += countSwaps(lvl);
  }
  // Return total operations
  return ops;
}

function countSwaps(arr: number[]): number {
  // Prepare a sorted copy
  let sorted = [...arr].sort((a, b) => a - b),
    // Map from value to sorted index
    idxMap = new Map<number, number>(),
    // Track visited positions
    visited = new Array(arr.length).fill(false),
    // Accumulate swaps
    swaps = 0;
  // Fill the map with each sorted position
  for (let i = 0; i < arr.length; i++) idxMap.set(sorted[i], i);
  // Traverse each position
  for (let i = 0; i < arr.length; i++) {
    // Skip if already visited
    if (visited[i]) continue;
    let cycleSize = 0,
      curr = i;
    // Follow cycle until it's fully visited
    while (!visited[curr]) {
      visited[curr] = true;
      curr = idxMap.get(arr[curr])!;
      cycleSize++;
    }
    // A cycle of length L costs L-1 swaps
    if (cycleSize > 1) swaps += cycleSize - 1;
  }
  return swaps;
}
