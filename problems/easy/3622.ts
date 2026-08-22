/*
3622. Check Divisibility by Digit Sum and Product

You are given a positive integer n. Determine whether n is divisible by the sum of the following two values:
- The digit sum of n (the sum of its digits).
- The digit product of n (the product of its digits).
Return true if n is divisible by this sum; otherwise, return false.

Example 1:
Input: n = 99
Output: true
Explanation:
Since 99 is divisible by the sum (9 + 9 = 18) plus product (9 * 9 = 81) of its digits (total 99), the output is true.

Example 2:
Input: n = 23
Output: false
Explanation:
Since 23 is not divisible by the sum (2 + 3 = 5) plus product (2 * 3 = 6) of its digits (total 11), the output is false.

Constraints:
1 <= n <= 10^6

</> Typescript code:
*/

// Check divisibility using one allocation-free pass over n's decimal digits.
function checkDivisibility(n: number): boolean {
  // Preserve the original input while consuming a working copy digit by digit.
  let value = n;
  // Accumulate the additive identity for the digit sum.
  let sum = 0;
  // Accumulate the multiplicative identity for the digit product.
  let product = 1;

  // Process every decimal digit from least significant to most significant.
  while (value > 0) {
    // Extract the current least-significant digit.
    const digit = value % 10;
    // Add the digit to the running digit sum.
    sum += digit;
    // Multiply the digit into the running digit product.
    product *= digit;
    // Remove the processed digit from the working copy.
    value = Math.floor(value / 10);
  }

  // Test divisibility by the required sum of digit sum and digit product.
  return n % (sum + product) === 0;
}
