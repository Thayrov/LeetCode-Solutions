/*
1979. Find Greatest Common Divisor of Array

Given an integer array nums, return the greatest common divisor of the smallest number and largest number in nums.

The greatest common divisor of two numbers is the largest positive integer that evenly divides both numbers.

Example 1:
Input: nums = [2,5,6,9,10]
Output: 2
Explanation: The smallest number in nums is 2. The largest number in nums is 10. The greatest common divisor of 2 and 10 is 2.

Example 2:
Input: nums = [7,5,6,8,3]
Output: 1
Explanation: The smallest number in nums is 3. The largest number in nums is 8. The greatest common divisor of 3 and 8 is 1.

Example 3:
Input: nums = [3,3]
Output: 3
Explanation: The smallest number in nums is 3. The largest number in nums is 3. The greatest common divisor of 3 and 3 is 3.

Constraints:
2 <= nums.length <= 1000
1 <= nums[i] <= 1000

</> Typescript code:
*/

// Return the GCD of the array's minimum and maximum values.
function findGCD(nums: number[]): number {
  // Initialize the minimum with the first value.
  let min = nums[0];
  // Initialize the maximum with the first value.
  let max = nums[0];

  // Scan every remaining value once.
  for (let i = 1; i < nums.length; i++) {
    // Cache the current value for comparisons.
    const value = nums[i];

    // Update the matching extremum for this value.
    if (value < min) {
      // Replace the current minimum.
      min = value;
    } else if (value > max) {
      // Replace the current maximum.
      max = value;
    }
  }

  // Apply Euclid's algorithm until the remainder vanishes.
  while (min !== 0) {
    // Compute the next Euclidean remainder.
    const remainder = max % min;
    // Shift the divisor into the dividend slot.
    max = min;
    // Continue with the smaller remainder.
    min = remainder;
  }

  // Return the final nonzero divisor.
  return max;
}
