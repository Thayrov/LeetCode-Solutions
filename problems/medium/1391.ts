/*
1391. Check if There is a Valid Path in a Grid

Hint
You are given an m x n grid. Each cell of grid represents a street. The street of grid[i][j] can be:
1 which means a street connecting the left cell and the right cell.
2 which means a street connecting the upper cell and the lower cell.
3 which means a street connecting the left cell and the lower cell.
4 which means a street connecting the right cell and the lower cell.
5 which means a street connecting the left cell and the upper cell.
6 which means a street connecting the right cell and the upper cell.
You will initially start at the street of the upper-left cell (0, 0). A valid path in the grid is a path that starts from the upper left cell (0, 0) and ends at the bottom-right cell (m - 1, n - 1). The path should only follow the streets.
Notice that you are not allowed to change any street.
Return true if there is a valid path in the grid or false otherwise.

Example 1:
Input: grid = [[2,4,3],[6,5,2]]
Output: true
Explanation: As shown you can start at cell (0, 0) and visit all the cells of the grid to reach (m - 1, n - 1).

Example 2:
Input: grid = [[1,2,1],[1,2,1]]
Output: false
Explanation: As shown you the street at cell (0, 0) is not connected with any street of any other cell and you will get stuck at cell (0, 0)

Example 3:
Input: grid = [[1,1,2]]
Output: false
Explanation: You will get stuck at cell (0, 1) and you cannot reach cell (0, 2).

Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 300
1 <= grid[i][j] <= 6

</> Typescript code:
*/

function hasValidPath(grid: number[][]): boolean {
  const m = grid.length,
    n = grid[0].length;
  // Standard direction vectors: 0: Up, 1: Right, 2: Down, 3: Left
  const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  // Map street types (1-6) to the indices of 'dirs' they connect to
  const pipe = [
    [], // Placeholder for index 0
    [1, 3], // 1: Left <-> Right
    [0, 2], // 2: Upper <-> Lower
    [2, 3], // 3: Left <-> Lower
    [1, 2], // 4: Right <-> Lower
    [0, 3], // 5: Left <-> Upper
    [0, 1], // 6: Right <-> Upper
  ];

  // Track visited cells to prevent infinite loops and redundant processing
  const visited = Array.from({ length: m }, () => new Uint8Array(n));
  // BFS Queue starting at the top-left cell
  const queue: [number, number][] = [[0, 0]];
  visited[0][0] = 1;

  while (queue.length > 0) {
    const [r, c] = queue.shift()!;
    // Optimization: Return immediately if the target cell is reached
    if (r === m - 1 && c === n - 1) return true;

    // Iterate through all possible exits for the current street type
    for (const d of pipe[grid[r][c]]) {
      const nr = r + dirs[d][0],
        nc = c + dirs[d][1];

      // Check grid boundaries and ensure the neighbor hasn't been visited
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc]) {
        // Validation: The neighbor must have an opening facing the current cell.
        // The opposite direction of d is (d + 2) % 4.
        if (pipe[grid[nr][nc]].includes((d + 2) % 4)) {
          visited[nr][nc] = 1;
          queue.push([nr, nc]);
        }
      }
    }
  }
  // If queue empties without reaching the end, no path exists
  return false;
}
