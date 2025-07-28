/*
2044. Count Number of Maximum Bitwise-OR Subsets

Given an integer array nums, find the maximum possible bitwise OR of a subset of nums and return the number of different non-empty subsets with the maximum bitwise OR.

An array a is a subset of an array b if a can be obtained from b by deleting some (possibly zero) elements of b. Two subsets are considered different if the indices of the elements chosen are different.

The bitwise OR of an array a is equal to a[0] OR a[1] OR ... OR a[a.length - 1] (0-indexed).

Example 1:
Input: nums = [3,1]
Output: 2
Explanation: The maximum possible bitwise OR of a subset is 3. There are 2 subsets with a bitwise OR of 3:
- [3]
- [3,1]

Example 2:
Input: nums = [2,2,2]
Output: 7
Explanation: All non-empty subsets of [2,2,2] have a bitwise OR of 2. There are 23 - 1 = 7 total subsets.

Example 3:
Input: nums = [3,2,1,5]
Output: 6
Explanation: The maximum possible bitwise OR of a subset is 7. There are 6 subsets with a bitwise OR of 7:
- [3,5]
- [3,1,5]
- [3,2,5]
- [3,2,1,5]
- [2,5]
- [2,1,5]

Constraints:
1 <= nums.length <= 16
1 <= nums[i] <= 10^5

</> Typescript Code:
*/

function countMaxOrSubsets(nums: number[]): number {
  // Initialize the maximum possible OR value
  let max_or = 0;
  for (let num of nums) {
    max_or |= num; // Compute the bitwise OR of all elements
  }

  // Initialize a map to store counts of subsets resulting in a particular OR value
  let dp = new Map<number, number>();
  dp.set(0, 1); // Start with an empty subset having OR value 0

  // Iterate over each number in the input array
  for (let num of nums) {
    let new_dp = new Map(dp); // Create a copy of the current dp map
    // For each existing OR value in dp
    for (let [or_val, count] of dp.entries()) {
      let new_or = or_val | num; // Compute new OR value by including num
      // Update the count for the new OR value
      new_dp.set(new_or, (new_dp.get(new_or) || 0) + count);
    }
    dp = new_dp; // Update dp with new_dp for the next iteration
  }

  // Return the count of subsets that result in the maximum OR value
  return dp.get(max_or) || 0;
}
