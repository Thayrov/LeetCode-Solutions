/*
1614. Maximum Nesting Depth of the Parentheses

Given a valid parentheses string s, return the nesting depth of s.
The nesting depth is the maximum number of nested parentheses.

Example 1:
Input: s = "(1+(2*3)+((8)/4))+1"
Output: 3
Explanation:
Digit 8 is inside of 3 nested parentheses in the string.

Example 2:
Input: s = "(1)+((2))+(((3)))"
Output: 3
Explanation:
Digit 3 is inside of 3 nested parentheses in the string.

Example 3:
Input: s = "()(())((()()))"
Output: 3

Constraints:
1 <= s.length <= 100
s consists of digits 0-9 and characters '+', '-', '*', '/', '(', and ')'.
It is guaranteed that parentheses expression s is a VPS.

</> Typescript code:
*/

function maxDepth(s: string): number {
  // Track best depth seen and current open depth.
  let best = 0, cur = 0;
  // Scan once with cached length for minimal overhead.
  for (let i = 0, n = s.length; i < n; i++) {
    // Read raw char code to avoid string compare cost.
    const c = s.charCodeAt(i);
    // '(' is 40: enter one deeper level.
    if (c === 40) {
      // Increment current depth.
      cur++;
      // Record new maximum when exceeded.
      if (cur > best) best = cur;
    } else if (c === 41) {
      // ')' is 41: exit current level.
      cur--;
    }
  }
  // Deepest nesting observed.
  return best;
}
