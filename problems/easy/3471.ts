/*
3471. Find the Largest Almost Missing Integer

You are given an integer array nums and an integer k.
An integer x is almost missing from nums if x appears in exactly one subarray of size k within nums.
Return the largest almost missing integer from nums. If no such integer exists, return -1.
A subarray is a contiguous sequence of elements within an array.
 
Example 1:
Input: nums = [3,9,2,1,7], k = 3
Output: 7
Explanation:
1 appears in 2 subarrays of size 3: [9, 2, 1] and [2, 1, 7].
2 appears in 3 subarrays of size 3: [3, 9, 2], [9, 2, 1], [2, 1, 7].
3 appears in 1 subarray of size 3: [3, 9, 2].
7 appears in 1 subarray of size 3: [2, 1, 7].
9 appears in 2 subarrays of size 3: [3, 9, 2], and [9, 2, 1].
We return 7 since it is the largest integer that appears in exactly one subarray of size k.

Example 2:
Input: nums = [3,9,7,2,1,7], k = 4
Output: 3
Explanation:
1 appears in 2 subarrays of size 4: [9, 7, 2, 1], [7, 2, 1, 7].
2 appears in 3 subarrays of size 4: [3, 9, 7, 2], [9, 7, 2, 1], [7, 2, 1, 7].
3 appears in 1 subarray of size 4: [3, 9, 7, 2].
7 appears in 3 subarrays of size 4: [3, 9, 7, 2], [9, 7, 2, 1], [7, 2, 1, 7].
9 appears in 2 subarrays of size 4: [3, 9, 7, 2], [9, 7, 2, 1].
We return 3 since it is the largest and only integer that appears in exactly one subarray of size k.

Example 3:
Input: nums = [0,0], k = 1
Output: -1
Explanation:
There is no integer that appears in only one subarray of size 1.

Constraints:
1 <= nums.length <= 50
0 <= nums[i] <= 50
1 <= k <= nums.length

</> Typescript code:
*/

function largestInteger(nums: number[], k: number): number {
  // Store the array length to avoid repeatedly accessing nums.length.
  const n = nums.length;

  // If k equals n, there is only one subarray of size k: the entire array.
  // Therefore every distinct value appears in exactly that one subarray,
  // so the largest value in nums is the answer.
  if (k === n) return Math.max(...nums);

  // nums[i] is guaranteed to be between 0 and 50, so a fixed-size typed
  // array is faster and smaller than a Map for counting occurrences.
  const freq = new Int8Array(51);

  // Count the total occurrences of every value.
  for (const num of nums) freq[num]++;

  // When k is 1, every index forms its own subarray.
  // A number therefore appears in exactly one subarray iff it occurs
  // exactly once in the entire array.
  if (k === 1) {
    // Start with -1 for the case where no valid value exists.
    let ans = -1;

    // Inspect every value in nums.
    for (const num of nums) {
      // Keep the largest value whose total frequency is exactly one.
      if (freq[num] === 1 && num > ans) ans = num;
    }

    // Return the largest unique value, or -1 if there is none.
    return ans;
  }

  // For 1 < k < n, every interior position belongs to at least two
  // subarrays of size k. Only index 0 belongs exclusively to the first
  // window, and index n - 1 belongs exclusively to the last window.
  // Thus only the two endpoint values can possibly be almost missing.
  let ans = -1;

  // The first endpoint is valid only if its value occurs nowhere else.
  if (freq[nums[0]] === 1) ans = nums[0];

  // The last endpoint is valid only if its value occurs nowhere else.
  // Compare it with the first endpoint candidate to retain the largest.
  if (freq[nums[n - 1]] === 1) ans = Math.max(ans, nums[n - 1]);

  // Return the largest valid endpoint, or -1 when neither qualifies.
  return ans;
}
