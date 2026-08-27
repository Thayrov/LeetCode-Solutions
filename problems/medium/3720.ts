/*
3720. Lexicographically Smallest Permutation Greater Than Target

You are given two strings s and target, both having length n, consisting of lowercase English letters.

Return the lexicographically smallest permutation of s that is strictly greater than target. If no permutation of s is lexicographically strictly greater than target, return an empty string.

A string a is lexicographically strictly greater than a string b (of the same length) if in the first position where a and b differ, string a has a letter that appears later in the alphabet than the corresponding letter in b.

Example 1:
Input: s = "abc", target = "bba"
Output: "bca"
Explanation:
The permutations of s (in lexicographical order) are "abc", "acb", "bac", "bca", "cab", and "cba".
The lexicographically smallest permutation that is strictly greater than target is "bca".

Example 2:
Input: s = "leet", target = "code"
Output: "eelt"
Explanation:
The permutations of s (in lexicographical order) are "eelt", "eetl", "elet", "elte", "etel", "etle", "leet", "lete", "ltee", "teel", "tele", and "tlee".
The lexicographically smallest permutation that is strictly greater than target is "eelt".

Example 3:
Input: s = "baba", target = "bbaa"
Output: ""
Explanation:
The permutations of s (in lexicographical order) are "aabb", "abab", "abba", "baab", "baba", and "bbaa".
None of them is lexicographically strictly greater than target. Therefore, the answer is "".

Constraints:
1 <= s.length == target.length <= 300
s and target consist of only lowercase English letters.

</> Typescript code:
*/

function lexGreaterPermutation(s: string, target: string): string {
  // Store the remaining multiplicity of every lowercase letter.
  const counts = new Int16Array(26);

  // Count every letter available in the source multiset.
  for (let i = 0; i < s.length; i++) {
    // Map the current lowercase letter to its zero-based alphabet index.
    counts[s.charCodeAt(i) - 97]++;
  }

  // Track the longest target prefix that the multiset can match exactly.
  let matched = 0;

  // Consume target letters while an exact-prefix continuation is possible.
  while (matched < target.length) {
    // Convert the next target letter to its alphabet index.
    const letter = target.charCodeAt(matched) - 97;

    // Stop at the first target letter unavailable in the remaining multiset.
    if (counts[letter] === 0) {
      break;
    }

    // Reserve this letter for the exact target prefix.
    counts[letter]--;
    // Advance the matched-prefix boundary.
    matched++;
  }

  // Try to increase the latest feasible position, restoring matched letters while backtracking.
  for (let position = matched; position >= 0; position--) {
    // Return the current matched letter to the multiset when moving the bump left.
    if (position < matched) {
      counts[target.charCodeAt(position) - 97]++;
    }

    // Skip the position after the string when the whole target was matched.
    if (position === target.length) {
      continue;
    }

    // Record the target letter that must be exceeded at this position.
    const current = target.charCodeAt(position) - 97;

    // Search alphabetically for the smallest available strictly larger letter.
    for (let letter = current + 1; letter < 26; letter++) {
      // Ignore letters absent from the remaining multiset.
      if (counts[letter] === 0) {
        continue;
      }

      // Keep the exact prefix and place the minimal feasible larger letter.
      let answer = target.slice(0, position) + String.fromCharCode(letter + 97);
      // Consume the letter that makes the permutation strictly greater.
      counts[letter]--;

      // Append all leftover letters in ascending order to minimize the suffix.
      for (let remaining = 0; remaining < 26; remaining++) {
        // Emit every remaining copy of the current alphabet letter.
        answer += String.fromCharCode(remaining + 97).repeat(counts[remaining]);
      }

      // Return the first construction, which is globally lexicographically minimal.
      return answer;
    }
  }

  // Report that even the greatest permutation cannot exceed the target.
  return "";
}
