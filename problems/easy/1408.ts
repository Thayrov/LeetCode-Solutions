/* 
1408. String Matching in an Array

Given an array of string words, return all strings in words that is a substring of another word. You can return the answer in any order.

A substring is a contiguous sequence of characters within a string

Example 1:
Input: words = ["mass","as","hero","superhero"]
Output: ["as","hero"]
Explanation: "as" is substring of "mass" and "hero" is substring of "superhero".
["hero","as"] is also a valid answer.

Example 2:
Input: words = ["leetcode","et","code"]
Output: ["et","code"]
Explanation: "et", "code" are substring of "leetcode".

Example 3:
Input: words = ["blue","green","bu"]
Output: []
Explanation: No string of words is substring of another string.

Constraints:
1 <= words.length <= 100
1 <= words[i].length <= 30
words[i] contains only lowercase English letters.
All the strings of words are unique.

</> Typescript Code:
*/

function stringMatching(words: string[]): string[] {
  // Prepare an array to store valid substrings.
  let res: string[] = [];
  // Sort words by their length (shortest first).
  words.sort((a, b) => a.length - b.length);
  // Check each word against the subsequent words.
  for (let i = 0; i < words.length; i++) {
    // Compare with words that come after the current.
    for (let j = i + 1; j < words.length; j++) {
      // If the current word is a substring of any longer word...
      if (words[j].includes(words[i])) {
        // ...add it to the result and stop checking further.
        res.push(words[i]);
        break;
      }
    }
  }
  // Remove possible duplicates before returning.
  return [...new Set(res)];
}
