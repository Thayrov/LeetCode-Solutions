/*
1878. Get Biggest Three Rhombus Sums in a Grid

You are given an m x n integer matrix grid​​​.
A rhombus sum is the sum of the elements that form the border of a regular rhombus shape in grid​​​. The rhombus must have the shape of a square rotated 45 degrees with each of the corners centered in a grid cell. Below is an image of four valid rhombus shapes with the corresponding colored cells that should be included in each rhombus sum:
Note that the rhombus can have an area of 0, which is depicted by the purple rhombus in the bottom right corner.
Return the biggest three distinct rhombus sums in the grid in descending order. If there are less than three distinct values, return all of them.

Example 1:
Input: grid = [[3,4,5,1,3],[3,3,4,2,3],[20,30,200,40,10],[1,5,5,4,1],[4,3,2,2,5]]
Output: [228,216,211]
Explanation: The rhombus shapes for the three biggest distinct rhombus sums are depicted above.
- Blue: 20 + 3 + 200 + 5 = 228
- Red: 200 + 2 + 10 + 4 = 216
- Green: 5 + 200 + 4 + 2 = 211

Example 2:
Input: grid = [[1,2,3],[4,5,6],[7,8,9]]
Output: [20,9,8]
Explanation: The rhombus shapes for the three biggest distinct rhombus sums are depicted above.
- Blue: 4 + 2 + 6 + 8 = 20
- Red: 9 (area 0 rhombus in the bottom right corner)
- Green: 8 (area 0 rhombus in the bottom middle)

Example 3:
Input: grid = [[7,7,7]]
Output: [7]
Explanation: All three possible rhombus sums are the same, so return [7].

Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 50
1 <= grid[i][j] <= 10^5

</> Typescript code:
*/

function getBiggestThree(grid: number[][]): number[] {
  const m = grid.length,
    n = grid[0].length;
  // Use a Set to store distinct rhombus sums automatically
  const sums = new Set<number>();

  // Prefix sum arrays for two types of diagonals (\ and /)
  // d1: Top-left to bottom-right; d2: Top-right to bottom-left
  const d1 = Array.from({ length: m + 1 }, () => new Float64Array(n + 2));
  const d2 = Array.from({ length: m + 1 }, () => new Float64Array(n + 2));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // Build prefix sums: current value + the previous value in that diagonal direction
      d1[i + 1][j + 1] = d1[i][j] + grid[i][j];
      d2[i + 1][j + 1] = d2[i][j + 2] + grid[i][j];
      // Area 0 rhombuses are just the individual cell values
      sums.add(grid[i][j]);
    }
  }

  // Determine the maximum possible 'radius' (s) of a rhombus given grid constraints
  const maxSide = Math.floor((Math.min(m, n) - 1) / 2);

  // Iterate through all possible sizes s and all possible centers (i, j)
  for (let s = 1; s <= maxSide; s++) {
    for (let i = s; i < m - s; i++) {
      for (let j = s; j < n - s; j++) {
        // Define coordinates for the 4 vertices of the rhombus
        const top = [i - s, j],
          bottom = [i + s, j],
          left = [i, j - s],
          right = [i, j + s];

        // Calculate the sum of each of the 4 boundaries using the prefix sum arrays
        const side1 = d1[right[0] + 1][right[1] + 1] - d1[top[0]][top[1]];
        const side2 =
          d2[bottom[0] + 1][bottom[1] + 1] - d2[right[0]][right[1] + 2];
        const side3 = d1[bottom[0] + 1][bottom[1] + 1] - d1[left[0]][left[1]];
        const side4 = d2[left[0] + 1][left[1] + 1] - d2[top[0]][top[1] + 2];

        // Sum the sides and subtract the vertices because they were counted twice in the side sums
        const total =
          side1 +
          side2 +
          side3 +
          side4 -
          grid[top[0]][top[1]] -
          grid[bottom[0]][bottom[1]] -
          grid[left[0]][left[1]] -
          grid[right[0]][right[1]];
        sums.add(total);
      }
    }
  }

  // Convert Set to array, sort numerically descending, and take the top 3
  return Array.from(sums)
    .sort((a, b) => b - a)
    .slice(0, 3);
}
