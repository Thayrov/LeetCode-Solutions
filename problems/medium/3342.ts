/* 
3342. Find Minimum Time to Reach Last Room II

There is a dungeon with n x m rooms arranged as a grid.

You are given a 2D array moveTime of size n x m, where moveTime[i][j] represents the minimum time in seconds when you can start moving to that room. You start from the room (0, 0) at time t = 0 and can move to an adjacent room. Moving between adjacent rooms takes one second for one move and two seconds for the next, alternating between the two.

Return the minimum time to reach the room (n - 1, m - 1).

Two rooms are adjacent if they share a common wall, either horizontally or vertically.

Example 1:
Input: moveTime = [[0,4],[4,4]]
Output: 7
Explanation:
The minimum time required is 7 seconds.
At time t == 4, move from room (0, 0) to room (1, 0) in one second.
At time t == 5, move from room (1, 0) to room (1, 1) in two seconds.

Example 2:
Input: moveTime = [[0,0,0,0],[0,0,0,0]]
Output: 6
Explanation:
The minimum time required is 6 seconds.
At time t == 0, move from room (0, 0) to room (1, 0) in one second.
At time t == 1, move from room (1, 0) to room (1, 1) in two seconds.
At time t == 3, move from room (1, 1) to room (1, 2) in one second.
At time t == 4, move from room (1, 2) to room (1, 3) in two seconds.

Example 3:
Input: moveTime = [[0,1],[1,2]]
Output: 4

Constraints:
2 <= n == moveTime.length <= 750
2 <= m == moveTime[i].length <= 750
0 <= moveTime[i][j] <= 10^9

</> Typescript code:
*/

function minTimeToReach(moveTime: number[][]): number {
  // number of rows
  const n = moveTime.length;
  // number of columns
  const m = moveTime[0].length;
  // total number of rooms
  const N = n * m;
  // target room index when flattened
  const target = N - 1;
  // a large constant for initialization
  const INF = 0x7fffffff;
  // best times to reach each room when next move cost is 1 second
  const dist0 = new Int32Array(N).fill(INF);
  // best times to reach each room when next move cost is 2 seconds
  const dist1 = new Int32Array(N).fill(INF);
  // start at (0,0) with parity 0 (cost=1 for first move)
  dist0[0] = 0;
  // size for heap arrays
  const size = 2 * N + 5;
  // parallel arrays for heap keys (times) and values (encoded state)
  const heapDist = new Int32Array(size);
  const heapState = new Int32Array(size);
  // current heap size
  let hsz = 0;
  // push a new element into the min-heap
  const push = (d: number, s: number) => {
    let i = ++hsz;
    heapDist[i] = d;
    heapState[i] = s;
    // bubble up until heap property is restored
    while (i > 1) {
      const p = i >> 1;
      if (heapDist[p] <= heapDist[i]) break;
      const td = heapDist[p],
        ts = heapState[p];
      heapDist[p] = heapDist[i];
      heapState[p] = heapState[i];
      heapDist[i] = td;
      heapState[i] = ts;
      i = p;
    }
  };
  // pop the smallest element from the heap
  const pop = (): [number, number] => {
    const d = heapDist[1],
      s = heapState[1];
    const ld = heapDist[hsz],
      ls = heapState[hsz--];
    let i = 1;
    heapDist[1] = ld;
    heapState[1] = ls;
    // heapify down until heap property is restored
    while (true) {
      const l = i << 1,
        r = l | 1;
      let smallest = i;
      if (l <= hsz && heapDist[l] < heapDist[smallest]) smallest = l;
      if (r <= hsz && heapDist[r] < heapDist[smallest]) smallest = r;
      if (smallest === i) break;
      const td = heapDist[smallest],
        ts = heapState[smallest];
      heapDist[smallest] = heapDist[i];
      heapState[smallest] = heapState[i];
      heapDist[i] = td;
      heapState[i] = ts;
      i = smallest;
    }
    return [d, s];
  };
  // initialize heap with start state (time=0, state=0)
  push(0, 0);
  // offsets for neighbors in the flattened array: right, left, down, up
  const dirs = [1, -1, m, -m];
  // main loop: process states in increasing time order
  while (hsz) {
    const [t, us] = pop();
    // decode room index and parity from state
    const idx = us >> 1,
      p = us & 1;
    // skip if this entry is outdated
    if ((p === 0 ? dist0[idx] : dist1[idx]) !== t) continue;
    // if we've reached the target, return the time
    if (idx === target) return t;
    // compute 2D coordinates for bounds checks
    const y = (idx / m) | 0,
      x = idx - y * m;
    // explore all four neighboring rooms
    for (let di = 0; di < 4; ++di) {
      const off = dirs[di],
        ni = idx + off;
      // new x,y after move
      const nx = x + (di === 0 ? 1 : di === 1 ? -1 : 0);
      const ny = y + (di === 2 ? 1 : di === 3 ? -1 : 0);
      // skip if out of bounds
      if (nx < 0 || nx >= m || ny < 0 || ny >= n) continue;
      // determine move cost based on parity
      const cost = p === 0 ? 1 : 2;
      // earliest allowed enter time for the neighbor
      const mt = moveTime[ny][nx];
      // wait if we arrive too early
      const start = t < mt ? mt : t;
      // total time to reach neighbor
      const nt = start + cost;
      // encode new state with toggled parity
      const ns = (ni << 1) | (p ^ 1);
      // relax the edge into the appropriate dist array
      if (p === 0) {
        if (nt < dist1[ni]) {
          dist1[ni] = nt;
          push(nt, ns);
        }
      } else {
        if (nt < dist0[ni]) {
          dist0[ni] = nt;
          push(nt, ns);
        }
      }
    }
  }
  // if target unreachable (shouldn't happen under constraints)
  return -1;
}
