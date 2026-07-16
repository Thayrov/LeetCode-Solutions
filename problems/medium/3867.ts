/*
3867. Sum of GCD of Formed Pairs

You are given an integer array nums of length n.

Construct an array prefixGcd where for each index i:
- Let mx_i = max(nums[0], nums[1], ..., nums[i]).
- prefixGcd[i] = gcd(nums[i], mx_i).

After constructing prefixGcd:
- Sort prefixGcd in non-decreasing order.
- Form pairs by taking the smallest unpaired element and the largest unpaired element.
- Repeat this process until no more pairs can be formed.
- For each formed pair, compute the gcd of the two elements.
- If n is odd, the middle element in the prefixGcd array remains unpaired and should be ignored.

Return an integer denoting the sum of the GCD values of all formed pairs.

The term gcd(a, b) denotes the greatest common divisor of a and b.

Example 1:
Input: nums = [2,6,4]
Output: 2
Explanation:
Construct prefixGcd:

i  nums[i]  mx_i  prefixGcd[i]
0  2        2     2
1  6        6     6
2  4        6     2

prefixGcd = [2, 6, 2]. After sorting, it forms [2, 2, 6].

Pair the smallest and largest elements: gcd(2, 6) = 2. The remaining middle element 2 is ignored. Thus, the sum is 2.

Example 2:
Input: nums = [3,6,2,8]
Output: 5
Explanation:
Construct prefixGcd:

i  nums[i]  mx_i  prefixGcd[i]
0  3        3     3
1  6        6     6
2  2        6     2
3  8        8     8

prefixGcd = [3, 6, 2, 8]. After sorting, it forms [2, 3, 6, 8].

Form pairs: gcd(2, 8) = 2 and gcd(3, 6) = 3. Thus, the sum is 2 + 3 = 5.

Constraints:
1 <= n == nums.length <= 10^5
1 <= nums[i] <= 10^9

</> Typescript code:
*/

// Return the required sum for the supplied array.
function gcdSum(nums: number[]): number {
  // Compute a greatest common divisor with Euclid's algorithm.
  const gcd = (a: number, b: number): number => {
    // Reduce until the second operand vanishes.
    while (b !== 0) {
      // Retain the remainder for the next reduction.
      const remainder = a % b;
      // Shift the divisor into the first operand.
      a = b;
      // Continue with the smaller remainder.
      b = remainder;
    }
    // Return the final nonzero divisor.
    return a;
  };

  // Cache the input length.
  const n = nums.length;
  // Use 15-bit digits so two radix passes cover every value up to 10^9.
  const radix = 1 << 15;
  // Isolate the low radix digit with a bit mask.
  const mask = radix - 1;
  // Store prefix GCD values in compact unsigned storage.
  const values = new Uint32Array(n);
  // Allocate the stable radix-sort workspace.
  const buffer = new Uint32Array(n);
  // Reuse one frequency table across both radix passes.
  const counts = new Uint32Array(radix);
  // Track the maximum value in the current prefix.
  let prefixMax = 0;

  // Build every prefix GCD and count its low digit.
  for (let i = 0; i < n; i++) {
    // Read the current input value once.
    const value = nums[i];
    // Extend the running prefix maximum when needed.
    if (value > prefixMax) prefixMax = value;
    // Materialize this index's prefix GCD.
    values[i] = gcd(value, prefixMax);
    // Count the value by its low 15 bits.
    counts[values[i] & mask]++;
  }

  // Start the low-digit prefix positions at zero.
  let position = 0;
  // Convert low-digit frequencies into stable write offsets.
  for (let key = 0; key < radix; key++) {
    // Preserve this bucket's frequency before replacing it.
    const frequency = counts[key];
    // Record the bucket's first output index.
    counts[key] = position;
    // Advance past the entire bucket.
    position += frequency;
  }
  // Stably distribute values by their low digit.
  for (let i = 0; i < n; i++) {
    // Read the next unsorted prefix GCD.
    const value = values[i];
    // Write it at the next position for its low digit.
    buffer[counts[value & mask]++] = value;
  }

  // Clear frequencies before processing high digits.
  counts.fill(0);
  // Count each value by its remaining high bits.
  for (let i = 0; i < n; i++) counts[buffer[i] >>> 15]++;
  // Restart prefix positions for the high-digit pass.
  position = 0;
  // Convert high-digit frequencies into stable write offsets.
  for (let key = 0; key < radix; key++) {
    // Preserve this bucket's frequency before replacing it.
    const frequency = counts[key];
    // Record the bucket's first output index.
    counts[key] = position;
    // Advance past the entire bucket.
    position += frequency;
  }
  // Stably distribute values by their high digit to finish sorting.
  for (let i = 0; i < n; i++) {
    // Read the next low-digit-sorted value.
    const value = buffer[i];
    // Write it at the next position for its high digit.
    values[counts[value >>> 15]++] = value;
  }

  // Accumulate GCDs from smallest-largest pairs.
  let sum = 0;
  // Pair mirrored values while excluding any odd middle element.
  for (let left = 0; left < (n >> 1); left++) {
    // Add the GCD of the current extreme pair.
    sum += gcd(values[left], values[n - 1 - left]);
  }
  // Return the safely representable JavaScript-number total.
  return sum;
}
