/*
1254. Number of Closed Islands

Given a 2D grid consists of 0s (land) and 1s (water). An island is a maximal 4-directionally connected group of 0s and a closed island is an island totally (all left, top, right, bottom) surrounded by 1s.

Return the number of closed islands.

Example 1:
Input: grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]
Output: 2
Explanation:
Islands in gray are closed because they are completely surrounded by water (group of 1s).

Example 2:
Input: grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]
Output: 1

Example 3:
Input: grid = [[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],[1,0,1,0,1,0,1],[1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1]]
Output: 2

Constraints:
1 <= grid.length, grid[0].length <= 100
0 <= grid[i][j] <= 1

</> Typescript code:
*/

function closedIsland(grid: number[][]): number {
  // Cache row count for bounds checks.
  const m = grid.length;
  // Empty grid holds no islands.
  if (m === 0) return 0;
  // Cache column count for index encoding.
  const n = grid[0].length;
  // Empty row holds no islands.
  if (n === 0) return 0;
  // Reusable stack of encoded land cells.
  const stack: number[] = [];
  // Flood-fill one 0-region, converting it to water.
  const flood = (sr: number, sc: number): void => {
    // Skip seeds that are already water.
    if (grid[sr][sc] !== 0) return;
    // Sink seed cell immediately to prevent revisits.
    grid[sr][sc] = 1;
    // Seed explicit stack to avoid recursion depth limits.
    stack.push(sr * n + sc);
    // Drain stack until the region is exhausted.
    while (stack.length > 0) {
      // Pop next encoded cell.
      const cur = stack.pop() as number;
      // Decode row via integer division.
      const r = (cur / n) | 0;
      // Decode column via remainder.
      const c = cur % n;
      // Visit upper neighbor when it is land.
      if (r > 0 && grid[r - 1][c] === 0) { grid[r - 1][c] = 1; stack.push((r - 1) * n + c); }
      // Visit lower neighbor when it is land.
      if (r + 1 < m && grid[r + 1][c] === 0) { grid[r + 1][c] = 1; stack.push((r + 1) * n + c); }
      // Visit left neighbor when it is land.
      if (c > 0 && grid[r][c - 1] === 0) { grid[r][c - 1] = 1; stack.push(r * n + c - 1); }
      // Visit right neighbor when it is land.
      if (c + 1 < n && grid[r][c + 1] === 0) { grid[r][c + 1] = 1; stack.push(r * n + c + 1); }
    }
  };
  // Sink border-connected land along top and bottom edges.
  for (let c = 0; c < n; c++) {
    // Clear region touching the top edge.
    flood(0, c);
    // Clear region touching the bottom edge when distinct.
    if (m > 1) flood(m - 1, c);
  }
  // Sink border-connected land along left and right edges.
  for (let r = 1; r < m - 1; r++) {
    // Clear region touching the left edge.
    flood(r, 0);
    // Clear region touching the right edge when distinct.
    if (n > 1) flood(r, n - 1);
  }
  // Tally surviving interior closed islands.
  let closed = 0;
  // Scan interior rows only; borders cannot host closed islands.
  for (let r = 1; r < m - 1; r++) {
    // Scan interior columns only.
    for (let c = 1; c < n - 1; c++) {
      // Unvisited land starts a new closed island.
      if (grid[r][c] === 0) {
        // Count the newly found island.
        closed++;
        // Sink it so it is never recounted.
        flood(r, c);
      }
    }
  }
  // Return total closed island count.
  return closed;
}
