/*
3623. Count Number of Trapezoids I

You are given a 2D integer array points, where points[i] = [xi, yi] represents the coordinates of the ith point on the Cartesian plane.
A horizontal trapezoid is a convex quadrilateral with at least one pair of horizontal sides (i.e. parallel to the x-axis). Two lines are parallel if and only if they have the same slope.
Return the number of unique horizontal trapezoids that can be formed by choosing any four distinct points from points.
Since the answer may be very large, return it modulo 109 + 7.

Example 1:
Input: points = [[1,0],[2,0],[3,0],[2,2],[3,2]]
Output: 3
Explanation:
There are three distinct ways to pick four points that form a horizontal trapezoid:
Using points [1,0], [2,0], [3,2], and [2,2].
Using points [2,0], [3,0], [3,2], and [2,2].
Using points [1,0], [3,0], [3,2], and [2,2].

Example 2:
Input: points = [[0,0],[1,0],[0,1],[2,1]]
Output: 1
Explanation:
There is only one horizontal trapezoid that can be formed.

Constraints:
4 <= points.length <= 10^5
–10^8 <= xi, yi <= 10^8
All points are pairwise distinct.

</> Typescript code:
*/

function countTrapezoids(points: number[][]): number {
    // We define the modulus as a BigInt because intermediate calculations (squares)
    // might exceed the safe integer limit of standard Javascript Numbers (2^53).
    const MOD = 1000000007n;
    
    // We need to divide by 2 at the end of the formula. In modular arithmetic,
    // division by X is multiplication by the modular inverse of X.
    // The modular inverse of 2 modulo 10^9 + 7 is (10^9 + 8) / 2 = 500000004.
    const INV_2 = 500000004n;

    // OPTIMIZATION 1: Grouping by Y-coordinate.
    // Instead of using a Map (which has overhead), we sort the points by their Y-coordinate.
    // This allows us to process horizontal lines contiguously in O(N log N) time.
    // We don't care about X sorting for the count, just that they exist on the same Y plane.
    points.sort((a, b) => a[1] - b[1]);

    // Variable to store sum(P_i), where P_i is the number of pairs on line i.
    let totalPairsSum = 0n;
    // Variable to store sum(P_i^2).
    let sumOfSquaredPairs = 0n;

    let i = 0;
    const n = points.length;

    // Iterate through the sorted points to process each horizontal line (group of same Y).
    while (i < n) {
        let j = i + 1;
        
        // Advance j until we hit a point with a different Y coordinate.
        // The points from index i to j-1 all lie on the same horizontal line.
        while (j < n && points[j][1] === points[i][1]) {
            j++;
        }

        // Calculate the number of points on this specific horizontal line.
        const count = BigInt(j - i);
        
        // A trapezoid requires picking 2 points from one line and 2 from another.
        // We can only form a valid "base" on this line if we have at least 2 points.
        if (count > 1n) {
            // Calculate Combinations(count, 2): The number of ways to pick 2 points from this line.
            // Formula: n * (n - 1) / 2
            const pairs = (count * (count - 1n) / 2n) % MOD;

            // Accumulate simple sum for the formula later.
            totalPairsSum = (totalPairsSum + pairs) % MOD;
            
            // Accumulate the square of the pairs for the formula later.
            sumOfSquaredPairs = (sumOfSquaredPairs + (pairs * pairs) % MOD) % MOD;
        }

        // Move the pointer i to j to start processing the next group (next Y coordinate).
        i = j;
    }

    // ALGEBRAIC OPTIMIZATION:
    // We need the sum of products of pairs from distinct lines: Sum(P_i * P_j) for all i < j.
    // A naive double loop would be O(M^2) where M is the number of lines (too slow).
    // We use the identity: (Sum(P_i))^2 = Sum(P_i^2) + 2 * Sum(P_i * P_j).
    // Therefore: Sum(P_i * P_j) = ((Sum(P_i))^2 - Sum(P_i^2)) / 2.
    
    // 1. Calculate (totalPairsSum)^2 - sumOfSquaredPairs
    // We add MOD before modulo to ensure the result of the subtraction is non-negative.
    const numerator = (totalPairsSum * totalPairsSum - sumOfSquaredPairs + MOD) % MOD;
    
    // 2. Divide by 2 (multiply by modular inverse) and return result as a standard Number.
    return Number((numerator * INV_2) % MOD);
};
