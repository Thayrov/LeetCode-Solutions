/*
3498. Reverse Degree of a String

Given a string s, calculate its reverse degree.

The reverse degree is calculated as follows:

For each character, multiply its position in the reversed alphabet ('a' = 26, 'b' = 25, ..., 'z' = 1) with its position in the string (1-indexed).
Sum these products for all characters in the string.
Return the reverse degree of s.

Example 1:
Input: s = "abc"
Output: 148
Explanation:
'a' has reverse value 26 at position 1: 26 * 1 = 26.
'b' has reverse value 25 at position 2: 25 * 2 = 50.
'c' has reverse value 24 at position 3: 24 * 3 = 72.
The reversed degree is 26 + 50 + 72 = 148.

Example 2:
Input: s = "zaza"
Output: 160
Explanation:
'z' has reverse value 1 at position 1: 1 * 1 = 1.
'a' has reverse value 26 at position 2: 26 * 2 = 52.
'z' has reverse value 1 at position 3: 1 * 3 = 3.
'a' has reverse value 26 at position 4: 26 * 4 = 104.
The reverse degree is 1 + 52 + 3 + 104 = 160.

Constraints:
1 <= s.length <= 1000
s contains only lowercase English letters.

</> Typescript code:
*/

function reverseDegree(s: string): number {
  // Accumulate weighted reverse-degree sum.
  let total = 0;
  // Cache input length to avoid repeated property lookups.
  const n = s.length;
  // Scan each character once with 0-based index.
  for (let i = 0; i < n; i++) {
    // Map 'a'-'z' to 26-1 via 123 - charCode, weight by 1-based position.
    total += (123 - s.charCodeAt(i)) * (i + 1);
  }
  // Return total reverse degree.
  return total;
}
