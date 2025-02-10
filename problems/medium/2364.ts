/* 
2364. Count Number of Bad Pairs

You are given a 0-indexed integer array nums. A pair of indices (i, j) is a bad pair if i < j and j - i != nums[j] - nums[i].

Return the total number of bad pairs in nums.

Example 1:
Input: nums = [4,1,3,3]
Output: 5
Explanation: The pair (0, 1) is a bad pair since 1 - 0 != 1 - 4.
The pair (0, 2) is a bad pair since 2 - 0 != 3 - 4, 2 != -1.
The pair (0, 3) is a bad pair since 3 - 0 != 3 - 4, 3 != -1.
The pair (1, 2) is a bad pair since 2 - 1 != 3 - 1, 1 != 2.
The pair (2, 3) is a bad pair since 3 - 2 != 3 - 3, 1 != 0.
There are a total of 5 bad pairs, so we return 5.

Example 2:
Input: nums = [1,2,3,4,5]
Output: 0
Explanation: There are no bad pairs.

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^9

</> Typescript code:
*/

// Function to count the number of bad pairs in the array 'nums'
function countBadPairs(nums: number[]): number {
  // Determine the number of elements in the array
  const n = nums.length;
  // Create a map to record the frequency of each computed difference (nums[i] - i)
  let freq = new Map<number, number>();

  // Iterate over each index in the array to populate the frequency map
  for (let i = 0; i < n; i++) {
      // Compute the difference for the current index, which transforms the pair condition
      const key = nums[i] - i;
      // Update the frequency map: if key exists, increment its value; otherwise, initialize to 1
      freq.set(key, (freq.get(key) || 0) + 1);
  }

  // Variable to accumulate the count of "good" pairs (where j - i equals nums[j] - nums[i])
  let goodPairs = 0;
  // Iterate over the frequency map values to count pairs with identical differences
  for (const count of freq.values()) {
      // For each group of indices with the same difference, add the number of possible pairs
      goodPairs += count * (count - 1) / 2;
  }

  // Calculate the total number of pairs in the array (n choose 2)
  const totalPairs = n * (n - 1) / 2;
  // Return the number of bad pairs by subtracting good pairs from the total pair count
  return totalPairs - goodPairs;
}