/*
2089. Find Target Indices After Sorting Array

You are given a 0-indexed integer array nums and a target element target.
A target index is an index i such that nums[i] == target.
Return a list of the target indices of nums after sorting nums in non-decreasing order. If there are no target indices, return an empty list. The returned list must be sorted in increasing order.

Example 1:
Input: nums = [1,2,5,2,3], target = 2
Output: [1,2]
Explanation:
After sorting, nums is [1,2,2,3,5].
The indices where nums[i] == 2 are 1 and 2.

Example 2:
Input: nums = [1,2,5,2,3], target = 3
Output: [3]
Explanation:
After sorting, nums is [1,2,2,3,5].
The index where nums[i] == 3 is 3.

Example 3:
Input: nums = [1,2,5,2,3], target = 5
Output: [4]
Explanation:
After sorting, nums is [1,2,2,3,5].
The index where nums[i] == 5 is 4.

Constraints:
1 <= nums.length <= 100
1 <= nums[i], target <= 100

</> Typescript code:
*/

function targetIndices(nums: number[], target: number): number[] {
  // Count elements strictly below target and equal to target.
  let less = 0, equal = 0;
  // Single pass over the input to tally both counters.
  for (let i = 0; i < nums.length; i++) {
    // Below target shifts the start index of the answer range.
    if (nums[i] < target) less++;
    // Equal to target extends the answer range length.
    else if (nums[i] === target) equal++;
  }
  // Pre-size the result to the exact number of target occurrences.
  const res: number[] = new Array(equal);
  // Fill consecutive sorted indices starting at the lower-bound offset.
  for (let i = 0; i < equal; i++) res[i] = less + i;
  // Return empty array naturally when the target is absent.
  return res;
}
