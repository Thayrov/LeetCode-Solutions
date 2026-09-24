/*
3550. Smallest Index With Digit Sum Equal to Index

You are given an integer array nums.
Return the smallest index i such that the sum of the digits of nums[i] is equal to i.
If no such index exists, return -1.

Example 1:
Input: nums = [1,3,2]
Output: 2
Explanation: For nums[2] = 2, the sum of digits is 2, which is equal to index i = 2. Thus, the output is 2.

Example 2:
Input: nums = [1,10,11]
Output: 1
Explanation: For nums[1] = 10, the sum of digits is 1 + 0 = 1, which is equal to index i = 1.
For nums[2] = 11, the sum of digits is 1 + 1 = 2, which is equal to index i = 2.
Since index 1 is the smallest, the output is 1.

Example 3:
Input: nums = [1,2,3]
Output: -1
Explanation: Since no index satisfies the condition, the output is -1.

Constraints:
1 <= nums.length <= 100
0 <= nums[i] <= 1000

</> Typescript code:
*/

function smallestIndex(nums: number[]): number {
  // Cache array length for loop bounds.
  const n = nums.length;
  // Cap scan at 28 since max digit sum for <=1000 is 27.
  const m = n < 28 ? n : 28;
  // Scan indices ascending to return smallest match.
  for (let i = 0; i < m; i++) {
    // Copy value for destructive digit extraction.
    let x = nums[i];
    // Accumulate decimal digit sum.
    let s = 0;
    // Extract digits with integer arithmetic.
    while (x > 0) {
      // Add lowest decimal digit.
      s += x % 10;
      // Abort early once sum already exceeds index.
      if (s > i) break;
      // Drop lowest digit via truncated division.
      x = (x / 10) | 0;
    }
    // Return first index whose digit sum matches.
    if (s === i) return i;
  }
  // No matching index found.
  return -1;
}
