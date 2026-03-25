/*
3546. Equal Sum Grid Partition I

You are given an m x n matrix grid of positive integers. Your task is to determine if it is possible to make either one horizontal or one vertical cut on the grid such that:
Each of the two resulting sections formed by the cut is non-empty.
The sum of the elements in both sections is equal.
Return true if such a partition exists; otherwise return false.

Example 1:
Input: grid = [[1,4],[2,3]]
Output: true
Explanation:
A horizontal cut between row 0 and row 1 results in two non-empty sections, each with a sum of 5. Thus, the answer is true.

Example 2:
Input: grid = [[1,3],[2,4]]
Output: false
Explanation:
No horizontal or vertical cut results in two non-empty sections with equal sums. Thus, the answer is false.

Constraints:
1 <= m == grid.length <= 10^5
1 <= n == grid[i].length <= 10^5
2 <= m * n <= 10^5
1 <= grid[i][j] <= 10^5

</> Typescript code:
*/

function canPartitionGrid(grid: number[][]): boolean {
  const m = grid.length; // Get the number of rows
  const n = grid[0].length; // Get the number of columns
  let totalSum = 0; // Initialize a variable to store the sum of all elements

  // Calculate the total sum of the grid to determine the required partition value
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      totalSum += grid[i][j];
    }
  }

  // If the total sum is odd, it's impossible to split it into two equal integer halves
  if (totalSum % 2 !== 0) return false;
  const target = totalSum / 2; // The sum each section must reach

  let rowSumAccumulator = 0; // Accumulator for horizontal partition check
  // Iterate through rows except the last one (to ensure the second section is non-empty)
  for (let i = 0; i < m - 1; i++) {
    for (let j = 0; j < n; j++) {
      rowSumAccumulator += grid[i][j]; // Add current row's elements to the accumulator
    }
    // If the top section equals the target, a valid horizontal cut is found
    if (rowSumAccumulator === target) return true;
  }

  let colSumAccumulator = 0; // Accumulator for vertical partition check
  // Iterate through columns except the last one (to ensure the second section is non-empty)
  for (let j = 0; j < n - 1; j++) {
    for (let i = 0; i < m; i++) {
      colSumAccumulator += grid[i][j]; // Add current column's elements to the accumulator
    }
    // If the left section equals the target, a valid vertical cut is found
    if (colSumAccumulator === target) return true;
  }

  return false; // No valid horizontal or vertical cut was found
}
