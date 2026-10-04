/*
678. Valid Parenthesis String

Given a string s containing only three types of characters: '(', ')' and '*', return true if s is valid.

The following rules define a valid string:

Any left parenthesis '(' must have a corresponding right parenthesis ')'.
Any right parenthesis ')' must have a corresponding left parenthesis '('.
Left parenthesis '(' must go before the corresponding right parenthesis ')'.
'*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string "".

Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "(*)"
Output: true

Example 3:
Input: s = "(*))"
Output: true

Example 4:
Input: s = "("
Output: false

Constraints:
1 <= s.length <= 100
s[i] is '(', ')' or '*'.

</> Typescript code:
*/

function checkValidString(s: string): boolean {
  // Minimum possible open count across '*' interpretations.
  let lo = 0;
  // Maximum possible open count across '*' interpretations.
  let hi = 0;
  // Scan each character once.
  for (let i = 0; i < s.length; i++) {
    // Read raw char code for branch-free comparison.
    const c = s.charCodeAt(i);
    // '(' raises both bounds: one more required and possible open.
    if (c === 40) { lo++; hi++; }
    // ')' lowers both bounds: one open consumed in every interpretation.
    else if (c === 41) { lo--; hi--; }
    // '*' as ')' lowers lo, as '(' raises hi.
    else { lo--; hi++; }
    // Negative hi means even all-'(' reading overcloses: impossible.
    if (hi < 0) return false;
    // Clamp lo: surplus ')' can be covered by treating '*' as empty.
    if (lo < 0) lo = 0;
  }
  // Valid only when some interpretation closes every open.
  return lo === 0;
}
