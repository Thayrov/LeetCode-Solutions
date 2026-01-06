/*
1161. Maximum Level Sum of a Binary Tree

Given the root of a binary tree, the level of its root is 1, the level of its children is 2, and so on.
Return the smallest level x such that the sum of all the values of nodes at level x is maximal.

Example 1:
Input: root = [1,7,0,7,-8,null,null]
Output: 2
Explanation: 
Level 1 sum = 1.
Level 2 sum = 7 + 0 = 7.
Level 3 sum = 7 + -8 = -1.
So we return the level with the maximum sum which is level 2.

Example 2:
Input: root = [989,null,10250,98693,-89388,null,null,null,-32127]
Output: 2

Constraints:
The number of nodes in the tree is in the range [1, 10^4].
-105 <= Node.val <= 10^5

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

 function maxLevelSum(root: TreeNode | null): number {
     // Return 0 if the tree is empty (though constraints say at least 1 node)
     if (!root) return 0;
 
     // Initialize maxSum to -Infinity to handle trees with only negative values
     let maxSum = -Infinity;
     // Track the level with the maximum sum found so far
     let maxLevel = 1;
     // Current depth tracker
     let currentLevel = 1;
     // BFS Queue: starting with the root node
     let queue = [root];
 
     while (queue.length > 0) {
         // Accumulator for the values of all nodes at the current level
         let levelSum = 0;
         // Temporary storage for the nodes of the next level to avoid shifting the main queue
         const nextQueue: TreeNode[] = [];
         const len = queue.length;
 
         // Process all nodes currently in the queue (all nodes at the same depth)
         for (let i = 0; i < len; i++) {
             const node = queue[i];
             // Add node value to the level total
             levelSum += node.val;
             
             // If children exist, push them into the buffer for the next iteration
             if (node.left) nextQueue.push(node.left);
             if (node.right) nextQueue.push(node.right);
         }
 
         // If current level's sum is strictly greater, update maxSum and record the level
         // (Strictly greater handles the "smallest level" requirement if sums are equal)
         if (levelSum > maxSum) {
             maxSum = levelSum;
             maxLevel = currentLevel;
         }
 
         // Replace processed level with the next level and increment level counter
         queue = nextQueue;
         currentLevel++;
     }
 
     return maxLevel;
 };
