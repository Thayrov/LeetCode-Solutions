/*
48. Rotate Image

You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).
You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

Example 1:
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]

Example 2:
Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

Constraints:
n == matrix.length == matrix[i].length
1 <= n <= 20
-1000 <= matrix[i][j] <= 1000

</> Typescript code:
*/

/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
  // Store the matrix size.
  const n = matrix.length;

  // Iterate through each row.
  for (let i = 0; i < n; i++) {
    // Iterate only through columns after the diagonal to avoid swapping twice.
    for (let j = i + 1; j < n; j++) {
      // Store the current upper-triangle value temporarily.
      const temp = matrix[i][j];

      // Move the mirrored lower-triangle value into the upper-triangle position.
      matrix[i][j] = matrix[j][i];

      // Move the saved upper-triangle value into the lower-triangle position.
      matrix[j][i] = temp;
    }
  }

  // Iterate through each row after transposing.
  for (let i = 0; i < n; i++) {
    // Start pointer at the left edge of the row.
    let left = 0;

    // Start pointer at the right edge of the row.
    let right = n - 1;

    // Swap values until both pointers meet.
    while (left < right) {
      // Store the left value temporarily.
      const temp = matrix[i][left];

      // Move the right value into the left position.
      matrix[i][left] = matrix[i][right];

      // Move the saved left value into the right position.
      matrix[i][right] = temp;

      // Move the left pointer inward.
      left++;

      // Move the right pointer inward.
      right--;
    }
  }
}
