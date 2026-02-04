/*
3640. Trionic Array II

You are given an integer array nums of length n.
A trionic subarray is a contiguous subarray nums[l...r] (with 0 <= l < r < n) for which there exist indices l < p < q < r such that:
nums[l...p] is strictly increasing,
nums[p...q] is strictly decreasing,
nums[q...r] is strictly increasing.
Return the maximum sum of any trionic subarray in nums.

Example 1:
Input: nums = [0,-2,-1,-3,0,2,-1]
Output: -4
Explanation:
Pick l = 1, p = 2, q = 3, r = 5:
nums[l...p] = nums[1...2] = [-2, -1] is strictly increasing (-2 < -1).
nums[p...q] = nums[2...3] = [-1, -3] is strictly decreasing (-1 > -3)
nums[q...r] = nums[3...5] = [-3, 0, 2] is strictly increasing (-3 < 0 < 2).
Sum = (-2) + (-1) + (-3) + 0 + 2 = -4.

Example 2:
Input: nums = [1,4,2,7]
Output: 14
Explanation:
Pick l = 0, p = 1, q = 2, r = 3:
nums[l...p] = nums[0...1] = [1, 4] is strictly increasing (1 < 4).
nums[p...q] = nums[1...2] = [4, 2] is strictly decreasing (4 > 2).
nums[q...r] = nums[2...3] = [2, 7] is strictly increasing (2 < 7).
Sum = 1 + 4 + 2 + 7 = 14.

Constraints:
4 <= n = nums.length <= 10^5
-10^9 <= nums[i] <= 10^9
It is guaranteed that at least one trionic subarray exists.

</> Typescript code:
*/

function maxSumTrionic(nums: number[]): number {
  // Store array length for boundary checks
  const n = nums.length;

  // Build prefix sum array for O(1) range sum queries
  // prefix[i] represents sum of nums[0] through nums[i-1]
  const prefix = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];

  // Use negative infinity to represent invalid states (single element sequences)
  const inf = Number.NEGATIVE_INFINITY;

  // DP array: maximum sum of strictly increasing subarray ending at each index
  // Must contain at least 2 elements to be valid (l < p requirement)
  const bestIncEnd = new Array(n).fill(inf);
  // Iterate forward, starting from index 1 (need previous element to form sequence)
  for (let i = 1; i < n; i++) {
    // Check if current can extend increasing trend from previous
    if (nums[i] > nums[i - 1]) {
      // Choice: extend best sequence ending at i-1, or start fresh from i-1
      // We take max because bestIncEnd[i-1] might be worse than just nums[i-1]
      // (e.g., if bestIncEnd[i-1] represents [-10, -9] with sum -19,
      //  and nums[i-1] is -9, we prefer -9 for the sum contribution)
      bestIncEnd[i] = nums[i] + Math.max(bestIncEnd[i - 1], nums[i - 1]);
    }
    // If not increasing, remains inf (cannot be peak p of trionic array)
  }

  // DP array: maximum sum of strictly increasing subarray starting at each index
  // Must contain at least 2 elements to be valid (q < r requirement)
  const bestIncStart = new Array(n).fill(inf);
  // Iterate backward, starting from n-2 (need next element to form sequence)
  for (let i = n - 2; i >= 0; i--) {
    // Check if current can start increasing trend (less than next element)
    if (nums[i] < nums[i + 1]) {
      // Choice: extend best sequence starting at i+1, or end at i+1
      // Similar logic: if extending gives worse sum, just take nums[i+1]
      bestIncStart[i] = nums[i] + Math.max(bestIncStart[i + 1], nums[i + 1]);
    }
    // If not increasing, remains inf (cannot be valley q of trionic array)
  }

  // Result accumulator
  let res = inf;

  // Iterate to find all strictly decreasing contiguous runs
  // The middle (decreasing) part of trionic array must fit entirely within one run
  let i = 0;
  while (i < n) {
    // Find end of current strictly decreasing run
    // Condition: each element strictly greater than next
    let j = i;
    while (j + 1 < n && nums[j] > nums[j + 1]) j++;

    // Only process if run has at least 2 elements (need p < q within the run)
    if (j > i) {
      // Tracks maximum value of (bestIncEnd[p] - prefix[p+1]) for valid p in run
      // This represents the left increasing contribution minus overlap adjustment
      let maxVal = inf;

      // Iterate all possible valley positions q in this decreasing run
      // q must be before last index to leave room for right increasing part
      for (let q = i + 1; q <= j && q < n - 1; q++) {
        const p = q - 1; // Peak is immediately before valley in decreasing sequence

        // Validate p as valid peak: must have strictly increasing sequence ending there
        // Requires p > 0 (at least one element before) and increasing trend
        if (p > 0 && nums[p] > nums[p - 1] && bestIncEnd[p] > inf) {
          // Update maxVal with this peak candidate
          // Subtract prefix[p+1] to avoid double-counting in final sum
          maxVal = Math.max(maxVal, bestIncEnd[p] - prefix[p + 1]);
        }

        // Validate q as valid valley: must have strictly increasing sequence starting there
        // Also ensure we found at least one valid peak (maxVal is set)
        if (maxVal > inf && nums[q] < nums[q + 1] && bestIncStart[q] > inf) {
          // Calculate total trionic sum:
          // maxVal: best left increasing part (adjusted)
          // prefix[q+1]: adds sum of decreasing part from p+1 to q
          // bestIncStart[q] - nums[q]: adds right increasing part excluding q (already counted)
          res = Math.max(
            res,
            maxVal + prefix[q + 1] + bestIncStart[q] - nums[q],
          );
        }
      }
    }

    // Move to next potential decreasing run
    i = j + 1;
  }

  return res;
}
