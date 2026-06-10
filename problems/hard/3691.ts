/*
3691. Maximum Total Subarray Value II

Hint
You are given an integer array nums of length n and an integer k.
You must select exactly k distinct non-empty subarrays nums[l..r] of nums. Subarrays may overlap, but the exact same subarray (same l and r) cannot be chosen more than once.
The value of a subarray nums[l..r] is defined as: max(nums[l..r]) - min(nums[l..r]).
The total value is the sum of the values of all chosen subarrays.
Return the maximum possible total value you can achieve.

Example 1:
Input: nums = [1,3,2], k = 2
Output: 4
Explanation:
One optimal approach is:
Choose nums[0..1] = [1, 3]. The maximum is 3 and the minimum is 1, giving a value of 3 - 1 = 2.
Choose nums[0..2] = [1, 3, 2]. The maximum is still 3 and the minimum is still 1, so the value is also 3 - 1 = 2.
Adding these gives 2 + 2 = 4.

Example 2:
Input: nums = [4,2,5,1], k = 3
Output: 12
Explanation:
One optimal approach is:
Choose nums[0..3] = [4, 2, 5, 1]. The maximum is 5 and the minimum is 1, giving a value of 5 - 1 = 4.
Choose nums[1..3] = [2, 5, 1]. The maximum is 5 and the minimum is 1, so the value is also 4.
Choose nums[2..3] = [5, 1]. The maximum is 5 and the minimum is 1, so the value is again 4.
Adding these gives 4 + 4 + 4 = 12.

Constraints:
1 <= n == nums.length <= 5 * 10^4
0 <= nums[i] <= 10^9
1 <= k <= min(105, n * (n + 1) / 2)

</> Typescript code:
*/

function maxTotalValue(nums: number[], k: number): number {
  const n = nums.length; // Store array length.
  const totalCount = (n * (n + 1)) / 2; // Count all non-empty subarrays.
  let mn = nums[0],
    mx = nums[0]; // Initialize global min and max.

  for (const x of nums) {
    // Scan all values.
    if (x < mn) mn = x; // Update minimum.
    if (x > mx) mx = x; // Update maximum.
  }

  const calcLess = (limit: number): [number, bigint] => {
    // Count/sum subarray values below limit.
    if (limit <= 0) return [0, 0n]; // No valid non-negative range is below 0.

    const minV: number[] = [],
      minC: number[] = []; // Monotonic min groups.
    const maxV: number[] = [],
      maxC: number[] = []; // Monotonic max groups.
    let minH = 0,
      maxH = 0,
      left = 0,
      count = 0; // Queue heads, window left, total count.
    let minSum = 0,
      maxSum = 0,
      sum = 0n; // Sum of mins, maxes, and ranges.

    for (let r = 0; r < n; r++) {
      // Move right boundary.
      const x = nums[r]; // Current number.

      let c = 1; // Group size for minimum queue.
      while (minV.length > minH && minV[minV.length - 1] >= x) {
        // Merge worse minimum groups.
        c += minC[minC.length - 1]; // Absorb group size.
        minSum -= minV[minV.length - 1] * minC[minC.length - 1]; // Remove old contribution.
        minV.pop(); // Remove old value.
        minC.pop(); // Remove old count.
      }
      minV.push(x); // Add new min value.
      minC.push(c); // Add new min count.
      minSum += x * c; // Add new contribution.

      c = 1; // Group size for maximum queue.
      while (maxV.length > maxH && maxV[maxV.length - 1] <= x) {
        // Merge worse maximum groups.
        c += maxC[maxC.length - 1]; // Absorb group size.
        maxSum -= maxV[maxV.length - 1] * maxC[maxC.length - 1]; // Remove old contribution.
        maxV.pop(); // Remove old value.
        maxC.pop(); // Remove old count.
      }
      maxV.push(x); // Add new max value.
      maxC.push(c); // Add new max count.
      maxSum += x * c; // Add new contribution.

      while (maxV[maxH] - minV[minH] >= limit) {
        // Keep only ranges below limit.
        minSum -= minV[minH]; // Remove one left-start min.
        if (--minC[minH] === 0) minH++; // Drop exhausted min group.

        maxSum -= maxV[maxH]; // Remove one left-start max.
        if (--maxC[maxH] === 0) maxH++; // Drop exhausted max group.

        left++; // Move left boundary.
      }

      count += r - left + 1; // Add valid subarrays ending at r.
      sum += BigInt(maxSum - minSum); // Add their total values.
    }

    return [count, sum]; // Return count and sum.
  };

  const totalSum = calcLess(mx - mn + 1)[1]; // Sum values of all subarrays.

  let lo = 0,
    hi = mx - mn; // Binary search cutoff value.
  while (lo < hi) {
    // Find kth-largest value threshold.
    const mid = Math.floor((lo + hi + 1) / 2); // Upper mid.
    const [lessCount] = calcLess(mid); // Count values below mid.
    if (totalCount - lessCount >= k)
      lo = mid; // Enough values are at least mid.
    else hi = mid - 1; // Threshold too high.
  }

  const [lessCount, lessSum] = calcLess(lo); // Values below final cutoff.
  const geCount = totalCount - lessCount; // Values at least cutoff.
  const geSum = totalSum - lessSum; // Sum values at least cutoff.

  return Number(geSum - BigInt(geCount - k) * BigInt(lo)); // Trim extra cutoff-valued subarrays.
}
