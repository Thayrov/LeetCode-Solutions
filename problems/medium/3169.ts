/* 
3169. Count Days Without Meetings

You are given a positive integer days representing the total number of days an employee is available for work (starting from day 1). You are also given a 2D array meetings of size n where, meetings[i] = [start_i, end_i] represents the starting and ending days of meeting i (inclusive).

Return the count of days when the employee is available for work but no meetings are scheduled.

Note: The meetings may overlap.

Example 1:
Input: days = 10, meetings = [[5,7],[1,3],[9,10]]
Output: 2
Explanation:
There is no meeting scheduled on the 4th and 8th days.

Example 2:
Input: days = 5, meetings = [[2,4],[1,3]]
Output: 1
Explanation:
There is no meeting scheduled on the 5th day.

Example 3:
Input: days = 6, meetings = [[1,6]]
Output: 0
Explanation:
Meetings are scheduled for all working days.

Constraints:
1 <= days <= 10^9
1 <= meetings.length <= 10^5
meetings[i].length == 2
1 <= meetings[i][0] <= meetings[i][1] <= days

</> Typescript code:
*/

function countDays(days: number, meetings: number[][]): number {
  // Sort meetings by their starting day to enable efficient merging
  meetings.sort((a, b) => a[0] - b[0]);

  // Initialize an array to hold the merged intervals of meetings
  let merged: number[][] = [];

  // Loop through each meeting interval
  for (let meeting of meetings) {
    // If there are no intervals in merged or the current meeting starts after the last merged meeting ends plus one day
    if (!merged.length || meeting[0] > merged[merged.length - 1][1] + 1) {
      // Append the current meeting as a new interval since it doesn't overlap or directly follow the previous one
      merged.push(meeting);
    } else {
      // Otherwise, update the last merged interval's end day to cover the current meeting as well
      merged[merged.length - 1][1] = Math.max(
        merged[merged.length - 1][1],
        meeting[1]
      );
    }
  }

  // Calculate the total number of days covered by the meetings by summing the lengths of all merged intervals
  let totalMeetingDays = 0;
  for (let interval of merged) {
    totalMeetingDays += interval[1] - interval[0] + 1;
  }

  // Return the number of days without any meetings by subtracting meeting days from the total available days
  return days - totalMeetingDays;
}
