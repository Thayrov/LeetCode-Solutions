/*
757. Set Intersection Size At Least Two

You are given a 2D integer array intervals where intervals[i] = [starti, endi] represents all the integers from starti to endi inclusively.
A containing set is an array nums where each interval from intervals has at least two integers in nums.
For example, if intervals = [[1,3], [3,7], [8,9]], then [1,2,4,7,8,9] and [2,3,4,8,9] are containing sets.
Return the minimum possible size of a containing set.

Example 1:
Input: intervals = [[1,3],[3,7],[8,9]]
Output: 5
Explanation: let nums = [2, 3, 4, 8, 9].
It can be shown that there cannot be any containing array of size 4.

Example 2:
Input: intervals = [[1,3],[1,4],[2,5],[3,5]]
Output: 3
Explanation: let nums = [2, 3, 4].
It can be shown that there cannot be any containing array of size 2.

Example 3:
Input: intervals = [[1,2],[2,3],[2,4],[4,5]]
Output: 5
Explanation: let nums = [1, 2, 3, 4, 5].
It can be shown that there cannot be any containing array of size 4.

Constraints:
1 <= intervals.length <= 3000
intervals[i].length == 2
0 <= starti < endi <= 10^8

</> Typescript code:
*/

function intersectionSizeTwo(intervals: number[][]): number {
    // OPTIMIZATION: Sorting is crucial for the greedy strategy.
    // Primary Sort: Sort by end time ascending (a[1] - b[1]). 
    //   This allows us to process intervals that finish earliest first. By picking 
    //   numbers near the end of these intervals, we maximize the chance they overlap 
    //   with subsequent intervals (which start later or end later).
    // Secondary Sort: If end times are equal, sort by start time descending (b[0] - a[0]).
    //   This ensures we process the shortest (most restrictive) interval first among ties.
    //   If we satisfy the "hardest" interval ending at X, the easier ones (starting earlier)
    //   will automatically be satisfied by the points we picked.
    intervals.sort((a, b) => a[1] === b[1] ? b[0] - a[0] : a[1] - b[1]);

    let count = 0;
    
    // p1 and p2 represent the two largest numbers currently in our "containing set".
    // p2 is the largest, p1 is the second largest.
    // We initialize them to -1 as coordinates are non-negative.
    let p1 = -1;
    let p2 = -1;

    for (let i = 0; i < intervals.length; i++) {
        const s = intervals[i][0]; // Current start
        const e = intervals[i][1]; // Current end

        // Case 1: No overlap.
        // The current interval starts after our largest selected number (p2).
        // We need to pick 2 new numbers. To maximize future overlaps (Greedy),
        // we pick the two largest possible numbers in this interval: 'e' and 'e-1'.
        if (s > p2) {
            count += 2;
            p2 = e;     // Largest is now end of current
            p1 = e - 1; // Second largest is end-1
        } 
        // Case 2: Partial overlap.
        // The current interval starts after p1 but before or at p2.
        // This means p2 is inside [s, e], but p1 is outside.
        // We already have 1 number (p2) covering this interval. We need 1 more.
        // We pick the largest possible number: 'e'.
        else if (s > p1) {
            count += 1;
            p1 = p2; // The old p2 becomes the new second-largest
            p2 = e;  // The new largest is the end of current
        }
        // Case 3: Full overlap.
        // s <= p1. Since p1 < p2, this means both p1 and p2 are inside [s, e].
        // The condition "at least two integers" is already met.
        // We do nothing.
    }

    return count;
};
