/*
1674. Minimum Moves to Make Array Complementary

Hint
You are given an integer array nums of even length n and an integer limit. In one move, you can replace any integer from nums with another integer between 1 and limit, inclusive.
The array nums is complementary if for all indices i (0-indexed), nums[i] + nums[n - 1 - i] equals the same number. For example, the array [1,2,3,4] is complementary because for all indices i, nums[i] + nums[n - 1 - i] = 5.
Return the minimum number of moves required to make nums complementary.

Example 1:
Input: nums = [1,2,4,3], limit = 4
Output: 1
Explanation: In 1 move, you can change nums to [1,2,2,3] (underlined elements are changed).
nums[0] + nums[3] = 1 + 3 = 4.
nums[1] + nums[2] = 2 + 2 = 4.
nums[2] + nums[1] = 2 + 2 = 4.
nums[3] + nums[0] = 3 + 1 = 4.
Therefore, nums[i] + nums[n-1-i] = 4 for every i, so nums is complementary.

Example 2:
Input: nums = [1,2,2,1], limit = 2
Output: 2
Explanation: In 2 moves, you can change nums to [2,2,2,2]. You cannot change any number to 3 since 3 > limit.

Example 3:
Input: nums = [1,2,1,2], limit = 2
Output: 0
Explanation: nums is already complementary.

Constraints:
n == nums.length
2 <= n <= 10^5
1 <= nums[i] <= limit <= 10^5
n is even.

</> Typescript code:
*/

function minMoves(nums: number[], limit: number): number {
  // Creates a difference array for all possible target sums from 2 to 2 * limit.
  const diff = new Int32Array(limit * 2 + 2);

  // Stores nums length to avoid repeated property access.
  const n = nums.length;

  // Processes mirrored pairs only.
  for (let l = 0, r = n - 1; l < r; l++, r--) {
    // Reads both values in the current mirrored pair.
    const a = nums[l],
      b = nums[r];

    // Smallest target sum reachable with one move for this pair.
    const low = Math.min(a, b) + 1;

    // Largest target sum reachable with one move for this pair.
    const high = Math.max(a, b) + limit;

    // Current pair sum, requiring zero moves.
    const sum = a + b;

    // By default, this pair needs two moves for every target sum.
    diff[2] += 2;

    // From low onward, this pair needs one fewer move.
    diff[low] -= 1;

    // At exact current sum, this pair needs one fewer move again, becoming zero moves.
    diff[sum] -= 1;

    // After current sum, zero-move benefit ends.
    diff[sum + 1] += 1;

    // After high, one-move range ends, returning to two moves.
    diff[high + 1] += 1;
  }

  // Initializes answer with the maximum possible moves.
  let ans = n;

  // Running prefix sum of moves for each target sum.
  let moves = 0;

  // Checks every valid complementary target sum.
  for (let s = 2; s <= limit * 2; s++) {
    // Applies difference updates for this target sum.
    moves += diff[s];

    // Keeps the minimum moves found.
    if (moves < ans) ans = moves;
  }

  // Returns the minimum required moves.
  return ans;
}
