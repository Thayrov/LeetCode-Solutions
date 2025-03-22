/* 
2685. Count the Number of Complete Components

You are given an integer n. There is an undirected graph with n vertices, numbered from 0 to n - 1. You are given a 2D integer array edges where edges[i] = [ai, bi] denotes that there exists an undirected edge connecting vertices ai and bi.

Return the number of complete connected components of the graph.

A connected component is a subgraph of a graph in which there exists a path between any two vertices, and no vertex of the subgraph shares an edge with a vertex outside of the subgraph.

A connected component is said to be complete if there exists an edge between every pair of its vertices.

Example 1:
Input: n = 6, edges = [[0,1],[0,2],[1,2],[3,4]]
Output: 3
Explanation: From the picture above, one can see that all of the components of this graph are complete.

Example 2:
Input: n = 6, edges = [[0,1],[0,2],[1,2],[3,4],[3,5]]
Output: 1
Explanation: The component containing vertices 0, 1, and 2 is complete since there is an edge between every pair of two vertices. On the other hand, the component containing vertices 3, 4, and 5 is not complete since there is no edge between vertices 4 and 5. Thus, the number of complete components in this graph is 1.

Constraints:
1 <= n <= 50
0 <= edges.length <= n * (n - 1) / 2
edges[i].length == 2
0 <= ai, bi <= n - 1
ai != bi
There are no repeated edges.

</> Typescript code:
*/

function countCompleteComponents(n: number, edges: number[][]): number {
  // Create an adjacency list for a graph with n vertices; each vertex gets its own list.
  const graph: number[][] = Array.from({ length: n }, () => []);
  // Populate the graph with bidirectional edges.
  for (const [u, v] of edges) {
    graph[u].push(v); // Add v as a neighbor of u.
    graph[v].push(u); // Add u as a neighbor of v.
  }
  // Initialize an array to track whether each vertex has been visited.
  const visited: boolean[] = new Array(n).fill(false);
  // Initialize counter for complete connected components.
  let completeCount = 0;
  // Loop through each vertex to explore its connected component if unvisited.
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      // New component found.
      // Initialize DFS with a stack starting from the current vertex.
      const stack: number[] = [i];
      visited[i] = true; // Mark the starting vertex as visited.
      // Collect all vertices in the current connected component.
      const component: number[] = [];
      while (stack.length) {
        const node = stack.pop()!; // Pop a vertex from the stack.
        component.push(node); // Add it to the current component.
        // Visit all unvisited neighbors.
        for (const neighbor of graph[node]) {
          if (!visited[neighbor]) {
            visited[neighbor] = true;
            stack.push(neighbor);
          }
        }
      }
      // Create a set from the component array for O(1) lookups.
      const compSet = new Set(component);
      // Assume the component is complete unless a counterexample is found.
      let isComplete = true;
      const k = component.length; // Number of vertices in this component.
      // Check every vertex's connectivity within the component.
      for (const node of component) {
        let countNeighbors = 0;
        // Count how many neighbors of 'node' are also in the component.
        for (const neighbor of graph[node]) {
          if (compSet.has(neighbor)) countNeighbors++;
        }
        // For a complete graph, each vertex must be connected to all other vertices.
        if (countNeighbors !== k - 1) {
          isComplete = false; // Mark as incomplete if any vertex fails the check.
          break;
        }
      }
      // Increment the complete component count if the current component is complete.
      if (isComplete) completeCount++;
    }
  }
  // Return the total count of complete components.
  return completeCount;
}
