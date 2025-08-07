/*
3363. Find the Maximum Number of Fruits Collected

There is a game dungeon comprised of n x n rooms arranged in a grid.
You are given a 2D array fruits of size n x n, where fruits[i][j] represents the number of fruits in the room (i, j). Three children will play in the game dungeon, with initial positions at the corner rooms (0, 0), (0, n - 1), and (n - 1, 0).
The children will make exactly n - 1 moves according to the following rules to reach the room (n - 1, n - 1):
The child starting from (0, 0) must move from their current room (i, j) to one of the rooms (i + 1, j + 1), (i + 1, j), and (i, j + 1) if the target room exists.
The child starting from (0, n - 1) must move from their current room (i, j) to one of the rooms (i + 1, j - 1), (i + 1, j), and (i + 1, j + 1) if the target room exists.
The child starting from (n - 1, 0) must move from their current room (i, j) to one of the rooms (i - 1, j + 1), (i, j + 1), and (i + 1, j + 1) if the target room exists.
When a child enters a room, they will collect all the fruits there. If two or more children enter the same room, only one child will collect the fruits, and the room will be emptied after they leave.
Return the maximum number of fruits the children can collect from the dungeon.

Example 1:
Input: fruits = [[1,2,3,4],[5,6,8,7],[9,10,11,12],[13,14,15,16]]
Output: 100
Explanation:
In this example:
The 1st child (green) moves on the path (0,0) -> (1,1) -> (2,2) -> (3, 3).
The 2nd child (red) moves on the path (0,3) -> (1,2) -> (2,3) -> (3, 3).
The 3rd child (blue) moves on the path (3,0) -> (3,1) -> (3,2) -> (3, 3).
In total they collect 1 + 6 + 11 + 16 + 4 + 8 + 12 + 13 + 14 + 15 = 100 fruits.

Example 2:
Input: fruits = [[1,1],[1,1]]
Output: 4
Explanation:
In this example:
The 1st child moves on the path (0,0) -> (1,1).
The 2nd child moves on the path (0,1) -> (1,1).
The 3rd child moves on the path (1,0) -> (1,1).
In total they collect 1 + 1 + 1 + 1 = 4 fruits.

Constraints:
2 <= n == fruits.length == fruits[i].length <= 1000
0 <= fruits[i][j] <= 1000

</> Typescript code:
*/

function maxCollectedFruits(fruits: number[][]): number {
    const n = fruits.length;
    
    // Child 1 from (0,0): Always takes diagonal path (0,0) -> (1,1) -> ... -> (n-1,n-1)
    // This is the only way to reach (n-1,n-1) in exactly n-1 moves with the given constraints
    let diagonalSum = 0;
    for (let i = 0; i < n; i++) {
        diagonalSum += fruits[i][i];
    }
    
    // Initialize DP table for Child 2 with -infinity (unreachable states)
    const inf = 1 << 29;
    const dp2 = Array.from({ length: n }, () => Array(n).fill(-inf));
    
    // Child 2 starts at (0, n-1)
    dp2[0][n - 1] = fruits[0][n - 1];
    
    // DP for Child 2: Fill positions where j > i (above diagonal)
    // Child 2 can only be in positions above the diagonal since Child 1 occupies diagonal
    for (let i = 1; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            // Child 2 can come from: (i-1,j-1), (i-1,j), or (i-1,j+1)
            // Corresponding to moves: down-left, down, down-right
            
            // From (i-1, j) - moving down
            dp2[i][j] = Math.max(dp2[i - 1][j], dp2[i - 1][j - 1]) + fruits[i][j];
            
            // From (i-1, j+1) - moving down-left (if j+1 is valid)
            if (j + 1 < n) {
                dp2[i][j] = Math.max(dp2[i][j], dp2[i - 1][j + 1] + fruits[i][j]);
            }
        }
    }
    
    // Initialize DP table for Child 3 with -infinity (unreachable states)  
    const dp3 = Array.from({ length: n }, () => Array(n).fill(-inf));
    
    // Child 3 starts at (n-1, 0)
    dp3[n - 1][0] = fruits[n - 1][0];
    
    // DP for Child 3: Fill positions where i > j (below diagonal)
    // Child 3 can only be in positions below the diagonal since Child 1 occupies diagonal
    for (let j = 1; j < n; j++) {
        for (let i = j + 1; i < n; i++) {
            // Child 3 can come from: (i-1,j-1), (i,j-1), or (i+1,j-1)
            // Corresponding to moves: up-right, right, down-right
            
            // From (i, j-1) - moving right
            dp3[i][j] = Math.max(dp3[i][j - 1], dp3[i - 1][j - 1]) + fruits[i][j];
            
            // From (i+1, j-1) - moving up-right (if i+1 is valid)
            if (i + 1 < n) {
                dp3[i][j] = Math.max(dp3[i][j], dp3[i + 1][j - 1] + fruits[i][j]);
            }
        }
    }
    
    // Final result: diagonal sum + Child 2's path ending at (n-2,n-1) + Child 3's path ending at (n-1,n-2)
    // We use (n-2,n-1) and (n-1,n-2) instead of (n-1,n-1) because Child 1 already collected from (n-1,n-1)
    // and we want Children 2 and 3 to reach positions adjacent to the final destination
    return diagonalSum + dp2[n - 2][n - 1] + dp3[n - 1][n - 2];
}
