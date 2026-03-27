/*
2946. Matrix Similarity After Cyclic Shifts

You are given an m x n integer matrix mat and an integer k. The matrix rows are 0-indexed.
The following proccess happens k times:
Even-indexed rows (0, 2, 4, ...) are cyclically shifted to the left.
Odd-indexed rows (1, 3, 5, ...) are cyclically shifted to the right.
Return true if the final modified matrix after k steps is identical to the original matrix, and false otherwise.

Example 1:
Input: mat = [[1,2,3],[4,5,6],[7,8,9]], k = 4
Output: false
Explanation:
In each step left shift is applied to rows 0 and 2 (even indices), and right shift to row 1 (odd index).

Example 2:
Input: mat = [[1,2,1,2],[5,5,5,5],[6,3,6,3]], k = 2
Output: true
Explanation:

Example 3:
Input: mat = [[2,2],[2,2]], k = 3
Output: true
Explanation:
As all the values are equal in the matrix, even after performing cyclic shifts the matrix will remain the same.

Constraints:
1 <= mat.length <= 25
1 <= mat[i].length <= 25
1 <= mat[i][j] <= 25
1 <= k <= 50

</> Typescript code:
*/

function areSimilar(mat: number[][], k: number): boolean {
  // Store the number of columns to avoid repeated property access
  const n = mat[0].length;
  // A shift of k is equivalent to a shift of k % n; if k is a multiple of n, no change occurs
  const shift = k % n;
  // If the effective shift is 0, the matrix will always be identical to itself
  if (shift === 0) return true;

  // Iterate through every row in the matrix
  for (let i = 0; i < mat.length; i++) {
    // Iterate through every element in the current row
    for (let j = 0; j < n; j++) {
      // Compare the current element with the element at the position it would shift to.
      // For similarity, mat[i][j] must match the element at the shifted index.
      // (j + shift) % n handles both left and right logic for similarity checks.
      if (mat[i][j] !== mat[i][(j + shift) % n]) {
        // If any single element mismatch is found, the matrix cannot be similar
        return false;
      }
    }
  }
  // If all checks pass, the matrix remains identical after k cyclic shifts
  return true;
}
