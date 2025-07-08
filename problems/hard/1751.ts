/*
1751. Maximum Number of Events That Can Be Attended II

You are given an array of events where events[i] = [startDayi, endDayi, valuei]. The ith event starts at startDayi and ends at endDayi, and if you attend this event, you will receive a value of valuei. You are also given an integer k which represents the maximum number of events you can attend.
You can only attend one event at a time. If you choose to attend an event, you must attend the entire event. Note that the end day is inclusive: that is, you cannot attend two events where one of them starts and the other ends on the same day.
Return the maximum sum of values that you can receive by attending events.

Example 1:
Input: events = [[1,2,4],[3,4,3],[2,3,1]], k = 2
Output: 7
Explanation: Choose the green events, 0 and 1 (0-indexed) for a total value of 4 + 3 = 7.

Example 2:
Input: events = [[1,2,4],[3,4,3],[2,3,10]], k = 2
Output: 10
Explanation: Choose event 2 for a total value of 10.
Notice that you cannot attend any other event as they overlap, and that you do not have to attend k events.

Example 3:
Input: events = [[1,1,1],[2,2,2],[3,3,3],[4,4,4]], k = 3
Output: 9
Explanation: Although the events do not overlap, you can only attend 3 events. Pick the highest valued three.

Constraints:
1 <= k <= events.length
1 <= k * events.length <= 10^6
1 <= startDayi <= endDayi <= 10^9
1 <= valuei <= 10^6

</> Typescript code:
*/

function maxValue(events: number[][], k: number): number {
  // Sort events by end day to enable optimal substructure for DP
  events.sort((a, b) => a[1] - b[1]);
  const n = events.length;

  // dp[i][j] = maximum value using first i events with at most j events attended
  const dp = Array(n + 1)
    .fill(null)
    .map(() => Array(k + 1).fill(0));

  // Process each event
  for (let i = 1; i <= n; i++) {
    const event = events[i - 1]; // Current event (0-indexed)

    // Find the last event that doesn't overlap with current event
    // Since events are sorted by end day, we search backwards
    let lastCompatible = 0;
    for (let j = i - 1; j >= 1; j--) {
      if (events[j - 1][1] < event[0]) {
        lastCompatible = j;
        break;
      }
    }

    // Fill DP table for all possible k values
    for (let j = 1; j <= k; j++) {
      // Either skip current event or take it
      dp[i][j] = Math.max(
        dp[i - 1][j], // Skip current event
        dp[lastCompatible][j - 1] + event[2], // Take current event
      );
    }
  }

  return dp[n][k];
}
