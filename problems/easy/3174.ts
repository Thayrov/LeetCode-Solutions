/* 
3174. Clear Digits

You are given a string s.

Your task is to remove all digits by doing this operation repeatedly:

Delete the first digit and the closest non-digit character to its left.
Return the resulting string after removing all digits.

Example 1:
Input: s = "abc"
Output: "abc"
Explanation:
There is no digit in the string.

Example 2:
Input: s = "cb34"
Output: ""
Explanation:
First, we apply the operation on s[2], and s becomes "c4".
Then we apply the operation on s[1], and s becomes "".


Constraints:
1 <= s.length <= 100
s consists only of lowercase English letters and digits.
The input is generated such that it is possible to delete all digits.

</> Typescript Code:
*/

function clearDigits(s: string): string {
  // Initialize an empty stack to collect non-digit characters.
  let stack: string[] = [];
  // Loop through each character in the input string.
  for (let ch of s) {
    // Check if the current character is a digit.
    if (ch >= '0' && ch <= '9') {
      // When a digit is found, remove the latest non-digit (closest on the left)
      // from the stack.
      stack.pop();
    } else {
      // If the character is a non-digit, push it onto the stack.
      stack.push(ch);
    }
  }
  // Concatenate the remaining characters in the stack into the final string.
  return stack.join('');
}
