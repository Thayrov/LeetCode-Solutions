/*
3637. Trionic Array I

You are given an integer array nums of length n.
An array is trionic if there exist indices 0 < p < q < n − 1 such that:
nums[0...p] is strictly increasing,
nums[p...q] is strictly decreasing,
nums[q...n − 1] is strictly increasing.
Return true if nums is trionic, otherwise return false.

Example 1:
Input: nums = [1,3,5,4,2,6]
Output: true
Explanation:
Pick p = 2, q = 4:
nums[0...2] = [1, 3, 5] is strictly increasing (1 < 3 < 5).
nums[2...4] = [5, 4, 2] is strictly decreasing (5 > 4 > 2).
nums[4...5] = [2, 6] is strictly increasing (2 < 6).

Example 2:
Input: nums = [2,1,3]
Output: false
Explanation:
There is no way to pick p and q to form the required three segments.

Constraints:
3 <= n <= 100
-1000 <= nums[i] <= 1000

</> Typescript code:
*/

function isTrionic(nums: number[]): boolean {
  // Store array length to avoid repeated property access and enable boundary checks
  const n = nums.length;
  // Early termination: trionic array requires at least 4 elements
  // (minimum structure: [inc_start, peak, valley, inc_end])
  if (n < 4) return false;
  // Initialize pointer to traverse array, start at 1 to compare with previous element
  let i = 1;
  // Phase 1: Traverse strictly increasing segment from index 0 to p
  // Continue while current element is greater than previous (strictly increasing)
  while (i < n && nums[i] > nums[i - 1]) i++;
  // Validation: need at least 2 elements in first segment (i >= 2 means indices 0,1 both processed)
  // Must not have reached array end (need room for decrease and final increase)
  // Current element must be less than previous (confirms we found a peak at i-1, not flat/equal)
  if (i < 2 || i >= n || nums[i] >= nums[i - 1]) return false;
  // Store the start index of decreasing phase (p+1, where p = i-1 is the peak index)
  const startDecrease = i;
  // Phase 2: Traverse strictly decreasing segment from p to q
  // Continue while current element is less than previous (strictly decreasing)
  while (i < n && nums[i] < nums[i - 1]) i++;
  // Validation: must have moved at least 1 step in decrease (ensures segment [p,q] has >= 2 elements)
  // Must not have reached array end (need room for final increasing segment)
  // Current element must be greater than previous (confirms we found a valley at i-1, not flat/equal)
  if (i < startDecrease + 1 || i >= n || nums[i] <= nums[i - 1]) return false;
  // Phase 3: Traverse final strictly increasing segment from q to end
  // Continue while current element is greater than previous (strictly increasing)
  while (i < n && nums[i] > nums[i - 1]) i++;
  // Return true only if we consumed entire array (final segment extends to n-1)
  // This ensures the third segment has at least 2 elements (q and n-1, with q <= n-2)
  return i === n;
}
