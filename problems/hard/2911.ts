/*
2911. Minimum Changes to Make K Semi-palindromes

Given a string s and an integer k, partition s into k substrings such that the letter changes needed to make each substring a semi-palindrome are minimized.
Return the minimum number of letter changes required.

A semi-palindrome is a special type of string that can be divided into palindromes based on a repeating pattern. To check if a string is a semi-palindrome:
Choose a positive divisor d of the string's length. d can range from 1 up to, but not including, the string's length. For a string of length 1, it does not have a valid divisor as per this definition, since the only divisor is its length, which is not allowed.
For a given divisor d, divide the string into groups where each group contains characters from the string that follow a repeating pattern of length d. Specifically, the first group consists of characters at positions 1, 1 + d, 1 + 2d, and so on; the second group includes characters at positions 2, 2 + d, 2 + 2d, etc.
The string is considered a semi-palindrome if each of these groups forms a palindrome.

Consider the string "abcabc":
The length of "abcabc" is 6. Valid divisors are 1, 2, and 3.
For d = 1: The entire string "abcabc" forms one group. Not a palindrome.
For d = 2:
Group 1 (positions 1, 3, 5): "acb"
Group 2 (positions 2, 4, 6): "bac"
Neither group forms a palindrome.
For d = 3:
Group 1 (positions 1, 4): "aa"
Group 2 (positions 2, 5): "bb"
Group 3 (positions 3, 6): "cc"
All groups form palindromes. Therefore, "abcabc" is a semi-palindrome.

Example 1:
Input: s = "abcac", k = 2
Output: 1
Explanation: Divide s into "ab" and "cac". "cac" is already semi-palindrome. Change "ab" to "aa", it becomes semi-palindrome with d = 1.

Example 2:
Input: s = "abcdef", k = 2
Output: 2
Explanation: Divide s into substrings "abc" and "def". Each needs one change to become semi-palindrome.

Example 3:
Input: s = "aabbaa", k = 3
Output: 0
Explanation: Divide s into substrings "aa", "bb" and "aa". All are already semi-palindromes.

Constraints:
2 <= s.length <= 200
1 <= k <= s.length / 2
s contains only lowercase English letters.

</> Typescript code:
*/

// Minimize changes across exactly k valid substrings.
function minimumChanges(s: string, k: number): number {
  // Cache the input length.
  const n = s.length;
  // Include exclusive endpoints in flattened tables.
  const width = n + 1;
  // Allocate one cell per endpoint pair.
  const size = width * width;
  // Store diagonal mismatch prefixes, each at most 200.
  const mismatch = new Uint8Array(size);
  // Mark unknown substring costs with an unreachable byte sentinel.
  const cost = new Uint8Array(size).fill(255);
  // Reuse fixed-divisor costs; valid costs never exceed 100.
  const inner = new Uint8Array(size);
  // Visit each first character in increasing prefix order.
  for (let left = 0; left < n; left++) {
    // Compare against every later character.
    for (let right = left + 1; right < n; right++) {
      // Extend the diagonal prefix by this mismatched pair.
      mismatch[(left + 1) * width + right + 1] =
        mismatch[left * width + right] + Number(s[left] !== s[right]);
    }
  }
  // Reserve at least two characters for every other part.
  const maxLength = n - 2 * (k - 1);
  // Enumerate every possible proper divisor.
  for (let d = 1; d * 2 <= maxLength; d++) {
    // Process divisible lengths after their shorter interiors.
    for (let length = d * 2; length <= maxLength; length += d) {
      // Slide this substring length across the input.
      for (let left = 0; left + length <= n; left++) {
        // Compute the exclusive right endpoint.
        const right = left + length;
        // Flatten the substring endpoints.
        const index = left * width + right;
        // Count outer-block mismatches and reuse interiors with at least two blocks.
        const changes = mismatch[(left + d) * width + right] -
          mismatch[left * width + right - d] +
          (length >= d * 4 ? inner[(left + d) * width + right - d] : 0);
        // Save this divisor's result for longer substrings.
        inner[index] = changes;
        // Retain the cheapest divisor for this substring.
        if (changes < cost[index]) cost[index] = changes;
      }
    }
  }
  // Initialize unreachable prefix states for the preceding partition count.
  let previous = new Uint8Array(width).fill(255);
  // Allocate the reusable next partition row.
  let current = new Uint8Array(width);
  // An empty prefix needs zero changes and zero parts.
  previous[0] = 0;
  // Add exactly one valid substring per DP layer.
  for (let parts = 1; parts <= k; parts++) {
    // Clear states left over from the recycled row.
    current.fill(255);
    // Leave enough characters for the remaining parts.
    const limit = n - 2 * (k - parts);
    // Skip prefixes too short for the current partition count.
    for (let end = parts * 2; end <= limit; end++) {
      // Start with an unreachable partition cost.
      let best = 255;
      // Try every split leaving at least two characters in the final part.
      for (let start = (parts - 1) * 2; start <= end - 2; start++) {
        // Append the optimal semi-palindrome ending at this endpoint.
        const candidate = previous[start] + cost[start * width + end];
        // Keep the cheapest complete prefix partition.
        if (candidate < best) best = candidate;
        // Zero is the global lower bound for this state.
        if (best === 0) break;
      }
      // Store the minimum for this prefix and partition count.
      current[end] = best;
    }
    // Preserve the old buffer for recycling.
    const swap = previous;
    // Advance to the newly completed partition layer.
    previous = current;
    // Reuse the obsolete layer without allocating.
    current = swap;
  }
  // Read the full-string optimum after exactly k layers.
  return previous[n];
}
