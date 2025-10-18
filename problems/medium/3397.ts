/*
3397. Maximum Number of Distinct Elements After Operations

You are given an integer array nums and an integer k.
You are allowed to perform the following operation on each element of the array at most once:
Add an integer in the range [-k, k] to the element.
Return the maximum possible number of distinct elements in nums after performing the operations.

Example 1:
Input: nums = [1,2,2,3,3,4], k = 2
Output: 6
Explanation:
nums changes to [-1, 0, 1, 2, 3, 4] after performing operations on the first four elements.

Example 2:
Input: nums = [4,4,4,4], k = 1
Output: 3
Explanation:
By adding -1 to nums[0] and 1 to nums[1], nums changes to [3, 5, 4, 4].

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^9
0 <= k <= 10^9

</> Typescript code:
*/

function maxDistinctElements(nums: number[], k: number): number {
    // Sort array to process elements in ascending order, enabling greedy assignment
    nums.sort((a, b) => a - b);
    
    // Track the last value we assigned to ensure all elements are distinct
    let last = -Infinity;
    
    // Count of distinct elements we can create
    let count = 0;
    
    // Process each element in sorted order
    for (let num of nums) {
        // Calculate the valid range for this element after operation
        const minVal = num - k;
        const maxVal = num + k;
        
        // Greedily choose the smallest valid value that's greater than last
        // This maximizes our chances of fitting subsequent elements
        const target = Math.max(minVal, last + 1);
        
        // Check if we can place this element distinctly within its valid range
        if (target <= maxVal) {
            // Update last assigned value
            last = target;
            // Increment count of distinct elements
            count++;
        }
        // If target > maxVal, we can't make this element distinct, skip it
    }
    
    // Return the maximum number of distinct elements achievable
    return count;
}
