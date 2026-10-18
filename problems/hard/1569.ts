/*
1569. Number of Ways to Reorder Array to Get Same BST

Given an array nums that represents a permutation of integers from 1 to n. We are going to construct a binary search tree (BST) by inserting the elements of nums in order into an initially empty BST. Find the number of different ways to reorder nums so that the constructed BST is identical to that formed from the original array nums.

For example, given nums = [2,1,3], we will have 2 as the root, 1 as a left child, and 3 as a right child. The array [2,3,1] also yields the same BST but [3,2,1] yields a different BST.

Return the number of ways to reorder nums such that the BST formed is identical to the original BST formed from nums.

Since the answer may be very large, return it modulo 10^9 + 7.

Example 1:
Input: nums = [2,1,3]
Output: 1
Explanation: We can reorder nums to be [2,3,1] which will yield the same BST. There are no other ways to reorder nums which will yield the same BST.

Example 2:
Input: nums = [3,4,5,1,2]
Output: 5
Explanation: The following 5 arrays will yield the same BST:
[3,1,2,4,5]
[3,1,4,2,5]
[3,1,4,5,2]
[3,4,1,2,5]
[3,4,1,5,2]

Example 3:
Input: nums = [1,2,3]
Output: 0
Explanation: There are no other orderings of nums that will yield the same BST.

Constraints:
1 <= nums.length <= 1000
1 <= nums[i] <= nums.length
All integers in nums are distinct.

</> Typescript code:
*/

function numOfWays(nums: number[]): number {
  // Modulus for all counting arithmetic.
  const MOD = 1000000007;
  // BigInt modulus for overflow-safe multiplication.
  const MODB = 1000000007n;
  // Cache input length for factorial bounds.
  const n = nums.length;
  // Factorial table with fact[0] = 1.
  const fact: number[] = new Array(n + 1).fill(1);
  // Build factorials modulo MOD with exact BigInt products.
  for (let i = 1; i <= n; i++) fact[i] = Number((BigInt(fact[i - 1]) * BigInt(i)) % MODB);
  // Binary exponentiation helper for the modular inverse seed.
  const modPow = (b: number, e: number): number => {
    // Accumulator identity as BigInt.
    let r = 1n;
    // Reduce base into the BigInt domain.
    let x = BigInt(b);
    // Copy exponent for destructive shifting.
    let ee = BigInt(e);
    // Square-and-multiply loop over exponent bits.
    while (ee > 0n) {
      // Fold base into result on set bits.
      if (ee & 1n) r = (r * x) % MODB;
      // Square base each step.
      x = (x * x) % MODB;
      // Shift to the next exponent bit.
      ee >>= 1n;
    }
    // Convert result back to the Number domain.
    return Number(r);
  };
  // Inverse factorial table with invFact[n] seeded below.
  const invFact: number[] = new Array(n + 1).fill(1);
  // Fermat inverse of fact[n] as the top-down seed.
  invFact[n] = modPow(fact[n], MOD - 2);
  // Descend via invFact[i-1] = invFact[i] * i.
  for (let i = n; i > 0; i--) invFact[i - 1] = Number((BigInt(invFact[i]) * BigInt(i)) % MODB);
  // O(1) binomial coefficient via the factorial ratio.
  const comb = (N: number, K: number): number => {
    // Out-of-range selections contribute nothing.
    if (K < 0 || K > N) return 0;
    // fact[N] / (fact[K] * fact[N-K]) under the modulus.
    return Number((BigInt(fact[N]) * BigInt(invFact[K]) % MODB * BigInt(invFact[N - K]) % MODB));
  };
  // Count BST-preserving orders of this insertion sequence.
  const dfs = (arr: number[]): number => {
    // Cache current subtree sequence length.
    const m = arr.length;
    // Zero, one, or two nodes admit a single order.
    if (m <= 2) return 1;
    // First element is the BST root.
    const root = arr[0];
    // Buffers for the BST-partitioned children.
    const left: number[] = [];
    const right: number[] = [];
    // Single-pass partition preserving relative order.
    for (let i = 1; i < m; i++) {
      // Smaller values belong to the left subtree.
      if (arr[i] < root) left.push(arr[i]);
      // Larger values belong to the right subtree.
      else right.push(arr[i]);
    }
    // Count orders inside the left subtree.
    const l = dfs(left);
    // Count orders inside the right subtree.
    const r = dfs(right);
    // Interleave children, then multiply by subtree counts.
    return Number((BigInt(comb(left.length + right.length, left.length)) * BigInt(l) % MODB * BigInt(r) % MODB));
  };
  // Subtract the original ordering from the total count.
  return (dfs(nums) - 1 + MOD) % MOD;
}
