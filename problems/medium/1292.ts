/*
1292. Maximum Side Length of a Square with Sum Less than or Equal to Threshold

Given a m x n matrix mat and an integer threshold, return the maximum side-length of a square with a sum less than or equal to threshold or return 0 if there is no such square.

Example 1:
Input: mat = [[1,1,3,2,4,3,2],[1,1,3,2,4,3,2],[1,1,3,2,4,3,2]], threshold = 4
Output: 2
Explanation: The maximum side length of square with sum less than 4 is 2 as shown.

Example 2:
Input: mat = [[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2]], threshold = 1
Output: 0

Constraints:
    m == mat.length
    n == mat[i].length
    1 <= m, n <= 300
    0 <= mat[i][j] <= 10^4
    0 <= threshold <= 10^5

</> Typescript code:
*/

function maxSideLength(mat: number[][], threshold: number): number {
    const m = mat.length; // Get row count
    const n = mat[0].length; // Get column count
    // Initialize 2D Prefix Sum array with 0s; Int32Array is faster for arithmetic
    const pref = Array.from({ length: m + 1 }, () => new Int32Array(n + 1));

    // Fill the Prefix Sum table: Each cell contains the sum of the rectangle from (0,0) to (i,j)
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // Addition of current element + neighbors - diagonal (inclusion-exclusion principle)
            pref[i][j] = mat[i - 1][j - 1] + pref[i - 1][j] + pref[i][j - 1] - pref[i - 1][j - 1];
        }
    }

    let res = 0; // Variable to store the max side length found
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // While a square of size 'res + 1' fits within the remaining matrix bounds
            while (i + res <= m && j + res <= n) {
                const ni = i + res; // Bottom-right row index
                const nj = j + res; // Bottom-right column index
                // Calculate sub-rectangle sum in O(1) using the precomputed table
                const sum = pref[ni][nj] - pref[i - 1][nj] - pref[ni][j - 1] + pref[i - 1][j - 1];
                
                // If sum is within threshold, increment side length and check for even larger squares
                if (sum <= threshold) {
                    res++;
                } else {
                    // If sum exceeds threshold, the current (i,j) cannot start a larger square
                    break;
                }
            }
        }
    }
    return res; // Final maximum side length
}
