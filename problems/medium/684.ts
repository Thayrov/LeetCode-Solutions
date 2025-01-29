/* 
684. Redundant Connection

In this problem, a tree is an undirected graph that is connected and has no cycles.

You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed. The graph is represented as an array edges of length n where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the graph.

Return an edge that can be removed so that the resulting graph is a tree of n nodes. If there are multiple answers, return the answer that occurs last in the input.

Example 1:
Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]

Example 2:
Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
Output: [1,4]

Constraints:
n == edges.length
3 <= n <= 1000
edges[i].length == 2
1 <= ai < bi <= edges.length
ai != bi
There are no repeated edges.
The given graph is connected.

</> Typescript code:
*/

function findRedundantConnection(edges: number[][]): number[] {
  // Store the number of edges (and nodes) in n
  const n = edges.length;

  // Prepare 'parent' array to keep track of each node's parent, initializing each node as its own parent
  const parent = new Array(n+1).fill(0).map((_,i)=>i);

  // Prepare 'rank' array to keep track of the tree depth for union by rank optimization
  const rank = new Array(n+1).fill(1);

  // This will hold the final redundant connection found last in the input
  let ans = [0, 0];

  // 'find' function with path compression: determines the representative (root) of a set
  const find = (x: number): number => {
      while (parent[x] !== x) {       // While x is not its own parent
          parent[x] = parent[parent[x]]; // Path compression: point x directly to its grandparent
          x = parent[x];                 // Move x to its parent
      }
      return x; // Return the representative
  };

  // 'union' function: merges two sets if they are different, using rank to decide which root becomes parent
  const union = (a: number, b: number): void => {
      a = find(a); // Find root of a
      b = find(b); // Find root of b
      if (a !== b) {
          // Attach the tree with smaller rank under the tree with larger rank
          if (rank[a] < rank[b]) [a, b] = [b, a];
          parent[b] = a;
          // If both sets had the same rank, increase the rank of the new root
          if (rank[a] === rank[b]) rank[a]++;
      }
  };

  // Process each edge in the order given, to ensure the last redundant one is recorded
  for (let [a, b] of edges) {
      // Find roots of the two endpoints
      const ra = find(a), rb = find(b);
      // If they are already in the same set, this edge is redundant
      if (ra === rb) ans = [a, b];
      else union(ra, rb); // Otherwise, merge the sets
  }

  // Return the last redundant edge found
  return ans;
}
