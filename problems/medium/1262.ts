/*
1262. Greatest Sum Divisible by Three

Given an integer array nums, return the maximum possible sum of elements of the array such that it is divisible by three.

Example 1:
Input: nums = [3,6,5,1,8]
Output: 18
Explanation: Pick numbers 3, 6, 1 and 8 their sum is 18 (maximum sum divisible by 3).

Example 2:
Input: nums = [4]
Output: 0
Explanation: Since 4 is not divisible by 3, do not pick any number.

Example 3:
Input: nums = [1,2,3,4,4]
Output: 12
Explanation: Pick numbers 1, 3, 4 and 4 their sum is 12 (maximum sum divisible by 3).

Constraints:
1 <= nums.length <= 4 * 10^4
1 <= nums[i] <= 10^4

</> Typescript code:
*/

function maxSumDivThree(nums: number[]): number {
    // dp[i] represents the maximum sum with remainder i when divided by 3
    // dp[0] = sum divisible by 3, dp[1] = remainder 1, dp[2] = remainder 2
    // Initialize: dp[0] = 0 (empty set has sum 0, divisible by 3)
    // dp[1] and dp[2] = -Infinity (impossible states initially)
    let dp = [0, -Infinity, -Infinity];
    
    // Iterate through each number in the array
    for (const num of nums) {
        // Create a snapshot of current dp state to avoid using updated values
        const temp = [...dp];
        
        // For each possible remainder state (0, 1, 2)
        for (let i = 0; i < 3; i++) {
            // Calculate the new remainder when adding current num to previous sum
            // (temp[i] + num) % 3 gives the remainder of the new sum
            // Update dp at new remainder position with maximum of:
            // - existing value at that remainder position
            // - new sum (temp[i] + num)
            dp[(temp[i] + num) % 3] = Math.max(dp[(temp[i] + num) % 3], temp[i] + num);
        }
    }
    
    // Return the maximum sum with remainder 0 (divisible by 3)
    return dp[0];
}
