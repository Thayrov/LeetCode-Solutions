/*
2492. Minimum Score of a Path Between Two Cities

Hint
You are given a positive integer n representing n cities numbered from 1 to n. You are also given a 2D array roads where roads[i] = [ai, bi, distancei] indicates that there is a bidirectional road between cities ai and bi with a distance equal to distancei. The cities graph is not necessarily connected.
The score of a path between two cities is defined as the minimum distance of a road in this path.
Return the minimum possible score of a path between cities 1 and n.

Note:
A path is a sequence of roads between two cities.
It is allowed for a path to contain the same road multiple times, and you can visit cities 1 and n multiple times along the path.
The test cases are generated such that there is at least one path between 1 and n.

Example 1:
Input: n = 4, roads = [[1,2,9],[2,3,6],[2,4,5],[1,4,7]]
Output: 5
Explanation: The path from city 1 to 4 with the minimum score is: 1 -> 2 -> 4. The score of this path is min(9,5) = 5.
It can be shown that no other path has less score.

Example 2:
Input: n = 4, roads = [[1,2,2],[1,3,4],[3,4,7]]
Output: 2
Explanation: The path from city 1 to 4 with the minimum score is: 1 -> 2 -> 1 -> 3 -> 4. The score of this path is min(2,2,4,7) = 2.
 
Constraints:
2 <= n <= 10^5
1 <= roads.length <= 10^5
roads[i].length == 3
1 <= ai, bi <= n
ai != bi
1 <= distancei <= 10^4
There are no repeated edges.
There is at least one path between 1 and n.

</> Typescript code:
*/

function minScore(n: number, roads: number[][]): number {
  // Creates a DSU parent array for cities 1..n.
  const parent = Array.from({ length: n + 1 }, (_, i) => i);

  // Finds the representative/root of city x.
  const find = (x: number): number => {
    // Compresses the path while walking upward.
    while (parent[x] !== x) {
      // Points x directly closer to the root.
      parent[x] = parent[parent[x]];

      // Moves x upward.
      x = parent[x];
    }

    // Returns the connected component representative.
    return x;
  };

  // Merges the components containing cities a and b.
  const union = (a: number, b: number): void => {
    // Finds a's component root.
    const ra = find(a);

    // Finds b's component root.
    const rb = find(b);

    // Connects b's root to a's root if different.
    if (ra !== rb) parent[rb] = ra;
  };

  // Builds connected components from all bidirectional roads.
  for (const [a, b] of roads) union(a, b);

  // Stores the component root of city 1.
  const root = find(1);

  // Stores the minimum road distance inside city 1's component.
  let ans = Infinity;

  // Checks every road.
  for (const [a, , d] of roads) {
    // Any road in city 1's component can be included in a 1-to-n walk.
    if (find(a) === root && d < ans) ans = d;
  }

  // Returns the smallest edge distance reachable from city 1.
  return ans;
}
