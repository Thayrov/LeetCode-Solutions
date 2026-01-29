/*
2976. Minimum Cost to Convert String I

You are given two 0-indexed strings source and target, both of length n and consisting of lowercase English letters. You are also given two 0-indexed character arrays original and changed, and an integer array cost, where cost[i] represents the cost of changing the character original[i] to the character changed[i].

You start with the string source. In one operation, you can pick a character x from the string and change it to the character y at a cost of z if there exists any index j such that cost[j] == z, original[j] == x, and changed[j] == y.

Return the minimum cost to convert the string source to the string target using any number of operations. If it is impossible to convert source to target, return -1.

Note that there may exist indices i, j such that original[j] == original[i] and changed[j] == changed[i].

Example 1:
Input: source = "abcd", target = "acbe", original = ["a","b","c","c","e","d"], changed = ["b","c","b","e","b","e"], cost = [2,5,5,1,2,20]
Output: 28
Explanation: To convert the string "abcd" to string "acbe":
- Change value at index 1 from 'b' to 'c' at a cost of 5.
- Change value at index 2 from 'c' to 'e' at a cost of 1.
- Change value at index 2 from 'e' to 'b' at a cost of 2.
- Change value at index 3 from 'd' to 'e' at a cost of 20.
The total cost incurred is 5 + 1 + 2 + 20 = 28.
It can be shown that this is the minimum possible cost.

Example 2:
Input: source = "aaaa", target = "bbbb", original = ["a","c"], changed = ["c","b"], cost = [1,2]
Output: 12
Explanation: To change the character 'a' to 'b' change the character 'a' to 'c' at a cost of 1, followed by changing the character 'c' to 'b' at a cost of 2, for a total cost of 1 + 2 = 3. To change all occurrences of 'a' to 'b', a total cost of 3 * 4 = 12 is incurred.

Example 3:
Input: source = "abcd", target = "abce", original = ["a"], changed = ["e"], cost = [10000]
Output: -1
Explanation: It is impossible to convert source to target because the value at index 3 cannot be changed from 'd' to 'e'.

Constraints:
1 <= source.length == target.length <= 10^5
source, target consist of lowercase English letters.
1 <= cost.length == original.length == changed.length <= 2000
original[i], changed[i] are lowercase English letters.
1 <= cost[i] <= 10^6
original[i] != changed[i]

</> Typescript Code:
*/

function minimumCost(
  source: string,
  target: string,
  original: string[],
  changed: string[],
  cost: number[],
): number {
  const n = source.length; // Get the length of the source string
  const m = original.length; // Get the number of transformations

  // Create a graph to store the transformations and their costs
  const graph = new Map<string, Map<string, number>>();

  // Populate the graph with the transformations
  for (let i = 0; i < m; i++) {
    if (!graph.has(original[i])) graph.set(original[i], new Map());
    const current = graph.get(original[i]);
    if (
      current &&
      (!current.has(changed[i]) || cost[i] < current.get(changed[i])!)
    ) {
      current.set(changed[i], cost[i]); // Store the minimum cost for each transformation
    }
  }

  // Create a map to store the minimum costs for each transformation
  const minCosts = new Map<string, number>();

  // Function to find the minimum cost using Dijkstra's algorithm
  function dijkstra(start: string, end: string): number {
    if (start === end) return 0; // No cost if the characters are the same
    if (minCosts.has(start + end)) return minCosts.get(start + end)!; // Return the precomputed cost if available

    const pq: [string, number][] = [];
    pq.push([start, 0]); // Priority queue to store the nodes to visit

    const visited = new Set<string>(); // Set to store the visited nodes

    while (pq.length > 0) {
      pq.sort((a, b) => a[1] - b[1]); // Sort the queue based on the cost
      const [current, currentCost] = pq.shift()!; // Get the node with the minimum cost

      if (current === end) {
        minCosts.set(start + end, currentCost); // Store the minimum cost
        return currentCost;
      }

      if (visited.has(current)) continue; // Skip if the node has already been visited
      visited.add(current);

      if (graph.has(current)) {
        for (const [neighbor, cost] of graph.get(current)!) {
          if (!visited.has(neighbor)) {
            pq.push([neighbor, currentCost + cost]); // Add the neighbor to the queue
          }
        }
      }
    }

    minCosts.set(start + end, Infinity); // Store infinity if the transformation is not possible
    return Infinity;
  }

  let totalCost = 0; // Initialize the total cost

  // Iterate over each character in the source string
  for (let i = 0; i < n; i++) {
    if (source[i] === target[i]) continue; // If the characters are the same, skip

    const cost = dijkstra(source[i], target[i]); // Get the minimum cost for the transformation

    if (cost === Infinity) return -1; // If the transformation is not possible, return -1
    totalCost += cost; // Add the cost to the total cost
  }

  return totalCost; // Return the total cost
}
