/* 
2338. Count the Number of Ideal Arrays

You are given two integers n and maxValue, which are used to describe an ideal array.

A 0-indexed integer array arr of length n is considered ideal if the following conditions hold:

Every arr[i] is a value from 1 to maxValue, for 0 <= i < n.
Every arr[i] is divisible by arr[i - 1], for 0 < i < n.
Return the number of distinct ideal arrays of length n. Since the answer may be very large, return it modulo 10^9 + 7. 

Example 1:
Input: n = 2, maxValue = 5
Output: 10
Explanation: The following are the possible ideal arrays:
- Arrays starting with the value 1 (5 arrays): [1,1], [1,2], [1,3], [1,4], [1,5]
- Arrays starting with the value 2 (2 arrays): [2,2], [2,4]
- Arrays starting with the value 3 (1 array): [3,3]
- Arrays starting with the value 4 (1 array): [4,4]
- Arrays starting with the value 5 (1 array): [5,5]
There are a total of 5 + 2 + 1 + 1 + 1 = 10 distinct ideal arrays.

Example 2:
Input: n = 5, maxValue = 3
Output: 11
Explanation: The following are the possible ideal arrays:
- Arrays starting with the value 1 (9 arrays): 
   - With no other distinct values (1 array): [1,1,1,1,1] 
   - With 2nd distinct value 2 (4 arrays): [1,1,1,1,2], [1,1,1,2,2], [1,1,2,2,2], [1,2,2,2,2]
   - With 2nd distinct value 3 (4 arrays): [1,1,1,1,3], [1,1,1,3,3], [1,1,3,3,3], [1,3,3,3,3]
- Arrays starting with the value 2 (1 array): [2,2,2,2,2]
- Arrays starting with the value 3 (1 array): [3,3,3,3,3]
There are a total of 9 + 1 + 1 = 11 distinct ideal arrays.

Constraints:
2 <= n <= 10^4
1 <= maxValue <= 10^4

</> Typescript code:
*/

function idealArrays(n: number, maxValue: number): number {
  // Define modulo value for large results
  const MOD = 1e9 + 7;

  // The maximum number of distinct values in any sequence is limited
  // It cannot exceed n or log2(maxValue) (as each value must be at least double the previous)
  const maxDistinct = Math.min(n, 14); // log2(10^4) ≈ 13.3, so 14 is a safe upper bound

  // Precompute combinations using Pascal's triangle
  // combCache[i][j] represents C(i+1, j+1) - number of ways to choose j+1 elements from i+1 positions
  const combCache: number[][] = Array(n)
    .fill(0)
    .map(() => Array(maxDistinct + 1).fill(0));
  for (let i = 0; i < n; i++) {
    // Base case: C(i,0) = 1
    combCache[i][0] = 1;
    for (let j = 1; j <= Math.min(i, maxDistinct); j++) {
      // C(i,j) = C(i-1,j-1) + C(i-1,j)
      combCache[i][j] =
        (combCache[i - 1][j - 1] + (i > 0 ? combCache[i - 1][j] : 0)) % MOD;
    }
  }

  // Memoization table for counting ways to form distinct value sequences
  // dp[val][distinct] = ways to form a sequence with 'distinct' distinct values starting with 'val'
  const dp: number[][] = Array(maxValue + 1)
    .fill(0)
    .map(() => Array(maxDistinct + 1).fill(-1));

  // This function counts ways to form a sequence with 'distinct' distinct values where
  // the first value is 'val' and each subsequent value is a multiple of the previous
  function countWays(val: number, distinct: number): number {
    // Base case: if we need just one distinct value, there's only one way
    if (distinct === 1) return 1;

    // Return memoized result if available
    if (dp[val][distinct] !== -1) return dp[val][distinct];

    // Count ways by considering all possible next values (multiples of val)
    let ways = 0;
    for (let i = 2; i * val <= maxValue; i++) {
      ways = (ways + countWays(i * val, distinct - 1)) % MOD;
    }

    // Memoize and return result
    dp[val][distinct] = ways;
    return ways;
  }

  // Calculate total ways by iterating through all possible starting values and distinct counts
  let result = 0;
  for (let val = 1; val <= maxValue; val++) {
    for (let distinct = 1; distinct <= Math.min(n, maxDistinct); distinct++) {
      // Count ways to form a sequence with 'distinct' distinct values starting with 'val'
      const ways = countWays(val, distinct);

      // Multiply by the number of ways to place these distinct values in n positions
      // This is a "stars and bars" problem - ways to place distinct-1 dividers among n-1 positions
      result = (result + ((ways * combCache[n - 1][distinct - 1]) % MOD)) % MOD;
    }
  }

  return result;
}
