/* 
2593. Find Score of an Array After Marking All Elements

You are given an array nums consisting of positive integers.

Starting with score = 0, apply the following algorithm:

Choose the smallest integer of the array that is not marked. If there is a tie, choose the one with the smallest index.
Add the value of the chosen integer to score.
Mark the chosen element and its two adjacent elements if they exist.
Repeat until all the array elements are marked.
Return the score you get after applying the above algorithm.

Example 1:
Input: nums = [2,1,3,4,5,2]
Output: 7
Explanation: We mark the elements as follows:
- 1 is the smallest unmarked element, so we mark it and its two adjacent elements: [2,1,3,4,5,2].
- 2 is the smallest unmarked element, so we mark it and its left adjacent element: [2,1,3,4,5,2].
- 4 is the only remaining unmarked element, so we mark it: [2,1,3,4,5,2].
Our score is 1 + 2 + 4 = 7.

Example 2:
Input: nums = [2,3,5,1,3,2]
Output: 5
Explanation: We mark the elements as follows:
- 1 is the smallest unmarked element, so we mark it and its two adjacent elements: [2,3,5,1,3,2].
- 2 is the smallest unmarked element, since there are two of them, we choose the left-most one, so we mark the one at index 0 and its right adjacent element: [2,3,5,1,3,2].
- 2 is the only remaining unmarked element, so we mark it: [2,3,5,1,3,2].
Our score is 1 + 2 + 2 = 5.

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^6

</> Typescript Code:
*/

function findScore(nums: number[]): number {
  // Get the length of the array
  const n = nums.length;
  // Create pairs of [value, index]
  const indexValuePairs = nums.map((val, idx) => [val, idx] as [number, number]);
  // Sort the pairs by value, then by index
  indexValuePairs.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  // Initialize a marked array to track marked elements
  const marked = new Array(n).fill(false);
  // Initialize the score
  let score = 0;
  // Iterate through the sorted pairs
  for (const [val, idx] of indexValuePairs) {
    // If the current index is not marked
    if (!marked[idx]) {
      // Add the value to the score
      score += val;
      // Mark the current element
      marked[idx] = true;
      // Mark the left adjacent element if it exists
      if (idx > 0) marked[idx - 1] = true;
      // Mark the right adjacent element if it exists
      if (idx < n - 1) marked[idx + 1] = true;
    }
  }
  // Return the final score
  return score;
}
