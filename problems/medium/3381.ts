/*
3381. Maximum Subarray Sum With Length Divisible by K

You are given an array of integers nums and an integer k.
Return the maximum sum of a subarray of nums, such that the size of the subarray is divisible by k.

Example 1:
Input: nums = [1,2], k = 1
Output: 3
Explanation:
The subarray [1, 2] with sum 3 has length equal to 2 which is divisible by 1.

Example 2:
Input: nums = [-1,-2,-3,-4,-5], k = 4
Output: -10
Explanation:
The maximum sum subarray is [-1, -2, -3, -4] which has length equal to 4 which is divisible by 4.

Example 3:
Input: nums = [-5,1,2,-3,4], k = 2
Output: 4
Explanation:
The maximum sum subarray is [1, 2, -3, 4] which has length equal to 4 which is divisible by 2.

Constraints:
1 <= k <= nums.length <= 2 * 10^5
-109 <= nums[i] <= 10^9

</> Typescript code:
*/

function maxSubarraySum(nums: number[], k: number): number {
    // Store the length of the input array
    const n = nums.length;
    
    // Create prefix sum array where prefix[i] = sum of nums[0..i-1]
    const prefix = new Array(n + 1).fill(0);
    
    // Build the prefix sum array
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }
    
    // Initialize the maximum sum to negative infinity
    let maxSum = -Infinity;
    
    // Track the minimum prefix sum for each remainder (mod k)
    // minPrefix[r] stores the minimum prefix sum at positions with remainder r when divided by k
    const minPrefix = new Array(k).fill(Infinity);
    
    // Base case: prefix sum at position 0 is 0, which has remainder 0
    minPrefix[0] = 0;
    
    // Iterate through each position in the prefix array
    for (let i = 1; i <= n; i++) {
        // Calculate the remainder when position i is divided by k
        const mod = i % k;
        
        // If we've seen this remainder before, calculate the subarray sum
        // Sum from position j to i-1 = prefix[i] - prefix[j]
        // This subarray has length (i - j) which is divisible by k (same remainder)
        if (minPrefix[mod] !== Infinity) {
            maxSum = Math.max(maxSum, prefix[i] - minPrefix[mod]);
        }
        
        // Update the minimum prefix sum for this remainder
        minPrefix[mod] = Math.min(minPrefix[mod], prefix[i]);
    }
    
    // Return the maximum sum found
    return maxSum;
}
