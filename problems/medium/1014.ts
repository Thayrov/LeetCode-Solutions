/* 
1014. Best Sightseeing Pair

You are given an integer array values where values[i] represents the value of the ith sightseeing spot. Two sightseeing spots i and j have a distance j - i between them.

The score of a pair (i < j) of sightseeing spots is values[i] + values[j] + i - j: the sum of the values of the sightseeing spots, minus the distance between them.

Return the maximum score of a pair of sightseeing spots.

Example 1:
Input: values = [8,1,5,2,6]
Output: 11
Explanation: i = 0, j = 2, values[i] + values[j] + i - j = 8 + 5 + 0 - 2 = 11

Example 2:
Input: values = [1,2]
Output: 2

Constraints:
2 <= values.length <= 5 * 10^4
1 <= values[i] <= 1000

</> Typescript Code:
*/

function maxScoreSightseeingPair(values: number[]): number {
  // Keep track of the highest score found so far
  let maxSum = -Infinity;
  // Store the best adjusted value from previous spots: values[i] + i
  let best = values[0];

  // Traverse all spots from the second onward
  for (let i = 1; i < values.length; i++) {
    // Calculate current score using best from earlier
    const score = best + values[i] - i;
    // Update the maximum score if this is better
    if (score > maxSum) maxSum = score;
    // Prepare for subsequent spots by updating best if current is better
    const candidate = values[i] + i;
    if (candidate > best) best = candidate;
  }
  // Return the highest score obtained
  return maxSum;
}
