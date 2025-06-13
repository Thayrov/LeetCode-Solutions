/*
2616. Minimize the Maximum Difference of Pairs

You are given a 0-indexed integer array nums and an integer p. Find p pairs of indices of nums such that the maximum difference amongst all the pairs is minimized. Also, ensure no index appears more than once amongst the p pairs.
Note that for a pair of elements at the index i and j, the difference of this pair is |nums[i] - nums[j]|, where |x| represents the absolute value of x.
Return the minimum maximum difference among all p pairs. We define the maximum of an empty set to be zero.

Example 1:
Input: nums = [10,1,2,7,1,3], p = 2
Output: 1
Explanation: The first pair is formed from the indices 1 and 4, and the second pair is formed from the indices 2 and 5. 
The maximum difference is max(|nums[1] - nums[4]|, |nums[2] - nums[5]|) = max(0, 1) = 1. Therefore, we return 1.

Example 2:
Input: nums = [4,2,1,2], p = 1
Output: 0
Explanation: Let the indices 1 and 3 form a pair. The difference of that pair is |2 - 2| = 0, which is the minimum we can attain.
 
Constraints:
1 <= nums.length <= 10^5
0 <= nums[i] <= 10^9
0 <= p <= (nums.length)/2

</> Typescript code:
*/

function minimizeMax(nums: number[], p: number): number {
  // If we don't need to form any pairs, the maximum difference is trivially 0.
  if (p === 0) {
    return 0;
  }

  // Sort the array in non-decreasing order. This is crucial because the smallest differences
  // will be between adjacent elements, making it easier to form pairs greedily.
  nums.sort((a, b) => a - b);

  // Initialize the binary search range. 'left' is the smallest possible max difference (0).
  let left = 0;
  // 'right' is the largest possible max difference, between the smallest and largest elements.
  let right = nums[nums.length - 1] - nums[0];
  // 'result' will store the minimum valid maximum difference found so far. Initialize to the max possible.
  let result = right;

  // Helper function to check if we can form at least 'p' pairs
  // given a maximum allowed difference 'maxDiff'.
  const canFormPairs = (maxDiff: number): boolean => {
    // 'count' keeps track of the number of valid pairs formed.
    let count = 0;
    // Iterate through the array to find pairs. We use a while loop style within a for loop
    // to control the index 'i' manually for skipping elements.
    for (let i = 0; i < nums.length - 1 && count < p; ) {
      // If the difference between two adjacent elements is within the allowed 'maxDiff'.
      if (nums[i + 1] - nums[i] <= maxDiff) {
        // We form a pair. Increment the pair count.
        count++;
        // Skip the next element since both elements of the pair have been used.
        i += 2;
      } else {
        // If the difference is too large, we can't form a pair with the current element 'nums[i]'.
        // We move to the next element to see if it can start a new pair.
        i++;
      }
    }
    // Return true if we were able to form at least 'p' pairs, false otherwise.
    return count >= p;
  };

  // Perform binary search on the answer (the maximum difference).
  while (left <= right) {
    // Calculate the middle of the current search range to test it.
    const mid = left + Math.floor((right - left) / 2);
    // Check if it's possible to form 'p' pairs with 'mid' as the maximum difference.
    if (canFormPairs(mid)) {
      // If yes, 'mid' is a potential answer. We store it.
      result = mid;
      // And try to find an even smaller maximum difference in the left half of the range.
      right = mid - 1;
    } else {
      // If no, 'mid' is too small. We need to allow a larger difference.
      // So we search in the right half of the range.
      left = mid + 1;
    }
  }

  // After the binary search, 'result' holds the minimum possible maximum difference.
  return result;
}
