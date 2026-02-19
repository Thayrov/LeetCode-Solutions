/*
696. Count Binary Substrings

Given a binary string s, return the number of non-empty substrings that have the same number of 0's and 1's, and all the 0's and all the 1's in these substrings are grouped consecutively.
Substrings that occur multiple times are counted the number of times they occur.

Example 1:
Input: s = "00110011"
Output: 6
Explanation: There are 6 substrings that have equal number of consecutive 1's and 0's: "0011", "01", "1100", "10", "0011", and "01".
Notice that some of these substrings repeat and are counted the number of times they occur.
Also, "00110011" is not a valid substring because all the 0's (and 1's) are not grouped together.

Example 2:
Input: s = "10101"
Output: 4
Explanation: There are 4 substrings: "10", "01", "10", "01" that have equal number of consecutive 1's and 0's.

Constraints:
1 <= s.length <= 10^5
s[i] is either '0' or '1'.

</> Typescript code:
*/

function countBinarySubstrings(s: string): number {
  // Early return for strings too short to have valid substrings
  if (s.length < 2) return 0;

  // Build array of consecutive character group lengths
  const groups: number[] = [];
  let currentChar = s[0];
  let currentCount = 1;

  // First pass: group consecutive 0s/1s
  for (let i = 1; i < s.length; i++) {
    if (s[i] === currentChar) {
      currentCount++; // Increment current group count
    } else {
      groups.push(currentCount); // Store completed group
      currentChar = s[i]; // Reset for new group
      currentCount = 1;
    }
  }
  groups.push(currentCount); // Add last group

  // Second pass: count valid substrings between adjacent groups
  let result = 0;
  for (let i = 0; i < groups.length - 1; i++) {
    // Each adjacent pair contributes min(a,b) valid substrings
    result += Math.min(groups[i], groups[i + 1]);
  }
  return result;
}
