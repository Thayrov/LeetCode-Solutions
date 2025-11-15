/*
3234. Count the Number of Substrings With Dominant Ones

You are given a binary string s.
Return the number of substrings with dominant ones.
A string has dominant ones if the number of ones in the string is greater than or equal to the square of the number of zeros in the string.

Example 1:
Input: s = "00011"
Output: 5
Explanation:
The substrings with dominant ones are shown in the table below.
i	j	s[i..j]	Number of Zeros	Number of Ones
3	3	1	0	1
4	4	1	0	1
2	3	01	1	1
3	4	11	0	2
2	4	011	1	2

Example 2:
Input: s = "101101"
Output: 16
Explanation:
The substrings with non-dominant ones are shown in the table below.
Since there are 21 substrings total and 5 of them have non-dominant ones, it follows that there are 16 substrings with dominant ones.
i	j	s[i..j]	Number of Zeros	Number of Ones
1	1	0	1	0
4	4	0	1	0
1	4	0110	2	2
0	4	10110	2	3
1	5	01101	2	3

Constraints:
1 <= s.length <= 4 * 10^4
s consists only of characters '0' and '1'.

</> Typescript code:
*/

function numberOfSubstrings(s: string): number {
    const n = s.length; // Get the total length of the string.
    let count = 0; // Initialize the total count of dominant substrings.
    const zeroPos: number[] = []; // Array to store the indices of all '0's.
    
    // First pass: Find all positions of '0'.
    for (let i = 0; i < n; i++) {
        if (s[i] === '0') {
            zeroPos.push(i);
        }
    }

    // --- Case 1: Substrings with z = 0 zeros ---
    // These are substrings containing only '1's.
    let k = 0; // Length of the current contiguous block of '1's.
    for (let i = 0; i < n; i++) {
        if (s[i] === '1') {
            k++; // Increment block length.
        } else {
            // When we hit a '0', the block of '1's ends.
            // A block of length k has k*(k+1)/2 substrings.
            count += (k * (k + 1)) / 2;
            k = 0; // Reset block length.
        }
    }
    // Add the count for the last block of '1's (if the string ends with '1').
    count += (k * (k + 1)) / 2;

    // --- Case 2: Substrings with z > 0 zeros ---
    // We only need to check up to maxZeros = sqrt(n).
    // If z > sqrt(n), then z*z > n. Since ones <= n, ones >= z*z is impossible.
    const maxZeros = Math.floor(Math.sqrt(n));
    
    // Create a list of zero indices with sentinels at the beginning (-1) and end (n).
    // These sentinels simplify boundary calculations.
    const zeroIndices = [-1, ...zeroPos, n];
    const numZeroIndices = zeroIndices.length;

    // Iterate through all possible numbers of zeros, from 1 to maxZeros.
    for (let z = 1; z <= maxZeros; z++) {
        // Iterate through all possible groups of `z` consecutive zeros.
        // `i` is the starting index in `zeroIndices` for the group.
        // We stop at `numZeroIndices - z` so that `i + z` (for nextZeroIdx) is a valid index.
        for (let i = 1; i < numZeroIndices - z; i++) {
            // Get the actual string indices for the start and end of the '0's group.
            const startZeroIdx = zeroIndices[i];
            const endZeroIdx = zeroIndices[i + z - 1];
            
            // Get the indices of the '0's that act as boundaries for this group.
            const prevZeroIdx = zeroIndices[i - 1]; // '0' before the group
            const nextZeroIdx = zeroIndices[i + z];   // '0' after the group

            // Calculate '1's *between* the '0's of this group.
            const onesBetween = (endZeroIdx - startZeroIdx + 1) - z;
            
            // Calculate max '1's we can add to the left.
            const maxL = startZeroIdx - (prevZeroIdx + 1);
            // Calculate max '1's we can add to the right.
            const maxR = (nextZeroIdx - 1) - endZeroIdx;

            // Calculate the minimum number of '1's we need to add from the left/right.
            // ones = L + R + onesBetween. We need ones >= z*z.
            // So, L + R >= z*z - onesBetween.
            const neededOnes = z * z - onesBetween;

            // Iterate through all possible '1's to add from the left (L).
            // This loop's total iterations across all `i` is O(n), not O(n^2).
            for (let L = 0; L <= maxL; L++) {
                // For a given L, calculate the minimum '1's needed from the right (R).
                // R >= neededOnes - L. R must also be >= 0.
                const minR = Math.max(0, neededOnes - L);
                
                // If the minimum required R is possible (i.e., <= maxR)...
                if (minR <= maxR) {
                    // ...then all values of R from minR to maxR are valid.
                    // The number of valid R values is (maxR - minR + 1).
                    // Each one forms a valid substring.
                    count += (maxR - minR + 1);
                }
            }
        }
    }

    return count; // Return the total count.
}
