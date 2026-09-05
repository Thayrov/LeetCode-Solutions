/*
3904. Smallest Stable Index II

You are given an integer array nums of length n and an integer k.
For each index i, define its instability score as max(nums[0..i]) - min(nums[i..n - 1]).

In other words:
- max(nums[0..i]) is the largest value among the elements from index 0 to index i.
- min(nums[i..n - 1]) is the smallest value among the elements from index i to index n - 1.

An index i is called stable if its instability score is less than or equal to k.
Return the smallest stable index. If no such index exists, return -1.

Example 1:
Input: nums = [5,0,1,4], k = 3
Output: 3
Explanation:
- At index 0: The maximum in [5] is 5, and the minimum in [5, 0, 1, 4] is 0, so the instability score is 5 - 0 = 5.
- At index 1: The maximum in [5, 0] is 5, and the minimum in [0, 1, 4] is 0, so the instability score is 5 - 0 = 5.
- At index 2: The maximum in [5, 0, 1] is 5, and the minimum in [1, 4] is 1, so the instability score is 5 - 1 = 4.
- At index 3: The maximum in [5, 0, 1, 4] is 5, and the minimum in [4] is 4, so the instability score is 5 - 4 = 1.
- This is the first index with an instability score less than or equal to k = 3. Thus, the answer is 3.

Example 2:
Input: nums = [3,2,1], k = 1
Output: -1
Explanation:
- At index 0, the instability score is 3 - 1 = 2.
- At index 1, the instability score is 3 - 1 = 2.
- At index 2, the instability score is 3 - 1 = 2.
- None of these values is less than or equal to k = 1, so the answer is -1.

Example 3:
Input: nums = [0], k = 0
Output: 0
Explanation:
At index 0, the instability score is 0 - 0 = 0, which is less than or equal to k = 0. Therefore, the answer is 0.

Constraints:
1 <= nums.length <= 10^5
0 <= nums[i] <= 10^9
0 <= k <= 10^9

</> Typescript code:
*/

function firstStableIndex(nums: number[], k: number): number {
  // Store each suffix's minimum while keeping the input unchanged for the forward scan.
  const suffixMin = new Int32Array(nums.length);
  // Track the minimum encountered from the right.
  let minimum = Infinity;

  // Build suffix minima in one backward pass.
  for (let i = nums.length - 1; i >= 0; --i) {
    // Extend the suffix and update its minimum.
    minimum = Math.min(minimum, nums[i]);
    // Record the minimum for the suffix beginning at this index.
    suffixMin[i] = minimum;
  }

  // Track the maximum encountered from the left.
  let maximum = -Infinity;

  // Test indices from smallest to largest so the first match is the answer.
  for (let i = 0; i < nums.length; ++i) {
    // Extend the prefix and update its maximum.
    maximum = Math.max(maximum, nums[i]);

    // Return once this prefix maximum and suffix minimum satisfy the stability limit.
    if (maximum - suffixMin[i] <= k) {
      // The ascending scan guarantees this is the smallest stable index.
      return i;
    }
  }

  // Report that no index meets the required instability bound.
  return -1;
}
