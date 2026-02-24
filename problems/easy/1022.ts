/*
1022. Sum of Root To Leaf Binary Numbers

You are given the root of a binary tree where each node has a value 0 or 1. Each root-to-leaf path represents a binary number starting with the most significant bit.
For example, if the path is 0 -> 1 -> 1 -> 0 -> 1, then this could represent 01101 in binary, which is 13.
For all leaves in the tree, consider the numbers represented by the path from the root to that leaf. Return the sum of these numbers.
The test cases are generated so that the answer fits in a 32-bits integer.

Example 1:
Input: root = [1,0,1,0,1,0,1]
Output: 22
Explanation: (100) + (101) + (110) + (111) = 4 + 5 + 6 + 7 = 22

Example 2:
Input: root = [0]
Output: 0

Constraints:
The number of nodes in the tree is in the range [1, 1000].
Node.val is 0 or 1.

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

function sumRootToLeaf(root: TreeNode | null): number {
  // Helper function using Depth-First Search to traverse the tree
  const dfs = (node: TreeNode | null, currentSum: number): number => {
    // Base case: if the node is null, it contributes 0 to the sum
    if (!node) return 0;

    // Bitwise left shift (<< 1) moves the current bits over to make room for the new bit
    // Bitwise OR (|) effectively adds the node's value (0 or 1) to the LSB position
    currentSum = (currentSum << 1) | node.val;

    // If both children are null, we've reached a leaf; return the calculated binary value
    if (!node.left && !node.right) return currentSum;

    // Recursively call dfs for left and right children and return their combined sum
    return dfs(node.left, currentSum) + dfs(node.right, currentSum);
  };

  // Initialize the recursive process starting from the root with an initial sum of 0
  return dfs(root, 0);
}
