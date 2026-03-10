/*
3130. Find All Possible Stable Binary Arrays II

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
The two possible stable binary arrays are [1,0] and [0,1].

Example 2:
Input: zero = 1, one = 2, limit = 1
Output: 1
Explanation:
The only possible stable binary array is [1,0,1].

Example 3:
Input: zero = 3, one = 3, limit = 2
Output: 14
Explanation:
All the possible stable binary arrays are [0,0,1,0,1,1], [0,0,1,1,0,1], [0,1,0,0,1,1], [0,1,0,1,0,1], [0,1,0,1,1,0], [0,1,1,0,0,1], [0,1,1,0,1,0], [1,0,0,1,0,1], [1,0,0,1,1,0], [1,0,1,0,0,1], [1,0,1,0,1,0], [1,0,1,1,0,0], [1,1,0,0,1,0], and [1,1,0,1,0,0].

Constraints:
1 <= zero, one, limit <= 1000

</> Typescript code:
*/

function numberOfStableArrays(
  zero: number,
  one: number,
  limit: number,
): number {
  const MOD = 1e9 + 7;
  // dp0[i][j] is the number of stable arrays with i zeros and j ones ending in 0
  // dp1[i][j] is the number of stable arrays with i zeros and j ones ending in 1
  // BigInt64Array is used for performance and to prevent overflow during intermediate additions
  const dp0 = Array.from(
    { length: zero + 1 },
    () => new BigInt64Array(one + 1),
  );
  const dp1 = Array.from(
    { length: zero + 1 },
    () => new BigInt64Array(one + 1),
  );

  for (let i = 0; i <= zero; i++) {
    for (let j = 0; j <= one; j++) {
      // Base cases: arrays consisting only of zeros or only of ones
      if (i === 0 || j === 0) {
        if (i > 0 && i <= limit) dp0[i][0] = 1n; // Can only end in 0 if no 1s exist
        if (j > 0 && j <= limit) dp1[0][j] = 1n; // Can only end in 1 if no 0s exist
        continue;
      }

      // Transition for dp0[i][j]: We add a 0 to all stable arrays of (i-1, j)
      // This is dp0[i-1][j] + dp1[i-1][j].
      dp0[i][j] = (dp0[i - 1][j] + dp1[i - 1][j]) % BigInt(MOD);
      // If i > limit, we must subtract cases where we would have more than 'limit' consecutive 0s.
      // That happens if the sequence ended in limit+1 zeros.
      // The state that leads to this invalid sequence is dp1[i - limit - 1][j].
      if (i > limit) {
        dp0[i][j] =
          (dp0[i][j] - dp1[i - limit - 1][j] + BigInt(MOD)) % BigInt(MOD);
      }

      // Transition for dp1[i][j]: We add a 1 to all stable arrays of (i, j-1)
      dp1[i][j] = (dp0[i][j - 1] + dp1[i][j - 1]) % BigInt(MOD);
      // If j > limit, subtract sequences that would result in limit+1 consecutive 1s.
      // The state that leads to this is dp0[i][j - limit - 1].
      if (j > limit) {
        dp1[i][j] =
          (dp1[i][j] - dp0[i][j - limit - 1] + BigInt(MOD)) % BigInt(MOD);
      }
    }
  }

  // The result is the sum of arrays ending in 0 and arrays ending in 1
  return Number((dp0[zero][one] + dp1[zero][one]) % BigInt(MOD));
}
