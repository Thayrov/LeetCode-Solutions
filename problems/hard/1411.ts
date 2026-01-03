/*
1411. Number of Ways to Paint N × 3 Grid

You have a grid of size n x 3 and you want to paint each cell of the grid with exactly one of the three colors: Red, Yellow, or Green while making sure that no two adjacent cells have the same color (i.e., no two cells that share vertical or horizontal sides have the same color).
Given n the number of rows of the grid, return the number of ways you can paint this grid. As the answer may grow large, the answer must be computed modulo 109 + 7.

Example 1:
Input: n = 1
Output: 12
Explanation: There are 12 possible way to paint the grid as shown.

Example 2:
Input: n = 5000
Output: 30228214

Constraints:
n == grid.length
1 <= n <= 5000

</> Typescript code:
*/

function numOfWays(n: number): number {
    // Define the modulo constant to prevent integer overflow as per problem constraints
    const MOD = 1000000007;
    
    // Initial state for n = 1: 
    // There are 6 ways to paint a row with 2 colors (ABA) and 6 ways with 3 colors (ABC).
    let aba = 6; 
    let abc = 6;

    // Iterate from the second row up to n
    for (let i = 1; i < n; i++) {
        // Cache current values to calculate transitions for the next row
        const prevAba = aba;
        const prevAbc = abc;

        // Pattern transition logic:
        // Each ABA row at i-1 can produce 3 ABA and 2 ABC patterns at row i.
        // Each ABC row at i-1 can produce 2 ABA and 2 ABC patterns at row i.
        aba = (3 * prevAba + 2 * prevAbc) % MOD;
        abc = (2 * prevAba + 2 * prevAbc) % MOD;
    }

    // The total ways is the sum of both pattern types for the n-th row
    return (aba + abc) % MOD;
}
