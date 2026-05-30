/*
3161. Block Placement Queries

Hint
There exists an infinite number line, with its origin at 0 and extending towards the positive x-axis.
You are given a 2D array queries, which contains two types of queries:
For a query of type 1, queries[i] = [1, x]. Build an obstacle at distance x from the origin. It is guaranteed that there is no obstacle at distance x when the query is asked.
For a query of type 2, queries[i] = [2, x, sz]. Check if it is possible to place a block of size sz anywhere in the range [0, x] on the line, such that the block entirely lies in the range [0, x]. A block cannot be placed if it intersects with any obstacle, but it may touch it. Note that you do not actually place the block. Queries are separate.
Return a boolean array results, where results[i] is true if you can place the block specified in the ith query of type 2, and false otherwise.

Example 1:
Input: queries = [[1,2],[2,3,3],[2,3,1],[2,2,2]]
Output: [false,true,true]
Explanation:
For query 0, place an obstacle at x = 2. A block of size at most 2 can be placed before x = 3.

Example 2:
Input: queries = [[1,7],[2,7,6],[1,2],[2,7,5],[2,7,6]]
Output: [true,true,false]
Explanation:
Place an obstacle at x = 7 for query 0. A block of size at most 7 can be placed before x = 7.
Place an obstacle at x = 2 for query 2. Now, a block of size at most 5 can be placed before x = 7, and a block of size at most 2 before x = 2.

Constraints:
1 <= queries.length <= 15 * 10^4
2 <= queries[i].length <= 3
1 <= queries[i][0] <= 2
1 <= x, sz <= min(5 * 10^4, 3 * queries.length)
The input is generated such that for queries of type 1, no obstacle exists at distance x when the query is asked.
The input is generated such that there is at least one query of type 2.

</> Typescript code:
*/

function getResults(queries: number[][]): boolean[] {
  const n = 50005,
    bit = new Int32Array(n + 2),
    seg = new Int32Array((n + 2) << 1),
    ans: boolean[] = []; // Fixed max coordinate, Fenwick tree, max segment tree, and output.

  const add = (i: number, v: number): void => {
    // Adds v to obstacle frequency at coordinate i.
    for (; i <= n; i += i & -i) bit[i] += v; // Updates all Fenwick ancestors.
  };

  const sum = (i: number): number => {
    // Counts obstacles with coordinate <= i.
    let s = 0; // Running prefix sum.
    for (; i > 0; i -= i & -i) s += bit[i]; // Accumulates Fenwick prefix nodes.
    return s; // Returns prefix obstacle count.
  };

  const kth = (k: number): number => {
    // Finds coordinate of the kth existing obstacle.
    let i = 0; // Current Fenwick search index.
    for (
      let b = 1 << 16;
      b;
      b >>= 1 // Tries powers of two, enough for n <= 50005.
    )
      if (i + b <= n && bit[i + b] < k)
        // Checks whether kth obstacle is after this Fenwick block.
        k -= bit[(i += b)]; // Skips this block and decreases remaining rank.
    return i + 1; // Next index is the kth obstacle coordinate.
  };

  const setSeg = (i: number, v: number): void => {
    // Sets gap value ending at obstacle coordinate i.
    for (
      seg[(i += n)] = v, i >>= 1;
      i;
      i >>= 1 // Writes leaf, then climbs to root.
    )
      seg[i] = Math.max(seg[i << 1], seg[(i << 1) | 1]); // Recomputes max from children.
  };

  const maxSeg = (l: number, r: number): number => {
    // Returns maximum stored obstacle-ending gap in [l, r].
    let m = 0; // Current maximum gap.
    for (l += n, r += n; l <= r; l >>= 1, r >>= 1) {
      // Iterative segment tree range query.
      if (l & 1) m = Math.max(m, seg[l++]); // Uses right child when l is a right boundary.
      if (!(r & 1)) m = Math.max(m, seg[r--]); // Uses left child when r is a left boundary.
    }
    return m; // Returns best complete gap ending at an obstacle.
  };

  for (const q of queries) {
    // Processes queries online.
    if (q[0] === 1) {
      // Obstacle insertion query.
      const x = q[1],
        c = sum(x),
        prev = c ? kth(c) : 0,
        total = sum(n),
        next = c < total ? kth(c + 1) : 0; // Finds previous and next obstacles around x.
      add(x, 1); // Marks x as an obstacle.
      setSeg(x, x - prev); // Stores new gap from previous obstacle or 0 to x.
      if (next) setSeg(next, next - x); // Shrinks next obstacle's previous gap if next exists.
    } else {
      // Block placement query.
      const x = q[1],
        sz = q[2],
        c = sum(x),
        prev = c ? kth(c) : 0; // Finds last obstacle not greater than x.
      ans.push(Math.max(maxSeg(1, x), x - prev) >= sz); // Checks max completed gap or tail gap to x.
    }
  }

  return ans; // Returns answers for type 2 queries.
}
