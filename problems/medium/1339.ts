/*
1339. Maximum Product of Splitted Binary Tree

Given the root of a binary tree, split the binary tree into two subtrees by removing one edge such that the product of the sums of the subtrees is maximized.
Return the maximum product of the sums of the two subtrees. Since the answer may be too large, return it modulo 109 + 7.

Note that you need to maximize the answer before taking the mod and not after taking it.

Example 1:
Input: root = [1,2,3,4,5,6]
Output: 110
Explanation: Remove the red edge and get 2 binary trees with sum 11 and 10. Their product is 110 (11*10)

Example 2:
Input: root = [1,null,2,3,4,null,null,5,6]
Output: 90
Explanation: Remove the red edge and get 2 binary trees with sum 15 and 6.Their product is 90 (15*6)

Constraints:
The number of nodes in the tree is in the range [2, 5 * 104].
1 <= Node.val <= 10^4

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

 function maxProduct(root: TreeNode | null): number {
     // Array to store the sum of every possible subtree encountered during traversal
     const sums: number[] = [];
     
     // Post-order traversal to calculate total sum and populate the sums array
     const getSum = (node: TreeNode | null): number => {
         // Base case: null nodes contribute 0 to the sum
         if (!node) return 0;
         // Current subtree sum = current value + left child sum + right child sum
         const subtreeSum = node.val + getSum(node.left) + getSum(node.right);
         // Store this sum to evaluate it as a potential split point later
         sums.push(subtreeSum);
         return subtreeSum;
     };
 
     // Calculate total sum of the entire tree
     const totalSum = getSum(root);
     // Use BigInt for product calculation to handle values exceeding 2^53 - 1
     let maxProd = 0n;
     const total = BigInt(totalSum);
 
     // Iterate through all recorded subtree sums to find the maximum product
     for (const s of sums) {
         const currentSum = BigInt(s);
         // Product = (Sum of Subtree A) * (Total Sum - Sum of Subtree A)
         const product = currentSum * (total - currentSum);
         // Update maxProd if the current product is larger
         if (product > maxProd) maxProd = product;
     }
 
     // Apply modulo 10^9 + 7 as required by the problem constraints
     return Number(maxProd % 1000000007n);
 }
