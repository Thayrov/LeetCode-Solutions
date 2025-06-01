/*
2929. Distribute Candies Among Children II

You are given two positive integers n and limit.

Return the total number of ways to distribute n candies among 3 children such that no child gets more than limit candies.

Example 1:
Input: n = 5, limit = 2
Output: 3
Explanation: There are 3 ways to distribute 5 candies such that no child gets more than 2 candies: (1, 2, 2), (2, 1, 2) and (2, 2, 1).

Example 2:
Input: n = 3, limit = 3
Output: 10
Explanation: There are 10 ways to distribute 3 candies such that no child gets more than 3 candies: (0, 0, 3), (0, 1, 2), (0, 2, 1), (0, 3, 0), (1, 0, 2), (1, 1, 1), (1, 2, 0), (2, 0, 1), (2, 1, 0) and (3, 0, 0).

Constraints:
1 <= n <= 10^6
1 <= limit <= 10^6

</> Typescript code:
*/

function distributeCandies(n: number, limit: number): number {
  // Helper function to calculate C(x, 2) = x * (x-1) / 2
  // Returns 0 if x < 2 (invalid combinations)
  const comb2 = (x: number): number => (x < 2 ? 0 : (x * (x - 1)) / 2);

  // Using inclusion-exclusion principle to solve stars and bars with constraints
  // We want to find non-negative integer solutions to: x1 + x2 + x3 = n
  // where 0 ≤ xi ≤ limit for each child i

  // Total ways without upper bound constraints: C(n + 3 - 1, 3 - 1) = C(n + 2, 2)
  const totalWays = comb2(n + 2);

  // Subtract ways where at least one child gets more than limit candies
  // If child i gets ≥ (limit + 1), give them (limit + 1) first, then distribute remaining
  // C(n - (limit + 1) + 2, 2) = C(n - limit + 1, 2) for each of 3 children
  const oneViolation = 3 * comb2(n - limit + 1);

  // Add back ways where at least two children get more than limit candies
  // If two children each get ≥ (limit + 1), give them each (limit + 1) first
  // C(n - 2*(limit + 1) + 2, 2) = C(n - 2*limit, 2) for each of C(3,2) = 3 pairs
  const twoViolations = 3 * comb2(n - 2 * limit);

  // Subtract ways where all three children get more than limit candies
  // If all three get ≥ (limit + 1), give them each (limit + 1) first
  // C(n - 3*(limit + 1) + 2, 2) = C(n - 3*limit - 1, 2)
  const threeViolations = comb2(n - 3 * limit - 1);

  // Apply inclusion-exclusion principle
  return totalWays - oneViolation + twoViolations - threeViolations;
}
