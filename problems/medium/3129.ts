/*
3129. Find All Possible Stable Binary Arrays I

You are given 3 positive integers zero, one, and limit.
A binary array arr is called stable if:
The number of occurrences of 0 in arr is exactly zero.
The number of occurrences of 1 in arr is exactly one.
Each subarray of arr with a size greater than limit must contain both 0 and 1.
Return the total number of stable binary arrays.
Since the answer may be very large, return it modulo 109 + 7.

Example 1:
Input: zero = 1, one = 1, limit = 2
Output: 2
Explanation:
The two possible stable binary arrays are [1,0] and [0,1], as both arrays have a single 0 and a single 1, and no subarray has a length greater than 2.

Example 2:
Input: zero = 1, one = 2, limit = 1
Output: 1
Explanation:
The only possible stable binary array is [1,0,1].
Note that the binary arrays [1,1,0] and [0,1,1] have subarrays of length 2 with identical elements, hence, they are not stable.

Example 3:
Input: zero = 3, one = 3, limit = 2
Output: 14
Explanation:
All the possible stable binary arrays are [0,0,1,0,1,1], [0,0,1,1,0,1], [0,1,0,0,1,1], [0,1,0,1,0,1], [0,1,0,1,1,0], [0,1,1,0,0,1], [0,1,1,0,1,0], [1,0,0,1,0,1], [1,0,0,1,1,0], [1,0,1,0,0,1], [1,0,1,0,1,0], [1,0,1,1,0,0], [1,1,0,0,1,0], and [1,1,0,1,0,0].

Constraints:
1 <= zero, one, limit <= 200

</> Typescript code:
*/

function numberOfStableArrays(
  zero: number,
  one: number,
  limit: number,
): number {
  const MOD = BigInt(1e9 + 7); // Define modulo as BigInt for precision
  // dp0[i][j] is the number of stable arrays with i zeros and j ones ending in 0
  const dp0 = Array.from(
    { length: zero + 1 },
    () => new BigUint64Array(one + 1),
  );
  // dp1[i][j] is the number of stable arrays with i zeros and j ones ending in 1
  const dp1 = Array.from(
    { length: zero + 1 },
    () => new BigUint64Array(one + 1),
  );

  for (let i = 0; i <= zero; i++) {
    for (let j = 0; j <= one; j++) {
      // Base case: empty array is handled implicitly by starting loops
      if (i === 0 && j === 0) continue;

      // Calculating dp0[i][j]: Arrays ending in '0'
      if (j === 0) {
        // If there are no ones, we can only have a stable array of zeros if length <= limit
        if (i <= limit) dp0[i][j] = 1n;
      } else if (i > 0) {
        // A sequence ending in 0 is formed by adding a 0 to any stable sequence with (i-1, j)
        // Inclusion-Exclusion: subtract sequences that already had 'limit' zeros at the end
        let val = (dp0[i - 1][j] + dp1[i - 1][j]) % MOD;
        if (i > limit) {
          // If we exceed limit, we subtract sequences ending in (limit + 1) zeros.
          // Those sequences specifically must have ended in a '1' before those zeros.
          val = (val - dp1[i - limit - 1][j] + MOD) % MOD;
        }
        dp0[i][j] = val;
      }

      // Calculating dp1[i][j]: Arrays ending in '1'
      if (i === 0) {
        // If there are no zeros, we can only have a stable array of ones if length <= limit
        if (j <= limit) dp1[i][j] = 1n;
      } else if (j > 0) {
        // A sequence ending in 1 is formed by adding a 1 to any stable sequence with (i, j-1)
        let val = (dp0[i][j - 1] + dp1[i][j - 1]) % MOD;
        if (j > limit) {
          // Subtract sequences that would result in (limit + 1) ones.
          // These are sequences that had (j - limit - 1) ones and ended in a '0'.
          val = (val - dp0[i][j - limit - 1] + MOD) % MOD;
        }
        dp1[i][j] = val;
      }
    }
  }

  // The result is the sum of arrays ending in 0 and arrays ending in 1
  return Number((dp0[zero][one] + dp1[zero][one]) % MOD);
}
