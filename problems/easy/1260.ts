/*
1260. Shift 2D Grid

Given a 2D grid of size m x n and an integer k. You need to shift the grid k times.

In one shift operation:
Element at grid[i][j] moves to grid[i][j + 1].
Element at grid[i][n - 1] moves to grid[i + 1][0].
Element at grid[m - 1][n - 1] moves to grid[0][0].

Return the 2D grid after applying shift operation k times.

Example 1:
Input: grid = [[1,2,3],[4,5,6],[7,8,9]], k = 1
Output: [[9,1,2],[3,4,5],[6,7,8]]

Example 2:
Input: grid = [[3,8,1,9],[19,7,2,5],[4,6,11,10],[12,0,21,13]], k = 4
Output: [[12,0,21,13],[3,8,1,9],[19,7,2,5],[4,6,11,10]]

Example 3:
Input: grid = [[1,2,3],[4,5,6],[7,8,9]], k = 9
Output: [[1,2,3],[4,5,6],[7,8,9]]

Constraints:
m == grid.length
n == grid[i].length
1 <= m <= 50
1 <= n <= 50
-1000 <= grid[i][j] <= 1000
0 <= k <= 100

</> Typescript code:
*/

function shiftGrid(grid: number[][], k: number): number[][] {
  // Cache the matrix dimensions.
  const rows = grid.length;
  // Cache the shared row width.
  const columns = grid[0].length;
  // Flatten the dimensions into the number of cells.
  const size = rows * columns;
  // Reduce full rotations to the equivalent residual shift.
  const shift = k % size;
  // Allocate the required output matrix once.
  const result = Array.from({ length: rows }, () => new Array<number>(columns));

  // Visit every destination in row-major order.
  for (let destination = 0; destination < size; destination++) {
    // Map the destination backward through the circular shift to its source.
    const source = (destination - shift + size) % size;
    // Copy the source cell directly into its shifted destination.
    result[Math.floor(destination / columns)][destination % columns] =
      grid[Math.floor(source / columns)][source % columns];
  }

  // Return the fully shifted matrix.
  return result;
}
