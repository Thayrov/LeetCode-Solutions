/*
3551. Minimum Swaps to Sort by Digit Sum

You are given an array nums of distinct positive integers. You need to sort the array in increasing order based on the sum of the digits of each number. If two numbers have the same digit sum, the smaller number appears first in the sorted order.

Return the minimum number of swaps required to rearrange nums into this sorted order.

A swap is defined as exchanging the values at two distinct positions in the array.

Example 1:
Input: nums = [37,100]
Output: 1
Explanation:
Compute the digit sum for each integer: [3 + 7 = 10, 1 + 0 + 0 = 1] → [10, 1]
Sort the integers based on digit sum: [100, 37]. Swap 37 with 100 to obtain the sorted order.
Thus, the minimum number of swaps required to rearrange nums is 1.

Example 2:
Input: nums = [22,14,33,7]
Output: 0
Explanation:
Compute the digit sum for each integer: [2 + 2 = 4, 1 + 4 = 5, 3 + 3 = 6, 7 = 7] → [4, 5, 6, 7]
Sort the integers based on digit sum: [22, 14, 33, 7]. The array is already sorted.
Thus, the minimum number of swaps required to rearrange nums is 0.

Example 3:
Input: nums = [18,43,34,16]
Output: 2
Explanation:
Compute the digit sum for each integer: [1 + 8 = 9, 4 + 3 = 7, 3 + 4 = 7, 1 + 6 = 7] → [9, 7, 7, 7]
Sort the integers based on digit sum: [16, 34, 43, 18]. Swap 18 with 16, and swap 43 with 34 to obtain the sorted order.
Thus, the minimum number of swaps required to rearrange nums is 2.

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^9
nums consists of distinct positive integers.

</> Typescript code:
*/

function minSwaps(nums: number[]): number {
  // Cache array length.
  const n = nums.length;
  // Digit sums per position, max 81 fits in a byte.
  const ds = new Uint8Array(n);
  // Precompute every digit sum once with integer arithmetic.
  for (let i = 0; i < n; i++) {
    // Mutable copy for decimal stripping.
    let x = nums[i];
    // Accumulator for this value's digit sum.
    let s = 0;
    // Strip decimal digits until exhausted.
    while (x > 0) {
      // Add lowest decimal digit.
      s += x % 10;
      // Drop lowest decimal digit.
      x = (x / 10) | 0;
    }
    // Store precomputed key part.
    ds[i] = s;
  }
  // Identity permutation of positions to sort by custom key.
  const idx = new Array<number>(n);
  // Seed each position.
  for (let i = 0; i < n; i++) idx[i] = i;
  // Order positions by digit sum, then by value.
  idx.sort((a, b) => ds[a] !== ds[b] ? ds[a] - ds[b] : nums[a] - nums[b]);
  // Visited flags for cycle walk.
  const vis = new Uint8Array(n);
  // Accumulator for minimum swaps.
  let swaps = 0;
  // Scan every position for unvisited permutation cycles.
  for (let i = 0; i < n; i++) {
    // Skip positions already assigned to a cycle.
    if (vis[i]) continue;
    // Cycle entry point.
    let j = i;
    // Cycle length counter.
    let sz = 0;
    // Walk the cycle until returning to a visited node.
    while (!vis[j]) {
      // Mark current node visited.
      vis[j] = 1;
      // Jump to the successor in sorted order.
      j = idx[j];
      // Grow cycle length.
      sz++;
    }
    // A k-cycle needs k-1 swaps.
    if (sz > 1) swaps += sz - 1;
  }
  // Return cycle-based minimum swap count.
  return swaps;
}
