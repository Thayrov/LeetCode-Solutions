/*
3047. Find the Largest Area of Square Inside Two Rectangles

There exist n rectangles in a 2D plane with edges parallel to the x and y axis. You are given two 2D integer arrays bottomLeft and topRight where bottomLeft[i] = [a_i, b_i] and topRight[i] = [c_i, d_i] represent the bottom-left and top-right coordinates of the ith rectangle, respectively.
You need to find the maximum area of a square that can fit inside the intersecting region of at least two rectangles. Return 0 if such a square does not exist.

Example 1:
Input: bottomLeft = [[1,1],[2,2],[3,1]], topRight = [[3,3],[4,4],[6,6]]
Output: 1
Explanation:
A square with side length 1 can fit inside either the intersecting region of rectangles 0 and 1 or the intersecting region of rectangles 1 and 2. Hence the maximum area is 1. It can be shown that a square with a greater side length can not fit inside any intersecting region of two rectangles.

Example 2:
Input: bottomLeft = [[1,1],[1,3],[1,5]], topRight = [[5,5],[5,7],[5,9]]
Output: 4
Explanation:
A square with side length 2 can fit inside either the intersecting region of rectangles 0 and 1 or the intersecting region of rectangles 1 and 2. Hence the maximum area is 2 * 2 = 4. It can be shown that a square with a greater side length can not fit inside any intersecting region of two rectangles.

Example 3:
Input: bottomLeft = [[1,1],[2,2],[1,2]], topRight = [[3,3],[4,4],[3,4]]
Output: 1
Explanation:
A square with side length 1 can fit inside the intersecting region of any two rectangles. Also, no larger square can, so the maximum area is 1. Note that the region can be formed by the intersection of more than 2 rectangles.

Example 4:
Input: bottomLeft = [[1,1],[3,3],[3,1]], topRight = [[2,2],[4,4],[4,2]]
Output: 0
Explanation:
No pair of rectangles intersect, hence, the answer is 0.

Constraints:
n == bottomLeft.length == topRight.length
2 <= n <= 10^3
bottomLeft[i].length == topRight[i].length == 2
1 <= bottomLeft[i][0], bottomLeft[i][1] <= 10^7
1 <= topRight[i][0], topRight[i][1] <= 10^7
bottomLeft[i][0] < topRight[i][0]
bottomLeft[i][1] < topRight[i][1]

</> Typescript code:
*/

function largestSquareArea(bottomLeft: number[][], topRight: number[][]): number {
    // Initialize maxSide to track the largest square side length found
    let maxSide = 0;
    // Cache the length of the input array
    const n = bottomLeft.length;

    // Outer loop to select the first rectangle in the pair
    for (let i = 0; i < n; i++) {
        const b1 = bottomLeft[i];
        const t1 = topRight[i];
        // Inner loop to select the second unique rectangle (j > i avoids duplicate pairs)
        for (let j = i + 1; j < n; j++) {
            const b2 = bottomLeft[j];
            const t2 = topRight[j];

            // Calculate the boundaries of the intersection region
            // The left edge of intersection is the maximum of the two left edges
            const interLeft = Math.max(b1[0], b2[0]);
            // The right edge of intersection is the minimum of the two right edges
            const interRight = Math.min(t1[0], t2[0]);
            // The bottom edge of intersection is the maximum of the two bottom edges
            const interBottom = Math.max(b1[1], b2[1]);
            // The top edge of intersection is the minimum of the two top edges
            const interTop = Math.min(t1[1], t2[1]);

            // Check if there is a valid overlapping area (width and height > 0)
            if (interRight > interLeft && interTop > interBottom) {
                // The largest square in a rectangle is limited by its shortest dimension
                const side = Math.min(interRight - interLeft, interTop - interBottom);
                // Update maxSide if the current square is larger than the previous maximum
                if (side > maxSide) maxSide = side;
            }
        }
    }

    // Return the area (side squared). Use bigints if results could exceed 2^53 - 1, 
    // but per constraints (10^7), side^2 fits in a standard number.
    return maxSide * maxSide;
}
