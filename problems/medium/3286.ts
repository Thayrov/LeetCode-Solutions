/*
3286. Find a Safe Walk Through a Grid

Hint
You are given an m x n binary matrix grid and an integer health.
You start on the upper-left corner (0, 0) and would like to get to the lower-right corner (m - 1, n - 1).
You can move up, down, left, or right from one cell to another adjacent cell as long as your health remains positive.
Cells (i, j) with grid[i][j] = 1 are considered unsafe and reduce your health by 1.
Return true if you can reach the final cell with a health value of 1 or more, and false otherwise.

Example 1:
Input: grid = [[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]], health = 1
Output: true
Explanation:
The final cell can be reached safely by walking along the gray cells below.

Example 2:
Input: grid = [[0,1,1,0,0,0],[1,0,1,0,0,0],[0,1,1,1,0,1],[0,0,1,0,1,0]], health = 3
Output: false
Explanation:
A minimum of 4 health points is needed to reach the final cell safely.

Example 3:
Input: grid = [[1,1,1],[1,0,1],[1,1,1]], health = 5
Output: true
Explanation:
The final cell can be reached safely by walking along the gray cells below.
Any path that does not go through the cell (1, 1) is unsafe since your health will drop to 0 when reaching the final cell.

Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 50
2 <= m * n
1 <= health <= m + n
grid[i][j] is either 0 or 1.

</> Typescript code:
*/

function findSafeWalk(grid: number[][], health: number): boolean {
  // Store row count.
  const m = grid.length;

  // Store column count.
  const n = grid[0].length;

  // Store total cells, used to encode each position as one integer.
  const total = m * n;

  // dist[id] stores the minimum unsafe-cell cost needed to reach cell id.
  const dist = new Int16Array(total);

  // Initialize every distance as unreachable.
  dist.fill(32767);

  // Allocate enough room for a manual deque used by 0-1 BFS.
  const deque = new Int32Array(total * 4);

  // Start deque pointers near the middle so push-front is safe.
  let left = total * 2;

  // Right pointer points after the last deque element.
  let right = left;

  // Starting on an unsafe cell also costs 1 health.
  dist[0] = grid[0][0];

  // Push the start cell into the deque.
  deque[right++] = 0;

  // Direction helper for up, right, down, left.
  const dirs = [-1, 0, 1, 0, -1];

  // Process cells while the deque is not empty.
  while (left < right) {
    // Pop the current cell from the front.
    const id = deque[left++];

    // Read the best known unsafe cost for this cell.
    const cost = dist[id];

    // A path is invalid once health would become 0 or less.
    if (cost >= health) continue;

    // Reaching the target with positive health is enough.
    if (id === total - 1) return true;

    // Decode the row from the cell id.
    const r = Math.floor(id / n);

    // Decode the column from the cell id.
    const c = id - r * n;

    // Try all four adjacent cells.
    for (let i = 0; i < 4; i++) {
      // Compute neighbor row.
      const nr = r + dirs[i];

      // Compute neighbor column.
      const nc = c + dirs[i + 1];

      // Skip out-of-bounds neighbors.
      if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;

      // Encode neighbor position as one integer.
      const next = nr * n + nc;

      // Add 1 only when the neighbor cell is unsafe.
      const nextCost = cost + grid[nr][nc];

      // Skip if this route is not better or already leaves no positive health.
      if (nextCost >= dist[next] || nextCost >= health) continue;

      // Save the improved minimum cost.
      dist[next] = nextCost;

      // Safe cells have edge cost 0, so process them first.
      if (grid[nr][nc] === 0) deque[--left] = next;
      // Unsafe cells have edge cost 1, so process them later.
      else deque[right++] = next;
    }
  }

  // No valid path reached the target.
  return false;
}
