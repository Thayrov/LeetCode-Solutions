/*
1464. Maximum Product of Two Elements in an Array

Given the array of integers nums, you will choose two different indices i and j of that array.
Return the maximum value of (nums[i]-1)*(nums[j]-1).

Example 1:
Input: nums = [3,4,5,2]
Output: 12
Explanation:
If you choose the indices i=1 and j=2 (indexed from 0), you will get the maximum value, that is, (nums[1]-1)*(nums[2]-1) = (4-1)*(5-1) = 3*4 = 12.

Example 2:
Input: nums = [1,5,4,5]
Output: 16
Explanation:
Choosing the indices i=1 and j=3 (indexed from 0), you will get the maximum value of (5-1)*(5-1) = 16.

Example 3:
Input: nums = [3,7]
Output: 12

Constraints:
2 <= nums.length <= 500
1 <= nums[i] <= 10^3

</> Typescript code:
*/

// Return the best product formed by two distinct array elements.
function maxProduct(nums: number[]): number {
  // Track the largest value encountered so far.
  let largest = 0;
  // Track the second-largest value encountered so far.
  let secondLargest = 0;

  // Process every value once to maintain the two largest values.
  for (const value of nums) {
    // Promote values that meet or exceed the current maximum.
    if (value >= largest) {
      // Demote the previous maximum into second place.
      secondLargest = largest;
      // Store the new maximum.
      largest = value;
      // Otherwise, promote the value only when it improves second place.
    } else if (value > secondLargest) {
      // Store the improved second-largest value.
      secondLargest = value;
    }
  }

  // Apply the required decrement to the two optimal values and multiply them.
  return (largest - 1) * (secondLargest - 1);
}
