/*
909. Snakes and Ladders

You are given an n x n integer matrix board where the cells are labeled from 1 to n2 in a Boustrophedon style starting from the bottom left of the board (i.e. board[n - 1][0]) and alternating direction each row.

You start on square 1 of the board. In each move, starting from square curr, do the following:

Choose a destination square next with a label in the range [curr + 1, min(curr + 6, n2)].
This choice simulates the result of a standard 6-sided die roll: i.e., there are always at most 6 destinations, regardless of the size of the board.
If next has a snake or ladder, you must move to the destination of that snake or ladder. Otherwise, you move to next.
The game ends when you reach the square n2.
A board square on row r and column c has a snake or ladder if board[r][c] != -1. The destination of that snake or ladder is board[r][c]. Squares 1 and n2 are not the starting points of any snake or ladder.

Note that you only take a snake or ladder at most once per dice roll. If the destination to a snake or ladder is the start of another snake or ladder, you do not follow the subsequent snake or ladder.

For example, suppose the board is [[-1,4],[-1,3]], and on the first move, your destination square is 2. You follow the ladder to square 3, but do not follow the subsequent ladder to 4.
Return the least number of dice rolls required to reach the square n2. If it is not possible to reach the square, return -1.

Example 1:
Input: board = [[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]
Output: 4
Explanation: 
In the beginning, you start at square 1 (at row 5, column 0).
You decide to move to square 2 and must take the ladder to square 15.
You then decide to move to square 17 and must take the snake to square 13.
You then decide to move to square 14 and must take the ladder to square 35.
You then decide to move to square 36, ending the game.
This is the lowest possible number of moves to reach the last square, so return 4.

Example 2:
Input: board = [[-1,-1],[-1,3]]
Output: 1
 
Constraints:
n == board.length == board[i].length
2 <= n <= 20
board[i][j] is either -1 or in the range [1, n2].
The squares labeled 1 and n2 are not the starting points of any snake or ladder.

</> Typescript code:
*/

function snakesAndLadders(board: number[][]): number {
  // Get board dimensions and calculate the target square (n²)
  const n = board.length;
  const target = n * n;

  // Helper function to convert square number to board coordinates
  // Handles the Boustrophedon (alternating direction) numbering pattern
  const getCoordinates = (square: number): [number, number] => {
    // Calculate which row and column the square would be in if numbered normally
    const row = Math.floor((square - 1) / n);
    const col = (square - 1) % n;

    // Convert to actual board coordinates (board is upside down)
    const boardRow = n - 1 - row;

    // Handle alternating direction: even rows go left-to-right, odd rows go right-to-left
    const boardCol = row % 2 === 0 ? col : n - 1 - col;

    return [boardRow, boardCol];
  };

  // BFS queue: stores [current square number, number of moves taken]
  const queue: [number, number][] = [[1, 0]];

  // Track visited squares to avoid revisiting (prevents infinite loops)
  const visited = new Set<number>([1]);

  // BFS loop to find shortest path
  while (queue.length > 0) {
    // Get the next state to process
    const [currentSquare, moves] = queue.shift()!;

    // Check if we've reached the target square
    if (currentSquare === target) {
      return moves;
    }

    // Try all possible dice roll outcomes (1 to 6)
    for (let dice = 1; dice <= 6; dice++) {
      // Calculate the square we would land on with this dice roll
      let nextSquare = currentSquare + dice;

      // Can't go beyond the target square
      if (nextSquare > target) break;

      // Check if this square has a snake or ladder
      const [row, col] = getCoordinates(nextSquare);
      if (board[row][col] !== -1) {
        // If there's a snake or ladder, move to its destination
        nextSquare = board[row][col];
      }

      // Only process this square if we haven't visited it before
      if (!visited.has(nextSquare)) {
        // Mark as visited and add to queue for next level of BFS
        visited.add(nextSquare);
        queue.push([nextSquare, moves + 1]);
      }
    }
  }

  // If we exit the loop without finding the target, it's unreachable
  return -1;
}
