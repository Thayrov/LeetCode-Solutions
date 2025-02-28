/* 
1092. Shortest Common Supersequence 

Given two strings str1 and str2, return the shortest string that has both str1 and str2 as subsequences. If there are multiple valid strings, return any of them.

A string s is a subsequence of string t if deleting some number of characters from t (possibly 0) results in the string s.

Example 1:
Input: str1 = "abac", str2 = "cab"
Output: "cabac"
Explanation: 
str1 = "abac" is a subsequence of "cabac" because we can delete the first "c".
str2 = "cab" is a subsequence of "cabac" because we can delete the last "ac".
The answer provided is the shortest such string that satisfies these properties.

Example 2:
Input: str1 = "aaaaaaaa", str2 = "aaaaaaaa"
Output: "aaaaaaaa"

Constraints:
1 <= str1.length, str2.length <= 1000
str1 and str2 consist of lowercase English letters.

</> Typescript Code:
*/

function shortestCommonSupersequence(str1: string, str2: string): string {
  // Determine the lengths of the input strings.
  const m = str1.length,
    n = str2.length;

  // Create a 2D array 'dp' of dimensions (m+1) x (n+1) to store LCS lengths.
  const dp: number[][] = Array.from({length: m + 1}, () => new Array(n + 1).fill(0));

  // Fill the dp table using dynamic programming to compute the longest common subsequence (LCS) length.
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // If characters match, extend the LCS by 1 from the previous diagonal cell.
      if (str1[i - 1] === str2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      // Otherwise, take the maximum LCS length from the adjacent left or top cell.
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  // Reconstruct the LCS by backtracking through the dp table.
  let i = m,
    j = n;
  const lcs: string[] = [];
  while (i > 0 && j > 0) {
    // If the current characters in both strings match, include it in the LCS.
    if (str1[i - 1] === str2[j - 1]) {
      lcs.push(str1[i - 1]);
      i--;
      j--;
    }
    // If not, move in the direction that gives the larger LCS length.
    else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  // Since the LCS was built backwards, reverse it to obtain the correct order.
  lcs.reverse();

  // Merge both strings using the LCS as a guide to build the shortest common supersequence.
  let ans = '';
  i = 0;
  j = 0;
  // For every character in the LCS, add the non-matching parts from both strings before adding the LCS character.
  for (const c of lcs) {
    // Append characters from str1 until the LCS character is reached.
    while (i < str1.length && str1[i] !== c) {
      ans += str1[i];
      i++;
    }
    // Append characters from str2 until the LCS character is reached.
    while (j < str2.length && str2[j] !== c) {
      ans += str2[j];
      j++;
    }
    // Append the LCS character (common to both strings) to the answer.
    ans += c;
    // Move past the LCS character in both strings.
    i++;
    j++;
  }
  // Append any remaining characters from both strings after processing the LCS.
  return ans + str1.slice(i) + str2.slice(j);
}
