/* 
1400. Construct K Palindrome Strings

Given a string s and an integer k, return true if you can use all the characters in s to construct k palindrome strings or false otherwise.

Example 1:
Input: s = "annabelle", k = 2
Output: true
Explanation: You can construct two palindromes using all characters in s.
Some possible constructions "anna" + "elble", "anbna" + "elle", "anellena" + "b"

Example 2:
Input: s = "leetcode", k = 3
Output: false
Explanation: It is impossible to construct 3 palindromes using all the characters of s.

Example 3:
Input: s = "true", k = 4
Output: true
Explanation: The only possible solution is to put each character in a separate string.

Constraints:
1 <= s.length <= 10^5
s consists of lowercase English letters.
1 <= k <= 10^5

</> Typescript Code:
*/

function canConstruct(s: string, k: number): boolean {
  // If the required palindromes exceed string length, it's impossible
  if (k > s.length) return false;

  // Create an array to count frequency of each letter (26 lowercase letters assumed)
  let freq = new Array(26).fill(0),
    oddCount = 0;

  // Populate the frequency array by mapping each character to an index 0-25
  for (let c of s) freq[c.charCodeAt(0) - 97]++;

  // Count how many characters appear an odd number of times
  for (let x of freq) if (x & 1) oddCount++;

  // If oddCount is greater than k, we can't split them into k palindromes
  return oddCount <= k;
}
