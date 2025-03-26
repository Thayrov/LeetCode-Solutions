/* 
2033. Minimum Operations to Make a Uni-Value Grid

You are given a 2D integer grid of size m x n and an integer x. In one operation, you can add x to or subtract x from any element in the grid.

A uni-value grid is a grid where all the elements of it are equal.

Return the minimum number of operations to make the grid uni-value. If it is not possible, return -1.

Example 1:
Input: grid = [[2,4],[6,8]], x = 2
Output: 4
Explanation: We can make every element equal to 4 by doing the following: 
- Add x to 2 once.
- Subtract x from 6 once.
- Subtract x from 8 twice.
A total of 4 operations were used.

Example 2:
Input: grid = [[1,5],[2,3]], x = 1
Output: 5
Explanation: We can make every element equal to 3.

Example 3:
Input: grid = [[1,2],[3,4]], x = 2
Output: -1
Explanation: It is impossible to make every element equal.

Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 10^5
1 <= m * n <= 10^5
1 <= x, grid[i][j] <= 10^4

</> Typescript code:
*/

function minOperations(grid: number[][], x: number): number {
  // Flatten the 2D grid into a 1D array for easier manipulation
  const flat = grid.flat();

  // Store the modulo of the first element; all elements must have the same modulo with x
  const mod = flat[0] % x;

  // Check if all elements can be transformed to the same value using +/- x
  for (let i = 1; i < flat.length; ++i) {
    if (flat[i] % x !== mod) return -1; // If not, return -1 (impossible)
  }

  // Sort the array to find the median (optimal value to minimize total steps)
  flat.sort((a, b) => a - b);

  // Median element (for even length, lower mid works fine for minimal sum of abs diffs)
  const mid = flat[Math.floor(flat.length / 2)];

  // Compute total operations needed to convert all elements to the median
  return flat.reduce((sum, val) => sum + Math.abs(val - mid) / x, 0);
}
