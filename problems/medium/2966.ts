/*
2966. Divide Array Into Arrays With Max Difference

You are given an integer array nums of size n where n is a multiple of 3 and a positive integer k.
Divide the array nums into n / 3 arrays of size 3 satisfying the following condition:
The difference between any two elements in one array is less than or equal to k.
Return a 2D array containing the arrays. If it is impossible to satisfy the conditions, return an empty array. And if there are multiple answers, return any of them.

Example 1:
Input: nums = [1,3,4,8,7,9,3,5,1], k = 2
Output: [[1,1,3],[3,4,5],[7,8,9]]
Explanation:
The difference between any two elements in each array is less than or equal to 2.

Example 2:
Input: nums = [2,4,2,2,5,2], k = 2
Output: []
Explanation:
Different ways to divide nums into 2 arrays of size 3 are:
[[2,2,2],[2,4,5]] (and its permutations)
[[2,2,4],[2,2,5]] (and its permutations)
Because there are four 2s there will be an array with the elements 2 and 5 no matter how we divide it. since 5 - 2 = 3 > k, the condition is not satisfied and so there is no valid division.

Example 3:
Input: nums = [4,2,9,8,2,12,7,12,10,5,8,5,5,7,9,2,5,11], k = 14
Output: [[2,2,12],[4,8,5],[5,9,7],[7,8,5],[5,9,10],[11,12,2]]
Explanation:
The difference between any two elements in each array is less than or equal to 14.

Constraints:
n == nums.length
1 <= n <= 10^5
n is a multiple of 3
1 <= nums[i] <= 10^5
1 <= k <= 10^5

</> Typescript code:
*/

/**
 * Divides an array into subarrays of size 3 with a maximum difference constraint.
 * @param nums - The input array of numbers. Its length is a multiple of 3.
 * @param k - The maximum allowed difference between any two elements in a subarray.
 * @returns A 2D array of the subarrays, or an empty array if impossible.
 */
function divideArray(nums: number[], k: number): number[][] {
  // The most optimal approach is a greedy one. By sorting the array, we ensure that
  // for any potential group of three, the elements are as close to each other as possible.
  // This gives us the best chance to satisfy the condition `max - min <= k`.
  // The sort operation has a time complexity of O(n log n).
  nums.sort((a, b) => a - b);

  // Initialize the 2D array that will store the resulting groups of three.
  const result: number[][] = [];

  // We will iterate through the sorted array, taking elements three at a time.
  // The loop increments by 3 to process each chunk that will form a new subarray.
  // This loop runs n/3 times, resulting in a time complexity of O(n).
  for (let i = 0; i < nums.length; i += 3) {
    // For each chunk of three `[nums[i], nums[i+1], nums[i+2]]`, because the
    // array is sorted, the minimum element is `nums[i]` and the maximum is `nums[i+2]`.
    // We only need to check the difference between these two.
    // If `nums[i+2] - nums[i] > k`, then it's impossible to form a valid group
    // with these three elements.
    if (nums[i + 2] - nums[i] > k) {
      // If even the three smallest available numbers can't form a valid group,
      // then no other combination involving `nums[i]` would work either, because
      // any other element would be even larger than `nums[i+2]`.
      // Therefore, no solution is possible, and we return an empty array.
      return [];
    }

    // If the condition is met, this chunk is a valid group.
    // We create a new array for this group and push it to our result array.
    result.push([nums[i], nums[i + 1], nums[i + 2]]);
  }

  // If the loop completes without returning early, it means all elements have been
  // successfully divided into valid groups. We return the final 2D array.
  // The total time complexity is dominated by the sort: O(n log n).
  // The space complexity is O(n) to store the result array (or O(log n) to O(n)
  // depending on the sort algorithm's implementation details).
  return result;
}
