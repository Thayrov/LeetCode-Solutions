/*
2267. Check if There Is a Valid Parentheses String Path

A parentheses string is a non-empty string consisting only of '(' and ')'. It is valid if any of the following conditions is true:
It is ().
It can be written as AB (A concatenated with B), where A and B are valid parentheses strings.
It can be written as (A), where A is a valid parentheses string.
You are given an m x n matrix of parentheses grid. A valid parentheses string path in the grid is a path satisfying all of the following conditions:
The path starts from the upper left cell (0, 0).
The path ends at the bottom-right cell (m - 1, n - 1).
The path only ever moves down or right.
The resulting parentheses string formed by the path is valid.
Return true if there exists a valid parentheses string path in the grid. Otherwise, return false.

Example 1:
Input: grid = [["(","(","("],[")","(",")"],["(","(",")"],["(","(",")"]]
Output: true
Explanation: The above diagram shows two possible paths that form valid parentheses strings.
The first path shown results in the valid parentheses string "()(())".
The second path shown results in the valid parentheses string "((()))".
Note that there may be other valid parentheses string paths.

Example 2:
Input: grid = [[")",")"],["(","("]]
Output: false
Explanation: The two possible paths form the parentheses strings "))(" and ")((". Since neither of them are valid parentheses strings, we return false.

Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 100
grid[i][j] is either '(' or ')'.

</> Typescript code:
*/

function hasValidPath(grid: string[][]): boolean {
  // Cache dimensions and total path length.
  const m = grid.length;
  // Cache row width.
  const n = grid[0].length;
  // Path length is fixed for down/right moves.
  const L = m + n - 1;
  // Odd length can never form a balanced string.
  if ((L & 1) === 1) return false;
  // Valid path must open with '(' and close with ')'.
  if (grid[0][0] === ")" || grid[m - 1][n - 1] === "(") return false;
  // Stride per cell in the flat table.
  const W = L + 1;
  // Balance above half length can never close.
  const maxBal = L >> 1;
  // Flat reachability table over (cell, balance).
  const dp = new Uint8Array(m * n * W);
  // Index helper for (row, col, balance).
  const at = (i: number, j: number, b: number): number => (i * n + j) * W + b;
  // Seed start cell with balance one.
  dp[at(0, 0, 1)] = 1;
  // Sweep cells in row-major path order.
  for (let i = 0; i < m; i++) {
    // Scan each column of the current row.
    for (let j = 0; j < n; j++) {
      // Start cell is already seeded.
      if (i === 0 && j === 0) continue;
      // Step delta of the current parenthesis.
      const v = grid[i][j] === "(" ? 1 : -1;
      // Try every feasible balance at this cell.
      for (let b = 0; b <= maxBal; b++) {
        // Derive required predecessor balance.
        const pb = b - v;
        // Skip out-of-range predecessor balances.
        if (pb < 0 || pb > maxBal) continue;
        // Reachable only via top or left predecessor.
        if (i > 0 && dp[at(i - 1, j, pb)]) {
          // Reachable from top, fall through to pruning.
        } else if (j > 0 && dp[at(i, j - 1, pb)]) {
          // Reachable from left, fall through to pruning.
        } else {
          // No reachable predecessor, skip.
          continue;
        }
        // Steps left after this cell.
        const rem = L - 1 - (i + j);
        // Balance must still be closable.
        if (b > rem) continue;
        // Remaining parity must match balance parity.
        if (((rem - b) & 1) === 1) continue;
        // Mark balance reachable at this cell.
        dp[at(i, j, b)] = 1;
      }
    }
  }
  // Target reachable with zero balance.
  return dp[at(m - 1, n - 1, 0)] === 1;
}
