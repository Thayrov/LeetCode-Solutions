/* 
790. Domino and Tromino Tiling
You have two types of tiles: a 2 x 1 domino shape and a tromino shape. You may rotate these shapes.

Given an integer n, return the number of ways to tile an 2 x n board. Since the answer may be very large, return it modulo 109 + 7.

In a tiling, every square must be covered by a tile. Two tilings are different if and only if there are two 4-directionally adjacent cells on the board such that exactly one of the tilings has both squares occupied by a tile.

Example 1:
Input: n = 3
Output: 5
Explanation: The five different ways are show above.

Example 2:
Input: n = 1
Output: 1

Constraints:
1 <= n <= 1000

</> Typescript code:
*/

function numTilings(n: number): number {
  // modulus for results
  const MOD = 1000000007;
  // handle small n directly
  if (n <= 2) return n === 2 ? 2 : 1;
  // s[i] = sum of dp[0]..dp[i]
  const s: number[] = new Array(n + 1);
  s[0] = 1; // dp[0] = 1
  s[1] = 2; // dp[0] + dp[1] = 1 + 1
  s[2] = 4; // dp[0] + dp[1] + dp[2] = 1 + 1 + 2
  // dpPrev2 = dp[i-2], dpPrev1 = dp[i-1]
  let dpPrev2 = 1; // dp[1]
  let dpPrev1 = 2; // dp[2]
  // build up to n
  for (let i = 3; i <= n; i++) {
    // dp[i] = dp[i-1] + dp[i-2] + 2 * sum(dp[0..i-3])
    const dpCur =
      (((dpPrev1 + dpPrev2) % MOD) + // dp[i-1] + dp[i-2]
        2 * (s[i - 3] % MOD)) % // 2 * prefix sum up to i-3
      MOD;
    // update prefix sum
    s[i] = (s[i - 1] + dpCur) % MOD;
    // shift window
    dpPrev2 = dpPrev1;
    dpPrev1 = dpCur;
  }
  return dpPrev1; // dp[n]
}
