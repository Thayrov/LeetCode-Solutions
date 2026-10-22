/*
3942. Minimum Operations to Sort a Permutation

You are given an integer array nums of length n, where nums is a permutation of the integers from 0 to n - 1.

You may perform only the following operations:

Reverse the entire array.
Rotate Left by One: Move the first element to the end of the array, and rest elements to left by one position.

Return an integer denoting the minimum number of operations required to sort the array in increasing order. If it is not possible to sort the array using only the given operations, return -1.

Example 1:
Input: nums = [0,2,1]
Output: 2
Explanation:
Rotate Left by one: [2, 1, 0]
Reverse the array: [0, 1, 2]
The array becomes sorted in 2 operations, which is minimal

Example 2:
Input: nums = [1,0,2]
Output: 2
Explanation:
Reverse the array: [2, 0, 1]
Rotate Left by one: [0, 1, 2]
The array becomes sorted in 2 operations, which is minimal.

Example 3:
Input: nums = [2,0,1,3]
Output: -1
Explanation:
It is impossible to reach [2, 0, 1, 3]. Thus, the answer is -1.

Constraints:
1 <= n == nums.length <= 10^5
0 <= nums[i] <= n - 1
nums is a permutation of integers from 0 to n - 1.

</> Typescript code:
*/

function minOperations(nums: number[]): number {
  // Cache length for O(1) bounds checks.
  const n = nums.length;
  // Single element is already sorted.
  if (n <= 1) return 0;
  // Anchor start value determines both cyclic orders.
  const s0 = nums[0];
  // Assume both increasing and decreasing rotations until disproven.
  let isA = true;
  let isB = true;
  // Scan once to test both dihedral forms.
  for (let i = 1; i < n; i++) {
    // Current value to validate.
    const v = nums[i];
    // Check increasing cycle when still possible.
    if (isA) {
      // Compute expected increasing value without modulo.
      let e = s0 + i;
      // Wrap once since s0 + i < 2n.
      if (e >= n) e -= n;
      // Mismatch rules out sorted rotation.
      if (v !== e) isA = false;
    }
    // Check decreasing cycle when still possible.
    if (isB) {
      // Compute expected decreasing value without modulo.
      let e = s0 - i;
      // Wrap once since s0 - i >= -(n - 1).
      if (e < 0) e += n;
      // Mismatch rules out reversed rotation.
      if (v !== e) isB = false;
    }
    // Neither orbit matches, sorting is impossible.
    if (!isA && !isB) return -1;
  }
  // Best distance over reachable orientations.
  let best = Infinity;
  // Sorted rotation case needs an even number of reversals.
  if (isA) {
    // Left distance to sorted equals position of 0.
    const k = s0 === 0 ? 0 : n - s0;
    // Pure left moves versus reverse plus left plus reverse shortcut.
    const c = k < n - k + 2 ? k : n - k + 2;
    // Keep minimal cost.
    if (c < best) best = c;
  }
  // Reversed rotation case needs an odd number of reversals.
  if (isB) {
    // Distance index inside reversed orbit.
    const a = n - 1 - s0;
    // Cheapest signed difference to target rotation.
    const m = a < n - a ? a : n - a;
    // Add the single mandatory reverse.
    const c = m + 1;
    // Keep minimal cost.
    if (c < best) best = c;
  }
  // Infinity means unreachable, else minimal operations.
  return best === Infinity ? -1 : best;
}
