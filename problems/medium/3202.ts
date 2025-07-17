/*
3202. Find the Maximum Length of Valid Subsequence II

You are given an integer array nums and a positive integer k.
A subsequence sub of nums with length x is called valid if it satisfies:
(sub[0] + sub[1]) % k == (sub[1] + sub[2]) % k == ... == (sub[x - 2] + sub[x - 1]) % k.
Return the length of the longest valid subsequence of nums.

Example 1:
Input: nums = [1,2,3,4,5], k = 2
Output: 5
Explanation:
The longest valid subsequence is [1, 2, 3, 4, 5].

Example 2:
Input: nums = [1,4,2,3,1,4], k = 3
Output: 4
Explanation:
The longest valid subsequence is [1, 4, 1, 4].

Constraints:
2 <= nums.length <= 10^3
1 <= nums[i] <= 10^7
1 <= k <= 10^3

</> Typescript code:
*/

function maximumLength(nums: number[], k: number): number {
    // Track the maximum length found across all possible remainders
    let maxLen = 0;

    // Try each possible remainder r from 0 to k-1
    // We want (sub[i] + sub[i+1]) % k == r for all consecutive pairs
    for (let r = 0; r < k; r++) {
        // dp[i] = length of longest valid subsequence ending with a number having remainder i
        const dp = new Array(k).fill(0);

        // Process each number in the array
        for (const num of nums) {
            // Get the remainder when num is divided by k
            const mod = num % k;

            // If we want (prev + current) % k == r, and current % k == mod,
            // then prev % k must equal (r - mod + k) % k
            const prev = (r - mod + k) % k;

            // Update dp[mod] to be the maximum of:
            // 1. Its current value (subsequence ending at mod without using this number)
            // 2. dp[prev] + 1 (extending the best subsequence ending at prev)
            dp[mod] = Math.max(dp[mod], dp[prev] + 1);
        }

        // Check all possible ending remainders for this r and update global maximum
        for (let i = 0; i < k; i++) {
            maxLen = Math.max(maxLen, dp[i]);
        }
    }

    // Return the maximum length found across all possible remainders
    return maxLen;
}