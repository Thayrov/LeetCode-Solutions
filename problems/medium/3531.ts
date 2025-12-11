/*
3531. Count Covered Buildings

You are given a positive integer n, representing an n x n city. You are also given a 2D grid buildings, where buildings[i] = [x, y] denotes a unique building located at coordinates [x, y].
A building is covered if there is at least one building in all four directions: left, right, above, and below.
Return the number of covered buildings.

Example 1:
Input: n = 3, buildings = [[1,2],[2,2],[3,2],[2,1],[2,3]]
Output: 1
Explanation:
Only building [2,2] is covered as it has at least one building:
above ([1,2])
below ([3,2])
left ([2,1])
right ([2,3])
Thus, the count of covered buildings is 1.

Example 2:
Input: n = 3, buildings = [[1,1],[1,2],[2,1],[2,2]]
Output: 0
Explanation:
No building has at least one building in all four directions.

Example 3:
Input: n = 5, buildings = [[1,3],[3,2],[3,3],[3,5],[5,3]]
Output: 1
Explanation:
Only building [3,3] is covered as it has at least one building:
above ([1,3])
below ([5,3])
left ([3,2])
right ([3,5])
Thus, the count of covered buildings is 1.

Constraints:
2 <= n <= 10^5
1 <= buildings.length <= 10^5 
buildings[i] = [x, y]
1 <= x, y <= n
All coordinates of buildings are unique.

</> Typescript code:
*/

function countCoveredBuildings(n: number, buildings: number[][]): number {
    // We use TypedArrays for performance optimizations regarding memory and access speed.
    // minX[y] stores the minimum x-coordinate (top-most row) found in column y.
    // We initialize with a value larger than any possible n (constraints say n <= 10^5).
    const minX = new Int32Array(n + 1).fill(200000);
    
    // maxX[y] stores the maximum x-coordinate (bottom-most row) found in column y.
    // We initialize with -1, which is lower than the minimum coordinate (1).
    const maxX = new Int32Array(n + 1).fill(-1);
    
    // minY[x] stores the minimum y-coordinate (left-most col) found in row x.
    const minY = new Int32Array(n + 1).fill(200000);
    
    // maxY[x] stores the maximum y-coordinate (right-most col) found in row x.
    const maxY = new Int32Array(n + 1).fill(-1);

    const len = buildings.length;

    // First Pass: Populate the boundary arrays.
    // This allows us to determine the "span" of buildings in every row and column in O(1) later.
    for (let i = 0; i < len; i++) {
        const x = buildings[i][0];
        const y = buildings[i][1];

        // Update the boundaries for the current row (x)
        if (y < minY[x]) minY[x] = y;
        if (y > maxY[x]) maxY[x] = y;

        // Update the boundaries for the current column (y)
        if (x < minX[y]) minX[y] = x;
        if (x > maxX[y]) maxX[y] = x;
    }

    let count = 0;

    // Second Pass: Check the coverage condition.
    for (let i = 0; i < len; i++) {
        const x = buildings[i][0];
        const y = buildings[i][1];

        // A building is covered if there are neighbors in all 4 directions.
        // This is mathematically equivalent to saying the current building's coordinate
        // must be strictly between the minimum and maximum coordinates of its respective row and column.
        
        // Check horizontal coverage (Left & Right)
        const isCoveredHorizontally = y > minY[x] && y < maxY[x];
        
        // Check vertical coverage (Above & Below)
        const isCoveredVertically = x > minX[y] && x < maxX[y];

        // If both conditions are met, the building is surrounded.
        if (isCoveredHorizontally && isCoveredVertically) {
            count++;
        }
    }

    return count;
}
