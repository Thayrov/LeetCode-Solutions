/*
2536. Increment Submatrices by One

You are given a positive integer n, indicating that we initially have an n x n 0-indexed integer matrix mat filled with zeroes.
You are also given a 2D integer array query. For each query[i] = [row1i, col1i, row2i, col2i], you should do the following operation:
Add 1 to every element in the submatrix with the top left corner (row1i, col1i) and the bottom right corner (row2i, col2i). That is, add 1 to mat[x][y] for all row1i <= x <= row2i and col1i <= y <= col2i.
Return the matrix mat after performing every query.

Example 1:
Input: n = 3, queries = [[1,1,2,2],[0,0,1,1]]
Output: [[1,1,0],[1,2,1],[0,1,1]]
Explanation: The diagram above shows the initial matrix, the matrix after the first query, and the matrix after the second query.
- In the first query, we add 1 to every element in the submatrix with the top left corner (1, 1) and bottom right corner (2, 2).
- In the second query, we add 1 to every element in the submatrix with the top left corner (0, 0) and bottom right corner (1, 1).

Example 2:
Input: n = 2, queries = [[0,0,1,1]]
Output: [[1,1],[1,1]]
Explanation: The diagram above shows the initial matrix and the matrix after the first query.
- In the first query we add 1 to every element in the matrix.

Constraints:
1 <= n <= 500
1 <= queries.length <= 10^4
0 <= row1i <= row2i < n
0 <= col1i <= col2i < n

</> Typescript code:
*/

function rangeAddQueries(n: number, queries: number[][]): number[][] {
    // Create a 2D difference array with extra row and column to handle boundaries
    // Size (n+1) x (n+1) allows us to mark boundaries without index checks
    const diff = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
    
    // Process each query using 2D difference array technique
    // This marks the corners of each rectangle instead of updating every cell
    for (const [r1, c1, r2, c2] of queries) {
        // Mark top-left corner: increment starts here
        diff[r1][c1]++;
        // Mark boundary after right edge: decrement to stop horizontal spread
        diff[r1][c2 + 1]--;
        // Mark boundary after bottom edge: decrement to stop vertical spread
        diff[r2 + 1][c1]--;
        // Mark bottom-right boundary corner: increment to cancel double-decrement
        diff[r2 + 1][c2 + 1]++;
    }
    
    // First pass: compute prefix sum horizontally (left to right)
    // This propagates the increments/decrements across each row
    for (let i = 0; i < n; i++) {
        for (let j = 1; j < n; j++) {
            diff[i][j] += diff[i][j - 1];
        }
    }
    
    // Second pass: compute prefix sum vertically (top to bottom)
    // This propagates the values down each column to get final result
    for (let j = 0; j < n; j++) {
        for (let i = 1; i < n; i++) {
            diff[i][j] += diff[i - 1][j];
        }
    }
    
    // Remove the extra row used for boundary marking
    diff.pop();
    // Remove the extra column from each remaining row
    for (let i = 0; i < n; i++) {
        diff[i].pop();
    }
    
    // Return the final n x n matrix with all queries applied
    return diff;
}
