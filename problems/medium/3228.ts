/*
3228. Maximum Number of Operations to Move Ones to the End

You are given a binary string s.
You can perform the following operation on the string any number of times:
Choose any index i from the string where i + 1 < s.length such that s[i] == '1' and s[i + 1] == '0'.
Move the character s[i] to the right until it reaches the end of the string or another '1'. For example, for s = "010010", if we choose i = 1, the resulting string will be s = "000110".
Return the maximum number of operations that you can perform.

Example 1:
Input: s = "1001101"
Output: 4
Explanation:
We can perform the following operations:
Choose index i = 0. The resulting string is s = "0011101".
Choose index i = 4. The resulting string is s = "0011011".
Choose index i = 3. The resulting string is s = "0010111".
Choose index i = 2. The resulting string is s = "0001111".

Example 2:
Input: s = "00111"
Output: 0

Constraints:
1 <= s.length <= 10^5
s[i] is either '0' or '1'.

</> Typescript code:
*/

/**
 * Calculates the maximum number of operations to move ones to the end.
 *
 * The problem can be simplified by analyzing what an "operation" really costs.
 * An operation is:
 * 1. Choose `i` where `s[i] == '1'` and `s[i+1] == '0'`.
 * 2. The `'1'` at `s[i]` moves right, past all consecutive `'0'`s, until it
 * hits another `'1'` or the end of the string.
 *
 * This means a block of `1`s (e.g., "111") followed by a block of `0`s ("00")
 * will eventually "jump" the `0`s.
 * Example: "11100..."
 * - The '1' at index 2 moves: "11010..." (Op 1)
 * - The '1' at index 1 moves: "10110..." (Op 2)
 * - The '1' at index 0 moves: "01110..." (Op 3)
 *
 * Notice that the "111" block moving past the *first* '0' costs 3 operations (equal
 * to the number of '1's in the block). The subsequent '0's don't cost anything
 * new, as the block is already "in motion" and will skip them all as part of
 * the same set of operations.
 *
 * This gives us a key insight:
 * We can iterate through the string, counting consecutive '1's (`onesCount`).
 * When we encounter the *first* '0' immediately after a block of '1's,
 * we add `onesCount` to our `totalOps`.
 * We then reset a flag (`inOnesBlock`) so we don't add ops for subsequent '0's
 * in the same block.
 * When we see a '1' again, it adds to our `onesCount` (merging with the
 * previous block) and we set the flag again.
 *
 * Example: "1001101"
 * i=0, s[0]='1': onesCount=1, inOnesBlock=true
 * i=1, s[1]='0': inOnesBlock is true. totalOps += onesCount (1). totalOps=1. inOnesBlock=false.
 * i=2, s[2]='0': inOnesBlock is false. Do nothing.
 * i=3, s[3]='1': onesCount=2, inOnesBlock=true
 * i=4, s[4]='1': onesCount=3, inOnesBlock=true
 * i=5, s[5]='0': inOnesBlock is true. totalOps += onesCount (3). totalOps=4. inOnesBlock=false.
 * i=6, s[6]='1': onesCount=4, inOnesBlock=true
 *
 * End: return totalOps (4). This matches the example.
 */
function maxOperations(s: string): number {
    // Total operations performed
    let totalOps = 0;
    
    // Running count of '1's in the current "moving" block
    let onesCount = 0;
    
    // Flag to track if we are currently in a block of '1's
    // This ensures we only add operations for the *first* '0' after a '1' block.
    let inOnesBlock = false;

    // Iterate through the string character by character
    for (let i = 0; i < s.length; i++) {
        
        // If the character is '1'
        if (s[i] === '1') {
            // Add it to our count of '1's
            onesCount++;
            // Set the flag, as we are now (or still) in a block of '1's
            inOnesBlock = true;
        } 
        // If the character is '0'
        else {
            // Check if this '0' immediately follows a block of '1's
            if (inOnesBlock) {
                // If so, this '0' "unlocks" `onesCount` operations.
                // Each '1' in the block will eventually have to move.
                totalOps += onesCount;
                
                // Reset the flag. Any subsequent '0's are part of the same
                // "gap" and don't trigger new operations.
                inOnesBlock = false;
            }
        }
    }

    // Return the total accumulated operations
    return totalOps;
};
