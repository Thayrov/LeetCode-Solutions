/*
856. Score of Parentheses

Given a balanced parentheses string s, return the score of the string.

The score of a balanced parentheses string is based on the following rule:

"()" has score 1.
AB has score A + B, where A and B are balanced parentheses strings.
(A) has score 2 * A, where A is a balanced parentheses string.

Example 1:
Input: s = "()"
Output: 1

Example 2:
Input: s = "(())"
Output: 2

Example 3:
Input: s = "()()"
Output: 2

Constraints:
2 <= s.length <= 50
s consists of only '(' and ')'.
s is a balanced parentheses string.

</> Typescript code:
*/

function scoreOfParentheses(s: string): number {
  // Accumulated score, current nesting depth.
  let ans = 0, d = 0;
  // Single left-to-right scan.
  for (let i = 0; i < s.length; i++) {
    // '(' descends one level: raw char code for speed.
    if (s.charCodeAt(i) === 40) d++;
    else {
      // ')' ascends one level.
      d--;
      // Only primitive "()" scores, scaled by enclosing depth.
      if (s.charCodeAt(i - 1) === 40) ans += 1 << d;
    }
  }
  // Total score of concatenated primitives.
  return ans;
}
