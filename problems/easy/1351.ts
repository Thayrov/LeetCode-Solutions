/*
1351. Count Negative Numbers in a Sorted Matrix

Given a m x n matrix grid which is sorted in non-increasing order both row-wise and column-wise, return the number of negative numbers in grid.

Example 1:
Input: grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]
Output: 8
Explanation: There are 8 negatives number in the matrix.

Example 2:
Input: grid = [[3,2],[1,0]]
Output: 0

Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 100
-100 <= grid[i][j] <= 100

Follow up: Could you find an O(n + m) solution?

</> Typescript code:
*/

function countNegatives(grid: number[][]): number {
    const m = grid.length; // Get the number of rows
    const n = grid[0].length; // Get the number of columns
    let count = 0; // Initialize the total count of negative numbers
    let r = m - 1; // Start at the last row (bottom-left approach)
    let c = 0; // Start at the first column

    // Traverse the matrix while within row and column bounds
    while (r >= 0 && c < n) {
        // If the current element is negative, all elements to its right in this row are also negative
        if (grid[r][c] < 0) {
            // Add the remaining width of the row to the count
            count += n - c;
            // Move up to the previous row to find the next boundary
            r--;
        } else {
            // If current element is non-negative, move right to find a negative number
            c++;
        }
    }

    // Return the total accumulated count
    return count;
}
