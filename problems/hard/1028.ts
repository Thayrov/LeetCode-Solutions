/* 
1028. Recover a Tree From Preorder Traversal

We run a preorder depth-first search (DFS) on the root of a binary tree.

At each node in this traversal, we output D dashes (where D is the depth of this node), then we output the value of this node.  If the depth of a node is D, the depth of its immediate child is D + 1.  The depth of the root node is 0.

If a node has only one child, that child is guaranteed to be the left child.

Given the output traversal of this traversal, recover the tree and return its root.

Example 1:
Input: traversal = "1-2--3--4-5--6--7"
Output: [1,2,5,3,4,6,7]

Example 2:
Input: traversal = "1-2--3---4-5--6---7"
Output: [1,2,5,3,null,6,null,4,null,7]

Example 3:
Input: traversal = "1-401--349---90--88"
Output: [1,401,null,349,88,90]

Constraints:
The number of nodes in the original tree is in the range [1, 1000].
1 <= Node.val <= 10^9

</> Typescript Code:
*/

// Definition for a binary tree node.
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

function recoverFromPreorder(traversal: string): TreeNode | null {
  // Initialize the current parsing position in the traversal string.
  let pos = 0;
  // Store total length of the traversal string for reuse.
  const n = traversal.length;

  // Define a recursive helper function that builds the tree based on the current depth.
  function helper(depth: number): TreeNode | null {
    // Count the number of '-' dashes to determine the node's depth.
    let dashCount = 0;
    let tempPos = pos;
    // While the current character is a dash, count and move forward.
    while (tempPos < n && traversal[tempPos] === '-') {
      dashCount++;
      tempPos++;
    }
    // If the number of dashes does not match the expected depth, this isn't a node at this level.
    if (dashCount !== depth) return null;
    // Update the main position to the end of the dashes.
    pos = tempPos;
    // Mark the starting index of the node's value.
    let start = pos;
    // Move the position forward until a dash or end of string is found.
    while (pos < n && traversal[pos] !== '-') pos++;
    // Parse the numeric value for this node.
    const value = parseInt(traversal.substring(start, pos));
    // Create a new tree node with the parsed value.
    const node = new TreeNode(value);
    // Recursively construct the left subtree with increased depth.
    node.left = helper(depth + 1);
    // Recursively construct the right subtree with increased depth.
    node.right = helper(depth + 1);
    // Return the constructed node.
    return node;
  }

  // Start the tree reconstruction from depth 0 (the root) and return the constructed tree.
  return helper(0);
}
