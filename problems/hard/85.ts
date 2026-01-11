
/* 
85. Maximal Rectangle

Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

Example 1:
Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 6
Explanation: The maximal rectangle is shown in the above picture.

Example 2:
Input: matrix = [["0"]]
Output: 0

Example 3:
Input: matrix = [["1"]]
Output: 1

Constraints:
rows == matrix.length
cols == matrix[i].length
1 <= row, cols <= 200
matrix[i][j] is '0' or '1'

</> Typescript Code:
*/

function maximalRectangle(matrix: string[][]): number {
  // Handle the empty matrix case
  if (matrix.length == 0) return 0;

  let maxArea = 0;
  // Initialize a DP table with zeros
  const dp = Array(matrix.length)
    .fill(0)
    .map(() => Array(matrix[0].length).fill(0));

  // Iterate through each cell of the matrix
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      // Only consider '1's for calculating area
      if (matrix[i][j] === '1') {
        // Update DP value: either start a new row or add to the existing sequence of '1's
        dp[i][j] = j === 0 ? 1 : dp[i][j - 1] + 1;
        let width = dp[i][j];
        // For each '1', check every row above it
        for (let k = i; k >= 0; k--) {
          width = Math.min(width, dp[k][j]); // Find the minimum width
          // Update maxArea by calculating the area with the current width
          maxArea = Math.max(maxArea, width * (i - k + 1));
        }
      }
    }
  }
  return maxArea;
}
