/*
3783. Mirror Distance of an Integer

Hint
You are given an integer n.
Define its mirror distance as: abs(n - reverse(n))​​​​​​​ where reverse(n) is the integer formed by reversing the digits of n.
Return an integer denoting the mirror distance of n​​​​​​​.
abs(x) denotes the absolute value of x.

Example 1:
Input: n = 25
Output: 27
Explanation:
reverse(25) = 52.
Thus, the answer is abs(25 - 52) = 27.

Example 2:
Input: n = 10
Output: 9
Explanation:
reverse(10) = 01 which is 1.
Thus, the answer is abs(10 - 1) = 9.

Example 3:
Input: n = 7
Output: 0
Explanation:
reverse(7) = 7.
Thus, the answer is abs(7 - 7) = 0.

Constraints:
1 <= n <= 10^9

</> Typescript code:
*/

function mirrorDistance(n: number): number {
  // Initialize rev to store the reversed digits of n
  let rev = 0;
  // Copy n to a temporary variable to preserve the original value for the final subtraction
  let temp = n;

  // Iterate until all digits are processed
  while (temp > 0) {
    // Shift existing reversed digits left by one decimal place and add the last digit of temp
    rev = rev * 10 + (temp % 10);
    // Remove the last digit from temp using bitwise OR 0 for high-performance integer truncation
    temp = (temp / 10) | 0;
  }

  // Calculate the difference between the original number and its reverse
  const diff = n - rev;

  // Return the absolute value; manual ternary is slightly faster than Math.abs() in some JS engines
  return diff < 0 ? -diff : diff;
}
