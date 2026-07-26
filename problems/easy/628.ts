/*
628. Maximum Product of Three Numbers

Given an integer array nums, find three numbers whose product is maximum and return the maximum product.

Example 1:
Input: nums = [1,2,3]
Output: 6

Example 2:
Input: nums = [1,2,3,4]
Output: 24

Example 3:
Input: nums = [-1,-2,-3]
Output: -6

Constraints:
3 <= nums.length <= 10^4
-1000 <= nums[i] <= 1000

</> Typescript code:
*/

function maximumProduct(nums: number[]): number {
  // Initialize the largest value seen so far.
  let max1 = -Infinity;
  // Initialize the second-largest value seen so far.
  let max2 = -Infinity;
  // Initialize the third-largest value seen so far.
  let max3 = -Infinity;
  // Initialize the smallest value seen so far.
  let min1 = Infinity;
  // Initialize the second-smallest value seen so far.
  let min2 = Infinity;

  // Process each number once.
  for (const value of nums) {
    // Insert a new largest value at the front of the maximum slots.
    if (value > max1) {
      // Shift the previous second-largest value into third place.
      max3 = max2;
      // Shift the previous largest value into second place.
      max2 = max1;
      // Store the new largest value.
      max1 = value;
    } else if (value > max2) {
      // Shift the previous second-largest value into third place.
      max3 = max2;
      // Store the new second-largest value.
      max2 = value;
    } else if (value > max3) {
      // Store the new third-largest value.
      max3 = value;
    }

    // Insert a new smallest value at the front of the minimum slots.
    if (value < min1) {
      // Shift the previous smallest value into second place.
      min2 = min1;
      // Store the new smallest value.
      min1 = value;
    } else if (value < min2) {
      // Store the new second-smallest value.
      min2 = value;
    }
  }

  // Compare the three largest values with the largest and two smallest values.
  return Math.max(max1 * max2 * max3, max1 * min1 * min2);
}
