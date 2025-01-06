/* 
2054. Two Best Non-Overlapping Events

You are given a 0-indexed 2D integer array of events where events[i] = [startTimei, endTimei, valuei]. The ith event starts at startTimei and ends at endTimei, and if you attend this event, you will receive a value of valuei. You can choose at most two non-overlapping events to attend such that the sum of their values is maximized.

Return this maximum sum.

Note that the start time and end time is inclusive: that is, you cannot attend two events where one of them starts and the other ends at the same time. More specifically, if you attend an event with end time t, the next event must start at or after t + 1.

Example 1:
Input: events = [[1,3,2],[4,5,2],[2,4,3]]
Output: 4
Explanation: Choose the green events, 0 and 1 for a sum of 2 + 2 = 4.

Example 2:
Example 1 Diagram
Input: events = [[1,3,2],[4,5,2],[1,5,5]]
Output: 5
Explanation: Choose event 2 for a sum of 5.

Example 3:
Input: events = [[1,5,3],[1,5,1],[6,6,5]]
Output: 8
Explanation: Choose events 0 and 2 for a sum of 3 + 5 = 8.

Constraints:
2 <= events.length <= 10^5
events[i].length == 3
1 <= startTimei <= endTimei <= 10^9
1 <= valuei <= 10^6

</> Typescript Code:
*/

function maxTwoEvents(events: number[][]): number {
  // Sort the events based on their end time
  events.sort((a, b) => a[1] - b[1]);

  const n = events.length;
  // Create an array to store the maximum value up to each event
  const preMax = new Array(n);
  preMax[0] = events[0][2]; // Initialize with the first event's value
  for (let i = 1; i < n; i++) {
    // Update the maximum value up to the current event
    preMax[i] = Math.max(preMax[i - 1], events[i][2]);
  }

  let maxSum = 0; // Variable to keep track of the maximum sum
  for (let i = 0; i < n; i++) {
    // Update maxSum with the current event's value if it's higher
    maxSum = Math.max(maxSum, events[i][2]);

    // Binary search to find the last event that doesn't overlap
    let left = 0,
      right = i - 1;
    let idx = -1; // Index of the non-overlapping event
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (events[mid][1] < events[i][0]) {
        idx = mid; // Found a potential event, search to the right
        left = mid + 1;
      } else {
        right = mid - 1; // Search to the left
      }
    }

    if (idx != -1) {
      // Update maxSum with the sum of current and non-overlapping event
      maxSum = Math.max(maxSum, events[i][2] + preMax[idx]);
    }
  }

  return maxSum; // Return the maximum sum obtained
}
