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
  const dp = Array.from({ length: n + 1 }, () => Array(d + 1).fill(Infinity));
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
