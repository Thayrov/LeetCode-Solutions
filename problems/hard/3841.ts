/*
3841. Palindromic Path Queries in a Tree

You are given an undirected tree with n nodes labeled 0 to n - 1. This is represented by a 2D array edges of length n - 1, where edges[i] = [ui, vi] indicates an undirected edge between nodes ui and vi.

You are also given a string s of length n consisting of lowercase English letters, where s[i] represents the character assigned to node i.

You are also given a string array queries, where each queries[i] is either:

"update ui c": Change the character at node ui to c. Formally, update s[ui] = c.
"query ui vi": Determine whether the string formed by the characters on the unique path from ui to vi (inclusive) can be rearranged into a palindrome.

Return a boolean array answer, where answer[j] is true if the jth query of type "query ui vi" can be rearranged into a palindrome, and false otherwise.

Example 1:
Input: n = 3, edges = [[0,1],[1,2]], s = "aac", queries = ["query 0 2","update 1 b","query 0 2"]
Output: [true,false]
Explanation:
"query 0 2": Path 0 → 1 → 2 gives "aac", which can be rearranged to form "aca", a palindrome. Thus, answer[0] = true.
"update 1 b": Update node 1 to 'b', now s = "abc".
"query 0 2": Path characters are "abc", which cannot be rearranged to form a palindrome. Thus, answer[1] = false.
Thus, answer = [true, false].

Example 2:
Input: n = 4, edges = [[0,1],[0,2],[0,3]], s = "abca", queries = ["query 1 2","update 0 b","query 2 3","update 3 a","query 1 3"]
Output: [false,false,true]
Explanation:
"query 1 2": Path 1 → 0 → 2 gives "bac", which cannot be rearranged to form a palindrome. Thus, answer[0] = false.
"update 0 b": Update node 0 to 'b', now s = "bbca".
"query 2 3": Path 2 → 0 → 3 gives "cba", which cannot be rearranged to form a palindrome. Thus, answer[1] = false.
"update 3 a": Update node 3 to 'a', s = "bbca".
"query 1 3": Path 1 → 0 → 3 gives "bba", which can be rearranged to form "bab", a palindrome. Thus, answer[2] = true.
Thus, answer = [false, false, true].

Constraints:
1 <= n == s.length <= 5 * 10^4
edges.length == n - 1
edges[i] = [ui, vi]
0 <= ui, vi <= n - 1
s consists of lowercase English letters.
The input is generated such that edges represents a valid tree.
1 <= queries.length <= 5 * 10^4
queries[i] = "update ui c" or
"query ui vi"
0 <= ui, vi <= n - 1
c is a lowercase English letter.

</> Typescript code:
*/

function palindromePath(n: number, edges: number[][], s: string, queries: string[]): boolean[] {
  // Build adjacency list for the undirected tree.
  const adj: number[][] = Array.from({ length: n }, () => []);
  // Insert each edge in both directions.
  for (let i = 0; i < edges.length; i++) {
    // Read edge endpoints.
    const u = edges[i][0], v = edges[i][1];
    // Link u to v.
    adj[u].push(v);
    // Link v to u.
    adj[v].push(u);
  }
  // Levels needed to lift any node (2^16 > 5*10^4).
  const LOG = 17;
  // Binary lifting table: up[k][v] is the 2^k-th ancestor of v.
  const up: Int32Array[] = Array.from({ length: LOG }, () => new Int32Array(n).fill(-1));
  // Depth of each node from the root.
  const depth = new Int32Array(n);
  // Euler entry time of each node (1-based for Fenwick).
  const tin = new Int32Array(n);
  // Euler exit time; subtree of v spans [tin[v], tout[v]].
  const tout = new Int32Array(n);
  // Root-path parity mask for each node.
  const pref = new Int32Array(n);
  // Current character index of each node.
  const cur = new Int32Array(n);
  // Convert character string to numeric codes.
  for (let i = 0; i < n; i++) cur[i] = s.charCodeAt(i) - 97;
  // Global timer for entry times.
  let timer = 0;
  // Explicit stack of [node, parent, next child index] for iterative DFS.
  const stack: [number, number, number][] = [[0, -1, 0]];
  // Root is its own ancestor.
  up[0][0] = 0;
  // Root path mask holds only the root character.
  pref[0] = 1 << cur[0];
  // Process nodes until the stack drains.
  while (stack.length) {
    // Inspect the frame on top.
    const top = stack[stack.length - 1];
    // Unpack current node and its parent.
    const node = top[0], parent = top[1];
    // First visit: stamp entry time.
    if (top[2] === 0) tin[node] = ++timer;
    // More neighbors left to explore.
    if (top[2] < adj[node].length) {
      // Take the next neighbor.
      const nb = adj[node][top[2]++];
      // Skip the edge back to the parent.
      if (nb === parent) continue;
      // Record direct parent.
      up[0][nb] = node;
      // Depth grows by one.
      depth[nb] = depth[node] + 1;
      // Extend parent mask with this node character.
      pref[nb] = pref[node] ^ (1 << cur[nb]);
      // Descend into the child.
      stack.push([nb, node, 0]);
    } else {
      // All children done: close the subtree interval.
      tout[node] = timer;
      // Backtrack.
      stack.pop();
    }
  }
  // Fill higher lifting levels from doubled jumps.
  for (let k = 1; k < LOG; k++) {
    // Previous and current levels.
    const prev = up[k - 1], row = up[k];
    // Jump twice through the previous level.
    for (let v = 0; v < n; v++) row[v] = prev[prev[v]];
  }
  // Fenwick size with spare slot for range-update sentinel.
  const N = n + 2;
  // Fenwick tree storing XOR deltas.
  const bit = new Int32Array(N + 1);
  // XOR val into position i and its Fenwick successors.
  function bitUpdate(i: number, val: number): void {
    // Climb the tree while inside bounds.
    while (i <= N) { bit[i] ^= val; i += i & -i; }
  }
  // XOR val onto every point in [l, r].
  function rangeUpdate(l: number, r: number, val: number): void {
    // Skip empty intervals and no-op deltas.
    if (val === 0 || l > r) return;
    // Start effect at l.
    bitUpdate(l, val);
    // Cancel effect after r.
    bitUpdate(r + 1, val);
  }
  // Read the accumulated XOR value at point i.
  function pointQuery(i: number): number {
    // Accumulate XOR down to index 0.
    let res = 0;
    // Walk Fenwick predecessors.
    while (i > 0) { res ^= bit[i]; i -= i & -i; }
    // Return the point value.
    return res;
  }
  // Seed each entry time with its initial root-path mask.
  for (let v = 0; v < n; v++) rangeUpdate(tin[v], tin[v], pref[v]);
  // Lowest common ancestor via binary lifting.
  function lca(a: number, b: number): number {
    // Ensure a is the deeper node.
    if (depth[a] < depth[b]) { const t = a; a = b; b = t; }
    // Height gap to close.
    let diff = depth[a] - depth[b];
    // Lift a up by each set bit of the gap.
    for (let k = LOG - 1; k >= 0; k--) if (diff & (1 << k)) a = up[k][a];
    // Equal nodes mean one contained the other.
    if (a === b) return a;
    // Lift both while ancestors differ.
    for (let k = LOG - 1; k >= 0; k--) {
      // Step up on mismatch only.
      if (up[k][a] !== up[k][b]) { a = up[k][a]; b = up[k][b]; }
    }
    // Parent of either is the ancestor.
    return up[0][a];
  }
  // Collect answers for query operations only.
  const ans: boolean[] = [];
  // Handle each operation in order.
  for (let i = 0; i < queries.length; i++) {
    // Read the raw operation string.
    const q = queries[i];
    // 'u' flags an update operation.
    if (q.charCodeAt(0) === 117) {
      // Split off the trailing new character.
      const sp = q.lastIndexOf(' ');
      // Parse the new character code.
      const c = q.charCodeAt(sp + 1) - 97;
      // Parse the target node index.
      const ui = parseInt(q.slice(7, sp), 10);
      // Apply only on a real character change.
      if (cur[ui] !== c) {
        // Delta flipping old bit off and new bit on.
        const d = (1 << cur[ui]) ^ (1 << c);
        // Store the new character.
        cur[ui] = c;
        // Propagate delta to the whole subtree, i.e. all root paths through ui.
        rangeUpdate(tin[ui], tout[ui], d);
      }
    } else {
      // Split between the two node indices.
      const sp = q.indexOf(' ', 6);
      // Parse the first endpoint.
      const u = parseInt(q.slice(6, sp), 10);
      // Parse the second endpoint.
      const v = parseInt(q.slice(sp + 1), 10);
      // Find their lowest common ancestor.
      const w = lca(u, v);
      // Path mask: LCA counted twice, so add it back once.
      const m = pointQuery(tin[u]) ^ pointQuery(tin[v]) ^ (1 << cur[w]);
      // Palindrome possible iff at most one bit is set.
      ans.push((m & (m - 1)) === 0);
    }
  }
  // Return answers in query order.
  return ans;
}
