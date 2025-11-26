/*
2435. Paths in Matrix Whose Sum Is Divisible by K

You are given a 0-indexed m x n integer matrix grid and an integer k. You are currently at position (0, 0) and you want to reach position (m - 1, n - 1) moving only down or right.
Return the number of paths where the sum of the elements on the path is divisible by k. Since the answer may be very large, return it modulo 109 + 7.

Example 1:
Input: grid = [[5,2,4],[3,0,5],[0,7,2]], k = 3
Output: 2
Explanation: There are two paths where the sum of the elements on the path is divisible by k.
The first path highlighted in red has a sum of 5 + 2 + 4 + 5 + 2 = 18 which is divisible by 3.
The second path highlighted in blue has a sum of 5 + 3 + 0 + 5 + 2 = 15 which is divisible by 3.

Example 2:
Input: grid = [[0,0]], k = 5
Output: 1
Explanation: The path highlighted in red has a sum of 0 + 0 = 0 which is divisible by 5.

Example 3:
Input: grid = [[7,3,4,9],[2,3,6,2],[2,3,7,0]], k = 1
Output: 10
Explanation: Every integer is divisible by 1 so the sum of the elements on every possible path is divisible by k.
 
Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 5 * 10^4
1 <= m * n <= 5 * 10^4
0 <= grid[i][j] <= 100
1 <= k <= 50

</> Typescript code:
*/

// 2435. Paths in Matrix Whose Sum Is Divisible by K
// DP solution tracking remainder states with space optimization using rolling arrays

function numberOfPaths(grid: number[][], k: number): number {
    // Modulo for large number handling as per problem requirement
    const MOD = 1000000007;
    // Get grid dimensions
    const m = grid.length, n = grid[0].length;
    // prev[j][r] = number of paths to reach column j with sum ≡ r (mod k) in previous row
    let prev: Uint32Array[] = Array.from({length: n}, () => new Uint32Array(k));
    // curr[j][r] = same for current row (rolling array optimization)
    let curr: Uint32Array[] = Array.from({length: n}, () => new Uint32Array(k));
    // Base case: starting cell (0,0) has 1 path with remainder = grid[0][0] % k
    prev[0][grid[0][0] % k] = 1;
    // Initialize first row: can only come from left
    for (let j = 1; j < n; j++) {
        // Precompute cell value mod k
        const v = grid[0][j] % k;
        // For each possible remainder from previous cell
        for (let r = 0; r < k; r++) 
            // If there are paths with remainder r, extend them
            if (prev[j-1][r]) prev[j][(r + v) % k] = prev[j-1][r];
    }
    // Process remaining rows
    for (let i = 1; i < m; i++) {
        // Reset current row arrays
        for (let j = 0; j < n; j++) curr[j].fill(0);
        // First column: can only come from above
        for (let r = 0; r < k; r++) 
            if (prev[0][r]) curr[0][(r + grid[i][0]) % k] = prev[0][r];
        // Process remaining columns: can come from above or left
        for (let j = 1; j < n; j++) {
            // Precompute cell value mod k
            const v = grid[i][j] % k;
            // For each possible incoming remainder
            for (let r = 0; r < k; r++) {
                // Sum paths from top (prev row) and left (curr row, previous col)
                const sum = (prev[j][r] + curr[j-1][r]) % MOD;
                // If there are paths, add to new remainder state
                if (sum) curr[j][(r + v) % k] = (curr[j][(r + v) % k] + sum) % MOD;
            }
        }
        // Swap arrays for next iteration (rolling array technique)
        [prev, curr] = [curr, prev];
    }
    // Return count of paths reaching bottom-right with sum ≡ 0 (mod k)
    return prev[n-1][0];
}
