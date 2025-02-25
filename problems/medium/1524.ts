/* 
1524. Number of Sub-arrays With Odd Sum

Given an array of integers arr, return the number of subarrays with an odd sum.

Since the answer can be very large, return it modulo 109 + 7.

Example 1:
Input: arr = [1,3,5]
Output: 4
Explanation: All subarrays are [[1],[1,3],[1,3,5],[3],[3,5],[5]]
All sub-arrays sum are [1,4,9,3,8,5].
Odd sums are [1,9,3,5] so the answer is 4.

Example 2:
Input: arr = [2,4,6]
Output: 0
Explanation: All subarrays are [[2],[2,4],[2,4,6],[4],[4,6],[6]]
All sub-arrays sum are [2,6,12,4,10,6].
All sub-arrays have even sum and the answer is 0.

Example 3:
Input: arr = [1,2,3,4,5,6,7]
Output: 16

Constraints:
1 <= arr.length <= 10^5
1 <= arr[i] <= 100

</> Typescript Code:
*/

function numOfSubarrays(arr: number[]): number {
  // Define modulo constant as required by the problem to handle large numbers.
  const mod = 1000000007;
  // Initialize count for prefix sums with even parity. Start with 1 for an empty prefix.
  let even = 1;
  // Initialize count for prefix sums with odd parity.
  let odd = 0;
  // This variable accumulates the total number of subarrays with an odd sum.
  let res = 0;
  // This variable holds the current cumulative prefix sum modulo 2.
  let prefix = 0;
  // Iterate through each number in the input array.
  for (const num of arr) {
    // Update the prefix sum modulo 2.
    prefix = (prefix + num) % 2;
    // If the prefix sum is even, then an odd subarray sum is formed by pairing with all previous odd prefixes.
    if (prefix === 0) {
      res = (res + odd) % mod;
      // Increment the count of even prefix sums.
      even++;
    } else {
      // If the prefix sum is odd, then an odd subarray sum is formed by pairing with all previous even prefixes.
      res = (res + even) % mod;
      // Increment the count of odd prefix sums.
      odd++;
    }
  }
  // Return the total count modulo mod.
  return res;
}
