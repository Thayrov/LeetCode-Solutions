/*
2096. Step-By-Step Directions From a Binary Tree Node to Another

You are given the root of a binary tree with n nodes. Each node is uniquely assigned a value from 1 to n. You are also given an integer startValue representing the value of the start node s, and a different integer destValue representing the value of the destination node t.
Find the shortest path starting from node s and ending at node t. Generate step-by-step directions of such path as a string consisting of only the uppercase letters 'L', 'R', and 'U'. Each letter indicates a specific direction:
'L' means to go from a node to its left child node.
'R' means to go from a node to its right child node.
'U' means to go from a node to its parent node.
Return the step-by-step directions of the shortest path from node s to node t.

Example 1:
Input: root = [5,1,2,3,null,6,4], startValue = 3, destValue = 6
Output: "UURL"
Explanation: The shortest path is: 3 → 1 → 5 → 2 → 6.

Example 2:
Input: root = [2,1], startValue = 2, destValue = 1
Output: "L"
Explanation: The shortest path is: 2 → 1.

Constraints:
The number of nodes in the tree is n.
2 <= n <= 10^5
1 <= Node.val <= n
All the values in the tree are unique.
1 <= startValue, destValue <= n
startValue != destValue

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

function getDirections(
  root: TreeNode | null,
  startValue: number,
  destValue: number,
): string {
  // Helper function to find the path from root to the given value node
  const findPath = (
    node: TreeNode | null,
    value: number,
    path: string[],
  ): boolean => {
    if (!node) return false; // If node is null, return false
    if (node.val === value) return true; // If the node's value matches the target, return true
    path.push("L"); // Try the left path
    if (findPath(node.left, value, path)) return true; // If left path leads to target, return true
    path.pop(); // Backtrack if left path does not lead to target
    path.push("R"); // Try the right path
    if (findPath(node.right, value, path)) return true; // If right path leads to target, return true
    path.pop(); // Backtrack if right path does not lead to target
    return false; // Return false if neither path leads to the target
  };

  const startPath: string[] = []; // Path from root to startValue
  const destPath: string[] = []; // Path from root to destValue
  findPath(root, startValue, startPath); // Find path to startValue
  findPath(root, destValue, destPath); // Find path to destValue

  let i = 0; // Index to find the common path length
  while (
    i < startPath.length &&
    i < destPath.length &&
    startPath[i] === destPath[i]
  ) {
    i++; // Increment while both paths are the same
  }

  // Construct the result: 'U' for going up from startValue to the common ancestor, and then follow the path to destValue
  return "U".repeat(startPath.length - i) + destPath.slice(i).join("");
}
