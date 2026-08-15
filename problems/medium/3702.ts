/*
3702. Longest Subsequence With Non-Zero Bitwise XOR

You are given an integer array nums.

Return the length of the longest subsequence in nums whose bitwise XOR is non-zero. If no such subsequence exists, return 0.

A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

Example 1:
Input: nums = [1,2,3]
Output: 2
Explanation:
One longest subsequence is [2, 3]. The bitwise XOR is computed as 2 XOR 3 = 1, which is non-zero.

Example 2:
Input: nums = [2,3,4]
Output: 3
Explanation:
The longest subsequence is [2, 3, 4]. The bitwise XOR is computed as 2 XOR 3 XOR 4 = 5, which is non-zero.

Constraints:
1 <= nums.length <= 10^5
0 <= nums[i] <= 10^9

</> Typescript code:
*/

function longestSubsequence(nums: number[]): number {
  // Hold the XOR of the complete array.
  let xor = 0;
  // Combine all set bits to detect whether any value is non-zero.
  let nonZeroBits = 0;

  // Process every value once.
  for (const num of nums) {
    // Fold this value into the complete-array XOR.
    xor ^= num;
    // Preserve every bit that appears in at least one value.
    nonZeroBits |= num;
  }

  // Keep every element when their XOR is already non-zero.
  if (xor !== 0) return nums.length;
  // Remove one non-zero element to make a zero total XOR non-zero.
  if (nonZeroBits !== 0) return nums.length - 1;
  // No valid non-zero-XOR subsequence exists when all values are zero.
  return 0;
}
