/*
300. Longest Increasing Subsequence

Given an integer array nums, return the length of the longest strictly increasing subsequence.

Example 1:
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.

Example 2:
Input: nums = [0,1,0,3,2,3]
Output: 4

Example 3:
Input: nums = [7,7,7,7,7,7,7]
Output: 1

Constraints:
1 <= nums.length <= 2500
-10^4 <= nums[i] <= 10^4

Follow-up: Can you come up with an algorithm that runs in O(n log(n)) time complexity?

</> Typescript code:
*/

function lengthOfLIS(nums: number[]): number {
  // Store the smallest tail value for each increasing subsequence length.
  const tails: number[] = [];
  // Process each input value in order.
  for (let i = 0; i < nums.length; i++) {
    // Read the current value for comparison and insertion.
    const value = nums[i];
    // Extend the longest subsequence when the value exceeds every stored tail.
    if (tails.length === 0 || value > tails[tails.length - 1]) {
      // Add this value as the new longest subsequence tail.
      tails.push(value);
      // Skip the search because this value extends the sequence.
      continue;
    }
    // Search for the first tail that is not smaller than this value.
    let left = 0;
    let right = tails.length - 1; // Set the upper candidate bound.
    // Narrow the candidate interval until the replacement position is found.
    while (left < right) {
      // Choose the midpoint without risking arithmetic overflow.
      const mid = (left + right) >>> 1;
      // Keep only tails that could still be the first value >= current value.
      if (tails[mid] < value) left = mid + 1;
      else right = mid;
    }
    // Replace the tail to preserve the best chance of future extensions.
    tails[left] = value;
  }
  // The number of stored tails equals the longest strictly increasing length.
  return tails.length;
}
