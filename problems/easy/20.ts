/*
20. Valid Parentheses

Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.

Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false

Example 4:
Input: s = "([])"
Output: true

Example 5:
Input: s = "([)]"
Output: false

Constraints:
1 <= s.length <= 10^4
s consists of parentheses only '()[]{}'.

</> Typescript code:
*/

function isValid(s: string): boolean {
  // Cache length for single pass.
  const n = s.length;
  // Odd length can never be fully paired.
  if (n & 1) return false;
  // Preallocate stack for expected closers.
  const st = new Array<number>(n);
  // Stack top pointer.
  let top = 0;
  // Scan once with cached length for minimal overhead.
  for (let i = 0; i < n; i++) {
    // Read raw char code to avoid string compare cost.
    const c = s.charCodeAt(i);
    // '(' is 40: push expected ')'.
    if (c === 40) st[top++] = 41;
    // '[' is 91: push expected ']'.
    else if (c === 91) st[top++] = 93;
    // '{' is 123: push expected '}'.
    else if (c === 123) st[top++] = 125;
    // Closer: fail on empty stack or mismatched expectation.
    else if (top === 0 || st[--top] !== c) return false;
  }
  // Valid only when all expectations consumed.
  return top === 0;
}
