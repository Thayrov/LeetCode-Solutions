/* 
2429. Minimize XOR

Given two positive integers num1 and num2, find the positive integer x such that:

x has the same number of set bits as num2, and
The value x XOR num1 is minimal.
Note that XOR is the bitwise XOR operation.

Return the integer x. The test cases are generated such that x is uniquely determined.

The number of set bits of an integer is the number of 1's in its binary representation.

Example 1:
Input: num1 = 3, num2 = 5
Output: 3
Explanation:
The binary representations of num1 and num2 are 0011 and 0101, respectively.
The integer 3 has the same number of set bits as num2, and the value 3 XOR 3 = 0 is minimal.

Example 2:
Input: num1 = 1, num2 = 12
Output: 3
Explanation:
The binary representations of num1 and num2 are 0001 and 1100, respectively.
The integer 3 has the same number of set bits as num2, and the value 3 XOR 1 = 2 is minimal.

Constraints:
1 <= num1, num2 <= 10^9

</> Typescript Code:
*/

function minimizeXor(num1: number, num2: number): number {
  // Count how many bits we must set, based on num2
  let bitsToSet = 0,
    tmp = num2;
  while (tmp > 0) {
    bitsToSet += tmp & 1; // Increment for each set bit
    tmp >>>= 1; // Shift right to count remaining bits
  }
  // We'll build the result in res
  let res = 0;
  // First pass: align set bits with num1's set bits (most significant first)
  for (let i = 31; i >= 0 && bitsToSet > 0; i--) {
    const mask = 1 << i;
    if (num1 & mask) {
      // If num1 has this bit set
      res |= mask; // Set the same bit in res
      bitsToSet--; // Decrease our remaining bits to set
    }
  }
  // Second pass: fill remaining bits to set in places num1 doesn't have set bits
  for (let i = 0; i <= 31 && bitsToSet > 0; i++) {
    const mask = 1 << i;
    if (!(num1 & mask)) {
      // If num1 has this bit zero
      res |= mask; // Set this bit in res
      bitsToSet--; // Decrease the bits to set
    }
  }
  // Return the integer that minimizes the XOR
  return res;
}
