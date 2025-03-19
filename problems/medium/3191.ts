/* 
3191. Minimum Operations to Make Binary Array Elements Equal to One I

You are given a binary array nums.

You can do the following operation on the array any number of times (possibly zero):

Choose any 3 consecutive elements from the array and flip all of them.
Flipping an element means changing its value from 0 to 1, and from 1 to 0.

Return the minimum number of operations required to make all elements in nums equal to 1. If it is impossible, return -1.

Example 1:
Input: nums = [0,1,1,1,0,0]
Output: 3
Explanation:
We can do the following operations:
Choose the elements at indices 0, 1 and 2. The resulting array is nums = [1,0,0,1,0,0].
Choose the elements at indices 1, 2 and 3. The resulting array is nums = [1,1,1,0,0,0].
Choose the elements at indices 3, 4 and 5. The resulting array is nums = [1,1,1,1,1,1].

Example 2:
Input: nums = [0,1,1,1]
Output: -1
Explanation:
It is impossible to make all elements equal to 1.

Constraints:
3 <= nums.length <= 10^5
0 <= nums[i] <= 1

</> Typescript code:
*/

function minOperations(nums: number[]): number {
  // Get the length of the array and set the window size for the flip operation.
  const n = nums.length,
    k = 3;
  // 'flips' will count the cumulative number of flip operations affecting the current index.
  // 'ans' will count the total number of operations performed.
  let flips = 0,
    ans = 0;
  // 'diff' is an auxiliary array to mark when a flip's effect should be removed.
  const diff = new Array(n).fill(0);
  // Loop through each index of the array.
  for (let i = 0; i < n; i++) {
    // If we have passed the first k elements, remove the effect of the flip operation
    // that started k positions ago.
    if (i >= k) flips -= diff[i - k];
    // Calculate the effective value at index i after all applied flips.
    // (nums[i] + flips) % 2 gives the current state (0 or 1) at index i.
    // If it equals 0, a flip is required to turn it into 1.
    if ((nums[i] + flips) % 2 === 0) {
      // If there aren't enough elements remaining to perform a flip, it's impossible.
      if (i > n - k) return -1;
      // A flip operation is performed; increment the answer and the current flip counter.
      ans++;
      flips++;
      // Mark the start of the flip in the diff array.
      diff[i] = 1;
    }
  }
  // Return the total number of flip operations required.
  return ans;
}
