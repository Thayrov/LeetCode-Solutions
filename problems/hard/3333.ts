/*
3333. Find the Original Typed String II

Alice is attempting to type a specific string on her computer. However, she tends to be clumsy and may press a key for too long, resulting in a character being typed multiple times.
You are given a string word, which represents the final output displayed on Alice's screen. You are also given a positive integer k.
Return the total number of possible original strings that Alice might have intended to type, if she was trying to type a string of size at least k.
Since the answer may be very large, return it modulo 109 + 7.

Example 1:
Input: word = "aabbccdd", k = 7
Output: 5
Explanation:
The possible strings are: "aabbccdd", "aabbccd", "aabbcdd", "aabccdd", and "abbccdd".

Example 2:
Input: word = "aabbccdd", k = 8
Output: 1
Explanation:
The only possible string is "aabbccdd".

Example 3:
Input: word = "aaabbb", k = 3
Output: 8

Constraints:
1 <= word.length <= 5 * 10^5
word consists only of lowercase English letters.
1 <= k <= 2000

</> Typescript code:
*/

function possibleStringCount(word: string, k: number): number {
  // Define modulo constant for large number handling
  const MOD = 1000000007;
  const n = word.length;

  // Extract consecutive character groups and their sizes
  const groups: number[] = [];
  for (let i = 0; i < n; ) {
    let j = i;
    // Find the end of current character group
    while (j < n && word[j] === word[i]) j++;
    // Store the group size
    groups.push(j - i);
    i = j;
  }

  const m = groups.length;

  // If k is small enough (≤ number of groups), all combinations are valid
  if (k <= m) {
    let result = 1;
    // Each group contributes its size to total combinations
    for (const groupSize of groups) {
      result = (result * groupSize) % MOD;
    }
    return result;
  }

  // Calculate total number of ways without length constraint
  let totalWays = 1;
  for (const groupSize of groups) {
    totalWays = (totalWays * groupSize) % MOD;
  }

  // DP to count combinations with length < k (invalid ones)
  // dp[j] = number of ways to achieve exactly length j
  let dp = Array(k).fill(0);
  // Base case: empty string has length 0
  dp[0] = 1;

  // Process each group using optimized prefix sum approach
  for (const groupSize of groups) {
    // Build prefix sum array for current dp state
    const prefix = Array(k + 1).fill(0);
    for (let j = 0; j < k; j++) {
      prefix[j + 1] = (prefix[j] + dp[j]) % MOD;
    }

    // Create new DP array for this iteration
    const newDp = Array(k).fill(0);
    for (let j = 1; j < k; j++) {
      // We can take 1 to groupSize characters from current group
      // So we sum dp[j-groupSize] to dp[j-1] (if valid)
      const left = Math.max(0, j - groupSize);
      const right = j - 1;
      if (right >= left) {
        // Use prefix sum for O(1) range sum query
        newDp[j] = (prefix[right + 1] - prefix[left] + MOD) % MOD;
      }
    }

    // Update DP array for next iteration
    dp = newDp;
  }

  // Sum invalid ways (lengths from m to k-1, since minimum is m)
  let invalidWays = 0;
  for (let j = m; j < k; j++) {
    invalidWays = (invalidWays + dp[j]) % MOD;
  }

  // Return total ways minus invalid ways
  return (totalWays - invalidWays + MOD) % MOD;
}
