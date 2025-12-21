/*
955. Delete Columns to Make Sorted II

You are given an array of n strings strs, all of the same length.
We may choose any deletion indices, and we delete all the characters in those indices for each string.
For example, if we have strs = ["abcdef","uvwxyz"] and deletion indices {0, 2, 3}, then the final array after deletions is ["bef", "vyz"].
Suppose we chose a set of deletion indices answer such that after deletions, the final array has its elements in lexicographic order (i.e., strs[0] <= strs[1] <= strs[2] <= ... <= strs[n - 1]). Return the minimum possible value of answer.length.

Example 1:
Input: strs = ["ca","bb","ac"]
Output: 1
Explanation: 
After deleting the first column, strs = ["a", "b", "c"].
Now strs is in lexicographic order (ie. strs[0] <= strs[1] <= strs[2]).
We require at least 1 deletion since initially strs was not in lexicographic order, so the answer is 1.

Example 2:
Input: strs = ["xc","yb","za"]
Output: 0
Explanation: 
strs is already in lexicographic order, so we do not need to delete anything.
Note that the rows of strs are not necessarily in lexicographic order:
i.e., it is NOT necessarily true that (strs[0][0] <= strs[0][1] <= ...)

Example 3:
Input: strs = ["zyx","wvu","tsr"]
Output: 3
Explanation: We have to delete every column.

Constraints:
n == strs.length
1 <= n <= 100
1 <= strs[i].length <= 100
strs[i] consists of lowercase English letters.

</> Typescript code:
*/

function minDeletionSize(strs: string[]): number {
    const n = strs.length; // Number of strings in the array
    const m = strs[0].length; // Length of each string (number of columns)
    let res = 0; // Counter for deleted columns
    // tracks if pair (strs[i], strs[i+1]) is already lexicographically sorted
    const isSorted = new Array(n - 1).fill(false);

    // Iterate through each column greedily
    for (let j = 0; j < m; j++) {
        let i = 0;
        // Check if current column j violates the sorted property for any unsorted pair
        for (; i < n - 1; i++) {
            // If the pair isn't sorted yet and current char makes them unsorted...
            if (!isSorted[i] && strs[i][j] > strs[i + 1][j]) {
                res++; // Mark this column for deletion
                break; // Exit loop to avoid redundant checks for this column
            }
        }

        // If we reached the end of the loop, the column is valid (not deleted)
        if (i === n - 1) {
            // Update the sorted status of pairs based on this valid column
            for (let k = 0; k < n - 1; k++) {
                // If current char is strictly less, the whole strings are now sorted
                if (strs[k][j] < strs[k + 1][j]) {
                    isSorted[k] = true;
                }
            }
        }
    }
    // Return total number of columns removed
    return res;
}
