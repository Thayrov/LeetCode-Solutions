/* 
2466. Count Ways To Build Good Strings

Given the integers zero, one, low, and high, we can construct a string by starting with an empty string, and then at each step perform either of the following:

Append the character '0' zero times.
Append the character '1' one times.
This can be performed any number of times.

A good string is a string constructed by the above process having a length between low and high (inclusive).

Return the number of different good strings that can be constructed satisfying these properties. Since the answer can be large, return it modulo 109 + 7.

Example 1:
Input: low = 3, high = 3, zero = 1, one = 1
Output: 8
Explanation: 
One possible valid good string is "011". 
It can be constructed as follows: "" -> "0" -> "01" -> "011". 
All binary strings from "000" to "111" are good strings in this example.

Example 2:
Input: low = 2, high = 3, zero = 1, one = 2
Output: 5
Explanation: The good strings are "00", "11", "000", "110", and "011".

Constraints:
1 <= low <= high <= 10^5
1 <= zero, one <= low

</> Typescript Code:
*/

function countGoodStrings(low: number, high: number, zero: number, one: number): number {
  // Define modulo to prevent large number overflow
  const MOD = 1000000007;
  // Prepare a DP array where dp[i] holds how many ways to form a string of length i
  const dp = new Array(high + 1).fill(0);
  // Base case: there is exactly 1 way to build an empty string
  dp[0] = 1;
  // Fill DP array from 1 to high
  for (let i = 1; i <= high; i++) {
    // If we can add '0' zero times (thus increasing length by zero), accumulate ways
    if (i - zero >= 0) dp[i] = (dp[i] + dp[i - zero]) % MOD;
    // Similarly, if we can add '1' one times, accumulate ways
    if (i - one >= 0) dp[i] = (dp[i] + dp[i - one]) % MOD;
  }
  // Result accumulator for lengths in the range [low, high]
  let res = 0;
  // Sum up valid ways in the accepted range
  for (let i = low; i <= high; i++) {
    res = (res + dp[i]) % MOD;
  }
  // Return total ways modulo
  return res;
}
