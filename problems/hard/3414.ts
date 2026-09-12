/*
3414. Maximum Score of Non-overlapping Intervals

You are given a 2D integer array intervals, where intervals[i] = [li, ri, weighti]. Interval i starts at position li and ends at ri, and has a weight of weighti. You can choose up to 4 non-overlapping intervals. The score of the chosen intervals is defined as the total sum of their weights.

Return the lexicographically smallest array of at most 4 indices from intervals with maximum score, representing your choice of non-overlapping intervals.

Two intervals are said to be non-overlapping if they do not share any points. In particular, intervals sharing a left or right boundary are considered overlapping.

An array a is lexicographically smaller than an array b if, at the first position where they differ, a has the smaller element. If the first min(a.length, b.length) elements do not differ, the shorter array is lexicographically smaller.

Example 1:
Input: intervals = [[1,3,2],[4,5,2],[1,5,5],[6,9,3],[6,7,1],[8,9,1]]
Output: [2,3]
Explanation:
You can choose the intervals with indices 2, and 3 with respective weights of 5, and 3.

Example 2:
Input: intervals = [[5,8,1],[6,7,7],[4,7,3],[9,10,6],[7,8,2],[11,14,3],[3,5,5]]
Output: [1,3,5,6]
Explanation:
You can choose the intervals with indices 1, 3, 5, and 6 with respective weights of 7, 6, 3, and 5.

Constraints:
1 <= intevals.length <= 5 * 10^4
intervals[i].length == 3
intervals[i] = [li, ri, weighti]
1 <= li <= ri <= 10^9
1 <= weighti <= 10^9

</> Typescript code:
*/

function maximumWeight(intervals: number[][]): number[] {
  // Cache the input size for all fixed-width buffers.
  const n = intervals.length;
  // Attach each original index before reordering the intervals.
  const sorted = intervals.map((interval, index) => [interval[0], interval[1], interval[2], index]);
  // Order by right endpoint so every compatible predecessor lies in a prefix.
  sorted.sort((a, b) => a[1] - b[1] || a[0] - b[0] || a[3] - b[3]);

  // Store sorted endpoints for predecessor binary searches.
  const ends = new Float64Array(n);
  // Store the exclusive compatible-prefix length for every interval.
  const compatible = new Int32Array(n);
  // Copy right endpoints into a compact numeric buffer.
  for (let i = 0; i < n; ++i) ends[i] = sorted[i][1];
  // Find each interval's first predecessor endpoint that is not strictly smaller.
  for (let i = 0; i < n; ++i) {
    // Start the lower-bound search at the beginning of the sorted prefix.
    let low = 0;
    // Exclude the current interval from its predecessor search.
    let high = i;
    // Narrow the range to the first endpoint greater than or equal to this start.
    while (low < high) {
      // Split the remaining search range without overflow.
      const middle = (low + high) >>> 1;
      // Keep endpoints strictly before the start in the compatible prefix.
      if (ends[middle] < sorted[i][0]) low = middle + 1;
      // Otherwise retain this endpoint as a possible lower bound.
      else high = middle;
    }
    // Save the number of intervals that end before the current interval starts.
    compatible[i] = low;
  }

  // Hold the previous layer's best score for every sorted prefix.
  let previousScore = new Float64Array(n + 1);
  // Hold each previous selection's number of indices.
  let previousLength = new Uint8Array(n + 1);
  // Hold the first sorted original index, using -1 as the end marker.
  let previous0 = new Int32Array(n + 1);
  // Mark every first slot as initially unused.
  previous0.fill(-1);
  // Hold the second sorted original index.
  let previous1 = new Int32Array(n + 1);
  // Mark every second slot as initially unused.
  previous1.fill(-1);
  // Hold the third sorted original index.
  let previous2 = new Int32Array(n + 1);
  // Mark every third slot as initially unused.
  previous2.fill(-1);
  // Hold the fourth sorted original index.
  let previous3 = new Int32Array(n + 1);
  // Mark every fourth slot as initially unused.
  previous3.fill(-1);

  // Add one permitted interval per rolling weighted-scheduling layer.
  for (let chosen = 1; chosen <= 4; ++chosen) {
    // Allocate this layer's best scores.
    const score = new Float64Array(n + 1);
    // Allocate this layer's selection lengths.
    const length = new Uint8Array(n + 1);
    // Allocate and initialize this layer's first index slots.
    const id0 = new Int32Array(n + 1);
    // Use -1 to make a shorter equal-prefix array lexicographically smaller.
    id0.fill(-1);
    // Allocate and initialize this layer's second index slots.
    const id1 = new Int32Array(n + 1);
    // Mark unused second slots.
    id1.fill(-1);
    // Allocate and initialize this layer's third index slots.
    const id2 = new Int32Array(n + 1);
    // Mark unused third slots.
    id2.fill(-1);
    // Allocate and initialize this layer's fourth index slots.
    const id3 = new Int32Array(n + 1);
    // Mark unused fourth slots.
    id3.fill(-1);

    // Extend the optimum across sorted interval prefixes.
    for (let i = 1; i <= n; ++i) {
      // Read the interval newly available in this prefix.
      const interval = sorted[i - 1];
      // Locate the prior layer's compatible prefix.
      const prefix = compatible[i - 1];
      // Score the option that takes the current interval.
      const candidateScore = previousScore[prefix] + interval[2];
      // Record the resulting selection size.
      const candidateLength = previousLength[prefix] + 1;
      // Copy the compatible selection's first index.
      let c0 = previous0[prefix];
      // Copy the compatible selection's second index.
      let c1 = previous1[prefix];
      // Copy the compatible selection's third index.
      let c2 = previous2[prefix];
      // Copy the compatible selection's fourth index.
      let c3 = previous3[prefix];
      // Read the current interval's original index.
      const index = interval[3];

      // Insert the first selected index into the empty tuple.
      if (candidateLength === 1) c0 = index;
      // Insert before every existing index when it is the smallest.
      else if (index < c0) {
        // Shift the third index into the fourth slot.
        c3 = c2;
        // Shift the second index into the third slot.
        c2 = c1;
        // Shift the first index into the second slot.
        c1 = c0;
        // Place the new minimum in the first slot.
        c0 = index;
      // Insert into the second slot when it follows only the first index.
      } else if (candidateLength === 2 || index < c1) {
        // Shift the third index into the fourth slot.
        c3 = c2;
        // Shift the second index into the third slot.
        c2 = c1;
        // Place the new index in the second slot.
        c1 = index;
      // Insert into the third slot when it follows the first two indices.
      } else if (candidateLength === 3 || index < c2) {
        // Shift the old third index into the fourth slot.
        c3 = c2;
        // Place the new index in the third slot.
        c2 = index;
      // Otherwise append the new maximum original index.
      } else c3 = index;

      // Read the option that skips the current interval.
      const skipScore = score[i - 1];
      // Prefer greater score, then the lexicographically smaller fixed tuple.
      const take =
        candidateScore > skipScore ||
        (candidateScore === skipScore &&
          (c0 < id0[i - 1] ||
            (c0 === id0[i - 1] &&
              (c1 < id1[i - 1] ||
                (c1 === id1[i - 1] &&
                  (c2 < id2[i - 1] || (c2 === id2[i - 1] && c3 < id3[i - 1])))))));

      // Save the candidate when it wins the score and lexicographic comparison.
      if (take) {
        // Store the candidate score.
        score[i] = candidateScore;
        // Store the candidate length.
        length[i] = candidateLength;
        // Store the candidate's first index.
        id0[i] = c0;
        // Store the candidate's second index.
        id1[i] = c1;
        // Store the candidate's third index.
        id2[i] = c2;
        // Store the candidate's fourth index.
        id3[i] = c3;
      // Otherwise propagate the preceding prefix optimum.
      } else {
        // Copy the skipped score.
        score[i] = skipScore;
        // Copy the skipped selection length.
        length[i] = length[i - 1];
        // Copy the skipped first index.
        id0[i] = id0[i - 1];
        // Copy the skipped second index.
        id1[i] = id1[i - 1];
        // Copy the skipped third index.
        id2[i] = id2[i - 1];
        // Copy the skipped fourth index.
        id3[i] = id3[i - 1];
      }
    }

    // Roll this score layer forward for the next selection count.
    previousScore = score;
    // Roll this length layer forward.
    previousLength = length;
    // Roll the first index slots forward.
    previous0 = id0;
    // Roll the second index slots forward.
    previous1 = id1;
    // Roll the third index slots forward.
    previous2 = id2;
    // Roll the fourth index slots forward.
    previous3 = id3;
  }

  // Remove unused tuple slots and return the optimum's sorted original indices.
  return [previous0[n], previous1[n], previous2[n], previous3[n]].filter((index) => index >= 0);
}
