/*
3443. Maximum Manhattan Distance After K Changes

You are given a string s consisting of the characters 'N', 'S', 'E', and 'W', where s[i] indicates movements in an infinite grid:
'N' : Move north by 1 unit.
'S' : Move south by 1 unit.
'E' : Move east by 1 unit.
'W' : Move west by 1 unit.
Initially, you are at the origin (0, 0). You can change at most k characters to any of the four directions.
Find the maximum Manhattan distance from the origin that can be achieved at any time while performing the movements in order.
The Manhattan Distance between two cells (xi, yi) and (xj, yj) is |xi - xj| + |yi - yj|.

Example 1:
Input: s = "NWSE", k = 1
Output: 3
Explanation:
Change s[2] from 'S' to 'N'. The string s becomes "NWNE".
Movement	Position (x, y)	Manhattan Distance	Maximum
s[0] == 'N'	(0, 1)	0 + 1 = 1	1
s[1] == 'W'	(-1, 1)	1 + 1 = 2	2
s[2] == 'N'	(-1, 2)	1 + 2 = 3	3
s[3] == 'E'	(0, 2)	0 + 2 = 2	3
The maximum Manhattan distance from the origin that can be achieved is 3. Hence, 3 is the output.

Example 2:
Input: s = "NSWWEW", k = 3
Output: 6
Explanation:
Change s[1] from 'S' to 'N', and s[4] from 'E' to 'W'. The string s becomes "NNWWWW".
The maximum Manhattan distance from the origin that can be achieved is 6. Hence, 6 is the output.

Constraints:
1 <= s.length <= 10^5
0 <= k <= s.length
s consists of only 'N', 'S', 'E', and 'W'.

</> Typescript code:
*/

/**
 * Calculates the maximum Manhattan distance from the origin after at most k changes.
 * @param s The string of movements.
 * @param k The maximum number of characters that can be changed.
 * @returns The maximum possible Manhattan distance at any point in time.
 */
function maxDistance(s: string, k: number): number {
  /**
   * A helper function to calculate the maximum achievable absolute value for a single transformed coordinate axis (u or v).
   * The key insight is that |x| + |y| = max(|x+y|, |x-y|).
   * We can treat u = x+y and v = x-y as two independent 1D problems.
   * @param positiveMoves A set of characters that cause a +1 change on this axis.
   * @returns The maximum absolute value achievable on this axis.
   */
  const solveForAxis = (positiveMoves: Set<string>): number => {
    const n = s.length; // The total number of moves.

    // Prefix sum array for the coordinate's value based on the original string 's'.
    const deltaPrefix = new Array(n + 1).fill(0);
    // Prefix sum array for the cost to change moves to be positive for this axis.
    const costToMaximizePrefix = new Array(n + 1).fill(0);
    // Prefix sum array for the cost to change moves to be negative for this axis.
    const costToMinimizePrefix = new Array(n + 1).fill(0);

    // Precompute the prefix sums for delta, cost to maximize, and cost to minimize.
    for (let i = 0; i < n; i++) {
      // Check if the current move s[i] is positive for the given axis.
      const isPositiveMove = positiveMoves.has(s[i]);
      // Update the delta prefix sum. A positive move adds 1, a negative move adds -1.
      deltaPrefix[i + 1] = deltaPrefix[i] + (isPositiveMove ? 1 : -1);
      // Update the cost to maximize. Cost is 1 only if the move is not already positive.
      costToMaximizePrefix[i + 1] =
        costToMaximizePrefix[i] + (isPositiveMove ? 0 : 1);
      // Update the cost to minimize. Cost is 1 only if the move is not already negative (i.e., it's positive).
      costToMinimizePrefix[i + 1] =
        costToMinimizePrefix[i] + (isPositiveMove ? 1 : 0);
    }

    let maxAbsValue = 0; // Stores the maximum absolute value found so far for this axis.

    // Iterate through all possible stopping points (from time 0 to time n).
    for (let i = 0; i <= n; i++) {
      // Calculate the maximum possible coordinate value at step i.
      // This is the original value plus the maximum gain from changes.
      // Each change from a negative to a positive move gives a +2 boost.
      const maxValue =
        deltaPrefix[i] + 2 * Math.min(k, costToMaximizePrefix[i]);

      // Calculate the minimum possible coordinate value at step i.
      // This is the original value minus the maximum loss from changes.
      // Each change from a positive to a negative move gives a -2 penalty.
      const minValue =
        deltaPrefix[i] - 2 * Math.min(k, costToMinimizePrefix[i]);

      // The maximum absolute value at step i is max(maxValue, -minValue).
      // We update our overall maximum.
      maxAbsValue = Math.max(maxAbsValue, maxValue, -minValue);
    }

    // Return the maximum absolute value found across all time steps for this axis.
    return maxAbsValue;
  };

  // Calculate the max absolute value for the u-axis (u = x+y).
  // 'N' (0,1) -> u+=1; 'S' (0,-1) -> u-=1; 'E' (1,0) -> u+=1; 'W' (-1,0) -> u-=1.
  // Positive moves for u are 'N' and 'E'.
  const maxU = solveForAxis(new Set(["N", "E"]));

  // Calculate the max absolute value for the v-axis (v = x-y).
  // 'N' (0,1) -> v-=1; 'S' (0,-1) -> v+=1; 'E' (1,0) -> v+=1; 'W' (-1,0) -> v-=1.
  // Positive moves for v are 'S' and 'E'.
  const maxV = solveForAxis(new Set(["S", "E"]));

  // The max Manhattan distance is the maximum of the results from the two transformed axes.
  return Math.max(maxU, maxV);
}
