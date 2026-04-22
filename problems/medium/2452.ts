/*
2452. Words Within Two Edits of Dictionary

Hint
You are given two string arrays, queries and dictionary. All words in each array comprise of lowercase English letters and have the same length.
In one edit you can take a word from queries, and change any letter in it to any other letter. Find all words from queries that, after a maximum of two edits, equal some word from dictionary.
Return a list of all words from queries, that match with some word from dictionary after a maximum of two edits. Return the words in the same order they appear in queries.

Example 1:
Input: queries = ["word","note","ants","wood"], dictionary = ["wood","joke","moat"]
Output: ["word","note","wood"]
Explanation:
- Changing the 'r' in "word" to 'o' allows it to equal the dictionary word "wood".
- Changing the 'n' to 'j' and the 't' to 'k' in "note" changes it to "joke".
- It would take more than 2 edits for "ants" to equal a dictionary word.
- "wood" can remain unchanged (0 edits) and match the corresponding dictionary word.
Thus, we return ["word","note","wood"].

Example 2:
Input: queries = ["yes"], dictionary = ["not"]
Output: []
Explanation:
Applying any two edits to "yes" cannot make it equal to "not". Thus, we return an empty array.

Constraints:
1 <= queries.length, dictionary.length <= 100
n == queries[i].length == dictionary[j].length
1 <= n <= 100
All queries[i] and dictionary[j] are composed of lowercase English letters.

</> Typescript code:
*/

function twoEditWords(queries: string[], dictionary: string[]): string[] {
  // Initialize an array to store queries that meet the criteria
  const result: string[] = [];
  // Cache the length of the strings since all strings have the same length
  const wordLen = queries[0].length;

  // Iterate through each word in the queries array
  for (const query of queries) {
    // Compare the current query against every word in the dictionary
    for (const word of dictionary) {
      // Track the number of character mismatches
      let diffs = 0;
      // Iterate through characters of both strings by index
      for (let i = 0; i < wordLen; i++) {
        // If characters at the same position don't match, increment diffs
        if (query[i] !== word[i]) {
          // Optimization: If differences exceed 2, this dictionary word is invalid; break early
          if (++diffs > 2) break;
        }
      }
      // If we checked the whole word and found 2 or fewer differences
      if (diffs <= 2) {
        // Add the original query word to our results
        result.push(query);
        // Optimization: Once a match is found for a query, stop checking other dictionary words
        break;
      }
    }
  }

  // Return the filtered list of query words
  return result;
}
