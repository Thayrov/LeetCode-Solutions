/*
1680. Concatenation of Consecutive Binary Numbers

Given an integer n, return the decimal value of the binary string formed by concatenating the binary representations of 1 to n in order, modulo 109 + 7.

Example 1:
Input: n = 1
Output: 1
Explanation: "1" in binary corresponds to the decimal value 1. 

Example 2:
Input: n = 3
Output: 27
Explanation: In binary, 1, 2, and 3 corresponds to "1", "10", and "11".
After concatenating them, we have "11011", which corresponds to the decimal value 27.

Example 3:
Input: n = 12
Output: 505379714
Explanation: The concatenation results in "1101110010111011110001001101010111100".
The decimal value of that is 118505380540.
After modulo 109 + 7, the result is 505379714.

Constraints:
1 <= n <= 10^5

</> Typescript code:
*/

function concatenatedBinary(n: number): number {
  // Use BigInt for 64-bit precision to prevent overflow during bitwise shifts
  let res = 0n;
  // Tracks number of bits in the current number 'i'
  let shift = 0;
  // Constant for modulo operation as per problem constraints
  const MOD = 1000000007n;

  for (let i = 1; i <= n; i++) {
    // Optimization: (i & (i - 1)) === 0 detects if 'i' is a power of 2
    // If it is, the binary length of numbers increases by 1 bit
    if ((i & (i - 1)) === 0) shift++;

    // Left shift existing result by the length of 'i', then OR with 'i'
    // This effectively appends binary representation of 'i' to the string
    res = ((res << BigInt(shift)) | BigInt(i)) % MOD;
  }
  // Convert BigInt back to number for the required return type
  return Number(res);
}
