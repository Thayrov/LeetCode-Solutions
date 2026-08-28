/*
3734. Lexicographically Smallest Palindromic Permutation Greater Than Target

You are given two strings s and target, each of length n, consisting of lowercase English letters.

Return the lexicographically smallest string that is both a palindromic permutation of s and strictly greater than target. If no such permutation exists, return an empty string.

Example 1:
Input: s = "baba", target = "abba"
Output: "baab"
Explanation:
The palindromic permutations of s (in lexicographical order) are "abba" and "baab".
The lexicographically smallest permutation that is strictly greater than target is "baab".

Example 2:
Input: s = "baba", target = "bbaa"
Output: ""
Explanation:
The palindromic permutations of s (in lexicographical order) are "abba" and "baab".
None of them is lexicographically strictly greater than target. Therefore, the answer is "".

Example 3:
Input: s = "abc", target = "abb"
Output: ""
Explanation:
s has no palindromic permutations. Therefore, the answer is "".

Example 4:
Input: s = "aac", target = "abb"
Output: "aca"
Explanation:
The only palindromic permutation of s is "aca".
"aca" is strictly greater than target. Therefore, the answer is "aca".

Constraints:
1 <= n == s.length == target.length <= 300
s and target consist of only lowercase English letters.

</> Typescript code:
*/

function lexPalindromicPermutation(s: string, target: string): string {
  // Cache the full and mirrored-half lengths.
  const n = s.length,
    halfLength = n >> 1;
  // Allocate fixed-alphabet multiplicity storage.
  const counts = new Int16Array(26);

  // Count every source character by zero-based alphabet index.
  for (let i = 0; i < n; ++i) ++counts[s.charCodeAt(i) - 97];

  // Track the unique possible middle character and total odd multiplicities.
  let middle = -1,
    oddCount = 0;

  // Validate parity while converting full counts into first-half counts.
  for (let character = 0; character < 26; ++character) {
    // Record each character whose unmatched copy would occupy the center.
    if ((counts[character] & 1) !== 0) {
      // Save the current odd character index.
      middle = character;
      // Count odd multiplicities to detect impossible palindromes.
      ++oddCount;
    }
    // Retain one copy per mirrored pair for first-half construction.
    counts[character] >>= 1;
  }

  // Reject parity patterns that cannot form a palindrome of this length.
  if (oddCount !== (n & 1)) return "";

  // Store numeric character indices for the palindrome's decisive first half.
  const left = new Uint8Array(halfLength);

  // Mirror the selected first half around the fixed optional center.
  const buildPalindrome = (): string => {
    // Allocate the exact output slots once per completed candidate.
    const result = new Array<string>(n);

    // Write every selected character to its symmetric pair of positions.
    for (let i = 0; i < halfLength; ++i) {
      // Convert the compact alphabet index into its lowercase character.
      const character = String.fromCharCode(left[i] + 97);
      // Place the character in the first half.
      result[i] = character;
      // Mirror the character into the second half.
      result[n - 1 - i] = character;
    }

    // Fill the center only for a valid odd-length palindrome.
    if (middle >= 0) result[halfLength] = String.fromCharCode(middle + 97);

    // Join the populated slots into the evaluator's required string result.
    return result.join("");
  };

  // Mark the next first-half position that must match the target prefix.
  let position = 0;

  // Preserve the longest feasible exact prefix to postpone any increase.
  while (position < halfLength) {
    // Map the target character at this position to its count bucket.
    const character = target.charCodeAt(position) - 97;

    // Stop where the remaining multiset cannot continue the exact prefix.
    if (counts[character] === 0) break;

    // Commit the exact target character at the current position.
    left[position] = character;
    // Consume its available first-half copy.
    --counts[character];
    // Advance to the next prefix position.
    ++position;
  }

  // Handle the only case whose first half exactly equals the target's first half.
  if (position === halfLength) {
    // Form the palindrome to compare its center and mirrored suffix with target.
    const candidate = buildPalindrome();

    // Return it when those remaining positions make it strictly greater.
    if (candidate > target) return candidate;
  }

  // Backtrack until one position can take the smallest available larger character.
  while (position >= 0) {
    // Search only when the current position lies inside the first half.
    if (position < halfLength) {
      // Read the character that must be exceeded after the equal prefix.
      const targetCharacter = target.charCodeAt(position) - 97;

      // Try larger letters in ascending order to minimize the decisive difference.
      for (let character = targetCharacter + 1; character < 26; ++character) {
        // Skip unavailable first-half characters.
        if (counts[character] === 0) continue;

        // Place the smallest feasible character greater than the target's.
        left[position] = character;
        // Remove that decisive copy from the remaining multiset.
        --counts[character];

        // Start the suffix immediately after the decisive position.
        let write = position + 1;

        // Append all remaining characters in sorted order for minimality.
        for (let suffixCharacter = 0; suffixCharacter < 26; ++suffixCharacter) {
          // Copy the bucket size without mutating counts during final assembly.
          let repetitions = counts[suffixCharacter];

          // Emit every remaining copy of this suffix character.
          while (repetitions-- > 0) left[write++] = suffixCharacter;
        }

        // Mirror the minimal valid first half into the final answer.
        return buildPalindrome();
      }
    }

    // Exhaustion at the first position proves no greater permutation exists.
    if (position === 0) break;

    // Move back to reconsider the previous exact-prefix position.
    --position;
    // Restore its character so a larger replacement can use the full suffix multiset.
    ++counts[left[position]];
  }

  // Report that every palindromic permutation is at most the target.
  return "";
}
