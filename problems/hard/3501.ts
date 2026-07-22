/*
3501. Maximize Active Section with Trade II

You are given a binary string s of length n, where:
'1' represents an active section.
'0' represents an inactive section.

You can perform at most one trade to maximize the number of active sections in s. In a trade, you:
Convert a contiguous block of '1's that is surrounded by '0's to all '0's.
Afterward, convert a contiguous block of '0's that is surrounded by '1's to all '1's.

Additionally, you are given a 2D array queries, where queries[i] = [li, ri] represents a substring s[li...ri].

For each query, determine the maximum possible number of active sections in s after making the optimal trade on the substring s[li...ri].

Return an array answer, where answer[i] is the result for queries[i].

Note:
For each query, treat s[li...ri] as if it is augmented with a '1' at both ends, forming t = '1' + s[li...ri] + '1'. The augmented '1's do not contribute to the final count.
The queries are independent of each other.

Example 1:
Input: s = "01", queries = [[0,1]]
Output: [1]
Explanation:
Because there is no block of '1's surrounded by '0's, no valid trade is possible. The maximum number of active sections is 1.

Example 2:
Input: s = "0100", queries = [[0,3],[0,2],[1,3],[2,3]]
Output: [4,3,1,1]
Explanation:
Query [0, 3] -> Substring "0100" -> Augmented to "101001"
Choose "0100", convert "0100" -> "0000" -> "1111".
The final string without augmentation is "1111". The maximum number of active sections is 4.
Query [0, 2] -> Substring "010" -> Augmented to "10101"
Choose "010", convert "010" -> "000" -> "111".
The final string without augmentation is "1110". The maximum number of active sections is 3.
Query [1, 3] -> Substring "100" -> Augmented to "11001"
Because there is no block of '1's surrounded by '0's, no valid trade is possible. The maximum number of active sections is 1.
Query [2, 3] -> Substring "00" -> Augmented to "1001"
Because there is no block of '1's surrounded by '0's, no valid trade is possible. The maximum number of active sections is 1.

Example 3:
Input: s = "1000100", queries = [[1,5],[0,6],[0,4]]
Output: [6,7,2]
Explanation:
Query [1, 5] -> Substring "00010" -> Augmented to "1000101"
Choose "00010", convert "00010" -> "00000" -> "11111".
The final string without augmentation is "1111110". The maximum number of active sections is 6.
Query [0, 6] -> Substring "1000100" -> Augmented to "110001001"
Choose "000100", convert "000100" -> "000000" -> "111111".
The final string without augmentation is "1111111". The maximum number of active sections is 7.
Query [0, 4] -> Substring "10001" -> Augmented to "1100011"
Because there is no block of '1's surrounded by '0's, no valid trade is possible. The maximum number of active sections is 2.

Example 4:
Input: s = "01010", queries = [[0,3],[1,4],[1,3]]
Output: [4,4,2]
Explanation:
Query [0, 3] -> Substring "0101" -> Augmented to "101011"
Choose "010", convert "010" -> "000" -> "111".
The final string without augmentation is "11110". The maximum number of active sections is 4.
Query [1, 4] -> Substring "1010" -> Augmented to "110101"
Choose "010", convert "010" -> "000" -> "111".
The final string without augmentation is "01111". The maximum number of active sections is 4.
Query [1, 3] -> Substring "101" -> Augmented to "11011"
Because there is no block of '1's surrounded by '0's, no valid trade is possible. The maximum number of active sections is 2.

Constraints:
1 <= n == s.length <= 10^5
1 <= queries.length <= 10^5
s[i] is either '0' or '1'.
queries[i] = [li, ri]
0 <= li <= ri < n

</> Typescript code:
*/

function maxActiveSectionsAfterTrade(s: string, queries: number[][]): number[] {
  // Cache the string length.
  const n = s.length;
  // Store each eligible pattern's left zero-run start.
  const leftStarts: number[] = [];
  // Store each eligible pattern's middle one-run start.
  const oneStarts: number[] = [];
  // Store each eligible pattern's middle one-run end.
  const oneEnds: number[] = [];
  // Store each eligible pattern's right zero-run end.
  const rightEnds: number[] = [];
  // Store the full gain from merging each adjacent zero-run pair.
  const gains: number[] = [];
  // Count active sections outside the query-specific gain.
  let ones = 0;
  // Start the run-length scan.
  let i = 0;
  // Track the latest zero-run start.
  let zeroStart = -1;
  // Track a one-run waiting for a right zero-run.
  let pendingStart = -1;
  // Track that pending one-run's end.
  let pendingEnd = -1;

  // Parse maximal equal-bit runs once.
  while (i < n) {
    // Mark the current run's start.
    const start = i;
    // Read the current run's bit as an ASCII code.
    const bit = s.charCodeAt(i);

    // Advance past the entire current run.
    while (i < n && s.charCodeAt(i) === bit) i++;

    // Recover the inclusive end of the run.
    const end = i - 1;

    // Process a zero-run as a possible right boundary.
    if (bit === 48) {
      // Complete a zero-one-zero trade pattern when present.
      if (pendingStart !== -1) {
        // Record the left zero boundary.
        leftStarts.push(zeroStart);
        // Record the middle one-run start.
        oneStarts.push(pendingStart);
        // Record the middle one-run end.
        oneEnds.push(pendingEnd);
        // Record the right zero boundary.
        rightEnds.push(end);
        // Record the gain from activating both zero-runs.
        gains.push(pendingStart - zeroStart + end - pendingEnd);
      }

      // Make this zero-run the next pattern's left boundary.
      zeroStart = start;
      // Clear the completed pending one-run.
      pendingStart = -1;
    } else {
      // Add this one-run to the original active count.
      ones += i - start;

      // Retain only one-runs with a left zero-run.
      if (zeroStart !== -1) {
        // Save the candidate one-run start.
        pendingStart = start;
        // Save the candidate one-run end.
        pendingEnd = end;
      }
    }
  }

  // Cache the number of complete trade patterns.
  const m = gains.length;
  // Allocate an iterative maximum segment tree.
  const tree = new Int32Array(m * 2);

  // Copy trade gains into the tree leaves.
  for (let j = 0; j < m; j++) tree[m + j] = gains[j];

  // Build maximums bottom-up.
  for (let j = m - 1; j > 0; j--) {
    // Merge the two child maximums.
    tree[j] = Math.max(tree[j << 1], tree[(j << 1) | 1]);
  }

  // Find the first value greater than or equal to a target.
  const lowerBound = (values: number[], target: number): number => {
    // Initialize the half-open search interval.
    let left = 0;
    let right = values.length;

    // Halve the remaining interval each iteration.
    while (left < right) {
      // Select the overflow-safe midpoint.
      const middle = (left + right) >> 1;

      // Discard values strictly below the target.
      if (values[middle] < target) left = middle + 1;
      // Otherwise retain the midpoint in the upper half.
      else right = middle;
    }

    // Return the insertion position.
    return left;
  };

  // Find the first value strictly greater than a target.
  const upperBound = (values: number[], target: number): number => {
    // Initialize the half-open search interval.
    let left = 0;
    let right = values.length;

    // Halve the remaining interval each iteration.
    while (left < right) {
      // Select the overflow-safe midpoint.
      const middle = (left + right) >> 1;

      // Discard values at or below the target.
      if (values[middle] <= target) left = middle + 1;
      // Otherwise retain the midpoint in the upper half.
      else right = middle;
    }

    // Return the insertion position.
    return left;
  };

  // Query the maximum gain over a half-open pattern range.
  const rangeMax = (left: number, right: number): number => {
    // Initialize the accumulated maximum.
    let best = 0;

    // Walk both iterative tree boundaries upward.
    for (left += m, right += m; left < right; left >>= 1, right >>= 1) {
      // Consume an exposed left node.
      if (left & 1) best = Math.max(best, tree[left++]);
      // Consume an exposed right node.
      if (right & 1) best = Math.max(best, tree[--right]);
    }

    // Return the covered maximum.
    return best;
  };

  // Resolve every independent substring query.
  return queries.map(([left, right]) => {
    // Start with the no-trade gain.
    let bestGain = 0;
    // Locate the first pattern whose left zero-run is fully covered.
    const firstFull = lowerBound(leftStarts, left);
    // Locate the boundary after patterns whose right zero-run is fully covered.
    const afterLastFull = upperBound(rightEnds, right);

    // Query all patterns with both zero-runs fully covered.
    if (firstFull < afterLastFull) {
      // Merge the interior range maximum.
      bestGain = rangeMax(firstFull, afterLastFull);
    }

    // Handle a left zero-run clipped by the query boundary.
    if (s.charCodeAt(left) === 48) {
      // Select the first one-run strictly after the left boundary.
      const candidate = lowerBound(oneStarts, left + 1);

      // Require the candidate and a right zero inside the query.
      if (candidate < m && oneEnds[candidate] < right) {
        // Merge the gain using the clipped left and possibly clipped right run.
        bestGain = Math.max(
          bestGain,
          oneStarts[candidate] - left +
            Math.min(right, rightEnds[candidate]) -
            oneEnds[candidate],
        );
      }
    }

    // Handle a right zero-run clipped by the query boundary.
    if (s.charCodeAt(right) === 48) {
      // Select the last one-run strictly before the right boundary.
      const candidate = lowerBound(oneEnds, right) - 1;

      // Require the candidate and a left zero inside the query.
      if (candidate >= 0 && oneStarts[candidate] > left) {
        // Merge the gain using the possibly clipped left and clipped right run.
        bestGain = Math.max(
          bestGain,
          oneStarts[candidate] -
            Math.max(left, leftStarts[candidate]) +
            right -
            oneEnds[candidate],
        );
      }
    }

    // Add the optimal query gain to the original active count.
    return ones + bestGain;
  });
}
