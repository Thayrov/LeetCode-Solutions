/*
1861. Rotating the Box

You are given an m x n matrix of characters box representing a side-view of a box. Each cell of the box is one of the following:
A stone '#'
A stationary obstacle '*'
Empty '.'
The box is rotated 90 degrees clockwise, causing some of the stones to fall due to gravity. Each stone falls down until it lands on an obstacle, another stone, or the bottom of the box. Gravity does not affect the obstacles' positions, and the inertia from the box's rotation does not affect the stones' horizontal positions.
It is guaranteed that each stone in box rests on an obstacle, another stone, or the bottom of the box.
Return an n x m matrix representing the box after the rotation described above.

Example 1:
Input: box = [["#",".","#"]]
Output: [["."],
         ["#"],
         ["#"]]

Example 2:
Input: box = [["#",".","*","."],
              ["#","#","*","."]]
Output: [["#","."],
         ["#","#"],
         ["*","*"],
         [".","."]]

Example 3:
Input: box = [["#","#","*",".","*","."],
              ["#","#","#","*",".","."],
              ["#","#","#",".","#","."]]
Output: [[".","#","#"],
         [".","#","#"],
         ["#","#","*"],
         ["#","*","."],
         ["#",".","*"],
         ["#",".","."]]


Constraints:
m == box.length
n == box[i].length
1 <= m, n <= 500
box[i][j] is either '#', '*', or '.'.

</> Typescript Code:
*/

function rotateTheBox(box: string[][]): string[][] {
  const m = box.length; // Get the number of rows
  const n = box[0].length; // Get the number of columns

  for (let i = 0; i < m; i++) {
    // Iterate over each row
    let emptySlot = n - 1; // Position to place the next stone
    for (let j = n - 1; j >= 0; j--) {
      // Iterate from right to left
      if (box[i][j] === "*") {
        // If obstacle encountered
        emptySlot = j - 1; // Reset emptySlot to before obstacle
      } else if (box[i][j] === "#") {
        // If stone encountered
        if (j !== emptySlot) {
          // If stone is not in the rightmost possible position
          box[i][emptySlot] = "#"; // Move stone to emptySlot
          box[i][j] = "."; // Mark current position as empty
        }
        emptySlot--; // Move to the next position
      }
    }
  }

  const rotated: string[][] = []; // Initialize rotated box
  for (let j = 0; j < n; j++) {
    // Iterate over columns
    rotated[j] = []; // Initialize new row in rotated box
    for (let i = m - 1; i >= 0; i--) {
      // Iterate over rows from bottom to top
      rotated[j][m - 1 - i] = box[i][j]; // Assign rotated positions
    }
  }

  return rotated; // Return the rotated box
}
