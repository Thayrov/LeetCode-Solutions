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

/* 
1255. Maximum Score Words Formed by Letters

Given a list of words, list of  single letters (might be repeating) and score of every character.

Return the maximum score of any valid set of words formed by using the given letters (words[i] cannot be used two or more times).

It is not necessary to use all characters in letters and each letter can only be used once. Score of letters 'a', 'b', 'c', ... ,'z' is given by score[0], score[1], ... , score[25] respectively.

Example 1:
Input: words = ["dog","cat","dad","good"], letters = ["a","a","c","d","d","d","g","o","o"], score = [1,0,9,5,0,0,3,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0]
Output: 23
Explanation:
Score  a=1, c=9, d=5, g=3, o=2
Given letters, we can form the words "dad" (5+1+5) and "good" (3+2+2+5) with a score of 23.
Words "dad" and "dog" only get a score of 21.

Example 2:
Input: words = ["xxxz","ax","bx","cx"], letters = ["z","a","b","c","x","x","x"], score = [4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,10]
Output: 27
Explanation:
Score  a=4, b=4, c=4, x=5, z=10
Given letters, we can form the words "ax" (4+5), "bx" (4+5) and "cx" (4+5) with a score of 27.
Word "xxxz" only get a score of 25.

Example 3:
Input: words = ["leetcode"], letters = ["l","e","t","c","o","d"], score = [0,0,1,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0]
Output: 0
Explanation:
Letter "e" can only be used once.

Constraints:
1 <= words.length <= 14
1 <= words[i].length <= 15
1 <= letters.length <= 100
letters[i].length == 1
score.length == 26
0 <= score[i] <= 10
words[i], letters[i] contains only lower case English letters.

</> Typescript Code:
*/

function maxScoreWords(words: string[], letters: string[], score: number[]): number {
  // Initialize an array to count the available letters
  const letterCount = new Array(26).fill(0);
  for (const letter of letters) {
    letterCount[letter.charCodeAt(0) - 97]++;
  }

  // Function to calculate the score of a word
  function getWordScore(word: string): number {
    let wordScore = 0;
    for (const char of word) {
      wordScore += score[char.charCodeAt(0) - 97];
    }
    return wordScore;
  }

  // Function to check if a word can be formed with the available letters
  function canFormWord(word: string, letterCount: number[]): boolean {
    const tempCount = [...letterCount];
    for (const char of word) {
      const index = char.charCodeAt(0) - 97;
      if (tempCount[index] === 0) return false;
      tempCount[index]--;
    }
    return true;
  }

  // Depth-First Search (DFS) function to explore all combinations of words
  function dfs(index: number, currentScore: number, letterCount: number[]): number {
    // Base case: if all words are considered, return the current score
    if (index === words.length) return currentScore;

    // Recursive call without including the current word
    let maxScore = dfs(index + 1, currentScore, letterCount);

    // Check if the current word can be formed and include it if possible
    if (canFormWord(words[index], letterCount)) {
      const tempCount = [...letterCount];
      for (const char of words[index]) {
        tempCount[char.charCodeAt(0) - 97]--;
      }
      // Recursive call including the current word
      maxScore = Math.max(
        maxScore,
        dfs(index + 1, currentScore + getWordScore(words[index]), tempCount),
      );
    }

    // Return the maximum score obtained
    return maxScore;
  }

  // Start the DFS with the first word, initial score of 0, and available letter counts
  return dfs(0, 0, letterCount);
}

/* 
140. Word Break II

Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

Example 1:
Input: s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
Output: ["cats and dog","cat sand dog"]

Example 2:
Input: s = "pineapplepenapple", wordDict = ["apple","pen","applepen","pine","pineapple"]
Output: ["pine apple pen apple","pineapple pen apple","pine applepen apple"]
Explanation: Note that you are allowed to reuse a dictionary word.

Example 3:
Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: []

Constraints:
1 <= s.length <= 20
1 <= wordDict.length <= 1000
1 <= wordDict[i].length <= 10
s and wordDict[i] consist of only lowercase English letters.
All the strings of wordDict are unique.
Input is generated in a way that the length of the answer doesn't exceed 10^5.

</> Typescript Code:
*/

function wordBreak(s: string, wordDict: string[]): string[] {
  // Convert wordDict to a set for faster lookup
  const wordSet = new Set(wordDict);
  // Memoization map to store intermediate results using number as key
  const memo = new Map<number, string[]>();

  // Helper function for backtracking
  function backtrack(start: number): string[] {
    // If start index reaches the end of the string, return an empty string
    if (start === s.length) return [''];
    // If result for this start index is already computed, return it
    if (memo.has(start)) return memo.get(start)!;

    // Array to store sentences formed from the current start index
    const results: string[] = [];

    // Iterate over all possible end indices
    for (let end = start + 1; end <= s.length; end++) {
      const word = s.slice(start, end);
      // If the substring is a valid word, proceed to find sentences from the end index
      if (wordSet.has(word)) {
        const subResults = backtrack(end);
        // Concatenate the current word with results from the end index
        for (const sub of subResults) {
          results.push(word + (sub ? ' ' + sub : ''));
        }
      }
    }

    // Memoize the results for the current start index
    memo.set(start, results);
    return results;
  }

  // Start backtracking from the beginning of the string
  return backtrack(0);
}

/* 
552. Student Attendance Record II

An attendance record for a student can be represented as a string where each character signifies whether the student was absent, late, or present on that day. The record only contains the following three characters:

'A': Absent.
'L': Late.
'P': Present.
Any student is eligible for an attendance award if they meet both of the following criteria:

The student was absent ('A') for strictly fewer than 2 days total.
The student was never late ('L') for 3 or more consecutive days.
Given an integer n, return the number of possible attendance records of length n that make a student eligible for an attendance award. The answer may be very large, so return it modulo 109 + 7.

Example 1:
Input: n = 2
Output: 8
Explanation: There are 8 records with length 2 that are eligible for an award:
"PP", "AP", "PA", "LP", "PL", "AL", "LA", "LL"
Only "AA" is not eligible because there are 2 absences (there need to be fewer than 2).

Example 2:
Input: n = 1
Output: 3

Example 3:
Input: n = 10101
Output: 183236316

Constraints:
1 <= n <= 10^5

</> Typescript Code:
*/

function checkRecord(n: number): number {
  // Define the modulo constant
  const MOD = 1e9 + 7;

  // Initialize the DP table with dimensions [n+1][2][3]
  // dp[i][a][l] represents the number of valid sequences of length i with a 'A' and l 'L'
  const dp = Array.from({length: n + 1}, () =>
    Array(2)
      .fill(0)
      .map(() => Array(3).fill(0)),
  );
  // Base case: There's one valid sequence of length 0 (the empty sequence)
  dp[0][0][0] = 1;

  // Fill the DP table
  for (let i = 1; i <= n; i++) {
    for (let a = 0; a <= 1; a++) {
      for (let l = 0; l <= 2; l++) {
        // Add the number of sequences ending with 'P'
        dp[i][a][0] = (dp[i][a][0] + dp[i - 1][a][l]) % MOD;
        // Add the number of sequences ending with 'A', if there's no 'A' yet
        if (a > 0) dp[i][a][0] = (dp[i][a][0] + dp[i - 1][a - 1][l]) % MOD;
        // Add the number of sequences ending with 'L', if there's no more than 2 consecutive 'L's
        if (l > 0) dp[i][a][l] = (dp[i][a][l] + dp[i - 1][a][l - 1]) % MOD;
      }
    }
  }

  // Sum up all valid sequences of length n
  let result = 0;
  for (let a = 0; a <= 1; a++) {
    for (let l = 0; l <= 2; l++) {
      result = (result + dp[n][a][l]) % MOD;
    }
  }

  // Return the total number of valid sequences modulo 10^9 + 7
  return result;
}

/* 
502. IPO

Suppose LeetCode will start its IPO soon. In order to sell a good price of its shares to Venture Capital, LeetCode would like to work on some projects to increase its capital before the IPO. Since it has limited resources, it can only finish at most k distinct projects before the IPO. Help LeetCode design the best way to maximize its total capital after finishing at most k distinct projects.

You are given n projects where the ith project has a pure profit profits[i] and a minimum capital of capital[i] is needed to start it.

Initially, you have w capital. When you finish a project, you will obtain its pure profit and the profit will be added to your total capital.

Pick a list of at most k distinct projects from given projects to maximize your final capital, and return the final maximized capital.

The answer is guaranteed to fit in a 32-bit signed integer.

Example 1:
Input: k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]
Output: 4
Explanation: Since your initial capital is 0, you can only start the project indexed 0.
After finishing it you will obtain profit 1 and your capital becomes 1.
With capital 1, you can either start the project indexed 1 or the project indexed 2.
Since you can choose at most 2 projects, you need to finish the project indexed 2 to get the maximum capital.
Therefore, output the final maximized capital, which is 0 + 1 + 3 = 4.

Example 2:
Input: k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]
Output: 6

Constraints:
1 <= k <= 10^5
0 <= w <= 10^9
n == profits.length
n == capital.length
1 <= n <= 10^5
0 <= profits[i] <= 10^4
0 <= capital[i] <= 10^9

</> Typescript Code:
*/

function findMaximizedCapital(k: number, w: number, profits: number[], capital: number[]): number {
  // Combine profits and capital into a single array of projects
  const projects = profits.map((profit, index) => [profit, capital[index]]);
  // Sort projects by their capital requirement in ascending order
  projects.sort((a, b) => a[1] - b[1]);

  // Create a max-heap to store the profits of the projects we can afford
  // npm install @datastructures-js/priority-queue
  // import { MaxPriorityQueue } from '@datastructures-js/priority-queue';
  const maxHeap = new MaxPriorityQueue({priority: (project: number[]) => project[0]});
  let i = 0;

  // Iterate up to k times, as we can complete at most k projects
  for (let j = 0; j < k; j++) {
    // Add all affordable projects to the max-heap
    while (i < projects.length && projects[i][1] <= w) {
      maxHeap.enqueue(projects[i]);
      i++;
    }
    // If no projects are affordable, break the loop
    if (maxHeap.size() === 0) break;
    // Complete the project with the maximum profit
    w += maxHeap.dequeue().element[0];
  }

  // Return the final capital after completing up to k projects
  return w;
}

/* 
330. Patching Array

Given a sorted integer array nums and an integer n, add/patch elements to the array such that any number in the range [1, n] inclusive can be formed by the sum of some elements in the array.

Return the minimum number of patches required.

Example 1:
Input: nums = [1,3], n = 6
Output: 1
Explanation:
Combinations of nums are [1], [3], [1,3], which form possible sums of: 1, 3, 4.
Now if we add/patch 2 to nums, the combinations are: [1], [2], [3], [1,3], [2,3], [1,2,3].
Possible sums are 1, 2, 3, 4, 5, 6, which now covers the range [1, 6].
So we only need 1 patch.

Example 2:
Input: nums = [1,5,10], n = 20
Output: 2
Explanation: The two patches can be [2, 4].

Example 3:
Input: nums = [1,2,2], n = 5
Output: 0

Constraints:
1 <= nums.length <= 1000
1 <= nums[i] <= 10^4
nums is sorted in ascending order.
1 <= n <= 2^31 - 1

</> Typescript Code:
*/

function minPatches(nums: number[], n: number): number {
  // Initialize the number of patches required to 0
  let patches = 0;
  // Initialize the smallest number that we cannot form yet
  let miss = 1;
  // Initialize the index to traverse the nums array
  let i = 0;

  // Loop until we can form numbers up to n
  while (miss <= n) {
    // If the current number in nums is less than or equal to the smallest missing number
    if (i < nums.length && nums[i] <= miss) {
      // Add this number to the range we can form and move to the next number in nums
      miss += nums[i];
      i++;
    } else {
      // Otherwise, patch the array by adding the smallest missing number itself
      miss += miss;
      patches++;
    }
  }

  // Return the number of patches required
  return patches;
}

/*  
995. Minimum Number of K Consecutive Bit Flips

You are given a binary array nums and an integer k.

A k-bit flip is choosing a subarray of length k from nums and simultaneously changing every 0 in the subarray to 1, and every 1 in the subarray to 0.

Return the minimum number of k-bit flips required so that there is no 0 in the array. If it is not possible, return -1.

A subarray is a contiguous part of an array.

Example 1:
Input: nums = [0,1,0], k = 1
Output: 2
Explanation: Flip nums[0], then flip nums[2].

Example 2:
Input: nums = [1,1,0], k = 2
Output: -1
Explanation: No matter how we flip subarrays of size 2, we cannot make the array become [1,1,1].

Example 3:
Input: nums = [0,0,0,1,0,1,1,0], k = 3
Output: 3
Explanation: 
Flip nums[0],nums[1],nums[2]: nums becomes [1,1,1,1,0,1,1,0]
Flip nums[4],nums[5],nums[6]: nums becomes [1,1,1,1,1,0,0,0]
Flip nums[5],nums[6],nums[7]: nums becomes [1,1,1,1,1,1,1,1]

Constraints:
1 <= nums.length <= 10^5
1 <= k <= nums.length

</> Typescript Code:
*/

function minKBitFlips(nums: number[], k: number): number {
  let n = nums.length; // Length of the input array
  let flipCount = 0; // Tracks the number of flips performed
  let result = 0; // Stores the minimum number of k-bit flips
  let isFlipped = new Array(n).fill(0); // Array to track flips at each index

  for (let i = 0; i < n; i++) {
    // Iterate through the nums array
    if (i >= k) {
      // When the window exceeds k, remove the effect of the oldest flip
      flipCount ^= isFlipped[i - k]; // Update flipCount by removing the oldest flip effect
    }

    if (nums[i] == flipCount % 2) {
      // Check if the current bit needs flipping
      if (i + k > n) {
        // If the remaining elements are less than k, return -1
        return -1;
      }
      result++; // Increment the result as we perform a flip
      flipCount ^= 1; // Update the flipCount to reflect the new flip
      isFlipped[i] = 1; // Mark the current index as flipped
    }
  }

  return result; // Return the minimum number of flips required
}

/* 
1579. Remove Max Number of Edges to Keep Graph Fully Traversable

Alice and Bob have an undirected graph of n nodes and three types of edges:

Type 1: Can be traversed by Alice only.
Type 2: Can be traversed by Bob only.
Type 3: Can be traversed by both Alice and Bob.
Given an array edges where edges[i] = [typei, ui, vi] represents a bidirectional edge of type typei between nodes ui and vi, find the maximum number of edges you can remove so that after removing the edges, the graph can still be fully traversed by both Alice and Bob. The graph is fully traversed by Alice and Bob if starting from any node, they can reach all other nodes.

Return the maximum number of edges you can remove, or return -1 if Alice and Bob cannot fully traverse the graph.

Example 1:
Input: n = 4, edges = [[3,1,2],[3,2,3],[1,1,3],[1,2,4],[1,1,2],[2,3,4]]
Output: 2
Explanation: If we remove the 2 edges [1,1,2] and [1,1,3]. The graph will still be fully traversable by Alice and Bob. Removing any additional edge will not make it so. So the maximum number of edges we can remove is 2.

Example 2:
Input: n = 4, edges = [[3,1,2],[3,2,3],[1,1,4],[2,1,4]]
Output: 0
Explanation: Notice that removing any edge will not make the graph fully traversable by Alice and Bob.

Example 3:
Input: n = 4, edges = [[3,2,3],[1,1,2],[2,3,4]]
Output: -1
Explanation: In the current graph, Alice cannot reach node 4 from the other nodes. Likewise, Bob cannot reach 1. Therefore it's impossible to make the graph fully traversable.

Constraints:
1 <= n <= 10^5
1 <= edges.length <= min(105, 3 * n * (n - 1) / 2)
edges[i].length == 3
1 <= typei <= 3
1 <= ui < vi <= n
All tuples (typei, ui, vi) are distinct.

</> Typescript Code:
*/

function maxNumEdgesToRemove(n: number, edges: number[][]): number {
  class UnionFind {
    parent: number[];
    rank: number[];

    constructor(size: number) {
      this.parent = Array.from({length: size}, (_, i) => i); // Initialize parent array
      this.rank = new Array(size).fill(0); // Initialize rank array
    }

    find(x: number): number {
      if (this.parent[x] !== x) {
        this.parent[x] = this.find(this.parent[x]); // Path compression
      }
      return this.parent[x];
    }

    union(x: number, y: number): boolean {
      const rootX = this.find(x);
      const rootY = this.find(y);

      if (rootX === rootY) return false; // They are already connected

      if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX; // Attach smaller tree under root of larger tree
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else {
        this.parent[rootY] = rootX; // If ranks are equal, make one root and increase its rank
        this.rank[rootX]++;
      }
      return true;
    }

    isConnected(x: number, y: number): boolean {
      return this.find(x) === this.find(y); // Check if two nodes are connected
    }
  }

  const aliceUF = new UnionFind(n + 1); // UnionFind for Alice
  const bobUF = new UnionFind(n + 1); // UnionFind for Bob
  let usedEdges = 0; // Count of edges used

  // Process type 3 edges first
  for (const [type, u, v] of edges) {
    if (type === 3) {
      if (aliceUF.union(u, v)) {
        bobUF.union(u, v); // Union in both Alice's and Bob's graph
        usedEdges++;
      }
    }
  }

  // Process type 1 and 2 edges
  for (const [type, u, v] of edges) {
    if (type === 1) {
      if (aliceUF.union(u, v)) {
        usedEdges++; // Union in Alice's graph
      }
    } else if (type === 2) {
      if (bobUF.union(u, v)) {
        usedEdges++; // Union in Bob's graph
      }
    }
  }

  // Check if both Alice's and Bob's graphs are fully traversable
  for (let i = 1; i <= n; i++) {
    if (!aliceUF.isConnected(1, i) || !bobUF.isConnected(1, i)) {
      return -1; // If not, return -1
    }
  }

  return edges.length - usedEdges; // Return the maximum number of edges that can be removed
}

/* 
2751. Robot Collisions

There are n 1-indexed robots, each having a position on a line, health, and movement direction.

You are given 0-indexed integer arrays positions, healths, and a string directions (directions[i] is either 'L' for left or 'R' for right). All integers in positions are unique.

All robots start moving on the line simultaneously at the same speed in their given directions. If two robots ever share the same position while moving, they will collide.

If two robots collide, the robot with lower health is removed from the line, and the health of the other robot decreases by one. The surviving robot continues in the same direction it was going. If both robots have the same health, they are both removed from the line.

Your task is to determine the health of the robots that survive the collisions, in the same order that the robots were given, i.e. final heath of robot 1 (if survived), final health of robot 2 (if survived), and so on. If there are no survivors, return an empty array.

Return an array containing the health of the remaining robots (in the order they were given in the input), after no further collisions can occur.

Note: The positions may be unsorted.

Example 1:
Input: positions = [5,4,3,2,1], healths = [2,17,9,15,10], directions = "RRRRR"
Output: [2,17,9,15,10]
Explanation: No collision occurs in this example, since all robots are moving in the same direction. So, the health of the robots in order from the first robot is returned, [2, 17, 9, 15, 10].

Example 2:
Input: positions = [3,5,2,6], healths = [10,10,15,12], directions = "RLRL"
Output: [14]
Explanation: There are 2 collisions in this example. Firstly, robot 1 and robot 2 will collide, and since both have the same health, they will be removed from the line. Next, robot 3 and robot 4 will collide and since robot 4's health is smaller, it gets removed, and robot 3's health becomes 15 - 1 = 14. Only robot 3 remains, so we return [14].

Example 3:
Input: positions = [1,2,5,6], healths = [10,10,11,11], directions = "RLRL"
Output: []
Explanation: Robot 1 and robot 2 will collide and since both have the same health, they are both removed. Robot 3 and 4 will collide and since both have the same health, they are both removed. So, we return an empty array, [].


Constraints:
1 <= positions.length == healths.length == directions.length == n <= 10^5
1 <= positions[i], healths[i] <= 10^9
directions[i] == 'L' or directions[i] == 'R'
All values in positions are distinct

</> Typescript Code:
*/

function survivedRobotsHealths(
  positions: number[],
  healths: number[],
  directions: string,
): number[] {
  // Combine positions, healths, and directions into a single array of objects with an additional index field
  const robots = positions.map((pos, index) => ({
    pos,
    health: healths[index],
    dir: directions[index],
    index,
  }));

  // Sort robots by their positions
  robots.sort((a, b) => a.pos - b.pos);

  // Initialize a stack to handle collisions
  const stack: {pos: number; health: number; dir: string; index: number}[] = [];

  // Iterate through each robot
  for (const robot of robots) {
    // Handle collisions between robots moving in opposite directions
    while (stack.length && stack[stack.length - 1].dir === 'R' && robot.dir === 'L') {
      const top = stack.pop();
      if (!top) break;
      if (top.health > robot.health) {
        // Top robot wins the collision and its health decreases by 1
        stack.push({...top, health: top.health - 1});
        robot.health = 0;
        break;
      } else if (top.health < robot.health) {
        // Current robot wins the collision and its health decreases by 1
        robot.health -= 1;
      } else {
        // Both robots have the same health and are removed
        robot.health = 0;
        break;
      }
    }
    // If the robot still has health, push it onto the stack
    if (robot.health > 0) stack.push(robot);
  }

  // Sort the surviving robots by their original index to return healths in the original order
  return stack.sort((a, b) => a.index - b.index).map(robot => robot.health);
}

/* 
726. Number of Atoms

Given a string formula representing a chemical formula, return the count of each atom.

The atomic element always starts with an uppercase character, then zero or more lowercase letters, representing the name.

One or more digits representing that element's count may follow if the count is greater than 1. If the count is 1, no digits will follow.

For example, "H2O" and "H2O2" are possible, but "H1O2" is impossible.
Two formulas are concatenated together to produce another formula.

For example, "H2O2He3Mg4" is also a formula.
A formula placed in parentheses, and a count (optionally added) is also a formula.

For example, "(H2O2)" and "(H2O2)3" are formulas.
Return the count of all elements as a string in the following form: the first name (in sorted order), followed by its count (if that count is more than 1), followed by the second name (in sorted order), followed by its count (if that count is more than 1), and so on.

The test cases are generated so that all the values in the output fit in a 32-bit integer.

Example 1:
Input: formula = "H2O"
Output: "H2O"
Explanation: The count of elements are {'H': 2, 'O': 1}.

Example 2:
Input: formula = "Mg(OH)2"
Output: "H2MgO2"
Explanation: The count of elements are {'H': 2, 'Mg': 1, 'O': 2}.

Example 3:
Input: formula = "K4(ON(SO3)2)2"
Output: "K4N2O14S4"
Explanation: The count of elements are {'K': 4, 'N': 2, 'O': 14, 'S': 4}.

Constraints:
1 <= formula.length <= 1000
formula consists of English letters, digits, '(', and ')'.
formula is always valid.

</> Typescript Code:
*/

function countOfAtoms(formula: string): string {
  // Stack to handle nested scopes
  const stack: Map<string, number>[] = [];
  // Current map to store atoms and their counts at current scope
  let currentMap = new Map<string, number>();
  let i = 0;

  // Iterate through the formula string
  while (i < formula.length) {
    const char = formula[i];

    if (char === '(') {
      // Push current map to stack and reset for new scope
      stack.push(currentMap);
      currentMap = new Map<string, number>();
      i++;
    } else if (char === ')') {
      // Handle closing parentheses and optional number following
      let j = i + 1;
      let num = 0;

      // Parse optional number after closing parentheses
      while (j < formula.length && /^\d$/.test(formula[j])) {
        num = num * 10 + parseInt(formula[j]);
        j++;
      }

      num = Math.max(1, num); // Ensure at least 1 if no number provided

      // Multiply current map counts by num if num > 1
      if (num > 1) {
        for (const [atom, count] of currentMap.entries()) {
          currentMap.set(atom, count * num);
        }
      }

      // Merge current map into previous map from stack
      const prevMap = stack.pop();

      if (prevMap) {
        for (const [atom, count] of currentMap.entries()) {
          prevMap.set(atom, (prevMap.get(atom) || 0) + count);
        }
        currentMap = prevMap; // Reset current map to previous scope
      }

      i = j; // Move index past closing parentheses and optional number
    } else {
      // Handle atoms and their optional following numbers
      let atomEnd = i + 1;

      // Determine end of atom name (can have lowercase letters after first)
      while (
        atomEnd < formula.length &&
        /[a-z]/.test(formula[atomEnd]) &&
        /[A-Z]/.test(formula[atomEnd - 1])
      ) {
        atomEnd++;
      }

      const atom = formula.slice(i, atomEnd); // Extract atom name
      i = atomEnd; // Move index to end of atom name

      let num = 0;

      // Parse optional number following atom name
      while (i < formula.length && /^\d$/.test(formula[i])) {
        num = num * 10 + parseInt(formula[i]);
        i++;
      }

      num = Math.max(1, num); // Ensure at least 1 if no number provided

      // Update current map with atom count
      currentMap.set(atom, (currentMap.get(atom) || 0) + num);
    }
  }

  // Sort atoms alphabetically and generate final result string
  const sortedAtoms = Array.from(currentMap.keys()).sort();
  let result = '';

  for (const atom of sortedAtoms) {
    result += atom;
    const count = currentMap.get(atom)!;
    if (count > 1) {
      result += count;
    }
  }

  return result; // Return final result
}

/* 
2392. Build a Matrix With Conditions

You are given a positive integer k. You are also given:

a 2D integer array rowConditions of size n where rowConditions[i] = [abovei, belowi], and
a 2D integer array colConditions of size m where colConditions[i] = [lefti, righti].
The two arrays contain integers from 1 to k.

You have to build a k x k matrix that contains each of the numbers from 1 to k exactly once. The remaining cells should have the value 0.

The matrix should also satisfy the following conditions:

The number abovei should appear in a row that is strictly above the row at which the number belowi appears for all i from 0 to n - 1.
The number lefti should appear in a column that is strictly left of the column at which the number righti appears for all i from 0 to m - 1.
Return any matrix that satisfies the conditions. If no answer exists, return an empty matrix.

Example 1:
Input: k = 3, rowConditions = [[1,2],[3,2]], colConditions = [[2,1],[3,2]]
Output: [[3,0,0],[0,0,1],[0,2,0]]
Explanation: The diagram above shows a valid example of a matrix that satisfies all the conditions.
The row conditions are the following:
- Number 1 is in row 1, and number 2 is in row 2, so 1 is above 2 in the matrix.
- Number 3 is in row 0, and number 2 is in row 2, so 3 is above 2 in the matrix.
The column conditions are the following:
- Number 2 is in column 1, and number 1 is in column 2, so 2 is left of 1 in the matrix.
- Number 3 is in column 0, and number 2 is in column 1, so 3 is left of 2 in the matrix.
Note that there may be multiple correct answers.

Example 2:
Input: k = 3, rowConditions = [[1,2],[2,3],[3,1],[2,3]], colConditions = [[2,1]]
Output: []
Explanation: From the first two conditions, 3 has to be below 1 but the third conditions needs 3 to be above 1 to be satisfied.
No matrix can satisfy all the conditions, so we return the empty matrix.

Constraints:
2 <= k <= 400
1 <= rowConditions.length, colConditions.length <= 10^4
rowConditions[i].length == colConditions[i].length == 2
1 <= abovei, belowi, lefti, righti <= k
abovei != belowi
lefti != righti

</> Typescript Code:
*/

// Commented Solution
function buildMatrix(k: number, rowConditions: number[][], colConditions: number[][]): number[][] {
  // Function to perform topological sort on given conditions
  const topologicalSort = (conditions: number[][]) => {
    // Initialize graph and in-degree map for k elements
    const graph = new Map<number, number[]>();
    const inDegree = new Map<number, number>();
    for (let i = 1; i <= k; i++) {
      graph.set(i, []);
      inDegree.set(i, 0);
    }
    // Build the graph and in-degree map from conditions
    for (const [u, v] of conditions) {
      graph.get(u)!.push(v);
      inDegree.set(v, (inDegree.get(v) || 0) + 1);
    }
    // Initialize queue with nodes having zero in-degree
    const queue: number[] = [];
    for (const [node, degree] of inDegree) {
      if (degree === 0) queue.push(node);
    }
    const result: number[] = [];
    // Process nodes in topological order
    while (queue.length) {
      const node = queue.shift()!;
      result.push(node);
      for (const neighbor of graph.get(node)!) {
        inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
        if (inDegree.get(neighbor) === 0) queue.push(neighbor);
      }
    }
    // Return the result if it contains all nodes, otherwise return empty array
    return result.length === k ? result : [];
  };

  // Get row and column orders using topological sort
  const rowOrder = topologicalSort(rowConditions);
  const colOrder = topologicalSort(colConditions);
  // If any order is empty, return an empty matrix
  if (rowOrder.length === 0 || colOrder.length === 0) return [];

  // Map positions from orders to their indices
  const rowPos = new Map(rowOrder.map((num, idx) => [num, idx]));
  const colPos = new Map(colOrder.map((num, idx) => [num, idx]));
  // Initialize the matrix with zeros
  const matrix = Array.from({length: k}, () => Array(k).fill(0));
  // Place numbers in the matrix according to their positions
  for (let i = 1; i <= k; i++) {
    matrix[rowPos.get(i)!][colPos.get(i)!] = i;
  }
  return matrix;
}

/* 
2045. Second Minimum Time to Reach Destination

A city is represented as a bi-directional connected graph with n vertices where each vertex is labeled from 1 to n (inclusive). The edges in the graph are represented as a 2D integer array edges, where each edges[i] = [ui, vi] denotes a bi-directional edge between vertex ui and vertex vi. Every vertex pair is connected by at most one edge, and no vertex has an edge to itself. The time taken to traverse any edge is time minutes.

Each vertex has a traffic signal which changes its color from green to red and vice versa every change minutes. All signals change at the same time. You can enter a vertex at any time, but can leave a vertex only when the signal is green. You cannot wait at a vertex if the signal is green.

The second minimum value is defined as the smallest value strictly larger than the minimum value.

For example the second minimum value of [2, 3, 4] is 3, and the second minimum value of [2, 2, 4] is 4.
Given n, edges, time, and change, return the second minimum time it will take to go from vertex 1 to vertex n.

Notes:
You can go through any vertex any number of times, including 1 and n.
You can assume that when the journey starts, all signals have just turned green.

Example 1:
Input: n = 5, edges = [[1,2],[1,3],[1,4],[3,4],[4,5]], time = 3, change = 5
Output: 13
Explanation:
The figure on the left shows the given graph.
The blue path in the figure on the right is the minimum time path.
The time taken is:
- Start at 1, time elapsed=0
- 1 -> 4: 3 minutes, time elapsed=3
- 4 -> 5: 3 minutes, time elapsed=6
Hence the minimum time needed is 6 minutes.
The red path shows the path to get the second minimum time.
- Start at 1, time elapsed=0
- 1 -> 3: 3 minutes, time elapsed=3
- 3 -> 4: 3 minutes, time elapsed=6
- Wait at 4 for 4 minutes, time elapsed=10
- 4 -> 5: 3 minutes, time elapsed=13
Hence the second minimum time is 13 minutes.      

Example 2:
Input: n = 2, edges = [[1,2]], time = 3, change = 2
Output: 11
Explanation:
The minimum time path is 1 -> 2 with time = 3 minutes.
The second minimum time path is 1 -> 2 -> 1 -> 2 with time = 11 minutes.

Constraints:
2 <= n <= 10^4
n - 1 <= edges.length <= min(2 * 10^4, n * (n - 1) / 2)
edges[i].length == 2
1 <= ui, vi <= n
ui != vi
There are no duplicate edges.
Each vertex can be reached directly or indirectly from every other vertex.
1 <= time, change <= 10^3

</> Typescript Code:
*/

function secondMinimum(n: number, edges: number[][], time: number, change: number): number {
  // Initialize the graph as an adjacency list
  const graph: number[][] = Array.from({length: n + 1}, () => []);
  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  // Initialize distances array to store the first and second minimum distances to each node
  const distances = Array.from({length: n + 1}, () => [
    Number.MAX_SAFE_INTEGER,
    Number.MAX_SAFE_INTEGER,
  ]);
  // BFS queue to explore the nodes
  const queue = [[1, 0]];
  distances[1][0] = 0;

  while (queue.length) {
    const [node, dist] = queue.shift()!; // Dequeue an element
    for (const neighbor of graph[node]) {
      // Traverse the neighbors of the current node
      const waitTime = Math.floor(dist / change) % 2 === 1 ? change - (dist % change) : 0; // Calculate wait time if the signal is red
      const newDist = dist + time + waitTime; // Total time to reach the neighbor
      if (newDist < distances[neighbor][0]) {
        // Update if new distance is smaller than the smallest recorded distance
        distances[neighbor][1] = distances[neighbor][0];
        distances[neighbor][0] = newDist;
        queue.push([neighbor, newDist]); // Enqueue the neighbor
      } else if (newDist > distances[neighbor][0] && newDist < distances[neighbor][1]) {
        // Update if new distance is second smallest
        distances[neighbor][1] = newDist;
        queue.push([neighbor, newDist]); // Enqueue the neighbor
      }
    }
  }

  return distances[n][1]; // Return the second minimum distance to the last node
}

/* 
273. Integer to English Words

Convert a non-negative integer num to its English words representation.

Example 1:
Input: num = 123
Output: "One Hundred Twenty Three"

Example 2:
Input: num = 12345
Output: "Twelve Thousand Three Hundred Forty Five"

Example 3:
Input: num = 1234567
Output: "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"

Constraints:
0 <= num <= 23^1 - 1

</> Typescript Code:
*/

function numberToWords(num: number): string {
  if (num === 0) return 'Zero'; // If number is 0, return "Zero" immediately

  // Arrays to store word representations of numbers
  const belowTwenty = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];
  const tens = [
    '',
    '',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety',
  ];
  const thousands = ['', 'Thousand', 'Million', 'Billion'];

  // Helper function to convert number less than 1000 to words
  const helper = (n: number): string => {
    if (n === 0) return ''; // Base case for recursion: if n is 0, return an empty string
    else if (n < 20)
      return belowTwenty[n] + ' '; // If n is less than 20, get the word from belowTwenty array
    else if (n < 100)
      return tens[Math.floor(n / 10)] + ' ' + helper(n % 10); // For numbers between 20 and 99
    else return belowTwenty[Math.floor(n / 100)] + ' Hundred ' + helper(n % 100); // For numbers between 100 and 999
  };

  let result = ''; // Initialize result string

  // Process the number in chunks of 1000
  for (let i = 0; num > 0; i++) {
    if (num % 1000 !== 0) {
      // Only process if the current chunk is not zero
      result = helper(num % 1000) + thousands[i] + ' ' + result; // Convert chunk to words and add to result
    }
    num = Math.floor(num / 1000); // Move to the next chunk
  }

  return result.trim(); // Return the trimmed result string
}

/* 
1568. Minimum Number of Days to Disconnect Island

You are given an m x n binary grid grid where 1 represents land and 0 represents water. An island is a maximal 4-directionally (horizontal or vertical) connected group of 1's.

The grid is said to be connected if we have exactly one island, otherwise is said disconnected.

In one day, we are allowed to change any single land cell (1) into a water cell (0).

Return the minimum number of days to disconnect the grid.

Example 1:
Input: grid = [[0,1,1,0],[0,1,1,0],[0,0,0,0]]
Output: 2
Explanation: We need at least 2 days to get a disconnected grid.
Change land grid[1][1] and grid[0][2] to water and get 2 disconnected island.

Example 2:
Input: grid = [[1,1]]
Output: 2
Explanation: Grid of full water is also disconnected ([[1,1]] -> [[0,0]]), 0 islands.

Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 30
grid[i][j] is either 0 or 1.

</> Typescript Code:
*/

function minDays(grid: number[][]): number {
  const rows = grid.length; // Get the number of rows in the grid
  const cols = grid[0].length; // Get the number of columns in the grid

  // Function to check if the grid is connected (i.e., forms a single island)
  const isConnected = (g: number[][]): boolean => {
    let visited = new Array(rows).fill(0).map(() => new Array(cols).fill(false)); // Create a visited matrix
    let foundIsland = false; // Flag to track if an island has been found

    // Depth-first search (DFS) to explore the connected components (island)
    const dfs = (i: number, j: number): void => {
      if (i < 0 || i >= rows || j < 0 || j >= cols || g[i][j] === 0 || visited[i][j]) return; // Boundary and visited checks
      visited[i][j] = true; // Mark the cell as visited
      dfs(i + 1, j); // Explore downward
      dfs(i - 1, j); // Explore upward
      dfs(i, j + 1); // Explore rightward
      dfs(i, j - 1); // Explore leftward
    };

    // Iterate through the grid to find and explore the first island
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (g[i][j] === 1 && !visited[i][j]) {
          if (foundIsland) return false; // If another island is found, return false (not connected)
          dfs(i, j); // Start DFS to explore the island
          foundIsland = true; // Mark that an island has been found
        }
      }
    }

    // Check if there are any unvisited land cells left, which would indicate the grid is not fully connected
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (g[i][j] === 1 && !visited[i][j]) return false; // Unvisited land found, grid is not connected
      }
    }

    return true; // Grid is fully connected (forms a single island)
  };

  // Count the number of land cells in the grid
  let landCount = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) landCount++;
    }
  }

  // If there are no land cells, the grid is already disconnected, so return 0
  if (landCount === 0) return 0;

  // If there is only one land cell, changing it to water disconnects the grid, so return 1
  if (landCount === 1) return 1;

  // If the grid is already disconnected, return 0
  if (!isConnected(grid)) return 0;

  // Try changing each land cell to water and check if the grid becomes disconnected
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) {
        grid[i][j] = 0; // Temporarily change the cell to water
        if (!isConnected(grid)) return 1; // If the grid is now disconnected, return 1
        grid[i][j] = 1; // Restore the cell back to land if not disconnected
      }
    }
  }

  // If the grid can't be disconnected by changing one cell, return 2
  return 2;
}

/* 
719. Find K-th Smallest Pair Distance

The distance of a pair of integers a and b is defined as the absolute difference between a and b.

Given an integer array nums and an integer k, return the kth smallest distance among all the pairs nums[i] and nums[j] where 0 <= i < j < nums.length.

Example 1:
Input: nums = [1,3,1], k = 1
Output: 0
Explanation: Here are all the pairs:
(1,3) -> 2
(1,1) -> 0
(3,1) -> 2
Then the 1st smallest distance pair is (1,1), and its distance is 0.

Example 2:
Input: nums = [1,1,1], k = 2
Output: 0

Example 3:
Input: nums = [1,6,1], k = 3
Output: 5

Constraints:
n == nums.length
2 <= n <= 10^4
0 <= nums[i] <= 10^6
1 <= k <= n * (n - 1) / 2

</> Typescript Code:
*/

function smallestDistancePair(nums: number[], k: number): number {
  // Step 1: Sort the array
  nums.sort((a, b) => a - b);

  const n = nums.length;
  // Step 2: Initialize binary search bounds
  let left = 0,
    right = nums[n - 1] - nums[0];

  // Step 3: Perform binary search on the distance
  while (left < right) {
    // Midpoint distance to test
    const mid = Math.floor((left + right) / 2);
    let count = 0;
    let start = 0;

    // Count the number of pairs with distance <= mid
    for (let end = 0; end < n; end++) {
      // Move the start pointer to maintain the distance constraint
      while (nums[end] - nums[start] > mid) {
        start++;
      }
      // All pairs between start and end are valid for this distance
      count += end - start;
    }

    // If there are at least k pairs with distance <= mid, adjust right bound
    if (count >= k) {
      right = mid;
    } else {
      // Otherwise, increase the minimum distance
      left = mid + 1;
    }
  }

  // The smallest distance such that there are at least k pairs with distance <= this value
  return left;
}

/* 
664. Strange Printer

There is a strange printer with the following two special properties:

The printer can only print a sequence of the same character each time.
At each turn, the printer can print new characters starting from and ending at any place and will cover the original existing characters.
Given a string s, return the minimum number of turns the printer needed to print it.

Example 1:
Input: s = "aaabbb"
Output: 2
Explanation: Print "aaa" first and then print "bbb".

Example 2:
Input: s = "aba"
Output: 2
Explanation: Print "aaa" first and then print "b" from the second place of the string, which will cover the existing character 'a'.

Constraints:
1 <= s.length <= 100
s consists of lowercase English letters.

</> Typescript Code:
*/

function strangePrinter(s: string): number {
  const n = s.length; // Length of the input string
  const dp = Array.from({length: n}, () => Array(n).fill(0)); // DP table initialization

  // Iterate over different lengths of substrings
  for (let len = 1; len <= n; len++) {
    // Iterate over all possible substrings of length `len`
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1; // End index of the current substring
      if (i === j) {
        // If the substring is of length 1, it takes one turn to print
        dp[i][j] = 1;
      } else {
        // Initialize with the value if we print the substring `s[i]` to `s[j-1]` and then `s[j]`
        dp[i][j] = dp[i][j - 1] + 1;
        // Check all partitions to find the optimal solution
        for (let k = i; k < j; k++) {
          if (s[k] === s[j]) {
            // Minimize the number of turns by considering overlap
            dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k + 1][j] - 1);
          }
        }
      }
    }
  }
  return dp[0][n - 1]; // Return the result for the whole string
}

/* 
564. Find the Closest Palindrome

Given a string n representing an integer, return the closest integer (not including itself), which is a palindrome. If there is a tie, return the smaller one.

The closest is defined as the absolute difference minimized between two integers.

Example 1:
Input: n = "123"
Output: "121"

Example 2:
Input: n = "1"
Output: "0"
Explanation: 0 and 2 are the closest palindromes but we return the smallest which is 0.

Constraints:
1 <= n.length <= 18
n consists of only digits.
n does not have leading zeros.
n is representing an integer in the range [1, 1018 - 1]


</> Typescript Code:
*/

function nearestPalindromic(n: string): string {
  // Handle special cases directly for "10" and "11"
  if (n === '10' || n === '11') {
    return '9';
  }

  let number = 0;
  let ten = 1;
  const dp: number[] = [];
  dp[0] = ten;

  // Initialize the dp array with powers of 10 up to 10^17
  for (let i = 1; i < 18; i++) {
    dp[i] = dp[i - 1] * 10;
  }

  // Convert the first digit of the number to an integer
  number = Number(n[0] || 0) - 0;

  // If the input is a single-digit number, return the previous number
  if (n.length === 1) {
    number--;
    return number.toString();
  }

  // Convert the entire string number to an integer
  for (let i = 1; i < n.length; i++) {
    number = number * 10 + (Number(n[i] || 0) - 0);
  }

  // Check if the number is a power of 10 or one less than a power of 10
  for (let i = 0; i < 19; i++) {
    if (dp[i] === number) {
      return (number - 1).toString(); // Return number - 1 if it's a power of 10
    }
    if (dp[i] === number + 1) {
      return (dp[i] + 1).toString(); // Return number + 1 if it's one less than a power of 10
    }
  }

  let copyNumber = number;
  const mid = Math.floor(n.length / 2);

  // Generate a smaller palindrome candidate by decrementing the first half of the number
  copyNumber = Math.floor(number / dp[mid]);
  copyNumber -= 1;
  let takeOffMid = '';
  let firstHalf = copyNumber.toString();
  if (n.length % 2 && firstHalf.length > mid) {
    takeOffMid = firstHalf[firstHalf.length - 1];
    firstHalf = firstHalf.slice(0, firstHalf.length - 1);
  }
  let reversedHalf = firstHalf.split('').reverse().join('');
  let less = firstHalf + takeOffMid + reversedHalf;

  // Generate a larger palindrome candidate by incrementing the first half of the number
  copyNumber = Math.floor(number / dp[mid]);
  copyNumber += 1;
  if (copyNumber === 0) {
    return '9';
  }
  takeOffMid = '';
  firstHalf = copyNumber.toString();
  if (n.length % 2) {
    takeOffMid = firstHalf[firstHalf.length - 1];
    firstHalf = firstHalf.slice(0, firstHalf.length - 1);
  }
  reversedHalf = firstHalf.split('').reverse().join('');
  let more = firstHalf + takeOffMid + reversedHalf;

  // Compare the smaller and larger candidates to find the closest palindrome
  let possibleAns = '';
  if (Number(more) - number < number - Number(less)) {
    possibleAns = more;
  } else {
    possibleAns = less;
  }

  // If the original number is not a palindrome, generate a mirrored palindrome candidate
  if (!isPalindrome(n)) {
    let j = n.length - 1;
    for (let i = 0; i < mid; i++) {
      n = n.slice(0, j) + n[i] + n.slice(j + 1);
      j--;
    }
    const thirdParty = Number(n);
    if (Math.abs(Number(possibleAns) - number) > Math.abs(number - thirdParty)) {
      possibleAns = n;
    } else if (Math.abs(Number(possibleAns) - number) === Math.abs(number - thirdParty)) {
      if (thirdParty <= Number(possibleAns)) {
        possibleAns = n;
      }
    }
  }

  // Return the closest palindrome
  return possibleAns;
}

// Helper function to check if a string is a palindrome
function isPalindrome(n: string): boolean {
  let j = n.length - 1;
  for (let i = 0; i < Math.floor(n.length / 2); i++) {
    if (n[i] !== n[j]) {
      return false;
    }
    j--;
  }
  return true;
}

/* 
2699. Modify Graph Edge Weights

You are given an undirected weighted connected graph containing n nodes labeled from 0 to n - 1, and an integer array edges where edges[i] = [ai, bi, wi] indicates that there is an edge between nodes ai and bi with weight wi.

Some edges have a weight of -1 (wi = -1), while others have a positive weight (wi > 0).

Your task is to modify all edges with a weight of -1 by assigning them positive integer values in the range [1, 2 * 109] so that the shortest distance between the nodes source and destination becomes equal to an integer target. If there are multiple modifications that make the shortest distance between source and destination equal to target, any of them will be considered correct.

Return an array containing all edges (even unmodified ones) in any order if it is possible to make the shortest distance from source to destination equal to target, or an empty array if it's impossible.

Note: You are not allowed to modify the weights of edges with initial positive weights.

Example 1:
Input: n = 5, edges = [[4,1,-1],[2,0,-1],[0,3,-1],[4,3,-1]], source = 0, destination = 1, target = 5
Output: [[4,1,1],[2,0,1],[0,3,3],[4,3,1]]
Explanation: The graph above shows a possible modification to the edges, making the distance from 0 to 1 equal to 5.

Example 2:
Input: n = 3, edges = [[0,1,-1],[0,2,5]], source = 0, destination = 2, target = 6
Output: []
Explanation: The graph above contains the initial edges. It is not possible to make the distance from 0 to 2 equal to 6 by modifying the edge with weight -1. So, an empty array is returned.

Example 3:
Input: n = 4, edges = [[1,0,4],[1,2,3],[2,3,5],[0,3,-1]], source = 0, destination = 2, target = 6
Output: [[1,0,4],[1,2,3],[2,3,5],[0,3,1]]
Explanation: The graph above shows a modified graph having the shortest distance from 0 to 2 as 6.

Constraints:
1 <= n <= 100
1 <= edges.length <= n * (n - 1) / 2
edges[i].length == 3
0 <= ai, bi < n
wi = -1 or 1 <= wi <= 10^7
ai != bi
0 <= source, destination < n
source != destination
1 <= target <= 10^9
The graph is connected, and there are no self-loops or repeated edges

</> Typescript Code:
*/

function modifiedGraphEdges(
  n: number,
  edges: number[][],
  source: number,
  destination: number,
  target: number,
): number[][] {
  // PriorityQueue class for Dijkstra's algorithm, maintaining a sorted queue of elements by priority
  class PriorityQueue<T> {
    private elements: {element: T; priority: number}[] = [];

    enqueue(element: T, priority: number): void {
      this.elements.push({element, priority});
      this.elements.sort((a, b) => a.priority - b.priority); // Ensure the queue is sorted by priority
    }

    dequeue(): {element: T; priority: number} | undefined {
      return this.elements.shift(); // Remove and return the element with the highest priority (smallest value)
    }

    isEmpty(): boolean {
      return this.elements.length === 0; // Check if the queue is empty
    }
  }

  // Create an adjacency list representation of the graph
  const adjacencyList: [number, number][][] = Array.from({length: n}, () => []);
  for (let i = 0; i < edges.length; i++) {
    const [nodeA, nodeB] = edges[i];
    adjacencyList[nodeA].push([nodeB, i]); // Add edges to the adjacency list for both nodes
    adjacencyList[nodeB].push([nodeA, i]);
  }

  // Distance array, each node has two distances: one for the first run and another for the second run of Dijkstra
  const distances: number[][] = Array.from({length: n}, () => [Infinity, Infinity]);
  distances[source] = [0, 0]; // Set the distance from the source to itself as 0

  // Run Dijkstra's algorithm for the first time
  runDijkstra(adjacencyList, edges, distances, source, 0, 0);
  const difference = target - distances[destination][0]; // Calculate the difference needed to reach the target distance
  if (difference < 0) return []; // If the difference is negative, return an empty array (impossible case)

  // Run Dijkstra's algorithm a second time to adjust the weights and reach the exact target
  runDijkstra(adjacencyList, edges, distances, source, difference, 1);
  if (distances[destination][1] < target) return []; // If after the second run the target is not met, return an empty array

  // Set any remaining -1 edge weights to 1, ensuring all edges have positive weights
  for (const edge of edges) {
    if (edge[2] === -1) edge[2] = 1;
  }
  return edges; // Return the modified edges

  // Helper function to run Dijkstra's algorithm
  function runDijkstra(
    adjacencyList: [number, number][][],
    edges: number[][],
    distances: number[][],
    source: number,
    difference: number,
    run: number,
  ): void {
    const pq = new PriorityQueue<number>();
    pq.enqueue(source, 0);
    distances[source][run] = 0;

    while (!pq.isEmpty()) {
      const current = pq.dequeue();
      if (!current) break;
      const currentNode = current.element;
      const currentDistance = current.priority;

      if (currentDistance > distances[currentNode][run]) continue;

      for (const [nextNode, edgeIndex] of adjacencyList[currentNode]) {
        let weight = edges[edgeIndex][2];
        if (weight === -1) weight = 1; // Initially consider -1 as weight 1

        if (run === 1 && edges[edgeIndex][2] === -1) {
          const newWeight = difference + distances[nextNode][0] - distances[currentNode][1];
          if (newWeight > weight) {
            edges[edgeIndex][2] = weight = newWeight; // Adjust weight to help reach the target distance
          }
        }

        // Update the distance if a shorter path is found
        if (distances[nextNode][run] > distances[currentNode][run] + weight) {
          distances[nextNode][run] = distances[currentNode][run] + weight;
          pq.enqueue(nextNode, distances[nextNode][run]);
        }
      }
    }
  }
}

/* 
214. Shortest Palindrome

You are given a string s. You can convert s to a 
palindrome by adding characters in front of it.

Return the shortest palindrome you can find by performing this transformation.

Example 1:
Input: s = "aacecaaa"
Output: "aaacecaaa"

Example 2:
Input: s = "abcd"
Output: "dcbabcd"

Constraints:
0 <= s.length <= 5 * 10^4
s consists of lowercase English letters only.

</> Typescript Code:
*/

function shortestPalindrome(s: string): string {
  // Step 1: Reverse the input string
  const rev = s.split('').reverse().join(''); // reverse string

  // Step 2: Combine the original and reversed strings, separated by a unique character
  const combined = s + '#' + rev; // combine original and reversed strings with '#' to avoid overlap confusion

  // Step 3: Create a table to store the length of the longest proper prefix which is also a suffix
  const table = new Array(combined.length).fill(0); // initialize prefix table for KMP algorithm

  // Step 4: Fill the KMP table to identify palindrome length
  for (let i = 1; i < combined.length; i++) {
    let j = table[i - 1]; // Start with the value from the previous position
    // Try to match characters in the prefix and suffix
    while (j > 0 && combined[i] !== combined[j]) {
      j = table[j - 1]; // Roll back to the previous match point
    }
    if (combined[i] === combined[j]) {
      j++; // If characters match, increment the match length
    }
    table[i] = j; // Store the result in the KMP table
  }

  // Step 5: Calculate how many characters we need to add in front
  const maxPalindromeLength = table[table.length - 1]; // longest palindrome that starts at the beginning
  const toAdd = rev.slice(0, s.length - maxPalindromeLength); // extract the portion to add in front

  // Step 6: Return the shortest palindrome by adding necessary characters in front
  return toAdd + s; // concatenate the necessary characters with the original string
}

/* 
440. K-th Smallest in Lexicographical Order

Given two integers n and k, return the kth lexicographically smallest integer in the range [1, n].

Example 1:
Input: n = 13, k = 2
Output: 10
Explanation: The lexicographical order is [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9], so the second smallest number is 10.

Example 2:
Input: n = 1, k = 1
Output: 1

Constraints:
1 <= k <= n <= 10^9

</> Typescript Code:
*/

function findKthNumber(n: number, k: number): number {
  let curr = 1; // Start at 1, the first lexicographical number
  k--; // Decrease k by 1, since we are counting steps in 0-indexed manner

  // Helper function to calculate the number of steps between two prefixes
  const getSteps = (n: number, curr: number): number => {
    let steps = 0; // Initialize step counter
    let first = curr; // First number in the current lexicographical range
    let last = curr; // Last number in the current range

    // Loop to calculate the number of valid lexicographical steps
    while (first <= n) {
      // Add the range from first to last (or n) to steps
      steps += Math.min(n + 1, last + 1) - first;
      // Move to the next level in lexicographical order
      first *= 10;
      last = last * 10 + 9;
    }

    return steps; // Return the total steps for this prefix
  };

  // Main loop to find the k-th lexicographical number
  while (k > 0) {
    const steps = getSteps(n, curr); // Get the number of steps from curr

    if (steps <= k) {
      // If k is greater than or equal to steps, move to the next number
      k -= steps;
      curr++; // Move to the next lexicographical number
    } else {
      // Otherwise, move deeper into the current number's lexicographical tree
      k--;
      curr *= 10; // Move to the next level by multiplying by 10
    }
  }

  return curr; // Return the k-th lexicographical number
}

/* 
2416. Sum of Prefix Scores of Strings

You are given an array words of size n consisting of non-empty strings.

We define the score of a string word as the number of strings words[i] such that word is a prefix of words[i].

For example, if words = ["a", "ab", "abc", "cab"], then the score of "ab" is 2, since "ab" is a prefix of both "ab" and "abc".
Return an array answer of size n where answer[i] is the sum of scores of every non-empty prefix of words[i].

Note that a string is considered as a prefix of itself.

Example 1:
Input: words = ["abc","ab","bc","b"]
Output: [5,4,3,2]
Explanation: The answer for each string is the following:
- "abc" has 3 prefixes: "a", "ab", and "abc".
- There are 2 strings with the prefix "a", 2 strings with the prefix "ab", and 1 string with the prefix "abc".
The total is answer[0] = 2 + 2 + 1 = 5.
- "ab" has 2 prefixes: "a" and "ab".
- There are 2 strings with the prefix "a", and 2 strings with the prefix "ab".
The total is answer[1] = 2 + 2 = 4.
- "bc" has 2 prefixes: "b" and "bc".
- There are 2 strings with the prefix "b", and 1 string with the prefix "bc".
The total is answer[2] = 2 + 1 = 3.
- "b" has 1 prefix: "b".
- There are 2 strings with the prefix "b".
The total is answer[3] = 2.

Example 2:
Input: words = ["abcd"]
Output: [4]
Explanation:
"abcd" has 4 prefixes: "a", "ab", "abc", and "abcd".
Each prefix has a score of one, so the total is answer[0] = 1 + 1 + 1 + 1 = 4.

Constraints:
1 <= words.length <= 1000
1 <= words[i].length <= 1000
words[i] consists of lowercase English letters.

</> Typescript Code:
*/

class TrieNode {
  // Map to hold children nodes of this TrieNode
  children: Map<string, TrieNode>;
  // Count of words that pass through this node
  count: number;

  constructor() {
    this.children = new Map(); // Initialize children map
    this.count = 0; // Initialize count to zero
  }
}

class Trie {
  // Root node of the Trie
  root: TrieNode;

  constructor() {
    this.root = new TrieNode(); // Create a new TrieNode as root
  }

  // Method to insert a word into the Trie
  insert(word: string) {
    let node = this.root; // Start from the root
    // Iterate through each character of the word
    for (const char of word) {
      // If the character is not already a child, add a new TrieNode
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      // Move to the child node corresponding to the character
      node = node.children.get(char)!;
      // Increment the count of this prefix in the Trie
      node.count += 1;
    }
  }
}

function sumPrefixScores(words: string[]): number[] {
  const n = words.length; // Get the number of words
  const scores = new Array(n).fill(0); // Initialize scores array to store results
  const trie = new Trie(); // Create a new Trie instance

  // Insert each word into the Trie
  for (const word of words) {
    trie.insert(word); // Call the insert method for each word
  }

  // Calculate scores based on the Trie structure
  for (let i = 0; i < n; i++) {
    let node = trie.root; // Start from the root for the current word
    // Iterate through each character of the current word
    for (const char of words[i]) {
      // If the character node does not exist, break the loop
      if (!node.children.has(char)) break;
      // Move to the child node corresponding to the character
      node = node.children.get(char)!;
      // Add the count of this prefix to the score
      scores[i] += node.count;
    }
  }

  return scores; // Return the final scores array
}

/* 
432. All O`one Data Structure

Design a data structure to store the strings' count with the ability to return the strings with minimum and maximum counts.

Implement the AllOne class:

AllOne() Initializes the object of the data structure.
inc(String key) Increments the count of the string key by 1. If key does not exist in the data structure, insert it with count 1.
dec(String key) Decrements the count of the string key by 1. If the count of key is 0 after the decrement, remove it from the data structure. It is guaranteed that key exists in the data structure before the decrement.
getMaxKey() Returns one of the keys with the maximal count. If no element exists, return an empty string "".
getMinKey() Returns one of the keys with the minimum count. If no element exists, return an empty string "".
Note that each function must run in O(1) average time complexity.

Example 1:
Input
["AllOne", "inc", "inc", "getMaxKey", "getMinKey", "inc", "getMaxKey", "getMinKey"]
[[], ["hello"], ["hello"], [], [], ["leet"], [], []]
Output
[null, null, null, "hello", "hello", null, "hello", "leet"]
Explanation
AllOne allOne = new AllOne();
allOne.inc("hello");
allOne.inc("hello");
allOne.getMaxKey(); // return "hello"
allOne.getMinKey(); // return "hello"
allOne.inc("leet");
allOne.getMaxKey(); // return "hello"
allOne.getMinKey(); // return "leet"

Constraints:
1 <= key.length <= 10
key consists of lowercase English letters.
It is guaranteed that for each call to dec, key is existing in the data structure.
At most 5 * 10^4 calls will be made to inc, dec, getMaxKey, and getMinKey.

</> Typescript Code:
*/

/**
 * Your AllOne object will be instantiated and called as such:
 * var obj = new AllOne()
 * obj.inc(key)
 * obj.dec(key)
 * var param_3 = obj.getMaxKey()
 * var param_4 = obj.getMinKey()
 */

class Node {
  count: number; // The count value this node represents
  keys: Set<string>; // Set of keys with this count
  prev: Node | null; // Pointer to the previous node in the linked list
  next: Node | null; // Pointer to the next node in the linked list

  constructor(count: number) {
    this.count = count; // Initialize the count
    this.keys = new Set(); // Initialize the set of keys
    this.prev = null; // Previous node pointer starts as null
    this.next = null; // Next node pointer starts as null
  }
}

class AllOne {
  private head: Node; // Sentinel head node (dummy node with count 0)
  private tail: Node; // Sentinel tail node (dummy node with count 0)
  private keyCount: Map<string, number>; // Maps each key to its current count
  private countNode: Map<number, Node>; // Maps each count to its corresponding node

  constructor() {
    this.head = new Node(0); // Initialize head node
    this.tail = new Node(0); // Initialize tail node
    this.head.next = this.tail; // Link head to tail
    this.tail.prev = this.head; // Link tail back to head
    this.keyCount = new Map(); // Initialize the key to count map
    this.countNode = new Map(); // Initialize the count to node map
  }

  inc(key: string): void {
    const currentCount = this.keyCount.get(key) || 0; // Get current count or 0 if key doesn't exist
    const newCount = currentCount + 1; // Increment count
    this.keyCount.set(key, newCount); // Update the key's count

    // Determine the node corresponding to the current count
    let currentNode = currentCount === 0 ? this.head : this.countNode.get(currentCount)!;
    // Check if a node for the new count already exists
    let newNode = this.countNode.get(newCount);

    if (!newNode) {
      newNode = new Node(newCount); // Create a new node for the new count
      this.countNode.set(newCount, newNode); // Map the new count to the new node
      this.insertAfter(currentNode, newNode); // Insert the new node after the current node
    }

    newNode.keys.add(key); // Add the key to the new node's key set

    if (currentCount !== 0) {
      currentNode.keys.delete(key); // Remove the key from the current node's key set
      if (currentNode.keys.size === 0) {
        // If no keys left in the current node
        this.removeNode(currentNode); // Remove the current node from the linked list
        this.countNode.delete(currentCount); // Remove the count from the count-node map
      }
    }
  }

  dec(key: string): void {
    const currentCount = this.keyCount.get(key)!; // Get the current count of the key
    const newCount = currentCount - 1; // Decrement the count

    if (newCount === 0) {
      this.keyCount.delete(key); // If count reaches zero, remove the key from keyCount map
    } else {
      this.keyCount.set(key, newCount); // Update the key's count
    }

    const currentNode = this.countNode.get(currentCount)!; // Get the node corresponding to the current count
    currentNode.keys.delete(key); // Remove the key from the current node's key set

    let newNode: Node | undefined;
    if (newCount > 0) {
      newNode = this.countNode.get(newCount); // Check if a node for the new count exists
      if (!newNode) {
        newNode = new Node(newCount); // Create a new node for the new count
        this.countNode.set(newCount, newNode); // Map the new count to the new node
        this.insertBefore(currentNode, newNode); // Insert the new node before the current node
      }
      newNode.keys.add(key); // Add the key to the new node's key set
    }

    if (currentNode.keys.size === 0) {
      // If no keys left in the current node
      this.removeNode(currentNode); // Remove the current node from the linked list
      this.countNode.delete(currentCount); // Remove the count from the count-node map
    }
  }

  getMaxKey(): string {
    if (this.tail.prev === this.head) return ''; // If no keys exist, return empty string
    return this.tail.prev!.keys.values().next().value; // Return any key from the max count node
  }

  getMinKey(): string {
    if (this.head.next === this.tail) return ''; // If no keys exist, return empty string
    return this.head.next!.keys.values().next().value; // Return any key from the min count node
  }

  // Inserts newNode after node in the linked list
  private insertAfter(node: Node, newNode: Node): void {
    newNode.prev = node; // Set newNode's previous to node
    newNode.next = node.next; // Set newNode's next to node's next
    node.next!.prev = newNode; // Update node's next node's previous to newNode
    node.next = newNode; // Link node to newNode
  }

  // Inserts newNode before node in the linked list
  private insertBefore(node: Node, newNode: Node): void {
    newNode.next = node; // Set newNode's next to node
    newNode.prev = node.prev; // Set newNode's previous to node's previous
    node.prev!.next = newNode; // Update node's previous node's next to newNode
    node.prev = newNode; // Link node back to newNode
  }

  // Removes node from the linked list
  private removeNode(node: Node): void {
    node.prev!.next = node.next; // Bypass node by linking previous node to next node
    node.next!.prev = node.prev; // Link next node back to previous node
  }
}

/* 
632. Smallest Range Covering Elements from K Lists

You have k lists of sorted integers in non-decreasing order. Find the smallest range that includes at least one number from each of the k lists.

We define the range [a, b] is smaller than range [c, d] if b - a < d - c or a < c if b - a == d - c.

Example 1:
Input: nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]
Output: [20,24]
Explanation: 
List 1: [4, 10, 15, 24,26], 24 is in range [20,24].
List 2: [0, 9, 12, 20], 20 is in range [20,24].
List 3: [5, 18, 22, 30], 22 is in range [20,24].

Example 2:
Input: nums = [[1,2,3],[1,2,3],[1,2,3]]
Output: [1,1]

Constraints:
nums.length == k
1 <= k <= 3500
1 <= nums[i].length <= 50
-10^5 <= nums[i][j] <= 10^5
nums[i] is sorted in non-decreasing order.

</> Typescript Code:
*/

function smallestRange(nums: number[][]): number[] {
  const k = nums.length; // Get the number of lists
  const pointers = new Array(k).fill(0); // Initialize pointers for each list to 0
  let minRange = [-100000, 100000]; // Initialize the minimum range to maximum possible
  const heap = new MinHeap(); // Create a min-heap to keep track of the minimum elements
  let max = -100000; // Initialize the current maximum value

  // Initialize the heap with the first element from each list
  for (let i = 0; i < k; i++) {
    const val = nums[i][0]; // Get the first element of the ith list
    heap.insert({value: val, row: i}); // Insert the element along with its list index into the heap
    if (val > max) max = val; // Update the current maximum if necessary
  }

  // Loop until one of the lists is exhausted
  while (true) {
    const {value: minValue, row} = heap.extractMin(); // Extract the minimum element from the heap
    // Check if the current range is smaller than the previously recorded minimum range
    if (
      max - minValue < minRange[1] - minRange[0] || // If current range is smaller
      (max - minValue === minRange[1] - minRange[0] && minValue < minRange[0]) // Or ranges are equal but current start is smaller
    ) {
      minRange = [minValue, max]; // Update the minimum range
    }
    pointers[row]++; // Move to the next element in the list from which the minValue was extracted
    if (pointers[row] === nums[row].length) break; // If we've reached the end of a list, break the loop
    const nextVal = nums[row][pointers[row]]; // Get the next element from the same list
    heap.insert({value: nextVal, row}); // Insert the next element into the heap
    if (nextVal > max) max = nextVal; // Update the current maximum if necessary
  }

  return minRange; // Return the smallest range found
}

class MinHeap {
  heap: {value: number; row: number}[]; // Array to store the heap elements

  constructor() {
    this.heap = []; // Initialize the heap as an empty array
  }

  insert(node: {value: number; row: number}) {
    this.heap.push(node); // Add the new node to the end of the heap
    this.bubbleUp(); // Restore the heap property by moving the new node up
  }

  extractMin(): {value: number; row: number} {
    if (this.heap.length === 1) return this.heap.pop()!; // If only one element, remove and return it
    const min = this.heap[0]; // The root of the heap is the minimum element
    this.heap[0] = this.heap.pop()!; // Replace the root with the last element
    this.bubbleDown(); // Restore the heap property by moving the new root down
    return min; // Return the minimum element
  }

  bubbleUp() {
    let index = this.heap.length - 1; // Start from the last element inserted
    while (index > 0) {
      let parent = (index - 1) >> 1; // Calculate the parent index
      if (this.heap[parent].value <= this.heap[index].value) break; // If parent is smaller or equal, heap is valid
      [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]]; // Swap with parent
      index = parent; // Move up to the parent index
    }
  }

  bubbleDown() {
    let index = 0; // Start from the root element
    const length = this.heap.length; // Get the length of the heap
    while (true) {
      let left = (index << 1) + 1; // Left child index
      let right = left + 1; // Right child index
      let smallest = index; // Assume the smallest is at the current index

      // If left child exists and is smaller, update smallest
      if (left < length && this.heap[left].value < this.heap[smallest].value) {
        smallest = left;
      }

      // If right child exists and is smaller, update smallest
      if (right < length && this.heap[right].value < this.heap[smallest].value) {
        smallest = right;
      }

      if (smallest === index) break; // If the smallest is the current node, the heap is valid
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]]; // Swap with the smallest child
      index = smallest; // Move down to the smallest child index
    }
  }
}


/* 
1106. Parsing A Boolean Expression

A boolean expression is an expression that evaluates to either true or false. It can be in one of the following shapes:

't' that evaluates to true.
'f' that evaluates to false.
'!(subExpr)' that evaluates to the logical NOT of the inner expression subExpr.
'&(subExpr1, subExpr2, ..., subExprn)' that evaluates to the logical AND of the inner expressions subExpr1, subExpr2, ..., subExprn where n >= 1.
'|(subExpr1, subExpr2, ..., subExprn)' that evaluates to the logical OR of the inner expressions subExpr1, subExpr2, ..., subExprn where n >= 1.
Given a string expression that represents a boolean expression, return the evaluation of that expression.

It is guaranteed that the given expression is valid and follows the given rules.

Example 1:
Input: expression = "&(|(f))"
Output: false
Explanation: 
First, evaluate |(f) --> f. The expression is now "&(f)".
Then, evaluate &(f) --> f. The expression is now "f".
Finally, return false.

Example 2:
Input: expression = "|(f,f,f,t)"
Output: true
Explanation: The evaluation of (false OR false OR false OR true) is true.

Example 3:
Input: expression = "!(&(f,t))"
Output: true
Explanation: 
First, evaluate &(f,t) --> (false AND true) --> false --> f. The expression is now "!(f)".
Then, evaluate !(f) --> NOT false --> true. We return true.

Constraints:
1 <= expression.length <= 2 * 10^4
expression[i] is one following characters: '(', ')', '&', '|', '!', 't', 'f', and ','.

</> Typescript Code:
*/

function parseBoolExpr(expression: string): boolean {
  const stack: string[] = []; // Initialize a stack to hold characters.
  for (let c of expression) { // Iterate over each character in the expression.
      if (c === ',') continue; // Skip commas as they are not needed.
      else if (c !== ')') stack.push(c); // Push operators, operands, and '(' onto the stack.
      else {
          const operands: string[] = []; // List to collect operands within parentheses.
          while (stack[stack.length - 1] !== '(') // Collect operands until '(' is found.
              operands.push(stack.pop()!); // Pop operands from the stack.
          stack.pop(); // Remove the '(' from the stack.
          const operator = stack.pop()!; // Pop the operator ('!', '&', '|') from the stack.
          let result: string;
          if (operator === '!') // If operator is NOT.
              result = operands[0] === 't' ? 'f' : 't'; // Invert the operand.
          else if (operator === '&') // If operator is AND.
              result = operands.every(v => v === 't') ? 't' : 'f'; // Result is 't' if all operands are 't'.
          else // Operator is OR.
              result = operands.some(v => v === 't') ? 't' : 'f'; // Result is 't' if any operand is 't'.
          stack.push(result); // Push the result back onto the stack.
      }
  }
  return stack.pop() === 't'; // The final result is on the top of the stack.
};


/* 
2458. Height of Binary Tree After Subtree Removal Queries

You are given the root of a binary tree with n nodes. Each node is assigned a unique value from 1 to n. You are also given an array queries of size m.

You have to perform m independent queries on the tree where in the ith query you do the following:

Remove the subtree rooted at the node with the value queries[i] from the tree. It is guaranteed that queries[i] will not be equal to the value of the root.
Return an array answer of size m where answer[i] is the height of the tree after performing the ith query.

Note:
The queries are independent, so the tree returns to its initial state after each query.
The height of a tree is the number of edges in the longest simple path from the root to some node in the tree.

Example 1:
Input: root = [1,3,4,2,null,6,5,null,null,null,null,null,7], queries = [4]
Output: [2]
Explanation: The diagram above shows the tree after removing the subtree rooted at node with value 4.
The height of the tree is 2 (The path 1 -> 3 -> 2).

Example 2:
Input: root = [5,8,9,2,1,3,7,4,6], queries = [3,2,4,8]
Output: [3,2,3,2]
Explanation: We have the following queries:
- Removing the subtree rooted at node with value 3. The height of the tree becomes 3 (The path 5 -> 8 -> 2 -> 4).
- Removing the subtree rooted at node with value 2. The height of the tree becomes 2 (The path 5 -> 8 -> 1).
- Removing the subtree rooted at node with value 4. The height of the tree becomes 3 (The path 5 -> 8 -> 2 -> 6).
- Removing the subtree rooted at node with value 8. The height of the tree becomes 2 (The path 5 -> 9 -> 3).

Constraints:
The number of nodes in the tree is n.
2 <= n <= 10^5
1 <= Node.val <= n
All the values in the tree are unique.
m == queries.length
1 <= m <= min(n, 10^4)
1 <= queries[i] <= n
queries[i] != root.val

</> Typescript Code:
*/

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function treeQueries(root: TreeNode | null, queries: number[]): number[] {
  const height: number[] = []; // Stores the height of each node's subtree.
  const depth: number[] = [];  // Stores the depth of each node from the root.
  const maxHeightAtDepth: Map<number, number[]> = new Map(); // Stores top two heights at each depth.

  // DFS to compute height and depth of each node.
  function dfs(u: TreeNode | null, d: number): number {
      if (!u) return -1; // Base case: null node has height -1.
      depth[u.val] = d; // Set the depth of current node.
      const left = dfs(u.left, d + 1);  // Recurse on left child.
      const right = dfs(u.right, d + 1); // Recurse on right child.
      height[u.val] = Math.max(left, right) + 1; // Compute height of current node.

      const h = height[u.val]; // Current node's height.
      // Update the top two heights at depth d.
      if (!maxHeightAtDepth.has(d)) {
          maxHeightAtDepth.set(d, [h, -1]); // Initialize with current height.
      } else {
          const arr = maxHeightAtDepth.get(d)!;
          if (h > arr[0]) {
              arr[1] = arr[0]; // Shift current max to second max.
              arr[0] = h;      // Set new max height.
          } else if (h > arr[1]) {
              arr[1] = h;      // Update second max height.
          }
      }
      return height[u.val]; // Return height to parent call.
  }

  dfs(root, 0); // Start DFS from root at depth 0.

  const res: number[] = []; // Result array.
  const originalHeight = height[root.val]; // Original tree height.

  for (const q of queries) {
      const d = depth[q]; // Depth of queried node.
      const h = height[q]; // Height of queried node.
      const arr = maxHeightAtDepth.get(d)!; // Top two heights at this depth.

      let newHeight = originalHeight; // Initialize new height.
      if (arr[0] === h) { // If queried node has max height at its depth.
          if (arr[1] !== -1) { // If there is a second max height.
              newHeight = d + arr[1]; // New height is depth plus second max height.
          } else {
              newHeight = d - 1; // No other nodes at this depth, reduce height.
          }
      }
      res.push(newHeight); // Append result for this query.
  }
  return res; // Return all answers.
}

/* 
1671. Minimum Number of Removals to Make Mountain Array

You may recall that an array arr is a mountain array if and only if:

arr.length >= 3
There exists some index i (0-indexed) with 0 < i < arr.length - 1 such that:
arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
arr[i] > arr[i + 1] > ... > arr[arr.length - 1]
Given an integer array nums​​​, return the minimum number of elements to remove to make nums​​​ a mountain array.

Example 1:
Input: nums = [1,3,1]
Output: 0
Explanation: The array itself is a mountain array so we do not need to remove any elements.

Example 2:
Input: nums = [2,1,1,5,6,2,3,1]
Output: 3
Explanation: One solution is to remove the elements at indices 0, 1, and 5, making the array nums = [1,5,6,3,1].

Constraints:
3 <= nums.length <= 1000
1 <= nums[i] <= 10^9
It is guaranteed that you can make a mountain array out of nums.

</> Typescript Code:
*/

function minimumMountainRemovals(nums: number[]): number {
  // Get the length of the input array
  const n = nums.length;

  // Initialize dp arrays for LIS ending at each index and LDS starting at each index
  const dp1 = new Array(n).fill(1); // dp1[i] = length of LIS ending at i
  const dp2 = new Array(n).fill(1); // dp2[i] = length of LDS starting at i

  // Compute LIS for each index
  for (let i = 0; i < n; i++) {
      // Compare nums[i] with all previous elements
      for (let j = 0; j < i; j++) {
          // If nums[j] < nums[i], update dp1[i]
          if (nums[j] < nums[i]) {
              dp1[i] = Math.max(dp1[i], dp1[j] + 1);
          }
      }
  }

  // Compute LDS for each index
  for (let i = n -1; i >=0; i--) {
      // Compare nums[i] with all next elements
      for (let j = n -1; j > i; j--) {
          // If nums[j] < nums[i], update dp2[i]
          if (nums[j] < nums[i]) {
              dp2[i] = Math.max(dp2[i], dp2[j] +1);
          }
      }
  }

  // Initialize variable to track the maximum length of bitonic subsequence
  let maxLength = 0;

  // Iterate through each index to find the maximum bitonic subsequence length
  for (let i = 0; i < n; i++) {
      // Only consider peaks that are not at the ends
      if (dp1[i] > 1 && dp2[i] > 1) {
          // Update maxLength if a longer bitonic subsequence is found
          maxLength = Math.max(maxLength, dp1[i] + dp2[i] -1);
      }
  }

  // The minimum number of removals is total length minus maximum bitonic subsequence length
  return n - maxLength;
}


/* 
2463. Minimum Total Distance Traveled

There are some robots and factories on the X-axis. You are given an integer array robot where robot[i] is the position of the ith robot. You are also given a 2D integer array factory where factory[j] = [positionj, limitj] indicates that positionj is the position of the jth factory and that the jth factory can repair at most limitj robots.

The positions of each robot are unique. The positions of each factory are also unique. Note that a robot can be in the same position as a factory initially.

All the robots are initially broken; they keep moving in one direction. The direction could be the negative or the positive direction of the X-axis. When a robot reaches a factory that did not reach its limit, the factory repairs the robot, and it stops moving.

At any moment, you can set the initial direction of moving for some robot. Your target is to minimize the total distance traveled by all the robots.

Return the minimum total distance traveled by all the robots. The test cases are generated such that all the robots can be repaired.

Note that All robots move at the same speed.
If two robots move in the same direction, they will never collide.
If two robots move in opposite directions and they meet at some point, they do not collide. They cross each other.
If a robot passes by a factory that reached its limits, it crosses it as if it does not exist.
If the robot moved from a position x to a position y, the distance it moved is |y - x|.

Example 1:
Input: robot = [0,4,6], factory = [[2,2],[6,2]]
Output: 4
Explanation: As shown in the figure:
- The first robot at position 0 moves in the positive direction. It will be repaired at the first factory.
- The second robot at position 4 moves in the negative direction. It will be repaired at the first factory.
- The third robot at position 6 will be repaired at the second factory. It does not need to move.
The limit of the first factory is 2, and it fixed 2 robots.
The limit of the second factory is 2, and it fixed 1 robot.
The total distance is |2 - 0| + |2 - 4| + |6 - 6| = 4. It can be shown that we cannot achieve a better total distance than 4.

Example 2:
Input: robot = [1,-1], factory = [[-2,1],[2,1]]
Output: 2
Explanation: As shown in the figure:
- The first robot at position 1 moves in the positive direction. It will be repaired at the second factory.
- The second robot at position -1 moves in the negative direction. It will be repaired at the first factory.
The limit of the first factory is 1, and it fixed 1 robot.
The limit of the second factory is 1, and it fixed 1 robot.
The total distance is |2 - 1| + |(-2) - (-1)| = 2. It can be shown that we cannot achieve a better total distance than 2.

Constraints:
1 <= robot.length, factory.length <= 100
factory[j].length == 2
-109 <= robot[i], positionj <= 10^9
0 <= limitj <= robot.length
The input will be generated such that it is always possible to repair every robot.

</> Typescript Code:
*/

function minimumTotalDistance(robot: number[], factory: number[][]): number {
  // Sort robots and factories by position
  robot.sort((a, b) => a - b);
  factory.sort((a, b) => a[0] - b[0]);

  const n = robot.length;
  const m = factory.length;

  // Initialize dp array where dp[i][j] represents the minimal total distance
  // for the first i robots and first j factories
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(Infinity));
  dp[0][0] = 0; // Base case: no robots and no factories

  // Precompute distance sums between robots and each factory
  const distSum = Array.from({ length: m }, () => [0]);
  for (let j = 0; j < m; j++) {
      const pos = factory[j][0]; // Position of factory j
      for (let i = 0; i < n; i++) {
          // Cumulative sum of distances for factory j
          distSum[j][i + 1] = distSum[j][i] + Math.abs(robot[i] - pos);
      }
  }

  // Dynamic programming to compute minimal total distance
  for (let i = 0; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
          // Initialize dp[i][j] with the value from the previous factory
          dp[i][j] = dp[i][j - 1];
          const limit = factory[j - 1][1]; // Limit of factory j-1
          for (let k = 1; k <= Math.min(limit, i); k++) {
              // Cost to assign k robots to factory j-1
              const cost = distSum[j - 1][i] - distSum[j - 1][i - k];
              // Update dp[i][j] with the minimal value
              dp[i][j] = Math.min(dp[i][j], dp[i - k][j - 1] + cost);
          }
      }
  }

  return dp[n][m]; // Return the minimal total distance for all robots and factories
}

/* 
862. Shortest Subarray with Sum at Least K

Given an integer array nums and an integer k, return the length of the shortest non-empty subarray of nums with a sum of at least k. If there is no such subarray, return -1.

A subarray is a contiguous part of an array.

Example 1:
Input: nums = [1], k = 1
Output: 1

Example 2:
Input: nums = [1,2], k = 4
Output: -1

Example 3:
Input: nums = [2,-1,2], k = 3
Output: 3

Constraints:
1 <= nums.length <= 10^5
-105 <= nums[i] <= 10^5
1 <= k <= 10^9

</> Typescript Code:
*/

function shortestSubarray(nums: number[], k: number): number {
  const n = nums.length;
  // Create a prefix sum array to store cumulative sums
  const prefixSum = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
      prefixSum[i + 1] = prefixSum[i] + nums[i];
  }
  let result = n + 1; // Initialize result to a large value
  const deque: number[] = []; // Deque to store indices of prefix sums
  for (let i = 0; i <= n; i++) {
      // Check if the current prefix sum minus the smallest prefix sum in deque is at least k
      while (deque.length > 0 && prefixSum[i] - prefixSum[deque[0]] >= k) {
          result = Math.min(result, i - deque.shift()!); // Update result with the shortest length
      }
      // Maintain deque in increasing order of prefix sums
      while (deque.length > 0 && prefixSum[i] <= prefixSum[deque[deque.length - 1]]) {
          deque.pop();
      }
      deque.push(i); // Add current index to deque
  }
  return result <= n ? result : -1; // Return result if found, otherwise -1
}


/* 
773. Sliding Puzzle

On an 2 x 3 board, there are five tiles labeled from 1 to 5, and an empty square represented by 0. A move consists of choosing 0 and a 4-directionally adjacent number and swapping it.

The state of the board is solved if and only if the board is [[1,2,3],[4,5,0]].

Given the puzzle board board, return the least number of moves required so that the state of the board is solved. If it is impossible for the state of the board to be solved, return -1.

Example 1:
Input: board = [[1,2,3],[4,0,5]]
Output: 1
Explanation: Swap the 0 and the 5 in one move.

Example 2:
Input: board = [[1,2,3],[5,4,0]]
Output: -1
Explanation: No number of moves will make the board solved.

Example 3:
Input: board = [[4,1,2],[5,0,3]]
Output: 5
Explanation: 5 is the smallest number of moves that solves the board.
An example path:
After move 0: [[4,1,2],[5,0,3]]
After move 1: [[4,1,2],[0,5,3]]
After move 2: [[0,1,2],[4,5,3]]
After move 3: [[1,0,2],[4,5,3]]
After move 4: [[1,2,0],[4,5,3]]
After move 5: [[1,2,3],[4,5,0]]

Constraints:
board.length == 2
board[i].length == 3
0 <= board[i][j] <= 5
Each value board[i][j] is unique.

</> Typescript Code:
*/


function slidingPuzzle(board: number[][]): number {
  // The target state we want to reach
  const target = "123450";
  // Flatten the 2D board to a 1D string for easier manipulation
  const start = board.flat().join('');

  // Define the valid moves for each position on the board
  const neighbors = [
      [1, 3],     // Moves for position 0 (top-left)
      [0, 2, 4],  // Moves for position 1 (top-middle)
      [1, 5],     // Moves for position 2 (top-right)
      [0, 4],     // Moves for position 3 (bottom-left)
      [1, 3, 5],  // Moves for position 4 (bottom-middle)
      [2, 4]      // Moves for position 5 (bottom-right)
  ];

  // Initialize a queue for BFS with the initial state and 0 steps
  const queue: [string, number][] = [[start, 0]];
  // Use a Set to track visited states and avoid revisiting them
  const seen = new Set<string>([start]);

  // Perform BFS
  while (queue.length > 0) {
      // Dequeue the next state to process
      const [state, steps] = queue.shift()!;
      // If we've reached the target state, return the number of steps
      if (state === target) return steps;

      // Find the index of the empty square (0)
      const zeroIndex = state.indexOf('0');

      // Explore all valid moves from the current position
      for (const swapIndex of neighbors[zeroIndex]) {
          // Create a new state by swapping 0 with the adjacent number
          const newState = state.split('');
          [newState[zeroIndex], newState[swapIndex]] = [newState[swapIndex], newState[zeroIndex]];
          const newString = newState.join('');

          // If this state has not been visited, enqueue it
          if (!seen.has(newString)) {
              seen.add(newString);
              queue.push([newString, steps + 1]);
          }
      }
  }
  // If we exhaust the queue without finding the target, return -1
  return -1;
}

/* 
2290. Minimum Obstacle Removal to Reach Corner

You are given a 0-indexed 2D integer array grid of size m x n. Each cell has one of two values:

0 represents an empty cell,
1 represents an obstacle that may be removed.
You can move up, down, left, or right from and to an empty cell.

Return the minimum number of obstacles to remove so you can move from the upper left corner (0, 0) to the lower right corner (m - 1, n - 1).

Example 1:
Input: grid = [[0,1,1],[1,1,0],[1,1,0]]
Output: 2
Explanation: We can remove the obstacles at (0, 1) and (0, 2) to create a path from (0, 0) to (2, 2).
It can be shown that we need to remove at least 2 obstacles, so we return 2.
Note that there may be other ways to remove 2 obstacles to create a path.

Example 2:
Input: grid = [[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]]
Output: 0
Explanation: We can move from (0, 0) to (2, 4) without removing any obstacles, so we return 0.

Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 10^5
2 <= m * n <= 10^5
grid[i][j] is either 0 or 1.
grid[0][0] == grid[m - 1][n - 1] == 0

</> Typescript Code:
*/

function minimumObstacles(grid: number[][]): number {
  // Get the number of rows and columns
  const m = grid.length;
  const n = grid[0].length;
  // Initialize a distance matrix with Infinity
  const dist = Array.from({ length: m }, () => Array(n).fill(Infinity));
  // Starting point has a distance of 0
  dist[0][0] = 0;

  // Directions for movement: right, down, left, up
  const dirs = [[0,1],[1,0],[-1,0],[0,-1]];

  // Initialize a min-heap priority queue
  const heap = new MinHeap<[number, number, number]>((a, b) => a[0] - b[0]);
  // Insert the starting position with cost 0
  heap.insert([0, 0, 0]);

  while (!heap.isEmpty()) {
      // Extract the position with the minimum cost
      const [cost, x, y] = heap.extract();
      // If we have already found a better path, skip
      if (dist[x][y] < cost) continue;

      // Explore all adjacent positions
      for (const [dx, dy] of dirs) {
          const nx = x + dx;
          const ny = y + dy;
          // Check boundaries
          if (nx >=0 && nx < m && ny >=0 && ny < n) {
              // Calculate new cost
              const ncost = cost + grid[nx][ny];
              // If a shorter path is found
              if (dist[nx][ny] > ncost) {
                  dist[nx][ny] = ncost; // Update distance
                  heap.insert([ncost, nx, ny]); // Add to the heap
              }
          }
      }
  }
  // Return the minimum number of obstacles to remove
  return dist[m - 1][n - 1];
}

// Min-heap implementation
class MinHeap<T> {
  private heap: T[];
  private comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
      this.heap = [];
      this.comparator = comparator;
  }

  insert(value: T) {
      this.heap.push(value); // Add value to the heap
      this.bubbleUp(); // Restore heap property upwards
  }

  extract(): T {
      const top = this.heap[0]; // Get the smallest value
      const end = this.heap.pop()!; // Remove the last element
      if (this.heap.length > 0) {
          this.heap[0] = end; // Move the last element to the top
          this.bubbleDown(); // Restore heap property downwards
      }
      return top; // Return the smallest value
  }

  isEmpty(): boolean {
      return this.heap.length === 0; // Check if the heap is empty
  }

  private bubbleUp() {
      let index = this.heap.length - 1;
      const element = this.heap[index];
      // While element is not at the root and smaller than its parent
      while (index > 0) {
          const parentIndex = Math.floor((index -1) / 2);
          const parent = this.heap[parentIndex];
          if (this.comparator(element, parent) >= 0) break; // Correct position
          this.heap[index] = parent; // Swap with parent
          this.heap[parentIndex] = element;
          index = parentIndex; // Move up to parent's index
      }
  }

  private bubbleDown() {
      let index = 0;
      const length = this.heap.length;
      const element = this.heap[0];
      while (true) {
          let leftChildIndex = 2*index + 1;
          let rightChildIndex = 2*index + 2;
          let leftChild: T, rightChild: T;
          let swapIndex = -1;

          // Check left child
          if (leftChildIndex < length) {
              leftChild = this.heap[leftChildIndex];
              if (this.comparator(leftChild, element) < 0) {
                  swapIndex = leftChildIndex;
              }
          }
          // Check right child
          if (rightChildIndex < length) {
              rightChild = this.heap[rightChildIndex];
              if ((swapIndex === -1 && this.comparator(rightChild, element) < 0) ||
                  (swapIndex !== -1 && this.comparator(rightChild, leftChild!) < 0)) {
                  swapIndex = rightChildIndex;
              }
          }
          // If no swap needed, break
          if (swapIndex === -1) break;
          // Swap with the smaller child
          this.heap[index] = this.heap[swapIndex];
          this.heap[swapIndex] = element;
          index = swapIndex; // Move down to child's index
      }
  }
}

/* 
2577. Minimum Time to Visit a Cell In a Grid

You are given a m x n matrix grid consisting of non-negative integers where grid[row][col] represents the minimum time required to be able to visit the cell (row, col), which means you can visit the cell (row, col) only when the time you visit it is greater than or equal to grid[row][col].

You are standing in the top-left cell of the matrix in the 0th second, and you must move to any adjacent cell in the four directions: up, down, left, and right. Each move you make takes 1 second.

Return the minimum time required in which you can visit the bottom-right cell of the matrix. If you cannot visit the bottom-right cell, then return -1.

Example 1:
Input: grid = [[0,1,3,2],[5,1,2,5],[4,3,8,6]]
Output: 7
Explanation: One of the paths that we can take is the following:
- at t = 0, we are on the cell (0,0).
- at t = 1, we move to the cell (0,1). It is possible because grid[0][1] <= 1.
- at t = 2, we move to the cell (1,1). It is possible because grid[1][1] <= 2.
- at t = 3, we move to the cell (1,2). It is possible because grid[1][2] <= 3.
- at t = 4, we move to the cell (1,1). It is possible because grid[1][1] <= 4.
- at t = 5, we move to the cell (1,2). It is possible because grid[1][2] <= 5.
- at t = 6, we move to the cell (1,3). It is possible because grid[1][3] <= 6.
- at t = 7, we move to the cell (2,3). It is possible because grid[2][3] <= 7.
The final time is 7. It can be shown that it is the minimum time possible.

Example 2:
Input: grid = [[0,2,4],[3,2,1],[1,0,4]]
Output: -1
Explanation: There is no path from the top left to the bottom-right cell.

Constraints:
m == grid.length
n == grid[i].length
2 <= m, n <= 1000
4 <= m * n <= 10^5
0 <= grid[i][j] <= 10^5
grid[0][0] == 0

</> Typescript Code:
*/

function minimumTime(grid: number[][]): number {
  // Get the dimensions of the grid
  const m = grid.length;
  const n = grid[0].length;

  // Check if it's impossible to move from the starting cell
  if (grid[0][1] > 1 && grid[1]?.[0] > 1) return -1;

  // Initialize a min-heap for Dijkstra's algorithm
  const heap = new MinHeap();

  // Initialize distance array with Infinity
  const dist = Array.from({ length: m }, () => Array(n).fill(Infinity));
  dist[0][0] = 0;

  // Start from the top-left cell at time 0
  heap.push([0, 0, 0]); // [time, row, col]

  // Directions for moving up, down, left, right
  const dirs = [
      [0, 1], [1, 0], [0, -1], [-1, 0]
  ];

  // Dijkstra's algorithm
  while (!heap.isEmpty()) {
      const [t, x, y] = heap.pop();

      // If we've reached the bottom-right cell, return the time
      if (x === m - 1 && y === n - 1) return t;

      // If we have already found a better path, skip
      if (t > dist[x][y]) continue;

      // Explore all adjacent cells
      for (const [dx, dy] of dirs) {
          const nx = x + dx;
          const ny = y + dy;

          // Check boundaries
          if (nx < 0 || nx >= m || ny < 0 || ny >= n) continue;

          // Calculate the earliest arrival time
          let nt = t + 1;

          // If we can't enter the cell at nt, adjust the time
          if (grid[nx][ny] > nt) {
              const wait = grid[nx][ny] - nt;
              nt = grid[nx][ny] + (wait % 2);
          }

          // If this path is better, update and push to heap
          if (nt < dist[nx][ny]) {
              dist[nx][ny] = nt;
              heap.push([nt, nx, ny]);
          }
      }
  }

  // If the bottom-right cell is unreachable
  return -1;
}

class MinHeap {
  heap: number[][] = [];

  push(node: number[]) {
      this.heap.push(node);
      this._bubbleUp();
  }

  pop(): number[] {
      const top = this.heap[0];
      const bottom = this.heap.pop()!;
      if (this.heap.length > 0) {
          this.heap[0] = bottom;
          this._bubbleDown();
      }
      return top;
  }

  isEmpty(): boolean {
      return this.heap.length === 0;
  }

  _bubbleUp() {
      let index = this.heap.length - 1;
      const node = this.heap[index];
      while (index > 0) {
          const parentIndex = (index - 1) >> 1;
          const parent = this.heap[parentIndex];
          if (node[0] >= parent[0]) break;
          this.heap[parentIndex] = node;
          this.heap[index] = parent;
          index = parentIndex;
      }
  }

  _bubbleDown() {
      let index = 0;
      const length = this.heap.length;
      const node = this.heap[0];
      const nodeTime = node[0];
      while (true) {
          let leftIndex = (index << 1) + 1;
          let rightIndex = leftIndex + 1;
          let smallest = index;
          if (leftIndex < length && this.heap[leftIndex][0] < nodeTime) {
              smallest = leftIndex;
          }
          if (rightIndex < length && this.heap[rightIndex][0] < this.heap[smallest][0]) {
              smallest = rightIndex;
          }
          if (smallest === index) break;
          this.heap[index] = this.heap[smallest];
          this.heap[smallest] = node;
          index = smallest;
      }
  }
};

/* 
2097. Valid Arrangement of Pairs

You are given a 0-indexed 2D integer array pairs where pairs[i] = [starti, endi]. An arrangement of pairs is valid if for every index i where 1 <= i < pairs.length, we have endi-1 == starti.

Return any valid arrangement of pairs.

Note: The inputs will be generated such that there exists a valid arrangement of pairs.

Example 1:
Input: pairs = [[5,1],[4,5],[11,9],[9,4]]
Output: [[11,9],[9,4],[4,5],[5,1]]
Explanation:
This is a valid arrangement since endi-1 always equals starti.
end0 = 9 == 9 = start1 
end1 = 4 == 4 = start2
end2 = 5 == 5 = start3

Example 2:
Input: pairs = [[1,3],[3,2],[2,1]]
Output: [[1,3],[3,2],[2,1]]
Explanation:
This is a valid arrangement since endi-1 always equals starti.
end0 = 3 == 3 = start1
end1 = 2 == 2 = start2
The arrangements [[2,1],[1,3],[3,2]] and [[3,2],[2,1],[1,3]] are also valid.

Example 3:
Input: pairs = [[1,2],[1,3],[2,1]]
Output: [[1,2],[2,1],[1,3]]
Explanation:
This is a valid arrangement since endi-1 always equals starti.
end0 = 2 == 2 = start1
end1 = 1 == 1 = start2

Constraints:
1 <= pairs.length <= 10^5
pairs[i].length == 2
0 <= starti, endi <= 10^9
starti != endi
No two pairs are exactly the same.
There exists a valid arrangement of pairs.

</> Typescript Code:
*/

function validArrangement(pairs: number[][]): number[][] {
  // Map to store adjacency list
  const adj: Map<number, number[]> = new Map();
  // Maps to store out-degree and in-degree
  const outDegree: Map<number, number> = new Map();
  const inDegree: Map<number, number> = new Map();

  // Build graph and degree counts
  for (const [u, v] of pairs) {
      // Initialize adjacency list for u
      if (!adj.has(u)) adj.set(u, []);
      // Add edge from u to v
      adj.get(u)!.push(v);
      // Increment out-degree of u
      outDegree.set(u, (outDegree.get(u) || 0) + 1);
      // Increment in-degree of v
      inDegree.set(v, (inDegree.get(v) || 0) + 1);
  }

  // Find starting node for Eulerian trail
  let startNode = pairs[0][0];
  for (const node of adj.keys()) {
      const out = outDegree.get(node) || 0;
      const inn = inDegree.get(node) || 0;
      // Node with extra out-degree
      if (out > inn) {
          startNode = node;
          break;
      }
  }

  // Result array for valid arrangement
  const res: number[][] = [];
  // Stack for traversal
  const stack: number[] = [startNode];

  // Hierholzer's algorithm
  while (stack.length) {
      const u = stack[stack.length - 1];
      // If u has outgoing edges
      if (adj.has(u) && adj.get(u)!.length > 0) {
          // Get next node v
          const v = adj.get(u)!.pop()!;
          // Continue traversal
          stack.push(v);
      } else {
          // Backtrack
          stack.pop();
          if (stack.length) {
              // Add edge to result
              res.push([stack[stack.length - 1], u]);
          }
      }
  }

  // Reverse to get correct order
  return res.reverse();
}

/* 
2872. Maximum Number of K-Divisible Components

There is an undirected tree with n nodes labeled from 0 to n - 1. You are given the integer n and a 2D integer array edges of length n - 1, where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the tree.

You are also given a 0-indexed integer array values of length n, where values[i] is the value associated with the ith node, and an integer k.

A valid split of the tree is obtained by removing any set of edges, possibly empty, from the tree such that the resulting components all have values that are divisible by k, where the value of a connected component is the sum of the values of its nodes.

Return the maximum number of components in any valid split.

Example 1:
Input: n = 5, edges = [[0,2],[1,2],[1,3],[2,4]], values = [1,8,1,4,4], k = 6
Output: 2
Explanation: We remove the edge connecting node 1 with 2. The resulting split is valid because:
- The value of the component containing nodes 1 and 3 is values[1] + values[3] = 12.
- The value of the component containing nodes 0, 2, and 4 is values[0] + values[2] + values[4] = 6.
It can be shown that no other valid split has more than 2 connected components.

Example 2:
Input: n = 7, edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]], values = [3,0,6,1,5,2,1], k = 3
Output: 3
Explanation: We remove the edge connecting node 0 with 2, and the edge connecting node 0 with 1. The resulting split is valid because:
- The value of the component containing node 0 is values[0] = 3.
- The value of the component containing nodes 2, 5, and 6 is values[2] + values[5] + values[6] = 9.
- The value of the component containing nodes 1, 3, and 4 is values[1] + values[3] + values[4] = 6.
It can be shown that no other valid split has more than 3 connected components.

Constraints:
1 <= n <= 3 * 10^4
edges.length == n - 1
edges[i].length == 2
0 <= ai, bi < n
values.length == n
0 <= values[i] <= 10^9
1 <= k <= 10^9
Sum of values is divisible by k.
The input is generated such that edges represents a valid tree.

</> Typescript Code:
*/

function maxKDivisibleComponents(n: number, edges: number[][], values: number[], k: number): number {
  // Create adjacency list for the tree
  const adj: number[][] = Array.from({ length: n }, () => []);
  // Fill adjacency list with bidirectional edges
  for (const [a, b] of edges) {
      adj[a].push(b);
      adj[b].push(a);
  }
  // Track visited nodes to avoid revisiting
  const visited = new Array<boolean>(n).fill(false);
  // This will hold the number of valid k-divisible components found
  let count = 0;
  // Depth-first search function
  const dfs = (u: number): number => {
      // Mark current node as visited
      visited[u] = true;
      // Take current node's value mod k
      let sum = values[u] % k;
      // Traverse adjacent nodes
      for (const v of adj[u]) {
          // If neighbor not visited, recurse
          if (!visited[v]) {
              // Add subtree result (mod k) to sum
              sum = (sum + dfs(v)) % k;
          }
      }
      // If total sum is divisible by k, increment count and reset sum
      if (sum === 0) {
          count++;
          return 0;
      }
      // Return sum mod k to parent call
      return sum;
  };
  // Initiate DFS from node 0
  dfs(0);
  // Return the count of k-divisible components
  return count;
};

/* 
2940. Find Building Where Alice and Bob Can Meet

You are given a 0-indexed array heights of positive integers, where heights[i] represents the height of the ith building.

If a person is in building i, they can move to any other building j if and only if i < j and heights[i] < heights[j].

You are also given another array queries where queries[i] = [ai, bi]. On the ith query, Alice is in building ai while Bob is in building bi.

Return an array ans where ans[i] is the index of the leftmost building where Alice and Bob can meet on the ith query. If Alice and Bob cannot move to a common building on query i, set ans[i] to -1.

Example 1:
Input: heights = [6,4,8,5,2,7], queries = [[0,1],[0,3],[2,4],[3,4],[2,2]]
Output: [2,5,-1,5,2]
Explanation: In the first query, Alice and Bob can move to building 2 since heights[0] < heights[2] and heights[1] < heights[2]. 
In the second query, Alice and Bob can move to building 5 since heights[0] < heights[5] and heights[3] < heights[5]. 
In the third query, Alice cannot meet Bob since Alice cannot move to any other building.
In the fourth query, Alice and Bob can move to building 5 since heights[3] < heights[5] and heights[4] < heights[5].
In the fifth query, Alice and Bob are already in the same building.  
For ans[i] != -1, It can be shown that ans[i] is the leftmost building where Alice and Bob can meet.
For ans[i] == -1, It can be shown that there is no building where Alice and Bob can meet.

Example 2:
Input: heights = [5,3,8,2,6,1,4,6], queries = [[0,7],[3,5],[5,2],[3,0],[1,6]]
Output: [7,6,-1,4,6]
Explanation: In the first query, Alice can directly move to Bob's building since heights[0] < heights[7].
In the second query, Alice and Bob can move to building 6 since heights[3] < heights[6] and heights[5] < heights[6].
In the third query, Alice cannot meet Bob since Bob cannot move to any other building.
In the fourth query, Alice and Bob can move to building 4 since heights[3] < heights[4] and heights[0] < heights[4].
In the fifth query, Alice can directly move to Bob's building since heights[1] < heights[6].
For ans[i] != -1, It can be shown that ans[i] is the leftmost building where Alice and Bob can meet.
For ans[i] == -1, It can be shown that there is no building where Alice and Bob can meet.

Constraints:
1 <= heights.length <= 5 * 10^4
1 <= heights[i] <= 10^9
1 <= queries.length <= 5 * 10^4
queries[i] = [ai, bi]
0 <= ai, bi <= heights.length - 1

</> Typescript Code:
*/

function leftmostBuildingQueries(heights: number[], queries: number[][]): number[] {
  // Create an output array "ans" with the same length as queries, initialized to -1
  const ans = new Array(queries.length).fill(-1);

  // "remain" holds, for each building index, a list of query objects waiting
  // for that building to become reachable if the height condition is met
  const remain = new Array(heights.length).fill(1).map(() => new Array());

  // Iterate over each query to prepare them based on conditions
  for (let i = 0; i < queries.length; i++) {
      // Extract Alice and Bob's building
      const [q1, q2] = queries[i];

      // Ensure left is the smaller index and right is the larger index
      const left = q1 < q2 ? q1 : q2;
      const right = q1 < q2 ? q2 : q1;
      
      // If both indices are the same, the answer is that index
      if (left === right) {
          ans[i] = right;
          continue;
      }
      
      // Get the heights of the left and right buildings
      const heightLeft = heights[left];
      const heightRight = heights[right];
      
      // If the left building's height is strictly less, Bob is already reachable
      if (heightLeft < heightRight) {
          ans[i] = right;
          continue;
      }

      // Otherwise, we push a query object into the "remain" list for building "right"
      remain[right].push({
          height: Math.max(heightLeft, heightRight),
          queryIndex: i 
      });
  }

  // Create a min priority queue where items are sorted by "height"
  // This helps determine the next building that can be reached based on height
  const minPQ = new MinPriorityQueue({
      priority: (item) => item.height
  });

  // Traverse buildings in ascending order of index
  for (let j = 0; j < heights.length; j++) {
      // While the queue's front has a smaller height than the current building,
      // this building "j" is the first one tall enough to meet the query
      while (!minPQ.isEmpty() && minPQ.front().element.height < heights[j]) {
          ans[minPQ.dequeue().element.queryIndex] = j;
      }

      // Enqueue all queries that have building "j" as the designated place to check
      for (const r of remain[j]) {
          minPQ.enqueue(r);
      }
  }
  
  // Return the array of answers after processing all queries
  return ans;
};

/* 
3203. Find Minimum Diameter After Merging Two Trees

There exist two undirected trees with n and m nodes, numbered from 0 to n - 1 and from 0 to m - 1, respectively. You are given two 2D integer arrays edges1 and edges2 of lengths n - 1 and m - 1, respectively, where edges1[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the first tree and edges2[i] = [ui, vi] indicates that there is an edge between nodes ui and vi in the second tree.

You must connect one node from the first tree with another node from the second tree with an edge.

Return the minimum possible diameter of the resulting tree.

The diameter of a tree is the length of the longest path between any two nodes in the tree.

Example 1:
Input: edges1 = [[0,1],[0,2],[0,3]], edges2 = [[0,1]]
Output: 3
Explanation:
We can obtain a tree of diameter 3 by connecting node 0 from the first tree with any node from the second tree.

Example 2:
Input: edges1 = [[0,1],[0,2],[0,3],[2,4],[2,5],[3,6],[2,7]], edges2 = [[0,1],[0,2],[0,3],[2,4],[2,5],[3,6],[2,7]]
Output: 5
Explanation:
We can obtain a tree of diameter 5 by connecting node 0 from the first tree with node 0 from the second tree.

Constraints:
1 <= n, m <= 10^5
edges1.length == n - 1
edges2.length == m - 1
edges1[i].length == edges2[i].length == 2
edges1[i] = [ai, bi]
0 <= ai, bi < n
edges2[i] = [ui, vi]
0 <= ui, vi < m
The input is generated such that edges1 and edges2 represent valid trees.

</> Typescript Code:
*/

function minimumDiameterAfterMerge(edges1: number[][], edges2: number[][]): number {
  // Helper function to compute diameter of a tree
  const getDiameter = (e: number[][], n: number) => {
    // If only one node, diameter is 0
    if (n < 2) return 0;

    // Build adjacency list
    const adj: number[][] = Array.from({ length: n }, () => []);

    // Populate adjacency for all edges
    for (const [x, y] of e) {
      adj[x].push(y);
      adj[y].push(x);
    }

    // Perform BFS to find farthest node
    const bfs = (start: number) => {
      const visited = Array(n).fill(false);
      const dist = Array(n).fill(0);
      visited[start] = true;
      let farthest = start;
      const queue = [start];

      // Standard BFS loop
      while (queue.length) {
        const node = queue.shift()!;
        for (const neighbor of adj[node]) {
          if (!visited[neighbor]) {
            visited[neighbor] = true;
            dist[neighbor] = dist[node] + 1;
            queue.push(neighbor);
            // Track the farthest node from 'start'
            if (dist[neighbor] > dist[farthest]) {
              farthest = neighbor;
            }
          }
        }
      }
      // Return the farthest node and its distance
      return [farthest, dist[farthest]] as [number, number];
    };

    // Compute diameter by BFS twice
    const [nodeA] = bfs(0);
    const [, diameter] = bfs(nodeA);
    return diameter;
  };

  // Determine number of nodes in each input tree
  const n = edges1.length + 1;
  const m = edges2.length + 1;

  // Get diameters for both trees
  const d1 = getDiameter(edges1, n);
  const d2 = getDiameter(edges2, m);

  // Combine results to get minimum possible new diameter
  return Math.max(d1, d2, ((d1 + 1) >> 1) + ((d2 + 1) >> 1) + 1);
}