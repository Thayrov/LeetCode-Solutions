/*
3336. Find the Number of Subsequences With Equal GCD

Hint
You are given an integer array nums.
Your task is to find the number of pairs of non-empty subsequences (seq1, seq2) of nums that satisfy the following conditions:
The subsequences seq1 and seq2 are disjoint, meaning no index of nums is common between them.
The GCD of the elements of seq1 is equal to the GCD of the elements of seq2.
Return the total number of such pairs.
Since the answer may be very large, return it modulo 109 + 7.

Example 1:
Input: nums = [1,2,3,4]
Output: 10
Explanation:
The subsequence pairs which have the GCD of their elements equal to 1 are:
([1, 2, 3, 4], [1, 2, 3, 4])
([1, 2, 3, 4], [1, 2, 3, 4])
([1, 2, 3, 4], [1, 2, 3, 4])
([1, 2, 3, 4], [1, 2, 3, 4])
([1, 2, 3, 4], [1, 2, 3, 4])
([1, 2, 3, 4], [1, 2, 3, 4])
([1, 2, 3, 4], [1, 2, 3, 4])
([1, 2, 3, 4], [1, 2, 3, 4])
([1, 2, 3, 4], [1, 2, 3, 4])
([1, 2, 3, 4], [1, 2, 3, 4])

Example 2:
Input: nums = [10,20,30]
Output: 2
Explanation:
The subsequence pairs which have the GCD of their elements equal to 10 are:
([10, 20, 30], [10, 20, 30])
([10, 20, 30], [10, 20, 30])

Example 3:
Input: nums = [1,1,1,1]
Output: 50

Constraints:
1 <= nums.length <= 200
1 <= nums[i] <= 200

</> Typescript code:
*/

function subsequencePairCount(nums: number[]): number {
  // Store the modulus required by the problem.
  const MOD = 1_000_000_007;

  // Find the largest possible GCD state needed for this input.
  const max = Math.max(...nums);

  // Include state zero, which represents an empty subsequence.
  const size = max + 1;

  // Allocate a lookup table for every possible GCD transition.
  const gcd = Array.from({ length: size }, () => new Int16Array(size));

  // Iterate through every possible current GCD.
  for (let a = 0; a <= max; a++) {
    // Iterate through every possible appended value.
    for (let b = 0; b <= max; b++) {
      // Copy the first operand for Euclid's algorithm.
      let x = a;

      // Copy the second operand for Euclid's algorithm.
      let y = b;

      // Continue until the remainder becomes zero.
      while (y !== 0) {
        // Compute the next remainder.
        const remainder = x % y;

        // Move the second operand into the first operand.
        x = y;

        // Move the remainder into the second operand.
        y = remainder;
      }

      // Store gcd(a, b), including gcd(0, b) = b.
      gcd[a][b] = x;
    }
  }

  // Store counts indexed by gcd(seq1) * size + gcd(seq2).
  let dp = new Int32Array(size * size);

  // Start with both subsequences empty.
  dp[0] = 1;

  // Process each array index exactly once.
  for (const value of nums) {
    // Create the states after deciding where to place this index.
    const next = new Int32Array(size * size);

    // Iterate through every possible GCD of the first subsequence.
    for (let first = 0; first <= max; first++) {
      // Cache the flattened row offset.
      const row = first * size;

      // Iterate through every possible GCD of the second subsequence.
      for (let second = 0; second <= max; second++) {
        // Read the number of assignments producing this state.
        const count = dp[row + second];

        // Skip unreachable states.
        if (count === 0) continue;

        // Keep the current index in neither subsequence.
        const unusedIndex = row + second;

        // Append the current index only to the first subsequence.
        const firstIndex = gcd[first][value] * size + second;

        // Append the current index only to the second subsequence.
        const secondIndex = row + gcd[second][value];

        // Add assignments that do not use the current index.
        next[unusedIndex] = (next[unusedIndex] + count) % MOD;

        // Add assignments that place the index in the first subsequence.
        next[firstIndex] = (next[firstIndex] + count) % MOD;

        // Add assignments that place the index in the second subsequence.
        next[secondIndex] = (next[secondIndex] + count) % MOD;
      }
    }

    // Replace the previous layer with the completed layer.
    dp = next;
  }

  // Initialize the final count.
  let answer = 0;

  // Consider every positive GCD so both subsequences are non-empty.
  for (let commonGcd = 1; commonGcd <= max; commonGcd++) {
    // Add states where both subsequences have the same GCD.
    answer = (answer + dp[commonGcd * size + commonGcd]) % MOD;
  }

  // Return the number of ordered disjoint subsequence pairs.
  return answer;
}
