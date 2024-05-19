/* 
1531. String Compression II

Run-length encoding is a string compression method that works by replacing consecutive identical characters (repeated 2 or more times) with the concatenation of the character and the number marking the count of the characters (length of the run). For example, to compress the string "aabccc" we replace "aa" by "a2" and replace "ccc" by "c3". Thus the compressed string becomes "a2bc3".

Notice that in this problem, we are not adding '1' after single characters.

Given a string s and an integer k. You need to delete at most k characters from s such that the run-length encoded version of s has minimum length.

Find the minimum length of the run-length encoded version of s after deleting at most k characters.

Example 1:

Input: s = "aaabcccd", k = 2
Output: 4
Explanation: Compressing s without deleting anything will give us "a3bc3d" of length 6. Deleting any of the characters 'a' or 'c' would at most decrease the length of the compressed string to 5, for instance delete 2 'a' then we will have s = "abcccd" which compressed is abc3d. Therefore, the optimal way is to delete 'b' and 'd', then the compressed version of s will be "a3c3" of length 4.

Example 2:

Input: s = "aabbaa", k = 2
Output: 2
Explanation: If we delete both 'b' characters, the resulting compressed string would be "a4" of length 2.

Example 3:

Input: s = "aaaaaaaaaaa", k = 0
Output: 3
Explanation: Since k is zero, we cannot delete anything. The compressed string is "a11" of length 3.


Constraints:

1 <= s.length <= 100
0 <= k <= s.length
s contains only lowercase English letters.

</> Typescript Code:
*/

function getLengthOfOptimalCompression(s: string, k: number): number {
  const n = s.length;
  // Create a 2D DP array with dimensions (n+1)x(k+1), initialized to Infinity
  const dp = Array.from({length: n + 1}, () => Array(k + 1).fill(Infinity));
  dp[0][0] = 0; // Base case: no characters and no deletions lead to a length of 0

  // Iterate over each character in the string
  for (let i = 1; i <= n; i++) {
    // Iterate over the possible number of deletions
    for (let j = 0; j <= k; j++) {
      let count = 0; // Count of consecutive characters
      let del = 0; // Count of deletions

      // Try all possibilities of deleting characters up to the i-th one
      for (let l = i; l >= 1; l--) {
        // Check if the current character is the same as the i-th character
        if (s.charAt(l - 1) === s.charAt(i - 1)) {
          count++;
        } else {
          del++;
        }
        // Update DP table if within the allowed deletions
        if (j - del >= 0) {
          dp[i][j] = Math.min(
            dp[i][j],
            dp[l - 1][j - del] + 1 + (count >= 100 ? 3 : count >= 10 ? 2 : count >= 2 ? 1 : 0),
          );
        }
      }

      // Consider deleting the current character
      if (j > 0) {
        dp[i][j] = Math.min(dp[i][j], dp[i - 1][j - 1]);
      }
    }
  }

  // Return the minimum length of the compressed string after at most k deletions
  return dp[n][k];
}

/* 
1335. Minimum Difficulty of a Job Schedule

You want to schedule a list of jobs in d days. Jobs are dependent (i.e To work on the ith job, you have to finish all the jobs j where 0 <= j < i).

You have to finish at least one task every day. The difficulty of a job schedule is the sum of difficulties of each day of the d days. The difficulty of a day is the maximum difficulty of a job done on that day.

You are given an integer array jobDifficulty and an integer d. The difficulty of the ith job is jobDifficulty[i].

Return the minimum difficulty of a job schedule. If you cannot find a schedule for the jobs return -1.


Example 1:

Input: jobDifficulty = [6,5,4,3,2,1], d = 2
Output: 7
Explanation: First day you can finish the first 5 jobs, total difficulty = 6.
Second day you can finish the last job, total difficulty = 1.
The difficulty of the schedule = 6 + 1 = 7 

Example 2:

Input: jobDifficulty = [9,9,9], d = 4
Output: -1
Explanation: If you finish a job per day you will still have a free day. you cannot find a schedule for the given jobs.

Example 3:

Input: jobDifficulty = [1,1,1], d = 3
Output: 3
Explanation: The schedule is one job per day. total difficulty will be 3.

Constraints:

1 <= jobDifficulty.length <= 300
0 <= jobDifficulty[i] <= 1000
1 <= d <= 10 

</> Typescript Code:
*/

function minDifficulty(jobDifficulty: number[], d: number): number {
  const n = jobDifficulty.length;
  // Check if there are fewer jobs than days; if so, return -1 as it's impossible to schedule
  if (n < d) return -1;

  // Initialize a 2D dynamic programming array with size (n+1)x(d+1), filled with Infinity
  const dp = Array.from({length: n + 1}, () => Array(d + 1).fill(Infinity));
  // Base case: no difficulty for scheduling 0 jobs in 0 days
  dp[0][0] = 0;

  // Outer loop: iterate over the jobs
  for (let i = 1; i <= n; i++) {
    // Middle loop: iterate over the days
    for (let j = 1; j <= d; j++) {
      // Variable to keep track of the maximum difficulty of a job for the current day
      let maxDifficulty = 0;

      // Inner loop: consider different job partitions
      for (let k = i; k >= j; k--) {
        // Update maxDifficulty to the maximum of current job's difficulty and previous maxDifficulty
        maxDifficulty = Math.max(maxDifficulty, jobDifficulty[k - 1]);
        // Update dp[i][j] with the minimum difficulty found for partitioning jobs
        dp[i][j] = Math.min(dp[i][j], dp[k - 1][j - 1] + maxDifficulty);
      }
    }
  }

  // Return the minimum difficulty of scheduling all jobs over d days
  return dp[n][d];
}

/* 
1235. Maximum Profit in Job Scheduling

We have n jobs, where every job is scheduled to be done from startTime[i] to endTime[i], obtaining a profit of profit[i].

You're given the startTime, endTime and profit arrays, return the maximum profit you can take such that there are no two jobs in the subset with overlapping time range.

If you choose a job that ends at time X you will be able to start another job that starts at time X.



Example 1:

Input: startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]
Output: 120
Explanation: The subset chosen is the first and fourth job. 
Time range [1-3]+[3-6] , we get profit of 120 = 50 + 70.


Example 2:

Input: startTime = [1,2,3,4,6], endTime = [3,5,10,6,9], profit = [20,20,100,70,60]
Output: 150
Explanation: The subset chosen is the first, fourth and fifth job. 
Profit obtained 150 = 20 + 70 + 60.


Example 3:

Input: startTime = [1,1,1], endTime = [2,3,4], profit = [5,6,4]
Output: 6


Constraints:

1 <= startTime.length == endTime.length == profit.length <= 5 * 104
1 <= startTime[i] < endTime[i] <= 109
1 <= profit[i] <= 104


</> Typescript Code:
*/

function jobScheduling(startTime: number[], endTime: number[], profit: number[]): number {
  // Combine startTime, endTime, and profit into a single array of jobs
  let jobs = startTime.map((start, i) => [start, endTime[i], profit[i]]);
  // Sort the jobs based on their end times
  jobs.sort((a, b) => a[1] - b[1]);

  // Initialize dynamic programming array
  let dp = new Array(jobs.length).fill(0);
  // Base case: the profit of the first job
  dp[0] = jobs[0][2];

  // Iterate over each job
  for (let i = 1; i < jobs.length; i++) {
    // Profit including the current job
    let includeProfit = jobs[i][2];
    // Find the last non-overlapping job
    let lastIndex = -1;
    for (let j = i - 1; j >= 0; j--) {
      if (jobs[j][1] <= jobs[i][0]) {
        lastIndex = j;
        break;
      }
    }
    // Add profit of the last non-overlapping job
    if (lastIndex != -1) {
      includeProfit += dp[lastIndex];
    }
    // The maximum profit at this job is the max of including it or not
    dp[i] = Math.max(dp[i - 1], includeProfit);
  }

  // Return the maximum profit possible
  return dp[jobs.length - 1];
}

/* 
446. Arithmetic Slices II - Subsequence

Given an integer array nums, return the number of all the arithmetic subsequences of nums.

A sequence of numbers is called arithmetic if it consists of at least three elements and if the difference between any two consecutive elements is the same.

For example, [1, 3, 5, 7, 9], [7, 7, 7, 7], and [3, -1, -5, -9] are arithmetic sequences.
For example, [1, 1, 2, 5, 7] is not an arithmetic sequence.
A subsequence of an array is a sequence that can be formed by removing some elements (possibly none) of the array.

For example, [2,5,10] is a subsequence of [1,2,1,2,4,1,5,10].
The test cases are generated so that the answer fits in 32-bit integer.


Example 1:

Input: nums = [2,4,6,8,10]
Output: 7
Explanation: All arithmetic subsequence slices are:
[2,4,6]
[4,6,8]
[6,8,10]
[2,4,6,8]
[4,6,8,10]
[2,4,6,8,10]
[2,6,10]


Example 2:

Input: nums = [7,7,7,7,7]
Output: 16
Explanation: Any subsequence of this array is arithmetic.

Constraints:

1  <= nums.length <= 1000
-231 <= nums[i] <= 231 - 1

</> Typescript Code:

*/

function numberOfArithmeticSlices(nums: number[]): number {
  let total = 0; // Total count of arithmetic subsequences
  // An array of maps, where each map holds the count of subsequences ending at index i with a given difference
  const dp = Array.from({length: nums.length}, () => new Map());

  // Iterate through the nums array
  for (let i = 0; i < nums.length; i++) {
    // For each pair (i, j), where j < i
    for (let j = 0; j < i; j++) {
      // Calculate the difference between the current pair of elements
      const diff = nums[i] - nums[j];
      // Get the count of subsequences ending at j with this difference
      const count = dp[j].get(diff) || 0;
      // Update the count of subsequences ending at i with this difference
      dp[i].set(diff, (dp[i].get(diff) || 0) + count + 1);
      // Add the count to the total, as these form new subsequences ending at i
      total += count;
    }
  }

  // Return the total count of arithmetic subsequences
  return total;
}

/* 
629. K Inverse Pairs Array

For an integer array nums, an inverse pair is a pair of integers [i, j] where 0 <= i < j < nums.length and nums[i] > nums[j].

Given two integers n and k, return the number of different arrays consist of numbers from 1 to n such that there are exactly k inverse pairs. Since the answer can be huge, return it modulo 109 + 7.


Example 1:

Input: n = 3, k = 0
Output: 1
Explanation: Only the array [1,2,3] which consists of numbers from 1 to 3 has exactly 0 inverse pairs.


Example 2:

Input: n = 3, k = 1
Output: 2
Explanation: The array [1,3,2] and [2,1,3] have exactly 1 inverse pair.


Constraints:

1 <= n <= 1000
0 <= k <= 1000

</> Typescript Code:
*/

function kInversePairs(n: number, k: number): number {
  const MOD = 1e9 + 7; // Modulus for large numbers
  // Initialize the dynamic programming table
  const dp = Array.from({length: n + 1}, () => new Array(k + 1).fill(0));
  dp[0][0] = 1; // Base case

  // Iterate over each number from 1 to n
  for (let i = 1; i <= n; i++) {
    let sum = 0;
    // Calculate the number of arrays for each possible number of inverse pairs
    for (let j = 0; j <= k; j++) {
      // Accumulate counts from the previous row (number i - 1)
      sum = (sum + dp[i - 1][j]) % MOD;
      // Remove the count that exceeds the range of inverse pairs
      if (j >= i) sum = (sum - dp[i - 1][j - i] + MOD) % MOD;
      // Update the DP table
      dp[i][j] = sum;
    }
  }

  // Return the result for n numbers and k inverse pairs
  return dp[n][k];
}

/* 
1074. Number of Submatrices That Sum to Target

Given a matrix and a target, return the number of non-empty submatrices that sum to target.

A submatrix x1, y1, x2, y2 is the set of all cells matrix[x][y] with x1 <= x <= x2 and y1 <= y <= y2.

Two submatrices (x1, y1, x2, y2) and (x1', y1', x2', y2') are different if they have some coordinate that is different: for example, if x1 != x1'.


Example 1:
Input: matrix = [[0,1,0],[1,1,1],[0,1,0]], target = 0
Output: 4
Explanation: The four 1x1 submatrices that only contain 0.


Example 2:
Input: matrix = [[1,-1],[-1,1]], target = 0
Output: 5
Explanation: The two 1x2 submatrices, plus the two 2x1 submatrices, plus the 2x2 submatrix.


Example 3:
Input: matrix = [[904]], target = 0
Output: 0


Constraints:
1 <= matrix.length <= 100
1 <= matrix[0].length <= 100
-1000 <= matrix[i] <= 1000
-10^8 <= target <= 10^8


</> Typescript Code:
 */

function numSubmatrixSumTarget(matrix: number[][], target: number): number {
  let count = 0; // Initialize counter for target submatrices
  const m = matrix.length; // Number of rows
  const n = matrix[0].length; // Number of columns

  // Precompute cumulative sums for each row
  for (let i = 0; i < m; i++) {
    for (let j = 1; j < n; j++) {
      matrix[i][j] += matrix[i][j - 1];
    }
  }

  // Iterate over all pairs of columns to consider different submatrices
  for (let startCol = 0; startCol < n; startCol++) {
    for (let endCol = startCol; endCol < n; endCol++) {
      const sumMap = new Map(); // Map to store the frequency of sum
      sumMap.set(0, 1); // Initialize with zero sum
      let currSum = 0; // Current cumulative sum

      for (let row = 0; row < m; row++) {
        // Calculate cumulative sum for the submatrix
        currSum += matrix[row][endCol] - (startCol > 0 ? matrix[row][startCol - 1] : 0);
        // Count the number of times (currSum - target) has occurred
        count += sumMap.get(currSum - target) || 0;
        // Update the frequency map
        sumMap.set(currSum, (sumMap.get(currSum) || 0) + 1);
      }
    }
  }

  return count; // Return the total count of target submatrices
}

/* 
76. Minimum Window Substring

Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

Example 1:
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.

Example 2:
Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.

Example 3:
Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.

Constraints:
m == s.length
n == t.length
1 <= m, n <= 105
s and t consist of uppercase and lowercase English letters.

Follow up: Could you find an algorithm that runs in O(m + n) time?

</> Typescript Code:
*/

function minWindow(s: string, t: string): string {
  // Initialize the needed characters map, window map, and counters
  let need = new Map(),
    window = new Map(),
    have = 0,
    needCount = t.length;
  // Populate the need map with characters from t
  for (let c of t) need.set(c, (need.get(c) || 0) + 1);

  // Initialize the result string and pointers for the sliding window
  let result = '',
    left = 0,
    right = 0,
    minLen = Infinity;

  // Expand the window to the right
  while (right < s.length) {
    let r = s[right];
    // If the character is needed, update the window map
    if (need.has(r)) {
      window.set(r, (window.get(r) || 0) + 1);
      // If the window satisfies the need for character r, increase have
      if (window.get(r) === need.get(r)) have++;
    }

    // Shrink the window from the left if all needed characters are included
    while (have === need.size) {
      // Update result if the current window is smaller than the minimum found so far
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        result = s.substring(left, right + 1);
      }
      // Move left pointer to shrink the window
      let l = s[left];
      if (need.has(l)) {
        window.set(l, window.get(l) - 1);
        if (window.get(l) < need.get(l)) have--;
      }
      left++;
    }
    right++;
  }
  return result;
}

/* 
1463. Cherry Pickup II

You are given a rows x cols matrix grid representing a field of cherries where grid[i][j] represents the number of cherries that you can collect from the (i, j) cell.

You have two robots that can collect cherries for you:

Robot #1 is located at the top-left corner (0, 0), and
Robot #2 is located at the top-right corner (0, cols - 1).
Return the maximum number of cherries collection using both robots by following the rules below:

From a cell (i, j), robots can move to cell (i + 1, j - 1), (i + 1, j), or (i + 1, j + 1).
When any robot passes through a cell, It picks up all cherries, and the cell becomes an empty cell.
When both robots stay in the same cell, only one takes the cherries.
Both robots cannot move outside of the grid at any moment.
Both robots should reach the bottom row in grid.

Example 1:
Input: grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]
Output: 24
Explanation: Path of robot #1 and #2 are described in color green and blue respectively.
Cherries taken by Robot #1, (3 + 2 + 5 + 2) = 12.
Cherries taken by Robot #2, (1 + 5 + 5 + 1) = 12.
Total of cherries: 12 + 12 = 24.

Example 2:
Input: grid = [[1,0,0,0,0,0,1],[2,0,0,0,0,3,0],[2,0,9,0,0,0,0],[0,3,0,5,4,0,0],[1,0,2,3,0,0,6]]
Output: 28
Explanation: Path of robot #1 and #2 are described in color green and blue respectively.
Cherries taken by Robot #1, (1 + 9 + 5 + 2) = 17.
Cherries taken by Robot #2, (1 + 3 + 4 + 3) = 11.
Total of cherries: 17 + 11 = 28.

Constraints:
rows == grid.length
cols == grid[i].length
2 <= rows, cols <= 70
0 <= grid[i][j] <= 100

</> Typescript Code:
*/

// Function to calculate maximum cherries that can be picked by two robots
function cherryPickup(grid: number[][]): number {
  const rows = grid.length,
    cols = grid[0].length;
  // DP table to store the max cherries picked up to row i, with robots at (i, col1) and (i, col2)
  const dp = Array.from({length: rows}, () =>
    Array.from({length: cols}, () => Array(cols).fill(0)),
  );

  // Base case: Initialize the last row with the cherries that can be picked by both robots
  for (let col1 = 0; col1 < cols; col1++) {
    for (let col2 = 0; col2 < cols; col2++) {
      dp[rows - 1][col1][col2] =
        col1 === col2 ? grid[rows - 1][col1] : grid[rows - 1][col1] + grid[rows - 1][col2];
    }
  }

  // Fill the DP table from bottom to top
  for (let row = rows - 2; row >= 0; row--) {
    for (let col1 = 0; col1 < cols; col1++) {
      for (let col2 = 0; col2 < cols; col2++) {
        let maxCherries = 0; // Max cherries robots can pick from current position
        // Check all possible moves for both robots
        for (let move1 = -1; move1 <= 1; move1++) {
          for (let move2 = -1; move2 <= 1; move2++) {
            const newCol1 = col1 + move1,
              newCol2 = col2 + move2;
            // Ensure new positions are within grid boundaries
            if (newCol1 >= 0 && newCol1 < cols && newCol2 >= 0 && newCol2 < cols) {
              maxCherries = Math.max(maxCherries, dp[row + 1][newCol1][newCol2]);
            }
          }
        }
        // Update DP table with max cherries + current cell cherries
        dp[row][col1][col2] =
          maxCherries + (col1 === col2 ? grid[row][col1] : grid[row][col1] + grid[row][col2]);
      }
    }
  }

  // Return the max cherries picked starting from the top row with robots at the far left and right
  return dp[0][0][cols - 1];
}

/* 
2402. Meeting Rooms III

You are given an integer n. There are n rooms numbered from 0 to n - 1.

You are given a 2D integer array meetings where meetings[i] = [starti, endi] means that a meeting will be held during the half-closed time interval [starti, endi). All the values of starti are unique.

Meetings are allocated to rooms in the following manner:

Each meeting will take place in the unused room with the lowest number.
If there are no available rooms, the meeting will be delayed until a room becomes free. The delayed meeting should have the same duration as the original meeting.
When a room becomes unused, meetings that have an earlier original start time should be given the room.
Return the number of the room that held the most meetings. If there are multiple rooms, return the room with the lowest number.

A half-closed interval [a, b) is the interval between a and b including a and not including b.

Example 1:
Input: n = 2, meetings = [[0,10],[1,5],[2,7],[3,4]]
Output: 0
Explanation:
- At time 0, both rooms are not being used. The first meeting starts in room 0.
- At time 1, only room 1 is not being used. The second meeting starts in room 1.
- At time 2, both rooms are being used. The third meeting is delayed.
- At time 3, both rooms are being used. The fourth meeting is delayed.
- At time 5, the meeting in room 1 finishes. The third meeting starts in room 1 for the time period [5,10).
- At time 10, the meetings in both rooms finish. The fourth meeting starts in room 0 for the time period [10,11).
Both rooms 0 and 1 held 2 meetings, so we return 0. 

Example 2:
Input: n = 3, meetings = [[1,20],[2,10],[3,5],[4,9],[6,8]]
Output: 1
Explanation:
- At time 1, all three rooms are not being used. The first meeting starts in room 0.
- At time 2, rooms 1 and 2 are not being used. The second meeting starts in room 1.
- At time 3, only room 2 is not being used. The third meeting starts in room 2.
- At time 4, all three rooms are being used. The fourth meeting is delayed.
- At time 5, the meeting in room 2 finishes. The fourth meeting starts in room 2 for the time period [5,10).
- At time 6, all three rooms are being used. The fifth meeting is delayed.
- At time 10, the meetings in rooms 1 and 2 finish. The fifth meeting starts in room 1 for the time period [10,12).
Room 0 held 1 meeting while rooms 1 and 2 each held 2 meetings, so we return 1. 

Constraints:
1 <= n <= 100
1 <= meetings.length <= 105
meetings[i].length == 2
0 <= starti < endi <= 5 * 105
All the values of starti are unique.

</> Typescript Code:
*/

function mostBooked(n: number, meetings: number[][]): number {
  meetings.sort((a, b) => a[0] - b[0]); // Sorting meetings by start time to process in order

  let lastAvailable: number[] = new Array(n).fill(0); // Track when each room becomes available next
  let roomUsedCount: number[] = new Array(n).fill(0); // Count how many times each room is used

  for (const [start, end] of meetings) {
    let found = false; // Flag to check if a suitable room is found
    let earlyEndRoom = 0; // Track the room that becomes available the earliest
    let earlyEndTime = Infinity; // Track the earliest time a room becomes available

    for (let room = 0; room < n; room++) {
      if (lastAvailable[room] <= start) {
        // Check if the room is available for the meeting
        lastAvailable[room] = end; // Update the room's availability to the end time of the current meeting
        roomUsedCount[room]++; // Increment the count for this room
        found = true; // Mark as found and stop looking for a room
        break;
      }

      if (lastAvailable[room] < earlyEndTime) {
        // Find the earliest available room if no room is available at the start time
        earlyEndTime = lastAvailable[room];
        earlyEndRoom = room;
      }
    }

    if (!found) {
      // If no room is available at the meeting's start, schedule it in the room that becomes available the earliest
      lastAvailable[earlyEndRoom] = earlyEndTime + (end - start); // Adjust the room's availability based on the meeting's duration
      roomUsedCount[earlyEndRoom]++; // Increment the count for this room
    }
  }

  // Determine the room that was used the most
  let resultRoom = 0; // Start with the first room as the default
  for (let room = 1; room < n; room++) {
    if (roomUsedCount[room] > roomUsedCount[resultRoom]) {
      // Find the room with the highest usage
      resultRoom = room;
    }
  }

  return resultRoom; // Return the room number with the most bookings
}

/* 
2092. Find All People With Secret

You are given an integer n indicating there are n people numbered from 0 to n - 1. You are also given a 0-indexed 2D integer array meetings where meetings[i] = [xi, yi, timei] indicates that person xi and person yi have a meeting at timei. A person may attend multiple meetings at the same time. Finally, you are given an integer firstPerson.

Person 0 has a secret and initially shares the secret with a person firstPerson at time 0. This secret is then shared every time a meeting takes place with a person that has the secret. More formally, for every meeting, if a person xi has the secret at timei, then they will share the secret with person yi, and vice versa.

The secrets are shared instantaneously. That is, a person may receive the secret and share it with people in other meetings within the same time frame.

Return a list of all the people that have the secret after all the meetings have taken place. You may return the answer in any order.

Example 1:
Input: n = 6, meetings = [[1,2,5],[2,3,8],[1,5,10]], firstPerson = 1
Output: [0,1,2,3,5]
Explanation:
At time 0, person 0 shares the secret with person 1.
At time 5, person 1 shares the secret with person 2.
At time 8, person 2 shares the secret with person 3.
At time 10, person 1 shares the secret with person 5.​​​​
Thus, people 0, 1, 2, 3, and 5 know the secret after all the meetings.

Example 2:
Input: n = 4, meetings = [[3,1,3],[1,2,2],[0,3,3]], firstPerson = 3
Output: [0,1,3]
Explanation:
At time 0, person 0 shares the secret with person 3.
At time 2, neither person 1 nor person 2 know the secret.
At time 3, person 3 shares the secret with person 0 and person 1.
Thus, people 0, 1, and 3 know the secret after all the meetings.

Example 3:
Input: n = 5, meetings = [[3,4,2],[1,2,1],[2,3,1]], firstPerson = 1
Output: [0,1,2,3,4]
Explanation:
At time 0, person 0 shares the secret with person 1.
At time 1, person 1 shares the secret with person 2, and person 2 shares the secret with person 3.
Note that person 2 can share the secret at the same time as receiving it.
At time 2, person 3 shares the secret with person 4.
Thus, people 0, 1, 2, 3, and 4 know the secret after all the meetings.

Constraints:
2 <= n <= 105
1 <= meetings.length <= 105
meetings[i].length == 3
0 <= xi, yi <= n - 1
xi != yi
1 <= timei <= 105
1 <= firstPerson <= n - 1

</> Typescript Code:
*/

function findAllPeople(n: number, meetings: number[][], firstPerson: number): number[] {
  // Sorts the meetings array based on the meeting time in ascending order.
  meetings.sort((a, b) => a[2] - b[2]);

  // Initializes a map to group meetings that happen at the same time.
  const edgesByTime = new Map();
  // This line seems to be incorrect as it tries to set a value on a Map using array notation, which is not supported. It should use edgesByTime.set() if intending to add initial data.
  edgesByTime[0] = new Set([[0, firstPerson]]);
  // Initializes a set to keep track of all people who know the secret initially.
  const knowSecret = new Set([0, firstPerson]);

  // Iterates over each meeting to group them by their meeting time in edgesByTime map.
  for (const [p1, p2, time] of meetings) {
    // If there's already a set for this time, add the current meeting to it.
    if (edgesByTime.has(time)) {
      edgesByTime.get(time).add([p1, p2]);
    } else {
      // Otherwise, create a new set for this time with the current meeting.
      edgesByTime.set(time, new Set([[p1, p2]]));
    }
  }

  // Defines a function that returns another function for finding the root parent of a node.
  function findFunc(
    parents: Map<number, number>,
    ranks: Map<number, number>,
  ): (node1: number) => number {
    // The returned function finds the ultimate parent (root) of a given node.
    return function walk(node1: number): number {
      // Base case: if a node is its own parent, it's the root.
      if (parents.get(node1) === node1) {
        return node1;
      }
      // Recursively find the root parent and update the parent of the current node to point directly to the root.
      const maybeParent = parents.get(node1);
      if (maybeParent === undefined) {
        throw new Error('Parent not found in the map. This should not happen.');
      }
      const parent = walk(maybeParent);
      parents.set(node1, parent);

      return parent;
    };
  }

  // Defines a function that returns another function for uniting two nodes into the same set.
  function unionFunc(
    parents: Map<number, number>,
    ranks: Map<number, number>,
  ): (node1: number, node2: number) => void {
    // The returned function unites two nodes.
    return function (node1: number, node2: number) {
      // Determines which node's tree is taller and makes the shorter tree's root point to the taller one.
      if (ranks.get(node1)! >= ranks.get(node2)!) {
        parents.set(node2, node1);
        // If the trees were of equal height, increment the rank of the new root.
        ranks.set(node1, ranks.get(node1)! + 1);
      } else {
        parents.set(node1, node2);
        ranks.set(node2, ranks.get(node2)! + 1);
      }
    };
  }

  // Iterates over each group of meetings that occur at the same time.
  for (const [_, edges] of Array.from(edgesByTime.entries())) {
    // Initializes maps to keep track of each node's parent and rank for the union-find algorithm.
    const parents = new Map();
    const ranks = new Map();
    // Initializes the parent of each node to itself and its rank to 0.
    for (const [n1, n2] of edges) {
      parents.set(n1, n1);
      parents.set(n2, n2);
      ranks.set(n1, 0);
      ranks.set(n2, 0);
    }

    // Instantiates the find and union functions with the current parents and ranks.
    const find = findFunc(parents, ranks);
    const union = unionFunc(parents, ranks);
    // This loop seems unnecessary as union-find operations typically require only one pass; it might be an error or misunderstanding.
    for (let i = 0; i < 2; i++) {
      for (const [n1, n2] of edges) {
        const parent1 = find(n1);
        const parent2 = find(n2);
        // If the two nodes have different parents, unite them.
        if (parent1 !== parent2) {
          union(parent1, parent2);
        }
      }
    }

    // Groups nodes by their "leader" or root parent.
    const groups = new Map();
    parents.forEach((group, node) => {
      if (groups.has(group)) {
        groups.get(group).push(node);
      } else {
        groups.set(group, [node]);
      }
    });

    // For each group, if any node knows the secret, all nodes in the group learn the secret.
    groups.forEach((nodes, _) => {
      if (nodes.some(node => knowSecret.has(node))) {
        for (const node of nodes) {
          knowSecret.add(node);
        }
      }
    });
  }

  // Converts the knowSecret set into an array to return the list of people who know the secret.
  return [...knowSecret];
}

/* 
2709. Greatest Common Divisor Traversal

You are given a 0-indexed integer array nums, and you are allowed to traverse between its indices. You can traverse between index i and index j, i != j, if and only if gcd(nums[i], nums[j]) > 1, where gcd is the greatest common divisor.

Your task is to determine if for every pair of indices i and j in nums, where i < j, there exists a sequence of traversals that can take us from i to j.

Return true if it is possible to traverse between all such pairs of indices, or false otherwise.

Example 1:
Input: nums = [2,3,6]
Output: true
Explanation: In this example, there are 3 possible pairs of indices: (0, 1), (0, 2), and (1, 2).
To go from index 0 to index 1, we can use the sequence of traversals 0 -> 2 -> 1, where we move from index 0 to index 2 because gcd(nums[0], nums[2]) = gcd(2, 6) = 2 > 1, and then move from index 2 to index 1 because gcd(nums[2], nums[1]) = gcd(6, 3) = 3 > 1.
To go from index 0 to index 2, we can just go directly because gcd(nums[0], nums[2]) = gcd(2, 6) = 2 > 1. Likewise, to go from index 1 to index 2, we can just go directly because gcd(nums[1], nums[2]) = gcd(3, 6) = 3 > 1.

Example 2:
Input: nums = [3,9,5]
Output: false
Explanation: No sequence of traversals can take us from index 0 to index 2 in this example. So, we return false.

Example 3:
Input: nums = [4,3,12,8]
Output: true
Explanation: There are 6 possible pairs of indices to traverse between: (0, 1), (0, 2), (0, 3), (1, 2), (1, 3), and (2, 3). A valid sequence of traversals exists for each pair, so we return true.

Constraints:
1 <= nums.length <= 105
1 <= nums[i] <= 105

</> Typescript Code:
*/

function canTraverseAllPairs(nums: number[]): boolean {
  // Calculate the maximum value in nums to limit the size of the sieve.
  const maxVal = Math.max(...nums);
  // Precompute the smallest prime factor for each number up to maxVal.
  const spf = smallestPrimeFactor(maxVal);

  // Initialize the parent array for union-find, setting each element to be its own parent.
  const parent = Array.from({length: nums.length}, (_, i) => i);

  // Find function for union-find to find the root parent of x.
  function find(x) {
    if (parent[x] === x) return x; // If x is its own parent, it is the root.
    return (parent[x] = find(parent[x])); // Path compression by directly connecting x to its root.
  }

  // Union function for union-find to merge the sets containing x and y.
  function union(x, y) {
    const rootX = find(x); // Find root of x.
    const rootY = find(y); // Find root of y.
    if (rootX !== rootY) parent[rootX] = rootY; // If roots are different, make one the parent of the other.
  }

  // Map to associate each prime factor with indices of nums containing that factor.
  const factorToIndices = new Map();
  nums.forEach((num, idx) => {
    let factors = getPrimeFactors(num, spf); // Get all prime factors of num.
    factors.forEach(factor => {
      if (!factorToIndices.has(factor)) factorToIndices.set(factor, []); // Initialize array if factor not seen before.
      factorToIndices.get(factor).push(idx); // Associate idx with this factor.
    });
  });

  // For each set of indices associated with a common prime factor, union them.
  factorToIndices.forEach(indices => {
    for (let i = 1; i < indices.length; i++) {
      union(indices[0], indices[i]); // Union first index with all others sharing the factor.
    }
  });

  // Check if all elements are in the same set as the first element.
  const root = find(0); // Find root of the first element.
  for (let i = 1; i < nums.length; i++) {
    if (find(i) !== root) return false; // If any element has a different root, not all pairs are connected.
  }

  return true; // If all elements are connected to the first, return true.
}

// Function to compute the smallest prime factor of each number up to maxVal using the Sieve of Eratosthenes.
function smallestPrimeFactor(maxVal) {
  const spf = Array.from({length: maxVal + 1}, (_, i) => i); // Initialize SPF array.
  for (let p = 2; p * p <= maxVal; p++) {
    if (spf[p] === p) {
      // If p is its own SPF, p is prime.
      for (let i = p * p; i <= maxVal; i += p) {
        if (spf[i] === i) spf[i] = p; // Mark SPF for multiples of p.
      }
    }
  }
  return spf;
}

// Function to extract all unique prime factors of num using the precomputed SPF array.
function getPrimeFactors(num, spf) {
  const factors = new Set();
  while (num > 1) {
    factors.add(spf[num]); // Add the SPF of num to the set.
    num /= spf[num]; // Divide num by its SPF to continue factorization.
  }
  return factors;
}

/* 
41. First Missing Positive

Given an unsorted integer array nums. Return the smallest positive integer that is not present in nums.

You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.

Example 1:
Input: nums = [1,2,0]
Output: 3
Explanation: The numbers in the range [1,2] are all in the array.

Example 2:
Input: nums = [3,4,-1,1]
Output: 2
Explanation: 1 is in the array but 2 is missing.

Example 3:
Input: nums = [7,8,9,11,12]
Output: 1
Explanation: The smallest positive integer 1 is missing.

Constraints:
1 <= nums.length <= 10^5
-2^31 <= nums[i] <= 2^31 - 1

</> Typescript Code:
*/

function firstMissingPositive(nums: number[]): number {
  let n = nums.length;
  // Iterate over each number in the array
  for (let i = 0; i < n; ++i) {
    // While the number is in the range [1, n] and not in its correct position
    while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      // Swap the number to its correct position
      let temp = nums[i];
      nums[i] = nums[temp - 1];
      nums[temp - 1] = temp;
    }
  }
  // Iterate again to find the first missing positive
  for (let i = 0; i < n; ++i) {
    // If the number at index i is not i+1, then i+1 is the missing positive
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }
  // If all positives [1, n] are present, return n+1
  return n + 1;
}

/* 
992. Subarrays with K Different Integers

Given an integer array nums and an integer k, return the number of good subarrays of nums.

A good array is an array where the number of different integers in that array is exactly k.

For example, [1,2,3,1,2] has 3 different integers: 1, 2, and 3.
A subarray is a contiguous part of an array.

Example 1:
Input: nums = [1,2,1,2,3], k = 2
Output: 7
Explanation: Subarrays formed with exactly 2 different integers: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2]

Example 2:
Input: nums = [1,2,1,3,4], k = 3
Output: 3
Explanation: Subarrays formed with exactly 3 different integers: [1,2,1,3], [2,1,3], [1,3,4].

Constraints:
1 <= nums.length <= 2 * 10^4
1 <= nums[i], k <= nums.length

</> Typescript Code:
*/

function subarraysWithKDistinct(nums: number[], k: number): number {
  let window1 = new Map(), // Tracks counts of numbers in the current window considering up to K distinct elements
    window2 = new Map(), // Tracks counts of numbers considering up to K-1 distinct elements
    left1 = 0, // Left boundary for the first window
    left2 = 0, // Left boundary for the second window
    right = 0, // Right boundary for both windows
    count = 0; // Counts the number of good subarrays

  const add = (map, key) => map.set(key, (map.get(key) || 0) + 1); // Helper to add/update key counts in a window
  const remove = (map, key) => {
    // Helper to remove/update key counts in a window
    if (map.get(key) === 1) map.delete(key); // If count is 1, remove key
    else map.set(key, map.get(key) - 1); // Otherwise, decrement count
  };

  while (right < nums.length) {
    // Iterate through the array
    add(window1, nums[right]); // Add current element to the first window
    add(window2, nums[right]); // Add current element to the second window

    while (window1.size > k) {
      // Ensure first window has exactly k distinct elements
      remove(window1, nums[left1++]); // Remove elements from the left if we have more than k distinct
    }
    while (window2.size >= k) {
      // Ensure second window has up to k-1 distinct elements
      remove(window2, nums[left2++]); // Remove elements from the left if we have k or more distinct
    }

    count += left2 - left1; // Count subarrays between the two windows
    right++; // Move to the next element
  }

  return count;
}

/* 
2444. Count Subarrays With Fixed Bounds

You are given an integer array nums and two integers minK and maxK.

A fixed-bound subarray of nums is a subarray that satisfies the following conditions:

The minimum value in the subarray is equal to minK.
The maximum value in the subarray is equal to maxK.
Return the number of fixed-bound subarrays.

A subarray is a contiguous part of an array.

Example 1:
Input: nums = [1,3,5,2,7,5], minK = 1, maxK = 5
Output: 2
Explanation: The fixed-bound subarrays are [1,3,5] and [1,3,5,2].

Example 2:
Input: nums = [1,1,1,1], minK = 1, maxK = 1
Output: 10
Explanation: Every subarray of nums is a fixed-bound subarray. There are 10 possible subarrays.

Constraints:
2 <= nums.length <= 10^5
1 <= nums[i], minK, maxK <= 10^6

</> Typescript Code:
*/

function countSubarraysHard(nums: number[], minK: number, maxK: number): number {
  let lastMin = -1, // Last index where minK was found
    lastMax = -1, // Last index where maxK was found
    lastInvalid = -1, // Last index where a value outside [minK, maxK] was found
    count = 0; // Count of valid subarrays

  for (let i = 0; i < nums.length; i++) {
    // Iterate through the array
    if (nums[i] < minK || nums[i] > maxK) lastInvalid = i; // Update last invalid index for out-of-bound values
    if (nums[i] === minK) lastMin = i; // Update last index of minK
    if (nums[i] === maxK) lastMax = i; // Update last index of maxK

    // Increase count by the number of valid subarrays ending at i
    // Valid subarray iff both minK and maxK have been seen at least once since the last invalid value
    count += Math.max(0, Math.min(lastMin, lastMax) - lastInvalid);
  }
  return count;
}

/* 
42. Trapping Rain Water

Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

Example 1:
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.

Example 2:
Input: height = [4,2,0,3,2,5]
Output: 9

Constraints:
n == height.length
1 <= n <= 2 * 10^4
0 <= height[i] <= 10^5

</> Typescript Code:
*/

function trap(height: number[]): number {
  // Initialize two pointers for traversing the heights from both ends
  let left = 0,
    right = height.length - 1;
  // Initialize variables to track the max heights seen so far from both ends
  let maxLeft = 0,
    maxRight = 0;
  // Initialize the answer variable to accumulate trapped water
  let ans = 0;

  // While the left pointer is less than the right pointer
  while (left < right) {
    // If the left height is less than the right height
    if (height[left] < height[right]) {
      // Check if the current left height is greater than or equal to maxLeft
      // If so, update maxLeft. Otherwise, add the difference to ans
      height[left] >= maxLeft ? (maxLeft = height[left]) : (ans += maxLeft - height[left]);
      // Move the left pointer to the right
      left++;
    } else {
      // Otherwise, do a similar check for the right side
      height[right] >= maxRight ? (maxRight = height[right]) : (ans += maxRight - height[right]);
      // Move the right pointer to the left
      right--;
    }
  }
  // Return the accumulated water
  return ans;
}

/* 
85. Maximal Rectangle

Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

Example 1:
Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 6
Explanation: The maximal rectangle is shown in the above picture.

Example 2:
Input: matrix = [["0"]]
Output: 0

Example 3:
Input: matrix = [["1"]]
Output: 1

Constraints:
rows == matrix.length
cols == matrix[i].length
1 <= row, cols <= 200
matrix[i][j] is '0' or '1'

</> Typescript Code:
*/

function maximalRectangle(matrix: string[][]): number {
  // Handle the empty matrix case
  if (matrix.length == 0) return 0;

  let maxArea = 0;
  // Initialize a DP table with zeros
  const dp = Array(matrix.length)
    .fill(0)
    .map(() => Array(matrix[0].length).fill(0));

  // Iterate through each cell of the matrix
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      // Only consider '1's for calculating area
      if (matrix[i][j] === '1') {
        // Update DP value: either start a new row or add to the existing sequence of '1's
        dp[i][j] = j === 0 ? 1 : dp[i][j - 1] + 1;
        let width = dp[i][j];
        // For each '1', check every row above it
        for (let k = i; k >= 0; k--) {
          width = Math.min(width, dp[k][j]); // Find the minimum width
          // Update maxArea by calculating the area with the current width
          maxArea = Math.max(maxArea, width * (i - k + 1));
        }
      }
    }
  }
  return maxArea;
}

/* 
1289. Minimum Falling Path Sum II

Given an n x n integer matrix grid, return the minimum sum of a falling path with non-zero shifts.

A falling path with non-zero shifts is a choice of exactly one element from each row of grid such that no two elements chosen in adjacent rows are in the same column.

Example 1:
Input: grid = [[1,2,3],[4,5,6],[7,8,9]]
Output: 13
Explanation: 
The possible falling paths are:
[1,5,9], [1,5,7], [1,6,7], [1,6,8],
[2,4,8], [2,4,9], [2,6,7], [2,6,8],
[3,4,8], [3,4,9], [3,5,7], [3,5,9]
The falling path with the smallest sum is [1,5,7], so the answer is 13.

Example 2:
Input: grid = [[7]]
Output: 7

Constraints:
n == grid.length == grid[i].length
1 <= n <= 200
-99 <= grid[i][j] <= 99

</> Typescript Code:
*/

// Function to compute the minimum falling path sum in a grid with the non-zero shift constraint
function minFallingPathSum(grid: number[][]): number {
  let n = grid.length;
  // Handle the trivial case where the grid is 1x1
  if (n === 1) return grid[0][0];
  // Initialize an array to store the minimum sums of falling paths ending in each column of the first row
  let prev = [...grid[0]];
  // Process each row starting from the second
  for (let i = 1; i < n; i++) {
    // Create a new array to store the minimum sums for the current row
    let curr = new Array(n).fill(Infinity);
    // Iterate over each column in the current row
    for (let j = 0; j < n; j++) {
      // Iterate over each column in the previous row to ensure the non-zero shift condition
      for (let k = 0; k < n; k++) {
        if (j !== k) {
          // Ensure the previous column isn't the same as the current
          curr[k] = Math.min(curr[k], prev[j] + grid[i][k]); // Update the min path sum ending at column k
        }
      }
    }
    // Update prev to the current row's results
    prev = curr;
  }
  // Return the minimum value from the last row's computed sums
  return Math.min(...prev);
}

/* 
514. Freedom Trail

In the video game Fallout 4, the quest "Road to Freedom" requires players to reach a metal dial called the "Freedom Trail Ring" and use the dial to spell a specific keyword to open the door.

Given a string ring that represents the code engraved on the outer ring and another string key that represents the keyword that needs to be spelled, return the minimum number of steps to spell all the characters in the keyword.

Initially, the first character of the ring is aligned at the "12:00" direction. You should spell all the characters in key one by one by rotating ring clockwise or anticlockwise to make each character of the string key aligned at the "12:00" direction and then by pressing the center button.

At the stage of rotating the ring to spell the key character key[i]:

You can rotate the ring clockwise or anticlockwise by one place, which counts as one step. The final purpose of the rotation is to align one of ring's characters at the "12:00" direction, where this character must equal key[i].
If the character key[i] has been aligned at the "12:00" direction, press the center button to spell, which also counts as one step. After the pressing, you could begin to spell the next character in the key (next stage). Otherwise, you have finished all the spelling.

Example 1:
Input: ring = "godding", key = "gd"
Output: 4
Explanation:
For the first key character 'g', since it is already in place, we just need 1 step to spell this character. 
For the second key character 'd', we need to rotate the ring "godding" anticlockwise by two steps to make it become "ddinggo".
Also, we need 1 more step for spelling.

So the final output is 4.
Example 2:
Input: ring = "godding", key = "godding"
Output: 13

Constraints:
1 <= ring.length, key.length <= 100
ring and key consist of only lower case English letters.
It is guaranteed that key could always be spelled by rotating ring.

</> Typescript Code:
*/

// Function to compute the minimum number of steps to spell all characters in key using the ring
function findRotateSteps(ring: string, key: string): number {
  const n = ring.length,
    m = key.length;
  // Map to store positions of each character in the ring
  const pos = new Map<string, number[]>();
  // Populate the map with the indices for each character in the ring
  for (let i = 0; i < n; i++) {
    if (!pos.has(ring[i])) pos.set(ring[i], []);
    pos.get(ring[i])!.push(i);
  }
  // DP array to store the minimum steps needed for each key character at each position of the ring
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(Infinity));
  // Initialize the DP array for the first character of the key
  for (let j of pos.get(key[0])!) {
    dp[0][j] = Math.min(j, n - j) + 1; // Minimum steps to move to each position from the start
  }
  // Compute the minimum steps for each character in the key
  for (let i = 1; i < m; i++) {
    for (let j of pos.get(key[i])!) {
      for (let k of pos.get(key[i - 1])!) {
        const cost = Math.min(Math.abs(j - k), n - Math.abs(j - k)) + 1; // Calculate cost of moving from one position to the next
        dp[i][j] = Math.min(dp[i][j], dp[i - 1][k] + cost); // Update DP value for current key character and position
      }
    }
  }
  // Return the minimum steps required to spell all characters in the key
  return Math.min(...dp[m - 1]);
}

/* 
834. Sum of Distances in Tree

There is an undirected connected tree with n nodes labeled from 0 to n - 1 and n - 1 edges.

You are given the integer n and the array edges where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the tree.

Return an array answer of length n where answer[i] is the sum of the distances between the ith node in the tree and all other nodes.

Example 1:
Input: n = 6, edges = [[0,1],[0,2],[2,3],[2,4],[2,5]]
Output: [8,12,6,10,10,10]
Explanation: The tree is shown above.
We can see that dist(0,1) + dist(0,2) + dist(0,3) + dist(0,4) + dist(0,5)
equals 1 + 1 + 2 + 2 + 2 = 8.
Hence, answer[0] = 8, and so on.

Example 2:
Input: n = 1, edges = []
Output: [0]

Example 3:
Input: n = 2, edges = [[1,0]]
Output: [1,1]

Constraints:
1 <= n <= 3 * 10^4
edges.length == n - 1
edges[i].length == 2
0 <= ai, bi < n
ai != bi
The given input represents a valid tree.

</> Typescript Code:
*/

// Function to compute the sum of distances in a tree
function sumOfDistancesInTree(n: number, edges: number[][]): number[] {
  // Create adjacency list for the tree
  const tree: number[][] = Array.from({length: n}, () => []);
  // Array to count the number of nodes in the subtree rooted at each node
  const count = new Array(n).fill(1);
  // Array to store the sum of distances for each node
  const answer = new Array(n).fill(0);

  // Build the tree from the edges
  for (let [u, v] of edges) {
    tree[u].push(v);
    tree[v].push(u);
  }

  // First DFS to calculate subtree sizes and initial distance sums from the root
  const dfs = (node, parent) => {
    for (let child of tree[node]) {
      if (child === parent) continue; // Avoid revisiting the parent node
      dfs(child, node); // Recur on the child
      count[node] += count[child]; // Update subtree size
      answer[node] += answer[child] + count[child]; // Update distances sum
    }
  };

  // Second DFS to adjust answers using the parent's already computed answer
  const dfs2 = (node, parent) => {
    for (let child of tree[node]) {
      if (child === parent) continue;
      answer[child] = answer[node] - count[child] + (n - count[child]);
      dfs2(child, node);
    }
  };

  // Perform the first DFS from the root (node 0)
  dfs(0, -1);
  // Adjust all answers with the second DFS
  dfs2(0, -1);

  return answer;
}

/* 
857. Minimum Cost to Hire K Workers

There are n workers. You are given two integer arrays quality and wage where quality[i] is the quality of the ith worker and wage[i] is the minimum wage expectation for the ith worker.

We want to hire exactly k workers to form a paid group. To hire a group of k workers, we must pay them according to the following rules:

Every worker in the paid group must be paid at least their minimum wage expectation.
In the group, each worker's pay must be directly proportional to their quality. This means if a worker’s quality is double that of another worker in the group, then they must be paid twice as much as the other worker.
Given the integer k, return the least amount of money needed to form a paid group satisfying the above conditions. Answers within 10-5 of the actual answer will be accepted.

Example 1:
Input: quality = [10,20,5], wage = [70,50,30], k = 2
Output: 105.00000
Explanation: We pay 70 to 0th worker and 35 to 2nd worker.

Example 2:
Input: quality = [3,1,10,10,1], wage = [4,8,2,2,7], k = 3
Output: 30.66667
Explanation: We pay 4 to 0th worker, 13.33333 to 2nd and 3rd workers separately.

Constraints:
n == quality.length == wage.length
1 <= k <= n <= 10^4
1 <= quality[i], wage[i] <= 10^4

</> Typescript Code:
*/

// import { MinPriorityQueue } from '@datastructures-js/priority-queue';

function mincostToHireWorkers(quality: number[], wage: number[], k: number): number {
  // Map each worker to an array containing their wage-to-quality ratio and their quality
  const workers = quality.map((q, i) => [wage[i] / q, q]).sort((a, b) => a[0] - b[0]); // Sort workers by their wage-to-quality ratio

  let totalQuality = 0; // Initialize total quality of the group
  const maxHeap = new MinPriorityQueue({priority: x => -x}); // Min-heap to keep the smallest quality values
  let minCost = Number.POSITIVE_INFINITY; // Initialize minimum cost to a large number

  // Loop through each worker
  for (let [ratio, q] of workers) {
    totalQuality += q; // Add this worker's quality to the total
    maxHeap.enqueue(q); // Add this quality to the heap
    if (maxHeap.size() > k) {
      // If the heap exceeds k, remove the largest quality
      totalQuality -= maxHeap.dequeue().element;
    }
    if (maxHeap.size() === k) {
      // If we have exactly k workers
      minCost = Math.min(minCost, ratio * totalQuality); // Update the minimum cost
    }
  }
  return minCost; // Return the computed minimum cost
}

/* 
3068. Find the Maximum Sum of Node Values

There exists an undirected tree with n nodes numbered 0 to n - 1. You are given a 0-indexed 2D integer array edges of length n - 1, where edges[i] = [ui, vi] indicates that there is an edge between nodes ui and vi in the tree. You are also given a positive integer k, and a 0-indexed array of non-negative integers nums of length n, where nums[i] represents the value of the node numbered i.

Alice wants the sum of values of tree nodes to be maximum, for which Alice can perform the following operation any number of times (including zero) on the tree:

Choose any edge [u, v] connecting the nodes u and v, and update their values as follows:
nums[u] = nums[u] XOR k
nums[v] = nums[v] XOR k
Return the maximum possible sum of the values Alice can achieve by performing the operation any number of times.

Example 1:
Input: nums = [1,2,1], k = 3, edges = [[0,1],[0,2]]
Output: 6
Explanation: Alice can achieve the maximum sum of 6 using a single operation:
- Choose the edge [0,2]. nums[0] and nums[2] become: 1 XOR 3 = 2, and the array nums becomes: [1,2,1] -> [2,2,2].
The total sum of values is 2 + 2 + 2 = 6.
It can be shown that 6 is the maximum achievable sum of values.

Example 2:
Input: nums = [2,3], k = 7, edges = [[0,1]]
Output: 9
Explanation: Alice can achieve the maximum sum of 9 using a single operation:
- Choose the edge [0,1]. nums[0] becomes: 2 XOR 7 = 5 and nums[1] become: 3 XOR 7 = 4, and the array nums becomes: [2,3] -> [5,4].
The total sum of values is 5 + 4 = 9.
It can be shown that 9 is the maximum achievable sum of values.

Example 3:
Input: nums = [7,7,7,7,7,7], k = 3, edges = [[0,1],[0,2],[0,3],[0,4],[0,5]]
Output: 42
Explanation: The maximum achievable sum is 42 which can be achieved by Alice performing no operations.

Constraints:
2 <= n == nums.length <= 2 * 10^4
1 <= k <= 10^9
0 <= nums[i] <= 10^9
edges.length == n - 1
edges[i].length == 2
0 <= edges[i][0], edges[i][1] <= n - 1
The input is generated such that edges represent a valid tree.

</> Typescript Code:
*/

function maximumValueSum(nums: number[], k: number, edges: number[][]): number {
  let bestSum: number = 0; // Variable to store the best possible sum
  let cnt: number = 0; // Counter for nodes where XORing increases the value

  // Compute the best possible sum and count the number of nodes where XORing increases the value
  for (let num of nums) {
    bestSum += Math.max(num, num ^ k); // Add the maximum value between the original and XORed value
    if ((num ^ k) > num) {
      cnt++; // Increment the counter if XORing increases the value
    }
  }

  // If cnt is odd, we need to adjust the sum
  if (cnt % 2 !== 0) {
    let minDifference: number = Number.MAX_SAFE_INTEGER; // Variable to store the minimum difference
    for (let num of nums) {
      minDifference = Math.min(minDifference, Math.abs(num - (num ^ k))); // Find the minimum difference
    }
    bestSum -= minDifference; // Adjust the sum by subtracting the minimum difference
  }

  return bestSum; // Return the best possible sum
}
