/* 
1422. Maximum Score After Splitting a String

Given a string s of zeros and ones, return the maximum score after splitting the string into two non-empty substrings (i.e. left substring and right substring).

The score after splitting a string is the number of zeros in the left substring plus the number of ones in the right substring.

Example 1:
Input: s = "011101"
Output: 5 
Explanation: 
All possible ways of splitting s into two non-empty substrings are:
left = "0" and right = "11101", score = 1 + 4 = 5 
left = "01" and right = "1101", score = 1 + 3 = 4 
left = "011" and right = "101", score = 1 + 2 = 3 
left = "0111" and right = "01", score = 1 + 1 = 2 
left = "01110" and right = "1", score = 2 + 1 = 3

Example 2:
Input: s = "00111"
Output: 5
Explanation: When left = "00" and right = "111", we get the maximum score = 2 + 3 = 5

Example 3:
Input: s = "1111"
Output: 3

Constraints:
2 <= s.length <= 500
The string s consists of characters '0' and '1' only.

</> Typescript Code:
*/

function maxScore(s: string): number {
  // Count total number of '1's across the entire string
  let totalOnes = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "1") totalOnes++;
  }

  // Track zeros in left part, ones in left part so far, and the best seen
  let zeroCount = 0,
    onesSoFar = 0,
    ans = 0;

  // Iterate up to the second-to-last character to keep right substring non-empty
  for (let i = 0; i < s.length - 1; i++) {
    // If current char is '0', increment zeroCount; otherwise increment onesSoFar
    if (s[i] === "0") zeroCount++;
    else onesSoFar++;

    // Calculate current score by adding zeros from left and ones from right
    let curr = zeroCount + (totalOnes - onesSoFar);

    // Keep track of the highest score found
    if (curr > ans) ans = curr;
  }
  return ans;
}
