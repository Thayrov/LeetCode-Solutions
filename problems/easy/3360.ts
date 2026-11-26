/*
3360. Stone Removal Game

Alice and Bob are playing a game where they take turns removing stones from a pile, with Alice going first.
Alice starts by removing exactly 10 stones on her first turn.
For each subsequent turn, each player removes exactly 1 fewer stone than the previous opponent.
The player who cannot make a move loses the game.
Given a positive integer n, return true if Alice wins the game and false otherwise.

Example 1:
Input: n = 12
Output: true
Explanation:
Alice removes 10 stones on her first turn, leaving 2 stones for Bob.
Bob cannot remove 9 stones, so Alice wins.

Example 2:
Input: n = 1
Output: false
Explanation:
Alice cannot remove 10 stones, so Alice loses.

Constraints:
1 <= n <= 50

</> Typescript code:
*/

// Determine whether Bob is the first player unable to move.
function canAliceWin(n: number): boolean {
  // Alice wins when the pile funds her move but falls short of Bob's next cumulative threshold.
  return (
    (n >= 10 && n < 19) || // Alice removes 10 stones on turn 1.
    (n >= 27 && n < 34) || // Alice removes 8 stones on turn 3.
    (n >= 40 && n < 45) || // Alice removes 6 stones on turn 5.
    n >= 49 // Alice removes 4 stones on turn 7. Bob needs 52 total, above the limit of 50.
  );
}
