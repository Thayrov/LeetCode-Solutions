/*
1855. Maximum Distance Between a Pair of Values

Hint
You are given two non-increasing 0-indexed integer arrays nums1​​​​​​ and nums2​​​​​​.
A pair of indices (i, j), where 0 <= i < nums1.length and 0 <= j < nums2.length, is valid if both i <= j and nums1[i] <= nums2[j]. The distance of the pair is j - i​​​​.
Return the maximum distance of any valid pair (i, j). If there are no valid pairs, return 0.
An array arr is non-increasing if arr[i-1] >= arr[i] for every 1 <= i < arr.length.

Example 1:
Input: nums1 = [55,30,5,4,2], nums2 = [100,20,10,10,5]
Output: 2
Explanation: The valid pairs are (0,0), (2,2), (2,3), (2,4), (3,3), (3,4), and (4,4).
The maximum distance is 2 with pair (2,4).

Example 2:
Input: nums1 = [2,2,2], nums2 = [10,10,1]
Output: 1
Explanation: The valid pairs are (0,0), (0,1), and (1,1).
The maximum distance is 1 with pair (0,1).

Example 3:
Input: nums1 = [30,29,19,5], nums2 = [25,25,25,25,25]
Output: 2
Explanation: The valid pairs are (2,2), (2,3), (2,4), (3,3), and (3,4).
The maximum distance is 2 with pair (2,4).

Constraints:
1 <= nums1.length, nums2.length <= 10^5
1 <= nums1[i], nums2[j] <= 10^5
Both nums1 and nums2 are non-increasing.

</> Typescript code:
*/

function maxDistance(nums1: number[], nums2: number[]): number {
  // Initialize the result variable to store the maximum distance found
  let maxDist = 0;
  // Pointer 'i' for nums1 and 'j' for nums2
  let i = 0;
  let j = 0;
  // Cache lengths to avoid repeated property access in the loop
  const n1 = nums1.length;
  const n2 = nums2.length;

  // Iterate until one of the pointers goes out of bounds
  while (i < n1 && j < n2) {
    // If the current pair is valid (nums1[i] <= nums2[j])
    if (nums1[i] <= nums2[j]) {
      // Update maxDist if current j - i is larger
      if (j - i > maxDist) maxDist = j - i;
      // Increment j to see if a further index in nums2 is also valid
      j++;
    } else {
      // If invalid, nums1[i] is too large.
      // Increment i to find a smaller value in the non-increasing array
      i++;
    }
  }

  // Return the calculated maximum distance
  return maxDist;
}
