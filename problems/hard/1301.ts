/*
1301. Number of Paths with Max Score

Hint
You are given a square board of characters. You can move on the board starting at the bottom right square marked with the character 'S'.
You need to reach the top left square marked with the character 'E'. The rest of the squares are labeled either with a numeric character 1, 2, ..., 9 or with an obstacle 'X'. In one move you can go up, left or up-left (diagonally) only if there is no obstacle there.
Return a list of two integers: the first integer is the maximum sum of numeric characters you can collect, and the second is the number of such paths that you can take to get that maximum sum, taken modulo 10^9 + 7.
In case there is no path, return [0, 0].

Example 1:
Input: board = ["E23","2X2","12S"]
Output: [7,1]

Example 2:
Input: board = ["E12","1X1","21S"]
Output: [4,2]

Example 3:
Input: board = ["E11","XXX","11S"]
Output: [0,0]
 
Constraints:
2 <= board.length == board[i].length <= 100

</> Typescript code:
*/

function pathsWithMaxScore(board: string[]): number[] {
  // Defines the modulo required by the problem for path counts.
  const MOD = 1000000007;

  // Stores the board size because the board is n x n.
  const n = board.length;

  // score[r][c] stores the best score reachable from S to cell (r, c).
  const score = Array.from({ length: n }, () => Array(n).fill(-1));

  // count[r][c] stores how many paths reach cell (r, c) with score[r][c].
  const count = Array.from({ length: n }, () => Array(n).fill(0));

  // Starting cell S contributes no score.
  score[n - 1][n - 1] = 0;

  // There is exactly one way to stand at S initially.
  count[n - 1][n - 1] = 1;

  // Iterates from bottom to top because moves only go up, left, or up-left.
  for (let r = n - 1; r >= 0; r--) {
    // Iterates from right to left because moves only go up, left, or up-left.
    for (let c = n - 1; c >= 0; c--) {
      // Skips obstacles and unreachable cells.
      if (board[r][c] === "X" || count[r][c] === 0) continue;

      // Lists all allowed next moves from the current cell.
      const next = [
        [r - 1, c],
        [r, c - 1],
        [r - 1, c - 1],
      ];

      // Tries to relax each reachable neighbor.
      for (const [nr, nc] of next) {
        // Skips positions outside the board and obstacle cells.
        if (nr < 0 || nc < 0 || board[nr][nc] === "X") continue;

        // Adds zero for E, otherwise adds the numeric value of the target cell.
        const add = board[nr][nc] === "E" ? 0 : board[nr].charCodeAt(nc) - 48;

        // Calculates the score produced by moving into this neighbor.
        const candidate = score[r][c] + add;

        // Replaces the neighbor result if this path gives a better score.
        if (candidate > score[nr][nc]) {
          // Stores the new maximum score for the neighbor.
          score[nr][nc] = candidate;

          // Resets the path count to the current cell's count.
          count[nr][nc] = count[r][c];

          // Merges counts when another path reaches the same best score.
        } else if (candidate === score[nr][nc]) {
          // Adds path counts under modulo.
          count[nr][nc] = (count[nr][nc] + count[r][c]) % MOD;
        }
      }
    }
  }

  // If E is unreachable, returns [0, 0]; otherwise returns best score and count.
  return count[0][0] === 0 ? [0, 0] : [score[0][0], count[0][0]];
}
