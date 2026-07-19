/*
1081. Smallest Subsequence of Distinct Characters

Given a string s, return the lexicographically smallest subsequence of s that contains all the distinct characters of s exactly once.

Example 1:
Input: s = "bcabc"
Output: "abc"

Example 2:
Input: s = "cbacdcbc"
Output: "acdb"

Constraints:
1 <= s.length <= 1000
s consists of lowercase English letters.

Note:
This question is the same as 316: https://leetcode.com/problems/remove-duplicate-letters/

</> Typescript code:
*/

function smallestSubsequence(s: string): string {
  // Store the final index of every lowercase letter.
  const last = new Int16Array(26);
  // Scan the string once to populate final occurrences.
  for (let i = 0; i < s.length; ++i) {
    // Map the current letter to its compact alphabet index.
    last[s.charCodeAt(i) - 97] = i;
  }

  // Maintain the lexicographically minimal feasible character stack.
  const stack: number[] = [];
  // Track stack membership with one bit per lowercase letter.
  let used = 0;

  // Process every character in original subsequence order.
  for (let i = 0; i < s.length; ++i) {
    // Convert the current letter to an integer in [0, 25].
    const code = s.charCodeAt(i) - 97;
    // Isolate the current letter's membership bit.
    const bit = 1 << code;

    // Skip letters already included exactly once in the stack.
    if ((used & bit) !== 0) {
      // Preserve the existing earlier occurrence.
      continue;
    }

    // Remove larger suffix letters that can still be selected later.
    while (
      stack.length > 0 &&
      stack[stack.length - 1] > code &&
      last[stack[stack.length - 1]] > i
    ) {
      // Clear the popped letter's membership bit for its later occurrence.
      used ^= 1 << stack.pop()!;
    }

    // Append the current letter to the feasible subsequence.
    stack.push(code);
    // Mark the current letter as included.
    used |= bit;
  }

  // Build the answer from at most 26 selected character codes.
  let answer = "";
  // Convert each selected alphabet index back to a character.
  for (const code of stack) {
    // Append the selected character in stack order.
    answer += String.fromCharCode(code + 97);
  }
  // Return the smallest valid distinct-character subsequence.
  return answer;
}
