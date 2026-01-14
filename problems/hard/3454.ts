/*
3454. Separate Squares II

You are given a 2D integer array squares. Each squares[i] = [xi, yi, li] represents the coordinates of the bottom-left point and the side length of a square parallel to the x-axis.
Find the minimum y-coordinate value of a horizontal line such that the total area covered by squares above the line equals the total area covered by squares below the line.
Answers within 10-5 of the actual answer will be accepted.

Note: Squares may overlap. Overlapping areas should be counted only once in this version.

Example 1:
Input: squares = [[0,0,1],[2,2,1]]
Output: 1.00000
Explanation:
Any horizontal line between y = 1 and y = 2 results in an equal split, with 1 square unit above and 1 square unit below. The minimum y-value is 1.

Example 2:
Input: squares = [[0,0,2],[1,1,1]]
Output: 1.00000
Explanation:
Since the blue square overlaps with the red square, it will not be counted again. Thus, the line y = 1 splits the squares into two equal parts.

Constraints:
1 <= squares.length <= 5 * 10^4
squares[i] = [xi, yi, li]
squares[i].length == 3
0 <= xi, yi <= 10^9
1 <= li <= 10^9
The total area of all the squares will not exceed 10^15.

</> Typescript code:
*/

function separateSquares(squares: number[][]): number {
    const n = squares.length;
    const xCoords = new Set<number>();
    const events: [number, number, number, number][] = [];
    
    // Prepare Sweep Line events and collect X coordinates for compression
    for (const [x, y, l] of squares) {
        xCoords.add(x);
        xCoords.add(x + l);
        // Event format: [y-coordinate, type (start/end), x_start, x_end]
        events.push([y, 1, x, x + l], [y + l, -1, x, x + l]);
    }
    
    // Coordinate compression on X to handle 0 to 10^9 range
    const sortedX = Array.from(xCoords).sort((a, b) => a - b);
    const xMap = new Map<number, number>();
    for (let i = 0; i < sortedX.length; i++) xMap.set(sortedX[i], i);
    
    // Sort events by Y coordinate for vertical sweep
    events.sort((a, b) => a[0] - b[0]);

    const m = sortedX.length;
    // Segment tree to maintain the union length of active horizontal segments
    const treeCount = new Int32Array(4 * m); // Stores number of active squares over a range
    const treeLen = new Float64Array(4 * m);  // Stores actual covered width of a range

    // Standard segment tree update function for Area of Union of Rectangles
    function update(node: number, start: number, end: number, L: number, R: number, val: number) {
        if (L <= start && end <= R) {
            treeCount[node] += val;
        } else {
            const mid = (start + end) >> 1;
            if (L < mid) update(node * 2, start, mid, L, R, val);
            if (R > mid) update(node * 2 + 1, mid, end, L, R, val);
        }
        // If count > 0, the entire range [start, end] is covered
        if (treeCount[node] > 0) {
            treeLen[node] = sortedX[end] - sortedX[start];
        } else {
            // Otherwise, length is the sum of children's lengths
            treeLen[node] = (start + 1 === end) ? 0 : treeLen[node * 2] + treeLen[node * 2 + 1];
        }
    }

    // First pass: Calculate the total area of the union of all squares
    let totalArea = 0;
    for (let i = 0; i < events.length - 1; i++) {
        update(1, 0, m - 1, xMap.get(events[i][2])!, xMap.get(events[i][3])!, events[i][1]);
        totalArea += treeLen[1] * (events[i + 1][0] - events[i][0]);
    }

    // Second pass: Find the Y-coordinate where current cumulative area reaches half of total
    const target = totalArea / 2;
    let currentArea = 0;
    treeCount.fill(0); // Reset segment tree
    treeLen.fill(0);

    for (let i = 0; i < events.length - 1; i++) {
        update(1, 0, m - 1, xMap.get(events[i][2])!, xMap.get(events[i][3])!, events[i][1]);
        const height = events[i + 1][0] - events[i][0];
        const areaSegment = treeLen[1] * height;
        // If adding this segment exceeds target, the split line is within this height interval
        if (currentArea + areaSegment >= target - 1e-9) {
            // Linear interpolation to find the exact Y
            return events[i][0] + (target - currentArea) / treeLen[1];
        }
        currentArea += areaSegment;
    }
    return events[events.length - 1][0];
}
