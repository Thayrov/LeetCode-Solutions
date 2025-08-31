/*
37. Sudoku Solver

Write a program to solve a Sudoku puzzle by filling the empty cells.
A sudoku solution must satisfy all of the following rules:
Each of the digits 1-9 must occur exactly once in each row.
Each of the digits 1-9 must occur exactly once in each column.
Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
The '.' character indicates empty cells.

Example 1:
Input: board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
Output: [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
Explanation: The input board is shown above and the only valid solution is shown below:

Constraints:
board.length == 9
board[i].length == 9
board[i][j] is a digit or '.'.
It is guaranteed that the input board has only one solution.

</> Typescript code:
*/

/**
 Do not return anything, modify board in-place instead.
 */
 function solveSudoku(board: string[][]): void {
     // Bitmasks to track used numbers in each row, column, and 3x3 box
     const rows = new Array(9).fill(0);    // Bitmask for each row
     const cols = new Array(9).fill(0);    // Bitmask for each column  
     const boxes = new Array(9).fill(0);   // Bitmask for each 3x3 box
     
     // Initialize bitmasks by scanning existing numbers on the board
     for (let i = 0; i < 9; i++) {
         for (let j = 0; j < 9; j++) {
             if (board[i][j] !== '.') {
                 // Convert character digit to integer
                 const num = parseInt(board[i][j]);
                 // Create bitmask with bit at position 'num' set to 1
                 const bit = 1 << num;
                 // Calculate which 3x3 box this cell belongs to (0-8)
                 const boxIdx = Math.floor(i / 3) * 3 + Math.floor(j / 3);
                 // Mark this number as used in row, column, and box
                 rows[i] |= bit;
                 cols[j] |= bit;
                 boxes[boxIdx] |= bit;
             }
         }
     }
     
     // Recursive backtracking function to solve the puzzle
     function solve(): boolean {
         // Iterate through each cell on the board
         for (let i = 0; i < 9; i++) {
             for (let j = 0; j < 9; j++) {
                 // If we find an empty cell
                 if (board[i][j] === '.') {
                     // Calculate which 3x3 box this cell belongs to
                     const boxIdx = Math.floor(i / 3) * 3 + Math.floor(j / 3);
                     // Combine all used numbers in this row, column, and box
                     const used = rows[i] | cols[j] | boxes[boxIdx];
                     
                     // Try each number from 1 to 9
                     for (let num = 1; num <= 9; num++) {
                         // Create bitmask for current number
                         const bit = 1 << num;
                         // Check if this number is already used (bit is not set in used mask)
                         if (!(used & bit)) {
                             // Place the number on the board
                             board[i][j] = num.toString();
                             // Update bitmasks to mark this number as used
                             rows[i] |= bit;
                             cols[j] |= bit;
                             boxes[boxIdx] |= bit;
                             
                             // Recursively try to solve the rest of the puzzle
                             if (solve()) return true;
                             
                             // Backtrack: remove the number and update bitmasks
                             board[i][j] = '.';
                             rows[i] &= ~bit;  // Clear the bit using bitwise NOT and AND
                             cols[j] &= ~bit;
                             boxes[boxIdx] &= ~bit;
                         }
                     }
                     // If no valid number works for this cell, return false
                     return false;
                 }
             }
         }
         // If we've filled all cells successfully, puzzle is solved
         return true;
     }
     
     // Start the solving process
     solve();
 }
