/* 
515. Find Largest Value in Each Tree Row

Given the root of a binary tree, return an array of the largest value in each row of the tree (0-indexed).

Example 1:
Input: root = [1,3,2,5,3,null,9]
Output: [1,3,9]

Example 2:
Input: root = [1,2,3]
Output: [1,3]

Constraints:
The number of nodes in the tree will be in the range [0, 10^4].
-2^31 <= Node.val <= 2^31 - 1

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

/**
 * We check if the root is null to handle an empty tree immediately.
 * We create an output array to store largest values in each row.
 * We initialize a queue with the tree's root node for BFS traversal.
 */
function largestValues(root: TreeNode | null): number[] {
  if (!root) return []; // If there's no tree, return an empty array.
  const output: number[] = []; // Store the largest values for each row.
  const queue: TreeNode[] = [root]; // Queue for level-by-level traversal.

  while (queue.length) {
    let max = -Infinity; // Track the maximum value at the current level.
    for (let size = queue.length; size > 0; size--) {
      const node = queue.shift()!; // Remove one node from the queue.
      if (node.val > max) max = node.val; // Update the max if needed.
      if (node.left) queue.push(node.left); // Enqueue left child if it exists.
      if (node.right) queue.push(node.right); // Enqueue right child if it exists.
    }
    output.push(max); // Store the largest value found for this level.
  }

  return output; // Return all largest values found for each row.
}
