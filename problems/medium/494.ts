/* 
494. Target Sum

You are given an integer array nums and an integer target.

You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.

For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1".
Return the number of different expressions that you can build, which evaluates to target.

Example 1:
Input: nums = [1,1,1,1,1], target = 3
Output: 5
Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3

Example 2:
Input: nums = [1], target = 1
Output: 1

Constraints:
1 <= nums.length <= 20
0 <= nums[i] <= 1000
0 <= sum(nums[i]) <= 1000
-1000 <= target <= 1000

</> Typescript Code:
*/

function findTargetSumWays(nums: number[], target: number): number {
  // Sum all numbers
  let sum = 0;
  for (let n of nums) sum += n;

  // If sum + target is negative or odd, no valid assignments
  if (sum + target < 0 || (sum + target) % 2 !== 0) return 0;

  // Target subset sum is half of (sum + target), computed via bit shift
  let half = (sum + target) >> 1;

  // dp[x] holds how many ways to reach sum x
  let dp = new Array(half + 1).fill(0);

  // There's one way to achieve sum 0 (using no elements)
  dp[0] = 1;

  // Update dp from the end to avoid counting repeated states
  for (let n of nums) {
    for (let s = half; s >= n; s--) {
      dp[s] += dp[s - n];
    }
  }

  // dp[half] now represents how many ways to form the required sum
  return dp[half];
}
