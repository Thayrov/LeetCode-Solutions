/*
3634. Minimum Removals to Balance Array

You are given an integer array nums and an integer k.
An array is considered balanced if the value of its maximum element is at most k times the minimum element.
You may remove any number of elements from nums​​​​​​​ without making it empty.
Return the minimum number of elements to remove so that the remaining array is balanced.

Note: An array of size 1 is considered balanced as its maximum and minimum are equal, and the condition always holds true.

Example 1:
Input: nums = [2,1,5], k = 2
Output: 1
Explanation:
Remove nums[2] = 5 to get nums = [2, 1].
Now max = 2, min = 1 and max <= min * k as 2 <= 1 * 2. Thus, the answer is 1.

Example 2:
Input: nums = [1,6,2,9], k = 3
Output: 2
Explanation:
Remove nums[0] = 1 and nums[3] = 9 to get nums = [6, 2].
Now max = 6, min = 2 and max <= min * k as 6 <= 2 * 3. Thus, the answer is 2.

Example 3:
Input: nums = [4,6], k = 2
Output: 0
Explanation:
Since nums is already balanced as 6 <= 4 * 2, no elements need to be removed.

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^9
1 <= k <= 10^5

</> Typescript code:
*/

function minRemoval(nums: number[], k: number): number {
  // Sort array ascending so we can use two-pointer technique
  // After sorting, any subarray [i..j] has min=nums[i] and max=nums[j]
  nums.sort((a, b) => a - b);

  // n: array length for boundary checks and result calculation
  // j: right pointer that only moves forward (monotonic)
  // maxKeep: tracks maximum elements we can keep in any valid window
  let n = nums.length,
    j = 0,
    maxKeep = 0;

  // i: left pointer, represents the minimum element of current window
  for (let i = 0; i < n; i++) {
    // Expand right pointer while elements satisfy balance condition
    // Window [i, j-1] is valid when nums[j-1] <= nums[i] * k
    // Since array is sorted, if nums[j] satisfies condition, all in [i,j] do
    while (j < n && nums[j] <= nums[i] * k) j++;

    // Window size is j - i (elements from i to j-1 inclusive)
    // Update maxKeep if current window is larger
    maxKeep = Math.max(maxKeep, j - i);
  }

  // Minimum removals = total elements - maximum elements we can keep
  // This gives the minimum elements to remove for balanced array
  return n - maxKeep;
}
