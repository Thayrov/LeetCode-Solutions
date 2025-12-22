/*
960. Delete Columns to Make Sorted III

You are given an array of n strings strs, all of the same length.
We may choose any deletion indices, and we delete all the characters in those indices for each string.
For example, if we have strs = ["abcdef","uvwxyz"] and deletion indices {0, 2, 3}, then the final array after deletions is ["bef", "vyz"].
Suppose we chose a set of deletion indices answer such that after deletions, the final array has every string (row) in lexicographic order. (i.e., (strs[0][0] <= strs[0][1] <= ... <= strs[0][strs[0].length - 1]), and (strs[1][0] <= strs[1][1] <= ... <= strs[1][strs[1].length - 1]), and so on). Return the minimum possible value of answer.length.

Example 1:
Input: strs = ["babca","bbazb"]
Output: 3
Explanation: After deleting columns 0, 1, and 4, the final array is strs = ["bc", "az"].
Both these rows are individually in lexicographic order (ie. strs[0][0] <= strs[0][1] and strs[1][0] <= strs[1][1]).
Note that strs[0] > strs[1] - the array strs is not necessarily in lexicographic order.

Example 2:
Input: strs = ["edcba"]
Output: 4
Explanation: If we delete less than 4 columns, the only row will not be lexicographically sorted.

Example 3:
Input: strs = ["ghi","def","abc"]
Output: 0
Explanation: All rows are already lexicographically sorted.

Constraints:
n == strs.length
1 <= n <= 100
1 <= strs[i].length <= 100
strs[i] consists of lowercase English letters.

</> Typescript code:
*/

function minDeletionSize(strs: string[]): number {
    const n = strs.length; // Number of rows
    const m = strs[0].length; // Total number of columns
    // dp[i] stores the maximum number of columns we can keep ending at index i
    const dp = new Array(m).fill(1);
    // Track the global maximum number of columns we can keep
    let maxKeep = 1;

    // Iterate through each column to determine the max keepable sequence ending there
    for (let i = 1; i < m; i++) {
        // Look at all previous columns j to see if j can come before i
        for (let j = 0; j < i; j++) {
            let valid = true;
            // Column j can precede column i ONLY if it doesn't break sorting in ANY row
            for (let k = 0; k < n; k++) {
                // If any row has a character at j greater than at i, it's not lexicographical
                if (strs[k][j] > strs[k][i]) {
                    valid = false;
                    break; // Optimization: stop checking rows for this j
                }
            }
            // If valid for all rows, update dp[i] using the LIS logic
            if (valid) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        // Update the overall maximum found so far
        if (dp[i] > maxKeep) maxKeep = dp[i];
    }

    // The result is total columns minus the maximum columns we can keep
    return m - maxKeep;
}
