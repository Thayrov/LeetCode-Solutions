/*
3665. Twisted Mirror Path Count

Given an m x n binary grid grid where:

grid[i][j] == 0 represents an empty cell, and
grid[i][j] == 1 represents a mirror.

A robot starts at the top-left corner of the grid (0, 0) and wants to reach the bottom-right corner (m - 1, n - 1). It can move only right or down. If the robot attempts to move into a mirror cell, it is reflected before entering that cell:

If it tries to move right into a mirror, it is turned down and moved into the cell directly below the mirror.
If it tries to move down into a mirror, it is turned right and moved into the cell directly to the right of the mirror.

If this reflection would cause the robot to move outside the grid boundaries, the path is considered invalid and should not be counted.

Return the number of unique valid paths from (0, 0) to (m - 1, n - 1).

Since the answer may be very large, return it modulo 10^9 + 7.

Note: If a reflection moves the robot into a mirror cell, the robot is immediately reflected again based on the direction it used to enter that mirror: if it entered while moving right, it will be turned down; if it entered while moving down, it will be turned right. This process will continue until either the last cell is reached, the robot moves out of bounds or the robot moves to a non-mirror cell.

Example 1:
Input: grid = [[0,1,0],[0,0,1],[1,0,0]]
Output: 5
Explanation:
Number  Full Path
1  (0, 0) -> (0, 1) [M] -> (1, 1) -> (1, 2) [M] -> (2, 2)
2  (0, 0) -> (0, 1) [M] -> (1, 1) -> (2, 1) -> (2, 2)
3  (0, 0) -> (1, 0) -> (1, 1) -> (1, 2) [M] -> (2, 2)
4  (0, 0) -> (1, 0) -> (1, 1) -> (2, 1) -> (2, 2)
5  (0, 0) -> (1, 0) -> (2, 0) [M] -> (2, 1) -> (2, 2)
[M] indicates the robot attempted to enter a mirror cell and instead reflected.

Example 2:
Input: grid = [[0,0],[0,0]]
Output: 2
Explanation:
Number  Full Path
1  (0, 0) -> (0, 1) -> (1, 1)
2  (0, 0) -> (1, 0) -> (1, 1)

Example 3:
Input: grid = [[0,1,1],[1,1,0]]
Output: 1
Explanation:
Number  Full Path
1  (0, 0) -> (0, 1) [M] -> (1, 1) [M] -> (1, 2)
(0, 0) -> (1, 0) [M] -> (1, 1) [M] -> (2, 1) goes out of bounds, so it is invalid.

Constraints:
m == grid.length
n == grid[i].length
2 <= m, n <= 500
grid[i][j] is either 0 or 1.
grid[0][0] == grid[m - 1][n - 1] == 0

</> Typescript code:
*/

function uniquePaths(grid: number[][]): number {
  // Fix modulo, dims, and flattened cell count.
  const MOD = 1000000007;
  // Read grid dimensions.
  const m = grid.length, n = grid[0].length;
  // Precompute total flattened cells.
  const N = m * n;
  // dp holds path counts per flattened cell.
  const dp = new Int32Array(N);
  // goDown maps a mirror to its landing when entered moving right.
  const goDown = new Int32Array(N);
  // goRight maps a mirror to its landing when entered moving down.
  const goRight = new Int32Array(N);
  // Sweep cells in reverse so chained targets resolve first.
  for (let i = m - 1; i >= 0; i--) {
    // Scan the row right-to-left for dependency order.
    for (let j = n - 1; j >= 0; j--) {
      // Only mirrors need reflection targets.
      if (grid[i][j] !== 1) continue;
      // Flatten mirror coordinates.
      const id = i * n + j;
      // Entered moving right: drop below, or mark out of bounds.
      if (i + 1 >= m) goDown[id] = -1;
      // Land directly when the cell below is empty.
      else if (grid[i + 1][j] === 0) goDown[id] = (i + 1) * n + j;
      // Else chain through the next mirror's right-turn target.
      else goDown[id] = goRight[(i + 1) * n + j];
      // Entered moving down: shift right, or mark out of bounds.
      if (j + 1 >= n) goRight[id] = -1;
      // Land directly when the cell to the right is empty.
      else if (grid[i][j + 1] === 0) goRight[id] = i * n + j + 1;
      // Else chain through the next mirror's down-turn target.
      else goRight[id] = goDown[i * n + j + 1];
    }
  }
  // Seed one way to stand on the start cell.
  dp[0] = 1;
  // Sweep cells forward in topological (row-major) order.
  for (let i = 0; i < m; i++) {
    // Visit each column left to right.
    for (let j = 0; j < n; j++) {
      // The robot never stands on a mirror.
      if (grid[i][j] === 1) continue;
      // Fetch ways reaching this cell.
      const cur = dp[i * n + j];
      // Skip unreachable cells.
      if (cur === 0) continue;
      // Do not expand past the destination.
      if (i === m - 1 && j === n - 1) continue;
      // Attempt the intended right move when inside bounds.
      if (j + 1 < n) {
        // Resolve landing: direct step or precomputed reflection.
        const t = grid[i][j + 1] === 0 ? i * n + j + 1 : goDown[i * n + j + 1];
        // Add paths unless the reflection exits the grid.
        if (t !== -1) dp[t] = (dp[t] + cur) % MOD;
      }
      // Attempt the intended down move when inside bounds.
      if (i + 1 < m) {
        // Resolve landing: direct step or precomputed reflection.
        const t = grid[i + 1][j] === 0 ? (i + 1) * n + j : goRight[(i + 1) * n + j];
        // Add paths unless the reflection exits the grid.
        if (t !== -1) dp[t] = (dp[t] + cur) % MOD;
      }
    }
  }
  // Return destination count modulo 1e9+7.
  return dp[N - 1] % MOD;
}
