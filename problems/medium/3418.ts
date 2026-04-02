/*
3418. Maximum Amount of Money Robot Can Earn

Hint
You are given an m x n grid. A robot starts at the top-left corner of the grid (0, 0) and wants to reach the bottom-right corner (m - 1, n - 1). The robot can move either right or down at any point in time.
The grid contains a value coins[i][j] in each cell:
If coins[i][j] >= 0, the robot gains that many coins.
If coins[i][j] < 0, the robot encounters a robber, and the robber steals the absolute value of coins[i][j] coins.
The robot has a special ability to neutralize robbers in at most 2 cells on its path, preventing them from stealing coins in those cells.

Note: The robot's total coins can be negative.
Return the maximum profit the robot can gain on the route.

Example 1:
Input: coins = [[0,1,-1],[1,-2,3],[2,-3,4]]
Output: 8
Explanation:
An optimal path for maximum coins is:
Start at (0, 0) with 0 coins (total coins = 0).
Move to (0, 1), gaining 1 coin (total coins = 0 + 1 = 1).
Move to (1, 1), where there's a robber stealing 2 coins. The robot uses one neutralization here, avoiding the robbery (total coins = 1).
Move to (1, 2), gaining 3 coins (total coins = 1 + 3 = 4).
Move to (2, 2), gaining 4 coins (total coins = 4 + 4 = 8).

Example 2:
Input: coins = [[10,10,10],[10,10,10]]
Output: 40
Explanation:
An optimal path for maximum coins is:
Start at (0, 0) with 10 coins (total coins = 10).
Move to (0, 1), gaining 10 coins (total coins = 10 + 10 = 20).
Move to (0, 2), gaining another 10 coins (total coins = 20 + 10 = 30).
Move to (1, 2), gaining the final 10 coins (total coins = 30 + 10 = 40).

Constraints:
m == coins.length
n == coins[i].length
1 <= m, n <= 500
-1000 <= coins[i][j] <= 1000

</> Typescript code:
*/

function maximumAmount(coins: number[][]): number {
  const m = coins.length;
  const n = coins[0].length;
  // dp[j][k] stores max coins at current row, column j, with k neutralizations used
  let dp = Array.from({ length: n }, () => Array(3).fill(-Infinity));

  // Initialize first row (base case)
  for (let j = 0; j < n; j++) {
    const val = coins[0][j];
    if (j === 0) {
      dp[0][0] = val; // No neutralization
      dp[0][1] = val < 0 ? 0 : val; // Use 1 neutralization if negative
      dp[0][2] = val < 0 ? 0 : val; // Use 1 of 2 available
    } else {
      // Can only come from the left in the first row
      dp[j][0] = dp[j - 1][0] + val;
      // Option 1: Don't neutralize current. Option 2: Neutralize current (if negative)
      dp[j][1] = Math.max(
        dp[j - 1][1] + val,
        val < 0 ? dp[j - 1][0] : dp[j - 1][0] + val,
      );
      dp[j][2] = Math.max(
        dp[j - 1][2] + val,
        val < 0 ? dp[j - 1][1] : dp[j - 1][1] + val,
      );
    }
  }

  // Process subsequent rows
  for (let i = 1; i < m; i++) {
    const nextDp = Array.from({ length: n }, () => Array(3).fill(-Infinity));
    for (let j = 0; j < n; j++) {
      const val = coins[i][j];
      for (let k = 0; k < 3; k++) {
        // Standard moves: come from top or left without neutralizing current cell
        let fromTop = dp[j][k] + val;
        let fromLeft = j > 0 ? nextDp[j - 1][k] + val : -Infinity;
        nextDp[j][k] = Math.max(fromTop, fromLeft);

        // Neutralization move: if cell is negative and we have neutralizations left
        if (k > 0 && val < 0) {
          let neutTop = dp[j][k - 1]; // Use neutralization coming from top
          let neutLeft = j > 0 ? nextDp[j - 1][k - 1] : -Infinity; // From left
          nextDp[j][k] = Math.max(nextDp[j][k], neutTop, neutLeft);
        }
      }
    }
    // Update current row state for next iteration (Space optimization)
    dp = nextDp;
  }

  // The answer is the maximum value found at the last cell with any number of neutralizations (0, 1, or 2)
  return Math.max(dp[n - 1][0], dp[n - 1][1], dp[n - 1][2]);
}
