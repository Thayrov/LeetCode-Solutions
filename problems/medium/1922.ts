/* 
1922. Count Good Numbers

A digit string is good if the digits (0-indexed) at even indices are even and the digits at odd indices are prime (2, 3, 5, or 7).

For example, "2582" is good because the digits (2 and 8) at even positions are even and the digits (5 and 2) at odd positions are prime. However, "3245" is not good because 3 is at an even index but is not even.
Given an integer n, return the total number of good digit strings of length n. Since the answer may be large, return it modulo 109 + 7.

A digit string is a string consisting of digits 0 through 9 that may contain leading zeros.

Example 1:
Input: n = 1
Output: 5
Explanation: The good numbers of length 1 are "0", "2", "4", "6", "8".

Example 2:
Input: n = 4
Output: 400

Example 3:
Input: n = 50
Output: 564908303

Constraints:
1 <= n <= 10^15

</> Typescript Code:
*/

function countGoodNumbers(n: number): number {
  // Define the modulus as a BigInt for precise arithmetic.
  const mod = 1000000007n;

  // Calculate the count of indices that require an even digit.
  // For a 0-indexed string, even indices count is ceil(n/2).
  const evenCount = n % 2 === 0 ? BigInt(n) / 2n : BigInt(n) / 2n + 1n;

  // Calculate the count of indices that require a prime digit from {2, 3, 5, 7}.
  // This is floor(n/2) because odd indices come after each even index.
  const oddCount = BigInt(n) / 2n;

  // Define a helper function 'modPow' to compute (base^exponent) modulo mod using
  // binary exponentiation, adapted to use BigInt arithmetic to maintain precision.
  const modPow = (base: bigint, exponent: bigint, mod: bigint): bigint => {
    let result = 1n; // Initialize result accumulator.
    base %= mod; // Bring base into the modulo range.
    // Loop until all bits in exponent are processed.
    while (exponent > 0n) {
      // If the current exponent bit is set, multiply the result by the base.
      if (exponent % 2n === 1n) result = (result * base) % mod;
      // Square the base and reduce modulo mod.
      base = (base * base) % mod;
      // Divide the exponent by 2 (using integer division on BigInts).
      exponent /= 2n;
    }
    return result;
  };

  // Calculate the final answer.
  // There are 5 valid even digits (0,2,4,6,8) and 4 valid prime digits (2,3,5,7).
  // Therefore the total number is: 5^(evenCount) * 4^(oddCount) mod mod.
  const answer = (modPow(5n, evenCount, mod) * modPow(4n, oddCount, mod)) % mod;

  // Convert the BigInt result back to a Number since the final result is within safe range.
  return Number(answer);
}
