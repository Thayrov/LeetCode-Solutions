/*
940. Distinct Subsequences II

Given a string s, return the number of distinct non-empty subsequences of s. Since the answer may be very large, return it modulo 10^9 + 7.

A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not.

Example 1:
Input: s = "abc"
Output: 7
Explanation: The 7 distinct subsequences are "a", "b", "c", "ab", "ac", "bc", and "abc".

Example 2:
Input: s = "aba"
Output: 6
Explanation: The 6 distinct subsequences are "a", "b", "ab", "aa", "ba", and "aba".

Example 3:
Input: s = "aaa"
Output: 3
Explanation: The 3 distinct subsequences are "a", "aa" and "aaa".

Constraints:
1 <= s.length <= 2000
s consists of lowercase English letters.

</> Typescript code:
*/

function distinctSubseqII(s: string): number {
  // Define the required modulus for all subsequence counts.
  const MOD = 1_000_000_007;
  // Store the total count from immediately before each letter's previous occurrence.
  const last = new Float64Array(26);
  // Count the empty subsequence before processing any characters.
  let total = 1;

  // Extend every distinct subsequence with each character from left to right.
  for (let i = 0; i < s.length; ++i) {
    // Map the current lowercase letter to its fixed-array slot.
    const letter = s.charCodeAt(i) - 97;
    // Preserve the current total for this letter's next occurrence.
    const previous = total;
    // Double the set, then remove subsequences duplicated by this letter's prior occurrence.
    total = (total + total - last[letter]) % MOD;
    // Normalize JavaScript's possibly negative remainder into the modular range.
    if (total < 0) total += MOD;
    // Record the prefix count responsible for duplicates at the next same letter.
    last[letter] = previous;
  }

  // Exclude the empty subsequence and return a normalized modular result.
  return (total + MOD - 1) % MOD;
}
