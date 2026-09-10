/*
2265. Count Nodes Equal to Average of Subtree

Hint
Given the root of a binary tree, return the number of nodes where the value of the node is equal to the average of the values in its subtree.

Note:
The average of n elements is the sum of the n elements divided by n and rounded down to the nearest integer.
A subtree of root is a tree consisting of root and all of its descendants.

Example 1:
Input: root = [4,8,5,0,1,null,6]
Output: 5
Explanation: 
For the node with value 4: The average of its subtree is (4 + 8 + 5 + 0 + 1 + 6) / 6 = 24 / 6 = 4.
For the node with value 5: The average of its subtree is (5 + 6) / 2 = 11 / 2 = 5.
For the node with value 0: The average of its subtree is 0 / 1 = 0.
For the node with value 1: The average of its subtree is 1 / 1 = 1.
For the node with value 6: The average of its subtree is 6 / 1 = 6.

Example 2:
Input: root = [1]
Output: 1
Explanation: For the node with value 1: The average of its subtree is 1 / 1 = 1.

Constraints:
The number of nodes in the tree is in the range [1, 1000].
0 <= Node.val <= 1000

</> Typescript code:
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

function averageOfSubtree(root: TreeNode | null): number {
  // Stores the total number of nodes whose value equals
  // the floored average of all values in their subtree.
  let answer = 0;

  // Performs a postorder DFS.
  // Returns [subtree sum, subtree node count].
  function dfs(node: TreeNode | null): [number, number] {
    // An empty subtree contributes no sum and no nodes.
    if (!node) return [0, 0];

    // Compute the sum and size of the left subtree.
    const [leftSum, leftCount] = dfs(node.left);

    // Compute the sum and size of the right subtree.
    const [rightSum, rightCount] = dfs(node.right);

    // Add the current node's value to both subtree sums.
    const sum = leftSum + rightSum + node.val;

    // Count all nodes in the current node's subtree,
    // including the current node itself.
    const count = leftCount + rightCount + 1;

    // The problem requires integer division rounded down.
    // If the resulting average equals this node's value,
    // count this node as valid.
    if (Math.floor(sum / count) === node.val) answer++;

    // Return the information needed by the parent node.
    return [sum, count];
  }

  // Process the complete tree.
  dfs(root);

  // Return the number of qualifying nodes.
  return answer;
}
