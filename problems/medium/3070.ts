/*
3070. Count Submatrices with Top-Left Element and Sum Less Than k

You are given a 0-indexed integer matrix grid and an integer k.
Return the number of submatrices that contain the top-left element of the grid, and have a sum less than or equal to k.

Example 1:
Input: grid = [[7,6,3],[6,6,1]], k = 18
Output: 4
Explanation: There are only 4 submatrices, shown in the image above, that contain the top-left element of grid, and have a sum less than or equal to 18.

Example 2:
Input: grid = [[7,2,9],[1,5,0],[2,6,6]], k = 20
Output: 6
Explanation: There are only 6 submatrices, shown in the image above, that contain the top-left element of grid, and have a sum less than or equal to 20.

Constraints:
m == grid.length 
n == grid[i].length
1 <= n, m <= 1000 
0 <= grid[i][j] <= 1000
1 <= k <= 10^9

</> Typescript code:
*/

function countSubmatrices(grid: number[][], k: number): number {
  // Get the number of rows in the grid
  const m = grid.length;
  // Get the number of columns in the grid
  const n = grid[0].length;
  // Initialize a counter for submatrices that meet the criteria
  let count = 0;

  // Iterate through each row of the grid
  for (let i = 0; i < m; i++) {
    // Iterate through each column of the grid
    for (let j = 0; j < n; j++) {
      // Add the sum of the element directly above to the current element
      if (i > 0) grid[i][j] += grid[i - 1][j];
      // Add the sum of the element to the left to the current element
      if (j > 0) grid[i][j] += grid[i][j - 1];
      // Subtract the diagonal element to fix double-counting of the overlapping area
      if (i > 0 && j > 0) grid[i][j] -= grid[i - 1][j - 1];

      // If the calculated prefix sum for submatrix (0,0) to (i,j) is <= k
      if (grid[i][j] <= k) {
        // Increment the valid submatrix count
        count++;
      } else {
        // Since grid values are non-negative, further elements in this row will only increase the sum
        break;
      }
    }
  }

  // Return the final total count of valid submatrices
  return count;
}
