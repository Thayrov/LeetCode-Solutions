/* 
1930. Unique Length-3 Palindromic Subsequences

Given a string s, return the number of unique palindromes of length three that are a subsequence of s.

Note that even if there are multiple ways to obtain the same subsequence, it is still only counted once.

A palindrome is a string that reads the same forwards and backwards.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".

Example 1:
Input: s = "aabca"
Output: 3
Explanation: The 3 palindromic subsequences of length 3 are:
- "aba" (subsequence of "aabca")
- "aaa" (subsequence of "aabca")
- "aca" (subsequence of "aabca")

Example 2:
Input: s = "adc"
Output: 0
Explanation: There are no palindromic subsequences of length 3 in "adc".

Example 3:
Input: s = "bbcbaba"
Output: 4
Explanation: The 4 palindromic subsequences of length 3 are:
- "bbb" (subsequence of "bbcbaba")
- "bcb" (subsequence of "bbcbaba")
- "bab" (subsequence of "bbcbaba")
- "aba" (subsequence of "bbcbaba")

Constraints:
3 <= s.length <= 10^5
s consists of only lowercase English letters.

</> Typescript Code:
*/

function countPalindromicSubsequence(s: string): number {
  // Store the length of the string and create a 2D array 'prefix' to hold counts for each character
  const n = s.length;
  const prefix = Array.from({length: 26}, () => new Array(n + 1).fill(0));

  // Build prefix sums: prefix[c][i+1] indicates how many times character c appeared up to position i
  for (let i = 0; i < n; i++) {
    const c = s.charCodeAt(i) - 97; // convert 'a'..'z' to 0..25
    for (let j = 0; j < 26; j++) {
      prefix[j][i + 1] = prefix[j][i];
    }
    prefix[c][i + 1]++;
  }

  // Record first and last occurrence indices of each character
  const first = new Array(26).fill(-1);
  const last = new Array(26).fill(-1);
  for (let i = 0; i < n; i++) {
    const c = s.charCodeAt(i) - 97;
    if (first[c] < 0) {
      first[c] = i;
    }
    last[c] = i;
  }

  // Count distinct palindromes of form x_y_x by summing distinct 'y' in between first[x] and last[x]
  let ans = 0;
  for (let x = 0; x < 26; x++) {
    if (first[x] >= 0 && last[x] - first[x] > 1) {
      let distinct = 0;
      // Check how many different letters occur in s between first[x] + 1 and last[x] - 1
      for (let y = 0; y < 26; y++) {
        const count = prefix[y][last[x]] - prefix[y][first[x] + 1];
        if (count > 0) {
          distinct++;
        }
      }
      ans += distinct;
    }
  }
  return ans;
}
