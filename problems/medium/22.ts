/*
22. Generate Parentheses

Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

Example 1:
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]

Example 2:
Input: n = 1
Output: ["()"]

Constraints:
1 <= n <= 8

</> Typescript code:
*/

function generateParenthesis(n: number): string[] {
  // Double length for total chars.
  const m = n << 1;
  // Reusable char buffer avoids string copies.
  const buf: string[] = new Array(m);
  // Collect completed combinations.
  const res: string[] = [];
  // Depth-first builder over open/close counts.
  const dfs = (pos: number, open: number, close: number): void => {
    // Full length reached, emit one combination.
    if (pos === m) {
      // Join buffer into immutable string.
      res.push(buf.join(""));
      // Stop this branch.
      return;
    }
    // Can still open another '('.
    if (open < n) {
      // Place '(' at cursor.
      buf[pos] = "(";
      // Recurse with one more open.
      dfs(pos + 1, open + 1, close);
    }
    // Can close only if unmatched '(' exists.
    if (close < open) {
      // Place ')' at cursor.
      buf[pos] = ")";
      // Recurse with one more close.
      dfs(pos + 1, open, close + 1);
    }
  };
  // Start search from empty prefix.
  dfs(0, 0, 0);
  // Return all well-formed combinations.
  return res;
}
