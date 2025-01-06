/* 
3243. Shortest Distance After Road Addition Queries I

You are given an integer n and a 2D integer array queries.

There are n cities numbered from 0 to n - 1. Initially, there is a unidirectional road from city i to city i + 1 for all 0 <= i < n - 1.

queries[i] = [ui, vi] represents the addition of a new unidirectional road from city ui to city vi. After each query, you need to find the length of the shortest path from city 0 to city n - 1.

Return an array answer where for each i in the range [0, queries.length - 1], answer[i] is the length of the shortest path from city 0 to city n - 1 after processing the first i + 1 queries.

Example 1:
Input: n = 5, queries = [[2,4],[0,2],[0,4]]
Output: [3,2,1]
Explanation:
After the addition of the road from 2 to 4, the length of the shortest path from 0 to 4 is 3.
After the addition of the road from 0 to 2, the length of the shortest path from 0 to 4 is 2.
After the addition of the road from 0 to 4, the length of the shortest path from 0 to 4 is 1.

Example 2:
Input: n = 4, queries = [[0,3],[0,2]]
Output: [1,1]
Explanation:
After the addition of the road from 0 to 3, the length of the shortest path from 0 to 3 is 1.
After the addition of the road from 0 to 2, the length of the shortest path remains 1.

Constraints:
3 <= n <= 500
1 <= queries.length <= 500
queries[i].length == 2
0 <= queries[i][0] < queries[i][1] < n
1 < queries[i][1] - queries[i][0]
There are no repeated roads among the queries.

</> Typescript Code:
*/

function shortestDistanceAfterQueries(n: number, queries: number[][]): number[] {
  const answer: number[] = []; // Initialize the answer array.
  const adj: number[][] = Array.from({length: n}, () => []); // Create adjacency list for the graph.

  // Add initial edges from city i to city i+1.
  for (let i = 0; i < n - 1; i++) {
    adj[i].push(i + 1); // Edge from city i to city i+1.
  }

  // Process each query.
  for (const [u, v] of queries) {
    adj[u].push(v); // Add the new edge from ui to vi.

    const dist = new Array(n).fill(Infinity); // Initialize distances to Infinity.
    dist[0] = 0; // Distance from city 0 to itself is 0.

    // Compute shortest distances using dynamic programming.
    for (let i = 0; i < n; i++) {
      for (const neighbor of adj[i]) {
        if (dist[neighbor] > dist[i] + 1) {
          dist[neighbor] = dist[i] + 1; // Update distance if a shorter path is found.
        }
      }
    }

    answer.push(dist[n - 1]); // Append shortest distance to city n-1 to the answer array.
  }

  return answer; // Return the array of shortest distances after each query.
}
