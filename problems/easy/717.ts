/*
717. 1-bit and 2-bit Characters

We have two special characters:
The first character can be represented by one bit 0.
The second character can be represented by two bits (10 or 11).
Given a binary array bits that ends with 0, return true if the last character must be a one-bit character.

Example 1:
Input: bits = [1,0,0]
Output: true
Explanation: The only way to decode it is two-bit character and one-bit character.
So the last character is one-bit character.

Example 2:
Input: bits = [1,1,1,0]
Output: false
Explanation: The only way to decode it is two-bit character and two-bit character.
So the last character is not one-bit character.

Constraints:
1 <= bits.length <= 1000
bits[i] is either 0 or 1.

</> Typescript code:
*/

function isOneBitCharacter(bits: number[]): boolean {
    // Initialize pointer to start of array
    let i = 0;
    
    // Iterate through array until we reach the last element
    // We stop at length - 1 because the last element is always 0 (given constraint)
    while (i < bits.length - 1) {
        // If bits[i] is 0: jump 1 position (0 + 1 = 1) - it's a 1-bit character
        // If bits[i] is 1: jump 2 positions (1 + 1 = 2) - it's a 2-bit character
        // This elegantly handles both cases in one expression
        i += bits[i] + 1;
    }
    
    // If we landed exactly on the last index, the last character is 1-bit (the final 0)
    // If we jumped over it (i > bits.length - 1), the last 0 was part of a 2-bit character
    return i === bits.length - 1;
}
