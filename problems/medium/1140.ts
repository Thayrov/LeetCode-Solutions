/*
1140. Stone Game II

Alice and Bob continue their games with piles of stones. There are a number of piles arranged in a row, and each pile has a positive integer number of stones piles[i]. The objective of the game is to end with the most stones.

Alice and Bob take turns, with Alice starting first.

On each player's turn, that player can take all the stones in the first X remaining piles, where 1 <= X <= 2M. Then, we set M = max(M, X). Initially, M = 1.

The game continues until all the stones have been taken.

Assuming Alice and Bob play optimally, return the maximum number of stones Alice can get.

Example 1:
Input: piles = [2,7,9,4,4]
Output: 10
Explanation:
If Alice takes one pile at the beginning, Bob takes two piles, then Alice takes 2 piles again. Alice can get 2 + 4 + 4 = 10 stones in total.
If Alice takes two piles at the beginning, then Bob can take all three piles left. In this case, Alice get 2 + 7 = 9 stones in total.
So we return 10 since it's larger.

Example 2:
Input: piles = [1,2,3,4,5,100]
Output: 104

Constraints:
1 <= piles.length <= 100
1 <= piles[i] <= 10^4

</> Typescript code:
*/

function stoneGameII(piles: number[]): number {
  // Cache the number of piles for table dimensions and bounds.
  const n = piles.length;
  // Store each suffix's total in a compact exact-integer array.
  const suffix = new Int32Array(n + 1);

  // Build suffix totals so every remaining-stone sum is available in constant time.
  for (let i = n - 1; i >= 0; --i) {
    // Add the current pile to the already-computed suffix on its right.
    suffix[i] = suffix[i + 1] + piles[i];
  }

  // Let dp[i][m] hold the most stones the player to move can secure from index i with value M = m.
  const dp = Array.from(
    // Allocate one row for every pile index plus the empty suffix.
    { length: n + 1 },
    // Use typed rows because every possible stone total fits safely in 32 bits.
    () => new Int32Array(n + 1),
  );

  // Process starting indices backward so every successor state is already solved.
  for (let i = n - 1; i >= 0; --i) {
    // Count how many piles remain in this state.
    const remaining = n - i;

    // Evaluate every possible M needed by a transition.
    for (let m = 1; m <= n; ++m) {
      // Take the entire suffix whenever the current move limit reaches every remaining pile.
      if (2 * m >= remaining) {
        // Claim all remaining stones, which is optimal because every pile is positive.
        dp[i][m] = suffix[i];
        // Skip unnecessary move enumeration for this terminal choice.
        continue;
      }

      // Track the best score achievable across all legal choices of X.
      let best = 0;

      // Try taking each legal number of leading piles.
      for (let x = 1; x <= 2 * m; ++x) {
        // Update M exactly as required for the opponent's state.
        const nextM = x > m ? x : m;
        // Keep the total suffix except for the opponent's optimal share after this move.
        const score = suffix[i] - dp[i + x][nextM];

        // Retain the move that maximizes the current player's guaranteed stones.
        if (score > best) {
          // Record the stronger minimax result.
          best = score;
        }
      }

      // Save the optimal result for this starting index and M value.
      dp[i][m] = best;
    }
  }

  // Return Alice's result from the initial state at index zero with M equal to one.
  return dp[0][1];
}
