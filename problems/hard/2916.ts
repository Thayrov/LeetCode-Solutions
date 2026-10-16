/*
2916. Subarrays Distinct Element Sum of Squares II

You are given a 0-indexed integer array nums.

The distinct count of a subarray of nums is defined as:

Let nums[i..j] be a subarray of nums consisting of all the indices from i to j such that 0 <= i <= j < nums.length. Then the number of distinct values in nums[i..j] is called the distinct count of nums[i..j].

Return the sum of the squares of distinct counts of all subarrays of nums.

Since the answer may be very large, return it modulo 109 + 7.

A subarray is a contiguous non-empty sequence of elements within an array.

Example 1:
Input: nums = [1,2,1]
Output: 15
Explanation:
Six possible subarrays are:
[1]: 1 distinct value
[2]: 1 distinct value
[1]: 1 distinct value
[1,2]: 2 distinct values
[2,1]: 2 distinct values
[1,2,1]: 2 distinct values
The sum of the squares of the distinct counts in all subarrays is equal to 1^2 + 1^2 + 1^2 + 2^2 + 2^2 + 2^2 = 15.

Example 2:
Input: nums = [2,2]
Output: 3
Explanation:
Three possible subarrays are:
[2]: 1 distinct value
[2]: 1 distinct value
[2,2]: 1 distinct value
The sum of the squares of the distinct counts in all subarrays is equal to 1^2 + 1^2 + 1^2 = 3.

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^5

</> Typescript code:
*/

function sumCounts(nums: number[]): number {
  // Cache array length.
  const n = nums.length;
  // Modulo for final answer.
  const MOD = 1000000007;
  // BIT size with slack for r+1 updates.
  const m = n + 5;
  // BIT1 stores range-add coefficients.
  const b1 = new Array<number>(m).fill(0);
  // BIT2 stores range-add offsets.
  const b2 = new Array<number>(m).fill(0);
  // Add delta at BIT index.
  const bitAdd = (b: number[], idx: number, delta: number): void => {
    // Propagate delta up the tree.
    for (let i = idx; i < m; i += i & -i) b[i] += delta;
  };
  // Prefix sum on one BIT.
  const bitSum = (b: number[], idx: number): number => {
    // Accumulate tree cells.
    let s = 0;
    // Walk down to root.
    for (let i = idx; i > 0; i -= i & -i) s += b[i];
    // Return Fenwick prefix total.
    return s;
  };
  // Add v to every position in [l, r], 1-indexed.
  const rangeAdd = (l: number, r: number, v: number): void => {
    // Skip empty ranges.
    if (l > r) return;
    // Update coefficient difference.
    bitAdd(b1, l, v);
    // Close coefficient difference.
    bitAdd(b1, r + 1, -v);
    // Update offset difference.
    bitAdd(b2, l, v * (l - 1));
    // Close offset difference.
    bitAdd(b2, r + 1, -v * r);
  };
  // Prefix sum of distinct values over [1, p].
  const prefixSum = (p: number): number => {
    // Empty prefix contributes zero.
    if (p <= 0) return 0;
    // Combine coefficient and offset trees.
    return bitSum(b1, p) * p - bitSum(b2, p);
  };
  // Range sum over [l, r], 1-indexed.
  const rangeSum = (l: number, r: number): number => {
    // Skip empty ranges.
    if (l > r) return 0;
    // Difference of two prefixes.
    return prefixSum(r) - prefixSum(l - 1);
  };
  // Last seen index per value.
  const last = new Map<number, number>();
  // Sum of squares for subarrays ending at previous right endpoint.
  let cur = 0;
  // Modded total over all right endpoints.
  let ans = 0;
  // Expand right endpoint i.
  for (let i = 0; i < n; i++) {
    // Current value.
    const v = nums[i];
    // Previous occurrence, -1 when unseen.
    const prev = last.has(v) ? last.get(v)! : -1;
    // Sum of distinct counts over suffix needing +1.
    const rs = rangeSum(prev + 2, i);
    // Apply (d+1)^2 - d^2 = 2d+1 over suffix plus new singleton.
    cur = cur + 2 * rs + (i - prev);
    // Accumulate ending-here contribution.
    ans += cur;
    // Keep total bounded by modulo.
    if (ans >= MOD) ans %= MOD;
    // Increment suffix distinct counts and seed position i.
    rangeAdd(prev + 2, i + 1, 1);
    // Record current occurrence.
    last.set(v, i);
  }
  // Return total modulo 1e9+7.
  return ans % MOD;
}
