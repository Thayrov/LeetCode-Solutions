/*
3432. Count Partitions with Even Sum Difference

You are given an integer array nums of length n.
A partition is defined as an index i where 0 <= i < n - 1, splitting the array into two non-empty subarrays such that:
Left subarray contains indices [0, i].
Right subarray contains indices [i + 1, n - 1].
Return the number of partitions where the difference between the sum of the left and right subarrays is even.

Example 1:
Input: nums = [10,10,3,7,6]
Output: 4
Explanation:
The 4 partitions are:
[10], [10, 3, 7, 6] with a sum difference of 10 - 26 = -16, which is even.
[10, 10], [3, 7, 6] with a sum difference of 20 - 16 = 4, which is even.
[10, 10, 3], [7, 6] with a sum difference of 23 - 13 = 10, which is even.
[10, 10, 3, 7], [6] with a sum difference of 30 - 6 = 24, which is even.

Example 2:
Input: nums = [1,2,2]
Output: 0
Explanation:
No partition results in an even sum difference.

Example 3:
Input: nums = [2,4,6,8]
Output: 3
Explanation:
All partitions result in an even sum difference.

Constraints:
2 <= n == nums.length <= 100
1 <= nums[i] <= 100

</> Typescript code:
*/

function countPartitions(nums: number[]): number {
    // Initialize a variable to hold the total sum of the array elements.
    // We use a simple number type for O(1) space complexity.
    let s = 0;

    // Iterate through the entire array exactly once to calculate the total sum.
    // This provides a linear Time Complexity of O(n).
    // A standard for-loop is chosen over .reduce() for raw performance in JS/TS engines.
    for (let i = 0; i < nums.length; i++) {
        // Accumulate the current element into the total sum.
        s += nums[i];
    }

    // Mathematical Optimization Logic:
    // The difference between Left Sum (L) and Right Sum (R) is: L - R.
    // Since R = Total - L, the difference is L - (Total - L) = 2*L - Total.
    // 2*L is guaranteed to be even. Therefore, (2*L - Total) is even ONLY if Total is even.
    
    // We check if the total sum 's' is even using the bitwise AND operator (& 1).
    // (s & 1) === 0 checks the least significant bit; it is computationally faster than modulo (%).
    // If sum is even: Every possible partition results in an even difference. 
    //                 There are (nums.length - 1) valid partitions.
    // If sum is odd:  No partition results in an even difference. Return 0.
    return (s & 1) === 0 ? nums.length - 1 : 0;
};
