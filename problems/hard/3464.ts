/*
3464. Maximize the Distance Between Points on a Square

Hint
You are given an integer side, representing the edge length of a square with corners at (0, 0), (0, side), (side, 0), and (side, side) on a Cartesian plane.
You are also given a positive integer k and a 2D integer array points, where points[i] = [xi, yi] represents the coordinate of a point lying on the boundary of the square.
You need to select k elements among points such that the minimum Manhattan distance between any two points is maximized.
Return the maximum possible minimum Manhattan distance between the selected k points.
The Manhattan Distance between two cells (xi, yi) and (xj, yj) is |xi - xj| + |yi - yj|.

Example 1:
Input: side = 2, points = [[0,2],[2,0],[2,2],[0,0]], k = 4
Output: 2
Explanation:
Select all four points.

Example 2:
Input: side = 2, points = [[0,0],[1,2],[2,0],[2,2],[2,1]], k = 4
Output: 1
Explanation:
Select the points (0, 0), (2, 0), (2, 2), and (2, 1).

Example 3:
Input: side = 2, points = [[0,0],[0,1],[0,2],[1,2],[2,0],[2,2],[2,1]], k = 5
Output: 1
Explanation:
Select the points (0, 0), (0, 1), (0, 2), (1, 2), and (2, 2).

Constraints:
1 <= side <= 10^9
4 <= points.length <= min(4 * side, 15 * 10^3)
points[i] == [xi, yi]
The input is generated such that:
points[i] lies on the boundary of the square.
All points[i] are unique.
4 <= k <= min(25, points.length)

</> Typescript code:
*/

function maxDistance(side: number, points: number[][], k: number): number {
  const n = points.length;
  // Transform 2D boundary points into 1D linear distances from (0,0) clockwise
  const pos = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const [x, y] = points[i];
    if (y === 0)
      pos[i] = x; // Bottom edge
    else if (x === side)
      pos[i] = side + y; // Right edge
    else if (y === side)
      pos[i] = 3 * side - x; // Top edge
    else pos[i] = 4 * side - y; // Left edge
  }
  // Sort points based on their 1D position to allow greedy placement
  pos.sort();

  // Validator function for Binary Search
  const check = (minDist: number): boolean => {
    // Try starting the greedy placement from different starting points
    // We only need to check starts within the first "gap" range
    for (let i = 0; i < n; i++) {
      if (pos[i] > pos[0] + minDist) break;

      let count = 1;
      let lastIdx = i;
      // Greedily pick the next k-1 points
      for (let j = 1; j < k; j++) {
        let target = pos[lastIdx] + minDist;
        // Binary search for the smallest pos[mid] >= target
        let left = lastIdx + 1,
          right = n - 1,
          nextIdx = -1;
        while (left <= right) {
          let mid = (left + right) >> 1;
          if (pos[mid] >= target) {
            nextIdx = mid;
            right = mid - 1;
          } else left = mid + 1;
        }
        if (nextIdx === -1) {
          count = -1;
          break;
        }
        lastIdx = nextIdx;
        count++;
      }
      // Check if the wrap-around distance (last to first) also satisfies minDist
      if (count === k) {
        const totalPerimeter = 4 * side;
        const dLastFirst = totalPerimeter - (pos[lastIdx] - pos[i]);
        if (dLastFirst >= minDist) return true;
      }
    }
    return false;
  };

  // Range for Binary Search: Manhattan distance can't exceed side length in this config
  let low = 0,
    high = side,
    ans = 0;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (check(mid)) {
      ans = mid;
      low = mid + 1; // Try for a larger minimum distance
    } else {
      high = mid - 1; // Distance too large, decrease
    }
  }
  return ans;
}
