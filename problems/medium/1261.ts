/* 
1261. Find Elements in a Contaminated Binary Tree

Given a binary tree with the following rules:

root.val == 0
For any treeNode:
If treeNode.val has a value x and treeNode.left != null, then treeNode.left.val == 2 * x + 1
If treeNode.val has a value x and treeNode.right != null, then treeNode.right.val == 2 * x + 2
Now the binary tree is contaminated, which means all treeNode.val have been changed to -1.

Implement the FindElements class:

FindElements(TreeNode* root) Initializes the object with a contaminated binary tree and recovers it.
bool find(int target) Returns true if the target value exists in the recovered binary tree.

Example 1:
Input
["FindElements","find","find"]
[[[-1,null,-1]],[1],[2]]
Output
[null,false,true]
Explanation
FindElements findElements = new FindElements([-1,null,-1]); 
findElements.find(1); // return False 
findElements.find(2); // return True 

Example 2:
Input
["FindElements","find","find","find"]
[[[-1,-1,-1,-1,-1]],[1],[3],[5]]
Output
[null,true,true,false]
Explanation
FindElements findElements = new FindElements([-1,-1,-1,-1,-1]);
findElements.find(1); // return True
findElements.find(3); // return True
findElements.find(5); // return False

Example 3:
Input
["FindElements","find","find","find","find"]
[[[-1,null,-1,-1,null,-1]],[2],[3],[4],[5]]
Output
[null,true,false,false,true]
Explanation
FindElements findElements = new FindElements([-1,null,-1,-1,null,-1]);
findElements.find(2); // return True
findElements.find(3); // return False
findElements.find(4); // return False
findElements.find(5); // return True

Constraints:
TreeNode.val == -1
The height of the binary tree is less than or equal to 20
The total number of nodes is between [1, 10^4]
Total calls of find() is between [1, 10^4]
0 <= target <= 10^6

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

class FindElements {
  // Set to store all recovered node values for fast lookup.
  private values: Set<number>;

  // Constructor receives the contaminated binary tree's root.
  constructor(root: TreeNode | null) {
    // Initialize the set that will contain all valid node values.
    this.values = new Set<number>();
    // If the root is null, nothing to recover.
    if (!root) return;

    // Set the root value to 0 according to the problem definition.
    root.val = 0;
    // Use stack for DFS traversal starting from root.
    const stack: TreeNode[] = [root];

    // Iterate until there are no more nodes to process.
    while (stack.length) {
      // Pop a node from the stack.
      const node = stack.pop()!;
      // Add the node's value to the set.
      this.values.add(node.val);

      // If the right child exists, recover its value and push it to the stack.
      if (node.right) {
        // For right child, value = 2 * parent's value + 2.
        node.right.val = 2 * node.val + 2;
        stack.push(node.right);
      }
      // If the left child exists, recover its value and push it to the stack.
      if (node.left) {
        // For left child, value = 2 * parent's value + 1.
        node.left.val = 2 * node.val + 1;
        stack.push(node.left);
      }
    }
  }

  // The find method returns whether the given target exists in the recovered tree.
  find(target: number): boolean {
    return this.values.has(target);
  }
}

/**
 * Your FindElements object will be instantiated and called as such:
 * var obj = new FindElements(root)
 * var param_1 = obj.find(target)
 */
