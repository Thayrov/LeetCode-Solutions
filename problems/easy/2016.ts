/*
2016. Maximum Difference Between Increasing Elements

Given a 0-indexed integer array nums of size n, find the maximum difference between nums[i] and nums[j] (i.e., nums[j] - nums[i]), such that 0 <= i < j < n and nums[i] < nums[j].
Return the maximum difference. If no such i and j exists, return -1.

Example 1:
Input: nums = [7,1,5,4]
Output: 4
Explanation:
The maximum difference occurs with i = 1 and j = 2, nums[j] - nums[i] = 5 - 1 = 4.
Note that with i = 1 and j = 0, the difference nums[j] - nums[i] = 7 - 1 = 6, but i > j, so it is not valid.

Example 2:
Input: nums = [9,4,3,2]
Output: -1
Explanation:
There is no i and j such that i < j and nums[i] < nums[j].

Example 3:
Input: nums = [1,5,2,10]
Output: 9
Explanation:
The maximum difference occurs with i = 0 and j = 3, nums[j] - nums[i] = 10 - 1 = 9.
 
Constraints:
n == nums.length
2 <= n <= 1000
1 <= nums[i] <= 10^9

</> Typescript code:
*/

function maximumDifference(nums: number[]): number {
  // Initialize maxDiff to -1, as per the problem statement.
  // If no pair (i, j) satisfies the conditions, -1 should be returned.
  let maxDiff = -1;

  // Initialize minElement with the first element of the array.
  // This variable will keep track of the minimum element encountered so far
  // as we iterate through the array to find potential nums[i] values.
  let minElement = nums[0];

  // Iterate through the array starting from the second element (index 1).
  // The current element nums[j] will be considered as a potential nums[j] in the pair (nums[i], nums[j]).
  for (let j = 1; j < nums.length; j++) {
    // Check if the current element nums[j] is greater than the minimum element found so far (minElement).
    // This condition ensures that nums[i] < nums[j] is met, where nums[i] is minElement.
    if (nums[j] > minElement) {
      // If nums[j] is greater than minElement, calculate the difference.
      // Update maxDiff with the maximum between the current maxDiff and the new difference.
      // This ensures we always store the largest valid difference found.
      maxDiff = Math.max(maxDiff, nums[j] - minElement);
    } else {
      // If nums[j] is not greater than minElement, it means nums[j] is a new smaller or equal element.
      // In this case, nums[j] becomes the new potential minimum element for subsequent calculations.
      // We update minElement to nums[j] because a smaller starting point (nums[i]) will
      // potentially lead to a larger difference later in the array.
      minElement = nums[j];
    }
  }

  // After iterating through the entire array, maxDiff will hold the maximum valid difference found.
  // If no valid pair was found, maxDiff remains -1.
  return maxDiff;
}
