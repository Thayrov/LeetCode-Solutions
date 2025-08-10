/*
869. Reordered Power of 2

You are given an integer n. We reorder the digits in any order (including the original order) such that the leading digit is not zero.
Return true if and only if we can do this so that the resulting number is a power of two.

Example 1:
Input: n = 1
Output: true

Example 2:
Input: n = 10
Output: false

Constraints:
1 <= n <= 10^9

</> Typescript code:
*/

function reorderedPowerOf2(n: number): boolean {
    // Helper function to count frequency of each digit (0-9) in a number
    const getDigitCount = (num: number): number[] => {
        // Initialize array with 10 zeros, one for each digit 0-9
        const count = new Array(10).fill(0);
        // Extract each digit from right to left
        while (num > 0) {
            // Increment count for the rightmost digit
            count[num % 10]++;
            // Remove the rightmost digit
            num = Math.floor(num / 10);
        }
        // Return the frequency array
        return count;
    };

    // Precomputed array of all powers of 2 from 2^0 to 2^30 (covers 1 to 10^9 range)
    // Using precomputed values avoids repeated Math.pow calculations for better performance
    const powersOf2 = [
        1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 
        131072, 262144, 524288, 1048576, 2097152, 4194304, 8388608, 16777216, 33554432, 
        67108864, 134217728, 268435456, 536870912, 1073741824
    ];

    // Get digit frequency signature of input number n
    const nCount = getDigitCount(n);
    
    // Check each power of 2 to see if it has the same digit frequency as n
    for (const power of powersOf2) {
        // Get digit frequency signature of current power of 2
        const powerCount = getDigitCount(power);
        // Flag to track if all digit frequencies match
        let match = true;
        // Compare frequency of each digit (0-9)
        for (let i = 0; i < 10; i++) {
            // If any digit frequency doesn't match, this power of 2 is not valid
            if (nCount[i] !== powerCount[i]) {
                match = false;
                // Early break for performance - no need to check remaining digits
                break;
            }
        }
        // If all digit frequencies match, n can be rearranged to form this power of 2
        if (match) return true;
    }
    
    // No power of 2 has the same digit frequency signature as n
    return false;
}
