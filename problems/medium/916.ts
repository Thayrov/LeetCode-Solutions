/* 
916. Word Subsets

You are given two string arrays words1 and words2.

A string b is a subset of string a if every letter in b occurs in a including multiplicity.

For example, "wrr" is a subset of "warrior" but is not a subset of "world".
A string a from words1 is universal if for every string b in words2, b is a subset of a.

Return an array of all the universal strings in words1. You may return the answer in any order.

Example 1:
Input: words1 = ["amazon","apple","facebook","google","leetcode"], words2 = ["e","o"]
Output: ["facebook","google","leetcode"]

Example 2:
Input: words1 = ["amazon","apple","facebook","google","leetcode"], words2 = ["l","e"]
Output: ["apple","google","leetcode"]

Constraints:
1 <= words1.length, words2.length <= 10^4
1 <= words1[i].length, words2[i].length <= 10
words1[i] and words2[i] consist only of lowercase English letters.
All the strings of words1 are unique.

</> Typescript Code:
*/

function wordSubsets(words1: string[], words2: string[]): string[] {
  // Prepare an array to store the highest required frequency of each letter
  const req = new Array<number>(26).fill(0);

  // For each word in words2, find its frequency and update global requirements
  for (let b of words2) {
    const freq = new Array<number>(26).fill(0);
    for (let c of b) freq[c.charCodeAt(0) - 97]++;
    for (let i = 0; i < 26; i++) req[i] = Math.max(req[i], freq[i]);
  }

  // This will hold all words1 that satisfy the universal condition
  const ans: string[] = [];

  // Check each word in words1 against the required frequencies
  for (let a of words1) {
    const freq = new Array<number>(26).fill(0);
    for (let c of a) freq[c.charCodeAt(0) - 97]++;
    let valid = true;
    for (let i = 0; i < 26; i++) {
      // If any required frequency is not met, mark as invalid
      if (freq[i] < req[i]) {
        valid = false;
        break;
      }
    }
    // If valid, add to the result
    if (valid) ans.push(a);
  }
  // Return the list of universal words
  return ans;
}
