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
