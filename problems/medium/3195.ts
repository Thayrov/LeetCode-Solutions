/*
3195. Find the Minimum Area to Cover All Ones I

You are given a 2D binary array grid. Find a rectangle with horizontal and vertical sides with the smallest area, such that all the 1's in grid lie inside this rectangle.
Return the minimum possible area of the rectangle.

Example 1:
Input: grid = [[0,1,0],[1,0,1]]
Output: 6
Explanation:
The smallest rectangle has a height of 2 and a width of 3, so it has an area of 2 * 3 = 6.

Example 2:
Input: grid = [[1,0],[0,0]]
Output: 1
Explanation:
The smallest rectangle has both height and width 1, so its area is 1 * 1 = 1.

Constraints:
1 <= grid.length, grid[i].length <= 1000
grid[i][j] is either 0 or 1.
The input is generated such that there is at least one 1 in grid.

</> Typescript code:
*/

function minimumArea(grid: number[][]): number {
    // Initialize minRow and minCol to a very large value to ensure the first '1' found will set the initial boundary.
    let minRow = Infinity;
    let minCol = Infinity;
    
    // Initialize maxRow and maxCol to a very small value to ensure the first '1' found will set the initial boundary.
    let maxRow = -Infinity;
    let maxCol = -Infinity;

    // Iterate over each row of the grid using its index 'i'.
    for (let i = 0; i < grid.length; i++) {
        // Iterate over each column in the current row using its index 'j'.
        for (let j = 0; j < grid[i].length; j++) {
            // Check if the current cell contains a '1'.
            if (grid[i][j] === 1) {
                // If a '1' is found, update the top-most row boundary (minRow).
                minRow = Math.min(minRow, i);
                // Update the bottom-most row boundary (maxRow).
                maxRow = Math.max(maxRow, i);
                // Update the left-most column boundary (minCol).
                minCol = Math.min(minCol, j);
                // Update the right-most column boundary (maxCol).
                maxCol = Math.max(maxCol, j);
            }
        }
    }

    // Calculate the height of the bounding rectangle. Add 1 to account for zero-based indexing.
    const height = maxRow - minRow + 1;
    // Calculate the width of the bounding rectangle. Add 1 to account for zero-based indexing.
    const width = maxCol - minCol + 1;

    // Return the total area of the minimum bounding rectangle.
    return height * width;
};
