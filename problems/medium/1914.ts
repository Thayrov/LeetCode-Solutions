/*
1914. Cyclically Rotating a Grid

Hint
You are given an m x n integer matrix grid​​​, where m and n are both even integers, and an integer k.
The matrix is composed of several layers, which is shown in the below image, where each color is its own layer:
A cyclic rotation of the matrix is done by cyclically rotating each layer in the matrix. To cyclically rotate a layer once, each element in the layer will take the place of the adjacent element in the counter-clockwise direction. An example rotation is shown below:
Return the matrix after applying k cyclic rotations to it.

Example 1:
Input: grid = [[40,10],[30,20]], k = 1
Output: [[10,20],[40,30]]
Explanation: The figures above represent the grid at every state.

Example 2:
Input: grid = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]], k = 2
Output: [[3,4,8,12],[2,11,10,16],[1,7,6,15],[5,9,13,14]]
Explanation: The figures above represent the grid at every state.

Constraints:
m == grid.length
n == grid[i].length
2 <= m, n <= 50
Both m and n are even integers.
1 <= grid[i][j] <= 5000
1 <= k <= 10^9

</> Typescript code:
*/

function rotateGrid(grid: number[][], k: number): number[][] {
  // Store matrix dimensions.
  const m = grid.length,
    n = grid[0].length;

  // Each layer consumes one row/column from every side.
  const layers = Math.min(m, n) >> 1;

  // Process every rectangular layer independently.
  for (let layer = 0; layer < layers; layer++) {
    // Compute current layer boundaries.
    const top = layer,
      left = layer,
      bottom = m - 1 - layer,
      right = n - 1 - layer;

    // Store layer values in clockwise traversal order.
    const vals: number[] = [];

    // Add top edge from left to right.
    for (let c = left; c <= right; c++) vals.push(grid[top][c]);

    // Add right edge from top + 1 to bottom.
    for (let r = top + 1; r <= bottom; r++) vals.push(grid[r][right]);

    // Add bottom edge from right - 1 to left.
    for (let c = right - 1; c >= left; c--) vals.push(grid[bottom][c]);

    // Add left edge from bottom - 1 to top + 1.
    for (let r = bottom - 1; r > top; r--) vals.push(grid[r][left]);

    // Store layer perimeter length.
    const len = vals.length;

    // Reduce rotations because rotating len times changes nothing.
    const shift = k % len;

    // Start reading from shift to simulate counter-clockwise rotation.
    let idx = shift;

    // Write rotated values back to top edge.
    for (let c = left; c <= right; c++) grid[top][c] = vals[idx++ % len];

    // Write rotated values back to right edge.
    for (let r = top + 1; r <= bottom; r++) grid[r][right] = vals[idx++ % len];

    // Write rotated values back to bottom edge.
    for (let c = right - 1; c >= left; c--) grid[bottom][c] = vals[idx++ % len];

    // Write rotated values back to left edge.
    for (let r = bottom - 1; r > top; r--) grid[r][left] = vals[idx++ % len];
  }

  // Return modified matrix.
  return grid;
}
