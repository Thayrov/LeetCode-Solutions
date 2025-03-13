/*
2529. Maximum Count of Positive Integer and Negative Integer

Given an array nums sorted in non-decreasing order, return the maximum between the number of positive integers and the number of negative integers.

In other words, if the number of positive integers in nums is pos and the number of negative integers is neg, then return the maximum of pos and neg.
Note that 0 is neither positive nor negative.

Example 1:
Input: nums = [-2,-1,-1,1,2,3]
Output: 3
Explanation: There are 3 positive integers and 3 negative integers. The maximum count among them is 3.

Example 2:
Input: nums = [-3,-2,-1,0,0,1,2]
Output: 3
Explanation: There are 2 positive integers and 3 negative integers. The maximum count among them is 3.

Example 3:
Input: nums = [5,20,66,1314]
Output: 4
Explanation: There are 4 positive integers and 0 negative integers. The maximum count among them is 4.

Constraints:
1 <= nums.length <= 2000
-2000 <= nums[i] <= 2000
nums is sorted in a non-decreasing order.

Follow up: Can you solve the problem in O(log(n)) time complexity?

</> Typescript code:
*/

function maximumCount(nums: number[]): number {
  const n = nums.length;                            // Store array length
  let left = 0;                                     // Left pointer for binary search
  let right = n - 1;                                // Right pointer for binary search
  
  // Find rightmost negative number's index
  let negEnd = -1;                                  // Index of last negative number
  while (left <= right) {                           // Binary search loop
      const mid = left + Math.floor((right - left) / 2); // Avoid overflow
      if (nums[mid] < 0) {                          // If negative found
          negEnd = mid;                             // Update potential answer
          left = mid + 1;                           // Search right half
      } else {                                      // If zero or positive
          right = mid - 1;                          // Search left half
      }
  }
  
  // Reset pointers for second binary search
  left = 0;
  right = n - 1;
  // Find leftmost positive number's index
  let posStart = n;                                 // Index of first positive number
  while (left <= right) {                           // Binary search loop
      const mid = left + Math.floor((right - left) / 2); // Avoid overflow
      if (nums[mid] > 0) {                          // If positive found
          posStart = mid;                           // Update potential answer
          right = mid - 1;                          // Search left half
      } else {                                      // If negative or zero
          left = mid + 1;                           // Search right half
      }
  }
  
  const negCount = negEnd + 1;                      // Count of negatives (index + 1)
  const posCount = n - posStart;                    // Count of positives (length - start)
  return Math.max(negCount, posCount);              // Return maximum of counts
}