/* 
3375. Minimum Operations to Make Array Values Equal to K

You are given an integer array nums and an integer k.

An integer h is called valid if all values in the array that are strictly greater than h are identical.

For example, if nums = [10, 8, 10, 8], a valid integer is h = 9 because all nums[i] > 9 are equal to 10, but 5 is not a valid integer.

You are allowed to perform the following operation on nums:

Select an integer h that is valid for the current values in nums.
For each index i where nums[i] > h, set nums[i] to h.
Return the minimum number of operations required to make every element in nums equal to k. If it is impossible to make all elements equal to k, return -1.

Example 1:
Input: nums = [5,2,5,4,5], k = 2
Output: 2
Explanation:
The operations can be performed in order using valid integers 4 and then 2.

Example 2:
Input: nums = [2,1,2], k = 2
Output: -1
Explanation:
It is impossible to make all the values equal to 2.

Example 3:
Input: nums = [9,7,5,3], k = 1
Output: 4
Explanation:
The operations can be performed using valid integers in the order 7, 5, 3, and 1.

Constraints:
1 <= nums.length <= 100 
1 <= nums[i] <= 100
1 <= k <= 100

</> Typescript code:
*/

function minOperations(nums: number[], k: number): number {
  // Check if there is any element less than k.
  // Since operations can only decrease values, if an element is below k, it's impossible to reach k.
  if (nums.some((x) => x < k)) return -1;

  // Create a set to get only unique values from nums,
  // then convert the set to an array and sort it in ascending order.
  // This way, the first element (unique[0]) will be the smallest unique number.
  const unique = Array.from(new Set(nums)).sort((a, b) => a - b);

  // Determine the minimum operations required:
  // - If the smallest unique value is exactly k, then each distinct value
  //   above k will require one operation (thus total operations is unique.length - 1).
  // - Otherwise, if the smallest unique value is greater than k,
  //   an extra operation is needed to finally reduce the smallest value down to k,
  //   making the total operations equal to unique.length.
  return unique[0] === k ? unique.length - 1 : unique.length;
}
