/*
3116. Kth Smallest Amount With Single Denomination Combination

You are given an integer array coins representing coins of different denominations and an integer k.

You have an infinite number of coins of each denomination. However, you are not allowed to combine coins of different denominations.

Return the kth smallest amount that can be made using these coins.

Example 1:
Input: coins = [3,6,9], k = 3
Output: 9
Explanation:
The given coins can make the following amounts:
Coin 3 produces multiples of 3: 3, 6, 9, 12, 15, etc.
Coin 6 produces multiples of 6: 6, 12, 18, 24, etc.
Coin 9 produces multiples of 9: 9, 18, 27, 36, etc.
All of the coins combined produce: 3, 6, 9, 12, 15, etc.

Example 2:
Input: coins = [5,2], k = 7
Output: 12
Explanation:
The given coins can make the following amounts:
Coin 5 produces multiples of 5: 5, 10, 15, 20, etc.
Coin 2 produces multiples of 2: 2, 4, 6, 8, 10, 12, etc.
All of the coins combined produce: 2, 4, 5, 6, 8, 10, 12, 14, 15, etc.

Constraints:
1 <= coins.length <= 15
1 <= coins[i] <= 25
1 <= k <= 2 * 10^9
coins contains pairwise distinct integers.

</> Typescript code:
*/

function findKthSmallest(coins: number[], k: number): number {
  // Sort denominations so every possible divisor precedes its multiples.
  coins.sort((a, b) => a - b);

  // Store only denominations that contribute new representable amounts.
  const kept: number[] = [];
  // Name the outer loop so a dominated denomination can be skipped directly.
  outer:
  // Inspect each denomination in ascending order.
  for (const coin of coins) {
    // Compare against every already retained smaller denomination.
    for (const divisor of kept) {
      // Ignore this coin when all its multiples are already represented.
      if (coin % divisor === 0) continue outer;
    }
    // Retain a denomination that expands the union of possible amounts.
    kept.push(coin);
  }

  // Bound the answer by using k copies of the smallest retained denomination.
  const upper = kept[0] * k;
  // Allocate one state for every subset of retained denominations.
  const size = 1 << kept.length;
  // Cache each subset LCM, using upper + 1 as an irrelevant-LCM sentinel.
  const lcms = new Float64Array(size);
  // Cache each subset's inclusion-exclusion sign.
  const signs = new Int8Array(size);
  // Merge equal LCMs into one weighted counting term.
  const coefficients = new Map<number, number>();
  // Seed the empty subset so adding one bit produces a positive sign.
  signs[0] = -1;

  // Build every nonempty subset from its state with the lowest bit removed.
  for (let mask = 1; mask < size; mask++) {
    // Isolate the subset's lowest selected denomination.
    const bit = mask & -mask;
    // Remove that denomination to obtain the previously computed subset.
    const rest = mask ^ bit;
    // Alternate the inclusion-exclusion sign with subset cardinality.
    signs[mask] = -signs[rest];

    // Read the smaller subset's cached LCM.
    const previous = lcms[rest];
    // Propagate an LCM that can never divide a binary-search candidate.
    if (previous > upper) {
      // Preserve only the fact that this and every extension exceed the bound.
      lcms[mask] = upper + 1;
      // Skip the unnecessary GCD and coefficient work.
      continue;
    }

    // Map the isolated power-of-two bit to its retained denomination.
    const coin = kept[31 - Math.clz32(bit)];
    // Treat the empty subset's zero LCM as the multiplicative identity.
    let a = previous || 1;
    // Initialize the second Euclidean-algorithm operand.
    let b = coin;
    // Compute the GCD needed to extend the subset LCM exactly.
    while (b !== 0) {
      // Save the remainder before advancing the Euclidean pair.
      const remainder = a % b;
      // Shift the divisor into the first operand.
      a = b;
      // Continue with the remainder.
      b = remainder;
    }

    // Extend the subset LCM while dividing first to minimize intermediates.
    const lcm = ((previous || 1) / a) * coin;
    // Discard LCMs larger than every possible binary-search candidate.
    if (lcm > upper) {
      // Mark the subset and all its extensions as irrelevant.
      lcms[mask] = upper + 1;
      // Exclude this zero-contribution term.
      continue;
    }

    // Cache the exact LCM for later subset extensions.
    lcms[mask] = lcm;
    // Accumulate this subset's sign into its shared LCM coefficient.
    coefficients.set(lcm, (coefficients.get(lcm) || 0) + signs[mask]);
  }

  // Flatten active LCM keys for allocation-free counting probes.
  const divisors: number[] = [];
  // Store each active LCM's merged inclusion-exclusion coefficient.
  const weights: number[] = [];
  // Visit every merged counting term.
  for (const [divisor, weight] of coefficients) {
    // Remove LCMs whose positive and negative subset terms cancel.
    if (weight !== 0) {
      // Append the denominator used to count its multiples.
      divisors.push(divisor);
      // Append the matching inclusion-exclusion weight.
      weights.push(weight);
    }
  }

  // Start the lower-bound search at the smallest positive amount.
  let low = 1;
  // Start with the proven inclusive upper bound.
  let high = upper;
  // Narrow to the first amount whose union count reaches k.
  while (low < high) {
    // Choose an integer midpoint without 32-bit bitwise truncation.
    const middle = Math.floor((low + high) / 2);
    // Initialize the number of distinct representable amounts at most middle.
    let count = 0;
    // Apply every merged inclusion-exclusion term.
    for (let i = 0; i < divisors.length; i++) {
      // Count multiples of this LCM and apply its signed coefficient.
      count += Math.floor(middle / divisors[i]) * weights[i];
    }

    // Keep middle when it already contains at least k valid amounts.
    if (count >= k) high = middle;
    // Otherwise discard middle and every smaller candidate.
    else low = middle + 1;
  }

  // Return the first amount whose rank in the union is k.
  return low;
}
