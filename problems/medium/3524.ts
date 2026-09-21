/*
3524. Find X Value of Array I

You are given an array of positive integers nums, and a positive integer k.
You are allowed to perform an operation once on nums, where in each operation you can remove any non-overlapping prefix and suffix from nums such that nums remains non-empty.
You need to find the x-value of nums, which is the number of ways to perform this operation so that the product of the remaining elements leaves a remainder of x when divided by k.
Return an array result of size k where result[x] is the x-value of nums for 0 <= x <= k - 1.
A prefix of an array is a subarray that starts from the beginning of the array and extends to any point within it.
A suffix of an array is a subarray that starts at any point within the array and extends to the end of the array.
Note that the prefix and suffix to be chosen for the operation can be empty.

Example 1:
Input: nums = [1,2,3,4,5], k = 3
Output: [9,2,4]
Explanation:
For x = 0, the possible operations include all possible ways to remove non-overlapping prefix/suffix that do not remove nums[2] == 3.
For x = 1, the possible operations are:
Remove the empty prefix and the suffix [2, 3, 4, 5]. nums becomes [1].
Remove the prefix [1, 2, 3] and the suffix [5]. nums becomes [4].
For x = 2, the possible operations are:
Remove the empty prefix and the suffix [3, 4, 5]. nums becomes [1, 2].
Remove the prefix [1] and the suffix [3, 4, 5]. nums becomes [2].
Remove the prefix [1, 2, 3] and the empty suffix. nums becomes [4, 5].
Remove the prefix [1, 2, 3, 4] and the empty suffix. nums becomes [5].

Example 2:
Input: nums = [1,2,4,8,16,32], k = 4
Output: [18,1,2,0]
Explanation:
For x = 0, the only operations that do not result in x = 0 are:
Remove the empty prefix and the suffix [4, 8, 16, 32]. nums becomes [1, 2].
Remove the empty prefix and the suffix [2, 4, 8, 16, 32]. nums becomes [1].
Remove the prefix [1] and the suffix [4, 8, 16, 32]. nums becomes [2].
For x = 1, the only possible operation is:
Remove the empty prefix and the suffix [2, 4, 8, 16, 32]. nums becomes [1].
For x = 2, the possible operations are:
Remove the empty prefix and the suffix [4, 8, 16, 32]. nums becomes [1, 2].
Remove the prefix [1] and the suffix [4, 8, 16, 32]. nums becomes [2].
For x = 3, there is no possible way to perform the operation.

Example 3:
Input: nums = [1,1,2,1,1], k = 2
Output: [9,6]

Constraints:
1 <= nums[i] <= 10^9
1 <= nums.length <= 10^5
1 <= k <= 5

</> Typescript code:
*/

function resultArray(nums: number[], k: number): number[] {
  // Cache array length for loop bound and single-remainder fast path.
  const n = nums.length;
  // Every subarray product is 0 mod 1, so count all subarrays directly.
  if (k === 1) return [n * (n + 1) / 2];
  // Precompute residue multiplication table to avoid per-element modulo ops.
  const trans: number[][] = Array.from({ length: k }, (_, a) => Array.from({ length: k }, (_, r) => (a * r) % k));
  // Counts of subarrays ending at previous index, bucketed by remainder.
  let prev = new Array(k).fill(0);
  // Counts of subarrays ending at current index, bucketed by remainder.
  let cur = new Array(k).fill(0);
  // Accumulated answer counts per remainder over all subarrays seen.
  const ans = new Array(k).fill(0);
  // Scan each element as the right endpoint of subarrays ending here.
  for (let i = 0; i < n; i++) {
    // Reduce value once since only its remainder affects the product.
    const a = nums[i] % k;
    // Reset current-endpoint buckets for this index.
    cur.fill(0);
    // Count the single-element subarray ending here.
    cur[a]++;
    // Reuse the precomputed transition row for this residue.
    const row = trans[a];
    // Extend each previous subarray with the current element.
    for (let r = 0; r < k; r++) {
      // Skip empty remainder buckets.
      const c = prev[r];
      // Fold extended products into their new remainder bucket.
      if (c) cur[row[r]] += c;
    }
    // Add subarrays ending here into the global answer.
    for (let r = 0; r < k; r++) ans[r] += cur[r];
    // Swap buffers to reuse allocations without re-creating arrays.
    const t = prev; prev = cur; cur = t;
  }
  // Return counts indexed by remainder.
  return ans;
}
