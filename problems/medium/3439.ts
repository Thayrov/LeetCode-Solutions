/*
3439. Reschedule Meetings for Maximum Free Time I

You are given an integer eventTime denoting the duration of an event, where the event occurs from time t = 0 to time t = eventTime.
You are also given two integer arrays startTime and endTime, each of length n. These represent the start and end time of n non-overlapping meetings, where the ith meeting occurs during the time [startTime[i], endTime[i]].
You can reschedule at most k meetings by moving their start time while maintaining the same duration, to maximize the longest continuous period of free time during the event.
The relative order of all the meetings should stay the same and they should remain non-overlapping.
Return the maximum amount of free time possible after rearranging the meetings.
Note that the meetings can not be rescheduled to a time outside the event.

Example 1:
Input: eventTime = 5, k = 1, startTime = [1,3], endTime = [2,5]
Output: 2
Explanation:
Reschedule the meeting at [1, 2] to [2, 3], leaving no meetings during the time [0, 2].

Example 2:
Input: eventTime = 10, k = 1, startTime = [0,2,9], endTime = [1,4,10]
Output: 6
Explanation:
Reschedule the meeting at [2, 4] to [1, 3], leaving no meetings during the time [3, 9].

Example 3:
Input: eventTime = 5, k = 2, startTime = [0,1,2,3,4], endTime = [1,2,3,4,5]
Output: 0
Explanation:
There is no time during the event not occupied by meetings.

Constraints:
1 <= eventTime <= 10^9
n == startTime.length == endTime.length
2 <= n <= 10^5
1 <= k <= n
0 <= startTime[i] < endTime[i] <= eventTime
endTime[i] <= startTime[i + 1] where i lies in the range [0, n - 2].

</> Typescript code:
*/

/**
 * Calculates the maximum possible continuous free time by rescheduling at most k meetings.
 * @param eventTime The total duration of the event.
 * @param k The maximum number of meetings that can be rescheduled.
 * @param startTime An array of meeting start times.
 * @param endTime An array of meeting end times.
 * @returns The maximum possible free time.
 */
function maxFreeTime(
  eventTime: number,
  k: number,
  startTime: number[],
  endTime: number[]
): number {
  const n = startTime.length;

  // If we can move all meetings, we can consolidate them and create a single large gap.
  if (k >= n) {
    if (n === 0) return eventTime;
    let totalMeetingsDuration = 0;
    for (let i = 0; i < n; i++) {
      totalMeetingsDuration += endTime[i] - startTime[i];
    }
    return eventTime - totalMeetingsDuration;
  }

  // Step 1: Pre-computation of durations and their prefix sums.
  const durations = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    durations[i] = endTime[i] - startTime[i];
  }

  const prefixDurs = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    prefixDurs[i + 1] = prefixDurs[i] + durations[i];
  }
  const totalMeetingsDuration = prefixDurs[n];

  // Step 2: Calculate the initial maximum gap with zero moves.
  let maxGap = 0;
  if (n > 0) {
    maxGap = Math.max(maxGap, startTime[0]); // Gap at the beginning
    for (let i = 0; i < n - 1; i++) {
      maxGap = Math.max(maxGap, startTime[i + 1] - endTime[i]); // Gaps between meetings
    }
    maxGap = Math.max(maxGap, eventTime - endTime[n - 1]); // Gap at the end
  } else {
    return eventTime;
  }

  // Step 3: Calculate intermediate gaps.
  // The gap created by fixing meetings i and j and moving everything between is:
  // Gap = (startTime[j] - endTime[i]) - (duration of meetings i+1..j-1)
  // Gap = (startTime[j] - prefixDurs[j]) - (endTime[i] - prefixDurs[i+1])
  // Let's define A[j] = startTime[j] - prefixDurs[j] and B[i] = endTime[i] - prefixDurs[i+1].
  // We want to maximize A[j] - B[i] s.t. j - i - 1 <= k.
  const A = new Array(n).fill(0);
  for (let j = 0; j < n; j++) {
    A[j] = startTime[j] - prefixDurs[j];
  }

  const B = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    B[i] = endTime[i] - prefixDurs[i + 1];
  }

  // Use a sliding window maximum (deque) to find max(A[j] - B[i]) in O(N).
  const deque: number[] = [];
  for (let i = 0, j = 1; i < n - 1; i++) {
    // Expand window: add j to deque while maintaining decreasing order of A values.
    while (j <= i + k + 1 && j < n) {
      while (deque.length > 0 && A[deque[deque.length - 1]] <= A[j]) {
        deque.pop();
      }
      deque.push(j);
      j++;
    }
    // Shrink window: remove indices from front that are no longer in range.
    while (deque.length > 0 && deque[0] <= i) {
      deque.shift();
    }
    // The front of the deque is the max A[j] in the current window.
    if (deque.length > 0) {
      maxGap = Math.max(maxGap, A[deque[0]] - B[i]);
    }
  }

  // Step 4: Handle boundary gaps.
  // Case 1: Fix meeting j, move all meetings before it (0..j-1).
  // This is possible if j <= k. The gap is startTime[j] - (duration of 0..j-1).
  for (let j = 0; j <= k && j < n; j++) {
    maxGap = Math.max(maxGap, startTime[j] - prefixDurs[j]);
  }

  // Case 2: Fix meeting i, move all meetings after it (i+1..n-1).
  // Possible if n-1-i <= k. The gap is (eventTime - duration of i+1..n-1) - endTime[i].
  for (let i = n - 1; i >= 0 && n - 1 - i <= k; i--) {
    const durAfter = totalMeetingsDuration - prefixDurs[i + 1];
    const gap = eventTime - endTime[i] - durAfter;
    maxGap = Math.max(maxGap, gap);
  }

  return maxGap;
}
