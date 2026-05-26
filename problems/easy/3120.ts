/*
3120. Count the Number of Special Characters I

Hint
You are given a string word. A letter is called special if it appears both in lowercase and uppercase in word.
Return the number of special letters in word.

Example 1:
Input: word = "aaAbcBC"
Output: 3
Explanation:
The special characters in word are 'a', 'b', and 'c'.

Example 2:
Input: word = "abc"
Output: 0
Explanation:
No character in word appears in uppercase.

Example 3:
Input: word = "abBCab"
Output: 1
Explanation:
The only special character in word is 'b'.

Constraints:
1 <= word.length <= 50
word consists of only lowercase and uppercase English letters.

</> Typescript code:
*/

function numberOfSpecialChars(word: string): number {
  // Bitmask storing lowercase letters found
  let lower = 0;

  // Bitmask storing uppercase letters found
  let upper = 0;

  // Traverse every character in the string
  for (const c of word) {
    // ASCII code of current character
    const code = c.charCodeAt(0);

    // Lowercase letters have ASCII >= 97 ('a')
    if (code >= 97) {
      // Set corresponding lowercase bit
      lower |= 1 << (code - 97);
    } else {
      // Set corresponding uppercase bit
      upper |= 1 << (code - 65);
    }
  }

  // Keep only letters appearing in both masks
  let common = lower & upper;

  // Count set bits
  let count = 0;

  // Brian Kernighan bit counting
  while (common) {
    // Remove lowest set bit
    common &= common - 1;

    // Increase answer
    count++;
  }

  // Return total special characters
  return count;
}
