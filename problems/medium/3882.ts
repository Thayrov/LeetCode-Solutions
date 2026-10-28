/*
3882. Minimum XOR Path in a Grid

You are given a 2D integer array grid of size m * n.
You start at the top-left cell (0, 0) and want to reach the bottom-right cell (m - 1, n - 1).
At each step, you may move either right or down.
The cost of a path is defined as the bitwise XOR of all the values in the cells along that path, including the start and end cells.
Return the minimum possible XOR value among all valid paths from (0, 0) to (m - 1, n - 1).

Example 1:
Input: grid = [[1,2],[3,4]]
Output: 6
Explanation:
There are two valid paths:
(0, 0) -> (0, 1) -> (1, 1) with XOR: 1 XOR 2 XOR 4 = 7
(0, 0) -> (1, 0) -> (1, 1) with XOR: 1 XOR 3 XOR 4 = 6
The minimum XOR value among all valid paths is 6.

Example 2:
Input: grid = [[6,7],[5,8]]
Output: 9
Explanation:
There are two valid paths:
(0, 0) -> (0, 1) -> (1, 1) with XOR: 6 XOR 7 XOR 8 = 9
(0, 0) -> (1, 0) -> (1, 1) with XOR: 6 XOR 5 XOR 8 = 11
The minimum XOR value among all valid paths is 9.

Example 3:
Input: grid = [[2,7,5]]
Output: 0
Explanation:
There is only one valid path:
(0, 0) -> (0, 1) -> (0, 2) with XOR: 2 XOR 7 XOR 5 = 0
The XOR value of this path is 0, which is the minimum possible.

Constraints:
1 <= m == grid.length <= 1000
1 <= n == grid[i].length <= 1000
m * n <= 1000
0 <= grid[i][j] <= 1023

</> Typescript code:
*/

function minCost(grid: number[][]): number {
  // Cache row count.
  const m = grid.length;
  // Cache column count.
  const n = grid[0].length;
  // XOR domain size for values below 1024.
  const W = 1024;
  // Reachable bitset for previous row.
  let prev = new Uint8Array(n * W);
  // Reachable bitset for current row.
  let cur = new Uint8Array(n * W);
  // Walk rows top to bottom.
  for (let i = 0; i < m; i++) {
    // Clear current row states.
    cur.fill(0);
    // Walk columns left to right.
    for (let j = 0; j < n; j++) {
      // Cache current cell value.
      const v = grid[i][j];
      // Cache base offset for this column.
      const base = j * W;
      // Seed start cell with its own value.
      if (i === 0 && j === 0) {
        // Mark single start XOR reachable.
        cur[base + v] = 1;
        // Skip transition for origin.
        continue;
      }
      // Scan every possible XOR result.
      for (let x = 0; x < W; x++) {
        // Map target through cell value to source.
        const src = x ^ v;
        // Inherit from top when source was reachable.
        if (i > 0 && prev[j * W + src]) cur[base + x] = 1;
        // Otherwise inherit from left when source was reachable.
        else if (j > 0 && cur[(j - 1) * W + src]) cur[base + x] = 1;
      }
    }
    // Swap row buffers for next iteration.
    const t = prev; prev = cur; cur = t;
  }
  // Cache base offset for target column.
  const base = (n - 1) * W;
  // Scan upward for smallest reachable XOR.
  for (let x = 0; x < W; x++) if (prev[base + x]) return x;
  // Unreachable fallback, never hit for valid grids.
  return -1;
}
