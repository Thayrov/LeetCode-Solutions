/*
3197. Find the Minimum Area to Cover All Ones II

You are given a 2D binary array grid. You need to find 3 non-overlapping rectangles having non-zero areas with horizontal and vertical sides such that all the 1's in grid lie inside these rectangles.
Return the minimum possible sum of the area of these rectangles.
Note that the rectangles are allowed to touch.

Example 1:
Input: grid = [[1,0,1],[1,1,1]]
Output: 5
Explanation:
The 1's at (0, 0) and (1, 0) are covered by a rectangle of area 2.
The 1's at (0, 2) and (1, 2) are covered by a rectangle of area 2.
The 1 at (1, 1) is covered by a rectangle of area 1.

Example 2:
Input: grid = [[1,0,1,0],[0,1,0,1]]
Output: 5
Explanation:
The 1's at (0, 0) and (0, 2) are covered by a rectangle of area 3.
The 1 at (1, 1) is covered by a rectangle of area 1.
The 1 at (1, 3) is covered by a rectangle of area 1.

Constraints:
1 <= grid.length, grid[i].length <= 30
grid[i][j] is either 0 or 1.
The input is generated such that there are at least three 1's in grid.

</> Typescript code:
*/

function minimumSum(grid: number[][]): number {
    // Get the dimensions of the grid.
    const m = grid.length;
    const n = grid[0].length;
    // Initialize the minimum total area to a very large value.
    let minTotalArea = Infinity;

    // Helper function to calculate the minimum bounding box area for all 1's within a given subgrid.
    // It takes the top-left (r1, c1) and bottom-right (r2, c2) coordinates of the subgrid.
    const getMinArea = (r1: number, c1: number, r2: number, c2: number): number => {
        // Initialize boundaries to find the outermost 1's.
        let minR = m, maxR = -1, minC = n, maxC = -1;
        // A flag to check if any '1' exists in the subgrid.
        let hasOne = false;
        // Iterate through each cell of the defined subgrid.
        for (let i = r1; i <= r2; i++) {
            for (let j = c1; j <= c2; j++) {
                // If a '1' is found, update the boundaries.
                if (grid[i][j] === 1) {
                    hasOne = true;
                    minR = Math.min(minR, i);
                    maxR = Math.max(maxR, i);
                    minC = Math.min(minC, j);
                    maxC = Math.max(maxC, j);
                }
            }
        }
        // If a '1' was found, calculate the area of the bounding box.
        // Otherwise, return Infinity to signify an invalid partition (a rectangle with no 1's).
        return hasOne ? (maxR - minR + 1) * (maxC - minC + 1) : Infinity;
    };

    // Helper function to find the minimum area sum for partitioning a subgrid into TWO rectangles.
    // This is used for the T-shaped partition patterns.
    const getMinAreaForTwo = (r1: number, c1: number, r2: number, c2: number): number => {
        let minArea = Infinity;
        // Try all possible vertical cuts to split the subgrid into two rectangles.
        for (let j = c1; j < c2; j++) {
            const area1 = getMinArea(r1, c1, r2, j);
            const area2 = getMinArea(r1, j + 1, r2, c2);
            minArea = Math.min(minArea, area1 + area2);
        }
        // Try all possible horizontal cuts to split the subgrid into two rectangles.
        for (let i = r1; i < r2; i++) {
            const area1 = getMinArea(r1, c1, i, c2);
            const area2 = getMinArea(i + 1, c1, r2, c2);
            minArea = Math.min(minArea, area1 + a2);
        }
        return minArea;
    };
    
    // Case 1: Two horizontal cuts, creating three horizontal rectangles.
    // Iterate through all possible positions for the two horizontal cuts (i1 and i2).
    for (let i1 = 0; i1 < m - 2; i1++) {
        for (let i2 = i1 + 1; i2 < m - 1; i2++) {
            const a1 = getMinArea(0, 0, i1, n - 1);
            const a2 = getMinArea(i1 + 1, 0, i2, n - 1);
            const a3 = getMinArea(i2 + 1, 0, m - 1, n - 1);
            minTotalArea = Math.min(minTotalArea, a1 + a2 + a3);
        }
    }

    // Case 2: Two vertical cuts, creating three vertical rectangles.
    // Iterate through all possible positions for the two vertical cuts (j1 and j2).
    for (let j1 = 0; j1 < n - 2; j1++) {
        for (let j2 = j1 + 1; j2 < n - 1; j2++) {
            const a1 = getMinArea(0, 0, m - 1, j1);
            const a2 = getMinArea(0, j1 + 1, m - 1, j2);
            const a3 = getMinArea(0, j2 + 1, m - 1, n - 1);
            minTotalArea = Math.min(minTotalArea, a1 + a2 + a3);
        }
    }

    // Case 3 & 4: T-shaped cuts initiated by a horizontal cut.
    // Iterate through all single horizontal cut positions.
    for (let i = 0; i < m - 1; i++) {
        // One rectangle on top, two on the bottom (split vertically).
        const a1 = getMinArea(0, 0, i, n - 1);
        const a2_3 = getMinAreaForTwo(i + 1, 0, m - 1, n - 1);
        minTotalArea = Math.min(minTotalArea, a1 + a2_3);
        
        // Two rectangles on top (split vertically), one on the bottom.
        const a_1_2 = getMinAreaForTwo(0, 0, i, n - 1);
        const a3 = getMinArea(i + 1, 0, m - 1, n - 1);
        minTotalArea = Math.min(minTotalArea, a_1_2 + a3);
    }

    // Case 5 & 6: T-shaped cuts initiated by a vertical cut.
    // Iterate through all single vertical cut positions.
    for (let j = 0; j < n - 1; j++) {
        // One rectangle on the left, two on the right (split horizontally).
        const a1 = getMinArea(0, 0, m - 1, j);
        const a2_3 = getMinAreaForTwo(0, j + 1, m - 1, n - 1);
        minTotalArea = Math.min(minTotalArea, a1 + a2_3);

        // Two rectangles on the left (split horizontally), one on the right.
        const a_1_2 = getMinAreaForTwo(0, 0, m - 1, j);
        const a3 = getMinArea(0, j + 1, m - 1, n - 1);
        minTotalArea = Math.min(minTotalArea, a_1_2 + a3);
    }

    // Return the overall minimum area found.
    return minTotalArea;
}
