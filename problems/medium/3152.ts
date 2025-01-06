/* 
3152. Special Array II

An array is considered special if every pair of its adjacent elements contains two numbers with different parity.

You are given an array of integer nums and a 2D integer matrix queries, where for queries[i] = [fromi, toi] your task is to check that 
subarray nums[fromi..toi] is special or not.

Return an array of booleans answer such that answer[i] is true if nums[fromi..toi] is special.

Example 1:
Input: nums = [3,4,1,2,6], queries = [[0,4]]
Output: [false]
Explanation:
The subarray is [3,4,1,2,6]. 2 and 6 are both even.

Example 2:
Input: nums = [4,3,1,6], queries = [[0,2],[2,3]]
Output: [false,true]
Explanation:
The subarray is [4,3,1]. 3 and 1 are both odd. So the answer to this query is false.
The subarray is [1,6]. There is only one pair: (1,6) and it contains numbers with different parity. So the answer to this query is true.

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^5
1 <= queries.length <= 10^5
queries[i].length == 2
0 <= queries[i][0] <= queries[i][1] <= nums.length - 1

</> Typescript Code:
*/

function isArraySpecial(nums: number[], queries: number[][]): boolean[] {
  const n = nums.length;
  // Initialize prefixDiff array to store prefix sums
  const prefixDiff = new Array(n).fill(0);
  // Compute prefix sums of same parity adjacent pairs
  for (let i = 0; i < n - 1; i++) {
    // Determine if nums[i] and nums[i + 1] have the same parity
    const sameParity = nums[i] % 2 === nums[i + 1] % 2 ? 1 : 0;
    // Update prefixDiff with the cumulative sum
    prefixDiff[i + 1] = prefixDiff[i] + sameParity;
  }
  // Initialize result array to store answers for each query
  const result = new Array(queries.length);
  // Process each query
  for (let i = 0; i < queries.length; i++) {
    const [l, r] = queries[i];
    // Calculate number of same parity pairs in the subarray
    const count = prefixDiff[r] - prefixDiff[l];
    // Subarray is special if count is zero
    result[i] = count === 0;
  }
  // Return the array of boolean results
  return result;
}
