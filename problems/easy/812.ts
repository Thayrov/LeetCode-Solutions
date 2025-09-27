/*
812. Largest Triangle Area

Given an array of points on the X-Y plane points where points[i] = [xi, yi], return the area of the largest triangle that can be formed by any three different points. Answers within 10-5 of the actual answer will be accepted.

Example 1:
Input: points = [[0,0],[0,1],[1,0],[0,2],[2,0]]
Output: 2.00000
Explanation: The five points are shown in the above figure. The red triangle is the largest.

Example 2:
Input: points = [[1,0],[0,0],[0,1]]
Output: 0.50000

Constraints:
3 <= points.length <= 50
-50 <= xi, yi <= 50
All the given points are unique.

</> Typescript code:
*/

function largestTriangleArea(points: number[][]): number {
    // Initialize maximum area to 0
    let maxArea = 0;
    
    // Cache array length to avoid repeated property access
    const n = points.length;
    
    // Triple nested loop to check all combinations of 3 points
    // First point index (i goes from 0 to n-3)
    for (let i = 0; i < n - 2; i++) {
        // Second point index (j goes from i+1 to n-2)
        for (let j = i + 1; j < n - 1; j++) {
            // Third point index (k goes from j+1 to n-1)
            for (let k = j + 1; k < n; k++) {
                // Calculate triangle area using cross product formula
                // Area = |x1(y2-y3) + x2(y3-y1) + x3(y1-y2)| / 2
                // Using direct array access for maximum performance
                const area = Math.abs(points[i][0] * (points[j][1] - points[k][1]) + 
                                    points[j][0] * (points[k][1] - points[i][1]) + 
                                    points[k][0] * (points[i][1] - points[j][1])) * 0.5;
                
                // Update maximum area if current triangle is larger
                if (area > maxArea) maxArea = area;
            }
        }
    }
    
    // Return the largest triangle area found
    return maxArea;
}
