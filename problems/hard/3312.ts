/*
3312. Sorted GCD Pair Queries

You are given an integer array nums of length n and an integer array queries.

Let gcdPairs denote an array obtained by calculating the GCD of all possible pairs (nums[i], nums[j]), where 0 <= i < j < n, and then sorting these values in ascending order.

For each query queries[i], you need to find the element at index queries[i] in gcdPairs.

Return an integer array answer, where answer[i] is the value at gcdPairs[queries[i]] for each query.

The term gcd(a, b) denotes the greatest common divisor of a and b.

Example 1:
Input: nums = [2,3,4], queries = [0,2,2]
Output: [1,2,2]
Explanation:
gcdPairs = [gcd(nums[0], nums[1]), gcd(nums[0], nums[2]), gcd(nums[1], nums[2])] = [1, 2, 1].
After sorting in ascending order, gcdPairs = [1, 1, 2].
So, the answer is [gcdPairs[queries[0]], gcdPairs[queries[1]], gcdPairs[queries[2]]] = [1, 2, 2].

Example 2:
Input: nums = [4,4,2,1], queries = [5,3,1,0]
Output: [4,2,1,1]
Explanation:
gcdPairs sorted in ascending order is [1, 1, 1, 2, 2, 4].

Example 3:
Input: nums = [2,2], queries = [0,0]
Output: [2,2]
Explanation:
gcdPairs = [2].

Constraints:
2 <= n == nums.length <= 10^5
1 <= nums[i] <= 5 * 10^4
1 <= queries.length <= 10^5
0 <= queries[i] < n * (n - 1) / 2

</> Typescript code:
*/

function gcdValues(nums: number[], queries: number[]): number[] {
  // Track the largest value to bound every divisor sieve.
  let maxValue = 0;
  // Find the upper bound without allocating or sorting a copy.
  for (const value of nums) {
    // Extend the sieve range when this value is larger.
    if (value > maxValue) maxValue = value;
  }

  // Store input multiplicities in compact integer slots.
  const frequency = new Int32Array(maxValue + 1);
  // Count every value for later multiple enumeration.
  for (const value of nums) frequency[value]++;

  // Store pair counts as doubles because totals can exceed 32-bit integers.
  const pairCounts = new Float64Array(maxValue + 1);
  // Compute pairs whose GCD is a multiple of each divisor.
  for (let divisor = 1; divisor <= maxValue; divisor++) {
    // Accumulate how many input values are divisible by this divisor.
    let divisible = 0;
    // Visit exactly the multiples of the current divisor.
    for (let multiple = divisor; multiple <= maxValue; multiple += divisor) {
      // Add the multiplicity of this divisible value.
      divisible += frequency[multiple];
    }
    // Choose every unordered pair among the divisible values.
    pairCounts[divisor] = (divisible * (divisible - 1)) / 2;
  }

  // Convert multiple-inclusive counts into exact-GCD counts from high to low.
  for (let divisor = maxValue; divisor >= 1; divisor--) {
    // Remove pairs already assigned to proper multiples of this divisor.
    for (let multiple = divisor + divisor; multiple <= maxValue; multiple += divisor) {
      // Subtract the exact count for this larger GCD.
      pairCounts[divisor] -= pairCounts[multiple];
    }
  }

  // Turn exact counts into sorted-rank prefix counts in place.
  for (let value = 1; value <= maxValue; value++) {
    // Include every pair whose GCD is at most this value.
    pairCounts[value] += pairCounts[value - 1];
  }

  // Resolve every requested zero-based rank independently.
  return queries.map((query) => {
    // Search the complete possible GCD range.
    let low = 1;
    // Keep the maximum input value as the inclusive upper bound.
    let high = maxValue;

    // Find the first prefix containing more than query pairs.
    while (low < high) {
      // Split the remaining integer range without overflow concerns.
      const middle = (low + high) >> 1;
      // Keep the left half when this prefix already covers the rank.
      if (pairCounts[middle] > query) high = middle;
      // Otherwise discard this prefix and continue to its right.
      else low = middle + 1;
    }

    // Return the GCD value occupying the requested sorted rank.
    return low;
  });
}
