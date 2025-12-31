/*
1970. Last Day Where You Can Still Cross

There is a 1-based binary matrix where 0 represents land and 1 represents water. You are given integers row and col representing the number of rows and columns in the matrix, respectively.
Initially on day 0, the entire matrix is land. However, each day a new cell becomes flooded with water. You are given a 1-based 2D array cells, where cells[i] = [ri, ci] represents that on the ith day, the cell on the rith row and cith column (1-based coordinates) will be covered with water (i.e., changed to 1).
You want to find the last day that it is possible to walk from the top to the bottom by only walking on land cells. You can start from any cell in the top row and end at any cell in the bottom row. You can only travel in the four cardinal directions (left, right, up, and down).
Return the last day where it is possible to walk from the top to the bottom by only walking on land cells.

Example 1:
Input: row = 2, col = 2, cells = [[1,1],[2,1],[1,2],[2,2]]
Output: 2
Explanation: The above image depicts how the matrix changes each day starting from day 0.
The last day where it is possible to cross from top to bottom is on day 2.

Example 2:
Input: row = 2, col = 2, cells = [[1,1],[1,2],[2,1],[2,2]]
Output: 1
Explanation: The above image depicts how the matrix changes each day starting from day 0.
The last day where it is possible to cross from top to bottom is on day 1.

Example 3:
Input: row = 3, col = 3, cells = [[1,2],[2,1],[3,3],[2,2],[1,1],[1,3],[2,3],[3,2],[3,1]]
Output: 3
Explanation: The above image depicts how the matrix changes each day starting from day 0.
The last day where it is possible to cross from top to bottom is on day 3.

Constraints:
2 <= row, col <= 2 * 10^4
4 <= row * col <= 2 * 10^4
cells.length == row * col
1 <= ri <= row
1 <= ci <= col
All the values of cells are unique.

</> Typescript code:
*/

function latestDayToCross(row: number, col: number, cells: number[][]): number {
    const n = row * col;
    // parent array for DSU, plus two extra nodes for virtual Top (n) and Bottom (n+1)
    const parent = new Int32Array(n + 2);
    for (let i = 0; i < n + 2; i++) parent[i] = i;

    // Standard Find with path compression for O(alpha(N)) performance
    function find(i: number): number {
        while (parent[i] !== i) {
            parent[i] = parent[parent[i]]; // Path halving
            i = parent[i];
        }
        return i;
    }

    // Union function to connect two components
    function union(i: number, j: number): void {
        const rootI = find(i);
        const rootJ = find(j);
        if (rootI !== rootJ) parent[rootI] = rootJ;
    }

    // track land (1) vs water (0). We start from "all water" and add land back.
    const grid = new Uint8Array(n);
    const TOP = n, BOTTOM = n + 1;
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    // Iterate backwards from the last day cells are filled
    for (let d = n - 1; d >= 0; d--) {
        const r = cells[d][0] - 1; // Convert 1-based to 0-based
        const c = cells[d][1] - 1;
        const idx = r * col + c;
        grid[idx] = 1; // Mark as land

        // If cell is in the first row, connect to virtual TOP
        if (r === 0) union(idx, TOP);
        // If cell is in the last row, connect to virtual BOTTOM
        if (r === row - 1) union(idx, BOTTOM);

        // Check 4-directional neighbors and connect if they are also land
        for (const [dr, dc] of directions) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < row && nc >= 0 && nc < col && grid[nr * col + nc]) {
                union(idx, nr * col + nc);
            }
        }

        // Once TOP and BOTTOM are in the same set, a path exists
        if (find(TOP) === find(BOTTOM)) return d;
    }

    return 0;
}
