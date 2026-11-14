/*
3364. Minimum Positive Sum Subarray

You are given an integer array nums and two integers l and r. Your task is to find the minimum sum of a subarray whose size is between l and r (inclusive) and whose sum is greater than 0.

Return the minimum sum of such a subarray. If no such subarray exists, return -1.

A subarray is a contiguous non-empty sequence of elements within an array.

Example 1:
Input: nums = [3, -2, 1, 4], l = 2, r = 3
Output: 1
Explanation:
The subarrays of length between l = 2 and r = 3 where the sum is greater than 0 are:
[3, -2] with a sum of 1
[1, 4] with a sum of 5
[3, -2, 1] with a sum of 2
[-2, 1, 4] with a sum of 3
Out of these, the subarray [3, -2] has a sum of 1, which is the smallest positive sum. Hence, the answer is 1.

Example 2:
Input: nums = [-2, 2, -3, 1], l = 2, r = 3
Output: -1
Explanation:
There is no subarray of length between l and r that has a sum greater than 0. So, the answer is -1.

Example 3:
Input: nums = [1, 2, 3, 4], l = 2, r = 4
Output: 3
Explanation:
The subarray [1, 2] has a length of 2 and the minimum sum greater than 0. So, the answer is 3.

Constraints:
1 <= nums.length <= 100
1 <= l <= r <= nums.length
-1000 <= nums[i] <= 1000

</> Typescript code:
*/

function minimumSumSubarray(nums: number[], l: number, r: number): number {
  // Build prefix sums for constant-time subarray sums.
  const n = nums.length;
  const prefix = new Array<number>(n + 1).fill(0);
  for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];
  // Compress prefix values to one-based Fenwick tree ranks.
  const values = [...new Set(prefix)].sort((a, b) => a - b);
  const ranks = new Map<number, number>();
  for (let i = 0; i < values.length; i++) ranks.set(values[i], i + 1);
  // Track multiplicities of eligible starting prefix sums.
  const tree = new Int32Array(values.length + 1);
  const update = (rank: number, delta: number): void => {
    // Propagate an insertion or removal through the tree.
    for (let i = rank; i < tree.length; i += i & -i) tree[i] += delta;
  };
  // Start Fenwick order-statistic searches at the largest useful power of two.
  let highestBit = 1;
  while (highestBit * 2 <= values.length) highestBit *= 2;
  // Scan every possible ending position.
  let best = Infinity;
  for (let end = l; end <= n; end++) {
    // Maintain precisely the starting indices producing lengths in [l, r].
    update(ranks.get(prefix[end - l])!, 1);
    if (end > r) update(ranks.get(prefix[end - r - 1])!, -1);
    // Count eligible prefixes strictly below the current prefix.
    let count = 0;
    for (let i = ranks.get(prefix[end])! - 1; i > 0; i -= i & -i) count += tree[i];
    if (count === 0) continue;
    // Find the last such prefix by Fenwick order-statistic search.
    let index = 0;
    for (let bit = highestBit; bit > 0; bit >>= 1) {
      const next = index + bit;
      if (next < tree.length && tree[next] < count) {
        // Skip a block containing fewer than the remaining target count.
        index = next;
        count -= tree[next];
      }
    }
    // Update the answer; one is the smallest possible positive integer sum.
    best = Math.min(best, prefix[end] - values[index]);
    if (best === 1) return 1;
  }
  // Report absence of a positive sum when no candidate was found.
  return best === Infinity ? -1 : best;
}
