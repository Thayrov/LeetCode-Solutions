/* 
2503. Maximum Number of Points From Grid Queries

You are given an m x n integer matrix grid and an array queries of size k.

Find an array answer of size k such that for each integer queries[i] you start in the top left cell of the matrix and repeat the following process:

If queries[i] is strictly greater than the value of the current cell that you are in, then you get one point if it is your first time visiting this cell, and you can move to any adjacent cell in all 4 directions: up, down, left, and right.
Otherwise, you do not get any points, and you end this process.
After the process, answer[i] is the maximum number of points you can get. Note that for each query you are allowed to visit the same cell multiple times.

Return the resulting array answer.

Example 1:
Input: grid = [[1,2,3],[2,5,7],[3,5,1]], queries = [5,6,2]
Output: [5,8,1]
Explanation: The diagrams above show which cells we visit to get points for each query.

Example 2:
Input: grid = [[5,2,1],[1,1,2]], queries = [3]
Output: [0]
Explanation: We can not get any points because the value of the top left cell is already greater than or equal to 3.

Constraints:
m == grid.length
n == grid[i].length
2 <= m, n <= 1000
4 <= m * n <= 10^5
k == queries.length
1 <= k <= 10^4
1 <= grid[i][j], queries[i] <= 10^6

</> Typescript code:
*/

// This function computes the maximum number of points obtainable for each query based on the grid values.
function maxPoints(grid: number[][], queries: number[]): number[] {
  // Get grid dimensions and total cell count.
  const m = grid.length,
    n = grid[0].length;
  const total = m * n;
  // Prepare an array of all cells with their values and coordinates.
  const cells: { val: number; i: number; j: number }[] = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      cells.push({ val: grid[i][j], i, j });
    }
  }
  // Sort cells by their grid value in ascending order.
  cells.sort((a, b) => a.val - b.val);
  // Map each query with its original index and sort queries by the threshold.
  const qArr = queries.map((q, idx) => ({ q, idx }));
  qArr.sort((a, b) => a.q - b.q);

  // Initialize DSU structures: parent array for union-find and size array for component sizes.
  const parent = new Array(total).fill(0).map((_, i) => i);
  const size = new Array(total).fill(1);
  // Activated indicates if a cell has been processed (i.e., its value is less than the current query threshold).
  const activated = new Array(total).fill(false);

  // DSU 'find' function with path compression.
  function find(x: number): number {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  // DSU 'union' function which merges two components.
  function union(x: number, y: number) {
    (x = find(x)), (y = find(y));
    if (x === y) return;
    // Union by size to maintain shallow trees.
    if (size[x] < size[y]) {
      parent[x] = y;
      size[y] += size[x];
    } else {
      parent[y] = x;
      size[x] += size[y];
    }
  }

  // Directions for traversing adjacent cells: down, up, right, left.
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  // Prepare the answer array with default zeroes.
  const ans = new Array(queries.length).fill(0);
  // Pointer to iterate through sorted cells.
  let cellPtr = 0;
  // Process each query in increasing order.
  for (const { q, idx } of qArr) {
    // Activate all cells whose value is strictly less than the current query threshold.
    while (cellPtr < cells.length && cells[cellPtr].val < q) {
      const { i, j } = cells[cellPtr];
      const id = i * n + j; // Map 2D cell coordinate to 1D id.
      activated[id] = true; // Mark cell as activated.
      // Check all 4 adjacent directions.
      for (const [di, dj] of dirs) {
        const ni = i + di,
          nj = j + dj;
        // Verify if neighbor is within grid boundaries.
        if (ni >= 0 && ni < m && nj >= 0 && nj < n) {
          const nid = ni * n + nj;
          // If the neighbor cell is activated, union the two cells.
          if (activated[nid]) {
            union(id, nid);
          }
        }
      }
      cellPtr++; // Move to the next cell.
    }
    const startId = 0; // The starting cell is always at position (0, 0), which corresponds to id 0.
    // If the starting cell is activated, record the size of its connected component.
    if (activated[startId]) {
      ans[idx] = size[find(startId)];
    } else {
      ans[idx] = 0;
    }
  }
  return ans;
}
