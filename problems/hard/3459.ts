/*

3459. Length of Longest V-Shaped Diagonal Segment

You are given a 2D integer matrix grid of size n x m, where each element is either 0, 1, or 2.
A V-shaped diagonal segment is defined as:
The segment starts with 1.
The subsequent elements follow this infinite sequence: 2, 0, 2, 0, ....
The segment:
Starts along a diagonal direction (top-left to bottom-right, bottom-right to top-left, top-right to bottom-left, or bottom-left to top-right).
Continues the sequence in the same diagonal direction.
Makes at most one clockwise 90-degree turn to another diagonal direction while maintaining the sequence.
Return the length of the longest V-shaped diagonal segment. If no valid segment exists, return 0.

Example 1:
Input: grid = [[2,2,1,2,2],[2,0,2,2,0],[2,0,1,1,0],[1,0,2,2,2],[2,0,0,2,2]]
Output: 5
Explanation:
The longest V-shaped diagonal segment has a length of 5 and follows these coordinates: (0,2) → (1,3) → (2,4), takes a 90-degree clockwise turn at (2,4), and continues as (3,3) → (4,2).

Example 2:
Input: grid = [[2,2,2,2,2],[2,0,2,2,0],[2,0,1,1,0],[1,0,2,2,2],[2,0,0,2,2]]
Output: 4
Explanation:
The longest V-shaped diagonal segment has a length of 4 and follows these coordinates: (2,3) → (3,2), takes a 90-degree clockwise turn at (3,2), and continues as (2,1) → (1,0).

Example 3:
Input: grid = [[1,2,2,2,2],[2,2,2,2,0],[2,0,0,0,0],[0,0,2,2,2],[2,0,0,2,0]]
Output: 5
Explanation:
The longest V-shaped diagonal segment has a length of 5 and follows these coordinates: (0,0) → (1,1) → (2,2) → (3,3) → (4,4).

Example 4:
Input: grid = [[1]]
Output: 1
Explanation:
The longest V-shaped diagonal segment has a length of 1 and follows these coordinates: (0,0).

Constraints:
n == grid.length
m == grid[i].length
1 <= n, m <= 500
grid[i][j] is either 0, 1 or 2.

</> Typescript code:
*/

function lenOfVDiagonal(grid: number[][]): number {
    // Get grid dimensions for boundary checking
    const n = grid.length, m = grid[0].length;

    // Define 4 diagonal directions: bottom-right, bottom-left, top-right, top-left
    const dirs = [[1,1], [1,-1], [-1,1], [-1,-1]];

    // Map each direction to its 90-degree clockwise turn
    // 0->1, 1->3, 2->0, 3->2 (indices correspond to dirs array)
    const clockwise = [1, 3, 0, 2];

    // Pattern sequence after starting with 1: alternates between 2 and 0
    const pattern = [2, 0];

    // Track maximum V-shaped diagonal length found
    let maxLen = 0;

    // Iterate through every cell in the grid
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            // Only start from cells containing 1 (valid starting points)
            if (grid[i][j] === 1) {
                // Try each of the 4 diagonal directions
                for (let d = 0; d < 4; d++) {
                    // Get direction vector for current diagonal
                    const [dx, dy] = dirs[d];

                    // Initialize position, length, and pattern index
                    let x = i, y = j, len = 1, idx = 0;

                    // Extend in current direction as far as possible
                    while (true) {
                        // Move to next position in diagonal
                        x += dx; y += dy;

                        // Check bounds and pattern match
                        if (x < 0 || x >= n || y < 0 || y >= m || grid[x][y] !== pattern[idx]) break;

                        // Valid extension: increment length and toggle pattern index
                        len++; idx = 1 - idx;

                        // At each valid position, try making a 90-degree clockwise turn
                        const nd = clockwise[d];
                        const [ndx, ndy] = dirs[nd];

                        // Initialize new direction exploration from current position
                        let nx = x, ny = y, nlen = len, nidx = idx;

                        // Extend in new direction after the turn
                        while (true) {
                            // Move to next position in new diagonal direction
                            nx += ndx; ny += ndy;

                            // Check bounds and pattern match for new direction
                            if (nx < 0 || nx >= n || ny < 0 || ny >= m || grid[nx][ny] !== pattern[nidx]) break;

                            // Valid extension in new direction
                            nlen++; nidx = 1 - nidx;
                        }

                        // Update maximum length with V-shaped segment (original + turn)
                        maxLen = Math.max(maxLen, nlen);
                    }

                    // Update maximum length with straight segment (no turn)
                    maxLen = Math.max(maxLen, len);
                }
            }
        }
    }

    // Return the length of the longest V-shaped diagonal segment found
    return maxLen;
}