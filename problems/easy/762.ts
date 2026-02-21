/*
762. Prime Number of Set Bits in Binary Representation

Given two integers left and right, return the count of numbers in the inclusive range [left, right] having a prime number of set bits in their binary representation.
Recall that the number of set bits an integer has is the number of 1's present when written in binary.
For example, 21 written in binary is 10101, which has 3 set bits.

Example 1:
Input: left = 6, right = 10
Output: 4
Explanation:
6  -> 110 (2 set bits, 2 is prime)
7  -> 111 (3 set bits, 3 is prime)
8  -> 1000 (1 set bit, 1 is not prime)
9  -> 1001 (2 set bits, 2 is prime)
10 -> 1010 (2 set bits, 2 is prime)
4 numbers have a prime number of set bits.

Example 2:
Input: left = 10, right = 15
Output: 5
Explanation:
10 -> 1010 (2 set bits, 2 is prime)
11 -> 1011 (3 set bits, 3 is prime)
12 -> 1100 (2 set bits, 2 is prime)
13 -> 1101 (3 set bits, 3 is prime)
14 -> 1110 (3 set bits, 3 is prime)
15 -> 1111 (4 set bits, 4 is not prime)
5 numbers have a prime number of set bits.

Constraints:
1 <= left <= right <= 10^6
0 <= right - left <= 10^4

</> Typescript code:
*/

function countPrimeSetBits(left: number, right: number): number {
  // Initialize a counter to track how many numbers match our prime set bits condition.
  let count = 0;
  // Iterate inclusively from the 'left' boundary up to the 'right' boundary.
  for (let i = left; i <= right; i++) {
    // Copy the current integer index into the mutable local variable 'n' for bitwise processing.
    let n = i;
    // SWAR Step 1: Subdivide 'n' into 2-bit chunks, getting their set bits count by subtracting the upper bit.
    n -= (n >>> 1) & 0x55555555;
    // SWAR Step 2: Sum the set bits up from grouped adjacent 2-bit chunks, combining them into 4-bit chunks.
    n = (n & 0x33333333) + ((n >>> 2) & 0x33333333);
    // SWAR Step 3: Mask blocks up to 8 bits, scale them across chunks using multi-bit multiplication, and shift right to resolve total sum integer.
    n = (((n + (n >>> 4)) & 0x0f0f0f0f) * 0x01010101) >>> 24;
    // Shift the precomputed prime bitmask (0xA28AC) right by 'n' places, AND it with 1 to tally the non-branching success states directly into the count.
    count += (0xa28ac >>> n) & 1;
  }
  // Return the accumulated total of numbers containing a prime amount of set bits.
  return count;
}
