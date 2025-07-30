
/*
2419. Longest Subarray With Maximum Bitwise AND

You are given an integer array nums of size n.

Consider a non-empty subarray from nums that has the maximum possible bitwise AND.

In other words, let k be the maximum value of the bitwise AND of any subarray of nums. Then, only subarrays with a bitwise AND equal to k should be considered.
Return the length of the longest such subarray.

The bitwise AND of an array is the bitwise AND of all the numbers in it.

A subarray is a contiguous sequence of elements within an array.

Example 1:
Input: nums = [1,2,3,3,2,2]
Output: 2
Explanation:
The maximum possible bitwise AND of a subarray is 3.
The longest subarray with that value is [3,3], so we return 2.

Example 2:
Input: nums = [1,2,3,4]
Output: 1
Explanation:
The maximum possible bitwise AND of a subarray is 4.
The longest subarray with that value is [4], so we return 1.

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^6

</> Typescript Code:
*/

function longestSubarray(nums: number[]): number {
  // Step 1: Find the maximum value in the array, since we are interested
  // only in subarrays where the bitwise AND is equal to this max value.
  let maxVal = Math.max(...nums);

  // Step 2: Initialize variables to keep track of the longest subarray and
  // the current subarray length where the bitwise AND equals the maximum value.
  let longest = 0;
  let currentLen = 0;

  // Step 3: Iterate through the array to find subarrays where each element
  // equals the max value and calculate the longest length.
  for (let num of nums) {
    if (num === maxVal) {
      // If the current number equals the max value, increase the current subarray length.
      currentLen++;
      // Update the longest subarray if the current one is longer.
      longest = Math.max(longest, currentLen);
    } else {
      // Reset the current subarray length if the number doesn't match the max value.
      currentLen = 0;
    }
  }

  // Step 4: Return the longest subarray length where all elements equal the maximum value.
  return longest;
}
