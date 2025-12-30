/*
840. Magic Squares In Grid

A 3 x 3 magic square is a 3 x 3 grid filled with distinct numbers from 1 to 9 such that each row, column, and both diagonals all have the same sum.

Given a row x col grid of integers, how many 3 x 3 contiguous magic square subgrids are there?

Note: while a magic square can only contain numbers from 1 to 9, grid may contain numbers up to 15.

Example 1:
Input: grid = [[4,3,8,4],[9,5,1,9],[2,7,6,2]]
Output: 1
Explanation:
The following subgrid is a 3 x 3 magic square:
while this one is not:
In total, there is only one magic square inside the given grid.

Example 2:
Input: grid = [[8]]
Output: 0

Constraints:
row == grid.length
col == grid[i].length
1 <= row, col <= 10
0 <= grid[i][j] <= 15

</> Typescript Code:
*/

function numMagicSquaresInside(grid: number[][]): number {
  let count = 0; // Initialize the count of magic squares found
  const isMagicSquare = (x: number, y: number): boolean => {
    const nums = new Set<number>(); // Set to store unique numbers
    let sum = 0; // Variable to store the sum of the first row
    for (let i = 0; i < 3; i++) {
      // Iterate through 3 rows
      for (let j = 0; j < 3; j++) {
        // Iterate through 3 columns
        const val = grid[x + i][y + j]; // Get the current value
        if (val < 1 || val > 9 || nums.has(val)) return false; // Check if the value is out of range or duplicate
        nums.add(val); // Add value to the set
        if (i === 0) sum += val; // Add to sum only from the first row
      }
    }
    // Check sums of rows and columns
    for (let i = 0; i < 3; i++) {
      let rowSum = 0,
        colSum = 0; // Initialize sums for current row and column
      for (let j = 0; j < 3; j++) {
        rowSum += grid[x + i][y + j]; // Sum the current row
        colSum += grid[x + j][y + i]; // Sum the current column
      }
      if (rowSum !== sum || colSum !== sum) return false; // Check if sums match the first row
    }
    // Check sums of the two diagonals
    const diag1 = grid[x][y] + grid[x + 1][y + 1] + grid[x + 2][y + 2]; // Sum of left-to-right diagonal
    const diag2 = grid[x][y + 2] + grid[x + 1][y + 1] + grid[x + 2][y]; // Sum of right-to-left diagonal
    return diag1 === sum && diag2 === sum; // Return true if both diagonals match the sum
  };
  // Iterate through the grid to check every 3x3 subgrid
  for (let i = 0; i <= grid.length - 3; i++) {
    for (let j = 0; j <= grid[0].length - 3; j++) {
      if (isMagicSquare(i, j)) count++; // Increment count if a magic square is found
    }
  }
  return count; // Return the total count of magic squares found
}
