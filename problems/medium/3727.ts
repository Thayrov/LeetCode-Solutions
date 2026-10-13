/*
3727. Maximum Alternating Sum of Squares

You are given an integer array nums. You may rearrange the elements in any order.
The alternating score of an array arr is defined as:
score = arr[0]^2 - arr[1]^2 + arr[2]^2 - arr[3]^2 + ...
Return an integer denoting the maximum possible alternating score of nums after rearranging its elements.

Example 1:
Input: nums = [1,2,3]
Output: 12
Explanation:
A possible rearrangement for nums is [2,1,3], which gives the maximum alternating score among all possible rearrangements.
The alternating score is calculated as:
score = 2^2 - 1^2 + 3^2 = 4 - 1 + 9 = 12

Example 2:
Input: nums = [1,-1,2,-2,3,-3]
Output: 16
Explanation:
A possible rearrangement for nums is [-3,-1,-2,1,3,2], which gives the maximum alternating score among all possible rearrangements.
The alternating score is calculated as:
score = (-3)^2 - (-1)^2 + (-2)^2 - (1)^2 + (3)^2 - (2)^2 = 9 - 1 + 4 - 1 + 9 - 4 = 16

Constraints:
1 <= nums.length <= 10^5
-4 * 10^4 <= nums[i] <= 4 * 10^4

</> Typescript code:
*/

function maxAlternatingSum(nums: number[]): number {
  // Largest absolute value bound from the constraints.
  const MAX_ABS = 40000;
  // Frequency table of absolute values, indexed by magnitude.
  const freq = new Int32Array(MAX_ABS + 1);
  // Sum of all squares; stays below 2^53 so number is exact.
  let total = 0;
  // Single pass: fold each element to its absolute value.
  for (let i = 0; i < nums.length; i++) {
    // Absolute value; only |x| matters since the score squares entries.
    const a = nums[i] < 0 ? -nums[i] : nums[i];
    // Count this magnitude for the counting-sort assignment below.
    freq[a]++;
    // Accumulate its square into the total pool.
    total += a * a;
  }
  // Minus slots count: floor(n / 2) odd positions carry a negative sign.
  let need = nums.length >> 1;
  // Sum of squares assigned to the negative positions (the smallest ones).
  let minus = 0;
  // Sweep magnitudes ascending so the smallest values absorb the minus signs.
  for (let a = 0; a <= MAX_ABS && need > 0; a++) {
    // How many copies of this magnitude exist.
    const c = freq[a];
    // Skip magnitudes that never appear.
    if (c === 0) continue;
    // Take only as many as the remaining minus slots require.
    const take = c < need ? c : need;
    // Add their squares to the negatively-signed pool.
    minus += take * a * a;
    // Shrink the remaining minus-slot demand.
    need -= take;
  }
  // Plus pool equals total minus the minus pool, so answer is total - 2 * minus.
  return total - 2 * minus;
}
