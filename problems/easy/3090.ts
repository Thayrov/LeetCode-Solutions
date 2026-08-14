/*
3090. Maximum Length Substring With Two Occurrences

Given a string s, return the maximum length of a substring such that it contains at most two occurrences of each character.

A substring is a contiguous non-empty sequence of characters within a string.

Example 1:
Input: s = "bcbbbcba"
Output: 4
Explanation:
The substring "bcba" has a length of 4 and contains at most two occurrences of each character.

Example 2:
Input: s = "aaaa"
Output: 2
Explanation:
The substring "aa" has a length of 2 and contains at most two occurrences of each character.

Constraints:
2 <= s.length <= 100
s consists only of lowercase English letters.

</> Typescript code:
*/

function maximumLengthSubstring(s: string): number {
  // Store the current window frequency of every lowercase letter.
  const frequency = new Uint8Array(26);
  // Start the sliding window at the first character.
  let left = 0;
  // Preserve the greatest valid window length found so far.
  let best = 0;

  // Extend the window through every possible right endpoint.
  for (let right = 0; right < s.length; right++) {
    // Map the newly included lowercase letter to its compact array slot.
    const index = s.charCodeAt(right) - 97;
    // Count the new occurrence inside the active window.
    frequency[index]++;

    // Remove the shortest prefix needed when this letter occurs three times.
    while (frequency[index] === 3) {
      // Decrement the departing letter and advance the left boundary.
      frequency[s.charCodeAt(left++) - 97]--;
    }

    // Measure the valid window ending at the current right boundary.
    const length = right - left + 1;
    // Retain the longest valid window encountered.
    if (length > best) best = length;
  }

  // Return the maximum valid substring length.
  return best;
}
