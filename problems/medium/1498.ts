/*
1498. Number of Subsequences That Satisfy the Given Sum Condition

You are given an array of integers nums and an integer target.
Return the number of non-empty subsequences of nums such that the sum of the minimum and maximum element on it is less or equal to target. Since the answer may be too large, return it modulo 109 + 7.

Example 1:
Input: nums = [3,5,6,7], target = 9
Output: 4
Explanation: There are 4 subsequences that satisfy the condition.
[3] -> Min value + max value <= target (3 + 3 <= 9)
[3,5] -> (3 + 5 <= 9)
[3,5,6] -> (3 + 6 <= 9)
[3,6] -> (3 + 6 <= 9)

Example 2:
Input: nums = [3,3,6,8], target = 10
Output: 6
Explanation: There are 6 subsequences that satisfy the condition. (nums can have repeated numbers).
[3] , [3] , [3,3], [3,6] , [3,6] , [3,3,6]

Example 3:
Input: nums = [2,3,3,4,6,7], target = 12
Output: 61
Explanation: There are 63 non-empty subsequences, two of them do not satisfy the condition ([6,7], [7]).
Number of valid subsequences (63 - 2 = 61).
 
Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^6
1 <= target <= 10^6

</> Typescript code:
*/

function numSubseq(nums: number[], target: number): number {
  // Define the modulus for the final result as specified in the problem.
  const MOD = 1_000_000_007;

  // Sort the input array in non-decreasing order. This is crucial for the two-pointer approach.
  // By sorting, we can easily find the minimum (nums[left]) and manage the maximum elements.
  nums.sort((a, b) => a - b);

  // Get the length of the array.
  const n = nums.length;

  // Precompute the powers of 2 modulo MOD.
  // pows[i] will store (2^i) % MOD.
  // This is needed because if we fix a minimum element nums[left], and find a
  // maximum possible index `right`, any element between `left` and `right` can either
  // be in a subsequence or not, giving 2^(right-left) possibilities.
  const pows = new Array(n).fill(1);
  for (let i = 1; i < n; i++) {
    // Calculate the next power of 2 based on the previous one to be efficient.
    pows[i] = (pows[i - 1] * 2) % MOD;
  }

  // Initialize the total count of valid subsequences.
  let count = 0;
  // Initialize the left pointer to the start of the array.
  let left = 0;
  // Initialize the right pointer to the end of the array.
  let right = n - 1;

  // The loop continues as long as the left pointer is not past the right pointer.
  while (left <= right) {
    // Check if the sum of the minimum possible element (nums[left]) and the maximum
    // possible element (nums[right]) exceeds the target.
    if (nums[left] + nums[right] > target) {
      // If the sum is too large, it means nums[right] cannot be the maximum element
      // in any valid subsequence starting with nums[left]. We move to a smaller potential maximum.
      right--;
    } else {
      // If the sum is valid, then nums[left] can be our minimum.
      // The remaining elements of the subsequence can be any combination of the elements
      // from index `left + 1` to `right`.
      // There are `right - left` such elements.
      const diff = right - left;
      // The number of subsequences we can form is 2^diff. We add this to our count.
      // We use the precomputed powers array for this calculation.
      count = (count + pows[diff]) % MOD;
      // Since we have now counted all valid subsequences that have nums[left] as their
      // minimum element, we can move to the next element as a potential minimum.
      left++;
    }
  }

  // Return the total count of valid subsequences.
  return count;
}
