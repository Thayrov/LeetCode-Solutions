/*
1621. Number of Sets of K Non-Overlapping Line Segments

Given n points on a 1-D plane, where the ith point (from 0 to n-1) is at x = i, find the number of ways we can draw exactly k non-overlapping line segments such that each segment covers two or more points. The endpoints of each segment must have integral coordinates. The k line segments do not have to cover all n points, and they are allowed to share endpoints.

Return the number of ways we can draw k non-overlapping line segments. Since this number can be huge, return it modulo 10^9 + 7.

Example 1:
Input: n = 4, k = 2
Output: 5
Explanation: The two line segments are shown in red and blue.
The image above shows the 5 different ways {(0,2),(2,3)}, {(0,1),(1,3)}, {(0,1),(2,3)}, {(1,2),(2,3)}, {(0,1),(1,2)}.

Example 2:
Input: n = 3, k = 1
Output: 3
Explanation: The 3 ways are {(0,1)}, {(0,2)}, {(1,2)}.

Example 3:
Input: n = 30, k = 7
Output: 796297179
Explanation: The total number of possible ways to draw 7 line segments is 3796297200. Taking this number modulo 10^9 + 7 gives us 796297179.

Constraints:
2 <= n <= 1000
1 <= k <= n-1

Hint 1:
Try to use dynamic programming where the current index and remaining number of line segments to form can describe any intermediate state.

Hint 2:
To make the computation of each state constant time, we could add another flag to the state that indicates whether or not we are in the middle of placing a line (placed start point but no endpoint).

</> Typescript code:
*/

function numberOfSets(n: number, k: number): number {
  // Use the problem's prime modulus for every combinatorial value.
  const MOD = 1000000007n;
  // Convert the segment count into the binomial coefficient's upper index.
  const total = n + k - 1;
  // Select the smaller binomial side to minimize modular multiplications.
  let choose = 2 * k;
  // Use C(total, choose) = C(total, total - choose).
  if (choose > total - choose) choose = total - choose;

  // Accumulate the numerator modulo MOD without unsafe Number multiplication.
  let numerator = 1n;
  // Accumulate the denominator modulo MOD for one final modular inversion.
  let denominator = 1n;
  // Build the reduced-side numerator and denominator products.
  for (let i = 1; i <= choose; i++) {
    // Multiply by the next numerator factor.
    numerator = (numerator * BigInt(total - choose + i)) % MOD;
    // Multiply by the next denominator factor.
    denominator = (denominator * BigInt(i)) % MOD;
  }

  // Apply Fermat's little theorem because MOD is prime.
  let exponent = MOD - 2n;
  // Start the binary exponentiation result at the multiplicative identity.
  let inverse = 1n;
  // Square this base while consuming the exponent bits.
  let base = denominator;
  // Compute denominator^(MOD - 2) modulo MOD.
  while (exponent > 0n) {
    // Include the current power when its exponent bit is set.
    if (exponent & 1n) inverse = (inverse * base) % MOD;
    // Advance to the next binary power.
    base = (base * base) % MOD;
    // Remove the bit just processed.
    exponent >>= 1n;
  }

  // Combine numerator and denominator inverse to obtain C(n + k - 1, 2k).
  return Number((numerator * inverse) % MOD);
}
