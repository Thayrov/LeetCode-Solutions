/*
3212. Count Submatrices With Equal Frequency of X and Y

Given a 2D character matrix grid, where grid[i][j] is either 'X', 'Y', or '.', return the number of submatrices that contain:
grid[0][0] 
an equal frequency of 'X' and 'Y'.
at least one 'X'.

Example 1:
Input: grid = [["X","Y","."],["Y",".","."]]
Output: 3
Explanation:

Example 2:
Input: grid = [["X","X"],["X","Y"]]
Output: 0
Explanation:
No submatrix has an equal frequency of 'X' and 'Y'.

Example 3:
Input: grid = [[".","."],[".","."]]
Output: 0
Explanation:
No submatrix has at least one 'X'.

Constraints:
1 <= grid.length, grid[i].length <= 1000
grid[i][j] is either 'X', 'Y', or '.'.

</> Typescript code:
*/

function numberOfSubmatrices(grid: string[][]): number {
  // Get grid dimensions
  const rows = grid.length;
  const cols = grid[0].length;
  // Initialize 2D arrays with Int32Array for better memory performance and speed
  // Padding with +1 to handle index out-of-bounds (row-1, col-1) naturally
  const countX = Array.from(
    { length: rows + 1 },
    () => new Int32Array(cols + 1),
  );
  const countY = Array.from(
    { length: rows + 1 },
    () => new Int32Array(cols + 1),
  );
  let result = 0;

  // Iterate through each cell in the matrix
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Apply 2D Prefix Sum formula: Current = Top + Left - TopLeft + Delta
      // This counts total 'X's from (0,0) to (i,j) in O(1) time
      countX[i + 1][j + 1] =
        countX[i][j + 1] +
        countX[i + 1][j] -
        countX[i][j] +
        (grid[i][j] === "X" ? 1 : 0);
      // Repeat the same logic to track frequency of 'Y's
      countY[i + 1][j + 1] =
        countY[i][j + 1] +
        countY[i + 1][j] -
        countY[i][j] +
        (grid[i][j] === "Y" ? 1 : 0);

      // Condition 1: Submatrix starting at (0,0) must contain at least one 'X'
      // Condition 2: Submatrix must have an equal frequency of 'X' and 'Y'
      if (
        countX[i + 1][j + 1] > 0 &&
        countX[i + 1][j + 1] === countY[i + 1][j + 1]
      ) {
        result++;
      }
    }
  }

  // Return the total count of valid submatrices
  return result;
}
