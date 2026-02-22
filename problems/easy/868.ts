/*
868. Binary Gap

Given a positive integer n, find and return the longest distance between any two adjacent 1's in the binary representation of n. If there are no two adjacent 1's, return 0.
Two 1's are adjacent if there are only 0's separating them (possibly no 0's). The distance between two 1's is the absolute difference between their bit positions. For example, the two 1's in "1001" have a distance of 3.

Example 1:
Input: n = 22
Output: 2
Explanation: 22 in binary is "10110".
The first adjacent pair of 1's is "10110" with a distance of 2.
The second adjacent pair of 1's is "10110" with a distance of 1.
The answer is the largest of these two distances, which is 2.
Note that "10110" is not a valid pair since there is a 1 separating the two 1's underlined.

Example 2:
Input: n = 8
Output: 0
Explanation: 8 in binary is "1000".
There are not any adjacent pairs of 1's in the binary representation of 8, so we return 0.

Example 3:
Input: n = 5
Output: 2
Explanation: 5 in binary is "101".

Constraints:
1 <= n <= 10^9

</> Typescript code:
*/

function binaryGap(n: number): number {
  // Store the bit position of the previous 1 bit; -1 means "none found yet".
  let lastOnePos = -1;
  // Track the largest distance found between adjacent 1 bits.
  let maxGap = 0;
  // Track the current bit index while scanning from least significant bit to most significant bit.
  let bitPos = 0;
  // Iterate until all set bits and remaining zeros to the left are consumed.
  while (n !== 0) {
    // Check whether the current least significant bit is 1.
    if ((n & 1) !== 0) {
      // If this is not the first 1 bit, compute distance from previous 1 bit.
      if (lastOnePos !== -1) {
        // Distance between current 1 bit and previous adjacent 1 bit.
        const gap = bitPos - lastOnePos;
        // Keep the maximum distance seen so far.
        if (gap > maxGap) maxGap = gap;
      }
      // Update previous 1 bit position to current position.
      lastOnePos = bitPos;
    }
    // Logical right shift to move the next bit into the least significant position.
    n >>>= 1;
    // Advance bit position index after processing current bit.
    bitPos++;
  }
  // Return the longest distance between adjacent 1 bits, or 0 if fewer than two 1 bits exist.
  return maxGap;
}
