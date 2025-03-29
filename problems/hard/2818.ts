/* 
2818. Apply Operations to Maximize Score

You are given an array nums of n positive integers and an integer k.

Initially, you start with a score of 1. You have to maximize your score by applying the following operation at most k times:

Choose any non-empty subarray nums[l, ..., r] that you haven't chosen previously.
Choose an element x of nums[l, ..., r] with the highest prime score. If multiple such elements exist, choose the one with the smallest index.
Multiply your score by x.
Here, nums[l, ..., r] denotes the subarray of nums starting at index l and ending at the index r, both ends being inclusive.

The prime score of an integer x is equal to the number of distinct prime factors of x. For example, the prime score of 300 is 3 since 300 = 2 * 2 * 3 * 5 * 5.

Return the maximum possible score after applying at most k operations.

Since the answer may be large, return it modulo 109 + 7.

Example 1:
Input: nums = [8,3,9,3,8], k = 2
Output: 81
Explanation: To get a score of 81, we can apply the following operations:
- Choose subarray nums[2, ..., 2]. nums[2] is the only element in this subarray. Hence, we multiply the score by nums[2]. The score becomes 1 * 9 = 9.
- Choose subarray nums[2, ..., 3]. Both nums[2] and nums[3] have a prime score of 1, but nums[2] has the smaller index. Hence, we multiply the score by nums[2]. The score becomes 9 * 9 = 81.
It can be proven that 81 is the highest score one can obtain.

Example 2:
Input: nums = [19,12,14,6,10,18], k = 3
Output: 4788
Explanation: To get a score of 4788, we can apply the following operations: 
- Choose subarray nums[0, ..., 0]. nums[0] is the only element in this subarray. Hence, we multiply the score by nums[0]. The score becomes 1 * 19 = 19.
- Choose subarray nums[5, ..., 5]. nums[5] is the only element in this subarray. Hence, we multiply the score by nums[5]. The score becomes 19 * 18 = 342.
- Choose subarray nums[2, ..., 3]. Both nums[2] and nums[3] have a prime score of 2, but nums[2] has the smaller index. Hence, we multipy the score by nums[2]. The score becomes 342 * 14 = 4788.
It can be proven that 4788 is the highest score one can obtain.

Constraints:
1 <= nums.length == n <= 10^5
1 <= nums[i] <= 10^5
1 <= k <= min(n * (n + 1) / 2, 10^9)

</> Typescript code:
*/

/**
 * Calculates the number of distinct prime factors for numbers up to max_val.
 * Uses a sieve method. Time complexity: O(max_val log log max_val).
 * @param max_val The maximum value to compute prime scores for.
 * @returns An array where index `i` holds the prime score of `i`.
 */
function computePrimeScores(max_val: number): number[] {
  // Initialize an array to store prime scores, defaulting to 0.
  const prime_scores = new Array(max_val + 1).fill(0);
  // Iterate from 2 up to max_val to find primes and mark their multiples.
  for (let p = 2; p <= max_val; p++) {
    // If prime_scores[p] is 0, it means p has not been marked by a smaller prime, so p is prime.
    if (prime_scores[p] === 0) {
      // For each prime p, iterate through its multiples (j = p, 2p, 3p, ...) up to max_val.
      for (let j = p; j <= max_val; j += p) {
        // Increment the distinct prime factor count for each multiple j.
        prime_scores[j]++;
      }
    }
  }
  // Return the computed prime scores.
  return prime_scores;
}

/**
 * Calculates (base^exp) % mod using binary exponentiation (also known as exponentiation by squaring).
 * Handles large numbers using BigInt. Time complexity: O(log exp).
 * @param base The base of the power operation.
 * @param exp The exponent.
 * @param mod The modulus.
 * @returns The result of (base^exp) % mod as a BigInt.
 */
function power(base: bigint, exp: bigint, mod: bigint): bigint {
  // Initialize result to 1.
  let res = 1n;
  // Reduce base modulo mod initially.
  base %= mod;
  // Loop while the exponent is greater than 0.
  while (exp > 0n) {
    // If the current exponent bit is 1 (i.e., exp is odd), multiply the result by the current base value.
    if (exp % 2n === 1n) res = (res * base) % mod;
    // Square the base for the next iteration.
    base = (base * base) % mod;
    // Right-shift the exponent by 1 (equivalent to integer division by 2).
    exp >>= 1n;
  }
  // Return the final result.
  return res;
}

/**
 * LeetCode 2818: Apply Operations to Maximize Score
 * Calculates the maximum score achievable by applying at most k operations on subarrays.
 * @param nums Array of positive integers.
 * @param k Maximum number of operations allowed.
 * @returns Maximum possible score modulo 10^9 + 7.
 */
function maximumScore(nums: number[], k: number): number {
  // Get the length of the input array.
  const n = nums.length;
  // Define the modulus as a BigInt for calculations involving potentially large scores.
  const MOD = 1_000_000_007n;

  // --- Step 1: Precompute Prime Scores ---
  // Find the maximum value in the nums array to determine the sieve range.
  let max_num = 0;
  for (const num of nums) {
    if (num > max_num) {
      max_num = num;
    }
  }
  // Compute prime scores for all numbers up to max_num.
  const primeScoreLookup = computePrimeScores(max_num);
  // Create an array 'ps' storing the prime score for each element in nums.
  const ps = nums.map((num) => primeScoreLookup[num]);

  // --- Step 2: Calculate Effective Boundaries using Monotonic Stacks ---
  // 'left_boundary[i]' will store the start index of the range where nums[i] is optimal.
  const left_boundary = new Array(n).fill(0);
  // 'right_boundary[i]' will store the end index of the range where nums[i] is optimal.
  const right_boundary = new Array(n).fill(n - 1);

  // Define a comparison function 'isBetter(j, i)' which returns true if element at index j
  // has higher priority (higher prime score, or same score but smaller index) than element at index i.
  const isBetter = (j: number, i: number): boolean => {
    // Compare prime scores first.
    if (ps[j] > ps[i]) return true;
    if (ps[j] < ps[i]) return false;
    // If prime scores are equal, compare indices (smaller index wins).
    return j < i;
  };

  // --- Calculate Left Boundaries ---
  // Use a monotonic stack to find the index of the nearest element to the left that is "better".
  let stack: number[] = [];
  // Iterate through the array from left to right.
  for (let i = 0; i < n; i++) {
    // While the stack is not empty and the element at the top of the stack is NOT better than nums[i]...
    // This means nums[i] has equal or higher priority than the stack top element.
    while (stack.length > 0 && !isBetter(stack[stack.length - 1], i)) {
      // Pop the element from the stack as it's "dominated" by nums[i] moving rightwards.
      stack.pop();
    }
    // If the stack is not empty, the element at the top is the nearest "better" element to the left.
    // The left boundary starts right after this better element.
    if (stack.length > 0) {
      left_boundary[i] = stack[stack.length - 1] + 1;
    } else {
      // If the stack is empty, there's no better element to the left, so the boundary is 0.
      left_boundary[i] = 0;
    }
    // Push the current index onto the stack.
    stack.push(i);
  }

  // --- Calculate Right Boundaries ---
  // Reset the stack for the right boundary calculation.
  stack = [];
  // Iterate through the array from right to left.
  for (let i = n - 1; i >= 0; i--) {
    // While the stack is not empty and the element at the top of the stack is NOT better than nums[i]...
    while (stack.length > 0 && !isBetter(stack[stack.length - 1], i)) {
      // Pop the element.
      stack.pop();
    }
    // If the stack is not empty, the element at the top is the nearest "better" element to the right.
    // The right boundary ends just before this better element.
    if (stack.length > 0) {
      right_boundary[i] = stack[stack.length - 1] - 1;
    } else {
      // If the stack is empty, there's no better element to the right, boundary is n-1.
      right_boundary[i] = n - 1;
    }
    // Push the current index onto the stack.
    stack.push(i);
  }

  // --- Step 3: Calculate Contribution Counts ---
  // 'counts[i]' stores the total number of subarrays where nums[i] is the optimal element.
  const counts = new Array(n);
  // Iterate through each element.
  for (let i = 0; i < n; i++) {
    // The number of valid left endpoints for subarrays starting at or before i is (i - left_boundary[i] + 1).
    const left_count = BigInt(i - left_boundary[i] + 1);
    // The number of valid right endpoints for subarrays ending at or after i is (right_boundary[i] - i + 1).
    const right_count = BigInt(right_boundary[i] - i + 1);
    // The total count is the product, calculated using BigInt to prevent overflow.
    counts[i] = left_count * right_count;
  }

  // --- Step 4: Sort Indices by Number Value ---
  // Create an array of indices [0, 1, ..., n-1].
  const indices = Array.from({ length: n }, (_, i) => i);
  // Sort the indices based on the corresponding values in nums, in descending order.
  indices.sort((a, b) => nums[b] - nums[a]);

  // --- Step 5: Calculate Final Score Greedily ---
  // Initialize the score to 1 (as BigInt).
  let score = 1n;
  // Convert k to BigInt as it can be large and will be decremented.
  let k_bigint = BigInt(k);

  // Iterate through the indices sorted by descending value of nums[index].
  for (const idx of indices) {
    // If we have used all k operations, stop.
    if (k_bigint === 0n) {
      break;
    }
    // Get the number itself as BigInt.
    const num = BigInt(nums[idx]);
    // Get the pre-calculated contribution count for this number.
    const cnt = counts[idx];

    // Determine how many times we can use this number: the minimum of remaining k and its count.
    const take = k_bigint < cnt ? k_bigint : cnt; // Equivalent to min(k_bigint, cnt)

    // If we can take this number at least once...
    if (take > 0n) {
      // Calculate (num ^ take) % MOD using the modular exponentiation function.
      const term = power(num, take, MOD);
      // Multiply the current score by this term, taking modulo MOD.
      score = (score * term) % MOD;
      // Decrease the remaining number of operations (k).
      k_bigint -= take;
    }
  }

  // --- Step 6: Return Result ---
  // Convert the final score (which is a BigInt) back to a number before returning.
  return Number(score);
}
