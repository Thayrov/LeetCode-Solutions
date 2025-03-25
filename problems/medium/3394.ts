/* 
3394. Check if Grid can be Cut into Sections

You are given an integer n representing the dimensions of an n x n grid, with the origin at the bottom-left corner of the grid. You are also given a 2D array of coordinates rectangles, where rectangles[i] is in the form [startx, starty, endx, endy], representing a rectangle on the grid. Each rectangle is defined as follows:

(startx, starty): The bottom-left corner of the rectangle.
(endx, endy): The top-right corner of the rectangle.
Note that the rectangles do not overlap. Your task is to determine if it is possible to make either two horizontal or two vertical cuts on the grid such that:

Each of the three resulting sections formed by the cuts contains at least one rectangle.
Every rectangle belongs to exactly one section.
Return true if such cuts can be made; otherwise, return false.

Example 1:
Input: n = 5, rectangles = [[1,0,5,2],[0,2,2,4],[3,2,5,3],[0,4,4,5]]
Output: true
Explanation:
The grid is shown in the diagram. We can make horizontal cuts at y = 2 and y = 4. Hence, output is true.

Example 2:
Input: n = 4, rectangles = [[0,0,1,1],[2,0,3,4],[0,2,2,3],[3,0,4,3]]
Output: true
Explanation:
We can make vertical cuts at x = 2 and x = 3. Hence, output is true.

Example 3:
Input: n = 4, rectangles = [[0,2,2,4],[1,0,3,2],[2,2,3,4],[3,0,4,2],[3,2,4,4]]
Output: false
Explanation:
We cannot make two horizontal or two vertical cuts that satisfy the conditions. Hence, output is false.

Constraints:
3 <= n <= 10^9
3 <= rectangles.length <= 10^5
0 <= rectangles[i][0] < rectangles[i][2] <= n
0 <= rectangles[i][1] < rectangles[i][3] <= n
No two rectangles overlap.

</> Typescript code:
*/

function checkValidCuts(n: number, rectangles: number[][]): boolean {
  // Total number of rectangles provided.
  const total = rectangles.length;

  // Create sorted arrays for the bottom (startY) and top (endY) boundaries of each rectangle.
  const startYs = rectangles.map((r) => r[1]).sort((a, b) => a - b);
  const endYs = rectangles.map((r) => r[3]).sort((a, b) => a - b);

  // Generate candidate horizontal cut positions using both startY and endY of rectangles, then sort them.
  const candidateHs = rectangles
    .flatMap((r) => [r[1], r[3]])
    .sort((a, b) => a - b);
  // Remove duplicate candidates to have unique horizontal boundaries.
  const uniqueHs = candidateHs.filter(
    (v, i) => i === 0 || v !== candidateHs[i - 1]
  );

  // Define a helper function to find the first index where the array element is >= target.
  function lowerBound(arr: number[], target: number): number {
    let l = 0,
      r = arr.length;
    while (l < r) {
      const mid = (l + r) >> 1;
      if (arr[mid] < target) l = mid + 1;
      else r = mid;
    }
    return l;
  }
  // Define a helper function to count the number of elements in a sorted array that are <= target.
  function countLE(arr: number[], target: number): number {
    let l = 0,
      r = arr.length;
    while (l < r) {
      const mid = (l + r) >> 1;
      if (arr[mid] <= target) l = mid + 1;
      else r = mid;
    }
    return l;
  }

  // Filter the candidate horizontal cuts to keep only those where no rectangle is split by the cut.
  // A cut at 'y' is valid if the number of rectangles starting below 'y' equals the number ending at or below 'y'.
  const validH: number[] = [];
  for (const y of uniqueHs) {
    if (lowerBound(startYs, y) === countLE(endYs, y)) validH.push(y);
  }

  // Attempt to find two horizontal cuts that partition the rectangles into three non-empty groups.
  let horizontalValid = false;
  let j = 0; // Pointer for the second cut candidate.
  for (let i = 0; i < validH.length; i++) {
    const c1 = validH[i]; // First horizontal cut candidate.
    const group1 = countLE(endYs, c1); // Count rectangles completely below or touching the first cut.
    if (group1 === 0) continue; // Skip if the first section would be empty.
    j = Math.max(j, i + 1); // Ensure the second candidate is after the first.
    while (j < validH.length) {
      const c2 = validH[j]; // Second horizontal cut candidate.
      // Calculate the count for group2: rectangles between the two cuts.
      const group2 = lowerBound(startYs, c2) - group1;
      // Calculate the count for group3: rectangles completely above or touching the second cut.
      const group3 = total - lowerBound(startYs, c2);
      // If both group2 and group3 are non-empty, we have a valid horizontal partition.
      if (group2 > 0 && group3 > 0) {
        horizontalValid = true;
        break;
      }
      j++;
    }
    if (horizontalValid) break;
  }

  // Repeat similar steps for vertical cuts:
  // Create sorted arrays for the left (startX) and right (endX) boundaries of each rectangle.
  const startXs = rectangles.map((r) => r[0]).sort((a, b) => a - b);
  const endXs = rectangles.map((r) => r[2]).sort((a, b) => a - b);

  // Generate candidate vertical cut positions from both startX and endX, then sort and deduplicate.
  const candidateVs = rectangles
    .flatMap((r) => [r[0], r[2]])
    .sort((a, b) => a - b);
  const uniqueVs = candidateVs.filter(
    (v, i) => i === 0 || v !== candidateVs[i - 1]
  );

  // Filter the vertical candidates to keep only those that do not cut through any rectangle.
  const validV: number[] = [];
  for (const x of uniqueVs) {
    if (lowerBound(startXs, x) === countLE(endXs, x)) validV.push(x);
  }

  // Attempt to find two vertical cuts that partition the rectangles into three non-empty groups.
  let verticalValid = false;
  j = 0; // Reset pointer for vertical cuts.
  for (let i = 0; i < validV.length; i++) {
    const c1 = validV[i]; // First vertical cut candidate.
    const group1 = countLE(endXs, c1); // Count rectangles completely to the left or touching the first cut.
    if (group1 === 0) continue; // Skip if the left group would be empty.
    j = Math.max(j, i + 1);
    while (j < validV.length) {
      const c2 = validV[j]; // Second vertical cut candidate.
      // Calculate the count for group2: rectangles between the two cuts.
      const group2 = lowerBound(startXs, c2) - group1;
      // Calculate the count for group3: rectangles completely to the right or touching the second cut.
      const group3 = total - lowerBound(startXs, c2);
      // If both group2 and group3 are non-empty, we have a valid vertical partition.
      if (group2 > 0 && group3 > 0) {
        verticalValid = true;
        break;
      }
      j++;
    }
    if (verticalValid) break;
  }

  // Return true if either a valid horizontal or vertical partition exists.
  return horizontalValid || verticalValid;
}
