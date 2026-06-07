/*
2196. Create Binary Tree From Descriptions

You are given a 2D integer array descriptions where descriptions[i] = [parenti, childi, isLefti] indicates that parenti is the parent of childi in a binary tree of unique values. Furthermore,

If isLefti == 1, then childi is the left child of parenti.
If isLefti == 0, then childi is the right child of parenti.
Construct the binary tree described by descriptions and return its root.

The test cases will be generated such that the binary tree is valid.

Example 1:
Input: descriptions = [[20,15,1],[20,17,0],[50,20,1],[50,80,0],[80,19,1]]
Output: [50,20,80,15,17,19]
Explanation: The root node is the node with value 50 since it has no parent.
The resulting binary tree is shown in the diagram.

Example 2:
Input: descriptions = [[1,2,1],[2,3,0],[3,4,1]]
Output: [1,2,null,null,3,4]
Explanation: The root node is the node with value 1 since it has no parent.
The resulting binary tree is shown in the diagram.

Constraints:
1 <= descriptions.length <= 10^4
descriptions[i].length == 3
1 <= parenti, childi <= 10^5
0 <= isLefti <= 1
The binary tree described by descriptions is valid.

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

function createBinaryTree(descriptions: number[][]): TreeNode | null {
  // Map to store created nodes
  const nodes: Map<number, TreeNode> = new Map();
  // Set to keep track of child nodes
  const children: Set<number> = new Set();

  // Iterate over each description
  for (const [parentVal, childVal, isLeft] of descriptions) {
    // If the parent node doesn't exist, create it
    if (!nodes.has(parentVal)) nodes.set(parentVal, new TreeNode(parentVal));
    // If the child node doesn't exist, create it
    if (!nodes.has(childVal)) nodes.set(childVal, new TreeNode(childVal));

    // Retrieve the parent and child nodes from the map
    const parent = nodes.get(parentVal)!;
    const child = nodes.get(childVal)!;

    // Link the child to the parent appropriately
    if (isLeft) {
      parent.left = child;
    } else {
      parent.right = child;
    }

    // Mark the child node
    children.add(childVal);
  }

  // Find the root node (the one not marked as any child)
  for (const [parentVal, ,] of descriptions) {
    if (!children.has(parentVal)) {
      return nodes.get(parentVal)!;
    }
  }

  // In case no root is found, return null
  return null;
}
