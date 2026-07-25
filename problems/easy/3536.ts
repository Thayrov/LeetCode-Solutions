/*
3536. Maximum Product of Two Digits

You are given a positive integer n.

Return the maximum product of any two digits in n.

Note: You may use the same digit twice if it appears more than once in n.

Example 1:

Input: n = 31
Output: 3

Explanation:

The digits of n are [3, 1].
The possible products of any two digits are: 3 * 1 = 3.
The maximum product is 3.

Example 2:

Input: n = 22
Output: 4

Explanation:

The digits of n are [2, 2].
The possible products of any two digits are: 2 * 2 = 4.
The maximum product is 4.

Example 3:

Input: n = 124
Output: 8

Explanation:

The digits of n are [1, 2, 4].
The possible products of any two digits are: 1 * 2 = 2, 1 * 4 = 4, 2 * 4 = 8.
The maximum product is 8.

Constraints:

10 <= n <= 10^9

</> Typescript code:
*/

function maxProduct(n: number): number {
  // Track the largest digit seen so far.
  let largest = -1;
  // Track the second-largest digit, including duplicates.
  let second = -1;

  // Process every decimal digit exactly once.
  while (n > 0) {
    // Extract the least-significant remaining digit.
    const digit = n % 10;
    // Promote digits that match or exceed the current maximum.
    if (digit >= largest) {
      // Demote the previous maximum into second place.
      second = largest;
      // Store the new maximum digit.
      largest = digit;
    } else if (digit > second) {
      // Improve only the second-largest digit.
      second = digit;
    }
    // Remove the digit that was just processed.
    n = Math.floor(n / 10);
  }

  // Multiply the two largest digit occurrences.
  return largest * second;
}
