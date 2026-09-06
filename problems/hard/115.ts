/*
115. Distinct Subsequences

Given two strings s and t, return the number of distinct subsequences of s which equals t.

The test cases are generated so that the answer fits on a 32-bit signed integer.

Example 1:
Input: s = "rabbbit", t = "rabbit"
Output: 3
Explanation:
As shown below, there are 3 ways you can generate "rabbit" from s.

rabbbit
rabbbit
rabbbit

Example 2:
Input: s = "babgbag", t = "bag"
Output: 5
Explanation:
As shown below, there are 5 ways you can generate "bag" from s.

babgbag
babgbag
babgbag
babgbag
babgbag

Constraints:
1 <= s.length, t.length <= 1000
s and t consist of English letters.

</> Typescript code:
*/

// Count the subsequences of s that equal t.
function numDistinct(s: string, t: string): number {
  // Cache both lengths for bounded loops and the impossible-length check.
  const n = s.length,
    m = t.length;

  // A longer target cannot be a subsequence of the source.
  if (m > n) return 0;

  // Group target indices by their ASCII character to skip mismatching states.
  const positions: number[][] = Array.from({ length: 128 }, () => []);
  // Record each target position in increasing order.
  for (let j = 0; j < m; ++j) positions[t.charCodeAt(j)].push(j);

  // Store counts for every target-prefix length in one reusable row.
  const dp = new Float64Array(m + 1);
  // The empty target occurs once in every processed source prefix.
  dp[0] = 1;

  // Consume source characters from left to right.
  for (let i = 0; i < n; ++i) {
    // Visit only target positions matching the current source character.
    const matches = positions[s.charCodeAt(i)];
    // Start at the rightmost matching position.
    let k = matches.length - 1;
    // Skip target prefixes that are longer than the processed source prefix.
    while (k >= 0 && matches[k] > i) --k;
    // Update right to left so every transition reads the previous DP row.
    for (; k >= 0; --k) {
      // Select the target position extended by this source character.
      const j = matches[k];
      // Add all ways to form the preceding target prefix.
      dp[j + 1] += dp[j];
    }
  }

  // Return the count for the complete target.
  return dp[m];
}
