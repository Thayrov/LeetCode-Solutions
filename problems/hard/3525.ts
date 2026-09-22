/*
3525. Find X Value of Array II

You are given an array of positive integers nums and a positive integer k. You are also given a 2D array queries, where queries[i] = [indexi, valuei, starti, xi].
You are allowed to perform an operation once on nums, where you can remove any suffix from nums such that nums remains non-empty.
The x-value of nums for a given x is defined as the number of ways to perform this operation so that the product of the remaining elements leaves a remainder of x modulo k.
For each query in queries you need to determine the x-value of nums for xi after performing the following actions:
Update nums[indexi] to valuei. Only this step persists for the rest of the queries.
Remove the prefix nums[0..(starti - 1)] (where nums[0..(-1)] will be used to represent the empty prefix).
Return an array result of size queries.length where result[i] is the answer for the ith query.
A prefix of an array is a subarray that starts from the beginning of the array and extends to any point within it.
A suffix of an array is a subarray that starts at any point within the array and extends to the end of the array.
Note that the prefix and suffix to be chosen for the operation can be empty.
Note that x-value has a different definition in this version.

Example 1:
Input: nums = [1,2,3,4,5], k = 3, queries = [[2,2,0,2],[3,3,3,0],[0,1,0,1]]
Output: [2,2,2]
Explanation:
For query 0, nums becomes [1, 2, 2, 4, 5], and the empty prefix must be removed. The possible operations are:
Remove the suffix [2, 4, 5]. nums becomes [1, 2].
Remove the empty suffix. nums becomes [1, 2, 2, 4, 5] with a product 80, which gives remainder 2 when divided by 3.
For query 1, nums becomes [1, 2, 2, 3, 5], and the prefix [1, 2, 2] must be removed. The possible operations are:
Remove the empty suffix. nums becomes [3, 5].
Remove the suffix [5]. nums becomes [3].
For query 2, nums becomes [1, 2, 2, 3, 5], and the empty prefix must be removed. The possible operations are:
Remove the suffix [2, 2, 3, 5]. nums becomes [1].
Remove the suffix [3, 5]. nums becomes [1, 2, 2].

Example 2:
Input: nums = [1,2,4,8,16,32], k = 4, queries = [[0,2,0,2],[0,2,0,1]]
Output: [1,0]
Explanation:
For query 0, nums becomes [2, 2, 4, 8, 16, 32]. The only possible operation is:
Remove the suffix [2, 4, 8, 16, 32].
For query 1, nums becomes [2, 2, 4, 8, 16, 32]. There is no possible way to perform the operation.

Example 3:
Input: nums = [1,1,2,1,1], k = 2, queries = [[2,1,0,1]]
Output: [5]

Constraints:
1 <= nums[i] <= 10^9
1 <= nums.length <= 10^5
1 <= k <= 5
1 <= queries.length <= 2 * 10^4
queries[i] == [indexi, valuei, starti, xi]
0 <= indexi <= nums.length - 1
1 <= valuei <= 10^9
0 <= starti <= nums.length - 1
0 <= xi <= k - 1

</> Typescript code:
*/

function resultArray(nums: number[], k: number, queries: number[][]): number[] {
  // Cache length and round tree capacity up to a power of two.
  const n = nums.length;
  // Grow the leaf layer until it covers every element.
  let size = 1;
  // Double capacity while it is still smaller than the array.
  while (size < n) size <<= 1;
  // Alias modulus for tighter closure capture.
  const mod = k;
  // Identity product used for padding leaves and empty accumulators.
  const one = 1 % mod;
  // Precompute residue multiplication table to avoid per-step modulo ops.
  const mul: number[][] = new Array<number[]>(mod);
  // Build one transition row per possible left product.
  for (let a = 0; a < mod; a++) {
    // Allocate the row for left product a.
    const row: number[] = new Array<number>(mod);
    // Fill combined remainders for every right remainder.
    for (let r = 0; r < mod; r++) row[r] = (a * r) % mod;
    // Store the finished transition row.
    mul[a] = row;
  }
  // Flat segment products, one remainder per tree node.
  const prod = new Int32Array(size * 2);
  // Flat prefix-remainder histograms, mod counters per tree node.
  const freq = new Int32Array(size * 2 * mod);
  // Initialize leaves, padding unused slots with the identity segment.
  for (let i = 0; i < size; i++) {
    // Map slot i to its leaf node index.
    const node = size + i;
    // Real elements contribute their own remainder histogram.
    if (i < n) {
      // Reduce the value once since only its remainder matters.
      const rem = nums[i] % mod;
      // Store the leaf segment product.
      prod[node] = rem;
      // Count the single-element prefix ending at this leaf.
      freq[node * mod + rem] = 1;
    } else {
      // Padding leaves behave as empty segments.
      prod[node] = one;
    }
  }
  // Merge two child segments into their parent node.
  const pull = (i: number): void => {
    // Derive left and right child indices.
    const l = i << 1, r = l | 1;
    // Cache the left segment product for shifting.
    const lp = prod[l];
    // Parent product is the modular product of its children.
    prod[i] = (lp * prod[r]) % mod;
    // Precompute flat bases and the shift row for this merge.
    const ib = i * mod, lb = l * mod, rb = r * mod, row = mul[lp];
    // Inherit every left prefix remainder unchanged.
    for (let t = 0; t < mod; t++) freq[ib + t] = freq[lb + t];
    // Fold right prefixes in, shifted by the left product.
    for (let t = 0; t < mod; t++) {
      // Skip empty right remainder buckets.
      const c = freq[rb + t];
      // Add shifted right prefixes to their combined bucket.
      if (c) freq[ib + row[t]] += c;
    }
  };
  // Build internal nodes bottom-up from the leaves.
  for (let i = size - 1; i >= 1; i--) pull(i);
  // Reusable accumulator histogram for range queries.
  const acc: number[] = new Array<number>(mod).fill(0);
  // Reusable left-side covering nodes in query order.
  const leftNodes: number[] = [];
  // Reusable right-side covering nodes in reverse query order.
  const rightNodes: number[] = [];
  // Output array sized to the number of queries.
  const ans: number[] = new Array<number>(queries.length);
  // Process each query with a point update then a suffix count.
  for (let qi = 0; qi < queries.length; qi++) {
    // Unpack index, value, start, and target remainder.
    const q = queries[qi];
    // Bind the four query fields to locals.
    const idx = q[0], val = q[1], start = q[2], x = q[3];
    // Locate the leaf holding the updated position.
    let node = size + idx;
    // Flat base of that leaf histogram.
    const nb = node * mod;
    // Clear the stale leaf histogram.
    for (let t = 0; t < mod; t++) freq[nb + t] = 0;
    // Reduce the new value to its remainder.
    const rem = val % mod;
    // Store the refreshed leaf product.
    prod[node] = rem;
    // Count the refreshed single-element prefix.
    freq[nb + rem] = 1;
    // Climb toward the root refreshing ancestors.
    node >>= 1;
    // Re-merge every ancestor on the update path.
    while (node >= 1) {
      // Recompute this ancestor from its children.
      pull(node);
      // Move one level up.
      node >>= 1;
    }
    // Reset the accumulator histogram for this query.
    for (let t = 0; t < mod; t++) acc[t] = 0;
    // Reset the covering-node collectors.
    leftNodes.length = 0;
    // Clear the right-side collector as well.
    rightNodes.length = 0;
    // Set the half-open segment-tree window over [start, n).
    let l = size + start, rr = size + n;
    // Collect O(log n) covering nodes for the suffix range.
    while (l < rr) {
      // Take left-edge nodes in order.
      if (l & 1) leftNodes.push(l++);
      // Take right-edge nodes for later reversed replay.
      if (rr & 1) rightNodes.push(--rr);
      // Ascend both window borders.
      l >>= 1; rr >>= 1;
    }
    // Running product of the folded prefix so far.
    let ap = one;
    // Fold left covering nodes in order.
    for (let i = 0; i < leftNodes.length; i++) {
      // Bind node, histogram base, and shift row.
      const nd = leftNodes[i], base = nd * mod, row = mul[ap];
      // Fold this segment prefixes in, shifted by prior product.
      for (let t = 0; t < mod; t++) {
        // Skip empty remainder buckets.
        const c = freq[base + t];
        // Add shifted prefixes to the accumulator.
        if (c) acc[row[t]] += c;
      }
      // Extend the running product with this segment.
      ap = (ap * prod[nd]) % mod;
    }
    // Fold right covering nodes from left to right.
    for (let i = rightNodes.length - 1; i >= 0; i--) {
      // Bind node, histogram base, and shift row.
      const nd = rightNodes[i], base = nd * mod, row = mul[ap];
      // Fold this segment prefixes in, shifted by prior product.
      for (let t = 0; t < mod; t++) {
        // Skip empty remainder buckets.
        const c = freq[base + t];
        // Add shifted prefixes to the accumulator.
        if (c) acc[row[t]] += c;
      }
      // Extend the running product with this segment.
      ap = (ap * prod[nd]) % mod;
    }
    // Record the count of prefixes with remainder x.
    ans[qi] = acc[x];
  }
  // Return per-query x-values in input order.
  return ans;
}
