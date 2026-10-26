/*
3619. Count Islands With Total Value Divisible by K

You are given an m x n matrix grid and a positive integer k. An island is a group of positive integers (representing land) that are 4-directionally connected (horizontally or vertically).

The total value of an island is the sum of the values of all cells in the island.

Return the number of islands with a total value divisible by k.

Example 1:
Input: grid = [[0,2,1,0,0],[0,5,0,0,5],[0,0,1,0,0],[0,1,4,7,0],[0,2,0,0,8]], k = 5
Output: 2
Explanation:
The grid contains four islands. The islands highlighted in blue have a total value that is divisible by 5, while the islands highlighted in red do not.

Example 2:
Input: grid = [[3,0,3,0], [0,3,0,3], [3,0,3,0]], k = 3
Output: 6
Explanation:
The grid contains six islands, each with a total value that is divisible by 3.

Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 1000
1 <= m * n <= 10^5
0 <= grid[i][j] <= 10^6
1 <= k <= 10^6

</> Typescript code:
*/

function countIslands(grid: number[][], k: number): number {
  // Cache grid dims and init divisible-island count.
  const m = grid.length,
    n = grid[0].length;
  let ans = 0;
  // Reusable flat-index stack for iterative flood fill.
  const stack: number[] = [];
  // Scan every cell for unvisited land.
  for (let r = 0; r < m; r++) {
    // Cache current row to cut indexing overhead.
    const row = grid[r];
    for (let c = 0; c < n; c++) {
      // Water or already counted, skip.
      if (row[c] === 0) continue;
      // Accumulate this island's total value.
      let sum = 0;
      // Reset shared stack for the new island.
      stack.length = 0;
      // Seed total and mark start visited in place.
      sum += row[c];
      row[c] = 0;
      // Push flat index of the seed cell.
      stack.push(r * n + c);
      // Drain the island via iterative DFS.
      while (stack.length !== 0) {
        // Pop next cell index.
        const cur = stack.pop() as number;
        // Decode row via truncating division.
        const cr = (cur / n) | 0;
        // Decode column without modulo.
        const cc = cur - cr * n;
        // Visit upper neighbor if land: add, mark, push.
        if (cr > 0 && grid[cr - 1][cc] !== 0) { sum += grid[cr - 1][cc]; grid[cr - 1][cc] = 0; stack.push(cur - n); }
        // Visit lower neighbor if land: add, mark, push.
        if (cr + 1 < m && grid[cr + 1][cc] !== 0) { sum += grid[cr + 1][cc]; grid[cr + 1][cc] = 0; stack.push(cur + n); }
        // Visit left neighbor if land: add, mark, push.
        if (cc > 0 && grid[cr][cc - 1] !== 0) { sum += grid[cr][cc - 1]; grid[cr][cc - 1] = 0; stack.push(cur - 1); }
        // Visit right neighbor if land: add, mark, push.
        if (cc + 1 < n && grid[cr][cc + 1] !== 0) { sum += grid[cr][cc + 1]; grid[cr][cc + 1] = 0; stack.push(cur + 1); }
      }
      // Count island when its total is divisible by k.
      if (sum % k === 0) ans++;
    }
  }
  // Return number of divisible-total islands.
  return ans;
}
