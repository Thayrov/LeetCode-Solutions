/* 
2559. Count Vowel Strings in Ranges

You are given a 0-indexed array of strings words and a 2D array of integers queries.

Each query queries[i] = [li, ri] asks us to find the number of strings present in the range li to ri (both inclusive) of words that start and end with a vowel.

Return an array ans of size queries.length, where ans[i] is the answer to the ith query.

Note that the vowel letters are 'a', 'e', 'i', 'o', and 'u'.

Example 1:
Input: words = ["aba","bcb","ece","aa","e"], queries = [[0,2],[1,4],[1,1]]
Output: [2,3,0]
Explanation: The strings starting and ending with a vowel are "aba", "ece", "aa" and "e".
The answer to the query [0,2] is 2 (strings "aba" and "ece").
to query [1,4] is 3 (strings "ece", "aa", "e").
to query [1,1] is 0.
We return [2,3,0].

Example 2:
Input: words = ["a","e","i"], queries = [[0,2],[0,1],[2,2]]
Output: [3,2,1]
Explanation: Every string satisfies the conditions, so we return [3,2,1].

Constraints:
1 <= words.length <= 10^5
1 <= words[i].length <= 40
words[i] consists only of lowercase English letters.
sum(words[i].length) <= 3 * 10^5
1 <= queries.length <= 105
0 <= li <= ri < words.length

</> Typescript Code:
*/

function vowelStrings(words: string[], queries: number[][]): number[] {
  // Create a set of vowels for quick membership checking
  const v = new Set(['a', 'e', 'i', 'o', 'u']);
  // Prepare an array to mark words starting and ending with a vowel
  const valid = Array(words.length);
  // Populate valid array with 1 if the word starts and ends with a vowel, else 0
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    valid[i] = +(v.has(w[0]) && v.has(w[w.length - 1]));
  }
  // Convert valid array into a prefix sum array for efficient range queries
  for (let i = 1; i < valid.length; i++) {
    valid[i] += valid[i - 1];
  }
  // Create the result array to store the number of valid words for each query
  const ans = Array(queries.length);
  // For each query, calculate valid words in O(1) using prefix sums
  for (let i = 0; i < queries.length; i++) {
    const [l, r] = queries[i];
    ans[i] = l > 0 ? valid[r] - valid[l - 1] : valid[r];
  }
  return ans;
}
