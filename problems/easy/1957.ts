/* 
1957. Delete Characters to Make Fancy String

A fancy string is a string where no three consecutive characters are equal.

Given a string s, delete the minimum possible number of characters from s to make it fancy.

Return the final string after the deletion. It can be shown that the answer will always be unique.

Example 1:
Input: s = "leeetcode"
Output: "leetcode"
Explanation:
Remove an 'e' from the first group of 'e's to create "leetcode".
No three consecutive characters are equal, so return "leetcode".

Example 2:
Input: s = "aaabaaaa"
Output: "aabaa"
Explanation:
Remove an 'a' from the first group of 'a's to create "aabaaaa".
Remove two 'a's from the second group of 'a's to create "aabaa".
No three consecutive characters are equal, so return "aabaa".

Example 3:
Input: s = "aab"
Output: "aab"
Explanation: No three consecutive characters are equal, so return "aab".

Constraints:
1 <= s.length <= 10^5
s consists only of lowercase English letters.

</> Typescript Code:
*/

function makeFancyString(s: string): string {
  const res: string[] = []; // Initialize an array to store the resulting characters
  let count = 0; // Initialize count of consecutive identical characters
  let prev = ""; // Initialize previous character tracker

  for (let i = 0; i < s.length; i++) {
    // Iterate over each character in the string
    const c = s[i]; // Current character
    if (c === prev) {
      // If current character is the same as previous
      count++; // Increment the count
    } else {
      prev = c; // Update the previous character
      count = 1; // Reset count
    }
    if (count < 3) {
      // If count is less than 3
      res.push(c); // Append character to result
    }
    // Else, skip the character to prevent three consecutive identical characters
  }
  return res.join(""); // Join the result array into a string and return
}