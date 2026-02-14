/*
799. Champagne Tower

We stack glasses in a pyramid, where the first row has 1 glass, the second row has 2 glasses, and so on until the 100th row.  Each glass holds one cup of champagne.
Then, some champagne is poured into the first glass at the top.  When the topmost glass is full, any excess liquid poured will fall equally to the glass immediately to the left and right of it.  When those glasses become full, any excess champagne will fall equally to the left and right of those glasses, and so on.  (A glass at the bottom row has its excess champagne fall on the floor.)
For example, after one cup of champagne is poured, the top most glass is full.  After two cups of champagne are poured, the two glasses on the second row are half full.  After three cups of champagne are poured, those two cups become full - there are 3 full glasses total now.  After four cups of champagne are poured, the third row has the middle glass half full, and the two outside glasses are a quarter full, as pictured below.
Now after pouring some non-negative integer cups of champagne, return how full the jth glass in the ith row is (both i and j are 0-indexed.)

Example 1:
Input: poured = 1, query_row = 1, query_glass = 1
Output: 0.00000
Explanation: We poured 1 cup of champange to the top glass of the tower (which is indexed as (0, 0)). There will be no excess liquid so all the glasses under the top glass will remain empty.

Example 2:
Input: poured = 2, query_row = 1, query_glass = 1
Output: 0.50000
Explanation: We poured 2 cups of champange to the top glass of the tower (which is indexed as (0, 0)). There is one cup of excess liquid. The glass indexed as (1, 0) and the glass indexed as (1, 1) will share the excess liquid equally, and each will get half cup of champange.

Example 3:
Input: poured = 100000009, query_row = 33, query_glass = 17
Output: 1.00000

Constraints:
0 <= poured <= 10^9
0 <= query_glass <= query_row < 100

</> Typescript code:
*/
function champagneTower(
  poured: number,
  query_row: number,
  query_glass: number,
): number {
  // Use a typed array for the current row; size query_row+2 avoids bounds checks
  let row = new Float64Array(query_row + 2);
  // All champagne starts in the top glass (row 0, glass 0)
  row[0] = poured;
  // Simulate pouring row by row until we reach the query_row
  for (let i = 0; i < query_row; i++) {
    // Allocate a fresh row for the next level (all zeros by default)
    const next = new Float64Array(query_row + 2);
    // Iterate over each glass in the current row
    for (let j = 0; j <= i; j++) {
      // Only process glasses that have overflowed (more than 1 cup)
      if (row[j] > 1) {
        // Compute the excess that spills equally to left-child and right-child
        const excess = (row[j] - 1) / 2;
        // Left child glass in the next row receives half the excess
        next[j] += excess;
        // Right child glass in the next row receives the other half
        next[j + 1] += excess;
      }
    }
    // Move to the next row for the next iteration
    row = next;
  }
  // The answer is capped at 1.0 (a glass can hold at most 1 cup)
  return Math.min(1, row[query_glass]);
}
