/*
1155. Number of Dice Rolls With Target Sum

You have n dice, and each die has k faces numbered from 1 to k.
Given three integers n, k, and target, return the number of possible ways (out of the kn total ways) to roll the dice, so the sum of the face-up numbers equals target. Since the answer may be too large, return it modulo 109 + 7.

Example 1:
Input: n = 1, k = 6, target = 3
Output: 1
Explanation: You throw one die with 6 faces.
There is only one way to get a sum of 3.

Example 2:
Input: n = 2, k = 6, target = 7
Output: 6
Explanation: You throw two dice, each with 6 faces.
There are 6 ways to get a sum of 7: 1+6, 2+5, 3+4, 4+3, 5+2, 6+1.

Example 3:
Input: n = 30, k = 30, target = 500
Output: 222616187
Explanation: The answer must be returned modulo 109 + 7.

Constraints:
1 <= n, k <= 30
1 <= target <= 1000

</> Typescript Code:
*/

function numRollsToTarget(n: number, k: number, target: number): number {
  const MOD = 1000000007; // The modulo value
  // dp[i][j] will store the number of ways to get sum j with i dice
  let dp = Array.from({ length: n + 1 }, () => new Array(target + 1).fill(0));

  // Base case: There's 1 way to get sum 0 with 0 dice
  dp[0][0] = 1;

  // Iterate over the number of dice
  for (let i = 1; i <= n; i++) {
    // Iterate over all possible sums
    for (let j = 1; j <= target; j++) {
      // Calculate the number of ways to achieve the sum j with i dice
      for (let face = 1; face <= k; face++) {
        if (j - face >= 0) {
          // Add the ways from the previous sum (j - face) with one less die
          dp[i][j] = (dp[i][j] + dp[i - 1][j - face]) % MOD;
        }
      }
    }
  }

  // Return the number of ways to get the target sum with n dice
  return dp[n][target];
}
