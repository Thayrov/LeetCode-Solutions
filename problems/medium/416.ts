/* 
416. Partition Equal Subset Sum

Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.

Example 1:
Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].

Example 2:
Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.

Constraints:
1 <= nums.length <= 200
1 <= nums[i] <= 100

</> Typescript code:
*/

function canPartition(nums: number[]): boolean {
  // Calculate the total sum of all numbers in the array
  const total = nums.reduce((sum, num) => sum + num, 0);

  // If the total sum is odd, it cannot be partitioned into two equal subsets
  if (total % 2 !== 0) return false;

  // Calculate the target sum for each subset (half of the total)
  const target = total / 2;

  // Initialize a set to track achievable sums, starting with 0
  const dp = new Set<number>([0]);

  // Process each number in the input array
  for (const num of nums) {
    // Create a new set to hold the next iteration's achievable sums
    const nextDP = new Set<number>(dp);

    // For each currently achievable sum, try adding the current number
    for (const sum of dp) {
      // Calculate the new sum by adding the current number
      const newSum = sum + num;

      // If we found a subset that sums to target, return true immediately
      if (newSum === target) return true;

      // Only keep tracking sums that are less than the target
      if (newSum < target) nextDP.add(newSum);
    }

    // Clear the original set to save memory
    dp.clear();

    // Update the original set with new values for the next iteration
    for (const sum of nextDP) dp.add(sum);
  }

  // Return whether the target sum is achievable
  return dp.has(target);
}
