/*
1559. Detect Cycles in 2D Grid

Hint
Given a 2D array of characters grid of size m x n, you need to find if there exists any cycle consisting of the same value in grid.
A cycle is a path of length 4 or more in the grid that starts and ends at the same cell. From a given cell, you can move to one of the cells adjacent to it - in one of the four directions (up, down, left, or right), if it has the same value of the current cell.
Also, you cannot move to the cell that you visited in your last move. For example, the cycle (1, 1) -> (1, 2) -> (1, 1) is invalid because from (1, 2) we visited (1, 1) which was the last visited cell.
Return true if any cycle of the same value exists in grid, otherwise, return false.

Example 1:
Input: grid = [["a","a","a","a"],["a","b","b","a"],["a","b","b","a"],["a","a","a","a"]]
Output: true
Explanation: There are two valid cycles shown in different colors in the image below:

Example 2:
Input: grid = [["c","c","c","a"],["c","d","c","c"],["c","c","e","c"],["f","c","c","c"]]
Output: true
Explanation: There is only one valid cycle highlighted in the image below:

Example 3:
Input: grid = [["a","b","b"],["b","z","b"],["b","b","a"]]
Output: false

Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 500
grid consists only of lowercase English letters.

</> Typescript code:
*/

function containsCycle(grid: string[][]): boolean {
  const m = grid.length; // Get row count
  const n = grid[0].length; // Get column count
  const visited = new Uint8Array(m * n); // Flattened array for O(1) access and memory efficiency
  const dirs = [0, 1, 0, -1, 0]; // Direction helper for Right, Down, Left, Up moves

  for (let i = 0; i < m; i++) {
    // Iterate through rows
    for (let j = 0; j < n; j++) {
      // Iterate through columns
      if (visited[i * n + j]) continue; // Skip if this cell was already processed in a previous path

      const char = grid[i][j]; // Target character for the current connected component
      // Stack stores [current_row, current_col, parent_row, parent_col] to prevent immediate backtracking
      const stack: [number, number, number, number][] = [[i, j, -1, -1]];

      while (stack.length > 0) {
        const [r, c, pr, pc] = stack.pop()!;

        // If we reach a visited node that isn't the parent we just came from, a cycle exists
        if (visited[r * n + c]) return true;
        visited[r * n + c] = 1; // Mark as visited

        for (let d = 0; d < 4; d++) {
          // Explore 4 directions
          const nr = r + dirs[d];
          const nc = c + dirs[d + 1];

          // Boundary check and ensure the neighbor has the same character value
          if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === char) {
            if (nr === pr && nc === pc) continue; // Critical: Don't go back to the immediate parent
            stack.push([nr, nc, r, c]); // Push next cell and current cell as its parent
          }
        }
      }
    }
  }
  return false; // No cycles found after exhaustive search
}
