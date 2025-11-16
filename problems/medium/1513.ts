/*
1513. Number of Substrings With Only 1s

Given a binary string s, return the number of substrings with all characters 1's. Since the answer may be too large, return it modulo 109 + 7.

Example 1:
Input: s = "0110111"
Output: 9
Explanation: There are 9 substring in total with only 1's characters.
"1" -> 5 times.
"11" -> 3 times.
"111" -> 1 time.

Example 2:
Input: s = "101"
Output: 2
Explanation: Substring "1" is shown 2 times in s.

Example 3:
Input: s = "111111"
Output: 21
Explanation: Each substring contains only 1's characters.

Constraints:
1 <= s.length <= 10^5
s[i] is either '0' or '1'.

</> Typescript code:
*/

function numSub(s: string): number {
    // Define the modulo constant as per problem requirements
    const MOD = 1000000007;
    
    // Initialize result accumulator for total substring count
    let result = 0;
    
    // Track the length of current consecutive '1's sequence
    let count = 0;
    
    // Iterate through each character in the string
    for (let i = 0; i < s.length; i++) {
        // If current char is '1', increment count; otherwise reset to 0
        // This maintains the length of consecutive '1's ending at position i
        count = s[i] === '1' ? count + 1 : 0;
        
        // Add count to result: if we have n consecutive '1's ending at i,
        // we can form n new substrings (all ending at position i)
        // Apply modulo to prevent integer overflow
        result = (result + count) % MOD;
    }
    
    // Return the total count of substrings containing only '1's
    return result;
}
