/* 
3306. Count of Substrings Containing Every Vowel and K Consonants II

You are given a string word and a non-negative integer k.

Return the total number of substrings of word that contain every vowel ('a', 'e', 'i', 'o', and 'u') at least once and exactly k consonants.

Example 1:
Input: word = "aeioqq", k = 1
Output: 0
Explanation:
There is no substring with every vowel.

Example 2:
Input: word = "aeiou", k = 0
Output: 1
Explanation:
The only substring with every vowel and zero consonants is word[0..4], which is "aeiou".

Example 3:
Input: word = "ieaouqqieaouqq", k = 1
Output: 3
Explanation:
The substrings with every vowel and one consonant are:
word[0..5], which is "ieaouq".
word[6..11], which is "qieaou".
word[7..12], which is "ieaouq".

Constraints:
5 <= word.length <= 2 * 10^5
word consists only of lowercase English letters.
0 <= k <= word.length - 5

</> Typescript code:
*/

function countOfSubstrings(word: string, k: number): number {
  // Get the length of the input string.
  const n = word.length;
  // Helper function to check if a character is a vowel.
  const isVowel = (ch: string) =>
    ch === 'a' || ch === 'e' || ch === 'i' || ch === 'o' || ch === 'u';

  // Build prefix array, where prefix[i] records the count of consonants in word[0..i-1].
  const prefix = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    // If the current char is a consonant, add 1; vowels add 0.
    prefix[i + 1] = prefix[i] + (isVowel(word[i]) ? 0 : 1);
  }

  // Create a map from a given prefix sum (number of consonants so far) to all indices i having that prefix.
  const prefixMap = new Map<number, number[]>();
  for (let i = 0; i <= n; i++) {
    const key = prefix[i];
    if (!prefixMap.has(key)) prefixMap.set(key, []);
    prefixMap.get(key)!.push(i);
  }

  // Binary search helper: returns count of numbers in sorted array <= x.
  const countLE = (arr: number[], x: number): number => {
    let lo = 0,
      hi = arr.length;
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (arr[mid] <= x) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  };

  let ans = 0;
  // lastOcc will store the last occurrence index of each vowel.
  const lastOcc: {[v: string]: number} = {a: -1, e: -1, i: -1, o: -1, u: -1};

  // Iterate j as the right end of the substring.
  for (let j = 0; j < n; j++) {
    const ch = word[j];
    // Update last occurrence for vowels.
    if (isVowel(ch)) lastOcc[ch] = j;
    // Determine the earliest index among all vowels' last occurrences.
    // Only starting indices i <= minLast will yield a substring that contains every vowel.
    const minLast = Math.min(lastOcc.a, lastOcc.e, lastOcc.i, lastOcc.o, lastOcc.u);
    // If any vowel hasn't been seen, skip.
    if (minLast === -1) continue;
    // For substring word[i...j] to have exactly k consonants, we require:
    // prefix[j+1] - prefix[i] == k  =>   prefix[i] == prefix[j+1] - k.
    const target = prefix[j + 1] - k;
    const indices = prefixMap.get(target);
    if (!indices) continue;
    // Count how many prefix indices i (with i <= minLast) satisfy the condition.
    ans += countLE(indices, minLast);
  }
  return ans;
}
