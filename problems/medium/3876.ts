/*
3876. Construct Uniform Parity Array II

Hint
You are given an array nums1 of n distinct integers.
You want to construct another array nums2 of length n such that the elements in nums2 are either all odd or all even.
For each index i, you must choose exactly one of the following (in any order):
nums2[i] = nums1[i]​​​​​​​
nums2[i] = nums1[i] - nums1[j], for an index j != i, such that nums1[i] - nums1[j] >= 1
Return true if it is possible to construct such an array, otherwise return false.

Example 1:
Input: nums1 = [1,4,7]
Output: true
Explanation:​​​​​​​​​​​​​​
Set nums2[0] = nums1[0] = 1.
Set nums2[1] = nums1[1] - nums1[0] = 4 - 1 = 3.
Set nums2[2] = nums1[2] = 7.
nums2 = [1, 3, 7], and all elements are odd. Thus, the answer is true.

Example 2:
Input: nums1 = [2,3]
Output: false
Explanation:
It is not possible to construct nums2 such that all elements have the same parity. Thus, the answer is false.

Example 3:
Input: nums1 = [4,6]
Output: true
Explanation:
Set nums2[0] = nums1[0] = 4.
Set nums2[1] = nums1[1] = 6.
nums2 = [4, 6], and all elements are even. Thus, the answer is true.

Constraints:
1 <= n == nums1.length <= 10^5
1 <= nums1[i] <= 10^9
nums1 consists of distinct integers.

</> Typescript code:
*/

function uniformArray(nums1: number[]): boolean {
  // Stores the minimum value in nums1.
  // The smallest element is critical because subtraction is only allowed
  // using a strictly smaller value.
  let min = Infinity;

  // Tracks whether the array contains at least one odd number.
  let hasOdd = false;

  // Visit every number once, giving O(n) time complexity.
  for (const x of nums1) {
    // Update the minimum element found so far.
    if (x < min) min = x;

    // A set low bit means x is odd.
    if (x & 1) hasOdd = true;
  }

  // If there are no odd numbers, every original number is already even,
  // so nums2 can simply equal nums1.
  //
  // Otherwise, the only possible common parity is odd:
  // - odd numbers can be kept unchanged;
  // - every even number must subtract a smaller odd number,
  //   because even - odd = odd.
  //
  // Therefore, in a mixed-parity array, the global minimum must be odd.
  // That minimum odd number can be subtracted from every even number,
  // producing a positive odd result.
  //
  // If the minimum is even while an odd number exists, that minimum even
  // cannot be changed to odd because there is no smaller odd value.
  return !hasOdd || (min & 1) === 1;
}
