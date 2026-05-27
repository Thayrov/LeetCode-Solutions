/*
3121. Count the Number of Special Characters II

Hint
You are given a string word. A letter c is called special if it appears both in lowercase and uppercase in word, and every lowercase occurrence of c appears before the first uppercase occurrence of c.
Return the number of special letters in word.

Example 1:
Input: word = "aaAbcBC"
Output: 3
Explanation:
The special characters are 'a', 'b', and 'c'.

Example 2:
Input: word = "abc"
Output: 0
Explanation:
There are no special characters in word.

Example 3:
Input: word = "AbBCab"
Output: 0
Explanation:
There are no special characters in word.

Constraints:
1 <= word.length <= 2 * 10^5
word consists of only lowercase and uppercase English letters.

</> Typescript code:
*/

function numberOfSpecialChars(word: string): number {
  // Stores the last index where each lowercase letter appears.
  // Index 0 -> 'a', 1 -> 'b', ..., 25 -> 'z'.
  const lastLower = new Array<number>(26).fill(-1);

  // Stores the first index where each uppercase letter appears.
  // Initialized with Infinity to indicate "not seen yet".
  const firstUpper = new Array<number>(26).fill(Infinity);

  // Traverse the string once.
  for (let i = 0; i < word.length; i++) {
    // Get ASCII code of current character.
    const code = word.charCodeAt(i);

    // Lowercase letters have ASCII codes >= 97.
    if (code >= 97) {
      // Update last occurrence of lowercase character.
      lastLower[code - 97] = i;
    } else {
      // Convert uppercase ASCII code to 0-25 index.
      const idx = code - 65;

      // Only store the first uppercase occurrence.
      if (firstUpper[idx] === Infinity) {
        firstUpper[idx] = i;
      }
    }
  }

  // Counts valid special characters.
  let count = 0;

  // Check all 26 letters.
  for (let i = 0; i < 26; i++) {
    // Conditions:
    // 1. Lowercase exists.
    // 2. Uppercase exists.
    // 3. Every lowercase appears before first uppercase,
    //    equivalent to:
    //    last lowercase index < first uppercase index.
    if (
      lastLower[i] !== -1 &&
      firstUpper[i] !== Infinity &&
      lastLower[i] < firstUpper[i]
    ) {
      count++;
    }
  }

  // Return total special characters.
  return count;
}
