/*
3403. Find the Lexicographically Largest String From the Box I

You are given a string word, and an integer numFriends.
Alice is organizing a game for her numFriends friends. There are multiple rounds in the game, where in each round:
word is split into numFriends non-empty strings, such that no previous round has had the exact same split.
All the split words are put into a box.
Find the lexicographically largest string from the box after all the rounds are finished.

Example 1:
Input: word = "dbca", numFriends = 2
Output: "dbc"
Explanation: 
All possible splits are:
"d" and "bca".
"db" and "ca".
"dbc" and "a".

Example 2:
Input: word = "gggg", numFriends = 4
Output: "g"
Explanation: 
The only possible split is: "g", "g", "g", and "g".

Constraints:
1 <= word.length <= 5 * 10^3
word consists only of lowercase English letters.
1 <= numFriends <= word.length

</> Typescript code:
*/

function answerString(word: string, numFriends: number): string {
  // If there's only one friend, the entire word is the only part.
  if (numFriends === 1) {
    return word;
  }

  const n: number = word.length;
  // Calculate the maximum possible length for any single part in a split.
  // If a part has length L, the remaining n-L characters must form numFriends-1 non-empty parts.
  // So, n-L >= numFriends-1, which means L <= n - (numFriends-1) = n - numFriends + 1.
  const maxLengthPossibleForAPart: number = n - numFriends + 1;

  let maxLexString: string = ""; // To store the lexicographically largest string found.

  // Constraints: word.length >= 1. numFriends >= 1.
  // So, n >= 1. maxLengthPossibleForAPart will be at least 1 (when n=numFriends, maxLen=1).
  // If word length is 0 or max possible length is 0 or less (theoretically, though constraints prevent this), return empty.
  if (n === 0 || maxLengthPossibleForAPart <= 0) {
    return ""; // Should not be reached given constraints.
  }

  // Initialize maxLexString with the first character of the word.
  // This ensures maxLexString is non-empty and provides a baseline for comparisons.
  // A single character is always a valid part if maxLengthPossibleForAPart >= 1.
  maxLexString = word.substring(0, 1);

  // Optimization: If parts can only be of length 1.
  // This occurs when numFriends == n, so maxLengthPossibleForAPart = n - n + 1 = 1.
  if (maxLengthPossibleForAPart === 1) {
    for (let i = 1; i < n; i++) {
      // Started with word[0], so check from word[1]
      if (word[i] > maxLexString) {
        maxLexString = word[i]; // Update if current char is larger
      }
    }
    return maxLexString; // The largest single character is the answer.
  }

  // Iterate over all possible starting positions for substrings.
  for (let i = 0; i < n; i++) {
    // Optimization: If the current character word[i] is lexicographically smaller
    // than the first character of our current maxLexString, then no substring
    // starting with word[i] can be greater than maxLexString.
    // (Requires maxLexString to be non-empty, which it is after initialization).
    if (maxLexString.length > 0 && word[i] < maxLexString[0]) {
      continue; // Skip all substrings starting at this i.
    }

    // Iterate over all possible ending positions for substrings starting at i.
    for (let j = i; j < n; j++) {
      const currentLen: number = j - i + 1; // Length of the current substring.

      if (currentLen <= maxLengthPossibleForAPart) {
        // Only consider this substring if its length is valid.
        // Further optimization: only create and compare substring if it has a chance.
        // It has a chance if:
        // 1. Its first char word[i] is greater than maxLexString's first char.
        // 2. Its length is greater than maxLexString's length (could be "za" vs "z").
        // 3. Its first char is same, then a full comparison is needed.
        // The condition word[i] === maxLexString[0] covers the case where full comparison is needed.
        // The check (maxLexString.length > 0) for word[i] < maxLexString[0] is done before this loop.
        if (
          word[i] > maxLexString[0] ||
          currentLen > maxLexString.length ||
          word[i] === maxLexString[0]
        ) {
          const currentSubstring: string = word.substring(i, j + 1); // Create the substring.
          if (currentSubstring > maxLexString) {
            // Lexicographical comparison.
            maxLexString = currentSubstring; // Update if current is larger.
          }
        }
      } else {
        // If currentLen exceeds maxLengthPossibleForAPart, then for this fixed i,
        // any further increase in j will also result in too long substrings.
        break; // Move to the next starting position i.
      }
    }
  }
  return maxLexString; // Return the largest valid substring found.
}
