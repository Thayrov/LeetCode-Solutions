/*
11. Container With Most Water

You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
Find two lines that together with the x-axis form a container, such that the container contains the most water.
Return the maximum amount of water a container can store.
Notice that you may not slant the container.

Example 1:
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.

Example 2:
Input: height = [1,1]
Output: 1

Constraints:
n == height.length
2 <= n <= 10^5
0 <= height[i] <= 10^4

</> Typescript code:
*/

function maxArea(height: number[]): number {
    // Initialize left pointer at start, right pointer at end
    let l = 0, r = height.length - 1, max = 0;
    
    // Two-pointer approach: move pointers inward until they meet
    while (l < r) {
        // Determine container height (min of two lines) and move the shorter pointer inward
        // This is optimal because moving the taller pointer can only decrease area
        const h = height[l] < height[r] ? height[l++] : height[r--];
        
        // Calculate area: height * width (after pointer moved, so add 1 back)
        const area = h * (r - l + 1);
        
        // Update maximum area if current area is larger
        if (area > max) max = area;
    }
    
    // Return the maximum area found
    return max;
}
