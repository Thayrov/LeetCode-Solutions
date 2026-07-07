/*
3754. Concatenate Non-Zero Digits and Multiply by Sum I

Hint
You are given an integer n.
Form a new integer x by concatenating all the non-zero digits of n in their original order. If there are no non-zero digits, x = 0.
Let sum be the sum of digits in x.
Return an integer representing the value of x * sum.

Example 1:
Input: n = 10203004
Output: 12340
Explanation:
The non-zero digits are 1, 2, 3, and 4. Thus, x = 1234.
The sum of digits is sum = 1 + 2 + 3 + 4 = 10.
Therefore, the answer is x * sum = 1234 * 10 = 12340.

Example 2:
Input: n = 1000
Output: 1
Explanation:
The non-zero digit is 1, so x = 1 and sum = 1.
Therefore, the answer is x * sum = 1 * 1 = 1.

Constraints:
0 <= n <= 10^9

</> Typescript code:
*/

function sumAndMultiply(n: number): number {
  // Stores the integer formed by concatenating non-zero digits.
  let x = 0;

  // Stores the sum of all non-zero digits added to x.
  let sum = 0;

  // Converts n to string to scan digits from left to right.
  for (const c of String(n)) {
    // Skips zero digits because they must not be concatenated.
    if (c !== "0") {
      // Converts the digit character to its numeric value.
      const d = c.charCodeAt(0) - 48;

      // Appends the digit to the right side of x.
      x = x * 10 + d;

      // Adds the digit to the digit sum.
      sum += d;
    }
  }

  // If no non-zero digits exist, both x and sum stay 0, so result is 0.
  return x * sum;
}
