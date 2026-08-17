/*
1563. Stone Game V

There are several stones arranged in a row, and each stone has an associated value which is an integer given in the array stoneValue.

In each round of the game, Alice divides the row into two non-empty rows (i.e. left row and right row), then Bob calculates the value of each row which is the sum of the values of all the stones in this row. Bob throws away the row which has the maximum value, and Alice's score increases by the value of the remaining row. If the value of the two rows are equal, Bob lets Alice decide which row will be thrown away. The next round starts with the remaining row.

The game ends when there is only one stone remaining. Alice's score is initially zero.

Return the maximum score that Alice can obtain.

Example 1:
Input: stoneValue = [6,2,3,4,5,5]
Output: 18
Explanation: In the first round, Alice divides the row to [6,2,3], [4,5,5]. The left row has the value 11 and the right row has value 14. Bob throws away the right row and Alice's score is now 11. In the second round Alice divides the row to [6], [2,3]. This time Bob throws away the left row and Alice's score becomes 16 (11 + 5). The last round Alice has only one choice to divide the row which is [2], [3]. Bob throws away the right row and Alice's score is now 18 (16 + 2). The game ends because only one stone is remaining in the row.

Example 2:
Input: stoneValue = [7,7,7,7,7,7,7]
Output: 28

Example 3:
Input: stoneValue = [4]
Output: 0

Constraints:
1 <= stoneValue.length <= 500
1 <= stoneValue[i] <= 10^6

</> Typescript code:
*/

function stoneGameV(stoneValue: number[]): number {
  // Cache the number of stones.
  const n = stoneValue.length;
  // A singleton cannot be divided and scores nothing.
  if (n < 2) return 0;

  // Store prefix sums for constant-time interval values.
  const prefix = new Float64Array(n + 1);
  // Accumulate every stone into its following prefix position.
  for (let i = 0; i < n; ++i) {
    // Extend the prefix by the current positive value.
    prefix[i + 1] = prefix[i] + stoneValue[i];
  }

  // Flatten all interval tables into contiguous typed arrays.
  const size = n * n;
  // Record each interval's last split whose left sum does not exceed its right sum.
  const boundary = new Int16Array(size);
  // Precompute monotone split boundaries independently for every left endpoint.
  for (let left = 0; left < n; ++left) {
    // Start before the first legal split in case its left side is already larger.
    let split = left - 1;
    // Grow the right endpoint so the valid boundary can only move forward.
    for (let right = left + 1; right < n; ++right) {
      // Compute the current interval sum.
      const total = prefix[right + 1] - prefix[left];
      // Advance through every split whose left side is at most half the interval.
      while (
        split + 1 < right &&
        2 * (prefix[split + 2] - prefix[left]) <= total
      ) {
        // Accept the next valid split.
        ++split;
      }
      // Save the boundary for the interval DP transition.
      boundary[left * n + right] = split;
    }
  }

  // Store the optimal future score for every interval.
  const dp = new Int32Array(size);
  // Store prefix maxima of interval value plus its optimal future score.
  const bestLeft = new Int32Array(size);
  // Store suffix maxima of interval value plus its optimal future score.
  const bestRight = new Int32Array(size);

  // Initialize both maxima tables with every singleton's value.
  for (let i = 0; i < n; ++i) {
    // Seed intervals that can be retained as a left row.
    bestLeft[i * n + i] = stoneValue[i];
    // Seed intervals that can be retained as a right row.
    bestRight[i * n + i] = stoneValue[i];
  }

  // Solve intervals from shortest to longest so every dependency is ready.
  for (let length = 2; length <= n; ++length) {
    // Enumerate all intervals of the current length.
    for (let left = 0, right = length - 1; right < n; ++left, ++right) {
      // Flatten the current interval coordinates.
      const index = left * n + right;
      // Load the final split where retaining the left row is legal.
      const split = boundary[index];
      // Recover the current interval's total value.
      const total = prefix[right + 1] - prefix[left];
      // Maximize all legal retained-left choices in constant time.
      let score = split >= left ? bestLeft[left * n + split] : 0;
      // Compute the boundary split's left value, or zero before any legal split.
      const leftSum = prefix[split + 1] - prefix[left];
      // Include the boundary on the right side only when its two sums are equal.
      const rightStart = 2 * leftSum === total ? split + 1 : split + 2;

      // Consider legal retained-right choices when at least one exists.
      if (rightStart <= right) {
        // Maximize all legal retained-right choices in constant time.
        score = Math.max(score, bestRight[rightStart * n + right]);
      }

      // Save the best score obtainable from this interval.
      dp[index] = score;
      // Combine its immediate value with its future score for parent transitions.
      const extended = score + total;
      // Extend the fixed-left range maximum through this right endpoint.
      bestLeft[index] = Math.max(bestLeft[left * n + right - 1], extended);
      // Extend the fixed-right range maximum through this left endpoint.
      bestRight[index] = Math.max(bestRight[(left + 1) * n + right], extended);
    }
  }

  // Return the optimum for the complete row.
  return dp[n - 1];
}
