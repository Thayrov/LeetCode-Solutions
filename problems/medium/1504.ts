/*
1504. Count Submatrices With All Ones

Given an m x n binary matrix mat, return the number of submatrices that have all ones.

Example 1:
Input: mat = [[1,0,1],[1,1,0],[1,1,0]]
Output: 13
Explanation: 
There are 6 rectangles of side 1x1.
There are 2 rectangles of side 1x2.
There are 3 rectangles of side 2x1.
There is 1 rectangle of side 2x2. 
There is 1 rectangle of side 3x1.
Total number of rectangles = 6 + 2 + 3 + 1 + 1 = 13.

Example 2:
Input: mat = [[0,1,1,0],[0,1,1,1],[1,1,1,0]]
Output: 24
Explanation: 
There are 8 rectangles of side 1x1.
There are 5 rectangles of side 1x2.
There are 2 rectangles of side 1x3. 
There are 4 rectangles of side 2x1.
There are 2 rectangles of side 2x2. 
There are 2 rectangles of side 3x1. 
There is 1 rectangle of side 3x2. 
Total number of rectangles = 8 + 5 + 2 + 4 + 2 + 2 + 1 = 24.

Constraints:
1 <= m, n <= 150
mat[i][j] is either 0 or 1.

</> Typescript code:
*/

function numSubmat(mat: number[][]): number {
    // Get matrix dimensions.
    const m = mat.length;
    // Handle edge case of an empty matrix.
    if (m === 0) return 0;
    const n = mat[0].length;
    // Handle edge case of a matrix with empty rows.
    if (n === 0) return 0;

    // Initialize the total count of submatrices with all ones.
    let totalCount = 0;
    // `heights` array will store the height of consecutive ones ending at the current row for each column.
    const heights = new Array(n).fill(0);

    // Iterate through each row of the matrix.
    for (let i = 0; i < m; i++) {
        // Update the `heights` array for the current row `i`.
        for (let j = 0; j < n; j++) {
            // If the current cell is 1, increment the height for this column.
            // If it's 0, the streak of ones is broken, so reset the height to 0.
            heights[j] = mat[i][j] === 1 ? heights[j] + 1 : 0;
        }

        // Now, treat the `heights` array as a histogram and count the rectangles in it.
        // This is equivalent to counting all submatrices ending at the current row `i`.

        // Use a monotonic stack to find the index of the previous smaller element for each height.
        const stack: number[] = [];
        // `prevSmaller[j]` will store the index of the first bar to the left of `j` that is shorter than `heights[j]`.
        const prevSmaller = new Array(n);
        for (let j = 0; j < n; j++) {
            // While stack is not empty and the bar at the top of the stack is taller than or equal to the current bar...
            while (stack.length > 0 && heights[stack[stack.length - 1]] >= heights[j]) {
                // ...pop from the stack, as it cannot be the `prevSmaller` for `j` or any subsequent elements.
                stack.pop();
            }
            // The top of the stack is now the index of the previous smaller element. If stack is empty, there is none.
            prevSmaller[j] = stack.length === 0 ? -1 : stack[stack.length - 1];
            // Push the current index onto the stack.
            stack.push(j);
        }

        // `dp[j]` will store the total number of valid rectangles ending at column `j` for the current histogram.
        const dp = new Array(n).fill(0);
        // Iterate through the histogram heights to calculate the number of rectangles.
        for (let j = 0; j < n; j++) {
            // Get the index of the previous smaller bar.
            const k = prevSmaller[j];
            // Get the sum of rectangles ending at the previous smaller bar's position.
            // If no smaller bar exists (k === -1), this sum is 0.
            const prevSum = k === -1 ? 0 : dp[k];
            // The number of new rectangles ending at `j` is determined by the current height `heights[j]`.
            // These new rectangles span from `k+1` to `j`. The width is `j-k`.
            // The total for `j` is this new count plus the count from the previous relevant subproblem at `k`.
            dp[j] = (j - k) * heights[j] + prevSum;
            // Add the count of rectangles ending at column `j` to the overall total.
            totalCount += dp[j];
        }
    }

    // Return the final aggregated count.
    return totalCount;
};
