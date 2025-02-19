/* 
1415. The k-th Lexicographical String of All Happy Strings of Length n

A happy string is a string that:

consists only of letters of the set ['a', 'b', 'c'].
s[i] != s[i + 1] for all values of i from 1 to s.length - 1 (string is 1-indexed).
For example, strings "abc", "ac", "b" and "abcbabcbcb" are all happy strings and strings "aa", "baa" and "ababbc" are not happy strings.

Given two integers n and k, consider a list of all happy strings of length n sorted in lexicographical order.

Return the kth string of this list or return an empty string if there are less than k happy strings of length n.

Example 1:
Input: n = 1, k = 3
Output: "c"
Explanation: The list ["a", "b", "c"] contains all happy strings of length 1. The third string is "c".

Example 2:
Input: n = 1, k = 4
Output: ""
Explanation: There are only 3 happy strings of length 1.

Example 3:
Input: n = 3, k = 9
Output: "cab"
Explanation: There are 12 different happy string of length 3 ["aba", "abc", "aca", "acb", "bab", "bac", "bca", "bcb", "cab", "cac", "cba", "cbc"]. You will find the 9th string = "cab"

Constraints:
1 <= n <= 10
1 <= k <= 100

</> Typescript Code:
*/

function getHappyString(n: number, k: number): string {
  // Compute the total number of happy strings of length n.
  const total = 3 * Math.pow(2, n - 1);
  // If k exceeds the total count, return an empty string.
  if (k > total) return '';

  // Initialize the resulting string and a variable to store the last character added.
  let result = '';
  let last = '';

  // Iterate over each position in the string.
  for (let i = 0; i < n; i++) {
    // Explore letters 'a', 'b', and 'c' in lexicographical order.
    for (const ch of ['a', 'b', 'c']) {
      // Skip the character if it's the same as the last added character
      // to ensure adjacent characters are different.
      if (ch === last) continue;
      // Calculate the number of valid strings that can be formed with this prefix.
      // For each remaining position, there are 2 choices.
      const cnt = Math.pow(2, n - i - 1);
      // If k is larger than the number of strings with this prefix, skip these strings.
      if (k > cnt) {
        k -= cnt; // Reduce k by the count skipped.
      } else {
        // Otherwise, choose this character as it leads to the kth string.
        result += ch;
        last = ch; // Update last character.
        break; // Move to the next position.
      }
    }
  }
  // Return the constructed kth happy string.
  return result;
}
