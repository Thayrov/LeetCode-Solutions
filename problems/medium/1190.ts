/*
1190. Reverse Substrings Between Each Pair of Parentheses

You are given a string s that consists of lower case English letters and brackets.

Reverse the strings in each pair of matching parentheses, starting from the innermost one.

Your result should not contain any brackets.

Example 1:
Input: s = "(abcd)"
Output: "dcba"

Example 2:
Input: s = "(u(love)i)"
Output: "iloveu"
Explanation: The substring "love" is reversed first, then the whole string is reversed.

Example 3:
Input: s = "(ed(et(oc))el)"
Output: "leetcode"
Explanation: First, we reverse the substring "oc", then "etco", and finally, the whole string.

Constraints:
1 <= s.length <= 2000
s only contains lower case English characters and parentheses.
It is guaranteed that all parentheses are balanced.

</> Typescript code:
*/

function reverseParentheses(s: string): string {
  // Cache input length for pair table and scan bounds.
  const n = s.length;
  // Store matching parenthesis index for every bracket.
  const pair = new Int32Array(n);
  // Manual stack of open-parenthesis indices.
  const st = new Int32Array(n);
  // Current stack height.
  let top = 0;
  // Pair every bracket in one left-to-right pass.
  for (let i = 0; i < n; i++) {
    // Read current character code once.
    const c = s.charCodeAt(i);
    // Open bracket starts a new nesting level.
    if (c === 40) {
      // Push its index for the future close.
      st[top++] = i;
    // Close bracket ends the innermost open level.
    } else if (c === 41) {
      // Pop the matching open index.
      const j = st[--top];
      // Link both directions for teleport jumps.
      pair[i] = j;
      // Mirror link enables reverse traversal.
      pair[j] = i;
    }
  }
  // Collect result characters to join once.
  const out: string[] = [];
  // Walk with teleporting direction; reversal is implicit.
  for (let i = 0, d = 1; i >= 0 && i < n; i += d) {
    // Read current character code once.
    const c = s.charCodeAt(i);
    // Brackets are doors, not output.
    if (c === 40 || c === 41) {
      // Jump to the match instead of reversing.
      i = pair[i];
      // Flip direction on every nesting crossing.
      d = -d;
    } else {
      // Plain letter in current direction order.
      out.push(s[i]);
    }
  }
  // Join chunks into the bracket-free answer.
  return out.join("");
}
