/* 
2540. Minimum Common Value

Given two integer arrays nums1 and nums2, sorted in non-decreasing order, return the minimum integer common to both arrays. If there is no common integer amongst nums1 and nums2, return -1.
Note that an integer is said to be common to nums1 and nums2 if both arrays have at least one occurrence of that integer.

Example 1:
Input: nums1 = [1,2,3], nums2 = [2,4]
Output: 2
Explanation: The smallest element common to both arrays is 2, so we return 2.

Example 2:
Input: nums1 = [1,2,3,6], nums2 = [2,3,4,5]
Output: 2
Explanation: There are two common elements in the array 2 and 3 out of which 2 is the smallest, so 2 is returned.

Constraints:
1 <= nums1.length, nums2.length <= 10^5
1 <= nums1[i], nums2[j] <= 10^9
Both nums1 and nums2 are sorted in non-decreasing order.

</> Typescript Code:
*/

function getCommon(nums1: number[], nums2: number[]): number {
  // Initialize two pointers for each array starting from the beginning
  let i = 0,
    j = 0;

  // Loop until one of the pointers reaches the end of its respective array
  while (i < nums1.length && j < nums2.length) {
    // If the current element in nums1 is less than that in nums2, move the nums1 pointer forward
    if (nums1[i] < nums2[j]) {
      i++;
    }
    // If the current element in nums2 is less than that in nums1, move the nums2 pointer forward
    else if (nums1[i] > nums2[j]) {
      j++;
    }
    // If the elements pointed by both pointers are equal, we've found a common element
    else {
      return nums1[i]; // Return the common element
    }
  }
  // If no common element is found by the end of either array, return -1
  return -1;
}
