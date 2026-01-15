/*
2943. Maximize Area of Square Hole in Grid

You are given the two integers, n and m and two integer arrays, hBars and vBars. The grid has n + 2 horizontal and m + 2 vertical bars, creating 1 x 1 unit cells. The bars are indexed starting from 1.
You can remove some of the bars in hBars from horizontal bars and some of the bars in vBars from vertical bars. Note that other bars are fixed and cannot be removed.
Return an integer denoting the maximum area of a square-shaped hole in the grid, after removing some bars (possibly none).

Example 1:
Input: n = 2, m = 1, hBars = [2,3], vBars = [2]
Output: 4
Explanation:
The left image shows the initial grid formed by the bars. The horizontal bars are [1,2,3,4], and the vertical bars are [1,2,3].
One way to get the maximum square-shaped hole is by removing horizontal bar 2 and vertical bar 2.

Example 2:
Input: n = 1, m = 1, hBars = [2], vBars = [2]
Output: 4
Explanation:
To get the maximum square-shaped hole, we remove horizontal bar 2 and vertical bar 2.

Example 3:
Input: n = 2, m = 3, hBars = [2,3], vBars = [2,4]
Output: 4
Explanation:
One way to get the maximum square-shaped hole is by removing horizontal bar 3, and vertical bar 4.

Constraints:
1 <= n <= 10^9
1 <= m <= 10^9
1 <= hBars.length <= 100
2 <= hBars[i] <= n + 1
1 <= vBars.length <= 100
2 <= vBars[i] <= m + 1
All values in hBars are distinct.
All values in vBars are distinct.

</> Typescript code:
*/

function maximizeSquareHoleArea(n: number, m: number, hBars: number[], vBars: number[]): number {
    /**
     * Helper function to find the maximum number of consecutive bars.
     * A gap's length is (number of consecutive bars + 1).
     */
    const getMaxGap = (bars: number[]): number => {
        // Sort bars numerically to easily identify consecutive sequences
        bars.sort((a, b) => a - b);
        
        // maxLen tracks the longest consecutive sequence found, currentLen tracks the current streak
        let maxLen = 1, currentLen = 1;
        
        for (let i = 1; i < bars.length; i++) {
            // If the current bar is exactly 1 unit away from the previous, increment the streak
            if (bars[i] === bars[i - 1] + 1) {
                currentLen++;
            } else {
                // Otherwise, update maxLen and reset the current streak counter
                maxLen = maxLen > currentLen ? maxLen : currentLen;
                currentLen = 1;
            }
        }
        // Final check to see if the last streak was the longest
        maxLen = maxLen > currentLen ? maxLen : currentLen;
        
        // The side length of the gap is the number of consecutive bars plus one
        return maxLen + 1;
    };

    // The side of the square hole is the smaller of the two maximum gaps available
    const side = Math.min(getMaxGap(hBars), getMaxGap(vBars));
    
    // Return the area of the largest square
    return side * side;
}
