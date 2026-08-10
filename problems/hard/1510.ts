/*
1510. Stone Game IV

Alice and Bob take turns playing a game, with Alice starting first.

Initially, there are n stones in a pile. On each player's turn, that player makes a move consisting of removing any non-zero square number of stones in the pile.

Also, if a player cannot make a move, he/she loses the game.

Given a positive integer n, return true if and only if Alice wins the game otherwise return false, assuming both players play optimally.

Example 1:
Input: n = 1
Output: true
Explanation: Alice can remove 1 stone winning the game because Bob doesn't have any moves.

Example 2:
Input: n = 2
Output: false
Explanation: Alice can only remove 1 stone, after that Bob removes the last one winning the game (2 -> 1 -> 0).

Example 3:
Input: n = 4
Output: true
Explanation: n is already a perfect square, Alice can win with one move, removing 4 stones (4 -> 0).

Constraints:
1 <= n <= 10^5

</> Typescript code:
*/

function winnerSquareGame(n: number): boolean {
  // Store whether each pile size is winning in one compact byte.
  const winning = new Uint8Array(n + 1);
  // Cache every legal square removal no larger than the initial pile.
  const squares: number[] = [];

  // Enumerate positive square numbers once.
  for (let root = 1; root * root <= n; root++) {
    // Record the removal represented by this root.
    squares.push(root * root);
  }

  // Classify pile sizes in ascending order, starting from losing state zero.
  for (let stones = 0; stones <= n; stones++) {
    // Only losing states can prove their reachable successors are winning.
    if (winning[stones] !== 0) continue;

    // Try every legal square move from this losing state.
    for (let i = 0; i < squares.length; i++) {
      // Form the predecessor pile that can move down to this state.
      const next = stones + squares[i];
      // Stop once larger squares also exceed the requested range.
      if (next > n) break;
      // Mark the predecessor winning because it can reach a losing state.
      winning[next] = 1;
    }
  }

  // Alice wins exactly when the initial pile was marked winning.
  return winning[n] === 1;
}
