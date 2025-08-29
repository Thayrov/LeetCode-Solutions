/*
3021. Alice and Bob Playing Flower Game

Alice and Bob are playing a turn-based game on a field, with two lanes of flowers between them. There are x flowers in the first lane between Alice and Bob, and y flowers in the second lane between them.
The game proceeds as follows:
Alice takes the first turn.
In each turn, a player must choose either one of the lane and pick one flower from that side.
At the end of the turn, if there are no flowers left at all, the current player captures their opponent and wins the game.
Given two integers, n and m, the task is to compute the number of possible pairs (x, y) that satisfy the conditions:
Alice must win the game according to the described rules.
The number of flowers x in the first lane must be in the range [1,n].
The number of flowers y in the second lane must be in the range [1,m].
Return the number of possible pairs (x, y) that satisfy the conditions mentioned in the statement.

Example 1:
Input: n = 3, m = 2
Output: 3
Explanation: The following pairs satisfy conditions described in the statement: (1,2), (3,2), (2,1).

Example 2:
Input: n = 1, m = 1
Output: 0
Explanation: No pairs satisfy the conditions described in the statement.
 
Constraints:
1 <= n, m <= 10^5

</> Typescript code:
*/

function flowerGame(n: number, m: number): number {
    // Alice wins when total flowers (x + y) is odd
    // This happens when exactly one of x or y is odd
    
    // Count odd numbers in range [1, n]: ceil(n/2) = (n + 1) >> 1
    // Count even numbers in range [1, n]: floor(n/2) = n >> 1
    // Count odd numbers in range [1, m]: ceil(m/2) = (m + 1) >> 1  
    // Count even numbers in range [1, m]: floor(m/2) = m >> 1
    
    // Case 1: x is odd, y is even
    // Number of such pairs = (odd count in [1,n]) * (even count in [1,m])
    const oddX_evenY = ((n + 1) >> 1) * (m >> 1);
    
    // Case 2: x is even, y is odd  
    // Number of such pairs = (even count in [1,n]) * (odd count in [1,m])
    const evenX_oddY = (n >> 1) * ((m + 1) >> 1);
    
    // Total winning pairs for Alice
    return oddX_evenY + evenX_oddY;
}
