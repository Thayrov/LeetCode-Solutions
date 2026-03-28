/*
2573. Find the String with LCP

We define the lcp matrix of any 0-indexed string word of n lowercase English letters as an n x n grid such that:
lcp[i][j] is equal to the length of the longest common prefix between the substrings word[i,n-1] and word[j,n-1].
Given an n x n matrix lcp, return the alphabetically smallest string word that corresponds to lcp. If there is no such string, return an empty string.
A string a is lexicographically smaller than a string b (of the same length) if in the first position where a and b differ, string a has a letter that appears earlier in the alphabet than the corresponding letter in b. For example, "aabd" is lexicographically smaller than "aaca" because the first position they differ is at the third letter, and 'b' comes before 'c'.

Example 1:
Input: lcp = [[4,0,2,0],[0,3,0,1],[2,0,2,0],[0,1,0,1]]
Output: "abab"
Explanation: lcp corresponds to any 4 letter string with two alternating letters. The lexicographically smallest of them is "abab".

Example 2:
Input: lcp = [[4,3,2,1],[3,3,2,1],[2,2,2,1],[1,1,1,1]]
Output: "aaaa"
Explanation: lcp corresponds to any 4 letter string with a single distinct letter. The lexicographically smallest of them is "aaaa". 

Example 3:
Input: lcp = [[4,3,2,1],[3,3,2,1],[2,2,2,1],[1,1,1,3]]
Output: ""
Explanation: lcp[3][3] cannot be equal to 3 since word[3,...,3] consists of only a single letter; Thus, no answer exists.

Constraints:
1 <= n == lcp.length == lcp[i].length <= 1000
0 <= lcp[i][j] <= n

</> Typescript code:
*/

function findTheString(lcp: number[][]): string {
  const n = lcp.length;
  // Pre-allocate array for performance; using strings to build the result
  const res = new Array(n).fill("");
  let charCode = 97; // Start with ASCII 'a'

  // Greedy Construction: Assign the smallest possible letter to each index
  for (let i = 0; i < n; i++) {
    // If this index is already assigned via a previous LCP requirement, skip it
    if (res[i] !== "") continue;
    // If we need more than 26 characters, no valid string exists
    if (charCode > 122) return "";

    const char = String.fromCharCode(charCode++);
    // Fill all indices j where lcp[i][j] > 0 with the same character
    for (let j = i; j < n; j++) {
      if (lcp[i][j] > 0) res[j] = char;
    }
  }

  // Validation Phase 1: Ensure every index was actually assigned a character
  for (let i = 0; i < n; i++) {
    if (res[i] === "") return "";
  }

  // Validation Phase 2: Dynamic Programming check to verify the LCP matrix logic
  // We iterate backwards to use the property: LCP(i, j) = 1 + LCP(i+1, j+1) if s[i] == s[j]
  for (let i = n - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      let expected = 0;
      if (res[i] === res[j]) {
        // If characters match, LCP is 1 + the LCP of the next suffixes
        expected = i + 1 < n && j + 1 < n ? lcp[i + 1][j + 1] + 1 : 1;
      }
      // If the calculated LCP doesn't match the input, the input matrix was invalid
      if (lcp[i][j] !== expected) return "";
    }
  }

  return res.join("");
}
