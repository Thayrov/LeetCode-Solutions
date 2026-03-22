/*
1886. Determine Whether Matrix Can Be Obtained By Rotation

Given two n x n binary matrices mat and target, return true if it is possible to make mat equal to target by rotating mat in 90-degree increments, or false otherwise.

Example 1:
Input: mat = [[0,1],[1,0]], target = [[1,0],[0,1]]
Output: true
Explanation: We can rotate mat 90 degrees clockwise to make mat equal target.

Example 2:
Input: mat = [[0,1],[1,1]], target = [[1,0],[0,1]]
Output: false
Explanation: It is impossible to make mat equal to target by rotating mat.

Example 3:
Input: mat = [[0,0,0],[0,1,0],[1,1,1]], target = [[1,1,1],[0,1,0],[0,0,0]]
Output: true
Explanation: We can rotate mat 90 degrees clockwise two times to make mat equal target.

Constraints:
n == mat.length == target.length
n == mat[i].length == target[i].length
1 <= n <= 10
mat[i][j] and target[i][j] are either 0 or 1.

</> Typescript code:
*/

function findRotation(mat: number[][], target: number[][]): boolean {
  // Get the dimension of the square matrix
  const n = mat.length;
  // Initialize flags for each possible 90-degree increment rotation
  let r0 = true,
    r90 = true,
    r180 = true,
    r270 = true;

  // Single pass through the matrix to check all rotation possibilities simultaneously
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // Compare current cell with 0-degree rotation (identity)
      if (mat[i][j] !== target[i][j]) r0 = false;
      // Compare current cell with 90-degree clockwise rotation equivalent
      if (mat[i][j] !== target[j][n - 1 - i]) r90 = false;
      // Compare current cell with 180-degree rotation equivalent
      if (mat[i][j] !== target[n - 1 - i][n - 1 - j]) r180 = false;
      // Compare current cell with 270-degree rotation equivalent
      if (mat[i][j] !== target[n - 1 - j][i]) r270 = false;

      // Performance Optimization: If no rotation matches, exit early
      if (!r0 && !r90 && !r180 && !r270) return false;
    }
  }
  // Return true if at least one rotation state matches the target matrix
  return r0 || r90 || r180 || r270;
}
