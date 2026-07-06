/*
1288. Remove Covered Intervals

Hint
Given an array intervals where intervals[i] = [li, ri] represent the interval [li, ri), remove all intervals that are covered by another interval in the list.
The interval [a, b) is covered by the interval [c, d) if and only if c <= a and b <= d.
Return the number of remaining intervals.

Example 1:
Input: intervals = [[1,4],[3,6],[2,8]]
Output: 2
Explanation: Interval [3,6] is covered by [2,8], therefore it is removed.

Example 2:
Input: intervals = [[1,4],[2,3]]
Output: 1

Constraints:
1 <= intervals.length <= 1000
intervals[i].length == 2
0 <= li < ri <= 10^5
All the given intervals are unique.

</> Typescript code:
*/

function removeCoveredIntervals(intervals: number[][]): number {
  // Sort by left ascending so possible covering intervals appear first.
  // For equal left, sort by right descending so the widest interval comes first.
  intervals.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

  // Counts intervals not covered by any previous interval.
  let count = 0;

  // Tracks the farthest right boundary seen so far.
  let farthestEnd = 0;

  // Iterate through sorted intervals; start is unused after sorting.
  for (const [, end] of intervals) {
    // If this interval ends farther than all previous ones, it is not covered.
    if (end > farthestEnd) {
      // Keep this interval.
      count++;

      // Update the farthest reachable end.
      farthestEnd = end;
    }
  }

  // Return the number of remaining intervals.
  return count;
}
