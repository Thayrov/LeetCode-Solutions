/*
3660. Jump Game IX

Hint
You are given an integer array nums.
From any index i, you can jump to another index j under the following rules:
Jump to index j where j > i is allowed only if nums[j] < nums[i].
Jump to index j where j < i is allowed only if nums[j] > nums[i].
For each index i, find the maximum value in nums that can be reached by following any sequence of valid jumps starting at i.
Return an array ans where ans[i] is the maximum value reachable starting from index i.

Example 1:
Input: nums = [2,1,3]
Output: [2,2,3]
Explanation:
For i = 0: No jump increases the value.
For i = 1: Jump to j = 0 as nums[j] = 2 is greater than nums[i].
For i = 2: Since nums[2] = 3 is the maximum value in nums, no jump increases the value.
Thus, ans = [2, 2, 3].

Example 2:
Input: nums = [2,3,1]
Output: [3,3,3]
Explanation:
For i = 0: Jump forward to j = 2 as nums[j] = 1 is less than nums[i] = 2, then from i = 2 jump to j = 1 as nums[j] = 3 is greater than nums[2].
For i = 1: Since nums[1] = 3 is the maximum value in nums, no jump increases the value.
For i = 2: Jump to j = 1 as nums[j] = 3 is greater than nums[2] = 1.
Thus, ans = [3, 3, 3].

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^9

</> Typescript code:
*/

function maxValue(nums: number[]): number[] {
  // Store nums length to avoid repeated property access.
  const n = nums.length;

  // sufMin[i] is the minimum value from nums[i] to nums[n - 1].
  const sufMin = new Array<number>(n + 1);

  // ans[i] will store the maximum value reachable from index i.
  const ans = new Array<number>(n);

  // Sentinel for the empty suffix after the array.
  sufMin[n] = Infinity;

  // Build suffix minimums from right to left.
  for (let i = n - 1; i >= 0; i--) {
    // Minimum value available from current index to the end.
    sufMin[i] = Math.min(nums[i], sufMin[i + 1]);
  }

  // Start index of the current connected component.
  let start = 0;

  // Maximum value inside the current connected component.
  let max = 0;

  // Scan left to right and split only where no inversion crosses the boundary.
  for (let i = 0; i < n; i++) {
    // Update max value inside current component.
    max = Math.max(max, nums[i]);

    // If every value on the left is <= every value on the right,
    // no valid jump can cross this boundary, so the component ends here.
    if (max <= sufMin[i + 1]) {
      // Every index in this component can reach the component maximum.
      for (let j = start; j <= i; j++) ans[j] = max;

      // Next component starts after current index.
      start = i + 1;

      // Reset component maximum.
      max = 0;
    }
  }

  // Return max reachable value for every starting index.
  return ans;
}
