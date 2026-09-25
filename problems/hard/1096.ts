/*
1096. Brace Expansion II

Under the grammar given below, strings can represent a set of lowercase words. Let R(expr) denote the set of words the expression represents.
The grammar can best be understood through simple examples:
Single letters represent a singleton set containing that word.
R("a") = {"a"}
R("w") = {"w"}
When we take a comma-delimited list of two or more expressions, we take the union of possibilities.
R("{a,b,c}") = {"a","b","c"}
R("{{a,b},{b,c}}") = {"a","b","c"} (notice the final set only contains each word at most once)
When we concatenate two expressions, we take the set of possible concatenations between two words where the first word comes from the first expression and the second word comes from the second expression.
R("{a,b}{c,d}") = {"ac","ad","bc","bd"}
R("a{b,c}{d,e}f{g,h}") = {"abdfg", "abdfh", "abefg", "abefh", "acdfg", "acdfh", "acefg", "acefh"}
Formally, the three rules for our grammar:
For every lowercase letter x, we have R(x) = {x}.
For expressions e1, e2, ... , ek with k >= 2, we have R({e1, e2, ...}) = R(e1) ∪ R(e2) ∪ ...
For expressions e1 and e2, we have R(e1 + e2) = {a + b for (a, b) in R(e1) × R(e2)}, where + denotes concatenation, and × denotes the cartesian product.
Given an expression representing a set of words under the given grammar, return the sorted list of words that the expression represents.

Example 1:
Input: expression = "{a,b}{c,{d,e}}"
Output: ["ac","ad","ae","bc","bd","be"]

Example 2:
Input: expression = "{{a,z},a{b,c},{ab,z}}"
Output: ["a","ab","ac","z"]
Explanation: Each distinct word is written only once in the final answer.

Constraints:
1 <= expression.length <= 60
expression[i] consists of '{', '}', ','or lowercase English letters.
The given expression represents a set of words based on the grammar given in the description.

</> Typescript code:
*/

function braceExpansionII(expression: string): string[] {
  // Cache expression length for bounds and memo keys.
  const n = expression.length;
  // Precompute matching brace indices for O(1) group jumps.
  const match = new Array<number>(n).fill(-1);
  // Stack of open-brace positions while scanning.
  const st: number[] = [];
  // Pair each '{' with its '}' in one linear pass.
  for (let i = 0; i < n; i++) {
    // Push open-brace position.
    if (expression[i] === '{') st.push(i);
    // Pop mate and record bidirectional match on close.
    else if (expression[i] === '}') {
      // Retrieve matching open position.
      const j = st.pop()!;
      // Link open to close.
      match[j] = i;
      // Link close back to open.
      match[i] = j;
    }
  }
  // Memoize solved intervals to avoid repeated work.
  const memo = new Map<number, Set<string>>();
  // Solve substring [l, r) and return its word set.
  const solve = (l: number, r: number): Set<string> => {
    // Encode interval as a single map key.
    const key = l * 64 + r;
    // Return cached set on repeat visit.
    const hit = memo.get(key);
    // Reuse previously computed interval result.
    if (hit) return hit;
    // Track brace depth while scanning for unions.
    let depth = 0;
    // Flag whether a top-level comma exists.
    let has = false;
    // Scan for a depth-zero comma indicating union.
    for (let i = l; i < r; i++) {
      // Read current character.
      const c = expression[i];
      // Enter nested brace level.
      if (c === '{') depth++;
      // Exit nested brace level.
      else if (c === '}') depth--;
      // Mark union split at top level.
      else if (c === ',' && depth === 0) { has = true; break; }
    }
    // Result set for this interval.
    let res: Set<string>;
    // Handle union when a top-level comma was found.
    if (has) {
      // Start with an empty union accumulator.
      res = new Set<string>();
      // Reset depth for the splitting pass.
      depth = 0;
      // Start of the current union segment.
      let s = l;
      // Walk through segments including sentinel end.
      for (let i = l; i <= r; i++) {
        // Use sentinel comma to flush the final segment.
        const c = i < r ? expression[i] : ',';
        // Enter nested brace level.
        if (c === '{') depth++;
        // Exit nested brace level.
        else if (c === '}') depth--;
        // Flush one top-level segment into the union.
        else if (c === ',' && depth === 0) {
          // Merge solved segment words into accumulator.
          for (const w of solve(s, i)) res.add(w);
          // Advance start past the delimiter.
          s = i + 1;
        }
      }
    } else {
      // Start concatenation from the empty word.
      res = new Set<string>(['']);
      // Cursor over factors in this interval.
      let i = l;
      // Consume letters and brace groups sequentially.
      while (i < r) {
        // Expand a brace group factor.
        if (expression[i] === '{') {
          // Jump to its precomputed match.
          const j = match[i];
          // Solve the group interior recursively.
          const inner = solve(i + 1, j);
          // Fast path: empty prefix adopts group directly.
          if (res.size === 1 && res.has('')) res = new Set<string>(inner);
          // General Cartesian product of prefix and group.
          else {
            // Accumulator for concatenated pairs.
            const nxt = new Set<string>();
            // Combine every prefix with every group word.
            for (const a of res) for (const b of inner) nxt.add(a + b);
            // Replace prefix set with extended products.
            res = nxt;
          }
          // Advance cursor past the closing brace.
          i = j + 1;
        } else {
          // Read the singleton letter factor.
          const ch = expression[i];
          // Fast path: empty prefix becomes the letter.
          if (res.size === 1 && res.has('')) res = new Set<string>([ch]);
          // Append letter to every existing prefix.
          else {
            // Accumulator for extended prefixes.
            const nxt = new Set<string>();
            // Concatenate letter onto each prefix.
            for (const a of res) nxt.add(a + ch);
            // Replace prefix set with extensions.
            res = nxt;
          }
          // Advance cursor past the letter.
          i++;
        }
      }
    }
    // Cache the solved interval before returning.
    memo.set(key, res);
    // Return the word set for [l, r).
    return res;
  };
  // Solve whole expression and return sorted words.
  return [...solve(0, n)].sort();
}
