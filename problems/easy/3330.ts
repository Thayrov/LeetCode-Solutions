/*
3330. Find the Original Typed String I

Alice is attempting to type a specific string on her computer. However, she tends to be clumsy and may press a key for too long, resulting in a character being typed multiple times.
Although Alice tried to focus on her typing, she is aware that she may still have done this at most once.
You are given a string word, which represents the final output displayed on Alice's screen.
Return the total number of possible original strings that Alice might have intended to type.

Example 1:
Input: word = "abbcccc"
Output: 5
Explanation:
The possible strings are: "abbcccc", "abbccc", "abbcc", "abbc", and "abcccc".

Example 2:
Input: word = "abcd"
Output: 1
Explanation:
The only possible string is "abcd".

Example 3:
Input: word = "aaaa"
Output: 4

Constraints:
1 <= word.length <= 10^5
word consists only of lowercase English letters.

</> Typescript code:
*/

function possibleStringCount(word: string): number {
  // The problem states that a character might have been long-pressed at most once.
  // This means we are looking for the total number of unique strings that could have resulted in the given 'word'.

  // The total number of possibilities can be derived from a simple formula: 1 + n - g
  // where 'n' is the length of the word and 'g' is the number of consecutive character groups.
  // The '1' accounts for the case where no long-press occurred (the original string is 'word' itself).
  // The 'n - g' part calculates the sum of extra possibilities from each group. For any group of length k > 1,
  // it contributes k-1 additional possibilities. Summing (k_i - 1) over all groups 'g' simplifies to n - g.

  // Handle the edge case for very short strings. If length is 0 or 1, there's only one possibility (the string itself).
  if (word.length <= 1) {
    return word.length;
  }

  // Initialize the group count. A non-empty string always has at least one group of characters.
  let groups = 1;

  // Iterate through the string starting from the second character to compare with the previous one.
  for (let i = 1; i < word.length; i++) {
    // If the current character is different from the previous one, it signifies the start of a new group.
    if (word[i] !== word[i - 1]) {
      // Increment the count of character groups.
      groups++;
    }
  }

  // Apply the formula: n - g + 1.
  // This is equivalent to 1 (the base case of no long press) + (word.length - groups), which is the sum
  // of all additional possibilities from groups of repeated characters.
  return word.length - groups + 1;
}
