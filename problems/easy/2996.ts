/*
2996. Smallest Missing Integer Greater Than Sequential Prefix Sum

You are given a 0-indexed array of integers nums.

A prefix nums[0..i] is sequential if, for all 1 <= j <= i, nums[j] = nums[j - 1] + 1. In particular, the prefix consisting only of nums[0] is sequential.

Return the smallest integer x missing from nums such that x is greater than or equal to the sum of the longest sequential prefix.

Example 1:
Input: nums = [1,2,3,2,5]
Output: 6
Explanation: The longest sequential prefix of nums is [1,2,3] with a sum of 6. 6 is not in the array, therefore 6 is the smallest missing integer greater than or equal to the sum of the longest sequential prefix.

Example 2:
Input: nums = [3,4,5,1,12,14,13]
Output: 15
Explanation: The longest sequential prefix of nums is [3,4,5] with a sum of 12. 12, 13, and 14 belong to the array while 15 does not. Therefore 15 is the smallest missing integer greater than or equal to the sum of the longest sequential prefix.

Constraints:
1 <= nums.length <= 50
1 <= nums[i] <= 50

</> Typescript code:
*/

function missingInteger(nums: number[]): number {
  // Initialize the longest sequential prefix sum with its mandatory first element.
  let prefixSum = nums[0];

  // Extend the prefix only while consecutive values increase by exactly one.
  for (let i = 1; i < nums.length && nums[i] === nums[i - 1] + 1; ++i) {
    // Add each qualifying prefix value to the required lower bound.
    prefixSum += nums[i];
  }

  // Allocate a fixed-size presence table covering every permitted input value.
  const present = new Uint8Array(51);

  // Record each array value for constant-time membership checks.
  for (const value of nums) {
    // Mark this permitted value as present.
    present[value] = 1;
  }

  // Advance through present candidates while they remain within the input-value bound.
  while (prefixSum <= 50 && present[prefixSum]) {
    // Test the next integer as the smallest remaining candidate.
    ++prefixSum;
  }

  // Return the first candidate absent from the array.
  return prefixSum;
}
