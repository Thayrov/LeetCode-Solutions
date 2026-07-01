/*
2812. Find the Safest Path in a Grid

Hint
You are given a 0-indexed 2D matrix grid of size n x n, where (r, c) represents:
A cell containing a thief if grid[r][c] = 1
An empty cell if grid[r][c] = 0
You are initially positioned at cell (0, 0). In one move, you can move to any adjacent cell in the grid, including cells containing thieves.
The safeness factor of a path on the grid is defined as the minimum manhattan distance from any cell in the path to any thief in the grid.
Return the maximum safeness factor of all paths leading to cell (n - 1, n - 1).
An adjacent cell of cell (r, c), is one of the cells (r, c + 1), (r, c - 1), (r + 1, c) and (r - 1, c) if it exists.
The Manhattan distance between two cells (a, b) and (x, y) is equal to |a - x| + |b - y|, where |val| denotes the absolute value of val.

Example 1:
Input: grid = [[1,0,0],[0,0,0],[0,0,1]]
Output: 0
Explanation: All paths from (0, 0) to (n - 1, n - 1) go through the thieves in cells (0, 0) and (n - 1, n - 1).

Example 2:
Input: grid = [[0,0,1],[0,0,0],[0,0,0]]
Output: 2
Explanation: The path depicted in the picture above has a safeness factor of 2 since:
- The closest cell of the path to the thief at cell (0, 2) is cell (0, 0). The distance between them is | 0 - 0 | + | 0 - 2 | = 2.
It can be shown that there are no other paths with a higher safeness factor.

Example 3:
Input: grid = [[0,0,0,1],[0,0,0,0],[0,0,0,0],[1,0,0,0]]
Output: 2
Explanation: The path depicted in the picture above has a safeness factor of 2 since:
- The closest cell of the path to the thief at cell (0, 3) is cell (1, 2). The distance between them is | 0 - 1 | + | 3 - 2 | = 2.
- The closest cell of the path to the thief at cell (3, 0) is cell (3, 2). The distance between them is | 3 - 3 | + | 0 - 2 | = 2.
It can be shown that there are no other paths with a higher safeness factor.
 
Constraints:
1 <= grid.length == n <= 400
grid[i].length == n
grid[i][j] is either 0 or 1.
There is at least one thief in the grid.

</> Typescript code:
*/

function maximumSafenessFactor(grid: number[][]): number {
  // Store the grid side length.
  const n = grid.length;

  // Store total amount of cells in the n x n grid.
  const total = n * n;

  // Store each cell's Manhattan distance to the closest thief.
  const dist = new Int32Array(total);

  // Mark every cell as unvisited before BFS.
  dist.fill(-1);

  // Preallocate BFS queue with enough space for every cell.
  const queue = new Int32Array(total);

  // Store the next queue index to read.
  let head = 0;

  // Store the next queue index to write.
  let tail = 0;

  // Iterate every row to seed all thief cells into BFS.
  for (let r = 0; r < n; r++) {
    // Iterate every column in the current row.
    for (let c = 0; c < n; c++) {
      // Check whether the current cell contains a thief.
      if (grid[r][c] === 1) {
        // Convert 2D coordinates into a compact 1D cell id.
        const id = r * n + c;

        // A thief cell has distance zero from a thief.
        dist[id] = 0;

        // Add the thief cell as a BFS source.
        queue[tail++] = id;
      }
    }
  }

  // Direction encoding for up, right, down, left.
  const dirs = [-1, 0, 1, 0, -1];

  // Run multi-source BFS until all reachable cells are assigned closest-thief distance.
  while (head < tail) {
    // Pop the next cell id from the queue.
    const id = queue[head++];

    // Recover the row from the 1D id.
    const r = Math.floor(id / n);

    // Recover the column from the 1D id.
    const c = id % n;

    // Neighbor distance is current distance plus one step.
    const nextDist = dist[id] + 1;

    // Visit all four adjacent cells.
    for (let k = 0; k < 4; k++) {
      // Compute neighbor row.
      const nr = r + dirs[k];

      // Compute neighbor column.
      const nc = c + dirs[k + 1];

      // Skip coordinates outside the grid.
      if (nr < 0 || nr >= n || nc < 0 || nc >= n) continue;

      // Convert neighbor coordinates into a 1D id.
      const nextId = nr * n + nc;

      // Skip already visited cells.
      if (dist[nextId] !== -1) continue;

      // Assign closest-thief distance to this neighbor.
      dist[nextId] = nextDist;

      // Push neighbor into BFS queue.
      queue[tail++] = nextId;
    }
  }

  // Create a list of all cell ids.
  const cells = Array.from({ length: total }, (_, i) => i);

  // Process safer cells first, from highest distance to lowest distance.
  cells.sort((a, b) => dist[b] - dist[a]);

  // Store DSU parent for each cell.
  const parent = new Int32Array(total);

  // Store small DSU rank values for balanced unions.
  const rank = new Int8Array(total);

  // Mark whether a cell has been activated at the current safeness threshold.
  const active = new Uint8Array(total);

  // Initialize every cell as its own DSU component.
  for (let i = 0; i < total; i++) parent[i] = i;

  // Find the representative of a DSU component with path compression.
  const find = (x: number): number => {
    // Climb until reaching the root.
    while (parent[x] !== x) {
      // Compress the path by pointing x to its grandparent.
      parent[x] = parent[parent[x]];

      // Move x upward.
      x = parent[x];
    }

    // Return the component representative.
    return x;
  };

  // Merge two DSU components.
  const union = (a: number, b: number): void => {
    // Find component representative for a.
    let pa = find(a);

    // Find component representative for b.
    let pb = find(b);

    // Stop if both cells are already connected.
    if (pa === pb) return;

    // Attach lower-rank tree under higher-rank tree.
    if (rank[pa] < rank[pb]) {
      // Make pb the parent of pa.
      parent[pa] = pb;
    } else if (rank[pa] > rank[pb]) {
      // Make pa the parent of pb.
      parent[pb] = pa;
    } else {
      // Tie-break by making pa the parent of pb.
      parent[pb] = pa;

      // Increase pa rank after merging equal-rank trees.
      rank[pa]++;
    }
  };

  // Activate cells from safest to least safe.
  for (const id of cells) {
    // Mark this cell as available.
    active[id] = 1;

    // Recover this cell's row.
    const r = Math.floor(id / n);

    // Recover this cell's column.
    const c = id % n;

    // Check all four adjacent cells.
    for (let k = 0; k < 4; k++) {
      // Compute adjacent row.
      const nr = r + dirs[k];

      // Compute adjacent column.
      const nc = c + dirs[k + 1];

      // Skip coordinates outside the grid.
      if (nr < 0 || nr >= n || nc < 0 || nc >= n) continue;

      // Convert adjacent coordinates into a 1D id.
      const nextId = nr * n + nc;

      // Merge only with neighbors already active at this or a higher safeness.
      if (active[nextId]) union(id, nextId);
    }

    // Once start and end connect, current distance is the maximum possible bottleneck.
    if (active[0] && active[total - 1] && find(0) === find(total - 1)) {
      // Return the best achievable safeness factor.
      return dist[id];
    }
  }

  // Fallback for completeness; valid inputs always return inside the loop.
  return 0;
}
