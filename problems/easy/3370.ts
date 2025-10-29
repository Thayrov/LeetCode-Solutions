/*
3370. Smallest Number With All Set Bits

You are given a positive number n.
Return the smallest number x greater than or equal to n, such that the binary representation of x contains only set bits

Example 1:
Input: n = 5
Output: 7
Explanation:
The binary representation of 7 is "111".

Example 2:
Input: n = 10
Output: 15
Explanation:
The binary representation of 15 is "1111".

Example 3:
Input: n = 3
Output: 3
Explanation:
The binary representation of 3 is "11".

Constraints:
1 <= n <= 1000

</> Typescript code:
*/

function smallestNumber(n: number): number {
    // Get the number of bits needed to represent n
    // Math.clz32(n) returns count of leading zeros in 32-bit representation
    // Subtracting from 32 gives us the actual bit length of n
    let bitLength = 32 - Math.clz32(n);
    
    // Create a number with 'bitLength' bits all set to 1
    // (1 << bitLength) creates 2^bitLength
    // Subtracting 1 gives us all bits set: e.g., (1 << 3) - 1 = 8 - 1 = 7 = 0b111
    let candidate = (1 << bitLength) - 1;
    
    // Check if this candidate is >= n
    // If yes, return it (n might already be all set bits like 3, 7, 15, etc.)
    // If no, we need one more bit, so return (1 << (bitLength + 1)) - 1
    // Example: n=10 needs bitLength=4, candidate=15; n=5 needs bitLength=3, candidate=7
    return candidate >= n ? candidate : (1 << (bitLength + 1)) - 1;
}
