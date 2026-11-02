/*
462. Minimum Moves to Equal Array Elements II

Given an integer array nums of size n, return the minimum number of moves required to make all array elements equal.

In one move, you can increment or decrement an element of the array by 1.

Test cases are designed so that the answer will fit in a 32-bit integer.

Example 1:
Input: nums = [1,2,3]
Output: 2
Explanation:
Only two moves are needed (remember each move increments or decrements one element):
[1,2,3]  =>  [2,2,3]  =>  [2,2,2]

Example 2:
Input: nums = [1,10,2,9]
Output: 16

Constraints:
n == nums.length
1 <= nums.length <= 10^5
-10^9 <= nums[i] <= 10^9

</> Typescript code:
*/

function minMoves2(nums: number[]): number {
  // Sort ascending so symmetric pairs straddle the median.
  nums.sort((a, b) => a - b);
  // Init left pointer at smallest element.
  let left = 0;
  // Init right pointer at largest element.
  let right = nums.length - 1;
  // Init moves accumulator.
  let moves = 0;
  // Pair outer elements until pointers meet.
  while (left < right) {
    // Add outer gap, equal to pair cost to median.
    moves += nums[right] - nums[left];
    // Shrink from the left.
    left++;
    // Shrink from the right.
    right--;
  }
  // Return minimal total moves.
  return moves;
}
