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

</> Typescript code:
*/

function countSubarrays(nums: number[], minK: number, maxK: number): number {
  // Keep track of total valid subarrays
  let result = 0;

  // Track the position of the last element that is outside our bounds
  let lastOutOfBounds = -1;

  // Track positions of the last occurrences of minK and maxK
  let lastMinKPos = -1;
  let lastMaxKPos = -1;

  // Iterate through the array once (O(n) time complexity)
  for (let i = 0; i < nums.length; i++) {
    // If current element is out of bounds, update lastOutOfBounds
    if (nums[i] < minK || nums[i] > maxK) {
      lastOutOfBounds = i;
    }

    // Update position of last occurrence of minK
    if (nums[i] === minK) {
      lastMinKPos = i;
    }

    // Update position of last occurrence of maxK
    if (nums[i] === maxK) {
      lastMaxKPos = i;
    }

    // Calculate how many valid subarrays end at the current position
    // Any subarray ending at current position must:
    // 1. Contain both minK and maxK (most recent ones)
    // 2. Not contain any out-of-bounds elements
    // So the valid starting points are between (lastOutOfBounds+1) and
    // min(lastMinKPos, lastMaxKPos), inclusive
    const validSubarrays = Math.min(lastMinKPos, lastMaxKPos) - lastOutOfBounds;

    // Add valid subarrays count to the result (if positive)
    result += validSubarrays > 0 ? validSubarrays : 0;
  }

  return result;
}
