/* 
1976. Number of Ways to Arrive at Destination

You are in a city that consists of n intersections numbered from 0 to n - 1 with bi-directional roads between some intersections. The inputs are generated such that you can reach any intersection from any other intersection and that there is at most one road between any two intersections.

You are given an integer n and a 2D integer array roads where roads[i] = [ui, vi, timei] means that there is a road between intersections ui and vi that takes timei minutes to travel. You want to know in how many ways you can travel from intersection 0 to intersection n - 1 in the shortest amount of time.

Return the number of ways you can arrive at your destination in the shortest amount of time. Since the answer may be large, return it modulo 109 + 7.

Example 1:
Input: n = 7, roads = [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]
Output: 4
Explanation: The shortest amount of time it takes to go from intersection 0 to intersection 6 is 7 minutes.
The four ways to get there in 7 minutes are:
- 0 ➝ 6
- 0 ➝ 4 ➝ 6
- 0 ➝ 1 ➝ 2 ➝ 5 ➝ 6
- 0 ➝ 1 ➝ 3 ➝ 5 ➝ 6

Example 2:
Input: n = 2, roads = [[1,0,10]]
Output: 1
Explanation: There is only one way to go from intersection 0 to intersection 1, and it takes 10 minutes.

Constraints:
1 <= n <= 200
n - 1 <= roads.length <= n * (n - 1) / 2
roads[i].length == 3
0 <= ui, vi <= n - 1
1 <= timei <= 10^9
ui != vi
There is at most one road connecting any two intersections.
You can reach any intersection from any other intersection.

</> Typescript code:
*/

function countPaths(n: number, roads: number[][]): number {
  // Define the modulo constant as required by the problem
  const mod = 1e9 + 7;
  // Build the graph as an adjacency list; each intersection maps to a list of neighboring intersections and travel times
  const graph: { to: number; time: number }[][] = Array.from(
    { length: n },
    () => []
  );
  for (const [u, v, t] of roads) {
    // Add bidirectional roads: from u to v and v to u
    graph[u].push({ to: v, time: t });
    graph[v].push({ to: u, time: t });
  }
  // Initialize distance array with Infinity and ways array with 0 for all intersections
  const dist = Array(n).fill(Infinity);
  const ways = Array(n).fill(0);
  // Starting point (intersection 0) has a distance of 0 and exactly one way to reach itself
  dist[0] = 0;
  ways[0] = 1;

  // Custom MinHeap implementation for Dijkstra's algorithm
  class MinHeap {
    heap: [number, number][];
    constructor() {
      this.heap = [];
    }
    // Insert a new element into the heap
    push(item: [number, number]) {
      this.heap.push(item);
      let i = this.heap.length - 1;
      // Bubble up to maintain heap invariant
      while (i > 0) {
        let parent = Math.floor((i - 1) / 2);
        if (this.heap[parent][0] <= this.heap[i][0]) break;
        [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
        i = parent;
      }
    }
    // Remove and return the smallest element from the heap
    pop(): [number, number] | undefined {
      if (this.heap.length === 0) return undefined;
      const top = this.heap[0];
      const last = this.heap.pop();
      if (this.heap.length > 0 && last !== undefined) {
        // Replace the root with the last element and heapify downwards
        this.heap[0] = last;
        let i = 0;
        while (true) {
          let left = 2 * i + 1;
          let right = 2 * i + 2;
          let smallest = i;
          if (
            left < this.heap.length &&
            this.heap[left][0] < this.heap[smallest][0]
          )
            smallest = left;
          if (
            right < this.heap.length &&
            this.heap[right][0] < this.heap[smallest][0]
          )
            smallest = right;
          if (smallest === i) break;
          [this.heap[i], this.heap[smallest]] = [
            this.heap[smallest],
            this.heap[i],
          ];
          i = smallest;
        }
      }
      return top;
    }
  }

  // Initialize the min-heap and start with the source node (intersection 0) with a distance of 0
  const heap = new MinHeap();
  heap.push([0, 0]);

  // Process the heap until it's empty
  while (true) {
    const current = heap.pop();
    if (!current) break; // Exit when no more nodes are left
    const [time, node] = current;
    // If a stale entry is encountered, skip it
    if (time > dist[node]) continue;
    // Traverse all adjacent roads from the current node
    for (const { to, time: t } of graph[node]) {
      const newTime = time + t;
      // If a shorter path is found, update distance and number of ways, then push into the heap
      if (newTime < dist[to]) {
        dist[to] = newTime;
        ways[to] = ways[node];
        heap.push([newTime, to]);
        // If the new path equals the shortest known distance, add the number of ways from the current node
      } else if (newTime === dist[to]) {
        ways[to] = (ways[to] + ways[node]) % mod;
      }
    }
  }

  // Return the total number of shortest paths to the destination (intersection n-1)
  return ways[n - 1];
}
