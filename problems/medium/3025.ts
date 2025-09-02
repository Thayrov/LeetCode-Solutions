/*
3025. Find the Number of Ways to Place People I

You are given a 2D array points of size n x 2 representing integer coordinates of some points on a 2D plane, where points[i] = [xi, yi].
Count the number of pairs of points (A, B), where
A is on the upper left side of B, and
there are no other points in the rectangle (or line) they make (including the border).
Return the count.

Example 1:
Input: points = [[1,1],[2,2],[3,3]]
Output: 0
Explanation:
There is no way to choose A and B so A is on the upper left side of B.

Example 2:
Input: points = [[6,2],[4,4],[2,6]]
Output: 2
Explanation:
The left one is the pair (points[1], points[0]), where points[1] is on the upper left side of points[0] and the rectangle is empty.
The middle one is the pair (points[2], points[1]), same as the left one it is a valid pair.
The right one is the pair (points[2], points[0]), where points[2] is on the upper left side of points[0], but points[1] is inside the rectangle so it's not a valid pair.

Example 3:
Input: points = [[3,1],[1,3],[1,1]]
Output: 2
Explanation:
The left one is the pair (points[2], points[0]), where points[2] is on the upper left side of points[0] and there are no other points on the line they form. Note that it is a valid state when the two points form a line.
The middle one is the pair (points[1], points[2]), it is a valid pair same as the left one.
The right one is the pair (points[1], points[0]), it is not a valid pair as points[2] is on the border of the rectangle.

Constraints:
2 <= n <= 50
points[i].length == 2
0 <= points[i][0], points[i][1] <= 50
All points[i] are distinct.

</> Typescript code:
*/

function numberOfPairs(points: number[][]): number {
    let count = 0; // Initialize counter for valid pairs
    const n = points.length; // Store array length for performance
    
    // Iterate through all possible pairs (i, j) where i is potential upper-left point A
    for (let i = 0; i < n; i++) {
        // j represents potential bottom-right point B
        for (let j = 0; j < n; j++) {
            // Skip if same point, or if i is not upper-left of j
            // Upper-left means: i.x <= j.x AND i.y >= j.y
            if (i === j || points[i][0] > points[j][0] || points[i][1] < points[j][1]) continue;
            
            let hasPointInside = false; // Flag to track if rectangle contains other points
            
            // Check all other points to see if any lies within the rectangle
            for (let k = 0; k < n; k++) {
                if (k === i || k === j) continue; // Skip the pair points themselves
                
                // Check if point k is within rectangle bounds (inclusive of borders)
                // Rectangle bounds: [points[i][0], points[j][0]] x [points[j][1], points[i][1]]
                if (points[k][0] >= points[i][0] && points[k][0] <= points[j][0] && 
                    points[k][1] >= points[j][1] && points[k][1] <= points[i][1]) {
                    hasPointInside = true; // Found a point inside rectangle
                    break; // Early termination - no need to check remaining points
                }
            }
            
            // If no points found inside rectangle, increment valid pair count
            if (!hasPointInside) count++;
        }
    }
    
    return count; // Return total number of valid pairs
}
