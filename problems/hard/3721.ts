/*
3721. Longest Balanced Subarray II

You are given an integer array nums.
A subarray is called balanced if the number of distinct even numbers in the subarray is equal to the number of distinct odd numbers.
Return the length of the longest balanced subarray.

Example 1:
Input: nums = [2,5,4,3]
Output: 4
Explanation:
The longest balanced subarray is [2, 5, 4, 3].
It has 2 distinct even numbers [2, 4] and 2 distinct odd numbers [5, 3]. Thus, the answer is 4.

Example 2:
Input: nums = [3,2,2,5,4]
Output: 5
Explanation:
The longest balanced subarray is [3, 2, 2, 5, 4].
It has 2 distinct even numbers [2, 4] and 2 distinct odd numbers [3, 5]. Thus, the answer is 5.

Example 3:
Input: nums = [1,2,3,2]
Output: 3
Explanation:
The longest balanced subarray is [2, 3, 2].
It has 1 distinct even number [2] and 1 distinct odd number [3]. Thus, the answer is 3.

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^5

</> Typescript code:
*/

function longestBalanced(nums: number[]): number {
  const n = nums.length;
  // Calculate the smallest power of 2 greater than or equal to n for the segment tree size
  let SZ = 1;
  while (SZ < n) SZ <<= 1;

  // Use Int32Arrays for high performance and low memory overhead
  // tMin/tMax store the range min/max values for finding zeroes efficiently
  const tMin = new Int32Array(2 * SZ).fill(1000000);
  const tMax = new Int32Array(2 * SZ).fill(-1000000);
  const tLazy = new Int32Array(2 * SZ);

  // Range update function for the segment tree with lazy propagation
  const update = (v: number, tl: number, tr: number, l: number, r: number, add: number) => {
    if (l > r) return;
    if (l === tl && r === tr) {
      tMin[v] += add;
      tMax[v] += add;
      tLazy[v] += add;
    } else {
      // Push lazy tags to children
      if (tLazy[v] !== 0) {
        const lz = tLazy[v],
          lc = v << 1,
          rc = lc + 1;
        tMin[lc] += lz;
        tMax[lc] += lz;
        tLazy[lc] += lz;
        tMin[rc] += lz;
        tMax[rc] += lz;
        tLazy[rc] += lz;
        tLazy[v] = 0;
      }
      const tm = (tl + tr) >> 1;
      update(v << 1, tl, tm, l, Math.min(r, tm), add);
      update((v << 1) + 1, tm + 1, tr, Math.max(l, tm + 1), r, add);
      // Pull results back up
      tMin[v] = Math.min(tMin[v << 1], tMin[(v << 1) + 1]);
      tMax[v] = Math.max(tMax[v << 1], tMax[(v << 1) + 1]);
    }
  };

  // Initialize an index j in the tree as we sweep through the array
  const setLeaf = (v: number, tl: number, tr: number, pos: number, val: number) => {
    if (tl === tr) {
      tMin[v] = val;
      tMax[v] = val;
      tLazy[v] = 0;
    } else {
      if (tLazy[v] !== 0) {
        const lz = tLazy[v],
          lc = v << 1,
          rc = lc + 1;
        tMin[lc] += lz;
        tMax[lc] += lz;
        tLazy[lc] += lz;
        tMin[rc] += lz;
        tMax[rc] += lz;
        tLazy[rc] += lz;
        tLazy[v] = 0;
      }
      const tm = (tl + tr) >> 1;
      if (pos <= tm) setLeaf(v << 1, tl, tm, pos, val);
      else setLeaf((v << 1) + 1, tm + 1, tr, pos, val);
      tMin[v] = Math.min(tMin[v << 1], tMin[(v << 1) + 1]);
      tMax[v] = Math.max(tMax[v << 1], tMax[(v << 1) + 1]);
    }
  };

  // Find the leftmost index that currently has a value of 0
  const findFirstZero = (v: number, tl: number, tr: number, l: number, r: number): number => {
    // Optimization: If the target value 0 is not in [min, max], discard this subtree
    if (l > r || tMin[v] > 0 || tMax[v] < 0) return -1;
    if (tl === tr) return tl;
    if (tLazy[v] !== 0) {
      const lz = tLazy[v],
        lc = v << 1,
        rc = lc + 1;
      tMin[lc] += lz;
      tMax[lc] += lz;
      tLazy[lc] += lz;
      tMin[rc] += lz;
      tMax[rc] += lz;
      tLazy[rc] += lz;
      tLazy[v] = 0;
    }
    const tm = (tl + tr) >> 1;
    // Search left child first for "longest" subarray
    let res = findFirstZero(v << 1, tl, tm, l, Math.min(r, tm));
    if (res === -1) {
      res = findFirstZero((v << 1) + 1, tm + 1, tr, Math.max(l, tm + 1), r);
    }
    return res;
  };

  // Track the last occurrence of each number to identify when it's "distinct"
  const last = new Int32Array(100001).fill(-1);
  let best = 0;

  for (let j = 0; j < n; j++) {
    const x = nums[j];
    const prev = last[x];
    const d = (x & 1) === 0 ? 1 : -1; // +1 for even, -1 for odd

    // Prepare index j and update the difference across all valid subarrays ending at j
    setLeaf(1, 0, SZ - 1, j, 0);
    // Only update subarrays where this current x is the newest distinct element
    update(1, 0, SZ - 1, prev + 1, j, d);

    // Find the earliest starting point k that yields a 0 difference
    const first = findFirstZero(1, 0, SZ - 1, 0, j);
    if (first !== -1) {
      best = Math.max(best, j - first + 1);
    }
    last[x] = j;
  }
  return best;
}
