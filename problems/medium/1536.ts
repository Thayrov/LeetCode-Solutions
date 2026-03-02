/*
1536. Minimum Swaps to Arrange a Binary Grid

Given an n x n binary grid, in one step you can choose two adjacent rows of the grid and swap them.
A grid is said to be valid if all the cells above the main diagonal are zeros.
Return the minimum number of steps needed to make the grid valid, or -1 if the grid cannot be valid.
The main diagonal of a grid is the diagonal that starts at cell (1, 1) and ends at cell (n, n).

Example 1:
Input: grid = [[0,0,1],[1,1,0],[1,0,0]]
Output: 3

Example 2:
Input: grid = [[0,1,1,0],[0,1,1,0],[0,1,1,0],[0,1,1,0]]
Output: -1
Explanation: All rows are similar, swaps have no effect on the grid.

Example 3:
Input: grid = [[1,0,0],[1,1,0],[1,1,1]]
Output: 0

Constraints:
n == grid.length == grid[i].length
1 <= n <= 200
grid[i][j] is either 0 or 1

</> Typescript code:
*/

function minSwaps(grid: number[][]): number {
  const n = grid.length;
  // Map each row to its count of trailing zeros to simplify the grid into a 1D array
  const trail: number[] = new Array(n);
  for (let i = 0; i < n; i++) {
    let count = 0;
    // Count consecutive zeros from right to left
    for (let j = n - 1; j >= 0 && grid[i][j] === 0; j--) count++;
    trail[i] = count;
  }
  let swaps = 0;
  // Iterate through each row position to satisfy the diagonal constraint
  for (let i = 0; i < n; i++) {
    // Row i needs at least (n - 1 - i) trailing zeros
    const target = n - 1 - i;
    let found = -1;
    // Greedy search for the first available row that meets the requirement
    for (let j = i; j < n; j++) {
      if (trail[j] >= target) {
        found = j;
        break;
      }
    }
    // If no such row exists, the grid cannot be made valid
    if (found === -1) return -1;
    // Bubble the found row up to the current position i and count swaps
    for (let j = found; j > i; j--) {
      const tmp = trail[j];
      trail[j] = trail[j - 1];
      trail[j - 1] = tmp;
      swaps++;
    }
  }
  return swaps;
}
