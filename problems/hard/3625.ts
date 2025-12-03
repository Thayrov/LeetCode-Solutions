/*
3625. Count Number of Trapezoids II

You are given a 2D integer array points where points[i] = [xi, yi] represents the coordinates of the ith point on the Cartesian plane.
Return the number of unique trapezoids that can be formed by choosing any four distinct points from points.
A trapezoid is a convex quadrilateral with at least one pair of parallel sides. Two lines are parallel if and only if they have the same slope.

Example 1:
Input: points = [[-3,2],[3,0],[2,3],[3,2],[2,-3]]
Output: 2
Explanation:
There are two distinct ways to pick four points that form a trapezoid:
The points [-3,2], [2,3], [3,2], [2,-3] form one trapezoid.
The points [2,3], [3,2], [3,0], [2,-3] form another trapezoid.

Example 2:
Input: points = [[0,0],[1,0],[0,1],[2,1]]
Output: 1
Explanation:
There is only one trapezoid which can be formed.

Constraints:
4 <= points.length <= 500
–1000 <= xi, yi <= 1000
All points are pairwise distinct.

</> Typescript code:
*/

/**
 * Calculates the number of unique trapezoids formed by 4 points.
 * * Logic Overview:
 * 1. A trapezoid is formed by choosing 4 points. It must have at least one pair of parallel sides.
 * 2. This includes "strict" trapezoids (exactly 1 pair parallel) and parallelograms (2 pairs parallel).
 * 3. We calculate `TotalParallelPairs` = the number of ways to choose 2 segments (S1, S2) such that:
 * - S1 is parallel to S2
 * - S1 and S2 are not on the same infinite line (not collinear).
 * - This count includes strict trapezoids (counted once) and parallelograms (counted twice, once for each pair of sides).
 * 4. We calculate `TrueParallelograms` = the number of valid parallelograms.
 * - A parallelogram is formed by diagonals that bisect each other.
 * - We find pairs of segments (diagonals) that share the same midpoint.
 * - However, if the diagonals are collinear (same slope), they do not form a quadrilateral. We must exclude these.
 * 5. Final Answer = `TotalParallelPairs` - `TrueParallelograms`.
 * - (Strict + 2*Para) - Para = Strict + Para.
 */
function countTrapezoidsCommented(points: number[][]): number {
    const n = points.length;
    if (n < 4) return 0;

    const gcd = (a: number, b: number): number => {
        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    };

    // Maps to count segments on specific infinite lines
    // lineGroups: "slope:intercept" -> count of segments
    const lineGroups = new Map<string, number>(); 
    // slopeToLines: "slope" -> list of "slope:intercept" keys
    const slopeToLines = new Map<string, string[]>();

    // Maps for parallelogram detection (Diagonals logic)
    // midTotal: "midX:midY" -> total number of segments centered here
    const midTotal = new Map<string, number>();
    // midSlope: "midX:midY|slope" -> number of segments centered here with specific slope
    const midSlope = new Map<string, number>();

    // O(N^2) Iteration
    for (let i = 0; i < n; i++) {
        const [x1, y1] = points[i];
        for (let j = i + 1; j < n; j++) {
            const [x2, y2] = points[j];

            // 1. Geometry Math
            let dy = y1 - y2;
            let dx = x1 - x2;
            const g = gcd(Math.abs(dy), Math.abs(dx));
            dy /= g;
            dx /= g;

            // Normalize vector direction
            if (dx < 0 || (dx === 0 && dy < 0)) {
                dx = -dx;
                dy = -dy;
            }

            const slopeKey = `${dx}:${dy}`;
            
            // Cross product represents the intercept C in Ax + By + C = 0
            const cross = dx * y1 - dy * x1;
            const lineKey = `${slopeKey}:${cross}`;

            // 2. Populate Line/Slope Data
            if (!lineGroups.has(lineKey)) {
                lineGroups.set(lineKey, 0);
                if (!slopeToLines.has(slopeKey)) {
                    slopeToLines.set(slopeKey, []);
                }
                slopeToLines.get(slopeKey)!.push(lineKey);
            }
            lineGroups.set(lineKey, lineGroups.get(lineKey)! + 1);

            // 3. Populate Midpoint Data (Midpoint * 2 to avoid floats)
            const midKey = `${x1 + x2}:${y1 + y2}`;
            midTotal.set(midKey, (midTotal.get(midKey) || 0) + 1);
            
            // Track slope at this midpoint to detect collinear diagonals later
            const midSlopeKey = `${midKey}|${slopeKey}`;
            midSlope.set(midSlopeKey, (midSlope.get(midSlopeKey) || 0) + 1);
        }
    }

    // Calculate 'trapezoids' count (includes double-counted parallelograms)
    // Logic: Sum of products of counts of parallel lines
    let trapezoids = 0;
    for (const lines of slopeToLines.values()) {
        // Need at least 2 distinct lines with same slope
        if (lines.length < 2) continue;
        
        let sum = 0;
        let sqSum = 0;
        for (const lineKey of lines) {
            const count = lineGroups.get(lineKey)!;
            sum += count;
            sqSum += count * count;
        }
        // Algebra shortcut for Sum(a[i] * a[j]) for distinct i, j
        trapezoids += (sum * sum - sqSum) / 2;
    }

    // Calculate actual parallelograms via Diagonals
    let parallelograms = 0;
    
    // Step A: Calculate all pairs of segments sharing a midpoint
    for (const total of midTotal.values()) {
        if (total < 2) continue;
        parallelograms += (total * (total - 1)) / 2;
    }

    // Step B: Remove pairs that share midpoint AND slope (Collinear points)
    // These are degenerate quads (4 points on a line), not parallelograms.
    for (const count of midSlope.values()) {
        if (count > 1) {
            parallelograms -= (count * (count - 1)) / 2;
        }
    }

    // Final result: (Strict + 2*Para) - Para = Strict + Para
    return trapezoids - parallelograms;
}
