/*
110. Balanced Binary Tree

Given a binary tree, determine if it is height-balanced.

Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: true

Example 2:
Input: root = [1,2,2,3,3,null,null,4,4]
Output: false

Example 3:
Input: root = []
Output: true

Constraints:
The number of nodes in the tree is in the range [0, 5000].
-10^4 <= Node.val <= 10^4

</> Typescript code:
*/

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function isBalanced(root: TreeNode | null): boolean {
  // Use -1 as sentinel value to indicate imbalance detected in subtree
  // If checkHeight returns -1, tree is not balanced
  return checkHeight(root) !== -1;
}

function checkHeight(node: TreeNode | null): number {
  // Base case: null nodes have height 0 and are balanced
  if (!node) return 0;

  // Recursively get left subtree height
  // Early exit: if left subtree is imbalanced, propagate -1 upward
  const left = checkHeight(node.left);
  if (left === -1) return -1;

  // Recursively get right subtree height
  // Early exit: if right subtree is imbalanced, propagate -1 upward
  const right = checkHeight(node.right);
  if (right === -1) return -1;

  // Check balance condition: height difference must be <= 1
  // If violated, mark this subtree as imbalanced by returning -1
  if (Math.abs(left - right) > 1) return -1;

  // Tree is balanced at this node, return actual height
  // Height = max of children heights + 1 for current node
  return Math.max(left, right) + 1;
}
