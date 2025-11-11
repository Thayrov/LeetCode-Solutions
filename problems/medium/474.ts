/*
474. Ones and Zeroes

You are given an array of binary strings strs and two integers m and n.
Return the size of the largest subset of strs such that there are at most m 0's and n 1's in the subset.
A set x is a subset of a set y if all elements of x are also elements of y.

Example 1:
Input: strs = ["10","0001","111001","1","0"], m = 5, n = 3
Output: 4
Explanation: The largest subset with at most 5 0's and 3 1's is {"10", "0001", "1", "0"}, so the answer is 4.
Other valid but smaller subsets include {"0001", "1"} and {"10", "1", "0"}.
{"111001"} is an invalid subset because it contains 4 1's, greater than the maximum of 3.

Example 2:
Input: strs = ["10","0","1"], m = 1, n = 1
Output: 2
Explanation: The largest subset is {"0", "1"}, so the answer is 2.

Constraints:
1 <= strs.length <= 600
1 <= strs[i].length <= 100
strs[i] consists only of digits '0' and '1'.
1 <= m, n <= 100

</> Typescript code:
*/

function findMaxForm(strs: string[], m: number, n: number): number {
    // Initialize 2D DP array where dp[i][j] represents the maximum number of strings
    // we can form with at most i zeros and j ones
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    
    // Iterate through each string in the input array
    for (const str of strs) {
        // Count the number of zeros and ones in the current string
        let zeros = 0, ones = 0;
        for (const char of str) {
            if (char === '0') zeros++;
            else ones++;
        }
        
        // Traverse the DP table backwards to avoid using the same string multiple times
        // Start from m down to the minimum required zeros for this string
        for (let i = m; i >= zeros; i--) {
            // Start from n down to the minimum required ones for this string
            for (let j = n; j >= ones; j--) {
                // Update dp[i][j] by taking the maximum of:
                // 1. Not including the current string: dp[i][j]
                // 2. Including the current string: dp[i - zeros][j - ones] + 1
                dp[i][j] = Math.max(dp[i][j], dp[i - zeros][j - ones] + 1);
            }
        }
    }
    
    // Return the maximum number of strings that can be formed with m zeros and n ones
    return dp[m][n];
}
