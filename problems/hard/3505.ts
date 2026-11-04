/*
3505. Minimum Operations to Make Elements Within K Subarrays Equal

You are given an integer array nums and two integers, x and k. You can perform the following operation any number of times (including zero):

Increase or decrease any element of nums by 1.

Return the minimum number of operations needed to have at least k non-overlapping subarrays of size exactly x in nums, where all elements within each subarray are equal.

Example 1:
Input: nums = [5,-2,1,3,7,3,6,4,-1], x = 3, k = 2
Output: 8
Explanation:
Use 3 operations to add 3 to nums[1] and use 2 operations to subtract 2 from nums[3]. The resulting array is [5, 1, 1, 1, 7, 3, 6, 4, -1].
Use 1 operation to add 1 to nums[5] and use 2 operations to subtract 2 from nums[6]. The resulting array is [5, 1, 1, 1, 7, 4, 4, 4, -1].
Now, all elements within each subarray [1, 1, 1] (from indices 1 to 3) and [4, 4, 4] (from indices 5 to 7) are equal. Since 8 total operations were used, 8 is the output.

Example 2:
Input: nums = [9,-2,-2,-2,1,5], x = 2, k = 2
Output: 3
Explanation:
Use 3 operations to subtract 3 from nums[4]. The resulting array is [9, -2, -2, -2, -2, 5].
Now, all elements within each subarray [-2, -2] (from indices 1 to 2) and [-2, -2] (from indices 3 to 4) are equal. Since 3 operations were used, 3 is the output.

Constraints:
2 <= nums.length <= 10^5
-10^6 <= nums[i] <= 10^6
2 <= x <= nums.length
1 <= k <= 15
2 <= k * x <= nums.length

</> Typescript code:
*/

function minOperations(nums: number[], x: number, k: number): number {
  // Cache length and derived window count.
  const n = nums.length;
  // Count valid window starts.
  const m = n - x + 1;
  // Max-heap holds lower half, top is median.
  const low: number[] = [];
  // Min-heap holds upper half.
  const high: number[] = [];
  // Logical size of lower half.
  let lowSize = 0;
  // Logical size of upper half.
  let highSize = 0;
  // Sum of lower half elements.
  let sumLow = 0;
  // Sum of upper half elements.
  let sumHigh = 0;
  // Lazy deletion counts for slid-out values.
  const delayed = new Map<number, number>();
  // Push into max-heap with sift-up.
  function lowPush(v: number): void {
    // Append at end first.
    low.push(v);
    // Restore max-heap upward.
    let i = low.length - 1;
    // Bubble until parent dominates.
    while (i > 0) {
      // Compute parent index.
      const p = (i - 1) >> 1;
      // Stop if heap order holds.
      if (low[p] >= low[i]) break;
      // Swap child with parent.
      const t = low[p]; low[p] = low[i]; low[i] = t;
      // Move up one level.
      i = p;
    }
  }
  // Push into min-heap with sift-up.
  function highPush(v: number): void {
    // Append at end first.
    high.push(v);
    // Restore min-heap upward.
    let i = high.length - 1;
    // Bubble until parent precedes.
    while (i > 0) {
      // Compute parent index.
      const p = (i - 1) >> 1;
      // Stop if heap order holds.
      if (high[p] <= high[i]) break;
      // Swap child with parent.
      const t = high[p]; high[p] = high[i]; high[i] = t;
      // Move up one level.
      i = p;
    }
  }
  // Pop top of max-heap with sift-down.
  function lowPop(): number {
    // Save top to return.
    const top = low[0];
    // Move last element to root.
    const last = low.pop()!;
    // Sift down only if nonempty.
    if (low.length > 0) {
      // Place last at root.
      low[0] = last;
      // Restore max-heap downward.
      let i = 0;
      // Loop until heap order holds.
      for (;;) {
        // Compute children indices.
        const l = 2 * i + 1;
        // Right child follows left.
        const r = l + 1;
        // Assume current is largest.
        let best = i;
        // Take left if larger.
        if (l < low.length && low[l] > low[best]) best = l;
        // Take right if even larger.
        if (r < low.length && low[r] > low[best]) best = r;
        // Stop if correctly placed.
        if (best === i) break;
        // Swap with largest child.
        const t = low[i]; low[i] = low[best]; low[best] = t;
        // Descend one level.
        i = best;
      }
    }
    // Return removed median-side top.
    return top;
  }
  // Pop top of min-heap with sift-down.
  function highPop(): number {
    // Save top to return.
    const top = high[0];
    // Move last element to root.
    const last = high.pop()!;
    // Sift down only if nonempty.
    if (high.length > 0) {
      // Place last at root.
      high[0] = last;
      // Restore min-heap downward.
      let i = 0;
      // Loop until heap order holds.
      for (;;) {
        // Compute children indices.
        const l = 2 * i + 1;
        // Right child follows left.
        const r = l + 1;
        // Assume current is smallest.
        let best = i;
        // Take left if smaller.
        if (l < high.length && high[l] < high[best]) best = l;
        // Take right if even smaller.
        if (r < high.length && high[r] < high[best]) best = r;
        // Stop if correctly placed.
        if (best === i) break;
        // Swap with smallest child.
        const t = high[i]; high[i] = high[best]; high[best] = t;
        // Descend one level.
        i = best;
      }
    }
    // Return removed upper-half top.
    return top;
  }
  // Drop lazily deleted tops from max-heap.
  function pruneLow(): void {
    // Check tops while marked delayed.
    while (low.length > 0) {
      // Peek current top.
      const t = low[0];
      // Look up pending deletion count.
      const c = delayed.get(t);
      // Valid top ends pruning.
      if (!c) break;
      // Consume one deletion mark.
      if (c === 1) delayed.delete(t); else delayed.set(t, c - 1);
      // Physically discard the top.
      lowPop();
    }
  }
  // Drop lazily deleted tops from min-heap.
  function pruneHigh(): void {
    // Check tops while marked delayed.
    while (high.length > 0) {
      // Peek current top.
      const t = high[0];
      // Look up pending deletion count.
      const c = delayed.get(t);
      // Valid top ends pruning.
      if (!c) break;
      // Consume one deletion mark.
      if (c === 1) delayed.delete(t); else delayed.set(t, c - 1);
      // Physically discard the top.
      highPop();
    }
  }
  // Rebalance halves to median invariant.
  function balance(): void {
    // Lower half too large, move top down.
    if (lowSize > highSize + 1) {
      // Ensure movable top is valid.
      pruneLow();
      // Shift median to upper half.
      const v = lowPop();
      // Update lower sum and size.
      sumLow -= v; lowSize--;
      // Insert into upper half.
      highPush(v); sumHigh += v; highSize++;
    } else if (lowSize < highSize) {
      // Upper half larger, move top up.
      pruneHigh();
      // Shift smallest upper to lower.
      const v = highPop();
      // Update upper sum and size.
      sumHigh -= v; highSize--;
      // Insert into lower half.
      lowPush(v); sumLow += v; lowSize++;
    }
    // Clear any delayed tops exposed.
    pruneLow(); pruneHigh();
  }
  // Insert value into median structure.
  function addNum(v: number): void {
    // Refresh tops before median test.
    pruneLow(); pruneHigh();
    // First element seeds lower half.
    if (lowSize === 0) { lowPush(v); sumLow += v; lowSize++; }
    // Values below median go left.
    else if (v <= low[0]) { lowPush(v); sumLow += v; lowSize++; }
    // Larger values go right.
    else { highPush(v); sumHigh += v; highSize++; }
    // Restore size invariant.
    balance();
  }
  // Lazily erase sliding-out value.
  function removeNum(v: number): void {
    // Refresh tops to read true median.
    pruneLow(); pruneHigh();
    // Capture median for side decision.
    const med = low[0];
    // Mark value for lazy deletion.
    delayed.set(v, (delayed.get(v) ?? 0) + 1);
    // Values at/below median shrink lower half.
    if (v <= med) { lowSize--; sumLow -= v; }
    // Larger values shrink upper half.
    else { highSize--; sumHigh -= v; }
    // Drop exposed delayed tops.
    pruneLow(); pruneHigh();
    // Restore size invariant.
    balance();
  }
  // Compute sum of absolute deviations to median.
  function windowCost(): number {
    // Refresh tops before reading median.
    pruneLow(); pruneHigh();
    // Median is lower-half top.
    const med = low[0];
    // Apply median deviation formula.
    return med * lowSize - sumLow + sumHigh - med * highSize;
  }
  // Seed structure with first window.
  for (let i = 0; i < x; i++) addNum(nums[i]);
  // Store equalization cost per window start.
  const wc = new Array<number>(m);
  // Cost of window starting at 0.
  wc[0] = windowCost();
  // Slide window and record each cost.
  for (let i = 1; i < m; i++) {
    // Evict outgoing left element.
    removeNum(nums[i - 1]);
    // Insert incoming right element.
    addNum(nums[i + x - 1]);
    // Record current window cost.
    wc[i] = windowCost();
  }
  // Previous DP row, zero subarrays cost zero.
  let prev = new Array<number>(n + 1).fill(0);
  // Build DP rows for 1..k subarrays.
  for (let t = 1; t <= k; t++) {
    // Current row starts as unreachable.
    const cur = new Array<number>(n + 1).fill(Infinity);
    // Extend prefix by one position.
    for (let i = 1; i <= n; i++) {
      // Option skipping position i.
      let best = cur[i - 1];
      // Option ending a window at i.
      if (i >= x && prev[i - x] !== Infinity) {
        // Candidate adds window cost.
        const cand = prev[i - x] + wc[i - x];
        // Keep cheaper placement.
        if (cand < best) best = cand;
      }
      // Store best for this prefix.
      cur[i] = best;
    }
    // Roll row forward for next count.
    prev = cur;
  }
  // Minimum cost using k windows over all nums.
  return prev[n];
}
