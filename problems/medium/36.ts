/*
36. Valid Sudoku

Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.

Note:
A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.
 
Example 1:
Input: board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true

Example 2:
Input: board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
 
Constraints:
board.length == 9
board[i].length == 9
board[i][j] is a digit 1-9 or '.'.

</> Typescript code:
*/

function isValidSudoku(board: string[][]): boolean {
    // Initialize bitmasks for tracking digits 1-9 in each row, column, and 3x3 box
    // Using bitwise operations for O(1) lookup and insertion instead of Set objects
    const rows = new Array(9).fill(0);    // Bitmask for each row (9 rows)
    const cols = new Array(9).fill(0);    // Bitmask for each column (9 columns)  
    const boxes = new Array(9).fill(0);   // Bitmask for each 3x3 box (9 boxes)
    
    // Iterate through every cell in the 9x9 board
    for (let i = 0; i < 9; i++) {         // Row index
        for (let j = 0; j < 9; j++) {     // Column index
            const cell = board[i][j];      // Current cell value
            if (cell === '.') continue;    // Skip empty cells, only validate filled ones
            
            // Convert digit character to bit position (1->0, 2->1, ..., 9->8)
            // Using charCodeAt for fastest character to number conversion
            const bit = 1 << (cell.charCodeAt(0) - 49); // '1'.charCodeAt(0) = 49
            
            // Calculate which 3x3 box this cell belongs to (0-8)
            // Top-left boxes: 0,1,2; Middle boxes: 3,4,5; Bottom boxes: 6,7,8
            const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
            
            // Check if this digit already exists in current row, column, or box
            // Bitwise AND returns non-zero if bit is already set (duplicate found)
            if ((rows[i] & bit) || (cols[j] & bit) || (boxes[boxIndex] & bit)) {
                return false; // Invalid Sudoku - duplicate digit found
            }
            
            // Mark this digit as seen in the current row, column, and box
            // Bitwise OR sets the corresponding bit to 1
            rows[i] |= bit;           // Set bit in row bitmask
            cols[j] |= bit;           // Set bit in column bitmask  
            boxes[boxIndex] |= bit;   // Set bit in box bitmask
        }
    }
    
    // All cells processed without finding duplicates - valid Sudoku
    return true;
}
