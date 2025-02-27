/* 
873. Length of Longest Fibonacci Subsequence

A sequence x1, x2, ..., xn is Fibonacci-like if:
n >= 3
xi + xi+1 == xi+2 for all i + 2 <= n
Given a strictly increasing array arr of positive integers forming a sequence, return the length of the longest Fibonacci-like subsequence of arr. If one does not exist, return 0.

A subsequence is derived from another sequence arr by deleting any number of elements (including none) from arr, without changing the order of the remaining elements. For example, [3, 5, 8] is a subsequence of [3, 4, 5, 6, 7, 8].

Example 1:
Input: arr = [1,2,3,4,5,6,7,8]
Output: 5
Explanation: The longest subsequence that is fibonacci-like: [1,2,3,5,8].

Example 2:
Input: arr = [1,3,7,11,12,14,18]
Output: 3
Explanation: The longest subsequence that is fibonacci-like: [1,11,12], [3,11,14] or [7,11,18].

Constraints:
3 <= arr.length <= 1000
1 <= arr[i] < arr[i + 1] <= 10^9

</> Typescript Code:
*/

function lenLongestFibSubseq(arr: number[]): number {
  // Get the length of the input array.
  const n = arr.length;
  // Create a map to store each number's index for O(1) lookups.
  const index = new Map<number, number>();
  // Fill the map with each number in the array.
  for (let i = 0; i < n; i++) {
    index.set(arr[i], i);
  }
  // Initialize a 2D DP array with every pair set to 2.
  // dp[i][j] represents the length of the Fibonacci-like sequence ending with arr[i] and arr[j]
  const dp: number[][] = Array.from({length: n}, () => new Array(n).fill(2));
  // Initialize maxLen to track the maximum sequence length found.
  let maxLen = 0;
  // Iterate over pairs of indices (i, j) with i < j.
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < j; i++) {
      // Calculate the candidate previous Fibonacci number.
      const candidate = arr[j] - arr[i];
      // Since the sequence is strictly increasing, candidate must be less than arr[i].
      // Also, check if this candidate exists in the array.
      if (candidate < arr[i] && index.has(candidate)) {
        // Retrieve the index of the candidate.
        const k = index.get(candidate)!;
        // Update dp for pair (i, j): extend the sequence by one.
        dp[i][j] = dp[k][i] + 1;
        // Update maxLen if a longer valid sequence is found.
        maxLen = Math.max(maxLen, dp[i][j]);
      }
    }
  }
  // If a valid Fibonacci-like subsequence exists (length at least 3), return maxLen, else return 0.
  return maxLen >= 3 ? maxLen : 0;
}
