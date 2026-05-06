/*
91. Decode Ways

A message containing letters from A-Z can be encoded into numbers using the following mapping:
'A' -> "1"
'B' -> "2"
...
'Z' -> "26"
To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, "11106" can be mapped into:
"AAJF" with the grouping (1 1 10 6)
"KJF" with the grouping (11 10 6)
Note that the grouping (1 11 06) is invalid because "06" cannot be mapped into 'F' since "6" is different from "06".
Given a string s containing only digits, return the number of ways to decode it.
The test cases are generated so that the answer fits in a 32-bit integer.

Example 1:
Input: s = "12"
Output: 2
Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).

Example 2:
Input: s = "226"
Output: 3
Explanation: "226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).

Example 3:
Input: s = "06"
Output: 0
Explanation: "06" cannot be mapped to "F" because of the leading zero ("6" is different from "06").

Constraints:
1 <= s.length <= 100
s contains only digits and may contain leading zero(s).

</> Typescript Code:
*/

function numDecodings(s: string): number {
  // If the string is empty or starts with '0', there are no valid decodings.
  if (s.length === 0 || s[0] === "0") {
    return 0;
  }

  // dp array to store the number of ways to decode up to the ith character
  let dp = new Array(s.length + 1).fill(0);
  dp[0] = 1; // Base case: one way to decode an empty string
  dp[1] = s[0] !== "0" ? 1 : 0; // There is one way if the first character is not '0', otherwise 0 ways

  // Iterate over the string starting from the second character
  for (let i = 2; i <= s.length; i++) {
    // Check if the single digit is valid (not '0')
    if (s[i - 1] !== "0") {
      // If valid, the number of ways to decode it is the same as the previous character
      dp[i] += dp[i - 1];
    }

    // Check if the two digits form a valid number between 10 and 26
    const twoDigit = parseInt(s.substring(i - 2, i), 10);
    if (twoDigit >= 10 && twoDigit <= 26) {
      // If valid, add the number of ways to decode the string up to two characters before
      dp[i] += dp[i - 2];
    }
  }

  // The total number of ways to decode the entire string is stored in dp[s.length]
  return dp[s.length];
}