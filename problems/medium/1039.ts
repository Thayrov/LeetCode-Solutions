/*
1039. Minimum Score Triangulation of Polygon

You have a convex n-sided polygon where each vertex has an integer value. You are given an integer array values where values[i] is the value of the ith vertex in clockwise order.
Polygon triangulation is a process where you divide a polygon into a set of triangles and the vertices of each triangle must also be vertices of the original polygon. Note that no other shapes other than triangles are allowed in the division. This process will result in n - 2 triangles.
You will triangulate the polygon. For each triangle, the weight of that triangle is the product of the values at its vertices. The total score of the triangulation is the sum of these weights over all n - 2 triangles.
Return the minimum possible score that you can achieve with some triangulation of the polygon.

Example 1:
Input: values = [1,2,3]
Output: 6
Explanation: The polygon is already triangulated, and the score of the only triangle is 6.

Example 2:
Input: values = [3,7,4,5]
Output: 144
Explanation: There are two triangulations, with possible scores: 3*7*5 + 4*5*7 = 245, or 3*4*5 + 3*4*7 = 144.
The minimum score is 144.

Example 3:
Input: values = [1,3,1,4,1,5]
Output: 13
Explanation: The minimum score triangulation is 1*1*3 + 1*1*4 + 1*1*5 + 1*1*1 = 13.

Constraints:
n == values.length
3 <= n <= 50
1 <= values[i] <= 100

</> Typescript code:
*/

function minScoreTriangulation(values: number[]): number {
    // Store the number of vertices in the polygon
    const n = values.length;
    
    // Initialize DP table where dp[i][j] represents the minimum score
    // to triangulate the polygon segment from vertex i to vertex j
    const dp: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
    
    // Iterate over all possible polygon segment lengths starting from 3 (minimum triangle)
    // len represents the number of vertices in the current segment
    for (let len = 3; len <= n; len++) {
        // For each length, try all possible starting positions
        // i is the starting vertex of the segment
        for (let i = 0; i + len - 1 < n; i++) {
            // j is the ending vertex of the segment (i + len - 1)
            const j = i + len - 1;
            
            // Initialize with infinity to find minimum
            dp[i][j] = Infinity;
            
            // Try all possible middle vertices k that form a triangle with i and j
            // k must be between i and j (exclusive)
            for (let k = i + 1; k < j; k++) {
                // Calculate the score for this triangulation:
                // - dp[i][k]: minimum score for left sub-polygon from i to k
                // - dp[k][j]: minimum score for right sub-polygon from k to j
                // - values[i] * values[k] * values[j]: score of triangle formed by vertices i, k, j
                // Update dp[i][j] with the minimum score found
                dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j] + values[i] * values[k] * values[j]);
            }
        }
    }
    
    // Return the minimum score for triangulating the entire polygon (from vertex 0 to n-1)
    return dp[0][n - 1];
}
