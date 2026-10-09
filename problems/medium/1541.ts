/*
1541. Minimum Insertions to Balance a Parentheses String

Given a parentheses string s containing only the characters '(' and ')'. A parentheses string is balanced if:

Any left parenthesis '(' must have a corresponding two consecutive right parenthesis '))'.
Left parenthesis '(' must go before the corresponding two consecutive right parenthesis '))'.

In other words, we treat '(' as an opening parenthesis and '))' as a closing parenthesis.

For example, "())", "())(())))" and "(())())))" are balanced, ")()", "()))" and "(()))" are not balanced.

You can insert the characters '(' and ')' at any position of the string to balance it if needed.

Return the minimum number of insertions needed to make s balanced.

Example 1:
Input: s = "(()))"
Output: 1
Explanation: The second '(' has two matching '))', but the first '(' has only ')' matching. We need to add one more ')' at the end of the string to be "(())))" which is balanced.

Example 2:
Input: s = "())"
Output: 0
Explanation: The string is already balanced.

Example 3:
Input: s = "))())("
Output: 3
Explanation: Add '(' to match the first '))', Add '))' to match the last '('.

Constraints:
1 <= s.length <= 10^5
s consists of '(' and ')' only.

</> Typescript code:
*/

function minInsertions(s: string): number {
  // Insertions forced by lone closers and parity fixes.
  let res = 0;
  // Open demand: number of ')' still needed for seen '('.
  let need = 0;
  // Cache length for single linear scan.
  const n = s.length;
  // Single left-to-right greedy pass.
  for (let i = 0; i < n; i++) {
    // Open bracket needs two closers.
    if (s.charCodeAt(i) === 40) {
      // Reserve its '))' demand.
      need += 2;
      // Odd demand means a lone ')' was left hanging.
      if (need & 1) {
        // Insert one ')' to complete the pending pair.
        res++;
        // Consume the inserted closer from demand.
        need--;
      }
    } else {
      // Consume one pending closer.
      need--;
      // Negative demand means a closer with no opener.
      if (need === -1) {
        // Insert '(' to match this stray closer.
        res++;
        // Inserted '(' itself needs '))', one used here.
        need = 1;
      }
    }
  }
  // Flush remaining open demand as tail insertions.
  return res + need;
}
