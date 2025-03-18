/* 
2401. Longest Nice Subarray

You are given an array nums consisting of positive integers.

We call a subarray of nums nice if the bitwise AND of every pair of elements that are in different positions in the subarray is equal to 0.

Return the length of the longest nice subarray.

A subarray is a contiguous part of an array.

Note that subarrays of length 1 are always considered nice.

Example 1:
Input: nums = [1,3,8,48,10]
Output: 3
Explanation: The longest nice subarray is [3,8,48]. This subarray satisfies the conditions:
- 3 AND 8 = 0.
- 3 AND 48 = 0.
- 8 AND 48 = 0.
It can be proven that no longer nice subarray can be obtained, so we return 3.

Example 2:
Input: nums = [3,1,5,11,13]
Output: 1
Explanation: The length of the longest nice subarray is 1. Any subarray of length 1 can be chosen.

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^9

</> Typescript code:
*/

function longestNiceSubarray(nums: number[]): number {
  // Initialize left pointer, answer, and mask to accumulate bits of the current subarray.
  let left = 0,
    ans = 0,
    mask = 0;
  // Iterate through the array with the right pointer.
  for (let right = 0; right < nums.length; right++) {
    // If adding nums[right] causes a bit conflict (i.e., common bits in mask),
    // shrink the window from the left until there is no conflict.
    while ((mask & nums[right]) !== 0) {
      // Remove the bits of the leftmost number from the mask.
      mask ^= nums[left];
      // Move the left pointer rightward to shrink the window.
      left++;
    }
    // Include the current number in the mask.
    mask |= nums[right];
    // Update the maximum length found.
    ans = Math.max(ans, right - left + 1);
  }
  // Return the length of the longest "nice" subarray.
  return ans;
}
