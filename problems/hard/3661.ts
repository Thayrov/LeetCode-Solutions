/*
3661. Maximum Walls Destroyed by Robots

Hint
There is an endless straight line populated with some robots and walls. You are given integer arrays robots, distance, and walls:
robots[i] is the position of the ith robot.
distance[i] is the maximum distance the ith robot's bullet can travel.
walls[j] is the position of the jth wall.
Every robot has one bullet that can either fire to the left or the right at most distance[i] meters.
A bullet destroys every wall in its path that lies within its range. Robots are fixed obstacles: if a bullet hits another robot before reaching a wall, it immediately stops at that robot and cannot continue.
Return the maximum number of unique walls that can be destroyed by the robots.

Notes:
A wall and a robot may share the same position; the wall can be destroyed by the robot at that position.
Robots are not destroyed by bullets.

Example 1:
Input: robots = [4], distance = [3], walls = [1,10]
Output: 1
Explanation:
robots[0] = 4 fires left with distance[0] = 3, covering [1, 4] and destroys walls[0] = 1.
Thus, the answer is 1.

Example 2:
Input: robots = [10,2], distance = [5,1], walls = [5,2,7]
Output: 3
Explanation:
robots[0] = 10 fires left with distance[0] = 5, covering [5, 10] and destroys walls[0] = 5 and walls[2] = 7.
robots[1] = 2 fires left with distance[1] = 1, covering [1, 2] and destroys walls[1] = 2.
Thus, the answer is 3.

Example 3:
Input: robots = [1,2], distance = [100,1], walls = [10]
Output: 0
Explanation:
In this example, only robots[0] can reach the wall, but its shot to the right is blocked by robots[1]; thus the answer is 0.

Constraints:
1 <= robots.length == distance.length <= 10^5
1 <= walls.length <= 10^5
1 <= robots[i], walls[j] <= 109
1 <= distance[i] <= 10^5
All values in robots are unique
All values in walls are unique

</> Typescript code:
*/

function maxWalls(
  robots: number[],
  distance: number[],
  walls: number[],
): number {
  const n = robots.length;
  const m = walls.length;

  // Use TypedArrays for high-performance sorting and data locality without object overhead
  const indices = new Int32Array(n);
  for (let i = 0; i < n; i++) indices[i] = i;
  indices.sort((a, b) => robots[a] - robots[b]);

  const P = new Float64Array(n); // Robot Positions
  const D = new Float64Array(n); // Robot Distances
  for (let i = 0; i < n; i++) {
    P[i] = robots[indices[i]];
    D[i] = distance[indices[i]];
  }

  // Sort walls to enable binary searching for interval counts
  walls.sort((a, b) => a - b);

  // Any wall exactly at a robot's position is guaranteed to be destroyed
  // regardless of the firing direction because the interval is [pos-dist, pos] or [pos, pos+dist].
  // We count these upfront with two-pointers and safely ignore them in the DP logic.
  let baseDestroyed = 0;
  let wIdx = 0;
  for (let i = 0; i < n && wIdx < m; ) {
    if (P[i] === walls[wIdx]) {
      baseDestroyed++;
      i++;
      wIdx++;
    } else if (P[i] < walls[wIdx]) {
      i++;
    } else {
      wIdx++;
    }
  }

  // Standard lower/upper bound functions for binary search
  const lowerBound = (target: number): number => {
    let l = 0,
      r = m;
    while (l < r) {
      const mid = (l + r) >>> 1;
      if (walls[mid] < target) l = mid + 1;
      else r = mid;
    }
    return l;
  };

  const upperBound = (target: number): number => {
    let l = 0,
      r = m;
    while (l < r) {
      const mid = (l + r) >>> 1;
      if (walls[mid] <= target) l = mid + 1;
      else r = mid;
    }
    return l;
  };

  // Helper to count how many walls exist STRICTLY in the range [A, B]
  const count = (A: number, B: number): number => {
    if (A > B) return 0;
    return upperBound(B) - lowerBound(A);
  };

  // DP State:
  // dpL = Max walls destroyed in segments BEFORE the current robot, given it fires Left.
  // dpR = Max walls destroyed in segments BEFORE the current robot, given it fires Right.
  let dpL = count(P[0] - D[0], P[0] - 1); // Robot 0 fires Left into the open segment (-∞, P[0])
  let dpR = 0; // Robot 0 fires Right, impacting the NEXT segment, so 0 walls recorded yet.

  // Traverse each segment between adjacent robots
  for (let i = 1; i < n; i++) {
    const prevL = dpL;
    const prevR = dpR;

    const pPrev = P[i - 1];
    const dPrev = D[i - 1];
    const pCurr = P[i];
    const dCurr = D[i];

    // Determine how far the previous robot reaches right, and the current reaches left.
    // Bounded by the adjacent robots acting as physical shields.
    const rEnd = Math.min(pCurr - 1, pPrev + dPrev);
    const lStart = Math.max(pPrev + 1, pCurr - dCurr);

    // Count isolated hits vs overlapping hits inside this enclosed segment
    const wOnlyR = count(pPrev + 1, rEnd);
    const wOnlyL = count(lStart, pCurr - 1);
    const wIntersect = count(lStart, rEnd);

    // If both fire inwards, the union of walls destroyed is Sum - Intersection
    const wBoth = wOnlyR + wOnlyL - wIntersect;

    // Transition:
    // If Curr fires Left, we add its leftward destruction to the best valid previous state.
    dpL = Math.max(
      prevL + wOnlyL, // Prev fired Left (no overlap)
      prevR + wBoth, // Prev fired Right (they crossfire into this segment)
    );

    // If Curr fires Right, it ignores this segment. Only the previous robot can destroy walls here.
    dpR = Math.max(
      prevL, // Prev fired Left (segment empty of bullets)
      prevR + wOnlyR, // Prev fired Right
    );
  }

  // Process the final infinite segment to the right of the last robot
  const cNR = count(P[n - 1] + 1, P[n - 1] + D[n - 1]);

  // Total is the max possible states plus the walls occupying the same exact cell as any robot
  const maxDp = Math.max(dpL, dpR + cNR);
  return maxDp + baseDestroyed;
}
