/*
3578. Count Partitions With Max-Min Difference at Most K

You are given an integer array nums and an integer k. Your task is to partition nums into one or more non-empty contiguous segments such that in each segment, the difference between its maximum and minimum elements is at most k.
Return the total number of ways to partition nums under this condition.
Since the answer may be too large, return it modulo 109 + 7.

Example 1:
Input: nums = [9,4,1,3,7], k = 4
Output: 6
Explanation:
There are 6 valid partitions where the difference between the maximum and minimum elements in each segment is at most k = 4:
[[9], [4], [1], [3], [7]]
[[9], [4], [1], [3, 7]]
[[9], [4], [1, 3], [7]]
[[9], [4, 1], [3], [7]]
[[9], [4, 1], [3, 7]]
[[9], [4, 1, 3], [7]]

Example 2:
Input: nums = [3,3,4], k = 0
Output: 2
Explanation:
There are 2 valid partitions that satisfy the given conditions:
[[3], [3], [4]]
[[3, 3], [4]]

</> Typescript code:
*/

function countPartitions(nums: number[], k: number): number {
    // Define modulo constant for large number handling
    const MOD = 1000000007;
    // Get array length
    const n = nums.length;
    // dp[i] represents number of ways to partition nums[0..i-1]
    const dp = new Array(n + 1).fill(0);
    // Base case: one way to partition empty array
    dp[0] = 1;
    // prefix[i] stores sum of dp[0..i-1] for O(1) range sum queries
    const prefix = new Array(n + 2).fill(0);
    // Initialize prefix sum with base case
    prefix[1] = 1;
    // Monotonic decreasing deque to track maximum element indices
    const maxDeque: number[] = [];
    // Monotonic increasing deque to track minimum element indices
    const minDeque: number[] = [];
    // Left boundary of valid segment window
    let left = 0;
    // Iterate through each position as potential segment end
    for (let right = 0; right < n; right++) {
        // Maintain decreasing order in maxDeque by removing smaller elements
        while (maxDeque.length && nums[maxDeque[maxDeque.length - 1]] <= nums[right]) maxDeque.pop();
        // Add current index to maxDeque
        maxDeque.push(right);
        // Maintain increasing order in minDeque by removing larger elements
        while (minDeque.length && nums[minDeque[minDeque.length - 1]] >= nums[right]) minDeque.pop();
        // Add current index to minDeque
        minDeque.push(right);
        // Shrink window from left until max-min constraint is satisfied
        while (nums[maxDeque[0]] - nums[minDeque[0]] > k) {
            // Move left boundary forward
            left++;
            // Remove indices that are now outside the window from maxDeque
            while (maxDeque.length && maxDeque[0] < left) maxDeque.shift();
            // Remove indices that are now outside the window from minDeque
            while (minDeque.length && minDeque[0] < left) minDeque.shift();
        }
        // Calculate dp[right+1] as sum of all valid starting positions using prefix sums
        dp[right + 1] = (prefix[right + 1] - prefix[left] + MOD) % MOD;
        // Update prefix sum array for future range queries
        prefix[right + 2] = (prefix[right + 1] + dp[right + 1]) % MOD;
    }
    // Return total number of valid partitions for entire array
    return dp[n];
}
