/*
2904. Shortest and Lexicographically Smallest Beautiful String

You are given a binary string s and a positive integer k.

A substring of s is beautiful if the number of '1's in it is exactly k.

Let len be the length of the shortest beautiful substring.

Return the lexicographically smallest beautiful substring of string s with length equal to len. If s doesn't contain a beautiful substring, return an empty string.

A string a is lexicographically larger than a string b (of the same length) if in the first position where a and b differ, a has a character strictly larger than the corresponding character in b.

For example, "abcd" is lexicographically larger than "abcc" because the first position they differ is at the fourth character, and d is greater than c.

Example 1:
Input: s = "100011001", k = 3
Output: "11001"
Explanation:
There are 7 beautiful substrings in this example:
1. The substring "[100011]001".
2. The substring "[1000110]01".
3. The substring "[10001100]1".
4. The substring "1[00011001]".
5. The substring "10[0011001]".
6. The substring "100[011001]".
7. The substring "1000[11001]".
The length of the shortest beautiful substring is 5.
The lexicographically smallest beautiful substring with length 5 is the substring "11001".

Example 2:
Input: s = "1011", k = 2
Output: "11"
Explanation:
There are 3 beautiful substrings in this example:
1. The substring "[101]1".
2. The substring "1[011]".
3. The substring "10[11]".
The length of the shortest beautiful substring is 2.
The lexicographically smallest beautiful substring with length 2 is the substring "11".

Example 3:
Input: s = "000", k = 1
Output: ""
Explanation:
There are no beautiful substrings in this example.

Constraints:
1 <= s.length <= 100
1 <= k <= s.length

</> Typescript code:
*/

function shortestBeautifulSubstring(s: string, k: number): string {
  // Cache the input length for both linear passes.
  const n = s.length;
  // Start the minimum-length sliding window at the first character.
  let left = 0;
  // Track the number of ones inside the current window.
  let ones = 0;
  // Use an impossible length until a beautiful window is found.
  let length = n + 1;

  // Extend the right boundary once across the string.
  for (let right = 0; right < n; right++) {
    // Add the new binary digit without allocating a one-character string.
    ones += s.charCodeAt(right) & 1;

    // Shrink every window that already contains exactly k ones.
    while (ones === k) {
      // Retain the shortest beautiful length seen so far.
      length = Math.min(length, right - left + 1);
      // Remove the left digit before advancing the boundary.
      ones -= s.charCodeAt(left++) & 1;
    }
  }

  // Return empty when the entire string contains fewer than k ones.
  if (length > n) return "";

  // Build a mask that retains exactly the chosen window's at-most-100 bits.
  const mask = (1n << BigInt(length)) - 1n;
  // Encode the first fixed-length window as an exact binary integer.
  let value = 0n;
  // Reset the one count for the fixed-length rolling pass.
  ones = 0;

  // Initialize the first window's exact value and population count.
  for (let i = 0; i < length; i++) {
    // Decode the current binary character as zero or one.
    const bit = s.charCodeAt(i) & 1;
    // Append the bit without crossing JavaScript Number's precision limit.
    value = (value << 1n) | BigInt(bit);
    // Add the same bit to the window's one count.
    ones += bit;
  }

  // Leave the best value unset until a beautiful fixed-length window appears.
  let bestValue: bigint | undefined;
  // Remember the start of the smallest qualifying binary value.
  let bestStart = 0;

  // Slide every window of the globally minimum beautiful length.
  for (let start = 0; ; start++) {
    // Equal-length binary strings have the same order as their integer values.
    if (ones === k && (bestValue === undefined || value < bestValue)) {
      // Save the newly smallest exact value.
      bestValue = value;
      // Save its source position for the single final substring allocation.
      bestStart = start;
    }

    // Identify the character that would enter the next window.
    const next = start + length;

    // Stop after evaluating the window ending at the final character.
    if (next === n) break;

    // Update the population count by removing and adding the boundary bits.
    ones += (s.charCodeAt(next) & 1) - (s.charCodeAt(start) & 1);
    // Shift in the entering bit and discard the bit leaving the window.
    value = ((value << 1n) & mask) | BigInt(s.charCodeAt(next) & 1);
  }

  // Materialize the lexicographically smallest shortest beautiful substring.
  return s.slice(bestStart, bestStart + length);
}
