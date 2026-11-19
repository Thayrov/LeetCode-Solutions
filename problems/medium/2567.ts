/*
2567. Minimum Score by Changing Two Elements

You are given an integer array nums.

The low score of nums is the minimum absolute difference between any two integers.
The high score of nums is the maximum absolute difference between any two integers.
The score of nums is the sum of the high and low scores.

Return the minimum score after changing two elements of nums.

Example 1:
Input: nums = [1,4,7,8,5]
Output: 3
Explanation:
Change nums[0] and nums[1] to be 6 so that nums becomes [6,6,7,8,5].
The low score is the minimum absolute difference: |6 - 6| = 0.
The high score is the maximum absolute difference: |8 - 5| = 3.
The sum of high and low score is 3.

Example 2:
Input: nums = [1,4,3]
Output: 0
Explanation:
Change nums[1] and nums[2] to 1 so that nums becomes [1,1,1].
The sum of maximum absolute difference and minimum absolute difference is 0.

Constraints:
3 <= nums.length <= 10^5
1 <= nums[i] <= 10^9

</> Typescript code:
*/

// Return the smallest score achievable with two replacements.
function minimizeSum(nums: number[]): number {
  // With one retained value, both replacements can make all entries equal.
  if (nums.length === 3) return 0;

  // Track the three smallest values, counting duplicates separately.
  let lo1 = Infinity, lo2 = Infinity, lo3 = Infinity;
  // Track the three largest values, counting duplicates separately.
  let hi1 = -Infinity, hi2 = -Infinity, hi3 = -Infinity;

  // Update both sets of extrema in one pass without modifying the input.
  for (const x of nums) {
    // A value that cannot enter the smallest three needs no shifts.
    if (x < lo3) {
      // A new minimum displaces both runners-up.
      if (x < lo1) {
        // Shift the old second-smallest into third place.
        lo3 = lo2;
        // Shift the old minimum into second place.
        lo2 = lo1;
        // Record the new minimum.
        lo1 = x;
      // Otherwise, check whether the value enters in second place.
      } else if (x < lo2) {
        // Keep the old second-smallest as the third-smallest.
        lo3 = lo2;
        // Record the new second-smallest.
        lo2 = x;
      } else {
        // Only the third-smallest changes.
        lo3 = x;
      }
    }

    // A value that cannot enter the largest three needs no shifts.
    if (x > hi3) {
      // A new maximum displaces both runners-up.
      if (x > hi1) {
        // Shift the old second-largest into third place.
        hi3 = hi2;
        // Shift the old maximum into second place.
        hi2 = hi1;
        // Record the new maximum.
        hi1 = x;
      // Otherwise, check whether the value enters in second place.
      } else if (x > hi2) {
        // Keep the old second-largest as the third-largest.
        hi3 = hi2;
        // Record the new second-largest.
        hi2 = x;
      } else {
        // Only the third-largest changes.
        hi3 = x;
      }
    }
  }

  // Remove two low, one from each end, or two high; copies make the low score zero.
  return Math.min(hi1 - lo3, hi2 - lo2, hi3 - lo1);
}
