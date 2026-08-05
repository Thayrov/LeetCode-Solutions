/*
3310. Remove Methods From Project

You are maintaining a project that has n methods numbered from 0 to n - 1.

You are given two integers n and k, and a 2D integer array invocations, where invocations[i] = [ai, bi] indicates that method ai invokes method bi.

There is a known bug in method k. Method k, along with any method invoked by it, either directly or indirectly, are considered suspicious and we aim to remove them.

A group of methods can only be removed if no method outside the group invokes any methods within it.

Return an array containing all the remaining methods after removing all the suspicious methods. You may return the answer in any order. If it is not possible to remove all the suspicious methods, none should be removed.

Example 1:
Input: n = 4, k = 1, invocations = [[1,2],[0,1],[3,2]]
Output: [0,1,2,3]
Explanation:
Method 2 and method 1 are suspicious, but they are directly invoked by methods 3 and 0, which are not suspicious. We return all elements without removing anything.

Example 2:
Input: n = 5, k = 0, invocations = [[1,2],[0,2],[0,1],[3,4]]
Output: [3,4]
Explanation:
Methods 0, 1, and 2 are suspicious and they are not directly invoked by any other method. We can remove them.

Example 3:
Input: n = 3, k = 2, invocations = [[1,2],[0,1],[2,0]]
Output: []
Explanation:
All methods are suspicious. We can remove them.

Constraints:
1 <= n <= 10^5
0 <= k <= n - 1
0 <= invocations.length <= 2 * 10^5
invocations[i] == [ai, bi]
0 <= ai, bi <= n - 1
ai != bi
invocations[i] != invocations[j]

</> Typescript code:
*/

function remainingMethods(n: number, k: number, invocations: number[][]): number[] {
  // Cache the number of directed invocation edges.
  const edgeCount = invocations.length;
  // Store each method's first outgoing edge, using -1 for none.
  const head = new Int32Array(n);
  // Initialize every adjacency-list head to the sentinel.
  head.fill(-1);
  // Store each edge's destination method compactly.
  const to = new Int32Array(edgeCount);
  // Link each edge to the next edge from the same caller.
  const next = new Int32Array(edgeCount);

  // Build forward-star adjacency lists in one pass.
  for (let edge = 0; edge < edgeCount; edge++) {
    // Read the current directed invocation.
    const [caller, callee] = invocations[edge];
    // Record its destination.
    to[edge] = callee;
    // Prepend it to the caller's outgoing list.
    next[edge] = head[caller];
    // Make it the caller's new list head.
    head[caller] = edge;
  }

  // Mark suspicious methods with one byte each.
  const suspicious = new Uint8Array(n);
  // The buggy method is always suspicious.
  suspicious[k] = 1;
  // Allocate an iterative DFS stack large enough for every method.
  const stack = new Int32Array(n);
  // Start with one pending method.
  let size = 1;
  // Seed the traversal with the buggy method.
  stack[0] = k;

  // Traverse every method reachable from the buggy method.
  while (size !== 0) {
    // Pop the next suspicious method.
    const method = stack[--size];

    // Walk all methods directly invoked by it.
    for (let edge = head[method]; edge !== -1; edge = next[edge]) {
      // Read this invocation's destination.
      const callee = to[edge];

      // Process each reachable method only once.
      if (suspicious[callee] === 0) {
        // Mark the destination suspicious immediately.
        suspicious[callee] = 1;
        // Schedule it for traversal.
        stack[size++] = callee;
      }
    }
  }

  // Check whether any retained method invokes a suspicious one.
  for (const [caller, callee] of invocations) {
    // An incoming edge from outside prevents every removal.
    if (suspicious[caller] === 0 && suspicious[callee] !== 0) {
      // Return all original methods when removal is invalid.
      return Array.from({ length: n }, (_, method) => method);
    }
  }

  // Collect the methods outside the removable suspicious set.
  const remaining: number[] = [];

  // Visit method identifiers in ascending order.
  for (let method = 0; method < n; method++) {
    // Retain only methods not reachable from the bug.
    if (suspicious[method] === 0) {
      // Append this safe method to the answer.
      remaining.push(method);
    }
  }

  // Return every method left after valid removal.
  return remaining;
}
