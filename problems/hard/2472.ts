/*
2472. Maximum Number of Non-overlapping Palindrome Substrings

You are given a string s and a positive integer k.

Select a set of non-overlapping substrings from the string s that satisfy the following conditions:

- The length of each substring is at least k.
- Each substring is a palindrome.

Return the maximum number of substrings in an optimal selection. A substring is a contiguous sequence of characters within the string.

Example 1:
Input: s = "abaccdbbd", k = 3
Output: 2
Explanation: We can select the substrings underlined in s = "aba cc dbbd". Both "aba" and "dbbd" are palindromes and have a length of at least k = 3.
It can be shown that we cannot find a selection with more than two valid substrings.

Example 2:
Input: s = "adbcda", k = 2
Output: 0
Explanation: There is no palindrome substring of length at least 2 in the string.

Constraints:
- 1 <= k <= s.length <= 2000
- s consists of lowercase English letters.

Hint 1: Try to use dynamic programming to solve the problem.
Hint 2: let dp[i] be the answer for the prefix s[0…i].
Hint 3: The final answer to the problem will be dp[n-1]. How do you compute this dp?

</> Typescript code:
*/

function maxPalindromes(s: string, k: number): number {
  // Cache the string length for the radius arrays and prefix dynamic programming.
  const n = s.length;
  // Store the radius of the longest odd-length palindrome centered at each index.
  const odd = new Int32Array(n);
  // Expand odd-length palindromes while reusing the current rightmost palindrome.
  for (let i = 0, left = 0, right = -1; i < n; i++) {
    // Initialize the radius from the mirrored center when it is inside the known range.
    let radius = i > right ? 1 : Math.min(odd[left + right - i], right - i + 1);
    // Extend the candidate palindrome while mirrored characters match.
    while (i - radius >= 0 && i + radius < n && s[i - radius] === s[i + radius]) radius++;
    // Save the maximal odd radius for this center.
    odd[i] = radius;
    // Update the rightmost known odd palindrome when this one extends farther.
    if (i + radius - 1 > right) {
      // Record the left boundary of the new rightmost palindrome.
      left = i - radius + 1;
      // Record the right boundary of the new rightmost palindrome.
      right = i + radius - 1;
    }
  }
  // Store the radius of the longest even-length palindrome ending before each index.
  const even = new Int32Array(n);
  // Expand even-length palindromes while reusing the current rightmost palindrome.
  for (let i = 0, left = 0, right = -1; i < n; i++) {
    // Initialize the radius from the mirrored even center when it is inside the known range.
    let radius = i > right ? 0 : Math.min(even[left + right - i + 1], right - i + 1);
    // Extend the candidate palindrome while mirrored characters match.
    while (i - radius - 1 >= 0 && i + radius < n && s[i - radius - 1] === s[i + radius]) radius++;
    // Save the maximal even radius for this right-side center.
    even[i] = radius;
    // Update the rightmost known even palindrome when this one extends farther.
    if (i + radius - 1 > right) {
      // Record the left boundary of the new rightmost palindrome.
      left = i - radius;
      // Record the right boundary of the new rightmost palindrome.
      right = i + radius - 1;
    }
  }
  // Let dp[end] be the maximum valid substring count in the first end characters.
  const dp = new Int32Array(n + 1);
  // Finalize prefix states in increasing end order so every dp[start] is ready.
  for (let end = 1; end <= n; end++) {
    // Carry forward the best count when no substring ends at end - 1.
    let best = dp[end - 1];
    // Try every start that leaves a substring of at least the required length.
    for (let start = 0; start <= end - k; start++) {
      // Compute the candidate substring length from its half-open boundaries.
      const length = end - start;
      // Track whether the candidate is a palindrome using the precomputed radius.
      let palindrome;
      // Use the odd-radius table for odd-length candidates.
      if (length & 1) {
        // Locate the center of the odd-length candidate.
        const center = (start + end - 1) >> 1;
        // The candidate is valid when its required radius fits within the stored radius.
        palindrome = ((length + 1) >> 1) <= odd[center];
      } else {
        // Locate the right-side center of the even-length candidate.
        const center = (start + end) >> 1;
        // The candidate is valid when its required radius fits within the stored radius.
        palindrome = (length >> 1) <= even[center];
      }
      // Add this non-overlapping candidate when it improves the prefix optimum.
      if (palindrome && dp[start] + 1 > best) best = dp[start] + 1;
    }
    // Commit the best count for the prefix ending at this position.
    dp[end] = best;
  }
  // Return the optimum for the complete string.
  return dp[n];
}
