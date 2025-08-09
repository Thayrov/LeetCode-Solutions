/* 
231. Power of Two

Given an integer n, return true if it is a power of two. Otherwise, return false.
An integer n is a power of two, if there exists an integer x such that n == 2x.

Example 1:
Input: n = 1
Output: true
Explanation: 2^0 = 1

Example 2:
Input: n = 16
Output: true
Explanation: 2^4 = 16

Example 3:
Input: n = 3
Output: false

Constraints:
-2^31 <= n <= 2^31 - 1

Follow up: Could you solve it without loops/recursion?

</> Typescript Code:
*/

function isPowerOfTwo(n: number): boolean {
  // A number is a power of two if it is greater than 0 and
  // the binary representation of n and n-1 has no common set bits.
  // This is because powers of two in binary form have only one set bit,
  // and n-1 will have all bits set to the right of the original set bit in n.
  // The bitwise AND operation of n and n-1 will thus be 0 for powers of two.
  return n > 0 && (n & (n - 1)) === 0;
}
