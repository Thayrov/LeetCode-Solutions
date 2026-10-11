/*
2778. Sum of Squares of Special Elements

You are given a 1-indexed integer array nums of length n.
An element nums[i] of nums is called special if i divides n, i.e. n % i == 0.
Return the sum of the squares of all special elements of nums.

Example 1:
Input: nums = [1,2,3,4]
Output: 21
Explanation: There are exactly 3 special elements in nums: nums[1] since 1 divides 4, nums[2] since 2 divides 4, and nums[4] since 4 divides 4.
Hence, the sum of the squares of all special elements of nums is nums[1] * nums[1] + nums[2] * nums[2] + nums[4] * nums[4] = 1 * 1 + 2 * 2 + 4 * 4 = 21.

Example 2:
Input: nums = [2,7,1,19,18,3]
Output: 63
Explanation: There are exactly 4 special elements in nums: nums[1] since 1 divides 6, nums[2] since 2 divides 6, nums[3] since 3 divides 6, and nums[6] since 6 divides 6.
Hence, the sum of the squares of all special elements of nums is nums[1] * nums[1] + nums[2] * nums[2] + nums[3] * nums[3] + nums[6] * nums[6] = 2 * 2 + 7 * 7 + 1 * 1 + 3 * 3 = 63.

Constraints:
1 <= nums.length == n <= 50
1 <= nums[i] <= 50

</> Typescript code:
*/

function sumOfSquares(nums: number[]): number {
  // Cache array length as n.
  const n = nums.length;
  // Init accumulator for the sum of squares.
  let s = 0;
  // Enumerate candidate divisors d up to sqrt(n).
  for (let d = 1; d * d <= n; d++) {
    // Keep only d that divides n.
    if (n % d === 0) {
      // Load element at 1-indexed position d.
      const a = nums[d - 1];
      // Add its square.
      s += a * a;
      // Compute paired divisor.
      const e = n / d;
      // Skip duplicate when n is a perfect square.
      if (e !== d) {
        // Load element at 1-indexed position e.
        const b = nums[e - 1];
        // Add its square.
        s += b * b;
      }
    }
  }
  // Return total sum of squares.
  return s;
}
