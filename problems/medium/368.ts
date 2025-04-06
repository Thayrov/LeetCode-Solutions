/* 
368. Largest Divisible Subset

Given a set of distinct positive integers nums, return the largest subset answer such that every pair (answer[i], answer[j]) of elements in this subset satisfies:

answer[i] % answer[j] == 0, or
answer[j] % answer[i] == 0
If there are multiple solutions, return any of them.

Example 1:
Input: nums = [1,2,3]
Output: [1,2]
Explanation: [1,3] is also accepted.

Example 2:
Input: nums = [1,2,4,8]
Output: [1,2,4,8]

Constraints:
1 <= nums.length <= 1000
1 <= nums[i] <= 2 * 10^9
All the integers in nums are unique.

</> Typescript code:
*/

function largestDivisibleSubset(nums: number[]): number[] {
  // Handle edge case: empty array
  if (nums.length === 0) return [];

  // Sort the array to ensure we check smaller numbers before larger ones
  // This is critical since if a % b = 0, then a must be greater than b
  nums.sort((a, b) => a - b);

  // dp[i] stores the length of the largest divisible subset ending with nums[i]
  const dp: number[] = Array(nums.length).fill(1);

  // prev[i] stores the index of the previous element in the largest subset ending with nums[i]
  // Used to reconstruct the actual subset at the end
  const prev: number[] = Array(nums.length).fill(-1);

  // Track the maximum subset length and its ending index
  let maxLen = 1;
  let maxIdx = 0;

  // For each number, find the largest divisible subset that can include this number
  for (let i = 1; i < nums.length; i++) {
    // Check all previous numbers to see if they can form a divisible pair with nums[i]
    for (let j = 0; j < i; j++) {
      // If nums[i] is divisible by nums[j] and adding nums[i] to the subset ending at nums[j]
      // results in a larger subset than what we currently have for nums[i]
      if (nums[i] % nums[j] === 0 && dp[j] + 1 > dp[i]) {
        // Update the length of the largest subset ending with nums[i]
        dp[i] = dp[j] + 1;
        // Record that nums[j] comes before nums[i] in this subset
        prev[i] = j;

        // Update the global maximum if this subset is larger
        if (dp[i] > maxLen) {
          maxLen = dp[i];
          maxIdx = i;
        }
      }
    }
  }

  // Reconstruct the largest divisible subset using the prev array
  const result: number[] = [];
  while (maxIdx !== -1) {
    // Add the current number to the front of our result array
    result.unshift(nums[maxIdx]);
    // Move to the previous number in the subset
    maxIdx = prev[maxIdx];
  }

  return result;
}
