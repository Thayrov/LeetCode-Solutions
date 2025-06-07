/*
3170. Lexicographically Minimum String After Removing Stars

You are given a string s. It may contain any number of '*' characters. Your task is to remove all '*' characters.
While there is a '*', do the following operation:
Delete the leftmost '*' and the smallest non-'*' character to its left. If there are several smallest characters, you can delete any of them.
Return the lexicographically smallest resulting string after removing all '*' characters.

Example 1:
Input: s = "aaba*"
Output: "aab"
Explanation:
We should delete one of the 'a' characters with '*'. If we choose s[3], s becomes the lexicographically smallest.

Example 2:
Input: s = "abc"
Output: "abc"
Explanation:
There is no '*' in the string.

Constraints:
1 <= s.length <= 10^5
s consists only of lowercase English letters and '*'.
The input is generated such that it is possible to delete all '*' characters.

</> Typescript code:
*/

function clearStars(s: string): string {
  // Get the length of the input string for boundary checks.
  const n = s.length;

  // Create an array of 26 arrays (stacks). Each inner array will store the indices
  // of occurrences for a specific character ('a' to 'z').
  // This structure helps efficiently find the smallest character available.
  const piles: number[][] = Array.from({ length: 26 }, () => []);

  // Create a boolean array to keep track of characters that are removed.
  // `removed[i] = true` means the character at index `i` is removed.
  const removed: boolean[] = new Array(n).fill(false);

  // Get the character code of 'a' to easily calculate the index (0-25) for any character.
  const aCharCode = "a".charCodeAt(0);

  // First pass: Iterate through the string to process characters and stars.
  for (let i = 0; i < n; i++) {
    // If the current character is a star...
    if (s[i] === "*") {
      // Mark the star itself for removal.
      removed[i] = true;

      // Find the smallest character to its left to remove.
      // We iterate from 'a' (j=0) to 'z' (j=25).
      for (let j = 0; j < 26; j++) {
        // If a pile for a character is not empty, it's the smallest available one.
        if (piles[j].length > 0) {
          // To get the lexicographically smallest result, we remove the rightmost
          // occurrence of this smallest character. `pop()` gives us the last-added index.
          const indexToRemove = piles[j].pop()!;

          // Mark this character's index as removed.
          removed[indexToRemove] = true;

          // Once we've removed one character for the current star, we are done.
          break;
        }
      }
    } else {
      // If the current character is a letter...
      // Calculate the character's corresponding pile index (0 for 'a', 1 for 'b', etc.).
      const charCode = s[i].charCodeAt(0) - aCharCode;

      // Push the current index onto the stack for that character.
      piles[charCode].push(i);
    }
  }

  // Second pass: Build the final result string.
  // Using an array and `join` is generally more performant than repeated string concatenation.
  const resultBuilder: string[] = [];

  // Iterate through the original string indices.
  for (let i = 0; i < n; i++) {
    // If the character at this index was not marked for removal...
    if (!removed[i]) {
      // ...append it to our result builder.
      resultBuilder.push(s[i]);
    }
  }

  // Join the characters in the builder to form the final string.
  return resultBuilder.join("");
}
