/*
190. Reverse Bits

Reverse bits of a given 32 bits signed integer.

Example 1:
Input: n = 43261596
Output: 964176192
Explanation:
Integer	Binary
43261596	00000010100101000001111010011100
964176192	00111001011110000010100101000000

Example 2:
Input: n = 2147483644
Output: 1073741822
Explanation:
Integer	Binary
2147483644	01111111111111111111111111111100
1073741822	00111111111111111111111111111110

Constraints:
0 <= n <= 2^31 - 2
n is even.

Follow up: If this function is called many times, how would you optimize it?

</> Typescript code:
*/

/**
 * Reverses the bits of a 32-bit signed integer.
 * This implementation uses a Divide and Conquer approach (Bit Swapping)
 * which is more performant than a loop-based approach.
 *
 * Performance: O(1) time complexity (fixed number of steps), O(1) space.
 * This handles bit blocks in parallel using bitwise masks.
 */
function reverseBits(n: number): number {
  // 1. Swap 16-bit halves: [A, B] -> [B, A]
  // (n & 0xFFFF0000) grabs upper bits, >>> 16 moves them to lower
  // (n & 0x0000FFFF) grabs lower bits, << 16 moves them to upper
  n = ((n & 0xffff0000) >>> 16) | ((n & 0x0000ffff) << 16);

  // 2. Swap 8-bit blocks within each 16-bit half: [A,B, C,D] -> [B,A, D,C]
  n = ((n & 0xff00ff00) >>> 8) | ((n & 0x00ff00ff) << 8);

  // 3. Swap 4-bit blocks (nibbles): [A,B,C,D, ...] -> [B,A,D,C, ...]
  n = ((n & 0xf0f0f0f0) >>> 4) | ((n & 0x0f0f0f0f) << 4);

  // 4. Swap 2-bit blocks: [00, 11] -> [11, 00]
  n = ((n & 0xcccccccc) >>> 2) | ((n & 0x33333333) << 2);

  // 5. Swap adjacent bits: [0, 1] -> [1, 0]
  n = ((n & 0xaaaaaaaa) >>> 1) | ((n & 0x55555555) << 1);

  // 6. JavaScript bitwise ops return signed 32-bit integers.
  // >>> 0 (unsigned right shift) converts the result back to an unsigned 32-bit integer.
  return n >>> 0;
}
