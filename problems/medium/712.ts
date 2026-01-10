/*
712. Minimum ASCII Delete Sum for Two Strings

Given two strings s1 and s2, return the lowest ASCII sum of deleted characters to make two strings equal.

Example 1:
Input: s1 = "sea", s2 = "eat"
Output: 231
Explanation: Deleting "s" from "sea" adds the ASCII value of "s" (115) to the sum.
Deleting "t" from "eat" adds 116 to the sum.
At the end, both strings are equal, and 115 + 116 = 231 is the minimum sum possible to achieve this.

Example 2:
Input: s1 = "delete", s2 = "leet"
Output: 403
Explanation: Deleting "dee" from "delete" to turn the string into "let",
adds 100[d] + 101[e] + 101[e] to the sum.
Deleting "e" from "leet" adds 101[e] to the sum.
At the end, both strings are equal to "let", and the answer is 100+101+101+101 = 403.
If instead we turned both strings into "lee" or "eet", we would get answers of 433 or 417, which are higher.

Constraints:
1 <= s1.length, s2.length <= 1000
s1 and s2 consist of lowercase English letters.

</> Typescript code:
*/

function minimumDeleteSum(s1: string, s2: string): number {
    // Ensure s2 is the shorter string to optimize space complexity to O(min(n, m))
    if (s1.length < s2.length) [s1, s2] = [s2, s1];
    const n = s1.length;
    const m = s2.length;
    
    // dp[j] stores the minimum ASCII delete sum for s1[0...i] and s2[0...j]
    // Using Int32Array for better performance and memory efficiency over standard arrays
    let dp = new Int32Array(m + 1);

    // Base case: cumulative ASCII sum of s2 when s1 is an empty string
    for (let j = 1; j <= m; j++) {
        dp[j] = dp[j - 1] + s2.charCodeAt(j - 1);
    }

    // Iterate through each character of s1
    for (let i = 1; i <= n; i++) {
        // prev represents the diagonal value (dp[i-1][j-1])
        let prev = dp[0];
        // Update dp[0] to represent deleting all characters of s1 up to index i
        dp[0] += s1.charCodeAt(i - 1);
        
        for (let j = 1; j <= m; j++) {
            // Store current dp[j] (which is dp[i-1][j]) before it gets updated
            const temp = dp[j];
            
            if (s1[i - 1] === s2[j - 1]) {
                // If characters match, no deletion cost; take the diagonal value
                dp[j] = prev;
            } else {
                // If they don't match, take the minimum cost of deleting s1[i-1] or s2[j-1]
                const cost1 = dp[j] + s1.charCodeAt(i - 1);
                const cost2 = dp[j - 1] + s2.charCodeAt(j - 1);
                dp[j] = cost1 < cost2 ? cost1 : cost2;
            }
            // Update prev for the next iteration in the inner loop
            prev = temp;
        }
    }

    // The last element contains the minimum ASCII sum to make both strings equal
    return dp[m];
}
