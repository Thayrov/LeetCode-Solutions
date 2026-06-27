/*
3020. Find the Maximum Number of Elements in Subset

Hint
You are given an array of positive integers nums.
You need to select a subset of nums which satisfies the following condition:
You can place the selected elements in a 0-indexed array such that it follows the pattern: [x, x2, x4, ..., xk/2, xk, xk/2, ..., x4, x2, x] (Note that k can be be any non-negative power of 2). For example, [2, 4, 16, 4, 2] and [3, 9, 3] follow the pattern while [2, 4, 8, 4, 2] does not.
Return the maximum number of elements in a subset that satisfies these conditions.

Example 1:
Input: nums = [5,4,1,2,2]
Output: 3
Explanation: We can select the subset {4,2,2}, which can be placed in the array as [2,4,2] which follows the pattern and 22 == 4. Hence the answer is 3.

Example 2:
Input: nums = [1,3,2,4]
Output: 1
Explanation: We can select the subset {1}, which can be placed in the array as [1] which follows the pattern. Hence the answer is 1. Note that we could have also selected the subsets {2}, {3}, or {4}, there may be multiple subsets which provide the same answer. 

Constraints:
2 <= nums.length <= 10^5
1 <= nums[i] <= 10^9

</> Typescript code:
*/

function maximumLength(nums: number[]): number {
  // Stores how many times each value appears.
  const cnt = new Map<number, number>();

  // Stores the best valid subset length found.
  let ans = 1;

  // Count every number frequency.
  for (const num of nums) cnt.set(num, (cnt.get(num) ?? 0) + 1);

  // Get the amount of ones, since 1^2 is still 1.
  const ones = cnt.get(1) ?? 0;

  // A valid all-ones pattern must have odd length.
  if (ones) ans = Math.max(ans, ones % 2 ? ones : ones - 1);

  // Try every distinct number as the starting x.
  for (const x of cnt.keys()) {
    // One is handled separately to avoid infinite squaring.
    if (x === 1) continue;

    // Current value in the chain: x, x^2, x^4, ...
    let cur = x;

    // Current pattern length using pairs on both sides.
    let len = 0;

    // Every non-center value must appear twice.
    while ((cnt.get(cur) ?? 0) >= 2) {
      // Add one value to the left side and one to the right side.
      len += 2;

      // If cur^2 exceeds max possible nums[i], it cannot exist in the map.
      if (cur > 31623) {
        // Force next lookup to fail safely without unsafe integer squaring.
        cur = Number.MAX_SAFE_INTEGER;

        // Stop extending the chain.
        break;
      }

      // Move to the next squared value.
      cur *= cur;
    }

    // If current exists, it can be the center; otherwise remove the last unusable pair.
    ans = Math.max(ans, len + ((cnt.get(cur) ?? 0) > 0 ? 1 : -1));
  }

  // Return the maximum valid odd pattern length.
  return ans;
}
