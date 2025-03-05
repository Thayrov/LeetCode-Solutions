/* 
2579. Count Total Number of Colored Cells

There exists an infinitely large two-dimensional grid of uncolored unit cells. You are given a positive integer n, indicating that you must do the following routine for n minutes:
At the first minute, color any arbitrary unit cell blue.
Every minute thereafter, color blue every uncolored cell that touches a blue cell.
Below is a pictorial representation of the state of the grid after minutes 1, 2, and 3.
Return the number of colored cells at the end of n minutes.

Example 1:
Input: n = 1
Output: 1
Explanation: After 1 minute, there is only 1 blue cell, so we return 1.

Example 2:
Input: n = 2
Output: 5
Explanation: After 2 minutes, there are 4 colored cells on the boundary and 1 in the center, so we return 5. 

Constraints:
1 <= n <= 10^5

</> Typescript code:
*/

function coloredCells(n: number): number {
  // For n = 1: returns 1 (1 blue cell)
  // For n = 2: returns 5 (1 center + 4 surrounding)
  // For n = 3: returns 13 (5 previous + 8 new surrounding)
  // Pattern: n² + (n-1)² gives total colored cells

  // Calculate central square (n * n)
  // Represents the inner grid that grows with each minute
  const center = n * n;

  // Calculate surrounding cells ((n-1) * (n-1))
  // Represents the previous layer's core that gets fully surrounded
  const surrounding = (n - 1) * (n - 1);

  // Return total sum
  // This formula avoids iteration, making it O(1) time complexity
  // Handles all cases from n=1 to n=10^5 efficiently
  return center + surrounding;
}
