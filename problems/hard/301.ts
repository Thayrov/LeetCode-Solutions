/*
301. Remove Invalid Parentheses

Given a string s that contains parentheses and letters, remove the minimum number of invalid parentheses to make the input string valid.

Return a list of unique strings that are valid with the minimum number of removals. You may return the answer in any order.

Example 1:
Input: s = "()())()"
Output: ["(())()","()()()"]

Example 2:
Input: s = "(a)())()"
Output: ["(a())()","(a)()()"]

Example 3:
Input: s = ")("
Output: [""]

Constraints:
1 <= s.length <= 25
s consists of lowercase English letters and parentheses '(' and ')'.
There will be at most 20 parentheses in s.

</> Typescript code:
*/

function removeInvalidParentheses(s: string): string[] {
  // Count unmatched '(' to delete and unmatched ')' to delete.
  let l = 0, r = 0;
  // Scan once to compute exact minimum removals.
  for (const ch of s) {
    // Every '(' tentatively needs a match.
    if (ch === '(') l++;
    // Route ')' to match or to removal count.
    else if (ch === ')') {
      // No open '(' means this ')' must be removed.
      if (l === 0) r++;
      // Otherwise match it against one open '('.
      else l--;
    }
  }
  // Collect accepted minimal-removal valid strings.
  const res: string[] = [];
  // Reusable builder for the current candidate.
  const path: string[] = [];
  // Cache input length for pruning checks.
  const n = s.length;
  // Depth-first search over keep/delete choices with dedup.
  const dfs = (i: number, lrem: number, rrem: number, open: number, prevDel: boolean): void => {
    // Prune negative removals or negative balance.
    if (lrem < 0 || rrem < 0 || open < 0) return;
    // Prune when remaining chars cannot cover pending removals.
    if (lrem + rrem > n - i) return;
    // At end, accept only exact-removal balanced candidates.
    if (i === n) {
      // Join builder only for valid leaves.
      if (lrem === 0 && rrem === 0 && open === 0) res.push(path.join(''));
      return;
    }
    // Inspect current character.
    const c = s[i];
    // Letters are always kept, never deleted.
    if (c !== '(' && c !== ')') {
      // Append letter to candidate.
      path.push(c);
      // Recurse with unchanged counters.
      dfs(i + 1, lrem, rrem, open, false);
      // Backtrack letter.
      path.pop();
      return;
    }
    // Skip deleting duplicates inside one paren run.
    const dup = i > 0 && s[i] === s[i - 1] && !prevDel;
    // Branch '(' into delete versus keep.
    if (c === '(') {
      // Delete this '(' against the left-removal budget.
      if (lrem > 0 && !dup) dfs(i + 1, lrem - 1, rrem, open, true);
      // Keep this '(' and track one more open balance.
      path.push(c);
      // Recurse with incremented open count.
      dfs(i + 1, lrem, rrem, open + 1, false);
      // Backtrack kept '('.
      path.pop();
    } else {
      // Delete this ')' against the right-removal budget.
      if (rrem > 0 && !dup) dfs(i + 1, lrem, rrem - 1, open, true);
      // Keep this ')' only when some '(' is open.
      if (open > 0) {
        // Append ')' to candidate.
        path.push(c);
        // Recurse with decremented open count.
        dfs(i + 1, lrem, rrem, open - 1, false);
        // Backtrack kept ')'.
        path.pop();
      }
    }
  };
  // Start search from index zero with computed budgets.
  dfs(0, l, r, 0, false);
  // Return all unique minimal-removal valid strings.
  return res;
}
