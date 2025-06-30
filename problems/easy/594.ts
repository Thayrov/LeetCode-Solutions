/*
594. Longest Harmonious Subsequence

We define a harmonious array as an array where the difference between its maximum value and its minimum value is exactly 1.
Given an integer array nums, return the length of its longest harmonious subsequence among all its possible subsequences.

Example 1:
Input: nums = [1,3,2,2,5,2,3,7]
Output: 5
Explanation:
The longest harmonious subsequence is [3,2,2,2,3].

Example 2:
Input: nums = [1,2,3,4]
Output: 2
Explanation:
The longest harmonious subsequences are [1,2], [2,3], and [3,4], all of which have a length of 2.

Example 3:
Input: nums = [1,1,1,1]
Output: 0
Explanation:
No harmonic subsequence exists.

Constraints:
1 <= nums.length <= 2 * 10^4
-10^9 <= nums[i] <= 10^9

</> Typescript code:
*/

/**
 * Finds the length of the longest harmonious subsequence.
 * A harmonious subsequence is one where the difference between the maximum and minimum values is exactly 1.
 * @param nums An array of integers.
 * @returns The length of the longest harmonious subsequence.
 */
function findLHS(nums: number[]): number {
  // Create a Map to store the frequency of each number in the input array.
  // The key will be the number, and the value will be its count.
  const freqMap = new Map<number, number>();

  // Iterate through each number in the input array 'nums' to populate the frequency map.
  // This loop has a time complexity of O(n), where n is the number of elements in nums.
  for (const num of nums) {
    // For each number, get its current count from the map (or 0 if it doesn't exist yet).
    // Then, increment the count by 1 and update the map.
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  // Initialize a variable to keep track of the maximum length found so far.
  // We start at 0 because if no harmonious subsequence is found, this will be the return value.
  let longestSubsequence = 0;

  // Iterate through each entry (key-value pair) in the frequency map.
  // This loop runs 'k' times, where 'k' is the number of unique elements in 'nums'.
  // In the worst case, k = n, so the complexity is O(n).
  for (const [num, count] of freqMap.entries()) {
    // For the current number 'num', check if a number that is exactly 1 greater ('num + 1')
    // also exists as a key in our frequency map. This is the condition for a harmonious pair.
    if (freqMap.has(num + 1)) {
      // If the harmonious counterpart exists, calculate the length of this subsequence.
      // The length is the sum of the frequency of the current number 'num' and its counterpart 'num + 1'.
      // The '!' (non-null assertion operator) tells TypeScript that we are certain freqMap.get(num + 1) will not be undefined,
      // because we just checked for its existence with .has().
      const currentLength = count + freqMap.get(num + 1)!;

      // Compare the length of the current harmonious subsequence with the longest one found so far.
      // If the current one is longer, update 'longestSubsequence'.
      longestSubsequence = Math.max(longestSubsequence, currentLength);
    }
  }

  // After checking all numbers in the map, 'longestSubsequence' will hold the length of the
  // longest harmonious subsequence found. Return this value.
  return longestSubsequence;
}
