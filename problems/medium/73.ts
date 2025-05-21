/*
73. Set Matrix Zeroes

Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.
You must do it in place.

Example 1:
Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]

Example 2:
Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]

Constraints:
m == matrix.length
n == matrix[0].length
1 <= m, n <= 200
-2^31 <= matrix[i][j] <= 2^31 - 1
 
Follow up:
A straightforward solution using O(mn) space is probably a bad idea.
A simple improvement uses O(m + n) space, but still not the best solution.
Could you devise a constant space solution?

</> Typescript code:
*/

/**
 Do not return anything, modify matrix in-place instead.
 */
function setZeroes(matrix: number[][]): void {
  // Retrieve matrix dimensions once for speed.
  const m = matrix.length,
    n = matrix[0].length;
  // row0 & col0 track whether first row/column must be zeroed later.
  let row0 = false,
    col0 = false;

  // Check if any element in first column is zero.
  for (let i = 0; i < m; ++i) if (matrix[i][0] === 0) col0 = true;
  // Check if any element in first row is zero.
  for (let j = 0; j < n; ++j) if (matrix[0][j] === 0) row0 = true;

  // Use first row & column as zero markers for the rest of the matrix.
  for (let i = 1; i < m; ++i)
    for (let j = 1; j < n; ++j)
      // Upon finding a zero...
      if (matrix[i][j] === 0) {
        // Mark its row.
        matrix[i][0] = 0;
        // Mark its column.
        matrix[0][j] = 0;
      }

  // Zero entire rows based on markers in first column.
  for (let i = 1; i < m; ++i)
    if (matrix[i][0] === 0) for (let j = 1; j < n; ++j) matrix[i][j] = 0;

  // Zero entire columns based on markers in first row.
  for (let j = 1; j < n; ++j)
    if (matrix[0][j] === 0) for (let i = 1; i < m; ++i) matrix[i][j] = 0;

  // Zero the first column if needed.
  if (col0) for (let i = 0; i < m; ++i) matrix[i][0] = 0;
  // Zero the first row if needed.
  if (row0) for (let j = 0; j < n; ++j) matrix[0][j] = 0;
}
