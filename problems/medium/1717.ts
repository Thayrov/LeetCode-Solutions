/*
1717. Maximum Score From Removing Substrings

You are given a string s and two integers x and y. You can perform two types of operations any number of times.

Remove substring "ab" and gain x points.
For example, when removing "ab" from "cabxbae" it becomes "cxbae".
Remove substring "ba" and gain y points.
For example, when removing "ba" from "cabxbae" it becomes "cabxe".
Return the maximum points you can gain after applying the above operations on s.

Example 1:
Input: s = "cdbcbbaaabab", x = 4, y = 5
Output: 19
Explanation:
- Remove the "ba" underlined in "cdbcbbaaabab". Now, s = "cdbcbbaaab" and 5 points are added to the score.
- Remove the "ab" underlined in "cdbcbbaaab". Now, s = "cdbcbbaa" and 4 points are added to the score.
- Remove the "ba" underlined in "cdbcbbaa". Now, s = "cdbcba" and 5 points are added to the score.
- Remove the "ba" underlined in "cdbcba". Now, s = "cdbc" and 5 points are added to the score.
Total score = 5 + 4 + 5 + 5 = 19.

Example 2:
Input: s = "aabbaaxybbaabb", x = 5, y = 4
Output: 20

Constraints:
1 <= s.length <= 10^5
1 <= x, y <= 10^4
s consists of lowercase English letters.

</> Typescript Code:
*/

function maximumGain(s: string, x: number, y: number): number {
  // Initialize the maximum points counter
  let maxPoints = 0;

  // Helper function to remove substrings and score points
  function removeAndScore(pattern: string, points: number): string {
    let stack: string[] = [];
    // Iterate over each character in the string
    for (let char of s) {
      // Check if the current character and the last character in the stack form the pattern
      if (
        stack.length &&
        stack[stack.length - 1] === pattern[0] &&
        char === pattern[1]
      ) {
        stack.pop(); // Remove the last character in the stack
        maxPoints += points; // Add points to the score
      } else {
        stack.push(char); // Add the current character to the stack
      }
    }
    // Join the stack into a new string and return it
    s = stack.join("");
    return s;
  }

  // Prioritize the operation with the higher points
  if (x > y) {
    // Remove "ab" substrings first
    s = removeAndScore("ab", x);
    // Then remove "ba" substrings
    s = removeAndScore("ba", y);
  } else {
    // Remove "ba" substrings first
    s = removeAndScore("ba", y);
    // Then remove "ab" substrings
    s = removeAndScore("ab", x);
  }

  // Return the total maximum points
  return maxPoints;
}
