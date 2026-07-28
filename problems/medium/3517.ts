/*
3517. Smallest Palindromic Rearrangement I

You are given a palindromic string s.
Return the lexicographically smallest palindromic permutation of s.

Example 1:
Input: s = "z"
Output: "z"
Explanation:
A string of only one character is already the lexicographically smallest palindrome.

Example 2:
Input: s = "babab"
Output: "abbba"
Explanation:
Rearranging "babab" → "abbba" gives the smallest lexicographic palindrome.

Example 3:
Input: s = "daccad"
Output: "acddca"
Explanation:
Rearranging "daccad" → "acddca" gives the smallest lexicographic palindrome.

Constraints:
1 <= s.length <= 10^5
s consists of lowercase English letters.
s is guaranteed to be palindromic.

</> Typescript code:
*/

function smallestPalindrome(s: string): string {
  // Allocate one counter for each lowercase English letter.
  const counts = new Int32Array(26);

  // Count every character in one pass.
  for (let i = 0; i < s.length; ++i) {
    // Map the current lowercase letter to its zero-based counter.
    ++counts[s.charCodeAt(i) - 97];
  }

  // Preallocate the exact output length for symmetric construction.
  const result = new Array<string>(s.length);
  // Track the next unfilled position in the left half.
  let left = 0;

  // Process letters in ascending order to minimize the left half.
  for (let code = 0; code < 26; ++code) {
    // Materialize the current lowercase letter once.
    const char = String.fromCharCode(code + 97);
    // Determine how many mirrored pairs this letter contributes.
    const pairs = counts[code] >> 1;

    // Place every pair at the next symmetric positions.
    for (let i = 0; i < pairs; ++i) {
      // Fill the next position from the left.
      result[left] = char;
      // Mirror the same letter at the matching position from the right.
      result[s.length - 1 - left] = char;
      // Advance to the next unfilled pair of positions.
      ++left;
    }

    // The palindrome guarantee permits at most one odd frequency.
    if ((counts[code] & 1) !== 0) {
      // Put the unpaired letter at the unique center position.
      result[s.length >> 1] = char;
    }
  }

  // Join the completed character array into the required string.
  return result.join("");
}
