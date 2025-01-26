/*
2127. Maximum Employees to Be Invited to a Meeting

A company is organizing a meeting and has a list of n employees, waiting to be invited. They have arranged for a large circular table, capable of seating any number of employees.

The employees are numbered from 0 to n - 1. Each employee has a favorite person and they will attend the meeting only if they can sit next to their favorite person at the table. The favorite person of an employee is not themself.

Given a 0-indexed integer array favorite, where favorite[i] denotes the favorite person of the ith employee, return the maximum number of employees that can be invited to the meeting.

Example 1:
Input: favorite = [2,2,1,2]
Output: 3
Explanation:
The above figure shows how the company can invite employees 0, 1, and 2, and seat them at the round table.
All employees cannot be invited because employee 2 cannot sit beside employees 0, 1, and 3, simultaneously.
Note that the company can also invite employees 1, 2, and 3, and give them their desired seats.
The maximum number of employees that can be invited to the meeting is 3. 

Example 2:
Input: favorite = [1,2,0]
Output: 3
Explanation: 
Each employee is the favorite person of at least one other employee, and the only way the company can invite them is if they invite every employee.
The seating arrangement will be the same as that in the figure given in example 1:
- Employee 0 will sit between employees 2 and 1.
- Employee 1 will sit between employees 0 and 2.
- Employee 2 will sit between employees 1 and 0.
The maximum number of employees that can be invited to the meeting is 3.

Example 3:
Input: favorite = [3,0,1,4,1]
Output: 4
Explanation:
The above figure shows how the company will invite employees 0, 1, 3, and 4, and seat them at the round table.
Employee 2 cannot be invited because the two spots next to their favorite employee 1 are taken.
So the company leaves them out of the meeting.
The maximum number of employees that can be invited to the meeting is 4.

Constraints:
n == favorite.length
2 <= n <= 10^5
0 <= favorite[i] <= n - 1
favorite[i] != i

</> Typescript code:
*/

function maximumInvitations(favorite: number[]): number {
  const n = favorite.length;
  const visited = new Array(n).fill(0); // Track visit states: 0-unvisited, 1-visiting, 2-visited
  const cycleLengths = new Array(n).fill(0); // Store cycle length for each node

  // Detect cycles and mark their lengths using a path tracking approach
  for (let i = 0; i < n; i++) {
      if (visited[i] !== 0) continue;
      let current = i;
      const path: number[] = [];
      while (true) {
          if (visited[current] === 1) { // Found a cycle
              const startIdx = path.indexOf(current);
              if (startIdx !== -1) {
                  const cycle = path.slice(startIdx);
                  const cycleLen = cycle.length;
                  for (const node of cycle) cycleLengths[node] = cycleLen; // Mark cycle length
                  for (const node of cycle) visited[node] = 2; // Mark as visited
                  for (let j = 0; j < startIdx; j++) visited[path[j]] = 2; // Mark non-cycle nodes
              } else {
                  for (const node of path) visited[node] = 2;
              }
              break;
          } else if (visited[current] === 2) { // Part of another cycle or tree
              for (const node of path) visited[node] = 2;
              break;
          } else { // Continue traversing
              visited[current] = 1;
              path.push(current);
              current = favorite[current];
          }
      }
  }

  // Compute depth and root for each node to determine their distance and connection to cycles
  const depth = new Array(n).fill(-1);
  const root = new Array(n).fill(-1);
  for (let i = 0; i < n; i++) {
      if (cycleLengths[i] > 0) { // Initialize cycle nodes with depth 0 and root as themselves
          depth[i] = 0;
          root[i] = i;
      }
  }

  // Iteratively compute depth and root for non-cycle nodes by tracing paths to cycles
  for (let i = 0; i < n; i++) {
      if (depth[i] === -1) {
          const pathNodes: number[] = [];
          let current: number = i;
          while (depth[current] === -1 && cycleLengths[current] === 0) {
              pathNodes.push(current);
              current = favorite[current];
          }
          if (depth[current] !== -1 || cycleLengths[current] > 0) {
              let currentDepth = depth[current] + 1; // Start depth from the cycle node
              const currentRoot = root[current]; // Root is the cycle node
              // Backtrack to set depth and root for each node in the path
              for (let j = pathNodes.length - 1; j >= 0; j--) {
                  const node = pathNodes[j];
                  depth[node] = currentDepth;
                  root[node] = currentRoot;
                  currentDepth++;
              }
          }
      }
  }

  // Compute maximum depth for each cycle node's tree
  const maxDepthMap = new Map<number, number>();
  for (let i = 0; i < n; i++) {
      if (cycleLengths[i] > 0) maxDepthMap.set(i, 0); // Initialize cycle nodes with depth 0
  }
  for (let i = 0; i < n; i++) {
      const r = root[i];
      if (r !== -1 && cycleLengths[r] > 0) { // Update max depth for each root
          maxDepthMap.set(r, Math.max(maxDepthMap.get(r) || 0, depth[i]));
      }
  }

  let maxCycle = 0; // Largest cycle length
  let mutualSum = 0; // Sum of contributions from mutual pairs
  const processed = new Set<number>(); // Track processed mutual pairs
  for (let i = 0; i < n; i++) {
      if (cycleLengths[i] === 2 && !processed.has(i)) { // Check for mutual pairs (cycle length 2)
          const j = favorite[i];
          if (favorite[j] === i) {
              processed.add(i).add(j); // Mark both as processed
              const maxA = maxDepthMap.get(i) || 0; // Max depth for first in pair
              const maxB = maxDepthMap.get(j) || 0; // Max depth for second in pair
              mutualSum += 2 + maxA + maxB; // Add mutual pair and their chains
          }
      }
      maxCycle = Math.max(maxCycle, cycleLengths[i]); // Track largest cycle
  }

  // Return the maximum of the largest cycle or mutual pairs' contributions
  return Math.max(maxCycle, mutualSum);
}