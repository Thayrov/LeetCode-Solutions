/*
3362. Zero Array Transformation III

You are given an integer array nums of length n and a 2D array queries where queries[i] = [li, ri].

Each queries[i] represents the following action on nums:

Decrement the value at each index in the range [li, ri] in nums by at most 1.
The amount by which the value is decremented can be chosen independently for each index.
A Zero Array is an array with all its elements equal to 0.

Return the maximum number of elements that can be removed from queries, such that nums can still be converted to a zero array using the remaining queries. If it is not possible to convert nums to a zero array, return -1.

Example 1:
Input: nums = [2,0,2], queries = [[0,2],[0,2],[1,1]]
Output: 1
Explanation:
After removing queries[2], nums can still be converted to a zero array.
Using queries[0], decrement nums[0] and nums[2] by 1 and nums[1] by 0.
Using queries[1], decrement nums[0] and nums[2] by 1 and nums[1] by 0.

Example 2:
Input: nums = [1,1,1,1], queries = [[1,3],[0,2],[1,3],[1,2]]
Output: 2
Explanation:
We can remove queries[2] and queries[3].

Example 3:
Input: nums = [1,2,3,4], queries = [[0,3]]
Output: -1
Explanation:
nums cannot be converted to a zero array even after using all the queries.
 
Constraints:
1 <= nums.length <= 10^5
0 <= nums[i] <= 10^5
1 <= queries.length <= 10^5
queries[i].length == 2
0 <= li <= ri < nums.length

</> Typescript code:
*/

function maxRemoval(nums: number[], queries: number[][]): number {
  const n = nums.length,
    m = queries.length; // n = array length, m = number of intervals (queries)

  /* ----- 1 · Sort queries by left endpoint so we can sweep left→right ------- */
  queries.sort((a, b) => a[0] - b[0]); // guarantees all intervals starting at i are contiguous

  /* ----- 2 · Auxiliary structures ------------------------------------------ */
  const decEnd = new Int32Array(n + 2); // decEnd[x] stores how many chosen intervals expire at x (i.e. r+1)
  const heap: number[] = []; // max-heap on right endpoints of *available* intervals

  /* Heap helper: push — sift-up new value so heap[0] is largest r */
  const push = (v: number) => {
    let i = heap.push(v) - 1; // insert at bottom, remember index
    while (i) {
      // sift-up while parent smaller
      const p = (i - 1) >> 1; // parent index
      if (heap[p] >= heap[i]) break; // heap property satisfied
      [heap[p], heap[i]] = [heap[i], heap[p]]; // swap with parent
      i = p; // continue from parent
    }
  };

  /* Heap helper: pop — remove & return max element (largest r) */
  const pop = (): number | undefined => {
    if (!heap.length) return undefined; // empty heap guard
    const top = heap[0],
      last = heap.pop()!; // top is result, last is element to reposition
    if (heap.length) {
      // if any elements remain
      heap[0] = last; // move last to root
      let i = 0;
      for (;;) {
        // sift-down
        let l = (i << 1) + 1, // left child
          r = l + 1, // right child
          largest = i; // assume current node is largest
        if (l < heap.length && heap[l] > heap[largest]) largest = l;
        if (r < heap.length && heap[r] > heap[largest]) largest = r;
        if (largest === i) break; // heap restored
        [heap[i], heap[largest]] = [heap[largest], heap[i]];
        i = largest; // continue from swapped child
      }
    }
    return top; // return original max
  };

  /* ----- 3 · Sweep through array indices, greedily choosing minimal set ---- */
  let ptr = 0, // pointer into sorted queries
    kept = 0, // number of queries we *keep*
    cov = 0; // current coverage (active chosen intervals) at index i

  for (let i = 0; i < n; ++i) {
    // iterate each element in nums
    cov -= decEnd[i]; // drop intervals whose right end was i-1 (they expire now)

    /* add all intervals that start at or before i (queries[ptr][0] ≤ i) */
    while (ptr < m && queries[ptr][0] <= i) {
      push(queries[ptr][1]); // push its right endpoint into heap
      ++ptr; // advance pointer
    }

    /* ensure we have at least nums[i] active intervals to decrement this element */
    while (cov < nums[i]) {
      let r: number | undefined;
      do {
        r = pop(); // take the furthest-reaching available interval
      } while (r !== undefined && r < i); // discard any that already expired

      if (r === undefined) return -1; // deficit cannot be satisfied → impossible

      ++kept;
      ++cov; // we keep this interval; increases active coverage
      ++decEnd[r + 1]; // schedule expiry of this interval at position r+1
    }
  }

  return m - kept; // maximum removable = total − kept
}
