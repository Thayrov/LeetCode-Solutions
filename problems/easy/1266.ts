/*
1266. Minimum Time Visiting All Points

On a 2D plane, there are n points with integer coordinates points[i] = [xi, yi]. Return the minimum time in seconds to visit all the points in the order given by points.
You can move according to these rules:
In 1 second, you can either:
move vertically by one unit,
move horizontally by one unit, or
move diagonally sqrt(2) units (in other words, move one unit vertically then one unit horizontally in 1 second).
You have to visit the points in the same order as they appear in the array.
You are allowed to pass through points that appear later in the order, but these do not count as visits.

Example 1:
Input: points = [[1,1],[3,4],[-1,0]]
Output: 7
Explanation: One optimal path is [1,1] -> [2,2] -> [3,3] -> [3,4] -> [2,3] -> [1,2] -> [0,1] -> [-1,0]   
Time from [1,1] to [3,4] = 3 seconds 
Time from [3,4] to [-1,0] = 4 seconds
Total time = 7 seconds

Example 2:
Input: points = [[3,2],[-2,2]]
Output: 5

Constraints:
points.length == n
1 <= n <= 100
points[i].length == 2
-1000 <= points[i][0], points[i][1] <= 1000

</> Typescript code:
*/

function minTimeToVisitAllPoints(points: number[][]): number {
    // Initialize a counter to accumulate the total time spent traveling between all points
    let totalTime = 0;
    // Cache the length of the array to avoid repeated property access in the loop
    const n = points.length;

    // Iterate through the points up to the second to last element
    for (let i = 0; i < n - 1; i++) {
        // Access current point and the next destination point in the sequence
        const p1 = points[i];
        const p2 = points[i + 1];
        
        // Calculate the absolute difference in the X coordinates (horizontal distance)
        // Manual ternary is slightly faster than Math.abs in some JS engines
        const dx = p2[0] - p1[0];
        const absX = dx < 0 ? -dx : dx;
        
        // Calculate the absolute difference in the Y coordinates (vertical distance)
        const dy = p2[1] - p1[1];
        const absY = dy < 0 ? -dy : dy;
        
        // The time to move between two points diagonally/orthogonally is the max of the two differences
        // This is known as the Chebyshev distance
        totalTime += absX > absY ? absX : absY;
    }

    // Return the final accumulated time
    return totalTime;
}
