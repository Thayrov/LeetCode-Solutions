/*
3934. Smallest Unique Subarray

You are given an integer array nums.
Find the minimum length of a subarray that is not identical to any other subarray in nums.
Return an integer denoting the minimum possible length of such a subarray.
Two subarrays are considered identical if they have the same length and the same elements in corresponding positions.

Example 1:
Input: nums = [3,3,3]
Output: 3
Explanation:
Subarrays of length 1: [3] → appears 3 times
Subarrays of length 2: [3, 3] → appears 2 times
Subarrays of length 3: [3, 3, 3] → appears once
The subarray [3, 3, 3] is unique, so the smallest unique subarray length is 3.

Example 2:
Input: nums = [2,1,2,3,3]
Output: 1
Explanation:
Subarrays of length 1:
[2] → appears 2 times
[1] → appears once
[3] → appears 2 times
The subarray [1] is unique, so the smallest unique subarray length is 1.

Example 3:
Input: nums = [1,1,2,2,1]
Output: 2
Explanation:
Subarrays of length 1:
[1] → appears 3 times
[2] → appears 2 times
Subarrays of length 2:
[1, 1] → appears once
[1, 2] → appears once
[2, 2] → appears once
[2, 1] → appears once
There is at least one subarray of length 2 that is unique, so the smallest unique subarray length is 2.

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^5

</> Typescript code:
*/

function smallestUniqueSubarray(nums: number[]): number {
  // Cache the number of suffixes.
  const n = nums.length;
  // Track the largest initial alphabet value.
  let maxRank = 0;
  // Bound the initial counting-sort range.
  for (let i = 0; i < n; i++) if (nums[i] > maxRank) maxRank = nums[i];

  // Allocate counting buckets for both the alphabet and later rank classes.
  const counts = new Int32Array(Math.max(n, maxRank) + 1);
  // Store suffix starts in lexicographic order.
  const order = new Int32Array(n);
  // Use the input values as positive one-element ranks.
  let rank = Int32Array.from(nums);
  // Buffer the next round's ranks until all comparisons finish.
  let nextRank = new Int32Array(n);
  // Reuse this buffer for radix order and adjacent LCP lengths.
  const shifted = new Int32Array(n);

  // Count suffixes by their first element.
  for (let i = 0; i < n; i++) counts[rank[i]]++;
  // Convert counts into exclusive bucket ends.
  for (let r = 1; r <= maxRank; r++) counts[r] += counts[r - 1];
  // Place suffixes in stable first-element order.
  for (let i = n - 1; i >= 0; i--) order[--counts[rank[i]]] = i;

  // Double the ranked prefix length in each round.
  for (let width = 1; width < n; width *= 2) {
    // Reset the write index for second-half order.
    let size = 0;
    // Place suffixes with an empty second half first.
    for (let i = n - width; i < n; i++) shifted[size++] = i;
    // Shift the existing order left to sort the remaining second halves.
    for (let i = 0; i < n; i++) {
      // Keep only shifts that produce valid suffix starts.
      if (order[i] >= width) shifted[size++] = order[i] - width;
    }

    // Clear the active counting buckets.
    counts.fill(0, 0, maxRank + 1);
    // Count first-half ranks.
    for (let i = 0; i < n; i++) counts[rank[i]]++;
    // Compute exclusive bucket ends for the first half.
    for (let r = 1; r <= maxRank; r++) counts[r] += counts[r - 1];
    // Scatter backward to preserve the second-half order within each bucket.
    for (let i = n - 1; i >= 0; i--) {
      // Read the next suffix from second-half order.
      const start = shifted[i];
      // Place it at the last free position in its first-half bucket.
      order[--counts[rank[start]]] = start;
    }

    // Reserve zero for missing halves and start real ranks at one.
    let classes = 1;
    // Assign the smallest rank to the first suffix.
    nextRank[order[0]] = classes;
    // Compress adjacent equal rank pairs into the same class.
    for (let i = 1; i < n; i++) {
      // Compare the current suffix with its sorted predecessor.
      const a = order[i - 1], b = order[i];
      // Start a class when either half differs, treating missing halves as zero.
      if (rank[a] !== rank[b] || (rank[a + width] || 0) !== (rank[b + width] || 0)) {
        // Advance to the next positive rank.
        classes++;
      }
      // Record the rank of this doubled prefix.
      nextRank[b] = classes;
    }
    // Save the old rank buffer for reuse.
    const previous = rank;
    // Publish the doubled prefix ranks.
    rank = nextRank;
    // Recycle the old ranks as the next output buffer.
    nextRank = previous;
    // Limit counting sort to the dense rank range.
    maxRank = classes;
    // Stop when ranks already distinguish all suffixes.
    if (classes === n) break;
  }

  // Invert the completed suffix order.
  for (let i = 0; i < n; i++) rank[order[i]] = i;
  // Track the reusable prefix length for Kasai's algorithm.
  let shared = 0;
  // Visit suffixes in input order to reuse prefix comparisons.
  for (let start = 0; start < n; start++) {
    // Look up this suffix's position in lexicographic order.
    const position = rank[start];
    // The first suffix has no lexicographic predecessor.
    if (position === 0) {
      // Store a zero LCP and clear the carried prefix.
      shifted[position] = shared = 0;
      // Skip comparison for the first sorted suffix.
      continue;
    }
    // Find the preceding suffix in lexicographic order.
    const neighbor = order[position - 1];
    // Extend the shared prefix while both suffixes have equal elements.
    while (start + shared < n && neighbor + shared < n && nums[start + shared] === nums[neighbor + shared]) {
      // Count the newly matched element.
      shared++;
    }
    // Store the LCP with the preceding suffix.
    shifted[position] = shared;
    // Drop the first element to get the next suffix's LCP lower bound.
    if (shared > 0) shared--;
  }

  // The full array always occurs exactly once.
  let best = n;
  // Consider the shortest unique prefix at each suffix start.
  for (let i = 0; i < n; i++) {
    // Exceed the larger LCP with either immediate neighbor.
    const length = 1 + Math.max(shifted[i], i + 1 < n ? shifted[i + 1] : 0);
    // Keep shorter candidates that fit within their suffix.
    if (length < best && length <= n - order[i]) best = length;
  }
  // Return the minimum unique length.
  return best;
}
