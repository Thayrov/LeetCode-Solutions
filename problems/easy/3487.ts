/*
3487. Maximum Unique Subarray Sum After Deletion
You are given an integer array nums.
You are allowed to delete any number of elements from nums without making it empty. After performing the deletions, select a subarray of nums such that:
All elements in the subarray are unique.
The sum of the elements in the subarray is maximized.
Return the maximum sum of such a subarray.

Example 1:
Input: nums = [1,2,3,4,5]
Output: 15
Explanation:
Select the entire array without deleting any element to obtain the maximum sum.

Example 2:
Input: nums = [1,1,0,1,1]
Output: 1
Explanation:
Delete the element nums[0] == 1, nums[1] == 1, nums[2] == 0, and nums[3] == 1. Select the entire array [1] to obtain the maximum sum.

Example 3:
Input: nums = [1,2,-1,-2,1,0,-1]
Output: 3
Explanation:
Delete the elements nums[2] == -1 and nums[3] == -2, and select the subarray [2, 1] from [1, 2, 1, 0, -1] to obtain the maximum sum.

Constraints:
1 <= nums.length <= 100
-100 <= nums[i] <= 100

</> Typescript code:
*/

function maxSum(nums: number[]): number {
    // The problem allows deleting any elements, which means we can form any
    // subsequence of the original array. The "subarray" constraint becomes trivial
    // because we can choose our subsequence to be the target unique-element sequence itself.
    // Thus, the problem is to find the maximum sum of a unique-element subsequence.

    // Step 1: Find all unique numbers in the input array.
    // A Set is a perfect data structure for this as it automatically handles uniqueness.
    const uniqueNums = new Set(nums);

    // Step 2: Calculate the sum of all unique positive numbers.
    // To maximize the sum, we should take all unique numbers that are positive.
    let positiveSum = 0;
    // This flag will track if we encounter any positive numbers.
    let hasPositive = false;

    // Iterate over each unique number found in the array.
    for (const num of uniqueNums) {
        // Check if the current number is positive.
        if (num > 0) {
            // If it is, add it to our running sum of positive numbers.
            positiveSum += num;
            // Mark that we have found at least one positive number.
            hasPositive = true;
        }
    }

    // Step 3: Determine the final result.
    // If we found at least one unique positive number...
    if (hasPositive) {
        // ...the maximum possible sum is the sum of all unique positive numbers.
        // Including any negative or zero values would only decrease or not change this sum.
        return positiveSum;
    }

    // If `hasPositive` is false, it means all unique numbers are zero or negative.
    // To get the maximum sum in this case, we should form a subsequence with the single
    // largest value (e.g., for unique numbers {-5, -2, 0}, the max sum is 0).
    // The input `nums` is guaranteed to be non-empty, so `uniqueNums` is also non-empty.
    // We use the spread syntax to pass all unique numbers to `Math.max`.
    return Math.max(...uniqueNums);
}
