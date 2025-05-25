/*
2131. Longest Palindrome by Concatenating Two Letter Words

You are given an array of strings words. Each element of words consists of two lowercase English letters.
Create the longest possible palindrome by selecting some elements from words and concatenating them in any order. Each element can be selected at most once.
Return the length of the longest palindrome that you can create. If it is impossible to create any palindrome, return 0.
A palindrome is a string that reads the same forward and backward.

Example 1:
Input: words = ["lc","cl","gg"]
Output: 6
Explanation: One longest palindrome is "lc" + "gg" + "cl" = "lcggcl", of length 6.
Note that "clgglc" is another longest palindrome that can be created.

Example 2:
Input: words = ["ab","ty","yt","lc","cl","ab"]
Output: 8
Explanation: One longest palindrome is "ty" + "lc" + "cl" + "yt" = "tylcclyt", of length 8.
Note that "lcyttycl" is another longest palindrome that can be created.

Example 3:
Input: words = ["cc","ll","xx"]
Output: 2
Explanation: One longest palindrome is "cc", of length 2.
Note that "ll" is another longest palindrome that can be created, and so is "xx".

Constraints:
1 <= words.length <= 10^5
words[i].length == 2
words[i] consists of lowercase English letters.


</> Typescript code:
*/

function longestPalindrome(words: string[]): number {
  // Step 1: Count the frequency of each word.
  // The 'counts' Map will store word -> frequency pairs.
  const counts = new Map<string, number>();
  for (const word of words) {
    // Increment the count for the current word. If not present, initialize to 1.
    counts.set(word, (counts.get(word) || 0) + 1);
  }

  let length = 0; // Initialize the total length of the palindrome.
  // This flag tracks if we've found a palindromic word with an odd count
  // that can be placed in the center of the palindrome (e.g., "gg").
  let centerFound = false;

  // Step 2: Iterate through the unique words and their counts.
  // '_initialCountFromIterator' is the count when the iterator first saw this entry.
  // It's named with an underscore as we'll fetch the potentially updated count inside the loop.
  for (const [word, _initialCountFromIterator] of counts.entries()) {
    // Get the current, possibly updated, count of 'word'.
    // This is important because 'word' or its reverse might have been processed earlier
    // in this loop, and its count in the 'counts' map might have been reduced.
    let currentWordCount = counts.get(word)!;

    // If the current count of this word is 0, it means it has already been fully used
    // (e.g., by its reverse pair). Skip it.
    if (currentWordCount === 0) {
      continue;
    }

    // Case 1: The word is a palindrome itself (e.g., "gg", where word[0] == word[1]).
    if (word[0] === word[1]) {
      if (currentWordCount % 2 === 0) {
        // If the count is even, all occurrences can be paired up (e.g., "gg...gg").
        // Each such word contributes its length (2) to the total palindrome length.
        length += currentWordCount * 2;
      } else {
        // If the count is odd, (count - 1) occurrences can be paired up.
        length += (currentWordCount - 1) * 2;
        // The single remaining occurrence can potentially be the center of the palindrome.
        centerFound = true;
      }
      // These words are self-contained for this logic. Their counts in the map
      // don't need to be set to 0 for correctness here, as they won't be matched
      // as a reverse of a *different* word type. The loop processes each unique word type once.
    } else {
      // Case 2: The word is not a palindrome (e.g., "lc").
      // We need to find its reverse (e.g., "cl").
      const reversedWord = word[1] + word[0];

      // Check if its reverse exists in our frequency map.
      if (counts.has(reversedWord)) {
        // Get the current count of the reversed word.
        const reversedWordCount = counts.get(reversedWord)!;

        // If the reversed word also has occurrences available.
        if (reversedWordCount > 0) {
          // Determine how many pairs of (word, reversedWord) we can form.
          // This is limited by the minimum of their respective counts.
          const numPairsToForm = Math.min(currentWordCount, reversedWordCount);

          // Each pair (e.g., "lc" + "cl" = "lccl") adds 4 to the palindrome's length.
          length += numPairsToForm * 4;

          // Update the counts in the map to reflect that these words have been used.
          // This prevents double-counting when 'reversedWord' is encountered later in the iteration,
          // or if 'word' itself had more occurrences than 'reversedWord'.
          counts.set(word, currentWordCount - numPairsToForm);
          counts.set(reversedWord, reversedWordCount - numPairsToForm);
        }
      }
    }
  }

  // Step 3: Add the center word if one was found.
  // If 'centerFound' is true, it means at least one palindromic word with an odd count
  // was available to be the unique center of our palindrome. Add its length (2).
  if (centerFound) {
    length += 2;
  }

  // Return the total calculated length of the longest possible palindrome.
  return length;
}
