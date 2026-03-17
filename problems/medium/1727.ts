/*
1727. Largest Submatrix With Rearrangements

You are given a binary matrix matrix of size m x n, and you are allowed to rearrange the columns of the matrix in any order.
Return the area of the largest submatrix within matrix where every element of the submatrix is 1 after reordering the columns optimally.

Example 1:
Input: matrix = [[0,0,1],[1,1,1],[1,0,1]]
Output: 4
Explanation: You can rearrange the columns as shown above.
The largest submatrix of 1s, in bold, has an area of 4.

Example 2:
Input: matrix = [[1,0,1,0,1]]
Output: 3
Explanation: You can rearrange the columns as shown above.
The largest submatrix of 1s, in bold, has an area of 3.

Example 3:
Input: matrix = [[1,1,0],[1,0,1]]
Output: 2
Explanation: Notice that you must rearrange entire columns, and there is no way to make a submatrix of 1s larger than an area of 2.

Constraints:
m == matrix.length
n == matrix[i].length
1 <= m * n <= 10^5
matrix[i][j] is either 0 or 1.

</> Typescript code:
*/

function largestSubmatrix(matrix: number[][]): number {
  const m = matrix.length; // Store number of rows
  const n = matrix[0].length; // Store number of columns
  let maxArea = 0; // Initialize global maximum area tracker

  // Precompute heights: for each cell, calculate the number of consecutive 1s above it
  for (let i = 1; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // If current cell is 1, increment its value by the value of the cell above it
      if (matrix[i][j] === 1) {
        matrix[i][j] += matrix[i - 1][j];
      }
      // If current cell is 0, the height reset is already handled (it stays 0)
    }
  }

  // Process each row to find the largest rectangle ending at that row
  for (let i = 0; i < m; i++) {
    // Create a copy of the current row's heights and sort them in descending order
    // This simulates rearranging columns to place the tallest blocks together
    const heights = matrix[i].slice().sort((a, b) => b - a);

    for (let k = 0; k < n; k++) {
      if (heights[k] === 0) break; // Optimization: stop if height is 0 (no more rectangles possible)
      // Area is the current height multiplied by the number of columns with height >= current height
      const area = heights[k] * (k + 1);
      // Update the global maximum if the current area is larger
      if (area > maxArea) maxArea = area;
    }
  }

  return maxArea; // Return the final calculated maximum area
}
