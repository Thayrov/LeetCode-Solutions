/* 
407. Trapping Rain Water II

Given an m x n integer matrix heightMap representing the height of each unit cell in a 2D elevation map, return the volume of water it can trap after raining.

Example 1:
Input: heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]
Output: 4
Explanation: After the rain, water is trapped between the blocks.
We have two small ponds 1 and 3 units trapped.
The total volume of water trapped is 4.

Example 2:
Input: heightMap = [[3,3,3,3,3],[3,2,2,2,3],[3,2,1,2,3],[3,2,2,2,3],[3,3,3,3,3]]
Output: 10

Constraints:
m == heightMap.length
n == heightMap[i].length
1 <= m, n <= 200
0 <= heightMap[i][j] <= 2 * 10^4

</> Typescript Code:
*/

function trapRainWater(heightMap: number[][]): number {
  // If the input grid is invalid, return 0
  if (!heightMap || !heightMap.length || !heightMap[0].length) return 0;

  // Store number of rows (m) and columns (n)
  const m = heightMap.length,
    n = heightMap[0].length;

  // Visited matrix to keep track of cells already processed
  const visited = Array.from({length: m}, () => Array(n).fill(false));

  // Min-heap (priority queue) to always pick the lowest boundary
  const minHeap: [number, number, number][] = [];

  // Result variable to accumulate the trapped water volume
  let res = 0;

  // Enqueue the cells on the left and right borders, marking them visited
  for (let i = 0; i < m; i++) {
    visited[i][0] = true;
    visited[i][n - 1] = true;
    minHeap.push([heightMap[i][0], i, 0]);
    minHeap.push([heightMap[i][n - 1], i, n - 1]);
  }

  // Enqueue the cells on the top and bottom borders, marking them visited
  for (let j = 0; j < n; j++) {
    visited[0][j] = true;
    visited[m - 1][j] = true;
    minHeap.push([heightMap[0][j], 0, j]);
    minHeap.push([heightMap[m - 1][j], m - 1, j]);
  }

  // Sort the heap based on the height in ascending order
  minHeap.sort((a, b) => a[0] - b[0]);

  // Directions for exploring neighbors: up, down, left, right
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  // Continuously process the cell with the lowest height boundary
  while (minHeap.length) {
    // Remove the first element (lowest height cell)
    const [h, r, c] = minHeap.shift()!;

    // Explore its neighbors
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;

      // If neighbor is within grid and not visited
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc]) {
        // Mark neighbor as visited
        visited[nr][nc] = true;

        // If neighbor's height is less than the current boundary, water is trapped
        if (heightMap[nr][nc] < h) {
          // Calculate trapped water
          res += h - heightMap[nr][nc];
          // Update the neighbor's height to reflect the new water level
          heightMap[nr][nc] = h;
        }

        // Add the neighbor to the min-heap
        minHeap.push([heightMap[nr][nc], nr, nc]);
      }
    }

    // Sort the heap again so next iteration processes the lowest boundary
    minHeap.sort((a, b) => a[0] - b[0]);
  }

  // Return the total trapped water
  return res;
}
