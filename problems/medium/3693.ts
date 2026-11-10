/*
3693. Climbing Stairs II

You are climbing a staircase with n + 1 steps, numbered from 0 to n.

You are also given a 1-indexed integer array costs of length n, where costs[i] is the cost of step i.

From step i, you can jump only to step i + 1, i + 2, or i + 3. The cost of jumping from step i to step j is defined as: costs[j] + (j - i)^2

You start from step 0 with cost = 0.

Return the minimum total cost to reach step n.

Example 1:
Input: n = 4, costs = [1,2,3,4]
Output: 13
Explanation:
One optimal path is 0 -> 1 -> 2 -> 4
Jump Cost Calculation Cost 0 -> 1 costs[1] + (1 - 0)^2 = 1 + 1 2 1 -> 2 costs[2] + (2 - 1)^2 = 2 + 1 3 2 -> 4 costs[4] + (4 - 2)^2 = 4 + 4 8
Thus, the minimum total cost is 2 + 3 + 8 = 13

Example 2:
Input: n = 4, costs = [5,1,6,2]
Output: 11
Explanation:
One optimal path is 0 -> 2 -> 4
Jump Cost Calculation Cost 0 -> 2 costs[2] + (2 - 0)^2 = 1 + 4 5 2 -> 4 costs[4] + (4 - 2)^2 = 2 + 4 6
Thus, the minimum total cost is 5 + 6 = 11

Example 3:
Input: n = 3, costs = [9,8,3]
Output: 12
Explanation:
The optimal path is 0 -> 3 with total cost = costs[3] + (3 - 0)^2 = 3 + 9 = 12

Constraints:
1 <= n == costs.length <= 10^5
1 <= costs[i] <= 10^4

</> Typescript code:
*/

function climbStairs(n: number, costs: number[]): number {
  // Handles single-step staircase directly.
  if (n === 1) return costs[0] + 1;
  // Holds dp[j-3], starting at dp[0] = 0.
  let d0 = 0;
  // Holds dp[j-2], seeded with dp[1].
  let d1 = costs[0] + 1;
  // Holds dp[j-1], seeded with dp[2].
  let d2 = costs[1] + Math.min(d1 + 1, d0 + 4);
  // Returns dp[2] for length-two staircase.
  if (n === 2) return d2;
  // Extends dp forward from step 3 to step n.
  for (let j = 3; j <= n; j++) {
    // Cost to arrive from predecessor j-1 with square penalty 1.
    const b1 = d2 + 1;
    // Cost to arrive from predecessor j-2 with square penalty 4.
    const b2 = d1 + 4;
    // Cost to arrive from predecessor j-3 with square penalty 9.
    const b3 = d0 + 9;
    // Keeps smaller of the one-step and two-step arrivals.
    let best = b1 < b2 ? b1 : b2;
    // Keeps three-step arrival when it improves the minimum.
    if (b3 < best) best = b3;
    // Adds landing cost of step j to best arrival cost.
    const cur = costs[j - 1] + best;
    // Shifts window: old dp[j-2] becomes dp[j-3].
    d0 = d1;
    // Shifts window: old dp[j-1] becomes dp[j-2].
    d1 = d2;
    // Shifts window: current dp[j] becomes dp[j-1].
    d2 = cur;
  }
  // Returns dp[n], the minimum total cost.
  return d2;
}
