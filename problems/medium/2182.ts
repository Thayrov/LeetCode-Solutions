/* 
2182. Construct String With Repeat Limit

You are given a string s and an integer repeatLimit. Construct a new string repeatLimitedString using the characters of s such that no letter appears more than repeatLimit times in a row. You do not have to use all characters from s.

Return the lexicographically largest repeatLimitedString possible.

A string a is lexicographically larger than a string b if in the first position where a and b differ, string a has a letter that appears later in the alphabet than the corresponding letter in b. If the first min(a.length, b.length) characters do not differ, then the longer string is the lexicographically larger one.

Example 1:
Input: s = "cczazcc", repeatLimit = 3
Output: "zzcccac"
Explanation: We use all of the characters from s to construct the repeatLimitedString "zzcccac".
The letter 'a' appears at most 1 time in a row.
The letter 'c' appears at most 3 times in a row.
The letter 'z' appears at most 2 times in a row.
Hence, no letter appears more than repeatLimit times in a row and the string is a valid repeatLimitedString.
The string is the lexicographically largest repeatLimitedString possible so we return "zzcccac".
Note that the string "zzcccca" is lexicographically larger but the letter 'c' appears more than 3 times in a row, so it is not a valid repeatLimitedString.

Example 2:
Input: s = "aababab", repeatLimit = 2
Output: "bbabaa"
Explanation: We use only some of the characters from s to construct the repeatLimitedString "bbabaa". 
The letter 'a' appears at most 2 times in a row.
The letter 'b' appears at most 2 times in a row.
Hence, no letter appears more than repeatLimit times in a row and the string is a valid repeatLimitedString.
The string is the lexicographically largest repeatLimitedString possible so we return "bbabaa".
Note that the string "bbabaaa" is lexicographically larger but the letter 'a' appears more than 2 times in a row, so it is not a valid repeatLimitedString.

Constraints:
1 <= repeatLimit <= s.length <= 10^5
s consists of lowercase English letters.

</> Typescript Code:
*/

function repeatLimitedString(s: string, repeatLimit: number): string {
  const freq = new Array(26).fill(0); // Initialize frequency array for 'a' to 'z'
  for (const ch of s) {
    freq[ch.charCodeAt(0) - 97]++; // Count frequency of each character
  }
  let result = ''; // Initialize result string
  let i = 25; // Start from 'z' (largest character)
  while (i >= 0) {
    if (freq[i] === 0) {
      i--; // Move to next smaller character
      continue;
    }
    let use = Math.min(freq[i], repeatLimit); // Use up to repeatLimit times
    result += String.fromCharCode(i + 97).repeat(use); // Append character to result
    freq[i] -= use; // Decrease frequency
    if (freq[i] > 0) {
      let j = i - 1; // Find next available smaller character
      while (j >= 0 && freq[j] === 0) {
        j--;
      }
      if (j < 0) break; // No smaller character available
      result += String.fromCharCode(j + 97); // Append smaller character
      freq[j]--; // Decrease frequency of smaller character
    } else {
      i--; // Move to next character
    }
  }
  return result; // Return the constructed string
}
