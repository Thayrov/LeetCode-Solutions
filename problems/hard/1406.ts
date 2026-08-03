/*
1406. Stone Game III

Alice and Bob continue their games with piles of stones. There are several stones arranged in a row, and each stone has an associated value which is an integer given in the array stoneValue.
Alice and Bob take turns, with Alice starting first. On each player's turn, that player can take 1, 2, or 3 stones from the first remaining stones in the row.
The score of each player is the sum of the values of the stones taken. The score of each player is 0 initially.
The objective of the game is to end with the highest score, and the winner is the player with the highest score and there could be a tie. The game continues until all the stones have been taken.
Assume Alice and Bob play optimally.
Return "Alice" if Alice will win, "Bob" if Bob will win, or "Tie" if they will end the game with the same score.

Example 1:
Input: stoneValue = [1,2,3,7]
Output: "Bob"
Explanation:
Alice will always lose. Her best move will be to take three piles and the score become 6. Now the score of Bob is 7 and Bob wins.

Example 2:
Input: stoneValue = [1,2,3,-9]
Output: "Alice"
Explanation:
Alice must choose all the three piles at the first move to win and leave Bob with negative score. If Alice chooses one pile her score will be 1 and the next move Bob's score becomes 5. In the next move, Alice will take the pile with value = -9 and lose. If Alice chooses two piles her score will be 3 and the next move Bob's score becomes 3. In the next move, Alice will take the pile with value = -9 and also lose. Remember that both play optimally so here Alice will choose the scenario that makes her win.

Example 3:
Input: stoneValue = [1,2,3,6]
Output: "Tie"
Explanation:
Alice cannot win this game. She can end the game in a draw if she decided to choose all the first three piles, otherwise she will lose.

Constraints:
1 <= stoneValue.length <= 5 * 10^4
-1000 <= stoneValue[i] <= 1000

</> Typescript code:
*/

function stoneGameIII(stoneValue: number[]): string {
  // Store the optimal score differences for suffixes starting one, two, and three positions ahead.
  let next1 = 0;
  let next2 = 0;
  let next3 = 0;

  // Evaluate every suffix from right to left so all successor states are already known.
  for (let i = stoneValue.length - 1; i >= 0; --i) {
    // Start below every feasible score difference for the current suffix.
    let best = -Infinity;
    // Accumulate the value obtained by taking the next one to three stones.
    let taken = 0;

    // Try every legal move available from the current first remaining stone.
    for (let count = 1; count <= 3 && i + count <= stoneValue.length; ++count) {
      // Add the newly included stone to the current move's score.
      taken += stoneValue[i + count - 1];
      // Select the opponent's optimal difference after this move consumes count stones.
      const opponent = count === 1 ? next1 : count === 2 ? next2 : next3;
      // Maximize the current player's net advantage over the optimal opponent.
      best = Math.max(best, taken - opponent);
    }

    // Shift the rolling suffix states to make the current result the next iteration's nearest state.
    next3 = next2;
    next2 = next1;
    next1 = best;
  }

  // Convert Alice's final score difference into the required winner label.
  return next1 > 0 ? "Alice" : next1 < 0 ? "Bob" : "Tie";
}
