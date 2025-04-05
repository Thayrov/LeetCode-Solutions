/* 
1123. Lowest Common Ancestor of Deepest Leaves

Given the root of a binary tree, return the lowest common ancestor of its deepest leaves.

Recall that:

The node of a binary tree is a leaf if and only if it has no children
The depth of the root of the tree is 0. if the depth of a node is d, the depth of each of its children is d + 1.
The lowest common ancestor of a set S of nodes, is the node A with the largest depth such that every node in S is in the subtree with root A.

Example 1:
Input: root = [3,5,1,6,2,0,8,null,null,7,4]
Output: [2,7,4]
Explanation: We return the node with value 2, colored in yellow in the diagram.
The nodes coloured in blue are the deepest leaf-nodes of the tree.
Note that nodes 6, 0, and 8 are also leaf nodes, but the depth of them is 2, but the depth of nodes 7 and 4 is 3.

Example 2:
Input: root = [1]
Output: [1]
Explanation: The root is the deepest node in the tree, and it's the lca of itself.

Example 3:
Input: root = [0,1,3,null,2]
Output: [2]
Explanation: The deepest leaf node in the tree is 2, the lca of one node is itself.

Constraints:
The number of nodes in the tree will be in the range [1, 1000].
0 <= Node.val <= 1000
The values of the nodes in the tree are unique.

</> Typescript Code:
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

/**
 * Function to find the lowest common ancestor of the deepest leaves in a binary tree
 * @param root - The root node of the binary tree
 * @returns The node that is the lowest common ancestor of the deepest leaves
 */
function lcaDeepestLeaves(root: TreeNode | null): TreeNode | null {
  /**
   * Helper function using depth-first search (DFS)
   * Returns a tuple of [depth of subtree, LCA of deepest leaves in subtree]
   * @param node - Current node being processed
   * @returns Tuple containing [depth of subtree, LCA node or null]
   */
  function dfs(node: TreeNode | null): [number, TreeNode | null] {
    // Base case: If node is null, depth is 0 and there's no LCA
    if (!node) return [0, null];

    // Recursively get depth and LCA from left and right subtrees
    const [leftDepth, leftLCA] = dfs(node.left);
    const [rightDepth, rightLCA] = dfs(node.right);

    // If left subtree is deeper, return its depth + 1 and its LCA
    if (leftDepth > rightDepth) return [leftDepth + 1, leftLCA];
    // If right subtree is deeper, return its depth + 1 and its LCA
    if (rightDepth > leftDepth) return [rightDepth + 1, rightLCA];

    // If both subtrees have the same depth, the current node is the LCA
    // Return the depth + 1 and the current node as LCA
    return [leftDepth + 1, node];
  }

  // Call the helper function and return the LCA component of the result
  return dfs(root)[1];
}
