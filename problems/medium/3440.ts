/*
3440. Reschedule Meetings for Maximum Free Time II

You are given an integer eventTime denoting the duration of an event. You are also given two integer arrays startTime and endTime, each of length n.
These represent the start and end times of n non-overlapping meetings that occur during the event between time t = 0 and time t = eventTime, where the ith meeting occurs during the time [startTime[i], endTime[i]].
You can reschedule at most one meeting by moving its start time while maintaining the same duration, such that the meetings remain non-overlapping, to maximize the longest continuous period of free time during the event.
Return the maximum amount of free time possible after rearranging the meetings.
Note that the meetings can not be rescheduled to a time outside the event and they should remain non-overlapping.
Note: In this version, it is valid for the relative ordering of the meetings to change after rescheduling one meeting.

Example 1:
Input: eventTime = 5, startTime = [1,3], endTime = [2,5]
Output: 2
Explanation:
Reschedule the meeting at [1, 2] to [2, 3], leaving no meetings during the time [0, 2].

Example 2:
Input: eventTime = 10, startTime = [0,7,9], endTime = [1,8,10]
Output: 7
Explanation:
Reschedule the meeting at [0, 1] to [8, 9], leaving no meetings during the time [0, 7].

Example 3:
Input: eventTime = 10, startTime = [0,3,7,9], endTime = [1,4,8,10]
Output: 6
Explanation:
Reschedule the meeting at [3, 4] to [8, 9], leaving no meetings during the time [1, 7].

Example 4:
Input: eventTime = 5, startTime = [0,1,2,3,4], endTime = [1,2,3,4,5]
Output: 0
Explanation:
There is no time during the event not occupied by meetings.

Constraints:
1 <= eventTime <= 10^9
n == startTime.length == endTime.length
2 <= n <= 10^5
0 <= startTime[i] < endTime[i] <= eventTime
endTime[i] <= startTime[i + 1] where i lies in the range [0, n - 2].

</> Typescript code:
*/

function maxFreeTime(
  eventTime: number,
  startTime: number[],
  endTime: number[]
): number {
  // Get the number of meetings.
  const n = startTime.length;

  // Edge case: If there are no meetings, the entire event time is free.
  if (n === 0) {
    return eventTime;
  }

  // Create an array to store the duration of each free time gap. There are n+1 gaps.
  const gaps = new Array(n + 1);
  // The first gap is from the start of the event to the first meeting.
  gaps[0] = startTime[0];
  // The gaps between meetings.
  for (let i = 1; i < n; i++) {
    gaps[i] = startTime[i] - endTime[i - 1];
  }
  // The last gap is from the end of the last meeting to the end of the event.
  gaps[n] = eventTime - endTime[n - 1];

  // Calculate the initial maximum free time without rescheduling any meeting.
  // This serves as our baseline result.
  let maxFreeTimeResult = 0;
  for (const gap of gaps) {
    maxFreeTimeResult = Math.max(maxFreeTimeResult, gap);
  }

  // To efficiently find the maximum gap excluding the ones adjacent to the moved meeting,
  // we pre-calculate prefix maximums of the gaps array.
  const prefixMaxGaps = new Array(n + 1);
  prefixMaxGaps[0] = gaps[0];
  for (let i = 1; i <= n; i++) {
    prefixMaxGaps[i] = Math.max(prefixMaxGaps[i - 1], gaps[i]);
  }

  // Similarly, we pre-calculate suffix maximums of the gaps array.
  const suffixMaxGaps = new Array(n + 1);
  suffixMaxGaps[n] = gaps[n];
  for (let i = n - 1; i >= 0; i--) {
    suffixMaxGaps[i] = Math.max(suffixMaxGaps[i + 1], gaps[i]);
  }

  // Iterate through each meeting, considering it as the one to be rescheduled.
  for (let i = 0; i < n; i++) {
    // Calculate the duration of the meeting we are considering moving.
    const durationToMove = endTime[i] - startTime[i];

    // When meeting 'i' is moved, its time slot becomes free, merging the gap before it (gaps[i])
    // and the gap after it (gaps[i+1]) into one large continuous free time block.
    const mergedGap = gaps[i] + durationToMove + gaps[i + 1];

    // We need to find a new place for the moved meeting. To maximize our `mergedGap`,
    // we should place the meeting in one of the *other* available gaps.
    // We find the largest of these "other" gaps.
    let maxOtherGap = 0;
    // The "other" gaps are those before gap `i`.
    if (i > 0) {
      maxOtherGap = prefixMaxGaps[i - 1];
    }
    // And those after gap `i+1`. We take the maximum of both ranges.
    if (i < n - 1) {
      maxOtherGap = Math.max(maxOtherGap, suffixMaxGaps[i + 2]);
    }

    let potentialMax = 0;
    // Case 1: The moved meeting fits into the largest of the other gaps.
    if (durationToMove <= maxOtherGap) {
      // We can place the meeting there, leaving our `mergedGap` fully intact.
      // This becomes a candidate for the maximum free time.
      potentialMax = mergedGap;
    } else {
      // Case 2: The meeting does not fit in any other gap.
      // We are forced to place it back inside the `mergedGap` we just created.
      // This splits the `mergedGap`. The best we can do is leave a free time of `mergedGap - durationToMove`.
      // The maximum free time is then the larger of this remaining part or the largest other gap.
      potentialMax = Math.max(mergedGap - durationToMove, maxOtherGap);
    }

    // Update our overall maximum free time with the best result found so far.
    maxFreeTimeResult = Math.max(maxFreeTimeResult, potentialMax);
  }

  // Return the final calculated maximum free time.
  return maxFreeTimeResult;
}
