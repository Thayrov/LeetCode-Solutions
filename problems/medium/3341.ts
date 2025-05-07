/* 
3341. Find Minimum Time to Reach Last Room I

There is a dungeon with n x m rooms arranged as a grid.

You are given a 2D array moveTime of size n x m, where moveTime[i][j] represents the minimum time in seconds when you can start moving to that room. You start from the room (0, 0) at time t = 0 and can move to an adjacent room. Moving between adjacent rooms takes exactly one second.

Return the minimum time to reach the room (n - 1, m - 1).

Two rooms are adjacent if they share a common wall, either horizontally or vertically.

Example 1:
Input: moveTime = [[0,4],[4,4]]
Output: 6
Explanation:
The minimum time required is 6 seconds.
At time t == 4, move from room (0, 0) to room (1, 0) in one second.
At time t == 5, move from room (1, 0) to room (1, 1) in one second.

Example 2:
Input: moveTime = [[0,0,0],[0,0,0]]
Output: 3
Explanation:
The minimum time required is 3 seconds.
At time t == 0, move from room (0, 0) to room (1, 0) in one second.
At time t == 1, move from room (1, 0) to room (1, 1) in one second.
At time t == 2, move from room (1, 1) to room (1, 2) in one second.

Example 3:
Input: moveTime = [[0,1],[1,2]]
Output: 3

Constraints:
2 <= n == moveTime.length <= 50
2 <= m == moveTime[i].length <= 50
0 <= moveTime[i][j] <= 10^9

</> Typescript code:
*/

function minTimeToReach(moveTime: number[][]): number {
  // Main function: compute min time.
  const n = moveTime.length,
    m = moveTime[0].length; // Grid dimensions.
  const dist: number[][] = Array.from(
    // Distance matrix.
    { length: n }, // n rows.
    () => Array(m).fill(Infinity) // m cols, init to Infinity.
  );
  const heap: [number, number, number][] = []; // Min-heap: [time, row, col].

  function push(time: number, r: number, c: number) {
    // Insert a state.
    heap.push([time, r, c]); // Add to end.
    let i = heap.length - 1; // Bubble-up index.
    while (i > 0) {
      const p = (i - 1) >> 1; // Parent index.
      if (heap[p][0] <= heap[i][0]) break; // Stop if heap property holds.
      [heap[p], heap[i]] = [heap[i], heap[p]]; // Swap with parent.
      i = p; // Move up.
    }
  }

  function pop(): [number, number, number] | undefined {
    // Remove min.
    const size = heap.length;
    if (size === 0) return undefined; // Empty check.
    const top = heap[0]; // Smallest element.
    if (size === 1) {
      // Single element case.
      heap.pop(); // Remove it.
      return top; // Return.
    }
    const last = heap.pop()!; // Take last.
    heap[0] = last; // Move to root.
    let i = 0; // Sift-down index.
    const len = heap.length;
    while (true) {
      const l = (i << 1) + 1,
        r = l + 1; // Children indices.
      let smallest = i; // Assume current is smallest.
      if (l < len && heap[l][0] < heap[smallest][0]) smallest = l; // Left child.
      if (r < len && heap[r][0] < heap[smallest][0]) smallest = r; // Right child.
      if (smallest === i) break; // Heap property ok.
      [heap[i], heap[smallest]] = [heap[smallest], heap[i]]; // Swap down.
      i = smallest; // Move down.
    }
    return top; // Return original root.
  }

  dist[0][0] = 0; // Start at (0,0).
  push(0, 0, 0); // Push initial state.
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]; // 4 direction vectors.

  while (heap.length) {
    // While heap not empty.
    const [time, r, c] = pop()!; // Extract min state.
    if (time > dist[r][c]) continue; // Skip stale.
    if (r === n - 1 && c === m - 1) return time; // Early exit on target.
    for (const [dr, dc] of dirs) {
      // Explore neighbors.
      const nr = r + dr,
        nc = c + dc;
      if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue; // Bounds check.
      const nt = Math.max(time, moveTime[nr][nc]) + 1; // Wait & move.
      if (nt < dist[nr][nc]) {
        // If better path found.
        dist[nr][nc] = nt; // Update dist.
        push(nt, nr, nc); // Push new state.
      }
    }
  }

  return dist[n - 1][m - 1]; // Return result.
}
