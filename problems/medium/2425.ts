/* 
2425. Bitwise XOR of All Pairings

You are given two 0-indexed arrays, nums1 and nums2, consisting of non-negative integers. There exists another array, nums3, which contains the bitwise XOR of all pairings of integers between nums1 and nums2 (every integer in nums1 is paired with every integer in nums2 exactly once).

Return the bitwise XOR of all integers in nums3.

Example 1:
Input: nums1 = [2,1,3], nums2 = [10,2,5,0]
Output: 13
Explanation:
A possible nums3 array is [8,0,7,2,11,3,4,1,9,1,6,3].
The bitwise XOR of all these numbers is 13, so we return 13.

Example 2:
Input: nums1 = [1,2], nums2 = [3,4]
Output: 0
Explanation:
All possible pairs of bitwise XORs are nums1[0] ^ nums2[0], nums1[0] ^ nums2[1], nums1[1] ^ nums2[0],
and nums1[1] ^ nums2[1].
Thus, one possible nums3 array is [2,5,1,6].
2 ^ 5 ^ 1 ^ 6 = 0, so we return 0.

Constraints:
1 <= nums1.length, nums2.length <= 10^5
0 <= nums1[i], nums2[j] <= 10^9

</> Typescript Code:
*/

function xorAllNums(nums1: number[], nums2: number[]): number {
  // x1 will hold the XOR of all elements in nums1, x2 will hold the XOR of all elements in nums2
  let x1 = 0,
    x2 = 0;

  // Accumulate XOR of nums1 elements into x1
  for (let a of nums1) {
    x1 ^= a;
  }

  // Accumulate XOR of nums2 elements into x2
  for (let b of nums2) {
    x2 ^= b;
  }

  // ans will hold the final XOR of all pairings
  let ans = 0;

  // Include x1 in ans if nums2 has an odd number of elements
  if (nums2.length % 2 === 1) {
    ans ^= x1;
  }

  // Include x2 in ans if nums1 has an odd number of elements
  if (nums1.length % 2 === 1) {
    ans ^= x2;
  }

  // Return the XOR of all pairings
  return ans;
}
