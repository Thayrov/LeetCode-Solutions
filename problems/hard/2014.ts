/*
2014. Longest Subsequence Repeated k Times

You are given a string s of length n, and an integer k. You are tasked to find the longest subsequence repeated k times in string s.
A subsequence is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.
A subsequence seq is repeated k times in the string s if seq * k is a subsequence of s, where seq * k represents a string constructed by concatenating seq k times.
For example, "bba" is repeated 2 times in the string "bababcba", because the string "bbabba", constructed by concatenating "bba" 2 times, is a subsequence of the string "bababcba".
Return the longest subsequence repeated k times in string s. If multiple such subsequences are found, return the lexicographically largest one. If there is no such subsequence, return an empty string.

Example 1:
Input: s = "letsleetcode", k = 2
Output: "let"
Explanation: There are two longest subsequences repeated 2 times: "let" and "ete".
"let" is the lexicographically largest one.

Example 2:
Input: s = "bb", k = 2
Output: "b"
Explanation: The longest subsequence repeated 2 times is "b".

Example 3:
Input: s = "ab", k = 2
Output: ""
Explanation: There is no subsequence repeated 2 times. Empty string is returned.
 
Constraints:
n == s.length
2 <= n, k <= 2000
2 <= n < k * 8
s consists of lowercase English letters.

</> Typescript code:
*/

/**
 * Finds the longest subsequence that is repeated k times in a string s.
 * @param s The source string.
 * @param k The number of times the subsequence must be repeated.
 * @returns The longest, lexicographically largest subsequence, or "" if none exists.
 */
function longestSubsequenceRepeatedK(s: string, k: number): string {
  /**
   * Helper function to check if `sub` is a subsequence of `text`.
   * This is a standard two-pointer greedy approach.
   * @param sub The potential subsequence.
   * @param text The string to search within.
   * @returns True if `sub` is a subsequence of `text`.
   */
  const isSubsequence = (sub: string, text: string): boolean => {
    let text_ptr = 0; // Pointer for the text string `text`.
    let sub_ptr = 0; // Pointer for the subsequence `sub`.

    // Iterate through both strings.
    while (text_ptr < text.length && sub_ptr < sub.length) {
      // If characters match, advance the subsequence pointer.
      if (text[text_ptr] === sub[sub_ptr]) {
        sub_ptr++;
      }
      // Always advance the text pointer.
      text_ptr++;
    }
    // The subsequence is found if its pointer has reached the end.
    return sub_ptr === sub.length;
  };

  // 1. Count frequencies of each character in the source string `s`.
  const freqs = new Map<string, number>();
  for (const char of s) {
    // Increment the count for the current character.
    freqs.set(char, (freqs.get(char) || 0) + 1);
  }

  // 2. Identify all "possible" characters for our answer.
  // A character can only be in the result if it appears at least k times in `s`.
  let possibleChars = "";
  for (let i = 0; i < 26; i++) {
    // Generate each character from 'a' to 'z'.
    const char = String.fromCharCode("a".charCodeAt(0) + i);
    // If the character's frequency is sufficient, add it to our set of candidates.
    if ((freqs.get(char) || 0) >= k) {
      possibleChars += char;
    }
  }

  // 3. Use a Breadth-First Search (BFS) to build and check all valid subsequences.
  // The queue will start with an empty string, representing the base case.
  let queue: string[] = [""];
  // `result` will store the best valid subsequence found so far.
  let result = "";

  // Continue the search as long as there are potential subsequences to extend.
  while (queue.length > 0) {
    // Get the next subsequence from the front of the queue.
    const current = queue.shift()!;

    // Try to extend the `current` subsequence by appending each possible character.
    for (const char of possibleChars) {
      // Create the new candidate subsequence.
      const candidate = current + char;
      // Check if the candidate, when repeated k times, is a subsequence of s.
      if (isSubsequence(candidate.repeat(k), s)) {
        // If it's a valid k-repeated subsequence, add it to the queue to explore further.
        queue.push(candidate);

        // Update the result if this candidate is better than the current best.
        // A candidate is better if it's longer, or if it's the same length
        // and lexicographically larger.
        if (candidate.length > result.length) {
          result = candidate;
        } else if (candidate.length === result.length && candidate > result) {
          result = candidate;
        }
      }
    }
  }

  // 4. Return the best result found after the search is complete.
  return result;
}
