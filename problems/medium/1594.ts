/*
1594. Maximum Non Negative Product in a Matrix

You are given a m x n matrix grid. Initially, you are located at the top-left corner (0, 0), and in each step, you can only move right or down in the matrix.
Among all possible paths starting from the top-left corner (0, 0) and ending in the bottom-right corner (m - 1, n - 1), find the path with the maximum non-negative product. The product of a path is the product of all integers in the grid cells visited along the path.
Return the maximum non-negative product modulo 109 + 7. If the maximum product is negative, return -1.
Notice that the modulo is performed after getting the maximum product.

Example 1:
Input: grid = [[-1,-2,-3],[-2,-3,-3],[-3,-3,-2]]
Output: -1
Explanation: It is not possible to get non-negative product in the path from (0, 0) to (2, 2), so return -1.

Example 2:
Input: grid = [[1,-2,1],[1,-2,1],[3,-4,1]]
Output: 8
Explanation: Maximum non-negative product is shown (1 * 1 * -2 * -4 * 1 = 8).

Example 3:
Input: grid = [[1,3],[0,-4]]
Output: 0
Explanation: Maximum non-negative product is shown (1 * 0 * -4 = 0).

Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 15
-4 <= grid[i][j] <= 4

</> Typescript code:
*/

function maxProductPath(grid: number[][]): number {
  const m = grid.length; // Number of rows
  const n = grid[0].length; // Number of columns
  // maxDP stores the highest possible product reaching cell (i, j)
  const maxDP: number[][] = Array.from({ length: m }, () => new Array(n));
  // minDP stores the lowest (most negative) possible product reaching cell (i, j)
  const minDP: number[][] = Array.from({ length: m }, () => new Array(n));

  // Initialize the starting point
  maxDP[0][0] = minDP[0][0] = grid[0][0];

  // Pre-fill the first column (only one possible path: from above)
  for (let i = 1; i < m; i++) {
    maxDP[i][0] = minDP[i][0] = maxDP[i - 1][0] * grid[i][0];
  }
  // Pre-fill the first row (only one possible path: from the left)
  for (let j = 1; j < n; j++) {
    maxDP[0][j] = minDP[0][j] = maxDP[0][j - 1] * grid[0][j];
  }

  // Fill the DP tables for the rest of the grid
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      // Optimization: If current cell is 0, all products passing through here become 0
      if (grid[i][j] === 0) {
        maxDP[i][j] = minDP[i][j] = 0;
        continue;
      }
      // Calculate potential products from top and left using both max and min values
      const a = maxDP[i - 1][j] * grid[i][j];
      const b = minDP[i - 1][j] * grid[i][j];
      const c = maxDP[i][j - 1] * grid[i][j];
      const d = minDP[i][j - 1] * grid[i][j];
      // The new max could come from min * negative_number or max * positive_number
      maxDP[i][j] = Math.max(a, b, c, d);
      minDP[i][j] = Math.min(a, b, c, d);
    }
  }

  const res = maxDP[m - 1][n - 1];
  // If result is negative, no non-negative path exists; otherwise, apply modulo 10^9 + 7
  // Using Math.round to handle potential floating point precision artifacts in large numbers
  return res < 0 ? -1 : Math.round(res % 1000000007);
}
