/*
1590. Make Sum Divisible by P

Given an array of positive integers nums, remove the smallest subarray (possibly empty) such that the sum of the remaining elements is divisible by p. It is not allowed to remove the whole array.

Return the length of the smallest subarray that you need to remove, or -1 if it's impossible.

A subarray is defined as a contiguous block of elements in the array.

Example 1:
Input: nums = [3,1,4,2], p = 6
Output: 1
Explanation: The sum of the elements in nums is 10, which is not divisible by 6. We can remove the subarray [4], and the sum of the remaining elements is 6, which is divisible by 6.

Example 2:
Input: nums = [6,3,5,2], p = 9
Output: 2
Explanation: We cannot remove a single element to get a sum divisible by 9. The best way is to remove the subarray [5,2], leaving us with [6,3] with sum 9.

Example 3:
Input: nums = [1,2,3], p = 3
Output: 0
Explanation: Here the sum is 6. which is already divisible by 3. Thus we do not need to remove anything.

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^9
1 <= p <= 10^9

</> Typescript Code:
*/

function minSubarray(nums: number[], p: number): number {
  // Calculate the total sum modulo p
  const totalSum = nums.reduce((acc, num) => (acc + num) % p, 0);
  const remainder = totalSum % p;

  // If the total sum is already divisible by p, return 0
  if (remainder === 0) return 0;

  // Map to store the earliest index of each modulo value
  const map = new Map<number, number>();

  // Variable to track the current cumulative sum modulo p
  let currentSum = 0;

  // Variable to store the minimum length of the subarray found
  let minLength = Infinity;

  // Initialize map to handle cases where the subarray starts from index 0
  map.set(0, -1);

  // Loop through the array
  for (let i = 0; i < nums.length; i++) {
    // Update the cumulative sum modulo p
    currentSum = (currentSum + nums[i]) % p;

    // Calculate the needed modulo to make the remaining sum divisible by p
    const neededMod = (currentSum - remainder + p) % p;

    // If the needed modulo is found in the map, update the minimum length
    if (map.has(neededMod)) {
      minLength = Math.min(minLength, i - map.get(neededMod)!);
    }

    // Update the map with the current modulo and index
    map.set(currentSum, i);
  }

  // If no valid subarray is found or the entire array needs to be removed, return -1
  return minLength === Infinity || minLength === nums.length ? -1 : minLength;
}
