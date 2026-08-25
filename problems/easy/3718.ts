/*
3718. Smallest Missing Multiple of K

Given an integer array nums and an integer k, return the smallest positive multiple of k that is missing from nums.

A multiple of k is any positive integer divisible by k.

Example 1:
Input: nums = [8,2,3,4,6], k = 2
Output: 10
Explanation:
The multiples of k = 2 are 2, 4, 6, 8, 10, 12... and the smallest multiple missing from nums is 10.

Example 2:
Input: nums = [1,4,7,10,15], k = 5
Output: 5
Explanation:
The multiples of k = 5 are 5, 10, 15, 20... and the smallest multiple missing from nums is 5.

Constraints:
1 <= nums.length <= 100
1 <= nums[i] <= 100
1 <= k <= 100

</> Typescript code:
*/

function missingMultiple(nums: number[], k: number): number {
  // Reserve four 32-bit words for every possible quotient from 0 through 100.
  const seen = new Uint32Array(4);

  // Inspect each array value once.
  for (const value of nums) {
    // Ignore values that are not multiples of k.
    if (value % k === 0) {
      // Convert the multiple into its positive integer quotient.
      const quotient = value / k;
      // Mark the quotient's bit in its 32-bit word.
      seen[quotient >>> 5] |= 1 << (quotient & 31);
    }
  }

  // Test positive quotients in increasing order until one is absent.
  for (let quotient = 1; ; quotient++) {
    // Read the quotient's bit and detect the first unmarked multiple.
    if (((seen[quotient >>> 5] >>> (quotient & 31)) & 1) === 0) {
      // Restore the missing multiple from its quotient.
      return quotient * k;
    }
  }
}
