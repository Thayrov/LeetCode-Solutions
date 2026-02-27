/*
3666. Minimum Operations to Equalize Binary String

You are given a binary string s, and an integer k.
In one operation, you must choose exactly k different indices and flip each '0' to '1' and each '1' to '0'.
Return the minimum number of operations required to make all characters in the string equal to '1'. If it is not possible, return -1.

Example 1:
Input: s = "110", k = 1
Output: 1
Explanation:
There is one '0' in s.
Since k = 1, we can flip it directly in one operation.

Example 2:
Input: s = "0101", k = 3
Output: 2
Explanation:
One optimal set of operations choosing k = 3 indices in each operation is:
Operation 1: Flip indices [0, 1, 3]. s changes from "0101" to "1000".
Operation 2: Flip indices [1, 2, 3]. s changes from "1000" to "1111".
Thus, the minimum number of operations is 2.

Example 3:
Input: s = "101", k = 2
Output: -1
Explanation:
Since k = 2 and s has only one '0', it is impossible to flip exactly k indices to make all '1'. Hence, the answer is -1.

Constraints:
1 <= s.length <= 10^5
s[i] is either '0' or '1'.
1 <= k <= s.length

</> Typescript code:
*/

function minOperations(s: string, k: number): number {
  // Cache string length, init zero count.
  let z = 0,
    n = s.length;
  // Tally zeroes.
  for (let i = 0; i < n; i++) if (s[i] === "0") z++;

  // No zeroes = no ops.
  if (!z) return 0;
  // Max step blocks exact inversions.
  if (k === n) return z === n ? 1 : -1;
  // Even step size cannot resolve odd zero count.
  if (!(k & 1) && z & 1) return -1;

  // Baseline required ops based strictly on flip volume.
  let m = Math.ceil(z / k);
  // Iterate ops multiplier until parity and max capacity conditions align.
  while (true) {
    // Condition 1: Total flips parity matches zeroes parity.
    // Condition 2: Required flips fit within theoretical max capacity bounds.
    // Derived from: z * maxOddFlips + (n - z) * maxEvenFlips
    if (((m * k) & 1) === (z & 1) && m * k <= n * m - z + (m & 1) * (2 * z - n))
      return m;
    // Step sequentially; parity jumps alternate natively based on step size constraints.
    m++;
  }
}
