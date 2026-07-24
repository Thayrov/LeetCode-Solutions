/*
3514. Number of Unique XOR Triplets II

You are given an integer array nums.
A XOR triplet is defined as the XOR of three elements nums[i] XOR nums[j] XOR nums[k] where i <= j <= k.
Return the number of unique XOR triplet values from all possible triplets (i, j, k).

Example 1:
Input: nums = [1,3]
Output: 2
Explanation:
The possible XOR triplet values are:
(0, 0, 0) → 1 XOR 1 XOR 1 = 1
(0, 0, 1) → 1 XOR 1 XOR 3 = 3
(0, 1, 1) → 1 XOR 3 XOR 3 = 1
(1, 1, 1) → 3 XOR 3 XOR 3 = 3
The unique XOR values are {1, 3}. Thus, the output is 2.

Example 2:
Input: nums = [6,7,8,9]
Output: 4
Explanation:
The possible XOR triplet values are {6, 7, 8, 9}. Thus, the output is 4.

Constraints:
1 <= nums.length <= 1500
1 <= nums[i] <= 1500

</> Typescript code:
*/

function uniqueXorTriplets(nums: number[]): number {
  // Cover every XOR value representable by inputs below 2^11.
  const size = 2048;
  // Store the distinct-value indicator and its XOR spectrum in place.
  const spectrum = new Float64Array(size);

  // Mark each available value once because indices may be reused.
  for (const value of nums) spectrum[value] = 1;

  // Apply the forward Walsh-Hadamard transform.
  for (let half = 1; half < size; half <<= 1) {
    // Visit each butterfly block of the current width.
    for (let start = 0; start < size; start += half << 1) {
      // Combine corresponding entries from both block halves.
      for (let offset = 0; offset < half; ++offset) {
        // Cache the pair before overwriting either entry.
        const left = spectrum[start + offset];
        // Read the matching entry from the upper half.
        const right = spectrum[start + offset + half];
        // Write the butterfly sum.
        spectrum[start + offset] = left + right;
        // Write the butterfly difference.
        spectrum[start + offset + half] = left - right;
      }
    }
  }

  // Cube each coefficient to form the ordered three-value XOR convolution.
  for (let value = 0; value < size; ++value) {
    // Multiply explicitly to retain the exact accepted transform arithmetic.
    spectrum[value] = spectrum[value] * spectrum[value] * spectrum[value];
  }

  // Apply the self-inverse transform without normalization.
  for (let half = 1; half < size; half <<= 1) {
    // Visit each inverse butterfly block.
    for (let start = 0; start < size; start += half << 1) {
      // Restore every pair of convolution coordinates.
      for (let offset = 0; offset < half; ++offset) {
        // Cache the lower transformed coefficient.
        const left = spectrum[start + offset];
        // Cache the upper transformed coefficient.
        const right = spectrum[start + offset + half];
        // Recover the scaled lower convolution count.
        spectrum[start + offset] = left + right;
        // Recover the scaled upper convolution count.
        spectrum[start + offset + half] = left - right;
      }
    }
  }

  // Accumulate the number of reachable XOR results.
  let answer = 0;
  // Inspect every possible eleven-bit result.
  for (let value = 0; value < size; ++value) {
    // Count nonzero scaled frequencies; normalization cannot change zero status.
    if (spectrum[value] !== 0) ++answer;
  }
  // Return the number of unique triplet XOR values.
  return answer;
}
