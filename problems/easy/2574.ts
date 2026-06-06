/*
2574. Left and Right Sum Differences

Hint
You are given a 0-indexed integer array nums of size n.
Define two arrays leftSum and rightSum where:
leftSum[i] is the sum of elements to the left of the index i in the array nums. If there is no such element, leftSum[i] = 0.
rightSum[i] is the sum of elements to the right of the index i in the array nums. If there is no such element, rightSum[i] = 0.
Return an integer array answer of size n where answer[i] = |leftSum[i] - rightSum[i]|.

Example 1:
Input: nums = [10,4,8,3]
Output: [15,1,11,22]
Explanation: The array leftSum is [0,10,14,22] and the array rightSum is [15,11,3,0].
The array answer is [|0 - 15|,|10 - 11|,|14 - 3|,|22 - 0|] = [15,1,11,22].

Example 2:
Input: nums = [1]
Output: [0]
Explanation: The array leftSum is [0] and the array rightSum is [0].
The array answer is [|0 - 0|] = [0].

Constraints:
1 <= nums.length <= 1000
1 <= nums[i] <= 10^5

</> Typescript code:
*/

function leftRightDifference(nums: number[]): number[] {
  // Stores the sum of all elements that are currently to the right of index i.
  let right = 0;

  // Computes the total sum first, so before each index we can subtract nums[i].
  for (const num of nums) right += num;

  // Stores the sum of all elements to the left of index i.
  let left = 0;

  // Iterates through every index to compute its absolute left/right sum difference.
  for (let i = 0; i < nums.length; i++) {
    // Removes current value from right sum, leaving only elements after i.
    right -= nums[i];

    // Saves original current value before overwriting nums[i].
    const current = nums[i];

    // Reuses nums as answer array with |leftSum[i] - rightSum[i]|.
    nums[i] = Math.abs(left - right);

    // Adds original current value to left sum for the next index.
    left += current;
  }

  // Returns the modified nums array as the answer.
  return nums;
}
