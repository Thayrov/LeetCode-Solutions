/* 
1749. Maximum Absolute Sum of Any Subarray

You are given an integer array nums. The absolute sum of a subarray [numsl, numsl+1, ..., numsr-1, numsr] is abs(numsl + numsl+1 + ... + numsr-1 + numsr).

Return the maximum absolute sum of any (possibly empty) subarray of nums.

Note that abs(x) is defined as follows:

If x is a negative integer, then abs(x) = -x.
If x is a non-negative integer, then abs(x) = x.

Example 1:
Input: nums = [1,-3,2,3,-4]
Output: 5
Explanation: The subarray [2,3] has absolute sum = abs(2+3) = abs(5) = 5.

Example 2:
Input: nums = [2,-5,1,-4,3,-2]
Output: 8
Explanation: The subarray [-5,1,-4] has absolute sum = abs(-5+1-4) = abs(-8) = 8.

Constraints:
1 <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4

</> Typescript Code:
*/

// This function calculates the maximum absolute sum of any subarray of a given array.
function maxAbsoluteSum(nums: number[]): number {
  // Initialize maximum and minimum subarray sums to 0
  let maxSum = 0, // The maximum subarray sum encountered so far.
    minSum = 0, // The minimum subarray sum encountered so far.
    currMax = 0, // Running maximum sum ending at the current index.
    currMin = 0; // Running minimum sum ending at the current index.

  // Iterate over each number in the array
  for (let num of nums) {
    // Update currMax: decide whether to extend the previous subarray or start anew from current number.
    currMax = Math.max(currMax + num, num);
    // Update overall maxSum if the current running sum is larger.
    maxSum = Math.max(maxSum, currMax);
    // Update currMin: decide whether to extend the previous subarray or start anew with the current number for minimum sum.
    currMin = Math.min(currMin + num, num);
    // Update overall minSum if the current running sum is smaller.
    minSum = Math.min(minSum, currMin);
  }
  // Return the maximum absolute sum, which is the larger of maxSum or the absolute value of minSum.
  return Math.max(maxSum, -minSum);
}
