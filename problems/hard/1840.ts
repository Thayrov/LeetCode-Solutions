/*
1840. Maximum Building Height

Hint
You want to build n new buildings in a city. The new buildings will be built in a line and are labeled from 1 to n.
However, there are city restrictions on the heights of the new buildings:
The height of each building must be a non-negative integer.
The height of the first building must be 0.
The height difference between any two adjacent buildings cannot exceed 1.
Additionally, there are city restrictions on the maximum height of specific buildings. These restrictions are given as a 2D integer array restrictions where restrictions[i] = [idi, maxHeighti] indicates that building idi must have a height less than or equal to maxHeighti.
It is guaranteed that each building will appear at most once in restrictions, and building 1 will not be in restrictions.
Return the maximum possible height of the tallest building.

Example 1:
Input: n = 5, restrictions = [[2,1],[4,1]]
Output: 2
Explanation: The green area in the image indicates the maximum allowed height for each building.
We can build the buildings with heights [0,1,2,1,2], and the tallest building has a height of 2.

Example 2:
Input: n = 6, restrictions = []
Output: 5
Explanation: The green area in the image indicates the maximum allowed height for each building.
We can build the buildings with heights [0,1,2,3,4,5], and the tallest building has a height of 5.

Example 3:
Input: n = 10, restrictions = [[5,3],[2,5],[7,4],[10,3]]
Output: 5
Explanation: The green area in the image indicates the maximum allowed height for each building.
We can build the buildings with heights [0,1,2,3,3,4,4,5,4,3], and the tallest building has a height of 5.
 
Constraints:
2 <= n <= 10^9
0 <= restrictions.length <= min(n - 1, 10^5)
2 <= idi <= n
idi is unique.
0 <= maxHeighti <= 10^9

</> Typescript code:
*/

// Defines the function that returns the tallest achievable building height.
function maxBuilding(n: number, restrictions: number[][]): number {
    // Adds the mandatory restriction that building 1 has height 0.
    restrictions.push([1, 0]);

    // Sorts restrictions by building position.
    restrictions.sort((a, b) => a[0] - b[0]);

    // Propagates maximum allowed heights from left to right.
    for (let i = 1; i < restrictions.length; i++) {
        // Calculates the distance from the previous restricted building.
        const distance = restrictions[i][0] - restrictions[i - 1][0];

        // Tightens the current restriction using the adjacent-height rule.
        restrictions[i][1] = Math.min(
            // Keeps the explicitly specified maximum when it is smaller.
            restrictions[i][1],
            // Limits growth to one height unit per building from the left.
            restrictions[i - 1][1] + distance
        );
    }

    // Propagates maximum allowed heights from right to left.
    for (let i = restrictions.length - 2; i >= 0; i--) {
        // Calculates the distance to the next restricted building.
        const distance = restrictions[i + 1][0] - restrictions[i][0];

        // Tightens the current restriction using the right-side limit.
        restrictions[i][1] = Math.min(
            // Keeps the current maximum when it is smaller.
            restrictions[i][1],
            // Limits growth to one height unit per building from the right.
            restrictions[i + 1][1] + distance
        );
    }

    // Stores the greatest reachable height found so far.
    let maximum = 0;

    // Examines every interval between consecutive restrictions.
    for (let i = 1; i < restrictions.length; i++) {
        // Calculates the number of steps between both restricted buildings.
        const distance = restrictions[i][0] - restrictions[i - 1][0];

        // Calculates the highest integer point where both height slopes meet.
        const peak = Math.floor(
            // Combines both endpoint heights and the available distance.
            (restrictions[i - 1][1] + restrictions[i][1] + distance) / 2
        );

        // Updates the global maximum with the interval's peak.
        maximum = Math.max(maximum, peak);
    }

    // Retrieves the rightmost restricted building.
    const last = restrictions[restrictions.length - 1];

    // Compares interval peaks with unrestricted growth after the final restriction.
    return Math.max(maximum, last[1] + n - last[0]);
}