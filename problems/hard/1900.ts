/*
1900. The Earliest and Latest Rounds Where Players Compete

There is a tournament where n players are participating. The players are standing in a single row and are numbered from 1 to n based on their initial standing position (player 1 is the first player in the row, player 2 is the second player in the row, etc.).
The tournament consists of multiple rounds (starting from round number 1). In each round, the ith player from the front of the row competes against the ith player from the end of the row, and the winner advances to the next round. When the number of players is odd for the current round, the player in the middle automatically advances to the next round.
For example, if the row consists of players 1, 2, 4, 6, 7
Player 1 competes against player 7.
Player 2 competes against player 6.
Player 4 automatically advances to the next round.
After each round is over, the winners are lined back up in the row based on the original ordering assigned to them initially (ascending order).
The players numbered firstPlayer and secondPlayer are the best in the tournament. They can win against any other player before they compete against each other. If any two other players compete against each other, either of them might win, and thus you may choose the outcome of this round.
Given the integers n, firstPlayer, and secondPlayer, return an integer array containing two values, the earliest possible round number and the latest possible round number in which these two players will compete against each other, respectively.

Example 1:
Input: n = 11, firstPlayer = 2, secondPlayer = 4
Output: [3,4]
Explanation:
One possible scenario which leads to the earliest round number:
First round: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
Second round: 2, 3, 4, 5, 6, 11
Third round: 2, 3, 4
One possible scenario which leads to the latest round number:
First round: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
Second round: 1, 2, 3, 4, 5, 6
Third round: 1, 2, 4
Fourth round: 2, 4

Example 2:
Input: n = 5, firstPlayer = 1, secondPlayer = 5
Output: [1,1]
Explanation: The players numbered 1 and 5 compete in the first round.
There is no way to make them compete in any other round.
 
Constraints:
2 <= n <= 28
1 <= firstPlayer < secondPlayer <= n

</> Typescript code:
*/

function earliestAndLatest(
  n: number,
  firstPlayer: number,
  secondPlayer: number
): number[] {
  // Memoization map using bitmask + round as key for optimal caching
  const memo = new Map<string, number[]>();

  // DFS function using bitmask to represent current active players
  function dfs(mask: number, round: number): number[] {
    // Create unique key combining player bitmask and current round
    const key = `${mask},${round}`;
    // Return cached result if already computed
    if (memo.has(key)) return memo.get(key)!;

    // Convert bitmask to array of active player numbers
    const players: number[] = [];
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) players.push(i + 1);
    }

    // Get current player count and positions of target players
    const len = players.length;
    const f = players.indexOf(firstPlayer);
    const s = players.indexOf(secondPlayer);

    // Base case: target players are positioned to compete (first vs last pairing)
    if (f + s === len - 1) return [round, round];

    // Track minimum and maximum rounds across all possible match outcomes
    let minRound = Infinity,
      maxRound = 0;

    // Backtracking function to explore all tournament bracket possibilities
    function backtrack(idx: number, newMask: number): void {
      // Base case: processed all pairs for this round
      if (idx >= Math.floor(len / 2)) {
        // If odd number of players, middle player advances automatically
        if (len % 2 === 1) newMask |= 1 << (players[Math.floor(len / 2)] - 1);
        // Recursively solve for next round with new set of winners
        const [minNext, maxNext] = dfs(newMask, round + 1);
        // Update global minimum and maximum rounds
        minRound = Math.min(minRound, minNext);
        maxRound = Math.max(maxRound, maxNext);
        return;
      }

      // Get the pair of players competing in current match
      const p1 = players[idx]; // Player from front
      const p2 = players[len - 1 - idx]; // Player from back

      // If first player is a target player, they must win
      if (p1 === firstPlayer || p1 === secondPlayer) {
        backtrack(idx + 1, newMask | (1 << (p1 - 1)));
      }
      // If second player is a target player, they must win
      else if (p2 === firstPlayer || p2 === secondPlayer) {
        backtrack(idx + 1, newMask | (1 << (p2 - 1)));
      }
      // For matches between other players, try both possible outcomes
      else {
        // Try first player winning
        backtrack(idx + 1, newMask | (1 << (p1 - 1)));
        // Try second player winning
        backtrack(idx + 1, newMask | (1 << (p2 - 1)));
      }
    }

    // Start backtracking with empty winner bitmask
    backtrack(0, 0);
    // Cache and return the result
    const result = [minRound, maxRound];
    memo.set(key, result);
    return result;
  }

  // Initialize with all players active (all bits set from 0 to n-1)
  const initialMask = (1 << n) - 1;
  // Start DFS from round 1
  return dfs(initialMask, 1);
}
