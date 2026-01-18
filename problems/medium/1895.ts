/*
1895. Largest Magic Square

A k x k magic square is a k x k grid filled with integers such that every row sum, every column sum, and both diagonal sums are all equal. The integers in the magic square do not have to be distinct. Every 1 x 1 grid is trivially a magic square.
Given an m x n integer grid, return the size (i.e., the side length k) of the largest magic square that can be found within this grid.

Example 1:
Input: grid = [[7,1,4,5,6],[2,5,1,6,4],[1,5,4,3,2],[1,2,7,3,4]]
Output: 3
Explanation: The largest magic square has a size of 3.
Every row sum, column sum, and diagonal sum of this magic square is equal to 12.
- Row sums: 5+1+6 = 5+4+3 = 2+7+3 = 12
- Column sums: 5+5+2 = 1+4+7 = 6+3+3 = 12
- Diagonal sums: 5+4+3 = 6+4+2 = 12

Example 2:
Input: grid = [[5,1,3,1],[9,3,3,1],[1,3,3,8]]
Output: 2

onstraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 50
1 <= grid[i][j] <= 10^6

</> Typescript code:
*/

function largestMagicSquare(grid: number[][]): number {
    const m = grid.length, n = grid[0].length;
    // Pre-allocate prefix sum arrays for rows, columns, and both diagonals to allow O(1) sum retrieval
    const rowSum = Array.from({ length: m }, () => new Int32Array(n + 1));
    const colSum = Array.from({ length: m + 1 }, () => new Int32Array(n));
    const diag = Array.from({ length: m + 1 }, () => new Int32Array(n + 1));
    const antiDiag = Array.from({ length: m + 1 }, () => new Int32Array(n + 1));

    // Fill prefix sum tables
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            rowSum[i][j + 1] = rowSum[i][j] + grid[i][j];
            colSum[i + 1][j] = colSum[i][j] + grid[i][j];
            diag[i + 1][j + 1] = diag[i][j] + grid[i][j];
            // Anti-diagonal prefix sum (top-right to bottom-left)
            antiDiag[i + 1][j] = antiDiag[i][j + 1] + grid[i][j];
        }
    }

    // Iterate side length k from largest possible down to 2
    for (let k = Math.min(m, n); k > 1; k--) {
        // Iterate through all possible top-left corners (i, j)
        for (let i = 0; i <= m - k; i++) {
            for (let j = 0; j <= n - k; j++) {
                // Determine the target sum from the first row of this k x k subgrid
                const target = rowSum[i][j + k] - rowSum[i][j];
                let isMagic = true;

                // Check primary diagonal sum
                if (diag[i + k][j + k] - diag[i][j] !== target) continue;
                // Check anti-diagonal sum
                if (antiDiag[i + k][j] - antiDiag[i][j + k] !== target) continue;

                // Verify all remaining row sums in the subgrid
                for (let r = i + 1; r < i + k; r++) {
                    if (rowSum[r][j + k] - rowSum[r][j] !== target) {
                        isMagic = false;
                        break;
                    }
                }
                if (!isMagic) continue;

                // Verify all column sums in the subgrid
                for (let c = j; c < j + k; c++) {
                    if (colSum[i + k][c] - colSum[i][c] !== target) {
                        isMagic = false;
                        break;
                    }
                }
                // If all checks pass, we found the largest magic square
                if (isMagic) return k;
            }
        }
    }
    // Default return 1 as every 1x1 is a magic square
    return 1;
}
