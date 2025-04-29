/* 
2962. Count Subarrays Where Max Element Appears at Least K Times

You are given an integer array nums and a positive integer k.

Return the number of subarrays where the maximum element of nums appears at least k times in that subarray.

A subarray is a contiguous sequence of elements within an array.

Example 1:
Input: nums = [1,3,2,3,3], k = 2
Output: 6
Explanation: The subarrays that contain the element 3 at least 2 times are: [1,3,2,3], [1,3,2,3,3], [3,2,3], [3,2,3,3], [2,3,3] and [3,3].

Example 2:
Input: nums = [1,4,2,1], k = 3
Output: 0
Explanation: No subarray contains the element 4 at least 3 times.
 
Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^6
1 <= k <= 10^5

</> Typescript code:
*/

function countSubarrays(nums: number[], k: number): number {
  // Find the maximum element in the array
  // O(n) time complexity for this operation
  const maxElement = Math.max(...nums);

  // Counter for valid subarrays
  let count = 0;

  // Two-pointer approach:
  // 'start' marks the beginning of our current window
  let start = 0;
  // 'maxCount' tracks how many times the maxElement appears in our current window
  let maxCount = 0;

  // 'end' marks the end of our current window
  // We expand the window from left to right
  for (let end = 0; end < nums.length; end++) {
    // If the current element is the maxElement, increment our count
    if (nums[end] === maxElement) {
      maxCount++;
    }

    // When we have at least k occurrences of maxElement
    while (maxCount >= k) {
      // For each valid window with at least k occurrences,
      // we can form subarrays by extending the end rightward
      // This adds (nums.length - end) new valid subarrays
      count += nums.length - end;

      // Now we need to shrink our window from the left
      // If we're removing an occurrence of maxElement, decrement maxCount
      if (nums[start] === maxElement) {
        maxCount--;
      }

      // Move the start pointer forward to shrink the window
      start++;
    }
  }

  // Return the total count of valid subarrays
  return count;
}
