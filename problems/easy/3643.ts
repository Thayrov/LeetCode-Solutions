/*
3643. Flip Square Submatrix Vertically

You are given an m x n integer matrix grid, and three integers x, y, and k.
The integers x and y represent the row and column indices of the top-left corner of a square submatrix and the integer k represents the size (side length) of the square submatrix.
Your task is to flip the submatrix by reversing the order of its rows vertically.
Return the updated matrix.

Example 1:
Input: grid = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]], x = 1, y = 0, k = 3
Output: [[1,2,3,4],[13,14,15,8],[9,10,11,12],[5,6,7,16]]
Explanation:
The diagram above shows the grid before and after the transformation.

Example 2:
Input: grid = [[3,4,2,3],[2,3,4,2]], x = 0, y = 2, k = 2
Output: [[3,4,4,2],[2,3,2,3]]
Explanation:
The diagram above shows the grid before and after the transformation.

Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 50
1 <= grid[i][j] <= 100
0 <= x < m
0 <= y < n
1 <= k <= min(m - x, n - y)

</> Typescript code:
*/

function reverseSubmatrix(
  grid: number[][],
  x: number,
  y: number,
  k: number,
): number[][] {
  // Determine the midpoint of the square submatrix to perform swaps only up to the center
  const half = k >> 1;

  // Iterate through the top half of the rows of the submatrix
  for (let i = 0; i < half; i++) {
    // Cache references to the two rows being swapped to reduce grid access overhead
    const row1 = grid[x + i];
    const row2 = grid[x + k - 1 - i];

    // Iterate through each column within the width of the submatrix
    for (let j = 0; j < k; j++) {
      // Calculate the actual column index in the original grid
      const col = y + j;

      // Perform an in-place swap of the elements at the current column for both rows
      const temp = row1[col];
      row1[col] = row2[col];
      row2[col] = temp;
    }
  }

  // Return the mutated grid after all vertical swaps are completed
  return grid;
}
