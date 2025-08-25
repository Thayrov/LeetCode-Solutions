/*
498. Diagonal Traverse

Given an m x n matrix mat, return an array of all the elements of the array in a diagonal order.

Example 1:
Input: mat = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,4,7,5,3,6,8,9]

Example 2:
Input: mat = [[1,2],[3,4]]
Output: [1,2,3,4]
 
Constraints:
m == mat.length
n == mat[i].length
1 <= m, n <= 10^4
1 <= m * n <= 10^4
-105 <= mat[i][j] <= 10^5

</> Typescript code:
*/

function findDiagonalOrder(mat: number[][]): number[] {
    // Handle edge cases where the matrix is null or empty.
    if (!mat || mat.length === 0) {
        return [];
    }

    // Get the dimensions of the matrix.
    const m = mat.length; // Number of rows
    const n = mat[0].length; // Number of columns

    // Initialize the result array with the total number of elements.
    const result = new Array(m * n);

    // Initialize the starting position at the top-left corner.
    let row = 0;
    let col = 0;

    // Iterate through all the elements in the matrix.
    for (let i = 0; i < result.length; i++) {
        // Add the current element to the result array.
        result[i] = mat[row][col];
        
        // Determine the direction of traversal.
        // Diagonals moving up-right have an even sum of indices (row + col).
        // Diagonals moving down-left have an odd sum of indices.
        const isGoingUp = (row + col) % 2 === 0;

        // Calculate the next position based on the current direction.
        if (isGoingUp) {
            // If moving up-right:
            // Check for the right boundary first. If hit, move down.
            if (col === n - 1) {
                row++;
            // Check for the top boundary. If hit, move right.
            } else if (row === 0) {
                col++;
            // Otherwise, continue moving up and to the right.
            } else {
                row--;
                col++;
            }
        } else {
            // If moving down-left:
            // Check for the bottom boundary first. If hit, move right.
            if (row === m - 1) {
                col++;
            // Check for the left boundary. If hit, move down.
            } else if (col === 0) {
                row++;
            // Otherwise, continue moving down and to the left.
            } else {
                row++;
                col--;
            }
        }
    }

    // Return the final diagonally traversed array.
    return result;
};
