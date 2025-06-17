/*
3405. Count the Number of Arrays with K Matching Adjacent Elements

You are given three integers n, m, k. A good array arr of size n is defined as follows:
Each element in arr is in the inclusive range [1, m].
Exactly k indices i (where 1 <= i < n) satisfy the condition arr[i - 1] == arr[i].
Return the number of good arrays that can be formed.
Since the answer may be very large, return it modulo 109 + 7.

Example 1:
Input: n = 3, m = 2, k = 1
Output: 4
Explanation:
There are 4 good arrays. They are [1, 1, 2], [1, 2, 2], [2, 1, 1] and [2, 2, 1].
Hence, the answer is 4.

Example 2:
Input: n = 4, m = 2, k = 2
Output: 6
Explanation:
The good arrays are [1, 1, 1, 2], [1, 1, 2, 2], [1, 2, 2, 2], [2, 1, 1, 1], [2, 2, 1, 1] and [2, 2, 2, 1].
Hence, the answer is 6.

Example 3:
Input: n = 5, m = 2, k = 0
Output: 2
Explanation:
The good arrays are [1, 2, 1, 2, 1] and [2, 1, 2, 1, 2]. Hence, the answer is 2.
 
Constraints:
1 <= n <= 10^5
1 <= m <= 10^5
0 <= k <= n - 1

</> Typescript code:
*/

/**
 * Calculates the number of "good" arrays based on size, value range, and adjacent matches.
 * The solution uses a combinatorial approach.
 * 1. Choose Positions: First, we calculate the number of ways to choose `k` positions for matching
 * adjacent elements out of `n-1` possible positions. This is a combination problem: C(n-1, k).
 * 2. Fill Values: For any given choice of `k` matching positions, we have `n-1-k` non-matching
 * positions. These non-matches act as separators, creating `(n-1-k) + 1 = n-k` blocks of
 * identical numbers.
 * - The first block can be filled with any of `m` values.
 * - Each subsequent block must have a different value than the block before it, giving `m-1` choices.
 * - This results in `m * (m-1)^(n-k-1)` ways to fill the values.
 * 3. Total: The final answer is the product of these two calculations: C(n-1, k) * m * (m-1)^(n-1-k).
 * All calculations are done under modulo `10^9 + 7` using BigInt to prevent overflow.
 *
 * @param n The size of the array.
 * @param m The maximum value for an element (inclusive range [1, m]).
 * @param k The required number of matching adjacent elements.
 * @returns The number of good arrays modulo 10^9 + 7.
 */
function countGoodArrays(n: number, m: number, k: number): number {
  // Define the modulus as a BigInt for safe arithmetic with large numbers.
  const MOD = 1000000007n;

  // A valid `k` must be in the range [0, n-1].
  if (k < 0 || k >= n) {
    return 0;
  }

  /**
   * Calculates (base^exp) % MOD using binary exponentiation (or exponentiation by squaring).
   * This is an efficient algorithm with O(log exp) time complexity.
   * @param base The base of the power.
   * @param exp The exponent.
   * @returns The result of (base^exp) % MOD.
   */
  const power = (base: bigint, exp: bigint): bigint => {
    let res = 1n;
    base %= MOD;
    while (exp > 0n) {
      // If the exponent is odd, multiply the base with the result.
      if (exp % 2n === 1n) res = (res * base) % MOD;
      // Square the base and halve the exponent.
      base = (base * base) % MOD;
      exp /= 2n;
    }
    return res;
  };

  /**
   * Calculates the modular multiplicative inverse of a number 'n' modulo 'MOD'.
   * Based on Fermat's Little Theorem, n^(MOD-2) ≡ n^(-1) (mod MOD) for a prime MOD.
   * @param n The number to find the inverse of.
   * @returns The modular inverse of n.
   */
  const modInverse = (n: bigint): bigint => {
    return power(n, MOD - 2n);
  };

  // Precompute factorials up to n-1 modulo MOD to speed up combination calculations.
  // Explicitly type the array as bigint[] to avoid potential type inference issues.
  const fact: bigint[] = new Array(n);
  fact[0] = 1n; // Base case: 0! = 1.
  for (let i = 1; i < n; i++) {
    // Calculate fact[i] = (i!) % MOD by multiplying the previous factorial by i.
    const product = fact[i - 1] * BigInt(i);
    fact[i] = product % MOD;
  }

  /**
   * Calculates combinations C(n, k) = n! / (k! * (n-k)!) modulo MOD.
   * Uses precomputed factorials and modular inverse for efficiency.
   * @param nVal The total number of items.
   * @param rVal The number of items to choose.
   * @returns The result of C(n, k) % MOD.
   */
  const combinations = (nVal: number, rVal: number): bigint => {
    // Basic validation for combinations.
    if (rVal < 0 || rVal > nVal) {
      return 0n;
    }
    // C(n, 0) = 1 and C(n, n) = 1.
    if (rVal === 0 || rVal === nVal) {
      return 1n;
    }
    // Optimization: C(n, k) = C(n, n-k). Choose the smaller k.
    if (rVal > nVal / 2) {
      rVal = nVal - rVal;
    }

    // Numerator is nVal!
    const numerator = fact[nVal];
    // Denominator is (rVal! * (nVal-rVal)!) % MOD
    const denominator = (fact[rVal] * fact[nVal - rVal]) % MOD;
    // Result is nVal! * (rVal! * (nVal-rVal)!)^(-1) % MOD
    return (numerator * modInverse(denominator)) % MOD;
  };

  // Step 1: Calculate the number of ways to choose k positions for matches from n-1 possibilities.
  const waysToChoosePositions = combinations(n - 1, k);

  // Convert m and the exponent to BigInt for calculations.
  const mBig = BigInt(m);
  const mMinusOneBig = BigInt(m - 1);
  const expBig = BigInt(n - 1 - k);

  // Step 2: Calculate the number of ways to assign values to the n-k blocks.
  const waysToFillValues = (mBig * power(mMinusOneBig, expBig)) % MOD;

  // Step 3: Multiply the results from Step 1 and Step 2 for the final answer.
  const result = (waysToChoosePositions * waysToFillValues) % MOD;

  // Convert the final BigInt result back to a number before returning.
  return Number(result);
}
