/*
32. Longest Valid Parentheses

Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses substring.

Example 1:
Input: s = "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()".

Example 2:
Input: s = ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()".

Example 3:
Input: s = ""
Output: 0

Constraints:
0 <= s.length <= 3 * 10^4
s[i] is '(', or ')'.

</> Typescript code:
*/

function longestValidParentheses(s: string): number {
  // Cache length for loop bounds.
  let n = s.length;
  // Single char cannot form a pair.
  if (n < 2) return 0;
  // Best valid length found so far.
  let best = 0;
  // Forward-pass open and close counters.
  let open = 0, close = 0;
  // Scan left to right counting parentheses.
  for (let i = 0; i < n; i++) {
    // Tally '(' as open via char code 40.
    if (s.charCodeAt(i) === 40) open++;
    // Tally ')' as close.
    else close++;
    // Balanced window yields a candidate length.
    if (open === close) {
      // Candidate valid substring length.
      const len = open + close;
      // Keep the maximum length.
      if (len > best) best = len;
    // Excess ')' invalidates window, reset counters.
    } else if (close > open) open = close = 0;
  }
  // Reset counters for the reverse pass.
  open = close = 0;
  // Scan right to left to catch leading '(' surplus.
  for (let i = n - 1; i >= 0; i--) {
    // Tally '(' as open via char code 40.
    if (s.charCodeAt(i) === 40) open++;
    // Tally ')' as close.
    else close++;
    // Balanced window yields a candidate length.
    if (open === close) {
      // Candidate valid substring length.
      const len = open + close;
      // Keep the maximum length.
      if (len > best) best = len;
    // Excess '(' invalidates window, reset counters.
    } else if (open > close) open = close = 0;
  }
  // Longest valid parentheses length.
  return best;
}
