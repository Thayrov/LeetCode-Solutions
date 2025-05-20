/*
3355. Zero Array Transformation I

You are given an integer array nums of length n and a 2D array queries, where queries[i] = [li, ri].

For each queries[i]:
Select a subset of indices within the range [li, ri] in nums.
Decrement the values at the selected indices by 1.
A Zero Array is an array where all elements are equal to 0.

Return true if it is possible to transform nums into a Zero Array after processing all the queries sequentially, otherwise return false.

Example 1:
Input: nums = [1,0,1], queries = [[0,2]]
Output: true
Explanation:
For i = 0:
Select the subset of indices as [0, 2] and decrement the values at these indices by 1.
The array will become [0, 0, 0], which is a Zero Array.

Example 2:
Input: nums = [4,3,2,1], queries = [[1,3],[0,2]]
Output: false
Explanation:
For i = 0:
Select the subset of indices as [1, 2, 3] and decrement the values at these indices by 1.
The array will become [4, 2, 1, 0].
For i = 1:
Select the subset of indices as [0, 1, 2] and decrement the values at these indices by 1.
The array will become [3, 1, 0, 0], which is not a Zero Array.
 
Constraints:
1 <= nums.length <= 10^5
0 <= nums[i] <= 10^5
1 <= queries.length <= 10^5
queries[i].length == 2
0 <= li <= ri < nums.length

</> Typescript code:
*/

function isZeroArray(nums: number[], queries: number[][]): boolean {
  // n = length of the input array
  const n = nums.length;
  // diff[] is a classic difference-array; one extra slot avoids bounds checks
  const diff = new Int32Array(n + 1);

  // Each query [l, r] increases coverage by +1 from l and subtracts at r+1.
  // After a prefix sum, cover[i] equals the number of queries that include i.
  for (const [l, r] of queries) {
    ++diff[l]; // start of range gains one unit of coverage
    --diff[r + 1]; // after end of range, coverage is reduced back
  }

  // Running prefix sum of diff gives current coverage.
  // If nums[i] ever exceeds available coverage, transformation is impossible.
  let cover = 0;
  for (let i = 0; i < n; ++i) {
    cover += diff[i]; // accumulate coverage at position i
    if (nums[i] > cover)
      // need more decrements than possible?
      return false; // early exit: cannot reach all zeros
  }

  // All positions satisfied their decrement demands → feasible.
  return true;
}
