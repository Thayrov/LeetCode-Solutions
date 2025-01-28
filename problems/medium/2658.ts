/*
2658. Maximum Number of Fish in a Grid

You are given a 0-indexed 2D matrix grid of size m x n, where (r, c) represents:

A land cell if grid[r][c] = 0, or
A water cell containing grid[r][c] fish, if grid[r][c] > 0.
A fisher can start at any water cell (r, c) and can do the following operations any number of times:

Catch all the fish at cell (r, c), or
Move to any adjacent water cell.
Return the maximum number of fish the fisher can catch if he chooses his starting cell optimally, or 0 if no water cell exists.

An adjacent cell of the cell (r, c), is one of the cells (r, c + 1), (r, c - 1), (r + 1, c) or (r - 1, c) if it exists.

Example 1:
Input: grid = [[0,2,1,0],[4,0,0,3],[1,0,0,4],[0,3,2,0]]
Output: 7
Explanation: The fisher can start at cell (1,3) and collect 3 fish, then move to cell (2,3) and collect 4 fish.

Example 2:
Input: grid = [[1,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,1]]
Output: 1
Explanation: The fisher can start at cells (0,0) or (3,3) and collect a single fish. 

Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 10
0 <= grid[i][j] <= 10

*/

function findMaxFish(grid: number[][]): number {
  // Get the dimensions of the grid
  const m = grid.length;
  const n = grid[0].length;
  
  // Initialize the maximum number of fish to 0
  let maxFish = 0;

  // Define a depth-first search (DFS) function to explore the grid
  const dfs = (r: number, c: number): number => {
      // If the current cell is out of bounds or is land (0), return 0
      if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] === 0) return 0;
      
      // Store the number of fish in the current cell
      const fish = grid[r][c];
      
      // Mark the current cell as visited by setting it to 0
      grid[r][c] = 0;
      
      // Recursively explore all four adjacent cells and sum the fish
      return fish + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
  };

  // Iterate over each cell in the grid
  for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
          // If the cell is a water cell (contains fish), start DFS from it
          if (grid[i][j] > 0) {
              // Update the maximum number of fish found so far
              maxFish = Math.max(maxFish, dfs(i, j));
          }
      }
  }

  // Return the maximum number of fish that can be caught
  return maxFish;
}