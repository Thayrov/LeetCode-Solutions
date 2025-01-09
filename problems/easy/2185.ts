/* 
2185. Counting Words With a Given Prefix

You are given an array of strings words and a string pref.

Return the number of strings in words that contain pref as a prefix.

A prefix of a string s is any leading contiguous substring of s.

Example 1:
Input: words = ["pay","attention","practice","attend"], pref = "at"
Output: 2
Explanation: The 2 strings that contain "at" as a prefix are: "attention" and "attend".

Example 2:
Input: words = ["leetcode","win","loops","success"], pref = "code"
Output: 0
Explanation: There are no strings that contain "code" as a prefix.

Constraints:
1 <= words.length <= 100
1 <= words[i].length, pref.length <= 100
words[i] and pref consist of lowercase English letters.

</> Typescript code:
*/

function prefixCount(words: string[], pref: string): number {
  // Initialize a counter to track how many words match
  let count = 0,
    pLen = pref.length;
  // Loop through each word in the array
  for (let i = 0; i < words.length; i++) {
    // Check if the word is at least as long as the prefix
    if (words[i].length >= pLen) {
      // Assume it's a match unless proven otherwise
      let match = true;
      // Compare character by character
      for (let j = 0; j < pLen; j++) {
        // Break if any character mismatches
        if (words[i][j] !== pref[j]) {
          match = false;
          break;
        }
      }
      // If still true, increase the count
      if (match) {
        count++;
      }
    }
  }
  // Return final count
  return count;
}
