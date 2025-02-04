/* 
1800. Maximum Ascending Subarray Sum

Given an array of positive integers nums, return the maximum possible sum of an ascending subarray in nums.

A subarray is defined as a contiguous sequence of numbers in an array.

A subarray [numsl, numsl+1, ..., numsr-1, numsr] is ascending if for all i where l <= i < r, numsi  < numsi+1. Note that a subarray of size 1 is ascending.

Example 1:
Input: nums = [10,20,30,5,10,50]
Output: 65
Explanation: [5,10,50] is the ascending subarray with the maximum sum of 65.

Example 2:
Input: nums = [10,20,30,40,50]
Output: 150
Explanation: [10,20,30,40,50] is the ascending subarray with the maximum sum of 150.

Example 3:
Input: nums = [12,17,15,13,10,11,12]
Output: 33
Explanation: [10,11,12] is the ascending subarray with the maximum sum of 33.

Constraints:
1 <= nums.length <= 100
1 <= nums[i] <= 100

</> Typescript code:
*/

function maxAscendingSum(nums: number[]): number {
  // Set the initial maximum sum to 0, and initialize the current subarray sum with the first element.
  let maxSum: number = 0,
    currSum: number = nums[0];
  // Define 'prev' as the first element to compare with future elements.
  let prev: number = nums[0];
  // Iterate through the array starting from the second element.
  for (let i = 1; i < nums.length; i++) {
    // If the current element is greater than the previous one, extend the ascending subarray.
    if (nums[i] > prev) {
      currSum += nums[i];
    } else {
      // Otherwise, update maxSum if the current accumulated sum is larger.
      if (currSum > maxSum) {
        maxSum = currSum;
      }
      // Start a new ascending subarray from the current element.
      currSum = nums[i];
    }
    // Update 'prev' to be the current element for the next iteration.
    prev = nums[i];
  }
  // Return the maximum of the recorded maxSum or the sum of the last ascending subarray.
  return Math.max(maxSum, currSum);
}
