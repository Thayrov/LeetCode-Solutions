/*
3742. Maximum Path Score in a Grid

Hint
You are given an m x n grid where each cell contains one of the values 0, 1, or 2. You are also given an integer k.
You start from the top-left corner (0, 0) and want to reach the bottom-right corner (m - 1, n - 1) by moving only right or down.
Each cell contributes a specific score and incurs an associated cost, according to their cell values:
0: adds 0 to your score and costs 0.
1: adds 1 to your score and costs 1.
2: adds 2 to your score and costs 1.
Return the maximum score achievable without exceeding a total cost of k, or -1 if no valid path exists.

Note: If you reach the last cell but the total cost exceeds k, the path is invalid.

Example 1:
Input: grid = [[0, 1],[2, 0]], k = 1
Output: 2
Explanation:
The optimal path is:
Cell	grid[i][j]	Score	Total
Score	Cost	Total
Cost
(0, 0)	0	0	0	0	0
(1, 0)	2	2	2	1	1
(1, 1)	0	0	2	0	1
Thus, the maximum possible score is 2.

Example 2:
Input: grid = [[0, 1],[1, 2]], k = 1
Output: -1
Explanation:
There is no path that reaches cell (1, 1) without exceeding cost k. Thus, the answer is -1.

Constraints:
1 <= m, n <= 200
0 <= k <= 10^3
grid[0][0] == 0
0 <= grid[i][j] <= 2

</> Typescript code:
*/

function maxPathScore(grid: number[][], k: number): number {
  // Get dimensions of the grid
  const m = grid.length,
    n = grid[0].length;
  // Create DP table: rows = max cost k, columns = grid width n. Initialize with -1.
  // Using Int32Array for better performance/memory locality.
  const dp = Array.from({ length: k + 1 }, () => new Int32Array(n).fill(-1));
  // Base case: Starting point at (0,0) with 0 cost has 0 score.
  dp[0][0] = 0;
  // Iterate through every cell in the grid row by row.
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      const val = grid[i][j];
      // Cell value 0 costs 0; values 1 and 2 cost 1.
      const cost = val === 0 ? 0 : 1;
      const score = val;
      // Iterate backwards through costs to update DP state without using same-cell updates.
      for (let c = k; c >= 0; --c) {
        let best = -1;
        // Transition from the cell above (Down move).
        if (i > 0 && c >= cost) {
          const prev = dp[c - cost][j];
          if (prev !== -1) best = prev + score;
        }
        // Transition from the cell to the left (Right move).
        if (j > 0 && c >= cost) {
          const prev = dp[c - cost][j - 1];
          if (prev !== -1) {
            const sum = prev + score;
            if (sum > best) best = sum;
          }
        }
        // Skip updating the starting cell (0,0) as it is the seed.
        if (i === 0 && j === 0) continue;
        // Update the current DP state for cost 'c' at column 'j'.
        dp[c][j] = best;
      }
    }
  }
  // Result is the maximum score found at cell (m-1, n-1) across all costs <= k.
  let res = -1;
  for (let c = 0; c <= k; ++c) if (dp[c][n - 1] > res) res = dp[c][n - 1];
  return res;
}
