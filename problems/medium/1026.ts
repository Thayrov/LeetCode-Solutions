/*
1026. Maximum Difference Between Node and Ancestor

Given the root of a binary tree, find the maximum value v for which there exist different nodes a and b where v = |a.val - b.val| and a is an ancestor of b.

A node a is an ancestor of b if either: any child of a is equal to b or any child of a is an ancestor of b.

Example 1:
Input: root = [8,3,10,1,6,null,14,null,null,4,7,13]
Output: 7
Explanation: We have various ancestor-node differences, some of which are given below :
|8 - 3| = 5
|3 - 7| = 4
|8 - 1| = 7
|10 - 13| = 3
Among all possible differences, the maximum value of 7 is obtained by |8 - 1| = 7.

Example 2:
Input: root = [1,null,2,null,0,3]
Output: 3

Constraints:
The number of nodes in the tree is in the range [2, 5000].
0 <= Node.val <= 10^5

</> Typescript code:
*/

/* Definition for a binary tree node. */
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

export function maxAncestorDiff(root: TreeNode | null): number {
  // Start DFS with the root, initializing minVal and maxVal with the root's value
  return dfs2(root, root!.val, root!.val);
}

function dfs2(node: TreeNode | null, minVal: number, maxVal: number): number {
  // Base case: if node is null, return the difference between max and min values
  if (!node) return maxVal - minVal;
  // Update the min and max values encountered so far
  minVal = Math.min(minVal, node.val);
  maxVal = Math.max(maxVal, node.val);
  // Recursively call DFS for left and right children, and return the maximum difference
  return Math.max(
    dfs2(node.left, minVal, maxVal),
    dfs2(node.right, minVal, maxVal),
  );
}
