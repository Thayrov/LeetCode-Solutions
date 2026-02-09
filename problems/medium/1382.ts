
/*
1382. Balance a Binary Search Tree

Given the root of a binary search tree, return a balanced binary search tree with the same node values. If there is more than one answer, return any of them.

A binary search tree is balanced if the depth of the two subtrees of every node never differs by more than 1.

Example 1:
Input: root = [1,null,2,null,3,null,4,null,null]
Output: [2,1,3,null,null,null,4]
Explanation: This is not the only correct answer, [3,1,4,null,2] is also correct.

Example 2:
Input: root = [2,1,3]
Output: [2,1,3]

Constraints:
The number of nodes in the tree is in the range [1, 10^4].
1 <= Node.val <= 10^5

</> Typescript Code:
*/

class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
      this.val = (val===undefined ? 0 : val)
      this.left = (left===undefined ? null : left)
      this.right = (right===undefined ? null : right)
  }
}

function balanceBST(root: TreeNode | null): TreeNode | null {
  const values: number[] = []; // Array to store the node values in sorted order

  function inorder(node: TreeNode | null) {
    if (!node) return; // Base case: if the node is null, return
    inorder(node.left); // Recurse on the left subtree
    values.push(node.val); // Add the node's value to the values array
    inorder(node.right); // Recurse on the right subtree
  }

  function sortedArrayToBST(start: number, end: number): TreeNode | null {
    if (start > end) return null; // Base case: if the start index is greater than the end index, return null
    const mid = Math.floor((start + end) / 2); // Find the middle index
    const node = new TreeNode(values[mid]); // Create a new TreeNode with the middle value
    node.left = sortedArrayToBST(start, mid - 1); // Recurse to create the left subtree
    node.right = sortedArrayToBST(mid + 1, end); // Recurse to create the right subtree
    return node; // Return the newly created node
  }

  inorder(root); // Perform an inorder traversal to get the sorted node values
  return sortedArrayToBST(0, values.length - 1); // Convert the sorted array to a balanced BST and return the root
}
