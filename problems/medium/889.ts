/* 
889. Construct Binary Tree from Preorder and Postorder Traversal

Given two integer arrays, preorder and postorder where preorder is the preorder traversal of a binary tree of distinct values and postorder is the postorder traversal of the same tree, reconstruct and return the binary tree.

If there exist multiple answers, you can return any of them.

Example 1:
Input: preorder = [1,2,4,5,3,6,7], postorder = [4,5,2,6,7,3,1]
Output: [1,2,3,4,5,6,7]

Example 2:
Input: preorder = [1], postorder = [1]
Output: [1]

Constraints:
1 <= preorder.length <= 30
1 <= preorder[i] <= preorder.length
All the values of preorder are unique.
postorder.length == preorder.length
1 <= postorder[i] <= postorder.length
All the values of postorder are unique.
It is guaranteed that preorder and postorder are the preorder traversal and postorder traversal of the same binary tree.

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

function constructFromPrePost(preorder: number[], postorder: number[]): TreeNode | null {
  // Helper function for building the tree with subarray boundaries
  function build(
    preStart: number,
    preEnd: number,
    postStart: number,
    postEnd: number,
  ): TreeNode | null {
    // Base case: if current subarray is empty, then return null
    if (preStart > preEnd) return null;
    // Create root node from the first element in the current preorder segment
    let root = new TreeNode(preorder[preStart]);
    // If only one node exists, return it as the leaf node
    if (preStart === preEnd) return root;
    // The next element in preorder is always the root of the left subtree
    let leftRootVal = preorder[preStart + 1];
    // Find the index of the left subtree's root in the postorder segment
    let leftRootIndex = postStart;
    while (postorder[leftRootIndex] !== leftRootVal) {
      leftRootIndex++; // Locate the left subtree's root in postorder array
    }
    // Calculate the number of nodes in the left subtree based on postorder index found
    let leftSize = leftRootIndex - postStart + 1;
    // Recursively construct the left subtree using updated boundaries
    root.left = build(preStart + 1, preStart + leftSize, postStart, leftRootIndex);
    // Recursively construct the right subtree using the remaining nodes (excluding root)
    root.right = build(preStart + leftSize + 1, preEnd, leftRootIndex + 1, postEnd - 1);
    // Return the constructed root node
    return root;
  }
  // Start building the tree covering the entire preorder and postorder arrays
  return build(0, preorder.length - 1, 0, postorder.length - 1);
}
