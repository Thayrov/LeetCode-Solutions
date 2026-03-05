/* 1758. Minimum Changes To Make Alternating Binary String

You are given a string s consisting only of the characters '0' and '1'. In one operation, you can change any '0' to '1' or vice versa.
The string is called alternating if no two adjacent characters are equal. For example, the string "010" is alternating, while the string "0100" is not.
Return the minimum number of operations needed to make s alternating.

Example 1:
Input: s = "0100"
Output: 1
Explanation: If you change the last character to '1', s will be "0101", which is alternating.

Example 2:
Input: s = "10"
Output: 0
Explanation: s is already alternating.

Example 3:
Input: s = "1111"
Output: 2
Explanation: You need two operations to reach "0101" or "1010".

Constraints:
1 <= s.length <= 10^4
s[i] is either '0' or '1'.

</> Typescript Code:
*/

function minOperationsBT(s: string): number {
  // Initialize two counters to track mismatches with the two possible alternating patterns
  let count1 = 0; // Count mismatches for pattern '0101...'
  let count2 = 0; // Count mismatches for pattern '1010...'

  // Loop through each character of the string
  for (let i = 0; i < s.length; i++) {
    // Check if the current index is even
    if (i % 2 === 0) {
      // If the character at the even index is '1', it mismatches with '0101...' pattern
      if (s[i] === "1") {
        count1++; // Increment count1 for pattern '0101...'
      } else {
        // Otherwise, it mismatches with '1010...' pattern
        count2++; // Increment count2 for pattern '1010...'
      }
    } else {
      // If the current index is odd
      // If the character at the odd index is '0', it mismatches with '0101...' pattern
      if (s[i] === "0") {
        count1++; // Increment count1 for pattern '0101...'
      } else {
        // Otherwise, it mismatches with '1010...' pattern
        count2++; // Increment count2 for pattern '1010...'
      }
    }
  }

  // Finally, return the minimum of the two mismatch counts
  // This represents the minimum number of changes needed to make the string alternating
  return Math.min(count1, count2);
}
