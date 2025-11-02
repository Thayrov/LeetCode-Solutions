/*
2257. Count Unguarded Cells in the Grid

You are given two integers m and n representing a 0-indexed m x n grid. You are also given two 2D integer arrays guards and walls where guards[i] = [rowi, coli] and walls[j] = [rowj, colj] represent the positions of the ith guard and jth wall respectively.

A guard can see every cell in the four cardinal directions (north, east, south, or west) starting from their position unless obstructed by a wall or another guard. A cell is guarded if there is at least one guard that can see it.

Return the number of unoccupied cells that are not guarded.

Example 1:
Input: m = 4, n = 6, guards = [[0,0],[1,1],[2,3]], walls = [[0,1],[2,2],[1,4]]
Output: 7
Explanation: The guarded and unguarded cells are shown in red and green respectively in the above diagram.
There are a total of 7 unguarded cells, so we return 7.

Example 2:
Input: m = 3, n = 3, guards = [[1,1]], walls = [[0,1],[1,0],[2,1],[1,2]]
Output: 4
Explanation: The unguarded cells are shown in green in the above diagram.
There are a total of 4 unguarded cells, so we return 4.

Constraints:
1 <= m, n <= 10^5
2 <= m * n <= 10^5
1 <= guards.length, walls.length <= 5 * 10^4
2 <= guards.length + walls.length <= m * n
guards[i].length == walls[j].length == 2
0 <= rowi, rowj < m
0 <= coli, colj < n
All the positions in guards and walls are unique.

</> Typescript code:
*/

function countUnguarded(
  m: number,
  n: number,
  guards: number[][],
  walls: number[][]
): number {
  // Create a set to store positions of walls and guards
  const blocked = new Set<string>();
  // Add all guards and walls to the blocked set
  for (const [r, c] of [...guards, ...walls]) {
    blocked.add(`${r},${c}`);
  }

  // Set to store positions of guarded cells
  const guarded = new Set<string>();
  // Define directions: up, down, left, right
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  // For each guard, simulate its line of sight
  for (const [r, c] of guards) {
    // For each direction
    for (const [dr, dc] of directions) {
      let nr = r + dr;
      let nc = c + dc;
      // Move in the direction until hitting a wall, guard, or boundary
      while (
        nr >= 0 &&
        nr < m &&
        nc >= 0 &&
        nc < n &&
        !blocked.has(`${nr},${nc}`)
      ) {
        const key = `${nr},${nc}`;
        // Mark the cell as guarded
        if (!guarded.has(key)) {
          guarded.add(key);
        }
        nr += dr;
        nc += dc;
      }
    }
  }

  // Return the number of unguarded and unoccupied cells
  return m * n - blocked.size - guarded.size;
}
