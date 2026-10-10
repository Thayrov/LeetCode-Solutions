/*
2333. Minimum Sum of Squared Difference

You are given two positive 0-indexed integer arrays nums1 and nums2, both of length n.

The sum of squared difference of arrays nums1 and nums2 is defined as the sum of (nums1[i] - nums2[i])^2 for each 0 <= i < n.

You are also given two positive integers k1 and k2. You can modify any of the elements of nums1 by +1 or -1 at most k1 times. Similarly, you can modify any of the elements of nums2 by +1 or -1 at most k2 times.

Return the minimum sum of squared difference after modifying array nums1 at most k1 times and modifying array nums2 at most k2 times.

Note: You are allowed to modify the array elements to become negative integers.

Example 1:
Input: nums1 = [1,2,3,4], nums2 = [2,10,20,19], k1 = 0, k2 = 0
Output: 579
Explanation:
The elements in nums1 and nums2 cannot be modified because k1 = 0 and k2 = 0.
The sum of square difference will be: (1 - 2)^2 + (2 - 10)^2 + (3 - 20)^2 + (4 - 19)^2 = 579.

Example 2:
Input: nums1 = [1,4,10,12], nums2 = [5,8,6,9], k1 = 1, k2 = 1
Output: 43
Explanation:
One way to obtain the minimum sum of square difference is:
- Increase nums1[0] once.
- Increase nums2[2] once.
The minimum of the sum of square difference will be:
(2 - 5)^2 + (4 - 8)^2 + (10 - 7)^2 + (12 - 9)^2 = 43.
Note that, there are other ways to obtain the minimum of the sum of square difference, but there is no way to obtain a sum smaller than 43.

Constraints:
n == nums1.length == nums2.length
1 <= n <= 10^5
0 <= nums1[i], nums2[i] <= 10^5
0 <= k1, k2 <= 10^9

</> Typescript code:
*/

function minSumSquareDiff(nums1: number[], nums2: number[], k1: number, k2: number): number {
  // Cache length and pool both operation budgets.
  const n = nums1.length;
  // Pooled moves; either array can absorb a unit gap reduction.
  let k = k1 + k2;
  // Track largest gap and total gap volume.
  let maxD = 0,
    total = 0;
  // Single pass over both arrays.
  for (let i = 0; i < n; i++) {
    // Absolute per-index gap drives the squared cost.
    const d = Math.abs(nums1[i] - nums2[i]);
    // Retain the maximum gap for frequency table sizing.
    if (d > maxD) maxD = d;
    // Accumulate reducible gap units.
    total += d;
  }
  // Gaps fully closable; leftover moves stay unused.
  if (total <= k) return 0;
  // Frequency table over gap values 0..maxD.
  const freq = new Int32Array(maxD + 1);
  // Count occurrences of each gap.
  for (let i = 0; i < n; i++) freq[Math.abs(nums1[i] - nums2[i])]++;
  // Greedily shave the tallest gaps first; marginal gain 2d-1 favors large d.
  for (let d = maxD; d > 0 && k > 0; d--) {
    // Occupants at this gap level.
    const c = freq[d];
    // Skip empty levels.
    if (c === 0) continue;
    // Whole level affordable: drop every occupant one step.
    if (k >= c) {
      // Merge them into the level below.
      freq[d - 1] += c;
      // Clear the vacated level to avoid double counting.
      freq[d] = 0;
      // Pay one move per occupant.
      k -= c;
    } else {
      // Partial level: shave only k occupants.
      freq[d] -= k;
      // Park the shaved occupants one level down.
      freq[d - 1] += k;
      // Budget exhausted.
      k = 0;
    }
  }
  // Accumulate the minimized sum of squares.
  let ans = 0;
  // Walk surviving gap levels.
  for (let d = 1; d <= maxD; d++) {
    // Occupants at this level.
    const c = freq[d];
    // Add their squared contribution.
    if (c !== 0) ans += c * d * d;
  }
  // Return the minimal achievable cost.
  return ans;
}
