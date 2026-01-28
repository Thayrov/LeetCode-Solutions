/*
3651. Minimum Cost Path with Teleportations

You are given a m x n 2D integer array grid and an integer k. You start at the top-left cell (0, 0) and your goal is to reach the bottom‐right cell (m - 1, n - 1).
There are two types of moves available:
Normal move: You can move right or down from your current cell (i, j), i.e. you can move to (i, j + 1) (right) or (i + 1, j) (down). The cost is the value of the destination cell.
Teleportation: You can teleport from any cell (i, j), to any cell (x, y) such that grid[x][y] <= grid[i][j]; the cost of this move is 0. You may teleport at most k times.
Return the minimum total cost to reach cell (m - 1, n - 1) from (0, 0).

Example 1:
Input: grid = [[1,3,3],[2,5,4],[4,3,5]], k = 2
Output: 7
Explanation:
Initially we are at (0, 0) and cost is 0.
Current Position	Move	New Position	Total Cost
(0, 0)	Move Down	(1, 0)	0 + 2 = 2
(1, 0)	Move Right	(1, 1)	2 + 5 = 7
(1, 1)	Teleport to (2, 2)	(2, 2)	7 + 0 = 7
The minimum cost to reach bottom-right cell is 7.

Example 2:
Input: grid = [[1,2],[2,3],[3,4]], k = 1
Output: 9
Explanation:
Initially we are at (0, 0) and cost is 0.
Current Position	Move	New Position	Total Cost
(0, 0)	Move Down	(1, 0)	0 + 2 = 2
(1, 0)	Move Right	(1, 1)	2 + 3 = 5
(1, 1)	Move Down	(2, 1)	5 + 4 = 9
The minimum cost to reach bottom-right cell is 9.

Constraints:
2 <= m, n <= 80
m == grid.length
n == grid[i].length
0 <= grid[i][j] <= 10^4
0 <= k <= 10

</> Typescript code:
*/

function minCost(grid: number[][], k: number): number {
  const m = grid.length;
  const n = grid[0].length;

  // ---------------------------------------------------------
  // 1. Data Preparation & Compression
  // ---------------------------------------------------------
  // Collect all values to identify unique teleport targets (Virtual Nodes).
  const vals = new Int32Array(m * n);
  let vIdx = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      vals[vIdx++] = grid[r][c];
    }
  }
  vals.sort();

  // Remove duplicates to get unique values sorted
  let distinctCount = 0;
  if (m * n > 0) {
    distinctCount = 1;
    for (let i = 1; i < m * n; i++) {
      if (vals[i] !== vals[i - 1]) {
        vals[distinctCount++] = vals[i];
      }
    }
  }
  const uniqueVals = vals.subarray(0, distinctCount);

  // Map grid value -> index in uniqueVals (0 to P-1)
  const valMap = new Map<number, number>();
  for (let i = 0; i < distinctCount; i++) {
    valMap.set(uniqueVals[i], i);
  }

  // ---------------------------------------------------------
  // 2. Adjacency List Optimization (Linked List Style)
  // ---------------------------------------------------------
  // Instead of array of arrays (slow GC), use parallel arrays to simulate
  // linked lists for looking up cells by their value index.
  const cellsByValHead = new Int32Array(distinctCount).fill(-1);
  const cellsByValNext = new Int32Array(m * n).fill(-1);
  const cellsByValCoord = new Int32Array(m * n);

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      const val = grid[r][c];
      const vIndex = valMap.get(val)!;
      const flatCoord = (r << 8) | c; // Encode (r, c)
      const nodeIdx = r * n + c;

      cellsByValCoord[nodeIdx] = flatCoord;
      cellsByValNext[nodeIdx] = cellsByValHead[vIndex];
      cellsByValHead[vIndex] = nodeIdx;
    }
  }

  // ---------------------------------------------------------
  // 3. Dijkstra Setup with Flat Priority Queue
  // ---------------------------------------------------------
  // Distance arrays flattened
  const distGrid = new Int32Array((k + 1) * m * n).fill(2e9);
  const distVirtual = new Int32Array((k + 1) * distinctCount).fill(2e9);

  // Custom Flat Binary Heap to avoid Object/Array creation overhead
  const heapCapacity = 500000; // Sufficient buffer for edges
  const heapCosts = new Float64Array(heapCapacity);
  const heapStates = new Int32Array(heapCapacity);
  let heapSize = 0;

  function push(cost: number, state: number) {
    if (heapSize >= heapCosts.length) return; // Should not happen with adequate capacity
    let idx = heapSize++;
    heapCosts[idx] = cost;
    heapStates[idx] = state;
    // Bubble Up
    while (idx > 0) {
      const p = (idx - 1) >>> 1;
      if (heapCosts[idx] < heapCosts[p]) {
        // Swap
        const tc = heapCosts[idx];
        heapCosts[idx] = heapCosts[p];
        heapCosts[p] = tc;
        const ts = heapStates[idx];
        heapStates[idx] = heapStates[p];
        heapStates[p] = ts;
        idx = p;
      } else break;
    }
  }

  function pop(): { cost: number; state: number } | null {
    if (heapSize === 0) return null;
    const retCost = heapCosts[0];
    const retState = heapStates[0];

    heapSize--;
    if (heapSize > 0) {
      const bottomCost = heapCosts[heapSize];
      const bottomState = heapStates[heapSize];
      heapCosts[0] = bottomCost;
      heapStates[0] = bottomState;

      // Bubble Down
      let idx = 0;
      const half = heapSize >>> 1;
      while (idx < half) {
        let left = (idx << 1) + 1;
        let right = left + 1;
        let best = left;

        if (right < heapSize && heapCosts[right] < heapCosts[left]) {
          best = right;
        }
        if (heapCosts[best] < bottomCost) {
          heapCosts[idx] = heapCosts[best];
          heapStates[idx] = heapStates[best];
          idx = best;
        } else break;
      }
      heapCosts[idx] = bottomCost;
      heapStates[idx] = bottomState;
    }
    return { cost: retCost, state: retState };
  }

  // Initial State: Grid (0,0) at k=0
  distGrid[0] = 0;
  push(0, 0);

  const VIRTUAL_FLAG = 1 << 30; // Bit flag to distinguish Virtual Nodes

  while (heapSize > 0) {
    const { cost: d, state } = pop()!;

    const isVirtual = (state & VIRTUAL_FLAG) !== 0;
    // Extract 'used' (k) from bits 16-19
    const used = (state >>> 16) & 0xf;

    if (!isVirtual) {
      // --- GRID NODE ---
      // State: 0 | k(4) | r(8) | c(8)
      const r = (state >>> 8) & 0xff;
      const c = state & 0xff;

      const flatIdx = used * m * n + r * n + c;
      if (d > distGrid[flatIdx]) continue;

      if (r === m - 1 && c === n - 1) return d;

      // Move: Down
      if (r + 1 < m) {
        const weight = grid[r + 1][c];
        const nd = d + weight;
        const targetState = (used << 16) | ((r + 1) << 8) | c;
        const tIdx = used * m * n + (r + 1) * n + c;
        if (nd < distGrid[tIdx]) {
          distGrid[tIdx] = nd;
          push(nd, targetState);
        }
      }
      // Move: Right
      if (c + 1 < n) {
        const weight = grid[r][c + 1];
        const nd = d + weight;
        const targetState = (used << 16) | (r << 8) | (c + 1);
        const tIdx = used * m * n + r * n + (c + 1);
        if (nd < distGrid[tIdx]) {
          distGrid[tIdx] = nd;
          push(nd, targetState);
        }
      }

      // Move: Teleport Entry (Grid -> Virtual)
      if (used < k) {
        const vIndex = valMap.get(grid[r][c])!;
        const vFlatIdx = used * distinctCount + vIndex;
        if (d < distVirtual[vFlatIdx]) {
          distVirtual[vFlatIdx] = d;
          // Virtual State: 1 | k(4) | vIndex(16)
          const vState = VIRTUAL_FLAG | (used << 16) | vIndex;
          push(d, vState);
        }
      }
    } else {
      // --- VIRTUAL NODE ---
      // State: 1 | k(4) | vIndex(16)
      const vIndex = state & 0xffff;
      const vFlatIdx = used * distinctCount + vIndex;

      if (d > distVirtual[vFlatIdx]) continue;

      // Flow Down: Virtual(v) -> Virtual(v-1)
      // Allows teleporting to cells with strictly smaller values
      if (vIndex > 0) {
        const downIdx = used * distinctCount + (vIndex - 1);
        if (d < distVirtual[downIdx]) {
          distVirtual[downIdx] = d;
          push(d, VIRTUAL_FLAG | (used << 16) | (vIndex - 1));
        }
      }

      // Exit Teleport: Virtual(v) -> Grid(targets with value v) at k+1
      // Traverse the linked list of cells for this value index
      const nextK = used + 1;
      let currNode = cellsByValHead[vIndex];
      while (currNode !== -1) {
        const coord = cellsByValCoord[currNode];
        const nr = coord >>> 8;
        const nc = coord & 0xff;

        const gIdx = nextK * m * n + nr * n + nc;
        if (d < distGrid[gIdx]) {
          distGrid[gIdx] = d;
          push(d, (nextK << 16) | (nr << 8) | nc);
        }
        currNode = cellsByValNext[currNode];
      }
    }
  }
  return -1;
}
