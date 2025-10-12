/*
3539. Find Sum of Array Product of Magical Sequences

You are given two integers, m and k, and an integer array nums.
A sequence of integers seq is called magical if:
seq has a size of m.
0 <= seq[i] < nums.length
The binary representation of 2seq[0] + 2seq[1] + ... + 2seq[m - 1] has k set bits.
The array product of this sequence is defined as prod(seq) = (nums[seq[0]] * nums[seq[1]] * ... * nums[seq[m - 1]]).
Return the sum of the array products for all valid magical sequences.
Since the answer may be large, return it modulo 109 + 7.
A set bit refers to a bit in the binary representation of a number that has a value of 1.

Example 1:
Input: m = 5, k = 5, nums = [1,10,100,10000,1000000]
Output: 991600007
Explanation:
All permutations of [0, 1, 2, 3, 4] are magical sequences, each with an array product of 1013.

Example 2:
Input: m = 2, k = 2, nums = [5,4,3,2,1]
Output: 170
Explanation:
The magical sequences are [0, 1], [0, 2], [0, 3], [0, 4], [1, 0], [1, 2], [1, 3], [1, 4], [2, 0], [2, 1], [2, 3], [2, 4], [3, 0], [3, 1], [3, 2], [3, 4], [4, 0], [4, 1], [4, 2], and [4, 3].

Example 3:
Input: m = 1, k = 1, nums = [28]
Output: 28
Explanation:
The only magical sequence is [0].

Constraints:
1 <= k <= m <= 30
1 <= nums.length <= 50
1 <= nums[i] <= 10^8

</> Typescript code:
*/

function magicalSum(m: number, k: number, nums: number[]): number {
    // Get the number of elements in nums.
    const n = nums.length;
    // Define the modulo constant for calculations.
    const MOD = 1_000_000_007;
    const BIG_MOD = BigInt(MOD);

    // 1. Precompute combinations C(n, k) using Pascal's triangle.
    // C[i][j] will store the value of "i choose j".
    const C = Array(m + 1).fill(0).map(() => Array(m + 1).fill(0));
    for (let i = 0; i <= m; i++) {
        C[i][0] = 1; // C(i, 0) is always 1.
        for (let j = 1; j <= i; j++) {
            C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD;
        }
    }

    // 2. Precompute modular powers of nums[i].
    // powers[i][j] will store (nums[i] ^ j) % MOD.
    const powers = Array(n).fill(0).map(() => Array(m + 1).fill(0));
    for (let i = 0; i < n; i++) {
        powers[i][0] = 1; // num^0 is 1.
        const num_i = BigInt(nums[i]);
        for (let j = 1; j <= m; j++) {
            // Use BigInt for intermediate multiplication to prevent overflow.
            powers[i][j] = Number((BigInt(powers[i][j - 1]) * num_i) % BIG_MOD);
        }
    }

    // 3. Initialize the DP table.
    // dp[j][c][l] = sum of products using j elements, with a carry c, and l set bits.
    let dp = Array(m + 1).fill(0).map(() => Array(m + 1).fill(0).map(() => Array(k + 1).fill(0)));
    // Base case: using 0 elements gives a product sum of 1, with 0 carry and 0 set bits.
    dp[0][0][0] = 1;

    // 4. Iterate through each number in `nums` to build the DP solution.
    for (let i = 0; i < n; i++) {
        // Use a temporary `next_dp` table for the new states to avoid modifying the current state during iteration.
        let next_dp = Array(m + 1).fill(0).map(() => Array(m + 1).fill(0).map(() => Array(k + 1).fill(0)));
        // j: total number of elements used from nums[0...i-1].
        for (let j = 0; j <= m; j++) {
            // c: carry propagated to bit position `i`. Optimized to be at most `j`.
            for (let c = 0; c <= j; c++) {
                // l: number of set bits from positions 0 to i-1.
                for (let l = 0; l <= k; l++) {
                    // If the current state is unreachable, skip it.
                    if (dp[j][c][l] === 0) continue;

                    // count_i: how many times we use the current number nums[i].
                    for (let count_i = 0; j + count_i <= m; count_i++) {
                        // Update total elements used.
                        const new_j = j + count_i;
                        // Calculate the total value at bit position `i` (from current count and previous carry).
                        const total_at_i = count_i + c;
                        // The actual bit value at position `i`.
                        const bit_i = total_at_i % 2;
                        // Update total set bits count.
                        const new_l = l + bit_i;

                        // If we exceed the target number of set bits, this path is invalid.
                        if (new_l > k) continue;

                        // Calculate the new carry for the next bit position `i+1`.
                        const new_c = Math.floor(total_at_i / 2);

                        // Get the combinatorial term for arranging `count_i` new items among `j` old items.
                        const comb = BigInt(C[new_j][count_i]);
                        // Get the product term from using `nums[i]`, `count_i` times.
                        const prod_term = BigInt(powers[i][count_i]);
                        const dp_val = BigInt(dp[j][c][l]);

                        // Calculate the value to add to the next state, using BigInt for safety.
                        const val_to_add = Number(((dp_val * comb) % BIG_MOD * prod_term) % BIG_MOD);

                        // Update the next DP state.
                        next_dp[new_j][new_c][new_l] = (next_dp[new_j][new_c][new_l] + val_to_add) % MOD;
                    }
                }
            }
        }
        // Move to the next state for the next number in `nums`.
        dp = next_dp;
    }

    // 5. Precompute popcounts for numbers up to `m` for the final calculation.
    const popcounts = Array(m + 1).fill(0);
    for (let i = 1; i <= m; i++) {
        popcounts[i] = (i & 1) + popcounts[Math.floor(i / 2)];
    }

    // 6. Calculate the final answer by summing up valid final states.
    let ans = 0;
    // After iterating through all numbers, we must have used exactly `m` elements.
    // c: the final carry after considering all `n` numbers.
    for (let c = 0; c <= m; c++) {
        // l: the number of set bits from positions 0 to n-1.
        for (let l = 0; l <= k; l++) {
            // The total number of set bits is the sum of bits from the main part and the final carry.
            if (l + popcounts[c] === k) {
                ans = (ans + dp[m][c][l]) % MOD;
            }
        }
    }

    return ans;
};
