/* 
827. Making A Large Island

You are given an n x n binary matrix grid. You are allowed to change at most one 0 to be 1.

Return the size of the largest island in grid after applying this operation.

An island is a 4-directionally connected group of 1s.

Example 1:
Input: grid = [[1,0],[0,1]]
Output: 3
Explanation: Change one 0 to 1 and connect two 1s, then we get an island with area = 3.

Example 2:
Input: grid = [[1,1],[1,0]]
Output: 4
Explanation: Change the 0 to 1 and make the island bigger, only one island with area = 4.

Example 3:
Input: grid = [[1,1],[1,1]]
Output: 4
Explanation: Can't change any 0 to 1, only one island with area = 4.

Constraints:
n == grid.length
n == grid[i].length
1 <= n <= 500
grid[i][j] is either 0 or 1.

</> Typescript Code:
*/

function largestIsland(grid: number[][]): number {
  // Get the size of the matrix
  const n = grid.length;

  // Prepare an array to store the area for each connected component (by label)
  // We start from index 2 because we'll label the first island component with '2'
  const area = new Array(n * n + 2).fill(0);

  // 'label' will be assigned to each found island component
  let label = 2;

  // Track if we have seen at least one zero in the grid
  let hasZero = false;

  // 'result' will store the largest island size found
  let result = 0;

  // ========= First pass: label each connected component of 1's =========
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      // Check if there's at least one zero
      if (grid[r][c] === 0) hasZero = true;

      // If we find a cell with '1', it means it's a new island to label
      if (grid[r][c] === 1) {
        // Start BFS from this cell to label the entire island
        const queue: [number, number][] = [[r, c]];

        // Update the cell value with the current label
        grid[r][c] = label;

        // 'size' will track the number of cells in this connected component
        let size = 1;

        // Continue BFS while there are cells in the queue
        while (queue.length) {
          // Extract front cell from the queue
          const [cr, cc] = queue.shift() as [number, number];

          // Explore and label the neighboring cells if they are '1'
          if (cr > 0 && grid[cr - 1][cc] === 1) {
            grid[cr - 1][cc] = label;
            queue.push([cr - 1, cc]);
            size++;
          }
          if (cr < n - 1 && grid[cr + 1][cc] === 1) {
            grid[cr + 1][cc] = label;
            queue.push([cr + 1, cc]);
            size++;
          }
          if (cc > 0 && grid[cr][cc - 1] === 1) {
            grid[cr][cc - 1] = label;
            queue.push([cr, cc - 1]);
            size++;
          }
          if (cc < n - 1 && grid[cr][cc + 1] === 1) {
            grid[cr][cc + 1] = label;
            queue.push([cr, cc + 1]);
            size++;
          }
        }

        // Store the computed size in our 'area' array
        area[label++] = size;

        // Track the biggest area encountered so far
        result = Math.max(result, size);
      }
    }
  }

  // If we found no zero, it means we can't flip anything;
  // so we return the largest labeled island (or the entire grid if it's all 1).
  if (!hasZero) return result;

  // ========= Second pass: try flipping each '0' to '1' =========
  // We'll sum up the distinct connected components around that zero
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      // If this cell is '0', flipping it might yield a bigger island
      if (grid[r][c] === 0) {
        // 'sum' starts from 1 to include this flipped cell
        let sum = 1;

        // Use a set to avoid counting the same island more than once
        const seen = new Set<number>();

        // Check the up, down, left, right neighbors if they are part of labeled islands
        if (r > 0 && grid[r - 1][c] > 1) seen.add(grid[r - 1][c]);
        if (r < n - 1 && grid[r + 1][c] > 1) seen.add(grid[r + 1][c]);
        if (c > 0 && grid[r][c - 1] > 1) seen.add(grid[r][c - 1]);
        if (c < n - 1 && grid[r][c + 1] > 1) seen.add(grid[r][c + 1]);

        // Add up the areas from all distinct neighboring islands
        for (const id of seen) {
          sum += area[id];
        }

        // Update the overall result if this flip yields a bigger island
        result = Math.max(result, sum);
      }
    }
  }

  // Finally, return the maximum island size possible
  return result;
}
