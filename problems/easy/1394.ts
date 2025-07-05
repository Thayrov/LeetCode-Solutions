/*
1394. Find Lucky Integer in an Array

Given an array of integers arr, a lucky integer is an integer that has a frequency in the array equal to its value.
Return the largest lucky integer in the array. If there is no lucky integer return -1.

Example 1:
Input: arr = [2,2,3,4]
Output: 2
Explanation: The only lucky number in the array is 2 because frequency[2] == 2.

Example 2:
Input: arr = [1,2,2,3,3,3]
Output: 3
Explanation: 1, 2 and 3 are all lucky numbers, return the largest of them.

Example 3:
Input: arr = [2,2,2,3,3]
Output: -1
Explanation: There are no lucky numbers in the array.

Constraints:
1 <= arr.length <= 500
1 <= arr[i] <= 500

</> Typescript code:
*/

function findLucky(arr: number[]): number {
  // Create frequency array with size 501 (0-500) to handle constraint 1 <= arr[i] <= 500
  // Using array instead of Map for O(1) access since we know the range
  const freq = new Array(501).fill(0);

  // Count frequency of each number in the input array
  // Time complexity: O(n) where n is length of arr
  for (let i = 0; i < arr.length; i++) {
    freq[arr[i]]++;
  }

  // Search for lucky numbers from largest to smallest (500 down to 1)
  // This ensures we return the largest lucky number immediately when found
  // Time complexity: O(500) = O(1) since range is fixed
  for (let i = 500; i >= 1; i--) {
    // Check if current number i is lucky: frequency[i] == i
    if (freq[i] === i) return i;
  }

  // No lucky number found, return -1 as specified
  return -1;
}
