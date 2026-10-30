/*
3970. Shortest Path With At Most K Consecutive Identical Characters

You are given an integer n representing the number of nodes in a directed weighted graph, numbered from 0 to n - 1. This is represented by a 2D integer array edges, where edges[i] = [ui, vi, wi] represents a directed edge from node ui to node vi with weight wi.

You are also given a string labels of length n, where labels[i] is the character assigned to node i, and an integer k.

Return the minimum total edge weight of a path from node 0 to node n - 1 such that the concatenation of the labels of the nodes along the path contains at most k consecutive identical characters. If no valid path exists, return -1.

Example 1:
Input: n = 3, edges = [[0,1,1],[1,2,1],[0,2,3]], labels = "aab", k = 1
Output: 3
Explanation:
The optimal valid path from node 0 to node 2 is as follows:
Use edges[2] = [0, 2, 3] to reach node 2 with a weight wi = 3.
The corresponding concatenation of labels is "ab", which satisfies at most k = 1 consecutive identical characters. Thus, the answer is 3.

Example 2:
Input: n = 3, edges = [[0,1,1],[1,2,1],[0,2,3]], labels = "aab", k = 2
Output: 2
Explanation:
The optimal valid path from node 0 to node 2 is as follows:
Use edges[0] = [0, 1, 1] to reach node 1 with weight wi = 1.
Use edges[1] = [1, 2, 1] to reach node 2 with weight wi = 1.
The corresponding concatenation of labels is "aab", which satisfies at most k = 2 consecutive identical characters. Thus, the answer is 2.

Example 3:
Input: n = 3, edges = [[0,1,1],[1,2,1]], labels = "aaa", k = 2
Output: -1
Explanation:
There is no valid path from node 0 to node 2 that satisfies at most k = 2 consecutive identical characters. Thus, the answer is -1.

Constraints:
1 <= n == labels.length <= 5 * 104
0 <= edges.length <= 5 * 104
edges[i] == [ui, vi, wi]
0 <= ui, vi <= n - 1
ui != vi
1 <= wi <= 104
labels consists of lowercase English letters
1 <= k <= 50

</> Typescript code:
*/

function shortestPath(n: number, edges: number[][], labels: string, k: number): number {
  // Single node needs no edges, weight is zero.
  if (n === 1) return 0;
  // No edges means no path between distinct endpoints.
  if (edges.length === 0) return -1;
  // Cache label codes for O(1) equality checks.
  const lab = new Uint8Array(n);
  // Fill label code table.
  for (let i = 0; i < n; i++) lab[i] = labels.charCodeAt(i);
  // Build flat adjacency lists as [v0, w0, v1, w1, ...].
  const adj: number[][] = Array.from({ length: n }, () => []);
  // Insert every directed edge into its tail list.
  for (let i = 0; i < edges.length; i++) {
    // Grab current edge triple.
    const e = edges[i];
    // Append head and weight to the tail row.
    adj[e[0]].push(e[1], e[2]);
  }
  // Every simple path is valid when k covers all nodes, use plain Dijkstra.
  if (k >= n) {
    // Init single-state distances to infinity.
    const dist = new Float64Array(n).fill(Infinity);
    // Start node costs zero.
    dist[0] = 0;
    // Heap keys and node ids, 1-based with dummy head.
    const hd: number[] = [0];
    // Heap node payload parallel to keys.
    const hn: number[] = [0];
    // Current heap size.
    let sz = 0;
    // Push a node with sift-up ordering.
    const push = (d: number, u: number): void => {
      // Append key and payload, grow size.
      hd.push(d); hn.push(u); sz++;
      // Sift the new entry toward the root.
      let c = sz;
      // Bubble up while parent is larger.
      while (c > 1) {
        // Compute parent index.
        const p = c >> 1;
        // Stop when heap order holds.
        if (hd[p] <= hd[c]) break;
        // Swap keys with parent.
        let t = hd[p]; hd[p] = hd[c]; hd[c] = t;
        // Swap payloads with parent.
        t = hn[p]; hn[p] = hn[c]; hn[c] = t;
        // Move cursor up.
        c = p;
      }
    };
    // Seed heap with the start node.
    push(0, 0);
    // Drain heap until empty or target settles.
    while (sz > 0) {
      // Peek minimum key and node.
      const d = hd[1], u = hn[1];
      // Move last entry to root, shrink heap.
      hd[1] = hd[sz]; hn[1] = hn[sz];
      // Drop last slot.
      hd.pop(); hn.pop(); sz--;
      // Sift root down to restore order.
      let p = 1;
      // Descend while a smaller child exists.
      for (;;) {
        // Compute child indices.
        const l = p << 1, r = l + 1;
        // Assume parent is smallest.
        let m = p;
        // Take left child if smaller.
        if (l <= sz && hd[l] < hd[m]) m = l;
        // Take right child if smallest.
        if (r <= sz && hd[r] < hd[m]) m = r;
        // Stop when parent wins.
        if (m === p) break;
        // Swap keys with winner child.
        let t = hd[p]; hd[p] = hd[m]; hd[m] = t;
        // Swap payloads with winner child.
        t = hn[p]; hn[p] = hn[m]; hn[m] = t;
        // Move cursor down.
        p = m;
      }
      // Skip stale heap entries.
      if (d !== dist[u]) continue;
      // First pop of target is the optimum.
      if (u === n - 1) return d;
      // Grab outgoing edges of u.
      const row = adj[u];
      // Relax every outgoing edge.
      for (let j = 0; j < row.length; j += 2) {
        // Read head and candidate distance.
        const v = row[j], nd = d + row[j + 1];
        // Keep strictly better distance.
        if (nd < dist[v]) { dist[v] = nd; push(nd, v); }
      }
    }
    // Map infinity to the missing-path sentinel.
    return dist[n - 1] === Infinity ? -1 : dist[n - 1];
  }
  // Alias run-length bound for index math.
  const kk = k;
  // Init expanded (node, run) distances to infinity.
  const dist = new Float64Array(n * kk).fill(Infinity);
  // Start state is node 0 with run length 1.
  dist[0] = 0;
  // Heap keys, 1-based with dummy head.
  const hd: number[] = [0];
  // Heap node payload parallel to keys.
  const hn: number[] = [0];
  // Heap run payload parallel to keys.
  const hr: number[] = [0];
  // Current heap size.
  let sz = 0;
  // Push a state with sift-up ordering.
  const push = (d: number, u: number, r: number): void => {
    // Append key and payloads, grow size.
    hd.push(d); hn.push(u); hr.push(r); sz++;
    // Sift the new entry toward the root.
    let c = sz;
    // Bubble up while parent is larger.
    while (c > 1) {
      // Compute parent index.
      const p = c >> 1;
      // Stop when heap order holds.
      if (hd[p] <= hd[c]) break;
      // Swap keys with parent.
      let t = hd[p]; hd[p] = hd[c]; hd[c] = t;
      // Swap node payloads with parent.
      t = hn[p]; hn[p] = hn[c]; hn[c] = t;
      // Swap run payloads with parent.
      t = hr[p]; hr[p] = hr[c]; hr[c] = t;
      // Move cursor up.
      c = p;
    }
  };
  // Seed heap with the start state.
  push(0, 0, 0);
  // Track nodes whose cross-label edges were relaxed once.
  const emitted = new Uint8Array(n);
  // Drain heap until empty or target settles.
  while (sz > 0) {
    // Peek minimum key, node, and run.
    const d = hd[1], u = hn[1], r = hr[1];
    // Move last entry to root, shrink heap.
    hd[1] = hd[sz]; hn[1] = hn[sz]; hr[1] = hr[sz];
    // Drop last slot.
    hd.pop(); hn.pop(); hr.pop(); sz--;
    // Sift root down to restore order.
    let p = 1;
    // Descend while a smaller child exists.
    for (;;) {
      // Compute child indices.
      const l = p << 1, rr = l + 1;
      // Assume parent is smallest.
      let m = p;
      // Take left child if smaller.
      if (l <= sz && hd[l] < hd[m]) m = l;
      // Take right child if smallest.
      if (rr <= sz && hd[rr] < hd[m]) m = rr;
      // Stop when parent wins.
      if (m === p) break;
      // Swap keys with winner child.
      let t = hd[p]; hd[p] = hd[m]; hd[m] = t;
      // Swap node payloads with winner child.
      t = hn[p]; hn[p] = hn[m]; hn[m] = t;
      // Swap run payloads with winner child.
      t = hr[p]; hr[p] = hr[m]; hr[m] = t;
      // Move cursor down.
      p = m;
    }
    // Skip stale heap entries.
    if (d !== dist[u * kk + r]) continue;
    // First pop of target over all runs is optimal.
    if (u === n - 1) return d;
    // Grab outgoing edges and tail label.
    const row = adj[u];
    // Cache tail label code.
    const lu = lab[u];
    // Relax label-changing edges once from the best run.
    if (!emitted[u]) {
      // Mark node so later runs skip duplicate work.
      emitted[u] = 1;
      // Scan outgoing edges for label changes.
      for (let j = 0; j < row.length; j += 2) {
        // Read head node.
        const v = row[j];
        // Only transitions that reset the run qualify.
        if (lab[v] !== lu) {
          // Target run resets to length 1 at index 0.
          const ni = v * kk, nd = d + row[j + 1];
          // Keep strictly better distance.
          if (nd < dist[ni]) { dist[ni] = nd; push(nd, v, 0); }
        }
      }
    }
    // Extend same-label runs while under the bound.
    if (r + 1 < kk) {
      // Next run length index.
      const nr = r + 1;
      // Scan outgoing edges for label matches.
      for (let j = 0; j < row.length; j += 2) {
        // Read head node.
        const v = row[j];
        // Only transitions that extend the run qualify.
        if (lab[v] === lu) {
          // Target state carries the extended run.
          const ni = v * kk + nr, nd = d + row[j + 1];
          // Keep strictly better distance.
          if (nd < dist[ni]) { dist[ni] = nd; push(nd, v, nr); }
        }
      }
    }
  }
  // Exhausted heap without reaching target.
  return -1;
}
