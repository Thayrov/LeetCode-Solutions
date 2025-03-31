/* 
2551. Put Marbles in Bags

You have k bags. You are given a 0-indexed integer array weights where weights[i] is the weight of the ith marble. You are also given the integer k.

Divide the marbles into the k bags according to the following rules:

No bag is empty.
If the ith marble and jth marble are in a bag, then all marbles with an index between the ith and jth indices should also be in that same bag.
If a bag consists of all the marbles with an index from i to j inclusively, then the cost of the bag is weights[i] + weights[j].
The score after distributing the marbles is the sum of the costs of all the k bags.

Return the difference between the maximum and minimum scores among marble distributions.

Example 1:
Input: weights = [1,3,5,1], k = 2
Output: 4
Explanation: 
The distribution [1],[3,5,1] results in the minimal score of (1+1) + (3+1) = 6. 
The distribution [1,3],[5,1], results in the maximal score of (1+3) + (5+1) = 10. 
Thus, we return their difference 10 - 6 = 4.

Example 2:
Input: weights = [1, 3], k = 2
Output: 0
Explanation: The only distribution possible is [1],[3]. 
Since both the maximal and minimal score are the same, we return 0.

Constraints:
1 <= k <= weights.length <= 10^5
1 <= weights[i] <= 10^9

</> Typescript code:
*/

function putMarbles(weights: number[], k: number): number {
  // Get the number of marbles.
  const n = weights.length;

  // Edge Case: If k is 1, all marbles are in one bag. The cost is weights[0] + weights[n-1].
  // If k is n, each marble is in its own bag. The cost of bag i is weights[i] + weights[i].
  // In both these scenarios, there's only one possible distribution,
  // meaning the maximum score equals the minimum score, so the difference is 0.
  if (k === 1 || k === n) {
    return 0;
  }

  // Analysis: Dividing n marbles into k bags requires k-1 cuts.
  // A cut occurs *between* marble i and marble i+1.
  // The total score for a given distribution is:
  // Score = (weights[0] + weights[p1]) + (weights[p1+1] + weights[p2]) + ... + (weights[pk-1+1] + weights[n-1])
  // where p1, p2, ..., pk-1 are the indices *before* the cuts.
  // Rearranging:
  // Score = weights[0] + weights[n-1] + (weights[p1] + weights[p1+1]) + ... + (weights[pk-1] + weights[pk-1+1])
  // The score is weights[0] + weights[n-1] plus the sum of (weights[i] + weights[i+1]) for each of the k-1 cut points i.
  // Therefore, to minimize the score, we choose the k-1 smallest sums (weights[i] + weights[i+1]).
  // To maximize the score, we choose the k-1 largest sums (weights[i] + weights[i+1]).
  // The difference (Max Score - Min Score) simplifies to:
  // (Sum of k-1 largest pair costs) - (Sum of k-1 smallest pair costs).
  // The constant term weights[0] + weights[n-1] cancels out.

  // Create an array to store the cost associated with each potential cut point.
  // There are n-1 potential cut points (between marble 0&1, 1&2, ..., n-2&n-1).
  // The cost of a cut after index i is weights[i] + weights[i+1].
  const pairCosts: number[] = new Array(n - 1); // Initialize array of size n-1

  // Calculate the cost for each potential cut point.
  for (let i = 0; i < n - 1; ++i) {
    // Store the sum of adjacent weights, representing the cost if a cut is made here.
    pairCosts[i] = weights[i] + weights[i + 1];
  }

  // Sort the costs of all potential cuts in ascending order.
  // This allows us to easily pick the smallest k-1 and largest k-1 costs.
  pairCosts.sort((a, b) => a - b); // Standard numeric sort

  // Initialize sums for the variable parts of the min and max scores.
  let minScoreSum = 0; // Will hold the sum of the k-1 smallest pair costs
  let maxScoreSum = 0; // Will hold the sum of the k-1 largest pair costs

  // Iterate k-1 times to sum the smallest and largest costs.
  // We need to select k-1 cut points.
  for (let i = 0; i < k - 1; ++i) {
    // Add the i-th smallest cost (from the beginning of the sorted array).
    minScoreSum += pairCosts[i];
    // Add the i-th largest cost (from the end of the sorted array).
    // The largest is at index n-2, second largest at n-3, ..., i-th largest at n-2-i.
    maxScoreSum += pairCosts[n - 2 - i];
  }

  // The final result is the difference between the sum of the k-1 largest costs
  // and the sum of the k-1 smallest costs.
  return maxScoreSum - minScoreSum;
}
