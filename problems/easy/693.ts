/*
693. Binary Number with Alternating Bits

Given a positive integer, check whether it has alternating bits: namely, if two adjacent bits will always have different values.

Example 1:
Input: n = 5
Output: true
Explanation: The binary representation of 5 is: 101

Example 2:
Input: n = 7
Output: false
Explanation: The binary representation of 7 is: 111.

Example 3:
Input: n = 11
Output: false
Explanation: The binary representation of 11 is: 1011.

Constraints:
1 <= n <= 2^31 - 1

</> Typescript code:
*/

function hasAlternatingBits(n: number): boolean {
  // XOR n with n right-shifted by 1: if bits alternate, all bits in m should be 1s
  const m = n ^ (n >> 1);
  // A number with all 1s satisfies: (m & (m+1)) === 0 (e.g., 0b111 & 0b1000 = 0)
  return (m & (m + 1)) === 0;
}
