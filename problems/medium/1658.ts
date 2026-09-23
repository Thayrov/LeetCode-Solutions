/*
1658. Minimum Operations to Reduce X to Zero

You are given an integer array nums and an integer x. In one operation, you can either remove the leftmost or the rightmost element from the array nums and subtract its value from x. Note that this modifies the array for future operations.

Return the minimum number of operations to reduce x to exactly 0 if it is possible, otherwise, return -1.

Example 1:
Input: nums = [1,1,4,2,3], x = 5
Output: 2
Explanation: The optimal solution is to remove the last two elements to reduce x to zero.

Example 2:
Input: nums = [5,6,7,8,9], x = 4
Output: -1

Example 3:
Input: nums = [3,2,20,1,1,3], x = 10
Output: 5
Explanation: The optimal solution is to remove the last three elements and the first two elements (5 operations in total) to reduce x to zero.

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^4
1 <= x <= 10^9

</> Typescript code:
*/

function minOperations(nums: number[], x: number): number {
  // Accumulate total sum of all elements.
  let total = 0;
  // Sum array to derive complement target.
  for (let i = 0; i < nums.length; i++) total += nums[i];
  // Complement sum that must remain as middle subarray.
  const target = total - x;
  // Total below x can never reach exactly zero.
  if (target < 0) return -1;
  // Zero remainder means take the whole array.
  if (target === 0) return nums.length;
  // Longest middle subarray found, -1 means none yet.
  let maxLen = -1;
  // Current sliding window sum.
  let sum = 0;
  // Left edge of sliding window.
  let left = 0;
  // Expand right edge over the array.
  for (let right = 0; right < nums.length; right++) {
    // Include right element in window.
    sum += nums[right];
    // Shrink while window exceeds target, safe as values are positive.
    while (sum > target && left <= right) {
      // Drop left element from sum.
      sum -= nums[left];
      // Advance left boundary.
      left++;
    }
    // Check for exact complement match.
    if (sum === target) {
      // Length of current matching window.
      const len = right - left + 1;
      // Keep longest match for fewest removals.
      if (len > maxLen) maxLen = len;
    }
  }
  // Convert longest kept middle to fewest removals, else impossible.
  return maxLen === -1 ? -1 : nums.length - maxLen;
}
