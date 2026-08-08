/*
3302. Find the Lexicographically Smallest Valid Sequence

You are given two strings word1 and word2.

A string x is called almost equal to y if you can change at most one character in x to make it identical to y.

A sequence of indices seq is called valid if:
The indices are sorted in ascending order.
Concatenating the characters at these indices in word1 in the same order results in a string that is almost equal to word2.

Return an array of size word2.length representing the lexicographically smallest valid sequence of indices. If no such sequence of indices exists, return an empty array.

Note that the answer must represent the lexicographically smallest array, not the corresponding string formed by those indices.

Example 1:
Input: word1 = "vbcca", word2 = "abc"
Output: [0,1,2]
Explanation:
The lexicographically smallest valid sequence of indices is [0, 1, 2]:
Change word1[0] to 'a'.
word1[1] is already 'b'.
word1[2] is already 'c'.

Example 2:
Input: word1 = "bacdc", word2 = "abc"
Output: [1,2,4]
Explanation:
The lexicographically smallest valid sequence of indices is [1, 2, 4]:
word1[1] is already 'a'.
Change word1[2] to 'b'.
word1[4] is already 'c'.

Example 3:
Input: word1 = "aaaaaa", word2 = "aaabc"
Output: []
Explanation:
There is no valid sequence of indices.

Example 4:
Input: word1 = "abc", word2 = "ab"
Output: [0,1]

Constraints:
1 <= word2.length < word1.length <= 3 * 10^5
word1 and word2 consist only of lowercase English letters.

</> Typescript code:
*/

function validSequence(word1: string, word2: string): number[] {
  // Cache both lengths for the two linear scans.
  const n = word1.length;
  const m = word2.length;
  // Reuse the required output as the suffix-feasibility storage.
  const answer = new Array<number>(m);

  // Start with the final target character.
  let j = m - 1;
  // Greedily place each target suffix character as far right as possible.
  for (let i = n - 1; i >= 0 && j >= 0; --i) {
    // Record the latest feasible position for this suffix character.
    if (word1.charCodeAt(i) === word2.charCodeAt(j)) {
      // Advance toward the start of the target after recording the match.
      answer[j--] = i;
    }
  }

  // Track the next target position needed by the forward construction.
  let k = 0;
  // Track whether the single permitted character change has been consumed.
  let changed = false;

  // Scan source indices in ascending order to minimize the answer lexicographically.
  for (let i = 0; i < n && k < m; ++i) {
    // Always take the earliest exact match.
    if (word1.charCodeAt(i) === word2.charCodeAt(k)) {
      // Overwrite the no-longer-needed suffix slot with the chosen index.
      answer[k++] = i;
    // Take the earliest mismatch only when the remaining suffix still fits afterward.
    } else if (!changed && (k === m - 1 || answer[k + 1] > i)) {
      // Store the index used for the sole changed character.
      answer[k++] = i;
      // Require exact matches for every remaining target character.
      changed = true;
    }
  }

  // Return the completed sequence, or empty when all target positions were unreachable.
  return k === m ? answer : [];
}
