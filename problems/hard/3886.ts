/*
3886. Sum of Sortable Integers

You are given an integer array nums of length n.
An integer k is called sortable if k divides n and you can sort nums in non-decreasing order by sequentially performing the following operations:
Partition nums into consecutive subarrays of length k.
Cyclically rotate each subarray independently any number of times to the left or to the right.
Return an integer denoting the sum of all possible sortable integers k.

Example 1:
Input: nums = [3,1,2]
Output: 3
Explanation:
For n = 3, possible divisors are 1 and 3.
For k = 1: each subarray has one element. No rotation can sort the array.
For k = 3: the single subarray [3, 1, 2] can be rotated once to produce [1, 2, 3], which is sorted.
Only k = 3 is sortable. Hence, the answer is 3.

Example 2:
Input: nums = [7,6,5]
Output: 0
Explanation:
For n = 3, possible divisors are 1 and 3.
For k = 1: each subarray has one element. No rotation can sort the array.
For k = 3: the single subarray [7, 6, 5] cannot be rotated into non-decreasing order.
No k is sortable. Hence, the answer is 0.

Example 3:
Input: nums = [5,8]
Output: 3
Explanation:
For n = 2, possible divisors are 1 and 2.
Since [5, 8] is already sorted, every divisor is sortable. Hence, the answer is 1 + 2 = 3.

Constraints:
1 <= n == nums.length <= 10^5
1 <= nums[i] <= 10^5

</> Typescript code:
*/

function sortableIntegers(nums: number[]): number {
  // Cache array length for block iteration.
  const n = nums.length;
  // Empty input contributes no sortable value.
  if (n === 0) return 0;
  // Build sorted reference copy defining each block target.
  const s = nums.slice().sort((a, b) => a - b);
  // Assume input sorted until a mismatch appears.
  let sorted = true;
  // Compare input elementwise against sorted reference.
  for (let i = 0; i < n; i++) if (nums[i] !== s[i]) { sorted = false; break; }
  // Collect every divisor of n as a candidate k.
  const divisors: number[] = [];
  // Enumerate divisor pairs up to sqrt(n).
  for (let d = 1; d * d <= n; d++) if (n % d === 0) { divisors.push(d); if (d * d !== n) divisors.push(n / d); }
  // Sorted input makes every divisor trivially sortable.
  if (sorted) {
    // Accumulate divisor sum for the fast path.
    let sum = 0;
    // Add each divisor exactly once.
    for (const k of divisors) sum += k;
    // Return sigma(n) without block checks.
    return sum;
  }
  // Accumulate the answer over sortable block sizes.
  let ans = 0;
  // Test each divisor block size independently.
  for (const k of divisors) {
    // Assume current k works until disproven.
    let ok = true;
    // Scan consecutive blocks of length k.
    for (let start = 0; start < n; start += k) {
      // Track strict drops inside the current block.
      let drops = 0, dropPos = -1;
      // Last index of the current block.
      const end = start + k - 1;
      // Count adjacent decreases within the block.
      for (let i = start; i < end; i++) {
        // Detect a decreasing adjacent pair.
        if (nums[i] > nums[i + 1]) {
          // Record another rotation wrap candidate.
          drops++;
          // More than one drop rules out any rotation.
          if (drops > 1) break;
          // Remember offset of the single drop.
          dropPos = i - start;
        }
      }
      // Reject k when the block has multiple drops.
      if (drops > 1) { ok = false; break; }
      // Derive rotation moving the drop to the block end.
      const shift = drops === 0 ? 0 : dropPos + 1;
      // Length of the head segment after rotation.
      const tail = k - shift;
      // Compare rotated head against sorted segment.
      for (let j = 0; j < tail; j++) if (nums[start + shift + j] !== s[start + j]) { ok = false; break; }
      // Abort k on the first head mismatch.
      if (!ok) break;
      // Compare wrapped tail against sorted remainder.
      for (let j = tail; j < k; j++) if (nums[start + j - tail] !== s[start + j]) { ok = false; break; }
      // Abort k on the first tail mismatch.
      if (!ok) break;
    }
    // Add k when every block rotated to its target.
    if (ok) ans += k;
  }
  // Return the sum of all sortable block sizes.
  return ans;
}
