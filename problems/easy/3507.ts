/*
3507. Minimum Pair Removal to Sort Array I

Given an array nums, you can perform the following operation any number of times:
Select the adjacent pair with the minimum sum in nums. If multiple such pairs exist, choose the leftmost one.
Replace the pair with their sum.
Return the minimum number of operations needed to make the array non-decreasing.
An array is said to be non-decreasing if each element is greater than or equal to its previous element (if it exists).

Example 1:
Input: nums = [5,2,3,1]
Output: 2
Explanation:
The pair (3,1) has the minimum sum of 4. After replacement, nums = [5,2,4].
The pair (2,4) has the minimum sum of 6. After replacement, nums = [5,6].
The array nums became non-decreasing in two operations.

Example 2:
Input: nums = [1,2,2]
Output: 0
Explanation:
The array nums is already sorted.

Constraints:
1 <= nums.length <= 50
-1000 <= nums[i] <= 1000

</> Typescript code:
*/

function minimumPairRemoval(nums: number[]): number {
    // Initialize a counter to track the number of merge operations performed
    let ops = 0;

    // Continue the simulation until the non-decreasing condition is met
    while (true) {
        let isSorted = true;
        // Check if the current array is non-decreasing (nums[i] <= nums[i+1])
        for (let i = 0; i < nums.length - 1; i++) {
            if (nums[i] > nums[i + 1]) {
                isSorted = false;
                break;
            }
        }
        // If the array is sorted, return the total count of operations
        if (isSorted) return ops;

        // Variables to track the minimum pair sum and its leftmost index
        let minSum = Infinity;
        let idx = -1;

        // Iterate through all adjacent pairs to find the smallest sum
        for (let i = 0; i < nums.length - 1; i++) {
            const sum = nums[i] + nums[i + 1];
            // Update if a strictly smaller sum is found (ensures leftmost choice)
            if (sum < minSum) {
                minSum = sum;
                idx = i;
            }
        }
        
        // Remove the two elements at idx and replace them with their combined sum
        nums.splice(idx, 2, minSum);
        // Increment the operation count for the performed merge
        ops++;
    }
}
