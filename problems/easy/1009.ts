/*
1009. Complement of Base 10 Integer

The complement of an integer is the integer you get when you flip all the 0's to 1's and all the 1's to 0's in its binary representation.
For example, The integer 5 is "101" in binary and its complement is "010" which is the integer 2.
Given an integer n, return its complement.

Example 1:
Input: n = 5
Output: 2
Explanation: 5 is "101" in binary, with complement "010" in binary, which is 2 in base-10.

Example 2:
Input: n = 7
Output: 0
Explanation: 7 is "111" in binary, with complement "000" in binary, which is 0 in base-10.

Example 3:
Input: n = 10
Output: 5
Explanation: 10 is "1010" in binary, with complement "0101" in binary, which is 5 in base-10.

Constraints:
0 <= n < 10^9

Note: This question is the same as 476: https://leetcode.com/problems/number-complement/

</> Typescript code:
*/

function bitwiseComplement(n: number): number {
  // Handle the edge case where n is 0; the complement of 0 (binary 0) is 1.
  if (n === 0) return 1;

  // Initialize a mask with the first bit set to 1.
  let mask = 1;

  // Expand the mask to cover all bits of n.
  // If n is 5 (101), the mask will become 7 (111).
  while (mask < n) {
    // Left shift the mask and add 1 to fill the lower bit.
    mask = (mask << 1) | 1;
  }

  // Use XOR between n and the mask.
  // Flipping bits: 101 ^ 111 = 010 (which is 2).
  return n ^ mask;
}
