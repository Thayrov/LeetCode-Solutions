/*
3331. Find Subtree Sizes After Changes

You are given a tree rooted at node 0 that consists of n nodes numbered from 0 to n - 1. The tree is represented by an array parent of size n, where parent[i] is the parent of node i. Since node 0 is the root, parent[0] == -1.

You are also given a string s of length n, where s[i] is the character assigned to node i.

We make the following changes on the tree one time simultaneously for all nodes x from 1 to n - 1:
Find the closest node y to node x such that y is an ancestor of x, and s[x] == s[y].
If node y does not exist, do nothing.
Otherwise, remove the edge between x and its current parent and make node y the new parent of x by adding an edge between them.

Return an array answer of size n where answer[i] is the size of the subtree rooted at node i in the final tree.

Example 1:
Input: parent = [-1,0,0,1,1,1], s = "abaabc"
Output: [6,3,1,1,1,1]
Explanation:
The parent of node 3 will change from node 1 to node 0.

Example 2:
Input: parent = [-1,0,4,0,1], s = "abbba"
Output: [5,2,1,1,1]
Explanation:
The following changes will happen at the same time:
The parent of node 4 will change from node 1 to node 0.
The parent of node 2 will change from node 4 to node 1.

Constraints:
n == parent.length == s.length
1 <= n <= 10^5
0 <= parent[i] <= n - 1 for all i >= 1.
parent[0] == -1
parent represents a valid tree.
s consists only of lowercase English letters.

</> Typescript code:
*/

function findSubtreeSizes(parent: number[], s: string): number[] {
  // Cache the number of nodes.
  const n = parent.length;
  // Store each node's first child and next sibling, using -1 for missing links.
  const firstChild = new Int32Array(n).fill(-1);
  const nextSibling = new Int32Array(n).fill(-1);
  // Build the original tree by prepending each child to its parent's list.
  for (let node = 1; node < n; node++) {
    // Find the original parent.
    const p = parent[node];
    // Link this child to the previous first child.
    nextSibling[node] = firstChild[p];
    // Make this node the first child.
    firstChild[p] = node;
  }

  // Track the nearest active node for each lowercase letter.
  const nearest = new Int32Array(26).fill(-1);
  // Count each node itself before collecting its final descendants.
  const answer = new Array<number>(n).fill(1);
  // Start the traversal at the root.
  let node = 0;
  // Enter each node once and unwind completed branches in postorder.
  while (true) {
    // Read the node's letter and original first child.
    let letter = s.charCodeAt(node) - 97;
    const child = firstChild[node];
    // Reuse the consumed child slot to save the previous same-letter ancestor.
    firstChild[node] = nearest[letter];
    // Make this node the nearest match for its original descendants.
    nearest[letter] = node;
    // Descend into the first child if this node has children.
    if (child !== -1) {
      node = child;
      continue;
    }

    // Exit nodes until a pending sibling is found or the root closes.
    while (node !== 0) {
      // Restore the same-letter ancestor before leaving this branch.
      const previous = firstChild[node];
      nearest[letter] = previous;
      // Keep the original parent when no matching ancestor exists.
      const p = parent[node];
      // Send the completed subtree size directly to its final parent.
      answer[previous === -1 ? p : previous] += answer[node];
      // Start the next sibling before returning to the original parent.
      const sibling = nextSibling[node];
      if (sibling !== -1) {
        node = sibling;
        break;
      }
      // All children have exited, so close the original parent next.
      node = p;
      letter = s.charCodeAt(node) - 97;
    }

    // The root has received every contribution when traversal returns to it.
    if (node === 0) return answer;
  }
}
